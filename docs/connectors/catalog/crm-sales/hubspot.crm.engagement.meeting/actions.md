---
title: Actions
---

# Actions

The `ballerinax/hubspot.crm.engagement.meeting` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | HubSpot Meetings API v3: meeting CRUD, batch operations, and search. |

---

## Client

HubSpot Meetings API v3: meeting CRUD, batch operations, and search.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `http:BearerTokenConfig\|OAuth2RefreshTokenGrantConfig\|ApiKeysConfig` | Required | Authentication configuration: OAuth 2.0 refresh token grant, bearer token, or API key. |
| `httpVersion` | `http:HttpVersion` | `http:HTTP_2_0` | HTTP protocol version. |
| `timeout` | `decimal` | `30` | Request timeout in seconds. |
| `retryConfig` | `http:RetryConfig` | `()` | Retry configuration for failed requests. |
| `secureSocket` | `http:ClientSecureSocket` | `()` | SSL/TLS configuration. |
| `proxy` | `http:ProxyConfig` | `()` | Proxy server configuration. |
| `circuitBreaker` | `http:CircuitBreakerConfig` | `()` | Circuit breaker configuration for fault tolerance. |
| `compression` | `http:Compression` | `http:COMPRESSION_AUTO` | Content compression setting. |
| `validation` | `boolean` | `true` | Enable or disable payload validation. |

### Initializing the client

```ballerina
import ballerinax/hubspot.crm.engagement.meeting as hsmeetings;

configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string refreshToken = ?;

hsmeetings:Client meetingsClient = check new ({
    auth: {
        clientId: clientId,
        clientSecret: clientSecret,
        refreshToken: refreshToken,
        refreshUrl: "https://api.hubapi.com/oauth/v1/token"
    }
});
```

### Operations

#### Meeting CRUD

<details>
<summary>List meetings</summary>

Retrieves a paginated list of meeting engagements with optional property and association filters.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `GetCrmV3ObjectsMeetingsGetPageQueries` | No | Query parameters including `limit`, `after`, `properties`, `associations`, and `archived`. |

Returns: `CollectionResponseSimplePublicObjectWithAssociationsForwardPaging|error`

Sample code:

```ballerina
hsmeetings:CollectionResponseSimplePublicObjectWithAssociationsForwardPaging response =
    check meetingsClient->/.get(queries = {'limit: 10, properties: ["hs_meeting_title", "hs_meeting_start_time"]});
```

Sample response:

```ballerina
{
  "results": [
    {
      "id": "12345678901",
      "properties": {
        "hs_meeting_title": "Quarterly Review",
        "hs_meeting_start_time": "2026-03-20T10:00:00Z",
        "hs_createdate": "2026-03-15T08:00:00.000Z",
        "hs_lastmodifieddate": "2026-03-15T08:00:00.000Z",
        "hs_object_id": "12345678901"
      },
      "createdAt": "2026-03-15T08:00:00.000Z",
      "updatedAt": "2026-03-15T08:00:00.000Z",
      "archived": false
    }
  ],
  "paging": {
    "next": {
      "after": "12345678902",
      "link": "https://api.hubapi.com/crm/v3/objects/meetings?after=12345678902"
    }
  }
}
```

</details>

<details>
<summary>Create a meeting</summary>

Creates a new meeting engagement with the specified properties and optional associations.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `SimplePublicObjectInputForCreate` | Yes | Meeting properties and associations. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `SimplePublicObject|error`

Sample code:

```ballerina
hsmeetings:SimplePublicObject meeting = check meetingsClient->/.post({
    properties: {
        "hs_timestamp": "2026-03-20T10:00:00.000Z",
        "hs_meeting_title": "Project Kickoff",
        "hs_meeting_body": "Discuss project scope and deliverables",
        "hs_meeting_start_time": "2026-03-20T10:00:00.000Z",
        "hs_meeting_end_time": "2026-03-20T11:00:00.000Z",
        "hs_meeting_location": "Conference Room A",
        "hs_meeting_outcome": "SCHEDULED"
    },
    associations: [
        {
            types: [
                {
                    associationCategory: "HUBSPOT_DEFINED",
                    associationTypeId: 200
                }
            ],
            to: {
                id: contactId
            }
        }
    ]
});
```

