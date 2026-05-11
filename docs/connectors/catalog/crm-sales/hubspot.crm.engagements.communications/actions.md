---
title: Actions
---

# Actions

The `ballerinax/hubspot.crm.engagements.communications` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Manage HubSpot communication records: CRUD, batch operations, and search. |

---

## Client

Manage HubSpot communication records: CRUD, batch operations, and search.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | <code>http:BearerTokenConfig&#124;OAuth2RefreshTokenGrantConfig&#124;ApiKeysConfig</code> | Required | Authentication configuration: OAuth 2.0 refresh token, bearer token, or API keys. |
| `httpVersion` | <code>HttpVersion</code> | `HTTP_2_0` | HTTP protocol version. |
| `timeout` | <code>decimal</code> | `30` | Request timeout in seconds. |
| `retryConfig` | <code>RetryConfig</code> | `()` | Retry configuration for failed requests. |
| `secureSocket` | <code>ClientSecureSocket</code> | `()` | SSL/TLS configuration. |
| `proxy` | <code>ProxyConfig</code> | `()` | Proxy server configuration. |

### Initializing the client

```ballerina
import ballerinax/hubspot.crm.engagements.communications;

configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string refreshToken = ?;

communications:Client communicationsClient = check new ({
    auth: {
        clientId: clientId,
        clientSecret: clientSecret,
        refreshToken: refreshToken,
        refreshUrl: "https://api.hubapi.com/oauth/v1/token"
    }
});
```

### Operations

#### Single record operations

<details>
<summary>Create a communication</summary>

Signature: `post /`

Creates a new communication record with the specified properties and optional associations.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>SimplePublicObjectInputForCreate</code> | Yes | The communication properties and associations. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |

Returns: `SimplePublicObject|error`

Sample code:

```ballerina
communications:SimplePublicObject response = check communicationsClient->/.post({
    properties: {
        "hs_communication_channel_type": "WHATS_APP",
        "hs_communication_logged_from": "CRM",
        "hs_communication_body": "Hello! This is a WhatsApp message."
    },
    associations: [
        {
            types: [
                {
                    associationCategory: "HUBSPOT_DEFINED",
                    associationTypeId: 81
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
  "id": "67890",
  "properties": {
    "hs_communication_channel_type": "WHATS_APP",
    "hs_communication_logged_from": "CRM",
    "hs_communication_body": "Hello! This is a WhatsApp message.",
    "hs_createdate": "2025-01-15T10:30:00.000Z",
    "hs_lastmodifieddate": "2025-01-15T10:30:00.000Z",
    "hs_object_id": "67890"
  },
  "createdAt": "2025-01-15T10:30:00.000Z",
  "updatedAt": "2025-01-15T10:30:00.000Z",
  "archived": false
}
```

</details>

<details>
<summary>Retrieve messages</summary>

Signature: `get /`

Retrieves a paginated list of communication records with optional property and association filtering.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |
| `queries` | <code>GetCrmV3ObjectsCommunicationsGetPageQueries</code> | No | Query parameters including `limit`, `after`, `properties`, `associations`, `archived`, and `propertiesWithHistory`. |

Returns: `CollectionResponseSimplePublicObjectWithAssociationsForwardPaging|error`

Sample code:

```ballerina
communications:CollectionResponseSimplePublicObjectWithAssociationsForwardPaging response =
    check communicationsClient->/.get(
        queries = {
            'limit: 10,
            properties: ["hs_communication_channel_type", "hs_communication_body"]
        }
    );
```

Sample response:

```ballerina
{
  "results": [
    {
      "id": "67890",
      "properties": {
        "hs_communication_channel_type": "WHATS_APP",
        "hs_communication_body": "Hello! This is a WhatsApp message.",
        "hs_createdate": "2025-01-15T10:30:00.000Z",
        "hs_lastmodifieddate": "2025-01-15T10:30:00.000Z",
        "hs_object_id": "67890"
      },
      "createdAt": "2025-01-15T10:30:00.000Z",
      "updatedAt": "2025-01-15T10:30:00.000Z",
      "archived": false
    }
  ],
  "paging": {
    "next": {
      "after": "67890",
      "link": "https://api.hubapi.com/crm/v3/objects/communications?after=67890"
    }
  }
}
```

</details>

<details>
<summary>Retrieve a message</summary>

Signature: `get /[string communicationId]`

Retrieves a single communication record by its ID, with optional properties and associations.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `communicationId` | <code>string</code> | Yes | The ID of the communication record to retrieve. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |
| `queries` | <code>GetCrmV3ObjectsCommunicationsCommunicationIdGetByIdQueries</code> | No | Query parameters including `properties`, `associations`, `archived`, `propertiesWithHistory`, and `idProperty`. |

Returns: `SimplePublicObjectWithAssociations|error`

Sample code:

```ballerina
communications:SimplePublicObjectWithAssociations response =
    check communicationsClient->/["67890"].get(
        queries = {
            properties: ["hs_communication_channel_type", "hs_communication_body"]
        }
    );
```

