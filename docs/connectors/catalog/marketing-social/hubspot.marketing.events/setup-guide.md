---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating a HubSpot developer app and obtaining the OAuth 2.0 credentials required to use the HubSpot Marketing Events connector.

## Prerequisites

- A HubSpot developer account. If you do not have one, [sign up for a free account](https://developers.hubspot.com/get-started).

## Step 1: Log in to the HubSpot developer portal

Log in to your [HubSpot developer account](https://app.hubspot.com/).

## Step 2: Create a developer test account (optional)

Developer test accounts let you test apps and integrations without affecting real HubSpot data.

1. Select **Test accounts** in the left sidebar.

   ![Developer portal](/img/connectors/catalog/marketing-social/hubspot.marketing.events/setup/test_acc_1.png)

2. Select **Create developer test account**.

   ![Create test account](/img/connectors/catalog/marketing-social/hubspot.marketing.events/setup/test_acc_2.png)

3. Provide a name and select **Create**.

   ![Name the test account](/img/connectors/catalog/marketing-social/hubspot.marketing.events/setup/test_acc_3.png)

Developer test accounts are for development and testing only. Do not use them in production.

## Step 3: Create a HubSpot app

1. Navigate to **Apps** and select **Create App**.

   ![Create app](/img/connectors/catalog/marketing-social/hubspot.marketing.events/setup/create_app_1.png)

2. Provide the app name and description.

## Step 4: Configure authentication

1. Go to the **Auth** tab.

   ![Auth tab](/img/connectors/catalog/marketing-social/hubspot.marketing.events/setup/create_app_2.png)

2. Under **Scopes**, select **Add new scope** and add:
   - `crm.objects.marketing_events.read`
   - `crm.objects.marketing_events.write`

   ![Set scope](/img/connectors/catalog/marketing-social/hubspot.marketing.events/setup/scope_set.png)

3. Add your redirect URI and select **Create App**.

   ![Create app with redirect](/img/connectors/catalog/marketing-social/hubspot.marketing.events/setup/create_app_final.png)

## Step 5: Get the client ID and client secret

In the **Auth** section, copy the **Client ID** and **Client Secret**.

![Get credentials](/img/connectors/catalog/marketing-social/hubspot.marketing.events/setup/get_credentials.png)

## Step 6: Get the refresh token

1. Construct the authorization URL:

   ```
   https://app.hubspot.com/oauth/authorize?client_id=<YOUR_CLIENT_ID>&scope=<YOUR_SCOPES>&redirect_uri=<YOUR_REDIRECT_URI>
   ```

2. Open the URL in a browser and select your developer test account.

   ![Select account to install app](/img/connectors/catalog/marketing-social/hubspot.marketing.events/setup/install_app.png)

3. Copy the authorization code from the redirect URL.

4. Exchange the code for tokens:

   ```bash
   curl --request POST \
     --url https://api.hubapi.com/oauth/v1/token \
     --header 'content-type: application/x-www-form-urlencoded' \
     --data 'grant_type=authorization_code&code=&redirect_uri=<YOUR_REDIRECT_URI>&client_id=<YOUR_CLIENT_ID>&client_secret=<YOUR_CLIENT_SECRET>'
   ```

5. Copy the `refresh_token` from the response.

Store the client ID, client secret, and refresh token securely. Use Ballerina's `configurable` feature and a `Config.toml` file to supply them at runtime.

## Step 7: Get a developer API key (optional)

Some Marketing Events API calls for managing app settings require a developer API key in addition to OAuth.

1. In your HubSpot developer account, navigate to **Apps**.

   ![Apps section](/img/connectors/catalog/marketing-social/hubspot.marketing.events/setup/api_key_1.png)

2. Select **HubSpot API key** in the left sidebar.

   ![API key section](/img/connectors/catalog/marketing-social/hubspot.marketing.events/setup/api_key_2.png)

3. Select **Generate API key** (or copy your existing key).

   ![Generate API key](/img/connectors/catalog/marketing-social/hubspot.marketing.events/setup/api_key_3.png)

## What's next

- [Action reference](actions.md): Available operations
