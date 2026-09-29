# How to Write a New Guide

This is the checklist for adding a new guide to the `guides/` section
(`en/docs/guides/`). Follow it and the guide's card appears automatically
on the Guides landing page and its own subsection page — there is no
separate list to update by hand anymore.

## Before you start: this is shared content

`guides/` is synced from `wso2-integrator` to `saas` (Golden Rule 1 in
[CONTRIBUTING.md](CONTRIBUTING.md#golden-rules)). **Author new guides on
`wso2-integrator`, not `saas`.** A PR against `saas` that touches
`guides/` is rejected outright by the `shared-content-guard` workflow,
and even if it weren't, the next sync would silently overwrite it.

> **Known gap:** the card system this doc describes (the search box, the
> `PaletteGrid` cards, and the `guidesCatalogPlugin` that builds them from
> frontmatter) was built on `saas` and has not been ported to
> `wso2-integrator` yet. Until it is, writing a guide on `wso2-integrator`
> with the frontmatter below won't produce a card there — only on `saas`,
> once the doc syncs over. Check with whoever owns that port before
> assuming it already works on `wso2-integrator`.

## 1. Pick a category

- **`guides/how-to-guides/`** — task-focused guides for a specific
  integration technique (today, mostly the AI agent/LLM tutorials).
- **`guides/business-use-cases/`** — end-to-end tutorials that model a
  concrete real-world business scenario (e.g. the SAP Business One
  low-stock automation).

If it's not obvious which one fits, look at the existing guides in each
folder — the split is by what kind of problem the guide solves, not by
length or difficulty.

## 2. Write it as a narrative walkthrough, not a reference doc

Guides are tutorials, not handbook lookups — this distinction is stated
outright on the Guides landing page itself:

> **Develop** pages are handbook lookups. **Guides** are narrative
> walkthroughs. Different modes, different content.

Structure it like the existing guides: a short "what you'll build" /
time estimate near the top, then numbered steps, ending in a "What's
next" section with a few related links.

This is the **opposite** convention from `migrate/`'s platform pages,
which are deliberately documentation-style (direct topic sections, no
"Step N" framing) — don't carry that style over here by mistake.

## 3. Required frontmatter

Every guide doc needs:

```yaml
---
sidebar_position: N
title: "Your Guide Title"
description: One or two sentences — used for SEO/meta, not the card.
slug: /guides/how-to-guides/your-guide-slug
card_icon: agents
card_summary: One short line, shown on the guide's card.
---
```

- **`slug`** — already required sitewide; this becomes the card's link.
- **`card_icon`** — one of the names in `PaletteIconName`
  (`en/src/components/PaletteIcon/index.tsx`). Reuse an existing one if
  it fits; if nothing does, add a new one to that file — it's a small,
  consistently-styled icon set (24-unit viewBox, `stroke="currentColor"`,
  2-4 simple paths), follow the existing entries.
- **`card_summary`** — one short line shown under the card title on
  every listing. Keep it tighter than `description`.

**A doc missing `card_icon` or `card_summary` fails the build**, with an
error naming the exact file and field. This isn't just a convention —
it's enforced by `en/src/plugins/guidesCatalogPlugin.js`.

## 4. Optional: `card_keywords`

Add extra search terms that aren't already covered by the title or
summary, so the search box on the Guides page can still find the guide:

```yaml
card_keywords: [chatbot, mssql, persistent memory]
```

Skip this field entirely if the title and summary already say what
someone would search for — it exists to fill gaps, not to be filled in
by default on every doc.

## 5. That's the whole job — nothing else to touch

Once the doc exists with the frontmatter above, its card appears
automatically:

- On the top-level Guides page (`/guides/overview`), under the right
  heading, included in that page's search.
- On its own subsection's landing page (`/guides/how-to-guides` or
  `/guides/business-use-cases`), as a plain card grid.

No array in a `.tsx` file, no bullet list on another page. If you find
yourself about to hand-edit a card list somewhere to add a guide, stop —
that means either the new doc's frontmatter is wrong, or something has
regressed back to the old hand-maintained approach.

## 6. Verify

```bash
cd en
npx docusaurus build
```

This runs the guide's frontmatter validation (so a missing `card_icon` or
`card_summary` fails loudly, naming the file) and confirms every link in
the new doc resolves. A handful of broken links are pre-existing and
unrelated to guides (cross-branch `connectors/` links, a few stale links
elsewhere in synced content) — if you're unsure whether one is
pre-existing, check whether it's still reported without your change.
