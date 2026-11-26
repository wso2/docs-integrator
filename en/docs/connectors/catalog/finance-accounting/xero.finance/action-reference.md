---
connector: true
connector_name: "xero.finance"
toc_max_heading_level: 4
title: "Actions"
---

# Actions

The Xero Finance connector exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Read financial statements and bank data from a Xero organisation: balance sheet, cashflow, profit and loss, trial balance, revenue and expense by contact, cash validation and bank statement accounting. |

---

## Client

The `Client` connects to the Xero Finance API (`https://api.xero.com/finance.xro/1.0`). It exposes 8 operations. Every operation takes the Xero tenant ID of the organisation in its `headers` record.

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
| `validation` | <code>boolean</code> | <code>true</code> | Enables the inbound payload validation functionality which provided by the constraint package. Enabled by default |
| `laxDataBinding` | <code>boolean</code> | <code>true</code> | Enables relaxed data binding on the client side. When enabled, `nil` values are treated as optional, and absent fields are handled as `nilable` types. Enabled by default. |

### Initializing the client

```ballerina
import ballerinax/xero.finance;

configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string refreshToken = ?;
configurable string tenantId = ?;

final finance:Client financeClient = check new ({
    auth: {
        clientId,
        clientSecret,
        refreshToken,
        refreshUrl: "https://identity.xero.com/connect/token"
    }
});
```

### Operations

#### Cash Validation

<details>
<summary>getCashValidation</summary>

<div>

Get cash validation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>GetCashValidationHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |
| `beginDate` | <code>string</code> | No | Date, yyyy-MM-dd If no parameter is provided, the aggregate results will be drawn from the user’s total history. The ‘begin date’ will return transactions based on the accounting date entered by the user. Transactions after the beginDate will be included. The user has discretion as to which accounting period the transaction relates to. |
| `balanceDate` | <code>string</code> | No | Date, yyyy-MM-dd If no parameter is provided, the current date will be used. The ‘balance date’ will return transactions based on the accounting date entered by the user. Transactions before the balanceDate will be included. The user has discretion as to which accounting period the transaction relates to. The ‘balance date’ will control the latest maximum date of transactions included in the aggregate numbers. Balance date does not affect the CurrentStatement object, as this will always return the most recent statement before asAtSystemDate (if specified). |
| `asAtSystemDate` | <code>string</code> | No | Date, yyyy-MM-dd If no parameter is provided, the current date will be used. The ‘as at’ date will return transactions based on the creation date. It reflects the date the transactions were entered into Xero, not the accounting date. The ‘as at’ date can not be overridden by the user. This can be used to estimate a ‘historical frequency of reconciliation’. The ‘as at’ date will affect the current statement in the response, as any candidate statements created after this date will be filtered out. Thus the current statement returned will be the most recent statement prior to the specified ‘as at’ date. Be aware that neither the begin date, nor the balance date, will affect the current statement. Note; information is only presented when system architecture allows, meaning historical cash validation information will be an estimate. In addition, delete events are not aware of the ‘as at’ functionality in this endpoint, meaning that transactions deleted at the time the API is accessed will be considered to always have been deleted. |

**Returns:** `CashValidationResponse[]|error`

**Sample code:**

```ballerina
finance:CashValidationResponse[] result = check financeClient->getCashValidation({xeroTenantId: tenantId});
```

**Sample response:**

The raw response content as `CashValidationResponse[]`.

</div>
</details>

#### Financial Statements

<details>
<summary>getFinancialStatementBalanceSheet</summary>

<div>

Get Balance Sheet report.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>GetFinancialStatementBalanceSheetHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |
| `balanceDate` | <code>string</code> | No | Specifies the date for balance sheet report. Format yyyy-MM-dd. If no parameter is provided, the current date will be used. |

**Returns:** `BalanceSheetResponse|error`

**Sample code:**

```ballerina
finance:BalanceSheetResponse result = check financeClient->getFinancialStatementBalanceSheet({xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "balanceDate": "2026-01-15T00:00:00",
  "liability": {
    "total": 100.00
  },
  "asset": {
    "total": 100.00
  },
  "equity": {
    "total": 100.00
  }
}
```

