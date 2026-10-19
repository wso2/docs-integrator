---
title: Actions
---

# Actions

The `ballerinax/paypal.orders` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Manages the full PayPal order lifecycle: creation, retrieval, update, authorization, capture, and shipment tracking. |

---

## Client

Manages the full PayPal order lifecycle: creation, retrieval, update, authorization, capture, and shipment tracking.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `OAuth2ClientCredentialsGrantConfig` | Required | OAuth 2.0 client credentials configuration with `clientId`, `clientSecret`, and `tokenUrl`. |
| `httpVersion` | `http:HttpVersion` | `HTTP_2_0` | HTTP protocol version. |
| `timeout` | `decimal` | `30` | Request timeout in seconds. |
| `retryConfig` | `http:RetryConfig` | `()` | Retry configuration for failed requests. |
| `secureSocket` | `http:ClientSecureSocket` | `()` | SSL/TLS configuration. |
| `proxy` | `http:ProxyConfig` | `()` | Proxy server configuration. |
| `circuitBreaker` | `http:CircuitBreakerConfig` | `()` | Circuit breaker configuration for fault tolerance. |
| `compression` | `http:Compression` | `AUTO` | HTTP compression setting. |
| `validation` | `boolean` | `true` | Enable/disable payload validation. |

### Initializing the client

```ballerina
import ballerinax/paypal.orders;

configurable string clientId = ?;
configurable string clientSecret = ?;

orders:Client paypalOrders = check new ({
    auth: {
        clientId: clientId,
        clientSecret: clientSecret,
        tokenUrl: "https://api-m.sandbox.paypal.com/v1/oauth2/token"
    }
});
```

### Operations

#### Order lifecycle

<details>
<summary>Create an order</summary>

Creates a new order with the specified intent (CAPTURE or AUTHORIZE) and purchase units.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `OrderRequest` | Yes | The order request containing `intent` and `purchase_units`. |
| `headers` | `OrdersCreateHeaders` | No | Optional headers including `PayPal-Request-Id` and `Prefer`. |

Returns: `Order|error`

Sample code:

```ballerina
orders:Order createdOrder = check paypalOrders->/orders.post({
    intent: "CAPTURE",
    purchase_units: [
        {
            amount: {
                currency_code: "USD",
                value: "100.00"
            }
        }
    ]
});
```

Sample response:

```ballerina
{
  "id": "5O190127TN364715T",
  "status": "CREATED",
  "intent": "CAPTURE",
  "purchase_units": [
    {
      "reference_id": "default",
      "amount": {
        "currency_code": "USD",
        "value": "100.00"
      }
    }
  ],
  "links": [
    {"href": "https://api-m.sandbox.paypal.com/v2/checkout/orders/5O190127TN364715T", "rel": "self", "method": "GET"},
    {"href": "https://www.sandbox.paypal.com/checkoutnow?token=5O190127TN364715T", "rel": "approve", "method": "GET"},
    {"href": "https://api-m.sandbox.paypal.com/v2/checkout/orders/5O190127TN364715T", "rel": "update", "method": "PATCH"},
    {"href": "https://api-m.sandbox.paypal.com/v2/checkout/orders/5O190127TN364715T/capture", "rel": "capture", "method": "POST"}
  ]
}
```

</details>

<details>
<summary>Show order details</summary>

Retrieves the details of an existing order by its ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | Yes | The PayPal order ID. |
| `queries` | `OrdersGetQueries` | No | Optional query parameters. Use `fields: "payment_source"` to include payment source details. |

Returns: `Order|error`

Sample code:

```ballerina
orders:Order orderDetails = check paypalOrders->/orders/["5O190127TN364715T"];
```

Sample response:

```ballerina
{
  "id": "5O190127TN364715T",
  "status": "CREATED",
  "intent": "CAPTURE",
  "purchase_units": [
    {
      "reference_id": "default",
      "amount": {
        "currency_code": "USD",
        "value": "100.00"
      }
    }
  ],
  "links": [
    {"href": "https://api-m.sandbox.paypal.com/v2/checkout/orders/5O190127TN364715T", "rel": "self", "method": "GET"},
    {"href": "https://www.sandbox.paypal.com/checkoutnow?token=5O190127TN364715T", "rel": "approve", "method": "GET"}
  ]
}
```

</details>

<details>
<summary>Update order</summary>

Updates an existing order using JSON Patch operations. Can modify amount, description, shipping, and other fields.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | Yes | The PayPal order ID. |
| `payload` | `PatchRequest (Patch[])` | Yes | Array of JSON Patch operations to apply. |

Returns: `error?`

Sample code:

```ballerina
check paypalOrders->/orders/[orderId].patch([
    {
        op: "replace",
        path: "/purchase_units/@reference_id=='default'/amount",
        value: {
            currency_code: "USD",
            value: "200.00",
            breakdown: {
                item_total: {
                    currency_code: "USD",
                    value: "200.00"
                }
            }
        }
    }
]);
```

</details>

#### Payment processing

<details>
<summary>Confirm the order</summary>

