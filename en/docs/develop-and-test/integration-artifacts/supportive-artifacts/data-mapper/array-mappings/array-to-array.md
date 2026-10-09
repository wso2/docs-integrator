---
title: Array to Array
description: Map between arrays using map each element (with nested iteration and joins), assign as is, and map using a custom function.
slug: /develop-and-test/integration-artifacts/supportive-artifacts/data-mapper/array-mappings/array-to-array
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Array to Array

When both the input and the output are arrays, the data mapper offers three mapping styles. Pick the one that matches the relationship between the source and target arrays.

| Mapping style | Use it when |
|---|---|
| [Map each element](#map-each-element) | Each output element is built from an input element. |
| [Assign as is](#assign-as-is) | The input and output arrays have the same type, so the whole array can be copied. |
| [Map using custom function](#map-using-custom-function) | The transformation needs logic that is easier to write as code. |

## Map each element

To transform each item in an input array into an item in an output array, use **Map Each Element**. The data mapper opens a focused view scoped to the array element types, where you map the fields of one element and the same mapping applies to every element in the array.

**Example:** Turn a list of employees into a list of contacts.

```json title="Input: employees"
[
  { "firstName": "Anna", "lastName": "Silva", "email": "anna@example.com" },
  { "firstName": "Ben", "lastName": "Perera", "email": "ben@example.com" }
]
```

```json title="Output: contacts"
[
  { "fullName": "Anna Silva", "email": "anna@example.com" },
  { "fullName": "Ben Perera", "email": "ben@example.com" }
]
```

<ThemedImage
    alt="Map Each Element opening a focused view for an Engineer array mapping"
    sources={{
        light: useBaseUrl('/img/develop/integration-artifacts/supporting/data-mapper/map-each-element.gif'),
        dark: useBaseUrl('/img/develop/integration-artifacts/supporting/data-mapper/map-each-element.gif'),
    }}
/>

Within the focused view, refine the query using the available clauses:

| Clause Type | Purpose |
|---|---|
| **Condition** | Filter elements by a condition |
| **Local variable** | Define local variables for use in the projection |
| **Sort by** | Sort the result |
| **Limit** | Cap the number of output elements |
| **From** | Add another iteration source |
| **Join** | Combine elements from a second array |
| **Group by** | Group elements before projection |

When an output element needs data from a second array, map that array inside the focused view. The data mapper then offers two ways to bring it in: [Nested iterate](#nested-iterate) and [Join with condition](#join-with-condition).

### Nested iterate

Use **Nested Iterate** when every element of the outer array must be combined with **every** element of a second array. A common case is flattening: each input element holds its own list, and you want one output element per item in that list.

**Example:** Each order contains several items. Produce one order line per item.

```json title="Input: orders"
[
  { "orderId": "A1", "items": [ { "sku": "PEN" }, { "sku": "INK" } ] },
  { "orderId": "B2", "items": [ { "sku": "PAD" } ] }
]
```

```json title="Output: orderLines"
[
  { "orderId": "A1", "sku": "PEN" },
  { "orderId": "A1", "sku": "INK" },
  { "orderId": "B2", "sku": "PAD" }
]
```

To set it up, map `orders` to `orderLines` using **Map Each Element**. In the focused view, map `items` to the output element and select **Nested Iterate**. The data mapper adds a **From** clause that iterates `items` for each order, so both the order fields and the item fields are available for mapping.

<ThemedImage
    alt="Nested Iterate prompt when mapping a second array inside the focused view"
    sources={{
        light: useBaseUrl('/img/develop/integration-artifacts/supporting/data-mapper/nested-iterate.gif'),
        dark: useBaseUrl('/img/develop/integration-artifacts/supporting/data-mapper/nested-iterate.gif'),
    }}
/>

### Join with condition

Use **Join with Condition** when two arrays are related by a matching value, such as an ID, and each output element should combine an element from the first array with its **matching** element from the second. Elements without a match are left out.

**Example:** Show each employee with their department name, matched on the department ID.

```json title="Input: employees"
[
  { "name": "Anna", "deptId": 10 },
  { "name": "Ben", "deptId": 20 }
]
```

```json title="Input: departments"
[
  { "id": 10, "name": "Finance" },
  { "id": 20, "name": "Sales" }
]
```

```json title="Output: staff"
[
  { "name": "Anna", "department": "Finance" },
  { "name": "Ben", "department": "Sales" }
]
```

To set it up, map `employees` to `staff` using **Map Each Element**. In the focused view, map `departments` to the output element and select **Join with Condition**. In the side panel, define the condition that matches the two arrays (here, `deptId` equals `id`).

<ThemedImage
    alt="Join with Condition prompt and side panel for defining the join expression"
    sources={{
        light: useBaseUrl('/img/develop/integration-artifacts/supporting/data-mapper/join-with-condition.gif'),
        dark: useBaseUrl('/img/develop/integration-artifacts/supporting/data-mapper/join-with-condition.gif'),
    }}
/>

:::tip Nested iterate or join?
Nested iterate pairs **every** outer element with **every** inner element. Join pairs only the elements that **match** the condition. If you find yourself adding a filter condition after a nested iterate to match IDs, use a join instead.
:::

## Assign as is

When the input and output array types are identical, use **Assign as is** to assign the array directly without iteration.

**Example:** Copy a list of tags into a list of labels.

```json title="Input: tags"
["urgent", "billing", "urgent"]
```

```json title="Output: labels"
["urgent", "billing", "urgent"]
```

<ThemedImage
    alt="Assign as is option mapping a Person array directly to an EngineerMapping array"
    sources={{
        light: useBaseUrl('/img/develop/integration-artifacts/supporting/data-mapper/assign-as-is.gif'),
        dark: useBaseUrl('/img/develop/integration-artifacts/supporting/data-mapper/assign-as-is.gif'),
    }}
/>

## Map using custom function

When the transformation works on the array as a whole rather than one element at a time, or the logic is easier to express in code, use **Map Using Custom Function**. The data mapper generates a function that takes the input array and returns the output array, and links it between the two fields. Navigate into the function to define the logic in the visual designer or pro-code view.

**Example:** Produce a list of unique tags, with duplicates removed.

```json title="Input: tags"
["urgent", "billing", "urgent", "refund"]
```

```json title="Output: uniqueTags"
["urgent", "billing", "refund"]
```

:::note
This option is available when the target array is a field inside the output, when you are inside a focused view, or when you are working in a reusable data mapper.
:::

<ThemedImage
    alt="Map using Custom Function generating a function between an input array and an output array"
    sources={{
        light: useBaseUrl('/img/develop/integration-artifacts/supporting/data-mapper/map-with-custom-function-array.gif'),
        dark: useBaseUrl('/img/develop/integration-artifacts/supporting/data-mapper/map-with-custom-function-array.gif'),
    }}
/>

## What's next

- [Array to single value](array-to-single-value.md) — Reduce an array to a single value.
- [Generic type mappings](../generic-type-mappings.md) — Generate types from a sample JSON or XML payload.
- [Sub Mappings](../submappings.md) — Reuse mapping logic across multiple output fields.
