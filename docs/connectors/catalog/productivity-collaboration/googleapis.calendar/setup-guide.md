---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating a Google Cloud Platform project and obtaining the OAuth 2.0 credentials required to use the Google Calendar connector.

## Prerequisites

- A Google account. If you do not have one, [sign up here](https://accounts.google.com/signup).
- Access to [Google Cloud Platform (GCP)](https://console.cloud.google.com/).

## Step 1: Create a Google Cloud Platform project

1. Open the [Google Cloud Platform console](https://console.cloud.google.com/).
2. Select the project drop-down menu in the top navigation bar.
3. Select an existing project or select **New Project** to create a new one.
4. Enter a project name (for example, `Ballerina Calendar Integration`) and select **Create**.

   ![GCP console project view](/img/connectors/catalog/productivity-collaboration/googleapis.calendar/setup/gcp-console-project-view.png)

## Step 2: Enable the Google Calendar API

1. In the GCP console, navigate to **APIs & Services > Library**.
2. Search for **Google Calendar API**.
3. Select the **Google Calendar API** result and select **Enable**.

   ![Enable Calendar API](/img/connectors/catalog/productivity-collaboration/googleapis.calendar/setup/enable-calendar-api.png)

## Step 3: Configure the OAuth consent screen

1. Navigate to **APIs & Services > OAuth consent screen**.
2. Select **External** as the user type (or **Internal** if you are using Google Workspace and only need access within your organization).
3. Fill in the required fields:
   - **App name**: Enter a name (for example, `Ballerina Calendar Connector`).
   - **User support email**: Select your email address.
   - **Developer contact information**: Enter your email address.
4. Select **Save and Continue**.
5. On the **Scopes** page, select **Add or Remove Scopes** and add:
   - `https://www.googleapis.com/auth/calendar`
6. Select **Save and Continue** through the remaining steps.

   ![Configure consent screen](/img/connectors/catalog/productivity-collaboration/googleapis.calendar/setup/consent-screen.png)

For production applications, you need to complete the verification process. For development and testing, you can add test users on the OAuth consent screen.

## Step 4: Create OAuth client credentials

1. Navigate to **APIs & Services > Credentials**.
2. Select **Create Credentials** and select **OAuth client ID**.
3. Set the **Application type** to **Web application**.
4. Enter a name (for example, `CalendarConnector`).
5. Under **Authorized redirect URIs**, add: `https://developers.google.com/oauthplayground`
6. Select **Create**.
7. Copy the **Client ID** and **Client Secret** from the dialog that appears.

   ![Create credentials](/img/connectors/catalog/productivity-collaboration/googleapis.calendar/setup/create-credentials.png)

Store the Client ID and Client Secret securely. Do not commit them to source control. Use Ballerina's `configurable` feature and a `Config.toml` file to supply them at runtime.

## Step 5: Obtain a refresh token

1. Open the [Google OAuth 2.0 Playground](https://developers.google.com/oauthplayground).
2. Select the gear icon in the top-right corner and check **Use your own OAuth credentials**.
3. Enter your **Client ID** and **Client Secret**.

   ![OAuth Playground settings](/img/connectors/catalog/productivity-collaboration/googleapis.calendar/setup/oauth-playground.png)

4. In the left panel under **Step 1: Select & authorize APIs**, find **Calendar API v3** and select the scope `https://www.googleapis.com/auth/calendar`.
5. Select **Authorize APIs** and sign in with your Google account. Grant the requested permissions.

   ![Authorize Calendar APIs](/img/connectors/catalog/productivity-collaboration/googleapis.calendar/setup/authorize-calendar-apis.png)

6. In **Step 2: Exchange authorization code for tokens**, select **Exchange authorization code for tokens**.
7. Copy the **Refresh token** from the response.

   ![Exchange tokens](/img/connectors/catalog/productivity-collaboration/googleapis.calendar/setup/exchange-tokens.png)

The refresh URL for Google services is `https://oauth2.googleapis.com/token`.

## What's next

- [Action reference](actions.md): Available operations
