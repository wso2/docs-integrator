---
title: Actions
toc_max_heading_level: 4
---

# Actions

The `ballerinax/microsoft.dynamics365.finance.ledger` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Provides full CRUD access to Microsoft Dynamics 365 Finance Ledger entities via the OData REST API. |

---

## Client

Provides full CRUD access to Microsoft Dynamics 365 Finance Ledger entities via the OData REST API.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `OAuth2ClientCredentialsGrantConfig` | Required | OAuth2 client credentials grant configuration used to authenticate with Microsoft Entra ID (`tokenUrl`, `clientId`, `clientSecret`, `scopes`). |
| `httpVersion` | `http:HttpVersion` | `http:HTTP_2_0` | The HTTP version understood by the client. |
| `http1Settings` | `http:ClientHttp1Settings` | `{}` | Configurations related to the HTTP/1.x protocol. |
| `secureSocket` | `http:ClientSecureSocket` | `()` | SSL/TLS-related options. |
| `proxy` | `http:ProxyConfig` | `()` | Proxy server related options. |

### Initializing the client

```ballerina
import ballerinax/microsoft.dynamics365.finance.ledger;

configurable string tokenUrl = ?;
configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string serviceUrl = ?;

ledger:Client fo = check new (
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

#### Accountants

<details>
<summary>listAccountants</summary>

Lists ledger accountant registration records.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListAccountantsQueries` | No | OData query parameters: `skip`, `top`, `filter`, `orderby`, `expand`, `crossCompany` (`cross-company`), `count`, `'select`. |

Returns: `AccountantsCollection|error`

Sample code:

```ballerina
ledger:AccountantsCollection result = check fo->listAccountants(
    queries = {
        filter: "AccountantName eq 'Maria Souza'",
        top: 10
    }
);
```

</details>

<details>
<summary>createAccountants</summary>

Creates a ledger accountant registration record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `Accountant` | Yes | The accountant record to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `Accountant|error`

Sample code:

```ballerina
ledger:Accountant created = check fo->createAccountants({
    accountantName: "Maria Souza",
    cPF: "12345678900",
    cRC: "1SP123456",
    cNPJ: "12345678000199",
    addressStreet: "Av. Paulista",
    addressCityName: "Sao Paulo",
    addressState: "SP",
    addressZipCode: "01311-000"
});
```

</details>

<details>
<summary>getAccountants</summary>

Retrieves a specific ledger accountant registration record by its CPF and CRC key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `cPF` | `string` | Yes | The accountant's CPF (Brazilian individual taxpayer registry number). |
| `cRC` | `string` | Yes | The accountant's CRC (regional accounting council registration number). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetAccountantsQueries` | No | OData query parameters: `expand`, `'select`. |

Returns: `Accountant|error`

Sample code:

```ballerina
ledger:Accountant accountant = check fo->getAccountants("12345678900", "1SP123456");
```

</details>

<details>
<summary>deleteAccountants</summary>

Deletes a specific ledger accountant registration record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `cPF` | `string` | Yes | The accountant's CPF. |
| `cRC` | `string` | Yes | The accountant's CRC. |
| `headers` | `DeleteAccountantsHeaders` | No | Request headers, including an optional `ifMatch` ETag for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteAccountants("12345678900", "1SP123456", {ifMatch: eTag});
```

</details>

<details>
<summary>updateAccountants</summary>

Updates a specific ledger accountant registration record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `cPF` | `string` | Yes | The accountant's CPF. |
| `cRC` | `string` | Yes | The accountant's CRC. |
| `payload` | `Accountant` | Yes | The fields to update. |
| `headers` | `UpdateAccountantsHeaders` | No | Request headers, including an optional `ifMatch` ETag for optimistic concurrency. |

Returns: `Accountant|error`

Sample code:

```ballerina
ledger:Accountant updated = check fo->updateAccountants(
    "12345678900",
    "1SP123456",
    {addressCityName: "Rio de Janeiro", addressState: "RJ"},
    {ifMatch: eTag}
);
```

</details>

#### Accrual schemes

<details>
<summary>listAccrualSchemes</summary>

