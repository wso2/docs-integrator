---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating a HubSpot app and obtaining the OAuth 2.0 credentials (or private app token) required to use the HubSpot CRM Deals connector.

## Prerequisites

- A HubSpot account. If you do not have one, [sign up for a free account](https://app.hubspot.com/signup).
- A HubSpot developer account for creating apps. [Register at the HubSpot Developer Portal](https://developers.hubspot.com/).

## Step 1: Create a HubSpot developer app

1. Log in to your [HubSpot Developer Portal](https://developers.hubspot.com/).
2. Click **Apps** in the top navigation, then click **Create app**.
3. Enter an **App name** (e.g., `Ballerina Deals Integration`) and optionally a description.
4. Click **Create app**.

## Step 2: Configure OAuth scopes

1. In your app settings, navigate to the **Auth** tab.
2. Under **Scopes**, add the following required scopes:
    - `crm.objects.deals.read`: to read deal records
    - `crm.objects.deals.write`: to create, update, and archive deals
3. Set the **Redirect URL** to a URL you control (e.g., `https://localhost:9090/callback`).
4. Click **Save**.

Copy the **Client ID** and **Client Secret** from the Auth tab; you will need them in subsequent steps.

## Step 3: Authorize the app and get an authorization code

1. Construct the following authorization URL, replacing the placeholders with your values:

    ```
    https://app.hubspot.com/oauth/authorize?client_id=<YOUR_CLIENT_ID>&redirect_uri=<YOUR_REDIRECT_URI>&scope=crm.objects.deals.read%20crm.objects.deals.write
    ```

2. Open the URL in a browser and log in to your HubSpot account.
3. Select the HubSpot account (portal) you want to connect, then click **Grant access**.
4. After authorization, HubSpot redirects to your `redirect_uri` with a `code` query parameter. Copy that `code` value.

## Step 4: Exchange the authorization code for a refresh token

Send the following POST request to exchange your authorization code for tokens:

```
POST https://api.hubapi.com/oauth/v1/token
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code
&code=<AUTHORIZATION_CODE>
&client_id=<YOUR_CLIENT_ID>
&client_secret=<YOUR_CLIENT_SECRET>
&redirect_uri=<YOUR_REDIRECT_URI>
```

The response contains `access_token`, `refresh_token`, and `expires_in`. Save the `refresh_token`; it is long-lived and used to obtain new access tokens automatically.

Use a tool like [Postman](https://www.postman.com/) or `curl` to perform the token exchange.

## Step 5: Alternative: use a private app token

If you prefer not to use OAuth 2.0, HubSpot Private Apps provide a simpler API key approach:

1. In your HubSpot account, click the **Settings** gear icon.
2. Navigate to **Integrations > Private Apps**.
3. Click **Create a private app**.
4. Give it a name, then under **Scopes** add `crm.objects.deals.read` and `crm.objects.deals.write`.
5. Click **Create app**, then **Continue creating**.
6. Copy the generated **Access token**; this is your `privateApp` key.

Private app tokens do not expire but should be stored securely and rotated if compromised.
