---
title: Overview
---

# Overview

AWS Marketplace Metering Service enables SaaS providers to report customer usage for products listed on AWS Marketplace. The Ballerina `ballerinax/aws.marketplace.mpm` connector (v0.2.0) provides programmatic access to the AWS Marketplace Metering API, allowing you to resolve customers from registration tokens and submit batch metering usage records for billing purposes.

## Key features

- Resolve AWS Marketplace customers from registration tokens to obtain customer identifiers, AWS account IDs, and product codes
- Submit batch metering usage records for up to 25 usage records per request
- Support for usage allocations with tagging for granular billing breakdowns
- Built-in input validation with constraints on product codes, dimensions, quantities, and tag formats
- Support for all 43 AWS regions via the Region enum
- Temporary credential support via optional session tokens for AWS STS-based authentication

## Actions

Actions are operations you invoke on the AWS Marketplace Metering Service from your integration: resolving customers and submitting metering usage records. The connector exposes a single client:

| Client | Actions |
|--------|---------|
| `Client` | Resolve customers, batch meter usage records |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through setting up AWS IAM credentials and permissions required to use the AWS Marketplace Metering connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **AWS Marketplace MPM** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [AWS Marketplace MPM Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-aws.marketplace.mpm)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
