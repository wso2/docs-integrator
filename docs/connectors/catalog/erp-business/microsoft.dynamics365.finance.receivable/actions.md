---
title: Actions
---

# Actions

The `ballerinax/microsoft.dynamics365.finance.receivable` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Provides create, read, update, and delete access to Microsoft Dynamics 365 Finance and Operations accounts receivable master data and transactional support entities via OData. |

---

## Client

Provides create, read, update, and delete access to Microsoft Dynamics 365 Finance and Operations accounts receivable master data and transactional support entities via OData.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `OAuth2ClientCredentialsGrantConfig` | Required | OAuth2 client credentials grant configuration used to authenticate with Microsoft Entra ID (`tokenUrl`, `clientId`, `clientSecret`, `scopes`). |
| `httpVersion` | `http:HttpVersion` | `http:HTTP_2_0` | HTTP protocol version to use for outbound requests. |
| `http1Settings` | `http:ClientHttp1Settings` | `{}` | Configurations related to the HTTP/1.x protocol. |
| `secureSocket` | `http:ClientSecureSocket?` | `()` | SSL/TLS configuration for secure connections. |
| `proxy` | `http:ProxyConfig?` | `()` | HTTP proxy server configuration. |

### Initializing the client

```ballerina
import ballerinax/microsoft.dynamics365.finance.receivable;

configurable string tokenUrl = ?;
configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string serviceUrl = ?;

receivable:Client fo = check new (
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

#### Adv Lines

<details>
<summary>listAdvLines</summary>

Lists customer advance payment lines tied to advance reports.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `ListAdvLinesQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `AdvLinesCollection|error`

Sample code:

```ballerina
receivable:AdvLinesCollection result = check fo->listAdvLines();
```

</details>

<details>
<summary>createAdvLines</summary>

Creates an advance payment line.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `AdvLine` | Yes | The advance line record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `AdvLine|error`

Sample code:

```ballerina
receivable:AdvLine result = check fo->createAdvLines({
    dataAreaId: "USMF",
    advanceId: "ADV-0012",
    lineNum: 1,
    currency: "USD",
    amount: 500.00d,
    mainAccount: "110110",
    disbursementDate: "2026-08-01"
});
```

</details>

<details>
<summary>getAdvLines</summary>

Retrieves an advance payment line by its composite key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `advanceId` | `string` | Yes | The advance ID key field, e.g. `"ADV-0012"`. |
| `lineNum` | `decimal` | Yes | The line number key field, e.g. `1`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `GetAdvLinesQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `AdvLine|error`

Sample code:

```ballerina
receivable:AdvLine result = check fo->getAdvLines("USMF", "ADV-0012", 1);
```

</details>

<details>
<summary>deleteAdvLines</summary>

Deletes an advance payment line.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `advanceId` | `string` | Yes | The advance ID key field. |
| `lineNum` | `decimal` | Yes | The line number key field. |
| `headers` | `DeleteAdvLinesHeaders` | No | Optional `ifMatch` ETag for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
error? result = fo->deleteAdvLines("USMF", "ADV-0012", 1);
```

</details>

<details>
<summary>updateAdvLines</summary>

Updates an advance payment line.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `advanceId` | `string` | Yes | The advance ID key field. |
| `lineNum` | `decimal` | Yes | The line number key field. |
| `payload` | `AdvLine` | Yes | The fields to update. |
| `headers` | `UpdateAdvLinesHeaders` | No | Optional `ifMatch` ETag for optimistic concurrency. |

Returns: `AdvLine|error`

Sample code:

```ballerina
receivable:AdvLine result = check fo->updateAdvLines("USMF", "ADV-0012", 1, {
    amount: 550.00d
});
```

</details>

#### Cust Disputes

<details>
<summary>listCustDisputes</summary>

Lists customer dispute records used to track promise-to-pay and dispute resolution workflows.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `ListCustDisputesQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `CustDisputesCollection|error`

Sample code:

```ballerina
receivable:CustDisputesCollection result = check fo->listCustDisputes();
```

</details>

<details>
<summary>createCustDisputes</summary>

Creates a customer dispute record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CustDispute` | Yes | The customer dispute record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `CustDispute|error`

Sample code:

