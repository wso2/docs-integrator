---
title: Actions
---

# Actions

The `ballerinax/sap.s4hana.api_material_stock_srv` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Provides read-only access to SAP S/4HANA material stock, stock in the account model and material serial numbers via the `API_MATERIAL_STOCK_SRV` OData API. |

---

## Client

Provides read-only access to SAP S/4HANA material stock, stock in the account model and material serial numbers via the `API_MATERIAL_STOCK_SRV` OData API.

### Configuration

The client is initialized with a `ConnectionConfig` record, the SAP S/4HANA `hostname` and an optional `port` (default `443`). The client builds the service URL `https://<hostname>:<port>/sap/opu/odata/sap/API_MATERIAL_STOCK_SRV` from these values.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `http:BearerTokenConfig\|OAuth2RefreshTokenGrantConfig\|http:CredentialsConfig` | Required | Authentication configuration; use `http:CredentialsConfig` (username/password) for Basic Auth with the communication user. |
| `httpVersion` | `http:HttpVersion` | `http:HTTP_2_0` | HTTP protocol version understood by the client. |
| `http1Settings` | `http:ClientHttp1Settings` | `{}` | HTTP/1.x protocol settings. |
| `http2Settings` | `http:ClientHttp2Settings` | `{}` | HTTP/2 protocol settings. |
| `timeout` | `decimal` | `60` | Maximum time (in seconds) to wait for a response before closing the connection. |
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
| `laxDataBinding` | `boolean` | `true` | Enables relaxed data binding, treating `nil` values as optional and absent fields as nilable. |

### Initializing the client

```ballerina
import ballerinax/sap.s4hana.api_material_stock_srv as materialstock;

configurable string hostname = ?;
configurable string username = ?;
configurable string password = ?;

materialstock:Client materialStockClient = check new (
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

All entity operations of this API are read-only. Stock records in the account model (`A_MatlStkInAcctMod`) are identified by eleven key fields: `Material`, `Plant`, `StorageLocation`, `Batch`, `Supplier`, `Customer`, `WBSElementInternalID`, `SDDocument`, `SDDocumentItem`, `InventorySpecialStockType` and `InventoryStockType`. Key fields that do not apply to a stock record (for example, `Supplier` for own stock) are passed with the initial values returned by the API, such as an empty string.

In the query records, `$select`, `$expand` and `$orderby` take arrays of the allowed property names, and `$top` and `$skip` take integers.

#### Material stock

<details>
<summary>listA_MaterialStocks</summary>

Retrieves a collection of materials with their base unit of measure. Expand `to_MatlStkInAcctMod` to include the stock records of each material.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_MaterialStocksQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_MaterialStockWrapper|error`

Sample code:

```ballerina
materialstock:CollectionOfA_MaterialStockWrapper result = check materialStockClient->listA_MaterialStocks(
    queries = {
        \$filter: "startswith(Material,'TG')",
        \$top: 3,
        \$orderby: ["Material"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "Material": "TG10",
        "MaterialBaseUnit": "PC"
      },
      {
        "Material": "TG11",
        "MaterialBaseUnit": "PC"
      },
      {
        "Material": "TG12",
        "MaterialBaseUnit": "KG"
      }
    ]
  }
}
```

</details>

<details>
<summary>getA_MaterialStock</summary>

