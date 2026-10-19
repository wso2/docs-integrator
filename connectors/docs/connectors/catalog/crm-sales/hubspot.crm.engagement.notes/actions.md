---
title: Actions
---

# Actions

The `ballerinax/hubspot.crm.engagement.notes` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | HubSpot Notes API: note CRUD, batch operations, and search. |

---

## Client

HubSpot Notes API: note CRUD, batch operations, and search.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | <code>http:BearerTokenConfig&#124;OAuth2RefreshTokenGrantConfig&#124;ApiKeysConfig</code> | Required | Authentication configuration: OAuth 2.0 refresh token, bearer token, or API key. |
| `httpVersion` | <code>http:HttpVersion</code> | `HTTP_2_0` | HTTP protocol version. |
| `timeout` | <code>decimal</code> | `30` | Request timeout in seconds. |
| `retryConfig` | <code>http:RetryConfig</code> | `()` | Retry configuration for failed requests. |
| `secureSocket` | <code>http:ClientSecureSocket</code> | `()` | SSL/TLS configuration. |
| `proxy` | <code>http:ProxyConfig</code> | `()` | Proxy server configuration. |
| `cache` | <code>http:CacheConfig</code> | `{}` | HTTP cache configuration. |
| `compression` | <code>http:Compression</code> | `AUTO` | Response compression mode. |
| `validation` | <code>boolean</code> | `true` | Enable/disable payload validation. |

### Initializing the client

```ballerina
import ballerinax/hubspot.crm.engagement.notes as hsnotes;

configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string refreshToken = ?;

hsnotes:Client notesClient = check new ({
    auth: {
        clientId: clientId,
        clientSecret: clientSecret,
        refreshToken: refreshToken,
        refreshUrl: "https://api.hubapi.com/oauth/v1/token"
    }
});
```

### Operations

#### Single note operations

<details>
<summary>Create a note</summary>

Signature: `post /`

Creates a new engagement note with the specified properties and optional associations to other CRM objects.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>SimplePublicObjectInputForCreate</code> | Yes | Note properties and associations. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Custom HTTP headers. |

Returns: `SimplePublicObject|error`

Sample code:

```ballerina
hsnotes:SimplePublicObject note = check notesClient->/.post({
    properties: {
        "hs_timestamp": "2025-10-30T03:30:17.883Z",
        "hs_note_body": "Meeting summary: Discussed Q4 goals"
    },
    associations: [
        {
            types: [
                {
                    associationCategory: "HUBSPOT_DEFINED",
                    associationTypeId: 190
                }
            ],
            to: {
                id: "91327871528"
            }
        }
    ]
});
```

Sample response:

```ballerina
{
  "id": "55037676923",
  "properties": {
    "hs_createdate": "2025-10-30T05:00:12.572Z",
    "hs_lastmodifieddate": "2025-10-30T05:00:12.572Z",
    "hs_note_body": "Meeting summary: Discussed Q4 goals",
    "hs_object_id": "55037676923",
    "hs_timestamp": "2025-10-30T03:30:17.883Z"
  },
  "createdAt": "2025-10-30T05:00:12.572Z",
  "updatedAt": "2025-10-30T05:00:12.572Z",
  "archived": false
}
```

</details>

<details>
<summary>Read a note by ID</summary>

Signature: `get /[string noteId]`

Retrieves a single engagement note by its ID, optionally including associations and property history.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `noteId` | <code>string</code> | Yes | The ID of the note to retrieve. |
| `properties` | <code>string[]</code> | No | Specific properties to return. |
| `associations` | <code>string[]</code> | No | Association types to include. |
| `archived` | <code>boolean</code> | No | Whether to return archived notes. |

Returns: `SimplePublicObjectWithAssociations|error`

Sample code:

```ballerina
hsnotes:SimplePublicObjectWithAssociations note = check notesClient->/["55037676923"].get();
```

Sample response:

```ballerina
{
  "id": "55037676923",
  "properties": {
    "hs_createdate": "2025-10-30T05:00:12.572Z",
    "hs_lastmodifieddate": "2025-10-30T05:00:12.572Z",
    "hs_note_body": "Meeting summary: Discussed Q4 goals",
    "hs_object_id": "55037676923",
    "hs_timestamp": "2025-10-30T03:30:17.883Z"
  },
  "createdAt": "2025-10-30T05:00:12.572Z",
  "updatedAt": "2025-10-30T05:00:12.572Z",
  "archived": false
}
```

</details>

<details>
<summary>Update a note</summary>

Signature: `patch /[string noteId]`

Updates the properties of an existing engagement note by its ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `noteId` | <code>string</code> | Yes | The ID of the note to update. |
| `payload` | <code>SimplePublicObjectInput</code> | Yes | Properties to update. |
| `idProperty` | <code>string</code> | No | The property to use as the unique identifier. |

Returns: `SimplePublicObject|error`

Sample code:

```ballerina
hsnotes:SimplePublicObject updated = check notesClient->/["55037676923"].patch({
    properties: {
        "hs_note_body": "Updated meeting summary: Finalized Q4 goals and budget"
    }
});
```

Sample response:

```ballerina
{
  "id": "55037676923",
  "properties": {
    "hs_createdate": "2025-10-30T05:00:12.572Z",
    "hs_lastmodifieddate": "2025-10-30T06:15:30.100Z",
    "hs_note_body": "Updated meeting summary: Finalized Q4 goals and budget",
    "hs_object_id": "55037676923",
    "hs_timestamp": "2025-10-30T03:30:17.883Z"
  },
  "createdAt": "2025-10-30T05:00:12.572Z",
  "updatedAt": "2025-10-30T06:15:30.100Z",
  "archived": false
}
```

</details>

<details>
<summary>Archive a note</summary>

Signature: `delete /[string noteId]`

Archives (soft-deletes) an engagement note by its ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `noteId` | <code>string</code> | Yes | The ID of the note to archive. |

Returns: `error?`

Sample code:

```ballerina
check notesClient->/["55037676923"].delete();
```

</details>

<details>
<summary>List notes</summary>

Signature: `get /`

Lists all engagement notes with optional filtering, pagination, and association expansion.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `limit` | <code>int</code> | No | Maximum number of results to return per page. |
| `after` | <code>string</code> | No | Cursor for the next page of results. |
| `properties` | <code>string[]</code> | No | Specific properties to return. |
| `associations` | <code>string[]</code> | No | Association types to include. |
| `archived` | <code>boolean</code> | No | Whether to return archived notes. |

Returns: `CollectionResponseSimplePublicObjectWithAssociationsForwardPaging|error`

Sample code:

```ballerina
hsnotes:CollectionResponseSimplePublicObjectWithAssociationsForwardPaging notes = check notesClient->/.get();
```

Sample response:

```ballerina
{
  "results": [
    {
      "id": "55037676923",
      "properties": {
        "hs_createdate": "2025-10-30T05:00:12.572Z",
        "hs_lastmodifieddate": "2025-10-30T05:00:12.572Z",
        "hs_note_body": "Meeting summary: Discussed Q4 goals",
        "hs_object_id": "55037676923"
      },
      "createdAt": "2025-10-30T05:00:12.572Z",
      "updatedAt": "2025-10-30T05:00:12.572Z",
      "archived": false
    }
  ],
  "paging": {
    "next": {
      "after": "55037676924",
      "link": "https://api.hubapi.com/crm/v3/objects/notes?after=55037676924"
    }
  }
}
```

</details>

<details>
<summary>Search notes</summary>

Signature: `post /search`

Searches for engagement notes using filters, query text, sorting, and pagination.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>PublicObjectSearchRequest</code> | Yes | Search criteria including filters, sorts, query, and pagination. |

Returns: `CollectionResponseWithTotalSimplePublicObjectForwardPaging|error`

Sample code:

```ballerina
hsnotes:CollectionResponseWithTotalSimplePublicObjectForwardPaging results = check notesClient->/search.post({
    filterGroups: [
        {
            filters: [
                {
                    propertyName: "hs_note_body",
                    operator: "CONTAINS_TOKEN",
                    value: "meeting"
                }
            ]
        }
    ],
    properties: ["hs_note_body", "hs_timestamp"],
    limit: 10
});
```

