---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating a HubSpot app and obtaining the credentials required to authenticate with the HubSpot CRM Leads API.

## Prerequisites

- A HubSpot account. If you do not have one, [sign up for a free HubSpot account](https://app.hubspot.com/signup-hubspot/crm).

## Step 1: Create a HubSpot developer account

If you plan to use OAuth 2.0 (recommended for production), you need a HubSpot developer
account to create a public app:

1. Go to [HubSpot Developer Portal](https://developers.hubspot.com/) and sign in.
2. Click **Create developer account** if you do not already have one, or log in with
   your existing HubSpot credentials.
3. Once logged in, navigate to **Apps** in the top navigation bar.

## Step 2: Create a private app (API key: quickest setup)

For a simpler setup (ideal for development or internal integrations), create a Private App
to obtain a token directly:

1. Log in to your HubSpot account (not the developer portal).
2. Click the **Settings** gear icon in the top navigation bar.
3. In the left sidebar, navigate to **Integrations** → **Private Apps**.
4. Click **Create a private app**.
5. On the **Basic Info** tab, enter a name and (optionally) a description for your app.
6. Switch to the **Scopes** tab and add the following scopes:
    - `crm.objects.leads.read`
    - `crm.objects.leads.write`
7. Click **Create app**, then confirm by clicking **Continue creating**.
8. Copy the generated **Access Token**; this is your `privateApp` token.

The Private App access token is shown only once at creation time. Copy and store it securely before closing the dialog.

## Step 3: Create a public app for OAuth 2.0

For OAuth 2.0 (recommended for apps used by multiple HubSpot accounts):

1. In the HubSpot Developer Portal, go to **Apps** and click **Create app**.
2. Under **App Info**, provide an **App name** and (optionally) a description and logo.
3. Navigate to the **Auth** tab.
4. Note the **Client ID** and **Client secret**; you will need these later.
5. Under **Redirect URLs**, add a redirect URI
   (e.g., `https://your-app.com/oauth/callback`).
6. Under **Scopes**, add the following required scopes:
    - `crm.objects.leads.read`
    - `crm.objects.leads.write`
7. Click **Save changes**.

Store the Client ID and Client Secret securely. Do not commit them to source control: use environment variables or Ballerina's `configurable` feature with a `Config.toml` file.

## Step 4: Generate an OAuth 2.0 authorization code and refresh token

To obtain a refresh token using the Authorization Code flow:

1. Construct the following authorization URL, replacing the placeholders:

    ```
    https://app.hubspot.com/oauth/authorize?client_id=<YOUR_CLIENT_ID>&redirect_uri=<YOUR_REDIRECT_URI>&scope=crm.objects.leads.read%20crm.objects.leads.write
    ```

2. Open the URL in a browser. Log in to HubSpot and authorize the app.
3. HubSpot redirects to your redirect URI with a `code` query parameter. Copy the code.
4. Exchange the authorization code for tokens:

    ```
    POST https://api.hubapi.com/oauth/v1/token
    Content-Type: application/x-www-form-urlencoded

    grant_type=authorization_code
    &code=<AUTHORIZATION_CODE>
    &client_id=<YOUR_CLIENT_ID>
    &client_secret=<YOUR_CLIENT_SECRET>
    &redirect_uri=<YOUR_REDIRECT_URI>
    ```

5. The response includes an `access_token`, `refresh_token`, and `expires_in`. Save the
   `refresh_token`; it is used to obtain new access tokens automatically.

Use a tool like Postman or `curl` to perform the token exchange in step 4.
