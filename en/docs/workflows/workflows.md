---
sidebar_position: 0
sidebar_label: Workflows
title: "Workflows & Onboarding a New Product"
description: What every GitHub Actions workflow in this repo does, the full checklist for onboarding a new product branch, and how to give it its own path and issue-tracker link the same way /saas has both.
slug: /workflows
---

# Workflows & Onboarding a New Product

This repo publishes several product branches (`saas`, `wso2-integrator`,
`wso2-connectors`, and whatever's added next) as one merged multi-product
site, coordinated entirely by the workflows in `.github/workflows/`. This
page explains what each one does, the checklist for onboarding a new
product, and -- since it's easy to get half-right -- specifically how a
new product gets its own URL path and its own issue-tracker link, the
same way `/saas/` already has both.
For the full branch model this all sits inside (`main` → product branch
→ `staging` → `gh-pages`), see `MAINTENANCE.md`.

## All the workflows

| Workflow | Triggers on | What it does |
| --- | --- | --- |
| `sync-theme.yaml` | Push to `main` touching a shared path | Copies the shared theme/components/governance docs (the same list `MAINTENANCE.md`'s "Shared theme & shared governance" section names) from `main` out to every product branch in its matrix, as a PR against each. **Lives only on `main`.** |
| `staging_sync.yaml` | Push to a product branch (`saas`, `wso2-integrator`, `wso2-connectors`, ...) | Builds that one branch and publishes it into its own subpath on the `staging` branch (`keep_files: true`, so it never wipes what other product branches already published there). This is the file with the path-configuration case statement -- see "How to configure its path" below. **Identical on every product branch**, authored on `main`, distributed by `sync-theme.yaml`. |
| `promote_to_production.yaml` | Manual (`workflow_dispatch`, a `ref` input) | Ships the already-built `staging` tree to `gh-pages` byte-for-byte -- no rebuild, so production always matches exactly what was validated on staging together. **Lives only on `main`** (nothing branch-specific to duplicate). |
| `publish_docs.yaml` | Push to `main` | Builds and deploys straight to `gh-pages` under a hardcoded `/integration-platform/docs/` base. Predates the `staging_sync.yaml` / `promote_to_production.yaml` two-stage pipeline and triggers on `main`, which carries no real product content -- worth confirming whether this is still needed before relying on it. |
| `pr_build_check.yaml` | PR targeting `main` | Enforces title-case on frontmatter/labels, builds the site, and flags any doc page not reachable from the sidebar (`check-orphans.mjs`). Each product branch keeps its own copy pointed at itself, not synced from here. |
| `broken-link-check.yaml` + `broken-link-comment.yaml` | PR targeting `main` (check), then that workflow's completion (comment) | Builds the PR head and base, crawls both, and posts a PR comment showing introduced-vs-preexisting broken links/images. Split in two so the comment step can run with write-token access even for fork PRs (see the file's own docstring for why). Fails the check but isn't a required status, so it doesn't block merging. |
| `pr_preview.yaml` | Manual (`workflow_dispatch`, a PR number) | Deploys a given PR to a Vercel preview URL, isolating the Vercel token from fork-controlled code (build and deploy are separate jobs). |
| `auto_label.yml` / `claude_runner.yml` | Issue events / comments / hourly schedule | AI-assisted issue triage and auto-fix-PR automation -- unrelated to the publish pipeline or product onboarding, mentioned here only for completeness. |

## Introducing a new product

`MAINTENANCE.md`'s "Onboarding a new product" section is the
authoritative checklist (kept there, not duplicated here, so there's
one place to update) -- branch creation, `staging_sync.yaml`,
`scripts/preview-all-sites.mjs`, `SidebarProductHeader`,
`ReportIssueButton`, the sidebar icon rail, the homepage,
`sync-theme.yaml`'s matrix, the branch tables in this file's neighbor
docs, `shared-content-guard.yaml`, and versioning. Read that table
before starting; the rest of this page goes one level deeper on the
three pieces people most often get stuck on: the workflow changes, the
path itself, and the issue-tracker link.

Worked example, onboarding a hypothetical `wso2-agent-builder`:

1. `git checkout main && git checkout -b wso2-agent-builder`, push it.
2. In `staging_sync.yaml` (edited on `main`, then redistributed by
   `sync-theme.yaml` -- don't hand-edit it directly on a product
   branch, that edit gets silently reverted on the next sync):
   - Add `wso2-agent-builder` to `on.push.branches`.
   - Add a case to the `case "${{ github.ref_name }}"` statement (see
     below).
   - Add a `Deploy wso2-agent-builder (staging/agent-builder)` step,
     copied from the `wso2-connectors` one, with its own
     `destination_dir`. Skipping this step is the easiest mistake to
     make here: the branch still builds fine (the `case` statement
     alone is enough to resolve a `BASE_URL`), it just never actually
     gets published anywhere, which looks like a broken build
     somewhere else until you notice the deploy step is missing.
3. In `scripts/preview-all-sites.mjs`'s `SITES` map, add an entry so
   the new branch is included in local multi-site preview builds.
4. In `SidebarProductHeader/index.tsx`:
   - Add `'agentBuilder'` to the `ProductKey` union type first.
     TypeScript then won't compile until every `Record<ProductKey, ...>`
     map below has a matching entry -- both `PRODUCTS` here and
     `ReportIssueButton`'s `ISSUE_CHOOSER_URLS` (step 5) -- so this one
     edit is what actually forces the rest of this checklist instead of
     letting a missed entry through silently.
   - Add a label/description/icon/`path` entry to the `PRODUCTS` map,
     **and** add `'agentBuilder'` to the `PRODUCT_ORDER` array. Only
     the `PRODUCTS` entry is required for `tsc` to pass -- `PRODUCT_ORDER`
     is a plain `ProductKey[]`, not exhaustiveness-checked, so a missed
     entry here is a silent miss: the build succeeds, the new product
     just never shows up in the switcher dropdown.
   - Add a matching `baseUrl.includes('/agent-builder/')` branch to
     `detectCurrentProduct()`, in the same file, so the switcher
     correctly detects and highlights `wso2-agent-builder` as the
     active product when browsing it. Easy to miss: it's a second edit
     in the same file, separate from the `PRODUCTS` map above.
5. In `ReportIssueButton/index.tsx`'s `ISSUE_CHOOSER_URLS` map, add an
   `agentBuilder` entry pointing at that product's own GitHub
   issue-tracker repo's `.../issues/new/choose` chooser page -- see
   "How to configure its issue-tracker URL" below.
6. In `DocSidebar/Desktop/icons.tsx`'s `ICONS_BY_LABEL`, add entries
   for whatever top-level category labels the new branch's own
   `docs/` actually uses (see "How to add a sidebar category icon" in
   `docs/section-1/sub-section-1/sample-page.md`).
7. Add the branch to `sync-theme.yaml`'s own matrix, so it starts
   receiving the shared theme.
8. Add the row to `MAINTENANCE.md`'s and `CONTRIBUTING.md`'s branch
   tables.
9. If it needs release-versioned docs, follow the Versioning row in
   `MAINTENANCE.md`'s table.

## How to configure its path, the same way `/saas` has one

Every product owns its own subpath under the shared family root
(`/integration-platform/docs/` in production) -- `/saas/`,
`/integrator/`, `/connectors/`, and so on for whatever's added next.
**None of them owns the bare family root itself** -- that's a static
redirect stub (`root-redirect/index.html`) that only exists on `saas`
and immediately bounces to `/saas/`; it isn't a pattern a new product
recreates. A new product's path is entirely a `staging_sync.yaml`
change, in one place: the `case` statement inside its "Resolve this
branch's BASE_URL" step.

```yaml
case "${{ github.ref_name }}" in
  saas)
    echo "base_url=${family_base}saas/" >> "$GITHUB_OUTPUT"
    ;;
  wso2-agent-builder)
    echo "base_url=${family_base}agent-builder/" >> "$GITHUB_OUTPUT"
    ;;
  # ...
esac
```

That `base_url` output flows into the build as the `BASE_URL`
environment variable, which `docusaurus.config.ts` reads directly:
`baseUrl: process.env.BASE_URL || '/'` -- unset (the `'/'` fallback)
is exactly what running `npm run start` locally gets, which is why
`AGENTS.md`'s own quickstart needs no extra flags. The matching
`Deploy ... (staging/agent-builder)` step's `destination_dir` is what
actually places the build output at that subpath on the `staging`
branch -- the `base_url` string and the `destination_dir` value must
describe the same subpath, or the deployed build's internal links
won't match where it's actually served from.

Two more places read/reference that same subpath, both already listed
in the checklist above:

- **`SidebarProductHeader`'s `PRODUCTS` map** -- its `path` field is
  this same subpath again, used to build the product switcher's link
  to the new product.
- **`scripts/preview-all-sites.mjs`'s `SITES` map** -- `baseUrl` and
  `mergeSubdir` mirror the same value, so local multi-site preview
  builds serve the new product at the right nested path too.

Cross-product links (the navbar logo, the product switcher, the
Connectors link) are a separate mechanism and need no per-product
change: they're built from `CROSS_PRODUCT_BASE`
(`theme-shared/themeConfig.ts`), which defaults to the same family
root and is overridable via a `CROSS_PRODUCT_BASE` env var for
fork/local builds -- see that constant's own docstring.

## How to configure its issue-tracker URL

Separate from the path above: every product also has its own GitHub
repo where readers report product issues. The floating "report an
issue" button (`ReportIssueButton`, mounted globally alongside the AI
assistant via `FloatingActions` -- see `src/theme/Root.js`) links
straight to that repo's issue-template chooser
(`.../issues/new/choose`), not this docs-integrator repo -- most things
a reader reports from a doc page turn out to be product behavior, not
a docs bug.

