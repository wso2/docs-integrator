---
title: Overview
---

# Overview

Amazon Redshift is a fully managed, petabyte-scale cloud data warehouse service. The Ballerina `ballerinax/aws.redshift` connector (v1.2.1) provides programmatic access to Redshift clusters via JDBC, enabling you to execute queries, perform DML/DDL operations, run batch statements, and call stored procedures from your Ballerina integration flows.

## Key features

- Execute SQL queries and retrieve results as typed record streams using `query` and `queryRow`
- Perform DML and DDL operations (INSERT, UPDATE, DELETE, CREATE TABLE, etc.) with `execute`
- Run batch operations for efficient bulk data manipulation with `batchExecute`
- Call stored procedures with input/output parameters using `call`
- SSL/TLS support with configurable SSL modes (DISABLE, VERIFY_CA, VERIFY_FULL)
- Built-in connection pooling with configurable pool settings
- Parameterized queries for safe, injection-free SQL execution

## Actions

Actions are operations you invoke on your Redshift data warehouse from your integration, including querying tables, inserting records, running batch operations, and calling stored procedures. The AWS Redshift connector exposes actions through a single client:

| Client | Actions |
|--------|---------|
| `Client` | SQL queries, DML/DDL execution, batch operations, stored procedure calls |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through setting up an Amazon Redshift cluster and obtaining the JDBC connection details required to use the AWS Redshift connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **AWS Redshift** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [AWS Redshift Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-aws.redshift)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
