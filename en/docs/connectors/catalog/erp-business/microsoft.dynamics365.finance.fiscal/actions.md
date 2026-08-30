---
title: Actions
toc_max_heading_level: 4
---

# Actions

The `ballerinax/microsoft.dynamics365.finance.fiscal` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Provides access to Microsoft Dynamics 365 Finance Fiscal entities (dimension attributes, parameters, rules, and sets, financial dimension sets and values, and fiscal calendars, periods, and years) via OData. |

---

## Client

Provides access to Microsoft Dynamics 365 Finance Fiscal entities (dimension attributes, parameters, rules, and sets, financial dimension sets and values, and fiscal calendars, periods, and years) via OData.

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
import ballerinax/microsoft.dynamics365.finance.fiscal;

configurable string tokenUrl = ?;
configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string serviceUrl = ?;

fiscal:Client fo = check new (
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

#### Dimension Attributes

<details>
<summary>listDimensionAttributes</summary>

<div>

Lists DimensionAttribute records, with optional OData query support.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `ListDimensionAttributesQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `DimensionAttributesCollection|error`

Sample code:

```ballerina
fiscal:DimensionAttributesCollection result = check fo->listDimensionAttributes(
    queries = {
        filter: "DimensionAttribute_Type eq 'MainAccount'",
        top: 20
    }
);
```

</div>

</details>

<details>
<summary>createDimensionAttributes</summary>

<div>

Creates a new DimensionAttribute.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `DimensionAttribute` | Yes | The DimensionAttribute record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |

Returns: `DimensionAttribute|error`

Sample code:

```ballerina
fiscal:DimensionAttribute payload = {
    dimensionName: "CostCenter",
    dimensionValueMask: "###",
    copyValuesOnCreate: "Yes",
    giveDerivedDimensionsPrecedence: "No"
};
fiscal:DimensionAttribute result = check fo->createDimensionAttributes(payload);
```

</div>

</details>

<details>
<summary>getDimensionAttributes</summary>

<div>

Retrieves a single DimensionAttribute by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dimensionName` | `string` | Yes | The dimension name key field, e.g. `"CostCenter"`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `GetDimensionAttributesQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `DimensionAttribute|error`

Sample code:

```ballerina
fiscal:DimensionAttribute result = check fo->getDimensionAttributes("CostCenter");
```

</div>

</details>

<details>
<summary>deleteDimensionAttributes</summary>

<div>

Deletes a DimensionAttribute by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dimensionName` | `string` | Yes | The dimension name key field, e.g. `"CostCenter"`. |
| `headers` | `DeleteDimensionAttributesHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteDimensionAttributes("CostCenter");
```

</div>

</details>

<details>
<summary>updateDimensionAttributes</summary>

<div>

Updates an existing DimensionAttribute.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dimensionName` | `string` | Yes | The dimension name key field, e.g. `"CostCenter"`. |
| `payload` | `DimensionAttribute` | Yes | The fields to update. |
| `headers` | `UpdateDimensionAttributesHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `DimensionAttribute|error`

Sample code:

```ballerina
fiscal:DimensionAttribute payload = {
    dimensionValueMask: "####"
};
fiscal:DimensionAttribute result = check fo->updateDimensionAttributes("CostCenter", payload);
```

</div>

</details>

#### Dimension Parameters

<details>
<summary>listDimensionParameters</summary>

<div>

Lists DimensionParameters records, with optional OData query support.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `ListDimensionParametersQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `DimensionParametersCollection|error`

Sample code:

```ballerina
fiscal:DimensionParametersCollection result = check fo->listDimensionParameters(
    queries = {top: 5}
);
```

</div>

</details>

<details>
<summary>createDimensionParameters</summary>

<div>

Creates a new DimensionParameters record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `DimensionParameters` | Yes | The DimensionParameters record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |

Returns: `DimensionParameters|error`

Sample code:

```ballerina
fiscal:DimensionParameters payload = {
    key: 1,
    dimensionSegmentDelimiter: "Hyphen"
};
fiscal:DimensionParameters result = check fo->createDimensionParameters(payload);
```

</div>

</details>

<details>
<summary>getDimensionParameters</summary>

<div>

Retrieves a single DimensionParameters record by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `'key` | `int` | Yes | The entity key value, e.g. `1`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `GetDimensionParametersQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `DimensionParameters|error`

Sample code:

```ballerina
fiscal:DimensionParameters result = check fo->getDimensionParameters(1);
```

</div>

</details>

<details>
<summary>deleteDimensionParameters</summary>

<div>

Deletes a DimensionParameters record by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `'key` | `int` | Yes | The entity key value, e.g. `1`. |
| `headers` | `DeleteDimensionParametersHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteDimensionParameters(1);
```

</div>

</details>

<details>
<summary>updateDimensionParameters</summary>

<div>

Updates an existing DimensionParameters record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `'key` | `int` | Yes | The entity key value, e.g. `1`. |
| `payload` | `DimensionParameters` | Yes | The fields to update. |
| `headers` | `UpdateDimensionParametersHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `DimensionParameters|error`

Sample code:

```ballerina
fiscal:DimensionParameters payload = {
    dimensionSegmentDelimiter: "Underscore"
};
fiscal:DimensionParameters result = check fo->updateDimensionParameters(1, payload);
```

</div>

</details>

#### Dimension Rules

<details>
<summary>listDimensionRules</summary>

<div>

Lists DimensionRule records, with optional OData query support.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `ListDimensionRulesQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `DimensionRulesCollection|error`

Sample code:

```ballerina
fiscal:DimensionRulesCollection result = check fo->listDimensionRules(
    queries = {
        filter: "RuleGroup eq 'CCToDept'",
        orderby: "LineId"
    }
);
```

</div>

</details>

<details>
<summary>createDimensionRules</summary>

<div>

Creates a new DimensionRule.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `DimensionRule` | Yes | The DimensionRule record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |

Returns: `DimensionRule|error`

Sample code:

```ballerina
fiscal:DimensionRule payload = {
    dataAreaId: "USMF",
    lineId: "1",
    ruleGroup: "CCToDept",
    fromDimensionCode: "001",
    toDimensionCode: "010",
    dimensionAttributeType: "ExistingList",
    toDimensionAttributeType: "ExistingList",
    conversionMethod: "Value"
};
fiscal:DimensionRule result = check fo->createDimensionRules(payload);
```

</div>

</details>

<details>
<summary>getDimensionRules</summary>

<div>

Retrieves a single DimensionRule by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `lineId` | `string` | Yes | The line id key field, e.g. `"1"`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `GetDimensionRulesQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `DimensionRule|error`

Sample code:

```ballerina
fiscal:DimensionRule result = check fo->getDimensionRules("USMF", "1");
```

</div>

</details>

<details>
<summary>deleteDimensionRules</summary>

<div>

Deletes a DimensionRule by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `lineId` | `string` | Yes | The line id key field, e.g. `"1"`. |
| `headers` | `DeleteDimensionRulesHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteDimensionRules("USMF", "1");
```

</div>

</details>

<details>
<summary>updateDimensionRules</summary>

<div>

Updates an existing DimensionRule.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `lineId` | `string` | Yes | The line id key field, e.g. `"1"`. |
| `payload` | `DimensionRule` | Yes | The fields to update. |
| `headers` | `UpdateDimensionRulesHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `DimensionRule|error`

Sample code:

```ballerina
fiscal:DimensionRule payload = {
    toDimensionCode: "020"
};
fiscal:DimensionRule result = check fo->updateDimensionRules("USMF", "1", payload);
```

</div>

</details>

#### Dimension Sets

<details>
<summary>listDimensionSets</summary>

<div>

Lists DimensionSet records, with optional OData query support.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `ListDimensionSetsQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `DimensionSetsCollection|error`

Sample code:

```ballerina
fiscal:DimensionSetsCollection result = check fo->listDimensionSets(
    queries = {filter: "MainAccount eq '110100'"}
);
```

</div>

</details>

<details>
<summary>createDimensionSets</summary>

<div>

Creates a new DimensionSet.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `DimensionSet` | Yes | The DimensionSet record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |

Returns: `DimensionSet|error`

Sample code:

```ballerina
fiscal:DimensionSet payload = {
    mainAccount: "110100",
    displayValue: "110100-USMF"
};
fiscal:DimensionSet result = check fo->createDimensionSets(payload);
```

</div>

</details>

<details>
<summary>getDimensionSets</summary>

<div>

Retrieves a single DimensionSet by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `recordId` | `int` | Yes | The record id key field, e.g. `5637144576`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `GetDimensionSetsQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `DimensionSet|error`

Sample code:

```ballerina
fiscal:DimensionSet result = check fo->getDimensionSets(5637144576);
```

</div>

</details>

<details>
<summary>deleteDimensionSets</summary>

<div>

Deletes a DimensionSet by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `recordId` | `int` | Yes | The record id key field, e.g. `5637144576`. |
| `headers` | `DeleteDimensionSetsHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteDimensionSets(5637144576);
```

</div>

</details>

<details>
<summary>updateDimensionSets</summary>

<div>

Updates an existing DimensionSet.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `recordId` | `int` | Yes | The record id key field, e.g. `5637144576`. |
| `payload` | `DimensionSet` | Yes | The fields to update. |
| `headers` | `UpdateDimensionSetsHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `DimensionSet|error`

Sample code:

```ballerina
fiscal:DimensionSet payload = {
    displayValue: "110100-USMF-Revised"
};
fiscal:DimensionSet result = check fo->updateDimensionSets(5637144576, payload);
```

</div>

</details>

#### Financial Dimension Sets

<details>
<summary>listFinancialDimensionSets</summary>

<div>

Lists FinancialDimensionSet records, with optional OData query support.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `ListFinancialDimensionSetsQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `FinancialDimensionSetsCollection|error`

Sample code:

```ballerina
fiscal:FinancialDimensionSetsCollection result = check fo->listFinancialDimensionSets(
    queries = {filter: "Name eq 'CostCenter-Set'"}
);
```

</div>

</details>

<details>
<summary>createFinancialDimensionSets</summary>

<div>

Creates a new FinancialDimensionSet.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `FinancialDimensionSet` | Yes | The FinancialDimensionSet record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |

Returns: `FinancialDimensionSet|error`

Sample code:

```ballerina
fiscal:FinancialDimensionSet payload = {
    name: "CostCenter-Set",
    description: "Cost center dimension set",
    segmentName01: "CostCenter"
};
fiscal:FinancialDimensionSet result = check fo->createFinancialDimensionSets(payload);
```

</div>

</details>

<details>
<summary>getFinancialDimensionSets</summary>

<div>

Retrieves a single FinancialDimensionSet by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `name` | `string` | Yes | The name key field, e.g. `"CostCenter-Set"`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `GetFinancialDimensionSetsQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `FinancialDimensionSet|error`

Sample code:

```ballerina
fiscal:FinancialDimensionSet result = check fo->getFinancialDimensionSets("CostCenter-Set");
```

</div>

</details>

<details>
<summary>deleteFinancialDimensionSets</summary>

<div>

Deletes a FinancialDimensionSet by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `name` | `string` | Yes | The name key field, e.g. `"CostCenter-Set"`. |
| `headers` | `DeleteFinancialDimensionSetsHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteFinancialDimensionSets("CostCenter-Set");
```

</div>

</details>

<details>
<summary>updateFinancialDimensionSets</summary>

<div>

Updates an existing FinancialDimensionSet.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `name` | `string` | Yes | The name key field, e.g. `"CostCenter-Set"`. |
| `payload` | `FinancialDimensionSet` | Yes | The fields to update. |
| `headers` | `UpdateFinancialDimensionSetsHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `FinancialDimensionSet|error`

Sample code:

```ballerina
fiscal:FinancialDimensionSet payload = {
    description: "Cost center dimension set - revised"
};
fiscal:FinancialDimensionSet result = check fo->updateFinancialDimensionSets("CostCenter-Set", payload);
```

</div>

</details>

#### Financial Dimension Values

<details>
<summary>listFinancialDimensionValues</summary>

<div>

Lists FinancialDimensionValue records, with optional OData query support.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `ListFinancialDimensionValuesQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `FinancialDimensionValuesCollection|error`

Sample code:

```ballerina
fiscal:FinancialDimensionValuesCollection result = check fo->listFinancialDimensionValues(
    queries = {
        filter: "FinancialDimension eq 'CostCenter' and LegalEntityId eq 'USMF'",
        top: 50
    }
);
```

</div>

</details>

<details>
<summary>createFinancialDimensionValues</summary>

<div>

Creates a new FinancialDimensionValue.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `FinancialDimensionValue` | Yes | The FinancialDimensionValue record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |

Returns: `FinancialDimensionValue|error`

Sample code:

```ballerina
fiscal:FinancialDimensionValue payload = {
    financialDimension: "CostCenter",
    legalEntityId: "USMF",
    dimensionValue: "022",
    description: "Sales - East",
    isBlockedForManualEntry: "No",
    isSuspended: "No",
    activeFrom: "2026-01-01T00:00:00Z"
};
fiscal:FinancialDimensionValue result = check fo->createFinancialDimensionValues(payload);
```

</div>

</details>

<details>
<summary>getFinancialDimensionValues</summary>

<div>

Retrieves a single FinancialDimensionValue by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `financialDimension` | `string` | Yes | The financial dimension key field, e.g. `"CostCenter"`. |
| `legalEntityId` | `string` | Yes | The legal entity id key field, e.g. `"USMF"`. |
| `dimensionValue` | `string` | Yes | The dimension value key field, e.g. `"022"`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `GetFinancialDimensionValuesQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `FinancialDimensionValue|error`

Sample code:

```ballerina
fiscal:FinancialDimensionValue result = check fo->getFinancialDimensionValues("CostCenter", "USMF", "022");
```

</div>

</details>

<details>
<summary>deleteFinancialDimensionValues</summary>

<div>

Deletes a FinancialDimensionValue by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `financialDimension` | `string` | Yes | The financial dimension key field, e.g. `"CostCenter"`. |
| `legalEntityId` | `string` | Yes | The legal entity id key field, e.g. `"USMF"`. |
| `dimensionValue` | `string` | Yes | The dimension value key field, e.g. `"022"`. |
| `headers` | `DeleteFinancialDimensionValuesHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteFinancialDimensionValues("CostCenter", "USMF", "022");
```

</div>

</details>

<details>
<summary>updateFinancialDimensionValues</summary>

<div>

Updates an existing FinancialDimensionValue.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `financialDimension` | `string` | Yes | The financial dimension key field, e.g. `"CostCenter"`. |
| `legalEntityId` | `string` | Yes | The legal entity id key field, e.g. `"USMF"`. |
| `dimensionValue` | `string` | Yes | The dimension value key field, e.g. `"022"`. |
| `payload` | `FinancialDimensionValue` | Yes | The fields to update. |
| `headers` | `UpdateFinancialDimensionValuesHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `FinancialDimensionValue|error`

Sample code:

```ballerina
fiscal:FinancialDimensionValue payload = {
    isSuspended: "Yes"
};
fiscal:FinancialDimensionValue result = check fo->updateFinancialDimensionValues("CostCenter", "USMF", "022", payload);
```

</div>

</details>

#### Fiscal Calendars

<details>
<summary>listFiscalCalendars</summary>

<div>

Lists FiscalCalendar records, with optional OData query support.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `ListFiscalCalendarsQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `FiscalCalendarsCollection|error`

Sample code:

```ballerina
fiscal:FiscalCalendarsCollection result = check fo->listFiscalCalendars(
    queries = {
        filter: "CalendarId eq 'USMF'",
        orderby: "GregorianDate"
    }
);
```

</div>

</details>

<details>
<summary>createFiscalCalendars</summary>

<div>

Creates a new FiscalCalendar.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `FiscalCalendar` | Yes | The FiscalCalendar record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |

Returns: `FiscalCalendar|error`

Sample code:

```ballerina
fiscal:FiscalCalendar payload = {
    ledgerGregorianDateId: "USMF-2026-01-15",
    calendarId: "USMF",
    gregorianDate: "2026-01-15",
    periodName: "Jan2026",
    month: "Month1",
    quarter: "Q1",
    yearName: "2026"
};
fiscal:FiscalCalendar result = check fo->createFiscalCalendars(payload);
```

</div>

</details>

<details>
<summary>getFiscalCalendars</summary>

<div>

Retrieves a single FiscalCalendar by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ledgerGregorianDateId` | `string` | Yes | The ledger gregorian date id key field, e.g. `"USMF-2026-01-15"`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `GetFiscalCalendarsQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `FiscalCalendar|error`

Sample code:

```ballerina
fiscal:FiscalCalendar result = check fo->getFiscalCalendars("USMF-2026-01-15");
```

</div>

</details>

<details>
<summary>deleteFiscalCalendars</summary>

<div>

Deletes a FiscalCalendar by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ledgerGregorianDateId` | `string` | Yes | The ledger gregorian date id key field, e.g. `"USMF-2026-01-15"`. |
| `headers` | `DeleteFiscalCalendarsHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteFiscalCalendars("USMF-2026-01-15");
```

</div>

</details>

<details>
<summary>updateFiscalCalendars</summary>

<div>

Updates an existing FiscalCalendar.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ledgerGregorianDateId` | `string` | Yes | The ledger gregorian date id key field, e.g. `"USMF-2026-01-15"`. |
| `payload` | `FiscalCalendar` | Yes | The fields to update. |
| `headers` | `UpdateFiscalCalendarsHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `FiscalCalendar|error`

Sample code:

```ballerina
fiscal:FiscalCalendar payload = {
    periodName: "January2026"
};
fiscal:FiscalCalendar result = check fo->updateFiscalCalendars("USMF-2026-01-15", payload);
```

</div>

</details>

#### Fiscal Periods

<details>
<summary>listFiscalPeriods</summary>

<div>

Lists FiscalPeriod records, with optional OData query support.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `ListFiscalPeriodsQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `FiscalPeriodsCollection|error`

Sample code:

```ballerina
fiscal:FiscalPeriodsCollection result = check fo->listFiscalPeriods(
    queries = {
        filter: "Calendar eq 'USMF' and FiscalYear eq '2026'"
    }
);
```

</div>

</details>

<details>
<summary>createFiscalPeriods</summary>

<div>

Creates a new FiscalPeriod.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `FiscalPeriod` | Yes | The FiscalPeriod record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |

Returns: `FiscalPeriod|error`

Sample code:

```ballerina
fiscal:FiscalPeriod payload = {
    calendar: "USMF",
    fiscalYear: "2026",
    startDate: "2026-01-01",
    endDate: "2026-01-31",
    periodName: "Jan2026",
    shortName: "P01",
    'type: "Operating",
    quarter: "Q1",
    month: "Month1"
};
fiscal:FiscalPeriod result = check fo->createFiscalPeriods(payload);
```

</div>

</details>

<details>
<summary>getFiscalPeriods</summary>

<div>

Retrieves a single FiscalPeriod by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendar` | `string` | Yes | The calendar key field, e.g. `"USMF"`. |
| `fiscalYear` | `string` | Yes | The fiscal year key field, e.g. `"2026"`. |
| `startDate` | `string` | Yes | The start date key field, e.g. `"2026-01-01"`. |
| `endDate` | `string` | Yes | The end date key field, e.g. `"2026-01-31"`. |
| `periodName` | `string` | Yes | The period name key field, e.g. `"Jan2026"`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `GetFiscalPeriodsQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `FiscalPeriod|error`

Sample code:

```ballerina
fiscal:FiscalPeriod result = check fo->getFiscalPeriods("USMF", "2026", "2026-01-01", "2026-01-31", "Jan2026");
```

</div>

</details>

<details>
<summary>deleteFiscalPeriods</summary>

<div>

Deletes a FiscalPeriod by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendar` | `string` | Yes | The calendar key field, e.g. `"USMF"`. |
| `fiscalYear` | `string` | Yes | The fiscal year key field, e.g. `"2026"`. |
| `startDate` | `string` | Yes | The start date key field, e.g. `"2026-01-01"`. |
| `endDate` | `string` | Yes | The end date key field, e.g. `"2026-01-31"`. |
| `periodName` | `string` | Yes | The period name key field, e.g. `"Jan2026"`. |
| `headers` | `DeleteFiscalPeriodsHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteFiscalPeriods("USMF", "2026", "2026-01-01", "2026-01-31", "Jan2026");
```

</div>

</details>

<details>
<summary>updateFiscalPeriods</summary>

<div>

Updates an existing FiscalPeriod.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendar` | `string` | Yes | The calendar key field, e.g. `"USMF"`. |
| `fiscalYear` | `string` | Yes | The fiscal year key field, e.g. `"2026"`. |
| `startDate` | `string` | Yes | The start date key field, e.g. `"2026-01-01"`. |
| `endDate` | `string` | Yes | The end date key field, e.g. `"2026-01-31"`. |
| `periodName` | `string` | Yes | The period name key field, e.g. `"Jan2026"`. |
| `payload` | `FiscalPeriod` | Yes | The fields to update. |
| `headers` | `UpdateFiscalPeriodsHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `FiscalPeriod|error`

Sample code:

```ballerina
fiscal:FiscalPeriod payload = {
    comments: "Adjusted after period-end review"
};
fiscal:FiscalPeriod result = check fo->updateFiscalPeriods("USMF", "2026", "2026-01-01", "2026-01-31", "Jan2026", payload);
```

</div>

</details>

#### Fiscal Years

<details>
<summary>listFiscalYears</summary>

<div>

Lists FiscalYear records, with optional OData query support.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `ListFiscalYearsQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `FiscalYearsCollection|error`

Sample code:

```ballerina
fiscal:FiscalYearsCollection result = check fo->listFiscalYears(
    queries = {
        filter: "LegalEntityId eq 'USMF' and Status eq 'Open'"
    }
);
```

</div>

</details>

<details>
<summary>createFiscalYears</summary>

<div>

Creates a new FiscalYear.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `FiscalYear` | Yes | The FiscalYear record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |

Returns: `FiscalYear|error`

Sample code:

```ballerina
fiscal:FiscalYear payload = {
    legalEntityId: "USMF",
    calendar: "USMF",
    fiscalYear: "2026",
    status: "Open",
    legalEntityName: "USMF Legal Entity"
};
fiscal:FiscalYear result = check fo->createFiscalYears(payload);
```

</div>

</details>

<details>
<summary>getFiscalYears</summary>

<div>

Retrieves a single FiscalYear by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `legalEntityId` | `string` | Yes | The legal entity id key field, e.g. `"USMF"`. |
| `calendar` | `string` | Yes | The calendar key field, e.g. `"USMF"`. |
| `fiscalYear` | `string` | Yes | The fiscal year key field, e.g. `"2026"`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `GetFiscalYearsQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `FiscalYear|error`

Sample code:

```ballerina
fiscal:FiscalYear result = check fo->getFiscalYears("USMF", "USMF", "2026");
```

</div>

</details>

<details>
<summary>deleteFiscalYears</summary>

<div>

Deletes a FiscalYear by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `legalEntityId` | `string` | Yes | The legal entity id key field, e.g. `"USMF"`. |
| `calendar` | `string` | Yes | The calendar key field, e.g. `"USMF"`. |
| `fiscalYear` | `string` | Yes | The fiscal year key field, e.g. `"2026"`. |
| `headers` | `DeleteFiscalYearsHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteFiscalYears("USMF", "USMF", "2026");
```

</div>

</details>

<details>
<summary>updateFiscalYears</summary>

<div>

Updates an existing FiscalYear.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `legalEntityId` | `string` | Yes | The legal entity id key field, e.g. `"USMF"`. |
| `calendar` | `string` | Yes | The calendar key field, e.g. `"USMF"`. |
| `fiscalYear` | `string` | Yes | The fiscal year key field, e.g. `"2026"`. |
| `payload` | `FiscalYear` | Yes | The fields to update. |
| `headers` | `UpdateFiscalYearsHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `FiscalYear|error`

Sample code:

```ballerina
fiscal:FiscalYear payload = {
    status: "Close"
};
fiscal:FiscalYear result = check fo->updateFiscalYears("USMF", "USMF", "2026", payload);
```

</div>

</details>
