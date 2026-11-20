---
title: "Overview"
description: "Reference for the Aayu MFT Gateway AS2 webhook listener and service callbacks: receive AS2 message received, sent, failed and incomplete events in Ballerina integrations."
keywords: [aayu, mft gateway, as2, webhook listener, event handler, ballerina]
---

# Overview

Aayu MFT Gateway is a managed file transfer service for exchanging business documents with trading partners over AS2. The `ballerinax/aayu.mftg.as2.trigger` package lets an integration react to AS2 traffic as it happens: it provides a webhook listener that verifies each delivery and calls your service callbacks when AS2 messages are received, sent, fail or stay unconfirmed.

## Key features

- Receives the four MFT Gateway AS2 events: message received, sent, send failed and send incomplete
- Verifies every delivery with the webhook public key from MFT Gateway (RSA with SHA-256)
- Typed payload records matching MFT Gateway's AS2 payloads
- Acknowledges each delivery before running your handler, so a slow handler doesn't cause retries

## Triggers

Triggers allow your integration to react to Aayu MFT Gateway activity in real time. The `ballerinax/aayu.mftg.as2.trigger` package provides a webhook listener that verifies each delivery from Aayu MFT Gateway with the webhook public key and calls your service callbacks. It covers 4 events through 4 service types.

Service types:

| Service type | Callbacks |
|--------------|-----------|
| `ReceivedMessageService` | `onMessageReceivedSuccess` |
| `SentMessageService` | `onMessageSendSuccess` |
| `FailedMessageService` | `onMessageSendFailed` |
| `IncompleteMessageService` | `onMessageSendIncomplete` |

See the **[Trigger Reference](triggers.md)** for listener configuration, every service type and callback, and the event payload structure, and the [Aayu MFT Gateway](product://integrator/develop-and-test/integration-artifacts/event-driven-integration/aayu-mft-gateway) guide to build an Aayu MFT Gateway event integration in WSO2 Integrator.

## Documentation

* **[Setup Guide](setup-guide.md)**: Set up Aayu MFT Gateway to send webhook events to your integration.

* **[Trigger Reference](triggers.md)**: Listener configuration, every service type and callback, and the event payload types.

* **[Example](example.md)**: Build an Aayu MFT Gateway event integration in WSO2 Integrator.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this package, please create a pull request in the following repository.

* [Aayu MFT Gateway Trigger GitHub repository](https://github.com/ballerina-platform/module-ballerinax-aayu.mftg.as2.trigger)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.

## What's next

- [Setup Guide](setup-guide.md): point Aayu MFT Gateway at your listener
- [Trigger Reference](triggers.md): every service type, callback and payload type
- [Example](example.md): build an Aayu MFT Gateway event integration in WSO2 Integrator
