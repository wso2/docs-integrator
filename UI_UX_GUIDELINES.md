# WSO2 Docs — UI/UX Design Guidelines

This is the design reference for the `docs-integrator` site family (`saas`,
`wso2-integrator`, `wso2-connectors`). It documents the theme that was built
out on `saas` first — every color, font, spacing rule, and component below
is copied from the actual working code, not aspirational. Use it to:

- **Propagate the theme** to `wso2-integrator` and `wso2-connectors` (see
  [Per-Branch Notes](#per-branch-notes) for what's shared vs. what must
  differ per branch).
- **Keep new work on-brand** — any new component or page should reuse the
  tokens and patterns here rather than inventing new colors/spacing.
- **Feed a future "docs-integrator" skill** that generates documentation
  sites from this system — every section names the exact file that
  implements it, so the pattern can be lifted mechanically.

> Design philosophy: neutral grays for structure, color only for
> interactive/active elements, generous whitespace, crisp typography. Navy
> is the brand's structural color (hero, footer, logo badge); Pulse orange
> is the sole accent, used for anything interactive.

---

## Table of Contents

1. [Color Palette](#color-palette)
2. [Typography](#typography)
3. [Spacing & Radius Conventions](#spacing--radius-conventions)
4. [Iconography](#iconography)
5. [Components](#components)
   - [Navbar](#navbar)
   - [Logo](#logo)
   - [Product + Version Pills](#product--version-pills)
   - [Copy Page Dropdown](#copy-page-dropdown)
   - [Sidebar](#sidebar)
   - [Table of Contents ("On this page")](#table-of-contents-on-this-page)
   - [Breadcrumbs](#breadcrumbs)
   - [Footer](#footer)
   - [Homepage Hero](#homepage-hero)
   - [Homepage Cards](#homepage-cards)
   - [AI Assistant Panel](#ai-assistant-panel)
   - [Buttons](#buttons)
   - [Content Elements](#content-elements-admonitions-code-tables-tabs)
   - [Badges](#badges)
6. [File Map](#file-map)
7. [Per-Branch Notes](#per-branch-notes)
8. [Propagation Checklist](#propagation-checklist)

---

## Color Palette

All colors are CSS custom properties defined in
[`en/src/css/custom.css`](en/src/css/custom.css), redeclared under
`[data-theme='dark']` for the dark variant. Never hardcode a hex value in a
new component — reference the token.

### Brand primary — Pulse Orange

The single accent color, **the same value in both light and dark theme**
(unlike the old brand-blue, orange reads clearly on both white and navy
without needing a separate brighter dark-mode shade).

| Token | Value | Use |
|---|---|---|
| `--ifm-color-primary` | `#F14E23` | Buttons, active fills, borders-on-hover, badges |
| `--ifm-color-primary-dark` | `#D63B12` | Hover state (darken on light surfaces) |
| `--ifm-color-primary-darker` | `#C13710` | Further hover step |
| `--ifm-color-primary-darkest` | `#A62E0D` | Deepest step |
| `--ifm-color-primary-light` | `#FF6B3D` | — |
| `--ifm-color-primary-lighter` | `#FF8A3D` | Gradient partner, hover state (lighten on dark surfaces) |
| `--ifm-color-primary-lightest` | `#FFAD75` | — |

**Text-on-surface accent** — a separate, slightly different token for
places orange is used as *text* (links, active nav/TOC/breadcrumb labels)
rather than a filled surface. Filled buttons/badges use the vivid
`--ifm-color-primary`; text uses this:

| Token | Light | Dark |
|---|---|---|
| `--wso2-accent-text` | `#D63B12` | `#FF9163` |

**Peach active-state fill** — the background wash behind an active
nav/sidebar/breadcrumb item (not a token — used as a literal in each rule,
since it never needs to vary beyond light/dark):

- Light: `#FDE3D9` (solid)
- Dark: `rgba(241, 78, 35, 0.16)`

**The one CTA gradient** — reserved for the hero button and the homepage
"Build an X" cards, nothing else:

```css
background: linear-gradient(135deg, #F14E23, #FF8A3D);      /* rest */
background: linear-gradient(135deg, #D63B12, #F14E23);      /* hover */
```

### Brand navy — structural color

Used for the hero banner, footer, logo badge, and the "Develop" category
icon tint. **Theme-invariant** — always this navy regardless of the site's
light/dark toggle, same as a fixed brand banner.

| Token | Value | Use |
|---|---|---|
| `--wso2-navy` | `#1B2A49` | Deep navy — gradient end, heading color (light theme) |
| `--wso2-navy-mid` | `#26365A` | Mid navy — gradient start |
| `--wso2-navy-deep` | `#0F172A` | Near-black navy, rarely used directly |

Standard navy gradient recipe (hero, footer, logo badge, AI panel header):

```css
background: linear-gradient(150deg, var(--wso2-navy-mid), var(--wso2-navy));
```

### Neutrals — Light theme

| Token | Value | Role |
|---|---|---|
| `--ifm-background-color` | `#FFFFFF` | Page background |
| `--ifm-background-surface-color` | `#F7F9FC` | "Ash" — section washes, card backgrounds |
| `--wso2-sidebar-bg` | `#FBFCFE` | Sidebar background |
| `--wso2-surface-border` | `#E5E9F0` | Standard border ("lines") |
| `--wso2-border-subtle` | `#EEF1F6` | Hairline divider |
| `--wso2-well-bg` | `#F2F5F9` | Code blocks, table headers, wells |
| `--wso2-heading-color` | `#1B2A49` | All headings (h1–h6), applied globally |
| `--ifm-font-color-base` | `#565656` | Body text |
| `--wso2-text-muted` | `#7B8598` | Secondary/muted text, uppercase labels |

### Neutrals — Dark theme

| Token | Value | Role |
|---|---|---|
| `--ifm-background-color` | `#0B1120` | Page background |
| `--ifm-background-surface-color` | `#0E1728` | "Alt" surface — section washes |
| `--wso2-sidebar-bg` | `#0C1424` | Sidebar background |
| `--wso2-surface-border` | `rgba(255,255,255,.09)` | Standard border |
| `--wso2-well-bg` | `#0F1930` | Code blocks, table headers |
| `--wso2-heading-color` | `#EFF3F9` | All headings |
| `--ifm-font-color-base` | `#B6C1D3` | Body text |
| `--wso2-text-muted` | `#8B94A7` | Muted text |

### On-navy support (hero, footer — always dark regardless of theme)

| Token | Value | Role |
|---|---|---|
| `--wso2-on-navy-text` | `#FFFFFF` | Primary text/links on navy |
| `--wso2-on-navy-cool` | `#C8D3E6` | Body text on navy (footer links, hero subtitle) |
| `--wso2-on-navy-muted` | `#9FB0CC` | Muted text on navy (captions) |
| `--wso2-on-navy-muted-dim` | `#8FA0BD` | Dimmest text on navy (copyright) |
| `--wso2-on-navy-label` | `#FFB59A` | Footer column titles (peach-tinted uppercase labels) |
| `--wso2-status-dot` | `#4ADE80` | Reserved for a live/status indicator (not yet used) |

### Rule: no blue as a brand color

The old theme used blue (`#0077B6` light / `#38BDF8` dark) as primary.
Orange replaced it everywhere **except** semantic content markers, which
keep their conventional, brand-independent colors:

- `.admonition-info` stays blue (`#38BDF8`) — "info = blue" is a
  near-universal doc-site convention, distinct from brand identity.
- `.admonition-tip` stays green (`#34D399`), `.admonition-danger` stays red
  (`#F87171`), `.admonition-note` stays grey (`#94A3B8`).
- Homepage "Explore the platform" category icons keep distinct per-category
  colors (green/purple/amber/cyan/indigo/slate) for quick visual scanning —
  these were never tied to brand primary.
- Ballerina code syntax highlighting (`.token.class-name`, purple) is
  unrelated to the brand palette.

---

## Typography

Two Google Fonts, loaded via one `@import` in `custom.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap');
```

| Role | Font | Token |
|---|---|---|
| Body text | Inter | `--ifm-font-family-base` |
| Headings (h1–h6, all "title" text in custom components) | Plus Jakarta Sans | `--ifm-heading-font-family` |
| Code | System monospace (Prism default) | — |

Plus Jakarta Sans is applied explicitly (`font-family: 'Plus Jakarta Sans', sans-serif`)
in every custom component that renders a title/heading-like string outside
of a real `<h1>`–`<h6>` tag (hero heading, card titles, footer wordmark,
logo wordmark, sidebar header) — Infima's heading var only covers real
heading elements.

### Heading scale

| Level | Size |
|---|---|
| h1 | `1.75rem` (28px); hero/article h1 uses `clamp(30px, 3.4vw, 44px)` |
| h2 | `1.375rem` (22px) |
| h3 | `1.125rem` (18px) |
| h4 | `1rem` (16px) |
| h5 | `0.875rem` (14px) |

Base body font-size is `16px`, line-height `1.65`.

---

## Spacing & Radius Conventions

There is **no fully-round pill shape** left anywhere in the interactive
chrome (nav links, pills, buttons, cards) — everything uses a consistent
"squarish rounded" radius. Fully-round (`border-radius: 50%`) is reserved
for icon badges, dots, and circular avatar-style elements only.

| Element type | Radius |
|---|---|
| Nav links, sidebar items, rail icon buttons | `8–11px` |
| Product/version pills, copy-page button, dropdown trigger buttons | `10–11px` |
| Cards (homepage, connector catalog) | `14–16px` |
| Dropdown/popover menus | `12–16px` |
| Small icon badges (product pill icon, section-card icon) | `6–11px` |
| Circular (logo badge, color-mode toggle, GitHub icon, dots) | `50%` |
| Inline code chips | `6px` |

Standard icon-button hit target: **2rem (32px) square**, used for the
color-mode toggle and the GitHub navbar icon — any new icon-only navbar
button should match this so the row reads as one family.

---

## Iconography

- Line icons throughout: `stroke="currentColor"`, `stroke-width` between
  `1.7`–`2.2`, `stroke-linecap="round"`, no fill (outline style).
- The brand mark is the real WSO2 logo SVG (`en/static/img/logo.svg` /
  `logo-dark.svg` — a waveform-in-circle monogram), not a fabricated icon.
  Always the white-ink `logo-dark.svg` variant when placed on a navy badge
  (navbar logo, footer logo), regardless of site theme.
- A secondary decorative "waveform" stroke icon (`M5 12h3l2-4 3 8 2-4h4`) is
  used for small inline badges (hero "Docs" pill, cloud-console mockup
  icon) where a tiny inline SVG is more practical than the real logo file.

---

## Components

### Navbar

**File:** [`en/src/theme/Navbar/index.tsx`](en/src/theme/Navbar/index.tsx) (wraps `@theme-original/Navbar`) +
[`styles.module.css`](en/src/theme/Navbar/styles.module.css)

Structure: the stock Docusaurus `<Navbar>` (row 1) + a persistent second
row underneath (`.secondaryRow`) containing the product/version pills and
the Copy Page button. Both rows are `position: sticky`, stacked (row 2's
`top` offset equals the navbar's own height), so they scroll together.

Row 1 (stock Navbar, restyled):
- Frosted glass: `backdrop-filter: blur(40px) saturate(180%)`, background
  `rgba(255,255,255,.85)` light / `rgba(10,16,32,.6)` dark.
- **All navbar links are right-aligned** (`position: 'right'` in config),
  clustered next to the GitHub icon: `Connectors → Releases → Contribute →
  Community (dropdown) → Blog → GitHub icon → color-mode toggle → search`.
  Only the logo sits on the left.
- GitHub icon: icon-only (`html:`, not `label:`, so Docusaurus doesn't
  auto-append its external-link arrow), styled to the same 2rem circular
  hit target as the color-mode toggle via a `className: 'navbar-github-link'`
  hook (rule lives in `custom.css`, not the navbar's own module, since
  Docusaurus navbar items don't carry CSS modules).
- Active link: `color: var(--wso2-accent-text)`, peach background fill.

Row 2 (`.secondaryRow` / `.secondaryRowInner`): `display:flex;
justify-content:space-between` — product+version pills on the left, Copy
Page button on the right. See their own sections below.

Config source for the shared navbar items (`sharedGithubNavbarItem`,
`sharedCommunityDropdown`, `sharedBlogNavbarItem`,
`sharedContributeNavbarItem(branch)`, `sharedReleasesNavbarItem(target)`)
lives in
[`en/src/theme-shared/themeConfig.ts`](en/src/theme-shared/themeConfig.ts) —
kept in sync across all three branches by hand (not build-synced).

### Logo

**File:** [`en/src/theme/Logo/index.tsx`](en/src/theme/Logo/index.tsx) (full
custom swizzle, not a wrapper) + `styles.module.css`

A navy circular badge (32px, gradient `linear-gradient(150deg,
var(--wso2-navy-mid), var(--wso2-navy))`) containing the white-ink
`logo-dark.svg` (19×19), beside a two-line wordmark:

```
WSO2                       ← Plus Jakarta Sans, 800, 17px, heading color
INTEGRATION PLATFORM       ← 11.5px, 500, letter-spacing .16em, uppercase, muted color
```

The badge is theme-invariant (always navy); the wordmark text uses the
normal heading/muted color tokens (adapts light/dark). Only `logo.href`
from `themeConfig.navbar.logo` is read — this swizzle replaces the
image-based stock Logo entirely, so `src`/`srcDark`/`alt` in config are
unused (kept minimal in `sharedNavbarLogo`, just `{ href: '/' }`).

### Product + Version Pills

**File:** [`en/src/components/SidebarProductHeader/index.tsx`](en/src/components/SidebarProductHeader/index.tsx) + `styles.module.css`

Two **independent** bordered pills side by side with a small gap
(`.pillGroup { display:flex; gap:0.5rem }`) — not fused into one control.

- **Product pill**: fixed width `10rem` (so switching products from "SaaS"
  to "WSO2 Integrator" doesn't resize the row), icon badge before the
  label (20×20px, `border-radius:6px`, peach background, waveform icon in
  `--wso2-accent-text`), label, trailing chevron. Opens a dropdown listing
  the *other* products as real `<a>` tags (not `<Link>` — each product is a
  **separate static build**, so this must always be a real page load, see
  the `isInternalUrl` note in the file's own docstring).
- **Version pill**: small colored dot (7px circle, `background:
  var(--ifm-color-primary)`, `box-shadow: 0 0 0 3px` peach) before the
  label, then the active version label, trailing chevron. Hidden entirely
  on unversioned sites (`versions.length <= 1`) or where the doc-version
  context isn't available (wrapped in a render-error boundary,
  `VersionPillBoundary` — see the file for why: this row renders globally
  via the Navbar swizzle, so on non-doc pages the version-context hooks
  throw, and the boundary just hides the widget rather than crashing the
  page).

Both pills share one `Pill` component: `border: 1px solid
var(--wso2-surface-border); border-radius: 11px; box-shadow:
var(--wso2-card-shadow)`, hover just brightens the border to
`var(--ifm-color-primary)` (no fill change).

### Copy Page Dropdown

**File:** [`en/src/theme/Navbar/CopyPageButton.tsx`](en/src/theme/Navbar/CopyPageButton.tsx) (the button itself is
[`en/src/theme/DocBreadcrumbs/MarkdownButton.tsx`](en/src/theme/DocBreadcrumbs/MarkdownButton.tsx), reused) +
[`en/src/theme/DocBreadcrumbs/styles.module.css`](en/src/theme/DocBreadcrumbs/styles.module.css)

Sits at the far right of the secondary navbar row. `border-radius: 10px`
(square, **not** a pill — this was corrected from an earlier round-pill
draft). Opens a dropdown menu (`border-radius: 12px`) with: Copy page /
View as Markdown / Download as PDF / Open in ChatGPT / Open in Claude /
Open in Perplexity.

`CopyPageButton` derives the current doc's markdown URL via
`useActiveDocContext(undefined)` (**not** `useDoc()` — `useDoc()` needs
`<DocProvider>`, which is a *descendant* of the Navbar in the docs route
tree, not an ancestor, so calling it from this globally-rendered row throws
"outside DocProvider". `useActiveDocContext` only depends on global plugin
data, so it safely returns `undefined` on non-doc pages instead of
throwing — see the file's docstring if extending this).

### Sidebar

**Files:**
[`en/src/theme/DocSidebar/Desktop/index.tsx`](en/src/theme/DocSidebar/Desktop/index.tsx) +
[`icons.tsx`](en/src/theme/DocSidebar/Desktop/icons.tsx) +
[`styles.module.css`](en/src/theme/DocSidebar/Desktop/styles.module.css),
plus [`en/src/theme/DocRoot/Layout/Sidebar/index.tsx`](en/src/theme/DocRoot/Layout/Sidebar/index.tsx) + `styles.module.css`

**Expanded state:**
- A "DOCUMENTATION" header row (`.sidebarHeader`) — 10.5px uppercase muted
  label + a custom collapse button (`.sidebarHeaderCollapse`, 30×30px,
  `border-radius:9px`), replacing Docusaurus's stock `<CollapseButton>`.
- Nav links (`.menu__link`, styled in `custom.css`): `border-radius:11px;
  font-size:13.5px; font-weight:600; padding:10px 12px`.
- **Active top-level category**: solid peach fill (`#FDE3D9` /
  `rgba(241,78,35,.16)`), `color: var(--wso2-accent-text)`, no left border
  — a flat pill fill, not an accent-bar treatment.
- **Active nested leaf item** (inside an expanded category): a *different*,
  more subtle treatment — neutral grey/white-alpha chip fill
  (`rgba(0,0,0,.04)` / `rgba(255,255,255,.06)`), **not** peach, with just
  the accent text color. This keeps the top-level category "visually in
  charge" of the peach fill; only one level gets it. Selector:
  `.menu__list .menu__list .menu__link--active:not(.menu__link--sublist)`.
- Bottom-pinned `<ProductDocsLinks />` (external links to sibling product
  docs — MI/SI).

**Collapsed state — a real 64px icon rail**, not stock Docusaurus's 30px
"sliver + tiny re-expand tab": an expand button (bordered, card-styled,
distinct from the plain icon buttons below it), a divider, then one 38×38
icon button per top-level sidebar category (from `icons.tsx`'s
label→icon lookup, with a generic fallback dot icon for any
future/renamed category). Rail icons don't navigate — clicking any of
them just re-expands the sidebar (matches the reference design exactly).

**Why `DocRoot/Layout/Sidebar` is also swizzled:** Docusaurus's own
collapse-width CSS lives inside `@layer docusaurus.theme-classic`. CSS
cascade layers make unlayered rules lose to layered ones for `!important`
declarations (the ordering is inverted vs. normal declarations) — so
nothing in `custom.css` could override the stock 30px collapsed width to
our 64px, at any specificity, with or without `!important`. Re-authoring
just the width-related rules in a plain (unlayered) stylesheet sidesteps
the fight entirely. Two more real gotchas fixed in the same swizzle,
documented in the file:
- `flex: 0 0 <var>` (not bare `width`) — flex items renegotiate a bare
  `width` against sibling `flex-grow`, settling on an arbitrary in-between
  size; the shorthand pins it.
- `min-width: 0` on the container — flex items default to `min-width:
  auto`, which floors shrinking at the sidebar's own content's min-content
  size (wider than 64px once there's a header + nav labels in there).

**Enabling flag:** `docs.sidebar.hideable: true` in
[`themeConfig.ts`](en/src/theme-shared/themeConfig.ts)'s `sharedDocsSidebar`
— off by default in Docusaurus; without it the collapse button doesn't
exist at all.

### Table of Contents ("On this page")

**File:** [`en/src/theme/TOC/index.tsx`](en/src/theme/TOC/index.tsx) (wraps
`@theme-original/TOC`) + `styles.module.css`, active-item styling in
`custom.css`.

Docusaurus's stock TOC has no title of its own — this wrapper adds an "On
this page" label (11px, 700, uppercase, `letter-spacing:.14em`, muted
color) above the item list.

Items: `border-left: 2px solid transparent; padding-left: 0.7rem` on every
link (so the active state doesn't shift layout when its border appears).
Active item: `border-left-color: var(--ifm-color-primary)`, text color
`var(--wso2-accent-text)`, `font-weight:600`.

### Breadcrumbs

**File:** [`en/src/theme/DocBreadcrumbs/index.js`](en/src/theme/DocBreadcrumbs/index.js) + `styles.module.css`

Active breadcrumb item: peach fill + accent text (same recipe as
navbar-link-active and sidebar-category-active). Also owns the
connector-specific version-dropdown breadcrumb segment (only relevant on
`wso2-connectors`) and the category badge shown on connector overview
pages.

### Footer

**File:** [`en/src/theme/Footer/index.tsx`](en/src/theme/Footer/index.tsx) (full
custom swizzle) + `styles.module.css`

Stock Docusaurus's Footer only supports link columns + one logo/copyright
row — this swizzle adds a brand column and a distinct bottom bar,
reading `footer.links`/`footer.copyright` from `docusaurus.config.ts` the
same way the original does (content stays config-driven; only layout is
custom).

Layout, top to bottom:
1. **`.footerTop`** (flex row, wraps): a brand column (logo badge + "WSO2 /
   Integration Platform" wordmark + tagline + GitHub/Discord pill buttons),
   then the config-driven link columns. Column titles are uppercase
   peach (`--wso2-on-navy-label`), links are `--wso2-on-navy-cool` →
   white on hover.
2. **`.footerBottom`**: copyright (left) + legal links (right,
   `margin-left:auto`). Currently only "Report an issue" (a real GitHub
   issues link) — **Privacy policy / Terms of use are intentionally not
   linked yet**, since no confirmed URL exists for either; add them once
   real URLs are available, don't fabricate one.

Always the navy gradient background (`linear-gradient(150deg,
var(--wso2-navy-mid), var(--wso2-navy))`), independent of site theme.

### Homepage Hero

**File:** [`en/src/pages/index.tsx`](en/src/pages/index.tsx)'s
`HomepageHeader` + `index.module.css` — **content differs per branch**, see
[Per-Branch Notes](#per-branch-notes).

Split two-column layout inside a navy-gradient banner with a soft orange
radial glow (`radial-gradient(closest-side, rgba(241,78,35,.28),
transparent)`, `-120px` above the section):

- **Left**: a "product card" — browser-chrome frame (3 dots + a title bar
  label) wrapping either a real product screenshot (`wso2-integrator`) or
  an illustrative HTML/CSS mockup screen (`saas`, since no real cloud
  console screenshot exists) — plus a white pill CTA button + a caption
  below it.
- **Right**: a small pill badge (waveform icon + "Docs · X"), the page
  `<h1>` (`clamp(34px,3.6vw,52px)`, Plus Jakarta Sans 800), a subtitle, the
  search bar (restyled: `height:54px; border-radius:14px;
  background:rgba(255,255,255,.07)`), and the one CTA gradient button.

### Homepage Cards

**File:** same `index.tsx`/`index.module.css` — `TutorialRow` and
`SectionCards`.

- **"What do you want to build?"** (`TutorialRow`): bordered cards
  (`border-radius:16px`, `box-shadow:var(--wso2-card-shadow)`), title +
  subtitle text on the left, a 34×34 peach icon badge with an arrow icon
  on the right. Border brightens to primary orange on hover. (Previously
  these were solid-orange filled pills — that treatment is now reserved
  for the hero CTA / product cards only.)
- **"Explore the platform"** (`SectionCards`): bordered cards
  (`background: var(--ifm-background-surface-color)`), a 36×36 bordered
  *square* icon badge (not a tinted circle) with a per-category stroke
  color (kept distinct per category on purpose — see
  [the no-blue rule](#rule-no-blue-as-a-brand-color)), title, description.

The former separate "What's New" band was removed (release notes are
reachable via the navbar's "Releases" link instead) to match the
reference layout exactly.

### AI Assistant Panel

**File:** [`en/src/components/AiAssistantPanel/index.tsx`](en/src/components/AiAssistantPanel/index.tsx) + `styles.module.css`

Entirely token-driven (`var(--ifm-color-primary)`,
`var(--wso2-surface-border)`, `var(--wso2-card-shadow-hover)`, etc.) — no
hardcoded colors, so it already follows theme changes automatically. No
backend: opens ChatGPT/Claude/Perplexity in a new tab with the page URL
appended to the prompt, or triggers `window.print()` for the PDF option
via `MarkdownButton`.

### Buttons

`.button--primary`: solid `#F14E23` fill, white text, same value in both
themes (unlike most other primary-color uses, a filled button doesn't need
a dark-mode-specific shade — orange has enough contrast against both white
and navy). Hover: `#D63B12` (darken) in light, `#FF8A3D` (lighten) in dark
— chosen because a *fill* color should darken on a light hover-highlight
and lighten against a dark one.

`.button--secondary`: neutral surface fill (`#F2F5F9` light /
`rgba(255,255,255,.06)` dark), no accent color at all.

### Content Elements (admonitions, code, tables, tabs)

- **Admonitions**: neutral background (`--ifm-background-surface-color`
  equivalent), colored left border only, `border-radius:12px`. Colors are
  semantic (info=blue, tip=green, caution=brand orange, danger=red,
  note=grey) — see [the no-blue rule](#rule-no-blue-as-a-brand-color).
- **Code** (inline + blocks): background `--wso2-well-bg`, border
  `--wso2-surface-border`, text color `--wso2-heading-color` (stronger
  contrast than body text, since code often needs it).
- **Tables**: `border-radius:10px`, header row uses the "ash"/"alt"
  surface color, zebra-striping on even rows, hover uses `--wso2-well-bg`.
- **Tabs**: bordered tab strip, active tab gets a 2px top border in
  `var(--ifm-color-primary)` plus `--wso2-accent-text` label color.
- **Pagination nav**: `border-radius:12px` cards, label color
  `--wso2-accent-text`.

### Badges

Content-type badges (`.badge--quickstart`, `.badge--howto`) that were
tied to the old brand-blue primary now read `var(--ifm-color-primary)`
directly. `.badge--concept` reads `var(--wso2-navy)`. `.badge--tutorial`
(indigo) and `.badge--reference` (slate) are intentionally left as
distinct, brand-independent categorical colors.

---

## File Map

| Area | Path |
|---|---|
| Design tokens, global overrides | `en/src/css/custom.css` |
| Shared navbar/footer config (per-branch values factored out) | `en/src/theme-shared/themeConfig.ts` |
| Navbar wrapper (secondary pill row) | `en/src/theme/Navbar/` |
| Copy Page button (navbar-row version) | `en/src/theme/Navbar/CopyPageButton.tsx` |
| Logo | `en/src/theme/Logo/` |
| Product/version pills | `en/src/components/SidebarProductHeader/` |
| Sidebar (desktop, rail) | `en/src/theme/DocSidebar/Desktop/` |
| Sidebar collapse container (width mechanics) | `en/src/theme/DocRoot/Layout/Sidebar/` |
| Breadcrumbs + Copy Page dropdown markup | `en/src/theme/DocBreadcrumbs/` |
| Table of Contents | `en/src/theme/TOC/` |
| Footer | `en/src/theme/Footer/` |
| Homepage (hero, cards) | `en/src/pages/index.tsx`, `index.module.css` |
| AI Assistant panel | `en/src/components/AiAssistantPanel/` |
| Connector catalog page | `en/src/components/ConnectorCatalog/` |
| Product-docs sidebar footer links | `en/src/components/ProductDocsLinks/` |
| Brand mark assets | `en/static/img/logo.svg`, `logo-dark.svg` |

---

## Per-Branch Notes

Some pieces are **byte-identical across branches** (copy verbatim); others
are **intentionally per-branch** (adapt content, keep the pattern). When
propagating a change, check which category it's in before copying:

**Shared verbatim** (kept in sync by hand, diff-check with `git show
branchA:path` vs `git show branchB:path` before copying):
- `custom.css`
- `theme-shared/themeConfig.ts`
- `theme/Navbar/`, `theme/Logo/`, `theme/Footer/`, `theme/TOC/`
- `theme/DocSidebar/Desktop/`, `theme/DocRoot/Layout/Sidebar/`
- `theme/DocBreadcrumbs/index.js` and its `styles.module.css`
  (`MarkdownButton.tsx` itself has a **known divergence**: `wso2-connectors`
  has an improved `ClipboardItem`-based clipboard-write implementation —
  preserve that when syncing this file, apply the same logical edit
  surgically rather than overwriting)
- `components/SidebarProductHeader/`, `components/AiAssistantPanel/`,
  `components/ProductDocsLinks/`

**Per-branch content** (same pattern, different data):
- `docusaurus.config.ts`'s navbar `items` array — `wso2-connectors` has no
  self-link to itself (saas/wso2-integrator each link to Connectors);
  `Releases` points at a real release-notes page on saas/wso2-integrator
  but at the GitHub releases list on `wso2-connectors` (no release-notes
  page exists there); `Contribute` always points at that branch's own
  `CONTRIBUTING.md`.
- `en/src/pages/index.tsx` hero content — `wso2-integrator` shows the real
  IDE screenshot + "Download the IDE" + OS download links; `saas` shows the
  illustrative cloud-console mockup + "Launch WSO2 Cloud" (linking to the
  real `/get-started/setup/cloud-setup` page) — **never invent a hero for
  `wso2-connectors` without checking with the user first**; its current
  homepage content is separately known to be stale/broken (pre-existing,
  unrelated to this theme work) and needs its own fix pass.
- `custom.css` on `wso2-connectors` has one extra block (mobile nav
  sidebar-visibility rules) not present on the other two branches —
  preserve it when copying.

---

## Propagation Checklist

When bringing a theme change from `saas` to `wso2-integrator` or
`wso2-connectors`:

1. `git show <branch>:<path>` diff the target file against `saas`'s
   pre-change version — confirm it was actually identical before you
   started (don't blindly overwrite a branch-specific divergence).
2. Copy the changed **shared** files verbatim (see list above).
3. Re-apply **per-branch content** edits by hand (see list above) — these
   never copy verbatim.
4. Run the dev server (`npx docusaurus start en` from that branch's
   worktree) and manually check: light + dark mode, the navbar row, the
   product/version pills switch correctly (shows "Connectors" when active
   on that branch), sidebar collapse/rail, footer, and — if that branch has
   real doc versions — the version pill/dropdown.
5. Commit locally. Do not push unless explicitly asked.
