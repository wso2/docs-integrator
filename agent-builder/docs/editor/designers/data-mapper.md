---
title: Data Mapper
---

# Data Mapper

The Data Mapper is the visual surface you open for any data transformation in WSO2 Agent Builder. It shows the source types on the left, the target type on the right, and the mapping area between them, so you can map fields by creating links or filling expressions instead of writing the conversion function manually. A data mapper is a typed function with one or more inputs and a single output. Every change you make here is reflected in the underlying source.

<ThemedImage
    alt="Data Mapper for the transform function, with Global Inputs and the 'order Order input on the left, the OrderSummary output on the right, and links mapping orderId, customer name and email, items, and status."
    sources={{
        light: useBaseUrl('/img/editor/designers/data-mapper-v1.0/01-data-mapper-overview-v1.0.png'),
        dark: useBaseUrl('/img/editor/designers/data-mapper-v1.0/01-data-mapper-overview-v1.0.png'),
    }}
/>

## Create a data mapper

In WSO2 Agent Builder, you create a data mapper from a flow, for example the flow of a resource behind an agent's HTTP trigger.

1. In the [Flow Canvas](../canvases/flow-canvas/flow-canvas.md), select **+** where you want the mapping, then select **Map Data** under **Statement**.

<ThemedImage
    alt="Node panel open next to a resource flow, with Map Data under Statement alongside Declare Variable, Update Variable, and Call Function."
    sources={{
        light: useBaseUrl('/img/editor/designers/data-mapper-v1.0/02-map-data-node-v1.0.png'),
        dark: useBaseUrl('/img/editor/designers/data-mapper-v1.0/02-map-data-node-v1.0.png'),
    }}
/>

2. The **Data Mappers** panel lists the data mappers already in the integration. Select one to reuse it, or select **+ Create Data Mapper** to create a new one.

<ThemedImage
    alt="Data Mappers panel with a Within Project section, a Create Data Mapper button, and the existing transform data mapper."
    sources={{
        light: useBaseUrl('/img/editor/designers/data-mapper-v1.0/03-data-mappers-picker-v1.0.png'),
        dark: useBaseUrl('/img/editor/designers/data-mapper-v1.0/03-data-mappers-picker-v1.0.png'),
    }}
/>

3. In the **Data Mapper Creation** panel, set:
   - **Data Mapper Name**, for example `toOrderSummary`.
   - **Inputs**: select **+ Add Argument** and pass the value to map, for example `'order`. Its type is detected from the value.
   - **Output**: the type the data mapper returns, for example `OrderSummary`.
   - **Result**: the variable that holds the mapped value, for example `summary`.

<ThemedImage
    alt="Data Mapper Creation panel with Data Mapper Name toOrderSummary, an Order input bound to 'order, Output OrderSummary, Result summary, and the Open in Data Mapper and Save buttons."
    sources={{
        light: useBaseUrl('/img/editor/designers/data-mapper-v1.0/04-data-mapper-creation-v1.0.png'),
        dark: useBaseUrl('/img/editor/designers/data-mapper-v1.0/04-data-mapper-creation-v1.0.png'),
    }}
/>

4. Select **Open in Data Mapper** to create the data mapper and start mapping right away, or **Save** to add the node to the flow and map later.

The new data mapper opens with the inputs on the left and the output fields on the right, ready to map. Once a data mapper exists, the project explorer shows a **Data Mappers** section that lists every data mapper in the integration.

<ThemedImage
    alt="New toOrderSummary data mapper with the 'order input and the OrderSummary output fields set to default values, and the Data Mappers section in the project explorer listing toOrderSummary and transform."
    sources={{
        light: useBaseUrl('/img/editor/designers/data-mapper-v1.0/05-new-data-mapper-v1.0.png'),
        dark: useBaseUrl('/img/editor/designers/data-mapper-v1.0/05-new-data-mapper-v1.0.png'),
    }}
/>

## Open the data mapper

- Select a data mapper under **Data Mappers** in the project explorer.
- In a flow, select the view icon on a **Map Data** node, or select **⋮ → View** on the node.

