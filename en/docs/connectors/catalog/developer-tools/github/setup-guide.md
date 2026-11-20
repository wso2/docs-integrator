---
title: Setup Guide
description: Create a GitHub Personal Access Token (PAT) or register a GitHub App for the OAuth2 refresh token grant, and configure a GitHub repository webhook, for use with the GitHub connector.
keywords: [wso2 integrator, github setup, personal access token, PAT, github app, oauth2, refresh token, github webhook, webhook secret]
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Setup Guide

This guide walks you through obtaining GitHub credentials required to authenticate with the GitHub connector, and optionally configuring a repository webhook for event-driven integrations.

## Prerequisites

- A GitHub account. If you do not have one, [sign up at GitHub](https://github.com/signup).

## Personal Access Token

A Personal Access Token is the simplest way to authenticate with the GitHub connector.

### Access developer settings

1. Log in to your GitHub account.
2. Click on your profile picture in the top-right corner.
3. Select **Settings** from the dropdown menu, then click **Developer settings** in the left sidebar.

<ThemedImage
    alt="GitHub Developer Settings"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/developer-tools/github/1-developer-settings.png'),
        dark: useBaseUrl('/img/connectors/catalog/developer-tools/github/1-developer-settings.png'),
    }}
/>

### Generate a new token

1. Click **Personal access tokens**.
2. Select **Tokens (classic)** or **Fine-grained tokens** based on your preference.
3. Click **Generate new token**.
4. Provide a descriptive **Note** (e.g., `Ballerina GitHub Connector`).
5. Set an **Expiration** period appropriate for your use case.
6. Select the required **Scopes** based on the operations you intend to use:
    - **repo**: Full control of private repositories (required for most repository operations).
    - **read:org**: Read organization and team membership.
    - **read:user**: Read user profile data.
    - **admin:org**: Full control of orgs and teams (if managing organization resources).
    - **delete_repo**: Delete repositories (if needed).
    - **gist**: Create and manage gists.
    - **notifications**: Access notifications.
7. Click **Generate token** at the bottom of the page.
8. Copy the generated token immediately — it will not be shown again.

<ThemedImage
    alt="Generate new PAT"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/developer-tools/github/2-generate-token.png'),
        dark: useBaseUrl('/img/connectors/catalog/developer-tools/github/2-generate-token.png'),
    }}
/>

:::tip
Fine-grained tokens offer more granular permissions and are recommended for production use. Classic tokens provide broader scope-based access. Both token types work identically with the GitHub connector.
:::

:::warning
Store the token securely. Do not commit it to source control. Use Ballerina's `configurable` feature and a `Config.toml` file to supply it at runtime.
:::

## GitHub App with OAuth2

Use a GitHub App when you need OAuth2-based authentication with automatic token renewal.

### Create a GitHub App

1. Go to **Settings** → **Developer settings** → **GitHub Apps** → **New GitHub App**.
2. Fill in the **App name**, **Homepage URL**, and **Callback URL**.
3. Enable **Expire user authorization tokens**.
4. Under **Permissions**, grant the repository, organization, or account permissions required by your integration.
5. Click **Create GitHub App**.

### Obtain credentials

1. Note the **Client ID** displayed on the App settings page.
2. Under **Client secrets**, click **Generate a new client secret** and copy the value.

### Install the App and obtain a refresh token

1. Click **Install App** in the left sidebar and install it on the target account or organization.
2. Direct users to the authorization URL:
   ```
   https://github.com/login/oauth/authorize?client_id=CLIENT_ID&redirect_uri=CALLBACK_URL&state=RANDOM_STATE
   ```
3. Verify the `state` parameter on the callback to prevent CSRF attacks.
4. Exchange the returned `code` for tokens via `POST https://github.com/login/oauth/access_token`. The response includes an `access_token` (valid 8 hours) and a `refresh_token` (valid 6 months).
5. Store the `client_id`, `client_secret`, and `refresh_token` for use in the connector configuration.

