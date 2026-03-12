---
sidebar_position: 12
title: "E-Commerce"
description: "E-commerce connectors for Shopify, WooCommerce, Stripe, and more in WSO2 Integrator."
---

# E-Commerce Connectors

Build integrations with e-commerce platforms and payment gateways. These connectors let you sync product catalogs, manage orders, process payments, and automate fulfillment workflows.

## Available Connectors

| Connector | Package | Use Case |
|-----------|---------|----------|
| **Shopify** | `ballerinax/shopify` | Manage products, orders, customers, and inventory |
| **WooCommerce** | `ballerinax/woocommerce` | Sync products, process orders, and manage store data |
| **Stripe** | `ballerinax/stripe` | Process payments, manage subscriptions, and handle refunds |
| **PayPal** | `ballerinax/paypal` | Process payments, manage disputes, and handle payouts |
| **Square** | `ballerinax/square` | Process payments, manage catalog, and handle orders |
| **Magento** | `ballerinax/magento` | Manage products, orders, customers, and inventory |
| **BigCommerce** | `ballerinax/bigcommerce` | Sync products, manage orders, and automate store operations |

## Quick Example

### Process a Shopify Order Webhook and Charge via Stripe

```ballerina
import ballerina/http;
import ballerinax/shopify;
import ballerinax/stripe;

configurable string shopifyStore = ?;
configurable string shopifyToken = ?;
configurable string stripeKey = ?;

final stripe:Client stripeClient = check new ({
    auth: {
        token: stripeKey
    }
});

service /webhooks on new http:Listener(8090) {
    resource function post orders(http:Request req) returns http:Response|error {
        json payload = check req.getJsonPayload();

        string orderId = check payload.id.toString();
        decimal totalPrice = check decimal:fromString(check payload.total_price);
        string currency = check payload.currency;
        string email = check payload.email;

        // Create a Stripe payment intent for the order
        stripe:PaymentIntent intent = check stripeClient->createPaymentIntent({
            amount: <int>(totalPrice * 100),
            currency: currency,
            receipt_email: email,
            metadata: {
                "shopify_order_id": orderId
            }
        });

        http:Response res = new;
        res.setJsonPayload({
            orderId: orderId,
            paymentIntentId: intent.id,
            status: intent.status
        });
        return res;
    }
}
```

## Configuration

```toml
# Shopify
[shopify]
shopifyStore = "your-store.myshopify.com"
shopifyToken = "<SHOPIFY_ACCESS_TOKEN>"

# Stripe
[stripe]
stripeKey = "<STRIPE_SECRET_KEY>"
```

## What's Next

- [Connection Configuration](configuration.md) -- How to set up and manage connections
- [Authentication Methods](authentication.md) -- OAuth 2.0, API keys, and other auth types
- [Shopify Outlook Email Integration](../tutorials/pre-built/shopify-outlook-email.md) -- Pre-built Shopify notification integration
- [E-Commerce Order Service Sample](../tutorials/samples/ecommerce-order-service.md) -- Full sample project
