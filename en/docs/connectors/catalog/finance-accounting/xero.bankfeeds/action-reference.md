---
connector: true
connector_name: "xero.bankfeeds"
toc_max_heading_level: 4
title: "Actions"
---

# Actions

The Xero Bankfeeds connector exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Manage feed connections and deliver bank statements to Xero organisations |

---

## Client

The `Client` connects to the Xero Bank Feeds API to manage feed connections between financial institution accounts and Xero organisations, and to deliver bank statements to those feeds.

### Configuration

**ConnectionConfig**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | <code>http:BearerTokenConfig&#124;OAuth2RefreshTokenGrantConfig</code> | Required | Configurations related to client authentication |
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
| `validation` | <code>boolean</code> | <code>true</code> | Enables the inbound payload validation functionality provided by the constraint package |
| `laxDataBinding` | <code>boolean</code> | <code>true</code> | Enables relaxed data binding; `nil` values are treated as optional and absent fields as `nilable` types |

**OAuth2RefreshTokenGrantConfig**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `clientId` | <code>string</code> | Required | OAuth 2.0 client ID |
| `clientSecret` | <code>string</code> | Required | OAuth 2.0 client secret |
| `refreshToken` | <code>string</code> | Required | OAuth 2.0 refresh token |
| `refreshUrl` | <code>string</code> | <code>"https://identity.xero.com/connect/token"</code> | Xero token endpoint used to exchange the refresh token for a new access token |

### Initializing the client

```ballerina
import ballerinax/xero.bankfeeds;

configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string refreshToken = ?;
configurable string refreshUrl = ?;
configurable string tenantId = ?;

final bankfeeds:Client bankfeedsClient = check new ({
    auth: {clientId, clientSecret, refreshToken, refreshUrl}
});
```

### Operations

#### Feed Connection Management

<details>
<summary>getFeedConnections</summary>

<div>

Searches for feed connections in the Xero organisation, returning a paginated list of all connections with their current status and linked Xero bank account details.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>GetFeedConnectionsHeaders</code> | Yes | Request headers including the Xero tenant ID |
| `headers.xeroTenantId` | <code>string</code> | Yes | Xero identifier for the tenant (organisation) |
| `pageSize` | <code>int</code> | No | Number of records per page (default 10) |
| `page` | <code>int</code> | No | Page number to retrieve (default 1) |

**Returns:** `FeedConnections|error`

**Sample code:**

```ballerina
bankfeeds:FeedConnections feedConnections = check bankfeedsClient->getFeedConnections(
    {xeroTenantId: "b5c58bd1-e9f6-4e8c-b2e4-6e3c0a63d1a9"},
    page = 1,
    pageSize = 50
);
```

**Sample response:**

