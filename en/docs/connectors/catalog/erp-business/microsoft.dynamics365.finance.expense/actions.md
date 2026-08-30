---
title: Actions
toc_max_heading_level: 4
---

# Actions

The `ballerinax/microsoft.dynamics365.finance.expense` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Provides access to Microsoft Dynamics 365 Finance Expense entities (expense codes, expense parameters, expense rates, expenses, mileage rates, per diems, and travel receipts) via OData. |

---

## Client

Provides access to Microsoft Dynamics 365 Finance Expense entities (expense codes, expense parameters, expense rates, expenses, mileage rates, per diems, and travel receipts) via OData.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `OAuth2ClientCredentialsGrantConfig` | Required | OAuth2 client credentials configuration containing `tokenUrl`, `clientId`, `clientSecret`, and `scopes` for authenticating against Microsoft Entra ID. |
| `httpVersion` | `http:HttpVersion` | `http:HTTP_2_0` | HTTP protocol version to use for outbound requests. |
| `http1Settings` | `http:ClientHttp1Settings` | `{}` | Configurations related to the HTTP/1.x protocol. |
| `secureSocket` | `http:ClientSecureSocket?` | `()` | SSL/TLS configuration for secure connections. |
| `proxy` | `http:ProxyConfig?` | `()` | HTTP proxy server configuration. |

### Initializing the client

```ballerina
import ballerinax/microsoft.dynamics365.finance.expense;

configurable string tokenUrl = ?;
configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string serviceUrl = ?;

expense:Client fo = check new (
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

#### Expense Codes

<details>
<summary>listExpenseCodes</summary>

<div>

Lists ExpenseCode records, with optional OData query support.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `ListExpenseCodesQueries` | No | OData query options: `skip`, `top`, `filter`, `orderby`, `expand`, `crossCompany`, `count`, `'select`. |

Returns: `ExpenseCodesCollection|error`

Sample code:

```ballerina
expense:ExpenseCodesCollection result = check fo->listExpenseCodes(
    queries = {
        filter: "codeType eq 'Receipt'",
        top: 20,
        'select: "expenseCode,name,shortDescription,salesTaxCode"
    }
);
```

</div>

</details>

<details>
<summary>createExpenseCodes</summary>

<div>

Creates a new ExpenseCode.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `ExpenseCode` | Yes | The ExpenseCode record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |

Returns: `ExpenseCode|error`

Sample code:

```ballerina
expense:ExpenseCode payload = {
    dataAreaId: "USMF",
    expenseCode: "MEALS",
    name: "Meals",
    shortDescription: "Meal expenses",
    codeType: "Receipt",
    salesTaxCode: "MEALTAX",
    direct: "No"
};
expense:ExpenseCode result = check fo->createExpenseCodes(payload);
```

</div>

</details>

<details>
<summary>getExpenseCodes</summary>

<div>

Retrieves a single ExpenseCode by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `expenseCode` | `string` | Yes | The expense code key field, e.g. `"MEALS"`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `GetExpenseCodesQueries` | No | OData query options: `expand`, `'select`. |

Returns: `ExpenseCode|error`

Sample code:

```ballerina
expense:ExpenseCode result = check fo->getExpenseCodes("USMF", "MEALS");
```

</div>

</details>

<details>
<summary>deleteExpenseCodes</summary>

<div>

