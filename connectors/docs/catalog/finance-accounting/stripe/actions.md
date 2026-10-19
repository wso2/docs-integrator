---
title: Actions
---

# Actions

The `ballerinax/stripe` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Provides access to all Stripe REST API V1 resources including customers, payments, invoices, subscriptions, products, and more. |

---

## Client

Provides access to all Stripe REST API V1 resources including customers, payments, invoices, subscriptions, products, and more.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `http:BearerTokenConfig` | Required | Bearer token configuration. Provide your Stripe secret key as the `token` field. |
| `serviceUrl` | `string` | `https://api.stripe.com` | The base URL of the Stripe API. |
| `httpVersion` | `HttpVersion` | `HTTP_2_0` | HTTP protocol version. |
| `timeout` | `decimal` | `60` | Request timeout in seconds. |
| `retryConfig` | `RetryConfig` | `()` | Retry configuration for failed requests. |
| `secureSocket` | `ClientSecureSocket` | `()` | SSL/TLS configuration. |
| `proxy` | `ProxyConfig` | `()` | Proxy server configuration. |

### Initializing the client

```ballerina
import ballerinax/stripe;

configurable string secretKey = ?;

stripe:Client stripe = check new ({
    auth: {
        token: secretKey
    }
});
```

### Operations

#### Customer management

<details>
<summary>List all customers</summary>

Returns a list of customers. The customers are returned sorted by creation date, with the most recent customers appearing first.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `email` | `string?` | No | Filter by customer email address. |
| `limit` | `int?` | No | Maximum number of customers to return (1–100). Default is 10. |
| `starting_after` | `string?` | No | Cursor for pagination. Provide a customer ID to list customers created after this customer. |

Returns: `stripe:CustomerResourceCustomerList|error`

Sample code:

```ballerina
stripe:CustomerResourceCustomerList customers = check stripe->/customers;
```

Sample response:

```ballerina
{
  "object": "list",
  "data": [
    {
      "id": "cus_PxN1234abcdef",
      "object": "customer",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "created": 1700000000
    }
  ],
  "has_more": false,
  "url": "/v1/customers"
}
```

</details>

<details>
<summary>Create a customer</summary>

Creates a new customer object with the provided details.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `stripe:customers_body` | Yes | Customer creation payload containing name, email, address, and other details. |

Returns: `stripe:Customer|error`

Sample code:

```ballerina
stripe:Customer customer = check stripe->/customers.post({
    name: "John Doe",
    email: "john.doe@example.com",
    address: {
        city: "Colombo",
        country: "LK"
    }
});
```

Sample response:

```ballerina
{
  "id": "cus_PxN1234abcdef",
  "object": "customer",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "address": {
    "city": "Colombo",
    "country": "LK"
  },
  "created": 1700000000,
  "livemode": false
}
```

</details>

<details>
<summary>Retrieve a customer</summary>

Retrieves the details of an existing customer by their ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `customer` | `string` | Yes | The ID of the customer to retrieve. |

Returns: `stripe:Customer|error`

Sample code:

```ballerina
stripe:Customer customer = check stripe->/customers/["cus_PxN1234abcdef"];
```

Sample response:

```ballerina
{
  "id": "cus_PxN1234abcdef",
  "object": "customer",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "created": 1700000000
}
```

</details>

<details>
<summary>Update a customer</summary>

Updates the specified customer by setting the values of the parameters passed. Any parameters not provided will be left unchanged.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `customer` | `string` | Yes | The ID of the customer to update. |
| `payload` | `stripe:customers_customer_body` | Yes | Customer update payload. |

Returns: `stripe:Customer|error`

Sample code:

```ballerina
stripe:Customer updated = check stripe->/customers/["cus_PxN1234abcdef"].post({
    name: "Jane Doe",
    email: "jane.doe@example.com"
});
```

Sample response:

```ballerina
{
  "id": "cus_PxN1234abcdef",
  "object": "customer",
  "name": "Jane Doe",
  "email": "jane.doe@example.com",
  "created": 1700000000
}
```

</details>

<details>
<summary>Delete a customer</summary>

Permanently deletes a customer. It cannot be undone. Any active subscriptions on the customer will also be cancelled.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `customer` | `string` | Yes | The ID of the customer to delete. |

Returns: `stripe:Deleted_customer|error`

Sample code:

```ballerina
stripe:Deleted_customer deleted = check stripe->/customers/["cus_PxN1234abcdef"].delete();
```

Sample response:

```ballerina
{
  "id": "cus_PxN1234abcdef",
  "object": "customer",
  "deleted": true
}
```

</details>

#### Payment intents

<details>
<summary>Create a payment intent</summary>

Creates a PaymentIntent object. After creation, attach a payment method and confirm to continue the payment.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `stripe:payment_intents_body` | Yes | Payment intent creation payload including amount, currency, and optional parameters. |

Returns: `stripe:Payment_intent|error`

Sample code:

```ballerina
stripe:Payment_intent paymentIntent = check stripe->/payment_intents.post({
    amount: 2000,
    currency: "usd",
    payment_method_types: ["card"]
});
```

Sample response:

```ballerina
{
  "id": "pi_3MtwBwLkdIwHu7ix28a3tqPa",
  "object": "payment_intent",
  "amount": 2000,
  "currency": "usd",
  "status": "requires_payment_method",
  "client_secret": "pi_3MtwBwLkdIwHu7ix28a3tqPa_secret_YrKJUKribcBjcG8HVhfZluoGH"
}
```

</details>

<details>
<summary>Retrieve a payment intent</summary>

Retrieves the details of a PaymentIntent that was previously created.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `intent` | `string` | Yes | The ID of the PaymentIntent to retrieve. |

Returns: `stripe:Payment_intent|error`

Sample code:

```ballerina
stripe:Payment_intent intent = check stripe->/payment_intents/["pi_3MtwBwLkdIwHu7ix28a3tqPa"];
```

Sample response:

```ballerina
{
  "id": "pi_3MtwBwLkdIwHu7ix28a3tqPa",
  "object": "payment_intent",
  "amount": 2000,
  "currency": "usd",
  "status": "requires_payment_method"
}
```

</details>

<details>
<summary>List all payment intents</summary>

Returns a list of PaymentIntents.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `customer` | `string?` | No | Filter by customer ID. |
| `limit` | `int?` | No | Maximum number of results to return (1–100). |

Returns: `stripe:PaymentFlowsPaymentIntentResourcePaymentIntentList|error`

Sample code:

```ballerina
stripe:PaymentFlowsPaymentIntentResourcePaymentIntentList intents = check stripe->/payment_intents;
```

Sample response:

```ballerina
{
  "object": "list",
  "data": [
    {
      "id": "pi_3MtwBwLkdIwHu7ix28a3tqPa",
      "object": "payment_intent",
      "amount": 2000,
      "currency": "usd",
      "status": "succeeded"
    }
  ],
  "has_more": false
}
```

</details>

<details>
<summary>Confirm a payment intent</summary>

Confirms a PaymentIntent, transitioning it to a state where it can process a payment.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `intent` | `string` | Yes | The ID of the PaymentIntent to confirm. |
| `payload` | `stripe:intent_confirm_body` | No | Confirmation payload with optional payment method and return URL. |

Returns: `stripe:Payment_intent|error`

Sample code:

```ballerina
stripe:Payment_intent confirmed = check stripe->/payment_intents/["pi_3MtwBwLkdIwHu7ix28a3tqPa"]/confirm.post({
    payment_method: "pm_card_visa"
});
```

Sample response:

```ballerina
{
  "id": "pi_3MtwBwLkdIwHu7ix28a3tqPa",
  "object": "payment_intent",
  "amount": 2000,
  "currency": "usd",
  "status": "succeeded"
}
```

