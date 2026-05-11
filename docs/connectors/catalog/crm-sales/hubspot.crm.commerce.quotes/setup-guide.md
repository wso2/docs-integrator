---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating a HubSpot developer account and obtaining the OAuth 2.0 credentials required to use the HubSpot CRM Commerce Quotes connector.

## Prerequisites

- A HubSpot account with access to CRM. If you do not have one, [sign up for a free HubSpot account](https://app.hubspot.com/signup).

## Create a HubSpot developer account

1. Go to the [HubSpot Developer Portal](https://developers.hubspot.com/).
2. Click **Create a developer account** (or log in if you already have one).
3. Complete the registration form and verify your email address.

## Create a HubSpot app

1. In the HubSpot Developer Portal, navigate to **Apps** in the top navigation.
2. Click **Create app**.
3. Fill in the **App info** tab:
    - **Public app name**: Enter a name (e.g., `Ballerina Quotes Connector`).
    - **Description**: Optionally describe the app.
4. Go to the **Auth** tab.
5. Under **Redirect URLs**, add your callback URL (e.g., `https://localhost:9090/callback`).
6. Under **Scopes**, add the following required scopes:
    - `crm.objects.quotes.read`
    - `crm.objects.quotes.write`
7. Click **Save**.

The required scopes may vary depending on which operations you plan to use. Add additional scopes as needed for your use case.

## Get the client ID and client secret

1. In your app's **Auth** tab, locate the **Client ID** and **Client Secret** fields.
2. Copy the **Client ID**; this is your `clientId`.
3. Copy the **Client Secret**; this is your `clientSecret`.

Store the Client ID and Client Secret securely. Do not commit them to source control.
Use Ballerina's `configurable` feature and a `Config.toml` file to supply them at runtime.

## Authorize and generate a refresh token

Use the HubSpot OAuth 2.0 Authorization Code flow to obtain a refresh token:

1. Construct the following authorization URL, replacing `<YOUR_CLIENT_ID>` and `<YOUR_REDIRECT_URI>`:

    ```
    https://app.hubspot.com/oauth/authorize?client_id=<YOUR_CLIENT_ID>&redirect_uri=<YOUR_REDIRECT_URI>&scope=crm.objects.quotes.read%20crm.objects.quotes.write
    ```

2. Open the URL in a browser and log in with your HubSpot credentials.
3. Select the HubSpot account you want to connect and click **Connect app**.
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

Use a tool like [Postman](https://www.postman.com/) or `curl` to perform the token exchange in step 5.

## Alternative: Use a private app access token

If you prefer not to use OAuth 2.0, you can use a HubSpot Private App:

1. In your HubSpot account, go to **Settings** > **Integrations** > **Private Apps**.
2. Click **Create a private app**.
3. Give it a name and configure the required scopes (`crm.objects.quotes.read`, `crm.objects.quotes.write`).
4. Click **Create app** and copy the generated **Access Token**.

Private app tokens do not expire automatically but should still be stored securely and rotated periodically.

## Next steps

- [Actions Reference](actions.md): Available operations
