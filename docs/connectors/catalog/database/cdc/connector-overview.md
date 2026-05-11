---
title: Overview
---

# Overview

The Ballerina `ballerinax/cdc` connector provides a spec-compliant, production-grade Change Data Capture (CDC) framework built on top of Debezium, enabling real-time streaming of database row changes (inserts, updates, deletes, and snapshot reads) into your Ballerina integration flows. It supports MySQL, Microsoft SQL Server, PostgreSQL, and Oracle databases through dedicated database-specific listener implementations.

## Key features

- Real-time CDC for MySQL, PostgreSQL, Microsoft SQL Server, and Oracle via Debezium
- Typed payload binding — replace `record {}` callback parameters with user-defined record types for automatic deserialization and type safety
- Configurable snapshot modes (initial, no-data, schema-only, always, recovery, and more) to control startup behavior
- Multi-service per listener — attach multiple `cdc:Service` instances to one listener, each filtered to specific tables via `@cdc:ServiceConfig`
- Table and column filtering — include or exclude specific tables and columns from the change event stream
- Flexible offset and schema history storage — file-based (default) or Kafka-based for production deployments
- SSL/TLS support for secure database connections with configurable SSL modes and key/trust stores
- Built-in liveness probe utility (`cdc:isLive()`) for Kubernetes health check integration

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Triggers

The CDC connector enables event-driven integration by streaming real-time database change events to your Ballerina service. Attach one or more `cdc:Service` instances to a database-specific CDC listener (e.g., `mysql:CdcListener`) and implement callbacks for inserts, updates, deletes, and snapshot reads — no polling required.

Supported trigger events:

| Event | Callback | Description |
|-------|----------|-------------|
| Snapshot read | `onRead` | Fired for each existing row during the initial snapshot phase. |
| Row inserted | `onCreate` | Fired when a new row is inserted into a tracked table. |
| Row updated | `onUpdate` | Fired when an existing row is modified in a tracked table; delivers both the before and after state. |
| Row deleted | `onDelete` | Fired when a row is deleted from a tracked table. |
| Table truncated | `onTruncate` | Fired when a table is truncated (PostgreSQL only). |
| Processing error | `onError` | Fired when an event processing error occurs during CDC event handling. |

See the **[Trigger Reference](triggers.md)** for listener configuration, service callbacks, and the `EventData` payload structure.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through configuring your database server to emit change events that the CDC connector can consume.

* **[Trigger Reference](triggers.md)**: Reference for event-driven integration using the listener and service model.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [CDC Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-cdc)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