Lists accrual schemes used to spread revenue and expense recognition across periods.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListAccrualSchemesQueries` | No | OData query parameters: `skip`, `top`, `filter`, `orderby`, `expand`, `crossCompany` (`cross-company`), `count`, `'select`. |

Returns: `AccrualSchemesCollection|error`

Sample code:

```ballerina
ledger:AccrualSchemesCollection result = check fo->listAccrualSchemes(
    queries = {
        filter: "dataAreaId eq 'USMF'"
    }
);
```

</details>

<details>
<summary>createAccrualSchemes</summary>

Creates an accrual scheme.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `AccrualScheme` | Yes | The accrual scheme record to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `AccrualScheme|error`

Sample code:

```ballerina
ledger:AccrualScheme created = check fo->createAccrualSchemes({
    dataAreaId: "USMF",
    accrualIdentification: "RENT-ACCR",
    accrualSchemeDescription: "Monthly rent accrual",
    accrualBasis: "Calendar",
    calendarPeriodFrequency: "Monthly",
    numberOfOccurrencesPerPeriod: 1,
    postTransactions: "Month",
    voucher: "Single",
    debitLedgerDimensionDisplayValue: "601100-USMF-001",
    creditLedgerDimensionDisplayValue: "220100-USMF-001"
});
```

</details>

<details>
<summary>getAccrualSchemes</summary>

Retrieves a specific accrual scheme by company and accrual identification.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier (e.g., `"USMF"`). |
| `accrualIdentification` | `string` | Yes | The accrual scheme's identification code. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetAccrualSchemesQueries` | No | OData query parameters: `expand`, `'select`. |

Returns: `AccrualScheme|error`

Sample code:

```ballerina
ledger:AccrualScheme scheme = check fo->getAccrualSchemes("USMF", "RENT-ACCR");
```

</details>

<details>
<summary>deleteAccrualSchemes</summary>

Deletes a specific accrual scheme.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `accrualIdentification` | `string` | Yes | The accrual scheme's identification code. |
| `headers` | `DeleteAccrualSchemesHeaders` | No | Request headers, including an optional `ifMatch` ETag for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteAccrualSchemes("USMF", "RENT-ACCR", {ifMatch: eTag});
```

</details>

<details>
<summary>updateAccrualSchemes</summary>

Updates a specific accrual scheme.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `accrualIdentification` | `string` | Yes | The accrual scheme's identification code. |
| `payload` | `AccrualScheme` | Yes | The fields to update. |
| `headers` | `UpdateAccrualSchemesHeaders` | No | Request headers, including an optional `ifMatch` ETag for optimistic concurrency. |

Returns: `AccrualScheme|error`

Sample code:

```ballerina
ledger:AccrualScheme updated = check fo->updateAccrualSchemes(
    "USMF",
    "RENT-ACCR",
    {numberOfOccurrencesPerPeriod: 2},
    {ifMatch: eTag}
);
```

</details>

#### Audit trails

<details>
<summary>listAuditTrails</summary>

Lists audit trail records that track ledger transactions for compliance and traceability.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListAuditTrailsQueries` | No | OData query parameters: `skip`, `top`, `filter`, `orderby`, `expand`, `crossCompany` (`cross-company`), `count`, `'select`. |

Returns: `AuditTrailsCollection|error`

Sample code:

```ballerina
ledger:AuditTrailsCollection result = check fo->listAuditTrails(
    queries = {
        filter: "dataAreaId eq 'USMF' and TransactionType eq 'LedgerJournal'",
        orderby: "CreatedTransactionDateTime desc"
    }
);
```

</details>

<details>
<summary>createAuditTrails</summary>

Creates an audit trail record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `AuditTrail` | Yes | The audit trail record to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `AuditTrail|error`

Sample code:

```ballerina
ledger:AuditTrail created = check fo->createAuditTrails({
    dataAreaId: "USMF",
    transactionId: 100234,
    transactionType: "LedgerJournal",
    description: "Manual correction of freight accrual",
    createdByUser: "admin",
    createdTransactionDateTime: "2026-01-15T10:30:00Z"
});
```

