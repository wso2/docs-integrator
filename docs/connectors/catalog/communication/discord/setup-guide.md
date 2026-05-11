---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating a Discord application and obtaining the credentials required to use the Discord connector.

## Prerequisites

- A Discord account. If you do not have one, [sign up at discord.com](https://discord.com/register).
- A Discord server (guild) where you have admin permissions for testing.

## Step 1: Create a Discord application

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications).
2. Click **New Application** in the top-right corner.
3. Enter a name for your application (e.g., `Ballerina Integration`) and click **Create**.
4. On the **General Information** page, note down the **Application ID**; you will need this for application command endpoints.

## Step 2: Create a bot and get the bot token

1. In your application's settings, navigate to the **Bot** section in the left sidebar.
2. Click **Add Bot** and confirm by clicking **Yes, do it!**.
3. Under the **Token** section, click **Reset Token** to generate a new bot token.
4. Copy the token: this is your `Bot Token` used for authentication.

The bot token is shown only once. Store it securely and never commit it to source control. If compromised, reset it immediately in the Developer Portal.

## Step 3: Configure bot permissions and intents

1. Still in the **Bot** section, scroll down to **Privileged Gateway Intents**.
2. Enable the intents your integration requires:
    - **Server Members Intent**: required for member-related operations.
    - **Message Content Intent**: required to read message content.
3. Under **Bot Permissions**, select the permissions your bot needs (e.g., Send Messages, Manage Roles, Manage Channels).

Only enable the intents and permissions your integration actually needs. Bots in 100+ servers require Discord verification to use privileged intents.

## Step 4: Invite the bot to your server

1. Navigate to the **OAuth2** section in the left sidebar.
2. Under **OAuth2 URL Generator**, select the **bot** scope.
3. Select the bot permissions your integration requires.
4. Copy the generated URL and open it in a browser.
5. Select the server you want to add the bot to and click **Authorize**.

## Step 5: Set up OAuth2 credentials (optional)

If you prefer OAuth2 authentication instead of a bot token:

1. In the **OAuth2** section, note down the **Client ID** and **Client Secret**.
2. Configure the required OAuth2 scopes for your use case (e.g., `bot`, `applications.commands`).
3. Use the Client Credentials grant or Authorization Code grant flow depending on your integration needs.

For server-to-server integrations, bot token authentication (`ApiKeysConfig`) is the simplest approach. Use OAuth2 when you need to act on behalf of a user.
