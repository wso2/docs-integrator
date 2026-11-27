---
connector: true
connector_name: "zoom.meetings"
title: "Setup Guide"
description: "How to set up and configure the ballerinax/zoom.meetings connector."
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Setup Guide

To use the Zoom Meetings connector, you need an app in the Zoom Marketplace with the scopes for the operations you call, its client ID and client secret, and an OAuth 2.0 refresh token.

## Prerequisites

- A Zoom account. If you don't have one, [sign up](https://zoom.us/signup#/signup).
- Access to the [Zoom Marketplace](https://marketplace.zoom.us/)

## Step 1: Create a new app

1. Open the [Zoom Marketplace](https://marketplace.zoom.us/).
2. Select **Develop**, then **Build App**.

   <ThemedImage
       alt="Zoom Marketplace"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/communication/zoom.meetings/setup/build-app.png'),
           dark: useBaseUrl('/img/connectors/catalog/communication/zoom.meetings/setup/build-app.png'),
       }}
   />

3. Choose the **General App** app type, which supports user authorization with refresh tokens.

   <ThemedImage
       alt="App Type"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/communication/zoom.meetings/setup/general-app.png'),
           dark: useBaseUrl('/img/connectors/catalog/communication/zoom.meetings/setup/general-app.png'),
       }}
   />

4. Fill in the basic information and choose the **Admin-managed** option.

## Step 2: Configure OAuth settings

1. Note down the **Client ID** and **Client Secret** of the app.

   <ThemedImage
       alt="App Credentials"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/communication/zoom.meetings/setup/app-credentials.png'),
           dark: useBaseUrl('/img/connectors/catalog/communication/zoom.meetings/setup/app-credentials.png'),
       }}
   />

2. Add your application's redirect URI.
3. Add the scopes for the operations your application calls. Each operation lists the scopes it accepts in the API reference. For example, scheduling and listing meetings needs `meeting:write:meeting` and `meeting:read:list_meetings`, and looking up the user ID below needs `user:read:user`.

   <ThemedImage
       alt="App Scopes"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/communication/zoom.meetings/setup/app-scopes.png'),
           dark: useBaseUrl('/img/connectors/catalog/communication/zoom.meetings/setup/app-scopes.png'),
       }}
   />

## Step 3: Activate the app

1. Complete all the required information fields.
2. Activate the app. Zoom activates it once the required fields are filled correctly.

## Step 4: Get user authorization

1. Open the authorization URL in a browser, replacing `YOUR_CLIENT_ID` and `YOUR_REDIRECT_URI` with your own values.

   ```text
   https://zoom.us/oauth/authorize?response_type=code&client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI
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

2. Note the user ID in the response. API calls that take a user ID need it.

## Next steps

- [Action Reference](action-reference.md): Available operations
- [Example](example.md): Build an integration with the connector
