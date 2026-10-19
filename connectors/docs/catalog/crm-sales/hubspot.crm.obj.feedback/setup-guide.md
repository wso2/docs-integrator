---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating a HubSpot Private App and obtaining the access token required to authenticate with the HubSpot Feedback Submissions API.

## Prerequisites

- A HubSpot account. If you do not have one, [sign up for a free account](https://app.hubspot.com/signup).

## Step 1: Navigate to private apps

1. Log in to your HubSpot account.
2. Click the **Settings** gear icon in the top navigation bar.
3. In the left sidebar, navigate to **Integrations** → **Private Apps**.

## Step 2: Create a new private app

1. Click **Create a private app**.
2. On the **Basic Info** tab, enter a name for your app (e.g., `Ballerina Feedback Connector`)
   and an optional description.

## Step 3: Configure required scopes

1. Click the **Scopes** tab.
2. In the search box, type `feedback` to filter relevant scopes.
3. Under **CRM**, locate and enable the following scope:
    - `crm.objects.feedback_submissions.read`: required to read feedback submissions.
4. If your integration also needs to create or modify submissions, enable:
    - `crm.objects.feedback_submissions.write`

HubSpot's Feedback Submissions endpoints are primarily read-only. Write operations may be restricted depending on your HubSpot subscription and the specific survey type.

## Step 4: Create the app and copy the access token

1. Click **Create app** in the top-right corner.
2. Review the scope summary in the confirmation dialog and click **Continue creating**.
3. On the app detail page, click **Show token** to reveal your private app access token.
4. Copy the token; this is the value you will use as the `privateApp` credential in your connector configuration.

Store your private app token securely. Do not commit it to source control.
Use Ballerina's `configurable` feature and a `Config.toml` file to supply it at runtime.

## Step 5: Set up OAuth 2.0 (optional: for third-party integrations)

If you are building a third-party integration that acts on behalf of HubSpot customers,
use OAuth 2.0 instead of a private app token:

1. Go to the [HubSpot Developer Portal](https://developers.hubspot.com/) and create a developer account.
2. Under **Apps**, click **Create app**.
3. On the **Auth** tab, note the **Client ID** and **Client Secret**.
4. Add the required scopes under **Scopes**: `crm.objects.feedback_submissions.read`.
5. Set a **Redirect URL** for your application (e.g., `https://your-app.example.com/oauth/callback`).
6. Direct users through the HubSpot OAuth authorization flow:
    ```
    https://app.hubspot.com/oauth/authorize
      ?client_id=<YOUR_CLIENT_ID>
      &scope=crm.objects.feedback_submissions.read
      &redirect_uri=<YOUR_REDIRECT_URI>
    ```
7. Exchange the returned authorization code for an access token and refresh token via:
    ```
    POST https://api.hubapi.com/oauth/v1/token
    Content-Type: application/x-www-form-urlencoded

    grant_type=authorization_code
    &code=<AUTH_CODE>
    &client_id=<YOUR_CLIENT_ID>
    &client_secret=<YOUR_CLIENT_SECRET>
    &redirect_uri=<YOUR_REDIRECT_URI>
    ```
8. Copy the `refresh_token` from the response for use in your connector configuration.

Use a tool like Postman or curl to perform the token exchange in step 7.
