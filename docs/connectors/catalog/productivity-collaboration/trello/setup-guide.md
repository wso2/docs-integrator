---
title: Setup Guide
---

# Setup Guide

This guide walks you through obtaining a Trello API key and token required to use the Trello connector.

## Prerequisites

- An active Trello account. If you do not have one, [sign up for free at trello.com](https://trello.com/signup).

## Step 1: Get your API key

1. Log in to your Trello account.
2. Navigate to [https://trello.com/power-ups/admin](https://trello.com/power-ups/admin).
3. Click **New** to create a new Power-Up (or use an existing one).
4. Fill in the required fields (name, workspace, iframe connector URL can be any placeholder URL).
5. After creation, click on the Power-Up name to open its settings.
6. Select the **API Key** tab on the left.
7. Click **Generate a new API Key**.
8. Copy the displayed **API Key**.

If you previously generated a key at trello.com/app-key, that flow has been replaced by the Power-Up Admin portal.

## Step 2: Generate an API token

1. On the same API Key page, find the **Token** link next to your API key.
2. Click the link: this opens an authorization page.
3. Review the permissions requested and click **Allow**.
4. Copy the generated **Token**.

Store the API Key and Token securely. Do not commit them to source control.
Use Ballerina's `configurable` feature and a `Config.toml` file to supply them at runtime.

The token grants access to your Trello account. Treat it like a password and revoke it if compromised.

## Step 3: Identify your board and list iDs

To work with specific boards and lists, you need their IDs:

1. Open a board in Trello.
2. Add `.json` to the end of the board URL (e.g., `https://trello.com/b/BOARD_SHORT_ID/board-name.json`).
3. The JSON response contains the board `id` and all list IDs under the `lists` array.

Alternatively, use the connector's API to retrieve board and list IDs programmatically after authentication.
