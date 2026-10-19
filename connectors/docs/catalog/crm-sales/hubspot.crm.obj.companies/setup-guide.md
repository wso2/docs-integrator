---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating a HubSpot app and obtaining the OAuth 2.0 credentials required to use the HubSpot CRM Companies connector.

## Prerequisites

- A HubSpot developer account. If you do not have one, [sign up for free](https://developers.hubspot.com/).
- A HubSpot portal (sandbox or production) in which the app will be installed.

## Step 1: Create a HubSpot developer app

1. Log in to your [HubSpot Developer account](https://developers.hubspot.com/).
2. Click **Apps** in the top navigation, then click **Create app**.
3. Enter an **App name** and optional description.
4. Click **Create app**.

## Step 2: Configure OAuth scopes

1. Inside your new app, open the **Auth** tab.
2. Under **Scopes**, add the following required scopes:
    - `crm.objects.companies.read`
    - `crm.objects.companies.write`
3. Add a **Redirect URL** for the OAuth callback (e.g., `https://localhost:9090`).
4. Click **Save**.

Additional scopes may be required if you need to retrieve associations with other CRM objects such as contacts or deals (e.g., `crm.objects.contacts.read`).

## Step 3: Install the app and authorize

1. In the **Auth** tab, copy your **Client ID** and note your configured **Redirect URL**.
2. Construct the install URL using your client ID, redirect URI, and required scopes:

    ```
    https://app.hubspot.com/oauth/authorize?client_id=<YOUR_CLIENT_ID>&redirect_uri=<YOUR_REDIRECT_URI>&scope=crm.objects.companies.read%20crm.objects.companies.write
    ```

3. Open the URL in a browser and select the HubSpot portal to install the app into.
4. Click **Connect app** to authorize.
5. After authorization, HubSpot redirects to your redirect URI with a `code` query parameter. Copy this authorization code.

## Step 4: Exchange the authorization code for tokens

Exchange the authorization code for an access token and refresh token by sending a POST
request to HubSpot's token endpoint:

```
POST https://api.hubapi.com/oauth/v1/token
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code
&code=<AUTHORIZATION_CODE>
&redirect_uri=<YOUR_REDIRECT_URI>
&client_id=<YOUR_CLIENT_ID>
&client_secret=<YOUR_CLIENT_SECRET>
```

The response contains `access_token`, `refresh_token`, and `expires_in`. Copy the
`refresh_token`: this is required to authenticate the Ballerina connector.

Use a tool like Postman or curl to perform this token exchange.

## Step 5: Retrieve your client ID and client secret

1. In your app's **Auth** tab, copy the **Client ID**.
2. Click **Show** next to **Client secret** and copy the value.

You will need your **Client ID**, **Client Secret**, and **Refresh Token** to configure
the connector.

Use Ballerina's `configurable` feature and a `Config.toml` file to supply credentials at runtime. Never commit credentials to source control.
