---
sidebar_position: 0
sidebar_label: Icons
title: "Icons"
description: Every icon available to doc authors on this site, and how to use one in a PaletteCard or on its own.
hide_table_of_contents: true
wide_layout: true
slug: /icons
---

# Icons

This is the icon set behind [`PaletteCard`](/section-1/sub-section-1/sample-page#how-to-add-a-card)
(see `src/components/PaletteIcon/index.tsx`) -- every name below is a
valid `icon` value. Click a tile to copy its `icon="..."` value.

## How to use one

Pass the name as the `icon` prop on a `PaletteCard`:

```mdx
<PaletteCard icon="book" href="/section-1">
  <h3 class="palette-card-title">Section 1</h3>
  <p class="palette-card-desc">One-line description.</p>
</PaletteCard>
```

Or render one on its own, outside a card -- `PaletteIcon` is a global
MDX component too, so no import is needed:

```mdx
<PaletteIcon name="book" />
```

Need an icon that isn't here? Add a new entry to the `PATHS` map in
`src/components/PaletteIcon/index.tsx` (a `viewBox="0 0 24 24"` stroke
icon, matching the style of its neighbors) -- this gallery picks it up
automatically, since it reads the same file's `PALETTE_ICON_NAMES`
export rather than a separate hand-maintained list.

This is a different icon set from `artifact-icons/` under `static/img/`
(used by `ArtifactPicker`, for the AI assistant's file-type pills) --
that one isn't meant for general doc content, so it isn't included here.

## All icons

<IconGallery />
