# docs-integrator: Branch Strategy & Release Maintenance

This is the document several workflow files already reference as "Docs
Repo & Branch Strategy" — it didn't exist as an actual file before now.
It covers the branch topology, the develop → staging → production
pipeline, and how to onboard a new product. For day-to-day content
contribution rules (what's shared vs. per-branch, section ownership),
see [CONTRIBUTING.md](CONTRIBUTING.md) instead — this document is about
the release/branch mechanics underneath it.

**Owned by `main`.** Distributed to every product branch, unedited, by
the same shared-sync automation that distributes the shared theme (see
[Shared theme & shared governance](#shared-theme--shared-governance)
below). Don't fork it per-branch.

## Branch topology

| Branch | Product | Deploys to | Versioned? |
|---|---|---|---|
| `main` | *(none — meta branch, see below)* | nothing | — |
| `saas` | WSO2 Cloud | `staging` (auto) → `gh-pages` (promoted) | No |
| `wso2-integrator` | WSO2 Integrator (self-hosted) | `staging` (auto) → `gh-pages` (promoted) | Yes |
| `wso2-connectors` | Connectors catalog | `staging` (auto) → `gh-pages` (promoted) | No |
| `wso2-agent-builder` | *(planned)* | same shape as above once launched | TBD |
| `staging` | *(none — build output only)* | Choreo (auto, watches this branch) | — |
| `gh-pages` | *(none — build output only)* | production, `wso2.com/.../docs/` | — |

Three (soon four) product branches; two output-only branches (`staging`,
`gh-pages`) that never get hand-edited — they're pushed to only by the
workflows below.

## What `main` is for

`main` used to be described as "production, moves only when `saas` is
force-pushed there" — that was a one-time migration plan from before
the multi-branch split, not an ongoing convention, and it never applied
to `wso2-integrator`/`wso2-connectors` in the first place. It carries no
product content and nothing deploys from it directly. Instead:

- **The repo's landing branch.** What `git clone` checks out by
  default, what renders on the repo's GitHub front page, the default PR
  base. Holds a short top-level README pointing contributors at
  `CONTRIBUTING.md` and this file — not product docs.
- **The scaffold every product branch forks from.** A new product
  branch (e.g. `wso2-agent-builder`) is created *from* `main`, inheriting
  the current shared theme and tooling baseline, then gets its own
  content built on top. `main` is gen-0, not a fourth site.
- **The single authored source for shared theme and shared governance**
  (this file, `CONTRIBUTING.md`, `CODEOWNERS`, issue templates) — see
  below.
- **Home of the two cross-branch workflows** that aren't product-specific:
  `promote_to_production.yaml` lives only here (run it from the Actions
  tab on `main`).

## Shared theme & shared governance

One authored spot (`main`), physically duplicated into every product
branch — but only via automation, never by hand:

- Theme/chrome (`en/src/theme`, `en/src/theme-shared`, `en/src/css/custom.css`,
  `en/static/img`, `SiteNav`/`TabAwareToc`/`ProductDocsLinks`/`SidebarProductHeader`/
  `ExploreDropdown`, the shared component library (`PaletteCard`/`PaletteIcon`,
  `GuidesCatalog` + `guidesCatalogPlugin.js`, `AiAssistantPanel`, `ArtifactPicker`),
  ConnectorCatalog's styling/filtering (not its own `index.tsx`, which stays
  per-branch), the markdown-export plugin) and governance docs (this file,
  `CONTRIBUTING.md`, `HOW_TO_WRITE_A_GUIDE.md`, `UI_UX_GUIDELINES.md`,
  `CODEOWNERS`) are edited only on `main`. This is the full inventory of
  what's mechanically synced -- see `sync-theme.yaml`'s own `SHARED_PATHS`
  for the exact, authoritative path list; keep this bullet in sync with it
  by hand when either changes.

  A synced component only does something on a given branch if that
  branch's own `docusaurus.config.ts` also registers it (config itself is
  deliberately NOT synced, see below) and its docs actually use it --
  e.g. `GuidesCatalog`/`ArtifactPicker` render nothing on a branch whose
  content doesn't reference them yet, even once the component files
  themselves land there via sync.
- `sync-theme.yaml` (lives on `main` only) opens a bot PR into each
  product branch whenever these paths change on `main`.
- Physical duplication is unavoidable, not a compromise: each product
  branch builds as an independent Docusaurus checkout, and GitHub Actions
  itself requires a workflow file to exist on the branch being pushed to
  in order to trigger on that push — `staging_sync.yaml` has to live on
  every product branch for exactly this reason. Authoring once on `main`
  and syncing keeps those copies identical without anyone hand-maintaining
  drift.

## The develop → staging → production pipeline

```
   saas ──┐
integrator┼──push──▶ staging_sync.yaml ──▶ staging branch ──▶ Choreo (auto)
connectors┘          (per product branch)   (merged, always
                                              current)
                                                   │
                                     someone reviews the merged
                                     result together on Choreo
                                                   │
                                  git tag <name> <sha-of-staging-tip>
                                  git push origin <name>
                                                   │
                                                   ▼
                              Actions tab (on `main`) → Promote to
                              Production → ref: <tag>
                                                   │
                                                   ▼
                            promote_to_production.yaml (no rebuild —
                            ships staging's tree byte-for-byte)
                                                   │
                                                   ▼
                                    gh-pages branch → production
```

**Develop** — PRs into a product branch, reviewed, merged.

