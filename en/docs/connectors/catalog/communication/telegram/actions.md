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
| `accessToken` | <code>string</code> | Required | The bot access token issued by @BotFather; embedded in every request's resource path. |
| `httpVersion` | <code>http:HttpVersion</code> | <code>http:HTTP_2_0</code> | The HTTP version understood by the client. |
| `timeout` | <code>decimal</code> | <code>30</code> | The maximum time to wait (in seconds) for a response. |
| `forwarded` | <code>string</code> | <code>"disable"</code> | The choice of setting `forwarded`/`x-forwarded` header. |
| `poolConfig` | <code>http:PoolConfiguration</code> | <code>()</code> | Configurations associated with request pooling. |
| `cache` | <code>http:CacheConfig</code> | <code>{}</code> | HTTP caching-related configurations. |

### Initializing the client

```ballerina
import ballerinax/telegram;

configurable string accessToken = ?;

telegram:Client telegramClient = check new ({accessToken});
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

<details>
<summary>sendVideo</summary>

Sends a video by URL or as uploaded bytes.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `chatId` | <code>int&#124;string</code> | Yes | The numeric chat ID, or an `@username` for channels. |
| `video` | <code>string&#124;byte[]</code> | Yes | A video URL, `file_id`, or raw bytes to upload. |
| `options` | `SendVideoOptions` | No | Optional fields such as `duration`, `width`, `height`, and `caption`. |

Returns: `Message|Error`

Sample code:

```ballerina
telegram:Message sent = check telegramClient->sendVideo(chatId, "https://example.com/video.mp4");
```

</details>

<details>
<summary>sendAudio</summary>

Sends an audio file.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `chatId` | <code>int&#124;string</code> | Yes | The numeric chat ID, or an `@username` for channels. |
| `audio` | <code>string&#124;byte[]</code> | Yes | An audio URL, `file_id`, or raw bytes to upload. |
| `options` | `SendAudioOptions` | No | Optional fields such as `duration`, `performer`, and `title`. |

Returns: `Message|Error`

Sample code:

```ballerina
telegram:Message sent = check telegramClient->sendAudio(chatId, "https://example.com/audio.mp3");
```

</details>

<details>
<summary>sendDocument</summary>

Sends a general file.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `chatId` | <code>int&#124;string</code> | Yes | The numeric chat ID, or an `@username` for channels. |
| `document` | <code>string&#124;byte[]</code> | Yes | A document URL, `file_id`, or raw bytes to upload. |
| `options` | `SendDocumentOptions` | No | Optional fields such as `caption` and `disable_content_type_detection`. |

Returns: `Message|Error`

Sample code:

```ballerina
telegram:Message sent = check telegramClient->sendDocument(chatId, "https://example.com/report.pdf");
```

</details>

<details>
<summary>sendAnimation</summary>

Sends an animation (GIF or soundless MP4).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `chatId` | <code>int&#124;string</code> | Yes | The numeric chat ID, or an `@username` for channels. |
| `animation` | <code>string&#124;byte[]</code> | Yes | An animation URL, `file_id`, or raw bytes to upload. |
| `options` | `SendAnimationOptions` | No | Optional fields such as `duration`, `width`, `height`, and `caption`. |

Returns: `Message|Error`

Sample code:

```ballerina
telegram:Message sent = check telegramClient->sendAnimation(chatId, "https://example.com/clip.gif");
```

</details>

<details>
<summary>sendSticker</summary>

Sends a sticker. Telegram stickers have no caption.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `chatId` | <code>int&#124;string</code> | Yes | The numeric chat ID, or an `@username` for channels. |
| `sticker` | <code>string&#124;byte[]</code> | Yes | A sticker URL, `file_id`, or raw bytes to upload. |
| `options` | `SendStickerOptions` | No | Optional fields such as `emoji` (uploads only). |

Returns: `Message|Error`

Sample code:

```ballerina
telegram:Message sent = check telegramClient->sendSticker(chatId, stickerFileId);
```

</details>

<details>
<summary>sendLocation</summary>

Sends a point on the map.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `chatId` | <code>int&#124;string</code> | Yes | The numeric chat ID, or an `@username` for channels. |
| `latitude` | `decimal` | Yes | The location's latitude. |
| `longitude` | `decimal` | Yes | The location's longitude. |
| `options` | `SendLocationOptions` | No | Optional fields such as `live_period` and `heading`, for live locations. |

Returns: `Message|Error`

Sample code:

```ballerina
telegram:Message sent = check telegramClient->sendLocation(chatId, 37.7749, -122.4194);
```

</details>

<details>
<summary>sendMediaGroup</summary>

Sends a group of photos, videos, documents, or audio files as an album.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `chatId` | <code>int&#124;string</code> | Yes | The numeric chat ID, or an `@username` for channels. |
| `media` | `InputMedia[]` | Yes | The media items to send, 2-10 items; `file_id`/URL strings only (raw-byte uploads via Telegram's `attach://` convention are not yet supported). |
| `options` | `SendMediaGroupOptions` | No | Optional fields such as `disable_notification`. |

