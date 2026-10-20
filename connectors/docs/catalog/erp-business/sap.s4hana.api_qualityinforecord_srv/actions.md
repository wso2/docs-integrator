---
title: Actions
---

# Actions

The `ballerinax/sap.s4hana.api_qualityinforecord_srv` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Provides access to SAP S/4HANA quality info records in procurement and their first article inspections through the `API_QUALITYINFORECORD_SRV` OData V2 service. |

---

## Client

Provides access to SAP S/4HANA quality info records in procurement and their first article inspections through the `API_QUALITYINFORECORD_SRV` OData V2 service.

### Configuration

The client is initialized with a `ConnectionConfig` record, the API `hostname` (for example, `my123456-api.s4hana.cloud.sap`) and an optional `port` (default `443`). The client builds the service URL `https://<hostname>:<port>/sap/opu/odata/sap/API_QUALITYINFORECORD_SRV` from these values. The `ConnectionConfig` record has the following fields:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `http:BearerTokenConfig\|OAuth2RefreshTokenGrantConfig\|http:CredentialsConfig` | Required | Authentication configuration. Use `http:CredentialsConfig` (username and password of the communication user) for Basic Auth. |
| `httpVersion` | `http:HttpVersion` | `http:HTTP_2_0` | HTTP protocol version understood by the client. |
| `http1Settings` | `http:ClientHttp1Settings` | `{}` | Configurations related to the HTTP/1.x protocol. |
| `http2Settings` | `http:ClientHttp2Settings` | `{}` | Configurations related to the HTTP/2 protocol. |
| `timeout` | `decimal` | `60` | Maximum time (in seconds) to wait for a response before closing the connection. |
| `forwarded` | `string` | `"disable"` | Choice of setting the `forwarded`/`x-forwarded` header. |
| `followRedirects` | `http:FollowRedirects` | `()` | Configurations associated with redirection. |
| `poolConfig` | `http:PoolConfiguration` | `()` | Configurations associated with request pooling. |
| `cache` | `http:CacheConfig` | `{}` | HTTP caching related configurations. |
| `compression` | `http:Compression` | `http:COMPRESSION_AUTO` | How the `accept-encoding` header is handled. |
| `circuitBreaker` | `http:CircuitBreakerConfig` | `()` | Configurations associated with the circuit breaker. |
| `retryConfig` | `http:RetryConfig` | `()` | Configurations associated with retrying. |
| `cookieConfig` | `http:CookieConfig` | `()` | Configurations associated with cookies. |
| `responseLimits` | `http:ResponseLimitConfigs` | `{}` | Configurations associated with inbound response size limits. |
| `secureSocket` | `http:ClientSecureSocket` | `()` | SSL/TLS related options. |
| `proxy` | `http:ProxyConfig` | `()` | Proxy server related options. |
| `socketConfig` | `http:ClientSocketConfig` | `{}` | Client socket configuration. |
| `validation` | `boolean` | `true` | Enables inbound payload validation provided by the constraint package. |
| `laxDataBinding` | `boolean` | `true` | Enables relaxed data binding: `nil` values are treated as optional and absent fields as nilable. |

### Initializing the client

```ballerina
import ballerinax/sap.s4hana.api_qualityinforecord_srv as qltyinforecd;

configurable string hostname = ?;
configurable string username = ?;
configurable string password = ?;

qltyinforecd:Client qltyInfoRecClient = check new (
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

A quality info record (`QualityInProcurement`) is identified by the material number (`Material`, up to 18 characters) and the internal ID of the quality info record (`QltyInProcmtIntID`, up to 6 characters). A first article inspection (`QualityFirstArticleInspection`) adds the first article inspection number (`QltyInProcmt1stArticleInsp`, up to 6 characters) to that key.

The `patch` operations take a `Modified\ ...Type` record that wraps the matching `Update...` record in a `d` field, for example `{d: {BlockReason: "Open 8D report"}}`. In the query records, `$select`, `$expand` and `$orderby` take arrays of the allowed property names, and `$top` and `$skip` take integers. Date fields use the OData V2 format `/Date(<milliseconds since epoch>)/`.

#### Quality info records

<details>
<summary>listQualityInProcurements</summary>

Retrieves a collection of quality info records in procurement, with the supplier, plant, release, blocking, certification and PPAP data of each supplier and material combination.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListQualityInProcurementsQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfQualityInProcurementWrapper|error`

