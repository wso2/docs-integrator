---
title: Setup Guide
description: "How to create a Telegram bot with BotFather and configure a webhook for the Telegram connector."
keywords: [telegram, botfather, webhook, bot token, secret token]
connector: true
connector_name: "telegram"
---

# Setup Guide

This guide walks you through creating a Telegram bot and obtaining the credentials required to use the Telegram connector.

## Prerequisites

- A Telegram account

## Create a bot and get a token

1. Open a chat with [@BotFather](https://t.me/BotFather) on Telegram.
2. Send `/newbot` and follow the prompts to choose a display name and a unique `@username` (must end in `bot`).
3. BotFather replies with a bot token (for example, `123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11`). Use this as `token` in `telegram:ConnectionConfig` or as the listener's `token`.

:::warning
Treat the token like a password: anyone who has it can control the bot. Regenerate it with BotFather's `/revoke` command if it leaks.
:::

Unlike most APIs, Telegram doesn't use a header or query parameter for authentication. The token is embedded directly in every request's URL path. The client and listener handle this automatically.

## Get a chat ID

Most `Client` operations need a `chatId`, the numeric ID of the chat, group, or channel to act on:

- **Private chat**: message your bot from your own account, then call `getUpdates` (`https://api.telegram.org/bot<token>/getUpdates`) and read `message.chat.id` from the response.
- **Group or supergroup**: add the bot to the group, send any message, then use the same `getUpdates` approach. Group chat IDs are negative numbers.
- **Channel**: add the bot as an administrator, then use the channel's `@username` (for example, `"@my_channel"`) directly as `chatId` instead of a numeric ID.

## Configure a webhook

The `telegram:Listener` needs updates pushed to it. Telegram supports only one webhook URL per bot, and it must be reachable over HTTPS.

1. Expose the listener's port publicly (a tunneling tool such as `ngrok http 8090` is the usual approach during development).
2. Start the listener with the bot token and the public URL. It registers its own webhook automatically:

   ```ballerina
   listener telegram:Listener telegramListener = new (8090, token = "my-bot-token", publicUrl = "https://my-app.example.com/");
   ```

By default, `allowed_updates` is set to exactly the nine update types the listener supports, so Telegram filters out anything else before it reaches your webhook.

If you'd rather register the webhook yourself, omit `publicUrl` and call `Client->setWebhook` explicitly instead. Both the listener and the client must agree on the same secret token:

```ballerina
listener telegram:Listener telegramListener = new (8090, token = "my-bot-token");

telegram:Client telegramClient = check new ({token: "my-bot-token"});
_ = check telegramClient->setWebhook("https://my-app.example.com/");
```

Both sides independently derive the same secret token from the bot token, so they agree with no coordination. To manage the secret token yourself, pass `secretToken`/`secret_token` explicitly instead of `token` on **both** the listener and `setWebhook`. Use any string matching `[A-Za-z0-9_-]{1,256}`. If the two sides end up with different secret tokens, every update is rejected with `401`.

To stop receiving updates, call `Client->deleteWebhook()`. To check what's currently registered, call `Client->getWebhookInfo()`.

## Next steps

- [Action Reference](actions.md): send messages and manage chats using the `Client`.
- [Trigger Reference](triggers.md): handle webhook updates using the `Listener` and `TelegramService`.
