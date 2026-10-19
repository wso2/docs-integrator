---
title: Actions
---

# Actions

The `ballerinax/sap.s4hana.api_reservation_document_srv` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Creates, reads, and deletes SAP S/4HANA reservation documents and reads their items through the `API_RESERVATION_DOCUMENT_SRV` OData V2 API. |

---

## Client

Creates, reads, and deletes SAP S/4HANA reservation documents and reads their items through the `API_RESERVATION_DOCUMENT_SRV` OData V2 API. The API has no update operation.

### Configuration

The client is initialized with a `ConnectionConfig` record, the `hostname` of the SAP S/4HANA system, and an optional `port` (default `443`). The connector builds the service URL `https://<hostname>:<port>/sap/opu/odata/sap/API_RESERVATION_DOCUMENT_SRV` and passes the configuration to the underlying `ballerinax/sap` client.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `http:BearerTokenConfig\|OAuth2RefreshTokenGrantConfig\|http:CredentialsConfig` | Required | Authentication configuration. Use `http:CredentialsConfig` (username and password of the communication user) for Basic Auth. |
| `httpVersion` | `http:HttpVersion` | `http:HTTP_2_0` | HTTP protocol version used by the client. |
| `http1Settings` | `http:ClientHttp1Settings` | `{}` | HTTP/1.x protocol settings. |
| `http2Settings` | `http:ClientHttp2Settings` | `{}` | HTTP/2 protocol settings. |
| `timeout` | `decimal` | `60` | Maximum time in seconds to wait for a response before closing the connection. |
| `forwarded` | `string` | `"disable"` | Choice of setting the `forwarded`/`x-forwarded` header. |
| `followRedirects` | `http:FollowRedirects` | `()` | Redirection settings. |
| `poolConfig` | `http:PoolConfiguration` | `()` | Request pooling settings. |
| `cache` | `http:CacheConfig` | `{}` | HTTP caching settings. |
| `compression` | `http:Compression` | `http:COMPRESSION_AUTO` | Handling of the `accept-encoding` header. |
| `circuitBreaker` | `http:CircuitBreakerConfig` | `()` | Circuit breaker settings. |
| `retryConfig` | `http:RetryConfig` | `()` | Retry settings. |
| `cookieConfig` | `http:CookieConfig` | `()` | Cookie settings. |
| `responseLimits` | `http:ResponseLimitConfigs` | `{}` | Inbound response size limits. |
| `secureSocket` | `http:ClientSecureSocket` | `()` | SSL/TLS settings. |
| `proxy` | `http:ProxyConfig` | `()` | Proxy server settings. |
| `socketConfig` | `http:ClientSocketConfig` | `{}` | Client socket settings. |
| `validation` | `boolean` | `true` | Enables inbound payload validation through the constraint package. |
| `laxDataBinding` | `boolean` | `true` | Enables relaxed data binding, so `nil` values are treated as optional and absent fields as nilable. |

### Initializing the client

```ballerina
import ballerinax/sap.s4hana.api_reservation_document_srv as rsvDoc;

configurable string hostname = ?;
configurable string username = ?;
configurable string password = ?;

rsvDoc:Client reservationDocumentClient = check new (
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

#### Reservation document headers

<details>
<summary>listA_ReservationDocumentHeaders</summary>

Retrieves a collection of reservation document headers, supporting OData query options for filtering, sorting, paging, expansion, and field selection.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_ReservationDocumentHeadersQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_ReservationDocumentHeaderWrapper|error`

Sample code:

```ballerina
rsvDoc:CollectionOfA_ReservationDocumentHeaderWrapper result = check reservationDocumentClient->listA_ReservationDocumentHeaders(
    queries = {
        \$filter: "CostCenter eq '0017101101'",
        \$top: 2,
        \$select: ["Reservation", "GoodsMovementType", "CostCenter", "ReservationDate", "IssuingOrReceivingPlant"],
        \$orderby: ["Reservation desc"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "Reservation": "0000012346",
        "GoodsMovementType": "201",
        "CostCenter": "0017101101",
        "ReservationDate": "/Date(1760486400000)/",
        "IssuingOrReceivingPlant": ""
      },
      {
        "Reservation": "0000012345",
        "GoodsMovementType": "201",
        "CostCenter": "0017101101",
        "ReservationDate": "/Date(1760400000000)/",
        "IssuingOrReceivingPlant": ""
      }
    ]
  }
}
```

</details>

<details>
<summary>getA_ReservationDocumentHeader</summary>

