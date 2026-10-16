# docs-integrator

Documentation source for the WSO2 Integration Platform, built with
Docusaurus. This repo publishes several product branches as one merged
multi-product site:

| Branch | Product | Path |
|---|---|---|
| `saas` | WSO2 Cloud | `/saas/` |
| `wso2-integrator` | WSO2 Integrator (self-hosted) | `/integrator/` |
| `wso2-connectors` | Connectors catalog | `/connectors/` |

**You are on `main`.** This branch carries no real product content —
it's the shared-theme/governance source of truth every product branch
forks from and syncs shared pieces out of, plus a placeholder `docs/`
scaffold that demonstrates every doc-authoring convention this repo
uses. See [MAINTENANCE.md](MAINTENANCE.md) for the full branch model
(what `main` is for, in detail, is its own section there).

## Repository Layout

- `en/` — Docusaurus site source (docs, theme, components, config)
- `en/docs/` — on `main`, a placeholder scaffold (see `en/docs/homepage/`,
  `en/docs/workflows/`, and the rest) rather than real product docs
- `en/src/theme-shared/`, `en/src/theme/`, `en/src/components/*` — the
  shared theme (see "Theme & shared governance" below)
- `scripts/preview-all-sites.mjs` — local multi-branch preview (see
  "Local testing" below)
- `MAINTENANCE.md` — branch/release model, what's shared vs. per-branch
- `CONTRIBUTING.md` — Golden Rules, doc structure conventions, PR scenarios
- `AGENTS.md` — pre-flight checklist for AI-assisted doc changes
- `HOW_TO_WRITE_A_GUIDE.md` — frontmatter checklist for `guides/` content
- `issue_template.md`, `pull_request_template.md` — issue/PR templates

## Prerequisites

- Node.js `>= 20`
- npm `>= 10`

## Quick Start

```bash
npm install        # once, from the repo root
cd en
npm run start -- --host localhost
```

Open the local URL Docusaurus prints (usually `http://localhost:3000`).

## Common Commands

Run these from `en/`:

```bash
npm run start      # local dev server (hot reload)
npm run build      # production build in en/build
npm run serve      # serve that build locally
npm run typecheck  # TypeScript checks
npm run clear      # clear the Docusaurus cache
```

## Local testing

A single branch's `npm run start`/`npm run build` only shows that one
branch in isolation — no product switcher, no cross-product links, no
version pill. To check something the way it actually publishes (all
product branches merged into one site), run from the repo root:

```bash
npm run preview:all              # build + merge + serve saas, wso2-integrator, wso2-connectors
npm run preview:all -- --dev     # faster: separate dev servers, no merge/cross-links
npm run preview:all saas         # only specific branches
```

This spins up a dedicated git worktree per branch under the OS temp
directory (never touches whichever branch you currently have checked
out) — see `scripts/preview-all-sites.mjs`'s own header comment for
the full mechanics, including a Windows/Git-Bash `BASE_URL`
path-mangling bug it specifically works around.

## Theme & shared governance

`main` is the canonical source for everything that should look and
behave the same across every product branch: the visual theme
(`en/src/theme-shared/`, `en/src/theme/`), shared reusable components
(`PaletteCard`, `PaletteIcon`, `IconGallery`, `SearchBar`,
`SidebarProductHeader`, `GuidesCatalog`, and more — see
`en/src/components/`), and governance docs (this file's siblings:
`MAINTENANCE.md`, `CONTRIBUTING.md`, `AGENTS.md`,
`HOW_TO_WRITE_A_GUIDE.md`, `UI_UX_GUIDELINES.md`).

A push to `main` touching any of these triggers
`.github/workflows/sync-theme.yaml`, which opens a PR against every
product branch in its matrix with the change. The exact file list is
`sync-theme.yaml`'s own `SHARED_PATHS` — see MAINTENANCE.md's "Shared
theme & shared governance" section for the model this fits into, and
why `main` (not any one product branch) is the source.

