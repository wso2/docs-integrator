---
title: Setup Guide
---

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

Fine-grained tokens offer more granular permissions and are recommended for production use. Classic tokens provide broader scope-based access. Both token types work identically with the GitHub connector.

Store the token securely. Do not commit it to source control. Use Ballerina's `configurable` feature and a `Config.toml` file to supply it at runtime.

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

GitHub rotates refresh tokens on every renewal. The connector stores the new token in memory only; a process restart after a renewal cycle requires reauthorization.

## Configuring a GitHub repository webhook

If you are using event-driven integrations with GitHub webhooks, configure a webhook in your repository to forward events to your listener endpoint.

### Prerequisites

- Admin access to the GitHub repository
- Your WSO2 Integrator listener URL (for example, `https://your-host:8090`)
- A webhook secret: a random string that must match the `webhookSecret` value in your integration

### Open webhook settings

1. Go to your GitHub repository.
2. Click **Settings** → **Webhooks** → **Add webhook**.

### Configure the webhook

Fill in the following fields:

| Field | Value |
|---|---|
| **Payload URL** | Your listener endpoint URL (for example, `https://your-host:8090`) |
| **Content type** | `application/json` |
| **Secret** | The same value you set as `webhookSecret` in your integration |
| **SSL verification** | Enable if your listener uses HTTPS |

### Select events

Choose **Let me select individual events** and enable only the events that match your service type:

| If you use | Enable GitHub event |
|---|---|
| `IssuesService` | **Issues** |
| `IssueCommentService` | **Issue comments** |
| `PullRequestService` | **Pull requests** |
| `PullRequestReviewService` | **Pull request reviews** |
| `PullRequestReviewCommentService` | **Pull request review comments** |
| `ReleaseService` | **Releases** |
| `LabelService` | **Labels** |
| `MilestoneService` | **Milestones** |
| `PushService` | **Pushes** |
| `ProjectCardService` | **Project cards** |

### Save

Click **Add webhook**. GitHub will send a ping event to your endpoint to verify connectivity.

Always set a webhook secret. Without it, your listener accepts requests from any source, not just GitHub. The secret is used to verify the `X-Hub-Signature-256` header on every incoming request.

## What's next

- [Action Reference](actions.md): full list of operations, parameters, and sample code
- [Trigger Reference](triggers.md): listener configuration and service callbacks for webhook events
- [Example](example.md): step-by-step integration walkthroughs