```ballerina
receivable:CustDispute result = check fo->createCustDisputes({
    dataAreaId: "USMF",
    custTrans: 100234,
    status: "Disputed",
    reasonCode: "QUALITY",
    reasonComment: "Customer disputes invoice amount due to a quality issue",
    followUpDate: "2026-09-01"
});
```

</details>

<details>
<summary>getCustDisputes</summary>

Retrieves a customer dispute record by its composite key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `sysRecId` | `int` | Yes | The internal record ID key field, e.g. `5637144576`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `GetCustDisputesQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `CustDispute|error`

Sample code:

```ballerina
receivable:CustDispute result = check fo->getCustDisputes("USMF", 5637144576);
```

</details>

<details>
<summary>deleteCustDisputes</summary>

Deletes a customer dispute record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `sysRecId` | `int` | Yes | The internal record ID key field. |
| `headers` | `DeleteCustDisputesHeaders` | No | Optional `ifMatch` ETag for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
error? result = fo->deleteCustDisputes("USMF", 5637144576);
```

</details>

<details>
<summary>updateCustDisputes</summary>

Updates a customer dispute record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `sysRecId` | `int` | Yes | The internal record ID key field. |
| `payload` | `CustDispute` | Yes | The fields to update. |
| `headers` | `UpdateCustDisputesHeaders` | No | Optional `ifMatch` ETag for optimistic concurrency. |

Returns: `CustDispute|error`

Sample code:

```ballerina
receivable:CustDispute result = check fo->updateCustDisputes("USMF", 5637144576, {
    status: "Resolved"
});
```

</details>

#### Custom APIs

<details>
<summary>listCustomApis</summary>

Lists custom API extensibility entities registered in the environment.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `ListCustomApisQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `CustomApisCollection|error`

Sample code:

```ballerina
receivable:CustomApisCollection result = check fo->listCustomApis();
```

</details>

<details>
<summary>createCustomApis</summary>

Registers a custom API entity.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CustomApi` | Yes | The custom API record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `CustomApi|error`

Sample code:

```ballerina
receivable:CustomApi result = check fo->createCustomApis({
    entityTable: "CustTable",
    entityName: "CustomersV2"
});
```

</details>

<details>
<summary>getCustomApis</summary>

Retrieves a custom API entity by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `entityName` | `string` | Yes | The entity name key field, e.g. `"CustomersV2"`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `GetCustomApisQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `CustomApi|error`

Sample code:

```ballerina
receivable:CustomApi result = check fo->getCustomApis("CustomersV2");
```

</details>

<details>
<summary>deleteCustomApis</summary>

Deletes a custom API entity.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `entityName` | `string` | Yes | The entity name key field. |
| `headers` | `DeleteCustomApisHeaders` | No | Optional `ifMatch` ETag for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
error? result = fo->deleteCustomApis("CustomersV2");
```

</details>

<details>
<summary>updateCustomApis</summary>

Updates a custom API entity.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `entityName` | `string` | Yes | The entity name key field. |
| `payload` | `CustomApi` | Yes | The fields to update. |
| `headers` | `UpdateCustomApisHeaders` | No | Optional `ifMatch` ETag for optimistic concurrency. |

Returns: `CustomApi|error`

Sample code:

```ballerina
receivable:CustomApi result = check fo->updateCustomApis("CustomersV2", {
    entityTable: "CustTableExtended"
});
```

</details>

#### Custom Fields

<details>
<summary>listCustomFields</summary>

Lists custom field extensibility entities registered in the environment.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `ListCustomFieldsQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `CustomFieldsCollection|error`

Sample code:

```ballerina
receivable:CustomFieldsCollection result = check fo->listCustomFields();
```

</details>

<details>
<summary>createCustomFields</summary>

Creates a custom field entity.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CustomField` | Yes | The custom field record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `CustomField|error`

Sample code:

```ballerina
receivable:CustomField result = check fo->createCustomFields({
    dataAreaId: "USMF",
    customField: "LOYALTYTIER",
    dataType: "Text",
    description: "Customer loyalty tier",
    defaultText: "Standard"
});
```

</details>

<details>
<summary>getCustomFields</summary>

