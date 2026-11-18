---
title: Actions
---

# Actions

The `ballerinax/sap.s4hana.api_product_srv` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Creates, reads, updates and deletes SAP S/4HANA product master data, with descriptions, texts, units of measure and plant, sales, storage and valuation data, via the `API_PRODUCT_SRV` OData API. |

---

## Client

Creates, reads, updates and deletes SAP S/4HANA product master data, with descriptions, texts, units of measure and plant, sales, storage and valuation data, via the `API_PRODUCT_SRV` OData API.

### Configuration

The client is initialized with a `ConnectionConfig` record, the SAP S/4HANA `hostname` and an optional `port` (default `443`). The client builds the service URL `https://<hostname>:<port>/sap/opu/odata/sap/API_PRODUCT_SRV` from these values.

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
import ballerinax/sap.s4hana.api_product_srv as product;

configurable string hostname = ?;
configurable string username = ?;
configurable string password = ?;

product:Client productClient = check new (
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

A product is identified by its product number (`Product`, up to 40 characters). Its organizational data adds the keys of the organizational level: `Plant` for plant data, `Plant` and `StorageLocation` for storage location data, `Plant` and `MRPArea` for MRP area data, `ProductSalesOrg` and `ProductDistributionChnl` for sales organization data, and `ValuationArea` and `ValuationType` for valuation data. Descriptions and texts also take a `Language` key. Pass an empty string as `ValuationType` when the product isn't split valuated.

Products, plant data, storage location data, sales organization data and valuation data can't be deleted through this API. Set their `IsMarkedForDeletion` field to `true` with the matching `patch` operation instead. Descriptions, texts, units of measure, GTINs and sales tax data have `delete` operations.

The `patch` operations take an `Update...Wrapper` record that wraps the matching `Update...` record in a `d` field, for example `{d: {ProductGroup: "L002"}}`. Update and delete operations return an `http:Response`.

Operations named `...OfA_<entity>`, for example `listPlantsOfA_Product`, read or create data through a navigation property of a parent record and take the keys of the parent record as parameters.

In the query records, `$select`, `$expand` and `$orderby` take arrays of the allowed property and navigation names, and `$top` and `$skip` take integers. Dates are returned in the OData V2 format `/Date(<milliseconds since epoch>)/`.

#### Products

<details>
<summary>listA_Products</summary>

Retrieves a collection of products with their general data, such as the product type, product group, base unit, weights and dimensions. Expand navigation properties such as `to_Description` or `to_Plant` to include related data in the same request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_ProductsQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_ProductWrapper|error`

Sample code:

```ballerina
product:CollectionOfA_ProductWrapper products = check productClient->listA_Products(
    queries = {
        \$filter: "ProductType eq 'HAWA'",
        \$select: ["Product", "ProductType", "ProductGroup", "BaseUnit", "to_Description"],
        \$expand: ["to_Description"],
        \$orderby: ["Product"],
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
        "Product": "TG11",
        "ProductType": "HAWA",
        "ProductGroup": "L001",
        "BaseUnit": "PC",
        "to_Description": {
          "results": [
            {
              "Product": "TG11",
              "Language": "EN",
              "ProductDescription": "Trading Good 11, PD"
            },
            {
              "Product": "TG11",
              "Language": "DE",
              "ProductDescription": "Handelsware 11, PD"
            }
          ]
        }
      },
      {
        "Product": "TG12",
        "ProductType": "HAWA",
        "ProductGroup": "L001",
        "BaseUnit": "PC",
        "to_Description": {
          "results": [
            {
              "Product": "TG12",
              "Language": "EN",
              "ProductDescription": "Trading Good 12, PD"
            }
          ]
        }
      }
    ]
  }
}
```

</details>

<details>
<summary>createA_Product</summary>

Creates a product with its general data. The payload can also contain the navigation properties `to_Description`, `to_Plant`, `to_SalesDelivery`, `to_Valuation` and the other `to_` properties, so that SAP creates the product with its descriptions and organizational data in one deep insert request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateA_Product` | Yes | Product general data with the required key field `Product`, plus fields such as `ProductType`, `BaseUnit` and `ProductGroup`, and optional `to_` navigation properties for a deep insert. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_ProductWrapper|error`

Sample code:

```ballerina
product:A_ProductWrapper productData = check productClient->createA_Product({
    Product: "TG21",
    ProductType: "HAWA",
    BaseUnit: "PC",
    ProductGroup: "L001",
    IndustrySector: "M",
    GrossWeight: "1.250",
    NetWeight: "1.000",
    WeightUnit: "KG",
    to_Description: {
        results: [
            {Product: "TG21", Language: "EN", ProductDescription: "Trading Good 21"}
        ]
    },
    to_Plant: {
        results: [
            {Product: "TG21", Plant: "1710", MRPType: "PD", ProcurementType: "F", AvailabilityCheckType: "02"}
        ]
    }
});
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG21",
    "ProductType": "HAWA",
    "CrossPlantStatus": "",
    "CreationDate": "/Date(1762819200000)/",
    "CreatedByUser": "CB9980000010",
    "IsMarkedForDeletion": false,
    "GrossWeight": "1.250",
    "WeightUnit": "KG",
    "NetWeight": "1.000",
    "ProductGroup": "L001",
    "BaseUnit": "PC",
    "ItemCategoryGroup": "NORM",
    "Division": "",
    "IndustrySector": "M",
    "to_Description": {
      "results": [
        {
          "Product": "TG21",
          "Language": "EN",
          "ProductDescription": "Trading Good 21"
        }
      ]
    },
    "to_Plant": {
      "results": [
        {
          "Product": "TG21",
          "Plant": "1710",
          "MRPType": "PD",
          "ProcurementType": "F",
          "AvailabilityCheckType": "02"
        }
      ]
    }
  }
}
```

</details>

<details>
<summary>getA_Product</summary>

Retrieves the general data of a single product by its product number. Use `$expand` with navigation properties such as `to_Description`, `to_Plant` or `to_SalesDelivery` to include related data.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_ProductQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_ProductWrapper|error`

Sample code:

```ballerina
product:A_ProductWrapper productData = check productClient->getA_Product("TG11");
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG11",
    "ProductType": "HAWA",
    "CrossPlantStatus": "",
    "CreationDate": "/Date(1704067200000)/",
    "CreatedByUser": "CB9980000010",
    "LastChangeDate": "/Date(1762819200000)/",
    "LastChangedByUser": "CB9980000010",
    "IsMarkedForDeletion": false,
    "ProductOldID": "",
    "GrossWeight": "1.250",
    "WeightUnit": "KG",
    "NetWeight": "1.000",
    "ProductGroup": "L001",
    "BaseUnit": "PC",
    "ItemCategoryGroup": "NORM",
    "Division": "00",
    "MaterialVolume": "0.000",
    "VolumeUnit": "",
    "IndustrySector": "M",
    "IsBatchManagementRequired": false,
    "ProductIsConfigurable": false
  }
}
```

</details>

<details>
<summary>patchA_Product</summary>

Updates the general data of a product using a PATCH request, for example the product group, weights or the deletion flag. To flag a product for deletion, set `IsMarkedForDeletion` to `true`.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `payload` | `UpdateA_ProductWrapper` | Yes | Wraps an `UpdateA_Product` record with the fields to change, for example `ProductGroup` and `GrossWeight`, in the `d` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check productClient->patchA_Product(
    "TG11",
    {d: {ProductGroup: "L002", GrossWeight: "1.300"}}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</details>

#### Product descriptions

<details>
<summary>listA_ProductDescriptions</summary>

Retrieves a collection of product descriptions. A product has one short description for each language.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_ProductDescriptionsQueries` | No | OData query parameters: `$filter`, `$select`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_ProductDescriptionWrapper|error`

Sample code:

```ballerina
product:CollectionOfA_ProductDescriptionWrapper descriptions = check productClient->listA_ProductDescriptions(
    queries = {
        \$filter: "Language eq 'EN'",
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
        "Product": "TG11",
        "Language": "EN",
        "ProductDescription": "Trading Good 11, PD"
      },
      {
        "Product": "TG12",
        "Language": "EN",
        "ProductDescription": "Trading Good 12, PD"
      }
    ]
  }
}
```

</details>

<details>
<summary>createA_ProductDescription</summary>

Creates the description of a product in a language.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateA_ProductDescription` | Yes | Description with the required key fields `Product` and `Language`, plus fields such as `ProductDescription`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_ProductDescriptionWrapper|error`

Sample code:

```ballerina
product:A_ProductDescriptionWrapper description = check productClient->createA_ProductDescription({
    Product: "TG11",
    Language: "DE",
    ProductDescription: "Handelsware 11, PD"
});
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG11",
    "Language": "DE",
    "ProductDescription": "Handelsware 11, PD"
  }
}
```

</details>

<details>
<summary>getA_ProductDescription</summary>

Retrieves the description of a specific product in a specific language.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `Language` | `string` | Yes | Language key (e.g., `"EN"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_ProductDescriptionQueries` | No | OData query parameters: `$select`. |

Returns: `A_ProductDescriptionWrapper|error`

Sample code:

```ballerina
product:A_ProductDescriptionWrapper description = check productClient->getA_ProductDescription("TG11", "EN");
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG11",
    "Language": "EN",
    "ProductDescription": "Trading Good 11, PD"
  }
}
```

</details>

<details>
<summary>patchA_ProductDescription</summary>

Updates the description of a product in a language using a PATCH request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `Language` | `string` | Yes | Language key (e.g., `"EN"`). |
| `payload` | `UpdateA_ProductDescriptionWrapper` | Yes | Wraps an `UpdateA_ProductDescription` record (`ProductDescription`) in the `d` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check productClient->patchA_ProductDescription(
    "TG11",
    "EN",
    {d: {ProductDescription: "Trading Good 11, packed"}}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</details>

<details>
<summary>deleteA_ProductDescription</summary>

Deletes the description of a product in a language.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `Language` | `string` | Yes | Language key (e.g., `"DE"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check productClient->deleteA_ProductDescription("TG11", "DE");
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</details>

<details>
<summary>listDescriptionsOfA_Product</summary>

Retrieves the descriptions of a specific product through the `to_Description` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListDescriptionsOfA_ProductQueries` | No | OData query parameters: `$filter`, `$select`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_ProductDescriptionWrapper|error`

Sample code:

```ballerina
product:CollectionOfA_ProductDescriptionWrapper descriptions = check productClient->listDescriptionsOfA_Product("TG11");
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "Product": "TG11",
        "Language": "EN",
        "ProductDescription": "Trading Good 11, PD"
      },
      {
        "Product": "TG11",
        "Language": "DE",
        "ProductDescription": "Handelsware 11, PD"
      }
    ]
  }
}
```

</details>

<details>
<summary>createDescriptionOfA_Product</summary>

Creates a description through the `to_Description` navigation of a specific product.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `payload` | `CreateA_ProductDescription` | Yes | Description with the required key fields `Product` and `Language`, plus fields such as `ProductDescription`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_ProductDescriptionWrapper|error`

Sample code:

```ballerina
product:A_ProductDescriptionWrapper description = check productClient->createDescriptionOfA_Product(
    "TG11",
    {
        Product: "TG11",
        Language: "DE",
        ProductDescription: "Handelsware 11, PD"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG11",
    "Language": "DE",
    "ProductDescription": "Handelsware 11, PD"
  }
}
```

</details>

#### Basic data texts

<details>
<summary>listA_ProductBasicTexts</summary>

Retrieves a collection of basic data texts, the long texts that describe products in each language.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_ProductBasicTextsQueries` | No | OData query parameters: `$filter`, `$select`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_ProductBasicTextWrapper|error`

Sample code:

```ballerina
product:CollectionOfA_ProductBasicTextWrapper basicTexts = check productClient->listA_ProductBasicTexts(
    queries = {
        \$filter: "Language eq 'EN'",
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
        "Product": "TG11",
        "Language": "EN",
        "LongText": "Stainless steel trading good, sold in single pieces."
      },
      {
        "Product": "TG12",
        "Language": "EN",
        "LongText": "Aluminium trading good, sold in single pieces."
      }
    ]
  }
}
```

</details>

<details>
<summary>createA_ProductBasicText</summary>

Creates the basic data text of a product in a language.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateA_ProductBasicText` | Yes | Basic data text with the required key fields `Product` and `Language`, plus fields such as `LongText`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_ProductBasicTextWrapper|error`

Sample code:

```ballerina
product:A_ProductBasicTextWrapper basicText = check productClient->createA_ProductBasicText({
    Product: "TG11",
    Language: "EN",
    LongText: "Stainless steel trading good, sold in single pieces."
});
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG11",
    "Language": "EN",
    "LongText": "Stainless steel trading good, sold in single pieces."
  }
}
```

</details>

<details>
<summary>getA_ProductBasicText</summary>

Retrieves the basic data text of a specific product in a specific language.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `Language` | `string` | Yes | Language key (e.g., `"EN"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_ProductBasicTextQueries` | No | OData query parameters: `$select`. |

Returns: `A_ProductBasicTextWrapper|error`

Sample code:

```ballerina
product:A_ProductBasicTextWrapper basicText = check productClient->getA_ProductBasicText("TG11", "EN");
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG11",
    "Language": "EN",
    "LongText": "Stainless steel trading good, sold in single pieces."
  }
}
```

</details>

<details>
<summary>patchA_ProductBasicText</summary>

Updates the basic data text of a product in a language using a PATCH request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `Language` | `string` | Yes | Language key (e.g., `"EN"`). |
| `payload` | `UpdateA_ProductBasicTextWrapper` | Yes | Wraps an `UpdateA_ProductBasicText` record (`LongText`) in the `d` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check productClient->patchA_ProductBasicText(
    "TG11",
    "EN",
    {d: {LongText: "Stainless steel trading good, sold in single pieces and in cartons of 12."}}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</details>

<details>
<summary>deleteA_ProductBasicText</summary>

Deletes the basic data text of a product in a language.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `Language` | `string` | Yes | Language key (e.g., `"EN"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check productClient->deleteA_ProductBasicText("TG11", "EN");
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</details>

<details>
<summary>listProductBasicTextsOfA_Product</summary>

Retrieves the basic data texts of a specific product through the `to_ProductBasicText` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListProductBasicTextsOfA_ProductQueries` | No | OData query parameters: `$filter`, `$select`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_ProductBasicTextWrapper|error`

Sample code:

```ballerina
product:CollectionOfA_ProductBasicTextWrapper basicTexts = check productClient->listProductBasicTextsOfA_Product("TG11");
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "Product": "TG11",
        "Language": "EN",
        "LongText": "Stainless steel trading good, sold in single pieces."
      }
    ]
  }
}
```

</details>

<details>
<summary>createProductBasicTextOfA_Product</summary>

Creates a basic data text through the `to_ProductBasicText` navigation of a specific product.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `payload` | `CreateA_ProductBasicText` | Yes | Basic data text with the required key fields `Product` and `Language`, plus fields such as `LongText`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_ProductBasicTextWrapper|error`

Sample code:

```ballerina
product:A_ProductBasicTextWrapper basicText = check productClient->createProductBasicTextOfA_Product(
    "TG11",
    {
        Product: "TG11",
        Language: "EN",
        LongText: "Stainless steel trading good, sold in single pieces."
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG11",
    "Language": "EN",
    "LongText": "Stainless steel trading good, sold in single pieces."
  }
}
```

</details>

#### Purchase order texts

<details>
<summary>listA_ProductPurchaseTexts</summary>

Retrieves a collection of purchase order texts, the long texts that SAP copies into purchase order items for the product.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_ProductPurchaseTextsQueries` | No | OData query parameters: `$filter`, `$select`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_ProductPurchaseTextWrapper|error`

Sample code:

```ballerina
product:CollectionOfA_ProductPurchaseTextWrapper purchaseTexts = check productClient->listA_ProductPurchaseTexts(
    queries = {
        \$filter: "Language eq 'EN'",
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
        "Product": "TG11",
        "Language": "EN",
        "LongText": "Order in multiples of 12 pieces. Include the certificate of origin."
      },
      {
        "Product": "TG12",
        "Language": "EN",
        "LongText": "Deliver on pallets. Include the material safety data sheet."
      }
    ]
  }
}
```

</details>

<details>
<summary>createA_ProductPurchaseText</summary>

Creates the purchase order text of a product in a language.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateA_ProductPurchaseText` | Yes | Purchase order text with the required key fields `Product` and `Language`, plus fields such as `LongText`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_ProductPurchaseTextWrapper|error`

Sample code:

```ballerina
product:A_ProductPurchaseTextWrapper purchaseText = check productClient->createA_ProductPurchaseText({
    Product: "TG11",
    Language: "EN",
    LongText: "Order in multiples of 12 pieces. Include the certificate of origin."
});
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG11",
    "Language": "EN",
    "LongText": "Order in multiples of 12 pieces. Include the certificate of origin."
  }
}
```

</details>

<details>
<summary>getA_ProductPurchaseText</summary>

Retrieves the purchase order text of a specific product in a specific language.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `Language` | `string` | Yes | Language key (e.g., `"EN"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_ProductPurchaseTextQueries` | No | OData query parameters: `$select`. |

Returns: `A_ProductPurchaseTextWrapper|error`

Sample code:

```ballerina
product:A_ProductPurchaseTextWrapper purchaseText = check productClient->getA_ProductPurchaseText("TG11", "EN");
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG11",
    "Language": "EN",
    "LongText": "Order in multiples of 12 pieces. Include the certificate of origin."
  }
}
```

</details>

<details>
<summary>patchA_ProductPurchaseText</summary>

Updates the purchase order text of a product in a language using a PATCH request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `Language` | `string` | Yes | Language key (e.g., `"EN"`). |
| `payload` | `UpdateA_ProductPurchaseTextWrapper` | Yes | Wraps an `UpdateA_ProductPurchaseText` record (`LongText`) in the `d` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check productClient->patchA_ProductPurchaseText(
    "TG11",
    "EN",
    {d: {LongText: "Order in multiples of 24 pieces. Include the certificate of origin."}}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</details>

<details>
<summary>deleteA_ProductPurchaseText</summary>

Deletes the purchase order text of a product in a language.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `Language` | `string` | Yes | Language key (e.g., `"EN"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check productClient->deleteA_ProductPurchaseText("TG11", "EN");
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</details>

<details>
<summary>listProductPurchaseTextsOfA_Product</summary>

Retrieves the purchase order texts of a specific product through the `to_ProductPurchaseText` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListProductPurchaseTextsOfA_ProductQueries` | No | OData query parameters: `$filter`, `$select`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_ProductPurchaseTextWrapper|error`

Sample code:

```ballerina
product:CollectionOfA_ProductPurchaseTextWrapper purchaseTexts = check productClient->listProductPurchaseTextsOfA_Product("TG11");
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "Product": "TG11",
        "Language": "EN",
        "LongText": "Order in multiples of 12 pieces. Include the certificate of origin."
      }
    ]
  }
}
```

</details>

<details>
<summary>createProductPurchaseTextOfA_Product</summary>

Creates a purchase order text through the `to_ProductPurchaseText` navigation of a specific product.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `payload` | `CreateA_ProductPurchaseText` | Yes | Purchase order text with the required key fields `Product` and `Language`, plus fields such as `LongText`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_ProductPurchaseTextWrapper|error`

Sample code:

```ballerina
product:A_ProductPurchaseTextWrapper purchaseText = check productClient->createProductPurchaseTextOfA_Product(
    "TG11",
    {
        Product: "TG11",
        Language: "EN",
        LongText: "Order in multiples of 12 pieces. Include the certificate of origin."
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG11",
    "Language": "EN",
    "LongText": "Order in multiples of 12 pieces. Include the certificate of origin."
  }
}
```

</details>

#### Inspection texts

<details>
<summary>listA_ProductInspectionTexts</summary>

Retrieves a collection of inspection texts, the long texts with instructions for the quality inspection of the product.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_ProductInspectionTextsQueries` | No | OData query parameters: `$filter`, `$select`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_ProductInspectionTextWrapper|error`

Sample code:

