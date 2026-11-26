---
title: Setup Guide
---

# Setup Guide

To use the Zoom Scheduler connector, you need an app in the Zoom Marketplace with the Scheduler API scopes, its client ID and client secret, and an OAuth 2.0 refresh token.

## Prerequisites

- A Zoom account. If you don't have one, [sign up](https://zoom.us/signup#/signup).
- Access to the [Zoom Marketplace](https://marketplace.zoom.us/)

## Step 1: Create a new app

1. Open the [Zoom Marketplace](https://marketplace.zoom.us/).
2. Select **Develop**, then **Build App**.

   <ThemedImage
       alt="Zoom Marketplace"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/communication/zoom.scheduler/setup/zoom-marketplace.png'),
           dark: useBaseUrl('/img/connectors/catalog/communication/zoom.scheduler/setup/zoom-marketplace.png'),
       }}
   />

3. Choose the **General App** app type, which supports user authorization with refresh tokens.

   <ThemedImage
       alt="App type"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/communication/zoom.scheduler/setup/app-type.png'),
           dark: useBaseUrl('/img/connectors/catalog/communication/zoom.scheduler/setup/app-type.png'),
       }}
   />

4. Fill in the basic information.

## Step 2: Configure OAuth settings

1. Note down the **Client ID** and **Client Secret** of the app.

   <ThemedImage
       alt="App credentials"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/communication/zoom.scheduler/setup/app-credentials.png'),
           dark: useBaseUrl('/img/connectors/catalog/communication/zoom.scheduler/setup/app-credentials.png'),
       }}
   />

2. Add your application's redirect URI, for example `http://localhost:8080/callback`.

   <ThemedImage
       alt="Redirect URI"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/communication/zoom.scheduler/setup/redirect-URI.png'),
           dark: useBaseUrl('/img/connectors/catalog/communication/zoom.scheduler/setup/redirect-URI.png'),
       }}
   />

3. Add the `scheduler:read`, `scheduler:write` and `user:read` scopes.

   <ThemedImage
       alt="Zoom scopes"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/communication/zoom.scheduler/setup/zoom-scopes.png'),
           dark: useBaseUrl('/img/connectors/catalog/communication/zoom.scheduler/setup/zoom-scopes.png'),
       }}
   />

## Step 3: Activate the app

1. Complete all the required information.
2. Activate the app.

   <ThemedImage
       alt="Activate app"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/communication/zoom.scheduler/setup/activate-app.png'),
           dark: useBaseUrl('/img/connectors/catalog/communication/zoom.scheduler/setup/activate-app.png'),
       }}
   />

## Step 4: Get user authorization

1. Open the authorization URL in a browser, replacing `YOUR_CLIENT_ID` and `YOUR_REDIRECT_URI` with your own values.

   ```text
   https://zoom.us/oauth/authorize?response_type=code&client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&scope=scheduler:read scheduler:write user:read
   ```

2. Authorize the app. Zoom redirects to your callback URL with an authorization code.
3. Exchange the authorization code for tokens, replacing `CLIENT_ID`, `CLIENT_SECRET`, `AUTHORIZATION_CODE` and `YOUR_REDIRECT_URI` with your values.

   ```bash
   curl -X POST https://zoom.us/oauth/token \
     -H "Authorization: Basic $(echo -n 'CLIENT_ID:CLIENT_SECRET' | base64)" \
     -d "grant_type=authorization_code&code=AUTHORIZATION_CODE&redirect_uri=YOUR_REDIRECT_URI"
   ```

4. Copy the `refresh_token` from the response, which also contains an `access_token`.

## Step 5: Verify your setup

1. Call the Zoom API with the access token.

   ```bash
   curl -X GET "https://api.zoom.us/v2/users/me" \
     -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
   ```

2. Note the user ID in the response. Scheduler API calls need it.

## Next steps

- [Action Reference](action-reference.md): Available operations
- [Example](example.md): Build an integration with the connector
