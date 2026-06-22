#!/usr/bin/env node
// Crawls the BUILT site the way production serves it and reports every broken
// reference — links AND images/assets — from one uniform pass (no per-element
// special casing). It serves the build under ONLY the site's baseUrl (like GitHub
// Pages) so baseUrl bugs such as the EIP <PatternImage src="/img/..."> surface as
// real 404s, then runs linkinator, which follows <a>, <img>, <link>, <script>, etc.
//
// Usage:
//   node scripts/crawl-site.mjs <build-dir> [out-list-file] [--external]
//
// baseUrl is auto-detected from the build (Docusaurus prefixes its own /assets/
// references); set BASE_URL to override. External links are skipped unless
// --external is passed. Always exits 0 — advisory, non-blocking.

import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve, extname } from 'node:path';
import { LinkChecker } from 'linkinator';

const args = process.argv.slice(2);
const includeExternal = args.includes('--external');
const positional = args.filter((a) => !a.startsWith('--'));
const buildDirArg = positional[0];
const outListPath = positional[1];

// This is an advisory, non-blocking check: never let a stray error (e.g. an aborted
// HTTP stream emitting an unhandled 'error') crash the process and fail CI. Log and
// exit 0 — any partial results already written to the out file are kept.
function failSoft(label) {
  return (err) => {
    process.stderr.write(`crawl-site: ${label}: ${err?.stack || err}\n`);
    process.exit(0);
  };
}
process.on('uncaughtException', failSoft('uncaughtException'));
process.on('unhandledRejection', failSoft('unhandledRejection'));

if (!buildDirArg) {
  process.stderr.write('Usage: node scripts/crawl-site.mjs <build-dir> [out-list-file] [--external]\n');
  process.exit(0);
}
const buildDir = resolve(buildDirArg);
if (!existsSync(buildDir)) {
  process.stderr.write(`Build directory not found: ${buildDir}\n`);
  process.exit(0);
}

function normalizeBaseUrl(value) {
  let b = value || '/';
  if (!b.startsWith('/')) b = '/' + b;
  if (!b.endsWith('/')) b = b + '/';
  return b;
}

// Detect the baseUrl the site was built with from its own bundle references.
function detectBaseUrl(dir) {
  if (process.env.BASE_URL) return normalizeBaseUrl(process.env.BASE_URL);
  const tryFiles = [join(dir, 'index.html'), join(dir, '404.html')];
  for (const f of tryFiles) {
    if (!existsSync(f)) continue;
    const m = readFileSync(f, 'utf8').match(/(?:href|src)\s*=\s*"(\/[^"]*?)?\/assets\/(?:css|js)\//i);
    if (m) return normalizeBaseUrl((m[1] || '') + '/');
  }
  return '/';
}

const baseUrl = detectBaseUrl(buildDir);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
};

// Resolve a request path (already baseUrl-stripped) to a file in the build, mirroring
// Docusaurus' trailingSlash:false output (route "/foo" -> "foo.html"; "/" -> index.html).
// Trailing slashes are treated as equivalent ("/foo/" -> "foo.html") so that canonical /
// alternate metadata links don't show up as false 404s; only genuinely missing targets fail.
async function resolveFile(rel) {
  try {
    rel = decodeURIComponent(rel.split('?')[0].split('#')[0]);
  } catch {
    // Malformed percent-encoding: treat as an unresolvable path (404) rather than
    // letting the URIError reject the request handler.
    return null;
  }
  rel = rel.replace(/^\/+/, '').replace(/\/+$/, '');
  const candidates = rel === ''
    ? [join(buildDir, 'index.html')]
    : [join(buildDir, rel), join(buildDir, rel + '.html'), join(buildDir, rel, 'index.html')];
  for (const c of candidates) {
    try {
      const st = await stat(c);
      if (st.isFile()) return c;
    } catch {}
  }
  return null;
}

const server = createServer(async (req, res) => {
  const urlPath = req.url || '/';
  // Production serves the build ONLY under baseUrl; everything else is a 404.
  if (baseUrl !== '/' && !urlPath.startsWith(baseUrl)) {
    res.statusCode = 404;
    res.end('Not found');
    return;
  }
  const rel = baseUrl === '/' ? urlPath : urlPath.slice(baseUrl.length - 1);
  const file = await resolveFile(rel);
  if (!file) {
    res.statusCode = 404;
    res.end('Not found');
    return;
  }
  try {
    const body = await readFile(file);
    res.statusCode = 200;
    res.setHeader('content-type', MIME[extname(file).toLowerCase()] || 'application/octet-stream');
    res.end(body);
  } catch {
    res.statusCode = 500;
    res.end('Error');
  }
});

await new Promise((r) => server.listen(0, '127.0.0.1', r));
const { port } = server.address();
const origin = `http://127.0.0.1:${port}`;
const startUrl = `${origin}${baseUrl}`;

const checker = new LinkChecker();
const result = await checker.check({
  path: startUrl,
  recurse: true,
  // Keep concurrency modest so the lightweight in-process server doesn't drop connections
  // (which linkinator would report as a spurious status-0 failure), and retry transient
  // errors to avoid false positives.
  //
  // No per-request `timeout`: the server runs in this same process, so under a busy/slow
  // CI event loop a request can exceed any timeout, get aborted, and the aborted response
  // stream emits an unhandled 'error' (TimeoutError) that crashes Node. The local server
  // always responds, so a timeout is unnecessary here.
  concurrency: 25,
  retry: true,
  retryErrors: true,
  retryErrorsCount: 3,
  // Only crawl/recurse our own origin; skip external links unless asked.
  linksToSkip: includeExternal ? [] : [`^(?!${origin})`],
});

server.close();

// Group broken references by target+status (a link broken in the navbar/footer would
// otherwise repeat on every page). Origin is stripped so head/base lists compare cleanly
// regardless of the random port. Output is tab-delimited: STATUS\tTARGET\tCOUNT\tEXAMPLE.
// report-broken-links.mjs keys the diff on STATUS+TARGET (count/example are display-only).
function strip(u) {
  return u && u.startsWith(origin) ? u.slice(origin.length) || '/' : u;
}
const groups = new Map();
for (const link of result.links) {
  if (link.state !== 'BROKEN') continue;
  const target = strip(link.url);
  const source = strip(link.parent) || '(entry)';
  const key = `${link.status}\t${target}`;
  const g = groups.get(key) || { status: link.status, target, count: 0, example: source };
  g.count += 1;
  if (source < g.example) g.example = source; // deterministic representative
  groups.set(key, g);
}

const list = [...groups.values()]
  .sort((a, b) => a.target.localeCompare(b.target) || a.status - b.status)
  .map((g) => `${g.status}\t${g.target}\t${g.count}\t${g.example}`);

const scope = includeExternal ? 'internal + external' : 'internal only';
process.stdout.write(
  (list.length === 0
    ? `No broken references found (baseUrl=${baseUrl}, ${scope}, ${result.links.length} checked).`
    : `Found ${list.length} broken target(s) (baseUrl=${baseUrl}, ${scope}, ${result.links.length} checked):\n` +
        [...groups.values()]
          .sort((a, b) => a.target.localeCompare(b.target))
          .map((g) => `  ${g.target} (${g.status}) — ${g.count} page(s), e.g. ${g.example}`)
          .join('\n')) + '\n'
);

if (outListPath) {
  try {
    writeFileSync(outListPath, list.join('\n') + (list.length ? '\n' : ''));
  } catch {}
}

process.exit(0);
