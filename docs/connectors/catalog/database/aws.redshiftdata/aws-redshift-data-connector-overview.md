---
title: Overview
---

# Overview

Amazon Redshift is a fully-managed data warehouse service provided by AWS, designed to efficiently analyze large datasets with high performance and scalability. The Ballerina `ballerinax/aws.redshiftdata` connector (v1.1.0) provides programmatic access to Amazon Redshift through the Data API, enabling you to execute SQL statements, retrieve results, and manage queries without persistent database connections or JDBC drivers.

## Key features

- Execute SQL statements (DML and DDL) asynchronously via the Redshift data API
- Batch execution of up to 40 SQL statements in a single request
- Stream query results as typed Ballerina records using `getResultAsStream`
- Poll and monitor statement execution status with `describe`
- Support for both provisioned Cluster and Serverless WorkGroup access patterns
- Flexible authentication using AWS static credentials or EC2 IAM role-based auth
- Parameterized query support via `sql:ParameterizedQuery` for safe SQL execution

## Actions

Actions are operations you invoke on Amazon Redshift from your integration — executing SQL statements, retrieving results, and checking execution status. The connector exposes a single client:

| Client | Actions |
|--------|---------|
| `Client` | SQL execution, batch execution, result streaming, statement status |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through setting up your AWS account and Amazon Redshift environment to obtain the credentials and configuration required to use the AWS Redshift data connector.

* **[Action Reference](actions.md)**: Full reference for all clients — operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **AWS Redshift Data** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [AWS Redshift data connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-aws.redshiftdata)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
