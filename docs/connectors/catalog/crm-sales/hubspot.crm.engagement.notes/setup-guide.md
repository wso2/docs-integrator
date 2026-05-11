---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating a HubSpot developer app and obtaining the OAuth 2.0 credentials required to use the HubSpot CRM Engagement Notes connector.

## Prerequisites

- A HubSpot account with CRM access. If you do not have one, [sign up for a free account](https://app.hubspot.com/signup-hubspot/crm).

## Create a HubSpot developer account

1. Go to the [HubSpot Developer Portal](https://developers.hubspot.com/).
2. Click **Create a developer account** if you don't already have one.
3. Complete the registration form and verify your email address.

## Create a developer app

1. In the HubSpot Developer Portal, navigate to **Apps** in the top navigation.
2. Click **Create app**.
3. Fill in the **App Info** tab:
    - **Public app name**: Enter a name (e.g., `Ballerina Notes Connector`).
    - **Description**: Optional description for your app.
4. Go to the **Auth** tab.
5. Set the **Redirect URL** to `https://localhost` (or your own callback URL).
6. Under **Scopes**, add the following scopes:
    - `crm.objects.contacts.read`
    - `crm.objects.contacts.write`
7. Click **Create app**.

The required scopes may vary depending on which CRM objects you want to associate notes with.

## Get the client ID and client secret

1. After creating the app, go to the **Auth** tab of your app.
2. Copy the **Client ID**; this is your `clientId`.
3. Copy the **Client Secret**; this is your `clientSecret`.

Store the Client ID and Client Secret securely. Do not commit them to source control.
Use Ballerina's `configurable` feature and a `Config.toml` file to supply them at runtime.

## Authorize and get a refresh token

Use the HubSpot OAuth 2.0 Authorization Code flow to obtain a refresh token:

1. Construct the authorization URL, replacing `<YOUR_CLIENT_ID>` and `<YOUR_REDIRECT_URI>`:

    ```
    https://app.hubspot.com/oauth/authorize?client_id=<YOUR_CLIENT_ID>&redirect_uri=<YOUR_REDIRECT_URI>&scope=crm.objects.contacts.read%20crm.objects.contacts.write
    ```

2. Open the URL in a browser and select the HubSpot account to authorize.
3. Click **Connect app** when prompted.
4. After authorization, HubSpot redirects to your redirect URI with a `code` query parameter. Copy the `code` value.
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

## Next steps

- [Actions Reference](actions.md): Available operations