<ThemedImage
    alt="Resource flow with Declare Variable, two Map Data nodes producing summary and orderSummary, and a Return node."
    sources={{
        light: useBaseUrl('/img/editor/designers/data-mapper-v1.0/06-map-data-in-flow-v1.0.png'),
        dark: useBaseUrl('/img/editor/designers/data-mapper-v1.0/06-map-data-in-flow-v1.0.png'),
    }}
/>

## Header

The header runs along the top of the data mapper and combines the breadcrumb, the data mapper title, and the high-level actions.

| Control | Description |
|---|---|
| **Breadcrumb** | Shows the path from the parent artifact (for example, `OrderService > HTTP Service - /orders > [get] status > transform`). Select a segment to return to it. |
| **Back** | Returns to the previous view. |
| **Title** | Displays the `fx` icon followed by the data mapper name (for example, `transform`). |
| **Undo** / **Redo** | Reverses or reapplies recent mapping changes. |
| **Clear all** | Deletes all mappings. |
| **Refresh** | Reloads the data mapper to pick up changes made to the underlying types. |
| **Filter input and output fields** | Filters fields whose names match the search term, useful for large records. |
| **Auto Map** | Runs the AI-based automatic mapping action described below. |
| **Configure** | Opens the data mapper's configuration. Use it to rename the data mapper, toggle **Public**, or change its inputs and output. |
| **Close** | Closes the data mapper and returns to the previous view. |

The header controls are highlighted below.

<ThemedImage
    alt="Data Mapper header with the undo and redo, clear all, refresh, filter input and output fields, Auto Map, Configure, and close controls highlighted."
    sources={{
        light: useBaseUrl('/img/editor/designers/data-mapper-v1.0/07-header-v1.0.png'),
        dark: useBaseUrl('/img/editor/designers/data-mapper-v1.0/07-header-v1.0.png'),
    }}
/>

## Expression bar

Below the header, the Expression bar shows the field you are currently working with and provides an editor with completion support to write inline expressions when an output field is selected.

<ThemedImage
    alt="Expression bar showing the fullName expression for the selected customerName output field, with the customerName field highlighted on the output side."
    sources={{
        light: useBaseUrl('/img/editor/designers/data-mapper-v1.0/08-expression-bar-v1.0.png'),
        dark: useBaseUrl('/img/editor/designers/data-mapper-v1.0/08-expression-bar-v1.0.png'),
    }}
/>

## Inputs side

The left side of the data mapper lists every input it receives. Each input appears as a collapsible node showing the parameter name and its type, with each field of the type rendered as a row inside the node. Nested records (for example, `customer`) and arrays (for example, `items`) can be expanded.

<ThemedImage
    alt="Inputs side with the 'order Order input expanded, showing orderId, the customer record with id, firstName, lastName, and email, items, and status."
    sources={{
        light: useBaseUrl('/img/editor/designers/data-mapper-v1.0/09-inputs-side-v1.0.png'),
        dark: useBaseUrl('/img/editor/designers/data-mapper-v1.0/09-inputs-side-v1.0.png'),
    }}
/>

### Global Inputs

When the integration has values that are reachable from anywhere, such as configurable variables, a **Global Inputs** section appears at the top of the inputs side. Use it when a target field should be mapped from a global value. In this example, the `defaultStatus` configurable is listed under **Global Inputs**.

<ThemedImage
    alt="Global Inputs section expanded at the top of the inputs side, showing the defaultStatus configurable of type string."
    sources={{
        light: useBaseUrl('/img/editor/designers/data-mapper-v1.0/10-global-inputs-v1.0.png'),
        dark: useBaseUrl('/img/editor/designers/data-mapper-v1.0/10-global-inputs-v1.0.png'),
    }}
/>

### Sub Mappings

A sub mapping is a named intermediate mapping computed once inside the data mapper and reused across multiple output fields. Select **+ Add Sub Mapping** at the bottom of the inputs side, then enter a **Name** (for example, `fullName`) and **Type** (for example, `string`) in the **Add New Sub Mapping** panel, and select **Add**. A sub mapping behaves like an additional input field. Use sub mappings to avoid repeating the same computation across many output fields, or to break a complex transformation into named steps.

