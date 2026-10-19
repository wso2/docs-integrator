---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating a HubSpot developer app and obtaining the OAuth 2.0 credentials required to use the HubSpot Marketing Campaigns connector.

## Prerequisites

- A HubSpot developer account. If you do not have one, [sign up for a free account](https://developers.hubspot.com/get-started).

## Step 1: Log in to the HubSpot developer portal

Log in to your [HubSpot developer account](https://developers.hubspot.com/).

## Step 2: Create a developer test account (optional)

Developer test accounts let you test apps and integrations without affecting real HubSpot data.

1. Select **Test accounts** in the left sidebar.

   <ThemedImage
       alt="Test accounts section"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/marketing-social/hubspot.marketing.campaigns/setup/testAccount.png'),
           dark: useBaseUrl('/img/connectors/catalog/marketing-social/hubspot.marketing.campaigns/setup/testAccount.png'),
       }}
   />

2. Select **Create developer test account**.

   <ThemedImage
       alt="Create developer test account"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/marketing-social/hubspot.marketing.campaigns/setup/developmentTestAccount.png'),
           dark: useBaseUrl('/img/connectors/catalog/marketing-social/hubspot.marketing.campaigns/setup/developmentTestAccount.png'),
       }}
   />

3. Provide a name and select **Create**.

   <ThemedImage
       alt="Name the test account"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/marketing-social/hubspot.marketing.campaigns/setup/createAccount.png'),
           dark: useBaseUrl('/img/connectors/catalog/marketing-social/hubspot.marketing.campaigns/setup/createAccount.png'),
       }}
   />

   The new account appears in the list.

   <ThemedImage
       alt="Test account portal"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/marketing-social/hubspot.marketing.campaigns/setup/testAccountPortal.png'),
           dark: useBaseUrl('/img/connectors/catalog/marketing-social/hubspot.marketing.campaigns/setup/testAccountPortal.png'),
       }}
   />

Developer test accounts are for development and testing only. Do not use them in production.

## Step 3: Create a HubSpot app

1. Navigate to **Apps** in the left sidebar and select **Create app**.

   <ThemedImage
       alt="Apps section"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/marketing-social/hubspot.marketing.campaigns/setup/appSection.png'),
           dark: useBaseUrl('/img/connectors/catalog/marketing-social/hubspot.marketing.campaigns/setup/appSection.png'),
       }}
   />

2. Enter a public app name and an optional description.

   <ThemedImage
       alt="App name and description"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/marketing-social/hubspot.marketing.campaigns/setup/namingApp.png'),
           dark: useBaseUrl('/img/connectors/catalog/marketing-social/hubspot.marketing.campaigns/setup/namingApp.png'),
       }}
   />

## Step 4: Configure authentication

1. Go to the **Auth** tab.

   <ThemedImage
       alt="Auth tab"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/marketing-social/hubspot.marketing.campaigns/setup/auth.png'),
           dark: useBaseUrl('/img/connectors/catalog/marketing-social/hubspot.marketing.campaigns/setup/auth.png'),
       }}
   />

2. Under **Scopes**, select **Add new scopes** and add:
   - `marketing.campaigns.read`
   - `marketing.campaigns.revenue.read`
   - `marketing.campaigns.write`

   <ThemedImage
       alt="Marketing scopes"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/marketing-social/hubspot.marketing.campaigns/setup/marketingScopes.png'),
           dark: useBaseUrl('/img/connectors/catalog/marketing-social/hubspot.marketing.campaigns/setup/marketingScopes.png'),
       }}
   />

3. Under **Redirect URL**, add your redirect URL and select **Create App**.

   <ThemedImage
       alt="Redirect URL"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/marketing-social/hubspot.marketing.campaigns/setup/redirectURL.png'),
           dark: useBaseUrl('/img/connectors/catalog/marketing-social/hubspot.marketing.campaigns/setup/redirectURL.png'),
       }}
   />

## Step 5: Get the client ID and client secret

In the **Auth** tab, copy the **Client ID** and **Client Secret**.

<ThemedImage
    alt="Client ID and client secret"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/marketing-social/hubspot.marketing.campaigns/setup/clientId_secretId.png'),
        dark: useBaseUrl('/img/connectors/catalog/marketing-social/hubspot.marketing.campaigns/setup/clientId_secretId.png'),
    }}
/>

## Step 6: Get the refresh token

1. Construct the authorization URL:

   ```
   https://app.hubspot.com/oauth/authorize?client_id=<YOUR_CLIENT_ID>&scope=<YOUR_SCOPES>&redirect_uri=<YOUR_REDIRECT_URI>
   ```

2. Open the URL in a browser and select your developer test account.

   <ThemedImage
       alt="Select account"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/marketing-social/hubspot.marketing.campaigns/setup/accountSelect.png'),
           dark: useBaseUrl('/img/connectors/catalog/marketing-social/hubspot.marketing.campaigns/setup/accountSelect.png'),
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

## What's next

- [Action reference](actions.md): Available operations
