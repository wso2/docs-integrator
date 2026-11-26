---
connector: true
connector_name: "xero.bankfeeds"
title: "Setup Guide"
description: "How to set up and configure the ballerinax/xero.bankfeeds connector."
---

# Setup Guide

To use the Xero Bankfeeds connector you need access to the Xero Bank Feeds API, an app registered in the Xero developer portal, an OAuth 2.0 refresh token with the `bankfeeds` scope and the ID of the organisation (tenant) to work with.

## Prerequisites

- A Xero financial services partnership that grants access to the Bank Feeds API
- Access to the [Xero developer portal](https://developer.xero.com/app/manage)

## Step 1: Get access to the Bank Feeds API

1. Confirm that your organisation is a financial institution with an established [Xero financial services partnership](https://developer.xero.com/documentation/bank-feeds-api/overview). The Bank Feeds API is only available to these partners.
2. Request access through your Xero Partner Manager. Xero enables the `bankfeeds` scope for your app.

## Step 2: Register an app

1. Sign in to the [Xero developer portal](https://developer.xero.com/app/manage) and select **New app**.
2. Choose the **Web app** integration type, and enter an app name, a company or application URL, and a redirect URI such as `http://localhost:8080/callback`.
3. Create the app.
4. On the app's **Configuration** page, copy the **Client id** and generate a **Client secret**. Keep the secret safe; it is shown only once.

## Step 3: Obtain a refresh token

Obtain a refresh token with the [OAuth 2.0 authorization code flow](https://developer.xero.com/documentation/guides/oauth2/auth-flow).

1. Open the authorization URL below in a browser, replacing the client ID and redirect URI with your own. `offline_access` is required to receive a refresh token, and `bankfeeds` grants access to the Bank Feeds API.

   ```text
   https://login.xero.com/identity/connect/authorize?response_type=code&client_id=<CLIENT_ID>&redirect_uri=<REDIRECT_URI>&scope=openid profile email offline_access bankfeeds&state=123
   ```

2. After you approve access, Xero redirects to your redirect URI with a `code` query parameter. Exchange it for tokens:

   ```bash
   curl -X POST https://identity.xero.com/connect/token \
     -u "<CLIENT_ID>:<CLIENT_SECRET>" \
     -d grant_type=authorization_code \
     -d code=<CODE> \
     -d redirect_uri=<REDIRECT_URI>
   ```

3. Copy the `refresh_token` from the response, which also contains an `access_token`.

## Step 4: Find the tenant ID

Every Bank Feeds API call is scoped to an organisation through the `Xero-Tenant-Id` header.

1. List the organisations the token can access:

   ```bash
   curl https://api.xero.com/connections -H "Authorization: Bearer <ACCESS_TOKEN>"
   ```

2. Note the `tenantId` of the organisation you want.

## Next steps

- [Action Reference](action-reference.md): Available operations
- [Example](example.md): Build an integration with the connector