Deletes a specific ExpenseCode.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `expenseCode` | `string` | Yes | The expense code key field to delete. |
| `headers` | `DeleteExpenseCodesHeaders` | No | Optional headers. Set `ifMatch` to the entity's current ETag for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteExpenseCodes("USMF", "MEALS", {ifMatch: eTag});
```

</div>

</details>

<details>
<summary>updateExpenseCodes</summary>

<div>

Updates a specific ExpenseCode.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `expenseCode` | `string` | Yes | The expense code key field to update. |
| `payload` | `ExpenseCode` | Yes | The fields to update. |
| `headers` | `UpdateExpenseCodesHeaders` | No | Optional headers. Set `ifMatch` to the entity's current ETag for optimistic concurrency. |

Returns: `ExpenseCode|error`

Sample code:

```ballerina
expense:ExpenseCode result = check fo->updateExpenseCodes(
    "USMF",
    "MEALS",
    {name: "Meals and entertainment"},
    {ifMatch: eTag}
);
```

</div>

</details>

#### Expense Parameters

<details>
<summary>listExpenseParameters</summary>

<div>

Lists ExpenseParameters records, with optional OData query support. This entity is typically configured once per company (`dataAreaId`).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `ListExpenseParametersQueries` | No | OData query options: `skip`, `top`, `filter`, `orderby`, `expand`, `crossCompany`, `count`, `'select`. |

Returns: `ExpenseParametersCollection|error`

Sample code:

```ballerina
expense:ExpenseParametersCollection result = check fo->listExpenseParameters(
    queries = {'select: "dataAreaId,personalPaidBy,taxIncluded,postImmediately"}
);
```

</div>

</details>

<details>
<summary>createExpenseParameters</summary>

<div>

Creates the ExpenseParameters record for a company.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `ExpenseParameters` | Yes | The ExpenseParameters record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |

Returns: `ExpenseParameters|error`

Sample code:

```ballerina
expense:ExpenseParameters payload = {
    dataAreaId: "USMF",
    personalPaidBy: "Employee",
    taxIncluded: "Yes",
    postImmediately: "No",
    whenToEvaluatePolicy: "OnSubmit"
};
expense:ExpenseParameters result = check fo->createExpenseParameters(payload);
```

</div>

</details>

<details>
<summary>getExpenseParameters</summary>

<div>

Retrieves the ExpenseParameters record for a company.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `GetExpenseParametersQueries` | No | OData query options: `expand`, `'select`. |

Returns: `ExpenseParameters|error`

Sample code:

```ballerina
expense:ExpenseParameters result = check fo->getExpenseParameters("USMF");
```

</div>

</details>

<details>
<summary>deleteExpenseParameters</summary>

<div>

Deletes the ExpenseParameters record for a company.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `headers` | `DeleteExpenseParametersHeaders` | No | Optional headers. Set `ifMatch` to the entity's current ETag for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteExpenseParameters("USMF", {ifMatch: eTag});
```

</div>

</details>

<details>
<summary>updateExpenseParameters</summary>

<div>

Updates the ExpenseParameters record for a company.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `payload` | `ExpenseParameters` | Yes | The fields to update. |
| `headers` | `UpdateExpenseParametersHeaders` | No | Optional headers. Set `ifMatch` to the entity's current ETag for optimistic concurrency. |

Returns: `ExpenseParameters|error`

Sample code:

```ballerina
expense:ExpenseParameters result = check fo->updateExpenseParameters(
    "USMF",
    {postImmediately: "Yes"},
    {ifMatch: eTag}
);
```

</div>

</details>

#### Expense Rates

<details>
<summary>listExpenseRates</summary>

<div>

Lists ExpenseRate records, with optional OData query support.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `ListExpenseRatesQueries` | No | OData query options: `skip`, `top`, `filter`, `orderby`, `expand`, `crossCompany`, `count`, `'select`. |

Returns: `ExpenseRatesCollection|error`

Sample code:

```ballerina
expense:ExpenseRatesCollection result = check fo->listExpenseRates(
    queries = {
        filter: "currency eq 'USD'",
        orderby: "expense asc"
    }
);
```

</div>

</details>

<details>
<summary>createExpenseRates</summary>

<div>

Creates a new ExpenseRate.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `ExpenseRate` | Yes | The ExpenseRate record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |

Returns: `ExpenseRate|error`

Sample code:

```ballerina
expense:ExpenseRate payload = {
    dataAreaId: "USMF",
    expense: "MEALS",
    description: "Standard meal rate",
    rate: 45.00,
    currency: "USD",
    rateIAmountsIncludeSalesTax: "No"
};
expense:ExpenseRate result = check fo->createExpenseRates(payload);
```

</div>

</details>

<details>
<summary>getExpenseRates</summary>

<div>

Retrieves a single ExpenseRate by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `expense` | `string` | Yes | The expense key field, e.g. `"MEALS"`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `GetExpenseRatesQueries` | No | OData query options: `expand`, `'select`. |

Returns: `ExpenseRate|error`

Sample code:

```ballerina
expense:ExpenseRate result = check fo->getExpenseRates("USMF", "MEALS");
```

</div>

</details>

<details>
<summary>deleteExpenseRates</summary>

<div>

Deletes a specific ExpenseRate.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `expense` | `string` | Yes | The expense key field to delete. |
| `headers` | `DeleteExpenseRatesHeaders` | No | Optional headers. Set `ifMatch` to the entity's current ETag for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteExpenseRates("USMF", "MEALS", {ifMatch: eTag});
```

</div>

</details>

<details>
<summary>updateExpenseRates</summary>

<div>

Updates a specific ExpenseRate.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `expense` | `string` | Yes | The expense key field to update. |
| `payload` | `ExpenseRate` | Yes | The fields to update. |
| `headers` | `UpdateExpenseRatesHeaders` | No | Optional headers. Set `ifMatch` to the entity's current ETag for optimistic concurrency. |

Returns: `ExpenseRate|error`

Sample code:

```ballerina
expense:ExpenseRate result = check fo->updateExpenseRates(
    "USMF",
    "MEALS",
    {rate: 48.00},
    {ifMatch: eTag}
);
```

</div>

</details>

#### Expenses

<details>
<summary>listExpenses</summary>

<div>

Lists Expenses (expense transaction) records, with optional OData query support.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `ListExpensesQueries` | No | OData query options: `skip`, `top`, `filter`, `orderby`, `expand`, `crossCompany`, `count`, `'select`. |

Returns: `ExpensesCollection|error`

Sample code:

```ballerina
expense:ExpensesCollection result = check fo->listExpenses(
    queries = {
        filter: "approvalStatus eq 'Submitted'",
        top: 25,
        'select: "expenseTransactionNumber,expenseCategory,amount,currency,merchant"
    }
);
```

</div>

</details>

<details>
<summary>createExpenses</summary>

<div>

Creates a new Expenses (expense transaction) record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `Expenses` | Yes | The Expenses record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |

Returns: `Expenses|error`

Sample code:

```ballerina
expense:Expenses payload = {
    dataAreaId: "USMF",
    expenseTransactionNumber: "EXP-000456",
    expenseCategory: "Meals",
    expenseType: "Meals",
    amount: 58.75,
    currency: "USD",
    transactionDate: "2026-08-01",
    merchant: "Downtown Bistro",
    employeePersonnelNumber: "000182",
    purpose: "Client dinner"
};
expense:Expenses result = check fo->createExpenses(payload);
```

</div>

</details>

<details>
<summary>getExpenses</summary>

<div>

Retrieves a single Expenses record by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `expenseTransactionNumber` | `string` | Yes | The expense transaction number key field, e.g. `"EXP-000456"`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `GetExpensesQueries` | No | OData query options: `expand`, `'select`. |

Returns: `Expenses|error`

Sample code:

```ballerina
expense:Expenses result = check fo->getExpenses("USMF", "EXP-000456");
```

</div>

</details>

<details>
<summary>deleteExpenses</summary>

<div>

