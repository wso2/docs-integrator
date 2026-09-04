---
title: Actions
description: "Full reference for the Telegram connector client operations: messaging, chat management, query answers, and webhook management."
keywords: [telegram, telegram bot api, sendMessage, answerCallbackQuery, setWebhook, ballerina connector]
connector: true
connector_name: "telegram"
toc_max_heading_level: 4
---

# Actions

The `ballerinax/telegram` package exposes the following client:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Messaging, chat management, callback/inline query answers, file metadata/download, and webhook management on the Telegram Bot API. |

## Client

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `token` | <code>string</code> | Required | The bot token issued by @BotFather; embedded in every request's resource path. |
| `httpVersion` | <code>http:HttpVersion</code> | <code>http:HTTP_2_0</code> | The HTTP version understood by the client. |
| `timeout` | <code>decimal</code> | <code>30</code> | The maximum time to wait (in seconds) for a response. |
| `forwarded` | <code>string</code> | <code>"disable"</code> | The choice of setting `forwarded`/`x-forwarded` header. |
| `poolConfig` | <code>http:PoolConfiguration</code> | <code>()</code> | Configurations associated with request pooling. |
| `cache` | <code>http:CacheConfig</code> | <code>{}</code> | HTTP caching-related configurations. |

### Initializing the client

```ballerina
import ballerinax/telegram;

configurable string token = ?;

telegram:Client telegramClient = check new ({token});
```

### Operations

#### Messaging

<details>
<summary>sendMessage</summary>

Sends a text message to a chat.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `chatId` | <code>int&#124;string</code> | Yes | The numeric chat ID, or an `@username` for channels. |
| `text` | `string` | Yes | The message text. |
| `options` | `SendMessageOptions` | No | Optional fields such as `parse_mode`, `reply_markup`, and `disable_notification`. |

Returns: `Message|Error`

Sample code:

```ballerina
telegram:Message sent = check telegramClient->sendMessage(chatId, "Hello from Ballerina!");
```

Sample response:

```json
{
    "message_id": 42,
    "date": 1735689600,
    "chat": {"id": 123456789, "type": "private"},
    "text": "Hello from Ballerina!"
}
```

</details>

<details>
<summary>sendPhoto</summary>

Sends a photo by URL or as uploaded bytes.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `chatId` | <code>int&#124;string</code> | Yes | The numeric chat ID, or an `@username` for channels. |
| `photo` | <code>string&#124;byte[]</code> | Yes | A photo URL, `file_id`, or raw bytes to upload. |
| `options` | `SendPhotoOptions` | No | Optional fields such as `caption`. |

Returns: `Message|Error`

Sample code:

```ballerina
telegram:Message photo = check telegramClient->sendPhoto(chatId, "https://example.com/photo.jpg");
```

</details>

#### Chat management

<details>
<summary>getChat</summary>

Gets up-to-date information about a chat.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `chatId` | <code>int&#124;string</code> | Yes | The numeric chat ID, or an `@username` for channels. |

Returns: `ChatFullInfo|Error`

Sample code:

```ballerina
telegram:ChatFullInfo chat = check telegramClient->getChat(chatId);
```

Sample response:

```json
{
    "id": 123456789,
    "type": "private",
    "first_name": "Jane"
}
```

</details>

<details>
<summary>getChatAdministrators</summary>

Gets the list of administrators of a chat.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `chatId` | <code>int&#124;string</code> | Yes | The numeric chat ID, or an `@username` for channels. |

Returns: `ChatMember[]|Error`

Sample code:

```ballerina
telegram:ChatMember[] admins = check telegramClient->getChatAdministrators(chatId);
```

</details>

#### Query answers

<details>
<summary>answerCallbackQuery</summary>

Answers a callback query raised by pressing an inline keyboard button.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `callbackQueryId` | `string` | Yes | The `id` of the `CallbackQuery` to answer. |
| `options` | `AnswerCallbackQueryOptions` | No | Optional fields such as `text` and `show_alert`. |

Returns: `Error?`

Sample code:

```ballerina
_ = check telegramClient->answerCallbackQuery(callbackQuery.id, text = "Got it!");
```

</details>

<details>
<summary>answerInlineQuery</summary>

Answers an inline query with a list of results.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `inlineQueryId` | `string` | Yes | The `id` of the `InlineQuery` to answer. |
| `results` | `InlineQueryResult[]` | Yes | The results to display to the user. |

Returns: `Error?`

Sample code:

```ballerina
_ = check telegramClient->answerInlineQuery(inlineQuery.id, results);
```

</details>

#### Files

<details>
<summary>getFile</summary>

Gets metadata, including the download path, for a file.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fileId` | `string` | Yes | The file identifier from a message attachment. |

Returns: `File|Error`

Sample code:

```ballerina
telegram:File file = check telegramClient->getFile(fileId);
```

</details>

<details>
<summary>downloadFile</summary>

Downloads a file's bytes given its file ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fileId` | `string` | Yes | The file identifier from a message attachment. |

Returns: `byte[]|Error`

Sample code:

```ballerina
byte[] fileBytes = check telegramClient->downloadFile(fileId);
```

</details>

#### Webhook management

<details>
<summary>setWebhook</summary>

Registers a webhook URL to receive updates.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `url` | `string` | Yes | The public HTTPS URL to deliver updates to. |
| `options` | `SetWebhookOptions` | No | Optional fields such as `secret_token`. |

Returns: `Error?`

Sample code:

```ballerina
_ = check telegramClient->setWebhook("https://my-app.example.com/", secret_token = secretToken);
```

</details>

<details>
<summary>deleteWebhook</summary>

Removes the currently registered webhook.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dropPendingUpdates` | `boolean` | No | Whether to discard updates that were queued while the webhook was set. Defaults to `false`. |

Returns: `Error?`

Sample code:

```ballerina
_ = check telegramClient->deleteWebhook();
```

</details>

<details>
<summary>getWebhookInfo</summary>

Gets information about the currently registered webhook, useful for debugging.

Returns: `WebhookInfo|Error`

Sample code:

```ballerina
telegram:WebhookInfo info = check telegramClient->getWebhookInfo();
```

Sample response:

```json
{
    "url": "https://my-app.example.com/",
    "has_custom_certificate": false,
    "pending_update_count": 0
}
```

</details>

:::note
The client also exposes operations for videos, documents, audio, animations, stickers, locations, media groups, message drafts, rich messages, and approval-flow helpers (`sendApprovalMessage`). See the [connector source](https://github.com/ballerina-platform/module-ballerinax-telegram/blob/main/ballerina/client.bal) for the complete list.
:::

## What's next

- [Trigger Reference](triggers.md): react to messages and queries using the webhook listener.
- [Example](example.md): complete example integrations for the Telegram connector and trigger.
- [Setup Guide](setup-guide.md): create a bot and obtain a token.
