#!/usr/bin/env node
// Diffs the head vs. base lists produced by crawl-site.mjs (broken links/images) and
// check-orphans.mjs (orphan pages), and writes a PR-comment / step-summary report.
// Each category is split into:
//   - introduced by this PR   (in head, not in base)
//   - already on main          (in both)
//   - fixed by this PR         (in base, not in head)
// Always exits 0 — advisory, non-blocking.
//
// Usage:
//   node scripts/report-broken-links.mjs --head <links> [--base <links>]
//        [--head-orphans <file>] [--base-orphans <file>] [--out <comment.md>]

import { readFileSync, writeFileSync, existsSync, appendFileSync } from 'node:fs';

const MARKER = '<!-- broken-link-check -->';
const COMMENT_CAP = 50; // cap per-section lists in the posted comment; job summary is full.

const argv = process.argv.slice(2);
function flag(name) {
  const i = argv.indexOf(name);
  return i === -1 ? undefined : argv[i + 1];
}

// --- parsing -------------------------------------------------------------

// Broken-reference list (STATUS\tTARGET\tCOUNT\tEXAMPLE) → Map keyed by STATUS+TARGET.
function parseLinks(path) {
  if (!path || !existsSync(path)) return null;
  const map = new Map();
  for (const line of readFileSync(path, 'utf8').split(/\r?\n/)) {
    if (!line.trim()) continue;
    const [status, target, count, example] = line.split('\t');
    map.set(`${status}\t${target}`, { status, target, count: Number(count) || 1, example: example || '' });
  }
  return map;
}

// Orphan list (one doc-id per line) → Map keyed by doc-id.
function parseOrphans(path) {
  if (!path || !existsSync(path)) return null;
  const map = new Map();
  for (const line of readFileSync(path, 'utf8').split(/\r?\n/)) {
    const id = line.trim();
    if (id) map.set(id, { id });
  }
  return map;
}

// --- diff + rendering ----------------------------------------------------

function makeCategory(headMap, baseMap) {
  const head = headMap || new Map();
  const headKeys = new Set(head.keys());
  const baseKeys = baseMap ? new Set(baseMap.keys()) : null;
  return {
    head,
    baseMap,
    total: head.size,
    introduced: baseKeys ? [...headKeys].filter((k) => !baseKeys.has(k)) : null,
    preExisting: baseKeys ? [...headKeys].filter((k) => baseKeys.has(k)) : [...headKeys],
    fixed: baseKeys ? [...baseKeys].filter((k) => !headKeys.has(k)) : [],
    hasBase: baseKeys !== null,
  };
}

const displayLink = (e) =>
  `- \`${e.target}\` (${e.status}) — ${e.count > 1 ? `${e.count} pages` : '1 page'}${e.example ? `, e.g. \`${e.example}\`` : ''}`;
const displayOrphan = (e) => `- \`docs/${e.id}\``;

function detailsList(summaryText, items, cap, display, open = false) {
  const tag = open ? '<details open>' : '<details>';
  const out = [tag, `<summary>${summaryText}</summary>`, ''];
  const shown = items.slice(0, cap);
  out.push(...shown.map(display));
  if (items.length > shown.length) {
    out.push(`- _…and ${items.length - shown.length} more — see the full list in the workflow run's job summary._`);
  }
  out.push('', '</details>');
  return out;
}

// Resolve diff keys back to their entries (from head, falling back to base for "fixed").
function resolver(cat, sortFn) {
  return (keys) => keys.map((k) => cat.head.get(k) || cat.baseMap.get(k)).sort(sortFn);
}

function summaryLine(label, cat) {
  if (!cat.hasBase) return `- **${label}** — total **${cat.total}** _(no base-branch data to compare)_`;
  const parts = [`total **${cat.total}**`, `🆕 introduced **${cat.introduced.length}**`, `📄 already on \`main\` **${cat.preExisting.length}**`];
  if (cat.fixed.length) parts.push(`✅ fixed **${cat.fixed.length}**`);
  return `- **${label}** — ${parts.join(' · ')}`;
}