Retrieves a single reservation document header by its reservation number, optionally expanding its items.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Reservation` | `string` | Yes | The reservation number (up to 10 characters, for example `"0000012345"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_ReservationDocumentHeaderQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_ReservationDocumentHeaderWrapper|error`

Sample code:

```ballerina
rsvDoc:A_ReservationDocumentHeaderWrapper reservation = check reservationDocumentClient->getA_ReservationDocumentHeader(
    "0000012345",
    queries = {
        \$expand: ["to_ReservationDocumentItem"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "Reservation": "0000012345",
    "OrderID": "",
    "GoodsMovementType": "201",
    "CostCenter": "0017101101",
    "GoodsRecipientName": "MAINT-TEAM",
    "ReservationDate": "/Date(1760400000000)/",
    "IsCheckedAgainstFactoryCal": false,
    "ControllingArea": "A000",
    "IssuingOrReceivingPlant": "",
    "IssuingOrReceivingStorageLoc": "",
    "to_ReservationDocumentItem": {
      "results": [
        {
          "Reservation": "0000012345",
          "ReservationItem": "0001",
          "RecordType": "",
          "Product": "TG11",
          "MatlCompRequirementDate": "/Date(1760400000000)/",
          "Plant": "1710",
          "StorageLocation": "171A",
          "DebitCreditCode": "H",
          "BaseUnit": "PC",
          "GoodsMovementType": "201",
          "ResvnItmRequiredQtyInBaseUnit": "10",
          "ResvnItmWithdrawnQtyInBaseUnit": "0",
          "ReservationItemIsFinallyIssued": false,
          "ReservationItmIsMarkedForDeltn": false
        }
      ]
    }
  }
}
```

</details>

<details>
<summary>createA_ReservationDocumentHeader</summary>

Creates a reservation document. Items can be created in the same request by passing them in `to_ReservationDocumentItem` (deep insert).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateA_ReservationDocumentHeader` | Yes | Reservation header fields such as movement type, cost center, reservation date and receiving plant, plus optional items in `to_ReservationDocumentItem`. The `Reservation` field is required by the record type. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_ReservationDocumentHeader_1|error`

Sample code:

```ballerina
rsvDoc:A_ReservationDocumentHeader_1 created = check reservationDocumentClient->createA_ReservationDocumentHeader({
    Reservation: "",
    GoodsMovementType: "201",
    CostCenter: "0017101101",
    to_ReservationDocumentItem: {
        results: [
            {
                Reservation: "",
                ReservationItem: "0001",
                RecordType: "",
                Product: "TG11",
                Plant: "1710",
                StorageLocation: "171A",
                ResvnItmRequiredQtyInEntryUnit: "10",
                EntryUnit: "PC"
            }
        ]
    }
});
```

Sample response:

```ballerina
{
  "d": {
    "Reservation": "0000012347",
    "GoodsMovementType": "201",
    "CostCenter": "0017101101",
    "ReservationDate": "/Date(1760486400000)/",
    "ControllingArea": "A000"
  }
}
```

</details>

<details>
<summary>deleteA_ReservationDocumentHeader</summary>

Deletes a reservation document by its reservation number.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Reservation` | `string` | Yes | The reservation number to delete. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response resp = check reservationDocumentClient->deleteA_ReservationDocumentHeader(
    "0000012347",
    headers = {"If-Match": "*"}
);
```

Sample response:

The operation returns an `http:Response`. A successful deletion has status code `204 No Content` and an empty body.

</details>

#### Reservation document items

<details>
<summary>listA_ReservationDocumentItems</summary>

Retrieves a collection of reservation document items across all reservations, supporting OData query options for filtering, sorting, paging, and field selection.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_ReservationDocumentItemsQueries` | No | OData query parameters: `$filter`, `$select`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_ReservationDocumentItemWrapper|error`

Sample code:

```ballerina
rsvDoc:CollectionOfA_ReservationDocumentItemWrapper items = check reservationDocumentClient->listA_ReservationDocumentItems(
    queries = {
        \$filter: "Product eq 'TG11' and Plant eq '1710'",
        \$top: 2,
        \$select: ["Reservation", "ReservationItem", "Product", "Plant", "MatlCompRequirementDate", "ResvnItmRequiredQtyInBaseUnit", "BaseUnit"],
        \$orderby: ["MatlCompRequirementDate"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "Reservation": "0000012345",
        "ReservationItem": "0001",
        "Product": "TG11",
        "Plant": "1710",
        "MatlCompRequirementDate": "/Date(1760400000000)/",
        "ResvnItmRequiredQtyInBaseUnit": "10",
        "BaseUnit": "PC"
      },
      {
        "Reservation": "0000012346",
        "ReservationItem": "0001",
        "Product": "TG11",
        "Plant": "1710",
        "MatlCompRequirementDate": "/Date(1760486400000)/",
        "ResvnItmRequiredQtyInBaseUnit": "4",
        "BaseUnit": "PC"
      }
    ]
  }
}
```

</details>

<details>
<summary>getA_ReservationDocumentItem</summary>

Retrieves a single reservation document item by its reservation number, item number and record type.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Reservation` | `string` | Yes | The reservation number. |
| `ReservationItem` | `string` | Yes | The reservation item number (up to 4 characters, for example `"0001"`). |
| `RecordType` | `string` | Yes | The record type of the item (up to 1 character). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_ReservationDocumentItemQueries` | No | OData query parameters: `$select`. |

Returns: `A_ReservationDocumentItemWrapper|error`

Sample code:

```ballerina
rsvDoc:A_ReservationDocumentItemWrapper item = check reservationDocumentClient->getA_ReservationDocumentItem(
    "0000012345",
    "0001",
    ""
);
```

Sample response:

```ballerina
{
  "d": {
    "Reservation": "0000012345",
    "ReservationItem": "0001",
    "RecordType": "",
    "Product": "TG11",
    "RequirementType": "",
    "MatlCompRequirementDate": "/Date(1760400000000)/",
    "Plant": "1710",
    "GoodsMovementIsAllowed": true,
    "StorageLocation": "171A",
    "Batch": "",
    "DebitCreditCode": "H",
    "BaseUnit": "PC",
    "GLAccount": "0051600000",
    "GoodsMovementType": "201",
    "EntryUnit": "PC",
    "QuantityIsFixed": false,
    "CompanyCodeCurrency": "USD",
    "ResvnItmRequiredQtyInBaseUnit": "10",
    "ReservationItemIsFinallyIssued": false,
    "ReservationItmIsMarkedForDeltn": false,
    "ResvnItmRequiredQtyInEntryUnit": "10",
    "ResvnItmWithdrawnQtyInBaseUnit": "0",
    "ResvnItmWithdrawnAmtInCCCrcy": "0.00",
    "GoodsRecipientName": "MAINT-TEAM",
    "UnloadingPointName": "",
    "ReservationItemText": "Spare parts for line 2"
  }
}
```

</details>

<details>
<summary>listReservationDocumentItemsOfA_ReservationDocumentHeader</summary>

Retrieves the items of a specific reservation document, supporting OData query options for filtering, sorting, paging, and field selection.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Reservation` | `string` | Yes | The reservation number whose items are returned. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListReservationDocumentItemsOfA_ReservationDocumentHeaderQueries` | No | OData query parameters: `$filter`, `$select`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_ReservationDocumentItemWrapper|error`

