---
title: Overview
---

# Overview

Solace PubSub+ is an advanced event broker that supports publish/subscribe, queueing, request/reply, and streaming patterns. The Ballerina `ballerinax/solace` connector provides programmatic access to Solace PubSub+ through the Solace Java Message Processing (JCSMP) API, letting you publish and consume messages on queues and topics, with support for guaranteed and direct delivery, durable subscriptions, transacted sessions, and event-driven listener services.

## Key features

- Publish messages to Solace queues and topics with `Message Producer`.
- Consume messages from queues and topics with blocking and non-blocking receive via `Message Consumer`.
- Event-driven message processing with a listener and compiler-validated service callbacks for automatic dispatch.
- Direct (at-most-once) and persistent (guaranteed) delivery modes.
- Automatic acknowledgement or client acknowledgement, with explicit `ack`, `nack`, `commit`, and `rollback` control.
- Redelivery to the broker or routing to a dead message queue through `nack` with the `requeue` flag.
- Durable and temporary topic subscriptions, and durable queue subscriptions.
- Transacted sessions with commit and rollback for reliable message delivery.
- TLS/SSL, basic authentication, Kerberos, and OAuth 2.0 authentication support.

## Actions

Actions are operations you invoke on Solace PubSub+ from your integration. Use these actions to publish messages, consume from queues and topics, and manage transacted sessions. The Solace connector exposes actions across two clients:

| Client | Actions |
|--------|---------|
| `Message Producer` | Publish messages to queues and topics; commit or roll back a transacted session. |
| `Message Consumer` | Receive messages (blocking or non-blocking); acknowledge, negatively acknowledge, commit, or roll back. |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Triggers

Triggers let your integration react to messages arriving on Solace queues or topics in real time. The connector uses a `solace:Listener` that dispatches each message to your `onMessage` callback automatically; no manual receive loop is required.

Supported trigger events:

| Event | Callback | Description |
|-------|----------|-------------|
| Message received | `onMessage` | Fired when a message is received on the subscribed queue or topic. |
| Processing error | `onError` | Fired when an error occurs during message receipt or data binding. |

See the **[Trigger Reference](triggers.md)** for listener configuration, service callbacks, and the caller API.

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
