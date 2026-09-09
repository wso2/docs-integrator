---
title: Setup Guide
description: "How to create a GCP project, enable the Google Chat API, and configure a Chat app for the Google Chat connector."
keywords: [google chat, google cloud platform, chat api, service account, oauth]
connector: true
connector_name: "googleapis.chat"
---

# Setup Guide

This guide walks you through creating a Google Cloud Platform (GCP) project and configuring a Chat app for the Google Chat connector.

## Prerequisites

- A [Google Cloud Platform](https://console.cloud.google.com/) account with a project, or [sign up for one](https://cloud.google.com/)

## Create a Google Cloud Platform project

Open the [Google Cloud Platform Console](https://console.cloud.google.com/), click the project drop-down menu, and select an existing project or create a new one for your Chat app.

## Enable the Google Chat API

Navigate to **APIs & Services → Library** and enable the **Google Chat API**.

## Expose your local listener

Google Chat must reach the listener over a public HTTPS URL. For local development, the easiest option is [ngrok](https://ngrok.com/):

```bash
ngrok http 8000
```

Copy the `https://<sub>.ngrok-free.app` URL it prints. You'll use this both in the next step and as the listener's `endpointUrl`.

For production, deploy the listener behind any HTTPS-terminating load balancer or reverse proxy.

## Configure the Chat app

1. In the Google Cloud Console, open the **Google Chat API** page and select the **Configuration** tab.
2. Provide the **App name**, **Avatar URL**, and **Description**.
3. Make sure **"Build this Chat app as a Workspace add-on"** is **unchecked**. This connector handles interaction events directly over HTTP, not as a Workspace add-on.
4. Under **Interactive features**, enable the features your app needs (receive 1:1 messages, join spaces, slash commands, and so on).
5. Under **Connection settings**, choose **HTTP endpoint URL** and paste the ngrok (or production) HTTPS URL.
6. Set **Authentication audience** to either:
   - the same **HTTP endpoint URL** (use `HttpEndpointUrlConfig`/`endpointUrl` in the `@chat:ServiceConfig` annotation), or
   - your **Project number** (use `ProjectNumberConfig`/`projectNumber` instead).

   The value you choose here must match your service annotation. The listener uses it to validate the `aud` claim of the Google-signed bearer token on every incoming request.
7. Under **Visibility**, add the email addresses of users or Google Workspace domains that can install your app.

## Choose an authentication method

The connector supports three authentication modes for the internal Chat API client used by event callers.

### Option A: Service account (recommended for bots)

A service account lets your app act as itself. It's ideal for bots that post messages or run continuously.

1. Navigate to **APIs & Services → Credentials**, open **+ Create credentials**, and select **Service account**.
2. Give it a name, click **Done**, then open the created service account and go to the **Keys** tab.
3. Click **Add key → Create new key → JSON** and save the downloaded JSON file securely. You'll reference its path from `Config.toml`.

### Option B: OAuth 2.0 (for user-scoped actions)

OAuth 2.0 lets your app act on behalf of a signed-in user. It's required for operations like attachment uploads that need user scopes.

1. Open **APIs & Services → OAuth consent screen** and configure your consent screen (app name and support email).
2. Open **APIs & Services → Credentials → Create credentials → OAuth client ID**.
3. Fill in the form:

   | Field | Value |
   |---|---|
   | Application type | Web Application |
   | Name | ChatConnector |
   | Authorized Redirect URIs | `https://developers.google.com/oauthplayground` |

4. Save the **Client ID** and **Client secret**.
5. Use the [OAuth 2.0 Playground](https://developers.google.com/oauthplayground) to obtain a refresh token: open the gear icon, select "Use your own OAuth credentials", enter the client ID and secret, authorize the Chat scopes you need, then exchange the authorization code for tokens.

### Option C: Bearer token (for quick tests)

For short-lived experiments, use a Google access token directly:

```bash
gcloud auth print-access-token
```

:::note
Google access tokens expire in roughly one hour. Bearer-token auth is best for short-lived processes. For long-running services, use service account or OAuth 2.0. Both auto-refresh tokens.
:::

## Next steps

- [Action Reference](actions.md): call the Chat REST API using the `Client`.
- [Trigger Reference](triggers.md): handle interaction events using the `Listener` and `ChatService`.
