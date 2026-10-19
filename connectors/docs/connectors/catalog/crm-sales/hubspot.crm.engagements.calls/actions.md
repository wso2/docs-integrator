---
title: Actions
---

# Actions

The `ballerinax/hubspot.crm.engagements.calls` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Manage HubSpot call engagement records: CRUD, batch operations, and search. |

---

## Client

Manage HubSpot call engagement records: CRUD, batch operations, and search.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | <code>http:BearerTokenConfig&#124;OAuth2RefreshTokenGrantConfig&#124;ApiKeysConfig</code> | Required | Authentication configuration: OAuth 2.0 refresh token, bearer token, or API keys. |
| `httpVersion` | <code>http:HttpVersion</code> | `HTTP_2_0` | HTTP protocol version. |
| `timeout` | <code>decimal</code> | `30` | Request timeout in seconds. |
| `retryConfig` | <code>http:RetryConfig</code> | `()` | Retry configuration for failed requests. |
| `secureSocket` | <code>http:ClientSecureSocket</code> | `()` | SSL/TLS configuration. |
| `proxy` | <code>http:ProxyConfig</code> | `()` | Proxy server configuration. |
| `circuitBreaker` | <code>http:CircuitBreakerConfig</code> | `()` | Circuit breaker configuration for fault tolerance. |
| `compression` | <code>http:Compression</code> | `COMPRESSION_AUTO` | HTTP compression configuration. |
| `validation` | <code>boolean</code> | `true` | Enable or disable payload validation. |

### Initializing the client

```ballerina
import ballerinax/hubspot.crm.engagements.calls;

configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string refreshToken = ?;

calls:Client callsClient = check new ({
    auth: {
        clientId: clientId,
        clientSecret: clientSecret,
        refreshToken: refreshToken,
        refreshUrl: "https://api.hubapi.com/oauth/v1/token"
    }
});
```

### Operations

#### Call CRUD

<details>
<summary>Retrieve calls</summary>

Signature: `get /`

Retrieves a page of call engagement records with optional filtering by properties, associations, and pagination.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |
| `queries` | <code>GetCrmV3ObjectsCallsGetPageQueries</code> | No | Query parameters including `limit`, `after`, `properties`, `associations`, and `archived`. |

Returns: `CollectionResponseSimplePublicObjectWithAssociationsForwardPaging|error`

Sample code:

```ballerina
calls:CollectionResponseSimplePublicObjectWithAssociationsForwardPaging response =
    check callsClient->/.get();
```

Sample response:

```ballerina
{
  "results": [
    {
      "id": "48093927432",
      "properties": {
        "hs_createdate": "2025-01-15T10:30:00.000Z",
        "hs_lastmodifieddate": "2025-01-15T10:30:00.000Z",
        "hs_object_id": "48093927432",
        "hs_call_title": "Discovery Call"
      },
      "createdAt": "2025-01-15T10:30:00.000Z",
      "updatedAt": "2025-01-15T10:30:00.000Z",
      "archived": false
    }
  ],
  "paging": {
    "next": {
      "after": "48093927432",
      "link": "https://api.hubapi.com/crm/v3/objects/calls?after=48093927432"
    }
  }
}
```

</details>

<details>
<summary>Create a call</summary>

Signature: `post /`

Creates a new call engagement record with the specified properties and optional associations.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>SimplePublicObjectInputForCreate</code> | Yes | Call properties and optional associations. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |

Returns: `SimplePublicObject|error`

Sample code:

```ballerina
calls:SimplePublicObject response = check callsClient->/.post({
    properties: {
        "hs_timestamp": "2025-01-15T10:30:00.000Z",
        "hs_call_title": "Discovery Call",
        "hs_call_body": "Discussed product requirements and timeline.",
        "hs_call_duration": "360000",
        "hs_call_from_number": "+1234567890",
        "hs_call_to_number": "+0987654321",
        "hs_call_status": "COMPLETED"
    },
    associations: [
        {
            types: [
                {
                    associationCategory: "HUBSPOT_DEFINED",
                    associationTypeId: 194
                }
            ],
            to: {
                id: "12345"
            }
        }
    ]
});
```

Sample response:

```ballerina
{
  "id": "48093927432",
  "properties": {
    "hs_timestamp": "2025-01-15T10:30:00.000Z",
    "hs_call_title": "Discovery Call",
    "hs_call_body": "Discussed product requirements and timeline.",
    "hs_call_duration": "360000",
    "hs_call_from_number": "+1234567890",
    "hs_call_to_number": "+0987654321",
    "hs_call_status": "COMPLETED",
    "hs_createdate": "2025-01-15T10:30:00.000Z",
    "hs_lastmodifieddate": "2025-01-15T10:30:00.000Z",
    "hs_object_id": "48093927432"
  },
  "createdAt": "2025-01-15T10:30:00.000Z",
  "updatedAt": "2025-01-15T10:30:00.000Z",
  "archived": false
}
```

</details>

<details>
<summary>Retrieve a call</summary>

Signature: `get /[string callId]`

Retrieves a single call engagement record by its ID, with optional property and association details.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `callId` | <code>string</code> | Yes | The ID of the call to retrieve. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |
| `queries` | <code>GetCrmV3ObjectsCallsCallIdGetByIdQueries</code> | No | Query parameters including `properties`, `associations`, and `archived`. |

Returns: `SimplePublicObjectWithAssociations|error`

Sample code:

```ballerina
calls:SimplePublicObjectWithAssociations response =
    check callsClient->/["48093927432"].get();
```

Sample response:

```ballerina
{
  "id": "48093927432",
  "properties": {
    "hs_timestamp": "2025-01-15T10:30:00.000Z",
    "hs_call_title": "Discovery Call",
    "hs_call_body": "Discussed product requirements and timeline.",
    "hs_call_duration": "360000",
    "hs_call_status": "COMPLETED",
    "hs_createdate": "2025-01-15T10:30:00.000Z",
    "hs_lastmodifieddate": "2025-01-15T10:30:00.000Z",
    "hs_object_id": "48093927432"
  },
  "createdAt": "2025-01-15T10:30:00.000Z",
  "updatedAt": "2025-01-15T10:30:00.000Z",
  "archived": false
}
```

</details>

<details>
<summary>Update a call</summary>

Signature: `patch /[string callId]`

Updates the properties of an existing call engagement record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `callId` | <code>string</code> | Yes | The ID of the call to update. |
| `payload` | <code>SimplePublicObjectInput</code> | Yes | Properties to update. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |
| `queries` | <code>PatchCrmV3ObjectsCallsCallIdUpdateQueries</code> | No | Query parameters including `idProperty`. |

Returns: `SimplePublicObject|error`

Sample code:

```ballerina
calls:SimplePublicObject response = check callsClient->/["48093927432"].patch({
    properties: {
        "hs_call_title": "Updated Discovery Call",
        "hs_call_status": "COMPLETED"
    }
});
```

Sample response:

```ballerina
{
  "id": "48093927432",
  "properties": {
    "hs_call_title": "Updated Discovery Call",
    "hs_call_status": "COMPLETED",
    "hs_createdate": "2025-01-15T10:30:00.000Z",
    "hs_lastmodifieddate": "2025-01-15T11:00:00.000Z",
    "hs_object_id": "48093927432"
  },
  "createdAt": "2025-01-15T10:30:00.000Z",
  "updatedAt": "2025-01-15T11:00:00.000Z",
  "archived": false
}
```

</details>

<details>
<summary>Archive a call</summary>

Signature: `delete /[string callId]`

Archives (soft-deletes) a call engagement record by its ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `callId` | <code>string</code> | Yes | The ID of the call to archive. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |

Returns: `error?`

Sample code:

```ballerina
check callsClient->/["48093927432"].delete();
```

</details>

#### Batch operations

<details>
<summary>Create a batch of calls</summary>

Signature: `post /batch/create`

Creates multiple call engagement records in a single request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BatchInputSimplePublicObjectInputForCreate</code> | Yes | Batch of call inputs with properties and optional associations. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |

Returns: `BatchResponseSimplePublicObject|BatchResponseSimplePublicObjectWithErrors|error`

Sample code:

```ballerina
calls:BatchResponseSimplePublicObject|calls:BatchResponseSimplePublicObjectWithErrors response =
    check callsClient->/batch/create.post({
        inputs: [
            {
                properties: {
                    "hs_timestamp": "2025-01-15T10:30:00.000Z",
                    "hs_call_title": "Call 1",
                    "hs_call_status": "COMPLETED"
                },
                associations: []
            },
            {
                properties: {
                    "hs_timestamp": "2025-01-15T11:00:00.000Z",
                    "hs_call_title": "Call 2",
                    "hs_call_status": "COMPLETED"
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
      "id": "48093927432",
      "properties": {
        "hs_call_title": "Call 1",
        "hs_call_status": "COMPLETED",
        "hs_createdate": "2025-01-15T10:30:00.000Z",
        "hs_object_id": "48093927432"
      },
      "createdAt": "2025-01-15T10:30:00.000Z",
      "updatedAt": "2025-01-15T10:30:00.000Z",
      "archived": false
    },
    {
      "id": "48093927433",
      "properties": {
        "hs_call_title": "Call 2",
        "hs_call_status": "COMPLETED",
        "hs_createdate": "2025-01-15T11:00:00.000Z",
        "hs_object_id": "48093927433"
      },
      "createdAt": "2025-01-15T11:00:00.000Z",
      "updatedAt": "2025-01-15T11:00:00.000Z",
      "archived": false
    }
  ],
  "startedAt": "2025-01-15T10:30:00.000Z",
  "completedAt": "2025-01-15T10:30:01.000Z"
}
```

</details>

<details>
<summary>Retrieve a batch of calls</summary>

Signature: `post /batch/read`

Retrieves multiple call engagement records by their IDs in a single request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BatchReadInputSimplePublicObjectId</code> | Yes | Batch of call IDs to retrieve, with optional property selection. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |
| `queries` | <code>PostCrmV3ObjectsCallsBatchReadReadQueries</code> | No | Query parameters including `archived`. |

Returns: `BatchResponseSimplePublicObject|BatchResponseSimplePublicObjectWithErrors|error`

Sample code:

```ballerina
calls:BatchResponseSimplePublicObject|calls:BatchResponseSimplePublicObjectWithErrors response =
    check callsClient->/batch/read.post({
        inputs: [
            { id: "48093927432" },
            { id: "48093927433" }
        ],
        properties: ["hs_call_title", "hs_call_status", "hs_call_duration"]
    });
```

Sample response:

```ballerina
{
  "status": "COMPLETE",
  "results": [
    {
      "id": "48093927432",
      "properties": {
        "hs_call_title": "Call 1",
        "hs_call_status": "COMPLETED",
        "hs_call_duration": "360000"
      },
      "createdAt": "2025-01-15T10:30:00.000Z",
      "updatedAt": "2025-01-15T10:30:00.000Z",
      "archived": false
    },
    {
      "id": "48093927433",
      "properties": {
        "hs_call_title": "Call 2",
        "hs_call_status": "COMPLETED",
        "hs_call_duration": "180000"
      },
      "createdAt": "2025-01-15T11:00:00.000Z",
      "updatedAt": "2025-01-15T11:00:00.000Z",
      "archived": false
    }
  ],
  "startedAt": "2025-01-15T10:30:00.000Z",
  "completedAt": "2025-01-15T10:30:01.000Z"
}
```

</details>

<details>
<summary>Update a batch of calls</summary>

Signature: `post /batch/update`

Updates properties on multiple call engagement records in a single request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BatchInputSimplePublicObjectBatchInput</code> | Yes | Batch of call IDs with updated properties. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |

Returns: `BatchResponseSimplePublicObject|BatchResponseSimplePublicObjectWithErrors|error`

Sample code:

```ballerina
calls:BatchResponseSimplePublicObject|calls:BatchResponseSimplePublicObjectWithErrors response =
    check callsClient->/batch/update.post({
        inputs: [
            {
                id: "48093927432",
                properties: {
                    "hs_call_title": "Updated Call 1",
                    "hs_call_status": "COMPLETED"
                }
            },
            {
                id: "48093927433",
                properties: {
                    "hs_call_title": "Updated Call 2",
                    "hs_call_status": "COMPLETED"
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
      "id": "48093927432",
      "properties": {
        "hs_call_title": "Updated Call 1",
        "hs_call_status": "COMPLETED",
        "hs_lastmodifieddate": "2025-01-15T11:00:00.000Z"
      },
      "createdAt": "2025-01-15T10:30:00.000Z",
      "updatedAt": "2025-01-15T11:00:00.000Z",
      "archived": false
    },
    {
      "id": "48093927433",
      "properties": {
        "hs_call_title": "Updated Call 2",
        "hs_call_status": "COMPLETED",
        "hs_lastmodifieddate": "2025-01-15T11:00:00.000Z"
      },
      "createdAt": "2025-01-15T11:00:00.000Z",
      "updatedAt": "2025-01-15T11:00:00.000Z",
      "archived": false
    }
  ],
  "startedAt": "2025-01-15T11:00:00.000Z",
  "completedAt": "2025-01-15T11:00:01.000Z"
}
```

</details>

<details>
<summary>Archive a batch of calls</summary>

Signature: `post /batch/archive`

Archives (soft-deletes) multiple call engagement records in a single request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BatchInputSimplePublicObjectId</code> | Yes | Batch of call IDs to archive. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |

Returns: `error?`

Sample code:

```ballerina
check callsClient->/batch/archive.post({
    inputs: [
        { id: "48093927432" },
        { id: "48093927433" }
    ]
});
```

</details>

<details>
<summary>Create or update a batch of calls by unique property</summary>

Signature: `post /batch/upsert`

Creates or updates multiple call records in a single request, matching by a unique property value.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BatchInputSimplePublicObjectBatchInputUpsert</code> | Yes | Batch of call inputs with an `idProperty` for matching and properties to set. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |

Returns: `BatchResponseSimplePublicUpsertObject|BatchResponseSimplePublicUpsertObjectWithErrors|error`

Sample code:

```ballerina
calls:BatchResponseSimplePublicUpsertObject|calls:BatchResponseSimplePublicUpsertObjectWithErrors response =
    check callsClient->/batch/upsert.post({
        inputs: [
            {
                idProperty: "hs_object_id",
                id: "48093927432",
                properties: {
                    "hs_call_title": "Upserted Call",
                    "hs_call_status": "COMPLETED"
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
      "id": "48093927432",
      "properties": {
        "hs_call_title": "Upserted Call",
        "hs_call_status": "COMPLETED"
      },
      "createdAt": "2025-01-15T10:30:00.000Z",
      "updatedAt": "2025-01-15T11:30:00.000Z",
      "archived": false,
      "new": false
    }
  ],
  "startedAt": "2025-01-15T11:30:00.000Z",
  "completedAt": "2025-01-15T11:30:01.000Z"
}
```

</details>

#### Search

<details>
<summary>Search for calls</summary>

Signature: `post /search`

Searches for call engagement records using filters, property conditions, and sorting criteria.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>PublicObjectSearchRequest</code> | Yes | Search request with filter groups, sorting, properties to return, and pagination. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |

Returns: `CollectionResponseWithTotalSimplePublicObjectForwardPaging|error`

Sample code:

```ballerina
calls:CollectionResponseWithTotalSimplePublicObjectForwardPaging response =
    check callsClient->/search.post({
        filterGroups: [
            {
                filters: [
                    {
                        propertyName: "hs_call_status",
                        operator: "EQ",
                        value: "COMPLETED"
                    }
                ]
            }
        ],
        properties: ["hs_call_title", "hs_call_status", "hs_call_duration"],
        sorts: ["hs_createdate"],
        limit: 10
    });
```

Sample response:

```ballerina
{
  "total": 2,
  "results": [
    {
      "id": "48093927432",
      "properties": {
        "hs_call_title": "Discovery Call",
        "hs_call_status": "COMPLETED",
        "hs_call_duration": "360000"
      },
      "createdAt": "2025-01-15T10:30:00.000Z",
      "updatedAt": "2025-01-15T10:30:00.000Z",
      "archived": false
    },
    {
      "id": "48093927433",
      "properties": {
        "hs_call_title": "Follow-up Call",
        "hs_call_status": "COMPLETED",
        "hs_call_duration": "180000"
      },
      "createdAt": "2025-01-15T11:00:00.000Z",
      "updatedAt": "2025-01-15T11:00:00.000Z",
      "archived": false
    }
  ],
  "paging": {
    "next": {
      "after": "48093927433"
    }
  }
}
```

</details>
