---
title: Actions
toc_max_heading_level: 4
---

# Actions

The `ballerinax/microsoft.dynamics365.finance.journalentry` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Provides full CRUD access to Microsoft Dynamics 365 Finance journal entry entities — general journal batches, journal batch names, journal lines, project journal transactions, ledger journal lines, and ledger transaction settlements — via the Dynamics 365 Finance and Operations OData API. |

---

## Client

Provides full CRUD access to Microsoft Dynamics 365 Finance journal entry entities via the Dynamics 365 Finance and Operations OData API.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `OAuth2ClientCredentialsGrantConfig` | Required | OAuth2 client credentials grant configuration; provide `tokenUrl`, `clientId`, `clientSecret`, and `scopes` to authenticate with Microsoft Entra ID. |
| `httpVersion` | `http:HttpVersion` | `"2.0"` | HTTP protocol version to use for outbound requests. |
| `http1Settings` | `http:ClientHttp1Settings` | `{}` | HTTP/1.x client settings including keep-alive, chunking, and proxy configuration. |
| `secureSocket` | `http:ClientSecureSocket` | `()` | SSL/TLS configuration for secure connections. |
| `proxy` | `http:ProxyConfig` | `()` | Proxy server configuration. |

### Initializing the client

```ballerina
import ballerinax/microsoft.dynamics365.finance.journalentry;

configurable string tokenUrl = ?;
configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string serviceUrl = ?;

journalentry:Client fo = check new (
    {
        auth: {
            tokenUrl,
            clientId,
            clientSecret
        }
    },
    serviceUrl
);
```

### Operations

#### Journal Lines

<details>
<summary>listJournalLines</summary>

<div>

Reads all general journal lines in the system.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListJournalLinesQueries` | No | OData query parameters: `skip`, `top`, `filter`, `orderby`, `expand`, `crossCompany`, `count`, `` 'select ``. |

Returns: `JournalLinesCollection|error`

Sample code:

```ballerina
journalentry:JournalLinesCollection lines = check fo->listJournalLines(
    queries = {
        filter: "JournalBatchNumber eq 'JB-000123'",
        top: 25,
        orderby: "LineNumber asc"
    }
);
```

</div>

</details>

<details>
<summary>createJournalLines</summary>

<div>

Creates a general journal line.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `JournalLine` | Yes | The journal line fields to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `JournalLine|error`

Sample code:

```ballerina
journalentry:JournalLine created = check fo->createJournalLines({
    dataAreaId: "USMF",
    journalBatchNumber: "JB-000123",
    lineNumber: 1,
    accountType: "Ledger",
    accountDisplayValue: "110110",
    debit: 1500.00,
    credit: 0.00,
    currency: "USD",
    transactionDate: "2026-08-05",
    description: "Office supplies accrual"
});
```

</div>

</details>

<details>
<summary>getJournalLines</summary>

<div>

Retrieves a specific general journal line identified by company, journal batch number, and line number.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `journalBatchNumber` | `string` | Yes | The journal batch number key field. |
| `lineNumber` | `decimal` | Yes | The line number key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetJournalLinesQueries` | No | OData query parameters: `expand`, `` 'select ``. |

Returns: `JournalLine|error`

Sample code:

```ballerina
journalentry:JournalLine line = check fo->getJournalLines(
    "USMF",
    "JB-000123",
    1,
    queries = {
        'select: "AccountDisplayValue,Debit,Credit,TransactionDate"
    }
);
```

</div>

</details>

<details>
<summary>deleteJournalLines</summary>

<div>

