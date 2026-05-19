---
title: Array to Single Value
---

# Array to Single Value

When the input is an array and the output is a single value, the data mapper offers two options depending on whether you want one element from the array or a value computed across the array.

## Extract single element

To pull a single value out of an array, use **Extract Single Element from Array**. This option appears whenever you map an array onto a single-value output (a dimension mismatch).

![Extract Single Element option appearing on a single-value output mapped from an array](/img/develop/integration-artifacts/supporting/data-mapper/extract-single-element.gif)

## Aggregate and map

To compute a single value from each element of an array (for example, sum, average, count), use **Aggregate and Map**. Aggregation supports primitive-type arrays mapped to a compatible primitive output. The data mapper opens a focused view. Map the input array's element to the output, and the data mapper then prompts for the aggregation operation.

![Aggregate and Map focused view with the available aggregation operations](/img/develop/integration-artifacts/supporting/data-mapper/aggregate-and-map.gif)

## What's next

- [Array to array](./array-to-array.md) — Map between two arrays with iteration, joins, and nesting.
- [Generic type mappings](../generic-type-mappings.md) — Generate types from a sample JSON or XML payload.
- [Sub Mappings](../submappings.md) — Reuse mapping logic across multiple output fields.
