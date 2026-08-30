---
title: Actions
toc_max_heading_level: 4
---

# Actions

The `ballerinax/microsoft.dynamics365.finance.sysconfig` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Provides full CRUD access to Microsoft Dynamics 365 Finance system configuration and reference data via the System Config OData API. |

---

## Client

Provides full CRUD access to Microsoft Dynamics 365 Finance system configuration and reference data via the System Config OData API.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `OAuth2ClientCredentialsGrantConfig` | Required | OAuth 2.0 client credentials grant configuration; includes `tokenUrl`, `clientId`, `clientSecret`, and `scopes`. |
| `httpVersion` | `string` | `"2.0"` | HTTP protocol version to use for outbound requests. |
| `http1Settings` | `ClientHttp1Settings` | `{}` | HTTP/1.x client settings including keep-alive, chunking, and proxy configuration. |
| `secureSocket` | `http:ClientSecureSocket` | `()` | SSL/TLS configuration for secure connections. |
| `proxy` | `ProxyConfig` | `()` | Proxy server configuration. |

### Initializing the client

```ballerina
import ballerinax/microsoft.dynamics365.finance.sysconfig;

configurable string tokenUrl = ?;
configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string serviceUrl = ?;

sysconfig:Client fo = check new (
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

#### PS Serial Lines

<details>
<summary>listPSSerialLines</summary>

Reads all `PSSerialLines` records in the system.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListPSSerialLinesQueries` | No | OData query parameters, set via the record fields `skip` (`$skip`), `top` (`$top`), `filter` (`$filter`), `orderby` (`$orderby`), `expand` (`$expand`), `crossCompany` (`cross-company`), `count` (`$count`), and `'select` (`$select`). |

Returns: `PSSerialLinesCollection|error`

Sample code:

```ballerina
sysconfig:PSSerialLinesCollection result = check fo->listPSSerialLines(
    queries = {filter: "SerialType eq 'Invoice'", top: 20}
);
```

</details>

<details>
<summary>createPSSerialLines</summary>

Creates a `PSSerialLine` record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `PSSerialLine` | Yes | The serial line record to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `PSSerialLine|error`

Sample code:

```ballerina
sysconfig:PSSerialLine created = check fo->createPSSerialLines({
    dataAreaId: "USMF",
    prefix: "INV",
    invoiceNumber: "INV-100234",
    refTableId: 1,
    serialType: "Invoice"
});
```

</details>

<details>
<summary>getPSSerialLines</summary>

Reads a specific `PSSerialLine` record by its composite key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `prefix` | `string` | Yes | The prefix key field. |
| `invoiceNumber` | `string` | Yes | The invoice number key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetPSSerialLinesQueries` | No | OData query parameters, set via the record fields `expand` (`$expand`) and `'select` (`$select`). |

Returns: `PSSerialLine|error`

Sample code:

```ballerina
sysconfig:PSSerialLine line = check fo->getPSSerialLines("USMF", "INV", "INV-100234");
```

</details>

<details>
<summary>deletePSSerialLines</summary>