Retrieves the material ID and base unit of measure for a specific material.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Material` | `string` | Yes | Material number (e.g., `"TG11"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_MaterialStockQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_MaterialStockWrapper|error`

Sample code:

```ballerina
materialstock:A_MaterialStockWrapper material = check materialStockClient->getA_MaterialStock(
    "TG11",
    queries = {
        \$expand: ["to_MatlStkInAcctMod"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "Material": "TG11",
    "MaterialBaseUnit": "PC",
    "to_MatlStkInAcctMod": {
      "results": [
        {
          "Material": "TG11",
          "Plant": "1010",
          "StorageLocation": "101A",
          "Batch": "",
          "Supplier": "",
          "Customer": "",
          "WBSElementInternalID": "00000000",
          "SDDocument": "",
          "SDDocumentItem": "000000",
          "InventorySpecialStockType": "",
          "InventoryStockType": "01",
          "WBSElementExternalID": "",
          "MaterialBaseUnit": "PC",
          "MatlWrhsStkQtyInMatlBaseUnit": "250.000"
        }
      ]
    }
  }
}
```

</details>

<details>
<summary>listMatlStkInAcctModsOfA_MaterialStock</summary>

Retrieves the stock records in the account model for a specific material, one record per combination of plant, storage location, batch, stock type and special stock.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Material` | `string` | Yes | Material number (e.g., `"TG11"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListMatlStkInAcctModsOfA_MaterialStockQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_MatlStkInAcctModWrapper|error`

Sample code:

```ballerina
materialstock:CollectionOfA_MatlStkInAcctModWrapper stock = check materialStockClient->listMatlStkInAcctModsOfA_MaterialStock(
    "TG11",
    queries = {
        \$filter: "Plant eq '1010'",
        \$select: ["Plant", "StorageLocation", "InventoryStockType", "MatlWrhsStkQtyInMatlBaseUnit", "MaterialBaseUnit"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "Plant": "1010",
        "StorageLocation": "101A",
        "InventoryStockType": "01",
        "MaterialBaseUnit": "PC",
        "MatlWrhsStkQtyInMatlBaseUnit": "250.000"
      },
      {
        "Plant": "1010",
        "StorageLocation": "101A",
        "InventoryStockType": "02",
        "MaterialBaseUnit": "PC",
        "MatlWrhsStkQtyInMatlBaseUnit": "12.000"
      }
    ]
  }
}
```

</details>

#### Stock in account model

<details>
<summary>listA_MatlStkInAcctMods</summary>

Retrieves a collection of material stock records in the account model, with the warehouse stock quantity in the base unit of measure for each stock identifier combination.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_MatlStkInAcctModsQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_MatlStkInAcctModWrapper|error`

Sample code:

```ballerina
materialstock:CollectionOfA_MatlStkInAcctModWrapper result = check materialStockClient->listA_MatlStkInAcctMods(
    queries = {
        \$filter: "Plant eq '1010' and InventoryStockType eq '01'",
        \$top: 2,
        \$inlinecount: "allpages"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "__count": "148",
    "results": [
      {
        "Material": "TG10",
        "Plant": "1010",
        "StorageLocation": "101A",
        "Batch": "",
        "Supplier": "",
        "Customer": "",
        "WBSElementInternalID": "00000000",
        "SDDocument": "",
        "SDDocumentItem": "000000",
        "InventorySpecialStockType": "",
        "InventoryStockType": "01",
        "WBSElementExternalID": "",
        "MaterialBaseUnit": "PC",
        "MatlWrhsStkQtyInMatlBaseUnit": "80.000"
      },
      {
        "Material": "TG11",
        "Plant": "1010",
        "StorageLocation": "101A",
        "Batch": "",
        "Supplier": "",
        "Customer": "",
        "WBSElementInternalID": "00000000",
        "SDDocument": "",
        "SDDocumentItem": "000000",
        "InventorySpecialStockType": "",
        "InventoryStockType": "01",
        "WBSElementExternalID": "",
        "MaterialBaseUnit": "PC",
        "MatlWrhsStkQtyInMatlBaseUnit": "250.000"
      }
    ]
  }
}
```

</details>

<details>
<summary>getA_MatlStkInAcctMod</summary>

Retrieves a single material stock record in the account model identified by its full set of stock identifiers.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Material` | `string` | Yes | Material in respect of which stock is managed (e.g., `"TG11"`). |
| `Plant` | `string` | Yes | Plant (e.g., `"1010"`). |
| `StorageLocation` | `string` | Yes | Storage location (e.g., `"101A"`). |
| `Batch` | `string` | Yes | Batch number (stock identifier); empty string when the material is not batch managed. |
| `Supplier` | `string` | Yes | Supplier for special stock; empty string for own stock. |
| `Customer` | `string` | Yes | Customer for special stock; empty string for own stock. |
| `WBSElementInternalID` | `string` | Yes | Valuated sales order stock WBS element (e.g., `"00000000"` when not applicable). |
| `SDDocument` | `string` | Yes | Sales order number of valuated sales order stock; empty string when not applicable. |
| `SDDocumentItem` | `string` | Yes | Sales order item of valuated sales order stock (e.g., `"000000"` when not applicable). |
| `InventorySpecialStockType` | `string` | Yes | Special stock type; empty string for own stock. |
| `InventoryStockType` | `string` | Yes | Stock type of goods movement (e.g., `"01"` for unrestricted-use stock). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_MatlStkInAcctModQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_MatlStkInAcctModWrapper|error`

Sample code:

```ballerina
materialstock:A_MatlStkInAcctModWrapper stockRecord = check materialStockClient->getA_MatlStkInAcctMod(
    "TG11",
    "1010",
    "101A",
    "",
    "",
    "",
    "00000000",
    "",
    "000000",
    "",
    "01"
);
```

Sample response:

```ballerina
{
  "d": {
    "Material": "TG11",
    "Plant": "1010",
    "StorageLocation": "101A",
    "Batch": "",
    "Supplier": "",
    "Customer": "",
    "WBSElementInternalID": "00000000",
    "SDDocument": "",
    "SDDocumentItem": "000000",
    "InventorySpecialStockType": "",
    "InventoryStockType": "01",
    "WBSElementExternalID": "",
    "MaterialBaseUnit": "PC",
    "MatlWrhsStkQtyInMatlBaseUnit": "250.000"
  }
}
```

</details>

<details>
<summary>getMaterialStockOfA_MatlStkInAcctMod</summary>

Retrieves the material (material ID and base unit of measure) that a specific stock record in the account model belongs to.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Material` | `string` | Yes | Material in respect of which stock is managed (e.g., `"TG11"`). |
| `Plant` | `string` | Yes | Plant (e.g., `"1010"`). |
| `StorageLocation` | `string` | Yes | Storage location (e.g., `"101A"`). |
| `Batch` | `string` | Yes | Batch number (stock identifier); empty string when the material is not batch managed. |
| `Supplier` | `string` | Yes | Supplier for special stock; empty string for own stock. |
| `Customer` | `string` | Yes | Customer for special stock; empty string for own stock. |
| `WBSElementInternalID` | `string` | Yes | Valuated sales order stock WBS element (e.g., `"00000000"` when not applicable). |
| `SDDocument` | `string` | Yes | Sales order number of valuated sales order stock; empty string when not applicable. |
| `SDDocumentItem` | `string` | Yes | Sales order item of valuated sales order stock (e.g., `"000000"` when not applicable). |
| `InventorySpecialStockType` | `string` | Yes | Special stock type; empty string for own stock. |
| `InventoryStockType` | `string` | Yes | Stock type of goods movement (e.g., `"01"` for unrestricted-use stock). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetMaterialStockOfA_MatlStkInAcctModQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_MaterialStockWrapper|error`

Sample code:

```ballerina
materialstock:A_MaterialStockWrapper material = check materialStockClient->getMaterialStockOfA_MatlStkInAcctMod(
    "TG11",
    "1010",
    "101A",
    "",
    "",
    "",
    "00000000",
    "",
    "000000",
    "",
    "01"
);
```

Sample response:

```ballerina
{
  "d": {
    "Material": "TG11",
    "MaterialBaseUnit": "PC"
  }
}
```

</details>

<details>
<summary>listMaterialSerialNumbersOfA_MatlStkInAcctMod</summary>

Retrieves the serial numbers of the serialized items held in a specific stock record in the account model.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Material` | `string` | Yes | Material in respect of which stock is managed (e.g., `"TG11"`). |
| `Plant` | `string` | Yes | Plant (e.g., `"1010"`). |
| `StorageLocation` | `string` | Yes | Storage location (e.g., `"101A"`). |
| `Batch` | `string` | Yes | Batch number (stock identifier); empty string when the material is not batch managed. |
| `Supplier` | `string` | Yes | Supplier for special stock; empty string for own stock. |
| `Customer` | `string` | Yes | Customer for special stock; empty string for own stock. |
| `WBSElementInternalID` | `string` | Yes | Valuated sales order stock WBS element (e.g., `"00000000"` when not applicable). |
| `SDDocument` | `string` | Yes | Sales order number of valuated sales order stock; empty string when not applicable. |
| `SDDocumentItem` | `string` | Yes | Sales order item of valuated sales order stock (e.g., `"000000"` when not applicable). |
| `InventorySpecialStockType` | `string` | Yes | Special stock type; empty string for own stock. |
| `InventoryStockType` | `string` | Yes | Stock type of goods movement (e.g., `"01"` for unrestricted-use stock). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListMaterialSerialNumbersOfA_MatlStkInAcctModQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_MaterialSerialNumberWrapper|error`

Sample code:

```ballerina
materialstock:CollectionOfA_MaterialSerialNumberWrapper serials = check materialStockClient->listMaterialSerialNumbersOfA_MatlStkInAcctMod(
    "TG11",
    "1010",
    "101A",
    "",
    "",
    "",
    "00000000",
    "",
    "000000",
    "",
    "01",
    queries = {
        \$select: ["SerialNumber", "Equipment"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "SerialNumber": "100000000001",
        "Equipment": "10000041"
      },
      {
        "SerialNumber": "100000000002",
        "Equipment": "10000042"
      }
    ]
  }
}
```

</details>

#### Material serial numbers

<details>
<summary>listA_MaterialSerialNumbers</summary>

Retrieves a collection of material serial numbers with the stock location, stock type and equipment of each serialized item.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_MaterialSerialNumbersQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_MaterialSerialNumberWrapper|error`

Sample code:

```ballerina
materialstock:CollectionOfA_MaterialSerialNumberWrapper result = check materialStockClient->listA_MaterialSerialNumbers(
    queries = {
        \$filter: "Material eq 'TG11' and Plant eq '1010'",
        \$top: 2,
        \$select: ["Material", "SerialNumber", "Plant", "StorageLocation", "Equipment"]
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
        "SerialNumber": "100000000001",
        "Plant": "1010",
        "StorageLocation": "101A",
        "Equipment": "10000041"
      },
      {
        "Material": "TG11",
        "SerialNumber": "100000000002",
        "Plant": "1010",
        "StorageLocation": "101A",
        "Equipment": "10000042"
      }
    ]
  }
}
```

</details>

<details>
<summary>getA_MaterialSerialNumber</summary>

Retrieves a single material serial number by material and serial number.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Material` | `string` | Yes | Material number (e.g., `"TG11"`). |
| `SerialNumber` | `string` | Yes | Serial number (e.g., `"100000000001"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_MaterialSerialNumberQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_MaterialSerialNumberWrapper|error`

Sample code:

```ballerina
materialstock:A_MaterialSerialNumberWrapper serial = check materialStockClient->getA_MaterialSerialNumber(
    "TG11",
    "100000000001"
);
```

Sample response:

```ballerina
{
  "d": {
    "Material": "TG11",
    "SerialNumber": "100000000001",
    "Plant": "1010",
    "StorageLocation": "101A",
    "InventorySpecialStockType": "",
    "Batch": "",
    "InventoryStockType": "01",
    "Equipment": "10000041",
    "Customer": "",
    "Supplier": "",
    "SDDocument": "",
    "SDDocumentItem": "000000",
    "WBSElementInternalID": "00000000",
    "WBSElementExternalID": ""
  }
}
```

</details>

<details>
<summary>listMatlStkInAcctModsOfA_MaterialSerialNumber</summary>

Retrieves the stock records in the account model that hold a specific serialized item.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Material` | `string` | Yes | Material number (e.g., `"TG11"`). |
| `SerialNumber` | `string` | Yes | Serial number (e.g., `"100000000001"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListMatlStkInAcctModsOfA_MaterialSerialNumberQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_MatlStkInAcctModWrapper|error`

Sample code:

```ballerina
materialstock:CollectionOfA_MatlStkInAcctModWrapper stock = check materialStockClient->listMatlStkInAcctModsOfA_MaterialSerialNumber(
    "TG11",
    "100000000001"
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "Material": "TG11",
        "Plant": "1010",
        "StorageLocation": "101A",
        "Batch": "",
        "Supplier": "",
        "Customer": "",
        "WBSElementInternalID": "00000000",
        "SDDocument": "",
        "SDDocumentItem": "000000",
        "InventorySpecialStockType": "",
        "InventoryStockType": "01",
        "WBSElementExternalID": "",
        "MaterialBaseUnit": "PC",
        "MatlWrhsStkQtyInMatlBaseUnit": "250.000"
      }
    ]
  }
}
```

</details>

#### Batch operations

<details>
<summary>performBatchOperation</summary>

Sends multiple OData read requests as a single HTTP `$batch` call, reducing round trips to the SAP server.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `request` | `http:Request` | Yes | An `http:Request` object containing the `multipart/mixed` batch payload with individual OData request parts. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Request batchRequest = new;
string boundary = "batch_ms001";
batchRequest.setHeader("Content-Type", "multipart/mixed; boundary=" + boundary);
batchRequest.setTextPayload(
    "--" + boundary + "\r\n" +
    "Content-Type: application/http\r\n" +
    "Content-Transfer-Encoding: binary\r\n\r\n" +
    "GET A_MaterialStock('TG11') HTTP/1.1\r\n" +
    "Accept: application/json\r\n\r\n" +
    "--" + boundary + "\r\n" +
    "Content-Type: application/http\r\n" +
    "Content-Transfer-Encoding: binary\r\n\r\n" +
    "GET A_MaterialStock('TG11')/to_MatlStkInAcctMod HTTP/1.1\r\n" +
    "Accept: application/json\r\n\r\n" +
    "--" + boundary + "--"
);
http:Response batchResponse = check materialStockClient->performBatchOperation(batchRequest);
```

Returns the raw `http:Response` from the `$batch` endpoint. On success the status code is `202 Accepted` and the body is a `multipart/mixed` payload containing one part per request in the batch, each with its own HTTP status line, headers and JSON body. Read it with `batchResponse.getTextPayload()` and parse each part as needed.

</details>
