---
connector: true
connector_name: "aws.dynamodbstreams"
title: "Overview"
description: "Overview of the ballerinax/aws.dynamodbstreams connector for WSO2 Integrator."
---

# Overview

The AWS DynamoDB Streams connector enables integration with [Amazon DynamoDB Streams](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Streams.html), a service that captures a time-ordered sequence of item-level modifications made to a DynamoDB table and stores them for up to 24 hours. Applications can use this connector to react to data changes in near real time by reading stream records distributed across shards. The connector provides complete coverage of the [AWS DynamoDB Streams API](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Operations_Amazon_DynamoDB_Streams.html).

## Key features

- Complete coverage of the DynamoDB Streams APIs
- Checkpointable shard reads
- Auto-paginating Ballerina stream for listing streams and a polling records
- Flexible credential configuration: static keys, AWS credentials file profiles, STS assume-role, web identity (OIDC), IAM Identity Center (SSO), an external credential process, or the default AWS credential provider chain
- Automatic refresh of expiring temporary credentials

## Actions

The AWS DynamoDB Streams connector exposes a single client for interacting with the DynamoDB Streams API, covering stream discovery, shard navigation, and record consumption.

| Client | Actions |
|--------|---------|
| `Client` | List streams, describe streams, get shard iterators, get records, poll records |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: How to enable a DynamoDB stream on your table and configure the IAM permissions required by the connector.

* **[Action Reference](actions.md)**: Full reference for all clients — operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **AWS DynamoDB Streams** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [AWS DynamoDB Streams Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-aws.dynamodbstreams)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.