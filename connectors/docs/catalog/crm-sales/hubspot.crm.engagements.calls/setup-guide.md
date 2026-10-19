---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating a HubSpot developer app and obtaining the OAuth 2.0 credentials required to use the HubSpot CRM Engagements Calls connector.

## Prerequisites

- A HubSpot developer account. If you do not have one, [sign up for a free account](https://developers.hubspot.com/get-started).

## Step 1: Log in to the HubSpot developer portal

Log in to your [HubSpot developer account](https://app.hubspot.com/).

## Step 2: Create a developer test account (optional)

Developer test accounts let you test apps and integrations without affecting real HubSpot data.

1. Select **Test accounts** in the left sidebar.

   <ThemedImage
       alt="Test accounts section"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.crm.engagements.calls/setup/1_test_account.png'),
           dark: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.crm.engagements.calls/setup/1_test_account.png'),
       }}
   />

2. Select **Create developer test account**.

   <ThemedImage
       alt="Create developer test account"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.crm.engagements.calls/setup/2_create_test_account.png'),
           dark: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.crm.engagements.calls/setup/2_create_test_account.png'),
       }}
   />

3. Provide a name and select **Create**.

   <ThemedImage
       alt="Name the test account"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.crm.engagements.calls/setup/3_create_account.png'),
           dark: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.crm.engagements.calls/setup/3_create_account.png'),
       }}
   />

4. The new account appears in the test accounts list.

   <ThemedImage
       alt="Test account portal"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.crm.engagements.calls/setup/4_test_account_portal.png'),
           dark: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.crm.engagements.calls/setup/4_test_account_portal.png'),
       }}
   />

Developer test accounts are for development and testing only. Do not use them in production.

## Step 3: Create a HubSpot app

1. Navigate to **Apps** in the left sidebar and select **Create app**.

   <ThemedImage
       alt="Create app"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.crm.engagements.calls/setup/5_create_app.png'),
           dark: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.crm.engagements.calls/setup/5_create_app.png'),
       }}
   />

2. Enter a public app name and description.

   <ThemedImage
       alt="App name and description"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.crm.engagements.calls/setup/6_app_name_description.png'),
           dark: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.crm.engagements.calls/setup/6_app_name_description.png'),
       }}
   />

## Step 4: Set up authentication

1. Go to the **Auth** tab.

   <ThemedImage
       alt="Configure authentication"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.crm.engagements.calls/setup/7_config_auth.png'),
           dark: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.crm.engagements.calls/setup/7_config_auth.png'),
       }}
   />

2. Scroll down to **Scopes** and select **Add new scopes**.

   <ThemedImage
       alt="Scopes section"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.crm.engagements.calls/setup/8_config_scopes.png'),
           dark: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.crm.engagements.calls/setup/8_config_scopes.png'),
       }}
   />

3. Add the following scopes:
   - `crm.objects.contacts.read`
   - `crm.objects.contacts.write`

   <ThemedImage
       alt="Add scopes"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.crm.engagements.calls/setup/9_add_scopes.png'),
           dark: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.crm.engagements.calls/setup/9_add_scopes.png'),
       }}
   />

4. Under **Redirect URL**, add your redirect URL and select **Create App**.

   <ThemedImage
       alt="Redirect URL"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.crm.engagements.calls/setup/10_redirect_url.png'),
           dark: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.crm.engagements.calls/setup/10_redirect_url.png'),
       }}
   />

## Step 5: Get the client ID and client secret

In the **Auth** tab, copy the **Client ID** and **Client Secret**.

<ThemedImage
    alt="Client ID and client secret"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.crm.engagements.calls/setup/11_client_id_secret.png'),
        dark: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.crm.engagements.calls/setup/11_client_id_secret.png'),
    }}
/>

## Step 6: Get the refresh token

1. Construct the authorization URL:

   ```
   https://app.hubspot.com/oauth/authorize?client_id=<YOUR_CLIENT_ID>&scope=<YOUR_SCOPES>&redirect_uri=<YOUR_REDIRECT_URI>
   ```

2. Open the URL in a browser, select your developer test account, and authorize the app.

   <ThemedImage
       alt="Auth config screen"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.crm.engagements.calls/setup/12-hubspot_auth_config_screen.png'),
           dark: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.crm.engagements.calls/setup/12-hubspot_auth_config_screen.png'),
       }}
   />

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