Deletes a specific general journal line.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `journalBatchNumber` | `string` | Yes | The journal batch number key field. |
| `lineNumber` | `decimal` | Yes | The line number key field. |
| `headers` | `DeleteJournalLinesHeaders` | No | HTTP headers for this request; set `ifMatch` to send an `If-Match` ETag for optimistic concurrency control. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteJournalLines(
    "USMF",
    "JB-000123",
    1,
    headers = {ifMatch: eTag}
);
```

</div>

</details>

<details>
<summary>updateJournalLines</summary>

<div>

Updates a specific general journal line.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `journalBatchNumber` | `string` | Yes | The journal batch number key field. |
| `lineNumber` | `decimal` | Yes | The line number key field. |
| `payload` | `JournalLine` | Yes | The journal line fields to update. |
| `headers` | `UpdateJournalLinesHeaders` | No | HTTP headers for this request; set `ifMatch` to send an `If-Match` ETag for optimistic concurrency control. |

Returns: `JournalLine|error`

Sample code:

```ballerina
journalentry:JournalLine updated = check fo->updateJournalLines(
    "USMF",
    "JB-000123",
    1,
    {debit: 1750.00, description: "Office supplies accrual - revised"},
    headers = {ifMatch: eTag}
);
```

</div>

</details>

#### Journal Names

<details>
<summary>listJournalNames</summary>

<div>

Reads all journal names (journal batch templates) in the system.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListJournalNamesQueries` | No | OData query parameters: `skip`, `top`, `filter`, `orderby`, `expand`, `crossCompany`, `count`, `` 'select ``. |

Returns: `JournalNamesCollection|error`

Sample code:

```ballerina
journalentry:JournalNamesCollection names = check fo->listJournalNames(
    queries = {
        filter: "Type eq 'Daily'",
        crossCompany: true
    }
);
```

</div>

</details>

<details>
<summary>createJournalNames</summary>

<div>

Creates a journal name.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `JournalName` | Yes | The journal name fields to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `JournalName|error`

Sample code:

```ballerina
journalentry:JournalName created = check fo->createJournalNames({
    dataAreaId: "USMF",
    name: "GenJrn",
    description: "General journal",
    'type: "Daily",
    currency: "USD",
    postingLayer: "Current",
    voucherSeriesCode: "GenJrn"
});
```

</div>

</details>

<details>
<summary>getJournalNames</summary>

<div>

Retrieves a specific journal name identified by company and name.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `name` | `string` | Yes | The name key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetJournalNamesQueries` | No | OData query parameters: `expand`, `` 'select ``. |

Returns: `JournalName|error`

Sample code:

```ballerina
journalentry:JournalName name = check fo->getJournalNames(
    "USMF",
    "GenJrn"
);
```

</div>

</details>

<details>
<summary>deleteJournalNames</summary>

<div>

Deletes a specific journal name.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `name` | `string` | Yes | The name key field. |
| `headers` | `DeleteJournalNamesHeaders` | No | HTTP headers for this request; set `ifMatch` to send an `If-Match` ETag for optimistic concurrency control. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteJournalNames(
    "USMF",
    "GenJrn",
    headers = {ifMatch: eTag}
);
```

</div>

</details>

<details>
<summary>updateJournalNames</summary>

<div>

Updates a specific journal name.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `name` | `string` | Yes | The name key field. |
| `payload` | `JournalName` | Yes | The journal name fields to update. |
| `headers` | `UpdateJournalNamesHeaders` | No | HTTP headers for this request; set `ifMatch` to send an `If-Match` ETag for optimistic concurrency control. |

Returns: `JournalName|error`

Sample code:

```ballerina
journalentry:JournalName updated = check fo->updateJournalNames(
    "USMF",
    "GenJrn",
    {description: "General journal - accruals and reclasses"},
    headers = {ifMatch: eTag}
);
```

</div>

</details>

#### Journal Tables

<details>
<summary>listJournalTables</summary>

<div>

