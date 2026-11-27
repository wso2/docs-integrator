---
connector: true
connector_name: "box"
title: "Setup Guide"
description: "How to set up and configure the ballerinax/box connector."
---

# Setup Guide

To use the Box connector, you need a Box account and a Box Platform application.

## Prerequisites

- A Box account with access to the [Box Developer Console](https://app.box.com/developers/console)

## Step 1: Create a Box application

1. Sign in to the [Box Developer Console](https://app.box.com/developers/console) and select **Create Platform App**.
2. Choose **Custom App** and select **User Authentication (OAuth 2.0)** as the authentication method.
3. Enter an application name and create the app.

## Step 2: Configure OAuth 2.0 settings

1. Open the **Configuration** tab of the app and note the **Client ID** and **Client Secret**.
2. Under **OAuth 2.0 Redirect URI**, add the redirect URI of your application, for example `http://localhost:8080/callback`.
3. Under **Application Scopes**, enable the scopes your integration needs, such as **Read all files and folders stored in Box** and **Write all files and folders stored in Box**.
4. Save the configuration. Changes to scopes require the app to be authorized again.

## Step 3: Obtain a refresh token

1. Send the user to the authorization URL, replacing `YOUR_CLIENT_ID` and `YOUR_REDIRECT_URI`:

    ```
    https://account.box.com/api/oauth2/authorize?response_type=code&client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI
    ```

2. After the user grants access, Box redirects to your redirect URI with an authorization `code`.
3. Exchange the code for tokens:

    ```bash
    curl -X POST https://api.box.com/oauth2/token \
      -d "grant_type=authorization_code" \
      -d "code=AUTHORIZATION_CODE" \
      -d "client_id=YOUR_CLIENT_ID" \
      -d "client_secret=YOUR_CLIENT_SECRET"
    ```

4. Copy the `refresh_token` from the response and use it to configure the connector.

:::note
The response contains an `access_token` and a `refresh_token`. Alternatively, a developer token from the **Configuration** tab can be used as a short-lived bearer token for testing.
:::

## Next steps

- [Action Reference](action-reference.md): Available operations
- [Example](example.md): Build an integration with the connector