```ballerina
product:CollectionOfA_ProductInspectionTextWrapper inspectionTexts = check productClient->listA_ProductInspectionTexts(
    queries = {
        \$filter: "Language eq 'EN'",
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
        "Product": "TG11",
        "Language": "EN",
        "LongText": "Check the surface for scratches and verify the dimensions against the drawing."
      },
      {
        "Product": "TG12",
        "Language": "EN",
        "LongText": "Check the packaging seal and the expiry date."
      }
    ]
  }
}
```

</details>

<details>
<summary>createA_ProductInspectionText</summary>

Creates the inspection text of a product in a language.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateA_ProductInspectionText` | Yes | Inspection text with the required key fields `Product` and `Language`, plus fields such as `LongText`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_ProductInspectionTextWrapper|error`

Sample code:

```ballerina
product:A_ProductInspectionTextWrapper inspectionText = check productClient->createA_ProductInspectionText({
    Product: "TG11",
    Language: "EN",
    LongText: "Check the surface for scratches and verify the dimensions against the drawing."
});
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG11",
    "Language": "EN",
    "LongText": "Check the surface for scratches and verify the dimensions against the drawing."
  }
}
```

</details>

<details>
<summary>getA_ProductInspectionText</summary>

Retrieves the inspection text of a specific product in a specific language.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `Language` | `string` | Yes | Language key (e.g., `"EN"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_ProductInspectionTextQueries` | No | OData query parameters: `$select`. |

Returns: `A_ProductInspectionTextWrapper|error`

Sample code:

```ballerina
product:A_ProductInspectionTextWrapper inspectionText = check productClient->getA_ProductInspectionText("TG11", "EN");
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG11",
    "Language": "EN",
    "LongText": "Check the surface for scratches and verify the dimensions against the drawing."
  }
}
```

</details>

<details>
<summary>patchA_ProductInspectionText</summary>

Updates the inspection text of a product in a language using a PATCH request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `Language` | `string` | Yes | Language key (e.g., `"EN"`). |
| `payload` | `UpdateA_ProductInspectionTextWrapper` | Yes | Wraps an `UpdateA_ProductInspectionText` record (`LongText`) in the `d` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check productClient->patchA_ProductInspectionText(
    "TG11",
    "EN",
    {d: {LongText: "Check the surface for scratches, verify the dimensions and weigh a sample of 5 pieces."}}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</details>

<details>
<summary>deleteA_ProductInspectionText</summary>

Deletes the inspection text of a product in a language.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `Language` | `string` | Yes | Language key (e.g., `"EN"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check productClient->deleteA_ProductInspectionText("TG11", "EN");
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</details>

<details>
<summary>listProductInspectionTextsOfA_Product</summary>

Retrieves the inspection texts of a specific product through the `to_ProductInspectionText` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListProductInspectionTextsOfA_ProductQueries` | No | OData query parameters: `$filter`, `$select`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_ProductInspectionTextWrapper|error`

Sample code:

```ballerina
product:CollectionOfA_ProductInspectionTextWrapper inspectionTexts = check productClient->listProductInspectionTextsOfA_Product("TG11");
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "Product": "TG11",
        "Language": "EN",
        "LongText": "Check the surface for scratches and verify the dimensions against the drawing."
      }
    ]
  }
}
```

</details>

<details>
<summary>createProductInspectionTextOfA_Product</summary>

Creates an inspection text through the `to_ProductInspectionText` navigation of a specific product.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `payload` | `CreateA_ProductInspectionText` | Yes | Inspection text with the required key fields `Product` and `Language`, plus fields such as `LongText`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_ProductInspectionTextWrapper|error`

Sample code:

```ballerina
product:A_ProductInspectionTextWrapper inspectionText = check productClient->createProductInspectionTextOfA_Product(
    "TG11",
    {
        Product: "TG11",
        Language: "EN",
        LongText: "Check the surface for scratches and verify the dimensions against the drawing."
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG11",
    "Language": "EN",
    "LongText": "Check the surface for scratches and verify the dimensions against the drawing."
  }
}
```

</details>

#### Units of measure

<details>
<summary>listA_ProductUnitsOfMeasures</summary>

Retrieves a collection of product units of measure, with the conversion factors to the base unit, weights, volumes and dimensions of each unit.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_ProductUnitsOfMeasuresQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_ProductUnitsOfMeasureWrapper|error`

Sample code:

```ballerina
product:CollectionOfA_ProductUnitsOfMeasureWrapper unitsOfMeasure = check productClient->listA_ProductUnitsOfMeasures(
    queries = {
        \$filter: "Product eq 'TG11'",
        \$select: ["Product", "AlternativeUnit", "QuantityNumerator", "QuantityDenominator", "BaseUnit"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "Product": "TG11",
        "AlternativeUnit": "PC",
        "QuantityNumerator": "1",
        "QuantityDenominator": "1",
        "BaseUnit": "PC"
      },
      {
        "Product": "TG11",
        "AlternativeUnit": "CAR",
        "QuantityNumerator": "12",
        "QuantityDenominator": "1",
        "BaseUnit": "PC"
      }
    ]
  }
}
```

</details>

<details>
<summary>createA_ProductUnitsOfMeasure</summary>

Creates an alternative unit of measure for a product. `QuantityNumerator` and `QuantityDenominator` define how many base units make up the alternative unit.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateA_ProductUnitsOfMeasure` | Yes | Unit of measure with the required key fields `Product` and `AlternativeUnit`, plus fields such as `QuantityNumerator`, `QuantityDenominator` and `GrossWeight`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_ProductUnitsOfMeasureWrapper|error`

Sample code:

```ballerina
product:A_ProductUnitsOfMeasureWrapper unitOfMeasure = check productClient->createA_ProductUnitsOfMeasure({
    Product: "TG11",
    AlternativeUnit: "PAL",
    QuantityNumerator: "480",
    QuantityDenominator: "1",
    GrossWeight: "640.000",
    WeightUnit: "KG"
});
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG11",
    "AlternativeUnit": "PAL",
    "QuantityNumerator": "480",
    "QuantityDenominator": "1",
    "GrossWeight": "640.000",
    "WeightUnit": "KG"
  }
}
```

</details>

<details>
<summary>getA_ProductUnitsOfMeasure</summary>

Retrieves a specific alternative unit of measure of a product. Expand `to_InternationalArticleNumber` to include the GTINs of the unit.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `AlternativeUnit` | `string` | Yes | Alternative unit of measure (e.g., `"CAR"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_ProductUnitsOfMeasureQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_ProductUnitsOfMeasureWrapper|error`

Sample code:

```ballerina
product:A_ProductUnitsOfMeasureWrapper unitOfMeasure = check productClient->getA_ProductUnitsOfMeasure("TG11", "CAR");
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG11",
    "AlternativeUnit": "CAR",
    "QuantityNumerator": "12",
    "QuantityDenominator": "1",
    "MaterialVolume": "0.040",
    "VolumeUnit": "M3",
    "GrossWeight": "15.500",
    "WeightUnit": "KG",
    "GlobalTradeItemNumber": "4006381333931",
    "GlobalTradeItemNumberCategory": "HE",
    "UnitSpecificProductLength": "40.000",
    "UnitSpecificProductWidth": "30.000",
    "UnitSpecificProductHeight": "33.000",
    "ProductMeasurementUnit": "CM",
    "LowerLevelPackagingUnit": "PC",
    "BaseUnit": "PC"
  }
}
```

</details>

<details>
<summary>patchA_ProductUnitsOfMeasure</summary>

Updates an alternative unit of measure of a product using a PATCH request, for example its conversion factors, weight or dimensions.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `AlternativeUnit` | `string` | Yes | Alternative unit of measure (e.g., `"CAR"`). |
| `payload` | `UpdateA_ProductUnitsOfMeasureWrapper` | Yes | Wraps an `UpdateA_ProductUnitsOfMeasure` record with the fields to change, for example `GrossWeight`, in the `d` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check productClient->patchA_ProductUnitsOfMeasure(
    "TG11",
    "CAR",
    {d: {GrossWeight: "15.800"}}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</details>

<details>
<summary>deleteA_ProductUnitsOfMeasure</summary>

Deletes an alternative unit of measure of a product. The base unit of measure can't be deleted.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `AlternativeUnit` | `string` | Yes | Alternative unit of measure (e.g., `"PAL"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check productClient->deleteA_ProductUnitsOfMeasure("TG11", "PAL");
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</details>

<details>
<summary>listProductUnitsOfMeasuresOfA_Product</summary>

Retrieves the units of measure of a specific product through the `to_ProductUnitsOfMeasure` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListProductUnitsOfMeasuresOfA_ProductQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_ProductUnitsOfMeasureWrapper|error`

Sample code:

```ballerina
product:CollectionOfA_ProductUnitsOfMeasureWrapper unitsOfMeasure = check productClient->listProductUnitsOfMeasuresOfA_Product(
    "TG11",
    queries = {
        \$select: ["AlternativeUnit", "QuantityNumerator", "QuantityDenominator", "BaseUnit"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "AlternativeUnit": "PC",
        "QuantityNumerator": "1",
        "QuantityDenominator": "1",
        "BaseUnit": "PC"
      },
      {
        "AlternativeUnit": "CAR",
        "QuantityNumerator": "12",
        "QuantityDenominator": "1",
        "BaseUnit": "PC"
      }
    ]
  }
}
```

</details>

<details>
<summary>createProductUnitsOfMeasureOfA_Product</summary>

Creates a unit of measure through the `to_ProductUnitsOfMeasure` navigation of a specific product.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `payload` | `CreateA_ProductUnitsOfMeasure` | Yes | Unit of measure with the required key fields `Product` and `AlternativeUnit`, plus fields such as `QuantityNumerator`, `QuantityDenominator` and `GrossWeight`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_ProductUnitsOfMeasureWrapper|error`

Sample code:

```ballerina
product:A_ProductUnitsOfMeasureWrapper unitOfMeasure = check productClient->createProductUnitsOfMeasureOfA_Product(
    "TG11",
    {
        Product: "TG11",
        AlternativeUnit: "PAL",
        QuantityNumerator: "480",
        QuantityDenominator: "1",
        GrossWeight: "640.000",
        WeightUnit: "KG"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG11",
    "AlternativeUnit": "PAL",
    "QuantityNumerator": "480",
    "QuantityDenominator": "1",
    "GrossWeight": "640.000",
    "WeightUnit": "KG"
  }
}
```

</details>

#### Global trade item numbers

<details>
<summary>listA_ProductUnitsOfMeasureEANs</summary>

Retrieves a collection of global trade item numbers (GTINs, formerly EANs) assigned to the units of measure of products.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_ProductUnitsOfMeasureEANsQueries` | No | OData query parameters: `$filter`, `$select`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_ProductUnitsOfMeasureEANWrapper|error`

Sample code:

```ballerina
product:CollectionOfA_ProductUnitsOfMeasureEANWrapper gtins = check productClient->listA_ProductUnitsOfMeasureEANs(
    queries = {
        \$filter: "Product eq 'TG11' and AlternativeUnit eq 'CAR'"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "Product": "TG11",
        "AlternativeUnit": "CAR",
        "ConsecutiveNumber": "00001",
        "ProductStandardID": "4006381333931",
        "InternationalArticleNumberCat": "HE",
        "IsMainGlobalTradeItemNumber": true
      },
      {
        "Product": "TG11",
        "AlternativeUnit": "CAR",
        "ConsecutiveNumber": "00002",
        "ProductStandardID": "4012345678901",
        "InternationalArticleNumberCat": "HE",
        "IsMainGlobalTradeItemNumber": false
      }
    ]
  }
}
```

</details>

<details>
<summary>createA_ProductUnitsOfMeasureEAN</summary>

Assigns an additional GTIN to a unit of measure of a product. The GTIN must have a valid check digit.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateA_ProductUnitsOfMeasureEAN` | Yes | GTIN with the required key fields `Product`, `AlternativeUnit` and `ConsecutiveNumber`, plus fields such as `ProductStandardID`, `InternationalArticleNumberCat` and `IsMainGlobalTradeItemNumber`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_ProductUnitsOfMeasureEANWrapper|error`

Sample code:

```ballerina
product:A_ProductUnitsOfMeasureEANWrapper gtin = check productClient->createA_ProductUnitsOfMeasureEAN({
    Product: "TG11",
    AlternativeUnit: "CAR",
    ConsecutiveNumber: "00002",
    ProductStandardID: "4012345678901",
    InternationalArticleNumberCat: "HE",
    IsMainGlobalTradeItemNumber: false
});
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG11",
    "AlternativeUnit": "CAR",
    "ConsecutiveNumber": "00002",
    "ProductStandardID": "4012345678901",
    "InternationalArticleNumberCat": "HE",
    "IsMainGlobalTradeItemNumber": false
  }
}
```

</details>

<details>
<summary>getA_ProductUnitsOfMeasureEAN</summary>

Retrieves a specific GTIN of a product unit of measure by its consecutive number.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `AlternativeUnit` | `string` | Yes | Alternative unit of measure (e.g., `"CAR"`). |
| `ConsecutiveNumber` | `string` | Yes | Consecutive number of the GTIN (e.g., `"00001"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_ProductUnitsOfMeasureEANQueries` | No | OData query parameters: `$select`. |

Returns: `A_ProductUnitsOfMeasureEANWrapper|error`

Sample code:

```ballerina
product:A_ProductUnitsOfMeasureEANWrapper gtin = check productClient->getA_ProductUnitsOfMeasureEAN("TG11", "CAR", "00001");
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG11",
    "AlternativeUnit": "CAR",
    "ConsecutiveNumber": "00001",
    "ProductStandardID": "4006381333931",
    "InternationalArticleNumberCat": "HE",
    "IsMainGlobalTradeItemNumber": true
  }
}
```

</details>

<details>
<summary>patchA_ProductUnitsOfMeasureEAN</summary>

Updates a GTIN of a product unit of measure using a PATCH request, for example to change which GTIN is the main one.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `AlternativeUnit` | `string` | Yes | Alternative unit of measure (e.g., `"CAR"`). |
| `ConsecutiveNumber` | `string` | Yes | Consecutive number of the GTIN (e.g., `"00001"`). |
| `payload` | `UpdateA_ProductUnitsOfMeasureEANWrapper` | Yes | Wraps an `UpdateA_ProductUnitsOfMeasureEAN` record (`ProductStandardID`, `InternationalArticleNumberCat` and `IsMainGlobalTradeItemNumber`) in the `d` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check productClient->patchA_ProductUnitsOfMeasureEAN(
    "TG11",
    "CAR",
    "00001",
    {d: {IsMainGlobalTradeItemNumber: true}}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</details>

<details>
<summary>deleteA_ProductUnitsOfMeasureEAN</summary>

Deletes a GTIN from a unit of measure of a product.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `AlternativeUnit` | `string` | Yes | Alternative unit of measure (e.g., `"CAR"`). |
| `ConsecutiveNumber` | `string` | Yes | Consecutive number of the GTIN (e.g., `"00002"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check productClient->deleteA_ProductUnitsOfMeasureEAN("TG11", "CAR", "00002");
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</details>

<details>
<summary>listInternationalArticleNumbersOfA_ProductUnitsOfMeasure</summary>

Retrieves the global trade item numbers of a specific unit of measure through the `to_InternationalArticleNumber` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `AlternativeUnit` | `string` | Yes | Alternative unit of measure (e.g., `"CAR"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListInternationalArticleNumbersOfA_ProductUnitsOfMeasureQueries` | No | OData query parameters: `$filter`, `$select`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_ProductUnitsOfMeasureEANWrapper|error`

Sample code:

```ballerina
product:CollectionOfA_ProductUnitsOfMeasureEANWrapper gtins = check productClient->listInternationalArticleNumbersOfA_ProductUnitsOfMeasure("TG11", "CAR");
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "Product": "TG11",
        "AlternativeUnit": "CAR",
        "ConsecutiveNumber": "00001",
        "ProductStandardID": "4006381333931",
        "InternationalArticleNumberCat": "HE",
        "IsMainGlobalTradeItemNumber": true
      },
      {
        "Product": "TG11",
        "AlternativeUnit": "CAR",
        "ConsecutiveNumber": "00002",
        "ProductStandardID": "4012345678901",
        "InternationalArticleNumberCat": "HE",
        "IsMainGlobalTradeItemNumber": false
      }
    ]
  }
}
```

</details>

<details>
<summary>createInternationalArticleNumberOfA_ProductUnitsOfMeasure</summary>

Creates a GTIN through the `to_InternationalArticleNumber` navigation of a specific unit of measure.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `AlternativeUnit` | `string` | Yes | Alternative unit of measure (e.g., `"CAR"`). |
| `payload` | `CreateA_ProductUnitsOfMeasureEAN` | Yes | GTIN with the required key fields `Product`, `AlternativeUnit` and `ConsecutiveNumber`, plus fields such as `ProductStandardID`, `InternationalArticleNumberCat` and `IsMainGlobalTradeItemNumber`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_ProductUnitsOfMeasureEANWrapper|error`

Sample code:

```ballerina
product:A_ProductUnitsOfMeasureEANWrapper gtin = check productClient->createInternationalArticleNumberOfA_ProductUnitsOfMeasure(
    "TG11",
    "CAR",
    {
        Product: "TG11",
        AlternativeUnit: "CAR",
        ConsecutiveNumber: "00002",
        ProductStandardID: "4012345678901",
        InternationalArticleNumberCat: "HE",
        IsMainGlobalTradeItemNumber: false
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG11",
    "AlternativeUnit": "CAR",
    "ConsecutiveNumber": "00002",
    "ProductStandardID": "4012345678901",
    "InternationalArticleNumberCat": "HE",
    "IsMainGlobalTradeItemNumber": false
  }
}
```

</details>

#### Basic procurement data

<details>
<summary>listA_ProductProcurements</summary>

Retrieves a collection of basic procurement data records, with the purchase order unit and the variable order unit setting of each product.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_ProductProcurementsQueries` | No | OData query parameters: `$filter`, `$select`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_ProductProcurementWrapper|error`

Sample code:

```ballerina
product:CollectionOfA_ProductProcurementWrapper procurementData = check productClient->listA_ProductProcurements(
    queries = {
        \$filter: "PurchaseOrderQuantityUnit ne ''",
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
        "Product": "TG11",
        "PurchaseOrderQuantityUnit": "CAR",
        "VarblPurOrdUnitStatus": "1",
        "PurchasingAcknProfile": ""
      },
      {
        "Product": "TG12",
        "PurchaseOrderQuantityUnit": "PC",
        "VarblPurOrdUnitStatus": "",
        "PurchasingAcknProfile": ""
      }
    ]
  }
}
```

</details>

<details>
<summary>createA_ProductProcurement</summary>

Creates the basic procurement data of a product.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateA_ProductProcurement` | Yes | Basic procurement data with the required key field `Product`, plus fields such as `PurchaseOrderQuantityUnit`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_ProductProcurementWrapper|error`

Sample code:

```ballerina
product:A_ProductProcurementWrapper procurement = check productClient->createA_ProductProcurement({
    Product: "TG21",
    PurchaseOrderQuantityUnit: "PC"
});
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG21",
    "PurchaseOrderQuantityUnit": "PC",
    "VarblPurOrdUnitStatus": "1",
    "PurchasingAcknProfile": ""
  }
}
```

</details>

<details>
<summary>getA_ProductProcurement</summary>

Retrieves the basic procurement data of a specific product.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_ProductProcurementQueries` | No | OData query parameters: `$select`. |

Returns: `A_ProductProcurementWrapper|error`

Sample code:

```ballerina
product:A_ProductProcurementWrapper procurement = check productClient->getA_ProductProcurement("TG11");
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG11",
    "PurchaseOrderQuantityUnit": "CAR",
    "VarblPurOrdUnitStatus": "1",
    "PurchasingAcknProfile": ""
  }
}
```

</details>

<details>
<summary>patchA_ProductProcurement</summary>

