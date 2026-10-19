---
title: Triggers
---

# Triggers

The `ballerinax/trigger.shopify` package supports event-driven integration through Shopify webhook notifications. After you subscribe to Shopify webhook topics, the listener receives webhook requests and invokes your service callbacks when matching order, customer, product, or fulfillment events occur.

Three components work together:

| Component | Role |
|-----------|------|
| `shopify:Listener` | Exposes the webhook endpoint and dispatches incoming Shopify events to attached services. |
| `shopify:ListenerConfig` | Defines listener configuration, including the Shopify API secret key used to validate webhook requests. |
| `shopify:OrdersService` | Defines order event callbacks such as `onOrdersCreate`, `onOrdersPaid`, and `onOrdersUpdated`. |
| `shopify:CustomersService` | Defines customer event callbacks such as `onCustomersCreate`, `onCustomersUpdate`, and `onCustomersMarketingConsentUpdate`. |
| `shopify:ProductsService` | Defines product event callbacks such as `onProductsCreate` and `onProductsUpdate`. |
| `shopify:FulfillmentsService` | Defines fulfillment event callbacks such as `onFulfillmentsCreate` and `onFulfillmentsUpdate`. |

For action-based operations, see the [Action Reference](actions.md).

---

## Listener

The `shopify:Listener` receives Shopify webhook HTTP requests and routes events to the relevant service type. Configure Shopify webhook subscriptions to point to the public URL of the running listener, use `JSON` as the webhook format, and add a trailing `/` to the delivery URL if it is not already present.

### Configuration

The listener supports the following connection strategy:

| Config Type | Description |
|-------------|-------------|
| `ListenerConfig` | Configuration for the Shopify webhook listener. |

`ListenerConfig` fields:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `apiSecretKey` | `string` | Required | Shopify API secret key used to validate incoming webhook requests. |

The listener also accepts a port or an HTTP listener object to expose the webhook endpoint. If you do not provide a port, the listener uses the default port `8090`.

### Initializing the listener

**Listener with a configurable API secret and port:**

```ballerina
import ballerinax/trigger.shopify;

configurable string apiSecretKey = ?;
configurable int listenerPort = ?;

shopify:ListenerConfig listenerConfig = {
    apiSecretKey: apiSecretKey
};

listener shopify:Listener shopifyListener = new (listenerConfig, listenerPort);
```

**Listener with the default port:**

```ballerina
import ballerinax/trigger.shopify;

configurable string apiSecretKey = ?;

shopify:ListenerConfig listenerConfig = {
    apiSecretKey: apiSecretKey
};

listener shopify:Listener shopifyListener = new (listenerConfig);
```

---

## Service

A Shopify trigger service is a Ballerina service attached to a `shopify:Listener`. Select the service type that matches the Shopify webhook topic you want to handle.

### Callback signatures

| Service Type | Callback | Signature | Description |
|--------------|----------|-----------|-------------|
| `shopify:OrdersService` | `onOrdersCreate` | `remote function onOrdersCreate(shopify:OrderEvent event) returns error?` | Invoked when an order is created. |
| `shopify:OrdersService` | `onOrdersCancelled` | `remote function onOrdersCancelled(shopify:OrderEvent event) returns error?` | Invoked when an order is cancelled. |
| `shopify:OrdersService` | `onOrdersFulfilled` | `remote function onOrdersFulfilled(shopify:OrderEvent event) returns error?` | Invoked when an order is fulfilled. |
| `shopify:OrdersService` | `onOrdersPaid` | `remote function onOrdersPaid(shopify:OrderEvent event) returns error?` | Invoked when an order is paid. |
| `shopify:OrdersService` | `onOrdersPartiallyFulfilled` | `remote function onOrdersPartiallyFulfilled(shopify:OrderEvent event) returns error?` | Invoked when an order is partially fulfilled. |
| `shopify:OrdersService` | `onOrdersUpdated` | `remote function onOrdersUpdated(shopify:OrderEvent event) returns error?` | Invoked when an order is updated. |
| `shopify:CustomersService` | `onCustomersCreate` | `remote function onCustomersCreate(shopify:CustomerEvent event) returns error?` | Invoked when a customer is created. |
| `shopify:CustomersService` | `onCustomersDisable` | `remote function onCustomersDisable(shopify:CustomerEvent event) returns error?` | Invoked when a customer is disabled. |
| `shopify:CustomersService` | `onCustomersEnable` | `remote function onCustomersEnable(shopify:CustomerEvent event) returns error?` | Invoked when a customer is enabled. |
| `shopify:CustomersService` | `onCustomersUpdate` | `remote function onCustomersUpdate(shopify:CustomerEvent event) returns error?` | Invoked when a customer is updated. |
| `shopify:CustomersService` | `onCustomersMarketingConsentUpdate` | `remote function onCustomersMarketingConsentUpdate(shopify:CustomerEvent event) returns error?` | Invoked when a customer's marketing consent is updated. |
| `shopify:ProductsService` | `onProductsCreate` | `remote function onProductsCreate(shopify:ProductEvent event) returns error?` | Invoked when a product is created. |
| `shopify:ProductsService` | `onProductsUpdate` | `remote function onProductsUpdate(shopify:ProductEvent event) returns error?` | Invoked when a product is updated. |
| `shopify:FulfillmentsService` | `onFulfillmentsCreate` | `remote function onFulfillmentsCreate(shopify:FulfillmentEvent event) returns error?` | Invoked when a fulfillment is created. |
| `shopify:FulfillmentsService` | `onFulfillmentsUpdate` | `remote function onFulfillmentsUpdate(shopify:FulfillmentEvent event) returns error?` | Invoked when a fulfillment is updated. |

