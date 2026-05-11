---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating a HubSpot app and obtaining the OAuth 2.0 credentials required to use the HubSpot CRM Lists connector.

## Prerequisites

- A HubSpot account with a Developer Portal. If you do not have one, [sign up for a free HubSpot developer account](https://app.hubspot.com/signup-hubspot/developers).

## Create a HubSpot app

1. Log in to the [HubSpot Developer Portal](https://app.hubspot.com/developer).
2. Click **Apps** in the top navigation, then click **Create app**.
3. Fill in the **App Info** tab with a name and description for your app.

## Configure OAuth scopes

1. Navigate to the **Auth** tab of your app.
2. Under **Scopes**, add the following required scopes:
    - `crm.lists.read`
    - `crm.lists.write`
    - `cms.membership.access_groups.write`
3. Set the **Redirect URL** to `https://localhost` (or your own callback URL).
4. Note down the **Client ID** and **Client Secret** displayed on this page.

If you plan to manage contact list memberships, you may also need the `crm.objects.contacts.read` and `crm.objects.contacts.write` scopes.

## Obtain a refresh token

1. Construct the following authorization URL, replacing the placeholders:

    ```
    https://app.hubspot.com/oauth/authorize?client_id=<YOUR_CLIENT_ID>&redirect_uri=<YOUR_REDIRECT_URL>&scope=crm.lists.read%20crm.lists.write%20cms.membership.access_groups.write
    ```

2. Open the URL in a browser and select the HubSpot account to authorize.
3. After authorization, HubSpot redirects to your redirect URL with a `code` query parameter. Copy the `code` value.
4. Exchange the code for tokens using a POST request:

    ```
    POST https://api.hubapi.com/oauth/v1/token
    Content-Type: application/x-www-form-urlencoded

    grant_type=authorization_code
    &code=<AUTHORIZATION_CODE>
    &client_id=<YOUR_CLIENT_ID>
    &client_secret=<YOUR_CLIENT_SECRET>
    &redirect_uri=<YOUR_REDIRECT_URL>
    ```

5. The response contains `access_token` and `refresh_token`. Copy the `refresh_token`.

Use a tool like [Postman](https://www.postman.com/) or `curl` to perform the token exchange in step 4.

## Alternative: use a private app (API key)

If you prefer API key authentication instead of OAuth 2.0:

1. In your HubSpot account, go to **Settings > Integrations > Private Apps**.
2. Click **Create a private app**.
3. Give it a name and under **Scopes**, add:
    - `crm.lists.read`
    - `crm.lists.write`
    - `cms.membership.access_groups.write`
4. Click **Create app** and copy the generated **Access Token**.

Store credentials securely. Use Ballerina's `configurable` feature and a `Config.toml` file to supply them at runtime.

## Next steps

- [Actions Reference](actions.md): Available operations
