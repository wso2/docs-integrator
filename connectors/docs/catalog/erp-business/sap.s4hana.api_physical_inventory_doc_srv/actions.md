---
title: Actions
---

# Actions

The `ballerinax/sap.s4hana.api_physical_inventory_doc_srv` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Provides access to SAP S/4HANA physical inventory documents, items and serial numbers, including count entry, recounts and posting of differences, via the OData A2X API. |

---

## Client

Provides access to SAP S/4HANA physical inventory documents, items and serial numbers, including count entry, recounts and posting of differences, via the OData A2X API.

### Configuration

The client is initialized with a `ConnectionConfig` record, the target `hostname` and an optional `port` (default `443`). The connector builds the service URL `https://<hostname>:<port>/sap/opu/odata/sap/API_PHYSICAL_INVENTORY_DOC_SRV` and passes the configuration to the underlying `ballerinax/sap` client.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `http:BearerTokenConfig\|OAuth2RefreshTokenGrantConfig\|http:CredentialsConfig` | Required | Authentication configuration; use `http:CredentialsConfig` (username and password of the communication user) for Basic Auth. |
| `httpVersion` | `http:HttpVersion` | `http:HTTP_2_0` | HTTP protocol version to use for outbound requests. |
| `http1Settings` | `http:ClientHttp1Settings` | `{}` | HTTP/1.x client settings. |
| `http2Settings` | `http:ClientHttp2Settings` | `{}` | HTTP/2 client settings. |
| `timeout` | `decimal` | `60` | Maximum time in seconds to wait for a response before closing the connection. |
| `forwarded` | `string` | `"disable"` | Choice of setting the `forwarded`/`x-forwarded` header. |
| `followRedirects` | `http:FollowRedirects` | `()` | Redirection settings. |
| `poolConfig` | `http:PoolConfiguration` | `()` | Request pooling settings. |
| `cache` | `http:CacheConfig` | `{}` | HTTP caching settings. |
| `compression` | `http:Compression` | `http:COMPRESSION_AUTO` | How the `accept-encoding` header is handled. |
| `circuitBreaker` | `http:CircuitBreakerConfig` | `()` | Circuit breaker settings. |
| `retryConfig` | `http:RetryConfig` | `()` | Retry settings. |
| `cookieConfig` | `http:CookieConfig` | `()` | Cookie settings. |
| `responseLimits` | `http:ResponseLimitConfigs` | `{}` | Inbound response size limits. |
| `secureSocket` | `http:ClientSecureSocket` | `()` | SSL/TLS configuration for secure connections. |
| `proxy` | `http:ProxyConfig` | `()` | Proxy server configuration. |
| `socketConfig` | `http:ClientSocketConfig` | `{}` | Client socket settings. |
| `validation` | `boolean` | `true` | Enables inbound payload validation using the constraint package. |
| `laxDataBinding` | `boolean` | `true` | Enables relaxed data binding, so `nil` values are treated as optional and absent fields as nilable. |

### Initializing the client

```ballerina
import ballerinax/sap.s4hana.api_physical_inventory_doc_srv as physicalinventorydoc;

configurable string hostname = ?;
configurable string username = ?;
configurable string password = ?;

physicalinventorydoc:Client physicalInventoryDocClient = check new (
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

#### Physical inventory documents

<details>
<summary>listA_PhysInventoryDocHeaders</summary>

Retrieves a collection of physical inventory document headers, supporting OData query options for filtering, sorting, paging and field selection.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_PhysInventoryDocHeadersQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_PhysInventoryDocHeaderWrapper|error`

Sample code:

```ballerina
physicalinventorydoc:CollectionOfA_PhysInventoryDocHeaderWrapper result = check physicalInventoryDocClient->listA_PhysInventoryDocHeaders(
    queries = {
        \$filter: "Plant eq '1710' and FiscalYear eq '2026'",
        \$top: 5,
        \$select: ["FiscalYear", "PhysicalInventoryDocument", "Plant", "StorageLocation", "PhysicalInventoryCountStatus"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "FiscalYear": "2026",
        "PhysicalInventoryDocument": "100000045",
        "Plant": "1710",
        "StorageLocation": "171A",
        "PhysicalInventoryCountStatus": "X"
      },
      {
        "FiscalYear": "2026",
        "PhysicalInventoryDocument": "100000046",
        "Plant": "1710",
        "StorageLocation": "171A",
        "PhysicalInventoryCountStatus": ""
      }
    ]
  }
}
```