Updates the basic procurement data of a product using a PATCH request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `payload` | `UpdateA_ProductProcurementWrapper` | Yes | Wraps an `UpdateA_ProductProcurement` record (`PurchaseOrderQuantityUnit`, `VarblPurOrdUnitStatus` and `PurchasingAcknProfile`) in the `d` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check productClient->patchA_ProductProcurement(
    "TG11",
    {d: {PurchaseOrderQuantityUnit: "PC"}}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</details>

<details>
<summary>getProductProcurementOfA_Product</summary>

Retrieves the basic procurement data of a specific product through the `to_ProductProcurement` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetProductProcurementOfA_ProductQueries` | No | OData query parameters: `$select`. |

Returns: `A_ProductProcurementWrapper|error`

Sample code:

```ballerina
product:A_ProductProcurementWrapper procurement = check productClient->getProductProcurementOfA_Product("TG11");
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG11",
    "PurchaseOrderQuantityUnit": "CAR",
    "VarblPurOrdUnitStatus": "1",
    "PurchasingAcknProfile": ""
  }
}
```

</details>

#### Basic quality management data

<details>
<summary>listA_ProductQualityMgmts</summary>

Retrieves a collection of basic quality management data records, which show whether quality management in procurement is active for each product.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_ProductQualityMgmtsQueries` | No | OData query parameters: `$filter`, `$select`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_ProductQualityMgmtWrapper|error`

Sample code:

```ballerina
product:CollectionOfA_ProductQualityMgmtWrapper qualityMgmtData = check productClient->listA_ProductQualityMgmts(
    queries = {
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
        "Product": "TG11",
        "QltyMgmtInProcmtIsActive": true
      },
      {
        "Product": "TG12",
        "QltyMgmtInProcmtIsActive": false
      }
    ]
  }
}
```

</details>

<details>
<summary>createA_ProductQualityMgmt</summary>

Creates the basic quality management data of a product.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateA_ProductQualityMgmt` | Yes | Basic quality management data with the required key field `Product`, plus fields such as `QltyMgmtInProcmtIsActive`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_ProductQualityMgmtWrapper|error`

Sample code:

```ballerina
product:A_ProductQualityMgmtWrapper qualityMgmt = check productClient->createA_ProductQualityMgmt({
    Product: "TG21",
    QltyMgmtInProcmtIsActive: true
});
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG21",
    "QltyMgmtInProcmtIsActive": true
  }
}
```

</details>

<details>
<summary>getA_ProductQualityMgmt</summary>

Retrieves the basic quality management data of a specific product.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_ProductQualityMgmtQueries` | No | OData query parameters: `$select`. |

Returns: `A_ProductQualityMgmtWrapper|error`

Sample code:

```ballerina
product:A_ProductQualityMgmtWrapper qualityMgmt = check productClient->getA_ProductQualityMgmt("TG11");
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG11",
    "QltyMgmtInProcmtIsActive": true
  }
}
```

</details>

<details>
<summary>patchA_ProductQualityMgmt</summary>

Updates the basic quality management data of a product using a PATCH request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `payload` | `UpdateA_ProductQualityMgmtWrapper` | Yes | Wraps an `UpdateA_ProductQualityMgmt` record (`QltyMgmtInProcmtIsActive`) in the `d` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check productClient->patchA_ProductQualityMgmt(
    "TG11",
    {d: {QltyMgmtInProcmtIsActive: false}}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</details>

<details>
<summary>getProductQualityMgmtOfA_Product</summary>

Retrieves the basic quality management data of a specific product through the `to_ProductQualityMgmt` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetProductQualityMgmtOfA_ProductQueries` | No | OData query parameters: `$select`. |

Returns: `A_ProductQualityMgmtWrapper|error`

Sample code:

```ballerina
product:A_ProductQualityMgmtWrapper qualityMgmt = check productClient->getProductQualityMgmtOfA_Product("TG11");
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG11",
    "QltyMgmtInProcmtIsActive": true
  }
}
```

</details>

#### Basic sales data

<details>
<summary>listA_ProductSaless</summary>

Retrieves a collection of basic sales data records, with the cross-distribution-chain sales status, tax classification and transportation group of each product.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_ProductSalessQueries` | No | OData query parameters: `$filter`, `$select`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_ProductSalesWrapper|error`

Sample code:

```ballerina
product:CollectionOfA_ProductSalesWrapper salesDataRecords = check productClient->listA_ProductSaless(
    queries = {
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
        "Product": "TG11",
        "SalesStatus": "",
        "SalesStatusValidityDate": null,
        "TaxClassification": "",
        "TransportationGroup": "0001"
      },
      {
        "Product": "TG12",
        "SalesStatus": "",
        "SalesStatusValidityDate": null,
        "TaxClassification": "",
        "TransportationGroup": "0002"
      }
    ]
  }
}
```

</details>

<details>
<summary>createA_ProductSales</summary>

Creates the basic sales data of a product.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateA_ProductSales` | Yes | Basic sales data with the required key field `Product`, plus fields such as `TransportationGroup`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_ProductSalesWrapper|error`

Sample code:

```ballerina
product:A_ProductSalesWrapper salesData = check productClient->createA_ProductSales({
    Product: "TG21",
    TransportationGroup: "0001"
});
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG21",
    "SalesStatus": "",
    "SalesStatusValidityDate": null,
    "TaxClassification": "",
    "TransportationGroup": "0001"
  }
}
```

</details>

<details>
<summary>getA_ProductSales</summary>

Retrieves the basic sales data of a specific product.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_ProductSalesQueries` | No | OData query parameters: `$select`. |

Returns: `A_ProductSalesWrapper|error`

Sample code:

```ballerina
product:A_ProductSalesWrapper salesData = check productClient->getA_ProductSales("TG11");
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG11",
    "SalesStatus": "",
    "SalesStatusValidityDate": null,
    "TaxClassification": "",
    "TransportationGroup": "0001"
  }
}
```

</details>

<details>
<summary>patchA_ProductSales</summary>

Updates the basic sales data of a product using a PATCH request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `payload` | `UpdateA_ProductSalesWrapper` | Yes | Wraps an `UpdateA_ProductSales` record with the fields to change, for example `TransportationGroup`, in the `d` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check productClient->patchA_ProductSales(
    "TG11",
    {d: {TransportationGroup: "0002"}}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</details>

<details>
<summary>getProductSalesOfA_Product</summary>

Retrieves the basic sales data of a specific product through the `to_ProductSales` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetProductSalesOfA_ProductQueries` | No | OData query parameters: `$select`. |

Returns: `A_ProductSalesWrapper|error`

Sample code:

```ballerina
product:A_ProductSalesWrapper salesData = check productClient->getProductSalesOfA_Product("TG11");
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG11",
    "SalesStatus": "",
    "SalesStatusValidityDate": null,
    "TaxClassification": "",
    "TransportationGroup": "0001"
  }
}
```

</details>

#### Basic storage data

<details>
<summary>listA_ProductStorages</summary>

Retrieves a collection of basic storage data records, with the storage conditions, label settings and shelf life data of each product.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_ProductStoragesQueries` | No | OData query parameters: `$filter`, `$select`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_ProductStorageWrapper|error`

Sample code:

```ballerina
product:CollectionOfA_ProductStorageWrapper storageDataRecords = check productClient->listA_ProductStorages(
    queries = {
        \$select: ["Product", "MinRemainingShelfLife", "TotalShelfLife", "BaseUnit"],
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
        "Product": "TG11",
        "MinRemainingShelfLife": "30",
        "TotalShelfLife": "365",
        "BaseUnit": "PC"
      },
      {
        "Product": "TG12",
        "MinRemainingShelfLife": "0",
        "TotalShelfLife": "0",
        "BaseUnit": "PC"
      }
    ]
  }
}
```

</details>

<details>
<summary>createA_ProductStorage</summary>

Creates the basic storage data of a product.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateA_ProductStorage` | Yes | Basic storage data with the required key field `Product`, plus fields such as `MinRemainingShelfLife`, `TotalShelfLife` and `ShelfLifeExpirationDatePeriod`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_ProductStorageWrapper|error`

Sample code:

```ballerina
product:A_ProductStorageWrapper storageData = check productClient->createA_ProductStorage({
    Product: "TG21",
    MinRemainingShelfLife: "30",
    TotalShelfLife: "365",
    ShelfLifeExpirationDatePeriod: "D"
});
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG21",
    "MinRemainingShelfLife": "30",
    "TotalShelfLife": "365",
    "ShelfLifeExpirationDatePeriod": "D"
  }
}
```

</details>

<details>
<summary>getA_ProductStorage</summary>

Retrieves the basic storage data of a specific product.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_ProductStorageQueries` | No | OData query parameters: `$select`. |

Returns: `A_ProductStorageWrapper|error`

Sample code:

```ballerina
product:A_ProductStorageWrapper storageData = check productClient->getA_ProductStorage("TG11");
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG11",
    "StorageConditions": "",
    "TemperatureConditionInd": "",
    "HazardousMaterialNumber": "",
    "NmbrOfGROrGISlipsToPrintQty": "0",
    "LabelType": "",
    "LabelForm": "",
    "MinRemainingShelfLife": "30",
    "ExpirationDate": "",
    "ShelfLifeExpirationDatePeriod": "D",
    "TotalShelfLife": "365",
    "BaseUnit": "PC"
  }
}
```

</details>

<details>
<summary>patchA_ProductStorage</summary>

Updates the basic storage data of a product using a PATCH request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `payload` | `UpdateA_ProductStorageWrapper` | Yes | Wraps an `UpdateA_ProductStorage` record with the fields to change, for example `MinRemainingShelfLife`, in the `d` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check productClient->patchA_ProductStorage(
    "TG11",
    {d: {MinRemainingShelfLife: "45"}}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</details>

<details>
<summary>getProductStorageOfA_Product</summary>

Retrieves the basic storage data of a specific product through the `to_ProductStorage` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetProductStorageOfA_ProductQueries` | No | OData query parameters: `$select`. |

Returns: `A_ProductStorageWrapper|error`

Sample code:

```ballerina
product:A_ProductStorageWrapper storageData = check productClient->getProductStorageOfA_Product("TG11");
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG11",
    "StorageConditions": "",
    "TemperatureConditionInd": "",
    "HazardousMaterialNumber": "",
    "NmbrOfGROrGISlipsToPrintQty": "0",
    "LabelType": ""
  }
}
```

</details>

#### Plant data

<details>
<summary>listA_ProductPlants</summary>

Retrieves a collection of product plant data records, with the MRP, procurement, availability check, profit center and batch management settings of each product in each plant.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_ProductPlantsQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_ProductPlantWrapper|error`

Sample code:

```ballerina
product:CollectionOfA_ProductPlantWrapper plants = check productClient->listA_ProductPlants(
    queries = {
        \$filter: "Plant eq '1710'",
        \$select: ["Product", "Plant", "MRPType", "ProcurementType", "PurchasingGroup"],
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
        "Product": "TG11",
        "Plant": "1710",
        "MRPType": "PD",
        "ProcurementType": "F",
        "PurchasingGroup": "001"
      },
      {
        "Product": "TG12",
        "Plant": "1710",
        "MRPType": "VB",
        "ProcurementType": "F",
        "PurchasingGroup": "001"
      }
    ]
  }
}
```

</details>

<details>
<summary>createA_ProductPlant</summary>

Extends a product to a plant by creating its plant data. The payload can also contain the plant level navigation properties, such as `to_StorageLocation` and `to_ProductSupplyPlanning`.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateA_ProductPlant` | Yes | Plant data with the required key fields `Product` and `Plant`, plus fields such as `PurchasingGroup`, `AvailabilityCheckType` and `ProfitCenter`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_ProductPlantWrapper|error`

Sample code:

```ballerina
product:A_ProductPlantWrapper plantData = check productClient->createA_ProductPlant({
    Product: "TG11",
    Plant: "1720",
    PurchasingGroup: "001",
    AvailabilityCheckType: "02",
    ProfitCenter: "YB101",
    MRPType: "PD",
    MRPResponsible: "001",
    ProcurementType: "F"
});
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG11",
    "Plant": "1720",
    "PurchasingGroup": "001",
    "AvailabilityCheckType": "02",
    "ProfitCenter": "YB101",
    "MRPType": "PD",
    "MRPResponsible": "001",
    "ProcurementType": "F"
  }
}
```

</details>

<details>
<summary>getA_ProductPlant</summary>

Retrieves the plant data of a specific product in a specific plant. Use `$expand` with navigation properties such as `to_StorageLocation`, `to_ProductSupplyPlanning` or `to_PlantSales` to include related data.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `Plant` | `string` | Yes | Plant (e.g., `"1710"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_ProductPlantQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_ProductPlantWrapper|error`

Sample code:

```ballerina
product:A_ProductPlantWrapper plantData = check productClient->getA_ProductPlant("TG11", "1710");
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG11",
    "Plant": "1710",
    "PurchasingGroup": "001",
    "CountryOfOrigin": "US",
    "AvailabilityCheckType": "02",
    "ProfitCenter": "YB101",
    "MRPType": "PD",
    "MRPResponsible": "001",
    "MinimumLotSizeQuantity": "0.000",
    "MaximumLotSizeQuantity": "0.000",
    "FixedLotSizeQuantity": "0.000",
    "ProcurementType": "F",
    "IsBatchManagementRequired": false,
    "IsNegativeStockAllowed": false,
    "IsMarkedForDeletion": false,
    "SerialNumberProfile": "",
    "BaseUnit": "PC"
  }
}
```

</details>

<details>
<summary>patchA_ProductPlant</summary>

Updates the plant data of a product using a PATCH request, for example the purchasing group, MRP settings or the deletion flag.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `Plant` | `string` | Yes | Plant (e.g., `"1710"`). |
| `payload` | `UpdateA_ProductPlantWrapper` | Yes | Wraps an `UpdateA_ProductPlant` record with the fields to change, for example `PurchasingGroup`, in the `d` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check productClient->patchA_ProductPlant(
    "TG11",
    "1710",
    {d: {PurchasingGroup: "002"}}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</details>

<details>
<summary>listPlantsOfA_Product</summary>

Retrieves the plant data of a specific product through the `to_Plant` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListPlantsOfA_ProductQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_ProductPlantWrapper|error`

Sample code:

```ballerina
product:CollectionOfA_ProductPlantWrapper plants = check productClient->listPlantsOfA_Product(
    "TG11",
    queries = {
        \$select: ["Plant", "MRPType", "ProcurementType", "ProfitCenter"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "Plant": "1710",
        "MRPType": "PD",
        "ProcurementType": "F",
        "ProfitCenter": "YB101"
      },
      {
        "Plant": "1720",
        "MRPType": "PD",
        "ProcurementType": "F",
        "ProfitCenter": "YB101"
      }
    ]
  }
}
```

</details>

<details>
<summary>createPlantOfA_Product</summary>

Creates plant data through the `to_Plant` navigation of a specific product.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `payload` | `CreateA_ProductPlant` | Yes | Plant data with the required key fields `Product` and `Plant`, plus fields such as `PurchasingGroup`, `AvailabilityCheckType` and `ProfitCenter`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_ProductPlantWrapper|error`

Sample code:

```ballerina
product:A_ProductPlantWrapper plantData = check productClient->createPlantOfA_Product(
    "TG11",
    {
        Product: "TG11",
        Plant: "1720",
        PurchasingGroup: "001",
        AvailabilityCheckType: "02",
        ProfitCenter: "YB101",
        MRPType: "PD",
        MRPResponsible: "001",
        ProcurementType: "F"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG11",
    "Plant": "1720",
    "PurchasingGroup": "001",
    "AvailabilityCheckType": "02",
    "ProfitCenter": "YB101",
    "MRPType": "PD",
    "MRPResponsible": "001",
    "ProcurementType": "F"
  }
}
```

</details>

#### Plant texts

<details>
<summary>listA_ProductPlantTexts</summary>

Retrieves a collection of plant texts, the plant specific long texts of products.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_ProductPlantTextsQueries` | No | OData query parameters: `$filter`, `$select`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_ProductPlantTextWrapper|error`

Sample code:

```ballerina
product:CollectionOfA_ProductPlantTextWrapper plantTexts = check productClient->listA_ProductPlantTexts(
    queries = {
        \$filter: "Plant eq '1710'",
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
        "Product": "TG11",
        "Plant": "1710",
        "LongText": "Store in the dry goods area. Reorder from the regional distribution center."
      },
      {
        "Product": "TG12",
        "Plant": "1710",
        "LongText": "Store on the ground floor racks only."
      }
    ]
  }
}
```

</details>

<details>
<summary>createA_ProductPlantText</summary>

Creates the plant text of a product in a plant.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateA_ProductPlantText` | Yes | Plant text with the required key fields `Product` and `Plant`, plus fields such as `LongText`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_ProductPlantTextWrapper|error`

Sample code:

```ballerina
product:A_ProductPlantTextWrapper plantText = check productClient->createA_ProductPlantText({
    Product: "TG11",
    Plant: "1710",
    LongText: "Store in the dry goods area. Reorder from the regional distribution center."
});
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG11",
    "Plant": "1710",
    "LongText": "Store in the dry goods area. Reorder from the regional distribution center."
  }
}
```

</details>

<details>
<summary>getA_ProductPlantText</summary>

Retrieves the plant text of a specific product in a specific plant.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `Plant` | `string` | Yes | Plant (e.g., `"1710"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_ProductPlantTextQueries` | No | OData query parameters: `$select`. |

Returns: `A_ProductPlantTextWrapper|error`

Sample code:

```ballerina
product:A_ProductPlantTextWrapper plantText = check productClient->getA_ProductPlantText("TG11", "1710");
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG11",
    "Plant": "1710",
    "LongText": "Store in the dry goods area. Reorder from the regional distribution center."
  }
}
```

</details>

<details>
<summary>patchA_ProductPlantText</summary>

Updates the plant text of a product in a plant using a PATCH request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `Plant` | `string` | Yes | Plant (e.g., `"1710"`). |
| `payload` | `UpdateA_ProductPlantTextWrapper` | Yes | Wraps an `UpdateA_ProductPlantText` record (`LongText`) in the `d` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check productClient->patchA_ProductPlantText(
    "TG11",
    "1710",
    {d: {LongText: "Store in the dry goods area, rack 4. Reorder from the regional distribution center."}}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</details>

<details>
<summary>deleteA_ProductPlantText</summary>

Deletes the plant text of a product in a plant.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `Plant` | `string` | Yes | Plant (e.g., `"1710"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check productClient->deleteA_ProductPlantText("TG11", "1710");
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</details>

<details>
<summary>getPlantTextOfA_ProductPlant</summary>

Retrieves the plant text of a specific plant data record through the `to_PlantText` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `Plant` | `string` | Yes | Plant (e.g., `"1710"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetPlantTextOfA_ProductPlantQueries` | No | OData query parameters: `$select`. |

Returns: `A_ProductPlantTextWrapper|error`

Sample code:

```ballerina
product:A_ProductPlantTextWrapper plantText = check productClient->getPlantTextOfA_ProductPlant("TG11", "1710");
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG11",
    "Plant": "1710",
    "LongText": "Store in the dry goods area. Reorder from the regional distribution center."
  }
}
```

</details>

#### MRP area data

<details>
<summary>listA_ProductPlantMRPAreas</summary>

Retrieves a collection of MRP area data records, with the MRP type, lot sizing, safety stock and planned delivery time that apply to a product in an MRP area of a plant.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_ProductPlantMRPAreasQueries` | No | OData query parameters: `$filter`, `$select`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_ProductPlantMRPAreaWrapper|error`

Sample code:

```ballerina
product:CollectionOfA_ProductPlantMRPAreaWrapper mrpAreas = check productClient->listA_ProductPlantMRPAreas(
    queries = {
        \$filter: "Product eq 'TG11' and Plant eq '1710'",
        \$select: ["Product", "Plant", "MRPArea", "MRPType", "SafetyStockQuantity"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "Product": "TG11",
        "Plant": "1710",
        "MRPArea": "1710-A",
        "MRPType": "PD",
        "SafetyStockQuantity": "10.000"
      },
      {
        "Product": "TG11",
        "Plant": "1710",
        "MRPArea": "1710-B",
        "MRPType": "PD",
        "SafetyStockQuantity": "0.000"
      }
    ]
  }
}
```

</details>

<details>
<summary>createA_ProductPlantMRPArea</summary>

Assigns a product to an MRP area of a plant by creating its MRP area data.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateA_ProductPlantMRPArea` | Yes | MRP area data with the required key fields `Product`, `Plant` and `MRPArea`, plus fields such as `MRPType`, `MRPResponsible` and `LotSizingProcedure`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_ProductPlantMRPAreaWrapper|error`

Sample code:

```ballerina
product:A_ProductPlantMRPAreaWrapper mrpArea = check productClient->createA_ProductPlantMRPArea({
    Product: "TG11",
    Plant: "1710",
    MRPArea: "1710-A",
    MRPType: "PD",
    MRPResponsible: "001",
    LotSizingProcedure: "EX",
    SafetyStockQuantity: "10.000",
    PlannedDeliveryDurationInDays: "5",
    StorageLocation: "171A"
});
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG11",
    "Plant": "1710",
    "MRPArea": "1710-A",
    "MRPType": "PD",
    "MRPResponsible": "001",
    "LotSizingProcedure": "EX",
    "SafetyStockQuantity": "10.000",
    "PlannedDeliveryDurationInDays": "5",
    "StorageLocation": "171A"
  }
}
```

</details>

<details>
<summary>getA_ProductPlantMRPArea</summary>

Retrieves the MRP area data of a specific product, plant and MRP area.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `Plant` | `string` | Yes | Plant (e.g., `"1710"`). |
| `MRPArea` | `string` | Yes | MRP area (e.g., `"1710-A"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_ProductPlantMRPAreaQueries` | No | OData query parameters: `$select`. |

Returns: `A_ProductPlantMRPAreaWrapper|error`

Sample code:

```ballerina
product:A_ProductPlantMRPAreaWrapper mrpArea = check productClient->getA_ProductPlantMRPArea("TG11", "1710", "1710-A");
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG11",
    "Plant": "1710",
    "MRPArea": "1710-A",
    "MRPType": "PD",
    "MRPResponsible": "001",
    "MRPGroup": "",
    "LotSizingProcedure": "EX",
    "SafetyStockQuantity": "10.000",
    "PlannedDeliveryDurationInDays": "5",
    "IsMarkedForDeletion": false,
    "BaseUnit": "PC",
    "StorageLocation": "171A"
  }
}
```

</details>

<details>
<summary>patchA_ProductPlantMRPArea</summary>

Updates the MRP area data of a product using a PATCH request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `Plant` | `string` | Yes | Plant (e.g., `"1710"`). |
| `MRPArea` | `string` | Yes | MRP area (e.g., `"1710-A"`). |
| `payload` | `UpdateA_ProductPlantMRPAreaWrapper` | Yes | Wraps an `UpdateA_ProductPlantMRPArea` record with the fields to change, for example `SafetyStockQuantity`, in the `d` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check productClient->patchA_ProductPlantMRPArea(
    "TG11",
    "1710",
    "1710-A",
    {d: {SafetyStockQuantity: "20.000"}}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</details>

<details>
<summary>listPlantMRPAreasOfA_ProductPlant</summary>

Retrieves the MRP area data of a specific plant data record through the `to_PlantMRPArea` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `Plant` | `string` | Yes | Plant (e.g., `"1710"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListPlantMRPAreasOfA_ProductPlantQueries` | No | OData query parameters: `$filter`, `$select`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_ProductPlantMRPAreaWrapper|error`

