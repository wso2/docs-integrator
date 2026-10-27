---
connector: true
connector_name: "sap.s4hana.api_inforecord_process_srv"
title: "Actions"
description: "Reference for the SAP Purchasing Info Record connector client: configuration, initialization and every operation with parameters, return types and sample code."
toc_max_heading_level: 4
---

# Actions

The `ballerinax/sap.s4hana.api_inforecord_process_srv` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Provides access to SAP S/4HANA purchasing info records, their organization and plant data, purchase order texts and pricing conditions through the `API_INFORECORD_PROCESS_SRV` OData V2 service. |

---

## Client

Provides access to SAP S/4HANA purchasing info records, their organization and plant data, purchase order texts and pricing conditions through the `API_INFORECORD_PROCESS_SRV` OData V2 service.

### Configuration

The client is initialized with a `ConnectionConfig` record, the API `hostname` (for example, `my123456-api.s4hana.cloud.sap`) and an optional `port` (default `443`). The `ConnectionConfig` record has the following fields:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `http:BearerTokenConfig\|OAuth2RefreshTokenGrantConfig\|http:CredentialsConfig` | Required | Authentication configuration. Use `http:CredentialsConfig` (username and password of the communication user) for Basic Auth. |
| `httpVersion` | `http:HttpVersion` | `http:HTTP_2_0` | HTTP protocol version understood by the client. |
| `http1Settings` | `http:ClientHttp1Settings` | `{}` | Configurations related to the HTTP/1.x protocol. |
| `http2Settings` | `http:ClientHttp2Settings` | `{}` | Configurations related to the HTTP/2 protocol. |
| `timeout` | `decimal` | `60` | Maximum time (in seconds) to wait for a response before closing the connection. |
| `forwarded` | `string` | `"disable"` | Choice of setting the `forwarded`/`x-forwarded` header. |
| `followRedirects` | `http:FollowRedirects` | Optional | Configurations associated with redirection. |
| `poolConfig` | `http:PoolConfiguration` | Optional | Configurations associated with request pooling. |
| `cache` | `http:CacheConfig` | `{}` | HTTP caching related configurations. |
| `compression` | `http:Compression` | `http:COMPRESSION_AUTO` | How the `accept-encoding` header is handled. |
| `circuitBreaker` | `http:CircuitBreakerConfig` | Optional | Configurations associated with the circuit breaker. |
| `retryConfig` | `http:RetryConfig` | Optional | Configurations associated with retrying. |
| `cookieConfig` | `http:CookieConfig` | Optional | Configurations associated with cookies. |
| `responseLimits` | `http:ResponseLimitConfigs` | `{}` | Configurations associated with inbound response size limits. |
| `secureSocket` | `http:ClientSecureSocket` | Optional | SSL/TLS related options. |
| `proxy` | `http:ProxyConfig` | Optional | Proxy server related options. |
| `socketConfig` | `http:ClientSocketConfig` | `{}` | Client socket configuration. |
| `validation` | `boolean` | `true` | Enables inbound payload validation provided by the constraint package. |
| `laxDataBinding` | `boolean` | `true` | Enables relaxed data binding: `nil` values are treated as optional and absent fields as nilable. |

### Initializing the client

```ballerina
import ballerinax/sap.s4hana.api_inforecord_process_srv as inforecdprc;

configurable string hostname = ?;
configurable string username = ?;
configurable string password = ?;

inforecdprc:Client infoRecProcessClient = check new (
    {
        auth: {
            username: username,
            password: password
        }
    },
    hostname
);
```

### Operations

The `patch` operations take a `Modified\ ...Type` record that wraps the matching `Update...` record in a `d` field, for example `{d: {NetPriceAmount: "12.50"}}`. Query parameters are passed as named arguments (for example, `\$top = 10`). The `$select`, `$expand` and `$orderby` query parameters take arrays of the field or navigation names defined for each entity.

#### Purchasing info records

<details>
<summary>listA_PurchasingInfoRecords</summary>

<div>

