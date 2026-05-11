---
title: Overview
---

# Overview

PostgreSQL is a powerful, open-source object-relational database system known for reliability, feature robustness, and performance. The Ballerina `ballerinax/postgresql` connector (v1.16.3) provides programmatic access to PostgreSQL databases through SQL queries, stored procedures, and batch operations, with native support for PostgreSQL-specific data types such as geometric, network, range, JSON, and UUID types. It also includes a CDC (Change Data Capture) listener powered by Debezium for real-time event-driven integration.

## Key features

- Execute SQL queries with parameterized values and stream results via `query` and `queryRow`
- Perform INSERT, UPDATE, DELETE, and DDL operations via `execute` and `batchExecute`
- Call stored procedures with IN, OUT, and INOUT parameters via `call`
- Native PostgreSQL type support including geometric, network, range, JSON, UUID, text search, and enum types
- Change Data Capture (CDC) listener for real-time streaming of create, update, and delete events using Debezium
- Connection pooling with configurable pool sizes, timeouts, and keep-alive settings
- SSL/TLS support with multiple modes including certificate verification

## Actions

Actions are operations you invoke on PostgreSQL from your integration — querying tables, inserting records, calling stored procedures, and more. The PostgreSQL connector exposes actions through a single client:

| Client | Actions |
|--------|---------|
| `Client` | SQL queries, record manipulation, batch operations, stored procedure calls |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Triggers

Triggers allow your integration to react to data changes happening in PostgreSQL in real time. The connector uses Debezium-based Change Data Capture (CDC) to stream row-level change events to a `postgresql:CdcListener`, which invokes your service callbacks automatically — no polling required.

Supported trigger events:

| Event | Callback | Description |
|-------|----------|-------------|
| Snapshot read | `onRead` | Fired for each existing row during the initial snapshot of the database. |
| Record created | `onCreate` | Fired when a new row is inserted into a captured table. |
| Record updated | `onUpdate` | Fired when an existing row is modified in a captured table. |
| Record deleted | `onDelete` | Fired when a row is deleted from a captured table. |

See the **[Trigger Reference](triggers.md)** for listener configuration, service callbacks, and the `EventData` payload structure.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through setting up a PostgreSQL server and configuring it for use with the Ballerina PostgreSQL connector, including optional CDC configuration.

* **[Action Reference](actions.md)**: Full reference for all clients — operations, parameters, return types, and sample code.

* **[Trigger Reference](triggers.md)**: Reference for event-driven integration using the listener and service model.

* **[Example](example.md)**: Learn how to build and configure an integration using the **PostgreSQL** connector, including connection setup, operation configuration, execution flow, and event-driven trigger setup.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [PostgreSQL Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-postgresql)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