Reads all general journal batch headers in the system.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListJournalTablesQueries` | No | OData query parameters: `skip`, `top`, `filter`, `orderby`, `expand`, `crossCompany`, `count`, `` 'select ``. |

Returns: `JournalTablesCollection|error`

Sample code:

```ballerina
journalentry:JournalTablesCollection batches = check fo->listJournalTables(
    queries = {
        filter: "JournalName eq 'GenJrn' and Posted eq 'No'",
        top: 50
    }
);
```

</div>

</details>

<details>
<summary>createJournalTables</summary>

<div>

Creates a general journal batch header.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `JournalTable` | Yes | The journal batch fields to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `JournalTable|error`

Sample code:

```ballerina
journalentry:JournalTable created = check fo->createJournalTables({
    dataAreaId: "USMF",
    journalName: "GenJrn",
    description: "August general ledger accrual batch",
    txt: "Month-end accrual",
    detailSummary: "Detail"
});
```

</div>

</details>

<details>
<summary>getJournalTables</summary>

<div>

Retrieves a specific general journal batch header identified by company and journal batch number.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `journalBatchNumber` | `string` | Yes | The journal batch number key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetJournalTablesQueries` | No | OData query parameters: `expand`, `` 'select ``. |

Returns: `JournalTable|error`

Sample code:

```ballerina
journalentry:JournalTable batch = check fo->getJournalTables(
    "USMF",
    "JB-000123",
    queries = {
        expand: "JournalLines"
    }
);
```

</div>

</details>

<details>
<summary>deleteJournalTables</summary>

<div>

Deletes a specific general journal batch header.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `journalBatchNumber` | `string` | Yes | The journal batch number key field. |
| `headers` | `DeleteJournalTablesHeaders` | No | HTTP headers for this request; set `ifMatch` to send an `If-Match` ETag for optimistic concurrency control. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteJournalTables(
    "USMF",
    "JB-000123",
    headers = {ifMatch: eTag}
);
```

</div>

</details>

<details>
<summary>updateJournalTables</summary>

<div>

Updates a specific general journal batch header.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `journalBatchNumber` | `string` | Yes | The journal batch number key field. |
| `payload` | `JournalTable` | Yes | The journal batch fields to update. |
| `headers` | `UpdateJournalTablesHeaders` | No | HTTP headers for this request; set `ifMatch` to send an `If-Match` ETag for optimistic concurrency control. |

Returns: `JournalTable|error`

Sample code:

```ballerina
journalentry:JournalTable updated = check fo->updateJournalTables(
    "USMF",
    "JB-000123",
    {txt: "Month-end accrual - reviewed"},
    headers = {ifMatch: eTag}
);
```

</div>

</details>

#### Journal Trans

<details>
<summary>listJournalTrans</summary>

<div>

Reads all project and subledger journal transaction lines in the system.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListJournalTransQueries` | No | OData query parameters: `skip`, `top`, `filter`, `orderby`, `expand`, `crossCompany`, `count`, `` 'select ``. |

Returns: `JournalTransCollection|error`

Sample code:

```ballerina
journalentry:JournalTransCollection trans = check fo->listJournalTrans(
    queries = {
        filter: "ProjectID eq 'PRJ-1001'",
        orderby: "LineNumber asc"
    }
);
```

</div>

</details>

<details>
<summary>createJournalTrans</summary>

<div>

Creates a project or subledger journal transaction line.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `JournalTrans` | Yes | The journal transaction fields to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `JournalTrans|error`

Sample code:

```ballerina
journalentry:JournalTrans created = check fo->createJournalTrans({
    dataAreaId: "USMF",
    journalId: "PJ-000045",
    lineNumber: 1,
    projectID: "PRJ-1001",
    category: "Consulting",
    hours: 8,
    costPrice: 45.00,
    salesPrice: 90.00,
    currencyId: "USD",
    description: "Consulting hours - week 32"
});
```

</div>

</details>

<details>
<summary>getJournalTrans</summary>

<div>