</details>

<details>
<summary>getAuditTrails</summary>

Retrieves a specific audit trail record by company and transaction ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `transactionId` | `int` | Yes | The transaction ID of the audit trail entry. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetAuditTrailsQueries` | No | OData query parameters: `expand`, `'select`. |

Returns: `AuditTrail|error`

Sample code:

```ballerina
ledger:AuditTrail trail = check fo->getAuditTrails("USMF", 100234);
```

</details>

<details>
<summary>deleteAuditTrails</summary>

Deletes a specific audit trail record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `transactionId` | `int` | Yes | The transaction ID of the audit trail entry. |
| `headers` | `DeleteAuditTrailsHeaders` | No | Request headers, including an optional `ifMatch` ETag for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteAuditTrails("USMF", 100234, {ifMatch: eTag});
```

</details>

<details>
<summary>updateAuditTrails</summary>

Updates a specific audit trail record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `transactionId` | `int` | Yes | The transaction ID of the audit trail entry. |
| `payload` | `AuditTrail` | Yes | The fields to update. |
| `headers` | `UpdateAuditTrailsHeaders` | No | Request headers, including an optional `ifMatch` ETag for optimistic concurrency. |

Returns: `AuditTrail|error`

Sample code:

```ballerina
ledger:AuditTrail updated = check fo->updateAuditTrails(
    "USMF",
    100234,
    {description: "Reviewed and confirmed by controller"},
    {ifMatch: eTag}
);
```

</details>

#### Ledger intervals

<details>
<summary>listLedgerIntervals</summary>

Lists ledger account number intervals used for security and reporting scoping.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListLedgerIntervalsQueries` | No | OData query parameters: `skip`, `top`, `filter`, `orderby`, `expand`, `crossCompany` (`cross-company`), `count`, `'select`. |

Returns: `LedgerIntervalsCollection|error`

Sample code:

```ballerina
ledger:LedgerIntervalsCollection result = check fo->listLedgerIntervals(
    queries = {
        filter: "dataAreaId eq 'USMF'"
    }
);
```

</details>

<details>
<summary>createLedgerIntervals</summary>

Creates a ledger account number interval.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `LedgerInterval` | Yes | The ledger interval record to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `LedgerInterval|error`

Sample code:

```ballerina
ledger:LedgerInterval created = check fo->createLedgerIntervals({
    dataAreaId: "USMF",
    intervalGroup: "CASHACCTS",
    fromAccount: "110100",
    toAccount: "110199",
    fromLedgerChartOfAccounts: "USMF-COA",
    toLedgerChartOfAccounts: "USMF-COA"
});
```

</details>

<details>
<summary>getLedgerIntervals</summary>

Retrieves a specific ledger interval by its composite key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `intervalGroup` | `string` | Yes | The interval group identifier. |
| `fromAccount` | `string` | Yes | The starting main account number of the interval. |
| `toAccount` | `string` | Yes | The ending main account number of the interval. |
| `fromLedgerChartOfAccounts` | `string` | Yes | The chart of accounts of the starting account. |
| `toLedgerChartOfAccounts` | `string` | Yes | The chart of accounts of the ending account. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetLedgerIntervalsQueries` | No | OData query parameters: `expand`, `'select`. |

Returns: `LedgerInterval|error`

Sample code:

```ballerina
ledger:LedgerInterval interval = check fo->getLedgerIntervals(
    "USMF", "CASHACCTS", "110100", "110199", "USMF-COA", "USMF-COA"
);
```

</details>

<details>
<summary>deleteLedgerIntervals</summary>

