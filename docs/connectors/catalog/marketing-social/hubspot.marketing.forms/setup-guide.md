---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating a HubSpot app and obtaining the OAuth 2.0 credentials required to use the HubSpot Marketing Forms connector.

## Prerequisites

- A HubSpot account. If you do not have one, [sign up for a free account](https://app.hubspot.com/signup).

## Create a HubSpot app

1. Log in to the [HubSpot Developer Portal](https://app.hubspot.com/).
2. Click **Apps** in the top navigation bar.
3. Click **Create app**.
4. Enter an **App name** (e.g., `Ballerina Forms Connector`) and optionally a description.
5. Click **Create app**.

## Configure OAuth scopes

1. In your app settings, navigate to the **Auth** tab.
2. Under **Redirect URLs**, add your callback URL (e.g., `https://localhost/callback`).
3. Under **Scopes**, search for and add the **forms** scope.
4. Click **Save changes**.

The `forms` scope is required for all form operations. Without it, API calls will return a 403 error.

## Get the client ID and client secret

1. In the **Auth** tab of your app, locate the **Client ID** and **Client Secret** fields.
2. Copy the **Client ID**; this is your `clientId`.
3. Copy the **Client Secret**; this is your `clientSecret`.

Store the Client ID and Client Secret securely. Do not commit them to source control.
Use Ballerina's `configurable` feature and a `Config.toml` file to supply them at runtime.

## Authorize and get a refresh token

Use the HubSpot OAuth 2.0 Authorization Code flow to obtain a refresh token:

1. Construct the following authorization URL, replacing the placeholders:

    ```
    https://app.hubspot.com/oauth/authorize?client_id=<YOUR_CLIENT_ID>&scope=forms&redirect_uri=<YOUR_REDIRECT_URI>
    ```

2. Open the URL in a browser and select the HubSpot account to authorize.
3. Click **Grant access** when prompted.
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

## Next steps

- [Actions Reference](actions.md) - Available operations