Retrieves a specific journal transaction line identified by company, line number, and journal ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `lineNumber` | `decimal` | Yes | The line number key field. |
| `journalId` | `string` | Yes | The journal id key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetJournalTransQueries` | No | OData query parameters: `expand`, `` 'select ``. |

Returns: `JournalTrans|error`

Sample code:

```ballerina
journalentry:JournalTrans line = check fo->getJournalTrans(
    "USMF",
    1,
    "PJ-000045"
);
```

</div>

</details>

<details>
<summary>deleteJournalTrans</summary>

<div>

Deletes a specific journal transaction line.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `lineNumber` | `decimal` | Yes | The line number key field. |
| `journalId` | `string` | Yes | The journal id key field. |
| `headers` | `DeleteJournalTransHeaders` | No | HTTP headers for this request; set `ifMatch` to send an `If-Match` ETag for optimistic concurrency control. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteJournalTrans(
    "USMF",
    1,
    "PJ-000045",
    headers = {ifMatch: eTag}
);
```

</div>

</details>

<details>
<summary>updateJournalTrans</summary>

<div>

Updates a specific journal transaction line.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `lineNumber` | `decimal` | Yes | The line number key field. |
| `journalId` | `string` | Yes | The journal id key field. |
| `payload` | `JournalTrans` | Yes | The journal transaction fields to update. |
| `headers` | `UpdateJournalTransHeaders` | No | HTTP headers for this request; set `ifMatch` to send an `If-Match` ETag for optimistic concurrency control. |

Returns: `JournalTrans|error`

Sample code:

```ballerina
journalentry:JournalTrans updated = check fo->updateJournalTrans(
    "USMF",
    1,
    "PJ-000045",
    {hours: 7.5, salesPrice: 87.50},
    headers = {ifMatch: eTag}
);
```

</div>

</details>

#### Ledger Journal Lines

<details>
<summary>listLedgerJournalLines</summary>

<div>

Reads all ledger journal voucher lines in the system.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListLedgerJournalLinesQueries` | No | OData query parameters: `skip`, `top`, `filter`, `orderby`, `expand`, `crossCompany`, `count`, `` 'select ``. |

Returns: `LedgerJournalLinesCollection|error`

Sample code:

```ballerina
journalentry:LedgerJournalLinesCollection lines = check fo->listLedgerJournalLines(
    queries = {
        filter: "JournalBatchNumber eq 'LJ-000456'",
        orderby: "LineNumber asc"
    }
);
```

</div>

</details>

<details>
<summary>createLedgerJournalLines</summary>

<div>

Creates a ledger journal voucher line.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `LedgerJournalLine` | Yes | The ledger journal line fields to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `LedgerJournalLine|error`

Sample code:

```ballerina
journalentry:LedgerJournalLine created = check fo->createLedgerJournalLines({
    dataAreaId: "USMF",
    journalBatchNumber: "LJ-000456",
    lineNumber: 1,
    accountType: "Ledger",
    accountNum: "110110",
    currencyCode: "USD",
    debitAmount: 2500.00,
    creditAmount: 0.00,
    text: "Utilities accrual",
    transDate: "2026-08-05"
});
```

</div>

</details>

<details>
<summary>getLedgerJournalLines</summary>

<div>

Retrieves a specific ledger journal voucher line identified by company, journal batch number, and line number.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `journalBatchNumber` | `string` | Yes | The journal batch number key field. |
| `lineNumber` | `decimal` | Yes | The line number key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetLedgerJournalLinesQueries` | No | OData query parameters: `expand`, `` 'select ``. |

Returns: `LedgerJournalLine|error`

Sample code:

```ballerina
journalentry:LedgerJournalLine line = check fo->getLedgerJournalLines(
    "USMF",
    "LJ-000456",
    1
);
```

</div>

</details>

<details>
<summary>deleteLedgerJournalLines</summary>

<div>

