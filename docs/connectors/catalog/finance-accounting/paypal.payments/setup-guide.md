---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating a PayPal Developer account and obtaining the OAuth 2.0 client credentials required to use the PayPal Payments connector.

## Prerequisites

- A PayPal Developer account. If you do not have one, [sign up at the PayPal Developer Dashboard](https://developer.paypal.com/).

## Step 1: Create sandbox accounts

1. Log in to the [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/).
2. Navigate to **Testing Tools** > **Sandbox Accounts**.
3. Create a **Business** sandbox account if you do not already have one.
4. Note the sandbox business account email; you will use this for testing.

PayPal automatically creates default sandbox accounts (one Business, one Personal) when you sign up. You can use these for testing.

## Step 2: Create a REST API app

1. In the Developer Dashboard, go to **Apps & Credentials**.
2. Ensure **Sandbox** is selected at the top of the page.
3. Click **Create App**.
4. Enter an app name (e.g., `Ballerina PayPal Connector`).
5. Select your sandbox Business account as the **Sandbox Business Account**.
6. Click **Create App**.

## Step 3: Get your client ID and client secret

1. After creating the app, you are taken to the app details page.
2. Copy the **Client ID**; this is your `clientId`.
3. Click **Show** under **Secret** and copy the value; this is your `clientSecret`.

Store the Client ID and Client Secret securely. Do not commit them to source control.
Use Ballerina's `configurable` feature and a `Config.toml` file to supply them at runtime.

## Step 4: Configure the service URL

The connector requires a service URL that points to the PayPal Payments API:

- **Sandbox**: `https://api-m.sandbox.paypal.com/v2/payments`
- **Production**: `https://api-m.paypal.com/v2/payments`

Use the sandbox URL during development and testing, then switch to the production URL when you go live.

To use the production URL, your PayPal app must be approved for live access. Go to **Apps & Credentials**, switch to **Live**, and follow PayPal's approval process.
