---
title: Actions
---

# Actions

The `ballerinax/sap.s4hana.api_material_document_srv` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Provides access to SAP S/4HANA material documents (headers, items and serial numbers) for posting, reading and cancelling goods movements via the OData A2X API. |

---

## Client

Provides access to SAP S/4HANA material documents (headers, items and serial numbers) for posting, reading and cancelling goods movements via the OData A2X API.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `http:BearerTokenConfig\|OAuth2RefreshTokenGrantConfig\|http:CredentialsConfig` | Required | Authentication credentials; use `http:CredentialsConfig` (username/password) for Basic Auth with an SAP communication user, `http:BearerTokenConfig` for a bearer token, or `OAuth2RefreshTokenGrantConfig` for OAuth 2.0. |
| `httpVersion` | `http:HttpVersion` | `http:HTTP_2_0` | HTTP protocol version to use for outbound requests. |
| `http1Settings` | `http:ClientHttp1Settings` | `{}` | HTTP/1.x client settings such as keep-alive and chunking. |
| `http2Settings` | `http:ClientHttp2Settings` | `{}` | HTTP/2 client settings. |
| `timeout` | `decimal` | `60` | Maximum time (in seconds) to wait for a response before closing the connection. |
| `forwarded` | `string` | `"disable"` | Controls the `forwarded`/`x-forwarded` header. |
| `followRedirects` | `http:FollowRedirects` | `()` | Redirection settings. |
| `poolConfig` | `http:PoolConfiguration` | `()` | Connection pool settings. |
| `cache` | `http:CacheConfig` | `{}` | HTTP caching settings. |
| `compression` | `http:Compression` | `http:COMPRESSION_AUTO` | How the `accept-encoding` header is handled. |
| `circuitBreaker` | `http:CircuitBreakerConfig` | `()` | Circuit breaker settings. |
| `retryConfig` | `http:RetryConfig` | `()` | Retry settings. |
| `cookieConfig` | `http:CookieConfig` | `()` | Cookie settings. |
| `responseLimits` | `http:ResponseLimitConfigs` | `{}` | Limits on inbound response size. |
| `secureSocket` | `http:ClientSecureSocket` | `()` | SSL/TLS configuration for secure connections. |
| `proxy` | `http:ProxyConfig` | `()` | Proxy server configuration. |
| `socketConfig` | `http:ClientSocketConfig` | `{}` | Client socket settings. |
| `validation` | `boolean` | `true` | Enables inbound payload validation using the constraint package. |
| `laxDataBinding` | `boolean` | `true` | Enables relaxed data binding, treating `nil` values as optional and absent fields as nilable. |

The client constructor also takes the `hostname` of the SAP S/4HANA API (for example, `<your-tenant>-api.s4hana.cloud.sap`) and an optional `port` (default `443`). The service URL is built as `https://<hostname>:<port>/sap/opu/odata/sap/API_MATERIAL_DOCUMENT_SRV`.

### Initializing the client

```ballerina
import ballerinax/sap.s4hana.api_material_document_srv as materialdocument;

configurable string hostname = ?;
configurable string username = ?;
configurable string password = ?;

materialdocument:Client materialDocumentClient = check new (
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

#### Material document headers

<details>
<summary>listA_MaterialDocumentHeaders</summary>

Retrieves a collection of material document headers, supporting OData query options for filtering, sorting, paging and field selection.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_MaterialDocumentHeadersQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_MaterialDocumentHeaderWrapper|error`

Sample code:

```ballerina
materialdocument:CollectionOfA_MaterialDocumentHeaderWrapper result = check materialDocumentClient->listA_MaterialDocumentHeaders(
    queries = {
        \$filter: "MaterialDocumentYear eq '2026' and GoodsMovementCode eq '01'",
        \$top: 5,
        \$orderby: ["PostingDate desc"],
        \$select: ["MaterialDocumentYear", "MaterialDocument", "PostingDate", "GoodsMovementCode", "ReferenceDocument"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "MaterialDocumentYear": "2026",
        "MaterialDocument": "5000000123",
        "PostingDate": "/Date(1792022400000)/",
        "GoodsMovementCode": "01",
        "ReferenceDocument": "DN-88231"
      },
      {
        "MaterialDocumentYear": "2026",
        "MaterialDocument": "5000000122",
        "PostingDate": "/Date(1791936000000)/",
        "GoodsMovementCode": "01",
        "ReferenceDocument": "DN-88207"
      }
    ]
  }
}
```

