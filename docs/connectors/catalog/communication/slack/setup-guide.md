---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating a Slack application and obtaining the OAuth token required to use the Slack connector.

## Step 1: Sign in to Slack

Sign in to [Slack](https://slack.com/). If you don't have an account, [create one here](https://slack.com/get-started#/createnew).

![Sign-in page](/img/connectors/catalog/communication/slack/setup/sign-in.png)

## Step 2: Create a new Slack application

1. Navigate to your apps in the [Slack API](https://api.slack.com/) and create a new Slack app.

   ![Create Slack app](/img/connectors/catalog/communication/slack/setup/create-slack-app.png)

2. Provide an app name and select your workspace.

   ![App name and workspace](/img/connectors/catalog/communication/slack/setup/create-slack-app-2.png)

3. Select **Create App**.

## Step 3: Add scopes to the token

1. Under **Add Features and Functionality**, select **Permissions** to set the token scopes.

   ![Add features and functionality](/img/connectors/catalog/communication/slack/setup/add-features.png)

2. In the **User Token Scopes** section, add the required scopes.

   ![User token scopes](/img/connectors/catalog/communication/slack/setup/token-permissions.png)

3. Select **Install to Workspace**.

   ![Install to workspace](/img/connectors/catalog/communication/slack/setup/install-workspace.jpg)

4. Copy the OAuth token generated upon installation.

   ![Copy token](/img/connectors/catalog/communication/slack/setup/copy-token.jpg)
