---
title: Actions
---

# Actions

The `ballerinax/hubspot.crm.obj.products` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Manage HubSpot CRM product records: individual and batch CRUD, upsert, and search. |

---

## Client

Manage HubSpot CRM product records: individual and batch CRUD, upsert, and search.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | <code>http:BearerTokenConfig&#124;OAuth2RefreshTokenGrantConfig&#124;ApiKeysConfig</code> | Required | Authentication configuration: bearer token (Private App), OAuth 2.0 refresh token, or legacy API key. |
| `httpVersion` | <code>http:HttpVersion</code> | `HTTP_2_0` | HTTP protocol version to use. |
| `timeout` | <code>decimal</code> | `30` | Maximum time in seconds to wait for a response. |
| `retryConfig` | <code>http:RetryConfig</code> | `()` | Retry configuration for failed requests. |
| `secureSocket` | <code>http:ClientSecureSocket</code> | `()` | SSL/TLS configuration. |
| `proxy` | <code>http:ProxyConfig</code> | `()` | Proxy server configuration. |
| `circuitBreaker` | <code>http:CircuitBreakerConfig</code> | `()` | Circuit breaker configuration. |

### Initializing the client

```ballerina
import ballerina/oauth2;
import ballerinax/hubspot.crm.obj.products as hsproducts;

configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string refreshToken = ?;

hsproducts:Client hubSpotProducts = check new ({
    auth: {
        clientId: clientId,
        clientSecret: clientSecret,
        refreshToken: refreshToken,
        credentialBearer: oauth2:POST_BODY_BEARER
    }
});
```

### Operations

#### Individual product operations

<details>
<summary>List</summary>

Signature: `get /`

Returns a paginated list of all products in the portal with optional property and association data.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | <code>GetGetPageQueries</code> | No | Optional query parameters including `limit`, `after` (cursor), `properties`, `propertiesWithHistory`, `associations`, and `archived`. |

Returns: `CollectionResponseSimplePublicObjectWithAssociationsForwardPaging|error`

Sample code:

```ballerina
hsproducts:CollectionResponseSimplePublicObjectWithAssociationsForwardPaging productsResponse =
    check hubSpotProducts->/;
```

Sample response:

```ballerina
{
  "results": [
    {
      "id": "12345",
      "properties": {
        "name": "Enterprise Plan",
        "price": "999.00",
        "description": "Full-featured enterprise subscription",
        "hs_object_id": "12345",
        "createdate": "2024-01-15T10:00:00.000Z",
        "hs_lastmodifieddate": "2024-06-01T08:30:00.000Z"
      },
      "createdAt": "2024-01-15T10:00:00.000Z",
      "updatedAt": "2024-06-01T08:30:00.000Z",
      "archived": false
    }
  ],
  "paging": {
    "next": {
      "after": "25",
      "link": "https://api.hubapi.com/crm/v3/objects/products?after=25"
    }
  }
}
```

</details>

<details>
<summary>Create</summary>

Signature: `post /`

Creates a new product record with the supplied properties.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>SimplePublicObjectInputForCreate</code> | Yes | Product properties and optional associations to set on creation. |

Returns: `SimplePublicObject|error`

Sample code:

```ballerina
hsproducts:SimplePublicObject newProduct = check hubSpotProducts->/.post({
    properties: {
        "name": "Starter Plan",
        "price": "49.00",
        "description": "Entry-level subscription plan",
        "recurringbillingfrequency": "monthly"
    }
});
```

Sample response:

```ballerina
{
  "id": "67890",
  "properties": {
    "name": "Starter Plan",
    "price": "49.00",
    "description": "Entry-level subscription plan",
    "recurringbillingfrequency": "monthly",
    "hs_object_id": "67890",
    "createdate": "2025-03-01T12:00:00.000Z",
    "hs_lastmodifieddate": "2025-03-01T12:00:00.000Z"
  },
  "createdAt": "2025-03-01T12:00:00.000Z",
  "updatedAt": "2025-03-01T12:00:00.000Z",
  "archived": false
}
```

</details>

<details>
<summary>Read</summary>

Signature: `get /[string productId]`

Retrieves a single product by its internal HubSpot ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `productId` | <code>string</code> | Yes | The internal HubSpot product ID. |
| `queries` | <code>GetProductIdGetByIdQueries</code> | No | Optional query parameters for `properties`, `propertiesWithHistory`, `associations`, and `archived`. |

Returns: `SimplePublicObjectWithAssociations|error`

Sample code:

```ballerina
hsproducts:SimplePublicObjectWithAssociations product =
    check hubSpotProducts->/["12345"];
```

Sample response:

```ballerina
{
  "id": "12345",
  "properties": {
    "name": "Enterprise Plan",
    "price": "999.00",
    "description": "Full-featured enterprise subscription",
    "hs_object_id": "12345",
    "createdate": "2024-01-15T10:00:00.000Z",
    "hs_lastmodifieddate": "2024-06-01T08:30:00.000Z"
  },
  "associations": {},
  "createdAt": "2024-01-15T10:00:00.000Z",
  "updatedAt": "2024-06-01T08:30:00.000Z",
  "archived": false
}
```

