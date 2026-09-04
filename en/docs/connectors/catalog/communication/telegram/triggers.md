---
title: Triggers
description: "Reference for the Telegram webhook listener and service callbacks: configure message, callback query, and other update handlers in Ballerina integrations."
keywords: [telegram, webhook listener, telegram bot api, event handler, ballerina]
connector: true
connector_name: "telegram"
---

# Triggers

The `ballerinax/telegram` package supports event-driven integration through Telegram Bot API webhooks. When a message, callback query, or other supported update arrives, the listener receives the webhook request and dispatches it to the matching service callback automatically.

Three components work together:

| Component | Role |
|-----------|------|
| `telegram:Listener` | Wraps an `http:Listener`, authenticates each update against a secret token (`X-Telegram-Bot-Api-Secret-Token`), and dispatches updates to an attached `TelegramService`. |
| `telegram:TelegramService` | Defines the update-type callbacks, such as `onMessage`, `onCallbackQuery`, and `onInlineQuery`. |
| `telegram:Message` | The most commonly used event payload, passed to `onMessage`, `onEditedMessage`, `onChannelPost`, and `onEditedChannelPost`. |

For action-based operations, see the [Action Reference](actions.md).

## Error handling

Each service callback returns `error?`. If a callback returns an error, the listener logs the failure and continues processing subsequent updates.

## Listener

The `telegram:Listener` receives webhook requests from Telegram and routes updates to the attached service. Passing `publicUrl` alongside `token` registers this listener's webhook automatically when it starts. No separate `Client->setWebhook` call is needed.

### Configuration

| Config Type | Description |
|-------------|-------------|
| `int\|http:Listener` | A port number to bind a new `http:Listener` to, or an existing `http:Listener`. |
| `ListenerConfig` | Requires either `secretToken` or `token`. |

`telegram:ListenerConfig` fields:

| Field | Type | Default | Description |
|---|---|---|---|
| `secretToken` | `string?` | `()` | The secret token to authenticate inbound updates against, used directly. |
| `token` | `string?` | `()` | The bot token to derive the secret token from; also required with `publicUrl` for auto-registration. |
| `publicUrl` | `string?` | `()` | This listener's public HTTPS URL, used to auto-register the webhook when set with `token`. |
| `serviceUrl` | `string` | `https://api.telegram.org` | The Telegram Bot API base URL; override only for tests or a proxy. |

### Initializing the listener

**Listener that auto-registers its webhook:**

```ballerina
import ballerinax/telegram;

configurable string botToken = ?;
configurable string publicUrl = ?;

listener telegram:Listener telegramListener = new (8090, token = botToken, publicUrl = publicUrl);
```

**Listener with a caller-managed secret token:**

```ballerina
import ballerinax/telegram;

configurable string secretToken = ?;

listener telegram:Listener telegramListener = new (8090, secretToken = secretToken);
```

## Service

A Telegram trigger service is a Ballerina service attached to a `telegram:Listener`, implementing `telegram:TelegramService`. All nine handlers are optional. Declare only the ones you need.

### Callback signatures

| Callback | Signature | Description |
|----------|-----------|-------------|
| `onMessage` | `remote function onMessage(telegram:Message message) returns error?` | Invoked on a new incoming message. |
| `onEditedMessage` | `remote function onEditedMessage(telegram:Message editedMessage) returns error?` | Invoked when an existing message is edited. |
| `onChannelPost` | `remote function onChannelPost(telegram:Message channelPost) returns error?` | Invoked on a new channel post. |
| `onEditedChannelPost` | `remote function onEditedChannelPost(telegram:Message editedChannelPost) returns error?` | Invoked when an existing channel post is edited. |
| `onCallbackQuery` | `remote function onCallbackQuery(telegram:CallbackQuery callbackQuery) returns error?` | Invoked when a user presses an inline keyboard button. |
| `onInlineQuery` | `remote function onInlineQuery(telegram:InlineQuery inlineQuery) returns error?` | Invoked when a user sends a new inline query. |
| `onPoll` | `remote function onPoll(telegram:Poll poll) returns error?` | Invoked when a poll's state changes. |
| `onPreCheckoutQuery` | `remote function onPreCheckoutQuery(telegram:PreCheckoutQuery preCheckoutQuery) returns error?` | Invoked when a user confirms a payment, just before it's charged. |
| `onShippingQuery` | `remote function onShippingQuery(telegram:ShippingQuery shippingQuery) returns error?` | Invoked when a user provides a shipping address for an invoice with flexible pricing. |

:::note
Declaring a handler under any other name, with the wrong parameter type, or without the `remote` qualifier is a compile error, caught by this connector's compiler plugin.
:::

### Full usage example

```ballerina
import ballerina/log;
import ballerinax/telegram;

configurable string botToken = ?;
configurable string publicUrl = ?;

listener telegram:Listener telegramListener = new (8090, token = botToken, publicUrl = publicUrl);

service telegram:TelegramService on telegramListener {

    remote function onMessage(telegram:Message message) returns error? {
        log:printInfo("Message received", chatId = message.chat.id, text = message.text);
    }

    remote function onCallbackQuery(telegram:CallbackQuery callbackQuery) returns error? {
        log:printInfo("Callback query received", queryId = callbackQuery.id, data = callbackQuery.data);
    }
}
```

## Event payload types

### `Message`

The most common event payload, passed to `onMessage`, `onEditedMessage`, `onChannelPost`, and `onEditedChannelPost`.

| Field | Type | Description |
|-------|------|-------------|
| `message_id` | `int` | The unique message identifier inside the chat. |
| `date` | `int` | The Unix timestamp the message was sent. |
| `chat` | `Chat` | The chat the message belongs to. |
| `from` | `User?` | The message sender, if present. |
| `text` | `string?` | The message text, for text messages. |
| `reply_to_message` | `Message?` | The message this one replies to, if any. |
| `photo` | `PhotoSize[]?` | Available photo sizes, if the message contains a photo. |
| `document` | `Document?` | The attached document, if present. |
| `location` | `Location?` | The attached location, if present. |

### `Chat`

| Field | Type | Description |
|-------|------|-------------|
| `id` | `int` | The unique chat identifier. |
| `type` | `string` | The chat type: `private`, `group`, `supergroup`, or `channel`. |
| `title` | `string?` | The title, for groups, supergroups, and channels. |
| `username` | `string?` | The username, if available. |

### `CallbackQuery`

Passed to `onCallbackQuery` when a user presses an inline keyboard button.

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | The unique query identifier, passed to `answerCallbackQuery`. |
| `from` | `User` | The user who pressed the button. |
| `message` | `Message?` | The message the button is attached to, if available. |
| `chat_instance` | `string` | An identifier for the chat, used for tracking purposes. |
| `data` | `string?` | The callback data associated with the button, if any. |

### `InlineQuery`

Passed to `onInlineQuery` when a user types `@yourbot` in a chat.

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | The unique query identifier, passed to `answerInlineQuery`. |
| `from` | `User` | The user who sent the query. |
| `query` | `string` | The query text. |
| `offset` | `string` | The pagination offset for the results. |

## What's next

- [Action Reference](actions.md): send messages and manage chats using the `Client`.
- [Example](example.md): complete example integrations for the Telegram connector and trigger.
- [Setup Guide](setup-guide.md): create a bot and configure the webhook.
