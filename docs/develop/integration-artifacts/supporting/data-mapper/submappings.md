---
title: Submappings
---

# Submappings

When the same logic is needed in multiple output locations, define a submapping. A submapping consolidates the related inputs and logic into a single named expression that can be reused across the data mapper.

## Create a submapping

1. In the data mapper canvas, select **+ Add Sub Mapping**.
2. Configure the submapping name, type, and the inputs to use.
3. Map the fields inside the submapping view as you would in any data mapper.

![Add Sub Mapping action with the ProductMapper canvas open](/img/develop/integration-artifacts/supporting/data-mapper/submapping-creation.gif)

## Use a submapping

Once defined, the submapping appears under **Sub Mappings** in the left panel. Map it to any compatible output field as you would any other input.

![Sub Mappings section in the left panel with vendorMapping mapped to output fields](/img/develop/integration-artifacts/supporting/data-mapper/submapping-usage.gif)

## What's next

- [Mapping capabilities](./mapping-capabilities.md) — Connect fields, write expressions, and use AI-assisted mapping.
- [Array mappings](./array-mappings/array-mappings.md) — Map between arrays using iteration, joins, and aggregation.
- [Generic type mappings](./generic-type-mappings.md) — Generate types from a sample JSON or XML payload.
