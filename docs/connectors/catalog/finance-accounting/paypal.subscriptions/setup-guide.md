---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating a PayPal Developer application and obtaining the OAuth 2.0 Client ID and Client Secret required to use the PayPal Subscriptions connector.

## Prerequisites

- A PayPal account. If you do not have one, [sign up at paypal.com](https://www.paypal.com/us/webapps/mpp/account-selection).

## Step 1: Access the PayPal developer dashboard

1. Go to [developer.paypal.com](https://developer.paypal.com/) and log in with your PayPal credentials.
2. Click **Dashboard** in the top navigation bar to open the developer portal.

## Step 2: Create a REST API application

1. In the Dashboard, navigate to **My Apps & Credentials**.
2. Select the environment tab: **Sandbox** (for development and testing) or **Live** (for production).
3. Under **REST API apps**, click **Create App**.
4. Enter an **App Name** (e.g., `Ballerina Subscriptions Integration`).
5. For Sandbox apps, select a **Sandbox Business Account** from the dropdown to associate with the app.
6. Click **Create App**.

Start with the Sandbox environment during development. The sandbox has its own set of credentials and test accounts separate from production.

## Step 3: Retrieve client ID and client secret

1. After the app is created, you are taken to the app detail page.
2. Under **Credentials**, copy the **Client ID**; this is your `clientId`.
3. Click **Show** next to **Secret** and copy the **Client Secret**; this is your `clientSecret`.

Store your Client ID and Client Secret securely. Do not commit them to source control. Use Ballerina's `configurable` feature and a `Config.toml` file to supply them at runtime.

## Step 4: Enable subscriptions permissions for the app

1. On the app detail page, scroll down to the **Features** section.
2. Verify that **Subscriptions** is enabled in the app's feature list.
3. If **Subscriptions** is listed but not enabled, check the box and click **Save Changes**.

Enabling Subscriptions in the Live environment may require additional business verification by PayPal before the feature becomes available.

## Step 5: Switch to live credentials for production

When you are ready to go live:

1. Return to **My Apps & Credentials** and select the **Live** tab.
2. Create a new app or use an existing Live app.
3. Copy the Live **Client ID** and **Client Secret**.
4. In your Ballerina config, update `tokenUrl` to `https://api-m.paypal.com/v1/oauth2/token`
   and set the `serviceUrl` to `https://api-m.paypal.com/v1/billing`.

Live credentials process real payments. Ensure thorough testing in the sandbox before switching to the Live environment.
