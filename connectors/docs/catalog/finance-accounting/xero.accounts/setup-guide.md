---
title: Setup Guide
---

# Setup Guide

To use the Xero Accounts connector you need a Xero account, an app registered in the Xero developer portal, an OAuth 2.0 refresh token and the ID of the organisation (tenant) to work with.

## Prerequisites

- A [Xero account](https://www.xero.com/signup/)
- Access to the [Xero developer portal](https://developer.xero.com/app/manage)

## Step 1: Create a Xero account

1. Sign up for a [Xero account](https://www.xero.com/signup/) if you do not already have one.
2. Use a free [demo company](https://central.xero.com/s/article/Use-the-demo-company) for development, except for emailing invoices: the `emailInvoice` operation, and the email step of the customer invoice billing example, need an organisation that Xero permits to send email.

## Step 2: Register an app

1. Sign in to the [Xero developer portal](https://developer.xero.com/app/manage) and select **New app**.
2. Choose the **Web app** integration type, and enter an app name, a company or application URL, and a redirect URI such as `http://localhost:8080/callback`.
3. Create the app.
4. On the app's **Configuration** page, copy the **Client id** and generate a **Client secret**. Keep the secret safe; it is shown only once.

## Step 3: Obtain a refresh token

Obtain a refresh token with the [OAuth 2.0 authorization code flow](https://developer.xero.com/documentation/guides/oauth2/auth-flow).

1. Open the authorization URL below in a browser, replacing the client ID and redirect URI with your own and requesting only the scopes your integration needs. `offline_access` is required to receive a refresh token.

   ```text
   https://login.xero.com/identity/connect/authorize?response_type=code&client_id=<CLIENT_ID>&redirect_uri=<REDIRECT_URI>&scope=openid profile email offline_access accounting.transactions accounting.contacts accounting.settings accounting.reports.read&state=123
   ```

2. After you approve access, Xero redirects to your redirect URI with a `code` query parameter. Exchange it for tokens:

   ```bash
   curl -X POST https://identity.xero.com/connect/token \
     -u "<CLIENT_ID>:<CLIENT_SECRET>" \
     -d grant_type=authorization_code \
     -d code= \
     -d redirect_uri=<REDIRECT_URI>
   ```

3. Copy the `refresh_token` from the response, which also contains an `access_token`.

## Step 4: Find the tenant ID

Every Accounting API call is scoped to an organisation through the `xero-tenant-id` header.

1. List the organisations the token can access:

   ```bash
   curl https://api.xero.com/connections -H "Authorization: Bearer <ACCESS_TOKEN>"
   ```

2. Note the `tenantId` of the organisation you want.

## Next steps

- [Action Reference](action-reference.md): Available operations
- [Example](example.md): Build an integration with the connector
