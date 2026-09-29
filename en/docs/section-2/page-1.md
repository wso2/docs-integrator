---
sidebar_position: 1
sidebar_custom_props: { "separatorBefore": "Separator 1" }
title: "Page 1"
description: A plain leaf doc under Section 2, preceded by its own sidebar separator label ("Separator 1") -- a live example of the separator convention explained in sample-page.md.
slug: /section-2/page-1
---

# Header 1

A plain leaf doc, same shape as
[Sample Page](/section-1/sub-section-1/sample-page) -- the only thing
different here is `sidebar_custom_props: { "separatorBefore": "Separator 1" }`
in its frontmatter, which renders a non-clickable "Separator 1" label
in the sidebar immediately above this page's own entry. See "How to
add a separator" in `sample-page.md` for the full mechanism (the same
field also works on a category's `_category_.json`, not just a flat
doc's frontmatter like here).

## Sub-header 1

Placeholder paragraph.