</details>

<details>
<summary>getA_MaterialDocumentHeader</summary>

Retrieves a single material document header by its document year and document number.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `MaterialDocumentYear` | `string` | Yes | The material document year (e.g., `"2026"`). |
| `MaterialDocument` | `string` | Yes | The material document number (e.g., `"5000000123"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_MaterialDocumentHeaderQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_MaterialDocumentHeaderWrapper|error`

Sample code:

```ballerina
materialdocument:A_MaterialDocumentHeaderWrapper header = check materialDocumentClient->getA_MaterialDocumentHeader(
    "2026",
    "5000000123",
    queries = {
        \$expand: ["to_MaterialDocumentItem"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "MaterialDocumentYear": "2026",
    "MaterialDocument": "5000000123",
    "InventoryTransactionType": "WE",
    "DocumentDate": "/Date(1792022400000)/",
    "PostingDate": "/Date(1792022400000)/",
    "CreationDate": "/Date(1792022400000)/",
    "CreationTime": "PT14H32M10S",
    "CreatedByUser": "CB9980000012",
    "MaterialDocumentHeaderText": "Goods receipt for PO 4500000321",
    "ReferenceDocument": "DN-88231",
    "GoodsMovementCode": "01",
    "to_MaterialDocumentItem": {
      "results": [
        {
          "MaterialDocumentYear": "2026",
          "MaterialDocument": "5000000123",
          "MaterialDocumentItem": "1",
          "Material": "TG11",
          "Plant": "1710",
          "StorageLocation": "171A",
          "GoodsMovementType": "101",
          "PurchaseOrder": "4500000321",
          "PurchaseOrderItem": "10",
          "EntryUnit": "PC",
          "QuantityInEntryUnit": "25"
        }
      ]
    }
  }
}
```

</details>

<details>
<summary>createA_MaterialDocumentHeader</summary>

Creates (posts) a material document. Items are passed in `to_MaterialDocumentItem` in the same request, so a goods receipt, goods issue or transfer posting is posted in one call. The `GoodsMovementCode` on the header and the `GoodsMovementType` on each item determine the kind of goods movement.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateA_MaterialDocumentHeader` | Yes | Material document header fields such as posting date, goods movement code and reference document, with the items in `to_MaterialDocumentItem`. `MaterialDocumentYear` and `MaterialDocument` are mandatory fields of the record type. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_MaterialDocumentHeaderWrapper|error`

Sample code:

```ballerina
materialdocument:A_MaterialDocumentHeaderWrapper created = check materialDocumentClient->createA_MaterialDocumentHeader({
    MaterialDocumentYear: "2026",
    MaterialDocument: "",
    GoodsMovementCode: "01",
    DocumentDate: "2026-10-15T00:00:00",
    PostingDate: "2026-10-15T00:00:00",
    ReferenceDocument: "DN-88231",
    to_MaterialDocumentItem: {
        results: [
            {
                MaterialDocumentYear: "2026",
                MaterialDocument: "",
                MaterialDocumentItem: "1",
                Material: "TG11",
                Plant: "1710",
                StorageLocation: "171A",
                GoodsMovementType: "101",
                PurchaseOrder: "4500000321",
                PurchaseOrderItem: "10",
                GoodsMovementRefDocType: "B",
                EntryUnit: "PC",
                QuantityInEntryUnit: "25"
            }
        ]
    }
});
```

Sample response:

```ballerina
{
  "d": {
    "MaterialDocumentYear": "2026",
    "MaterialDocument": "5000000124",
    "InventoryTransactionType": "WE",
    "PostingDate": "/Date(1792022400000)/",
    "ReferenceDocument": "DN-88231",
    "GoodsMovementCode": "01"
  }
}
```

</details>

<details>
<summary>listMaterialDocumentItemsOfA_MaterialDocumentHeader</summary>

Retrieves the items of a specific material document by navigating from the header.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `MaterialDocumentYear` | `string` | Yes | The material document year. |
| `MaterialDocument` | `string` | Yes | The material document number. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListMaterialDocumentItemsOfA_MaterialDocumentHeaderQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_MaterialDocumentItemWrapper|error`

Sample code:

```ballerina
materialdocument:CollectionOfA_MaterialDocumentItemWrapper items = check materialDocumentClient->listMaterialDocumentItemsOfA_MaterialDocumentHeader(
    "2026",
    "5000000123",
    queries = {
        \$select: ["MaterialDocumentItem", "Material", "Plant", "StorageLocation", "GoodsMovementType", "QuantityInEntryUnit", "EntryUnit"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "MaterialDocumentItem": "1",
        "Material": "TG11",
        "Plant": "1710",
        "StorageLocation": "171A",
        "GoodsMovementType": "101",
        "QuantityInEntryUnit": "25",
        "EntryUnit": "PC"
      },
      {
        "MaterialDocumentItem": "2",
        "Material": "TG12",
        "Plant": "1710",
        "StorageLocation": "171A",
        "GoodsMovementType": "101",
        "QuantityInEntryUnit": "10",
        "EntryUnit": "PC"
      }
    ]
  }
}
```

</details>

#### Material document items

<details>
<summary>listA_MaterialDocumentItems</summary>

Retrieves a collection of material document items across documents, supporting OData query options for filtering, sorting, paging and field selection.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_MaterialDocumentItemsQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_MaterialDocumentItemWrapper|error`