Retrieves a custom field entity by its composite key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `customField` | `string` | Yes | The custom field key field, e.g. `"LOYALTYTIER"`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `GetCustomFieldsQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `CustomField|error`

Sample code:

```ballerina
receivable:CustomField result = check fo->getCustomFields("USMF", "LOYALTYTIER");
```

</details>

<details>
<summary>deleteCustomFields</summary>

Deletes a custom field entity.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `customField` | `string` | Yes | The custom field key field. |
| `headers` | `DeleteCustomFieldsHeaders` | No | Optional `ifMatch` ETag for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
error? result = fo->deleteCustomFields("USMF", "LOYALTYTIER");
```

</details>

<details>
<summary>updateCustomFields</summary>

Updates a custom field entity.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `customField` | `string` | Yes | The custom field key field. |
| `payload` | `CustomField` | Yes | The fields to update. |
| `headers` | `UpdateCustomFieldsHeaders` | No | Optional `ifMatch` ETag for optimistic concurrency. |

Returns: `CustomField|error`

Sample code:

```ballerina
receivable:CustomField result = check fo->updateCustomFields("USMF", "LOYALTYTIER", {
    description: "Customer loyalty tier (revised)"
});
```

</details>

#### Custom Offices

<details>
<summary>listCustomOffices</summary>

Lists custom office extensibility entities that associate agents with office codes.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `ListCustomOfficesQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `CustomOfficesCollection|error`

Sample code:

```ballerina
receivable:CustomOfficesCollection result = check fo->listCustomOffices();
```

</details>

<details>
<summary>createCustomOffices</summary>

Creates a custom office entity.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CustomOffices` | Yes | The custom office record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `CustomOffices|error`

Sample code:

```ballerina
receivable:CustomOffices result = check fo->createCustomOffices({
    dataAreaId: "USMF",
    agentAccountNumber: "AG-1001",
    officeCode: "NYC01"
});
```

</details>

<details>
<summary>getCustomOffices</summary>

Retrieves a custom office entity by its composite key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `agentAccountNumber` | `string` | Yes | The agent account number key field, e.g. `"AG-1001"`. |
| `officeCode` | `string` | Yes | The office code key field, e.g. `"NYC01"`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `GetCustomOfficesQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `CustomOffices|error`

Sample code:

```ballerina
receivable:CustomOffices result = check fo->getCustomOffices("USMF", "AG-1001", "NYC01");
```

</details>

<details>
<summary>deleteCustomOffices</summary>

Deletes a custom office entity.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `agentAccountNumber` | `string` | Yes | The agent account number key field. |
| `officeCode` | `string` | Yes | The office code key field. |
| `headers` | `DeleteCustomOfficesHeaders` | No | Optional `ifMatch` ETag for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
error? result = fo->deleteCustomOffices("USMF", "AG-1001", "NYC01");
```

</details>

<details>
<summary>updateCustomOffices</summary>

Updates a custom office entity.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `agentAccountNumber` | `string` | Yes | The agent account number key field. |
| `officeCode` | `string` | Yes | The office code key field. |
| `payload` | `CustomOffices` | Yes | The fields to update. |
| `headers` | `UpdateCustomOfficesHeaders` | No | Optional `ifMatch` ETag for optimistic concurrency. |

Returns: `CustomOffices|error`

Sample code:

```ballerina
receivable:CustomOffices result = check fo->updateCustomOffices("USMF", "AG-1001", "NYC01", {
    officeCode: "NYC01"
});
```

</details>

#### Debt Periods

<details>
<summary>listDebtPeriods</summary>

Lists debt collection aging periods used for aging analysis.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `ListDebtPeriodsQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `DebtPeriodsCollection|error`

Sample code:

```ballerina
receivable:DebtPeriodsCollection result = check fo->listDebtPeriods();
```

</details>

<details>
<summary>createDebtPeriods</summary>

Creates a debt collection aging period.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `DebtPeriod` | Yes | The debt period record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `DebtPeriod|error`

Sample code:

```ballerina
receivable:DebtPeriod result = check fo->createDebtPeriods({
    dataAreaId: "USMF",
    description: "0-30 days overdue",
    debtType: "Debit",
    periodDebtType: "Bad",
    percent: 5.0d,
    registerField: "CustTrans",
    'by: 30,
    'from: 0
});
```

</details>

<details>
<summary>getDebtPeriods</summary>

Retrieves a debt collection aging period by its composite key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `debtType` | `string` | Yes | The debt type key field, e.g. `"Debit"`. |
| `periodDebtType` | `string` | Yes | The period debt type key field, e.g. `"Bad"`. |
| `'from` | `int` | Yes | The lower bound of the aging range, e.g. `0`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `GetDebtPeriodsQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `DebtPeriod|error`

