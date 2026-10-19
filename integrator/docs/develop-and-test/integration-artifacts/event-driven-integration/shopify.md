---
title: Shopify
---

# Shopify

Shopify event integrations receive webhook callbacks from a Shopify store and trigger handler functions as orders, customers, products, and fulfillments change. Use them to sync order data with external systems, keep customer records up to date, or automate fulfillment workflows without polling the Shopify Admin API.

The Shopify webhook listener must be reachable from the internet. For local development, use a tunneling tool such as [ngrok](https://ngrok.com) to create a public URL for your local port. In production, deploy the integration to a publicly accessible host.

After starting the integration, register the webhook in your **Shopify admin** under **Settings > Notifications > Webhooks** (or via the Admin API), pointing the webhook URL to `https://<your-host>` with the topic that matches the event handlers you implement (for example, `orders/create`). Use the same **API secret key** configured in Shopify as the listener's `apiSecretKey`, which the listener uses to verify the `X-Shopify-Hmac-SHA256` signature on incoming requests.

## Creating a Shopify service

```ballerina
import ballerinax/trigger.shopify;
import ballerina/log;

configurable string apiSecretKey = ?;
configurable int port = 8090;

shopify:ListenerConfig listenerConfig = {
    apiSecretKey
};

listener shopify:Listener shopifyListener = new (listenerConfig, port);

service shopify:OrdersService on shopifyListener {

    remote function onOrdersCreate(shopify:OrderEvent event) returns error? {
        log:printInfo("Order created", orderId = (event?.id).toString());
    }

    remote function onOrdersUpdated(shopify:OrderEvent event) returns error? {
        log:printInfo("Order updated", orderId = (event?.id).toString());
    }

    remote function onOrdersPaid(shopify:OrderEvent event) returns error? {
        log:printInfo("Order paid", orderId = (event?.id).toString());
    }

    remote function onOrdersFulfilled(shopify:OrderEvent event) returns error? {
        log:printInfo("Order fulfilled", orderId = (event?.id).toString());
    }

    remote function onOrdersPartiallyFulfilled(shopify:OrderEvent event) returns error? {
        log:printInfo("Order partially fulfilled", orderId = (event?.id).toString());
    }

    remote function onOrdersCancelled(shopify:OrderEvent event) returns error? {
        log:printInfo("Order cancelled", orderId = (event?.id).toString());
    }
}
```

## Service and listener configuration

**Listener configuration** (`shopify:ListenerConfig`):

| Field | Description | Default |
|---|---|---|
| **apiSecretKey** | The Shopify app's API secret key, viewable under **Webhooks** in the Shopify admin dashboard. Used to verify the HMAC signature Shopify sends with each webhook request. | Required |

**Listener initialization:**

```ballerina
listener shopify:Listener shopifyListener = new (listenerConfig, 8090);
```

`shopify:Listener` accepts a `ListenerConfig` record and an optional port number (defaults to `8090`). The listener starts an HTTP server on that port to receive Shopify webhook callbacks.

A single Shopify integration can declare multiple services on the same listener — one per resource type (orders, customers, products, fulfillments) — to handle the topics that matter to your integration.

## Event handlers

The `ballerinax/trigger.shopify` package exposes one service type per Shopify resource. Attach the service types you need to a `shopify:Listener` and implement only the handlers relevant to your integration.

### OrdersService handlers

| Handler | Triggered when |
|---|---|
| `onOrdersCreate` | A new order is created |
| `onOrdersUpdated` | An existing order is updated |
| `onOrdersPaid` | An order is marked as paid |
| `onOrdersFulfilled` | An order is fully fulfilled |
| `onOrdersPartiallyFulfilled` | An order is partially fulfilled |
| `onOrdersCancelled` | An order is cancelled |

### CustomersService handlers

| Handler | Triggered when |
|---|---|
| `onCustomersCreate` | A new customer record is created |
| `onCustomersUpdate` | An existing customer record is updated |
| `onCustomersEnable` | A customer account is enabled |
| `onCustomersDisable` | A customer account is disabled |
| `onCustomersMarketingConsentUpdate` | A customer's marketing consent status changes |

### ProductsService handlers

| Handler | Triggered when |
|---|---|
| `onProductsCreate` | A new product is created |
| `onProductsUpdate` | An existing product is updated |

### FulfillmentsService handlers

| Handler | Triggered when |
|---|---|
| `onFulfillmentsCreate` | A new fulfillment is created for an order |
| `onFulfillmentsUpdate` | An existing fulfillment is updated |

## What's next

- [GitHub webhooks](github-webhooks.md) — react to GitHub webhook events
- [Twilio](twilio.md) — react to Twilio call and SMS status webhooks
- [Connections](../supportive-artifacts/connections.md) — reuse credentials across services
