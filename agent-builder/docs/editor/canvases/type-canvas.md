---
title: Type Canvas
---

# Type Canvas

The Type Canvas, also known as the **type diagram**, is the canvas you open to see every type in your agentic integration or library on one screen. It renders each record, enum, and service class as its own card, with the fields, members, or resource methods of the type listed as rows, and draws lines between cards to show which types reference which. Use it to explore the data model, jump from a field to its referenced type, and edit, delete, or add types without leaving the canvas.

For background on what types are and how to define them field by field, see the [Type Panel](../panels/type-panel.md).

<ThemedImage
    alt="Type Canvas for a library with records and enums"
    sources={{
        light: useBaseUrl('/img/editor/canvases/type-canvas/02-overview-v1.0.png'),
        dark: useBaseUrl('/img/editor/canvases/type-canvas/02-overview-v1.0.png'),
    }}
/>

## Open the canvas

The project explorer groups every type in an agentic integration or library under **Types**, so the diagram is one click away from any type in the project.

<ThemedImage
    alt="Types listed under the project explorer"
    sources={{
        light: useBaseUrl('/img/editor/canvases/type-canvas/03-type-panel-v1.0.png'),
        dark: useBaseUrl('/img/editor/canvases/type-canvas/03-type-panel-v1.0.png'),
    }}
/>

Select the **View Type Diagram** icon next to **Types** in the project explorer to open the diagram with every type in that agentic integration or library.

To create a new type before opening the canvas, see the [Type Panel](../panels/type-panel.md).

## Header

The header runs along the top of the canvas and combines the breadcrumb, the canvas title, and the high-level actions.

| Control | Description |
|---|---|
| **Breadcrumb** | Shows the path from the project to the diagram (for example, `Common Utils > Types`). Select a segment to return to it. |
| **Back** | Returns to the previous view, typically the [Integration view](../views/integration-view.md) or [Library view](../views/library-view.md). |
| **Title** | Displays **Types** with the tagline `View and edit types in the project`. |
| **Undo** / **Redo** | Reverses or reapplies recent changes to the types in the diagram. |
| **Add Type** | Opens the new type form so you can add a record, enum, union, or other custom type. The new type appears as a card on the canvas as soon as you save it. |

## Type nodes

Every type appears as its own card on the canvas. The card shape depends on the kind of type:

