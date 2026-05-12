---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating a Google Cloud Platform project and obtaining the OAuth 2.0 credentials required to use the Google Calendar connector.

## Prerequisites

- A Google account. If you do not have one, [sign up here](https://accounts.google.com/signup).
- Access to [Google Cloud Platform (GCP)](https://console.cloud.google.com/). If you do not have a GCP account, [sign up here](https://cloud.google.com/).

## Step 1: Create a Google cloud platform project

1. Open the [Google Cloud Platform console](https://console.cloud.google.com/).
2. Click on the project drop-down menu in the top navigation bar.
3. Select an existing project or click **New Project** to create a new one.
4. Enter a project name (e.g., `Ballerina Calendar Integration`) and click **Create**.

## Step 2: Enable the Google calendar API

1. In the GCP console, navigate to **APIs & Services > Library**.
2. Search for **Google Calendar API**.
3. Click on the **Google Calendar API** result and click **Enable**.

## Step 3: Configure the OAuth consent screen

1. Navigate to **APIs & Services > OAuth consent screen**.
2. Select **External** as the user type (or **Internal** if you are using Google Workspace and only need access within your organization).
3. Fill in the required fields:
   - **App name**: Enter a name (e.g., `Ballerina Calendar Connector`).
   - **User support email**: Select your email address.
   - **Developer contact information**: Enter your email address.
4. Click **Save and Continue**.
5. On the **Scopes** page, click **Add or Remove Scopes** and add the following scope:
   - `https://www.googleapis.com/auth/calendar`
6. Click **Save and Continue** through the remaining steps.

For production applications, you will need to complete the verification process. For development and testing, you can add test users on the OAuth consent screen.

## Step 4: Create OAuth client credentials

1. Navigate to **APIs & Services > Credentials**.
2. Click **Create Credentials** and select **OAuth client ID**.
3. Set the **Application type** to **Web application**.
4. Enter a name (e.g., `CalendarConnector`).
5. Under **Authorized redirect URIs**, add: `https://developers.google.com/oauthplayground`
6. Click **Create**.
7. Copy the **Client ID** and **Client Secret** from the dialog that appears.

Store the Client ID and Client Secret securely. Do not commit them to source control. Use Ballerina's `configurable` feature and a `Config.toml` file to supply them at runtime.

## Step 5: Obtain a refresh token

Use the [Google OAuth 2.0 Playground](https://developers.google.com/oauthplayground) to obtain tokens:

1. Open the [OAuth 2.0 Playground](https://developers.google.com/oauthplayground).
2. Click the gear icon (⚙️) in the top-right corner and check **Use your own OAuth credentials**.
3. Enter your **Client ID** and **Client Secret** from the previous step.
4. In the left panel under **Step 1: Select & authorize APIs**, find **Calendar API v3** and select the scope `https://www.googleapis.com/auth/calendar`.
5. Click **Authorize APIs** and sign in with your Google account. Grant the requested permissions.
6. In **Step 2: Exchange authorization code for tokens**, click **Exchange authorization code for tokens**.
7. Copy the **Refresh token** from the response.

The refresh URL for Google services is `https://oauth2.googleapis.com/token`.
