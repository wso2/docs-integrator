---
title: MQTT
---

MQTT is a lightweight messaging protocol designed for constrained devices and low-bandwidth, high-latency networks, widely used in IoT scenarios. The Ballerina `ballerina/mqtt` connector (v1.4.0) provides a complete MQTT v5 client for publishing and subscribing to messages, as well as a listener for event-driven message consumption, enabling seamless integration with any MQTT broker.

## Key features

- Publish messages to MQTT topics with configurable QoS levels (0, 1, 2) and retention
- Subscribe to one or more topics with pull-based message receiving via the Client
- Event-driven message consumption using Listener and Service for push-based subscriptions
- MQTT v5 support including response topics and correlation data for request-response patterns
- Secure connections via SSL/TLS with trust store and key store configuration
- Automatic reconnection with configurable delay for resilient connections
- Manual acknowledgement support for fine-grained message delivery control
- Last Will and Testament (LWT) message configuration for client disconnect notifications

## Actions

Actions are operations you invoke on an MQTT broker from your integration: publishing messages, subscribing to topics, and receiving messages. The MQTT connector exposes actions through a single client:

| Client | Actions |
|--------|---------|
| `Client` | Publish messages, subscribe to topics, receive messages, manage connections |

See the **[Action Reference](action-reference.md)** for the full list of operations, parameters, and sample code for each client.

## Triggers

Triggers allow your integration to react to messages arriving on MQTT topics in real time. The connector uses an `mqtt:Listener` that subscribes to specified topics and invokes your service callbacks automatically whenever messages are received: no polling required.

Supported trigger events:

| Event | Callback | Description |
|-------|----------|-------------|
| Message received | `onMessage` | Fired when a message is received on a subscribed topic. |
| Error occurred | `onError` | Fired when an error occurs during message processing. |
| Delivery completed | `onComplete` | Fired when a message delivery is completed (acknowledgement received from broker). |

See the **[Trigger Reference](trigger-reference.md)** for listener configuration, service callbacks, and the event payload structure.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through setting up an MQTT broker that the Ballerina MQTT connector will connect to.

* **[Action Reference](action-reference.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Trigger Reference](trigger-reference.md)**: Reference for event-driven integration using the listener and service model.

* **[Example](example.md)**: Learn how to build and configure an integration using the **MQTT** connector, including connection setup, operation configuration, execution flow, and event-driven trigger setup.

## How to contribute

As an open-source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [MQTT Connector GitHub repository](https://github.com/ballerina-platform/module-ballerina-mqtt)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