Sample response:

```ballerina
{
  "id": "12345678902",
  "properties": {
    "hs_timestamp": "2026-03-20T10:00:00.000Z",
    "hs_meeting_title": "Project Kickoff",
    "hs_meeting_body": "Discuss project scope and deliverables",
    "hs_meeting_start_time": "2026-03-20T10:00:00.000Z",
    "hs_meeting_end_time": "2026-03-20T11:00:00.000Z",
    "hs_meeting_location": "Conference Room A",
    "hs_meeting_outcome": "SCHEDULED",
    "hs_createdate": "2026-03-15T08:00:00.000Z",
    "hs_lastmodifieddate": "2026-03-15T08:00:00.000Z",
    "hs_object_id": "12345678902"
  },
  "createdAt": "2026-03-15T08:00:00.000Z",
  "updatedAt": "2026-03-15T08:00:00.000Z",
  "archived": false
}
```

</details>

<details>
<summary>Get a meeting by ID</summary>

Retrieves a single meeting engagement by its ID, with optional property and association expansion.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | `string` | Yes | The HubSpot meeting ID. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `GetCrmV3ObjectsMeetingsMeetingIdGetByIdQueries` | No | Query parameters including `properties`, `associations`, and `archived`. |

Returns: `SimplePublicObjectWithAssociations|error`

Sample code:

```ballerina
hsmeetings:SimplePublicObjectWithAssociations meeting =
    check meetingsClient->/[meetingId].get(queries = {properties: ["hs_meeting_title", "hs_meeting_start_time"]});
```

Sample response:

```ballerina
{
  "id": "12345678902",
  "properties": {
    "hs_meeting_title": "Project Kickoff",
    "hs_meeting_start_time": "2026-03-20T10:00:00.000Z",
    "hs_createdate": "2026-03-15T08:00:00.000Z",
    "hs_lastmodifieddate": "2026-03-15T08:00:00.000Z",
    "hs_object_id": "12345678902"
  },
  "createdAt": "2026-03-15T08:00:00.000Z",
  "updatedAt": "2026-03-15T08:00:00.000Z",
  "archived": false
}
```

</details>

<details>
<summary>Update a meeting</summary>

Updates properties of an existing meeting engagement.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | `string` | Yes | The HubSpot meeting ID. |
| `payload` | `SimplePublicObjectInput` | Yes | Properties to update. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `PatchCrmV3ObjectsMeetingsMeetingIdUpdateQueries` | No | Query parameters including optional `idProperty`. |

Returns: `SimplePublicObject|error`

Sample code:

```ballerina
hsmeetings:SimplePublicObject updated = check meetingsClient->/[meetingId].patch({
    properties: {
        "hs_meeting_title": "Updated Project Kickoff",
        "hs_meeting_location": "Virtual: Zoom"
    }
});
```

Sample response:

```ballerina
{
  "id": "12345678902",
  "properties": {
    "hs_meeting_title": "Updated Project Kickoff",
    "hs_meeting_location": "Virtual: Zoom",
    "hs_createdate": "2026-03-15T08:00:00.000Z",
    "hs_lastmodifieddate": "2026-03-16T09:30:00.000Z",
    "hs_object_id": "12345678902"
  },
  "createdAt": "2026-03-15T08:00:00.000Z",
  "updatedAt": "2026-03-16T09:30:00.000Z",
  "archived": false
}
```

</details>

<details>
<summary>Delete a meeting</summary>

Archives (soft-deletes) a meeting engagement by its ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | `string` | Yes | The HubSpot meeting ID. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `error?`

Sample code:

```ballerina
check meetingsClient->/[meetingId].delete();
```

</details>

#### Batch operations

<details>
<summary>Batch create meetings</summary>

Creates multiple meeting engagements in a single request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `BatchInputSimplePublicObjectInputForCreate` | Yes | Array of meeting inputs with properties and associations. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `BatchResponseSimplePublicObject|BatchResponseSimplePublicObjectWithErrors|error`

Sample code:

```ballerina
hsmeetings:BatchResponseSimplePublicObject|hsmeetings:BatchResponseSimplePublicObjectWithErrors response =
    check meetingsClient->/batch/create.post({
        inputs: [
            {
                properties: {
                    "hs_timestamp": "2026-03-21T14:00:00.000Z",
                    "hs_meeting_title": "Sprint Planning",
                    "hs_meeting_start_time": "2026-03-21T14:00:00.000Z",
                    "hs_meeting_end_time": "2026-03-21T15:00:00.000Z"
                },
                associations: []
            },
            {
                properties: {
                    "hs_timestamp": "2026-03-22T09:00:00.000Z",
                    "hs_meeting_title": "Design Review",
                    "hs_meeting_start_time": "2026-03-22T09:00:00.000Z",
                    "hs_meeting_end_time": "2026-03-22T10:00:00.000Z"
                },
                associations: []
            }
        ]
    });
```

Sample response:

```ballerina
{
  "completedAt": "2026-03-15T08:01:00.000Z",
  "startedAt": "2026-03-15T08:00:59.000Z",
  "status": "COMPLETE",
  "results": [
    {
      "id": "12345678903",
      "properties": {
        "hs_meeting_title": "Sprint Planning",
        "hs_meeting_start_time": "2026-03-21T14:00:00.000Z",
        "hs_meeting_end_time": "2026-03-21T15:00:00.000Z"
      },
      "createdAt": "2026-03-15T08:01:00.000Z",
      "updatedAt": "2026-03-15T08:01:00.000Z",
      "archived": false
    },
    {
      "id": "12345678904",
      "properties": {
        "hs_meeting_title": "Design Review",
        "hs_meeting_start_time": "2026-03-22T09:00:00.000Z",
        "hs_meeting_end_time": "2026-03-22T10:00:00.000Z"
      },
      "createdAt": "2026-03-15T08:01:00.000Z",
      "updatedAt": "2026-03-15T08:01:00.000Z",
      "archived": false
    }
  ]
}
```

</details>

<details>
<summary>Batch read meetings</summary>

Reads multiple meeting engagements by their IDs in a single request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `BatchReadInputSimplePublicObjectId` | Yes | Meeting IDs and properties to retrieve. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `PostCrmV3ObjectsMeetingsBatchReadReadQueries` | No | Query parameters including `archived`. |

Returns: `BatchResponseSimplePublicObject|BatchResponseSimplePublicObjectWithErrors|error`

Sample code:

```ballerina
hsmeetings:BatchResponseSimplePublicObject|hsmeetings:BatchResponseSimplePublicObjectWithErrors response =
    check meetingsClient->/batch/read.post({
        inputs: [{id: meetingId1}, {id: meetingId2}],
        properties: ["hs_meeting_title", "hs_meeting_start_time"],
        propertiesWithHistory: []
    });
```

Sample response:

```ballerina
{
  "completedAt": "2026-03-15T08:01:00.000Z",
  "startedAt": "2026-03-15T08:00:59.000Z",
  "status": "COMPLETE",
  "results": [
    {
      "id": "12345678903",
      "properties": {
        "hs_meeting_title": "Sprint Planning",
        "hs_meeting_start_time": "2026-03-21T14:00:00.000Z"
      },
      "createdAt": "2026-03-15T08:01:00.000Z",
      "updatedAt": "2026-03-15T08:01:00.000Z",
      "archived": false
    }
  ]
}
```

</details>

<details>
<summary>Batch update meetings</summary>

Updates properties of multiple meeting engagements in a single request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `BatchInputSimplePublicObjectBatchInput` | Yes | Array of meeting IDs and properties to update. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `BatchResponseSimplePublicObject|BatchResponseSimplePublicObjectWithErrors|error`

Sample code:

```ballerina
hsmeetings:BatchResponseSimplePublicObject|hsmeetings:BatchResponseSimplePublicObjectWithErrors response =
    check meetingsClient->/batch/update.post({
        inputs: [
            {
                id: meetingId1,
                properties: {
                    "hs_meeting_title": "Updated Sprint Planning"
                }
            },
            {
                id: meetingId2,
                properties: {
                    "hs_meeting_outcome": "COMPLETED"
                }
            }
        ]
    });
```

