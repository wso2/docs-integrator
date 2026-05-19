---
title: Data Mapper
---

# Data Mapper

The data mapper transforms data between different record types using a visual canvas. Map fields, write inline expressions, iterate over arrays, aggregate values, and reuse common mappings as sub mappings, all without leaving the integration flow.

:::info Prerequisites
- WSO2 Integrator installed ([Install guide](../../../../get-started/setup/local-setup.md))
- An integration project

## What you can do

| Topic | Description |
|---|---|
| [Access paths](./access-paths/access-paths.md) | Open the data mapper as a reusable artifact or inline from a flow node. |
| [Mapping capabilities](./mapping-capabilities.md) | One-to-one, many-to-one, expression bar, convert and map, custom functions, transformation functions, and AI-assisted mapping. |
| [Array mappings](./array-mappings/array-mappings.md) | Map between arrays with iteration, joins, nesting, single-element extraction, and aggregation. |
| [Generic type mappings](./generic-type-mappings.md) | Generate types from a sample JSON or XML payload and map between formats. |
| [Sub Mappings](./submappings.md) | Define reusable mapping logic and apply it to multiple output fields. |

## When to use the data mapper

| Use case | Recommended approach |
|---|---|
| Transform a payload at the boundary of an integration | Reusable data mapper artifact |
| Shape a value within a flow (for example, on a **Declare Variable** node) | Inline data mapper |
| Bootstrap a complex mapping quickly | **Auto Map** in the data mapper view ([Map with AI](./mapping-capabilities.md#map-with-ai)) |
| Reuse the same field-grouping logic in multiple outputs | Sub mapping |

## What's next

- [Access paths](./access-paths/access-paths.md) — Open the data mapper as a reusable artifact or inline from a flow node.
- [Mapping capabilities](./mapping-capabilities.md) — Connect fields, write expressions, and use AI-assisted mapping.
- [Array mappings](./array-mappings/array-mappings.md) — Map between arrays using iteration, joins, and aggregation.
