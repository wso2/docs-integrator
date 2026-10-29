---
title: Type Panel
---

# Type Panel

The Type Panel is the side panel you open whenever you create or change a custom type in WSO2 Agent Builder. It gives you one form to define records, enums, unions, arrays, and service classes, configure each member or field, and toggle advanced options such as additional fields and read-only types. Every change you save in the panel updates the type's Ballerina source and the type card on the [Type Canvas](../canvases/type-canvas.md).

For a canvas-level view of how all the types in your project relate to each other, see the [Type Canvas](../canvases/type-canvas.md).

## Open the panel

You can open the Type Panel from two places, depending on where you are working.

- **From the project explorer.** Select **+** next to **Types** to add a new type, or select an existing type name to edit it.

    <ThemedImage
        alt="The project explorer with Types expanded to show CustomerProfile, SupportTicket, TicketPriority, TicketStatus, and TicketUpdate, and the Add Type button next to Types outlined with its Add Type tooltip showing."
        sources={{
            light: useBaseUrl('/img/editor/panels/type-panel/01-add-type-project-explorer-v1.0.png'),
            dark: useBaseUrl('/img/editor/panels/type-panel/01-add-type-project-explorer-v1.0.png'),
        }}
    />

- **From the Type Canvas.** Select **+ Add Type** in the header to add a new type, or select **Edit** from the three-dot menu on a type card to edit an existing one.

    <ThemedImage
        alt="The Type Canvas showing the SupportTicket record linked to the TicketPriority and TicketStatus enums and the CustomerProfile record, and a separate TicketUpdate record, with the Add Type button at the top right outlined."
        sources={{
            light: useBaseUrl('/img/editor/panels/type-panel/02-add-type-diagram-v1.0.png'),
            dark: useBaseUrl('/img/editor/panels/type-panel/02-add-type-diagram-v1.0.png'),
        }}
    />

The panel opens the new-type form when you add a type, and reopens populated with the current definition when you edit one.

## Supported types

The Type Panel supports the following kinds of types. Pick the kind from the **Kind** field at the top of the form.

| Kind | Use it for |
|---|---|
| **Record** | A structured value with named fields and a type per field, similar to a struct or DTO. |
| **Enum** | A fixed set of named string members, useful for status codes and choices. |
| **Union** | A value that can be one of several types, including primitives and other custom types. |
| **Array** | A list of values of the same type, with an optional fixed size. |
| **Service Class** | A class that exposes resource methods, for a typed object that carries behavior alongside data. |

Every type form shares the same header fields:

| Field | Description |
|---|---|
| **Kind** | The kind of type to create (record, enum, union, array, or service class). |
| **Name** | A unique name to identify the type. Use PascalCase. |

### Record

A record defines a structured value with named fields. Each field has a name, a type, and an optional flag, and the panel renders one row per field under the **Fields** section.

<ThemedImage
    alt="The New Type panel on the Create from scratch tab, with Kind set to Record, Name set to OrderSummary, an orderId field of type string, a total field of type decimal, and Advanced Options expanded to show Allow Additional Fields, Is Readonly Type, and Accessible by Other Integrations."
    sources={{
        light: useBaseUrl('/img/editor/panels/type-panel/03-create-record-v1.0.png'),
        dark: useBaseUrl('/img/editor/panels/type-panel/03-create-record-v1.0.png'),
    }}
/>

Select **+** next to **Fields** to add a new field. Each field row exposes the following options.

<ThemedImage
    alt="The total field row of the OrderSummary record expanded to show Default Value, Description, and Readonly, with the Create Inline Record, Set as an Optional Field, and Delete Field icons outlined."
    sources={{
        light: useBaseUrl('/img/editor/panels/type-panel/08-field-options-in-record-v1.0.png'),
        dark: useBaseUrl('/img/editor/panels/type-panel/08-field-options-in-record-v1.0.png'),
    }}
/>

| Option | Description |
|---|---|
| **Inline record** | Define the field's type inline instead of pointing at a named type. Use this when the nested shape is only used by this field and you don't want to create a separate type for it. |
| **? (optional)** | Mark the field as optional. An optional field is allowed to be missing or `null` when a value of the record is constructed. |
| **Delete** | Removes the field from the record. |

