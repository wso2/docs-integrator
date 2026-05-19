---
title: Array to Array
---

# Array to Array

When both the input and the output are arrays, the data mapper offers four mapping styles. Pick the one that matches the relationship between the source and target arrays.

## Map each element

To transform each item in an input array into an item in an output array, use **Map Each Element**. The data mapper opens a focused view scoped to the array element types and generates a Ballerina query expression.

![Map Each Element opening a focused view for an Engineer array mapping](/img/develop/integration-artifacts/supporting/data-mapper/map-each-element.gif)

Within the focused view, refine the query using the available clauses:

| Clause Type | Purpose |
|---|---|
| **Condition** | Filter elements by a condition |
| **Local variable** | Define local variables for use in the projection |
| **Sort by** | Sort the result |
| **Limit** | Cap the number of output elements |
| **From** | Add another iteration source |
| **Join** | Combine elements from a second array |
| **Group by** | Group elements before projection |

## Assign as is

When the input and output array types are identical, use **Assign as is** to assign the array directly without iteration.

![Assign as is option mapping a Person array directly to an EngineerMapping array](/img/develop/integration-artifacts/supporting/data-mapper/assign-as-is.gif)

## Nested iterate

To iterate a second array on each iteration of an outer array, first map the outer array using **Map Each Element**. When inside the focused view, select the second array and map it to the target. Then the data mapper offers the **Nested Iterate** option to wrap it in an inner query.

![Nested Iterate prompt when mapping a second array inside the focused view](/img/develop/integration-artifacts/supporting/data-mapper/nested-iterate.gif)

## Join with condition

To join two arrays on a condition, first map the first array with **Map Each Element**. When inside the focused view, select the second array and map it to the target. Then the data mapper offers the **Join with Condition** option. Define the join condition in the side panel.

![Join with Condition prompt and side panel for defining the join expression](/img/develop/integration-artifacts/supporting/data-mapper/join-with-condition.gif)

## What's next

- [Array to single value](./array-to-single-value.md) — Reduce an array to a single value.
- [Generic type mappings](../generic-type-mappings.md) — Generate types from a sample JSON or XML payload.
- [Sub Mappings](../submappings.md) — Reuse mapping logic across multiple output fields.
