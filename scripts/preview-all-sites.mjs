#!/usr/bin/env node
/**
 * Builds (or dev-serves) saas, wso2-integrator, and wso2-connectors
 * together and lets you check the result the same way it'll actually be
 * published -- one merged site with the product-switcher dropdown and
 * wso2-integrator's version dropdown both live.
 *
 * Each branch gets its own dedicated git worktree under the OS temp
 * directory, so this never touches whatever branch you currently have
 * checked out in the main working copy, and never runs `git checkout`
 * there. Each worktree gets its own `npm install` -- worktrees do NOT
 * share node_modules here (a symlink/junction between worktree
 * node_modules previously caused real data loss when a worktree was
 * removed and the link was followed into the real directory).
 *
 * BASE_URL is passed via `spawn`'s `env` option, not shell string
 * interpolation, specifically to avoid a real bug hit earlier: Git Bash's
 * MSYS layer silently rewrites a leading-slash env var value like
 * `/integrator/` into a Windows path (`C:/Program Files/Git/integrator/`)
 * when it's set as `VAR=/path/ some-command` in a bash one-liner. Passing
 * it through `child_process.spawn`'s `env` object bypasses the shell
 * entirely, so this can't happen regardless of what shell invoked this
 * script.
 *
 * Usage:
 *   node scripts/preview-all-sites.mjs                 # build + merge + serve all three (production-like)
 *   node scripts/preview-all-sites.mjs saas integrator  # only these branches
 *   node scripts/preview-all-sites.mjs --dev            # fast dev servers instead, one port each, not merged
 *   node scripts/preview-all-sites.mjs --skip-install   # skip npm install (assumes worktrees already set up)
 *   node scripts/preview-all-sites.mjs --port 4173      # base port (merged mode) / starting port (--dev mode)
 */

