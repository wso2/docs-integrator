---
title: "Telegram Connector Overview"
description: "Overview of the Ballerina Telegram connector: send messages, manage chats and files, and handle Telegram Bot API webhook updates."
keywords: [telegram, telegram bot, webhook, ballerina connector]
connector: true
connector_name: "telegram"
---

# Overview

The [Telegram Bot API](https://core.telegram.org/bots/api) lets bots send and receive messages, manage chats, and answer inline or callback queries over a simple HTTPS REST API. The Ballerina `ballerinax/telegram` connector provides both a client covering chat management, messaging, and file operations, and a webhook listener for the update types Telegram delivers.

## Key features

- Send text messages, photos, videos, documents, audio, animations, stickers, locations, and media groups
- Manage chats: get chat info, get or list administrators, leave a chat, update the chat title or description
- Answer callback and inline queries
- Retrieve file metadata and download files
- Register, remove, and inspect webhooks (`setWebhook`, `deleteWebhook`, `getWebhookInfo`)
- Receive the nine most common Telegram update types over a webhook listener
- Secret-token authentication of inbound webhook requests via `X-Telegram-Bot-Api-Secret-Token`

## Actions

Actions are operations you invoke on the Telegram Bot API from your integration: sending messages, managing chats, and answering queries. The connector exposes actions through a single client:

| Client | Actions |
|--------|---------|
| `Client` | Messaging, chat management, callback/inline query answers, file metadata/download, webhook management |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code.

## Triggers

Triggers allow your integration to react to Telegram Bot API updates in real time. The connector provides a webhook listener that receives Telegram's updates and invokes your service callbacks automatically.

Supported trigger events (`telegram:TelegramService` callbacks):

| Callback | Description |
|----------|-------------|
| `onMessage` | A new incoming message arrives. |
| `onEditedMessage` | An existing message is edited. |
| `onChannelPost` | A new channel post is published. |
| `onEditedChannelPost` | An existing channel post is edited. |
| `onCallbackQuery` | A user presses an inline keyboard button. |
| `onInlineQuery` | A user sends a new inline query. |
| `onPoll` | A poll's state changes. |
| `onPreCheckoutQuery` | A user confirms a payment, just before it's charged. |
| `onShippingQuery` | A user provides a shipping address for an invoice with flexible pricing. |

See the **[Trigger Reference](triggers.md)** for listener configuration, service callbacks, and the event payload structure.

## Documentation

* **[Setup Guide](setup-guide.md)**: Create a bot with BotFather and obtain a bot token.
* **[Action Reference](actions.md)**: Full reference for the client: operations, parameters, return types, and sample code.
* **[Trigger Reference](triggers.md)**: Reference for event-driven integration using the webhook listener and service model.
* **[Example](example.md)**: Learn how to build and configure an integration using the **Telegram** connector, including connection setup and event-driven trigger setup.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Telegram Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-telegram)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
