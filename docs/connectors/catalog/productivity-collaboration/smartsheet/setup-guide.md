---
title: Setup Guide
---

# Setup Guide

This guide walks you through obtaining the API access token or OAuth 2.0 credentials required to use the Smartsheet connector.

## Prerequisites

- An active Smartsheet account. If you do not have one, [sign up for a free trial](https://www.smartsheet.com/try-it).

## Step 1: Generate an API access token

1. Log in to your Smartsheet account at [app.smartsheet.com](https://app.smartsheet.com).
2. Click your **Account** icon in the lower-left corner.
3. Select **Personal Settings** (or **Apps & Integrations** depending on your plan).
4. Under **API Access**, click **Generate new access token**.
5. Give the token a descriptive name (e.g., `Ballerina Integration`) and click **OK**.
6. Copy the generated token immediately: it will not be shown again.

Store your API access token securely. Do not commit it to source control. Use Ballerina's `configurable` feature and a `Config.toml` file to supply it at runtime.

API access tokens inherit the permissions of the user who generates them. Ensure the user has appropriate access to the sheets and workspaces you intend to manage.

## Step 2: Set up OAuth 2.0 (optional: for third-party apps)

If you are building an application that accesses Smartsheet on behalf of other users, use OAuth 2.0 instead of a personal access token:

1. Go to the [Smartsheet Developer Tools](https://developers.smartsheet.com/) portal.
2. Click **Create New App** under **Developer Tools**.
3. Fill in the required fields:
    - **App name**: A descriptive name for your application.
    - **App description**: Brief description of your integration.
    - **App URL**: Your application's URL.
    - **App contact/support**: Contact email.
    - **Redirect URL**: The callback URL for OAuth (e.g., `https://localhost/callback`).
4. Click **Save** to register the app.
5. Copy the **App client id** and **App secret**; these are your OAuth credentials.

For server-to-server integrations where you only access your own data, the API access token (Step 1) is simpler. Use OAuth 2.0 only when your application needs to act on behalf of other Smartsheet users.

## Step 3: Obtain a refresh token (OAuth 2.0 only)

1. Construct the authorization URL, replacing `<CLIENT_ID>` and `<REDIRECT_URL>`:

    ```
    https://app.smartsheet.com/b/authorize?response_type=code&client_id=<CLIENT_ID>&redirect_uri=<REDIRECT_URL>&scope=READ_SHEETS%20WRITE_SHEETS%20SHARE_SHEETS%20CREATE_SHEETS%20ADMIN_WORKSPACES
    ```

2. Open the URL in a browser and log in with your Smartsheet credentials.
3. Authorize the application when prompted.
4. After authorization, Smartsheet redirects to your callback URL with a `code` parameter. Copy the `code` value.
5. Exchange the code for tokens using a POST request:

    ```
    POST https://api.smartsheet.com/2.0/token
    Content-Type: application/x-www-form-urlencoded

    grant_type=authorization_code
    &code=<AUTHORIZATION_CODE>
    &client_id=<CLIENT_ID>
    &client_secret=<CLIENT_SECRET>
    &redirect_uri=<REDIRECT_URL>
    ```

6. The response contains `access_token`, `refresh_token`, `token_type`, and `expires_in`. Copy the `refresh_token`.

The Smartsheet token endpoint for refreshing tokens is `https://api.smartsheet.com/2.0/token`.