Sample response:

```ballerina
{
  "total": 1,
  "results": [
    {
      "id": "55037676923",
      "properties": {
        "hs_createdate": "2025-10-30T05:00:12.572Z",
        "hs_lastmodifieddate": "2025-10-30T05:00:12.572Z",
        "hs_note_body": "Meeting summary: Discussed Q4 goals",
        "hs_object_id": "55037676923",
        "hs_timestamp": "2025-10-30T03:30:17.883Z"
      },
      "createdAt": "2025-10-30T05:00:12.572Z",
      "updatedAt": "2025-10-30T05:00:12.572Z",
      "archived": false
    }
  ],
  "paging": {}
}
```

</details>

#### Batch operations

<details>
<summary>Create a batch of notes</summary>

Signature: `post /batch/create`

Creates multiple engagement notes in a single request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BatchInputSimplePublicObjectInputForCreate</code> | Yes | Array of note inputs with properties and associations. |

Returns: `BatchResponseSimplePublicObject|BatchResponseSimplePublicObjectWithErrors|error`

Sample code:

```ballerina
hsnotes:BatchResponseSimplePublicObject|hsnotes:BatchResponseSimplePublicObjectWithErrors batchResult =
    check notesClient->/batch/create.post({
        inputs: [
            {
                properties: {
                    "hs_timestamp": "2025-10-30T03:30:17.883Z",
                    "hs_note_body": "First batch note"
                },
                associations: []
            },
            {
                properties: {
                    "hs_timestamp": "2025-10-30T04:00:00.000Z",
                    "hs_note_body": "Second batch note"
                },
                associations: []
            }
        ]
    });
```

Sample response:

```ballerina
{
  "completedAt": "2025-10-30T05:01:00.000Z",
  "startedAt": "2025-10-30T05:00:59.500Z",
  "results": [
    {
      "id": "55037676930",
      "properties": {
        "hs_note_body": "First batch note",
        "hs_object_id": "55037676930",
        "hs_timestamp": "2025-10-30T03:30:17.883Z"
      },
      "createdAt": "2025-10-30T05:01:00.000Z",
      "updatedAt": "2025-10-30T05:01:00.000Z",
      "archived": false
    },
    {
      "id": "55037676931",
      "properties": {
        "hs_note_body": "Second batch note",
        "hs_object_id": "55037676931",
        "hs_timestamp": "2025-10-30T04:00:00.000Z"
      },
      "createdAt": "2025-10-30T05:01:00.000Z",
      "updatedAt": "2025-10-30T05:01:00.000Z",
      "archived": false
    }
  ],
  "status": "COMPLETE"
}
```

</details>

<details>
<summary>Read a batch of notes by ID</summary>

Signature: `post /batch/read`

Reads multiple engagement notes by their internal IDs or unique property values.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BatchReadInputSimplePublicObjectId</code> | Yes | Batch of note IDs and properties to retrieve. |
| `archived` | <code>boolean</code> | No | Whether to return archived notes. |

Returns: `BatchResponseSimplePublicObject|BatchResponseSimplePublicObjectWithErrors|error`

Sample code:

```ballerina
hsnotes:BatchResponseSimplePublicObject|hsnotes:BatchResponseSimplePublicObjectWithErrors batchRead =
    check notesClient->/batch/read.post({
        inputs: [
            { id: "55037676930" },
            { id: "55037676931" }
        ],
        properties: ["hs_note_body", "hs_timestamp"],
        propertiesWithHistory: []
    });
```

Sample response:

```ballerina
{
  "completedAt": "2025-10-30T05:02:00.000Z",
  "startedAt": "2025-10-30T05:01:59.800Z",
  "results": [
    {
      "id": "55037676930",
      "properties": {
        "hs_note_body": "First batch note",
        "hs_timestamp": "2025-10-30T03:30:17.883Z"
      },
      "createdAt": "2025-10-30T05:01:00.000Z",
      "updatedAt": "2025-10-30T05:01:00.000Z",
      "archived": false
    },
    {
      "id": "55037676931",
      "properties": {
        "hs_note_body": "Second batch note",
        "hs_timestamp": "2025-10-30T04:00:00.000Z"
      },
      "createdAt": "2025-10-30T05:01:00.000Z",
      "updatedAt": "2025-10-30T05:01:00.000Z",
      "archived": false
    }
  ],
  "status": "COMPLETE"
}
```

</details>

<details>
<summary>Update a batch of notes</summary>

Signature: `post /batch/update`

Updates multiple engagement notes by their internal IDs or unique property values.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BatchInputSimplePublicObjectBatchInput</code> | Yes | Array of note IDs and properties to update. |

Returns: `BatchResponseSimplePublicObject|BatchResponseSimplePublicObjectWithErrors|error`

Sample code:

```ballerina
hsnotes:BatchResponseSimplePublicObject|hsnotes:BatchResponseSimplePublicObjectWithErrors batchUpdate =
    check notesClient->/batch/update.post({
        inputs: [
            {
                id: "55037676930",
                properties: {
                    "hs_note_body": "Updated first batch note"
                }
            },
            {
                id: "55037676931",
                properties: {
                    "hs_note_body": "Updated second batch note"
                }
            }
        ]
    });
```

Sample response:

```ballerina
{
  "completedAt": "2025-10-30T05:03:00.000Z",
  "startedAt": "2025-10-30T05:02:59.700Z",
  "results": [
    {
      "id": "55037676930",
      "properties": {
        "hs_note_body": "Updated first batch note",
        "hs_object_id": "55037676930"
      },
      "createdAt": "2025-10-30T05:01:00.000Z",
      "updatedAt": "2025-10-30T05:03:00.000Z",
      "archived": false
    },
    {
      "id": "55037676931",
      "properties": {
        "hs_note_body": "Updated second batch note",
        "hs_object_id": "55037676931"
      },
      "createdAt": "2025-10-30T05:01:00.000Z",
      "updatedAt": "2025-10-30T05:03:00.000Z",
      "archived": false
    }
  ],
  "status": "COMPLETE"
}
```

</details>

<details>
<summary>Upsert a batch of notes</summary>

Signature: `post /batch/upsert`

Creates or updates a batch of engagement notes by unique property values.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BatchInputSimplePublicObjectBatchInputUpsert</code> | Yes | Array of note data for upsert operations. |

Returns: `BatchResponseSimplePublicUpsertObject|BatchResponseSimplePublicUpsertObjectWithErrors|error`

Sample code:

```ballerina
hsnotes:BatchResponseSimplePublicUpsertObject|hsnotes:BatchResponseSimplePublicUpsertObjectWithErrors upsertResult =
    check notesClient->/batch/upsert.post({
        inputs: [
            {
                id: "55037676930",
                idProperty: "hs_object_id",
                properties: {
                    "hs_note_body": "Upserted note content"
                }
            }
        ]
    });
```

Sample response:

```ballerina
{
  "completedAt": "2025-10-30T05:04:00.000Z",
  "startedAt": "2025-10-30T05:03:59.500Z",
  "results": [
    {
      "id": "55037676930",
      "properties": {
        "hs_note_body": "Upserted note content",
        "hs_object_id": "55037676930"
      },
      "createdAt": "2025-10-30T05:01:00.000Z",
      "updatedAt": "2025-10-30T05:04:00.000Z",
      "archived": false,
      "new": false
    }
  ],
  "status": "COMPLETE"
}
```

</details>

<details>
<summary>Archive a batch of notes</summary>

Signature: `post /batch/archive`

Archives (soft-deletes) multiple engagement notes by their IDs in a single request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BatchInputSimplePublicObjectId</code> | Yes | Array of note IDs to archive. |

Returns: `error?`

Sample code:

```ballerina
check notesClient->/batch/archive.post({
    inputs: [
        { id: "55037676930" },
        { id: "55037676931" }
    ]
});
```

</details>