Sample response:

```ballerina
{
  "id": "67890",
  "properties": {
    "hs_communication_channel_type": "WHATS_APP",
    "hs_communication_body": "Hello! This is a WhatsApp message.",
    "hs_createdate": "2025-01-15T10:30:00.000Z",
    "hs_lastmodifieddate": "2025-01-15T10:30:00.000Z",
    "hs_object_id": "67890"
  },
  "createdAt": "2025-01-15T10:30:00.000Z",
  "updatedAt": "2025-01-15T10:30:00.000Z",
  "archived": false
}
```

</details>

<details>
<summary>Update a message</summary>

Signature: `patch /[string communicationId]`

Updates an existing communication record with new property values.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `communicationId` | <code>string</code> | Yes | The ID of the communication record to update. |
| `payload` | <code>SimplePublicObjectInput</code> | Yes | The properties to update. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |
| `queries` | <code>PatchCrmV3ObjectsCommunicationsCommunicationIdUpdateQueries</code> | No | Query parameters including `idProperty`. |

Returns: `SimplePublicObject|error`

Sample code:

```ballerina
communications:SimplePublicObject response = check communicationsClient->/["67890"].patch({
    properties: {
        "hs_communication_body": "Updated message body content."
    }
});
```

Sample response:

```ballerina
{
  "id": "67890",
  "properties": {
    "hs_communication_channel_type": "WHATS_APP",
    "hs_communication_body": "Updated message body content.",
    "hs_createdate": "2025-01-15T10:30:00.000Z",
    "hs_lastmodifieddate": "2025-01-15T11:00:00.000Z",
    "hs_object_id": "67890"
  },
  "createdAt": "2025-01-15T10:30:00.000Z",
  "updatedAt": "2025-01-15T11:00:00.000Z",
  "archived": false
}
```

</details>

<details>
<summary>Archive a message</summary>

Signature: `delete /[string communicationId]`

Archives (soft-deletes) a communication record by its ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `communicationId` | <code>string</code> | Yes | The ID of the communication record to archive. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |

Returns: `error?`

Sample code:

```ballerina
check communicationsClient->/["67890"].delete();
```

</details>

#### Batch operations

<details>
<summary>Create a batch of messages</summary>

Signature: `post /batch/create`

Creates multiple communication records in a single batch request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BatchInputSimplePublicObjectInputForCreate</code> | Yes | Batch input containing an array of communication records to create. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |

Returns: `BatchResponseSimplePublicObject|BatchResponseSimplePublicObjectWithErrors|error`

Sample code:

```ballerina
communications:BatchResponseSimplePublicObject|communications:BatchResponseSimplePublicObjectWithErrors response =
    check communicationsClient->/batch/create.post({
        inputs: [
            {
                properties: {
                    "hs_communication_channel_type": "LINKEDIN_MESSAGE",
                    "hs_communication_logged_from": "CRM",
                    "hs_communication_body": "First LinkedIn message"
                },
                associations: [
                    {
                        types: [{associationCategory: "HUBSPOT_DEFINED", associationTypeId: 81}],
                        to: {id: "12345"}
                    }
                ]
            },
            {
                properties: {
                    "hs_communication_channel_type": "LINKEDIN_MESSAGE",
                    "hs_communication_logged_from": "CRM",
                    "hs_communication_body": "Second LinkedIn message"
                },
                associations: [
                    {
                        types: [{associationCategory: "HUBSPOT_DEFINED", associationTypeId: 81}],
                        to: {id: "12346"}
                    }
                ]
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
      "id": "67891",
      "properties": {
        "hs_communication_channel_type": "LINKEDIN_MESSAGE",
        "hs_communication_body": "First LinkedIn message",
        "hs_object_id": "67891"
      },
      "createdAt": "2025-01-15T10:30:00.000Z",
      "updatedAt": "2025-01-15T10:30:00.000Z",
      "archived": false
    },
    {
      "id": "67892",
      "properties": {
        "hs_communication_channel_type": "LINKEDIN_MESSAGE",
        "hs_communication_body": "Second LinkedIn message",
        "hs_object_id": "67892"
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
<summary>Retrieve a batch of messages</summary>

Signature: `post /batch/read`

Retrieves multiple communication records by their IDs in a single batch request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BatchReadInputSimplePublicObjectId</code> | Yes | Batch input containing record IDs, requested properties, and properties with history. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |
| `queries` | <code>PostCrmV3ObjectsCommunicationsBatchReadReadQueries</code> | No | Query parameters including `archived`. |

Returns: `BatchResponseSimplePublicObject|BatchResponseSimplePublicObjectWithErrors|error`

Sample code:

```ballerina
communications:BatchResponseSimplePublicObject|communications:BatchResponseSimplePublicObjectWithErrors response =
    check communicationsClient->/batch/read.post({
        properties: ["hs_communication_channel_type", "hs_communication_body"],
        propertiesWithHistory: ["hs_communication_body"],
        inputs: [
            {id: "67891"},
            {id: "67892"}
        ]
    });
