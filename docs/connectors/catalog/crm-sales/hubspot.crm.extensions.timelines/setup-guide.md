---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating a HubSpot developer app and obtaining the credentials required to use the HubSpot CRM Extensions Timelines connector.

## Prerequisites

- A HubSpot developer account. If you do not have one, [sign up for free](https://developers.hubspot.com/get-started).
- A HubSpot test account (sandbox) associated with your developer account.

## Create a HubSpot developer app

1. Log in to your [HubSpot Developer Account](https://app.hubspot.com/signup-hubspot/developers).
2. Navigate to **Apps** in the top navigation bar.
3. Click **Create app**.
4. Under **App Info**, provide a name for your app (e.g., `Ballerina Timelines Connector`).
5. Note the **App ID** displayed on the app settings page: you will need it for template operations.

## Configure OAuth 2.0 scopes

1. In your app settings, go to the **Auth** tab.
2. Under **Scopes**, add the following scopes:
    - **crm.objects.contacts.read**
    - **crm.objects.contacts.write**
    - **timeline** (for timeline events)
3. Set the **Redirect URL** to your callback URL (e.g., `https://localhost/callback`).
4. Copy the **Client ID** and **Client Secret** from the Auth tab.

The timeline scope is required for creating and managing timeline events on CRM records.

## Obtain OAuth 2.0 refresh token

1. Construct the authorization URL:

    ```
    https://app.hubspot.com/oauth/authorize?client_id=<YOUR_CLIENT_ID>&redirect_uri=<YOUR_REDIRECT_URI>&scope=crm.objects.contacts.read%20crm.objects.contacts.write%20timeline
    ```

2. Open the URL in a browser and select your test account to authorize.
3. After authorization, HubSpot redirects to your callback URL with a `code` parameter.
4. Exchange the code for tokens:

    ```
    POST https://api.hubapi.com/oauth/v1/token
    Content-Type: application/x-www-form-urlencoded

    grant_type=authorization_code
    &code=<AUTHORIZATION_CODE>
    &client_id=<YOUR_CLIENT_ID>
    &client_secret=<YOUR_CLIENT_SECRET>
    &redirect_uri=<YOUR_REDIRECT_URI>
    ```

5. Copy the `refresh_token` from the response.

Use a tool like Postman or curl to perform the token exchange.

## Obtain a private app access token (alternative)

If you prefer API key-based authentication using a private app:

1. In your HubSpot account, go to **Settings** > **Integrations** > **Private Apps**.
2. Click **Create a private app**.
3. Provide a name and description.
4. Under **Scopes**, add the required scopes (e.g., `timeline`, `crm.objects.contacts.read`).
5. Click **Create app** and copy the generated **Access Token**.

Private app tokens are used with the Bearer Token or API Keys authentication methods.

## Next steps

- [Actions Reference](actions.md): Available operations
