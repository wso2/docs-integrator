---
title: Mapping Capabilities
---

# Mapping Capabilities

The data mapper supports a set of mapping capabilities for the most common transformation patterns. Use the canvas to create connections between fields, and use other mapping options when types do not match directly or when custom logic is required.

## One-to-one mapping

Map a single input field directly to a compatible output field by selecting the input field and then the output field.

![One-to-one mapping between basicDetails.name and lecturer.basicDetails.name](/img/develop/integration-artifacts/supporting/data-mapper/one-to-one-mapping.png)

## Many-to-one mapping

Combine multiple input fields into a single output field. Connect each input to the same output port to build a composite expression.

![Multiple input fields connected to a single output field](/img/develop/integration-artifacts/supporting/data-mapper/many-to-one-mapping.png)

## Expression bar

For outputs that need custom logic, select the output field to focus the expression bar. The editor provides completion support. Start typing a field reference or function name, and use the suggestions to compose the expression. While interacting with the editor, select input fields to insert them at the current cursor position.

The `</>` button navigates to the selected output field's position in the source file.

![Expression bar focused on an output field with completion suggestions](/img/develop/integration-artifacts/supporting/data-mapper/expression-editor.gif)

## Convert and map

When the source and target are incompatible primitive types, use **Convert and Map**. The data mapper inserts the appropriate Ballerina conversion utility (for example, `int:fromString`, `decimal:toString`) automatically.

![Convert and Map option transforming a string input into an integer output](/img/develop/integration-artifacts/supporting/data-mapper/convert-and-map.gif)

## Map using custom function

When direct mapping is not possible, choose **Map using Custom Function**. The data mapper generates a function stub linking the two fields. Navigate into the function flow to define the transformation logic in the visual designer or pro-code view.

![Map using Custom Function generating a function stub between input and output fields](/img/develop/integration-artifacts/supporting/data-mapper/map-with-custom-function.gif)

## Map using transformation function

When you need a focused, visual mapping rather than a free-form function, use **Map using Transformation Function**. The data mapper opens a nested data mapper view scoped to the selected input and output, where you can map fields visually.

![Map using Transformation Function opening a nested data mapper view for the selected fields](/img/develop/integration-artifacts/supporting/data-mapper/map-with-transformation-function.gif)

## Map with AI

Select **Auto Map** in the top-right corner of the data mapper canvas. The WSO2 Integrator Copilot panel opens with the `/datamap` command preloaded. Submit it to generate mappings between your types automatically.

For a full walkthrough with examples, see [AI data mapping](./ai-mapping.md).

## What's next

- [Array mappings](./array-mappings/array-mappings.md) — Map between arrays using iteration, joins, and aggregation.
- [Generic type mappings](./generic-type-mappings.md) — Generate types from a sample JSON or XML payload.
- [Sub Mappings](./submappings.md) — Reuse mapping logic across multiple output fields.
- [AI data mapping](./ai-mapping.md) — Generate mapping logic using AI.
