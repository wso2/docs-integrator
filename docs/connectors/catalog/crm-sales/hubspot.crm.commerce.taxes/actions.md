---
title: Actions
---

# Actions

The `ballerinax/hubspot.crm.commerce.taxes` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Manage HubSpot commerce tax objects: CRUD, search, and batch operations. |

---

## Client

Manage HubSpot commerce tax objects: CRUD, search, and batch operations.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | <code>http:BearerTokenConfig&#124;OAuth2RefreshTokenGrantConfig&#124;ApiKeysConfig</code> | Required | Authentication configuration: OAuth 2.0 refresh token, bearer token, or API keys. |
| `httpVersion` | <code>HttpVersion</code> | `HTTP_2_0` | HTTP protocol version. |
| `timeout` | <code>decimal</code> | `30` | Request timeout in seconds. |
| `retryConfig` | <code>RetryConfig</code> | `()` | Retry configuration for failed requests. |
| `secureSocket` | <code>ClientSecureSocket</code> | `()` | SSL/TLS configuration. |
| `proxy` | <code>ProxyConfig</code> | `()` | Proxy server configuration. |
| `compression` | <code>http:Compression</code> | `COMPRESSION_AUTO` | HTTP compression setting. |
| `validation` | <code>boolean</code> | `true` | Enable/disable payload validation. |
| `laxDataBinding` | <code>boolean</code> | `true` | Allow lax data binding for response payloads. |

### Initializing the client

```ballerina
import ballerinax/hubspot.crm.commerce.taxes;
import ballerina/oauth2;

configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string refreshToken = ?;

taxes:Client taxesClient = check new ({
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
<summary>List taxes</summary>

Signature: `get /`

Retrieves a paginated list of tax objects, with optional filtering by properties, associations, and archived status.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `properties` | <code>string[]?</code> | No | Properties to include in the response. |
| `associations` | <code>string[]?</code> | No | Object types to retrieve associated IDs for. |
| `'limit` | <code>int:Signed32</code> | No | Maximum number of results per page (default 10). |
| `after` | <code>string?</code> | No | Paging cursor token for the next page of results. |
| `archived` | <code>boolean</code> | No | Whether to return only archived results (default false). |
| `propertiesWithHistory` | <code>string[]?</code> | No | Properties to return with their history of previous values. |

Returns: `CollectionResponseSimplePublicObjectWithAssociationsForwardPaging|error`

Sample code:

```ballerina
CollectionResponseSimplePublicObjectWithAssociationsForwardPaging response =
    check taxesClient->/.get(
        properties = ["hs_label", "hs_value", "hs_type"],
        'limit = 10
    );
```

Sample response:

```ballerina
{
  "results": [
    {
      "id": "123456789",
      "properties": {
        "hs_label": "Sales Tax 8.5%",
        "hs_value": "8.5000",
        "hs_type": "PERCENT",
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
      "after": "NTI1Cg%3D%3D",
      "link": "?after=NTI1Cg%3D%3D"
    }
  }
}
```

</details>

<details>
<summary>Create a tax</summary>

Signature: `post /`

Creates a new tax object with the specified properties and optional associations.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>SimplePublicObjectInputForCreate</code> | Yes | Tax record data including properties (e.g., `hs_label`, `hs_value`, `hs_type`) and optional associations. |

Returns: `SimplePublicObject|error`

Sample code:

```ballerina
SimplePublicObject response = check taxesClient->/.post({
    properties: {
        "hs_label": "A percentage-based tax of 8.5%",
        "hs_value": "8.5000",
        "hs_type": "PERCENT"
    },
    associations: []
});
```

Sample response:

```ballerina
{
  "id": "123456789",
  "properties": {
    "hs_label": "A percentage-based tax of 8.5%",
    "hs_value": "8.5000",
    "hs_type": "PERCENT",
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
<summary>Read a tax by ID</summary>

Signature: `get /[taxId]`

Retrieves a single tax object by its ID, with optional properties and associations.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `taxId` | <code>string</code> | Yes | The ID of the tax object to retrieve. |
| `properties` | <code>string[]?</code> | No | Properties to include in the response. |
| `associations` | <code>string[]?</code> | No | Object types to retrieve associated IDs for. |
| `archived` | <code>boolean</code> | No | Whether to return archived results (default false). |
| `idProperty` | <code>string?</code> | No | The name of a property whose values are unique for this object type. |
| `propertiesWithHistory` | <code>string[]?</code> | No | Properties to return with their history of previous values. |

Returns: `SimplePublicObjectWithAssociations|error`

Sample code:

```ballerina
SimplePublicObjectWithAssociations response =
    check taxesClient->/[taxId].get(
        properties = ["hs_label", "hs_value", "hs_type"]
    );