</div>
</details>

<details>
<summary>getFinancialStatementCashflow</summary>

<div>

Get Cash flow report.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>GetFinancialStatementCashflowHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |
| `endDate` | <code>string</code> | No | Date e.g. yyyy-MM-dd Specifies the end date for cash flow report. If no parameter is provided, the current date will be used. |
| `startDate` | <code>string</code> | No | Date e.g. yyyy-MM-dd Specifies the start date for cash flow report. If no parameter is provided, the date of 12 months before the end date will be used. |

**Returns:** `CashflowResponse|error`

**Sample code:**

```ballerina
finance:CashflowResponse result = check financeClient->getFinancialStatementCashflow({xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "endDate": "2026-01-15T00:00:00",
  "cashBalance": {
    "netCashMovement": 100.00,
    "openingCashBalance": 100.00,
    "closingCashBalance": 100.00
  },
  "cashflowActivities": [
    {
      "total": 100.00,
      "name": "Sample name"
    }
  ],
  "startDate": "2026-01-15T00:00:00"
}
```

</div>
</details>

<details>
<summary>getFinancialStatementProfitAndLoss</summary>

<div>

Get Profit & Loss report.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>GetFinancialStatementProfitAndLossHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |
| `endDate` | <code>string</code> | No | Date e.g. yyyy-MM-dd Specifies the end date for profit and loss report If no parameter is provided, the current date will be used. |
| `startDate` | <code>string</code> | No | Date e.g. yyyy-MM-dd Specifies the start date for profit and loss report If no parameter is provided, the date of 12 months before the end date will be used. |

**Returns:** `ProfitAndLossResponse|error`

**Sample code:**

```ballerina
finance:ProfitAndLossResponse result = check financeClient->getFinancialStatementProfitAndLoss({xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "revenue": {
    "total": 100.00
  },
  "endDate": "2026-01-15T00:00:00",
  "netProfitLoss": 100.00,
  "expense": {
    "total": 100.00
  },
  "startDate": "2026-01-15T00:00:00"
}
```

</div>
</details>

<details>
<summary>getFinancialStatementTrialBalance</summary>

<div>

Get Trial Balance report.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>GetFinancialStatementTrialBalanceHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |
| `endDate` | <code>string</code> | No | Date e.g. yyyy-MM-dd Specifies the end date for trial balance report If no parameter is provided, the current date will be used. |

**Returns:** `TrialBalanceResponse|error`

**Sample code:**

```ballerina
finance:TrialBalanceResponse result = check financeClient->getFinancialStatementTrialBalance({xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "endDate": "2026-01-15T00:00:00",
  "accounts": [
    {
      "accountId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "signedBalance": 100.00,
      "accountCode": "200"
    }
  ],
  "startDate": "2026-01-15T00:00:00"
}
```

</div>
</details>

<details>
<summary>getFinancialStatementContactsRevenue</summary>

<div>

Get revenue by contacts report.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>GetFinancialStatementContactsRevenueHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |
| `includeManualJournals` | <code>boolean</code> | No | Specifies whether to include the manual journals in the report. If no parameter is provided, manual journals will not be included. |
| `endDate` | <code>string</code> | No | Date yyyy-MM-dd Specifies the end date for the report. If no parameter is provided, the current date will be used. It is recommended to always specify both a start date and end date; While the initial range may be set to 12 months, this may need to be reduced for high volume organisations in order to improve latency. |
| `contactIds` | <code>string[]</code> | No | Specifies the customer contacts to be included in the report. If no parameter is provided, all customer contacts will be included. |
| `startDate` | <code>string</code> | No | Date yyyy-MM-dd Specifies the start date for the report. If no parameter is provided, the date of 12 months before the end date will be used. It is recommended to always specify both a start date and end date; While the initial range may be set to 12 months, this may need to be reduced for high volume organisations in order to improve latency. |

**Returns:** `IncomeByContactResponse|error`

**Sample code:**

