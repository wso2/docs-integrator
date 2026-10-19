---
title: Overview
---

# AWS SQS

The AWS SQS connector enables integration with Amazon Simple Queue Service (SQS), a fully managed message queuing service for decoupling and scaling microservices, distributed systems, and serverless applications. It provides both action-based operations for programmatic queue management and an event-driven listener model for real-time message consumption.

## Key Features

- Send, receive, and delete messages from standard and FIFO SQS queues
- Batch send and delete up to 10 messages per request for improved throughput
- Create, delete, list, and configure SQS queues with full attribute control
- Manage message visibility timeouts and purge queue contents
- Add, remove, and list cost allocation tags on queues
- Start and cancel dead-letter queue (DLQ) message movement tasks
- Event-driven message consumption using a listener and service model
- Supports static credentials, AWS profiles, and the default credential provider chain

## Actions

The `Client` provides direct, programmatic access to Amazon SQS for sending and managing messages and queues.

| Client | Actions |
|--------|---------|
| `Client` | Send messages, receive messages, delete messages, batch send and delete, create and delete queues, list queues and get queue URLs, get and set queue attributes, change message visibility, purge queues, manage queue tags, start and cancel DLQ message move tasks |

See the **[Action Reference](action-reference.md)** for the full list of operations, parameters, and sample code for each client.

## Triggers

The `Listener` and `Service` together enable event-driven message consumption, automatically polling an SQS queue and invoking service callbacks as messages arrive.

Supported trigger events:

| Event | Callback | Description |
|-------|----------|-------------|
| Message received | `onMessage` | Invoked for each message polled from the configured SQS queue |
| Polling error | `onError` | Invoked when an error occurs during message polling |

See the **[Trigger Reference](trigger-reference.md)** for listener configuration, service callbacks, and the event payload structure.

## Documentation

* **[Setup Guide](setup-guide.md)**: Steps to create an AWS IAM user and obtain the access key credentials required to authenticate with Amazon SQS.

* **[Action Reference](action-reference.md)**: Full reference for all clients — operations, parameters, return types, and sample code.

* **[Trigger Reference](trigger-reference.md)**: Reference for event-driven integration using the listener and service model.

* **[Example](example.md)**: Learn how to build and configure an integration using the **AWS SQS** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [AWS SQS Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-aws.sqs)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
