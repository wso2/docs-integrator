---
title: Triggers
description: "Reference for the Shopify webhook listener and service callbacks: receive order, customer, product and fulfillment events in Ballerina integrations."
keywords: [shopify, webhook listener, shopify webhooks, event handler, ballerina]
connector: true
connector_name: "shopify.admin"
---

# Triggers

The `ballerinax/shopify.trigger` package receives Shopify webhooks. When an order, customer, product or fulfillment changes in a store, Shopify sends an HTTP request to your integration, and the listener calls the callback for that topic with a typed payload. It replaces the earlier `ballerinax/trigger.shopify` package.

This reference covers `ballerinax/shopify.trigger` version 1.0.0. The following components work together:

| Component | Role |
|-----------|------|
| `shopify:Listener` | Receives webhook requests from Shopify, verifies each one, and calls the attached service for its event. |
| `shopify:ListenerConfig` | Holds what the listener verifies deliveries with, the app's client secret. |
| Service types | 4 service types, such as `shopify:OrdersService`. Each callback handles one event. |
| Payload types | A typed record for each event, such as `shopify:OrderEvent`, passed to its callback. |

To call the Shopify API from your integration, use the `ballerinax/shopify.admin` connector. See the [Action Reference](actions.md).

## Error handling

The listener acknowledges a delivery to Shopify as soon as it is verified, and then calls your callback, so Shopify never waits on your code. What happens after that is logged:

| Log entry | When |
|-----------|------|
| `WEBHOOK_SIGNATURE_REJECTED` (warning) | The delivery failed verification. It is answered with `401 Unauthorized` and never reaches a service. The entry gives the reason. |
| `DISPATCH_FAILED` (error) | Your callback returned an error, or the payload didn't fit the callback's type. |
| `NO_HANDLER_FOR_EVENT` (warning) | The event isn't one the package knows. |
| `SERVICE_NOT_ATTACHED` (debug) | No service of the event's type is attached to the listener. |

## Listener

The `shopify:Listener` exposes an HTTP endpoint for Shopify to deliver webhooks to. Subscribe your app's webhook topics to its public URL. See the [Setup Guide](setup-guide.md#configuring-shopify-webhooks).

### Configuration

| Config Type | Description |
|-------------|-------------|
| `ListenerConfig` | Configuration for the Shopify webhook listener. |

**`ListenerConfig` fields:**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `webhookSecret` | <code>string</code> | Optional | The client secret of the Shopify app the webhooks belong to. The listener verifies every delivery with it, and rejects every delivery while it isn't set. |

The listener's second argument is the port to listen on, or an `http:Listener` to share. The default port is `8090`. A listener created on a port accepts request bodies up to 25 MB.

### Verifying deliveries

Shopify signs each delivery with the app's client secret, in the `X-Shopify-Hmac-Sha256` header: the Base64 HMAC-SHA256 of the raw request body. The listener computes the same value with `webhookSecret` and compares the two in constant time. A delivery without the header, with a different signature, or arriving while `webhookSecret` isn't set gets `401 Unauthorized`.

Shopify names each delivery's topic, such as `orders/create`, in the `X-Shopify-Topic` header, and the listener calls the callback for that topic.

### Initializing the listener

```ballerina
import ballerinax/shopify.trigger as shopify;

configurable string webhookSecret = ?;
configurable int port = 8090;

listener shopify:Listener shopifyListener = new ({webhookSecret}, port);
```

Set the secret in `Config.toml`:

```toml
webhookSecret = "<your Shopify app's client secret>"
```

## Service

Attach a service of one of the types below to the listener for each kind of event you need. Implement every callback of the type you attach; give a callback an empty body for an event you don't act on. Services of several types can share one listener. There are 15 callbacks in all.

A service can also be attached on a path of its own, such as `service shopify:OrdersService /shopify on shopifyListener`, so several triggers and HTTP services can share one `http:Listener`.

### Callback signatures

Every callback has the shape `remote function <callback>(shopify:<PayloadType> payload) returns error?`.

