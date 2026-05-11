---
title: Overview
---

# Overview

Java JDBC is a standard API for connecting to relational databases from Java-based platforms. The Ballerina `ballerinax/java.jdbc` connector (v1.14.1) provides a lightweight, generic interface to any JDBC-compatible database — including MySQL, PostgreSQL, Oracle, SQL Server, Snowflake, and more — enabling you to execute queries, perform CRUD operations, and call stored procedures within your Ballerina integration flows.

## Key features

- Generic connectivity to any JDBC-compatible database using standard JDBC URLs
- Parameterized query support to prevent SQL injection and ensure safe data binding
- Single-row retrieval via `queryRow` for efficient lookups and aggregations
- Batch execution for inserting or updating multiple records in a single call
- Stored procedure invocation with IN, OUT, and INOUT parameter support
- Built-in connection pooling with configurable pool size, timeouts, and lifecycle settings
- Support for custom JDBC driver properties and datasource names for advanced configurations

## Actions

Actions are operations you invoke on a JDBC database from your integration — querying records, inserting data, running batch updates, and calling stored procedures. The Java JDBC connector exposes actions through a single client:

| Client | Actions |
|--------|---------|
| `Client` | SQL queries, single-row retrieval, DML execution, batch operations, stored procedure calls |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through setting up your database and obtaining the JDBC connection details required to use the Java JDBC connector.

* **[Action Reference](actions.md)**: Full reference for all clients — operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **Java JDBC** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Java JDBC Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-java.jdbc)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