Implement only the callbacks relevant to the webhook topics subscribed in Shopify.

### Full usage example

```ballerina
import ballerina/log;
import ballerinax/trigger.shopify;

configurable string apiSecretKey = ?;
configurable int listenerPort = ?;

shopify:ListenerConfig listenerConfig = {
    apiSecretKey: apiSecretKey
};

listener shopify:Listener shopifyListener = new (listenerConfig, listenerPort);

service shopify:OrdersService on shopifyListener {
    remote function onOrdersCreate(shopify:OrderEvent event) returns error? {
        log:printInfo("Shopify order created",
            id = event.id,
            name = event.name,
            email = event.email,
            total = event.total_price
        );
    }

    remote function onOrdersPaid(shopify:OrderEvent event) returns error? {
        log:printInfo("Shopify order paid",
            id = event.id,
            name = event.name,
            total = event.total_price
        );
    }
}
```

## Supporting types

### `OrderEvent`

| Field | Type | Description |
|-------|------|-------------|
| `id` | `int?` | Unique identifier for the order. |
| `name` | `string?` | Order name generated from the order number and store settings. |
| `email` | `string?` | Customer email address. |
| `created_at` | `string?` | Date and time when the order was created. |
| `updated_at` | `string?` | Date and time when the order was last modified. |
| `processed_at` | `string?` | Date and time when the order was processed. |
| `currency` | `string?` | Three-letter shop currency code. |
| `total_price` | `string?` | Total order price in the shop currency. |
| `subtotal_price` | `string?` | Order subtotal in the shop currency. |
| `total_tax` | `string?` | Total tax for the order. |
| `financial_status` | `string?` | Payment status of the order. |
| `fulfillment_status` | `string?` | Fulfillment status of the order. |
| `line_items` | `OrderLineItem[]?` | Line items included in the order. |
| `customer` | `Customer?` | Customer associated with the order. |

### `CustomerEvent`

| Field | Type | Description |
|-------|------|-------------|
| `id` | `int?` | Unique identifier for the customer. |
| `email` | `string?` | Customer email address. |
| `first_name` | `string?` | Customer first name. |
| `last_name` | `string?` | Customer last name. |
| `phone` | `string?` | Customer phone number. |
| `created_at` | `string?` | Date and time when the customer was created. |
| `updated_at` | `string?` | Date and time when the customer information was last updated. |
| `orders_count` | `int?` | Number of orders associated with the customer. |
| `total_spent` | `string?` | Total amount spent by the customer. |
| `state` | `string?` | Customer account state. |
| `accepts_marketing` | `boolean?` | Whether the customer consented to marketing. |
| `tags` | `string?` | Comma-separated tags attached to the customer. |

### `ProductEvent`

| Field | Type | Description |
|-------|------|-------------|
| `id` | `int?` | Unique identifier for the product. |
| `title` | `string?` | Product title. |
| `body_html` | `string?` | Product description in HTML. |
| `vendor` | `string?` | Product vendor. |
| `product_type` | `string?` | Product type. |
| `created_at` | `string?` | Date and time when the product was created. |
| `updated_at` | `string?` | Date and time when the product was last updated. |
| `published_at` | `string?` | Date and time when the product was published. |
| `handle` | `string?` | Human-friendly product handle. |
| `variants` | `ProductVariant[]?` | Product variants. |
| `options` | `ProductOption[]?` | Product options. |
| `images` | `ProductImage[]?` | Product images. |

### `FulfillmentEvent`

| Field | Type | Description |
|-------|------|-------------|
| `id` | `int?` | Unique identifier for the fulfillment. |
| `order_id` | `int?` | Order associated with the fulfillment. |
| `status` | `string?` | Fulfillment status. |
| `created_at` | `string?` | Date and time when the fulfillment was created. |
| `updated_at` | `string?` | Date and time when the fulfillment was last updated. |
| `tracking_company` | `string?` | Tracking company name, when available. |
| `tracking_number` | `string?` | Tracking number, when available. |
| `tracking_url` | `string?` | Tracking URL, when available. |
| `line_items` | `LineItem[]?` | Fulfilled line items. |
