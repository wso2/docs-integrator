---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating a HubSpot app and obtaining the OAuth 2.0 credentials required to use the HubSpot Marketing Transactional connector.

## Prerequisites

- A HubSpot account with a Marketing Hub Professional or Enterprise subscription. If you do not have one, [sign up for a free HubSpot account](https://app.hubspot.com/signup) and start a trial.
- A HubSpot developer account. If you do not have one, [create a developer account](https://developers.hubspot.com/get-started).

## Step 1: Create a HubSpot app

1. Log in to your [HubSpot Developer Portal](https://developers.hubspot.com/).
2. Click **Apps** in the top navigation bar.
3. Click **Create app**.
4. Under **App Info**, fill in the **Public app name** (e.g., `Ballerina Transactional Email Connector`).
5. Click **Auth** tab to configure OAuth settings.

## Step 2: Configure OAuth settings

1. In the **Auth** tab of your app, find the **Redirect URLs** section.
2. Add a redirect URL (e.g., `https://localhost`).
3. Under **Scopes**, add the following scope:
   - **transactional-email**: Required for sending transactional emails and managing SMTP tokens.
4. Click **Save**.
5. Note the **Client ID** and **Client Secret** displayed at the top of the Auth page.

Store the Client ID and Client Secret securely. Do not commit them to source control. Use Ballerina's `configurable` feature and a `Config.toml` file to supply them at runtime.

## Step 3: Authorize and get a refresh token

1. Construct the following authorization URL, replacing `<YOUR_CLIENT_ID>` and `<YOUR_REDIRECT_URI>`:

    ```
    https://app.hubspot.com/oauth/authorize?client_id=<YOUR_CLIENT_ID>&redirect_uri=<YOUR_REDIRECT_URI>&scope=transactional-email
    ```

2. Open the URL in a browser and log in with your HubSpot account.
3. Select the HubSpot account to authorize and click **Connect app**.
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

The authorization code expires quickly. Complete the token exchange within a few seconds of receiving the code.
