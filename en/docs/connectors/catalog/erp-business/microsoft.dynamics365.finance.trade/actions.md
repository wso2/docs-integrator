---
title: Actions
toc_max_heading_level: 4
---

# Actions

The `ballerinax/microsoft.dynamics365.finance.trade` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Provides full CRUD access to Microsoft Dynamics 365 Finance Trade entities via the OData REST API. |

---

## Client

Provides full CRUD access to Microsoft Dynamics 365 Finance Trade entities via the OData REST API.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `OAuth2ClientCredentialsGrantConfig` | Required | OAuth2 client credentials grant configuration used to obtain an access token from Microsoft Entra ID. |
| `httpVersion` | `string` | `"2.0"` | HTTP protocol version to use for outbound requests. |
| `http1Settings` | `ClientHttp1Settings` | `{}` | HTTP/1.x client settings including keep-alive, chunking, and proxy configuration. |
| `secureSocket` | `http:ClientSecureSocket` | `()` | SSL/TLS configuration for secure connections. |
| `proxy` | `ProxyConfig` | `()` | Proxy server configuration. |

### Initializing the client

```ballerina
import ballerinax/microsoft.dynamics365.finance.trade;

configurable string tokenUrl = ?;
configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string serviceUrl = ?;

trade:Client fo = check new (
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

#### BLWI

<details>
<summary>listBLWI</summary>

Reads all BLWI (foreign trade payment) records in the system.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListBLWIQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `trade:BLWICollection|error`

Sample code:

```ballerina
trade:BLWICollection result = check fo->listBLWI(
    queries = {
        filter: "Currency eq 'EUR'",
        top: 20,
        'select: "Voucher,Invoice,Amount,Currency"
    }
);
```

</details>

<details>
<summary>createBLWI</summary>

Creates a BLWI record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `BLWI` | Yes | The BLWI record to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `trade:BLWI|error`

Sample code:

```ballerina
trade:BLWI created = check fo->createBLWI({
    dataAreaId: "ESMF",
    company: "ESMF",
    bLWITransaction: "Vendor",
    accountNumber: "ES-100234",
    voucher: "VouchNo-000123",
    invoice: "INV-000456",
    transactionDate: "2026-01-15",
    amount: 15000.00,
    currency: "EUR",
    countryRegionId: "FRA",
    purposeCode: "GOODS"
});
```

</details>

<details>
<summary>getBLWI</summary>

Reads a specific BLWI record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `company` | `string` | Yes | The company key field. |
| `bLWITransaction` | `string` | Yes | The BLWI transaction key field (`"Customer"` or `"Vendor"`). |
| `accountNumber` | `string` | Yes | The account number key field. |
| `voucher` | `string` | Yes | The voucher key field. |
| `invoice` | `string` | Yes | The invoice key field. |
| `transactionDate` | `string` | Yes | The transaction date key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetBLWIQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `trade:BLWI|error`

Sample code:

```ballerina
trade:BLWI record = check fo->getBLWI(
    "ESMF", "ESMF", "Vendor", "ES-100234", "VouchNo-000123", "INV-000456", "2026-01-15"
);
```

</details>

<details>
<summary>deleteBLWI</summary>

Deletes a specific BLWI record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `company` | `string` | Yes | The company key field. |
| `bLWITransaction` | `string` | Yes | The BLWI transaction key field. |
| `accountNumber` | `string` | Yes | The account number key field. |
| `voucher` | `string` | Yes | The voucher key field. |
| `invoice` | `string` | Yes | The invoice key field. |
| `transactionDate` | `string` | Yes | The transaction date key field. |
| `headers` | `DeleteBLWIHeaders` | No | Additional HTTP request headers; set `ifMatch` to the entity's current ETag for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteBLWI(
    "ESMF", "ESMF", "Vendor", "ES-100234", "VouchNo-000123", "INV-000456", "2026-01-15",
    headers = {ifMatch: eTag}
);
```

</details>

<details>
<summary>updateBLWI</summary>

Updates a specific BLWI record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `company` | `string` | Yes | The company key field. |
| `bLWITransaction` | `string` | Yes | The BLWI transaction key field. |
| `accountNumber` | `string` | Yes | The account number key field. |
| `voucher` | `string` | Yes | The voucher key field. |
| `invoice` | `string` | Yes | The invoice key field. |
| `transactionDate` | `string` | Yes | The transaction date key field. |
| `payload` | `BLWI` | Yes | Fields to update. |
| `headers` | `UpdateBLWIHeaders` | No | Additional HTTP request headers; set `ifMatch` to the entity's current ETag for optimistic concurrency. |

