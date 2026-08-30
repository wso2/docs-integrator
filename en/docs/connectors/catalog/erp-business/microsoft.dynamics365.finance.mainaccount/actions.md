---
title: Actions
toc_max_heading_level: 4
---

# Actions

The `ballerinax/microsoft.dynamics365.finance.mainaccount` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Provides full CRUD access to Microsoft Dynamics 365 Finance main accounts, main account–legal entity assignments, ledgers, ledger account groups, and asset lease books via the Dynamics 365 Finance and Operations OData API. |

---

## Client

Provides full CRUD access to Microsoft Dynamics 365 Finance main accounts, main account–legal entity assignments, ledgers, ledger account groups, and asset lease books via the Dynamics 365 Finance and Operations OData API.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `OAuth2ClientCredentialsGrantConfig` | Required | OAuth2 client credentials grant configuration used to authenticate with Microsoft Entra ID (Azure AD): `tokenUrl`, `clientId`, `clientSecret`, and optional `scopes`. |
| `httpVersion` | `http:HttpVersion` | `2.0` | HTTP protocol version to use for outbound requests. |
| `http1Settings` | `http:ClientHttp1Settings` | `{}` | HTTP/1.x client settings including keep-alive, chunking, and proxy configuration. |
| `secureSocket` | `http:ClientSecureSocket` | `()` | SSL/TLS configuration for secure connections. |
| `proxy` | `http:ProxyConfig` | `()` | Proxy server configuration. |

### Initializing the client

```ballerina
import ballerinax/microsoft.dynamics365.finance.mainaccount;

configurable string tokenUrl = ?;
configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string serviceUrl = ?;

mainaccount:Client fo = check new (
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

#### Main accounts

<details>
<summary>listMainAccounts</summary>

Reads all main accounts in the chart of accounts.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListMainAccountsQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `mainaccount:MainAccountsCollection|error`

Sample code:

```ballerina
mainaccount:MainAccountsCollection accounts = check fo->listMainAccounts(
    queries = {
        filter: "ChartOfAccounts eq 'Shared' and MainAccountType eq 'Revenue'",
        top: 20,
        'select: "MainAccountId,Name,MainAccountType,PostingType"
    }
);
```

</details>

<details>
<summary>createMainAccounts</summary>

Creates a main account in the chart of accounts.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `MainAccount` | Yes | The main account to create. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `mainaccount:MainAccount|error`

Sample code:

```ballerina
mainaccount:MainAccount account = check fo->createMainAccounts({
    mainAccountId: "401100",
    chartOfAccounts: "Shared",
    name: "Sales revenue - domestic",
    mainAccountType: "Revenue",
    mainAccountCategory: "Revenue",
    postingType: "SalesRevenue",
    debitCreditDefault: "Credit",
    defaultCurrency: "USD",
    isSuspended: "No"
});
```

</details>

<details>
<summary>getMainAccounts</summary>

Reads a specific main account by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `chartOfAccounts` | `string` | Yes | The chart of accounts key field. |
| `mainAccountId` | `string` | Yes | The main account id key field. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `GetMainAccountsQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `mainaccount:MainAccount|error`

Sample code:

```ballerina
mainaccount:MainAccount account = check fo->getMainAccounts(
    "Shared",
    "401100"
);
```

</details>

<details>
<summary>deleteMainAccounts</summary>

Deletes a specific main account.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `chartOfAccounts` | `string` | Yes | The chart of accounts key field. |
| `mainAccountId` | `string` | Yes | The main account id key field. |
| `headers` | `DeleteMainAccountsHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteMainAccounts(
    "Shared",
    "401100",
    headers = {ifMatch: eTag}
);
```

</details>

<details>
<summary>updateMainAccounts</summary>

