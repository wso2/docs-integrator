---
title: Actions
---

# Actions

The `ballerinax/hubspot.crm.commerce.discounts` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Manages HubSpot CRM discount objects: CRUD, batch operations, and search. |

---

## Client

Manages HubSpot CRM discount objects: CRUD, batch operations, and search.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | <code>http:BearerTokenConfig&#124;OAuth2RefreshTokenGrantConfig&#124;ApiKeysConfig</code> | Required | Authentication configuration: OAuth 2.0 refresh token, bearer token, or API keys. |
| `httpVersion` | <code>http:HttpVersion</code> | `http:HTTP_2_0` | HTTP protocol version. |
| `timeout` | <code>decimal</code> | `30` | Request timeout in seconds. |
| `retryConfig` | <code>http:RetryConfig</code> | `()` | Retry configuration for failed requests. |
| `circuitBreaker` | <code>http:CircuitBreakerConfig</code> | `()` | Circuit breaker configuration. |
| `secureSocket` | <code>http:ClientSecureSocket</code> | `()` | SSL/TLS configuration. |
| `proxy` | <code>http:ProxyConfig</code> | `()` | Proxy server configuration. |
| `validation` | <code>boolean</code> | `true` | Enable/disable payload validation. |

### Initializing the client

```ballerina
import ballerinax/hubspot.crm.commerce.discounts;

configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string refreshToken = ?;

discounts:Client discountsClient = check new ({
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
<summary>List discounts</summary>

Signature: `get /`

Retrieves a page of discount records with optional property selection, associations, and pagination.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Request headers. |
| `queries` | <code>GetCrmV3ObjectsDiscountsQueries</code> | No | Query parameters including `'limit`, `after`, `properties`, `propertiesWithHistory`, and `associations`. |

Returns: `CollectionResponseSimplePublicObjectWithAssociationsForwardPaging|error`

Sample code:

```ballerina
discounts:CollectionResponseSimplePublicObjectWithAssociationsForwardPaging response =
    check discountsClient->/.get();
```

Sample response:

```ballerina
{
  "results": [
    {
      "id": "12345",
      "properties": {
        "hs_label": "Summer Sale",
        "hs_type": "PERCENTAGE",
        "hs_value": "15",
        "hs_createdate": "2026-01-15T10:30:00.000Z",
        "hs_lastmodifieddate": "2026-01-15T10:30:00.000Z"
      },
      "createdAt": "2026-01-15T10:30:00.000Z",
      "updatedAt": "2026-01-15T10:30:00.000Z",
      "archived": false
    }
  ],
  "paging": {
    "next": {
      "after": "12345",
      "link": "https://api.hubapi.com/crm/v3/objects/discounts?after=12345"
    }
  }
}
```

</details>

<details>
<summary>Create a discount</summary>

Signature: `post /`

Creates a new discount record with the specified properties and optional associations.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>SimplePublicObjectInputForCreate</code> | Yes | Discount properties and optional associations. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Request headers. |

Returns: `SimplePublicObject|error`

Sample code:

```ballerina
discounts:SimplePublicObject response = check discountsClient->/.post({
    properties: {
        "hs_label": "Summer Sale",
        "hs_duration": "ONCE",
        "hs_type": "PERCENTAGE",
        "hs_value": "15",
        "hs_sort_order": "2"
    }
});
```

Sample response:

```ballerina
{
  "id": "12345",
  "properties": {
    "hs_label": "Summer Sale",
    "hs_duration": "ONCE",
    "hs_type": "PERCENTAGE",
    "hs_value": "15",
    "hs_sort_order": "2",
    "hs_createdate": "2026-01-15T10:30:00.000Z",
    "hs_lastmodifieddate": "2026-01-15T10:30:00.000Z"
  },
  "createdAt": "2026-01-15T10:30:00.000Z",
  "updatedAt": "2026-01-15T10:30:00.000Z",
  "archived": false
}
```