</details>

<details>
<summary>Update</summary>

Signature: `patch /[string productId]`

Updates specified properties on an existing product record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `productId` | <code>string</code> | Yes | The internal HubSpot product ID to update. |
| `payload` | <code>SimplePublicObjectInput</code> | Yes | Map of property names and their new values. |
| `queries` | <code>PatchProductIdUpdateQueries</code> | No | Optional query parameter for `idProperty` when targeting by a unique property. |

Returns: `SimplePublicObject|error`

Sample code:

```ballerina
hsproducts:SimplePublicObject updated = check hubSpotProducts->/["12345"].patch({
    properties: {
        "price": "1099.00",
        "description": "Updated enterprise subscription"
    }
});
```

Sample response:

```ballerina
{
  "id": "12345",
  "properties": {
    "name": "Enterprise Plan",
    "price": "1099.00",
    "description": "Updated enterprise subscription",
    "hs_object_id": "12345",
    "hs_lastmodifieddate": "2025-03-15T09:00:00.000Z"
  },
  "createdAt": "2024-01-15T10:00:00.000Z",
  "updatedAt": "2025-03-15T09:00:00.000Z",
  "archived": false
}
```

</details>

<details>
<summary>Archive</summary>

Signature: `delete /[string productId]`

Archives (soft-deletes) a product by its internal ID. Archived products are hidden from the CRM but not permanently deleted.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `productId` | <code>string</code> | Yes | The internal HubSpot product ID to archive. |

Returns: `error?`

Sample code:

```ballerina
check hubSpotProducts->/["12345"].delete();
```

</details>

#### Search

<details>
<summary>Search products</summary>

Signature: `post /search`

Searches for products matching the supplied filter groups, returning matching records with optional property projections and pagination.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>PublicObjectSearchRequest</code> | Yes | Search request containing `filterGroups`, `sorts`, `properties`, `limit`, and `after` cursor. |

Returns: `CollectionResponseWithTotalSimplePublicObjectForwardPaging|error`

Sample code:

```ballerina
hsproducts:CollectionResponseWithTotalSimplePublicObjectForwardPaging searchResponse =
    check hubSpotProducts->/search.post({
        filterGroups: [
            {
                filters: [
                    {
                        propertyName: "price",
                        value: "500",
                        operator: "LTE"
                    }
                ]
            }
        ],
        properties: ["name", "price", "description"],
        sorts: ["price"],
        'limit: 10
    });
```

Sample response:

```ballerina
{
  "total": 3,
  "results": [
    {
      "id": "11111",
      "properties": {
        "name": "Free Tier",
        "price": "0.00",
        "description": "Free plan with limited features"
      },
      "createdAt": "2024-02-01T00:00:00.000Z",
      "updatedAt": "2024-05-10T00:00:00.000Z",
      "archived": false
    },
    {
      "id": "22222",
      "properties": {
        "name": "Starter Plan",
        "price": "49.00",
        "description": "Entry-level subscription"
      },
      "createdAt": "2024-02-01T00:00:00.000Z",
      "updatedAt": "2024-05-10T00:00:00.000Z",
      "archived": false
    }
  ]
}
```

</details>

#### Batch operations

<details>
<summary>Create a batch of products</summary>

Signature: `post /batch/create`

Creates multiple product records in a single request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BatchInputSimplePublicObjectInputForCreate</code> | Yes | List of product input objects, each containing a `properties` map. |

Returns: `BatchResponseSimplePublicObject|BatchResponseSimplePublicObjectWithErrors|error`

Sample code:

```ballerina
hsproducts:BatchResponseSimplePublicObject batchCreated =
    check hubSpotProducts->/batch/create.post({
        inputs: [
            {properties: {"name": "Basic Plan", "price": "19.00"}},
            {properties: {"name": "Pro Plan", "price": "79.00"}},
            {properties: {"name": "Business Plan", "price": "199.00"}}
        ]
    });
```

Sample response:

```ballerina
{
  "status": "COMPLETE",
  "results": [
    {
      "id": "31001",
      "properties": {"name": "Basic Plan", "price": "19.00"},
      "createdAt": "2025-03-01T12:00:00.000Z",
      "updatedAt": "2025-03-01T12:00:00.000Z",
      "archived": false
    },
    {
      "id": "31002",
      "properties": {"name": "Pro Plan", "price": "79.00"},
      "createdAt": "2025-03-01T12:00:00.000Z",
      "updatedAt": "2025-03-01T12:00:00.000Z",
      "archived": false
    }
  ],
  "startedAt": "2025-03-01T12:00:00.000Z",
  "completedAt": "2025-03-01T12:00:01.000Z"
}
```

</details>

<details>
<summary>Read a batch of products by internal ID, or unique property values</summary>

Signature: `post /batch/read`