Confirms a payment source for an order before authorization or capture. Payer interaction may be required after confirmation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | Yes | The PayPal order ID. |
| `payload` | `ConfirmOrderRequest` | Yes | The confirm order request containing the payment source. |
| `headers` | `OrdersConfirmHeaders` | No | Optional headers including `PayPal-Client-Metadata-Id` and `Prefer`. |

Returns: `Order|error`

Sample code:

```ballerina
orders:Order confirmedOrder = check paypalOrders->/orders/[orderId]/confirm\-payment\-source.post({
    payment_source: {
        card: {
            number: "4111111111111111",
            expiry: "2028-02",
            name: "John Doe",
            billing_address: {
                address_line_1: "123 Main St",
                admin_area_2: "San Jose",
                admin_area_1: "CA",
                postal_code: "95131",
                country_code: "US"
            }
        }
    }
});
```

Sample response:

```ballerina
{
  "id": "5O190127TN364715T",
  "status": "APPROVED",
  "intent": "CAPTURE",
  "payment_source": {
    "card": {
      "last_digits": "1111",
      "brand": "VISA",
      "type": "CREDIT"
    }
  },
  "purchase_units": [
    {
      "reference_id": "default",
      "amount": {
        "currency_code": "USD",
        "value": "200.00"
      }
    }
  ]
}
```

</details>

<details>
<summary>Authorize payment for order</summary>

Authorizes payment for an approved order. The authorization places a hold on the payer's funds but does not capture them.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | Yes | The PayPal order ID. |
| `payload` | `OrderAuthorizeRequest` | Yes | The authorize request, optionally containing a payment source. |
| `headers` | `OrdersAuthorizeHeaders` | No | Optional headers including `PayPal-Request-Id` and `Prefer`. |

Returns: `OrderAuthorizeResponse|error`

Sample code:

```ballerina
orders:OrderAuthorizeResponse authResponse = check paypalOrders->/orders/[orderId]/authorize.post({});
```

Sample response:

```ballerina
{
  "id": "5O190127TN364715T",
  "status": "COMPLETED",
  "purchase_units": [
    {
      "reference_id": "default",
      "payments": {
        "authorizations": [
          {
            "id": "0AW876160B5583922",
            "status": "CREATED",
            "amount": {
              "currency_code": "USD",
              "value": "200.00"
            }
          }
        ]
      }
    }
  ]
}
```

</details>

<details>
<summary>Capture payment for order</summary>

Captures payment for an approved order. For CAPTURE intent orders, this completes the payment. For AUTHORIZE intent orders, use after authorization.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | Yes | The PayPal order ID. |
| `payload` | `OrderCaptureRequest` | Yes | The capture request, optionally containing a payment source. |
| `headers` | `OrdersCaptureHeaders` | No | Optional headers including `PayPal-Request-Id` and `Prefer`. |

Returns: `Order|error`

Sample code:

```ballerina
orders:Order capturedOrder = check paypalOrders->/orders/[orderId]/capture.post({});
```

Sample response:

```ballerina
{
  "id": "5O190127TN364715T",
  "status": "COMPLETED",
  "intent": "CAPTURE",
  "purchase_units": [
    {
      "reference_id": "default",
      "payments": {
        "captures": [
          {
            "id": "3C679366HH908993F",
            "status": "COMPLETED",
            "amount": {
              "currency_code": "USD",
              "value": "200.00"
            }
          }
        ]
      }
    }
  ]
}
```

</details>

#### Shipment tracking

<details>
<summary>Add tracking information for an order</summary>

Adds tracking information for a captured order, including carrier, tracking number, and shipment status.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | Yes | The PayPal order ID. |
| `payload` | `OrderTrackerRequest` | Yes | Tracker details including `capture_id`, `tracking_number`, and `carrier`. |
| `headers` | `OrdersTrackCreateHeaders` | No | Optional headers including `PayPal-Auth-Assertion`. |

Returns: `Order|error`

Sample code:

```ballerina
orders:Order trackedOrder = check paypalOrders->/orders/[orderId]/track.post({
    capture_id: captureId,
    tracking_number: "1234567890",
    carrier: "ARAMEX",
    notify_payer: true
});
```

Sample response:

```ballerina
{
  "id": "5O190127TN364715T",
  "status": "COMPLETED",
  "purchase_units": [
    {
      "reference_id": "default",
      "shipping": {
        "trackers": [
          {
            "id": "5O190127TN364715T-3C679366HH908993F",
            "status": "SHIPPED",
            "items": []
          }
        ]
      }
    }
  ]
}
```

</details>

<details>
<summary>Update or cancel tracking information for a PayPal order</summary>

Updates tracking information for an existing tracker, such as changing the tracking status to CANCELLED.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | Yes | The PayPal order ID. |
| `trackerId` | `string` | Yes | The tracker ID (format: `orderId-captureId`). |
| `payload` | `PatchRequest (Patch[])` | Yes | Array of JSON Patch operations to apply to the tracker. |

Returns: `error?`

Sample code:

```ballerina
check paypalOrders->/orders/[orderId]/trackers/[trackerId].patch([
    {
        op: "replace",
        path: "/status",
        value: "CANCELLED"
    }
]);
```

</details>
