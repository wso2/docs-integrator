---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating a Google Cloud Platform project and obtaining the OAuth 2.0 credentials required to use the Gmail connector.

## Step 1: Create a Google Cloud Platform project

1. Open the [Google Cloud Platform Console](https://console.cloud.google.com/).
2. Select an existing project or create a new one from the project drop-down menu.

   <ThemedImage
       alt="GCP Console project view"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/communication/googleapis.gmail/setup/gcp-console-project-view.png'),
           dark: useBaseUrl('/img/connectors/catalog/communication/googleapis.gmail/setup/gcp-console-project-view.png'),
       }}
   />

## Step 2: Enable Gmail API

1. Navigate to the **Library** tab and enable the Gmail API.

   <ThemedImage
       alt="Enable Gmail API"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/communication/googleapis.gmail/setup/enable-gmail-api.png'),
           dark: useBaseUrl('/img/connectors/catalog/communication/googleapis.gmail/setup/enable-gmail-api.png'),
       }}
   />

## Step 3: Configure OAuth consent

1. Select the **OAuth consent screen** tab in the Google Cloud Platform console.

   <ThemedImage
       alt="Consent screen"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/communication/googleapis.gmail/setup/consent-screen.png'),
           dark: useBaseUrl('/img/connectors/catalog/communication/googleapis.gmail/setup/consent-screen.png'),
       }}
   />

2. Provide a name for the consent application and save your changes.

## Step 4: Create an OAuth client

1. Navigate to the **Credentials** tab and select **Create credentials** → **OAuth client ID**.

   <ThemedImage
       alt="Create credentials"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/communication/googleapis.gmail/setup/create-credentials.png'),
           dark: useBaseUrl('/img/connectors/catalog/communication/googleapis.gmail/setup/create-credentials.png'),
       }}
   />

2. Fill in the following fields and select **Create**:

   | Field | Value |
   |---|---|
   | Application type | Web Application |
   | Name | GmailConnector |
   | Authorized redirect URIs | `https://developers.google.com/oauthplayground` |

3. Save the provided **Client ID** and **Client secret**.

## Step 5: Get the access and refresh tokens

It is recommended to use the OAuth 2.0 playground to obtain the tokens.

1. Configure the [OAuth 2.0 playground](https://developers.google.com/oauthplayground) with your client ID and client secret.

   <ThemedImage
       alt="OAuth playground"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/communication/googleapis.gmail/setup/oauth-playground.png'),
           dark: useBaseUrl('/img/connectors/catalog/communication/googleapis.gmail/setup/oauth-playground.png'),
       }}
   />

2. Authorize the Gmail APIs (select all scopes except the metadata scope).

   <ThemedImage
       alt="Authorize APIs"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/communication/googleapis.gmail/setup/authorize-apis.png'),
           dark: useBaseUrl('/img/connectors/catalog/communication/googleapis.gmail/setup/authorize-apis.png'),
       }}
   />

3. Exchange the authorization code for tokens.

   <ThemedImage
       alt="Exchange tokens"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/communication/googleapis.gmail/setup/exchange-tokens.png'),
           dark: useBaseUrl('/img/connectors/catalog/communication/googleapis.gmail/setup/exchange-tokens.png'),
       }}
   />
