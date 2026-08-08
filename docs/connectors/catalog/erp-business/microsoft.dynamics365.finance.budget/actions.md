---
title: Actions
---

# Actions

The `ballerinax/microsoft.dynamics365.finance.budget` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Provides access to Microsoft Dynamics 365 Finance Budget entities (budget codes, cycles, models, plans, cost centers, cost groups, funds, and cheque/promissory note entities) via OData. |

---

## Client

Provides access to Microsoft Dynamics 365 Finance Budget entities (budget codes, cycles, models, plans, cost centers, cost groups, funds, and cheque/promissory note entities) via OData.

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
import ballerinax/microsoft.dynamics365.finance.budget;

configurable string tokenUrl = ?;
configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string serviceUrl = ?;

budget:Client fo = check new (
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

#### Budget Codes

<details>
<summary>listBudgetCodes</summary>

Lists BudgetCode records, with optional OData query support.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `ListBudgetCodesQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `BudgetCodesCollection|error`

Sample code:

```ballerina
budget:BudgetCodesCollection result = check fo->listBudgetCodes();
```

</details>

<details>
<summary>createBudgetCodes</summary>

Creates a new BudgetCode.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `BudgetCode` | Yes | The BudgetCode record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |

Returns: `BudgetCode|error`

Sample code:

```ballerina
budget:BudgetCode payload = {
    dataAreaId: "USMF",
    budgetCode: "OPBUD",
    description: "Original budget",
    budgetType: "OriginalBudget",
    isDefaultCode: "Yes"
};
budget:BudgetCode result = check fo->createBudgetCodes(payload);
```

</details>

<details>
<summary>getBudgetCodes</summary>

Retrieves a single BudgetCode by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `budgetCode` | `string` | Yes | The budget code key field, e.g. `"OPBUD"`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `GetBudgetCodesQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `BudgetCode|error`

Sample code:

```ballerina
budget:BudgetCode result = check fo->getBudgetCodes("USMF", "OPBUD");
```

</details>

<details>
<summary>deleteBudgetCodes</summary>

Deletes a BudgetCode by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `budgetCode` | `string` | Yes | The budget code key field, e.g. `"OPBUD"`. |
| `headers` | `DeleteBudgetCodesHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteBudgetCodes("USMF", "OPBUD");
```

</details>

<details>
<summary>updateBudgetCodes</summary>

Updates an existing BudgetCode.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `budgetCode` | `string` | Yes | The budget code key field, e.g. `"OPBUD"`. |
| `payload` | `BudgetCode` | Yes | The fields to update. |
| `headers` | `UpdateBudgetCodesHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `BudgetCode|error`

Sample code:

```ballerina
budget:BudgetCode payload = {
    description: "Original budget - revised"
};
budget:BudgetCode result = check fo->updateBudgetCodes("USMF", "OPBUD", payload);
```

</details>

#### Budget Cycles

<details>
<summary>listBudgetCycles</summary>

Lists BudgetCycle records, with optional OData query support.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `ListBudgetCyclesQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `BudgetCyclesCollection|error`

Sample code:

```ballerina
budget:BudgetCyclesCollection result = check fo->listBudgetCycles();
```

</details>

<details>
<summary>createBudgetCycles</summary>

Creates a new BudgetCycle.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `BudgetCycle` | Yes | The BudgetCycle record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |

Returns: `BudgetCycle|error`

Sample code:

```ballerina
budget:BudgetCycle payload = {
    budgetCycleTimeSpanName: "FY",
    fiscalCalendar: "Fiscal",
    budgetCycleName: "FY2026",
    startDate: "2026-01-01",
    endDate: "2026-12-31",
    numberOfFiscalPeriods: 12,
    lengthOfBudgetCycle: "MapToFiscalYear"
};
budget:BudgetCycle result = check fo->createBudgetCycles(payload);
```

</details>

<details>
<summary>getBudgetCycles</summary>

Retrieves a single BudgetCycle by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `budgetCycleTimeSpanName` | `string` | Yes | The budget cycle time span name key field, e.g. `"FY"`. |
| `fiscalCalendar` | `string` | Yes | The fiscal calendar key field, e.g. `"Fiscal"`. |
| `budgetCycleName` | `string` | Yes | The budget cycle name key field, e.g. `"FY2026"`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `GetBudgetCyclesQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `BudgetCycle|error`

Sample code:

```ballerina
budget:BudgetCycle result = check fo->getBudgetCycles("FY", "Fiscal", "FY2026");
```

</details>

<details>
<summary>deleteBudgetCycles</summary>

Deletes a BudgetCycle by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `budgetCycleTimeSpanName` | `string` | Yes | The budget cycle time span name key field, e.g. `"FY"`. |
| `fiscalCalendar` | `string` | Yes | The fiscal calendar key field, e.g. `"Fiscal"`. |
| `budgetCycleName` | `string` | Yes | The budget cycle name key field, e.g. `"FY2026"`. |
| `headers` | `DeleteBudgetCyclesHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteBudgetCycles("FY", "Fiscal", "FY2026");
```

</details>

<details>
<summary>updateBudgetCycles</summary>

Updates an existing BudgetCycle.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `budgetCycleTimeSpanName` | `string` | Yes | The budget cycle time span name key field, e.g. `"FY"`. |
| `fiscalCalendar` | `string` | Yes | The fiscal calendar key field, e.g. `"Fiscal"`. |
| `budgetCycleName` | `string` | Yes | The budget cycle name key field, e.g. `"FY2026"`. |
| `payload` | `BudgetCycle` | Yes | The fields to update. |
| `headers` | `UpdateBudgetCyclesHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `BudgetCycle|error`

Sample code:

```ballerina
budget:BudgetCycle payload = {
    endDate: "2026-12-31"
};
budget:BudgetCycle result = check fo->updateBudgetCycles("FY", "Fiscal", "FY2026", payload);
```

</details>

#### Budget Models

<details>
<summary>listBudgetModels</summary>

Lists BudgetModel records, with optional OData query support.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `ListBudgetModelsQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `BudgetModelsCollection|error`

Sample code:

```ballerina
budget:BudgetModelsCollection result = check fo->listBudgetModels();
```

</details>

<details>
<summary>createBudgetModels</summary>

Creates a new BudgetModel.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `BudgetModel` | Yes | The BudgetModel record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |

Returns: `BudgetModel|error`

Sample code:

```ballerina
budget:BudgetModel payload = {
    dataAreaId: "USMF",
    budgetModel: "BM-BASE",
    name: "Base budget model",
    stopped: "No",
    cashFlowForecasts: "No"
};
budget:BudgetModel result = check fo->createBudgetModels(payload);
```

</details>

<details>
<summary>getBudgetModels</summary>

Retrieves a single BudgetModel by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `budgetModel` | `string` | Yes | The budget model key field, e.g. `"BM-BASE"`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `GetBudgetModelsQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `BudgetModel|error`

Sample code:

```ballerina
budget:BudgetModel result = check fo->getBudgetModels("USMF", "BM-BASE");
```

</details>

<details>
<summary>deleteBudgetModels</summary>

Deletes a BudgetModel by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `budgetModel` | `string` | Yes | The budget model key field, e.g. `"BM-BASE"`. |
| `headers` | `DeleteBudgetModelsHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteBudgetModels("USMF", "BM-BASE");
```

</details>

<details>
<summary>updateBudgetModels</summary>

Updates an existing BudgetModel.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `budgetModel` | `string` | Yes | The budget model key field, e.g. `"BM-BASE"`. |
| `payload` | `BudgetModel` | Yes | The fields to update. |
| `headers` | `UpdateBudgetModelsHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `BudgetModel|error`

Sample code:

```ballerina
budget:BudgetModel payload = {
    name: "Base budget model - updated"
};
budget:BudgetModel result = check fo->updateBudgetModels("USMF", "BM-BASE", payload);
```

</details>

#### Budget Plan Processes

<details>
<summary>listBudgetPlanProcesses</summary>

Lists BudgetPlanProcess records, with optional OData query support.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `ListBudgetPlanProcessesQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `BudgetPlanProcessesCollection|error`

Sample code:

```ballerina
budget:BudgetPlanProcessesCollection result = check fo->listBudgetPlanProcesses();
```

</details>

<details>
<summary>createBudgetPlanProcesses</summary>

Creates a new BudgetPlanProcess.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `BudgetPlanProcess` | Yes | The BudgetPlanProcess record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |

Returns: `BudgetPlanProcess|error`

Sample code:

```ballerina
budget:BudgetPlanProcess payload = {
    name: "BPP-2026-OPEX",
    description: "FY2026 operating expense budget planning",
    budgetCycle: "FY2026",
    budgetCycleTimeSpan: "FY",
    ledger: "USMF-Ledger",
    fiscalCalendarId: "Fiscal",
    approvalProcessState: "Draft"
};
budget:BudgetPlanProcess result = check fo->createBudgetPlanProcesses(payload);
```

</details>

<details>
<summary>getBudgetPlanProcesses</summary>

Retrieves a single BudgetPlanProcess by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `name` | `string` | Yes | The name key field, e.g. `"BPP-2026-OPEX"`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `GetBudgetPlanProcessesQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `BudgetPlanProcess|error`

Sample code:

```ballerina
budget:BudgetPlanProcess result = check fo->getBudgetPlanProcesses("BPP-2026-OPEX");
```

</details>

<details>
<summary>deleteBudgetPlanProcesses</summary>

Deletes a BudgetPlanProcess by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `name` | `string` | Yes | The name key field, e.g. `"BPP-2026-OPEX"`. |
| `headers` | `DeleteBudgetPlanProcessesHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteBudgetPlanProcesses("BPP-2026-OPEX");
```

</details>

<details>
<summary>updateBudgetPlanProcesses</summary>

Updates an existing BudgetPlanProcess.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `name` | `string` | Yes | The name key field, e.g. `"BPP-2026-OPEX"`. |
| `payload` | `BudgetPlanProcess` | Yes | The fields to update. |
| `headers` | `UpdateBudgetPlanProcessesHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `BudgetPlanProcess|error`

Sample code:

```ballerina
budget:BudgetPlanProcess payload = {
    approvalProcessState: "InProcess"
};
budget:BudgetPlanProcess result = check fo->updateBudgetPlanProcesses("BPP-2026-OPEX", payload);
```

</details>

#### Budget Plans

<details>
<summary>listBudgetPlans</summary>

Lists BudgetPlan records, with optional OData query support.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `ListBudgetPlansQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `BudgetPlansCollection|error`

Sample code:

```ballerina
budget:BudgetPlansCollection result = check fo->listBudgetPlans();
```

</details>

<details>
<summary>createBudgetPlans</summary>

Creates a new BudgetPlan.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `BudgetPlan` | Yes | The BudgetPlan record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |

Returns: `BudgetPlan|error`

Sample code:

```ballerina
budget:BudgetPlan payload = {
    documentNumber: "BP-000123",
    scenario: "Base",
    lineReferenceId: "1",
    budgetClass: "Expense",
    currency: "USD",
    estimateType: "Monetary",
    transactionCurrencyAmount: 25000.00,
    documentStatus: "Draft",
    workflowStatus: "NotSubmitted"
};
budget:BudgetPlan result = check fo->createBudgetPlans(payload);
```

</details>

<details>
<summary>getBudgetPlans</summary>

Retrieves a single BudgetPlan by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `documentNumber` | `string` | Yes | The document number key field, e.g. `"BP-000123"`. |
| `scenario` | `string` | Yes | The scenario key field, e.g. `"Base"`. |
| `lineReferenceId` | `string` | Yes | The line reference id key field, e.g. `"1"`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `GetBudgetPlansQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `BudgetPlan|error`

Sample code:

```ballerina
budget:BudgetPlan result = check fo->getBudgetPlans("BP-000123", "Base", "1");
```

</details>

<details>
<summary>deleteBudgetPlans</summary>

Deletes a BudgetPlan by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `documentNumber` | `string` | Yes | The document number key field, e.g. `"BP-000123"`. |
| `scenario` | `string` | Yes | The scenario key field, e.g. `"Base"`. |
| `lineReferenceId` | `string` | Yes | The line reference id key field, e.g. `"1"`. |
| `headers` | `DeleteBudgetPlansHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteBudgetPlans("BP-000123", "Base", "1");
```

</details>

<details>
<summary>updateBudgetPlans</summary>

Updates an existing BudgetPlan.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `documentNumber` | `string` | Yes | The document number key field, e.g. `"BP-000123"`. |
| `scenario` | `string` | Yes | The scenario key field, e.g. `"Base"`. |
| `lineReferenceId` | `string` | Yes | The line reference id key field, e.g. `"1"`. |
| `payload` | `BudgetPlan` | Yes | The fields to update. |
| `headers` | `UpdateBudgetPlansHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `BudgetPlan|error`

Sample code:

```ballerina
budget:BudgetPlan payload = {
    documentStatus: "Finalized"
};
budget:BudgetPlan result = check fo->updateBudgetPlans("BP-000123", "Base", "1", payload);
```

</details>

#### CP Journals

<details>
<summary>listCPJournals</summary>

Lists CPJournal (cheque and promissory note journal) records, with optional OData query support.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `ListCPJournalsQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `CPJournalsCollection|error`

Sample code:

```ballerina
budget:CPJournalsCollection result = check fo->listCPJournals();
```

</details>

<details>
<summary>createCPJournals</summary>

Creates a new CPJournal.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CPJournal` | Yes | The CPJournal record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |

Returns: `CPJournal|error`

Sample code:

```ballerina
budget:CPJournal payload = {
    dataAreaId: "USMF",
    chequeJournalNum: "CHJ-000045",
    description: "Vendor cheque batch - August",
    accountType: "Vendor",
    portfolioCode: "PORT-01",
    transDate: "2026-08-05",
    posted: "No"
};
budget:CPJournal result = check fo->createCPJournals(payload);
```

</details>

<details>
<summary>getCPJournals</summary>

Retrieves a single CPJournal by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `chequeJournalNum` | `string` | Yes | The cheque journal num key field, e.g. `"CHJ-000045"`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `GetCPJournalsQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `CPJournal|error`

Sample code:

```ballerina
budget:CPJournal result = check fo->getCPJournals("USMF", "CHJ-000045");
```

</details>

<details>
<summary>deleteCPJournals</summary>

Deletes a CPJournal by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `chequeJournalNum` | `string` | Yes | The cheque journal num key field, e.g. `"CHJ-000045"`. |
| `headers` | `DeleteCPJournalsHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteCPJournals("USMF", "CHJ-000045");
```

</details>

<details>
<summary>updateCPJournals</summary>

Updates an existing CPJournal.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `chequeJournalNum` | `string` | Yes | The cheque journal num key field, e.g. `"CHJ-000045"`. |
| `payload` | `CPJournal` | Yes | The fields to update. |
| `headers` | `UpdateCPJournalsHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `CPJournal|error`

Sample code:

```ballerina
budget:CPJournal payload = {
    posted: "Yes"
};
budget:CPJournal result = check fo->updateCPJournals("USMF", "CHJ-000045", payload);
```

</details>

#### CP Parameters

<details>
<summary>listCPParameters</summary>

Lists CPParameter (cheque and promissory note module parameter) records, with optional OData query support.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `ListCPParametersQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `CPParametersCollection|error`

Sample code:

```ballerina
budget:CPParametersCollection result = check fo->listCPParameters();
```

</details>

<details>
<summary>createCPParameters</summary>

Creates a new CPParameter.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CPParameter` | Yes | The CPParameter record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |

Returns: `CPParameter|error`

Sample code:

```ballerina
budget:CPParameter payload = {
    dataAreaId: "USMF",
    settledRule: "Warning",
    rediscountDetailLevel: "Summary",
    ledgerActType: "Ledger"
};
budget:CPParameter result = check fo->createCPParameters(payload);
```

</details>

<details>
<summary>getCPParameters</summary>

Retrieves a single CPParameter by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `'key` | `int` | Yes | The entity key value, e.g. `1`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `GetCPParametersQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `CPParameter|error`

Sample code:

```ballerina
budget:CPParameter result = check fo->getCPParameters("USMF", 1);
```

</details>

<details>
<summary>deleteCPParameters</summary>

Deletes a CPParameter by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `'key` | `int` | Yes | The entity key value, e.g. `1`. |
| `headers` | `DeleteCPParametersHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteCPParameters("USMF", 1);
```

</details>

<details>
<summary>updateCPParameters</summary>

Updates an existing CPParameter.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `'key` | `int` | Yes | The entity key value, e.g. `1`. |
| `payload` | `CPParameter` | Yes | The fields to update. |
| `headers` | `UpdateCPParametersHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `CPParameter|error`

Sample code:

```ballerina
budget:CPParameter payload = {
    rediscountAutoPost: "Yes"
};
budget:CPParameter result = check fo->updateCPParameters("USMF", 1, payload);
```

</details>

#### CP Portfolios

<details>
<summary>listCPPortfolios</summary>

Lists CPPortfolio (cheque and promissory note portfolio) records, with optional OData query support.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `ListCPPortfoliosQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `CPPortfoliosCollection|error`

Sample code:

```ballerina
budget:CPPortfoliosCollection result = check fo->listCPPortfolios();
```

</details>

<details>
<summary>createCPPortfolios</summary>

Creates a new CPPortfolio.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CPPortfolio` | Yes | The CPPortfolio record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |

Returns: `CPPortfolio|error`

Sample code:

```ballerina
budget:CPPortfolio payload = {
    dataAreaId: "USMF",
    portfolioCode: "PORT-01",
    name: "Accounts payable cheques",
    portfolioType: "OutgoingCheque",
    ledgerACTType: "Bank",
    currencyCode: "USD"
};
budget:CPPortfolio result = check fo->createCPPortfolios(payload);
```

</details>

<details>
<summary>getCPPortfolios</summary>

Retrieves a single CPPortfolio by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `portfolioCode` | `string` | Yes | The portfolio code key field, e.g. `"PORT-01"`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `GetCPPortfoliosQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `CPPortfolio|error`

Sample code:

```ballerina
budget:CPPortfolio result = check fo->getCPPortfolios("USMF", "PORT-01");
```

</details>

<details>
<summary>deleteCPPortfolios</summary>

Deletes a CPPortfolio by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `portfolioCode` | `string` | Yes | The portfolio code key field, e.g. `"PORT-01"`. |
| `headers` | `DeleteCPPortfoliosHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteCPPortfolios("USMF", "PORT-01");
```

</details>

<details>
<summary>updateCPPortfolios</summary>

Updates an existing CPPortfolio.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `portfolioCode` | `string` | Yes | The portfolio code key field, e.g. `"PORT-01"`. |
| `payload` | `CPPortfolio` | Yes | The fields to update. |
| `headers` | `UpdateCPPortfoliosHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `CPPortfolio|error`

Sample code:

```ballerina
budget:CPPortfolio payload = {
    name: "Accounts payable cheques - revised"
};
budget:CPPortfolio result = check fo->updateCPPortfolios("USMF", "PORT-01", payload);
```

</details>

#### CP Tables

<details>
<summary>listCPTables</summary>

Lists CPTable (cheque) records, with optional OData query support.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `ListCPTablesQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `CPTablesCollection|error`

Sample code:

```ballerina
budget:CPTablesCollection result = check fo->listCPTables();
```

</details>

<details>
<summary>createCPTables</summary>

Creates a new CPTable.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CPTable` | Yes | The CPTable record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |

Returns: `CPTable|error`

Sample code:

```ballerina
budget:CPTable payload = {
    dataAreaId: "USMF",
    systemChequeNum: "SYSCHQ-00981",
    chequeJournalNum: "CHJ-000045",
    portfolioCode: "PORT-01",
    accountType: "Vendor",
    debitCredit: "Credit",
    amount: 15250.00,
    dueDate: "2026-09-01"
};
budget:CPTable result = check fo->createCPTables(payload);
```

</details>

<details>
<summary>getCPTables</summary>

Retrieves a single CPTable by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `systemChequeNum` | `string` | Yes | The system cheque num key field, e.g. `"SYSCHQ-00981"`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `GetCPTablesQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `CPTable|error`

Sample code:

```ballerina
budget:CPTable result = check fo->getCPTables("USMF", "SYSCHQ-00981");
```

</details>

<details>
<summary>deleteCPTables</summary>

Deletes a CPTable by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `systemChequeNum` | `string` | Yes | The system cheque num key field, e.g. `"SYSCHQ-00981"`. |
| `headers` | `DeleteCPTablesHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteCPTables("USMF", "SYSCHQ-00981");
```

</details>

<details>
<summary>updateCPTables</summary>

Updates an existing CPTable.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `systemChequeNum` | `string` | Yes | The system cheque num key field, e.g. `"SYSCHQ-00981"`. |
| `payload` | `CPTable` | Yes | The fields to update. |
| `headers` | `UpdateCPTablesHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `CPTable|error`

Sample code:

```ballerina
budget:CPTable payload = {
    cancelled: "Yes"
};
budget:CPTable result = check fo->updateCPTables("USMF", "SYSCHQ-00981", payload);
```

</details>

#### CP Trans

<details>
<summary>listCPTrans</summary>

Lists CPTran (cheque/promissory note transaction) records, with optional OData query support.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `ListCPTransQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `CPTransCollection|error`

Sample code:

```ballerina
budget:CPTransCollection result = check fo->listCPTrans();
```

</details>

<details>
<summary>createCPTrans</summary>

Creates a new CPTran.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CPTran` | Yes | The CPTran record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |

Returns: `CPTran|error`

Sample code:

```ballerina
budget:CPTran payload = {
    dataAreaId: "USMF",
    chequeJournalTransNum: "CHJT-000210",
    debitCredit: "Debit",
    accountNum: "VEND-4021",
    journalNum: "CHJ-000045",
    portfolioCode: "PORT-01",
    transDate: "2026-08-05"
};
budget:CPTran result = check fo->createCPTrans(payload);
```

</details>

<details>
<summary>getCPTrans</summary>

Retrieves a single CPTran by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `chequeJournalTransNum` | `string` | Yes | The cheque journal trans num key field, e.g. `"CHJT-000210"`. |
| `debitCredit` | `string` | Yes | The debit credit key field, e.g. `"Debit"`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `GetCPTransQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `CPTran|error`

Sample code:

```ballerina
budget:CPTran result = check fo->getCPTrans("USMF", "CHJT-000210", "Debit");
```

</details>

<details>
<summary>deleteCPTrans</summary>

Deletes a CPTran by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `chequeJournalTransNum` | `string` | Yes | The cheque journal trans num key field, e.g. `"CHJT-000210"`. |
| `debitCredit` | `string` | Yes | The debit credit key field, e.g. `"Debit"`. |
| `headers` | `DeleteCPTransHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteCPTrans("USMF", "CHJT-000210", "Debit");
```

</details>

<details>
<summary>updateCPTrans</summary>

Updates an existing CPTran.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `chequeJournalTransNum` | `string` | Yes | The cheque journal trans num key field, e.g. `"CHJT-000210"`. |
| `debitCredit` | `string` | Yes | The debit credit key field, e.g. `"Debit"`. |
| `payload` | `CPTran` | Yes | The fields to update. |
| `headers` | `UpdateCPTransHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `CPTran|error`

Sample code:

```ballerina
budget:CPTran payload = {
    posted: "Yes"
};
budget:CPTran result = check fo->updateCPTrans("USMF", "CHJT-000210", "Debit", payload);
```

</details>

#### Cost Centers

<details>
<summary>listCostCenters</summary>

Lists CostCenter records, with optional OData query support.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `ListCostCentersQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `CostCentersCollection|error`

Sample code:

```ballerina
budget:CostCentersCollection result = check fo->listCostCenters();
```

</details>

<details>
<summary>createCostCenters</summary>

Creates a new CostCenter.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CostCenter` | Yes | The CostCenter record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |

Returns: `CostCenter|error`

Sample code:

```ballerina
budget:CostCenter payload = {
    operatingUnitNumber: "CC-101",
    name: "Marketing",
    operatingUnitType: "OMCostCenter"
};
budget:CostCenter result = check fo->createCostCenters(payload);
```

</details>

<details>
<summary>getCostCenters</summary>

Retrieves a single CostCenter by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `operatingUnitNumber` | `string` | Yes | The operating unit number key field, e.g. `"CC-101"`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `GetCostCentersQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `CostCenter|error`

Sample code:

```ballerina
budget:CostCenter result = check fo->getCostCenters("CC-101");
```

</details>

<details>
<summary>deleteCostCenters</summary>

Deletes a CostCenter by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `operatingUnitNumber` | `string` | Yes | The operating unit number key field, e.g. `"CC-101"`. |
| `headers` | `DeleteCostCentersHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteCostCenters("CC-101");
```

</details>

<details>
<summary>updateCostCenters</summary>

Updates an existing CostCenter.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `operatingUnitNumber` | `string` | Yes | The operating unit number key field, e.g. `"CC-101"`. |
| `payload` | `CostCenter` | Yes | The fields to update. |
| `headers` | `UpdateCostCentersHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `CostCenter|error`

Sample code:

```ballerina
budget:CostCenter payload = {
    name: "Marketing - EMEA"
};
budget:CostCenter result = check fo->updateCostCenters("CC-101", payload);
```

</details>

#### Cost Groups

<details>
<summary>listCostGroups</summary>

Lists CostGroup records, with optional OData query support.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `ListCostGroupsQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `CostGroupsCollection|error`

Sample code:

```ballerina
budget:CostGroupsCollection result = check fo->listCostGroups();
```

</details>

<details>
<summary>createCostGroups</summary>

Creates a new CostGroup.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CostGroup` | Yes | The CostGroup record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |

Returns: `CostGroup|error`

Sample code:

```ballerina
budget:CostGroup payload = {
    dataAreaId: "USMF",
    groupId: "MATL",
    groupName: "Direct materials",
    costGroupType: "DirectMaterials",
    costBehaviour: "Variable",
    isDefaultCostGroup: "No"
};
budget:CostGroup result = check fo->createCostGroups(payload);
```

</details>

<details>
<summary>getCostGroups</summary>

Retrieves a single CostGroup by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `groupId` | `string` | Yes | The group id key field, e.g. `"MATL"`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `GetCostGroupsQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `CostGroup|error`

Sample code:

```ballerina
budget:CostGroup result = check fo->getCostGroups("USMF", "MATL");
```

</details>

<details>
<summary>deleteCostGroups</summary>

Deletes a CostGroup by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `groupId` | `string` | Yes | The group id key field, e.g. `"MATL"`. |
| `headers` | `DeleteCostGroupsHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteCostGroups("USMF", "MATL");
```

</details>

<details>
<summary>updateCostGroups</summary>

Updates an existing CostGroup.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `groupId` | `string` | Yes | The group id key field, e.g. `"MATL"`. |
| `payload` | `CostGroup` | Yes | The fields to update. |
| `headers` | `UpdateCostGroupsHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `CostGroup|error`

Sample code:

```ballerina
budget:CostGroup payload = {
    groupName: "Direct materials - revised"
};
budget:CostGroup result = check fo->updateCostGroups("USMF", "MATL", payload);
```

</details>

#### Fund Types

<details>
<summary>listFundTypes</summary>

Lists FundType records, with optional OData query support.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `ListFundTypesQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `FundTypesCollection|error`

Sample code:

```ballerina
budget:FundTypesCollection result = check fo->listFundTypes();
```

</details>

<details>
<summary>createFundTypes</summary>

Creates a new FundType.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `FundType` | Yes | The FundType record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |

Returns: `FundType|error`

Sample code:

```ballerina
budget:FundType payload = {
    dataAreaId: "USMF",
    fundType: "GRANT",
    description: "Grant funding"
};
budget:FundType result = check fo->createFundTypes(payload);
```

</details>

<details>
<summary>getFundTypes</summary>

Retrieves a single FundType by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `fundType` | `string` | Yes | The fund type key field, e.g. `"GRANT"`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `GetFundTypesQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `FundType|error`

Sample code:

```ballerina
budget:FundType result = check fo->getFundTypes("USMF", "GRANT");
```

</details>

<details>
<summary>deleteFundTypes</summary>

Deletes a FundType by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `fundType` | `string` | Yes | The fund type key field, e.g. `"GRANT"`. |
| `headers` | `DeleteFundTypesHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteFundTypes("USMF", "GRANT");
```

</details>

<details>
<summary>updateFundTypes</summary>

Updates an existing FundType.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `fundType` | `string` | Yes | The fund type key field, e.g. `"GRANT"`. |
| `payload` | `FundType` | Yes | The fields to update. |
| `headers` | `UpdateFundTypesHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `FundType|error`

Sample code:

```ballerina
budget:FundType payload = {
    description: "Federal and state grant funding"
};
budget:FundType result = check fo->updateFundTypes("USMF", "GRANT", payload);
```

</details>

#### Funds

<details>
<summary>listFunds</summary>

Lists Fund records, with optional OData query support.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `ListFundsQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `FundsCollection|error`

Sample code:

```ballerina
budget:FundsCollection result = check fo->listFunds();
```

</details>

<details>
<summary>createFunds</summary>

Creates a new Fund.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `Fund` | Yes | The Fund record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |

Returns: `Fund|error`

Sample code:

```ballerina
budget:Fund payload = {
    dataAreaId: "USMF",
    fundNumber: "FND-100",
    fundName: "General operating fund",
    fundType: "GRANT",
    fundClass: "Governmental",
    isMajor: "Yes",
    yearEndOption: "ProcessAndCarryForwardBudget"
};
budget:Fund result = check fo->createFunds(payload);
```

</details>

<details>
<summary>getFunds</summary>

Retrieves a single Fund by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `fundNumber` | `string` | Yes | The fund number key field, e.g. `"FND-100"`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `GetFundsQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `Fund|error`

Sample code:

```ballerina
budget:Fund result = check fo->getFunds("USMF", "FND-100");
```

</details>

<details>
<summary>deleteFunds</summary>

Deletes a Fund by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `fundNumber` | `string` | Yes | The fund number key field, e.g. `"FND-100"`. |
| `headers` | `DeleteFundsHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteFunds("USMF", "FND-100");
```

</details>

<details>
<summary>updateFunds</summary>

Updates an existing Fund.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `fundNumber` | `string` | Yes | The fund number key field, e.g. `"FND-100"`. |
| `payload` | `Fund` | Yes | The fields to update. |
| `headers` | `UpdateFundsHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `Fund|error`

Sample code:

```ballerina
budget:Fund payload = {
    isMajor: "No"
};
budget:Fund result = check fo->updateFunds("USMF", "FND-100", payload);
```

</details>

#### Period Lines

<details>
<summary>listPeriodLines</summary>

Lists PeriodLine records, with optional OData query support.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `ListPeriodLinesQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `PeriodLinesCollection|error`

Sample code:

```ballerina
budget:PeriodLinesCollection result = check fo->listPeriodLines();
```

</details>

<details>
<summary>createPeriodLines</summary>

Creates a new PeriodLine.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `PeriodLine` | Yes | The PeriodLine record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |

Returns: `PeriodLine|error`

Sample code:

```ballerina
budget:PeriodLine payload = {
    dataAreaId: "USMF",
    periodId: "P01",
    periodName: "January 2026",
    periodFrom: "2026-01-01",
    periodTo: "2026-01-31",
    modelId: "BM-BASE"
};
budget:PeriodLine result = check fo->createPeriodLines(payload);
```

</details>

<details>
<summary>getPeriodLines</summary>

Retrieves a single PeriodLine by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `periodId` | `string` | Yes | The period id key field, e.g. `"P01"`. |
| `periodFrom` | `string` | Yes | The period from key field, e.g. `"2026-01-01"`. |
| `periodTo` | `string` | Yes | The period to key field, e.g. `"2026-01-31"`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `GetPeriodLinesQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `PeriodLine|error`

Sample code:

```ballerina
budget:PeriodLine result = check fo->getPeriodLines("USMF", "P01", "2026-01-01", "2026-01-31");
```

</details>

<details>
<summary>deletePeriodLines</summary>

Deletes a PeriodLine by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `periodId` | `string` | Yes | The period id key field, e.g. `"P01"`. |
| `periodFrom` | `string` | Yes | The period from key field, e.g. `"2026-01-01"`. |
| `periodTo` | `string` | Yes | The period to key field, e.g. `"2026-01-31"`. |
| `headers` | `DeletePeriodLinesHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `error?`

Sample code:

```ballerina
check fo->deletePeriodLines("USMF", "P01", "2026-01-01", "2026-01-31");
```

</details>

<details>
<summary>updatePeriodLines</summary>

Updates an existing PeriodLine.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `periodId` | `string` | Yes | The period id key field, e.g. `"P01"`. |
| `periodFrom` | `string` | Yes | The period from key field, e.g. `"2026-01-01"`. |
| `periodTo` | `string` | Yes | The period to key field, e.g. `"2026-01-31"`. |
| `payload` | `PeriodLine` | Yes | The fields to update. |
| `headers` | `UpdatePeriodLinesHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `PeriodLine|error`

Sample code:

```ballerina
budget:PeriodLine payload = {
    periodName: "January 2026 - restated"
};
budget:PeriodLine result = check fo->updatePeriodLines("USMF", "P01", "2026-01-01", "2026-01-31", payload);
```

</details>
