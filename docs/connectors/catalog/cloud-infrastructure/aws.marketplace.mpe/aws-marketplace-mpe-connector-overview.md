---
title: Overview
---

# Overview

AWS Marketplace Entitlement Service (MPE) enables AWS Marketplace sellers to programmatically determine the entitlements of customers who have subscribed to their products. The Ballerina `ballerinax/aws.marketplace.mpe` connector (v0.2.0) wraps the AWS Marketplace Entitlement Service API, allowing you to query customer entitlements from your Ballerina integration flows.

## Key features

- Retrieve customer entitlements for AWS Marketplace products by product code
- Filter entitlements by customer identifier or dimension
- Pagination support for large entitlement result sets via maxResults and nextToken
- Support for all AWS regions including GovCloud and isolated partitions
- Temporary credential support via optional session tokens (AWS STS)
- Built-in request validation using Ballerina constraint annotations

## Actions

Actions are operations you invoke on the AWS Marketplace Entitlement Service from your integration: primarily querying customer entitlements. The connector exposes a single client:

| Client | Actions |
|--------|---------|
| `Client` | Retrieve customer entitlements, manage client lifecycle |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through setting up your AWS account and obtaining the credentials required to use the AWS Marketplace MPE connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **AWS Marketplace MPE** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [AWS Marketplace MPE Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-aws.marketplace.mpe)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
