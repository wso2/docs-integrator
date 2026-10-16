---
sidebar_position: 0
sidebar_label: Homepage
title: "Homepage"
description: How this site's landing page (src/pages/index.tsx) is put together, and how to customize it for a new product.
slug: /homepage
---

# Homepage

Unlike every other page on this site, the homepage (`/`) isn't generated
from `docs/` -- it's a plain React page at `src/pages/index.tsx`, styled
by `src/pages/index.module.css`. It has four pieces, top to bottom:

1. **Hero** -- the shared `LandingHero` component
   (`src/components/LandingHero/`, authored on `main` and synced to every
   product branch): the product screenshot in a window frame (left), plus
   badge, `<h1>` (site title), tagline, CTA button, a secondary link and a
   footnote (right). Only the layout is shared; each branch passes its own
   text and links as props, and keeps its own screenshot at
   `static/img/landing/hero.png`.
2. **Search bar** -- no longer part of the hero; see "The search bar"
   below for the component itself.
3. **"What do you want to build?"** -- a row of cards from the
   `quickLinks` array.
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
| The hero badge, title, subtitle, CTA, secondary link, footnote, window-frame title | The props passed to `<LandingHero>` in `HomepageHeader`. (The `<h1>` and tagline there read `siteConfig.title`/`siteConfig.tagline`.) |
| The hero screenshot | Replace this branch's `static/img/landing/hero.png` -- content only, no window frame (the frame is drawn by `LandingHero`). That folder isn't synced, so every branch keeps its own image. |
| The hero layout/styling | `src/components/LandingHero/` -- edit on `main` only; it's synced. |
| The tutorial row's cards | The `quickLinks` array. Currently the two sample quickstarts under `/get-started/quickstarts/`. |
| The "Explore the scaffold" cards | The `sections` array (`title`, `description`, `link`, `icon`, `iconColor`) -- add/remove an `IconXxx()` function alongside the existing ones for a new card's icon. Icons/Homepage/Workflows were deliberately dropped from this array (still real pages, reachable from the navbar's Explore dropdown and the sidebar, just not advertised as homepage cards). |
| The "Explore the scaffold" heading text | `SectionCards`'s `<Heading as="h2">` literal. |
