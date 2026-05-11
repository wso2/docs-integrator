---
title: Overview
---

# Overview

Snowflake is a cloud-based data warehousing platform that enables scalable storage, processing, and analytics of structured and semi-structured data. The Ballerina `ballerinax/snowflake` connector (v2.2.1) provides programmatic access to Snowflake through JDBC, enabling you to execute SQL queries, perform DML/DDL operations, call stored procedures, and run batch operations from your Ballerina integration flows.

## Key features

- Execute SQL queries and retrieve results as typed Ballerina record streams
- Single-row query support for lookups and aggregations via `queryRow`
- DDL and DML execution with detailed execution result metadata
- Batch execution for efficient bulk insert, update, and delete operations
- Stored procedure invocation via `call` with support for multiple result sets
- Key-pair authentication support via `AdvancedClient` for enhanced security
- Parameterized queries to prevent SQL injection
- Connection pooling for efficient resource management

## Actions

Actions are operations you invoke on Snowflake from your integration — querying data, inserting records, executing DDL statements, and calling stored procedures. The Snowflake connector exposes actions through two clients:

| Client | Actions |
|--------|---------|
| `Client` | SQL queries, DML/DDL execution, batch operations, stored procedure calls (basic auth) |
| `Advanced Client` | SQL queries, DML/DDL execution, batch operations, stored procedure calls (basic + key-pair auth) |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through setting up a Snowflake account, creating a warehouse and database, and obtaining the credentials required to use the Snowflake connector.

* **[Action Reference](actions.md)**: Full reference for all clients — operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **Snowflake** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Snowflake Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-snowflake)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