</details>

<details>
<summary>Read a discount</summary>

Signature: `get /[string discountId]`

Retrieves a single discount record by its ID, with optional property selection.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `discountId` | <code>string</code> | Yes | The ID of the discount to retrieve. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Request headers. |
| `queries` | <code>GetCrmV3ObjectsDiscountsDiscountIdQueries</code> | No | Query parameters including `properties`, `propertiesWithHistory`, and `associations`. |

Returns: `SimplePublicObjectWithAssociations|error`

Sample code:

```ballerina
discounts:SimplePublicObjectWithAssociations response =
    check discountsClient->/[discountId].get();
```

Sample response:

```ballerina
{
  "id": "12345",
  "properties": {
    "hs_label": "Summer Sale",
    "hs_type": "PERCENTAGE",
    "hs_value": "15",
    "hs_createdate": "2026-01-15T10:30:00.000Z",
    "hs_lastmodifieddate": "2026-01-15T10:30:00.000Z"
  },
  "createdAt": "2026-01-15T10:30:00.000Z",
  "updatedAt": "2026-01-15T10:30:00.000Z",
  "archived": false
}
```

</details>

<details>
<summary>Update a discount</summary>

Signature: `patch /[string discountId]`

Updates an existing discount record's properties by its ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `discountId` | <code>string</code> | Yes | The ID of the discount to update. |
| `payload` | <code>SimplePublicObjectInput</code> | Yes | The properties to update. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Request headers. |
| `queries` | <code>PatchCrmV3ObjectsDiscountsDiscountIdQueries</code> | No | Query parameters including `idProperty`. |

Returns: `SimplePublicObject|error`

Sample code:

```ballerina
discounts:SimplePublicObject response = check discountsClient->/[discountId].patch({
    properties: {
        "hs_value": "20"
    }
});
```

Sample response:

```ballerina
{
  "id": "12345",
  "properties": {
    "hs_label": "Summer Sale",
    "hs_type": "PERCENTAGE",
    "hs_value": "20",
    "hs_createdate": "2026-01-15T10:30:00.000Z",
    "hs_lastmodifieddate": "2026-01-16T08:00:00.000Z"
  },
  "createdAt": "2026-01-15T10:30:00.000Z",
  "updatedAt": "2026-01-16T08:00:00.000Z",
  "archived": false
}
```

</details>

<details>
<summary>Archive a discount</summary>

Signature: `delete /[string discountId]`

Archives (soft-deletes) a discount record by its ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `discountId` | <code>string</code> | Yes | The ID of the discount to archive. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Request headers. |

Returns: `error?`

Sample code:

```ballerina
check discountsClient->/[discountId].delete();
```

</details>

#### Batch operations

<details>
<summary>Create a batch of discounts</summary>

Signature: `post /batch/create`

Creates multiple discount records in a single request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BatchInputSimplePublicObjectInputForCreate</code> | Yes | Batch of discount inputs to create. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Request headers. |

Returns: `BatchResponseSimplePublicObject|BatchResponseSimplePublicObjectWithErrors|error`

Sample code:

```ballerina
discounts:BatchResponseSimplePublicObject|discounts:BatchResponseSimplePublicObjectWithErrors response =
    check discountsClient->/batch/create.post({
        inputs: [
            {
                properties: {
                    "hs_label": "Black Friday Deal",
                    "hs_duration": "ONCE",
                    "hs_type": "PERCENTAGE",
                    "hs_value": "25",
                    "hs_sort_order": "1"
                }
            },
            {
                properties: {
                    "hs_label": "Cyber Monday Deal",
                    "hs_duration": "ONCE",
                    "hs_type": "FIXED",
                    "hs_value": "50",
                    "hs_sort_order": "2"
                }
            }
        ]
    });
```

Sample response:

```ballerina
{
  "completedAt": "2026-01-15T10:30:00.000Z",
  "startedAt": "2026-01-15T10:30:00.000Z",
  "status": "COMPLETE",
  "results": [
    {
      "id": "12345",
      "properties": {
        "hs_label": "Black Friday Deal",
        "hs_type": "PERCENTAGE",
        "hs_value": "25"
      },
      "createdAt": "2026-01-15T10:30:00.000Z",
      "updatedAt": "2026-01-15T10:30:00.000Z",
      "archived": false
    },
    {
      "id": "12346",
      "properties": {
        "hs_label": "Cyber Monday Deal",
        "hs_type": "FIXED",
        "hs_value": "50"
      },
      "createdAt": "2026-01-15T10:30:00.000Z",
      "updatedAt": "2026-01-15T10:30:00.000Z",
      "archived": false
    }
  ]
}
```

</details>

<details>
<summary>Read a batch of discounts by internal ID, or unique property values</summary>

Signature: `post /batch/read`

Reads multiple discount records by their IDs or a unique property value in a single request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BatchReadInputSimplePublicObjectId</code> | Yes | Batch of discount IDs or unique property identifiers to read. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Request headers. |
| `queries` | <code>PostCrmV3ObjectsDiscountsBatchReadQueries</code> | No | Query parameters including `archived`. |

Returns: `BatchResponseSimplePublicObject|BatchResponseSimplePublicObjectWithErrors|error`

Sample code:

```ballerina
discounts:BatchResponseSimplePublicObject|discounts:BatchResponseSimplePublicObjectWithErrors response =
    check discountsClient->/batch/read.post({
        inputs: [
            { id: "12345" },
            { id: "12346" }
        ],
        properties: ["hs_label", "hs_type", "hs_value"]
    });
```

Sample response:

```ballerina
{
  "completedAt": "2026-01-15T10:30:01.000Z",
  "startedAt": "2026-01-15T10:30:00.000Z",
  "status": "COMPLETE",
  "results": [
    {
      "id": "12345",
      "properties": {
        "hs_label": "Black Friday Deal",
        "hs_type": "PERCENTAGE",
        "hs_value": "25"
      },
      "createdAt": "2026-01-15T10:30:00.000Z",
      "updatedAt": "2026-01-15T10:30:00.000Z",
      "archived": false
    },
    {
      "id": "12346",
      "properties": {
        "hs_label": "Cyber Monday Deal",
        "hs_type": "FIXED",
        "hs_value": "50"
      },
      "createdAt": "2026-01-15T10:30:00.000Z",
      "updatedAt": "2026-01-15T10:30:00.000Z",
      "archived": false
    }
  ]
}
```

</details>

<details>
<summary>Update a batch of discounts</summary>

Signature: `post /batch/update`

Updates multiple discount records' properties in a single request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BatchInputSimplePublicObjectBatchInput</code> | Yes | Batch of discount updates with IDs and properties. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Request headers. |

Returns: `BatchResponseSimplePublicObject|BatchResponseSimplePublicObjectWithErrors|error`

Sample code:

```ballerina
discounts:BatchResponseSimplePublicObject|discounts:BatchResponseSimplePublicObjectWithErrors response =
    check discountsClient->/batch/update.post({
        inputs: [
            {
                id: "12345",
                properties: {
                    "hs_value": "30"
                }
            },
            {
                id: "12346",
                properties: {
                    "hs_value": "60"
                }
            }
        ]
    });
```

Sample response:

```ballerina
{
  "completedAt": "2026-01-16T08:00:01.000Z",
  "startedAt": "2026-01-16T08:00:00.000Z",
  "status": "COMPLETE",
  "results": [
    {
      "id": "12345",
      "properties": {
        "hs_label": "Black Friday Deal",
        "hs_type": "PERCENTAGE",
        "hs_value": "30"
      },
      "createdAt": "2026-01-15T10:30:00.000Z",
      "updatedAt": "2026-01-16T08:00:00.000Z",
      "archived": false
    },
    {
      "id": "12346",
      "properties": {
        "hs_label": "Cyber Monday Deal",
        "hs_type": "FIXED",
        "hs_value": "60"
      },
      "createdAt": "2026-01-15T10:30:00.000Z",
      "updatedAt": "2026-01-16T08:00:00.000Z",
      "archived": false
    }
  ]
}
```