Deletes a specific ledger interval.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `intervalGroup` | `string` | Yes | The interval group identifier. |
| `fromAccount` | `string` | Yes | The starting main account number of the interval. |
| `toAccount` | `string` | Yes | The ending main account number of the interval. |
| `fromLedgerChartOfAccounts` | `string` | Yes | The chart of accounts of the starting account. |
| `toLedgerChartOfAccounts` | `string` | Yes | The chart of accounts of the ending account. |
| `headers` | `DeleteLedgerIntervalsHeaders` | No | Request headers, including an optional `ifMatch` ETag for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteLedgerIntervals(
    "USMF", "CASHACCTS", "110100", "110199", "USMF-COA", "USMF-COA",
    {ifMatch: eTag}
);
```

</details>

<details>
<summary>updateLedgerIntervals</summary>

Updates a specific ledger interval.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `intervalGroup` | `string` | Yes | The interval group identifier. |
| `fromAccount` | `string` | Yes | The starting main account number of the interval. |
| `toAccount` | `string` | Yes | The ending main account number of the interval. |
| `fromLedgerChartOfAccounts` | `string` | Yes | The chart of accounts of the starting account. |
| `toLedgerChartOfAccounts` | `string` | Yes | The chart of accounts of the ending account. |
| `payload` | `LedgerInterval` | Yes | The fields to update. |
| `headers` | `UpdateLedgerIntervalsHeaders` | No | Request headers, including an optional `ifMatch` ETag for optimistic concurrency. |

Returns: `LedgerInterval|error`

Sample code:

```ballerina
ledger:LedgerInterval updated = check fo->updateLedgerIntervals(
    "USMF", "CASHACCTS", "110100", "110199", "USMF-COA", "USMF-COA",
    {toAccount: "110210"},
    {ifMatch: eTag}
);
```

</details>

#### Ledger journal descriptions

<details>
<summary>listLedgerJournalDescriptions</summary>

Lists ledger journal names used to categorize journals.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListLedgerJournalDescriptionsQueries` | No | OData query parameters: `skip`, `top`, `filter`, `orderby`, `expand`, `crossCompany` (`cross-company`), `count`, `'select`. |

Returns: `LedgerJournalDescriptionsCollection|error`

Sample code:

```ballerina
ledger:LedgerJournalDescriptionsCollection result = check fo->listLedgerJournalDescriptions(
    queries = {
        filter: "dataAreaId eq 'USMF'"
    }
);
```

</details>

<details>
<summary>createLedgerJournalDescriptions</summary>

Creates a ledger journal name.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `LedgerJournalDescription` | Yes | The journal name record to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `LedgerJournalDescription|error`

Sample code:

```ballerina
ledger:LedgerJournalDescription created = check fo->createLedgerJournalDescriptions({
    dataAreaId: "USMF",
    identification: "GENJRN",
    description: "General journal",
    searchName: "General journal"
});
```

</details>

<details>
<summary>getLedgerJournalDescriptions</summary>

Retrieves a specific ledger journal name by company and identification.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `identification` | `string` | Yes | The journal name's identification code. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetLedgerJournalDescriptionsQueries` | No | OData query parameters: `expand`, `'select`. |

Returns: `LedgerJournalDescription|error`

Sample code:

```ballerina
ledger:LedgerJournalDescription journalName = check fo->getLedgerJournalDescriptions("USMF", "GENJRN");
```

</details>

<details>
<summary>deleteLedgerJournalDescriptions</summary>

Deletes a specific ledger journal name.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `identification` | `string` | Yes | The journal name's identification code. |
| `headers` | `DeleteLedgerJournalDescriptionsHeaders` | No | Request headers, including an optional `ifMatch` ETag for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteLedgerJournalDescriptions("USMF", "GENJRN", {ifMatch: eTag});
```

</details>

<details>
<summary>updateLedgerJournalDescriptions</summary>

Updates a specific ledger journal name.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `identification` | `string` | Yes | The journal name's identification code. |
| `payload` | `LedgerJournalDescription` | Yes | The fields to update. |
| `headers` | `UpdateLedgerJournalDescriptionsHeaders` | No | Request headers, including an optional `ifMatch` ETag for optimistic concurrency. |

Returns: `LedgerJournalDescription|error`

Sample code:

```ballerina
ledger:LedgerJournalDescription updated = check fo->updateLedgerJournalDescriptions(
    "USMF",
    "GENJRN",
    {description: "General journal - all departments"},
    {ifMatch: eTag}
);
```

</details>

#### Ledger journal headers

<details>
<summary>listLedgerJournalHeaders</summary>