Sample code:

```ballerina
materialdocument:CollectionOfA_MaterialDocumentItemWrapper result = check materialDocumentClient->listA_MaterialDocumentItems(
    queries = {
        \$filter: "Plant eq '1710' and Material eq 'TG11'",
        \$top: 10,
        \$orderby: ["MaterialDocument desc"],
        \$select: ["MaterialDocumentYear", "MaterialDocument", "MaterialDocumentItem", "Material", "Plant", "GoodsMovementType", "QuantityInBaseUnit", "MaterialBaseUnit"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "MaterialDocumentYear": "2026",
        "MaterialDocument": "5000000123",
        "MaterialDocumentItem": "1",
        "Material": "TG11",
        "Plant": "1710",
        "GoodsMovementType": "101",
        "QuantityInBaseUnit": "25",
        "MaterialBaseUnit": "PC"
      },
      {
        "MaterialDocumentYear": "2026",
        "MaterialDocument": "4900000087",
        "MaterialDocumentItem": "1",
        "Material": "TG11",
        "Plant": "1710",
        "GoodsMovementType": "261",
        "QuantityInBaseUnit": "5",
        "MaterialBaseUnit": "PC"
      }
    ]
  }
}
```

</details>

<details>
<summary>getA_MaterialDocumentItem</summary>

