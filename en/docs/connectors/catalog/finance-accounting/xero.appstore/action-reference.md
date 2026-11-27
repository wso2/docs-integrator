---
connector: true
connector_name: "xero.appstore"
toc_max_heading_level: 4
title: "Actions"
---

# Actions

The Xero App Store connector exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Read the subscriptions customers hold for a Xero App Store app and report metered usage against them (legacy XASS billing). |

---

## Client

The `Client` connects to the Xero App Store Billing API (`https://api.xero.com/appstore/2.0/subscriptions`). It exposes 4 operations for retrieving a subscription and for creating, updating and listing its usage records.

### Configuration

**ConnectionConfig**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | <code>OAuth2ClientCredentialsGrantConfig</code> | Required | Configurations related to client authentication |
| `httpVersion` | <code>http:HttpVersion</code> | <code>http:HTTP_2_0</code> | The HTTP version understood by the client |
| `http1Settings` | <code>http:ClientHttp1Settings</code> | <code>&#123;&#125;</code> | Configurations related to HTTP/1.x protocol |
| `http2Settings` | <code>http:ClientHttp2Settings</code> | <code>&#123;&#125;</code> | Configurations related to HTTP/2 protocol |
| `timeout` | <code>decimal</code> | <code>30</code> | The maximum time to wait (in seconds) for a response before closing the connection |
| `forwarded` | <code>string</code> | <code>"disable"</code> | The choice of setting `forwarded`/`x-forwarded` header |
| `followRedirects` | <code>http:FollowRedirects</code> | Optional | Configurations associated with Redirection |
| `poolConfig` | <code>http:PoolConfiguration</code> | Optional | Configurations associated with request pooling |
| `cache` | <code>http:CacheConfig</code> | <code>&#123;&#125;</code> | HTTP caching related configurations |
| `compression` | <code>http:Compression</code> | <code>http:COMPRESSION_AUTO</code> | Specifies the way of handling compression (`accept-encoding`) header |
| `circuitBreaker` | <code>http:CircuitBreakerConfig</code> | Optional | Configurations associated with the behaviour of the Circuit Breaker |
| `retryConfig` | <code>http:RetryConfig</code> | Optional | Configurations associated with retrying |
| `cookieConfig` | <code>http:CookieConfig</code> | Optional | Configurations associated with cookies |
| `responseLimits` | <code>http:ResponseLimitConfigs</code> | <code>&#123;&#125;</code> | Configurations associated with inbound response size limits |
| `secureSocket` | <code>http:ClientSecureSocket</code> | Optional | SSL/TLS-related options |
| `proxy` | <code>http:ProxyConfig</code> | Optional | Proxy server related options |
| `socketConfig` | <code>http:ClientSocketConfig</code> | <code>&#123;&#125;</code> | Provides settings related to client socket configuration |
| `validation` | <code>boolean</code> | <code>true</code> | Enables the inbound payload validation functionality which provided by the constraint package. Enabled by default |
| `laxDataBinding` | <code>boolean</code> | <code>true</code> | Enables relaxed data binding on the client side. When enabled, `nil` values are treated as optional, and absent fields are handled as `nilable` types. Enabled by default. |

### Initializing the client

```ballerina
import ballerinax/xero.appstore;

configurable string clientId = ?;
configurable string clientSecret = ?;

final appstore:Client appstoreClient = check new ({
    auth: {
        clientId,
        clientSecret,
        scopes: ["marketplace.billing"]
    }
});
```

### Operations

#### Subscriptions

<details>
<summary>getSubscription</summary>

<div>

Retrieves a subscription for a given subscriptionId.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `subscriptionId` | <code>string</code> | Yes | Unique identifier for Subscription object. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Subscription|error`

**Sample code:**

```ballerina
appstore:Subscription result = check appstoreClient->getSubscription("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "organisationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "plans": [
    {
      "subscriptionItems": [
        {
          "product": {},
          "price": {
            "amount": 100.00,
            "currency": "string",
            "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
          },
          "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "startDate": "2026-01-15T00:00:00",
          "status": "ACTIVE"
        }
      ],
      "name": "Sample name",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "status": "ACTIVE"
    }
  ],
  "currentPeriodEnd": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "startDate": "2026-01-15T00:00:00",
  "status": "ACTIVE"
}
```

</div>
</details>

#### Usage records

<details>
<summary>createUsageRecord</summary>

<div>

Send metered usage belonging to this subscription and subscription item.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `subscriptionId` | <code>string</code> | Yes | Unique identifier for Subscription object. |
| `subscriptionItemId` | <code>string</code> | Yes | The unique identifier of the subscriptionItem. |
| `payload` | <code>CreateUsageRecordRequest</code> | Yes | Contains the quantity for the usage record to create. |
| `headers` | <code>CreateUsageRecordHeaders</code> | No | Request headers. Optional fields: `idempotencyKey`. Defaults to `{}`. |

**Returns:** `UsageRecord|error`

**Sample code:**

```ballerina
appstore:UsageRecord result = check appstoreClient->createUsageRecord("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    quantity: 1,
    timestamp: "string"
});
```

**Sample response:**

```json
{
  "quantity": 1,
  "subscriptionItemId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "productId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "recordedAt": "string",
  "testMode": false,
  "usageRecordId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "subscriptionId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "pricePerUnit": 100.00
}
```

</div>
</details>

<details>
<summary>updateUsageRecord</summary>

<div>

Update and existing metered usage belonging to this subscription and subscription item.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `subscriptionId` | <code>string</code> | Yes | Unique identifier for Subscription object. |
| `subscriptionItemId` | <code>string</code> | Yes | The unique identifier of the subscriptionItem. |
| `usageRecordId` | <code>string</code> | Yes | The unique identifier of the usage record. |
| `payload` | <code>UpdateUsageRecordRequest</code> | Yes | Contains the quantity for the usage record to update. |
| `headers` | <code>UpdateUsageRecordHeaders</code> | No | Request headers. Optional fields: `idempotencyKey`. Defaults to `{}`. |

**Returns:** `UsageRecord|error`

**Sample code:**

```ballerina
appstore:UsageRecord result = check appstoreClient->updateUsageRecord("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    quantity: 1
});
```

**Sample response:**

```json
{
  "quantity": 1,
  "subscriptionItemId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "productId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "recordedAt": "string",
  "testMode": false,
  "usageRecordId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "subscriptionId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "pricePerUnit": 100.00
}
```

</div>
</details>

<details>
<summary>listUsageRecords</summary>

<div>

Gets all usage records related to the subscription.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `subscriptionId` | <code>string</code> | Yes | Unique identifier for Subscription object. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `UsageRecordsList|error`

**Sample code:**

```ballerina
appstore:UsageRecordsList result = check appstoreClient->listUsageRecords("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "usageRecords": [
    {
      "quantity": 1,
      "subscriptionItemId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "productId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "recordedAt": "string",
      "testMode": false,
      "usageRecordId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "subscriptionId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "pricePerUnit": 100.00
    }
  ]
}
```

</div>
</details>