<ThemedImage
    alt="Add Sub Mapping button highlighted at the bottom of the inputs side, and the Add New Sub Mapping panel with Name fullName and Type string."
    sources={{
        light: useBaseUrl('/img/editor/designers/data-mapper-v1.0/11-add-sub-mapping-v1.0.png'),
        dark: useBaseUrl('/img/editor/designers/data-mapper-v1.0/11-add-sub-mapping-v1.0.png'),
    }}
/>

The sub mapping appears in a **Sub Mappings** section on the inputs side, and you can map it like any other input. Here, `fullName` joins the customer's first and last names and is mapped to `customerName`. Select **+ Add Another Sub Mapping** to add more.

<ThemedImage
    alt="Sub Mappings section on the inputs side with the fullName string sub mapping mapped to the customerName output field, and the Add Another Sub Mapping option."
    sources={{
        light: useBaseUrl('/img/editor/designers/data-mapper-v1.0/12-sub-mapping-v1.0.png'),
        dark: useBaseUrl('/img/editor/designers/data-mapper-v1.0/12-sub-mapping-v1.0.png'),
    }}
/>

## Output side

The right side of the data mapper shows the output type with each field rendered as a row. Every required field is marked with a red asterisk. Use the `⋮` menu on a field to access its options, such as **Edit Value** and **Delete Value**.

<ThemedImage
    alt="Output side with the transform OrderSummary fields highlighted, and the field menu on customerName open showing Edit Value and Delete Value."
    sources={{
        light: useBaseUrl('/img/editor/designers/data-mapper-v1.0/13-output-side-v1.0.png'),
        dark: useBaseUrl('/img/editor/designers/data-mapper-v1.0/13-output-side-v1.0.png'),
    }}
/>

## Mapping area

The mapping area is the central region between the input and output sides. Links on this area represent mapping connections.

- Select an input field, then select the desired output field to create a mapping.
- Select an existing link to see available options for that mapping.
- When a mapping combines several inputs, the links meet at an expression node, with options to view and edit the expression or delete the mapping.
- When there is an issue with a created mapping, the corresponding link shows a diagnostic so you can fix it using the available code actions or the expression bar.

<ThemedImage
    alt="Mapping area highlighted between the inputs and output sides, with links from the input fields to the OrderSummary output fields."
    sources={{
        light: useBaseUrl('/img/editor/designers/data-mapper-v1.0/14-mapping-area-v1.0.png'),
        dark: useBaseUrl('/img/editor/designers/data-mapper-v1.0/14-mapping-area-v1.0.png'),
    }}
/>

## Auto Map

**Auto Map** in the header opens the WSO2 Agent Builder Copilot panel alongside the data mapper, with a `/data-map` request for the current data mapper prefilled (for example, `/data-map generate mappings for the @transform function`). Submit it to let the Copilot read the project files and generate field mappings based on the input and output types. When complete, mapping lines appear in the data mapper.

<ThemedImage
    alt="Auto Map button highlighted in the data mapper header, and the WSO2 Agent Builder Copilot panel with /data-map generate mappings for the @transform function highlighted in the input box."
    sources={{
        light: useBaseUrl('/img/editor/designers/data-mapper-v1.0/15-auto-map-v1.0.png'),
        dark: useBaseUrl('/img/editor/designers/data-mapper-v1.0/15-auto-map-v1.0.png'),
    }}
/>

## Configure

**Configure** in the header opens the **Edit Data Mapper** page. Use it to rename the data mapper, toggle **Public** to make it visible across the project, or change the **Inputs** and **Output**. Select **Save** to apply your changes.

<ThemedImage
    alt="Edit Data Mapper page with Name transform, the Public checkbox, an Order input named 'order, an Add Input option, Output OrderSummary, and a Save button."
    sources={{
        light: useBaseUrl('/img/editor/designers/data-mapper-v1.0/16-configure-data-mapper-v1.0.png'),
        dark: useBaseUrl('/img/editor/designers/data-mapper-v1.0/16-configure-data-mapper-v1.0.png'),
    }}
/>

## What's next

- [Node palette: Map Data](../canvases/flow-canvas/node-palette.md#map-data): add a data mapper to a flow.
- [Type Panel](../panels/type-panel.md): define the record types the data mapper maps between.
- [Flow Canvas](../canvases/flow-canvas/flow-canvas.md): invoke the data mapper from a flow node.
