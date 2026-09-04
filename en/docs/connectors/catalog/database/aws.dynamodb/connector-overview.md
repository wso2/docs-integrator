---
connector: true
connector_name: "aws.dynamodb"
title: "Overview"
description: "Overview of the ballerinax/aws.dynamodb connector for WSO2 Integrator."
---

# Overview

The AWS DynamoDB connector enables Ballerina programs to connect and interact with Amazon DynamoDB, a fully managed, serverless, key-value NoSQL database designed to run high-performance applications at any scale. It provides comprehensive APIs for table lifecycle management, item-level CRUD operations, batch processing, querying, scanning, and backup management. The connector supports flexible AWS credential strategies including static keys, profiles, STS assume-role, web identity, IAM Identity Center, and the default AWS credential provider chain.

## Key features

- Table lifecycle management: create, describe, update, delete, and list DynamoDB tables
- Item-level CRUD operations: put, get, update, and delete individual items by primary key
- Auto-paginating Ballerina streams for `Query`, `Scan`, `ListTables`, and `BatchGetItem` — the next page is fetched only once the current one is consumed
- Batch writes that return any items DynamoDB leaves unprocessed under load in `UnprocessedItems`, for the caller to resubmit
- On-demand backup creation and deletion for point-in-time recovery
- Time-to-live (TTL) status retrieval and account provisioned-capacity quota inspection
- Flexible credential configuration: static access keys, AWS profile files, STS assume-role, web identity (OIDC), IAM Identity Center (SSO), external credential process, or the default provider chain
- FIPS, dualstack, and custom endpoint support (e.g., LocalStack, VPC interface endpoints)

## Actions

The AWS DynamoDB connector exposes a single client for interacting with the DynamoDB API. It covers the full range of control-plane and data-plane operations available through the AWS DynamoDB API.

| Client | Actions |
|--------|---------|
| `Client` | Table management, item CRUD, batch reads and writes, query and scan, backups, TTL, and capacity limits |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: How to create a DynamoDB table and obtain the IAM credentials and permissions required to connect.

* **[Action Reference](actions.md)**: Full reference for all clients — operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **AWS DynamoDB** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [AWS DynamoDB Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-aws.dynamodb)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.