Deletes a specific ledger journal voucher line.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `journalBatchNumber` | `string` | Yes | The journal batch number key field. |
| `lineNumber` | `decimal` | Yes | The line number key field. |
| `headers` | `DeleteLedgerJournalLinesHeaders` | No | HTTP headers for this request; set `ifMatch` to send an `If-Match` ETag for optimistic concurrency control. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteLedgerJournalLines(
    "USMF",
    "LJ-000456",
    1,
    headers = {ifMatch: eTag}
);
```

</div>

</details>

<details>
<summary>updateLedgerJournalLines</summary>

<div>

Updates a specific ledger journal voucher line.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `journalBatchNumber` | `string` | Yes | The journal batch number key field. |
| `lineNumber` | `decimal` | Yes | The line number key field. |
| `payload` | `LedgerJournalLine` | Yes | The ledger journal line fields to update. |
| `headers` | `UpdateLedgerJournalLinesHeaders` | No | HTTP headers for this request; set `ifMatch` to send an `If-Match` ETag for optimistic concurrency control. |

Returns: `LedgerJournalLine|error`

Sample code:

```ballerina
journalentry:LedgerJournalLine updated = check fo->updateLedgerJournalLines(
    "USMF",
    "LJ-000456",
    1,
    {debitAmount: 2650.00, text: "Utilities accrual - revised"},
    headers = {ifMatch: eTag}
);
```

</div>

</details>

#### Ledger Trans Settlements

<details>
<summary>listLedgerTransSettlements</summary>

<div>

Reads all ledger transaction settlement records in the system.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListLedgerTransSettlementsQueries` | No | OData query parameters: `skip`, `top`, `filter`, `orderby`, `expand`, `crossCompany`, `count`, `` 'select ``. |

Returns: `LedgerTransSettlementsCollection|error`

Sample code:

```ballerina
journalentry:LedgerTransSettlementsCollection settlements = check fo->listLedgerTransSettlements(
    queries = {
        filter: "DocumentNumber eq 'INV-90441'"
    }
);
```

</div>

</details>

<details>
<summary>createLedgerTransSettlements</summary>

<div>

Creates a ledger transaction settlement record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `LedgerTransSettlement` | Yes | The ledger transaction settlement fields to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `LedgerTransSettlement|error`

Sample code:

```ballerina
journalentry:LedgerTransSettlement created = check fo->createLedgerTransSettlements({
    ledger: 5637144576,
    mainAccount: 5637177840,
    transactionCurrencyAmount: 1000.00,
    transactionCurrencyCode: "USD",
    accountingDate: "2026-08-05",
    documentNumber: "INV-90441",
    postingType: "CustPayment",
    text: "Customer payment settlement"
});
```

</div>

</details>

<details>
<summary>getLedgerTransSettlements</summary>

<div>

Retrieves a specific ledger transaction settlement record identified by its general journal account entry.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `generalJournalAccountEntry` | `int` | Yes | The general journal account entry key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetLedgerTransSettlementsQueries` | No | OData query parameters: `expand`, `` 'select ``. |

Returns: `LedgerTransSettlement|error`

Sample code:

```ballerina
journalentry:LedgerTransSettlement settlement = check fo->getLedgerTransSettlements(5637289421);
```

</div>

</details>

<details>
<summary>deleteLedgerTransSettlements</summary>

<div>

Deletes a specific ledger transaction settlement record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `generalJournalAccountEntry` | `int` | Yes | The general journal account entry key field. |
| `headers` | `DeleteLedgerTransSettlementsHeaders` | No | HTTP headers for this request; set `ifMatch` to send an `If-Match` ETag for optimistic concurrency control. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteLedgerTransSettlements(
    5637289421,
    headers = {ifMatch: eTag}
);
```

</div>

</details>

<details>
<summary>updateLedgerTransSettlements</summary>

<div>

Updates a specific ledger transaction settlement record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `generalJournalAccountEntry` | `int` | Yes | The general journal account entry key field. |
| `payload` | `LedgerTransSettlement` | Yes | The ledger transaction settlement fields to update. |
| `headers` | `UpdateLedgerTransSettlementsHeaders` | No | HTTP headers for this request; set `ifMatch` to send an `If-Match` ETag for optimistic concurrency control. |