Returns: `trade:BLWI|error`

Sample code:

```ballerina
trade:BLWI updated = check fo->updateBLWI(
    "ESMF", "ESMF", "Vendor", "ES-100234", "VouchNo-000123", "INV-000456", "2026-01-15",
    {amount: 15500.00},
    headers = {ifMatch: eTag}
);
```

</details>

#### Intrastats

<details>
<summary>listIntrastats</summary>

Reads all Intrastat declarations in the system.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListIntrastatsQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `trade:IntrastatsCollection|error`

Sample code:

```ballerina
trade:IntrastatsCollection result = check fo->listIntrastats(
    queries = {
        filter: "Direction eq Microsoft.Dynamics.DataEntities.IntrastatDirection'Export'",
        top: 25
    }
);
```

</details>

<details>
<summary>createIntrastats</summary>

Creates an Intrastat declaration.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `Intrastat` | Yes | The Intrastat declaration to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `trade:Intrastat|error`

Sample code:

```ballerina
trade:Intrastat created = check fo->createIntrastats({
    dataAreaId: "FRMF",
    shipmentBatch: "SB-2026-004",
    sequenceNumber: 1,
    direction: "Export",
    itemNumber: "ITEM-2201",
    commodity: "84713000",
    quantity: 50,
    weight: 120.5,
    invoiceAmount: 8000.00,
    currencyCode: "EUR",
    countryRegionId: "DEU",
    transactionCode: "10"
});
```

</details>

<details>
<summary>getIntrastats</summary>

Reads a specific Intrastat declaration.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `shipmentBatch` | `string` | Yes | The shipment batch key field. |
| `sequenceNumber` | `int` | Yes | The sequence number key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetIntrastatsQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `trade:Intrastat|error`

Sample code:

```ballerina
trade:Intrastat declaration = check fo->getIntrastats("FRMF", "SB-2026-004", 1);
```

</details>

<details>
<summary>deleteIntrastats</summary>

Deletes a specific Intrastat declaration.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `shipmentBatch` | `string` | Yes | The shipment batch key field. |
| `sequenceNumber` | `int` | Yes | The sequence number key field. |
| `headers` | `DeleteIntrastatsHeaders` | No | Additional HTTP request headers; set `ifMatch` to the entity's current ETag for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteIntrastats("FRMF", "SB-2026-004", 1, headers = {ifMatch: eTag});
```

</details>

<details>
<summary>updateIntrastats</summary>

Updates a specific Intrastat declaration.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `shipmentBatch` | `string` | Yes | The shipment batch key field. |
| `sequenceNumber` | `int` | Yes | The sequence number key field. |
| `payload` | `Intrastat` | Yes | Fields to update. |
| `headers` | `UpdateIntrastatsHeaders` | No | Additional HTTP request headers; set `ifMatch` to the entity's current ETag for optimistic concurrency. |

Returns: `trade:Intrastat|error`

Sample code:

```ballerina
trade:Intrastat updated = check fo->updateIntrastats(
    "FRMF", "SB-2026-004", 1,
    {quantity: 55, weight: 132.0},
    headers = {ifMatch: eTag}
);
```

</details>

#### Intrastats V2

<details>
<summary>listIntrastatsV2</summary>

Reads all Intrastat V2 declarations in the system.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListIntrastatsV2Queries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `trade:IntrastatsV2Collection|error`

Sample code:

```ballerina
trade:IntrastatsV2Collection result = check fo->listIntrastatsV2(
    queries = {
        filter: "Direction eq Microsoft.Dynamics.DataEntities.IntrastatDirection'Import'",
        top: 25
    }
);
```

</details>

<details>
<summary>createIntrastatsV2</summary>

Creates an Intrastat V2 declaration.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `IntrastatV2` | Yes | The Intrastat V2 declaration to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `trade:IntrastatV2|error`

Sample code:

```ballerina
trade:IntrastatV2 created = check fo->createIntrastatsV2({
    dataAreaId: "FRMF",
    shipmentBatch: "SB-2026-005",
    sequenceNumber: 1,
    direction: "Import",
    itemNumber: "ITEM-3305",
    commodity: "85171200",
    quantity: 10,
    weight: 22.0,
    invoiceAmount: 4200.00,
    currencyCode: "EUR",
    countryRegionId: "CHN",
    transactionCode: "10"
});
```

</details>

<details>
<summary>getIntrastatsV2</summary>

Reads a specific Intrastat V2 declaration.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `shipmentBatch` | `string` | Yes | The shipment batch key field. |
| `sequenceNumber` | `int` | Yes | The sequence number key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetIntrastatsV2Queries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `trade:IntrastatV2|error`

Sample code:

```ballerina
trade:IntrastatV2 declaration = check fo->getIntrastatsV2("FRMF", "SB-2026-005", 1);
```

</details>

<details>
<summary>deleteIntrastatsV2</summary>

Deletes a specific Intrastat V2 declaration.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `shipmentBatch` | `string` | Yes | The shipment batch key field. |
| `sequenceNumber` | `int` | Yes | The sequence number key field. |
| `headers` | `DeleteIntrastatsV2Headers` | No | Additional HTTP request headers; set `ifMatch` to the entity's current ETag for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteIntrastatsV2("FRMF", "SB-2026-005", 1, headers = {ifMatch: eTag});
```

