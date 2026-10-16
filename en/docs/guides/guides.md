---
title: Guides
sidebar_label: Guides
sidebar_position: 0
slug: /guides
description: "Searchable landing page for sample guides, built from each guide doc's own frontmatter."
hide_table_of_contents: true
wide_layout: true
---

# Guides

Complete, end-to-end examples you can follow from start to finish --
sample content here, but a real, working instance of the searchable
card catalog a product's real `guides/` section would use.

:::info Guides vs. Develop
**Develop** pages are handbook lookups. **Guides** are narrative
walkthroughs. Different modes, different content.
:::

<GuidesCatalog />

The search box and every card below are generated automatically from
each guide doc's own frontmatter (`card_icon`, `card_summary`,
`card_keywords`) by `src/plugins/guidesCatalogPlugin.js` -- see
`HOW_TO_WRITE_A_GUIDE.md` for the full checklist. There's no
hand-maintained card list to keep in sync; add a new `.md` file under
[How to Guides](/guides/how-to-guides) or
[Business Use Cases](/guides/business-use-cases) with the required
frontmatter and its card appears here automatically.
