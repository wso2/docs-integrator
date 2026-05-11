---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating a Zoom OAuth app on the Zoom App Marketplace and obtaining the credentials required to authenticate the Zoom Meetings connector.

## Prerequisites

- A Zoom account with Pro, Business, or Enterprise plan (recommended for full API access). [Sign up at zoom.us](https://zoom.us/signup).
- Access to the [Zoom App Marketplace](https://marketplace.zoom.us).

## Step 1: Create a Zoom OAuth app

1. Go to the [Zoom App Marketplace](https://marketplace.zoom.us) and sign in with your Zoom account.
2. Click **Develop** in the top-right navigation menu and select **Build App**.
3. In the app type selector, choose **OAuth** and click **Create**.
4. Enter a name for your app (e.g., `Ballerina Zoom Connector`).
5. Select **Account-level app** if you want the app to act on behalf of all users in your account, or **User-managed** for individual user authorization.
6. Click **Create** to proceed to the app configuration page.

## Step 2: Configure OAuth redirect URI and scopes

1. In your app's **App Credentials** tab, locate your **Client ID** and **Client Secret**; you will need these later.
2. Under **Redirect URL for OAuth**, add your callback URL (e.g., `https://your-app.example.com/callback`). For local testing you may use `https://zoom.us/oauth/token`.
3. Navigate to the **Scopes** section and add the following scopes based on the operations you need:
    - `meeting:read:admin` and `meeting:write:admin`: read and manage meetings
    - `recording:read:admin`: access cloud recordings
    - `report:read:admin`: read meeting reports
    - `user:read:admin`: read user information
    - `webinar:read:admin` and `webinar:write:admin`: manage webinars (if needed)
4. Click **Save** after adding scopes.

Add only the scopes required for your use case following the principle of least privilege. The exact scopes needed depend on which API operations your integration calls.

## Step 3: Generate a refresh token via the authorization code flow

1. Construct the authorization URL using your **Client ID** and **Redirect URI**:

    ```
    https://zoom.us/oauth/authorize?response_type=code&client_id=<YOUR_CLIENT_ID>&redirect_uri=<YOUR_REDIRECT_URI>
    ```

2. Open the URL in a browser and authorize the app when prompted.
3. After authorization, Zoom redirects to your redirect URI with a `code` query parameter. Copy the authorization code from the URL.
4. Exchange the authorization code for tokens by sending a POST request:

    ```
    POST https://zoom.us/oauth/token
    Authorization: Basic base64(<CLIENT_ID>:<CLIENT_SECRET>)
    Content-Type: application/x-www-form-urlencoded

    grant_type=authorization_code
    &code=<AUTHORIZATION_CODE>
    &redirect_uri=<YOUR_REDIRECT_URI>
    ```

5. The JSON response contains `access_token`, `refresh_token`, `token_type`, and `expires_in`. Copy the `refresh_token`.

Use a tool like [Postman](https://www.postman.com/) or `curl` to perform the token exchange in step 4.

## Step 4: Determine your user ID

Many API operations require a `userId` parameter identifying the Zoom user to act on behalf of.
You can use any of the following forms:

- Your Zoom user ID: a 22-character alphanumeric string found in your profile settings
- Your Zoom account email address
- The special value `me`: refers to the authenticated OAuth user (simplest for single-user integrations)

To look up your user ID, navigate to **Profile** in the Zoom web portal and copy the value shown under your profile picture.

Use `me` as the `userId` in most API calls when acting as the authenticated user. This avoids the need to look up and store your actual user ID.
