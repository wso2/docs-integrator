---
title: Overview
---

# Overview

Oracle Database is a multi-model relational database management system widely used for enterprise workloads. The Ballerina `ballerinax/oracledb` connector (v1.15.0) provides programmatic access to Oracle Database through JDBC, enabling you to execute queries, perform CRUD operations, call stored procedures, and work with Oracle-specific data types such as VARRAYs, nested tables, OBJECT types, and interval types within your Ballerina integration flows.

## Key features

- Execute parameterized SQL queries with streaming result sets via `query` and single-row retrieval via `queryRow`
- Perform DML operations (INSERT, UPDATE, DELETE) with `execute` and batch operations with `batchExecute`
- Call stored procedures and functions with IN, OUT, and INOUT parameters using `call`
- Native support for Oracle-specific types: VARRAY, nested tables, OBJECT types, and INTERVAL types
- SSL/TLS-secured connections with configurable keystore and truststore
- Connection pooling with configurable pool size, idle connections, and timeouts
- XA datasource support for distributed transactions
- GraalVM native image compatible for ahead-of-time compilation

## Actions

Actions are operations you invoke on an Oracle database from your integration — querying records, inserting data, calling stored procedures, and more. The Oracle DB connector exposes actions through a single client:

| Client | Actions |
|--------|---------|
| `Client` | SQL queries, DML execution, batch operations, stored procedure calls |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through setting up an Oracle Database instance and obtaining the connection details required to use the Oracle DB connector.

* **[Action Reference](actions.md)**: Full reference for all clients — operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **Oracle DB** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Oracle DB Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-oracledb)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
