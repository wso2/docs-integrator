---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating a HubSpot developer app and obtaining the OAuth 2.0 credentials required to use the HubSpot CRM Properties connector.

## Prerequisites

- A HubSpot account. If you do not have one, [sign up for a free HubSpot account](https://app.hubspot.com/signup).

## Create a HubSpot developer account

1. Go to the [HubSpot Developer Portal](https://developers.hubspot.com/).
2. Click **Create a developer account** if you don't already have one.
3. Complete the registration form and verify your email address.

## Create a HubSpot app

1. In the Developer Portal, navigate to **Apps** in the top navigation bar.
2. Click **Create app**.
3. Fill in the **App Info** tab with a name and description for your app.
4. Go to the **Auth** tab.
5. Under **Redirect URLs**, add a callback URL (e.g., `https://localhost/callback`).
6. Under **Scopes**, add the following scopes:
    - **crm.schemas.contacts.read**
    - **crm.schemas.contacts.write**
    - (Add other `crm.schemas.*` scopes for additional object types as needed.)
7. Click **Save**.

The required scopes depend on which CRM object types you intend to manage properties for. Add the appropriate read/write schema scopes for each object type.

## Get the client ID and client secret

1. In the **Auth** tab of your app, locate the **Client ID** and **Client Secret**.
2. Copy the **Client ID**; this is your `clientId`.
3. Copy the **Client Secret**; this is your `clientSecret`.

Store the Client ID and Client Secret securely. Do not commit them to source control. Use Ballerina's `configurable` feature and a `Config.toml` file to supply them at runtime.

## Obtain a refresh token

Use the HubSpot OAuth 2.0 Authorization Code flow to obtain a refresh token:

1. Construct the authorization URL, replacing `<YOUR_CLIENT_ID>` and `<YOUR_REDIRECT_URI>`:

    ```
    https://app.hubspot.com/oauth/authorize?client_id=<YOUR_CLIENT_ID>&redirect_uri=<YOUR_REDIRECT_URI>&scope=crm.schemas.contacts.read%20crm.schemas.contacts.write
    ```

2. Open the URL in a browser and log in with your HubSpot credentials.
3. Select the HubSpot account to authorize and click **Grant access**.
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
