---
connector: true
connector_name: "xero.accounts"
toc_max_heading_level: 4
title: "Actions"
---

# Actions

The Xero Accounts connector exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Interact with the Xero Accounting API to manage invoices, contacts, payments, bank transactions, financial reports, and all other accounting resources. |

---

## Client

The `Client` connects to the Xero Accounting API (`https://api.xero.com/api.xro/2.0`). It exposes 235 operations. Every operation takes the Xero tenant ID of the organisation in its `headers` record.

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
import ballerinax/xero.accounts;

configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string refreshToken = ?;
configurable string refreshUrl = ?;
configurable string tenantId = ?;

final accounts:Client accountsClient = check new ({
    auth: {clientId, clientSecret, refreshToken, refreshUrl}
});
```

### Operations

#### Accounts

<details>
<summary>getAccounts</summary>

<div>

Retrieves the full chart of accounts.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>GetAccountsHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `ifModifiedSince`. |
| `'where` | <code>string</code> | No | Filter by an any element. |
| `'order` | <code>string</code> | No | Order by an any element. |

**Returns:** `Accounts|error`

**Sample code:**

```ballerina
accounts:Accounts result = check accountsClient->getAccounts({xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "Accounts": [
    {
      "Status": "ACTIVE",
      "AccountID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9",
      "Description": "Sample description"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createAccount</summary>

<div>

Creates a new chart of accounts.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>CreateAccountHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>Account</code> | Yes | Account object in body of request. |

**Returns:** `Accounts|error`

**Sample code:**

```ballerina
accounts:Accounts result = check accountsClient->createAccount({xeroTenantId: tenantId}, {
    status: "ACTIVE",
    description: "Sample description",
    showInExpenseClaims: false,
    code: "200"
});
```

**Sample response:**

```json
{
  "Accounts": [
    {
      "Status": "ACTIVE",
      "AccountID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9",
      "Description": "Sample description"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getAccount</summary>

<div>

Retrieves a single chart of accounts by using a unique account Id.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `accountID` | <code>string</code> | Yes | Unique identifier for Account object. |
| `headers` | <code>GetAccountHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |

**Returns:** `Accounts|error`

**Sample code:**

```ballerina
accounts:Accounts result = check accountsClient->getAccount("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "Accounts": [
    {
      "Status": "ACTIVE",
      "AccountID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9",
      "Description": "Sample description"
    }
  ]
}
```

</div>
</details>

<details>
<summary>updateAccount</summary>

<div>

Updates a chart of accounts.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `accountID` | <code>string</code> | Yes | Unique identifier for Account object. |
| `headers` | <code>UpdateAccountHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>Accounts</code> | Yes | Request of type Accounts array with one Account. |

**Returns:** `Accounts|error`

**Sample code:**

```ballerina
accounts:Accounts result = check accountsClient->updateAccount("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId}, {
    accounts: [{
        status: "ACTIVE",
        description: "Sample description",
        showInExpenseClaims: false
    }]
});
```

**Sample response:**

```json
{
  "Accounts": [
    {
      "Status": "ACTIVE",
      "AccountID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9",
      "Description": "Sample description"
    }
  ]
}
```

</div>
</details>

<details>
<summary>deleteAccount</summary>

<div>

Deletes a chart of accounts.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `accountID` | <code>string</code> | Yes | Unique identifier for Account object. |
| `headers` | <code>DeleteAccountHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |

**Returns:** `Accounts|error`

**Sample code:**

```ballerina
accounts:Accounts result = check accountsClient->deleteAccount("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "Accounts": [
    {
      "Status": "ACTIVE",
      "AccountID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9",
      "Description": "Sample description"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getAccountAttachments</summary>

<div>

Retrieves attachments for a specific accounts by using a unique account Id.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `accountID` | <code>string</code> | Yes | Unique identifier for Account object. |
| `headers` | <code>GetAccountAttachmentsHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |

**Returns:** `Attachments|error`

**Sample code:**

```ballerina
accounts:Attachments result = check accountsClient->getAccountAttachments("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "Attachments": [
    {
      "FileName": "invoice.pdf",
      "ContentLength": 1,
      "IncludeOnline": false
    }
  ]
}
```

</div>
</details>

<details>
<summary>getAccountAttachmentById</summary>

<div>

Retrieves a specific attachment from a specific account using a unique attachment Id.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `accountID` | <code>string</code> | Yes | Unique identifier for Account object. |
| `attachmentID` | <code>string</code> | Yes | Unique identifier for Attachment object. |
| `headers` | <code>GetAccountAttachmentByIdHeaders</code> | Yes | Request headers, including the required `xeroTenantId`, `contentType` (the Xero tenant ID of the organisation). |

**Returns:** `byte[]|error`

**Sample code:**

```ballerina
byte[] result = check accountsClient->getAccountAttachmentById("297c2dc5-cc47-4afd-8ec8-74990b8761e9", "297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId, contentType: "string"});
```

**Sample response:**

The raw response content as `byte[]`.

</div>
</details>

<details>
<summary>getAccountAttachmentByFileName</summary>

<div>

Retrieves an attachment for a specific account by filename.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `accountID` | <code>string</code> | Yes | Unique identifier for Account object. |
| `fileName` | <code>string</code> | Yes | Name of the attachment. |
| `headers` | <code>GetAccountAttachmentByFileNameHeaders</code> | Yes | Request headers, including the required `xeroTenantId`, `contentType` (the Xero tenant ID of the organisation). |

**Returns:** `byte[]|error`

**Sample code:**

```ballerina
byte[] result = check accountsClient->getAccountAttachmentByFileName("297c2dc5-cc47-4afd-8ec8-74990b8761e9", "invoice.pdf", {xeroTenantId: tenantId, contentType: "string"});
```

**Sample response:**

The raw response content as `byte[]`.

</div>
</details>

<details>
<summary>createAccountAttachmentByFileName</summary>

<div>

Creates an attachment on a specific account.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `accountID` | <code>string</code> | Yes | Unique identifier for Account object. |
| `fileName` | <code>string</code> | Yes | Name of the attachment. |
| `headers` | <code>CreateAccountAttachmentByFileNameHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>byte[]</code> | Yes | Byte array of file in body of request. |

**Returns:** `Attachments|error`

**Sample code:**

```ballerina
byte[] fileContent = check io:fileReadBytes("invoice.pdf");
accounts:Attachments result = check accountsClient->createAccountAttachmentByFileName("297c2dc5-cc47-4afd-8ec8-74990b8761e9", "invoice.pdf", {xeroTenantId: tenantId}, fileContent);
```

**Sample response:**

```json
{
  "Attachments": [
    {
      "FileName": "invoice.pdf",
      "ContentLength": 1,
      "IncludeOnline": false
    }
  ]
}
```

</div>
</details>

<details>
<summary>updateAccountAttachmentByFileName</summary>

<div>

Updates attachment on a specific account by filename.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `accountID` | <code>string</code> | Yes | Unique identifier for Account object. |
| `fileName` | <code>string</code> | Yes | Name of the attachment. |
| `headers` | <code>UpdateAccountAttachmentByFileNameHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>byte[]</code> | Yes | Byte array of file in body of request. |

**Returns:** `Attachments|error`

**Sample code:**

```ballerina
byte[] fileContent = check io:fileReadBytes("invoice.pdf");
accounts:Attachments result = check accountsClient->updateAccountAttachmentByFileName("297c2dc5-cc47-4afd-8ec8-74990b8761e9", "invoice.pdf", {xeroTenantId: tenantId}, fileContent);
```

**Sample response:**

```json
{
  "Attachments": [
    {
      "FileName": "invoice.pdf",
      "ContentLength": 1,
      "IncludeOnline": false
    }
  ]
}
```

</div>
</details>

#### Batch Payments

<details>
<summary>getBatchPayments</summary>

<div>

Retrieves either one or many batch payments for invoices.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>GetBatchPaymentsHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `ifModifiedSince`. |
| `'where` | <code>string</code> | No | Filter by an any element. |
| `'order` | <code>string</code> | No | Order by an any element. |

**Returns:** `BatchPayments|error`

**Sample code:**

```ballerina
accounts:BatchPayments result = check accountsClient->getBatchPayments({xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "BatchPayments": [
    {
      "Status": "AUTHORISED",
      "BatchPaymentID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9",
      "UpdatedDateUTC": "2026-01-15T00:00:00"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createBatchPayment</summary>

<div>

Creates one or many batch payments for invoices.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>CreateBatchPaymentHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>BatchPayments</code> | Yes | BatchPayments with an array of Payments in body of request. |
| `summarizeErrors` | <code>boolean</code> | No | If false return 200 OK and mix of successfully created objects and any with validation errors. Defaults to `false`. |

**Returns:** `BatchPayments|error`

**Sample code:**

```ballerina
accounts:BatchPayments result = check accountsClient->createBatchPayment({xeroTenantId: tenantId}, {
    batchPayments: [{
        reference: "REF-001",
        amount: 100.00,
        code: "200"
    }]
});
```

**Sample response:**

```json
{
  "BatchPayments": [
    {
      "Status": "AUTHORISED",
      "BatchPaymentID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9",
      "UpdatedDateUTC": "2026-01-15T00:00:00"
    }
  ]
}
```

</div>
</details>

<details>
<summary>deleteBatchPayment</summary>

<div>

Deletes one or more batch payments by setting their status to DELETED.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>DeleteBatchPaymentHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>BatchPaymentDelete</code> | Yes | Batch payments to delete, each identified by ID with status set to DELETED. |

**Returns:** `BatchPayments|error`

**Sample code:**

```ballerina
accounts:BatchPayments result = check accountsClient->deleteBatchPayment({xeroTenantId: tenantId}, {
    batchPaymentID: "297c2dc5-cc47-4afd-8ec8-74990b8761e9",
    status: "string"
});
```

**Sample response:**

```json
{
  "BatchPayments": [
    {
      "Status": "AUTHORISED",
      "BatchPaymentID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9",
      "UpdatedDateUTC": "2026-01-15T00:00:00"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getBatchPayment</summary>

<div>

Retrieves a specific batch payment using a unique batch payment Id.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `batchPaymentID` | <code>string</code> | Yes | Unique identifier for BatchPayment. |
| `headers` | <code>GetBatchPaymentHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |

**Returns:** `BatchPayments|error`

**Sample code:**

```ballerina
accounts:BatchPayments result = check accountsClient->getBatchPayment("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "BatchPayments": [
    {
      "Status": "AUTHORISED",
      "BatchPaymentID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9",
      "UpdatedDateUTC": "2026-01-15T00:00:00"
    }
  ]
}
```

</div>
</details>

<details>
<summary>deleteBatchPaymentByUrlParam</summary>

<div>

Deletes a specific batch payment by setting its status to DELETED.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `batchPaymentID` | <code>string</code> | Yes | Unique identifier for BatchPayment. |
| `headers` | <code>DeleteBatchPaymentByUrlParamHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>BatchPaymentDeleteByUrlParam</code> | Yes | Status update that deletes the batch payment identified in the path. |

**Returns:** `BatchPayments|error`

**Sample code:**

```ballerina
accounts:BatchPayments result = check accountsClient->deleteBatchPaymentByUrlParam("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId}, {
    status: "string"
});
```

**Sample response:**

```json
{
  "BatchPayments": [
    {
      "Status": "AUTHORISED",
      "BatchPaymentID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9",
      "UpdatedDateUTC": "2026-01-15T00:00:00"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getBatchPaymentHistory</summary>

<div>

Retrieves history from a specific batch payment.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `batchPaymentID` | <code>string</code> | Yes | Unique identifier for BatchPayment. |
| `headers` | <code>GetBatchPaymentHistoryHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |

**Returns:** `HistoryRecords|error`

**Sample code:**

```ballerina
accounts:HistoryRecords result = check accountsClient->getBatchPaymentHistory("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "HistoryRecords": [
    {
      "Changes": "string",
      "Details": "string",
      "User": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createBatchPaymentHistoryRecord</summary>

<div>

Creates a history record for a specific batch payment.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `batchPaymentID` | <code>string</code> | Yes | Unique identifier for BatchPayment. |
| `headers` | <code>CreateBatchPaymentHistoryRecordHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>HistoryRecords</code> | Yes | HistoryRecords containing an array of HistoryRecord objects in body of request. |

**Returns:** `HistoryRecords|error`

**Sample code:**

```ballerina
accounts:HistoryRecords result = check accountsClient->createBatchPaymentHistoryRecord("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId}, {
    historyRecords: [{
        changes: "string",
        details: "string",
        user: "string"
    }]
});
```

**Sample response:**

```json
{
  "HistoryRecords": [
    {
      "Changes": "string",
      "Details": "string",
      "User": "string"
    }
  ]
}
```

</div>
</details>

#### Bank Transactions

<details>
<summary>getBankTransactions</summary>

<div>

Retrieves any spent or received money transactions.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>GetBankTransactionsHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `ifModifiedSince`. |
| `unitdp` | <code>int</code> | No | E.g. unitdp=4: (Unit Decimal Places) You can opt in to use four decimal places for unit amounts. |
| `references` | <code>string[]</code> | No | Filter by a comma-separated list of References. |
| `pageSize` | <code>int</code> | No | Number of records to retrieve per page. |
| `'where` | <code>string</code> | No | Filter by an any element. |
| `page` | <code>int</code> | No | Up to 100 bank transactions will be returned in a single API call with line items details. |
| `'order` | <code>string</code> | No | Order by an any element. |

**Returns:** `BankTransactions|error`

**Sample code:**

```ballerina
accounts:BankTransactions result = check accountsClient->getBankTransactions({xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "BankTransactions": [
    {
      "LineItems": [
        {}
      ],
      "BankAccount": {},
      "Type": "RECEIVE"
    }
  ],
  "pagination": {
    "pageCount": 1,
    "pageSize": 1,
    "page": 1
  },
  "Warnings": [
    {
      "Message": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createBankTransactions</summary>

<div>

Creates one or more spent or received money transaction.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>CreateBankTransactionsHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>BankTransactions</code> | Yes | BankTransactions with an array of BankTransaction objects in body of request. |
| `unitdp` | <code>int</code> | No | E.g. unitdp=4: (Unit Decimal Places) You can opt in to use four decimal places for unit amounts. |
| `summarizeErrors` | <code>boolean</code> | No | If false return 200 OK and mix of successfully created objects and any with validation errors. Defaults to `false`. |

**Returns:** `BankTransactions|error`

**Sample code:**

```ballerina
accounts:BankTransactions result = check accountsClient->createBankTransactions({xeroTenantId: tenantId}, {
    bankTransactions: [{
        lineItems: [{}],
        bankAccount: {},
        'type: "RECEIVE"
    }],
    pagination: {
        pageCount: 1,
        pageSize: 1,
        page: 1
    }
});
```

**Sample response:**

```json
{
  "BankTransactions": [
    {
      "LineItems": [
        {}
      ],
      "BankAccount": {},
      "Type": "RECEIVE"
    }
  ],
  "pagination": {
    "pageCount": 1,
    "pageSize": 1,
    "page": 1
  },
  "Warnings": [
    {
      "Message": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>updateOrCreateBankTransactions</summary>

<div>

Updates or creates one or more spent or received money transaction.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>UpdateOrCreateBankTransactionsHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>BankTransactions</code> | Yes | Bank transactions to create or update. |
| `unitdp` | <code>int</code> | No | E.g. unitdp=4: (Unit Decimal Places) You can opt in to use four decimal places for unit amounts. |
| `summarizeErrors` | <code>boolean</code> | No | If false return 200 OK and mix of successfully created objects and any with validation errors. Defaults to `false`. |

**Returns:** `BankTransactions|error`

**Sample code:**

```ballerina
accounts:BankTransactions result = check accountsClient->updateOrCreateBankTransactions({xeroTenantId: tenantId}, {
    bankTransactions: [{
        lineItems: [{}],
        bankAccount: {},
        'type: "RECEIVE"
    }],
    pagination: {
        pageCount: 1,
        pageSize: 1,
        page: 1
    }
});
```

**Sample response:**

```json
{
  "BankTransactions": [
    {
      "LineItems": [
        {}
      ],
      "BankAccount": {},
      "Type": "RECEIVE"
    }
  ],
  "pagination": {
    "pageCount": 1,
    "pageSize": 1,
    "page": 1
  },
  "Warnings": [
    {
      "Message": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getBankTransaction</summary>

<div>

Retrieves a single spent or received money transaction by using a unique bank transaction Id.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `bankTransactionID` | <code>string</code> | Yes | Xero generated unique identifier for a bank transaction. |
| `headers` | <code>GetBankTransactionHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |
| `unitdp` | <code>int</code> | No | E.g. unitdp=4: (Unit Decimal Places) You can opt in to use four decimal places for unit amounts. |

**Returns:** `BankTransactions|error`

**Sample code:**

```ballerina
accounts:BankTransactions result = check accountsClient->getBankTransaction("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "BankTransactions": [
    {
      "LineItems": [
        {}
      ],
      "BankAccount": {},
      "Type": "RECEIVE"
    }
  ],
  "pagination": {
    "pageCount": 1,
    "pageSize": 1,
    "page": 1
  },
  "Warnings": [
    {
      "Message": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>updateBankTransaction</summary>

<div>

Updates a single spent or received money transaction.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `bankTransactionID` | <code>string</code> | Yes | Xero generated unique identifier for a bank transaction. |
| `headers` | <code>UpdateBankTransactionHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>BankTransactions</code> | Yes | Bank transaction with the fields to update. |
| `unitdp` | <code>int</code> | No | E.g. unitdp=4: (Unit Decimal Places) You can opt in to use four decimal places for unit amounts. |

**Returns:** `BankTransactions|error`

**Sample code:**

```ballerina
accounts:BankTransactions result = check accountsClient->updateBankTransaction("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId}, {
    bankTransactions: [{
        lineItems: [{}],
        bankAccount: {},
        'type: "RECEIVE"
    }],
    pagination: {
        pageCount: 1,
        pageSize: 1,
        page: 1
    }
});
```

**Sample response:**

```json
{
  "BankTransactions": [
    {
      "LineItems": [
        {}
      ],
      "BankAccount": {},
      "Type": "RECEIVE"
    }
  ],
  "pagination": {
    "pageCount": 1,
    "pageSize": 1,
    "page": 1
  },
  "Warnings": [
    {
      "Message": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getBankTransactionAttachments</summary>

<div>

Retrieves any attachments from a specific bank transactions.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `bankTransactionID` | <code>string</code> | Yes | Xero generated unique identifier for a bank transaction. |
| `headers` | <code>GetBankTransactionAttachmentsHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |

**Returns:** `Attachments|error`

**Sample code:**

```ballerina
accounts:Attachments result = check accountsClient->getBankTransactionAttachments("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "Attachments": [
    {
      "FileName": "invoice.pdf",
      "ContentLength": 1,
      "IncludeOnline": false
    }
  ]
}
```

</div>
</details>

<details>
<summary>getBankTransactionAttachmentById</summary>

<div>

Retrieves specific attachments from a specific BankTransaction using a unique attachment Id.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `bankTransactionID` | <code>string</code> | Yes | Xero generated unique identifier for a bank transaction. |
| `attachmentID` | <code>string</code> | Yes | Unique identifier for Attachment object. |
| `headers` | <code>GetBankTransactionAttachmentByIdHeaders</code> | Yes | Request headers, including the required `xeroTenantId`, `contentType` (the Xero tenant ID of the organisation). |

**Returns:** `byte[]|error`

**Sample code:**

```ballerina
byte[] result = check accountsClient->getBankTransactionAttachmentById("297c2dc5-cc47-4afd-8ec8-74990b8761e9", "297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId, contentType: "string"});
```

**Sample response:**

The raw response content as `byte[]`.

</div>
</details>

<details>
<summary>getBankTransactionAttachmentByFileName</summary>

<div>

Retrieves a specific attachment from a specific bank transaction by filename.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `bankTransactionID` | <code>string</code> | Yes | Xero generated unique identifier for a bank transaction. |
| `fileName` | <code>string</code> | Yes | Name of the attachment. |
| `headers` | <code>GetBankTransactionAttachmentByFileNameHeaders</code> | Yes | Request headers, including the required `xeroTenantId`, `contentType` (the Xero tenant ID of the organisation). |

**Returns:** `byte[]|error`

**Sample code:**

```ballerina
byte[] result = check accountsClient->getBankTransactionAttachmentByFileName("297c2dc5-cc47-4afd-8ec8-74990b8761e9", "invoice.pdf", {xeroTenantId: tenantId, contentType: "string"});
```

**Sample response:**

The raw response content as `byte[]`.

</div>
</details>

<details>
<summary>createBankTransactionAttachmentByFileName</summary>

<div>

Creates an attachment for a specific bank transaction by filename.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `bankTransactionID` | <code>string</code> | Yes | Xero generated unique identifier for a bank transaction. |
| `fileName` | <code>string</code> | Yes | Name of the attachment. |
| `headers` | <code>CreateBankTransactionAttachmentByFileNameHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>byte[]</code> | Yes | Byte array of file in body of request. |

**Returns:** `Attachments|error`

**Sample code:**

```ballerina
byte[] fileContent = check io:fileReadBytes("invoice.pdf");
accounts:Attachments result = check accountsClient->createBankTransactionAttachmentByFileName("297c2dc5-cc47-4afd-8ec8-74990b8761e9", "invoice.pdf", {xeroTenantId: tenantId}, fileContent);
```

**Sample response:**

```json
{
  "Attachments": [
    {
      "FileName": "invoice.pdf",
      "ContentLength": 1,
      "IncludeOnline": false
    }
  ]
}
```

</div>
</details>

<details>
<summary>updateBankTransactionAttachmentByFileName</summary>

<div>

Updates a specific attachment from a specific bank transaction by filename.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `bankTransactionID` | <code>string</code> | Yes | Xero generated unique identifier for a bank transaction. |
| `fileName` | <code>string</code> | Yes | Name of the attachment. |
| `headers` | <code>UpdateBankTransactionAttachmentByFileNameHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>byte[]</code> | Yes | Byte array of file in body of request. |

**Returns:** `Attachments|error`

**Sample code:**

```ballerina
byte[] fileContent = check io:fileReadBytes("invoice.pdf");
accounts:Attachments result = check accountsClient->updateBankTransactionAttachmentByFileName("297c2dc5-cc47-4afd-8ec8-74990b8761e9", "invoice.pdf", {xeroTenantId: tenantId}, fileContent);
```

**Sample response:**

```json
{
  "Attachments": [
    {
      "FileName": "invoice.pdf",
      "ContentLength": 1,
      "IncludeOnline": false
    }
  ]
}
```

</div>
</details>

<details>
<summary>getBankTransactionsHistory</summary>

<div>

Retrieves history from a specific bank transaction using a unique bank transaction Id.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `bankTransactionID` | <code>string</code> | Yes | Xero generated unique identifier for a bank transaction. |
| `headers` | <code>GetBankTransactionsHistoryHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |

**Returns:** `HistoryRecords|error`

**Sample code:**

```ballerina
accounts:HistoryRecords result = check accountsClient->getBankTransactionsHistory("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "HistoryRecords": [
    {
      "Changes": "string",
      "Details": "string",
      "User": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createBankTransactionHistoryRecord</summary>

<div>

Creates a history record for a specific bank transactions.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `bankTransactionID` | <code>string</code> | Yes | Xero generated unique identifier for a bank transaction. |
| `headers` | <code>CreateBankTransactionHistoryRecordHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>HistoryRecords</code> | Yes | HistoryRecords containing an array of HistoryRecord objects in body of request. |

**Returns:** `HistoryRecords|error`

**Sample code:**

```ballerina
accounts:HistoryRecords result = check accountsClient->createBankTransactionHistoryRecord("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId}, {
    historyRecords: [{
        changes: "string",
        details: "string",
        user: "string"
    }]
});
```

**Sample response:**

```json
{
  "HistoryRecords": [
    {
      "Changes": "string",
      "Details": "string",
      "User": "string"
    }
  ]
}
```

</div>
</details>

#### Bank Transfers

<details>
<summary>getBankTransfers</summary>

<div>

Retrieves all bank transfers.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>GetBankTransfersHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `ifModifiedSince`. |
| `includeDeleted` | <code>boolean</code> | No | E.g. includeDeleted=true - Bank transfers with a status of DELETED will be included in the response. |
| `'where` | <code>string</code> | No | Filter by an any element. |
| `'order` | <code>string</code> | No | Order by an any element. |

**Returns:** `BankTransfers|error`

**Sample code:**

```ballerina
accounts:BankTransfers result = check accountsClient->getBankTransfers({xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "BankTransfers": [
    {
      "Amount": 100.00,
      "FromBankAccount": {},
      "ToBankAccount": {}
    }
  ]
}
```

</div>
</details>

<details>
<summary>createBankTransfer</summary>

<div>

Creates a bank transfer.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>CreateBankTransferHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>BankTransfers</code> | Yes | BankTransfers with array of BankTransfer objects in request body. |

**Returns:** `BankTransfers|error`

**Sample code:**

```ballerina
accounts:BankTransfers result = check accountsClient->createBankTransfer({xeroTenantId: tenantId}, {
    bankTransfers: [{
        amount: 100.00,
        fromBankAccount: {},
        toBankAccount: {}
    }]
});
```

**Sample response:**

```json
{
  "BankTransfers": [
    {
      "Amount": 100.00,
      "FromBankAccount": {},
      "ToBankAccount": {}
    }
  ]
}
```

</div>
</details>

<details>
<summary>deleteBankTransfers</summary>

<div>

Deletes one or more bank transfers.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>DeleteBankTransfersHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>BankTransfersDelete</code> | Yes | BankTransfers with array of BankTransfer objects in request body. |
| `summarizeErrors` | <code>boolean</code> | No | If false return 200 OK and mix of successfully created objects and any with validation errors. Defaults to `false`. |

**Returns:** `BankTransfers|error`

**Sample code:**

```ballerina
accounts:BankTransfers result = check accountsClient->deleteBankTransfers({xeroTenantId: tenantId}, {
    bankTransfers: [{
        bankTransferID: "297c2dc5-cc47-4afd-8ec8-74990b8761e9",
        status: "string"
    }]
});
```

**Sample response:**

```json
{
  "BankTransfers": [
    {
      "Amount": 100.00,
      "FromBankAccount": {},
      "ToBankAccount": {}
    }
  ]
}
```

</div>
</details>

<details>
<summary>getBankTransfer</summary>

<div>

Retrieves specific bank transfers by using a unique bank transfer Id.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `bankTransferID` | <code>string</code> | Yes | Xero generated unique identifier for a bank transfer. |
| `headers` | <code>GetBankTransferHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |

**Returns:** `BankTransfers|error`

**Sample code:**

```ballerina
accounts:BankTransfers result = check accountsClient->getBankTransfer("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "BankTransfers": [
    {
      "Amount": 100.00,
      "FromBankAccount": {},
      "ToBankAccount": {}
    }
  ]
}
```

</div>
</details>

<details>
<summary>deleteBankTransfer</summary>

<div>

Deletes a specific bank transfer.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `bankTransferID` | <code>string</code> | Yes | Xero generated unique identifier for a bank transfer. |
| `headers` | <code>DeleteBankTransferHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>BankTransferDeleteByUrlParam</code> | Yes | Status update that deletes the bank transfer identified in the path. |

**Returns:** `BankTransfers|error`

**Sample code:**

```ballerina
accounts:BankTransfers result = check accountsClient->deleteBankTransfer("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId}, {
    status: "string"
});
```

**Sample response:**

```json
{
  "BankTransfers": [
    {
      "Amount": 100.00,
      "FromBankAccount": {},
      "ToBankAccount": {}
    }
  ]
}
```

</div>
</details>

<details>
<summary>getBankTransferAttachments</summary>

<div>

Retrieves attachments from a specific bank transfer.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `bankTransferID` | <code>string</code> | Yes | Xero generated unique identifier for a bank transfer. |
| `headers` | <code>GetBankTransferAttachmentsHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |

**Returns:** `Attachments|error`

**Sample code:**

```ballerina
accounts:Attachments result = check accountsClient->getBankTransferAttachments("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "Attachments": [
    {
      "FileName": "invoice.pdf",
      "ContentLength": 1,
      "IncludeOnline": false
    }
  ]
}
```

</div>
</details>

<details>
<summary>getBankTransferAttachmentById</summary>

<div>

Retrieves a specific attachment from a specific bank transfer using a unique attachment ID.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `bankTransferID` | <code>string</code> | Yes | Xero generated unique identifier for a bank transfer. |
| `attachmentID` | <code>string</code> | Yes | Unique identifier for Attachment object. |
| `headers` | <code>GetBankTransferAttachmentByIdHeaders</code> | Yes | Request headers, including the required `xeroTenantId`, `contentType` (the Xero tenant ID of the organisation). |

**Returns:** `byte[]|error`

**Sample code:**

```ballerina
byte[] result = check accountsClient->getBankTransferAttachmentById("297c2dc5-cc47-4afd-8ec8-74990b8761e9", "297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId, contentType: "string"});
```

**Sample response:**

The raw response content as `byte[]`.

</div>
</details>

<details>
<summary>getBankTransferAttachmentByFileName</summary>

<div>

Retrieves a specific attachment on a specific bank transfer by file name.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `bankTransferID` | <code>string</code> | Yes | Xero generated unique identifier for a bank transfer. |
| `fileName` | <code>string</code> | Yes | Name of the attachment. |
| `headers` | <code>GetBankTransferAttachmentByFileNameHeaders</code> | Yes | Request headers, including the required `xeroTenantId`, `contentType` (the Xero tenant ID of the organisation). |

**Returns:** `byte[]|error`

**Sample code:**

```ballerina
byte[] result = check accountsClient->getBankTransferAttachmentByFileName("297c2dc5-cc47-4afd-8ec8-74990b8761e9", "invoice.pdf", {xeroTenantId: tenantId, contentType: "string"});
```

**Sample response:**

The raw response content as `byte[]`.

</div>
</details>

<details>
<summary>createBankTransferAttachmentByFileName</summary>

<div>

Uploads an attachment to a specific bank transfer by file name.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `bankTransferID` | <code>string</code> | Yes | Xero generated unique identifier for a bank transfer. |
| `fileName` | <code>string</code> | Yes | Name of the attachment. |
| `headers` | <code>CreateBankTransferAttachmentByFileNameHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>byte[]</code> | Yes | Byte array of file in body of request. |

**Returns:** `Attachments|error`

**Sample code:**

```ballerina
byte[] fileContent = check io:fileReadBytes("invoice.pdf");
accounts:Attachments result = check accountsClient->createBankTransferAttachmentByFileName("297c2dc5-cc47-4afd-8ec8-74990b8761e9", "invoice.pdf", {xeroTenantId: tenantId}, fileContent);
```

**Sample response:**

```json
{
  "Attachments": [
    {
      "FileName": "invoice.pdf",
      "ContentLength": 1,
      "IncludeOnline": false
    }
  ]
}
```

</div>
</details>

<details>
<summary>updateBankTransferAttachmentByFileName</summary>

<div>

Updates an attachment on a specific bank transfer by file name.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `bankTransferID` | <code>string</code> | Yes | Xero generated unique identifier for a bank transfer. |
| `fileName` | <code>string</code> | Yes | Name of the attachment. |
| `headers` | <code>UpdateBankTransferAttachmentByFileNameHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>byte[]</code> | Yes | Byte array of file in body of request. |

**Returns:** `Attachments|error`

**Sample code:**

```ballerina
byte[] fileContent = check io:fileReadBytes("invoice.pdf");
accounts:Attachments result = check accountsClient->updateBankTransferAttachmentByFileName("297c2dc5-cc47-4afd-8ec8-74990b8761e9", "invoice.pdf", {xeroTenantId: tenantId}, fileContent);
```

**Sample response:**

```json
{
  "Attachments": [
    {
      "FileName": "invoice.pdf",
      "ContentLength": 1,
      "IncludeOnline": false
    }
  ]
}
```

</div>
</details>

<details>
<summary>getBankTransferHistory</summary>

<div>

Retrieves history from a specific bank transfer using a unique bank transfer Id.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `bankTransferID` | <code>string</code> | Yes | Xero generated unique identifier for a bank transfer. |
| `headers` | <code>GetBankTransferHistoryHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |

**Returns:** `HistoryRecords|error`

**Sample code:**

```ballerina
accounts:HistoryRecords result = check accountsClient->getBankTransferHistory("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "HistoryRecords": [
    {
      "Changes": "string",
      "Details": "string",
      "User": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createBankTransferHistoryRecord</summary>

<div>

Creates a history record for a specific bank transfer.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `bankTransferID` | <code>string</code> | Yes | Xero generated unique identifier for a bank transfer. |
| `headers` | <code>CreateBankTransferHistoryRecordHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>HistoryRecords</code> | Yes | HistoryRecords containing an array of HistoryRecord objects in body of request. |

**Returns:** `HistoryRecords|error`

**Sample code:**

```ballerina
accounts:HistoryRecords result = check accountsClient->createBankTransferHistoryRecord("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId}, {
    historyRecords: [{
        changes: "string",
        details: "string",
        user: "string"
    }]
});
```

**Sample response:**

```json
{
  "HistoryRecords": [
    {
      "Changes": "string",
      "Details": "string",
      "User": "string"
    }
  ]
}
```

</div>
</details>

#### Branding Themes

<details>
<summary>getBrandingThemes</summary>

<div>

Retrieves all the branding themes.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>GetBrandingThemesHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |

**Returns:** `BrandingThemes|error`

**Sample code:**

```ballerina
accounts:BrandingThemes result = check accountsClient->getBrandingThemes({xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "BrandingThemes": [
    {
      "CreatedDateUTC": "2026-01-15T00:00:00",
      "BrandingThemeID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9",
      "Type": "INVOICE"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getBrandingTheme</summary>

<div>

Retrieves a specific branding theme using a unique branding theme Id.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `brandingThemeID` | <code>string</code> | Yes | Unique identifier for a Branding Theme. |
| `headers` | <code>GetBrandingThemeHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |

**Returns:** `BrandingThemes|error`

**Sample code:**

```ballerina
accounts:BrandingThemes result = check accountsClient->getBrandingTheme("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "BrandingThemes": [
    {
      "CreatedDateUTC": "2026-01-15T00:00:00",
      "BrandingThemeID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9",
      "Type": "INVOICE"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getBrandingThemePaymentServices</summary>

<div>

Retrieves the payment services for a specific branding theme.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `brandingThemeID` | <code>string</code> | Yes | Unique identifier for a Branding Theme. |
| `headers` | <code>GetBrandingThemePaymentServicesHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |

**Returns:** `PaymentServices|error`

**Sample code:**

```ballerina
accounts:PaymentServices result = check accountsClient->getBrandingThemePaymentServices("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "PaymentServices": [
    {
      "PaymentServiceID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9",
      "PaymentServiceName": "Sample name",
      "PaymentServiceUrl": "https://example.com/resource"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createBrandingThemePaymentServices</summary>

<div>

Creates a new custom payment service for a specific branding theme.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `brandingThemeID` | <code>string</code> | Yes | Unique identifier for a Branding Theme. |
| `headers` | <code>CreateBrandingThemePaymentServicesHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>PaymentServices</code> | Yes | PaymentServices array with PaymentService object in body of request. |

**Returns:** `PaymentServices|error`

**Sample code:**

```ballerina
accounts:PaymentServices result = check accountsClient->createBrandingThemePaymentServices("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId}, {
    paymentServices: [{
        PaymentServiceName: "Sample name",
        PaymentServiceUrl: "https://example.com/resource",
        PayNowText: "string"
    }]
});
```

**Sample response:**

```json
{
  "PaymentServices": [
    {
      "PaymentServiceID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9",
      "PaymentServiceName": "Sample name",
      "PaymentServiceUrl": "https://example.com/resource"
    }
  ]
}
```

</div>
</details>

#### Budgets

<details>
<summary>getBudgets</summary>

<div>

Retrieve a list of budgets.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>GetBudgetsHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |
| `dateFrom` | <code>string</code> | No | Filter by end date. |
| `iDs` | <code>string[]</code> | No | Filter by BudgetID. Allows you to retrieve a specific individual budget. |
| `dateTo` | <code>string</code> | No | Filter by start date. |

**Returns:** `Budgets|error`

**Sample code:**

```ballerina
accounts:Budgets result = check accountsClient->getBudgets({xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "Budgets": [
    {
      "Type": "OVERALL",
      "Description": "Sample description",
      "UpdatedDateUTC": "2026-01-15T00:00:00"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getBudget</summary>

<div>

Retrieves a specific budget, which includes budget lines.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `budgetID` | <code>string</code> | Yes | Unique identifier for Budgets. |
| `headers` | <code>GetBudgetHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |
| `dateFrom` | <code>string</code> | No | Filter by end date. |
| `dateTo` | <code>string</code> | No | Filter by start date. |

**Returns:** `Budgets|error`

**Sample code:**

```ballerina
accounts:Budgets result = check accountsClient->getBudget("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "Budgets": [
    {
      "Type": "OVERALL",
      "Description": "Sample description",
      "UpdatedDateUTC": "2026-01-15T00:00:00"
    }
  ]
}
```

</div>
</details>

#### Contacts

<details>
<summary>getContacts</summary>

<div>

Retrieves all contacts in a Xero organisation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>GetContactsHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `ifModifiedSince`. |
| `includeArchived` | <code>boolean</code> | No | E.g. includeArchived=true - Contacts with a status of ARCHIVED will be included in the response. |
| `summaryOnly` | <code>boolean</code> | No | Use summaryOnly=true in GET Contacts and Invoices endpoint to retrieve a smaller version of the response object. This returns only lightweight fields, excluding computation-heavy fields from the response, making the API calls quick and efficient. Defaults to `false`. |
| `searchTerm` | <code>string</code> | No | Search parameter that performs a case-insensitive text search across the Name, FirstName, LastName, ContactNumber and EmailAddress fields. |
| `iDs` | <code>string[]</code> | No | Filter by a comma separated list of ContactIDs. Allows you to retrieve a specific set of contacts in a single call. |
| `pageSize` | <code>int</code> | No | Number of records to retrieve per page. |
| `'where` | <code>string</code> | No | Filter by an any element. |
| `page` | <code>int</code> | No | E.g. page=1 - Up to 100 contacts will be returned in a single API call. |
| `'order` | <code>string</code> | No | Order by an any element. |

**Returns:** `Contacts|error`

**Sample code:**

```ballerina
accounts:Contacts result = check accountsClient->getContacts({xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "pagination": {
    "pageCount": 1,
    "pageSize": 1,
    "page": 1
  },
  "Contacts": [
    {
      "Discount": 100.00,
      "UpdatedDateUTC": "2026-01-15T00:00:00",
      "PurchasesDefaultLineAmountType": "INCLUSIVE"
    }
  ],
  "Warnings": [
    {
      "Message": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createContacts</summary>

<div>

Creates multiple contacts (bulk) in a Xero organisation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>CreateContactsHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>Contacts</code> | Yes | Contacts with an array of Contact objects to create in body of request. |
| `summarizeErrors` | <code>boolean</code> | No | If false return 200 OK and mix of successfully created objects and any with validation errors. Defaults to `false`. |

**Returns:** `Contacts|error`

**Sample code:**

```ballerina
accounts:Contacts result = check accountsClient->createContacts({xeroTenantId: tenantId}, {
    pagination: {
        pageCount: 1,
        pageSize: 1,
        page: 1
    },
    contacts: [{
        purchasesDefaultLineAmountType: "INCLUSIVE",
        salesDefaultLineAmountType: "INCLUSIVE",
        name: "Sample name"
    }]
});
```

**Sample response:**

```json
{
  "pagination": {
    "pageCount": 1,
    "pageSize": 1,
    "page": 1
  },
  "Contacts": [
    {
      "Discount": 100.00,
      "UpdatedDateUTC": "2026-01-15T00:00:00",
      "PurchasesDefaultLineAmountType": "INCLUSIVE"
    }
  ],
  "Warnings": [
    {
      "Message": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>updateOrCreateContacts</summary>

<div>

Updates or creates one or more contacts in a Xero organisation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>UpdateOrCreateContactsHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>Contacts</code> | Yes | Contacts to create or update. |
| `summarizeErrors` | <code>boolean</code> | No | If false return 200 OK and mix of successfully created objects and any with validation errors. Defaults to `false`. |

**Returns:** `Contacts|error`

**Sample code:**

```ballerina
accounts:Contacts result = check accountsClient->updateOrCreateContacts({xeroTenantId: tenantId}, {
    pagination: {
        pageCount: 1,
        pageSize: 1,
        page: 1
    },
    contacts: [{
        purchasesDefaultLineAmountType: "INCLUSIVE",
        salesDefaultLineAmountType: "INCLUSIVE",
        name: "Sample name"
    }]
});
```

**Sample response:**

```json
{
  "pagination": {
    "pageCount": 1,
    "pageSize": 1,
    "page": 1
  },
  "Contacts": [
    {
      "Discount": 100.00,
      "UpdatedDateUTC": "2026-01-15T00:00:00",
      "PurchasesDefaultLineAmountType": "INCLUSIVE"
    }
  ],
  "Warnings": [
    {
      "Message": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getContactByContactNumber</summary>

<div>

Retrieves a specific contact by contact number in a Xero organisation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `contactNumber` | <code>string</code> | Yes | This field is read only on the Xero contact screen, used to identify contacts in external systems (max length = 50). |
| `headers` | <code>GetContactByContactNumberHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |

**Returns:** `Contacts|error`

**Sample code:**

```ballerina
accounts:Contacts result = check accountsClient->getContactByContactNumber("INV-0001", {xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "pagination": {
    "pageCount": 1,
    "pageSize": 1,
    "page": 1
  },
  "Contacts": [
    {
      "Discount": 100.00,
      "UpdatedDateUTC": "2026-01-15T00:00:00",
      "PurchasesDefaultLineAmountType": "INCLUSIVE"
    }
  ],
  "Warnings": [
    {
      "Message": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getContact</summary>

<div>

Retrieves a specific contacts in a Xero organisation using a unique contact Id.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `contactID` | <code>string</code> | Yes | Unique identifier for a Contact. |
| `headers` | <code>GetContactHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |

**Returns:** `Contacts|error`

**Sample code:**

```ballerina
accounts:Contacts result = check accountsClient->getContact("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "pagination": {
    "pageCount": 1,
    "pageSize": 1,
    "page": 1
  },
  "Contacts": [
    {
      "Discount": 100.00,
      "UpdatedDateUTC": "2026-01-15T00:00:00",
      "PurchasesDefaultLineAmountType": "INCLUSIVE"
    }
  ],
  "Warnings": [
    {
      "Message": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>updateContact</summary>

<div>

Updates a specific contact in a Xero organisation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `contactID` | <code>string</code> | Yes | Unique identifier for a Contact. |
| `headers` | <code>UpdateContactHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>Contacts</code> | Yes | An array of Contacts containing single Contact object with properties to update. |

**Returns:** `Contacts|error`

**Sample code:**

```ballerina
accounts:Contacts result = check accountsClient->updateContact("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId}, {
    pagination: {
        pageCount: 1,
        pageSize: 1,
        page: 1
    },
    contacts: [{
        purchasesDefaultLineAmountType: "INCLUSIVE",
        salesDefaultLineAmountType: "INCLUSIVE",
        name: "Sample name"
    }]
});
```

**Sample response:**

```json
{
  "pagination": {
    "pageCount": 1,
    "pageSize": 1,
    "page": 1
  },
  "Contacts": [
    {
      "Discount": 100.00,
      "UpdatedDateUTC": "2026-01-15T00:00:00",
      "PurchasesDefaultLineAmountType": "INCLUSIVE"
    }
  ],
  "Warnings": [
    {
      "Message": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getContactAttachments</summary>

<div>

Retrieves attachments for a specific contact in a Xero organisation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `contactID` | <code>string</code> | Yes | Unique identifier for a Contact. |
| `headers` | <code>GetContactAttachmentsHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |

**Returns:** `Attachments|error`

**Sample code:**

```ballerina
accounts:Attachments result = check accountsClient->getContactAttachments("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "Attachments": [
    {
      "FileName": "invoice.pdf",
      "ContentLength": 1,
      "IncludeOnline": false
    }
  ]
}
```

</div>
</details>

<details>
<summary>getContactAttachmentById</summary>

<div>

Retrieves a specific attachment from a specific contact using a unique attachment Id.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `contactID` | <code>string</code> | Yes | Unique identifier for a Contact. |
| `attachmentID` | <code>string</code> | Yes | Unique identifier for Attachment object. |
| `headers` | <code>GetContactAttachmentByIdHeaders</code> | Yes | Request headers, including the required `xeroTenantId`, `contentType` (the Xero tenant ID of the organisation). |

**Returns:** `byte[]|error`

**Sample code:**

```ballerina
byte[] result = check accountsClient->getContactAttachmentById("297c2dc5-cc47-4afd-8ec8-74990b8761e9", "297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId, contentType: "string"});
```

**Sample response:**

The raw response content as `byte[]`.

</div>
</details>

<details>
<summary>getContactAttachmentByFileName</summary>

<div>

Retrieves a specific attachment from a specific contact by file name.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `contactID` | <code>string</code> | Yes | Unique identifier for a Contact. |
| `fileName` | <code>string</code> | Yes | Name of the attachment. |
| `headers` | <code>GetContactAttachmentByFileNameHeaders</code> | Yes | Request headers, including the required `xeroTenantId`, `contentType` (the Xero tenant ID of the organisation). |

**Returns:** `byte[]|error`

**Sample code:**

```ballerina
byte[] result = check accountsClient->getContactAttachmentByFileName("297c2dc5-cc47-4afd-8ec8-74990b8761e9", "invoice.pdf", {xeroTenantId: tenantId, contentType: "string"});
```

**Sample response:**

The raw response content as `byte[]`.

</div>
</details>

<details>
<summary>createContactAttachmentByFileName</summary>

<div>

Uploads an attachment to a specific contact by file name.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `contactID` | <code>string</code> | Yes | Unique identifier for a Contact. |
| `fileName` | <code>string</code> | Yes | Name of the attachment. |
| `headers` | <code>CreateContactAttachmentByFileNameHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>byte[]</code> | Yes | Byte array of file in body of request. |

**Returns:** `Attachments|error`

**Sample code:**

```ballerina
byte[] fileContent = check io:fileReadBytes("invoice.pdf");
accounts:Attachments result = check accountsClient->createContactAttachmentByFileName("297c2dc5-cc47-4afd-8ec8-74990b8761e9", "invoice.pdf", {xeroTenantId: tenantId}, fileContent);
```

**Sample response:**

```json
{
  "Attachments": [
    {
      "FileName": "invoice.pdf",
      "ContentLength": 1,
      "IncludeOnline": false
    }
  ]
}
```

</div>
</details>

<details>
<summary>updateContactAttachmentByFileName</summary>

<div>

Updates an attachment on a specific contact by file name.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `contactID` | <code>string</code> | Yes | Unique identifier for a Contact. |
| `fileName` | <code>string</code> | Yes | Name of the attachment. |
| `headers` | <code>UpdateContactAttachmentByFileNameHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>byte[]</code> | Yes | Byte array of file in body of request. |

**Returns:** `Attachments|error`

**Sample code:**

```ballerina
byte[] fileContent = check io:fileReadBytes("invoice.pdf");
accounts:Attachments result = check accountsClient->updateContactAttachmentByFileName("297c2dc5-cc47-4afd-8ec8-74990b8761e9", "invoice.pdf", {xeroTenantId: tenantId}, fileContent);
```

**Sample response:**

```json
{
  "Attachments": [
    {
      "FileName": "invoice.pdf",
      "ContentLength": 1,
      "IncludeOnline": false
    }
  ]
}
```

</div>
</details>

<details>
<summary>getContactCISSettings</summary>

<div>

Retrieves CIS settings for a specific contact in a Xero organisation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `contactID` | <code>string</code> | Yes | Unique identifier for a Contact. |
| `headers` | <code>GetContactCISSettingsHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |

**Returns:** `CISSettings|error`

**Sample code:**

```ballerina
accounts:CISSettings result = check accountsClient->getContactCISSettings("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "CISSettings": [
    {
      "CISEnabled": false,
      "Rate": 100.00
    }
  ]
}
```

</div>
</details>

<details>
<summary>getContactHistory</summary>

<div>

Retrieves history records for a specific contact.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `contactID` | <code>string</code> | Yes | Unique identifier for a Contact. |
| `headers` | <code>GetContactHistoryHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |

**Returns:** `HistoryRecords|error`

**Sample code:**

```ballerina
accounts:HistoryRecords result = check accountsClient->getContactHistory("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "HistoryRecords": [
    {
      "Changes": "string",
      "Details": "string",
      "User": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createContactHistory</summary>

<div>

Creates a new history record for a specific contact.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `contactID` | <code>string</code> | Yes | Unique identifier for a Contact. |
| `headers` | <code>CreateContactHistoryHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>HistoryRecords</code> | Yes | HistoryRecords containing an array of HistoryRecord objects in body of request. |

**Returns:** `HistoryRecords|error`

**Sample code:**

```ballerina
accounts:HistoryRecords result = check accountsClient->createContactHistory("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId}, {
    historyRecords: [{
        changes: "string",
        details: "string",
        user: "string"
    }]
});
```

**Sample response:**

```json
{
  "HistoryRecords": [
    {
      "Changes": "string",
      "Details": "string",
      "User": "string"
    }
  ]
}
```

</div>
</details>

#### Contact Groups

<details>
<summary>getContactGroups</summary>

<div>

Retrieves the contact Id and name of each contact group.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>GetContactGroupsHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |
| `'where` | <code>string</code> | No | Filter by an any element. |
| `'order` | <code>string</code> | No | Order by an any element. |

**Returns:** `ContactGroups|error`

**Sample code:**

```ballerina
accounts:ContactGroups result = check accountsClient->getContactGroups({xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "ContactGroups": [
    {
      "Status": "ACTIVE",
      "ContactGroupID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9",
      "Name": "Sample name"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createContactGroup</summary>

<div>

Creates a contact group.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>CreateContactGroupHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>ContactGroups</code> | Yes | ContactGroups with an array of names in request body. |

**Returns:** `ContactGroups|error`

**Sample code:**

```ballerina
accounts:ContactGroups result = check accountsClient->createContactGroup({xeroTenantId: tenantId}, {
    contactGroups: [{
        status: "ACTIVE",
        name: "Sample name"
    }]
});
```

**Sample response:**

```json
{
  "ContactGroups": [
    {
      "Status": "ACTIVE",
      "ContactGroupID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9",
      "Name": "Sample name"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getContactGroup</summary>

<div>

Retrieves a specific contact group by using a unique contact group Id.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `contactGroupID` | <code>string</code> | Yes | Unique identifier for a Contact Group. |
| `headers` | <code>GetContactGroupHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |

**Returns:** `ContactGroups|error`

**Sample code:**

```ballerina
accounts:ContactGroups result = check accountsClient->getContactGroup("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "ContactGroups": [
    {
      "Status": "ACTIVE",
      "ContactGroupID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9",
      "Name": "Sample name"
    }
  ]
}
```

</div>
</details>

<details>
<summary>updateContactGroup</summary>

<div>

Updates a specific contact group.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `contactGroupID` | <code>string</code> | Yes | Unique identifier for a Contact Group. |
| `headers` | <code>UpdateContactGroupHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>ContactGroups</code> | Yes | An array of Contact groups with Name of specific group to update. |

**Returns:** `ContactGroups|error`

**Sample code:**

```ballerina
accounts:ContactGroups result = check accountsClient->updateContactGroup("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId}, {
    contactGroups: [{
        status: "ACTIVE",
        name: "Sample name"
    }]
});
```

**Sample response:**

```json
{
  "ContactGroups": [
    {
      "Status": "ACTIVE",
      "ContactGroupID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9",
      "Name": "Sample name"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createContactGroupContacts</summary>

<div>

Creates contacts to a specific contact group.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `contactGroupID` | <code>string</code> | Yes | Unique identifier for a Contact Group. |
| `headers` | <code>CreateContactGroupContactsHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>Contacts</code> | Yes | Contacts with array of contacts specifying the ContactID to be added to ContactGroup in body of request. |

**Returns:** `Contacts|error`

**Sample code:**

```ballerina
accounts:Contacts result = check accountsClient->createContactGroupContacts("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId}, {
    pagination: {
        pageCount: 1,
        pageSize: 1,
        page: 1
    },
    contacts: [{
        purchasesDefaultLineAmountType: "INCLUSIVE",
        salesDefaultLineAmountType: "INCLUSIVE",
        name: "Sample name"
    }]
});
```

**Sample response:**

```json
{
  "pagination": {
    "pageCount": 1,
    "pageSize": 1,
    "page": 1
  },
  "Contacts": [
    {
      "Discount": 100.00,
      "UpdatedDateUTC": "2026-01-15T00:00:00",
      "PurchasesDefaultLineAmountType": "INCLUSIVE"
    }
  ],
  "Warnings": [
    {
      "Message": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>deleteContactGroupContacts</summary>

<div>

Deletes all contacts from a specific contact group.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `contactGroupID` | <code>string</code> | Yes | Unique identifier for a Contact Group. |
| `headers` | <code>DeleteContactGroupContactsHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |

**Returns:** `error?`

**Sample code:**

```ballerina
check accountsClient->deleteContactGroupContacts("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId});
```

</div>
</details>

<details>
<summary>deleteContactGroupContact</summary>

<div>

Deletes a specific contact from a contact group using a unique contact Id.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `contactGroupID` | <code>string</code> | Yes | Unique identifier for a Contact Group. |
| `contactID` | <code>string</code> | Yes | Unique identifier for a Contact. |
| `headers` | <code>DeleteContactGroupContactHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |

**Returns:** `error?`

**Sample code:**

```ballerina
check accountsClient->deleteContactGroupContact("297c2dc5-cc47-4afd-8ec8-74990b8761e9", "297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId});
```

</div>
</details>

#### Credit Notes

<details>
<summary>getCreditNotes</summary>

<div>

Retrieves any credit notes.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>GetCreditNotesHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `ifModifiedSince`. |
| `unitdp` | <code>int</code> | No | E.g. unitdp=4: (Unit Decimal Places) You can opt in to use four decimal places for unit amounts. |
| `pageSize` | <code>int</code> | No | Number of records to retrieve per page. |
| `'where` | <code>string</code> | No | Filter by an any element. |
| `page` | <code>int</code> | No | E.g. page=1: Up to 100 credit notes will be returned in a single API call with line items shown for each credit note. |
| `'order` | <code>string</code> | No | Order by an any element. |

**Returns:** `CreditNotes|error`

**Sample code:**

```ballerina
accounts:CreditNotes result = check accountsClient->getCreditNotes({xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "pagination": {
    "pageCount": 1,
    "pageSize": 1,
    "page": 1
  },
  "CreditNotes": [
    {
      "Allocations": [
        {
          "Invoice": {},
          "Amount": 100.00,
          "Date": "2026-01-15T00:00:00"
        }
      ],
      "BrandingThemeID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9",
      "UpdatedDateUTC": "2026-01-15T00:00:00"
    }
  ],
  "Warnings": [
    {
      "Message": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createCreditNotes</summary>

<div>

Creates a new credit note.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>CreateCreditNotesHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>CreditNotes</code> | Yes | Credit Notes with array of CreditNote object in body of request. |
| `unitdp` | <code>int</code> | No | E.g. unitdp=4: (Unit Decimal Places) You can opt in to use four decimal places for unit amounts. |
| `summarizeErrors` | <code>boolean</code> | No | If false return 200 OK and mix of successfully created objects and any with validation errors. Defaults to `false`. |

**Returns:** `CreditNotes|error`

**Sample code:**

```ballerina
accounts:CreditNotes result = check accountsClient->createCreditNotes({xeroTenantId: tenantId}, {
    pagination: {
        pageCount: 1,
        pageSize: 1,
        page: 1
    },
    creditNotes: [{
        allocations: [{
            invoice: {},
            amount: 100.00,
            date: "2026-01-15T00:00:00"
        }],
        currencyRate: 100.00,
        subTotal: 100.00
    }]
});
```

**Sample response:**

```json
{
  "pagination": {
    "pageCount": 1,
    "pageSize": 1,
    "page": 1
  },
  "CreditNotes": [
    {
      "Allocations": [
        {
          "Invoice": {},
          "Amount": 100.00,
          "Date": "2026-01-15T00:00:00"
        }
      ],
      "BrandingThemeID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9",
      "UpdatedDateUTC": "2026-01-15T00:00:00"
    }
  ],
  "Warnings": [
    {
      "Message": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>updateOrCreateCreditNotes</summary>

<div>

Updates or creates one or more credit notes.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>UpdateOrCreateCreditNotesHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>CreditNotes</code> | Yes | An array of Credit Notes with a single CreditNote object. |
| `unitdp` | <code>int</code> | No | E.g. unitdp=4: (Unit Decimal Places) You can opt in to use four decimal places for unit amounts. |
| `summarizeErrors` | <code>boolean</code> | No | If false return 200 OK and mix of successfully created objects and any with validation errors. Defaults to `false`. |

**Returns:** `CreditNotes|error`

**Sample code:**

```ballerina
accounts:CreditNotes result = check accountsClient->updateOrCreateCreditNotes({xeroTenantId: tenantId}, {
    pagination: {
        pageCount: 1,
        pageSize: 1,
        page: 1
    },
    creditNotes: [{
        allocations: [{
            invoice: {},
            amount: 100.00,
            date: "2026-01-15T00:00:00"
        }],
        currencyRate: 100.00,
        subTotal: 100.00
    }]
});
```

**Sample response:**

```json
{
  "pagination": {
    "pageCount": 1,
    "pageSize": 1,
    "page": 1
  },
  "CreditNotes": [
    {
      "Allocations": [
        {
          "Invoice": {},
          "Amount": 100.00,
          "Date": "2026-01-15T00:00:00"
        }
      ],
      "BrandingThemeID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9",
      "UpdatedDateUTC": "2026-01-15T00:00:00"
    }
  ],
  "Warnings": [
    {
      "Message": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getCreditNote</summary>

<div>

Retrieves a specific credit note using a unique credit note Id.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `creditNoteID` | <code>string</code> | Yes | Unique identifier for a Credit Note. |
| `headers` | <code>GetCreditNoteHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |
| `unitdp` | <code>int</code> | No | E.g. unitdp=4: (Unit Decimal Places) You can opt in to use four decimal places for unit amounts. |

**Returns:** `CreditNotes|error`

**Sample code:**

```ballerina
accounts:CreditNotes result = check accountsClient->getCreditNote("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "pagination": {
    "pageCount": 1,
    "pageSize": 1,
    "page": 1
  },
  "CreditNotes": [
    {
      "Allocations": [
        {
          "Invoice": {},
          "Amount": 100.00,
          "Date": "2026-01-15T00:00:00"
        }
      ],
      "BrandingThemeID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9",
      "UpdatedDateUTC": "2026-01-15T00:00:00"
    }
  ],
  "Warnings": [
    {
      "Message": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>updateCreditNote</summary>

<div>

Updates a specific credit note.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `creditNoteID` | <code>string</code> | Yes | Unique identifier for a Credit Note. |
| `headers` | <code>UpdateCreditNoteHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>CreditNotes</code> | Yes | An array of Credit Notes containing credit note details to update. |
| `unitdp` | <code>int</code> | No | E.g. unitdp=4: (Unit Decimal Places) You can opt in to use four decimal places for unit amounts. |

**Returns:** `CreditNotes|error`

**Sample code:**

```ballerina
accounts:CreditNotes result = check accountsClient->updateCreditNote("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId}, {
    pagination: {
        pageCount: 1,
        pageSize: 1,
        page: 1
    },
    creditNotes: [{
        allocations: [{
            invoice: {},
            amount: 100.00,
            date: "2026-01-15T00:00:00"
        }],
        currencyRate: 100.00,
        subTotal: 100.00
    }]
});
```

**Sample response:**

```json
{
  "pagination": {
    "pageCount": 1,
    "pageSize": 1,
    "page": 1
  },
  "CreditNotes": [
    {
      "Allocations": [
        {
          "Invoice": {},
          "Amount": 100.00,
          "Date": "2026-01-15T00:00:00"
        }
      ],
      "BrandingThemeID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9",
      "UpdatedDateUTC": "2026-01-15T00:00:00"
    }
  ],
  "Warnings": [
    {
      "Message": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getCreditNoteAttachments</summary>

<div>

Retrieves attachments for a specific credit notes.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `creditNoteID` | <code>string</code> | Yes | Unique identifier for a Credit Note. |
| `headers` | <code>GetCreditNoteAttachmentsHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |

**Returns:** `Attachments|error`

**Sample code:**

```ballerina
accounts:Attachments result = check accountsClient->getCreditNoteAttachments("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "Attachments": [
    {
      "FileName": "invoice.pdf",
      "ContentLength": 1,
      "IncludeOnline": false
    }
  ]
}
```

</div>
</details>

<details>
<summary>getCreditNoteAttachmentById</summary>

<div>

Retrieves a specific attachment from a specific credit note using a unique attachment Id.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `creditNoteID` | <code>string</code> | Yes | Unique identifier for a Credit Note. |
| `attachmentID` | <code>string</code> | Yes | Unique identifier for Attachment object. |
| `headers` | <code>GetCreditNoteAttachmentByIdHeaders</code> | Yes | Request headers, including the required `xeroTenantId`, `contentType` (the Xero tenant ID of the organisation). |

**Returns:** `byte[]|error`

**Sample code:**

```ballerina
byte[] result = check accountsClient->getCreditNoteAttachmentById("297c2dc5-cc47-4afd-8ec8-74990b8761e9", "297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId, contentType: "string"});
```

**Sample response:**

The raw response content as `byte[]`.

</div>
</details>

<details>
<summary>getCreditNoteAttachmentByFileName</summary>

<div>

Retrieves a specific attachment on a specific credit note by file name.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `creditNoteID` | <code>string</code> | Yes | Unique identifier for a Credit Note. |
| `fileName` | <code>string</code> | Yes | Name of the attachment. |
| `headers` | <code>GetCreditNoteAttachmentByFileNameHeaders</code> | Yes | Request headers, including the required `xeroTenantId`, `contentType` (the Xero tenant ID of the organisation). |

**Returns:** `byte[]|error`

**Sample code:**

```ballerina
byte[] result = check accountsClient->getCreditNoteAttachmentByFileName("297c2dc5-cc47-4afd-8ec8-74990b8761e9", "invoice.pdf", {xeroTenantId: tenantId, contentType: "string"});
```

**Sample response:**

The raw response content as `byte[]`.

</div>
</details>

<details>
<summary>createCreditNoteAttachmentByFileName</summary>

<div>

Creates an attachment for a specific credit note.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `creditNoteID` | <code>string</code> | Yes | Unique identifier for a Credit Note. |
| `fileName` | <code>string</code> | Yes | Name of the attachment. |
| `headers` | <code>CreateCreditNoteAttachmentByFileNameHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>byte[]</code> | Yes | Byte array of file in body of request. |
| `includeOnline` | <code>boolean</code> | No | Allows an attachment to be seen by the end customer within their online invoice. Defaults to `false`. |

**Returns:** `Attachments|error`

**Sample code:**

```ballerina
byte[] fileContent = check io:fileReadBytes("invoice.pdf");
accounts:Attachments result = check accountsClient->createCreditNoteAttachmentByFileName("297c2dc5-cc47-4afd-8ec8-74990b8761e9", "invoice.pdf", {xeroTenantId: tenantId}, fileContent);
```

**Sample response:**

```json
{
  "Attachments": [
    {
      "FileName": "invoice.pdf",
      "ContentLength": 1,
      "IncludeOnline": false
    }
  ]
}
```

</div>
</details>

<details>
<summary>updateCreditNoteAttachmentByFileName</summary>

<div>

Updates attachments on a specific credit note by file name.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `creditNoteID` | <code>string</code> | Yes | Unique identifier for a Credit Note. |
| `fileName` | <code>string</code> | Yes | Name of the attachment. |
| `headers` | <code>UpdateCreditNoteAttachmentByFileNameHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>byte[]</code> | Yes | Byte array of file in body of request. |

**Returns:** `Attachments|error`

**Sample code:**

```ballerina
byte[] fileContent = check io:fileReadBytes("invoice.pdf");
accounts:Attachments result = check accountsClient->updateCreditNoteAttachmentByFileName("297c2dc5-cc47-4afd-8ec8-74990b8761e9", "invoice.pdf", {xeroTenantId: tenantId}, fileContent);
```

**Sample response:**

```json
{
  "Attachments": [
    {
      "FileName": "invoice.pdf",
      "ContentLength": 1,
      "IncludeOnline": false
    }
  ]
}
```

</div>
</details>

<details>
<summary>getCreditNoteAsPdf</summary>

<div>

Retrieves credit notes as PDF files.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `creditNoteID` | <code>string</code> | Yes | Unique identifier for a Credit Note. |
| `headers` | <code>GetCreditNoteAsPdfHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |

**Returns:** `http:Response|error`

**Sample code:**

```ballerina
http:Response result = check accountsClient->getCreditNoteAsPdf("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId});
```

**Sample response:**

The raw `http:Response`. Read the PDF content with `check result.getBinaryPayload()`.

</div>
</details>

<details>
<summary>createCreditNoteAllocation</summary>

<div>

Creates allocation for a specific credit note.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `creditNoteID` | <code>string</code> | Yes | Unique identifier for a Credit Note. |
| `headers` | <code>CreateCreditNoteAllocationHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>Allocations</code> | Yes | Allocations with array of Allocation object in body of request. |
| `summarizeErrors` | <code>boolean</code> | No | If false return 200 OK and mix of successfully created objects and any with validation errors. Defaults to `false`. |

**Returns:** `Allocations|error`

**Sample code:**

```ballerina
accounts:Allocations result = check accountsClient->createCreditNoteAllocation("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId}, {
    allocations: [{
        invoice: {},
        amount: 100.00,
        date: "2026-01-15T00:00:00"
    }]
});
```

**Sample response:**

```json
{
  "Allocations": [
    {
      "Invoice": {},
      "Amount": 100.00,
      "Date": "2026-01-15T00:00:00"
    }
  ]
}
```

</div>
</details>

<details>
<summary>deleteCreditNoteAllocations</summary>

<div>

Deletes an Allocation from a Credit Note.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `creditNoteID` | <code>string</code> | Yes | Unique identifier for a Credit Note. |
| `allocationID` | <code>string</code> | Yes | Unique identifier for Allocation object. |
| `headers` | <code>DeleteCreditNoteAllocationsHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |

**Returns:** `Allocation|error`

**Sample code:**

```ballerina
accounts:Allocation result = check accountsClient->deleteCreditNoteAllocations("297c2dc5-cc47-4afd-8ec8-74990b8761e9", "297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "Invoice": {
    "BrandingThemeID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9",
    "CurrencyRate": 100.00,
    "UpdatedDateUTC": "2026-01-15T00:00:00"
  },
  "Amount": 100.00,
  "Date": "2026-01-15T00:00:00",
  "IsDeleted": false,
  "StatusAttributeString": "string",
  "ValidationErrors": [
    {
      "Message": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getCreditNoteHistory</summary>

<div>

Retrieves history records of a specific credit note.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `creditNoteID` | <code>string</code> | Yes | Unique identifier for a Credit Note. |
| `headers` | <code>GetCreditNoteHistoryHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |

**Returns:** `HistoryRecords|error`

**Sample code:**

```ballerina
accounts:HistoryRecords result = check accountsClient->getCreditNoteHistory("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "HistoryRecords": [
    {
      "Changes": "string",
      "Details": "string",
      "User": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createCreditNoteHistory</summary>

<div>

Creates a history record for a specific credit note.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `creditNoteID` | <code>string</code> | Yes | Unique identifier for a Credit Note. |
| `headers` | <code>CreateCreditNoteHistoryHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>HistoryRecords</code> | Yes | HistoryRecords containing an array of HistoryRecord objects in body of request. |

**Returns:** `HistoryRecords|error`

**Sample code:**

```ballerina
accounts:HistoryRecords result = check accountsClient->createCreditNoteHistory("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId}, {
    historyRecords: [{
        changes: "string",
        details: "string",
        user: "string"
    }]
});
```

**Sample response:**

```json
{
  "HistoryRecords": [
    {
      "Changes": "string",
      "Details": "string",
      "User": "string"
    }
  ]
}
```

</div>
</details>

#### Currencies

<details>
<summary>getCurrencies</summary>

<div>

Retrieves currencies for your Xero organisation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>GetCurrenciesHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |
| `'where` | <code>string</code> | No | Filter by an any element. |
| `'order` | <code>string</code> | No | Order by an any element. |

**Returns:** `Currencies|error`

**Sample code:**

```ballerina
accounts:Currencies result = check accountsClient->getCurrencies({xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "Currencies": [
    {
      "Description": "Sample description",
      "Code": "AED"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createCurrency</summary>

<div>

Create a new currency for a Xero organisation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>CreateCurrencyHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>Currency</code> | Yes | Currency object in the body of request. |

**Returns:** `Currencies|error`

**Sample code:**

```ballerina
accounts:Currencies result = check accountsClient->createCurrency({xeroTenantId: tenantId}, {
    description: "Sample description",
    code: "AED"
});
```

**Sample response:**

```json
{
  "Currencies": [
    {
      "Description": "Sample description",
      "Code": "AED"
    }
  ]
}
```

</div>
</details>

#### Expense Claims

<details>
<summary>getExpenseClaims</summary>

<div>

Retrieves expense claims.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>GetExpenseClaimsHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `ifModifiedSince`. |
| `'where` | <code>string</code> | No | Filter by an any element. |
| `'order` | <code>string</code> | No | Order by an any element. |

**Returns:** `ExpenseClaims|error`

**Sample code:**

```ballerina
accounts:ExpenseClaims result = check accountsClient->getExpenseClaims({xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "ExpenseClaims": [
    {
      "Status": "SUBMITTED",
      "ExpenseClaimID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9",
      "AmountDue": 100.00
    }
  ]
}
```

</div>
</details>

<details>
<summary>createExpenseClaims</summary>

<div>

Creates expense claims.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>CreateExpenseClaimsHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>ExpenseClaims</code> | Yes | ExpenseClaims with array of ExpenseClaim object in body of request. |

**Returns:** `ExpenseClaims|error`

**Sample code:**

```ballerina
accounts:ExpenseClaims result = check accountsClient->createExpenseClaims({xeroTenantId: tenantId}, {
    expenseClaims: [{
        status: "SUBMITTED",
        amountDue: 100.00,
        amountPaid: 100.00
    }]
});
```

**Sample response:**

```json
{
  "ExpenseClaims": [
    {
      "Status": "SUBMITTED",
      "ExpenseClaimID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9",
      "AmountDue": 100.00
    }
  ]
}
```

</div>
</details>

<details>
<summary>getExpenseClaim</summary>

<div>

Retrieves a specific expense claim using a unique expense claim Id.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `expenseClaimID` | <code>string</code> | Yes | Unique identifier for a ExpenseClaim. |
| `headers` | <code>GetExpenseClaimHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |

**Returns:** `ExpenseClaims|error`

**Sample code:**

```ballerina
accounts:ExpenseClaims result = check accountsClient->getExpenseClaim("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "ExpenseClaims": [
    {
      "Status": "SUBMITTED",
      "ExpenseClaimID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9",
      "AmountDue": 100.00
    }
  ]
}
```

</div>
</details>

<details>
<summary>updateExpenseClaim</summary>

<div>

Updates a specific expense claims.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `expenseClaimID` | <code>string</code> | Yes | Unique identifier for a ExpenseClaim. |
| `headers` | <code>UpdateExpenseClaimHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>ExpenseClaims</code> | Yes | Expense claim with the fields to update. |

**Returns:** `ExpenseClaims|error`

**Sample code:**

```ballerina
accounts:ExpenseClaims result = check accountsClient->updateExpenseClaim("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId}, {
    expenseClaims: [{
        status: "SUBMITTED",
        amountDue: 100.00,
        amountPaid: 100.00
    }]
});
```

**Sample response:**

```json
{
  "ExpenseClaims": [
    {
      "Status": "SUBMITTED",
      "ExpenseClaimID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9",
      "AmountDue": 100.00
    }
  ]
}
```

</div>
</details>

<details>
<summary>getExpenseClaimHistory</summary>

<div>

Retrieves history records of a specific expense claim.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `expenseClaimID` | <code>string</code> | Yes | Unique identifier for a ExpenseClaim. |
| `headers` | <code>GetExpenseClaimHistoryHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |

**Returns:** `HistoryRecords|error`

**Sample code:**

```ballerina
accounts:HistoryRecords result = check accountsClient->getExpenseClaimHistory("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "HistoryRecords": [
    {
      "Changes": "string",
      "Details": "string",
      "User": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createExpenseClaimHistory</summary>

<div>

Creates a history record for a specific expense claim.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `expenseClaimID` | <code>string</code> | Yes | Unique identifier for a ExpenseClaim. |
| `headers` | <code>CreateExpenseClaimHistoryHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>HistoryRecords</code> | Yes | HistoryRecords containing an array of HistoryRecord objects in body of request. |

**Returns:** `HistoryRecords|error`

**Sample code:**

```ballerina
accounts:HistoryRecords result = check accountsClient->createExpenseClaimHistory("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId}, {
    historyRecords: [{
        changes: "string",
        details: "string",
        user: "string"
    }]
});
```

**Sample response:**

```json
{
  "HistoryRecords": [
    {
      "Changes": "string",
      "Details": "string",
      "User": "string"
    }
  ]
}
```

</div>
</details>

#### Invoices

<details>
<summary>getInvoices</summary>

<div>

Retrieves sales invoices or purchase bills.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>GetInvoicesHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `ifModifiedSince`. |
| `includeArchived` | <code>boolean</code> | No | E.g. includeArchived=true - Invoices with a status of ARCHIVED will be included in the response. |
| `invoiceNumbers` | <code>string[]</code> | No | Filter by a comma-separated list of InvoiceNumbers. |
| `pageSize` | <code>int</code> | No | Number of records to retrieve per page. |
| `summaryOnly` | <code>boolean</code> | No | Use summaryOnly=true in GET Contacts and Invoices endpoint to retrieve a smaller version of the response object. This returns only lightweight fields, excluding computation-heavy fields from the response, making the API calls quick and efficient. Defaults to `false`. |
| `searchTerm` | <code>string</code> | No | Search parameter that performs a case-insensitive text search across the fields e.g. InvoiceNumber, Reference. |
| `statuses` | <code>string[]</code> | No | Filter by a comma-separated list Statuses. For faster response times we recommend using these explicit parameters instead of passing OR conditions into the Where filter. |
| `createdByMyApp` | <code>boolean</code> | No | When set to true you'll only retrieve Invoices created by your app. |
| `unitdp` | <code>int</code> | No | E.g. unitdp=4: (Unit Decimal Places) You can opt in to use four decimal places for unit amounts. |
| `iDs` | <code>string[]</code> | No | Filter by a comma-separated list of InvoicesIDs. |
| `'where` | <code>string</code> | No | Filter by an any element. |
| `page` | <code>int</code> | No | E.g. page=1: Up to 100 invoices will be returned in a single API call with line items shown for each invoice. |
| `'order` | <code>string</code> | No | Order by an any element. |
| `contactIDs` | <code>string[]</code> | No | Filter by a comma-separated list of ContactIDs. |

**Returns:** `Invoices|error`

**Sample code:**

```ballerina
accounts:Invoices result = check accountsClient->getInvoices({xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "pagination": {
    "pageCount": 1,
    "pageSize": 1,
    "page": 1
  },
  "Invoices": [
    {
      "BrandingThemeID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9",
      "CurrencyRate": 100.00,
      "UpdatedDateUTC": "2026-01-15T00:00:00"
    }
  ],
  "Warnings": [
    {
      "Message": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createInvoices</summary>

<div>

Creates one or more sales invoices or purchase bills.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>CreateInvoicesHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>Invoices</code> | Yes | Invoices with an array of invoice objects in body of request. |
| `unitdp` | <code>int</code> | No | E.g. unitdp=4: (Unit Decimal Places) You can opt in to use four decimal places for unit amounts. |
| `allowBackorders` | <code>boolean</code> | No | Allows an invoice to be created even when one or more line items contain tracked inventory where the invoice quantity would cause the available quantity to go negative. |
| `summarizeErrors` | <code>boolean</code> | No | If false return 200 OK and mix of successfully created objects and any with validation errors. Defaults to `false`. |

**Returns:** `Invoices|error`

**Sample code:**

```ballerina
accounts:Invoices result = check accountsClient->createInvoices({xeroTenantId: tenantId}, {
    pagination: {
        pageCount: 1,
        pageSize: 1,
        page: 1
    },
    invoices: [{
        currencyRate: 100.00,
        amountPaid: 100.00,
        amountCredited: 100.00
    }]
});
```

**Sample response:**

```json
{
  "pagination": {
    "pageCount": 1,
    "pageSize": 1,
    "page": 1
  },
  "Invoices": [
    {
      "BrandingThemeID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9",
      "CurrencyRate": 100.00,
      "UpdatedDateUTC": "2026-01-15T00:00:00"
    }
  ],
  "Warnings": [
    {
      "Message": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>updateOrCreateInvoices</summary>

<div>

Updates or creates one or more sales invoices or purchase bills.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>UpdateOrCreateInvoicesHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>Invoices</code> | Yes | Sales invoices or purchase bills to create or update. |
| `unitdp` | <code>int</code> | No | E.g. unitdp=4: (Unit Decimal Places) You can opt in to use four decimal places for unit amounts. |
| `allowBackorders` | <code>boolean</code> | No | Allows an invoice to be created even when one or more line items contain tracked inventory where the invoice quantity would cause the available quantity to go negative. |
| `summarizeErrors` | <code>boolean</code> | No | If false return 200 OK and mix of successfully created objects and any with validation errors. Defaults to `false`. |

**Returns:** `Invoices|error`

**Sample code:**

```ballerina
accounts:Invoices result = check accountsClient->updateOrCreateInvoices({xeroTenantId: tenantId}, {
    pagination: {
        pageCount: 1,
        pageSize: 1,
        page: 1
    },
    invoices: [{
        currencyRate: 100.00,
        amountPaid: 100.00,
        amountCredited: 100.00
    }]
});
```

**Sample response:**

```json
{
  "pagination": {
    "pageCount": 1,
    "pageSize": 1,
    "page": 1
  },
  "Invoices": [
    {
      "BrandingThemeID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9",
      "CurrencyRate": 100.00,
      "UpdatedDateUTC": "2026-01-15T00:00:00"
    }
  ],
  "Warnings": [
    {
      "Message": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getInvoice</summary>

<div>

Retrieves a specific sales invoice or purchase bill using a unique invoice Id.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `invoiceID` | <code>string</code> | Yes | Unique identifier for an Invoice. |
| `headers` | <code>GetInvoiceHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |
| `unitdp` | <code>int</code> | No | E.g. unitdp=4: (Unit Decimal Places) You can opt in to use four decimal places for unit amounts. |

**Returns:** `Invoices|error`

**Sample code:**

```ballerina
accounts:Invoices result = check accountsClient->getInvoice("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "pagination": {
    "pageCount": 1,
    "pageSize": 1,
    "page": 1
  },
  "Invoices": [
    {
      "BrandingThemeID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9",
      "CurrencyRate": 100.00,
      "UpdatedDateUTC": "2026-01-15T00:00:00"
    }
  ],
  "Warnings": [
    {
      "Message": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>updateInvoice</summary>

<div>

Updates a specific sales invoices or purchase bills.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `invoiceID` | <code>string</code> | Yes | Unique identifier for an Invoice. |
| `headers` | <code>UpdateInvoiceHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>Invoices</code> | Yes | Invoice with the fields to update. |
| `unitdp` | <code>int</code> | No | E.g. unitdp=4: (Unit Decimal Places) You can opt in to use four decimal places for unit amounts. |
| `allowBackorders` | <code>boolean</code> | No | Allows an invoice to be created even when one or more line items contain tracked inventory where the invoice quantity would cause the available quantity to go negative. |

**Returns:** `Invoices|error`

**Sample code:**

```ballerina
accounts:Invoices result = check accountsClient->updateInvoice("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId}, {
    pagination: {
        pageCount: 1,
        pageSize: 1,
        page: 1
    },
    invoices: [{
        currencyRate: 100.00,
        amountPaid: 100.00,
        amountCredited: 100.00
    }]
});
```

**Sample response:**

```json
{
  "pagination": {
    "pageCount": 1,
    "pageSize": 1,
    "page": 1
  },
  "Invoices": [
    {
      "BrandingThemeID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9",
      "CurrencyRate": 100.00,
      "UpdatedDateUTC": "2026-01-15T00:00:00"
    }
  ],
  "Warnings": [
    {
      "Message": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getInvoiceAsPdf</summary>

<div>

Retrieves invoices or purchase bills as PDF files.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `invoiceID` | <code>string</code> | Yes | Unique identifier for an Invoice. |
| `headers` | <code>GetInvoiceAsPdfHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |

**Returns:** `http:Response|error`

**Sample code:**

```ballerina
http:Response result = check accountsClient->getInvoiceAsPdf("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId});
```

**Sample response:**

The raw `http:Response`. Read the PDF content with `check result.getBinaryPayload()`.

</div>
</details>

<details>
<summary>getInvoiceAttachments</summary>

<div>

Retrieves attachments for a specific invoice or purchase bill.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `invoiceID` | <code>string</code> | Yes | Unique identifier for an Invoice. |
| `headers` | <code>GetInvoiceAttachmentsHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |

**Returns:** `Attachments|error`

**Sample code:**

```ballerina
accounts:Attachments result = check accountsClient->getInvoiceAttachments("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "Attachments": [
    {
      "FileName": "invoice.pdf",
      "ContentLength": 1,
      "IncludeOnline": false
    }
  ]
}
```

</div>
</details>

<details>
<summary>getInvoiceAttachmentById</summary>

<div>

Retrieves a specific attachment from a specific invoices or purchase bills by using a unique attachment Id.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `invoiceID` | <code>string</code> | Yes | Unique identifier for an Invoice. |
| `attachmentID` | <code>string</code> | Yes | Unique identifier for Attachment object. |
| `headers` | <code>GetInvoiceAttachmentByIdHeaders</code> | Yes | Request headers, including the required `xeroTenantId`, `contentType` (the Xero tenant ID of the organisation). |

**Returns:** `byte[]|error`

**Sample code:**

```ballerina
byte[] result = check accountsClient->getInvoiceAttachmentById("297c2dc5-cc47-4afd-8ec8-74990b8761e9", "297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId, contentType: "string"});
```

**Sample response:**

The raw response content as `byte[]`.

</div>
</details>

<details>
<summary>getInvoiceAttachmentByFileName</summary>

<div>

Retrieves an attachment from a specific invoice or purchase bill by filename.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `invoiceID` | <code>string</code> | Yes | Unique identifier for an Invoice. |
| `fileName` | <code>string</code> | Yes | Name of the attachment. |
| `headers` | <code>GetInvoiceAttachmentByFileNameHeaders</code> | Yes | Request headers, including the required `xeroTenantId`, `contentType` (the Xero tenant ID of the organisation). |

**Returns:** `byte[]|error`

**Sample code:**

```ballerina
byte[] result = check accountsClient->getInvoiceAttachmentByFileName("297c2dc5-cc47-4afd-8ec8-74990b8761e9", "invoice.pdf", {xeroTenantId: tenantId, contentType: "string"});
```

**Sample response:**

The raw response content as `byte[]`.

</div>
</details>

<details>
<summary>createInvoiceAttachmentByFileName</summary>

<div>

Creates an attachment for a specific invoice or purchase bill by filename.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `invoiceID` | <code>string</code> | Yes | Unique identifier for an Invoice. |
| `fileName` | <code>string</code> | Yes | Name of the attachment. |
| `headers` | <code>CreateInvoiceAttachmentByFileNameHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>byte[]</code> | Yes | Byte array of file in body of request. |
| `includeOnline` | <code>boolean</code> | No | Allows an attachment to be seen by the end customer within their online invoice. Defaults to `false`. |

**Returns:** `Attachments|error`

**Sample code:**

```ballerina
byte[] fileContent = check io:fileReadBytes("invoice.pdf");
accounts:Attachments result = check accountsClient->createInvoiceAttachmentByFileName("297c2dc5-cc47-4afd-8ec8-74990b8761e9", "invoice.pdf", {xeroTenantId: tenantId}, fileContent);
```

**Sample response:**

```json
{
  "Attachments": [
    {
      "FileName": "invoice.pdf",
      "ContentLength": 1,
      "IncludeOnline": false
    }
  ]
}
```

</div>
</details>

<details>
<summary>updateInvoiceAttachmentByFileName</summary>

<div>

Updates an attachment from a specific invoices or purchase bill by filename.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `invoiceID` | <code>string</code> | Yes | Unique identifier for an Invoice. |
| `fileName` | <code>string</code> | Yes | Name of the attachment. |
| `headers` | <code>UpdateInvoiceAttachmentByFileNameHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>byte[]</code> | Yes | Byte array of file in body of request. |

**Returns:** `Attachments|error`

**Sample code:**

```ballerina
byte[] fileContent = check io:fileReadBytes("invoice.pdf");
accounts:Attachments result = check accountsClient->updateInvoiceAttachmentByFileName("297c2dc5-cc47-4afd-8ec8-74990b8761e9", "invoice.pdf", {xeroTenantId: tenantId}, fileContent);
```

**Sample response:**

```json
{
  "Attachments": [
    {
      "FileName": "invoice.pdf",
      "ContentLength": 1,
      "IncludeOnline": false
    }
  ]
}
```

</div>
</details>

<details>
<summary>getOnlineInvoice</summary>

<div>

Retrieves a URL to an online invoice.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `invoiceID` | <code>string</code> | Yes | Unique identifier for an Invoice. |
| `headers` | <code>GetOnlineInvoiceHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |

**Returns:** `OnlineInvoices|error`

**Sample code:**

```ballerina
accounts:OnlineInvoices result = check accountsClient->getOnlineInvoice("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "OnlineInvoices": [
    {
      "OnlineInvoiceUrl": "https://example.com/resource"
    }
  ]
}
```

</div>
</details>

<details>
<summary>emailInvoice</summary>

<div>

Sends a copy of a specific invoice to related contact via email.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `invoiceID` | <code>string</code> | Yes | Unique identifier for an Invoice. |
| `headers` | <code>EmailInvoiceHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>RequestEmpty</code> | Yes | Empty request body that triggers the invoice email. |

**Returns:** `error?`

**Sample code:**

```ballerina
check accountsClient->emailInvoice("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId}, {
    status: "string"
});
```

</div>
</details>

<details>
<summary>getInvoiceHistory</summary>

<div>

Retrieves history records for a specific invoice.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `invoiceID` | <code>string</code> | Yes | Unique identifier for an Invoice. |
| `headers` | <code>GetInvoiceHistoryHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |

**Returns:** `HistoryRecords|error`

**Sample code:**

```ballerina
accounts:HistoryRecords result = check accountsClient->getInvoiceHistory("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "HistoryRecords": [
    {
      "Changes": "string",
      "Details": "string",
      "User": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createInvoiceHistory</summary>

<div>

Creates a history record for a specific invoice.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `invoiceID` | <code>string</code> | Yes | Unique identifier for an Invoice. |
| `headers` | <code>CreateInvoiceHistoryHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>HistoryRecords</code> | Yes | HistoryRecords containing an array of HistoryRecord objects in body of request. |

**Returns:** `HistoryRecords|error`

**Sample code:**

```ballerina
accounts:HistoryRecords result = check accountsClient->createInvoiceHistory("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId}, {
    historyRecords: [{
        changes: "string",
        details: "string",
        user: "string"
    }]
});
```

**Sample response:**

```json
{
  "HistoryRecords": [
    {
      "Changes": "string",
      "Details": "string",
      "User": "string"
    }
  ]
}
```

</div>
</details>

#### Invoice Reminders

<details>
<summary>getInvoiceReminders</summary>

<div>

Retrieves invoice reminder settings.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>GetInvoiceRemindersHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |

**Returns:** `InvoiceReminders|error`

**Sample code:**

```ballerina
accounts:InvoiceReminders result = check accountsClient->getInvoiceReminders({xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "InvoiceReminders": [
    {
      "Enabled": false
    }
  ]
}
```

</div>
</details>

#### Items

<details>
<summary>getItems</summary>

<div>

Retrieves items.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>GetItemsHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `ifModifiedSince`. |
| `unitdp` | <code>int</code> | No | E.g. unitdp=4: (Unit Decimal Places) You can opt in to use four decimal places for unit amounts. |
| `'where` | <code>string</code> | No | Filter by an any element. |
| `'order` | <code>string</code> | No | Order by an any element. |

**Returns:** `Items|error`

**Sample code:**

```ballerina
accounts:Items result = check accountsClient->getItems({xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "Items": [
    {
      "Code": "200",
      "Description": "Sample description",
      "StatusAttributeString": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createItems</summary>

<div>

Creates one or more items.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>CreateItemsHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>Items</code> | Yes | Items with an array of Item objects in body of request. |
| `unitdp` | <code>int</code> | No | E.g. unitdp=4: (Unit Decimal Places) You can opt in to use four decimal places for unit amounts. |
| `summarizeErrors` | <code>boolean</code> | No | If false return 200 OK and mix of successfully created objects and any with validation errors. Defaults to `false`. |

**Returns:** `Items|error`

**Sample code:**

```ballerina
accounts:Items result = check accountsClient->createItems({xeroTenantId: tenantId}, {
    items: [{
        code: "200",
        description: "Sample description",
        isPurchased: false
    }]
});
```

**Sample response:**

```json
{
  "Items": [
    {
      "Code": "200",
      "Description": "Sample description",
      "StatusAttributeString": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>updateOrCreateItems</summary>

<div>

Updates or creates one or more items.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>UpdateOrCreateItemsHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>Items</code> | Yes | Items to create or update. |
| `unitdp` | <code>int</code> | No | E.g. unitdp=4: (Unit Decimal Places) You can opt in to use four decimal places for unit amounts. |
| `summarizeErrors` | <code>boolean</code> | No | If false return 200 OK and mix of successfully created objects and any with validation errors. Defaults to `false`. |

**Returns:** `Items|error`

**Sample code:**

```ballerina
accounts:Items result = check accountsClient->updateOrCreateItems({xeroTenantId: tenantId}, {
    items: [{
        code: "200",
        description: "Sample description",
        isPurchased: false
    }]
});
```

**Sample response:**

```json
{
  "Items": [
    {
      "Code": "200",
      "Description": "Sample description",
      "StatusAttributeString": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getItem</summary>

<div>

Retrieves a specific item using a unique item Id.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `itemID` | <code>string</code> | Yes | Unique identifier for an Item. |
| `headers` | <code>GetItemHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |
| `unitdp` | <code>int</code> | No | E.g. unitdp=4: (Unit Decimal Places) You can opt in to use four decimal places for unit amounts. |

**Returns:** `Items|error`

**Sample code:**

```ballerina
accounts:Items result = check accountsClient->getItem("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "Items": [
    {
      "Code": "200",
      "Description": "Sample description",
      "StatusAttributeString": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>updateItem</summary>

<div>

Updates a specific item.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `itemID` | <code>string</code> | Yes | Unique identifier for an Item. |
| `headers` | <code>UpdateItemHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>Items</code> | Yes | Item with the fields to update. |
| `unitdp` | <code>int</code> | No | E.g. unitdp=4: (Unit Decimal Places) You can opt in to use four decimal places for unit amounts. |

**Returns:** `Items|error`

**Sample code:**

```ballerina
accounts:Items result = check accountsClient->updateItem("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId}, {
    items: [{
        code: "200",
        description: "Sample description",
        isPurchased: false
    }]
});
```

**Sample response:**

```json
{
  "Items": [
    {
      "Code": "200",
      "Description": "Sample description",
      "StatusAttributeString": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>deleteItem</summary>

<div>

Deletes a specific item.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `itemID` | <code>string</code> | Yes | Unique identifier for an Item. |
| `headers` | <code>DeleteItemHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |

**Returns:** `error?`

**Sample code:**

```ballerina
check accountsClient->deleteItem("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId});
```

</div>
</details>

<details>
<summary>getItemHistory</summary>

<div>

Retrieves history for a specific item.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `itemID` | <code>string</code> | Yes | Unique identifier for an Item. |
| `headers` | <code>GetItemHistoryHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |

**Returns:** `HistoryRecords|error`

**Sample code:**

```ballerina
accounts:HistoryRecords result = check accountsClient->getItemHistory("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "HistoryRecords": [
    {
      "Changes": "string",
      "Details": "string",
      "User": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createItemHistory</summary>

<div>

Creates a history record for a specific item.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `itemID` | <code>string</code> | Yes | Unique identifier for an Item. |
| `headers` | <code>CreateItemHistoryHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>HistoryRecords</code> | Yes | HistoryRecords containing an array of HistoryRecord objects in body of request. |

**Returns:** `HistoryRecords|error`

**Sample code:**

```ballerina
accounts:HistoryRecords result = check accountsClient->createItemHistory("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId}, {
    historyRecords: [{
        changes: "string",
        details: "string",
        user: "string"
    }]
});
```

**Sample response:**

```json
{
  "HistoryRecords": [
    {
      "Changes": "string",
      "Details": "string",
      "User": "string"
    }
  ]
}
```

</div>
</details>

#### Journals

<details>
<summary>getJournals</summary>

<div>

Retrieves journals.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>GetJournalsHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `ifModifiedSince`. |
| `paymentsOnly` | <code>boolean</code> | No | Filter to retrieve journals on a cash basis. Journals are returned on an accrual basis by default. |
| `offset` | <code>int</code> | No | Offset by a specified journal number. e.g. journals with a JournalNumber greater than the offset will be returned. |

**Returns:** `Journals|error`

**Sample code:**

```ballerina
accounts:Journals result = check accountsClient->getJournals({xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "Journals": [
    {
      "CreatedDateUTC": "2026-01-15T00:00:00",
      "JournalDate": "2026-01-15T00:00:00",
      "JournalID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9"
    }
  ],
  "Warnings": [
    {
      "Message": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getJournal</summary>

<div>

Retrieves a specific journal using a unique journal Id.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `journalID` | <code>string</code> | Yes | Unique identifier for a Journal. |
| `headers` | <code>GetJournalHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |

**Returns:** `Journals|error`

**Sample code:**

```ballerina
accounts:Journals result = check accountsClient->getJournal("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "Journals": [
    {
      "CreatedDateUTC": "2026-01-15T00:00:00",
      "JournalDate": "2026-01-15T00:00:00",
      "JournalID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9"
    }
  ],
  "Warnings": [
    {
      "Message": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getJournalByNumber</summary>

<div>

Retrieves a specific journal using a unique journal number.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `journalNumber` | <code>int</code> | Yes | Number of a Journal. |
| `headers` | <code>GetJournalByNumberHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |

**Returns:** `Journals|error`

**Sample code:**

```ballerina
accounts:Journals result = check accountsClient->getJournalByNumber(1, {xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "Journals": [
    {
      "CreatedDateUTC": "2026-01-15T00:00:00",
      "JournalDate": "2026-01-15T00:00:00",
      "JournalID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9"
    }
  ],
  "Warnings": [
    {
      "Message": "string"
    }
  ]
}
```

</div>
</details>

#### Linked Transactions

<details>
<summary>getLinkedTransactions</summary>

<div>

Retrieves linked transactions (billable expenses).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>GetLinkedTransactionsHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |
| `status` | <code>string</code> | No | Filter by the combination of ContactID and Status. Get the linked transactions associated to a customer and with a status. |
| `targetTransactionID` | <code>string</code> | No | Filter by the TargetTransactionID. Get all the linked transactions allocated to a particular ACCREC invoice. |
| `sourceTransactionID` | <code>string</code> | No | Filter by the SourceTransactionID. Get the linked transactions created from a particular ACCPAY invoice. |
| `linkedTransactionID` | <code>string</code> | No | The Xero identifier for an Linked Transaction. |
| `page` | <code>int</code> | No | Up to 100 linked transactions will be returned in a single API call. Use the page parameter to specify the page to be returned e.g. page=1. |
| `contactID` | <code>string</code> | No | Filter by the ContactID. Get all the linked transactions that have been assigned to a particular customer. |

**Returns:** `LinkedTransactions|error`

**Sample code:**

```ballerina
accounts:LinkedTransactions result = check accountsClient->getLinkedTransactions({xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "LinkedTransactions": [
    {
      "Status": "APPROVED",
      "TargetTransactionID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9",
      "Type": "BILLABLEEXPENSE"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createLinkedTransaction</summary>

<div>

Creates linked transactions (billable expenses).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>CreateLinkedTransactionHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>LinkedTransaction</code> | Yes | LinkedTransaction object in body of request. |

**Returns:** `LinkedTransactions|error`

**Sample code:**

```ballerina
accounts:LinkedTransactions result = check accountsClient->createLinkedTransaction({xeroTenantId: tenantId}, {
    status: "APPROVED",
    'type: "BILLABLEEXPENSE",
    sourceTransactionTypeCode: "ACCPAY"
});
```

**Sample response:**

```json
{
  "LinkedTransactions": [
    {
      "Status": "APPROVED",
      "TargetTransactionID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9",
      "Type": "BILLABLEEXPENSE"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getLinkedTransaction</summary>

<div>

Retrieves a specific linked transaction (billable expenses) using a unique linked transaction Id.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `linkedTransactionID` | <code>string</code> | Yes | Unique identifier for a LinkedTransaction. |
| `headers` | <code>GetLinkedTransactionHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |

**Returns:** `LinkedTransactions|error`

**Sample code:**

```ballerina
accounts:LinkedTransactions result = check accountsClient->getLinkedTransaction("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "LinkedTransactions": [
    {
      "Status": "APPROVED",
      "TargetTransactionID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9",
      "Type": "BILLABLEEXPENSE"
    }
  ]
}
```

</div>
</details>

<details>
<summary>updateLinkedTransaction</summary>

<div>

Updates a specific linked transactions (billable expenses).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `linkedTransactionID` | <code>string</code> | Yes | Unique identifier for a LinkedTransaction. |
| `headers` | <code>UpdateLinkedTransactionHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>LinkedTransactions</code> | Yes | Linked transaction with the fields to update. |

**Returns:** `LinkedTransactions|error`

**Sample code:**

```ballerina
accounts:LinkedTransactions result = check accountsClient->updateLinkedTransaction("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId}, {
    linkedTransactions: [{
        status: "APPROVED",
        'type: "BILLABLEEXPENSE",
        sourceTransactionTypeCode: "ACCPAY"
    }]
});
```

**Sample response:**

```json
{
  "LinkedTransactions": [
    {
      "Status": "APPROVED",
      "TargetTransactionID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9",
      "Type": "BILLABLEEXPENSE"
    }
  ]
}
```

</div>
</details>

<details>
<summary>deleteLinkedTransaction</summary>

<div>

Deletes a specific linked transactions (billable expenses).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `linkedTransactionID` | <code>string</code> | Yes | Unique identifier for a LinkedTransaction. |
| `headers` | <code>DeleteLinkedTransactionHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |

**Returns:** `error?`

**Sample code:**

```ballerina
check accountsClient->deleteLinkedTransaction("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId});
```

</div>
</details>

#### Manual Journals

<details>
<summary>getManualJournals</summary>

<div>

Retrieves manual journals.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>GetManualJournalsHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `ifModifiedSince`. |
| `pageSize` | <code>int</code> | No | Number of records to retrieve per page. |
| `'where` | <code>string</code> | No | Filter by an any element. |
| `page` | <code>int</code> | No | E.g. page=1: Up to 100 manual journals will be returned in a single API call with line items shown for each overpayment. |
| `'order` | <code>string</code> | No | Order by an any element. |

**Returns:** `ManualJournals|error`

**Sample code:**

```ballerina
accounts:ManualJournals result = check accountsClient->getManualJournals({xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "pagination": {
    "pageCount": 1,
    "pageSize": 1,
    "page": 1
  },
  "ManualJournals": [
    {
      "Narration": "string",
      "Status": "DRAFT",
      "StatusAttributeString": "string"
    }
  ],
  "Warnings": [
    {
      "Message": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createManualJournals</summary>

<div>

Creates one or more manual journals.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>CreateManualJournalsHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>ManualJournals</code> | Yes | ManualJournals array with ManualJournal object in body of request. |
| `summarizeErrors` | <code>boolean</code> | No | If false return 200 OK and mix of successfully created objects and any with validation errors. Defaults to `false`. |

**Returns:** `ManualJournals|error`

**Sample code:**

```ballerina
accounts:ManualJournals result = check accountsClient->createManualJournals({xeroTenantId: tenantId}, {
    pagination: {
        pageCount: 1,
        pageSize: 1,
        page: 1
    },
    manualJournals: [{
        narration: "string",
        status: "DRAFT",
        date: "2026-01-15T00:00:00"
    }]
});
```

**Sample response:**

```json
{
  "pagination": {
    "pageCount": 1,
    "pageSize": 1,
    "page": 1
  },
  "ManualJournals": [
    {
      "Narration": "string",
      "Status": "DRAFT",
      "StatusAttributeString": "string"
    }
  ],
  "Warnings": [
    {
      "Message": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>updateOrCreateManualJournals</summary>

<div>

Updates or creates a single manual journal.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>UpdateOrCreateManualJournalsHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>ManualJournals</code> | Yes | ManualJournals array with ManualJournal object in body of request. |
| `summarizeErrors` | <code>boolean</code> | No | If false return 200 OK and mix of successfully created objects and any with validation errors. Defaults to `false`. |

**Returns:** `ManualJournals|error`

**Sample code:**

```ballerina
accounts:ManualJournals result = check accountsClient->updateOrCreateManualJournals({xeroTenantId: tenantId}, {
    pagination: {
        pageCount: 1,
        pageSize: 1,
        page: 1
    },
    manualJournals: [{
        narration: "string",
        status: "DRAFT",
        date: "2026-01-15T00:00:00"
    }]
});
```

**Sample response:**

```json
{
  "pagination": {
    "pageCount": 1,
    "pageSize": 1,
    "page": 1
  },
  "ManualJournals": [
    {
      "Narration": "string",
      "Status": "DRAFT",
      "StatusAttributeString": "string"
    }
  ],
  "Warnings": [
    {
      "Message": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getManualJournal</summary>

<div>

Retrieves a specific manual journal.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `manualJournalID` | <code>string</code> | Yes | Unique identifier for a ManualJournal. |
| `headers` | <code>GetManualJournalHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |

**Returns:** `ManualJournals|error`

**Sample code:**

```ballerina
accounts:ManualJournals result = check accountsClient->getManualJournal("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "pagination": {
    "pageCount": 1,
    "pageSize": 1,
    "page": 1
  },
  "ManualJournals": [
    {
      "Narration": "string",
      "Status": "DRAFT",
      "StatusAttributeString": "string"
    }
  ],
  "Warnings": [
    {
      "Message": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>updateManualJournal</summary>

<div>

Updates a specific manual journal.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `manualJournalID` | <code>string</code> | Yes | Unique identifier for a ManualJournal. |
| `headers` | <code>UpdateManualJournalHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>ManualJournals</code> | Yes | Manual journal with the fields to update. |

**Returns:** `ManualJournals|error`

**Sample code:**

```ballerina
accounts:ManualJournals result = check accountsClient->updateManualJournal("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId}, {
    pagination: {
        pageCount: 1,
        pageSize: 1,
        page: 1
    },
    manualJournals: [{
        narration: "string",
        status: "DRAFT",
        date: "2026-01-15T00:00:00"
    }]
});
```

**Sample response:**

```json
{
  "pagination": {
    "pageCount": 1,
    "pageSize": 1,
    "page": 1
  },
  "ManualJournals": [
    {
      "Narration": "string",
      "Status": "DRAFT",
      "StatusAttributeString": "string"
    }
  ],
  "Warnings": [
    {
      "Message": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getManualJournalAttachments</summary>

<div>

Retrieves attachment for a specific manual journal.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `manualJournalID` | <code>string</code> | Yes | Unique identifier for a ManualJournal. |
| `headers` | <code>GetManualJournalAttachmentsHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |

**Returns:** `Attachments|error`

**Sample code:**

```ballerina
accounts:Attachments result = check accountsClient->getManualJournalAttachments("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "Attachments": [
    {
      "FileName": "invoice.pdf",
      "ContentLength": 1,
      "IncludeOnline": false
    }
  ]
}
```

</div>
</details>

<details>
<summary>getManualJournalAttachmentById</summary>

<div>

Allows you to retrieve a specific attachment from a specific manual journal using a unique attachment Id.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `manualJournalID` | <code>string</code> | Yes | Unique identifier for a ManualJournal. |
| `attachmentID` | <code>string</code> | Yes | Unique identifier for Attachment object. |
| `headers` | <code>GetManualJournalAttachmentByIdHeaders</code> | Yes | Request headers, including the required `xeroTenantId`, `contentType` (the Xero tenant ID of the organisation). |

**Returns:** `byte[]|error`

**Sample code:**

```ballerina
byte[] result = check accountsClient->getManualJournalAttachmentById("297c2dc5-cc47-4afd-8ec8-74990b8761e9", "297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId, contentType: "string"});
```

**Sample response:**

The raw response content as `byte[]`.

</div>
</details>

<details>
<summary>getManualJournalAttachmentByFileName</summary>

<div>

Retrieves a specific attachment from a specific manual journal by file name.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `manualJournalID` | <code>string</code> | Yes | Unique identifier for a ManualJournal. |
| `fileName` | <code>string</code> | Yes | Name of the attachment. |
| `headers` | <code>GetManualJournalAttachmentByFileNameHeaders</code> | Yes | Request headers, including the required `xeroTenantId`, `contentType` (the Xero tenant ID of the organisation). |

**Returns:** `byte[]|error`

**Sample code:**

```ballerina
byte[] result = check accountsClient->getManualJournalAttachmentByFileName("297c2dc5-cc47-4afd-8ec8-74990b8761e9", "invoice.pdf", {xeroTenantId: tenantId, contentType: "string"});
```

**Sample response:**

The raw response content as `byte[]`.

</div>
</details>

<details>
<summary>createManualJournalAttachmentByFileName</summary>

<div>

Creates a specific attachment for a specific manual journal by file name.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `manualJournalID` | <code>string</code> | Yes | Unique identifier for a ManualJournal. |
| `fileName` | <code>string</code> | Yes | Name of the attachment. |
| `headers` | <code>CreateManualJournalAttachmentByFileNameHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>byte[]</code> | Yes | Byte array of file in body of request. |

**Returns:** `Attachments|error`

**Sample code:**

```ballerina
byte[] fileContent = check io:fileReadBytes("invoice.pdf");
accounts:Attachments result = check accountsClient->createManualJournalAttachmentByFileName("297c2dc5-cc47-4afd-8ec8-74990b8761e9", "invoice.pdf", {xeroTenantId: tenantId}, fileContent);
```

**Sample response:**

```json
{
  "Attachments": [
    {
      "FileName": "invoice.pdf",
      "ContentLength": 1,
      "IncludeOnline": false
    }
  ]
}
```

</div>
</details>

<details>
<summary>updateManualJournalAttachmentByFileName</summary>

<div>

Updates a specific attachment from a specific manual journal by file name.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `manualJournalID` | <code>string</code> | Yes | Unique identifier for a ManualJournal. |
| `fileName` | <code>string</code> | Yes | Name of the attachment. |
| `headers` | <code>UpdateManualJournalAttachmentByFileNameHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>byte[]</code> | Yes | Byte array of file in body of request. |

**Returns:** `Attachments|error`

**Sample code:**

```ballerina
byte[] fileContent = check io:fileReadBytes("invoice.pdf");
accounts:Attachments result = check accountsClient->updateManualJournalAttachmentByFileName("297c2dc5-cc47-4afd-8ec8-74990b8761e9", "invoice.pdf", {xeroTenantId: tenantId}, fileContent);
```

**Sample response:**

```json
{
  "Attachments": [
    {
      "FileName": "invoice.pdf",
      "ContentLength": 1,
      "IncludeOnline": false
    }
  ]
}
```

</div>
</details>

<details>
<summary>getManualJournalsHistory</summary>

<div>

Retrieves history for a specific manual journal.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `manualJournalID` | <code>string</code> | Yes | Unique identifier for a ManualJournal. |
| `headers` | <code>GetManualJournalsHistoryHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |

**Returns:** `HistoryRecords|error`

**Sample code:**

```ballerina
accounts:HistoryRecords result = check accountsClient->getManualJournalsHistory("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "HistoryRecords": [
    {
      "Changes": "string",
      "Details": "string",
      "User": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createManualJournalHistoryRecord</summary>

<div>

Creates a history record for a specific manual journal.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `manualJournalID` | <code>string</code> | Yes | Unique identifier for a ManualJournal. |
| `headers` | <code>CreateManualJournalHistoryRecordHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>HistoryRecords</code> | Yes | HistoryRecords containing an array of HistoryRecord objects in body of request. |

**Returns:** `HistoryRecords|error`

**Sample code:**

```ballerina
accounts:HistoryRecords result = check accountsClient->createManualJournalHistoryRecord("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId}, {
    historyRecords: [{
        changes: "string",
        details: "string",
        user: "string"
    }]
});
```

**Sample response:**

```json
{
  "HistoryRecords": [
    {
      "Changes": "string",
      "Details": "string",
      "User": "string"
    }
  ]
}
```

</div>
</details>

#### Organisation

<details>
<summary>getOrganisations</summary>

<div>

Retrieves Xero organisation details.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>GetOrganisationsHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |

**Returns:** `Organisations|error`

**Sample code:**

```ballerina
accounts:Organisations result = check accountsClient->getOrganisations({xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "Organisations": [
    {
      "Timezone": "AFGHANISTANSTANDARDTIME",
      "OrganisationID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9",
      "Name": "Sample name"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getOrganisationActions</summary>

<div>

Retrieves a list of the key actions your app has permission to perform in the connected Xero organisation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>GetOrganisationActionsHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |

**Returns:** `Actions|error`

**Sample code:**

```ballerina
accounts:Actions result = check accountsClient->getOrganisationActions({xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "Actions": [
    {
      "Name": "Sample name",
      "Status": "ALLOWED"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getOrganisationCISSettings</summary>

<div>

Retrieves the CIS settings for the Xero organistaion.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organisationID` | <code>string</code> | Yes | The unique Xero identifier for an organisation. |
| `headers` | <code>GetOrganisationCISSettingsHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |

**Returns:** `CISOrgSettings|error`

**Sample code:**

```ballerina
accounts:CISOrgSettings result = check accountsClient->getOrganisationCISSettings("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "CISSettings": [
    {
      "CISContractorEnabled": false,
      "CISSubContractorEnabled": false,
      "Rate": 100.00
    }
  ]
}
```

</div>
</details>

#### Overpayments

<details>
<summary>getOverpayments</summary>

<div>

Retrieves overpayments.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>GetOverpaymentsHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `ifModifiedSince`. |
| `unitdp` | <code>int</code> | No | E.g. unitdp=4: (Unit Decimal Places) You can opt in to use four decimal places for unit amounts. |
| `references` | <code>string[]</code> | No | Filter by a comma-separated list of References. |
| `pageSize` | <code>int</code> | No | Number of records to retrieve per page. |
| `'where` | <code>string</code> | No | Filter by an any element. |
| `page` | <code>int</code> | No | E.g. page=1: Up to 100 overpayments will be returned in a single API call with line items shown for each overpayment. |
| `'order` | <code>string</code> | No | Order by an any element. |

**Returns:** `Overpayments|error`

**Sample code:**

```ballerina
accounts:Overpayments result = check accountsClient->getOverpayments({xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "pagination": {
    "pageCount": 1,
    "pageSize": 1,
    "page": 1
  },
  "Overpayments": [
    {
      "Status": "AUTHORISED",
      "Allocations": [
        {
          "Invoice": {},
          "Amount": 100.00,
          "Date": "2026-01-15T00:00:00"
        }
      ],
      "UpdatedDateUTC": "2026-01-15T00:00:00"
    }
  ],
  "Warnings": [
    {
      "Message": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getOverpayment</summary>

<div>

Retrieves a specific overpayment using a unique overpayment Id.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `overpaymentID` | <code>string</code> | Yes | Unique identifier for a Overpayment. |
| `headers` | <code>GetOverpaymentHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |

**Returns:** `Overpayments|error`

**Sample code:**

```ballerina
accounts:Overpayments result = check accountsClient->getOverpayment("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "pagination": {
    "pageCount": 1,
    "pageSize": 1,
    "page": 1
  },
  "Overpayments": [
    {
      "Status": "AUTHORISED",
      "Allocations": [
        {
          "Invoice": {},
          "Amount": 100.00,
          "Date": "2026-01-15T00:00:00"
        }
      ],
      "UpdatedDateUTC": "2026-01-15T00:00:00"
    }
  ],
  "Warnings": [
    {
      "Message": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createOverpaymentAllocations</summary>

<div>

Creates a single allocation for a specific overpayment.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `overpaymentID` | <code>string</code> | Yes | Unique identifier for a Overpayment. |
| `headers` | <code>CreateOverpaymentAllocationsHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>Allocations</code> | Yes | Allocations array with Allocation object in body of request. |
| `summarizeErrors` | <code>boolean</code> | No | If false return 200 OK and mix of successfully created objects and any with validation errors. Defaults to `false`. |

**Returns:** `Allocations|error`

**Sample code:**

```ballerina
accounts:Allocations result = check accountsClient->createOverpaymentAllocations("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId}, {
    allocations: [{
        invoice: {},
        amount: 100.00,
        date: "2026-01-15T00:00:00"
    }]
});
```

**Sample response:**

```json
{
  "Allocations": [
    {
      "Invoice": {},
      "Amount": 100.00,
      "Date": "2026-01-15T00:00:00"
    }
  ]
}
```

</div>
</details>

<details>
<summary>deleteOverpaymentAllocations</summary>

<div>

Deletes an Allocation from an overpayment.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `overpaymentID` | <code>string</code> | Yes | Unique identifier for a Overpayment. |
| `allocationID` | <code>string</code> | Yes | Unique identifier for Allocation object. |
| `headers` | <code>DeleteOverpaymentAllocationsHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |

**Returns:** `Allocation|error`

**Sample code:**

```ballerina
accounts:Allocation result = check accountsClient->deleteOverpaymentAllocations("297c2dc5-cc47-4afd-8ec8-74990b8761e9", "297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "Invoice": {
    "BrandingThemeID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9",
    "CurrencyRate": 100.00,
    "UpdatedDateUTC": "2026-01-15T00:00:00"
  },
  "Amount": 100.00,
  "Date": "2026-01-15T00:00:00",
  "IsDeleted": false,
  "StatusAttributeString": "string",
  "ValidationErrors": [
    {
      "Message": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getOverpaymentHistory</summary>

<div>

Retrieves history records of a specific overpayment.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `overpaymentID` | <code>string</code> | Yes | Unique identifier for a Overpayment. |
| `headers` | <code>GetOverpaymentHistoryHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |

**Returns:** `HistoryRecords|error`

**Sample code:**

```ballerina
accounts:HistoryRecords result = check accountsClient->getOverpaymentHistory("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "HistoryRecords": [
    {
      "Changes": "string",
      "Details": "string",
      "User": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createOverpaymentHistory</summary>

<div>

Creates a history record for a specific overpayment.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `overpaymentID` | <code>string</code> | Yes | Unique identifier for a Overpayment. |
| `headers` | <code>CreateOverpaymentHistoryHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>HistoryRecords</code> | Yes | HistoryRecords containing an array of HistoryRecord objects in body of request. |

**Returns:** `HistoryRecords|error`

**Sample code:**

```ballerina
accounts:HistoryRecords result = check accountsClient->createOverpaymentHistory("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId}, {
    historyRecords: [{
        changes: "string",
        details: "string",
        user: "string"
    }]
});
```

**Sample response:**

```json
{
  "HistoryRecords": [
    {
      "Changes": "string",
      "Details": "string",
      "User": "string"
    }
  ]
}
```

</div>
</details>

#### Payments

<details>
<summary>getPayments</summary>

<div>

Retrieves payments for invoices and credit notes.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>GetPaymentsHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `ifModifiedSince`. |
| `pageSize` | <code>int</code> | No | Number of records to retrieve per page. |
| `'where` | <code>string</code> | No | Filter by an any element. |
| `page` | <code>int</code> | No | Up to 100 payments will be returned in a single API call. |
| `'order` | <code>string</code> | No | Order by an any element. |

**Returns:** `Payments|error`

**Sample code:**

```ballerina
accounts:Payments result = check accountsClient->getPayments({xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "pagination": {
    "pageCount": 1,
    "pageSize": 1,
    "page": 1
  },
  "Payments": [
    {
      "CurrencyRate": 100.00,
      "UpdatedDateUTC": "2026-01-15T00:00:00",
      "BatchPaymentID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9"
    }
  ],
  "Warnings": [
    {
      "Message": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createPayments</summary>

<div>

Creates multiple payments for invoices or credit notes.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>CreatePaymentsHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>Payments</code> | Yes | Payments array with Payment object in body of request. |
| `summarizeErrors` | <code>boolean</code> | No | If false return 200 OK and mix of successfully created objects and any with validation errors. Defaults to `false`. |

**Returns:** `Payments|error`

**Sample code:**

```ballerina
accounts:Payments result = check accountsClient->createPayments({xeroTenantId: tenantId}, {
    pagination: {
        pageCount: 1,
        pageSize: 1,
        page: 1
    },
    payments: [{
        currencyRate: 100.00,
        updatedDateUTCString: "2026-01-15T00:00:00",
        particulars: "string"
    }]
});
```

**Sample response:**

```json
{
  "pagination": {
    "pageCount": 1,
    "pageSize": 1,
    "page": 1
  },
  "Payments": [
    {
      "CurrencyRate": 100.00,
      "UpdatedDateUTC": "2026-01-15T00:00:00",
      "BatchPaymentID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9"
    }
  ],
  "Warnings": [
    {
      "Message": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createPayment</summary>

<div>

Creates a single payment for invoice or credit notes.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>CreatePaymentHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>Payment</code> | Yes | Request body with a single Payment object. |

**Returns:** `Payments|error`

**Sample code:**

```ballerina
accounts:Payments result = check accountsClient->createPayment({xeroTenantId: tenantId}, {
    account: {
        status: "ACTIVE",
        description: "Sample description",
        showInExpenseClaims: false
    },
    invoice: {
        currencyRate: 100.00,
        amountPaid: 100.00,
        amountCredited: 100.00
    },
    currencyRate: 100.00,
    creditNote: {
        allocations: [{
            invoice: {},
            amount: 100.00,
            date: "2026-01-15T00:00:00"
        }],
        currencyRate: 100.00,
        subTotal: 100.00
    }
});
```

**Sample response:**

```json
{
  "pagination": {
    "pageCount": 1,
    "pageSize": 1,
    "page": 1
  },
  "Payments": [
    {
      "CurrencyRate": 100.00,
      "UpdatedDateUTC": "2026-01-15T00:00:00",
      "BatchPaymentID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9"
    }
  ],
  "Warnings": [
    {
      "Message": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getPayment</summary>

<div>

Retrieves a specific payment for invoices and credit notes using a unique payment Id.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `paymentID` | <code>string</code> | Yes | Unique identifier for a Payment. |
| `headers` | <code>GetPaymentHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |

**Returns:** `Payments|error`

**Sample code:**

```ballerina
accounts:Payments result = check accountsClient->getPayment("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "pagination": {
    "pageCount": 1,
    "pageSize": 1,
    "page": 1
  },
  "Payments": [
    {
      "CurrencyRate": 100.00,
      "UpdatedDateUTC": "2026-01-15T00:00:00",
      "BatchPaymentID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9"
    }
  ],
  "Warnings": [
    {
      "Message": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>deletePayment</summary>

<div>

Deletes a specific payment by setting its status to DELETED.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `paymentID` | <code>string</code> | Yes | Unique identifier for a Payment. |
| `headers` | <code>DeletePaymentHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>PaymentDelete</code> | Yes | Status update that deletes the payment identified in the path. |

**Returns:** `Payments|error`

**Sample code:**

```ballerina
accounts:Payments result = check accountsClient->deletePayment("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId}, {
    status: "string"
});
```

**Sample response:**

```json
{
  "pagination": {
    "pageCount": 1,
    "pageSize": 1,
    "page": 1
  },
  "Payments": [
    {
      "CurrencyRate": 100.00,
      "UpdatedDateUTC": "2026-01-15T00:00:00",
      "BatchPaymentID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9"
    }
  ],
  "Warnings": [
    {
      "Message": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getPaymentHistory</summary>

<div>

Retrieves history records of a specific payment.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `paymentID` | <code>string</code> | Yes | Unique identifier for a Payment. |
| `headers` | <code>GetPaymentHistoryHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |

**Returns:** `HistoryRecords|error`

**Sample code:**

```ballerina
accounts:HistoryRecords result = check accountsClient->getPaymentHistory("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "HistoryRecords": [
    {
      "Changes": "string",
      "Details": "string",
      "User": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createPaymentHistory</summary>

<div>

Creates a history record for a specific payment.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `paymentID` | <code>string</code> | Yes | Unique identifier for a Payment. |
| `headers` | <code>CreatePaymentHistoryHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>HistoryRecords</code> | Yes | HistoryRecords containing an array of HistoryRecord objects in body of request. |

**Returns:** `HistoryRecords|error`

**Sample code:**

```ballerina
accounts:HistoryRecords result = check accountsClient->createPaymentHistory("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId}, {
    historyRecords: [{
        changes: "string",
        details: "string",
        user: "string"
    }]
});
```

**Sample response:**

```json
{
  "HistoryRecords": [
    {
      "Changes": "string",
      "Details": "string",
      "User": "string"
    }
  ]
}
```

</div>
</details>

#### Payment Services

<details>
<summary>getPaymentServices</summary>

<div>

Retrieves payment services.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>GetPaymentServicesHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |

**Returns:** `PaymentServices|error`

**Sample code:**

```ballerina
accounts:PaymentServices result = check accountsClient->getPaymentServices({xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "PaymentServices": [
    {
      "PaymentServiceID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9",
      "PaymentServiceName": "Sample name",
      "PaymentServiceUrl": "https://example.com/resource"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createPaymentService</summary>

<div>

Creates a payment service.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>CreatePaymentServiceHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>PaymentServices</code> | Yes | PaymentServices array with PaymentService object in body of request. |

**Returns:** `PaymentServices|error`

**Sample code:**

```ballerina
accounts:PaymentServices result = check accountsClient->createPaymentService({xeroTenantId: tenantId}, {
    paymentServices: [{
        PaymentServiceName: "Sample name",
        PaymentServiceUrl: "https://example.com/resource",
        PayNowText: "string"
    }]
});
```

**Sample response:**

```json
{
  "PaymentServices": [
    {
      "PaymentServiceID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9",
      "PaymentServiceName": "Sample name",
      "PaymentServiceUrl": "https://example.com/resource"
    }
  ]
}
```

</div>
</details>

#### Prepayments

<details>
<summary>getPrepayments</summary>

<div>

Retrieves prepayments.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>GetPrepaymentsHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `ifModifiedSince`. |
| `invoiceNumbers` | <code>string[]</code> | No | Filter by a comma-separated list of InvoiceNumbers. |
| `unitdp` | <code>int</code> | No | E.g. unitdp=4: (Unit Decimal Places) You can opt in to use four decimal places for unit amounts. |
| `references` | <code>string[]</code> | No | Filter by a comma-separated list of References. |
| `pageSize` | <code>int</code> | No | Number of records to retrieve per page. |
| `'where` | <code>string</code> | No | Filter by an any element. |
| `page` | <code>int</code> | No | E.g. page=1: Up to 100 prepayments will be returned in a single API call with line items shown for each prepayment. |
| `'order` | <code>string</code> | No | Order by an any element. |

**Returns:** `Prepayments|error`

**Sample code:**

```ballerina
accounts:Prepayments result = check accountsClient->getPrepayments({xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "pagination": {
    "pageCount": 1,
    "pageSize": 1,
    "page": 1
  },
  "Prepayments": [
    {
      "Status": "AUTHORISED",
      "BrandingThemeID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9",
      "Allocations": [
        {
          "Invoice": {},
          "Amount": 100.00,
          "Date": "2026-01-15T00:00:00"
        }
      ]
    }
  ],
  "Warnings": [
    {
      "Message": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getPrepayment</summary>

<div>

Allows you to retrieve a specified prepayments.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `prepaymentID` | <code>string</code> | Yes | Unique identifier for a PrePayment. |
| `headers` | <code>GetPrepaymentHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |

**Returns:** `Prepayments|error`

**Sample code:**

```ballerina
accounts:Prepayments result = check accountsClient->getPrepayment("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "pagination": {
    "pageCount": 1,
    "pageSize": 1,
    "page": 1
  },
  "Prepayments": [
    {
      "Status": "AUTHORISED",
      "BrandingThemeID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9",
      "Allocations": [
        {
          "Invoice": {},
          "Amount": 100.00,
          "Date": "2026-01-15T00:00:00"
        }
      ]
    }
  ],
  "Warnings": [
    {
      "Message": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createPrepaymentAllocations</summary>

<div>

Allows you to create an Allocation for prepayments.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `prepaymentID` | <code>string</code> | Yes | Unique identifier for a PrePayment. |
| `headers` | <code>CreatePrepaymentAllocationsHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>Allocations</code> | Yes | Allocations with an array of Allocation object in body of request. |
| `summarizeErrors` | <code>boolean</code> | No | If false return 200 OK and mix of successfully created objects and any with validation errors. Defaults to `false`. |

**Returns:** `Allocations|error`

**Sample code:**

```ballerina
accounts:Allocations result = check accountsClient->createPrepaymentAllocations("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId}, {
    allocations: [{
        invoice: {},
        amount: 100.00,
        date: "2026-01-15T00:00:00"
    }]
});
```

**Sample response:**

```json
{
  "Allocations": [
    {
      "Invoice": {},
      "Amount": 100.00,
      "Date": "2026-01-15T00:00:00"
    }
  ]
}
```

</div>
</details>

<details>
<summary>deletePrepaymentAllocations</summary>

<div>

Deletes an Allocation from a Prepayment.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `prepaymentID` | <code>string</code> | Yes | Unique identifier for a PrePayment. |
| `allocationID` | <code>string</code> | Yes | Unique identifier for Allocation object. |
| `headers` | <code>DeletePrepaymentAllocationsHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |

**Returns:** `Allocation|error`

**Sample code:**

```ballerina
accounts:Allocation result = check accountsClient->deletePrepaymentAllocations("297c2dc5-cc47-4afd-8ec8-74990b8761e9", "297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "Invoice": {
    "BrandingThemeID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9",
    "CurrencyRate": 100.00,
    "UpdatedDateUTC": "2026-01-15T00:00:00"
  },
  "Amount": 100.00,
  "Date": "2026-01-15T00:00:00",
  "IsDeleted": false,
  "StatusAttributeString": "string",
  "ValidationErrors": [
    {
      "Message": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getPrepaymentHistory</summary>

<div>

Retrieves history record for a specific prepayment.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `prepaymentID` | <code>string</code> | Yes | Unique identifier for a PrePayment. |
| `headers` | <code>GetPrepaymentHistoryHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |

**Returns:** `HistoryRecords|error`

**Sample code:**

```ballerina
accounts:HistoryRecords result = check accountsClient->getPrepaymentHistory("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "HistoryRecords": [
    {
      "Changes": "string",
      "Details": "string",
      "User": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createPrepaymentHistory</summary>

<div>

Creates a history record for a specific prepayment.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `prepaymentID` | <code>string</code> | Yes | Unique identifier for a PrePayment. |
| `headers` | <code>CreatePrepaymentHistoryHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>HistoryRecords</code> | Yes | HistoryRecords containing an array of HistoryRecord objects in body of request. |

**Returns:** `HistoryRecords|error`

**Sample code:**

```ballerina
accounts:HistoryRecords result = check accountsClient->createPrepaymentHistory("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId}, {
    historyRecords: [{
        changes: "string",
        details: "string",
        user: "string"
    }]
});
```

**Sample response:**

```json
{
  "HistoryRecords": [
    {
      "Changes": "string",
      "Details": "string",
      "User": "string"
    }
  ]
}
```

</div>
</details>

#### Purchase Orders

<details>
<summary>getPurchaseOrders</summary>

<div>

Retrieves purchase orders.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>GetPurchaseOrdersHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `ifModifiedSince`. |
| `status` | <code>"DRAFT"&#124;"SUBMITTED"&#124;"AUTHORISED"&#124;"BILLED"&#124;"DELETED"</code> | No | Filter by purchase order status. |
| `dateFrom` | <code>string</code> | No | Filter by purchase order date (e.g. GET https://.../PurchaseOrders?DateFrom=2015-12-01&DateTo=2015-12-31. |
| `pageSize` | <code>int</code> | No | Number of records to retrieve per page. |
| `page` | <code>int</code> | No | To specify a page, append the page parameter to the URL e.g. ?page=1. If there are 100 records in the response you will need to check if there is any more data by fetching the next page e.g ?page=2 and continuing this process until no more results are returned. |
| `dateTo` | <code>string</code> | No | Filter by purchase order date (e.g. GET https://.../PurchaseOrders?DateFrom=2015-12-01&DateTo=2015-12-31. |
| `'order` | <code>string</code> | No | Order by an any element. |

**Returns:** `PurchaseOrders|error`

**Sample code:**

```ballerina
accounts:PurchaseOrders result = check accountsClient->getPurchaseOrders({xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "pagination": {
    "pageCount": 1,
    "pageSize": 1,
    "page": 1
  },
  "PurchaseOrders": [
    {
      "BrandingThemeID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9",
      "DeliveryInstructions": "string",
      "Telephone": "string"
    }
  ],
  "Warnings": [
    {
      "Message": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createPurchaseOrders</summary>

<div>

Creates one or more purchase orders.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>CreatePurchaseOrdersHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>PurchaseOrders</code> | Yes | PurchaseOrders with an array of PurchaseOrder object in body of request. |
| `summarizeErrors` | <code>boolean</code> | No | If false return 200 OK and mix of successfully created objects and any with validation errors. Defaults to `false`. |

**Returns:** `PurchaseOrders|error`

**Sample code:**

```ballerina
accounts:PurchaseOrders result = check accountsClient->createPurchaseOrders({xeroTenantId: tenantId}, {
    pagination: {
        pageCount: 1,
        pageSize: 1,
        page: 1
    },
    purchaseOrders: [{
        deliveryInstructions: "string",
        telephone: "string",
        currencyRate: 100.00
    }]
});
```

**Sample response:**

```json
{
  "pagination": {
    "pageCount": 1,
    "pageSize": 1,
    "page": 1
  },
  "PurchaseOrders": [
    {
      "BrandingThemeID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9",
      "DeliveryInstructions": "string",
      "Telephone": "string"
    }
  ],
  "Warnings": [
    {
      "Message": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>updateOrCreatePurchaseOrders</summary>

<div>

Updates or creates one or more purchase orders.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>UpdateOrCreatePurchaseOrdersHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>PurchaseOrders</code> | Yes | Purchase orders to create or update. |
| `summarizeErrors` | <code>boolean</code> | No | If false return 200 OK and mix of successfully created objects and any with validation errors. Defaults to `false`. |

**Returns:** `PurchaseOrders|error`

**Sample code:**

```ballerina
accounts:PurchaseOrders result = check accountsClient->updateOrCreatePurchaseOrders({xeroTenantId: tenantId}, {
    pagination: {
        pageCount: 1,
        pageSize: 1,
        page: 1
    },
    purchaseOrders: [{
        deliveryInstructions: "string",
        telephone: "string",
        currencyRate: 100.00
    }]
});
```

**Sample response:**

```json
{
  "pagination": {
    "pageCount": 1,
    "pageSize": 1,
    "page": 1
  },
  "PurchaseOrders": [
    {
      "BrandingThemeID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9",
      "DeliveryInstructions": "string",
      "Telephone": "string"
    }
  ],
  "Warnings": [
    {
      "Message": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getPurchaseOrderAsPdf</summary>

<div>

Retrieves specific purchase order as PDF files using a unique purchase order Id.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `purchaseOrderID` | <code>string</code> | Yes | Unique identifier for an Purchase Order. |
| `headers` | <code>GetPurchaseOrderAsPdfHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |

**Returns:** `http:Response|error`

**Sample code:**

```ballerina
http:Response result = check accountsClient->getPurchaseOrderAsPdf("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId});
```

**Sample response:**

The raw `http:Response`. Read the PDF content with `check result.getBinaryPayload()`.

</div>
</details>

<details>
<summary>getPurchaseOrder</summary>

<div>

Retrieves a specific purchase order using a unique purchase order Id.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `purchaseOrderID` | <code>string</code> | Yes | Unique identifier for an Purchase Order. |
| `headers` | <code>GetPurchaseOrderHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |

**Returns:** `PurchaseOrders|error`

**Sample code:**

```ballerina
accounts:PurchaseOrders result = check accountsClient->getPurchaseOrder("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "pagination": {
    "pageCount": 1,
    "pageSize": 1,
    "page": 1
  },
  "PurchaseOrders": [
    {
      "BrandingThemeID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9",
      "DeliveryInstructions": "string",
      "Telephone": "string"
    }
  ],
  "Warnings": [
    {
      "Message": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>updatePurchaseOrder</summary>

<div>

Updates a specific purchase order.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `purchaseOrderID` | <code>string</code> | Yes | Unique identifier for an Purchase Order. |
| `headers` | <code>UpdatePurchaseOrderHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>PurchaseOrders</code> | Yes | Purchase order with the fields to update. |

**Returns:** `PurchaseOrders|error`

**Sample code:**

```ballerina
accounts:PurchaseOrders result = check accountsClient->updatePurchaseOrder("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId}, {
    pagination: {
        pageCount: 1,
        pageSize: 1,
        page: 1
    },
    purchaseOrders: [{
        deliveryInstructions: "string",
        telephone: "string",
        currencyRate: 100.00
    }]
});
```

**Sample response:**

```json
{
  "pagination": {
    "pageCount": 1,
    "pageSize": 1,
    "page": 1
  },
  "PurchaseOrders": [
    {
      "BrandingThemeID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9",
      "DeliveryInstructions": "string",
      "Telephone": "string"
    }
  ],
  "Warnings": [
    {
      "Message": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getPurchaseOrderByNumber</summary>

<div>

Retrieves a specific purchase order using purchase order number.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `purchaseOrderNumber` | <code>string</code> | Yes | Unique identifier for a PurchaseOrder. |
| `headers` | <code>GetPurchaseOrderByNumberHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |

**Returns:** `PurchaseOrders|error`

**Sample code:**

```ballerina
accounts:PurchaseOrders result = check accountsClient->getPurchaseOrderByNumber("INV-0001", {xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "pagination": {
    "pageCount": 1,
    "pageSize": 1,
    "page": 1
  },
  "PurchaseOrders": [
    {
      "BrandingThemeID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9",
      "DeliveryInstructions": "string",
      "Telephone": "string"
    }
  ],
  "Warnings": [
    {
      "Message": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getPurchaseOrderHistory</summary>

<div>

Retrieves history for a specific purchase order.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `purchaseOrderID` | <code>string</code> | Yes | Unique identifier for an Purchase Order. |
| `headers` | <code>GetPurchaseOrderHistoryHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |

**Returns:** `HistoryRecords|error`

**Sample code:**

```ballerina
accounts:HistoryRecords result = check accountsClient->getPurchaseOrderHistory("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "HistoryRecords": [
    {
      "Changes": "string",
      "Details": "string",
      "User": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createPurchaseOrderHistory</summary>

<div>

Creates a history record for a specific purchase orders.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `purchaseOrderID` | <code>string</code> | Yes | Unique identifier for an Purchase Order. |
| `headers` | <code>CreatePurchaseOrderHistoryHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>HistoryRecords</code> | Yes | HistoryRecords containing an array of HistoryRecord objects in body of request. |

**Returns:** `HistoryRecords|error`

**Sample code:**

```ballerina
accounts:HistoryRecords result = check accountsClient->createPurchaseOrderHistory("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId}, {
    historyRecords: [{
        changes: "string",
        details: "string",
        user: "string"
    }]
});
```

**Sample response:**

```json
{
  "HistoryRecords": [
    {
      "Changes": "string",
      "Details": "string",
      "User": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getPurchaseOrderAttachments</summary>

<div>

Retrieves attachments for a specific purchase order.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `purchaseOrderID` | <code>string</code> | Yes | Unique identifier for an Purchase Order. |
| `headers` | <code>GetPurchaseOrderAttachmentsHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |

**Returns:** `Attachments|error`

**Sample code:**

```ballerina
accounts:Attachments result = check accountsClient->getPurchaseOrderAttachments("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "Attachments": [
    {
      "FileName": "invoice.pdf",
      "ContentLength": 1,
      "IncludeOnline": false
    }
  ]
}
```

</div>
</details>

<details>
<summary>getPurchaseOrderAttachmentById</summary>

<div>

Retrieves specific attachment for a specific purchase order using a unique attachment Id.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `purchaseOrderID` | <code>string</code> | Yes | Unique identifier for an Purchase Order. |
| `attachmentID` | <code>string</code> | Yes | Unique identifier for Attachment object. |
| `headers` | <code>GetPurchaseOrderAttachmentByIdHeaders</code> | Yes | Request headers, including the required `xeroTenantId`, `contentType` (the Xero tenant ID of the organisation). |

**Returns:** `byte[]|error`

**Sample code:**

```ballerina
byte[] result = check accountsClient->getPurchaseOrderAttachmentById("297c2dc5-cc47-4afd-8ec8-74990b8761e9", "297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId, contentType: "string"});
```

**Sample response:**

The raw response content as `byte[]`.

</div>
</details>

<details>
<summary>getPurchaseOrderAttachmentByFileName</summary>

<div>

Retrieves a specific attachment for a specific purchase order by filename.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `purchaseOrderID` | <code>string</code> | Yes | Unique identifier for an Purchase Order. |
| `fileName` | <code>string</code> | Yes | Name of the attachment. |
| `headers` | <code>GetPurchaseOrderAttachmentByFileNameHeaders</code> | Yes | Request headers, including the required `xeroTenantId`, `contentType` (the Xero tenant ID of the organisation). |

**Returns:** `byte[]|error`

**Sample code:**

```ballerina
byte[] result = check accountsClient->getPurchaseOrderAttachmentByFileName("297c2dc5-cc47-4afd-8ec8-74990b8761e9", "invoice.pdf", {xeroTenantId: tenantId, contentType: "string"});
```

**Sample response:**

The raw response content as `byte[]`.

</div>
</details>

<details>
<summary>createPurchaseOrderAttachmentByFileName</summary>

<div>

Creates attachment for a specific purchase order.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `purchaseOrderID` | <code>string</code> | Yes | Unique identifier for an Purchase Order. |
| `fileName` | <code>string</code> | Yes | Name of the attachment. |
| `headers` | <code>CreatePurchaseOrderAttachmentByFileNameHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>byte[]</code> | Yes | Byte array of file in body of request. |

**Returns:** `Attachments|error`

**Sample code:**

```ballerina
byte[] fileContent = check io:fileReadBytes("invoice.pdf");
accounts:Attachments result = check accountsClient->createPurchaseOrderAttachmentByFileName("297c2dc5-cc47-4afd-8ec8-74990b8761e9", "invoice.pdf", {xeroTenantId: tenantId}, fileContent);
```

**Sample response:**

```json
{
  "Attachments": [
    {
      "FileName": "invoice.pdf",
      "ContentLength": 1,
      "IncludeOnline": false
    }
  ]
}
```

</div>
</details>

<details>
<summary>updatePurchaseOrderAttachmentByFileName</summary>

<div>

Updates a specific attachment for a specific purchase order by filename.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `purchaseOrderID` | <code>string</code> | Yes | Unique identifier for an Purchase Order. |
| `fileName` | <code>string</code> | Yes | Name of the attachment. |
| `headers` | <code>UpdatePurchaseOrderAttachmentByFileNameHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>byte[]</code> | Yes | Byte array of file in body of request. |

**Returns:** `Attachments|error`

**Sample code:**

```ballerina
byte[] fileContent = check io:fileReadBytes("invoice.pdf");
accounts:Attachments result = check accountsClient->updatePurchaseOrderAttachmentByFileName("297c2dc5-cc47-4afd-8ec8-74990b8761e9", "invoice.pdf", {xeroTenantId: tenantId}, fileContent);
```

**Sample response:**

```json
{
  "Attachments": [
    {
      "FileName": "invoice.pdf",
      "ContentLength": 1,
      "IncludeOnline": false
    }
  ]
}
```

</div>
</details>

#### Quotes

<details>
<summary>getQuotes</summary>

<div>

Retrieves sales quotes.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>GetQuotesHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `ifModifiedSince`. |
| `status` | <code>string</code> | No | Filter for quotes of a particular Status. |
| `quoteNumber` | <code>string</code> | No | Filter by quote number (e.g. GET https://.../Quotes?QuoteNumber=QU-0001). |
| `dateFrom` | <code>string</code> | No | Filter for quotes after a particular date. |
| `expiryDateTo` | <code>string</code> | No | Filter for quotes before a particular date. |
| `contactID` | <code>string</code> | No | Filter for quotes belonging to a particular contact. |
| `page` | <code>int</code> | No | E.g. page=1: Up to 100 Quotes will be returned in a single API call with line items shown for each quote. |
| `dateTo` | <code>string</code> | No | Filter for quotes before a particular date. |
| `expiryDateFrom` | <code>string</code> | No | Filter for quotes expiring after a particular date. |
| `'order` | <code>string</code> | No | Order by an any element. |

**Returns:** `Quotes|error`

**Sample code:**

```ballerina
accounts:Quotes result = check accountsClient->getQuotes({xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "Quotes": [
    {
      "Status": "DRAFT",
      "ExpiryDate": "2026-01-15T00:00:00",
      "BrandingThemeID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createQuotes</summary>

<div>

Create one or more quotes.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>CreateQuotesHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>Quotes</code> | Yes | Quotes with an array of Quote object in body of request. |
| `summarizeErrors` | <code>boolean</code> | No | If false return 200 OK and mix of successfully created objects and any with validation errors. Defaults to `false`. |

**Returns:** `Quotes|error`

**Sample code:**

```ballerina
accounts:Quotes result = check accountsClient->createQuotes({xeroTenantId: tenantId}, {
    quotes: [{
        status: "DRAFT",
        expiryDate: "2026-01-15T00:00:00",
        currencyRate: 100.00
    }]
});
```

**Sample response:**

```json
{
  "Quotes": [
    {
      "Status": "DRAFT",
      "ExpiryDate": "2026-01-15T00:00:00",
      "BrandingThemeID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9"
    }
  ]
}
```

</div>
</details>

<details>
<summary>updateOrCreateQuotes</summary>

<div>

Updates or creates one or more quotes.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>UpdateOrCreateQuotesHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>Quotes</code> | Yes | Quotes to create or update. |
| `summarizeErrors` | <code>boolean</code> | No | If false return 200 OK and mix of successfully created objects and any with validation errors. Defaults to `false`. |

**Returns:** `Quotes|error`

**Sample code:**

```ballerina
accounts:Quotes result = check accountsClient->updateOrCreateQuotes({xeroTenantId: tenantId}, {
    quotes: [{
        status: "DRAFT",
        expiryDate: "2026-01-15T00:00:00",
        currencyRate: 100.00
    }]
});
```

**Sample response:**

```json
{
  "Quotes": [
    {
      "Status": "DRAFT",
      "ExpiryDate": "2026-01-15T00:00:00",
      "BrandingThemeID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getQuote</summary>

<div>

Retrieves a specific quote using a unique quote Id.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `quoteID` | <code>string</code> | Yes | Unique identifier for an Quote. |
| `headers` | <code>GetQuoteHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |

**Returns:** `Quotes|error`

**Sample code:**

```ballerina
accounts:Quotes result = check accountsClient->getQuote("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "Quotes": [
    {
      "Status": "DRAFT",
      "ExpiryDate": "2026-01-15T00:00:00",
      "BrandingThemeID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9"
    }
  ]
}
```

</div>
</details>

<details>
<summary>updateQuote</summary>

<div>

Updates a specific quote.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `quoteID` | <code>string</code> | Yes | Unique identifier for an Quote. |
| `headers` | <code>UpdateQuoteHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>Quotes</code> | Yes | Quote with the fields to update. |

**Returns:** `Quotes|error`

**Sample code:**

```ballerina
accounts:Quotes result = check accountsClient->updateQuote("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId}, {
    quotes: [{
        status: "DRAFT",
        expiryDate: "2026-01-15T00:00:00",
        currencyRate: 100.00
    }]
});
```

**Sample response:**

```json
{
  "Quotes": [
    {
      "Status": "DRAFT",
      "ExpiryDate": "2026-01-15T00:00:00",
      "BrandingThemeID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getQuoteHistory</summary>

<div>

Retrieves history records of a specific quote.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `quoteID` | <code>string</code> | Yes | Unique identifier for an Quote. |
| `headers` | <code>GetQuoteHistoryHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |

**Returns:** `HistoryRecords|error`

**Sample code:**

```ballerina
accounts:HistoryRecords result = check accountsClient->getQuoteHistory("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "HistoryRecords": [
    {
      "Changes": "string",
      "Details": "string",
      "User": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createQuoteHistory</summary>

<div>

Creates a history record for a specific quote.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `quoteID` | <code>string</code> | Yes | Unique identifier for an Quote. |
| `headers` | <code>CreateQuoteHistoryHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>HistoryRecords</code> | Yes | HistoryRecords containing an array of HistoryRecord objects in body of request. |

**Returns:** `HistoryRecords|error`

**Sample code:**

```ballerina
accounts:HistoryRecords result = check accountsClient->createQuoteHistory("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId}, {
    historyRecords: [{
        changes: "string",
        details: "string",
        user: "string"
    }]
});
```

**Sample response:**

```json
{
  "HistoryRecords": [
    {
      "Changes": "string",
      "Details": "string",
      "User": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getQuoteAsPdf</summary>

<div>

Retrieves a specific quote as a PDF file using a unique quote Id.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `quoteID` | <code>string</code> | Yes | Unique identifier for an Quote. |
| `headers` | <code>GetQuoteAsPdfHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |

**Returns:** `http:Response|error`

**Sample code:**

```ballerina
http:Response result = check accountsClient->getQuoteAsPdf("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId});
```

**Sample response:**

The raw `http:Response`. Read the PDF content with `check result.getBinaryPayload()`.

</div>
</details>

<details>
<summary>getQuoteAttachments</summary>

<div>

Retrieves attachments for a specific quote.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `quoteID` | <code>string</code> | Yes | Unique identifier for an Quote. |
| `headers` | <code>GetQuoteAttachmentsHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |

**Returns:** `Attachments|error`

**Sample code:**

```ballerina
accounts:Attachments result = check accountsClient->getQuoteAttachments("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "Attachments": [
    {
      "FileName": "invoice.pdf",
      "ContentLength": 1,
      "IncludeOnline": false
    }
  ]
}
```

</div>
</details>

<details>
<summary>getQuoteAttachmentById</summary>

<div>

Retrieves a specific attachment from a specific quote using a unique attachment Id.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `quoteID` | <code>string</code> | Yes | Unique identifier for an Quote. |
| `attachmentID` | <code>string</code> | Yes | Unique identifier for Attachment object. |
| `headers` | <code>GetQuoteAttachmentByIdHeaders</code> | Yes | Request headers, including the required `xeroTenantId`, `contentType` (the Xero tenant ID of the organisation). |

**Returns:** `byte[]|error`

**Sample code:**

```ballerina
byte[] result = check accountsClient->getQuoteAttachmentById("297c2dc5-cc47-4afd-8ec8-74990b8761e9", "297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId, contentType: "string"});
```

**Sample response:**

The raw response content as `byte[]`.

</div>
</details>

<details>
<summary>getQuoteAttachmentByFileName</summary>

<div>

Retrieves a specific attachment from a specific quote by filename.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `quoteID` | <code>string</code> | Yes | Unique identifier for an Quote. |
| `fileName` | <code>string</code> | Yes | Name of the attachment. |
| `headers` | <code>GetQuoteAttachmentByFileNameHeaders</code> | Yes | Request headers, including the required `xeroTenantId`, `contentType` (the Xero tenant ID of the organisation). |

**Returns:** `byte[]|error`

**Sample code:**

```ballerina
byte[] result = check accountsClient->getQuoteAttachmentByFileName("297c2dc5-cc47-4afd-8ec8-74990b8761e9", "invoice.pdf", {xeroTenantId: tenantId, contentType: "string"});
```

**Sample response:**

The raw response content as `byte[]`.

</div>
</details>

<details>
<summary>createQuoteAttachmentByFileName</summary>

<div>

Creates attachment for a specific quote.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `quoteID` | <code>string</code> | Yes | Unique identifier for an Quote. |
| `fileName` | <code>string</code> | Yes | Name of the attachment. |
| `headers` | <code>CreateQuoteAttachmentByFileNameHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>byte[]</code> | Yes | Byte array of file in body of request. |

**Returns:** `Attachments|error`

**Sample code:**

```ballerina
byte[] fileContent = check io:fileReadBytes("invoice.pdf");
accounts:Attachments result = check accountsClient->createQuoteAttachmentByFileName("297c2dc5-cc47-4afd-8ec8-74990b8761e9", "invoice.pdf", {xeroTenantId: tenantId}, fileContent);
```

**Sample response:**

```json
{
  "Attachments": [
    {
      "FileName": "invoice.pdf",
      "ContentLength": 1,
      "IncludeOnline": false
    }
  ]
}
```

</div>
</details>

<details>
<summary>updateQuoteAttachmentByFileName</summary>

<div>

Updates a specific attachment from a specific quote by filename.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `quoteID` | <code>string</code> | Yes | Unique identifier for an Quote. |
| `fileName` | <code>string</code> | Yes | Name of the attachment. |
| `headers` | <code>UpdateQuoteAttachmentByFileNameHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>byte[]</code> | Yes | Byte array of file in body of request. |

**Returns:** `Attachments|error`

**Sample code:**

```ballerina
byte[] fileContent = check io:fileReadBytes("invoice.pdf");
accounts:Attachments result = check accountsClient->updateQuoteAttachmentByFileName("297c2dc5-cc47-4afd-8ec8-74990b8761e9", "invoice.pdf", {xeroTenantId: tenantId}, fileContent);
```

**Sample response:**

```json
{
  "Attachments": [
    {
      "FileName": "invoice.pdf",
      "ContentLength": 1,
      "IncludeOnline": false
    }
  ]
}
```

</div>
</details>

#### Receipts

<details>
<summary>getReceipts</summary>

<div>

Retrieves draft expense claim receipts for any user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>GetReceiptsHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `ifModifiedSince`. |
| `unitdp` | <code>int</code> | No | E.g. unitdp=4: (Unit Decimal Places) You can opt in to use four decimal places for unit amounts. |
| `'where` | <code>string</code> | No | Filter by an any element. |
| `'order` | <code>string</code> | No | Order by an any element. |

**Returns:** `Receipts|error`

**Sample code:**

```ballerina
accounts:Receipts result = check accountsClient->getReceipts({xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "Receipts": [
    {
      "Status": "DRAFT",
      "UpdatedDateUTC": "2026-01-15T00:00:00",
      "Reference": "REF-001"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createReceipt</summary>

<div>

Creates draft expense claim receipts for any user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>CreateReceiptHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>Receipts</code> | Yes | Receipts with an array of Receipt object in body of request. |
| `unitdp` | <code>int</code> | No | E.g. unitdp=4: (Unit Decimal Places) You can opt in to use four decimal places for unit amounts. |

**Returns:** `Receipts|error`

**Sample code:**

```ballerina
accounts:Receipts result = check accountsClient->createReceipt({xeroTenantId: tenantId}, {
    receipts: [{
        status: "DRAFT",
        reference: "REF-001",
        subTotal: 100.00
    }]
});
```

**Sample response:**

```json
{
  "Receipts": [
    {
      "Status": "DRAFT",
      "UpdatedDateUTC": "2026-01-15T00:00:00",
      "Reference": "REF-001"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getReceipt</summary>

<div>

Retrieves a specific draft expense claim receipt by using a unique receipt Id.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `receiptID` | <code>string</code> | Yes | Unique identifier for a Receipt. |
| `headers` | <code>GetReceiptHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |
| `unitdp` | <code>int</code> | No | E.g. unitdp=4: (Unit Decimal Places) You can opt in to use four decimal places for unit amounts. |

**Returns:** `Receipts|error`

**Sample code:**

```ballerina
accounts:Receipts result = check accountsClient->getReceipt("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "Receipts": [
    {
      "Status": "DRAFT",
      "UpdatedDateUTC": "2026-01-15T00:00:00",
      "Reference": "REF-001"
    }
  ]
}
```

</div>
</details>

<details>
<summary>updateReceipt</summary>

<div>

Updates a specific draft expense claim receipts.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `receiptID` | <code>string</code> | Yes | Unique identifier for a Receipt. |
| `headers` | <code>UpdateReceiptHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>Receipts</code> | Yes | Draft expense claim receipt with the fields to update. |
| `unitdp` | <code>int</code> | No | E.g. unitdp=4: (Unit Decimal Places) You can opt in to use four decimal places for unit amounts. |

**Returns:** `Receipts|error`

**Sample code:**

```ballerina
accounts:Receipts result = check accountsClient->updateReceipt("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId}, {
    receipts: [{
        status: "DRAFT",
        reference: "REF-001",
        subTotal: 100.00
    }]
});
```

**Sample response:**

```json
{
  "Receipts": [
    {
      "Status": "DRAFT",
      "UpdatedDateUTC": "2026-01-15T00:00:00",
      "Reference": "REF-001"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getReceiptAttachments</summary>

<div>

Retrieves attachments for a specific expense claim receipt.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `receiptID` | <code>string</code> | Yes | Unique identifier for a Receipt. |
| `headers` | <code>GetReceiptAttachmentsHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |

**Returns:** `Attachments|error`

**Sample code:**

```ballerina
accounts:Attachments result = check accountsClient->getReceiptAttachments("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "Attachments": [
    {
      "FileName": "invoice.pdf",
      "ContentLength": 1,
      "IncludeOnline": false
    }
  ]
}
```

</div>
</details>

<details>
<summary>getReceiptAttachmentById</summary>

<div>

Retrieves a specific attachments from a specific expense claim receipts by using a unique attachment Id.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `receiptID` | <code>string</code> | Yes | Unique identifier for a Receipt. |
| `attachmentID` | <code>string</code> | Yes | Unique identifier for Attachment object. |
| `headers` | <code>GetReceiptAttachmentByIdHeaders</code> | Yes | Request headers, including the required `xeroTenantId`, `contentType` (the Xero tenant ID of the organisation). |

**Returns:** `byte[]|error`

**Sample code:**

```ballerina
byte[] result = check accountsClient->getReceiptAttachmentById("297c2dc5-cc47-4afd-8ec8-74990b8761e9", "297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId, contentType: "string"});
```

**Sample response:**

The raw response content as `byte[]`.

</div>
</details>

<details>
<summary>getReceiptAttachmentByFileName</summary>

<div>

Retrieves a specific attachment from a specific expense claim receipts by file name.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `receiptID` | <code>string</code> | Yes | Unique identifier for a Receipt. |
| `fileName` | <code>string</code> | Yes | Name of the attachment. |
| `headers` | <code>GetReceiptAttachmentByFileNameHeaders</code> | Yes | Request headers, including the required `xeroTenantId`, `contentType` (the Xero tenant ID of the organisation). |

**Returns:** `byte[]|error`

**Sample code:**

```ballerina
byte[] result = check accountsClient->getReceiptAttachmentByFileName("297c2dc5-cc47-4afd-8ec8-74990b8761e9", "invoice.pdf", {xeroTenantId: tenantId, contentType: "string"});
```

**Sample response:**

The raw response content as `byte[]`.

</div>
</details>

<details>
<summary>createReceiptAttachmentByFileName</summary>

<div>

Creates an attachment on a specific expense claim receipts by file name.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `receiptID` | <code>string</code> | Yes | Unique identifier for a Receipt. |
| `fileName` | <code>string</code> | Yes | Name of the attachment. |
| `headers` | <code>CreateReceiptAttachmentByFileNameHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>byte[]</code> | Yes | Byte array of file in body of request. |

**Returns:** `Attachments|error`

**Sample code:**

```ballerina
byte[] fileContent = check io:fileReadBytes("invoice.pdf");
accounts:Attachments result = check accountsClient->createReceiptAttachmentByFileName("297c2dc5-cc47-4afd-8ec8-74990b8761e9", "invoice.pdf", {xeroTenantId: tenantId}, fileContent);
```

**Sample response:**

```json
{
  "Attachments": [
    {
      "FileName": "invoice.pdf",
      "ContentLength": 1,
      "IncludeOnline": false
    }
  ]
}
```

</div>
</details>

<details>
<summary>updateReceiptAttachmentByFileName</summary>

<div>

Updates a specific attachment on a specific expense claim receipts by file name.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `receiptID` | <code>string</code> | Yes | Unique identifier for a Receipt. |
| `fileName` | <code>string</code> | Yes | Name of the attachment. |
| `headers` | <code>UpdateReceiptAttachmentByFileNameHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>byte[]</code> | Yes | Byte array of file in body of request. |

**Returns:** `Attachments|error`

**Sample code:**

```ballerina
byte[] fileContent = check io:fileReadBytes("invoice.pdf");
accounts:Attachments result = check accountsClient->updateReceiptAttachmentByFileName("297c2dc5-cc47-4afd-8ec8-74990b8761e9", "invoice.pdf", {xeroTenantId: tenantId}, fileContent);
```

**Sample response:**

```json
{
  "Attachments": [
    {
      "FileName": "invoice.pdf",
      "ContentLength": 1,
      "IncludeOnline": false
    }
  ]
}
```

</div>
</details>

<details>
<summary>getReceiptHistory</summary>

<div>

Retrieves a history record for a specific receipt.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `receiptID` | <code>string</code> | Yes | Unique identifier for a Receipt. |
| `headers` | <code>GetReceiptHistoryHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |

**Returns:** `HistoryRecords|error`

**Sample code:**

```ballerina
accounts:HistoryRecords result = check accountsClient->getReceiptHistory("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "HistoryRecords": [
    {
      "Changes": "string",
      "Details": "string",
      "User": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createReceiptHistory</summary>

<div>

Creates a history record for a specific receipt.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `receiptID` | <code>string</code> | Yes | Unique identifier for a Receipt. |
| `headers` | <code>CreateReceiptHistoryHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>HistoryRecords</code> | Yes | HistoryRecords containing an array of HistoryRecord objects in body of request. |

**Returns:** `HistoryRecords|error`

**Sample code:**

```ballerina
accounts:HistoryRecords result = check accountsClient->createReceiptHistory("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId}, {
    historyRecords: [{
        changes: "string",
        details: "string",
        user: "string"
    }]
});
```

**Sample response:**

```json
{
  "HistoryRecords": [
    {
      "Changes": "string",
      "Details": "string",
      "User": "string"
    }
  ]
}
```

</div>
</details>

#### Repeating Invoices

<details>
<summary>getRepeatingInvoices</summary>

<div>

Retrieves repeating invoices.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>GetRepeatingInvoicesHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |
| `'where` | <code>string</code> | No | Filter by an any element. |
| `'order` | <code>string</code> | No | Order by an any element. |

**Returns:** `RepeatingInvoices|error`

**Sample code:**

```ballerina
accounts:RepeatingInvoices result = check accountsClient->getRepeatingInvoices({xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "RepeatingInvoices": [
    {
      "Status": "DRAFT",
      "BrandingThemeID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9",
      "Reference": "REF-001"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createRepeatingInvoices</summary>

<div>

Creates one or more repeating invoice templates.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>CreateRepeatingInvoicesHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>RepeatingInvoices</code> | Yes | RepeatingInvoices with an array of repeating invoice objects in body of request. |
| `summarizeErrors` | <code>boolean</code> | No | If false return 200 OK and mix of successfully created objects and any with validation errors. Defaults to `false`. |

**Returns:** `RepeatingInvoices|error`

**Sample code:**

```ballerina
accounts:RepeatingInvoices result = check accountsClient->createRepeatingInvoices({xeroTenantId: tenantId}, {
    repeatingInvoices: [{
        status: "DRAFT",
        reference: "REF-001",
        approvedForSending: false
    }]
});
```

**Sample response:**

```json
{
  "RepeatingInvoices": [
    {
      "Status": "DRAFT",
      "BrandingThemeID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9",
      "Reference": "REF-001"
    }
  ]
}
```

</div>
</details>

<details>
<summary>updateOrCreateRepeatingInvoices</summary>

<div>

Creates or deletes one or more repeating invoice templates.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>UpdateOrCreateRepeatingInvoicesHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>RepeatingInvoices</code> | Yes | RepeatingInvoices with an array of repeating invoice objects in body of request. |
| `summarizeErrors` | <code>boolean</code> | No | If false return 200 OK and mix of successfully created objects and any with validation errors. Defaults to `false`. |

**Returns:** `RepeatingInvoices|error`

**Sample code:**

```ballerina
accounts:RepeatingInvoices result = check accountsClient->updateOrCreateRepeatingInvoices({xeroTenantId: tenantId}, {
    repeatingInvoices: [{
        status: "DRAFT",
        reference: "REF-001",
        approvedForSending: false
    }]
});
```

**Sample response:**

```json
{
  "RepeatingInvoices": [
    {
      "Status": "DRAFT",
      "BrandingThemeID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9",
      "Reference": "REF-001"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getRepeatingInvoice</summary>

<div>

Retrieves a specific repeating invoice by using a unique repeating invoice Id.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `repeatingInvoiceID` | <code>string</code> | Yes | Unique identifier for a Repeating Invoice. |
| `headers` | <code>GetRepeatingInvoiceHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |

**Returns:** `RepeatingInvoices|error`

**Sample code:**

```ballerina
accounts:RepeatingInvoices result = check accountsClient->getRepeatingInvoice("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "RepeatingInvoices": [
    {
      "Status": "DRAFT",
      "BrandingThemeID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9",
      "Reference": "REF-001"
    }
  ]
}
```

</div>
</details>

<details>
<summary>updateRepeatingInvoice</summary>

<div>

Updates or deletes a specific repeating invoice template.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `repeatingInvoiceID` | <code>string</code> | Yes | Unique identifier for a Repeating Invoice. |
| `headers` | <code>UpdateRepeatingInvoiceHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>RepeatingInvoices</code> | Yes | Repeating invoice template with the fields to update, or a DELETED status. |

**Returns:** `RepeatingInvoices|error`

**Sample code:**

```ballerina
accounts:RepeatingInvoices result = check accountsClient->updateRepeatingInvoice("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId}, {
    repeatingInvoices: [{
        status: "DRAFT",
        reference: "REF-001",
        approvedForSending: false
    }]
});
```

**Sample response:**

```json
{
  "RepeatingInvoices": [
    {
      "Status": "DRAFT",
      "BrandingThemeID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9",
      "Reference": "REF-001"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getRepeatingInvoiceAttachments</summary>

<div>

Retrieves attachments from a specific repeating invoice.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `repeatingInvoiceID` | <code>string</code> | Yes | Unique identifier for a Repeating Invoice. |
| `headers` | <code>GetRepeatingInvoiceAttachmentsHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |

**Returns:** `Attachments|error`

**Sample code:**

```ballerina
accounts:Attachments result = check accountsClient->getRepeatingInvoiceAttachments("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "Attachments": [
    {
      "FileName": "invoice.pdf",
      "ContentLength": 1,
      "IncludeOnline": false
    }
  ]
}
```

</div>
</details>

<details>
<summary>getRepeatingInvoiceAttachmentById</summary>

<div>

Retrieves a specific attachment from a specific repeating invoice.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `repeatingInvoiceID` | <code>string</code> | Yes | Unique identifier for a Repeating Invoice. |
| `attachmentID` | <code>string</code> | Yes | Unique identifier for Attachment object. |
| `headers` | <code>GetRepeatingInvoiceAttachmentByIdHeaders</code> | Yes | Request headers, including the required `xeroTenantId`, `contentType` (the Xero tenant ID of the organisation). |

**Returns:** `byte[]|error`

**Sample code:**

```ballerina
byte[] result = check accountsClient->getRepeatingInvoiceAttachmentById("297c2dc5-cc47-4afd-8ec8-74990b8761e9", "297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId, contentType: "string"});
```

**Sample response:**

The raw response content as `byte[]`.

</div>
</details>

<details>
<summary>getRepeatingInvoiceAttachmentByFileName</summary>

<div>

Retrieves a specific attachment from a specific repeating invoices by file name.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `repeatingInvoiceID` | <code>string</code> | Yes | Unique identifier for a Repeating Invoice. |
| `fileName` | <code>string</code> | Yes | Name of the attachment. |
| `headers` | <code>GetRepeatingInvoiceAttachmentByFileNameHeaders</code> | Yes | Request headers, including the required `xeroTenantId`, `contentType` (the Xero tenant ID of the organisation). |

**Returns:** `byte[]|error`

**Sample code:**

```ballerina
byte[] result = check accountsClient->getRepeatingInvoiceAttachmentByFileName("297c2dc5-cc47-4afd-8ec8-74990b8761e9", "invoice.pdf", {xeroTenantId: tenantId, contentType: "string"});
```

**Sample response:**

The raw response content as `byte[]`.

</div>
</details>

<details>
<summary>createRepeatingInvoiceAttachmentByFileName</summary>

<div>

Creates an attachment from a specific repeating invoices by file name.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `repeatingInvoiceID` | <code>string</code> | Yes | Unique identifier for a Repeating Invoice. |
| `fileName` | <code>string</code> | Yes | Name of the attachment. |
| `headers` | <code>CreateRepeatingInvoiceAttachmentByFileNameHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>byte[]</code> | Yes | Byte array of file in body of request. |

**Returns:** `Attachments|error`

**Sample code:**

```ballerina
byte[] fileContent = check io:fileReadBytes("invoice.pdf");
accounts:Attachments result = check accountsClient->createRepeatingInvoiceAttachmentByFileName("297c2dc5-cc47-4afd-8ec8-74990b8761e9", "invoice.pdf", {xeroTenantId: tenantId}, fileContent);
```

**Sample response:**

```json
{
  "Attachments": [
    {
      "FileName": "invoice.pdf",
      "ContentLength": 1,
      "IncludeOnline": false
    }
  ]
}
```

</div>
</details>

<details>
<summary>updateRepeatingInvoiceAttachmentByFileName</summary>

<div>

Updates a specific attachment from a specific repeating invoices by file name.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `repeatingInvoiceID` | <code>string</code> | Yes | Unique identifier for a Repeating Invoice. |
| `fileName` | <code>string</code> | Yes | Name of the attachment. |
| `headers` | <code>UpdateRepeatingInvoiceAttachmentByFileNameHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>byte[]</code> | Yes | Byte array of file in body of request. |

**Returns:** `Attachments|error`

**Sample code:**

```ballerina
byte[] fileContent = check io:fileReadBytes("invoice.pdf");
accounts:Attachments result = check accountsClient->updateRepeatingInvoiceAttachmentByFileName("297c2dc5-cc47-4afd-8ec8-74990b8761e9", "invoice.pdf", {xeroTenantId: tenantId}, fileContent);
```

**Sample response:**

```json
{
  "Attachments": [
    {
      "FileName": "invoice.pdf",
      "ContentLength": 1,
      "IncludeOnline": false
    }
  ]
}
```

</div>
</details>

<details>
<summary>getRepeatingInvoiceHistory</summary>

<div>

Retrieves history record for a specific repeating invoice.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `repeatingInvoiceID` | <code>string</code> | Yes | Unique identifier for a Repeating Invoice. |
| `headers` | <code>GetRepeatingInvoiceHistoryHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |

**Returns:** `HistoryRecords|error`

**Sample code:**

```ballerina
accounts:HistoryRecords result = check accountsClient->getRepeatingInvoiceHistory("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "HistoryRecords": [
    {
      "Changes": "string",
      "Details": "string",
      "User": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createRepeatingInvoiceHistory</summary>

<div>

Creates a history record for a specific repeating invoice.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `repeatingInvoiceID` | <code>string</code> | Yes | Unique identifier for a Repeating Invoice. |
| `headers` | <code>CreateRepeatingInvoiceHistoryHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>HistoryRecords</code> | Yes | HistoryRecords containing an array of HistoryRecord objects in body of request. |

**Returns:** `HistoryRecords|error`

**Sample code:**

```ballerina
accounts:HistoryRecords result = check accountsClient->createRepeatingInvoiceHistory("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId}, {
    historyRecords: [{
        changes: "string",
        details: "string",
        user: "string"
    }]
});
```

**Sample response:**

```json
{
  "HistoryRecords": [
    {
      "Changes": "string",
      "Details": "string",
      "User": "string"
    }
  ]
}
```

</div>
</details>

#### Reports

<details>
<summary>getReportTenNinetyNine</summary>

<div>

Retrieve reports for 1099.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>GetReportTenNinetyNineHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |
| `reportYear` | <code>string</code> | No | The year of the 1099 report. |

**Returns:** `Reports|error`

**Sample code:**

```ballerina
accounts:Reports result = check accountsClient->getReportTenNinetyNine({xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "Reports": [
    {
      "ReportName": "Sample name",
      "ReportType": "AgedPayablesByContact",
      "ReportTitle": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getReportAgedPayablesByContact</summary>

<div>

Retrieves report for aged payables by contact.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>GetReportAgedPayablesByContactHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |
| `date` | <code>string</code> | No | The date of the Aged Payables By Contact report. |
| `fromDate` | <code>string</code> | No | Filter by the from date of the report e.g. 2021-02-01. |
| `contactId` | <code>string</code> | Yes | Unique identifier for a Contact. |
| `toDate` | <code>string</code> | No | Filter by the to date of the report e.g. 2021-02-28. |

**Returns:** `ReportWithRows|error`

**Sample code:**

```ballerina
accounts:ReportWithRows result = check accountsClient->getReportAgedPayablesByContact({xeroTenantId: tenantId}, contactId = "297c2dc5-cc47-4afd-8ec8-74990b8761e9");
```

**Sample response:**

```json
{
  "Reports": [
    {
      "ReportID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9",
      "ReportName": "Sample name",
      "ReportTitle": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getReportAgedReceivablesByContact</summary>

<div>

Retrieves report for aged receivables by contact.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>GetReportAgedReceivablesByContactHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |
| `date` | <code>string</code> | No | The date of the Aged Receivables By Contact report. |
| `fromDate` | <code>string</code> | No | Filter by the from date of the report e.g. 2021-02-01. |
| `contactId` | <code>string</code> | Yes | Unique identifier for a Contact. |
| `toDate` | <code>string</code> | No | Filter by the to date of the report e.g. 2021-02-28. |

**Returns:** `ReportWithRows|error`

**Sample code:**

```ballerina
accounts:ReportWithRows result = check accountsClient->getReportAgedReceivablesByContact({xeroTenantId: tenantId}, contactId = "297c2dc5-cc47-4afd-8ec8-74990b8761e9");
```

**Sample response:**

```json
{
  "Reports": [
    {
      "ReportID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9",
      "ReportName": "Sample name",
      "ReportTitle": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getReportBalanceSheet</summary>

<div>

Retrieves report for balancesheet.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>GetReportBalanceSheetHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |
| `date` | <code>string</code> | No | The date of the Balance Sheet report. |
| `timeframe` | <code>"MONTH"&#124;"QUARTER"&#124;"YEAR"</code> | No | The period size to compare to (MONTH, QUARTER, YEAR). |
| `trackingOptionID1` | <code>string</code> | No | The tracking option 1 for the Balance Sheet report. |
| `trackingOptionID2` | <code>string</code> | No | The tracking option 2 for the Balance Sheet report. |
| `paymentsOnly` | <code>boolean</code> | No | Return a cash basis for the Balance Sheet report. |
| `periods` | <code>int</code> | No | The number of periods for the Balance Sheet report. |
| `standardLayout` | <code>boolean</code> | No | The standard layout boolean for the Balance Sheet report. |

**Returns:** `ReportWithRows|error`

**Sample code:**

```ballerina
accounts:ReportWithRows result = check accountsClient->getReportBalanceSheet({xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "Reports": [
    {
      "ReportID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9",
      "ReportName": "Sample name",
      "ReportTitle": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getReportBankSummary</summary>

<div>

Retrieves report for bank summary.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>GetReportBankSummaryHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |
| `fromDate` | <code>string</code> | No | Filter by the from date of the report e.g. 2021-02-01. |
| `toDate` | <code>string</code> | No | Filter by the to date of the report e.g. 2021-02-28. |

**Returns:** `ReportWithRows|error`

**Sample code:**

```ballerina
accounts:ReportWithRows result = check accountsClient->getReportBankSummary({xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "Reports": [
    {
      "ReportID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9",
      "ReportName": "Sample name",
      "ReportTitle": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getReportFromId</summary>

<div>

Retrieves a specific report using a unique ReportID.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `reportID` | <code>string</code> | Yes | Unique identifier for a Report. |
| `headers` | <code>GetReportFromIdHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |

**Returns:** `ReportWithRows|error`

**Sample code:**

```ballerina
accounts:ReportWithRows result = check accountsClient->getReportFromId("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "Reports": [
    {
      "ReportID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9",
      "ReportName": "Sample name",
      "ReportTitle": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getReportBudgetSummary</summary>

<div>

Retrieves report for budget summary.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>GetReportBudgetSummaryHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |
| `date` | <code>string</code> | No | The date for the Bank Summary report e.g. 2018-03-31. |
| `timeframe` | <code>int</code> | No | The period size to compare to (1=month, 3=quarter, 12=year). |
| `periods` | <code>int</code> | No | The number of periods to compare (integer between 1 and 12). |

**Returns:** `ReportWithRows|error`

**Sample code:**

```ballerina
accounts:ReportWithRows result = check accountsClient->getReportBudgetSummary({xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "Reports": [
    {
      "ReportID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9",
      "ReportName": "Sample name",
      "ReportTitle": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getReportExecutiveSummary</summary>

<div>

Retrieves report for executive summary.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>GetReportExecutiveSummaryHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |
| `date` | <code>string</code> | No | The date for the Bank Summary report e.g. 2018-03-31. |

**Returns:** `ReportWithRows|error`

**Sample code:**

```ballerina
accounts:ReportWithRows result = check accountsClient->getReportExecutiveSummary({xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "Reports": [
    {
      "ReportID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9",
      "ReportName": "Sample name",
      "ReportTitle": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getReportsList</summary>

<div>

Retrieves a list of the organistaions unique reports that require a uuid to fetch.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>GetReportsListHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |

**Returns:** `ReportWithRows|error`

**Sample code:**

```ballerina
accounts:ReportWithRows result = check accountsClient->getReportsList({xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "Reports": [
    {
      "ReportID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9",
      "ReportName": "Sample name",
      "ReportTitle": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getReportProfitAndLoss</summary>

<div>

Retrieves report for profit and loss.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>GetReportProfitAndLossHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |
| `fromDate` | <code>string</code> | No | Filter by the from date of the report e.g. 2021-02-01. |
| `timeframe` | <code>"MONTH"&#124;"QUARTER"&#124;"YEAR"</code> | No | The period size to compare to (MONTH, QUARTER, YEAR). |
| `trackingCategoryID` | <code>string</code> | No | The trackingCategory 1 for the ProfitAndLoss report. |
| `trackingOptionID2` | <code>string</code> | No | The tracking option 2 for the ProfitAndLoss report. |
| `paymentsOnly` | <code>boolean</code> | No | Return cash only basis for the ProfitAndLoss report. |
| `trackingCategoryID2` | <code>string</code> | No | The trackingCategory 2 for the ProfitAndLoss report. |
| `toDate` | <code>string</code> | No | Filter by the to date of the report e.g. 2021-02-28. |
| `periods` | <code>int</code> | No | The number of periods to compare (integer between 1 and 12). |
| `trackingOptionID` | <code>string</code> | No | The tracking option 1 for the ProfitAndLoss report. |
| `standardLayout` | <code>boolean</code> | No | Return the standard layout for the ProfitAndLoss report. |

**Returns:** `ReportWithRows|error`

**Sample code:**

```ballerina
accounts:ReportWithRows result = check accountsClient->getReportProfitAndLoss({xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "Reports": [
    {
      "ReportID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9",
      "ReportName": "Sample name",
      "ReportTitle": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getReportTrialBalance</summary>

<div>

Retrieves report for trial balance.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>GetReportTrialBalanceHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |
| `date` | <code>string</code> | No | The date for the Trial Balance report e.g. 2018-03-31. |
| `paymentsOnly` | <code>boolean</code> | No | Return cash only basis for the Trial Balance report. |

**Returns:** `ReportWithRows|error`

**Sample code:**

```ballerina
accounts:ReportWithRows result = check accountsClient->getReportTrialBalance({xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "Reports": [
    {
      "ReportID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9",
      "ReportName": "Sample name",
      "ReportTitle": "string"
    }
  ]
}
```

</div>
</details>

#### Setup

<details>
<summary>postSetup</summary>

<div>

Sets the chart of accounts, the conversion date and conversion balances.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>PostSetupHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>Setup</code> | Yes | Object including an accounts array, a conversion balances array and a conversion date object in body of request. |

**Returns:** `ImportSummaryObject|error`

**Sample code:**

```ballerina
accounts:ImportSummaryObject result = check accountsClient->postSetup({xeroTenantId: tenantId}, {
    ConversionDate: {
        month: 1,
        year: 1
    },
    ConversionBalances: [{
        accountCode: "200",
        balance: 100.00
    }],
    Accounts: [{
        status: "ACTIVE",
        description: "Sample description",
        showInExpenseClaims: false
    }]
});
```

**Sample response:**

```json
{}
```

</div>
</details>

#### Tax Rates

<details>
<summary>getTaxRates</summary>

<div>

Retrieves tax rates.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>GetTaxRatesHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |
| `'where` | <code>string</code> | No | Filter by an any element. |
| `'order` | <code>string</code> | No | Order by an any element. |

**Returns:** `TaxRates|error`

**Sample code:**

```ballerina
accounts:TaxRates result = check accountsClient->getTaxRates({xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "TaxRates": [
    {
      "Status": "ACTIVE",
      "TaxType": "string",
      "CanApplyToExpenses": false
    }
  ]
}
```

</div>
</details>

<details>
<summary>createTaxRates</summary>

<div>

Creates one or more tax rates.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>CreateTaxRatesHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>TaxRates</code> | Yes | TaxRates array with TaxRate object in body of request. |

**Returns:** `TaxRates|error`

**Sample code:**

```ballerina
accounts:TaxRates result = check accountsClient->createTaxRates({xeroTenantId: tenantId}, {
    taxRates: [{
        status: "ACTIVE",
        taxType: "string",
        canApplyToExpenses: false
    }]
});
```

**Sample response:**

```json
{
  "TaxRates": [
    {
      "Status": "ACTIVE",
      "TaxType": "string",
      "CanApplyToExpenses": false
    }
  ]
}
```

</div>
</details>

<details>
<summary>updateTaxRate</summary>

<div>

Updates tax rates.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>UpdateTaxRateHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>TaxRates</code> | Yes | Tax rates with the fields to update. |

**Returns:** `TaxRates|error`

**Sample code:**

```ballerina
accounts:TaxRates result = check accountsClient->updateTaxRate({xeroTenantId: tenantId}, {
    taxRates: [{
        status: "ACTIVE",
        taxType: "string",
        canApplyToExpenses: false
    }]
});
```

**Sample response:**

```json
{
  "TaxRates": [
    {
      "Status": "ACTIVE",
      "TaxType": "string",
      "CanApplyToExpenses": false
    }
  ]
}
```

</div>
</details>

<details>
<summary>getTaxRateByTaxType</summary>

<div>

Retrieves a specific tax rate according to given TaxType code.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `taxType` | <code>string</code> | Yes | A valid TaxType code. |
| `headers` | <code>GetTaxRateByTaxTypeHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |

**Returns:** `TaxRates|error`

**Sample code:**

```ballerina
accounts:TaxRates result = check accountsClient->getTaxRateByTaxType("string", {xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "TaxRates": [
    {
      "Status": "ACTIVE",
      "TaxType": "string",
      "CanApplyToExpenses": false
    }
  ]
}
```

</div>
</details>

#### Tracking Categories

<details>
<summary>getTrackingCategories</summary>

<div>

Retrieves tracking categories and options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>GetTrackingCategoriesHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |
| `includeArchived` | <code>boolean</code> | No | E.g. includeArchived=true - Categories and options with a status of ARCHIVED will be included in the response. |
| `'where` | <code>string</code> | No | Filter by an any element. |
| `'order` | <code>string</code> | No | Order by an any element. |

**Returns:** `TrackingCategories|error`

**Sample code:**

```ballerina
accounts:TrackingCategories result = check accountsClient->getTrackingCategories({xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "TrackingCategories": [
    {
      "Status": "ACTIVE",
      "TrackingCategoryID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9",
      "TrackingOptionID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createTrackingCategory</summary>

<div>

Create tracking categories.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>CreateTrackingCategoryHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>TrackingCategory</code> | Yes | TrackingCategory object in body of request. |

**Returns:** `TrackingCategories|error`

**Sample code:**

```ballerina
accounts:TrackingCategories result = check accountsClient->createTrackingCategory({xeroTenantId: tenantId}, {
    status: "ACTIVE",
    options: [{
        status: "ACTIVE",
        name: "Sample name"
    }],
    option: "string",
    name: "Sample name"
});
```

**Sample response:**

```json
{
  "TrackingCategories": [
    {
      "Status": "ACTIVE",
      "TrackingCategoryID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9",
      "TrackingOptionID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getTrackingCategory</summary>

<div>

Retrieves specific tracking categories and options using a unique tracking category Id.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `trackingCategoryID` | <code>string</code> | Yes | Unique identifier for a TrackingCategory. |
| `headers` | <code>GetTrackingCategoryHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |

**Returns:** `TrackingCategories|error`

**Sample code:**

```ballerina
accounts:TrackingCategories result = check accountsClient->getTrackingCategory("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "TrackingCategories": [
    {
      "Status": "ACTIVE",
      "TrackingCategoryID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9",
      "TrackingOptionID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9"
    }
  ]
}
```

</div>
</details>

<details>
<summary>updateTrackingCategory</summary>

<div>

Updates a specific tracking category.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `trackingCategoryID` | <code>string</code> | Yes | Unique identifier for a TrackingCategory. |
| `headers` | <code>UpdateTrackingCategoryHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>TrackingCategory</code> | Yes | Tracking category with the fields to update. |

**Returns:** `TrackingCategories|error`

**Sample code:**

```ballerina
accounts:TrackingCategories result = check accountsClient->updateTrackingCategory("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId}, {
    status: "ACTIVE",
    options: [{
        status: "ACTIVE",
        name: "Sample name"
    }],
    option: "string",
    name: "Sample name"
});
```

**Sample response:**

```json
{
  "TrackingCategories": [
    {
      "Status": "ACTIVE",
      "TrackingCategoryID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9",
      "TrackingOptionID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9"
    }
  ]
}
```

</div>
</details>

<details>
<summary>deleteTrackingCategory</summary>

<div>

Deletes a specific tracking category.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `trackingCategoryID` | <code>string</code> | Yes | Unique identifier for a TrackingCategory. |
| `headers` | <code>DeleteTrackingCategoryHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |

**Returns:** `TrackingCategories|error`

**Sample code:**

```ballerina
accounts:TrackingCategories result = check accountsClient->deleteTrackingCategory("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "TrackingCategories": [
    {
      "Status": "ACTIVE",
      "TrackingCategoryID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9",
      "TrackingOptionID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createTrackingOptions</summary>

<div>

Creates options for a specific tracking category.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `trackingCategoryID` | <code>string</code> | Yes | Unique identifier for a TrackingCategory. |
| `headers` | <code>CreateTrackingOptionsHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>TrackingOption</code> | Yes | TrackingOption object in body of request. |

**Returns:** `TrackingOptions|error`

**Sample code:**

```ballerina
accounts:TrackingOptions result = check accountsClient->createTrackingOptions("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId}, {
    status: "ACTIVE",
    name: "Sample name"
});
```

**Sample response:**

```json
{
  "Options": [
    {
      "Status": "ACTIVE",
      "TrackingCategoryID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9",
      "TrackingOptionID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9"
    }
  ]
}
```

</div>
</details>

<details>
<summary>updateTrackingOptions</summary>

<div>

Updates a specific option for a specific tracking category.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `trackingCategoryID` | <code>string</code> | Yes | Unique identifier for a TrackingCategory. |
| `trackingOptionID` | <code>string</code> | Yes | Unique identifier for a Tracking Option. |
| `headers` | <code>UpdateTrackingOptionsHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>TrackingOption</code> | Yes | Tracking option with the fields to update. |

**Returns:** `TrackingOptions|error`

**Sample code:**

```ballerina
accounts:TrackingOptions result = check accountsClient->updateTrackingOptions("297c2dc5-cc47-4afd-8ec8-74990b8761e9", "297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId}, {
    status: "ACTIVE",
    name: "Sample name"
});
```

**Sample response:**

```json
{
  "Options": [
    {
      "Status": "ACTIVE",
      "TrackingCategoryID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9",
      "TrackingOptionID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9"
    }
  ]
}
```

</div>
</details>

<details>
<summary>deleteTrackingOptions</summary>

<div>

Deletes a specific option for a specific tracking category.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `trackingCategoryID` | <code>string</code> | Yes | Unique identifier for a TrackingCategory. |
| `trackingOptionID` | <code>string</code> | Yes | Unique identifier for a Tracking Option. |
| `headers` | <code>DeleteTrackingOptionsHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |

**Returns:** `TrackingOptions|error`

**Sample code:**

```ballerina
accounts:TrackingOptions result = check accountsClient->deleteTrackingOptions("297c2dc5-cc47-4afd-8ec8-74990b8761e9", "297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "Options": [
    {
      "Status": "ACTIVE",
      "TrackingCategoryID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9",
      "TrackingOptionID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9"
    }
  ]
}
```

</div>
</details>

#### Users

<details>
<summary>getUsers</summary>

<div>

Retrieves users.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>GetUsersHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `ifModifiedSince`. |
| `'where` | <code>string</code> | No | Filter by an any element. |
| `'order` | <code>string</code> | No | Order by an any element. |

**Returns:** `Users|error`

**Sample code:**

```ballerina
accounts:Users result = check accountsClient->getUsers({xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "Users": [
    {
      "IsSubscriber": false,
      "UpdatedDateUTC": "2026-01-15T00:00:00",
      "UserID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getUser</summary>

<div>

Retrieves a specific user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userID` | <code>string</code> | Yes | Unique identifier for a User. |
| `headers` | <code>GetUserHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |

**Returns:** `Users|error`

**Sample code:**

```ballerina
accounts:Users result = check accountsClient->getUser("297c2dc5-cc47-4afd-8ec8-74990b8761e9", {xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "Users": [
    {
      "IsSubscriber": false,
      "UpdatedDateUTC": "2026-01-15T00:00:00",
      "UserID": "297c2dc5-cc47-4afd-8ec8-74990b8761e9"
    }
  ]
}
```

</div>
</details>
