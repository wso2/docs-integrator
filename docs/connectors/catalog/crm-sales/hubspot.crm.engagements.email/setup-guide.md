---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating a HubSpot private app or OAuth app and obtaining the credentials required to use the HubSpot CRM Engagements Email connector.

## Prerequisites

- A HubSpot account with CRM access. If you do not have one, [sign up for a free HubSpot account](https://app.hubspot.com/signup).

## Create a HubSpot developer account (OAuth flow)

1. Go to the [HubSpot Developer Portal](https://developers.hubspot.com/) and sign in or create a developer account.
2. Navigate to **Apps** in the top navigation.
3. Click **Create app**.
4. Fill in the **App name** and other basic info.

## Configure OAuth scopes

1. In your app settings, go to the **Auth** tab.
2. Under **Scopes**, add the following required scopes:
    - `crm.objects.contacts.read`
    - `crm.objects.contacts.write`
    - `sales-email-read`
3. Set the **Redirect URL** to your application's callback endpoint (e.g., `https://localhost:9090/callback`).
4. Note your **Client ID** and **Client Secret** from the **Auth** tab.

The `sales-email-read` scope is required for reading email engagement data.

## Obtain OAuth tokens

1. Construct the authorization URL:

    ```
    https://app.hubspot.com/oauth/authorize?client_id=<YOUR_CLIENT_ID>&redirect_uri=<YOUR_REDIRECT_URI>&scope=crm.objects.contacts.read%20crm.objects.contacts.write%20sales-email-read
    ```

2. Open the URL in a browser and authorize the app for your HubSpot portal.
3. After authorization, HubSpot redirects to your callback URL with a `code` parameter.
4. Exchange the code for tokens:

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

## Alternative: use a private app token

1. In your HubSpot account, click the gear icon and go to **Settings**.
2. Navigate to **Integrations** > **Private Apps**.
3. Click **Create a private app**.
4. Give it a name and under **Scopes**, add:
    - `crm.objects.contacts.read`
    - `crm.objects.contacts.write`
    - `sales-email-read`
5. Click **Create app** and copy the generated **Access Token**.

Private app tokens are simpler to set up than OAuth and work well for server-to-server integrations. Store the token securely and use Ballerina's `configurable` feature.

## Next steps

- [Actions Reference](actions.md): Available operations
