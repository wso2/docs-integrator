---
title: Setup Guide
---

# Setup Guide

This guide walks you through setting up a HubSpot developer account and obtaining the credentials required to use the HubSpot Automation Actions connector.

## Prerequisites

- A HubSpot account with a **Professional** or higher plan (Marketing Hub, Sales Hub, or Service Hub). If you do not have one, [sign up for a HubSpot account](https://www.hubspot.com/).
- A HubSpot developer account. If you do not have one, [create a free developer account](https://developers.hubspot.com/).

## Step 1: Create a HubSpot developer app

1. Log in to your [HubSpot developer account](https://developers.hubspot.com/).
2. Navigate to **Apps** in the top navigation bar.
3. Click **Create app**.
4. Under **App Info**, fill in the **Public app name** (e.g., `Ballerina Automation Connector`).
5. Click **Save**.

## Step 2: Configure OAuth settings

1. In your app settings, go to the **Auth** tab.
2. Note down the **Client ID** and **Client Secret**; you will need these for OAuth 2.0 authentication.
3. Under **Redirect URLs**, add your redirect URI (e.g., `https://localhost:9090/callback`).
4. Under **Scopes**, add the `automation` scope.
5. Click **Save**.

The `automation` scope is required for accessing the Automation Actions API endpoints.

## Step 3: Obtain an OAuth 2.0 access token

Use the HubSpot OAuth 2.0 Authorization Code flow to obtain tokens:

1. Construct the authorization URL, replacing `<YOUR_CLIENT_ID>` and `<YOUR_REDIRECT_URI>`:

    ```
    https://app.hubspot.com/oauth/authorize?client_id=<YOUR_CLIENT_ID>&redirect_uri=<YOUR_REDIRECT_URI>&scope=automation
    ```

2. Open the URL in a browser and select the HubSpot account to authorize.
3. After authorization, HubSpot redirects to your redirect URI with a `code` query parameter. Copy the `code` value.
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

5. The response contains `access_token` and `refresh_token`. Copy both values.

Store the Client ID, Client Secret, and refresh token securely. Use Ballerina's `configurable` feature and a `Config.toml` file to supply them at runtime.

## Step 4: Obtain a developer API key

The Definitions, Functions, and Revisions endpoints require a developer API key:

1. In your [HubSpot developer account](https://developers.hubspot.com/), navigate to **Apps** and select your app.
2. Go to the **Auth** tab.
3. Under **Developer API key**, copy the **API key** (also called `hapikey`).

Developer API keys provide broad access to your developer account. Keep them confidential and never expose them in client-side code or public repositories.

## Step 5: Note your app ID

1. In your HubSpot developer account, navigate to **Apps** and select your app.
2. The **App ID** is displayed in the app settings page or in the URL (e.g., `https://developers.hubspot.com/.../<appId>`).
3. Copy the App ID: it is required as a path parameter for most API operations.
