---
title: Actions
---

# Actions

The `ballerinax/sap.s4hana.ce_apireservationdocument_0001` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Provides create, read, update and delete access to SAP S/4HANA Cloud reservation documents and their items via the OData V4 Reservation Document (A2X) API. |

---

## Client

Provides create, read, update and delete access to SAP S/4HANA Cloud reservation documents and their items via the OData V4 Reservation Document (A2X) API.

### Configuration

The client is initialized with a `ConnectionConfig` record, the SAP S/4HANA Cloud `hostname` and an optional `port` (default `443`). The service URL is built as `https://<hostname>:<port>/sap/opu/odata4/sap/api_reservation_document/srvd_a2x/sap/apireservationdocument/0001`.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `http:BearerTokenConfig\|OAuth2RefreshTokenGrantConfig\|http:CredentialsConfig` | Required | Authentication settings. Use `http:CredentialsConfig` (username and password of the communication user) for Basic Auth. |
| `httpVersion` | `http:HttpVersion` | `http:HTTP_2_0` | HTTP protocol version used for outbound requests. |
| `http1Settings` | `http:ClientHttp1Settings` | `{}` | HTTP/1.x protocol settings. |
| `http2Settings` | `http:ClientHttp2Settings` | `{}` | HTTP/2 protocol settings. |
| `timeout` | `decimal` | `60` | Maximum time (in seconds) to wait for a response before closing the connection. |
| `forwarded` | `string` | `"disable"` | Setting for the `forwarded`/`x-forwarded` header. |
| `followRedirects` | `http:FollowRedirects` | `()` | Redirection settings. |
| `poolConfig` | `http:PoolConfiguration` | `()` | Connection pooling settings. |
| `cache` | `http:CacheConfig` | `{}` | HTTP caching settings. |
| `compression` | `http:Compression` | `http:COMPRESSION_AUTO` | Handling of the `accept-encoding` header. |
| `circuitBreaker` | `http:CircuitBreakerConfig` | `()` | Circuit breaker settings. |
| `retryConfig` | `http:RetryConfig` | `()` | Retry settings. |
| `cookieConfig` | `http:CookieConfig` | `()` | Cookie settings. |
| `responseLimits` | `http:ResponseLimitConfigs` | `{}` | Inbound response size limits. |
| `secureSocket` | `http:ClientSecureSocket` | `()` | SSL/TLS settings. |
| `proxy` | `http:ProxyConfig` | `()` | Proxy server settings. |
| `socketConfig` | `http:ClientSocketConfig` | `{}` | Client socket settings. |
| `validation` | `boolean` | `true` | Enables inbound payload validation using the constraint package. |
| `laxDataBinding` | `boolean` | `true` | Enables relaxed data binding, treating `nil` values as optional and absent fields as nilable. |

### Initializing the client

```ballerina
import ballerinax/sap.s4hana.ce_apireservationdocument_0001 as ceRsvDoc;

configurable string hostname = ?;
configurable string username = ?;
configurable string password = ?;

ceRsvDoc:Client ceReservationDocumentClient = check new (
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

#### Reservation document header

<details>
<summary>listReservationDocuments</summary>

Retrieves a collection of reservation document headers, supporting OData V4 query options for filtering, sorting, paging and field selection.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListReservationDocumentsQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$count`. |

Returns: `CollectionOfA_ReservationDocumentHeader_2|error`

Sample code:

```ballerina
ceRsvDoc:CollectionOfA_ReservationDocumentHeader_2 reservations = check ceReservationDocumentClient->listReservationDocuments(
    queries = {
        \$filter: "GoodsMovementType eq '201'",
        \$select: ["Reservation", "GoodsMovementType", "CostCenter", "ReservationDate"],
        \$orderby: ["ReservationDate desc"],
        \$top: 2
    }
);
```

Sample response:

```ballerina
{
  "@odata.context": "$metadata#ReservationDocument(Reservation,GoodsMovementType,CostCenter,ReservationDate)",
  "value": [
    {
      "Reservation": "0000012456",
      "GoodsMovementType": "201",
      "CostCenter": "0017101101",
      "ReservationDate": "2026-10-14"
    },
    {
      "Reservation": "0000012450",
      "GoodsMovementType": "201",
      "CostCenter": "0017101302",
      "ReservationDate": "2026-10-09"
    }
  ]
}
```

</details>

<details>
<summary>createReservationDocument</summary>

Creates a new reservation document. Items can be created in the same request by passing them in `_ReservationDocumentItem` (deep insert). For internal number assignment, pass an empty string as `Reservation`.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateA_ReservationDocumentHeader_2` | Yes | Reservation header fields such as movement type, account assignment (cost center, sales order, asset, WBS element or order), base date and optional items. `Reservation` and `ReservationDate` are mandatory fields of the record. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_ReservationDocumentHeader_2|error`

