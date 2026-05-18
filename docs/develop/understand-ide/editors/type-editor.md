---
title: Type Editor
---

# Type Editor

The Type editor is the side panel you open whenever you create or change a custom type in WSO2 Integrator. It gives you one form to define records, enums, unions, arrays, and service classes, configure each member or field, and toggle advanced options such as additional fields and read-only types. Every change you save in the editor updates the type's Ballerina source and the type card on the [Type Diagram editor](type-diagram-editor.md).

For an introduction to types and how an integration uses them, see [Core concepts](../../../get-started/concepts/core.md#types). For a canvas-level view of how all the types in your integration relate to each other, see the [Type Diagram editor](type-diagram-editor.md).

## Open the editor

You can open the Type editor from two places, depending on where you are working.

- **From the project explorer.** Select **+** next to **Types** to add a new type, or select an existing type name to edit it.

    ![Add a type from the project explorer](/img/develop/understand-ide/editors/type-editor/01-add-type-integration-view.png)

- **From the Type Diagram editor.** Select **+ Add Type** in the header to add a new type, or select **Edit** from the three-dot menu on a type card to edit an existing one.

    ![Add a type from the Type Diagram editor](/img/develop/understand-ide/editors/type-editor/02-add-type-diagram.png)

The editor opens the new-type form when you add a type, and reopens populated with the current definition when you edit one.

## Supported types

The Type editor supports the following kinds of types. Pick the kind from the **Kind** field at the top of the form.

| Kind | Use it for |
|---|---|
| **Record** | A structured value with named fields and a type per field, similar to a struct or DTO. |
| **Enum** | A fixed set of named string members, useful for status codes and choices. |
| **Union** | A value that can be one of several types, including primitives and other custom types. |
| **Array** | A list of values of the same type, with an optional fixed size. |
| **Service Class** | A class that exposes resource methods, used as a return type for GraphQL resolvers and similar service patterns. |

Every type form shares the same header fields:

| Field | Description |
|---|---|
| **Kind** | The kind of type to create (record, enum, union, array, or service class). |
| **Name** | A unique name to identify the type. Use PascalCase. |

### Record

A record defines a structured value with named fields. Each field has a name, a type, and an optional flag, and the editor renders one row per field under the **Fields** section.

![Create a record type](/img/develop/understand-ide/editors/type-editor/03-create-record.png)

Select **+** next to **Fields** to add a new field. Each field row exposes the following options.

![Field options on a record](/img/develop/understand-ide/editors/type-editor/08-field-options-in-record.png)

| Option | Description |
|---|---|
| **Inline record** | Define the field's type inline instead of pointing at a named type. Use this when the nested shape is only used by this field and you don't want to create a separate type for it. |
| **? (optional)** | Mark the field as optional. An optional field is allowed to be missing or `null` when a value of the record is constructed. |
| **Delete** | Removes the field from the record. |

To make a field reference another type in the integration, set the field type to the name of that type. The [Type Diagram editor](type-diagram-editor.md) draws the connecting line when you save.

### Enum

An enum defines a fixed set of named members. Use it for closed sets of values such as status codes, channels, or roles.

![Create an enum type](/img/develop/understand-ide/editors/type-editor/04-create-enum.png)

Select **+** under **Members** to add a member, and the **delete** icon on a row to remove it. Each member has a single name (for example, `DRAFT`, `SUBMITTED`, `APPROVED`, `REJECTED`).

### Union

A union defines a value that can be one of several types. Use it when a field or variable can legitimately hold more than one shape, for example, a response that is either a success record or an error.

![Create a union type](/img/develop/understand-ide/editors/type-editor/05-create-union.png)

Select **+** under **Members** to add a member type, and the **delete** icon to remove one. Each member can be a primitive (`string`, `int`, `boolean`, and so on) or another type you have already defined in the integration.

### Array

An array defines a list of values of the same type, with an optional fixed size.

![Create an array type](/img/develop/understand-ide/editors/type-editor/06-create-array.png)

| Field | Description |
|---|---|
| **Type** | The type of each element in the array. Can be a primitive or a custom type defined in the integration. |
| **Size** | Optional fixed size for the array. Leave empty for a dynamically sized array. |

### Service class

A service class defines a class with one or more resource methods. Use it as the return type of a [GraphQL service](../../integration-artifacts/service/graphql.md) resolver, or anywhere you need a typed object that exposes behavior alongside data.

![Create a service class type](/img/develop/understand-ide/editors/type-editor/07-create-service-class.png)

For each resource method, configure:

| Field | Description |
|---|---|
| **Name** | The resource method name. |
| **Return Type** | The type the resource method returns. |
| **Parameters** | Parameters the resource method accepts. Select **Add Parameter** to add one, and the **delete** icon to remove. |

Select **+** under **Resource Methods** to add a new method, and the **delete** icon on a row to remove one.

Once you save the service class, it appears as a card on the Type Diagram editor next to records and enums. Select the card to open the **Service Class Designer**, where you can edit resource methods, parameters, and the implementation of each method.

![Service Class Designer for the service class](/img/develop/understand-ide/editors/type-editor/09-service-class-designer-for-service-class-type.png)

## Advanced options

The **Advanced Options** section at the bottom of the form exposes type-level toggles. The available options depend on the kind of type you are editing.

| Option | Applies to | Description |
|---|---|---|
| **Allow Additional Fields** | Records | Generates an open record instead of a closed one. Open records accept extra fields at runtime; closed records reject them. Use this when the payload may carry keys you don't want to model explicitly. |
| **Is Readonly Type** | All kinds | Marks the type as read-only. Values of a read-only type cannot be modified after construction. |
| **Accessible by other integrations** | All kinds | Marks the type as public so other integrations and libraries can import and reuse it. The generated Ballerina source uses the `public` qualifier. |

## Import a type from JSON or XML

When you already have a sample payload, you can let the Type editor generate the matching record types for you instead of defining each field by hand. The editor inspects the sample, infers a record for the top-level object, and adds nested records for any embedded objects or arrays. The generated records are added to the integration and appear on the [Type Diagram editor](type-diagram-editor.md) as soon as you save.

In the new-type form, open the kind picker and select **Import from Json** or **Import from Xml**. You then provide the sample in one of two ways:

- **Paste a sample.** Paste the JSON or XML into the editor and the form previews the inferred records as you type.
- **Import from a file.** Select **Import from file** to pick a `.json` or `.xml` file from disk. The editor reads the file and fills the sample area for you.

Give the root record a name in the **Name** field. Nested objects are named automatically based on the parent field, and you can rename any of them before saving.

### Import from JSON

For a JSON sample such as:

```json
{
  "books": [
    {
      "title": "Clean Code",
      "author": "Robert C. Martin",
      "year": 2008,
      "isbn": "9780132350884"
    },
    {
      "title": "The Pragmatic Programmer",
      "author": "Andrew Hunt",
      "year": 1999,
      "isbn": "9780201616224"
    }
  ]
}
```

The editor generates a root record with a `books` array field and a nested record for each book entry, with `title`, `author`, `year`, and `isbn` typed as `string` or `int` based on the sample values.

![Import a type from a JSON sample](/img/develop/understand-ide/editors/type-editor/10-import-json.png)

### Import from XML

For an XML sample such as:

```xml
<library>
  <book>
    <title>Clean Code</title>
    <author>Robert C. Martin</author>
    <year>2008</year>
    <isbn>9780132350884</isbn>
  </book>
  <book>
    <title>The Pragmatic Programmer</title>
    <author>Andrew Hunt</author>
    <year>1999</year>
    <isbn>9780201616224</isbn>
  </book>
</library>
```

The editor generates a `Library` record with a `book` array field and a nested record for each book element, with one field per child element.

Once the records look right, save the form. The new types are added to the integration and become available everywhere a custom type can be used.

:::tip Common next steps after import
- Use the generated record as a request or response payload in a [service](../../integration-artifacts/service/http.md).
- Map fields from the imported record onto another type in the [Data Mapper editor](datamapper-editor.md).
- Expose the record from a [GraphQL service](../../integration-artifacts/service/graphql.md) resolver.

## What's next

- [Type Diagram editor](type-diagram-editor.md): visualize every type in the integration and the relationships between them.
- [Service Design editor](service-design-editor.md): use the types you defined as request and response payloads for a service.
- [GraphQL editor](graphql-editor.md): expose service classes and records as GraphQL types.
- [Data Mapper editor](datamapper-editor.md): map fields between the types you defined here.
- [Flow Diagram editor](flow-diagram-editor/flow-diagram-editor.md): use the types as variables and parameters in a flow.