**Staging** — automatic, on every push to a product branch.
`staging_sync.yaml` builds only the branch that changed and updates its
subdirectory of `staging` (`keep_files: true`, same trick production
already uses), leaving the other two products' subdirectories alone.
Choreo watches `staging` and redeploys on its own. Always current, no
gate — that's the point of staging.

**Production** — deliberate, never automatic. A maintainer reviews the
*merged* result on Choreo (all products together, since that's what
`staging` actually is), tags the current `staging` tip for an immutable
record of exactly what's being promoted, then runs
`promote_to_production.yaml` (`workflow_dispatch`, from `main`'s Actions
tab) with that tag as the `ref` input. That workflow does **no build** —
it checks out the tagged tree (already-built static HTML, all three
products merged) and pushes it to `gh-pages` as-is. Production can never
end up with a combination of products that wasn't actually validated
together on staging, and rollback is just re-running the promote
workflow against an older tag.

## Onboarding a new product (e.g. Agent Builder)

| Where | Change |
|---|---|
| New branch | Create `wso2-<product>` from `main` |
| `staging_sync.yaml` | Add the branch to the trigger list, add a case to the `case` statement's `BASE_URL` lookup with its **own subpath** -- e.g. `/integration-platform/docs/<product>/`, the exact same pattern `saas` (`/saas/`) and `wso2-integrator` (`/integrator/`) already use -- **and add its own `Deploy <product>` step** (copy an existing one, give it its own `destination_dir` matching that subpath). Skipping the deploy step is the easy mistake: the branch still builds fine, it just never gets published anywhere. Every product gets its own subpath; none of them owns the bare family root (that's a static redirect stub, `root-redirect/index.html`, saas-only). Full worked example: `docs/workflows/workflows.md`'s "How to configure its path". |
| `scripts/preview-all-sites.mjs` `SITES` map | Add an entry, same shape as the existing three (`baseUrl`/`mergeSubdir` following that same subpath) |
| `en/src/components/SidebarProductHeader`'s `ProductKey` type, `PRODUCTS` map, `PRODUCT_ORDER` array, and `detectCurrentProduct()` | Add the new key to the `ProductKey` union first -- `tsc` then won't pass until every `Record<ProductKey, ...>` map has a matching entry, including `ReportIssueButton`'s below. Then add label/description/icon/`path` to `PRODUCTS`; add the key to `PRODUCT_ORDER` too (a plain `ProductKey[]`, **not** exhaustiveness-checked -- miss this and the build still passes, the product just silently never appears in the switcher dropdown); and add a matching `baseUrl.includes('/<product>/')` branch to `detectCurrentProduct()`. Full worked example: `docs/workflows/workflows.md`'s "How to configure its path". |
| `en/src/components/ReportIssueButton` `ISSUE_CHOOSER_URLS` map | Add the new product's own issue-tracker repo (`.../issues/new/choose`), keyed the same `ProductKey` as `SidebarProductHeader`'s `PRODUCTS` map (reuses its exported `detectCurrentProduct()`, not duplicated) -- this file is wholesale-shared, so the repo can't be a single constant. `tsc` won't pass until this map has an entry either. Full worked example: `docs/workflows/workflows.md`'s "How to configure its issue-tracker URL". |
| `en/src/theme/DocSidebar/Desktop/icons.tsx` `ICONS_BY_LABEL` | Add an entry for each of your own top-level category labels, so the collapsed desktop sidebar's icon rail shows a real icon instead of the generic fallback dot -- see "How to add a sidebar category icon" in `main`'s `docs/section-1/sub-section-1/sample-page.md` for the full mechanism |
| `en/src/pages/index.tsx` | Replace the placeholder `sections`/`quickLinks` arrays with your own top-level sections, and customize the hero badge/CTA -- see `main`'s `docs/homepage/homepage.md` for what lives where, including the search bar |
| `sync-theme.yaml`'s matrix (on `main`) | Add the branch so it receives the shared theme |
| This file's branch table, and `CONTRIBUTING.md`'s branch table + Section Ownership | Add the row |
| `.github/workflows/shared-content-guard.yaml` | Add if the product will also consume synced shared content from `wso2-integrator` |
| Versioning | If the new product needs release-versioned docs (most self-hosted/on-prem products do; SaaS-style continuously-deployed ones usually don't) -- set it up the same way `wso2-integrator` already is: mark it `Yes` in this file's and `CONTRIBUTING.md`'s branch tables, then once there's a real first release, run `npm run docusaurus docs:version X.Y.Z` (from `en/`) to freeze `docs/` into `versioned_docs/version-X.Y.Z/` + `versioned_sidebars/` and generate `versions.json` -- see "I'm cutting a new wso2-integrator release version" in `CONTRIBUTING.md` for the full step-by-step. The version pill above the sidebar and the `/versions` page pick this up automatically once `versions.json` exists, no further theme/config changes needed. |

`sync-theme.yaml`'s own header comment already anticipated this exact
addition (*"e.g. wso2-agent-builder once un-parked"*) — this checklist
just makes it a repeatable procedure instead of something to remember.

## Golden rule this replaces

`CONTRIBUTING.md`'s Golden Rule 5 previously said "never push directly
to `main` — it only moves when `saas` is force-pushed there." That
framing is retired by this document: `main` isn't a deploy target at
all anymore, product branches deploy to `staging` automatically and to
`gh-pages` only via an explicit promote run. The underlying instinct —
don't casually push to `main` — still holds, just for a different
reason now: `main` is the shared-theme/governance source of truth, so
an unreviewed change there fans out to every product branch.
