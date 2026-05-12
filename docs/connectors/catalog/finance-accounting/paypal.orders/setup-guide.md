---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating a PayPal REST API application and obtaining the OAuth 2.0 client credentials required to use the PayPal Orders connector.

## Prerequisites

- A PayPal Developer account. If you do not have one, [sign up at the PayPal Developer Dashboard](https://developer.paypal.com/).

## Step 1: Create a sandbox business account

1. Log in to the [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/).
2. Navigate to **Testing Tools** > **Sandbox Accounts**.
3. If you do not already have a Business sandbox account, click **Create Account**.
4. Select **Business** as the account type and click **Create**.

A default sandbox Business and Personal account are usually created automatically when you sign up for a PayPal Developer account.

## Step 2: Create a REST API application

1. In the Developer Dashboard, go to **Apps & Credentials**.
2. Make sure the **Sandbox** toggle is selected.
3. Click **Create App**.
4. Enter an **App Name** (e.g., `Ballerina Orders Connector`).
5. Select your sandbox Business account as the **Sandbox Business Account**.
6. Click **Create App**.

## Step 3: Get the client ID and client secret

1. After creating the app, you are taken to the app details page.
2. Copy the **Client ID**; this is your `clientId`.
3. Click **Show** under **Secret** and copy the **Client Secret**; this is your `clientSecret`.

Store the Client ID and Client Secret securely. Do not commit them to source control.
Use Ballerina's `configurable` feature and a `Config.toml` file to supply them at runtime.

## Step 4: Configure for live (production)

When you are ready to go live:

1. In the Developer Dashboard, switch the toggle from **Sandbox** to **Live**.
2. Create a new app or use the live credentials of an existing app.
3. Copy the live **Client ID** and **Client Secret**.
4. Update the service URL from `https://api-m.sandbox.paypal.com/v2/checkout` to `https://api-m.paypal.com/v2/checkout`.
5. Update the token URL from `https://api-m.sandbox.paypal.com/v1/oauth2/token` to `https://api-m.paypal.com/v1/oauth2/token`.

Ensure your PayPal business account is fully verified and approved before switching to live credentials.
