---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating a HubSpot Private App and obtaining the access token required to use the HubSpot CRM Schemas connector.

## Prerequisites

- A HubSpot account with permission to create and manage custom objects. If you do not have one, [sign up for a free HubSpot account](https://app.hubspot.com/signup).

## Create a HubSpot private app

1. Log in to your HubSpot account.
2. Click the **Settings** (gear) icon in the top navigation bar.
3. In the left sidebar, navigate to **Integrations → Private Apps**.
4. Click **Create a private app**.
5. Under the **Basic Info** tab, enter a name (e.g., `Ballerina Schemas Connector`) and an optional description for your app.

## Configure scopes

1. Click the **Scopes** tab.
2. Search for and select the following scopes required by the Schemas API:
    - `crm.schemas.custom.read`: read custom object schemas
    - `crm.schemas.custom.write`: create, update, and delete custom object schemas
3. Add any additional scopes your integration requires.

Grant only the minimum scopes your integration needs. You can edit scopes later, but doing so invalidates the existing access token and requires you to generate a new one.

## Create the app and copy the access token

1. Click **Create app** (top right). Review the scopes summary and confirm by clicking **Continue creating**.
2. After the app is created, HubSpot displays your **Access token** on the app detail page.
3. Click **Show token** and copy the value. This is the Bearer token you will use to authenticate the connector.

The access token is shown only once immediately after creation. Store it securely in a secrets manager or Ballerina's `Config.toml`. Do not commit it to source control.

## Obtain OAuth 2.0 credentials (alternative)

If you prefer OAuth 2.0 with a refresh token instead of a static access token:

1. In your HubSpot developer account, navigate to **Apps** and create a public app to obtain a **Client ID** and **Client Secret**.
2. Implement the OAuth 2.0 Authorization Code flow to obtain an authorization code, then exchange it for an access token and refresh token using the HubSpot token endpoint:

    ```
    POST https://api.hubapi.com/oauth/v1/token
    Content-Type: application/x-www-form-urlencoded

    grant_type=authorization_code
    &code=<AUTHORIZATION_CODE>
    &client_id=<YOUR_CLIENT_ID>
    &client_secret=<YOUR_CLIENT_SECRET>
    &redirect_uri=<YOUR_REDIRECT_URI>
    ```

3. Copy the `refresh_token` from the response for use in the connector's `OAuth2RefreshTokenGrantConfig`.

The HubSpot token refresh endpoint used by this connector is `https://api.hubapi.com/oauth/v1/token`.

## Next steps

- [Actions Reference](actions.md) - Available operations
