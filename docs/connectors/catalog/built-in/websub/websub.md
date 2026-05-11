---
title: WebSub
---

WebSub is a W3C-recommended publish-subscribe protocol built on HTTP that enables real-time content delivery through webhooks. The Ballerina `ballerina/websub` connector (v2.15.0) provides subscriber-side functionality for discovering hubs, managing subscriptions, and receiving content distribution events, enabling you to build event-driven integrations that react to content updates in real time.

## Key features

- WebSub hub and topic discovery from resource URLs via HTTP Link headers
- Subscription and unsubscription management through a dedicated SubscriptionClient
- Built-in WebSub subscriber listener that handles intent verification and content distribution automatically
- Support for authenticated content distribution using HMAC-based signature verification
- Flexible content handling for JSON, XML, text, binary, and form-urlencoded payloads
- Configurable subscription lease periods and automatic unsubscription on shutdown
- Annotation-based service configuration with support for custom subscription parameters and headers

## Actions

Actions are operations you invoke from your integration to interact with WebSub hubs: discovering hub and topic URLs, subscribing to topics, and unsubscribing from topics. The WebSub connector exposes actions through two clients:

| Client | Actions |
|--------|---------|
| `Subscription Client` | Subscribe to and unsubscribe from WebSub hub topics |
| `Discovery Service` | Discover hub and topic URLs from a resource URL via HTTP Link headers |

See the **[Action Reference](action-reference.md)** for the full list of operations, parameters, and sample code for each client.

## Triggers

Triggers allow your integration to react to content updates published through WebSub hubs. The `websub:Listener` acts as a WebSub subscriber endpoint that handles hub intent verification automatically and delivers content distribution events to your service callbacks.

Supported trigger events:

| Event | Callback | Description |
|-------|----------|-------------|
| Subscription validation denied | `onSubscriptionValidationDenied` | Fired when the hub denies a subscription request. |
| Subscription verification | `onSubscriptionVerification` | Fired when the hub sends a subscription intent verification challenge. |
| Unsubscription verification | `onUnsubscriptionVerification` | Fired when the hub sends an unsubscription intent verification challenge. |
| Event notification | `onEventNotification` | Fired when the hub distributes new content to the subscriber. |

See the **[Trigger Reference](trigger-reference.md)** for listener configuration, service callbacks, and the event payload structure.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through setting up a WebSub hub subscription so that the Ballerina WebSub connector can receive content distribution events.

* **[Action Reference](action-reference.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Trigger Reference](trigger-reference.md)**: Reference for event-driven integration using the listener and service model.

* **[Example](example.md)**: Learn how to build and configure an integration using the **WebSub** connector, including connection setup, operation configuration, execution flow, and event-driven trigger setup.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [WebSub Connector GitHub repository](https://github.com/ballerina-platform/module-ballerina-websub)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
