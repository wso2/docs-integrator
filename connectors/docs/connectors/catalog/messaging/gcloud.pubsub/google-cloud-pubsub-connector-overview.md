---
title: Overview
---

# Overview

Google Cloud Pub/Sub is a fully managed, real-time messaging service from Google Cloud that enables asynchronous communication between independent applications. The Ballerina `ballerinax/gcloud.pubsub` connector provides a `Publisher` client for publishing messages to topics and a `Listener` for consuming messages from subscriptions, allowing you to integrate Google Cloud Pub/Sub into your Ballerina integration flows.

## Key features

- Publish messages to Google Cloud Pub/Sub topics with automatic serialization of `string`, `json`, `xml`, and `byte[]` payloads
- Consume messages from subscriptions using an event-driven listener with automatic pull streaming
- Acknowledge or reject (nack) messages from within service callbacks for reliable delivery
- Configurable message batching with control over max delay, message count, and byte limits
- Message ordering support via ordering keys for strict in-order delivery
- Flow control settings to manage outstanding message count and byte limits on the subscriber
- Configurable retry policies with exponential backoff for publish operations
- GCP service account authentication via JSON key file

## Actions

Actions are operations you invoke from your integration to publish messages to Google Cloud Pub/Sub topics. The connector exposes a single Publisher client for sending messages:

| Client | Actions |
|--------|---------|
| `Publisher` | Publish messages to topics, message batching, ordered delivery |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Triggers

Triggers allow your integration to react to messages arriving on Google Cloud Pub/Sub subscriptions in real time. The connector uses streaming pull to deliver messages to a `pubsub:Listener`, which invokes your service's `onMessage` callback automatically; no manual polling required.

Supported trigger events:

| Event | Callback | Description |
|-------|----------|-------------|
| Message received | `onMessage` | Fired when a new message is received from the subscription. |

See the **[Trigger Reference](triggers.md)** for listener configuration, service callbacks, and the `EventData` payload structure.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating a Google Cloud project, enabling the Pub/Sub API, and generating a service account key to authenticate the connector.

* **[Action Reference](actions.md)**: Full reference for the client: operations, parameters, return types, and sample code.

* **[Trigger Reference](triggers.md)**: Reference for event-driven integration using the listener and service model.

* **[Example](example.md)**: Learn how to build and configure an integration using the **Google Cloud Pub/Sub** connector, including connection setup, operation configuration, execution flow, and event-driven trigger setup.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Google Cloud Pub/Sub Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-gcloud.pubsub)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
