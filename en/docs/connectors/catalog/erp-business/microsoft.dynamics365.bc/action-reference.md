---
connector: true
connector_name: "microsoft.dynamics365.bc"
toc_max_heading_level: 4
title: "Actions"
---

# Actions

The Microsoft Dynamics365 Bc connector exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Manage companies, customers, vendors, items, sales and purchase documents, journals, general ledger data, financial reports and other Business Central records through the Business Central API v1.0. |

---

## Client

The `Client` connects to the Business Central API v1.0 (`https://api.businesscentral.dynamics.com/v2.0/production/api/v1.0`). It exposes 324 operations. Most operations are scoped to a company and take its `companyId`.

### Configuration

**ConnectionConfig**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | <code>OAuth2ClientCredentialsGrantConfig&#124;http:BearerTokenConfig&#124;OAuth2RefreshTokenGrantConfig</code> | Required | Configurations related to client authentication |
| `httpVersion` | <code>http:HttpVersion</code> | <code>http:HTTP_2_0</code> | The HTTP version understood by the client |
| `http1Settings` | <code>http:ClientHttp1Settings</code> | <code>&#123;&#125;</code> | Configurations related to HTTP/1.x protocol |
| `http2Settings` | <code>http:ClientHttp2Settings</code> | <code>&#123;&#125;</code> | Configurations related to HTTP/2 protocol |
| `timeout` | <code>decimal</code> | <code>30</code> | The maximum time to wait (in seconds) for a response before closing the connection |
| `forwarded` | <code>string</code> | <code>"disable"</code> | The choice of setting `forwarded`/`x-forwarded` header |
| `followRedirects` | <code>http:FollowRedirects</code> | Optional | Configurations associated with Redirection |
| `poolConfig` | <code>http:PoolConfiguration</code> | Optional | Configurations associated with request pooling |
| `cache` | <code>http:CacheConfig</code> | <code>&#123;&#125;</code> | HTTP caching related configurations |
| `compression` | <code>http:Compression</code> | <code>http:COMPRESSION_AUTO</code> | Specifies the way of handling compression (`accept-encoding`) header |
| `circuitBreaker` | <code>http:CircuitBreakerConfig</code> | Optional | Configurations associated with the behaviour of the Circuit Breaker |
| `retryConfig` | <code>http:RetryConfig</code> | Optional | Configurations associated with retrying |
| `cookieConfig` | <code>http:CookieConfig</code> | Optional | Configurations associated with cookies |
| `responseLimits` | <code>http:ResponseLimitConfigs</code> | <code>&#123;&#125;</code> | Configurations associated with inbound response size limits |
| `secureSocket` | <code>http:ClientSecureSocket</code> | Optional | SSL/TLS-related options |
| `proxy` | <code>http:ProxyConfig</code> | Optional | Proxy server related options |
| `socketConfig` | <code>http:ClientSocketConfig</code> | <code>&#123;&#125;</code> | Provides settings related to client socket configuration |
| `validation` | <code>boolean</code> | <code>true</code> | Enables the inbound payload validation functionality which provided by the constraint package. Enabled by default |
| `laxDataBinding` | <code>boolean</code> | <code>true</code> | Enables relaxed data binding on the client side. When enabled, `nil` values are treated as optional, and absent fields are handled as `nilable` types. Enabled by default. |

### Initializing the client

```ballerina
import ballerinax/microsoft.dynamics365.bc;

configurable string tenantId = ?;
configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string refreshToken = ?;

final bc:OAuth2RefreshTokenGrantConfig auth = {
    clientId,
    clientSecret,
    refreshToken,
    refreshUrl: string `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
    scopes: ["https://api.businesscentral.dynamics.com/Financials.ReadWrite.All", "offline_access"]
};

