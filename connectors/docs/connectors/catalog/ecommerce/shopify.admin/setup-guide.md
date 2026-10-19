---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating a Shopify development store and obtaining the Admin API access token required to use the Shopify Admin connector.

## Prerequisites

- A Shopify account. If you do not have one, [sign up at the Shopify signup portal](https://accounts.shopify.com/signup).
- Membership in the [Shopify Partner Program](https://www.shopify.com/partners) to access development tools.

## Step 1: Sign up for a Shopify developer account

1. Create a Shopify account via the [Shopify signup portal](https://accounts.shopify.com/signup).

   <ThemedImage
       alt="Shopify signup page"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/ecommerce/shopify.admin/setup/signup-page.png'),
           dark: useBaseUrl('/img/connectors/catalog/ecommerce/shopify.admin/setup/signup-page.png'),
       }}
   />

2. Join the [Shopify Partner Program](https://www.shopify.com/partners) to access development tools.

   <ThemedImage
       alt="Shopify partner program"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/ecommerce/shopify.admin/setup/partner-page.png'),
           dark: useBaseUrl('/img/connectors/catalog/ecommerce/shopify.admin/setup/partner-page.png'),
       }}
   />

## Step 2: Create a new organization

1. In the Shopify Partner Dashboard, connect to an existing organization or create a new one.

   <ThemedImage
       alt="New organization"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/ecommerce/shopify.admin/setup/new-organization.png'),
           dark: useBaseUrl('/img/connectors/catalog/ecommerce/shopify.admin/setup/new-organization.png'),
       }}
   />

2. Select your main focus as a Shopify partner and follow the on-screen instructions.

   <ThemedImage
       alt="Main focus as Shopify partner"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/ecommerce/shopify.admin/setup/main-focus-as-shopify-partner.png'),
           dark: useBaseUrl('/img/connectors/catalog/ecommerce/shopify.admin/setup/main-focus-as-shopify-partner.png'),
       }}
   />

3. Provide business contact details and finalize the setup.

   <ThemedImage
       alt="Business contact information"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/ecommerce/shopify.admin/setup/business-contact-information.png'),
           dark: useBaseUrl('/img/connectors/catalog/ecommerce/shopify.admin/setup/business-contact-information.png'),
       }}
   />

## Step 3: Create a development store

1. In the [Shopify Partner Dashboard](https://partners.shopify.com/), select **Stores** in the left navigation.

   <ThemedImage
       alt="Stores section"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/ecommerce/shopify.admin/setup/home-page.png'),
           dark: useBaseUrl('/img/connectors/catalog/ecommerce/shopify.admin/setup/home-page.png'),
       }}
   />

2. Select **Create store** to proceed.

   <ThemedImage
       alt="Create store"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/ecommerce/shopify.admin/setup/create-store.png'),
           dark: useBaseUrl('/img/connectors/catalog/ecommerce/shopify.admin/setup/create-store.png'),
       }}
   />

3. Complete the store setup by following the on-screen instructions.

   <ThemedImage
       alt="Store configuration"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/ecommerce/shopify.admin/setup/create-store-configs.png'),
           dark: useBaseUrl('/img/connectors/catalog/ecommerce/shopify.admin/setup/create-store-configs.png'),
       }}
   />

A development store is free and intended for testing and development purposes.

## Step 4: Create a new app

1. In your store admin, select **Settings**.

   <ThemedImage
       alt="Settings"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/ecommerce/shopify.admin/setup/settings.png'),
           dark: useBaseUrl('/img/connectors/catalog/ecommerce/shopify.admin/setup/settings.png'),
       }}
   />

2. Go to the **Apps** section and select **Develop apps**.

   <ThemedImage
       alt="Apps section"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/ecommerce/shopify.admin/setup/apps-section.png'),
           dark: useBaseUrl('/img/connectors/catalog/ecommerce/shopify.admin/setup/apps-section.png'),
       }}
   />

3. Select **Allow custom app development**.

   <ThemedImage
       alt="Develop apps"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/ecommerce/shopify.admin/setup/develop-apps.png'),
           dark: useBaseUrl('/img/connectors/catalog/ecommerce/shopify.admin/setup/develop-apps.png'),
       }}
   />

4. Select **Create an app**, enter an app name, and confirm.

   <ThemedImage
       alt="Create app"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/ecommerce/shopify.admin/setup/create-app.png'),
           dark: useBaseUrl('/img/connectors/catalog/ecommerce/shopify.admin/setup/create-app.png'),
       }}
   />

## Step 5: Generate an access token

1. Once the app is created, select **Configure Admin API scopes** and apply the scopes required for your use case (for example, `read_products`, `write_orders`).

   <ThemedImage
       alt="Configure Admin API scopes"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/ecommerce/shopify.admin/setup/configure-admin-api-scopes.png'),
           dark: useBaseUrl('/img/connectors/catalog/ecommerce/shopify.admin/setup/configure-admin-api-scopes.png'),
       }}
   />

2. Select **Install app** to generate an Admin API access token.

   <ThemedImage
       alt="Install app"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/ecommerce/shopify.admin/setup/add-access-token.png'),
           dark: useBaseUrl('/img/connectors/catalog/ecommerce/shopify.admin/setup/add-access-token.png'),
       }}
   />

3. Select **Reveal token once** to copy and save the token securely.

   <ThemedImage
       alt="Reveal access token"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/ecommerce/shopify.admin/setup/reveal-access-token.png'),
           dark: useBaseUrl('/img/connectors/catalog/ecommerce/shopify.admin/setup/reveal-access-token.png'),
       }}
   />

The access token is shown only once. Copy it immediately and store it securely. Do not commit it to source control. Use Ballerina's `configurable` feature and a `Config.toml` file to supply it at runtime.

## Step 6: Get your store URL

Your store URL follows this pattern:

```
https://<your-store-name>.myshopify.com
```

You can find it in the browser address bar when viewing your Shopify admin dashboard.

## What's next

- [Action reference](actions.md): Available operations
- [Trigger reference](triggers.md): Event-driven integration
