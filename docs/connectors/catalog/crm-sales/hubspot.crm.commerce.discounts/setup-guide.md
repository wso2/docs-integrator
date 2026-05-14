---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating a HubSpot developer app and obtaining the OAuth 2.0 credentials required to use the HubSpot CRM Commerce Discounts connector.

## Prerequisites

- A HubSpot developer account. If you do not have one, [sign up for a free account](https://developers.hubspot.com/get-started).

## Step 1: Log in to the HubSpot developer portal

Log in to your [HubSpot developer account](https://app.hubspot.com/).

## Step 2: Create a HubSpot app

1. Select **Create app** from the developer portal.

   ![Create public app](/img/connectors/catalog/crm-sales/hubspot.crm.commerce.discounts/setup/build_public_app.png)

2. Select **Create app** on the next screen.

   ![Create app](/img/connectors/catalog/crm-sales/hubspot.crm.commerce.discounts/setup/create_app.png)

3. Under **App Info**, enter a public app name and an optional logo and description.

   ![Enter app details](/img/connectors/catalog/crm-sales/hubspot.crm.commerce.discounts/setup/enter_app_details.png)

4. Go to the **Auth** tab and add your redirect URLs.

   ![Auth page](/img/connectors/catalog/crm-sales/hubspot.crm.commerce.discounts/setup/auth_page.png)

5. Select **Create app**.

## Step 3: Get the client ID and client secret

In the **Auth** tab, copy the **Client ID** and **Client Secret**.

![Client ID and client secret](/img/connectors/catalog/crm-sales/hubspot.crm.commerce.discounts/setup/client_id_secret.png)

## Step 4: Get the refresh token

1. In the **Auth** tab, add the required scopes based on the [HubSpot API reference](https://developers.hubspot.com/docs/reference/api):
   - `crm.objects.line_items.read`
   - `crm.objects.line_items.write`
   - `oauth`

   ![API reference for scopes](/img/connectors/catalog/crm-sales/hubspot.crm.commerce.discounts/setup/exmaple_api_reference.png)

2. Under **Sample install URL (OAuth)**, copy the full URL and open it in a browser.

3. Select the account to authorize.

   ![Choose account](/img/connectors/catalog/crm-sales/hubspot.crm.commerce.discounts/setup/account_chose.png)

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
