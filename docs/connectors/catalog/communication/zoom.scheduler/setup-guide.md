---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating a Zoom app on the Zoom Marketplace and obtaining the OAuth credentials required to use the Zoom Scheduler connector.

## Step 1: Create a new app

1. Open the [Zoom Marketplace](https://marketplace.zoom.us/).
2. Select **Develop** → **Build App**.

   ![Zoom Marketplace](/img/connectors/catalog/communication/zoom.scheduler/setup/zoom-marketplace.png)

3. Choose **General App** as the app type (for user authorization with refresh tokens).

   ![App type](/img/connectors/catalog/communication/zoom.scheduler/setup/app-type.png)

4. Fill in the basic information.

## Step 2: Configure OAuth settings

1. In your app's credentials, note down the **Client ID** and **Client Secret**.

   ![App credentials](/img/connectors/catalog/communication/zoom.scheduler/setup/app-credentials.png)

2. Set your **Redirect URI** (for example, `http://localhost:8080/callback`).

   ![Redirect URI](/img/connectors/catalog/communication/zoom.scheduler/setup/redirect-URI.png)

3. Add the following scopes for the Scheduler API: `scheduler:read`, `scheduler:write`, and `user:read`.

   ![Zoom scopes](/img/connectors/catalog/communication/zoom.scheduler/setup/zoom-scopes.png)

## Step 3: Activate the app

1. Complete all required information fields.
2. Select **Activate** to publish the app.

   ![Activate app](/img/connectors/catalog/communication/zoom.scheduler/setup/activate-app.png)

## Step 4: Get user authorization

1. Construct the authorization URL (replace `YOUR_CLIENT_ID` and `YOUR_REDIRECT_URI`):

   ```
   https://zoom.us/oauth/authorize?response_type=code&client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&scope=scheduler:read scheduler:write user:read
   ```

2. Open the URL in a browser and authorize the app. Zoom redirects to your callback URL with an authorization code.

3. Exchange the authorization code for tokens:

   ```bash
   curl -X POST https://zoom.us/oauth/token \
     -H "Authorization: Basic $(echo -n 'CLIENT_ID:CLIENT_SECRET' | base64)" \
     -d "grant_type=authorization_code&code=AUTHORIZATION_CODE&redirect_uri=YOUR_REDIRECT_URI"
   ```

   The response includes both `access_token` and `refresh_token`.

## Step 5: Verify your setup

```bash
curl -X GET "https://api.zoom.us/v2/users/me" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

This returns the user ID needed for API calls.
