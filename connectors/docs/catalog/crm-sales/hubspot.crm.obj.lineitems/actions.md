---
title: Actions
---

# Actions

The `ballerinax/hubspot.crm.obj.lineitems` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Provides full CRUD, batch operations, and search for HubSpot CRM Line Item records. |

---

## Client

Provides full CRUD, batch operations, and search for HubSpot CRM Line Item records.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `OAuth2RefreshTokenGrantConfig\|http:BearerTokenConfig\|ApiKeysConfig` | Required | Authentication configuration: OAuth 2.0 refresh token, bearer token (Private App), or API key headers. |
| `serviceUrl` | `string` | `"https://api.hubapi.com/crm/v3/objects/line_items"` | Base URL of the HubSpot CRM Line Items API. |
| `httpVersion` | `HttpVersion` | `HTTP_2_0` | HTTP protocol version to use. |
| `timeout` | `decimal` | `30` | Request timeout in seconds. |
| `retryConfig` | `RetryConfig` | `()` | Retry configuration for failed requests. |
| `secureSocket` | `ClientSecureSocket` | `()` | SSL/TLS configuration. |
| `proxy` | `ProxyConfig` | `()` | Proxy server configuration. |
| `validation` | `boolean` | `true` | Enable/disable constraint validation on request/response payloads. |

### Initializing the client

```ballerina
import ballerinax/hubspot.crm.obj.lineitems as hslineitems;

configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string refreshToken = ?;

hslineitems:Client hsLineItems = check new ({
    auth: {
        clientId: clientId,
        clientSecret: clientSecret,
        refreshToken: refreshToken,
        credentialBearer: oauth2:POST_BODY_BEARER
    }
});
```

### Operations

#### Single record operations

<details>
<summary>List a page of line items</summary>

Retrieves a paginated list of line item records, with optional property filtering and association expansion.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `GetCrmV3ObjectsLineItemsGetPageQueries` | No | Optional query parameters including `limit`, `after` (pagination cursor), `properties`, `propertiesWithHistory`, `associations`, and `archived`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP headers. |

Returns: `CollectionResponseSimplePublicObjectWithAssociationsForwardPaging|error`

Sample code:

```ballerina
hslineitems:CollectionResponseSimplePublicObjectWithAssociationsForwardPaging response =
    check hsLineItems->/.get(queries = {
        'limit: 10,
        properties: ["name", "price", "quantity"]
    });
```

Sample response:

```ballerina
{
  "results": [
    {
      "id": "12345",
      "properties": {
        "name": "Wired Keyboard",
        "price": "2400.00",
        "quantity": "5",
        "hs_object_id": "12345",
        "createdate": "2025-01-15T10:00:00.000Z",
        "hs_lastmodifieddate": "2025-01-20T12:30:00.000Z"
      },
      "createdAt": "2025-01-15T10:00:00.000Z",
      "updatedAt": "2025-01-20T12:30:00.000Z",
      "archived": false
    }
  ],
  "paging": {
    "next": {
      "after": "NTI1Cg%3D%3D",
      "link": "https://api.hubapi.com/crm/v3/objects/line_items?after=NTI1Cg%3D%3D"
    }
  }
}
```

</details>

<details>
<summary>Create a line item</summary>

Creates a new line item record in HubSpot CRM with the specified properties and optional deal associations.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `SimplePublicObjectInputForCreate` | Yes | Line item properties (e.g., `name`, `price`, `quantity`) and optional associations. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP headers. |

Returns: `SimplePublicObject|error`

Sample code:

```ballerina
hslineitems:SimplePublicObject newItem = check hsLineItems->/.post(
    payload = {
        properties: {
            "name": "Wired Keyboard",
            "price": "2400.00",
            "quantity": "5"
        },
        associations: []
    }
);
```

Sample response:

```ballerina
{
  "id": "67890",
  "properties": {
    "name": "Wired Keyboard",
    "price": "2400.00",
    "quantity": "5",
    "hs_object_id": "67890",
    "createdate": "2025-03-18T09:00:00.000Z",
    "hs_lastmodifieddate": "2025-03-18T09:00:00.000Z"
  },
  "createdAt": "2025-03-18T09:00:00.000Z",
  "updatedAt": "2025-03-18T09:00:00.000Z",
  "archived": false
}
```