Retrieves multiple products by their internal IDs or a unique property value in a single request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BatchReadInputSimplePublicObjectId</code> | Yes | List of product IDs and optional `properties` and `propertiesWithHistory` to return. |
| `queries` | <code>PostBatchReadReadQueries</code> | No | Optional query parameter `archived` to include archived products. |

Returns: `BatchResponseSimplePublicObject|BatchResponseSimplePublicObjectWithErrors|error`

Sample code:

```ballerina
hsproducts:BatchResponseSimplePublicObject batchRead =
    check hubSpotProducts->/batch/read.post({
        inputs: [{id: "12345"}, {id: "67890"}],
        properties: ["name", "price", "description"]
    });
```

Sample response:

```ballerina
{
  "status": "COMPLETE",
  "results": [
    {
      "id": "12345",
      "properties": {
        "name": "Enterprise Plan",
        "price": "999.00",
        "description": "Full-featured enterprise subscription"
      },
      "createdAt": "2024-01-15T10:00:00.000Z",
      "updatedAt": "2024-06-01T08:30:00.000Z",
      "archived": false
    },
    {
      "id": "67890",
      "properties": {
        "name": "Starter Plan",
        "price": "49.00",
        "description": "Entry-level subscription plan"
      },
      "createdAt": "2025-03-01T12:00:00.000Z",
      "updatedAt": "2025-03-01T12:00:00.000Z",
      "archived": false
    }
  ],
  "startedAt": "2025-03-01T14:00:00.000Z",
  "completedAt": "2025-03-01T14:00:00.500Z"
}
```

</details>

<details>
<summary>Update a batch of products by internal ID, or unique property values</summary>

Signature: `post /batch/update`

Updates multiple product records in a single request, each identified by internal ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BatchInputSimplePublicObjectBatchInput</code> | Yes | List of product update inputs, each containing an `id` and `properties` map. |

Returns: `BatchResponseSimplePublicObject|BatchResponseSimplePublicObjectWithErrors|error`

Sample code:

```ballerina
hsproducts:BatchResponseSimplePublicObject batchResponse =
    check hubSpotProducts->/batch/update.post({
        inputs: [
            {id: "12345", properties: {"price": "1099.00"}},
            {id: "67890", properties: {"price": "59.00"}}
        ]
    });
```

Sample response:

```ballerina
{
  "status": "COMPLETE",
  "results": [
    {
      "id": "12345",
      "properties": {"name": "Enterprise Plan", "price": "1099.00"},
      "updatedAt": "2025-03-15T09:00:00.000Z",
      "archived": false
    },
    {
      "id": "67890",
      "properties": {"name": "Starter Plan", "price": "59.00"},
      "updatedAt": "2025-03-15T09:00:00.000Z",
      "archived": false
    }
  ],
  "startedAt": "2025-03-15T09:00:00.000Z",
  "completedAt": "2025-03-15T09:00:01.000Z"
}
```

</details>

<details>
<summary>Create or update a batch of products by unique property values</summary>

Signature: `post /batch/upsert`

Creates or updates multiple products based on a unique identifier property. Records matching the ID property are updated; non-matching records are created.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BatchInputSimplePublicObjectBatchInputUpsert</code> | Yes | List of upsert inputs, each with an `id`, `idProperty`, and `properties` map. |

Returns: `BatchResponseSimplePublicUpsertObject|BatchResponseSimplePublicUpsertObjectWithErrors|error`

Sample code:

```ballerina
hsproducts:BatchResponseSimplePublicUpsertObject upsertResponse =
    check hubSpotProducts->/batch/upsert.post({
        inputs: [
            {
                idProperty: "hs_sku",
                id: "SKU-001",
                properties: {"name": "Widget A", "price": "29.99"}
            },
            {
                idProperty: "hs_sku",
                id: "SKU-002",
                properties: {"name": "Widget B", "price": "49.99"}
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
      "id": "41001",
      "properties": {"name": "Widget A", "price": "29.99"},
      "createdAt": "2025-03-01T12:00:00.000Z",
      "updatedAt": "2025-03-01T12:00:00.000Z",
      "archived": false,
      "new": true
    },
    {
      "id": "41002",
      "properties": {"name": "Widget B", "price": "49.99"},
      "createdAt": "2024-11-01T08:00:00.000Z",
      "updatedAt": "2025-03-01T12:00:00.000Z",
      "archived": false,
      "new": false
    }
  ],
  "startedAt": "2025-03-01T12:00:00.000Z",
  "completedAt": "2025-03-01T12:00:01.000Z"
}
```

</details>

<details>
<summary>Archive a batch of products by ID</summary>

Signature: `post /batch/archive`

Archives multiple product records in a single request by their internal IDs.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BatchInputSimplePublicObjectId</code> | Yes | List of product IDs to archive. |

Returns: `error?`

Sample code:

```ballerina
check hubSpotProducts->/batch/archive.post({
    inputs: [
        {id: "11111"},
        {id: "22222"},
        {id: "33333"}
    ]
});
```

</details>