Returns: `Message[]|Error`

Sample code:

```ballerina
telegram:Message[] sent = check telegramClient->sendMediaGroup(chatId, [
    {'type: "photo", media: "https://example.com/one.jpg"},
    {'type: "photo", media: "https://example.com/two.jpg"}
]);
```

</details>

<details>
<summary>sendChatAction</summary>

Shows a short-lived chat action indicator (for example, "typing...") to chat members.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `chatId` | <code>int&#124;string</code> | Yes | The numeric chat ID, or an `@username` for channels. |
| `action` | `ChatAction` | Yes | The action to show; expires after ~5 seconds, or on the next sent message. |

Returns: `Error?`

Sample code:

```ballerina
_ = check telegramClient->sendChatAction(chatId, "typing");
```

</details>

<details>
<summary>sendMessageDraft</summary>

Streams a partial message to the same message bubble, identified by `draftId`. Successive calls with the same `draftId` update the same message bubble. The draft is an ephemeral, 30-second preview; call `sendMessage` with the complete text to persist it in the chat. Introduced in Bot API 9.3.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `chatId` | <code>int&#124;string</code> | Yes | The numeric ID of a private chat (as an `int`). Drafts are supported only in private chats, not groups, supergroups, or channels, and Telegram rejects an `@username` string here. |
| `draftId` | `int` | Yes | A non-zero ID; successive calls with the same ID update the same message bubble. |
| `options` | `SendMessageDraftOptions` | No | Optional fields such as `text` and `parse_mode`. |

Returns: `Message|Error`

Sample code:

```ballerina
telegram:Message draft = check telegramClient->sendMessageDraft(chatId, draftId, text = "Thinking...");
```

</details>

<details>
<summary>sendRichMessage</summary>

Sends a message with structured rich-text formatting, authored in Markdown or HTML. Introduced in Bot API 10.1.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `chatId` | <code>int&#124;string</code> | Yes | The numeric chat ID, or an `@username` for channels. |
| `richMessage` | `RichMessage` | Yes | The rich message content: `{markdown: string}` or `{html: string}`. |
| `options` | `SendRichMessageOptions` | No | Optional fields such as `disable_notification` and `reply_markup`. |

Returns: `Message|Error`

Sample code:

```ballerina
telegram:Message sent = check telegramClient->sendRichMessage(chatId, {markdown: "**Bold** and _italic_ text"});
```

</details>

<details>
<summary>sendRichMessageDraft</summary>

Streams a partial rich message to the same message bubble, identified by `draftId`. The draft is an ephemeral, 30-second preview; call `sendRichMessage` with the complete content to persist it in the chat. Introduced in Bot API 10.1.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `chatId` | <code>int&#124;string</code> | Yes | The numeric ID of a private chat (as an `int`). Drafts are supported only in private chats, not groups, supergroups, or channels, and Telegram rejects an `@username` string here. |
| `draftId` | `int` | Yes | A non-zero ID; successive calls with the same ID update the same message bubble. |
| `richMessage` | `RichMessage` | Yes | The rich message content: `{markdown: string}` or `{html: string}`. |
| `messageThreadId` | `int?` | No | The forum topic to post the draft in, if any. |

Returns: `Message|Error`

Sample code:

```ballerina
telegram:Message draft = check telegramClient->sendRichMessageDraft(chatId, draftId, {markdown: "Thinking..."});
```

</details>

<details>
<summary>sendApprovalMessage</summary>

Sends a prompt with approve/decline inline-keyboard buttons. A client-side convenience wrapper around `sendMessage`; observe which button was pressed via the `Listener`'s `onCallbackQuery` handler, matching on `approve.callback_data`/`decline.callback_data`.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `chatId` | <code>int&#124;string</code> | Yes | The numeric chat ID, or an `@username` for channels. |
| `text` | `string` | Yes | The prompt text. |
| `approve` | `ApprovalButton` | Yes | The approve button's label and `callback_data`. |
| `decline` | `ApprovalButton?` | No | The decline button's label and `callback_data`, if a decline option is wanted. |
| `options` | `ApprovalMessageOptions` | No | Optional fields such as `disable_notification`. |

