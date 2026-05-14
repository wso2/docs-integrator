---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating a HubSpot developer app and obtaining the OAuth 2.0 credentials required to use the HubSpot CRM Owners connector.

## Prerequisites

- A HubSpot developer account. If you do not have one, [sign up for a free account](https://developers.hubspot.com/get-started).

## Step 1: Log in to the HubSpot developer portal

Log in to your [HubSpot developer account](https://app.hubspot.com/).

## Step 2: Create a developer test account (optional)

Developer test accounts let you test apps and integrations without affecting real HubSpot data.

1. Select **Test accounts** in the left sidebar.

   ![Test accounts section](/img/connectors/catalog/crm-sales/hubspot.crm.owners/setup/test-account.png)

2. Select **Create developer test account**.

   ![Create developer test account](/img/connectors/catalog/crm-sales/hubspot.crm.owners/setup/create-test-account.png)

3. Provide a name and select **Create**.

   ![Name the test account](/img/connectors/catalog/crm-sales/hubspot.crm.owners/setup/create-account.png)

   The new account appears in the list.

   ![Test account portal](/img/connectors/catalog/crm-sales/hubspot.crm.owners/setup/test-account-portal.png)

Developer test accounts are for development and testing only. Do not use them in production.

## Step 3: Create a HubSpot app

1. Navigate to **Apps** in the left sidebar and select **Create app**.

   ![Create app](/img/connectors/catalog/crm-sales/hubspot.crm.owners/setup/create-app.png)

2. Enter a public app name and an optional description.

   ![App name and description](/img/connectors/catalog/crm-sales/hubspot.crm.owners/setup/app-name-desc.png)

## Step 4: Set up authentication

1. Go to the **Auth** tab.

   ![Configure authentication](/img/connectors/catalog/crm-sales/hubspot.crm.owners/setup/config-auth.png)

2. Under **Scopes**, select **Add new scopes** and add:
   - `crm.objects.owners.read`

   ![Add scopes](/img/connectors/catalog/crm-sales/hubspot.crm.owners/setup/add-scopes.png)

3. Under **Redirect URL**, add your redirect URL and select **Create App**.

   ![Redirect URL](/img/connectors/catalog/crm-sales/hubspot.crm.owners/setup/redirect-url.png)

## Step 5: Get the client ID and client secret

In the **Auth** tab, copy the **Client ID** and **Client Secret**.

![Client ID and client secret](/img/connectors/catalog/crm-sales/hubspot.crm.owners/setup/client-id-secret.png)

## Step 6: Get the refresh token

1. Construct the authorization URL:

   ```
   https://app.hubspot.com/oauth/authorize?client_id=<YOUR_CLIENT_ID>&scope=<YOUR_SCOPES>&redirect_uri=<YOUR_REDIRECT_URI>
   ```

2. Open the URL in a browser and select your developer test account.

   ![Select account](/img/connectors/catalog/crm-sales/hubspot.crm.owners/setup/account-select.png)

3. Select **Connect App**.

   ![Connect app](/img/connectors/catalog/crm-sales/hubspot.crm.owners/setup/connect.png)

4. Copy the authorization code from the redirect URL.

5. Exchange the code for tokens:

   ```bash
   curl --request POST \
     --url https://api.hubapi.com/oauth/v1/token \
     --header 'content-type: application/x-www-form-urlencoded' \
     --data 'grant_type=authorization_code&code=&redirect_uri=<YOUR_REDIRECT_URI>&client_id=<YOUR_CLIENT_ID>&client_secret=<YOUR_CLIENT_SECRET>'
   ```

6. Copy the `refresh_token` from the response.

Store the client ID, client secret, and refresh token securely. Use Ballerina's `configurable` feature and a `Config.toml` file to supply them at runtime.