Lists ledger journal headers, including their totals and posting status.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListLedgerJournalHeadersQueries` | No | OData query parameters: `skip`, `top`, `filter`, `orderby`, `expand`, `crossCompany` (`cross-company`), `count`, `'select`. |

Returns: `LedgerJournalHeadersCollection|error`

Sample code:

```ballerina
ledger:LedgerJournalHeadersCollection result = check fo->listLedgerJournalHeaders(
    queries = {
        filter: "dataAreaId eq 'USMF' and IsPosted eq 'No'"
    }
);
```

</details>

<details>
<summary>createLedgerJournalHeaders</summary>

Creates a ledger journal header.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `LedgerJournalHeader` | Yes | The journal header record to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `LedgerJournalHeader|error`

Sample code:

```ballerina
ledger:LedgerJournalHeader created = check fo->createLedgerJournalHeaders({
    dataAreaId: "USMF",
    journalName: "GenJrn",
    description: "July accrual adjustments",
    accountingCurrency: "USD",
    postingLayer: "Current"
});
```

</details>

<details>
<summary>getLedgerJournalHeaders</summary>

Retrieves a specific ledger journal header by company and journal batch number.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `journalBatchNumber` | `string` | Yes | The journal batch number. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetLedgerJournalHeadersQueries` | No | OData query parameters: `expand`, `'select`. |

Returns: `LedgerJournalHeader|error`

Sample code:

```ballerina
ledger:LedgerJournalHeader journalHeader = check fo->getLedgerJournalHeaders("USMF", "GJ00001234");
```

</details>

<details>
<summary>deleteLedgerJournalHeaders</summary>

Deletes a specific ledger journal header.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `journalBatchNumber` | `string` | Yes | The journal batch number. |
| `headers` | `DeleteLedgerJournalHeadersHeaders` | No | Request headers, including an optional `ifMatch` ETag for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteLedgerJournalHeaders("USMF", "GJ00001234", {ifMatch: eTag});
```

</details>

<details>
<summary>updateLedgerJournalHeaders</summary>

Updates a specific ledger journal header.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `journalBatchNumber` | `string` | Yes | The journal batch number. |
| `payload` | `LedgerJournalHeader` | Yes | The fields to update. |
| `headers` | `UpdateLedgerJournalHeadersHeaders` | No | Request headers, including an optional `ifMatch` ETag for optimistic concurrency. |

Returns: `LedgerJournalHeader|error`

Sample code:

```ballerina
ledger:LedgerJournalHeader updated = check fo->updateLedgerJournalHeaders(
    "USMF",
    "GJ00001234",
    {description: "July accrual adjustments - reviewed"},
    {ifMatch: eTag}
);
```

</details>

#### Opening sheets

<details>
<summary>listOpeningSheets</summary>

Lists opening balance sheet lines used when opening ledger balances for a new fiscal year.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListOpeningSheetsQueries` | No | OData query parameters: `skip`, `top`, `filter`, `orderby`, `expand`, `crossCompany` (`cross-company`), `count`, `'select`. |

Returns: `OpeningSheetsCollection|error`

Sample code:

```ballerina
ledger:OpeningSheetsCollection result = check fo->listOpeningSheets(
    queries = {
        filter: "dataAreaId eq 'USMF' and Sheet eq 'OPEN-2026'"
    }
);
```

</details>

<details>
<summary>createOpeningSheets</summary>

Creates an opening balance sheet line.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `OpeningSheet` | Yes | The opening sheet line record to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `OpeningSheet|error`

Sample code:

```ballerina
ledger:OpeningSheet created = check fo->createOpeningSheets({
    dataAreaId: "USMF",
    sheet: "OPEN-2026",
    ledgerOpeningTableChartOfAccountsName: "USMF-COA",
    ledgerOpeningTableMainAccountIdDisplayValue: "110100",
    lineNum: 1,
    amount: 25000.00,
    accountType: "Asset"
});
```

</details>

<details>
<summary>getOpeningSheets</summary>

