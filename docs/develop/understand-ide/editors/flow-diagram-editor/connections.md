---
title: Connections
---

# Connections

A connection is a reusable, pre-configured client to an external system such as an HTTP service, database, message broker, or SaaS API. Connections appear in the **Connections** section at the very top of the node panel, above all other categories. Use them to invoke remote operations from the flow without re-creating the client each time.

## Connection

Selecting a connection in the node panel adds a step bound to that connection.

![mysqlClient connection in the Connections section](/img/develop/flow-design-elements/connection-node.png)

To create a new connection, select **+** next to **Connections**. For details on connection types, scopes, and credential management, see the [Connections](../../../integration-artifacts/supporting/connections.md) reference.

## Connection actions

Selecting a connection lists every action it supports. Choosing an action drops it into the flow as a step bound to that connection. The action set depends on the connection type. For a database client, the actions are **Query**, **Query Row**, **Execute**, **Batch Execute**, **Call**, and **Close**.

![Actions available on the mysqlClient connection: Query, Query Row, Execute, Batch Execute, Call, Close](/img/develop/flow-design-elements/connection-actions.png)

Each action opens its own configuration form when selected. Action forms typically include a query or payload field, parameter bindings, and a result variable. Use the [Expression editor](../expression-editor.md) to author parameter expressions, and the [Type editor](../type-editor.md) to bind the result to a typed variable.

## What's next

- [Statement](./statement) — Declare and update variables, call functions, and map data.
- [Control](./control) — Branch, loop, and return.
- [Connections reference](../../../integration-artifacts/supporting/connections) — Create, configure, and reuse clients to external systems.
