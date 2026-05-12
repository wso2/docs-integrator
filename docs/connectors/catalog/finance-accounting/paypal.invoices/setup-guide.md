---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating a PayPal Developer application and obtaining the OAuth 2.0 client credentials required to use the PayPal Invoices connector.

## Prerequisites

- A PayPal Business account. If you do not have one, [sign up at PayPal](https://www.paypal.com/bizsignup/).
- A PayPal Developer account. If you do not have one, [sign up at the PayPal Developer Dashboard](https://developer.paypal.com/dashboard/).

## Step 1: Create an app in the PayPal developer dashboard

1. Log in to the [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/).
2. Navigate to **Apps & Credentials**.
3. Select the environment: **Sandbox** (for testing) or **Live** (for production).
4. Click **Create App**.
5. Enter an **App Name** (e.g., `Ballerina Invoicing`).
6. Select **Merchant** as the app type.
7. Click **Create App**.

Start with the Sandbox environment for development and testing. You can create a separate Live app when you are ready for production.

## Step 2: Get the client ID and client secret

1. After creating the app, you are taken to the app details page.
2. Copy the **Client ID**; this is your `clientId`.
3. Under **Secret**, click **Show** to reveal the secret, then copy it; this is your `clientSecret`.

Store the Client ID and Client Secret securely. Do not commit them to source control.
Use Ballerina's `configurable` feature and a `Config.toml` file to supply them at runtime.

## Step 3: Enable invoicing permissions

1. On the app details page, scroll down to **Features**.
2. Ensure that the **Invoicing** feature is enabled. If not, enable it.
3. Save your changes if prompted.

By default, new apps may have invoicing permissions enabled. Verify this is the case for your app.

## Step 4: Note your API base URL

The base URL depends on your environment:

- **Sandbox**: `https://api-m.sandbox.paypal.com/v2/invoicing`
- **Live**: `https://api-m.paypal.com/v2/invoicing`

Use the sandbox URL for testing and the live URL for production.