Sample code:

```ballerina
product:CollectionOfA_ProductPlantMRPAreaWrapper mrpAreas = check productClient->listPlantMRPAreasOfA_ProductPlant("TG11", "1710");
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "Product": "TG11",
        "Plant": "1710",
        "MRPArea": "1710-A",
        "MRPType": "PD",
        "MRPResponsible": "001",
        "MRPGroup": "",
        "LotSizingProcedure": "EX",
        "SafetyStockQuantity": "10.000",
        "PlannedDeliveryDurationInDays": "5",
        "IsMarkedForDeletion": false,
        "BaseUnit": "PC",
        "StorageLocation": "171A"
      },
      {
        "Product": "TG11",
        "Plant": "1710",
        "MRPArea": "1710-B",
        "MRPType": "PD",
        "MRPResponsible": "001",
        "MRPGroup": "",
        "LotSizingProcedure": "EX",
        "SafetyStockQuantity": "0.000",
        "PlannedDeliveryDurationInDays": "5",
        "IsMarkedForDeletion": false,
        "BaseUnit": "PC",
        "StorageLocation": "171B"
      }
    ]
  }
}
```

</details>

<details>
<summary>createPlantMRPAreaOfA_ProductPlant</summary>

Creates MRP area data through the `to_PlantMRPArea` navigation of a specific plant data record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `Plant` | `string` | Yes | Plant (e.g., `"1710"`). |
| `payload` | `CreateA_ProductPlantMRPArea` | Yes | MRP area data with the required key fields `Product`, `Plant` and `MRPArea`, plus fields such as `MRPType`, `MRPResponsible` and `LotSizingProcedure`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_ProductPlantMRPAreaWrapper|error`

Sample code:

```ballerina
product:A_ProductPlantMRPAreaWrapper mrpArea = check productClient->createPlantMRPAreaOfA_ProductPlant(
    "TG11",
    "1710",
    {
        Product: "TG11",
        Plant: "1710",
        MRPArea: "1710-A",
        MRPType: "PD",
        MRPResponsible: "001",
        LotSizingProcedure: "EX",
        SafetyStockQuantity: "10.000",
        PlannedDeliveryDurationInDays: "5",
        StorageLocation: "171A"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG11",
    "Plant": "1710",
    "MRPArea": "1710-A",
    "MRPType": "PD",
    "MRPResponsible": "001",
    "LotSizingProcedure": "EX",
    "SafetyStockQuantity": "10.000",
    "PlannedDeliveryDurationInDays": "5",
    "StorageLocation": "171A"
  }
}
```

</details>

#### Supply planning data

<details>
<summary>listA_ProductSupplyPlannings</summary>

Retrieves a collection of supply planning data records, with the MRP type, lot sizing, safety stock, planning strategy and lead times of each product in each plant.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_ProductSupplyPlanningsQueries` | No | OData query parameters: `$filter`, `$select`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_ProductSupplyPlanningWrapper|error`

Sample code:

```ballerina
product:CollectionOfA_ProductSupplyPlanningWrapper supplyPlanningData = check productClient->listA_ProductSupplyPlannings(
    queries = {
        \$filter: "Plant eq '1710' and MRPType eq 'PD'",
        \$select: ["Product", "Plant", "MRPType", "SafetyStockQuantity", "PlannedDeliveryDurationInDays"],
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
        "Product": "TG11",
        "Plant": "1710",
        "MRPType": "PD",
        "SafetyStockQuantity": "10.000",
        "PlannedDeliveryDurationInDays": "5"
      },
      {
        "Product": "TG12",
        "Plant": "1710",
        "MRPType": "PD",
        "SafetyStockQuantity": "0.000",
        "PlannedDeliveryDurationInDays": "3"
      }
    ]
  }
}
```

</details>

<details>
<summary>createA_ProductSupplyPlanning</summary>

Creates the supply planning data of a product in a plant.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateA_ProductSupplyPlanning` | Yes | Supply planning data with the required key fields `Product` and `Plant`, plus fields such as `MRPType`, `MRPResponsible` and `LotSizingProcedure`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_ProductSupplyPlanningWrapper|error`

Sample code:

```ballerina
product:A_ProductSupplyPlanningWrapper supplyPlanning = check productClient->createA_ProductSupplyPlanning({
    Product: "TG11",
    Plant: "1720",
    MRPType: "PD",
    MRPResponsible: "001",
    LotSizingProcedure: "EX",
    PlannedDeliveryDurationInDays: "5"
});
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG11",
    "Plant": "1720",
    "MRPType": "PD",
    "MRPResponsible": "001",
    "LotSizingProcedure": "EX",
    "PlannedDeliveryDurationInDays": "5"
  }
}
```

</details>

<details>
<summary>getA_ProductSupplyPlanning</summary>

Retrieves the supply planning data of a specific product in a specific plant.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `Plant` | `string` | Yes | Plant (e.g., `"1710"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_ProductSupplyPlanningQueries` | No | OData query parameters: `$select`. |

Returns: `A_ProductSupplyPlanningWrapper|error`

Sample code:

```ballerina
product:A_ProductSupplyPlanningWrapper supplyPlanning = check productClient->getA_ProductSupplyPlanning("TG11", "1710");
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG11",
    "Plant": "1710",
    "MRPType": "PD",
    "MRPResponsible": "001",
    "LotSizingProcedure": "EX",
    "MinimumLotSizeQuantity": "0.000",
    "SafetyStockQuantity": "10.000",
    "PlannedDeliveryDurationInDays": "5",
    "GoodsReceiptDuration": "1",
    "ProcurementType": "F",
    "PlanningStrategyGroup": "40",
    "AvailabilityCheckType": "02",
    "BaseUnit": "PC",
    "Currency": "USD"
  }
}
```

</details>

<details>
<summary>patchA_ProductSupplyPlanning</summary>

Updates the supply planning data of a product in a plant using a PATCH request, for example the safety stock or the planned delivery time.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `Plant` | `string` | Yes | Plant (e.g., `"1710"`). |
| `payload` | `UpdateA_ProductSupplyPlanningWrapper` | Yes | Wraps an `UpdateA_ProductSupplyPlanning` record with the fields to change, for example `SafetyStockQuantity` and `PlannedDeliveryDurationInDays`, in the `d` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check productClient->patchA_ProductSupplyPlanning(
    "TG11",
    "1710",
    {d: {SafetyStockQuantity: "25.000", PlannedDeliveryDurationInDays: "7"}}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</details>

<details>
<summary>getProductSupplyPlanningOfA_ProductPlant</summary>

Retrieves the supply planning data of a specific plant data record through the `to_ProductSupplyPlanning` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `Plant` | `string` | Yes | Plant (e.g., `"1710"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetProductSupplyPlanningOfA_ProductPlantQueries` | No | OData query parameters: `$select`. |

Returns: `A_ProductSupplyPlanningWrapper|error`

Sample code:

```ballerina
product:A_ProductSupplyPlanningWrapper supplyPlanning = check productClient->getProductSupplyPlanningOfA_ProductPlant("TG11", "1710");
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG11",
    "Plant": "1710",
    "MRPType": "PD",
    "MRPResponsible": "001",
    "LotSizingProcedure": "EX",
    "MinimumLotSizeQuantity": "0.000"
  }
}
```

</details>

#### Plant procurement data

<details>
<summary>listA_ProductPlantProcurements</summary>

Retrieves a collection of plant procurement data records, which control automatic purchase order creation, source list requirements and JIT delivery schedules for each product in each plant.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_ProductPlantProcurementsQueries` | No | OData query parameters: `$filter`, `$select`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_ProductPlantProcurementWrapper|error`

Sample code:

```ballerina
product:CollectionOfA_ProductPlantProcurementWrapper plantProcurementData = check productClient->listA_ProductPlantProcurements(
    queries = {
        \$filter: "Plant eq '1710'",
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
        "Product": "TG11",
        "Plant": "1710",
        "IsAutoPurOrdCreationAllowed": true,
        "IsSourceListRequired": false,
        "SourceOfSupplyCategory": "",
        "ItmIsRlvtToJITDelivSchedules": ""
      },
      {
        "Product": "TG12",
        "Plant": "1710",
        "IsAutoPurOrdCreationAllowed": false,
        "IsSourceListRequired": false,
        "SourceOfSupplyCategory": "",
        "ItmIsRlvtToJITDelivSchedules": ""
      }
    ]
  }
}
```

</details>

<details>
<summary>createA_ProductPlantProcurement</summary>

Creates the procurement data of a product in a plant.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateA_ProductPlantProcurement` | Yes | Plant procurement data with the required key fields `Product` and `Plant`, plus fields such as `IsAutoPurOrdCreationAllowed` and `IsSourceListRequired`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_ProductPlantProcurementWrapper|error`

Sample code:

```ballerina
product:A_ProductPlantProcurementWrapper plantProcurement = check productClient->createA_ProductPlantProcurement({
    Product: "TG11",
    Plant: "1720",
    IsAutoPurOrdCreationAllowed: true,
    IsSourceListRequired: false
});
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG11",
    "Plant": "1720",
    "IsAutoPurOrdCreationAllowed": true,
    "IsSourceListRequired": false,
    "SourceOfSupplyCategory": "",
    "ItmIsRlvtToJITDelivSchedules": ""
  }
}
```

</details>

<details>
<summary>getA_ProductPlantProcurement</summary>

Retrieves the procurement data of a specific product in a specific plant.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `Plant` | `string` | Yes | Plant (e.g., `"1710"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_ProductPlantProcurementQueries` | No | OData query parameters: `$select`. |

Returns: `A_ProductPlantProcurementWrapper|error`

Sample code:

```ballerina
product:A_ProductPlantProcurementWrapper plantProcurement = check productClient->getA_ProductPlantProcurement("TG11", "1710");
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG11",
    "Plant": "1710",
    "IsAutoPurOrdCreationAllowed": true,
    "IsSourceListRequired": false,
    "SourceOfSupplyCategory": "",
    "ItmIsRlvtToJITDelivSchedules": ""
  }
}
```

</details>

<details>
<summary>patchA_ProductPlantProcurement</summary>

Updates the procurement data of a product in a plant using a PATCH request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `Plant` | `string` | Yes | Plant (e.g., `"1710"`). |
| `payload` | `UpdateA_ProductPlantProcurementWrapper` | Yes | Wraps an `UpdateA_ProductPlantProcurement` record with the fields to change, for example `IsSourceListRequired`, in the `d` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check productClient->patchA_ProductPlantProcurement(
    "TG11",
    "1710",
    {d: {IsSourceListRequired: true}}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</details>

<details>
<summary>getProductPlantProcurementOfA_ProductPlant</summary>

Retrieves the plant procurement data of a specific plant data record through the `to_ProductPlantProcurement` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `Plant` | `string` | Yes | Plant (e.g., `"1710"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetProductPlantProcurementOfA_ProductPlantQueries` | No | OData query parameters: `$select`. |

Returns: `A_ProductPlantProcurementWrapper|error`

Sample code:

```ballerina
product:A_ProductPlantProcurementWrapper plantProcurement = check productClient->getProductPlantProcurementOfA_ProductPlant("TG11", "1710");
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG11",
    "Plant": "1710",
    "IsAutoPurOrdCreationAllowed": true,
    "IsSourceListRequired": false,
    "SourceOfSupplyCategory": "",
    "ItmIsRlvtToJITDelivSchedules": ""
  }
}
```

</details>

#### Work scheduling data

<details>
<summary>listA_ProductWorkSchedulings</summary>

Retrieves a collection of work scheduling data records, with the production supervisor, production unit, delivery tolerances and processing times of each product in each plant.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_ProductWorkSchedulingsQueries` | No | OData query parameters: `$filter`, `$select`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_ProductWorkSchedulingWrapper|error`

Sample code:

```ballerina
product:CollectionOfA_ProductWorkSchedulingWrapper workSchedulingData = check productClient->listA_ProductWorkSchedulings(
    queries = {
        \$filter: "Plant eq '1710'",
        \$select: ["Product", "Plant", "ProductionSupervisor", "OverDelivToleranceLimit", "UnderDelivToleranceLimit"],
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
        "Product": "TG11",
        "Plant": "1710",
        "ProductionSupervisor": "001",
        "OverDelivToleranceLimit": "0.0",
        "UnderDelivToleranceLimit": "0.0"
      },
      {
        "Product": "TG12",
        "Plant": "1710",
        "ProductionSupervisor": "002",
        "OverDelivToleranceLimit": "0.0",
        "UnderDelivToleranceLimit": "0.0"
      }
    ]
  }
}
```

</details>

<details>
<summary>createA_ProductWorkScheduling</summary>

Creates the work scheduling data of a product in a plant.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateA_ProductWorkScheduling` | Yes | Work scheduling data with the required key fields `Product` and `Plant`, plus fields such as `ProductionSupervisor` and `ProductProductionQuantityUnit`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_ProductWorkSchedulingWrapper|error`

Sample code:

```ballerina
product:A_ProductWorkSchedulingWrapper workScheduling = check productClient->createA_ProductWorkScheduling({
    Product: "TG11",
    Plant: "1720",
    ProductionSupervisor: "001",
    ProductProductionQuantityUnit: "PC"
});
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG11",
    "Plant": "1720",
    "ProductionSupervisor": "001",
    "ProductProductionQuantityUnit": "PC"
  }
}
```

</details>

<details>
<summary>getA_ProductWorkScheduling</summary>

Retrieves the work scheduling data of a specific product in a specific plant.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `Plant` | `string` | Yes | Plant (e.g., `"1710"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_ProductWorkSchedulingQueries` | No | OData query parameters: `$select`. |

Returns: `A_ProductWorkSchedulingWrapper|error`

Sample code:

```ballerina
product:A_ProductWorkSchedulingWrapper workScheduling = check productClient->getA_ProductWorkScheduling("TG11", "1710");
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG11",
    "Plant": "1710",
    "MaterialBaseQuantity": "1.000",
    "UnlimitedOverDelivIsAllowed": false,
    "OverDelivToleranceLimit": "0.0",
    "UnderDelivToleranceLimit": "0.0",
    "BaseUnit": "PC",
    "ProductProcessingTime": "0.00",
    "ProductionSupervisor": "001",
    "ProductProductionQuantityUnit": "PC",
    "SetupAndTeardownTime": "0.00",
    "TransitionTime": "0.00"
  }
}
```

</details>

<details>
<summary>patchA_ProductWorkScheduling</summary>

Updates the work scheduling data of a product in a plant using a PATCH request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `Plant` | `string` | Yes | Plant (e.g., `"1710"`). |
| `payload` | `UpdateA_ProductWorkSchedulingWrapper` | Yes | Wraps an `UpdateA_ProductWorkScheduling` record with the fields to change, for example `OverDelivToleranceLimit` and `UnderDelivToleranceLimit`, in the `d` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check productClient->patchA_ProductWorkScheduling(
    "TG11",
    "1710",
    {d: {OverDelivToleranceLimit: "5.0", UnderDelivToleranceLimit: "2.0"}}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</details>

<details>
<summary>getProductWorkSchedulingOfA_ProductPlant</summary>

Retrieves the work scheduling data of a specific plant data record through the `to_ProductWorkScheduling` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `Plant` | `string` | Yes | Plant (e.g., `"1710"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetProductWorkSchedulingOfA_ProductPlantQueries` | No | OData query parameters: `$select`. |

Returns: `A_ProductWorkSchedulingWrapper|error`

Sample code:

```ballerina
product:A_ProductWorkSchedulingWrapper workScheduling = check productClient->getProductWorkSchedulingOfA_ProductPlant("TG11", "1710");
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG11",
    "Plant": "1710",
    "MaterialBaseQuantity": "1.000",
    "UnlimitedOverDelivIsAllowed": false,
    "OverDelivToleranceLimit": "0.0",
    "UnderDelivToleranceLimit": "0.0"
  }
}
```

</details>

#### Plant storage data

<details>
<summary>listA_ProductPlantStorages</summary>

Retrieves a collection of plant storage data records, with the cycle counting indicator and storage settings of each product in each plant.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_ProductPlantStoragesQueries` | No | OData query parameters: `$filter`, `$select`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_ProductPlantStorageWrapper|error`

Sample code:

```ballerina
product:CollectionOfA_ProductPlantStorageWrapper plantStorageData = check productClient->listA_ProductPlantStorages(
    queries = {
        \$filter: "Plant eq '1710'",
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
        "Product": "TG11",
        "Plant": "1710",
        "InventoryForCycleCountInd": "A",
        "ProvisioningServiceLevel": "",
        "CycleCountingIndicatorIsFixed": false,
        "ProdMaximumStoragePeriodUnit": "",
        "WrhsMgmtPtwyAndStkRemovalStrgy": ""
      },
      {
        "Product": "TG12",
        "Plant": "1710",
        "InventoryForCycleCountInd": "C",
        "ProvisioningServiceLevel": "",
        "CycleCountingIndicatorIsFixed": false,
        "ProdMaximumStoragePeriodUnit": "",
        "WrhsMgmtPtwyAndStkRemovalStrgy": ""
      }
    ]
  }
}
```

</details>

<details>
<summary>createA_ProductPlantStorage</summary>

Creates the storage data of a product in a plant.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateA_ProductPlantStorage` | Yes | Plant storage data with the required key fields `Product` and `Plant`, plus fields such as `InventoryForCycleCountInd`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_ProductPlantStorageWrapper|error`

Sample code:

```ballerina
product:A_ProductPlantStorageWrapper plantStorage = check productClient->createA_ProductPlantStorage({
    Product: "TG11",
    Plant: "1720",
    InventoryForCycleCountInd: "A"
});
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG11",
    "Plant": "1720",
    "InventoryForCycleCountInd": "A",
    "ProvisioningServiceLevel": "",
    "CycleCountingIndicatorIsFixed": false,
    "ProdMaximumStoragePeriodUnit": "",
    "WrhsMgmtPtwyAndStkRemovalStrgy": ""
  }
}
```

</details>

<details>
<summary>getA_ProductPlantStorage</summary>

Retrieves the storage data of a specific product in a specific plant.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `Plant` | `string` | Yes | Plant (e.g., `"1710"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_ProductPlantStorageQueries` | No | OData query parameters: `$select`. |

Returns: `A_ProductPlantStorageWrapper|error`

Sample code:

```ballerina
product:A_ProductPlantStorageWrapper plantStorage = check productClient->getA_ProductPlantStorage("TG11", "1710");
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG11",
    "Plant": "1710",
    "InventoryForCycleCountInd": "A",
    "ProvisioningServiceLevel": "",
    "CycleCountingIndicatorIsFixed": false,
    "ProdMaximumStoragePeriodUnit": "",
    "WrhsMgmtPtwyAndStkRemovalStrgy": ""
  }
}
```

</details>

<details>
<summary>patchA_ProductPlantStorage</summary>

Updates the storage data of a product in a plant using a PATCH request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `Plant` | `string` | Yes | Plant (e.g., `"1710"`). |
| `payload` | `UpdateA_ProductPlantStorageWrapper` | Yes | Wraps an `UpdateA_ProductPlantStorage` record with the fields to change, for example `InventoryForCycleCountInd`, in the `d` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check productClient->patchA_ProductPlantStorage(
    "TG11",
    "1710",
    {d: {InventoryForCycleCountInd: "B"}}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</details>

<details>
<summary>getPlantStorageOfA_ProductPlant</summary>

Retrieves the plant storage data of a specific plant data record through the `to_PlantStorage` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `Plant` | `string` | Yes | Plant (e.g., `"1710"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetPlantStorageOfA_ProductPlantQueries` | No | OData query parameters: `$select`. |

Returns: `A_ProductPlantStorageWrapper|error`

Sample code:

```ballerina
product:A_ProductPlantStorageWrapper plantStorage = check productClient->getPlantStorageOfA_ProductPlant("TG11", "1710");
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG11",
    "Plant": "1710",
    "InventoryForCycleCountInd": "A",
    "ProvisioningServiceLevel": "",
    "CycleCountingIndicatorIsFixed": false,
    "ProdMaximumStoragePeriodUnit": ""
  }
}
```

</details>

#### Plant sales data

<details>
<summary>listA_ProductPlantSaless</summary>

Retrieves a collection of plant sales data records, with the loading group, availability check type and shipping times of each product in each plant.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_ProductPlantSalessQueries` | No | OData query parameters: `$filter`, `$select`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_ProductPlantSalesWrapper|error`

Sample code:

```ballerina
product:CollectionOfA_ProductPlantSalesWrapper plantSalesData = check productClient->listA_ProductPlantSaless(
    queries = {
        \$filter: "Plant eq '1710'",
        \$select: ["Product", "Plant", "LoadingGroup", "AvailabilityCheckType"],
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
        "Product": "TG11",
        "Plant": "1710",
        "LoadingGroup": "0001",
        "AvailabilityCheckType": "02"
      },
      {
        "Product": "TG12",
        "Plant": "1710",
        "LoadingGroup": "0002",
        "AvailabilityCheckType": "02"
      }
    ]
  }
}
```

</details>

<details>
<summary>createA_ProductPlantSales</summary>

Creates the sales data of a product in a plant.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateA_ProductPlantSales` | Yes | Plant sales data with the required key fields `Product` and `Plant`, plus fields such as `LoadingGroup` and `AvailabilityCheckType`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_ProductPlantSalesWrapper|error`

Sample code:

```ballerina
product:A_ProductPlantSalesWrapper plantSales = check productClient->createA_ProductPlantSales({
    Product: "TG11",
    Plant: "1720",
    LoadingGroup: "0001",
    AvailabilityCheckType: "02"
});
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG11",
    "Plant": "1720",
    "LoadingGroup": "0001",
    "AvailabilityCheckType": "02"
  }
}
```

</details>

<details>
<summary>getA_ProductPlantSales</summary>

Retrieves the sales data of a specific product in a specific plant.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `Plant` | `string` | Yes | Plant (e.g., `"1710"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_ProductPlantSalesQueries` | No | OData query parameters: `$select`. |

Returns: `A_ProductPlantSalesWrapper|error`

Sample code:

```ballerina
product:A_ProductPlantSalesWrapper plantSales = check productClient->getA_ProductPlantSales("TG11", "1710");
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG11",
    "Plant": "1710",
    "LoadingGroup": "0001",
    "ReplacementPartType": "",
    "CapPlanningQuantityInBaseUoM": "0.000",
    "ProductShippingProcessingTime": "0.00",
    "WrkCentersShipgSetupTimeInDays": "0.00",
    "AvailabilityCheckType": "02",
    "BaseUnit": "PC"
  }
}
```

</details>

<details>
<summary>patchA_ProductPlantSales</summary>

Updates the sales data of a product in a plant using a PATCH request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `Plant` | `string` | Yes | Plant (e.g., `"1710"`). |
| `payload` | `UpdateA_ProductPlantSalesWrapper` | Yes | Wraps an `UpdateA_ProductPlantSales` record with the fields to change, for example `LoadingGroup`, in the `d` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check productClient->patchA_ProductPlantSales(
    "TG11",
    "1710",
    {d: {LoadingGroup: "0002"}}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</details>

<details>
<summary>getPlantSalesOfA_ProductPlant</summary>

Retrieves the plant sales data of a specific plant data record through the `to_PlantSales` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `Plant` | `string` | Yes | Plant (e.g., `"1710"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetPlantSalesOfA_ProductPlantQueries` | No | OData query parameters: `$select`. |

Returns: `A_ProductPlantSalesWrapper|error`

Sample code:

```ballerina
product:A_ProductPlantSalesWrapper plantSales = check productClient->getPlantSalesOfA_ProductPlant("TG11", "1710");
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG11",
    "Plant": "1710",
    "LoadingGroup": "0001",
    "ReplacementPartType": "",
    "CapPlanningQuantityInBaseUoM": "0.000",
    "ProductShippingProcessingTime": "0.00"
  }
}
```

</details>

#### Plant costing data

<details>
<summary>listA_ProductPlantCostings</summary>

Retrieves a collection of plant costing data records, with the costing lot size, variance key and the task list, BOM and production version that product costing uses in each plant.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_ProductPlantCostingsQueries` | No | OData query parameters: `$filter`, `$select`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_ProductPlantCostingWrapper|error`

Sample code:

```ballerina
product:CollectionOfA_ProductPlantCostingWrapper plantCostingData = check productClient->listA_ProductPlantCostings(
    queries = {
        \$filter: "Plant eq '1710'",
        \$select: ["Product", "Plant", "CostingLotSize", "VarianceKey", "ProductIsCostingRelevant"],
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
        "Product": "TG11",
        "Plant": "1710",
        "CostingLotSize": "100.000",
        "VarianceKey": "000001",
        "ProductIsCostingRelevant": true
      },
      {
        "Product": "TG12",
        "Plant": "1710",
        "CostingLotSize": "1.000",
        "VarianceKey": "000001",
        "ProductIsCostingRelevant": true
      }
    ]
  }
}
```

</details>

<details>
<summary>createA_ProductPlantCosting</summary>

Creates the costing data of a product in a plant.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateA_ProductPlantCosting` | Yes | Plant costing data with the required key fields `Product` and `Plant`, plus fields such as `CostingLotSize`, `VarianceKey` and `ProductIsCostingRelevant`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_ProductPlantCostingWrapper|error`

Sample code:

```ballerina
product:A_ProductPlantCostingWrapper plantCosting = check productClient->createA_ProductPlantCosting({
    Product: "TG11",
    Plant: "1720",
    CostingLotSize: "100.000",
    VarianceKey: "000001",
    ProductIsCostingRelevant: true
});
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG11",
    "Plant": "1720",
    "CostingLotSize": "100.000",
    "VarianceKey": "000001",
    "ProductIsCostingRelevant": true
  }
}
```

</details>

<details>
<summary>getA_ProductPlantCosting</summary>

Retrieves the costing data of a specific product in a specific plant.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `Plant` | `string` | Yes | Plant (e.g., `"1710"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_ProductPlantCostingQueries` | No | OData query parameters: `$select`. |

Returns: `A_ProductPlantCostingWrapper|error`

Sample code:

```ballerina
product:A_ProductPlantCostingWrapper plantCosting = check productClient->getA_ProductPlantCosting("TG11", "1710");
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG11",
    "Plant": "1710",
    "IsCoProduct": false,
    "CostingLotSize": "100.000",
    "VarianceKey": "000001",
    "BaseUnit": "PC",
    "TaskListGroupCounter": "",
    "TaskListGroup": "",
    "TaskListType": "",
    "CostingProductionVersion": "",
    "IsFixedPriceCoProduct": false,
    "CostingSpecialProcurementType": "",
    "SourceBOMAlternative": "",
    "ProductBOMUsage": "",
    "ProductIsCostingRelevant": true
  }
}
```

</details>

<details>
<summary>patchA_ProductPlantCosting</summary>

Updates the costing data of a product in a plant using a PATCH request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `Plant` | `string` | Yes | Plant (e.g., `"1710"`). |
| `payload` | `UpdateA_ProductPlantCostingWrapper` | Yes | Wraps an `UpdateA_ProductPlantCosting` record with the fields to change, for example `CostingLotSize`, in the `d` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check productClient->patchA_ProductPlantCosting(
    "TG11",
    "1710",
    {d: {CostingLotSize: "500.000"}}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</details>

<details>
<summary>getProductPlantCostingOfA_ProductPlant</summary>

Retrieves the plant costing data of a specific plant data record through the `to_ProductPlantCosting` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `Plant` | `string` | Yes | Plant (e.g., `"1710"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetProductPlantCostingOfA_ProductPlantQueries` | No | OData query parameters: `$select`. |

Returns: `A_ProductPlantCostingWrapper|error`

Sample code:

```ballerina
product:A_ProductPlantCostingWrapper plantCosting = check productClient->getProductPlantCostingOfA_ProductPlant("TG11", "1710");
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG11",
    "Plant": "1710",
    "IsCoProduct": false,
    "CostingLotSize": "100.000",
    "VarianceKey": "000001",
    "BaseUnit": "PC"
  }
}
```

</details>

#### Plant forecasting data

<details>
<summary>listA_ProductPlantForecastings</summary>

Retrieves a collection of forecasting data records, with the reference product and plant whose consumption history the forecast of each product uses.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_ProductPlantForecastingsQueries` | No | OData query parameters: `$filter`, `$select`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_ProductPlantForecastingWrapper|error`

Sample code:

```ballerina
product:CollectionOfA_ProductPlantForecastingWrapper forecastingData = check productClient->listA_ProductPlantForecastings(
    queries = {
        \$filter: "Plant eq '1710'",
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
        "Product": "TG11",
        "Plant": "1710",
        "ConsumptionRefUsageEndDate": "/Date(1798675200000)/",
        "ConsumptionQtyMultiplier": "1.00",
        "ConsumptionReferenceProduct": "TG10",
        "ConsumptionReferencePlant": "1710"
      },
      {
        "Product": "TG12",
        "Plant": "1710",
        "ConsumptionRefUsageEndDate": null,
        "ConsumptionQtyMultiplier": "0.00",
        "ConsumptionReferenceProduct": "",
        "ConsumptionReferencePlant": ""
      }
    ]
  }
}
```

</details>

<details>
<summary>createA_ProductPlantForecasting</summary>

Creates the forecasting data of a product in a plant.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateA_ProductPlantForecasting` | Yes | Forecasting data with the required key fields `Product` and `Plant`, plus fields such as `ConsumptionRefUsageEndDate`, `ConsumptionQtyMultiplier` and `ConsumptionReferenceProduct`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_ProductPlantForecastingWrapper|error`

Sample code:

```ballerina
product:A_ProductPlantForecastingWrapper forecasting = check productClient->createA_ProductPlantForecasting({
    Product: "TG11",
    Plant: "1710",
    ConsumptionRefUsageEndDate: "/Date(1798675200000)/",
    ConsumptionQtyMultiplier: "1.00",
    ConsumptionReferenceProduct: "TG10",
    ConsumptionReferencePlant: "1710"
});
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG11",
    "Plant": "1710",
    "ConsumptionRefUsageEndDate": "/Date(1798675200000)/",
    "ConsumptionQtyMultiplier": "1.00",
    "ConsumptionReferenceProduct": "TG10",
    "ConsumptionReferencePlant": "1710"
  }
}
```

</details>

<details>
<summary>getA_ProductPlantForecasting</summary>

Retrieves the forecasting data of a specific product in a specific plant.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `Plant` | `string` | Yes | Plant (e.g., `"1710"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_ProductPlantForecastingQueries` | No | OData query parameters: `$select`. |

Returns: `A_ProductPlantForecastingWrapper|error`

Sample code:

```ballerina
product:A_ProductPlantForecastingWrapper forecasting = check productClient->getA_ProductPlantForecasting("TG11", "1710");
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG11",
    "Plant": "1710",
    "ConsumptionRefUsageEndDate": "/Date(1798675200000)/",
    "ConsumptionQtyMultiplier": "1.00",
    "ConsumptionReferenceProduct": "TG10",
    "ConsumptionReferencePlant": "1710"
  }
}
```

</details>

<details>
<summary>patchA_ProductPlantForecasting</summary>

Updates the forecasting data of a product in a plant using a PATCH request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `Plant` | `string` | Yes | Plant (e.g., `"1710"`). |
| `payload` | `UpdateA_ProductPlantForecastingWrapper` | Yes | Wraps an `UpdateA_ProductPlantForecasting` record with the fields to change, for example `ConsumptionQtyMultiplier`, in the `d` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check productClient->patchA_ProductPlantForecasting(
    "TG11",
    "1710",
    {d: {ConsumptionQtyMultiplier: "0.80"}}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</details>

<details>
<summary>getProductPlantForecastOfA_ProductPlant</summary>

Retrieves the plant forecasting data of a specific plant data record through the `to_ProductPlantForecast` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `Plant` | `string` | Yes | Plant (e.g., `"1710"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetProductPlantForecastOfA_ProductPlantQueries` | No | OData query parameters: `$select`. |

Returns: `A_ProductPlantForecastingWrapper|error`

Sample code:

```ballerina
product:A_ProductPlantForecastingWrapper forecasting = check productClient->getProductPlantForecastOfA_ProductPlant("TG11", "1710");
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG11",
    "Plant": "1710",
    "ConsumptionRefUsageEndDate": "/Date(1798675200000)/",
    "ConsumptionQtyMultiplier": "1.00",
    "ConsumptionReferenceProduct": "TG10",
    "ConsumptionReferencePlant": "1710"
  }
}
```

</details>

#### Plant international trade data

<details>
<summary>listA_ProductPlantIntlTrds</summary>

Retrieves a collection of international trade data records, with the country and region of origin, CAS number and trade classification of each product in each plant.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_ProductPlantIntlTrdsQueries` | No | OData query parameters: `$filter`, `$select`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_ProductPlantIntlTrdWrapper|error`

Sample code:

```ballerina
product:CollectionOfA_ProductPlantIntlTrdWrapper intlTradeData = check productClient->listA_ProductPlantIntlTrds(
    queries = {
        \$filter: "Plant eq '1710'",
        \$select: ["Product", "Plant", "CountryOfOrigin", "RegionOfOrigin"],
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
        "Product": "TG11",
        "Plant": "1710",
        "CountryOfOrigin": "US",
        "RegionOfOrigin": "CA"
      },
      {
        "Product": "TG12",
        "Plant": "1710",
        "CountryOfOrigin": "DE",
        "RegionOfOrigin": ""
      }
    ]
  }
}
```

</details>

<details>
<summary>createA_ProductPlantIntlTrd</summary>

Creates the international trade data of a product in a plant.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateA_ProductPlantIntlTrd` | Yes | International trade data with the required key fields `Product` and `Plant`, plus fields such as `CountryOfOrigin` and `RegionOfOrigin`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_ProductPlantIntlTrdWrapper|error`

Sample code:

```ballerina
product:A_ProductPlantIntlTrdWrapper intlTrade = check productClient->createA_ProductPlantIntlTrd({
    Product: "TG11",
    Plant: "1720",
    CountryOfOrigin: "US",
    RegionOfOrigin: "CA"
});
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG11",
    "Plant": "1720",
    "CountryOfOrigin": "US",
    "RegionOfOrigin": "CA",
    "ConsumptionTaxCtrlCode": "",
    "ProductCASNumber": "",
    "ProdIntlTradeClassification": "",
    "ExportAndImportProductGroup": ""
  }
}
```

</details>

<details>
<summary>getA_ProductPlantIntlTrd</summary>

Retrieves the international trade data of a specific product in a specific plant.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `Plant` | `string` | Yes | Plant (e.g., `"1710"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_ProductPlantIntlTrdQueries` | No | OData query parameters: `$select`. |

Returns: `A_ProductPlantIntlTrdWrapper|error`

Sample code:

```ballerina
product:A_ProductPlantIntlTrdWrapper intlTrade = check productClient->getA_ProductPlantIntlTrd("TG11", "1710");
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG11",
    "Plant": "1710",
    "CountryOfOrigin": "US",
    "RegionOfOrigin": "CA",
    "ConsumptionTaxCtrlCode": "",
    "ProductCASNumber": "",
    "ProdIntlTradeClassification": "",
    "ExportAndImportProductGroup": ""
  }
}
```

</details>

<details>
<summary>patchA_ProductPlantIntlTrd</summary>

Updates the international trade data of a product in a plant using a PATCH request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `Plant` | `string` | Yes | Plant (e.g., `"1710"`). |
| `payload` | `UpdateA_ProductPlantIntlTrdWrapper` | Yes | Wraps an `UpdateA_ProductPlantIntlTrd` record with the fields to change, for example `RegionOfOrigin`, in the `d` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check productClient->patchA_ProductPlantIntlTrd(
    "TG11",
    "1710",
    {d: {RegionOfOrigin: "TX"}}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</details>

<details>
<summary>getProdPlantInternationalTradeOfA_ProductPlant</summary>

Retrieves the plant international trade data of a specific plant data record through the `to_ProdPlantInternationalTrade` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `Plant` | `string` | Yes | Plant (e.g., `"1710"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetProdPlantInternationalTradeOfA_ProductPlantQueries` | No | OData query parameters: `$select`. |

Returns: `A_ProductPlantIntlTrdWrapper|error`

Sample code:

```ballerina
product:A_ProductPlantIntlTrdWrapper intlTrade = check productClient->getProdPlantInternationalTradeOfA_ProductPlant("TG11", "1710");
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG11",
    "Plant": "1710",
    "CountryOfOrigin": "US",
    "RegionOfOrigin": "CA",
    "ConsumptionTaxCtrlCode": "",
    "ProductCASNumber": ""
  }
}
```

</details>

#### Plant quality management data

<details>
<summary>listA_ProductPlantQualityMgmts</summary>

Retrieves a collection of plant quality management data records, with the QM control key, inspection stock posting and certificate settings of each product in each plant.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_ProductPlantQualityMgmtsQueries` | No | OData query parameters: `$filter`, `$select`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_ProductPlantQualityMgmtWrapper|error`

Sample code:

```ballerina
product:CollectionOfA_ProductPlantQualityMgmtWrapper plantQualityMgmtData = check productClient->listA_ProductPlantQualityMgmts(
    queries = {
        \$filter: "Plant eq '1710'",
        \$select: ["Product", "Plant", "QualityMgmtCtrlKey", "HasPostToInspectionStock"],
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
        "Product": "TG11",
        "Plant": "1710",
        "QualityMgmtCtrlKey": "0001",
        "HasPostToInspectionStock": false
      },
      {
        "Product": "TG12",
        "Plant": "1710",
        "QualityMgmtCtrlKey": "",
        "HasPostToInspectionStock": true
      }
    ]
  }
}
```

</details>

<details>
<summary>createA_ProductPlantQualityMgmt</summary>

Creates the quality management data of a product in a plant.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateA_ProductPlantQualityMgmt` | Yes | Plant quality management data with the required key fields `Product` and `Plant`, plus fields such as `QualityMgmtCtrlKey` and `HasPostToInspectionStock`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_ProductPlantQualityMgmtWrapper|error`

Sample code:

```ballerina
product:A_ProductPlantQualityMgmtWrapper plantQualityMgmt = check productClient->createA_ProductPlantQualityMgmt({
    Product: "TG11",
    Plant: "1720",
    QualityMgmtCtrlKey: "0001",
    HasPostToInspectionStock: false
});
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG11",
    "Plant": "1720",
    "QualityMgmtCtrlKey": "0001",
    "HasPostToInspectionStock": false
  }
}
```

</details>

<details>
<summary>getA_ProductPlantQualityMgmt</summary>

Retrieves the quality management data of a specific product in a specific plant.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `Plant` | `string` | Yes | Plant (e.g., `"1710"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_ProductPlantQualityMgmtQueries` | No | OData query parameters: `$select`. |

Returns: `A_ProductPlantQualityMgmtWrapper|error`

Sample code:

```ballerina
product:A_ProductPlantQualityMgmtWrapper plantQualityMgmt = check productClient->getA_ProductPlantQualityMgmt("TG11", "1710");
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG11",
    "Plant": "1710",
    "MaximumStoragePeriod": "0",
    "QualityMgmtCtrlKey": "0001",
    "MatlQualityAuthorizationGroup": "",
    "HasPostToInspectionStock": false,
    "InspLotDocumentationIsRequired": false,
    "SuplrQualityManagementSystem": "",
    "RecrrgInspIntervalTimeInDays": "0",
    "ProductQualityCertificateType": ""
  }
}
```

</details>

<details>
<summary>patchA_ProductPlantQualityMgmt</summary>

Updates the quality management data of a product in a plant using a PATCH request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `Plant` | `string` | Yes | Plant (e.g., `"1710"`). |
| `payload` | `UpdateA_ProductPlantQualityMgmtWrapper` | Yes | Wraps an `UpdateA_ProductPlantQualityMgmt` record with the fields to change, for example `HasPostToInspectionStock`, in the `d` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check productClient->patchA_ProductPlantQualityMgmt(
    "TG11",
    "1710",
    {d: {HasPostToInspectionStock: true}}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</details>

<details>
<summary>getPlantQualityMgmtOfA_ProductPlant</summary>

Retrieves the plant quality management data of a specific plant data record through the `to_PlantQualityMgmt` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `Plant` | `string` | Yes | Plant (e.g., `"1710"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetPlantQualityMgmtOfA_ProductPlantQueries` | No | OData query parameters: `$select`. |

Returns: `A_ProductPlantQualityMgmtWrapper|error`

Sample code:

```ballerina
product:A_ProductPlantQualityMgmtWrapper plantQualityMgmt = check productClient->getPlantQualityMgmtOfA_ProductPlant("TG11", "1710");
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG11",
    "Plant": "1710",
    "MaximumStoragePeriod": "0",
    "QualityMgmtCtrlKey": "0001",
    "MatlQualityAuthorizationGroup": "",
    "HasPostToInspectionStock": false
  }
}
```

</details>

#### Storage locations

<details>
<summary>listA_ProductStorageLocations</summary>

Retrieves a collection of product storage location data records, with the storage bin, physical inventory indicators and deletion flag of each product in each storage location.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_ProductStorageLocationsQueries` | No | OData query parameters: `$filter`, `$select`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_ProductStorageLocationWrapper|error`

Sample code:

```ballerina
product:CollectionOfA_ProductStorageLocationWrapper storageLocations = check productClient->listA_ProductStorageLocations(
    queries = {
        \$filter: "Product eq 'TG11' and Plant eq '1710'",
        \$select: ["Product", "Plant", "StorageLocation", "WarehouseStorageBin"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "Product": "TG11",
        "Plant": "1710",
        "StorageLocation": "171A",
        "WarehouseStorageBin": "A-01-03"
      },
      {
        "Product": "TG11",
        "Plant": "1710",
        "StorageLocation": "171B",
        "WarehouseStorageBin": ""
      }
    ]
  }
}
```

</details>

<details>
<summary>createA_ProductStorageLocation</summary>

Extends a product to a storage location of a plant.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateA_ProductStorageLocation` | Yes | Storage location data with the required key fields `Product`, `Plant` and `StorageLocation`, plus fields such as `WarehouseStorageBin`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_ProductStorageLocationWrapper|error`

Sample code:

```ballerina
product:A_ProductStorageLocationWrapper storageLocation = check productClient->createA_ProductStorageLocation({
    Product: "TG11",
    Plant: "1710",
    StorageLocation: "171C",
    WarehouseStorageBin: "C-02-05"
});
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG11",
    "Plant": "1710",
    "StorageLocation": "171C",
    "WarehouseStorageBin": "C-02-05"
  }
}
```

</details>

<details>
<summary>getA_ProductStorageLocation</summary>

Retrieves the data of a specific product in a specific storage location of a plant.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `Plant` | `string` | Yes | Plant (e.g., `"1710"`). |
| `StorageLocation` | `string` | Yes | Storage location (e.g., `"171A"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_ProductStorageLocationQueries` | No | OData query parameters: `$select`. |

Returns: `A_ProductStorageLocationWrapper|error`

Sample code:

```ballerina
product:A_ProductStorageLocationWrapper storageLocation = check productClient->getA_ProductStorageLocation("TG11", "1710", "171A");
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG11",
    "Plant": "1710",
    "StorageLocation": "171A",
    "WarehouseStorageBin": "A-01-03",
    "MaintenanceStatus": "",
    "PhysicalInventoryBlockInd": "",
    "CreationDate": "/Date(1704067200000)/",
    "IsMarkedForDeletion": false,
    "FiscalYearCurrentPeriod": "2026",
    "FiscalMonthCurrentPeriod": "11"
  }
}
```

</details>

<details>
<summary>patchA_ProductStorageLocation</summary>

Updates the storage location data of a product using a PATCH request, for example the storage bin or the deletion flag.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `Plant` | `string` | Yes | Plant (e.g., `"1710"`). |
| `StorageLocation` | `string` | Yes | Storage location (e.g., `"171A"`). |
| `payload` | `UpdateA_ProductStorageLocationWrapper` | Yes | Wraps an `UpdateA_ProductStorageLocation` record with the fields to change, for example `WarehouseStorageBin`, in the `d` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check productClient->patchA_ProductStorageLocation(
    "TG11",
    "1710",
    "171A",
    {d: {WarehouseStorageBin: "B-02-05"}}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</details>

<details>
<summary>listStorageLocationsOfA_ProductPlant</summary>

Retrieves the storage location data of a specific plant data record through the `to_StorageLocation` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `Plant` | `string` | Yes | Plant (e.g., `"1710"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListStorageLocationsOfA_ProductPlantQueries` | No | OData query parameters: `$filter`, `$select`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_ProductStorageLocationWrapper|error`

