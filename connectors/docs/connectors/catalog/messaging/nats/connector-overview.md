---
title: Overview
---

# Overview

NATS is a high-performance, cloud-native messaging system that supports publish/subscribe, request/reply, and queue group patterns, as well as persistent messaging through JetStream. The Ballerina `ballerinax/nats` connector (v3.3.0) provides programmatic access to a NATS server for publishing messages, subscribing to subjects, performing request-reply exchanges, and managing JetStream streams and consumers within your Ballerina integration flows.

## Key features

- Publish messages to any NATS subject with support for `anydata` content types
- Request-reply messaging pattern with configurable timeout for synchronous interactions
- Subscribe to NATS subjects via service listeners with wildcard subject support (`*`, `>`)
- Queue group subscriptions for load-balanced message distribution across multiple consumers
- JetStream persistent messaging; create and manage streams with `nats:JetStreamClient`
- JetStream push and pull consumption via `nats:JetStreamListener` with auto-ack or manual acknowledgement
- Flexible authentication support: username/password credentials, token-based auth, and mutual TLS
- TLS/SSL secure connections with configurable certificates for encrypted transport

## Actions

Actions are operations you invoke on a NATS server from your integration. Use these actions for publishing messages, sending requests, and managing JetStream streams. The NATS connector exposes actions across two clients:

| Client | Actions |
|--------|---------|
| `Client` | Publish messages, request-reply, close connection |
| `JetStreamClient` | JetStream stream management, persistent publish, pull-based consume, ack/nak |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through running a NATS server and configuring the Ballerina connector to connect to it.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **NATS** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [NATS Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-nats)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
