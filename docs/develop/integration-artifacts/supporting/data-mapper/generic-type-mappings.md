---
title: Generic Type Mappings
---

# Generic Type Mappings

When the input or output is a generic JSON or XML payload, paste a sample structure into the canvas. The data mapper generates compatible record types from the sample, and you map the fields visually.

Generic type mapping is only available in the reusable data mapper. Inline data mappers do not support pasting a sample to generate types.

## Generate types from a sample

1. Create a data mapper with the relevant generic types as input and output.
2. In the data mapper view, paste a representative JSON or XML sample onto the input or output side that uses the generic type.
3. The data mapper builds compatible record types from the sample and exposes the fields on the canvas.
4. Map the input fields to the output fields as you would for any record type.

![Data mapper generating record types from a pasted JSON sample and producing XML output](/img/develop/integration-artifacts/supporting/data-mapper/json-to-xml-mapping.gif)

## What's next

- [Submappings](./submappings.md) — Reuse mapping logic across multiple output fields.
- [Mapping capabilities](./mapping-capabilities.md) — Connect fields, write expressions, and use AI-assisted mapping.
- [Array mappings](./array-mappings/array-mappings.md) — Map between arrays using iteration, joins, and aggregation.
