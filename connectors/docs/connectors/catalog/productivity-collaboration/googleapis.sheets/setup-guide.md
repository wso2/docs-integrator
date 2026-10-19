---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating a Google Cloud Platform project, enabling the Google Sheets API, and obtaining the OAuth 2.0 credentials required to use the Google Sheets connector.

## Prerequisites

- A Google account. If you do not have one, [sign up here](https://accounts.google.com/signup).
- Access to the [Google Cloud Platform Console](https://console.cloud.google.com/).

## Step 1: Create a Google cloud platform project

1. Open the [Google Cloud Platform Console](https://console.cloud.google.com/).
2. Click **Select a project** in the top navigation bar and either select an existing project or click **New Project**.
3. Give your project a name (e.g., `Ballerina Sheets Integration`) and click **Create**.

## Step 2: Enable the Google sheets API

1. In the GCP Console, select your project.
2. Navigate to **APIs & Services** > **Library**.
3. Search for `Google Sheets API` and select it.
4. Click **Enable**.

## Step 3: Configure the OAuth consent screen

1. In the left sidebar, navigate to **APIs & Services** > **OAuth consent screen**.
2. Select **External** as the user type and click **Create**.
3. Fill in the required app information (App name, User support email, Developer contact email).
4. Add the necessary scopes for Google Sheets API (e.g., `https://www.googleapis.com/auth/spreadsheets`).
5. Save and continue through the remaining steps.

## Step 4: Create OAuth client credentials

1. In the left sidebar, click **Credentials**.
2. Click **+ CREATE CREDENTIALS** and choose **OAuth client ID**.
3. Set **Application type** to **Web application**.
4. Enter a name (e.g., `Ballerina Sheets Client`).
5. Under **Authorized redirect URIs**, add `https://developers.google.com/oauthplayground`.
6. Click **Create**.
7. Copy the **Client ID** and **Client Secret** from the confirmation dialog.

Store the Client ID and Client Secret securely. Do not commit them to source control. Use Ballerina's `configurable` feature and a `Config.toml` file to supply them at runtime.

## Step 5: Obtain access and refresh tokens

Use the [Google OAuth 2.0 Playground](https://developers.google.com/oauthplayground) to generate tokens:

1. Open the [OAuth 2.0 Playground](https://developers.google.com/oauthplayground).
2. Click the gear icon (settings) in the top-right corner and check **Use your own OAuth credentials**.
3. Enter your **Client ID** and **Client Secret**.
4. In the left panel, find and select the **Google Sheets API v4** scopes (e.g., `https://www.googleapis.com/auth/spreadsheets`).
5. Click **Authorize APIs** and sign in with your Google account.
6. Click **Exchange authorization code for tokens**.
7. Copy the **Refresh Token** from the response.

The access token expires after a short period. The refresh token is used by the connector to automatically obtain new access tokens, so make sure to save the refresh token.
