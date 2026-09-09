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
3. BotFather replies with a bot token (for example, `123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11`). Use this as `accessToken` in `telegram:ConnectionConfig` or as the listener's `accessToken`.

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
2. Start the listener with the bot's access token and the callback URL. It registers its own webhook automatically:

   ```ballerina
   listener telegram:Listener telegramListener = new (8090, accessToken = "my-bot-access-token", callbackUrl = "https://my-app.example.com/");
   ```

By default, `allowed_updates` is set to exactly the nine update types the listener supports, so Telegram filters out anything else before it reaches your webhook.

If you'd rather register the webhook yourself, omit `callbackUrl` and call `Client->setWebhook` explicitly instead:

```ballerina
listener telegram:Listener telegramListener = new (8090, accessToken = "my-bot-access-token");

telegram:Client telegramClient = check new ({accessToken: "my-bot-access-token"});
_ = check telegramClient->setWebhook("https://my-app.example.com/");
```

Both sides independently derive the same secret token from `accessToken` via `deriveSecretToken`, so they agree automatically as long as both use the same access token. The webhook secret is no longer something you set directly on the listener. To override the secret token used for `setWebhook` only, pass `secret_token` explicitly. Use any string matching `[A-Za-z0-9_-]{1,256}`. If it doesn't match what the listener derives from its own `accessToken`, every update is rejected with `401`.

To stop receiving updates, call `Client->deleteWebhook()`. To check what's currently registered, call `Client->getWebhookInfo()`.

## Next steps

- [Action Reference](actions.md): send messages and manage chats using the `Client`.
- [Trigger Reference](triggers.md): handle webhook updates using the `Listener` and `TelegramService`.