```json
{
  "pagination": {
    "pageCount": 1,
    "pageSize": 50,
    "page": 1,
    "itemCount": 2
  },
  "items": [
    {
      "id": "b5c58bd1-e9f6-4e8c-b2e4-6e3c0a63d1a9",
      "accountToken": "12345-ACT-001",
      "accountNumber": "00240695",
      "accountName": "My Bank Account",
      "accountType": "BANK",
      "currency": "USD",
      "country": "US",
      "accountId": "7d05a53d-613d-4b30-b180-b75ab1f86f46",
      "status": "PENDING"
    },
    {
      "id": "c6d7e8f9-0a1b-2c3d-4e5f-6a7b8c9d0e1f",
      "accountToken": "12345-ACT-002",
      "accountNumber": "4321",
      "accountName": "My Credit Card",
      "accountType": "CREDITCARD",
      "currency": "USD",
      "country": "US",
      "accountId": "8e16b64e-724e-5c41-c291-c86bc2g97g57",
      "status": "PENDING"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createFeedConnections</summary>

<div>

Creates one or more new feed connections, linking financial institution accounts to bank accounts in the Xero organisation. Returns each submitted connection with its resulting status.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>CreateFeedConnectionsHeaders</code> | Yes | Request headers including the Xero tenant ID and optional idempotency key |
| `headers.xeroTenantId` | <code>string</code> | Yes | Xero identifier for the tenant (organisation) |
| `headers.idempotencyKey` | <code>string</code> | No | A key (max 128 characters) for safely retrying the request without risk of duplicate processing |
| `payload` | <code>FeedConnections</code> | Yes | An object containing the array of feed connections to create |

**Returns:** `FeedConnections|error`

**Sample code:**

```ballerina
bankfeeds:FeedConnections submitted = check bankfeedsClient->createFeedConnections(
    {xeroTenantId: "b5c58bd1-e9f6-4e8c-b2e4-6e3c0a63d1a9", idempotencyKey: "create-feed-001"},
    {
        items: [
            {
                accountToken: "12345-ACT-001",
                accountNumber: "00240695",
                accountName: "My Bank Account",
                accountType: "BANK",
                currency: "USD"
            }
        ]
    }
);
```

**Sample response:**

```json
{
  "items": [
    {
      "id": "b5c58bd1-e9f6-4e8c-b2e4-6e3c0a63d1a9",
      "accountToken": "12345-ACT-001",
      "accountNumber": "00240695",
      "accountName": "My Bank Account",
      "accountType": "BANK",
      "currency": "USD",
      "status": "PENDING"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getFeedConnection</summary>

<div>

Retrieves a single feed connection by its unique identifier, returning its current status and all associated account and Xero bank account details.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | <code>string</code> | Yes | Unique identifier of the feed connection to retrieve |
| `headers` | <code>GetFeedConnectionHeaders</code> | Yes | Request headers including the Xero tenant ID |
| `headers.xeroTenantId` | <code>string</code> | Yes | Xero identifier for the tenant (organisation) |

**Returns:** `FeedConnection|error`

**Sample code:**

```ballerina
bankfeeds:FeedConnection connection = check bankfeedsClient->getFeedConnection(
    "b5c58bd1-e9f6-4e8c-b2e4-6e3c0a63d1a9",
    {xeroTenantId: "b5c58bd1-e9f6-4e8c-b2e4-6e3c0a63d1a9"}
);
```

**Sample response:**

```json
{
  "id": "b5c58bd1-e9f6-4e8c-b2e4-6e3c0a63d1a9",
  "accountToken": "12345-ACT-001",
  "accountNumber": "00240695",
  "accountName": "My Bank Account",
  "accountType": "BANK",
  "currency": "USD",
  "country": "US",
  "accountId": "7d05a53d-613d-4b30-b180-b75ab1f86f46",
  "status": "PENDING"
}
```

</div>
</details>

<details>
<summary>deleteFeedConnections</summary>

<div>

Deletes one or more existing feed connections from the Xero organisation, disconnecting the financial institution accounts from their linked Xero bank accounts. Returns each submitted connection with its resulting deletion status.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>DeleteFeedConnectionsHeaders</code> | Yes | Request headers including the Xero tenant ID and optional idempotency key |
| `headers.xeroTenantId` | <code>string</code> | Yes | Xero identifier for the tenant (organisation) |
| `headers.idempotencyKey` | <code>string</code> | No | A key (max 128 characters) for safely retrying the request without risk of duplicate processing |
| `payload` | <code>FeedConnections</code> | Yes | An object containing the array of feed connections to delete, identified by their `id` |

**Returns:** `FeedConnections|error`

**Sample code:**

```ballerina
bankfeeds:FeedConnections deleted = check bankfeedsClient->deleteFeedConnections(
    {xeroTenantId: "b5c58bd1-e9f6-4e8c-b2e4-6e3c0a63d1a9"},
    {
        items: [{id: "b5c58bd1-e9f6-4e8c-b2e4-6e3c0a63d1a9"}]
    }
);
```

**Sample response:**

```json
{
  "items": [
    {
      "id": "b5c58bd1-e9f6-4e8c-b2e4-6e3c0a63d1a9",
      "accountToken": "12345-ACT-001",
      "accountName": "My Bank Account",
      "accountType": "BANK",
      "status": "PENDING"
    }
  ]
}
```

</div>
</details>

#### Statement Operations

<details>
<summary>getStatements</summary>

<div>

Retrieves all bank statements delivered to feed connections in the Xero organisation, returning a paginated list of statements with their status and balance details.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>GetStatementsHeaders</code> | Yes | Request headers including the Xero tenant ID and optional application and user identifiers |
| `headers.xeroTenantId` | <code>string</code> | Yes | Xero identifier for the tenant (organisation) |
| `headers.xeroApplicationId` | <code>string</code> | No | Xero identifier of the application making the request (defaults to `"00000000-0000-0000-0000-0000000010000"`) |
| `headers.xeroUserId` | <code>string</code> | No | Xero identifier of the user on whose behalf the request is made (defaults to `"00000000-0000-0000-0000-0000030000000"`) |
| `pageSize` | <code>int:Signed32</code> | No | Number of records per page (default 10) |
| `page` | <code>int:Signed32</code> | No | Page number to retrieve (default 1) |

**Returns:** `Statements|error`

**Sample code:**

```ballerina
bankfeeds:Statements statements = check bankfeedsClient->getStatements(
    {xeroTenantId: "b5c58bd1-e9f6-4e8c-b2e4-6e3c0a63d1a9"},
    page = 1,
    pageSize = 50
);
```

**Sample response:**

```json
{
  "pagination": {
    "pageCount": 1,
    "pageSize": 50,
    "page": 1,
    "itemCount": 2
  },
  "items": [
    {
      "id": "d6e9a1b2-3c4d-5e6f-7a8b-9c0d1e2f3a4b",
      "feedConnectionId": "b5c58bd1-e9f6-4e8c-b2e4-6e3c0a63d1a9",
      "startDate": "2024-01-01",
      "endDate": "2024-01-01",
      "startBalance": {"amount": 1000.00, "creditDebitIndicator": "CREDIT"},
      "endBalance": {"amount": 3971.45, "creditDebitIndicator": "CREDIT"},
      "statementLineCount": 3,
      "status": "DELIVERED"
    },
    {
      "id": "e7f0b2c3-4d5e-6f7a-8b9c-0d1e2f3a4b5c",
      "feedConnectionId": "b5c58bd1-e9f6-4e8c-b2e4-6e3c0a63d1a9",
      "startDate": "2024-01-02",
      "endDate": "2024-01-02",
      "startBalance": {"amount": 3971.45, "creditDebitIndicator": "CREDIT"},
      "endBalance": {"amount": 3800.00, "creditDebitIndicator": "CREDIT"},
      "statementLineCount": 1,
      "status": "PENDING"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createStatements</summary>

<div>

Creates one or more new bank statements and delivers them to the specified feed connections, with opening and closing balances and individual transaction lines. Returns each submitted statement with its resulting delivery status.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>CreateStatementsHeaders</code> | Yes | Request headers including the Xero tenant ID and optional idempotency key |
| `headers.xeroTenantId` | <code>string</code> | Yes | Xero identifier for the tenant (organisation) |
| `headers.idempotencyKey` | <code>string</code> | No | A key (max 128 characters) for safely retrying the request without risk of duplicate processing |
| `payload` | <code>Statements</code> | Yes | An object containing the array of statements to deliver, each with balances and statement lines |

**Returns:** `Statements|error`

**Sample code:**

```ballerina
bankfeeds:Statements submitted = check bankfeedsClient->createStatements(
    {xeroTenantId: "b5c58bd1-e9f6-4e8c-b2e4-6e3c0a63d1a9", idempotencyKey: "feed-001-2024-01-01"},
    {
        items: [
            {
                feedConnectionId: "b5c58bd1-e9f6-4e8c-b2e4-6e3c0a63d1a9",
                startDate: "2024-01-01",
                endDate: "2024-01-01",
                startBalance: {amount: 1000.00, creditDebitIndicator: "CREDIT"},
                endBalance: {amount: 3971.45, creditDebitIndicator: "CREDIT"},
                statementLines: [
                    {
                        postedDate: "2024-01-01",
                        description: "Salary payment",
                        payeeName: "Contoso Ltd",
                        amount: 3200.00,
                        creditDebitIndicator: "CREDIT",
                        transactionId: "2024-01-01-0001",
                        transactionType: "Credit transfer"
                    }
                ]
            }
        ]
    }
);
```

**Sample response:**

```json
{
  "items": [
    {
      "id": "d6e9a1b2-3c4d-5e6f-7a8b-9c0d1e2f3a4b",
      "feedConnectionId": "b5c58bd1-e9f6-4e8c-b2e4-6e3c0a63d1a9",
      "startDate": "2024-01-01",
      "endDate": "2024-01-01",
      "startBalance": {"amount": 1000.00, "creditDebitIndicator": "CREDIT"},
      "endBalance": {"amount": 3971.45, "creditDebitIndicator": "CREDIT"},
      "statementLineCount": 1,
      "status": "PENDING"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getStatement</summary>

<div>

Retrieves a single bank statement by its unique identifier, returning its current delivery status, balance details, and all transaction lines. Use this to check whether a delivered statement has been accepted or rejected by Xero.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `statementId` | <code>string</code> | Yes | Unique identifier of the statement to retrieve |
| `headers` | <code>GetStatementHeaders</code> | Yes | Request headers including the Xero tenant ID |
| `headers.xeroTenantId` | <code>string</code> | Yes | Xero identifier for the tenant (organisation) |

**Returns:** `Statement|error`

**Sample code:**

```ballerina
bankfeeds:Statement statement = check bankfeedsClient->getStatement(
    "d6e9a1b2-3c4d-5e6f-7a8b-9c0d1e2f3a4b",
    {xeroTenantId: "b5c58bd1-e9f6-4e8c-b2e4-6e3c0a63d1a9"}
);
```

**Sample response:**

```json
{
  "id": "d6e9a1b2-3c4d-5e6f-7a8b-9c0d1e2f3a4b",
  "feedConnectionId": "b5c58bd1-e9f6-4e8c-b2e4-6e3c0a63d1a9",
  "startDate": "2024-01-01",
  "endDate": "2024-01-01",
  "startBalance": {"amount": 1000.00, "creditDebitIndicator": "CREDIT"},
  "endBalance": {"amount": 3971.45, "creditDebitIndicator": "CREDIT"},
  "statementLineCount": 3,
  "statementLines": [
    {
      "postedDate": "2024-01-01",
      "description": "Salary payment",
      "payeeName": "Contoso Ltd",
      "amount": 3200.00,
      "creditDebitIndicator": "CREDIT",
      "transactionId": "2024-01-01-0001",
      "transactionType": "Credit transfer"
    },
    {
      "postedDate": "2024-01-01",
      "description": "Card purchase",
      "payeeName": "Northwind Grocers",
      "amount": 86.45,
      "creditDebitIndicator": "DEBIT",
      "transactionId": "2024-01-01-0002",
      "transactionType": "Card"
    },
    {
      "postedDate": "2024-01-01",
      "description": "Direct debit",
      "payeeName": "Fabrikam Energy",
      "amount": 142.10,
      "creditDebitIndicator": "DEBIT",
      "transactionId": "2024-01-01-0003",
      "transactionType": "Direct debit"
    }
  ],
  "status": "DELIVERED"
}
```

</div>
</details>