```

Sample response:

```ballerina
{
  "status": "COMPLETE",
  "results": [
    {
      "id": "67891",
      "properties": {
        "hs_communication_channel_type": "LINKEDIN_MESSAGE",
        "hs_communication_body": "First LinkedIn message",
        "hs_object_id": "67891"
      },
      "propertiesWithHistory": {
        "hs_communication_body": [
          {
            "value": "First LinkedIn message",
            "timestamp": "2025-01-15T10:30:00.000Z",
            "sourceType": "CRM_UI",
            "sourceId": "userId:12345"
          }
        ]
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
<summary>Update a batch of messages</summary>

Signature: `post /batch/update`

Updates multiple communication records in a single batch request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BatchInputSimplePublicObjectBatchInput</code> | Yes | Batch input containing record IDs and properties to update. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |

Returns: `BatchResponseSimplePublicObject|BatchResponseSimplePublicObjectWithErrors|error`

Sample code:

```ballerina
communications:BatchResponseSimplePublicObject|communications:BatchResponseSimplePublicObjectWithErrors response =
    check communicationsClient->/batch/update.post({
        inputs: [
            {
                id: "67891",
                properties: {
                    "hs_communication_body": "Updated first message"
                }
            },
            {
                id: "67892",
                properties: {
                    "hs_communication_body": "Updated second message"
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
      "id": "67891",
      "properties": {
        "hs_communication_channel_type": "LINKEDIN_MESSAGE",
        "hs_communication_body": "Updated first message",
        "hs_object_id": "67891"
      },
      "createdAt": "2025-01-15T10:30:00.000Z",
      "updatedAt": "2025-01-15T11:00:00.000Z",
      "archived": false
    },
    {
      "id": "67892",
      "properties": {
        "hs_communication_channel_type": "LINKEDIN_MESSAGE",
        "hs_communication_body": "Updated second message",
        "hs_object_id": "67892"
      },
      "createdAt": "2025-01-15T10:30:00.000Z",
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
<summary>Create and update a batch of messages</summary>

Signature: `post /batch/upsert`

Creates or updates multiple communication records in a single batch request based on a unique ID property.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BatchInputSimplePublicObjectBatchInputUpsert</code> | Yes | Batch input containing records to upsert with their ID property and properties. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |

Returns: `BatchResponseSimplePublicUpsertObject|BatchResponseSimplePublicUpsertObjectWithErrors|error`

Sample code:

```ballerina
communications:BatchResponseSimplePublicUpsertObject|communications:BatchResponseSimplePublicUpsertObjectWithErrors response =
    check communicationsClient->/batch/upsert.post({
        inputs: [
            {
                id: "67891",
                idProperty: "hs_object_id",
                properties: {
                    "hs_communication_body": "Upserted message content"
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
      "id": "67891",
      "properties": {
        "hs_communication_body": "Upserted message content",
        "hs_object_id": "67891"
      },
      "new": false,
      "createdAt": "2025-01-15T10:30:00.000Z",
      "updatedAt": "2025-01-15T11:30:00.000Z",
      "archived": false
    }
  ],
  "startedAt": "2025-01-15T11:30:00.000Z",
  "completedAt": "2025-01-15T11:30:01.000Z"
}
```

</details>

<details>
<summary>Archive a batch of messages</summary>

Signature: `post /batch/archive`

Archives (soft-deletes) multiple communication records in a single batch request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BatchInputSimplePublicObjectId</code> | Yes | Batch input containing an array of record IDs to archive. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |

Returns: `error?`

Sample code:

```ballerina
check communicationsClient->/batch/archive.post({
    inputs: [
        {id: "67891"},
        {id: "67892"}
    ]
});
```

</details>

#### Search

<details>
<summary>Search for messages</summary>

Signature: `post /search`

Searches for communication records using filters, query text, and sorting options.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>PublicObjectSearchRequest</code> | Yes | Search request with filters, query, sorting, properties, and pagination. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |

Returns: `CollectionResponseWithTotalSimplePublicObjectForwardPaging|error`

Sample code:

```ballerina
communications:CollectionResponseWithTotalSimplePublicObjectForwardPaging response =
    check communicationsClient->/search.post({
        filterGroups: [
            {
                filters: [
                    {
                        propertyName: "hs_communication_channel_type",
                        operator: "EQ",
                        value: "WHATS_APP"
                    }
                ]
            }
        ],
        properties: ["hs_communication_channel_type", "hs_communication_body"],
        'limit: 10
    });
```

Sample response:

```ballerina
{
  "total": 1,
  "results": [
    {
      "id": "67890",
      "properties": {
        "hs_communication_channel_type": "WHATS_APP",
        "hs_communication_body": "Hello! This is a WhatsApp message.",
        "hs_createdate": "2025-01-15T10:30:00.000Z",
        "hs_lastmodifieddate": "2025-01-15T10:30:00.000Z",
        "hs_object_id": "67890"
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