</details>

<details>
<summary>updateIntrastatsV2</summary>

Updates a specific Intrastat V2 declaration.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `shipmentBatch` | `string` | Yes | The shipment batch key field. |
| `sequenceNumber` | `int` | Yes | The sequence number key field. |
| `payload` | `IntrastatV2` | Yes | Fields to update. |
| `headers` | `UpdateIntrastatsV2Headers` | No | Additional HTTP request headers; set `ifMatch` to the entity's current ETag for optimistic concurrency. |

Returns: `trade:IntrastatV2|error`

Sample code:

```ballerina
trade:IntrastatV2 updated = check fo->updateIntrastatsV2(
    "FRMF", "SB-2026-005", 1,
    {quantity: 12, weight: 26.4},
    headers = {ifMatch: eTag}
);
```

</details>

#### NAF Codes

<details>
<summary>listNAFCodes</summary>

Reads all NAF (French commodity classification) codes in the system.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListNAFCodesQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `trade:NAFCodesCollection|error`

Sample code:

```ballerina
trade:NAFCodesCollection result = check fo->listNAFCodes(
    queries = {
        filter: "startswith(NAFCode,'47')",
        top: 20
    }
);
```

</details>

<details>
<summary>createNAFCodes</summary>

Creates a NAF code.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `NAFCode` | Yes | The NAF code to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `trade:NAFCode|error`

Sample code:

```ballerina
trade:NAFCode created = check fo->createNAFCodes({
    dataAreaId: "FRMF",
    nAFCode: "4711D",
    description: "Other retail sale in non-specialized stores"
});
```

</details>

<details>
<summary>getNAFCodes</summary>

Reads a specific NAF code.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `nAFCode` | `string` | Yes | The NAF code key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetNAFCodesQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `trade:NAFCode|error`

Sample code:

```ballerina
trade:NAFCode code = check fo->getNAFCodes("FRMF", "4711D");
```

</details>

<details>
<summary>deleteNAFCodes</summary>

