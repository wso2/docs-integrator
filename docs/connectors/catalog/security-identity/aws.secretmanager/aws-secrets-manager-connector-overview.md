---
title: Overview
---

# Overview

AWS Secrets Manager is a managed service that helps you protect access to your applications, services, and IT resources by enabling you to easily rotate, manage, and retrieve database credentials, API keys, and other secrets. The Ballerina `ballerinax/aws.secretmanager` connector (v0.4.0) provides programmatic access to the AWS Secrets Manager API, allowing you to describe, retrieve, and batch-retrieve secrets from your Ballerina integration flows.

## Key features

- Retrieve secret metadata including rotation configuration, replication status, and tags
- Fetch secret values (string or binary) by secret name or ARN
- Select specific secret versions by version ID or staging label
- Batch retrieve up to 20 secret values in a single API call
- Filter batch requests by name, description, tag, region, or owning service
- Support for static credentials, EC2 IAM role-based auth, and default AWS credential chain
- Full coverage of all AWS regions including GovCloud, China, and ISO partitions

## Actions

Actions are operations you invoke on AWS Secrets Manager from your integration, including describing secret metadata, retrieving secret values, and batch-fetching multiple secrets. The connector exposes a single client:

| Client | Actions |
|--------|---------|
| `Client` | Describe secrets, retrieve secret values, batch retrieve secrets |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through setting up AWS IAM credentials with the necessary permissions to access AWS Secrets Manager.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **AWS Secrets Manager** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [AWS Secrets Manager Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-aws.secretmanager)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