</details>

<details>
<summary>Read a line item</summary>

Retrieves a single line item record by its HubSpot ID, including properties, associations, and optional property history.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `lineItemId` | `string` | Yes | The HubSpot ID of the line item to retrieve. |
| `queries` | `GetCrmV3ObjectsLineItemsLineItemIdGetByIdQueries` | No | Optional query parameters including `properties`, `propertiesWithHistory`, `associations`, `idProperty`, and `archived`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP headers. |

Returns: `SimplePublicObjectWithAssociations|error`

Sample code:

```ballerina
hslineitems:SimplePublicObjectWithAssociations lineItem =
    check hsLineItems->/["67890"].get(
        queries = {
            properties: ["name", "price", "quantity"]
        }
    );
```

Sample response:

```ballerina
{
  "id": "67890",
  "properties": {
    "name": "Wired Keyboard",
    "price": "2400.00",
    "quantity": "5",
    "hs_object_id": "67890",
    "createdate": "2025-03-18T09:00:00.000Z",
    "hs_lastmodifieddate": "2025-03-18T09:00:00.000Z"
  },
  "createdAt": "2025-03-18T09:00:00.000Z",
  "updatedAt": "2025-03-18T09:00:00.000Z",
  "archived": false,
  "associations": {}
}
```

</details>

<details>
<summary>Update a line item</summary>

Performs a partial update on a line item record, modifying only the supplied property fields.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `lineItemId` | `string` | Yes | The HubSpot ID of the line item to update. |
| `payload` | `SimplePublicObjectInput` | Yes | Properties to update on the line item. |
| `queries` | `PatchCrmV3ObjectsLineItemsLineItemIdUpdateQueries` | No | Optional query parameters including `idProperty` for alternate ID lookup. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP headers. |

Returns: `SimplePublicObject|error`

Sample code:

```ballerina
hslineitems:SimplePublicObject updated = check hsLineItems->/["67890"].patch(
    payload = {
        properties: {
            "price": "2700.00",
            "quantity": "3"
        }
    }
);
```

Sample response:

```ballerina
{
  "id": "67890",
  "properties": {
    "name": "Wired Keyboard",
    "price": "2700.00",
    "quantity": "3",
    "hs_object_id": "67890",
    "createdate": "2025-03-18T09:00:00.000Z",
    "hs_lastmodifieddate": "2025-03-18T11:45:00.000Z"
  },
  "createdAt": "2025-03-18T09:00:00.000Z",
  "updatedAt": "2025-03-18T11:45:00.000Z",
  "archived": false
}
```

</details>

<details>
<summary>Archive a line item</summary>

Archives (soft-deletes) a single line item by its HubSpot ID. Archived records can be restored later.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `lineItemId` | `string` | Yes | The HubSpot ID of the line item to archive. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP headers. |

Returns: `error?`

Sample code:

```ballerina
check hsLineItems->/["67890"].delete();
```

</details>

#### Batch operations

<details>
<summary>Create a batch of line items</summary>

Creates multiple line items in a single API call, each with its own properties and optional associations.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `BatchInputSimplePublicObjectInputForCreate` | Yes | Array of line item inputs to create, each containing `properties` and optional `associations`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP headers. |

Returns: `BatchResponseSimplePublicObject|BatchResponseSimplePublicObjectWithErrors|error`

Sample code:

```ballerina
hslineitems:BatchResponseSimplePublicObject batchResult =
    check hsLineItems->/batch/create.post(
        payload = {
            inputs: [
                {
                    properties: {
                        "name": "Dining Table",
                        "price": "55000.00",
                        "quantity": "1"
                    },
                    associations: [
                        {
                            types: [{
                                associationCategory: "HUBSPOT_DEFINED",
                                associationTypeId: 20
                            }],
                            to: {id: "31232284502"}
                        }
                    ]
                },
                {
                    properties: {
                        "name": "Office Chair",
                        "price": "12000.00",
                        "quantity": "3"
                    },
                    associations: [
                        {
                            types: [{
                                associationCategory: "HUBSPOT_DEFINED",
                                associationTypeId: 20
                            }],
                            to: {id: "31232284502"}
                        }
                    ]
                }
            ]
        }
    );
```

Sample response:

```ballerina
{
  "status": "COMPLETE",
  "results": [
    {
      "id": "11111",
      "properties": {
        "name": "Dining Table",
        "price": "55000.00",
        "quantity": "1",
        "hs_object_id": "11111",
        "createdate": "2025-03-18T09:00:00.000Z",
        "hs_lastmodifieddate": "2025-03-18T09:00:00.000Z"
      },
      "createdAt": "2025-03-18T09:00:00.000Z",
      "updatedAt": "2025-03-18T09:00:00.000Z",
      "archived": false
    },
    {
      "id": "11112",
      "properties": {
        "name": "Office Chair",
        "price": "12000.00",
        "quantity": "3",
        "hs_object_id": "11112",
        "createdate": "2025-03-18T09:00:00.000Z",
        "hs_lastmodifieddate": "2025-03-18T09:00:00.000Z"
      },
      "createdAt": "2025-03-18T09:00:00.000Z",
      "updatedAt": "2025-03-18T09:00:00.000Z",
      "archived": false
    }
  ],
  "startedAt": "2025-03-18T09:00:00.000Z",
  "completedAt": "2025-03-18T09:00:01.000Z"
}
```

</details>

<details>
<summary>Read a batch of line items by internal ID, or unique property values</summary>

Retrieves a batch of line items by their HubSpot IDs in a single request, with optional property and history filtering.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `BatchReadInputSimplePublicObjectId` | Yes | Object IDs to fetch plus the list of `properties` and `propertiesWithHistory` to include in each result. |
| `queries` | `PostCrmV3ObjectsLineItemsBatchReadReadQueries` | No | Optional query params: `archived` (default `false`) to include archived records. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP headers. |

Returns: `BatchResponseSimplePublicObject|BatchResponseSimplePublicObjectWithErrors|error`

Sample code:

```ballerina
hslineitems:BatchResponseSimplePublicObject batchRead =
    check hsLineItems->/batch/read.post(
        payload = {
            inputs: [{id: "11111"}, {id: "11112"}],
            properties: ["name", "price", "quantity"],
            propertiesWithHistory: ["price"]
        }
    );
```

Sample response:

```ballerina
{
  "status": "COMPLETE",
  "results": [
    {
      "id": "11111",
      "properties": {
        "name": "Dining Table",
        "price": "55000.00",
        "quantity": "1"
      },
      "createdAt": "2025-03-18T09:00:00.000Z",
      "updatedAt": "2025-03-18T09:00:00.000Z",
      "archived": false
    },
    {
      "id": "11112",
      "properties": {
        "name": "Office Chair",
        "price": "12000.00",
        "quantity": "3"
      },
      "createdAt": "2025-03-18T09:00:00.000Z",
      "updatedAt": "2025-03-18T09:00:00.000Z",
      "archived": false
    }
  ],
  "startedAt": "2025-03-18T09:00:00.000Z",
  "completedAt": "2025-03-18T09:00:01.000Z"
}
```

</details>

<details>
<summary>Update a batch of line items</summary>

Updates properties on multiple line items in a single request using their HubSpot IDs.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `BatchInputSimplePublicObjectBatchInput` | Yes | Array of update inputs, each specifying a line item `id` and the `properties` to modify. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP headers. |

Returns: `BatchResponseSimplePublicObject|BatchResponseSimplePublicObjectWithErrors|error`

Sample code:

```ballerina
hslineitems:BatchResponseSimplePublicObject updateResult =
    check hsLineItems->/batch/update.post(
        payload = {
            inputs: [
                {id: "11111", properties: {"quantity": "2"}},
                {id: "11112", properties: {"quantity": "2"}}
            ]
        }
    );
```

Sample response:

```ballerina
{
  "status": "COMPLETE",
  "results": [
    {
      "id": "11111",
      "properties": {
        "name": "Dining Table",
        "price": "55000.00",
        "quantity": "2",
        "hs_lastmodifieddate": "2025-03-18T12:00:00.000Z"
      },
      "createdAt": "2025-03-18T09:00:00.000Z",
      "updatedAt": "2025-03-18T12:00:00.000Z",
      "archived": false
    },
    {
      "id": "11112",
      "properties": {
        "name": "Office Chair",
        "price": "12000.00",
        "quantity": "2",
        "hs_lastmodifieddate": "2025-03-18T12:00:00.000Z"
      },
      "createdAt": "2025-03-18T09:00:00.000Z",
      "updatedAt": "2025-03-18T12:00:00.000Z",
      "archived": false
    }
  ],
  "startedAt": "2025-03-18T12:00:00.000Z",
  "completedAt": "2025-03-18T12:00:01.000Z"
}
```