Deletes a specific NAF code.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `nAFCode` | `string` | Yes | The NAF code key field. |
| `headers` | `DeleteNAFCodesHeaders` | No | Additional HTTP request headers; set `ifMatch` to the entity's current ETag for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteNAFCodes("FRMF", "4711D", headers = {ifMatch: eTag});
```

</details>

<details>
<summary>updateNAFCodes</summary>

Updates a specific NAF code.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `nAFCode` | `string` | Yes | The NAF code key field. |
| `payload` | `NAFCode` | Yes | Fields to update. |
| `headers` | `UpdateNAFCodesHeaders` | No | Additional HTTP request headers; set `ifMatch` to the entity's current ETag for optimistic concurrency. |

Returns: `trade:NAFCode|error`

Sample code:

```ballerina
trade:NAFCode updated = check fo->updateNAFCodes(
    "FRMF",
    "4711D",
    {description: "Other retail sale in non-specialized stores (updated)"},
    headers = {ifMatch: eTag}
);
```

</details>

#### NGP Codes

<details>
<summary>listNGPCodes</summary>

Reads all NGP (Spanish commodity classification) codes in the system.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListNGPCodesQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `trade:NGPCodesCollection|error`

Sample code:

```ballerina
trade:NGPCodesCollection result = check fo->listNGPCodes(
    queries = {
        top: 20
    }
);
```

</details>

<details>
<summary>createNGPCodes</summary>

Creates an NGP code.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `NGPCode` | Yes | The NGP code to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `trade:NGPCode|error`

Sample code:

```ballerina
trade:NGPCode created = check fo->createNGPCodes({
    dataAreaId: "ESMF",
    nGP: 6203,
    description: "Men's suits and trousers"
});
```

</details>

<details>
<summary>getNGPCodes</summary>

Reads a specific NGP code.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `nGP` | `int` | Yes | The NGP code key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetNGPCodesQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `trade:NGPCode|error`

Sample code:

```ballerina
trade:NGPCode code = check fo->getNGPCodes("ESMF", 6203);
```

</details>

<details>
<summary>deleteNGPCodes</summary>

Deletes a specific NGP code.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `nGP` | `int` | Yes | The NGP code key field. |
| `headers` | `DeleteNGPCodesHeaders` | No | Additional HTTP request headers; set `ifMatch` to the entity's current ETag for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteNGPCodes("ESMF", 6203, headers = {ifMatch: eTag});
```

</details>

<details>
<summary>updateNGPCodes</summary>

Updates a specific NGP code.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `nGP` | `int` | Yes | The NGP code key field. |
| `payload` | `NGPCode` | Yes | Fields to update. |
| `headers` | `UpdateNGPCodesHeaders` | No | Additional HTTP request headers; set `ifMatch` to the entity's current ETag for optimistic concurrency. |

Returns: `trade:NGPCode|error`

Sample code:

```ballerina
trade:NGPCode updated = check fo->updateNGPCodes(
    "ESMF",
    6203,
    {description: "Men's suits and trousers (updated)"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Report 347

<details>
<summary>listReport347</summary>

Reads all Model 347 report entries in the system.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListReport347Queries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `trade:Report347Collection|error`

Sample code:

```ballerina
trade:Report347Collection result = check fo->listReport347(
    queries = {
        filter: "FiscalYear eq 2026",
        top: 20
    }
);
```

</details>

<details>
<summary>createReport347</summary>

Creates a Model 347 report entry.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `Report347` | Yes | The Model 347 report entry to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `trade:Report347|error`

Sample code:

```ballerina
trade:Report347 created = check fo->createReport347({
    dataAreaId: "ESMF",
    fiscalYear: 2026,
    referenceOfEstate: "EST-001",
    invoiceYearForCash: 2026,
    taxExemptNumberTrans: "EX-0098",
    taskCode: "Sales",
    countryRegionTrans: "ESP",
    amount: 125000.00,
    amountOfSales: 125000.00,
    reported: "No"
});
```

</details>

<details>
<summary>getReport347</summary>

Reads a specific Model 347 report entry.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `fiscalYear` | `int` | Yes | The fiscal year key field. |
| `referenceOfEstate` | `string` | Yes | The reference of estate key field. |
| `invoiceYearForCash` | `int` | Yes | The invoice year for cash key field. |
| `taxExemptNumberTrans` | `string` | Yes | The tax exempt number key field. |
| `taskCode` | `string` | Yes | The task code key field (e.g., `"Sales"`, `"Purchase"`). |
| `countryRegionTrans` | `string` | Yes | The country/region key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetReport347Queries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `trade:Report347|error`

Sample code:

```ballerina
trade:Report347 report = check fo->getReport347(
    "ESMF", 2026, "EST-001", 2026, "EX-0098", "Sales", "ESP"
);
```

</details>

<details>
<summary>deleteReport347</summary>

Deletes a specific Model 347 report entry.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `fiscalYear` | `int` | Yes | The fiscal year key field. |
| `referenceOfEstate` | `string` | Yes | The reference of estate key field. |
| `invoiceYearForCash` | `int` | Yes | The invoice year for cash key field. |
| `taxExemptNumberTrans` | `string` | Yes | The tax exempt number key field. |
| `taskCode` | `string` | Yes | The task code key field. |
| `countryRegionTrans` | `string` | Yes | The country/region key field. |
| `headers` | `DeleteReport347Headers` | No | Additional HTTP request headers; set `ifMatch` to the entity's current ETag for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteReport347(
    "ESMF", 2026, "EST-001", 2026, "EX-0098", "Sales", "ESP",
    headers = {ifMatch: eTag}
);
```

