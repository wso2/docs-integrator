---
title: Overview
---

# Overview

JMS (Java Message Service) is a Java API standard for message-oriented middleware. The Ballerina `ballerinax/java.jms` connector (v1.2.0) provides programmatic access to JMS 2.0 and 1.0 compliant brokers such as ActiveMQ, allowing you to send and receive messages through queues and topics in your Ballerina integration flows.

## Key features

- Send messages to JMS queues and topics using MessageProducer
- Receive messages synchronously with blocking and non-blocking consume via MessageConsumer
- Event-driven message consumption using Listener and Service for automatic dispatch
- Support for text, map, and byte message content types
- Durable, shared, and shared-durable topic subscriptions
- Session-level transaction support with commit and rollback
- JMS message selector filtering for targeted message consumption
- Manual and automatic message acknowledgement modes

## Actions

Actions are operations you invoke from your integration to send or receive JMS messages. The JMS connector exposes actions across four client types that follow the standard JMS Connection → Session → Producer/Consumer hierarchy:

| Client | Actions |
|--------|---------|
| `Connection` | Connection lifecycle, session creation |
| `Session` | Transaction control, producer/consumer creation, subscription management |
| `Message Producer` | Send messages to queues and topics |
| `Message Consumer` | Receive and acknowledge messages from queues and topics |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Triggers

Triggers allow your integration to react to incoming JMS messages in real time. The connector provides a `jms:Listener` that connects to a JMS broker and dispatches messages to your service callbacks automatically; no polling required.

Supported trigger events:

| Event | Callback | Description |
|-------|----------|-------------|
| Message received | `onMessage` | Fired when a message arrives on the subscribed queue or topic. |

See the **[Trigger Reference](triggers.md)** for listener configuration, service callbacks, and the `EventData` payload structure.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through setting up a JMS broker and obtaining the connection details required to use the JMS connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Trigger Reference](triggers.md)**: Reference for event-driven integration using the listener and service model.

* **[Example](example.md)**: Learn how to build and configure an integration using the **JMS** connector, including connection setup, operation configuration, execution flow, and event-driven trigger setup.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [JMS Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-java.jms)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
