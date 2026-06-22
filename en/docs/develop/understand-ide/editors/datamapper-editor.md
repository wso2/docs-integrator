---
sidebar_position: 7
title: Data Mapper Editor
description: Map fields between source and target types visually, without writing transformation code.
---

# Data Mapper Editor

The Data Mapper editor is the visual surface you open for any data mapper in WSO2 Integrator. It shows the source types on the left, the target type on the right, and the mapping area between them, so you can map fields by creating links or filling expressions instead of writing the conversion function manually. The data mapper is either a typed function with one or more inputs and a single output, or a variable declaration with a supported type. Every change you make in the editor is reflected in the underlying source.

For end-to-end usage, including how to create a data mapper, work with arrays and nested records, and apply transformations, see [Data Mapper](../../integration-artifacts/supporting/data-mapper/data-mapper.md).

![Data Mapper editor for the transform data mapper](/img/develop/understand-ide/editors/datamapper-editor/overview.png)

## Open the editor

Select a data mapper under **Data Mappers** in the project explorer, or select the **View** option of the data mapper node from a flow in the [Flow Diagram editor](flow-diagram-editor/flow-diagram-editor.md). To open the data mapper for a [declare variable](flow-diagram-editor/statement.md#declare-variable) node, select the **Open in Data Mapper** button in the side panel.

To create a new data mapper before opening the editor, see [Data Mapper](../../integration-artifacts/supporting/data-mapper/data-mapper.md).

## Header

The header runs along the top of the editor and combines the breadcrumb, the data mapper title, and the high-level actions.

| Control | Description |
|---|---|
| **Breadcrumb** | Shows the path from the parent artifact (for example, `Commons > transform`). Select a segment to return to it. |
| **Back** | Returns to the previous view. |
| **Title** | Displays the `fx` icon followed by the data mapper name (for example, `transform`). |
| **Undo** / **Redo** | Reverses or reapplies recent mapping changes. |
| **Clear all** | Deletes all mappings. |
| **Refresh** | Reloads the editor to pick up changes made to the underlying types. |
| **Filter input and output fields** | Filters fields whose names match the search term, useful for large records. |
| **Auto Map** | Runs the AI-based automatic mapping action described below. |
| **Configure** | Opens the [Configure editor](configure-editor.md) for the data mapper. Use it to rename the data mapper, toggle **Public**, or change its inputs and output. |
| **Close** | Closes the data mapper and returns to the previous view. |

## Expression bar

Below the header, the Expression bar shows the field you are currently working with and provides an editor with completion support to write inline expressions when an output field is selected. See [Expression bar](../../integration-artifacts/supporting/data-mapper/mapping-capabilities.md#expression-bar).

## Inputs side

The left side of the editor lists every input the data mapper receives. Each input appears as a collapsible node showing the parameter name and its type, with each field of the type rendered as a row inside the node.

{/* ![Inputs side with one input record expanded](/img/develop/understand-ide/editors/datamapper-editor/inputs-panel.png) */}

### Global Inputs

The **Global Inputs** section at the top of the inputs side exposes values that are reachable from anywhere in the integration, such as configurable variables. Use this section when a target field should be mapped from global values.

### Sub Mappings

A sub mapping is a named intermediate mapping computed once inside the data mapper and reused across multiple output fields. Select **+ Add Sub Mapping** at the bottom of the inputs side to create one. A sub mapping behaves like an additional input field. Use sub mappings to avoid repeating the same computation across many output fields, or to break a complex transformation into named steps. See [Sub Mappings](../../integration-artifacts/supporting/data-mapper/submappings.md).

{/* ![Sub mapping defined for a transform data mapper](/img/develop/understand-ide/editors/datamapper-editor/sub-mapping.png) */}

## Output side

The right side of the editor shows the data mapper's output type with each field rendered as a row. Every required field is marked with a red asterisk. Use the `⋮` menu on a field to access available field options.

{/* ![Output side showing the target record](/img/develop/understand-ide/editors/datamapper-editor/output-panel.png) */}

## Mapping area

The mapping area is the central region between the input and output sides. Links on this area represent mapping connections.

- Select an input field, then select the desired output field to create a mapping. See [Mapping capabilities](../../integration-artifacts/supporting/data-mapper/mapping-capabilities.md).
- Select an existing link to see available options for that mapping.
- When there is an issue with a created mapping, the corresponding link shows a diagnostic so you can fix it using the available code actions or the expression bar.

{/* ![Mapping area with field-to-field links](/img/develop/understand-ide/editors/datamapper-editor/mapping-canvas.png) */}

## Auto Map

**Auto Map** in the header opens the WSO2 Integrator Copilot panel alongside the canvas with the `/datamap` command preloaded. Submit the command to let the Copilot read the project files and generate field mappings based on the input and output types. When complete, mapping lines appear on the canvas.

For more, see [AI data mapping](/develop/integration-artifacts/supporting/data-mapper/ai-mapping).

{/* ![Auto Map suggestions on the mapping canvas](/img/develop/understand-ide/editors/datamapper-editor/auto-map.png) */}

## Configure

**Configure** in the header opens the data mapper's configuration in the [Configure editor](configure-editor.md). Use it to rename the data mapper, toggle **Public**, or change the **Inputs** and **Output** (the same fields you set when you created the data mapper). Any change you make there is reflected in the mapping editor when you return.

## What's next

- [Data Mapper](../../integration-artifacts/supporting/data-mapper/data-mapper.md): end-to-end guide to creating and using data mappers.
- [Type editor](type-editor.md): define the record types the data mapper maps between.
- [Flow Diagram editor](flow-diagram-editor/flow-diagram-editor.md): invoke the data mapper from a flow node.
