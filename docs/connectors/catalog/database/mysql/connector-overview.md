# MySQL Connector Overview

MySQL is one of the world's most popular open-source relational database management systems. The Ballerina `ballerinax/mysql` connector (v1.18.0) provides programmatic access to MySQL databases through the standard SQL interface, supporting queries, inserts, updates, deletes, batch operations, stored procedure calls, and real-time Change Data Capture (CDC) via a Debezium-based listener.

## Key features

- Full SQL operations — query, insert, update, delete — using parameterized queries for safety and convenience
- Single-row retrieval via `queryRow` for lookups, aggregations, and existence checks
- Batch execution support for inserting or modifying multiple rows in a single operation
- Stored procedure invocation with `IN`, `OUT`, and `INOUT` parameter support and multiple result sets
- Change Data Capture (CDC) listener powered by Debezium for real-time `onRead`, `onCreate`, `onUpdate`, `onDelete`, and `onError` events
- Flexible connection pooling — global shared, client-owned, or local shared pools
- SSL/TLS support with configurable modes: Disabled, Preferred, Required, Verify CA, and Verify Identity
- GraalVM native image support when used with `ballerinax/mysql.driver`

## Actions

Actions are operations you invoke on a MySQL database from your integration — executing SQL queries, inserting records, running batch updates, calling stored procedures, and more. The MySQL connector exposes actions through a single client:

| Client | Actions |
|--------|---------|
| `Client` | SQL query, single-row query, execute (DML/DDL), batch execute, stored procedure call, connection management |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Triggers

Triggers allow your integration to react to data changes happening in a MySQL database in real time. The connector uses Debezium-based Change Data Capture (CDC) to stream row-level change events to a `mysql:CdcListener`, which invokes your service callbacks automatically.

Supported trigger events:

| Event | Callback | Description |
|-------|----------|-------------|
| Record read (snapshot) | `onRead` | Fired during the initial snapshot when existing rows are read from the database. |
| Record created | `onCreate` | Fired when a new row is inserted into a monitored table. |
| Record updated | `onUpdate` | Fired when an existing row is modified in a monitored table. |
| Record deleted | `onDelete` | Fired when a row is deleted from a monitored table. |
| Listener error | `onError` | Fired when the listener encounters an error during change-event delivery (e.g., deserialization failures or connector errors). |

See the **[Trigger Reference](triggers.md)** for listener configuration, service callbacks, and the row record passed to each callback.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through setting up a MySQL database and obtaining the connection credentials required to use the Ballerina MySQL connector.

* **[Action Reference](actions.md)**: Full reference for all clients — operations, parameters, return types, and sample code.

* **[Trigger Reference](triggers.md)**: Reference for event-driven integration using the listener and service model.

* **[Example](example.md)**: Learn how to build and configure an integration using the **MySQL** connector, including connection setup and operation configuration. For the listener and service model, see [Trigger Reference](triggers.md).

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [MySQL Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-mysql)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