```

Sample response:

```ballerina
{
  "id": "123456789",
  "properties": {
    "hs_label": "A percentage-based tax of 8.5%",
    "hs_value": "8.5000",
    "hs_type": "PERCENT",
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
<summary>Update a tax</summary>

Signature: `patch /[taxId]`

Updates the properties of an existing tax object identified by its ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `taxId` | <code>string</code> | Yes | The ID of the tax object to update. |
| `payload` | <code>SimplePublicObjectInput</code> | Yes | Updated properties for the tax record. |
| `idProperty` | <code>string?</code> | No | The name of a property whose values are unique for this object type. |

Returns: `SimplePublicObject|error`

Sample code:

```ballerina
SimplePublicObject response = check taxesClient->/[taxId].patch({
    properties: {
        "hs_label": "Updated tax at 7.5%",
        "hs_value": "7.5000"
    }
});
```

Sample response:

```ballerina
{
  "id": "123456789",
  "properties": {
    "hs_label": "Updated tax at 7.5%",
    "hs_value": "7.5000",
    "hs_type": "PERCENT",
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
<summary>Archive a tax</summary>

Signature: `delete /[taxId]`

Archives (soft-deletes) a tax object by its ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `taxId` | <code>string</code> | Yes | The ID of the tax object to archive. |

Returns: `error?`

Sample code:

```ballerina
check taxesClient->/[taxId].delete();
```

</details>

#### Search

<details>
<summary>Search taxes</summary>

Signature: `post /search`

Searches for tax objects using filters, query text, sorting, and pagination.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>PublicObjectSearchRequest</code> | Yes | Search request with optional query string, filter groups, sorts, properties, limit, and paging cursor. |

Returns: `CollectionResponseWithTotalSimplePublicObjectForwardPaging|error`

Sample code:

```ballerina
CollectionResponseWithTotalSimplePublicObjectForwardPaging response =
    check taxesClient->/search.post({
        query: "tax",
        properties: ["hs_label", "hs_value", "hs_type"],
        sorts: ["hs_value"],
        'limit: 10
    });
```

Sample response:

```ballerina
{
  "total": 2,
  "results": [
    {
      "id": "123456789",
      "properties": {
        "hs_label": "Sales Tax 5%",
        "hs_value": "5.0000",
        "hs_type": "PERCENT"
      },
      "createdAt": "2025-01-10T09:00:00.000Z",
      "updatedAt": "2025-01-10T09:00:00.000Z",
      "archived": false
    },
    {
      "id": "987654321",
      "properties": {
        "hs_label": "Sales Tax 8.5%",
        "hs_value": "8.5000",
        "hs_type": "PERCENT"
      },
      "createdAt": "2025-01-15T10:30:00.000Z",
      "updatedAt": "2025-01-15T10:30:00.000Z",
      "archived": false
    }
  ]
}
```

</details>

#### Batch operations

<details>
<summary>Batch create taxes</summary>

Signature: `post /batch/create`

Creates multiple tax objects in a single request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BatchInputSimplePublicObjectInputForCreate</code> | Yes | Batch input containing an array of tax records to create. |

Returns: `BatchResponseSimplePublicObject|BatchResponseSimplePublicObjectWithErrors|error`

Sample code:

```ballerina
BatchResponseSimplePublicObject|BatchResponseSimplePublicObjectWithErrors response =
    check taxesClient->/batch/create.post({
        inputs: [
            {
                properties: {
                    "hs_label": "State Tax 6%",
                    "hs_value": "6.0000",
                    "hs_type": "PERCENT"
                },
                associations: []
            },
            {
                properties: {
                    "hs_label": "Fixed Fee $2.50",
                    "hs_value": "2.5000",
                    "hs_type": "FIXED"
                },
                associations: []
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
      "id": "111111111",
      "properties": {
        "hs_label": "State Tax 6%",
        "hs_value": "6.0000",
        "hs_type": "PERCENT",
        "hs_createdate": "2025-01-20T12:00:00.000Z",
        "hs_lastmodifieddate": "2025-01-20T12:00:00.000Z"
      },
      "createdAt": "2025-01-20T12:00:00.000Z",
      "updatedAt": "2025-01-20T12:00:00.000Z",
      "archived": false
    },
    {
      "id": "222222222",
      "properties": {
        "hs_label": "Fixed Fee $2.50",
        "hs_value": "2.5000",
        "hs_type": "FIXED",
        "hs_createdate": "2025-01-20T12:00:00.000Z",
        "hs_lastmodifieddate": "2025-01-20T12:00:00.000Z"
      },
      "createdAt": "2025-01-20T12:00:00.000Z",
      "updatedAt": "2025-01-20T12:00:00.000Z",
      "archived": false
    }
  ],
  "startedAt": "2025-01-20T12:00:00.000Z",
  "completedAt": "2025-01-20T12:00:01.000Z"
}
```

</details>

<details>
<summary>Batch read taxes</summary>

Signature: `post /batch/read`

Reads a batch of tax objects by their IDs or unique property values.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BatchReadInputSimplePublicObjectId</code> | Yes | Batch read input with IDs, properties to return, and optional ID property name. |
| `archived` | <code>boolean</code> | No | Whether to return archived results (default false). |

Returns: `BatchResponseSimplePublicObject|BatchResponseSimplePublicObjectWithErrors|error`

Sample code:

```ballerina
BatchResponseSimplePublicObject|BatchResponseSimplePublicObjectWithErrors response =
    check taxesClient->/batch/read.post({
        inputs: [{id: "123456789"}, {id: "987654321"}],
        properties: ["hs_label", "hs_value", "hs_type"],
        propertiesWithHistory: []
    });
```

Sample response:

```ballerina
{
  "status": "COMPLETE",
  "results": [
    {
      "id": "123456789",
      "properties": {
        "hs_label": "Sales Tax 8.5%",
        "hs_value": "8.5000",
        "hs_type": "PERCENT"
      },
      "createdAt": "2025-01-15T10:30:00.000Z",
      "updatedAt": "2025-01-15T10:30:00.000Z",
      "archived": false
    },
    {
      "id": "987654321",
      "properties": {
        "hs_label": "Sales Tax 5%",
        "hs_value": "5.0000",
        "hs_type": "PERCENT"
      },
      "createdAt": "2025-01-10T09:00:00.000Z",
      "updatedAt": "2025-01-10T09:00:00.000Z",
      "archived": false
    }
  ],
  "startedAt": "2025-01-20T12:00:00.000Z",
  "completedAt": "2025-01-20T12:00:01.000Z"
}
```

</details>

<details>
<summary>Batch update taxes</summary>

Signature: `post /batch/update`

Updates multiple tax objects in a single request by their IDs or unique property values.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BatchInputSimplePublicObjectBatchInput</code> | Yes | Batch input containing an array of tax records with IDs and updated properties. |

Returns: `BatchResponseSimplePublicObject|BatchResponseSimplePublicObjectWithErrors|error`

Sample code:

```ballerina
BatchResponseSimplePublicObject|BatchResponseSimplePublicObjectWithErrors response =
    check taxesClient->/batch/update.post({
        inputs: [
            {
                id: "123456789",
                properties: {
                    "hs_value": "9.0000"
                }
            },
            {
                id: "987654321",
                properties: {
                    "hs_value": "5.5000"
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
      "id": "123456789",
      "properties": {
        "hs_label": "Sales Tax 8.5%",
        "hs_value": "9.0000",
        "hs_type": "PERCENT",
        "hs_lastmodifieddate": "2025-01-21T14:00:00.000Z"
      },
      "createdAt": "2025-01-15T10:30:00.000Z",
      "updatedAt": "2025-01-21T14:00:00.000Z",
      "archived": false
    },
    {
      "id": "987654321",
      "properties": {
        "hs_label": "Sales Tax 5%",
        "hs_value": "5.5000",
        "hs_type": "PERCENT",
        "hs_lastmodifieddate": "2025-01-21T14:00:00.000Z"
      },
      "createdAt": "2025-01-10T09:00:00.000Z",
      "updatedAt": "2025-01-21T14:00:00.000Z",
      "archived": false
    }
  ],
  "startedAt": "2025-01-21T14:00:00.000Z",
  "completedAt": "2025-01-21T14:00:01.000Z"
}
```

</details>

<details>
<summary>Batch upsert taxes</summary>

Signature: `post /batch/upsert`

Creates or updates a batch of tax objects by unique property values. If a record with the given ID property exists it is updated; otherwise a new record is created.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BatchInputSimplePublicObjectBatchInputUpsert</code> | Yes | Batch upsert input containing an array of tax records with IDs and properties. |

Returns: `BatchResponseSimplePublicUpsertObject|BatchResponseSimplePublicUpsertObjectWithErrors|error`

Sample code:

```ballerina
BatchResponseSimplePublicUpsertObject|BatchResponseSimplePublicUpsertObjectWithErrors response =
    check taxesClient->/batch/upsert.post({
        inputs: [
            {
                id: "123456789",
                properties: {
                    "hs_label": "Upserted Tax 10%",
                    "hs_value": "10.0000",
                    "hs_type": "PERCENT"
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
      "id": "123456789",
      "properties": {
        "hs_label": "Upserted Tax 10%",
        "hs_value": "10.0000",
        "hs_type": "PERCENT",
        "hs_lastmodifieddate": "2025-01-22T09:00:00.000Z"
      },
      "createdAt": "2025-01-15T10:30:00.000Z",
      "updatedAt": "2025-01-22T09:00:00.000Z",
      "archived": false,
      "new": false
    }
  ],
  "startedAt": "2025-01-22T09:00:00.000Z",
  "completedAt": "2025-01-22T09:00:01.000Z"
}
```

</details>

<details>
<summary>Batch archive taxes</summary>

Signature: `post /batch/archive`

Archives multiple tax objects in a single request by their IDs.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BatchInputSimplePublicObjectId</code> | Yes | Batch input containing an array of tax object IDs to archive. |

Returns: `error?`

Sample code:

```ballerina
check taxesClient->/batch/archive.post({
    inputs: [{id: "123456789"}, {id: "987654321"}]
});
```

</details>