`ReportIssueButton` is wholesale-shared to every product branch
(`sync-theme.yaml`'s `SHARED_PATHS`), copied byte-for-byte, so its
target repo can't be a single hardcoded constant -- every branch would
end up reporting issues against the same product. Instead it's a small
map, same shape and same runtime-detection mechanism as
`SidebarProductHeader`'s `PRODUCTS` map from the section above:

```tsx
const ISSUE_CHOOSER_URLS: Record<ProductKey, string> = {
  cloud: 'https://github.com/wso2/product-integrator/issues/new/choose',
  integrator: 'https://github.com/wso2/product-integrator/issues/new/choose',
  connectors: 'https://github.com/wso2/product-integrator/issues/new/choose',
  agentBuilder: 'https://github.com/wso2/product-agent-builder/issues/new/choose',
};
```

Onboarding `wso2-agent-builder` is one new entry here, keyed by the
same `'agentBuilder'` you already added to the `ProductKey` union in
step 4 above. At runtime the button calls
`detectCurrentProduct(siteConfig.baseUrl)` -- imported from
`SidebarProductHeader`, not duplicated -- to pick the matching entry,
so `ReportIssueButton` itself stays byte-identical across every branch;
nothing in this file is ever per-branch config. Because both `PRODUCTS`
and `ISSUE_CHOOSER_URLS` are typed `Record<ProductKey, ...>`, adding
the key to the union in step 4 means `tsc` won't pass until this map
also has a matching entry -- a missed issue-tracker URL shows up as a
build failure, not a silent gap.
