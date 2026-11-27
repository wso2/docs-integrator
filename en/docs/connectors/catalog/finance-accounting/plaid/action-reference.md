---
connector: true
connector_name: "plaid"
toc_max_heading_level: 4
title: "Actions"
---

# Actions

The Plaid connector exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Link bank accounts and read financial data through the Plaid API, including accounts, balances, transactions, identity, income, liabilities, investments, payments, transfers and Plaid Check consumer reports. |

---

## Client

The `Client` connects to the Plaid API (`https://production.plaid.com` by default, or `https://sandbox.plaid.com` for testing). It exposes 351 operations. Operations take a request payload, and the API keys are sent in the connection's auth configuration.

### Configuration

**ConnectionConfig**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | <code>OAuth2ClientCredentialsGrantConfig&#124;ApiKeysConfig</code> | Required | Provides Auth configurations needed when communicating with a remote HTTP endpoint. |
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
import ballerinax/plaid;

configurable string clientId = ?;
configurable string secret = ?;

final plaid:Client plaidClient = check new ({
    auth: {
        plaidClientId: clientId,
        plaidSecret: secret,
        plaidVersion: "2020-09-14"
    }
}, "https://sandbox.plaid.com");
```

### Operations

#### Asset reports

<details>
<summary>assetReportCreate</summary>

<div>

Create an Asset Report.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>AssetReportCreateRequest</code> | Yes | Request to create an Asset Report. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `AssetReportCreateResponse|error`

**Sample code:**

```ballerina
plaid:AssetReportCreateResponse result = check plaidClient->assetReportCreate({
    daysRequested: 1,
    options: {
        webhook: "string",
        clientReportId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        includeFastReport: false
    },
    secret: "string",
    accessTokens: ["string"]
});
```

**Sample response:**

```json
{
  "asset_report_token": "string",
  "asset_report_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>assetReportGet</summary>

<div>

Retrieve an Asset Report.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>AssetReportGetRequest</code> | Yes | Request to retrieve an Asset Report. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `AssetReportGetResponse|error`

**Sample code:**

```ballerina
plaid:AssetReportGetResponse result = check plaidClient->assetReportGet({
    fastReport: false,
    assetReportToken: "string",
    includeInsights: false,
    options: {
        daysToInclude: 1
    }
});
```

**Sample response:**

```json
{
  "report": {
    "asset_report_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "client_report_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "date_generated": "2026-01-15T00:00:00",
    "days_requested": 100.00,
    "user": {},
    "items": [
      {
        "item_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "institution_name": "Sample name",
        "institution_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "date_last_updated": "2026-01-15T00:00:00",
        "accounts": [
          {
            "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "balances": {
              "available": 100.00,
              "current": 100.00,
              "limit": 100.00,
              "margin_loan_amount": 100.00,
              "iso_currency_code": "200",
              "unofficial_currency_code": "200"
            },
            "mask": "string",
            "name": "Sample name",
            "official_name": "Sample name",
            "type": "investment",
            "subtype": "401a",
            "days_available": 100.00,
            "transactions": [
              {
                "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "amount": 100.00,
                "iso_currency_code": "200",
                "unofficial_currency_code": "200",
                "original_description": "Sample description",
                "date": "2026-01-15T00:00:00",
                "pending": false,
                "transaction_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
              }
            ],
            "owners": [
              {
                "names": [
                  "string"
                ],
                "phone_numbers": [
                  {}
                ],
                "emails": [
                  {}
                ],
                "addresses": [
                  {}
                ]
              }
            ],
            "historical_balances": [
              {
                "date": "2026-01-15T00:00:00",
                "current": 100.00,
                "iso_currency_code": "200",
                "unofficial_currency_code": "200"
              }
            ]
          }
        ]
      }
    ]
  },
  "warnings": [
    {
      "warning_type": "string",
      "warning_code": "OWNERS_UNAVAILABLE",
      "cause": {
        "error_type": "INVALID_REQUEST",
        "error_code": "200",
        "error_message": "string",
        "display_message": "string",
        "item_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
      }
    }
  ],
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>assetReportPdfGet</summary>

<div>

Retrieve a PDF Asset Report.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>AssetReportPDFGetRequest</code> | Yes | Request to retrieve a PDF Asset Report. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `http:Response|error`

**Sample code:**

```ballerina
http:Response result = check plaidClient->assetReportPdfGet({
    assetReportToken: "string",
    options: {
        daysToInclude: 1
    },
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

The raw `http:Response`. Read the PDF content with `check result.getBinaryPayload()`.

</div>
</details>

<details>
<summary>assetReportRefresh</summary>

<div>

Refresh an Asset Report.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>AssetReportRefreshRequest</code> | Yes | Request to refresh an Asset Report. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `AssetReportRefreshResponse|error`

**Sample code:**

```ballerina
plaid:AssetReportRefreshResponse result = check plaidClient->assetReportRefresh({
    assetReportToken: "string",
    options: {
        webhook: "string",
        clientReportId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    },
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "asset_report_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "asset_report_token": "string",
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>assetReportFilter</summary>

<div>

Filter Asset Report.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>AssetReportFilterRequest</code> | Yes | Request to filter Asset Report. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `AssetReportFilterResponse|error`

**Sample code:**

```ballerina
plaid:AssetReportFilterResponse result = check plaidClient->assetReportFilter({
    accountIdsToExclude: ["string"],
    assetReportToken: "string",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "asset_report_token": "string",
  "asset_report_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>assetReportRemove</summary>

<div>

Delete an Asset Report.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>AssetReportRemoveRequest</code> | Yes | Request to delete an Asset Report. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `AssetReportRemoveResponse|error`

**Sample code:**

```ballerina
plaid:AssetReportRemoveResponse result = check plaidClient->assetReportRemove({
    assetReportToken: "string",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "removed": false,
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>assetReportAuditCopyCreate</summary>

<div>

Create Asset Report Audit Copy.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>AssetReportAuditCopyCreateRequest</code> | Yes | Request to create Asset Report Audit Copy. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `AssetReportAuditCopyCreateResponse|error`

**Sample code:**

```ballerina
plaid:AssetReportAuditCopyCreateResponse result = check plaidClient->assetReportAuditCopyCreate({
    assetReportToken: "string",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    auditorId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "audit_copy_token": "string",
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>assetReportAuditCopyGet</summary>

<div>

Retrieve an Asset Report Audit Copy.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>AssetReportAuditCopyGetRequest</code> | Yes | Request to retrieve an Asset Report Audit Copy. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `AssetReportGetResponse|error`

**Sample code:**

```ballerina
plaid:AssetReportGetResponse result = check plaidClient->assetReportAuditCopyGet({
    auditCopyToken: "string",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "report": {
    "asset_report_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "client_report_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "date_generated": "2026-01-15T00:00:00",
    "days_requested": 100.00,
    "user": {},
    "items": [
      {
        "item_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "institution_name": "Sample name",
        "institution_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "date_last_updated": "2026-01-15T00:00:00",
        "accounts": [
          {
            "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "balances": {
              "available": 100.00,
              "current": 100.00,
              "limit": 100.00,
              "margin_loan_amount": 100.00,
              "iso_currency_code": "200",
              "unofficial_currency_code": "200"
            },
            "mask": "string",
            "name": "Sample name",
            "official_name": "Sample name",
            "type": "investment",
            "subtype": "401a",
            "days_available": 100.00,
            "transactions": [
              {
                "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "amount": 100.00,
                "iso_currency_code": "200",
                "unofficial_currency_code": "200",
                "original_description": "Sample description",
                "date": "2026-01-15T00:00:00",
                "pending": false,
                "transaction_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
              }
            ],
            "owners": [
              {
                "names": [
                  "string"
                ],
                "phone_numbers": [
                  {}
                ],
                "emails": [
                  {}
                ],
                "addresses": [
                  {}
                ]
              }
            ],
            "historical_balances": [
              {
                "date": "2026-01-15T00:00:00",
                "current": 100.00,
                "iso_currency_code": "200",
                "unofficial_currency_code": "200"
              }
            ]
          }
        ]
      }
    ]
  },
  "warnings": [
    {
      "warning_type": "string",
      "warning_code": "OWNERS_UNAVAILABLE",
      "cause": {
        "error_type": "INVALID_REQUEST",
        "error_code": "200",
        "error_message": "string",
        "display_message": "string",
        "item_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
      }
    }
  ],
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>assetReportAuditCopyPdfGet</summary>

<div>

Retrieve a PDF Asset Report Audit Copy.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>AssetReportAuditCopyPdfGetRequest</code> | Yes | Request to retrieve a PDF Asset Report Audit Copy. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `http:Response|error`

**Sample code:**

```ballerina
http:Response result = check plaidClient->assetReportAuditCopyPdfGet({
    auditCopyToken: "string",
    options: {
        daysToInclude: 1
    },
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

The raw `http:Response`. Read the PDF content with `check result.getBinaryPayload()`.

</div>
</details>

<details>
<summary>assetReportAuditCopyRemove</summary>

<div>

Remove Asset Report Audit Copy.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>AssetReportAuditCopyRemoveRequest</code> | Yes | Request to remove Asset Report Audit Copy. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `AssetReportAuditCopyRemoveResponse|error`

**Sample code:**

```ballerina
plaid:AssetReportAuditCopyRemoveResponse result = check plaidClient->assetReportAuditCopyRemove({
    auditCopyToken: "string",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "removed": false,
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

#### Plaid Check (CRA)

<details>
<summary>craMonitoringInsightsSubscribe</summary>

<div>

**Deprecated.** (Legacy) Subscribe to Cash Flow Updates.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CraMonitoringInsightsSubscribeRequest</code> | Yes | Request to subscribe to Cash Flow Updates. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CraMonitoringInsightsSubscribeResponse|error`

**Sample code:**

```ballerina
plaid:CraMonitoringInsightsSubscribeResponse result = check plaidClient->craMonitoringInsightsSubscribe({
    webhook: "string",
    incomeCategories: ["SALARY"],
    userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    itemId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "subscription_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>craMonitoringInsightsUnsubscribe</summary>

<div>

**Deprecated.** (Legacy) Unsubscribe from Cash Flow Updates.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CraMonitoringInsightsUnsubscribeRequest</code> | Yes | Request to unsubscribe from Cash Flow Updates. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CraMonitoringInsightsUnsubscribeResponse|error`

**Sample code:**

```ballerina
plaid:CraMonitoringInsightsUnsubscribeResponse result = check plaidClient->craMonitoringInsightsUnsubscribe({
    subscriptionId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>craMonitoringInsightsGet</summary>

<div>

**Deprecated.** (Legacy) Retrieve a Cash Flow Updates report.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CraMonitoringInsightsGetRequest</code> | Yes | Request to retrieve a Cash Flow Updates report. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CraMonitoringInsightsGetResponse|error`

**Sample code:**

```ballerina
plaid:CraMonitoringInsightsGetResponse result = check plaidClient->craMonitoringInsightsGet({
    consumerReportPermissiblePurpose: "ACCOUNT_REVIEW_CREDIT",
    userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    userToken: "string"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "user_insights_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "items": [
    {
      "date_generated": "2026-01-15T00:00:00",
      "item_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "institution_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "institution_name": "Sample name",
      "status": {
        "status_code": "AVAILABLE"
      },
      "insights": {
        "income": {
          "total_monthly_income": {
            "current_amount": 100.00
          },
          "income_sources_counts": {
            "current_count": 100.00
          },
          "forecasted_monthly_income": {
            "current_amount": 100.00
          },
          "historical_annual_income": {
            "current_amount": 100.00
          },
          "income_sources": [
            {
              "income_source_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              "income_description": "Sample description",
              "income_category": "SALARY",
              "last_transaction_date": "2026-01-15T00:00:00"
            }
          ]
        },
        "loans": {
          "loan_payments_counts": {
            "current_count": 100.00
          },
          "loan_disbursements_count": 100.00,
          "loan_payment_merchants_counts": {
            "current_count": 100.00
          }
        }
      }
    }
  ]
}
```

</div>
</details>

<details>
<summary>craPartnerInsightsGet</summary>

<div>

Retrieve cash flow insights from the bank accounts used for income verification.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CraPartnerInsightsGetRequest</code> | Yes | Request to retrieve cash flow insights from the bank accounts used for income verification. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CraPartnerInsightsGetResponse|error`

**Sample code:**

```ballerina
plaid:CraPartnerInsightsGetResponse result = check plaidClient->craPartnerInsightsGet({
    userToken: "string",
    userTier: "free",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "report": [
    {
      "report_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "generated_time": "string",
      "client_report_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ]
}
```

</div>
</details>

<details>
<summary>craCheckReportIncomeInsightsGet</summary>

<div>

Retrieve income insights from your user's banks.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CraCheckReportIncomeInsightsGetRequest</code> | Yes | Request to retrieve income insights from your user's banks. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CraCheckReportIncomeInsightsGetResponse|error`

**Sample code:**

```ballerina
plaid:CraCheckReportIncomeInsightsGetResponse result = check plaidClient->craCheckReportIncomeInsightsGet({
    userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    reportId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    options: {
        incomeInsightsVersion: "II2",
        incomeInsightsFilter: {
            includedCategories: ["string"]
        }
    },
    secret: "string"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "report": {
    "income_streams": [
      {
        "income_stream_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "start_date": "2026-01-15T00:00:00",
        "end_date": "2026-01-15T00:00:00",
        "description": "Sample description",
        "insights": {
          "income_category": {
            "primary": "string",
            "secondary": "string"
          },
          "pay_frequency": "WEEKLY",
          "income_provider": {
            "name": "Sample name",
            "is_normalized": false
          },
          "status": "ACTIVE",
          "next_payment": {
            "date": "2026-01-15T00:00:00"
          }
        },
        "income_metrics": {
          "current": {
            "monthly": {},
            "annual": {}
          },
          "projected": {
            "monthly": {},
            "annual": {}
          },
          "iso_currency_code": "200",
          "unofficial_currency_code": "200"
        },
        "transactions": [
          {
            "transaction_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "item_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "amount": 100.00,
            "date": "2026-01-15T00:00:00",
            "original_description": "Sample description",
            "iso_currency_code": "200",
            "unofficial_currency_code": "200",
            "outlier": {
              "is_outlier": false
            }
          }
        ]
      }
    ],
    "report_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "generated_time": "string"
  },
  "warnings": [
    {
      "warning_type": "string",
      "warning_code": "IDENTITY_UNAVAILABLE",
      "cause": {
        "error_type": "INVALID_REQUEST",
        "error_code": "200",
        "error_message": "string",
        "display_message": "string",
        "item_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
      }
    }
  ]
}
```

</div>
</details>

<details>
<summary>craCheckReportBaseReportGet</summary>

<div>

Retrieve a Base Report.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CraCheckReportBaseReportGetRequest</code> | Yes | Request to retrieve a Base Report. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CraCheckReportBaseReportGetResponse|error`

**Sample code:**

```ballerina
plaid:CraCheckReportBaseReportGetResponse result = check plaidClient->craCheckReportBaseReportGet({
    userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    reportId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    itemIds: ["3fa85f64-5717-4562-b3fc-2c963f66afa6"],
    userTier: "free"
});
```

**Sample response:**

```json
{
  "report": {
    "report_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "date_generated": "2026-01-15T00:00:00",
    "days_requested": 100.00,
    "items": [
      {
        "institution_name": "Sample name",
        "institution_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "date_last_updated": "2026-01-15T00:00:00",
        "item_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "accounts": [
          {
            "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "balances": {
              "unofficial_currency_code": "200",
              "current": 100.00,
              "available": 100.00,
              "limit": 100.00,
              "iso_currency_code": "200"
            },
            "consumer_disputes": [
              {
                "consumer_dispute_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "dispute_field_create_date": "2026-01-15T00:00:00",
                "category": "TRANSACTION",
                "statement": "string"
              }
            ],
            "mask": "string",
            "metadata": {
              "end_date": "2026-01-15T00:00:00",
              "start_date": "2026-01-15T00:00:00"
            },
            "name": "Sample name",
            "official_name": "Sample name",
            "type": "investment",
            "subtype": "401a",
            "days_available": 100.00,
            "transactions": [
              {
                "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "amount": 100.00,
                "iso_currency_code": "200",
                "unofficial_currency_code": "200",
                "original_description": "Sample description",
                "date": "2026-01-15T00:00:00",
                "pending": false,
                "transaction_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
              }
            ],
            "owners": [
              {
                "names": [
                  "string"
                ],
                "phone_numbers": [
                  {}
                ],
                "emails": [
                  {}
                ],
                "addresses": [
                  {}
                ]
              }
            ],
            "ownership_type": "individual"
          }
        ]
      }
    ]
  },
  "warnings": [
    {
      "warning_type": "string",
      "warning_code": "IDENTITY_UNAVAILABLE",
      "cause": {
        "error_type": "INVALID_REQUEST",
        "error_code": "200",
        "error_message": "string",
        "display_message": "string",
        "item_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
      }
    }
  ],
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>craCheckReportPdfGet</summary>

<div>

Retrieve a Consumer Report as a PDF.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CraCheckReportPDFGetRequest</code> | Yes | Request to retrieve a Consumer Report as a PDF. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `http:Response|error`

**Sample code:**

```ballerina
http:Response result = check plaidClient->craCheckReportPdfGet({
    userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    addOns: ["cra_income_insights"],
    secret: "string",
    thirdPartyUserToken: "string"
});
```

**Sample response:**

The raw `http:Response`. Read the PDF content with `check result.getBinaryPayload()`.

</div>
</details>

<details>
<summary>craCheckReportCreate</summary>

<div>

Refresh or create a Consumer Report.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CraCheckReportCreateRequest</code> | Yes | Request to refresh or create a Consumer Report. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CraCheckReportCreateResponse|error`

**Sample code:**

```ballerina
plaid:CraCheckReportCreateResponse result = check plaidClient->craCheckReportCreate({
    webhook: "string",
    consumerReportPermissiblePurpose: "ACCOUNT_REVIEW_CREDIT",
    daysRequested: 1,
    lendScore: {
        lendScoreVersion: "v1.0"
    }
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>craCheckReportPartnerInsightsGet</summary>

<div>

Retrieve cash flow insights from partners.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CraCheckReportPartnerInsightsGetRequest</code> | Yes | Request to retrieve cash flow insights from partners. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CraCheckReportPartnerInsightsGetResponse|error`

**Sample code:**

```ballerina
plaid:CraCheckReportPartnerInsightsGetResponse result = check plaidClient->craCheckReportPartnerInsightsGet({
    userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    userTier: "free",
    secret: "string",
    thirdPartyUserToken: "string"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "report": {
    "report_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "generated_time": "string",
    "client_report_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  },
  "warnings": [
    {
      "warning_type": "string",
      "warning_code": "IDENTITY_UNAVAILABLE",
      "cause": {
        "error_type": "INVALID_REQUEST",
        "error_code": "200",
        "error_message": "string",
        "display_message": "string",
        "item_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
      }
    }
  ]
}
```

</div>
</details>

<details>
<summary>craCheckReportCashflowInsightsGet</summary>

<div>

Retrieve cash flow insights from your user's banking data.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CraCheckReportCashflowInsightsGetRequest</code> | Yes | Request to retrieve cash flow insights from your user's banking data. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CraCheckReportCashflowInsightsGetResponse|error`

**Sample code:**

```ballerina
plaid:CraCheckReportCashflowInsightsGetResponse result = check plaidClient->craCheckReportCashflowInsightsGet({
    userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    options: {
        attributesVersion: "v1.0"
    },
    secret: "string",
    thirdPartyUserToken: "string"
});
```

**Sample response:**

```json
{
  "report": {
    "report_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "generated_time": "string"
  },
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "warnings": [
    {
      "warning_type": "string",
      "warning_code": "IDENTITY_UNAVAILABLE",
      "cause": {
        "error_type": "INVALID_REQUEST",
        "error_code": "200",
        "error_message": "string",
        "display_message": "string",
        "item_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
      }
    }
  ]
}
```

</div>
</details>

<details>
<summary>craCheckReportLendScoreGet</summary>

<div>

Retrieve the LendScore from your user's banking data.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CraCheckReportLendScoreGetRequest</code> | Yes | Request to retrieve the LendScore from your user's banking data. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CraCheckReportLendScoreGetResponse|error`

**Sample code:**

```ballerina
plaid:CraCheckReportLendScoreGetResponse result = check plaidClient->craCheckReportLendScoreGet({
    userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    options: {
        lendScoreVersion: "v1.0"
    },
    secret: "string",
    thirdPartyUserToken: "string"
});
```

**Sample response:**

```json
{
  "report": {
    "report_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "generated_time": "string"
  },
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "warnings": [
    {
      "warning_type": "string",
      "warning_code": "IDENTITY_UNAVAILABLE",
      "cause": {
        "error_type": "INVALID_REQUEST",
        "error_code": "200",
        "error_message": "string",
        "display_message": "string",
        "item_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
      }
    }
  ]
}
```

</div>
</details>

<details>
<summary>craCheckReportNetworkInsightsGet</summary>

<div>

Retrieve network attributes for the user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CraCheckReportNetworkInsightsGetRequest</code> | Yes | Request to retrieve network attributes for the user. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CraCheckReportNetworkInsightsGetResponse|error`

**Sample code:**

```ballerina
plaid:CraCheckReportNetworkInsightsGetResponse result = check plaidClient->craCheckReportNetworkInsightsGet({
    userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    options: {
        networkInsightsVersion: "NI1"
    },
    secret: "string",
    thirdPartyUserToken: "string"
});
```

**Sample response:**

```json
{
  "report": {
    "report_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "generated_time": "string",
    "network_attributes": {},
    "items": [
      {
        "item_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "institution_name": "Sample name",
        "institution_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
      }
    ]
  },
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "warnings": [
    {
      "warning_type": "string",
      "warning_code": "IDENTITY_UNAVAILABLE",
      "cause": {
        "error_type": "INVALID_REQUEST",
        "error_code": "200",
        "error_message": "string",
        "display_message": "string",
        "item_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
      }
    }
  ]
}
```

</div>
</details>

<details>
<summary>craCheckReportVerificationGet</summary>

<div>

Retrieve various home lending reports for a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CraCheckReportVerificationGetRequest</code> | Yes | Request to retrieve various home lending reports for a user. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CraCheckReportVerificationGetResponse|error`

**Sample code:**

```ballerina
plaid:CraCheckReportVerificationGetResponse result = check plaidClient->craCheckReportVerificationGet({
    reportsRequested: ["VOA"],
    userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    employmentRefreshOptions: {
        daysRequested: 1
    },
    secret: "string"
});
```

**Sample response:**

```json
{
  "report": {
    "report_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "gse_reference_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "client_report_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  },
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "warnings": [
    {
      "warning_type": "string",
      "warning_code": "IDENTITY_UNAVAILABLE",
      "cause": {
        "error_type": "INVALID_REQUEST",
        "error_code": "200",
        "error_message": "string",
        "display_message": "string",
        "item_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
      }
    }
  ]
}
```

</div>
</details>

<details>
<summary>craCheckReportVerificationPdfGet</summary>

<div>

Retrieve a Consumer Report as a Verification PDF.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CraCheckReportVerificationPdfGetRequest</code> | Yes | Request to retrieve a Consumer Report as a Verification PDF. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `http:Response|error`

**Sample code:**

```ballerina
http:Response result = check plaidClient->craCheckReportVerificationPdfGet({
    reportsRequested: ["voa"],
    reportRequested: "voa",
    hideGseDetails: false,
    userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

The raw `http:Response`. Read the PDF content with `check result.getBinaryPayload()`.

</div>
</details>

<details>
<summary>craLoansApplicationsRegister</summary>

<div>

Register loan applications and decisions.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CraLoansApplicationsRegisterRequest</code> | Yes | Request to register loan applications and decisions. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CraLoansApplicationsRegisterResponse|error`

**Sample code:**

```ballerina
plaid:CraLoansApplicationsRegisterResponse result = check plaidClient->craLoansApplicationsRegister({
    applications: [{
        user_token: "string",
        application_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        'type: "PERSONAL",
        decision: "APPROVED"
    }],
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>craLoansRegister</summary>

<div>

Register a list of loans to their applicants.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CRALoansRegisterRequest</code> | Yes | Request to register a list of loans to their applicants. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CraLoansRegisterResponse|error`

**Sample code:**

```ballerina
plaid:CraLoansRegisterResponse result = check plaidClient->craLoansRegister({
    loans: [{
        user_token: "string",
        loan_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        'type: "PERSONAL",
        payment_schedule: "DAILY",
        opened_date: "2026-01-15T00:00:00",
        opened_with_status: {
            status: "APPROVED",
            date: "2026-01-15T00:00:00"
        }
    }],
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>craLoansUpdate</summary>

<div>

Update loan data.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CraLoansUpdateRequest</code> | Yes | Request to update loan data. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CraLoansUpdateResponse|error`

**Sample code:**

```ballerina
plaid:CraLoansUpdateResponse result = check plaidClient->craLoansUpdate({
    loans: [{
        loan_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        status_history: [{
            status: "APPROVED",
            date: "2026-01-15T00:00:00"
        }],
        payment_history: [{
            period: 1,
            due_date: "2026-01-15T00:00:00",
            days_past_due: 1
        }]
    }],
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>craLoansUnregister</summary>

<div>

Unregister a list of loans.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CraLoansUnregisterRequest</code> | Yes | Request to unregister a list of loans. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CraLoanUnregisterResponse|error`

**Sample code:**

```ballerina
plaid:CraLoanUnregisterResponse result = check plaidClient->craLoansUnregister({
    loans: [{
        loan_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        closed_with_status: {
            status: "APPROVED",
            date: "2026-01-15T00:00:00"
        }
    }],
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>craServicingSubscriptionCreate</summary>

<div>

Create a CRA servicing subscription.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CraServicingSubscriptionCreateRequest</code> | Yes | Request to create a CRA servicing subscription. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CraServicingSubscriptionCreateResponse|error`

**Sample code:**

```ballerina
plaid:CraServicingSubscriptionCreateResponse result = check plaidClient->craServicingSubscriptionCreate({
    userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    scope: "PLAID_NETWORK",
    products: [{
        product: "cra_qualify",
        version: "string"
    }],
    webhook: "string"
});
```

**Sample response:**

```json
{
  "subscription_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>craServicingSubscriptionDelete</summary>

<div>

Delete a CRA servicing subscription.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CraServicingSubscriptionDeleteRequest</code> | Yes | Request to delete a CRA servicing subscription. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CraServicingSubscriptionDeleteResponse|error`

**Sample code:**

```ballerina
plaid:CraServicingSubscriptionDeleteResponse result = check plaidClient->craServicingSubscriptionDelete({
    subscriptionId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "subscription_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>craServicingSubscriptionGet</summary>

<div>

Get a CRA servicing subscription.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CraServicingSubscriptionGetRequest</code> | Yes | Request to get a CRA servicing subscription. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CraServicingSubscriptionGetResponse|error`

**Sample code:**

```ballerina
plaid:CraServicingSubscriptionGetResponse result = check plaidClient->craServicingSubscriptionGet({
    subscriptionId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "subscription": {
    "subscription_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "scope": "PLAID_NETWORK",
    "products": [
      {
        "product": "cra_qualify",
        "version": "string"
      }
    ]
  },
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>craServicingSubscriptionList</summary>

<div>

List a user's CRA servicing subscriptions.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CraServicingSubscriptionListRequest</code> | Yes | Request to list a user's CRA servicing subscriptions. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CraServicingSubscriptionListResponse|error`

**Sample code:**

```ballerina
plaid:CraServicingSubscriptionListResponse result = check plaidClient->craServicingSubscriptionList({
    userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "subscriptions": [
    {
      "subscription_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "scope": "PLAID_NETWORK",
      "products": [
        {
          "product": "cra_qualify",
          "version": "string"
        }
      ]
    }
  ],
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>craServicingSubscriptionUpdate</summary>

<div>

Update a CRA servicing subscription.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CraServicingSubscriptionUpdateRequest</code> | Yes | Request to update a CRA servicing subscription. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CraServicingSubscriptionUpdateResponse|error`

**Sample code:**

```ballerina
plaid:CraServicingSubscriptionUpdateResponse result = check plaidClient->craServicingSubscriptionUpdate({
    subscriptionId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    webhook: "string",
    resetFields: ["webhook"],
    secret: "string"
});
```

**Sample response:**

```json
{
  "subscription_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>craReportGet</summary>

<div>

Retrieve a CRA Report for provided user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CraReportGetRequest</code> | Yes | Request to retrieve a CRA Report for provided user. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CraReportGetResponse|error`

**Sample code:**

```ballerina
plaid:CraReportGetResponse result = check plaidClient->craReportGet({
    decisionStage: "PREQUALIFICATION",
    userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    consumerReportPermissiblePurpose: "ACCOUNT_REVIEW_CREDIT",
    products: [{
        product: "cra_qualify",
        version: "string"
    }]
});
```

**Sample response:**

```json
{
  "report": {
    "retrieved_time": "string",
    "scope": "PLAID_NETWORK",
    "decision_stage": "PREQUALIFICATION",
    "consumer_report_permissible_purpose": "ACCOUNT_REVIEW_CREDIT",
    "products": [
      {
        "product": "cra_qualify",
        "version": "string",
        "metadata": {},
        "attributes": {},
        "errors": [
          {
            "error_type": "INVALID_REQUEST",
            "error_code": "200",
            "error_message": "string",
            "display_message": "string"
          }
        ]
      }
    ]
  },
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "warnings": [
    {
      "warning_type": "string",
      "warning_code": "IDENTITY_UNAVAILABLE",
      "cause": {
        "error_type": "INVALID_REQUEST",
        "error_code": "200",
        "error_message": "string",
        "display_message": "string",
        "item_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
      }
    }
  ],
  "client_user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>craCreditProfileReportGet</summary>

<div>

Retrieve the credit profile report for a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CraCreditProfileReportGetRequest</code> | Yes | Request to retrieve the credit profile report for a user. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CraCreditProfileReportGetResponse|error`

**Sample code:**

```ballerina
plaid:CraCreditProfileReportGetResponse result = check plaidClient->craCreditProfileReportGet({
    inquiryType: "SOFT_INQUIRY",
    userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    clientReportId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    reportType: "QUALIFY",
    consumerReportPermissiblePurpose: "ACCOUNT_REVIEW_CREDIT",
    version: "v1"
});
```

**Sample response:**

```json
{
  "report": {
    "date_retrieved": "2026-01-15T00:00:00",
    "inquiry_type": "SOFT_INQUIRY",
    "client_report_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "lend_scores": [
      {
        "score": 1,
        "reason_codes": [
          "200"
        ],
        "variant": "string",
        "error_reason": "string"
      }
    ],
    "cashflow_insights_attributes": {},
    "network_insights_attributes": {},
    "metadata": {
      "item_count": 1,
      "institution_ids": [
        "3fa85f64-5717-4562-b3fc-2c963f66afa6"
      ],
      "account_count": 1,
      "primary_account_count": 1,
      "depository_account_type_count": 1,
      "credit_account_type_count": 1,
      "other_account_type_count": 1,
      "multiple_owner_account_count": 1,
      "generated_at": "string",
      "oldest_transaction_date": "2026-01-15T00:00:00",
      "most_recent_transaction_date": "2026-01-15T00:00:00"
    }
  },
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "warnings": [
    {
      "warning_type": "string",
      "warning_code": "IDENTITY_UNAVAILABLE",
      "cause": {
        "error_type": "INVALID_REQUEST",
        "error_code": "200",
        "error_message": "string",
        "display_message": "string",
        "item_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
      }
    }
  ],
  "user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

#### Credit

<details>
<summary>creditAuditCopyTokenUpdate</summary>

<div>

Update an Audit Copy Token.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreditAuditCopyTokenUpdateRequest</code> | Yes | Request to update an Audit Copy Token. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CreditAuditCopyTokenUpdateResponse|error`

**Sample code:**

```ballerina
plaid:CreditAuditCopyTokenUpdateResponse result = check plaidClient->creditAuditCopyTokenUpdate({
    reportTokens: ["string"],
    auditCopyToken: "string",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "updated": false
}
```

</div>
</details>

<details>
<summary>creditSessionsGet</summary>

<div>

Retrieve Link sessions for your user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreditSessionsGetRequest</code> | Yes | Request to retrieve Link sessions for your user. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CreditSessionsGetResponse|error`

**Sample code:**

```ballerina
plaid:CreditSessionsGetResponse result = check plaidClient->creditSessionsGet({
    userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    userToken: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "sessions": [
    {
      "link_session_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "session_start_time": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>creditAuditCopyTokenCreate</summary>

<div>

Create Asset or Income Report Audit Copy Token.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreditAuditCopyTokenCreateRequest</code> | Yes | Request to create Asset or Income Report Audit Copy Token. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CreditAuditCopyTokenCreateResponse|error`

**Sample code:**

```ballerina
plaid:CreditAuditCopyTokenCreateResponse result = check plaidClient->creditAuditCopyTokenCreate({
    reportTokens: ["string"],
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "audit_copy_token": "string",
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>creditReportAuditCopyRemove</summary>

<div>

Remove an Audit Copy token.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreditAuditCopyTokenRemoveRequest</code> | Yes | Request to remove an Audit Copy token. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CreditAuditCopyTokenRemoveResponse|error`

**Sample code:**

```ballerina
plaid:CreditAuditCopyTokenRemoveResponse result = check plaidClient->creditReportAuditCopyRemove({
    auditCopyToken: "string",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "removed": false,
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>creditAssetReportFreddieMacGet</summary>

<div>

Retrieve an Asset Report with Freddie Mac format. Only Freddie Mac can use this endpoint.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>AssetReportFreddieGetRequest</code> | Yes | Request to retrieve an Asset Report with Freddie Mac format. Only Freddie Mac can use this endpoint. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `AssetReportFreddieGetResponse|error`

**Sample code:**

```ballerina
plaid:AssetReportFreddieGetResponse result = check plaidClient->creditAssetReportFreddieMacGet({
    audit_copy_token: "string",
    client_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string"
});
```

**Sample response:**

```json
{
  "DEAL": {
    "LOANS": {
      "LOAN": {
        "LOAN_IDENTIFIERS": {
          "LOAN_IDENTIFIER": {}
        }
      }
    },
    "PARTIES": {
      "PARTY": [
        {
          "INDIVIDUAL": {
            "NAME": {}
          },
          "ROLES": {
            "ROLE": {}
          },
          "TAXPAYER_IDENTIFIERS": {
            "TAXPAYER_IDENTIFIER": {}
          }
        }
      ]
    },
    "SERVICES": {
      "SERVICE": {
        "VERIFICATION_OF_ASSET": {
          "REPORTING_INFORMATION": {},
          "SERVICE_PRODUCT_FULFILLMENT": {},
          "VERIFICATION_OF_ASSET_RESPONSE": {}
        },
        "STATUSES": {
          "STATUS": {}
        }
      }
    }
  },
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "SchemaVersion": 100.00
}
```

</div>
</details>

<details>
<summary>creditFreddieMacReportsGet</summary>

<div>

Retrieve an Asset Report with Freddie Mac format (aka VOA - Verification Of Assets), and a Verification Of Employment (VOE) report if this one is available. Only Freddie Mac can use this endpoint.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreditFreddieMacReportsGetRequest</code> | Yes | Request to retrieve an Asset Report in Freddie Mac format (VOA), with a VOE report if available. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CreditFreddieMacReportsGetResponse|error`

**Sample code:**

```ballerina
plaid:CreditFreddieMacReportsGetResponse result = check plaidClient->creditFreddieMacReportsGet({
    auditCopyToken: "string",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "DEAL": {
    "LOANS": {
      "LOAN": {
        "LOAN_IDENTIFIERS": {
          "LOAN_IDENTIFIER": [
            {}
          ]
        },
        "LoanRoleType": "string"
      }
    },
    "PARTIES": {
      "PARTY": [
        {
          "INDIVIDUAL": {
            "NAME": {}
          },
          "ROLES": {
            "ROLE": {}
          },
          "TAXPAYER_IDENTIFIERS": {
            "TAXPAYER_IDENTIFIER": {}
          }
        }
      ]
    },
    "SERVICES": {
      "SERVICE": {
        "VERIFICATION_OF_ASSET": [
          {
            "REPORTING_INFORMATION": {},
            "SERVICE_PRODUCT_FULFILLMENT": {},
            "VERIFICATION_OF_ASSET_RESPONSE": {}
          }
        ],
        "STATUSES": {
          "STATUS": {}
        }
      }
    }
  },
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "SchemaVersion": 100.00
}
```

</div>
</details>

<details>
<summary>creditBankIncomeGet</summary>

<div>

Retrieve information from the bank accounts used for income verification.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreditBankIncomeGetRequest</code> | Yes | Request to retrieve information from the bank accounts used for income verification. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CreditBankIncomeGetResponse|error`

**Sample code:**

```ballerina
plaid:CreditBankIncomeGetResponse result = check plaidClient->creditBankIncomeGet({
    userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    options: {
        count: 1
    },
    secret: "string",
    userToken: "string"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "bank_income": [
    {
      "bank_income_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "generated_time": "string",
      "days_requested": 1
    }
  ]
}
```

</div>
</details>

<details>
<summary>creditBankIncomePdfGet</summary>

<div>

Retrieve information from the bank accounts used for income verification in PDF format.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreditBankIncomePDFGetRequest</code> | Yes | Request to retrieve information from the bank accounts used for income verification in PDF format. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `http:Response|error`

**Sample code:**

```ballerina
http:Response result = check plaidClient->creditBankIncomePdfGet({
    userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    userToken: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

The raw `http:Response`. Read the PDF content with `check result.getBinaryPayload()`.

</div>
</details>

<details>
<summary>creditBankIncomeRefresh</summary>

<div>

**Deprecated.** Refresh a user's bank income information.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreditBankIncomeRefreshRequest</code> | Yes | Request to refresh a user's bank income information. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CreditBankIncomeRefreshResponse|error`

**Sample code:**

```ballerina
plaid:CreditBankIncomeRefreshResponse result = check plaidClient->creditBankIncomeRefresh({
    userToken: "string",
    userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    options: {
        daysRequested: 1
    },
    secret: "string"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>creditBankIncomeWebhookUpdate</summary>

<div>

Subscribe and unsubscribe to proactive notifications for a user's income profile.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreditBankIncomeWebhookUpdateRequest</code> | Yes | Request to subscribe and unsubscribe to proactive notifications for a user's income profile. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CreditBankIncomeWebhookUpdateResponse|error`

**Sample code:**

```ballerina
plaid:CreditBankIncomeWebhookUpdateResponse result = check plaidClient->creditBankIncomeWebhookUpdate({
    enableWebhooks: false,
    userToken: "string",
    userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>creditPayrollIncomeParsingConfigUpdate</summary>

<div>

Update the parsing configuration for a document income verification.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreditPayrollIncomeParsingConfigUpdateRequest</code> | Yes | Request to update the parsing configuration for a document income verification. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CreditPayrollIncomeParsingConfigUpdateResponse|error`

**Sample code:**

```ballerina
plaid:CreditPayrollIncomeParsingConfigUpdateResponse result = check plaidClient->creditPayrollIncomeParsingConfigUpdate({
    parsing_config: ["ocr"],
    client_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    user_token: "string"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>creditBankStatementsUploadsGet</summary>

<div>

Retrieve data for a user's uploaded bank statements.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreditBankStatementsUploadsGetRequest</code> | Yes | Request to retrieve data for a user's uploaded bank statements. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CreditBankStatementsUploadsGetResponse|error`

**Sample code:**

```ballerina
plaid:CreditBankStatementsUploadsGetResponse result = check plaidClient->creditBankStatementsUploadsGet({
    userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    options: {
        itemIds: ["3fa85f64-5717-4562-b3fc-2c963f66afa6"]
    },
    secret: "string",
    userToken: "string"
});
```

**Sample response:**

```json
{
  "items": [
    {
      "updated_at": "2026-01-15T00:00:00",
      "item_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "bank_statements": [
        {
          "transactions": [
            {
              "date": "2026-01-15T00:00:00",
              "amount": 100.00,
              "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              "original_description": "Sample description"
            }
          ],
          "document_metadata": {
            "name": "Sample name",
            "document_type": "string",
            "download_url": "https://example.com/resource",
            "status": "string"
          },
          "document_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "bank_accounts": [
            {
              "name": "Sample name",
              "bank_name": "Sample name",
              "account_type": "string",
              "account_number": "INV-0001",
              "owner": {
                "name": "Sample name",
                "address": {}
              },
              "periods": [
                {
                  "end_date": "2026-01-15T00:00:00",
                  "ending_balance": 100.00,
                  "starting_balance": 100.00,
                  "start_date": "2026-01-15T00:00:00"
                }
              ],
              "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
            }
          ]
        }
      ],
      "status": {}
    }
  ],
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>creditPayrollIncomeGet</summary>

<div>

Retrieve a user's payroll information.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreditPayrollIncomeGetRequest</code> | Yes | Request to retrieve a user's payroll information. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CreditPayrollIncomeGetResponse|error`

**Sample code:**

```ballerina
plaid:CreditPayrollIncomeGetResponse result = check plaidClient->creditPayrollIncomeGet({
    userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    options: {
        itemIds: ["3fa85f64-5717-4562-b3fc-2c963f66afa6"]
    },
    secret: "string",
    userToken: "string"
});
```

**Sample response:**

```json
{
  "items": [
    {
      "updated_at": "2026-01-15T00:00:00",
      "item_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "payroll_income": [
        {
          "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "pay_stubs": [
            {
              "deductions": {
                "breakdown": [
                  {}
                ],
                "total": {}
              },
              "document_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              "document_metadata": {
                "name": "Sample name",
                "document_type": "string",
                "download_url": "https://example.com/resource",
                "status": "string"
              },
              "earnings": {
                "breakdown": [
                  {}
                ],
                "total": {}
              },
              "employee": {
                "address": {},
                "name": "Sample name",
                "marital_status": "string",
                "taxpayer_id": {}
              },
              "employer": {
                "address": {},
                "name": "Sample name"
              },
              "net_pay": {
                "current_amount": 100.00,
                "description": "Sample description",
                "iso_currency_code": "200",
                "unofficial_currency_code": "200",
                "ytd_amount": 100.00
              },
              "pay_period_details": {
                "pay_amount": 100.00,
                "distribution_breakdown": [
                  {}
                ],
                "end_date": "2026-01-15T00:00:00",
                "gross_earnings": 100.00,
                "iso_currency_code": "200",
                "pay_date": "2026-01-15T00:00:00",
                "pay_frequency": "string",
                "start_date": "2026-01-15T00:00:00",
                "unofficial_currency_code": "200"
              }
            }
          ],
          "w2s": [
            {
              "document_metadata": {
                "name": "Sample name",
                "document_type": "string",
                "download_url": "https://example.com/resource",
                "status": "string"
              },
              "document_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              "employer": {
                "address": {},
                "name": "Sample name"
              },
              "employee": {
                "address": {},
                "name": "Sample name",
                "marital_status": "string",
                "taxpayer_id": {}
              },
              "tax_year": "string",
              "employer_id_number": "INV-0001",
              "wages_tips_other_comp": "string",
              "federal_income_tax_withheld": "string",
              "social_security_wages": "string",
              "social_security_tax_withheld": "string",
              "medicare_wages_and_tips": "string",
              "medicare_tax_withheld": "string",
              "social_security_tips": "string",
              "allocated_tips": "string",
              "box_9": "string",
              "dependent_care_benefits": "string",
              "nonqualified_plans": "string",
              "box_12": [
                {}
              ],
              "statutory_employee": "string",
              "retirement_plan": "string",
              "third_party_sick_pay": "string",
              "other": "string",
              "state_and_local_wages": [
                {}
              ]
            }
          ],
          "form1099s": [
            {
              "document_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
            }
          ],
          "i20s": [
            {}
          ]
        }
      ],
      "accounts": [
        {
          "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "rate_of_pay": {},
          "pay_frequency": "string"
        }
      ],
      "institution_name": "Sample name",
      "institution_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "status": {}
    }
  ],
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "error": {
    "error_type": "INVALID_REQUEST",
    "error_code": "200",
    "error_message": "string",
    "display_message": "string"
  }
}
```

</div>
</details>

<details>
<summary>creditPayrollIncomeRiskSignalsGet</summary>

<div>

Retrieve fraud insights for a user's manually uploaded document(s).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreditPayrollIncomeRiskSignalsGetRequest</code> | Yes | Request to retrieve fraud insights for a user's manually uploaded document(s). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CreditPayrollIncomeRiskSignalsGetResponse|error`

**Sample code:**

```ballerina
plaid:CreditPayrollIncomeRiskSignalsGetResponse result = check plaidClient->creditPayrollIncomeRiskSignalsGet({
    userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    userToken: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "items": [
    {
      "item_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "verification_risk_signals": [
        {
          "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "single_document_risk_signals": [
            {
              "document_reference": {},
              "risk_signals": [
                {
                  "type": "string",
                  "field": "string",
                  "has_fraud_risk": false,
                  "institution_metadata": {},
                  "expected_value": "string",
                  "actual_value": "string",
                  "signal_description": "Sample description",
                  "page_number": 1
                }
              ],
              "risk_summary": {
                "risk_score": 100.00
              }
            }
          ],
          "multi_document_risk_signals": [
            {
              "document_references": [
                {}
              ],
              "risk_signals": [
                {
                  "type": "string",
                  "field": "string",
                  "has_fraud_risk": false,
                  "institution_metadata": {},
                  "expected_value": "string",
                  "actual_value": "string",
                  "signal_description": "Sample description",
                  "page_number": 1
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "error": {
    "error_type": "INVALID_REQUEST",
    "error_code": "200",
    "error_message": "string",
    "display_message": "string"
  }
}
```

</div>
</details>

<details>
<summary>creditPayrollIncomePrecheck</summary>

<div>

**Deprecated.** Check income verification eligibility and optimize conversion.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreditPayrollIncomePrecheckRequest</code> | Yes | Request to check income verification eligibility and optimize conversion. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CreditPayrollIncomePrecheckResponse|error`

**Sample code:**

```ballerina
plaid:CreditPayrollIncomePrecheckResponse result = check plaidClient->creditPayrollIncomePrecheck({
    usMilitaryInfo: {
        isActiveDuty: false,
        branch: "string"
    },
    userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    employer: {
        name: "Sample name",
        taxId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        url: "https://example.com/resource"
    },
    secret: "string"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "confidence": "HIGH"
}
```

</div>
</details>

<details>
<summary>creditEmploymentGet</summary>

<div>

Retrieve a summary of an individual's employment information.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreditEmploymentGetRequest</code> | Yes | Request to retrieve a summary of an individual's employment information. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CreditEmploymentGetResponse|error`

**Sample code:**

```ballerina
plaid:CreditEmploymentGetResponse result = check plaidClient->creditEmploymentGet({
    userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    userToken: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "items": [
    {
      "item_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "employments": [
        {
          "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "status": "string",
          "start_date": "2026-01-15T00:00:00",
          "end_date": "2026-01-15T00:00:00",
          "employer": {
            "name": "Sample name"
          },
          "title": "string",
          "platform_ids": {
            "employee_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "payroll_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "position_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
          },
          "employee_type": "string",
          "last_paystub_date": "2026-01-15T00:00:00"
        }
      ],
      "employment_report_token": "string"
    }
  ],
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>creditPayrollIncomeRefresh</summary>

<div>

Refresh a digital payroll income verification.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreditPayrollIncomeRefreshRequest</code> | Yes | Request to refresh a digital payroll income verification. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CreditPayrollIncomeRefreshResponse|error`

**Sample code:**

```ballerina
plaid:CreditPayrollIncomeRefreshResponse result = check plaidClient->creditPayrollIncomeRefresh({
    userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    options: {
        webhook: "string",
        itemIds: ["3fa85f64-5717-4562-b3fc-2c963f66afa6"]
    },
    secret: "string",
    userToken: "string"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "verification_refresh_status": "string"
}
```

</div>
</details>

<details>
<summary>creditRelayCreate</summary>

<div>

Create a relay token to share an Asset Report with a partner client.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreditRelayCreateRequest</code> | Yes | Request to create a relay token to share an Asset Report with a partner client. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CreditRelayCreateResponse|error`

**Sample code:**

```ballerina
plaid:CreditRelayCreateResponse result = check plaidClient->creditRelayCreate({
    reportTokens: ["string"],
    secondaryClientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    webhook: "string",
    secret: "string"
});
```

**Sample response:**

```json
{
  "relay_token": "string",
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>creditRelayGet</summary>

<div>

Retrieve the reports associated with a relay token that was shared with you.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreditRelayGetRequest</code> | Yes | Request to retrieve the reports associated with a relay token that was shared with you. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `AssetReportGetResponse|error`

**Sample code:**

```ballerina
plaid:AssetReportGetResponse result = check plaidClient->creditRelayGet({
    reportType: "asset",
    relayToken: "string",
    includeInsights: false,
    secret: "string"
});
```

**Sample response:**

```json
{
  "report": {
    "asset_report_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "client_report_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "date_generated": "2026-01-15T00:00:00",
    "days_requested": 100.00,
    "user": {},
    "items": [
      {
        "item_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "institution_name": "Sample name",
        "institution_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "date_last_updated": "2026-01-15T00:00:00",
        "accounts": [
          {
            "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "balances": {
              "available": 100.00,
              "current": 100.00,
              "limit": 100.00,
              "margin_loan_amount": 100.00,
              "iso_currency_code": "200",
              "unofficial_currency_code": "200"
            },
            "mask": "string",
            "name": "Sample name",
            "official_name": "Sample name",
            "type": "investment",
            "subtype": "401a",
            "days_available": 100.00,
            "transactions": [
              {
                "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "amount": 100.00,
                "iso_currency_code": "200",
                "unofficial_currency_code": "200",
                "original_description": "Sample description",
                "date": "2026-01-15T00:00:00",
                "pending": false,
                "transaction_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
              }
            ],
            "owners": [
              {
                "names": [
                  "string"
                ],
                "phone_numbers": [
                  {}
                ],
                "emails": [
                  {}
                ],
                "addresses": [
                  {}
                ]
              }
            ],
            "historical_balances": [
              {
                "date": "2026-01-15T00:00:00",
                "current": 100.00,
                "iso_currency_code": "200",
                "unofficial_currency_code": "200"
              }
            ]
          }
        ]
      }
    ]
  },
  "warnings": [
    {
      "warning_type": "string",
      "warning_code": "OWNERS_UNAVAILABLE",
      "cause": {
        "error_type": "INVALID_REQUEST",
        "error_code": "200",
        "error_message": "string",
        "display_message": "string",
        "item_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
      }
    }
  ],
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>creditRelayPdfGet</summary>

<div>

Retrieve the PDF reports associated with a relay token that was shared with you (beta).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreditRelayPDFGetRequest</code> | Yes | Request to retrieve the PDF reports associated with a relay token that was shared with you (beta). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `http:Response|error`

**Sample code:**

```ballerina
http:Response result = check plaidClient->creditRelayPdfGet({
    reportType: "asset",
    relayToken: "string",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

The raw `http:Response`. Read the PDF content with `check result.getBinaryPayload()`.

</div>
</details>

<details>
<summary>creditRelayRefresh</summary>

<div>

Refresh a report of a relay token.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreditRelayRefreshRequest</code> | Yes | Request to refresh a report of a relay token. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CreditRelayRefreshResponse|error`

**Sample code:**

```ballerina
plaid:CreditRelayRefreshResponse result = check plaidClient->creditRelayRefresh({
    reportType: "asset",
    relayToken: "string",
    webhook: "string",
    secret: "string"
});
```

**Sample response:**

```json
{
  "relay_token": "string",
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "asset_report_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>creditRelayRemove</summary>

<div>

Remove relay token.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreditRelayRemoveRequest</code> | Yes | Request to remove relay token. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CreditRelayRemoveResponse|error`

**Sample code:**

```ballerina
plaid:CreditRelayRemoveResponse result = check plaidClient->creditRelayRemove({
    relayToken: "string",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "removed": false,
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

#### Consumer reports

<details>
<summary>consumerReportPdfGet</summary>

<div>

Retrieve PDF Reports.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>ConsumerReportPDFGetRequest</code> | Yes | Request to retrieve PDF Reports. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `http:Response|error`

**Sample code:**

```ballerina
http:Response result = check plaidClient->consumerReportPdfGet({
    userToken: "string",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

The raw `http:Response`. Read the PDF content with `check result.getBinaryPayload()`.

</div>
</details>

#### OAuth

<details>
<summary>oauthToken</summary>

<div>

Create or refresh an OAuth access token.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>OAuthTokenRequest</code> | Yes | Request to create or refresh an OAuth access token. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `OAuthTokenResponse|error`

**Sample code:**

```ballerina
plaid:OAuthTokenResponse result = check plaidClient->oauthToken({
    grantType: "refresh_token",
    refreshToken: "string",
    subjectTokenType: "urn:plaid:params:tokens:user",
    audience: "string"
});
```

**Sample response:**

```json
{
  "access_token": "string",
  "refresh_token": "string",
  "token_type": "string",
  "expires_in": 1,
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>oauthIntrospect</summary>

<div>

Get metadata about an OAuth token.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>OAuthIntrospectRequest</code> | Yes | Request to get metadata about an OAuth token. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `OAuthIntrospectResponse|error`

**Sample code:**

```ballerina
plaid:OAuthIntrospectResponse result = check plaidClient->oauthIntrospect({
    token: "string",
    clientSecret: "string",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "active": false,
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "scope": "string",
  "client_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "exp": 1,
  "iat": 1
}
```

</div>
</details>

<details>
<summary>oauthRevoke</summary>

<div>

Revoke an OAuth token.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>OAuthRevokeRequest</code> | Yes | Request to revoke an OAuth token. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `OAuthRevokeResponse|error`

**Sample code:**

```ballerina
plaid:OAuthRevokeResponse result = check plaidClient->oauthRevoke({
    token: "string",
    clientSecret: "string",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

#### Statements

<details>
<summary>statementsList</summary>

<div>

Retrieve a list of all statements associated with an Item.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>StatementsListRequest</code> | Yes | Request to retrieve a list of all statements associated with an Item. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `StatementsListResponse|error`

**Sample code:**

```ballerina
plaid:StatementsListResponse result = check plaidClient->statementsList({
    accessToken: "string",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "accounts": [
    {
      "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "account_mask": "string",
      "account_name": "Sample name",
      "account_official_name": "Sample name",
      "account_subtype": "string",
      "account_type": "string",
      "statements": [
        {
          "statement_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "month": 1,
          "year": 1
        }
      ]
    }
  ],
  "institution_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "institution_name": "Sample name",
  "item_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>statementsDownload</summary>

<div>

Retrieve a single statement.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>StatementsDownloadRequest</code> | Yes | Request to retrieve a single statement. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `http:Response|error`

**Sample code:**

```ballerina
http:Response result = check plaidClient->statementsDownload({
    accessToken: "string",
    statementId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

The raw `http:Response`. Read the PDF content with `check result.getBinaryPayload()`.

</div>
</details>

<details>
<summary>statementsRefresh</summary>

<div>

Refresh statements data.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>StatementsRefreshRequest</code> | Yes | Request to refresh statements data. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `StatementsRefreshResponse|error`

**Sample code:**

```ballerina
plaid:StatementsRefreshResponse result = check plaidClient->statementsRefresh({
    accessToken: "string",
    endDate: "2026-01-15T00:00:00",
    startDate: "2026-01-15T00:00:00",
    secret: "string"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

#### Consent

<details>
<summary>consentEventsGet</summary>

<div>

List a historical log of item consent events.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>ConsentEventsGetRequest</code> | Yes | Request to list a historical log of item consent events. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ConsentEventsGetResponse|error`

**Sample code:**

```ballerina
plaid:ConsentEventsGetResponse result = check plaidClient->consentEventsGet({
    accessToken: "string",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "consent_events": [
    {
      "item_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "created_at": "string",
      "event_type": "CONSENT_GRANTED"
    }
  ]
}
```

</div>
</details>

#### Item

<details>
<summary>itemActivityList</summary>

<div>

List a historical log of user consent events.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>ItemActivityListRequest</code> | Yes | Request to list a historical log of user consent events. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ItemActivityListResponse|error`

**Sample code:**

```ballerina
plaid:ItemActivityListResponse result = check plaidClient->itemActivityList({
    accessToken: "string",
    cursor: "string",
    count: 1,
    secret: "string"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "activities": [
    {
      "activity": "UNKNOWN",
      "initiator": "string",
      "initiated_date": "2026-01-15T00:00:00",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "state": "UNKNOWN"
    }
  ],
  "last_data_access_times": [
    {
      "application_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "account_balance_info": "string",
      "account_routing_number": "INV-0001",
      "contact_info": "string",
      "transactions": "string",
      "credit_loan_info": "string",
      "investments": "string"
    }
  ],
  "cursor": "string"
}
```

</div>
</details>

<details>
<summary>itemApplicationList</summary>

<div>

List a user's connected applications.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>ItemApplicationListRequest</code> | Yes | Request to list a user's connected applications. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ItemApplicationListResponse|error`

**Sample code:**

```ballerina
plaid:ItemApplicationListResponse result = check plaidClient->itemApplicationList({
    accessToken: "string",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "applications": [
    {
      "name": "Sample name",
      "created_at": "string",
      "application_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ],
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "disconnected_applications": [
    {
      "name": "Sample name",
      "application_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "reason_for_access": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>itemApplicationUnlink</summary>

<div>

Unlink a user's connected application.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>ItemApplicationUnlinkRequest</code> | Yes | Request to unlink a user's connected application. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ItemApplicationUnlinkResponse|error`

**Sample code:**

```ballerina
plaid:ItemApplicationUnlinkResponse result = check plaidClient->itemApplicationUnlink({
    accessToken: "string",
    applicationId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>itemApplicationScopesUpdate</summary>

<div>

Update the scopes of access for a particular application.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>ItemApplicationScopesUpdateRequest</code> | Yes | Request to update the scopes of access for a particular application. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ItemApplicationScopesUpdateResponse|error`

**Sample code:**

```ballerina
plaid:ItemApplicationScopesUpdateResponse result = check plaidClient->itemApplicationScopesUpdate({
    accessToken: "string",
    context: "ENROLLMENT",
    scopes: {
        newAccounts: false,
        accounts: [{
            uniqueId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
        }]
    },
    applicationId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>itemGet</summary>

<div>

Retrieve an Item.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>ItemGetRequest</code> | Yes | Request to retrieve an Item. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ItemGetResponse|error`

**Sample code:**

```ballerina
plaid:ItemGetResponse result = check plaidClient->itemGet({
    accessToken: "string",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "item": {
    "item_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "webhook": "string",
    "error": {
      "error_type": "INVALID_REQUEST",
      "error_code": "200",
      "error_message": "string",
      "display_message": "string"
    },
    "available_products": [
      "assets"
    ],
    "billed_products": [
      "assets"
    ],
    "consent_expiration_time": "string",
    "update_type": "background"
  },
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>itemRemove</summary>

<div>

Remove an Item.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>ItemRemoveRequest</code> | Yes | Request to remove an Item. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ItemRemoveResponse|error`

**Sample code:**

```ballerina
plaid:ItemRemoveResponse result = check plaidClient->itemRemove({
    accessToken: "string",
    reasonCode: "FRAUD_FIRST_PARTY",
    reasonNote: "string",
    secret: "string"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>itemProductsTerminate</summary>

<div>

Terminate products for an Item.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>ItemProductsTerminateRequest</code> | Yes | Request to terminate products for an Item. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ItemProductsTerminateResponse|error`

**Sample code:**

```ballerina
plaid:ItemProductsTerminateResponse result = check plaidClient->itemProductsTerminate({
    accessToken: "string",
    reasonCode: "FRAUD_FIRST_PARTY",
    reasonNote: "string",
    secret: "string"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>itemWebhookUpdate</summary>

<div>

Update Webhook URL.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>ItemWebhookUpdateRequest</code> | Yes | Request to update Webhook URL. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ItemWebhookUpdateResponse|error`

**Sample code:**

```ballerina
plaid:ItemWebhookUpdateResponse result = check plaidClient->itemWebhookUpdate({
    accessToken: "string",
    webhook: "string",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "item": {
    "item_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "webhook": "string",
    "error": {
      "error_type": "INVALID_REQUEST",
      "error_code": "200",
      "error_message": "string",
      "display_message": "string"
    },
    "available_products": [
      "assets"
    ],
    "billed_products": [
      "assets"
    ],
    "consent_expiration_time": "string",
    "update_type": "background"
  },
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>itemAccessTokenInvalidate</summary>

<div>

Invalidate access_token.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>ItemAccessTokenInvalidateRequest</code> | Yes | Request to invalidate access_token. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ItemAccessTokenInvalidateResponse|error`

**Sample code:**

```ballerina
plaid:ItemAccessTokenInvalidateResponse result = check plaidClient->itemAccessTokenInvalidate({
    accessToken: "string",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "new_access_token": "string",
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>itemPublicTokenExchange</summary>

<div>

Exchange public token for an access token.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>ItemPublicTokenExchangeRequest</code> | Yes | Request to exchange public token for an access token. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ItemPublicTokenExchangeResponse|error`

**Sample code:**

```ballerina
plaid:ItemPublicTokenExchangeResponse result = check plaidClient->itemPublicTokenExchange({
    publicToken: "string",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "access_token": "string",
  "item_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>itemCreatePublicToken</summary>

<div>

**Deprecated.** (Deprecated) Create public token.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>ItemPublicTokenCreateRequest</code> | Yes | Request to create public token. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ItemPublicTokenCreateResponse|error`

**Sample code:**

```ballerina
plaid:ItemPublicTokenCreateResponse result = check plaidClient->itemCreatePublicToken({
    accessToken: "string",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "public_token": "string",
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "expiration": "string"
}
```

</div>
</details>

<details>
<summary>itemImport</summary>

<div>

Import Item.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>ItemImportRequest</code> | Yes | Request to import Item. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ItemImportResponse|error`

**Sample code:**

```ballerina
plaid:ItemImportResponse result = check plaidClient->itemImport({
    userAuth: {
        userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        authToken: "string"
    },
    options: {
        webhook: "string"
    },
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "access_token": "string",
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

#### Applications

<details>
<summary>applicationGet</summary>

<div>

Retrieve information about a Plaid application.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>ApplicationGetRequest</code> | Yes | Request to retrieve information about a Plaid application. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ApplicationGetResponse|error`

**Sample code:**

```ballerina
plaid:ApplicationGetResponse result = check plaidClient->applicationGet({
    secret: "string",
    applicationId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "application": {
    "logo_url": "https://example.com/resource",
    "city": "string",
    "join_date": "2026-01-15T00:00:00",
    "display_name": "Sample name",
    "application_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "application_url": "https://example.com/resource",
    "use_case": "string",
    "country_code": "200",
    "company_legal_name": "Sample name",
    "reason_for_access": "string",
    "name": "Sample name",
    "region": "string",
    "postal_code": "200"
  }
}
```

</div>
</details>

#### User accounts

<details>
<summary>userAccountSessionGet</summary>

<div>

Retrieve User Account.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>UserAccountSessionGetRequest</code> | Yes | Request to retrieve User Account. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `UserAccountSessionGetResponse|error`

**Sample code:**

```ballerina
plaid:UserAccountSessionGetResponse result = check plaidClient->userAccountSessionGet({
    publicToken: "string",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "identity": {
    "phone_number": "INV-0001",
    "email": "user@example.com",
    "date_of_birth": "2026-01-15T00:00:00"
  },
  "items": [
    {
      "item_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "access_token": "string"
    }
  ],
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>userAccountSessionEventSend</summary>

<div>

Send User Account Session Event.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>UserAccountSessionEventSendRequest</code> | Yes | Request to send User Account Session Event. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `UserAccountSessionEventSendResponse|error`

**Sample code:**

```ballerina
plaid:UserAccountSessionEventSendResponse result = check plaidClient->userAccountSessionEventSend({
    linkSessionId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    event: {
        name: "Sample name",
        timestamp: "string",
        outcome: "string"
    },
    secret: "string",
    cohortId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

#### Profile

<details>
<summary>profileNetworkStatusGet</summary>

<div>

Check a user's Plaid Network status by profile.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>ProfileNetworkStatusGetRequest</code> | Yes | Request to check a user's Plaid Network status. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ProfileNetworkStatusGetResponse|error`

**Sample code:**

```ballerina
plaid:ProfileNetworkStatusGetResponse result = check plaidClient->profileNetworkStatusGet({
    user: {
        phone_number: "INV-0001"
    },
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "network_status": "UNKNOWN",
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

#### Network

<details>
<summary>networkStatusGet</summary>

<div>

Check a user's Plaid Network status.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>NetworkStatusGetRequest</code> | Yes | Request to check a user's Plaid Network status. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `NetworkStatusGetResponse|error`

**Sample code:**

```ballerina
plaid:NetworkStatusGetResponse result = check plaidClient->networkStatusGet({
    user: {
        phone_number: "INV-0001"
    },
    templateId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "network_status": "UNKNOWN",
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "layer": {
    "eligible": false
  }
}
```

</div>
</details>

#### Auth

<details>
<summary>authGet</summary>

<div>

Retrieve auth data.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>AuthGetRequest</code> | Yes | Request to retrieve auth data. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `AuthGetResponse|error`

**Sample code:**

```ballerina
plaid:AuthGetResponse result = check plaidClient->authGet({
    accessToken: "string",
    options: {
        accountIds: ["3fa85f64-5717-4562-b3fc-2c963f66afa6"]
    },
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "accounts": [
    {
      "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "balances": {
        "available": 100.00,
        "current": 100.00,
        "limit": 100.00,
        "iso_currency_code": "200",
        "unofficial_currency_code": "200"
      },
      "mask": "string",
      "name": "Sample name",
      "official_name": "Sample name",
      "type": "investment",
      "subtype": "401a"
    }
  ],
  "numbers": {
    "ach": [
      {
        "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "account": "string",
        "routing": "string",
        "wire_routing": "string"
      }
    ],
    "eft": [
      {
        "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "account": "string",
        "institution": "string",
        "branch": "string"
      }
    ],
    "international": [
      {
        "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "iban": "string",
        "bic": "string"
      }
    ],
    "bacs": [
      {
        "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "account": "string",
        "sort_code": "200"
      }
    ]
  },
  "item": {
    "item_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "webhook": "string",
    "error": {
      "error_type": "INVALID_REQUEST",
      "error_code": "200",
      "error_message": "string",
      "display_message": "string"
    },
    "available_products": [
      "assets"
    ],
    "billed_products": [
      "assets"
    ],
    "consent_expiration_time": "string",
    "update_type": "background"
  },
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>authVerify</summary>

<div>

Verify auth data.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>AuthVerifyRequest</code> | Yes | Request to verify auth data. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `AuthVerifyResponse|error`

**Sample code:**

```ballerina
plaid:AuthVerifyResponse result = check plaidClient->authVerify({
    numbers: {
        ach: {
            routing: "string",
            account: "string"
        }
    },
    secret: "string",
    legalName: "Sample name",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "verification_status": "string",
  "verification_insights": {
    "network_status": {
      "has_numbers_match": false,
      "is_numbers_match_verified": false
    },
    "account_number_format": "valid",
    "name_match_score": 1
  },
  "item_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

#### Transactions

<details>
<summary>transactionsGet</summary>

<div>

Get transaction data.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>TransactionsGetRequest</code> | Yes | Request to get transaction data. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TransactionsGetResponse|error`

**Sample code:**

```ballerina
plaid:TransactionsGetResponse result = check plaidClient->transactionsGet({
    accessToken: "string",
    endDate: "2026-01-15T00:00:00",
    startDate: "2026-01-15T00:00:00",
    options: {
        accountIds: ["3fa85f64-5717-4562-b3fc-2c963f66afa6"],
        includePersonalFinanceCategoryBeta: false,
        includeLogoAndCounterpartyBeta: false
    }
});
```

**Sample response:**

```json
{
  "accounts": [
    {
      "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "balances": {
        "available": 100.00,
        "current": 100.00,
        "limit": 100.00,
        "iso_currency_code": "200",
        "unofficial_currency_code": "200"
      },
      "mask": "string",
      "name": "Sample name",
      "official_name": "Sample name",
      "type": "investment",
      "subtype": "401a"
    }
  ],
  "transactions": [
    {
      "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "amount": 100.00,
      "iso_currency_code": "200",
      "unofficial_currency_code": "200",
      "date": "2026-01-15T00:00:00",
      "pending": false,
      "transaction_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "authorized_date": "2026-01-15T00:00:00",
      "authorized_datetime": "2026-01-15T00:00:00",
      "datetime": "2026-01-15T00:00:00",
      "payment_channel": "online",
      "transaction_code": "adjustment",
      "account_owner": "string",
      "location": {
        "address": "string",
        "city": "string",
        "region": "string",
        "postal_code": "200",
        "country": "string",
        "lat": 100.00,
        "lon": 100.00,
        "store_number": "INV-0001"
      },
      "name": "Sample name",
      "payment_meta": {
        "reference_number": "INV-0001",
        "ppd_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "payee": "string",
        "by_order_of": "string",
        "payer": "string",
        "payment_method": "string",
        "payment_processor": "string",
        "reason": "string"
      },
      "pending_transaction_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ],
  "total_transactions": 1,
  "item": {
    "item_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "webhook": "string",
    "error": {
      "error_type": "INVALID_REQUEST",
      "error_code": "200",
      "error_message": "string",
      "display_message": "string"
    },
    "available_products": [
      "assets"
    ],
    "billed_products": [
      "assets"
    ],
    "consent_expiration_time": "string",
    "update_type": "background"
  },
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>transactionsRefresh</summary>

<div>

Refresh transaction data.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>TransactionsRefreshRequest</code> | Yes | Request to refresh transaction data. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TransactionsRefreshResponse|error`

**Sample code:**

```ballerina
plaid:TransactionsRefreshResponse result = check plaidClient->transactionsRefresh({
    accessToken: "string",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>transactionsRecurringGet</summary>

<div>

Fetch recurring transaction streams.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>TransactionsRecurringGetRequest</code> | Yes | Request to fetch recurring transaction streams. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TransactionsRecurringGetResponse|error`

**Sample code:**

```ballerina
plaid:TransactionsRecurringGetResponse result = check plaidClient->transactionsRecurringGet({
    accessToken: "string",
    accountIds: ["3fa85f64-5717-4562-b3fc-2c963f66afa6"],
    options: {
        includePersonalFinanceCategory: false,
        personalFinanceCategoryVersion: "v1"
    },
    secret: "string"
});
```

**Sample response:**

```json
{
  "inflow_streams": [
    {
      "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "stream_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "category": [
        "string"
      ],
      "category_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "description": "Sample description",
      "merchant_name": "Sample name",
      "first_date": "2026-01-15T00:00:00",
      "last_date": "2026-01-15T00:00:00",
      "frequency": "UNKNOWN",
      "transaction_ids": [
        "3fa85f64-5717-4562-b3fc-2c963f66afa6"
      ],
      "average_amount": {},
      "last_amount": {},
      "is_active": false,
      "status": "UNKNOWN",
      "is_user_modified": false
    }
  ],
  "outflow_streams": [
    {
      "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "stream_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "category": [
        "string"
      ],
      "category_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "description": "Sample description",
      "merchant_name": "Sample name",
      "first_date": "2026-01-15T00:00:00",
      "last_date": "2026-01-15T00:00:00",
      "frequency": "UNKNOWN",
      "transaction_ids": [
        "3fa85f64-5717-4562-b3fc-2c963f66afa6"
      ],
      "average_amount": {},
      "last_amount": {},
      "is_active": false,
      "status": "UNKNOWN",
      "is_user_modified": false
    }
  ],
  "updated_datetime": "2026-01-15T00:00:00",
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "personal_finance_category_version": "v1"
}
```

</div>
</details>

<details>
<summary>transactionsSync</summary>

<div>

Get incremental transaction updates on an Item.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>TransactionsSyncRequest</code> | Yes | Request to get incremental transaction updates on an Item. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TransactionsSyncResponse|error`

**Sample code:**

```ballerina
plaid:TransactionsSyncResponse result = check plaidClient->transactionsSync({
    accessToken: "string",
    cursor: "string",
    count: 1,
    options: {
        includeLogoAndCounterpartyBeta: false,
        accountId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        includeOriginalDescription: false
    }
});
```

**Sample response:**

```json
{
  "transactions_update_status": "TRANSACTIONS_UPDATE_STATUS_UNKNOWN",
  "accounts": [
    {
      "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "balances": {
        "available": 100.00,
        "current": 100.00,
        "limit": 100.00,
        "iso_currency_code": "200",
        "unofficial_currency_code": "200"
      },
      "mask": "string",
      "name": "Sample name",
      "official_name": "Sample name",
      "type": "investment",
      "subtype": "401a"
    }
  ],
  "added": [
    {
      "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "amount": 100.00,
      "iso_currency_code": "200",
      "unofficial_currency_code": "200",
      "date": "2026-01-15T00:00:00",
      "pending": false,
      "transaction_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "authorized_date": "2026-01-15T00:00:00",
      "authorized_datetime": "2026-01-15T00:00:00",
      "datetime": "2026-01-15T00:00:00",
      "payment_channel": "online",
      "transaction_code": "adjustment",
      "account_owner": "string",
      "location": {
        "address": "string",
        "city": "string",
        "region": "string",
        "postal_code": "200",
        "country": "string",
        "lat": 100.00,
        "lon": 100.00,
        "store_number": "INV-0001"
      },
      "name": "Sample name",
      "payment_meta": {
        "reference_number": "INV-0001",
        "ppd_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "payee": "string",
        "by_order_of": "string",
        "payer": "string",
        "payment_method": "string",
        "payment_processor": "string",
        "reason": "string"
      },
      "pending_transaction_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ],
  "modified": [
    {
      "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "amount": 100.00,
      "iso_currency_code": "200",
      "unofficial_currency_code": "200",
      "date": "2026-01-15T00:00:00",
      "pending": false,
      "transaction_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "authorized_date": "2026-01-15T00:00:00",
      "authorized_datetime": "2026-01-15T00:00:00",
      "datetime": "2026-01-15T00:00:00",
      "payment_channel": "online",
      "transaction_code": "adjustment",
      "account_owner": "string",
      "location": {
        "address": "string",
        "city": "string",
        "region": "string",
        "postal_code": "200",
        "country": "string",
        "lat": 100.00,
        "lon": 100.00,
        "store_number": "INV-0001"
      },
      "name": "Sample name",
      "payment_meta": {
        "reference_number": "INV-0001",
        "ppd_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "payee": "string",
        "by_order_of": "string",
        "payer": "string",
        "payment_method": "string",
        "payment_processor": "string",
        "reason": "string"
      },
      "pending_transaction_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ],
  "removed": [
    {
      "transaction_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ],
  "next_cursor": "string",
  "has_more": false,
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>transactionsEnrich</summary>

<div>

Enrich locally-held transaction data.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>TransactionsEnrichRequest</code> | Yes | Request to enrich locally-held transaction data. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TransactionsEnrichResponse|error`

**Sample code:**

```ballerina
plaid:TransactionsEnrichResponse result = check plaidClient->transactionsEnrich({
    accountType: "string",
    transactions: [{
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        description: "Sample description",
        amount: 100.00,
        direction: "INFLOW",
        iso_currency_code: "200"
    }],
    options: {
        includeLegacyCategory: false,
        personalFinanceCategoryVersion: "v1"
    },
    secret: "string"
});
```

**Sample response:**

```json
{
  "enriched_transactions": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "description": "Sample description",
      "amount": 100.00,
      "iso_currency_code": "200",
      "enrichments": {
        "counterparties": [
          {
            "name": "Sample name",
            "type": "merchant",
            "website": "string",
            "logo_url": "https://example.com/resource",
            "phone_number": "INV-0001"
          }
        ],
        "location": {
          "address": "string",
          "city": "string",
          "region": "string",
          "postal_code": "200",
          "country": "string",
          "lat": 100.00,
          "lon": 100.00,
          "store_number": "INV-0001"
        },
        "logo_url": "https://example.com/resource",
        "merchant_name": "Sample name",
        "payment_channel": "online",
        "phone_number": "INV-0001",
        "personal_finance_category": {
          "primary": "string",
          "detailed": "string"
        },
        "personal_finance_category_icon_url": "https://example.com/resource",
        "website": "string"
      }
    }
  ],
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

#### Sandbox

<details>
<summary>sandboxTransactionsCreate</summary>

<div>

Create sandbox transactions.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>SandboxTransactionsCreateRequest</code> | Yes | Request to create sandbox transactions. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `SandboxTransactionsCreateResponse|error`

**Sample code:**

```ballerina
plaid:SandboxTransactionsCreateResponse result = check plaidClient->sandboxTransactionsCreate({
    accessToken: "string",
    transactions: [{
        date_transacted: "2026-01-15T00:00:00",
        date_posted: "2026-01-15T00:00:00",
        amount: 100.00,
        description: "Sample description"
    }],
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>sandboxProcessorTokenCreate</summary>

<div>

Create a test Item and processor token.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>SandboxProcessorTokenCreateRequest</code> | Yes | Request to create a test Item and processor token. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `SandboxProcessorTokenCreateResponse|error`

**Sample code:**

```ballerina
plaid:SandboxProcessorTokenCreateResponse result = check plaidClient->sandboxProcessorTokenCreate({
    institutionId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    options: {
        overridePassword: "string",
        overrideUsername: "Sample name"
    },
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "processor_token": "string",
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>sandboxPublicTokenCreate</summary>

<div>

Create a test Item.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>SandboxPublicTokenCreateRequest</code> | Yes | Request to create a test Item. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `SandboxPublicTokenCreateResponse|error`

**Sample code:**

```ballerina
plaid:SandboxPublicTokenCreateResponse result = check plaidClient->sandboxPublicTokenCreate({
    initialProducts: ["assets"],
    institutionId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    options: {
        overridePassword: "string",
        webhook: "string",
        overrideUsername: "Sample name"
    }
});
```

**Sample response:**

```json
{
  "public_token": "string",
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>sandboxItemFireWebhook</summary>

<div>

Fire a test webhook.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>SandboxItemFireWebhookRequest</code> | Yes | Request to fire a test webhook. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `SandboxItemFireWebhookResponse|error`

**Sample code:**

```ballerina
plaid:SandboxItemFireWebhookResponse result = check plaidClient->sandboxItemFireWebhook({
    accessToken: "string",
    webhookCode: "DEFAULT_UPDATE",
    webhookType: "AUTH",
    secret: "string"
});
```

**Sample response:**

```json
{
  "webhook_fired": false,
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>sandboxUserFireWebhook</summary>

<div>

Fire a test user webhook.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>SandboxUserFireWebhookRequest</code> | Yes | Request to fire a test user webhook. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `SandboxUserFireWebhookResponse|error`

**Sample code:**

```ballerina
plaid:SandboxUserFireWebhookResponse result = check plaidClient->sandboxUserFireWebhook({
    webhook: "string",
    webhookType: "CHECK_REPORT",
    webhookCode: "USER_CHECK_REPORT_READY",
    userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "webhook_fired": false,
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>sandboxItemResetLogin</summary>

<div>

Force a Sandbox Item into an error state.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>SandboxItemResetLoginRequest</code> | Yes | Request to force a Sandbox Item into an error state. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `SandboxItemResetLoginResponse|error`

**Sample code:**

```ballerina
plaid:SandboxItemResetLoginResponse result = check plaidClient->sandboxItemResetLogin({
    accessToken: "string",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "reset_login": false,
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>sandboxItemApplicationSeed</summary>

<div>

Seed a connected application for a Permissions Manager sandbox item.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>SandboxItemApplicationSeedRequest</code> | Yes | Request to seed a connected application for a Permissions Manager sandbox item. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `SandboxItemApplicationSeedResponse|error`

**Sample code:**

```ballerina
plaid:SandboxItemApplicationSeedResponse result = check plaidClient->sandboxItemApplicationSeed({
    accessToken: "string",
    applicationId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "item_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>sandboxFdxConsentSeed</summary>

<div>

Seed an FDX consent grant for a sandbox data partner.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>SandboxFdxConsentSeedRequest</code> | Yes | Request to seed an FDX consent grant for a sandbox data partner. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `SandboxFdxConsentSeedResponse|error`

**Sample code:**

```ballerina
plaid:SandboxFdxConsentSeedResponse result = check plaidClient->sandboxFdxConsentSeed({
    customerId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    applicationId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "consent_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>sandboxItemSetVerificationStatus</summary>

<div>

Set verification status for Sandbox account.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>SandboxItemSetVerificationStatusRequest</code> | Yes | Request to set verification status for Sandbox account. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `SandboxItemSetVerificationStatusResponse|error`

**Sample code:**

```ballerina
plaid:SandboxItemSetVerificationStatusResponse result = check plaidClient->sandboxItemSetVerificationStatus({
    accessToken: "string",
    accountId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    verificationStatus: "automatically_verified",
    secret: "string"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>sandboxUserResetLogin</summary>

<div>

Force item(s) for a Sandbox User into an error state.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>SandboxUserResetLoginRequest</code> | Yes | Request to force item(s) for a Sandbox User into an error state. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `SandboxUserResetLoginResponse|error`

**Sample code:**

```ballerina
plaid:SandboxUserResetLoginResponse result = check plaidClient->sandboxUserResetLogin({
    userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    itemIds: ["3fa85f64-5717-4562-b3fc-2c963f66afa6"],
    secret: "string",
    userToken: "string"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>sandboxBankTransferSimulate</summary>

<div>

**Deprecated.** (Deprecated) Simulate a bank transfer event in Sandbox.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>SandboxBankTransferSimulateRequest</code> | Yes | Request to simulate a bank transfer event in Sandbox. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `SandboxBankTransferSimulateResponse|error`

**Sample code:**

```ballerina
plaid:SandboxBankTransferSimulateResponse result = check plaidClient->sandboxBankTransferSimulate({
    eventType: "string",
    bankTransferId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    failureReason: {
        ach_return_code: "200",
        description: "Sample description"
    }
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>sandboxTransferSweepSimulate</summary>

<div>

Simulate creating a sweep.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>SandboxTransferSweepSimulateRequest</code> | Yes | Request to simulate creating a sweep. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `SandboxTransferSweepSimulateResponse|error`

**Sample code:**

```ballerina
plaid:SandboxTransferSweepSimulateResponse result = check plaidClient->sandboxTransferSweepSimulate({
    webhook: "string",
    secret: "string",
    testClockId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "sweep": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "funding_account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "created": "string",
    "amount": "string",
    "iso_currency_code": "200",
    "settled": "string"
  }
}
```

</div>
</details>

<details>
<summary>sandboxTransferSimulate</summary>

<div>

Simulate a transfer event in Sandbox.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>SandboxTransferSimulateRequest</code> | Yes | Request to simulate a transfer event in Sandbox. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `SandboxTransferSimulateResponse|error`

**Sample code:**

```ballerina
plaid:SandboxTransferSimulateResponse result = check plaidClient->sandboxTransferSimulate({
    eventType: "string",
    transferId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    webhook: "string",
    secret: "string"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>sandboxTransferRefundSimulate</summary>

<div>

Simulate a refund event in Sandbox.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>SandboxTransferRefundSimulateRequest</code> | Yes | Request to simulate a refund event in Sandbox. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `SandboxTransferRefundSimulateResponse|error`

**Sample code:**

```ballerina
plaid:SandboxTransferRefundSimulateResponse result = check plaidClient->sandboxTransferRefundSimulate({
    eventType: "string",
    refundId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    webhook: "string",
    secret: "string"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>sandboxTransferLedgerSimulateAvailable</summary>

<div>

Simulate converting pending balance to available balance.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>SandboxTransferLedgerSimulateAvailableRequest</code> | Yes | Request to simulate converting pending balance to available balance. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `SandboxTransferLedgerSimulateAvailableResponse|error`

**Sample code:**

```ballerina
plaid:SandboxTransferLedgerSimulateAvailableResponse result = check plaidClient->sandboxTransferLedgerSimulateAvailable({
    originatorClientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    webhook: "string",
    secret: "string",
    testClockId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>sandboxTransferLedgerDepositSimulate</summary>

<div>

Simulate a ledger deposit event in Sandbox.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>SandboxTransferLedgerDepositSimulateRequest</code> | Yes | Request to simulate a ledger deposit event in Sandbox. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `SandboxTransferLedgerDepositSimulateResponse|error`

**Sample code:**

```ballerina
plaid:SandboxTransferLedgerDepositSimulateResponse result = check plaidClient->sandboxTransferLedgerDepositSimulate({
    eventType: "sweep.posted",
    sweepId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    failureReason: {
        failure_code: "200",
        ach_return_code: "200",
        description: "Sample description"
    }
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>sandboxTransferLedgerWithdrawSimulate</summary>

<div>

Simulate a ledger withdraw event in Sandbox.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>SandboxTransferLedgerWithdrawSimulateRequest</code> | Yes | Request to simulate a ledger withdraw event in Sandbox. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `SandboxTransferLedgerWithdrawSimulateResponse|error`

**Sample code:**

```ballerina
plaid:SandboxTransferLedgerWithdrawSimulateResponse result = check plaidClient->sandboxTransferLedgerWithdrawSimulate({
    eventType: "sweep.posted",
    sweepId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    failureReason: {
        failure_code: "200",
        ach_return_code: "200",
        description: "Sample description"
    }
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>sandboxTransferRepaymentSimulate</summary>

<div>

Trigger the creation of a repayment.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>SandboxTransferRepaymentSimulateRequest</code> | Yes | Request to trigger the creation of a repayment. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `SandboxTransferRepaymentSimulateResponse|error`

**Sample code:**

```ballerina
plaid:SandboxTransferRepaymentSimulateResponse result = check plaidClient->sandboxTransferRepaymentSimulate({
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>sandboxTransferFireWebhook</summary>

<div>

Manually fire a Transfer webhook.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>SandboxTransferFireWebhookRequest</code> | Yes | Request to manually fire a Transfer webhook. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `SandboxTransferFireWebhookResponse|error`

**Sample code:**

```ballerina
plaid:SandboxTransferFireWebhookResponse result = check plaidClient->sandboxTransferFireWebhook({
    webhook: "string",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>sandboxTransferTestClockCreate</summary>

<div>

Create a test clock.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>SandboxTransferTestClockCreateRequest</code> | Yes | Request to create a test clock. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `SandboxTransferTestClockCreateResponse|error`

**Sample code:**

```ballerina
plaid:SandboxTransferTestClockCreateResponse result = check plaidClient->sandboxTransferTestClockCreate({
    virtualTime: "string",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "test_clock": {
    "test_clock_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "virtual_time": "string"
  },
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>sandboxTransferTestClockAdvance</summary>

<div>

Advance a test clock.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>SandboxTransferTestClockAdvanceRequest</code> | Yes | Request to advance a test clock. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `SandboxTransferTestClockAdvanceResponse|error`

**Sample code:**

```ballerina
plaid:SandboxTransferTestClockAdvanceResponse result = check plaidClient->sandboxTransferTestClockAdvance({
    testClockId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    newVirtualTime: "string",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>sandboxTransferTestClockGet</summary>

<div>

Get a test clock.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>SandboxTransferTestClockGetRequest</code> | Yes | Request to get a test clock. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `SandboxTransferTestClockGetResponse|error`

**Sample code:**

```ballerina
plaid:SandboxTransferTestClockGetResponse result = check plaidClient->sandboxTransferTestClockGet({
    testClockId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "test_clock": {
    "test_clock_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "virtual_time": "string"
  },
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>sandboxTransferTestClockList</summary>

<div>

List test clocks.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>SandboxTransferTestClockListRequest</code> | Yes | Request to list test clocks. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `SandboxTransferTestClockListResponse|error`

**Sample code:**

```ballerina
plaid:SandboxTransferTestClockListResponse result = check plaidClient->sandboxTransferTestClockList({
    offset: 1,
    count: 1,
    secret: "string",
    endVirtualTime: "string"
});
```

**Sample response:**

```json
{
  "test_clocks": [
    {
      "test_clock_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "virtual_time": "string"
    }
  ],
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>sandboxPaymentProfileResetLogin</summary>

<div>

**Deprecated.** Reset the login of a Payment Profile.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>SandboxPaymentProfileResetLoginRequest</code> | Yes | Request to reset the login of a Payment Profile. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `SandboxPaymentProfileResetLoginResponse|error`

**Sample code:**

```ballerina
plaid:SandboxPaymentProfileResetLoginResponse result = check plaidClient->sandboxPaymentProfileResetLogin({
    paymentProfileToken: "string",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "reset_login": false,
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>sandboxPaymentSimulate</summary>

<div>

Simulate a payment event in Sandbox.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>SandboxPaymentSimulateRequest</code> | Yes | Request to simulate a payment event in Sandbox. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `SandboxPaymentSimulateResponse|error`

**Sample code:**

```ballerina
plaid:SandboxPaymentSimulateResponse result = check plaidClient->sandboxPaymentSimulate({
    webhook: "string",
    paymentId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    status: "string",
    secret: "string"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "old_status": "PAYMENT_STATUS_INPUT_NEEDED",
  "new_status": "PAYMENT_STATUS_INPUT_NEEDED"
}
```

</div>
</details>

<details>
<summary>sandboxBankTransferFireWebhook</summary>

<div>

**Deprecated.** (Deprecated) Manually fire a Bank Transfer webhook.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>SandboxBankTransferFireWebhookRequest</code> | Yes | Request to manually fire a Bank Transfer webhook. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `SandboxBankTransferFireWebhookResponse|error`

**Sample code:**

```ballerina
plaid:SandboxBankTransferFireWebhookResponse result = check plaidClient->sandboxBankTransferFireWebhook({
    webhook: "string",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>sandboxIncomeFireWebhook</summary>

<div>

Manually fire an Income webhook.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>SandboxIncomeFireWebhookRequest</code> | Yes | Request to manually fire an Income webhook. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `SandboxIncomeFireWebhookResponse|error`

**Sample code:**

```ballerina
plaid:SandboxIncomeFireWebhookResponse result = check plaidClient->sandboxIncomeFireWebhook({
    webhook: "string",
    itemId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    webhookCode: "INCOME_VERIFICATION",
    userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>sandboxBankIncomeFireWebhook</summary>

<div>

**Deprecated.** (Deprecated) Manually fire a Bank Income webhook in Sandbox.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>SandboxBankIncomeFireWebhookRequest</code> | Yes | Request to manually fire a Bank Income webhook in Sandbox. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `SandboxBankIncomeFireWebhookResponse|error`

**Sample code:**

```ballerina
plaid:SandboxBankIncomeFireWebhookResponse result = check plaidClient->sandboxBankIncomeFireWebhook({
    webhookFields: {
        userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        bankIncomeRefreshCompleteResult: "SUCCESS"
    },
    webhookCode: "BANK_INCOME_REFRESH_UPDATE",
    secret: "string",
    webhookOverride: "string"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>sandboxCraCashflowUpdatesUpdate</summary>

<div>

Trigger an update for Cash Flow Updates.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>SandboxCraCashflowUpdatesUpdateRequest</code> | Yes | Request to trigger an update for Cash Flow Updates. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `SandboxCraCashflowUpdatesUpdateResponse|error`

**Sample code:**

```ballerina
plaid:SandboxCraCashflowUpdatesUpdateResponse result = check plaidClient->sandboxCraCashflowUpdatesUpdate({
    webhookCodes: ["LARGE_DEPOSIT_DETECTED"],
    userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    userToken: "string"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>sandboxCraServicingSimulate</summary>

<div>

Simulate a CRA Servicing report.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>SandboxCraServicingSimulateRequest</code> | Yes | Request to simulate a CRA Servicing report. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `SandboxCraServicingSimulateResponse|error`

**Sample code:**

```ballerina
plaid:SandboxCraServicingSimulateResponse result = check plaidClient->sandboxCraServicingSimulate({
    subscriptionId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    options: {
        errorWebhookCode: "USER_NOT_FOUND",
        transactionsEndDate: "2026-01-15T00:00:00"
    },
    secret: "string"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "report_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>sandboxOauthSelectAccounts</summary>

<div>

Save the selected accounts when connecting to the Platypus OAuth institution.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>SandboxOauthSelectAccountsRequest</code> | Yes | Request to save the selected accounts when connecting to the Platypus OAuth institution. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `SandboxOauthSelectAccountsResponse|error`

**Sample code:**

```ballerina
plaid:SandboxOauthSelectAccountsResponse result = check plaidClient->sandboxOauthSelectAccounts({
    accounts: ["string"],
    oauthStateId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{}
```

</div>
</details>

#### Cashflow reports

<details>
<summary>cashflowReportRefresh</summary>

<div>

Refresh transaction data in `cashflow_report`.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CashflowReportRefreshRequest</code> | Yes | Request to refresh transaction data in `cashflow_report`. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CashflowReportRefreshResponse|error`

**Sample code:**

```ballerina
plaid:CashflowReportRefreshResponse result = check plaidClient->cashflowReportRefresh({
    accessToken: "string",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    daysRequested: 1
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>cashflowReportGet</summary>

<div>

Get the transaction data in a cash flow report.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CashflowReportGetRequest</code> | Yes | Request to get transaction data in `cashflow_report`. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CashflowReportGetResponse|error`

**Sample code:**

```ballerina
plaid:CashflowReportGetResponse result = check plaidClient->cashflowReportGet({
    accessToken: "string",
    daysRequested: 1,
    cursor: "string",
    count: 1
});
```

**Sample response:**

```json
{
  "accounts": [
    {
      "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "balances": {
        "available": 100.00,
        "current": 100.00,
        "limit": 100.00,
        "iso_currency_code": "200",
        "unofficial_currency_code": "200"
      },
      "mask": "string",
      "name": "Sample name",
      "official_name": "Sample name",
      "type": "investment",
      "subtype": "401a"
    }
  ],
  "transactions": [
    {
      "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "amount": 100.00,
      "iso_currency_code": "200",
      "unofficial_currency_code": "200",
      "date": "2026-01-15T00:00:00",
      "location": {
        "address": "string",
        "city": "string",
        "region": "string",
        "postal_code": "200",
        "country": "string",
        "lat": 100.00,
        "lon": 100.00,
        "store_number": "INV-0001"
      },
      "name": "Sample name",
      "payment_meta": {
        "reference_number": "INV-0001",
        "ppd_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "payee": "string",
        "by_order_of": "string",
        "payer": "string",
        "payment_method": "string",
        "payment_processor": "string",
        "reason": "string"
      },
      "pending": false,
      "pending_transaction_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "account_owner": "string",
      "transaction_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "authorized_date": "2026-01-15T00:00:00",
      "authorized_datetime": "2026-01-15T00:00:00",
      "datetime": "2026-01-15T00:00:00",
      "payment_channel": "online",
      "transaction_code": "adjustment"
    }
  ],
  "total_transactions": 1,
  "item": {
    "item_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "webhook": "string",
    "error": {
      "error_type": "INVALID_REQUEST",
      "error_code": "200",
      "error_message": "string",
      "display_message": "string"
    },
    "available_products": [
      "assets"
    ],
    "billed_products": [
      "assets"
    ],
    "consent_expiration_time": "string",
    "update_type": "background"
  },
  "next_cursor": "string",
  "has_more": false,
  "last_successful_update_time": "2026-01-15T00:00:00",
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>cashflowReportTransactionsGet</summary>

<div>

Get the transactions of a cash flow report.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CashflowReportTransactionsGetRequest</code> | Yes | Request to get transaction data in `cashflow_report`. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CashflowReportTransactionsGetResponse|error`

**Sample code:**

```ballerina
plaid:CashflowReportTransactionsGetResponse result = check plaidClient->cashflowReportTransactionsGet({
    accessToken: "string",
    cursor: "string",
    count: 1,
    options: {
        accountIds: ["3fa85f64-5717-4562-b3fc-2c963f66afa6"]
    }
});
```

**Sample response:**

```json
{
  "accounts": [
    {
      "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "balances": {
        "available": 100.00,
        "current": 100.00,
        "limit": 100.00,
        "iso_currency_code": "200",
        "unofficial_currency_code": "200"
      },
      "mask": "string",
      "name": "Sample name",
      "official_name": "Sample name",
      "type": "investment",
      "subtype": "401a"
    }
  ],
  "transactions": [
    {
      "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "amount": 100.00,
      "iso_currency_code": "200",
      "unofficial_currency_code": "200",
      "date": "2026-01-15T00:00:00",
      "location": {
        "address": "string",
        "city": "string",
        "region": "string",
        "postal_code": "200",
        "country": "string",
        "lat": 100.00,
        "lon": 100.00,
        "store_number": "INV-0001"
      },
      "name": "Sample name",
      "payment_meta": {
        "reference_number": "INV-0001",
        "ppd_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "payee": "string",
        "by_order_of": "string",
        "payer": "string",
        "payment_method": "string",
        "payment_processor": "string",
        "reason": "string"
      },
      "pending": false,
      "pending_transaction_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "account_owner": "string",
      "transaction_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "authorized_date": "2026-01-15T00:00:00",
      "authorized_datetime": "2026-01-15T00:00:00",
      "datetime": "2026-01-15T00:00:00",
      "payment_channel": "online",
      "transaction_code": "adjustment"
    }
  ],
  "total_transactions": 1,
  "item": {
    "item_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "webhook": "string",
    "error": {
      "error_type": "INVALID_REQUEST",
      "error_code": "200",
      "error_message": "string",
      "display_message": "string"
    },
    "available_products": [
      "assets"
    ],
    "billed_products": [
      "assets"
    ],
    "consent_expiration_time": "string",
    "update_type": "background"
  },
  "next_cursor": "string",
  "has_more": false,
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>cashflowReportInsightsGet</summary>

<div>

Gets insights data in Cashflow Report.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CashflowReportInsightsGetRequest</code> | Yes | Request to get insights data in Cashflow Report. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CashflowReportInsightsGetResponse|error`

**Sample code:**

```ballerina
plaid:CashflowReportInsightsGetResponse result = check plaidClient->cashflowReportInsightsGet({
    accessToken: "string",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "item": {
    "item_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "webhook": "string",
    "error": {
      "error_type": "INVALID_REQUEST",
      "error_code": "200",
      "error_message": "string",
      "display_message": "string"
    },
    "available_products": [
      "assets"
    ],
    "billed_products": [
      "assets"
    ],
    "consent_expiration_time": "string",
    "update_type": "background"
  },
  "accounts": [
    {
      "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "balances": {
        "available": 100.00,
        "current": 100.00,
        "limit": 100.00,
        "iso_currency_code": "200",
        "unofficial_currency_code": "200"
      },
      "mask": "string",
      "name": "Sample name",
      "official_name": "Sample name",
      "type": "investment",
      "subtype": "401a"
    }
  ],
  "account_insights": {
    "historical_balances": [
      {
        "date": "2026-01-15T00:00:00",
        "amount": 100.00,
        "iso_currency_code": "200",
        "unofficial_currency_code": "200"
      }
    ],
    "monthly_summaries": [
      {
        "start_date": "2026-01-15T00:00:00",
        "end_date": "2026-01-15T00:00:00",
        "starting_balance": {
          "unofficial_currency_code": "200",
          "amount": 100.00,
          "iso_currency_code": "200"
        },
        "ending_balance": {
          "unofficial_currency_code": "200",
          "amount": 100.00,
          "iso_currency_code": "200"
        },
        "average_daily_ending_balance": {
          "unofficial_currency_code": "200",
          "amount": 100.00,
          "iso_currency_code": "200"
        },
        "average_daily_inflow_amount": {
          "unofficial_currency_code": "200",
          "amount": 100.00,
          "iso_currency_code": "200"
        },
        "average_daily_outflow_amount": {
          "unofficial_currency_code": "200",
          "amount": 100.00,
          "iso_currency_code": "200"
        },
        "average_daily_net_cashflow_amount": {
          "unofficial_currency_code": "200",
          "amount": 100.00,
          "iso_currency_code": "200"
        },
        "average_daily_inflow_transaction_count": 100.00,
        "average_daily_outflow_transaction_count": 100.00,
        "total_revenue": {
          "unofficial_currency_code": "200",
          "amount": 100.00,
          "iso_currency_code": "200"
        },
        "total_loan_payment": {
          "unofficial_currency_code": "200",
          "amount": 100.00,
          "iso_currency_code": "200"
        },
        "total_variable_expense": {
          "unofficial_currency_code": "200",
          "amount": 100.00,
          "iso_currency_code": "200"
        },
        "total_payroll": {
          "unofficial_currency_code": "200",
          "amount": 100.00,
          "iso_currency_code": "200"
        },
        "nsf_transaction_count": 1,
        "overdraft_transaction_count": 1,
        "negative_ending_balance_day_count": 1
      }
    ]
  },
  "last_generated_time": "string",
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

#### User

<details>
<summary>userTransactionsRefresh</summary>

<div>

Refresh user items for Transactions bundle.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>UserTransactionsRefreshRequest</code> | Yes | Request to refresh user items for Transactions bundle. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `UserTransactionsRefreshResponse|error`

**Sample code:**

```ballerina
plaid:UserTransactionsRefreshResponse result = check plaidClient->userTransactionsRefresh({
    userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "results": [
    {
      "item_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "product": "string",
      "error": {
        "error_type": "INVALID_REQUEST",
        "error_code": "200",
        "error_message": "string",
        "display_message": "string"
      }
    }
  ]
}
```

</div>
</details>

<details>
<summary>userFinancialDataRefresh</summary>

<div>

Refresh user items for Financial-Insights bundle.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>UserFinancialDataRefreshRequest</code> | Yes | Request to refresh user items for Financial-Insights bundle. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `UserFinancialDataRefreshResponse|error`

**Sample code:**

```ballerina
plaid:UserFinancialDataRefreshResponse result = check plaidClient->userFinancialDataRefresh({
    userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "results": [
    {
      "item_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "product": "string",
      "error": {
        "error_type": "INVALID_REQUEST",
        "error_code": "200",
        "error_message": "string",
        "display_message": "string"
      }
    }
  ]
}
```

</div>
</details>

<details>
<summary>userCreate</summary>

<div>

Create user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>UserCreateRequest</code> | Yes | Request to create user. |
| `headers` | <code>UserCreateHeaders</code> | No | Request headers. Optional fields: `plaidNewUserAPIEnabled`. Defaults to `{}`. |

**Returns:** `UserCreateResponse|error`

**Sample code:**

```ballerina
plaid:UserCreateResponse result = check plaidClient->userCreate({
    clientUserId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    endCustomer: "string",
    identity: {
        name: {
            givenName: "Sample name",
            familyName: "Sample name"
        },
        date_of_birth: "2026-01-15T00:00:00",
        emails: [{
            data: "string",
            primary: false
        }]
    },
    consumerReportUserIdentity: {
        first_name: "Sample name",
        last_name: "Sample name",
        phone_numbers: ["INV-0001"],
        emails: ["user@example.com"],
        date_of_birth: "2026-01-15T00:00:00",
        primary_address: {
            city: "string",
            region: "string",
            street: "string",
            postal_code: "200",
            country: "string"
        }
    }
});
```

**Sample response:**

```json
{
  "user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "user_token": "string"
}
```

</div>
</details>

<details>
<summary>userGet</summary>

<div>

Retrieve user identity and information.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>UserGetRequest</code> | Yes | Request to retrieve user identity and information. |
| `headers` | <code>UserGetHeaders</code> | No | Request headers. Optional fields: `plaidNewUserAPIEnabled`. Defaults to `{}`. |

**Returns:** `UserGetResponse|error`

**Sample code:**

```ballerina
plaid:UserGetResponse result = check plaidClient->userGet({
    userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "client_user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "created_at": "string",
  "updated_at": "2026-01-15T00:00:00",
  "identity": {
    "name": {
      "given_name": "Sample name",
      "family_name": "Sample name"
    },
    "date_of_birth": "2026-01-15T00:00:00",
    "emails": [
      {
        "data": "string",
        "primary": false
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>userIdentityRemove</summary>

<div>

Remove user identity data.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>UserIdentityRemoveRequest</code> | Yes | Request to remove user identity data. |
| `headers` | <code>UserIdentityRemoveHeaders</code> | No | Request headers. Optional fields: `plaidNewUserAPIEnabled`. Defaults to `{}`. |

**Returns:** `UserIdentityRemoveResponse|error`

**Sample code:**

```ballerina
plaid:UserIdentityRemoveResponse result = check plaidClient->userIdentityRemove({
    userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>userUpdate</summary>

<div>

Update user information.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>UserUpdateRequest</code> | Yes | Request to update user information. |
| `headers` | <code>UserUpdateHeaders</code> | No | Request headers. Optional fields: `plaidNewUserAPIEnabled`. Defaults to `{}`. |

**Returns:** `UserUpdateResponse|error`

**Sample code:**

```ballerina
plaid:UserUpdateResponse result = check plaidClient->userUpdate({
    userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    identity: {
        name: {
            givenName: "Sample name",
            familyName: "Sample name"
        },
        date_of_birth: "2026-01-15T00:00:00",
        emails: [{
            data: "string",
            primary: false
        }]
    },
    consumerReportUserIdentity: {
        first_name: "Sample name",
        last_name: "Sample name",
        phone_numbers: ["INV-0001"],
        emails: ["user@example.com"],
        date_of_birth: "2026-01-15T00:00:00",
        primary_address: {
            city: "string",
            region: "string",
            street: "string",
            postal_code: "200",
            country: "string"
        }
    },
    secret: "string"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>userRemove</summary>

<div>

Remove user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>UserRemoveRequest</code> | Yes | Request to remove user. |
| `headers` | <code>UserRemoveHeaders</code> | No | Request headers. Optional fields: `plaidNewUserAPIEnabled`. Defaults to `{}`. |

**Returns:** `UserRemoveResponse|error`

**Sample code:**

```ballerina
plaid:UserRemoveResponse result = check plaidClient->userRemove({
    userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    userToken: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>userProductsTerminate</summary>

<div>

Terminate user-based products.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>UserProductsTerminateRequest</code> | Yes | Request to terminate user-based products. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `UserProductsTerminateResponse|error`

**Sample code:**

```ballerina
plaid:UserProductsTerminateResponse result = check plaidClient->userProductsTerminate({
    reasonCode: "FRAUD_FIRST_PARTY",
    userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    reasonNote: "string",
    secret: "string"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>userItemsGet</summary>

<div>

Get Items associated with a User.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>UserItemsGetRequest</code> | Yes | Request to get Items associated with a User. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `UserItemsGetResponse|error`

**Sample code:**

```ballerina
plaid:UserItemsGetResponse result = check plaidClient->userItemsGet({
    userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    userToken: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "items": [
    {
      "item_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "webhook": "string",
      "error": {
        "error_type": "INVALID_REQUEST",
        "error_code": "200",
        "error_message": "string",
        "display_message": "string"
      },
      "available_products": [
        "assets"
      ],
      "billed_products": [
        "assets"
      ],
      "consent_expiration_time": "string",
      "update_type": "background"
    }
  ],
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>userItemsAssociate</summary>

<div>

Associate Items to a User.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>UserItemsAssociateRequest</code> | Yes | Request to associate Items to a User. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `UserItemsAssociateResponse|error`

**Sample code:**

```ballerina
plaid:UserItemsAssociateResponse result = check plaidClient->userItemsAssociate({
    userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    itemIds: ["3fa85f64-5717-4562-b3fc-2c963f66afa6"],
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>userItemsRemove</summary>

<div>

Remove Items from a User.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>UserItemsRemoveRequest</code> | Yes | Request to remove Items from a User. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `UserItemsRemoveResponse|error`

**Sample code:**

```ballerina
plaid:UserItemsRemoveResponse result = check plaidClient->userItemsRemove({
    itemIds: ["3fa85f64-5717-4562-b3fc-2c963f66afa6"],
    userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    userToken: "string"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>userThirdPartyTokenCreate</summary>

<div>

Create a third-party user token.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>UserThirdPartyTokenCreateRequest</code> | Yes | Request to create a third-party user token. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `UserThirdPartyTokenCreateResponse|error`

**Sample code:**

```ballerina
plaid:UserThirdPartyTokenCreateResponse result = check plaidClient->userThirdPartyTokenCreate({
    thirdPartyClientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    expirationTime: "string",
    secret: "string"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "third_party_user_token": "string"
}
```

</div>
</details>

<details>
<summary>userThirdPartyTokenRemove</summary>

<div>

Remove a third-party user token.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>UserThirdPartyTokenRemoveRequest</code> | Yes | Request to remove a third-party user token. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `UserThirdPartyTokenRemoveResponse|error`

**Sample code:**

```ballerina
plaid:UserThirdPartyTokenRemoveResponse result = check plaidClient->userThirdPartyTokenRemove({
    thirdPartyUserToken: "string",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "removed": false,
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

#### Institutions

<details>
<summary>institutionsGet</summary>

<div>

Get details of all supported institutions.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>InstitutionsGetRequest</code> | Yes | Request to get details of all supported institutions. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `InstitutionsGetResponse|error`

**Sample code:**

```ballerina
plaid:InstitutionsGetResponse result = check plaidClient->institutionsGet({
    offset: 1,
    count: 1,
    countryCodes: ["US"],
    options: {
        includeOptionalMetadata: false,
        routingNumbers: ["INV-0001"],
        includePaymentInitiationMetadata: false
    }
});
```

**Sample response:**

```json
{
  "institutions": [
    {
      "institution_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "name": "Sample name",
      "products": [
        "assets"
      ],
      "country_codes": [
        "US"
      ],
      "routing_numbers": [
        "INV-0001"
      ],
      "oauth": false
    }
  ],
  "total": 1,
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>institutionsSearch</summary>

<div>

Search institutions.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>InstitutionsSearchRequest</code> | Yes | Request to search institutions. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `InstitutionsSearchResponse|error`

**Sample code:**

```ballerina
plaid:InstitutionsSearchResponse result = check plaidClient->institutionsSearch({
    query: "string",
    countryCodes: ["US"],
    options: {
        includeOptionalMetadata: false,
        includePaymentInitiationMetadata: false,
        oauth: false
    },
    secret: "string"
});
```

**Sample response:**

```json
{
  "institutions": [
    {
      "institution_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "name": "Sample name",
      "products": [
        "assets"
      ],
      "country_codes": [
        "US"
      ],
      "routing_numbers": [
        "INV-0001"
      ],
      "oauth": false
    }
  ],
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>institutionsGetById</summary>

<div>

Get details of an institution.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>InstitutionsGetByIdRequest</code> | Yes | Request to get details of an institution. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `InstitutionsGetByIdResponse|error`

**Sample code:**

```ballerina
plaid:InstitutionsGetByIdResponse result = check plaidClient->institutionsGetById({
    countryCodes: ["US"],
    institutionId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    options: {
        includeOptionalMetadata: false,
        includePaymentInitiationMetadata: false,
        includeStatus: false
    },
    secret: "string"
});
```

**Sample response:**

```json
{
  "institution": {
    "institution_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "name": "Sample name",
    "products": [
      "assets"
    ],
    "country_codes": [
      "US"
    ],
    "routing_numbers": [
      "INV-0001"
    ],
    "oauth": false
  },
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

#### Accounts

<details>
<summary>accountsGet</summary>

<div>

Retrieve accounts.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>AccountsGetRequest</code> | Yes | Request to retrieve accounts. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `AccountsGetResponse|error`

**Sample code:**

```ballerina
plaid:AccountsGetResponse result = check plaidClient->accountsGet({
    accessToken: "string",
    options: {
        accountIds: ["3fa85f64-5717-4562-b3fc-2c963f66afa6"]
    },
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "accounts": [
    {
      "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "balances": {
        "available": 100.00,
        "current": 100.00,
        "limit": 100.00,
        "iso_currency_code": "200",
        "unofficial_currency_code": "200"
      },
      "mask": "string",
      "name": "Sample name",
      "official_name": "Sample name",
      "type": "investment",
      "subtype": "401a"
    }
  ],
  "item": {
    "item_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "webhook": "string",
    "error": {
      "error_type": "INVALID_REQUEST",
      "error_code": "200",
      "error_message": "string",
      "display_message": "string"
    },
    "available_products": [
      "assets"
    ],
    "billed_products": [
      "assets"
    ],
    "consent_expiration_time": "string",
    "update_type": "background"
  },
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

#### Categories

<details>
<summary>categoriesGet</summary>

<div>

**Deprecated.** (Deprecated) Get legacy categories.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CategoriesGetRequest</code> | Yes | Request to get legacy categories. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CategoriesGetResponse|error`

**Sample code:**

```ballerina
plaid:CategoriesGetResponse result = check plaidClient->categoriesGet({});
```

**Sample response:**

```json
{
  "categories": [
    {
      "category_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "group": "string",
      "hierarchy": [
        "string"
      ]
    }
  ],
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

#### Balance

<details>
<summary>accountsBalanceGet</summary>

<div>

Retrieve real-time balance data.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>AccountsBalanceGetRequest</code> | Yes | Request to retrieve real-time balance data. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `AccountsGetResponse|error`

**Sample code:**

```ballerina
plaid:AccountsGetResponse result = check plaidClient->accountsBalanceGet({
    accessToken: "string",
    options: {
        accountIds: ["3fa85f64-5717-4562-b3fc-2c963f66afa6"],
        minLastUpdatedDatetime: "2026-01-15T00:00:00"
    },
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "accounts": [
    {
      "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "balances": {
        "available": 100.00,
        "current": 100.00,
        "limit": 100.00,
        "iso_currency_code": "200",
        "unofficial_currency_code": "200"
      },
      "mask": "string",
      "name": "Sample name",
      "official_name": "Sample name",
      "type": "investment",
      "subtype": "401a"
    }
  ],
  "item": {
    "item_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "webhook": "string",
    "error": {
      "error_type": "INVALID_REQUEST",
      "error_code": "200",
      "error_message": "string",
      "display_message": "string"
    },
    "available_products": [
      "assets"
    ],
    "billed_products": [
      "assets"
    ],
    "consent_expiration_time": "string",
    "update_type": "background"
  },
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

#### Identity

<details>
<summary>identityGet</summary>

<div>

Retrieve identity data.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>IdentityGetRequest</code> | Yes | Request to retrieve identity data. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `IdentityGetResponse|error`

**Sample code:**

```ballerina
plaid:IdentityGetResponse result = check plaidClient->identityGet({
    accessToken: "string",
    options: {
        accountIds: ["3fa85f64-5717-4562-b3fc-2c963f66afa6"]
    },
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "accounts": [
    {
      "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "balances": {
        "available": 100.00,
        "current": 100.00,
        "limit": 100.00,
        "iso_currency_code": "200",
        "unofficial_currency_code": "200"
      },
      "mask": "string",
      "name": "Sample name",
      "official_name": "Sample name",
      "type": "investment",
      "subtype": "401a",
      "owners": [
        {
          "names": [
            "string"
          ],
          "phone_numbers": [
            {
              "data": "string",
              "primary": false,
              "type": "home"
            }
          ],
          "emails": [
            {
              "data": "string",
              "primary": false,
              "type": "primary"
            }
          ],
          "addresses": [
            {
              "data": {
                "city": "string",
                "region": "string",
                "street": "string",
                "postal_code": "200",
                "country": "string"
              }
            }
          ]
        }
      ]
    }
  ],
  "item": {
    "item_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "webhook": "string",
    "error": {
      "error_type": "INVALID_REQUEST",
      "error_code": "200",
      "error_message": "string",
      "display_message": "string"
    },
    "available_products": [
      "assets"
    ],
    "billed_products": [
      "assets"
    ],
    "consent_expiration_time": "string",
    "update_type": "background"
  },
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>identityDocumentsUploadsGet</summary>

<div>

Returns uploaded document identity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>IdentityDocumentsUploadsGetRequest</code> | Yes | Request to return uploaded document identity. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `IdentityDocumentsUploadsGetResponse|error`

**Sample code:**

```ballerina
plaid:IdentityDocumentsUploadsGetResponse result = check plaidClient->identityDocumentsUploadsGet({
    access_token: "string",
    client_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    options: {
        accountIds: ["3fa85f64-5717-4562-b3fc-2c963f66afa6"]
    }
});
```

**Sample response:**

```json
{
  "accounts": [
    {
      "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "balances": {
        "available": 100.00,
        "current": 100.00,
        "limit": 100.00,
        "iso_currency_code": "200",
        "unofficial_currency_code": "200"
      },
      "mask": "string",
      "name": "Sample name",
      "official_name": "Sample name",
      "type": "investment",
      "subtype": "401a",
      "owners": [
        {
          "names": [
            "string"
          ],
          "phone_numbers": [
            {
              "data": "string",
              "primary": false,
              "type": "home"
            }
          ],
          "emails": [
            {
              "data": "string",
              "primary": false,
              "type": "primary"
            }
          ],
          "addresses": [
            {
              "data": {
                "city": "string",
                "region": "string",
                "street": "string",
                "postal_code": "200",
                "country": "string"
              }
            }
          ]
        }
      ]
    }
  ],
  "item": {
    "item_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "webhook": "string",
    "error": {
      "error_type": "INVALID_REQUEST",
      "error_code": "200",
      "error_message": "string",
      "display_message": "string"
    },
    "available_products": [
      "assets"
    ],
    "billed_products": [
      "assets"
    ],
    "consent_expiration_time": "string",
    "update_type": "background"
  },
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>identityMatch</summary>

<div>

Retrieve identity match score.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>IdentityMatchRequest</code> | Yes | Request to retrieve identity match score. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `IdentityMatchResponse|error`

**Sample code:**

```ballerina
plaid:IdentityMatchResponse result = check plaidClient->identityMatch({
    accessToken: "string",
    options: {
        accountIds: ["3fa85f64-5717-4562-b3fc-2c963f66afa6"]
    },
    secret: "string",
    user: {
        legal_name: "Sample name",
        phone_number: "INV-0001",
        email_address: "user@example.com"
    }
});
```

**Sample response:**

```json
{
  "accounts": [
    {
      "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "balances": {
        "available": 100.00,
        "current": 100.00,
        "limit": 100.00,
        "iso_currency_code": "200",
        "unofficial_currency_code": "200"
      },
      "mask": "string",
      "name": "Sample name",
      "official_name": "Sample name",
      "type": "investment",
      "subtype": "401a",
      "legal_name": {
        "score": 1,
        "is_first_name_or_last_name_match": false,
        "is_nickname_match": false,
        "is_business_name_detected": false
      },
      "phone_number": {
        "score": 1
      },
      "email_address": {
        "score": 1
      },
      "address": {
        "score": 1,
        "is_postal_code_match": false
      }
    }
  ],
  "item": {
    "item_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "webhook": "string",
    "error": {
      "error_type": "INVALID_REQUEST",
      "error_code": "200",
      "error_message": "string",
      "display_message": "string"
    },
    "available_products": [
      "assets"
    ],
    "billed_products": [
      "assets"
    ],
    "consent_expiration_time": "string",
    "update_type": "background"
  },
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>identityMatchList</summary>

<div>

List Link Identity Match attempts.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>IdentityMatchListRequest</code> | Yes | Request to list Link Identity Match attempts. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `IdentityMatchListResponse|error`

**Sample code:**

```ballerina
plaid:IdentityMatchListResponse result = check plaidClient->identityMatchList({
    startTime: "string",
    endTime: "string",
    cursor: "string",
    count: 1
});
```

**Sample response:**

```json
{
  "identity_match_attempts": [
    {
      "attempt_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "item_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "created_at": "string",
      "link_session_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "link_customization_name": "Sample name",
      "ruleset_revision": 1,
      "outcome": "PASS",
      "outcome_account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "scores": [
        {
          "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "legal_name": {
            "score": 1,
            "is_first_name_or_last_name_match": false,
            "is_nickname_match": false,
            "is_business_name_detected": false
          },
          "phone_number": {
            "score": 1
          },
          "email_address": {
            "score": 1
          },
          "address": {
            "score": 1,
            "is_postal_code_match": false
          }
        }
      ]
    }
  ],
  "next_cursor": "string",
  "has_more": false,
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>identityRefresh</summary>

<div>

Refresh identity data.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>IdentityRefreshRequest</code> | Yes | Request to refresh identity data. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `IdentityRefreshResponse|error`

**Sample code:**

```ballerina
plaid:IdentityRefreshResponse result = check plaidClient->identityRefresh({
    accessToken: "string",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

#### Dashboard users

<details>
<summary>dashboardUserGet</summary>

<div>

Retrieve a Dashboard user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>DashboardUserGetRequest</code> | Yes | Request to retrieve a Dashboard user. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `DashboardUserGetResponse|error`

**Sample code:**

```ballerina
plaid:DashboardUserGetResponse result = check plaidClient->dashboardUserGet({
    dashboardUserId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "created_at": "string",
  "email_address": "user@example.com",
  "status": "invited",
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>dashboardUserList</summary>

<div>

List Dashboard users.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>DashboardUserListRequest</code> | Yes | Request to list Dashboard users. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `DashboardUserListResponse|error`

**Sample code:**

```ballerina
plaid:DashboardUserListResponse result = check plaidClient->dashboardUserList({
    cursor: "string",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "dashboard_users": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "created_at": "string",
      "email_address": "user@example.com",
      "status": "invited"
    }
  ],
  "next_cursor": "string",
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

#### Identity verification

<details>
<summary>identityVerificationCreate</summary>

<div>

Create a new Identity Verification.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>IdentityVerificationCreateRequest</code> | Yes | Request to create a new Identity Verification. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `IdentityVerificationCreateResponse|error`

**Sample code:**

```ballerina
plaid:IdentityVerificationCreateResponse result = check plaidClient->identityVerificationCreate({
    gaveConsent: false,
    isShareable: false,
    templateId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    clientUserId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "client_user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "created_at": "string",
  "completed_at": "string",
  "previous_attempt_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "shareable_url": "https://example.com/resource",
  "template": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "version": 1
  },
  "user": {
    "date_of_birth": "2026-01-15T00:00:00",
    "ip_address": "string",
    "email_address": "user@example.com",
    "name": {
      "given_name": "Sample name",
      "family_name": "Sample name"
    },
    "address": {
      "street": "string",
      "street2": "string",
      "city": "string",
      "region": "string",
      "postal_code": "200",
      "country": "string"
    },
    "id_number": {
      "value": "string",
      "type": "ar_dni"
    }
  },
  "status": "active",
  "steps": {
    "accept_tos": "success",
    "verify_sms": "success",
    "kyc_check": "success",
    "documentary_verification": "success",
    "selfie_check": "success",
    "watchlist_screening": "success",
    "risk_check": "success"
  },
  "documentary_verification": {
    "status": "string",
    "documents": [
      {
        "status": "success",
        "attempt": 1,
        "images": {
          "original_front": "string",
          "original_back": "string",
          "cropped_front": "string",
          "cropped_back": "string",
          "face": "string"
        },
        "extracted_data": {
          "id_number": "INV-0001",
          "category": "drivers_license",
          "expiration_date": "2026-01-15T00:00:00",
          "issue_date": "2026-01-15T00:00:00",
          "issuing_country": "string",
          "issuing_region": "string",
          "date_of_birth": "2026-01-15T00:00:00",
          "address": {
            "street": "string",
            "city": "string",
            "region": "string",
            "postal_code": "200",
            "country": "string"
          }
        },
        "analysis": {
          "authenticity": "match",
          "image_quality": "high",
          "extracted_data": {
            "name": "match",
            "date_of_birth": "match",
            "expiration_date": "not_expired",
            "issuing_country": "match"
          },
          "fraud_analysis_details": {
            "type_supported": "success",
            "portrait_presence_check": "success",
            "portrait_details_check": "success",
            "image_composition_check": "success",
            "integrity_check": "success",
            "detail_check": "success",
            "issue_date_check": "success"
          },
          "image_quality_details": {
            "glare_check": "success",
            "dimensions_check": "success",
            "blur_check": "success"
          },
          "aamva_verification": {
            "is_verified": false,
            "id_number": "match",
            "id_issue_date": "match",
            "id_expiration_date": "match",
            "street": "match",
            "city": "match",
            "postal_code": "match",
            "date_of_birth": "match",
            "gender": "match",
            "height": "match",
            "eye_color": "match",
            "first_name": "match",
            "middle_name": "match",
            "last_name": "match"
          }
        },
        "redacted_at": "string"
      }
    ]
  },
  "selfie_check": {
    "status": "success",
    "selfies": [
      {
        "status": "success",
        "attempt": 1,
        "capture": {
          "image_url": "https://example.com/resource",
          "video_url": "https://example.com/resource"
        },
        "analysis": {
          "document_comparison": "match",
          "liveness_check": "success"
        }
      }
    ]
  },
  "kyc_check": {
    "status": "string",
    "address": {
      "summary": "match",
      "po_box": "yes",
      "type": "residential"
    },
    "name": {
      "summary": "match"
    },
    "date_of_birth": {
      "summary": "match"
    },
    "id_number": {
      "summary": "match"
    },
    "phone_number": {
      "summary": "match",
      "area_code": "match"
    }
  },
  "risk_check": {
    "status": "success",
    "behavior": {
      "user_interactions": "genuine",
      "fraud_ring_detected": "yes",
      "bot_detected": "yes"
    },
    "email": {
      "is_deliverable": "yes",
      "breach_count": 1,
      "first_breached_at": "string",
      "last_breached_at": "string",
      "domain_registered_at": "string",
      "domain_is_free_provider": "yes",
      "domain_is_custom": "yes",
      "domain_is_disposable": "yes",
      "top_level_domain_is_suspicious": "yes",
      "is_edu": "yes",
      "includes_date_of_birth": "yes",
      "name": "no_input",
      "linked_services": [
        "aboutme"
      ]
    },
    "phone": {
      "linked_services": [
        "aboutme"
      ]
    },
    "devices": [
      {
        "ip_proxy_type": "none_detected",
        "ip_spam_list_count": 1,
        "ip_timezone_offset": "string"
      }
    ],
    "identity_abuse_signals": {
      "synthetic_identity": {
        "score": 1
      },
      "stolen_identity": {
        "score": 1
      }
    },
    "facial_duplicates": [
      {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "similarity": 1,
        "matched_after_completed": false
      }
    ],
    "trust_index_score": 1
  },
  "verify_sms": {
    "status": "success",
    "verifications": [
      {
        "status": "pending",
        "attempt": 1,
        "phone_number": "INV-0001",
        "delivery_attempt_count": 1,
        "solve_attempt_count": 1,
        "initially_sent_at": "string",
        "last_sent_at": "string",
        "redacted_at": "string"
      }
    ]
  },
  "watchlist_screening_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "beacon_user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "redacted_at": "string",
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>identityVerificationGet</summary>

<div>

Retrieve Identity Verification.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>IdentityVerificationGetRequest</code> | Yes | Request to retrieve Identity Verification. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `IdentityVerificationGetResponse|error`

**Sample code:**

```ballerina
plaid:IdentityVerificationGetResponse result = check plaidClient->identityVerificationGet({
    identityVerificationId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "client_user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "created_at": "string",
  "completed_at": "string",
  "previous_attempt_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "shareable_url": "https://example.com/resource",
  "template": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "version": 1
  },
  "user": {
    "date_of_birth": "2026-01-15T00:00:00",
    "ip_address": "string",
    "email_address": "user@example.com",
    "name": {
      "given_name": "Sample name",
      "family_name": "Sample name"
    },
    "address": {
      "street": "string",
      "street2": "string",
      "city": "string",
      "region": "string",
      "postal_code": "200",
      "country": "string"
    },
    "id_number": {
      "value": "string",
      "type": "ar_dni"
    }
  },
  "status": "active",
  "steps": {
    "accept_tos": "success",
    "verify_sms": "success",
    "kyc_check": "success",
    "documentary_verification": "success",
    "selfie_check": "success",
    "watchlist_screening": "success",
    "risk_check": "success"
  },
  "documentary_verification": {
    "status": "string",
    "documents": [
      {
        "status": "success",
        "attempt": 1,
        "images": {
          "original_front": "string",
          "original_back": "string",
          "cropped_front": "string",
          "cropped_back": "string",
          "face": "string"
        },
        "extracted_data": {
          "id_number": "INV-0001",
          "category": "drivers_license",
          "expiration_date": "2026-01-15T00:00:00",
          "issue_date": "2026-01-15T00:00:00",
          "issuing_country": "string",
          "issuing_region": "string",
          "date_of_birth": "2026-01-15T00:00:00",
          "address": {
            "street": "string",
            "city": "string",
            "region": "string",
            "postal_code": "200",
            "country": "string"
          }
        },
        "analysis": {
          "authenticity": "match",
          "image_quality": "high",
          "extracted_data": {
            "name": "match",
            "date_of_birth": "match",
            "expiration_date": "not_expired",
            "issuing_country": "match"
          },
          "fraud_analysis_details": {
            "type_supported": "success",
            "portrait_presence_check": "success",
            "portrait_details_check": "success",
            "image_composition_check": "success",
            "integrity_check": "success",
            "detail_check": "success",
            "issue_date_check": "success"
          },
          "image_quality_details": {
            "glare_check": "success",
            "dimensions_check": "success",
            "blur_check": "success"
          },
          "aamva_verification": {
            "is_verified": false,
            "id_number": "match",
            "id_issue_date": "match",
            "id_expiration_date": "match",
            "street": "match",
            "city": "match",
            "postal_code": "match",
            "date_of_birth": "match",
            "gender": "match",
            "height": "match",
            "eye_color": "match",
            "first_name": "match",
            "middle_name": "match",
            "last_name": "match"
          }
        },
        "redacted_at": "string"
      }
    ]
  },
  "selfie_check": {
    "status": "success",
    "selfies": [
      {
        "status": "success",
        "attempt": 1,
        "capture": {
          "image_url": "https://example.com/resource",
          "video_url": "https://example.com/resource"
        },
        "analysis": {
          "document_comparison": "match",
          "liveness_check": "success"
        }
      }
    ]
  },
  "kyc_check": {
    "status": "string",
    "address": {
      "summary": "match",
      "po_box": "yes",
      "type": "residential"
    },
    "name": {
      "summary": "match"
    },
    "date_of_birth": {
      "summary": "match"
    },
    "id_number": {
      "summary": "match"
    },
    "phone_number": {
      "summary": "match",
      "area_code": "match"
    }
  },
  "risk_check": {
    "status": "success",
    "behavior": {
      "user_interactions": "genuine",
      "fraud_ring_detected": "yes",
      "bot_detected": "yes"
    },
    "email": {
      "is_deliverable": "yes",
      "breach_count": 1,
      "first_breached_at": "string",
      "last_breached_at": "string",
      "domain_registered_at": "string",
      "domain_is_free_provider": "yes",
      "domain_is_custom": "yes",
      "domain_is_disposable": "yes",
      "top_level_domain_is_suspicious": "yes",
      "is_edu": "yes",
      "includes_date_of_birth": "yes",
      "name": "no_input",
      "linked_services": [
        "aboutme"
      ]
    },
    "phone": {
      "linked_services": [
        "aboutme"
      ]
    },
    "devices": [
      {
        "ip_proxy_type": "none_detected",
        "ip_spam_list_count": 1,
        "ip_timezone_offset": "string"
      }
    ],
    "identity_abuse_signals": {
      "synthetic_identity": {
        "score": 1
      },
      "stolen_identity": {
        "score": 1
      }
    },
    "facial_duplicates": [
      {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "similarity": 1,
        "matched_after_completed": false
      }
    ],
    "trust_index_score": 1
  },
  "verify_sms": {
    "status": "success",
    "verifications": [
      {
        "status": "pending",
        "attempt": 1,
        "phone_number": "INV-0001",
        "delivery_attempt_count": 1,
        "solve_attempt_count": 1,
        "initially_sent_at": "string",
        "last_sent_at": "string",
        "redacted_at": "string"
      }
    ]
  },
  "watchlist_screening_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "beacon_user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "redacted_at": "string",
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>identityVerificationList</summary>

<div>

List Identity Verifications.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>IdentityVerificationListRequest</code> | Yes | Request to list Identity Verifications. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `IdentityVerificationListResponse|error`

**Sample code:**

```ballerina
plaid:IdentityVerificationListResponse result = check plaidClient->identityVerificationList({
    templateId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    cursor: "string",
    clientUserId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "identity_verifications": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "client_user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "created_at": "string",
      "completed_at": "string",
      "previous_attempt_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "shareable_url": "https://example.com/resource",
      "template": {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "version": 1
      },
      "user": {
        "date_of_birth": "2026-01-15T00:00:00",
        "ip_address": "string",
        "email_address": "user@example.com",
        "name": {
          "given_name": "Sample name",
          "family_name": "Sample name"
        },
        "address": {
          "street": "string",
          "street2": "string",
          "city": "string",
          "region": "string",
          "postal_code": "200",
          "country": "string"
        },
        "id_number": {
          "value": "string",
          "type": "ar_dni"
        }
      },
      "status": "active",
      "steps": {
        "accept_tos": "success",
        "verify_sms": "success",
        "kyc_check": "success",
        "documentary_verification": "success",
        "selfie_check": "success",
        "watchlist_screening": "success",
        "risk_check": "success"
      },
      "documentary_verification": {
        "status": "string",
        "documents": [
          {
            "status": "success",
            "attempt": 1,
            "images": {
              "original_front": "string",
              "original_back": "string",
              "cropped_front": "string",
              "cropped_back": "string",
              "face": "string"
            },
            "extracted_data": {
              "id_number": "INV-0001",
              "category": "drivers_license",
              "expiration_date": "2026-01-15T00:00:00",
              "issue_date": "2026-01-15T00:00:00",
              "issuing_country": "string",
              "issuing_region": "string",
              "date_of_birth": "2026-01-15T00:00:00",
              "address": {}
            },
            "analysis": {
              "authenticity": "match",
              "image_quality": "high",
              "extracted_data": {},
              "fraud_analysis_details": {},
              "image_quality_details": {},
              "aamva_verification": {}
            },
            "redacted_at": "string"
          }
        ]
      },
      "selfie_check": {
        "status": "success",
        "selfies": [
          {
            "status": "success",
            "attempt": 1,
            "capture": {
              "image_url": "https://example.com/resource",
              "video_url": "https://example.com/resource"
            },
            "analysis": {
              "document_comparison": "match",
              "liveness_check": "success"
            }
          }
        ]
      },
      "kyc_check": {
        "status": "string",
        "address": {
          "summary": "match",
          "po_box": "yes",
          "type": "residential"
        },
        "name": {
          "summary": "match"
        },
        "date_of_birth": {
          "summary": "match"
        },
        "id_number": {
          "summary": "match"
        },
        "phone_number": {
          "summary": "match",
          "area_code": "match"
        }
      },
      "risk_check": {
        "status": "success",
        "behavior": {
          "user_interactions": "genuine",
          "fraud_ring_detected": "yes",
          "bot_detected": "yes"
        },
        "email": {
          "is_deliverable": "yes",
          "breach_count": 1,
          "first_breached_at": "string",
          "last_breached_at": "string",
          "domain_registered_at": "string",
          "domain_is_free_provider": "yes",
          "domain_is_custom": "yes",
          "domain_is_disposable": "yes",
          "top_level_domain_is_suspicious": "yes",
          "is_edu": "yes",
          "includes_date_of_birth": "yes",
          "name": "no_input",
          "linked_services": [
            "aboutme"
          ]
        },
        "phone": {
          "linked_services": [
            "aboutme"
          ]
        },
        "devices": [
          {
            "ip_proxy_type": "none_detected",
            "ip_spam_list_count": 1,
            "ip_timezone_offset": "string"
          }
        ],
        "identity_abuse_signals": {
          "synthetic_identity": {
            "score": 1
          },
          "stolen_identity": {
            "score": 1
          }
        },
        "facial_duplicates": [
          {
            "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "similarity": 1,
            "matched_after_completed": false
          }
        ],
        "trust_index_score": 1
      },
      "verify_sms": {
        "status": "success",
        "verifications": [
          {
            "status": "pending",
            "attempt": 1,
            "phone_number": "INV-0001",
            "delivery_attempt_count": 1,
            "solve_attempt_count": 1,
            "initially_sent_at": "string",
            "last_sent_at": "string",
            "redacted_at": "string"
          }
        ]
      },
      "watchlist_screening_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "beacon_user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "redacted_at": "string"
    }
  ],
  "next_cursor": "string",
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>identityVerificationRetry</summary>

<div>

Retry an Identity Verification.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>IdentityVerificationRetryRequest</code> | Yes | Request to retry an Identity Verification. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `IdentityVerificationRetryResponse|error`

**Sample code:**

```ballerina
plaid:IdentityVerificationRetryResponse result = check plaidClient->identityVerificationRetry({
    clientUserId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    templateId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    strategy: "reset",
    isShareable: false
});
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "client_user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "created_at": "string",
  "completed_at": "string",
  "previous_attempt_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "shareable_url": "https://example.com/resource",
  "template": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "version": 1
  },
  "user": {
    "date_of_birth": "2026-01-15T00:00:00",
    "ip_address": "string",
    "email_address": "user@example.com",
    "name": {
      "given_name": "Sample name",
      "family_name": "Sample name"
    },
    "address": {
      "street": "string",
      "street2": "string",
      "city": "string",
      "region": "string",
      "postal_code": "200",
      "country": "string"
    },
    "id_number": {
      "value": "string",
      "type": "ar_dni"
    }
  },
  "status": "active",
  "steps": {
    "accept_tos": "success",
    "verify_sms": "success",
    "kyc_check": "success",
    "documentary_verification": "success",
    "selfie_check": "success",
    "watchlist_screening": "success",
    "risk_check": "success"
  },
  "documentary_verification": {
    "status": "string",
    "documents": [
      {
        "status": "success",
        "attempt": 1,
        "images": {
          "original_front": "string",
          "original_back": "string",
          "cropped_front": "string",
          "cropped_back": "string",
          "face": "string"
        },
        "extracted_data": {
          "id_number": "INV-0001",
          "category": "drivers_license",
          "expiration_date": "2026-01-15T00:00:00",
          "issue_date": "2026-01-15T00:00:00",
          "issuing_country": "string",
          "issuing_region": "string",
          "date_of_birth": "2026-01-15T00:00:00",
          "address": {
            "street": "string",
            "city": "string",
            "region": "string",
            "postal_code": "200",
            "country": "string"
          }
        },
        "analysis": {
          "authenticity": "match",
          "image_quality": "high",
          "extracted_data": {
            "name": "match",
            "date_of_birth": "match",
            "expiration_date": "not_expired",
            "issuing_country": "match"
          },
          "fraud_analysis_details": {
            "type_supported": "success",
            "portrait_presence_check": "success",
            "portrait_details_check": "success",
            "image_composition_check": "success",
            "integrity_check": "success",
            "detail_check": "success",
            "issue_date_check": "success"
          },
          "image_quality_details": {
            "glare_check": "success",
            "dimensions_check": "success",
            "blur_check": "success"
          },
          "aamva_verification": {
            "is_verified": false,
            "id_number": "match",
            "id_issue_date": "match",
            "id_expiration_date": "match",
            "street": "match",
            "city": "match",
            "postal_code": "match",
            "date_of_birth": "match",
            "gender": "match",
            "height": "match",
            "eye_color": "match",
            "first_name": "match",
            "middle_name": "match",
            "last_name": "match"
          }
        },
        "redacted_at": "string"
      }
    ]
  },
  "selfie_check": {
    "status": "success",
    "selfies": [
      {
        "status": "success",
        "attempt": 1,
        "capture": {
          "image_url": "https://example.com/resource",
          "video_url": "https://example.com/resource"
        },
        "analysis": {
          "document_comparison": "match",
          "liveness_check": "success"
        }
      }
    ]
  },
  "kyc_check": {
    "status": "string",
    "address": {
      "summary": "match",
      "po_box": "yes",
      "type": "residential"
    },
    "name": {
      "summary": "match"
    },
    "date_of_birth": {
      "summary": "match"
    },
    "id_number": {
      "summary": "match"
    },
    "phone_number": {
      "summary": "match",
      "area_code": "match"
    }
  },
  "risk_check": {
    "status": "success",
    "behavior": {
      "user_interactions": "genuine",
      "fraud_ring_detected": "yes",
      "bot_detected": "yes"
    },
    "email": {
      "is_deliverable": "yes",
      "breach_count": 1,
      "first_breached_at": "string",
      "last_breached_at": "string",
      "domain_registered_at": "string",
      "domain_is_free_provider": "yes",
      "domain_is_custom": "yes",
      "domain_is_disposable": "yes",
      "top_level_domain_is_suspicious": "yes",
      "is_edu": "yes",
      "includes_date_of_birth": "yes",
      "name": "no_input",
      "linked_services": [
        "aboutme"
      ]
    },
    "phone": {
      "linked_services": [
        "aboutme"
      ]
    },
    "devices": [
      {
        "ip_proxy_type": "none_detected",
        "ip_spam_list_count": 1,
        "ip_timezone_offset": "string"
      }
    ],
    "identity_abuse_signals": {
      "synthetic_identity": {
        "score": 1
      },
      "stolen_identity": {
        "score": 1
      }
    },
    "facial_duplicates": [
      {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "similarity": 1,
        "matched_after_completed": false
      }
    ],
    "trust_index_score": 1
  },
  "verify_sms": {
    "status": "success",
    "verifications": [
      {
        "status": "pending",
        "attempt": 1,
        "phone_number": "INV-0001",
        "delivery_attempt_count": 1,
        "solve_attempt_count": 1,
        "initially_sent_at": "string",
        "last_sent_at": "string",
        "redacted_at": "string"
      }
    ]
  },
  "watchlist_screening_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "beacon_user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "redacted_at": "string",
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>identityVerificationAutofillCreate</summary>

<div>

Create autofill for an Identity Verification.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>IdentityVerificationAutofillCreateRequest</code> | Yes | Request to create autofill for an Identity Verification. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `IdentityVerificationAutofillCreateResponse|error`

**Sample code:**

```ballerina
plaid:IdentityVerificationAutofillCreateResponse result = check plaidClient->identityVerificationAutofillCreate({
    identityVerificationId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "status": "success",
  "user": {
    "name": {
      "given_name": "Sample name",
      "family_name": "Sample name"
    },
    "address": {
      "street": "string",
      "street2": "string",
      "city": "string",
      "region": "string",
      "postal_code": "200",
      "country": "string",
      "po_box": "yes",
      "type": "residential"
    },
    "id_number": {
      "value": "string",
      "type": "ar_dni"
    }
  },
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

#### Watchlist screening

<details>
<summary>watchlistScreeningEntityCreate</summary>

<div>

Create a watchlist screening for an entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>WatchlistScreeningEntityCreateRequest</code> | Yes | Request to create a watchlist screening for an entity. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `WatchlistScreeningEntityCreateResponse|error`

**Sample code:**

```ballerina
plaid:WatchlistScreeningEntityCreateResponse result = check plaidClient->watchlistScreeningEntityCreate({
    searchTerms: {
        entityWatchlistProgramId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        legalName: "Sample name",
        country: "string"
    },
    clientUserId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "search_terms": {
    "entity_watchlist_program_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "legal_name": "Sample name",
    "document_number": "INV-0001",
    "email_address": "user@example.com",
    "country": "string",
    "phone_number": "INV-0001",
    "url": "https://example.com/resource",
    "version": 1
  },
  "assignee": "string",
  "status": "rejected",
  "client_user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "audit_trail": {
    "source": "dashboard",
    "dashboard_user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "timestamp": "string"
  },
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>watchlistScreeningEntityGet</summary>

<div>

Get an entity screening.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>WatchlistScreeningEntityGetRequest</code> | Yes | Request to get an entity screening. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `WatchlistScreeningEntityGetResponse|error`

**Sample code:**

```ballerina
plaid:WatchlistScreeningEntityGetResponse result = check plaidClient->watchlistScreeningEntityGet({
    entityWatchlistScreeningId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "search_terms": {
    "entity_watchlist_program_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "legal_name": "Sample name",
    "document_number": "INV-0001",
    "email_address": "user@example.com",
    "country": "string",
    "phone_number": "INV-0001",
    "url": "https://example.com/resource",
    "version": 1
  },
  "assignee": "string",
  "status": "rejected",
  "client_user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "audit_trail": {
    "source": "dashboard",
    "dashboard_user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "timestamp": "string"
  },
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>watchlistScreeningEntityHistoryList</summary>

<div>

List history for entity watchlist screenings.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>WatchlistScreeningEntityHistoryListRequest</code> | Yes | Request to list history for entity watchlist screenings. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `WatchlistScreeningEntityHistoryListResponse|error`

**Sample code:**

```ballerina
plaid:WatchlistScreeningEntityHistoryListResponse result = check plaidClient->watchlistScreeningEntityHistoryList({
    entityWatchlistScreeningId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    cursor: "string",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "entity_watchlist_screenings": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "search_terms": {
        "entity_watchlist_program_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "legal_name": "Sample name",
        "document_number": "INV-0001",
        "email_address": "user@example.com",
        "country": "string",
        "phone_number": "INV-0001",
        "url": "https://example.com/resource",
        "version": 1
      },
      "assignee": "string",
      "status": "rejected",
      "client_user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "audit_trail": {
        "source": "dashboard",
        "dashboard_user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "timestamp": "string"
      }
    }
  ],
  "next_cursor": "string",
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>watchlistScreeningEntityHitList</summary>

<div>

List hits for entity watchlist screenings.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>WatchlistScreeningEntityHitListRequest</code> | Yes | Request to list hits for entity watchlist screenings. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `WatchlistScreeningEntityHitListResponse|error`

**Sample code:**

```ballerina
plaid:WatchlistScreeningEntityHitListResponse result = check plaidClient->watchlistScreeningEntityHitList({
    entityWatchlistScreeningId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    cursor: "string",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "entity_watchlist_screening_hits": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "review_status": "confirmed",
      "first_active": "string",
      "inactive_since": "string",
      "historical_since": "string",
      "list_code": "CA_CON",
      "plaid_uid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "source_uid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "sub_programs": [
        "string"
      ]
    }
  ],
  "next_cursor": "string",
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>watchlistScreeningEntityList</summary>

<div>

List entity watchlist screenings.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>WatchlistScreeningEntityListRequest</code> | Yes | Request to list entity watchlist screenings. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `WatchlistScreeningEntityListResponse|error`

**Sample code:**

```ballerina
plaid:WatchlistScreeningEntityListResponse result = check plaidClient->watchlistScreeningEntityList({
    entityWatchlistProgramId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    cursor: "string",
    clientUserId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string"
});
```

**Sample response:**

```json
{
  "entity_watchlist_screenings": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "search_terms": {
        "entity_watchlist_program_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "legal_name": "Sample name",
        "document_number": "INV-0001",
        "email_address": "user@example.com",
        "country": "string",
        "phone_number": "INV-0001",
        "url": "https://example.com/resource",
        "version": 1
      },
      "assignee": "string",
      "status": "rejected",
      "client_user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "audit_trail": {
        "source": "dashboard",
        "dashboard_user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "timestamp": "string"
      }
    }
  ],
  "next_cursor": "string",
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>watchlistScreeningEntityProgramGet</summary>

<div>

Get entity watchlist screening program.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>WatchlistScreeningEntityProgramGetRequest</code> | Yes | Request to get entity watchlist screening program. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `WatchlistScreeningEntityProgramGetResponse|error`

**Sample code:**

```ballerina
plaid:WatchlistScreeningEntityProgramGetResponse result = check plaidClient->watchlistScreeningEntityProgramGet({
    entityWatchlistProgramId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "created_at": "string",
  "is_rescanning_enabled": false,
  "lists_enabled": [
    "CA_CON"
  ],
  "name": "Sample name",
  "name_sensitivity": "coarse",
  "audit_trail": {
    "source": "dashboard",
    "dashboard_user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "timestamp": "string"
  },
  "is_archived": false,
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>watchlistScreeningEntityProgramList</summary>

<div>

List entity watchlist screening programs.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>WatchlistScreeningEntityProgramListRequest</code> | Yes | Request to list entity watchlist screening programs. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `WatchlistScreeningEntityProgramListResponse|error`

**Sample code:**

```ballerina
plaid:WatchlistScreeningEntityProgramListResponse result = check plaidClient->watchlistScreeningEntityProgramList({
    cursor: "string",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "entity_watchlist_programs": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "created_at": "string",
      "is_rescanning_enabled": false,
      "lists_enabled": [
        "CA_CON"
      ],
      "name": "Sample name",
      "name_sensitivity": "coarse",
      "audit_trail": {
        "source": "dashboard",
        "dashboard_user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "timestamp": "string"
      },
      "is_archived": false
    }
  ],
  "next_cursor": "string",
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>watchlistScreeningEntityReviewCreate</summary>

<div>

Create a review for an entity watchlist screening.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>WatchlistScreeningEntityReviewCreateRequest</code> | Yes | Request to create a review for an entity watchlist screening. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `WatchlistScreeningEntityReviewCreateResponse|error`

**Sample code:**

```ballerina
plaid:WatchlistScreeningEntityReviewCreateResponse result = check plaidClient->watchlistScreeningEntityReviewCreate({
    dismissedHits: ["string"],
    entityWatchlistScreeningId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    confirmedHits: ["string"],
    comment: "string"
});
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "confirmed_hits": [
    "string"
  ],
  "dismissed_hits": [
    "string"
  ],
  "comment": "string",
  "audit_trail": {
    "source": "dashboard",
    "dashboard_user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "timestamp": "string"
  },
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>watchlistScreeningEntityReviewList</summary>

<div>

List reviews for entity watchlist screenings.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>WatchlistScreeningEntityReviewListRequest</code> | Yes | Request to list reviews for entity watchlist screenings. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `WatchlistScreeningEntityReviewListResponse|error`

**Sample code:**

```ballerina
plaid:WatchlistScreeningEntityReviewListResponse result = check plaidClient->watchlistScreeningEntityReviewList({
    entityWatchlistScreeningId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    cursor: "string",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "entity_watchlist_screening_reviews": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "confirmed_hits": [
        "string"
      ],
      "dismissed_hits": [
        "string"
      ],
      "comment": "string",
      "audit_trail": {
        "source": "dashboard",
        "dashboard_user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "timestamp": "string"
      }
    }
  ],
  "next_cursor": "string",
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>watchlistScreeningEntityUpdate</summary>

<div>

Update an entity screening.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>WatchlistScreeningEntityUpdateRequest</code> | Yes | The entity screening was successfully updated. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `WatchlistScreeningEntityUpdateResponse|error`

**Sample code:**

```ballerina
plaid:WatchlistScreeningEntityUpdateResponse result = check plaidClient->watchlistScreeningEntityUpdate({
    entityWatchlistScreeningId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    searchTerms: {
        entityWatchlistProgramId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        country: "string",
        documentNumber: "INV-0001"
    },
    clientUserId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    resetFields: ["assignee"]
});
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "search_terms": {
    "entity_watchlist_program_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "legal_name": "Sample name",
    "document_number": "INV-0001",
    "email_address": "user@example.com",
    "country": "string",
    "phone_number": "INV-0001",
    "url": "https://example.com/resource",
    "version": 1
  },
  "assignee": "string",
  "status": "rejected",
  "client_user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "audit_trail": {
    "source": "dashboard",
    "dashboard_user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "timestamp": "string"
  },
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>watchlistScreeningIndividualCreate</summary>

<div>

Create a watchlist screening for a person.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>WatchlistScreeningIndividualCreateRequest</code> | Yes | Request to create a watchlist screening for a person. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `WatchlistScreeningIndividualCreateResponse|error`

**Sample code:**

```ballerina
plaid:WatchlistScreeningIndividualCreateResponse result = check plaidClient->watchlistScreeningIndividualCreate({
    searchTerms: {
        watchlistProgramId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        legalName: "Sample name",
        country: "string"
    },
    clientUserId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "search_terms": {
    "watchlist_program_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "legal_name": "Sample name",
    "date_of_birth": "2026-01-15T00:00:00",
    "document_number": "INV-0001",
    "country": "string",
    "version": 1
  },
  "assignee": "string",
  "status": "rejected",
  "client_user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "audit_trail": {
    "source": "dashboard",
    "dashboard_user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "timestamp": "string"
  },
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>watchlistScreeningIndividualGet</summary>

<div>

Retrieve an individual watchlist screening.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>WatchlistScreeningIndividualGetRequest</code> | Yes | Request to retrieve an individual watchlist screening. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `WatchlistScreeningIndividualGetResponse|error`

**Sample code:**

```ballerina
plaid:WatchlistScreeningIndividualGetResponse result = check plaidClient->watchlistScreeningIndividualGet({
    watchlistScreeningId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "search_terms": {
    "watchlist_program_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "legal_name": "Sample name",
    "date_of_birth": "2026-01-15T00:00:00",
    "document_number": "INV-0001",
    "country": "string",
    "version": 1
  },
  "assignee": "string",
  "status": "rejected",
  "client_user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "audit_trail": {
    "source": "dashboard",
    "dashboard_user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "timestamp": "string"
  },
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>watchlistScreeningIndividualHistoryList</summary>

<div>

List history for individual watchlist screenings.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>WatchlistScreeningIndividualHistoryListRequest</code> | Yes | Request to list history for individual watchlist screenings. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `WatchlistScreeningIndividualHistoryListResponse|error`

**Sample code:**

```ballerina
plaid:WatchlistScreeningIndividualHistoryListResponse result = check plaidClient->watchlistScreeningIndividualHistoryList({
    watchlistScreeningId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    cursor: "string",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "watchlist_screenings": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "search_terms": {
        "watchlist_program_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "legal_name": "Sample name",
        "date_of_birth": "2026-01-15T00:00:00",
        "document_number": "INV-0001",
        "country": "string",
        "version": 1
      },
      "assignee": "string",
      "status": "rejected",
      "client_user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "audit_trail": {
        "source": "dashboard",
        "dashboard_user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "timestamp": "string"
      }
    }
  ],
  "next_cursor": "string",
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>watchlistScreeningIndividualHitList</summary>

<div>

List hits for individual watchlist screening.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>WatchlistScreeningIndividualHitListRequest</code> | Yes | Request to list hits for individual watchlist screening. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `WatchlistScreeningIndividualHitListResponse|error`

**Sample code:**

```ballerina
plaid:WatchlistScreeningIndividualHitListResponse result = check plaidClient->watchlistScreeningIndividualHitList({
    watchlistScreeningId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    cursor: "string",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "watchlist_screening_hits": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "review_status": "confirmed",
      "first_active": "string",
      "inactive_since": "string",
      "historical_since": "string",
      "list_code": "AU_CON",
      "plaid_uid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "source_uid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "sub_programs": [
        "string"
      ]
    }
  ],
  "next_cursor": "string",
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>watchlistScreeningIndividualList</summary>

<div>

List Individual Watchlist Screenings.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>WatchlistScreeningIndividualListRequest</code> | Yes | Request to list Individual Watchlist Screenings. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `WatchlistScreeningIndividualListResponse|error`

**Sample code:**

```ballerina
plaid:WatchlistScreeningIndividualListResponse result = check plaidClient->watchlistScreeningIndividualList({
    watchlistProgramId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    cursor: "string",
    clientUserId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string"
});
```

**Sample response:**

```json
{
  "watchlist_screenings": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "search_terms": {
        "watchlist_program_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "legal_name": "Sample name",
        "date_of_birth": "2026-01-15T00:00:00",
        "document_number": "INV-0001",
        "country": "string",
        "version": 1
      },
      "assignee": "string",
      "status": "rejected",
      "client_user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "audit_trail": {
        "source": "dashboard",
        "dashboard_user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "timestamp": "string"
      }
    }
  ],
  "next_cursor": "string",
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>watchlistScreeningIndividualProgramGet</summary>

<div>

Get individual watchlist screening program.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>WatchlistScreeningIndividualProgramGetRequest</code> | Yes | Request to get individual watchlist screening program. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `WatchlistScreeningIndividualProgramGetResponse|error`

**Sample code:**

```ballerina
plaid:WatchlistScreeningIndividualProgramGetResponse result = check plaidClient->watchlistScreeningIndividualProgramGet({
    watchlistProgramId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "created_at": "string",
  "is_rescanning_enabled": false,
  "lists_enabled": [
    "AU_CON"
  ],
  "name": "Sample name",
  "name_sensitivity": "coarse",
  "audit_trail": {
    "source": "dashboard",
    "dashboard_user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "timestamp": "string"
  },
  "is_archived": false,
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>watchlistScreeningIndividualProgramList</summary>

<div>

List individual watchlist screening programs.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>WatchlistScreeningIndividualProgramListRequest</code> | Yes | Request to list individual watchlist screening programs. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `WatchlistScreeningIndividualProgramListResponse|error`

**Sample code:**

```ballerina
plaid:WatchlistScreeningIndividualProgramListResponse result = check plaidClient->watchlistScreeningIndividualProgramList({
    cursor: "string",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "watchlist_programs": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "created_at": "string",
      "is_rescanning_enabled": false,
      "lists_enabled": [
        "AU_CON"
      ],
      "name": "Sample name",
      "name_sensitivity": "coarse",
      "audit_trail": {
        "source": "dashboard",
        "dashboard_user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "timestamp": "string"
      },
      "is_archived": false
    }
  ],
  "next_cursor": "string",
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>watchlistScreeningIndividualReviewCreate</summary>

<div>

Create a review for an individual watchlist screening.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>WatchlistScreeningIndividualReviewCreateRequest</code> | Yes | Request to create a review for an individual watchlist screening. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `WatchlistScreeningIndividualReviewCreateResponse|error`

**Sample code:**

```ballerina
plaid:WatchlistScreeningIndividualReviewCreateResponse result = check plaidClient->watchlistScreeningIndividualReviewCreate({
    dismissedHits: ["string"],
    confirmedHits: ["string"],
    watchlistScreeningId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    comment: "string"
});
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "confirmed_hits": [
    "string"
  ],
  "dismissed_hits": [
    "string"
  ],
  "comment": "string",
  "audit_trail": {
    "source": "dashboard",
    "dashboard_user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "timestamp": "string"
  },
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>watchlistScreeningIndividualReviewList</summary>

<div>

List reviews for individual watchlist screenings.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>WatchlistScreeningIndividualReviewListRequest</code> | Yes | Request to list reviews for individual watchlist screenings. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `WatchlistScreeningIndividualReviewListResponse|error`

**Sample code:**

```ballerina
plaid:WatchlistScreeningIndividualReviewListResponse result = check plaidClient->watchlistScreeningIndividualReviewList({
    watchlistScreeningId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    cursor: "string",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "watchlist_screening_reviews": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "confirmed_hits": [
        "string"
      ],
      "dismissed_hits": [
        "string"
      ],
      "comment": "string",
      "audit_trail": {
        "source": "dashboard",
        "dashboard_user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "timestamp": "string"
      }
    }
  ],
  "next_cursor": "string",
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>watchlistScreeningIndividualUpdate</summary>

<div>

Update individual watchlist screening.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>WatchlistScreeningIndividualUpdateRequest</code> | Yes | Request to update individual watchlist screening. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `WatchlistScreeningIndividualUpdateResponse|error`

**Sample code:**

```ballerina
plaid:WatchlistScreeningIndividualUpdateResponse result = check plaidClient->watchlistScreeningIndividualUpdate({
    watchlistScreeningId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    searchTerms: {
        country: "string",
        watchlistProgramId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        documentNumber: "INV-0001"
    },
    clientUserId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    resetFields: ["assignee"]
});
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "search_terms": {
    "watchlist_program_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "legal_name": "Sample name",
    "date_of_birth": "2026-01-15T00:00:00",
    "document_number": "INV-0001",
    "country": "string",
    "version": 1
  },
  "assignee": "string",
  "status": "rejected",
  "client_user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "audit_trail": {
    "source": "dashboard",
    "dashboard_user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "timestamp": "string"
  },
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

#### Beacon

<details>
<summary>beaconAccountRiskEvaluate</summary>

<div>

**Deprecated.** (Deprecated) Evaluate risk of a bank account.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BeaconAccountRiskEvaluateRequest</code> | Yes | Request to evaluate risk of a bank account. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `BeaconAccountRiskEvaluateResponse|error`

**Sample code:**

```ballerina
plaid:BeaconAccountRiskEvaluateResponse result = check plaidClient->beaconAccountRiskEvaluate({
    accessToken: "string",
    clientEvaluationId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    clientUserId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    options: {
        accountIds: ["3fa85f64-5717-4562-b3fc-2c963f66afa6"]
    }
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "accounts": [
    {
      "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "subtype": "401a",
      "type": "investment"
    }
  ]
}
```

</div>
</details>

<details>
<summary>beaconUserCreate</summary>

<div>

**Deprecated.** (Deprecated) Create a Beacon User.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BeaconUserCreateRequest</code> | Yes | Request to create a Beacon User. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `BeaconUserCreateResponse|error`

**Sample code:**

```ballerina
plaid:BeaconUserCreateResponse result = check plaidClient->beaconUserCreate({
    clientUserId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    programId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    user: {
        name: {
            given_name: "Sample name",
            family_name: "Sample name"
        },
        date_of_birth: "2026-01-15T00:00:00",
        address: {
            street: "string",
            city: "string",
            country: "string"
        }
    },
    secret: "string"
});
```

**Sample response:**

```json
{
  "item_ids": [
    "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  ],
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "version": 1,
  "created_at": "string",
  "updated_at": "2026-01-15T00:00:00",
  "status": "rejected",
  "program_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "client_user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "user": {
    "date_of_birth": "2026-01-15T00:00:00",
    "name": {
      "given_name": "Sample name",
      "family_name": "Sample name"
    },
    "address": {
      "street": "string",
      "street2": "string",
      "city": "string",
      "region": "string",
      "postal_code": "200",
      "country": "string"
    },
    "email_address": "user@example.com",
    "phone_number": "INV-0001",
    "id_number": {
      "value": "string",
      "type": "ar_dni"
    },
    "ip_address": "string",
    "depository_accounts": [
      {
        "account_mask": "string",
        "routing_number": "INV-0001",
        "added_at": "string"
      }
    ]
  },
  "audit_trail": {
    "source": "dashboard",
    "dashboard_user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "timestamp": "string"
  },
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>beaconUserGet</summary>

<div>

**Deprecated.** (Deprecated) Get a Beacon User.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BeaconUserGetRequest</code> | Yes | Request to get a Beacon User. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `BeaconUserGetResponse|error`

**Sample code:**

```ballerina
plaid:BeaconUserGetResponse result = check plaidClient->beaconUserGet({
    beaconUserId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "item_ids": [
    "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  ],
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "version": 1,
  "created_at": "string",
  "updated_at": "2026-01-15T00:00:00",
  "status": "rejected",
  "program_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "client_user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "user": {
    "date_of_birth": "2026-01-15T00:00:00",
    "name": {
      "given_name": "Sample name",
      "family_name": "Sample name"
    },
    "address": {
      "street": "string",
      "street2": "string",
      "city": "string",
      "region": "string",
      "postal_code": "200",
      "country": "string"
    },
    "email_address": "user@example.com",
    "phone_number": "INV-0001",
    "id_number": {
      "value": "string",
      "type": "ar_dni"
    },
    "ip_address": "string",
    "depository_accounts": [
      {
        "account_mask": "string",
        "routing_number": "INV-0001",
        "added_at": "string"
      }
    ]
  },
  "audit_trail": {
    "source": "dashboard",
    "dashboard_user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "timestamp": "string"
  },
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>beaconUserReview</summary>

<div>

**Deprecated.** (Deprecated) Review a Beacon User.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BeaconUserReviewRequest</code> | Yes | Request to review a Beacon User. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `BeaconUserGetResponse|error`

**Sample code:**

```ballerina
plaid:BeaconUserGetResponse result = check plaidClient->beaconUserReview({
    beaconUserId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    status: "rejected",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "item_ids": [
    "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  ],
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "version": 1,
  "created_at": "string",
  "updated_at": "2026-01-15T00:00:00",
  "status": "rejected",
  "program_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "client_user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "user": {
    "date_of_birth": "2026-01-15T00:00:00",
    "name": {
      "given_name": "Sample name",
      "family_name": "Sample name"
    },
    "address": {
      "street": "string",
      "street2": "string",
      "city": "string",
      "region": "string",
      "postal_code": "200",
      "country": "string"
    },
    "email_address": "user@example.com",
    "phone_number": "INV-0001",
    "id_number": {
      "value": "string",
      "type": "ar_dni"
    },
    "ip_address": "string",
    "depository_accounts": [
      {
        "account_mask": "string",
        "routing_number": "INV-0001",
        "added_at": "string"
      }
    ]
  },
  "audit_trail": {
    "source": "dashboard",
    "dashboard_user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "timestamp": "string"
  },
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>beaconReportCreate</summary>

<div>

**Deprecated.** (Deprecated) Create a Beacon Report.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BeaconReportCreateRequest</code> | Yes | Request to create a Beacon Report. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `BeaconReportCreateResponse|error`

**Sample code:**

```ballerina
plaid:BeaconReportCreateResponse result = check plaidClient->beaconReportCreate({
    beaconUserId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    'type: "first_party",
    fraudDate: "2026-01-15T00:00:00",
    fraudAmount: {
        iso_currency_code: "USD",
        value: 100.00
    }
});
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "beacon_user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "created_at": "string",
  "type": "first_party",
  "fraud_date": "2026-01-15T00:00:00",
  "event_date": "2026-01-15T00:00:00",
  "fraud_amount": {
    "iso_currency_code": "USD",
    "value": 100.00
  },
  "audit_trail": {
    "source": "dashboard",
    "dashboard_user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "timestamp": "string"
  },
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>beaconReportList</summary>

<div>

**Deprecated.** (Deprecated) List Beacon Reports for a Beacon User.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BeaconReportListRequest</code> | Yes | Request to list Beacon Reports for a Beacon User. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `BeaconReportListResponse|error`

**Sample code:**

```ballerina
plaid:BeaconReportListResponse result = check plaidClient->beaconReportList({
    beaconUserId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    cursor: "string",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "beacon_reports": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "beacon_user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "created_at": "string",
      "type": "first_party",
      "fraud_date": "2026-01-15T00:00:00",
      "event_date": "2026-01-15T00:00:00",
      "fraud_amount": {
        "iso_currency_code": "USD",
        "value": 100.00
      },
      "audit_trail": {
        "source": "dashboard",
        "dashboard_user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "timestamp": "string"
      }
    }
  ],
  "next_cursor": "string",
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>beaconReportSyndicationList</summary>

<div>

**Deprecated.** (Deprecated) List Beacon Report Syndications for a Beacon User.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BeaconReportSyndicationListRequest</code> | Yes | Request to list Beacon Report Syndications for a Beacon User. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `BeaconReportSyndicationListResponse|error`

**Sample code:**

```ballerina
plaid:BeaconReportSyndicationListResponse result = check plaidClient->beaconReportSyndicationList({
    beaconUserId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    cursor: "string",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "beacon_report_syndications": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "beacon_user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "report": {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "created_at": "string",
        "type": "first_party",
        "fraud_date": "2026-01-15T00:00:00",
        "event_date": "2026-01-15T00:00:00"
      },
      "analysis": {
        "address": "match",
        "date_of_birth": "match",
        "email_address": "match",
        "name": "match",
        "id_number": "match",
        "ip_address": "match",
        "phone_number": "match",
        "depository_accounts": [
          {
            "account_mask": "string",
            "routing_number": "INV-0001",
            "match_status": "match"
          }
        ]
      }
    }
  ],
  "next_cursor": "string",
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>beaconReportGet</summary>

<div>

**Deprecated.** (Deprecated) Get a Beacon Report.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BeaconReportGetRequest</code> | Yes | Request to get a Beacon Report. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `BeaconReportGetResponse|error`

**Sample code:**

```ballerina
plaid:BeaconReportGetResponse result = check plaidClient->beaconReportGet({
    beaconReportId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "beacon_user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "created_at": "string",
  "type": "first_party",
  "fraud_date": "2026-01-15T00:00:00",
  "event_date": "2026-01-15T00:00:00",
  "fraud_amount": {
    "iso_currency_code": "USD",
    "value": 100.00
  },
  "audit_trail": {
    "source": "dashboard",
    "dashboard_user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "timestamp": "string"
  },
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>beaconReportSyndicationGet</summary>

<div>

**Deprecated.** (Deprecated) Get a Beacon Report Syndication.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BeaconReportSyndicationGetRequest</code> | Yes | Request to get a Beacon Report Syndication. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `BeaconReportSyndicationGetResponse|error`

**Sample code:**

```ballerina
plaid:BeaconReportSyndicationGetResponse result = check plaidClient->beaconReportSyndicationGet({
    beaconReportSyndicationId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "beacon_user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "report": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "created_at": "string",
    "type": "first_party",
    "fraud_date": "2026-01-15T00:00:00",
    "event_date": "2026-01-15T00:00:00"
  },
  "analysis": {
    "address": "match",
    "date_of_birth": "match",
    "email_address": "match",
    "name": "match",
    "id_number": "match",
    "ip_address": "match",
    "phone_number": "match",
    "depository_accounts": [
      {
        "account_mask": "string",
        "routing_number": "INV-0001",
        "match_status": "match"
      }
    ]
  },
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>beaconUserUpdate</summary>

<div>

**Deprecated.** (Deprecated) Update the identity data of a Beacon User.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BeaconUserUpdateRequest</code> | Yes | Request to update the identity data of a Beacon User. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `BeaconUserUpdateResponse|error`

**Sample code:**

```ballerina
plaid:BeaconUserUpdateResponse result = check plaidClient->beaconUserUpdate({
    beaconUserId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    user: {
        date_of_birth: "2026-01-15T00:00:00",
        name: {
            given_name: "Sample name",
            family_name: "Sample name"
        },
        address: {
            street: "string",
            city: "string",
            country: "string"
        }
    },
    accessTokens: ["string"]
});
```

**Sample response:**

```json
{
  "item_ids": [
    "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  ],
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "version": 1,
  "created_at": "string",
  "updated_at": "2026-01-15T00:00:00",
  "status": "rejected",
  "program_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "client_user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "user": {
    "date_of_birth": "2026-01-15T00:00:00",
    "name": {
      "given_name": "Sample name",
      "family_name": "Sample name"
    },
    "address": {
      "street": "string",
      "street2": "string",
      "city": "string",
      "region": "string",
      "postal_code": "200",
      "country": "string"
    },
    "email_address": "user@example.com",
    "phone_number": "INV-0001",
    "id_number": {
      "value": "string",
      "type": "ar_dni"
    },
    "ip_address": "string",
    "depository_accounts": [
      {
        "account_mask": "string",
        "routing_number": "INV-0001",
        "added_at": "string"
      }
    ]
  },
  "audit_trail": {
    "source": "dashboard",
    "dashboard_user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "timestamp": "string"
  },
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>beaconDuplicateGet</summary>

<div>

**Deprecated.** (Deprecated) Get a Beacon Duplicate.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BeaconDuplicateGetRequest</code> | Yes | Request to get a Beacon Duplicate. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `BeaconDuplicateGetResponse|error`

**Sample code:**

```ballerina
plaid:BeaconDuplicateGetResponse result = check plaidClient->beaconDuplicateGet({
    beaconDuplicateId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "beacon_user1": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "version": 1
  },
  "beacon_user2": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "version": 1
  },
  "analysis": {
    "address": "match",
    "date_of_birth": "match",
    "email_address": "match",
    "name": "match",
    "id_number": "match",
    "ip_address": "match",
    "phone_number": "match"
  },
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>beaconUserHistoryList</summary>

<div>

**Deprecated.** (Deprecated) List a Beacon User's history.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BeaconUserHistoryListRequest</code> | Yes | Request to list a Beacon User's history. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `BeaconUserHistoryListResponse|error`

**Sample code:**

```ballerina
plaid:BeaconUserHistoryListResponse result = check plaidClient->beaconUserHistoryList({
    beaconUserId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    cursor: "string",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "beacon_users": [
    {
      "item_ids": [
        "3fa85f64-5717-4562-b3fc-2c963f66afa6"
      ],
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "version": 1,
      "created_at": "string",
      "updated_at": "2026-01-15T00:00:00",
      "status": "rejected",
      "program_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "client_user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "user": {
        "date_of_birth": "2026-01-15T00:00:00",
        "name": {
          "given_name": "Sample name",
          "family_name": "Sample name"
        },
        "address": {
          "street": "string",
          "street2": "string",
          "city": "string",
          "region": "string",
          "postal_code": "200",
          "country": "string"
        },
        "email_address": "user@example.com",
        "phone_number": "INV-0001",
        "id_number": {
          "value": "string",
          "type": "ar_dni"
        },
        "ip_address": "string",
        "depository_accounts": [
          {
            "account_mask": "string",
            "routing_number": "INV-0001",
            "added_at": "string"
          }
        ]
      },
      "audit_trail": {
        "source": "dashboard",
        "dashboard_user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "timestamp": "string"
      }
    }
  ],
  "next_cursor": "string",
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>beaconUserAccountInsightsGet</summary>

<div>

**Deprecated.** (Deprecated) Get Account Insights for a Beacon User.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BeaconUserAccountInsightsGetRequest</code> | Yes | Request to get Account Insights for a Beacon User. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `BeaconUserAccountInsightsGetResponse|error`

**Sample code:**

```ballerina
plaid:BeaconUserAccountInsightsGetResponse result = check plaidClient->beaconUserAccountInsightsGet({
    accessToken: "string",
    beaconUserId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "beacon_user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "created_at": "string",
  "updated_at": "2026-01-15T00:00:00",
  "bank_account_insights": {
    "item_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "accounts": [
      {
        "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "type": "investment",
        "subtype": "401a",
        "attributes": {
          "days_since_first_plaid_connection": 1,
          "is_account_closed": false,
          "is_account_frozen_or_restricted": false,
          "total_plaid_connections_count": 1,
          "plaid_connections_count_7d": 1,
          "plaid_connections_count_30d": 1,
          "failed_plaid_non_oauth_authentication_attempts_count_3d": 1,
          "plaid_non_oauth_authentication_attempts_count_3d": 1,
          "failed_plaid_non_oauth_authentication_attempts_count_7d": 1,
          "plaid_non_oauth_authentication_attempts_count_7d": 1,
          "failed_plaid_non_oauth_authentication_attempts_count_30d": 1,
          "plaid_non_oauth_authentication_attempts_count_30d": 1,
          "distinct_ip_addresses_count_3d": 1,
          "distinct_ip_addresses_count_7d": 1,
          "distinct_ip_addresses_count_30d": 1,
          "distinct_ip_addresses_count_90d": 1,
          "distinct_user_agents_count_3d": 1,
          "distinct_user_agents_count_7d": 1,
          "distinct_user_agents_count_30d": 1,
          "distinct_user_agents_count_90d": 1,
          "address_change_count_28d": 1,
          "email_change_count_28d": 1,
          "phone_change_count_28d": 1,
          "address_change_count_90d": 1,
          "email_change_count_90d": 1,
          "phone_change_count_90d": 1,
          "days_since_account_opening": 1,
          "days_since_first_observed_transaction": 1
        }
      }
    ]
  },
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

#### Protect

<details>
<summary>protectUserInsightsGet</summary>

<div>

Get Protect user insights.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>ProtectUserInsightsGetRequest</code> | Yes | Request to get Protect user insights. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ProtectUserInsightsGetResponse|error`

**Sample code:**

```ballerina
plaid:ProtectUserInsightsGetResponse result = check plaidClient->protectUserInsightsGet({
    userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    clientUserId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "latest_scored_event": {
    "event_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "timestamp": "string",
    "trust_index": {
      "score": 1,
      "model": "string",
      "subscores": {}
    },
    "fraud_attributes": {}
  },
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "reports": [
    {
      "report_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "incident_event": {},
      "report_confidence": "CONFIRMED",
      "report_type": "USER_ACCOUNT_TAKEOVER",
      "report_source": "INTERNAL_REVIEW",
      "bank_account": {},
      "ach_return_code": "200",
      "notes": "string",
      "created_at": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>protectReportCreate</summary>

<div>

Create a Protect report.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>ProtectReportCreateRequest</code> | Yes | Request to create a Protect report. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ProtectReportCreateResponse|error`

**Sample code:**

```ballerina
plaid:ProtectReportCreateResponse result = check plaidClient->protectReportCreate({
    reportSource: "INTERNAL_REVIEW",
    reportConfidence: "CONFIRMED",
    reportType: "USER_ACCOUNT_TAKEOVER",
    achReturnCode: "200"
});
```

**Sample response:**

```json
{
  "report_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>protectCashAdvanceDecisionCreate</summary>

<div>

Record a cash advance decision.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>ProtectCashAdvanceDecisionCreateRequest</code> | Yes | Request to record a cash advance decision. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ProtectCashAdvanceDecisionCreateResponse|error`

**Sample code:**

```ballerina
plaid:ProtectCashAdvanceDecisionCreateResponse result = check plaidClient->protectCashAdvanceDecisionCreate({
    decision: "APPROVED",
    decisionTime: "string",
    user: {
        user_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        client_user_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    },
    cashAdvance: {
        amount_approved: {
            value: 100.00
        },
        amount_due: {
            value: 100.00
        },
        due_date: "2026-01-15T00:00:00"
    }
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>protectCashAdvanceRepaymentCreate</summary>

<div>

Record a cash advance repayment.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>ProtectCashAdvanceRepaymentCreateRequest</code> | Yes | Request to record a cash advance repayment. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ProtectCashAdvanceRepaymentCreateResponse|error`

**Sample code:**

```ballerina
plaid:ProtectCashAdvanceRepaymentCreateResponse result = check plaidClient->protectCashAdvanceRepaymentCreate({
    user: {
        user_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        client_user_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    },
    clientAdvanceId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    status: "REPAID",
    repayment: {
        amount_due: {
            value: 100.00
        },
        due_date: "2026-01-15T00:00:00",
        amount_paid: {
            value: 100.00
        }
    }
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>protectCompute</summary>

<div>

Compute Protect Trust Index scores and subscores.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>ProtectComputeRequest</code> | Yes | Request to compute Protect Trust Index scores and subscores. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ProtectComputeResponse|error`

**Sample code:**

```ballerina
plaid:ProtectComputeResponse result = check plaidClient->protectCompute({
    model: "string",
    user: {
        user_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        client_user_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    },
    modelInputs: {
        link: {
            linkSessionId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
        },
        device: {
            deviceSessionId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
        }
    },
    secret: "string"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "score": 1,
  "model": "string",
  "subscores": {
    "cash_advance_bucket_0_25": 1,
    "cash_advance_bucket_25_50": 1,
    "cash_advance_bucket_50_100": 1
  },
  "timestamp": "string"
}
```

</div>
</details>

<details>
<summary>protectEventSend</summary>

<div>

**Deprecated.** Send a new event to enrich user data.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>ProtectEventSendRequest</code> | Yes | Request to send a new event to enrich user data. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ProtectEventSendResponse|error`

**Sample code:**

```ballerina
plaid:ProtectEventSendResponse result = check plaidClient->protectEventSend({
    event: {
        timestamp: "string",
        device_session_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    },
    deviceSessionId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    requestTrustIndex: false,
    secret: "string"
});
```

**Sample response:**

```json
{
  "event_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "trust_index": {
    "score": 1,
    "model": "string",
    "subscores": {}
  }
}
```

</div>
</details>

<details>
<summary>protectEventGet</summary>

<div>

**Deprecated.** Get information about a user event.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>ProtectEventGetRequest</code> | Yes | Request to get information about a user event. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ProtectEventGetResponse|error`

**Sample code:**

```ballerina
plaid:ProtectEventGetResponse result = check plaidClient->protectEventGet({
    eventId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "event_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "timestamp": "string",
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "trust_index": {
    "score": 1,
    "model": "string",
    "subscores": {}
  }
}
```

</div>
</details>

#### Business verification

<details>
<summary>businessVerificationGet</summary>

<div>

Get a Business Verification.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BusinessVerificationGetRequest</code> | Yes | Request to get a Business Verification. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `BusinessVerificationGetResponse|error`

**Sample code:**

```ballerina
plaid:BusinessVerificationGetResponse result = check plaidClient->businessVerificationGet({
    businessVerificationId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "client_user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "created_at": "string",
  "completed_at": "string",
  "redacted_at": "string",
  "status": "active",
  "search_terms": {
    "name": "Sample name",
    "alternative_names": [
      "string"
    ],
    "address": {
      "street": "string",
      "street2": "string",
      "city": "string",
      "region": "string",
      "postal_code": "200",
      "country": "string"
    },
    "website": "string",
    "phone_number": "INV-0001",
    "email_address": "user@example.com"
  },
  "kyb_check": {
    "status": "active",
    "score": 1,
    "name": {
      "summary": "match"
    },
    "address": {
      "summary": "match"
    },
    "website": {
      "summary": "match"
    },
    "match_details": {
      "names": [
        {
          "is_primary": false,
          "name": "Sample name"
        }
      ],
      "entity_type": "sole_proprietorship",
      "addresses": [
        {
          "country": "string",
          "is_primary": false,
          "city": "string",
          "street": "string",
          "street2": "string",
          "region": "string",
          "postal_code": "200"
        }
      ],
      "phone_numbers": [
        {
          "number": "INV-0001"
        }
      ],
      "email_addresses": [
        {
          "email_address": "user@example.com"
        }
      ],
      "websites": [
        {
          "url": "https://example.com/resource"
        }
      ],
      "formation_date": "2026-01-15T00:00:00"
    }
  },
  "risk_check": {
    "status": "active",
    "score": 1,
    "industry_prediction": {
      "code": 1,
      "title": "string"
    }
  },
  "digital_presence_check": {
    "status": "active",
    "score": 1,
    "address": {
      "summary": "match"
    },
    "phone_number": {
      "summary": "match"
    },
    "email_address": {
      "summary": "match"
    },
    "website": {
      "summary": "match"
    },
    "website_analysis": {
      "is_parked": "yes",
      "email_is_deliverable": "yes",
      "website_build_status": "coming_soon",
      "whois_record": {
        "domain_created_at": "string",
        "domain_updated_at": "2026-01-15T00:00:00",
        "domain_expires_at": "string",
        "registrar": "string"
      },
      "ssl": {
        "is_valid": "yes"
      }
    }
  },
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "shareable_url": "https://example.com/resource"
}
```

</div>
</details>

<details>
<summary>businessVerificationCreate</summary>

<div>

Create a Business Verification.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BusinessVerificationCreateRequest</code> | Yes | Request to create a Business Verification. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `BusinessVerificationCreateResponse|error`

**Sample code:**

```ballerina
plaid:BusinessVerificationCreateResponse result = check plaidClient->businessVerificationCreate({
    clientUserId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    business: {
        name: "Sample name",
        alternative_name: "Sample name",
        address: {
            street: "string",
            city: "string",
            country: "string"
        }
    },
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "client_user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "created_at": "string",
  "completed_at": "string",
  "redacted_at": "string",
  "status": "active",
  "search_terms": {
    "name": "Sample name",
    "alternative_names": [
      "string"
    ],
    "address": {
      "street": "string",
      "street2": "string",
      "city": "string",
      "region": "string",
      "postal_code": "200",
      "country": "string"
    },
    "website": "string",
    "phone_number": "INV-0001",
    "email_address": "user@example.com"
  },
  "kyb_check": {
    "status": "active",
    "score": 1,
    "name": {
      "summary": "match"
    },
    "address": {
      "summary": "match"
    },
    "website": {
      "summary": "match"
    },
    "match_details": {
      "names": [
        {
          "is_primary": false,
          "name": "Sample name"
        }
      ],
      "entity_type": "sole_proprietorship",
      "addresses": [
        {
          "country": "string",
          "is_primary": false,
          "city": "string",
          "street": "string",
          "street2": "string",
          "region": "string",
          "postal_code": "200"
        }
      ],
      "phone_numbers": [
        {
          "number": "INV-0001"
        }
      ],
      "email_addresses": [
        {
          "email_address": "user@example.com"
        }
      ],
      "websites": [
        {
          "url": "https://example.com/resource"
        }
      ],
      "formation_date": "2026-01-15T00:00:00"
    }
  },
  "risk_check": {
    "status": "active",
    "score": 1,
    "industry_prediction": {
      "code": 1,
      "title": "string"
    }
  },
  "digital_presence_check": {
    "status": "active",
    "score": 1,
    "address": {
      "summary": "match"
    },
    "phone_number": {
      "summary": "match"
    },
    "email_address": {
      "summary": "match"
    },
    "website": {
      "summary": "match"
    },
    "website_analysis": {
      "is_parked": "yes",
      "email_is_deliverable": "yes",
      "website_build_status": "coming_soon",
      "whois_record": {
        "domain_created_at": "string",
        "domain_updated_at": "2026-01-15T00:00:00",
        "domain_expires_at": "string",
        "registrar": "string"
      },
      "ssl": {
        "is_valid": "yes"
      }
    }
  },
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "shareable_url": "https://example.com/resource"
}
```

</div>
</details>

#### Processor

<details>
<summary>processorAuthGet</summary>

<div>

Retrieve Auth data.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>ProcessorAuthGetRequest</code> | Yes | Request to retrieve Auth data. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ProcessorAuthGetResponse|error`

**Sample code:**

```ballerina
plaid:ProcessorAuthGetResponse result = check plaidClient->processorAuthGet({
    processorToken: "string",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "numbers": {
    "ach": {
      "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "account": "string",
      "routing": "string",
      "wire_routing": "string"
    },
    "eft": {
      "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "account": "string",
      "institution": "string",
      "branch": "string"
    },
    "international": {
      "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "iban": "string",
      "bic": "string"
    }
  },
  "account": {
    "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "balances": {
      "available": 100.00,
      "current": 100.00,
      "limit": 100.00,
      "iso_currency_code": "200",
      "unofficial_currency_code": "200"
    },
    "mask": "string",
    "name": "Sample name",
    "official_name": "Sample name",
    "type": "investment",
    "subtype": "401a"
  }
}
```

</div>
</details>

<details>
<summary>processorAccountGet</summary>

<div>

Retrieve the account associated with a processor token.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>ProcessorAccountGetRequest</code> | Yes | Request to retrieve the account associated with a processor token. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ProcessorAccountGetResponse|error`

**Sample code:**

```ballerina
plaid:ProcessorAccountGetResponse result = check plaidClient->processorAccountGet({
    processorToken: "string",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "account": {
    "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "balances": {
      "available": 100.00,
      "current": 100.00,
      "limit": 100.00,
      "iso_currency_code": "200",
      "unofficial_currency_code": "200"
    },
    "mask": "string",
    "name": "Sample name",
    "official_name": "Sample name",
    "type": "investment",
    "subtype": "401a"
  },
  "institution_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>processorInvestmentsHoldingsGet</summary>

<div>

Retrieve Investment Holdings.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>ProcessorInvestmentsHoldingsGetRequest</code> | Yes | Request to retrieve Investment Holdings. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ProcessorInvestmentsHoldingsGetResponse|error`

**Sample code:**

```ballerina
plaid:ProcessorInvestmentsHoldingsGetResponse result = check plaidClient->processorInvestmentsHoldingsGet({
    processorToken: "string",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "account": {
    "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "balances": {
      "available": 100.00,
      "current": 100.00,
      "limit": 100.00,
      "iso_currency_code": "200",
      "unofficial_currency_code": "200",
      "margin_loan_amount": 100.00
    },
    "mask": "string",
    "name": "Sample name",
    "official_name": "Sample name",
    "type": "investment",
    "subtype": "401a"
  },
  "holdings": [
    {
      "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "security_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "institution_price": 100.00,
      "institution_value": 100.00,
      "cost_basis": 100.00,
      "quantity": 100.00,
      "iso_currency_code": "200",
      "unofficial_currency_code": "200"
    }
  ],
  "securities": [
    {
      "security_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "isin": "string",
      "cusip": "string",
      "sedol": "string",
      "institution_security_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "institution_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "proxy_security_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "name": "Sample name",
      "ticker_symbol": "string",
      "is_cash_equivalent": false,
      "type": "string",
      "close_price": 100.00,
      "close_price_as_of": "string",
      "iso_currency_code": "200",
      "unofficial_currency_code": "200",
      "market_identifier_code": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "sector": "string",
      "industry": "string",
      "cfi_code": "200",
      "figi": "string",
      "option_contract": {
        "contract_type": "string",
        "expiration_date": "2026-01-15T00:00:00",
        "strike_price": 100.00,
        "underlying_security_ticker": "string"
      },
      "fixed_income": {
        "yield_rate": {
          "percentage": 100.00,
          "type": "coupon"
        },
        "maturity_date": "2026-01-15T00:00:00",
        "issue_date": "2026-01-15T00:00:00",
        "face_value": 100.00
      }
    }
  ],
  "is_investments_fallback_item": false,
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>processorInvestmentsAuthGet</summary>

<div>

Get investment account authentication data.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>ProcessorInvestmentsAuthGetRequest</code> | Yes | Request to get investment account authentication data. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ProcessorInvestmentsAuthGetResponse|error`

**Sample code:**

```ballerina
plaid:ProcessorInvestmentsAuthGetResponse result = check plaidClient->processorInvestmentsAuthGet({
    processorToken: "string",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "account": {
    "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "balances": {
      "available": 100.00,
      "current": 100.00,
      "limit": 100.00,
      "iso_currency_code": "200",
      "unofficial_currency_code": "200"
    },
    "mask": "string",
    "name": "Sample name",
    "official_name": "Sample name",
    "type": "investment",
    "subtype": "401a"
  },
  "holdings": [
    {
      "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "security_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "institution_price": 100.00,
      "institution_value": 100.00,
      "cost_basis": 100.00,
      "quantity": 100.00,
      "iso_currency_code": "200",
      "unofficial_currency_code": "200"
    }
  ],
  "securities": [
    {
      "security_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "isin": "string",
      "cusip": "string",
      "sedol": "string",
      "institution_security_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "institution_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "proxy_security_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "name": "Sample name",
      "ticker_symbol": "string",
      "is_cash_equivalent": false,
      "type": "string",
      "close_price": 100.00,
      "close_price_as_of": "string",
      "iso_currency_code": "200",
      "unofficial_currency_code": "200",
      "market_identifier_code": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "sector": "string",
      "industry": "string",
      "cfi_code": "200",
      "figi": "string",
      "option_contract": {
        "contract_type": "string",
        "expiration_date": "2026-01-15T00:00:00",
        "strike_price": 100.00,
        "underlying_security_ticker": "string"
      },
      "fixed_income": {
        "yield_rate": {
          "percentage": 100.00,
          "type": "coupon"
        },
        "maturity_date": "2026-01-15T00:00:00",
        "issue_date": "2026-01-15T00:00:00",
        "face_value": 100.00
      }
    }
  ],
  "owners": [
    {
      "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "names": [
        "string"
      ]
    }
  ],
  "numbers": {
    "acats": [
      {
        "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "account": "string",
        "dtc_numbers": [
          "INV-0001"
        ]
      }
    ],
    "aton": [
      {
        "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "account": "string"
      }
    ],
    "retirement_401k": [
      {
        "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
      }
    ]
  },
  "data_sources": {
    "numbers": "INSTITUTION",
    "owners": "INSTITUTION",
    "holdings": "INSTITUTION"
  },
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>processorInvestmentsTransactionsGet</summary>

<div>

Get investment transactions data.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>ProcessorInvestmentsTransactionsGetRequest</code> | Yes | Request to get investment transactions data. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ProcessorInvestmentsTransactionsGetResponse|error`

**Sample code:**

```ballerina
plaid:ProcessorInvestmentsTransactionsGetResponse result = check plaidClient->processorInvestmentsTransactionsGet({
    endDate: "2026-01-15T00:00:00",
    processorToken: "string",
    startDate: "2026-01-15T00:00:00",
    options: {
        asyncUpdate: false,
        accountIds: ["3fa85f64-5717-4562-b3fc-2c963f66afa6"],
        offset: 1
    }
});
```

**Sample response:**

```json
{
  "account": {
    "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "balances": {
      "available": 100.00,
      "current": 100.00,
      "limit": 100.00,
      "iso_currency_code": "200",
      "unofficial_currency_code": "200",
      "margin_loan_amount": 100.00
    },
    "mask": "string",
    "name": "Sample name",
    "official_name": "Sample name",
    "type": "investment",
    "subtype": "401a"
  },
  "investment_transactions": [
    {
      "investment_transaction_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "security_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "date": "2026-01-15T00:00:00",
      "name": "Sample name",
      "quantity": 100.00,
      "amount": 100.00,
      "price": 100.00,
      "fees": 100.00,
      "type": "buy",
      "subtype": "account fee",
      "iso_currency_code": "200",
      "unofficial_currency_code": "200"
    }
  ],
  "securities": [
    {
      "security_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "isin": "string",
      "cusip": "string",
      "sedol": "string",
      "institution_security_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "institution_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "proxy_security_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "name": "Sample name",
      "ticker_symbol": "string",
      "is_cash_equivalent": false,
      "type": "string",
      "close_price": 100.00,
      "close_price_as_of": "string",
      "iso_currency_code": "200",
      "unofficial_currency_code": "200",
      "market_identifier_code": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "sector": "string",
      "industry": "string",
      "cfi_code": "200",
      "figi": "string",
      "option_contract": {
        "contract_type": "string",
        "expiration_date": "2026-01-15T00:00:00",
        "strike_price": 100.00,
        "underlying_security_ticker": "string"
      },
      "fixed_income": {
        "yield_rate": {
          "percentage": 100.00,
          "type": "coupon"
        },
        "maturity_date": "2026-01-15T00:00:00",
        "issue_date": "2026-01-15T00:00:00",
        "face_value": 100.00
      }
    }
  ],
  "total_investment_transactions": 1,
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "is_investments_fallback_item": false
}
```

</div>
</details>

<details>
<summary>processorTransactionsGet</summary>

<div>

Get transaction data using a processor token.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>ProcessorTransactionsGetRequest</code> | Yes | Request to get transaction data. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ProcessorTransactionsGetResponse|error`

**Sample code:**

```ballerina
plaid:ProcessorTransactionsGetResponse result = check plaidClient->processorTransactionsGet({
    endDate: "2026-01-15T00:00:00",
    processorToken: "string",
    startDate: "2026-01-15T00:00:00",
    options: {
        includePersonalFinanceCategoryBeta: false,
        includeLogoAndCounterpartyBeta: false,
        offset: 1
    }
});
```

**Sample response:**

```json
{
  "account": {
    "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "balances": {
      "available": 100.00,
      "current": 100.00,
      "limit": 100.00,
      "iso_currency_code": "200",
      "unofficial_currency_code": "200"
    },
    "mask": "string",
    "name": "Sample name",
    "official_name": "Sample name",
    "type": "investment",
    "subtype": "401a"
  },
  "transactions": [
    {
      "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "amount": 100.00,
      "iso_currency_code": "200",
      "unofficial_currency_code": "200",
      "date": "2026-01-15T00:00:00",
      "pending": false,
      "transaction_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "authorized_date": "2026-01-15T00:00:00",
      "authorized_datetime": "2026-01-15T00:00:00",
      "datetime": "2026-01-15T00:00:00",
      "payment_channel": "online",
      "transaction_code": "adjustment",
      "account_owner": "string",
      "location": {
        "address": "string",
        "city": "string",
        "region": "string",
        "postal_code": "200",
        "country": "string",
        "lat": 100.00,
        "lon": 100.00,
        "store_number": "INV-0001"
      },
      "name": "Sample name",
      "payment_meta": {
        "reference_number": "INV-0001",
        "ppd_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "payee": "string",
        "by_order_of": "string",
        "payer": "string",
        "payment_method": "string",
        "payment_processor": "string",
        "reason": "string"
      },
      "pending_transaction_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ],
  "total_transactions": 1,
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>processorTransactionsSync</summary>

<div>

Get incremental transaction updates on a processor token.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>ProcessorTransactionsSyncRequest</code> | Yes | Request to get incremental transaction updates on a processor token. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ProcessorTransactionsSyncResponse|error`

**Sample code:**

```ballerina
plaid:ProcessorTransactionsSyncResponse result = check plaidClient->processorTransactionsSync({
    processorToken: "string",
    cursor: "string",
    count: 1,
    options: {
        includeLogoAndCounterpartyBeta: false,
        accountId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        includeOriginalDescription: false
    }
});
```

**Sample response:**

```json
{
  "transactions_update_status": "TRANSACTIONS_UPDATE_STATUS_UNKNOWN",
  "account": {
    "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "balances": {
      "available": 100.00,
      "current": 100.00,
      "limit": 100.00,
      "iso_currency_code": "200",
      "unofficial_currency_code": "200"
    },
    "mask": "string",
    "name": "Sample name",
    "official_name": "Sample name",
    "type": "investment",
    "subtype": "401a"
  },
  "added": [
    {
      "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "amount": 100.00,
      "iso_currency_code": "200",
      "unofficial_currency_code": "200",
      "date": "2026-01-15T00:00:00",
      "pending": false,
      "transaction_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "authorized_date": "2026-01-15T00:00:00",
      "authorized_datetime": "2026-01-15T00:00:00",
      "datetime": "2026-01-15T00:00:00",
      "payment_channel": "online",
      "transaction_code": "adjustment",
      "account_owner": "string",
      "location": {
        "address": "string",
        "city": "string",
        "region": "string",
        "postal_code": "200",
        "country": "string",
        "lat": 100.00,
        "lon": 100.00,
        "store_number": "INV-0001"
      },
      "name": "Sample name",
      "payment_meta": {
        "reference_number": "INV-0001",
        "ppd_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "payee": "string",
        "by_order_of": "string",
        "payer": "string",
        "payment_method": "string",
        "payment_processor": "string",
        "reason": "string"
      },
      "pending_transaction_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ],
  "modified": [
    {
      "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "amount": 100.00,
      "iso_currency_code": "200",
      "unofficial_currency_code": "200",
      "date": "2026-01-15T00:00:00",
      "pending": false,
      "transaction_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "authorized_date": "2026-01-15T00:00:00",
      "authorized_datetime": "2026-01-15T00:00:00",
      "datetime": "2026-01-15T00:00:00",
      "payment_channel": "online",
      "transaction_code": "adjustment",
      "account_owner": "string",
      "location": {
        "address": "string",
        "city": "string",
        "region": "string",
        "postal_code": "200",
        "country": "string",
        "lat": 100.00,
        "lon": 100.00,
        "store_number": "INV-0001"
      },
      "name": "Sample name",
      "payment_meta": {
        "reference_number": "INV-0001",
        "ppd_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "payee": "string",
        "by_order_of": "string",
        "payer": "string",
        "payment_method": "string",
        "payment_processor": "string",
        "reason": "string"
      },
      "pending_transaction_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ],
  "removed": [
    {
      "transaction_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ],
  "next_cursor": "string",
  "has_more": false,
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>processorTransactionsRefresh</summary>

<div>

Refresh transaction data using a processor token.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>ProcessorTransactionsRefreshRequest</code> | Yes | Request to refresh transaction data. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ProcessorTransactionsRefreshResponse|error`

**Sample code:**

```ballerina
plaid:ProcessorTransactionsRefreshResponse result = check plaidClient->processorTransactionsRefresh({
    processorToken: "string",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>processorTransactionsRecurringGet</summary>

<div>

Fetch recurring transaction streams using a processor token.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>ProcessorTransactionsRecurringGetRequest</code> | Yes | Request to fetch recurring transaction streams. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ProcessorTransactionsRecurringGetResponse|error`

**Sample code:**

```ballerina
plaid:ProcessorTransactionsRecurringGetResponse result = check plaidClient->processorTransactionsRecurringGet({
    processorToken: "string",
    options: {
        includePersonalFinanceCategory: false,
        personalFinanceCategoryVersion: "v1"
    },
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "inflow_streams": [
    {
      "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "stream_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "category": [
        "string"
      ],
      "category_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "description": "Sample description",
      "merchant_name": "Sample name",
      "first_date": "2026-01-15T00:00:00",
      "last_date": "2026-01-15T00:00:00",
      "frequency": "UNKNOWN",
      "transaction_ids": [
        "3fa85f64-5717-4562-b3fc-2c963f66afa6"
      ],
      "average_amount": {},
      "last_amount": {},
      "is_active": false,
      "status": "UNKNOWN",
      "is_user_modified": false
    }
  ],
  "outflow_streams": [
    {
      "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "stream_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "category": [
        "string"
      ],
      "category_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "description": "Sample description",
      "merchant_name": "Sample name",
      "first_date": "2026-01-15T00:00:00",
      "last_date": "2026-01-15T00:00:00",
      "frequency": "UNKNOWN",
      "transaction_ids": [
        "3fa85f64-5717-4562-b3fc-2c963f66afa6"
      ],
      "average_amount": {},
      "last_amount": {},
      "is_active": false,
      "status": "UNKNOWN",
      "is_user_modified": false
    }
  ],
  "updated_datetime": "2026-01-15T00:00:00",
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "personal_finance_category_version": "v1"
}
```

</div>
</details>

<details>
<summary>processorSignalEvaluate</summary>

<div>

Evaluate a planned ACH transaction using a processor token.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>ProcessorSignalEvaluateRequest</code> | Yes | Request to evaluate a planned ACH transaction. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ProcessorSignalEvaluateResponse|error`

**Sample code:**

```ballerina
plaid:ProcessorSignalEvaluateResponse result = check plaidClient->processorSignalEvaluate({
    amount: 100.00,
    processorToken: "string",
    clientTransactionId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    userPresent: false
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "scores": {
    "customer_initiated_return_risk": {
      "score": 1,
      "risk_tier": 1
    },
    "bank_initiated_return_risk": {
      "score": 1,
      "risk_tier": 1
    }
  },
  "core_attributes": {
    "days_since_first_plaid_connection": 1,
    "distinct_ip_addresses_count_90d": 1,
    "nsf_overdraft_transactions_count_60d": 1
  },
  "ruleset": {
    "result": "ACCEPT",
    "ruleset_key": "string",
    "outcome": "string"
  },
  "warnings": [
    {
      "warning_message": "string",
      "warning_type": "string",
      "warning_code": "200"
    }
  ]
}
```

</div>
</details>

<details>
<summary>processorSignalDecisionReport</summary>

<div>

Report whether you initiated an ACH transaction using a processor token.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>ProcessorSignalDecisionReportRequest</code> | Yes | Request to report whether you initiated an ACH transaction. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ProcessorSignalDecisionReportResponse|error`

**Sample code:**

```ballerina
plaid:ProcessorSignalDecisionReportResponse result = check plaidClient->processorSignalDecisionReport({
    initiated: false,
    processorToken: "string",
    clientTransactionId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    daysFundsOnHold: 1
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>processorSignalReturnReport</summary>

<div>

Report a return for an ACH transaction using a processor token.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>ProcessorSignalReturnReportRequest</code> | Yes | Request to report a return for an ACH transaction. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ProcessorSignalReturnReportResponse|error`

**Sample code:**

```ballerina
plaid:ProcessorSignalReturnReportResponse result = check plaidClient->processorSignalReturnReport({
    processorToken: "string",
    clientTransactionId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    returnCode: "200",
    returnedAt: "string"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>processorSignalPrepare</summary>

<div>

Opt-in a processor token to Signal.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>ProcessorSignalPrepareRequest</code> | Yes | Request to opt-in a processor token to Signal. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ProcessorSignalPrepareResponse|error`

**Sample code:**

```ballerina
plaid:ProcessorSignalPrepareResponse result = check plaidClient->processorSignalPrepare({
    processorToken: "string",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>processorBankTransferCreate</summary>

<div>

**Deprecated.** (Deprecated) Create a bank transfer as a processor.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>ProcessorBankTransferCreateRequest</code> | Yes | Request to create a bank transfer as a processor. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ProcessorBankTransferCreateResponse|error`

**Sample code:**

```ballerina
plaid:ProcessorBankTransferCreateResponse result = check plaidClient->processorBankTransferCreate({
    amount: "string",
    description: "Sample description",
    'type: "debit",
    network: "ach",
    isoCurrencyCode: "200",
    idempotencyKey: "string",
    processorToken: "string",
    user: {
        legal_name: "Sample name",
        email_address: "user@example.com",
        routing_number: "INV-0001"
    }
});
```

**Sample response:**

```json
{
  "bank_transfer": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "ach_class": "ccd",
    "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "debit",
    "user": {
      "legal_name": "Sample name"
    },
    "amount": "string",
    "iso_currency_code": "200",
    "description": "Sample description",
    "created": "string",
    "status": "pending",
    "network": "ach",
    "cancellable": false,
    "failure_reason": {},
    "custom_tag": "string",
    "metadata": {},
    "origination_account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "direction": "outbound"
  },
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>processorLiabilitiesGet</summary>

<div>

Retrieve Liabilities data using a processor token.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>ProcessorLiabilitiesGetRequest</code> | Yes | Request to retrieve Liabilities data. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ProcessorLiabilitiesGetResponse|error`

**Sample code:**

```ballerina
plaid:ProcessorLiabilitiesGetResponse result = check plaidClient->processorLiabilitiesGet({
    processorToken: "string",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "account": {
    "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "balances": {
      "available": 100.00,
      "current": 100.00,
      "limit": 100.00,
      "iso_currency_code": "200",
      "unofficial_currency_code": "200"
    },
    "mask": "string",
    "name": "Sample name",
    "official_name": "Sample name",
    "type": "investment",
    "subtype": "401a"
  },
  "liabilities": {
    "credit": [
      {
        "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "aprs": [
          {
            "apr_percentage": 100.00,
            "apr_type": "balance_transfer_apr",
            "balance_subject_to_apr": 100.00,
            "interest_charge_amount": 100.00
          }
        ],
        "is_overdue": false,
        "last_payment_amount": 100.00,
        "last_payment_date": "2026-01-15T00:00:00",
        "last_statement_issue_date": "2026-01-15T00:00:00",
        "last_statement_balance": 100.00,
        "minimum_payment_amount": 100.00,
        "next_payment_due_date": "2026-01-15T00:00:00"
      }
    ],
    "mortgage": [
      {
        "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "account_number": "INV-0001",
        "current_late_fee": 100.00,
        "escrow_balance": 100.00,
        "has_pmi": false,
        "has_prepayment_penalty": false,
        "interest_rate": {
          "percentage": 100.00,
          "type": "string"
        },
        "last_payment_amount": 100.00,
        "last_payment_date": "2026-01-15T00:00:00",
        "loan_type_description": "Sample description",
        "loan_term": "string",
        "maturity_date": "2026-01-15T00:00:00",
        "next_monthly_payment": 100.00,
        "next_payment_due_date": "2026-01-15T00:00:00",
        "origination_date": "2026-01-15T00:00:00",
        "origination_principal_amount": 100.00,
        "past_due_amount": 100.00,
        "property_address": {
          "city": "string",
          "country": "string",
          "postal_code": "200",
          "region": "string",
          "street": "string"
        },
        "ytd_interest_paid": 100.00,
        "ytd_principal_paid": 100.00
      }
    ],
    "student": [
      {
        "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "account_number": "INV-0001",
        "disbursement_dates": [
          "2026-01-15T00:00:00"
        ],
        "expected_payoff_date": "2026-01-15T00:00:00",
        "guarantor": "string",
        "interest_rate_percentage": 100.00,
        "is_overdue": false,
        "last_payment_amount": 100.00,
        "last_payment_date": "2026-01-15T00:00:00",
        "last_statement_issue_date": "2026-01-15T00:00:00",
        "loan_name": "Sample name",
        "loan_status": {
          "end_date": "2026-01-15T00:00:00",
          "type": "cancelled"
        },
        "minimum_payment_amount": 100.00,
        "next_payment_due_date": "2026-01-15T00:00:00",
        "origination_date": "2026-01-15T00:00:00",
        "origination_principal_amount": 100.00,
        "outstanding_interest_amount": 100.00,
        "payment_reference_number": "INV-0001",
        "pslf_status": {
          "estimated_eligibility_date": "2026-01-15T00:00:00",
          "payments_made": 1,
          "payments_remaining": 1
        },
        "repayment_plan": {
          "description": "Sample description",
          "type": "extended graduated"
        },
        "sequence_number": "INV-0001",
        "servicer_address": {
          "city": "string",
          "region": "string",
          "street": "string",
          "postal_code": "200",
          "country": "string"
        },
        "ytd_interest_paid": 100.00,
        "ytd_principal_paid": 100.00
      }
    ]
  },
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>processorIdentityGet</summary>

<div>

Retrieve Identity data.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>ProcessorIdentityGetRequest</code> | Yes | Request to retrieve Identity data. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ProcessorIdentityGetResponse|error`

**Sample code:**

```ballerina
plaid:ProcessorIdentityGetResponse result = check plaidClient->processorIdentityGet({
    processorToken: "string",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "account": {
    "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "balances": {
      "available": 100.00,
      "current": 100.00,
      "limit": 100.00,
      "iso_currency_code": "200",
      "unofficial_currency_code": "200"
    },
    "mask": "string",
    "name": "Sample name",
    "official_name": "Sample name",
    "type": "investment",
    "subtype": "401a",
    "owners": [
      {
        "names": [
          "string"
        ],
        "phone_numbers": [
          {
            "data": "string",
            "primary": false,
            "type": "home"
          }
        ],
        "emails": [
          {
            "data": "string",
            "primary": false,
            "type": "primary"
          }
        ],
        "addresses": [
          {
            "data": {
              "city": "string",
              "region": "string",
              "street": "string",
              "postal_code": "200",
              "country": "string"
            }
          }
        ]
      }
    ]
  },
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>processorIdentityMatch</summary>

<div>

Retrieve identity match score using a processor token.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>ProcessorIdentityMatchRequest</code> | Yes | Request to retrieve identity match score. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ProcessorIdentityMatchResponse|error`

**Sample code:**

```ballerina
plaid:ProcessorIdentityMatchResponse result = check plaidClient->processorIdentityMatch({
    processorToken: "string",
    secret: "string",
    user: {
        legal_name: "Sample name",
        phone_number: "INV-0001",
        email_address: "user@example.com"
    },
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "account": {
    "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "balances": {
      "available": 100.00,
      "current": 100.00,
      "limit": 100.00,
      "iso_currency_code": "200",
      "unofficial_currency_code": "200"
    },
    "mask": "string",
    "name": "Sample name",
    "official_name": "Sample name",
    "type": "investment",
    "subtype": "401a",
    "legal_name": {
      "score": 1,
      "is_first_name_or_last_name_match": false,
      "is_nickname_match": false,
      "is_business_name_detected": false
    },
    "phone_number": {
      "score": 1
    },
    "email_address": {
      "score": 1
    },
    "address": {
      "score": 1,
      "is_postal_code_match": false
    }
  },
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>processorBalanceGet</summary>

<div>

Retrieve Balance data.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>ProcessorBalanceGetRequest</code> | Yes | The `/processor/balance/get` endpoint returns the real-time balance for the account associated with a given `processor_token`. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ProcessorBalanceGetResponse|error`

**Sample code:**

```ballerina
plaid:ProcessorBalanceGetResponse result = check plaidClient->processorBalanceGet({
    processorToken: "string",
    options: {
        minLastUpdatedDatetime: "2026-01-15T00:00:00"
    },
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "account": {
    "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "balances": {
      "available": 100.00,
      "current": 100.00,
      "limit": 100.00,
      "iso_currency_code": "200",
      "unofficial_currency_code": "200"
    },
    "mask": "string",
    "name": "Sample name",
    "official_name": "Sample name",
    "type": "investment",
    "subtype": "401a"
  },
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>processorTokenCreate</summary>

<div>

Create processor token.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>ProcessorTokenCreateRequest</code> | Yes | Request to create processor token. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ProcessorTokenCreateResponse|error`

**Sample code:**

```ballerina
plaid:ProcessorTokenCreateResponse result = check plaidClient->processorTokenCreate({
    accessToken: "string",
    accountId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    processor: "dwolla",
    secret: "string"
});
```

**Sample response:**

```json
{
  "processor_token": "string",
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>processorTokenPermissionsSet</summary>

<div>

Control a processor's access to products.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>ProcessorTokenPermissionsSetRequest</code> | Yes | Request to control a processor's access to products. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ProcessorTokenPermissionsSetResponse|error`

**Sample code:**

```ballerina
plaid:ProcessorTokenPermissionsSetResponse result = check plaidClient->processorTokenPermissionsSet({
    processorToken: "string",
    products: ["assets"],
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>processorTokenPermissionsGet</summary>

<div>

Get a processor token's product permissions.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>ProcessorTokenPermissionsGetRequest</code> | Yes | Request to get a processor token's product permissions. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ProcessorTokenPermissionsGetResponse|error`

**Sample code:**

```ballerina
plaid:ProcessorTokenPermissionsGetResponse result = check plaidClient->processorTokenPermissionsGet({
    processorToken: "string",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "products": [
    "assets"
  ]
}
```

</div>
</details>

<details>
<summary>processorTokenWebhookUpdate</summary>

<div>

Update a processor token's webhook URL.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>ProcessorTokenWebhookUpdateRequest</code> | Yes | Request to update a processor token's webhook URL. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ProcessorTokenWebhookUpdateResponse|error`

**Sample code:**

```ballerina
plaid:ProcessorTokenWebhookUpdateResponse result = check plaidClient->processorTokenWebhookUpdate({
    webhook: "string",
    processorToken: "string",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>processorStripeBankAccountTokenCreate</summary>

<div>

Create Stripe bank account token.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>ProcessorStripeBankAccountTokenCreateRequest</code> | Yes | Request to create Stripe bank account token. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ProcessorStripeBankAccountTokenCreateResponse|error`

**Sample code:**

```ballerina
plaid:ProcessorStripeBankAccountTokenCreateResponse result = check plaidClient->processorStripeBankAccountTokenCreate({
    accessToken: "string",
    accountId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "stripe_bank_account_token": "string",
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>processorApexProcessorTokenCreate</summary>

<div>

Create Apex processor token.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>ProcessorApexProcessorTokenCreateRequest</code> | Yes | Request to create Apex processor token. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ProcessorTokenCreateResponse|error`

**Sample code:**

```ballerina
plaid:ProcessorTokenCreateResponse result = check plaidClient->processorApexProcessorTokenCreate({
    accessToken: "string",
    accountId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "processor_token": "string",
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

#### Beta APIs

<details>
<summary>betaWebhookEventsList</summary>

<div>

List webhook events.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BetaWebhookEventsListRequest</code> | Yes | Request to list webhook events. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `BetaWebhookEventsListResponse|error`

**Sample code:**

```ballerina
plaid:BetaWebhookEventsListResponse result = check plaidClient->betaWebhookEventsList({
    cursor: "string",
    webhookTypes: ["string"],
    startTime: "string",
    webhookCodes: ["200"]
});
```

**Sample response:**

```json
{
  "webhook_events": [
    {
      "webhook_message_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "webhook_type": "string",
      "webhook_code": "200",
      "item_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "sent_time": "string",
      "payload": {},
      "destination_url": "https://example.com/resource",
      "delivery_status": "PENDING",
      "last_http_status_code": 1,
      "attempt_count": 1,
      "last_attempt_time": "string"
    }
  ],
  "has_more": false,
  "next_cursor": "string",
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>creditBankEmploymentGet</summary>

<div>

Retrieve information from the bank accounts used for employment verification.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreditBankEmploymentGetRequest</code> | Yes | Request to retrieve information from the bank accounts used for employment verification. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CreditBankEmploymentGetResponse|error`

**Sample code:**

```ballerina
plaid:CreditBankEmploymentGetResponse result = check plaidClient->creditBankEmploymentGet({
    userToken: "string",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "bank_employment_reports": [
    {
      "warnings": [
        {
          "warning_type": "BANK_EMPLOYMENT_WARNING",
          "cause": {
            "error_message": "string",
            "item_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "error_type": "INTERNAL_SERVER_ERROR",
            "display_message": "string",
            "error_code": "200"
          },
          "warning_code": "IDENTITY_UNAVAILABLE"
        }
      ],
      "bank_employment_report_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "items": [
        {
          "last_updated_time": "2026-01-15T00:00:00",
          "item_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "bank_employments": [
            {
              "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              "earliest_deposit_date": "2026-01-15T00:00:00",
              "employer": {
                "name": "Sample name"
              },
              "latest_deposit_date": "2026-01-15T00:00:00",
              "bank_employment_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
            }
          ],
          "bank_employment_accounts": [
            {
              "official_name": "Sample name",
              "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              "subtype": "checking",
              "name": "Sample name",
              "owners": [
                {
                  "names": [
                    "string"
                  ],
                  "phone_numbers": [
                    {}
                  ],
                  "emails": [
                    {}
                  ],
                  "addresses": [
                    {}
                  ]
                }
              ],
              "type": "depository",
              "mask": "string"
            }
          ],
          "institution_name": "Sample name",
          "institution_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
        }
      ],
      "generated_time": "string",
      "days_requested": 1
    }
  ],
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>transactionsEnhance</summary>

<div>

Enhance locally-held transaction data.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>TransactionsEnhanceGetRequest</code> | Yes | Request to enhance locally-held transaction data. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TransactionsEnhanceGetResponse|error`

**Sample code:**

```ballerina
plaid:TransactionsEnhanceGetResponse result = check plaidClient->transactionsEnhance({
    accountType: "string",
    transactions: [{
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        description: "Sample description",
        amount: 100.00,
        iso_currency_code: "200"
    }],
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "enhanced_transactions": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "description": "Sample description",
      "amount": 100.00,
      "iso_currency_code": "200",
      "enhancements": {
        "payment_channel": "online",
        "category_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "category": [
          "string"
        ],
        "location": {
          "address": "string",
          "city": "string",
          "region": "string",
          "postal_code": "200",
          "country": "string",
          "lat": 100.00,
          "lon": 100.00,
          "store_number": "INV-0001"
        }
      }
    }
  ]
}
```

</div>
</details>

<details>
<summary>transactionsRulesCreate</summary>

<div>

Create transaction category rule.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>TransactionsRulesCreateRequest</code> | Yes | Request to create transaction category rule. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TransactionsRulesCreateResponse|error`

**Sample code:**

```ballerina
plaid:TransactionsRulesCreateResponse result = check plaidClient->transactionsRulesCreate({
    clientUserId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    pfcDetailedCategory: "string",
    ruleDetails: {
        'field: "TRANSACTION_ID",
        query: "string",
        'type: "EXACT_MATCH"
    },
    pfcPrimaryCategory: "string"
});
```

**Sample response:**

```json
{
  "rule": {
    "updated_at": "2026-01-15T00:00:00",
    "user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "pfc_detailed_category": "string"
  },
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>transactionsRulesList</summary>

<div>

Return a list of rules created for the Item associated with the access token.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>TransactionsRulesListRequest</code> | Yes | Request to return a list of rules created for the Item associated with the access token. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TransactionsRulesListResponse|error`

**Sample code:**

```ballerina
plaid:TransactionsRulesListResponse result = check plaidClient->transactionsRulesList({
    clientUserId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "rules": [
    {
      "updated_at": "2026-01-15T00:00:00",
      "user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "pfc_detailed_category": "string"
    }
  ],
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>transactionsRulesRemove</summary>

<div>

Remove transaction rule.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>TransactionsRulesRemoveRequest</code> | Yes | Request to remove transaction rule. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TransactionsRulesRemoveResponse|error`

**Sample code:**

```ballerina
plaid:TransactionsRulesRemoveResponse result = check plaidClient->transactionsRulesRemove({
    ruleId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    clientUserId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>transactionsUserInsightsGet</summary>

<div>

Obtain user insights based on transactions sent through /transactions/enrich.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>TransactionsUserInsightsGetRequest</code> | Yes | Request to obtain user insights based on transactions sent through /transactions/enrich. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TransactionsUserInsightsGetResponse|error`

**Sample code:**

```ballerina
plaid:TransactionsUserInsightsGetResponse result = check plaidClient->transactionsUserInsightsGet({
    clientUserId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "user_data_overview": {
    "transaction_count": 1,
    "days_available": 1,
    "total_outflows": 100.00,
    "total_inflows": 100.00
  },
  "counterparty_insights": {
    "financial_institution_insights": [
      {
        "website": "string",
        "name": "Sample name",
        "detected_accounts": [
          {
            "account_type": "string",
            "account_subtype": "string",
            "transaction_count": 1,
            "total_outflows": 100.00,
            "total_inflows": 100.00
          }
        ]
      }
    ],
    "merchant_insights": [
      {
        "website": "string",
        "total_outflows": 100.00,
        "name": "Sample name",
        "transaction_count": 1,
        "total_inflows": 100.00,
        "personal_finance_category_primary": "string",
        "personal_finance_category_detailed": "string"
      }
    ]
  },
  "category_insights": {
    "primary_category_insights": [
      {
        "name": "Sample name",
        "transaction_count": 1,
        "total_outflows": 100.00,
        "total_inflows": 100.00
      }
    ],
    "detailed_category_insights": [
      {
        "name": "Sample name",
        "transaction_count": 1,
        "total_outflows": 100.00,
        "total_inflows": 100.00
      }
    ]
  },
  "recurring_transactions": {
    "inflow_streams": [
      {
        "stream_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "merchant_name": "Sample name",
        "average_days_apart": 100.00,
        "is_active": false
      }
    ],
    "outflow_streams": [
      {
        "stream_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "merchant_name": "Sample name",
        "average_days_apart": 100.00,
        "is_active": false
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>betaEwaReportV1Get</summary>

<div>

Get EWA Score Report.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BetaEwaReportV1GetRequest</code> | Yes | Request to get EWA Score Report. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `BetaEwaReportV1GetResponse|error`

**Sample code:**

```ballerina
plaid:BetaEwaReportV1GetResponse result = check plaidClient->betaEwaReportV1Get({
    accessToken: "string",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "ewa_report_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "generation_time": "string",
  "ewa_scores": [
    {
      "lowest_amount": 100.00,
      "highest_amount": 100.00,
      "score": 1
    }
  ]
}
```

</div>
</details>

<details>
<summary>betaIssuesV1Get</summary>

<div>

Get an issue.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BetaIssuesV1GetRequest</code> | Yes | Request to get an issue. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `BetaIssuesV1GetResponse|error`

**Sample code:**

```ballerina
plaid:BetaIssuesV1GetResponse result = check plaidClient->betaIssuesV1Get({
    issueId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "issue_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "issue_type": "ERROR",
  "severity": "CRITICAL",
  "institution_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "institution_name": "Sample name",
  "behaviors": [
    "NEW_CONNECTIONS_CANNOT_BE_ESTABLISHED"
  ],
  "issue_error_type": "string",
  "issue_error_code": "200",
  "description": "Sample description",
  "attribution": "USER",
  "status": "USER_ACTION_REQUIRED",
  "user_guidance": "string",
  "estimated_resolution_time": "string",
  "start_time": "string",
  "end_time": "string",
  "impact": {
    "affected_new_item_count": 1,
    "affected_existing_item_count": 1
  },
  "affected_products": [
    "assets"
  ],
  "resolution_log": [
    {
      "resolution_time": "string",
      "type": "MANUAL_RESOLUTION"
    }
  ],
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>betaIssuesV1List</summary>

<div>

List institution issues.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BetaIssuesV1ListRequest</code> | Yes | Request to list institution issues. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `BetaIssuesV1ListResponse|error`

**Sample code:**

```ballerina
plaid:BetaIssuesV1ListResponse result = check plaidClient->betaIssuesV1List({
    institutionId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "issues": [
    {
      "issue_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "issue_type": "ERROR",
      "severity": "CRITICAL",
      "institution_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "institution_name": "Sample name",
      "behaviors": [
        "NEW_CONNECTIONS_CANNOT_BE_ESTABLISHED"
      ],
      "issue_error_type": "string",
      "issue_error_code": "200",
      "description": "Sample description",
      "attribution": "USER",
      "status": "USER_ACTION_REQUIRED",
      "user_guidance": "string",
      "estimated_resolution_time": "string",
      "start_time": "string",
      "end_time": "string",
      "impact": {
        "affected_new_item_count": 1,
        "affected_existing_item_count": 1
      },
      "affected_products": [
        "assets"
      ],
      "resolution_log": [
        {
          "resolution_time": "string",
          "type": "MANUAL_RESOLUTION"
        }
      ]
    }
  ],
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>betaIssuesV1Match</summary>

<div>

Match an Item to issues.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BetaIssuesV1MatchRequest</code> | Yes | Request to match an Item to issues. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `BetaIssuesV1MatchResponse|error`

**Sample code:**

```ballerina
plaid:BetaIssuesV1MatchResponse result = check plaidClient->betaIssuesV1Match({
    identifier: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    identifierType: "ITEM_ID",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "item_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "issues": [
    {
      "issue_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "issue_type": "ERROR",
      "severity": "CRITICAL",
      "institution_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "institution_name": "Sample name",
      "behaviors": [
        "NEW_CONNECTIONS_CANNOT_BE_ESTABLISHED"
      ],
      "issue_error_type": "string",
      "issue_error_code": "200",
      "description": "Sample description",
      "attribution": "USER",
      "status": "USER_ACTION_REQUIRED",
      "user_guidance": "string",
      "estimated_resolution_time": "string",
      "start_time": "string",
      "end_time": "string",
      "impact": {
        "affected_new_item_count": 1,
        "affected_existing_item_count": 1
      },
      "affected_products": [
        "assets"
      ],
      "resolution_log": [
        {
          "resolution_time": "string",
          "type": "MANUAL_RESOLUTION"
        }
      ]
    }
  ],
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>betaIssuesV1Subscribe</summary>

<div>

Subscribe to an issue.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BetaIssuesV1SubscribeRequest</code> | Yes | Request to subscribe to an issue. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `BetaIssuesV1SubscribeResponse|error`

**Sample code:**

```ballerina
plaid:BetaIssuesV1SubscribeResponse result = check plaidClient->betaIssuesV1Subscribe({
    webhook: "string",
    issueId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>betaIssuesV1Unsubscribe</summary>

<div>

Unsubscribe from an issue.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BetaIssuesV1UnsubscribeRequest</code> | Yes | Request to unsubscribe from an issue. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `BetaIssuesV1UnsubscribeResponse|error`

**Sample code:**

```ballerina
plaid:BetaIssuesV1UnsubscribeResponse result = check plaidClient->betaIssuesV1Unsubscribe({
    issueId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>betaPartnerCustomerV1Create</summary>

<div>

Create a new end customer for a Plaid reseller (beta v1).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BetaPartnerCustomerV1CreateRequest</code> | Yes | Request to create a new end customer for a Plaid reseller. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `BetaPartnerCustomerV1CreateResponse|error`

**Sample code:**

```ballerina
plaid:BetaPartnerCustomerV1CreateResponse result = check plaidClient->betaPartnerCustomerV1Create({
    company_name: "Sample name",
    website: "string",
    application_name: "Sample name",
    customer_support_info: {
        email: "user@example.com",
        phone_number: "INV-0001",
        contact_url: "https://example.com/resource"
    },
    address: {
        city: "string",
        street: "string",
        region: "string"
    }
});
```

**Sample response:**

```json
{
  "end_customer": {
    "client_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "company_name": "Sample name",
    "status": "UNDER_REVIEW"
  },
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>betaPartnerCustomerV1Get</summary>

<div>

Retrieves the details of a Plaid reseller's end customer.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BetaPartnerCustomerV1GetRequest</code> | Yes | Request to retrieve the details of a Plaid reseller's end customer. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `BetaPartnerCustomerV1GetResponse|error`

**Sample code:**

```ballerina
plaid:BetaPartnerCustomerV1GetResponse result = check plaidClient->betaPartnerCustomerV1Get({
    end_customer_client_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    client_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string"
});
```

**Sample response:**

```json
{
  "end_customer": {
    "client_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "company_name": "Sample name",
    "status": "UNDER_REVIEW"
  },
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>betaPartnerCustomerV1Update</summary>

<div>

Updates an existing end customer.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BetaPartnerCustomerV1UpdateRequest</code> | Yes | Request to update an existing end customer. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `BetaPartnerCustomerV1UpdateResponse|error`

**Sample code:**

```ballerina
plaid:BetaPartnerCustomerV1UpdateResponse result = check plaidClient->betaPartnerCustomerV1Update({
    end_customer_client_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    client_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    legal_entity_name: "Sample name"
});
```

**Sample response:**

```json
{
  "end_customer": {
    "client_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "company_name": "Sample name",
    "status": "UNDER_REVIEW"
  },
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>betaPartnerCustomerV1Enable</summary>

<div>

Enable a Plaid reseller's end customer in Production (beta v1).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BetaPartnerCustomerV1EnableRequest</code> | Yes | Request to enable a Plaid reseller's end customer in the Production environment. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `BetaPartnerCustomerV1EnableResponse|error`

**Sample code:**

```ballerina
plaid:BetaPartnerCustomerV1EnableResponse result = check plaidClient->betaPartnerCustomerV1Enable({
    end_customer_client_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    client_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    products: ["assets"]
});
```

**Sample response:**

```json
{
  "end_customer_client_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "status": "UNDER_REVIEW",
  "production_secret": "string",
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

#### Webhook verification keys

<details>
<summary>webhookVerificationKeyGet</summary>

<div>

Get webhook verification key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>WebhookVerificationKeyGetRequest</code> | Yes | Request to get webhook verification key. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `WebhookVerificationKeyGetResponse|error`

**Sample code:**

```ballerina
plaid:WebhookVerificationKeyGetResponse result = check plaidClient->webhookVerificationKeyGet({
    keyId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "key": {
    "alg": "string",
    "crv": "string",
    "kid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "kty": "string",
    "use": "string",
    "x": "string",
    "y": "string",
    "created_at": 1,
    "expired_at": 1
  },
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

#### Liabilities

<details>
<summary>liabilitiesGet</summary>

<div>

Retrieve Liabilities data.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>LiabilitiesGetRequest</code> | Yes | Request to retrieve Liabilities data. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `LiabilitiesGetResponse|error`

**Sample code:**

```ballerina
plaid:LiabilitiesGetResponse result = check plaidClient->liabilitiesGet({
    accessToken: "string",
    options: {
        accountIds: ["3fa85f64-5717-4562-b3fc-2c963f66afa6"]
    },
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "accounts": [
    {
      "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "balances": {
        "available": 100.00,
        "current": 100.00,
        "limit": 100.00,
        "iso_currency_code": "200",
        "unofficial_currency_code": "200"
      },
      "mask": "string",
      "name": "Sample name",
      "official_name": "Sample name",
      "type": "investment",
      "subtype": "401a"
    }
  ],
  "item": {
    "item_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "webhook": "string",
    "error": {
      "error_type": "INVALID_REQUEST",
      "error_code": "200",
      "error_message": "string",
      "display_message": "string"
    },
    "available_products": [
      "assets"
    ],
    "billed_products": [
      "assets"
    ],
    "consent_expiration_time": "string",
    "update_type": "background"
  },
  "liabilities": {
    "credit": [
      {
        "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "aprs": [
          {
            "apr_percentage": 100.00,
            "apr_type": "balance_transfer_apr",
            "balance_subject_to_apr": 100.00,
            "interest_charge_amount": 100.00
          }
        ],
        "is_overdue": false,
        "last_payment_amount": 100.00,
        "last_payment_date": "2026-01-15T00:00:00",
        "last_statement_issue_date": "2026-01-15T00:00:00",
        "last_statement_balance": 100.00,
        "minimum_payment_amount": 100.00,
        "next_payment_due_date": "2026-01-15T00:00:00"
      }
    ],
    "mortgage": [
      {
        "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "account_number": "INV-0001",
        "current_late_fee": 100.00,
        "escrow_balance": 100.00,
        "has_pmi": false,
        "has_prepayment_penalty": false,
        "interest_rate": {
          "percentage": 100.00,
          "type": "string"
        },
        "last_payment_amount": 100.00,
        "last_payment_date": "2026-01-15T00:00:00",
        "loan_type_description": "Sample description",
        "loan_term": "string",
        "maturity_date": "2026-01-15T00:00:00",
        "next_monthly_payment": 100.00,
        "next_payment_due_date": "2026-01-15T00:00:00",
        "origination_date": "2026-01-15T00:00:00",
        "origination_principal_amount": 100.00,
        "past_due_amount": 100.00,
        "property_address": {
          "city": "string",
          "country": "string",
          "postal_code": "200",
          "region": "string",
          "street": "string"
        },
        "ytd_interest_paid": 100.00,
        "ytd_principal_paid": 100.00
      }
    ],
    "student": [
      {
        "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "account_number": "INV-0001",
        "disbursement_dates": [
          "2026-01-15T00:00:00"
        ],
        "expected_payoff_date": "2026-01-15T00:00:00",
        "guarantor": "string",
        "interest_rate_percentage": 100.00,
        "is_overdue": false,
        "last_payment_amount": 100.00,
        "last_payment_date": "2026-01-15T00:00:00",
        "last_statement_issue_date": "2026-01-15T00:00:00",
        "loan_name": "Sample name",
        "loan_status": {
          "end_date": "2026-01-15T00:00:00",
          "type": "cancelled"
        },
        "minimum_payment_amount": 100.00,
        "next_payment_due_date": "2026-01-15T00:00:00",
        "origination_date": "2026-01-15T00:00:00",
        "origination_principal_amount": 100.00,
        "outstanding_interest_amount": 100.00,
        "payment_reference_number": "INV-0001",
        "pslf_status": {
          "estimated_eligibility_date": "2026-01-15T00:00:00",
          "payments_made": 1,
          "payments_remaining": 1
        },
        "repayment_plan": {
          "description": "Sample description",
          "type": "extended graduated"
        },
        "sequence_number": "INV-0001",
        "servicer_address": {
          "city": "string",
          "region": "string",
          "street": "string",
          "postal_code": "200",
          "country": "string"
        },
        "ytd_interest_paid": 100.00,
        "ytd_principal_paid": 100.00
      }
    ]
  },
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

#### Payment initiation

<details>
<summary>paymentInitiationRecipientCreate</summary>

<div>

Create payment recipient.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>PaymentInitiationRecipientCreateRequest</code> | Yes | Request to create payment recipient. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PaymentInitiationRecipientCreateResponse|error`

**Sample code:**

```ballerina
plaid:PaymentInitiationRecipientCreateResponse result = check plaidClient->paymentInitiationRecipientCreate({
    name: "Sample name",
    bacs: {
        account: "string",
        sort_code: "200"
    },
    address: {
        street: ["string"],
        city: "string",
        postal_code: "200",
        country: "string"
    },
    iban: "string"
});
```

**Sample response:**

```json
{
  "recipient_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>paymentInitiationPaymentReverse</summary>

<div>

Reverse an existing payment.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>PaymentInitiationPaymentReverseRequest</code> | Yes | Request to reverse an existing payment. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PaymentInitiationPaymentReverseResponse|error`

**Sample code:**

```ballerina
plaid:PaymentInitiationPaymentReverseResponse result = check plaidClient->paymentInitiationPaymentReverse({
    reference: "REF-001",
    paymentId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    idempotencyKey: "string",
    counterpartyAddress: {
        street: ["string"],
        city: "string",
        postal_code: "200",
        country: "string"
    }
});
```

**Sample response:**

```json
{
  "refund_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "status": "AUTHORISING",
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>paymentInitiationRecipientGet</summary>

<div>

Get payment recipient.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>PaymentInitiationRecipientGetRequest</code> | Yes | Request to get payment recipient. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PaymentInitiationRecipientGetResponse|error`

**Sample code:**

```ballerina
plaid:PaymentInitiationRecipientGetResponse result = check plaidClient->paymentInitiationRecipientGet({
    recipientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "recipient_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "name": "Sample name",
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "address": {
    "street": [
      "string"
    ],
    "city": "string",
    "postal_code": "200",
    "country": "string"
  },
  "iban": "string",
  "bacs": {
    "account": "string",
    "sort_code": "200"
  }
}
```

</div>
</details>

<details>
<summary>paymentInitiationRecipientList</summary>

<div>

List payment recipients.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>PaymentInitiationRecipientListRequest</code> | Yes | Request to list payment recipients. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PaymentInitiationRecipientListResponse|error`

**Sample code:**

```ballerina
plaid:PaymentInitiationRecipientListResponse result = check plaidClient->paymentInitiationRecipientList({
    cursor: "string",
    count: 1,
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "recipients": [
    {
      "recipient_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "name": "Sample name",
      "address": {
        "street": [
          "string"
        ],
        "city": "string",
        "postal_code": "200",
        "country": "string"
      }
    }
  ],
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "next_cursor": "string"
}
```

</div>
</details>

<details>
<summary>paymentInitiationPaymentCreate</summary>

<div>

Create a payment.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>PaymentInitiationPaymentCreateRequest</code> | Yes | Request to create a payment. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PaymentInitiationPaymentCreateResponse|error`

**Sample code:**

```ballerina
plaid:PaymentInitiationPaymentCreateResponse result = check plaidClient->paymentInitiationPaymentCreate({
    reference: "REF-001",
    amount: {
        currency: "GBP",
        value: 100.00
    },
    recipientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    schedule: {
        interval_execution_day: 1,
        start_date: "2026-01-15T00:00:00",
        interval: "WEEKLY"
    }
});
```

**Sample response:**

```json
{
  "payment_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "status": "PAYMENT_STATUS_INPUT_NEEDED",
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>createPaymentToken</summary>

<div>

**Deprecated.** Create payment token.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>PaymentInitiationPaymentTokenCreateRequest</code> | Yes | Request to create payment token. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PaymentInitiationPaymentTokenCreateResponse|error`

**Sample code:**

```ballerina
plaid:PaymentInitiationPaymentTokenCreateResponse result = check plaidClient->createPaymentToken({
    paymentId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "payment_token": "string",
  "payment_token_expiration_time": "string",
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>paymentInitiationConsentCreate</summary>

<div>

Create payment consent.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>PaymentInitiationConsentCreateRequest</code> | Yes | Request to create payment consent. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PaymentInitiationConsentCreateResponse|error`

**Sample code:**

```ballerina
plaid:PaymentInitiationConsentCreateResponse result = check plaidClient->paymentInitiationConsentCreate({
    reference: "REF-001",
    constraints: {
        periodicAmounts: [{
            amount: {
                currency: "GBP",
                value: 100.00
            },
            interval: "DAY",
            alignment: "CALENDAR"
        }],
        maxPaymentAmount: {
            currency: "GBP",
            value: 100.00
        }
    },
    recipientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "consent_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "status": "UNAUTHORISED",
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>paymentInitiationConsentGet</summary>

<div>

Get payment consent.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>PaymentInitiationConsentGetRequest</code> | Yes | Request to get payment consent. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PaymentInitiationConsentGetResponse|error`

**Sample code:**

```ballerina
plaid:PaymentInitiationConsentGetResponse result = check plaidClient->paymentInitiationConsentGet({
    consentId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "consent_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "status": "UNAUTHORISED",
  "created_at": "string",
  "recipient_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "reference": "REF-001",
  "constraints": {
    "periodic_amounts": [
      {
        "amount": {
          "currency": "GBP",
          "value": 100.00
        },
        "interval": "DAY",
        "alignment": "CALENDAR"
      }
    ],
    "max_payment_amount": {
      "currency": "GBP",
      "value": 100.00
    }
  },
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>paymentInitiationConsentRevoke</summary>

<div>

Revoke payment consent.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>PaymentInitiationConsentRevokeRequest</code> | Yes | Request to revoke payment consent. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PaymentInitiationConsentRevokeResponse|error`

**Sample code:**

```ballerina
plaid:PaymentInitiationConsentRevokeResponse result = check plaidClient->paymentInitiationConsentRevoke({
    consentId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>paymentInitiationConsentPaymentExecute</summary>

<div>

Execute a single payment using consent.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>PaymentInitiationConsentPaymentExecuteRequest</code> | Yes | Request to execute a single payment using consent. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PaymentInitiationConsentPaymentExecuteResponse|error`

**Sample code:**

```ballerina
plaid:PaymentInitiationConsentPaymentExecuteResponse result = check plaidClient->paymentInitiationConsentPaymentExecute({
    amount: {
        currency: "GBP",
        value: 100.00
    },
    idempotencyKey: "string",
    consentId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    reference: "REF-001"
});
```

**Sample response:**

```json
{
  "payment_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "status": "PAYMENT_STATUS_INPUT_NEEDED",
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "error": {
    "error_type": "INVALID_REQUEST",
    "error_code": "200",
    "error_message": "string",
    "display_message": "string"
  }
}
```

</div>
</details>

<details>
<summary>paymentInitiationPaymentGet</summary>

<div>

Get payment details.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>PaymentInitiationPaymentGetRequest</code> | Yes | Request to get payment details. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PaymentInitiationPaymentGetResponse|error`

**Sample code:**

```ballerina
plaid:PaymentInitiationPaymentGetResponse result = check plaidClient->paymentInitiationPaymentGet({
    paymentId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "payment_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "amount": {
    "currency": "GBP",
    "value": 100.00
  },
  "status": "PAYMENT_STATUS_INPUT_NEEDED",
  "recipient_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "reference": "REF-001",
  "last_status_update": "2026-01-15T00:00:00",
  "bacs": {
    "account": "string",
    "sort_code": "200"
  },
  "iban": "string",
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>paymentInitiationPaymentList</summary>

<div>

List payments.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>PaymentInitiationPaymentListRequest</code> | Yes | Request to list payments. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PaymentInitiationPaymentListResponse|error`

**Sample code:**

```ballerina
plaid:PaymentInitiationPaymentListResponse result = check plaidClient->paymentInitiationPaymentList({
    cursor: "string",
    count: 1,
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "payments": [
    {
      "payment_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "amount": {
        "currency": "GBP",
        "value": 100.00
      },
      "status": "PAYMENT_STATUS_INPUT_NEEDED",
      "recipient_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "reference": "REF-001",
      "last_status_update": "2026-01-15T00:00:00",
      "bacs": {},
      "iban": "string"
    }
  ],
  "next_cursor": "string",
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

#### Investments

<details>
<summary>investmentsHoldingsGet</summary>

<div>

Get Investment holdings.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>InvestmentsHoldingsGetRequest</code> | Yes | Request to get Investment holdings. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `InvestmentsHoldingsGetResponse|error`

**Sample code:**

```ballerina
plaid:InvestmentsHoldingsGetResponse result = check plaidClient->investmentsHoldingsGet({
    accessToken: "string",
    options: {
        accountIds: ["3fa85f64-5717-4562-b3fc-2c963f66afa6"]
    },
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "accounts": [
    {
      "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "balances": {
        "available": 100.00,
        "current": 100.00,
        "limit": 100.00,
        "iso_currency_code": "200",
        "unofficial_currency_code": "200",
        "margin_loan_amount": 100.00
      },
      "mask": "string",
      "name": "Sample name",
      "official_name": "Sample name",
      "type": "investment",
      "subtype": "401a"
    }
  ],
  "holdings": [
    {
      "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "security_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "institution_price": 100.00,
      "institution_value": 100.00,
      "cost_basis": 100.00,
      "quantity": 100.00,
      "iso_currency_code": "200",
      "unofficial_currency_code": "200"
    }
  ],
  "securities": [
    {
      "security_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "isin": "string",
      "cusip": "string",
      "sedol": "string",
      "institution_security_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "institution_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "proxy_security_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "name": "Sample name",
      "ticker_symbol": "string",
      "is_cash_equivalent": false,
      "type": "string",
      "close_price": 100.00,
      "close_price_as_of": "string",
      "iso_currency_code": "200",
      "unofficial_currency_code": "200",
      "market_identifier_code": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "sector": "string",
      "industry": "string",
      "cfi_code": "200",
      "figi": "string",
      "option_contract": {
        "contract_type": "string",
        "expiration_date": "2026-01-15T00:00:00",
        "strike_price": 100.00,
        "underlying_security_ticker": "string"
      },
      "fixed_income": {
        "yield_rate": {
          "percentage": 100.00,
          "type": "coupon"
        },
        "maturity_date": "2026-01-15T00:00:00",
        "issue_date": "2026-01-15T00:00:00",
        "face_value": 100.00
      }
    }
  ],
  "item": {
    "item_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "webhook": "string",
    "error": {
      "error_type": "INVALID_REQUEST",
      "error_code": "200",
      "error_message": "string",
      "display_message": "string"
    },
    "available_products": [
      "assets"
    ],
    "billed_products": [
      "assets"
    ],
    "consent_expiration_time": "string",
    "update_type": "background"
  },
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "is_investments_fallback_item": false
}
```

</div>
</details>

<details>
<summary>investmentsTransactionsGet</summary>

<div>

Get investment transactions.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>InvestmentsTransactionsGetRequest</code> | Yes | Request to get investment transactions. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `InvestmentsTransactionsGetResponse|error`

**Sample code:**

```ballerina
plaid:InvestmentsTransactionsGetResponse result = check plaidClient->investmentsTransactionsGet({
    accessToken: "string",
    endDate: "2026-01-15T00:00:00",
    startDate: "2026-01-15T00:00:00",
    options: {
        asyncUpdate: false,
        accountIds: ["3fa85f64-5717-4562-b3fc-2c963f66afa6"],
        offset: 1
    }
});
```

**Sample response:**

```json
{
  "item": {
    "item_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "webhook": "string",
    "error": {
      "error_type": "INVALID_REQUEST",
      "error_code": "200",
      "error_message": "string",
      "display_message": "string"
    },
    "available_products": [
      "assets"
    ],
    "billed_products": [
      "assets"
    ],
    "consent_expiration_time": "string",
    "update_type": "background"
  },
  "accounts": [
    {
      "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "balances": {
        "available": 100.00,
        "current": 100.00,
        "limit": 100.00,
        "iso_currency_code": "200",
        "unofficial_currency_code": "200",
        "margin_loan_amount": 100.00
      },
      "mask": "string",
      "name": "Sample name",
      "official_name": "Sample name",
      "type": "investment",
      "subtype": "401a"
    }
  ],
  "securities": [
    {
      "security_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "isin": "string",
      "cusip": "string",
      "sedol": "string",
      "institution_security_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "institution_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "proxy_security_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "name": "Sample name",
      "ticker_symbol": "string",
      "is_cash_equivalent": false,
      "type": "string",
      "close_price": 100.00,
      "close_price_as_of": "string",
      "iso_currency_code": "200",
      "unofficial_currency_code": "200",
      "market_identifier_code": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "sector": "string",
      "industry": "string",
      "cfi_code": "200",
      "figi": "string",
      "option_contract": {
        "contract_type": "string",
        "expiration_date": "2026-01-15T00:00:00",
        "strike_price": 100.00,
        "underlying_security_ticker": "string"
      },
      "fixed_income": {
        "yield_rate": {
          "percentage": 100.00,
          "type": "coupon"
        },
        "maturity_date": "2026-01-15T00:00:00",
        "issue_date": "2026-01-15T00:00:00",
        "face_value": 100.00
      }
    }
  ],
  "investment_transactions": [
    {
      "investment_transaction_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "security_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "date": "2026-01-15T00:00:00",
      "name": "Sample name",
      "quantity": 100.00,
      "amount": 100.00,
      "price": 100.00,
      "fees": 100.00,
      "type": "buy",
      "subtype": "account fee",
      "iso_currency_code": "200",
      "unofficial_currency_code": "200"
    }
  ],
  "total_investment_transactions": 1,
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>investmentsRefresh</summary>

<div>

Refresh investment data.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>InvestmentsRefreshRequest</code> | Yes | Request to refresh investment data. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `InvestmentsRefreshResponse|error`

**Sample code:**

```ballerina
plaid:InvestmentsRefreshResponse result = check plaidClient->investmentsRefresh({
    accessToken: "string",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>investmentsAuthGet</summary>

<div>

Get data needed to authorize an investments transfer.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>InvestmentsAuthGetRequest</code> | Yes | Request to get data needed to authorize an investments transfer. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `InvestmentsAuthGetResponse|error`

**Sample code:**

```ballerina
plaid:InvestmentsAuthGetResponse result = check plaidClient->investmentsAuthGet({
    accessToken: "string",
    options: {
        accountIds: ["3fa85f64-5717-4562-b3fc-2c963f66afa6"]
    },
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "accounts": [
    {
      "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "balances": {
        "available": 100.00,
        "current": 100.00,
        "limit": 100.00,
        "iso_currency_code": "200",
        "unofficial_currency_code": "200",
        "margin_loan_amount": 100.00
      },
      "mask": "string",
      "name": "Sample name",
      "official_name": "Sample name",
      "type": "investment",
      "subtype": "401a"
    }
  ],
  "holdings": [
    {
      "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "security_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "institution_price": 100.00,
      "institution_value": 100.00,
      "cost_basis": 100.00,
      "quantity": 100.00,
      "iso_currency_code": "200",
      "unofficial_currency_code": "200"
    }
  ],
  "securities": [
    {
      "security_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "isin": "string",
      "cusip": "string",
      "sedol": "string",
      "institution_security_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "institution_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "proxy_security_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "name": "Sample name",
      "ticker_symbol": "string",
      "is_cash_equivalent": false,
      "type": "string",
      "close_price": 100.00,
      "close_price_as_of": "string",
      "iso_currency_code": "200",
      "unofficial_currency_code": "200",
      "market_identifier_code": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "sector": "string",
      "industry": "string",
      "cfi_code": "200",
      "figi": "string",
      "option_contract": {
        "contract_type": "string",
        "expiration_date": "2026-01-15T00:00:00",
        "strike_price": 100.00,
        "underlying_security_ticker": "string"
      },
      "fixed_income": {
        "yield_rate": {
          "percentage": 100.00,
          "type": "coupon"
        },
        "maturity_date": "2026-01-15T00:00:00",
        "issue_date": "2026-01-15T00:00:00",
        "face_value": 100.00
      }
    }
  ],
  "owners": [
    {
      "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "names": [
        "string"
      ]
    }
  ],
  "numbers": {
    "acats": [
      {
        "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "account": "string",
        "dtc_numbers": [
          "INV-0001"
        ]
      }
    ],
    "aton": [
      {
        "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "account": "string"
      }
    ],
    "retirement_401k": [
      {
        "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
      }
    ]
  },
  "data_sources": {
    "numbers": "INSTITUTION",
    "owners": "INSTITUTION",
    "holdings": "INSTITUTION"
  },
  "item": {
    "item_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "webhook": "string",
    "error": {
      "error_type": "INVALID_REQUEST",
      "error_code": "200",
      "error_message": "string",
      "display_message": "string"
    },
    "available_products": [
      "assets"
    ],
    "billed_products": [
      "assets"
    ],
    "consent_expiration_time": "string",
    "update_type": "background"
  },
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

#### Link

<details>
<summary>linkTokenCreate</summary>

<div>

Create Link Token.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>LinkTokenCreateRequest</code> | Yes | Request to create Link Token. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `LinkTokenCreateResponse|error`

**Sample code:**

```ballerina
plaid:LinkTokenCreateResponse result = check plaidClient->linkTokenCreate({
    language: "string",
    countryCodes: ["US"],
    clientName: "Sample name",
    webhook: "string"
});
```

**Sample response:**

```json
{
  "link_token": "string",
  "expiration": "string",
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "hosted_link_url": "https://example.com/resource",
  "user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>linkTokenGet</summary>

<div>

Get Link Token.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>LinkTokenGetRequest</code> | Yes | Request to get Link Token. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `LinkTokenGetResponse|error`

**Sample code:**

```ballerina
plaid:LinkTokenGetResponse result = check plaidClient->linkTokenGet({
    linkToken: "string",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "link_token": "string",
  "created_at": "string",
  "expiration": "string",
  "metadata": {
    "initial_products": [
      "assets"
    ],
    "webhook": "string",
    "country_codes": [
      "US"
    ],
    "language": "string",
    "redirect_uri": "string",
    "client_name": "Sample name"
  },
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "link_sessions": [
    {
      "link_session_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "started_at": "string",
      "finished_at": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>linkOauthCorrelationIdExchange</summary>

<div>

Exchange the Link Correlation ID for a Link Token.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>LinkOAuthCorrelationIdExchangeRequest</code> | Yes | Request to exchange the Link Correlation ID for a Link Token. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `LinkOAuthCorrelationIdExchangeResponse|error`

**Sample code:**

```ballerina
plaid:LinkOAuthCorrelationIdExchangeResponse result = check plaidClient->linkOauthCorrelationIdExchange({
    linkCorrelationId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "link_token": "string",
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

#### Session

<details>
<summary>sessionTokenCreate</summary>

<div>

Create a Link token for Layer.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>SessionTokenCreateRequest</code> | Yes | Request to create a Link token for Layer. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `SessionTokenCreateResponse|error`

**Sample code:**

```ballerina
plaid:SessionTokenCreateResponse result = check plaidClient->sessionTokenCreate({
    templateId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    androidPackageName: "Sample name",
    webhook: "string",
    userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "link": {
    "link_token": "string",
    "expiration": "string",
    "user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  }
}
```

</div>
</details>

#### Transfer

<details>
<summary>transferGet</summary>

<div>

Retrieve a transfer.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>TransferGetRequest</code> | Yes | Request to retrieve a transfer. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TransferGetResponse|error`

**Sample code:**

```ballerina
plaid:TransferGetResponse result = check plaidClient->transferGet({
    originatorClientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    authorizationId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    transferId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "transfer": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "authorization_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "funding_account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "debit",
    "user": {
      "legal_name": "Sample name",
      "phone_number": "INV-0001",
      "email_address": "user@example.com",
      "address": {
        "street": "string",
        "city": "string",
        "region": "string",
        "postal_code": "200",
        "country": "string"
      }
    },
    "amount": "string",
    "description": "Sample description",
    "created": "string",
    "status": "pending",
    "network": "ach",
    "cancellable": false,
    "failure_reason": {},
    "metadata": {},
    "origination_account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "guarantee_decision": "GUARANTEED",
    "guarantee_decision_rationale": {
      "code": "RETURN_BANK",
      "description": "Sample description"
    },
    "iso_currency_code": "200",
    "standard_return_window": "string",
    "unauthorized_return_window": "string",
    "expected_settlement_date": "2026-01-15T00:00:00",
    "originator_client_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "refunds": [
      {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "transfer_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "amount": "string",
        "status": "pending",
        "failure_reason": {},
        "created": "string"
      }
    ],
    "recurring_transfer_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "credit_funds_source": "sweep"
  },
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>transferRecurringGet</summary>

<div>

Retrieve a recurring transfer.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>TransferRecurringGetRequest</code> | Yes | Request to retrieve a recurring transfer. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TransferRecurringGetResponse|error`

**Sample code:**

```ballerina
plaid:TransferRecurringGetResponse result = check plaidClient->transferRecurringGet({
    recurringTransferId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "recurring_transfer": {
    "recurring_transfer_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "created": "string",
    "next_origination_date": "2026-01-15T00:00:00",
    "type": "debit",
    "amount": "string",
    "status": "active",
    "network": "ach",
    "origination_account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "funding_account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "iso_currency_code": "200",
    "description": "Sample description",
    "transfer_ids": [
      "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    ],
    "user": {
      "legal_name": "Sample name",
      "phone_number": "INV-0001",
      "email_address": "user@example.com",
      "address": {
        "street": "string",
        "city": "string",
        "region": "string",
        "postal_code": "200",
        "country": "string"
      }
    },
    "schedule": {
      "interval_count": 1,
      "interval_unit": "week",
      "interval_execution_day": 1,
      "start_date": "2026-01-15T00:00:00"
    }
  },
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>transferAuthorizationCreate</summary>

<div>

Create a transfer authorization.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>TransferAuthorizationCreateRequest</code> | Yes | Request to create a transfer authorization. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TransferAuthorizationCreateResponse|error`

**Sample code:**

```ballerina
plaid:TransferAuthorizationCreateResponse result = check plaidClient->transferAuthorizationCreate({
    'type: "debit",
    network: "ach",
    amount: "string",
    accessToken: "string",
    accountId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    user: {
        legalName: "Sample name",
        emailAddress: "user@example.com",
        phoneNumber: "INV-0001"
    }
});
```

**Sample response:**

```json
{
  "authorization": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "created": "string",
    "decision": "approved",
    "decision_rationale": {
      "code": "NSF",
      "description": "Sample description"
    },
    "guarantee_decision": "GUARANTEED",
    "guarantee_decision_rationale": {
      "code": "RETURN_BANK",
      "description": "Sample description"
    },
    "payment_risk": {
      "bank_initiated_return_score": 1,
      "customer_initiated_return_score": 1,
      "risk_level": "HIGH_RISK",
      "warnings": [
        {}
      ]
    },
    "proposed_transfer": {
      "funding_account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "type": "debit",
      "user": {
        "legal_name": "Sample name",
        "phone_number": "INV-0001",
        "email_address": "user@example.com",
        "address": {
          "street": "string",
          "city": "string",
          "region": "string",
          "postal_code": "200",
          "country": "string"
        }
      },
      "amount": "string",
      "requested_amount": "string",
      "network": "string",
      "origination_account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "iso_currency_code": "200",
      "originator_client_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "credit_funds_source": "sweep"
    }
  },
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>transferAuthorizationCancel</summary>

<div>

Cancel a transfer authorization.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>TransferAuthorizationCancelRequest</code> | Yes | Request to cancel a transfer authorization. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TransferAuthorizationCancelResponse|error`

**Sample code:**

```ballerina
plaid:TransferAuthorizationCancelResponse result = check plaidClient->transferAuthorizationCancel({
    authorizationId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>transferBalanceGet</summary>

<div>

**Deprecated.** (Deprecated) Retrieve a balance held with Plaid.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>TransferBalanceGetRequest</code> | Yes | Request to retrieve a balance held with Plaid. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TransferBalanceGetResponse|error`

**Sample code:**

```ballerina
plaid:TransferBalanceGetResponse result = check plaidClient->transferBalanceGet({
    originatorClientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    'type: "prefunded_rtp_credits",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "balance": {
    "available": "string",
    "type": "prefunded_rtp_credits",
    "current": "string"
  },
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>transferCapabilitiesGet</summary>

<div>

Get RTP eligibility information of a transfer.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>TransferCapabilitiesGetRequest</code> | Yes | Request to get RTP eligibility information of a transfer. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TransferCapabilitiesGetResponse|error`

**Sample code:**

```ballerina
plaid:TransferCapabilitiesGetResponse result = check plaidClient->transferCapabilitiesGet({
    accessToken: "string",
    accountId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    paymentProfileToken: "string",
    secret: "string"
});
```

**Sample response:**

```json
{
  "institution_supported_networks": {
    "rtp": {},
    "rfp": {}
  },
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>transferConfigurationGet</summary>

<div>

Get transfer product configuration.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>TransferConfigurationGetRequest</code> | Yes | Request to get transfer product configuration. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TransferConfigurationGetResponse|error`

**Sample code:**

```ballerina
plaid:TransferConfigurationGetResponse result = check plaidClient->transferConfigurationGet({
    originatorClientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "max_single_transfer_amount": "string",
  "max_single_transfer_credit_amount": "string",
  "max_single_transfer_debit_amount": "string",
  "max_daily_credit_amount": "string",
  "max_daily_debit_amount": "string",
  "max_monthly_amount": "string",
  "max_monthly_credit_amount": "string",
  "max_monthly_debit_amount": "string",
  "iso_currency_code": "200"
}
```

</div>
</details>

<details>
<summary>transferLedgerGet</summary>

<div>

Retrieve Plaid Ledger balance.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>TransferLedgerGetRequest</code> | Yes | Request to retrieve Plaid Ledger balance. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TransferLedgerGetResponse|error`

**Sample code:**

```ballerina
plaid:TransferLedgerGetResponse result = check plaidClient->transferLedgerGet({
    originatorClientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    ledgerId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "ledger_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "balance": {
    "available": "string",
    "pending": "string"
  },
  "name": "Sample name",
  "is_default": false,
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>transferLedgerDistribute</summary>

<div>

Move available balance between ledgers.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>TransferLedgerDistributeRequest</code> | Yes | Request to move available balance between ledgers. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TransferLedgerDistributeResponse|error`

**Sample code:**

```ballerina
plaid:TransferLedgerDistributeResponse result = check plaidClient->transferLedgerDistribute({
    amount: "string",
    fromLedgerId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    toLedgerId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    idempotencyKey: "string"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>transferLedgerDeposit</summary>

<div>

Deposit funds into a Plaid Ledger balance.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>TransferLedgerDepositRequest</code> | Yes | Request to deposit funds into a Plaid Ledger balance. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TransferLedgerDepositResponse|error`

**Sample code:**

```ballerina
plaid:TransferLedgerDepositResponse result = check plaidClient->transferLedgerDeposit({
    amount: "string",
    idempotencyKey: "string",
    network: "ach",
    fundingAccountId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "sweep": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "funding_account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "created": "string",
    "amount": "string",
    "iso_currency_code": "200",
    "settled": "string"
  },
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>transferLedgerWithdraw</summary>

<div>

Withdraw funds from a Plaid Ledger balance.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>TransferLedgerWithdrawRequest</code> | Yes | Request to withdraw funds from a Plaid Ledger balance. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TransferLedgerWithdrawResponse|error`

**Sample code:**

```ballerina
plaid:TransferLedgerWithdrawResponse result = check plaidClient->transferLedgerWithdraw({
    amount: "string",
    idempotencyKey: "string",
    network: "ach",
    fundingAccountId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "sweep": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "funding_account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "created": "string",
    "amount": "string",
    "iso_currency_code": "200",
    "settled": "string"
  },
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>transferOriginatorFundingAccountUpdate</summary>

<div>

Update the funding account associated with the originator.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>TransferOriginatorFundingAccountUpdateRequest</code> | Yes | Request to update the funding account associated with the originator. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TransferOriginatorFundingAccountUpdateResponse|error`

**Sample code:**

```ballerina
plaid:TransferOriginatorFundingAccountUpdateResponse result = check plaidClient->transferOriginatorFundingAccountUpdate({
    originatorClientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    fundingAccount: {
        accessToken: "string",
        accountId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    },
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>transferOriginatorFundingAccountCreate</summary>

<div>

Create a new funding account for an originator.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>TransferOriginatorFundingAccountCreateRequest</code> | Yes | Request to create a new funding account for an originator. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TransferOriginatorFundingAccountCreateResponse|error`

**Sample code:**

```ballerina
plaid:TransferOriginatorFundingAccountCreateResponse result = check plaidClient->transferOriginatorFundingAccountCreate({
    originatorClientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    fundingAccount: {
        accessToken: "string",
        accountId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        displayName: "Sample name"
    },
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "funding_account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>transferMetricsGet</summary>

<div>

Get transfer product usage metrics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>TransferMetricsGetRequest</code> | Yes | Request to get transfer product usage metrics. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TransferMetricsGetResponse|error`

**Sample code:**

```ballerina
plaid:TransferMetricsGetResponse result = check plaidClient->transferMetricsGet({
    originatorClientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "daily_debit_transfer_volume": "string",
  "daily_credit_transfer_volume": "string",
  "monthly_transfer_volume": "string",
  "monthly_debit_transfer_volume": "string",
  "monthly_credit_transfer_volume": "string",
  "iso_currency_code": "200"
}
```

</div>
</details>

<details>
<summary>transferCreate</summary>

<div>

Create a transfer.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>TransferCreateRequest</code> | Yes | Request to create a transfer. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TransferCreateResponse|error`

**Sample code:**

```ballerina
plaid:TransferCreateResponse result = check plaidClient->transferCreate({
    authorizationId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    description: "Sample description",
    accessToken: "string",
    accountId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "transfer": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "authorization_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "funding_account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "debit",
    "user": {
      "legal_name": "Sample name",
      "phone_number": "INV-0001",
      "email_address": "user@example.com",
      "address": {
        "street": "string",
        "city": "string",
        "region": "string",
        "postal_code": "200",
        "country": "string"
      }
    },
    "amount": "string",
    "description": "Sample description",
    "created": "string",
    "status": "pending",
    "network": "ach",
    "cancellable": false,
    "failure_reason": {},
    "metadata": {},
    "origination_account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "guarantee_decision": "GUARANTEED",
    "guarantee_decision_rationale": {
      "code": "RETURN_BANK",
      "description": "Sample description"
    },
    "iso_currency_code": "200",
    "standard_return_window": "string",
    "unauthorized_return_window": "string",
    "expected_settlement_date": "2026-01-15T00:00:00",
    "originator_client_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "refunds": [
      {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "transfer_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "amount": "string",
        "status": "pending",
        "failure_reason": {},
        "created": "string"
      }
    ],
    "recurring_transfer_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "credit_funds_source": "sweep"
  },
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>transferRecurringCreate</summary>

<div>

Create a recurring transfer.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>TransferRecurringCreateRequest</code> | Yes | Request to create a recurring transfer. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TransferRecurringCreateResponse|error`

**Sample code:**

```ballerina
plaid:TransferRecurringCreateResponse result = check plaidClient->transferRecurringCreate({
    amount: "string",
    description: "Sample description",
    'type: "debit",
    network: "ach",
    accessToken: "string",
    schedule: {
        intervalCount: 1,
        intervalUnit: "week",
        intervalExecutionDay: 1,
        startDate: "2026-01-15T00:00:00"
    },
    accountId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    idempotencyKey: "string",
    user: {
        legalName: "Sample name",
        emailAddress: "user@example.com",
        phoneNumber: "INV-0001"
    }
});
```

**Sample response:**

```json
{
  "decision": "approved",
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "recurring_transfer": {
    "recurring_transfer_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "created": "string",
    "next_origination_date": "2026-01-15T00:00:00",
    "type": "debit",
    "amount": "string",
    "status": "active",
    "network": "ach",
    "origination_account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "funding_account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "iso_currency_code": "200",
    "description": "Sample description",
    "transfer_ids": [
      "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    ],
    "user": {
      "legal_name": "Sample name",
      "phone_number": "INV-0001",
      "email_address": "user@example.com",
      "address": {
        "street": "string",
        "city": "string",
        "region": "string",
        "postal_code": "200",
        "country": "string"
      }
    },
    "schedule": {
      "interval_count": 1,
      "interval_unit": "week",
      "interval_execution_day": 1,
      "start_date": "2026-01-15T00:00:00"
    }
  },
  "decision_rationale": {
    "code": "NSF",
    "description": "Sample description"
  }
}
```

</div>
</details>

<details>
<summary>transferList</summary>

<div>

List transfers.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>TransferListRequest</code> | Yes | Request to list transfers. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TransferListResponse|error`

**Sample code:**

```ballerina
plaid:TransferListResponse result = check plaidClient->transferList({
    endDate: "2026-01-15T00:00:00",
    fundingAccountId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    originatorClientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    offset: 1
});
```

**Sample response:**

```json
{
  "transfers": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "authorization_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "funding_account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "type": "debit",
      "user": {
        "legal_name": "Sample name",
        "phone_number": "INV-0001",
        "email_address": "user@example.com",
        "address": {
          "street": "string",
          "city": "string",
          "region": "string",
          "postal_code": "200",
          "country": "string"
        }
      },
      "amount": "string",
      "description": "Sample description",
      "created": "string",
      "status": "pending",
      "network": "ach",
      "cancellable": false,
      "failure_reason": {},
      "metadata": {},
      "origination_account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "guarantee_decision": "GUARANTEED",
      "guarantee_decision_rationale": {
        "code": "RETURN_BANK",
        "description": "Sample description"
      },
      "iso_currency_code": "200",
      "standard_return_window": "string",
      "unauthorized_return_window": "string",
      "expected_settlement_date": "2026-01-15T00:00:00",
      "originator_client_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "refunds": [
        {
          "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "transfer_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "amount": "string",
          "status": "pending",
          "failure_reason": {},
          "created": "string"
        }
      ],
      "recurring_transfer_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "credit_funds_source": "sweep"
    }
  ],
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>transferRecurringList</summary>

<div>

List recurring transfers.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>TransferRecurringListRequest</code> | Yes | Request to list recurring transfers. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TransferRecurringListResponse|error`

**Sample code:**

```ballerina
plaid:TransferRecurringListResponse result = check plaidClient->transferRecurringList({
    fundingAccountId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    startTime: "string",
    offset: 1,
    endTime: "string"
});
```

**Sample response:**

```json
{
  "recurring_transfers": [
    {
      "recurring_transfer_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "created": "string",
      "next_origination_date": "2026-01-15T00:00:00",
      "type": "debit",
      "amount": "string",
      "status": "active",
      "network": "ach",
      "origination_account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "funding_account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "iso_currency_code": "200",
      "description": "Sample description",
      "transfer_ids": [
        "3fa85f64-5717-4562-b3fc-2c963f66afa6"
      ],
      "user": {
        "legal_name": "Sample name",
        "phone_number": "INV-0001",
        "email_address": "user@example.com",
        "address": {
          "street": "string",
          "city": "string",
          "region": "string",
          "postal_code": "200",
          "country": "string"
        }
      },
      "schedule": {
        "interval_count": 1,
        "interval_unit": "week",
        "interval_execution_day": 1,
        "start_date": "2026-01-15T00:00:00"
      }
    }
  ],
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>transferCancel</summary>

<div>

Cancel a transfer.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>TransferCancelRequest</code> | Yes | Request to cancel a transfer. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TransferCancelResponse|error`

**Sample code:**

```ballerina
plaid:TransferCancelResponse result = check plaidClient->transferCancel({
    transferId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    reasonCode: "AC03",
    originatorClientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>transferRecurringCancel</summary>

<div>

Cancel a recurring transfer.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>TransferRecurringCancelRequest</code> | Yes | Request to cancel a recurring transfer. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TransferRecurringCancelResponse|error`

**Sample code:**

```ballerina
plaid:TransferRecurringCancelResponse result = check plaidClient->transferRecurringCancel({
    recurringTransferId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>transferEventList</summary>

<div>

List transfer events.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>TransferEventListRequest</code> | Yes | Request to list transfer events. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TransferEventListResponse|error`

**Sample code:**

```ballerina
plaid:TransferEventListResponse result = check plaidClient->transferEventList({
    endDate: "2026-01-15T00:00:00",
    offset: 1,
    sweepId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    count: 1
});
```

**Sample response:**

```json
{
  "transfer_events": [
    {
      "event_id": 1,
      "timestamp": "string",
      "event_type": "pending",
      "funding_account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "transfer_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "origination_account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "failure_reason": {},
      "sweep_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "sweep_amount": "string",
      "refund_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "originator_client_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ],
  "has_more": false,
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>transferLedgerEventList</summary>

<div>

List transfer ledger events.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>TransferLedgerEventListRequest</code> | Yes | Request to list transfer ledger events. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TransferLedgerEventListResponse|error`

**Sample code:**

```ballerina
plaid:TransferLedgerEventListResponse result = check plaidClient->transferLedgerEventList({
    endDate: "2026-01-15T00:00:00",
    originatorClientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    offset: 1,
    ledgerEventId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "ledger_events": [
    {
      "ledger_event_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "ledger_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "amount": "string",
      "description": "Sample description",
      "pending_balance": "string",
      "available_balance": "string",
      "type": "string",
      "timestamp": "string"
    }
  ],
  "has_more": false,
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>transferEventSync</summary>

<div>

Sync transfer events.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>TransferEventSyncRequest</code> | Yes | Request to sync transfer events. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TransferEventSyncResponse|error`

**Sample code:**

```ballerina
plaid:TransferEventSyncResponse result = check plaidClient->transferEventSync({
    afterId: 1,
    count: 1,
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "transfer_events": [
    {
      "event_id": 1,
      "timestamp": "string",
      "event_type": "pending",
      "funding_account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "transfer_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "origination_account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "failure_reason": {},
      "sweep_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "sweep_amount": "string",
      "refund_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "originator_client_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ],
  "has_more": false,
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>transferSweepGet</summary>

<div>

Retrieve a sweep.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>TransferSweepGetRequest</code> | Yes | Request to retrieve a sweep. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TransferSweepGetResponse|error`

**Sample code:**

```ballerina
plaid:TransferSweepGetResponse result = check plaidClient->transferSweepGet({
    sweepId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "sweep": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "funding_account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "created": "string",
    "amount": "string",
    "iso_currency_code": "200",
    "settled": "string"
  },
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>transferSweepList</summary>

<div>

List sweeps.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>TransferSweepListRequest</code> | Yes | Request to list sweeps. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TransferSweepListResponse|error`

**Sample code:**

```ballerina
plaid:TransferSweepListResponse result = check plaidClient->transferSweepList({
    endDate: "2026-01-15T00:00:00",
    fundingAccountId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    amount: "string",
    originatorClientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "sweeps": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "funding_account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "created": "string",
      "amount": "string",
      "iso_currency_code": "200",
      "settled": "string"
    }
  ],
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>transferMigrateAccount</summary>

<div>

Migrate account into Transfers.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>TransferMigrateAccountRequest</code> | Yes | Request to migrate account into Transfers. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TransferMigrateAccountResponse|error`

**Sample code:**

```ballerina
plaid:TransferMigrateAccountResponse result = check plaidClient->transferMigrateAccount({
    accountNumber: "INV-0001",
    accountType: "string",
    routingNumber: "INV-0001",
    wireRoutingNumber: "INV-0001"
});
```

**Sample response:**

```json
{
  "access_token": "string",
  "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>transferIntentCreate</summary>

<div>

Create a transfer intent object to invoke the Transfer UI.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>TransferIntentCreateRequest</code> | Yes | Request to create a transfer intent object to invoke the Transfer UI. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TransferIntentCreateResponse|error`

**Sample code:**

```ballerina
plaid:TransferIntentCreateResponse result = check plaidClient->transferIntentCreate({
    amount: "string",
    description: "Sample description",
    mode: "PAYMENT",
    user: {
        legalName: "Sample name",
        emailAddress: "user@example.com",
        phoneNumber: "INV-0001"
    }
});
```

**Sample response:**

```json
{
  "transfer_intent": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "created": "string",
    "status": "PENDING",
    "origination_account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "funding_account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "amount": "string",
    "mode": "PAYMENT",
    "user": {
      "legal_name": "Sample name",
      "phone_number": "INV-0001",
      "email_address": "user@example.com",
      "address": {
        "street": "string",
        "city": "string",
        "region": "string",
        "postal_code": "200",
        "country": "string"
      }
    },
    "description": "Sample description",
    "iso_currency_code": "200"
  },
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>transferIntentGet</summary>

<div>

Retrieve more information about a transfer intent.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>TransferIntentGetRequest</code> | Yes | Request to retrieve more information about a transfer intent. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TransferIntentGetResponse|error`

**Sample code:**

```ballerina
plaid:TransferIntentGetResponse result = check plaidClient->transferIntentGet({
    transferIntentId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "transfer_intent": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "created": "string",
    "status": "PENDING",
    "transfer_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "failure_reason": {},
    "authorization_decision": "APPROVED",
    "authorization_decision_rationale": {
      "code": "NSF",
      "description": "Sample description"
    },
    "origination_account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "funding_account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "amount": "string",
    "mode": "PAYMENT",
    "user": {
      "legal_name": "Sample name",
      "phone_number": "INV-0001",
      "email_address": "user@example.com",
      "address": {
        "street": "string",
        "city": "string",
        "region": "string",
        "postal_code": "200",
        "country": "string"
      }
    },
    "description": "Sample description",
    "iso_currency_code": "200",
    "guarantee_decision": "GUARANTEED",
    "guarantee_decision_rationale": {
      "code": "RETURN_BANK",
      "description": "Sample description"
    }
  },
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>transferRepaymentList</summary>

<div>

Lists historical repayments.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>TransferRepaymentListRequest</code> | Yes | Request to list historical repayments. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TransferRepaymentListResponse|error`

**Sample code:**

```ballerina
plaid:TransferRepaymentListResponse result = check plaidClient->transferRepaymentList({
    endDate: "2026-01-15T00:00:00",
    offset: 1,
    count: 1,
    secret: "string"
});
```

**Sample response:**

```json
{
  "repayments": [
    {
      "repayment_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "created": "string",
      "amount": "string",
      "iso_currency_code": "200"
    }
  ],
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>transferRepaymentReturnList</summary>

<div>

List the returns included in a repayment.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>TransferRepaymentReturnListRequest</code> | Yes | Request to list the returns included in a repayment. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TransferRepaymentReturnListResponse|error`

**Sample code:**

```ballerina
plaid:TransferRepaymentReturnListResponse result = check plaidClient->transferRepaymentReturnList({
    repaymentId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    offset: 1,
    count: 1,
    secret: "string"
});
```

**Sample response:**

```json
{
  "repayment_returns": [
    {
      "transfer_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "event_id": 1,
      "amount": "string",
      "iso_currency_code": "200"
    }
  ],
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>transferPlatformRequirementSubmit</summary>

<div>

Submit additional onboarding information on behalf of an originator.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>TransferPlatformRequirementSubmitRequest</code> | Yes | Request to submit additional onboarding information on behalf of an originator. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TransferPlatformRequirementSubmitResponse|error`

**Sample code:**

```ballerina
plaid:TransferPlatformRequirementSubmitResponse result = check plaidClient->transferPlatformRequirementSubmit({
    originatorClientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    requirementSubmissions: [{
        requirementType: "string",
        value: "string",
        personId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }],
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>transferOriginatorCreate</summary>

<div>

Create a new originator.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>TransferOriginatorCreateRequest</code> | Yes | Request to create a new originator. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TransferOriginatorCreateResponse|error`

**Sample code:**

```ballerina
plaid:TransferOriginatorCreateResponse result = check plaidClient->transferOriginatorCreate({
    companyName: "Sample name",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "originator_client_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "company_name": "Sample name",
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>transferQuestionnaireCreate</summary>

<div>

Generate a Plaid-hosted onboarding UI URL.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>TransferQuestionnaireCreateRequest</code> | Yes | Request to generate a Plaid-hosted onboarding UI URL. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TransferQuestionnaireCreateResponse|error`

**Sample code:**

```ballerina
plaid:TransferQuestionnaireCreateResponse result = check plaidClient->transferQuestionnaireCreate({
    originatorClientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    redirectUri: "string",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "onboarding_url": "https://example.com/resource",
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>transferDiligenceSubmit</summary>

<div>

Submit transfer diligence on behalf of the originator.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>TransferDiligenceSubmitRequest</code> | Yes | Request to submit transfer diligence on behalf of the originator. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TransferDiligenceSubmitResponse|error`

**Sample code:**

```ballerina
plaid:TransferDiligenceSubmitResponse result = check plaidClient->transferDiligenceSubmit({
    originatorDiligence: {
        naicsCode: "200",
        dba: "string",
        website: "string",
        address: {
            countryCode: "200",
            city: "string",
            street: "string",
            region: "string",
            postalCode: "200"
        },
        fundingAccount: {
            accessToken: "string",
            accountId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
        },
        taxId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    },
    originatorClientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>transferDiligenceDocumentUpload</summary>

<div>

Upload transfer diligence document on behalf of the originator.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>TransferDiligenceDocumentUploadRequest</code> | Yes | Request to upload transfer diligence document on behalf of the originator. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TransferDiligenceDocumentUploadResponse|error`

**Sample code:**

```ballerina
plaid:TransferDiligenceDocumentUploadResponse result = check plaidClient->transferDiligenceDocumentUpload({
    originatorClientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    file: {
        fileContent: check io:fileReadBytes("import.csv"),
        fileName: "import.csv"
    },
    purpose: "DUE_DILIGENCE"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>transferOriginatorGet</summary>

<div>

Get status of an originator's onboarding.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>TransferOriginatorGetRequest</code> | Yes | Request to get status of an originator's onboarding. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TransferOriginatorGetResponse|error`

**Sample code:**

```ballerina
plaid:TransferOriginatorGetResponse result = check plaidClient->transferOriginatorGet({
    originatorClientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "originator": {
    "client_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "transfer_diligence_status": "not_submitted",
    "company_name": "Sample name"
  },
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>transferOriginatorList</summary>

<div>

Get status of all originators' onboarding.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>TransferOriginatorListRequest</code> | Yes | Request to get status of all originators' onboarding. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TransferOriginatorListResponse|error`

**Sample code:**

```ballerina
plaid:TransferOriginatorListResponse result = check plaidClient->transferOriginatorList({
    offset: 1,
    count: 1,
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "originators": [
    {
      "client_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "transfer_diligence_status": "not_submitted"
    }
  ],
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>transferRefundCreate</summary>

<div>

Create a refund.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>TransferRefundCreateRequest</code> | Yes | Request to create a refund. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TransferRefundCreateResponse|error`

**Sample code:**

```ballerina
plaid:TransferRefundCreateResponse result = check plaidClient->transferRefundCreate({
    amount: "string",
    idempotencyKey: "string",
    transferId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string"
});
```

**Sample response:**

```json
{
  "refund": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "transfer_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "amount": "string",
    "status": "pending",
    "failure_reason": {},
    "created": "string"
  },
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>transferReturnRecover</summary>

<div>

Report a return recovery.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>TransferReturnRecoverRequest</code> | Yes | Request to report a return recovery. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TransferReturnRecoverResponse|error`

**Sample code:**

```ballerina
plaid:TransferReturnRecoverResponse result = check plaidClient->transferReturnRecover({
    amount: "string",
    idempotencyKey: "string",
    transferId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>transferRefundGet</summary>

<div>

Retrieve a refund.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>TransferRefundGetRequest</code> | Yes | Request to retrieve a refund. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TransferRefundGetResponse|error`

**Sample code:**

```ballerina
plaid:TransferRefundGetResponse result = check plaidClient->transferRefundGet({
    refundId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "refund": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "transfer_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "amount": "string",
    "status": "pending",
    "failure_reason": {},
    "created": "string"
  },
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>transferRefundCancel</summary>

<div>

Cancel a refund.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>TransferRefundCancelRequest</code> | Yes | Request to cancel a refund. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TransferRefundCancelResponse|error`

**Sample code:**

```ballerina
plaid:TransferRefundCancelResponse result = check plaidClient->transferRefundCancel({
    refundId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>transferPlatformOriginatorCreate</summary>

<div>

Create an originator for Transfer for Platforms customers.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>TransferPlatformOriginatorCreateRequest</code> | Yes | Request to create an originator for Transfer for Platforms customers. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TransferPlatformOriginatorCreateResponse|error`

**Sample code:**

```ballerina
plaid:TransferPlatformOriginatorCreateResponse result = check plaidClient->transferPlatformOriginatorCreate({
    originatorClientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    tosAcceptanceMetadata: {
        agreementAccepted: false,
        agreementAcceptedAt: "string",
        originatorIpAddress: "string"
    },
    originatorReviewedAt: "string",
    webhook: "string"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>transferPlatformPersonCreate</summary>

<div>

Create a person associated with an originator.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>TransferPlatformPersonCreateRequest</code> | Yes | Request to create a person associated with an originator. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TransferPlatformPersonCreateResponse|error`

**Sample code:**

```ballerina
plaid:TransferPlatformPersonCreateResponse result = check plaidClient->transferPlatformPersonCreate({
    originatorClientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    idNumber: {
        'type: "ar_dni",
        value: "string"
    },
    emailAddress: "user@example.com",
    address: {
        country: "string",
        city: "string",
        street: "string",
        postalCode: "200",
        region: "string"
    }
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "person_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

#### Bank transfers

<details>
<summary>bankTransferGet</summary>

<div>

**Deprecated.** (Deprecated) Retrieve a bank transfer.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BankTransferGetRequest</code> | Yes | Request to retrieve a bank transfer. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `BankTransferGetResponse|error`

**Sample code:**

```ballerina
plaid:BankTransferGetResponse result = check plaidClient->bankTransferGet({
    bankTransferId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "bank_transfer": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "ach_class": "ccd",
    "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "debit",
    "user": {
      "legal_name": "Sample name"
    },
    "amount": "string",
    "iso_currency_code": "200",
    "description": "Sample description",
    "created": "string",
    "status": "pending",
    "network": "ach",
    "cancellable": false,
    "failure_reason": {},
    "custom_tag": "string",
    "metadata": {},
    "origination_account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "direction": "outbound"
  },
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>bankTransferCreate</summary>

<div>

**Deprecated.** (Deprecated) Create a bank transfer.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BankTransferCreateRequest</code> | Yes | Request to create a bank transfer. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `BankTransferCreateResponse|error`

**Sample code:**

```ballerina
plaid:BankTransferCreateResponse result = check plaidClient->bankTransferCreate({
    amount: "string",
    description: "Sample description",
    'type: "debit",
    network: "ach",
    accessToken: "string",
    accountId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    isoCurrencyCode: "200",
    idempotencyKey: "string",
    user: {
        legal_name: "Sample name",
        email_address: "user@example.com",
        routing_number: "INV-0001"
    }
});
```

**Sample response:**

```json
{
  "bank_transfer": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "ach_class": "ccd",
    "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "debit",
    "user": {
      "legal_name": "Sample name"
    },
    "amount": "string",
    "iso_currency_code": "200",
    "description": "Sample description",
    "created": "string",
    "status": "pending",
    "network": "ach",
    "cancellable": false,
    "failure_reason": {},
    "custom_tag": "string",
    "metadata": {},
    "origination_account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "direction": "outbound"
  },
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>bankTransferList</summary>

<div>

**Deprecated.** (Deprecated) List bank transfers.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BankTransferListRequest</code> | Yes | Request to list bank transfers. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `BankTransferListResponse|error`

**Sample code:**

```ballerina
plaid:BankTransferListResponse result = check plaidClient->bankTransferList({
    endDate: "2026-01-15T00:00:00",
    offset: 1,
    count: 1,
    originationAccountId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "bank_transfers": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "ach_class": "ccd",
      "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "type": "debit",
      "user": {
        "legal_name": "Sample name"
      },
      "amount": "string",
      "iso_currency_code": "200",
      "description": "Sample description",
      "created": "string",
      "status": "pending",
      "network": "ach",
      "cancellable": false,
      "failure_reason": {},
      "custom_tag": "string",
      "metadata": {},
      "origination_account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "direction": "outbound"
    }
  ],
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>bankTransferCancel</summary>

<div>

**Deprecated.** (Deprecated) Cancel a bank transfer.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BankTransferCancelRequest</code> | Yes | Request to cancel a bank transfer. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `BankTransferCancelResponse|error`

**Sample code:**

```ballerina
plaid:BankTransferCancelResponse result = check plaidClient->bankTransferCancel({
    bankTransferId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>bankTransferEventList</summary>

<div>

List bank transfer events.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BankTransferEventListRequest</code> | Yes | Request to list bank transfer events. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `BankTransferEventListResponse|error`

**Sample code:**

```ballerina
plaid:BankTransferEventListResponse result = check plaidClient->bankTransferEventList({
    endDate: "2026-01-15T00:00:00",
    accountId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    eventTypes: ["pending"],
    offset: 1
});
```

**Sample response:**

```json
{
  "bank_transfer_events": [
    {
      "event_id": 1,
      "timestamp": "string",
      "event_type": "pending",
      "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "bank_transfer_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "origination_account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "bank_transfer_type": "debit",
      "bank_transfer_amount": "string",
      "bank_transfer_iso_currency_code": "200",
      "failure_reason": {},
      "direction": "outbound",
      "receiver_details": {
        "available_balance": "string"
      }
    }
  ],
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>bankTransferEventSync</summary>

<div>

Sync bank transfer events.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BankTransferEventSyncRequest</code> | Yes | Request to sync bank transfer events. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `BankTransferEventSyncResponse|error`

**Sample code:**

```ballerina
plaid:BankTransferEventSyncResponse result = check plaidClient->bankTransferEventSync({
    afterId: 1,
    count: 1,
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "bank_transfer_events": [
    {
      "event_id": 1,
      "timestamp": "string",
      "event_type": "pending",
      "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "bank_transfer_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "origination_account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "bank_transfer_type": "debit",
      "bank_transfer_amount": "string",
      "bank_transfer_iso_currency_code": "200",
      "failure_reason": {},
      "direction": "outbound",
      "receiver_details": {
        "available_balance": "string"
      }
    }
  ],
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>bankTransferSweepGet</summary>

<div>

**Deprecated.** (Deprecated) Retrieve a sweep.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BankTransferSweepGetRequest</code> | Yes | Request to retrieve a sweep. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `BankTransferSweepGetResponse|error`

**Sample code:**

```ballerina
plaid:BankTransferSweepGetResponse result = check plaidClient->bankTransferSweepGet({
    sweepId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "sweep": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "created_at": "string",
    "amount": "string",
    "iso_currency_code": "200"
  },
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>bankTransferSweepList</summary>

<div>

**Deprecated.** (Deprecated) List sweeps.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BankTransferSweepListRequest</code> | Yes | Request to list sweeps. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `BankTransferSweepListResponse|error`

**Sample code:**

```ballerina
plaid:BankTransferSweepListResponse result = check plaidClient->bankTransferSweepList({
    startTime: "string",
    endTime: "string",
    count: 1,
    originationAccountId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "sweeps": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "created_at": "string",
      "amount": "string",
      "iso_currency_code": "200"
    }
  ],
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>bankTransferBalanceGet</summary>

<div>

**Deprecated.** (Deprecated) Get balance of your Bank Transfer account.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BankTransferBalanceGetRequest</code> | Yes | Request to get balance of your Bank Transfer account. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `BankTransferBalanceGetResponse|error`

**Sample code:**

```ballerina
plaid:BankTransferBalanceGetResponse result = check plaidClient->bankTransferBalanceGet({
    originationAccountId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "balance": {
    "available": "string",
    "transactable": "string"
  },
  "origination_account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>bankTransferMigrateAccount</summary>

<div>

**Deprecated.** (Deprecated) Migrate account into Bank Transfers.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BankTransferMigrateAccountRequest</code> | Yes | Request to migrate account into Bank Transfers. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `BankTransferMigrateAccountResponse|error`

**Sample code:**

```ballerina
plaid:BankTransferMigrateAccountResponse result = check plaidClient->bankTransferMigrateAccount({
    accountNumber: "INV-0001",
    accountType: "string",
    routingNumber: "INV-0001",
    wireRoutingNumber: "INV-0001"
});
```

**Sample response:**

```json
{
  "access_token": "string",
  "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

#### Employers

<details>
<summary>employersSearch</summary>

<div>

**Deprecated.** (Deprecated) Search employer database.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>EmployersSearchRequest</code> | Yes | Request to search employer database. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `EmployersSearchResponse|error`

**Sample code:**

```ballerina
plaid:EmployersSearchResponse result = check plaidClient->employersSearch({
    query: "string",
    products: ["string"],
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "employers": [
    {
      "employer_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "name": "Sample name",
      "address": {
        "city": "string",
        "region": "string",
        "street": "string",
        "postal_code": "200",
        "country": "string"
      },
      "confidence_score": 100.00
    }
  ],
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

#### Income

<details>
<summary>incomeVerificationCreate</summary>

<div>

**Deprecated.** (Deprecated) Create an income verification instance.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>IncomeVerificationCreateRequest</code> | Yes | Request to create an income verification instance. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `IncomeVerificationCreateResponse|error`

**Sample code:**

```ballerina
plaid:IncomeVerificationCreateResponse result = check plaidClient->incomeVerificationCreate({
    webhook: "string",
    precheckId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    options: {
        accessTokens: ["string"]
    },
    secret: "string"
});
```

**Sample response:**

```json
{
  "income_verification_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>incomeVerificationPaystubsGet</summary>

<div>

**Deprecated.** (Deprecated) Retrieve information from the paystubs used for income verification.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>IncomeVerificationPaystubsGetRequest</code> | Yes | Request to retrieve information from the paystubs used for income verification. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `IncomeVerificationPaystubsGetResponse|error`

**Sample code:**

```ballerina
plaid:IncomeVerificationPaystubsGetResponse result = check plaidClient->incomeVerificationPaystubsGet({
    accessToken: "string",
    incomeVerificationId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "paystubs": [
    {
      "deductions": {
        "breakdown": [
          {}
        ],
        "total": {}
      },
      "doc_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "earnings": {},
      "employee": {
        "address": {},
        "name": "Sample name"
      },
      "employer": {
        "name": "Sample name"
      },
      "net_pay": {},
      "pay_period_details": {}
    }
  ],
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "document_metadata": [
    {
      "name": "Sample name",
      "status": "string",
      "doc_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ],
  "error": {
    "error_type": "INVALID_REQUEST",
    "error_code": "200",
    "error_message": "string",
    "display_message": "string"
  }
}
```

</div>
</details>

<details>
<summary>incomeVerificationDocumentsDownload</summary>

<div>

**Deprecated.** (Deprecated) Download the original documents used for income verification.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>IncomeVerificationDocumentsDownloadRequest</code> | Yes | Request to download the original documents used for income verification. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `http:Response|error`

**Sample code:**

```ballerina
http:Response result = check plaidClient->incomeVerificationDocumentsDownload({
    accessToken: "string",
    incomeVerificationId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    documentId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

The raw `http:Response`. Read the PDF content with `check result.getBinaryPayload()`.

</div>
</details>

<details>
<summary>incomeVerificationTaxformsGet</summary>

<div>

**Deprecated.** (Deprecated) Retrieve information from the tax documents used for income verification.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>IncomeVerificationTaxformsGetRequest</code> | Yes | Request to retrieve information from the tax documents used for income verification. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `IncomeVerificationTaxformsGetResponse|error`

**Sample code:**

```ballerina
plaid:IncomeVerificationTaxformsGetResponse result = check plaidClient->incomeVerificationTaxformsGet({
    accessToken: "string",
    incomeVerificationId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "document_metadata": [
    {
      "name": "Sample name",
      "status": "string",
      "doc_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ],
  "taxforms": [
    {
      "document_type": "string",
      "doc_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ],
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "error": {
    "error_type": "INVALID_REQUEST",
    "error_code": "200",
    "error_message": "string",
    "display_message": "string"
  }
}
```

</div>
</details>

<details>
<summary>incomeVerificationPrecheck</summary>

<div>

**Deprecated.** (Deprecated) Check digital income verification eligibility and optimize conversion.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>IncomeVerificationPrecheckRequest</code> | Yes | Request to check digital income verification eligibility and optimize conversion. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `IncomeVerificationPrecheckResponse|error`

**Sample code:**

```ballerina
plaid:IncomeVerificationPrecheckResponse result = check plaidClient->incomeVerificationPrecheck({
    usMilitaryInfo: {
        isActiveDuty: false,
        branch: "string"
    },
    transactionsAccessToken: "string",
    employer: {
        name: "Sample name",
        taxId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        url: "https://example.com/resource"
    },
    secret: "string"
});
```

**Sample response:**

```json
{
  "precheck_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "confidence": "HIGH"
}
```

</div>
</details>

#### Employment

<details>
<summary>employmentVerificationGet</summary>

<div>

**Deprecated.** (Deprecated) Retrieve a summary of an individual's employment information.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>EmploymentVerificationGetRequest</code> | Yes | Request to retrieve a summary of an individual's employment information. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `EmploymentVerificationGetResponse|error`

**Sample code:**

```ballerina
plaid:EmploymentVerificationGetResponse result = check plaidClient->employmentVerificationGet({
    accessToken: "string",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "employments": [
    {
      "status": "EMPLOYMENT_STATUS_ACTIVE",
      "start_date": "2026-01-15T00:00:00",
      "end_date": "2026-01-15T00:00:00"
    }
  ],
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

#### Signal

<details>
<summary>signalEvaluate</summary>

<div>

Evaluate a planned ACH transaction.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>SignalEvaluateRequest</code> | Yes | Request to evaluate a planned ACH transaction. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `SignalEvaluateResponse|error`

**Sample code:**

```ballerina
plaid:SignalEvaluateResponse result = check plaidClient->signalEvaluate({
    amount: 100.00,
    clientTransactionId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    accessToken: "string",
    accountId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "scores": {
    "customer_initiated_return_risk": {
      "score": 1,
      "risk_tier": 1
    },
    "bank_initiated_return_risk": {
      "score": 1,
      "risk_tier": 1
    }
  },
  "warnings": [
    {
      "warning_message": "string",
      "warning_type": "string",
      "warning_code": "200"
    }
  ],
  "core_attributes": {
    "days_since_first_plaid_connection": 1,
    "distinct_ip_addresses_count_90d": 1,
    "nsf_overdraft_transactions_count_60d": 1
  },
  "risk_profile": {
    "key": "string",
    "outcome": "string"
  },
  "ruleset": {
    "result": "ACCEPT",
    "ruleset_key": "string",
    "outcome": "string"
  }
}
```

</div>
</details>

<details>
<summary>signalSchedule</summary>

<div>

Schedule a planned ACH transaction.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>SignalScheduleRequest</code> | Yes | Request to schedule a planned ACH transaction. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `SignalScheduleResponse|error`

**Sample code:**

```ballerina
plaid:SignalScheduleResponse result = check plaidClient->signalSchedule({
    accessToken: "string",
    amount: 100.00,
    accountId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    clientTransactionId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "optimal_date": "2026-01-15T00:00:00",
  "recommendations": [
    {
      "date": "2026-01-15T00:00:00",
      "recommendation": "RECOMMENDED",
      "rank": 1
    }
  ],
  "warnings": [
    {
      "warning_message": "string",
      "warning_type": "string",
      "warning_code": "200"
    }
  ],
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>signalDecisionReport</summary>

<div>

Report whether you initiated an ACH transaction.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>SignalDecisionReportRequest</code> | Yes | Request to report whether you initiated an ACH transaction. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `SignalDecisionReportResponse|error`

**Sample code:**

```ballerina
plaid:SignalDecisionReportResponse result = check plaidClient->signalDecisionReport({
    initiated: false,
    clientTransactionId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    daysFundsOnHold: 1,
    submittedAt: "string"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>signalReturnReport</summary>

<div>

Report a return for an ACH transaction.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>SignalReturnReportRequest</code> | Yes | Request to report a return for an ACH transaction. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `SignalReturnReportResponse|error`

**Sample code:**

```ballerina
plaid:SignalReturnReportResponse result = check plaidClient->signalReturnReport({
    clientTransactionId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    returnCode: "200",
    returnedAt: "string",
    secret: "string"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>signalPrepare</summary>

<div>

Opt-in an Item to Signal Transaction Scores.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>SignalPrepareRequest</code> | Yes | Request to opt-in an Item to Signal Transaction Scores. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `SignalPrepareResponse|error`

**Sample code:**

```ballerina
plaid:SignalPrepareResponse result = check plaidClient->signalPrepare({
    accessToken: "string",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

#### Wallet

<details>
<summary>walletCreate</summary>

<div>

Create an e-wallet.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>WalletCreateRequest</code> | Yes | Request to create an e-wallet. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `WalletCreateResponse|error`

**Sample code:**

```ballerina
plaid:WalletCreateResponse result = check plaidClient->walletCreate({
    isoCurrencyCode: "GBP",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "wallet_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "balance": {
    "iso_currency_code": "200",
    "current": 100.00,
    "available": 100.00
  },
  "numbers": {
    "international": {
      "iban": "string",
      "bic": "string"
    }
  },
  "status": "UNKNOWN",
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "recipient_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>walletGet</summary>

<div>

Fetch an e-wallet.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>WalletGetRequest</code> | Yes | Request to fetch an e-wallet. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `WalletGetResponse|error`

**Sample code:**

```ballerina
plaid:WalletGetResponse result = check plaidClient->walletGet({
    walletId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "wallet_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "balance": {
    "iso_currency_code": "200",
    "current": 100.00,
    "available": 100.00
  },
  "numbers": {
    "international": {
      "iban": "string",
      "bic": "string"
    }
  },
  "status": "UNKNOWN",
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "recipient_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>walletList</summary>

<div>

Fetch a list of e-wallets.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>WalletListRequest</code> | Yes | Request to fetch a list of e-wallets. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `WalletListResponse|error`

**Sample code:**

```ballerina
plaid:WalletListResponse result = check plaidClient->walletList({
    cursor: "string",
    isoCurrencyCode: "GBP",
    count: 1,
    secret: "string"
});
```

**Sample response:**

```json
{
  "wallets": [
    {
      "wallet_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "balance": {
        "iso_currency_code": "200",
        "current": 100.00,
        "available": 100.00
      },
      "numbers": {},
      "status": "UNKNOWN"
    }
  ],
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "next_cursor": "string"
}
```

</div>
</details>

<details>
<summary>walletTransactionExecute</summary>

<div>

Execute a transaction using an e-wallet.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>WalletTransactionExecuteRequest</code> | Yes | Request to execute a transaction using an e-wallet. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `WalletTransactionExecuteResponse|error`

**Sample code:**

```ballerina
plaid:WalletTransactionExecuteResponse result = check plaidClient->walletTransactionExecute({
    reference: "REF-001",
    walletId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    amount: {
        iso_currency_code: "GBP",
        value: 100.00
    },
    idempotencyKey: "string",
    counterparty: {
        name: "Sample name",
        numbers: {},
        address: {
            street: ["string"],
            city: "string",
            postal_code: "200",
            country: "string"
        }
    }
});
```

**Sample response:**

```json
{
  "transaction_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "status": "AUTHORISING",
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>walletTransactionGet</summary>

<div>

Fetch an e-wallet transaction.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>WalletTransactionGetRequest</code> | Yes | Request to fetch an e-wallet transaction. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `WalletTransactionGetResponse|error`

**Sample code:**

```ballerina
plaid:WalletTransactionGetResponse result = check plaidClient->walletTransactionGet({
    transactionId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "transaction_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "wallet_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "reference": "REF-001",
  "type": "BANK_TRANSFER",
  "amount": {
    "iso_currency_code": "GBP",
    "value": 100.00
  },
  "counterparty": {
    "name": "Sample name",
    "numbers": {},
    "address": {
      "street": [
        "string"
      ],
      "city": "string",
      "postal_code": "200",
      "country": "string"
    }
  },
  "status": "AUTHORISING",
  "created_at": "string",
  "last_status_update": "2026-01-15T00:00:00",
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>walletTransactionList</summary>

<div>

List e-wallet transactions.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>WalletTransactionListRequest</code> | Yes | Request to list e-wallet transactions. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `WalletTransactionListResponse|error`

**Sample code:**

```ballerina
plaid:WalletTransactionListResponse result = check plaidClient->walletTransactionList({
    walletId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    cursor: "string",
    count: 1,
    options: {
        startTime: "string",
        endTime: "string"
    }
});
```

**Sample response:**

```json
{
  "transactions": [
    {
      "transaction_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "wallet_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "reference": "REF-001",
      "type": "BANK_TRANSFER",
      "amount": {
        "iso_currency_code": "GBP",
        "value": 100.00
      },
      "counterparty": {
        "name": "Sample name",
        "numbers": {}
      },
      "status": "AUTHORISING",
      "created_at": "string",
      "last_status_update": "2026-01-15T00:00:00"
    }
  ],
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "next_cursor": "string"
}
```

</div>
</details>

#### Issues

<details>
<summary>issuesSearch</summary>

<div>

Search for an Issue.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>IssuesSearchRequest</code> | Yes | Request to search for an Issue. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `IssuesSearchResponse|error`

**Sample code:**

```ballerina
plaid:IssuesSearchResponse result = check plaidClient->issuesSearch({
    itemId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    linkSessionId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    linkSessionRequestId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "issues": [
    {
      "issue_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "institution_names": [
        "string"
      ],
      "institution_ids": [
        "3fa85f64-5717-4562-b3fc-2c963f66afa6"
      ]
    }
  ],
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>issuesGet</summary>

<div>

Get an Issue.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>IssuesGetRequest</code> | Yes | Request to get an Issue. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `IssuesGetResponse|error`

**Sample code:**

```ballerina
plaid:IssuesGetResponse result = check plaidClient->issuesGet({
    issueId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "issue": {
    "issue_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "institution_names": [
      "string"
    ],
    "institution_ids": [
      "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    ]
  },
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>issuesSubscribe</summary>

<div>

Subscribe to an Issue.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>IssuesSubscribeRequest</code> | Yes | Request to subscribe to an Issue. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `IssuesSubscribeResponse|error`

**Sample code:**

```ballerina
plaid:IssuesSubscribeResponse result = check plaidClient->issuesSubscribe({
    webhook: "string",
    issueId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

#### Payment profile

<details>
<summary>paymentProfileCreate</summary>

<div>

**Deprecated.** Create payment profile.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>PaymentProfileCreateRequest</code> | Yes | Request to create payment profile. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PaymentProfileCreateResponse|error`

**Sample code:**

```ballerina
plaid:PaymentProfileCreateResponse result = check plaidClient->paymentProfileCreate({
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "payment_profile_token": "string",
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>paymentProfileGet</summary>

<div>

**Deprecated.** Get payment profile.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>PaymentProfileGetRequest</code> | Yes | Request to get payment profile. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PaymentProfileGetResponse|error`

**Sample code:**

```ballerina
plaid:PaymentProfileGetResponse result = check plaidClient->paymentProfileGet({
    paymentProfileToken: "string",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "updated_at": "2026-01-15T00:00:00",
  "created_at": "string",
  "deleted_at": "string",
  "status": "PENDING",
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>paymentProfileRemove</summary>

<div>

**Deprecated.** Remove payment profile.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>PaymentProfileRemoveRequest</code> | Yes | Request to remove payment profile. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PaymentProfileRemoveResponse|error`

**Sample code:**

```ballerina
plaid:PaymentProfileRemoveResponse result = check plaidClient->paymentProfileRemove({
    paymentProfileToken: "string",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

#### Partner

<details>
<summary>partnerCustomerCreate</summary>

<div>

Creates a new end customer for a Plaid reseller.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>PartnerCustomerCreateRequest</code> | Yes | Request to create a new end customer for a Plaid reseller. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PartnerCustomerCreateResponse|error`

**Sample code:**

```ballerina
plaid:PartnerCustomerCreateResponse result = check plaidClient->partnerCustomerCreate({
    company_name: "Sample name",
    is_diligence_attested: false,
    legal_entity_name: "Sample name",
    website: "string",
    application_name: "Sample name",
    address: {
        city: "string",
        street: "string",
        region: "string"
    },
    is_bank_addendum_completed: false
});
```

**Sample response:**

```json
{
  "end_customer": {
    "client_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "company_name": "Sample name",
    "status": "UNDER_REVIEW"
  },
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>partnerCustomerGet</summary>

<div>

Returns a Plaid reseller's end customer.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>PartnerCustomerGetRequest</code> | Yes | Request to return a Plaid reseller's end customer. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PartnerCustomerGetResponse|error`

**Sample code:**

```ballerina
plaid:PartnerCustomerGetResponse result = check plaidClient->partnerCustomerGet({
    end_customer_client_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    client_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string"
});
```

**Sample response:**

```json
{
  "end_customer": {
    "client_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "company_name": "Sample name",
    "status": "UNDER_REVIEW"
  },
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>partnerCustomerEnable</summary>

<div>

Enables a Plaid reseller's end customer in the Production environment.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>PartnerCustomerEnableRequest</code> | Yes | Request to enable a Plaid reseller's end customer in the Production environment. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PartnerCustomerEnableResponse|error`

**Sample code:**

```ballerina
plaid:PartnerCustomerEnableResponse result = check plaidClient->partnerCustomerEnable({
    end_customer_client_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    client_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string"
});
```

**Sample response:**

```json
{
  "production_secret": "string",
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>partnerCustomerRemove</summary>

<div>

Removes a Plaid reseller's end customer.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>PartnerCustomerRemoveRequest</code> | Yes | Request to remove a Plaid reseller's end customer. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PartnerCustomerRemoveResponse|error`

**Sample code:**

```ballerina
plaid:PartnerCustomerRemoveResponse result = check plaidClient->partnerCustomerRemove({
    end_customer_client_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    client_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string"
});
```

**Sample response:**

```json
{
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>partnerCustomerOauthInstitutionsGet</summary>

<div>

Returns OAuth-institution registration information for a given end customer.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>PartnerCustomerOAuthInstitutionsGetRequest</code> | Yes | Request to return OAuth-institution registration information for a given end customer. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PartnerCustomerOAuthInstitutionsGetResponse|error`

**Sample code:**

```ballerina
plaid:PartnerCustomerOAuthInstitutionsGetResponse result = check plaidClient->partnerCustomerOauthInstitutionsGet({
    end_customer_client_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    client_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string"
});
```

**Sample response:**

```json
{
  "flowdown_status": "NOT_STARTED",
  "questionnaire_status": "NOT_STARTED",
  "institutions": [
    {
      "name": "Sample name",
      "institution_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "production_enablement_date": "2026-01-15T00:00:00"
    }
  ],
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

#### Link delivery

<details>
<summary>linkDeliveryCreate</summary>

<div>

**Deprecated.** Create Hosted Link session.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>LinkDeliveryCreateRequest</code> | Yes | Request to create Hosted Link session. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `LinkDeliveryCreateResponse|error`

**Sample code:**

```ballerina
plaid:LinkDeliveryCreateResponse result = check plaidClient->linkDeliveryCreate({
    linkToken: "string",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "link_delivery_url": "https://example.com/resource",
  "link_delivery_session_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>linkDeliveryGet</summary>

<div>

**Deprecated.** Get Hosted Link session.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>LinkDeliveryGetRequest</code> | Yes | Request to get Hosted Link session. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `LinkDeliveryGetResponse|error`

**Sample code:**

```ballerina
plaid:LinkDeliveryGetResponse result = check plaidClient->linkDeliveryGet({
    linkDeliverySessionId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    secret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "status": "CREATED",
  "created_at": "string",
  "request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "completed_at": "string",
  "access_tokens": [
    "string"
  ],
  "item_ids": [
    "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  ]
}
```

</div>
</details>

#### Fdx

<details>
<summary>fdxNotifications</summary>

<div>

Webhook receiver for fdx notifications.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>FDXNotification</code> | Yes | Request payload for the webhook receiver for fdx notifications operation. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check plaidClient->fdxNotifications({
    notificationPayload: {
        idType: "ACCOUNT",
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    },
    sentOn: "string",
    notificationId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    'type: "ACCOUNT_TAKEOVER",
    category: "SECURITY"
});
```

</div>
</details>

<details>
<summary>getRecipients</summary>

<div>

Get Recipients.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `GetRecipientsResponse|error`

**Sample code:**

```ballerina
plaid:GetRecipientsResponse result = check plaidClient->getRecipients();
```

**Sample response:**

```json
{
  "recipients": [
    {
      "third_party_legal_name": "Sample name",
      "client_name": "Sample name",
      "recipient_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "joined_date": "2026-01-15T00:00:00",
      "connection_count": 1,
      "category": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>fdxConsentsList</summary>

<div>

List FDX consent grants for a customer.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `customerId` | <code>string</code> | Yes | Data provider customer identifier whose consent grants to return. |
| `status` | <code>FDXConsentGrantStatus</code> | No | Optional filter restricting results to a single consent grant status. One of `ACTIVE`, `REVOKED`, `EXPIRED`. |

**Returns:** `GetConsentsResponse|error`

**Sample code:**

```ballerina
plaid:GetConsentsResponse result = check plaidClient->fdxConsentsList(customerId = "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "consent_grants": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "status": "ACTIVE",
      "createdTime": "string",
      "updatedTime": "2026-01-15T00:00:00",
      "parties": [
        {
          "name": "Sample name",
          "type": "DATA_ACCESS_PLATFORM"
        }
      ]
    }
  ]
}
```

</div>
</details>

<details>
<summary>fdxConsentsRevocationGet</summary>

<div>

Retrieve FDX consent grant revocation records.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `consentId` | <code>string</code> | Yes | Unique identifier of the consent grant. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `FDXConsentRevocations|error`

**Sample code:**

```ballerina
plaid:FDXConsentRevocations result = check plaidClient->fdxConsentsRevocationGet("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "revocations": [
    {
      "status": "ACTIVE",
      "reason": "BUSINESS_RULE",
      "initiator": "DATA_ACCESS_PLATFORM",
      "updatedTime": "2026-01-15T00:00:00"
    }
  ]
}
```

</div>
</details>

<details>
<summary>fdxConsentsRevoke</summary>

<div>

Revoke FDX consent grant.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `consentId` | <code>string</code> | Yes | Unique identifier of the consent grant. |
| `payload` | <code>FDXConsentRevocation</code> | Yes | Request to revoke FDX consent grant. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check plaidClient->fdxConsentsRevoke("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    initiator: "DATA_ACCESS_PLATFORM",
    reason: "BUSINESS_RULE",
    otherReason: "string",
    updatedTime: "2026-01-15T00:00:00"
});
```

</div>
</details>

<details>
<summary>fdxConsentsGet</summary>

<div>

Get FDX consent grant.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `consentId` | <code>string</code> | Yes | Unique identifier of the consent grant. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `FDXConsentGrant|error`

**Sample code:**

```ballerina
plaid:FDXConsentGrant result = check plaidClient->fdxConsentsGet("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "status": "ACTIVE",
  "createdTime": "string",
  "updatedTime": "2026-01-15T00:00:00",
  "parties": [
    {
      "name": "Sample name",
      "type": "DATA_ACCESS_PLATFORM",
      "registry": "FDX"
    }
  ],
  "expirationTime": "string"
}
```

</div>
</details>

<details>
<summary>getRecipient</summary>

<div>

Get Recipient.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `recipientId` | <code>string</code> | Yes | The recipient's (application's) identifier (a UUID), as returned by `/fdx/recipients`. |
| `headers` | <code>GetRecipientHeaders</code> | No | Request headers. Optional fields: `oAUTHSTATEID`. Defaults to `{}`. |

**Returns:** `GetRecipientResponse|error`

**Sample code:**

```ballerina
plaid:GetRecipientResponse result = check plaidClient->getRecipient("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

The raw response content as `GetRecipientResponse`.

</div>
</details>