| Service type | Callbacks | Payload type |
|--------------|-----------|--------------|
| `shopify:OrdersService` | `onOrdersCreate`, `onOrdersCancelled`, `onOrdersFulfilled`, `onOrdersPaid`, `onOrdersPartiallyFulfilled`, `onOrdersUpdated` | <code>shopify:OrderEvent</code> |
| `shopify:CustomersService` | `onCustomersCreate`, `onCustomersDisable`, `onCustomersEnable`, `onCustomersUpdate`, `onCustomersMarketingConsentUpdate` | <code>shopify:CustomerEvent</code> |
| `shopify:ProductsService` | `onProductsCreate`, `onProductsUpdate` | <code>shopify:ProductEvent</code> |
| `shopify:FulfillmentsService` | `onFulfillmentsCreate`, `onFulfillmentsUpdate` | <code>shopify:FulfillmentEvent</code> |

### Full usage example

This is the [`order-lifecycle-logger`](https://github.com/ballerina-platform/module-ballerinax-shopify.trigger/tree/main/examples/order-lifecycle-logger) example from the package:

```ballerina
import ballerina/log;
import ballerinax/shopify.trigger as shopify;

configurable shopify:ListenerConfig config = {
    webhookSecret: "xxxxxx"
};

listener shopify:Listener webhookListener = new (config, 8090);

// The minimal, canonical use case: log every Order lifecycle event.
service shopify:OrdersService on webhookListener {

    remote function onOrdersCreate(shopify:OrderEvent payload) returns error? {
        log:printInfo("Order created", id = payload.id, name = payload.name);
    }

    remote function onOrdersUpdated(shopify:OrderEvent payload) returns error? {
        log:printInfo("Order updated", id = payload.id, name = payload.name);
    }

    remote function onOrdersCancelled(shopify:OrderEvent payload) returns error? {
        log:printInfo("Order cancelled", id = payload.id, name = payload.name);
    }

    remote function onOrdersFulfilled(shopify:OrderEvent payload) returns error? {
        log:printInfo("Order fulfilled", id = payload.id, name = payload.name);
    }

    remote function onOrdersPartiallyFulfilled(shopify:OrderEvent payload) returns error? {
        log:printInfo("Order partially fulfilled", id = payload.id, name = payload.name);
    }

    remote function onOrdersPaid(shopify:OrderEvent payload) returns error? {
        log:printInfo("Order paid", id = payload.id, name = payload.name);
    }
}
```

## Event payload types

Each service type has its own payload record. Field names are camelCase; each field reads the matching snake_case key from Shopify's JSON. The order payload used by the example above:

### `OrderEvent`

| Field | Type | Description |
|-------|------|-------------|
| `id` | <code>int</code> | The ID of the order, used for API purposes. This is different from the order_number property, which is the ID used by the shop owner and customer. Optional. |
| `email` | <code>string</code> | The customer's email address. Optional. |
| `closedAt` | <code>string</code> | The date and time (ISO 8601 format) when the order was closed. Returns null if the order isn't closed. Optional. |
| `createdAt` | <code>string</code> | The autogenerated date and time (ISO 8601 format) when the order was created in Shopify. The value for this property cannot be changed. Optional. |
| `updatedAt` | <code>string</code> | The date and time (ISO 8601 format) when the order was last modified. Filtering orders by updated_at is not an effective method for fetching orders because its value can change when no visible fields of an order have been updated. Use the Webhook and Event APIs to subscribe to order events instead. Optional. |
| `number` | <code>int</code> | The order's position in the shop's count of orders. Numbers are sequential and start at 1. Optional. |
| `note` | <code>string</code> | An optional note that a shop owner can attach to the order. Optional. |
| `token` | <code>string</code> | A unique value when referencing the order. Optional. |
| `gateway` | <code>string</code> | The payment gateway used. Optional. |
| `test` | <code>boolean</code> | Whether this is a test order. Optional. |
| `totalPrice` | <code>string</code> | The sum of all line item prices, discounts, shipping, taxes, and tips in the shop currency. Must be positive. Optional. |
| `subtotalPrice` | <code>string</code> | The price of the order in the shop currency after discounts but before shipping, duties, taxes, and tips. Optional. |
| `totalWeight` | <code>decimal</code> | The sum of all line item weights in grams. The sum is not adjusted as items are removed from the order. Optional. |
| `totalTax` | <code>string</code> | The sum of all the taxes applied to the order in the shop currency. Must be positive. Optional. |
| `taxesIncluded` | <code>boolean</code> | Whether taxes are included in the order subtotal. Optional. |
| `currency` | <code>string</code> | The three-letter code (ISO 4217 format) for the shop currency. Optional. |
| `financialStatus` | <code>string</code> | The status of payments associated with the order. Can only be set when the order is created. Optional. |
| `confirmed` | <code>boolean</code> | Confirmation status. Optional. |
| `totalDiscounts` | <code>string</code> | The total discounts applied to the price of the order in the shop currency. Optional. |
| `totalLineItemsPrice` | <code>string</code> | The sum of all line item prices in the shop currency. Optional. |
| `cartToken` | <code>string</code> | A unique value when referencing the cart that's associated with the order. Optional. |
| `buyerAcceptsMarketing` | <code>boolean</code> | Whether the customer consented to receive email updates from the shop. Optional. |
| `name` | <code>string</code> | The order name, generated by combining the order_number property with the order prefix and suffix that are set in the merchant's general settings. This is different from the id property, which is the ID of the order used by the API. This field can also be set by the API to be any string value. Optional. |
| `referringSite` | <code>string</code> | The website where the customer clicked a link to the shop. Optional. |
| `landingSite` | <code>string</code> | The URL for the page where the buyer landed when they entered the shop. Optional. |
| `cancelledAt` | <code>string</code> | The date and time when the order was canceled. Returns null if the order isn't canceled. Optional. |
| `cancelReason` | <code>string</code> | The reason why the order was canceled. Optional. |
| `totalPriceUsd` | <code>string</code> | The sum of all line item prices, discounts, shipping, taxes, and tips in the shop currency. Must be positive. Optional. |
| `checkoutToken` | <code>string</code> | A unique value when referencing the checkout that's associated with the order. Optional. |
| `reference` | <code>string</code> | The reference where the customer clicked a link to the shop. Optional. |
| `userId` | <code>int</code> | The ID of the user logged into Shopify POS who processed the order, if applicable. Optional. |
| `locationId` | <code>int</code> | The ID of the physical location where the order was processed. If you need to reference the location against an order, then use the FulfillmentOrder resource. Optional. |
| `sourceIdentifier` | <code>string</code> | The source identifier. Optional. |
| `sourceUrl` | <code>string</code> | The source url. Optional. |
| `processedAt` | <code>string</code> | The date and time (ISO 8601 format) when an order was processed. This value is the date that appears on your orders and that's used in the analytic reports. If you're importing orders from an app or another platform, then you can set processed_at to a date and time in the past to match when the original order was created. Optional. |
| `deviceId` | <code>int</code> | The device ID. Optional. |
| `phone` | <code>string</code> | The customer's phone number for receiving SMS notifications. Optional. |
| `customerLocale` | <code>string</code> | The two or three-letter language code, optionally followed by a region modifier. Optional. |
| `appId` | <code>int</code> | The ID of the app that created the order. Optional. |
| `browserIp` | <code>string</code> | The IP address of the browser used by the customer when they placed the order. Both IPv4 and IPv6 are supported. Optional. |
| `landingSiteRef` | <code>string</code> | The URL for the page where the buyer landed when they entered the shop. Optional. |
| `orderNumber` | <code>int</code> | The order 's position in the shop's count of orders starting at 1001. Order numbers are sequential and start at 1001. Optional. |
| `discountApplications` | <code>DiscountApplication[]</code> | An ordered list of stacked discount applications. Optional. |
| `discountCodes` | <code>DiscountCode[]</code> | A list of discounts applied to the order. Optional. |
| `noteAttributes` | <code>NoteAttribute[]</code> | Extra information that is added to the order. Appears in the Additional details section of an order details page. Each array entry must contain a hash with name and value keys. Optional. |
| `paymentGatewayNames` | <code>string[]</code> | The list of payment gateways used for the order. Optional. |
| `processingMethod` | <code>string</code> | How the payment was processed. It has the following valid values. Optional. |
| `sourceName` | <code>string</code> | Where the order originated. Can be set only during order creation, and is not writeable afterwards. Values for Shopify channels are protected and cannot be assigned by other API clients: web, pos, shopify_draft_order, iphone, and android. Orders created via the API can be assigned any other string of your choice. If unspecified, then new orders are assigned the value of your app's ID. Optional. |
| `fulfillmentStatus` | <code>string</code> | The order's status in terms of fulfilled line items. Optional. |
| `taxLines` | <code>TaxLine[]</code> | An array of tax line objects, each of which details a tax applicable to the order. When creating an order through the API, tax lines can be specified on the order or the line items but not both. Tax lines specified on the order are split across the taxable line items in the created order. Optional. |
| `tags` | <code>string</code> | Tags attached to the order, formatted as a string of comma-separated values. Tags are additional short descriptors, commonly used for filtering and searching. Each individual tag is limited to 40 characters in length. Optional. |
| `contactEmail` | <code>string</code> | The contact email address. Optional. |
| `orderStatusUrl` | <code>string</code> | The URL pointing to the order status web page, if applicable. Optional. |
| `presentmentCurrency` | <code>string</code> | The presentment currency that was used to display prices to the customer. Optional. |
| `totalLineItemsPriceSet` | <code>TotalLineItemsPriceSet</code> | The total of all line item prices in shop and presentment currencies. Optional. |
| `totalDiscountsSet` | <code>TotalDiscountsSet</code> | The total discounts applied to the price of the order in shop and presentment currencies. Optional. |
| `totalShippingPriceSet` | <code>TotalShippingPriceSet</code> | The total shipping price of the order, excluding discounts and returns, in shop and presentment currencies. If taxes_included is set to true, then total_shipping_price_set includes taxes. Optional. |
| `subtotalPriceSet` | <code>SubtotalPriceSet</code> | The subtotal of the order in shop and presentment currencies after discounts but before shipping, duties, taxes, and tips. Optional. |
| `totalPriceSet` | <code>TotalPriceSet</code> | The total price of the order in shop and presentment currencies. Optional. |
| `totalTaxSet` | <code>TotalTaxSet</code> | The total tax applied to the order in shop and presentment currencies. Optional. |
| `lineItems` | <code>OrderLineItem[]</code> | A list of line item objects, each containing information about an item in the order. Optional. |
| `fulfillments` | <code>Fulfillment[]</code> | An array of fulfillments associated with the order. For more information, see the Fulfillment API. Optional. |
| `refunds` | <code>Refund[]</code> | A list of refunds applied to the order. For more information, see the Refund API. Optional. |
| `totalTipReceived` | <code>string</code> | The sum of all the tips in the order in the shop currency. Optional. |
| `originalTotalDutiesSet` | <code>OriginalTotalDutiesSet</code> | The original total duties charged on the order in shop and presentment currencies. Optional. |
| `currentTotalDutiesSet` | <code>CurrentTotalDutiesSet</code> | The current total duties charged on the order in shop and presentment currencies. The amount values associated with this field reflect order edits, returns, and refunds. Optional. |
| `paymentTerms` | <code>PaymentTerms</code> | The terms and conditions under which a payment should be processed. Optional. |
| `adminGraphqlApiId` | <code>string</code> | Admin GraphQL API ID. Optional. |
| `shippingLines` | <code>ShippingLine[]</code> | An array of objects, each of which details a shipping method used. Optional. |
| `billingAddress` | <code>CustomerAddress</code> | The mailing address associated with the payment method. This address is an optional field that won't be available on orders that do not require a payment method. Optional. |
| `shippingAddress` | <code>CustomerAddress</code> | The mailing address associated with the payment method. This address is an optional field that won't be available on orders that do not require a payment method. Optional. |
| `customer` | <code>Customer</code> | The Customer resource stores information about a shop's customers, such as their contact details, their order history, and whether they've agreed to receive email marketing. Optional. |

## What's next

- [Setup Guide](setup-guide.md#configuring-shopify-webhooks): point Shopify at your listener.
- [Example](example.md#shopify-trigger-example): build a Shopify trigger integration in WSO2 Integrator.
- [Action Reference](actions.md): call the Shopify API with the `ballerinax/shopify.admin` connector.
