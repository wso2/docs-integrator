---
title: Actions
toc_max_heading_level: 4
---

# Actions

The `ballerinax/microsoft.dynamics365.finance.system` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Provides full CRUD access to Microsoft Dynamics 365 Finance System entities via the OData REST API. |

---

## Client

Provides full CRUD access to Microsoft Dynamics 365 Finance System entities via the OData REST API.

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
import ballerinax/microsoft.dynamics365.finance.system;

configurable string tokenUrl = ?;
configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string serviceUrl = ?;

system:Client fo = check new (
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

#### Abbreviations

<details>
<summary>listAbbreviations</summary>

Lists Abbreviations records, with optional OData query support.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `ListAbbreviationsQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `AbbreviationsCollection|error`

Sample code:

```ballerina
system:AbbreviationsCollection result = check fo->listAbbreviations();
```

</details>

<details>
<summary>createAbbreviations</summary>

Creates a new Abbreviations record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `Abbreviations` | Yes | The Abbreviations record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |

Returns: `Abbreviations|error`

Sample code:

```ballerina
system:Abbreviations payload = {
    addrTypeCode: "HQ",
    addrTypeName: "Headquarters",
    addrTypeFullName: "Corporate Headquarters",
    addrTypeLevel: 1
};
system:Abbreviations result = check fo->createAbbreviations(payload);
```

</details>

<details>
<summary>getAbbreviations</summary>

Retrieves a single Abbreviations by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `addrTypeCode` | `string` | Yes | The address type code key field, e.g. `"HQ"`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `GetAbbreviationsQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `Abbreviations|error`

Sample code:

```ballerina
system:Abbreviations result = check fo->getAbbreviations("HQ");
```

</details>

<details>
<summary>deleteAbbreviations</summary>

Deletes a Abbreviations by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `addrTypeCode` | `string` | Yes | The address type code key field, e.g. `"HQ"`. |
| `headers` | `DeleteAbbreviationsHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteAbbreviations("HQ");
```

</details>

<details>
<summary>updateAbbreviations</summary>

Updates an existing Abbreviations.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `addrTypeCode` | `string` | Yes | The address type code key field, e.g. `"HQ"`. |
| `payload` | `Abbreviations` | Yes | The fields to update. |
| `headers` | `UpdateAbbreviationsHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `Abbreviations|error`

Sample code:

```ballerina
system:Abbreviations payload = {
    addrTypeFullName: "Global Corporate Headquarters"
};
system:Abbreviations result = check fo->updateAbbreviations("HQ", payload);
```

</details>

#### All Products

<details>
<summary>listAllProducts</summary>

Lists EveryProduct records, with optional OData query support.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `ListAllProductsQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `AllProductsCollection|error`

Sample code:

```ballerina
system:AllProductsCollection result = check fo->listAllProducts();
```

</details>

<details>
<summary>createAllProducts</summary>

Creates a new EveryProduct.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `EveryProduct` | Yes | The EveryProduct record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |

Returns: `EveryProduct|error`

Sample code:

```ballerina
system:EveryProduct payload = {
    productNumber: "P-1001",
    productName: "Widget A",
    productDescription: "Standard widget",
    productSearchName: "WIDGETA"
};
system:EveryProduct result = check fo->createAllProducts(payload);
```

</details>

<details>
<summary>getAllProducts</summary>

Retrieves a single EveryProduct by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `productNumber` | `string` | Yes | The product number key field, e.g. `"P-1001"`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `GetAllProductsQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `EveryProduct|error`

Sample code:

```ballerina
system:EveryProduct result = check fo->getAllProducts("P-1001");
```

</details>

<details>
<summary>deleteAllProducts</summary>

Deletes a EveryProduct by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `productNumber` | `string` | Yes | The product number key field, e.g. `"P-1001"`. |
| `headers` | `DeleteAllProductsHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteAllProducts("P-1001");
```

</details>

<details>
<summary>updateAllProducts</summary>

Updates an existing EveryProduct.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `productNumber` | `string` | Yes | The product number key field, e.g. `"P-1001"`. |
| `payload` | `EveryProduct` | Yes | The fields to update. |
| `headers` | `UpdateAllProductsHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `EveryProduct|error`

Sample code:

```ballerina
system:EveryProduct payload = {
    productDescription: "Standard widget - revised"
};
system:EveryProduct result = check fo->updateAllProducts("P-1001", payload);
```

</details>

#### CFPS Table

<details>
<summary>listCFPSTable</summary>

Lists CFPSTable records, with optional OData query support.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `ListCFPSTableQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `CFPSTableCollection|error`

Sample code:

```ballerina
system:CFPSTableCollection result = check fo->listCFPSTable();
```

</details>

<details>
<summary>createCFPSTable</summary>

Creates a new CFPSTable.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CFPSTable` | Yes | The CFPSTable record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |

Returns: `CFPSTable|error`

Sample code:

```ballerina
system:CFPSTable payload = {
    dataAreaId: "BRMF",
    transactionType: "Sales",
    cFPSCode: "CFPS-01",
    name: "Standard CFPS code",
    searchName: "CFPS01"
};
system:CFPSTable result = check fo->createCFPSTable(payload);
```

</details>

<details>
<summary>getCFPSTable</summary>

Retrieves a single CFPSTable by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"BRMF"`. |
| `transactionType` | `string` | Yes | The transaction type key field (`Sales`, `Purch`, or `Both`), e.g. `"Sales"`. |
| `cFPSCode` | `string` | Yes | The CFPS code key field, e.g. `"CFPS-01"`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `GetCFPSTableQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `CFPSTable|error`

Sample code:

```ballerina
system:CFPSTable result = check fo->getCFPSTable("BRMF", "Sales", "CFPS-01");
```

</details>

<details>
<summary>deleteCFPSTable</summary>

Deletes a CFPSTable by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"BRMF"`. |
| `transactionType` | `string` | Yes | The transaction type key field, e.g. `"Sales"`. |
| `cFPSCode` | `string` | Yes | The CFPS code key field, e.g. `"CFPS-01"`. |
| `headers` | `DeleteCFPSTableHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteCFPSTable("BRMF", "Sales", "CFPS-01");
```

</details>

<details>
<summary>updateCFPSTable</summary>

Updates an existing CFPSTable.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"BRMF"`. |
| `transactionType` | `string` | Yes | The transaction type key field, e.g. `"Sales"`. |
| `cFPSCode` | `string` | Yes | The CFPS code key field, e.g. `"CFPS-01"`. |
| `payload` | `CFPSTable` | Yes | The fields to update. |
| `headers` | `UpdateCFPSTableHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `CFPSTable|error`

Sample code:

```ballerina
system:CFPSTable payload = {
    name: "Standard CFPS code - revised"
};
system:CFPSTable result = check fo->updateCFPSTable("BRMF", "Sales", "CFPS-01", payload);
```

</details>

#### Components

<details>
<summary>listComponents</summary>

Lists Component records, with optional OData query support.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `ListComponentsQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `ComponentsCollection|error`

Sample code:

```ballerina
system:ComponentsCollection result = check fo->listComponents();
```

</details>

<details>
<summary>createComponents</summary>

Creates a new Component.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `Component` | Yes | The Component record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |

Returns: `Component|error`

Sample code:

```ballerina
system:Component payload = {
    dataAreaId: "INMF",
    taxType: "GST",
    taxComponent: "CGST",
    description: "Central GST component"
};
system:Component result = check fo->createComponents(payload);
```

</details>

<details>
<summary>getComponents</summary>

Retrieves a single Component by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"INMF"`. |
| `taxComponent` | `string` | Yes | The tax component key field, e.g. `"CGST"`. |
| `taxType` | `string` | Yes | The tax type key field, e.g. `"GST"`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `GetComponentsQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `Component|error`

Sample code:

```ballerina
system:Component result = check fo->getComponents("INMF", "CGST", "GST");
```

</details>

<details>
<summary>deleteComponents</summary>

Deletes a Component by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"INMF"`. |
| `taxComponent` | `string` | Yes | The tax component key field, e.g. `"CGST"`. |
| `taxType` | `string` | Yes | The tax type key field, e.g. `"GST"`. |
| `headers` | `DeleteComponentsHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteComponents("INMF", "CGST", "GST");
```

</details>

<details>
<summary>updateComponents</summary>

Updates an existing Component.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"INMF"`. |
| `taxComponent` | `string` | Yes | The tax component key field, e.g. `"CGST"`. |
| `taxType` | `string` | Yes | The tax type key field, e.g. `"GST"`. |
| `payload` | `Component` | Yes | The fields to update. |
| `headers` | `UpdateComponentsHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `Component|error`

Sample code:

```ballerina
system:Component payload = {
    description: "Central GST component - revised"
};
system:Component result = check fo->updateComponents("INMF", "CGST", "GST", payload);
```

</details>

#### Date Intervals

<details>
<summary>listDateIntervals</summary>

Lists DateInterval records, with optional OData query support.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `ListDateIntervalsQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `DateIntervalsCollection|error`

Sample code:

```ballerina
system:DateIntervalsCollection result = check fo->listDateIntervals();
```

</details>

<details>
<summary>createDateIntervals</summary>

Creates a new DateInterval.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `DateInterval` | Yes | The DateInterval record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |

Returns: `DateInterval|error`

Sample code:

```ballerina
system:DateInterval payload = {
    dataAreaId: "USMF",
    dateIntervalCode: "FY-STD",
    description: "Standard fiscal year interval",
    startPeriodType: "FiscalYear",
    endPeriodType: "FiscalYear"
};
system:DateInterval result = check fo->createDateIntervals(payload);
```

</details>

<details>
<summary>getDateIntervals</summary>

Retrieves a single DateInterval by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `dateIntervalCode` | `string` | Yes | The date interval code key field, e.g. `"FY-STD"`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `GetDateIntervalsQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `DateInterval|error`

Sample code:

```ballerina
system:DateInterval result = check fo->getDateIntervals("USMF", "FY-STD");
```

</details>

<details>
<summary>deleteDateIntervals</summary>

Deletes a DateInterval by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `dateIntervalCode` | `string` | Yes | The date interval code key field, e.g. `"FY-STD"`. |
| `headers` | `DeleteDateIntervalsHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteDateIntervals("USMF", "FY-STD");
```

</details>

<details>
<summary>updateDateIntervals</summary>

Updates an existing DateInterval.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `dateIntervalCode` | `string` | Yes | The date interval code key field, e.g. `"FY-STD"`. |
| `payload` | `DateInterval` | Yes | The fields to update. |
| `headers` | `UpdateDateIntervalsHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `DateInterval|error`

Sample code:

```ballerina
system:DateInterval payload = {
    description: "Standard fiscal year interval - revised"
};
system:DateInterval result = check fo->updateDateIntervals("USMF", "FY-STD", payload);
```

</details>

#### EM Item Types

<details>
<summary>listEMItemTypes</summary>

Lists EMItemType records, with optional OData query support.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `ListEMItemTypesQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `EMItemTypesCollection|error`

Sample code:

```ballerina
system:EMItemTypesCollection result = check fo->listEMItemTypes();
```

</details>

<details>
<summary>createEMItemTypes</summary>

Creates a new EMItemType.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `EMItemType` | Yes | The EMItemType record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |

Returns: `EMItemType|error`

Sample code:

```ballerina
system:EMItemType payload = {
    dataAreaId: "USMF",
    messageItemType: "EXPCTRL",
    description: "Export control message item"
};
system:EMItemType result = check fo->createEMItemTypes(payload);
```

</details>

<details>
<summary>getEMItemTypes</summary>

Retrieves a single EMItemType by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `messageItemType` | `string` | Yes | The message item type key field, e.g. `"EXPCTRL"`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `GetEMItemTypesQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `EMItemType|error`

Sample code:

```ballerina
system:EMItemType result = check fo->getEMItemTypes("USMF", "EXPCTRL");
```

</details>

<details>
<summary>deleteEMItemTypes</summary>

Deletes a EMItemType by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `messageItemType` | `string` | Yes | The message item type key field, e.g. `"EXPCTRL"`. |
| `headers` | `DeleteEMItemTypesHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteEMItemTypes("USMF", "EXPCTRL");
```

</details>

<details>
<summary>updateEMItemTypes</summary>

Updates an existing EMItemType.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `messageItemType` | `string` | Yes | The message item type key field, e.g. `"EXPCTRL"`. |
| `payload` | `EMItemType` | Yes | The fields to update. |
| `headers` | `UpdateEMItemTypesHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `EMItemType|error`

Sample code:

```ballerina
system:EMItemType payload = {
    description: "Export control message item - revised"
};
system:EMItemType result = check fo->updateEMItemTypes("USMF", "EXPCTRL", payload);
```

</details>

#### Estate Status

<details>
<summary>listEstateStatus</summary>

Lists EstateStatus records, with optional OData query support.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `ListEstateStatusQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `EstateStatusCollection|error`

Sample code:

```ballerina
system:EstateStatusCollection result = check fo->listEstateStatus();
```

</details>

<details>
<summary>createEstateStatus</summary>

Creates a new EstateStatus.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `EstateStatus` | Yes | The EstateStatus record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |

Returns: `EstateStatus|error`

Sample code:

```ballerina
system:EstateStatus payload = {
    dataAreaId: "RUMF",
    estStatId: "ACTIVE",
    name: "Active estate"
};
system:EstateStatus result = check fo->createEstateStatus(payload);
```

</details>

<details>
<summary>getEstateStatus</summary>

Retrieves a single EstateStatus by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"RUMF"`. |
| `estStatId` | `string` | Yes | The estate status id key field, e.g. `"ACTIVE"`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `GetEstateStatusQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `EstateStatus|error`

Sample code:

```ballerina
system:EstateStatus result = check fo->getEstateStatus("RUMF", "ACTIVE");
```

</details>

<details>
<summary>deleteEstateStatus</summary>

Deletes a EstateStatus by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"RUMF"`. |
| `estStatId` | `string` | Yes | The estate status id key field, e.g. `"ACTIVE"`. |
| `headers` | `DeleteEstateStatusHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteEstateStatus("RUMF", "ACTIVE");
```

</details>

<details>
<summary>updateEstateStatus</summary>

Updates an existing EstateStatus.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"RUMF"`. |
| `estStatId` | `string` | Yes | The estate status id key field, e.g. `"ACTIVE"`. |
| `payload` | `EstateStatus` | Yes | The fields to update. |
| `headers` | `UpdateEstateStatusHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `EstateStatus|error`

Sample code:

```ballerina
system:EstateStatus payload = {
    name: "Active estate - revised"
};
system:EstateStatus result = check fo->updateEstateStatus("RUMF", "ACTIVE", payload);
```

</details>

#### Ext Code Tables

<details>
<summary>listExtCodeTables</summary>

Lists ExtCodeTable records, with optional OData query support.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `ListExtCodeTablesQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `ExtCodeTablesCollection|error`

Sample code:

```ballerina
system:ExtCodeTablesCollection result = check fo->listExtCodeTables();
```

</details>

<details>
<summary>createExtCodeTables</summary>

Creates a new ExtCodeTable.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `ExtCodeTable` | Yes | The ExtCodeTable record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |

Returns: `ExtCodeTable|error`

Sample code:

```ballerina
system:ExtCodeTable payload = {
    dataAreaId: "MXMF",
    codeType: "UnitOfMeasure",
    version: "2.0",
    codeId: "H87",
    description: "Piece",
    validFrom: "2026-01-01"
};
system:ExtCodeTable result = check fo->createExtCodeTables(payload);
```

</details>

<details>
<summary>getExtCodeTables</summary>

Retrieves a single ExtCodeTable by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"MXMF"`. |
| `codeType` | `string` | Yes | The extended code type key field, e.g. `"UnitOfMeasure"`. |
| `version` | `string` | Yes | The code table version key field, e.g. `"2.0"`. |
| `codeId` | `string` | Yes | The code id key field, e.g. `"H87"`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `GetExtCodeTablesQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `ExtCodeTable|error`

Sample code:

```ballerina
system:ExtCodeTable result = check fo->getExtCodeTables("MXMF", "UnitOfMeasure", "2.0", "H87");
```

</details>

<details>
<summary>deleteExtCodeTables</summary>

Deletes a ExtCodeTable by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"MXMF"`. |
| `codeType` | `string` | Yes | The extended code type key field, e.g. `"UnitOfMeasure"`. |
| `version` | `string` | Yes | The code table version key field, e.g. `"2.0"`. |
| `codeId` | `string` | Yes | The code id key field, e.g. `"H87"`. |
| `headers` | `DeleteExtCodeTablesHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteExtCodeTables("MXMF", "UnitOfMeasure", "2.0", "H87");
```

</details>

<details>
<summary>updateExtCodeTables</summary>

Updates an existing ExtCodeTable.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"MXMF"`. |
| `codeType` | `string` | Yes | The extended code type key field, e.g. `"UnitOfMeasure"`. |
| `version` | `string` | Yes | The code table version key field, e.g. `"2.0"`. |
| `codeId` | `string` | Yes | The code id key field, e.g. `"H87"`. |
| `payload` | `ExtCodeTable` | Yes | The fields to update. |
| `headers` | `UpdateExtCodeTablesHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `ExtCodeTable|error`

Sample code:

```ballerina
system:ExtCodeTable payload = {
    description: "Piece (unit)"
};
system:ExtCodeTable result = check fo->updateExtCodeTables("MXMF", "UnitOfMeasure", "2.0", "H87", payload);
```

</details>

#### Format Codes

<details>
<summary>listFormatCodes</summary>

Lists FormatCode records, with optional OData query support.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `ListFormatCodesQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `FormatCodesCollection|error`

Sample code:

```ballerina
system:FormatCodesCollection result = check fo->listFormatCodes();
```

</details>

<details>
<summary>createFormatCodes</summary>

Creates a new FormatCode.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `FormatCode` | Yes | The FormatCode record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |

Returns: `FormatCode|error`

Sample code:

```ballerina
system:FormatCode payload = {
    dataAreaId: "USMF",
    'type: "ServiceLevel",
    code: "URGP",
    description: "Urgent payment"
};
system:FormatCode result = check fo->createFormatCodes(payload);
```

</details>

<details>
<summary>getFormatCodes</summary>

Retrieves a single FormatCode by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `code` | `string` | Yes | The format code key field, e.g. `"URGP"`. |
| `'type` | `string` | Yes | The format code type key field, e.g. `"ServiceLevel"`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `GetFormatCodesQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `FormatCode|error`

Sample code:

```ballerina
system:FormatCode result = check fo->getFormatCodes("USMF", "URGP", "ServiceLevel");
```

</details>

<details>
<summary>deleteFormatCodes</summary>

Deletes a FormatCode by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `code` | `string` | Yes | The format code key field, e.g. `"URGP"`. |
| `'type` | `string` | Yes | The format code type key field, e.g. `"ServiceLevel"`. |
| `headers` | `DeleteFormatCodesHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteFormatCodes("USMF", "URGP", "ServiceLevel");
```

</details>

<details>
<summary>updateFormatCodes</summary>

Updates an existing FormatCode.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `code` | `string` | Yes | The format code key field, e.g. `"URGP"`. |
| `'type` | `string` | Yes | The format code type key field, e.g. `"ServiceLevel"`. |
| `payload` | `FormatCode` | Yes | The fields to update. |
| `headers` | `UpdateFormatCodesHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `FormatCode|error`

Sample code:

```ballerina
system:FormatCode payload = {
    description: "Urgent payment - revised"
};
system:FormatCode result = check fo->updateFormatCodes("USMF", "URGP", "ServiceLevel", payload);
```

</details>

#### Houses

<details>
<summary>listHouses</summary>

Lists House records, with optional OData query support.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `ListHousesQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `HousesCollection|error`

Sample code:

```ballerina
system:HousesCollection result = check fo->listHouses();
```

</details>

<details>
<summary>createHouses</summary>

Creates a new House.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `House` | Yes | The House record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |

Returns: `House|error`

Sample code:

```ballerina
system:House payload = {
    dataAreaId: "RUMF",
    houseId: "H-001",
    houseNum: "12",
    buildNum: "A",
    postalCode: "123456",
    startDate: "2026-01-01"
};
system:House result = check fo->createHouses(payload);
```

</details>

<details>
<summary>getHouses</summary>

Retrieves a single House by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"RUMF"`. |
| `houseId` | `string` | Yes | The house id key field, e.g. `"H-001"`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `GetHousesQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `House|error`

Sample code:

```ballerina
system:House result = check fo->getHouses("RUMF", "H-001");
```

</details>

<details>
<summary>deleteHouses</summary>

Deletes a House by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"RUMF"`. |
| `houseId` | `string` | Yes | The house id key field, e.g. `"H-001"`. |
| `headers` | `DeleteHousesHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteHouses("RUMF", "H-001");
```

</details>

<details>
<summary>updateHouses</summary>

Updates an existing House.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"RUMF"`. |
| `houseId` | `string` | Yes | The house id key field, e.g. `"H-001"`. |
| `payload` | `House` | Yes | The fields to update. |
| `headers` | `UpdateHousesHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `House|error`

Sample code:

```ballerina
system:House payload = {
    postalCode: "654321"
};
system:House result = check fo->updateHouses("RUMF", "H-001", payload);
```

</details>

#### Import Modes

<details>
<summary>listImportModes</summary>

Lists ImportMode records, with optional OData query support.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `ListImportModesQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `ImportModesCollection|error`

Sample code:

```ballerina
system:ImportModesCollection result = check fo->listImportModes();
```

</details>

<details>
<summary>createImportModes</summary>

Creates a new ImportMode.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `ImportMode` | Yes | The ImportMode record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |

Returns: `ImportMode|error`

Sample code:

```ballerina
system:ImportMode payload = {
    dataAreaId: "USMF",
    methodOfImport: "EFT",
    description: "Electronic funds transfer",
    className: "ImportEFT",
    classID: 101,
    bankAccount: "BANK-001"
};
system:ImportMode result = check fo->createImportModes(payload);
```

</details>

<details>
<summary>getImportModes</summary>

Retrieves a single ImportMode by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `methodOfImport` | `string` | Yes | The method of import key field, e.g. `"EFT"`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `GetImportModesQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `ImportMode|error`

Sample code:

```ballerina
system:ImportMode result = check fo->getImportModes("USMF", "EFT");
```

</details>

<details>
<summary>deleteImportModes</summary>

Deletes a ImportMode by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `methodOfImport` | `string` | Yes | The method of import key field, e.g. `"EFT"`. |
| `headers` | `DeleteImportModesHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteImportModes("USMF", "EFT");
```

</details>

<details>
<summary>updateImportModes</summary>

Updates an existing ImportMode.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `methodOfImport` | `string` | Yes | The method of import key field, e.g. `"EFT"`. |
| `payload` | `ImportMode` | Yes | The fields to update. |
| `headers` | `UpdateImportModesHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `ImportMode|error`

Sample code:

```ballerina
system:ImportMode payload = {
    description: "Electronic funds transfer - revised"
};
system:ImportMode result = check fo->updateImportModes("USMF", "EFT", payload);
```

</details>

#### Item GTDs

<details>
<summary>listItemGTDs</summary>

Lists ItemGTD records, with optional OData query support.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `ListItemGTDsQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `ItemGTDsCollection|error`

Sample code:

```ballerina
system:ItemGTDsCollection result = check fo->listItemGTDs();
```

</details>

<details>
<summary>createItemGTDs</summary>

Creates a new ItemGTD.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `ItemGTD` | Yes | The ItemGTD record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |

Returns: `ItemGTD|error`

Sample code:

```ballerina
system:ItemGTD payload = {
    dataAreaId: "RUMF",
    itemNumber: "ITEM-001",
    gTDNumber: "GTD-2026-001",
    itemOriginCountryRegionId: "CHN"
};
system:ItemGTD result = check fo->createItemGTDs(payload);
```

</details>

<details>
<summary>getItemGTDs</summary>

Retrieves a single ItemGTD by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"RUMF"`. |
| `itemNumber` | `string` | Yes | The item number key field, e.g. `"ITEM-001"`. |
| `gTDNumber` | `string` | Yes | The GTD (customs declaration) number key field, e.g. `"GTD-2026-001"`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `GetItemGTDsQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `ItemGTD|error`

Sample code:

```ballerina
system:ItemGTD result = check fo->getItemGTDs("RUMF", "ITEM-001", "GTD-2026-001");
```

</details>

<details>
<summary>deleteItemGTDs</summary>

Deletes a ItemGTD by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"RUMF"`. |
| `itemNumber` | `string` | Yes | The item number key field, e.g. `"ITEM-001"`. |
| `gTDNumber` | `string` | Yes | The GTD (customs declaration) number key field, e.g. `"GTD-2026-001"`. |
| `headers` | `DeleteItemGTDsHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteItemGTDs("RUMF", "ITEM-001", "GTD-2026-001");
```

</details>

<details>
<summary>updateItemGTDs</summary>

Updates an existing ItemGTD.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"RUMF"`. |
| `itemNumber` | `string` | Yes | The item number key field, e.g. `"ITEM-001"`. |
| `gTDNumber` | `string` | Yes | The GTD (customs declaration) number key field, e.g. `"GTD-2026-001"`. |
| `payload` | `ItemGTD` | Yes | The fields to update. |
| `headers` | `UpdateItemGTDsHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `ItemGTD|error`

Sample code:

```ballerina
system:ItemGTD payload = {
    itemOriginCountryRegionId: "VNM"
};
system:ItemGTD result = check fo->updateItemGTDs("RUMF", "ITEM-001", "GTD-2026-001", payload);
```

</details>

#### Load Templates

<details>
<summary>listLoadTemplates</summary>

Lists LoadTemplate records, with optional OData query support.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `ListLoadTemplatesQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `LoadTemplatesCollection|error`

Sample code:

```ballerina
system:LoadTemplatesCollection result = check fo->listLoadTemplates();
```

</details>

<details>
<summary>createLoadTemplates</summary>

Creates a new LoadTemplate.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `LoadTemplate` | Yes | The LoadTemplate record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |

Returns: `LoadTemplate|error`

Sample code:

```ballerina
system:LoadTemplate payload = {
    dataAreaId: "USMF",
    templateId: "PALLET-STD",
    maximumLoadWeight: 500.0,
    maximumQuantity: 100,
    isLoadFloorStacked: "Yes"
};
system:LoadTemplate result = check fo->createLoadTemplates(payload);
```

</details>

<details>
<summary>getLoadTemplates</summary>

Retrieves a single LoadTemplate by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `templateId` | `string` | Yes | The load template id key field, e.g. `"PALLET-STD"`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `GetLoadTemplatesQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `LoadTemplate|error`

Sample code:

```ballerina
system:LoadTemplate result = check fo->getLoadTemplates("USMF", "PALLET-STD");
```

</details>

<details>
<summary>deleteLoadTemplates</summary>

Deletes a LoadTemplate by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `templateId` | `string` | Yes | The load template id key field, e.g. `"PALLET-STD"`. |
| `headers` | `DeleteLoadTemplatesHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteLoadTemplates("USMF", "PALLET-STD");
```

</details>

<details>
<summary>updateLoadTemplates</summary>

Updates an existing LoadTemplate.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `templateId` | `string` | Yes | The load template id key field, e.g. `"PALLET-STD"`. |
| `payload` | `LoadTemplate` | Yes | The fields to update. |
| `headers` | `UpdateLoadTemplatesHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `LoadTemplate|error`

Sample code:

```ballerina
system:LoadTemplate payload = {
    maximumLoadWeight: 600.0
};
system:LoadTemplate result = check fo->updateLoadTemplates("USMF", "PALLET-STD", payload);
```

</details>

#### Loyalty Levels

<details>
<summary>listLoyaltyLevels</summary>

Lists LoyaltyLevel records, with optional OData query support.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `ListLoyaltyLevelsQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `LoyaltyLevelsCollection|error`

Sample code:

```ballerina
system:LoyaltyLevelsCollection result = check fo->listLoyaltyLevels();
```

</details>

<details>
<summary>createLoyaltyLevels</summary>

Creates a new LoyaltyLevel.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `LoyaltyLevel` | Yes | The LoyaltyLevel record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |

Returns: `LoyaltyLevel|error`

Sample code:

```ballerina
system:LoyaltyLevel payload = {
    dataAreaId: "USMF",
    levelPhrase: "GOLD",
    levelDescription: "Gold tier"
};
system:LoyaltyLevel result = check fo->createLoyaltyLevels(payload);
```

</details>

<details>
<summary>getLoyaltyLevels</summary>

Retrieves a single LoyaltyLevel by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `levelPhrase` | `string` | Yes | The loyalty level phrase key field, e.g. `"GOLD"`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `GetLoyaltyLevelsQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `LoyaltyLevel|error`

Sample code:

```ballerina
system:LoyaltyLevel result = check fo->getLoyaltyLevels("USMF", "GOLD");
```

</details>

<details>
<summary>deleteLoyaltyLevels</summary>

Deletes a LoyaltyLevel by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `levelPhrase` | `string` | Yes | The loyalty level phrase key field, e.g. `"GOLD"`. |
| `headers` | `DeleteLoyaltyLevelsHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteLoyaltyLevels("USMF", "GOLD");
```

</details>

<details>
<summary>updateLoyaltyLevels</summary>

Updates an existing LoyaltyLevel.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `levelPhrase` | `string` | Yes | The loyalty level phrase key field, e.g. `"GOLD"`. |
| `payload` | `LoyaltyLevel` | Yes | The fields to update. |
| `headers` | `UpdateLoyaltyLevelsHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `LoyaltyLevel|error`

Sample code:

```ballerina
system:LoyaltyLevel payload = {
    levelDescription: "Gold tier - revised"
};
system:LoyaltyLevel result = check fo->updateLoyaltyLevels("USMF", "GOLD", payload);
```

</details>

#### Model Tables

<details>
<summary>listModelTables</summary>

Lists ModelTable records, with optional OData query support.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `ListModelTablesQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `ModelTablesCollection|error`

Sample code:

```ballerina
system:ModelTablesCollection result = check fo->listModelTables();
```

</details>

<details>
<summary>createModelTables</summary>

Creates a new ModelTable.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `ModelTable` | Yes | The ModelTable record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |

Returns: `ModelTable|error`

Sample code:

```ballerina
system:ModelTable payload = {
    dataAreaId: "USMF",
    model: "STD-DEPR",
    description: "Standard depreciation model"
};
system:ModelTable result = check fo->createModelTables(payload);
```

</details>

<details>
<summary>getModelTables</summary>

Retrieves a single ModelTable by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `model` | `string` | Yes | The model key field, e.g. `"STD-DEPR"`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `GetModelTablesQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `ModelTable|error`

Sample code:

```ballerina
system:ModelTable result = check fo->getModelTables("USMF", "STD-DEPR");
```

</details>

<details>
<summary>deleteModelTables</summary>

Deletes a ModelTable by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `model` | `string` | Yes | The model key field, e.g. `"STD-DEPR"`. |
| `headers` | `DeleteModelTablesHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteModelTables("USMF", "STD-DEPR");
```

</details>

<details>
<summary>updateModelTables</summary>

Updates an existing ModelTable.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `model` | `string` | Yes | The model key field, e.g. `"STD-DEPR"`. |
| `payload` | `ModelTable` | Yes | The fields to update. |
| `headers` | `UpdateModelTablesHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `ModelTable|error`

Sample code:

```ballerina
system:ModelTable payload = {
    description: "Standard depreciation model - revised"
};
system:ModelTable result = check fo->updateModelTables("USMF", "STD-DEPR", payload);
```

</details>

#### Of Businesses

<details>
<summary>listOfBusinesses</summary>

Lists OfBusiness records, with optional OData query support.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `ListOfBusinessesQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `OfBusinessesCollection|error`

Sample code:

```ballerina
system:OfBusinessesCollection result = check fo->listOfBusinesses();
```

</details>

<details>
<summary>createOfBusinesses</summary>

Creates a new OfBusiness.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `OfBusiness` | Yes | The OfBusiness record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |

Returns: `OfBusiness|error`

Sample code:

```ballerina
system:OfBusiness payload = {
    dataAreaId: "USMF",
    lineOfBusiness: "RETAIL",
    description: "Retail line of business"
};
system:OfBusiness result = check fo->createOfBusinesses(payload);
```

</details>

<details>
<summary>getOfBusinesses</summary>

Retrieves a single OfBusiness by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `lineOfBusiness` | `string` | Yes | The line of business key field, e.g. `"RETAIL"`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `GetOfBusinessesQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `OfBusiness|error`

Sample code:

```ballerina
system:OfBusiness result = check fo->getOfBusinesses("USMF", "RETAIL");
```

</details>

<details>
<summary>deleteOfBusinesses</summary>

Deletes a OfBusiness by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `lineOfBusiness` | `string` | Yes | The line of business key field, e.g. `"RETAIL"`. |
| `headers` | `DeleteOfBusinessesHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteOfBusinesses("USMF", "RETAIL");
```

</details>

<details>
<summary>updateOfBusinesses</summary>

Updates an existing OfBusiness.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `lineOfBusiness` | `string` | Yes | The line of business key field, e.g. `"RETAIL"`. |
| `payload` | `OfBusiness` | Yes | The fields to update. |
| `headers` | `UpdateOfBusinessesHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `OfBusiness|error`

Sample code:

```ballerina
system:OfBusiness payload = {
    description: "Retail line of business - revised"
};
system:OfBusiness result = check fo->updateOfBusinesses("USMF", "RETAIL", payload);
```

</details>

#### Other Clients

<details>
<summary>listOtherClients</summary>

Lists OtherClients records, with optional OData query support.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `ListOtherClientsQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `OtherClientsCollection|error`

Sample code:

```ballerina
system:OtherClientsCollection result = check fo->listOtherClients();
```

</details>

<details>
<summary>createOtherClients</summary>

Creates a new OtherClients.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `OtherClients` | Yes | The OtherClients record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |

Returns: `OtherClients|error`

Sample code:

```ballerina
system:OtherClients payload = {
    dataAreaId: "USMF",
    code: "OC-001",
    name: "Regional Tax Authority",
    partyNumber: "000123",
    address: "123 Main St"
};
system:OtherClients result = check fo->createOtherClients(payload);
```

</details>

<details>
<summary>getOtherClients</summary>

Retrieves a single OtherClients by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `code` | `string` | Yes | The other client code key field, e.g. `"OC-001"`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `GetOtherClientsQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `OtherClients|error`

Sample code:

```ballerina
system:OtherClients result = check fo->getOtherClients("USMF", "OC-001");
```

</details>

<details>
<summary>deleteOtherClients</summary>

Deletes a OtherClients by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `code` | `string` | Yes | The other client code key field, e.g. `"OC-001"`. |
| `headers` | `DeleteOtherClientsHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteOtherClients("USMF", "OC-001");
```

</details>

<details>
<summary>updateOtherClients</summary>

Updates an existing OtherClients.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `code` | `string` | Yes | The other client code key field, e.g. `"OC-001"`. |
| `payload` | `OtherClients` | Yes | The fields to update. |
| `headers` | `UpdateOtherClientsHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `OtherClients|error`

Sample code:

```ballerina
system:OtherClients payload = {
    name: "Regional Tax Authority - revised"
};
system:OtherClients result = check fo->updateOtherClients("USMF", "OC-001", payload);
```

</details>

#### Parameters

<details>
<summary>listParameters</summary>

Lists Parameters records, with optional OData query support.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `ListParametersQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `ParametersCollection|error`

Sample code:

```ballerina
system:ParametersCollection result = check fo->listParameters();
```

</details>

<details>
<summary>createParameters</summary>

Creates a new Parameters.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `Parameters` | Yes | The Parameters record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |

Returns: `Parameters|error`

Sample code:

```ballerina
system:Parameters payload = {
    dataAreaId: "USMF",
    industry: "Manufacturing",
    orgNumber: "123456789"
};
system:Parameters result = check fo->createParameters(payload);
```

</details>

<details>
<summary>getParameters</summary>

Retrieves a single Parameters by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `'key` | `int` | Yes | The entity key value, e.g. `1`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `GetParametersQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `Parameters|error`

Sample code:

```ballerina
system:Parameters result = check fo->getParameters("USMF", 1);
```

</details>

<details>
<summary>deleteParameters</summary>

Deletes a Parameters by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `'key` | `int` | Yes | The entity key value, e.g. `1`. |
| `headers` | `DeleteParametersHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteParameters("USMF", 1);
```

</details>

<details>
<summary>updateParameters</summary>

Updates an existing Parameters.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `'key` | `int` | Yes | The entity key value, e.g. `1`. |
| `payload` | `Parameters` | Yes | The fields to update. |
| `headers` | `UpdateParametersHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `Parameters|error`

Sample code:

```ballerina
system:Parameters payload = {
    industry: "Discrete manufacturing"
};
system:Parameters result = check fo->updateParameters("USMF", 1, payload);
```

</details>

#### Service Codes

<details>
<summary>listServiceCodes</summary>

Lists ServiceCodes records, with optional OData query support.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `ListServiceCodesQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `ServiceCodesCollection|error`

Sample code:

```ballerina
system:ServiceCodesCollection result = check fo->listServiceCodes();
```

</details>

<details>
<summary>createServiceCodes</summary>

Creates a new ServiceCodes.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `ServiceCodes` | Yes | The ServiceCodes record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |

Returns: `ServiceCodes|error`

Sample code:

```ballerina
system:ServiceCodes payload = {
    dataAreaId: "INMF",
    serviceCode: "SC-001",
    name: "Consulting services",
    serviceAccountingCode: "998311",
    minorHead: "0001"
};
system:ServiceCodes result = check fo->createServiceCodes(payload);
```

</details>

<details>
<summary>getServiceCodes</summary>

Retrieves a single ServiceCodes by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"INMF"`. |
| `serviceCode` | `string` | Yes | The service code key field, e.g. `"SC-001"`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `GetServiceCodesQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `ServiceCodes|error`

Sample code:

```ballerina
system:ServiceCodes result = check fo->getServiceCodes("INMF", "SC-001");
```

</details>

<details>
<summary>deleteServiceCodes</summary>

Deletes a ServiceCodes by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"INMF"`. |
| `serviceCode` | `string` | Yes | The service code key field, e.g. `"SC-001"`. |
| `headers` | `DeleteServiceCodesHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteServiceCodes("INMF", "SC-001");
```

</details>

<details>
<summary>updateServiceCodes</summary>

Updates an existing ServiceCodes.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"INMF"`. |
| `serviceCode` | `string` | Yes | The service code key field, e.g. `"SC-001"`. |
| `payload` | `ServiceCodes` | Yes | The fields to update. |
| `headers` | `UpdateServiceCodesHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `ServiceCodes|error`

Sample code:

```ballerina
system:ServiceCodes payload = {
    name: "Consulting services - revised"
};
system:ServiceCodes result = check fo->updateServiceCodes("INMF", "SC-001", payload);
```

</details>

#### Site Gate

<details>
<summary>listSiteGate</summary>

Lists SiteGate records, with optional OData query support.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `ListSiteGateQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `SiteGateCollection|error`

Sample code:

```ballerina
system:SiteGateCollection result = check fo->listSiteGate();
```

</details>

<details>
<summary>createSiteGate</summary>

Creates a new SiteGate.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `SiteGate` | Yes | The SiteGate record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |

Returns: `SiteGate|error`

Sample code:

```ballerina
system:SiteGate payload = {
    dataAreaId: "USMF",
    'type: "In",
    siteId: "SITE-01",
    gateId: "GATE-01",
    description: "Inbound receiving gate"
};
system:SiteGate result = check fo->createSiteGate(payload);
```

</details>

<details>
<summary>getSiteGate</summary>

Retrieves a single SiteGate by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `'type` | `string` | Yes | The site gate type key field (`In` or `Out`), e.g. `"In"`. |
| `gateId` | `string` | Yes | The gate id key field, e.g. `"GATE-01"`. |
| `siteId` | `string` | Yes | The site id key field, e.g. `"SITE-01"`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `GetSiteGateQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `SiteGate|error`

Sample code:

```ballerina
system:SiteGate result = check fo->getSiteGate("USMF", "In", "GATE-01", "SITE-01");
```

</details>

<details>
<summary>deleteSiteGate</summary>

Deletes a SiteGate by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `'type` | `string` | Yes | The site gate type key field (`In` or `Out`), e.g. `"In"`. |
| `gateId` | `string` | Yes | The gate id key field, e.g. `"GATE-01"`. |
| `siteId` | `string` | Yes | The site id key field, e.g. `"SITE-01"`. |
| `headers` | `DeleteSiteGateHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteSiteGate("USMF", "In", "GATE-01", "SITE-01");
```

</details>

<details>
<summary>updateSiteGate</summary>

Updates an existing SiteGate.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `'type` | `string` | Yes | The site gate type key field (`In` or `Out`), e.g. `"In"`. |
| `gateId` | `string` | Yes | The gate id key field, e.g. `"GATE-01"`. |
| `siteId` | `string` | Yes | The site id key field, e.g. `"SITE-01"`. |
| `payload` | `SiteGate` | Yes | The fields to update. |
| `headers` | `UpdateSiteGateHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `SiteGate|error`

Sample code:

```ballerina
system:SiteGate payload = {
    description: "Inbound receiving gate - revised"
};
system:SiteGate result = check fo->updateSiteGate("USMF", "In", "GATE-01", "SITE-01", payload);
```

</details>
