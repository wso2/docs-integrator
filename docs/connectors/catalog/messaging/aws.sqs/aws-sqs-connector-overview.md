---
title: Overview
---

# Overview

Amazon Simple Queue Service (SQS) is a fully managed message queuing service that enables decoupled communication between distributed application components. The Ballerina `ballerinax/aws.sqs` connector (v4.1.2) provides programmatic access to SQS through the AWS SDK, enabling you to send, receive, and manage messages and queues directly from your Ballerina integration flows.

## Key features

- Send and receive messages from standard and FIFO queues
- Batch operations for sending and deleting up to 10 messages at a time
- Queue lifecycle management: create, delete, purge, and configure queues
- Event-driven message consumption via a built-in Listener with automatic polling
- FIFO queue support with message grouping, deduplication, and ordering guarantees
- Dead-letter queue message move tasks for reprocessing failed messages
- Queue tagging for cost allocation and resource organization
- Flexible authentication with static credentials, AWS profiles, or default credential chain

## Actions

Actions are operations you invoke on AWS SQS from your integration. Use these actions for sending messages, managing queues, configuring attributes, and more. The connector exposes actions through a single client:

| Client | Actions |
|--------|---------|
| `Client` | Send/receive messages, queue CRUD, batch operations, tagging, message move tasks |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Triggers

Triggers allow your integration to react to messages arriving in an SQS queue in real time. The connector uses a built-in polling mechanism via `sqs:Listener`, which periodically retrieves messages and invokes your service callbacks automatically; no manual polling required.

Supported trigger events:

| Event | Callback | Description |
|-------|----------|-------------|
| Message received | `onMessage` | Fired when one or more messages are retrieved from the queue. |
| Error occurred | `onError` | Fired when an error occurs during message polling or processing. |

See the **[Trigger Reference](triggers.md)** for listener configuration, service callbacks, and the `EventData` payload structure.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through setting up an AWS account and obtaining the credentials required to use the AWS SQS connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Trigger Reference](triggers.md)**: Reference for event-driven integration using the listener and service model.

* **[Example](example.md)**: Learn how to build and configure an integration using the **AWS SQS** connector, including connection setup, operation configuration, execution flow, and event-driven trigger setup.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [AWS SQS Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-aws.sqs)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
