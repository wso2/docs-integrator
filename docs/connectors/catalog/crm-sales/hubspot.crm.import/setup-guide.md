---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating a HubSpot app and obtaining the OAuth 2.0 credentials required to use the HubSpot CRM Import connector.

## Prerequisites

- A HubSpot account with admin access. If you do not have one, [sign up for a free HubSpot account](https://app.hubspot.com/signup).
- A HubSpot developer account. [Create one here](https://developers.hubspot.com/get-started) if you do not have one.

## Create a HubSpot app

1. Log in to your [HubSpot developer account](https://app.hubspot.com/developer).
2. Click **Apps** in the top navigation.
3. Click **Create app**.
4. Under **App Info**, fill in the **Public app name** (e.g., `Ballerina CRM Import`).
5. Optionally add a description and logo.

## Configure OAuth scopes

1. Navigate to the **Auth** tab of your app.
2. Under **Scopes**, add the following scope:
    - **crm.objects.import**: required for import operations.
3. Set the **Redirect URL** to `https://localhost` (or your own callback URL).
4. Note down the **Client ID** and **Client Secret** displayed on this page.

Store the Client ID and Client Secret securely. Do not commit them to source control. Use Ballerina's `configurable` feature and a `Config.toml` file to supply them at runtime.

## Install the app and authorize access

1. Construct the following authorization URL, replacing the placeholders:

    ```
    https://app.hubspot.com/oauth/authorize?client_id=<YOUR_CLIENT_ID>&redirect_uri=<YOUR_REDIRECT_URI>&scope=crm.objects.import
    ```

2. Open the URL in a browser and log in with your HubSpot account credentials.
3. Select the HubSpot account (portal) you want to connect.
4. Click **Grant access** when prompted.
5. After authorization, HubSpot redirects to your callback URL with a `code` query parameter. Copy the `code` value.

## Exchange the authorization code for tokens

Exchange the authorization code for access and refresh tokens using a POST request:

```
POST https://api.hubapi.com/oauth/v1/token
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code
&code=<AUTHORIZATION_CODE>
&client_id=<YOUR_CLIENT_ID>
&client_secret=<YOUR_CLIENT_SECRET>
&redirect_uri=<YOUR_REDIRECT_URI>
```

The response contains `access_token` and `refresh_token`. Copy the `refresh_token`: you will need it to configure the connector.

Use a tool like [Postman](https://www.postman.com/) or `curl` to perform the token exchange.

HubSpot access tokens expire after 6 hours. The connector automatically refreshes them using the refresh token.

## Next steps

- [Actions Reference](actions.md): Available operations