Retrieves a collection of purchasing info records (general data), with OData query options for filtering, paging, sorting and field selection.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_PurchasingInfoRecordsQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`. |

Returns: `CollectionOfA_PurchasingInfoRecordWrapper|error`

Sample code:

```ballerina
inforecdprc:CollectionOfA_PurchasingInfoRecordWrapper records = check infoRecProcessClient->listA_PurchasingInfoRecords(
    \$filter = "Supplier eq '17300001'",
    \$top = 2,
    \$select = ["PurchasingInfoRecord", "Supplier", "Material", "PurchasingInfoRecordDesc"]
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "PurchasingInfoRecord": "5300000123",
        "Supplier": "17300001",
        "Material": "TG11",
        "PurchasingInfoRecordDesc": "Trading good 11"
      },
      {
        "PurchasingInfoRecord": "5300000124",
        "Supplier": "17300001",
        "Material": "TG12",
        "PurchasingInfoRecordDesc": "Trading good 12"
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>createA_PurchasingInfoRecord</summary>

<div>

Creates a purchasing info record for a supplier and material combination. Organization and plant data, condition validities and conditions can be created in the same request through the nested `to_PurgInfoRecdOrgPlantData` field.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateA_PurchasingInfoRecord` | Yes | Info record general data. `PurchasingInfoRecord` is a required field of the record type; the sample passes an empty string and reads the number SAP assigns from the response. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_PurchasingInfoRecordWrapper|error`

Sample code:

```ballerina
inforecdprc:A_PurchasingInfoRecordWrapper created = check infoRecProcessClient->createA_PurchasingInfoRecord({
    PurchasingInfoRecord: "",
    Supplier: "17300001",
    Material: "TG11",
    to_PurgInfoRecdOrgPlantData: {
        results: [{
            PurchasingInfoRecord: "",
            PurchasingInfoRecordCategory: "0",
            PurchasingOrganization: "1710",
            Plant: "1710",
            PurchasingGroup: "001",
            Currency: "USD",
            NetPriceAmount: "12.50"
        }]
    }
});
```

Sample response:

```ballerina
{
  "d": {
    "PurchasingInfoRecord": "5300000123",
    "Supplier": "17300001",
    "Material": "TG11",
    "MaterialGroup": "L001",
    "PurchasingInfoRecordDesc": "Trading good 11",
    "PurgDocOrderQuantityUnit": "PC",
    "BaseUnit": "PC",
    "IsDeleted": false
  }
}
```

</div>

</details>

<details>
<summary>getA_PurchasingInfoRecord</summary>

<div>

Retrieves the general data of a single purchasing info record by its number.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `PurchasingInfoRecord` | `string` | Yes | Purchasing info record number (up to 10 characters). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_PurchasingInfoRecordQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `A_PurchasingInfoRecordWrapper|error`

Sample code:

```ballerina
inforecdprc:A_PurchasingInfoRecordWrapper infoRecord = check infoRecProcessClient->getA_PurchasingInfoRecord(
    "5300000123",
    \$expand = ["to_PurgInfoRecdOrgPlantData"]
);
```

Sample response:

```ballerina
{
  "d": {
    "PurchasingInfoRecord": "5300000123",
    "Supplier": "17300001",
    "Material": "TG11",
    "MaterialGroup": "L001",
    "PurchasingInfoRecordDesc": "Trading good 11",
    "PurgDocOrderQuantityUnit": "PC",
    "BaseUnit": "PC",
    "IsDeleted": false
  }
}
```

</div>

</details>

<details>
<summary>patchA_PurchasingInfoRecord</summary>

<div>

Updates the general data of a purchasing info record using a PATCH request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `PurchasingInfoRecord` | `string` | Yes | Purchasing info record number (up to 10 characters). |
| `payload` | `Modified\ A_PurchasingInfoRecordType` | Yes | Wraps an `UpdateA_PurchasingInfoRecord` record (the fields to change) in the `d` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check infoRecProcessClient->patchA_PurchasingInfoRecord(
    "5300000123",
    {d: {SupplierMaterialNumber: "SUP-TG11", SupplierPhoneNumber: "+1 555 0100"}},
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</div>

</details>

#### Organization and plant data

<details>
<summary>listA_PurgInfoRecdOrgPlantData</summary>

<div>

Retrieves the purchasing organization and plant data of purchasing info records.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_PurgInfoRecdOrgPlantDataQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`. |

Returns: `CollectionOfA_PurgInfoRecdOrgPlantDataWrapper|error`

Sample code:

```ballerina
inforecdprc:CollectionOfA_PurgInfoRecdOrgPlantDataWrapper orgData = check infoRecProcessClient->listA_PurgInfoRecdOrgPlantData(
    \$filter = "PurchasingOrganization eq '1710'",
    \$top = 2,
    \$select = ["PurchasingInfoRecord", "PurchasingOrganization", "Plant", "NetPriceAmount", "Currency"]
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "PurchasingInfoRecord": "5300000123",
        "PurchasingOrganization": "1710",
        "Plant": "1710",
        "NetPriceAmount": "12.50",
        "Currency": "USD"
      },
      {
        "PurchasingInfoRecord": "5300000124",
        "PurchasingOrganization": "1710",
        "Plant": "1710",
        "NetPriceAmount": "8.20",
        "Currency": "USD"
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>createA_PurgInfoRecdOrgPlantData</summary>

<div>

Creates purchasing organization and plant data for an existing purchasing info record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateA_PurgInfoRecdOrgPlantData` | Yes | Organization and plant data. `PurchasingInfoRecord`, `PurchasingInfoRecordCategory`, `PurchasingOrganization` and `Plant` are required. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_PurgInfoRecdOrgPlantDataWrapper|error`

Sample code:

```ballerina
inforecdprc:A_PurgInfoRecdOrgPlantDataWrapper created = check infoRecProcessClient->createA_PurgInfoRecdOrgPlantData({
    PurchasingInfoRecord: "5300000123",
    PurchasingInfoRecordCategory: "0",
    PurchasingOrganization: "1710",
    Plant: "1710",
    PurchasingGroup: "001",
    Currency: "USD",
    NetPriceAmount: "12.50"
});
```

Sample response:

```ballerina
{
  "d": {
    "PurchasingInfoRecord": "5300000123",
    "PurchasingInfoRecordCategory": "0",
    "PurchasingOrganization": "1710",
    "Plant": "1710",
    "PurchasingGroup": "001",
    "Currency": "USD",
    "NetPriceAmount": "12.50",
    "MaterialPriceUnitQty": "1",
    "MaterialPlannedDeliveryDurn": "5",
    "StandardPurchaseOrderQuantity": "100"
  }
}
```

</div>

</details>

<details>
<summary>getA_PurgInfoRecdOrgPlantData</summary>

<div>

Retrieves the purchasing organization and plant data of a purchasing info record by its full key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `PurchasingInfoRecord` | `string` | Yes | Purchasing info record number (up to 10 characters). |
| `PurchasingInfoRecordCategory` | `string` | Yes | Purchasing info record category (`0` standard, `1` subcontracting, `2` pipeline, `3` consignment). |
| `PurchasingOrganization` | `string` | Yes | Purchasing organization (up to 4 characters). |
| `Plant` | `string` | Yes | Plant (up to 4 characters). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_PurgInfoRecdOrgPlantDataQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `A_PurgInfoRecdOrgPlantDataWrapper|error`

Sample code:

```ballerina
inforecdprc:A_PurgInfoRecdOrgPlantDataWrapper orgData = check infoRecProcessClient->getA_PurgInfoRecdOrgPlantData(
    "5300000123", "0", "1710", "1710"
);
```

Sample response:

```ballerina
{
  "d": {
    "PurchasingInfoRecord": "5300000123",
    "PurchasingInfoRecordCategory": "0",
    "PurchasingOrganization": "1710",
    "Plant": "1710",
    "PurchasingGroup": "001",
    "Currency": "USD",
    "NetPriceAmount": "12.50",
    "MaterialPriceUnitQty": "1",
    "MaterialPlannedDeliveryDurn": "5",
    "StandardPurchaseOrderQuantity": "100"
  }
}
```

</div>

</details>

<details>
<summary>patchA_PurgInfoRecdOrgPlantData</summary>

<div>

Updates the purchasing organization and plant data of a purchasing info record using a PATCH request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `PurchasingInfoRecord` | `string` | Yes | Purchasing info record number (up to 10 characters). |
| `PurchasingInfoRecordCategory` | `string` | Yes | Purchasing info record category (`0` standard, `1` subcontracting, `2` pipeline, `3` consignment). |
| `PurchasingOrganization` | `string` | Yes | Purchasing organization (up to 4 characters). |
| `Plant` | `string` | Yes | Plant (up to 4 characters). |
| `payload` | `Modified\ A_PurgInfoRecdOrgPlantDataType` | Yes | Wraps an `UpdateA_PurgInfoRecdOrgPlantData` record (the fields to change) in the `d` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check infoRecProcessClient->patchA_PurgInfoRecdOrgPlantData(
    "5300000123", "0", "1710", "1710",
    {d: {NetPriceAmount: "12.90", MaterialPlannedDeliveryDurn: "7"}},
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</div>

</details>

<details>
<summary>listPurgInfoRecdOrgPlantDataOfA_PurchasingInfoRecord</summary>

<div>

Retrieves the organization and plant data that belongs to a purchasing info record, through the `to_PurgInfoRecdOrgPlantData` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `PurchasingInfoRecord` | `string` | Yes | Purchasing info record number (up to 10 characters). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListPurgInfoRecdOrgPlantDataOfA_PurchasingInfoRecordQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`. |

Returns: `CollectionOfA_PurgInfoRecdOrgPlantDataWrapper|error`

Sample code:

```ballerina
inforecdprc:CollectionOfA_PurgInfoRecdOrgPlantDataWrapper orgData = check infoRecProcessClient->listPurgInfoRecdOrgPlantDataOfA_PurchasingInfoRecord(
    "5300000123"
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "PurchasingInfoRecord": "5300000123",
        "PurchasingInfoRecordCategory": "0",
        "PurchasingOrganization": "1710",
        "Plant": "1710",
        "NetPriceAmount": "12.50",
        "Currency": "USD"
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>createPurgInfoRecdOrgPlantDataOfA_PurchasingInfoRecord</summary>

<div>

Creates organization and plant data under a purchasing info record, through the `to_PurgInfoRecdOrgPlantData` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `PurchasingInfoRecord` | `string` | Yes | Purchasing info record number (up to 10 characters). |
| `payload` | `CreateA_PurgInfoRecdOrgPlantData` | Yes | Organization and plant data. `PurchasingInfoRecord`, `PurchasingInfoRecordCategory`, `PurchasingOrganization` and `Plant` are required. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_PurgInfoRecdOrgPlantDataWrapper|error`

Sample code:

```ballerina
inforecdprc:A_PurgInfoRecdOrgPlantDataWrapper created = check infoRecProcessClient->createPurgInfoRecdOrgPlantDataOfA_PurchasingInfoRecord(
    "5300000123",
    {
        PurchasingInfoRecord: "5300000123",
        PurchasingInfoRecordCategory: "0",
        PurchasingOrganization: "1710",
        Plant: "1720",
        Currency: "USD",
        NetPriceAmount: "12.80"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "PurchasingInfoRecord": "5300000123",
    "PurchasingInfoRecordCategory": "0",
    "PurchasingOrganization": "1710",
    "Plant": "1720",
    "PurchasingGroup": "001",
    "Currency": "USD",
    "NetPriceAmount": "12.80",
    "MaterialPriceUnitQty": "1",
    "MaterialPlannedDeliveryDurn": "5",
    "StandardPurchaseOrderQuantity": "100"
  }
}
```

</div>

</details>

#### Purchase order texts

<details>
<summary>listA_PurgInfoRecdOrgPOTexts</summary>

<div>

Retrieves the purchase order texts of purchasing info records.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_PurgInfoRecdOrgPOTextsQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$inlinecount`, `$select`. |

Returns: `CollectionOfA_PurgInfoRecdOrgPOTextWrapper|error`

Sample code:

```ballerina
inforecdprc:CollectionOfA_PurgInfoRecdOrgPOTextWrapper texts = check infoRecProcessClient->listA_PurgInfoRecdOrgPOTexts(
    \$filter = "PurchasingInfoRecord eq '5300000123'",
    \$select = ["PurchasingInfoRecord", "Language", "NoteDescription"]
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "PurchasingInfoRecord": "5300000123",
        "Language": "EN",
        "NoteDescription": "Deliver in sealed cartons."
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>createA_PurgInfoRecdOrgPOText</summary>

<div>

Creates a purchase order text for the organization and plant data of a purchasing info record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateA_PurgInfoRecdOrgPOText` | Yes | Purchase order text. All key fields (`Language`, `DocumentText`, `TechnicalObjectType`, `ArchObjectNumber`, `PurchasingInfoRecord`, `PurchasingOrganization`, `PurchasingInfoRecordCategory`, `Plant`) are required. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_PurgInfoRecdOrgPOTextWrapper|error`

Sample code:

```ballerina
inforecdprc:A_PurgInfoRecdOrgPOTextWrapper created = check infoRecProcessClient->createA_PurgInfoRecdOrgPOText({
    Language: "EN",
    DocumentText: "BT",
    TechnicalObjectType: "EINE",
    ArchObjectNumber: "5300000123171001710",
    PurchasingInfoRecord: "5300000123",
    PurchasingOrganization: "1710",
    PurchasingInfoRecordCategory: "0",
    Plant: "1710",
    NoteDescription: "Deliver in sealed cartons."
});
```

Sample response:

```ballerina
{
  "d": {
    "Language": "EN",
    "DocumentText": "BT",
    "TechnicalObjectType": "EINE",
    "ArchObjectNumber": "5300000123171001710",
    "PurchasingInfoRecord": "5300000123",
    "PurchasingOrganization": "1710",
    "PurchasingInfoRecordCategory": "0",
    "Plant": "1710",
    "NoteDescription": "Deliver in sealed cartons."
  }
}
```

</div>

</details>

<details>
<summary>getA_PurgInfoRecdOrgPOText</summary>

<div>

Retrieves a single purchase order text by its full key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Language` | `string` | Yes | Language key (up to 2 characters), for example `EN`. |
| `DocumentText` | `string` | Yes | Text ID (up to 4 characters), for example `BT` for the purchase order text. |
| `TechnicalObjectType` | `string` | Yes | Text application object (up to 10 characters), for example `EINE`. |
| `ArchObjectNumber` | `string` | Yes | Text name (up to 70 characters) that identifies the text. |
| `PurchasingInfoRecord` | `string` | Yes | Purchasing info record number (up to 10 characters). |
| `PurchasingOrganization` | `string` | Yes | Purchasing organization (up to 4 characters). |
| `PurchasingInfoRecordCategory` | `string` | Yes | Purchasing info record category (`0` standard, `1` subcontracting, `2` pipeline, `3` consignment). |
| `Plant` | `string` | Yes | Plant (up to 4 characters). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_PurgInfoRecdOrgPOTextQueries` | No | OData query parameters: `$select`. |

Returns: `A_PurgInfoRecdOrgPOTextWrapper|error`

Sample code:

```ballerina
inforecdprc:A_PurgInfoRecdOrgPOTextWrapper text = check infoRecProcessClient->getA_PurgInfoRecdOrgPOText(
    "EN", "BT", "EINE", "5300000123171001710", "5300000123", "1710", "0", "1710"
);
```

Sample response:

```ballerina
{
  "d": {
    "Language": "EN",
    "DocumentText": "BT",
    "TechnicalObjectType": "EINE",
    "ArchObjectNumber": "5300000123171001710",
    "PurchasingInfoRecord": "5300000123",
    "PurchasingOrganization": "1710",
    "PurchasingInfoRecordCategory": "0",
    "Plant": "1710",
    "NoteDescription": "Deliver in sealed cartons."
  }
}
```

</div>

</details>

<details>
<summary>patchA_PurgInfoRecdOrgPOText</summary>

<div>

Updates a purchase order text using a PATCH request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Language` | `string` | Yes | Language key (up to 2 characters), for example `EN`. |
| `DocumentText` | `string` | Yes | Text ID (up to 4 characters), for example `BT` for the purchase order text. |
| `TechnicalObjectType` | `string` | Yes | Text application object (up to 10 characters), for example `EINE`. |
| `ArchObjectNumber` | `string` | Yes | Text name (up to 70 characters) that identifies the text. |
| `PurchasingInfoRecord` | `string` | Yes | Purchasing info record number (up to 10 characters). |
| `PurchasingOrganization` | `string` | Yes | Purchasing organization (up to 4 characters). |
| `PurchasingInfoRecordCategory` | `string` | Yes | Purchasing info record category (`0` standard, `1` subcontracting, `2` pipeline, `3` consignment). |
| `Plant` | `string` | Yes | Plant (up to 4 characters). |
| `payload` | `Modified\ A_PurgInfoRecdOrgPOTextType` | Yes | Wraps an `UpdateA_PurgInfoRecdOrgPOText` record (`NoteDescription`) in the `d` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check infoRecProcessClient->patchA_PurgInfoRecdOrgPOText(
    "EN", "BT", "EINE", "5300000123171001710", "5300000123", "1710", "0", "1710",
    {d: {NoteDescription: "Deliver on pallets, max 500 kg each."}},
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</div>

</details>

<details>
<summary>deleteA_PurgInfoRecdOrgPOText</summary>

<div>

Deletes a purchase order text by its full key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Language` | `string` | Yes | Language key (up to 2 characters), for example `EN`. |
| `DocumentText` | `string` | Yes | Text ID (up to 4 characters), for example `BT` for the purchase order text. |
| `TechnicalObjectType` | `string` | Yes | Text application object (up to 10 characters), for example `EINE`. |
| `ArchObjectNumber` | `string` | Yes | Text name (up to 70 characters) that identifies the text. |
| `PurchasingInfoRecord` | `string` | Yes | Purchasing info record number (up to 10 characters). |
| `PurchasingOrganization` | `string` | Yes | Purchasing organization (up to 4 characters). |
| `PurchasingInfoRecordCategory` | `string` | Yes | Purchasing info record category (`0` standard, `1` subcontracting, `2` pipeline, `3` consignment). |
| `Plant` | `string` | Yes | Plant (up to 4 characters). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check infoRecProcessClient->deleteA_PurgInfoRecdOrgPOText(
    "EN", "BT", "EINE", "5300000123171001710", "5300000123", "1710", "0", "1710",
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</div>

</details>

<details>
<summary>listPurInfoRecdPurOrgTextsOfA_PurgInfoRecdOrgPlantData</summary>

<div>

Retrieves the purchase order texts of a specific organization and plant data entry, through the `to_PurInfoRecdPurOrgText` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `PurchasingInfoRecord` | `string` | Yes | Purchasing info record number (up to 10 characters). |
| `PurchasingInfoRecordCategory` | `string` | Yes | Purchasing info record category (`0` standard, `1` subcontracting, `2` pipeline, `3` consignment). |
| `PurchasingOrganization` | `string` | Yes | Purchasing organization (up to 4 characters). |
| `Plant` | `string` | Yes | Plant (up to 4 characters). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListPurInfoRecdPurOrgTextsOfA_PurgInfoRecdOrgPlantDataQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$inlinecount`, `$select`. |

Returns: `CollectionOfA_PurgInfoRecdOrgPOTextWrapper|error`

Sample code:

```ballerina
inforecdprc:CollectionOfA_PurgInfoRecdOrgPOTextWrapper texts = check infoRecProcessClient->listPurInfoRecdPurOrgTextsOfA_PurgInfoRecdOrgPlantData(
    "5300000123", "0", "1710", "1710"
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "Language": "EN",
        "DocumentText": "BT",
        "PurchasingInfoRecord": "5300000123",
        "PurchasingOrganization": "1710",
        "Plant": "1710",
        "NoteDescription": "Deliver in sealed cartons."
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>createPurInfoRecdPurOrgTextOfA_PurgInfoRecdOrgPlantData</summary>

<div>

Creates a purchase order text under a specific organization and plant data entry, through the `to_PurInfoRecdPurOrgText` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `PurchasingInfoRecord` | `string` | Yes | Purchasing info record number (up to 10 characters). |
| `PurchasingInfoRecordCategory` | `string` | Yes | Purchasing info record category (`0` standard, `1` subcontracting, `2` pipeline, `3` consignment). |
| `PurchasingOrganization` | `string` | Yes | Purchasing organization (up to 4 characters). |
| `Plant` | `string` | Yes | Plant (up to 4 characters). |
| `payload` | `CreateA_PurgInfoRecdOrgPOText` | Yes | Purchase order text. All key fields and `NoteDescription` are set as in `createA_PurgInfoRecdOrgPOText`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_PurgInfoRecdOrgPOTextWrapper|error`

Sample code:

```ballerina
inforecdprc:A_PurgInfoRecdOrgPOTextWrapper created = check infoRecProcessClient->createPurInfoRecdPurOrgTextOfA_PurgInfoRecdOrgPlantData(
    "5300000123", "0", "1710", "1710",
    {
        Language: "EN",
        DocumentText: "BT",
        TechnicalObjectType: "EINE",
        ArchObjectNumber: "5300000123171001710",
        PurchasingInfoRecord: "5300000123",
        PurchasingOrganization: "1710",
        PurchasingInfoRecordCategory: "0",
        Plant: "1710",
        NoteDescription: "Deliver in sealed cartons."
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "Language": "EN",
    "DocumentText": "BT",
    "TechnicalObjectType": "EINE",
    "ArchObjectNumber": "5300000123171001710",
    "PurchasingInfoRecord": "5300000123",
    "PurchasingOrganization": "1710",
    "PurchasingInfoRecordCategory": "0",
    "Plant": "1710",
    "NoteDescription": "Deliver in sealed cartons."
  }
}
```

</div>

</details>

#### Pricing conditions

<details>
<summary>listA_PurInfoRecdPrcgCndns</summary>

<div>

Retrieves the pricing conditions of purchasing info records.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_PurInfoRecdPrcgCndnsQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`. |

Returns: `CollectionOfA_PurInfoRecdPrcgCndnWrapper|error`

Sample code:

```ballerina
inforecdprc:CollectionOfA_PurInfoRecdPrcgCndnWrapper conditions = check infoRecProcessClient->listA_PurInfoRecdPrcgCndns(
    \$filter = "ConditionType eq 'PPR0'",
    \$top = 2,
    \$select = ["ConditionRecord", "ConditionType", "ConditionRateValue", "ConditionRateValueUnit"]
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "ConditionRecord": "0000012345",
        "ConditionType": "PPR0",
        "ConditionRateValue": "12.50",
        "ConditionRateValueUnit": "USD"
      },
      {
        "ConditionRecord": "0000012346",
        "ConditionType": "PPR0",
        "ConditionRateValue": "8.20",
        "ConditionRateValueUnit": "USD"
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>getA_PurInfoRecdPrcgCndn</summary>

<div>

Retrieves a single pricing condition by its condition record number.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ConditionRecord` | `string` | Yes | Number of the condition record (up to 10 characters). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_PurInfoRecdPrcgCndnQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `A_PurInfoRecdPrcgCndnWrapper|error`

Sample code:

```ballerina
inforecdprc:A_PurInfoRecdPrcgCndnWrapper condition = check infoRecProcessClient->getA_PurInfoRecdPrcgCndn(
    "0000012345",
    \$expand = ["to_PurgInfoPricingCndnRecdScale"]
);
```

Sample response:

```ballerina
{
  "d": {
    "ConditionRecord": "0000012345",
    "ConditionSequentialNumber": "01",
    "ConditionApplication": "M",
    "ConditionType": "PPR0",
    "ConditionValidityStartDate": "/Date(1735689600000)/",
    "ConditionValidityEndDate": "/Date(253402214400000)/",
    "ConditionRateValue": "12.50",
    "ConditionRateValueUnit": "USD",
    "ConditionQuantity": "1",
    "ConditionQuantityUnit": "PC",
    "ConditionIsDeleted": false
  }
}
```

</div>

</details>

<details>
<summary>patchA_PurInfoRecdPrcgCndn</summary>

<div>

Updates a pricing condition using a PATCH request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ConditionRecord` | `string` | Yes | Number of the condition record (up to 10 characters). |
| `payload` | `Modified\ A_PurInfoRecdPrcgCndnType` | Yes | Wraps an `UpdateA_PurInfoRecdPrcgCndn` record (the fields to change) in the `d` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check infoRecProcessClient->patchA_PurInfoRecdPrcgCndn(
    "0000012345",
    {d: {ConditionRateValue: "12.90"}},
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</div>

</details>

#### Condition validities

<details>
<summary>listA_PurInfoRecdPrcgCndnValidities</summary>

<div>

Retrieves the pricing condition validity periods of purchasing info records.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_PurInfoRecdPrcgCndnValiditiesQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`. |

Returns: `CollectionOfA_PurInfoRecdPrcgCndnValidityWrapper|error`

Sample code:

```ballerina
inforecdprc:CollectionOfA_PurInfoRecdPrcgCndnValidityWrapper validities = check infoRecProcessClient->listA_PurInfoRecdPrcgCndnValidities(
    \$filter = "PurchasingInfoRecord eq '5300000123'",
    \$select = ["ConditionRecord", "ConditionValidityStartDate", "ConditionValidityEndDate", "ConditionType"]
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "ConditionRecord": "0000012345",
        "ConditionValidityStartDate": "/Date(1735689600000)/",
        "ConditionValidityEndDate": "/Date(253402214400000)/",
        "ConditionType": "PPR0"
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>createA_PurInfoRecdPrcgCndnValidity</summary>

<div>

Creates a pricing condition validity period for a purchasing info record. The pricing condition can be created in the same request through the nested `to_PurInfoRecdPrcgCndn` field.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateA_PurInfoRecdPrcgCndnValidity` | Yes | Condition validity. `ConditionRecord` and `ConditionValidityEndDate` are required fields of the record type. The condition itself can be supplied in the nested `to_PurInfoRecdPrcgCndn` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_PurInfoRecdPrcgCndnValidityWrapper|error`

Sample code:

```ballerina
inforecdprc:A_PurInfoRecdPrcgCndnValidityWrapper created = check infoRecProcessClient->createA_PurInfoRecdPrcgCndnValidity({
    ConditionRecord: "",
    ConditionValidityEndDate: "/Date(253402214400000)/",
    ConditionValidityStartDate: "/Date(1735689600000)/",
    ConditionType: "PPR0",
    PurchasingOrganization: "1710",
    PurchasingInfoRecordCategory: "0",
    PurchasingInfoRecord: "5300000123",
    Plant: "1710",
    to_PurInfoRecdPrcgCndn: {
        ConditionRecord: "",
        ConditionSequentialNumber: "01",
        ConditionRateValue: "12.50",
        ConditionRateValueUnit: "USD"
    }
});
```

Sample response:

```ballerina
{
  "d": {
    "ConditionRecord": "0000012345",
    "ConditionValidityEndDate": "/Date(253402214400000)/",
    "ConditionValidityStartDate": "/Date(1735689600000)/",
    "ConditionApplication": "M",
    "ConditionType": "PPR0",
    "PurchasingOrganization": "1710",
    "PurchasingInfoRecordCategory": "0",
    "PurchasingInfoRecord": "5300000123",
    "Supplier": "17300001",
    "Material": "TG11",
    "Plant": "1710"
  }
}
```

</div>

</details>

<details>
<summary>getA_PurInfoRecdPrcgCndnValidity</summary>

<div>

Retrieves a single pricing condition validity by condition record number and validity end date.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ConditionRecord` | `string` | Yes | Number of the condition record (up to 10 characters). |
| `ConditionValidityEndDate` | `string` | Yes | Validity end date of the condition record as a date-time value such as `9999-12-31T00:00:00`. The client wraps it in an OData `datetime'...'` literal. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_PurInfoRecdPrcgCndnValidityQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `A_PurInfoRecdPrcgCndnValidityWrapper|error`

Sample code:

```ballerina
inforecdprc:A_PurInfoRecdPrcgCndnValidityWrapper validity = check infoRecProcessClient->getA_PurInfoRecdPrcgCndnValidity(
    "0000012345",
    "9999-12-31T00:00:00"
);
```

Sample response:

```ballerina
{
  "d": {
    "ConditionRecord": "0000012345",
    "ConditionValidityEndDate": "/Date(253402214400000)/",
    "ConditionValidityStartDate": "/Date(1735689600000)/",
    "ConditionApplication": "M",
    "ConditionType": "PPR0",
    "PurchasingOrganization": "1710",
    "PurchasingInfoRecordCategory": "0",
    "PurchasingInfoRecord": "5300000123",
    "Supplier": "17300001",
    "Material": "TG11",
    "Plant": "1710"
  }
}
```

</div>

</details>

<details>
<summary>patchA_PurInfoRecdPrcgCndnValidity</summary>

<div>

Updates a pricing condition validity using a PATCH request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ConditionRecord` | `string` | Yes | Number of the condition record (up to 10 characters). |
| `ConditionValidityEndDate` | `string` | Yes | Validity end date of the condition record as a date-time value such as `9999-12-31T00:00:00`. The client wraps it in an OData `datetime'...'` literal. |
| `payload` | `Modified\ A_PurInfoRecdPrcgCndnValidityType` | Yes | Wraps an `UpdateA_PurInfoRecdPrcgCndnValidity` record (the fields to change) in the `d` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check infoRecProcessClient->patchA_PurInfoRecdPrcgCndnValidity(
    "0000012345",
    "9999-12-31T00:00:00",
    {d: {ConditionValidityStartDate: "/Date(1738368000000)/"}},
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</div>

</details>

<details>
<summary>listPurInfoRecdPrcgCndnValiditiesOfA_PurgInfoRecdOrgPlantData</summary>

<div>

Retrieves the pricing condition validities of a specific organization and plant data entry, through the `to_PurInfoRecdPrcgCndnValidity` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `PurchasingInfoRecord` | `string` | Yes | Purchasing info record number (up to 10 characters). |
| `PurchasingInfoRecordCategory` | `string` | Yes | Purchasing info record category (`0` standard, `1` subcontracting, `2` pipeline, `3` consignment). |
| `PurchasingOrganization` | `string` | Yes | Purchasing organization (up to 4 characters). |
| `Plant` | `string` | Yes | Plant (up to 4 characters). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListPurInfoRecdPrcgCndnValiditiesOfA_PurgInfoRecdOrgPlantDataQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`. |

Returns: `CollectionOfA_PurInfoRecdPrcgCndnValidityWrapper|error`

Sample code:

```ballerina
inforecdprc:CollectionOfA_PurInfoRecdPrcgCndnValidityWrapper validities = check infoRecProcessClient->listPurInfoRecdPrcgCndnValiditiesOfA_PurgInfoRecdOrgPlantData(
    "5300000123", "0", "1710", "1710"
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "ConditionRecord": "0000012345",
        "ConditionValidityStartDate": "/Date(1735689600000)/",
        "ConditionValidityEndDate": "/Date(253402214400000)/",
        "ConditionType": "PPR0",
        "PurchasingInfoRecord": "5300000123"
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>createPurInfoRecdPrcgCndnValidityOfA_PurgInfoRecdOrgPlantData</summary>

<div>

Creates a pricing condition validity under a specific organization and plant data entry, through the `to_PurInfoRecdPrcgCndnValidity` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `PurchasingInfoRecord` | `string` | Yes | Purchasing info record number (up to 10 characters). |
| `PurchasingInfoRecordCategory` | `string` | Yes | Purchasing info record category (`0` standard, `1` subcontracting, `2` pipeline, `3` consignment). |
| `PurchasingOrganization` | `string` | Yes | Purchasing organization (up to 4 characters). |
| `Plant` | `string` | Yes | Plant (up to 4 characters). |
| `payload` | `CreateA_PurInfoRecdPrcgCndnValidity` | Yes | Condition validity. `ConditionRecord` and `ConditionValidityEndDate` are required fields of the record type. The condition itself can be supplied in the nested `to_PurInfoRecdPrcgCndn` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_PurInfoRecdPrcgCndnValidityWrapper|error`

Sample code:

```ballerina
inforecdprc:A_PurInfoRecdPrcgCndnValidityWrapper created = check infoRecProcessClient->createPurInfoRecdPrcgCndnValidityOfA_PurgInfoRecdOrgPlantData(
    "5300000123", "0", "1710", "1710",
    {
        ConditionRecord: "",
        ConditionValidityEndDate: "/Date(253402214400000)/",
        ConditionValidityStartDate: "/Date(1735689600000)/",
        ConditionType: "PPR0",
        PurchasingOrganization: "1710",
        PurchasingInfoRecordCategory: "0",
        PurchasingInfoRecord: "5300000123",
        Plant: "1710"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "ConditionRecord": "0000012345",
    "ConditionValidityEndDate": "/Date(253402214400000)/",
    "ConditionValidityStartDate": "/Date(1735689600000)/",
    "ConditionApplication": "M",
    "ConditionType": "PPR0",
    "PurchasingOrganization": "1710",
    "PurchasingInfoRecordCategory": "0",
    "PurchasingInfoRecord": "5300000123",
    "Supplier": "17300001",
    "Material": "TG11",
    "Plant": "1710"
  }
}
```

</div>

</details>

<details>
<summary>listPurInfoRecdPrcgCndnValiditiesOfA_PurInfoRecdPrcgCndn</summary>

<div>

Retrieves the validity periods of a pricing condition, through the `to_PurInfoRecdPrcgCndnValidity` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ConditionRecord` | `string` | Yes | Number of the condition record (up to 10 characters). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListPurInfoRecdPrcgCndnValiditiesOfA_PurInfoRecdPrcgCndnQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`. |

Returns: `CollectionOfA_PurInfoRecdPrcgCndnValidityWrapper|error`

Sample code:

```ballerina
inforecdprc:CollectionOfA_PurInfoRecdPrcgCndnValidityWrapper validities = check infoRecProcessClient->listPurInfoRecdPrcgCndnValiditiesOfA_PurInfoRecdPrcgCndn(
    "0000012345"
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "ConditionRecord": "0000012345",
        "ConditionValidityStartDate": "/Date(1735689600000)/",
        "ConditionValidityEndDate": "/Date(253402214400000)/",
        "ConditionType": "PPR0",
        "PurchasingInfoRecord": "5300000123"
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>createPurInfoRecdPrcgCndnValidityOfA_PurInfoRecdPrcgCndn</summary>

<div>

Creates a validity period for a pricing condition, through the `to_PurInfoRecdPrcgCndnValidity` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ConditionRecord` | `string` | Yes | Number of the condition record (up to 10 characters). |
| `payload` | `CreateA_PurInfoRecdPrcgCndnValidity` | Yes | Condition validity. `ConditionRecord` and `ConditionValidityEndDate` are required fields of the record type. The condition itself can be supplied in the nested `to_PurInfoRecdPrcgCndn` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_PurInfoRecdPrcgCndnValidityWrapper|error`

Sample code:

```ballerina
inforecdprc:A_PurInfoRecdPrcgCndnValidityWrapper created = check infoRecProcessClient->createPurInfoRecdPrcgCndnValidityOfA_PurInfoRecdPrcgCndn(
    "0000012345",
    {
        ConditionRecord: "0000012345",
        ConditionValidityEndDate: "/Date(253402214400000)/",
        ConditionValidityStartDate: "/Date(1735689600000)/",
        ConditionType: "PPR0",
        PurchasingOrganization: "1710",
        PurchasingInfoRecordCategory: "0",
        PurchasingInfoRecord: "5300000123",
        Plant: "1710"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "ConditionRecord": "0000012345",
    "ConditionValidityEndDate": "/Date(253402214400000)/",
    "ConditionValidityStartDate": "/Date(1735689600000)/",
    "ConditionApplication": "M",
    "ConditionType": "PPR0",
    "PurchasingOrganization": "1710",
    "PurchasingInfoRecordCategory": "0",
    "PurchasingInfoRecord": "5300000123",
    "Supplier": "17300001",
    "Material": "TG11",
    "Plant": "1710"
  }
}
```

</div>

</details>

<details>
<summary>listPurInfoRecdPrcgCndnValiditiesOfA_PurInfoRecdSuplmntPrcgCndn</summary>

<div>

Retrieves the validity periods of a supplementary pricing condition, through the `to_PurInfoRecdPrcgCndnValidity` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ConditionRecord` | `string` | Yes | Number of the condition record (up to 10 characters). |
| `ConditionSequentialNumber` | `string` | Yes | Sequential number of the condition (up to 2 characters). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListPurInfoRecdPrcgCndnValiditiesOfA_PurInfoRecdSuplmntPrcgCndnQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`. |

Returns: `CollectionOfA_PurInfoRecdPrcgCndnValidityWrapper|error`

Sample code:

```ballerina
inforecdprc:CollectionOfA_PurInfoRecdPrcgCndnValidityWrapper validities = check infoRecProcessClient->listPurInfoRecdPrcgCndnValiditiesOfA_PurInfoRecdSuplmntPrcgCndn(
    "0000012345",
    "02"
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "ConditionRecord": "0000012345",
        "ConditionValidityStartDate": "/Date(1735689600000)/",
        "ConditionValidityEndDate": "/Date(253402214400000)/",
        "ConditionType": "PPR0",
        "PurchasingInfoRecord": "5300000123"
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>createPurInfoRecdPrcgCndnValidityOfA_PurInfoRecdSuplmntPrcgCndn</summary>

<div>

Creates a validity period for a supplementary pricing condition, through the `to_PurInfoRecdPrcgCndnValidity` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ConditionRecord` | `string` | Yes | Number of the condition record (up to 10 characters). |
| `ConditionSequentialNumber` | `string` | Yes | Sequential number of the condition (up to 2 characters). |
| `payload` | `CreateA_PurInfoRecdPrcgCndnValidity` | Yes | Condition validity. `ConditionRecord` and `ConditionValidityEndDate` are required fields of the record type. The condition itself can be supplied in the nested `to_PurInfoRecdPrcgCndn` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_PurInfoRecdPrcgCndnValidityWrapper|error`

Sample code:

```ballerina
inforecdprc:A_PurInfoRecdPrcgCndnValidityWrapper created = check infoRecProcessClient->createPurInfoRecdPrcgCndnValidityOfA_PurInfoRecdSuplmntPrcgCndn(
    "0000012345",
    "02",
    {
        ConditionRecord: "0000012345",
        ConditionValidityEndDate: "/Date(253402214400000)/",
        ConditionValidityStartDate: "/Date(1735689600000)/",
        ConditionType: "PPR0",
        PurchasingOrganization: "1710",
        PurchasingInfoRecordCategory: "0",
        PurchasingInfoRecord: "5300000123",
        Plant: "1710"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "ConditionRecord": "0000012345",
    "ConditionValidityEndDate": "/Date(253402214400000)/",
    "ConditionValidityStartDate": "/Date(1735689600000)/",
    "ConditionApplication": "M",
    "ConditionType": "PPR0",
    "PurchasingOrganization": "1710",
    "PurchasingInfoRecordCategory": "0",
    "PurchasingInfoRecord": "5300000123",
    "Supplier": "17300001",
    "Material": "TG11",
    "Plant": "1710"
  }
}
```

</div>

</details>

#### Supplementary conditions

<details>
<summary>listA_PurInfoRecdSuplmntPrcgCndns</summary>

<div>

Retrieves the supplementary pricing conditions (for example, discounts or surcharges) of purchasing info records.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_PurInfoRecdSuplmntPrcgCndnsQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`. |

Returns: `CollectionOfA_PurInfoRecdSuplmntPrcgCndnWrapper|error`

Sample code:

```ballerina
inforecdprc:CollectionOfA_PurInfoRecdSuplmntPrcgCndnWrapper conditions = check infoRecProcessClient->listA_PurInfoRecdSuplmntPrcgCndns(
    \$filter = "ConditionRecord eq '0000012345'",
    \$select = ["ConditionRecord", "ConditionSequentialNumber", "ConditionType", "ConditionRateValue"]
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "ConditionRecord": "0000012345",
        "ConditionSequentialNumber": "02",
        "ConditionType": "FRA1",
        "ConditionRateValue": "2.000"
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>createA_PurInfoRecdSuplmntPrcgCndn</summary>

<div>

Creates a supplementary pricing condition for a condition record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateA_PurInfoRecdSuplmntPrcgCndn` | Yes | Supplementary pricing condition. `ConditionRecord` and `ConditionSequentialNumber` are required. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_PurInfoRecdSuplmntPrcgCndnWrapper|error`

Sample code:

```ballerina
inforecdprc:A_PurInfoRecdSuplmntPrcgCndnWrapper created = check infoRecProcessClient->createA_PurInfoRecdSuplmntPrcgCndn({
    ConditionRecord: "0000012345",
    ConditionSequentialNumber: "02",
    ConditionType: "FRA1",
    ConditionRateValue: "2.000",
    ConditionRateValueUnit: "%"
});
```

Sample response:

```ballerina
{
  "d": {
    "ConditionRecord": "0000012345",
    "ConditionSequentialNumber": "02",
    "ConditionApplication": "M",
    "ConditionType": "FRA1",
    "ConditionRateValue": "2.000",
    "ConditionRateValueUnit": "%",
    "ConditionIsDeleted": false
  }
}
```

</div>

</details>

<details>
<summary>getA_PurInfoRecdSuplmntPrcgCndn</summary>

<div>

Retrieves a single supplementary pricing condition by condition record number and sequential number.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ConditionRecord` | `string` | Yes | Number of the condition record (up to 10 characters). |
| `ConditionSequentialNumber` | `string` | Yes | Sequential number of the condition (up to 2 characters). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_PurInfoRecdSuplmntPrcgCndnQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `A_PurInfoRecdSuplmntPrcgCndnWrapper|error`

Sample code:

```ballerina
inforecdprc:A_PurInfoRecdSuplmntPrcgCndnWrapper condition = check infoRecProcessClient->getA_PurInfoRecdSuplmntPrcgCndn(
    "0000012345",
    "02"
);
```

Sample response:

```ballerina
{
  "d": {
    "ConditionRecord": "0000012345",
    "ConditionSequentialNumber": "02",
    "ConditionApplication": "M",
    "ConditionType": "FRA1",
    "ConditionRateValue": "2.000",
    "ConditionRateValueUnit": "%",
    "ConditionIsDeleted": false
  }
}
```

</div>

</details>

<details>
<summary>patchA_PurInfoRecdSuplmntPrcgCndn</summary>

<div>

Updates a supplementary pricing condition using a PATCH request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ConditionRecord` | `string` | Yes | Number of the condition record (up to 10 characters). |
| `ConditionSequentialNumber` | `string` | Yes | Sequential number of the condition (up to 2 characters). |
| `payload` | `Modified\ A_PurInfoRecdSuplmntPrcgCndnType` | Yes | Wraps an `UpdateA_PurInfoRecdSuplmntPrcgCndn` record (the fields to change) in the `d` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check infoRecProcessClient->patchA_PurInfoRecdSuplmntPrcgCndn(
    "0000012345",
    "02",
    {d: {ConditionRateValue: "2.500"}},
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</div>

</details>

<details>
<summary>deleteA_PurInfoRecdSuplmntPrcgCndn</summary>

<div>

Deletes a supplementary pricing condition.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ConditionRecord` | `string` | Yes | Number of the condition record (up to 10 characters). |
| `ConditionSequentialNumber` | `string` | Yes | Sequential number of the condition (up to 2 characters). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check infoRecProcessClient->deleteA_PurInfoRecdSuplmntPrcgCndn(
    "0000012345",
    "02",
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</div>

</details>

<details>
<summary>listPurInfoRecdSuplmntPrcgCndnsOfA_PurInfoRecdPrcgCndn</summary>

<div>

Retrieves the supplementary pricing conditions of a pricing condition, through the `to_PurInfoRecdSuplmntPrcgCndn` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ConditionRecord` | `string` | Yes | Number of the condition record (up to 10 characters). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListPurInfoRecdSuplmntPrcgCndnsOfA_PurInfoRecdPrcgCndnQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`. |

Returns: `CollectionOfA_PurInfoRecdSuplmntPrcgCndnWrapper|error`

Sample code:

```ballerina
inforecdprc:CollectionOfA_PurInfoRecdSuplmntPrcgCndnWrapper conditions = check infoRecProcessClient->listPurInfoRecdSuplmntPrcgCndnsOfA_PurInfoRecdPrcgCndn(
    "0000012345"
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "ConditionRecord": "0000012345",
        "ConditionSequentialNumber": "02",
        "ConditionType": "FRA1",
        "ConditionRateValue": "2.000",
        "ConditionRateValueUnit": "%"
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>createPurInfoRecdSuplmntPrcgCndnOfA_PurInfoRecdPrcgCndn</summary>

<div>

Creates a supplementary pricing condition under a pricing condition, through the `to_PurInfoRecdSuplmntPrcgCndn` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ConditionRecord` | `string` | Yes | Number of the condition record (up to 10 characters). |
| `payload` | `CreateA_PurInfoRecdSuplmntPrcgCndn` | Yes | Supplementary pricing condition. `ConditionRecord` and `ConditionSequentialNumber` are required. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_PurInfoRecdSuplmntPrcgCndnWrapper|error`

Sample code:

```ballerina
inforecdprc:A_PurInfoRecdSuplmntPrcgCndnWrapper created = check infoRecProcessClient->createPurInfoRecdSuplmntPrcgCndnOfA_PurInfoRecdPrcgCndn(
    "0000012345",
    {
        ConditionRecord: "0000012345",
        ConditionSequentialNumber: "02",
        ConditionType: "FRA1",
        ConditionRateValue: "2.000",
        ConditionRateValueUnit: "%"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "ConditionRecord": "0000012345",
    "ConditionSequentialNumber": "02",
    "ConditionApplication": "M",
    "ConditionType": "FRA1",
    "ConditionRateValue": "2.000",
    "ConditionRateValueUnit": "%",
    "ConditionIsDeleted": false
  }
}
```

</div>

</details>

#### Condition scales

<details>
<summary>listA_PurInfoRecdPrcgCndnScales</summary>

<div>

Retrieves the scale lines of pricing conditions.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_PurInfoRecdPrcgCndnScalesQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$inlinecount`, `$select`. |

Returns: `CollectionOfA_PurInfoRecdPrcgCndnScaleWrapper|error`

Sample code:

```ballerina
inforecdprc:CollectionOfA_PurInfoRecdPrcgCndnScaleWrapper scales = check infoRecProcessClient->listA_PurInfoRecdPrcgCndnScales(
    \$filter = "ConditionRecord eq '0000012345'",
    \$select = ["ConditionRecord", "ConditionScaleLine", "ConditionScaleQuantity", "ConditionRateValue"]
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "ConditionRecord": "0000012345",
        "ConditionScaleLine": "0001",
        "ConditionScaleQuantity": "1",
        "ConditionRateValue": "12.50"
      },
      {
        "ConditionRecord": "0000012345",
        "ConditionScaleLine": "0002",
        "ConditionScaleQuantity": "100",
        "ConditionRateValue": "11.75"
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>createA_PurInfoRecdPrcgCndnScale</summary>

<div>

Creates a scale line for a pricing condition.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateA_PurInfoRecdPrcgCndnScale` | Yes | Condition scale line. `ConditionRecord`, `ConditionSequentialNumber` and `ConditionScaleLine` are required. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_PurInfoRecdPrcgCndnScaleWrapper|error`

Sample code:

```ballerina
inforecdprc:A_PurInfoRecdPrcgCndnScaleWrapper created = check infoRecProcessClient->createA_PurInfoRecdPrcgCndnScale({
    ConditionRecord: "0000012345",
    ConditionSequentialNumber: "01",
    ConditionScaleLine: "0002",
    ConditionScaleQuantity: "100",
    ConditionScaleQuantityUnit: "PC",
    ConditionRateValue: "11.75",
    ConditionRateValueUnit: "USD"
});
```

Sample response:

```ballerina
{
  "d": {
    "ConditionRecord": "0000012345",
    "ConditionSequentialNumber": "01",
    "ConditionScaleLine": "0002",
    "ConditionScaleQuantity": "100",
    "ConditionScaleQuantityUnit": "PC",
    "ConditionRateValue": "11.75",
    "ConditionRateValueUnit": "USD",
    "ConditionScaleIsDeleted": false
  }
}
```

</div>

</details>

<details>
<summary>getA_PurInfoRecdPrcgCndnScale</summary>

<div>

Retrieves a single condition scale line by condition record, sequential number and scale line.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ConditionRecord` | `string` | Yes | Number of the condition record (up to 10 characters). |
| `ConditionSequentialNumber` | `string` | Yes | Sequential number of the condition (up to 2 characters). |
| `ConditionScaleLine` | `string` | Yes | Current number of the scale line. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_PurInfoRecdPrcgCndnScaleQueries` | No | OData query parameters: `$select`. |

Returns: `A_PurInfoRecdPrcgCndnScaleWrapper|error`

Sample code:

```ballerina
inforecdprc:A_PurInfoRecdPrcgCndnScaleWrapper scale = check infoRecProcessClient->getA_PurInfoRecdPrcgCndnScale(
    "0000012345",
    "01",
    "0002"
);
```

Sample response:

```ballerina
{
  "d": {
    "ConditionRecord": "0000012345",
    "ConditionSequentialNumber": "01",
    "ConditionScaleLine": "0002",
    "ConditionScaleQuantity": "100",
    "ConditionScaleQuantityUnit": "PC",
    "ConditionRateValue": "11.75",
    "ConditionRateValueUnit": "USD",
    "ConditionScaleIsDeleted": false
  }
}
```

</div>

</details>

<details>
<summary>patchA_PurInfoRecdPrcgCndnScale</summary>

<div>

Updates a condition scale line using a PATCH request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ConditionRecord` | `string` | Yes | Number of the condition record (up to 10 characters). |
| `ConditionSequentialNumber` | `string` | Yes | Sequential number of the condition (up to 2 characters). |
| `ConditionScaleLine` | `string` | Yes | Current number of the scale line. |
| `payload` | `Modified\ A_PurInfoRecdPrcgCndnScaleType` | Yes | Wraps an `UpdateA_PurInfoRecdPrcgCndnScale` record (the fields to change) in the `d` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check infoRecProcessClient->patchA_PurInfoRecdPrcgCndnScale(
    "0000012345",
    "01",
    "0002",
    {d: {ConditionRateValue: "11.50"}},
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</div>

</details>

<details>
<summary>deleteA_PurInfoRecdPrcgCndnScale</summary>

<div>

Deletes a condition scale line.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ConditionRecord` | `string` | Yes | Number of the condition record (up to 10 characters). |
| `ConditionSequentialNumber` | `string` | Yes | Sequential number of the condition (up to 2 characters). |
| `ConditionScaleLine` | `string` | Yes | Current number of the scale line. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check infoRecProcessClient->deleteA_PurInfoRecdPrcgCndnScale(
    "0000012345",
    "01",
    "0002",
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</div>

</details>

<details>
<summary>listPurgInfoPricingCndnRecdScalesOfA_PurInfoRecdPrcgCndn</summary>

<div>

Retrieves the scale lines of a pricing condition, through the `to_PurgInfoPricingCndnRecdScale` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ConditionRecord` | `string` | Yes | Number of the condition record (up to 10 characters). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListPurgInfoPricingCndnRecdScalesOfA_PurInfoRecdPrcgCndnQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$inlinecount`, `$select`. |

Returns: `CollectionOfA_PurInfoRecdPrcgCndnScaleWrapper|error`

Sample code:

```ballerina
inforecdprc:CollectionOfA_PurInfoRecdPrcgCndnScaleWrapper scales = check infoRecProcessClient->listPurgInfoPricingCndnRecdScalesOfA_PurInfoRecdPrcgCndn(
    "0000012345"
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "ConditionRecord": "0000012345",
        "ConditionScaleLine": "0001",
        "ConditionScaleQuantity": "1",
        "ConditionRateValue": "12.50"
      },
      {
        "ConditionRecord": "0000012345",
        "ConditionScaleLine": "0002",
        "ConditionScaleQuantity": "100",
        "ConditionRateValue": "11.75"
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>createPurgInfoPricingCndnRecdScaleOfA_PurInfoRecdPrcgCndn</summary>

<div>

Creates a scale line under a pricing condition, through the `to_PurgInfoPricingCndnRecdScale` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ConditionRecord` | `string` | Yes | Number of the condition record (up to 10 characters). |
| `payload` | `CreateA_PurInfoRecdPrcgCndnScale` | Yes | Condition scale line. `ConditionRecord`, `ConditionSequentialNumber` and `ConditionScaleLine` are required. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_PurInfoRecdPrcgCndnScaleWrapper|error`

Sample code:

```ballerina
inforecdprc:A_PurInfoRecdPrcgCndnScaleWrapper created = check infoRecProcessClient->createPurgInfoPricingCndnRecdScaleOfA_PurInfoRecdPrcgCndn(
    "0000012345",
    {
        ConditionRecord: "0000012345",
        ConditionSequentialNumber: "01",
        ConditionScaleLine: "0002",
        ConditionScaleQuantity: "100",
        ConditionScaleQuantityUnit: "PC",
        ConditionRateValue: "11.75",
        ConditionRateValueUnit: "USD"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "ConditionRecord": "0000012345",
    "ConditionSequentialNumber": "01",
    "ConditionScaleLine": "0002",
    "ConditionScaleQuantity": "100",
    "ConditionScaleQuantityUnit": "PC",
    "ConditionRateValue": "11.75",
    "ConditionRateValueUnit": "USD",
    "ConditionScaleIsDeleted": false
  }
}
```

</div>

</details>

<details>
<summary>listPurgInfoPricingCndnRecdScalesOfA_PurInfoRecdSuplmntPrcgCndn</summary>

<div>

Retrieves the scale lines of a supplementary pricing condition, through the `to_PurgInfoPricingCndnRecdScale` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ConditionRecord` | `string` | Yes | Number of the condition record (up to 10 characters). |
| `ConditionSequentialNumber` | `string` | Yes | Sequential number of the condition (up to 2 characters). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListPurgInfoPricingCndnRecdScalesOfA_PurInfoRecdSuplmntPrcgCndnQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$inlinecount`, `$select`. |

Returns: `CollectionOfA_PurInfoRecdPrcgCndnScaleWrapper|error`

Sample code:

```ballerina
inforecdprc:CollectionOfA_PurInfoRecdPrcgCndnScaleWrapper scales = check infoRecProcessClient->listPurgInfoPricingCndnRecdScalesOfA_PurInfoRecdSuplmntPrcgCndn(
    "0000012345",
    "02"
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "ConditionRecord": "0000012345",
        "ConditionSequentialNumber": "02",
        "ConditionScaleLine": "0001",
        "ConditionScaleQuantity": "500",
        "ConditionRateValue": "1.500"
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>createPurgInfoPricingCndnRecdScaleOfA_PurInfoRecdSuplmntPrcgCndn</summary>

<div>

Creates a scale line under a supplementary pricing condition, through the `to_PurgInfoPricingCndnRecdScale` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ConditionRecord` | `string` | Yes | Number of the condition record (up to 10 characters). |
| `ConditionSequentialNumber` | `string` | Yes | Sequential number of the condition (up to 2 characters). |
| `payload` | `CreateA_PurInfoRecdPrcgCndnScale` | Yes | Condition scale line. `ConditionRecord`, `ConditionSequentialNumber` and `ConditionScaleLine` are required. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_PurInfoRecdPrcgCndnScaleWrapper|error`

Sample code:

```ballerina
inforecdprc:A_PurInfoRecdPrcgCndnScaleWrapper created = check infoRecProcessClient->createPurgInfoPricingCndnRecdScaleOfA_PurInfoRecdSuplmntPrcgCndn(
    "0000012345",
    "02",
    {
        ConditionRecord: "0000012345",
        ConditionSequentialNumber: "02",
        ConditionScaleLine: "0001",
        ConditionScaleQuantity: "500",
        ConditionScaleQuantityUnit: "PC",
        ConditionRateValue: "1.500"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "ConditionRecord": "0000012345",
    "ConditionSequentialNumber": "02",
    "ConditionScaleLine": "0001",
    "ConditionScaleQuantity": "500",
    "ConditionScaleQuantityUnit": "PC",
    "ConditionRateValue": "1.500",
    "ConditionScaleIsDeleted": false
  }
}
```

</div>

</details>

#### Navigation

<details>
<summary>getPurgInfoRecdOfA_PurgInfoRecdOrgPlantData</summary>

<div>

Retrieves the purchasing info record (general data) that an organization and plant data entry belongs to, through the `to_PurgInfoRecd` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `PurchasingInfoRecord` | `string` | Yes | Purchasing info record number (up to 10 characters). |
| `PurchasingInfoRecordCategory` | `string` | Yes | Purchasing info record category (`0` standard, `1` subcontracting, `2` pipeline, `3` consignment). |
| `PurchasingOrganization` | `string` | Yes | Purchasing organization (up to 4 characters). |
| `Plant` | `string` | Yes | Plant (up to 4 characters). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetPurgInfoRecdOfA_PurgInfoRecdOrgPlantDataQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `A_PurchasingInfoRecordWrapper|error`

Sample code:

```ballerina
inforecdprc:A_PurchasingInfoRecordWrapper infoRecord = check infoRecProcessClient->getPurgInfoRecdOfA_PurgInfoRecdOrgPlantData(
    "5300000123", "0", "1710", "1710"
);
```

Sample response:

```ballerina
{
  "d": {
    "PurchasingInfoRecord": "5300000123",
    "Supplier": "17300001",
    "Material": "TG11",
    "MaterialGroup": "L001",
    "PurchasingInfoRecordDesc": "Trading good 11",
    "PurgDocOrderQuantityUnit": "PC",
    "BaseUnit": "PC",
    "IsDeleted": false
  }
}
```

</div>

</details>

<details>
<summary>getPurgInfoRecdOfA_PurInfoRecdPrcgCndnValidity</summary>

<div>

Retrieves the purchasing info record (general data) that a condition validity belongs to, through the `to_PurgInfoRecd` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ConditionRecord` | `string` | Yes | Number of the condition record (up to 10 characters). |
| `ConditionValidityEndDate` | `string` | Yes | Validity end date of the condition record as a date-time value such as `9999-12-31T00:00:00`. The client wraps it in an OData `datetime'...'` literal. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetPurgInfoRecdOfA_PurInfoRecdPrcgCndnValidityQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `A_PurchasingInfoRecordWrapper|error`

Sample code:

```ballerina
inforecdprc:A_PurchasingInfoRecordWrapper infoRecord = check infoRecProcessClient->getPurgInfoRecdOfA_PurInfoRecdPrcgCndnValidity(
    "0000012345",
    "9999-12-31T00:00:00"
);
```

Sample response:

```ballerina
{
  "d": {
    "PurchasingInfoRecord": "5300000123",
    "Supplier": "17300001",
    "Material": "TG11",
    "MaterialGroup": "L001",
    "PurchasingInfoRecordDesc": "Trading good 11",
    "PurgDocOrderQuantityUnit": "PC",
    "BaseUnit": "PC",
    "IsDeleted": false
  }
}
```

</div>

</details>

<details>
<summary>getPurgInfoRecdOrgPlantDataOfA_PurInfoRecdPrcgCndnValidity</summary>

<div>

Retrieves the organization and plant data that a condition validity belongs to, through the `to_PurgInfoRecdOrgPlantData` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ConditionRecord` | `string` | Yes | Number of the condition record (up to 10 characters). |
| `ConditionValidityEndDate` | `string` | Yes | Validity end date of the condition record as a date-time value such as `9999-12-31T00:00:00`. The client wraps it in an OData `datetime'...'` literal. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetPurgInfoRecdOrgPlantDataOfA_PurInfoRecdPrcgCndnValidityQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `A_PurgInfoRecdOrgPlantDataWrapper|error`

Sample code:

```ballerina
inforecdprc:A_PurgInfoRecdOrgPlantDataWrapper orgData = check infoRecProcessClient->getPurgInfoRecdOrgPlantDataOfA_PurInfoRecdPrcgCndnValidity(
    "0000012345",
    "9999-12-31T00:00:00"
);
```

Sample response:

```ballerina
{
  "d": {
    "PurchasingInfoRecord": "5300000123",
    "PurchasingInfoRecordCategory": "0",
    "PurchasingOrganization": "1710",
    "Plant": "1710",
    "PurchasingGroup": "001",
    "Currency": "USD",
    "NetPriceAmount": "12.50",
    "MaterialPriceUnitQty": "1",
    "MaterialPlannedDeliveryDurn": "5",
    "StandardPurchaseOrderQuantity": "100"
  }
}
```

</div>

</details>

<details>
<summary>getPurInfoRecdPrcgCndnOfA_PurInfoRecdPrcgCndnValidity</summary>

<div>

Retrieves the pricing condition of a condition validity, through the `to_PurInfoRecdPrcgCndn` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ConditionRecord` | `string` | Yes | Number of the condition record (up to 10 characters). |
| `ConditionValidityEndDate` | `string` | Yes | Validity end date of the condition record as a date-time value such as `9999-12-31T00:00:00`. The client wraps it in an OData `datetime'...'` literal. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetPurInfoRecdPrcgCndnOfA_PurInfoRecdPrcgCndnValidityQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `A_PurInfoRecdPrcgCndnWrapper|error`

Sample code:

```ballerina
inforecdprc:A_PurInfoRecdPrcgCndnWrapper condition = check infoRecProcessClient->getPurInfoRecdPrcgCndnOfA_PurInfoRecdPrcgCndnValidity(
    "0000012345",
    "9999-12-31T00:00:00"
);
```

Sample response:

```ballerina
{
  "d": {
    "ConditionRecord": "0000012345",
    "ConditionSequentialNumber": "01",
    "ConditionApplication": "M",
    "ConditionType": "PPR0",
    "ConditionValidityStartDate": "/Date(1735689600000)/",
    "ConditionValidityEndDate": "/Date(253402214400000)/",
    "ConditionRateValue": "12.50",
    "ConditionRateValueUnit": "USD",
    "ConditionQuantity": "1",
    "ConditionQuantityUnit": "PC",
    "ConditionIsDeleted": false
  }
}
```

</div>

</details>

<details>
<summary>getPurInfoRecdPrcgCndnOfA_PurInfoRecdSuplmntPrcgCndn</summary>

<div>

Retrieves the main pricing condition that a supplementary condition belongs to, through the `to_PurInfoRecdPrcgCndn` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ConditionRecord` | `string` | Yes | Number of the condition record (up to 10 characters). |
| `ConditionSequentialNumber` | `string` | Yes | Sequential number of the condition (up to 2 characters). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetPurInfoRecdPrcgCndnOfA_PurInfoRecdSuplmntPrcgCndnQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `A_PurInfoRecdPrcgCndnWrapper|error`

Sample code:

```ballerina
inforecdprc:A_PurInfoRecdPrcgCndnWrapper condition = check infoRecProcessClient->getPurInfoRecdPrcgCndnOfA_PurInfoRecdSuplmntPrcgCndn(
    "0000012345",
    "02"
);
```

Sample response:

```ballerina
{
  "d": {
    "ConditionRecord": "0000012345",
    "ConditionSequentialNumber": "01",
    "ConditionApplication": "M",
    "ConditionType": "PPR0",
    "ConditionValidityStartDate": "/Date(1735689600000)/",
    "ConditionValidityEndDate": "/Date(253402214400000)/",
    "ConditionRateValue": "12.50",
    "ConditionRateValueUnit": "USD",
    "ConditionQuantity": "1",
    "ConditionQuantityUnit": "PC",
    "ConditionIsDeleted": false
  }
}
```

</div>

</details>