Sample code:

```ballerina
product:CollectionOfA_ProductStorageLocationWrapper storageLocations = check productClient->listStorageLocationsOfA_ProductPlant(
    "TG11",
    "1710",
    queries = {
        \$select: ["StorageLocation", "WarehouseStorageBin", "IsMarkedForDeletion"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "StorageLocation": "171A",
        "WarehouseStorageBin": "A-01-03",
        "IsMarkedForDeletion": false
      },
      {
        "StorageLocation": "171B",
        "WarehouseStorageBin": "",
        "IsMarkedForDeletion": false
      }
    ]
  }
}
```

</details>

<details>
<summary>createStorageLocationOfA_ProductPlant</summary>

Creates storage location data through the `to_StorageLocation` navigation of a specific plant data record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `Plant` | `string` | Yes | Plant (e.g., `"1710"`). |
| `payload` | `CreateA_ProductStorageLocation` | Yes | Storage location data with the required key fields `Product`, `Plant` and `StorageLocation`, plus fields such as `WarehouseStorageBin`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_ProductStorageLocationWrapper|error`

Sample code:

```ballerina
product:A_ProductStorageLocationWrapper storageLocation = check productClient->createStorageLocationOfA_ProductPlant(
    "TG11",
    "1710",
    {
        Product: "TG11",
        Plant: "1710",
        StorageLocation: "171C",
        WarehouseStorageBin: "C-02-05"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG11",
    "Plant": "1710",
    "StorageLocation": "171C",
    "WarehouseStorageBin": "C-02-05"
  }
}
```

</details>

#### Sales organization data

<details>
<summary>listA_ProductSalesDeliveries</summary>

Retrieves a collection of product sales organization data records, with the delivering plant, item category group, minimum order quantity, sales unit and sales status of each product for each sales organization and distribution channel.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_ProductSalesDeliveriesQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_ProductSalesDeliveryWrapper|error`

