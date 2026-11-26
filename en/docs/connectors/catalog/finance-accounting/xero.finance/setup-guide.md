---
connector: true
connector_name: "xero.finance"
title: "Setup Guide"
description: "How to set up and configure the ballerinax/xero.finance connector."
---

# Setup Guide

To use the Xero Finance connector you need a Xero account, a registered app, an OAuth 2.0 refresh token that grants the finance scopes, and the ID of the organisation (tenant) to query.

## Prerequisites

- A Xero account with access to the Finance API (available to Xero partners)
- An app registered in the [Xero Developer portal](https://developer.xero.com/app/manage)

## Step 1: Register an app

1. Sign in to the [Xero developer portal](https://developer.xero.com/app/manage) and select **New app**.
2. Choose the **Web app** integration type, and enter an app name, a company or application URL, and a redirect URI that your application controls, such as `http://localhost:8080/callback`.
3. Create the app.

## Step 2: Get the client credentials

1. On the app's **Configuration** page, copy the **Client id**.
2. Generate a **Client secret** and copy it. It is shown only once.

## Step 3: Obtain a refresh token

Obtain a refresh token with the [OAuth 2.0 authorization code flow](https://developer.xero.com/documentation/guides/oauth2/auth-flow).

1. Open the authorization URL below in a browser, replacing the client ID and redirect URI with your own. `offline_access` is required to receive a refresh token, and the `finance.*` scopes grant access to the Finance API.

   ```text
   https://login.xero.com/identity/connect/authorize?response_type=code&client_id=<CLIENT_ID>&redirect_uri=<REDIRECT_URI>&scope=openid profile email offline_access finance.statements.read finance.cashvalidation.read finance.bankstatementsplus.read&state=123
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

:::note
The Finance API is available to Xero partners with the required finance scopes enabled for the app.
:::

## Step 4: Find the tenant ID

Every Finance API call is scoped to an organisation through the `Xero-Tenant-Id` header.

1. List the organisations the token can access:

   ```bash
   curl https://api.xero.com/connections -H "Authorization: Bearer <ACCESS_TOKEN>"
   ```

2. Note the `tenantId` of the organisation you want.

## Next steps

- [Action Reference](action-reference.md): Available operations
- [Example](example.md): Build an integration with the connector