import { spawn } from 'node:child_process';
import { existsSync, rmSync, mkdirSync, cpSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PREVIEW_ROOT = path.join(tmpdir(), 'docs-integrator-preview');
const WORKTREE_ROOT = path.join(tmpdir(), 'docs-integrator-worktrees');

/** branchKey -> { branch, baseUrl, mergeSubdir } */
const SITES = {
  saas: { branch: 'saas', baseUrl: '/integration-platform/docs/saas/', mergeSubdir: 'integration-platform/docs/saas' },
  integrator: { branch: 'wso2-integrator', baseUrl: '/integration-platform/docs/integrator/', mergeSubdir: 'integration-platform/docs/integrator' },
  connectors: { branch: 'wso2-connectors', baseUrl: '/integration-platform/docs/connectors/', mergeSubdir: 'integration-platform/docs/connectors' },
};

const args = process.argv.slice(2);
const isDev = args.includes('--dev');
const skipInstall = args.includes('--skip-install');
const portFlagIndex = args.indexOf('--port');
const basePort = portFlagIndex !== -1 ? parseInt(args[portFlagIndex + 1], 10) : (isDev ? 3001 : 4173);
const requestedKeys = args.filter((a) => !a.startsWith('--') && a !== String(basePort));
const keys = requestedKeys.length > 0 ? requestedKeys : Object.keys(SITES);

for (const key of keys) {
  if (!SITES[key]) {
    console.error(`Unknown site "${key}". Valid: ${Object.keys(SITES).join(', ')}`);
    process.exit(1);
  }
}

// npm/npx are .cmd shims on Windows: plain spawn() without a shell can't
// resolve them reliably (confirmed -- ENOENT with no shell, EINVAL when
// resolving the .cmd path directly for some argument shapes). The
// documented way to use shell:true without Node's args-array deprecation
// warning is to pass ONE command string instead of a separate args array,
// so build that string here for npm/npx specifically; git and node need
// no shell and run exactly as given.
//
// shell:true on win32 always runs through cmd.exe, never through whatever
// shell (e.g. Git Bash) launched this script -- so this is unrelated to,
// and safe from, the actual MSYS path-mangling bug from the file header,
// which specifically requires an MSYS/Cygwin process in the chain. BASE_URL
// is passed via the `env` option below either way, never interpolated into
// the command string, so there's nothing for any shell to rewrite.
function quoteArg(arg) {
  return /\s/.test(arg) ? `"${arg.replace(/"/g, '\\"')}"` : arg;
}

function run(command, cmdArgs, opts = {}) {
  const needsShell = process.platform === 'win32' && ['npm', 'npx'].includes(command);
  return new Promise((resolve, reject) => {
    const child = needsShell
      ? spawn([command, ...cmdArgs].map(quoteArg).join(' '), { stdio: 'inherit', shell: true, ...opts })
      : spawn(command, cmdArgs, { stdio: 'inherit', shell: false, ...opts });
    child.on('exit', (code) => (code === 0 ? resolve() : reject(new Error(`${command} ${cmdArgs.join(' ')} exited ${code}`))));
    child.on('error', reject);
  });
}

function currentBranch() {
  return new Promise((resolve, reject) => {
    const child = spawn('git', ['rev-parse', '--abbrev-ref', 'HEAD'], { cwd: REPO_ROOT, shell: false });
    let out = '';
    child.stdout.on('data', (d) => (out += d));
    child.on('exit', (code) => (code === 0 ? resolve(out.trim()) : reject(new Error('git rev-parse failed'))));
    child.on('error', reject);
  });
}

async function ensureWorktree(site) {
  // A branch can't be checked out in two worktrees at once. If it's the
  // branch already checked out in the main working copy, use that
  // directly instead of creating a redundant worktree (which git would
  // refuse anyway).
  if ((await currentBranch()) === site.branch) {
    console.log(`[${site.branch}] already checked out in the main working copy, using it directly`);
    return REPO_ROOT;
  }

  const worktreePath = path.join(WORKTREE_ROOT, site.branch);
  if (existsSync(worktreePath)) {
    console.log(`[${site.branch}] worktree already exists at ${worktreePath}`);
    return worktreePath;
  }
  mkdirSync(WORKTREE_ROOT, { recursive: true });
  console.log(`[${site.branch}] creating worktree at ${worktreePath}`);
  await run('git', ['worktree', 'add', worktreePath, site.branch], { cwd: REPO_ROOT });
  return worktreePath;
}

async function ensureInstalled(worktreePath) {
  if (skipInstall) return;
  const nodeModules = path.join(worktreePath, 'node_modules');
  if (existsSync(nodeModules)) {
    console.log(`  node_modules already present, skipping install (pass no --skip-install to force)`);
    return;
  }
  console.log(`  running npm install...`);
  await run('npm', ['install'], { cwd: worktreePath });
}

async function buildSite(key) {
  const site = SITES[key];
  const worktreePath = await ensureWorktree(site);
  await ensureInstalled(worktreePath);

  console.log(`[${site.branch}] clearing build caches`);
  for (const dir of ['en/build', 'en/.docusaurus', 'node_modules/.cache']) {
    rmSync(path.join(worktreePath, dir), { recursive: true, force: true });
  }

  console.log(`[${site.branch}] building with BASE_URL=${site.baseUrl}`);
  await run('npm', ['run', 'build'], {
    cwd: worktreePath,
    env: { ...process.env, BASE_URL: site.baseUrl },
  });

  return { site, buildDir: path.join(worktreePath, 'en', 'build') };
}

async function devServe(key, port) {
  const site = SITES[key];
  const worktreePath = await ensureWorktree(site);
  await ensureInstalled(worktreePath);
  console.log(`[${site.branch}] starting dev server on port ${port} (http://localhost:${port}/)`);
  // Not awaited -- these run concurrently and stay up until Ctrl+C.
  run('npm', ['start', '--', '--port', String(port)], { cwd: worktreePath }).catch((err) => {
    console.error(`[${site.branch}] dev server exited:`, err.message);
  });
}

async function main() {
  if (isDev) {
    console.log(`Starting dev servers for: ${keys.join(', ')}\n`);
    keys.forEach((key, i) => devServe(key, basePort + i));
    console.log(`\nEach site is served standalone at its own root (no /integration-platform/docs/ prefix,`);
    console.log(`no product-switcher cross-links -- those only resolve under the merged build below).`);
    console.log(`Press Ctrl+C to stop.`);
    return;
  }

  console.log(`Building and merging: ${keys.join(', ')}\n`);
  const built = [];
  for (const key of keys) {
    built.push(await buildSite(key));
  }

  rmSync(PREVIEW_ROOT, { recursive: true, force: true });
  for (const { site, buildDir } of built) {
    const dest = path.join(PREVIEW_ROOT, site.mergeSubdir);
    mkdirSync(dest, { recursive: true });
    cpSync(buildDir, dest, { recursive: true });
    console.log(`[${site.branch}] merged into ${dest}`);
  }

  // saas no longer owns the bare /integration-platform/docs/ root (moved to
  // /saas/, matching /integrator/ and /connectors/) -- root-redirect/index.html
  // (tracked on the saas branch only, same file staging_sync.yaml and
  // promote_to_production.yaml publish there) answers the bare root instead.
  // Only copy it when saas is actually one of the sites being previewed.
  if (keys.includes('saas')) {
    const saasWorktree = await ensureWorktree(SITES.saas);
    const redirectSrc = path.join(saasWorktree, 'root-redirect', 'index.html');
    if (existsSync(redirectSrc)) {
      const redirectDest = path.join(PREVIEW_ROOT, 'integration-platform', 'docs', 'index.html');
      mkdirSync(path.dirname(redirectDest), { recursive: true });
      cpSync(redirectSrc, redirectDest);
      console.log(`[saas] root redirect merged into ${redirectDest}`);
    }
  }

  const entryUrl = keys.includes('saas')
    ? `http://localhost:${basePort}/integration-platform/docs/saas/`
    : `http://localhost:${basePort}/integration-platform/docs/`;
  console.log(`\nServing merged preview at ${entryUrl}`);
  console.log(`Press Ctrl+C to stop.\n`);
  await run('npx', ['serve', PREVIEW_ROOT, '-l', String(basePort)], { cwd: REPO_ROOT });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