</details>

<details>
<summary>Archive a batch of line items by ID</summary>

Archives multiple line items at once by their HubSpot IDs.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `BatchInputSimplePublicObjectId` | Yes | Array of `{ id: string }` objects identifying the line items to archive. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP headers. |

Returns: `error?`

Sample code:

```ballerina
check hsLineItems->/batch/archive.post(
    payload = {
        inputs: [{id: "11111"}, {id: "11112"}]
    }
);
```

</details>

<details>
<summary>Upsert a batch of line items</summary>

Creates or updates line items in bulk using a unique identifier property: creates a new record if no match is found, updates the existing record if a match is found.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `BatchInputSimplePublicObjectBatchInputUpsert` | Yes | Array of upsert inputs each with an `id`, optional `idProperty`, and `properties` to set. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP headers. |

Returns: `BatchResponseSimplePublicUpsertObject|BatchResponseSimplePublicUpsertObjectWithErrors|error`

Sample code:

```ballerina
hslineitems:BatchResponseSimplePublicUpsertObject upsertResult =
    check hsLineItems->/batch/upsert.post(
        payload = {
            inputs: [
                {
                    id: "sku-keyboard-001",
                    idProperty: "hs_sku",
                    properties: {
                        "name": "Wired Keyboard",
                        "price": "2400.00",
                        "quantity": "10"
                    }
                }
            ]
        }
    );
```

Sample response:

```ballerina
{
  "status": "COMPLETE",
  "results": [
    {
      "id": "67890",
      "properties": {
        "name": "Wired Keyboard",
        "price": "2400.00",
        "quantity": "10",
        "hs_object_id": "67890",
        "hs_lastmodifieddate": "2025-03-18T12:00:00.000Z"
      },
      "createdAt": "2025-03-18T09:00:00.000Z",
      "updatedAt": "2025-03-18T12:00:00.000Z",
      "archived": false,
      "new": false
    }
  ],
  "startedAt": "2025-03-18T12:00:00.000Z",
  "completedAt": "2025-03-18T12:00:01.000Z"
}
```

</details>

#### Search

<details>
<summary>Search line items</summary>

Searches HubSpot CRM line item records using keyword queries, filter groups, sorting, and pagination.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `PublicObjectSearchRequest` | Yes | Search request with optional `query` (keyword), `filterGroups`, `sorts`, `properties`, `limit`, and `after` cursor. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP headers. |

Returns: `CollectionResponseWithTotalSimplePublicObjectForwardPaging|error`

Sample code:

```ballerina
hslineitems:CollectionResponseWithTotalSimplePublicObjectForwardPaging searchResult =
    check hsLineItems->/search.post(
        payload = {
            query: "Chair",
            'limit: 5,
            sorts: ["price"],
            properties: ["name", "price", "quantity"]
        }
    );
```

Sample response:

```ballerina
{
  "total": 3,
  "results": [
    {
      "id": "11112",
      "properties": {
        "name": "Office Chair",
        "price": "12000.00",
        "quantity": "2",
        "hs_object_id": "11112",
        "createdate": "2025-03-18T09:00:00.000Z",
        "hs_lastmodifieddate": "2025-03-18T12:00:00.000Z"
      },
      "createdAt": "2025-03-18T09:00:00.000Z",
      "updatedAt": "2025-03-18T12:00:00.000Z",
      "archived": false
    },
    {
      "id": "11113",
      "properties": {
        "name": "Casual Chair",
        "price": "8500.00",
        "quantity": "2",
        "hs_object_id": "11113",
        "createdate": "2025-03-18T09:00:00.000Z",
        "hs_lastmodifieddate": "2025-03-18T12:00:00.000Z"
      },
      "createdAt": "2025-03-18T09:00:00.000Z",
      "updatedAt": "2025-03-18T12:00:00.000Z",
      "archived": false
    }
  ]
}
```

</details>