</details>

<details>
<summary>createA_PhysInventoryDocHeader</summary>

Creates a physical inventory document. Items can be created in the same request through the `to_PhysicalInventoryDocumentItem` navigation property.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateA_PhysInventoryDocHeader` | Yes | Physical inventory document header fields such as fiscal year, plant, storage location and planned count date, with optional items. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_PhysInventoryDocHeader_1|error`

Sample code:

```ballerina
physicalinventorydoc:A_PhysInventoryDocHeader_1 created = check physicalInventoryDocClient->createA_PhysInventoryDocHeader({
    FiscalYear: "2026",
    PhysicalInventoryDocument: "",
    Plant: "1710",
    StorageLocation: "171A",
    PhysicalInventoryDocumentDesc: "Cycle count aisle 3",
    to_PhysicalInventoryDocumentItem: {
        results: [
            {
                FiscalYear: "2026",
                PhysicalInventoryDocument: "",
                PhysicalInventoryDocumentItem: "1",
                Material: "TG11"
            }
        ]
    }
});
```

Sample response:

```ballerina
{
  "d": {
    "FiscalYear": "2026",
    "PhysicalInventoryDocument": "100000047",
    "Plant": "1710",
    "StorageLocation": "171A",
    "DocumentDate": "/Date(1792022400000)/",
    "PhysInventoryPlannedCountDate": "/Date(1792022400000)/",
    "PhysicalInventoryDocumentDesc": "Cycle count aisle 3",
    "PhysicalInventoryCountStatus": ""
  }
}
```

</details>

<details>
<summary>getA_PhysInventoryDocHeader</summary>