Retrieves a specific opening balance sheet line by its composite key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `sheet` | `string` | Yes | The opening sheet identifier. |
| `ledgerOpeningTableMainAccountIdDisplayValue` | `string` | Yes | The main account number of the opening line. |
| `ledgerOpeningTableChartOfAccountsName` | `string` | Yes | The chart of accounts of the main account. |
| `lineNum` | `decimal` | Yes | The line number within the opening sheet. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetOpeningSheetsQueries` | No | OData query parameters: `expand`, `'select`. |

Returns: `OpeningSheet|error`

Sample code:

```ballerina
ledger:OpeningSheet line = check fo->getOpeningSheets(
    "USMF", "OPEN-2026", "110100", "USMF-COA", 1
);
```

</details>

<details>
<summary>deleteOpeningSheets</summary>

Deletes a specific opening balance sheet line.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `sheet` | `string` | Yes | The opening sheet identifier. |
| `ledgerOpeningTableMainAccountIdDisplayValue` | `string` | Yes | The main account number of the opening line. |
| `ledgerOpeningTableChartOfAccountsName` | `string` | Yes | The chart of accounts of the main account. |
| `lineNum` | `decimal` | Yes | The line number within the opening sheet. |
| `headers` | `DeleteOpeningSheetsHeaders` | No | Request headers, including an optional `ifMatch` ETag for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteOpeningSheets(
    "USMF", "OPEN-2026", "110100", "USMF-COA", 1,
    {ifMatch: eTag}
);
```

</details>

<details>
<summary>updateOpeningSheets</summary>

Updates a specific opening balance sheet line.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `sheet` | `string` | Yes | The opening sheet identifier. |
| `ledgerOpeningTableMainAccountIdDisplayValue` | `string` | Yes | The main account number of the opening line. |
| `ledgerOpeningTableChartOfAccountsName` | `string` | Yes | The chart of accounts of the main account. |
| `lineNum` | `decimal` | Yes | The line number within the opening sheet. |
| `payload` | `OpeningSheet` | Yes | The fields to update. |
| `headers` | `UpdateOpeningSheetsHeaders` | No | Request headers, including an optional `ifMatch` ETag for optimistic concurrency. |

Returns: `OpeningSheet|error`

Sample code:

```ballerina
ledger:OpeningSheet updated = check fo->updateOpeningSheets(
    "USMF", "OPEN-2026", "110100", "USMF-COA", 1,
    {amount: 27500.00},
    {ifMatch: eTag}
);
```

</details>

#### Posting definitions

<details>
<summary>listPostingDefinitions</summary>

Lists posting definitions that drive automated subledger postings.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListPostingDefinitionsQueries` | No | OData query parameters: `skip`, `top`, `filter`, `orderby`, `expand`, `crossCompany` (`cross-company`), `count`, `'select`. |

Returns: `PostingDefinitionsCollection|error`

Sample code:

```ballerina
ledger:PostingDefinitionsCollection result = check fo->listPostingDefinitions(
    queries = {
        filter: "dataAreaId eq 'USMF' and Module eq 'AccountsPayable'"
    }
);
```

</details>

<details>
<summary>createPostingDefinitions</summary>

Creates a posting definition.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `PostingDefinition` | Yes | The posting definition record to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `PostingDefinition|error`

Sample code:

```ballerina
ledger:PostingDefinition created = check fo->createPostingDefinitions({
    dataAreaId: "USMF",
    postingDefinitionId: "AP-INV",
    description: "Accounts payable invoice posting",
    'module: "AccountsPayable",
    validFrom: "2026-01-01",
    validTo: "2154-12-31"
});
```

</details>

<details>
<summary>getPostingDefinitions</summary>

Retrieves a specific posting definition by its composite key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `postingDefinitionId` | `string` | Yes | The posting definition's identifier. |
| `validFrom` | `string` | Yes | The start date of the posting definition's validity period. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetPostingDefinitionsQueries` | No | OData query parameters: `expand`, `'select`. |

Returns: `PostingDefinition|error`

Sample code:

```ballerina
ledger:PostingDefinition definition = check fo->getPostingDefinitions("USMF", "AP-INV", "2026-01-01");
```

</details>

<details>
<summary>deletePostingDefinitions</summary>

Deletes a specific posting definition.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `postingDefinitionId` | `string` | Yes | The posting definition's identifier. |
| `validFrom` | `string` | Yes | The start date of the posting definition's validity period. |
| `headers` | `DeletePostingDefinitionsHeaders` | No | Request headers, including an optional `ifMatch` ETag for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
check fo->deletePostingDefinitions("USMF", "AP-INV", "2026-01-01", {ifMatch: eTag});
```