- **Records** show the record name in the header and each field as a row, with the field name on the left and its type on the right (for example, `subject: string`, `customer: CustomerProfile`).
- **Enums** show the enum name in the header and each member on its own row (for example, `OPEN`, `IN_PROGRESS`, `RESOLVED`).
- **Service classes** show the class name in the header and each resource method as a row, with the method name on the left and its return type on the right. See [Service class](../panels/type-panel.md#service-class) for how to define one.

When a field, member, or method type points to another type defined in the same agentic integration or library, the canvas draws a line from that row to the referenced card. Hover a line to highlight the source field and the target type.

Select a type card to open the side panel for that type. The panel lists every field with its name and type, and lets you rename the type, add or remove fields, change a field's type, and configure advanced options. Any change you save in the side panel updates the card on the canvas and the underlying Ballerina source.

<ThemedImage
    alt="Edit type side panel for a record"
    sources={{
        light: useBaseUrl('/img/editor/canvases/type-canvas/04-edit-type-v1.0.png'),
        dark: useBaseUrl('/img/editor/canvases/type-canvas/04-edit-type-v1.0.png'),
    }}
/>

## Add a type

Select **Add Type** at the top right of the canvas to add a new type. The canvas opens the new type form where you choose the kind of type (record, enum, union, and so on), give it a name, and define its fields or members. The new type appears as a card on the canvas as soon as you save it, ready to be referenced from other types.

<ThemedImage
    alt="Add Type button on the Type Canvas"
    sources={{
        light: useBaseUrl('/img/editor/canvases/type-canvas/02-add-type-v1.0.png'),
        dark: useBaseUrl('/img/editor/canvases/type-canvas/02-add-type-v1.0.png'),
    }}
/>

To add a field that references an existing type, set the field type to the name of that type. The canvas draws the connecting line for you when you save. For the full set of options (records, enums, unions, arrays, service classes, and JSON or XML import), see the [Type Panel](../panels/type-panel.md).

## Type node menu

The three-dot menu (**⋮**) on a type card opens the actions for that type.

| Action | Description |
|---|---|
| **Edit** | Opens the side panel for the type so you can rename it, add or remove fields, and change field types. |
| **Source** | Opens the type definition in the source view, side by side with the diagram. |
| **Delete** | Removes the type. The canvas asks you to confirm first. |
| **Focused View** | Hides every other card on the canvas and centers the diagram on this type and the types it references. |

<ThemedImage
    alt="Three-dot menu on a type card"
    sources={{
        light: useBaseUrl('/img/editor/canvases/type-canvas/06-type-context-menu-v1.0.png'),
        dark: useBaseUrl('/img/editor/canvases/type-canvas/06-type-context-menu-v1.0.png'),
    }}
/>

## Focused view

**Focused View** narrows the canvas to a single type and the types it references, so you can study one part of the data model without the rest of the diagram in the way. Open it from the three-dot menu on a type card, or select a type name in the project explorer.

For example, opening **Focused View** on `SupportTicket` shows the `SupportTicket` record alongside the `TicketPriority` and `TicketStatus` enums and the `CustomerProfile` record it points to, with the lines between them. Unrelated types, such as `OrderSummary`, are hidden until you return to the full diagram.

<ThemedImage
    alt="Focused view for the SupportTicket type"
    sources={{
        light: useBaseUrl('/img/editor/canvases/type-canvas/05-focused-view-v1.0.png'),
        dark: useBaseUrl('/img/editor/canvases/type-canvas/05-focused-view-v1.0.png'),
    }}
/>

## Source view

**Source** opens the Ballerina source for `types.bal` next to the diagram, so you can edit the type definition as code while still seeing the cards and lines update on the canvas. Use this view when you want to copy a type definition, jump to a specific field, or make a change that is faster to type than to click through the side panel.

<ThemedImage
    alt="Type diagram and types.bal side by side"
    sources={{
        light: useBaseUrl('/img/editor/canvases/type-canvas/07-source-view-v1.0.png'),
        dark: useBaseUrl('/img/editor/canvases/type-canvas/07-source-view-v1.0.png'),
    }}
/>

## Delete a type

Select **Delete** from the three-dot menu on a type card. The canvas first checks where the type is used, then opens a confirmation prompt with **Cancel** and **Delete** actions. For an unused type, the prompt reads, for example, `Are you sure you want to delete OrderSummary?`. For a type that other code uses, it warns that the type has usages and that deleting it may cause errors. Select **Delete** to remove the type from the source and the diagram.

:::warning References are not cleaned up
Fields, parameters, and return types in other types or flows that pointed at the deleted type are left in the source and will produce compile errors. Review every type, data mapper, and service that referenced the deleted type, and update or remove those references before running the agentic integration.

<ThemedImage
    alt="Delete confirmation for a type"
    sources={{
        light: useBaseUrl('/img/editor/canvases/type-canvas/08-delete-confirmation-v1.0.png'),
        dark: useBaseUrl('/img/editor/canvases/type-canvas/08-delete-confirmation-v1.0.png'),
    }}
/>

## Canvas controls

Use the controls in the bottom-left corner of the canvas to adjust the view.

| Control | Description |
|---|---|
| **Download** | Exports the type diagram as a JPEG image. |
| **Refresh** | Reloads the diagram to pick up changes made to the underlying types or source. |
| **Fit to screen** | Adjusts the zoom level so every type card is visible at once. |
| **+** | Zooms in. |
| **−** | Zooms out. |

<ThemedImage
    alt="Canvas controls in the bottom-left corner"
    sources={{
        light: useBaseUrl('/img/editor/canvases/type-canvas/09-canvas-controls-v1.0.png'),
        dark: useBaseUrl('/img/editor/canvases/type-canvas/09-canvas-controls-v1.0.png'),
    }}
/>

To move around the canvas, scroll up and down to pan vertically and scroll left and right to pan horizontally. Use **Fit to screen** at any time to bring every type card back into view.

## What's next

- [Type Panel](../panels/type-panel.md): define the fields, members, and advanced options of a single type.
- [Service Designer](../designers/service-designer.md): see how services use the types defined in the diagram for request and response payloads.
- [Data Mapper](../designers/data-mapper.md): map fields between the types you defined in the diagram.
- [Flow Canvas](flow-canvas/flow-canvas.md): use the types from the diagram in the variables and parameters of a flow.