Sample code:

```ballerina
receivable:DebtPeriod result = check fo->getDebtPeriods("USMF", "Debit", "Bad", 0);
```

</details>

<details>
<summary>deleteDebtPeriods</summary>

Deletes a debt collection aging period.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `debtType` | `string` | Yes | The debt type key field. |
| `periodDebtType` | `string` | Yes | The period debt type key field. |
| `'from` | `int` | Yes | The lower bound of the aging range. |
| `headers` | `DeleteDebtPeriodsHeaders` | No | Optional `ifMatch` ETag for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
error? result = fo->deleteDebtPeriods("USMF", "Debit", "Bad", 0);
```

</details>

<details>
<summary>updateDebtPeriods</summary>

Updates a debt collection aging period.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `debtType` | `string` | Yes | The debt type key field. |
| `periodDebtType` | `string` | Yes | The period debt type key field. |
| `'from` | `int` | Yes | The lower bound of the aging range. |
| `payload` | `DebtPeriod` | Yes | The fields to update. |
| `headers` | `UpdateDebtPeriodsHeaders` | No | Optional `ifMatch` ETag for optimistic concurrency. |

Returns: `DebtPeriod|error`

Sample code:

```ballerina
receivable:DebtPeriod result = check fo->updateDebtPeriods("USMF", "Debit", "Bad", 0, {
    percent: 6.0d
});
```

</details>

#### Due Date Limits

<details>
<summary>listDueDateLimits</summary>

Lists due date limits used to determine invoice payment terms.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `ListDueDateLimitsQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `DueDateLimitsCollection|error`

Sample code:

```ballerina
receivable:DueDateLimitsCollection result = check fo->listDueDateLimits();
```

</details>

<details>
<summary>createDueDateLimits</summary>

Creates a due date limit.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `DueDateLimit` | Yes | The due date limit record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `DueDateLimit|error`

Sample code:

```ballerina
receivable:DueDateLimit result = check fo->createDueDateLimits({
    dataAreaId: "USMF",
    dueDateLimit: "NET30",
    startDate: "2026-01-01",
    periodInterval: "Day",
    numberOfUnits: 30,
    description: "Net 30 days"
});
```

</details>

<details>
<summary>getDueDateLimits</summary>

Retrieves a due date limit by its composite key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `dueDateLimit` | `string` | Yes | The due date limit key field, e.g. `"NET30"`. |
| `startDate` | `string` | Yes | The start date key field, e.g. `"2026-01-01"`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `GetDueDateLimitsQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `DueDateLimit|error`

Sample code:

```ballerina
receivable:DueDateLimit result = check fo->getDueDateLimits("USMF", "NET30", "2026-01-01");
```

</details>

<details>
<summary>deleteDueDateLimits</summary>

Deletes a due date limit.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `dueDateLimit` | `string` | Yes | The due date limit key field. |
| `startDate` | `string` | Yes | The start date key field. |
| `headers` | `DeleteDueDateLimitsHeaders` | No | Optional `ifMatch` ETag for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
error? result = fo->deleteDueDateLimits("USMF", "NET30", "2026-01-01");
```

</details>

<details>
<summary>updateDueDateLimits</summary>

Updates a due date limit.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `dueDateLimit` | `string` | Yes | The due date limit key field. |
| `startDate` | `string` | Yes | The start date key field. |
| `payload` | `DueDateLimit` | Yes | The fields to update. |
| `headers` | `UpdateDueDateLimitsHeaders` | No | Optional `ifMatch` ETag for optimistic concurrency. |

Returns: `DueDateLimit|error`

Sample code:

```ballerina
receivable:DueDateLimit result = check fo->updateDueDateLimits("USMF", "NET30", "2026-01-01", {
    numberOfUnits: 45
});
```

</details>

#### Plafonds

<details>
<summary>listPlafonds</summary>

Lists Italian VAT export plafond (tax exemption ceiling) records.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `ListPlafondsQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `PlafondsCollection|error`

Sample code:

```ballerina
receivable:PlafondsCollection result = check fo->listPlafonds();
```

</details>