**Not shared, deliberately per-branch:** `en/docusaurus.config.ts`
(navbar/footer content, plugins), `en/src/pages/index.tsx` +
`index.module.css` (the homepage), `en/docs/` itself (real content),
and this README.

## Adding a new product

Short version — see MAINTENANCE.md's "Onboarding a new product" table
for the authoritative checklist, and
[`docs/workflows/workflows.md`](en/docs/workflows/workflows.md) (or
`/workflows` on a running build) for a full worked example and the
deep dive on path/workflow configuration:

1. **New branch:** `git checkout main && git checkout -b wso2-<product>`, push it.
2. **New docs content:** replace `en/docs/`'s placeholder scaffold
   with the product's real sections — each new top-level folder needs
   `sidebar_position`, an explicit `_category_.json`, and (if it has
   2+ docs) its own `<folder>/<folder>.md` index page. See
   `CONTRIBUTING.md`'s "Doc structure conventions" and this branch's
   own scaffold (`en/docs/section-1/`, `en/docs/section-2/`, etc.) for
   worked examples of every convention.
3. **Path setup** (`.github/workflows/staging_sync.yaml`, edited on
   `main`): add the branch to `on.push.branches`, add a case to the
   `BASE_URL` `case` statement giving it its own subpath (e.g.
   `/integration-platform/docs/<product>/` — no product owns the bare
   family root), and a matching `Deploy ... (staging/<subpath>)` step.
4. **Workflow edits, elsewhere:**
   - `scripts/preview-all-sites.mjs`'s `SITES` map — add an entry so
     local multi-branch preview includes it.
   - `en/src/components/SidebarProductHeader`'s `PRODUCTS` map — add
     label/description/icon/path so it appears in the product switcher.
   - `en/src/theme/DocSidebar/Desktop/icons.tsx`'s `ICONS_BY_LABEL` —
     add an entry per real top-level category label, so the sidebar's
     icon rail doesn't fall back to a generic dot.
   - `.github/workflows/sync-theme.yaml`'s matrix — add the branch so
     it starts receiving the shared theme.
   - This file's branch table above, and `MAINTENANCE.md`'s /
     `CONTRIBUTING.md`'s branch tables.
5. **Homepage:** replace the placeholder `sections`/`quickLinks`
   arrays in `en/src/pages/index.tsx` with the product's own —
   see `docs/homepage/homepage.md` for what lives where.
6. **Versioning**, if the product needs release-versioned docs: see
   MAINTENANCE.md's Versioning row and CONTRIBUTING.md's "I'm cutting
   a new wso2-integrator release version" for the step-by-step.

## Content conventions

Before touching `en/docs/`, read `CONTRIBUTING.md`'s "Golden Rules"
and "Doc structure conventions", and `AGENTS.md`'s pre-flight
checklist if you're making the change with AI assistance. In short:
every doc needs an explicit `slug:`; every folder with 2+ docs needs
an index page and an explicit `_category_.json`; verify with a real
`npx docusaurus build` (from `en/`), not a visual skim.

## Working with AI Agents

AI-assisted contributions are welcome — `AGENTS.md`'s checklist is the
starting point for any AI-assisted change to `en/docs/`. When opening
a PR with AI-assisted changes, treat the output as a draft (a human
reviewer verifies technical accuracy against source code and official
docs, and confirms nothing secret was committed), and note in the PR
description roughly what was AI-assisted and what you manually
verified.

## Troubleshooting

- `npm run dev` fails: this project uses `npm run start`, not `dev`.
- Dependency issues: delete `node_modules` and `package-lock.json`,
  then run `npm install` again.
- Node version mismatch: run `nvm use 20`.
- `npm run preview:all` fails on a fresh clone: it needs each branch's
  own `npm install` inside its worktree, which it does automatically
  unless you pass `--skip-install`.

## License

Apache 2.0. See `LICENSE`.
