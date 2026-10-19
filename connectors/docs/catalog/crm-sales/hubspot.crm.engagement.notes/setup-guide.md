---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating a HubSpot developer app and obtaining the OAuth 2.0 credentials required to use the HubSpot CRM Engagement Notes connector.

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
           light: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.crm.engagement.notes/setup/test-account.png'),
           dark: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.crm.engagement.notes/setup/test-account.png'),
       }}
   />

2. Select **Create developer test account**.

   <ThemedImage
       alt="Create developer test account"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.crm.engagement.notes/setup/create-test-account.png'),
           dark: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.crm.engagement.notes/setup/create-test-account.png'),
       }}
   />

3. Provide a name and select **Create**.

   <ThemedImage
       alt="Name the test account"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.crm.engagement.notes/setup/create-account.png'),
           dark: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.crm.engagement.notes/setup/create-account.png'),
       }}
   />

4. The new account appears in the test accounts list.

   <ThemedImage
       alt="Test account portal"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.crm.engagement.notes/setup/test-account-portal.png'),
           dark: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.crm.engagement.notes/setup/test-account-portal.png'),
       }}
   />

Developer test accounts are for development and testing only. Do not use them in production.

## Step 3: Create a HubSpot app

1. Navigate to **Apps** in the left sidebar and select **Create app**.

   <ThemedImage
       alt="Create app"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.crm.engagement.notes/setup/create-app.png'),
           dark: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.crm.engagement.notes/setup/create-app.png'),
       }}
   />

2. Enter a public app name and an optional description.

   <ThemedImage
       alt="App name and description"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.crm.engagement.notes/setup/app-name-desc.png'),
           dark: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.crm.engagement.notes/setup/app-name-desc.png'),
       }}
   />

## Step 4: Set up authentication

1. Go to the **Auth** tab.

   <ThemedImage
       alt="Configure authentication"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.crm.engagement.notes/setup/config-auth.png'),
           dark: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.crm.engagement.notes/setup/config-auth.png'),
       }}
   />

2. Under **Scopes**, select **Add new scopes** and add the required scopes for the CRM objects you want to associate notes with (for example, `crm.objects.contacts.read` and `crm.objects.contacts.write`).

   <ThemedImage
       alt="Add scopes"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.crm.engagement.notes/setup/add-scopes.png'),
           dark: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.crm.engagement.notes/setup/add-scopes.png'),
       }}
   />

3. Under **Redirect URL**, add your redirect URL and select **Create App**.

   <ThemedImage
       alt="Redirect URL"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.crm.engagement.notes/setup/redirect-url.png'),
           dark: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.crm.engagement.notes/setup/redirect-url.png'),
       }}
   />

## Step 5: Get the client ID and client secret

In the **Auth** tab, copy the **Client ID** and **Client Secret**.

<ThemedImage
    alt="Client ID and client secret"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.crm.engagement.notes/setup/client-id-secret.png'),
        dark: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.crm.engagement.notes/setup/client-id-secret.png'),
    }}
/>

## Step 6: Get the refresh token

1. Construct the authorization URL:

   ```
   https://app.hubspot.com/oauth/authorize?client_id=<YOUR_CLIENT_ID>&scope=<YOUR_SCOPES>&redirect_uri=<YOUR_REDIRECT_URI>
   ```

2. Open the URL in a browser and select your developer test account.

   <ThemedImage
       alt="OAuth consent screen"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.crm.engagement.notes/setup/hubspot-oauth-consent-screen.png'),
           dark: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.crm.engagement.notes/setup/hubspot-oauth-consent-screen.png'),
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
