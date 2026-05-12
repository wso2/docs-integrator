---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating a HubSpot app and obtaining the OAuth 2.0 credentials required to use the HubSpot Marketing Emails connector.

## Prerequisites

- A HubSpot developer account. If you do not have one, [sign up for free](https://developers.hubspot.com/get-started).
- A HubSpot account with Marketing Hub access to manage marketing emails.

## Create a HubSpot developer app

1. Log in to the [HubSpot Developer Portal](https://developers.hubspot.com/).
2. Navigate to **Apps** in the top navigation.
3. Click **Create app**.
4. Fill in the **App Info** tab with a name and description for your application.

## Configure OAuth scopes

1. Go to the **Auth** tab of your app.
2. Under **Scopes**, add the following required scopes:
    - **content**; read and write access to marketing emails
3. Note down the **Client ID** and **Client Secret** displayed at the top of the Auth tab.

For publish and send operations, you may need additional scopes such as `marketing-email` depending on your HubSpot subscription tier.

## Install the app on your HubSpot account

1. Copy the **Install URL** from the Auth tab, or construct it manually:

    ```
    https://app.hubspot.com/oauth/authorize?client_id=<YOUR_CLIENT_ID>&redirect_uri=<YOUR_REDIRECT_URI>&scope=content
    ```

2. Open the URL in a browser and select the HubSpot account to install the app on.
3. Click **Connect app** to authorize.
4. After authorization, HubSpot redirects to your redirect URI with a `code` query parameter. Copy the `code` value.

## Generate a refresh token

Exchange the authorization code for tokens using a POST request:

```
POST https://api.hubapi.com/oauth/v1/token
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code
&code=<AUTHORIZATION_CODE>
&client_id=<YOUR_CLIENT_ID>
&client_secret=<YOUR_CLIENT_SECRET>
&redirect_uri=<YOUR_REDIRECT_URI>
```

The response contains `access_token` and `refresh_token`. Copy the `refresh_token` for use with the connector.

Store the Client ID, Client Secret, and Refresh Token securely. Do not commit them to source control. Use Ballerina's `configurable` feature and a `Config.toml` file to supply them at runtime.

## Next steps

- [Actions Reference](actions.md) - Available operations
