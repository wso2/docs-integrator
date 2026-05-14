---
title: Setup Guide
---

# Setup Guide

This guide walks you through obtaining a Trello API key and token required to use the Trello connector.

## Prerequisites

- An active Trello account. If you do not have one, [sign up for free](https://trello.com/signup).

## Step 1: Create a Power-Up in the admin portal

1. Log in to your Trello account.
2. Navigate to the [Trello Power-Ups admin portal](https://trello.com/power-ups/admin).

   ![Power-Ups admin portal](/img/connectors/catalog/productivity-collaboration/trello/setup/trello-powerups.png)

3. Select **New** to create a new Power-Up.
4. Fill in the required fields (name, workspace, and a placeholder iframe connector URL) and select **Create**.

   ![Create Power-Up form](/img/connectors/catalog/productivity-collaboration/trello/setup/trello-form.png)

## Step 2: Generate an API key

1. After creation, select the Power-Up name to open its settings.
2. Select the **API Key** tab.

   ![Navigate to API key tab](/img/connectors/catalog/productivity-collaboration/trello/setup/trello-generateKey.png)

3. Select **Generate a new API Key** and copy the displayed **API Key**.

   ![API key displayed](/img/connectors/catalog/productivity-collaboration/trello/setup/trello-key.png)

If you previously generated a key at `trello.com/app-key`, that flow has been replaced by the Power-Up Admin portal.

## Step 3: Generate an API token

1. On the same API Key page, select the **Token** link next to your API key.

   ![Token link on API key page](/img/connectors/catalog/productivity-collaboration/trello/setup/trello-permission.png)

2. Review the permissions requested and select **Allow**.
3. Copy the generated **Token**.

   ![Copy the generated token](/img/connectors/catalog/productivity-collaboration/trello/setup/trello-token.png)

Store the API Key and Token securely. Do not commit them to source control. Use Ballerina's `configurable` feature and a `Config.toml` file to supply them at runtime.

The token grants access to your Trello account. Treat it like a password and revoke it if compromised.

## What's next

- [Action reference](actions.md): Available operations
