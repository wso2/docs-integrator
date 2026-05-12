---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating a HubSpot Private App and obtaining the access token required to authenticate the HubSpot CRM Line Items connector.

## Prerequisites

- A HubSpot account with CRM access. If you do not have one, [sign up for a free HubSpot account](https://app.hubspot.com/signup-hubspot/crm).

## Step 1: Navigate to private apps

1. Log in to your HubSpot account.
2. Click the **Settings** icon (gear icon) in the top navigation bar.
3. In the left sidebar, navigate to **Integrations** > **Private Apps**.

## Step 2: Create a new private app

1. Click **Create a private app** in the top-right corner.
2. On the **Basic Info** tab, enter a name for your app (e.g., `Ballerina Line Items Connector`) and optionally a description and logo.
3. Click the **Scopes** tab.

## Step 3: Configure required scopes

Under the **Scopes** tab, search for and enable the following CRM object scopes:

- `crm.objects.line_items.read`: Required to read and list line item records.
- `crm.objects.line_items.write`: Required to create, update, and archive line items.

Add any additional scopes your integration requires (e.g., deal or product scopes for associations).

Grant only the scopes your integration actually needs. Overly broad permissions increase security risk.

## Step 4: Create the app and copy the access token

1. Click **Create app** in the top-right corner.
2. Review the access token warning dialog and click **Continue creating**.
3. On the app detail page, click **Show token** under **Access token**.
4. Copy the token; this is your Private App access token (Bearer token) for the connector.

The access token is shown only once. Store it securely (e.g., in a secrets manager or Ballerina `Config.toml`). Do not commit it to source control. If lost, you can regenerate the token from the Private App settings page.

## Step 5: Set up OAuth 2.0 (optional: for production apps)

For production integrations or apps distributed to multiple HubSpot portals, use OAuth 2.0
instead of a Private App token:

1. Go to **Settings** > **Integrations** > **Connected Apps** and create a public app.
2. Under **Auth**, note the **Client ID** and **Client Secret**.
3. Set an **Redirect URL** (e.g., `https://your-app.com/oauth/callback`).
4. Use the HubSpot OAuth 2.0 authorization flow to obtain a `refresh_token`:
    - Direct the user to the HubSpot authorization URL with your `client_id`, `redirect_uri`, and required scopes.
    - Exchange the returned authorization `code` for tokens via a POST to:
      `https://api.hubapi.com/oauth/v1/token`
5. Copy the `refresh_token` from the token exchange response.

The OAuth 2.0 refresh URL for HubSpot is `https://api.hubapi.com/oauth/v1/token`.
