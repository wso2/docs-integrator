---
title: Overview
---

# Overview

Amazon Simple Notification Service (SNS) is a fully managed pub/sub messaging and notification service for coordinating the delivery of messages to subscribing endpoints and clients. The Ballerina `ballerinax/aws.sns` connector (v3.0.0) provides programmatic access to AWS SNS, enabling you to create topics, manage subscriptions, publish messages, and manage platform applications and SMS capabilities from your Ballerina integration flows.

## Key features

- Create, delete, and manage SNS topics with configurable attributes and delivery policies
- Publish messages to topics, phone numbers, or platform endpoints with optional message attributes and filtering
- Batch publishing support for sending up to 10 messages in a single API call
- Subscribe endpoints (email, SMS, HTTP/S, SQS, Lambda, etc.) with filter policies for targeted delivery
- Platform application and endpoint management for mobile push notifications (APNs, FCM, ADM, etc.)
- SMS sandbox management including phone number verification and opt-out handling
- Tag management and access control via topic permissions
- Data protection policy management for message data redaction and auditing

## Actions

Actions are operations you invoke on AWS SNS from your integration: creating topics, publishing messages, managing subscriptions, and more. The AWS SNS connector exposes actions through a single client:

| Client | Actions |
|--------|---------|
| `Client` | Topic management, message publishing, subscriptions, platform applications, SMS, tags, permissions, data protection |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through setting up an AWS account and obtaining the credentials required to use the AWS SNS connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **AWS SNS** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [AWS SNS Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-aws.sns)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
