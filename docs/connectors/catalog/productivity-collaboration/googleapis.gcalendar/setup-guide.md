---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating a Google Cloud project, enabling the Google Calendar API, and obtaining the OAuth 2.0 credentials required to use the connector.

## Prerequisites

- A Google account. If you do not have one, [create a free Google account](https://accounts.google.com/signup).
- A Google Cloud Platform (GCP) account with billing enabled (free tier is sufficient for the Calendar API).

## Step 1: Create a Google cloud platform project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Click the project drop-down at the top of the page and select **New Project**.
3. Enter a **Project Name** (e.g., `Ballerina Calendar Integration`) and click **Create**.
4. Once created, select the new project from the drop-down to make it the active project.

## Step 2: Enable the Google calendar API

1. In the Google Cloud Console, open the left navigation menu and go to **APIs & Services > Library**.
2. Search for `Google Calendar API`.
3. Click the **Google Calendar API** result, then click **Enable**.

## Step 3: Configure the OAuth consent screen

1. In the left navigation menu, go to **APIs & Services > OAuth consent screen**.
2. Select **External** as the user type (or **Internal** if your account is a Google Workspace account), then click **Create**.
3. Fill in the required fields:
    - **App name**: Enter a name (e.g., `Ballerina Calendar App`).
    - **User support email**: Select your email address.
    - **Developer contact information**: Enter your email address.
4. Click **Save and Continue** through the Scopes and Test Users screens.
5. On the Summary screen, click **Back to Dashboard**.

If your app is in **Testing** mode, only explicitly added test users can authorize it. Add your Google account email under **Test Users** if needed.

## Step 4: Create OAuth 2.0 client ID credentials

1. In the left navigation menu, go to **APIs & Services > Credentials**.
2. Click **+ Create Credentials** and select **OAuth client ID**.
3. Under **Application type**, select **Web application**.
4. Enter a name (e.g., `Ballerina Calendar Client`).
5. Under **Authorized redirect URIs**, click **+ Add URI** and add:
    ```
    https://developers.google.com/oauthplayground
    ```
6. Click **Create**.
7. A dialog displays your **Client ID** and **Client Secret**; copy and save both values securely.

Store the Client ID and Client Secret securely. Do not commit them to source control. Use Ballerina's `configurable` feature and a `Config.toml` file to supply them at runtime.

## Step 5: Obtain a refresh token via OAuth 2.0 playground

1. Go to the [OAuth 2.0 Playground](https://developers.google.com/oauthplayground).
2. Click the settings icon (gear icon) in the top-right corner.
3. Check **Use your own OAuth credentials** and enter your **Client ID** and **Client Secret**.
4. Close the settings panel.
5. In the left panel under **Step 1**, find and select the following scope:
    ```
    https://www.googleapis.com/auth/calendar
    ```
6. Click **Authorize APIs** and sign in with your Google account when prompted.
7. After authorization, click **Exchange authorization code for tokens** in **Step 2**.
8. Copy the **Refresh token** value from the response.

The `refreshUrl` defaults to `https://accounts.google.com/o/oauth2/token` in the connector, so you do not need to set it explicitly unless you use a custom token endpoint.