Deletes a specific `PSSerialLine` record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `prefix` | `string` | Yes | The prefix key field of the record to delete. |
| `invoiceNumber` | `string` | Yes | The invoice number key field of the record to delete. |
| `headers` | `DeletePSSerialLinesHeaders` | No | Request headers; supports an optional `ifMatch` field mapped to the `If-Match` header, used for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
check fo->deletePSSerialLines("USMF", "INV", "INV-100234", headers = {ifMatch: eTag});
```

</details>

<details>
<summary>updatePSSerialLines</summary>

Updates a specific `PSSerialLine` record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `prefix` | `string` | Yes | The prefix key field of the record to update. |
| `invoiceNumber` | `string` | Yes | The invoice number key field of the record to update. |
| `payload` | `PSSerialLine` | Yes | The fields to update. |
| `headers` | `UpdatePSSerialLinesHeaders` | No | Request headers; supports an optional `ifMatch` field mapped to the `If-Match` header, used for optimistic concurrency. |

Returns: `PSSerialLine|error`

Sample code:

```ballerina
sysconfig:PSSerialLine updated = check fo->updatePSSerialLines(
    "USMF",
    "INV",
    "INV-100234",
    {serialType: "PackingSlip"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Product Types

<details>
<summary>listProductTypes</summary>

Reads all `ProductTypes` records in the system.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListProductTypesQueries` | No | OData query parameters, set via the record fields `skip` (`$skip`), `top` (`$top`), `filter` (`$filter`), `orderby` (`$orderby`), `expand` (`$expand`), `crossCompany` (`cross-company`), `count` (`$count`), and `'select` (`$select`). |

Returns: `ProductTypesCollection|error`

Sample code:

```ballerina
sysconfig:ProductTypesCollection result = check fo->listProductTypes(queries = {top: 20});
```

</details>

<details>
<summary>createProductTypes</summary>

Creates a `ProductType` record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `ProductType` | Yes | The product type record to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `ProductType|error`

Sample code:

```ballerina
sysconfig:ProductType created = check fo->createProductTypes({
    dataAreaId: "USMF",
    productType: "Item",
    name: "Item"
});
```

</details>

<details>
<summary>getProductTypes</summary>

Reads a specific `ProductType` record by its composite key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `productType` | `string` | Yes | The product type key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetProductTypesQueries` | No | OData query parameters, set via the record fields `expand` (`$expand`) and `'select` (`$select`). |

Returns: `ProductType|error`

Sample code:

```ballerina
sysconfig:ProductType productType = check fo->getProductTypes("USMF", "Item");
```

</details>

<details>
<summary>deleteProductTypes</summary>

Deletes a specific `ProductType` record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `productType` | `string` | Yes | The product type key field of the record to delete. |
| `headers` | `DeleteProductTypesHeaders` | No | Request headers; supports an optional `ifMatch` field mapped to the `If-Match` header, used for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteProductTypes("USMF", "Item", headers = {ifMatch: eTag});
```

</details>

<details>
<summary>updateProductTypes</summary>

Updates a specific `ProductType` record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `productType` | `string` | Yes | The product type key field of the record to update. |
| `payload` | `ProductType` | Yes | The fields to update. |
| `headers` | `UpdateProductTypesHeaders` | No | Request headers; supports an optional `ifMatch` field mapped to the `If-Match` header, used for optimistic concurrency. |

Returns: `ProductType|error`

Sample code:

```ballerina
sysconfig:ProductType updated = check fo->updateProductTypes(
    "USMF",
    "Item",
    {name: "Inventory item"},
    headers = {ifMatch: eTag}
);
```

</details>

#### RBSL Factors

<details>
<summary>listRBSLFactors</summary>

Reads all `RBSLFactors` records in the system.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListRBSLFactorsQueries` | No | OData query parameters, set via the record fields `skip` (`$skip`), `top` (`$top`), `filter` (`$filter`), `orderby` (`$orderby`), `expand` (`$expand`), `crossCompany` (`cross-company`), `count` (`$count`), and `'select` (`$select`). |

Returns: `RBSLFactorsCollection|error`

Sample code:

```ballerina
sysconfig:RBSLFactorsCollection result = check fo->listRBSLFactors(queries = {top: 20});
```

</details>

<details>
<summary>createRBSLFactors</summary>

Creates an `RBSLFactor` record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `RBSLFactor` | Yes | The fixed-asset deferral factor record to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `RBSLFactor|error`

Sample code:

```ballerina
sysconfig:RBSLFactor created = check fo->createRBSLFactors({
    dataAreaId: "USMF",
    fromDate: "2024-01-01",
    years: 5,
    months: 60,
    assetRBSLFactor: 0.0167
});
```

</details>

<details>
<summary>getRBSLFactors</summary>

Reads a specific `RBSLFactor` record by its composite key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `fromDate` | `string` | Yes | The from date key field. |
| `years` | `int` | Yes | The years key field. |
| `months` | `int` | Yes | The months key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetRBSLFactorsQueries` | No | OData query parameters, set via the record fields `expand` (`$expand`) and `'select` (`$select`). |

Returns: `RBSLFactor|error`

Sample code:

```ballerina
sysconfig:RBSLFactor factor = check fo->getRBSLFactors("USMF", "2024-01-01", 5, 60);
```

</details>

<details>
<summary>deleteRBSLFactors</summary>

Deletes a specific `RBSLFactor` record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `fromDate` | `string` | Yes | The from date key field of the record to delete. |
| `years` | `int` | Yes | The years key field of the record to delete. |
| `months` | `int` | Yes | The months key field of the record to delete. |
| `headers` | `DeleteRBSLFactorsHeaders` | No | Request headers; supports an optional `ifMatch` field mapped to the `If-Match` header, used for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteRBSLFactors("USMF", "2024-01-01", 5, 60, headers = {ifMatch: eTag});
```

</details>

<details>
<summary>updateRBSLFactors</summary>

Updates a specific `RBSLFactor` record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `fromDate` | `string` | Yes | The from date key field of the record to update. |
| `years` | `int` | Yes | The years key field of the record to update. |
| `months` | `int` | Yes | The months key field of the record to update. |
| `payload` | `RBSLFactor` | Yes | The fields to update. |
| `headers` | `UpdateRBSLFactorsHeaders` | No | Request headers; supports an optional `ifMatch` field mapped to the `If-Match` header, used for optimistic concurrency. |

Returns: `RBSLFactor|error`

Sample code:

```ballerina
sysconfig:RBSLFactor updated = check fo->updateRBSLFactors(
    "USMF",
    "2024-01-01",
    5,
    60,
    {assetRBSLFactor: 0.0172},
    headers = {ifMatch: eTag}
);
```

</details>

#### Reasons

<details>
<summary>listReasons</summary>

Reads all `Reasons` records in the system.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListReasonsQueries` | No | OData query parameters, set via the record fields `skip` (`$skip`), `top` (`$top`), `filter` (`$filter`), `orderby` (`$orderby`), `expand` (`$expand`), `crossCompany` (`cross-company`), `count` (`$count`), and `'select` (`$select`). |

Returns: `ReasonsCollection|error`

Sample code:

```ballerina
sysconfig:ReasonsCollection result = check fo->listReasons(queries = {filter: "Ledger eq 'Yes'"});
```

</details>

<details>
<summary>createReasons</summary>

Creates a `Reasons` record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `Reasons` | Yes | The reason code record to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `Reasons|error`

Sample code:

```ballerina
sysconfig:Reasons created = check fo->createReasons({
    dataAreaId: "USMF",
    reasonCode: "WRITEOFF",
    ledger: "Yes",
    fixedAssets: "No",
    defaultComment: "Inventory write-off"
});
```

</details>

<details>
<summary>getReasons</summary>

Reads a specific `Reasons` record by its composite key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `reasonCode` | `string` | Yes | The reason code key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetReasonsQueries` | No | OData query parameters, set via the record fields `expand` (`$expand`) and `'select` (`$select`). |

Returns: `Reasons|error`

Sample code:

```ballerina
sysconfig:Reasons reason = check fo->getReasons("USMF", "WRITEOFF");
```

</details>

<details>
<summary>deleteReasons</summary>

Deletes a specific `Reasons` record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `reasonCode` | `string` | Yes | The reason code key field of the record to delete. |
| `headers` | `DeleteReasonsHeaders` | No | Request headers; supports an optional `ifMatch` field mapped to the `If-Match` header, used for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteReasons("USMF", "WRITEOFF", headers = {ifMatch: eTag});
```

</details>

<details>
<summary>updateReasons</summary>

Updates a specific `Reasons` record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `reasonCode` | `string` | Yes | The reason code key field of the record to update. |
| `payload` | `Reasons` | Yes | The fields to update. |
| `headers` | `UpdateReasonsHeaders` | No | Request headers; supports an optional `ifMatch` field mapped to the `If-Match` header, used for optimistic concurrency. |

Returns: `Reasons|error`

Sample code:

```ballerina
sysconfig:Reasons updated = check fo->updateReasons(
    "USMF",
    "WRITEOFF",
    {defaultComment: "Obsolete inventory write-off"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Registrations

<details>
<summary>listRegistrations</summary>

Reads all `Registrations` records in the system.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListRegistrationsQueries` | No | OData query parameters, set via the record fields `skip` (`$skip`), `top` (`$top`), `filter` (`$filter`), `orderby` (`$orderby`), `expand` (`$expand`), `crossCompany` (`cross-company`), `count` (`$count`), and `'select` (`$select`). |

Returns: `RegistrationsCollection|error`

Sample code:

```ballerina
sysconfig:RegistrationsCollection result = check fo->listRegistrations(
    queries = {filter: "CountryRegionId eq 'RUS'"}
);
```

</details>

<details>
<summary>createRegistrations</summary>

Creates a `Registration` record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `Registration` | Yes | The party registration record to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `Registration|error`

Sample code:

```ballerina
sysconfig:Registration created = check fo->createRegistrations({
    partyNumber: "5637144174",
    locationId: "1",
    validFrom: "2024-01-01",
    validTo: "2029-12-31",
    legislationType: "INN",
    countryRegionId: "RUS",
    registrationNumber: "7712345678",
    issuer: "Federal Tax Service",
    issueDate: "2024-01-01"
});
```

</details>

<details>
<summary>getRegistrations</summary>

Reads a specific `Registration` record by its composite key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `partyNumber` | `string` | Yes | The party number key field. |
| `locationId` | `string` | Yes | The location id key field. |
| `validFrom` | `string` | Yes | The valid from key field. |
| `legislationType` | `string` | Yes | The legislation type key field. |
| `countryRegionId` | `string` | Yes | The country region id key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetRegistrationsQueries` | No | OData query parameters, set via the record fields `expand` (`$expand`) and `'select` (`$select`). |

Returns: `Registration|error`

Sample code:

```ballerina
sysconfig:Registration registration = check fo->getRegistrations(
    "5637144174", "1", "2024-01-01", "INN", "RUS"
);
```

</details>

<details>
<summary>deleteRegistrations</summary>

Deletes a specific `Registration` record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `partyNumber` | `string` | Yes | The party number key field of the record to delete. |
| `locationId` | `string` | Yes | The location id key field of the record to delete. |
| `validFrom` | `string` | Yes | The valid from key field of the record to delete. |
| `legislationType` | `string` | Yes | The legislation type key field of the record to delete. |
| `countryRegionId` | `string` | Yes | The country region id key field of the record to delete. |
| `headers` | `DeleteRegistrationsHeaders` | No | Request headers; supports an optional `ifMatch` field mapped to the `If-Match` header, used for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteRegistrations(
    "5637144174", "1", "2024-01-01", "INN", "RUS", headers = {ifMatch: eTag}
);
```

</details>

<details>
<summary>updateRegistrations</summary>

Updates a specific `Registration` record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `partyNumber` | `string` | Yes | The party number key field of the record to update. |
| `locationId` | `string` | Yes | The location id key field of the record to update. |
| `validFrom` | `string` | Yes | The valid from key field of the record to update. |
| `legislationType` | `string` | Yes | The legislation type key field of the record to update. |
| `countryRegionId` | `string` | Yes | The country region id key field of the record to update. |
| `payload` | `Registration` | Yes | The fields to update. |
| `headers` | `UpdateRegistrationsHeaders` | No | Request headers; supports an optional `ifMatch` field mapped to the `If-Match` header, used for optimistic concurrency. |

Returns: `Registration|error`

Sample code:

```ballerina
sysconfig:Registration updated = check fo->updateRegistrations(
    "5637144174",
    "1",
    "2024-01-01",
    "INN",
    "RUS",
    {validTo: "2030-12-31"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Rooms

<details>
<summary>listRooms</summary>

Reads all `Rooms` records in the system.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListRoomsQueries` | No | OData query parameters, set via the record fields `skip` (`$skip`), `top` (`$top`), `filter` (`$filter`), `orderby` (`$orderby`), `expand` (`$expand`), `crossCompany` (`cross-company`), `count` (`$count`), and `'select` (`$select`). |

Returns: `RoomsCollection|error`

Sample code:

```ballerina
sysconfig:RoomsCollection result = check fo->listRooms(queries = {top: 20});
```

</details>

<details>
<summary>createRooms</summary>

Creates a `Room` record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `Room` | Yes | The room record to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `Room|error`

Sample code:

```ballerina
sysconfig:Room created = check fo->createRooms({
    dataAreaId: "USMF",
    roomId: "RM-101",
    flatNumber: "12",
    flatType: "Office",
    postalCode: "101000",
    regionCode: "77",
    startDate: "2024-01-01"
});
```

</details>

<details>
<summary>getRooms</summary>

Reads a specific `Room` record by its composite key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `roomId` | `string` | Yes | The room id key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetRoomsQueries` | No | OData query parameters, set via the record fields `expand` (`$expand`) and `'select` (`$select`). |

Returns: `Room|error`

Sample code:

```ballerina
sysconfig:Room room = check fo->getRooms("USMF", "RM-101");
```

</details>

<details>
<summary>deleteRooms</summary>

Deletes a specific `Room` record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `roomId` | `string` | Yes | The room id key field of the record to delete. |
| `headers` | `DeleteRoomsHeaders` | No | Request headers; supports an optional `ifMatch` field mapped to the `If-Match` header, used for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteRooms("USMF", "RM-101", headers = {ifMatch: eTag});
```

</details>

<details>
<summary>updateRooms</summary>

Updates a specific `Room` record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `roomId` | `string` | Yes | The room id key field of the record to update. |
| `payload` | `Room` | Yes | The fields to update. |
| `headers` | `UpdateRoomsHeaders` | No | Request headers; supports an optional `ifMatch` field mapped to the `If-Match` header, used for optimistic concurrency. |

Returns: `Room|error`

Sample code:

```ballerina
sysconfig:Room updated = check fo->updateRooms(
    "USMF",
    "RM-101",
    {flatType: "Meeting room"},
    headers = {ifMatch: eTag}
);
```

</details>

#### State 11

<details>
<summary>listState11</summary>

Reads all `State11` records in the system.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListState11Queries` | No | OData query parameters, set via the record fields `skip` (`$skip`), `top` (`$top`), `filter` (`$filter`), `orderby` (`$orderby`), `expand` (`$expand`), `crossCompany` (`cross-company`), `count` (`$count`), and `'select` (`$select`). |

Returns: `State11Collection|error`

Sample code:

```ballerina
sysconfig:State11Collection result = check fo->listState11(queries = {top: 20});
```

</details>

<details>
<summary>createState11</summary>

Creates a `State11` record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `State11` | Yes | The bank reporting flag record to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `State11|error`

Sample code:

```ballerina
sysconfig:State11 created = check fo->createState11({
    dataAreaId: "USMF",
    bankAccount: "BANK-001",
    sequenceNumber: "1",
    reportOnState11: "Yes"
});
```

</details>

<details>
<summary>getState11</summary>

Reads a specific `State11` record by its composite key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `bankAccount` | `string` | Yes | The bank account key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetState11Queries` | No | OData query parameters, set via the record fields `expand` (`$expand`) and `'select` (`$select`). |

Returns: `State11|error`

Sample code:

```ballerina
sysconfig:State11 state = check fo->getState11("USMF", "BANK-001");
```

</details>

<details>
<summary>deleteState11</summary>

Deletes a specific `State11` record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `bankAccount` | `string` | Yes | The bank account key field of the record to delete. |
| `headers` | `DeleteState11Headers` | No | Request headers; supports an optional `ifMatch` field mapped to the `If-Match` header, used for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteState11("USMF", "BANK-001", headers = {ifMatch: eTag});
```

</details>

<details>
<summary>updateState11</summary>

Updates a specific `State11` record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `bankAccount` | `string` | Yes | The bank account key field of the record to update. |
| `payload` | `State11` | Yes | The fields to update. |
| `headers` | `UpdateState11Headers` | No | Request headers; supports an optional `ifMatch` field mapped to the `If-Match` header, used for optimistic concurrency. |

Returns: `State11|error`

Sample code:

```ballerina
sysconfig:State11 updated = check fo->updateState11(
    "USMF",
    "BANK-001",
    {reportOnState11: "No"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Std Seqs

<details>
<summary>listStdSeqs</summary>

Reads all `StdSeqs` records in the system.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListStdSeqsQueries` | No | OData query parameters, set via the record fields `skip` (`$skip`), `top` (`$top`), `filter` (`$filter`), `orderby` (`$orderby`), `expand` (`$expand`), `crossCompany` (`cross-company`), `count` (`$count`), and `'select` (`$select`). |

Returns: `StdSeqsCollection|error`

Sample code:

```ballerina
sysconfig:StdSeqsCollection result = check fo->listStdSeqs(
    queries = {filter: "AppliedModule eq 'Deferrals'"}
);
```

</details>

<details>
<summary>createStdSeqs</summary>

Creates a `StdSeq` record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `StdSeq` | Yes | The standard tax sequence record to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `StdSeq|error`

Sample code:

```ballerina
sysconfig:StdSeq created = check fo->createStdSeqs({
    dataAreaId: "USMF",
    sequence: 1,
    appliedModule: "Deferrals",
    channel: "Register",
    channelReference: "REG-001",
    description: "Standard deferral sequence"
});
```

</details>

<details>
<summary>getStdSeqs</summary>

Reads a specific `StdSeq` record by its composite key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `sequence` | `int` | Yes | The sequence key field. |
| `appliedModule` | `string` | Yes | The applied module key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetStdSeqsQueries` | No | OData query parameters, set via the record fields `expand` (`$expand`) and `'select` (`$select`). |

Returns: `StdSeq|error`

Sample code:

```ballerina
sysconfig:StdSeq seq = check fo->getStdSeqs("USMF", 1, "Deferrals");
```

</details>

<details>
<summary>deleteStdSeqs</summary>

Deletes a specific `StdSeq` record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `sequence` | `int` | Yes | The sequence key field of the record to delete. |
| `appliedModule` | `string` | Yes | The applied module key field of the record to delete. |
| `headers` | `DeleteStdSeqsHeaders` | No | Request headers; supports an optional `ifMatch` field mapped to the `If-Match` header, used for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteStdSeqs("USMF", 1, "Deferrals", headers = {ifMatch: eTag});
```

</details>

<details>
<summary>updateStdSeqs</summary>

Updates a specific `StdSeq` record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `sequence` | `int` | Yes | The sequence key field of the record to update. |
| `appliedModule` | `string` | Yes | The applied module key field of the record to update. |
| `payload` | `StdSeq` | Yes | The fields to update. |
| `headers` | `UpdateStdSeqsHeaders` | No | Request headers; supports an optional `ifMatch` field mapped to the `If-Match` header, used for optimistic concurrency. |

Returns: `StdSeq|error`

Sample code:

```ballerina
sysconfig:StdSeq updated = check fo->updateStdSeqs(
    "USMF",
    1,
    "Deferrals",
    {channelReference: "REG-002"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Steads

<details>
<summary>listSteads</summary>

Reads all `Steads` records in the system.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListSteadsQueries` | No | OData query parameters, set via the record fields `skip` (`$skip`), `top` (`$top`), `filter` (`$filter`), `orderby` (`$orderby`), `expand` (`$expand`), `crossCompany` (`cross-company`), `count` (`$count`), and `'select` (`$select`). |

Returns: `SteadsCollection|error`

Sample code:

```ballerina
sysconfig:SteadsCollection result = check fo->listSteads(queries = {top: 20});
```

</details>

<details>
<summary>createSteads</summary>

Creates a `Stead` record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `Stead` | Yes | The land parcel record to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `Stead|error`

Sample code:

```ballerina
sysconfig:Stead created = check fo->createSteads({
    dataAreaId: "USMF",
    steadId: "ST-001",
    number: "45",
    postalCode: "101000",
    regionCode: "77",
    startDate: "2024-01-01"
});
```

</details>

<details>
<summary>getSteads</summary>

Reads a specific `Stead` record by its composite key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `steadId` | `string` | Yes | The stead id key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetSteadsQueries` | No | OData query parameters, set via the record fields `expand` (`$expand`) and `'select` (`$select`). |

Returns: `Stead|error`

Sample code:

```ballerina
sysconfig:Stead stead = check fo->getSteads("USMF", "ST-001");
```

</details>

<details>
<summary>deleteSteads</summary>

Deletes a specific `Stead` record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `steadId` | `string` | Yes | The stead id key field of the record to delete. |
| `headers` | `DeleteSteadsHeaders` | No | Request headers; supports an optional `ifMatch` field mapped to the `If-Match` header, used for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteSteads("USMF", "ST-001", headers = {ifMatch: eTag});
```

</details>

<details>
<summary>updateSteads</summary>

Updates a specific `Stead` record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `steadId` | `string` | Yes | The stead id key field of the record to update. |
| `payload` | `Stead` | Yes | The fields to update. |
| `headers` | `UpdateSteadsHeaders` | No | Request headers; supports an optional `ifMatch` field mapped to the `If-Match` header, used for optimistic concurrency. |

Returns: `Stead|error`

Sample code:

```ballerina
sysconfig:Stead updated = check fo->updateSteads(
    "USMF",
    "ST-001",
    {postalCode: "101001"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Table Datas

<details>
<summary>listTableDatas</summary>

Reads all `TableDatas` records in the system.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListTableDatasQueries` | No | OData query parameters, set via the record fields `skip` (`$skip`), `top` (`$top`), `filter` (`$filter`), `orderby` (`$orderby`), `expand` (`$expand`), `crossCompany` (`cross-company`), `count` (`$count`), and `'select` (`$select`). |

Returns: `TableDatasCollection|error`

Sample code:

```ballerina
sysconfig:TableDatasCollection result = check fo->listTableDatas(queries = {top: 20});
```

</details>

<details>
<summary>createTableDatas</summary>

Creates a `TableData` record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `TableData` | Yes | The table data record to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `TableData|error`

Sample code:

```ballerina
sysconfig:TableData created = check fo->createTableDatas({
    dataAreaId: "USMF",
    accountCode: "Table",
    accountRelation: "CUST-001",
    warehouse: "WH-01",
    associationWithWarehouse: "Table",
    name: "J. Smith",
    position: "Manager",
    reportType: "General",
    jobTitle: "Accountant"
});
```

</details>

<details>
<summary>getTableDatas</summary>

Reads a specific `TableData` record by its composite key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `accountCode` | `string` | Yes | The account code key field. |
| `accountRelation` | `string` | Yes | The account relation key field. |
| `warehouse` | `string` | Yes | The warehouse key field. |
| `associationWithWarehouse` | `string` | Yes | The association with warehouse key field. |
| `name` | `string` | Yes | The name key field. |
| `position` | `string` | Yes | The position key field. |
| `reportType` | `string` | Yes | The report type key field. |
| `jobTitle` | `string` | Yes | The job title key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetTableDatasQueries` | No | OData query parameters, set via the record fields `expand` (`$expand`) and `'select` (`$select`). |

Returns: `TableData|error`

Sample code:

```ballerina
sysconfig:TableData data = check fo->getTableDatas(
    "USMF", "Table", "CUST-001", "WH-01", "Table", "J. Smith", "Manager", "General", "Accountant"
);
```

</details>

<details>
<summary>deleteTableDatas</summary>

Deletes a specific `TableData` record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `accountCode` | `string` | Yes | The account code key field of the record to delete. |
| `accountRelation` | `string` | Yes | The account relation key field of the record to delete. |
| `warehouse` | `string` | Yes | The warehouse key field of the record to delete. |
| `associationWithWarehouse` | `string` | Yes | The association with warehouse key field of the record to delete. |
| `name` | `string` | Yes | The name key field of the record to delete. |
| `position` | `string` | Yes | The position key field of the record to delete. |
| `reportType` | `string` | Yes | The report type key field of the record to delete. |
| `jobTitle` | `string` | Yes | The job title key field of the record to delete. |
| `headers` | `DeleteTableDatasHeaders` | No | Request headers; supports an optional `ifMatch` field mapped to the `If-Match` header, used for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteTableDatas(
    "USMF", "Table", "CUST-001", "WH-01", "Table", "J. Smith", "Manager", "General", "Accountant",
    headers = {ifMatch: eTag}
);
```

</details>

<details>
<summary>updateTableDatas</summary>

Updates a specific `TableData` record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `accountCode` | `string` | Yes | The account code key field of the record to update. |
| `accountRelation` | `string` | Yes | The account relation key field of the record to update. |
| `warehouse` | `string` | Yes | The warehouse key field of the record to update. |
| `associationWithWarehouse` | `string` | Yes | The association with warehouse key field of the record to update. |
| `name` | `string` | Yes | The name key field of the record to update. |
| `position` | `string` | Yes | The position key field of the record to update. |
| `reportType` | `string` | Yes | The report type key field of the record to update. |
| `jobTitle` | `string` | Yes | The job title key field of the record to update. |
| `payload` | `TableData` | Yes | The fields to update. |
| `headers` | `UpdateTableDatasHeaders` | No | Request headers; supports an optional `ifMatch` field mapped to the `If-Match` header, used for optimistic concurrency. |

Returns: `TableData|error`

Sample code:

```ballerina
sysconfig:TableData updated = check fo->updateTableDatas(
    "USMF", "Table", "CUST-001", "WH-01", "Table", "J. Smith", "Manager", "General", "Accountant",
    {reprReason: "Address change"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Table Mappings

<details>
<summary>listTableMappings</summary>

Reads all `TableMappings` records in the system.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListTableMappingsQueries` | No | OData query parameters, set via the record fields `skip` (`$skip`), `top` (`$top`), `filter` (`$filter`), `orderby` (`$orderby`), `expand` (`$expand`), `crossCompany` (`cross-company`), `count` (`$count`), and `'select` (`$select`). |

Returns: `TableMappingsCollection|error`

Sample code:

```ballerina
sysconfig:TableMappingsCollection result = check fo->listTableMappings(
    queries = {filter: "EntityName eq 'CustTable'"}
);
```

</details>

<details>
<summary>createTableMappings</summary>

Creates a `TableMapping` record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `TableMapping` | Yes | The table mapping record to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `TableMapping|error`

Sample code:

```ballerina
sysconfig:TableMapping created = check fo->createTableMappings({
    dataAreaId: "USMF",
    dataSourceTableId: 12345,
    entityName: "CustTable"
});
```

</details>

<details>
<summary>getTableMappings</summary>

Reads a specific `TableMapping` record by its composite key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `dataSourceTableId` | `int` | Yes | The data source table id key field. |
| `entityName` | `string` | Yes | The entity name key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetTableMappingsQueries` | No | OData query parameters, set via the record fields `expand` (`$expand`) and `'select` (`$select`). |

Returns: `TableMapping|error`

Sample code:

```ballerina
sysconfig:TableMapping mapping = check fo->getTableMappings("USMF", 12345, "CustTable");
```

</details>

<details>
<summary>deleteTableMappings</summary>

Deletes a specific `TableMapping` record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `dataSourceTableId` | `int` | Yes | The data source table id key field of the record to delete. |
| `entityName` | `string` | Yes | The entity name key field of the record to delete. |
| `headers` | `DeleteTableMappingsHeaders` | No | Request headers; supports an optional `ifMatch` field mapped to the `If-Match` header, used for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteTableMappings("USMF", 12345, "CustTable", headers = {ifMatch: eTag});
```

</details>

<details>
<summary>updateTableMappings</summary>

Updates a specific `TableMapping` record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `dataSourceTableId` | `int` | Yes | The data source table id key field of the record to update. |
| `entityName` | `string` | Yes | The entity name key field of the record to update. |
| `payload` | `TableMapping` | Yes | The fields to update. |
| `headers` | `UpdateTableMappingsHeaders` | No | Request headers; supports an optional `ifMatch` field mapped to the `If-Match` header, used for optimistic concurrency. |

Returns: `TableMapping|error`

Sample code:

```ballerina
sysconfig:TableMapping updated = check fo->updateTableMappings(
    "USMF",
    12345,
    "CustTable",
    {dataSourceTableId: 12346},
    headers = {ifMatch: eTag}
);
```

</details>

#### Tables

<details>
<summary>listTables</summary>

Reads all `Tables` records in the system.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListTablesQueries` | No | OData query parameters, set via the record fields `skip` (`$skip`), `top` (`$top`), `filter` (`$filter`), `orderby` (`$orderby`), `expand` (`$expand`), `crossCompany` (`cross-company`), `count` (`$count`), and `'select` (`$select`). |

Returns: `TablesCollection|error`

Sample code:

```ballerina
sysconfig:TablesCollection result = check fo->listTables(queries = {top: 20});
```

</details>

<details>
<summary>createTables</summary>

Creates a `Table` record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `Table` | Yes | The deferral table record to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `Table|error`

Sample code:

```ballerina
sysconfig:Table created = check fo->createTables({
    dataAreaId: "USMF",
    deferralId: "DEF-001",
    name: "Annual maintenance deferral",
    vATOffsetMethodForDeferrals: "Standard",
    dateAttached: "2024-01-15",
    comment: "Prepaid maintenance contract"
});
```

</details>

<details>
<summary>getTables</summary>

Reads a specific `Table` record by its composite key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `deferralId` | `string` | Yes | The deferral id key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetTablesQueries` | No | OData query parameters, set via the record fields `expand` (`$expand`) and `'select` (`$select`). |

Returns: `Table|error`

Sample code:

```ballerina
sysconfig:Table 'table = check fo->getTables("USMF", "DEF-001");
```

</details>

<details>
<summary>deleteTables</summary>

Deletes a specific `Table` record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `deferralId` | `string` | Yes | The deferral id key field of the record to delete. |
| `headers` | `DeleteTablesHeaders` | No | Request headers; supports an optional `ifMatch` field mapped to the `If-Match` header, used for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteTables("USMF", "DEF-001", headers = {ifMatch: eTag});
```

</details>

<details>
<summary>updateTables</summary>

Updates a specific `Table` record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `deferralId` | `string` | Yes | The deferral id key field of the record to update. |
| `payload` | `Table` | Yes | The fields to update. |
| `headers` | `UpdateTablesHeaders` | No | Request headers; supports an optional `ifMatch` field mapped to the `If-Match` header, used for optimistic concurrency. |

Returns: `Table|error`

Sample code:

```ballerina
sysconfig:Table updated = check fo->updateTables(
    "USMF",
    "DEF-001",
    {comment: "Renewed prepaid maintenance contract"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Tests

<details>
<summary>listTests</summary>

Reads all `Tests` records in the system.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListTestsQueries` | No | OData query parameters, set via the record fields `skip` (`$skip`), `top` (`$top`), `filter` (`$filter`), `orderby` (`$orderby`), `expand` (`$expand`), `crossCompany` (`cross-company`), `count` (`$count`), and `'select` (`$select`). |

Returns: `TestsCollection|error`

Sample code:

```ballerina
sysconfig:TestsCollection result = check fo->listTests(queries = {top: 20});
```

</details>

<details>
<summary>createTests</summary>

Creates a `Test` record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `Test` | Yes | The test record to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `Test|error`

Sample code:

```ballerina
sysconfig:Test created = check fo->createTests({
    dataAreaId: "USMF",
    iD: 1001,
    name: "Smoke test",
    description: "Connectivity smoke test",
    number: 1
});
```

</details>

<details>
<summary>getTests</summary>

Reads a specific `Test` record by its composite key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `iD` | `int` | Yes | The i d key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetTestsQueries` | No | OData query parameters, set via the record fields `expand` (`$expand`) and `'select` (`$select`). |

Returns: `Test|error`

Sample code:

```ballerina
sysconfig:Test test = check fo->getTests("USMF", 1001);
```

</details>

<details>
<summary>deleteTests</summary>

Deletes a specific `Test` record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `iD` | `int` | Yes | The i d key field of the record to delete. |
| `headers` | `DeleteTestsHeaders` | No | Request headers; supports an optional `ifMatch` field mapped to the `If-Match` header, used for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteTests("USMF", 1001, headers = {ifMatch: eTag});
```

</details>

<details>
<summary>updateTests</summary>

Updates a specific `Test` record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `iD` | `int` | Yes | The i d key field of the record to update. |
| `payload` | `Test` | Yes | The fields to update. |
| `headers` | `UpdateTestsHeaders` | No | Request headers; supports an optional `ifMatch` field mapped to the `If-Match` header, used for optimistic concurrency. |

Returns: `Test|error`

Sample code:

```ballerina
sysconfig:Test updated = check fo->updateTests(
    "USMF",
    1001,
    {description: "Updated connectivity smoke test"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Trans Datas

<details>
<summary>listTransDatas</summary>

Reads all `TransDatas` records in the system.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListTransDatasQueries` | No | OData query parameters, set via the record fields `skip` (`$skip`), `top` (`$top`), `filter` (`$filter`), `orderby` (`$orderby`), `expand` (`$expand`), `crossCompany` (`cross-company`), `count` (`$count`), and `'select` (`$select`). |

Returns: `TransDatasCollection|error`

Sample code:

```ballerina
sysconfig:TransDatasCollection result = check fo->listTransDatas(queries = {top: 20});
```

</details>

<details>
<summary>createTransDatas</summary>

Creates a `TransData` record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `TransData` | Yes | The transaction data record to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `TransData|error`

Sample code:

```ballerina
sysconfig:TransData created = check fo->createTransDatas({
    dataAreaId: "USMF",
    accountCode: "Table",
    'module: "Cust",
    accountRelation: "CUST-001",
    warehouse: "WH-01",
    associationWithWarehouse: "Table",
    employeeName: "J. Smith",
    officialSession: "SESSION-01",
    position: "Manager",
    reportType: "General",
    title: "Mr."
});
```

</details>

<details>
<summary>getTransDatas</summary>

Reads a specific `TransData` record by its composite key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `accountCode` | `string` | Yes | The account code key field. |
| `module` | `string` | Yes | The module key field. |
| `accountRelation` | `string` | Yes | The account relation key field. |
| `warehouse` | `string` | Yes | The warehouse key field. |
| `associationWithWarehouse` | `string` | Yes | The association with warehouse key field. |
| `employeeName` | `string` | Yes | The employee name key field. |
| `officialSession` | `string` | Yes | The official session key field. |
| `position` | `string` | Yes | The position key field. |
| `reportType` | `string` | Yes | The report type key field. |
| `title` | `string` | Yes | The title key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetTransDatasQueries` | No | OData query parameters, set via the record fields `expand` (`$expand`) and `'select` (`$select`). |

Returns: `TransData|error`

Sample code:

```ballerina
sysconfig:TransData data = check fo->getTransDatas(
    "USMF", "Table", "Cust", "CUST-001", "WH-01", "Table", "J. Smith", "SESSION-01", "Manager", "General", "Mr."
);
```

</details>

<details>
<summary>deleteTransDatas</summary>

Deletes a specific `TransData` record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `accountCode` | `string` | Yes | The account code key field of the record to delete. |
| `module` | `string` | Yes | The module key field of the record to delete. |
| `accountRelation` | `string` | Yes | The account relation key field of the record to delete. |
| `warehouse` | `string` | Yes | The warehouse key field of the record to delete. |
| `associationWithWarehouse` | `string` | Yes | The association with warehouse key field of the record to delete. |
| `employeeName` | `string` | Yes | The employee name key field of the record to delete. |
| `officialSession` | `string` | Yes | The official session key field of the record to delete. |
| `position` | `string` | Yes | The position key field of the record to delete. |
| `reportType` | `string` | Yes | The report type key field of the record to delete. |
| `title` | `string` | Yes | The title key field of the record to delete. |
| `headers` | `DeleteTransDatasHeaders` | No | Request headers; supports an optional `ifMatch` field mapped to the `If-Match` header, used for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteTransDatas(
    "USMF", "Table", "Cust", "CUST-001", "WH-01", "Table", "J. Smith", "SESSION-01", "Manager", "General", "Mr.",
    headers = {ifMatch: eTag}
);
```

</details>

<details>
<summary>updateTransDatas</summary>

Updates a specific `TransData` record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `accountCode` | `string` | Yes | The account code key field of the record to update. |
| `module` | `string` | Yes | The module key field of the record to update. |
| `accountRelation` | `string` | Yes | The account relation key field of the record to update. |
| `warehouse` | `string` | Yes | The warehouse key field of the record to update. |
| `associationWithWarehouse` | `string` | Yes | The association with warehouse key field of the record to update. |
| `employeeName` | `string` | Yes | The employee name key field of the record to update. |
| `officialSession` | `string` | Yes | The official session key field of the record to update. |
| `position` | `string` | Yes | The position key field of the record to update. |
| `reportType` | `string` | Yes | The report type key field of the record to update. |
| `title` | `string` | Yes | The title key field of the record to update. |
| `payload` | `TransData` | Yes | The fields to update. |
| `headers` | `UpdateTransDatasHeaders` | No | Request headers; supports an optional `ifMatch` field mapped to the `If-Match` header, used for optimistic concurrency. |

Returns: `TransData|error`

Sample code:

```ballerina
sysconfig:TransData updated = check fo->updateTransDatas(
    "USMF", "Table", "Cust", "CUST-001", "WH-01", "Table", "J. Smith", "SESSION-01", "Manager", "General", "Mr.",
    {title: "Ms."},
    headers = {ifMatch: eTag}
);
```

</details>

#### Type Tables

<details>
<summary>listTypeTables</summary>

Reads all `TypeTables` records in the system.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListTypeTablesQueries` | No | OData query parameters, set via the record fields `skip` (`$skip`), `top` (`$top`), `filter` (`$filter`), `orderby` (`$orderby`), `expand` (`$expand`), `crossCompany` (`cross-company`), `count` (`$count`), and `'select` (`$select`). |

Returns: `TypeTablesCollection|error`

Sample code:

```ballerina
sysconfig:TypeTablesCollection result = check fo->listTypeTables(queries = {top: 20});
```

</details>

<details>
<summary>createTypeTables</summary>

Creates a `TypeTable` record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `TypeTable` | Yes | The vehicle type table record to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `TypeTable|error`

Sample code:

```ballerina
sysconfig:TypeTable created = check fo->createTypeTables({
    dataAreaId: "USMF",
    vehicleType: "Truck",
    description: "Heavy goods truck"
});
```

</details>

<details>
<summary>getTypeTables</summary>

Reads a specific `TypeTable` record by its composite key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `vehicleType` | `string` | Yes | The vehicle type key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetTypeTablesQueries` | No | OData query parameters, set via the record fields `expand` (`$expand`) and `'select` (`$select`). |

Returns: `TypeTable|error`

Sample code:

```ballerina
sysconfig:TypeTable typeTable = check fo->getTypeTables("USMF", "Truck");
```

</details>

<details>
<summary>deleteTypeTables</summary>

Deletes a specific `TypeTable` record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `vehicleType` | `string` | Yes | The vehicle type key field of the record to delete. |
| `headers` | `DeleteTypeTablesHeaders` | No | Request headers; supports an optional `ifMatch` field mapped to the `If-Match` header, used for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteTypeTables("USMF", "Truck", headers = {ifMatch: eTag});
```

</details>

<details>
<summary>updateTypeTables</summary>

Updates a specific `TypeTable` record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `vehicleType` | `string` | Yes | The vehicle type key field of the record to update. |
| `payload` | `TypeTable` | Yes | The fields to update. |
| `headers` | `UpdateTypeTablesHeaders` | No | Request headers; supports an optional `ifMatch` field mapped to the `If-Match` header, used for optimistic concurrency. |

Returns: `TypeTable|error`

Sample code:

```ballerina
sysconfig:TypeTable updated = check fo->updateTypeTables(
    "USMF",
    "Truck",
    {description: "Heavy goods articulated truck"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Types

<details>
<summary>listTypes</summary>

Reads all `Types` records in the system.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListTypesQueries` | No | OData query parameters, set via the record fields `skip` (`$skip`), `top` (`$top`), `filter` (`$filter`), `orderby` (`$orderby`), `expand` (`$expand`), `crossCompany` (`cross-company`), `count` (`$count`), and `'select` (`$select`). |

Returns: `TypesCollection|error`

Sample code:

```ballerina
sysconfig:TypesCollection result = check fo->listTypes(queries = {top: 20});
```

</details>

<details>
<summary>createTypes</summary>

Creates a `Type` record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `Type` | Yes | The fleet type record to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `Type|error`

Sample code:

```ballerina
sysconfig:Type created = check fo->createTypes({
    dataAreaId: "USMF",
    flTypeId: "FL-01",
    shortName: "FL01",
    name: "Fleet type 1"
});
```

</details>

<details>
<summary>getTypes</summary>

Reads a specific `Type` record by its composite key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `flTypeId` | `string` | Yes | The fl type id key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetTypesQueries` | No | OData query parameters, set via the record fields `expand` (`$expand`) and `'select` (`$select`). |

Returns: `Type|error`

Sample code:

```ballerina
sysconfig:Type flType = check fo->getTypes("USMF", "FL-01");
```

</details>

<details>
<summary>deleteTypes</summary>

Deletes a specific `Type` record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `flTypeId` | `string` | Yes | The fl type id key field of the record to delete. |
| `headers` | `DeleteTypesHeaders` | No | Request headers; supports an optional `ifMatch` field mapped to the `If-Match` header, used for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteTypes("USMF", "FL-01", headers = {ifMatch: eTag});
```

</details>

<details>
<summary>updateTypes</summary>

Updates a specific `Type` record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `flTypeId` | `string` | Yes | The fl type id key field of the record to update. |
| `payload` | `Type` | Yes | The fields to update. |
| `headers` | `UpdateTypesHeaders` | No | Request headers; supports an optional `ifMatch` field mapped to the `If-Match` header, used for optimistic concurrency. |

Returns: `Type|error`

Sample code:

```ballerina
sysconfig:Type updated = check fo->updateTypes(
    "USMF",
    "FL-01",
    {name: "Fleet type 1 (light)"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Web Services

<details>
<summary>listWebServices</summary>

Reads all `WebServices` records in the system.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListWebServicesQueries` | No | OData query parameters, set via the record fields `skip` (`$skip`), `top` (`$top`), `filter` (`$filter`), `orderby` (`$orderby`), `expand` (`$expand`), `crossCompany` (`cross-company`), `count` (`$count`), and `'select` (`$select`). |

Returns: `WebServicesCollection|error`

Sample code:

```ballerina
sysconfig:WebServicesCollection result = check fo->listWebServices(queries = {top: 20});
```

</details>

<details>
<summary>createWebServices</summary>

Creates a `WebService` record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `WebService` | Yes | The web service endpoint record to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `WebService|error`

Sample code:

```ballerina
sysconfig:WebService created = check fo->createWebServices({
    dataAreaId: "USMF",
    webService: "WS-CUSTOMSAPI",
    webApplicationName: "CustomsGateway",
    internetAddress: "https://customs.example.com/api",
    requestMethod: "POST",
    requestContentType: "application/xml",
    successfulResponseCode: 200,
    description: "Customs declaration web service"
});
```

</details>

<details>
<summary>getWebServices</summary>

Reads a specific `WebService` record by its composite key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `webService` | `string` | Yes | The web service key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetWebServicesQueries` | No | OData query parameters, set via the record fields `expand` (`$expand`) and `'select` (`$select`). |

Returns: `WebService|error`

Sample code:

```ballerina
sysconfig:WebService webService = check fo->getWebServices("USMF", "WS-CUSTOMSAPI");
```

</details>

<details>
<summary>deleteWebServices</summary>

Deletes a specific `WebService` record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `webService` | `string` | Yes | The web service key field of the record to delete. |
| `headers` | `DeleteWebServicesHeaders` | No | Request headers; supports an optional `ifMatch` field mapped to the `If-Match` header, used for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteWebServices("USMF", "WS-CUSTOMSAPI", headers = {ifMatch: eTag});
```

</details>

<details>
<summary>updateWebServices</summary>

Updates a specific `WebService` record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `webService` | `string` | Yes | The web service key field of the record to update. |
| `payload` | `WebService` | Yes | The fields to update. |
| `headers` | `UpdateWebServicesHeaders` | No | Request headers; supports an optional `ifMatch` field mapped to the `If-Match` header, used for optimistic concurrency. |

Returns: `WebService|error`

Sample code:

```ballerina
sysconfig:WebService updated = check fo->updateWebServices(
    "USMF",
    "WS-CUSTOMSAPI",
    {internetAddress: "https://customs.example.com/api/v2"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Work Calendars

<details>
<summary>listWorkCalendars</summary>

Reads all `WorkCalendars` records in the system.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListWorkCalendarsQueries` | No | OData query parameters, set via the record fields `skip` (`$skip`), `top` (`$top`), `filter` (`$filter`), `orderby` (`$orderby`), `expand` (`$expand`), `crossCompany` (`cross-company`), `count` (`$count`), and `'select` (`$select`). |

Returns: `WorkCalendarsCollection|error`

Sample code:

```ballerina
sysconfig:WorkCalendarsCollection result = check fo->listWorkCalendars(queries = {top: 20});
```

</details>

<details>
<summary>createWorkCalendars</summary>

Creates a `WorkCalendar` record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `WorkCalendar` | Yes | The work calendar record to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `WorkCalendar|error`

Sample code:

```ballerina
sysconfig:WorkCalendar created = check fo->createWorkCalendars({
    dataAreaId: "USMF",
    calendarId: "STANDARD",
    calendarName: "Standard 5-day calendar",
    isMondayWorkingDay: "Yes",
    isTuesdayWorkingDay: "Yes",
    isWednesdayWorkingDay: "Yes",
    isThursdayWorkingDay: "Yes",
    isFridayWorkingDay: "Yes",
    isSaturdayWorkingDay: "No",
    isSundayWorkingDay: "No",
    defaultStartingTime: 32400,
    defaultEndingTime: 61200,
    workHours: 8
});
```

</details>

<details>
<summary>getWorkCalendars</summary>

Reads a specific `WorkCalendar` record by its composite key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `calendarId` | `string` | Yes | The calendar id key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetWorkCalendarsQueries` | No | OData query parameters, set via the record fields `expand` (`$expand`) and `'select` (`$select`). |

Returns: `WorkCalendar|error`

Sample code:

```ballerina
sysconfig:WorkCalendar calendar = check fo->getWorkCalendars("USMF", "STANDARD");
```

</details>

<details>
<summary>deleteWorkCalendars</summary>

Deletes a specific `WorkCalendar` record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `calendarId` | `string` | Yes | The calendar id key field of the record to delete. |
| `headers` | `DeleteWorkCalendarsHeaders` | No | Request headers; supports an optional `ifMatch` field mapped to the `If-Match` header, used for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteWorkCalendars("USMF", "STANDARD", headers = {ifMatch: eTag});
```

</details>

<details>
<summary>updateWorkCalendars</summary>

Updates a specific `WorkCalendar` record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `calendarId` | `string` | Yes | The calendar id key field of the record to update. |
| `payload` | `WorkCalendar` | Yes | The fields to update. |
| `headers` | `UpdateWorkCalendarsHeaders` | No | Request headers; supports an optional `ifMatch` field mapped to the `If-Match` header, used for optimistic concurrency. |

Returns: `WorkCalendar|error`

Sample code:

```ballerina
sysconfig:WorkCalendar updated = check fo->updateWorkCalendars(
    "USMF",
    "STANDARD",
    {isSaturdayWorkingDay: "Yes"},
    headers = {ifMatch: eTag}
);
```

</details>