</details>

<details>
<summary>Cancel a payment intent</summary>

Cancels a PaymentIntent. After cancellation, no additional charges are made.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `intent` | `string` | Yes | The ID of the PaymentIntent to cancel. |

Returns: `stripe:Payment_intent|error`

Sample code:

```ballerina
stripe:Payment_intent cancelled = check stripe->/payment_intents/["pi_3MtwBwLkdIwHu7ix28a3tqPa"]/cancel.post();
```

Sample response:

```ballerina
{
  "id": "pi_3MtwBwLkdIwHu7ix28a3tqPa",
  "object": "payment_intent",
  "amount": 2000,
  "currency": "usd",
  "status": "canceled"
}
```

</details>

#### Charges

<details>
<summary>Create a charge</summary>

Creates a new charge. Use the Payment Intents API for new integrations; this endpoint is for legacy compatibility.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `stripe:charges_body` | Yes | Charge creation payload including amount, currency, and source or customer. |

Returns: `stripe:Charge|error`

Sample code:

```ballerina
stripe:Charge charge = check stripe->/charges.post({
    amount: 1500,
    currency: "usd",
    source: "tok_visa"
});
```

Sample response:

```ballerina
{
  "id": "ch_3MmlLrLkdIwHu7ix0snN0B15",
  "object": "charge",
  "amount": 1500,
  "currency": "usd",
  "status": "succeeded",
  "paid": true
}
```

</details>

<details>
<summary>Retrieve a charge</summary>

Retrieves the details of a charge that has previously been created.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `charge` | `string` | Yes | The ID of the charge to retrieve. |

Returns: `stripe:Charge|error`

Sample code:

```ballerina
stripe:Charge charge = check stripe->/charges/["ch_3MmlLrLkdIwHu7ix0snN0B15"];
```

Sample response:

```ballerina
{
  "id": "ch_3MmlLrLkdIwHu7ix0snN0B15",
  "object": "charge",
  "amount": 1500,
  "currency": "usd",
  "status": "succeeded"
}
```

</details>

<details>
<summary>List all charges</summary>

Returns a list of charges you have previously created.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `customer` | `string?` | No | Filter by customer ID. |
| `limit` | `int?` | No | Maximum number of results to return. |

Returns: `stripe:ChargeList|error`

Sample code:

```ballerina
stripe:ChargeList charges = check stripe->/charges;
```

Sample response:

```ballerina
{
  "object": "list",
  "data": [
    {
      "id": "ch_3MmlLrLkdIwHu7ix0snN0B15",
      "amount": 1500,
      "currency": "usd",
      "status": "succeeded"
    }
  ],
  "has_more": false
}
```

</details>

#### Products & prices

<details>
<summary>Create a product</summary>

Creates a new product object.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `stripe:products_body` | Yes | Product creation payload with name and optional details. |

Returns: `stripe:Product|error`

Sample code:

```ballerina
stripe:Product product = check stripe->/products.post({
    name: "Premium Plan",
    description: "Access to all premium features"
});
```

Sample response:

```ballerina
{
  "id": "prod_OkIaGzRTh1gQqH",
  "object": "product",
  "name": "Premium Plan",
  "description": "Access to all premium features",
  "active": true,
  "created": 1700000000
}
```

</details>

<details>
<summary>List all products</summary>

Returns a list of your products.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `active` | `boolean?` | No | Filter by active status. |
| `limit` | `int?` | No | Maximum number of results to return. |

Returns: `stripe:ProductList|error`

Sample code:

```ballerina
stripe:ProductList products = check stripe->/products;
```

Sample response:

```ballerina
{
  "object": "list",
  "data": [
    {
      "id": "prod_OkIaGzRTh1gQqH",
      "object": "product",
      "name": "Premium Plan",
      "active": true
    }
  ],
  "has_more": false
}
```

</details>

