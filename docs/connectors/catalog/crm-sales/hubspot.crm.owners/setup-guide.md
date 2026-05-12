---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating a HubSpot Private App or OAuth app and obtaining the credentials required to use the HubSpot CRM Owners connector.

## Prerequisites

- A HubSpot account with admin access. If you do not have one, [sign up for a free HubSpot account](https://app.hubspot.com/signup).

## Create a HubSpot developer account (OAuth 2.0)

If you plan to use OAuth 2.0 authentication:

1. Go to the [HubSpot Developer Portal](https://developers.hubspot.com/).
2. Click **Create a developer account** if you don't already have one.
3. Log in to your developer account.

## Create an OAuth app

1. In your HubSpot developer account, navigate to **Apps** in the top navigation.
2. Click **Create app**.
3. Fill in the **App info** tab with a name and description.
4. Go to the **Auth** tab.
5. Under **Redirect URLs**, add your callback URL (e.g., `https://localhost/callback`).
6. Under **Scopes**, add the following scope:
    - `crm.objects.owners.read`
7. Click **Save**.
8. Copy the **Client ID** and **Client Secret** from the **Auth** tab.

You will need the Client ID, Client Secret, and a Refresh Token to configure the connector with OAuth 2.0.

## Obtain a refresh token

1. Construct the authorization URL, replacing `<YOUR_CLIENT_ID>` and `<YOUR_REDIRECT_URI>`:

    ```
    https://app.hubspot.com/oauth/authorize?client_id=<YOUR_CLIENT_ID>&redirect_uri=<YOUR_REDIRECT_URI>&scope=crm.objects.owners.read
    ```

2. Open the URL in a browser and select the HubSpot account to authorize.
3. After authorization, HubSpot redirects to your callback URL with a `code` query parameter. Copy the `code` value.
4. Exchange the authorization code for tokens using a POST request:

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

Use a tool like [Postman](https://www.postman.com/) or `curl` to perform the token exchange in step 4.

## Alternative: create a private app

If you prefer using a Private App access token instead of OAuth 2.0:

1. In your HubSpot account, click the gear icon in the top navigation bar to go to **Settings**.
2. In the left sidebar, navigate to **Integrations** > **Private Apps**.
3. Click **Create a private app**.
4. Enter a name and description for your app.
5. Go to the **Scopes** tab and select the following scope:
    - `crm.objects.owners.read`
6. Click **Create app** and confirm.
7. Copy the generated **Access Token**.

Private App access tokens do not expire but cannot be refreshed. Store them securely and do not commit them to source control.

## Next steps

- [Actions Reference](actions.md) - Available operations