final bc:Client bcClient = check new ({auth});
```

### Operations

#### Companies

<details>
<summary>listCompanies</summary>

<div>

Returns a list of companies.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | The number of entities to skip before returning the results. |
| `top` | <code>int</code> | No | The maximum number of entities to return. |
| `filter` | <code>string</code> | No | An OData filter expression that restricts the entities returned. |
| `'limit` | <code>int</code> | No | The maximum number of entities to return in the page. |
| `'select` | <code>("id"&#124;"systemVersion"&#124;"name"&#124;"displayName"&#124;"businessProfileId")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `CompanyCollection|error`

**Sample code:**

```ballerina
bc:CompanyCollection result = check bcClient->listCompanies();
```

**Sample response:**

```json
{
  "value": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "businessProfileId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "name": "Sample name"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getCompany</summary>

<div>

Returns a company.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `'select` | <code>("id"&#124;"systemVersion"&#124;"name"&#124;"displayName"&#124;"businessProfileId")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `Company|error`

**Sample code:**

```ballerina
bc:Company result = check bcClient->getCompany("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "projects": [
    {
      "number": "INV-0001",
      "displayName": "Sample name",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ],
  "trialBalance": [
    {
      "number": "INV-0001",
      "accountId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "totalCredit": "string"
    }
  ],
  "bankAccounts": [
    {
      "number": "INV-0001",
      "displayName": "Sample name",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ],
  "generalLedgerEntryAttachments": [
    {
      "fileName": "import.csv",
      "byteSize": 1,
      "createdDateTime": "2026-01-15T00:00:00"
    }
  ],
  "dimensionValues": [
    {
      "code": "200",
      "lastModifiedDateTime": "2026-01-15T00:00:00",
      "displayName": "Sample name"
    }
  ],
  "pdfDocument": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "content": {
        "fileContent": "string",
        "fileName": "import.csv"
      }
    }
  ]
}
```

</div>
</details>

#### Items

<details>
<summary>listItems</summary>

<div>

Returns a list of items.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | The number of entities to skip before returning the results. |
| `top` | <code>int</code> | No | The maximum number of entities to return. |
| `filter` | <code>string</code> | No | An OData filter expression that restricts the entities returned. |
| `'limit` | <code>int</code> | No | The maximum number of entities to return in the page. |
| `expand` | <code>("picture"&#124;"defaultDimensions"&#124;"itemCategory")[]</code> | No | The related entities to include in the response. |
| `'select` | <code>("id"&#124;"number"&#124;"displayName"&#124;"type"&#124;"itemCategoryId"&#124;"itemCategoryCode"&#124;"blocked"&#124;"baseUnitOfMeasureId"&#124;"baseUnitOfMeasure"&#124;"gtin"&#124;"inventory"&#124;"unitPrice"&#124;"priceIncludesTax"&#124;"unitCost"&#124;"taxGroupId"&#124;"taxGroupCode"&#124;"lastModifiedDateTime")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `ItemCollection|error`

**Sample code:**

```ballerina
bc:ItemCollection result = check bcClient->listItems("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "value": [
    {
      "unitPrice": 100.00,
      "gtin": "string",
      "lastModifiedDateTime": "2026-01-15T00:00:00"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createItem</summary>

<div>

Creates an item.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `payload` | <code>ItemRequest</code> | Yes | The item to create or update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Item|error`

**Sample code:**

```ballerina
bc:Item result = check bcClient->createItem("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    unitPrice: 100.00,
    gtin: "string",
    lastModifiedDateTime: "2026-01-15T00:00:00",
    displayName: "Sample name"
});
```

**Sample response:**

```json
{
  "unitPrice": 100.00,
  "gtin": "string",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "displayName": "Sample name",
  "itemCategory": {
    "code": "200",
    "lastModifiedDateTime": "2026-01-15T00:00:00",
    "displayName": "Sample name"
  },
  "itemCategoryId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>getItem</summary>

<div>

Returns an item.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `itemId` | <code>string</code> | Yes | The unique identifier of the item. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>("picture"&#124;"defaultDimensions"&#124;"itemCategory")[]</code> | No | The related entities to include in the response. |
| `'select` | <code>("id"&#124;"number"&#124;"displayName"&#124;"type"&#124;"itemCategoryId"&#124;"itemCategoryCode"&#124;"blocked"&#124;"baseUnitOfMeasureId"&#124;"baseUnitOfMeasure"&#124;"gtin"&#124;"inventory"&#124;"unitPrice"&#124;"priceIncludesTax"&#124;"unitCost"&#124;"taxGroupId"&#124;"taxGroupCode"&#124;"lastModifiedDateTime")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `Item|error`

**Sample code:**

```ballerina
bc:Item result = check bcClient->getItem("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "unitPrice": 100.00,
  "gtin": "string",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "displayName": "Sample name",
  "itemCategory": {
    "code": "200",
    "lastModifiedDateTime": "2026-01-15T00:00:00",
    "displayName": "Sample name"
  },
  "itemCategoryId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>deleteItem</summary>

<div>

Deletes an item.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `itemId` | <code>string</code> | Yes | The unique identifier of the item. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bcClient->deleteItem("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updateItem</summary>

<div>

Updates an item.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `itemId` | <code>string</code> | Yes | The unique identifier of the item. |
| `headers` | <code>UpdateItemHeaders</code> | Yes | Request headers, including the required `ifMatch`. |
| `payload` | <code>ItemRequest</code> | Yes | The item to create or update. |

**Returns:** `Item|error`

**Sample code:**

```ballerina
bc:Item result = check bcClient->updateItem("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {ifMatch: "string"}, {
    unitPrice: 100.00,
    gtin: "string",
    lastModifiedDateTime: "2026-01-15T00:00:00",
    displayName: "Sample name"
});
```

**Sample response:**

```json
{
  "unitPrice": 100.00,
  "gtin": "string",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "displayName": "Sample name",
  "itemCategory": {
    "code": "200",
    "lastModifiedDateTime": "2026-01-15T00:00:00",
    "displayName": "Sample name"
  },
  "itemCategoryId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>listPicturesForItem</summary>

<div>

Returns a list of pictures for an item.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `itemId` | <code>string</code> | Yes | The unique identifier of the item. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | The number of entities to skip before returning the results. |
| `top` | <code>int</code> | No | The maximum number of entities to return. |
| `filter` | <code>string</code> | No | An OData filter expression that restricts the entities returned. |
| `'limit` | <code>int</code> | No | The maximum number of entities to return in the page. |
| `'select` | <code>("id"&#124;"width"&#124;"height"&#124;"contentType"&#124;"content")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `PictureCollection|error`

**Sample code:**

```ballerina
bc:PictureCollection result = check bcClient->listPicturesForItem("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "value": [
    {
      "content@odata.mediaEditLink": "string",
      "content@odata.mediaReadLink": "string",
      "width": 1
    }
  ]
}
```

</div>
</details>

<details>
<summary>getPictureForItem</summary>

<div>

Returns a picture for an item.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `itemId` | <code>string</code> | Yes | The unique identifier of the item. |
| `pictureId` | <code>string</code> | Yes | The unique identifier of the picture. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `'select` | <code>("id"&#124;"width"&#124;"height"&#124;"contentType"&#124;"content")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `Picture|error`

**Sample code:**

```ballerina
bc:Picture result = check bcClient->getPictureForItem("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "content@odata.mediaEditLink": "string",
  "content@odata.mediaReadLink": "string",
  "width": 1,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "contentType": "string",
  "height": 1
}
```

</div>
</details>

<details>
<summary>deletePictureForItem</summary>

<div>

Deletes a picture for an item.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `itemId` | <code>string</code> | Yes | The unique identifier of the item. |
| `pictureId` | <code>string</code> | Yes | The unique identifier of the picture. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bcClient->deletePictureForItem("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updatePictureForItem</summary>

<div>

Updates a picture for an item.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `itemId` | <code>string</code> | Yes | The unique identifier of the item. |
| `pictureId` | <code>string</code> | Yes | The unique identifier of the picture. |
| `headers` | <code>UpdatePictureForItemHeaders</code> | Yes | Request headers, including the required `ifMatch`. |
| `payload` | <code>PictureRequest</code> | Yes | The picture to create or update. |

**Returns:** `Picture|error`

**Sample code:**

```ballerina
bc:Picture result = check bcClient->updatePictureForItem("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {ifMatch: "string"}, {
    width: 1,
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    contentType: "string",
    content: {
        fileContent: check io:fileReadBytes("import.csv"),
        fileName: "import.csv"
    }
});
```

**Sample response:**

```json
{
  "content@odata.mediaEditLink": "string",
  "content@odata.mediaReadLink": "string",
  "width": 1,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "contentType": "string",
  "height": 1
}
```

</div>
</details>

<details>
<summary>listDefaultDimensionsForItem</summary>

<div>

Returns a list of default dimensions for an item.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `itemId` | <code>string</code> | Yes | The unique identifier of the item. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | The number of entities to skip before returning the results. |
| `top` | <code>int</code> | No | The maximum number of entities to return. |
| `filter` | <code>string</code> | No | An OData filter expression that restricts the entities returned. |
| `'limit` | <code>int</code> | No | The maximum number of entities to return in the page. |
| `expand` | <code>("account"&#124;"dimension"&#124;"dimensionValue")[]</code> | No | The related entities to include in the response. |
| `'select` | <code>("parentId"&#124;"dimensionId"&#124;"dimensionCode"&#124;"dimensionValueId"&#124;"dimensionValueCode"&#124;"postingValidation")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `DefaultDimensionsCollection|error`

**Sample code:**

```ballerina
bc:DefaultDimensionsCollection result = check bcClient->listDefaultDimensionsForItem("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "value": [
    {
      "dimensionValueCode": "200",
      "dimensionId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "dimensionValueId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createDefaultDimensionsForItem</summary>

<div>

Creates a default dimension for an item.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `itemId` | <code>string</code> | Yes | The unique identifier of the item. |
| `payload` | <code>DefaultDimensionsRequest</code> | Yes | The default dimensions to create or update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `DefaultDimensions|error`

**Sample code:**

```ballerina
bc:DefaultDimensions result = check bcClient->createDefaultDimensionsForItem("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    dimensionValueCode: "200",
    dimensionId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    dimensionValueId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    dimensionCode: "200"
});
```

**Sample response:**

```json
{
  "dimensionValueCode": "200",
  "dimensionValue": {
    "code": "200",
    "lastModifiedDateTime": "2026-01-15T00:00:00",
    "displayName": "Sample name"
  },
  "dimensionId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "dimensionValueId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "dimensionCode": "200",
  "postingValidation": "string"
}
```

</div>
</details>

<details>
<summary>getDefaultDimensionsForItem</summary>

<div>

Returns a default dimension for an item.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `itemId` | <code>string</code> | Yes | The unique identifier of the item. |
| `defaultDimensionsParentId` | <code>string</code> | Yes | The parent id of the default dimensions. |
| `defaultDimensionsDimensionId` | <code>string</code> | Yes | The dimension id of the default dimensions. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>("account"&#124;"dimension"&#124;"dimensionValue")[]</code> | No | The related entities to include in the response. |
| `'select` | <code>("parentId"&#124;"dimensionId"&#124;"dimensionCode"&#124;"dimensionValueId"&#124;"dimensionValueCode"&#124;"postingValidation")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `DefaultDimensions|error`

**Sample code:**

```ballerina
bc:DefaultDimensions result = check bcClient->getDefaultDimensionsForItem("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "dimensionValueCode": "200",
  "dimensionValue": {
    "code": "200",
    "lastModifiedDateTime": "2026-01-15T00:00:00",
    "displayName": "Sample name"
  },
  "dimensionId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "dimensionValueId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "dimensionCode": "200",
  "postingValidation": "string"
}
```

</div>
</details>

<details>
<summary>deleteDefaultDimensionsForItem</summary>

<div>

Deletes a default dimension for an item.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `itemId` | <code>string</code> | Yes | The unique identifier of the item. |
| `defaultDimensionsParentId` | <code>string</code> | Yes | The parent id of the default dimensions. |
| `defaultDimensionsDimensionId` | <code>string</code> | Yes | The dimension id of the default dimensions. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bcClient->deleteDefaultDimensionsForItem("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updateDefaultDimensionsForItem</summary>

<div>

Updates a default dimension for an item.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `itemId` | <code>string</code> | Yes | The unique identifier of the item. |
| `defaultDimensionsParentId` | <code>string</code> | Yes | The parent id of the default dimensions. |
| `defaultDimensionsDimensionId` | <code>string</code> | Yes | The dimension id of the default dimensions. |
| `headers` | <code>UpdateDefaultDimensionsForItemHeaders</code> | Yes | Request headers, including the required `ifMatch`. |
| `payload` | <code>DefaultDimensionsRequest</code> | Yes | The default dimensions to create or update. |

**Returns:** `DefaultDimensions|error`

**Sample code:**

```ballerina
bc:DefaultDimensions result = check bcClient->updateDefaultDimensionsForItem("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {ifMatch: "string"}, {
    dimensionValueCode: "200",
    dimensionId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    dimensionValueId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    dimensionCode: "200"
});
```

**Sample response:**

```json
{
  "dimensionValueCode": "200",
  "dimensionValue": {
    "code": "200",
    "lastModifiedDateTime": "2026-01-15T00:00:00",
    "displayName": "Sample name"
  },
  "dimensionId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "dimensionValueId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "dimensionCode": "200",
  "postingValidation": "string"
}
```

</div>
</details>

#### Picture

<details>
<summary>listPictures</summary>

<div>

Returns a list of pictures.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | The number of entities to skip before returning the results. |
| `top` | <code>int</code> | No | The maximum number of entities to return. |
| `filter` | <code>string</code> | No | An OData filter expression that restricts the entities returned. |
| `'limit` | <code>int</code> | No | The maximum number of entities to return in the page. |
| `'select` | <code>("id"&#124;"width"&#124;"height"&#124;"contentType"&#124;"content")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `PictureCollection|error`

**Sample code:**

```ballerina
bc:PictureCollection result = check bcClient->listPictures("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "value": [
    {
      "content@odata.mediaEditLink": "string",
      "content@odata.mediaReadLink": "string",
      "width": 1
    }
  ]
}
```

</div>
</details>

<details>
<summary>getPicture</summary>

<div>

Returns a picture.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `pictureId` | <code>string</code> | Yes | The unique identifier of the picture. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `'select` | <code>("id"&#124;"width"&#124;"height"&#124;"contentType"&#124;"content")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `Picture|error`

**Sample code:**

```ballerina
bc:Picture result = check bcClient->getPicture("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "content@odata.mediaEditLink": "string",
  "content@odata.mediaReadLink": "string",
  "width": 1,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "contentType": "string",
  "height": 1
}
```

</div>
</details>

<details>
<summary>deletePicture</summary>

<div>

Deletes a picture.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `pictureId` | <code>string</code> | Yes | The unique identifier of the picture. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bcClient->deletePicture("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updatePicture</summary>

<div>

Updates a picture.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `pictureId` | <code>string</code> | Yes | The unique identifier of the picture. |
| `headers` | <code>UpdatePictureHeaders</code> | Yes | Request headers, including the required `ifMatch`. |
| `payload` | <code>PictureRequest</code> | Yes | The picture to create or update. |

**Returns:** `Picture|error`

**Sample code:**

```ballerina
bc:Picture result = check bcClient->updatePicture("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {ifMatch: "string"}, {
    width: 1,
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    contentType: "string",
    content: {
        fileContent: check io:fileReadBytes("import.csv"),
        fileName: "import.csv"
    }
});
```

**Sample response:**

```json
{
  "content@odata.mediaEditLink": "string",
  "content@odata.mediaReadLink": "string",
  "width": 1,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "contentType": "string",
  "height": 1
}
```

</div>
</details>

#### Default Dimensions

<details>
<summary>listDefaultDimensions</summary>

<div>

Returns a list of default dimensions.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | The number of entities to skip before returning the results. |
| `top` | <code>int</code> | No | The maximum number of entities to return. |
| `filter` | <code>string</code> | No | An OData filter expression that restricts the entities returned. |
| `'limit` | <code>int</code> | No | The maximum number of entities to return in the page. |
| `expand` | <code>("account"&#124;"dimension"&#124;"dimensionValue")[]</code> | No | The related entities to include in the response. |
| `'select` | <code>("parentId"&#124;"dimensionId"&#124;"dimensionCode"&#124;"dimensionValueId"&#124;"dimensionValueCode"&#124;"postingValidation")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `DefaultDimensionsCollection|error`

**Sample code:**

```ballerina
bc:DefaultDimensionsCollection result = check bcClient->listDefaultDimensions("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "value": [
    {
      "dimensionValueCode": "200",
      "dimensionId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "dimensionValueId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createDefaultDimensions</summary>

<div>

Creates a default dimension.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `payload` | <code>DefaultDimensionsRequest</code> | Yes | The default dimensions to create or update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `DefaultDimensions|error`

**Sample code:**

```ballerina
bc:DefaultDimensions result = check bcClient->createDefaultDimensions("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    dimensionValueCode: "200",
    dimensionId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    dimensionValueId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    dimensionCode: "200"
});
```

**Sample response:**

```json
{
  "dimensionValueCode": "200",
  "dimensionValue": {
    "code": "200",
    "lastModifiedDateTime": "2026-01-15T00:00:00",
    "displayName": "Sample name"
  },
  "dimensionId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "dimensionValueId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "dimensionCode": "200",
  "postingValidation": "string"
}
```

</div>
</details>

<details>
<summary>getDefaultDimensions</summary>

<div>

Returns a default dimension.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `defaultDimensionsParentId` | <code>string</code> | Yes | The parent id of the default dimensions. |
| `defaultDimensionsDimensionId` | <code>string</code> | Yes | The dimension id of the default dimensions. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>("account"&#124;"dimension"&#124;"dimensionValue")[]</code> | No | The related entities to include in the response. |
| `'select` | <code>("parentId"&#124;"dimensionId"&#124;"dimensionCode"&#124;"dimensionValueId"&#124;"dimensionValueCode"&#124;"postingValidation")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `DefaultDimensions|error`

**Sample code:**

```ballerina
bc:DefaultDimensions result = check bcClient->getDefaultDimensions("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "dimensionValueCode": "200",
  "dimensionValue": {
    "code": "200",
    "lastModifiedDateTime": "2026-01-15T00:00:00",
    "displayName": "Sample name"
  },
  "dimensionId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "dimensionValueId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "dimensionCode": "200",
  "postingValidation": "string"
}
```

</div>
</details>

<details>
<summary>deleteDefaultDimensions</summary>

<div>

Deletes a default dimension.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `defaultDimensionsParentId` | <code>string</code> | Yes | The parent id of the default dimensions. |
| `defaultDimensionsDimensionId` | <code>string</code> | Yes | The dimension id of the default dimensions. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bcClient->deleteDefaultDimensions("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updateDefaultDimensions</summary>

<div>

Updates a default dimension.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `defaultDimensionsParentId` | <code>string</code> | Yes | The parent id of the default dimensions. |
| `defaultDimensionsDimensionId` | <code>string</code> | Yes | The dimension id of the default dimensions. |
| `headers` | <code>UpdateDefaultDimensionsHeaders</code> | Yes | Request headers, including the required `ifMatch`. |
| `payload` | <code>DefaultDimensionsRequest</code> | Yes | The default dimensions to create or update. |

**Returns:** `DefaultDimensions|error`

**Sample code:**

```ballerina
bc:DefaultDimensions result = check bcClient->updateDefaultDimensions("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {ifMatch: "string"}, {
    dimensionValueCode: "200",
    dimensionId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    dimensionValueId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    dimensionCode: "200"
});
```

**Sample response:**

```json
{
  "dimensionValueCode": "200",
  "dimensionValue": {
    "code": "200",
    "lastModifiedDateTime": "2026-01-15T00:00:00",
    "displayName": "Sample name"
  },
  "dimensionId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "dimensionValueId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "dimensionCode": "200",
  "postingValidation": "string"
}
```

</div>
</details>

#### Customers

<details>
<summary>listCustomers</summary>

<div>

Returns a list of customers.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | The number of entities to skip before returning the results. |
| `top` | <code>int</code> | No | The maximum number of entities to return. |
| `filter` | <code>string</code> | No | An OData filter expression that restricts the entities returned. |
| `'limit` | <code>int</code> | No | The maximum number of entities to return in the page. |
| `expand` | <code>("customerFinancialDetails"&#124;"picture"&#124;"defaultDimensions"&#124;"currency"&#124;"paymentTerm"&#124;"shipmentMethod"&#124;"paymentMethod")[]</code> | No | The related entities to include in the response. |
| `'select` | <code>("id"&#124;"number"&#124;"displayName"&#124;"type"&#124;"address"&#124;"phoneNumber"&#124;"email"&#124;"website"&#124;"taxLiable"&#124;"taxAreaId"&#124;"taxAreaDisplayName"&#124;"taxRegistrationNumber"&#124;"currencyId"&#124;"currencyCode"&#124;"paymentTermsId"&#124;"shipmentMethodId"&#124;"paymentMethodId"&#124;"blocked"&#124;"lastModifiedDateTime")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `CustomerCollection|error`

**Sample code:**

```ballerina
bc:CustomerCollection result = check bcClient->listCustomers("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "value": [
    {
      "lastModifiedDateTime": "2026-01-15T00:00:00",
      "shipmentMethodId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "displayName": "Sample name"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createCustomer</summary>

<div>

Creates a customer.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `payload` | <code>CustomerRequest</code> | Yes | The customer to create or update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Customer|error`

**Sample code:**

```ballerina
bc:Customer result = check bcClient->createCustomer("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    website: "string",
    address: {
        city: "string",
        street: "string",
        countryLetterCode: "200"
    },
    lastModifiedDateTime: "2026-01-15T00:00:00",
    shipmentMethodId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "shipmentMethodId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "displayName": "Sample name",
  "taxLiable": false,
  "type": "string",
  "shipmentMethod": {
    "code": "200",
    "lastModifiedDateTime": "2026-01-15T00:00:00",
    "displayName": "Sample name"
  }
}
```

</div>
</details>

<details>
<summary>getCustomer</summary>

<div>

Returns a customer.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `customerId` | <code>string</code> | Yes | The unique identifier of the customer. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>("customerFinancialDetails"&#124;"picture"&#124;"defaultDimensions"&#124;"currency"&#124;"paymentTerm"&#124;"shipmentMethod"&#124;"paymentMethod")[]</code> | No | The related entities to include in the response. |
| `'select` | <code>("id"&#124;"number"&#124;"displayName"&#124;"type"&#124;"address"&#124;"phoneNumber"&#124;"email"&#124;"website"&#124;"taxLiable"&#124;"taxAreaId"&#124;"taxAreaDisplayName"&#124;"taxRegistrationNumber"&#124;"currencyId"&#124;"currencyCode"&#124;"paymentTermsId"&#124;"shipmentMethodId"&#124;"paymentMethodId"&#124;"blocked"&#124;"lastModifiedDateTime")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `Customer|error`

**Sample code:**

```ballerina
bc:Customer result = check bcClient->getCustomer("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "shipmentMethodId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "displayName": "Sample name",
  "taxLiable": false,
  "type": "string",
  "shipmentMethod": {
    "code": "200",
    "lastModifiedDateTime": "2026-01-15T00:00:00",
    "displayName": "Sample name"
  }
}
```

</div>
</details>

<details>
<summary>deleteCustomer</summary>

<div>

Deletes a customer.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `customerId` | <code>string</code> | Yes | The unique identifier of the customer. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bcClient->deleteCustomer("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updateCustomer</summary>

<div>

Updates a customer.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `customerId` | <code>string</code> | Yes | The unique identifier of the customer. |
| `headers` | <code>UpdateCustomerHeaders</code> | Yes | Request headers, including the required `ifMatch`. |
| `payload` | <code>CustomerRequest</code> | Yes | The customer to create or update. |

**Returns:** `Customer|error`

**Sample code:**

```ballerina
bc:Customer result = check bcClient->updateCustomer("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {ifMatch: "string"}, {
    website: "string",
    address: {
        city: "string",
        street: "string",
        countryLetterCode: "200"
    },
    lastModifiedDateTime: "2026-01-15T00:00:00",
    shipmentMethodId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "shipmentMethodId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "displayName": "Sample name",
  "taxLiable": false,
  "type": "string",
  "shipmentMethod": {
    "code": "200",
    "lastModifiedDateTime": "2026-01-15T00:00:00",
    "displayName": "Sample name"
  }
}
```

</div>
</details>

<details>
<summary>listCustomerFinancialDetailsForCustomer</summary>

<div>

Returns a list of customer financial details for a customer.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `customerId` | <code>string</code> | Yes | The unique identifier of the customer. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | The number of entities to skip before returning the results. |
| `top` | <code>int</code> | No | The maximum number of entities to return. |
| `filter` | <code>string</code> | No | An OData filter expression that restricts the entities returned. |
| `'limit` | <code>int</code> | No | The maximum number of entities to return in the page. |
| `'select` | <code>("id"&#124;"number"&#124;"balance"&#124;"totalSalesExcludingTax"&#124;"overdueAmount")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `CustomerFinancialDetailCollection|error`

**Sample code:**

```ballerina
bc:CustomerFinancialDetailCollection result = check bcClient->listCustomerFinancialDetailsForCustomer("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "value": [
    {
      "number": "INV-0001",
      "totalSalesExcludingTax": 100.00,
      "overdueAmount": 100.00
    }
  ]
}
```

</div>
</details>

<details>
<summary>getCustomerFinancialDetailForCustomer</summary>

<div>

Returns a customer financial detail for a customer.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `customerId` | <code>string</code> | Yes | The unique identifier of the customer. |
| `customerFinancialDetailId` | <code>string</code> | Yes | The unique identifier of the customer financial detail. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `'select` | <code>("id"&#124;"number"&#124;"balance"&#124;"totalSalesExcludingTax"&#124;"overdueAmount")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `CustomerFinancialDetail|error`

**Sample code:**

```ballerina
bc:CustomerFinancialDetail result = check bcClient->getCustomerFinancialDetailForCustomer("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "number": "INV-0001",
  "totalSalesExcludingTax": 100.00,
  "overdueAmount": 100.00,
  "balance": 100.00,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>listPicturesForCustomer</summary>

<div>

Returns a list of pictures for a customer.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `customerId` | <code>string</code> | Yes | The unique identifier of the customer. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | The number of entities to skip before returning the results. |
| `top` | <code>int</code> | No | The maximum number of entities to return. |
| `filter` | <code>string</code> | No | An OData filter expression that restricts the entities returned. |
| `'limit` | <code>int</code> | No | The maximum number of entities to return in the page. |
| `'select` | <code>("id"&#124;"width"&#124;"height"&#124;"contentType"&#124;"content")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `PictureCollection|error`

**Sample code:**

```ballerina
bc:PictureCollection result = check bcClient->listPicturesForCustomer("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "value": [
    {
      "content@odata.mediaEditLink": "string",
      "content@odata.mediaReadLink": "string",
      "width": 1
    }
  ]
}
```

</div>
</details>

<details>
<summary>getPictureForCustomer</summary>

<div>

Returns a picture for a customer.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `customerId` | <code>string</code> | Yes | The unique identifier of the customer. |
| `pictureId` | <code>string</code> | Yes | The unique identifier of the picture. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `'select` | <code>("id"&#124;"width"&#124;"height"&#124;"contentType"&#124;"content")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `Picture|error`

**Sample code:**

```ballerina
bc:Picture result = check bcClient->getPictureForCustomer("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "content@odata.mediaEditLink": "string",
  "content@odata.mediaReadLink": "string",
  "width": 1,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "contentType": "string",
  "height": 1
}
```

</div>
</details>

<details>
<summary>deletePictureForCustomer</summary>

<div>

Deletes a picture for a customer.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `customerId` | <code>string</code> | Yes | The unique identifier of the customer. |
| `pictureId` | <code>string</code> | Yes | The unique identifier of the picture. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bcClient->deletePictureForCustomer("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updatePictureForCustomer</summary>

<div>

Updates a picture for a customer.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `customerId` | <code>string</code> | Yes | The unique identifier of the customer. |
| `pictureId` | <code>string</code> | Yes | The unique identifier of the picture. |
| `headers` | <code>UpdatePictureForCustomerHeaders</code> | Yes | Request headers, including the required `ifMatch`. |
| `payload` | <code>PictureRequest</code> | Yes | The picture to create or update. |

**Returns:** `Picture|error`

**Sample code:**

```ballerina
bc:Picture result = check bcClient->updatePictureForCustomer("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {ifMatch: "string"}, {
    width: 1,
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    contentType: "string",
    content: {
        fileContent: check io:fileReadBytes("import.csv"),
        fileName: "import.csv"
    }
});
```

**Sample response:**

```json
{
  "content@odata.mediaEditLink": "string",
  "content@odata.mediaReadLink": "string",
  "width": 1,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "contentType": "string",
  "height": 1
}
```

</div>
</details>

<details>
<summary>listDefaultDimensionsForCustomer</summary>

<div>

Returns a list of default dimensions for a customer.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `customerId` | <code>string</code> | Yes | The unique identifier of the customer. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | The number of entities to skip before returning the results. |
| `top` | <code>int</code> | No | The maximum number of entities to return. |
| `filter` | <code>string</code> | No | An OData filter expression that restricts the entities returned. |
| `'limit` | <code>int</code> | No | The maximum number of entities to return in the page. |
| `expand` | <code>("account"&#124;"dimension"&#124;"dimensionValue")[]</code> | No | The related entities to include in the response. |
| `'select` | <code>("parentId"&#124;"dimensionId"&#124;"dimensionCode"&#124;"dimensionValueId"&#124;"dimensionValueCode"&#124;"postingValidation")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `DefaultDimensionsCollection|error`

**Sample code:**

```ballerina
bc:DefaultDimensionsCollection result = check bcClient->listDefaultDimensionsForCustomer("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "value": [
    {
      "dimensionValueCode": "200",
      "dimensionId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "dimensionValueId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createDefaultDimensionsForCustomer</summary>

<div>

Creates a default dimension for a customer.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `customerId` | <code>string</code> | Yes | The unique identifier of the customer. |
| `payload` | <code>DefaultDimensionsRequest</code> | Yes | The default dimensions to create or update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `DefaultDimensions|error`

**Sample code:**

```ballerina
bc:DefaultDimensions result = check bcClient->createDefaultDimensionsForCustomer("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    dimensionValueCode: "200",
    dimensionId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    dimensionValueId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    dimensionCode: "200"
});
```

**Sample response:**

```json
{
  "dimensionValueCode": "200",
  "dimensionValue": {
    "code": "200",
    "lastModifiedDateTime": "2026-01-15T00:00:00",
    "displayName": "Sample name"
  },
  "dimensionId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "dimensionValueId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "dimensionCode": "200",
  "postingValidation": "string"
}
```

</div>
</details>

<details>
<summary>getDefaultDimensionsForCustomer</summary>

<div>

Returns a default dimension for a customer.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `customerId` | <code>string</code> | Yes | The unique identifier of the customer. |
| `defaultDimensionsParentId` | <code>string</code> | Yes | The parent id of the default dimensions. |
| `defaultDimensionsDimensionId` | <code>string</code> | Yes | The dimension id of the default dimensions. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>("account"&#124;"dimension"&#124;"dimensionValue")[]</code> | No | The related entities to include in the response. |
| `'select` | <code>("parentId"&#124;"dimensionId"&#124;"dimensionCode"&#124;"dimensionValueId"&#124;"dimensionValueCode"&#124;"postingValidation")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `DefaultDimensions|error`

**Sample code:**

```ballerina
bc:DefaultDimensions result = check bcClient->getDefaultDimensionsForCustomer("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "dimensionValueCode": "200",
  "dimensionValue": {
    "code": "200",
    "lastModifiedDateTime": "2026-01-15T00:00:00",
    "displayName": "Sample name"
  },
  "dimensionId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "dimensionValueId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "dimensionCode": "200",
  "postingValidation": "string"
}
```

</div>
</details>

<details>
<summary>deleteDefaultDimensionsForCustomer</summary>

<div>

Deletes a default dimension for a customer.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `customerId` | <code>string</code> | Yes | The unique identifier of the customer. |
| `defaultDimensionsParentId` | <code>string</code> | Yes | The parent id of the default dimensions. |
| `defaultDimensionsDimensionId` | <code>string</code> | Yes | The dimension id of the default dimensions. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bcClient->deleteDefaultDimensionsForCustomer("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updateDefaultDimensionsForCustomer</summary>

<div>

Updates a default dimension for a customer.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `customerId` | <code>string</code> | Yes | The unique identifier of the customer. |
| `defaultDimensionsParentId` | <code>string</code> | Yes | The parent id of the default dimensions. |
| `defaultDimensionsDimensionId` | <code>string</code> | Yes | The dimension id of the default dimensions. |
| `headers` | <code>UpdateDefaultDimensionsForCustomerHeaders</code> | Yes | Request headers, including the required `ifMatch`. |
| `payload` | <code>DefaultDimensionsRequest</code> | Yes | The default dimensions to create or update. |

**Returns:** `DefaultDimensions|error`

**Sample code:**

```ballerina
bc:DefaultDimensions result = check bcClient->updateDefaultDimensionsForCustomer("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {ifMatch: "string"}, {
    dimensionValueCode: "200",
    dimensionId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    dimensionValueId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    dimensionCode: "200"
});
```

**Sample response:**

```json
{
  "dimensionValueCode": "200",
  "dimensionValue": {
    "code": "200",
    "lastModifiedDateTime": "2026-01-15T00:00:00",
    "displayName": "Sample name"
  },
  "dimensionId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "dimensionValueId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "dimensionCode": "200",
  "postingValidation": "string"
}
```

</div>
</details>

#### Customer Financial Details

<details>
<summary>listCustomerFinancialDetails</summary>

<div>

Returns a list of customer financial details.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | The number of entities to skip before returning the results. |
| `top` | <code>int</code> | No | The maximum number of entities to return. |
| `filter` | <code>string</code> | No | An OData filter expression that restricts the entities returned. |
| `'limit` | <code>int</code> | No | The maximum number of entities to return in the page. |
| `'select` | <code>("id"&#124;"number"&#124;"balance"&#124;"totalSalesExcludingTax"&#124;"overdueAmount")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `CustomerFinancialDetailCollection|error`

**Sample code:**

```ballerina
bc:CustomerFinancialDetailCollection result = check bcClient->listCustomerFinancialDetails("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "value": [
    {
      "number": "INV-0001",
      "totalSalesExcludingTax": 100.00,
      "overdueAmount": 100.00
    }
  ]
}
```

</div>
</details>

<details>
<summary>getCustomerFinancialDetail</summary>

<div>

Returns a customer financial detail.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `customerFinancialDetailId` | <code>string</code> | Yes | The unique identifier of the customer financial detail. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `'select` | <code>("id"&#124;"number"&#124;"balance"&#124;"totalSalesExcludingTax"&#124;"overdueAmount")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `CustomerFinancialDetail|error`

**Sample code:**

```ballerina
bc:CustomerFinancialDetail result = check bcClient->getCustomerFinancialDetail("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "number": "INV-0001",
  "totalSalesExcludingTax": 100.00,
  "overdueAmount": 100.00,
  "balance": 100.00,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

#### Vendors

<details>
<summary>listVendors</summary>

<div>

Returns a list of vendors.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | The number of entities to skip before returning the results. |
| `top` | <code>int</code> | No | The maximum number of entities to return. |
| `filter` | <code>string</code> | No | An OData filter expression that restricts the entities returned. |
| `'limit` | <code>int</code> | No | The maximum number of entities to return in the page. |
| `expand` | <code>("picture"&#124;"defaultDimensions"&#124;"currency"&#124;"paymentTerm"&#124;"paymentMethod")[]</code> | No | The related entities to include in the response. |
| `'select` | <code>("id"&#124;"number"&#124;"displayName"&#124;"address"&#124;"phoneNumber"&#124;"email"&#124;"website"&#124;"taxRegistrationNumber"&#124;"currencyId"&#124;"currencyCode"&#124;"irs1099Code"&#124;"paymentTermsId"&#124;"paymentMethodId"&#124;"taxLiable"&#124;"blocked"&#124;"balance"&#124;"lastModifiedDateTime")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `VendorCollection|error`

**Sample code:**

```ballerina
bc:VendorCollection result = check bcClient->listVendors("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "value": [
    {
      "website": "string",
      "lastModifiedDateTime": "2026-01-15T00:00:00",
      "displayName": "Sample name"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createVendor</summary>

<div>

Creates a vendor.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `payload` | <code>VendorRequest</code> | Yes | The vendor to create or update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Vendor|error`

**Sample code:**

```ballerina
bc:Vendor result = check bcClient->createVendor("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    website: "string",
    address: {
        city: "string",
        street: "string",
        countryLetterCode: "200"
    },
    lastModifiedDateTime: "2026-01-15T00:00:00",
    displayName: "Sample name"
});
```

**Sample response:**

```json
{
  "website": "string",
  "address": {
    "city": "string",
    "street": "string",
    "countryLetterCode": "200"
  },
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "displayName": "Sample name",
  "taxLiable": false,
  "picture": [
    {
      "content@odata.mediaEditLink": "string",
      "content@odata.mediaReadLink": "string",
      "width": 1
    }
  ]
}
```

</div>
</details>

<details>
<summary>getVendor</summary>

<div>

Returns a vendor.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `vendorId` | <code>string</code> | Yes | The unique identifier of the vendor. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>("picture"&#124;"defaultDimensions"&#124;"currency"&#124;"paymentTerm"&#124;"paymentMethod")[]</code> | No | The related entities to include in the response. |
| `'select` | <code>("id"&#124;"number"&#124;"displayName"&#124;"address"&#124;"phoneNumber"&#124;"email"&#124;"website"&#124;"taxRegistrationNumber"&#124;"currencyId"&#124;"currencyCode"&#124;"irs1099Code"&#124;"paymentTermsId"&#124;"paymentMethodId"&#124;"taxLiable"&#124;"blocked"&#124;"balance"&#124;"lastModifiedDateTime")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `Vendor|error`

**Sample code:**

```ballerina
bc:Vendor result = check bcClient->getVendor("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "website": "string",
  "address": {
    "city": "string",
    "street": "string",
    "countryLetterCode": "200"
  },
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "displayName": "Sample name",
  "taxLiable": false,
  "picture": [
    {
      "content@odata.mediaEditLink": "string",
      "content@odata.mediaReadLink": "string",
      "width": 1
    }
  ]
}
```

</div>
</details>

<details>
<summary>deleteVendor</summary>

<div>

Deletes a vendor.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `vendorId` | <code>string</code> | Yes | The unique identifier of the vendor. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bcClient->deleteVendor("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updateVendor</summary>

<div>

Updates a vendor.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `vendorId` | <code>string</code> | Yes | The unique identifier of the vendor. |
| `headers` | <code>UpdateVendorHeaders</code> | Yes | Request headers, including the required `ifMatch`. |
| `payload` | <code>VendorRequest</code> | Yes | The vendor to create or update. |

**Returns:** `Vendor|error`

**Sample code:**

```ballerina
bc:Vendor result = check bcClient->updateVendor("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {ifMatch: "string"}, {
    website: "string",
    address: {
        city: "string",
        street: "string",
        countryLetterCode: "200"
    },
    lastModifiedDateTime: "2026-01-15T00:00:00",
    displayName: "Sample name"
});
```

**Sample response:**

```json
{
  "website": "string",
  "address": {
    "city": "string",
    "street": "string",
    "countryLetterCode": "200"
  },
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "displayName": "Sample name",
  "taxLiable": false,
  "picture": [
    {
      "content@odata.mediaEditLink": "string",
      "content@odata.mediaReadLink": "string",
      "width": 1
    }
  ]
}
```

</div>
</details>

<details>
<summary>listPicturesForVendor</summary>

<div>

Returns a list of pictures for a vendor.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `vendorId` | <code>string</code> | Yes | The unique identifier of the vendor. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | The number of entities to skip before returning the results. |
| `top` | <code>int</code> | No | The maximum number of entities to return. |
| `filter` | <code>string</code> | No | An OData filter expression that restricts the entities returned. |
| `'limit` | <code>int</code> | No | The maximum number of entities to return in the page. |
| `'select` | <code>("id"&#124;"width"&#124;"height"&#124;"contentType"&#124;"content")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `PictureCollection|error`

**Sample code:**

```ballerina
bc:PictureCollection result = check bcClient->listPicturesForVendor("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "value": [
    {
      "content@odata.mediaEditLink": "string",
      "content@odata.mediaReadLink": "string",
      "width": 1
    }
  ]
}
```

</div>
</details>

<details>
<summary>getPictureForVendor</summary>

<div>

Returns a picture for a vendor.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `vendorId` | <code>string</code> | Yes | The unique identifier of the vendor. |
| `pictureId` | <code>string</code> | Yes | The unique identifier of the picture. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `'select` | <code>("id"&#124;"width"&#124;"height"&#124;"contentType"&#124;"content")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `Picture|error`

**Sample code:**

```ballerina
bc:Picture result = check bcClient->getPictureForVendor("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "content@odata.mediaEditLink": "string",
  "content@odata.mediaReadLink": "string",
  "width": 1,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "contentType": "string",
  "height": 1
}
```

</div>
</details>

<details>
<summary>deletePictureForVendor</summary>

<div>

Deletes a picture for a vendor.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `vendorId` | <code>string</code> | Yes | The unique identifier of the vendor. |
| `pictureId` | <code>string</code> | Yes | The unique identifier of the picture. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bcClient->deletePictureForVendor("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updatePictureForVendor</summary>

<div>

Updates a picture for a vendor.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `vendorId` | <code>string</code> | Yes | The unique identifier of the vendor. |
| `pictureId` | <code>string</code> | Yes | The unique identifier of the picture. |
| `headers` | <code>UpdatePictureForVendorHeaders</code> | Yes | Request headers, including the required `ifMatch`. |
| `payload` | <code>PictureRequest</code> | Yes | The picture to create or update. |

**Returns:** `Picture|error`

**Sample code:**

```ballerina
bc:Picture result = check bcClient->updatePictureForVendor("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {ifMatch: "string"}, {
    width: 1,
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    contentType: "string",
    content: {
        fileContent: check io:fileReadBytes("import.csv"),
        fileName: "import.csv"
    }
});
```

**Sample response:**

```json
{
  "content@odata.mediaEditLink": "string",
  "content@odata.mediaReadLink": "string",
  "width": 1,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "contentType": "string",
  "height": 1
}
```

</div>
</details>

<details>
<summary>listDefaultDimensionsForVendor</summary>

<div>

Returns a list of default dimensions for a vendor.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `vendorId` | <code>string</code> | Yes | The unique identifier of the vendor. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | The number of entities to skip before returning the results. |
| `top` | <code>int</code> | No | The maximum number of entities to return. |
| `filter` | <code>string</code> | No | An OData filter expression that restricts the entities returned. |
| `'limit` | <code>int</code> | No | The maximum number of entities to return in the page. |
| `expand` | <code>("account"&#124;"dimension"&#124;"dimensionValue")[]</code> | No | The related entities to include in the response. |
| `'select` | <code>("parentId"&#124;"dimensionId"&#124;"dimensionCode"&#124;"dimensionValueId"&#124;"dimensionValueCode"&#124;"postingValidation")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `DefaultDimensionsCollection|error`

**Sample code:**

```ballerina
bc:DefaultDimensionsCollection result = check bcClient->listDefaultDimensionsForVendor("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "value": [
    {
      "dimensionValueCode": "200",
      "dimensionId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "dimensionValueId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createDefaultDimensionsForVendor</summary>

<div>

Creates a default dimension for a vendor.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `vendorId` | <code>string</code> | Yes | The unique identifier of the vendor. |
| `payload` | <code>DefaultDimensionsRequest</code> | Yes | The default dimensions to create or update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `DefaultDimensions|error`

**Sample code:**

```ballerina
bc:DefaultDimensions result = check bcClient->createDefaultDimensionsForVendor("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    dimensionValueCode: "200",
    dimensionId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    dimensionValueId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    dimensionCode: "200"
});
```

**Sample response:**

```json
{
  "dimensionValueCode": "200",
  "dimensionValue": {
    "code": "200",
    "lastModifiedDateTime": "2026-01-15T00:00:00",
    "displayName": "Sample name"
  },
  "dimensionId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "dimensionValueId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "dimensionCode": "200",
  "postingValidation": "string"
}
```

</div>
</details>

<details>
<summary>getDefaultDimensionsForVendor</summary>

<div>

Returns a default dimension for a vendor.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `vendorId` | <code>string</code> | Yes | The unique identifier of the vendor. |
| `defaultDimensionsParentId` | <code>string</code> | Yes | The parent id of the default dimensions. |
| `defaultDimensionsDimensionId` | <code>string</code> | Yes | The dimension id of the default dimensions. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>("account"&#124;"dimension"&#124;"dimensionValue")[]</code> | No | The related entities to include in the response. |
| `'select` | <code>("parentId"&#124;"dimensionId"&#124;"dimensionCode"&#124;"dimensionValueId"&#124;"dimensionValueCode"&#124;"postingValidation")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `DefaultDimensions|error`

**Sample code:**

```ballerina
bc:DefaultDimensions result = check bcClient->getDefaultDimensionsForVendor("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "dimensionValueCode": "200",
  "dimensionValue": {
    "code": "200",
    "lastModifiedDateTime": "2026-01-15T00:00:00",
    "displayName": "Sample name"
  },
  "dimensionId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "dimensionValueId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "dimensionCode": "200",
  "postingValidation": "string"
}
```

</div>
</details>

<details>
<summary>deleteDefaultDimensionsForVendor</summary>

<div>

Deletes a default dimension for a vendor.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `vendorId` | <code>string</code> | Yes | The unique identifier of the vendor. |
| `defaultDimensionsParentId` | <code>string</code> | Yes | The parent id of the default dimensions. |
| `defaultDimensionsDimensionId` | <code>string</code> | Yes | The dimension id of the default dimensions. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bcClient->deleteDefaultDimensionsForVendor("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updateDefaultDimensionsForVendor</summary>

<div>

Updates a default dimension for a vendor.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `vendorId` | <code>string</code> | Yes | The unique identifier of the vendor. |
| `defaultDimensionsParentId` | <code>string</code> | Yes | The parent id of the default dimensions. |
| `defaultDimensionsDimensionId` | <code>string</code> | Yes | The dimension id of the default dimensions. |
| `headers` | <code>UpdateDefaultDimensionsForVendorHeaders</code> | Yes | Request headers, including the required `ifMatch`. |
| `payload` | <code>DefaultDimensionsRequest</code> | Yes | The default dimensions to create or update. |

**Returns:** `DefaultDimensions|error`

**Sample code:**

```ballerina
bc:DefaultDimensions result = check bcClient->updateDefaultDimensionsForVendor("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {ifMatch: "string"}, {
    dimensionValueCode: "200",
    dimensionId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    dimensionValueId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    dimensionCode: "200"
});
```

**Sample response:**

```json
{
  "dimensionValueCode": "200",
  "dimensionValue": {
    "code": "200",
    "lastModifiedDateTime": "2026-01-15T00:00:00",
    "displayName": "Sample name"
  },
  "dimensionId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "dimensionValueId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "dimensionCode": "200",
  "postingValidation": "string"
}
```

</div>
</details>

#### Company Information

<details>
<summary>listCompanyInformation</summary>

<div>

Returns a list of company information records.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | The number of entities to skip before returning the results. |
| `top` | <code>int</code> | No | The maximum number of entities to return. |
| `filter` | <code>string</code> | No | An OData filter expression that restricts the entities returned. |
| `'limit` | <code>int</code> | No | The maximum number of entities to return in the page. |
| `'select` | <code>("id"&#124;"displayName"&#124;"address"&#124;"phoneNumber"&#124;"faxNumber"&#124;"email"&#124;"website"&#124;"taxRegistrationNumber"&#124;"currencyCode"&#124;"currentFiscalYearStartDate"&#124;"industry"&#124;"picture"&#124;"lastModifiedDateTime")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `CompanyInformationCollection|error`

**Sample code:**

```ballerina
bc:CompanyInformationCollection result = check bcClient->listCompanyInformation("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "value": [
    {
      "website": "string",
      "lastModifiedDateTime": "2026-01-15T00:00:00",
      "displayName": "Sample name"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getCompanyInformation</summary>

<div>

Returns a company information record.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `companyInformationId` | <code>string</code> | Yes | The unique identifier of the company information. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `'select` | <code>("id"&#124;"displayName"&#124;"address"&#124;"phoneNumber"&#124;"faxNumber"&#124;"email"&#124;"website"&#124;"taxRegistrationNumber"&#124;"currencyCode"&#124;"currentFiscalYearStartDate"&#124;"industry"&#124;"picture"&#124;"lastModifiedDateTime")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `CompanyInformation|error`

**Sample code:**

```ballerina
bc:CompanyInformation result = check bcClient->getCompanyInformation("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "website": "string",
  "address": {
    "city": "string",
    "street": "string",
    "countryLetterCode": "200"
  },
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "displayName": "Sample name",
  "industry": "string",
  "picture": {
    "fileContent": "string",
    "fileName": "import.csv"
  }
}
```

</div>
</details>

<details>
<summary>updateCompanyInformation</summary>

<div>

Updates a company information record.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `companyInformationId` | <code>string</code> | Yes | The unique identifier of the company information. |
| `headers` | <code>UpdateCompanyInformationHeaders</code> | Yes | Request headers, including the required `ifMatch`. |
| `payload` | <code>CompanyInformationRequest</code> | Yes | The company information to create or update. |

**Returns:** `CompanyInformation|error`

**Sample code:**

```ballerina
bc:CompanyInformation result = check bcClient->updateCompanyInformation("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {ifMatch: "string"}, {
    website: "string",
    address: {
        city: "string",
        street: "string",
        countryLetterCode: "200"
    },
    lastModifiedDateTime: "2026-01-15T00:00:00",
    displayName: "Sample name"
});
```

**Sample response:**

```json
{
  "website": "string",
  "address": {
    "city": "string",
    "street": "string",
    "countryLetterCode": "200"
  },
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "displayName": "Sample name",
  "industry": "string",
  "picture": {
    "fileContent": "string",
    "fileName": "import.csv"
  }
}
```

</div>
</details>

#### Sales Invoices

<details>
<summary>listSalesInvoices</summary>

<div>

Returns a list of sales invoices.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | The number of entities to skip before returning the results. |
| `top` | <code>int</code> | No | The maximum number of entities to return. |
| `filter` | <code>string</code> | No | An OData filter expression that restricts the entities returned. |
| `'limit` | <code>int</code> | No | The maximum number of entities to return in the page. |
| `expand` | <code>("salesInvoiceLines"&#124;"pdfDocument"&#124;"customer"&#124;"currency"&#124;"paymentTerm"&#124;"shipmentMethod")[]</code> | No | The related entities to include in the response. |
| `'select` | <code>("id"&#124;"number"&#124;"externalDocumentNumber"&#124;"invoiceDate"&#124;"dueDate"&#124;"customerPurchaseOrderReference"&#124;"customerId"&#124;"contactId"&#124;"customerNumber"&#124;"customerName"&#124;"billToName"&#124;"billToCustomerId"&#124;"billToCustomerNumber"&#124;"shipToName"&#124;"shipToContact"&#124;"sellingPostalAddress"&#124;"billingPostalAddress"&#124;"shippingPostalAddress"&#124;"currencyId"&#124;"currencyCode"&#124;"orderId"&#124;"orderNumber"&#124;"paymentTermsId"&#124;"shipmentMethodId"&#124;"salesperson"&#124;"pricesIncludeTax"&#124;"remainingAmount"&#124;"discountAmount"&#124;"discountAppliedBeforeTax"&#124;"totalAmountExcludingTax"&#124;"totalTaxAmount"&#124;"totalAmountIncludingTax"&#124;"status"&#124;"lastModifiedDateTime"&#124;"phoneNumber"&#124;"email")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `SalesInvoiceCollection|error`

**Sample code:**

```ballerina
bc:SalesInvoiceCollection result = check bcClient->listSalesInvoices("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "value": [
    {
      "orderNumber": "INV-0001",
      "lastModifiedDateTime": "2026-01-15T00:00:00",
      "shipmentMethodId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createSalesInvoice</summary>

<div>

Creates a sales invoice.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `payload` | <code>SalesInvoiceRequest</code> | Yes | The sales invoice to create or update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `SalesInvoice|error`

**Sample code:**

```ballerina
bc:SalesInvoice result = check bcClient->createSalesInvoice("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    orderNumber: "INV-0001",
    lastModifiedDateTime: "2026-01-15T00:00:00",
    shipmentMethodId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    discountAppliedBeforeTax: false
});
```

**Sample response:**

```json
{
  "orderNumber": "INV-0001",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "shipmentMethodId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "discountAppliedBeforeTax": false,
  "orderId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "dueDate": "2026-01-15T00:00:00"
}
```

</div>
</details>

<details>
<summary>getSalesInvoice</summary>

<div>

Returns a sales invoice.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `salesInvoiceId` | <code>string</code> | Yes | The unique identifier of the sales invoice. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>("salesInvoiceLines"&#124;"pdfDocument"&#124;"customer"&#124;"currency"&#124;"paymentTerm"&#124;"shipmentMethod")[]</code> | No | The related entities to include in the response. |
| `'select` | <code>("id"&#124;"number"&#124;"externalDocumentNumber"&#124;"invoiceDate"&#124;"dueDate"&#124;"customerPurchaseOrderReference"&#124;"customerId"&#124;"contactId"&#124;"customerNumber"&#124;"customerName"&#124;"billToName"&#124;"billToCustomerId"&#124;"billToCustomerNumber"&#124;"shipToName"&#124;"shipToContact"&#124;"sellingPostalAddress"&#124;"billingPostalAddress"&#124;"shippingPostalAddress"&#124;"currencyId"&#124;"currencyCode"&#124;"orderId"&#124;"orderNumber"&#124;"paymentTermsId"&#124;"shipmentMethodId"&#124;"salesperson"&#124;"pricesIncludeTax"&#124;"remainingAmount"&#124;"discountAmount"&#124;"discountAppliedBeforeTax"&#124;"totalAmountExcludingTax"&#124;"totalTaxAmount"&#124;"totalAmountIncludingTax"&#124;"status"&#124;"lastModifiedDateTime"&#124;"phoneNumber"&#124;"email")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `SalesInvoice|error`

**Sample code:**

```ballerina
bc:SalesInvoice result = check bcClient->getSalesInvoice("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "orderNumber": "INV-0001",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "shipmentMethodId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "discountAppliedBeforeTax": false,
  "orderId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "dueDate": "2026-01-15T00:00:00"
}
```

</div>
</details>

<details>
<summary>deleteSalesInvoice</summary>

<div>

Deletes a sales invoice.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `salesInvoiceId` | <code>string</code> | Yes | The unique identifier of the sales invoice. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bcClient->deleteSalesInvoice("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updateSalesInvoice</summary>

<div>

Updates a sales invoice.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `salesInvoiceId` | <code>string</code> | Yes | The unique identifier of the sales invoice. |
| `headers` | <code>UpdateSalesInvoiceHeaders</code> | Yes | Request headers, including the required `ifMatch`. |
| `payload` | <code>SalesInvoiceRequest</code> | Yes | The sales invoice to create or update. |

**Returns:** `SalesInvoice|error`

**Sample code:**

```ballerina
bc:SalesInvoice result = check bcClient->updateSalesInvoice("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {ifMatch: "string"}, {
    orderNumber: "INV-0001",
    lastModifiedDateTime: "2026-01-15T00:00:00",
    shipmentMethodId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    discountAppliedBeforeTax: false
});
```

**Sample response:**

```json
{
  "orderNumber": "INV-0001",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "shipmentMethodId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "discountAppliedBeforeTax": false,
  "orderId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "dueDate": "2026-01-15T00:00:00"
}
```

</div>
</details>

<details>
<summary>cancelAndSendSalesInvoice</summary>

<div>

Performs the cancel and send action on a sales invoice.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `salesInvoiceId` | <code>string</code> | Yes | The unique identifier of the sales invoice. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bcClient->cancelAndSendSalesInvoice("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>cancelSalesInvoice</summary>

<div>

Performs the cancel action on a sales invoice.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `salesInvoiceId` | <code>string</code> | Yes | The unique identifier of the sales invoice. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bcClient->cancelSalesInvoice("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>makeCorrectiveCreditMemoForSalesInvoice</summary>

<div>

Performs the make corrective credit memo action on a sales invoice.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `salesInvoiceId` | <code>string</code> | Yes | The unique identifier of the sales invoice. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bcClient->makeCorrectiveCreditMemoForSalesInvoice("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>postAndSendSalesInvoice</summary>

<div>

Performs the post and send action on a sales invoice.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `salesInvoiceId` | <code>string</code> | Yes | The unique identifier of the sales invoice. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bcClient->postAndSendSalesInvoice("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>postSalesInvoice</summary>

<div>

Performs the post action on a sales invoice.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `salesInvoiceId` | <code>string</code> | Yes | The unique identifier of the sales invoice. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bcClient->postSalesInvoice("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>sendSalesInvoice</summary>

<div>

Performs the send action on a sales invoice.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `salesInvoiceId` | <code>string</code> | Yes | The unique identifier of the sales invoice. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bcClient->sendSalesInvoice("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>listSalesInvoiceLinesForSalesInvoice</summary>

<div>

Returns a list of sales invoice lines for a sales invoice.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `salesInvoiceId` | <code>string</code> | Yes | The unique identifier of the sales invoice. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | The number of entities to skip before returning the results. |
| `top` | <code>int</code> | No | The maximum number of entities to return. |
| `filter` | <code>string</code> | No | An OData filter expression that restricts the entities returned. |
| `'limit` | <code>int</code> | No | The maximum number of entities to return in the page. |
| `expand` | <code>("item"&#124;"account")[]</code> | No | The related entities to include in the response. |
| `'select` | <code>("id"&#124;"documentId"&#124;"sequence"&#124;"itemId"&#124;"accountId"&#124;"lineType"&#124;"lineDetails"&#124;"description"&#124;"unitOfMeasureId"&#124;"unitOfMeasure"&#124;"unitPrice"&#124;"quantity"&#124;"discountAmount"&#124;"discountPercent"&#124;"discountAppliedBeforeTax"&#124;"amountExcludingTax"&#124;"taxCode"&#124;"taxPercent"&#124;"totalTaxAmount"&#124;"amountIncludingTax"&#124;"invoiceDiscountAllocation"&#124;"netAmount"&#124;"netTaxAmount"&#124;"netAmountIncludingTax"&#124;"shipmentDate")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `SalesInvoiceLineCollection|error`

**Sample code:**

```ballerina
bc:SalesInvoiceLineCollection result = check bcClient->listSalesInvoiceLinesForSalesInvoice("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "value": [
    {
      "discountAppliedBeforeTax": false,
      "description": "Sample description",
      "discountAmount": 100.00
    }
  ]
}
```

</div>
</details>

<details>
<summary>createSalesInvoiceLineForSalesInvoice</summary>

<div>

Creates a sales invoice line for a sales invoice.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `salesInvoiceId` | <code>string</code> | Yes | The unique identifier of the sales invoice. |
| `payload` | <code>SalesInvoiceLineRequest</code> | Yes | The sales invoice line to create or update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `SalesInvoiceLine|error`

**Sample code:**

```ballerina
bc:SalesInvoiceLine result = check bcClient->createSalesInvoiceLineForSalesInvoice("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    lineDetails: {
        number: "INV-0001",
        displayName: "Sample name"
    },
    discountAppliedBeforeTax: false,
    description: "Sample description",
    discountAmount: 100.00
});
```

**Sample response:**

```json
{
  "lineDetails": {
    "number": "INV-0001",
    "displayName": "Sample name"
  },
  "discountAppliedBeforeTax": false,
  "description": "Sample description",
  "discountAmount": 100.00,
  "invoiceDiscountAllocation": 100.00,
  "lineType": "string"
}
```

</div>
</details>

<details>
<summary>getSalesInvoiceLineForSalesInvoice</summary>

<div>

Returns a sales invoice line for a sales invoice.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `salesInvoiceId` | <code>string</code> | Yes | The unique identifier of the sales invoice. |
| `salesInvoiceLineId` | <code>string</code> | Yes | The unique identifier of the sales invoice line. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>("item"&#124;"account")[]</code> | No | The related entities to include in the response. |
| `'select` | <code>("id"&#124;"documentId"&#124;"sequence"&#124;"itemId"&#124;"accountId"&#124;"lineType"&#124;"lineDetails"&#124;"description"&#124;"unitOfMeasureId"&#124;"unitOfMeasure"&#124;"unitPrice"&#124;"quantity"&#124;"discountAmount"&#124;"discountPercent"&#124;"discountAppliedBeforeTax"&#124;"amountExcludingTax"&#124;"taxCode"&#124;"taxPercent"&#124;"totalTaxAmount"&#124;"amountIncludingTax"&#124;"invoiceDiscountAllocation"&#124;"netAmount"&#124;"netTaxAmount"&#124;"netAmountIncludingTax"&#124;"shipmentDate")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `SalesInvoiceLine|error`

**Sample code:**

```ballerina
bc:SalesInvoiceLine result = check bcClient->getSalesInvoiceLineForSalesInvoice("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "lineDetails": {
    "number": "INV-0001",
    "displayName": "Sample name"
  },
  "discountAppliedBeforeTax": false,
  "description": "Sample description",
  "discountAmount": 100.00,
  "invoiceDiscountAllocation": 100.00,
  "lineType": "string"
}
```

</div>
</details>

<details>
<summary>deleteSalesInvoiceLineForSalesInvoice</summary>

<div>

Deletes a sales invoice line for a sales invoice.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `salesInvoiceId` | <code>string</code> | Yes | The unique identifier of the sales invoice. |
| `salesInvoiceLineId` | <code>string</code> | Yes | The unique identifier of the sales invoice line. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bcClient->deleteSalesInvoiceLineForSalesInvoice("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updateSalesInvoiceLineForSalesInvoice</summary>

<div>

Updates a sales invoice line for a sales invoice.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `salesInvoiceId` | <code>string</code> | Yes | The unique identifier of the sales invoice. |
| `salesInvoiceLineId` | <code>string</code> | Yes | The unique identifier of the sales invoice line. |
| `headers` | <code>UpdateSalesInvoiceLineForSalesInvoiceHeaders</code> | Yes | Request headers, including the required `ifMatch`. |
| `payload` | <code>SalesInvoiceLineRequest</code> | Yes | The sales invoice line to create or update. |

**Returns:** `SalesInvoiceLine|error`

**Sample code:**

```ballerina
bc:SalesInvoiceLine result = check bcClient->updateSalesInvoiceLineForSalesInvoice("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {ifMatch: "string"}, {
    lineDetails: {
        number: "INV-0001",
        displayName: "Sample name"
    },
    discountAppliedBeforeTax: false,
    description: "Sample description",
    discountAmount: 100.00
});
```

**Sample response:**

```json
{
  "lineDetails": {
    "number": "INV-0001",
    "displayName": "Sample name"
  },
  "discountAppliedBeforeTax": false,
  "description": "Sample description",
  "discountAmount": 100.00,
  "invoiceDiscountAllocation": 100.00,
  "lineType": "string"
}
```

</div>
</details>

<details>
<summary>listPdfDocumentsForSalesInvoice</summary>

<div>

Returns a list of PDF documents for a sales invoice.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `salesInvoiceId` | <code>string</code> | Yes | The unique identifier of the sales invoice. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | The number of entities to skip before returning the results. |
| `top` | <code>int</code> | No | The maximum number of entities to return. |
| `filter` | <code>string</code> | No | An OData filter expression that restricts the entities returned. |
| `'limit` | <code>int</code> | No | The maximum number of entities to return in the page. |
| `'select` | <code>("id"&#124;"content")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `PdfDocumentCollection|error`

**Sample code:**

```ballerina
bc:PdfDocumentCollection result = check bcClient->listPdfDocumentsForSalesInvoice("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "value": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "content": {
        "fileContent": "string",
        "fileName": "import.csv"
      }
    }
  ]
}
```

</div>
</details>

<details>
<summary>getPdfDocumentForSalesInvoice</summary>

<div>

Returns a PDF document for a sales invoice.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `salesInvoiceId` | <code>string</code> | Yes | The unique identifier of the sales invoice. |
| `pdfDocumentId` | <code>string</code> | Yes | The unique identifier of the pdf document. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `'select` | <code>("id"&#124;"content")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `PdfDocument|error`

**Sample code:**

```ballerina
bc:PdfDocument result = check bcClient->getPdfDocumentForSalesInvoice("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "content": {
    "fileContent": "string",
    "fileName": "import.csv"
  }
}
```

</div>
</details>

#### Sales Invoice Lines

<details>
<summary>listSalesInvoiceLines</summary>

<div>

Returns a list of sales invoice lines.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | The number of entities to skip before returning the results. |
| `top` | <code>int</code> | No | The maximum number of entities to return. |
| `filter` | <code>string</code> | No | An OData filter expression that restricts the entities returned. |
| `'limit` | <code>int</code> | No | The maximum number of entities to return in the page. |
| `expand` | <code>("item"&#124;"account")[]</code> | No | The related entities to include in the response. |
| `'select` | <code>("id"&#124;"documentId"&#124;"sequence"&#124;"itemId"&#124;"accountId"&#124;"lineType"&#124;"lineDetails"&#124;"description"&#124;"unitOfMeasureId"&#124;"unitOfMeasure"&#124;"unitPrice"&#124;"quantity"&#124;"discountAmount"&#124;"discountPercent"&#124;"discountAppliedBeforeTax"&#124;"amountExcludingTax"&#124;"taxCode"&#124;"taxPercent"&#124;"totalTaxAmount"&#124;"amountIncludingTax"&#124;"invoiceDiscountAllocation"&#124;"netAmount"&#124;"netTaxAmount"&#124;"netAmountIncludingTax"&#124;"shipmentDate")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `SalesInvoiceLineCollection|error`

**Sample code:**

```ballerina
bc:SalesInvoiceLineCollection result = check bcClient->listSalesInvoiceLines("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "value": [
    {
      "discountAppliedBeforeTax": false,
      "description": "Sample description",
      "discountAmount": 100.00
    }
  ]
}
```

</div>
</details>

<details>
<summary>createSalesInvoiceLine</summary>

<div>

Creates a sales invoice line.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `payload` | <code>SalesInvoiceLineRequest</code> | Yes | The sales invoice line to create or update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `SalesInvoiceLine|error`

**Sample code:**

```ballerina
bc:SalesInvoiceLine result = check bcClient->createSalesInvoiceLine("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    lineDetails: {
        number: "INV-0001",
        displayName: "Sample name"
    },
    discountAppliedBeforeTax: false,
    description: "Sample description",
    discountAmount: 100.00
});
```

**Sample response:**

```json
{
  "lineDetails": {
    "number": "INV-0001",
    "displayName": "Sample name"
  },
  "discountAppliedBeforeTax": false,
  "description": "Sample description",
  "discountAmount": 100.00,
  "invoiceDiscountAllocation": 100.00,
  "lineType": "string"
}
```

</div>
</details>

<details>
<summary>getSalesInvoiceLine</summary>

<div>

Returns a sales invoice line.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `salesInvoiceLineId` | <code>string</code> | Yes | The unique identifier of the sales invoice line. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>("item"&#124;"account")[]</code> | No | The related entities to include in the response. |
| `'select` | <code>("id"&#124;"documentId"&#124;"sequence"&#124;"itemId"&#124;"accountId"&#124;"lineType"&#124;"lineDetails"&#124;"description"&#124;"unitOfMeasureId"&#124;"unitOfMeasure"&#124;"unitPrice"&#124;"quantity"&#124;"discountAmount"&#124;"discountPercent"&#124;"discountAppliedBeforeTax"&#124;"amountExcludingTax"&#124;"taxCode"&#124;"taxPercent"&#124;"totalTaxAmount"&#124;"amountIncludingTax"&#124;"invoiceDiscountAllocation"&#124;"netAmount"&#124;"netTaxAmount"&#124;"netAmountIncludingTax"&#124;"shipmentDate")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `SalesInvoiceLine|error`

**Sample code:**

```ballerina
bc:SalesInvoiceLine result = check bcClient->getSalesInvoiceLine("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "lineDetails": {
    "number": "INV-0001",
    "displayName": "Sample name"
  },
  "discountAppliedBeforeTax": false,
  "description": "Sample description",
  "discountAmount": 100.00,
  "invoiceDiscountAllocation": 100.00,
  "lineType": "string"
}
```

</div>
</details>

<details>
<summary>deleteSalesInvoiceLine</summary>

<div>

Deletes a sales invoice line.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `salesInvoiceLineId` | <code>string</code> | Yes | The unique identifier of the sales invoice line. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bcClient->deleteSalesInvoiceLine("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updateSalesInvoiceLine</summary>

<div>

Updates a sales invoice line.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `salesInvoiceLineId` | <code>string</code> | Yes | The unique identifier of the sales invoice line. |
| `headers` | <code>UpdateSalesInvoiceLineHeaders</code> | Yes | Request headers, including the required `ifMatch`. |
| `payload` | <code>SalesInvoiceLineRequest</code> | Yes | The sales invoice line to create or update. |

**Returns:** `SalesInvoiceLine|error`

**Sample code:**

```ballerina
bc:SalesInvoiceLine result = check bcClient->updateSalesInvoiceLine("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {ifMatch: "string"}, {
    lineDetails: {
        number: "INV-0001",
        displayName: "Sample name"
    },
    discountAppliedBeforeTax: false,
    description: "Sample description",
    discountAmount: 100.00
});
```

**Sample response:**

```json
{
  "lineDetails": {
    "number": "INV-0001",
    "displayName": "Sample name"
  },
  "discountAppliedBeforeTax": false,
  "description": "Sample description",
  "discountAmount": 100.00,
  "invoiceDiscountAllocation": 100.00,
  "lineType": "string"
}
```

</div>
</details>

#### Pdf Document

<details>
<summary>listPdfDocuments</summary>

<div>

Returns a list of PDF documents.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | The number of entities to skip before returning the results. |
| `top` | <code>int</code> | No | The maximum number of entities to return. |
| `filter` | <code>string</code> | No | An OData filter expression that restricts the entities returned. |
| `'limit` | <code>int</code> | No | The maximum number of entities to return in the page. |
| `'select` | <code>("id"&#124;"content")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `PdfDocumentCollection|error`

**Sample code:**

```ballerina
bc:PdfDocumentCollection result = check bcClient->listPdfDocuments("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "value": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "content": {
        "fileContent": "string",
        "fileName": "import.csv"
      }
    }
  ]
}
```

</div>
</details>

<details>
<summary>getPdfDocument</summary>

<div>

Returns a PDF document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `pdfDocumentId` | <code>string</code> | Yes | The unique identifier of the pdf document. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `'select` | <code>("id"&#124;"content")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `PdfDocument|error`

**Sample code:**

```ballerina
bc:PdfDocument result = check bcClient->getPdfDocument("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "content": {
    "fileContent": "string",
    "fileName": "import.csv"
  }
}
```

</div>
</details>

#### Customer Payment Journals

<details>
<summary>listCustomerPaymentJournals</summary>

<div>

Returns a list of customer payment journals.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | The number of entities to skip before returning the results. |
| `top` | <code>int</code> | No | The maximum number of entities to return. |
| `filter` | <code>string</code> | No | An OData filter expression that restricts the entities returned. |
| `'limit` | <code>int</code> | No | The maximum number of entities to return in the page. |
| `expand` | <code>("customerPayments"&#124;"account")[]</code> | No | The related entities to include in the response. |
| `'select` | <code>("id"&#124;"code"&#124;"displayName"&#124;"lastModifiedDateTime"&#124;"balancingAccountId"&#124;"balancingAccountNumber")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `CustomerPaymentJournalCollection|error`

**Sample code:**

```ballerina
bc:CustomerPaymentJournalCollection result = check bcClient->listCustomerPaymentJournals("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "value": [
    {
      "balancingAccountNumber": "INV-0001",
      "code": "200",
      "lastModifiedDateTime": "2026-01-15T00:00:00"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createCustomerPaymentJournal</summary>

<div>

Creates a customer payment journal.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `payload` | <code>CustomerPaymentJournalRequest</code> | Yes | The customer payment journal to create or update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CustomerPaymentJournal|error`

**Sample code:**

```ballerina
bc:CustomerPaymentJournal result = check bcClient->createCustomerPaymentJournal("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    balancingAccountNumber: "INV-0001",
    code: "200",
    lastModifiedDateTime: "2026-01-15T00:00:00",
    displayName: "Sample name"
});
```

**Sample response:**

```json
{
  "balancingAccountNumber": "INV-0001",
  "code": "200",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "customerPayments": [
    {
      "amount": 100.00,
      "lastModifiedDateTime": "2026-01-15T00:00:00",
      "contactId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ],
  "displayName": "Sample name",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>getCustomerPaymentJournal</summary>

<div>

Returns a customer payment journal.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `customerPaymentJournalId` | <code>string</code> | Yes | The unique identifier of the customer payment journal. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>("customerPayments"&#124;"account")[]</code> | No | The related entities to include in the response. |
| `'select` | <code>("id"&#124;"code"&#124;"displayName"&#124;"lastModifiedDateTime"&#124;"balancingAccountId"&#124;"balancingAccountNumber")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `CustomerPaymentJournal|error`

**Sample code:**

```ballerina
bc:CustomerPaymentJournal result = check bcClient->getCustomerPaymentJournal("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "balancingAccountNumber": "INV-0001",
  "code": "200",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "customerPayments": [
    {
      "amount": 100.00,
      "lastModifiedDateTime": "2026-01-15T00:00:00",
      "contactId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ],
  "displayName": "Sample name",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>deleteCustomerPaymentJournal</summary>

<div>

Deletes a customer payment journal.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `customerPaymentJournalId` | <code>string</code> | Yes | The unique identifier of the customer payment journal. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bcClient->deleteCustomerPaymentJournal("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updateCustomerPaymentJournal</summary>

<div>

Updates a customer payment journal.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `customerPaymentJournalId` | <code>string</code> | Yes | The unique identifier of the customer payment journal. |
| `headers` | <code>UpdateCustomerPaymentJournalHeaders</code> | Yes | Request headers, including the required `ifMatch`. |
| `payload` | <code>CustomerPaymentJournalRequest</code> | Yes | The customer payment journal to create or update. |

**Returns:** `CustomerPaymentJournal|error`

**Sample code:**

```ballerina
bc:CustomerPaymentJournal result = check bcClient->updateCustomerPaymentJournal("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {ifMatch: "string"}, {
    balancingAccountNumber: "INV-0001",
    code: "200",
    lastModifiedDateTime: "2026-01-15T00:00:00",
    displayName: "Sample name"
});
```

**Sample response:**

```json
{
  "balancingAccountNumber": "INV-0001",
  "code": "200",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "customerPayments": [
    {
      "amount": 100.00,
      "lastModifiedDateTime": "2026-01-15T00:00:00",
      "contactId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ],
  "displayName": "Sample name",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>listCustomerPaymentsForCustomerPaymentJournal</summary>

<div>

Returns a list of customer payments for a customer payment journal.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `customerPaymentJournalId` | <code>string</code> | Yes | The unique identifier of the customer payment journal. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | The number of entities to skip before returning the results. |
| `top` | <code>int</code> | No | The maximum number of entities to return. |
| `filter` | <code>string</code> | No | An OData filter expression that restricts the entities returned. |
| `'limit` | <code>int</code> | No | The maximum number of entities to return in the page. |
| `expand` | <code>("customer")[]</code> | No | The related entities to include in the response. |
| `'select` | <code>("id"&#124;"journalDisplayName"&#124;"lineNumber"&#124;"customerId"&#124;"customerNumber"&#124;"contactId"&#124;"postingDate"&#124;"documentNumber"&#124;"externalDocumentNumber"&#124;"amount"&#124;"appliesToInvoiceId"&#124;"appliesToInvoiceNumber"&#124;"description"&#124;"comment"&#124;"dimensions"&#124;"lastModifiedDateTime")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `CustomerPaymentCollection|error`

**Sample code:**

```ballerina
bc:CustomerPaymentCollection result = check bcClient->listCustomerPaymentsForCustomerPaymentJournal("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "value": [
    {
      "amount": 100.00,
      "lastModifiedDateTime": "2026-01-15T00:00:00",
      "contactId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createCustomerPaymentForCustomerPaymentJournal</summary>

<div>

Creates a customer payment for a customer payment journal.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `customerPaymentJournalId` | <code>string</code> | Yes | The unique identifier of the customer payment journal. |
| `payload` | <code>CustomerPaymentRequest</code> | Yes | The customer payment to create or update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CustomerPayment|error`

**Sample code:**

```ballerina
bc:CustomerPayment result = check bcClient->createCustomerPaymentForCustomerPaymentJournal("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    amount: 100.00,
    lastModifiedDateTime: "2026-01-15T00:00:00",
    contactId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    documentNumber: "INV-0001"
});
```

**Sample response:**

```json
{
  "amount": 100.00,
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "contactId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "documentNumber": "INV-0001",
  "description": "Sample description",
  "postingDate": "2026-01-15T00:00:00"
}
```

</div>
</details>

<details>
<summary>getCustomerPaymentForCustomerPaymentJournal</summary>

<div>

Returns a customer payment for a customer payment journal.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `customerPaymentJournalId` | <code>string</code> | Yes | The unique identifier of the customer payment journal. |
| `customerPaymentId` | <code>string</code> | Yes | The unique identifier of the customer payment. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>("customer")[]</code> | No | The related entities to include in the response. |
| `'select` | <code>("id"&#124;"journalDisplayName"&#124;"lineNumber"&#124;"customerId"&#124;"customerNumber"&#124;"contactId"&#124;"postingDate"&#124;"documentNumber"&#124;"externalDocumentNumber"&#124;"amount"&#124;"appliesToInvoiceId"&#124;"appliesToInvoiceNumber"&#124;"description"&#124;"comment"&#124;"dimensions"&#124;"lastModifiedDateTime")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `CustomerPayment|error`

**Sample code:**

```ballerina
bc:CustomerPayment result = check bcClient->getCustomerPaymentForCustomerPaymentJournal("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "amount": 100.00,
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "contactId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "documentNumber": "INV-0001",
  "description": "Sample description",
  "postingDate": "2026-01-15T00:00:00"
}
```

</div>
</details>

<details>
<summary>deleteCustomerPaymentForCustomerPaymentJournal</summary>

<div>

Deletes a customer payment for a customer payment journal.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `customerPaymentJournalId` | <code>string</code> | Yes | The unique identifier of the customer payment journal. |
| `customerPaymentId` | <code>string</code> | Yes | The unique identifier of the customer payment. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bcClient->deleteCustomerPaymentForCustomerPaymentJournal("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updateCustomerPaymentForCustomerPaymentJournal</summary>

<div>

Updates a customer payment for a customer payment journal.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `customerPaymentJournalId` | <code>string</code> | Yes | The unique identifier of the customer payment journal. |
| `customerPaymentId` | <code>string</code> | Yes | The unique identifier of the customer payment. |
| `headers` | <code>UpdateCustomerPaymentForCustomerPaymentJournalHeaders</code> | Yes | Request headers, including the required `ifMatch`. |
| `payload` | <code>CustomerPaymentRequest</code> | Yes | The customer payment to create or update. |

**Returns:** `CustomerPayment|error`

**Sample code:**

```ballerina
bc:CustomerPayment result = check bcClient->updateCustomerPaymentForCustomerPaymentJournal("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {ifMatch: "string"}, {
    amount: 100.00,
    lastModifiedDateTime: "2026-01-15T00:00:00",
    contactId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    documentNumber: "INV-0001"
});
```

**Sample response:**

```json
{
  "amount": 100.00,
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "contactId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "documentNumber": "INV-0001",
  "description": "Sample description",
  "postingDate": "2026-01-15T00:00:00"
}
```

</div>
</details>

#### Customer Payments

<details>
<summary>listCustomerPayments</summary>

<div>

Returns a list of customer payments.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | The number of entities to skip before returning the results. |
| `top` | <code>int</code> | No | The maximum number of entities to return. |
| `filter` | <code>string</code> | No | An OData filter expression that restricts the entities returned. |
| `'limit` | <code>int</code> | No | The maximum number of entities to return in the page. |
| `expand` | <code>("customer")[]</code> | No | The related entities to include in the response. |
| `'select` | <code>("id"&#124;"journalDisplayName"&#124;"lineNumber"&#124;"customerId"&#124;"customerNumber"&#124;"contactId"&#124;"postingDate"&#124;"documentNumber"&#124;"externalDocumentNumber"&#124;"amount"&#124;"appliesToInvoiceId"&#124;"appliesToInvoiceNumber"&#124;"description"&#124;"comment"&#124;"dimensions"&#124;"lastModifiedDateTime")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `CustomerPaymentCollection|error`

**Sample code:**

```ballerina
bc:CustomerPaymentCollection result = check bcClient->listCustomerPayments("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "value": [
    {
      "amount": 100.00,
      "lastModifiedDateTime": "2026-01-15T00:00:00",
      "contactId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createCustomerPayment</summary>

<div>

Creates a customer payment.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `payload` | <code>CustomerPaymentRequest</code> | Yes | The customer payment to create or update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CustomerPayment|error`

**Sample code:**

```ballerina
bc:CustomerPayment result = check bcClient->createCustomerPayment("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    amount: 100.00,
    lastModifiedDateTime: "2026-01-15T00:00:00",
    contactId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    documentNumber: "INV-0001"
});
```

**Sample response:**

```json
{
  "amount": 100.00,
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "contactId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "documentNumber": "INV-0001",
  "description": "Sample description",
  "postingDate": "2026-01-15T00:00:00"
}
```

</div>
</details>

<details>
<summary>getCustomerPayment</summary>

<div>

Returns a customer payment.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `customerPaymentId` | <code>string</code> | Yes | The unique identifier of the customer payment. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>("customer")[]</code> | No | The related entities to include in the response. |
| `'select` | <code>("id"&#124;"journalDisplayName"&#124;"lineNumber"&#124;"customerId"&#124;"customerNumber"&#124;"contactId"&#124;"postingDate"&#124;"documentNumber"&#124;"externalDocumentNumber"&#124;"amount"&#124;"appliesToInvoiceId"&#124;"appliesToInvoiceNumber"&#124;"description"&#124;"comment"&#124;"dimensions"&#124;"lastModifiedDateTime")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `CustomerPayment|error`

**Sample code:**

```ballerina
bc:CustomerPayment result = check bcClient->getCustomerPayment("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "amount": 100.00,
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "contactId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "documentNumber": "INV-0001",
  "description": "Sample description",
  "postingDate": "2026-01-15T00:00:00"
}
```

</div>
</details>

<details>
<summary>deleteCustomerPayment</summary>

<div>

Deletes a customer payment.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `customerPaymentId` | <code>string</code> | Yes | The unique identifier of the customer payment. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bcClient->deleteCustomerPayment("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updateCustomerPayment</summary>

<div>

Updates a customer payment.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `customerPaymentId` | <code>string</code> | Yes | The unique identifier of the customer payment. |
| `headers` | <code>UpdateCustomerPaymentHeaders</code> | Yes | Request headers, including the required `ifMatch`. |
| `payload` | <code>CustomerPaymentRequest</code> | Yes | The customer payment to create or update. |

**Returns:** `CustomerPayment|error`

**Sample code:**

```ballerina
bc:CustomerPayment result = check bcClient->updateCustomerPayment("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {ifMatch: "string"}, {
    amount: 100.00,
    lastModifiedDateTime: "2026-01-15T00:00:00",
    contactId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    documentNumber: "INV-0001"
});
```

**Sample response:**

```json
{
  "amount": 100.00,
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "contactId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "documentNumber": "INV-0001",
  "description": "Sample description",
  "postingDate": "2026-01-15T00:00:00"
}
```

</div>
</details>

#### Accounts

<details>
<summary>listAccounts</summary>

<div>

Returns a list of general ledger accounts.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | The number of entities to skip before returning the results. |
| `top` | <code>int</code> | No | The maximum number of entities to return. |
| `filter` | <code>string</code> | No | An OData filter expression that restricts the entities returned. |
| `'limit` | <code>int</code> | No | The maximum number of entities to return in the page. |
| `'select` | <code>("id"&#124;"number"&#124;"displayName"&#124;"category"&#124;"subCategory"&#124;"blocked"&#124;"lastModifiedDateTime")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `AccountCollection|error`

**Sample code:**

```ballerina
bc:AccountCollection result = check bcClient->listAccounts("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "value": [
    {
      "number": "INV-0001",
      "subCategory": "string",
      "lastModifiedDateTime": "2026-01-15T00:00:00"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getAccount</summary>

<div>

Returns a general ledger account.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `accountId` | <code>string</code> | Yes | The unique identifier of the account. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `'select` | <code>("id"&#124;"number"&#124;"displayName"&#124;"category"&#124;"subCategory"&#124;"blocked"&#124;"lastModifiedDateTime")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `Account|error`

**Sample code:**

```ballerina
bc:Account result = check bcClient->getAccount("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "number": "INV-0001",
  "subCategory": "string",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "blocked": false,
  "displayName": "Sample name",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

#### Tax Groups

<details>
<summary>listTaxGroups</summary>

<div>

Returns a list of tax groups.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | The number of entities to skip before returning the results. |
| `top` | <code>int</code> | No | The maximum number of entities to return. |
| `filter` | <code>string</code> | No | An OData filter expression that restricts the entities returned. |
| `'limit` | <code>int</code> | No | The maximum number of entities to return in the page. |
| `'select` | <code>("id"&#124;"code"&#124;"displayName"&#124;"taxType"&#124;"lastModifiedDateTime")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `TaxGroupCollection|error`

**Sample code:**

```ballerina
bc:TaxGroupCollection result = check bcClient->listTaxGroups("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "value": [
    {
      "code": "200",
      "lastModifiedDateTime": "2026-01-15T00:00:00",
      "displayName": "Sample name"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createTaxGroup</summary>

<div>

Creates a tax group.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `payload` | <code>TaxGroupRequest</code> | Yes | The tax group to create or update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TaxGroup|error`

**Sample code:**

```ballerina
bc:TaxGroup result = check bcClient->createTaxGroup("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    code: "200",
    lastModifiedDateTime: "2026-01-15T00:00:00",
    displayName: "Sample name",
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "code": "200",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "displayName": "Sample name",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "taxType": "string"
}
```

</div>
</details>

<details>
<summary>getTaxGroup</summary>

<div>

Returns a tax group.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `taxGroupId` | <code>string</code> | Yes | The unique identifier of the tax group. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `'select` | <code>("id"&#124;"code"&#124;"displayName"&#124;"taxType"&#124;"lastModifiedDateTime")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `TaxGroup|error`

**Sample code:**

```ballerina
bc:TaxGroup result = check bcClient->getTaxGroup("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "code": "200",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "displayName": "Sample name",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "taxType": "string"
}
```

</div>
</details>

<details>
<summary>deleteTaxGroup</summary>

<div>

Deletes a tax group.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `taxGroupId` | <code>string</code> | Yes | The unique identifier of the tax group. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bcClient->deleteTaxGroup("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updateTaxGroup</summary>

<div>

Updates a tax group.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `taxGroupId` | <code>string</code> | Yes | The unique identifier of the tax group. |
| `headers` | <code>UpdateTaxGroupHeaders</code> | Yes | Request headers, including the required `ifMatch`. |
| `payload` | <code>TaxGroupRequest</code> | Yes | The tax group to create or update. |

**Returns:** `TaxGroup|error`

**Sample code:**

```ballerina
bc:TaxGroup result = check bcClient->updateTaxGroup("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {ifMatch: "string"}, {
    code: "200",
    lastModifiedDateTime: "2026-01-15T00:00:00",
    displayName: "Sample name",
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "code": "200",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "displayName": "Sample name",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "taxType": "string"
}
```

</div>
</details>

#### Journals

<details>
<summary>listJournals</summary>

<div>

Returns a list of journals.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | The number of entities to skip before returning the results. |
| `top` | <code>int</code> | No | The maximum number of entities to return. |
| `filter` | <code>string</code> | No | An OData filter expression that restricts the entities returned. |
| `'limit` | <code>int</code> | No | The maximum number of entities to return in the page. |
| `expand` | <code>("journalLines"&#124;"account")[]</code> | No | The related entities to include in the response. |
| `'select` | <code>("id"&#124;"code"&#124;"displayName"&#124;"lastModifiedDateTime"&#124;"balancingAccountId"&#124;"balancingAccountNumber")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `JournalCollection|error`

**Sample code:**

```ballerina
bc:JournalCollection result = check bcClient->listJournals("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "value": [
    {
      "balancingAccountNumber": "INV-0001",
      "code": "200",
      "lastModifiedDateTime": "2026-01-15T00:00:00"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createJournal</summary>

<div>

Creates a journal.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `payload` | <code>JournalRequest</code> | Yes | The journal to create or update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Journal|error`

**Sample code:**

```ballerina
bc:Journal result = check bcClient->createJournal("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    balancingAccountNumber: "INV-0001",
    code: "200",
    lastModifiedDateTime: "2026-01-15T00:00:00",
    displayName: "Sample name"
});
```

**Sample response:**

```json
{
  "balancingAccountNumber": "INV-0001",
  "code": "200",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "journalLines": [
    {
      "amount": 100.00,
      "lastModifiedDateTime": "2026-01-15T00:00:00",
      "documentNumber": "INV-0001"
    }
  ],
  "displayName": "Sample name",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>getJournal</summary>

<div>

Returns a journal.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `journalId` | <code>string</code> | Yes | The unique identifier of the journal. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>("journalLines"&#124;"account")[]</code> | No | The related entities to include in the response. |
| `'select` | <code>("id"&#124;"code"&#124;"displayName"&#124;"lastModifiedDateTime"&#124;"balancingAccountId"&#124;"balancingAccountNumber")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `Journal|error`

**Sample code:**

```ballerina
bc:Journal result = check bcClient->getJournal("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "balancingAccountNumber": "INV-0001",
  "code": "200",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "journalLines": [
    {
      "amount": 100.00,
      "lastModifiedDateTime": "2026-01-15T00:00:00",
      "documentNumber": "INV-0001"
    }
  ],
  "displayName": "Sample name",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>deleteJournal</summary>

<div>

Deletes a journal.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `journalId` | <code>string</code> | Yes | The unique identifier of the journal. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bcClient->deleteJournal("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updateJournal</summary>

<div>

Updates a journal.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `journalId` | <code>string</code> | Yes | The unique identifier of the journal. |
| `headers` | <code>UpdateJournalHeaders</code> | Yes | Request headers, including the required `ifMatch`. |
| `payload` | <code>JournalRequest</code> | Yes | The journal to create or update. |

**Returns:** `Journal|error`

**Sample code:**

```ballerina
bc:Journal result = check bcClient->updateJournal("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {ifMatch: "string"}, {
    balancingAccountNumber: "INV-0001",
    code: "200",
    lastModifiedDateTime: "2026-01-15T00:00:00",
    displayName: "Sample name"
});
```

**Sample response:**

```json
{
  "balancingAccountNumber": "INV-0001",
  "code": "200",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "journalLines": [
    {
      "amount": 100.00,
      "lastModifiedDateTime": "2026-01-15T00:00:00",
      "documentNumber": "INV-0001"
    }
  ],
  "displayName": "Sample name",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>postJournal</summary>

<div>

Performs the post action on a journal.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `journalId` | <code>string</code> | Yes | The unique identifier of the journal. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bcClient->postJournal("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>listJournalLinesForJournal</summary>

<div>

Returns a list of journal lines for a journal.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `journalId` | <code>string</code> | Yes | The unique identifier of the journal. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | The number of entities to skip before returning the results. |
| `top` | <code>int</code> | No | The maximum number of entities to return. |
| `filter` | <code>string</code> | No | An OData filter expression that restricts the entities returned. |
| `'limit` | <code>int</code> | No | The maximum number of entities to return in the page. |
| `expand` | <code>("attachments"&#124;"account")[]</code> | No | The related entities to include in the response. |
| `'select` | <code>("id"&#124;"journalDisplayName"&#124;"lineNumber"&#124;"accountType"&#124;"accountId"&#124;"accountNumber"&#124;"postingDate"&#124;"documentNumber"&#124;"externalDocumentNumber"&#124;"amount"&#124;"description"&#124;"comment"&#124;"dimensions"&#124;"lastModifiedDateTime")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `JournalLineCollection|error`

**Sample code:**

```ballerina
bc:JournalLineCollection result = check bcClient->listJournalLinesForJournal("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "value": [
    {
      "amount": 100.00,
      "lastModifiedDateTime": "2026-01-15T00:00:00",
      "documentNumber": "INV-0001"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createJournalLineForJournal</summary>

<div>

Creates a journal line for a journal.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `journalId` | <code>string</code> | Yes | The unique identifier of the journal. |
| `payload` | <code>JournalLineRequest</code> | Yes | The journal line to create or update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `JournalLine|error`

**Sample code:**

```ballerina
bc:JournalLine result = check bcClient->createJournalLineForJournal("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    amount: 100.00,
    lastModifiedDateTime: "2026-01-15T00:00:00",
    documentNumber: "INV-0001",
    accountType: "string"
});
```

**Sample response:**

```json
{
  "amount": 100.00,
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "attachments": [
    {
      "fileName": "import.csv",
      "lastModifiedDateTime": "2026-01-15T00:00:00",
      "byteSize": 1
    }
  ],
  "documentNumber": "INV-0001",
  "accountType": "string",
  "description": "Sample description"
}
```

</div>
</details>

<details>
<summary>getJournalLineForJournal</summary>

<div>

Returns a journal line for a journal.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `journalId` | <code>string</code> | Yes | The unique identifier of the journal. |
| `journalLineId` | <code>string</code> | Yes | The unique identifier of the journal line. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>("attachments"&#124;"account")[]</code> | No | The related entities to include in the response. |
| `'select` | <code>("id"&#124;"journalDisplayName"&#124;"lineNumber"&#124;"accountType"&#124;"accountId"&#124;"accountNumber"&#124;"postingDate"&#124;"documentNumber"&#124;"externalDocumentNumber"&#124;"amount"&#124;"description"&#124;"comment"&#124;"dimensions"&#124;"lastModifiedDateTime")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `JournalLine|error`

**Sample code:**

```ballerina
bc:JournalLine result = check bcClient->getJournalLineForJournal("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "amount": 100.00,
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "attachments": [
    {
      "fileName": "import.csv",
      "lastModifiedDateTime": "2026-01-15T00:00:00",
      "byteSize": 1
    }
  ],
  "documentNumber": "INV-0001",
  "accountType": "string",
  "description": "Sample description"
}
```

</div>
</details>

<details>
<summary>deleteJournalLineForJournal</summary>

<div>

Deletes a journal line for a journal.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `journalId` | <code>string</code> | Yes | The unique identifier of the journal. |
| `journalLineId` | <code>string</code> | Yes | The unique identifier of the journal line. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bcClient->deleteJournalLineForJournal("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updateJournalLineForJournal</summary>

<div>

Updates a journal line for a journal.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `journalId` | <code>string</code> | Yes | The unique identifier of the journal. |
| `journalLineId` | <code>string</code> | Yes | The unique identifier of the journal line. |
| `headers` | <code>UpdateJournalLineForJournalHeaders</code> | Yes | Request headers, including the required `ifMatch`. |
| `payload` | <code>JournalLineRequest</code> | Yes | The journal line to create or update. |

**Returns:** `JournalLine|error`

**Sample code:**

```ballerina
bc:JournalLine result = check bcClient->updateJournalLineForJournal("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {ifMatch: "string"}, {
    amount: 100.00,
    lastModifiedDateTime: "2026-01-15T00:00:00",
    documentNumber: "INV-0001",
    accountType: "string"
});
```

**Sample response:**

```json
{
  "amount": 100.00,
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "attachments": [
    {
      "fileName": "import.csv",
      "lastModifiedDateTime": "2026-01-15T00:00:00",
      "byteSize": 1
    }
  ],
  "documentNumber": "INV-0001",
  "accountType": "string",
  "description": "Sample description"
}
```

</div>
</details>

<details>
<summary>listAttachmentsForJournalLineForJournal</summary>

<div>

Returns a list of attachments for a journal line of a journal.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `journalId` | <code>string</code> | Yes | The unique identifier of the journal. |
| `journalLineId` | <code>string</code> | Yes | The unique identifier of the journal line. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | The number of entities to skip before returning the results. |
| `top` | <code>int</code> | No | The maximum number of entities to return. |
| `filter` | <code>string</code> | No | An OData filter expression that restricts the entities returned. |
| `'limit` | <code>int</code> | No | The maximum number of entities to return in the page. |
| `'select` | <code>("parentId"&#124;"id"&#124;"fileName"&#124;"byteSize"&#124;"content"&#124;"lastModifiedDateTime")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `AttachmentCollection|error`

**Sample code:**

```ballerina
bc:AttachmentCollection result = check bcClient->listAttachmentsForJournalLineForJournal("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "value": [
    {
      "fileName": "import.csv",
      "lastModifiedDateTime": "2026-01-15T00:00:00",
      "byteSize": 1
    }
  ]
}
```

</div>
</details>

<details>
<summary>createAttachmentForJournalLineForJournal</summary>

<div>

Creates an attachment for a journal line of a journal.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `journalId` | <code>string</code> | Yes | The unique identifier of the journal. |
| `journalLineId` | <code>string</code> | Yes | The unique identifier of the journal line. |
| `payload` | <code>AttachmentRequest</code> | Yes | The attachments to create or update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Attachment|error`

**Sample code:**

```ballerina
bc:Attachment result = check bcClient->createAttachmentForJournalLineForJournal("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    fileName: "import.csv",
    lastModifiedDateTime: "2026-01-15T00:00:00",
    byteSize: 1,
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "fileName": "import.csv",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "byteSize": 1,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "parentId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "content": {
    "fileContent": "string",
    "fileName": "import.csv"
  }
}
```

</div>
</details>

<details>
<summary>getAttachmentForJournalLineForJournal</summary>

<div>

Returns an attachment for a journal line of a journal.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `journalId` | <code>string</code> | Yes | The unique identifier of the journal. |
| `journalLineId` | <code>string</code> | Yes | The unique identifier of the journal line. |
| `attachmentsParentId` | <code>string</code> | Yes | The parent id of the attachments. |
| `attachmentsId` | <code>string</code> | Yes | The unique identifier of the attachments. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `'select` | <code>("parentId"&#124;"id"&#124;"fileName"&#124;"byteSize"&#124;"content"&#124;"lastModifiedDateTime")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `Attachment|error`

**Sample code:**

```ballerina
bc:Attachment result = check bcClient->getAttachmentForJournalLineForJournal("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "fileName": "import.csv",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "byteSize": 1,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "parentId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "content": {
    "fileContent": "string",
    "fileName": "import.csv"
  }
}
```

</div>
</details>

<details>
<summary>deleteAttachmentForJournalLineForJournal</summary>

<div>

Deletes an attachment for a journal line of a journal.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `journalId` | <code>string</code> | Yes | The unique identifier of the journal. |
| `journalLineId` | <code>string</code> | Yes | The unique identifier of the journal line. |
| `attachmentsParentId` | <code>string</code> | Yes | The parent id of the attachments. |
| `attachmentsId` | <code>string</code> | Yes | The unique identifier of the attachments. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bcClient->deleteAttachmentForJournalLineForJournal("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updateAttachmentForJournalLineForJournal</summary>

<div>

Updates an attachment for a journal line of a journal.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `journalId` | <code>string</code> | Yes | The unique identifier of the journal. |
| `journalLineId` | <code>string</code> | Yes | The unique identifier of the journal line. |
| `attachmentsParentId` | <code>string</code> | Yes | The parent id of the attachments. |
| `attachmentsId` | <code>string</code> | Yes | The unique identifier of the attachments. |
| `headers` | <code>UpdateAttachmentForJournalLineForJournalHeaders</code> | Yes | Request headers, including the required `ifMatch`. |
| `payload` | <code>AttachmentRequest</code> | Yes | The attachments to create or update. |

**Returns:** `Attachment|error`

**Sample code:**

```ballerina
bc:Attachment result = check bcClient->updateAttachmentForJournalLineForJournal("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {ifMatch: "string"}, {
    fileName: "import.csv",
    lastModifiedDateTime: "2026-01-15T00:00:00",
    byteSize: 1,
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "fileName": "import.csv",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "byteSize": 1,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "parentId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "content": {
    "fileContent": "string",
    "fileName": "import.csv"
  }
}
```

</div>
</details>

#### Journal Lines

<details>
<summary>listJournalLines</summary>

<div>

Returns a list of journal lines.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | The number of entities to skip before returning the results. |
| `top` | <code>int</code> | No | The maximum number of entities to return. |
| `filter` | <code>string</code> | No | An OData filter expression that restricts the entities returned. |
| `'limit` | <code>int</code> | No | The maximum number of entities to return in the page. |
| `expand` | <code>("attachments"&#124;"account")[]</code> | No | The related entities to include in the response. |
| `'select` | <code>("id"&#124;"journalDisplayName"&#124;"lineNumber"&#124;"accountType"&#124;"accountId"&#124;"accountNumber"&#124;"postingDate"&#124;"documentNumber"&#124;"externalDocumentNumber"&#124;"amount"&#124;"description"&#124;"comment"&#124;"dimensions"&#124;"lastModifiedDateTime")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `JournalLineCollection|error`

**Sample code:**

```ballerina
bc:JournalLineCollection result = check bcClient->listJournalLines("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "value": [
    {
      "amount": 100.00,
      "lastModifiedDateTime": "2026-01-15T00:00:00",
      "documentNumber": "INV-0001"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createJournalLine</summary>

<div>

Creates a journal line.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `payload` | <code>JournalLineRequest</code> | Yes | The journal line to create or update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `JournalLine|error`

**Sample code:**

```ballerina
bc:JournalLine result = check bcClient->createJournalLine("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    amount: 100.00,
    lastModifiedDateTime: "2026-01-15T00:00:00",
    documentNumber: "INV-0001",
    accountType: "string"
});
```

**Sample response:**

```json
{
  "amount": 100.00,
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "attachments": [
    {
      "fileName": "import.csv",
      "lastModifiedDateTime": "2026-01-15T00:00:00",
      "byteSize": 1
    }
  ],
  "documentNumber": "INV-0001",
  "accountType": "string",
  "description": "Sample description"
}
```

</div>
</details>

<details>
<summary>getJournalLine</summary>

<div>

Returns a journal line.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `journalLineId` | <code>string</code> | Yes | The unique identifier of the journal line. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>("attachments"&#124;"account")[]</code> | No | The related entities to include in the response. |
| `'select` | <code>("id"&#124;"journalDisplayName"&#124;"lineNumber"&#124;"accountType"&#124;"accountId"&#124;"accountNumber"&#124;"postingDate"&#124;"documentNumber"&#124;"externalDocumentNumber"&#124;"amount"&#124;"description"&#124;"comment"&#124;"dimensions"&#124;"lastModifiedDateTime")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `JournalLine|error`

**Sample code:**

```ballerina
bc:JournalLine result = check bcClient->getJournalLine("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "amount": 100.00,
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "attachments": [
    {
      "fileName": "import.csv",
      "lastModifiedDateTime": "2026-01-15T00:00:00",
      "byteSize": 1
    }
  ],
  "documentNumber": "INV-0001",
  "accountType": "string",
  "description": "Sample description"
}
```

</div>
</details>

<details>
<summary>deleteJournalLine</summary>

<div>

Deletes a journal line.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `journalLineId` | <code>string</code> | Yes | The unique identifier of the journal line. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bcClient->deleteJournalLine("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updateJournalLine</summary>

<div>

Updates a journal line.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `journalLineId` | <code>string</code> | Yes | The unique identifier of the journal line. |
| `headers` | <code>UpdateJournalLineHeaders</code> | Yes | Request headers, including the required `ifMatch`. |
| `payload` | <code>JournalLineRequest</code> | Yes | The journal line to create or update. |

**Returns:** `JournalLine|error`

**Sample code:**

```ballerina
bc:JournalLine result = check bcClient->updateJournalLine("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {ifMatch: "string"}, {
    amount: 100.00,
    lastModifiedDateTime: "2026-01-15T00:00:00",
    documentNumber: "INV-0001",
    accountType: "string"
});
```

**Sample response:**

```json
{
  "amount": 100.00,
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "attachments": [
    {
      "fileName": "import.csv",
      "lastModifiedDateTime": "2026-01-15T00:00:00",
      "byteSize": 1
    }
  ],
  "documentNumber": "INV-0001",
  "accountType": "string",
  "description": "Sample description"
}
```

</div>
</details>

<details>
<summary>listAttachmentsForJournalLine</summary>

<div>

Returns a list of attachments for a journal line.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `journalLineId` | <code>string</code> | Yes | The unique identifier of the journal line. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | The number of entities to skip before returning the results. |
| `top` | <code>int</code> | No | The maximum number of entities to return. |
| `filter` | <code>string</code> | No | An OData filter expression that restricts the entities returned. |
| `'limit` | <code>int</code> | No | The maximum number of entities to return in the page. |
| `'select` | <code>("parentId"&#124;"id"&#124;"fileName"&#124;"byteSize"&#124;"content"&#124;"lastModifiedDateTime")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `AttachmentCollection|error`

**Sample code:**

```ballerina
bc:AttachmentCollection result = check bcClient->listAttachmentsForJournalLine("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "value": [
    {
      "fileName": "import.csv",
      "lastModifiedDateTime": "2026-01-15T00:00:00",
      "byteSize": 1
    }
  ]
}
```

</div>
</details>

<details>
<summary>createAttachmentForJournalLine</summary>

<div>

Creates an attachment for a journal line.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `journalLineId` | <code>string</code> | Yes | The unique identifier of the journal line. |
| `payload` | <code>AttachmentRequest</code> | Yes | The attachments to create or update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Attachment|error`

**Sample code:**

```ballerina
bc:Attachment result = check bcClient->createAttachmentForJournalLine("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    fileName: "import.csv",
    lastModifiedDateTime: "2026-01-15T00:00:00",
    byteSize: 1,
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "fileName": "import.csv",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "byteSize": 1,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "parentId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "content": {
    "fileContent": "string",
    "fileName": "import.csv"
  }
}
```

</div>
</details>

<details>
<summary>getAttachmentForJournalLine</summary>

<div>

Returns an attachment for a journal line.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `journalLineId` | <code>string</code> | Yes | The unique identifier of the journal line. |
| `attachmentsParentId` | <code>string</code> | Yes | The parent id of the attachments. |
| `attachmentsId` | <code>string</code> | Yes | The unique identifier of the attachments. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `'select` | <code>("parentId"&#124;"id"&#124;"fileName"&#124;"byteSize"&#124;"content"&#124;"lastModifiedDateTime")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `Attachment|error`

**Sample code:**

```ballerina
bc:Attachment result = check bcClient->getAttachmentForJournalLine("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "fileName": "import.csv",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "byteSize": 1,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "parentId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "content": {
    "fileContent": "string",
    "fileName": "import.csv"
  }
}
```

</div>
</details>

<details>
<summary>deleteAttachmentForJournalLine</summary>

<div>

Deletes an attachment for a journal line.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `journalLineId` | <code>string</code> | Yes | The unique identifier of the journal line. |
| `attachmentsParentId` | <code>string</code> | Yes | The parent id of the attachments. |
| `attachmentsId` | <code>string</code> | Yes | The unique identifier of the attachments. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bcClient->deleteAttachmentForJournalLine("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updateAttachmentForJournalLine</summary>

<div>

Updates an attachment for a journal line.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `journalLineId` | <code>string</code> | Yes | The unique identifier of the journal line. |
| `attachmentsParentId` | <code>string</code> | Yes | The parent id of the attachments. |
| `attachmentsId` | <code>string</code> | Yes | The unique identifier of the attachments. |
| `headers` | <code>UpdateAttachmentForJournalLineHeaders</code> | Yes | Request headers, including the required `ifMatch`. |
| `payload` | <code>AttachmentRequest</code> | Yes | The attachments to create or update. |

**Returns:** `Attachment|error`

**Sample code:**

```ballerina
bc:Attachment result = check bcClient->updateAttachmentForJournalLine("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {ifMatch: "string"}, {
    fileName: "import.csv",
    lastModifiedDateTime: "2026-01-15T00:00:00",
    byteSize: 1,
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "fileName": "import.csv",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "byteSize": 1,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "parentId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "content": {
    "fileContent": "string",
    "fileName": "import.csv"
  }
}
```

</div>
</details>

#### Attachments

<details>
<summary>listAttachments</summary>

<div>

Returns a list of attachments.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | The number of entities to skip before returning the results. |
| `top` | <code>int</code> | No | The maximum number of entities to return. |
| `filter` | <code>string</code> | No | An OData filter expression that restricts the entities returned. |
| `'limit` | <code>int</code> | No | The maximum number of entities to return in the page. |
| `'select` | <code>("parentId"&#124;"id"&#124;"fileName"&#124;"byteSize"&#124;"content"&#124;"lastModifiedDateTime")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `AttachmentCollection|error`

**Sample code:**

```ballerina
bc:AttachmentCollection result = check bcClient->listAttachments("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "value": [
    {
      "fileName": "import.csv",
      "lastModifiedDateTime": "2026-01-15T00:00:00",
      "byteSize": 1
    }
  ]
}
```

</div>
</details>

<details>
<summary>createAttachment</summary>

<div>

Creates an attachment.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `payload` | <code>AttachmentRequest</code> | Yes | The attachments to create or update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Attachment|error`

**Sample code:**

```ballerina
bc:Attachment result = check bcClient->createAttachment("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    fileName: "import.csv",
    lastModifiedDateTime: "2026-01-15T00:00:00",
    byteSize: 1,
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "fileName": "import.csv",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "byteSize": 1,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "parentId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "content": {
    "fileContent": "string",
    "fileName": "import.csv"
  }
}
```

</div>
</details>

<details>
<summary>getAttachment</summary>

<div>

Returns an attachment.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `attachmentsParentId` | <code>string</code> | Yes | The parent id of the attachments. |
| `attachmentsId` | <code>string</code> | Yes | The unique identifier of the attachments. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `'select` | <code>("parentId"&#124;"id"&#124;"fileName"&#124;"byteSize"&#124;"content"&#124;"lastModifiedDateTime")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `Attachment|error`

**Sample code:**

```ballerina
bc:Attachment result = check bcClient->getAttachment("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "fileName": "import.csv",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "byteSize": 1,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "parentId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "content": {
    "fileContent": "string",
    "fileName": "import.csv"
  }
}
```

</div>
</details>

<details>
<summary>deleteAttachment</summary>

<div>

Deletes an attachment.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `attachmentsParentId` | <code>string</code> | Yes | The parent id of the attachments. |
| `attachmentsId` | <code>string</code> | Yes | The unique identifier of the attachments. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bcClient->deleteAttachment("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updateAttachment</summary>

<div>

Updates an attachment.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `attachmentsParentId` | <code>string</code> | Yes | The parent id of the attachments. |
| `attachmentsId` | <code>string</code> | Yes | The unique identifier of the attachments. |
| `headers` | <code>UpdateAttachmentHeaders</code> | Yes | Request headers, including the required `ifMatch`. |
| `payload` | <code>AttachmentRequest</code> | Yes | The attachments to create or update. |

**Returns:** `Attachment|error`

**Sample code:**

```ballerina
bc:Attachment result = check bcClient->updateAttachment("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {ifMatch: "string"}, {
    fileName: "import.csv",
    lastModifiedDateTime: "2026-01-15T00:00:00",
    byteSize: 1,
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "fileName": "import.csv",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "byteSize": 1,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "parentId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "content": {
    "fileContent": "string",
    "fileName": "import.csv"
  }
}
```

</div>
</details>

#### Employees

<details>
<summary>listEmployees</summary>

<div>

Returns a list of employees.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | The number of entities to skip before returning the results. |
| `top` | <code>int</code> | No | The maximum number of entities to return. |
| `filter` | <code>string</code> | No | An OData filter expression that restricts the entities returned. |
| `'limit` | <code>int</code> | No | The maximum number of entities to return in the page. |
| `expand` | <code>("picture"&#124;"defaultDimensions"&#124;"timeRegistrationEntries")[]</code> | No | The related entities to include in the response. |
| `'select` | <code>("id"&#124;"number"&#124;"displayName"&#124;"givenName"&#124;"middleName"&#124;"surname"&#124;"jobTitle"&#124;"address"&#124;"phoneNumber"&#124;"mobilePhone"&#124;"email"&#124;"personalEmail"&#124;"employmentDate"&#124;"terminationDate"&#124;"status"&#124;"birthDate"&#124;"statisticsGroupCode"&#124;"lastModifiedDateTime")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `EmployeeCollection|error`

**Sample code:**

```ballerina
bc:EmployeeCollection result = check bcClient->listEmployees("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "value": [
    {
      "statisticsGroupCode": "200",
      "lastModifiedDateTime": "2026-01-15T00:00:00",
      "displayName": "Sample name"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createEmployee</summary>

<div>

Creates an employee.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `payload` | <code>EmployeeRequest</code> | Yes | The employee to create or update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Employee|error`

**Sample code:**

```ballerina
bc:Employee result = check bcClient->createEmployee("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    address: {
        city: "string",
        street: "string",
        countryLetterCode: "200"
    },
    statisticsGroupCode: "200",
    lastModifiedDateTime: "2026-01-15T00:00:00",
    displayName: "Sample name"
});
```

**Sample response:**

```json
{
  "address": {
    "city": "string",
    "street": "string",
    "countryLetterCode": "200"
  },
  "statisticsGroupCode": "200",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "displayName": "Sample name",
  "employmentDate": "2026-01-15T00:00:00",
  "givenName": "Sample name"
}
```

</div>
</details>

<details>
<summary>getEmployee</summary>

<div>

Returns an employee.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `employeeId` | <code>string</code> | Yes | The unique identifier of the employee. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>("picture"&#124;"defaultDimensions"&#124;"timeRegistrationEntries")[]</code> | No | The related entities to include in the response. |
| `'select` | <code>("id"&#124;"number"&#124;"displayName"&#124;"givenName"&#124;"middleName"&#124;"surname"&#124;"jobTitle"&#124;"address"&#124;"phoneNumber"&#124;"mobilePhone"&#124;"email"&#124;"personalEmail"&#124;"employmentDate"&#124;"terminationDate"&#124;"status"&#124;"birthDate"&#124;"statisticsGroupCode"&#124;"lastModifiedDateTime")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `Employee|error`

**Sample code:**

```ballerina
bc:Employee result = check bcClient->getEmployee("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "address": {
    "city": "string",
    "street": "string",
    "countryLetterCode": "200"
  },
  "statisticsGroupCode": "200",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "displayName": "Sample name",
  "employmentDate": "2026-01-15T00:00:00",
  "givenName": "Sample name"
}
```

</div>
</details>

<details>
<summary>deleteEmployee</summary>

<div>

Deletes an employee.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `employeeId` | <code>string</code> | Yes | The unique identifier of the employee. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bcClient->deleteEmployee("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updateEmployee</summary>

<div>

Updates an employee.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `employeeId` | <code>string</code> | Yes | The unique identifier of the employee. |
| `headers` | <code>UpdateEmployeeHeaders</code> | Yes | Request headers, including the required `ifMatch`. |
| `payload` | <code>EmployeeRequest</code> | Yes | The employee to create or update. |

**Returns:** `Employee|error`

**Sample code:**

```ballerina
bc:Employee result = check bcClient->updateEmployee("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {ifMatch: "string"}, {
    address: {
        city: "string",
        street: "string",
        countryLetterCode: "200"
    },
    statisticsGroupCode: "200",
    lastModifiedDateTime: "2026-01-15T00:00:00",
    displayName: "Sample name"
});
```

**Sample response:**

```json
{
  "address": {
    "city": "string",
    "street": "string",
    "countryLetterCode": "200"
  },
  "statisticsGroupCode": "200",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "displayName": "Sample name",
  "employmentDate": "2026-01-15T00:00:00",
  "givenName": "Sample name"
}
```

</div>
</details>

<details>
<summary>listPicturesForEmployee</summary>

<div>

Returns a list of pictures for an employee.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `employeeId` | <code>string</code> | Yes | The unique identifier of the employee. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | The number of entities to skip before returning the results. |
| `top` | <code>int</code> | No | The maximum number of entities to return. |
| `filter` | <code>string</code> | No | An OData filter expression that restricts the entities returned. |
| `'limit` | <code>int</code> | No | The maximum number of entities to return in the page. |
| `'select` | <code>("id"&#124;"width"&#124;"height"&#124;"contentType"&#124;"content")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `PictureCollection|error`

**Sample code:**

```ballerina
bc:PictureCollection result = check bcClient->listPicturesForEmployee("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "value": [
    {
      "content@odata.mediaEditLink": "string",
      "content@odata.mediaReadLink": "string",
      "width": 1
    }
  ]
}
```

</div>
</details>

<details>
<summary>getPictureForEmployee</summary>

<div>

Returns a picture for an employee.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `employeeId` | <code>string</code> | Yes | The unique identifier of the employee. |
| `pictureId` | <code>string</code> | Yes | The unique identifier of the picture. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `'select` | <code>("id"&#124;"width"&#124;"height"&#124;"contentType"&#124;"content")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `Picture|error`

**Sample code:**

```ballerina
bc:Picture result = check bcClient->getPictureForEmployee("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "content@odata.mediaEditLink": "string",
  "content@odata.mediaReadLink": "string",
  "width": 1,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "contentType": "string",
  "height": 1
}
```

</div>
</details>

<details>
<summary>deletePictureForEmployee</summary>

<div>

Deletes a picture for an employee.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `employeeId` | <code>string</code> | Yes | The unique identifier of the employee. |
| `pictureId` | <code>string</code> | Yes | The unique identifier of the picture. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bcClient->deletePictureForEmployee("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updatePictureForEmployee</summary>

<div>

Updates a picture for an employee.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `employeeId` | <code>string</code> | Yes | The unique identifier of the employee. |
| `pictureId` | <code>string</code> | Yes | The unique identifier of the picture. |
| `headers` | <code>UpdatePictureForEmployeeHeaders</code> | Yes | Request headers, including the required `ifMatch`. |
| `payload` | <code>PictureRequest</code> | Yes | The picture to create or update. |

**Returns:** `Picture|error`

**Sample code:**

```ballerina
bc:Picture result = check bcClient->updatePictureForEmployee("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {ifMatch: "string"}, {
    width: 1,
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    contentType: "string",
    content: {
        fileContent: check io:fileReadBytes("import.csv"),
        fileName: "import.csv"
    }
});
```

**Sample response:**

```json
{
  "content@odata.mediaEditLink": "string",
  "content@odata.mediaReadLink": "string",
  "width": 1,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "contentType": "string",
  "height": 1
}
```

</div>
</details>

<details>
<summary>listDefaultDimensionsForEmployee</summary>

<div>

Returns a list of default dimensions for an employee.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `employeeId` | <code>string</code> | Yes | The unique identifier of the employee. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | The number of entities to skip before returning the results. |
| `top` | <code>int</code> | No | The maximum number of entities to return. |
| `filter` | <code>string</code> | No | An OData filter expression that restricts the entities returned. |
| `'limit` | <code>int</code> | No | The maximum number of entities to return in the page. |
| `expand` | <code>("account"&#124;"dimension"&#124;"dimensionValue")[]</code> | No | The related entities to include in the response. |
| `'select` | <code>("parentId"&#124;"dimensionId"&#124;"dimensionCode"&#124;"dimensionValueId"&#124;"dimensionValueCode"&#124;"postingValidation")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `DefaultDimensionsCollection|error`

**Sample code:**

```ballerina
bc:DefaultDimensionsCollection result = check bcClient->listDefaultDimensionsForEmployee("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "value": [
    {
      "dimensionValueCode": "200",
      "dimensionId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "dimensionValueId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createDefaultDimensionsForEmployee</summary>

<div>

Creates a default dimension for an employee.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `employeeId` | <code>string</code> | Yes | The unique identifier of the employee. |
| `payload` | <code>DefaultDimensionsRequest</code> | Yes | The default dimensions to create or update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `DefaultDimensions|error`

**Sample code:**

```ballerina
bc:DefaultDimensions result = check bcClient->createDefaultDimensionsForEmployee("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    dimensionValueCode: "200",
    dimensionId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    dimensionValueId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    dimensionCode: "200"
});
```

**Sample response:**

```json
{
  "dimensionValueCode": "200",
  "dimensionValue": {
    "code": "200",
    "lastModifiedDateTime": "2026-01-15T00:00:00",
    "displayName": "Sample name"
  },
  "dimensionId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "dimensionValueId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "dimensionCode": "200",
  "postingValidation": "string"
}
```

</div>
</details>

<details>
<summary>getDefaultDimensionsForEmployee</summary>

<div>

Returns a default dimension for an employee.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `employeeId` | <code>string</code> | Yes | The unique identifier of the employee. |
| `defaultDimensionsParentId` | <code>string</code> | Yes | The parent id of the default dimensions. |
| `defaultDimensionsDimensionId` | <code>string</code> | Yes | The dimension id of the default dimensions. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>("account"&#124;"dimension"&#124;"dimensionValue")[]</code> | No | The related entities to include in the response. |
| `'select` | <code>("parentId"&#124;"dimensionId"&#124;"dimensionCode"&#124;"dimensionValueId"&#124;"dimensionValueCode"&#124;"postingValidation")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `DefaultDimensions|error`

**Sample code:**

```ballerina
bc:DefaultDimensions result = check bcClient->getDefaultDimensionsForEmployee("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "dimensionValueCode": "200",
  "dimensionValue": {
    "code": "200",
    "lastModifiedDateTime": "2026-01-15T00:00:00",
    "displayName": "Sample name"
  },
  "dimensionId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "dimensionValueId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "dimensionCode": "200",
  "postingValidation": "string"
}
```

</div>
</details>

<details>
<summary>deleteDefaultDimensionsForEmployee</summary>

<div>

Deletes a default dimension for an employee.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `employeeId` | <code>string</code> | Yes | The unique identifier of the employee. |
| `defaultDimensionsParentId` | <code>string</code> | Yes | The parent id of the default dimensions. |
| `defaultDimensionsDimensionId` | <code>string</code> | Yes | The dimension id of the default dimensions. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bcClient->deleteDefaultDimensionsForEmployee("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updateDefaultDimensionsForEmployee</summary>

<div>

Updates a default dimension for an employee.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `employeeId` | <code>string</code> | Yes | The unique identifier of the employee. |
| `defaultDimensionsParentId` | <code>string</code> | Yes | The parent id of the default dimensions. |
| `defaultDimensionsDimensionId` | <code>string</code> | Yes | The dimension id of the default dimensions. |
| `headers` | <code>UpdateDefaultDimensionsForEmployeeHeaders</code> | Yes | Request headers, including the required `ifMatch`. |
| `payload` | <code>DefaultDimensionsRequest</code> | Yes | The default dimensions to create or update. |

**Returns:** `DefaultDimensions|error`

**Sample code:**

```ballerina
bc:DefaultDimensions result = check bcClient->updateDefaultDimensionsForEmployee("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {ifMatch: "string"}, {
    dimensionValueCode: "200",
    dimensionId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    dimensionValueId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    dimensionCode: "200"
});
```

**Sample response:**

```json
{
  "dimensionValueCode": "200",
  "dimensionValue": {
    "code": "200",
    "lastModifiedDateTime": "2026-01-15T00:00:00",
    "displayName": "Sample name"
  },
  "dimensionId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "dimensionValueId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "dimensionCode": "200",
  "postingValidation": "string"
}
```

</div>
</details>

<details>
<summary>listTimeRegistrationEntriesForEmployee</summary>

<div>

Returns a list of time registration entries for an employee.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `employeeId` | <code>string</code> | Yes | The unique identifier of the employee. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | The number of entities to skip before returning the results. |
| `top` | <code>int</code> | No | The maximum number of entities to return. |
| `filter` | <code>string</code> | No | An OData filter expression that restricts the entities returned. |
| `'limit` | <code>int</code> | No | The maximum number of entities to return in the page. |
| `expand` | <code>("project")[]</code> | No | The related entities to include in the response. |
| `'select` | <code>("id"&#124;"employeeId"&#124;"employeeNumber"&#124;"jobId"&#124;"jobNumber"&#124;"absence"&#124;"lineNumber"&#124;"date"&#124;"quantity"&#124;"status"&#124;"unitOfMeasureId"&#124;"unitOfMeasure"&#124;"dimensions"&#124;"lastModfiedDateTime")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `TimeRegistrationEntryCollection|error`

**Sample code:**

```ballerina
bc:TimeRegistrationEntryCollection result = check bcClient->listTimeRegistrationEntriesForEmployee("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "value": [
    {
      "date": "2026-01-15T00:00:00",
      "quantity": 100.00,
      "absence": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createTimeRegistrationEntryForEmployee</summary>

<div>

Creates a time registration entry for an employee.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `employeeId` | <code>string</code> | Yes | The unique identifier of the employee. |
| `payload` | <code>TimeRegistrationEntryRequest</code> | Yes | The time registration entry to create or update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TimeRegistrationEntry|error`

**Sample code:**

```ballerina
bc:TimeRegistrationEntry result = check bcClient->createTimeRegistrationEntryForEmployee("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    date: "2026-01-15T00:00:00",
    quantity: 100.00,
    unitOfMeasure: {
        symbol: "string",
        code: "200",
        displayName: "Sample name"
    },
    absence: "string"
});
```

**Sample response:**

```json
{
  "date": "2026-01-15T00:00:00",
  "quantity": 100.00,
  "unitOfMeasure": {
    "symbol": "string",
    "code": "200",
    "displayName": "Sample name"
  },
  "absence": "string",
  "project": {
    "number": "INV-0001",
    "displayName": "Sample name",
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  },
  "employeeId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>getTimeRegistrationEntryForEmployee</summary>

<div>

Returns a time registration entry for an employee.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `employeeId` | <code>string</code> | Yes | The unique identifier of the employee. |
| `timeRegistrationEntryId` | <code>string</code> | Yes | The unique identifier of the time registration entry. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>("project")[]</code> | No | The related entities to include in the response. |
| `'select` | <code>("id"&#124;"employeeId"&#124;"employeeNumber"&#124;"jobId"&#124;"jobNumber"&#124;"absence"&#124;"lineNumber"&#124;"date"&#124;"quantity"&#124;"status"&#124;"unitOfMeasureId"&#124;"unitOfMeasure"&#124;"dimensions"&#124;"lastModfiedDateTime")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `TimeRegistrationEntry|error`

**Sample code:**

```ballerina
bc:TimeRegistrationEntry result = check bcClient->getTimeRegistrationEntryForEmployee("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "date": "2026-01-15T00:00:00",
  "quantity": 100.00,
  "unitOfMeasure": {
    "symbol": "string",
    "code": "200",
    "displayName": "Sample name"
  },
  "absence": "string",
  "project": {
    "number": "INV-0001",
    "displayName": "Sample name",
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  },
  "employeeId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>deleteTimeRegistrationEntryForEmployee</summary>

<div>

Deletes a time registration entry for an employee.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `employeeId` | <code>string</code> | Yes | The unique identifier of the employee. |
| `timeRegistrationEntryId` | <code>string</code> | Yes | The unique identifier of the time registration entry. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bcClient->deleteTimeRegistrationEntryForEmployee("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updateTimeRegistrationEntryForEmployee</summary>

<div>

Updates a time registration entry for an employee.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `employeeId` | <code>string</code> | Yes | The unique identifier of the employee. |
| `timeRegistrationEntryId` | <code>string</code> | Yes | The unique identifier of the time registration entry. |
| `headers` | <code>UpdateTimeRegistrationEntryForEmployeeHeaders</code> | Yes | Request headers, including the required `ifMatch`. |
| `payload` | <code>TimeRegistrationEntryRequest</code> | Yes | The time registration entry to create or update. |

**Returns:** `TimeRegistrationEntry|error`

**Sample code:**

```ballerina
bc:TimeRegistrationEntry result = check bcClient->updateTimeRegistrationEntryForEmployee("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {ifMatch: "string"}, {
    date: "2026-01-15T00:00:00",
    quantity: 100.00,
    unitOfMeasure: {
        symbol: "string",
        code: "200",
        displayName: "Sample name"
    },
    absence: "string"
});
```

**Sample response:**

```json
{
  "date": "2026-01-15T00:00:00",
  "quantity": 100.00,
  "unitOfMeasure": {
    "symbol": "string",
    "code": "200",
    "displayName": "Sample name"
  },
  "absence": "string",
  "project": {
    "number": "INV-0001",
    "displayName": "Sample name",
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  },
  "employeeId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

#### Time Registration Entries

<details>
<summary>listTimeRegistrationEntries</summary>

<div>

Returns a list of time registration entries.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | The number of entities to skip before returning the results. |
| `top` | <code>int</code> | No | The maximum number of entities to return. |
| `filter` | <code>string</code> | No | An OData filter expression that restricts the entities returned. |
| `'limit` | <code>int</code> | No | The maximum number of entities to return in the page. |
| `expand` | <code>("project")[]</code> | No | The related entities to include in the response. |
| `'select` | <code>("id"&#124;"employeeId"&#124;"employeeNumber"&#124;"jobId"&#124;"jobNumber"&#124;"absence"&#124;"lineNumber"&#124;"date"&#124;"quantity"&#124;"status"&#124;"unitOfMeasureId"&#124;"unitOfMeasure"&#124;"dimensions"&#124;"lastModfiedDateTime")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `TimeRegistrationEntryCollection|error`

**Sample code:**

```ballerina
bc:TimeRegistrationEntryCollection result = check bcClient->listTimeRegistrationEntries("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "value": [
    {
      "date": "2026-01-15T00:00:00",
      "quantity": 100.00,
      "absence": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createTimeRegistrationEntry</summary>

<div>

Creates a time registration entry.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `payload` | <code>TimeRegistrationEntryRequest</code> | Yes | The time registration entry to create or update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TimeRegistrationEntry|error`

**Sample code:**

```ballerina
bc:TimeRegistrationEntry result = check bcClient->createTimeRegistrationEntry("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    date: "2026-01-15T00:00:00",
    quantity: 100.00,
    unitOfMeasure: {
        symbol: "string",
        code: "200",
        displayName: "Sample name"
    },
    absence: "string"
});
```

**Sample response:**

```json
{
  "date": "2026-01-15T00:00:00",
  "quantity": 100.00,
  "unitOfMeasure": {
    "symbol": "string",
    "code": "200",
    "displayName": "Sample name"
  },
  "absence": "string",
  "project": {
    "number": "INV-0001",
    "displayName": "Sample name",
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  },
  "employeeId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>getTimeRegistrationEntry</summary>

<div>

Returns a time registration entry.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `timeRegistrationEntryId` | <code>string</code> | Yes | The unique identifier of the time registration entry. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>("project")[]</code> | No | The related entities to include in the response. |
| `'select` | <code>("id"&#124;"employeeId"&#124;"employeeNumber"&#124;"jobId"&#124;"jobNumber"&#124;"absence"&#124;"lineNumber"&#124;"date"&#124;"quantity"&#124;"status"&#124;"unitOfMeasureId"&#124;"unitOfMeasure"&#124;"dimensions"&#124;"lastModfiedDateTime")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `TimeRegistrationEntry|error`

**Sample code:**

```ballerina
bc:TimeRegistrationEntry result = check bcClient->getTimeRegistrationEntry("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "date": "2026-01-15T00:00:00",
  "quantity": 100.00,
  "unitOfMeasure": {
    "symbol": "string",
    "code": "200",
    "displayName": "Sample name"
  },
  "absence": "string",
  "project": {
    "number": "INV-0001",
    "displayName": "Sample name",
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  },
  "employeeId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>deleteTimeRegistrationEntry</summary>

<div>

Deletes a time registration entry.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `timeRegistrationEntryId` | <code>string</code> | Yes | The unique identifier of the time registration entry. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bcClient->deleteTimeRegistrationEntry("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updateTimeRegistrationEntry</summary>

<div>

Updates a time registration entry.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `timeRegistrationEntryId` | <code>string</code> | Yes | The unique identifier of the time registration entry. |
| `headers` | <code>UpdateTimeRegistrationEntryHeaders</code> | Yes | Request headers, including the required `ifMatch`. |
| `payload` | <code>TimeRegistrationEntryRequest</code> | Yes | The time registration entry to create or update. |

**Returns:** `TimeRegistrationEntry|error`

**Sample code:**

```ballerina
bc:TimeRegistrationEntry result = check bcClient->updateTimeRegistrationEntry("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {ifMatch: "string"}, {
    date: "2026-01-15T00:00:00",
    quantity: 100.00,
    unitOfMeasure: {
        symbol: "string",
        code: "200",
        displayName: "Sample name"
    },
    absence: "string"
});
```

**Sample response:**

```json
{
  "date": "2026-01-15T00:00:00",
  "quantity": 100.00,
  "unitOfMeasure": {
    "symbol": "string",
    "code": "200",
    "displayName": "Sample name"
  },
  "absence": "string",
  "project": {
    "number": "INV-0001",
    "displayName": "Sample name",
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  },
  "employeeId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

#### General Ledger Entries

<details>
<summary>listGeneralLedgerEntries</summary>

<div>

Returns a list of general ledger entries.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | The number of entities to skip before returning the results. |
| `top` | <code>int</code> | No | The maximum number of entities to return. |
| `filter` | <code>string</code> | No | An OData filter expression that restricts the entities returned. |
| `'limit` | <code>int</code> | No | The maximum number of entities to return in the page. |
| `expand` | <code>("account")[]</code> | No | The related entities to include in the response. |
| `'select` | <code>("id"&#124;"postingDate"&#124;"documentNumber"&#124;"documentType"&#124;"accountId"&#124;"accountNumber"&#124;"description"&#124;"debitAmount"&#124;"creditAmount"&#124;"dimensions"&#124;"lastModifiedDateTime")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `GeneralLedgerEntryCollection|error`

**Sample code:**

```ballerina
bc:GeneralLedgerEntryCollection result = check bcClient->listGeneralLedgerEntries("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "value": [
    {
      "accountId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "lastModifiedDateTime": "2026-01-15T00:00:00",
      "documentType": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getGeneralLedgerEntry</summary>

<div>

Returns a general ledger entry.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `generalLedgerEntryId` | <code>int:Signed32</code> | Yes | The unique identifier of the general ledger entry. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>("account")[]</code> | No | The related entities to include in the response. |
| `'select` | <code>("id"&#124;"postingDate"&#124;"documentNumber"&#124;"documentType"&#124;"accountId"&#124;"accountNumber"&#124;"description"&#124;"debitAmount"&#124;"creditAmount"&#124;"dimensions"&#124;"lastModifiedDateTime")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `GeneralLedgerEntry|error`

**Sample code:**

```ballerina
bc:GeneralLedgerEntry result = check bcClient->getGeneralLedgerEntry("3fa85f64-5717-4562-b3fc-2c963f66afa6", 1);
```

**Sample response:**

```json
{
  "accountId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "documentType": "string",
  "documentNumber": "INV-0001",
  "description": "Sample description",
  "id": 1
}
```

</div>
</details>

#### Currencies

<details>
<summary>listCurrencies</summary>

<div>

Returns a list of currencies.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | The number of entities to skip before returning the results. |
| `top` | <code>int</code> | No | The maximum number of entities to return. |
| `filter` | <code>string</code> | No | An OData filter expression that restricts the entities returned. |
| `'limit` | <code>int</code> | No | The maximum number of entities to return in the page. |
| `'select` | <code>("id"&#124;"code"&#124;"displayName"&#124;"symbol"&#124;"amountDecimalPlaces"&#124;"amountRoundingPrecision"&#124;"lastModifiedDateTime")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `CurrencyCollection|error`

**Sample code:**

```ballerina
bc:CurrencyCollection result = check bcClient->listCurrencies("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "value": [
    {
      "symbol": "string",
      "code": "200",
      "lastModifiedDateTime": "2026-01-15T00:00:00"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createCurrency</summary>

<div>

Creates a currency.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `payload` | <code>CurrencyRequest</code> | Yes | The currency to create or update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Currency|error`

**Sample code:**

```ballerina
bc:Currency result = check bcClient->createCurrency("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    symbol: "string",
    code: "200",
    lastModifiedDateTime: "2026-01-15T00:00:00",
    displayName: "Sample name"
});
```

**Sample response:**

```json
{
  "symbol": "string",
  "code": "200",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "displayName": "Sample name",
  "amountDecimalPlaces": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>getCurrency</summary>

<div>

Returns a currency.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `currencyId` | <code>string</code> | Yes | The unique identifier of the currency. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `'select` | <code>("id"&#124;"code"&#124;"displayName"&#124;"symbol"&#124;"amountDecimalPlaces"&#124;"amountRoundingPrecision"&#124;"lastModifiedDateTime")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `Currency|error`

**Sample code:**

```ballerina
bc:Currency result = check bcClient->getCurrency("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "symbol": "string",
  "code": "200",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "displayName": "Sample name",
  "amountDecimalPlaces": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>deleteCurrency</summary>

<div>

Deletes a currency.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `currencyId` | <code>string</code> | Yes | The unique identifier of the currency. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bcClient->deleteCurrency("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updateCurrency</summary>

<div>

Updates a currency.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `currencyId` | <code>string</code> | Yes | The unique identifier of the currency. |
| `headers` | <code>UpdateCurrencyHeaders</code> | Yes | Request headers, including the required `ifMatch`. |
| `payload` | <code>CurrencyRequest</code> | Yes | The currency to create or update. |

**Returns:** `Currency|error`

**Sample code:**

```ballerina
bc:Currency result = check bcClient->updateCurrency("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {ifMatch: "string"}, {
    symbol: "string",
    code: "200",
    lastModifiedDateTime: "2026-01-15T00:00:00",
    displayName: "Sample name"
});
```

**Sample response:**

```json
{
  "symbol": "string",
  "code": "200",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "displayName": "Sample name",
  "amountDecimalPlaces": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

#### Payment Methods

<details>
<summary>listPaymentMethods</summary>

<div>

Returns a list of payment methods.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | The number of entities to skip before returning the results. |
| `top` | <code>int</code> | No | The maximum number of entities to return. |
| `filter` | <code>string</code> | No | An OData filter expression that restricts the entities returned. |
| `'limit` | <code>int</code> | No | The maximum number of entities to return in the page. |
| `'select` | <code>("id"&#124;"code"&#124;"displayName"&#124;"lastModifiedDateTime")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `PaymentMethodCollection|error`

**Sample code:**

```ballerina
bc:PaymentMethodCollection result = check bcClient->listPaymentMethods("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "value": [
    {
      "code": "200",
      "lastModifiedDateTime": "2026-01-15T00:00:00",
      "displayName": "Sample name"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createPaymentMethod</summary>

<div>

Creates a payment method.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `payload` | <code>PaymentMethodRequest</code> | Yes | The payment method to create or update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PaymentMethod|error`

**Sample code:**

```ballerina
bc:PaymentMethod result = check bcClient->createPaymentMethod("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    code: "200",
    lastModifiedDateTime: "2026-01-15T00:00:00",
    displayName: "Sample name",
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "code": "200",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "displayName": "Sample name",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>getPaymentMethod</summary>

<div>

Returns a payment method.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `paymentMethodId` | <code>string</code> | Yes | The unique identifier of the payment method. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `'select` | <code>("id"&#124;"code"&#124;"displayName"&#124;"lastModifiedDateTime")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `PaymentMethod|error`

**Sample code:**

```ballerina
bc:PaymentMethod result = check bcClient->getPaymentMethod("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "code": "200",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "displayName": "Sample name",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>deletePaymentMethod</summary>

<div>

Deletes a payment method.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `paymentMethodId` | <code>string</code> | Yes | The unique identifier of the payment method. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bcClient->deletePaymentMethod("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updatePaymentMethod</summary>

<div>

Updates a payment method.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `paymentMethodId` | <code>string</code> | Yes | The unique identifier of the payment method. |
| `headers` | <code>UpdatePaymentMethodHeaders</code> | Yes | Request headers, including the required `ifMatch`. |
| `payload` | <code>PaymentMethodRequest</code> | Yes | The payment method to create or update. |

**Returns:** `PaymentMethod|error`

**Sample code:**

```ballerina
bc:PaymentMethod result = check bcClient->updatePaymentMethod("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {ifMatch: "string"}, {
    code: "200",
    lastModifiedDateTime: "2026-01-15T00:00:00",
    displayName: "Sample name",
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "code": "200",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "displayName": "Sample name",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

#### Dimensions

<details>
<summary>listDimensions</summary>

<div>

Returns a list of dimensions.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | The number of entities to skip before returning the results. |
| `top` | <code>int</code> | No | The maximum number of entities to return. |
| `filter` | <code>string</code> | No | An OData filter expression that restricts the entities returned. |
| `'limit` | <code>int</code> | No | The maximum number of entities to return in the page. |
| `expand` | <code>("dimensionValues")[]</code> | No | The related entities to include in the response. |
| `'select` | <code>("id"&#124;"code"&#124;"displayName"&#124;"lastModifiedDateTime")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `DimensionCollection|error`

**Sample code:**

```ballerina
bc:DimensionCollection result = check bcClient->listDimensions("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "value": [
    {
      "code": "200",
      "lastModifiedDateTime": "2026-01-15T00:00:00",
      "displayName": "Sample name"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getDimension</summary>

<div>

Returns a dimension.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `dimensionId` | <code>string</code> | Yes | The unique identifier of the dimension. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>("dimensionValues")[]</code> | No | The related entities to include in the response. |
| `'select` | <code>("id"&#124;"code"&#124;"displayName"&#124;"lastModifiedDateTime")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `Dimension|error`

**Sample code:**

```ballerina
bc:Dimension result = check bcClient->getDimension("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "code": "200",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "dimensionValues": [
    {
      "code": "200",
      "lastModifiedDateTime": "2026-01-15T00:00:00",
      "displayName": "Sample name"
    }
  ],
  "displayName": "Sample name",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>listDimensionValuesForDimension</summary>

<div>

Returns a list of dimension values for a dimension.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `dimensionId` | <code>string</code> | Yes | The unique identifier of the dimension. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | The number of entities to skip before returning the results. |
| `top` | <code>int</code> | No | The maximum number of entities to return. |
| `filter` | <code>string</code> | No | An OData filter expression that restricts the entities returned. |
| `'limit` | <code>int</code> | No | The maximum number of entities to return in the page. |
| `'select` | <code>("id"&#124;"code"&#124;"displayName"&#124;"lastModifiedDateTime")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `DimensionValueCollection|error`

**Sample code:**

```ballerina
bc:DimensionValueCollection result = check bcClient->listDimensionValuesForDimension("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "value": [
    {
      "code": "200",
      "lastModifiedDateTime": "2026-01-15T00:00:00",
      "displayName": "Sample name"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getDimensionValueForDimension</summary>

<div>

Returns a dimension value for a dimension.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `dimensionId` | <code>string</code> | Yes | The unique identifier of the dimension. |
| `dimensionValueId` | <code>string</code> | Yes | The unique identifier of the dimension value. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `'select` | <code>("id"&#124;"code"&#124;"displayName"&#124;"lastModifiedDateTime")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `DimensionValue|error`

**Sample code:**

```ballerina
bc:DimensionValue result = check bcClient->getDimensionValueForDimension("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "code": "200",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "displayName": "Sample name",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

#### Dimension Values

<details>
<summary>listDimensionValues</summary>

<div>

Returns a list of dimension values.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | The number of entities to skip before returning the results. |
| `top` | <code>int</code> | No | The maximum number of entities to return. |
| `filter` | <code>string</code> | No | An OData filter expression that restricts the entities returned. |
| `'limit` | <code>int</code> | No | The maximum number of entities to return in the page. |
| `'select` | <code>("id"&#124;"code"&#124;"displayName"&#124;"lastModifiedDateTime")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `DimensionValueCollection|error`

**Sample code:**

```ballerina
bc:DimensionValueCollection result = check bcClient->listDimensionValues("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "value": [
    {
      "code": "200",
      "lastModifiedDateTime": "2026-01-15T00:00:00",
      "displayName": "Sample name"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getDimensionValue</summary>

<div>

Returns a dimension value.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `dimensionValueId` | <code>string</code> | Yes | The unique identifier of the dimension value. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `'select` | <code>("id"&#124;"code"&#124;"displayName"&#124;"lastModifiedDateTime")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `DimensionValue|error`

**Sample code:**

```ballerina
bc:DimensionValue result = check bcClient->getDimensionValue("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "code": "200",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "displayName": "Sample name",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

#### Dimension Lines

<details>
<summary>listDimensionLines</summary>

<div>

Returns a list of dimension lines.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | The number of entities to skip before returning the results. |
| `top` | <code>int</code> | No | The maximum number of entities to return. |
| `filter` | <code>string</code> | No | An OData filter expression that restricts the entities returned. |
| `'limit` | <code>int</code> | No | The maximum number of entities to return in the page. |
| `expand` | <code>("dimension")[]</code> | No | The related entities to include in the response. |
| `'select` | <code>("parentId"&#124;"id"&#124;"code"&#124;"displayName"&#124;"valueId"&#124;"valueCode"&#124;"valueDisplayName")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `DimensionLineCollection|error`

**Sample code:**

```ballerina
bc:DimensionLineCollection result = check bcClient->listDimensionLines("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "value": [
    {
      "valueId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "valueDisplayName": "Sample name",
      "code": "200"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createDimensionLine</summary>

<div>

Creates a dimension line.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `payload` | <code>DimensionLineRequest</code> | Yes | The dimension line to create or update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `DimensionLine|error`

**Sample code:**

```ballerina
bc:DimensionLine result = check bcClient->createDimensionLine("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    valueId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    valueDisplayName: "Sample name",
    code: "200",
    displayName: "Sample name"
});
```

**Sample response:**

```json
{
  "valueId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "valueDisplayName": "Sample name",
  "code": "200",
  "displayName": "Sample name",
  "valueCode": "200",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>getDimensionLine</summary>

<div>

Returns a dimension line.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `dimensionLineParentId` | <code>string</code> | Yes | The parent id of the dimension line. |
| `dimensionLineId` | <code>string</code> | Yes | The unique identifier of the dimension line. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>("dimension")[]</code> | No | The related entities to include in the response. |
| `'select` | <code>("parentId"&#124;"id"&#124;"code"&#124;"displayName"&#124;"valueId"&#124;"valueCode"&#124;"valueDisplayName")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `DimensionLine|error`

**Sample code:**

```ballerina
bc:DimensionLine result = check bcClient->getDimensionLine("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "valueId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "valueDisplayName": "Sample name",
  "code": "200",
  "displayName": "Sample name",
  "valueCode": "200",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>deleteDimensionLine</summary>

<div>

Deletes a dimension line.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `dimensionLineParentId` | <code>string</code> | Yes | The parent id of the dimension line. |
| `dimensionLineId` | <code>string</code> | Yes | The unique identifier of the dimension line. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bcClient->deleteDimensionLine("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updateDimensionLine</summary>

<div>

Updates a dimension line.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `dimensionLineParentId` | <code>string</code> | Yes | The parent id of the dimension line. |
| `dimensionLineId` | <code>string</code> | Yes | The unique identifier of the dimension line. |
| `headers` | <code>UpdateDimensionLineHeaders</code> | Yes | Request headers, including the required `ifMatch`. |
| `payload` | <code>DimensionLineRequest</code> | Yes | The dimension line to create or update. |

**Returns:** `DimensionLine|error`

**Sample code:**

```ballerina
bc:DimensionLine result = check bcClient->updateDimensionLine("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {ifMatch: "string"}, {
    valueId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    valueDisplayName: "Sample name",
    code: "200",
    displayName: "Sample name"
});
```

**Sample response:**

```json
{
  "valueId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "valueDisplayName": "Sample name",
  "code": "200",
  "displayName": "Sample name",
  "valueCode": "200",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

#### Payment Terms

<details>
<summary>listPaymentTerms</summary>

<div>

Returns a list of payment terms.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | The number of entities to skip before returning the results. |
| `top` | <code>int</code> | No | The maximum number of entities to return. |
| `filter` | <code>string</code> | No | An OData filter expression that restricts the entities returned. |
| `'limit` | <code>int</code> | No | The maximum number of entities to return in the page. |
| `'select` | <code>("id"&#124;"code"&#124;"displayName"&#124;"dueDateCalculation"&#124;"discountDateCalculation"&#124;"discountPercent"&#124;"calculateDiscountOnCreditMemos"&#124;"lastModifiedDateTime")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `PaymentTermCollection|error`

**Sample code:**

```ballerina
bc:PaymentTermCollection result = check bcClient->listPaymentTerms("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "value": [
    {
      "dueDateCalculation": "2026-01-15T00:00:00",
      "code": "200",
      "discountPercent": 100.00
    }
  ]
}
```

</div>
</details>

<details>
<summary>createPaymentTerm</summary>

<div>

Creates a payment term.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `payload` | <code>PaymentTermRequest</code> | Yes | The payment term to create or update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PaymentTerm|error`

**Sample code:**

```ballerina
bc:PaymentTerm result = check bcClient->createPaymentTerm("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    dueDateCalculation: "2026-01-15T00:00:00",
    code: "200",
    discountPercent: 100.00,
    lastModifiedDateTime: "2026-01-15T00:00:00"
});
```

**Sample response:**

```json
{
  "dueDateCalculation": "2026-01-15T00:00:00",
  "code": "200",
  "discountPercent": 100.00,
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "displayName": "Sample name",
  "discountDateCalculation": "2026-01-15T00:00:00"
}
```

</div>
</details>

<details>
<summary>getPaymentTerm</summary>

<div>

Returns a payment term.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `paymentTermId` | <code>string</code> | Yes | The unique identifier of the payment term. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `'select` | <code>("id"&#124;"code"&#124;"displayName"&#124;"dueDateCalculation"&#124;"discountDateCalculation"&#124;"discountPercent"&#124;"calculateDiscountOnCreditMemos"&#124;"lastModifiedDateTime")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `PaymentTerm|error`

**Sample code:**

```ballerina
bc:PaymentTerm result = check bcClient->getPaymentTerm("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "dueDateCalculation": "2026-01-15T00:00:00",
  "code": "200",
  "discountPercent": 100.00,
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "displayName": "Sample name",
  "discountDateCalculation": "2026-01-15T00:00:00"
}
```

</div>
</details>

<details>
<summary>deletePaymentTerm</summary>

<div>

Deletes a payment term.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `paymentTermId` | <code>string</code> | Yes | The unique identifier of the payment term. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bcClient->deletePaymentTerm("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updatePaymentTerm</summary>

<div>

Updates a payment term.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `paymentTermId` | <code>string</code> | Yes | The unique identifier of the payment term. |
| `headers` | <code>UpdatePaymentTermHeaders</code> | Yes | Request headers, including the required `ifMatch`. |
| `payload` | <code>PaymentTermRequest</code> | Yes | The payment term to create or update. |

**Returns:** `PaymentTerm|error`

**Sample code:**

```ballerina
bc:PaymentTerm result = check bcClient->updatePaymentTerm("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {ifMatch: "string"}, {
    dueDateCalculation: "2026-01-15T00:00:00",
    code: "200",
    discountPercent: 100.00,
    lastModifiedDateTime: "2026-01-15T00:00:00"
});
```

**Sample response:**

```json
{
  "dueDateCalculation": "2026-01-15T00:00:00",
  "code": "200",
  "discountPercent": 100.00,
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "displayName": "Sample name",
  "discountDateCalculation": "2026-01-15T00:00:00"
}
```

</div>
</details>

#### Shipment Methods

<details>
<summary>listShipmentMethods</summary>

<div>

Returns a list of shipment methods.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | The number of entities to skip before returning the results. |
| `top` | <code>int</code> | No | The maximum number of entities to return. |
| `filter` | <code>string</code> | No | An OData filter expression that restricts the entities returned. |
| `'limit` | <code>int</code> | No | The maximum number of entities to return in the page. |
| `'select` | <code>("id"&#124;"code"&#124;"displayName"&#124;"lastModifiedDateTime")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `ShipmentMethodCollection|error`

**Sample code:**

```ballerina
bc:ShipmentMethodCollection result = check bcClient->listShipmentMethods("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "value": [
    {
      "code": "200",
      "lastModifiedDateTime": "2026-01-15T00:00:00",
      "displayName": "Sample name"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createShipmentMethod</summary>

<div>

Creates a shipment method.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `payload` | <code>ShipmentMethodRequest</code> | Yes | The shipment method to create or update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ShipmentMethod|error`

**Sample code:**

```ballerina
bc:ShipmentMethod result = check bcClient->createShipmentMethod("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    code: "200",
    lastModifiedDateTime: "2026-01-15T00:00:00",
    displayName: "Sample name",
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "code": "200",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "displayName": "Sample name",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>getShipmentMethod</summary>

<div>

Returns a shipment method.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `shipmentMethodId` | <code>string</code> | Yes | The unique identifier of the shipment method. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `'select` | <code>("id"&#124;"code"&#124;"displayName"&#124;"lastModifiedDateTime")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `ShipmentMethod|error`

**Sample code:**

```ballerina
bc:ShipmentMethod result = check bcClient->getShipmentMethod("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "code": "200",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "displayName": "Sample name",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>deleteShipmentMethod</summary>

<div>

Deletes a shipment method.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `shipmentMethodId` | <code>string</code> | Yes | The unique identifier of the shipment method. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bcClient->deleteShipmentMethod("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updateShipmentMethod</summary>

<div>

Updates a shipment method.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `shipmentMethodId` | <code>string</code> | Yes | The unique identifier of the shipment method. |
| `headers` | <code>UpdateShipmentMethodHeaders</code> | Yes | Request headers, including the required `ifMatch`. |
| `payload` | <code>ShipmentMethodRequest</code> | Yes | The shipment method to create or update. |

**Returns:** `ShipmentMethod|error`

**Sample code:**

```ballerina
bc:ShipmentMethod result = check bcClient->updateShipmentMethod("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {ifMatch: "string"}, {
    code: "200",
    lastModifiedDateTime: "2026-01-15T00:00:00",
    displayName: "Sample name",
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "code": "200",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "displayName": "Sample name",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

#### Item Categories

<details>
<summary>listItemCategories</summary>

<div>

Returns a list of item categories.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | The number of entities to skip before returning the results. |
| `top` | <code>int</code> | No | The maximum number of entities to return. |
| `filter` | <code>string</code> | No | An OData filter expression that restricts the entities returned. |
| `'limit` | <code>int</code> | No | The maximum number of entities to return in the page. |
| `'select` | <code>("id"&#124;"code"&#124;"displayName"&#124;"lastModifiedDateTime")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `ItemCategoryCollection|error`

**Sample code:**

```ballerina
bc:ItemCategoryCollection result = check bcClient->listItemCategories("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "value": [
    {
      "code": "200",
      "lastModifiedDateTime": "2026-01-15T00:00:00",
      "displayName": "Sample name"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createItemCategory</summary>

<div>

Creates an item category.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `payload` | <code>ItemCategoryRequest</code> | Yes | The item category to create or update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ItemCategory|error`

**Sample code:**

```ballerina
bc:ItemCategory result = check bcClient->createItemCategory("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    code: "200",
    lastModifiedDateTime: "2026-01-15T00:00:00",
    displayName: "Sample name",
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "code": "200",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "displayName": "Sample name",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>getItemCategory</summary>

<div>

Returns an item category.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `itemCategoryId` | <code>string</code> | Yes | The unique identifier of the item category. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `'select` | <code>("id"&#124;"code"&#124;"displayName"&#124;"lastModifiedDateTime")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `ItemCategory|error`

**Sample code:**

```ballerina
bc:ItemCategory result = check bcClient->getItemCategory("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "code": "200",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "displayName": "Sample name",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>deleteItemCategory</summary>

<div>

Deletes an item category.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `itemCategoryId` | <code>string</code> | Yes | The unique identifier of the item category. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bcClient->deleteItemCategory("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updateItemCategory</summary>

<div>

Updates an item category.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `itemCategoryId` | <code>string</code> | Yes | The unique identifier of the item category. |
| `headers` | <code>UpdateItemCategoryHeaders</code> | Yes | Request headers, including the required `ifMatch`. |
| `payload` | <code>ItemCategoryRequest</code> | Yes | The item category to create or update. |

**Returns:** `ItemCategory|error`

**Sample code:**

```ballerina
bc:ItemCategory result = check bcClient->updateItemCategory("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {ifMatch: "string"}, {
    code: "200",
    lastModifiedDateTime: "2026-01-15T00:00:00",
    displayName: "Sample name",
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "code": "200",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "displayName": "Sample name",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

#### Cash Flow Statement

<details>
<summary>listCashFlowStatementLines</summary>

<div>

Returns a list of cash flow statement lines.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | The number of entities to skip before returning the results. |
| `top` | <code>int</code> | No | The maximum number of entities to return. |
| `filter` | <code>string</code> | No | An OData filter expression that restricts the entities returned. |
| `'limit` | <code>int</code> | No | The maximum number of entities to return in the page. |
| `'select` | <code>("lineNumber"&#124;"display"&#124;"netChange"&#124;"lineType"&#124;"indentation"&#124;"dateFilter")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `CashFlowStatementCollection|error`

**Sample code:**

```ballerina
bc:CashFlowStatementCollection result = check bcClient->listCashFlowStatementLines("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "value": [
    {
      "netChange": 100.00,
      "indentation": 1,
      "display": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getCashFlowStatementLine</summary>

<div>

Returns a cash flow statement line.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `cashFlowStatementLineNumber` | <code>int:Signed32</code> | Yes | The line number of the cash flow statement. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `'select` | <code>("lineNumber"&#124;"display"&#124;"netChange"&#124;"lineType"&#124;"indentation"&#124;"dateFilter")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `CashFlowStatement|error`

**Sample code:**

```ballerina
bc:CashFlowStatement result = check bcClient->getCashFlowStatementLine("3fa85f64-5717-4562-b3fc-2c963f66afa6", 1);
```

**Sample response:**

```json
{
  "netChange": 100.00,
  "indentation": 1,
  "display": "string",
  "lineType": "string",
  "lineNumber": 1,
  "dateFilter": "2026-01-15T00:00:00"
}
```

</div>
</details>

#### Countries Regions

<details>
<summary>listCountriesRegions</summary>

<div>

Returns a list of countries/regions.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | The number of entities to skip before returning the results. |
| `top` | <code>int</code> | No | The maximum number of entities to return. |
| `filter` | <code>string</code> | No | An OData filter expression that restricts the entities returned. |
| `'limit` | <code>int</code> | No | The maximum number of entities to return in the page. |
| `'select` | <code>("id"&#124;"code"&#124;"displayName"&#124;"addressFormat"&#124;"lastModifiedDateTime")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `CountryRegionCollection|error`

**Sample code:**

```ballerina
bc:CountryRegionCollection result = check bcClient->listCountriesRegions("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "value": [
    {
      "code": "200",
      "lastModifiedDateTime": "2026-01-15T00:00:00",
      "displayName": "Sample name"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createCountryRegion</summary>

<div>

Creates a country/region.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `payload` | <code>CountryRegionRequest</code> | Yes | The country region to create or update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CountryRegion|error`

**Sample code:**

```ballerina
bc:CountryRegion result = check bcClient->createCountryRegion("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    code: "200",
    lastModifiedDateTime: "2026-01-15T00:00:00",
    displayName: "Sample name",
    addressFormat: "string"
});
```

**Sample response:**

```json
{
  "code": "200",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "displayName": "Sample name",
  "addressFormat": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>getCountryRegion</summary>

<div>

Returns a country/region.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `countryRegionId` | <code>string</code> | Yes | The unique identifier of the country region. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `'select` | <code>("id"&#124;"code"&#124;"displayName"&#124;"addressFormat"&#124;"lastModifiedDateTime")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `CountryRegion|error`

**Sample code:**

```ballerina
bc:CountryRegion result = check bcClient->getCountryRegion("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "code": "200",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "displayName": "Sample name",
  "addressFormat": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>deleteCountryRegion</summary>

<div>

Deletes a country/region.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `countryRegionId` | <code>string</code> | Yes | The unique identifier of the country region. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bcClient->deleteCountryRegion("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updateCountryRegion</summary>

<div>

Updates a country/region.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `countryRegionId` | <code>string</code> | Yes | The unique identifier of the country region. |
| `headers` | <code>UpdateCountryRegionHeaders</code> | Yes | Request headers, including the required `ifMatch`. |
| `payload` | <code>CountryRegionRequest</code> | Yes | The country region to create or update. |

**Returns:** `CountryRegion|error`

**Sample code:**

```ballerina
bc:CountryRegion result = check bcClient->updateCountryRegion("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {ifMatch: "string"}, {
    code: "200",
    lastModifiedDateTime: "2026-01-15T00:00:00",
    displayName: "Sample name",
    addressFormat: "string"
});
```

**Sample response:**

```json
{
  "code": "200",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "displayName": "Sample name",
  "addressFormat": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

#### Sales Orders

<details>
<summary>listSalesOrders</summary>

<div>

Returns a list of sales orders.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | The number of entities to skip before returning the results. |
| `top` | <code>int</code> | No | The maximum number of entities to return. |
| `filter` | <code>string</code> | No | An OData filter expression that restricts the entities returned. |
| `'limit` | <code>int</code> | No | The maximum number of entities to return in the page. |
| `expand` | <code>("salesOrderLines"&#124;"customer"&#124;"currency"&#124;"paymentTerm"&#124;"shipmentMethod")[]</code> | No | The related entities to include in the response. |
| `'select` | <code>("id"&#124;"number"&#124;"externalDocumentNumber"&#124;"orderDate"&#124;"customerId"&#124;"contactId"&#124;"customerNumber"&#124;"customerName"&#124;"billToName"&#124;"billToCustomerId"&#124;"billToCustomerNumber"&#124;"shipToName"&#124;"shipToContact"&#124;"sellingPostalAddress"&#124;"billingPostalAddress"&#124;"shippingPostalAddress"&#124;"currencyId"&#124;"currencyCode"&#124;"pricesIncludeTax"&#124;"paymentTermsId"&#124;"shipmentMethodId"&#124;"salesperson"&#124;"partialShipping"&#124;"requestedDeliveryDate"&#124;"discountAmount"&#124;"discountAppliedBeforeTax"&#124;"totalAmountExcludingTax"&#124;"totalTaxAmount"&#124;"totalAmountIncludingTax"&#124;"fullyShipped"&#124;"status"&#124;"lastModifiedDateTime"&#124;"phoneNumber"&#124;"email")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `SalesOrderCollection|error`

**Sample code:**

```ballerina
bc:SalesOrderCollection result = check bcClient->listSalesOrders("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "value": [
    {
      "lastModifiedDateTime": "2026-01-15T00:00:00",
      "shipmentMethodId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "discountAppliedBeforeTax": false
    }
  ]
}
```

</div>
</details>

<details>
<summary>createSalesOrder</summary>

<div>

Creates a sales order.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `payload` | <code>SalesOrderRequest</code> | Yes | The sales order to create or update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `SalesOrder|error`

**Sample code:**

```ballerina
bc:SalesOrder result = check bcClient->createSalesOrder("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    lastModifiedDateTime: "2026-01-15T00:00:00",
    shipmentMethodId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    discountAppliedBeforeTax: false,
    fullyShipped: false
});
```

**Sample response:**

```json
{
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "shipmentMethodId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "discountAppliedBeforeTax": false,
  "fullyShipped": false,
  "discountAmount": 100.00,
  "sellingPostalAddress": {
    "city": "string",
    "street": "string",
    "countryLetterCode": "200"
  }
}
```

</div>
</details>

<details>
<summary>getSalesOrder</summary>

<div>

Returns a sales order.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `salesOrderId` | <code>string</code> | Yes | The unique identifier of the sales order. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>("salesOrderLines"&#124;"customer"&#124;"currency"&#124;"paymentTerm"&#124;"shipmentMethod")[]</code> | No | The related entities to include in the response. |
| `'select` | <code>("id"&#124;"number"&#124;"externalDocumentNumber"&#124;"orderDate"&#124;"customerId"&#124;"contactId"&#124;"customerNumber"&#124;"customerName"&#124;"billToName"&#124;"billToCustomerId"&#124;"billToCustomerNumber"&#124;"shipToName"&#124;"shipToContact"&#124;"sellingPostalAddress"&#124;"billingPostalAddress"&#124;"shippingPostalAddress"&#124;"currencyId"&#124;"currencyCode"&#124;"pricesIncludeTax"&#124;"paymentTermsId"&#124;"shipmentMethodId"&#124;"salesperson"&#124;"partialShipping"&#124;"requestedDeliveryDate"&#124;"discountAmount"&#124;"discountAppliedBeforeTax"&#124;"totalAmountExcludingTax"&#124;"totalTaxAmount"&#124;"totalAmountIncludingTax"&#124;"fullyShipped"&#124;"status"&#124;"lastModifiedDateTime"&#124;"phoneNumber"&#124;"email")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `SalesOrder|error`

**Sample code:**

```ballerina
bc:SalesOrder result = check bcClient->getSalesOrder("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "shipmentMethodId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "discountAppliedBeforeTax": false,
  "fullyShipped": false,
  "discountAmount": 100.00,
  "sellingPostalAddress": {
    "city": "string",
    "street": "string",
    "countryLetterCode": "200"
  }
}
```

</div>
</details>

<details>
<summary>deleteSalesOrder</summary>

<div>

Deletes a sales order.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `salesOrderId` | <code>string</code> | Yes | The unique identifier of the sales order. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bcClient->deleteSalesOrder("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updateSalesOrder</summary>

<div>

Updates a sales order.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `salesOrderId` | <code>string</code> | Yes | The unique identifier of the sales order. |
| `headers` | <code>UpdateSalesOrderHeaders</code> | Yes | Request headers, including the required `ifMatch`. |
| `payload` | <code>SalesOrderRequest</code> | Yes | The sales order to create or update. |

**Returns:** `SalesOrder|error`

**Sample code:**

```ballerina
bc:SalesOrder result = check bcClient->updateSalesOrder("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {ifMatch: "string"}, {
    lastModifiedDateTime: "2026-01-15T00:00:00",
    shipmentMethodId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    discountAppliedBeforeTax: false,
    fullyShipped: false
});
```

**Sample response:**

```json
{
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "shipmentMethodId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "discountAppliedBeforeTax": false,
  "fullyShipped": false,
  "discountAmount": 100.00,
  "sellingPostalAddress": {
    "city": "string",
    "street": "string",
    "countryLetterCode": "200"
  }
}
```

</div>
</details>

<details>
<summary>shipAndInvoiceSalesOrder</summary>

<div>

Performs the ship and invoice action on a sales order.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `salesOrderId` | <code>string</code> | Yes | The unique identifier of the sales order. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bcClient->shipAndInvoiceSalesOrder("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>listSalesOrderLinesForSalesOrder</summary>

<div>

Returns a list of sales order lines for a sales order.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `salesOrderId` | <code>string</code> | Yes | The unique identifier of the sales order. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | The number of entities to skip before returning the results. |
| `top` | <code>int</code> | No | The maximum number of entities to return. |
| `filter` | <code>string</code> | No | An OData filter expression that restricts the entities returned. |
| `'limit` | <code>int</code> | No | The maximum number of entities to return in the page. |
| `expand` | <code>("item"&#124;"account")[]</code> | No | The related entities to include in the response. |
| `'select` | <code>("id"&#124;"documentId"&#124;"sequence"&#124;"itemId"&#124;"accountId"&#124;"lineType"&#124;"lineDetails"&#124;"description"&#124;"unitOfMeasureId"&#124;"unitOfMeasure"&#124;"quantity"&#124;"unitPrice"&#124;"discountAmount"&#124;"discountPercent"&#124;"discountAppliedBeforeTax"&#124;"amountExcludingTax"&#124;"taxCode"&#124;"taxPercent"&#124;"totalTaxAmount"&#124;"amountIncludingTax"&#124;"invoiceDiscountAllocation"&#124;"netAmount"&#124;"netTaxAmount"&#124;"netAmountIncludingTax"&#124;"shipmentDate"&#124;"shippedQuantity"&#124;"invoicedQuantity"&#124;"invoiceQuantity"&#124;"shipQuantity")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `SalesOrderLineCollection|error`

**Sample code:**

```ballerina
bc:SalesOrderLineCollection result = check bcClient->listSalesOrderLinesForSalesOrder("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "value": [
    {
      "discountAppliedBeforeTax": false,
      "description": "Sample description",
      "discountAmount": 100.00
    }
  ]
}
```

</div>
</details>

<details>
<summary>createSalesOrderLineForSalesOrder</summary>

<div>

Creates a sales order line for a sales order.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `salesOrderId` | <code>string</code> | Yes | The unique identifier of the sales order. |
| `payload` | <code>SalesOrderLineRequest</code> | Yes | The sales order line to create or update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `SalesOrderLine|error`

**Sample code:**

```ballerina
bc:SalesOrderLine result = check bcClient->createSalesOrderLineForSalesOrder("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    lineDetails: {
        number: "INV-0001",
        displayName: "Sample name"
    },
    discountAppliedBeforeTax: false,
    description: "Sample description",
    discountAmount: 100.00
});
```

**Sample response:**

```json
{
  "lineDetails": {
    "number": "INV-0001",
    "displayName": "Sample name"
  },
  "discountAppliedBeforeTax": false,
  "description": "Sample description",
  "discountAmount": 100.00,
  "invoiceDiscountAllocation": 100.00,
  "lineType": "string"
}
```

</div>
</details>

<details>
<summary>getSalesOrderLineForSalesOrder</summary>

<div>

Returns a sales order line for a sales order.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `salesOrderId` | <code>string</code> | Yes | The unique identifier of the sales order. |
| `salesOrderLineId` | <code>string</code> | Yes | The unique identifier of the sales order line. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>("item"&#124;"account")[]</code> | No | The related entities to include in the response. |
| `'select` | <code>("id"&#124;"documentId"&#124;"sequence"&#124;"itemId"&#124;"accountId"&#124;"lineType"&#124;"lineDetails"&#124;"description"&#124;"unitOfMeasureId"&#124;"unitOfMeasure"&#124;"quantity"&#124;"unitPrice"&#124;"discountAmount"&#124;"discountPercent"&#124;"discountAppliedBeforeTax"&#124;"amountExcludingTax"&#124;"taxCode"&#124;"taxPercent"&#124;"totalTaxAmount"&#124;"amountIncludingTax"&#124;"invoiceDiscountAllocation"&#124;"netAmount"&#124;"netTaxAmount"&#124;"netAmountIncludingTax"&#124;"shipmentDate"&#124;"shippedQuantity"&#124;"invoicedQuantity"&#124;"invoiceQuantity"&#124;"shipQuantity")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `SalesOrderLine|error`

**Sample code:**

```ballerina
bc:SalesOrderLine result = check bcClient->getSalesOrderLineForSalesOrder("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "lineDetails": {
    "number": "INV-0001",
    "displayName": "Sample name"
  },
  "discountAppliedBeforeTax": false,
  "description": "Sample description",
  "discountAmount": 100.00,
  "invoiceDiscountAllocation": 100.00,
  "lineType": "string"
}
```

</div>
</details>

<details>
<summary>deleteSalesOrderLineForSalesOrder</summary>

<div>

Deletes a sales order line for a sales order.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `salesOrderId` | <code>string</code> | Yes | The unique identifier of the sales order. |
| `salesOrderLineId` | <code>string</code> | Yes | The unique identifier of the sales order line. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bcClient->deleteSalesOrderLineForSalesOrder("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updateSalesOrderLineForSalesOrder</summary>

<div>

Updates a sales order line for a sales order.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `salesOrderId` | <code>string</code> | Yes | The unique identifier of the sales order. |
| `salesOrderLineId` | <code>string</code> | Yes | The unique identifier of the sales order line. |
| `headers` | <code>UpdateSalesOrderLineForSalesOrderHeaders</code> | Yes | Request headers, including the required `ifMatch`. |
| `payload` | <code>SalesOrderLineRequest</code> | Yes | The sales order line to create or update. |

**Returns:** `SalesOrderLine|error`

**Sample code:**

```ballerina
bc:SalesOrderLine result = check bcClient->updateSalesOrderLineForSalesOrder("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {ifMatch: "string"}, {
    lineDetails: {
        number: "INV-0001",
        displayName: "Sample name"
    },
    discountAppliedBeforeTax: false,
    description: "Sample description",
    discountAmount: 100.00
});
```

**Sample response:**

```json
{
  "lineDetails": {
    "number": "INV-0001",
    "displayName": "Sample name"
  },
  "discountAppliedBeforeTax": false,
  "description": "Sample description",
  "discountAmount": 100.00,
  "invoiceDiscountAllocation": 100.00,
  "lineType": "string"
}
```

</div>
</details>

#### Sales Order Lines

<details>
<summary>listSalesOrderLines</summary>

<div>

Returns a list of sales order lines.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | The number of entities to skip before returning the results. |
| `top` | <code>int</code> | No | The maximum number of entities to return. |
| `filter` | <code>string</code> | No | An OData filter expression that restricts the entities returned. |
| `'limit` | <code>int</code> | No | The maximum number of entities to return in the page. |
| `expand` | <code>("item"&#124;"account")[]</code> | No | The related entities to include in the response. |
| `'select` | <code>("id"&#124;"documentId"&#124;"sequence"&#124;"itemId"&#124;"accountId"&#124;"lineType"&#124;"lineDetails"&#124;"description"&#124;"unitOfMeasureId"&#124;"unitOfMeasure"&#124;"quantity"&#124;"unitPrice"&#124;"discountAmount"&#124;"discountPercent"&#124;"discountAppliedBeforeTax"&#124;"amountExcludingTax"&#124;"taxCode"&#124;"taxPercent"&#124;"totalTaxAmount"&#124;"amountIncludingTax"&#124;"invoiceDiscountAllocation"&#124;"netAmount"&#124;"netTaxAmount"&#124;"netAmountIncludingTax"&#124;"shipmentDate"&#124;"shippedQuantity"&#124;"invoicedQuantity"&#124;"invoiceQuantity"&#124;"shipQuantity")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `SalesOrderLineCollection|error`

**Sample code:**

```ballerina
bc:SalesOrderLineCollection result = check bcClient->listSalesOrderLines("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "value": [
    {
      "discountAppliedBeforeTax": false,
      "description": "Sample description",
      "discountAmount": 100.00
    }
  ]
}
```

</div>
</details>

<details>
<summary>createSalesOrderLine</summary>

<div>

Creates a sales order line.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `payload` | <code>SalesOrderLineRequest</code> | Yes | The sales order line to create or update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `SalesOrderLine|error`

**Sample code:**

```ballerina
bc:SalesOrderLine result = check bcClient->createSalesOrderLine("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    lineDetails: {
        number: "INV-0001",
        displayName: "Sample name"
    },
    discountAppliedBeforeTax: false,
    description: "Sample description",
    discountAmount: 100.00
});
```

**Sample response:**

```json
{
  "lineDetails": {
    "number": "INV-0001",
    "displayName": "Sample name"
  },
  "discountAppliedBeforeTax": false,
  "description": "Sample description",
  "discountAmount": 100.00,
  "invoiceDiscountAllocation": 100.00,
  "lineType": "string"
}
```

</div>
</details>

<details>
<summary>getSalesOrderLine</summary>

<div>

Returns a sales order line.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `salesOrderLineId` | <code>string</code> | Yes | The unique identifier of the sales order line. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>("item"&#124;"account")[]</code> | No | The related entities to include in the response. |
| `'select` | <code>("id"&#124;"documentId"&#124;"sequence"&#124;"itemId"&#124;"accountId"&#124;"lineType"&#124;"lineDetails"&#124;"description"&#124;"unitOfMeasureId"&#124;"unitOfMeasure"&#124;"quantity"&#124;"unitPrice"&#124;"discountAmount"&#124;"discountPercent"&#124;"discountAppliedBeforeTax"&#124;"amountExcludingTax"&#124;"taxCode"&#124;"taxPercent"&#124;"totalTaxAmount"&#124;"amountIncludingTax"&#124;"invoiceDiscountAllocation"&#124;"netAmount"&#124;"netTaxAmount"&#124;"netAmountIncludingTax"&#124;"shipmentDate"&#124;"shippedQuantity"&#124;"invoicedQuantity"&#124;"invoiceQuantity"&#124;"shipQuantity")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `SalesOrderLine|error`

**Sample code:**

```ballerina
bc:SalesOrderLine result = check bcClient->getSalesOrderLine("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "lineDetails": {
    "number": "INV-0001",
    "displayName": "Sample name"
  },
  "discountAppliedBeforeTax": false,
  "description": "Sample description",
  "discountAmount": 100.00,
  "invoiceDiscountAllocation": 100.00,
  "lineType": "string"
}
```

</div>
</details>

<details>
<summary>deleteSalesOrderLine</summary>

<div>

Deletes a sales order line.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `salesOrderLineId` | <code>string</code> | Yes | The unique identifier of the sales order line. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bcClient->deleteSalesOrderLine("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updateSalesOrderLine</summary>

<div>

Updates a sales order line.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `salesOrderLineId` | <code>string</code> | Yes | The unique identifier of the sales order line. |
| `headers` | <code>UpdateSalesOrderLineHeaders</code> | Yes | Request headers, including the required `ifMatch`. |
| `payload` | <code>SalesOrderLineRequest</code> | Yes | The sales order line to create or update. |

**Returns:** `SalesOrderLine|error`

**Sample code:**

```ballerina
bc:SalesOrderLine result = check bcClient->updateSalesOrderLine("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {ifMatch: "string"}, {
    lineDetails: {
        number: "INV-0001",
        displayName: "Sample name"
    },
    discountAppliedBeforeTax: false,
    description: "Sample description",
    discountAmount: 100.00
});
```

**Sample response:**

```json
{
  "lineDetails": {
    "number": "INV-0001",
    "displayName": "Sample name"
  },
  "discountAppliedBeforeTax": false,
  "description": "Sample description",
  "discountAmount": 100.00,
  "invoiceDiscountAllocation": 100.00,
  "lineType": "string"
}
```

</div>
</details>

#### Retained Earnings Statement

<details>
<summary>listRetainedEarningsStatementLines</summary>

<div>

Returns a list of retained earnings statement lines.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | The number of entities to skip before returning the results. |
| `top` | <code>int</code> | No | The maximum number of entities to return. |
| `filter` | <code>string</code> | No | An OData filter expression that restricts the entities returned. |
| `'limit` | <code>int</code> | No | The maximum number of entities to return in the page. |
| `'select` | <code>("lineNumber"&#124;"display"&#124;"netChange"&#124;"lineType"&#124;"indentation"&#124;"dateFilter")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `RetainedEarningsStatementCollection|error`

**Sample code:**

```ballerina
bc:RetainedEarningsStatementCollection result = check bcClient->listRetainedEarningsStatementLines("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "value": [
    {
      "netChange": 100.00,
      "indentation": 1,
      "display": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getRetainedEarningsStatementLine</summary>

<div>

Returns a retained earnings statement line.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `retainedEarningsStatementLineNumber` | <code>int:Signed32</code> | Yes | The line number of the retained earnings statement. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `'select` | <code>("lineNumber"&#124;"display"&#124;"netChange"&#124;"lineType"&#124;"indentation"&#124;"dateFilter")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `RetainedEarningsStatement|error`

**Sample code:**

```ballerina
bc:RetainedEarningsStatement result = check bcClient->getRetainedEarningsStatementLine("3fa85f64-5717-4562-b3fc-2c963f66afa6", 1);
```

**Sample response:**

```json
{
  "netChange": 100.00,
  "indentation": 1,
  "display": "string",
  "lineType": "string",
  "lineNumber": 1,
  "dateFilter": "2026-01-15T00:00:00"
}
```

</div>
</details>

#### Units Of Measure

<details>
<summary>listUnitsOfMeasure</summary>

<div>

Returns a list of units of measure.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | The number of entities to skip before returning the results. |
| `top` | <code>int</code> | No | The maximum number of entities to return. |
| `filter` | <code>string</code> | No | An OData filter expression that restricts the entities returned. |
| `'limit` | <code>int</code> | No | The maximum number of entities to return in the page. |
| `'select` | <code>("id"&#124;"code"&#124;"displayName"&#124;"internationalStandardCode"&#124;"lastModifiedDateTime")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `UnitOfMeasureCollection|error`

**Sample code:**

```ballerina
bc:UnitOfMeasureCollection result = check bcClient->listUnitsOfMeasure("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "value": [
    {
      "code": "200",
      "internationalStandardCode": "200",
      "lastModifiedDateTime": "2026-01-15T00:00:00"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createUnitOfMeasure</summary>

<div>

Creates a unit of measure.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `payload` | <code>UnitOfMeasureRequest</code> | Yes | The unit of measure to create or update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `UnitOfMeasure|error`

**Sample code:**

```ballerina
bc:UnitOfMeasure result = check bcClient->createUnitOfMeasure("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    code: "200",
    internationalStandardCode: "200",
    lastModifiedDateTime: "2026-01-15T00:00:00",
    displayName: "Sample name"
});
```

**Sample response:**

```json
{
  "code": "200",
  "internationalStandardCode": "200",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "displayName": "Sample name",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>getUnitOfMeasure</summary>

<div>

Returns a unit of measure.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `unitOfMeasureId` | <code>string</code> | Yes | The unique identifier of the unit of measure. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `'select` | <code>("id"&#124;"code"&#124;"displayName"&#124;"internationalStandardCode"&#124;"lastModifiedDateTime")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `UnitOfMeasure|error`

**Sample code:**

```ballerina
bc:UnitOfMeasure result = check bcClient->getUnitOfMeasure("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "code": "200",
  "internationalStandardCode": "200",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "displayName": "Sample name",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>deleteUnitOfMeasure</summary>

<div>

Deletes a unit of measure.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `unitOfMeasureId` | <code>string</code> | Yes | The unique identifier of the unit of measure. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bcClient->deleteUnitOfMeasure("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updateUnitOfMeasure</summary>

<div>

Updates a unit of measure.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `unitOfMeasureId` | <code>string</code> | Yes | The unique identifier of the unit of measure. |
| `headers` | <code>UpdateUnitOfMeasureHeaders</code> | Yes | Request headers, including the required `ifMatch`. |
| `payload` | <code>UnitOfMeasureRequest</code> | Yes | The unit of measure to create or update. |

**Returns:** `UnitOfMeasure|error`

**Sample code:**

```ballerina
bc:UnitOfMeasure result = check bcClient->updateUnitOfMeasure("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {ifMatch: "string"}, {
    code: "200",
    internationalStandardCode: "200",
    lastModifiedDateTime: "2026-01-15T00:00:00",
    displayName: "Sample name"
});
```

**Sample response:**

```json
{
  "code": "200",
  "internationalStandardCode": "200",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "displayName": "Sample name",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

#### Aged Accounts Receivable

<details>
<summary>listAgedAccountsReceivable</summary>

<div>

Returns the aged accounts receivable report.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | The number of entities to skip before returning the results. |
| `top` | <code>int</code> | No | The maximum number of entities to return. |
| `filter` | <code>string</code> | No | An OData filter expression that restricts the entities returned. |
| `'limit` | <code>int</code> | No | The maximum number of entities to return in the page. |
| `'select` | <code>("customerId"&#124;"customerNumber"&#124;"name"&#124;"currencyCode"&#124;"balanceDue"&#124;"currentAmount"&#124;"period1Amount"&#124;"period2Amount"&#124;"period3Amount"&#124;"agedAsOfDate"&#124;"periodLengthFilter")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `AgedAccountsReceivableCollection|error`

**Sample code:**

```ballerina
bc:AgedAccountsReceivableCollection result = check bcClient->listAgedAccountsReceivable("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "value": [
    {
      "period2Amount": 100.00,
      "agedAsOfDate": "2026-01-15T00:00:00",
      "period3Amount": 100.00
    }
  ]
}
```

</div>
</details>

<details>
<summary>getAgedAccountsReceivableByCustomer</summary>

<div>

Returns the aged accounts receivable for a customer.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `agedAccountsReceivableCustomerId` | <code>string</code> | Yes | The customer id of the aged accounts receivable. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `'select` | <code>("customerId"&#124;"customerNumber"&#124;"name"&#124;"currencyCode"&#124;"balanceDue"&#124;"currentAmount"&#124;"period1Amount"&#124;"period2Amount"&#124;"period3Amount"&#124;"agedAsOfDate"&#124;"periodLengthFilter")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `AgedAccountsReceivable|error`

**Sample code:**

```ballerina
bc:AgedAccountsReceivable result = check bcClient->getAgedAccountsReceivableByCustomer("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "period2Amount": 100.00,
  "agedAsOfDate": "2026-01-15T00:00:00",
  "period3Amount": 100.00,
  "balanceDue": 100.00,
  "customerId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "name": "Sample name"
}
```

</div>
</details>

#### Aged Accounts Payable

<details>
<summary>listAgedAccountsPayable</summary>

<div>

Returns the aged accounts payable report.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | The number of entities to skip before returning the results. |
| `top` | <code>int</code> | No | The maximum number of entities to return. |
| `filter` | <code>string</code> | No | An OData filter expression that restricts the entities returned. |
| `'limit` | <code>int</code> | No | The maximum number of entities to return in the page. |
| `'select` | <code>("vendorId"&#124;"vendorNumber"&#124;"name"&#124;"currencyCode"&#124;"balanceDue"&#124;"currentAmount"&#124;"period1Amount"&#124;"period2Amount"&#124;"period3Amount"&#124;"agedAsOfDate"&#124;"periodLengthFilter")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `AgedAccountsPayableCollection|error`

**Sample code:**

```ballerina
bc:AgedAccountsPayableCollection result = check bcClient->listAgedAccountsPayable("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "value": [
    {
      "period2Amount": 100.00,
      "agedAsOfDate": "2026-01-15T00:00:00",
      "period3Amount": 100.00
    }
  ]
}
```

</div>
</details>

<details>
<summary>getAgedAccountsPayableByVendor</summary>

<div>

Returns the aged accounts payable for a vendor.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `agedAccountsPayableVendorId` | <code>string</code> | Yes | The vendor id of the aged accounts payable. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `'select` | <code>("vendorId"&#124;"vendorNumber"&#124;"name"&#124;"currencyCode"&#124;"balanceDue"&#124;"currentAmount"&#124;"period1Amount"&#124;"period2Amount"&#124;"period3Amount"&#124;"agedAsOfDate"&#124;"periodLengthFilter")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `AgedAccountsPayable|error`

**Sample code:**

```ballerina
bc:AgedAccountsPayable result = check bcClient->getAgedAccountsPayableByVendor("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "period2Amount": 100.00,
  "agedAsOfDate": "2026-01-15T00:00:00",
  "period3Amount": 100.00,
  "balanceDue": 100.00,
  "name": "Sample name",
  "vendorId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

#### Balance Sheet

<details>
<summary>listBalanceSheetLines</summary>

<div>

Returns a list of balance sheet lines.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | The number of entities to skip before returning the results. |
| `top` | <code>int</code> | No | The maximum number of entities to return. |
| `filter` | <code>string</code> | No | An OData filter expression that restricts the entities returned. |
| `'limit` | <code>int</code> | No | The maximum number of entities to return in the page. |
| `'select` | <code>("lineNumber"&#124;"display"&#124;"balance"&#124;"lineType"&#124;"indentation"&#124;"dateFilter")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `BalanceSheetCollection|error`

**Sample code:**

```ballerina
bc:BalanceSheetCollection result = check bcClient->listBalanceSheetLines("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "value": [
    {
      "indentation": 1,
      "balance": 100.00,
      "display": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getBalanceSheetLine</summary>

<div>

Returns a balance sheet line.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `balanceSheetLineNumber` | <code>int:Signed32</code> | Yes | The line number of the balance sheet. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `'select` | <code>("lineNumber"&#124;"display"&#124;"balance"&#124;"lineType"&#124;"indentation"&#124;"dateFilter")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `BalanceSheet|error`

**Sample code:**

```ballerina
bc:BalanceSheet result = check bcClient->getBalanceSheetLine("3fa85f64-5717-4562-b3fc-2c963f66afa6", 1);
```

**Sample response:**

```json
{
  "indentation": 1,
  "balance": 100.00,
  "display": "string",
  "lineType": "string",
  "lineNumber": 1,
  "dateFilter": "2026-01-15T00:00:00"
}
```

</div>
</details>

#### Trial Balance

<details>
<summary>listTrialBalanceLines</summary>

<div>

Returns a list of trial balance lines.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | The number of entities to skip before returning the results. |
| `top` | <code>int</code> | No | The maximum number of entities to return. |
| `filter` | <code>string</code> | No | An OData filter expression that restricts the entities returned. |
| `'limit` | <code>int</code> | No | The maximum number of entities to return in the page. |
| `expand` | <code>("account")[]</code> | No | The related entities to include in the response. |
| `'select` | <code>("number"&#124;"accountId"&#124;"accountType"&#124;"display"&#124;"totalDebit"&#124;"totalCredit"&#124;"balanceAtDateDebit"&#124;"balanceAtDateCredit"&#124;"dateFilter")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `TrialBalanceCollection|error`

**Sample code:**

```ballerina
bc:TrialBalanceCollection result = check bcClient->listTrialBalanceLines("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "value": [
    {
      "number": "INV-0001",
      "accountId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "totalCredit": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getTrialBalanceLine</summary>

<div>

Returns a trial balance line.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `trialBalanceNumber` | <code>string</code> | Yes | The number of the trial balance. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>("account")[]</code> | No | The related entities to include in the response. |
| `'select` | <code>("number"&#124;"accountId"&#124;"accountType"&#124;"display"&#124;"totalDebit"&#124;"totalCredit"&#124;"balanceAtDateDebit"&#124;"balanceAtDateCredit"&#124;"dateFilter")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `TrialBalance|error`

**Sample code:**

```ballerina
bc:TrialBalance result = check bcClient->getTrialBalanceLine("3fa85f64-5717-4562-b3fc-2c963f66afa6", "INV-0001");
```

**Sample response:**

```json
{
  "number": "INV-0001",
  "accountId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "totalCredit": "string",
  "accountType": "string",
  "display": "string",
  "balanceAtDateCredit": "2026-01-15T00:00:00"
}
```

</div>
</details>

#### Income Statement

<details>
<summary>listIncomeStatementLines</summary>

<div>

Returns a list of income statement lines.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | The number of entities to skip before returning the results. |
| `top` | <code>int</code> | No | The maximum number of entities to return. |
| `filter` | <code>string</code> | No | An OData filter expression that restricts the entities returned. |
| `'limit` | <code>int</code> | No | The maximum number of entities to return in the page. |
| `'select` | <code>("lineNumber"&#124;"display"&#124;"netChange"&#124;"lineType"&#124;"indentation"&#124;"dateFilter")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `IncomeStatementCollection|error`

**Sample code:**

```ballerina
bc:IncomeStatementCollection result = check bcClient->listIncomeStatementLines("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "value": [
    {
      "netChange": 100.00,
      "indentation": 1,
      "display": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getIncomeStatementLine</summary>

<div>

Returns an income statement line.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `incomeStatementLineNumber` | <code>int:Signed32</code> | Yes | The line number of the income statement. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `'select` | <code>("lineNumber"&#124;"display"&#124;"netChange"&#124;"lineType"&#124;"indentation"&#124;"dateFilter")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `IncomeStatement|error`

**Sample code:**

```ballerina
bc:IncomeStatement result = check bcClient->getIncomeStatementLine("3fa85f64-5717-4562-b3fc-2c963f66afa6", 1);
```

**Sample response:**

```json
{
  "netChange": 100.00,
  "indentation": 1,
  "display": "string",
  "lineType": "string",
  "lineNumber": 1,
  "dateFilter": "2026-01-15T00:00:00"
}
```

</div>
</details>

#### Tax Areas

<details>
<summary>listTaxAreas</summary>

<div>

Returns a list of tax areas.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | The number of entities to skip before returning the results. |
| `top` | <code>int</code> | No | The maximum number of entities to return. |
| `filter` | <code>string</code> | No | An OData filter expression that restricts the entities returned. |
| `'limit` | <code>int</code> | No | The maximum number of entities to return in the page. |
| `'select` | <code>("id"&#124;"code"&#124;"displayName"&#124;"taxType"&#124;"lastModifiedDateTime")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `TaxAreaCollection|error`

**Sample code:**

```ballerina
bc:TaxAreaCollection result = check bcClient->listTaxAreas("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "value": [
    {
      "code": "200",
      "lastModifiedDateTime": "2026-01-15T00:00:00",
      "displayName": "Sample name"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createTaxArea</summary>

<div>

Creates a tax area.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `payload` | <code>TaxAreaRequest</code> | Yes | The tax area to create or update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TaxArea|error`

**Sample code:**

```ballerina
bc:TaxArea result = check bcClient->createTaxArea("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    code: "200",
    lastModifiedDateTime: "2026-01-15T00:00:00",
    displayName: "Sample name",
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "code": "200",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "displayName": "Sample name",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "taxType": "string"
}
```

</div>
</details>

<details>
<summary>getTaxArea</summary>

<div>

Returns a tax area.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `taxAreaId` | <code>string</code> | Yes | The unique identifier of the tax area. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `'select` | <code>("id"&#124;"code"&#124;"displayName"&#124;"taxType"&#124;"lastModifiedDateTime")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `TaxArea|error`

**Sample code:**

```ballerina
bc:TaxArea result = check bcClient->getTaxArea("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "code": "200",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "displayName": "Sample name",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "taxType": "string"
}
```

</div>
</details>

<details>
<summary>deleteTaxArea</summary>

<div>

Deletes a tax area.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `taxAreaId` | <code>string</code> | Yes | The unique identifier of the tax area. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bcClient->deleteTaxArea("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updateTaxArea</summary>

<div>

Updates a tax area.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `taxAreaId` | <code>string</code> | Yes | The unique identifier of the tax area. |
| `headers` | <code>UpdateTaxAreaHeaders</code> | Yes | Request headers, including the required `ifMatch`. |
| `payload` | <code>TaxAreaRequest</code> | Yes | The tax area to create or update. |

**Returns:** `TaxArea|error`

**Sample code:**

```ballerina
bc:TaxArea result = check bcClient->updateTaxArea("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {ifMatch: "string"}, {
    code: "200",
    lastModifiedDateTime: "2026-01-15T00:00:00",
    displayName: "Sample name",
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "code": "200",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "displayName": "Sample name",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "taxType": "string"
}
```

</div>
</details>

#### Sales Quotes

<details>
<summary>listSalesQuotes</summary>

<div>

Returns a list of sales quotes.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | The number of entities to skip before returning the results. |
| `top` | <code>int</code> | No | The maximum number of entities to return. |
| `filter` | <code>string</code> | No | An OData filter expression that restricts the entities returned. |
| `'limit` | <code>int</code> | No | The maximum number of entities to return in the page. |
| `expand` | <code>("salesQuoteLines"&#124;"pdfDocument"&#124;"customer"&#124;"currency"&#124;"paymentTerm"&#124;"shipmentMethod")[]</code> | No | The related entities to include in the response. |
| `'select` | <code>("id"&#124;"number"&#124;"externalDocumentNumber"&#124;"documentDate"&#124;"dueDate"&#124;"customerId"&#124;"contactId"&#124;"customerNumber"&#124;"customerName"&#124;"billToName"&#124;"billToCustomerId"&#124;"billToCustomerNumber"&#124;"shipToName"&#124;"shipToContact"&#124;"sellingPostalAddress"&#124;"billingPostalAddress"&#124;"shippingPostalAddress"&#124;"currencyId"&#124;"currencyCode"&#124;"paymentTermsId"&#124;"shipmentMethodId"&#124;"salesperson"&#124;"discountAmount"&#124;"totalAmountExcludingTax"&#124;"totalTaxAmount"&#124;"totalAmountIncludingTax"&#124;"status"&#124;"sentDate"&#124;"validUntilDate"&#124;"acceptedDate"&#124;"lastModifiedDateTime"&#124;"phoneNumber"&#124;"email")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `SalesQuoteCollection|error`

**Sample code:**

```ballerina
bc:SalesQuoteCollection result = check bcClient->listSalesQuotes("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "value": [
    {
      "documentDate": "2026-01-15T00:00:00",
      "lastModifiedDateTime": "2026-01-15T00:00:00",
      "shipmentMethodId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createSalesQuote</summary>

<div>

Creates a sales quote.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `payload` | <code>SalesQuoteRequest</code> | Yes | The sales quote to create or update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `SalesQuote|error`

**Sample code:**

```ballerina
bc:SalesQuote result = check bcClient->createSalesQuote("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    documentDate: "2026-01-15T00:00:00",
    lastModifiedDateTime: "2026-01-15T00:00:00",
    shipmentMethodId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    dueDate: "2026-01-15T00:00:00"
});
```

**Sample response:**

```json
{
  "documentDate": "2026-01-15T00:00:00",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "shipmentMethodId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "dueDate": "2026-01-15T00:00:00",
  "discountAmount": 100.00,
  "sellingPostalAddress": {
    "city": "string",
    "street": "string",
    "countryLetterCode": "200"
  }
}
```

</div>
</details>

<details>
<summary>getSalesQuote</summary>

<div>

Returns a sales quote.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `salesQuoteId` | <code>string</code> | Yes | The unique identifier of the sales quote. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>("salesQuoteLines"&#124;"pdfDocument"&#124;"customer"&#124;"currency"&#124;"paymentTerm"&#124;"shipmentMethod")[]</code> | No | The related entities to include in the response. |
| `'select` | <code>("id"&#124;"number"&#124;"externalDocumentNumber"&#124;"documentDate"&#124;"dueDate"&#124;"customerId"&#124;"contactId"&#124;"customerNumber"&#124;"customerName"&#124;"billToName"&#124;"billToCustomerId"&#124;"billToCustomerNumber"&#124;"shipToName"&#124;"shipToContact"&#124;"sellingPostalAddress"&#124;"billingPostalAddress"&#124;"shippingPostalAddress"&#124;"currencyId"&#124;"currencyCode"&#124;"paymentTermsId"&#124;"shipmentMethodId"&#124;"salesperson"&#124;"discountAmount"&#124;"totalAmountExcludingTax"&#124;"totalTaxAmount"&#124;"totalAmountIncludingTax"&#124;"status"&#124;"sentDate"&#124;"validUntilDate"&#124;"acceptedDate"&#124;"lastModifiedDateTime"&#124;"phoneNumber"&#124;"email")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `SalesQuote|error`

**Sample code:**

```ballerina
bc:SalesQuote result = check bcClient->getSalesQuote("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "documentDate": "2026-01-15T00:00:00",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "shipmentMethodId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "dueDate": "2026-01-15T00:00:00",
  "discountAmount": 100.00,
  "sellingPostalAddress": {
    "city": "string",
    "street": "string",
    "countryLetterCode": "200"
  }
}
```

</div>
</details>

<details>
<summary>deleteSalesQuote</summary>

<div>

Deletes a sales quote.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `salesQuoteId` | <code>string</code> | Yes | The unique identifier of the sales quote. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bcClient->deleteSalesQuote("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updateSalesQuote</summary>

<div>

Updates a sales quote.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `salesQuoteId` | <code>string</code> | Yes | The unique identifier of the sales quote. |
| `headers` | <code>UpdateSalesQuoteHeaders</code> | Yes | Request headers, including the required `ifMatch`. |
| `payload` | <code>SalesQuoteRequest</code> | Yes | The sales quote to create or update. |

**Returns:** `SalesQuote|error`

**Sample code:**

```ballerina
bc:SalesQuote result = check bcClient->updateSalesQuote("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {ifMatch: "string"}, {
    documentDate: "2026-01-15T00:00:00",
    lastModifiedDateTime: "2026-01-15T00:00:00",
    shipmentMethodId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    dueDate: "2026-01-15T00:00:00"
});
```

**Sample response:**

```json
{
  "documentDate": "2026-01-15T00:00:00",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "shipmentMethodId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "dueDate": "2026-01-15T00:00:00",
  "discountAmount": 100.00,
  "sellingPostalAddress": {
    "city": "string",
    "street": "string",
    "countryLetterCode": "200"
  }
}
```

</div>
</details>

<details>
<summary>makeInvoiceFromSalesQuote</summary>

<div>

Performs the make invoice action on a sales quote.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `salesQuoteId` | <code>string</code> | Yes | The unique identifier of the sales quote. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bcClient->makeInvoiceFromSalesQuote("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>makeOrderFromSalesQuote</summary>

<div>

Performs the make order action on a sales quote.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `salesQuoteId` | <code>string</code> | Yes | The unique identifier of the sales quote. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bcClient->makeOrderFromSalesQuote("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>sendSalesQuote</summary>

<div>

Performs the send action on a sales quote.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `salesQuoteId` | <code>string</code> | Yes | The unique identifier of the sales quote. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bcClient->sendSalesQuote("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>listSalesQuoteLinesForSalesQuote</summary>

<div>

Returns a list of sales quote lines for a sales quote.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `salesQuoteId` | <code>string</code> | Yes | The unique identifier of the sales quote. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | The number of entities to skip before returning the results. |
| `top` | <code>int</code> | No | The maximum number of entities to return. |
| `filter` | <code>string</code> | No | An OData filter expression that restricts the entities returned. |
| `'limit` | <code>int</code> | No | The maximum number of entities to return in the page. |
| `expand` | <code>("item"&#124;"account")[]</code> | No | The related entities to include in the response. |
| `'select` | <code>("id"&#124;"documentId"&#124;"sequence"&#124;"itemId"&#124;"accountId"&#124;"lineType"&#124;"lineDetails"&#124;"description"&#124;"unitOfMeasureId"&#124;"unitOfMeasure"&#124;"unitPrice"&#124;"quantity"&#124;"discountAmount"&#124;"discountPercent"&#124;"discountAppliedBeforeTax"&#124;"amountExcludingTax"&#124;"taxCode"&#124;"taxPercent"&#124;"totalTaxAmount"&#124;"amountIncludingTax"&#124;"netAmount"&#124;"netTaxAmount"&#124;"netAmountIncludingTax")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `SalesQuoteLineCollection|error`

**Sample code:**

```ballerina
bc:SalesQuoteLineCollection result = check bcClient->listSalesQuoteLinesForSalesQuote("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "value": [
    {
      "discountAppliedBeforeTax": false,
      "description": "Sample description",
      "discountAmount": 100.00
    }
  ]
}
```

</div>
</details>

<details>
<summary>createSalesQuoteLineForSalesQuote</summary>

<div>

Creates a sales quote line for a sales quote.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `salesQuoteId` | <code>string</code> | Yes | The unique identifier of the sales quote. |
| `payload` | <code>SalesQuoteLineRequest</code> | Yes | The sales quote line to create or update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `SalesQuoteLine|error`

**Sample code:**

```ballerina
bc:SalesQuoteLine result = check bcClient->createSalesQuoteLineForSalesQuote("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    unitPrice: 100.00,
    quantity: 100.00,
    discountPercent: 100.00,
    lineDetails: {
        number: "INV-0001",
        displayName: "Sample name"
    }
});
```

**Sample response:**

```json
{
  "lineDetails": {
    "number": "INV-0001",
    "displayName": "Sample name"
  },
  "discountAppliedBeforeTax": false,
  "description": "Sample description",
  "discountAmount": 100.00,
  "lineType": "string",
  "taxPercent": 100.00
}
```

</div>
</details>

<details>
<summary>getSalesQuoteLineForSalesQuote</summary>

<div>

Returns a sales quote line for a sales quote.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `salesQuoteId` | <code>string</code> | Yes | The unique identifier of the sales quote. |
| `salesQuoteLineId` | <code>string</code> | Yes | The unique identifier of the sales quote line. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>("item"&#124;"account")[]</code> | No | The related entities to include in the response. |
| `'select` | <code>("id"&#124;"documentId"&#124;"sequence"&#124;"itemId"&#124;"accountId"&#124;"lineType"&#124;"lineDetails"&#124;"description"&#124;"unitOfMeasureId"&#124;"unitOfMeasure"&#124;"unitPrice"&#124;"quantity"&#124;"discountAmount"&#124;"discountPercent"&#124;"discountAppliedBeforeTax"&#124;"amountExcludingTax"&#124;"taxCode"&#124;"taxPercent"&#124;"totalTaxAmount"&#124;"amountIncludingTax"&#124;"netAmount"&#124;"netTaxAmount"&#124;"netAmountIncludingTax")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `SalesQuoteLine|error`

**Sample code:**

```ballerina
bc:SalesQuoteLine result = check bcClient->getSalesQuoteLineForSalesQuote("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "lineDetails": {
    "number": "INV-0001",
    "displayName": "Sample name"
  },
  "discountAppliedBeforeTax": false,
  "description": "Sample description",
  "discountAmount": 100.00,
  "lineType": "string",
  "taxPercent": 100.00
}
```

</div>
</details>

<details>
<summary>deleteSalesQuoteLineForSalesQuote</summary>

<div>

Deletes a sales quote line for a sales quote.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `salesQuoteId` | <code>string</code> | Yes | The unique identifier of the sales quote. |
| `salesQuoteLineId` | <code>string</code> | Yes | The unique identifier of the sales quote line. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bcClient->deleteSalesQuoteLineForSalesQuote("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updateSalesQuoteLineForSalesQuote</summary>

<div>

Updates a sales quote line for a sales quote.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `salesQuoteId` | <code>string</code> | Yes | The unique identifier of the sales quote. |
| `salesQuoteLineId` | <code>string</code> | Yes | The unique identifier of the sales quote line. |
| `headers` | <code>UpdateSalesQuoteLineForSalesQuoteHeaders</code> | Yes | Request headers, including the required `ifMatch`. |
| `payload` | <code>SalesQuoteLineRequest</code> | Yes | The sales quote line to create or update. |

**Returns:** `SalesQuoteLine|error`

**Sample code:**

```ballerina
bc:SalesQuoteLine result = check bcClient->updateSalesQuoteLineForSalesQuote("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {ifMatch: "string"}, {
    unitPrice: 100.00,
    quantity: 100.00,
    discountPercent: 100.00,
    lineDetails: {
        number: "INV-0001",
        displayName: "Sample name"
    }
});
```

**Sample response:**

```json
{
  "lineDetails": {
    "number": "INV-0001",
    "displayName": "Sample name"
  },
  "discountAppliedBeforeTax": false,
  "description": "Sample description",
  "discountAmount": 100.00,
  "lineType": "string",
  "taxPercent": 100.00
}
```

</div>
</details>

<details>
<summary>listPdfDocumentsForSalesQuote</summary>

<div>

Returns a list of PDF documents for a sales quote.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `salesQuoteId` | <code>string</code> | Yes | The unique identifier of the sales quote. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | The number of entities to skip before returning the results. |
| `top` | <code>int</code> | No | The maximum number of entities to return. |
| `filter` | <code>string</code> | No | An OData filter expression that restricts the entities returned. |
| `'limit` | <code>int</code> | No | The maximum number of entities to return in the page. |
| `'select` | <code>("id"&#124;"content")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `PdfDocumentCollection|error`

**Sample code:**

```ballerina
bc:PdfDocumentCollection result = check bcClient->listPdfDocumentsForSalesQuote("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "value": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "content": {
        "fileContent": "string",
        "fileName": "import.csv"
      }
    }
  ]
}
```

</div>
</details>

<details>
<summary>getPdfDocumentForSalesQuote</summary>

<div>

Returns a PDF document for a sales quote.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `salesQuoteId` | <code>string</code> | Yes | The unique identifier of the sales quote. |
| `pdfDocumentId` | <code>string</code> | Yes | The unique identifier of the pdf document. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `'select` | <code>("id"&#124;"content")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `PdfDocument|error`

**Sample code:**

```ballerina
bc:PdfDocument result = check bcClient->getPdfDocumentForSalesQuote("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "content": {
    "fileContent": "string",
    "fileName": "import.csv"
  }
}
```

</div>
</details>

#### Sales Quote Lines

<details>
<summary>listSalesQuoteLines</summary>

<div>

Returns a list of sales quote lines.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | The number of entities to skip before returning the results. |
| `top` | <code>int</code> | No | The maximum number of entities to return. |
| `filter` | <code>string</code> | No | An OData filter expression that restricts the entities returned. |
| `'limit` | <code>int</code> | No | The maximum number of entities to return in the page. |
| `expand` | <code>("item"&#124;"account")[]</code> | No | The related entities to include in the response. |
| `'select` | <code>("id"&#124;"documentId"&#124;"sequence"&#124;"itemId"&#124;"accountId"&#124;"lineType"&#124;"lineDetails"&#124;"description"&#124;"unitOfMeasureId"&#124;"unitOfMeasure"&#124;"unitPrice"&#124;"quantity"&#124;"discountAmount"&#124;"discountPercent"&#124;"discountAppliedBeforeTax"&#124;"amountExcludingTax"&#124;"taxCode"&#124;"taxPercent"&#124;"totalTaxAmount"&#124;"amountIncludingTax"&#124;"netAmount"&#124;"netTaxAmount"&#124;"netAmountIncludingTax")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `SalesQuoteLineCollection|error`

**Sample code:**

```ballerina
bc:SalesQuoteLineCollection result = check bcClient->listSalesQuoteLines("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "value": [
    {
      "discountAppliedBeforeTax": false,
      "description": "Sample description",
      "discountAmount": 100.00
    }
  ]
}
```

</div>
</details>

<details>
<summary>createSalesQuoteLine</summary>

<div>

Creates a sales quote line.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `payload` | <code>SalesQuoteLineRequest</code> | Yes | The sales quote line to create or update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `SalesQuoteLine|error`

**Sample code:**

```ballerina
bc:SalesQuoteLine result = check bcClient->createSalesQuoteLine("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    unitPrice: 100.00,
    quantity: 100.00,
    discountPercent: 100.00,
    lineDetails: {
        number: "INV-0001",
        displayName: "Sample name"
    }
});
```

**Sample response:**

```json
{
  "lineDetails": {
    "number": "INV-0001",
    "displayName": "Sample name"
  },
  "discountAppliedBeforeTax": false,
  "description": "Sample description",
  "discountAmount": 100.00,
  "lineType": "string",
  "taxPercent": 100.00
}
```

</div>
</details>

<details>
<summary>getSalesQuoteLine</summary>

<div>

Returns a sales quote line.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `salesQuoteLineId` | <code>string</code> | Yes | The unique identifier of the sales quote line. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>("item"&#124;"account")[]</code> | No | The related entities to include in the response. |
| `'select` | <code>("id"&#124;"documentId"&#124;"sequence"&#124;"itemId"&#124;"accountId"&#124;"lineType"&#124;"lineDetails"&#124;"description"&#124;"unitOfMeasureId"&#124;"unitOfMeasure"&#124;"unitPrice"&#124;"quantity"&#124;"discountAmount"&#124;"discountPercent"&#124;"discountAppliedBeforeTax"&#124;"amountExcludingTax"&#124;"taxCode"&#124;"taxPercent"&#124;"totalTaxAmount"&#124;"amountIncludingTax"&#124;"netAmount"&#124;"netTaxAmount"&#124;"netAmountIncludingTax")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `SalesQuoteLine|error`

**Sample code:**

```ballerina
bc:SalesQuoteLine result = check bcClient->getSalesQuoteLine("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "lineDetails": {
    "number": "INV-0001",
    "displayName": "Sample name"
  },
  "discountAppliedBeforeTax": false,
  "description": "Sample description",
  "discountAmount": 100.00,
  "lineType": "string",
  "taxPercent": 100.00
}
```

</div>
</details>

<details>
<summary>deleteSalesQuoteLine</summary>

<div>

Deletes a sales quote line.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `salesQuoteLineId` | <code>string</code> | Yes | The unique identifier of the sales quote line. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bcClient->deleteSalesQuoteLine("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updateSalesQuoteLine</summary>

<div>

Updates a sales quote line.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `salesQuoteLineId` | <code>string</code> | Yes | The unique identifier of the sales quote line. |
| `headers` | <code>UpdateSalesQuoteLineHeaders</code> | Yes | Request headers, including the required `ifMatch`. |
| `payload` | <code>SalesQuoteLineRequest</code> | Yes | The sales quote line to create or update. |

**Returns:** `SalesQuoteLine|error`

**Sample code:**

```ballerina
bc:SalesQuoteLine result = check bcClient->updateSalesQuoteLine("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {ifMatch: "string"}, {
    unitPrice: 100.00,
    quantity: 100.00,
    discountPercent: 100.00,
    lineDetails: {
        number: "INV-0001",
        displayName: "Sample name"
    }
});
```

**Sample response:**

```json
{
  "lineDetails": {
    "number": "INV-0001",
    "displayName": "Sample name"
  },
  "discountAppliedBeforeTax": false,
  "description": "Sample description",
  "discountAmount": 100.00,
  "lineType": "string",
  "taxPercent": 100.00
}
```

</div>
</details>

#### Sales Credit Memos

<details>
<summary>listSalesCreditMemos</summary>

<div>

Returns a list of sales credit memos.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | The number of entities to skip before returning the results. |
| `top` | <code>int</code> | No | The maximum number of entities to return. |
| `filter` | <code>string</code> | No | An OData filter expression that restricts the entities returned. |
| `'limit` | <code>int</code> | No | The maximum number of entities to return in the page. |
| `expand` | <code>("salesCreditMemoLines"&#124;"pdfDocument"&#124;"customer"&#124;"currency"&#124;"paymentTerm"&#124;"shipmentMethod")[]</code> | No | The related entities to include in the response. |
| `'select` | <code>("id"&#124;"number"&#124;"externalDocumentNumber"&#124;"creditMemoDate"&#124;"dueDate"&#124;"customerId"&#124;"contactId"&#124;"customerNumber"&#124;"customerName"&#124;"billToName"&#124;"billToCustomerId"&#124;"billToCustomerNumber"&#124;"sellingPostalAddress"&#124;"billingPostalAddress"&#124;"currencyId"&#124;"currencyCode"&#124;"paymentTermsId"&#124;"shipmentMethodId"&#124;"salesperson"&#124;"pricesIncludeTax"&#124;"discountAmount"&#124;"discountAppliedBeforeTax"&#124;"totalAmountExcludingTax"&#124;"totalTaxAmount"&#124;"totalAmountIncludingTax"&#124;"status"&#124;"lastModifiedDateTime"&#124;"invoiceId"&#124;"invoiceNumber"&#124;"phoneNumber"&#124;"email")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `SalesCreditMemoCollection|error`

**Sample code:**

```ballerina
bc:SalesCreditMemoCollection result = check bcClient->listSalesCreditMemos("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "value": [
    {
      "lastModifiedDateTime": "2026-01-15T00:00:00",
      "shipmentMethodId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "discountAppliedBeforeTax": false
    }
  ]
}
```

</div>
</details>

<details>
<summary>createSalesCreditMemo</summary>

<div>

Creates a sales credit memo.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `payload` | <code>SalesCreditMemoRequest</code> | Yes | The sales credit memo to create or update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `SalesCreditMemo|error`

**Sample code:**

```ballerina
bc:SalesCreditMemo result = check bcClient->createSalesCreditMemo("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    lastModifiedDateTime: "2026-01-15T00:00:00",
    shipmentMethodId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    discountAppliedBeforeTax: false,
    dueDate: "2026-01-15T00:00:00"
});
```

**Sample response:**

```json
{
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "shipmentMethodId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "discountAppliedBeforeTax": false,
  "dueDate": "2026-01-15T00:00:00",
  "discountAmount": 100.00,
  "sellingPostalAddress": {
    "city": "string",
    "street": "string",
    "countryLetterCode": "200"
  }
}
```

</div>
</details>

<details>
<summary>getSalesCreditMemo</summary>

<div>

Returns a sales credit memo.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `salesCreditMemoId` | <code>string</code> | Yes | The unique identifier of the sales credit memo. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>("salesCreditMemoLines"&#124;"pdfDocument"&#124;"customer"&#124;"currency"&#124;"paymentTerm"&#124;"shipmentMethod")[]</code> | No | The related entities to include in the response. |
| `'select` | <code>("id"&#124;"number"&#124;"externalDocumentNumber"&#124;"creditMemoDate"&#124;"dueDate"&#124;"customerId"&#124;"contactId"&#124;"customerNumber"&#124;"customerName"&#124;"billToName"&#124;"billToCustomerId"&#124;"billToCustomerNumber"&#124;"sellingPostalAddress"&#124;"billingPostalAddress"&#124;"currencyId"&#124;"currencyCode"&#124;"paymentTermsId"&#124;"shipmentMethodId"&#124;"salesperson"&#124;"pricesIncludeTax"&#124;"discountAmount"&#124;"discountAppliedBeforeTax"&#124;"totalAmountExcludingTax"&#124;"totalTaxAmount"&#124;"totalAmountIncludingTax"&#124;"status"&#124;"lastModifiedDateTime"&#124;"invoiceId"&#124;"invoiceNumber"&#124;"phoneNumber"&#124;"email")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `SalesCreditMemo|error`

**Sample code:**

```ballerina
bc:SalesCreditMemo result = check bcClient->getSalesCreditMemo("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "shipmentMethodId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "discountAppliedBeforeTax": false,
  "dueDate": "2026-01-15T00:00:00",
  "discountAmount": 100.00,
  "sellingPostalAddress": {
    "city": "string",
    "street": "string",
    "countryLetterCode": "200"
  }
}
```

</div>
</details>

<details>
<summary>deleteSalesCreditMemo</summary>

<div>

Deletes a sales credit memo.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `salesCreditMemoId` | <code>string</code> | Yes | The unique identifier of the sales credit memo. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bcClient->deleteSalesCreditMemo("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updateSalesCreditMemo</summary>

<div>

Updates a sales credit memo.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `salesCreditMemoId` | <code>string</code> | Yes | The unique identifier of the sales credit memo. |
| `headers` | <code>UpdateSalesCreditMemoHeaders</code> | Yes | Request headers, including the required `ifMatch`. |
| `payload` | <code>SalesCreditMemoRequest</code> | Yes | The sales credit memo to create or update. |

**Returns:** `SalesCreditMemo|error`

**Sample code:**

```ballerina
bc:SalesCreditMemo result = check bcClient->updateSalesCreditMemo("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {ifMatch: "string"}, {
    lastModifiedDateTime: "2026-01-15T00:00:00",
    shipmentMethodId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    discountAppliedBeforeTax: false,
    dueDate: "2026-01-15T00:00:00"
});
```

**Sample response:**

```json
{
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "shipmentMethodId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "discountAppliedBeforeTax": false,
  "dueDate": "2026-01-15T00:00:00",
  "discountAmount": 100.00,
  "sellingPostalAddress": {
    "city": "string",
    "street": "string",
    "countryLetterCode": "200"
  }
}
```

</div>
</details>

<details>
<summary>cancelAndSendSalesCreditMemo</summary>

<div>

Performs the cancel and send action on a sales credit memo.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `salesCreditMemoId` | <code>string</code> | Yes | The unique identifier of the sales credit memo. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bcClient->cancelAndSendSalesCreditMemo("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>cancelSalesCreditMemo</summary>

<div>

Performs the cancel action on a sales credit memo.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `salesCreditMemoId` | <code>string</code> | Yes | The unique identifier of the sales credit memo. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bcClient->cancelSalesCreditMemo("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>postAndSendSalesCreditMemo</summary>

<div>

Performs the post and send action on a sales credit memo.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `salesCreditMemoId` | <code>string</code> | Yes | The unique identifier of the sales credit memo. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bcClient->postAndSendSalesCreditMemo("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>postSalesCreditMemo</summary>

<div>

Performs the post action on a sales credit memo.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `salesCreditMemoId` | <code>string</code> | Yes | The unique identifier of the sales credit memo. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bcClient->postSalesCreditMemo("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>sendSalesCreditMemo</summary>

<div>

Performs the send action on a sales credit memo.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `salesCreditMemoId` | <code>string</code> | Yes | The unique identifier of the sales credit memo. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bcClient->sendSalesCreditMemo("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>listSalesCreditMemoLinesForSalesCreditMemo</summary>

<div>

Returns a list of sales credit memo lines for a sales credit memo.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `salesCreditMemoId` | <code>string</code> | Yes | The unique identifier of the sales credit memo. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | The number of entities to skip before returning the results. |
| `top` | <code>int</code> | No | The maximum number of entities to return. |
| `filter` | <code>string</code> | No | An OData filter expression that restricts the entities returned. |
| `'limit` | <code>int</code> | No | The maximum number of entities to return in the page. |
| `expand` | <code>("item"&#124;"account")[]</code> | No | The related entities to include in the response. |
| `'select` | <code>("id"&#124;"documentId"&#124;"sequence"&#124;"itemId"&#124;"accountId"&#124;"lineType"&#124;"lineDetails"&#124;"description"&#124;"unitOfMeasureId"&#124;"unitOfMeasure"&#124;"unitPrice"&#124;"quantity"&#124;"discountAmount"&#124;"discountPercent"&#124;"discountAppliedBeforeTax"&#124;"amountExcludingTax"&#124;"taxCode"&#124;"taxPercent"&#124;"totalTaxAmount"&#124;"amountIncludingTax"&#124;"invoiceDiscountAllocation"&#124;"netAmount"&#124;"netTaxAmount"&#124;"netAmountIncludingTax"&#124;"shipmentDate")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `SalesCreditMemoLineCollection|error`

**Sample code:**

```ballerina
bc:SalesCreditMemoLineCollection result = check bcClient->listSalesCreditMemoLinesForSalesCreditMemo("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "value": [
    {
      "discountAppliedBeforeTax": false,
      "description": "Sample description",
      "discountAmount": 100.00
    }
  ]
}
```

</div>
</details>

<details>
<summary>createSalesCreditMemoLineForSalesCreditMemo</summary>

<div>

Creates a sales credit memo line for a sales credit memo.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `salesCreditMemoId` | <code>string</code> | Yes | The unique identifier of the sales credit memo. |
| `payload` | <code>SalesCreditMemoLineRequest</code> | Yes | The sales credit memo line to create or update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `SalesCreditMemoLine|error`

**Sample code:**

```ballerina
bc:SalesCreditMemoLine result = check bcClient->createSalesCreditMemoLineForSalesCreditMemo("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    lineDetails: {
        number: "INV-0001",
        displayName: "Sample name"
    },
    discountAppliedBeforeTax: false,
    description: "Sample description",
    discountAmount: 100.00
});
```

**Sample response:**

```json
{
  "lineDetails": {
    "number": "INV-0001",
    "displayName": "Sample name"
  },
  "discountAppliedBeforeTax": false,
  "description": "Sample description",
  "discountAmount": 100.00,
  "invoiceDiscountAllocation": 100.00,
  "lineType": "string"
}
```

</div>
</details>

<details>
<summary>getSalesCreditMemoLineForSalesCreditMemo</summary>

<div>

Returns a sales credit memo line for a sales credit memo.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `salesCreditMemoId` | <code>string</code> | Yes | The unique identifier of the sales credit memo. |
| `salesCreditMemoLineId` | <code>string</code> | Yes | The unique identifier of the sales credit memo line. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>("item"&#124;"account")[]</code> | No | The related entities to include in the response. |
| `'select` | <code>("id"&#124;"documentId"&#124;"sequence"&#124;"itemId"&#124;"accountId"&#124;"lineType"&#124;"lineDetails"&#124;"description"&#124;"unitOfMeasureId"&#124;"unitOfMeasure"&#124;"unitPrice"&#124;"quantity"&#124;"discountAmount"&#124;"discountPercent"&#124;"discountAppliedBeforeTax"&#124;"amountExcludingTax"&#124;"taxCode"&#124;"taxPercent"&#124;"totalTaxAmount"&#124;"amountIncludingTax"&#124;"invoiceDiscountAllocation"&#124;"netAmount"&#124;"netTaxAmount"&#124;"netAmountIncludingTax"&#124;"shipmentDate")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `SalesCreditMemoLine|error`

**Sample code:**

```ballerina
bc:SalesCreditMemoLine result = check bcClient->getSalesCreditMemoLineForSalesCreditMemo("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "lineDetails": {
    "number": "INV-0001",
    "displayName": "Sample name"
  },
  "discountAppliedBeforeTax": false,
  "description": "Sample description",
  "discountAmount": 100.00,
  "invoiceDiscountAllocation": 100.00,
  "lineType": "string"
}
```

</div>
</details>

<details>
<summary>deleteSalesCreditMemoLineForSalesCreditMemo</summary>

<div>

Deletes a sales credit memo line for a sales credit memo.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `salesCreditMemoId` | <code>string</code> | Yes | The unique identifier of the sales credit memo. |
| `salesCreditMemoLineId` | <code>string</code> | Yes | The unique identifier of the sales credit memo line. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bcClient->deleteSalesCreditMemoLineForSalesCreditMemo("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updateSalesCreditMemoLineForSalesCreditMemo</summary>

<div>

Updates a sales credit memo line for a sales credit memo.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `salesCreditMemoId` | <code>string</code> | Yes | The unique identifier of the sales credit memo. |
| `salesCreditMemoLineId` | <code>string</code> | Yes | The unique identifier of the sales credit memo line. |
| `headers` | <code>UpdateSalesCreditMemoLineForSalesCreditMemoHeaders</code> | Yes | Request headers, including the required `ifMatch`. |
| `payload` | <code>SalesCreditMemoLineRequest</code> | Yes | The sales credit memo line to create or update. |

**Returns:** `SalesCreditMemoLine|error`

**Sample code:**

```ballerina
bc:SalesCreditMemoLine result = check bcClient->updateSalesCreditMemoLineForSalesCreditMemo("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {ifMatch: "string"}, {
    lineDetails: {
        number: "INV-0001",
        displayName: "Sample name"
    },
    discountAppliedBeforeTax: false,
    description: "Sample description",
    discountAmount: 100.00
});
```

**Sample response:**

```json
{
  "lineDetails": {
    "number": "INV-0001",
    "displayName": "Sample name"
  },
  "discountAppliedBeforeTax": false,
  "description": "Sample description",
  "discountAmount": 100.00,
  "invoiceDiscountAllocation": 100.00,
  "lineType": "string"
}
```

</div>
</details>

<details>
<summary>listPdfDocumentsForSalesCreditMemo</summary>

<div>

Returns a list of PDF documents for a sales credit memo.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `salesCreditMemoId` | <code>string</code> | Yes | The unique identifier of the sales credit memo. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | The number of entities to skip before returning the results. |
| `top` | <code>int</code> | No | The maximum number of entities to return. |
| `filter` | <code>string</code> | No | An OData filter expression that restricts the entities returned. |
| `'limit` | <code>int</code> | No | The maximum number of entities to return in the page. |
| `'select` | <code>("id"&#124;"content")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `PdfDocumentCollection|error`

**Sample code:**

```ballerina
bc:PdfDocumentCollection result = check bcClient->listPdfDocumentsForSalesCreditMemo("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "value": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "content": {
        "fileContent": "string",
        "fileName": "import.csv"
      }
    }
  ]
}
```

</div>
</details>

<details>
<summary>getPdfDocumentForSalesCreditMemo</summary>

<div>

Returns a PDF document for a sales credit memo.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `salesCreditMemoId` | <code>string</code> | Yes | The unique identifier of the sales credit memo. |
| `pdfDocumentId` | <code>string</code> | Yes | The unique identifier of the pdf document. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `'select` | <code>("id"&#124;"content")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `PdfDocument|error`

**Sample code:**

```ballerina
bc:PdfDocument result = check bcClient->getPdfDocumentForSalesCreditMemo("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "content": {
    "fileContent": "string",
    "fileName": "import.csv"
  }
}
```

</div>
</details>

#### Sales Credit Memo Lines

<details>
<summary>listSalesCreditMemoLines</summary>

<div>

Returns a list of sales credit memo lines.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | The number of entities to skip before returning the results. |
| `top` | <code>int</code> | No | The maximum number of entities to return. |
| `filter` | <code>string</code> | No | An OData filter expression that restricts the entities returned. |
| `'limit` | <code>int</code> | No | The maximum number of entities to return in the page. |
| `expand` | <code>("item"&#124;"account")[]</code> | No | The related entities to include in the response. |
| `'select` | <code>("id"&#124;"documentId"&#124;"sequence"&#124;"itemId"&#124;"accountId"&#124;"lineType"&#124;"lineDetails"&#124;"description"&#124;"unitOfMeasureId"&#124;"unitOfMeasure"&#124;"unitPrice"&#124;"quantity"&#124;"discountAmount"&#124;"discountPercent"&#124;"discountAppliedBeforeTax"&#124;"amountExcludingTax"&#124;"taxCode"&#124;"taxPercent"&#124;"totalTaxAmount"&#124;"amountIncludingTax"&#124;"invoiceDiscountAllocation"&#124;"netAmount"&#124;"netTaxAmount"&#124;"netAmountIncludingTax"&#124;"shipmentDate")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `SalesCreditMemoLineCollection|error`

**Sample code:**

```ballerina
bc:SalesCreditMemoLineCollection result = check bcClient->listSalesCreditMemoLines("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "value": [
    {
      "discountAppliedBeforeTax": false,
      "description": "Sample description",
      "discountAmount": 100.00
    }
  ]
}
```

</div>
</details>

<details>
<summary>createSalesCreditMemoLine</summary>

<div>

Creates a sales credit memo line.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `payload` | <code>SalesCreditMemoLineRequest</code> | Yes | The sales credit memo line to create or update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `SalesCreditMemoLine|error`

**Sample code:**

```ballerina
bc:SalesCreditMemoLine result = check bcClient->createSalesCreditMemoLine("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    lineDetails: {
        number: "INV-0001",
        displayName: "Sample name"
    },
    discountAppliedBeforeTax: false,
    description: "Sample description",
    discountAmount: 100.00
});
```

**Sample response:**

```json
{
  "lineDetails": {
    "number": "INV-0001",
    "displayName": "Sample name"
  },
  "discountAppliedBeforeTax": false,
  "description": "Sample description",
  "discountAmount": 100.00,
  "invoiceDiscountAllocation": 100.00,
  "lineType": "string"
}
```

</div>
</details>

<details>
<summary>getSalesCreditMemoLine</summary>

<div>

Returns a sales credit memo line.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `salesCreditMemoLineId` | <code>string</code> | Yes | The unique identifier of the sales credit memo line. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>("item"&#124;"account")[]</code> | No | The related entities to include in the response. |
| `'select` | <code>("id"&#124;"documentId"&#124;"sequence"&#124;"itemId"&#124;"accountId"&#124;"lineType"&#124;"lineDetails"&#124;"description"&#124;"unitOfMeasureId"&#124;"unitOfMeasure"&#124;"unitPrice"&#124;"quantity"&#124;"discountAmount"&#124;"discountPercent"&#124;"discountAppliedBeforeTax"&#124;"amountExcludingTax"&#124;"taxCode"&#124;"taxPercent"&#124;"totalTaxAmount"&#124;"amountIncludingTax"&#124;"invoiceDiscountAllocation"&#124;"netAmount"&#124;"netTaxAmount"&#124;"netAmountIncludingTax"&#124;"shipmentDate")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `SalesCreditMemoLine|error`

**Sample code:**

```ballerina
bc:SalesCreditMemoLine result = check bcClient->getSalesCreditMemoLine("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "lineDetails": {
    "number": "INV-0001",
    "displayName": "Sample name"
  },
  "discountAppliedBeforeTax": false,
  "description": "Sample description",
  "discountAmount": 100.00,
  "invoiceDiscountAllocation": 100.00,
  "lineType": "string"
}
```

</div>
</details>

<details>
<summary>deleteSalesCreditMemoLine</summary>

<div>

Deletes a sales credit memo line.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `salesCreditMemoLineId` | <code>string</code> | Yes | The unique identifier of the sales credit memo line. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bcClient->deleteSalesCreditMemoLine("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updateSalesCreditMemoLine</summary>

<div>

Updates a sales credit memo line.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `salesCreditMemoLineId` | <code>string</code> | Yes | The unique identifier of the sales credit memo line. |
| `headers` | <code>UpdateSalesCreditMemoLineHeaders</code> | Yes | Request headers, including the required `ifMatch`. |
| `payload` | <code>SalesCreditMemoLineRequest</code> | Yes | The sales credit memo line to create or update. |

**Returns:** `SalesCreditMemoLine|error`

**Sample code:**

```ballerina
bc:SalesCreditMemoLine result = check bcClient->updateSalesCreditMemoLine("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {ifMatch: "string"}, {
    lineDetails: {
        number: "INV-0001",
        displayName: "Sample name"
    },
    discountAppliedBeforeTax: false,
    description: "Sample description",
    discountAmount: 100.00
});
```

**Sample response:**

```json
{
  "lineDetails": {
    "number": "INV-0001",
    "displayName": "Sample name"
  },
  "discountAppliedBeforeTax": false,
  "description": "Sample description",
  "discountAmount": 100.00,
  "invoiceDiscountAllocation": 100.00,
  "lineType": "string"
}
```

</div>
</details>

#### General Ledger Entry Attachments

<details>
<summary>listGeneralLedgerEntryAttachments</summary>

<div>

Returns a list of general ledger entry attachments.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | The number of entities to skip before returning the results. |
| `top` | <code>int</code> | No | The maximum number of entities to return. |
| `filter` | <code>string</code> | No | An OData filter expression that restricts the entities returned. |
| `'limit` | <code>int</code> | No | The maximum number of entities to return in the page. |
| `expand` | <code>("generalLedgerEntry")[]</code> | No | The related entities to include in the response. |
| `'select` | <code>("generalLedgerEntryNumber"&#124;"id"&#124;"fileName"&#124;"byteSize"&#124;"content"&#124;"createdDateTime")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `GeneralLedgerEntryAttachmentCollection|error`

**Sample code:**

```ballerina
bc:GeneralLedgerEntryAttachmentCollection result = check bcClient->listGeneralLedgerEntryAttachments("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "value": [
    {
      "fileName": "import.csv",
      "byteSize": 1,
      "createdDateTime": "2026-01-15T00:00:00"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createGeneralLedgerEntryAttachment</summary>

<div>

Creates a general ledger entry attachment.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `payload` | <code>GeneralLedgerEntryAttachmentsRequest</code> | Yes | The general ledger entry attachments to create or update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `GeneralLedgerEntryAttachments|error`

**Sample code:**

```ballerina
bc:GeneralLedgerEntryAttachments result = check bcClient->createGeneralLedgerEntryAttachment("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    fileName: "import.csv",
    byteSize: 1,
    createdDateTime: "2026-01-15T00:00:00",
    generalLedgerEntryNumber: 1
});
```

**Sample response:**

```json
{
  "generalLedgerEntry": {
    "accountId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "lastModifiedDateTime": "2026-01-15T00:00:00",
    "documentType": "string"
  },
  "fileName": "import.csv",
  "byteSize": 1,
  "createdDateTime": "2026-01-15T00:00:00",
  "generalLedgerEntryNumber": 1,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>getGeneralLedgerEntryAttachment</summary>

<div>

Returns a general ledger entry attachment.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `generalLedgerEntryAttachmentsGeneralLedgerEntryNumber` | <code>int:Signed32</code> | Yes | The general ledger entry number of the general ledger entry attachments. |
| `generalLedgerEntryAttachmentsId` | <code>string</code> | Yes | The unique identifier of the general ledger entry attachments. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>("generalLedgerEntry")[]</code> | No | The related entities to include in the response. |
| `'select` | <code>("generalLedgerEntryNumber"&#124;"id"&#124;"fileName"&#124;"byteSize"&#124;"content"&#124;"createdDateTime")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `GeneralLedgerEntryAttachments|error`

**Sample code:**

```ballerina
bc:GeneralLedgerEntryAttachments result = check bcClient->getGeneralLedgerEntryAttachment("3fa85f64-5717-4562-b3fc-2c963f66afa6", 1, "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "generalLedgerEntry": {
    "accountId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "lastModifiedDateTime": "2026-01-15T00:00:00",
    "documentType": "string"
  },
  "fileName": "import.csv",
  "byteSize": 1,
  "createdDateTime": "2026-01-15T00:00:00",
  "generalLedgerEntryNumber": 1,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>deleteGeneralLedgerEntryAttachment</summary>

<div>

Deletes a general ledger entry attachment.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `generalLedgerEntryAttachmentsGeneralLedgerEntryNumber` | <code>int:Signed32</code> | Yes | The general ledger entry number of the general ledger entry attachments. |
| `generalLedgerEntryAttachmentsId` | <code>string</code> | Yes | The unique identifier of the general ledger entry attachments. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bcClient->deleteGeneralLedgerEntryAttachment("3fa85f64-5717-4562-b3fc-2c963f66afa6", 1, "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updateGeneralLedgerEntryAttachment</summary>

<div>

Updates a general ledger entry attachment.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `generalLedgerEntryAttachmentsGeneralLedgerEntryNumber` | <code>int:Signed32</code> | Yes | The general ledger entry number of the general ledger entry attachments. |
| `generalLedgerEntryAttachmentsId` | <code>string</code> | Yes | The unique identifier of the general ledger entry attachments. |
| `headers` | <code>UpdateGeneralLedgerEntryAttachmentHeaders</code> | Yes | Request headers, including the required `ifMatch`. |
| `payload` | <code>GeneralLedgerEntryAttachmentsRequest</code> | Yes | The general ledger entry attachments to create or update. |

**Returns:** `GeneralLedgerEntryAttachments|error`

**Sample code:**

```ballerina
bc:GeneralLedgerEntryAttachments result = check bcClient->updateGeneralLedgerEntryAttachment("3fa85f64-5717-4562-b3fc-2c963f66afa6", 1, "3fa85f64-5717-4562-b3fc-2c963f66afa6", {ifMatch: "string"}, {
    fileName: "import.csv",
    byteSize: 1,
    createdDateTime: "2026-01-15T00:00:00",
    generalLedgerEntryNumber: 1
});
```

**Sample response:**

```json
{
  "generalLedgerEntry": {
    "accountId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "lastModifiedDateTime": "2026-01-15T00:00:00",
    "documentType": "string"
  },
  "fileName": "import.csv",
  "byteSize": 1,
  "createdDateTime": "2026-01-15T00:00:00",
  "generalLedgerEntryNumber": 1,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

#### Purchase Invoices

<details>
<summary>listPurchaseInvoices</summary>

<div>

Returns a list of purchase invoices.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | The number of entities to skip before returning the results. |
| `top` | <code>int</code> | No | The maximum number of entities to return. |
| `filter` | <code>string</code> | No | An OData filter expression that restricts the entities returned. |
| `'limit` | <code>int</code> | No | The maximum number of entities to return in the page. |
| `expand` | <code>("purchaseInvoiceLines"&#124;"pdfDocument"&#124;"vendor"&#124;"currency")[]</code> | No | The related entities to include in the response. |
| `'select` | <code>("id"&#124;"number"&#124;"invoiceDate"&#124;"dueDate"&#124;"vendorInvoiceNumber"&#124;"vendorId"&#124;"vendorNumber"&#124;"vendorName"&#124;"payToName"&#124;"payToContact"&#124;"payToVendorId"&#124;"payToVendorNumber"&#124;"shipToName"&#124;"shipToContact"&#124;"buyFromAddress"&#124;"payToAddress"&#124;"shipToAddress"&#124;"currencyId"&#124;"currencyCode"&#124;"pricesIncludeTax"&#124;"discountAmount"&#124;"discountAppliedBeforeTax"&#124;"totalAmountExcludingTax"&#124;"totalTaxAmount"&#124;"totalAmountIncludingTax"&#124;"status"&#124;"lastModifiedDateTime")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `PurchaseInvoiceCollection|error`

**Sample code:**

```ballerina
bc:PurchaseInvoiceCollection result = check bcClient->listPurchaseInvoices("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "value": [
    {
      "payToContact": "string",
      "payToName": "Sample name",
      "payToVendorId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createPurchaseInvoice</summary>

<div>

Creates a purchase invoice.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `payload` | <code>PurchaseInvoiceRequest</code> | Yes | The purchase invoice to create or update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PurchaseInvoice|error`

**Sample code:**

```ballerina
bc:PurchaseInvoice result = check bcClient->createPurchaseInvoice("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    payToContact: "string",
    shipToAddress: {
        city: "string",
        street: "string",
        countryLetterCode: "200"
    },
    payToName: "Sample name",
    payToVendorId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "payToContact": "string",
  "shipToAddress": {
    "city": "string",
    "street": "string",
    "countryLetterCode": "200"
  },
  "payToName": "Sample name",
  "payToVendorId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "discountAppliedBeforeTax": false
}
```

</div>
</details>

<details>
<summary>getPurchaseInvoice</summary>

<div>

Returns a purchase invoice.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `purchaseInvoiceId` | <code>string</code> | Yes | The unique identifier of the purchase invoice. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>("purchaseInvoiceLines"&#124;"pdfDocument"&#124;"vendor"&#124;"currency")[]</code> | No | The related entities to include in the response. |
| `'select` | <code>("id"&#124;"number"&#124;"invoiceDate"&#124;"dueDate"&#124;"vendorInvoiceNumber"&#124;"vendorId"&#124;"vendorNumber"&#124;"vendorName"&#124;"payToName"&#124;"payToContact"&#124;"payToVendorId"&#124;"payToVendorNumber"&#124;"shipToName"&#124;"shipToContact"&#124;"buyFromAddress"&#124;"payToAddress"&#124;"shipToAddress"&#124;"currencyId"&#124;"currencyCode"&#124;"pricesIncludeTax"&#124;"discountAmount"&#124;"discountAppliedBeforeTax"&#124;"totalAmountExcludingTax"&#124;"totalTaxAmount"&#124;"totalAmountIncludingTax"&#124;"status"&#124;"lastModifiedDateTime")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `PurchaseInvoice|error`

**Sample code:**

```ballerina
bc:PurchaseInvoice result = check bcClient->getPurchaseInvoice("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "payToContact": "string",
  "shipToAddress": {
    "city": "string",
    "street": "string",
    "countryLetterCode": "200"
  },
  "payToName": "Sample name",
  "payToVendorId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "discountAppliedBeforeTax": false
}
```

</div>
</details>

<details>
<summary>deletePurchaseInvoice</summary>

<div>

Deletes a purchase invoice.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `purchaseInvoiceId` | <code>string</code> | Yes | The unique identifier of the purchase invoice. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bcClient->deletePurchaseInvoice("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updatePurchaseInvoice</summary>

<div>

Updates a purchase invoice.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `purchaseInvoiceId` | <code>string</code> | Yes | The unique identifier of the purchase invoice. |
| `headers` | <code>UpdatePurchaseInvoiceHeaders</code> | Yes | Request headers, including the required `ifMatch`. |
| `payload` | <code>PurchaseInvoiceRequest</code> | Yes | The purchase invoice to create or update. |

**Returns:** `PurchaseInvoice|error`

**Sample code:**

```ballerina
bc:PurchaseInvoice result = check bcClient->updatePurchaseInvoice("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {ifMatch: "string"}, {
    payToContact: "string",
    shipToAddress: {
        city: "string",
        street: "string",
        countryLetterCode: "200"
    },
    payToName: "Sample name",
    payToVendorId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "payToContact": "string",
  "shipToAddress": {
    "city": "string",
    "street": "string",
    "countryLetterCode": "200"
  },
  "payToName": "Sample name",
  "payToVendorId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "discountAppliedBeforeTax": false
}
```

</div>
</details>

<details>
<summary>postPurchaseInvoice</summary>

<div>

Performs the post action on a purchase invoice.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `purchaseInvoiceId` | <code>string</code> | Yes | The unique identifier of the purchase invoice. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bcClient->postPurchaseInvoice("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>listPurchaseInvoiceLinesForPurchaseInvoice</summary>

<div>

Returns a list of purchase invoice lines for a purchase invoice.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `purchaseInvoiceId` | <code>string</code> | Yes | The unique identifier of the purchase invoice. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | The number of entities to skip before returning the results. |
| `top` | <code>int</code> | No | The maximum number of entities to return. |
| `filter` | <code>string</code> | No | An OData filter expression that restricts the entities returned. |
| `'limit` | <code>int</code> | No | The maximum number of entities to return in the page. |
| `expand` | <code>("item"&#124;"account")[]</code> | No | The related entities to include in the response. |
| `'select` | <code>("id"&#124;"documentId"&#124;"sequence"&#124;"itemId"&#124;"accountId"&#124;"lineType"&#124;"lineDetails"&#124;"description"&#124;"unitOfMeasure"&#124;"unitCost"&#124;"quantity"&#124;"discountAmount"&#124;"discountPercent"&#124;"discountAppliedBeforeTax"&#124;"amountExcludingTax"&#124;"taxCode"&#124;"taxPercent"&#124;"totalTaxAmount"&#124;"amountIncludingTax"&#124;"invoiceDiscountAllocation"&#124;"netAmount"&#124;"netTaxAmount"&#124;"netAmountIncludingTax"&#124;"expectedReceiptDate")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `PurchaseInvoiceLineCollection|error`

**Sample code:**

```ballerina
bc:PurchaseInvoiceLineCollection result = check bcClient->listPurchaseInvoiceLinesForPurchaseInvoice("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "value": [
    {
      "discountAppliedBeforeTax": false,
      "description": "Sample description",
      "discountAmount": 100.00
    }
  ]
}
```

</div>
</details>

<details>
<summary>createPurchaseInvoiceLineForPurchaseInvoice</summary>

<div>

Creates a purchase invoice line for a purchase invoice.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `purchaseInvoiceId` | <code>string</code> | Yes | The unique identifier of the purchase invoice. |
| `payload` | <code>PurchaseInvoiceLineRequest</code> | Yes | The purchase invoice line to create or update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PurchaseInvoiceLine|error`

**Sample code:**

```ballerina
bc:PurchaseInvoiceLine result = check bcClient->createPurchaseInvoiceLineForPurchaseInvoice("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    quantity: 100.00,
    discountPercent: 100.00,
    lineDetails: {
        number: "INV-0001",
        displayName: "Sample name"
    },
    unitOfMeasure: {
        symbol: "string",
        code: "200",
        displayName: "Sample name"
    }
});
```

**Sample response:**

```json
{
  "lineDetails": {
    "number": "INV-0001",
    "displayName": "Sample name"
  },
  "discountAppliedBeforeTax": false,
  "description": "Sample description",
  "discountAmount": 100.00,
  "invoiceDiscountAllocation": 100.00,
  "lineType": "string"
}
```

</div>
</details>

<details>
<summary>getPurchaseInvoiceLineForPurchaseInvoice</summary>

<div>

Returns a purchase invoice line for a purchase invoice.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `purchaseInvoiceId` | <code>string</code> | Yes | The unique identifier of the purchase invoice. |
| `purchaseInvoiceLineId` | <code>string</code> | Yes | The unique identifier of the purchase invoice line. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>("item"&#124;"account")[]</code> | No | The related entities to include in the response. |
| `'select` | <code>("id"&#124;"documentId"&#124;"sequence"&#124;"itemId"&#124;"accountId"&#124;"lineType"&#124;"lineDetails"&#124;"description"&#124;"unitOfMeasure"&#124;"unitCost"&#124;"quantity"&#124;"discountAmount"&#124;"discountPercent"&#124;"discountAppliedBeforeTax"&#124;"amountExcludingTax"&#124;"taxCode"&#124;"taxPercent"&#124;"totalTaxAmount"&#124;"amountIncludingTax"&#124;"invoiceDiscountAllocation"&#124;"netAmount"&#124;"netTaxAmount"&#124;"netAmountIncludingTax"&#124;"expectedReceiptDate")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `PurchaseInvoiceLine|error`

**Sample code:**

```ballerina
bc:PurchaseInvoiceLine result = check bcClient->getPurchaseInvoiceLineForPurchaseInvoice("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "lineDetails": {
    "number": "INV-0001",
    "displayName": "Sample name"
  },
  "discountAppliedBeforeTax": false,
  "description": "Sample description",
  "discountAmount": 100.00,
  "invoiceDiscountAllocation": 100.00,
  "lineType": "string"
}
```

</div>
</details>

<details>
<summary>deletePurchaseInvoiceLineForPurchaseInvoice</summary>

<div>

Deletes a purchase invoice line for a purchase invoice.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `purchaseInvoiceId` | <code>string</code> | Yes | The unique identifier of the purchase invoice. |
| `purchaseInvoiceLineId` | <code>string</code> | Yes | The unique identifier of the purchase invoice line. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bcClient->deletePurchaseInvoiceLineForPurchaseInvoice("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updatePurchaseInvoiceLineForPurchaseInvoice</summary>

<div>

Updates a purchase invoice line for a purchase invoice.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `purchaseInvoiceId` | <code>string</code> | Yes | The unique identifier of the purchase invoice. |
| `purchaseInvoiceLineId` | <code>string</code> | Yes | The unique identifier of the purchase invoice line. |
| `headers` | <code>UpdatePurchaseInvoiceLineForPurchaseInvoiceHeaders</code> | Yes | Request headers, including the required `ifMatch`. |
| `payload` | <code>PurchaseInvoiceLineRequest</code> | Yes | The purchase invoice line to create or update. |

**Returns:** `PurchaseInvoiceLine|error`

**Sample code:**

```ballerina
bc:PurchaseInvoiceLine result = check bcClient->updatePurchaseInvoiceLineForPurchaseInvoice("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {ifMatch: "string"}, {
    quantity: 100.00,
    discountPercent: 100.00,
    lineDetails: {
        number: "INV-0001",
        displayName: "Sample name"
    },
    unitOfMeasure: {
        symbol: "string",
        code: "200",
        displayName: "Sample name"
    }
});
```

**Sample response:**

```json
{
  "lineDetails": {
    "number": "INV-0001",
    "displayName": "Sample name"
  },
  "discountAppliedBeforeTax": false,
  "description": "Sample description",
  "discountAmount": 100.00,
  "invoiceDiscountAllocation": 100.00,
  "lineType": "string"
}
```

</div>
</details>

<details>
<summary>listPdfDocumentsForPurchaseInvoice</summary>

<div>

Returns a list of PDF documents for a purchase invoice.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `purchaseInvoiceId` | <code>string</code> | Yes | The unique identifier of the purchase invoice. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | The number of entities to skip before returning the results. |
| `top` | <code>int</code> | No | The maximum number of entities to return. |
| `filter` | <code>string</code> | No | An OData filter expression that restricts the entities returned. |
| `'limit` | <code>int</code> | No | The maximum number of entities to return in the page. |
| `'select` | <code>("id"&#124;"content")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `PdfDocumentCollection|error`

**Sample code:**

```ballerina
bc:PdfDocumentCollection result = check bcClient->listPdfDocumentsForPurchaseInvoice("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "value": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "content": {
        "fileContent": "string",
        "fileName": "import.csv"
      }
    }
  ]
}
```

</div>
</details>

<details>
<summary>getPdfDocumentForPurchaseInvoice</summary>

<div>

Returns a PDF document for a purchase invoice.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `purchaseInvoiceId` | <code>string</code> | Yes | The unique identifier of the purchase invoice. |
| `pdfDocumentId` | <code>string</code> | Yes | The unique identifier of the pdf document. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `'select` | <code>("id"&#124;"content")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `PdfDocument|error`

**Sample code:**

```ballerina
bc:PdfDocument result = check bcClient->getPdfDocumentForPurchaseInvoice("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "content": {
    "fileContent": "string",
    "fileName": "import.csv"
  }
}
```

</div>
</details>

#### Purchase Invoice Lines

<details>
<summary>listPurchaseInvoiceLines</summary>

<div>

Returns a list of purchase invoice lines.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | The number of entities to skip before returning the results. |
| `top` | <code>int</code> | No | The maximum number of entities to return. |
| `filter` | <code>string</code> | No | An OData filter expression that restricts the entities returned. |
| `'limit` | <code>int</code> | No | The maximum number of entities to return in the page. |
| `expand` | <code>("item"&#124;"account")[]</code> | No | The related entities to include in the response. |
| `'select` | <code>("id"&#124;"documentId"&#124;"sequence"&#124;"itemId"&#124;"accountId"&#124;"lineType"&#124;"lineDetails"&#124;"description"&#124;"unitOfMeasure"&#124;"unitCost"&#124;"quantity"&#124;"discountAmount"&#124;"discountPercent"&#124;"discountAppliedBeforeTax"&#124;"amountExcludingTax"&#124;"taxCode"&#124;"taxPercent"&#124;"totalTaxAmount"&#124;"amountIncludingTax"&#124;"invoiceDiscountAllocation"&#124;"netAmount"&#124;"netTaxAmount"&#124;"netAmountIncludingTax"&#124;"expectedReceiptDate")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `PurchaseInvoiceLineCollection|error`

**Sample code:**

```ballerina
bc:PurchaseInvoiceLineCollection result = check bcClient->listPurchaseInvoiceLines("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "value": [
    {
      "discountAppliedBeforeTax": false,
      "description": "Sample description",
      "discountAmount": 100.00
    }
  ]
}
```

</div>
</details>

<details>
<summary>createPurchaseInvoiceLine</summary>

<div>

Creates a purchase invoice line.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `payload` | <code>PurchaseInvoiceLineRequest</code> | Yes | The purchase invoice line to create or update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PurchaseInvoiceLine|error`

**Sample code:**

```ballerina
bc:PurchaseInvoiceLine result = check bcClient->createPurchaseInvoiceLine("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    quantity: 100.00,
    discountPercent: 100.00,
    lineDetails: {
        number: "INV-0001",
        displayName: "Sample name"
    },
    unitOfMeasure: {
        symbol: "string",
        code: "200",
        displayName: "Sample name"
    }
});
```

**Sample response:**

```json
{
  "lineDetails": {
    "number": "INV-0001",
    "displayName": "Sample name"
  },
  "discountAppliedBeforeTax": false,
  "description": "Sample description",
  "discountAmount": 100.00,
  "invoiceDiscountAllocation": 100.00,
  "lineType": "string"
}
```

</div>
</details>

<details>
<summary>getPurchaseInvoiceLine</summary>

<div>

Returns a purchase invoice line.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `purchaseInvoiceLineId` | <code>string</code> | Yes | The unique identifier of the purchase invoice line. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>("item"&#124;"account")[]</code> | No | The related entities to include in the response. |
| `'select` | <code>("id"&#124;"documentId"&#124;"sequence"&#124;"itemId"&#124;"accountId"&#124;"lineType"&#124;"lineDetails"&#124;"description"&#124;"unitOfMeasure"&#124;"unitCost"&#124;"quantity"&#124;"discountAmount"&#124;"discountPercent"&#124;"discountAppliedBeforeTax"&#124;"amountExcludingTax"&#124;"taxCode"&#124;"taxPercent"&#124;"totalTaxAmount"&#124;"amountIncludingTax"&#124;"invoiceDiscountAllocation"&#124;"netAmount"&#124;"netTaxAmount"&#124;"netAmountIncludingTax"&#124;"expectedReceiptDate")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `PurchaseInvoiceLine|error`

**Sample code:**

```ballerina
bc:PurchaseInvoiceLine result = check bcClient->getPurchaseInvoiceLine("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "lineDetails": {
    "number": "INV-0001",
    "displayName": "Sample name"
  },
  "discountAppliedBeforeTax": false,
  "description": "Sample description",
  "discountAmount": 100.00,
  "invoiceDiscountAllocation": 100.00,
  "lineType": "string"
}
```

</div>
</details>

<details>
<summary>deletePurchaseInvoiceLine</summary>

<div>

Deletes a purchase invoice line.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `purchaseInvoiceLineId` | <code>string</code> | Yes | The unique identifier of the purchase invoice line. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bcClient->deletePurchaseInvoiceLine("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updatePurchaseInvoiceLine</summary>

<div>

Updates a purchase invoice line.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `purchaseInvoiceLineId` | <code>string</code> | Yes | The unique identifier of the purchase invoice line. |
| `headers` | <code>UpdatePurchaseInvoiceLineHeaders</code> | Yes | Request headers, including the required `ifMatch`. |
| `payload` | <code>PurchaseInvoiceLineRequest</code> | Yes | The purchase invoice line to create or update. |

**Returns:** `PurchaseInvoiceLine|error`

**Sample code:**

```ballerina
bc:PurchaseInvoiceLine result = check bcClient->updatePurchaseInvoiceLine("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {ifMatch: "string"}, {
    quantity: 100.00,
    discountPercent: 100.00,
    lineDetails: {
        number: "INV-0001",
        displayName: "Sample name"
    },
    unitOfMeasure: {
        symbol: "string",
        code: "200",
        displayName: "Sample name"
    }
});
```

**Sample response:**

```json
{
  "lineDetails": {
    "number": "INV-0001",
    "displayName": "Sample name"
  },
  "discountAppliedBeforeTax": false,
  "description": "Sample description",
  "discountAmount": 100.00,
  "invoiceDiscountAllocation": 100.00,
  "lineType": "string"
}
```

</div>
</details>

#### Projects

<details>
<summary>listProjects</summary>

<div>

Returns a list of projects.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | The number of entities to skip before returning the results. |
| `top` | <code>int</code> | No | The maximum number of entities to return. |
| `filter` | <code>string</code> | No | An OData filter expression that restricts the entities returned. |
| `'limit` | <code>int</code> | No | The maximum number of entities to return in the page. |
| `'select` | <code>("id"&#124;"number"&#124;"displayName")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `ProjectCollection|error`

**Sample code:**

```ballerina
bc:ProjectCollection result = check bcClient->listProjects("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "value": [
    {
      "number": "INV-0001",
      "displayName": "Sample name",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createProject</summary>

<div>

Creates a project.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `payload` | <code>ProjectRequest</code> | Yes | The project to create or update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Project|error`

**Sample code:**

```ballerina
bc:Project result = check bcClient->createProject("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    number: "INV-0001",
    displayName: "Sample name",
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "number": "INV-0001",
  "displayName": "Sample name",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>getProject</summary>

<div>

Returns a project.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `projectId` | <code>string</code> | Yes | The unique identifier of the project. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `'select` | <code>("id"&#124;"number"&#124;"displayName")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `Project|error`

**Sample code:**

```ballerina
bc:Project result = check bcClient->getProject("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "number": "INV-0001",
  "displayName": "Sample name",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>deleteProject</summary>

<div>

Deletes a project.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `projectId` | <code>string</code> | Yes | The unique identifier of the project. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bcClient->deleteProject("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updateProject</summary>

<div>

Updates a project.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `projectId` | <code>string</code> | Yes | The unique identifier of the project. |
| `headers` | <code>UpdateProjectHeaders</code> | Yes | Request headers, including the required `ifMatch`. |
| `payload` | <code>ProjectRequest</code> | Yes | The project to create or update. |

**Returns:** `Project|error`

**Sample code:**

```ballerina
bc:Project result = check bcClient->updateProject("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {ifMatch: "string"}, {
    number: "INV-0001",
    displayName: "Sample name",
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "number": "INV-0001",
  "displayName": "Sample name",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

#### Bank Accounts

<details>
<summary>listBankAccounts</summary>

<div>

Returns a list of bank accounts.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | The number of entities to skip before returning the results. |
| `top` | <code>int</code> | No | The maximum number of entities to return. |
| `filter` | <code>string</code> | No | An OData filter expression that restricts the entities returned. |
| `'limit` | <code>int</code> | No | The maximum number of entities to return in the page. |
| `'select` | <code>("id"&#124;"number"&#124;"displayName")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `BankAccountCollection|error`

**Sample code:**

```ballerina
bc:BankAccountCollection result = check bcClient->listBankAccounts("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "value": [
    {
      "number": "INV-0001",
      "displayName": "Sample name",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createBankAccount</summary>

<div>

Creates a bank account.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `payload` | <code>BankAccountRequest</code> | Yes | The bank account to create or update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `BankAccount|error`

**Sample code:**

```ballerina
bc:BankAccount result = check bcClient->createBankAccount("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    number: "INV-0001",
    displayName: "Sample name",
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "number": "INV-0001",
  "displayName": "Sample name",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>getBankAccount</summary>

<div>

Returns a bank account.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `bankAccountId` | <code>string</code> | Yes | The unique identifier of the bank account. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `'select` | <code>("id"&#124;"number"&#124;"displayName")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `BankAccount|error`

**Sample code:**

```ballerina
bc:BankAccount result = check bcClient->getBankAccount("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "number": "INV-0001",
  "displayName": "Sample name",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>deleteBankAccount</summary>

<div>

Deletes a bank account.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `bankAccountId` | <code>string</code> | Yes | The unique identifier of the bank account. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bcClient->deleteBankAccount("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updateBankAccount</summary>

<div>

Updates a bank account.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `bankAccountId` | <code>string</code> | Yes | The unique identifier of the bank account. |
| `headers` | <code>UpdateBankAccountHeaders</code> | Yes | Request headers, including the required `ifMatch`. |
| `payload` | <code>BankAccountRequest</code> | Yes | The bank account to create or update. |

**Returns:** `BankAccount|error`

**Sample code:**

```ballerina
bc:BankAccount result = check bcClient->updateBankAccount("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {ifMatch: "string"}, {
    number: "INV-0001",
    displayName: "Sample name",
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "number": "INV-0001",
  "displayName": "Sample name",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

#### Customer Sales

<details>
<summary>listCustomerSales</summary>

<div>

Returns a list of customer sales records.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | The number of entities to skip before returning the results. |
| `top` | <code>int</code> | No | The maximum number of entities to return. |
| `filter` | <code>string</code> | No | An OData filter expression that restricts the entities returned. |
| `'limit` | <code>int</code> | No | The maximum number of entities to return in the page. |
| `'select` | <code>("customerId"&#124;"customerNumber"&#124;"name"&#124;"totalSalesAmount"&#124;"dateFilter_FilterOnly")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `CustomerSaleCollection|error`

**Sample code:**

```ballerina
bc:CustomerSaleCollection result = check bcClient->listCustomerSales("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "value": [
    {
      "customerId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "name": "Sample name",
      "dateFilter_FilterOnly": "2026-01-15T00:00:00"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getCustomerSale</summary>

<div>

Returns a customer sales record.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `customerSaleCustomerId` | <code>string</code> | Yes | The customer id of the customer sale. |
| `customerSaleCustomerNumber` | <code>string</code> | Yes | The customer number of the customer sale. |
| `customerSaleName` | <code>string</code> | Yes | The name of the customer sale. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `'select` | <code>("customerId"&#124;"customerNumber"&#124;"name"&#124;"totalSalesAmount"&#124;"dateFilter_FilterOnly")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `CustomerSale|error`

**Sample code:**

```ballerina
bc:CustomerSale result = check bcClient->getCustomerSale("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "INV-0001", "Sample name");
```

**Sample response:**

```json
{
  "customerId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "name": "Sample name",
  "dateFilter_FilterOnly": "2026-01-15T00:00:00",
  "customerNumber": "INV-0001",
  "totalSalesAmount": 100.00
}
```

</div>
</details>

#### Vendor Purchases

<details>
<summary>listVendorPurchases</summary>

<div>

Returns a list of vendor purchase records.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | The number of entities to skip before returning the results. |
| `top` | <code>int</code> | No | The maximum number of entities to return. |
| `filter` | <code>string</code> | No | An OData filter expression that restricts the entities returned. |
| `'limit` | <code>int</code> | No | The maximum number of entities to return in the page. |
| `'select` | <code>("vendorId"&#124;"vendorNumber"&#124;"name"&#124;"totalPurchaseAmount"&#124;"dateFilter_FilterOnly")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `VendorPurchaseCollection|error`

**Sample code:**

```ballerina
bc:VendorPurchaseCollection result = check bcClient->listVendorPurchases("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "value": [
    {
      "name": "Sample name",
      "vendorId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "dateFilter_FilterOnly": "2026-01-15T00:00:00"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getVendorPurchase</summary>

<div>

Returns a vendor purchase record.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | <code>string</code> | Yes | The unique identifier of the company. |
| `vendorPurchaseVendorId` | <code>string</code> | Yes | The vendor id of the vendor purchase. |
| `vendorPurchaseVendorNumber` | <code>string</code> | Yes | The vendor number of the vendor purchase. |
| `vendorPurchaseName` | <code>string</code> | Yes | The name of the vendor purchase. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `'select` | <code>("vendorId"&#124;"vendorNumber"&#124;"name"&#124;"totalPurchaseAmount"&#124;"dateFilter_FilterOnly")[]</code> | No | The properties to include in the returned entities. |

**Returns:** `VendorPurchase|error`

**Sample code:**

```ballerina
bc:VendorPurchase result = check bcClient->getVendorPurchase("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "INV-0001", "Sample name");
```

**Sample response:**

```json
{
  "name": "Sample name",
  "vendorId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "dateFilter_FilterOnly": "2026-01-15T00:00:00",
  "vendorNumber": "INV-0001",
  "totalPurchaseAmount": 100.00
}
```

</div>
</details>