Sample code:

```ballerina
qltyinforecd:CollectionOfQualityInProcurementWrapper result = check qltyInfoRecClient->listQualityInProcurements(
    queries = {
        \$filter: "Supplier eq '17300001' and Plant eq '1710'",
        \$select: ["Material", "QltyInProcmtIntID", "Supplier", "Plant", "QltyInProcmtReleaseValidTo", "ReleasedQuantity", "BaseUnit", "ProcurementBlock"],
        \$top: 2
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "Material": "TG11",
        "QltyInProcmtIntID": "000001",
        "Supplier": "17300001",
        "Plant": "1710",
        "QltyInProcmtReleaseValidTo": "/Date(1798675200000)/",
        "ReleasedQuantity": "1000",
        "BaseUnit": "PC",
        "ProcurementBlock": ""
      },
      {
        "Material": "TG12",
        "QltyInProcmtIntID": "000002",
        "Supplier": "17300001",
        "Plant": "1710",
        "QltyInProcmtReleaseValidTo": "/Date(1798675200000)/",
        "ReleasedQuantity": "500",
        "BaseUnit": "KG",
        "ProcurementBlock": "01"
      }
    ]
  }
}
```

</details>

<details>
<summary>createQualityInProcurement</summary>

Creates a quality info record for a supplier, material and plant combination. First article inspections can be created in the same request through the nested `to_QltyFirstArticleInsp` field.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateQualityInProcurement` | Yes | Quality info record data. `Material` and `QltyInProcmtIntID` are required fields of the record type; the sample passes an empty `QltyInProcmtIntID` and reads the internal ID from the response. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `QualityInProcurementWrapper|error`

Sample code:

```ballerina
qltyinforecd:QualityInProcurementWrapper created = check qltyInfoRecClient->createQualityInProcurement({
    Material: "TG11",
    QltyInProcmtIntID: "",
    Supplier: "17300001",
    Plant: "1710",
    QltyInProcmtReleaseValidTo: "/Date(1798675200000)/",
    ReleasedQuantity: "1000",
    BaseUnit: "PC",
    QltyInProcmtRelQtyIsActive: "X"
});
```

Sample response:

```ballerina
{
  "d": {
    "Material": "TG11",
    "QltyInProcmtIntID": "000001",
    "Supplier": "17300001",
    "Plant": "1710",
    "MaterialRevisionLevel": "",
    "QltyInProcmtReleaseValidTo": "/Date(1798675200000)/",
    "BaseUnit": "PC",
    "ReleasedQuantity": "1000",
    "BlockReason": "",
    "ProcurementBlock": "",
    "QltyInProcmtRelQtyIsActive": "X",
    "IsDeleted": ""
  }
}
```

</details>

<details>
<summary>getQualityInProcurement</summary>

Retrieves a single quality info record by material and internal ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Material` | `string` | Yes | Material number (up to 18 characters), for example `TG11`. |
| `QltyInProcmtIntID` | `string` | Yes | Internal ID of the quality info record in procurement (up to 6 characters), for example `000001`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetQualityInProcurementQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `QualityInProcurementWrapper|error`

Sample code:

```ballerina
qltyinforecd:QualityInProcurementWrapper infoRecord = check qltyInfoRecClient->getQualityInProcurement(
    "TG11",
    "000001"
);
```

Sample response:

```ballerina
{
  "d": {
    "Material": "TG11",
    "QltyInProcmtIntID": "000001",
    "Supplier": "17300001",
    "Plant": "1710",
    "MaterialRevisionLevel": "",
    "QltyInProcmtReleaseValidTo": "/Date(1798675200000)/",
    "BaseUnit": "PC",
    "ReleasedQuantity": "1000",
    "BlockReason": "",
    "ProcurementBlock": "",
    "QltyInProcmtRelQtyIsActive": "X",
    "QltyInProcmtInspControl": "",
    "ProdnPieceApprovalIsRequired": "X",
    "ProductionPieceApproval": "PPAP-0042",
    "ProductionPieceApprovalLevel": "03",
    "ProductionPieceApprovalStatus": "01",
    "IsDeleted": "",
    "QualityManagementSystem": "0001",
    "QltyInProcmtCertfnValidTo": "/Date(1830211200000)/",
    "InspectionLotType": "",
    "QltyInProcmtLotCrtnLeadTime": 0,
    "QltyInProcmtCertificateCtrl": "",
    "QltyInProcmtLongText": ""
  }
}
```

</details>

<details>
<summary>patchQualityInProcurement</summary>

Updates a quality info record using a PATCH request, for example to block procurement or extend the release.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Material` | `string` | Yes | Material number (up to 18 characters). |
| `QltyInProcmtIntID` | `string` | Yes | Internal ID of the quality info record in procurement (up to 6 characters). |
| `payload` | `Modified\ QualityInProcurementType` | Yes | Wraps an `UpdateQualityInProcurement` record (the fields to change) in the `d` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check qltyInfoRecClient->patchQualityInProcurement(
    "TG11",
    "000001",
    {d: {ProcurementBlock: "01", BlockReason: "Open 8D report"}},
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</details>

<details>
<summary>deleteQualityInProcurement</summary>

Deletes a quality info record by material and internal ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Material` | `string` | Yes | Material number (up to 18 characters). |
| `QltyInProcmtIntID` | `string` | Yes | Internal ID of the quality info record in procurement (up to 6 characters). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check qltyInfoRecClient->deleteQualityInProcurement(
    "TG11",
    "000001",
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</details>

<details>
<summary>listQltyFirstArticleInspsOfQualityInProcurement</summary>

Retrieves the first article inspections of a specific quality info record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Material` | `string` | Yes | Material number (up to 18 characters). |
| `QltyInProcmtIntID` | `string` | Yes | Internal ID of the quality info record in procurement (up to 6 characters). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListQltyFirstArticleInspsOfQualityInProcurementQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfQualityFirstArticleInspectionWrapper|error`

Sample code:

```ballerina
qltyinforecd:CollectionOfQualityFirstArticleInspectionWrapper inspections = check qltyInfoRecClient->listQltyFirstArticleInspsOfQualityInProcurement(
    "TG11",
    "000001",
    queries = {
        \$orderby: ["QltyInProcmt1stArticleInsp"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "Material": "TG11",
        "QltyInProcmtIntID": "000001",
        "QltyInProcmt1stArticleInsp": "000001",
        "PurchaseOrder": "4500000123",
        "PurchaseOrderItem": "00010",
        "InspLotUsageDecisionValuation": "A"
      }
    ]
  }
}
```

</details>

<details>
<summary>createQltyFirstArticleInspOfQualityInProcurement</summary>

Creates a first article inspection under a specific quality info record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Material` | `string` | Yes | Material number (up to 18 characters). |
| `QltyInProcmtIntID` | `string` | Yes | Internal ID of the quality info record in procurement (up to 6 characters). |
| `payload` | `CreateQualityFirstArticleInspection` | Yes | First article inspection data. `Material`, `QltyInProcmtIntID` and `QltyInProcmt1stArticleInsp` are required fields of the record type; the sample repeats the parent key and passes an empty inspection number. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `QualityFirstArticleInspectionWrapper|error`

Sample code:

```ballerina
qltyinforecd:QualityFirstArticleInspectionWrapper inspection = check qltyInfoRecClient->createQltyFirstArticleInspOfQualityInProcurement(
    "TG11",
    "000001",
    {
        Material: "TG11",
        QltyInProcmtIntID: "000001",
        QltyInProcmt1stArticleInsp: "",
        PurchaseOrder: "4500000123",
        PurchaseOrderItem: "00010"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "Material": "TG11",
    "QltyInProcmtIntID": "000001",
    "QltyInProcmt1stArticleInsp": "000001",
    "PurchaseOrder": "4500000123",
    "PurchaseOrderItem": "00010",
    "InspLotUsageDecisionValuation": ""
  }
}
```

</details>

#### First article inspections

<details>
<summary>listQualityFirstArticleInspections</summary>

Retrieves a collection of first article inspections across all quality info records, with the purchase order item each inspection belongs to and the valuation of the inspection lot usage decision.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListQualityFirstArticleInspectionsQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfQualityFirstArticleInspectionWrapper|error`

Sample code:

```ballerina
qltyinforecd:CollectionOfQualityFirstArticleInspectionWrapper result = check qltyInfoRecClient->listQualityFirstArticleInspections(
    queries = {
        \$filter: "PurchaseOrder eq '4500000123'",
        \$inlinecount: "allpages"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "__count": "2",
    "results": [
      {
        "Material": "TG11",
        "QltyInProcmtIntID": "000001",
        "QltyInProcmt1stArticleInsp": "000001",
        "PurchaseOrder": "4500000123",
        "PurchaseOrderItem": "00010",
        "InspLotUsageDecisionValuation": "A"
      },
      {
        "Material": "TG12",
        "QltyInProcmtIntID": "000002",
        "QltyInProcmt1stArticleInsp": "000001",
        "PurchaseOrder": "4500000123",
        "PurchaseOrderItem": "00020",
        "InspLotUsageDecisionValuation": "R"
      }
    ]
  }
}
```

</details>

<details>
<summary>createQualityFirstArticleInspection</summary>

Creates a first article inspection for an existing quality info record identified by the key fields in the payload.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateQualityFirstArticleInspection` | Yes | First article inspection data. `Material`, `QltyInProcmtIntID` and `QltyInProcmt1stArticleInsp` are required fields of the record type; the sample passes an empty inspection number. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `QualityFirstArticleInspectionWrapper|error`

Sample code:

```ballerina
qltyinforecd:QualityFirstArticleInspectionWrapper inspection = check qltyInfoRecClient->createQualityFirstArticleInspection({
    Material: "TG12",
    QltyInProcmtIntID: "000002",
    QltyInProcmt1stArticleInsp: "",
    PurchaseOrder: "4500000123",
    PurchaseOrderItem: "00020"
});
```

Sample response:

```ballerina
{
  "d": {
    "Material": "TG12",
    "QltyInProcmtIntID": "000002",
    "QltyInProcmt1stArticleInsp": "000001",
    "PurchaseOrder": "4500000123",
    "PurchaseOrderItem": "00020",
    "InspLotUsageDecisionValuation": ""
  }
}
```

</details>

<details>
<summary>getQualityFirstArticleInspection</summary>

Retrieves a single first article inspection by its full key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Material` | `string` | Yes | Material number (up to 18 characters). |
| `QltyInProcmtIntID` | `string` | Yes | Internal ID of the quality info record in procurement (up to 6 characters). |
| `QltyInProcmt1stArticleInsp` | `string` | Yes | First article inspection number in the quality info record (up to 6 characters). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetQualityFirstArticleInspectionQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `QualityFirstArticleInspectionWrapper|error`

Sample code:

```ballerina
qltyinforecd:QualityFirstArticleInspectionWrapper inspection = check qltyInfoRecClient->getQualityFirstArticleInspection(
    "TG11",
    "000001",
    "000001"
);
```

Sample response:

```ballerina
{
  "d": {
    "Material": "TG11",
    "QltyInProcmtIntID": "000001",
    "QltyInProcmt1stArticleInsp": "000001",
    "PurchaseOrder": "4500000123",
    "PurchaseOrderItem": "00010",
    "InspLotUsageDecisionValuation": "A"
  }
}
```

</details>

<details>
<summary>patchQualityFirstArticleInspection</summary>

Updates a first article inspection using a PATCH request, for example to change the purchase order item it refers to.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Material` | `string` | Yes | Material number (up to 18 characters). |
| `QltyInProcmtIntID` | `string` | Yes | Internal ID of the quality info record in procurement (up to 6 characters). |
| `QltyInProcmt1stArticleInsp` | `string` | Yes | First article inspection number in the quality info record (up to 6 characters). |
| `payload` | `Modified\ QualityFirstArticleInspectionType` | Yes | Wraps an `UpdateQualityFirstArticleInspection` record (`PurchaseOrder`, `PurchaseOrderItem`, `InspLotUsageDecisionValuation`) in the `d` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check qltyInfoRecClient->patchQualityFirstArticleInspection(
    "TG11",
    "000001",
    "000001",
    {d: {PurchaseOrder: "4500000124", PurchaseOrderItem: "00010"}},
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</details>

<details>
<summary>deleteQualityFirstArticleInspection</summary>

Deletes a first article inspection by its full key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Material` | `string` | Yes | Material number (up to 18 characters). |
| `QltyInProcmtIntID` | `string` | Yes | Internal ID of the quality info record in procurement (up to 6 characters). |
| `QltyInProcmt1stArticleInsp` | `string` | Yes | First article inspection number in the quality info record (up to 6 characters). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check qltyInfoRecClient->deleteQualityFirstArticleInspection(
    "TG11",
    "000001",
    "000001",
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</details>

<details>
<summary>getQltyInProcurementOfQualityFirstArticleInspection</summary>

Retrieves the quality info record that a specific first article inspection belongs to.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Material` | `string` | Yes | Material number (up to 18 characters). |
| `QltyInProcmtIntID` | `string` | Yes | Internal ID of the quality info record in procurement (up to 6 characters). |
| `QltyInProcmt1stArticleInsp` | `string` | Yes | First article inspection number in the quality info record (up to 6 characters). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetQltyInProcurementOfQualityFirstArticleInspectionQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `QualityInProcurementWrapper|error`

Sample code:

```ballerina
qltyinforecd:QualityInProcurementWrapper infoRecord = check qltyInfoRecClient->getQltyInProcurementOfQualityFirstArticleInspection(
    "TG11",
    "000001",
    "000001",
    queries = {
        \$select: ["Material", "QltyInProcmtIntID", "Supplier", "Plant", "ProductionPieceApprovalStatus"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "Material": "TG11",
    "QltyInProcmtIntID": "000001",
    "Supplier": "17300001",
    "Plant": "1710",
    "ProductionPieceApprovalStatus": "01"
  }
}
```

</details>

#### Batch operations

<details>
<summary>performBatchOperation</summary>

Sends multiple OData requests as a single HTTP `$batch` call, reducing round trips to the SAP server.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `request` | `http:Request` | Yes | An `http:Request` object containing the `multipart/mixed` batch payload with individual OData request parts. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Request batchRequest = new;
string boundary = "batch_qir001";
batchRequest.setHeader("Content-Type", "multipart/mixed; boundary=" + boundary);
batchRequest.setTextPayload(
    "--" + boundary + "\r\n" +
    "Content-Type: application/http\r\n" +
    "Content-Transfer-Encoding: binary\r\n\r\n" +
    "GET QualityInProcurement(Material='TG11',QltyInProcmtIntID='000001') HTTP/1.1\r\n" +
    "Accept: application/json\r\n\r\n" +
    "--" + boundary + "\r\n" +
    "Content-Type: application/http\r\n" +
    "Content-Transfer-Encoding: binary\r\n\r\n" +
    "GET QualityInProcurement(Material='TG11',QltyInProcmtIntID='000001')/to_QltyFirstArticleInsp HTTP/1.1\r\n" +
    "Accept: application/json\r\n\r\n" +
    "--" + boundary + "--"
);
http:Response batchResponse = check qltyInfoRecClient->performBatchOperation(batchRequest);
```

Returns the raw `http:Response` from the `$batch` endpoint. On success the status code is `202 Accepted` and the body is a `multipart/mixed` payload containing one part per request in the batch, each with its own HTTP status line, headers and JSON body. Read it with `batchResponse.getTextPayload()` and parse each part as needed.

</details>