```ballerina
finance:IncomeByContactResponse result = check financeClient->getFinancialStatementContactsRevenue({xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "total": 100.00,
  "endDate": "2026-01-15T00:00:00",
  "totalDetail": {
    "totalCreditedUnApplied": 100.00,
    "totalOutstanding": 100.00,
    "totalPaid": 100.00
  },
  "startDate": "2026-01-15T00:00:00",
  "contacts": [
    {
      "total": 100.00,
      "contactId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "name": "Sample name"
    }
  ],
  "totalOther": {
    "totalCredited": 100.00,
    "totalVoided": 100.00,
    "totalOutstandingAged": 100.00
  }
}
```

</div>
</details>

<details>
<summary>getFinancialStatementContactsExpense</summary>

<div>

Get expense by contacts report.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>GetFinancialStatementContactsExpenseHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |
| `includeManualJournals` | <code>boolean</code> | No | Specifies whether to include the manual journals in the report. If no parameter is provided, manual journals will not be included. |
| `endDate` | <code>string</code> | No | Date yyyy-MM-dd Specifies the end date for the report. If no parameter is provided, the current date will be used. It is recommended to always specify both a start date and end date; While the initial range may be set to 12 months, this may need to be reduced for high volume organisations in order to improve latency. |
| `contactIds` | <code>string[]</code> | No | Specifies the customer contacts to be included in the report. If no parameter is provided, all customer contacts will be included. |
| `startDate` | <code>string</code> | No | Date yyyy-MM-dd Specifies the start date for the report. If no parameter is provided, the date of 12 months before the end date will be used. It is recommended to always specify both a start date and end date; While the initial range may be set to 12 months, this may need to be reduced for high volume organisations in order to improve latency. |

**Returns:** `IncomeByContactResponse|error`

**Sample code:**

```ballerina
finance:IncomeByContactResponse result = check financeClient->getFinancialStatementContactsExpense({xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "total": 100.00,
  "endDate": "2026-01-15T00:00:00",
  "totalDetail": {
    "totalCreditedUnApplied": 100.00,
    "totalOutstanding": 100.00,
    "totalPaid": 100.00
  },
  "startDate": "2026-01-15T00:00:00",
  "contacts": [
    {
      "total": 100.00,
      "contactId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "name": "Sample name"
    }
  ],
  "totalOther": {
    "totalCredited": 100.00,
    "totalVoided": 100.00,
    "totalOutstandingAged": 100.00
  }
}
```

</div>
</details>

#### Bank Statements Plus

<details>
<summary>getBankStatementAccounting</summary>

<div>

Get Bank Statement Accounting.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>GetBankStatementAccountingHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |
| `bankAccountID` | <code>string</code> | Yes | String, GUID Bank account Id. |
| `fromDate` | <code>string</code> | Yes | Date, yyyy-MM-dd Specifies the start date of the query period. The maximum range of the query period is 12 months. If the specified query period is more than 12 months the request will be rejected. |
| `toDate` | <code>string</code> | Yes | Date, yyyy-MM-dd Specifies the end date of the query period. If the end date is a future date, the request will be rejected. |
| `summaryOnly` | <code>boolean</code> | No | Boolean, true/false The default value is true if no parameter is provided. In summary mode, the response will exclude the computation-heavy LineItems fields from bank transaction, invoice, credit note, prepayment and overpayment data, making the API calls quicker and more efficient. |

**Returns:** `BankStatementAccountingResponse|error`

**Sample code:**

```ballerina
finance:BankStatementAccountingResponse result = check financeClient->getBankStatementAccounting({xeroTenantId: tenantId}, bankAccountID = "3fa85f64-5717-4562-b3fc-2c963f66afa6", fromDate = "2026-01-15T00:00:00", toDate = "2026-01-15T00:00:00");
```

**Sample response:**

```json
{
  "bankAccountName": "Sample name",
  "bankAccountId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "bankAccountCurrencyCode": "200",
  "statements": [
    {
      "indicativeEndBalance": 100.00,
      "endDate": "2026-01-15T00:00:00",
      "endBalance": 100.00
    }
  ]
}
```

</div>
</details>