Retrieves a single physical inventory document header by its fiscal year and document number.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `FiscalYear` | `string` | Yes | Fiscal year of the document (for example, `"2026"`). |
| `PhysicalInventoryDocument` | `string` | Yes | Physical inventory document number (for example, `"100000045"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_PhysInventoryDocHeaderQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_PhysInventoryDocHeaderWrapper|error`

Sample code:

```ballerina
physicalinventorydoc:A_PhysInventoryDocHeaderWrapper document = check physicalInventoryDocClient->getA_PhysInventoryDocHeader(
    "2026",
    "100000045",
    queries = {
        \$expand: ["to_PhysicalInventoryDocumentItem"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "FiscalYear": "2026",
    "PhysicalInventoryDocument": "100000045",
    "Plant": "1710",
    "StorageLocation": "171A",
    "PhysicalInventoryCountStatus": "X",
    "PhysInvtryAdjustmentPostingSts": "",
    "to_PhysicalInventoryDocumentItem": {
      "results": [
        {
          "FiscalYear": "2026",
          "PhysicalInventoryDocument": "100000045",
          "PhysicalInventoryDocumentItem": "1",
          "Material": "TG11",
          "Quantity": "48",
          "MaterialBaseUnit": "PC",
          "PhysicalInventoryItemIsCounted": true
        }
      ]
    }
  }
}
```

</details>

#### Physical inventory document items

<details>
<summary>listA_PhysInventoryDocItems</summary>

Retrieves a collection of physical inventory document items across documents, supporting OData query options.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_PhysInventoryDocItemsQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_PhysInventoryDocItemWrapper|error`

Sample code:

```ballerina
physicalinventorydoc:CollectionOfA_PhysInventoryDocItemWrapper items = check physicalInventoryDocClient->listA_PhysInventoryDocItems(
    queries = {
        \$filter: "Material eq 'TG11' and PhysicalInventoryItemIsCounted eq false",
        \$top: 10,
        \$orderby: ["PhysicalInventoryDocument desc"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "FiscalYear": "2026",
        "PhysicalInventoryDocument": "100000046",
        "PhysicalInventoryDocumentItem": "1",
        "Plant": "1710",
        "StorageLocation": "171A",
        "Material": "TG11",
        "MaterialBaseUnit": "PC",
        "BookQtyBfrCountInMatlBaseUnit": "50",
        "PhysicalInventoryItemIsCounted": false
      }
    ]
  }
}
```

</details>

<details>
<summary>getA_PhysInventoryDocItem</summary>

Retrieves a single physical inventory document item by fiscal year, document number and item number.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `FiscalYear` | `string` | Yes | Fiscal year of the document. |
| `PhysicalInventoryDocument` | `string` | Yes | Physical inventory document number. |
| `PhysicalInventoryDocumentItem` | `string` | Yes | Physical inventory item number (for example, `"1"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_PhysInventoryDocItemQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_PhysInventoryDocItemWrapper|error`

Sample code:

```ballerina
physicalinventorydoc:A_PhysInventoryDocItemWrapper item = check physicalInventoryDocClient->getA_PhysInventoryDocItem(
    "2026",
    "100000045",
    "1",
    queries = {
        \$select: ["PhysicalInventoryDocumentItem", "Material", "Quantity", "MaterialBaseUnit", "DifferenceAmountInCoCodeCrcy", "Currency"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "PhysicalInventoryDocumentItem": "1",
    "Material": "TG11",
    "Quantity": "48",
    "MaterialBaseUnit": "PC",
    "DifferenceAmountInCoCodeCrcy": "-20.00",
    "Currency": "USD"
  }
}
```

</details>

<details>
<summary>listPhysicalInventoryDocumentItemsOfA_PhysInventoryDocHeader</summary>

Retrieves the items of a specific physical inventory document through the `to_PhysicalInventoryDocumentItem` navigation property.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `FiscalYear` | `string` | Yes | Fiscal year of the document. |
| `PhysicalInventoryDocument` | `string` | Yes | Physical inventory document number. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListPhysicalInventoryDocumentItemsOfA_PhysInventoryDocHeaderQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_PhysInventoryDocItemWrapper|error`

Sample code:

```ballerina
physicalinventorydoc:CollectionOfA_PhysInventoryDocItemWrapper docItems = check physicalInventoryDocClient->listPhysicalInventoryDocumentItemsOfA_PhysInventoryDocHeader(
    "2026",
    "100000045",
    queries = {
        \$select: ["PhysicalInventoryDocumentItem", "Material", "Quantity", "PhysicalInventoryItemIsCounted"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "PhysicalInventoryDocumentItem": "1",
        "Material": "TG11",
        "Quantity": "48",
        "PhysicalInventoryItemIsCounted": true
      },
      {
        "PhysicalInventoryDocumentItem": "2",
        "Material": "TG12",
        "Quantity": "0",
        "PhysicalInventoryItemIsCounted": false
      }
    ]
  }
}
```

</details>

<details>
<summary>getPhysicalInventoryDocumentOfA_PhysInventoryDocItem</summary>

Retrieves the header of the physical inventory document that a specific item belongs to, through the `to_PhysicalInventoryDocument` navigation property.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `FiscalYear` | `string` | Yes | Fiscal year of the document. |
| `PhysicalInventoryDocument` | `string` | Yes | Physical inventory document number. |
| `PhysicalInventoryDocumentItem` | `string` | Yes | Physical inventory item number. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetPhysicalInventoryDocumentOfA_PhysInventoryDocItemQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_PhysInventoryDocHeaderWrapper|error`

Sample code:

```ballerina
physicalinventorydoc:A_PhysInventoryDocHeaderWrapper header = check physicalInventoryDocClient->getPhysicalInventoryDocumentOfA_PhysInventoryDocItem(
    "2026",
    "100000045",
    "1",
    queries = {
        \$select: ["FiscalYear", "PhysicalInventoryDocument", "Plant", "StorageLocation", "PhysicalInventoryCountStatus"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "FiscalYear": "2026",
    "PhysicalInventoryDocument": "100000045",
    "Plant": "1710",
    "StorageLocation": "171A",
    "PhysicalInventoryCountStatus": "X"
  }
}
```

</details>

<details>
<summary>patchA_PhysInventoryDocItem</summary>

Updates a specific physical inventory document item, for example to enter the counted quantity or mark the item as a zero count.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `FiscalYear` | `string` | Yes | Fiscal year of the document. |
| `PhysicalInventoryDocument` | `string` | Yes | Physical inventory document number. |
| `PhysicalInventoryDocumentItem` | `string` | Yes | Physical inventory item number. |
| `payload` | `Modified\ A_PhysInventoryDocItemType` | Yes | Record with a `d` field of type `UpdateA_PhysInventoryDocItem` holding the item fields to change, such as `Quantity`, `UnitOfEntry` or `PhysicalInventoryItemIsZero`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check physicalInventoryDocClient->patchA_PhysInventoryDocItem(
    "2026",
    "100000045",
    "1",
    {
        d: {
            Material: "TG11",
            QuantityInUnitOfEntry: "48",
            UnitOfEntry: "PC"
        }
    }
);
```

Sample response:

The operation returns an `http:Response`. On success, SAP responds with status code `204 No Content` and an empty body.

</details>

#### Serial numbers

<details>
<summary>listA_SerialNumberPhysInventoryDocs</summary>

Retrieves a collection of serial numbers recorded on physical inventory document items, supporting OData query options.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_SerialNumberPhysInventoryDocsQueries` | No | OData query parameters: `$filter`, `$select`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_SerialNumberPhysInventoryDocWrapper|error`

Sample code:

```ballerina
physicalinventorydoc:CollectionOfA_SerialNumberPhysInventoryDocWrapper serials = check physicalInventoryDocClient->listA_SerialNumberPhysInventoryDocs(
    queries = {
        \$filter: "PhysicalInventoryDocument eq '100000045'",
        \$top: 20
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "Equipment": "10000123",
        "FiscalYear": "2026",
        "PhysicalInventoryDocument": "100000045",
        "PhysicalInventoryDocumentItem": "1",
        "SerialNumberPhysicalInvtryType": "1",
        "Material": "TG11",
        "SerialNumber": "SN-0001"
      }
    ]
  }
}
```

</details>

<details>
<summary>getA_SerialNumberPhysInventoryDoc</summary>

Retrieves a single serial number entry for a specific physical inventory document item.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Equipment` | `string` | Yes | Equipment number of the serialized material. |
| `FiscalYear` | `string` | Yes | Fiscal year of the document. |
| `PhysicalInventoryDocument` | `string` | Yes | Physical inventory document number. |
| `PhysicalInventoryDocumentItem` | `string` | Yes | Line number of the physical inventory document item. |
| `SerialNumberPhysicalInvtryType` | `string` | Yes | Serial number physical inventory type (one character). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_SerialNumberPhysInventoryDocQueries` | No | OData query parameters: `$select`. |

Returns: `A_SerialNumberPhysInventoryDocWrapper|error`

Sample code:

```ballerina
physicalinventorydoc:A_SerialNumberPhysInventoryDocWrapper serial = check physicalInventoryDocClient->getA_SerialNumberPhysInventoryDoc(
    "10000123",
    "2026",
    "100000045",
    "1",
    "1"
);
```

Sample response:

```ballerina
{
  "d": {
    "Equipment": "10000123",
    "FiscalYear": "2026",
    "PhysicalInventoryDocument": "100000045",
    "PhysicalInventoryDocumentItem": "1",
    "SerialNumberPhysicalInvtryType": "1",
    "Material": "TG11",
    "SerialNumber": "SN-0001"
  }
}
```

</details>

<details>
<summary>listSerialNumberssOfA_PhysInventoryDocItem</summary>

Retrieves the serial numbers of a specific physical inventory document item through the `to_SerialNumbers` navigation property.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `FiscalYear` | `string` | Yes | Fiscal year of the document. |
| `PhysicalInventoryDocument` | `string` | Yes | Physical inventory document number. |
| `PhysicalInventoryDocumentItem` | `string` | Yes | Physical inventory item number. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListSerialNumberssOfA_PhysInventoryDocItemQueries` | No | OData query parameters: `$filter`, `$select`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_SerialNumberPhysInventoryDocWrapper|error`

Sample code:

```ballerina
physicalinventorydoc:CollectionOfA_SerialNumberPhysInventoryDocWrapper itemSerials = check physicalInventoryDocClient->listSerialNumberssOfA_PhysInventoryDocItem(
    "2026",
    "100000045",
    "1",
    queries = {
        \$select: ["Equipment", "SerialNumber"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "Equipment": "10000123",
        "SerialNumber": "SN-0001"
      },
      {
        "Equipment": "10000124",
        "SerialNumber": "SN-0002"
      }
    ]
  }
}
```

</details>

<details>
<summary>patchA_SerialNumberPhysInventoryDoc</summary>

Sets a counted serial number for a specific physical inventory document item.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Equipment` | `string` | Yes | Equipment number of the serialized material. |
| `FiscalYear` | `string` | Yes | Fiscal year of the document. |
| `PhysicalInventoryDocument` | `string` | Yes | Physical inventory document number. |
| `PhysicalInventoryDocumentItem` | `string` | Yes | Line number of the physical inventory document item. |
| `SerialNumberPhysicalInvtryType` | `string` | Yes | Serial number physical inventory type (one character). |
| `payload` | `Modified\ A_SerialNumberPhysInventoryDocType` | Yes | Record with a `d` field of type `UpdateA_SerialNumberPhysInventoryDoc` holding `Material` and `SerialNumber`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check physicalInventoryDocClient->patchA_SerialNumberPhysInventoryDoc(
    "10000123",
    "2026",
    "100000045",
    "1",
    "1",
    {
        d: {
            Material: "TG11",
            SerialNumber: "SN-0001"
        }
    }
);
```

Sample response:

The operation returns an `http:Response`. On success, SAP responds with status code `204 No Content` and an empty body.

</details>

#### Recounts and posting of differences

These operations call OData function imports. Key values passed as queries (`FiscalYear`, `PhysicalInventoryDocument`, `PhysicalInventoryDocumentItem`, `Material`) must be enclosed in single quotes, and date values use the `datetime'YYYY-MM-DDThh:mm'` format.

<details>
<summary>createInitiateRecount</summary>

Initiates a recount for a physical inventory document. SAP creates a recount document for the items of the original document.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `CreateInitiateRecountQueries` | Yes | Function import parameters: `FiscalYear` and `PhysicalInventoryDocument` (required), plus optional `PhysicalInventoryNumber`, `PhysicalInventoryDocumentDesc`, `PhysInvtryDocHasQtySnapshot`, `PostingIsBlockedForPhysInvtry`, `PostingThresholdValue`, `DocumentDate`, `PhysInventoryReferenceNumber`, `PhysInventoryPlannedCountDate`. |

Returns: `A_PhysInventoryDocHeader_1|error`

Sample code:

```ballerina
physicalinventorydoc:A_PhysInventoryDocHeader_1 recount = check physicalInventoryDocClient->createInitiateRecount(
    FiscalYear = "'2026'",
    PhysicalInventoryDocument = "'100000045'",
    PhysInventoryPlannedCountDate = "datetime'2026-10-20T00:00'"
);
```

Sample response:

```ballerina
{
  "d": {
    "FiscalYear": "2026",
    "PhysicalInventoryDocument": "100000048",
    "Plant": "1710",
    "StorageLocation": "171A",
    "PhysicalInventoryCountStatus": ""
  }
}
```

</details>

<details>
<summary>createInitiateRecountOnItem</summary>

Initiates a recount for a specific physical inventory document item.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `CreateInitiateRecountOnItemQueries` | Yes | Function import parameters: `FiscalYear`, `PhysicalInventoryDocument` and `PhysicalInventoryDocumentItem` (required), plus optional `PhysicalInventoryNumber`, `PhysicalInventoryDocumentDesc`, `PhysInvtryDocHasQtySnapshot`, `PostingIsBlockedForPhysInvtry`, `DocumentDate`, `PhysInventoryReferenceNumber`, `PhysInventoryPlannedCountDate`. |

Returns: `A_PhysInventoryDocItem_1|error`

Sample code:

```ballerina
physicalinventorydoc:A_PhysInventoryDocItem_1 recountItem = check physicalInventoryDocClient->createInitiateRecountOnItem(
    FiscalYear = "'2026'",
    PhysicalInventoryDocument = "'100000045'",
    PhysicalInventoryDocumentItem = "'1'"
);
```

Sample response:

```ballerina
{
  "d": {
    "FiscalYear": "2026",
    "PhysicalInventoryDocument": "100000045",
    "PhysicalInventoryDocumentItem": "1",
    "Material": "TG11",
    "PhysInvtryItemIsRecounted": true,
    "PhysInvtryRecountDocument": "100000049"
  }
}
```

</details>

<details>
<summary>createPostDifferences</summary>

Posts the inventory differences of a physical inventory document, creating a material document for the differences.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `CreatePostDifferencesQueries` | Yes | Function import parameters: `FiscalYear` and `PhysicalInventoryDocument` (required), plus optional `PostingDate` and `PostingThresholdValue`. |

Returns: `A_PhysInventoryDocHeader_1|error`

Sample code:

```ballerina
physicalinventorydoc:A_PhysInventoryDocHeader_1 posted = check physicalInventoryDocClient->createPostDifferences(
    FiscalYear = "'2026'",
    PhysicalInventoryDocument = "'100000045'",
    PostingDate = "datetime'2026-10-15T00:00'"
);
```

Sample response:

```ballerina
{
  "d": {
    "FiscalYear": "2026",
    "PhysicalInventoryDocument": "100000045",
    "Plant": "1710",
    "StorageLocation": "171A",
    "PhysicalInventoryCountStatus": "X",
    "PhysInvtryAdjustmentPostingSts": "X"
  }
}
```

</details>

<details>
<summary>createPostDifferencesOnItem</summary>

Posts the inventory difference of a specific physical inventory document item, creating a material document for the difference.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `CreatePostDifferencesOnItemQueries` | Yes | Function import parameters: `FiscalYear`, `PhysicalInventoryDocument`, `PhysicalInventoryDocumentItem` and `Material` (required), plus optional `Batch`, `PostingDate` and `ReasonForPhysInvtryDifference`. |

Returns: `A_PhysInventoryDocItem_1|error`

Sample code:

```ballerina
physicalinventorydoc:A_PhysInventoryDocItem_1 postedItem = check physicalInventoryDocClient->createPostDifferencesOnItem(
    FiscalYear = "'2026'",
    PhysicalInventoryDocument = "'100000045'",
    PhysicalInventoryDocumentItem = "'1'",
    Material = "'TG11'"
);
```

Sample response:

```ballerina
{
  "d": {
    "FiscalYear": "2026",
    "PhysicalInventoryDocument": "100000045",
    "PhysicalInventoryDocumentItem": "1",
    "Material": "TG11",
    "PhysInvtryDifferenceIsPosted": true,
    "MaterialDocument": "4900000312",
    "MaterialDocumentYear": "2026",
    "MaterialDocumentItem": "1"
  }
}
```

</details>

#### Batch requests

<details>
<summary>performBatchOperation</summary>

Sends a group of OData requests to the `$batch` endpoint in a single multipart call.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `request` | `http:Request` | Yes | Batch request with a `multipart/mixed` body containing the individual OData requests. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Request batchRequest = new;
string batchBody = string `--batch_1
Content-Type: application/http
Content-Transfer-Encoding: binary

GET A_PhysInventoryDocHeader(FiscalYear='2026',PhysicalInventoryDocument='100000045') HTTP/1.1
Accept: application/json

--batch_1--`;
batchRequest.setTextPayload(batchBody, "multipart/mixed; boundary=batch_1");

http:Response response = check physicalInventoryDocClient->performBatchOperation(batchRequest);
```

Sample response:

The operation returns an `http:Response`. On success, SAP responds with status code `202 Accepted` and a `multipart/mixed` body that contains one response part for each request in the batch.

</details>
