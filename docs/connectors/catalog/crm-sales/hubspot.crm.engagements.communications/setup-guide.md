---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating a HubSpot developer app and obtaining the OAuth 2.0 credentials required to use the HubSpot CRM Engagements Communications connector.

## Prerequisites

- A HubSpot account with CRM access. If you do not have one, [sign up for a free HubSpot account](https://app.hubspot.com/signup).

## Create a HubSpot developer account

1. Go to the [HubSpot Developer Portal](https://developers.hubspot.com/).
2. Click **Create a developer account** if you do not already have one.
3. Complete the registration process and log in to the developer portal.

## Create a HubSpot app

1. In the developer portal, navigate to **Apps** in the top navigation.
2. Click **Create app**.
3. Fill in the **App info** tab with a name and description for your app.
4. Go to the **Auth** tab.
5. Under **Redirect URLs**, add your callback URL (e.g., `https://localhost/callback`).
6. Under **Scopes**, add the following required scopes:
    - `crm.objects.contacts.read`
    - `crm.objects.contacts.write`
7. Click **Save**.

The required scopes may vary depending on which CRM objects you plan to associate with communications. Add additional scopes as needed for your use case.

## Get the client ID and client secret

1. On the **Auth** tab of your app, locate the **Client ID** and **Client Secret** fields.
2. Copy the **Client ID**; this is your `clientId`.
3. Copy the **Client Secret**; this is your `clientSecret`.

Store the Client ID and Client Secret securely. Do not commit them to source control.
Use Ballerina's `configurable` feature and a `Config.toml` file to supply them at runtime.

## Authorize and generate a refresh token

Use the HubSpot OAuth 2.0 Authorization Code flow to obtain a refresh token:

1. Construct the following URL, replacing `<YOUR_CLIENT_ID>`, `<YOUR_REDIRECT_URI>`, and `<YOUR_SCOPES>`:

    ```
    https://app.hubspot.com/oauth/authorize?client_id=<YOUR_CLIENT_ID>&redirect_uri=<YOUR_REDIRECT_URI>&scope=<YOUR_SCOPES>
    ```

2. Open the URL in a browser and log in with your HubSpot account credentials.
3. Select the HubSpot account you want to connect and click **Choose Account**.
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

- [Actions Reference](actions.md): Available operations