</details>

<details>
<summary>updateReport347</summary>

Updates a specific Model 347 report entry.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `fiscalYear` | `int` | Yes | The fiscal year key field. |
| `referenceOfEstate` | `string` | Yes | The reference of estate key field. |
| `invoiceYearForCash` | `int` | Yes | The invoice year for cash key field. |
| `taxExemptNumberTrans` | `string` | Yes | The tax exempt number key field. |
| `taskCode` | `string` | Yes | The task code key field. |
| `countryRegionTrans` | `string` | Yes | The country/region key field. |
| `payload` | `Report347` | Yes | Fields to update. |
| `headers` | `UpdateReport347Headers` | No | Additional HTTP request headers; set `ifMatch` to the entity's current ETag for optimistic concurrency. |

Returns: `trade:Report347|error`

Sample code:

```ballerina
trade:Report347 updated = check fo->updateReport347(
    "ESMF", 2026, "EST-001", 2026, "EX-0098", "Sales", "ESP",
    {reported: "Yes"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Report Periods

<details>
<summary>listReportPeriods</summary>

Reads all report periods in the system.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListReportPeriodsQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `trade:ReportPeriodsCollection|error`

Sample code:

```ballerina
trade:ReportPeriodsCollection result = check fo->listReportPeriods(
    queries = {
        filter: "Approved eq Microsoft.Dynamics.DataEntities.NoYes'No'"
    }
);
```

</details>

<details>
<summary>createReportPeriods</summary>

Creates a report period.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `ReportPeriod` | Yes | The report period to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `trade:ReportPeriod|error`

Sample code:

```ballerina
trade:ReportPeriod created = check fo->createReportPeriods({
    dataAreaId: "ESMF",
    settlementPeriod: "2026-Q1",
    fromDate: "2026-01-01",
    toDate: "2026-03-31",
    periodStart: "2026-01-01",
    periodEnd: "2026-03-31",
    approved: "No"
});
```

</details>

<details>
<summary>getReportPeriods</summary>

Reads a specific report period.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `settlementPeriod` | `string` | Yes | The settlement period key field. |
| `toDate` | `string` | Yes | The period end date key field. |
| `fromDate` | `string` | Yes | The period start date key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetReportPeriodsQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `trade:ReportPeriod|error`

Sample code:

```ballerina
trade:ReportPeriod period = check fo->getReportPeriods("ESMF", "2026-Q1", "2026-03-31", "2026-01-01");
```

</details>

<details>
<summary>deleteReportPeriods</summary>

Deletes a specific report period.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `settlementPeriod` | `string` | Yes | The settlement period key field. |
| `toDate` | `string` | Yes | The period end date key field. |
| `fromDate` | `string` | Yes | The period start date key field. |
| `headers` | `DeleteReportPeriodsHeaders` | No | Additional HTTP request headers; set `ifMatch` to the entity's current ETag for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteReportPeriods("ESMF", "2026-Q1", "2026-03-31", "2026-01-01", headers = {ifMatch: eTag});
```

</details>

<details>
<summary>updateReportPeriods</summary>

Updates a specific report period.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `settlementPeriod` | `string` | Yes | The settlement period key field. |
| `toDate` | `string` | Yes | The period end date key field. |
| `fromDate` | `string` | Yes | The period start date key field. |
| `payload` | `ReportPeriod` | Yes | Fields to update. |
| `headers` | `UpdateReportPeriodsHeaders` | No | Additional HTTP request headers; set `ifMatch` to the entity's current ETag for optimistic concurrency. |

Returns: `trade:ReportPeriod|error`

Sample code:

```ballerina
trade:ReportPeriod updated = check fo->updateReportPeriods(
    "ESMF", "2026-Q1", "2026-03-31", "2026-01-01",
    {approved: "Yes"},
    headers = {ifMatch: eTag}
);
```

</details>

#### SAD Groups

<details>
<summary>listSADGroups</summary>

Reads all SAD (Single Administrative Document) groups in the system.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListSADGroupsQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `trade:SADGroupsCollection|error`

Sample code:

```ballerina
trade:SADGroupsCollection result = check fo->listSADGroups(
    queries = {
        top: 20
    }
);
```

</details>