<details>
<summary>Create a price</summary>

Creates a new price for an existing product.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `stripe:prices_body` | Yes | Price creation payload with currency, unit_amount, and product reference. |

Returns: `stripe:Price|error`

Sample code:

```ballerina
stripe:Price price = check stripe->/prices.post({
    unit_amount: 1999,
    currency: "usd",
    recurring: {
        interval: "month"
    },
    product: "prod_OkIaGzRTh1gQqH"
});
```

Sample response:

```ballerina
{
  "id": "price_1MoBy5LkdIwHu7ixZhnattbh",
  "object": "price",
  "unit_amount": 1999,
  "currency": "usd",
  "recurring": {
    "interval": "month"
  },
  "product": "prod_OkIaGzRTh1gQqH",
  "active": true
}
```

</details>

<details>
<summary>List all prices</summary>

Returns a list of your prices.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `product` | `string?` | No | Filter by product ID. |
| `active` | `boolean?` | No | Filter by active status. |

Returns: `stripe:PriceList|error`

Sample code:

```ballerina
stripe:PriceList prices = check stripe->/prices(product = "prod_OkIaGzRTh1gQqH");
```

Sample response:

```ballerina
{
  "object": "list",
  "data": [
    {
      "id": "price_1MoBy5LkdIwHu7ixZhnattbh",
      "unit_amount": 1999,
      "currency": "usd",
      "product": "prod_OkIaGzRTh1gQqH"
    }
  ],
  "has_more": false
}
```

</details>

#### Invoices

<details>
<summary>Create an invoice</summary>

Creates a draft invoice for a given customer. The draft invoice pulls in all pending invoice items on that customer.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `stripe:invoices_body` | Yes | Invoice creation payload with customer and optional details. |

Returns: `stripe:Invoice|error`

Sample code:

```ballerina
stripe:Invoice invoice = check stripe->/invoices.post({
    customer: "cus_PxN1234abcdef",
    collection_method: "send_invoice",
    days_until_due: 30
});
```

Sample response:

```ballerina
{
  "id": "in_1MtHbELkdIwHu7ixl4OzzPMv",
  "object": "invoice",
  "customer": "cus_PxN1234abcdef",
  "status": "draft",
  "collection_method": "send_invoice",
  "days_until_due": 30,
  "amount_due": 0
}
```

</details>

<details>
<summary>Retrieve an invoice</summary>

Retrieves the invoice with the given ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `invoice` | `string` | Yes | The ID of the invoice to retrieve. |

Returns: `stripe:Invoice|error`

Sample code:

```ballerina
stripe:Invoice invoice = check stripe->/invoices/["in_1MtHbELkdIwHu7ixl4OzzPMv"];
```

Sample response:

```ballerina
{
  "id": "in_1MtHbELkdIwHu7ixl4OzzPMv",
  "object": "invoice",
  "customer": "cus_PxN1234abcdef",
  "status": "draft",
  "amount_due": 0
}
```

</details>

<details>
<summary>Finalize an invoice</summary>

Finalizes a draft invoice, transitioning its status from draft to open. A finalized invoice can no longer be deleted or have its monetary values changed.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `invoice` | `string` | Yes | The ID of the invoice to finalize. |

Returns: `stripe:Invoice|error`

Sample code:

```ballerina
stripe:Invoice finalized = check stripe->/invoices/["in_1MtHbELkdIwHu7ixl4OzzPMv"]/finalize.post();
```

Sample response:

```ballerina
{
  "id": "in_1MtHbELkdIwHu7ixl4OzzPMv",
  "object": "invoice",
  "status": "open",
  "amount_due": 2000,
  "hosted_invoice_url": "https://invoice.stripe.com/i/acct_1M2JTk/test_xxxxx"
}
```

</details>

<details>
<summary>List all invoices</summary>