Sample code:

```ballerina
ceRsvDoc:A_ReservationDocumentHeader_2 created = check ceReservationDocumentClient->createReservationDocument({
    Reservation: "",
    GoodsMovementType: "201",
    CostCenter: "0017101101",
    ReservationDate: "2026-10-20",
    _ReservationDocumentItem: [
        {
            Product: "TG11",
            Plant: "1710",
            StorageLocation: "171A",
            ResvnItmRequiredQtyInEntryUnit: 5,
            EntryUnit: "PC"
        }
    ]
});
```

Sample response:

```ballerina
{
  "@odata.context": "$metadata#ReservationDocument/$entity",
  "Reservation": "0000012460",
  "GoodsMovementType": "201",
  "CostCenter": "0017101101",
  "ReservationDate": "2026-10-20",
  "IsCheckedAgainstFactoryCal": false,
  "ControllingArea": "A000",
  "UserID": "CB9980000123",
  "CreationDateTime": "2026-10-15T08:42:11Z",
  "ResvnVerificationCompanyCode": "1710"
}
```

</details>

<details>
<summary>getReservationDocument</summary>

Retrieves a single reservation document header by its reservation number.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Reservation` | `string` | Yes | The reservation number (e.g., `"0000012460"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetReservationDocumentQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_ReservationDocumentHeader_2|error`

Sample code:

```ballerina
ceRsvDoc:A_ReservationDocumentHeader_2 reservation = check ceReservationDocumentClient->getReservationDocument(
    "0000012460",
    queries = {
        \$expand: ["_ReservationDocumentItem"]
    }
);
```

Sample response:

```ballerina
{
  "@odata.context": "$metadata#ReservationDocument(_ReservationDocumentItem())/$entity",
  "Reservation": "0000012460",
  "GoodsMovementType": "201",
  "CostCenter": "0017101101",
  "IssuingOrReceivingPlant": "",
  "SalesOrder": "",
  "ReservationDate": "2026-10-20",
  "IsCheckedAgainstFactoryCal": false,
  "ControllingArea": "A000",
  "OrderID": "",
  "UserID": "CB9980000123",
  "CreationDateTime": "2026-10-15T08:42:11Z",
  "LastChangedByUser": "",
  "ResvnVerificationCompanyCode": "1710",
  "_ReservationDocumentItem": [
    {
      "Reservation": "0000012460",
      "ReservationItem": "0001",
      "RecordType": "",
      "Product": "TG11",
      "Plant": "1710",
      "StorageLocation": "171A",
      "BaseUnit": "PC",
      "EntryUnit": "PC",
      "ResvnItmRequiredQtyInBaseUnit": 5,
      "ResvnItmRequiredQtyInEntryUnit": 5,
      "ResvnItmWithdrawnQtyInBaseUnit": 0,
      "GoodsMovementIsAllowed": true,
      "ReservationItemIsFinallyIssued": false
    }
  ]
}
```

</details>

<details>
<summary>patchReservationDocument</summary>

Updates the changeable header fields of an existing reservation document using a PATCH request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Reservation` | `string` | Yes | The reservation number to update. |
| `payload` | `UpdateA_ReservationDocumentHeader_2` | Yes | Header fields to update, such as `CostCenter`, `ReservationDate` or `IsCheckedAgainstFactoryCal`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the ETag value to enable optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response patchResp = check ceReservationDocumentClient->patchReservationDocument(
    "0000012460",
    {
        ReservationDate: "2026-10-27"
    },
    headers = {"If-Match": "*"}
);
```

Sample response:

The operation returns an `http:Response`. On success, SAP responds with status `204 No Content` and an empty body; check `patchResp.statusCode` to confirm the update.

</details>

<details>
<summary>deleteReservationDocument</summary>

Deletes a reservation document and its items by reservation number.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Reservation` | `string` | Yes | The reservation number to delete. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the ETag value. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response deleteResp = check ceReservationDocumentClient->deleteReservationDocument(
    "0000012460",
    headers = {"If-Match": "*"}
);
```

Sample response:

The operation returns an `http:Response`. On success, SAP responds with status `204 No Content` and an empty body; check `deleteResp.statusCode` to confirm the deletion.

</details>

<details>
<summary>getReservationDocumentOfReservationDocumentItem</summary>

Retrieves the reservation document header that a given reservation item belongs to, navigating from the item to its header.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Reservation` | `string` | Yes | The reservation number. |
| `ReservationItem` | `string` | Yes | The reservation item number (e.g., `"0001"`). |
| `RecordType` | `string` | Yes | The record type of the item. Use an empty string for reservations. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetReservationDocumentOfReservationDocumentItemQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_ReservationDocumentHeader_2|error`

Sample code:

```ballerina
ceRsvDoc:A_ReservationDocumentHeader_2 header = check ceReservationDocumentClient->getReservationDocumentOfReservationDocumentItem(
    "0000012460",
    "0001",
    "",
    queries = {
        \$select: ["Reservation", "GoodsMovementType", "CostCenter", "ReservationDate"]
    }
);
```

Sample response:

```ballerina
{
  "@odata.context": "../$metadata#ReservationDocument(Reservation,GoodsMovementType,CostCenter,ReservationDate)/$entity",
  "Reservation": "0000012460",
  "GoodsMovementType": "201",
  "CostCenter": "0017101101",
  "ReservationDate": "2026-10-20"
}
```

</details>

#### Reservation document items

<details>
<summary>listReservationDocumentItems</summary>

Retrieves reservation items across all reservation documents, with optional OData V4 filtering, sorting and paging.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListReservationDocumentItemsQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$count`. |

