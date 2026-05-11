---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating an Intercom app and obtaining the access token required to use the Intercom connector.

:::info Prerequisites
- An Intercom account. If you do not have one, [sign up for Intercom](https://www.intercom.com/signup).
- Access to the [Intercom Developer Hub](https://app.intercom.com/a/apps/_/developer-hub).

## Step 1: Create an Intercom app

1. Log in to your Intercom account and navigate to **Settings** > **Integrations** > **Developer Hub**, or go directly to the [Developer Hub](https://app.intercom.com/a/apps/_/developer-hub).
2. Click **New App**.
3. Enter an **App name** (for example, `Ballerina Integration`).
4. Select the **Workspace** the app should belong to.
5. Choose **Internal integration** (for connecting to your own workspace) or **Public** (for distributing to other workspaces).
6. Click **Create App**.

## Step 2: Configure permissions

1. In your newly created app, go to **Authentication**.
2. Under **Access Token**, you will see a token already generated. This token has the permissions of the app.
3. To control what the connector can access, click **Edit** next to the permission scopes and enable the relevant permissions:

    | Permission | Required for |
    |---|---|
    | Read and write contacts | Contact operations |
    | Read and write conversations | Conversation operations |
    | Read and write tickets | Ticket operations |
    | Read and write articles | Help Center article operations |
    | Read and write tags | Tag operations |
    | Read and write companies | Company operations |
    | Read admins | Admin identification (`GET /me`) |

4. Click **Save** after selecting the required permissions.

For production use, grant only the minimum permissions your integration needs.

## Step 3: Copy the access token

In the **Authentication** section of your app, copy the **Access Token**.

Store the access token securely. Do not commit it to source control. Use Ballerina's `configurable` feature and a `Config.toml` file to supply the token at runtime.

## Step 4: Configure the connector

Add the access token to your project's `Config.toml` file:

```toml
token = "YOUR_ACCESS_TOKEN_HERE"
```

Then initialise the connector in your Ballerina code:

```ballerina
import ballerinax/intercom;

configurable string token = ?;

intercom:ConnectionConfig config = {auth: {token}};
intercom:Client intercomClient = check new (config);
```

## Step 5: (Optional) Find your ticket type ID

If you plan to create tickets, you will need a ticket type ID from your workspace. Retrieve the available ticket types with:

```bash
curl -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
     -H "Accept: application/json" \
     https://api.intercom.io/ticket_types
```

Note the `id` field of the ticket type you want to use and add it to your `Config.toml`:

```toml
ticketTypeId = "YOUR_TICKET_TYPE_ID"
```

## What's next

- [Action reference](action-reference.md): Browse all available operations and sample code
- [Intercom connector overview](connector-overview.md): Learn about all supported features
