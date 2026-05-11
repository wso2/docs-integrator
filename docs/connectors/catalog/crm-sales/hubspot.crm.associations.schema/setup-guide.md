---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating a HubSpot developer app and obtaining the OAuth 2.0 credentials required to use the HubSpot CRM Associations Schema connector.

## Prerequisites

- A HubSpot developer account. If you do not have one, [sign up for free](https://app.hubspot.com/signup-hubspot/developers).
- A HubSpot developer test account (optional but recommended for safe testing).

## Create a HubSpot developer account

1. Go to the [HubSpot Developer Portal](https://app.hubspot.com/signup-hubspot/developers).
2. Sign up for a free developer account if you don't already have one.
3. Log in to your developer dashboard.

## Create a developer test account (optional)

1. In the left sidebar of your developer dashboard, navigate to **Test accounts**.
2. Click **Create developer test account**.
3. This provides a sandbox HubSpot environment for safe testing without affecting production data.

A developer test account is strongly recommended for development and testing to avoid modifying production data.

## Create a HubSpot app

1. In the left sidebar, navigate to **Apps**.
2. Click **Create app**.
3. Provide a **Public app name** and optionally a description.
4. Navigate to the **Auth** tab.

## Configure OAuth scopes

1. Under the **Auth** tab of your app, scroll to the **Scopes** section.
2. Click **Add new scope** and add the following scopes:
    - `crm.objects.contacts.read`
    - `crm.objects.contacts.write`
    - `crm.objects.companies.read`
    - `crm.objects.companies.write`
    - `crm.objects.deals.read`
    - `crm.objects.deals.write`
    - `crm.objects.line_items.read`
    - `crm.objects.line_items.write`
    - `crm.objects.custom.read`
    - `crm.objects.custom.write`
3. Set a **Redirect URL** (e.g., `http://localhost:9090` for local testing).
4. Click **Save**.

Add only the scopes required for the CRM object types you intend to work with. The list above covers the most common object types.

## Get the client ID and client secret

1. In the **Auth** tab of your app, locate the **Client ID** and **Client Secret**.
2. Copy both values: you will need them to configure the connector.

Store the Client ID and Client Secret securely. Do not commit them to source control.
Use Ballerina's `configurable` feature and a `Config.toml` file to supply them at runtime.

## Generate a refresh token

Use the HubSpot OAuth 2.0 Authorization Code flow to obtain a refresh token:

1. Construct the following authorization URL, replacing the placeholders:

    ```
    https://app.hubspot.com/oauth/authorize?client_id=<YOUR_CLIENT_ID>&scope=crm.objects.contacts.read%20crm.objects.contacts.write%20crm.objects.companies.read%20crm.objects.companies.write&redirect_uri=<YOUR_REDIRECT_URI>
    ```

2. Open the URL in a browser and log in with your HubSpot credentials (or test account).
3. Authorize the app when prompted.
4. After authorization, HubSpot redirects to your redirect URL with a `code` query parameter. Copy the `code` value.
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

## Next steps

- [Actions Reference](actions.md): Available operations
