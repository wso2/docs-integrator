---
title: Actions
toc_max_heading_level: 4
---

# Actions

The `ballerinax/microsoft.dynamics365.finance.cashmanagement` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Provides full CRUD access to Microsoft Dynamics 365 Finance bank accounts, bank groups, cash accounts, cash balances, cash discounts, cash ledgers, cash symbols, CODA transaction codes, and currency exchange rate setups via the Dynamics 365 Finance and Operations OData API. |

---

## Client

Provides full CRUD access to Microsoft Dynamics 365 Finance bank accounts, bank groups, cash accounts, cash balances, cash discounts, cash ledgers, cash symbols, CODA transaction codes, and currency exchange rate setups via the Dynamics 365 Finance and Operations OData API.

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
import ballerinax/microsoft.dynamics365.finance.cashmanagement;

configurable string tokenUrl = ?;
configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string serviceUrl = ?;

cashmanagement:Client fo = check new (
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

#### Bank Accounts

<details>
<summary>listBankAccounts</summary>

Reads all bank accounts.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListBankAccountsQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `cashmanagement:BankAccountsCollection|error`

Sample code:

```ballerina
cashmanagement:BankAccountsCollection accounts = check fo->listBankAccounts(
    queries = {
        filter: "CurrencyCode eq 'USD'",
        top: 20,
        'select: "BankAccountId,Name,CurrencyCode,AccountNumber"
    }
);
```

</details>

<details>
<summary>createBankAccounts</summary>

Creates a bank account.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `BankAccount` | Yes | The bank account to create. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `cashmanagement:BankAccount|error`

Sample code:

```ballerina
cashmanagement:BankAccount account = check fo->createBankAccounts({
    bankAccountId: "USBANK001",
    dataAreaId: "usmf",
    name: "US Operating Account",
    currencyCode: "USD",
    accountNumber: "000123456789",
    iBAN: "US00BANK0000123456789",
    bankGroupId: "CITI",
    bankAccountStatus: "ActiveForAllTransactions"
});
```

</details>

<details>
<summary>getBankAccounts</summary>

Reads a specific bank account by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `bankAccountId` | `string` | Yes | The bank account id key field. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `GetBankAccountsQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `cashmanagement:BankAccount|error`

Sample code:

```ballerina
cashmanagement:BankAccount account = check fo->getBankAccounts("usmf", "USBANK001");
```

</details>

<details>
<summary>deleteBankAccounts</summary>

Deletes a specific bank account.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `bankAccountId` | `string` | Yes | The bank account id key field. |
| `headers` | `DeleteBankAccountsHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteBankAccounts(
    "usmf",
    "USBANK001",
    headers = {ifMatch: eTag}
);
```

</details>

<details>
<summary>updateBankAccounts</summary>

Updates a specific bank account.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `bankAccountId` | `string` | Yes | The bank account id key field. |
| `payload` | `BankAccount` | Yes | The fields to update. |
| `headers` | `UpdateBankAccountsHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `cashmanagement:BankAccount|error`

Sample code:

```ballerina
cashmanagement:BankAccount updated = check fo->updateBankAccounts(
    "usmf",
    "USBANK001",
    {bankAccountStatus: "InactiveForNewTransactions"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Bank Groups

<details>
<summary>listBankGroups</summary>

Reads all bank groups.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListBankGroupsQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `cashmanagement:BankGroupsCollection|error`

Sample code:

```ballerina
cashmanagement:BankGroupsCollection groups = check fo->listBankGroups(
    queries = {
        filter: "Currency eq 'USD'",
        top: 20
    }
);
```

</details>

<details>
<summary>createBankGroups</summary>

Creates a bank group.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `BankGroup` | Yes | The bank group to create. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `cashmanagement:BankGroup|error`

Sample code:

```ballerina
cashmanagement:BankGroup group = check fo->createBankGroups({
    bankGroupId: "CITI",
    dataAreaId: "usmf",
    name: "Citibank",
    bankName: "Citibank N.A.",
    currency: "USD",
    contactEmail: "corporate.banking@citi.example.com"
});
```

</details>

<details>
<summary>getBankGroups</summary>

Reads a specific bank group by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `bankGroupId` | `string` | Yes | The bank group id key field. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `GetBankGroupsQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `cashmanagement:BankGroup|error`

Sample code:

```ballerina
cashmanagement:BankGroup group = check fo->getBankGroups("usmf", "CITI");
```

</details>

<details>
<summary>deleteBankGroups</summary>

Deletes a specific bank group.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `bankGroupId` | `string` | Yes | The bank group id key field. |
| `headers` | `DeleteBankGroupsHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteBankGroups(
    "usmf",
    "CITI",
    headers = {ifMatch: eTag}
);
```

</details>

<details>
<summary>updateBankGroups</summary>

Updates a specific bank group.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `bankGroupId` | `string` | Yes | The bank group id key field. |
| `payload` | `BankGroup` | Yes | The fields to update. |
| `headers` | `UpdateBankGroupsHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `cashmanagement:BankGroup|error`

Sample code:

```ballerina
cashmanagement:BankGroup updated = check fo->updateBankGroups(
    "usmf",
    "CITI",
    {contactPhone: "+1-212-555-0100"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Cash Accounts

<details>
<summary>listCashAccounts</summary>

Reads all cash accounts.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListCashAccountsQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `cashmanagement:CashAccountsCollection|error`

Sample code:

```ballerina
cashmanagement:CashAccountsCollection accounts = check fo->listCashAccounts(
    queries = {
        filter: "Currency eq 'USD'",
        top: 20
    }
);
```

</details>

<details>
<summary>createCashAccounts</summary>

Creates a cash account.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CashAccounts` | Yes | The cash account to create. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `cashmanagement:CashAccounts|error`

Sample code:

```ballerina
cashmanagement:CashAccounts account = check fo->createCashAccounts({
    cash: "PETTYCASH-USMF",
    dataAreaId: "usmf",
    name: "Petty cash - head office",
    currency: "USD",
    moreCurrencies: "No",
    negativeCash: "No"
});
```

</details>

<details>
<summary>getCashAccounts</summary>

Reads a specific cash account by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `cash` | `string` | Yes | The cash key field. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `GetCashAccountsQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `cashmanagement:CashAccounts|error`

Sample code:

```ballerina
cashmanagement:CashAccounts account = check fo->getCashAccounts("usmf", "PETTYCASH-USMF");
```

</details>

<details>
<summary>deleteCashAccounts</summary>

Deletes a specific cash account.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `cash` | `string` | Yes | The cash key field. |
| `headers` | `DeleteCashAccountsHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteCashAccounts(
    "usmf",
    "PETTYCASH-USMF",
    headers = {ifMatch: eTag}
);
```

</details>

<details>
<summary>updateCashAccounts</summary>

Updates a specific cash account.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `cash` | `string` | Yes | The cash key field. |
| `payload` | `CashAccounts` | Yes | The fields to update. |
| `headers` | `UpdateCashAccountsHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `cashmanagement:CashAccounts|error`

Sample code:

```ballerina
cashmanagement:CashAccounts updated = check fo->updateCashAccounts(
    "usmf",
    "PETTYCASH-USMF",
    {negativeCash: "Yes"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Cash Balances

<details>
<summary>listCashBalances</summary>

Reads all cash balances.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListCashBalancesQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `cashmanagement:CashBalancesCollection|error`

Sample code:

```ballerina
cashmanagement:CashBalancesCollection balances = check fo->listCashBalances(
    queries = {
        filter: "Cash eq 'PETTYCASH-USMF'"
    }
);
```

</details>

<details>
<summary>createCashBalances</summary>

Creates a cash balance record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CashBalances` | Yes | The cash balance to create. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `cashmanagement:CashBalances|error`

Sample code:

```ballerina
cashmanagement:CashBalances balance = check fo->createCashBalances({
    cash: "PETTYCASH-USMF",
    dataAreaId: "usmf",
    currency: "USD",
    amount: 500.00,
    amountInTransactionCurrency: 500.00
});
```

</details>

<details>
<summary>getCashBalances</summary>

Reads a specific cash balance by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `cash` | `string` | Yes | The cash key field. |
| `currency` | `string` | Yes | The currency key field. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `GetCashBalancesQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `cashmanagement:CashBalances|error`

Sample code:

```ballerina
cashmanagement:CashBalances balance = check fo->getCashBalances("usmf", "PETTYCASH-USMF", "USD");
```

</details>

<details>
<summary>deleteCashBalances</summary>

Deletes a specific cash balance.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `cash` | `string` | Yes | The cash key field. |
| `currency` | `string` | Yes | The currency key field. |
| `headers` | `DeleteCashBalancesHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteCashBalances(
    "usmf",
    "PETTYCASH-USMF",
    "USD",
    headers = {ifMatch: eTag}
);
```

</details>

<details>
<summary>updateCashBalances</summary>

Updates a specific cash balance.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `cash` | `string` | Yes | The cash key field. |
| `currency` | `string` | Yes | The currency key field. |
| `payload` | `CashBalances` | Yes | The fields to update. |
| `headers` | `UpdateCashBalancesHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `cashmanagement:CashBalances|error`

Sample code:

```ballerina
cashmanagement:CashBalances updated = check fo->updateCashBalances(
    "usmf",
    "PETTYCASH-USMF",
    "USD",
    {amount: 450.00},
    headers = {ifMatch: eTag}
);
```

</details>

#### Cash Discounts

<details>
<summary>listCashDiscounts</summary>

Reads all cash discount terms.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListCashDiscountsQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `cashmanagement:CashDiscountsCollection|error`

Sample code:

```ballerina
cashmanagement:CashDiscountsCollection discounts = check fo->listCashDiscounts(
    queries = {
        filter: "DiscountMethod eq 'CurrentMth'",
        top: 20
    }
);
```

</details>

<details>
<summary>createCashDiscounts</summary>

Creates a cash discount term.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CashDiscount` | Yes | The cash discount term to create. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `cashmanagement:CashDiscount|error`

Sample code:

```ballerina
cashmanagement:CashDiscount discount = check fo->createCashDiscounts({
    cashDiscountCode: "2/10NET30",
    dataAreaId: "usmf",
    description: "2% 10 days, net 30",
    numberOfDays: 10,
    percent: 2.0,
    discountMethod: "CurrentMth"
});
```

</details>

<details>
<summary>getCashDiscounts</summary>

Reads a specific cash discount term by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `cashDiscountCode` | `string` | Yes | The cash discount code key field. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `GetCashDiscountsQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `cashmanagement:CashDiscount|error`

Sample code:

```ballerina
cashmanagement:CashDiscount discount = check fo->getCashDiscounts("usmf", "2/10NET30");
```

</details>

<details>
<summary>deleteCashDiscounts</summary>

Deletes a specific cash discount term.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `cashDiscountCode` | `string` | Yes | The cash discount code key field. |
| `headers` | `DeleteCashDiscountsHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteCashDiscounts(
    "usmf",
    "2/10NET30",
    headers = {ifMatch: eTag}
);
```

</details>

<details>
<summary>updateCashDiscounts</summary>

Updates a specific cash discount term.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `cashDiscountCode` | `string` | Yes | The cash discount code key field. |
| `payload` | `CashDiscount` | Yes | The fields to update. |
| `headers` | `UpdateCashDiscountsHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `cashmanagement:CashDiscount|error`

Sample code:

```ballerina
cashmanagement:CashDiscount updated = check fo->updateCashDiscounts(
    "usmf",
    "2/10NET30",
    {percent: 1.5},
    headers = {ifMatch: eTag}
);
```

</details>

#### Cash Ledgers

<details>
<summary>listCashLedgers</summary>

Reads all cash ledger posting profiles.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListCashLedgersQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `cashmanagement:CashLedgersCollection|error`

Sample code:

```ballerina
cashmanagement:CashLedgersCollection ledgers = check fo->listCashLedgers(
    queries = {
        filter: "Cash eq 'PETTYCASH-USMF'"
    }
);
```

</details>

<details>
<summary>createCashLedgers</summary>

Creates a cash ledger posting profile.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CashLedger` | Yes | The cash ledger posting profile to create. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `cashmanagement:CashLedger|error`

Sample code:

```ballerina
cashmanagement:CashLedger ledger = check fo->createCashLedgers({
    cashPosting: "PettyCashUS",
    dataAreaId: "usmf",
    cash: "PETTYCASH-USMF",
    description: "Petty cash posting profile - USMF",
    validFor: "Table",
    mainAccountIdDisplayValue: "101180"
});
```

</details>

<details>
<summary>getCashLedgers</summary>

Reads a specific cash ledger posting profile by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `cashPosting` | `string` | Yes | The cash posting key field. |
| `mainAccountIdDisplayValue` | `string` | Yes | The main account id display value key field. |
| `cash` | `string` | Yes | The cash key field. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `GetCashLedgersQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `cashmanagement:CashLedger|error`

Sample code:

```ballerina
cashmanagement:CashLedger ledger = check fo->getCashLedgers(
    "usmf",
    "PettyCashUS",
    "101180",
    "PETTYCASH-USMF"
);
```

</details>

<details>
<summary>deleteCashLedgers</summary>

Deletes a specific cash ledger posting profile.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `cashPosting` | `string` | Yes | The cash posting key field. |
| `mainAccountIdDisplayValue` | `string` | Yes | The main account id display value key field. |
| `cash` | `string` | Yes | The cash key field. |
| `headers` | `DeleteCashLedgersHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteCashLedgers(
    "usmf",
    "PettyCashUS",
    "101180",
    "PETTYCASH-USMF",
    headers = {ifMatch: eTag}
);
```

</details>

<details>
<summary>updateCashLedgers</summary>

Updates a specific cash ledger posting profile.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `cashPosting` | `string` | Yes | The cash posting key field. |
| `mainAccountIdDisplayValue` | `string` | Yes | The main account id display value key field. |
| `cash` | `string` | Yes | The cash key field. |
| `payload` | `CashLedger` | Yes | The fields to update. |
| `headers` | `UpdateCashLedgersHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `cashmanagement:CashLedger|error`

Sample code:

```ballerina
cashmanagement:CashLedger updated = check fo->updateCashLedgers(
    "usmf",
    "PettyCashUS",
    "101180",
    "PETTYCASH-USMF",
    {description: "Petty cash posting profile - USMF (revised)"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Cash Symbols

<details>
<summary>listCashSymbols</summary>

Reads all cash symbols.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListCashSymbolsQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `cashmanagement:CashSymbolsCollection|error`

Sample code:

```ballerina
cashmanagement:CashSymbolsCollection symbols = check fo->listCashSymbols(
    queries = {
        top: 20
    }
);
```

</details>

<details>
<summary>createCashSymbols</summary>

Creates a cash symbol.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CashSymbol` | Yes | The cash symbol to create. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `cashmanagement:CashSymbol|error`

Sample code:

```ballerina
cashmanagement:CashSymbol symbol = check fo->createCashSymbols({
    code: "001",
    dataAreaId: "usmf",
    description: "Cash sale"
});
```

</details>

<details>
<summary>getCashSymbols</summary>

Reads a specific cash symbol by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `code` | `string` | Yes | The code key field. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `GetCashSymbolsQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `cashmanagement:CashSymbol|error`

Sample code:

```ballerina
cashmanagement:CashSymbol symbol = check fo->getCashSymbols("usmf", "001");
```

</details>

<details>
<summary>deleteCashSymbols</summary>

Deletes a specific cash symbol.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `code` | `string` | Yes | The code key field. |
| `headers` | `DeleteCashSymbolsHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteCashSymbols(
    "usmf",
    "001",
    headers = {ifMatch: eTag}
);
```

</details>

<details>
<summary>updateCashSymbols</summary>

Updates a specific cash symbol.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `code` | `string` | Yes | The code key field. |
| `payload` | `CashSymbol` | Yes | The fields to update. |
| `headers` | `UpdateCashSymbolsHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `cashmanagement:CashSymbol|error`

Sample code:

```ballerina
cashmanagement:CashSymbol updated = check fo->updateCashSymbols(
    "usmf",
    "001",
    {description: "Cash sale - retail counter"},
    headers = {ifMatch: eTag}
);
```

</details>

#### CODA Transactions

<details>
<summary>listCodaTrans</summary>

Reads all CODA transaction codes, used to classify imported electronic bank statement lines.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListCodaTransQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `cashmanagement:CodaTransCollection|error`

Sample code:

```ballerina
cashmanagement:CodaTransCollection codes = check fo->listCodaTrans(
    queries = {
        filter: "TransactionFamily eq '01'"
    }
);
```

</details>

<details>
<summary>createCodaTrans</summary>

Creates a CODA transaction code.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CodaTrans` | Yes | The CODA transaction code to create. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `cashmanagement:CodaTrans|error`

Sample code:

```ballerina
cashmanagement:CodaTrans codaTrans = check fo->createCodaTrans({
    'transaction: "01",
    dataAreaId: "usmf",
    transactionFamily: "01",
    description: "Domestic bank transfer"
});
```

</details>

<details>
<summary>getCodaTrans</summary>

Reads a specific CODA transaction code by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `transactionFamily` | `string` | Yes | The transaction family key field. |
| `'transaction` | `string` | Yes | The transaction key field. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `GetCodaTransQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `cashmanagement:CodaTrans|error`

Sample code:

```ballerina
cashmanagement:CodaTrans codaTrans = check fo->getCodaTrans("usmf", "01", "01");
```

</details>

<details>
<summary>deleteCodaTrans</summary>

Deletes a specific CODA transaction code.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `transactionFamily` | `string` | Yes | The transaction family key field. |
| `'transaction` | `string` | Yes | The transaction key field. |
| `headers` | `DeleteCodaTransHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteCodaTrans(
    "usmf",
    "01",
    "01",
    headers = {ifMatch: eTag}
);
```

</details>

<details>
<summary>updateCodaTrans</summary>

Updates a specific CODA transaction code.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `transactionFamily` | `string` | Yes | The transaction family key field. |
| `'transaction` | `string` | Yes | The transaction key field. |
| `payload` | `CodaTrans` | Yes | The fields to update. |
| `headers` | `UpdateCodaTransHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `cashmanagement:CodaTrans|error`

Sample code:

```ballerina
cashmanagement:CodaTrans updated = check fo->updateCodaTrans(
    "usmf",
    "01",
    "01",
    {description: "Domestic bank transfer (SEPA)"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Exchange Rate Setups

<details>
<summary>listExchSetups</summary>

Reads all currency exchange rate type setups.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListExchSetupsQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `cashmanagement:ExchSetupsCollection|error`

Sample code:

```ballerina
cashmanagement:ExchSetupsCollection setups = check fo->listExchSetups(
    queries = {
        filter: "AccountType eq 'Bank'"
    }
);
```

</details>

<details>
<summary>createExchSetups</summary>

Creates a currency exchange rate type setup.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `ExchSetup` | Yes | The exchange rate setup to create. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `cashmanagement:ExchSetup|error`

Sample code:

```ballerina
cashmanagement:ExchSetup setup = check fo->createExchSetups({
    exchangeCode: "BANKFEES",
    dataAreaId: "usmf",
    accountType: "Bank"
});
```

</details>

<details>
<summary>getExchSetups</summary>

Reads a specific currency exchange rate type setup by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `exchangeCode` | `string` | Yes | The exchange code key field. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `GetExchSetupsQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `cashmanagement:ExchSetup|error`

Sample code:

```ballerina
cashmanagement:ExchSetup setup = check fo->getExchSetups("usmf", "BANKFEES");
```

</details>

<details>
<summary>deleteExchSetups</summary>

Deletes a specific currency exchange rate type setup.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `exchangeCode` | `string` | Yes | The exchange code key field. |
| `headers` | `DeleteExchSetupsHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteExchSetups(
    "usmf",
    "BANKFEES",
    headers = {ifMatch: eTag}
);
```

</details>

<details>
<summary>updateExchSetups</summary>

Updates a specific currency exchange rate type setup.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `exchangeCode` | `string` | Yes | The exchange code key field. |
| `payload` | `ExchSetup` | Yes | The fields to update. |
| `headers` | `UpdateExchSetupsHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `cashmanagement:ExchSetup|error`

Sample code:

```ballerina
cashmanagement:ExchSetup updated = check fo->updateExchSetups(
    "usmf",
    "BANKFEES",
    {accountType: "Ledger"},
    headers = {ifMatch: eTag}
);
```

</details>