// Render one category's three sections (no top-level header; caller adds it).
function renderCategory(cat, { noun, display, sortFn }, cap) {
  const pick = resolver(cat, sortFn);
  const lines = [];

  lines.push('### Introduced by this PR');
  lines.push('');
  if (!cat.hasBase) {
    lines.push('_No base-branch data — see the full list below._');
  } else if (cat.introduced.length === 0) {
    lines.push(`No new ${noun} introduced by this PR. ✅`);
  } else {
    lines.push(`This PR introduces **${cat.introduced.length}** ${noun}:`);
    lines.push('');
    lines.push(...detailsList(`Show ${cat.introduced.length}`, pick(cat.introduced), cap, display, true));
  }
  lines.push('');

  const preLabel = cat.hasBase ? 'Already on `main`' : `All ${noun} on this branch`;
  lines.push(`### ${preLabel} — ${cat.preExisting.length} total`);
  lines.push('');
  if (cat.preExisting.length === 0) {
    lines.push('None.');
  } else {
    if (cat.hasBase) lines.push(`Already present on the base branch (not caused by this PR):`);
    lines.push('');
    lines.push(...detailsList(`Show ${cat.preExisting.length}`, pick(cat.preExisting), cap, display));
  }
  lines.push('');

  if (cat.fixed.length > 0) {
    lines.push(`### Fixed by this PR — ${cat.fixed.length} total`);
    lines.push('');
    lines.push(...detailsList(`Show ${cat.fixed.length}`, pick(cat.fixed), cap, display));
    lines.push('');
  }
  return lines;
}

// --- assemble ------------------------------------------------------------

// Fail closed: the --head links list is required. If the crawl step failed to produce
// it (the crawl steps are continue-on-error), an empty category would let --fail-on-any
// pass green despite having no data to gate on.
const headPath = flag('--head');
if (!headPath || !existsSync(headPath)) {
  console.error(`report-broken-links: required --head input not found: ${headPath ?? '(not provided)'}`);
  process.exit(1);
}

const linksCat = makeCategory(parseLinks(headPath), parseLinks(flag('--base')));
const orphansHead = parseOrphans(flag('--head-orphans'));
const orphansCat = orphansHead ? makeCategory(orphansHead, parseOrphans(flag('--base-orphans'))) : null;

const linkSort = (a, b) => a.target.localeCompare(b.target);
const orphanSort = (a, b) => a.id.localeCompare(b.id);

// Gate. Two modes:
//   --fail-on-any         fail when ANY broken link/image exists on this branch (pre-existing
//                         included). Scoped to links/images; orphans are reported only.
//   --fail-on-introduced  fail only when this PR introduces new broken refs/orphans
//                         (advisory when there is no base data to compare).
const failOnAny = argv.includes('--fail-on-any');
const failOnIntroduced = argv.includes('--fail-on-introduced');
const introducedFail =
  (linksCat.introduced ? linksCat.introduced.length : 0) +
  (orphansCat && orphansCat.introduced ? orphansCat.introduced.length : 0);
const comparable = linksCat.hasBase || (orphansCat && orphansCat.hasBase);
const willFail = failOnAny ? linksCat.total > 0 : failOnIntroduced && introducedFail > 0;

function statusBanner() {
  if (failOnAny) {
    return linksCat.total > 0
      ? `> ❌ **Failing** — **${linksCat.total}** broken link(s)/image(s) found on this branch. The check stays red until all are fixed.`
      : '> ✅ **Passing** — no broken links or images found.';
  }
  if (!failOnIntroduced || !comparable) {
    return '> ℹ️ **Advisory** — reporting only, not failing the check' +
      (failOnIntroduced && !comparable ? ' (no base-branch data to compare).' : '.');
  }
  if (introducedFail > 0) {
    return `> ❌ **Failing** — this PR introduces **${introducedFail}** new broken reference(s)/orphan page(s). Fix them or the check stays red.`;
  }
  return '> ✅ **Passing** — this PR introduces no new broken links, images, or orphan pages.';
}

function buildReport(cap) {
  const lines = [];
  lines.push(MARKER);
  lines.push('# Broken links, images & orphan pages');
  lines.push('');
  lines.push(statusBanner());
  lines.push('');
  lines.push('_Links/images come from one crawl of the production build (baseUrl-aware). Orphans are docs not referenced by `sidebars.ts`._');
  lines.push('');

  lines.push('## Summary');
  lines.push('');
  lines.push(summaryLine('Broken links & images', linksCat));
  if (orphansCat) lines.push(summaryLine('Orphan pages', orphansCat));
  lines.push('');

  lines.push('## Broken links & images');
  lines.push('');
  lines.push(...renderCategory(linksCat, { noun: 'broken link(s)/image(s)', display: displayLink, sortFn: linkSort }, cap));

  if (orphansCat) {
    lines.push('## Orphan pages');
    lines.push('');
    lines.push(...renderCategory(orphansCat, { noun: 'orphan page(s)', display: displayOrphan, sortFn: orphanSort }, cap));
  }

  return lines.join('\n') + '\n';
}

const commentBody = buildReport(COMMENT_CAP);
const fullBody = buildReport(Infinity);

process.stdout.write(commentBody);

const summaryPath = process.env.GITHUB_STEP_SUMMARY;
if (summaryPath) {
  try { appendFileSync(summaryPath, fullBody); } catch {}
}
if (flag('--out')) {
  try { writeFileSync(flag('--out'), commentBody); } catch {}
}

// Fail the check only for regressions this PR introduced (when enabled and comparable).
process.exit(willFail ? 1 : 0);