Sample code:

```ballerina
product:CollectionOfA_ProductSalesDeliveryWrapper salesDeliveries = check productClient->listA_ProductSalesDeliveries(
    queries = {
        \$filter: "ProductSalesOrg eq '1710' and ProductDistributionChnl eq '10'",
        \$select: ["Product", "ProductSalesOrg", "ProductDistributionChnl", "SupplyingPlant", "MinimumOrderQuantity"],
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
        "Product": "TG11",
        "ProductSalesOrg": "1710",
        "ProductDistributionChnl": "10",
        "SupplyingPlant": "1710",
        "MinimumOrderQuantity": "1.000"
      },
      {
        "Product": "TG12",
        "ProductSalesOrg": "1710",
        "ProductDistributionChnl": "10",
        "SupplyingPlant": "1710",
        "MinimumOrderQuantity": "10.000"
      }
    ]
  }
}
```

</details>

<details>
<summary>createA_ProductSalesDelivery</summary>

Extends a product to a sales organization and distribution channel by creating its sales organization data.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateA_ProductSalesDelivery` | Yes | Sales organization data with the required key fields `Product`, `ProductSalesOrg` and `ProductDistributionChnl`, plus fields such as `SupplyingPlant`, `ItemCategoryGroup` and `MinimumOrderQuantity`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_ProductSalesDeliveryWrapper|error`

Sample code:

```ballerina
product:A_ProductSalesDeliveryWrapper salesDelivery = check productClient->createA_ProductSalesDelivery({
    Product: "TG11",
    ProductSalesOrg: "1710",
    ProductDistributionChnl: "20",
    SupplyingPlant: "1710",
    ItemCategoryGroup: "NORM",
    MinimumOrderQuantity: "1.000",
    SalesMeasureUnit: "PC"
});
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG11",
    "ProductSalesOrg": "1710",
    "ProductDistributionChnl": "20",
    "SupplyingPlant": "1710",
    "ItemCategoryGroup": "NORM",
    "MinimumOrderQuantity": "1.000",
    "SalesMeasureUnit": "PC"
  }
}
```

</details>

<details>
<summary>getA_ProductSalesDelivery</summary>

Retrieves the sales data of a specific product for a sales organization and distribution channel. Expand `to_SalesText` or `to_SalesTax` to include related data.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `ProductSalesOrg` | `string` | Yes | Sales organization (e.g., `"1710"`). |
| `ProductDistributionChnl` | `string` | Yes | Distribution channel (e.g., `"10"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_ProductSalesDeliveryQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_ProductSalesDeliveryWrapper|error`

Sample code:

```ballerina
product:A_ProductSalesDeliveryWrapper salesDelivery = check productClient->getA_ProductSalesDelivery("TG11", "1710", "10");
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG11",
    "ProductSalesOrg": "1710",
    "ProductDistributionChnl": "10",
    "MinimumOrderQuantity": "1.000",
    "SupplyingPlant": "1710",
    "PriceSpecificationProductGroup": "",
    "AccountDetnProductGroup": "",
    "ItemCategoryGroup": "NORM",
    "DeliveryQuantityUnit": "PC",
    "DeliveryQuantity": "0.000",
    "ProductSalesStatus": "",
    "ProductSalesStatusValidityDate": null,
    "SalesMeasureUnit": "PC",
    "IsMarkedForDeletion": false,
    "ProductHierarchy": "",
    "BaseUnit": "PC",
    "CashDiscountIsDeductible": true
  }
}
```

</details>

<details>
<summary>patchA_ProductSalesDelivery</summary>

Updates the sales organization data of a product using a PATCH request, for example the minimum order quantity, delivering plant or the deletion flag.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `ProductSalesOrg` | `string` | Yes | Sales organization (e.g., `"1710"`). |
| `ProductDistributionChnl` | `string` | Yes | Distribution channel (e.g., `"10"`). |
| `payload` | `UpdateA_ProductSalesDeliveryWrapper` | Yes | Wraps an `UpdateA_ProductSalesDelivery` record with the fields to change, for example `MinimumOrderQuantity`, in the `d` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check productClient->patchA_ProductSalesDelivery(
    "TG11",
    "1710",
    "10",
    {d: {MinimumOrderQuantity: "5.000"}}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</details>

<details>
<summary>listSalesDeliveriesOfA_Product</summary>

Retrieves the sales organization data of a specific product through the `to_SalesDelivery` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListSalesDeliveriesOfA_ProductQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_ProductSalesDeliveryWrapper|error`

Sample code:

```ballerina
product:CollectionOfA_ProductSalesDeliveryWrapper salesDeliveries = check productClient->listSalesDeliveriesOfA_Product(
    "TG11",
    queries = {
        \$select: ["ProductSalesOrg", "ProductDistributionChnl", "SupplyingPlant", "ItemCategoryGroup"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "ProductSalesOrg": "1710",
        "ProductDistributionChnl": "10",
        "SupplyingPlant": "1710",
        "ItemCategoryGroup": "NORM"
      },
      {
        "ProductSalesOrg": "1710",
        "ProductDistributionChnl": "20",
        "SupplyingPlant": "1710",
        "ItemCategoryGroup": "NORM"
      }
    ]
  }
}
```

</details>

<details>
<summary>createSalesDeliveryOfA_Product</summary>

Creates sales organization data through the `to_SalesDelivery` navigation of a specific product.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `payload` | `CreateA_ProductSalesDelivery` | Yes | Sales organization data with the required key fields `Product`, `ProductSalesOrg` and `ProductDistributionChnl`, plus fields such as `SupplyingPlant`, `ItemCategoryGroup` and `MinimumOrderQuantity`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_ProductSalesDeliveryWrapper|error`

Sample code:

```ballerina
product:A_ProductSalesDeliveryWrapper salesDelivery = check productClient->createSalesDeliveryOfA_Product(
    "TG11",
    {
        Product: "TG11",
        ProductSalesOrg: "1710",
        ProductDistributionChnl: "20",
        SupplyingPlant: "1710",
        ItemCategoryGroup: "NORM",
        MinimumOrderQuantity: "1.000",
        SalesMeasureUnit: "PC"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG11",
    "ProductSalesOrg": "1710",
    "ProductDistributionChnl": "20",
    "SupplyingPlant": "1710",
    "ItemCategoryGroup": "NORM",
    "MinimumOrderQuantity": "1.000",
    "SalesMeasureUnit": "PC"
  }
}
```

</details>

#### Sales texts

<details>
<summary>listA_ProductSalesTexts</summary>

Retrieves a collection of sales texts, the long texts that SAP copies into sales document items for each product, sales organization, distribution channel and language.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_ProductSalesTextsQueries` | No | OData query parameters: `$filter`, `$select`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_ProductSalesTextWrapper|error`

Sample code:

```ballerina
product:CollectionOfA_ProductSalesTextWrapper salesTexts = check productClient->listA_ProductSalesTexts(
    queries = {
        \$filter: "ProductSalesOrg eq '1710' and Language eq 'EN'",
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
        "Product": "TG11",
        "ProductSalesOrg": "1710",
        "ProductDistributionChnl": "10",
        "Language": "EN",
        "LongText": "Available in cartons of 12 pieces. Free shipping for orders of 10 cartons or more."
      },
      {
        "Product": "TG12",
        "ProductSalesOrg": "1710",
        "ProductDistributionChnl": "10",
        "Language": "EN",
        "LongText": "Available in single pieces."
      }
    ]
  }
}
```

</details>

<details>
<summary>createA_ProductSalesText</summary>

Creates the sales text of a product for a sales organization, distribution channel and language.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateA_ProductSalesText` | Yes | Sales text with the required key fields `Product`, `ProductSalesOrg`, `ProductDistributionChnl` and `Language`, plus fields such as `LongText`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_ProductSalesTextWrapper|error`

Sample code:

```ballerina
product:A_ProductSalesTextWrapper salesText = check productClient->createA_ProductSalesText({
    Product: "TG11",
    ProductSalesOrg: "1710",
    ProductDistributionChnl: "10",
    Language: "EN",
    LongText: "Available in cartons of 12 pieces. Free shipping for orders of 10 cartons or more."
});
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG11",
    "ProductSalesOrg": "1710",
    "ProductDistributionChnl": "10",
    "Language": "EN",
    "LongText": "Available in cartons of 12 pieces. Free shipping for orders of 10 cartons or more."
  }
}
```

</details>

<details>
<summary>getA_ProductSalesText</summary>

Retrieves the sales text of a specific product for a sales organization, distribution channel and language.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `ProductSalesOrg` | `string` | Yes | Sales organization (e.g., `"1710"`). |
| `ProductDistributionChnl` | `string` | Yes | Distribution channel (e.g., `"10"`). |
| `Language` | `string` | Yes | Language key (e.g., `"EN"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_ProductSalesTextQueries` | No | OData query parameters: `$select`. |

Returns: `A_ProductSalesTextWrapper|error`

Sample code:

```ballerina
product:A_ProductSalesTextWrapper salesText = check productClient->getA_ProductSalesText("TG11", "1710", "10", "EN");
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG11",
    "ProductSalesOrg": "1710",
    "ProductDistributionChnl": "10",
    "Language": "EN",
    "LongText": "Available in cartons of 12 pieces. Free shipping for orders of 10 cartons or more."
  }
}
```

</details>

<details>
<summary>patchA_ProductSalesText</summary>

Updates the sales text of a product using a PATCH request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `ProductSalesOrg` | `string` | Yes | Sales organization (e.g., `"1710"`). |
| `ProductDistributionChnl` | `string` | Yes | Distribution channel (e.g., `"10"`). |
| `Language` | `string` | Yes | Language key (e.g., `"EN"`). |
| `payload` | `UpdateA_ProductSalesTextWrapper` | Yes | Wraps an `UpdateA_ProductSalesText` record (`LongText`) in the `d` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check productClient->patchA_ProductSalesText(
    "TG11",
    "1710",
    "10",
    "EN",
    {d: {LongText: "Available in cartons of 12 pieces. Free shipping for orders of 5 cartons or more."}}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</details>

<details>
<summary>deleteA_ProductSalesText</summary>

Deletes the sales text of a product for a sales organization, distribution channel and language.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `ProductSalesOrg` | `string` | Yes | Sales organization (e.g., `"1710"`). |
| `ProductDistributionChnl` | `string` | Yes | Distribution channel (e.g., `"10"`). |
| `Language` | `string` | Yes | Language key (e.g., `"EN"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check productClient->deleteA_ProductSalesText("TG11", "1710", "10", "EN");
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</details>

<details>
<summary>listSalesTextsOfA_ProductSalesDelivery</summary>

Retrieves the sales texts of a specific sales organization data record through the `to_SalesText` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `ProductSalesOrg` | `string` | Yes | Sales organization (e.g., `"1710"`). |
| `ProductDistributionChnl` | `string` | Yes | Distribution channel (e.g., `"10"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListSalesTextsOfA_ProductSalesDeliveryQueries` | No | OData query parameters: `$filter`, `$select`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_ProductSalesTextWrapper|error`

Sample code:

```ballerina
product:CollectionOfA_ProductSalesTextWrapper salesTexts = check productClient->listSalesTextsOfA_ProductSalesDelivery("TG11", "1710", "10");
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "Product": "TG11",
        "ProductSalesOrg": "1710",
        "ProductDistributionChnl": "10",
        "Language": "EN",
        "LongText": "Available in cartons of 12 pieces. Free shipping for orders of 10 cartons or more."
      }
    ]
  }
}
```

</details>

<details>
<summary>createSalesTextOfA_ProductSalesDelivery</summary>

Creates a sales text through the `to_SalesText` navigation of a specific sales organization data record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `ProductSalesOrg` | `string` | Yes | Sales organization (e.g., `"1710"`). |
| `ProductDistributionChnl` | `string` | Yes | Distribution channel (e.g., `"10"`). |
| `payload` | `CreateA_ProductSalesText` | Yes | Sales text with the required key fields `Product`, `ProductSalesOrg`, `ProductDistributionChnl` and `Language`, plus fields such as `LongText`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_ProductSalesTextWrapper|error`

Sample code:

```ballerina
product:A_ProductSalesTextWrapper salesText = check productClient->createSalesTextOfA_ProductSalesDelivery(
    "TG11",
    "1710",
    "10",
    {
        Product: "TG11",
        ProductSalesOrg: "1710",
        ProductDistributionChnl: "10",
        Language: "EN",
        LongText: "Available in cartons of 12 pieces. Free shipping for orders of 10 cartons or more."
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG11",
    "ProductSalesOrg": "1710",
    "ProductDistributionChnl": "10",
    "Language": "EN",
    "LongText": "Available in cartons of 12 pieces. Free shipping for orders of 10 cartons or more."
  }
}
```

</details>

#### Sales tax data

<details>
<summary>listA_ProductSalesTaxes</summary>

Retrieves a collection of product sales tax data records, with the tax classification of each product for each departure country and tax category.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_ProductSalesTaxesQueries` | No | OData query parameters: `$filter`, `$select`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_ProductSalesTaxWrapper|error`

Sample code:

```ballerina
product:CollectionOfA_ProductSalesTaxWrapper salesTaxes = check productClient->listA_ProductSalesTaxes(
    queries = {
        \$filter: "Country eq 'US'",
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
        "Product": "TG11",
        "Country": "US",
        "TaxCategory": "UTXJ",
        "TaxClassification": "1"
      },
      {
        "Product": "TG12",
        "Country": "US",
        "TaxCategory": "UTXJ",
        "TaxClassification": "0"
      }
    ]
  }
}
```

</details>

<details>
<summary>createA_ProductSalesTax</summary>

Creates a sales tax classification of a product for a departure country and tax category.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateA_ProductSalesTax` | Yes | Sales tax data with the required key fields `Product`, `Country`, `TaxCategory` and `TaxClassification`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_ProductSalesTaxWrapper|error`

Sample code:

```ballerina
product:A_ProductSalesTaxWrapper salesTax = check productClient->createA_ProductSalesTax({
    Product: "TG21",
    Country: "US",
    TaxCategory: "UTXJ",
    TaxClassification: "1"
});
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG21",
    "Country": "US",
    "TaxCategory": "UTXJ",
    "TaxClassification": "1"
  }
}
```

</details>

<details>
<summary>getA_ProductSalesTax</summary>

Retrieves a specific sales tax classification of a product by departure country, tax category and tax classification.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `Country` | `string` | Yes | Departure country or region (e.g., `"US"`). |
| `TaxCategory` | `string` | Yes | Tax category, the condition type for sales tax, VAT or other taxes (e.g., `"UTXJ"`). |
| `TaxClassification` | `string` | Yes | Tax classification of the product (e.g., `"1"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_ProductSalesTaxQueries` | No | OData query parameters: `$select`. |

Returns: `A_ProductSalesTaxWrapper|error`

Sample code:

```ballerina
product:A_ProductSalesTaxWrapper salesTax = check productClient->getA_ProductSalesTax("TG11", "US", "UTXJ", "1");
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG11",
    "Country": "US",
    "TaxCategory": "UTXJ",
    "TaxClassification": "1"
  }
}
```

</details>

<details>
<summary>patchA_ProductSalesTax</summary>

Sends a PATCH request for a sales tax classification of a product. All the fields of `A_ProductSalesTax` are key fields, so `UpdateA_ProductSalesTax` has no fields to change. To change the tax classification, delete the record and create a new one.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `Country` | `string` | Yes | Departure country or region (e.g., `"US"`). |
| `TaxCategory` | `string` | Yes | Tax category, the condition type for sales tax, VAT or other taxes (e.g., `"UTXJ"`). |
| `TaxClassification` | `string` | Yes | Tax classification of the product (e.g., `"1"`). |
| `payload` | `UpdateA_ProductSalesTaxWrapper` | Yes | Wraps an `UpdateA_ProductSalesTax` record in the `d` field. The record has no fields, because all the fields of `A_ProductSalesTax` are key fields. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check productClient->patchA_ProductSalesTax(
    "TG11",
    "US",
    "UTXJ",
    "1",
    {d: {}}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</details>

<details>
<summary>deleteA_ProductSalesTax</summary>

Deletes a sales tax classification of a product.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG21"`). |
| `Country` | `string` | Yes | Departure country or region (e.g., `"US"`). |
| `TaxCategory` | `string` | Yes | Tax category, the condition type for sales tax, VAT or other taxes (e.g., `"UTXJ"`). |
| `TaxClassification` | `string` | Yes | Tax classification of the product (e.g., `"1"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check productClient->deleteA_ProductSalesTax("TG21", "US", "UTXJ", "1");
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</details>

<details>
<summary>listProductSalesTaxesOfA_Product</summary>

Retrieves the sales tax data of a specific product through the `to_ProductSalesTax` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListProductSalesTaxesOfA_ProductQueries` | No | OData query parameters: `$filter`, `$select`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_ProductSalesTaxWrapper|error`

Sample code:

```ballerina
product:CollectionOfA_ProductSalesTaxWrapper salesTaxes = check productClient->listProductSalesTaxesOfA_Product("TG11");
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "Product": "TG11",
        "Country": "US",
        "TaxCategory": "UTXJ",
        "TaxClassification": "1"
      }
    ]
  }
}
```

</details>

<details>
<summary>createProductSalesTaxOfA_Product</summary>

Creates sales tax data through the `to_ProductSalesTax` navigation of a specific product.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG21"`). |
| `payload` | `CreateA_ProductSalesTax` | Yes | Sales tax data with the required key fields `Product`, `Country`, `TaxCategory` and `TaxClassification`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_ProductSalesTaxWrapper|error`

Sample code:

```ballerina
product:A_ProductSalesTaxWrapper salesTax = check productClient->createProductSalesTaxOfA_Product(
    "TG21",
    {
        Product: "TG21",
        Country: "US",
        TaxCategory: "UTXJ",
        TaxClassification: "1"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG21",
    "Country": "US",
    "TaxCategory": "UTXJ",
    "TaxClassification": "1"
  }
}
```

</details>

<details>
<summary>listSalesTaxesOfA_ProductSalesDelivery</summary>

Retrieves the sales tax data of a specific sales organization data record through the `to_SalesTax` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `ProductSalesOrg` | `string` | Yes | Sales organization (e.g., `"1710"`). |
| `ProductDistributionChnl` | `string` | Yes | Distribution channel (e.g., `"10"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListSalesTaxesOfA_ProductSalesDeliveryQueries` | No | OData query parameters: `$filter`, `$select`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_ProductSalesTaxWrapper|error`

