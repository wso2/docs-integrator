---
sidebar_position: 0
sidebar_label: Homepage
title: "Homepage"
description: How this site's landing page (src/pages/index.tsx) is put together, including its search bar, and how to customize it for a new product.
slug: /homepage
---

# Homepage

Unlike every other page on this site, the homepage (`/`) isn't generated
from `docs/` -- it's a plain React page at `src/pages/index.tsx`, styled
by `src/pages/index.module.css`. It has four pieces, top to bottom:

1. **Hero** -- a welcome screenshot and download button (left, copied
   verbatim from `wso2-integrator`'s own homepage), plus badge,
   `<h1>` (site title), tagline, the search bar, and a CTA button
   (right).
2. **Search bar** -- see "The search bar" below.
3. **"What do you want to build?"** -- a row of cards from the same
   `quickLinks` array the search bar's dropdown uses.
4. **"Explore the scaffold"** -- one card per top-level section, from
   the `sections` array.

## The search bar

This is a live instance of the same `SearchBar` component the homepage
renders (`src/components/SearchBar/`) -- not a screenshot. Submitting a
query, or the `/` keyboard shortcut, both work here exactly as they do
on the homepage.

<SearchBarPreview quickLinks={[{ label: 'Section 1', sub: 'The top-level placeholder section', to: '/section-1' }, { label: 'Icons', sub: 'Every icon available to doc authors', to: '/icons' }]} />

It submits to the search-local plugin's `/search` page -- the same
destination as the *other* search box on this site, the smaller
always-visible one in the navbar (`src/theme/SearchBar`, a separate,
stock/unswizzled component). The homepage's is bigger, sits in the
hero, and adds the `/` shortcut plus an optional "Popular pages"
dropdown (`quickLinks`, shown above) that the navbar one doesn't have.

`SearchBar` is styled for a dark background (white text, translucent
white borders) to match the hero it was built for -- rendering the bare
`<SearchBar />` directly on a plain doc page would make the text
unreadable. `SearchBarPreview` (used above) wraps it in a frame with
the hero's own navy gradient so it reads correctly here too; reach for
`SearchBarPreview` any time you want to demo it outside the hero,
never the bare component.

## How to customize the homepage for a new product

Everything below lives in `src/pages/index.tsx` (content) and
`src/pages/index.module.css` (styling, saas-synced and generally
shouldn't need touching):

| To change... | Edit... |
| --- | --- |
| The `<h1>` and tagline | Not here -- they read `siteConfig.title`/`siteConfig.tagline` from `docusaurus.config.ts`. |
| The hero badge text ("Docs · Scaffold") | The `<span className={styles.heroBadge}>` literal in `HomepageHeader`. |
| The welcome screenshot / download button (left column) | `WelcomeScreenshot` and the `.downloadRow` block in `HomepageHeader` -- both copied verbatim from `wso2-integrator`'s own homepage, image included (`static/img/landing/wso2-integrator-welcome.png`). Swap the image and the download link/label for a real product's own. |
| The hero CTA button's label/target | The `<Link className={styles.heroBtn} to="/get-started">` in `HomepageHeader` (currently "Let's Get Started"). |
| The search dropdown's "Popular pages" and the tutorial row's cards | The `quickLinks` array -- both surfaces read the same list. Currently the two sample quickstarts under `/get-started/quickstarts/`. |
| The "Explore the scaffold" cards | The `sections` array (`title`, `description`, `link`, `icon`, `iconColor`) -- add/remove an `IconXxx()` function alongside the existing ones for a new card's icon. Icons/Homepage/Workflows were deliberately dropped from this array (still real pages, reachable from the navbar's Explore dropdown and the sidebar, just not advertised as homepage cards). |
| The "Explore the scaffold" heading text | `SectionCards`'s `<Heading as="h2">` literal. |
