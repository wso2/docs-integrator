---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating a HubSpot Private App and obtaining the access token required to authenticate the HubSpot CRM Products connector.

## Prerequisites

- A HubSpot account. If you do not have one, [sign up for a free HubSpot account](https://app.hubspot.com/signup).

## Navigate to private apps

1. Log in to your HubSpot account.
2. Click the **Settings** icon (gear icon) in the top navigation bar.
3. In the left sidebar, go to **Integrations** → **Private Apps**.

## Create a private app

1. Click **Create a private app**.
2. On the **Basic Info** tab, enter a name for your app (e.g., `Ballerina Products Connector`) and optionally add a description and logo.
3. Click the **Scopes** tab.

## Configure required scopes

Under the **Scopes** tab, search for and enable the following scopes:

- `crm.objects.products.read`: Required to list, read, and search products.
- `crm.objects.products.write`: Required to create, update, and archive products.

Select the appropriate checkboxes and click **Create app**.

Grant only the scopes your integration actually needs. Limiting scope access reduces security risk.

## Copy the access token

1. After creating the app, HubSpot displays your **Access Token** on the app detail page.
2. Click **Show token** and copy the value; this is the bearer token you will use to authenticate.
3. Click **Done**.

The access token is shown only once. Store it securely (e.g., in a password manager or secrets vault) before closing the dialog. Do not commit it to source control.

## Set up OAuth 2.0 (alternative)

If you prefer OAuth 2.0 with a refresh token (for user-context access or long-running integrations):

1. Go to **Settings** → **Integrations** → **Connected Apps** and create a public app instead of a private app.
2. Under **Auth**, configure the redirect URI and note the **Client ID** and **Client Secret**.
3. Follow the [HubSpot OAuth authorization code flow](https://developers.hubspot.com/docs/api/oauth-quickstart-guide) to obtain an authorization code and exchange it for an `access_token` and `refresh_token`.
4. Use the `refresh_token`, `clientId`, and `clientSecret` to configure `OAuth2RefreshTokenGrantConfig` in the connector.

The OAuth 2.0 token URL for HubSpot is `https://api.hubapi.com/oauth/v1/token`. Set `credentialBearer` to `POST_BODY_BEARER` when constructing the grant config.

## Next steps

- [Actions Reference](actions.md) - Available operations
