---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating a HubSpot developer app and obtaining the OAuth 2.0 credentials required to use the HubSpot CRM Engagement Meeting connector.

## Prerequisites

- A HubSpot account with CRM access. If you do not have one, [sign up for a free HubSpot account](https://app.hubspot.com/signup).

## Step 1: Create a HubSpot developer account

1. Go to [HubSpot Developer](https://developers.hubspot.com/) and sign up or log in.
2. Once logged in, you will land on the developer dashboard.

## Step 2: Create a developer app

1. In the developer dashboard, click **Apps** in the top navigation.
2. Click **Create app**.
3. Under **App Info**, fill in the **Public app name** (e.g., `Ballerina Meeting Connector`).
4. Navigate to the **Auth** tab.
5. Under **Redirect URLs**, add your callback URL (e.g., `https://localhost/callback`).
6. Under **Scopes**, add the following required scopes:
    - `crm.objects.contacts.read`
    - `crm.objects.contacts.write`
7. Click **Save**.

The scopes you select determine what data the connector can access. Add additional scopes as needed for your use case.

## Step 3: Get the client ID and client secret

1. In the **Auth** tab of your app, locate the **Client ID** and **Client Secret** fields.
2. Copy the **Client ID**; this is your `clientId`.
3. Click **Show** next to Client Secret and copy it: this is your `clientSecret`.

Store the Client ID and Client Secret securely. Do not commit them to source control.
Use Ballerina's `configurable` feature and a `Config.toml` file to supply them at runtime.

## Step 4: Authorize and generate a refresh token

1. Construct the authorization URL, replacing `<YOUR_CLIENT_ID>` and `<YOUR_REDIRECT_URI>`:

    ```
    https://app.hubspot.com/oauth/authorize?client_id=<YOUR_CLIENT_ID>&redirect_uri=<YOUR_REDIRECT_URI>&scope=crm.objects.contacts.read%20crm.objects.contacts.write
    ```

2. Open the URL in a browser and select the HubSpot account to authorize.
3. Click **Connect app** when prompted.
4. After authorization, HubSpot redirects to your callback URL with a `code` query parameter. Copy the `code` value.
5. Exchange the code for tokens using a POST request:

    ```
    POST https://api.hubapi.com/oauth/v1/token
    Content-Type: application/x-www-form-urlencoded

    grant_type=authorization_code
    &code=<AUTHORIZATION_CODE>
    &client_id=<YOUR_CLIENT_ID>
    &client_secret=<YOUR_CLIENT_SECRET>
    &redirect_uri=<YOUR_REDIRECT_URI>
    ```

6. The response contains `access_token` and `refresh_token`. Copy the `refresh_token`.

Use a tool like [Postman](https://www.postman.com/) or `curl` to perform the token exchange in step 5.