<details>
<summary>createSADGroups</summary>

Creates a SAD group.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `SADGroup` | Yes | The SAD group to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `trade:SADGroup|error`

Sample code:

```ballerina
trade:SADGroup created = check fo->createSADGroups({
    dataAreaId: "RUMF",
    sADGroup: "SAD-STD",
    description: "Standard customs declaration group",
    vATCode: "VAT20",
    duty: 5.5,
    excise: 0,
    taxGroup: "TAX-STD",
    taxItemGroup: "ITEM-STD"
});
```

</details>

<details>
<summary>getSADGroups</summary>

Reads a specific SAD group.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `sADGroup` | `string` | Yes | The SAD group key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetSADGroupsQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `trade:SADGroup|error`

Sample code:

```ballerina
trade:SADGroup group = check fo->getSADGroups("RUMF", "SAD-STD");
```

</details>

<details>
<summary>deleteSADGroups</summary>

Deletes a specific SAD group.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `sADGroup` | `string` | Yes | The SAD group key field. |
| `headers` | `DeleteSADGroupsHeaders` | No | Additional HTTP request headers; set `ifMatch` to the entity's current ETag for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteSADGroups("RUMF", "SAD-STD", headers = {ifMatch: eTag});
```

</details>

<details>
<summary>updateSADGroups</summary>

Updates a specific SAD group.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `sADGroup` | `string` | Yes | The SAD group key field. |
| `payload` | `SADGroup` | Yes | Fields to update. |
| `headers` | `UpdateSADGroupsHeaders` | No | Additional HTTP request headers; set `ifMatch` to the entity's current ETag for optimistic concurrency. |

Returns: `trade:SADGroup|error`

Sample code:

```ballerina
trade:SADGroup updated = check fo->updateSADGroups(
    "RUMF",
    "SAD-STD",
    {duty: 6.0},
    headers = {ifMatch: eTag}
);
```

</details>

#### SAD Item Codes

<details>
<summary>listSADItemCodes</summary>

Reads all SAD item codes in the system.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListSADItemCodesQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `trade:SADItemCodesCollection|error`

Sample code:

```ballerina
trade:SADItemCodesCollection result = check fo->listSADItemCodes(
    queries = {
        filter: "startswith(ItemCommodityCode,'8471')"
    }
);
```

</details>

<details>
<summary>createSADItemCodes</summary>

Creates a SAD item code.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `SADItemCode` | Yes | The SAD item code to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `trade:SADItemCode|error`

Sample code:

```ballerina
trade:SADItemCode created = check fo->createSADItemCodes({
    dataAreaId: "RUMF",
    itemCommodityCode: "8471300000",
    productName: "Portable computers",
    mainAccountDisplayValue: "140100"
});
```

</details>

<details>
<summary>getSADItemCodes</summary>

Reads a specific SAD item code.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `itemCommodityCode` | `string` | Yes | The item commodity code key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetSADItemCodesQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `trade:SADItemCode|error`

Sample code:

```ballerina
trade:SADItemCode code = check fo->getSADItemCodes("RUMF", "8471300000");
```

</details>

<details>
<summary>deleteSADItemCodes</summary>

Deletes a specific SAD item code.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `itemCommodityCode` | `string` | Yes | The item commodity code key field. |
| `headers` | `DeleteSADItemCodesHeaders` | No | Additional HTTP request headers; set `ifMatch` to the entity's current ETag for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteSADItemCodes("RUMF", "8471300000", headers = {ifMatch: eTag});
```

</details>

<details>
<summary>updateSADItemCodes</summary>

Updates a specific SAD item code.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `itemCommodityCode` | `string` | Yes | The item commodity code key field. |
| `payload` | `SADItemCode` | Yes | Fields to update. |
| `headers` | `UpdateSADItemCodesHeaders` | No | Additional HTTP request headers; set `ifMatch` to the entity's current ETag for optimistic concurrency. |

Returns: `trade:SADItemCode|error`

Sample code:

```ballerina
trade:SADItemCode updated = check fo->updateSADItemCodes(
    "RUMF",
    "8471300000",
    {productName: "Portable computers (updated)"},
    headers = {ifMatch: eTag}
);
```

</details>

#### SAD Parameters

<details>
<summary>listSADParameters</summary>

Reads the SAD parameters for every company in the system.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListSADParametersQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `trade:SADParametersCollection|error`