Sample code:

```ballerina
product:CollectionOfA_ProductSalesTaxWrapper salesTaxes = check productClient->listSalesTaxesOfA_ProductSalesDelivery("TG11", "1710", "10");
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "Product": "TG11",
        "Country": "US",
        "TaxCategory": "UTXJ",
        "TaxClassification": "1"
      }
    ]
  }
}
```

</details>

<details>
<summary>createSalesTaxOfA_ProductSalesDelivery</summary>

Creates sales tax data through the `to_SalesTax` navigation of a specific sales organization data record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG21"`). |
| `ProductSalesOrg` | `string` | Yes | Sales organization (e.g., `"1710"`). |
| `ProductDistributionChnl` | `string` | Yes | Distribution channel (e.g., `"10"`). |
| `payload` | `CreateA_ProductSalesTax` | Yes | Sales tax data with the required key fields `Product`, `Country`, `TaxCategory` and `TaxClassification`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_ProductSalesTaxWrapper|error`

Sample code:

```ballerina
product:A_ProductSalesTaxWrapper salesTax = check productClient->createSalesTaxOfA_ProductSalesDelivery(
    "TG21",
    "1710",
    "10",
    {
        Product: "TG21",
        Country: "US",
        TaxCategory: "UTXJ",
        TaxClassification: "1"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG21",
    "Country": "US",
    "TaxCategory": "UTXJ",
    "TaxClassification": "1"
  }
}
```

</details>

#### Valuation data

<details>
<summary>listA_ProductValuations</summary>

Retrieves a collection of product valuation data records, with the valuation class, price control, standard and moving average prices and planned prices of each product in each valuation area.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_ProductValuationsQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_ProductValuationWrapper|error`

Sample code:

```ballerina
product:CollectionOfA_ProductValuationWrapper valuations = check productClient->listA_ProductValuations(
    queries = {
        \$filter: "ValuationArea eq '1710'",
        \$select: ["Product", "ValuationArea", "ValuationType", "ValuationClass", "InventoryValuationProcedure", "MovingAveragePrice", "Currency"],
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
        "Product": "TG11",
        "ValuationArea": "1710",
        "ValuationType": "",
        "ValuationClass": "3100",
        "InventoryValuationProcedure": "V",
        "MovingAveragePrice": "25.00",
        "Currency": "USD"
      },
      {
        "Product": "TG12",
        "ValuationArea": "1710",
        "ValuationType": "",
        "ValuationClass": "3100",
        "InventoryValuationProcedure": "V",
        "MovingAveragePrice": "18.40",
        "Currency": "USD"
      }
    ]
  }
}
```

</details>

<details>
<summary>createA_ProductValuation</summary>

Creates the valuation data of a product in a valuation area.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateA_ProductValuation` | Yes | Valuation data with the required key fields `Product`, `ValuationArea` and `ValuationType`, plus fields such as `ValuationClass`, `InventoryValuationProcedure` and `PriceUnitQty`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_ProductValuationWrapper|error`

Sample code:

```ballerina
product:A_ProductValuationWrapper valuation = check productClient->createA_ProductValuation({
    Product: "TG11",
    ValuationArea: "1720",
    ValuationType: "",
    ValuationClass: "3100",
    InventoryValuationProcedure: "V",
    PriceUnitQty: "1",
    MovingAveragePrice: "25.60",
    Currency: "USD"
});
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG11",
    "ValuationArea": "1720",
    "ValuationType": "",
    "ValuationClass": "3100",
    "InventoryValuationProcedure": "V",
    "PriceUnitQty": "1",
    "MovingAveragePrice": "25.60",
    "Currency": "USD"
  }
}
```

</details>

<details>
<summary>getA_ProductValuation</summary>

Retrieves the valuation data of a specific product in a valuation area. Expand `to_ValuationAccount`, `to_ValuationCosting`, `to_MLAccount` or `to_MLPrices` to include related data.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `ValuationArea` | `string` | Yes | Valuation area (e.g., `"1710"`). |
| `ValuationType` | `string` | Yes | Valuation type, an empty string when the product isn't split valuated (e.g., `""`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_ProductValuationQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_ProductValuationWrapper|error`

Sample code:

```ballerina
product:A_ProductValuationWrapper valuation = check productClient->getA_ProductValuation("TG11", "1710", "");
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG11",
    "ValuationArea": "1710",
    "ValuationType": "",
    "ValuationClass": "3100",
    "PriceDeterminationControl": "2",
    "StandardPrice": "0.00",
    "PriceUnitQty": "1",
    "InventoryValuationProcedure": "V",
    "IsMarkedForDeletion": false,
    "MovingAveragePrice": "25.00",
    "ValuationCategory": "",
    "ProductUsageType": "",
    "ProductOriginType": "",
    "IsProducedInhouse": false,
    "PlannedPrice1InCoCodeCrcy": "0.00",
    "FuturePlndPrice1ValdtyDate": null,
    "PriceLastChangeDate": "/Date(1762819200000)/",
    "Currency": "USD",
    "BaseUnit": "PC"
  }
}
```

</details>

<details>
<summary>patchA_ProductValuation</summary>

Updates the valuation data of a product using a PATCH request, for example the planned prices or the deletion flag.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `ValuationArea` | `string` | Yes | Valuation area (e.g., `"1710"`). |
| `ValuationType` | `string` | Yes | Valuation type, an empty string when the product isn't split valuated (e.g., `""`). |
| `payload` | `UpdateA_ProductValuationWrapper` | Yes | Wraps an `UpdateA_ProductValuation` record with the fields to change, for example `PlannedPrice1InCoCodeCrcy` and `FuturePlndPrice1ValdtyDate`, in the `d` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check productClient->patchA_ProductValuation(
    "TG11",
    "1710",
    "",
    {d: {PlannedPrice1InCoCodeCrcy: "26.50", FuturePlndPrice1ValdtyDate: "/Date(1767225600000)/"}}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</details>

<details>
<summary>listValuationsOfA_Product</summary>

Retrieves the valuation data of a specific product through the `to_Valuation` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListValuationsOfA_ProductQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_ProductValuationWrapper|error`

Sample code:

```ballerina
product:CollectionOfA_ProductValuationWrapper valuations = check productClient->listValuationsOfA_Product(
    "TG11",
    queries = {
        \$select: ["ValuationArea", "ValuationType", "ValuationClass", "MovingAveragePrice", "Currency"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "ValuationArea": "1710",
        "ValuationType": "",
        "ValuationClass": "3100",
        "MovingAveragePrice": "25.00",
        "Currency": "USD"
      },
      {
        "ValuationArea": "1720",
        "ValuationType": "",
        "ValuationClass": "3100",
        "MovingAveragePrice": "25.60",
        "Currency": "USD"
      }
    ]
  }
}
```

</details>

<details>
<summary>createValuationOfA_Product</summary>

Creates valuation data through the `to_Valuation` navigation of a specific product.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `payload` | `CreateA_ProductValuation` | Yes | Valuation data with the required key fields `Product`, `ValuationArea` and `ValuationType`, plus fields such as `ValuationClass`, `InventoryValuationProcedure` and `PriceUnitQty`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_ProductValuationWrapper|error`

Sample code:

```ballerina
product:A_ProductValuationWrapper valuation = check productClient->createValuationOfA_Product(
    "TG11",
    {
        Product: "TG11",
        ValuationArea: "1720",
        ValuationType: "",
        ValuationClass: "3100",
        InventoryValuationProcedure: "V",
        PriceUnitQty: "1",
        MovingAveragePrice: "25.60",
        Currency: "USD"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG11",
    "ValuationArea": "1720",
    "ValuationType": "",
    "ValuationClass": "3100",
    "InventoryValuationProcedure": "V",
    "PriceUnitQty": "1",
    "MovingAveragePrice": "25.60",
    "Currency": "USD"
  }
}
```

</details>

#### Valuation account data

<details>
<summary>listA_ProductValuationAccounts</summary>

Retrieves a collection of valuation account data records, with the commercial and tax prices, devaluation and LIFO/FIFO settings of each product in each valuation area.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_ProductValuationAccountsQueries` | No | OData query parameters: `$filter`, `$select`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_ProductValuationAccountWrapper|error`

Sample code:

```ballerina
product:CollectionOfA_ProductValuationAccountWrapper valuationAccounts = check productClient->listA_ProductValuationAccounts(
    queries = {
        \$filter: "ValuationArea eq '1710'",
        \$select: ["Product", "ValuationArea", "ValuationType", "CommercialPrice1InCoCodeCrcy", "Currency"],
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
        "Product": "TG11",
        "ValuationArea": "1710",
        "ValuationType": "",
        "CommercialPrice1InCoCodeCrcy": "0.00",
        "Currency": "USD"
      },
      {
        "Product": "TG12",
        "ValuationArea": "1710",
        "ValuationType": "",
        "CommercialPrice1InCoCodeCrcy": "18.00",
        "Currency": "USD"
      }
    ]
  }
}
```

</details>

<details>
<summary>createA_ProductValuationAccount</summary>

Creates the valuation account data of a product in a valuation area.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateA_ProductValuationAccount` | Yes | Valuation account data with the required key fields `Product`, `ValuationArea` and `ValuationType`, plus fields such as `CommercialPrice1InCoCodeCrcy` and `Currency`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_ProductValuationAccountWrapper|error`

Sample code:

```ballerina
product:A_ProductValuationAccountWrapper valuationAccount = check productClient->createA_ProductValuationAccount({
    Product: "TG11",
    ValuationArea: "1720",
    ValuationType: "",
    CommercialPrice1InCoCodeCrcy: "24.00",
    Currency: "USD"
});
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG11",
    "ValuationArea": "1720",
    "ValuationType": "",
    "CommercialPrice1InCoCodeCrcy": "24.00",
    "Currency": "USD"
  }
}
```

</details>

<details>
<summary>getA_ProductValuationAccount</summary>

Retrieves the valuation account data of a specific product in a valuation area.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `ValuationArea` | `string` | Yes | Valuation area (e.g., `"1710"`). |
| `ValuationType` | `string` | Yes | Valuation type, an empty string when the product isn't split valuated (e.g., `""`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_ProductValuationAccountQueries` | No | OData query parameters: `$select`. |

Returns: `A_ProductValuationAccountWrapper|error`

Sample code:

```ballerina
product:A_ProductValuationAccountWrapper valuationAccount = check productClient->getA_ProductValuationAccount("TG11", "1710", "");
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG11",
    "ValuationArea": "1710",
    "ValuationType": "",
    "CommercialPrice1InCoCodeCrcy": "0.00",
    "CommercialPrice2InCoCodeCrcy": "0.00",
    "CommercialPrice3InCoCodeCrcy": "0.00",
    "DevaluationYearCount": "0",
    "FutureEvaluatedAmountValue": "0.00",
    "FuturePriceValidityStartDate": null,
    "IsLIFOAndFIFORelevant": false,
    "LIFOValuationPoolNumber": "",
    "TaxPricel1InCoCodeCrcy": "0.00",
    "TaxPrice2InCoCodeCrcy": "0.00",
    "TaxPrice3InCoCodeCrcy": "0.00",
    "Currency": "USD"
  }
}
```

</details>

<details>
<summary>patchA_ProductValuationAccount</summary>