</details>

<details>
<summary>Archive a batch of discounts by ID</summary>

Signature: `post /batch/archive`

Archives (soft-deletes) multiple discount records by their IDs in a single request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BatchInputSimplePublicObjectId</code> | Yes | Batch of discount IDs to archive. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Request headers. |

Returns: `error?`

Sample code:

```ballerina
check discountsClient->/batch/archive.post({
    inputs: [
        { id: "12345" },
        { id: "12346" }
    ]
});
```

</details>

<details>
<summary>Create or update a batch of discounts by unique property values</summary>

Signature: `post /batch/upsert`

Creates or updates multiple discount records using unique property values to determine whether to create or update.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BatchInputSimplePublicObjectBatchInputUpsert</code> | Yes | Batch of discount upsert inputs with ID properties and values. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Request headers. |

Returns: `BatchResponseSimplePublicUpsertObject|BatchResponseSimplePublicUpsertObjectWithErrors|error`

Sample code:

```ballerina
discounts:BatchResponseSimplePublicUpsertObject|discounts:BatchResponseSimplePublicUpsertObjectWithErrors response =
    check discountsClient->/batch/upsert.post({
        inputs: [
            {
                idProperty: "hs_label",
                id: "Summer Sale",
                properties: {
                    "hs_label": "Summer Sale",
                    "hs_type": "PERCENTAGE",
                    "hs_value": "15",
                    "hs_duration": "ONCE"
                }
            }
        ]
    });
```

Sample response:

```ballerina
{
  "completedAt": "2026-01-15T10:30:01.000Z",
  "startedAt": "2026-01-15T10:30:00.000Z",
  "status": "COMPLETE",
  "results": [
    {
      "id": "12345",
      "properties": {
        "hs_label": "Summer Sale",
        "hs_type": "PERCENTAGE",
        "hs_value": "15"
      },
      "createdAt": "2026-01-15T10:30:00.000Z",
      "updatedAt": "2026-01-15T10:30:00.000Z",
      "archived": false,
      "new": true
    }
  ]
}
```

</details>

#### Search

<details>
<summary>Search discounts</summary>

Signature: `post /search`

Searches for discount records using filters, query text, sorting, and property selection.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>PublicObjectSearchRequest</code> | Yes | Search request with optional `query`, `filterGroups`, `sorts`, `properties`, `'limit`, and `after`. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Request headers. |

Returns: `CollectionResponseWithTotalSimplePublicObjectForwardPaging|error`

Sample code:

```ballerina
discounts:CollectionResponseWithTotalSimplePublicObjectForwardPaging response =
    check discountsClient->/search.post({
        filterGroups: [
            {
                filters: [
                    {
                        propertyName: "hs_type",
                        operator: "EQ",
                        value: "PERCENTAGE"
                    }
                ]
            }
        ],
        sorts: ["hs_value"],
        properties: ["hs_label", "hs_type", "hs_value", "hs_duration"],
        'limit: 10
    });
```

Sample response:

```ballerina
{
  "total": 1,
  "results": [
    {
      "id": "12345",
      "properties": {
        "hs_label": "Summer Sale",
        "hs_type": "PERCENTAGE",
        "hs_value": "15",
        "hs_duration": "ONCE"
      },
      "createdAt": "2026-01-15T10:30:00.000Z",
      "updatedAt": "2026-01-15T10:30:00.000Z",
      "archived": false
    }
  ],
  "paging": {}
}
```

</details>