<details>
<summary>createPlafonds</summary>

Creates a VAT export plafond record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `Plafond` | Yes | The plafond record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `Plafond|error`

Sample code:

```ballerina
receivable:Plafond result = check fo->createPlafonds({
    dataAreaId: "ITMF",
    plafondId: "PLF-2026",
    description: "2026 export VAT plafond",
    plafondType: "Fixed",
    limitType: "Amount",
    limitAmount: 100000.00d,
    fromDate: "2026-01-01",
    toDate: "2026-12-31"
});
```

</details>

<details>
<summary>getPlafonds</summary>

Retrieves a VAT export plafond record by its composite key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"ITMF"`. |
| `plafondId` | `string` | Yes | The plafond ID key field, e.g. `"PLF-2026"`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `GetPlafondsQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `Plafond|error`

Sample code:

```ballerina
receivable:Plafond result = check fo->getPlafonds("ITMF", "PLF-2026");
```

</details>

<details>
<summary>deletePlafonds</summary>

Deletes a VAT export plafond record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `plafondId` | `string` | Yes | The plafond ID key field. |
| `headers` | `DeletePlafondsHeaders` | No | Optional `ifMatch` ETag for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
error? result = fo->deletePlafonds("ITMF", "PLF-2026");
```

</details>

<details>
<summary>updatePlafonds</summary>

Updates a VAT export plafond record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `plafondId` | `string` | Yes | The plafond ID key field. |
| `payload` | `Plafond` | Yes | The fields to update. |
| `headers` | `UpdatePlafondsHeaders` | No | Optional `ifMatch` ETag for optimistic concurrency. |

Returns: `Plafond|error`

Sample code:

```ballerina
receivable:Plafond result = check fo->updatePlafonds("ITMF", "PLF-2026", {
    limitAmount: 120000.00d
});
```

</details>

#### Return Details

<details>
<summary>listReturnDetails</summary>

Lists sales return details used in return merchandise authorization processing.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `ListReturnDetailsQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `ReturnDetailsCollection|error`

Sample code:

```ballerina
receivable:ReturnDetailsCollection result = check fo->listReturnDetails();
```

</details>

<details>
<summary>createReturnDetails</summary>

Creates a sales return detail record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `ReturnDetail` | Yes | The return detail record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `ReturnDetail|error`

Sample code:

```ballerina
receivable:ReturnDetail result = check fo->createReturnDetails({
    dataAreaId: "USMF",
    returnID: "RMA-1045",
    orderNumber: "SO-58821",
    orderType: "SalesOrder",
    accountNum: "CUST-3021",
    returnAddressName: "Returns Center",
    carrierCode: "FEDEX"
});
```

</details>

<details>
<summary>getReturnDetails</summary>

Retrieves a sales return detail record by its composite key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `returnID` | `string` | Yes | The return ID key field, e.g. `"RMA-1045"`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `GetReturnDetailsQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `ReturnDetail|error`

Sample code:

```ballerina
receivable:ReturnDetail result = check fo->getReturnDetails("USMF", "RMA-1045");
```

</details>

<details>
<summary>deleteReturnDetails</summary>

Deletes a sales return detail record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `returnID` | `string` | Yes | The return ID key field. |
| `headers` | `DeleteReturnDetailsHeaders` | No | Optional `ifMatch` ETag for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
error? result = fo->deleteReturnDetails("USMF", "RMA-1045");
```

</details>

<details>
<summary>updateReturnDetails</summary>

Updates a sales return detail record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `returnID` | `string` | Yes | The return ID key field. |
| `payload` | `ReturnDetail` | Yes | The fields to update. |
| `headers` | `UpdateReturnDetailsHeaders` | No | Optional `ifMatch` ETag for optimistic concurrency. |

Returns: `ReturnDetail|error`

Sample code:

```ballerina
receivable:ReturnDetail result = check fo->updateReturnDetails("USMF", "RMA-1045", {
    carrierServiceCode: "GROUND"
});
```

</details>

#### Sales Carriers

<details>
<summary>listSalesCarriers</summary>

