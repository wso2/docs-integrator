---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating a HubSpot private app or OAuth app and obtaining the credentials required to use the HubSpot CRM Commerce Discounts connector.

## Prerequisites

- A HubSpot account with a CRM subscription that includes commerce features. If you do not have one, [sign up for a free HubSpot account](https://app.hubspot.com/signup).

## Create a HubSpot developer account (for OAuth)

1. Go to the [HubSpot Developer Portal](https://developers.hubspot.com/) and sign up or log in.
2. Click **Create developer account** if you don't already have one.
3. Once your developer account is ready, you can create an app to obtain OAuth credentials.

## Create a HubSpot app and get OAuth credentials

1. In your developer account, navigate to **Apps** in the top navigation.
2. Click **Create app**.
3. Fill in the **App info** tab with a name and description.
4. Go to the **Auth** tab.
5. Copy the **Client ID** and **Client Secret**; you will need these for the connector configuration.
6. Under **Redirect URLs**, add your redirect URI (e.g., `https://localhost/callback`).
7. Under **Scopes**, add the following scopes:
    - `crm.objects.commercepayments.read`
    - `crm.objects.commercepayments.write`
8. Click **Save**.

Store the Client ID and Client Secret securely. Use Ballerina's `configurable` feature and a `Config.toml` file to supply them at runtime.

## Authorize and get a refresh token

1. Construct the authorization URL:

    ```
    https://app.hubspot.com/oauth/authorize?client_id=<YOUR_CLIENT_ID>&redirect_uri=<YOUR_REDIRECT_URI>&scope=crm.objects.commercepayments.read%20crm.objects.commercepayments.write
    ```

2. Open the URL in a browser and select the HubSpot account to authorize.
3. Click **Connect app** when prompted.
4. After authorization, HubSpot redirects to your callback URL with a `code` query parameter. Copy the `code` value.
5. Exchange the code for tokens using a POST request:

    ```
    POST https://api.hubapi.com/oauth/v1/token
    Content-Type: application/x-www-form-urlencoded

    grant_type=authorization_code
    &code=<AUTHORIZATION_CODE>
    &client_id=<YOUR_CLIENT_ID>
    &client_secret=<YOUR_CLIENT_SECRET>
    &redirect_uri=<YOUR_REDIRECT_URI>
    ```

6. The response contains `access_token` and `refresh_token`. Copy the `refresh_token`.

Refresh tokens do not expire unless the app is uninstalled from the HubSpot account.

## Alternative: use a private app access token

If you prefer a simpler setup without OAuth, you can use a HubSpot private app:

1. In your HubSpot account, go to **Settings** → **Integrations** → **Private Apps**.
2. Click **Create a private app**.
3. Enter a name and description.
4. Go to the **Scopes** tab and add:
    - `crm.objects.commercepayments.read`
    - `crm.objects.commercepayments.write`
5. Click **Create app** and confirm.
6. Copy the **Access Token** shown: this is your bearer token.

Private app tokens grant long-lived access. Keep them secure and rotate them if compromised.

## Next steps

- [Actions Reference](actions.md): Available operations
