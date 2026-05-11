---
title: Statement
---

# Statement

The **Statement** section of the node panel covers the workhorse operations of an integration flow: declaring and updating variables, calling functions, and transforming records. It sits at the top of the categories list, just below the project's **Connections**.

## Declare Variable

Creates a typed variable in the current flow scope. Use it whenever a downstream node needs a named value that does not come directly from a previous step's result.

![Declare Variable button in the Statement section](/img/develop/flow-design-elements/declare-variable-node.png)

| Field | Description |
|---|---|
| **Name** | Name of the variable. |
| **Type** | Type of the variable. Use a record, enum, primitive, or `json`. Define new types inline with the [Type editor](../type-editor.md). |
| **Expression** | Initialize with a value. Author the expression with assistance in the [Expression editor](../expression-editor.md). Leave it empty to declare an unbound variable. |

![Declare Variable form with Name, Type, and Expression fields](/img/develop/flow-design-elements/declare-variable-form.png)

## Update Variable

Assigns a new value to an existing variable.

![Update Variable button in the Statement section](/img/develop/flow-design-elements/update-variable-node.png)

| Field | Description |
|---|---|
| **Variable** | Name of the variable or field to update. |
| **Expression** | The new value. Use the [Expression editor](../expression-editor.md) for type-aware suggestions. |

![Update Variable form with Variable and Expression fields](/img/develop/flow-design-elements/update-variable-form.png)

## Call Function

Calls a function defined in the project, an imported library, or the Ballerina standard library. Use it to reuse logic across the integration without copying expressions into every node.

![Call Function button in the Statement section](/img/develop/flow-design-elements/call-function-node.png)

The function picker lists functions in three sections: **Within Project**, **Imported Functions** (functions from imported libraries such as `log`), and **Standard Library**. Select **Create Function** under **Within Project** to define a new function inline.

![Function picker showing Within Project, Imported Functions, and Standard Library entries](/img/develop/flow-design-elements/call-function-options.png)

For details on creating, organizing, and reusing functions across artifacts, see the [Functions](../../../integration-artifacts/supporting/functions.md) reference.

## Map Data

Adds a data mapper call that transforms data from one record shape to another. Use it whenever the source data and the downstream consumer expect different record types.

![Map Data button in the Statement section](/img/develop/flow-design-elements/map-data-node.png)

The picker lists every data mapper in the project under **Within Project**. Select an existing mapper to invoke it from the flow, or select **Create Data Mapper** to define a new one. New and existing mappers open in the [Data Mapper editor](../datamapper-editor.md), where you draw connections between source and target fields, write inline expressions, or use **Auto Map**.

![Data Mappers picker with Create Data Mapper action and existing mappers](/img/develop/flow-design-elements/map-data-view.png)

For mapping capabilities, array handling, and submappings, see the [Data mapper](../../../integration-artifacts/supporting/data-mapper/data-mapper.md) reference.

## What's next

- [Connections](./connections) — Invoke actions on configured clients.
- [Control](./control) — Branch, loop, and return inside the flow.
- [AI](./ai) — Call models, build RAG pipelines, and run agents.
- [Logging](./logging) — Emit log messages at different severities.
