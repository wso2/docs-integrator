---
connector: true
connector_name: "aws.simpledb"
title: "Overview"
description: "Overview of the ballerinax/aws.simpledb connector for WSO2 Integrator."
---

# Overview

The AWS SimpleDB connector enables integration with Amazon SimpleDB, a highly available NoSQL data store that organises data into schemaless domains of items and attributes. It provides operations to manage domains and perform item-level attribute reads, writes, and queries using a SQL-like select expression, all without requiring upfront schema or index definitions.

## Key features

- Create, list, inspect, and delete SimpleDB domains
- Store, retrieve and delete item attributes
- Query items across a domain using SQL-like `select` expressions
- Support for consistent reads to ensure up-to-date query results
- Flexible credential configuration: static keys, AWS profiles, STS assume-role, web identity (OIDC), IAM Identity Center (SSO), external credential process, or the default AWS credential provider chain
- Automatic refresh of expiring temporary credentials

## Actions

The connector exposes a single client that covers all domain management and item attribute operations.

| Client | Actions |
|--------|---------|
| `Client` | Domain management, attribute writes, attribute reads, item queries, attribute deletes |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: How to verify SimpleDB regional availability and configure the required IAM permissions for your AWS identity.

* **[Action Reference](actions.md)**: Full reference for all clients — operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **AWS SimpleDB** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [AWS SimpleDB Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-aws.simpledb)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.