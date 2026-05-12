---
title: Overview
---

# Overview

Microsoft SQL Server is a relational database management system used for enterprise data storage and processing. The Ballerina `ballerinax/mssql` connector (v1.16.4) provides programmatic access to MSSQL databases through SQL queries, parameterized statements, stored procedures, batch operations, and Change Data Capture (CDC) event streaming, enabling you to integrate MSSQL data into your Ballerina integration flows.

## Key features

- Execute parameterized SQL queries with compile-time safety and SQL injection protection
- Single-row retrieval via `queryRow` for efficient lookups
- Batch execution for high-throughput bulk INSERT, UPDATE, and DELETE operations
- Stored procedure calls with IN/OUT/INOUT parameter support using `exec` syntax
- MSSQL-specific spatial type support (Point, LineString, Polygon, and more) with SRID
- Money and SmallMoney type handling for precise financial data
- Change Data Capture (CDC) via Debezium for real-time event-driven processing of record creates, updates, deletes, and reads
- SSL/TLS encryption with certificate and key store configuration, plus named instance and XA transaction support

## Actions

Actions are operations you invoke on MSSQL from your integration, including querying tables, inserting records, running batch operations, calling stored procedures, and more. The MSSQL connector exposes actions through a single client:

| Client | Actions |
|--------|---------|
| `Client` | SQL queries, single-row retrieval, DML execution, batch operations, stored procedure calls |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Triggers

Triggers allow your integration to react to data changes happening in MSSQL in real time. The connector uses Debezium-based Change Data Capture (CDC) to stream change events to a `mssql:CdcListener`, which invokes your service callbacks automatically, with no polling required.

Supported trigger events:

| Event | Callback | Description |
|-------|----------|-------------|
| Record read (snapshot) | `onRead` | Fired during the initial snapshot when an existing record is read. |
| Record created | `onCreate` | Fired when a new record is inserted into a CDC-enabled table. |
| Record updated | `onUpdate` | Fired when an existing record is modified in a CDC-enabled table. |
| Record deleted | `onDelete` | Fired when a record is deleted from a CDC-enabled table. |

See the **[Trigger Reference](triggers.md)** for listener configuration, service callbacks, and the `EventData` payload structure.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through setting up a Microsoft SQL Server instance and enabling CDC so that the MSSQL connector can connect and capture data changes.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Trigger Reference](triggers.md)**: Reference for event-driven integration using the listener and service model.

* **[Example](example.md)**: Learn how to build and configure an integration using the **MSSQL** connector, including connection setup, operation configuration, execution flow, and event-driven trigger setup.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [MSSQL Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-mssql)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
