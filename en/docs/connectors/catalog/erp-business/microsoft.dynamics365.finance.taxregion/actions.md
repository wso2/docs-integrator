---
title: Actions
toc_max_heading_level: 4
---

# Actions

The `ballerinax/microsoft.dynamics365.finance.taxregion` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Provides full CRUD access to Microsoft Dynamics 365 Finance Tax Region entities via the OData REST API. |

---

## Client

Provides full CRUD access to Microsoft Dynamics 365 Finance Tax Region entities via the OData REST API.

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
import ballerinax/microsoft.dynamics365.finance.taxregion;

configurable string tokenUrl = ?;
configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string serviceUrl = ?;

taxregion:Client fo = check new (
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

#### EF Doc Schemas

<details>
<summary>listEFDocSchemas</summary>

Lists Brazilian electronic fiscal document (EFDoc) schemas used for tax event submission, discard, cancellation, and correction letters.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListEFDocSchemasQueries` | No | OData query parameters: `skip`, `top`, `filter`, `orderby`, `expand`, `crossCompany` (`cross-company`), `count`, `'select`. |

Returns: `EFDocSchemasCollection|error`

Sample code:

```ballerina
taxregion:EFDocSchemasCollection result = check fo->listEFDocSchemas(
    queries = {
        filter: "SchemaType eq 'Submit'",
        top: 10
    }
);
```

</details>

<details>
<summary>createEFDocSchemas</summary>

Creates an electronic fiscal document schema.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `EFDocSchema` | Yes | The EFDoc schema record to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `EFDocSchema|error`

Sample code:

```ballerina
taxregion:EFDocSchema created = check fo->createEFDocSchemas({
    version: "V4",
    schemaType: "Submit",
    schemaFilePath: "C:\\EFDocSchemas\\nfe_v4_submit.xsd"
});
```

</details>

<details>
<summary>getEFDocSchemas</summary>

Retrieves a specific EFDoc schema by its schema type and version key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `schemaType` | `string` | Yes | The schema type key field (e.g., `"Submit"`, `"Cancel"`). |
| `version` | `string` | Yes | The version key field (e.g., `"V4"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetEFDocSchemasQueries` | No | OData query parameters: `expand`, `'select`. |

Returns: `EFDocSchema|error`

Sample code:

```ballerina
taxregion:EFDocSchema schema = check fo->getEFDocSchemas("Submit", "V4");
```

</details>

<details>
<summary>deleteEFDocSchemas</summary>

Deletes a specific EFDoc schema.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `schemaType` | `string` | Yes | The schema type key field. |
| `version` | `string` | Yes | The version key field. |
| `headers` | `DeleteEFDocSchemasHeaders` | No | Request headers, including an optional `ifMatch` ETag for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
// eTag obtained from a prior getEFDocSchemas response's ETag header
check fo->deleteEFDocSchemas("Submit", "V4", {ifMatch: eTag});
```

</details>

<details>
<summary>updateEFDocSchemas</summary>

Updates a specific EFDoc schema.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `schemaType` | `string` | Yes | The schema type key field. |
| `version` | `string` | Yes | The version key field. |
| `payload` | `EFDocSchema` | Yes | The fields to update. |
| `headers` | `UpdateEFDocSchemasHeaders` | No | Request headers, including an optional `ifMatch` ETag for optimistic concurrency. |

Returns: `EFDocSchema|error`

Sample code:

```ballerina
// eTag obtained from a prior getEFDocSchemas response's ETag header
taxregion:EFDocSchema updated = check fo->updateEFDocSchemas(
    "Submit",
    "V4",
    {schemaFilePath: "C:\\EFDocSchemas\\nfe_v4_submit_rev2.xsd"},
    {ifMatch: eTag}
);
```

</details>

#### ISR Concepts

<details>
<summary>listISRConcepts</summary>

Lists Mexican ISR (Impuesto Sobre la Renta) withholding concepts.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListISRConceptsQueries` | No | OData query parameters: `skip`, `top`, `filter`, `orderby`, `expand`, `crossCompany` (`cross-company`), `count`, `'select`. |

Returns: `ISRConceptsCollection|error`

Sample code:

```ballerina
taxregion:ISRConceptsCollection result = check fo->listISRConcepts(
    queries = {
        filter: "dataAreaId eq 'MFG1'",
        top: 20
    }
);
```

</details>

<details>
<summary>createISRConcepts</summary>

Creates an ISR withholding concept.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `ISRConcept` | Yes | The ISR concept record to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `ISRConcept|error`

Sample code:

```ballerina
taxregion:ISRConcept created = check fo->createISRConcepts({
    dataAreaId: "MFG1",
    description: "Revenue concept for ISR withholding",
    debitCreditIndicator: "Credit",
    chartOfAccountsName: "MFG1_COA",
    conceptId: "Revenue",
    mainAccountId: "401000"
});
```

</details>

<details>
<summary>getISRConcepts</summary>

Retrieves a specific ISR concept by its data area, concept, main account, and chart of accounts key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `conceptId` | `string` | Yes | The concept id key field (e.g., `"Revenue"`, `"Deductions"`). |
| `mainAccountId` | `string` | Yes | The main account id key field. |
| `chartOfAccountsName` | `string` | Yes | The chart of accounts name key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetISRConceptsQueries` | No | OData query parameters: `expand`, `'select`. |

Returns: `ISRConcept|error`

Sample code:

```ballerina
taxregion:ISRConcept concept = check fo->getISRConcepts("MFG1", "Revenue", "401000", "MFG1_COA");
```

</details>

<details>
<summary>deleteISRConcepts</summary>

Deletes a specific ISR concept.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `conceptId` | `string` | Yes | The concept id key field. |
| `mainAccountId` | `string` | Yes | The main account id key field. |
| `chartOfAccountsName` | `string` | Yes | The chart of accounts name key field. |
| `headers` | `DeleteISRConceptsHeaders` | No | Request headers, including an optional `ifMatch` ETag for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
// eTag obtained from a prior getISRConcepts response's ETag header
check fo->deleteISRConcepts("MFG1", "Revenue", "401000", "MFG1_COA", {ifMatch: eTag});
```

</details>

<details>
<summary>updateISRConcepts</summary>

Updates a specific ISR concept.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `conceptId` | `string` | Yes | The concept id key field. |
| `mainAccountId` | `string` | Yes | The main account id key field. |
| `chartOfAccountsName` | `string` | Yes | The chart of accounts name key field. |
| `payload` | `ISRConcept` | Yes | The fields to update. |
| `headers` | `UpdateISRConceptsHeaders` | No | Request headers, including an optional `ifMatch` ETag for optimistic concurrency. |

Returns: `ISRConcept|error`

Sample code:

```ballerina
// eTag obtained from a prior getISRConcepts response's ETag header
taxregion:ISRConcept updated = check fo->updateISRConcepts(
    "MFG1",
    "Revenue",
    "401000",
    "MFG1_COA",
    {description: "Updated revenue concept for ISR withholding"},
    {ifMatch: eTag}
);
```

</details>

#### ISR Rates

<details>
<summary>listISRRates</summary>

Lists Mexican ISR withholding rates by year, month, and maximum amount bracket.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListISRRatesQueries` | No | OData query parameters: `skip`, `top`, `filter`, `orderby`, `expand`, `crossCompany` (`cross-company`), `count`, `'select`. |

Returns: `ISRRatesCollection|error`

Sample code:

```ballerina
taxregion:ISRRatesCollection result = check fo->listISRRates(
    queries = {
        filter: "year eq 2026",
        orderby: "month asc"
    }
);
```

</details>

<details>
<summary>createISRRates</summary>

Creates an ISR withholding rate bracket for a given year and month.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `ISRRate` | Yes | The ISR rate record to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `ISRRate|error`

Sample code:

```ballerina
taxregion:ISRRate created = check fo->createISRRates({
    dataAreaId: "MFG1",
    year: 2026,
    month: 1,
    rate: 10.5d,
    maximumAmount: 5000.00d,
    fixedAmount: 25.00d
});
```

</details>

<details>
<summary>getISRRates</summary>

Retrieves a specific ISR rate by its data area, year, month, and maximum amount key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `year` | `int` | Yes | The year key field. |
| `month` | `int` | Yes | The month key field. |
| `maximumAmount` | `decimal` | Yes | The maximum amount key field for the rate bracket. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetISRRatesQueries` | No | OData query parameters: `expand`, `'select`. |

Returns: `ISRRate|error`

Sample code:

```ballerina
taxregion:ISRRate rate = check fo->getISRRates("MFG1", 2026, 1, 5000.00d);
```

</details>

<details>
<summary>deleteISRRates</summary>

Deletes a specific ISR rate bracket.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `year` | `int` | Yes | The year key field. |
| `month` | `int` | Yes | The month key field. |
| `maximumAmount` | `decimal` | Yes | The maximum amount key field. |
| `headers` | `DeleteISRRatesHeaders` | No | Request headers, including an optional `ifMatch` ETag for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
// eTag obtained from a prior getISRRates response's ETag header
check fo->deleteISRRates("MFG1", 2026, 1, 5000.00d, {ifMatch: eTag});
```

</details>

<details>
<summary>updateISRRates</summary>

Updates a specific ISR rate bracket.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `year` | `int` | Yes | The year key field. |
| `month` | `int` | Yes | The month key field. |
| `maximumAmount` | `decimal` | Yes | The maximum amount key field. |
| `payload` | `ISRRate` | Yes | The fields to update. |
| `headers` | `UpdateISRRatesHeaders` | No | Request headers, including an optional `ifMatch` ETag for optimistic concurrency. |

Returns: `ISRRate|error`

Sample code:

```ballerina
// eTag obtained from a prior getISRRates response's ETag header
taxregion:ISRRate updated = check fo->updateISRRates(
    "MFG1",
    2026,
    1,
    5000.00d,
    {rate: 11.0d},
    {ifMatch: eTag}
);
```

</details>

#### Intervats

<details>
<summary>listIntervats</summary>

Lists Belgian Intervat VAT listing declarations.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListIntervatsQueries` | No | OData query parameters: `skip`, `top`, `filter`, `orderby`, `expand`, `crossCompany` (`cross-company`), `count`, `'select`. |

Returns: `IntervatsCollection|error`

Sample code:

```ballerina
taxregion:IntervatsCollection result = check fo->listIntervats(
    queries = {
        filter: "status eq 'Created'",
        top: 10
    }
);
```

</details>

<details>
<summary>createIntervats</summary>

Creates an Intervat VAT listing declaration.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `Intervat` | Yes | The Intervat declaration record to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `Intervat|error`

Sample code:

```ballerina
taxregion:Intervat created = check fo->createIntervats({
    dataAreaId: "BEL1",
    intervatId: "INT-2026-Q1",
    companyName: "Contoso Belgium NV",
    enterpriseNumber: "0123456789",
    period: "2026Q1",
    periodFrequency: "Quarterly",
    validFrom: "2026-01-01",
    validTo: "2026-03-31",
    amount: 15230.50d,
    salesTaxNumber: "BE0123456789",
    status: "Created"
});
```

</details>

<details>
<summary>getIntervats</summary>

Retrieves a specific Intervat declaration by its data area, intervat id, valid-from, and valid-to key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `intervatId` | `string` | Yes | The intervat id key field. |
| `validFrom` | `string` | Yes | The valid from key field. |
| `validTo` | `string` | Yes | The valid to key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetIntervatsQueries` | No | OData query parameters: `expand`, `'select`. |

Returns: `Intervat|error`

Sample code:

```ballerina
taxregion:Intervat declaration = check fo->getIntervats("BEL1", "INT-2026-Q1", "2026-01-01", "2026-03-31");
```

</details>

<details>
<summary>deleteIntervats</summary>

Deletes a specific Intervat declaration.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `intervatId` | `string` | Yes | The intervat id key field. |
| `validFrom` | `string` | Yes | The valid from key field. |
| `validTo` | `string` | Yes | The valid to key field. |
| `headers` | `DeleteIntervatsHeaders` | No | Request headers, including an optional `ifMatch` ETag for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
// eTag obtained from a prior getIntervats response's ETag header
check fo->deleteIntervats("BEL1", "INT-2026-Q1", "2026-01-01", "2026-03-31", {ifMatch: eTag});
```

</details>

<details>
<summary>updateIntervats</summary>

Updates a specific Intervat declaration.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `intervatId` | `string` | Yes | The intervat id key field. |
| `validFrom` | `string` | Yes | The valid from key field. |
| `validTo` | `string` | Yes | The valid to key field. |
| `payload` | `Intervat` | Yes | The fields to update. |
| `headers` | `UpdateIntervatsHeaders` | No | Request headers, including an optional `ifMatch` ETag for optimistic concurrency. |

Returns: `Intervat|error`

Sample code:

```ballerina
// eTag obtained from a prior getIntervats response's ETag header
taxregion:Intervat updated = check fo->updateIntervats(
    "BEL1",
    "INT-2026-Q1",
    "2026-01-01",
    "2026-03-31",
    {status: "Sent", preparationDate: "2026-04-05"},
    {ifMatch: eTag}
);
```

</details>

#### NIP Tables

<details>
<summary>listNIPTables</summary>

Lists Polish NIP (tax identification number) address tables used for VAT reporting.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListNIPTablesQueries` | No | OData query parameters: `skip`, `top`, `filter`, `orderby`, `expand`, `crossCompany` (`cross-company`), `count`, `'select`. |

Returns: `NIPTablesCollection|error`

Sample code:

```ballerina
taxregion:NIPTablesCollection result = check fo->listNIPTables(
    queries = {
        filter: "dataAreaId eq 'POL1'",
        top: 25
    }
);
```

</details>

<details>
<summary>createNIPTables</summary>

Creates a NIP address table entry.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `NIPTable` | Yes | The NIP table record to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `NIPTable|error`

Sample code:

```ballerina
taxregion:NIPTable created = check fo->createNIPTables({
    dataAreaId: "POL1",
    nIPNumber: "1234567890",
    code: "WAW01",
    addressing: "ul. Marszalkowska 1, 00-624 Warszawa",
    accountName: "Contoso Polska Sp. z o.o."
});
```

</details>

<details>
<summary>getNIPTables</summary>

Retrieves a specific NIP table entry by its data area and code key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `code` | `string` | Yes | The code key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetNIPTablesQueries` | No | OData query parameters: `expand`, `'select`. |

Returns: `NIPTable|error`

Sample code:

```ballerina
taxregion:NIPTable entry = check fo->getNIPTables("POL1", "WAW01");
```

</details>

<details>
<summary>deleteNIPTables</summary>

Deletes a specific NIP table entry.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `code` | `string` | Yes | The code key field. |
| `headers` | `DeleteNIPTablesHeaders` | No | Request headers, including an optional `ifMatch` ETag for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
// eTag obtained from a prior getNIPTables response's ETag header
check fo->deleteNIPTables("POL1", "WAW01", {ifMatch: eTag});
```

</details>

<details>
<summary>updateNIPTables</summary>

Updates a specific NIP table entry.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `code` | `string` | Yes | The code key field. |
| `payload` | `NIPTable` | Yes | The fields to update. |
| `headers` | `UpdateNIPTablesHeaders` | No | Request headers, including an optional `ifMatch` ETag for optimistic concurrency. |

Returns: `NIPTable|error`

Sample code:

```ballerina
// eTag obtained from a prior getNIPTables response's ETag header
taxregion:NIPTable updated = check fo->updateNIPTables(
    "POL1",
    "WAW01",
    {addressing: "ul. Marszalkowska 10, 00-624 Warszawa"},
    {ifMatch: eTag}
);
```

</details>

#### NR Tax Transactions

<details>
<summary>listNRTaxTrans</summary>

Lists Latvian natural resource tax transactions on packing materials and dangerous goods.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListNRTaxTransQueries` | No | OData query parameters: `skip`, `top`, `filter`, `orderby`, `expand`, `crossCompany` (`cross-company`), `count`, `'select`. |

Returns: `NRTaxTransCollection|error`

Sample code:

```ballerina
taxregion:NRTaxTransCollection result = check fo->listNRTaxTrans(
    queries = {
        filter: "transType eq 'TaxOnPackingMaterials'",
        top: 15
    }
);
```

</details>

<details>
<summary>createNRTaxTrans</summary>

Creates a natural resource tax transaction line.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `NRTaxTrans` | Yes | The natural resource tax transaction record to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `NRTaxTrans|error`

Sample code:

```ballerina
taxregion:NRTaxTrans created = check fo->createNRTaxTrans({
    dataAreaId: "LVA1",
    lineId: "LINE-0001",
    invoice: "INV-000456",
    itemNumber: "PKG-CARDBOARD-01",
    transType: "TaxOnPackingMaterials",
    packingMaterialCode: "CARDBOARD",
    packingQty: 500,
    packingUnit: "kg",
    taxBaseAmount: 250.00d,
    taxCode: "NRT-LV",
    taxAmount: 12.50d
});
```

</details>

<details>
<summary>getNRTaxTrans</summary>

Retrieves a specific natural resource tax transaction by its data area and line id key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `lineId` | `string` | Yes | The line id key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetNRTaxTransQueries` | No | OData query parameters: `expand`, `'select`. |

Returns: `NRTaxTrans|error`

Sample code:

```ballerina
taxregion:NRTaxTrans txn = check fo->getNRTaxTrans("LVA1", "LINE-0001");
```

</details>

<details>
<summary>deleteNRTaxTrans</summary>

Deletes a specific natural resource tax transaction.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `lineId` | `string` | Yes | The line id key field. |
| `headers` | `DeleteNRTaxTransHeaders` | No | Request headers, including an optional `ifMatch` ETag for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
// eTag obtained from a prior getNRTaxTrans response's ETag header
check fo->deleteNRTaxTrans("LVA1", "LINE-0001", {ifMatch: eTag});
```

</details>

<details>
<summary>updateNRTaxTrans</summary>

Updates a specific natural resource tax transaction.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `lineId` | `string` | Yes | The line id key field. |
| `payload` | `NRTaxTrans` | Yes | The fields to update. |
| `headers` | `UpdateNRTaxTransHeaders` | No | Request headers, including an optional `ifMatch` ETag for optimistic concurrency. |

Returns: `NRTaxTrans|error`

Sample code:

```ballerina
// eTag obtained from a prior getNRTaxTrans response's ETag header
taxregion:NRTaxTrans updated = check fo->updateNRTaxTrans(
    "LVA1",
    "LINE-0001",
    {taxAmount: 13.75d},
    {ifMatch: eTag}
);
```

</details>

#### Tax 1099 Fields

<details>
<summary>listTax1099Fields</summary>

Lists US 1099 statutory reporting fields and box numbers used for vendor tax reporting.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListTax1099FieldsQueries` | No | OData query parameters: `skip`, `top`, `filter`, `orderby`, `expand`, `crossCompany` (`cross-company`), `count`, `'select`. |

Returns: `Tax1099FieldsCollection|error`

Sample code:

```ballerina
taxregion:Tax1099FieldsCollection result = check fo->listTax1099Fields(
    queries = {
        filter: "typeOfTax1099Form eq 'F1099NEC'",
        top: 10
    }
);
```

</details>

<details>
<summary>createTax1099Fields</summary>

Creates a 1099 reporting field.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `Tax1099Field` | Yes | The 1099 field record to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `Tax1099Field|error`

Sample code:

```ballerina
taxregion:Tax1099Field created = check fo->createTax1099Fields({
    dataAreaId: "USMF",
    typeOfTax1099Form: "F1099NEC",
    tax1099Box: "1",
    form: "1099-NEC",
    description: "Nonemployee compensation",
    boxNumber: 1,
    minimumAmount: 600.00d
});
```

</details>

<details>
<summary>getTax1099Fields</summary>

Retrieves a specific 1099 field by its data area, form type, and box key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `typeOfTax1099Form` | `string` | Yes | The type of tax1099 form key field (e.g., `"F1099NEC"`). |
| `tax1099Box` | `string` | Yes | The tax1099 box key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetTax1099FieldsQueries` | No | OData query parameters: `expand`, `'select`. |

Returns: `Tax1099Field|error`

Sample code:

```ballerina
taxregion:Tax1099Field field = check fo->getTax1099Fields("USMF", "F1099NEC", "1");
```

</details>

<details>
<summary>deleteTax1099Fields</summary>

Deletes a specific 1099 field.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `typeOfTax1099Form` | `string` | Yes | The type of tax1099 form key field. |
| `tax1099Box` | `string` | Yes | The tax1099 box key field. |
| `headers` | `DeleteTax1099FieldsHeaders` | No | Request headers, including an optional `ifMatch` ETag for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
// eTag obtained from a prior getTax1099Fields response's ETag header
check fo->deleteTax1099Fields("USMF", "F1099NEC", "1", {ifMatch: eTag});
```

</details>

<details>
<summary>updateTax1099Fields</summary>

Updates a specific 1099 field.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `typeOfTax1099Form` | `string` | Yes | The type of tax1099 form key field. |
| `tax1099Box` | `string` | Yes | The tax1099 box key field. |
| `payload` | `Tax1099Field` | Yes | The fields to update. |
| `headers` | `UpdateTax1099FieldsHeaders` | No | Request headers, including an optional `ifMatch` ETag for optimistic concurrency. |

Returns: `Tax1099Field|error`

Sample code:

```ballerina
// eTag obtained from a prior getTax1099Fields response's ETag header
taxregion:Tax1099Field updated = check fo->updateTax1099Fields(
    "USMF",
    "F1099NEC",
    "1",
    {minimumAmount: 650.00d},
    {ifMatch: eTag}
);
```

</details>

#### Tax Documents

<details>
<summary>listTaxDocuments</summary>

Lists tax documents and their associated credit memo amounts for customer and vendor transactions.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListTaxDocumentsQueries` | No | OData query parameters: `skip`, `top`, `filter`, `orderby`, `expand`, `crossCompany` (`cross-company`), `count`, `'select`. |

Returns: `TaxDocumentsCollection|error`

Sample code:

```ballerina
taxregion:TaxDocumentsCollection result = check fo->listTaxDocuments(
    queries = {
        filter: "dataAreaId eq 'USMF'",
        top: 20
    }
);
```

</details>

<details>
<summary>createTaxDocuments</summary>

Creates a tax document.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `TaxDocument` | Yes | The tax document record to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `TaxDocument|error`

Sample code:

```ballerina
taxregion:TaxDocument created = check fo->createTaxDocuments({
    dataAreaId: "USMF",
    taxDocumentNumber: "TAXDOC-000789",
    custVendTransTableId: 100456,
    taxDocumentDate: "2026-08-05",
    taxDocumentTransactionTypeOfTax: "VAT",
    amount: 1250.00d,
    taxAmount: 187.50d,
    amountInTransactionCurrency: 1250.00d,
    taxAmountInCurrency: 187.50d
});
```

</details>

<details>
<summary>getTaxDocuments</summary>

Retrieves a specific tax document by its data area, tax document number, and customer/vendor transaction table id key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `taxDocumentNumber` | `string` | Yes | The tax document number key field. |
| `custVendTransTableId` | `int` | Yes | The cust vend trans table id key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetTaxDocumentsQueries` | No | OData query parameters: `expand`, `'select`. |

Returns: `TaxDocument|error`

Sample code:

```ballerina
taxregion:TaxDocument document = check fo->getTaxDocuments("USMF", "TAXDOC-000789", 100456);
```

</details>

<details>
<summary>deleteTaxDocuments</summary>

Deletes a specific tax document.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `taxDocumentNumber` | `string` | Yes | The tax document number key field. |
| `custVendTransTableId` | `int` | Yes | The cust vend trans table id key field. |
| `headers` | `DeleteTaxDocumentsHeaders` | No | Request headers, including an optional `ifMatch` ETag for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
// eTag obtained from a prior getTaxDocuments response's ETag header
check fo->deleteTaxDocuments("USMF", "TAXDOC-000789", 100456, {ifMatch: eTag});
```

</details>

<details>
<summary>updateTaxDocuments</summary>

Updates a specific tax document.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `taxDocumentNumber` | `string` | Yes | The tax document number key field. |
| `custVendTransTableId` | `int` | Yes | The cust vend trans table id key field. |
| `payload` | `TaxDocument` | Yes | The fields to update. |
| `headers` | `UpdateTaxDocumentsHeaders` | No | Request headers, including an optional `ifMatch` ETag for optimistic concurrency. |

Returns: `TaxDocument|error`

Sample code:

```ballerina
// eTag obtained from a prior getTaxDocuments response's ETag header
taxregion:TaxDocument updated = check fo->updateTaxDocuments(
    "USMF",
    "TAXDOC-000789",
    100456,
    {taxAmount: 190.00d, taxAmountInCurrency: 190.00d},
    {ifMatch: eTag}
);
```

</details>
