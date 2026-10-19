---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating a Slack application and obtaining the OAuth token required to use the Slack connector.

## Step 1: Sign in to Slack

Sign in to [Slack](https://slack.com/). If you don't have an account, [create one here](https://slack.com/get-started#/createnew).

<ThemedImage
    alt="Sign-in page"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/communication/slack/setup/sign-in.png'),
        dark: useBaseUrl('/img/connectors/catalog/communication/slack/setup/sign-in.png'),
    }}
/>

## Step 2: Create a new Slack application

1. Navigate to your apps in the [Slack API](https://api.slack.com/) and create a new Slack app.

   <ThemedImage
       alt="Create Slack app"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/communication/slack/setup/create-slack-app.png'),
           dark: useBaseUrl('/img/connectors/catalog/communication/slack/setup/create-slack-app.png'),
       }}
   />

2. Provide an app name and select your workspace.

   <ThemedImage
       alt="App name and workspace"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/communication/slack/setup/create-slack-app-2.png'),
           dark: useBaseUrl('/img/connectors/catalog/communication/slack/setup/create-slack-app-2.png'),
       }}
   />

3. Select **Create App**.

## Step 3: Add scopes to the token

1. Under **Add Features and Functionality**, select **Permissions** to set the token scopes.

   <ThemedImage
       alt="Add features and functionality"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/communication/slack/setup/add-features.png'),
           dark: useBaseUrl('/img/connectors/catalog/communication/slack/setup/add-features.png'),
       }}
   />

2. In the **User Token Scopes** section, add the required scopes.

   <ThemedImage
       alt="User token scopes"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/communication/slack/setup/token-permissions.png'),
           dark: useBaseUrl('/img/connectors/catalog/communication/slack/setup/token-permissions.png'),
       }}
   />

3. Select **Install to Workspace**.

   <ThemedImage
       alt="Install to workspace"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/communication/slack/setup/install-workspace.jpg'),
           dark: useBaseUrl('/img/connectors/catalog/communication/slack/setup/install-workspace.jpg'),
       }}
   />

4. Copy the OAuth token generated upon installation.

   <ThemedImage
       alt="Copy token"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/communication/slack/setup/copy-token.jpg'),
           dark: useBaseUrl('/img/connectors/catalog/communication/slack/setup/copy-token.jpg'),
       }}
   />
