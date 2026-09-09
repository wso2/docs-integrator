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
| `telegram:Listener` | Wraps an `http:Listener`, authenticates each update against a secret token (`X-Telegram-Bot-Api-Secret-Token`) derived internally from `accessToken`, and dispatches updates to an attached `TelegramService`. |
| `telegram:TelegramService` | Defines the update-type callbacks, such as `onMessage`, `onCallbackQuery`, and `onInlineQuery`. |
| `telegram:Message` | The most commonly used event payload, passed to `onMessage`, `onEditedMessage`, `onChannelPost`, and `onEditedChannelPost`. |
| `telegram:Caller` | Provided to a handler's optional second parameter for manual acknowledgement when `autoAck` is `false`. |

For action-based operations, see the [Action Reference](actions.md).

## Error handling

Each service callback returns `error?`. If a callback returns an error, the listener logs the failure and continues processing subsequent updates.

## Listener

The `telegram:Listener` receives webhook requests from Telegram and routes updates to the attached service. Passing `callbackUrl` alongside `accessToken` registers this listener's webhook automatically when it starts. No separate `Client->setWebhook` call is needed.

### Configuration

| Config Type | Description |
|-------------|-------------|
| `int\|http:Listener` | A port number to bind a new `http:Listener` to, or an existing `http:Listener`. |
| `ListenerConfig` | Requires `accessToken`. |

`telegram:ListenerConfig` fields:

| Field | Type | Default | Description |
|---|---|---|---|
| `accessToken` | `string` | Required | The bot access token issued by @BotFather. Used both to derive the webhook secret token and, together with `callbackUrl`, to auto-register the webhook. |
| `callbackUrl` | `string?` | `()` | This listener's public HTTPS URL, used to auto-register the webhook when set. |
| `serviceUrl` | `string` | `https://api.telegram.org` | The Telegram Bot API base URL; override only for a self-hosted Bot API server, tests, or a proxy. |

### Initializing the listener

**Listener that auto-registers its webhook:**

```ballerina
import ballerinax/telegram;

configurable string botAccessToken = ?;
configurable string callbackUrl = ?;

listener telegram:Listener telegramListener = new (8090, accessToken = botAccessToken, callbackUrl = callbackUrl);
```

## Service

A Telegram trigger service is a Ballerina service attached to a `telegram:Listener`, implementing `telegram:TelegramService`. All nine handlers are optional. Declare only the ones you need.

By default, the listener acknowledges (`200 OK`) each update automatically, before any handler runs. Telegram requires a fast `2xx` and retries otherwise, so this is the safe default for slow handlers. Annotate the service `@telegram:ServiceConfig {autoAck: false}` to take control of this yourself: declare a handler's optional second parameter as a `telegram:Caller` and call `caller->complete()` when ready. See [Manual acknowledgement](#manual-acknowledgement).

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
Declaring a handler under any other name, with the wrong parameter type, or without the `remote` qualifier is a compile error, caught by this connector's compiler plugin. Every handler may optionally declare a second parameter typed `telegram:Caller`, for manual acknowledgement.
:::

### Full usage example

```ballerina
import ballerina/log;
import ballerinax/telegram;

configurable string botAccessToken = ?;
configurable string callbackUrl = ?;

listener telegram:Listener telegramListener = new (8090, accessToken = botAccessToken, callbackUrl = callbackUrl);

service telegram:TelegramService on telegramListener {

    remote function onMessage(telegram:Message message) returns error? {
        log:printInfo("Message received", chatId = message.chat.id, text = message.text);
    }

    remote function onCallbackQuery(telegram:CallbackQuery callbackQuery) returns error? {
        log:printInfo("Callback query received", queryId = callbackQuery.id, data = callbackQuery.data);
    }
}
```

### Manual acknowledgement

```ballerina
import ballerina/log;
import ballerinax/telegram;

configurable string botAccessToken = ?;

listener telegram:Listener telegramListener = new (8090, accessToken = botAccessToken);

@telegram:ServiceConfig {
    autoAck: false
}
service telegram:TelegramService on telegramListener {

    remote function onMessage(telegram:Message message, telegram:Caller caller) returns error? {
        check persistMessage(message);
        check caller->complete();
    }
}
```

:::note
When `autoAck` is `true` (the default), the listener acknowledges the update automatically before dispatching it. Set `autoAck: false` and declare a `telegram:Caller` to acknowledge only after your own processing has durably succeeded. If a handler declared with a `Caller` never calls `caller->complete()`, the listener never sends its own `200 OK`; the underlying HTTP service falls back to a default `500`, a non-`2xx` that Telegram's own retry behavior treats the same as any other failed delivery.

Telegram may redeliver an update if the acknowledgement is slow, dropped, or never sent, under either `autoAck` setting, not just `false`. Make handler processing idempotent, or deduplicate using `update_id`, rather than assuming a webhook update is delivered exactly once.
:::

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

### `Caller`

Passed to a handler's optional second parameter for manual acknowledgement when the service is annotated `@telegram:ServiceConfig {autoAck: false}`.

| Method | Signature | Description |
|--------|-----------|-------------|
| `complete` | `remote isolated function complete() returns telegram:Error?` | Acknowledges (`200 OK`) the update. Idempotent: a no-op if already called. |

## What's next

- [Action Reference](actions.md): send messages and manage chats using the `Client`.
- [Example](example.md): complete example integrations for the Telegram connector and trigger.
- [Setup Guide](setup-guide.md): create a bot and configure the webhook.