Sample code:

```ballerina
rsvDoc:CollectionOfA_ReservationDocumentItemWrapper reservationItems = check reservationDocumentClient->listReservationDocumentItemsOfA_ReservationDocumentHeader(
    "0000012345",
    queries = {
        \$select: ["ReservationItem", "Product", "ResvnItmRequiredQtyInBaseUnit", "ResvnItmWithdrawnQtyInBaseUnit", "BaseUnit"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "ReservationItem": "0001",
        "Product": "TG11",
        "ResvnItmRequiredQtyInBaseUnit": "10",
        "ResvnItmWithdrawnQtyInBaseUnit": "0",
        "BaseUnit": "PC"
      },
      {
        "ReservationItem": "0002",
        "Product": "TG12",
        "ResvnItmRequiredQtyInBaseUnit": "5",
        "ResvnItmWithdrawnQtyInBaseUnit": "2",
        "BaseUnit": "PC"
      }
    ]
  }
}
```

</details>

#### Batch requests

<details>
<summary>performBatchOperation</summary>

Sends a group of OData requests to the `$batch` endpoint in a single HTTP call. You build the `multipart/mixed` request body yourself.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `request` | `http:Request` | Yes | The batch request, with a `multipart/mixed` body that contains the individual OData requests. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Request batchRequest = new;
string batchBody = string `--batch_1
Content-Type: application/http
Content-Transfer-Encoding: binary

GET A_ReservationDocumentHeader('0000012345') HTTP/1.1
Accept: application/json

--batch_1--`;
batchRequest.setTextPayload(batchBody, "multipart/mixed; boundary=batch_1");

http:Response resp = check reservationDocumentClient->performBatchOperation(batchRequest);
```

Sample response:

The operation returns an `http:Response`. A successful call has status code `202 Accepted` and a `multipart/mixed` body that holds one response part for each request in the batch. Read it with `resp.getTextPayload()` and parse the parts.

</details>