Deletes a specific Expenses record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `expenseTransactionNumber` | `string` | Yes | The expense transaction number key field to delete. |
| `headers` | `DeleteExpensesHeaders` | No | Optional headers. Set `ifMatch` to the entity's current ETag for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteExpenses("USMF", "EXP-000456", {ifMatch: eTag});
```

</div>

</details>

<details>
<summary>updateExpenses</summary>

<div>

Updates a specific Expenses record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `expenseTransactionNumber` | `string` | Yes | The expense transaction number key field to update. |
| `payload` | `Expenses` | Yes | The fields to update. |
| `headers` | `UpdateExpensesHeaders` | No | Optional headers. Set `ifMatch` to the entity's current ETag for optimistic concurrency. |

Returns: `Expenses|error`

Sample code:

```ballerina
expense:Expenses result = check fo->updateExpenses(
    "USMF",
    "EXP-000456",
    {approvalStatus: "Approved"},
    {ifMatch: eTag}
);
```

</div>

</details>

#### Mileage Rates

<details>
<summary>listMileageRates</summary>

<div>

Lists MileageRate records, with optional OData query support.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `ListMileageRatesQueries` | No | OData query options: `skip`, `top`, `filter`, `orderby`, `expand`, `crossCompany`, `count`, `'select`. |

Returns: `MileageRatesCollection|error`

Sample code:

```ballerina
expense:MileageRatesCollection result = check fo->listMileageRates(
    queries = {
        filter: "rateType eq 'Mileage' and vehicleType eq 'Car'",
        orderby: "fromDate desc"
    }
);
```

</div>

</details>

<details>
<summary>createMileageRates</summary>

<div>

Creates a new MileageRate.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `MileageRate` | Yes | The MileageRate record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |

Returns: `MileageRate|error`

Sample code:

```ballerina
expense:MileageRate payload = {
    dataAreaId: "USMF",
    description: "Standard car mileage rate",
    expenseCategory: "Mileage",
    rate: 0.67,
    vehicleType: "Car",
    quantity: 0,
    fromDate: "2026-01-01",
    toDate: "2026-12-31",
    rateType: "Mileage"
};
expense:MileageRate result = check fo->createMileageRates(payload);
```

</div>

</details>

<details>
<summary>getMileageRates</summary>

<div>

Retrieves a single MileageRate by its composite key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `expenseCategory` | `string` | Yes | The expense category key field, e.g. `"Mileage"`. |
| `fromDate` | `string` | Yes | The rate's effective start date key field. |
| `quantity` | `decimal` | Yes | The quantity (distance tier) key field. |
| `rateType` | `string` | Yes | The rate type key field, e.g. `"Mileage"` or `"Passenger"`. |
| `vehicleType` | `string` | Yes | The vehicle type key field, e.g. `"Car"`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `GetMileageRatesQueries` | No | OData query options: `expand`, `'select`. |

Returns: `MileageRate|error`

Sample code:

```ballerina
expense:MileageRate result = check fo->getMileageRates(
    "USMF",
    "Mileage",
    "2026-01-01",
    0,
    "Mileage",
    "Car"
);
```

</div>

</details>

<details>
<summary>deleteMileageRates</summary>

<div>

