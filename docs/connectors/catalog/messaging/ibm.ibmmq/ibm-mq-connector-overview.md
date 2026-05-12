---
title: Overview
---

# Overview

IBM MQ is an enterprise messaging middleware that enables applications to communicate reliably across distributed systems using message queues and publish/subscribe topics. The Ballerina `ballerinax/ibm.ibmmq` connector (v1.4.2) provides programmatic access to IBM MQ queue managers, queues, and topics, enabling you to produce and consume messages within your Ballerina integration flows.

## Key features

- Connect to IBM MQ queue managers with full authentication and SSL/TLS support
- Put and get messages on queues using the native MQ API
- Publish and subscribe to topics for event-driven messaging patterns
- Event-driven message consumption via a Listener service with configurable polling
- Transaction support with session-level commit and rollback via the Caller
- Support for MQ message headers including MQRFH2, MQRFH, MQCIH, and MQIIH
- Message selection and matching by message ID and correlation ID
- Custom message properties and configurable message options (persistence, priority, expiry)

## Actions

Actions are operations you invoke on IBM MQ from your integration. Use these actions for putting messages onto queues, getting messages, publishing to topics, and managing connections. The IBM MQ connector exposes actions across three types:

| Client | Actions |
|--------|---------|
| `Queue Manager` | Connect to IBM MQ, access queues and topics, disconnect |
| `Queue` | Put messages to and get messages from a queue |
| `Topic` | Publish and subscribe to topics, send messages via JMS API |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Triggers

Triggers allow your integration to react to messages arriving on IBM MQ queues or topics in real time. The connector provides a `ibmmq:Listener` that polls for messages and invokes your service's `onMessage` callback automatically; no manual polling loop required.

Supported trigger events:

| Event | Callback | Description |
|-------|----------|-------------|
| Message received | `onMessage` | Fired when a message is available on the configured queue or topic subscription. |

See the **[Trigger Reference](triggers.md)** for listener configuration, service callbacks, and the `EventData` payload structure.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through setting up an IBM MQ queue manager and creating the queues and topics required to use the IBM MQ connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Trigger Reference](triggers.md)**: Reference for event-driven integration using the listener and service model.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [IBM MQ Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-ibm.ibmmq)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
