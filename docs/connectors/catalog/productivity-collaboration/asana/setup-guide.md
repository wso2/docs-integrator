---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating an Asana personal access token to authenticate with the Asana connector.

## Prerequisites

- An active Asana account. If you do not have one, [sign up for free](https://asana.com/create-account).

## Step 1: Navigate to the developer console

1. Log in to your Asana account.
2. Go to the [Asana Developer Console](https://app.asana.com/0/my-apps).

   ![Asana developer console](/img/connectors/catalog/productivity-collaboration/asana/setup/1-developer-console.png)

## Step 2: Create a personal access token

1. Select **+ Create new token**.
2. Enter a descriptive **Token name** (for example, `Ballerina Asana Connector`).
3. Read and accept the **Asana API Terms and Conditions**.
4. Select **Create token**.

   ![Create token](/img/connectors/catalog/productivity-collaboration/asana/setup/2-create-token.png)

5. Copy the generated token immediately — it will not be shown again.

   ![Copy token](/img/connectors/catalog/productivity-collaboration/asana/setup/3-copy-token.png)

Store the personal access token securely. Do not commit it to source control. Use Ballerina's `configurable` feature and a `Config.toml` file to supply it at runtime.

## Step 3: Find your workspace GID

Most Asana API operations require a workspace GID. To find yours:

1. Open Asana in your browser and navigate to any project.
2. The workspace GID appears in the URL, or you can retrieve it via the `GET /workspaces` endpoint after configuring the connector.

You can also use the Asana API Explorer at [developers.asana.com/explorer](https://developers.asana.com/explorer) to test API calls and discover resource GIDs.

## What's next

- [Action reference](actions.md): Available operations