Returns a list of invoices. The invoices are returned sorted by creation date, with the most recent ones appearing first.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `customer` | `string?` | No | Filter by customer ID. |
| `status` | `string?` | No | Filter by invoice status: `draft`, `open`, `paid`, `uncollectible`, or `void`. |

Returns: `stripe:InvoicesList|error`

Sample code:

```ballerina
stripe:InvoicesList invoices = check stripe->/invoices(customer = "cus_PxN1234abcdef");
```

Sample response:

```ballerina
{
  "object": "list",
  "data": [
    {
      "id": "in_1MtHbELkdIwHu7ixl4OzzPMv",
      "status": "open",
      "amount_due": 2000,
      "customer": "cus_PxN1234abcdef"
    }
  ],
  "has_more": false
}
```

</details>

#### Subscriptions

<details>
<summary>Create a subscription</summary>

Creates a new subscription on an existing customer.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `stripe:subscriptions_body` | Yes | Subscription creation payload with customer, items, and optional parameters. |

Returns: `stripe:Subscription|error`

Sample code:

```ballerina
stripe:Subscription subscription = check stripe->/subscriptions.post({
    customer: "cus_PxN1234abcdef",
    items: [
        { price: "price_1MoBy5LkdIwHu7ixZhnattbh" }
    ]
});
```

Sample response:

```ballerina
{
  "id": "sub_1MowQVLkdIwHu7ixeRlqHVzs",
  "object": "subscription",
  "customer": "cus_PxN1234abcdef",
  "status": "active",
  "items": {
    "data": [
      {
        "price": {
          "id": "price_1MoBy5LkdIwHu7ixZhnattbh",
          "unit_amount": 1999
        }
      }
    ]
  }
}
```

</details>

<details>
<summary>Retrieve a subscription</summary>

Retrieves the subscription with the given ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `subscription_exposed_id` | `string` | Yes | The ID of the subscription to retrieve. |

Returns: `stripe:Subscription|error`

Sample code:

```ballerina
stripe:Subscription sub = check stripe->/subscriptions/["sub_1MowQVLkdIwHu7ixeRlqHVzs"];
```

Sample response:

```ballerina
{
  "id": "sub_1MowQVLkdIwHu7ixeRlqHVzs",
  "object": "subscription",
  "customer": "cus_PxN1234abcdef",
  "status": "active",
  "current_period_end": 1700604800
}
```

</details>

<details>
<summary>Cancel a subscription</summary>

Cancels a customer's subscription immediately. The customer will not be charged again for the subscription.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `subscription_exposed_id` | `string` | Yes | The ID of the subscription to cancel. |

Returns: `stripe:Subscription|error`

Sample code:

```ballerina
stripe:Subscription cancelled = check stripe->/subscriptions/["sub_1MowQVLkdIwHu7ixeRlqHVzs"].delete();
```

Sample response:

```ballerina
{
  "id": "sub_1MowQVLkdIwHu7ixeRlqHVzs",
  "object": "subscription",
  "status": "canceled",
  "canceled_at": 1700100000
}
```

</details>

<details>
<summary>List all subscriptions</summary>

Returns a list of your active subscriptions.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `customer` | `string?` | No | Filter by customer ID. |
| `status` | `string?` | No | Filter by status: `active`, `past_due`, `canceled`, etc. |

Returns: `stripe:SubscriptionList|error`

Sample code:

```ballerina
stripe:SubscriptionList subs = check stripe->/subscriptions(customer = "cus_PxN1234abcdef");
```

Sample response:

```ballerina
{
  "object": "list",
  "data": [
    {
      "id": "sub_1MowQVLkdIwHu7ixeRlqHVzs",
      "status": "active",
      "customer": "cus_PxN1234abcdef"
    }
  ],
  "has_more": false
}
```

</details>

#### Refunds

<details>
<summary>Create a refund</summary>

Creates a refund for a charge or a payment intent.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `stripe:refunds_body` | Yes | Refund creation payload with charge or payment_intent and optional amount. |