Deletes a specific MileageRate.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `expenseCategory` | `string` | Yes | The expense category key field. |
| `fromDate` | `string` | Yes | The rate's effective start date key field. |
| `quantity` | `decimal` | Yes | The quantity (distance tier) key field. |
| `rateType` | `string` | Yes | The rate type key field. |
| `vehicleType` | `string` | Yes | The vehicle type key field. |
| `headers` | `DeleteMileageRatesHeaders` | No | Optional headers. Set `ifMatch` to the entity's current ETag for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteMileageRates(
    "USMF",
    "Mileage",
    "2026-01-01",
    0,
    "Mileage",
    "Car",
    {ifMatch: eTag}
);
```

</div>

</details>

<details>
<summary>updateMileageRates</summary>

<div>

Updates a specific MileageRate.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `expenseCategory` | `string` | Yes | The expense category key field. |
| `fromDate` | `string` | Yes | The rate's effective start date key field. |
| `quantity` | `decimal` | Yes | The quantity (distance tier) key field. |
| `rateType` | `string` | Yes | The rate type key field. |
| `vehicleType` | `string` | Yes | The vehicle type key field. |
| `payload` | `MileageRate` | Yes | The fields to update. |
| `headers` | `UpdateMileageRatesHeaders` | No | Optional headers. Set `ifMatch` to the entity's current ETag for optimistic concurrency. |

Returns: `MileageRate|error`

Sample code:

```ballerina
expense:MileageRate result = check fo->updateMileageRates(
    "USMF",
    "Mileage",
    "2026-01-01",
    0,
    "Mileage",
    "Car",
    {rate: 0.70},
    {ifMatch: eTag}
);
```

</div>

</details>

#### Per Diems

<details>
<summary>listPerDiems</summary>

<div>

Lists PerDiems records, with optional OData query support.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `ListPerDiemsQueries` | No | OData query options: `skip`, `top`, `filter`, `orderby`, `expand`, `crossCompany`, `count`, `'select`. |

Returns: `PerDiemsCollection|error`

Sample code:

```ballerina
expense:PerDiemsCollection result = check fo->listPerDiems(
    queries = {
        filter: "countryRegionId eq 'USA'",
        'select: "location,stateId,mealAllowance,hotelAllowance,dateFrom,dateTo"
    }
);
```

</div>

</details>

<details>
<summary>createPerDiems</summary>

<div>

Creates a new PerDiems record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `PerDiems` | Yes | The PerDiems record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |

Returns: `PerDiems|error`

Sample code:

```ballerina
expense:PerDiems payload = {
    dataAreaId: "USMF",
    location: "Seattle",
    stateId: "WA",
    countryRegionId: "USA",
    dateFrom: "2026-01-01",
    dateTo: "2026-12-31",
    currency: "USD",
    mealAllowance: 65.00,
    hotelAllowance: 180.00,
    otherAllowance: 10.00
};
expense:PerDiems result = check fo->createPerDiems(payload);
```

</div>

</details>

<details>
<summary>getPerDiems</summary>

<div>

Retrieves a single PerDiems record by its composite key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `location` | `string` | Yes | The location key field, e.g. `"Seattle"`. |
| `stateId` | `string` | Yes | The state key field, e.g. `"WA"`. |
| `countryRegionId` | `string` | Yes | The country/region key field, e.g. `"USA"`. |
| `dateFrom` | `string` | Yes | The validity start date key field. |
| `dateTo` | `string` | Yes | The validity end date key field. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `GetPerDiemsQueries` | No | OData query options: `expand`, `'select`. |

Returns: `PerDiems|error`

Sample code:

```ballerina
expense:PerDiems result = check fo->getPerDiems(
    "USMF",
    "Seattle",
    "WA",
    "USA",
    "2026-01-01",
    "2026-12-31"
);
```

</div>

</details>

<details>
<summary>deletePerDiems</summary>

<div>

