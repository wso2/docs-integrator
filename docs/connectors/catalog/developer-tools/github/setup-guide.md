---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating a GitHub Personal Access Token (PAT) required to authenticate with the GitHub connector, and configuring a GitHub repository webhook for event-driven integrations.

## Prerequisites

- A GitHub account. If you do not have one, [sign up at GitHub](https://github.com/signup).

## Step 1: Access GitHub settings

1. Log in to your GitHub account.
2. Click on your profile picture in the top-right corner of the page.
3. Select **Settings** from the dropdown menu.

## Step 2: Navigate to developer settings

1. Scroll down in the left sidebar of the Settings page.
2. Click on **Developer settings** near the bottom.

## Step 3: Go to personal access tokens

1. In the Developer settings page, click **Personal access tokens**.
2. Select **Tokens (classic)** or **Fine-grained tokens** depending on your preference.

Fine-grained tokens offer more granular permissions and are recommended for production use. Classic tokens provide broader scope-based access. Both token types work identically with the GitHub connector — the choice affects only the permission scope, not connector configuration.

## Step 4: Generate a new token

1. Click **Generate new token**.
2. Provide a descriptive **Note** for the token (e.g., `Ballerina GitHub Connector`).
3. Set an **Expiration** period appropriate for your use case.
4. Select the required **Scopes** based on the operations you intend to use:
    - **repo** — Full control of private repositories (required for most repository operations).
    - **read:org** — Read organization and team membership.
    - **read:user** — Read user profile data.
    - **admin:org** — Full control of orgs and teams (if managing organization resources).
    - **delete_repo** — Delete repositories (if needed).
    - **gist** — Create and manage gists.
    - **notifications** — Access notifications.
5. Click **Generate token** at the bottom of the page.
6. Copy the generated token immediately — it will not be shown again.

Store the token securely. Do not commit it to source control. Use Ballerina's `configurable` feature and a `Config.toml` file to supply it at runtime.

## Configuring a GitHub repository webhook

If you are using the [GitHub Webhooks](../../../develop/integration-artifacts/event/github-webhooks.md) event integration, you must configure a webhook in your GitHub repository to send events to your listener endpoint.

### Prerequisites

- Admin access to the GitHub repository
- Your WSO2 Integrator listener URL (for example, `https://your-host:8090`)
- A webhook secret value — a random string you choose that must match the `webhookSecret` value in your integration

### Step 1: Open webhook settings

1. Go to your GitHub repository.
2. Click **Settings** → **Webhooks** → **Add webhook**.

### Step 2: Configure the webhook

Fill in the following fields:

| Field | Value |
|---|---|
| **Payload URL** | Your listener endpoint URL (for example, `https://your-host:8090`) |
| **Content type** | `application/json` |
| **Secret** | The same value you set as `webhookSecret` in your integration |
| **SSL verification** | Enable if your listener uses HTTPS |

### Step 3: Select events

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

### Step 4: Save

Click **Add webhook**. GitHub will send a ping event to your endpoint to verify connectivity.

Always set a webhook secret. Without it, your listener accepts requests from any source — not just GitHub. The secret is used to verify the `X-Hub-Signature-256` header on every incoming request.
