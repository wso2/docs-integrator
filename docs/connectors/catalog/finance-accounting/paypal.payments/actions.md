---
title: Actions
---

# Actions

The `ballerinax/paypal.payments` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | PayPal Payments API v2: authorize, capture, void, and refund payments. |

---

## Client

PayPal Payments API v2: authorize, capture, void, and refund payments.

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
| `compression` | `http:Compression` | `COMPRESSION_AUTO` | HTTP compression configuration. |
| `cache` | `http:CacheConfig` | `{}` | HTTP response cache configuration. |
| `validation` | `boolean` | `true` | Enable or disable payload validation. |
| `laxDataBinding` | `boolean` | `true` | Allow lax data binding for response payloads. |

### Initializing the client

```ballerina
import ballerinax/paypal.payments as paypal;

configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string serviceUrl = ?;

final paypal:Client paypal = check new (
    {
        auth: {
            clientId,
            clientSecret,
            tokenUrl: "https://api-m.sandbox.paypal.com/v1/oauth2/token"
        }
    },
    serviceUrl
);
```

### Operations

#### Authorizations

<details>
<summary>Show details for authorized payment</summary>

Retrieves the details of an authorized payment by its PayPal-generated authorization ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `authorizationId` | `string` | Yes | The PayPal-generated ID for the authorized payment. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `Authorization2|error`

Sample code:

```ballerina
paypal:Authorization2 auth = check paypal->/authorizations/[authId];
```

Sample response:

```ballerina
{
  "id": "5O190127TN364715T",
  "status": "CREATED",
  "amount": {
    "currency_code": "USD",
    "value": "100.00"
  },
  "create_time": "2025-01-15T10:30:00Z",
  "update_time": "2025-01-15T10:30:00Z",
  "links": [
    {
      "href": "https://api-m.sandbox.paypal.com/v2/payments/authorizations/5O190127TN364715T",
      "rel": "self",
      "method": "GET"
    }
  ]
}
```

</details>

<details>
<summary>Capture authorized payment</summary>

Captures an authorized payment, transferring the funds from the buyer to the merchant.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `authorizationId` | `string` | Yes | The PayPal-generated ID for the authorized payment. |
| `payload` | `CaptureRequest` | Yes | Capture details including amount and optional note to payer. |
| `headers` | `AuthorizationsCaptureHeaders` | No | Optional headers including `PayPal-Request-Id` and `Prefer`. |

Returns: `Capture2|error`

Sample code:

```ballerina
paypal:CaptureRequest capturePayload = {
    amount: {
        value: "100.00",
        currency_code: "USD"
    },
    note_to_payer: "Payment for premium headphones"
};
paypal:Capture2 captureResponse = check paypal->/authorizations/[authId]/capture.post(capturePayload);
```

Sample response:

```ballerina
{
  "id": "2GG279541U471931P",
  "status": "COMPLETED",
  "amount": {
    "currency_code": "USD",
    "value": "100.00"
  },
  "seller_receivable_breakdown": {
    "gross_amount": {
      "currency_code": "USD",
      "value": "100.00"
    },
    "paypal_fee": {
      "currency_code": "USD",
      "value": "3.50"
    },
    "net_amount": {
      "currency_code": "USD",
      "value": "96.50"
    }
  },
  "create_time": "2025-01-15T10:35:00Z",
  "update_time": "2025-01-15T10:35:00Z",
  "links": [
    {
      "href": "https://api-m.sandbox.paypal.com/v2/payments/captures/2GG279541U471931P",
      "rel": "self",
      "method": "GET"
    }
  ]
}
```

</details>

<details>
<summary>Reauthorize authorized payment</summary>

Reauthorizes an authorized payment. Use this to extend the authorization period or reauthorize after the original authorization has expired.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `authorizationId` | `string` | Yes | The PayPal-generated ID for the authorized payment. |
| `payload` | `ReauthorizeRequest` | Yes | Reauthorization details including the amount. |
| `headers` | `AuthorizationsReauthorizeHeaders` | No | Optional headers including `PayPal-Request-Id` and `Prefer`. |

Returns: `Authorization2|error`

Sample code:

```ballerina
paypal:ReauthorizeRequest reauthorizePayload = {
    amount: {
        value: "100.00",
        currency_code: "USD"
    }
};
paypal:Authorization2 reauth = check paypal->/authorizations/[authId]/reauthorize.post(reauthorizePayload);
```

Sample response:

```ballerina
{
  "id": "8AA831015G517922L",
  "status": "CREATED",
  "amount": {
    "currency_code": "USD",
    "value": "100.00"
  },
  "create_time": "2025-01-20T14:00:00Z",
  "update_time": "2025-01-20T14:00:00Z",
  "links": [
    {
      "href": "https://api-m.sandbox.paypal.com/v2/payments/authorizations/8AA831015G517922L",
      "rel": "self",
      "method": "GET"
    }
  ]
}
```

</details>

<details>
<summary>Void authorized payment</summary>

