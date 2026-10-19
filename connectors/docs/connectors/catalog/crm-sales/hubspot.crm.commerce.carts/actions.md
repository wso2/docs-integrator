---
title: Actions
---

# Actions

The `ballerinax/hubspot.crm.commerce.carts` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Manages HubSpot cart objects: CRUD, search, and batch operations via the HubSpot CRM v3 API. |

---

## Client

Manages HubSpot cart objects: CRUD, search, and batch operations via the HubSpot CRM v3 API.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `http:BearerTokenConfig&#124;OAuth2RefreshTokenGrantConfig&#124;ApiKeysConfig` | Required | Authentication configuration: OAuth 2.0 refresh token, bearer token, or HubSpot private app API keys. |
| `httpVersion` | `HttpVersion` | `HTTP_2_0` | HTTP protocol version. |
| `timeout` | `decimal` | `30` | Request timeout in seconds. |
| `retryConfig` | `RetryConfig` | `()` | Retry configuration for failed requests. |
| `secureSocket` | `ClientSecureSocket` | `()` | SSL/TLS configuration. |
| `proxy` | `ProxyConfig` | `()` | Proxy server configuration. |
| `compression` | `Compression` | `COMPRESSION_AUTO` | HTTP compression setting. |
| `circuitBreaker` | `CircuitBreakerConfig` | `()` | Circuit breaker configuration for fault tolerance. |
| `cache` | `CacheConfig` | `{}` | HTTP response cache configuration. |

### Initializing the client

```ballerina
import ballerina/oauth2;
import ballerinax/hubspot.crm.commerce.carts as hscarts;

configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string refreshToken = ?;

hscarts:ConnectionConfig config = {
    auth: {
        clientId,
        clientSecret,
        refreshToken,
        credentialBearer: oauth2:POST_BODY_BEARER
    }
};
final hscarts:Client hubspotCarts = check new (config);
```

### Operations

#### Cart CRUD

<details>
<summary>List carts</summary>

Signature: `get /carts`

Retrieves a paginated list of cart objects, optionally including associations and property history.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string&#124;string[]>` | No | Optional HTTP headers. |
| `queries.limit` | `int:Signed32` | No | Maximum number of results per page (default `10`). |
| `queries.after` | `string` | No | Cursor token for the next page of results. |
| `queries.properties` | `string[]` | No | List of property names to include in the response. |
| `queries.propertiesWithHistory` | `string[]` | No | List of property names to include with their change history. |
| `queries.associations` | `string[]` | No | List of association types to retrieve with each cart. |
| `queries.archived` | `boolean` | No | Whether to return archived carts (default `false`). |

Returns: `CollectionResponseSimplePublicObjectWithAssociationsForwardPaging|error`

Sample code:

```ballerina
hscarts:CollectionResponseSimplePublicObjectWithAssociationsForwardPaging response =
    check hubspotCarts->/carts(properties = ["hs_source_store", "hs_total_price"]);
```

Sample response:

```ballerina
{
  "results": [
    {
      "id": "12345678",
      "properties": {
        "hs_source_store": "Dog Cafe: Italy",
        "hs_total_price": "500",
        "hs_createdate": "2025-01-15T10:30:00.000Z",
        "hs_lastmodifieddate": "2025-01-15T10:30:00.000Z"
      },
      "createdAt": "2025-01-15T10:30:00.000Z",
      "updatedAt": "2025-01-15T10:30:00.000Z",
      "archived": false
    }
  ],
  "paging": {
    "next": {
      "after": "12345679",
      "link": "https://api.hubapi.com/crm/v3/objects/carts?after=12345679"
    }
  }
}
```

</details>

<details>
<summary>Create a cart</summary>

Signature: `post /carts`

Creates a new cart object with the specified properties and optional associations.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `SimplePublicObjectInputForCreate` | Yes | Cart properties and optional associations. |
| `headers` | `map<string&#124;string[]>` | No | Optional HTTP headers. |

Returns: `SimplePublicObject|error`

Sample code:

```ballerina
hscarts:SimplePublicObject response = check hubspotCarts->/carts.post(
    payload = {
        properties: {
            "hs_source_store": "Dog Cafe: Italy",
            "hs_total_price": "500",
            "hs_currency_code": "USD",
            "hs_tax": "36.25",
            "hs_tags": "donuts, bagels"
        }
    }
);
```

Sample response:

```ballerina
{
  "id": "12345678",
  "properties": {
    "hs_source_store": "Dog Cafe: Italy",
    "hs_total_price": "500",
    "hs_currency_code": "USD",
    "hs_tax": "36.25",
    "hs_tags": "donuts, bagels",
    "hs_createdate": "2025-01-15T10:30:00.000Z",
    "hs_lastmodifieddate": "2025-01-15T10:30:00.000Z"
  },
  "createdAt": "2025-01-15T10:30:00.000Z",
  "updatedAt": "2025-01-15T10:30:00.000Z",
  "archived": false
}
```

</details>

<details>
<summary>Read a cart</summary>

Signature: `get /carts/[cartId]`

Retrieves a single cart by its ID, optionally including associations and property history.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `cartId` | `string` | Yes | The HubSpot cart ID. |
| `headers` | `map<string&#124;string[]>` | No | Optional HTTP headers. |
| `queries.properties` | `string[]` | No | List of property names to include in the response. |
| `queries.propertiesWithHistory` | `string[]` | No | List of property names to include with their change history. |
| `queries.associations` | `string[]` | No | List of association types to retrieve. |
| `queries.archived` | `boolean` | No | Whether to return the cart if archived (default `false`). |
| `queries.idProperty` | `string` | No | The property to use as the unique identifier (defaults to `hs_object_id`). |

Returns: `SimplePublicObjectWithAssociations|error`

Sample code:

```ballerina
hscarts:SimplePublicObjectWithAssociations response =
    check hubspotCarts->/carts/["12345678"]();
```

Sample response:

```ballerina
{
  "id": "12345678",
  "properties": {
    "hs_source_store": "Dog Cafe: Italy",
    "hs_total_price": "500",
    "hs_currency_code": "USD",
    "hs_tax": "36.25",
    "hs_tags": "donuts, bagels",
    "hs_createdate": "2025-01-15T10:30:00.000Z",
    "hs_lastmodifieddate": "2025-01-15T10:30:00.000Z"
  },
  "createdAt": "2025-01-15T10:30:00.000Z",
  "updatedAt": "2025-01-15T10:30:00.000Z",
  "archived": false
}
```

</details>

<details>
<summary>Update a cart</summary>

Signature: `patch /carts/[cartId]`

Updates an existing cart's properties by its ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `cartId` | `string` | Yes | The HubSpot cart ID. |
| `payload` | `SimplePublicObjectInput` | Yes | Cart properties to update. |
| `headers` | `map<string&#124;string[]>` | No | Optional HTTP headers. |
| `queries.idProperty` | `string` | No | The property to use as the unique identifier. |

Returns: `SimplePublicObject|error`

Sample code:

```ballerina
hscarts:SimplePublicObject response = check hubspotCarts->/carts/["12345678"].patch(
    payload = {
        properties: {
            "hs_tax": "48.75"
        }
    }
);
```

Sample response:

```ballerina
{
  "id": "12345678",
  "properties": {
    "hs_source_store": "Dog Cafe: Italy",
    "hs_total_price": "500",
    "hs_currency_code": "USD",
    "hs_tax": "48.75",
    "hs_tags": "donuts, bagels",
    "hs_createdate": "2025-01-15T10:30:00.000Z",
    "hs_lastmodifieddate": "2025-01-15T11:00:00.000Z"
  },
  "createdAt": "2025-01-15T10:30:00.000Z",
  "updatedAt": "2025-01-15T11:00:00.000Z",
  "archived": false
}
```

</details>

<details>
<summary>Archive a cart</summary>

Signature: `delete /carts/[cartId]`

Archives (soft-deletes) a cart by its ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `cartId` | `string` | Yes | The HubSpot cart ID. |
| `headers` | `map<string&#124;string[]>` | No | Optional HTTP headers. |

Returns: `error?`

Sample code:

```ballerina
_ = check hubspotCarts->/carts/["12345678"].delete();
```

</details>

#### Search

<details>
<summary>Search carts</summary>

Signature: `post /carts/search`

Searches for carts matching the given filter criteria, with support for property filters, sorting, and pagination.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `PublicObjectSearchRequest` | Yes | Search request with filter groups, query string, sorting, and pagination options. |
| `headers` | `map<string&#124;string[]>` | No | Optional HTTP headers. |

Returns: `CollectionResponseWithTotalSimplePublicObjectForwardPaging|error`

Sample code:

```ballerina
hscarts:CollectionResponseWithTotalSimplePublicObjectForwardPaging response =
    check hubspotCarts->/carts/search.post({
        filterGroups: [
            {
                filters: [
                    {
                        propertyName: "hs_tags",
                        value: "donuts, bagels",
                        operator: "EQ"
                    }
                ]
            }
        ],
        properties: ["hs_source_store", "hs_total_price"]
    });
```

Sample response:

```ballerina
{
  "total": 1,
  "results": [
    {
      "id": "12345678",
      "properties": {
        "hs_source_store": "Dog Cafe: Italy",
        "hs_total_price": "500",
        "hs_createdate": "2025-01-15T10:30:00.000Z",
        "hs_lastmodifieddate": "2025-01-15T10:30:00.000Z"
      },
      "createdAt": "2025-01-15T10:30:00.000Z",
      "updatedAt": "2025-01-15T10:30:00.000Z",
      "archived": false
    }
  ],
  "paging": null
}
```

</details>

#### Batch operations

<details>
<summary>Batch create carts</summary>

Signature: `post /carts/batch/create`

Creates multiple cart objects in a single request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `BatchInputSimplePublicObjectInputForCreate` | Yes | Batch input containing an array of cart creation payloads. |
| `headers` | `map<string&#124;string[]>` | No | Optional HTTP headers. |

Returns: `BatchResponseSimplePublicObject|BatchResponseSimplePublicObjectWithErrors|error`

Sample code:

```ballerina
hscarts:BatchResponseSimplePublicObject response =
    check hubspotCarts->/carts/batch/create.post({
        inputs: [
            {
                properties: {
                    "hs_source_store": "ABC Cafe",
                    "hs_total_price": "500",
                    "hs_currency_code": "USD",
                    "hs_tax": "36.25",
                    "hs_tags": "donuts, coffee"
                }
            },
            {
                properties: {
                    "hs_source_store": "XYZ Cafe",
                    "hs_total_price": "400",
                    "hs_currency_code": "USD",
                    "hs_tax": "23.25",
                    "hs_tags": "bagels, tea"
                }
            }
        ]
    });
```

Sample response:

```ballerina
{
  "completedAt": "2025-01-15T10:30:01.000Z",
  "startedAt": "2025-01-15T10:30:00.000Z",
  "status": "COMPLETE",
  "results": [
    {
      "id": "12345678",
      "properties": {
        "hs_source_store": "ABC Cafe",
        "hs_total_price": "500",
        "hs_currency_code": "USD",
        "hs_tax": "36.25",
        "hs_tags": "donuts, coffee",
        "hs_createdate": "2025-01-15T10:30:00.000Z",
        "hs_lastmodifieddate": "2025-01-15T10:30:00.000Z"
      },
      "createdAt": "2025-01-15T10:30:00.000Z",
      "updatedAt": "2025-01-15T10:30:00.000Z",
      "archived": false
    },
    {
      "id": "12345679",
      "properties": {
        "hs_source_store": "XYZ Cafe",
        "hs_total_price": "400",
        "hs_currency_code": "USD",
        "hs_tax": "23.25",
        "hs_tags": "bagels, tea",
        "hs_createdate": "2025-01-15T10:30:00.000Z",
        "hs_lastmodifieddate": "2025-01-15T10:30:00.000Z"
      },
      "createdAt": "2025-01-15T10:30:00.000Z",
      "updatedAt": "2025-01-15T10:30:00.000Z",
      "archived": false
    }
  ]
}
```

</details>

<details>
<summary>Read a batch of carts by internal ID, or unique property values</summary>

Signature: `post /carts/batch/read`

Retrieves multiple carts by their IDs or a unique property, with optional property selection.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `BatchReadInputSimplePublicObjectId` | Yes | Batch input containing cart IDs, optional properties, and an optional ID property name. |
| `headers` | `map<string&#124;string[]>` | No | Optional HTTP headers. |
| `queries.archived` | `boolean` | No | Whether to include archived carts (default `false`). |

Returns: `BatchResponseSimplePublicObject|BatchResponseSimplePublicObjectWithErrors|error`

Sample code:

```ballerina
hscarts:BatchResponseSimplePublicObject|hscarts:BatchResponseSimplePublicObjectWithErrors response =
    check hubspotCarts->/carts/batch/read.post({
        inputs: [
            {id: "12345678"},
            {id: "12345679"}
        ],
        properties: ["hs_source_store", "hs_total_price", "hs_tags"]
    });
```

Sample response:

```ballerina
{
  "completedAt": "2025-01-15T10:30:01.000Z",
  "startedAt": "2025-01-15T10:30:00.000Z",
  "status": "COMPLETE",
  "results": [
    {
      "id": "12345678",
      "properties": {
        "hs_source_store": "ABC Cafe",
        "hs_total_price": "500",
        "hs_tags": "donuts, coffee"
      },
      "createdAt": "2025-01-15T10:30:00.000Z",
      "updatedAt": "2025-01-15T10:30:00.000Z",
      "archived": false
    },
    {
      "id": "12345679",
      "properties": {
        "hs_source_store": "XYZ Cafe",
        "hs_total_price": "400",
        "hs_tags": "bagels, tea"
      },
      "createdAt": "2025-01-15T10:30:00.000Z",
      "updatedAt": "2025-01-15T10:30:00.000Z",
      "archived": false
    }
  ]
}
```

