---
title: Overview
---

# Overview

RabbitMQ is an open-source message broker that supports multiple messaging protocols including AMQP 0-9-1. The Ballerina `ballerinax/rabbitmq` connector (v3.3.2) provides programmatic access to RabbitMQ, enabling you to publish messages, consume messages synchronously or asynchronously via listener services, declare and manage queues and exchanges, and build event-driven integration flows.

## Key features

- Publish messages to queues and exchanges with routing key support
- Asynchronous message consumption via listener services with automatic or manual acknowledgement
- Synchronous message retrieval using `consumeMessage` and `consumePayload`
- Queue and exchange declaration, binding, deletion, and purging
- Request-reply messaging pattern with `onRequest` callbacks
- TLS/SSL secure connections and credential-based authentication
- Quality of Service (QoS) prefetch settings for consumer flow control
- Message store implementation for the `ballerina/messaging` abstraction

## Actions

Actions are operations you invoke on RabbitMQ from your integration. Use these actions for publishing messages, declaring queues, consuming messages, and managing exchanges. The RabbitMQ connector exposes actions through the following clients:

| Client | Actions |
|--------|---------|
| `Client` | Publish messages, consume messages, declare/bind/delete queues and exchanges, acknowledgements |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Triggers

Triggers allow your integration to react to messages arriving on RabbitMQ queues in real time. A `rabbitmq:Listener` subscribes to a queue and dispatches incoming messages to your `rabbitmq:Service` callbacks automatically, supporting both one-way consumption and request-reply patterns.

Supported trigger events:

| Event | Callback | Description |
|-------|----------|-------------|
| Message received | `onMessage` | Fired when a message arrives on the subscribed queue (one-way consumption). |
| Request received | `onRequest` | Fired when a message arrives and a reply is expected (request-reply pattern). |

See the **[Trigger Reference](triggers.md)** for listener configuration, service callbacks, and the `EventData` payload structure.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through installing and configuring a RabbitMQ server so you can connect to it with the Ballerina RabbitMQ connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Trigger Reference](triggers.md)**: Reference for event-driven integration using the listener and service model.

* **[Example](example.md)**: Learn how to build and configure an integration using the **RabbitMQ** connector, including connection setup, operation configuration, execution flow, and event-driven trigger setup.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [RabbitMQ Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-rabbitmq)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