</details>

<details>
<summary>updatePostingDefinitions</summary>

Updates a specific posting definition.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `postingDefinitionId` | `string` | Yes | The posting definition's identifier. |
| `validFrom` | `string` | Yes | The start date of the posting definition's validity period. |
| `payload` | `PostingDefinition` | Yes | The fields to update. |
| `headers` | `UpdatePostingDefinitionsHeaders` | No | Request headers, including an optional `ifMatch` ETag for optimistic concurrency. |

Returns: `PostingDefinition|error`

Sample code:

```ballerina
ledger:PostingDefinition updated = check fo->updatePostingDefinitions(
    "USMF",
    "AP-INV",
    "2026-01-01",
    {description: "Accounts payable invoice posting - revised"},
    {ifMatch: eTag}
);
```

</details>

#### Posting journals

<details>
<summary>listPostingJournals</summary>

Lists posting journal number sequences used for journal batch numbering.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListPostingJournalsQueries` | No | OData query parameters: `skip`, `top`, `filter`, `orderby`, `expand`, `crossCompany` (`cross-company`), `count`, `'select`. |

Returns: `PostingJournalsCollection|error`

Sample code:

```ballerina
ledger:PostingJournalsCollection result = check fo->listPostingJournals(
    queries = {
        filter: "dataAreaId eq 'USMF'"
    }
);
```

</details>

<details>
<summary>createPostingJournals</summary>

Creates a posting journal number sequence.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `PostingJournal` | Yes | The posting journal record to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `PostingJournal|error`

Sample code:

```ballerina
ledger:PostingJournal created = check fo->createPostingJournals({
    dataAreaId: "USMF",
    journal: "GenJrn",
    numberSequenceCode: "GJ_USMF",
    name: "General journal batch numbers",
    journalType: "Financial",
    fromDate: "2026-01-01",
    toDate: "2026-12-31"
});
```

</details>

<details>
<summary>getPostingJournals</summary>

Retrieves a specific posting journal number sequence by its composite key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `journal` | `string` | Yes | The journal type identifier. |
| `numberSequenceCode` | `string` | Yes | The number sequence code assigned to the journal. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetPostingJournalsQueries` | No | OData query parameters: `expand`, `'select`. |

Returns: `PostingJournal|error`

Sample code:

```ballerina
ledger:PostingJournal postingJournal = check fo->getPostingJournals("USMF", "GenJrn", "GJ_USMF");
```

</details>

<details>
<summary>deletePostingJournals</summary>

Deletes a specific posting journal number sequence.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `journal` | `string` | Yes | The journal type identifier. |
| `numberSequenceCode` | `string` | Yes | The number sequence code assigned to the journal. |
| `headers` | `DeletePostingJournalsHeaders` | No | Request headers, including an optional `ifMatch` ETag for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
check fo->deletePostingJournals("USMF", "GenJrn", "GJ_USMF", {ifMatch: eTag});
```

</details>

<details>
<summary>updatePostingJournals</summary>

Updates a specific posting journal number sequence.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `journal` | `string` | Yes | The journal type identifier. |
| `numberSequenceCode` | `string` | Yes | The number sequence code assigned to the journal. |
| `payload` | `PostingJournal` | Yes | The fields to update. |
| `headers` | `UpdatePostingJournalsHeaders` | No | Request headers, including an optional `ifMatch` ETag for optimistic concurrency. |

Returns: `PostingJournal|error`

Sample code:

```ballerina
ledger:PostingJournal updated = check fo->updatePostingJournals(
    "USMF",
    "GenJrn",
    "GJ_USMF",
    {toDate: "2027-12-31"},
    {ifMatch: eTag}
);
```

</details>