Select the arrow at the start of a field row to set the field's **Default Value** and **Description**, or to make the field **Readonly**.

To make a field reference another type in the project, set the field type to the name of that type. The [Type Canvas](../canvases/type-canvas.md) draws the connecting line when you save.

### Enum

An enum defines a fixed set of named members. Use it for closed sets of values such as status codes, channels, or roles.

<ThemedImage
    alt="The New Type panel with Kind set to Enum, Name set to TicketChannel, and the members EMAIL, CHAT, and PHONE."
    sources={{
        light: useBaseUrl('/img/editor/panels/type-panel/04-create-enum-v1.0.png'),
        dark: useBaseUrl('/img/editor/panels/type-panel/04-create-enum-v1.0.png'),
    }}
/>

Select **+** next to **Members** to add a member, and the **delete** icon on a row to remove it. Each member has a single name (for example, `EMAIL`, `CHAT`, `PHONE`).

### Union

A union defines a value that can be one of several types. Use it when a field or variable can legitimately hold more than one shape, for example, a ticket lookup that returns either the ticket or an error.

<ThemedImage
    alt="The New Type panel with Kind set to Union, Name set to TicketLookupResult, and the members SupportTicket and error."
    sources={{
        light: useBaseUrl('/img/editor/panels/type-panel/05-create-union-v1.0.png'),
        dark: useBaseUrl('/img/editor/panels/type-panel/05-create-union-v1.0.png'),
    }}
/>

Select **+** next to **Members** to add a member type, and the **delete** icon to remove one. Each member can be a primitive (`string`, `int`, `boolean`, and so on) or another type you have already defined in the project.

### Array

An array defines a list of values of the same type, with an optional fixed size.

<ThemedImage
    alt="The New Type panel with Kind set to Array, Name set to TicketList, Type of the Array set to SupportTicket, and an empty Size of the Array field."
    sources={{
        light: useBaseUrl('/img/editor/panels/type-panel/06-create-array-v1.0.png'),
        dark: useBaseUrl('/img/editor/panels/type-panel/06-create-array-v1.0.png'),
    }}
/>

| Field | Description |
|---|---|
| **Type of the Array** | The type of each element in the array. Can be a primitive or a custom type defined in the project. |
| **Size of the Array** | Optional fixed size for the array. Leave empty for a dynamically sized array. |

### Service class

A service class defines a class with one or more resource methods. Use it when you need a typed object that exposes behavior alongside data.

<ThemedImage
    alt="The New Type panel with Kind set to Service Class, Name set to TaskQuery, and a tasks resource method that returns Task[], expanded to show Add Parameter."
    sources={{
        light: useBaseUrl('/img/editor/panels/type-panel/07-create-service-class-v1.0.png'),
        dark: useBaseUrl('/img/editor/panels/type-panel/07-create-service-class-v1.0.png'),
    }}
/>

For each resource method, configure:

| Field | Description |
|---|---|
| **Name** | The resource method name. |
| **Return Type** | The type the resource method returns. |
| **Parameters** | Parameters the resource method accepts. Select **Add Parameter** to add one, and the **delete** icon to remove. |

Select **+** next to **Resource Methods** to add a new method, and the **delete** icon on a row to remove one. Select the arrow at the start of a method row to add its parameters.

Once you save the service class, it appears as a card on the Type Canvas next to records and enums. Select the card to open the **Service Class Designer**, where you can edit the constructor, add class variables and methods, and implement each method.

<ThemedImage
    alt="The Service Class Designer for TaskQuery, showing the init constructor, an empty Class Variables section with a + Variable button, and the GET tasks method under Methods."
    sources={{
        light: useBaseUrl('/img/editor/panels/type-panel/09-service-class-designer-for-service-class-type-v1.0.png'),
        dark: useBaseUrl('/img/editor/panels/type-panel/09-service-class-designer-for-service-class-type-v1.0.png'),
    }}
/>

## Advanced options