Sample code:

```ballerina
trade:SADParametersCollection result = check fo->listSADParameters(
    queries = {
        crossCompany: true
    }
);
```

</details>

<details>
<summary>createSADParameters</summary>

Creates the SAD parameters record for a company.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `SADParameters` | Yes | The SAD parameter fields to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `trade:SADParameters|error`

Sample code:

```ballerina
trade:SADParameters created = check fo->createSADParameters({
    dataAreaId: "RUMF",
    additionalCostsFormInvoice: "Item",
    miscPayments: "Costs",
    transportAccountDisplayValue: "601500",
    insuranceAccountDisplayValue: "601600",
    dutyRounding: 0.01,
    vATRounding: 0.01,
    exciseTaxRounding: 0.01
});
```

</details>

<details>
<summary>getSADParameters</summary>

Reads the SAD parameters for a specific company.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetSADParametersQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `trade:SADParameters|error`

Sample code:

```ballerina
trade:SADParameters parameters = check fo->getSADParameters("RUMF");
```

</details>

<details>
<summary>deleteSADParameters</summary>

Deletes the SAD parameters record for a specific company.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `headers` | `DeleteSADParametersHeaders` | No | Additional HTTP request headers; set `ifMatch` to the entity's current ETag for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteSADParameters("RUMF", headers = {ifMatch: eTag});
```

</details>

<details>
<summary>updateSADParameters</summary>

Updates the SAD parameters record for a specific company.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `payload` | `SADParameters` | Yes | Fields to update. |
| `headers` | `UpdateSADParametersHeaders` | No | Additional HTTP request headers; set `ifMatch` to the entity's current ETag for optimistic concurrency. |

Returns: `trade:SADParameters|error`

Sample code:

```ballerina
trade:SADParameters updated = check fo->updateSADParameters(
    "RUMF",
    {dutyRounding: 0.05},
    headers = {ifMatch: eTag}
);
```

</details>

#### TNVED Codes

<details>
<summary>listTNVEDCodes</summary>

Reads all TNVED (Eurasian Customs Union commodity classification) codes in the system.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListTNVEDCodesQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `trade:TNVEDCodesCollection|error`

Sample code:

```ballerina
trade:TNVEDCodesCollection result = check fo->listTNVEDCodes(
    queries = {
        filter: "Blocked eq Microsoft.Dynamics.DataEntities.NoYes'No'",
        top: 20
    }
);
```

</details>

<details>
<summary>createTNVEDCodes</summary>

Creates a TNVED code.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `TNVEDCode` | Yes | The TNVED code to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `trade:TNVEDCode|error`

Sample code:

```ballerina
trade:TNVEDCode created = check fo->createTNVEDCodes({
    dataAreaId: "RUMF",
    tnVedCode: "8471300000",
    name: "Portable automatic data processing machines",
    description: "Laptops and portable computers under 10 kg",
    blocked: "No"
});
```

</details>

<details>
<summary>getTNVEDCodes</summary>

Reads a specific TNVED code.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `tnVedCode` | `string` | Yes | The TNVED code key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetTNVEDCodesQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `trade:TNVEDCode|error`

Sample code:

```ballerina
trade:TNVEDCode code = check fo->getTNVEDCodes("RUMF", "8471300000");
```

</details>

<details>
<summary>deleteTNVEDCodes</summary>

Deletes a specific TNVED code.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `tnVedCode` | `string` | Yes | The TNVED code key field. |
| `headers` | `DeleteTNVEDCodesHeaders` | No | Additional HTTP request headers; set `ifMatch` to the entity's current ETag for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteTNVEDCodes("RUMF", "8471300000", headers = {ifMatch: eTag});
```

</details>

<details>
<summary>updateTNVEDCodes</summary>

Updates a specific TNVED code.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `tnVedCode` | `string` | Yes | The TNVED code key field. |
| `payload` | `TNVEDCode` | Yes | Fields to update. |
| `headers` | `UpdateTNVEDCodesHeaders` | No | Additional HTTP request headers; set `ifMatch` to the entity's current ETag for optimistic concurrency. |

Returns: `trade:TNVEDCode|error`

Sample code:

```ballerina
trade:TNVEDCode updated = check fo->updateTNVEDCodes(
    "RUMF",
    "8471300000",
    {blocked: "Yes"},
    headers = {ifMatch: eTag}
);
```

</details>