Returns: `stripe:Refund|error`

Sample code:

```ballerina
stripe:Refund refund = check stripe->/refunds.post({
    payment_intent: "pi_3MtwBwLkdIwHu7ix28a3tqPa",
    amount: 500
});
```

Sample response:

```ballerina
{
  "id": "re_3MtwBwLkdIwHu7ix0snN0B15",
  "object": "refund",
  "amount": 500,
  "currency": "usd",
  "status": "succeeded",
  "payment_intent": "pi_3MtwBwLkdIwHu7ix28a3tqPa"
}
```

</details>

<details>
<summary>Retrieve a refund</summary>

Retrieves the details of an existing refund.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `refund` | `string` | Yes | The ID of the refund to retrieve. |

Returns: `stripe:Refund|error`

Sample code:

```ballerina
stripe:Refund refund = check stripe->/refunds/["re_3MtwBwLkdIwHu7ix0snN0B15"];
```

Sample response:

```ballerina
{
  "id": "re_3MtwBwLkdIwHu7ix0snN0B15",
  "object": "refund",
  "amount": 500,
  "currency": "usd",
  "status": "succeeded"
}
```

</details>

#### Balance

<details>
<summary>Retrieve balance</summary>

Retrieves the current account balance, based on the authentication that was used to make the request.

Returns: `stripe:Balance|error`

Sample code:

```ballerina
stripe:Balance balance = check stripe->/balance;
```

Sample response:

```ballerina
{
  "object": "balance",
  "available": [
    {
      "amount": 125000,
      "currency": "usd",
      "source_types": {
        "card": 125000
      }
    }
  ],
  "pending": [
    {
      "amount": 5000,
      "currency": "usd"
    }
  ],
  "livemode": false
}
```

</details>

<details>
<summary>List balance transactions</summary>

Returns a list of transactions that have contributed to the Stripe account balance.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `limit` | `int?` | No | Maximum number of results to return. |
| `type` | `string?` | No | Filter by transaction type (e.g., `charge`, `refund`, `payout`). |

Returns: `stripe:BalanceTransactionsList|error`

Sample code:

```ballerina
stripe:BalanceTransactionsList txns = check stripe->/balance_transactions(limit = 5);
```

Sample response:

```ballerina
{
  "object": "list",
  "data": [
    {
      "id": "txn_1MiN3gLkdIwHu7ixT6lFMOHd",
      "object": "balance_transaction",
      "amount": 1500,
      "currency": "usd",
      "type": "charge",
      "net": 1420,
      "fee": 80
    }
  ],
  "has_more": true
}
```

</details>

#### Payouts

<details>
<summary>Create a payout</summary>

Sends funds to your own bank account. The Stripe account balance must cover the payout amount.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `stripe:payouts_body` | Yes | Payout creation payload with amount and currency. |

Returns: `stripe:Payout|error`

Sample code:

```ballerina
stripe:Payout payout = check stripe->/payouts.post({
    amount: 10000,
    currency: "usd"
});
```

Sample response:

```ballerina
{
  "id": "po_1MtRbE2eZvKYlo2CRzQp6dYG",
  "object": "payout",
  "amount": 10000,
  "currency": "usd",
  "status": "in_transit",
  "arrival_date": 1700604800
}
```

</details>

<details>
<summary>List all payouts</summary>

Returns a list of existing payouts.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `status` | `string?` | No | Filter by payout status. |
| `limit` | `int?` | No | Maximum number of results to return. |

Returns: `stripe:PayoutList|error`

Sample code:

```ballerina
stripe:PayoutList payouts = check stripe->/payouts;
```

Sample response:

```ballerina
{
  "object": "list",
  "data": [
    {
      "id": "po_1MtRbE2eZvKYlo2CRzQp6dYG",
      "amount": 10000,
      "currency": "usd",
      "status": "paid"
    }
  ],
  "has_more": false
}
```

</details>