Returns: `CollectionOfA_ReservationDocumentItem_2|error`

Sample code:

```ballerina
ceRsvDoc:CollectionOfA_ReservationDocumentItem_2 items = check ceReservationDocumentClient->listReservationDocumentItems(
    queries = {
        \$filter: "Plant eq '1710' and Product eq 'TG11'",
        \$select: ["Reservation", "ReservationItem", "Product", "Plant", "ResvnItmRequiredQtyInBaseUnit", "BaseUnit"],
        \$count: true,
        \$top: 2
    }
);
```

Sample response:

```ballerina
{
  "@odata.context": "$metadata#ReservationDocumentItem(Reservation,ReservationItem,Product,Plant,ResvnItmRequiredQtyInBaseUnit,BaseUnit)",
  "@odata.count": 14,
  "value": [
    {
      "Reservation": "0000012456",
      "ReservationItem": "0001",
      "Product": "TG11",
      "Plant": "1710",
      "ResvnItmRequiredQtyInBaseUnit": 10,
      "BaseUnit": "PC"
    },
    {
      "Reservation": "0000012460",
      "ReservationItem": "0001",
      "Product": "TG11",
      "Plant": "1710",
      "ResvnItmRequiredQtyInBaseUnit": 5,
      "BaseUnit": "PC"
    }
  ]
}
```

</details>

<details>
<summary>listReservationDocumentItemsOfReservationDocument</summary>

Retrieves the items of a specific reservation document.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Reservation` | `string` | Yes | The reservation number whose items to retrieve. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListReservationDocumentItemsOfReservationDocumentQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$count`. |

Returns: `CollectionOfA_ReservationDocumentItem_2|error`

Sample code:

```ballerina
ceRsvDoc:CollectionOfA_ReservationDocumentItem_2 rsvItems = check ceReservationDocumentClient->listReservationDocumentItemsOfReservationDocument(
    "0000012460",
    queries = {
        \$orderby: ["ReservationItem"]
    }
);
```

Sample response:

```ballerina
{
  "@odata.context": "../$metadata#ReservationDocumentItem",
  "value": [
    {
      "Reservation": "0000012460",
      "ReservationItem": "0001",
      "RecordType": "",
      "Product": "TG11",
      "RequirementType": "",
      "MatlCompRequirementDate": "2026-10-20",
      "Plant": "1710",
      "GoodsMovementIsAllowed": true,
      "StorageLocation": "171A",
      "Batch": "",
      "DebitCreditCode": "H",
      "BaseUnit": "PC",
      "GLAccount": "0000400000",
      "GoodsMovementType": "201",
      "EntryUnit": "PC",
      "ResvnItmRequiredQtyInBaseUnit": 5,
      "ReservationItemIsFinallyIssued": false,
      "ReservationItmIsMarkedForDeltn": false,
      "ResvnItmRequiredQtyInEntryUnit": 5,
      "ResvnItmWithdrawnQtyInBaseUnit": 0,
      "ReservationItemText": "",
      "ConfdQtyForATPInBaseUoM": 5
    }
  ]
}
```

</details>

<details>
<summary>createReservationDocumentItemOfReservationDocument</summary>

Adds a new item to an existing reservation document.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Reservation` | `string` | Yes | The reservation number to add the item to. |
| `payload` | `CreateA_ReservationDocumentItem_2` | Yes | Item fields such as product, plant, storage location, requirement date and quantity in unit of entry. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_ReservationDocumentItem_2|error`

Sample code:

```ballerina
ceRsvDoc:A_ReservationDocumentItem_2 newItem = check ceReservationDocumentClient->createReservationDocumentItemOfReservationDocument(
    "0000012460",
    {
        Product: "TG12",
        Plant: "1710",
        StorageLocation: "171A",
        MatlCompRequirementDate: "2026-10-22",
        ResvnItmRequiredQtyInEntryUnit: 2,
        EntryUnit: "PC"
    }
);
```

Sample response:

```ballerina
{
  "@odata.context": "../$metadata#ReservationDocumentItem/$entity",
  "Reservation": "0000012460",
  "ReservationItem": "0002",
  "RecordType": "",
  "Product": "TG12",
  "MatlCompRequirementDate": "2026-10-22",
  "Plant": "1710",
  "StorageLocation": "171A",
  "BaseUnit": "PC",
  "EntryUnit": "PC",
  "ResvnItmRequiredQtyInBaseUnit": 2,
  "ResvnItmRequiredQtyInEntryUnit": 2,
  "ResvnItmWithdrawnQtyInBaseUnit": 0,
  "GoodsMovementIsAllowed": true
}
```

</details>

<details>
<summary>getReservationDocumentItem</summary>

Retrieves a single reservation item by its full key (reservation number, item number and record type).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Reservation` | `string` | Yes | The reservation number. |
| `ReservationItem` | `string` | Yes | The reservation item number (e.g., `"0001"`). |
| `RecordType` | `string` | Yes | The record type of the item. Use an empty string for reservations. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetReservationDocumentItemQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_ReservationDocumentItem_2|error`

Sample code:

```ballerina
ceRsvDoc:A_ReservationDocumentItem_2 item = check ceReservationDocumentClient->getReservationDocumentItem(
    "0000012460",
    "0001",
    "",
    queries = {
        \$select: ["Reservation", "ReservationItem", "Product", "Plant", "ResvnItmRequiredQtyInBaseUnit", "ResvnItmWithdrawnQtyInBaseUnit", "BaseUnit"]
    }
);
```

Sample response:

```ballerina
{
  "@odata.context": "$metadata#ReservationDocumentItem(Reservation,ReservationItem,Product,Plant,ResvnItmRequiredQtyInBaseUnit,ResvnItmWithdrawnQtyInBaseUnit,BaseUnit)/$entity",
  "Reservation": "0000012460",
  "ReservationItem": "0001",
  "Product": "TG11",
  "Plant": "1710",
  "ResvnItmRequiredQtyInBaseUnit": 5,
  "ResvnItmWithdrawnQtyInBaseUnit": 0,
  "BaseUnit": "PC"
}
```

</details>

<details>
<summary>patchReservationDocumentItem</summary>

Updates the changeable fields of an existing reservation item using a PATCH request, for example the required quantity, requirement date, storage location or the deletion and final issue indicators.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Reservation` | `string` | Yes | The reservation number. |
| `ReservationItem` | `string` | Yes | The reservation item number to update. |
| `RecordType` | `string` | Yes | The record type of the item. Use an empty string for reservations. |
| `payload` | `UpdateA_ReservationDocumentItem_2` | Yes | Item fields to update. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the ETag value to enable optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response itemResp = check ceReservationDocumentClient->patchReservationDocumentItem(
    "0000012460",
    "0001",
    "",
    {
        ResvnItmRequiredQtyInEntryUnit: 8,
        MatlCompRequirementDate: "2026-10-24"
    },
    headers = {"If-Match": "*"}
);
```

Sample response:

The operation returns an `http:Response`. On success, SAP responds with status `204 No Content` and an empty body; check `itemResp.statusCode` to confirm the update.

</details>

#### Batch operations

<details>
<summary>performBatchOperation</summary>

Sends a group of requests to the OData `$batch` endpoint in a single HTTP call. You build the `http:Request` yourself, including the multipart (or JSON batch) body and the matching `Content-Type` header.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `request` | `http:Request` | Yes | The batch request containing the individual operations. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Request batchReq = new;
string batchBody = string `--batch_1
Content-Type: application/http
Content-Transfer-Encoding: binary

GET ReservationDocument('0000012460') HTTP/1.1
Accept: application/json

--batch_1--`;
batchReq.setTextPayload(batchBody, "multipart/mixed; boundary=batch_1");

http:Response batchResp = check ceReservationDocumentClient->performBatchOperation(batchReq);
```

Sample response:

The operation returns an `http:Response`. On success, SAP responds with status `200 OK` and a `multipart/mixed` body containing one part per request in the batch, each with its own status line, headers and JSON payload. Read it with `batchResp.getTextPayload()` and parse the parts as needed.

</details>
