---
title: "WhatsApp Business Connector Overview"
description: "Overview of the Ballerina WhatsApp Business connector: send messages and templates, manage media, and handle WhatsApp Business Cloud webhook events."
keywords: [whatsapp, whatsapp business, meta cloud api, webhook, ballerina connector]
connector: true
connector_name: "whatsapp.business"
---

# Overview

[WhatsApp Business Cloud API](https://developers.facebook.com/docs/whatsapp/cloud-api) is Meta's hosted API for sending and receiving WhatsApp messages, managing business phone numbers, and handling message templates. The Ballerina `ballerinax/whatsapp.business` connector provides both a client for calling the Cloud API and a webhook listener for all ten WhatsApp Business Cloud webhook event types.

## Key features

- Send text, media, location, and contact messages
- Send message templates
- Upload, retrieve, and delete media
- Receive inbound messages and outbound message status updates over a webhook listener
- React to account, template, and phone number lifecycle changes
- Built-in `X-Hub-Signature-256` (HMAC-SHA256) webhook signature verification

## Actions

Actions are operations you invoke on WhatsApp Business Cloud from your integration: sending messages and templates, and managing media. The connector exposes actions through a single client:

| Client | Actions |
|--------|---------|
| `Client` | Send text/template messages, upload media, download media, delete media |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code.

## Triggers

Triggers allow your integration to react to WhatsApp Business Cloud webhook events in real time. The connector provides a webhook listener that receives Meta's callbacks, including the subscription handshake, and invokes your service callbacks automatically.

Supported trigger events (`whatsapp:WhatsAppService` callbacks):

| Callback | Description |
|----------|-------------|
| `onMessages` | Inbound messages or outbound message status updates arrive. |
| `onAccountReviewUpdate` | A WhatsApp Business Account (WABA) review decision changes. |
| `onAccountUpdate` | An account-lifecycle or compliance change occurs. |
| `onBusinessCapabilityUpdate` | A WABA's messaging or phone-number capability limits change. |
| `onMessageTemplateQualityUpdate` | A message template's quality score changes. |
| `onMessageTemplateStatusUpdate` | A message template's status changes. |
| `onPhoneNumberNameUpdate` | A phone number's display-name review outcome is available. |
| `onPhoneNumberQualityUpdate` | A phone number's messaging throughput or quality tier changes. |
| `onSecurity` | A two-step-verification PIN change or reset request occurs. |
| `onTemplateCategoryUpdate` | A message template's category changes. |
| `onError` | Any handler above returned an error while being dispatched. |

See the **[Trigger Reference](triggers.md)** for listener configuration, service callbacks, and the event payload structure.

## Documentation

* **[Setup Guide](setup-guide.md)**: Create a Meta app, get messaging credentials, and configure webhooks.
* **[Action Reference](actions.md)**: Full reference for the client: operations, parameters, return types, and sample code.
* **[Trigger Reference](triggers.md)**: Reference for event-driven integration using the webhook listener and service model.
* **[Example](example.md)**: Learn how to build and configure an integration using the **WhatsApp Business** connector, including connection setup and event-driven trigger setup.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [WhatsApp Business Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-whatsapp.business)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
