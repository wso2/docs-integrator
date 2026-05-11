---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating a Zoom Marketplace app and obtaining the OAuth 2.0 credentials required to use the Zoom Scheduler connector.

## Prerequisites

- An active Zoom account with Zoom Scheduler enabled. If you do not have one, sign up at https://zoom.us.

## Step 1: Create a general app in the Zoom marketplace

1. Go to the [Zoom Marketplace](https://marketplace.zoom.us/) and sign in with your Zoom account.
2. Click **Develop** in the top navigation bar and select **Build App**.
3. Choose **General App** as the app type and click **Create**.
4. Enter a name for your app (e.g., `Ballerina Zoom Scheduler`) and click **Create**.

## Step 2: Configure OAuth redirect URI

1. In your app's settings, navigate to the **App Credentials** section.
2. Under **Redirect URL for OAuth**, add a redirect URI. For testing you can use:
    ```
    https://zoom.us/oauth/callback
    ```
3. Click **Continue** or **Save**.

The redirect URI must match exactly when performing the OAuth authorization flow. For production, use a URI pointing to your own service.

## Step 3: Add required OAuth scopes

1. Navigate to the **Scopes** section of your app settings.
2. Click **Add Scopes** and search for and add the following scopes:
    - `scheduler:read`: Read access to schedules and availability
    - `scheduler:write`: Write access to create and modify schedules
    - `user:read`: Read access to user profile information
3. Click **Done** and then **Continue**.

## Step 4: Get your client ID and client secret

1. Navigate to the **App Credentials** section of your app.
2. Copy the **Client ID**; you will use this as `clientId`.
3. Copy the **Client Secret**; you will use this as `clientSecret`.

Store your Client ID and Client Secret securely. Do not commit them to source control.
Use Ballerina's `configurable` feature and a `Config.toml` file to supply them at runtime.

## Step 5: Obtain an OAuth refresh token

Use the Zoom OAuth 2.0 Authorization Code flow to obtain a refresh token:

1. Construct the following authorization URL, replacing `<YOUR_CLIENT_ID>` and `<YOUR_REDIRECT_URI>`:

    ```
    https://zoom.us/oauth/authorize?response_type=code&client_id=<YOUR_CLIENT_ID>&redirect_uri=<YOUR_REDIRECT_URI>
    ```

2. Open the URL in a browser and log in with your Zoom credentials.
3. Click **Allow** to authorize the app.
4. Zoom redirects to your redirect URI with a `code` query parameter. Copy the `code` value.
5. Exchange the authorization code for tokens by making a POST request:

    ```
    POST https://zoom.us/oauth/token
    Authorization: Basic base64(<CLIENT_ID>:<CLIENT_SECRET>)
    Content-Type: application/x-www-form-urlencoded

    grant_type=authorization_code
    &code=<AUTHORIZATION_CODE>
    &redirect_uri=<YOUR_REDIRECT_URI>
    ```

6. The response contains `access_token`, `refresh_token`, and `expires_in`. Copy the `refresh_token`.

Use a tool like Postman or curl to perform the token exchange in step 5. The Basic Authorization header value is the base64 encoding of `clientId:clientSecret`.

## Step 6: Find your Zoom user ID

Many API operations require a `userId`. You can obtain your user ID by calling the
Zoom API `/users/me` endpoint after authenticating:

```
GET https://api.zoom.us/v2/users/me
Authorization: Bearer <ACCESS_TOKEN>
```

The response contains your `id` field: this is your `userId`.

You can also use the string `"me"` as the userId value in most Zoom API calls to refer to the authenticated user.
