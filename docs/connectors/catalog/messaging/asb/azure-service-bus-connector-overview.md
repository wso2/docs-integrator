---
title: Overview
---

# Overview

Azure Service Bus is a fully managed enterprise message broker with message queues and publish-subscribe topics. The Ballerina `ballerinax/asb` connector (v3.9.1) provides programmatic access to Azure Service Bus for sending, receiving, and administering messages across queues, topics, and subscriptions, enabling reliable cloud messaging in your Ballerina integration flows.

## Key features

- Send messages to Azure Service Bus queues and topics with the `MessageSender` client
- Receive messages from queues and subscriptions with configurable receive modes (`PEEK_LOCK`, `RECEIVE_AND_DELETE`)
- Schedule messages for future delivery and cancel scheduled messages
- Batch send and receive operations for high-throughput scenarios
- Message settlement operations: complete, abandon, dead-letter, and defer
- Full queue, topic, subscription, and rule administration via the `Administrator` client
- Event-driven message consumption using `Listener` and service callbacks (`onMessage`, `onError`)
- Automatic lock renewal and auto-completion for simplified message processing

## Actions

Actions are operations you invoke on Azure Service Bus from your integration. Use these actions for sending messages, receiving from queues, managing entities, and more. The ASB connector exposes actions across four clients:

| Client | Actions |
|--------|---------|
| `Message Sender` | Send individual or batch messages, schedule and cancel scheduled messages |
| `Message Receiver` | Receive messages, settle (complete/abandon/dead-letter/defer), and renew locks |
| `Administrator` | Create, get, update, delete, and list queues, topics, subscriptions, and rules |
| `Caller` | Settlement operations (complete, abandon, dead-letter, defer) available within service callbacks |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Triggers

Triggers allow your integration to react to messages arriving on Azure Service Bus queues or subscriptions in real time. The connector uses an `asb:Listener` that continuously receives messages and dispatches them to your service callbacks automatically; no polling required.

Supported trigger events:

| Event | Callback | Description |
|-------|----------|-------------|
| Message received | `onMessage` | Fired when a message is received from the configured queue or subscription. |
| Message retrieval error | `onError` | Fired when an error occurs during message retrieval. |

See the **[Trigger Reference](triggers.md)** for listener configuration, service callbacks, and the `asb:Message` payload structure.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating an Azure Service Bus namespace, a queue or topic, and obtaining the connection string required to use the ASB connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Trigger Reference](triggers.md)**: Reference for event-driven integration using the listener and service model.

* **[Example](example.md)**: Learn how to build and configure an integration using the **Azure Service Bus** connector, including connection setup, operation configuration, execution flow, and event-driven trigger setup.

## What's next

- [Setup Guide](setup-guide.md); create a namespace, queue or topic, and obtain your connection string
- [Action Reference](actions.md): send, receive, and administer messages
- [Trigger Reference](triggers.md): event-driven message consumption with `asb:Listener`
- [Azure Service Bus event integration](../../../../develop/integration-artifacts/event/azure-service-bus.md): configure the listener in WSO2 Integrator

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Azure Service Bus Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-asb)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