Lists sales carriers used for shipment and return processing.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `ListSalesCarriersQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `SalesCarriersCollection|error`

Sample code:

```ballerina
receivable:SalesCarriersCollection result = check fo->listSalesCarriers();
```

</details>

<details>
<summary>createSalesCarriers</summary>

Creates a sales carrier.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `SalesCarrier` | Yes | The sales carrier record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `SalesCarrier|error`

Sample code:

```ballerina
receivable:SalesCarrier result = check fo->createSalesCarriers({
    dataAreaId: "USMF",
    carrierName: "Global Freight Co",
    vendor: "VEND-4021",
    addressCity: "New York",
    addressCountryRegionId: "USA"
});
```

</details>

<details>
<summary>getSalesCarriers</summary>

Retrieves a sales carrier by its composite key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `carrierName` | `string` | Yes | The carrier name key field, e.g. `"Global Freight Co"`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `GetSalesCarriersQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `SalesCarrier|error`

Sample code:

```ballerina
receivable:SalesCarrier result = check fo->getSalesCarriers("USMF", "Global Freight Co");
```

</details>

<details>
<summary>deleteSalesCarriers</summary>

Deletes a sales carrier.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `carrierName` | `string` | Yes | The carrier name key field. |
| `headers` | `DeleteSalesCarriersHeaders` | No | Optional `ifMatch` ETag for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
error? result = fo->deleteSalesCarriers("USMF", "Global Freight Co");
```

</details>

<details>
<summary>updateSalesCarriers</summary>

Updates a sales carrier.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `carrierName` | `string` | Yes | The carrier name key field. |
| `payload` | `SalesCarrier` | Yes | The fields to update. |
| `headers` | `UpdateSalesCarriersHeaders` | No | Optional `ifMatch` ETag for optimistic concurrency. |

Returns: `SalesCarrier|error`

Sample code:

```ballerina
receivable:SalesCarrier result = check fo->updateSalesCarriers("USMF", "Global Freight Co", {
    addressCity: "Newark"
});
```

</details>

#### Sales Lists

<details>
<summary>listSalesLists</summary>

Lists EU sales lists used for cross-border VAT reporting.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `ListSalesListsQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `SalesListsCollection|error`

Sample code:

```ballerina
receivable:SalesListsCollection result = check fo->listSalesLists();
```

</details>

<details>
<summary>createSalesLists</summary>

Creates an EU sales list record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `SalesList` | Yes | The sales list record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `SalesList|error`

Sample code:

```ballerina
receivable:SalesList result = check fo->createSalesLists({
    dataAreaId: "ESMF",
    dispatchId: "DISP-2026-Q1",
    status: "Include",
    number: 1,
    direction: "Sales",
    year: 2026,
    quarter: "Q1",
    companyTaxID: "ESB12345678"
});
```

</details>

<details>
<summary>getSalesLists</summary>

Retrieves an EU sales list record by its composite key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"ESMF"`. |
| `status` | `string` | Yes | The status key field, e.g. `"Include"`. |
| `dispatchId` | `string` | Yes | The dispatch ID key field, e.g. `"DISP-2026-Q1"`. |
| `number` | `int` | Yes | The sales list number key field, e.g. `1`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `GetSalesListsQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `SalesList|error`

Sample code:

```ballerina
receivable:SalesList result = check fo->getSalesLists("ESMF", "Include", "DISP-2026-Q1", 1);
```

</details>

<details>
<summary>deleteSalesLists</summary>

Deletes an EU sales list record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `status` | `string` | Yes | The status key field. |
| `dispatchId` | `string` | Yes | The dispatch ID key field. |
| `number` | `int` | Yes | The sales list number key field. |
| `headers` | `DeleteSalesListsHeaders` | No | Optional `ifMatch` ETag for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
error? result = fo->deleteSalesLists("ESMF", "Include", "DISP-2026-Q1", 1);
```

</details>

<details>
<summary>updateSalesLists</summary>

Updates an EU sales list record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `status` | `string` | Yes | The status key field. |
| `dispatchId` | `string` | Yes | The dispatch ID key field. |
| `number` | `int` | Yes | The sales list number key field. |
| `payload` | `SalesList` | Yes | The fields to update. |
| `headers` | `UpdateSalesListsHeaders` | No | Optional `ifMatch` ETag for optimistic concurrency. |

Returns: `SalesList|error`

Sample code:

```ballerina
receivable:SalesList result = check fo->updateSalesLists("ESMF", "Include", "DISP-2026-Q1", 1, {
    status: "Reported"
});
```

</details>