Deletes a specific PerDiems record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `location` | `string` | Yes | The location key field. |
| `stateId` | `string` | Yes | The state key field. |
| `countryRegionId` | `string` | Yes | The country/region key field. |
| `dateFrom` | `string` | Yes | The validity start date key field. |
| `dateTo` | `string` | Yes | The validity end date key field. |
| `headers` | `DeletePerDiemsHeaders` | No | Optional headers. Set `ifMatch` to the entity's current ETag for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
check fo->deletePerDiems(
    "USMF",
    "Seattle",
    "WA",
    "USA",
    "2026-01-01",
    "2026-12-31",
    {ifMatch: eTag}
);
```

</div>

</details>

<details>
<summary>updatePerDiems</summary>

<div>

Updates a specific PerDiems record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `location` | `string` | Yes | The location key field. |
| `stateId` | `string` | Yes | The state key field. |
| `countryRegionId` | `string` | Yes | The country/region key field. |
| `dateFrom` | `string` | Yes | The validity start date key field. |
| `dateTo` | `string` | Yes | The validity end date key field. |
| `payload` | `PerDiems` | Yes | The fields to update. |
| `headers` | `UpdatePerDiemsHeaders` | No | Optional headers. Set `ifMatch` to the entity's current ETag for optimistic concurrency. |

Returns: `PerDiems|error`

Sample code:

```ballerina
expense:PerDiems result = check fo->updatePerDiems(
    "USMF",
    "Seattle",
    "WA",
    "USA",
    "2026-01-01",
    "2026-12-31",
    {mealAllowance: 70.00},
    {ifMatch: eTag}
);
```

</div>

</details>

#### Trv Receipts

<details>
<summary>listTrvReceipts</summary>

<div>

Lists TrvReceiptEntity (travel receipt) records, with optional OData query support.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `ListTrvReceiptsQueries` | No | OData query options: `skip`, `top`, `filter`, `orderby`, `expand`, `crossCompany`, `count`, `'select`. |

Returns: `TrvReceiptsCollection|error`

Sample code:

```ballerina
expense:TrvReceiptsCollection result = check fo->listTrvReceipts(
    queries = {
        filter: "isCreditCardExpense eq 'No'",
        'select: "documentId,name,fileName,fileType"
    }
);
```

</div>

</details>

<details>
<summary>createTrvReceipts</summary>

<div>

Creates a new TrvReceiptEntity (travel receipt), including the receipt's binary file content.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `TrvReceiptEntity` | Yes | The TrvReceiptEntity record to create, including the `fileContents` attachment. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |

Returns: `TrvReceiptEntity|error`

Sample code:

```ballerina
byte[] receiptBytes = check io:fileReadBytes("./receipt.pdf");
expense:TrvReceiptEntity payload = {
    dataAreaId: "USMF",
    documentId: "RCPT-000789",
    'resource: 1,
    name: "Taxi receipt",
    fileName: "receipt.pdf",
    fileType: "pdf",
    isCreditCardExpense: "No",
    fileContents: {
        fileContent: receiptBytes,
        fileName: "receipt.pdf"
    }
};
expense:TrvReceiptEntity result = check fo->createTrvReceipts(payload);
```

</div>

</details>

<details>
<summary>getTrvReceipts</summary>

<div>

Retrieves a single TrvReceiptEntity by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `documentId` | `string` | Yes | The document ID key field, e.g. `"RCPT-000789"`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `GetTrvReceiptsQueries` | No | OData query options: `expand`, `'select`. |

Returns: `TrvReceiptEntity|error`

Sample code:

```ballerina
expense:TrvReceiptEntity result = check fo->getTrvReceipts("USMF", "RCPT-000789");
```

</div>

</details>

<details>
<summary>deleteTrvReceipts</summary>

<div>

Deletes a specific TrvReceiptEntity.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `documentId` | `string` | Yes | The document ID key field to delete. |
| `headers` | `DeleteTrvReceiptsHeaders` | No | Optional headers. Set `ifMatch` to the entity's current ETag for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteTrvReceipts("USMF", "RCPT-000789", {ifMatch: eTag});
```

</div>

</details>

<details>
<summary>updateTrvReceipts</summary>

<div>

Updates a specific TrvReceiptEntity.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `documentId` | `string` | Yes | The document ID key field to update. |
| `payload` | `TrvReceiptEntity` | Yes | The fields to update. |
| `headers` | `UpdateTrvReceiptsHeaders` | No | Optional headers. Set `ifMatch` to the entity's current ETag for optimistic concurrency. |

Returns: `TrvReceiptEntity|error`

Sample code:

```ballerina
expense:TrvReceiptEntity result = check fo->updateTrvReceipts(
    "USMF",
    "RCPT-000789",
    {notes: "Re-submitted after manager rejection"},
    {ifMatch: eTag}
);
```

</div>

</details>
