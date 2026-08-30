---
title: Actions
toc_max_heading_level: 4
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

<div>

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

</div>

</details>

<details>
<summary>createBudgetCodes</summary>

<div>

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

</div>

</details>

<details>
<summary>getBudgetCodes</summary>

<div>

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

</div>

</details>

<details>
<summary>deleteBudgetCodes</summary>

<div>

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

</div>

</details>

<details>
<summary>updateBudgetCodes</summary>

<div>

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

</div>

</details>

#### Budget Cycles

<details>
<summary>listBudgetCycles</summary>

<div>

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

</div>

</details>

<details>
<summary>createBudgetCycles</summary>

<div>

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

</div>

</details>

<details>
<summary>getBudgetCycles</summary>

<div>

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

</div>

</details>

<details>
<summary>deleteBudgetCycles</summary>

<div>

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

</div>

</details>

<details>
<summary>updateBudgetCycles</summary>

<div>

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

</div>

</details>

#### Budget Models

<details>
<summary>listBudgetModels</summary>

<div>

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

</div>

</details>

<details>
<summary>createBudgetModels</summary>

<div>

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

</div>

</details>

<details>
<summary>getBudgetModels</summary>

<div>

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

</div>

</details>

<details>
<summary>deleteBudgetModels</summary>

<div>

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

</div>

</details>

<details>
<summary>updateBudgetModels</summary>

<div>

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

</div>

</details>

#### Budget Plan Processes

<details>
<summary>listBudgetPlanProcesses</summary>

<div>

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

</div>

</details>

<details>
<summary>createBudgetPlanProcesses</summary>

<div>

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

</div>

</details>

<details>
<summary>getBudgetPlanProcesses</summary>

<div>

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

</div>

</details>

<details>
<summary>deleteBudgetPlanProcesses</summary>

<div>

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

</div>

</details>

<details>
<summary>updateBudgetPlanProcesses</summary>

<div>

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

</div>

</details>

#### Budget Plans

<details>
<summary>listBudgetPlans</summary>

<div>

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

</div>

</details>

<details>
<summary>createBudgetPlans</summary>

<div>

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

</div>

</details>

<details>
<summary>getBudgetPlans</summary>

<div>

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

</div>

</details>

<details>
<summary>deleteBudgetPlans</summary>

<div>

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

</div>

</details>

<details>
<summary>updateBudgetPlans</summary>

<div>

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

</div>

</details>

#### CP Journals

<details>
<summary>listCPJournals</summary>

<div>

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

</div>

</details>

<details>
<summary>createCPJournals</summary>

<div>

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

</div>

</details>

<details>
<summary>getCPJournals</summary>

<div>

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

</div>

</details>

<details>
<summary>deleteCPJournals</summary>

<div>

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

</div>

</details>

<details>
<summary>updateCPJournals</summary>

<div>

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

</div>

</details>

#### CP Parameters

<details>
<summary>listCPParameters</summary>

<div>

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

</div>

</details>

<details>
<summary>createCPParameters</summary>

<div>

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

</div>

</details>

<details>
<summary>getCPParameters</summary>

<div>

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

</div>

</details>

<details>
<summary>deleteCPParameters</summary>

<div>

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

</div>

</details>

<details>
<summary>updateCPParameters</summary>

<div>

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

</div>

</details>

#### CP Portfolios

<details>
<summary>listCPPortfolios</summary>

<div>

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

</div>

</details>

<details>
<summary>createCPPortfolios</summary>

<div>

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

</div>

</details>

<details>
<summary>getCPPortfolios</summary>

<div>

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

</div>

</details>

<details>
<summary>deleteCPPortfolios</summary>

<div>

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

</div>

</details>

<details>
<summary>updateCPPortfolios</summary>

<div>

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

</div>

</details>

#### CP Tables

<details>
<summary>listCPTables</summary>

<div>

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

</div>

</details>

<details>
<summary>createCPTables</summary>

<div>

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

</div>

</details>

<details>
<summary>getCPTables</summary>

<div>

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

</div>

</details>

<details>
<summary>deleteCPTables</summary>

<div>

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

</div>

</details>

<details>
<summary>updateCPTables</summary>

<div>

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

</div>

</details>

#### CP Trans

<details>
<summary>listCPTrans</summary>

<div>

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

</div>

</details>

<details>
<summary>createCPTrans</summary>

<div>

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

</div>

</details>

<details>
<summary>getCPTrans</summary>

<div>

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

</div>

</details>

<details>
<summary>deleteCPTrans</summary>

<div>

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

</div>

</details>

<details>
<summary>updateCPTrans</summary>

<div>

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

</div>

</details>

#### Cost Centers

<details>
<summary>listCostCenters</summary>

<div>

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

</div>

</details>

<details>
<summary>createCostCenters</summary>

<div>

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

</div>

</details>

<details>
<summary>getCostCenters</summary>

<div>

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

</div>

</details>

<details>
<summary>deleteCostCenters</summary>

<div>

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

</div>

</details>

<details>
<summary>updateCostCenters</summary>

<div>

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

</div>

</details>

#### Cost Groups

<details>
<summary>listCostGroups</summary>

<div>

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

</div>

</details>

<details>
<summary>createCostGroups</summary>

<div>

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

</div>

</details>

<details>
<summary>getCostGroups</summary>

<div>

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

</div>

</details>

<details>
<summary>deleteCostGroups</summary>

<div>

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

</div>

</details>

<details>
<summary>updateCostGroups</summary>

<div>

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

</div>

</details>

#### Fund Types

<details>
<summary>listFundTypes</summary>

<div>

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

</div>

</details>

<details>
<summary>createFundTypes</summary>

<div>

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

</div>

</details>

<details>
<summary>getFundTypes</summary>

<div>

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

</div>

</details>

<details>
<summary>deleteFundTypes</summary>

<div>

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

</div>

</details>

<details>
<summary>updateFundTypes</summary>

<div>

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

</div>

</details>

#### Funds

<details>
<summary>listFunds</summary>

<div>

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

</div>

</details>

<details>
<summary>createFunds</summary>

<div>

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

</div>

</details>

<details>
<summary>getFunds</summary>

<div>

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

</div>

</details>

<details>
<summary>deleteFunds</summary>

<div>

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

</div>

</details>

<details>
<summary>updateFunds</summary>

<div>

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

</div>

</details>

#### Period Lines

<details>
<summary>listPeriodLines</summary>

<div>

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

</div>

</details>

<details>
<summary>createPeriodLines</summary>

<div>

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

</div>

</details>

<details>
<summary>getPeriodLines</summary>

<div>

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

</div>

</details>

<details>
<summary>deletePeriodLines</summary>

<div>

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

</div>

</details>

<details>
<summary>updatePeriodLines</summary>

<div>

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

</div>

</details>
