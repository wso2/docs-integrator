---
title: Actions
toc_max_heading_level: 4
---

# Actions

The `ballerinax/microsoft.dynamics365.finance.tax` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Provides create, read, update, and delete access to Microsoft Dynamics 365 Finance and Operations tax master data and configuration entities via OData. |

---

## Client

Provides create, read, update, and delete access to Microsoft Dynamics 365 Finance and Operations tax master data and configuration entities via OData.

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
import ballerinax/microsoft.dynamics365.finance.tax;

configurable string tokenUrl = ?;
configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string serviceUrl = ?;

tax:Client fo = check new (
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

#### CFOP Codes

<details>
<summary>listCFOPCodes</summary>

<div>

Lists CFOP (Código Fiscal de Operações e Prestações) codes used for Brazilian fiscal document classification.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `ListCFOPCodesQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `CFOPCodesCollection|error`

Sample code:

```ballerina
tax:CFOPCodesCollection result = check fo->listCFOPCodes();
```

</div>

</details>

<details>
<summary>createCFOPCodes</summary>

<div>

Creates a CFOP code.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CFOPCodes` | Yes | The CFOP code record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `CFOPCodes|error`

Sample code:

```ballerina
tax:CFOPCodes result = check fo->createCFOPCodes({
    dataAreaId: "BRMF",
    cFOP: "5102",
    name: "Sale of production - within state",
    direction: "Outgoing",
    purpose: "Shipment"
});
```

</div>

</details>

<details>
<summary>getCFOPCodes</summary>

<div>

Retrieves a CFOP code by its composite key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"BRMF"`. |
| `cFOP` | `string` | Yes | The CFOP key field, e.g. `"5102"`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `GetCFOPCodesQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `CFOPCodes|error`

Sample code:

```ballerina
tax:CFOPCodes result = check fo->getCFOPCodes("BRMF", "5102");
```

</div>

</details>

<details>
<summary>deleteCFOPCodes</summary>

<div>

Deletes a CFOP code.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `cFOP` | `string` | Yes | The CFOP key field. |
| `headers` | `DeleteCFOPCodesHeaders` | No | Optional `ifMatch` ETag for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
error? result = fo->deleteCFOPCodes("BRMF", "5102");
```

</div>

</details>

<details>
<summary>updateCFOPCodes</summary>

<div>

Updates a CFOP code.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `cFOP` | `string` | Yes | The CFOP key field. |
| `payload` | `CFOPCodes` | Yes | The fields to update. |
| `headers` | `UpdateCFOPCodesHeaders` | No | Optional `ifMatch` ETag for optimistic concurrency. |

Returns: `CFOPCodes|error`

Sample code:

```ballerina
tax:CFOPCodes result = check fo->updateCFOPCodes("BRMF", "5102", {
    name: "Sale of production - within state (revised)"
});
```

</div>

</details>

#### CFOP Groups

<details>
<summary>listCFOPGroups</summary>

<div>

Lists CFOP groups used to bucket CFOP codes for Brazilian tax determination.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `ListCFOPGroupsQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `CFOPGroupsCollection|error`

Sample code:

```ballerina
tax:CFOPGroupsCollection result = check fo->listCFOPGroups();
```

</div>

</details>

<details>
<summary>createCFOPGroups</summary>

<div>

Creates a CFOP group.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CFOPGroup` | Yes | The CFOP group record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `CFOPGroup|error`

Sample code:

```ballerina
tax:CFOPGroup result = check fo->createCFOPGroups({
    dataAreaId: "BRMF",
    groupId: "SALES",
    description: "Domestic sales CFOP group"
});
```

</div>

</details>

<details>
<summary>getCFOPGroups</summary>

<div>

Retrieves a CFOP group by its composite key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `groupId` | `string` | Yes | The group ID key field, e.g. `"SALES"`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `GetCFOPGroupsQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `CFOPGroup|error`

Sample code:

```ballerina
tax:CFOPGroup result = check fo->getCFOPGroups("BRMF", "SALES");
```

</div>

</details>

<details>
<summary>deleteCFOPGroups</summary>

<div>

Deletes a CFOP group.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `groupId` | `string` | Yes | The group ID key field. |
| `headers` | `DeleteCFOPGroupsHeaders` | No | Optional `ifMatch` ETag for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
error? result = fo->deleteCFOPGroups("BRMF", "SALES");
```

</div>

</details>

<details>
<summary>updateCFOPGroups</summary>

<div>

Updates a CFOP group.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `groupId` | `string` | Yes | The group ID key field. |
| `payload` | `CFOPGroup` | Yes | The fields to update. |
| `headers` | `UpdateCFOPGroupsHeaders` | No | Optional `ifMatch` ETag for optimistic concurrency. |

Returns: `CFOPGroup|error`

Sample code:

```ballerina
tax:CFOPGroup result = check fo->updateCFOPGroups("BRMF", "SALES", {
    description: "Domestic sales CFOP group - updated"
});
```

</div>

</details>

#### EL Parameters

<details>
<summary>listELParameters</summary>

<div>

Lists electronic ledger (EL) parameters used for multi-branch accounting configuration.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `ListELParametersQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `ELParametersCollection|error`

Sample code:

```ballerina
tax:ELParametersCollection result = check fo->listELParameters();
```

</div>

</details>

<details>
<summary>createELParameters</summary>

<div>

Creates an EL parameters record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `ELParameter` | Yes | The EL parameters record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `ELParameter|error`

Sample code:

```ballerina
tax:ELParameter result = check fo->createELParameters({
    dataAreaId: "RUMF",
    key: 1,
    branchId: "0001",
    branchDescription: "Main branch",
    isActiveMultiBranch: "Yes"
});
```

</div>

</details>

<details>
<summary>getELParameters</summary>

<div>

Retrieves an EL parameters record by its composite key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `key` | `int` | Yes | The entity key value, e.g. `1`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `GetELParametersQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `ELParameter|error`

Sample code:

```ballerina
tax:ELParameter result = check fo->getELParameters("RUMF", 1);
```

</div>

</details>

<details>
<summary>deleteELParameters</summary>

<div>

Deletes an EL parameters record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `key` | `int` | Yes | The entity key value. |
| `headers` | `DeleteELParametersHeaders` | No | Optional `ifMatch` ETag for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
error? result = fo->deleteELParameters("RUMF", 1);
```

</div>

</details>

<details>
<summary>updateELParameters</summary>

<div>

Updates an EL parameters record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `key` | `int` | Yes | The entity key value. |
| `payload` | `ELParameter` | Yes | The fields to update. |
| `headers` | `UpdateELParametersHeaders` | No | Optional `ifMatch` ETag for optimistic concurrency. |

Returns: `ELParameter|error`

Sample code:

```ballerina
tax:ELParameter result = check fo->updateELParameters("RUMF", 1, {
    branchDescription: "Main branch - updated"
});
```

</div>

</details>

#### GST Minor Codes

<details>
<summary>listGSTMinorCodes</summary>

<div>

Lists GST minor codes used for Indian GST component classification.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `ListGSTMinorCodesQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `GSTMinorCodesCollection|error`

Sample code:

```ballerina
tax:GSTMinorCodesCollection result = check fo->listGSTMinorCodes();
```

</div>

</details>

<details>
<summary>createGSTMinorCodes</summary>

<div>

Creates a GST minor code.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `GSTMinorCode` | Yes | The GST minor code record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `GSTMinorCode|error`

Sample code:

```ballerina
tax:GSTMinorCode result = check fo->createGSTMinorCodes({
    dataAreaId: "INMF",
    minorCode: "M001",
    taxComponent: "CGST",
    description: "Central GST minor code"
});
```

</div>

</details>

<details>
<summary>getGSTMinorCodes</summary>

<div>

Retrieves a GST minor code by its composite key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `minorCode` | `string` | Yes | The minor code key field, e.g. `"M001"`. |
| `taxComponent` | `string` | Yes | The tax component key field, e.g. `"CGST"`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `GetGSTMinorCodesQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `GSTMinorCode|error`

Sample code:

```ballerina
tax:GSTMinorCode result = check fo->getGSTMinorCodes("INMF", "M001", "CGST");
```

</div>

</details>

<details>
<summary>deleteGSTMinorCodes</summary>

<div>

Deletes a GST minor code.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `minorCode` | `string` | Yes | The minor code key field. |
| `taxComponent` | `string` | Yes | The tax component key field. |
| `headers` | `DeleteGSTMinorCodesHeaders` | No | Optional `ifMatch` ETag for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
error? result = fo->deleteGSTMinorCodes("INMF", "M001", "CGST");
```

</div>

</details>

<details>
<summary>updateGSTMinorCodes</summary>

<div>

Updates a GST minor code.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `minorCode` | `string` | Yes | The minor code key field. |
| `taxComponent` | `string` | Yes | The tax component key field. |
| `payload` | `GSTMinorCode` | Yes | The fields to update. |
| `headers` | `UpdateGSTMinorCodesHeaders` | No | Optional `ifMatch` ETag for optimistic concurrency. |

Returns: `GSTMinorCode|error`

Sample code:

```ballerina
tax:GSTMinorCode result = check fo->updateGSTMinorCodes("INMF", "M001", "CGST", {
    description: "Central GST minor code - updated"
});
```

</div>

</details>

#### HSN Codes

<details>
<summary>listHSNCodes</summary>

<div>

Lists Harmonized System of Nomenclature (HSN) codes used for Indian goods classification.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `ListHSNCodesQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `HSNCodesCollection|error`

Sample code:

```ballerina
tax:HSNCodesCollection result = check fo->listHSNCodes();
```

</div>

</details>

<details>
<summary>createHSNCodes</summary>

<div>

Creates an HSN code.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `HSNCode` | Yes | The HSN code record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `HSNCode|error`

Sample code:

```ballerina
tax:HSNCode result = check fo->createHSNCodes({
    dataAreaId: "INMF",
    chapter: "84",
    heading: "8471",
    subheading: "8471.30",
    countryExtension: "00",
    statisticalSuffix: "00",
    code: "84718030",
    description: "Portable digital automatic data processing machines"
});
```

</div>

</details>

<details>
<summary>getHSNCodes</summary>

<div>

Retrieves an HSN code by its composite key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `chapter` | `string` | Yes | The chapter key field, e.g. `"84"`. |
| `heading` | `string` | Yes | The heading key field, e.g. `"8471"`. |
| `subheading` | `string` | Yes | The subheading key field, e.g. `"8471.30"`. |
| `countryExtension` | `string` | Yes | The country extension key field. |
| `statisticalSuffix` | `string` | Yes | The statistical suffix key field. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `GetHSNCodesQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `HSNCode|error`

Sample code:

```ballerina
tax:HSNCode result = check fo->getHSNCodes("INMF", "84", "8471", "8471.30", "00", "00");
```

</div>

</details>

<details>
<summary>deleteHSNCodes</summary>

<div>

Deletes an HSN code.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `chapter` | `string` | Yes | The chapter key field. |
| `heading` | `string` | Yes | The heading key field. |
| `subheading` | `string` | Yes | The subheading key field. |
| `countryExtension` | `string` | Yes | The country extension key field. |
| `statisticalSuffix` | `string` | Yes | The statistical suffix key field. |
| `headers` | `DeleteHSNCodesHeaders` | No | Optional `ifMatch` ETag for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
error? result = fo->deleteHSNCodes("INMF", "84", "8471", "8471.30", "00", "00");
```

</div>

</details>

<details>
<summary>updateHSNCodes</summary>

<div>

Updates an HSN code.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `chapter` | `string` | Yes | The chapter key field. |
| `heading` | `string` | Yes | The heading key field. |
| `subheading` | `string` | Yes | The subheading key field. |
| `countryExtension` | `string` | Yes | The country extension key field. |
| `statisticalSuffix` | `string` | Yes | The statistical suffix key field. |
| `payload` | `HSNCode` | Yes | The fields to update. |
| `headers` | `UpdateHSNCodesHeaders` | No | Optional `ifMatch` ETag for optimistic concurrency. |

Returns: `HSNCode|error`

Sample code:

```ballerina
tax:HSNCode result = check fo->updateHSNCodes("INMF", "84", "8471", "8471.30", "00", "00", {
    description: "Portable digital automatic data processing machines - updated"
});
```

</div>

</details>

#### Tax Code Limits

<details>
<summary>listTaxCodeLimits</summary>

<div>

Lists minimum and maximum sales tax amount limits configured for tax codes.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `ListTaxCodeLimitsQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `TaxCodeLimitsCollection|error`

Sample code:

```ballerina
tax:TaxCodeLimitsCollection result = check fo->listTaxCodeLimits();
```

</div>

</details>

<details>
<summary>createTaxCodeLimits</summary>

<div>

Creates a tax code limit.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `TaxCodeLimit` | Yes | The tax code limit record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `TaxCodeLimit|error`

Sample code:

```ballerina
tax:TaxCodeLimit result = check fo->createTaxCodeLimits({
    dataAreaId: "USMF",
    taxCodeId: "VAT20",
    fromDate: "2026-01-01",
    toDate: "2026-12-31",
    minimumSalesTax: 0d,
    maximumSalesTax: 5000.00d
});
```

</div>

</details>

<details>
<summary>getTaxCodeLimits</summary>

<div>

Retrieves a tax code limit by its composite key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `taxCodeId` | `string` | Yes | The tax code ID key field, e.g. `"VAT20"`. |
| `fromDate` | `string` | Yes | The from date key field, e.g. `"2026-01-01"`. |
| `toDate` | `string` | Yes | The to date key field, e.g. `"2026-12-31"`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `GetTaxCodeLimitsQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `TaxCodeLimit|error`

Sample code:

```ballerina
tax:TaxCodeLimit result = check fo->getTaxCodeLimits("USMF", "VAT20", "2026-01-01", "2026-12-31");
```

</div>

</details>

<details>
<summary>deleteTaxCodeLimits</summary>

<div>

Deletes a tax code limit.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `taxCodeId` | `string` | Yes | The tax code ID key field. |
| `fromDate` | `string` | Yes | The from date key field. |
| `toDate` | `string` | Yes | The to date key field. |
| `headers` | `DeleteTaxCodeLimitsHeaders` | No | Optional `ifMatch` ETag for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
error? result = fo->deleteTaxCodeLimits("USMF", "VAT20", "2026-01-01", "2026-12-31");
```

</div>

</details>

<details>
<summary>updateTaxCodeLimits</summary>

<div>

Updates a tax code limit.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `taxCodeId` | `string` | Yes | The tax code ID key field. |
| `fromDate` | `string` | Yes | The from date key field. |
| `toDate` | `string` | Yes | The to date key field. |
| `payload` | `TaxCodeLimit` | Yes | The fields to update. |
| `headers` | `UpdateTaxCodeLimitsHeaders` | No | Optional `ifMatch` ETag for optimistic concurrency. |

Returns: `TaxCodeLimit|error`

Sample code:

```ballerina
tax:TaxCodeLimit result = check fo->updateTaxCodeLimits("USMF", "VAT20", "2026-01-01", "2026-12-31", {
    maximumSalesTax: 6000.00d
});
```

</div>

</details>

#### Tax Codes

<details>
<summary>listTaxCodes</summary>

<div>

Lists tax codes used to calculate sales tax, VAT, and GST amounts.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `ListTaxCodesQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `TaxCodesCollection|error`

Sample code:

```ballerina
tax:TaxCodesCollection result = check fo->listTaxCodes();
```

</div>

</details>

<details>
<summary>createTaxCodes</summary>

<div>

Creates a tax code.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `TaxCode` | Yes | The tax code record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `TaxCode|error`

Sample code:

```ballerina
tax:TaxCode result = check fo->createTaxCodes({
    dataAreaId: "USMF",
    taxCode: "VAT20",
    taxName: "VAT 20%",
    taxRoundOff: 0.01d,
    taxRoundOffType: "Ordinary",
    taxCalculationMethod: "FullAmounts"
});
```

</div>

</details>

<details>
<summary>getTaxCodes</summary>

<div>

Retrieves a tax code by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `taxCode` | `string` | Yes | The tax code key field, e.g. `"VAT20"`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `GetTaxCodesQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `TaxCode|error`

Sample code:

```ballerina
tax:TaxCode result = check fo->getTaxCodes("USMF", "VAT20");
```

</div>

</details>

<details>
<summary>deleteTaxCodes</summary>

<div>

Deletes a tax code.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `taxCode` | `string` | Yes | The tax code key field. |
| `headers` | `DeleteTaxCodesHeaders` | No | Optional `ifMatch` ETag for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
error? result = fo->deleteTaxCodes("USMF", "VAT20");
```

</div>

</details>

<details>
<summary>updateTaxCodes</summary>

<div>

Updates a tax code.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `taxCode` | `string` | Yes | The tax code key field. |
| `payload` | `TaxCode` | Yes | The fields to update. |
| `headers` | `UpdateTaxCodesHeaders` | No | Optional `ifMatch` ETag for optimistic concurrency. |

Returns: `TaxCode|error`

Sample code:

```ballerina
tax:TaxCode result = check fo->updateTaxCodes("USMF", "VAT20", {
    taxName: "VAT 20% (standard rate)"
});
```

</div>

</details>

#### Tax Group Data

<details>
<summary>listTaxGroupDatas</summary>

<div>

Lists the tax code assignments that make up each tax group.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `ListTaxGroupDatasQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `TaxGroupDatasCollection|error`

Sample code:

```ballerina
tax:TaxGroupDatasCollection result = check fo->listTaxGroupDatas();
```

</div>

</details>

<details>
<summary>createTaxGroupDatas</summary>

<div>

Assigns a tax code to a tax group.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `TaxGroupData` | Yes | The tax group data record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `TaxGroupData|error`

Sample code:

```ballerina
tax:TaxGroupData result = check fo->createTaxGroupDatas({
    dataAreaId: "USMF",
    taxGroupId: "TAXABLE",
    taxCodeId: "VAT20",
    exemptTax: "No",
    useTax: "No"
});
```

</div>

</details>

<details>
<summary>getTaxGroupDatas</summary>

<div>

Retrieves a tax group data record by its composite key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `taxGroupId` | `string` | Yes | The tax group ID key field, e.g. `"TAXABLE"`. |
| `taxCodeId` | `string` | Yes | The tax code ID key field, e.g. `"VAT20"`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `GetTaxGroupDatasQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `TaxGroupData|error`

Sample code:

```ballerina
tax:TaxGroupData result = check fo->getTaxGroupDatas("USMF", "TAXABLE", "VAT20");
```

</div>

</details>

<details>
<summary>deleteTaxGroupDatas</summary>

<div>

Removes a tax code assignment from a tax group.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `taxGroupId` | `string` | Yes | The tax group ID key field. |
| `taxCodeId` | `string` | Yes | The tax code ID key field. |
| `headers` | `DeleteTaxGroupDatasHeaders` | No | Optional `ifMatch` ETag for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
error? result = fo->deleteTaxGroupDatas("USMF", "TAXABLE", "VAT20");
```

</div>

</details>

<details>
<summary>updateTaxGroupDatas</summary>

<div>

Updates a tax group data record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `taxGroupId` | `string` | Yes | The tax group ID key field. |
| `taxCodeId` | `string` | Yes | The tax code ID key field. |
| `payload` | `TaxGroupData` | Yes | The fields to update. |
| `headers` | `UpdateTaxGroupDatasHeaders` | No | Optional `ifMatch` ETag for optimistic concurrency. |

Returns: `TaxGroupData|error`

Sample code:

```ballerina
tax:TaxGroupData result = check fo->updateTaxGroupDatas("USMF", "TAXABLE", "VAT20", {
    exemptTax: "Yes"
});
```

</div>

</details>

#### Tax Groups

<details>
<summary>listTaxGroups</summary>

<div>

Lists sales tax groups used to determine which tax codes apply to a customer, vendor, or transaction.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `ListTaxGroupsQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `TaxGroupsCollection|error`

Sample code:

```ballerina
tax:TaxGroupsCollection result = check fo->listTaxGroups();
```

</div>

</details>

<details>
<summary>createTaxGroups</summary>

<div>

Creates a sales tax group.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `TaxGroup` | Yes | The tax group record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `TaxGroup|error`

Sample code:

```ballerina
tax:TaxGroup result = check fo->createTaxGroups({
    dataAreaId: "USMF",
    taxGroupCode: "TAXABLE",
    description: "Fully taxable sales",
    roundingBy: "TaxCode"
});
```

</div>

</details>

<details>
<summary>getTaxGroups</summary>

<div>

Retrieves a sales tax group by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `taxGroupCode` | `string` | Yes | The tax group code key field, e.g. `"TAXABLE"`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `GetTaxGroupsQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `TaxGroup|error`

Sample code:

```ballerina
tax:TaxGroup result = check fo->getTaxGroups("USMF", "TAXABLE");
```

</div>

</details>

<details>
<summary>deleteTaxGroups</summary>

<div>

Deletes a sales tax group.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `taxGroupCode` | `string` | Yes | The tax group code key field. |
| `headers` | `DeleteTaxGroupsHeaders` | No | Optional `ifMatch` ETag for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
error? result = fo->deleteTaxGroups("USMF", "TAXABLE");
```

</div>

</details>

<details>
<summary>updateTaxGroups</summary>

<div>

Updates a sales tax group.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `taxGroupCode` | `string` | Yes | The tax group code key field. |
| `payload` | `TaxGroup` | Yes | The fields to update. |
| `headers` | `UpdateTaxGroupsHeaders` | No | Optional `ifMatch` ETag for optimistic concurrency. |

Returns: `TaxGroup|error`

Sample code:

```ballerina
tax:TaxGroup result = check fo->updateTaxGroups("USMF", "TAXABLE", {
    description: "Fully taxable sales - updated"
});
```

</div>

</details>

#### Tax Item Groups

<details>
<summary>listTaxItemGroups</summary>

<div>

Lists item-level tax groups used to determine which tax codes apply to a product or service.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `ListTaxItemGroupsQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `TaxItemGroupsCollection|error`

Sample code:

```ballerina
tax:TaxItemGroupsCollection result = check fo->listTaxItemGroups();
```

</div>

</details>

<details>
<summary>createTaxItemGroups</summary>

<div>

Creates a tax item group.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `TaxItemGroup` | Yes | The tax item group record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `TaxItemGroup|error`

Sample code:

```ballerina
tax:TaxItemGroup result = check fo->createTaxItemGroups({
    dataAreaId: "USMF",
    taxItemGroupCode: "GOODS",
    taxCodeId: "VAT20",
    description: "Standard-rated goods",
    exemptTax: "No"
});
```

</div>

</details>

<details>
<summary>getTaxItemGroups</summary>

<div>

Retrieves a tax item group by its composite key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `taxItemGroupCode` | `string` | Yes | The tax item group code key field, e.g. `"GOODS"`. |
| `taxCodeId` | `string` | Yes | The tax code ID key field, e.g. `"VAT20"`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `GetTaxItemGroupsQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `TaxItemGroup|error`

Sample code:

```ballerina
tax:TaxItemGroup result = check fo->getTaxItemGroups("USMF", "GOODS", "VAT20");
```

</div>

</details>

<details>
<summary>deleteTaxItemGroups</summary>

<div>

Deletes a tax item group.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `taxItemGroupCode` | `string` | Yes | The tax item group code key field. |
| `taxCodeId` | `string` | Yes | The tax code ID key field. |
| `headers` | `DeleteTaxItemGroupsHeaders` | No | Optional `ifMatch` ETag for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
error? result = fo->deleteTaxItemGroups("USMF", "GOODS", "VAT20");
```

</div>

</details>

<details>
<summary>updateTaxItemGroups</summary>

<div>

Updates a tax item group.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `taxItemGroupCode` | `string` | Yes | The tax item group code key field. |
| `taxCodeId` | `string` | Yes | The tax code ID key field. |
| `payload` | `TaxItemGroup` | Yes | The fields to update. |
| `headers` | `UpdateTaxItemGroupsHeaders` | No | Optional `ifMatch` ETag for optimistic concurrency. |

Returns: `TaxItemGroup|error`

Sample code:

```ballerina
tax:TaxItemGroup result = check fo->updateTaxItemGroups("USMF", "GOODS", "VAT20", {
    description: "Standard-rated goods - updated"
});
```

</div>

</details>

#### Tax Parameters

<details>
<summary>listTaxParameters</summary>

<div>

Lists the company-level tax parameters that control tax calculation and posting behavior.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `ListTaxParametersQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `TaxParametersCollection|error`

Sample code:

```ballerina
tax:TaxParametersCollection result = check fo->listTaxParameters();
```

</div>

</details>

<details>
<summary>createTaxParameters</summary>

<div>

Creates the tax parameters record for a company.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `TaxParameters` | Yes | The tax parameters record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `TaxParameters|error`

Sample code:

```ballerina
tax:TaxParameters result = check fo->createTaxParameters({
    dataAreaId: "USMF",
    calculationPrinciple: "Total",
    taxCalculationDate: "InvoiceDate"
});
```

</div>

</details>

<details>
<summary>getTaxParameters</summary>

<div>

Retrieves the tax parameters record for a company.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `GetTaxParametersQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `TaxParameters|error`

Sample code:

```ballerina
tax:TaxParameters result = check fo->getTaxParameters("USMF");
```

</div>

</details>

<details>
<summary>deleteTaxParameters</summary>

<div>

Deletes the tax parameters record for a company.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `headers` | `DeleteTaxParametersHeaders` | No | Optional `ifMatch` ETag for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
error? result = fo->deleteTaxParameters("USMF");
```

</div>

</details>

<details>
<summary>updateTaxParameters</summary>

<div>

Updates the tax parameters record for a company.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `payload` | `TaxParameters` | Yes | The fields to update. |
| `headers` | `UpdateTaxParametersHeaders` | No | Optional `ifMatch` ETag for optimistic concurrency. |

Returns: `TaxParameters|error`

Sample code:

```ballerina
tax:TaxParameters result = check fo->updateTaxParameters("USMF", {
    taxCalculationDate: "DeliveryDate"
});
```

</div>

</details>

#### Tax Periods

<details>
<summary>listTaxPeriods</summary>

<div>

Lists tax periods used for tax reporting and settlement cycles.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `ListTaxPeriodsQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `TaxPeriodsCollection|error`

Sample code:

```ballerina
tax:TaxPeriodsCollection result = check fo->listTaxPeriods();
```

</div>

</details>

<details>
<summary>createTaxPeriods</summary>

<div>

Creates a tax period.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `TaxPeriod` | Yes | The tax period record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `TaxPeriod|error`

Sample code:

```ballerina
tax:TaxPeriod result = check fo->createTaxPeriods({
    dataAreaId: "USMF",
    taxPeriodId: "Q1-2026",
    fromDate: "2026-01-01",
    toDate: "2026-03-31",
    description: "Q1 2026 VAT period",
    periodInterval: "Month",
    numberOfUnit: 3
});
```

</div>

</details>

<details>
<summary>getTaxPeriods</summary>

<div>

Retrieves a tax period by its composite key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `taxPeriodId` | `string` | Yes | The tax period ID key field, e.g. `"Q1-2026"`. |
| `fromDate` | `string` | Yes | The from date key field, e.g. `"2026-01-01"`. |
| `toDate` | `string` | Yes | The to date key field, e.g. `"2026-03-31"`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `GetTaxPeriodsQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `TaxPeriod|error`

Sample code:

```ballerina
tax:TaxPeriod result = check fo->getTaxPeriods("USMF", "Q1-2026", "2026-01-01", "2026-03-31");
```

</div>

</details>

<details>
<summary>deleteTaxPeriods</summary>

<div>

Deletes a tax period.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `taxPeriodId` | `string` | Yes | The tax period ID key field. |
| `fromDate` | `string` | Yes | The from date key field. |
| `toDate` | `string` | Yes | The to date key field. |
| `headers` | `DeleteTaxPeriodsHeaders` | No | Optional `ifMatch` ETag for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
error? result = fo->deleteTaxPeriods("USMF", "Q1-2026", "2026-01-01", "2026-03-31");
```

</div>

</details>

<details>
<summary>updateTaxPeriods</summary>

<div>

Updates a tax period.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `taxPeriodId` | `string` | Yes | The tax period ID key field. |
| `fromDate` | `string` | Yes | The from date key field. |
| `toDate` | `string` | Yes | The to date key field. |
| `payload` | `TaxPeriod` | Yes | The fields to update. |
| `headers` | `UpdateTaxPeriodsHeaders` | No | Optional `ifMatch` ETag for optimistic concurrency. |

Returns: `TaxPeriod|error`

Sample code:

```ballerina
tax:TaxPeriod result = check fo->updateTaxPeriods("USMF", "Q1-2026", "2026-01-01", "2026-03-31", {
    description: "Q1 2026 VAT period - updated"
});
```

</div>

</details>

#### Tax Posting Groups

<details>
<summary>listTaxPostingGroups</summary>

<div>

Lists tax posting groups used to determine the ledger accounts to which tax amounts are posted.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `ListTaxPostingGroupsQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `TaxPostingGroupsCollection|error`

Sample code:

```ballerina
tax:TaxPostingGroupsCollection result = check fo->listTaxPostingGroups();
```

</div>

</details>

<details>
<summary>createTaxPostingGroups</summary>

<div>

Creates a tax posting group.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `TaxPostingGroup` | Yes | The tax posting group record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `TaxPostingGroup|error`

Sample code:

```ballerina
tax:TaxPostingGroup result = check fo->createTaxPostingGroups({
    dataAreaId: "USMF",
    taxPostingGroupCode: "VATPOST",
    description: "Standard VAT posting group"
});
```

</div>

</details>

<details>
<summary>getTaxPostingGroups</summary>

<div>

Retrieves a tax posting group by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `taxPostingGroupCode` | `string` | Yes | The tax posting group code key field, e.g. `"VATPOST"`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `GetTaxPostingGroupsQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `TaxPostingGroup|error`

Sample code:

```ballerina
tax:TaxPostingGroup result = check fo->getTaxPostingGroups("USMF", "VATPOST");
```

</div>

</details>

<details>
<summary>deleteTaxPostingGroups</summary>

<div>

Deletes a tax posting group.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `taxPostingGroupCode` | `string` | Yes | The tax posting group code key field. |
| `headers` | `DeleteTaxPostingGroupsHeaders` | No | Optional `ifMatch` ETag for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
error? result = fo->deleteTaxPostingGroups("USMF", "VATPOST");
```

</div>

</details>

<details>
<summary>updateTaxPostingGroups</summary>

<div>

Updates a tax posting group.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `taxPostingGroupCode` | `string` | Yes | The tax posting group code key field. |
| `payload` | `TaxPostingGroup` | Yes | The fields to update. |
| `headers` | `UpdateTaxPostingGroupsHeaders` | No | Optional `ifMatch` ETag for optimistic concurrency. |

Returns: `TaxPostingGroup|error`

Sample code:

```ballerina
tax:TaxPostingGroup result = check fo->updateTaxPostingGroups("USMF", "VATPOST", {
    description: "Standard VAT posting group - updated"
});
```

</div>

</details>

#### Tax Regions

<details>
<summary>listTaxRegions</summary>

<div>

Lists tax regions used for jurisdiction-based tax determination.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `ListTaxRegionsQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `TaxRegionsCollection|error`

Sample code:

```ballerina
tax:TaxRegionsCollection result = check fo->listTaxRegions();
```

</div>

</details>

<details>
<summary>createTaxRegions</summary>

<div>

Creates a tax region.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `TaxRegion` | Yes | The tax region record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `TaxRegion|error`

Sample code:

```ballerina
tax:TaxRegion result = check fo->createTaxRegions({
    locationId: "US-CA-94105",
    validFrom: "2026-01-01",
    taxRegionName: "California",
    state: "CA",
    countryRegionId: "USA"
});
```

</div>

</details>

<details>
<summary>getTaxRegions</summary>

<div>

Retrieves a tax region by its composite key. Unlike most tax entities, tax regions are not keyed by `dataAreaId`.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `locationId` | `string` | Yes | The location ID key field, e.g. `"US-CA-94105"`. |
| `validFrom` | `string` | Yes | The valid-from date key field, e.g. `"2026-01-01"`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `GetTaxRegionsQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `TaxRegion|error`

Sample code:

```ballerina
tax:TaxRegion result = check fo->getTaxRegions("US-CA-94105", "2026-01-01");
```

</div>

</details>

<details>
<summary>deleteTaxRegions</summary>

<div>

Deletes a tax region.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `locationId` | `string` | Yes | The location ID key field. |
| `validFrom` | `string` | Yes | The valid-from date key field. |
| `headers` | `DeleteTaxRegionsHeaders` | No | Optional `ifMatch` ETag for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
error? result = fo->deleteTaxRegions("US-CA-94105", "2026-01-01");
```

</div>

</details>

<details>
<summary>updateTaxRegions</summary>

<div>

Updates a tax region.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `locationId` | `string` | Yes | The location ID key field. |
| `validFrom` | `string` | Yes | The valid-from date key field. |
| `payload` | `TaxRegion` | Yes | The fields to update. |
| `headers` | `UpdateTaxRegionsHeaders` | No | Optional `ifMatch` ETag for optimistic concurrency. |

Returns: `TaxRegion|error`

Sample code:

```ballerina
tax:TaxRegion result = check fo->updateTaxRegions("US-CA-94105", "2026-01-01", {
    taxRegionName: "California (revised)"
});
```

</div>

</details>

#### Tax Tables

<details>
<summary>listTaxTables</summary>

<div>

Lists tax tables that link tax types and modules to their ledger main accounts.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `ListTaxTablesQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `TaxTablesCollection|error`

Sample code:

```ballerina
tax:TaxTablesCollection result = check fo->listTaxTables();
```

</div>

</details>

<details>
<summary>createTaxTables</summary>

<div>

Creates a tax table entry.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `TaxTable` | Yes | The tax table record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `TaxTable|error`

Sample code:

```ballerina
tax:TaxTable result = check fo->createTaxTables({
    dataAreaId: "RUMF",
    'module: "Tax",
    code: "VAT-STD",
    typeOfTax: "VAT",
    expenseCode: "TAXEXP"
});
```

</div>

</details>

<details>
<summary>getTaxTables</summary>

<div>

Retrieves a tax table entry by its composite key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `module` | `string` | Yes | The module key field, e.g. `"Tax"`. |
| `code` | `string` | Yes | The code key field, e.g. `"VAT-STD"`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `GetTaxTablesQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `TaxTable|error`

Sample code:

```ballerina
tax:TaxTable result = check fo->getTaxTables("RUMF", "Tax", "VAT-STD");
```

</div>

</details>

<details>
<summary>deleteTaxTables</summary>

<div>

Deletes a tax table entry.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `module` | `string` | Yes | The module key field. |
| `code` | `string` | Yes | The code key field. |
| `headers` | `DeleteTaxTablesHeaders` | No | Optional `ifMatch` ETag for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
error? result = fo->deleteTaxTables("RUMF", "Tax", "VAT-STD");
```

</div>

</details>

<details>
<summary>updateTaxTables</summary>

<div>

Updates a tax table entry.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `module` | `string` | Yes | The module key field. |
| `code` | `string` | Yes | The code key field. |
| `payload` | `TaxTable` | Yes | The fields to update. |
| `headers` | `UpdateTaxTablesHeaders` | No | Optional `ifMatch` ETag for optimistic concurrency. |

Returns: `TaxTable|error`

Sample code:

```ballerina
tax:TaxTable result = check fo->updateTaxTables("RUMF", "Tax", "VAT-STD", {
    expenseCode: "TAXEXP2"
});
```

</div>

</details>

#### Taxation Code

<details>
<summary>listTaxationCode</summary>

<div>

Lists Brazilian taxation codes used to classify ICMS, IPI, PIS, and COFINS tax handling.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `ListTaxationCodeQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `TaxationCodeCollection|error`

Sample code:

```ballerina
tax:TaxationCodeCollection result = check fo->listTaxationCode();
```

</div>

</details>

<details>
<summary>createTaxationCode</summary>

<div>

Creates a taxation code.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `TaxationCode` | Yes | The taxation code record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `TaxationCode|error`

Sample code:

```ballerina
tax:TaxationCode result = check fo->createTaxationCode({
    dataAreaId: "BRMF",
    taxType: "ICMS",
    taxationCode: "060",
    fiscalValue: "WithCreditDebit",
    outputCode: "5405",
    description: "ICMS with credit"
});
```

</div>

</details>

<details>
<summary>getTaxationCode</summary>

<div>

Retrieves a taxation code by its composite key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `taxType` | `string` | Yes | The tax type key field, e.g. `"ICMS"`. |
| `taxationCode` | `string` | Yes | The taxation code key field, e.g. `"060"`. |
| `fiscalValue` | `string` | Yes | The fiscal value key field, e.g. `"WithCreditDebit"`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `GetTaxationCodeQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `TaxationCode|error`

Sample code:

```ballerina
tax:TaxationCode result = check fo->getTaxationCode("BRMF", "ICMS", "060", "WithCreditDebit");
```

</div>

</details>

<details>
<summary>deleteTaxationCode</summary>

<div>

Deletes a taxation code.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `taxType` | `string` | Yes | The tax type key field. |
| `taxationCode` | `string` | Yes | The taxation code key field. |
| `fiscalValue` | `string` | Yes | The fiscal value key field. |
| `headers` | `DeleteTaxationCodeHeaders` | No | Optional `ifMatch` ETag for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
error? result = fo->deleteTaxationCode("BRMF", "ICMS", "060", "WithCreditDebit");
```

</div>

</details>

<details>
<summary>updateTaxationCode</summary>

<div>

Updates a taxation code.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `taxType` | `string` | Yes | The tax type key field. |
| `taxationCode` | `string` | Yes | The taxation code key field. |
| `fiscalValue` | `string` | Yes | The fiscal value key field. |
| `payload` | `TaxationCode` | Yes | The fields to update. |
| `headers` | `UpdateTaxationCodeHeaders` | No | Optional `ifMatch` ETag for optimistic concurrency. |

Returns: `TaxationCode|error`

Sample code:

```ballerina
tax:TaxationCode result = check fo->updateTaxationCode("BRMF", "ICMS", "060", "WithCreditDebit", {
    description: "ICMS with credit - updated"
});
```

</div>

</details>

#### Taxes Matrices

<details>
<summary>listTaxesMatrices</summary>

<div>

Lists Brazilian tax matrices that map fiscal establishment groups and CFOP groups to sales tax groups.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `ListTaxesMatricesQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `TaxesMatricesCollection|error`

Sample code:

```ballerina
tax:TaxesMatricesCollection result = check fo->listTaxesMatrices();
```

</div>

</details>

<details>
<summary>createTaxesMatrices</summary>

<div>

Creates a tax matrix entry.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `TaxesMatrix` | Yes | The tax matrix record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `TaxesMatrix|error`

Sample code:

```ballerina
tax:TaxesMatrix result = check fo->createTaxesMatrices({
    dataAreaId: "BRMF",
    fiscalEstablishmentGroupId: "FEG01",
    cFOPGroupId: "SALES",
    'type: "Customer",
    accountRelation: "CUST-001",
    itemRelation: "ITEM-001",
    salesTaxGroup: "TAXABLE",
    itemSalesTaxGroup: "GOODS"
});
```

</div>

</details>

<details>
<summary>getTaxesMatrices</summary>

<div>

Retrieves a tax matrix entry by its composite key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `fiscalEstablishmentGroupId` | `string` | Yes | The fiscal establishment group ID key field, e.g. `"FEG01"`. |
| `cFOPGroupId` | `string` | Yes | The CFOP group ID key field, e.g. `"SALES"`. |
| `type` | `string` | Yes | The entity type identifier key field, e.g. `"Customer"`. |
| `accountRelation` | `string` | Yes | The account relation key field, e.g. `"CUST-001"`. |
| `itemRelation` | `string` | Yes | The item relation key field, e.g. `"ITEM-001"`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `GetTaxesMatricesQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `TaxesMatrix|error`

Sample code:

```ballerina
tax:TaxesMatrix result = check fo->getTaxesMatrices("BRMF", "FEG01", "SALES", "Customer", "CUST-001", "ITEM-001");
```

</div>

</details>

<details>
<summary>deleteTaxesMatrices</summary>

<div>

Deletes a tax matrix entry.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `fiscalEstablishmentGroupId` | `string` | Yes | The fiscal establishment group ID key field. |
| `cFOPGroupId` | `string` | Yes | The CFOP group ID key field. |
| `type` | `string` | Yes | The entity type identifier key field. |
| `accountRelation` | `string` | Yes | The account relation key field. |
| `itemRelation` | `string` | Yes | The item relation key field. |
| `headers` | `DeleteTaxesMatricesHeaders` | No | Optional `ifMatch` ETag for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
error? result = fo->deleteTaxesMatrices("BRMF", "FEG01", "SALES", "Customer", "CUST-001", "ITEM-001");
```

</div>

</details>

<details>
<summary>updateTaxesMatrices</summary>

<div>

Updates a tax matrix entry.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `fiscalEstablishmentGroupId` | `string` | Yes | The fiscal establishment group ID key field. |
| `cFOPGroupId` | `string` | Yes | The CFOP group ID key field. |
| `type` | `string` | Yes | The entity type identifier key field. |
| `accountRelation` | `string` | Yes | The account relation key field. |
| `itemRelation` | `string` | Yes | The item relation key field. |
| `payload` | `TaxesMatrix` | Yes | The fields to update. |
| `headers` | `UpdateTaxesMatricesHeaders` | No | Optional `ifMatch` ETag for optimistic concurrency. |

Returns: `TaxesMatrix|error`

Sample code:

```ballerina
tax:TaxesMatrix result = check fo->updateTaxesMatrices("BRMF", "FEG01", "SALES", "Customer", "CUST-001", "ITEM-001", {
    salesTaxGroup: "TAXABLE2"
});
```

</div>

</details>
