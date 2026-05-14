---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating a HubSpot developer app and obtaining the OAuth 2.0 credentials and developer API key required to use the HubSpot Automation Actions connector.

## Prerequisites

- A HubSpot developer account. If you do not have one, [sign up for a free account](https://developers.hubspot.com/get-started).
- A HubSpot account with a **Professional** or higher plan (Marketing Hub, Sales Hub, or Service Hub) to use Automation Actions.

## Step 1: Log in to the HubSpot developer portal

Log in to your [HubSpot developer account](https://app.hubspot.com/).

## Step 2: Create a HubSpot app

1. Navigate to **Apps** in the top navigation bar.
2. Select **Create app** and provide a name and optional description.

## Step 3: Configure the OAuth settings

1. Go to the **Auth** tab of your app.

   ![Auth tab](/img/connectors/catalog/crm-sales/hubspot.automation.actions/setup/auth.png)

2. Under **Redirect URLs**, add your redirect URL.

   ![Add redirect URL](/img/connectors/catalog/crm-sales/hubspot.automation.actions/setup/redirect_url.png)

3. Under **Scopes**, add the `automation` scope using the **Add new scopes** button.

   ![Add scopes](/img/connectors/catalog/crm-sales/hubspot.automation.actions/setup/scopes.png)

4. Select **Save**.

   ![Save app](/img/connectors/catalog/crm-sales/hubspot.automation.actions/setup/save.png)

## Step 4: Get the access token

1. Copy the app installation URL from the **Auth** tab and open it in a browser.

   ![Copy install URL](/img/connectors/catalog/crm-sales/hubspot.automation.actions/setup/redirect.png)

2. Select your developer test account to authorize the app. An authorization code is displayed in the browser.

   ![Authorization code](/img/connectors/catalog/crm-sales/hubspot.automation.actions/setup/authorization_code.png)

3. Exchange the code for tokens:

   ```bash
   curl --request POST \
     --url https://api.hubapi.com/oauth/v1/token \
     --header 'content-type: application/x-www-form-urlencoded' \
     --data 'grant_type=authorization_code&code=&redirect_uri=<YOUR_REDIRECT_URI>&client_id=<YOUR_CLIENT_ID>&client_secret=<YOUR_CLIENT_SECRET>'
   ```

4. Copy the `refresh_token` from the response.

## Step 5: Get the developer API key

The Definitions, Functions, and Revisions endpoints require a developer API key. Follow the [HubSpot developer tools overview](https://developers.hubspot.com/docs/api/developer-tools-overview#developer-api-keys) to obtain one.

## Step 6: Note your app ID

Your **App ID** is displayed on the app settings page and in the developer portal URL. It is required as a path parameter for most Automation Actions API operations.

Store the client ID, client secret, refresh token, and developer API key securely. Use Ballerina's `configurable` feature and a `Config.toml` file to supply them at runtime.