</details>

<details>
<summary>Update a batch of carts</summary>

Signature: `post /carts/batch/update`

Updates properties on multiple carts in a single request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `BatchInputSimplePublicObjectBatchInput` | Yes | Batch input containing cart IDs and properties to update. |
| `headers` | `map<string&#124;string[]>` | No | Optional HTTP headers. |

Returns: `BatchResponseSimplePublicObject|BatchResponseSimplePublicObjectWithErrors|error`

Sample code:

```ballerina
hscarts:BatchResponseSimplePublicObject|hscarts:BatchResponseSimplePublicObjectWithErrors response =
    check hubspotCarts->/carts/batch/update.post({
        inputs: [
            {id: "12345678", properties: {"hs_total_price": "450", "hs_cart_discount": "10"}},
            {id: "12345679", properties: {"hs_total_price": "370", "hs_cart_discount": "10"}}
        ]
    });
```

Sample response:

```ballerina
{
  "completedAt": "2025-01-15T11:00:01.000Z",
  "startedAt": "2025-01-15T11:00:00.000Z",
  "status": "COMPLETE",
  "results": [
    {
      "id": "12345678",
      "properties": {
        "hs_source_store": "ABC Cafe",
        "hs_total_price": "450",
        "hs_cart_discount": "10",
        "hs_createdate": "2025-01-15T10:30:00.000Z",
        "hs_lastmodifieddate": "2025-01-15T11:00:00.000Z"
      },
      "createdAt": "2025-01-15T10:30:00.000Z",
      "updatedAt": "2025-01-15T11:00:00.000Z",
      "archived": false
    },
    {
      "id": "12345679",
      "properties": {
        "hs_source_store": "XYZ Cafe",
        "hs_total_price": "370",
        "hs_cart_discount": "10",
        "hs_createdate": "2025-01-15T10:30:00.000Z",
        "hs_lastmodifieddate": "2025-01-15T11:00:00.000Z"
      },
      "createdAt": "2025-01-15T10:30:00.000Z",
      "updatedAt": "2025-01-15T11:00:00.000Z",
      "archived": false
    }
  ]
}
```

</details>

<details>
<summary>Create or update a batch of carts by unique property values</summary>

Signature: `post /carts/batch/upsert`

Creates or updates multiple carts in a single request, matched by a unique property value.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `BatchInputSimplePublicObjectBatchInputUpsert` | Yes | Batch input containing cart identifiers and properties to upsert. |
| `headers` | `map<string&#124;string[]>` | No | Optional HTTP headers. |

Returns: `BatchResponseSimplePublicUpsertObject|BatchResponseSimplePublicUpsertObjectWithErrors|error`

Sample code:

```ballerina
hscarts:BatchResponseSimplePublicUpsertObject|hscarts:BatchResponseSimplePublicUpsertObjectWithErrors response =
    check hubspotCarts->/carts/batch/upsert.post({
        inputs: [
            {
                id: "12345678",
                properties: {
                    "hs_source_store": "ABC Cafe",
                    "hs_total_price": "550",
                    "hs_currency_code": "USD"
                }
            }
        ]
    });
```

Sample response:

```ballerina
{
  "completedAt": "2025-01-15T11:00:01.000Z",
  "startedAt": "2025-01-15T11:00:00.000Z",
  "status": "COMPLETE",
  "results": [
    {
      "id": "12345678",
      "properties": {
        "hs_source_store": "ABC Cafe",
        "hs_total_price": "550",
        "hs_currency_code": "USD",
        "hs_createdate": "2025-01-15T10:30:00.000Z",
        "hs_lastmodifieddate": "2025-01-15T11:00:00.000Z"
      },
      "createdAt": "2025-01-15T10:30:00.000Z",
      "updatedAt": "2025-01-15T11:00:00.000Z",
      "archived": false,
      "new": false
    }
  ]
}
```

</details>

<details>
<summary>Archive a batch of carts by ID</summary>

Signature: `post /carts/batch/archive`

Archives (soft-deletes) multiple carts in a single request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `BatchInputSimplePublicObjectId` | Yes | Batch input containing the IDs of carts to archive. |
| `headers` | `map<string&#124;string[]>` | No | Optional HTTP headers. |

Returns: `error?`

Sample code:

```ballerina
_ = check hubspotCarts->/carts/batch/archive.post({
    inputs: [
        {id: "12345678"},
        {id: "12345679"}
    ]
});
```

</details>
