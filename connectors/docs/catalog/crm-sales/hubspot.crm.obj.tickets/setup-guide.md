---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating a HubSpot app and obtaining the OAuth 2.0 credentials required to use the HubSpot CRM Tickets connector.

## Prerequisites

- A HubSpot developer account. If you do not have one, [sign up here](https://developers.hubspot.com/get-started).

## Step 1: Create a HubSpot developer test account

1. Log in to your HubSpot developer account.
2. In the left sidebar, navigate to **Test Accounts**.
3. Click **Create developer test account**.
4. Enter a name for your test account and click **Create**.

Developer test accounts are for development and testing only. Do not use them in production.

## Step 2: Create a HubSpot app

1. In your developer account, navigate to the **Apps** section.
2. Click **Create App**.
3. Provide the required details, including the app name and description.

## Step 3: Configure OAuth scopes and redirect URI

1. In your app settings, navigate to the **Auth** tab.
2. Under **Scopes**, click **Add new scope** and add the following scopes:
    - `tickets`
    - `oauth`
3. Under **Redirect URLs**, add your redirect URI (e.g., `https://localhost:9090/oauth2/callback` for local development).
4. Click **Create App** (or **Save** if updating an existing app).

## Step 4: Obtain the client ID and client secret

1. Navigate to the **Auth** tab of your app.
2. Copy the **Client ID** and **Client Secret**; you will need these to generate tokens.

Store the Client ID and Client Secret securely. Do not commit them to source control.

## Step 5: Generate the authorization code and refresh token

1. Construct the following authorization URL, replacing the placeholders with your values:

    ```
    https://app.hubspot.com/oauth/authorize?client_id=<YOUR_CLIENT_ID>&scope=tickets%20oauth&redirect_uri=<YOUR_REDIRECT_URI>
    ```

2. Open the URL in a browser and select your developer test account when prompted.
3. Authorize the app. After authorization, your browser will redirect to your redirect URI with a `code` query parameter. Copy that code.
4. Exchange the authorization code for tokens using the following request:

    ```
    POST https://api.hubapi.com/oauth/v1/token
    Content-Type: application/x-www-form-urlencoded

    grant_type=authorization_code
    &code=<AUTHORIZATION_CODE>
    &redirect_uri=<YOUR_REDIRECT_URI>
    &client_id=<YOUR_CLIENT_ID>
    &client_secret=<YOUR_CLIENT_SECRET>
    ```

5. The response includes an `access_token` and a `refresh_token`. Save the `refresh_token`; it is used to obtain new access tokens automatically.

Use a tool like Postman or curl to perform the token exchange in step 4.
