---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating a HubSpot developer app or private app and obtaining the credentials required to use the HubSpot CRM Commerce Orders connector.

## Prerequisites

- A HubSpot account with access to CRM Commerce features. If you do not have one, [sign up for a free HubSpot account](https://app.hubspot.com/signup).

## Create a HubSpot developer account (for OAuth)

1. Go to [HubSpot Developer](https://developers.hubspot.com/) and sign in or create a developer account.
2. Click **Create developer account** if you don't have one.
3. This account is used to create OAuth apps that can access HubSpot portals.

## Create an app in the developer portal

1. In your developer account, navigate to **Apps** in the top navigation.
2. Click **Create app**.
3. Fill in the **App info** tab with a name and description.
4. Go to the **Auth** tab.
5. Under **Redirect URLs**, add your callback URL (e.g., `https://localhost/callback`).
6. Under **Scopes**, add the following required scopes:
    - `crm.objects.orders.read`
    - `crm.objects.orders.write`
    - `oauth`
7. Click **Save**.
8. Copy the **Client ID** and **Client Secret** from the **Auth** tab.

## Authorize and generate a refresh token

1. Construct the authorization URL, replacing `<YOUR_CLIENT_ID>`, `<YOUR_REDIRECT_URI>`, and scopes:

    ```
    https://app.hubspot.com/oauth/authorize?client_id=<YOUR_CLIENT_ID>&redirect_uri=<YOUR_REDIRECT_URI>&scope=crm.objects.orders.read%20crm.objects.orders.write%20oauth
    ```

2. Open the URL in a browser and select the HubSpot portal to authorize.
3. After authorization, HubSpot redirects to your redirect URI with a `code` query parameter. Copy the code.
4. Exchange the code for tokens using a POST request:

    ```
    POST https://api.hubapi.com/oauth/v1/token
    Content-Type: application/x-www-form-urlencoded

    grant_type=authorization_code
    &code=<AUTHORIZATION_CODE>
    &client_id=<YOUR_CLIENT_ID>
    &client_secret=<YOUR_CLIENT_SECRET>
    &redirect_uri=<YOUR_REDIRECT_URI>
    ```

5. The response contains `access_token` and `refresh_token`. Copy the `refresh_token`.

Use a tool like [Postman](https://www.postman.com/) or `curl` to perform the token exchange.

## Alternative: use a private app (API key)

If you prefer API key authentication instead of OAuth:

1. In your HubSpot account, click the gear icon and go to **Settings**.
2. Navigate to **Integrations** > **Private Apps**.
3. Click **Create a private app**.
4. Fill in the app name and description.
5. Under the **Scopes** tab, add:
    - `crm.objects.orders.read`
    - `crm.objects.orders.write`
6. Click **Create app** and confirm.
7. Copy the generated **Access Token**; this is your bearer token.

Private apps are simpler to set up and are recommended for server-to-server integrations where you only need to access a single HubSpot portal.

## Next steps

- [Actions Reference](actions.md): Available operations
