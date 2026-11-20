---
title: Setup Guide
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

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

## Configuring Slack event subscriptions

To receive Slack events with the `ballerinax/slack.trigger` package, turn on event subscriptions for your Slack app, point them at your listener, and give the listener the app's signing secret. You can use the app you created above, or a new one.

### Prerequisites

- A Slack workspace where you can install apps.
- A public URL for your listener. Slack must reach it over the internet. For local testing, a tunnel such as [ngrok](https://ngrok.com/) gives your machine a public URL:

  ```bash
  ngrok http 8090
  ```

  Use the **Forwarding** URL it prints as the request URL below.

<ThemedImage
    alt="ngrok forwarding a public URL to the listener on localhost:8090"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/communication/slack/trigger-ngrok-forwarding.png'),
        dark: useBaseUrl('/img/connectors/catalog/communication/slack/trigger-ngrok-forwarding.png'),
    }}
/>

### Get the signing secret

On your app's **Basic Information** page at [api.slack.com/apps](https://api.slack.com/apps), under **App Credentials**, click **Show** next to **Signing Secret** and copy it. Set it as the listener's `webhookSecret`. Slack signs every request with it.

<ThemedImage
    alt="Slack app Basic Information page with the signing secret under App Credentials"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/communication/slack/trigger-app-signing-secret.png'),
        dark: useBaseUrl('/img/connectors/catalog/communication/slack/trigger-app-signing-secret.png'),
    }}
/>

### Turn off Socket Mode

Make sure **Socket Mode** under **Settings** is turned off. With Socket Mode on, Slack sends events over a WebSocket instead of to your request URL, and the listener never receives them.

### Enable events

1. Start your integration, so the listener can answer Slack's verification request.
2. Open **Event Subscriptions** under **Features** and turn **Enable Events** on.

<ThemedImage
    alt="Slack Event Subscriptions page with Enable Events turned on"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/communication/slack/trigger-webhook-settings-page.png'),
        dark: useBaseUrl('/img/connectors/catalog/communication/slack/trigger-webhook-settings-page.png'),
    }}
/>

3. Paste your public URL into **Request URL**. Slack sends a `url_verification` request right away, the listener answers it, and the field shows **Verified**.

<ThemedImage
    alt="Slack request URL showing Verified"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/communication/slack/trigger-webhook-form-filled.png'),
        dark: useBaseUrl('/img/connectors/catalog/communication/slack/trigger-webhook-form-filled.png'),
    }}
/>

### Subscribe to bot events

Under **Subscribe to bot events**, click **Add Bot User Event** and add the events your integration handles, for example `message.channels` and `app_mention`. Slack adds the OAuth scopes each event needs. Click **Save Changes**, and reinstall the app to your workspace when Slack asks, so the new scopes take effect.

<ThemedImage
    alt="Slack bot event subscriptions with app_home_opened, message.channels and app_mention"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/communication/slack/trigger-webhook-event-selection.png'),
        dark: useBaseUrl('/img/connectors/catalog/communication/slack/trigger-webhook-event-selection.png'),
    }}
/>

Each service type handles a group of events:

| If you use | Subscribe to |
|---|---|
| `MessageService` | `message.channels`, `message.groups`, `message.im`, `message.mpim` or `message.app_home` |
| `AppService` | `app_mention`, `app_home_opened`, `app_uninstalled` and the other `app_*` events |
| `ReactionService` | `reaction_added`, `reaction_removed` |
| `ChannelService` | `channel_created`, `channel_rename` and the other `channel_*` events |
| `MemberService` | `member_joined_channel`, `member_left_channel` |

The `message.*` subscriptions all deliver a `message` event to `onMessage`; `event.channelType` tells them apart. See the [Trigger Reference](triggers.md#callback-signatures) for all 27 service types.

### Test the subscription

Invite the app to a channel with `/invite @<your app>` and post a message. Each delivery shows up in the ngrok console with `200 OK`, and your callback runs.

<ThemedImage
    alt="ngrok console showing Slack event deliveries answered with 200 OK"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/communication/slack/trigger-webhook-confirmed.png'),
        dark: useBaseUrl('/img/connectors/catalog/communication/slack/trigger-webhook-confirmed.png'),
    }}
/>

:::warning
Set the app's signing secret as `webhookSecret`. The listener verifies the `X-Slack-Signature` header on every request, and while `webhookSecret` isn't set it rejects every request with `401 Unauthorized`.
:::

Slack retries a delivery that isn't answered within three seconds. The listener answers before it runs your callback, so a slow callback doesn't cause retries, but a retry can still arrive after a network problem. Use `eventId` to skip events you have already handled.
