---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating a HubSpot developer app and obtaining the OAuth 2.0 credentials required to use the HubSpot Marketing Campaigns connector.

## Prerequisites

- A HubSpot account with a Marketing Hub Professional or Enterprise subscription. If you do not have one, [sign up at HubSpot](https://www.hubspot.com/).
- A HubSpot developer account. [Create one here](https://developers.hubspot.com/) if you do not have one.

## Create a HubSpot developer app

1. Log in to your [HubSpot developer account](https://app.hubspot.com/signup-hubspot/developers).
2. Navigate to **Apps** in the top navigation bar.
3. Click **Create app**.
4. Under **App Info**, fill in the **Public app name** (e.g., `Ballerina Campaigns Connector`).
5. Optionally add a description and logo.

## Configure OAuth settings

1. Go to the **Auth** tab of your app.
2. Note the **Client ID** and **Client Secret**; you will need these.
3. Set the **Redirect URL** to `https://localhost` (or your own callback URL).
4. Under **Scopes**, add the following scopes:
    - `content`
    - `crm.objects.campaigns.read`
    - `crm.objects.campaigns.write`
5. Click **Save**.

The required scopes may vary depending on which operations you plan to use. The scopes listed above cover all campaign operations.

## Authorize and get a refresh token

1. Construct the following authorization URL, replacing `<YOUR_CLIENT_ID>` and `<YOUR_REDIRECT_URI>`:

    ```
    https://app.hubspot.com/oauth/authorize?client_id=<YOUR_CLIENT_ID>&redirect_uri=<YOUR_REDIRECT_URI>&scope=content%20crm.objects.campaigns.read%20crm.objects.campaigns.write
    ```

2. Open the URL in a browser and log in with your HubSpot account credentials.
3. Select the HubSpot account you want to connect and click **Choose Account**.
4. After authorization, HubSpot redirects to your redirect URL with a `code` query parameter. Copy the `code` value.
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

Use a tool like [Postman](https://www.postman.com/) or `curl` to perform the token exchange in step 5.

## Alternative: use a private app API key

If you prefer API key authentication instead of OAuth 2.0:

1. In your HubSpot account, go to **Settings** > **Integrations** > **Private Apps**.
2. Click **Create a private app**.
3. Enter a name and description for the app.
4. Under **Scopes**, add `content`, `crm.objects.campaigns.read`, and `crm.objects.campaigns.write`.
5. Click **Create app** and confirm.
6. Copy the generated **Access token**; this is your private app API key.

Store your API key and OAuth credentials securely. Do not commit them to source control. Use Ballerina's `configurable` feature and a `Config.toml` file to supply them at runtime.

## Next steps

- [Actions Reference](actions.md) - Available operations