Retrieves a single material document item by its document year, document number and item number.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `MaterialDocumentYear` | `string` | Yes | The material document year. |
| `MaterialDocument` | `string` | Yes | The material document number. |
| `MaterialDocumentItem` | `string` | Yes | The material document item number (e.g., `"1"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_MaterialDocumentItemQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_MaterialDocumentItemWrapper|error`

Sample code:

```ballerina
materialdocument:A_MaterialDocumentItemWrapper item = check materialDocumentClient->getA_MaterialDocumentItem(
    "2026",
    "5000000123",
    "1",
    queries = {
        \$expand: ["to_SerialNumbers"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "MaterialDocumentYear": "2026",
    "MaterialDocument": "5000000123",
    "MaterialDocumentItem": "1",
    "Material": "TG11",
    "Plant": "1710",
    "StorageLocation": "171A",
    "GoodsMovementType": "101",
    "InventoryStockType": "01",
    "PurchaseOrder": "4500000321",
    "PurchaseOrderItem": "10",
    "MaterialBaseUnit": "PC",
    "QuantityInBaseUnit": "25",
    "EntryUnit": "PC",
    "QuantityInEntryUnit": "25",
    "CompanyCodeCurrency": "USD",
    "FiscalYear": "2026",
    "DebitCreditCode": "S",
    "GoodsMovementIsCancelled": false,
    "to_SerialNumbers": {
      "results": []
    }
  }
}
```

</details>

<details>
<summary>getMaterialDocumentHeaderOfA_MaterialDocumentItem</summary>

Retrieves the material document header that a specific material document item belongs to.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `MaterialDocumentYear` | `string` | Yes | The material document year. |
| `MaterialDocument` | `string` | Yes | The material document number. |
| `MaterialDocumentItem` | `string` | Yes | The material document item number. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetMaterialDocumentHeaderOfA_MaterialDocumentItemQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_MaterialDocumentHeaderWrapper|error`

Sample code:

```ballerina
materialdocument:A_MaterialDocumentHeaderWrapper header = check materialDocumentClient->getMaterialDocumentHeaderOfA_MaterialDocumentItem(
    "2026",
    "5000000123",
    "1",
    queries = {
        \$select: ["MaterialDocumentYear", "MaterialDocument", "PostingDate", "CreatedByUser", "GoodsMovementCode"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "MaterialDocumentYear": "2026",
    "MaterialDocument": "5000000123",
    "PostingDate": "/Date(1792022400000)/",
    "CreatedByUser": "CB9980000012",
    "GoodsMovementCode": "01"
  }
}
```

</details>

#### Serial numbers

<details>
<summary>listA_SerialNumberMaterialDocuments</summary>

Retrieves a collection of serial numbers recorded on material document items.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_SerialNumberMaterialDocumentsQueries` | No | OData query parameters: `$filter`, `$select`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_SerialNumberMaterialDocumentWrapper|error`

Sample code:

```ballerina
materialdocument:CollectionOfA_SerialNumberMaterialDocumentWrapper result = check materialDocumentClient->listA_SerialNumberMaterialDocuments(
    queries = {
        \$filter: "Material eq 'TG20'",
        \$top: 5
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "Material": "TG20",
        "SerialNumber": "SN-100045",
        "MaterialDocument": "5000000130",
        "MaterialDocumentItem": "1",
        "MaterialDocumentYear": "2026",
        "ManufacturerSerialNumber": "MFR-77812"
      },
      {
        "Material": "TG20",
        "SerialNumber": "SN-100046",
        "MaterialDocument": "5000000130",
        "MaterialDocumentItem": "1",
        "MaterialDocumentYear": "2026",
        "ManufacturerSerialNumber": "MFR-77813"
      }
    ]
  }
}
```

</details>

<details>
<summary>getA_SerialNumberMaterialDocument</summary>

Retrieves a single serial number entry for a specific material, serial number, material document, item and year.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Material` | `string` | Yes | The material number. |
| `SerialNumber` | `string` | Yes | The serial number. |
| `MaterialDocument` | `string` | Yes | The material document number. |
| `MaterialDocumentItem` | `string` | Yes | The material document item number. |
| `MaterialDocumentYear` | `string` | Yes | The material document year. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_SerialNumberMaterialDocumentQueries` | No | OData query parameters: `$select`. |

Returns: `A_SerialNumberMaterialDocumentWrapper|error`

Sample code:

```ballerina
materialdocument:A_SerialNumberMaterialDocumentWrapper serial = check materialDocumentClient->getA_SerialNumberMaterialDocument(
    "TG20",
    "SN-100045",
    "5000000130",
    "1",
    "2026"
);
```

Sample response:

```ballerina
{
  "d": {
    "Material": "TG20",
    "SerialNumber": "SN-100045",
    "MaterialDocument": "5000000130",
    "MaterialDocumentItem": "1",
    "MaterialDocumentYear": "2026",
    "ManufacturerSerialNumber": "MFR-77812"
  }
}
```

</details>

<details>
<summary>listSerialNumberssOfA_MaterialDocumentItem</summary>

Retrieves the serial numbers recorded on a specific material document item.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `MaterialDocumentYear` | `string` | Yes | The material document year. |
| `MaterialDocument` | `string` | Yes | The material document number. |
| `MaterialDocumentItem` | `string` | Yes | The material document item number. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListSerialNumberssOfA_MaterialDocumentItemQueries` | No | OData query parameters: `$filter`, `$select`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_SerialNumberMaterialDocumentWrapper|error`

Sample code:

```ballerina
materialdocument:CollectionOfA_SerialNumberMaterialDocumentWrapper serials = check materialDocumentClient->listSerialNumberssOfA_MaterialDocumentItem(
    "2026",
    "5000000130",
    "1",
    queries = {
        \$select: ["SerialNumber", "ManufacturerSerialNumber"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "SerialNumber": "SN-100045",
        "ManufacturerSerialNumber": "MFR-77812"
      },
      {
        "SerialNumber": "SN-100046",
        "ManufacturerSerialNumber": "MFR-77813"
      }
    ]
  }
}
```

</details>

#### Cancellation

<details>
<summary>createCancel</summary>

Cancels (reverses) a complete material document. SAP posts a reversal material document and returns its header. The query values must be enclosed in single quotes, and the optional posting date must use the `datetime'...'` format.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `CreateCancelQueries` | Yes | Function import parameters: `MaterialDocumentYear` and `MaterialDocument` (required, quoted), and `PostingDate` (optional, e.g., `datetime'2026-10-15T00:00'`). |

Returns: `A_MaterialDocumentHeaderWrapper|error`

Sample code:

```ballerina
materialdocument:A_MaterialDocumentHeaderWrapper reversal = check materialDocumentClient->createCancel(
    queries = {
        MaterialDocumentYear: "'2026'",
        MaterialDocument: "'5000000123'",
        PostingDate: "datetime'2026-10-15T00:00'"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "MaterialDocumentYear": "2026",
    "MaterialDocument": "5000000125",
    "PostingDate": "/Date(1792022400000)/",
    "GoodsMovementCode": "01"
  }
}
```

</details>

<details>
<summary>createCancelItem</summary>

Cancels (reverses) a single item of a material document. SAP posts a reversal for the item and returns the reversal item. The query values must be enclosed in single quotes, and the optional posting date must use the `datetime'...'` format.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `CreateCancelItemQueries` | Yes | Function import parameters: `MaterialDocumentYear`, `MaterialDocument` and `MaterialDocumentItem` (required, quoted), and `PostingDate` (optional, e.g., `datetime'2026-10-15T00:00'`). |

Returns: `A_MaterialDocumentItemWrapper|error`

Sample code:

```ballerina
materialdocument:A_MaterialDocumentItemWrapper reversedItem = check materialDocumentClient->createCancelItem(
    queries = {
        MaterialDocumentYear: "'2026'",
        MaterialDocument: "'5000000123'",
        MaterialDocumentItem: "'2'"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "MaterialDocumentYear": "2026",
    "MaterialDocument": "5000000126",
    "MaterialDocumentItem": "1",
    "Material": "TG12",
    "Plant": "1710",
    "GoodsMovementType": "102",
    "ReversedMaterialDocumentYear": "2026",
    "ReversedMaterialDocument": "5000000123",
    "ReversedMaterialDocumentItem": "2"
  }
}
```

</details>

#### Batch requests

<details>
<summary>performBatchOperation</summary>

Sends a group of OData operations to the service `$batch` endpoint in a single HTTP request. You build the `multipart/mixed` batch body yourself and set it on the `http:Request`.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `request` | `http:Request` | Yes | The batch request with a `multipart/mixed` body that contains the individual OData operations. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Request batchRequest = new;
string batchBody = string `--batch_001
Content-Type: application/http
Content-Transfer-Encoding: binary

GET A_MaterialDocumentHeader(MaterialDocumentYear='2026',MaterialDocument='5000000123') HTTP/1.1
Accept: application/json

--batch_001--`;
batchRequest.setTextPayload(batchBody, "multipart/mixed; boundary=batch_001");

http:Response response = check materialDocumentClient->performBatchOperation(batchRequest);
```

Sample response:

Returns an `http:Response`. On success, the status code is `202` and the body is a `multipart/mixed` payload that contains one response part per operation in the batch. Read it with `response.getTextPayload()` and parse the individual parts.

</details>