Updates the valuation account data of a product using a PATCH request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `ValuationArea` | `string` | Yes | Valuation area (e.g., `"1710"`). |
| `ValuationType` | `string` | Yes | Valuation type, an empty string when the product isn't split valuated (e.g., `""`). |
| `payload` | `UpdateA_ProductValuationAccountWrapper` | Yes | Wraps an `UpdateA_ProductValuationAccount` record with the fields to change, for example `CommercialPrice1InCoCodeCrcy`, in the `d` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check productClient->patchA_ProductValuationAccount(
    "TG11",
    "1710",
    "",
    {d: {CommercialPrice1InCoCodeCrcy: "24.00"}}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</details>

<details>
<summary>getValuationAccountOfA_ProductValuation</summary>

Retrieves the valuation account data of a specific valuation data record through the `to_ValuationAccount` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `ValuationArea` | `string` | Yes | Valuation area (e.g., `"1710"`). |
| `ValuationType` | `string` | Yes | Valuation type, an empty string when the product isn't split valuated (e.g., `""`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetValuationAccountOfA_ProductValuationQueries` | No | OData query parameters: `$select`. |

Returns: `A_ProductValuationAccountWrapper|error`

Sample code:

```ballerina
product:A_ProductValuationAccountWrapper valuationAccount = check productClient->getValuationAccountOfA_ProductValuation("TG11", "1710", "");
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG11",
    "ValuationArea": "1710",
    "ValuationType": "",
    "CommercialPrice1InCoCodeCrcy": "0.00",
    "CommercialPrice2InCoCodeCrcy": "0.00",
    "CommercialPrice3InCoCodeCrcy": "0.00"
  }
}
```

</details>

#### Valuation costing data

<details>
<summary>listA_ProductValuationCostings</summary>

Retrieves a collection of valuation costing data records, with the origin group, overhead group and quantity structure setting that product costing uses for each product in each valuation area.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_ProductValuationCostingsQueries` | No | OData query parameters: `$filter`, `$select`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_ProductValuationCostingWrapper|error`

Sample code:

```ballerina
product:CollectionOfA_ProductValuationCostingWrapper valuationCostingData = check productClient->listA_ProductValuationCostings(
    queries = {
        \$filter: "ValuationArea eq '1710'",
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
        "Product": "TG11",
        "ValuationArea": "1710",
        "ValuationType": "",
        "IsMaterialCostedWithQtyStruc": false,
        "IsMaterialRelatedOrigin": "X",
        "CostOriginGroup": "",
        "CostingOverheadGroup": ""
      },
      {
        "Product": "TG12",
        "ValuationArea": "1710",
        "ValuationType": "",
        "IsMaterialCostedWithQtyStruc": false,
        "IsMaterialRelatedOrigin": "",
        "CostOriginGroup": "",
        "CostingOverheadGroup": ""
      }
    ]
  }
}
```

</details>

<details>
<summary>createA_ProductValuationCosting</summary>

Creates the costing data of a product in a valuation area.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateA_ProductValuationCosting` | Yes | Valuation costing data with the required key fields `Product`, `ValuationArea` and `ValuationType`, plus fields such as `IsMaterialRelatedOrigin`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_ProductValuationCostingWrapper|error`

Sample code:

```ballerina
product:A_ProductValuationCostingWrapper valuationCosting = check productClient->createA_ProductValuationCosting({
    Product: "TG11",
    ValuationArea: "1720",
    ValuationType: "",
    IsMaterialRelatedOrigin: "X"
});
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG11",
    "ValuationArea": "1720",
    "ValuationType": "",
    "IsMaterialCostedWithQtyStruc": false,
    "IsMaterialRelatedOrigin": "X",
    "CostOriginGroup": "",
    "CostingOverheadGroup": ""
  }
}
```

</details>

<details>
<summary>getA_ProductValuationCosting</summary>

Retrieves the costing data of a specific product in a valuation area.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `ValuationArea` | `string` | Yes | Valuation area (e.g., `"1710"`). |
| `ValuationType` | `string` | Yes | Valuation type, an empty string when the product isn't split valuated (e.g., `""`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_ProductValuationCostingQueries` | No | OData query parameters: `$select`. |

Returns: `A_ProductValuationCostingWrapper|error`

Sample code:

```ballerina
product:A_ProductValuationCostingWrapper valuationCosting = check productClient->getA_ProductValuationCosting("TG11", "1710", "");
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG11",
    "ValuationArea": "1710",
    "ValuationType": "",
    "IsMaterialCostedWithQtyStruc": false,
    "IsMaterialRelatedOrigin": "X",
    "CostOriginGroup": "",
    "CostingOverheadGroup": ""
  }
}
```

</details>

<details>
<summary>patchA_ProductValuationCosting</summary>

Updates the costing data of a product in a valuation area using a PATCH request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `ValuationArea` | `string` | Yes | Valuation area (e.g., `"1710"`). |
| `ValuationType` | `string` | Yes | Valuation type, an empty string when the product isn't split valuated (e.g., `""`). |
| `payload` | `UpdateA_ProductValuationCostingWrapper` | Yes | Wraps an `UpdateA_ProductValuationCosting` record with the fields to change, for example `CostOriginGroup`, in the `d` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check productClient->patchA_ProductValuationCosting(
    "TG11",
    "1710",
    "",
    {d: {CostOriginGroup: "TRAD"}}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</details>

<details>
<summary>getValuationCostingOfA_ProductValuation</summary>

Retrieves the valuation costing data of a specific valuation data record through the `to_ValuationCosting` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `ValuationArea` | `string` | Yes | Valuation area (e.g., `"1710"`). |
| `ValuationType` | `string` | Yes | Valuation type, an empty string when the product isn't split valuated (e.g., `""`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetValuationCostingOfA_ProductValuationQueries` | No | OData query parameters: `$select`. |

Returns: `A_ProductValuationCostingWrapper|error`

Sample code:

```ballerina
product:A_ProductValuationCostingWrapper valuationCosting = check productClient->getValuationCostingOfA_ProductValuation("TG11", "1710", "");
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG11",
    "ValuationArea": "1710",
    "ValuationType": "",
    "IsMaterialCostedWithQtyStruc": false,
    "IsMaterialRelatedOrigin": "X",
    "CostOriginGroup": ""
  }
}
```

</details>

#### Material ledger account data

<details>
<summary>listA_ProductMLAccounts</summary>

Retrieves a collection of material ledger account data records, with the price control, standard price and moving average price of each product in each valuation area and currency.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_ProductMLAccountsQueries` | No | OData query parameters: `$filter`, `$select`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_ProductMLAccountWrapper|error`

Sample code:

```ballerina
product:CollectionOfA_ProductMLAccountWrapper mlAccounts = check productClient->listA_ProductMLAccounts(
    queries = {
        \$filter: "Product eq 'TG11' and ValuationArea eq '1710'"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "Product": "TG11",
        "ValuationArea": "1710",
        "ValuationType": "",
        "CurrencyRole": "10",
        "Currency": "USD",
        "ProductPriceControl": "V",
        "PriceUnitQty": "1",
        "MovingAveragePrice": "25.00",
        "StandardPrice": "0.00"
      },
      {
        "Product": "TG11",
        "ValuationArea": "1710",
        "ValuationType": "",
        "CurrencyRole": "30",
        "Currency": "EUR",
        "ProductPriceControl": "V",
        "PriceUnitQty": "1",
        "MovingAveragePrice": "23.10",
        "StandardPrice": "0.00"
      }
    ]
  }
}
```

</details>

<details>
<summary>createA_ProductMLAccount</summary>

Creates the material ledger account data of a product in a valuation area for a currency type.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateA_ProductMLAccount` | Yes | Material ledger account data with the required key fields `Product`, `ValuationArea`, `ValuationType` and `CurrencyRole`, plus fields such as `Currency`, `ProductPriceControl` and `PriceUnitQty`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_ProductMLAccountWrapper|error`

Sample code:

```ballerina
product:A_ProductMLAccountWrapper mlAccount = check productClient->createA_ProductMLAccount({
    Product: "TG11",
    ValuationArea: "1720",
    ValuationType: "",
    CurrencyRole: "10",
    Currency: "USD",
    ProductPriceControl: "V",
    PriceUnitQty: "1",
    MovingAveragePrice: "25.60"
});
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG11",
    "ValuationArea": "1720",
    "ValuationType": "",
    "CurrencyRole": "10",
    "Currency": "USD",
    "ProductPriceControl": "V",
    "PriceUnitQty": "1",
    "MovingAveragePrice": "25.60"
  }
}
```

</details>

<details>
<summary>getA_ProductMLAccount</summary>

Retrieves the material ledger account data of a specific product in a valuation area for one currency type.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `ValuationArea` | `string` | Yes | Valuation area (e.g., `"1710"`). |
| `ValuationType` | `string` | Yes | Valuation type, an empty string when the product isn't split valuated (e.g., `""`). |
| `CurrencyRole` | `string` | Yes | Currency type and valuation view (e.g., `"10"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_ProductMLAccountQueries` | No | OData query parameters: `$select`. |

Returns: `A_ProductMLAccountWrapper|error`

Sample code:

```ballerina
product:A_ProductMLAccountWrapper mlAccount = check productClient->getA_ProductMLAccount("TG11", "1710", "", "10");
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG11",
    "ValuationArea": "1710",
    "ValuationType": "",
    "CurrencyRole": "10",
    "Currency": "USD",
    "ProductPriceControl": "V",
    "PriceUnitQty": "1",
    "MovingAveragePrice": "25.00",
    "StandardPrice": "0.00"
  }
}
```

</details>

<details>
<summary>patchA_ProductMLAccount</summary>

Updates the material ledger account data of a product using a PATCH request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `ValuationArea` | `string` | Yes | Valuation area (e.g., `"1710"`). |
| `ValuationType` | `string` | Yes | Valuation type, an empty string when the product isn't split valuated (e.g., `""`). |
| `CurrencyRole` | `string` | Yes | Currency type and valuation view (e.g., `"10"`). |
| `payload` | `UpdateA_ProductMLAccountWrapper` | Yes | Wraps an `UpdateA_ProductMLAccount` record with the fields to change, for example `PriceUnitQty`, in the `d` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check productClient->patchA_ProductMLAccount(
    "TG11",
    "1710",
    "",
    "10",
    {d: {PriceUnitQty: "10"}}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</details>

<details>
<summary>listMLAccountsOfA_ProductValuation</summary>

Retrieves the material ledger account data of a specific valuation data record through the `to_MLAccount` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `ValuationArea` | `string` | Yes | Valuation area (e.g., `"1710"`). |
| `ValuationType` | `string` | Yes | Valuation type, an empty string when the product isn't split valuated (e.g., `""`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListMLAccountsOfA_ProductValuationQueries` | No | OData query parameters: `$filter`, `$select`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_ProductMLAccountWrapper|error`

Sample code:

```ballerina
product:CollectionOfA_ProductMLAccountWrapper mlAccounts = check productClient->listMLAccountsOfA_ProductValuation("TG11", "1710", "");
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "Product": "TG11",
        "ValuationArea": "1710",
        "ValuationType": "",
        "CurrencyRole": "10",
        "Currency": "USD",
        "ProductPriceControl": "V",
        "PriceUnitQty": "1",
        "MovingAveragePrice": "25.00",
        "StandardPrice": "0.00"
      },
      {
        "Product": "TG11",
        "ValuationArea": "1710",
        "ValuationType": "",
        "CurrencyRole": "30",
        "Currency": "EUR",
        "ProductPriceControl": "V",
        "PriceUnitQty": "1",
        "MovingAveragePrice": "23.10",
        "StandardPrice": "0.00"
      }
    ]
  }
}
```

</details>

<details>
<summary>createMLAccountOfA_ProductValuation</summary>

Creates material ledger account data through the `to_MLAccount` navigation of a specific valuation data record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `ValuationArea` | `string` | Yes | Valuation area (e.g., `"1720"`). |
| `ValuationType` | `string` | Yes | Valuation type, an empty string when the product isn't split valuated (e.g., `""`). |
| `payload` | `CreateA_ProductMLAccount` | Yes | Material ledger account data with the required key fields `Product`, `ValuationArea`, `ValuationType` and `CurrencyRole`, plus fields such as `Currency`, `ProductPriceControl` and `PriceUnitQty`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_ProductMLAccountWrapper|error`

Sample code:

```ballerina
product:A_ProductMLAccountWrapper mlAccount = check productClient->createMLAccountOfA_ProductValuation(
    "TG11",
    "1720",
    "",
    {
        Product: "TG11",
        ValuationArea: "1720",
        ValuationType: "",
        CurrencyRole: "10",
        Currency: "USD",
        ProductPriceControl: "V",
        PriceUnitQty: "1",
        MovingAveragePrice: "25.60"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG11",
    "ValuationArea": "1720",
    "ValuationType": "",
    "CurrencyRole": "10",
    "Currency": "USD",
    "ProductPriceControl": "V",
    "PriceUnitQty": "1",
    "MovingAveragePrice": "25.60"
  }
}
```

</details>

#### Material ledger price data

<details>
<summary>listA_ProductMLPricess</summary>

Retrieves a collection of material ledger price data records, with the future price, its validity start date and the planned price of each product in each valuation area and currency.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_ProductMLPricessQueries` | No | OData query parameters: `$filter`, `$select`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_ProductMLPricesWrapper|error`

Sample code:

```ballerina
product:CollectionOfA_ProductMLPricesWrapper mlPricesList = check productClient->listA_ProductMLPricess(
    queries = {
        \$filter: "Product eq 'TG11' and ValuationArea eq '1710'"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "Product": "TG11",
        "ValuationArea": "1710",
        "ValuationType": "",
        "CurrencyRole": "10",
        "Currency": "USD",
        "FuturePrice": "26.00",
        "FuturePriceValidityStartDate": "/Date(1767225600000)/",
        "PlannedPrice": "25.50"
      },
      {
        "Product": "TG11",
        "ValuationArea": "1710",
        "ValuationType": "",
        "CurrencyRole": "30",
        "Currency": "EUR",
        "FuturePrice": "24.00",
        "FuturePriceValidityStartDate": "/Date(1767225600000)/",
        "PlannedPrice": "23.50"
      }
    ]
  }
}
```

</details>

<details>
<summary>createA_ProductMLPrices</summary>

Creates the material ledger price data of a product in a valuation area for a currency type.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateA_ProductMLPrices` | Yes | Material ledger price data with the required key fields `Product`, `ValuationArea`, `ValuationType` and `CurrencyRole`, plus fields such as `Currency`, `FuturePrice` and `FuturePriceValidityStartDate`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_ProductMLPricesWrapper|error`

Sample code:

```ballerina
product:A_ProductMLPricesWrapper mlPrices = check productClient->createA_ProductMLPrices({
    Product: "TG11",
    ValuationArea: "1720",
    ValuationType: "",
    CurrencyRole: "10",
    Currency: "USD",
    FuturePrice: "26.00",
    FuturePriceValidityStartDate: "/Date(1767225600000)/"
});
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG11",
    "ValuationArea": "1720",
    "ValuationType": "",
    "CurrencyRole": "10",
    "Currency": "USD",
    "FuturePrice": "26.00",
    "FuturePriceValidityStartDate": "/Date(1767225600000)/",
    "PlannedPrice": "25.50"
  }
}
```

</details>

<details>
<summary>getA_ProductMLPrices</summary>

Retrieves the material ledger price data of a specific product in a valuation area for one currency type.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `ValuationArea` | `string` | Yes | Valuation area (e.g., `"1710"`). |
| `ValuationType` | `string` | Yes | Valuation type, an empty string when the product isn't split valuated (e.g., `""`). |
| `CurrencyRole` | `string` | Yes | Currency type and valuation view (e.g., `"10"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_ProductMLPricesQueries` | No | OData query parameters: `$select`. |

Returns: `A_ProductMLPricesWrapper|error`

Sample code:

```ballerina
product:A_ProductMLPricesWrapper mlPrices = check productClient->getA_ProductMLPrices("TG11", "1710", "", "10");
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG11",
    "ValuationArea": "1710",
    "ValuationType": "",
    "CurrencyRole": "10",
    "Currency": "USD",
    "FuturePrice": "26.00",
    "FuturePriceValidityStartDate": "/Date(1767225600000)/",
    "PlannedPrice": "25.50"
  }
}
```

</details>

<details>
<summary>patchA_ProductMLPrices</summary>

Updates the material ledger price data of a product using a PATCH request, for example the future price and the date from which it applies.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `ValuationArea` | `string` | Yes | Valuation area (e.g., `"1710"`). |
| `ValuationType` | `string` | Yes | Valuation type, an empty string when the product isn't split valuated (e.g., `""`). |
| `CurrencyRole` | `string` | Yes | Currency type and valuation view (e.g., `"10"`). |
| `payload` | `UpdateA_ProductMLPricesWrapper` | Yes | Wraps an `UpdateA_ProductMLPrices` record with the fields to change, for example `FuturePrice` and `FuturePriceValidityStartDate`, in the `d` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check productClient->patchA_ProductMLPrices(
    "TG11",
    "1710",
    "",
    "10",
    {d: {FuturePrice: "26.50", FuturePriceValidityStartDate: "/Date(1767225600000)/"}}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</details>

<details>
<summary>listMLPricessOfA_ProductValuation</summary>

Retrieves the material ledger price data of a specific valuation data record through the `to_MLPrices` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `ValuationArea` | `string` | Yes | Valuation area (e.g., `"1710"`). |
| `ValuationType` | `string` | Yes | Valuation type, an empty string when the product isn't split valuated (e.g., `""`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListMLPricessOfA_ProductValuationQueries` | No | OData query parameters: `$filter`, `$select`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_ProductMLPricesWrapper|error`

Sample code:

```ballerina
product:CollectionOfA_ProductMLPricesWrapper mlPricesList = check productClient->listMLPricessOfA_ProductValuation("TG11", "1710", "");
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "Product": "TG11",
        "ValuationArea": "1710",
        "ValuationType": "",
        "CurrencyRole": "10",
        "Currency": "USD",
        "FuturePrice": "26.00",
        "FuturePriceValidityStartDate": "/Date(1767225600000)/",
        "PlannedPrice": "25.50"
      },
      {
        "Product": "TG11",
        "ValuationArea": "1710",
        "ValuationType": "",
        "CurrencyRole": "30",
        "Currency": "EUR",
        "FuturePrice": "24.00",
        "FuturePriceValidityStartDate": "/Date(1767225600000)/",
        "PlannedPrice": "23.50"
      }
    ]
  }
}
```

</details>

<details>
<summary>createMLPricesOfA_ProductValuation</summary>

Creates material ledger price data through the `to_MLPrices` navigation of a specific valuation data record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Product` | `string` | Yes | Product number (e.g., `"TG11"`). |
| `ValuationArea` | `string` | Yes | Valuation area (e.g., `"1720"`). |
| `ValuationType` | `string` | Yes | Valuation type, an empty string when the product isn't split valuated (e.g., `""`). |
| `payload` | `CreateA_ProductMLPrices` | Yes | Material ledger price data with the required key fields `Product`, `ValuationArea`, `ValuationType` and `CurrencyRole`, plus fields such as `Currency`, `FuturePrice` and `FuturePriceValidityStartDate`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_ProductMLPricesWrapper|error`

Sample code:

```ballerina
product:A_ProductMLPricesWrapper mlPrices = check productClient->createMLPricesOfA_ProductValuation(
    "TG11",
    "1720",
    "",
    {
        Product: "TG11",
        ValuationArea: "1720",
        ValuationType: "",
        CurrencyRole: "10",
        Currency: "USD",
        FuturePrice: "26.00",
        FuturePriceValidityStartDate: "/Date(1767225600000)/"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "Product": "TG11",
    "ValuationArea": "1720",
    "ValuationType": "",
    "CurrencyRole": "10",
    "Currency": "USD",
    "FuturePrice": "26.00",
    "FuturePriceValidityStartDate": "/Date(1767225600000)/",
    "PlannedPrice": "25.50"
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
string boundary = "batch_pm001";
batchRequest.setHeader("Content-Type", "multipart/mixed; boundary=" + boundary);
batchRequest.setTextPayload(
    "--" + boundary + "\r\n" +
    "Content-Type: application/http\r\n" +
    "Content-Transfer-Encoding: binary\r\n\r\n" +
    "GET A_Product('TG11') HTTP/1.1\r\n" +
    "Accept: application/json\r\n\r\n" +
    "--" + boundary + "\r\n" +
    "Content-Type: application/http\r\n" +
    "Content-Transfer-Encoding: binary\r\n\r\n" +
    "GET A_Product('TG11')/to_Plant HTTP/1.1\r\n" +
    "Accept: application/json\r\n\r\n" +
    "--" + boundary + "--"
);
http:Response batchResponse = check productClient->performBatchOperation(batchRequest);
```

Returns the raw `http:Response` from the `$batch` endpoint. On success the status code is `202 Accepted` and the body is a `multipart/mixed` payload containing one part per request in the batch, each with its own HTTP status line, headers and JSON body. Read it with `batchResponse.getTextPayload()` and parse each part as needed.

</details>
