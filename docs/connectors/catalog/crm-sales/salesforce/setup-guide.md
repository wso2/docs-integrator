---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating a Salesforce Connected App and obtaining the OAuth 2.0 credentials required to use the Salesforce connector.

## Prerequisites

- An active Salesforce account. If you do not have one, [sign up for a free Developer Edition](https://developer.salesforce.com/signup).

## Step 1: Create a connected app

1. Log in to your Salesforce org.
2. Click the gear icon in the top-right corner and select Setup.
3. In the Quick Find box, type `App Manager` and select **App Manager**.
4. Click **New Connected App** in the top-right corner.
5. Fill in the following required fields under **Basic Information**:
    - **Connected App Name**: Enter a name (e.g., `Ballerina Salesforce Connector`).
    - **API Name**: Auto-populated from the name.
    - **Contact Email**: Enter your email address.

## Step 2: Enable OAuth settings

1. Under **API (Enable OAuth Settings)**, check **Enable OAuth Settings**.
2. Set the **Callback URL** to `https://login.salesforce.com/services/oauth2/success` (or your own redirect URI).
3. Under **Selected OAuth Scopes**, add the following scopes:
    - **Manage user data via APIs (api)**
    - **Perform requests at any time (refresh_token, offline_access)**
4. Uncheck **Require Proof Key for Code Exchange (PKCE)** if present (for simplicity in server-to-server flows).
5. Click **Save**, then **Continue**.

It may take 2–10 minutes for the Connected App to become active after saving.

## Step 3: Get the consumer key and consumer secret

1. After saving, click **Manage Consumer Details** (you may need to verify your identity).
2. Copy the **Consumer Key**; this is your `clientId`.
3. Copy the **Consumer Secret**; this is your `clientSecret`.

Store the Consumer Key and Consumer Secret securely. Do not commit them to source control.
Use Ballerina's `configurable` feature and a `Config.toml` file to supply them at runtime.

## Step 4: Generate a refresh token

Use the Salesforce OAuth 2.0 Authorization Code flow to obtain a refresh token:

1. Construct the following URL, replacing `<YOUR_CLIENT_ID>` and `<YOUR_CALLBACK_URL>`:

    ```
    https://login.salesforce.com/services/oauth2/authorize?response_type=code&client_id=<YOUR_CLIENT_ID>&redirect_uri=<YOUR_CALLBACK_URL>&scope=api%20refresh_token%20offline_access
    ```

2. Open the URL in a browser and log in with your Salesforce credentials.
3. Authorize the Connected App when prompted.
4. After authorization, Salesforce redirects to your callback URL with a `code` query parameter. Copy the `code` value.
5. Exchange the code for tokens using a POST request:

    ```
    POST https://login.salesforce.com/services/oauth2/token
    Content-Type: application/x-www-form-urlencoded

    grant_type=authorization_code
    &code=<AUTHORIZATION_CODE>
    &client_id=<YOUR_CLIENT_ID>
    &client_secret=<YOUR_CLIENT_SECRET>
    &redirect_uri=<YOUR_CALLBACK_URL>
    ```

6. The response contains `access_token`, `refresh_token`, and `instance_url`. Copy the `refresh_token`.

Use a tool like [Postman](https://www.postman.com/) or `curl` to perform the token exchange in step 5.

## Step 5: Get your instance base URL

The `baseUrl` is the Salesforce instance URL for your org. It looks like:

```
https://your-instance.salesforce.com
```

You can find it in the token exchange response as `instance_url`, or in Setup under **My Domain**.

## Next steps

- [Action Reference](actions.md) - Available operations
- [Trigger Reference](triggers.md) - Event-driven integration