:::note
GitHub rotates refresh tokens on every renewal. The connector stores the new token in memory only; a process restart after a renewal cycle requires reauthorization.
:::

## Configuring a GitHub repository webhook

To receive GitHub events with the `ballerinax/github.trigger` package, add a webhook to the repository (or organization) that sends events to your listener.

### Prerequisites

- Admin access to the GitHub repository, or owner access to the organization for an organization webhook.
- A public URL for your listener. GitHub must reach it over the internet. For local testing, a tunnel such as [ngrok](https://ngrok.com/) gives your machine a public URL:

  ```bash
  ngrok http 8090
  ```

  Use the **Forwarding** URL it prints as the payload URL below.

<ThemedImage
    alt="ngrok forwarding a public URL to the listener on localhost:8090"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/developer-tools/github/trigger-ngrok-forwarding.png'),
        dark: useBaseUrl('/img/connectors/catalog/developer-tools/github/trigger-ngrok-forwarding.png'),
    }}
/>

- A webhook secret: a random string you set both on the webhook and as the listener's `webhookSecret`.

### Open webhook settings

1. Go to your GitHub repository (or organization).
2. Click **Settings**, select **Webhooks**, and click **Add webhook**.

<ThemedImage
    alt="GitHub repository Webhooks settings page"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/developer-tools/github/trigger-webhook-settings-page.png'),
        dark: useBaseUrl('/img/connectors/catalog/developer-tools/github/trigger-webhook-settings-page.png'),
    }}
/>

### Configure the webhook

Fill in the following fields:

| Field | Value |
|---|---|
| **Payload URL** | Your listener's public URL, such as the ngrok forwarding URL |
| **Content type** | `application/json` |
| **Secret** | The same value you set as `webhookSecret` in your integration |
| **SSL verification** | Enable when the payload URL uses HTTPS |

<ThemedImage
    alt="GitHub webhook form with the payload URL, content type and secret filled in"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/developer-tools/github/trigger-webhook-form-filled.png'),
        dark: useBaseUrl('/img/connectors/catalog/developer-tools/github/trigger-webhook-form-filled.png'),
    }}
/>

### Select events

Choose **Let me select individual events**, and enable the events for the service types your integration attaches. Each service type is named after the GitHub event it handles:

| If you use | Enable GitHub event |
|---|---|
| `PushService` | **Pushes** |
| `PullRequestService` | **Pull requests** |
| `PullRequestReviewService` | **Pull request reviews** |
| `PullRequestReviewCommentService` | **Pull request review comments** |
| `IssuesService` | **Issues** |
| `IssueCommentService` | **Issue comments** |
| `ReleaseService` | **Releases** |
| `WorkflowRunService` | **Workflow runs** |
| `CheckRunService` | **Check runs** |

See the [Trigger Reference](triggers.md#callback-signatures) for all 75 service types.

<ThemedImage
    alt="GitHub webhook event selection with individual events checked"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/developer-tools/github/trigger-webhook-event-selection.png'),
        dark: useBaseUrl('/img/connectors/catalog/developer-tools/github/trigger-webhook-event-selection.png'),
    }}
/>

### Save

Click **Add webhook**. GitHub sends a `ping` event right away. A green check under **Recent Deliveries** shows that it reached your listener and passed verification. Attach a `PingService` to handle the ping; without one, the listener still acknowledges it.

<ThemedImage
    alt="GitHub webhook showing a successful delivery"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/developer-tools/github/trigger-webhook-confirmed.png'),
        dark: useBaseUrl('/img/connectors/catalog/developer-tools/github/trigger-webhook-confirmed.png'),
    }}
/>

:::warning
Set the same secret on the webhook and as `webhookSecret`. The listener verifies the `X-Hub-Signature-256` header on every delivery, and while `webhookSecret` isn't set it rejects every delivery with `401 Unauthorized`.
:::

## What's next

- [Action Reference](actions.md): full list of operations, parameters, and sample code
- [Trigger Reference](triggers.md): listener configuration and service callbacks for webhook events
- [Example](example.md): step-by-step integration walkthroughs