Returns: `LedgerTransSettlement|error`

Sample code:

```ballerina
journalentry:LedgerTransSettlement updated = check fo->updateLedgerTransSettlements(
    5637289421,
    {text: "Customer payment settlement - confirmed"},
    headers = {ifMatch: eTag}
);
```

</div>

</details>

#### Ledger Trans Settlements V2

<details>
<summary>listLedgerTransSettlementsV2</summary>

<div>

Reads all ledger transaction settlement records (V2) in the system, including settlement status and open-amount fields.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListLedgerTransSettlementsV2Queries` | No | OData query parameters: `skip`, `top`, `filter`, `orderby`, `expand`, `crossCompany`, `count`, `` 'select ``. |

Returns: `LedgerTransSettlementsV2Collection|error`

Sample code:

```ballerina
journalentry:LedgerTransSettlementsV2Collection settlements = check fo->listLedgerTransSettlementsV2(
    queries = {
        filter: "SettleStatus eq 'Unsettled'"
    }
);
```

</div>

</details>

<details>
<summary>createLedgerTransSettlementsV2</summary>

<div>

Creates a ledger transaction settlement record (V2).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `LedgerTransSettlementV2` | Yes | The ledger transaction settlement fields to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `LedgerTransSettlementV2|error`

Sample code:

```ballerina
journalentry:LedgerTransSettlementV2 created = check fo->createLedgerTransSettlementsV2({
    ledger: 5637144576,
    mainAccount: 5637177840,
    transactionCurrencyAmount: 750.00,
    transactionCurrencyCode: "USD",
    accountingDate: "2026-08-05",
    documentNumber: "INV-90512",
    postingType: "VendPayment",
    settleStatus: "Unsettled",
    text: "Vendor payment pending settlement"
});
```

</div>

</details>

<details>
<summary>getLedgerTransSettlementsV2</summary>

<div>

Retrieves a specific ledger transaction settlement record (V2) identified by its general journal account entry.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `generalJournalAccountEntry` | `int` | Yes | The general journal account entry key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetLedgerTransSettlementsV2Queries` | No | OData query parameters: `expand`, `` 'select ``. |

Returns: `LedgerTransSettlementV2|error`

Sample code:

```ballerina
journalentry:LedgerTransSettlementV2 settlement = check fo->getLedgerTransSettlementsV2(5637291178);
```

</div>

</details>

<details>
<summary>deleteLedgerTransSettlementsV2</summary>

<div>

Deletes a specific ledger transaction settlement record (V2).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `generalJournalAccountEntry` | `int` | Yes | The general journal account entry key field. |
| `headers` | `DeleteLedgerTransSettlementsV2Headers` | No | HTTP headers for this request; set `ifMatch` to send an `If-Match` ETag for optimistic concurrency control. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteLedgerTransSettlementsV2(
    5637291178,
    headers = {ifMatch: eTag}
);
```

</div>

</details>

<details>
<summary>updateLedgerTransSettlementsV2</summary>

<div>

Updates a specific ledger transaction settlement record (V2).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `generalJournalAccountEntry` | `int` | Yes | The general journal account entry key field. |
| `payload` | `LedgerTransSettlementV2` | Yes | The ledger transaction settlement fields to update. |
| `headers` | `UpdateLedgerTransSettlementsV2Headers` | No | HTTP headers for this request; set `ifMatch` to send an `If-Match` ETag for optimistic concurrency control. |

Returns: `LedgerTransSettlementV2|error`

Sample code:

```ballerina
journalentry:LedgerTransSettlementV2 updated = check fo->updateLedgerTransSettlementsV2(
    5637291178,
    {settleStatus: "Settled", settleDate: "2026-08-05"},
    headers = {ifMatch: eTag}
);
```

</div>

</details>
