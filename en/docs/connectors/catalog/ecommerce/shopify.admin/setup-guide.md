---
title: Setup Guide
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

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

:::note
A development store is free and intended for testing and development purposes.
:::

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

:::warning
The access token is shown only once. Copy it immediately and store it securely. Do not commit it to source control. Use Ballerina's `configurable` feature and a `Config.toml` file to supply it at runtime.
:::

## Step 6: Get your store URL

Your store URL follows this pattern:

```
https://<your-store-name>.myshopify.com
```

You can find it in the browser address bar when viewing your Shopify admin dashboard.

## Configuring Shopify webhooks

To receive Shopify events with the `ballerinax/shopify.trigger` package, create a Shopify app, subscribe it to webhook topics that point at your listener, and give the listener the app's client secret.

### Prerequisites

- A [Shopify Partner account](https://www.shopify.com/partners) and a development store. Create the store from the Partner Dashboard under **Stores**, then **Create store**. Turning on **Generate test data for store** preloads sample products, so you have data to trigger events against.
- A public URL for your listener. Shopify must reach it over the internet. For local testing, a tunnel such as [ngrok](https://ngrok.com/) gives your machine a public URL:

  ```bash
  ngrok http 8090
  ```

  Use the **Forwarding** URL it prints as the webhook URL below.

<ThemedImage
    alt="ngrok forwarding a public URL to the listener on localhost:8090"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/ecommerce/shopify.admin/trigger-ngrok-forwarding.png'),
        dark: useBaseUrl('/img/connectors/catalog/ecommerce/shopify.admin/trigger-ngrok-forwarding.png'),
    }}
/>

### Create the app

1. In the Partner Dashboard, go to **Apps** and click **Create app**. Give it a name and leave the app URL as a placeholder such as `https://example.com`.

<ThemedImage
    alt="Shopify Dev Dashboard app development page"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/ecommerce/shopify.admin/trigger-app-create-1.png'),
        dark: useBaseUrl('/img/connectors/catalog/ecommerce/shopify.admin/trigger-app-create-1.png'),
    }}
/>

2. Install the [Shopify CLI](https://shopify.dev/docs/api/shopify-cli) and link a local project to the app. `npx shopify` works without a global install:

   ```bash
   npx shopify app config link
   ```

   The CLI signs you in, asks for your organization and the app, and writes a `shopify.app.toml` file in the current directory.

### Subscribe to webhook topics

Add the topics your integration handles to `shopify.app.toml`, with your public URL as `uri`, and the access scope each topic needs. Keep the `[webhooks]` table and the `api_version` that `app config link` wrote:

```toml
[access_scopes]
scopes = "read_orders"

[webhooks]
api_version = "<the version app config link wrote>"

[[webhooks.subscriptions]]
topics = ["orders/create", "orders/paid"]
uri = "<your public URL, such as https://abc123.ngrok-free.app>"
```

Each service type handles a group of topics: `OrdersService` the `orders/*` topics, `CustomersService` the `customers/*` topics, `ProductsService` the `products/*` topics, and `FulfillmentsService` the `fulfillments/*` topics. See the [Trigger Reference](triggers.md#callback-signatures) for every callback.

:::note
Topics under `orders/*`, `customers/*` and `fulfillments/*` carry protected customer data. Shopify asks you to request [protected customer data access](https://shopify.dev/docs/apps/launch/protected-customer-data) before you can subscribe to them. `products/*` has no such restriction and is the simplest topic to test with.
:::

Deploy the configuration, then install the app on your development store from its page in the Dev Dashboard (**Install app**, then pick the store):

```bash
npx shopify app deploy
```

The app's **Versions** page shows the active subscriptions and the URL they deliver to.

<ThemedImage
    alt="A deployed app version with an active webhook subscription pointed at the public URL"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/ecommerce/shopify.admin/trigger-webhook-endpoint-config.png'),
        dark: useBaseUrl('/img/connectors/catalog/ecommerce/shopify.admin/trigger-webhook-endpoint-config.png'),
    }}
/>

### Get the client secret

Shopify signs every delivery with the app's **Client secret**. On the app's **Settings** page in the Dev Dashboard, reveal the **Client secret** and copy it. Set it as the listener's `webhookSecret`.

<ThemedImage
    alt="Shopify Dev Dashboard app settings with the client ID and the client secret"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/ecommerce/shopify.admin/trigger-webhook-verifier-token.png'),
        dark: useBaseUrl('/img/connectors/catalog/ecommerce/shopify.admin/trigger-webhook-verifier-token.png'),
    }}
/>

### Test the webhook

Run your integration and trigger an event in the development store, for example by creating a product or an order. Each delivery shows up in the ngrok console with `200 OK`, and your callback runs.

<ThemedImage
    alt="ngrok console showing Shopify deliveries answered with 200 OK"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/ecommerce/shopify.admin/trigger-webhook-confirmed.png'),
        dark: useBaseUrl('/img/connectors/catalog/ecommerce/shopify.admin/trigger-webhook-confirmed.png'),
    }}
/>

:::warning
Set the app's client secret as `webhookSecret`. The listener verifies the `X-Shopify-Hmac-Sha256` header on every delivery, and while `webhookSecret` isn't set it rejects every delivery with `401 Unauthorized`.
:::

For production, deploy your integration at a stable HTTPS URL, set it as the `uri` of each subscription, and run `npx shopify app deploy` again.

## What's next

- [Action reference](actions.md): Available operations
- [Trigger reference](triggers.md): Event-driven integration