Sample response:

```ballerina
{
  "completedAt": "2026-03-16T10:00:00.000Z",
  "startedAt": "2026-03-16T09:59:59.000Z",
  "status": "COMPLETE",
  "results": [
    {
      "id": "12345678903",
      "properties": {
        "hs_meeting_title": "Updated Sprint Planning"
      },
      "createdAt": "2026-03-15T08:01:00.000Z",
      "updatedAt": "2026-03-16T10:00:00.000Z",
      "archived": false
    }
  ]
}
```

</details>

<details>
<summary>Batch archive meetings</summary>

Archives (soft-deletes) multiple meeting engagements in a single request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `BatchInputSimplePublicObjectId` | Yes | Array of meeting IDs to archive. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `error?`

Sample code:

```ballerina
check meetingsClient->/batch/archive.post({
    inputs: [{id: meetingId1}, {id: meetingId2}]
});
```

</details>

<details>
<summary>Batch upsert meetings</summary>

Creates or updates multiple meeting engagements in a single request based on a unique identifier.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `BatchInputSimplePublicObjectBatchInputUpsert` | Yes | Array of meeting inputs with IDs and properties for upsert. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `BatchResponseSimplePublicUpsertObject|BatchResponseSimplePublicUpsertObjectWithErrors|error`

Sample code:

```ballerina
hsmeetings:BatchResponseSimplePublicUpsertObject|hsmeetings:BatchResponseSimplePublicUpsertObjectWithErrors response =
    check meetingsClient->/batch/upsert.post({
        inputs: [
            {
                id: "12345678903",
                properties: {
                    "hs_meeting_title": "Upserted Meeting",
                    "hs_meeting_start_time": "2026-03-25T10:00:00.000Z",
                    "hs_meeting_end_time": "2026-03-25T11:00:00.000Z"
                }
            }
        ]
    });
```

Sample response:

```ballerina
{
  "completedAt": "2026-03-16T10:00:00.000Z",
  "startedAt": "2026-03-16T09:59:59.000Z",
  "status": "COMPLETE",
  "results": [
    {
      "id": "12345678903",
      "properties": {
        "hs_meeting_title": "Upserted Meeting",
        "hs_meeting_start_time": "2026-03-25T10:00:00.000Z",
        "hs_meeting_end_time": "2026-03-25T11:00:00.000Z"
      },
      "createdAt": "2026-03-15T08:01:00.000Z",
      "updatedAt": "2026-03-16T10:00:00.000Z",
      "new": false,
      "archived": false
    }
  ]
}
```

</details>

#### Search

<details>
<summary>Search meetings</summary>

Searches meeting engagements using filters, query strings, and sorting criteria.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `PublicObjectSearchRequest` | Yes | Search request with filters, query, sorts, properties, and pagination. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `CollectionResponseWithTotalSimplePublicObjectForwardPaging|error`

Sample code:

```ballerina
hsmeetings:CollectionResponseWithTotalSimplePublicObjectForwardPaging response =
    check meetingsClient->/search.post({
        filterGroups: [
            {
                filters: [
                    {
                        propertyName: "hs_meeting_title",
                        operator: "CONTAINS_TOKEN",
                        value: "Kickoff"
                    }
                ]
            }
        ],
        properties: ["hs_meeting_title", "hs_meeting_start_time", "hs_meeting_outcome"],
        'limit: 5
    });
```

Sample response:

```ballerina
{
  "total": 1,
  "results": [
    {
      "id": "12345678902",
      "properties": {
        "hs_meeting_title": "Project Kickoff",
        "hs_meeting_start_time": "2026-03-20T10:00:00.000Z",
        "hs_meeting_outcome": "SCHEDULED",
        "hs_createdate": "2026-03-15T08:00:00.000Z",
        "hs_lastmodifieddate": "2026-03-15T08:00:00.000Z",
        "hs_object_id": "12345678902"
      },
      "createdAt": "2026-03-15T08:00:00.000Z",
      "updatedAt": "2026-03-15T08:00:00.000Z",
      "archived": false
    }
  ]
}
```

</details>