Voids an authorized payment. Once voided, the authorization is no longer valid and funds cannot be captured.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `authorizationId` | `string` | Yes | The PayPal-generated ID for the authorized payment to void. |
| `headers` | `AuthorizationsVoidHeaders` | No | Optional headers including `PayPal-Auth-Assertion` and `Prefer`. |

Returns: `Authorization2|error?`

Sample code:

```ballerina
paypal:Authorization2? voidResponse = check paypal->/authorizations/[authId]/void.post();
```

Sample response:

```ballerina
{
  "id": "5O190127TN364715T",
  "status": "VOIDED",
  "amount": {
    "currency_code": "USD",
    "value": "100.00"
  },
  "create_time": "2025-01-15T10:30:00Z",
  "update_time": "2025-01-16T09:00:00Z",
  "links": [
    {
      "href": "https://api-m.sandbox.paypal.com/v2/payments/authorizations/5O190127TN364715T",
      "rel": "self",
      "method": "GET"
    }
  ]
}
```

</details>

#### Captures

<details>
<summary>Show captured payment details</summary>

Retrieves the details of a captured payment by its PayPal-generated capture ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `captureId` | `string` | Yes | The PayPal-generated ID for the captured payment. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `Capture2|error`

Sample code:

```ballerina
paypal:Capture2 capture = check paypal->/captures/[captureId];
```

Sample response:

```ballerina
{
  "id": "2GG279541U471931P",
  "status": "COMPLETED",
  "amount": {
    "currency_code": "USD",
    "value": "100.00"
  },
  "seller_receivable_breakdown": {
    "gross_amount": {
      "currency_code": "USD",
      "value": "100.00"
    },
    "paypal_fee": {
      "currency_code": "USD",
      "value": "3.50"
    },
    "net_amount": {
      "currency_code": "USD",
      "value": "96.50"
    }
  },
  "create_time": "2025-01-15T10:35:00Z",
  "update_time": "2025-01-15T10:35:00Z",
  "links": [
    {
      "href": "https://api-m.sandbox.paypal.com/v2/payments/captures/2GG279541U471931P",
      "rel": "self",
      "method": "GET"
    }
  ]
}
```

</details>

<details>
<summary>Refund captured payment</summary>

Refunds a captured payment. You can issue a full or partial refund.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `captureId` | `string` | Yes | The PayPal-generated ID for the captured payment to refund. |
| `payload` | `RefundRequest` | Yes | Refund details including optional amount (omit for full refund) and note to payer. |
| `headers` | `CapturesRefundHeaders` | No | Optional headers including `PayPal-Request-Id`, `PayPal-Auth-Assertion`, and `Prefer`. |

Returns: `Refund|error`

Sample code:

```ballerina
paypal:RefundRequest refundPayload = {
    amount: {
        value: "50.00",
        currency_code: "USD"
    },
    note_to_payer: "Partial refund: Month 1"
};
paypal:Refund refundResponse = check paypal->/captures/[captureId]/refund.post(refundPayload);
```

Sample response:

```ballerina
{
  "id": "1JU08902781691411",
  "status": "COMPLETED",
  "amount": {
    "currency_code": "USD",
    "value": "50.00"
  },
  "seller_payable_breakdown": {
    "gross_amount": {
      "currency_code": "USD",
      "value": "50.00"
    },
    "paypal_fee": {
      "currency_code": "USD",
      "value": "1.75"
    },
    "net_amount": {
      "currency_code": "USD",
      "value": "48.25"
    }
  },
  "create_time": "2025-01-16T11:00:00Z",
  "update_time": "2025-01-16T11:00:00Z",
  "links": [
    {
      "href": "https://api-m.sandbox.paypal.com/v2/payments/refunds/1JU08902781691411",
      "rel": "self",
      "method": "GET"
    }
  ]
}
```

</details>

#### Refunds

<details>
<summary>Show refund details</summary>

Retrieves the details of a refund by its PayPal-generated refund ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `refundId` | `string` | Yes | The PayPal-generated ID for the refund. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `Refund|error`

Sample code:

```ballerina
paypal:Refund refund = check paypal->/refunds/[refundId];
```

Sample response:

```ballerina
{
  "id": "1JU08902781691411",
  "status": "COMPLETED",
  "amount": {
    "currency_code": "USD",
    "value": "50.00"
  },
  "seller_payable_breakdown": {
    "gross_amount": {
      "currency_code": "USD",
      "value": "50.00"
    },
    "paypal_fee": {
      "currency_code": "USD",
      "value": "1.75"
    },
    "net_amount": {
      "currency_code": "USD",
      "value": "48.25"
    }
  },
  "create_time": "2025-01-16T11:00:00Z",
  "update_time": "2025-01-16T11:00:00Z",
  "links": [
    {
      "href": "https://api-m.sandbox.paypal.com/v2/payments/refunds/1JU08902781691411",
      "rel": "self",
      "method": "GET"
    }
  ]
}
```

</details>
