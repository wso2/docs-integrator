#!/usr/bin/env node
// Lists doc files under en/docs that are not referenced by en/sidebars.ts.
// Always exits 0 — this is an advisory check.
//
// Usage: node scripts/check-orphans.mjs [enDir] [--out <file>]
//   [enDir]      directory to analyze (default: the `en/` dir next to this script).
//                Lets a copy of this script analyze a different checkout's source.
//   --out <file> also write the orphan doc-ids (one per line) to <file>.

import { readFileSync, readdirSync, existsSync, statSync, appendFileSync, writeFileSync } from 'node:fs';
import { join, relative, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const argv = process.argv.slice(2);
const outIdx = argv.indexOf('--out');
const outPath = outIdx === -1 ? undefined : argv[outIdx + 1];
// Positional enDir = first non-flag arg that isn't the value of --out.
const enDirArg = argv.find((a, i) => !a.startsWith('--') && i !== outIdx + 1);

const here = dirname(fileURLToPath(import.meta.url));
const enDir = enDirArg ? resolve(enDirArg) : resolve(here, '..');
const docsDir = join(enDir, 'docs');
const sidebarsPath = join(enDir, 'sidebars.ts');

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, out);
    else if (/\.mdx?$/.test(entry)) out.push(full);
  }
  return out;
}

const allDocIds = new Set(
  walk(docsDir).map((f) => relative(docsDir, f).replace(/\\/g, '/').replace(/\.mdx?$/, ''))
);

const sidebarsSrc = readFileSync(sidebarsPath, 'utf8');

// Collect every quoted doc-id-shaped string literal in sidebars.ts.
// Doc IDs always contain at least one '/' and use [a-z0-9_-/.] characters.
const referenced = new Set();
for (const m of sidebarsSrc.matchAll(/['"]([a-z0-9][a-z0-9._/-]*\/[a-z0-9._/-]+)['"]/gi)) {
  referenced.add(m[1]);
}

// Expand connectorVersionedDocs(...) calls — these surface non-latest versioned
// pages as hidden sidebar entries, so they should count as referenced.
for (const m of sidebarsSrc.matchAll(/connectorVersionedDocs\(\s*['"]([^'"]+)['"]\s*\)/g)) {
  const connectorPath = m[1];
  const connectorDir = join(docsDir, connectorPath);
  const versionsFile = join(connectorDir, 'versions.json');
  if (!existsSync(versionsFile)) continue;
  let meta;
  try {
    meta = JSON.parse(readFileSync(versionsFile, 'utf8'));
  } catch {
    continue;
  }
  const { versions = [], latest, shared = [] } = meta;
  for (const version of versions) {
    if (version === latest) continue;
    const versionDir = join(connectorDir, version);
    if (!existsSync(versionDir)) continue;
    for (const file of readdirSync(versionDir)) {
      if (!/\.mdx?$/.test(file)) continue;
      const slug = file.replace(/\.mdx?$/, '');
      if (shared.includes(slug)) continue;
      referenced.add(`${connectorPath}/${version}/${slug}`);
    }
  }
}

// versions.json `shared` files are surfaced via routing under every version,
// so treat the canonical (top-level) shared doc as referenced too.
for (const m of sidebarsSrc.matchAll(/connectorVersionedDocs\(\s*['"]([^'"]+)['"]\s*\)/g)) {
  const connectorPath = m[1];
  const versionsFile = join(docsDir, connectorPath, 'versions.json');
  if (!existsSync(versionsFile)) continue;
  let meta;
  try { meta = JSON.parse(readFileSync(versionsFile, 'utf8')); } catch { continue; }
  for (const slug of meta.shared ?? []) {
    referenced.add(`${connectorPath}/${slug}`);
    if (meta.latest) referenced.add(`${connectorPath}/${meta.latest}/${slug}`);
  }
}

const orphans = [...allDocIds].filter((id) => !referenced.has(id)).sort();

// Machine-readable list (one doc-id per line) for the broken-link-check diff/report.
if (outPath) {
  try { writeFileSync(outPath, orphans.join('\n') + (orphans.length ? '\n' : '')); } catch {}
}

const summaryPath = process.env.GITHUB_STEP_SUMMARY;
const lines = [];
lines.push('## Orphan pages (not linked from `sidebars.ts`)');
lines.push('');
if (orphans.length === 0) {
  lines.push('No orphans found.');
} else {
  lines.push(`Found **${orphans.length}** doc file(s) that no sidebar entry points to:`);
  lines.push('');
  for (const id of orphans) lines.push(`- \`docs/${id}\``);
  lines.push('');
  lines.push('_If a page is intentionally hidden, reference it from `sidebars.ts` with `className: "hidden"` so it still routes correctly._');
}
const out = lines.join('\n') + '\n';
process.stdout.write(out);
if (summaryPath) {
  try { appendFileSync(summaryPath, out); } catch {}
}

process.exit(0);
