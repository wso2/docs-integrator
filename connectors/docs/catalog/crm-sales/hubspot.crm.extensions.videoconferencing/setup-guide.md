---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating a HubSpot developer app and obtaining the App ID and developer API key required to use the HubSpot CRM Extensions Video Conferencing connector.

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
           light: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.crm.extensions.videoconferencing/setup/test-accounts-section.png'),
           dark: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.crm.extensions.videoconferencing/setup/test-accounts-section.png'),
       }}
   />

2. Select **Create developer test account**.

   <ThemedImage
       alt="Create developer test account"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.crm.extensions.videoconferencing/setup/create-dev-account.png'),
           dark: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.crm.extensions.videoconferencing/setup/create-dev-account.png'),
       }}
   />

3. Provide a name and select **Create**.

   <ThemedImage
       alt="Name the test account"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.crm.extensions.videoconferencing/setup/name-dev-account.png'),
           dark: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.crm.extensions.videoconferencing/setup/name-dev-account.png'),
       }}
   />

Developer test accounts are for development and testing only. Do not use them in production.

## Step 3: Create a HubSpot app

1. Navigate to **Apps** and select **Create app**.

   <ThemedImage
       alt="Create app"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.crm.extensions.videoconferencing/setup/create-app.png'),
           dark: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.crm.extensions.videoconferencing/setup/create-app.png'),
       }}
   />

2. Enter the app name and an optional description.

   <ThemedImage
       alt="Name the app"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.crm.extensions.videoconferencing/setup/name-app.png'),
           dark: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.crm.extensions.videoconferencing/setup/name-app.png'),
       }}
   />

## Step 4: Set the redirect URI

1. Go to the **Auth** tab.

   <ThemedImage
       alt="Auth tab"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.crm.extensions.videoconferencing/setup/auth-tab.png'),
           dark: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.crm.extensions.videoconferencing/setup/auth-tab.png'),
       }}
   />

2. Under **Redirect URL**, add your redirect URL and select **Create app**.

   <ThemedImage
       alt="Add redirect URL"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.crm.extensions.videoconferencing/setup/set-redirect-url.png'),
           dark: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.crm.extensions.videoconferencing/setup/set-redirect-url.png'),
       }}
   />

## Step 5: Get your App ID

1. Navigate back to **Apps**.

   <ThemedImage
       alt="Go to apps"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.crm.extensions.videoconferencing/setup/go-to-apps.png'),
           dark: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.crm.extensions.videoconferencing/setup/go-to-apps.png'),
       }}
   />

2. Copy the **App ID** displayed next to your app name.

   <ThemedImage
       alt="Get app ID"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.crm.extensions.videoconferencing/setup/get-app-id.png'),
           dark: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.crm.extensions.videoconferencing/setup/get-app-id.png'),
       }}
   />

## Step 6: Get your developer API key

1. Select **Keys** in the left sidebar, then select **Developer API Key**.

   <ThemedImage
       alt="Developer API key screen"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.crm.extensions.videoconferencing/setup/dev-key-screen.png'),
           dark: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.crm.extensions.videoconferencing/setup/dev-key-screen.png'),
       }}
   />

2. Select **Create Key**.

   <ThemedImage
       alt="Create the key"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.crm.extensions.videoconferencing/setup/create-dev-key.png'),
           dark: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.crm.extensions.videoconferencing/setup/create-dev-key.png'),
       }}
   />

3. Select **Show** to reveal the key.

   <ThemedImage
       alt="Show the key"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.crm.extensions.videoconferencing/setup/show-dev-key.png'),
           dark: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.crm.extensions.videoconferencing/setup/show-dev-key.png'),
       }}
   />

4. Select **Copy** to copy the developer API key.

   <ThemedImage
       alt="Copy the key"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.crm.extensions.videoconferencing/setup/copy-dev-key.png'),
           dark: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.crm.extensions.videoconferencing/setup/copy-dev-key.png'),
       }}
   />

Store the App ID and developer API key securely. Do not commit them to source control. Use Ballerina's `configurable` feature and a `Config.toml` file to supply them at runtime.