Returns: `Message|Error`

Sample code:

```ballerina
telegram:Message sent = check telegramClient->sendApprovalMessage(chatId, "Approve this request?",
    {text: "Approve", callback_data: "approve:123"}, {text: "Decline", callback_data: "decline:123"});
```

</details>

#### Message management

<details>
<summary>deleteMessage</summary>

Deletes a message.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `chatId` | <code>int&#124;string</code> | Yes | The numeric chat ID, or an `@username` for channels. |
| `messageId` | `int` | Yes | The message's ID. |

Returns: `Error?`

Sample code:

```ballerina
_ = check telegramClient->deleteMessage(chatId, messageId);
```

</details>

<details>
<summary>editMessageText</summary>

Edits a text message the bot previously sent, or the text of an inline message.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `text` | `string` | Yes | The new message text. |
| `chatId` | <code>int&#124;string?</code> | No | The target chat's ID or `@username`; required together with `messageId`. |
| `messageId` | `int?` | No | The message's ID; required together with `chatId`. |
| `inlineMessageId` | `string?` | No | An inline message's ID; mutually exclusive with `chatId`/`messageId`. |
| `options` | `EditMessageTextOptions` | No | Optional fields such as `parse_mode` and `reply_markup`. |

Returns: `Message|Error?`

Sample code:

```ballerina
telegram:Message|() edited = check telegramClient->editMessageText("Updated text", chatId, messageId);
```

</details>

<details>
<summary>pinChatMessage</summary>

Pins a message in a chat.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `chatId` | <code>int&#124;string</code> | Yes | The numeric chat ID, or an `@username` for channels. |
| `messageId` | `int` | Yes | The message's ID. |
| `disableNotification` | `boolean` | No | Whether to pin silently, without notifying chat members. Defaults to `false`. |

Returns: `Error?`

Sample code:

```ballerina
_ = check telegramClient->pinChatMessage(chatId, messageId);
```

</details>

<details>
<summary>unpinChatMessage</summary>

Unpins a message in a chat.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `chatId` | <code>int&#124;string</code> | Yes | The numeric chat ID, or an `@username` for channels. |
| `messageId` | `int?` | No | The pinned message's ID; unpins the most recent pinned message if omitted. |

Returns: `Error?`

Sample code:

```ballerina
_ = check telegramClient->unpinChatMessage(chatId);
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

<details>
<summary>getChatMember</summary>

Gets information about one member of a chat.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `chatId` | <code>int&#124;string</code> | Yes | The numeric chat ID, or an `@username` for channels. |
| `userId` | `int` | Yes | The target user's ID. |

Returns: `ChatMember|Error`

Sample code:

```ballerina
telegram:ChatMember member = check telegramClient->getChatMember(chatId, userId);
```

</details>

<details>
<summary>leaveChat</summary>

Makes the bot leave a chat.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `chatId` | <code>int&#124;string</code> | Yes | The numeric chat ID, or an `@username` for channels. |

Returns: `Error?`

Sample code:

```ballerina
_ = check telegramClient->leaveChat(chatId);
```

</details>

<details>
<summary>setChatDescription</summary>

Sets a group, supergroup, or channel's description.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `chatId` | <code>int&#124;string</code> | Yes | The numeric chat ID, or an `@username` for channels. |
| `description` | `string` | Yes | The new description, 0-255 characters. |

Returns: `Error?`

Sample code:

```ballerina
_ = check telegramClient->setChatDescription(chatId, "Support channel for Acme customers");
```

</details>

<details>
<summary>setChatTitle</summary>

Sets a chat's title.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `chatId` | <code>int&#124;string</code> | Yes | The numeric chat ID, or an `@username` for channels. |
| `title` | `string` | Yes | The new title, 1-128 characters. |

Returns: `Error?`

Sample code:

```ballerina
_ = check telegramClient->setChatTitle(chatId, "Acme Support");
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

## What's next

- [Trigger Reference](triggers.md): react to messages and queries using the webhook listener.
- [Example](example.md): complete example integrations for the Telegram connector and trigger.
- [Setup Guide](setup-guide.md): create a bot and obtain a token.
