---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating a PayPal sandbox business account and obtaining the API credentials required to use the PayPal Invoices connector.

## Prerequisites

- A [PayPal Developer account](https://developer.paypal.com/). If you do not have one, sign up at [developer.paypal.com](https://developer.paypal.com/).

## Step 1: Create a sandbox business account

1. Open the [PayPal Developer Dashboard](https://developer.paypal.com/dashboard).
2. Under **Testing Tools**, select **Sandbox Accounts**.

   ![Sandbox accounts](/img/connectors/catalog/finance-accounting/paypal.invoices/setup/sandbox-accounts.png)

3. Select **Create account** and choose **Business** as the account type.

   ![Create business account](/img/connectors/catalog/finance-accounting/paypal.invoices/setup/create-account.png)

Some PayPal options and features may vary by region or country — check availability before creating an account.

## Step 2: Create a REST API app

1. Navigate to the **Apps & Credentials** tab.
2. Select **Create App**, provide a name, and select the sandbox business account you created.

   ![Create app](/img/connectors/catalog/finance-accounting/paypal.invoices/setup/create-app.png)

## Step 3: Get the client ID and client secret

After creating the app, copy the **Client ID** and **Client Secret** displayed on the app details page.

![Client ID and client secret](/img/connectors/catalog/finance-accounting/paypal.invoices/setup/get-credentials.png)

Store the Client ID and Client Secret securely. Do not commit them to source control. Use Ballerina's `configurable` feature and a `Config.toml` file to supply them at runtime.

## What's next

- [Action reference](actions.md): Available operations
