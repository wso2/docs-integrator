---
title: PostgreSQL
---

# Overview

PostgreSQL is a widely used open-source object-relational database known for reliability, feature depth, and performance. The `ballerinax/postgresql` connector (v1.18.0) provides programmatic access to PostgreSQL databases through the standard SQL interface. It supports queries, inserts, updates, deletes, batch operations, stored procedure calls, and real-time Change Data Capture (CDC) through a Debezium-based listener. The connector also recognizes PostgreSQL-specific data types such as geometric, network, range, JSON, UUID, text search, and enum types.

## Key features

- Full SQL operations: query, insert, update, delete using parameterized queries for safety and convenience
- Single-row retrieval through `queryRow` for lookups, aggregations, and existence checks
- Batch execution support for inserting or modifying multiple rows in a single call
- Stored procedure invocation with `IN`, `OUT`, and `INOUT` parameter support and multiple result sets
- Change Data Capture (CDC) listener powered by Debezium for real-time `onRead`, `onCreate`, `onUpdate`, and `onDelete` events
- Native PostgreSQL type support including geometric, network, range, JSON, UUID, text search, and enum types
- Connection pooling with configurable pool sizes, timeouts, and keep-alive settings
- SSL/TLS support with multiple modes: `DISABLE`, `ALLOW`, `PREFER`, `REQUIRE`, `VERIFY_CA`, and `VERIFY_FULL`

## Actions

Actions are operations you invoke on a PostgreSQL database from your integration, such as executing SQL queries, inserting or updating records, running batch operations, and calling stored procedures. The PostgreSQL connector exposes actions through a single client:

| Client | Actions |
|--------|---------|
| `Client` | SQL queries, single-row retrieval, DML/DDL execution, batch operations, stored procedure calls, connection management |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Triggers

Triggers allow your integration to react to data changes happening in a PostgreSQL database in real time. The connector uses Debezium-based Change Data Capture (CDC) to stream row-level change events to a `postgresql:CdcListener`, which invokes your service callbacks automatically.

Supported trigger events:

| Event | Callback | Description |
|-------|----------|-------------|
| Record read (snapshot) | `onRead` | Fired during the initial snapshot when existing rows are read from the database. |
| Record created | `onCreate` | Fired when a new row is inserted into a monitored table. |
| Record updated | `onUpdate` | Fired when an existing row is modified in a monitored table. |
| Record deleted | `onDelete` | Fired when a row is deleted from a monitored table. |

See the **[Trigger Reference](triggers.md)** for listener configuration, service callbacks, and the row record passed to each callback.

## Documentation

* **[Setup Guide](setup-guide.md)**: Walks you through setting up a PostgreSQL server and configuring it for use with the PostgreSQL connector, including optional CDC configuration.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Trigger Reference](triggers.md)**: Reference for event-driven integration using the listener and service model.

* **[Example](example.md)**: Learn how to build and configure an integration using the **PostgreSQL** connector, including connection setup and operation configuration. For the listener and service model, see [Trigger Reference](triggers.md).

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [PostgreSQL Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-postgresql)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
