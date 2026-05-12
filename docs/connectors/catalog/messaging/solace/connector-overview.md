---
title: Overview
---

# Overview

Solace PubSub+ is an advanced event broker that supports publish/subscribe, queueing, request/reply, and streaming patterns. The Ballerina `ballerinax/solace` connector (v0.3.1) provides programmatic access to Solace PubSub+ through its JMS-based API, enabling you to produce and consume messages on queues and topics, with support for durable subscriptions, transacted sessions, and event-driven listener services.

## Key features

- Publish messages to Solace queues and topics via `MessageProducer`
- Consume messages from queues and topics with blocking and non-blocking receive via `MessageConsumer`
- Event-driven message processing with `Listener` and service callbacks for automatic dispatch
- Flexible acknowledgement modes: auto, client, transacted, and dups-ok
- Durable and non-durable topic subscriptions with configurable consumer types
- Automatic data binding for message payloads: string, JSON, XML, byte[], records, and maps
- TLS/SSL, basic auth, Kerberos, and OAuth 2.0 authentication support
- Transacted sessions with commit/rollback for reliable message delivery

## Actions

Actions are operations you invoke on Solace PubSub+ from your integration. Use these actions for publishing messages, consuming from queues, and managing transacted sessions. The Solace connector exposes actions across two clients:

| Client | Actions |
|--------|---------|
| `Message Producer` | Publish messages to queues and topics, commit/rollback transacted sends |
| `Message Consumer` | Receive messages (blocking/non-blocking), acknowledge, commit/rollback transacted receives |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Triggers

Triggers allow your integration to react to messages arriving on Solace queues or topics in real time. The connector uses a polling-based `solace:Listener` that dispatches messages to your `onMessage` callback automatically; no manual receive loop required.

Supported trigger events:

| Event | Callback | Description |
|-------|----------|-------------|
| Message received | `onMessage` | Fired when a message is received on the subscribed queue or topic. |
| Processing error | `onError` | Fired when an error occurs during message receipt or data binding. |

See the **[Trigger Reference](triggers.md)** for listener configuration, service callbacks, and the `EventData` payload structure.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through setting up a Solace PubSub+ broker and obtaining the connection details required to use the Solace connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Trigger Reference](triggers.md)**: Reference for event-driven integration using the listener and service model.

* **[Example](example.md)**: Learn how to build and configure an integration using the **Solace** connector, including connection setup, operation configuration, execution flow, and event-driven trigger setup.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Solace Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-solace)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
