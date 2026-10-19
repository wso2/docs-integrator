---
title: Actions
---

# Actions

The `ballerinax/hubspot.crm.commerce.orders` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Manage HubSpot order objects: CRUD, batch operations, and search. |

---

## Client

Manage HubSpot order objects: CRUD, batch operations, and search.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | <code>http:BearerTokenConfig&#124;OAuth2RefreshTokenGrantConfig&#124;ApiKeysConfig</code> | Required | Authentication configuration: OAuth 2.0 refresh token, bearer token, or API keys. |
| `httpVersion` | <code>HttpVersion</code> | `HTTP_2_0` | HTTP protocol version. |
| `timeout` | <code>decimal</code> | `30` | Request timeout in seconds. |
| `retryConfig` | <code>RetryConfig</code> | `()` | Retry configuration for failed requests. |
| `secureSocket` | <code>ClientSecureSocket</code> | `()` | SSL/TLS configuration. |
| `proxy` | <code>ProxyConfig</code> | `()` | Proxy server configuration. |
| `compression` | <code>Compression</code> | `COMPRESSION_AUTO` | HTTP compression configuration. |
| `validation` | <code>boolean</code> | `true` | Enable payload validation. |
| `laxDataBinding` | <code>boolean</code> | `true` | Allow lax data binding for responses. |

### Initializing the client

```ballerina
import ballerina/oauth2;
import ballerinax/hubspot.crm.commerce.orders;

configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string refreshToken = ?;

orders:Client ordersClient = check new ({
    auth: {
        clientId,
        clientSecret,
        refreshToken,
        credentialBearer: oauth2:POST_BODY_BEARER
    }
});
```

### Operations

#### Single order CRUD

<details>
<summary>List</summary>

Signature: `get /`

Retrieves a paginated list of order objects with optional property and association filtering.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request. |
| `queries` | <code>GetCrmV3ObjectsOrdersQueries</code> | No | Query parameters including `properties`, `associations`, `archived`, `limit`, and `after` for pagination. |

Returns: `CollectionResponseSimplePublicObjectWithAssociationsForwardPaging|error`

Sample code:

```ballerina
orders:CollectionResponseSimplePublicObjectWithAssociationsForwardPaging response =
    check ordersClient->/.get(queries = {
        'limit: 10,
        properties: ["hs_order_name", "hs_currency_code", "hs_fulfillment_status"]
    });
```

Sample response:

```ballerina
{
  "results": [
    {
      "id": "394961395351",
      "properties": {
        "hs_order_name": "Camping supplies",
        "hs_currency_code": "USD",
        "hs_fulfillment_status": "Packing",
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
      "after": "394961395352",
      "link": "https://api.hubapi.com/crm/v3/objects/orders?after=394961395352"
    }
  }
}
```

</details>

<details>
<summary>Read</summary>

Signature: `get /[string orderId]`

Retrieves a single order object by its ID, with optional property and association selection.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `orderId` | <code>string</code> | Yes | The ID of the order to retrieve. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request. |
| `queries` | <code>GetCrmV3ObjectsOrdersOrderIdQueries</code> | No | Query parameters including `properties`, `associations`, `archived`, and `idProperty`. |

Returns: `SimplePublicObjectWithAssociations|error`

Sample code:

```ballerina
orders:SimplePublicObjectWithAssociations response =
    check ordersClient->/[orderId].get(queries = {
        properties: ["hs_order_name", "hs_currency_code", "hs_fulfillment_status"]
    });
```

Sample response:

```ballerina
{
  "id": "394961395351",
  "properties": {
    "hs_order_name": "Camping supplies",
    "hs_currency_code": "USD",
    "hs_fulfillment_status": "Packing",
    "hs_source_store": "REI: Portland",
    "hs_shipping_address_city": "Portland",
    "hs_shipping_address_state": "Maine",
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
<summary>Create</summary>

Signature: `post /`

Creates a new order object with the specified properties and optional associations.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>SimplePublicObjectInputForCreate</code> | Yes | The order properties and associations to create. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request. |

Returns: `SimplePublicObject|error`

Sample code:

```ballerina
orders:SimplePublicObject response = check ordersClient->/.post({
    associations: [
        {
            to: {id: "31440573867"},
            types: [
                {
                    associationCategory: "HUBSPOT_DEFINED",
                    associationTypeId: 512
                }
            ]
        }
    ],
    properties: {
        "hs_order_name": "Camping supplies",
        "hs_currency_code": "USD",
        "hs_source_store": "REI: Portland",
        "hs_fulfillment_status": "Packing",
        "hs_shipping_address_city": "Portland",
        "hs_shipping_address_state": "Maine",
        "hs_shipping_address_street": "123 Fake Street"
    }
});
```

Sample response:

```ballerina
{
  "id": "394961395351",
  "properties": {
    "hs_order_name": "Camping supplies",
    "hs_currency_code": "USD",
    "hs_source_store": "REI: Portland",
    "hs_fulfillment_status": "Packing",
    "hs_shipping_address_city": "Portland",
    "hs_shipping_address_state": "Maine",
    "hs_shipping_address_street": "123 Fake Street",
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
<summary>Update</summary>

Signature: `patch /[string orderId]`

Updates an existing order object's properties by its ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `orderId` | <code>string</code> | Yes | The ID of the order to update. |
| `payload` | <code>SimplePublicObjectInput</code> | Yes | The properties to update. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request. |
| `queries` | <code>PatchCrmV3ObjectsOrdersOrderIdQueries</code> | No | Query parameters including `idProperty`. |

Returns: `SimplePublicObject|error`

Sample code:

```ballerina
orders:SimplePublicObject response = check ordersClient->/[orderId].patch({
    properties: {
        "hs_fulfillment_status": "Shipped"
    }
});
```

Sample response:

```ballerina
{
  "id": "394961395351",
  "properties": {
    "hs_order_name": "Camping supplies",
    "hs_currency_code": "USD",
    "hs_fulfillment_status": "Shipped",
    "hs_createdate": "2025-01-15T10:30:00.000Z",
    "hs_lastmodifieddate": "2025-01-16T08:00:00.000Z"
  },
  "createdAt": "2025-01-15T10:30:00.000Z",
  "updatedAt": "2025-01-16T08:00:00.000Z",
  "archived": false
}
```

</details>

<details>
<summary>Archive</summary>

Signature: `delete /[string orderId]`

Archives (soft-deletes) an order object by its ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `orderId` | <code>string</code> | Yes | The ID of the order to archive. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request. |

Returns: `error?`

Sample code:

```ballerina
check ordersClient->/[orderId].delete();
```

</details>

#### Batch operations

<details>
<summary>Read a batch of orders by internal ID, or unique property values</summary>

Signature: `post /batch/read`

Reads a batch of order objects by their IDs or a unique property, with optional property selection.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BatchReadInputSimplePublicObjectId</code> | Yes | Batch read input containing IDs, properties, and optional `idProperty`. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request. |
| `queries` | <code>PostCrmV3ObjectsOrdersBatchReadQueries</code> | No | Query parameters including `archived`. |

Returns: `BatchResponseSimplePublicObject|BatchResponseSimplePublicObjectWithErrors|error`

Sample code:

```ballerina
orders:BatchResponseSimplePublicObject|orders:BatchResponseSimplePublicObjectWithErrors response =
    check ordersClient->/batch/read.post({
        inputs: [
            {id: orderId1},
            {id: orderId2}
        ],
        properties: ["hs_order_name", "hs_currency_code", "hs_fulfillment_status"],
        propertiesWithHistory: []
    });
```

Sample response:

```ballerina
{
  "status": "COMPLETE",
  "results": [
    {
      "id": "394961395351",
      "properties": {
        "hs_order_name": "Camping supplies",
        "hs_currency_code": "USD",
        "hs_fulfillment_status": "Packing"
      },
      "createdAt": "2025-01-15T10:30:00.000Z",
      "updatedAt": "2025-01-15T10:30:00.000Z",
      "archived": false
    },
    {
      "id": "394961395352",
      "properties": {
        "hs_order_name": "Office supplies",
        "hs_currency_code": "USD",
        "hs_fulfillment_status": "Shipped"
      },
      "createdAt": "2025-01-15T10:35:00.000Z",
      "updatedAt": "2025-01-15T10:35:00.000Z",
      "archived": false
    }
  ],
  "startedAt": "2025-01-16T08:00:00.000Z",
  "completedAt": "2025-01-16T08:00:01.000Z"
}
```

</details>

<details>
<summary>Create a batch of orders</summary>

Signature: `post /batch/create`

Creates multiple order objects in a single request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BatchInputSimplePublicObjectInputForCreate</code> | Yes | Batch input containing an array of order objects to create. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request. |

Returns: `BatchResponseSimplePublicObject|BatchResponseSimplePublicObjectWithErrors|error`

Sample code:

```ballerina
orders:BatchResponseSimplePublicObject|orders:BatchResponseSimplePublicObjectWithErrors response =
    check ordersClient->/batch/create.post({
        inputs: [
            {
                associations: [
                    {
                        types: [
                            {
                                associationCategory: "HUBSPOT_DEFINED",
                                associationTypeId: 512
                            }
                        ],
                        to: {id: "31440573867"}
                    }
                ],
                properties: {
                    "hs_currency_code": "USD",
                    "hs_order_name": "Bulk Order 1"
                }
            },
            {
                associations: [],
                properties: {
                    "hs_currency_code": "USD",
                    "hs_order_name": "Bulk Order 2"
                }
            }
        ]
    });
```

Sample response:

```ballerina
{
  "status": "COMPLETE",
  "results": [
    {
      "id": "394961395353",
      "properties": {
        "hs_order_name": "Bulk Order 1",
        "hs_currency_code": "USD"
      },
      "createdAt": "2025-01-15T10:30:00.000Z",
      "updatedAt": "2025-01-15T10:30:00.000Z",
      "archived": false
    },
    {
      "id": "394961395354",
      "properties": {
        "hs_order_name": "Bulk Order 2",
        "hs_currency_code": "USD"
      },
      "createdAt": "2025-01-15T10:30:00.000Z",
      "updatedAt": "2025-01-15T10:30:00.000Z",
      "archived": false
    }
  ],
  "startedAt": "2025-01-15T10:30:00.000Z",
  "completedAt": "2025-01-15T10:30:01.000Z"
}
```

</details>

<details>
<summary>Update a batch of orders</summary>

Signature: `post /batch/update`

Updates multiple order objects in a single request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BatchInputSimplePublicObjectBatchInput</code> | Yes | Batch input containing an array of order updates with IDs and properties. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request. |

Returns: `BatchResponseSimplePublicObject|BatchResponseSimplePublicObjectWithErrors|error`

Sample code:

```ballerina
orders:BatchResponseSimplePublicObject|orders:BatchResponseSimplePublicObjectWithErrors response =
    check ordersClient->/batch/update.post({
        inputs: [
            {
                id: orderId1,
                properties: {
                    "hs_fulfillment_status": "Delivered"
                }
            },
            {
                id: orderId2,
                properties: {
                    "hs_fulfillment_status": "Shipped"
                }
            }
        ]
    });
```

Sample response:

```ballerina
{
  "status": "COMPLETE",
  "results": [
    {
      "id": "394961395351",
      "properties": {
        "hs_order_name": "Camping supplies",
        "hs_fulfillment_status": "Delivered"
      },
      "createdAt": "2025-01-15T10:30:00.000Z",
      "updatedAt": "2025-01-16T08:00:00.000Z",
      "archived": false
    },
    {
      "id": "394961395352",
      "properties": {
        "hs_order_name": "Office supplies",
        "hs_fulfillment_status": "Shipped"
      },
      "createdAt": "2025-01-15T10:30:00.000Z",
      "updatedAt": "2025-01-16T08:00:00.000Z",
      "archived": false
    }
  ],
  "startedAt": "2025-01-16T08:00:00.000Z",
  "completedAt": "2025-01-16T08:00:01.000Z"
}
```

</details>

<details>
<summary>Create or update a batch of orders by unique property values</summary>

Signature: `post /batch/upsert`

Creates or updates multiple order objects in a single request, matched by a unique property.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BatchInputSimplePublicObjectBatchInputUpsert</code> | Yes | Batch input containing an array of order upsert objects with IDs and properties. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request. |

Returns: `BatchResponseSimplePublicUpsertObject|BatchResponseSimplePublicUpsertObjectWithErrors|error`

Sample code:

```ballerina
orders:BatchResponseSimplePublicUpsertObject|orders:BatchResponseSimplePublicUpsertObjectWithErrors response =
    check ordersClient->/batch/upsert.post({
        inputs: [
            {
                id: "unique-order-key-1",
                idProperty: "hs_order_name",
                properties: {
                    "hs_order_name": "unique-order-key-1",
                    "hs_currency_code": "USD",
                    "hs_fulfillment_status": "Packing"
                }
            }
        ]
    });
```

Sample response:

```ballerina
{
  "status": "COMPLETE",
  "results": [
    {
      "id": "394961395355",
      "properties": {
        "hs_order_name": "unique-order-key-1",
        "hs_currency_code": "USD",
        "hs_fulfillment_status": "Packing"
      },
      "new": true,
      "createdAt": "2025-01-15T10:30:00.000Z",
      "updatedAt": "2025-01-15T10:30:00.000Z",
      "archived": false
    }
  ],
  "startedAt": "2025-01-15T10:30:00.000Z",
  "completedAt": "2025-01-15T10:30:01.000Z"
}
```

</details>

<details>
<summary>Archive a batch of orders by ID</summary>

Signature: `post /batch/archive`

Archives (soft-deletes) multiple order objects in a single request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BatchInputSimplePublicObjectId</code> | Yes | Batch input containing an array of order IDs to archive. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request. |

Returns: `error?`

Sample code:

```ballerina
check ordersClient->/batch/archive.post({
    inputs: [
        {id: orderId1},
        {id: orderId2}
    ]
});
```

</details>

#### Search

<details>
<summary>Search</summary>

Signature: `post /search`

Searches for order objects using filters, query text, sorting, and property selection.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>PublicObjectSearchRequest</code> | Yes | Search request with optional `query`, `filterGroups`, `sorts`, `properties`, `limit`, and `after`. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request. |

Returns: `CollectionResponseWithTotalSimplePublicObjectForwardPaging|error`

Sample code:

```ballerina
orders:CollectionResponseWithTotalSimplePublicObjectForwardPaging response =
    check ordersClient->/search.post({
        query: "apple",
        properties: ["hs_order_name", "hs_currency_code"],
        filterGroups: [
            {
                filters: [
                    {
                        propertyName: "hs_order_name",
                        operator: "EQ",
                        value: "New Order Example"
                    }
                ]
            }
        ]
    });
```

Sample response:

```ballerina
{
  "total": 1,
  "results": [
    {
      "id": "394961395351",
      "properties": {
        "hs_order_name": "New Order Example",
        "hs_currency_code": "USD",
        "hs_createdate": "2025-01-15T10:30:00.000Z",
        "hs_lastmodifieddate": "2025-01-15T10:30:00.000Z"
      },
      "createdAt": "2025-01-15T10:30:00.000Z",
      "updatedAt": "2025-01-15T10:30:00.000Z",
      "archived": false
    }
  ],
  "paging": {}
}
```

</details>