The **Advanced Options** section at the bottom of the form exposes type-level toggles. The available options depend on the kind of type you are editing. Enums and service classes don't have this section.

| Option | Applies to | Description |
|---|---|---|
| **Allow Additional Fields** | Records | Generates an open record instead of a closed one. Open records accept extra fields at runtime; closed records reject them. Use this when the payload may carry keys you don't want to model explicitly. |
| **Is Readonly Type** | Records, unions, and arrays | Marks the type as read-only. Values of a read-only type cannot be modified after construction. |
| **Accessible by Other Integrations** | Records, unions, and arrays | Marks the type as public so other projects and libraries can import and reuse it. The generated Ballerina source uses the `public` qualifier. |

## Import a type from JSON or XML

When you already have a sample payload, you can let the Type Panel generate the matching record types for you instead of defining each field by hand. The panel inspects the sample, infers a record for the top-level object, and adds nested records for any embedded objects or arrays. The generated records are added to the project and appear on the [Type Canvas](../canvases/type-canvas.md) as soon as you select **Import**.

In the **New Type** panel, select the **Import** tab and set **Format** to **JSON** or **XML**. You then provide the sample in one of two ways:

- **Paste a sample.** Paste the JSON or XML into the sample area.
- **Import from a file.** Select **Import JSON File** or **Import XML File** to pick a file from disk. The panel reads the file and fills the sample area for you.

For JSON, give the root record a name in the **Name** field. For XML, there's no **Name** field; the records are named after the XML elements. Nested types are named automatically. Select **Import** to generate the types.

### Import from JSON

For a JSON sample such as:

```json
{
  "orderId": "ORD-1001",
  "customerId": "C-204",
  "status": "SHIPPED",
  "items": [
    {
      "sku": "MS-101",
      "name": "Wireless Mouse",
      "quantity": 1,
      "price": 25
    },
    {
      "sku": "KB-220",
      "name": "USB Keyboard",
      "quantity": 2,
      "price": 40
    }
  ]
}
```

With **Name** set to `Order`, the panel generates an `Order` record with `orderId`, `customerId`, `status`, and `items` fields, an `Items` array type for the `items` field, and an `ItemsItem` record for each item entry. Field types are inferred from the sample values, so `sku` and `name` become `string` fields, and `quantity` and `price` become `int` fields.

<ThemedImage
    alt="The Import tab of the New Type panel, with Format set to JSON, Name set to Order, and a JSON sample of an order with two items pasted in."
    sources={{
        light: useBaseUrl('/img/editor/panels/type-panel/10-import-json-v1.0.png'),
        dark: useBaseUrl('/img/editor/panels/type-panel/10-import-json-v1.0.png'),
    }}
/>

### Import from XML

For an XML sample such as:

```xml
<order>
  <orderId>ORD-1001</orderId>
  <status>SHIPPED</status>
  <item>
    <sku>MS-101</sku>
    <name>Wireless Mouse</name>
    <quantity>1</quantity>
  </item>
  <item>
    <sku>KB-220</sku>
    <name>USB Keyboard</name>
    <quantity>2</quantity>
  </item>
</order>
```

The panel generates a root record for the `<order>` element with `orderId`, `status`, and `item` fields, where `item` is of type `Item[]`, and an `Item` record with one field per child element. Field types are inferred from the sample values, so `quantity` becomes an `int` field. If the project already has a type with the same name, the panel adds a suffix such as `_01` to the new type.

The new types are added to the project and become available everywhere a custom type can be used.

:::tip Common next steps after import
- Use the generated record as a request or response payload in the [Service Designer](../designers/service-designer.md).
- Map fields from the imported record onto another type in the [Data Mapper](../designers/data-mapper.md).

## What's next

- [Type Canvas](../canvases/type-canvas.md): visualize every type in the project and the relationships between them.
- [Service Designer](../designers/service-designer.md): use the types you defined as request and response payloads for a service.
- [Data Mapper](../designers/data-mapper.md): map fields between the types you defined here.
- [Flow Canvas](../canvases/flow-canvas/flow-canvas.md): use the types as variables and parameters in a flow.