Updates a specific main account.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `chartOfAccounts` | `string` | Yes | The chart of accounts key field. |
| `mainAccountId` | `string` | Yes | The main account id key field. |
| `payload` | `MainAccount` | Yes | The fields to update. |
| `headers` | `UpdateMainAccountsHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `mainaccount:MainAccount|error`

Sample code:

```ballerina
mainaccount:MainAccount updated = check fo->updateMainAccounts(
    "Shared",
    "401100",
    {isSuspended: "Yes"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Main account legal entities

<details>
<summary>listMainAccountLegalEntities</summary>

Reads all main account–legal entity assignments.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListMainAccountLegalEntitiesQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `mainaccount:MainAccountLegalEntitiesCollection|error`

Sample code:

```ballerina
mainaccount:MainAccountLegalEntitiesCollection assignments = check fo->listMainAccountLegalEntities(
    queries = {
        filter: "LegalEntityId eq 'USMF'",
        top: 20
    }
);
```

</details>

<details>
<summary>createMainAccountLegalEntities</summary>

Creates a main account–legal entity assignment.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `MainAccountLegalEntity` | Yes | The main account legal entity assignment to create. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `mainaccount:MainAccountLegalEntity|error`

Sample code:

```ballerina
mainaccount:MainAccountLegalEntity assignment = check fo->createMainAccountLegalEntities({
    mainAccountId: "401100",
    chartOfAccounts: "Shared",
    legalEntityId: "USMF",
    isSuspended: "No",
    salesTaxGroup: "TAXEXEMPT",
    autoAllocate: "No"
});
```

</details>

<details>
<summary>getMainAccountLegalEntities</summary>

Reads a specific main account–legal entity assignment by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `mainAccountId` | `string` | Yes | The main account id key field. |
| `chartOfAccounts` | `string` | Yes | The chart of accounts key field. |
| `legalEntityId` | `string` | Yes | The legal entity id key field. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `GetMainAccountLegalEntitiesQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `mainaccount:MainAccountLegalEntity|error`

Sample code:

```ballerina
mainaccount:MainAccountLegalEntity assignment = check fo->getMainAccountLegalEntities(
    "401100",
    "Shared",
    "USMF"
);
```

</details>

<details>
<summary>deleteMainAccountLegalEntities</summary>

Deletes a specific main account–legal entity assignment.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `mainAccountId` | `string` | Yes | The main account id key field. |
| `chartOfAccounts` | `string` | Yes | The chart of accounts key field. |
| `legalEntityId` | `string` | Yes | The legal entity id key field. |
| `headers` | `DeleteMainAccountLegalEntitiesHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteMainAccountLegalEntities(
    "401100",
    "Shared",
    "USMF",
    headers = {ifMatch: eTag}
);
```

</details>

<details>
<summary>updateMainAccountLegalEntities</summary>

Updates a specific main account–legal entity assignment.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `mainAccountId` | `string` | Yes | The main account id key field. |
| `chartOfAccounts` | `string` | Yes | The chart of accounts key field. |
| `legalEntityId` | `string` | Yes | The legal entity id key field. |
| `payload` | `MainAccountLegalEntity` | Yes | The fields to update. |
| `headers` | `UpdateMainAccountLegalEntitiesHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `mainaccount:MainAccountLegalEntity|error`

Sample code:

```ballerina
mainaccount:MainAccountLegalEntity updated = check fo->updateMainAccountLegalEntities(
    "401100",
    "Shared",
    "USMF",
    {isSuspended: "Yes"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Ledgers

<details>
<summary>listLedgers</summary>

Reads all ledgers.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListLedgersQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `mainaccount:LedgersCollection|error`

Sample code:

```ballerina
mainaccount:LedgersCollection ledgers = check fo->listLedgers(
    queries = {
        filter: "AccountingCurrency eq 'USD'",
        'select: "LegalEntityId,Name,AccountingCurrency,ReportingCurrency"
    }
);
```

</details>

<details>
<summary>createLedgers</summary>

Creates a ledger.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `Ledger` | Yes | The ledger to create. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `mainaccount:Ledger|error`

Sample code:

```ballerina
mainaccount:Ledger ledger = check fo->createLedgers({
    legalEntityId: "USMF",
    name: "US Operations",
    chartOfAccounts: "Shared",
    accountingCurrency: "USD",
    reportingCurrency: "USD",
    fiscalCalendar: "Fiscal",
    isBudgetControlEnabled: "No"
});
```

</details>

<details>
<summary>getLedgers</summary>

Reads a specific ledger by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `legalEntityId` | `string` | Yes | The legal entity id key field. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `GetLedgersQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `mainaccount:Ledger|error`

Sample code:

```ballerina
mainaccount:Ledger ledger = check fo->getLedgers("USMF");
```

</details>

<details>
<summary>deleteLedgers</summary>

Deletes a specific ledger.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `legalEntityId` | `string` | Yes | The legal entity id key field. |
| `headers` | `DeleteLedgersHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteLedgers(
    "USMF",
    headers = {ifMatch: eTag}
);
```

</details>

<details>
<summary>updateLedgers</summary>

Updates a specific ledger.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `legalEntityId` | `string` | Yes | The legal entity id key field. |
| `payload` | `Ledger` | Yes | The fields to update. |
| `headers` | `UpdateLedgersHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `mainaccount:Ledger|error`

Sample code:

```ballerina
mainaccount:Ledger updated = check fo->updateLedgers(
    "USMF",
    {reportingCurrency: "EUR"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Ledger account groups

<details>
<summary>listLedgerAccountGroups</summary>

Reads all ledger account groups.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListLedgerAccountGroupsQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `mainaccount:LedgerAccountGroupsCollection|error`

Sample code:

```ballerina
mainaccount:LedgerAccountGroupsCollection groups = check fo->listLedgerAccountGroups(
    queries = {
        filter: "dataAreaId eq 'USMF'"
    }
);
```

</details>

<details>
<summary>createLedgerAccountGroups</summary>

Creates a ledger account group.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `LedgerAccountGroup` | Yes | The ledger account group to create. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `mainaccount:LedgerAccountGroup|error`

Sample code:

```ballerina
mainaccount:LedgerAccountGroup group = check fo->createLedgerAccountGroups({
    dataAreaId: "USMF",
    ledgerPostingGroup: "DOMESTIC",
    dTLDisplayValue: "212100",
    dTADisplayValue: "131500",
    cTLDisplayValue: "212200",
    cTADisplayValue: "131600"
});
```

</details>

<details>
<summary>getLedgerAccountGroups</summary>

Reads a specific ledger account group by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `ledgerPostingGroup` | `string` | Yes | The ledger posting group key field. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `GetLedgerAccountGroupsQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `mainaccount:LedgerAccountGroup|error`

Sample code:

```ballerina
mainaccount:LedgerAccountGroup group = check fo->getLedgerAccountGroups(
    "USMF",
    "DOMESTIC"
);
```

</details>

<details>
<summary>deleteLedgerAccountGroups</summary>

Deletes a specific ledger account group.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `ledgerPostingGroup` | `string` | Yes | The ledger posting group key field. |
| `headers` | `DeleteLedgerAccountGroupsHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteLedgerAccountGroups(
    "USMF",
    "DOMESTIC",
    headers = {ifMatch: eTag}
);
```

</details>

<details>
<summary>updateLedgerAccountGroups</summary>

Updates a specific ledger account group.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `ledgerPostingGroup` | `string` | Yes | The ledger posting group key field. |
| `payload` | `LedgerAccountGroup` | Yes | The fields to update. |
| `headers` | `UpdateLedgerAccountGroupsHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `mainaccount:LedgerAccountGroup|error`

Sample code:

```ballerina
mainaccount:LedgerAccountGroup updated = check fo->updateLedgerAccountGroups(
    "USMF",
    "DOMESTIC",
    {dTLDisplayValue: "212150"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Lease books

<details>
<summary>listLeaseBooks</summary>

Reads all asset lease books.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListLeaseBooksQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `mainaccount:LeaseBooksCollection|error`

Sample code:

```ballerina
mainaccount:LeaseBooksCollection leases = check fo->listLeaseBooks(
    queries = {
        filter: "LeaseStatus eq 'Open' and Company eq 'USMF'",
        top: 25
    }
);
```

</details>

<details>
<summary>createLeaseBooks</summary>

Creates an asset lease book.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `LeaseBook` | Yes | The lease book to create. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `mainaccount:LeaseBook|error`

Sample code:

```ballerina
mainaccount:LeaseBook lease = check fo->createLeaseBooks({
    dataAreaId: "USMF",
    leaseId: "LEASE-0042",
    leaseDescription: "Warehouse lease - Building 4",
    leaseType: "Operating",
    leaseStatus: "Open",
    currency: "USD",
    company: "USMF",
    vendorAccount: "V-1002",
    fixedAssetBookId: "LeaseBook",
    leaseTermMonths: 60,
    borrowingRate: 4.25
});
```

</details>

<details>
<summary>getLeaseBooks</summary>

Reads a specific asset lease book by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `leaseId` | `string` | Yes | The lease id key field. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `GetLeaseBooksQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `mainaccount:LeaseBook|error`

Sample code:

```ballerina
mainaccount:LeaseBook lease = check fo->getLeaseBooks(
    "USMF",
    "LEASE-0042"
);
```

</details>

<details>
<summary>deleteLeaseBooks</summary>

Deletes a specific asset lease book.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `leaseId` | `string` | Yes | The lease id key field. |
| `headers` | `DeleteLeaseBooksHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteLeaseBooks(
    "USMF",
    "LEASE-0042",
    headers = {ifMatch: eTag}
);
```

</details>

<details>
<summary>updateLeaseBooks</summary>

Updates a specific asset lease book.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `leaseId` | `string` | Yes | The lease id key field. |
| `payload` | `LeaseBook` | Yes | The fields to update. |
| `headers` | `UpdateLeaseBooksHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `mainaccount:LeaseBook|error`

Sample code:

```ballerina
mainaccount:LeaseBook updated = check fo->updateLeaseBooks(
    "USMF",
    "LEASE-0042",
    {leaseStatus: "Closed"},
    headers = {ifMatch: eTag}
);
```

</details>
