---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating a Slack App and obtaining the Bot User OAuth token required to use the Slack connector.

## Prerequisites

- A Slack workspace. If you do not have one, [create a free workspace](https://slack.com/get-started).
- Access to the [Slack API Apps portal](https://api.slack.com/apps).

## Step 1: Create a Slack app

1. Go to [https://api.slack.com/apps](https://api.slack.com/apps) and click **Create New App**.
2. Choose **From scratch**.
3. Enter an **App Name** (e.g., `Ballerina Slack Connector`) and select the **workspace** where you want to install the app.
4. Click **Create App**.

## Step 2: Configure bot token scopes

1. In your app settings, navigate to **OAuth & Permissions** in the left sidebar.
2. Scroll to the **Scopes** section.
3. Under **Bot Token Scopes**, click **Add an OAuth Scope** and add the scopes required by your integration. Common scopes include:
    - `channels:read`: View basic information about public channels.
    - `channels:history`: View messages and content in public channels.
    - `channels:write`: Manage public channels the app belongs to.
    - `chat:write`: Send messages as the bot.
    - `files:read`: View files shared in channels the app belongs to.
    - `files:write`: Upload, edit, and delete files.
    - `users:read`: View basic user information.
    - `search:read`: Search a workspace's content.
    - `reactions:write`: Add and remove emoji reactions.
    - `pins:write`: Add and remove pinned messages and files.
4. Add any additional scopes required by the specific Slack API methods you plan to use.

Each Slack API method requires specific OAuth scopes. Refer to the [Slack API method reference](https://api.slack.com/methods) to find the exact scopes needed for each operation.

## Step 3: Install the app to your workspace

1. In **OAuth & Permissions**, scroll up to the **OAuth Tokens** section.
2. Click **Install to Workspace**.
3. Review the requested permissions and click **Allow**.
4. After installation, copy the **Bot User OAuth Token**; it begins with `xoxb-`.

Store the Bot User OAuth Token securely. Do not commit it to source control. Use Ballerina's `configurable` feature and a `Config.toml` file to supply it at runtime.

## Step 4: Locate your workspace and channel iDs

Many Slack API operations require a channel ID (e.g., `C1234567890`) rather than a channel name.
To find a channel ID:

1. Open Slack in your browser.
2. Navigate to the channel.
3. The channel ID appears at the end of the URL:
    ```
    https://app.slack.com/client/T0000001/C1234567890
                                         ^^^^^^^^^^^^ channel ID
    ```

Alternatively, use the `conversations.list` API method to retrieve all channel IDs programmatically.

User IDs (e.g., `U0000001`) can similarly be found via the `users.list` API method or in a user's Slack profile URL.
