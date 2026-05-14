---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating a Salesforce Connected App and obtaining the OAuth 2.0 credentials required to use the Salesforce connector.

## Prerequisites

- An active Salesforce account. If you do not have one, [sign up for a free Developer Edition](https://developer.salesforce.com/signup).

## Step 1: Navigate to App Manager

1. Log in to your Salesforce org.
2. Select the gear icon in the top-right corner and select **Setup**.
3. In the Quick Find box, type `App Manager` and select **App Manager**.

   ![Setup side panel](/img/connectors/catalog/crm-sales/salesforce/setup/side-panel.png)

## Step 2: Create a connected app

1. Select **New Connected App** in the top-right corner.

   ![Create connected apps](/img/connectors/catalog/crm-sales/salesforce/setup/create-connected-apps.png)

2. Fill in the required fields under **Basic Information**:
   - **Connected App Name**: Enter a name (for example, `Ballerina Salesforce Connector`).
   - **API Name**: Auto-populated from the name.
   - **Contact Email**: Enter your email address.

   ![Connected app details](/img/connectors/catalog/crm-sales/salesforce/setup/create_connected_app.png)

## Step 3: Enable OAuth settings

1. Under **API (Enable OAuth Settings)**, check **Enable OAuth Settings**.
2. Set the **Callback URL** to `https://login.salesforce.com/services/oauth2/success` (or your own redirect URI).
3. Under **Selected OAuth Scopes**, add:
   - **Manage user data via APIs (api)**
   - **Perform requests at any time (refresh_token, offline_access)**
4. Select **Save**, then **Continue**.

It may take 2–10 minutes for the Connected App to become active after saving.

## Step 4: Get the consumer key and consumer secret

1. After saving, select **Manage Consumer Details** (you may need to verify your identity).
2. Copy the **Consumer Key** — this is your `clientId`.
3. Copy the **Consumer Secret** — this is your `clientSecret`.

   ![Consumer secrets](/img/connectors/catalog/crm-sales/salesforce/setup/crdentials.png)

Store the Consumer Key and Consumer Secret securely. Use Ballerina's `configurable` feature and a `Config.toml` file to supply them at runtime.

## Step 5: Generate a refresh token

1. Construct the authorization URL, replacing `<YOUR_CLIENT_ID>` and `<YOUR_CALLBACK_URL>`:

   ```
   https://login.salesforce.com/services/oauth2/authorize?response_type=code&client_id=<YOUR_CLIENT_ID>&redirect_uri=<YOUR_CALLBACK_URL>&scope=api%20refresh_token%20offline_access
   ```

2. Open the URL in a browser and log in with your Salesforce credentials.
3. Authorize the Connected App when prompted.
4. After authorization, Salesforce redirects to your callback URL with a `code` query parameter. Copy the `code` value.
5. Exchange the code for tokens:

   ```bash
   curl -X POST "https://login.salesforce.com/services/oauth2/token" \
     -d "grant_type=authorization_code" \
     -d "code=<AUTHORIZATION_CODE>" \
     -d "client_id=<YOUR_CLIENT_ID>" \
     -d "client_secret=<YOUR_CLIENT_SECRET>" \
     -d "redirect_uri=<YOUR_CALLBACK_URL>"
   ```

6. Copy the `refresh_token` from the response.

## Step 6: Note your instance base URL

The `baseUrl` is the Salesforce instance URL for your org:

```
https://your-instance.salesforce.com
```

You can find it in the token exchange response as `instance_url`, or in **Setup** under **My Domain**.

## What's next

- [Action Reference](actions.md): Available operations
- [Trigger Reference](triggers.md): Event-driven integration
