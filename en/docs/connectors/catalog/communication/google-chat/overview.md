---
title: "Google Chat Connector Overview"
description: "Overview of the Ballerina Google Chat connector: send and manage messages, and handle Google Chat interaction events."
keywords: [google chat, google workspace, webhook, ballerina connector]
connector: true
connector_name: "googleapis.chat"
---

# Overview

[Google Chat](https://workspace.google.com/products/chat/) is a communication platform from Google, designed for teams and businesses as part of Google Workspace. The Ballerina `ballerinax/googleapis.chat` connector provides both a REST client for the Google Chat API and a webhook listener that receives Google Chat interaction events directly over HTTP.

The listener runs as a plain HTTPS endpoint that Google Chat posts events to directly. There's no separate webhook relay. It supports three authentication mechanisms: service account (recommended for bots), OAuth 2.0 (for user-scoped actions), and short-lived bearer tokens (for quick tests).

## Key features

- Create spaces, send messages, manage memberships, and upload attachments via the REST client
- Receive Chat interaction events (messages, slash commands, card clicks, dialog submissions, app-home opens) over a webhook listener
- Reply synchronously within the event window using event-specific callers
- Google-signed bearer token verification, validated against your HTTP endpoint URL or GCP project number

## Actions

Actions are operations you invoke on the Google Chat API from your integration: listing spaces, sending messages, and downloading media. The connector exposes actions through a single client:

| Client | Actions |
|--------|---------|
| `Client` | Space and message management, media download |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code. Most send/respond/update/delete operations used inside event handlers go through the per-event callers documented in the [Trigger Reference](triggers.md) instead.

## Triggers

Triggers allow your integration to react to Google Chat interaction events in real time. The connector's listener receives events directly from Google Chat and invokes your service callbacks automatically.

Supported trigger events (`chat:ChatService` callbacks):

| Callback | Description |
|----------|-------------|
| `onMessage` | A user sends a message, @mentions the app, or invokes a slash command. |
| `onAddedToSpace` | The app is added to a space. |
| `onRemovedFromSpace` | The app is removed from a space. |
| `onCardClicked` | A user clicks a button or interactive element on a card. |
| `onWidgetUpdated` | A widget requests an autocomplete or similar update. |
| `onAppCommand` | A user invokes a Chat app command. |
| `onAppHome` | A user opens the app's home page. |
| `onSubmitForm` | A user submits a dialog or form. |

See the **[Trigger Reference](triggers.md)** for listener configuration, service callbacks, and the event payload structure.

## Documentation

* **[Setup Guide](setup-guide.md)**: Create a GCP project, enable the Google Chat API, and configure your Chat app.
* **[Action Reference](actions.md)**: Full reference for the client: operations, parameters, return types, and sample code.
* **[Trigger Reference](triggers.md)**: Reference for event-driven integration using the webhook listener and service model.
* **[Example](example.md)**: Learn how to build and configure an integration using the **Google Chat** connector, including event-driven trigger setup.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Google Chat Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-googleapis.chat)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
