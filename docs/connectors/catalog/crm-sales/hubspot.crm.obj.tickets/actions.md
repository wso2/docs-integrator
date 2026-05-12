---
title: Actions
---

# Actions

The `ballerinax/hubspot.crm.obj.tickets` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Provides CRUD, search, merge, and batch operations for HubSpot CRM ticket records. |

---

## Client

Provides CRUD, search, merge, and batch operations for HubSpot CRM ticket records.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `http:BearerTokenConfig\|OAuth2RefreshTokenGrantConfig\|ApiKeysConfig` | Required | Authentication configuration: OAuth 2.0 refresh token grant, bearer token, or HubSpot Private App API key. |
| `httpVersion` | `http:HttpVersion` | `HTTP_2_0` | HTTP protocol version to use for requests. |
| `timeout` | `decimal` | `30` | Request timeout in seconds. |
| `retryConfig` | `http:RetryConfig` | `()` | Retry configuration for failed requests. |
| `secureSocket` | `http:ClientSecureSocket` | `()` | SSL/TLS configuration. |
| `proxy` | `http:ProxyConfig` | `()` | Proxy server configuration. |
| `validation` | `boolean` | `true` | Enables constraint validation on request and response payloads. |
| `laxDataBinding` | `boolean` | `true` | Enables lax data binding, allowing unknown fields in responses to be ignored. |

### Initializing the client

```ballerina
import ballerinax/hubspot.crm.obj.tickets as hstickets;
import ballerina/oauth2;

configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string refreshToken = ?;

hstickets:Client hubspotClient = check new ({
    auth: {
        clientId: clientId,
        clientSecret: clientSecret,
        refreshToken: refreshToken,
        credentialBearer: oauth2:POST_BODY_BEARER
    }
});
```

### Operations

#### Ticket operations

<details>
<summary>List</summary>

Lists all tickets accessible to the authenticated user, with optional filtering by properties and associations.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries.limit` | `int` | No | Maximum number of tickets to return per page. |
| `queries.after` | `string` | No | Pagination cursor token for the next page of results. |
| `queries.properties` | `string[]` | No | List of property names to include in the response. |
| `queries.associations` | `string[]` | No | List of object types to retrieve associated IDs for. |
| `queries.archived` | `boolean` | No | Set to `true` to return only archived tickets. |

Returns: `CollectionResponseSimplePublicObjectWithAssociationsForwardPaging|error`

Sample code:

```ballerina
hstickets:CollectionResponseSimplePublicObjectWithAssociationsForwardPaging ticketList =
    check hubspotClient->/.get();
```

Sample response:

```ballerina
{
  "results": [
    {
      "id": "12345678",
      "properties": {
        "subject": "Sample User Ticket",
        "hs_pipeline": "0",
        "hs_pipeline_stage": "1",
        "hs_ticket_priority": "LOW",
        "createdate": "2024-01-15T10:30:00.000Z"
      },
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z",
      "archived": false
    }
  ],
  "paging": {
    "next": {
      "after": "NTI1Cg%3D%3D",
      "link": "https://api.hubapi.com/crm/v3/objects/tickets?after=NTI1Cg%3D%3D"
    }
  }
}
```

</details>

<details>
<summary>Create</summary>

Creates a new ticket record in HubSpot CRM.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `SimplePublicObjectInputForCreate` | Yes | Ticket properties and optional associations for the new record. |

Returns: `SimplePublicObject|error`

Sample code:

```ballerina
hstickets:SimplePublicObjectInputForCreate payload = {
    properties: {
        "subject": "Sample User Ticket",
        "hs_pipeline": "0",
        "hs_pipeline_stage": "1",
        "hs_ticket_priority": "LOW",
        "content": "This is a sample ticket created using Ballerina"
    }
};
hstickets:SimplePublicObject createdTicket = check hubspotClient->/.post(payload);
```

Sample response:

```ballerina
{
  "id": "12345678",
  "properties": {
    "subject": "Sample User Ticket",
    "hs_pipeline": "0",
    "hs_pipeline_stage": "1",
    "hs_ticket_priority": "LOW",
    "content": "This is a sample ticket created using Ballerina",
    "createdate": "2024-01-15T10:30:00.000Z",
    "hs_lastmodifieddate": "2024-01-15T10:30:00.000Z"
  },
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z",
  "archived": false
}
```

</details>

<details>
<summary>Read</summary>

Retrieves a single ticket by its internal HubSpot ID, with optional property and association expansion.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ticketId` | `string` | Yes | The internal HubSpot ticket ID. |
| `queries.properties` | `string[]` | No | List of property names to include in the response. |
| `queries.propertiesWithHistory` | `string[]` | No | List of properties to return along with their historical values. |
| `queries.associations` | `string[]` | No | List of object types to retrieve associated IDs for. |
| `queries.archived` | `boolean` | No | Set to `true` to retrieve an archived ticket. |

Returns: `SimplePublicObjectWithAssociations|error`

Sample code:

```ballerina
hstickets:SimplePublicObjectWithAssociations ticket =
    check hubspotClient->/["12345678"].get();
```

Sample response:

```ballerina
{
  "id": "12345678",
  "properties": {
    "subject": "Sample User Ticket",
    "hs_pipeline": "0",
    "hs_pipeline_stage": "1",
    "hs_ticket_priority": "LOW",
    "content": "This is a sample ticket created using Ballerina",
    "createdate": "2024-01-15T10:30:00.000Z",
    "hs_lastmodifieddate": "2024-01-15T10:30:00.000Z"
  },
  "associations": {},
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z",
  "archived": false
}
```

</details>

<details>
<summary>Update</summary>

Updates the properties of an existing ticket by its internal ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ticketId` | `string` | Yes | The internal HubSpot ticket ID. |
| `payload` | `SimplePublicObjectInput` | Yes | Map of property names to updated values. |
| `queries.idProperty` | `string` | No | The name of a unique property to use as the identifier instead of the internal ID. |

Returns: `SimplePublicObject|error`

Sample code:

```ballerina
hstickets:SimplePublicObjectInput updatePayload = {
    properties: {
        "subject": "Sample User Ticket Updated",
        "hs_pipeline_stage": "1",
        "hs_ticket_priority": "HIGH",
        "content": "This is a sample ticket updated using Ballerina"
    }
};
hstickets:SimplePublicObject updatedTicket =
    check hubspotClient->/["12345678"].patch(updatePayload);
```

Sample response:

```ballerina
{
  "id": "12345678",
  "properties": {
    "subject": "Sample User Ticket Updated",
    "hs_pipeline": "0",
    "hs_pipeline_stage": "1",
    "hs_ticket_priority": "HIGH",
    "content": "This is a sample ticket updated using Ballerina",
    "createdate": "2024-01-15T10:30:00.000Z",
    "hs_lastmodifieddate": "2024-01-15T11:00:00.000Z"
  },
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T11:00:00.000Z",
  "archived": false
}
```

</details>

<details>
<summary>Archive</summary>

Archives (soft-deletes) a ticket by its internal ID. Archived tickets can be restored later.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ticketId` | `string` | Yes | The internal HubSpot ticket ID to archive. |

Returns: `error?`

Sample code:

```ballerina
check hubspotClient->/["12345678"].delete();
```

</details>

<details>
<summary>Merge two tickets with same type</summary>

Merges two tickets into one, with the secondary ticket's data folded into the primary ticket.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `PublicMergeInput` | Yes | Specifies the primary ticket ID and the secondary ticket ID to merge into it. |

Returns: `SimplePublicObject|error`

Sample code:

```ballerina
hstickets:PublicMergeInput mergePayload = {
    objectIdToMerge: "87654321",
    primaryObjectId: "12345678"
};
hstickets:SimplePublicObject mergedTicket =
    check hubspotClient->/merge.post(mergePayload);
```

Sample response:

```ballerina
{
  "id": "12345678",
  "properties": {
    "subject": "Sample User Ticket",
    "hs_pipeline": "0",
    "hs_pipeline_stage": "1",
    "hs_ticket_priority": "HIGH",
    "createdate": "2024-01-15T10:30:00.000Z",
    "hs_lastmodifieddate": "2024-01-15T12:00:00.000Z"
  },
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T12:00:00.000Z",
  "archived": false
}
```

</details>

<details>
<summary>Search</summary>

Searches for tickets using filter groups, property projections, sorting, and pagination.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `PublicObjectSearchRequest` | Yes | Search criteria including filter groups, properties to return, sort order, and pagination. |

Returns: `CollectionResponseWithTotalSimplePublicObjectForwardPaging|error`

Sample code:

```ballerina
hstickets:PublicObjectSearchRequest searchPayload = {
    filterGroups: [
        {
            filters: [
                {
                    propertyName: "hs_ticket_priority",
                    operator: "EQ",
                    value: "HIGH"
                }
            ]
        }
    ],
    properties: ["subject", "hs_pipeline_stage", "hs_ticket_priority"],
    sorts: ["createdate"],
    'limit: 10,
    after: 0
};
hstickets:CollectionResponseWithTotalSimplePublicObjectForwardPaging searchResults =
    check hubspotClient->/search.post(searchPayload);
```

Sample response:

```ballerina
{
  "total": 2,
  "results": [
    {
      "id": "12345678",
      "properties": {
        "subject": "High Priority Ticket",
        "hs_pipeline_stage": "1",
        "hs_ticket_priority": "HIGH"
      },
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z",
      "archived": false
    },
    {
      "id": "87654321",
      "properties": {
        "subject": "Critical System Issue",
        "hs_pipeline_stage": "2",
        "hs_ticket_priority": "HIGH"
      },
      "createdAt": "2024-01-14T08:00:00.000Z",
      "updatedAt": "2024-01-14T09:00:00.000Z",
      "archived": false
    }
  ]
}
```

</details>

#### Batch operations

<details>
<summary>Create a batch of tickets</summary>

Creates multiple ticket records in a single API call.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `BatchInputSimplePublicObjectInputForCreate` | Yes | A list of ticket property maps to create in bulk. |

Returns: `BatchResponseSimplePublicObject|BatchResponseSimplePublicObjectWithErrors|error`

Sample code:

```ballerina
hstickets:BatchInputSimplePublicObjectInputForCreate batchCreatePayload = {
    inputs: [
        {
            properties: {
                "subject": "Sample User Batch Ticket 1",
                "hs_pipeline": "0",
                "hs_pipeline_stage": "1",
                "hs_ticket_priority": "LOW",
                "content": "This is a sample ticket 1 created using Ballerina"
            }
        },
        {
            properties: {
                "subject": "Sample User Batch Ticket 2",
                "hs_pipeline": "0",
                "hs_pipeline_stage": "1",
                "hs_ticket_priority": "HIGH",
                "content": "This is a sample ticket 2 created using Ballerina"
            }
        }
    ]
};
hstickets:BatchResponseSimplePublicObject batchResponse =
    check hubspotClient->/batch/create.post(batchCreatePayload);
```

Sample response:

```ballerina
{
  "status": "COMPLETE",
  "results": [
    {
      "id": "11111111",
      "properties": {
        "subject": "Sample User Batch Ticket 1",
        "hs_pipeline": "0",
        "hs_pipeline_stage": "1",
        "hs_ticket_priority": "LOW",
        "createdate": "2024-01-15T10:30:00.000Z"
      },
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z",
      "archived": false
    },
    {
      "id": "22222222",
      "properties": {
        "subject": "Sample User Batch Ticket 2",
        "hs_pipeline": "0",
        "hs_pipeline_stage": "1",
        "hs_ticket_priority": "HIGH",
        "createdate": "2024-01-15T10:30:00.000Z"
      },
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z",
      "archived": false
    }
  ],
  "requestedAt": "2024-01-15T10:30:00.000Z",
  "startedAt": "2024-01-15T10:30:00.001Z",
  "completedAt": "2024-01-15T10:30:00.150Z"
}
```

</details>

<details>
<summary>Read a batch of tickets by internal ID, or unique property values</summary>

Retrieves multiple tickets in a single request using their internal IDs or unique property values.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `BatchReadInputSimplePublicObjectId` | Yes | List of ticket IDs and properties to retrieve. |
| `queries.archived` | `boolean` | No | Set to `true` to include archived tickets in the results. |

Returns: `BatchResponseSimplePublicObject|BatchResponseSimplePublicObjectWithErrors|error`

Sample code:

```ballerina
hstickets:BatchReadInputSimplePublicObjectId batchReadPayload = {
    propertiesWithHistory: [],
    ids: ["11111111", "22222222"],
    properties: ["subject", "hs_pipeline", "hs_pipeline_stage", "hs_ticket_priority"],
    inputs: []
};
hstickets:BatchResponseSimplePublicObject batchReadResponse =
    check hubspotClient->/batch/read.post(batchReadPayload);
```

Sample response:

```ballerina
{
  "status": "COMPLETE",
  "results": [
    {
      "id": "11111111",
      "properties": {
        "subject": "Sample User Batch Ticket 1",
        "hs_pipeline": "0",
        "hs_pipeline_stage": "1",
        "hs_ticket_priority": "LOW"
      },
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z",
      "archived": false
    },
    {
      "id": "22222222",
      "properties": {
        "subject": "Sample User Batch Ticket 2",
        "hs_pipeline": "0",
        "hs_pipeline_stage": "1",
        "hs_ticket_priority": "HIGH"
      },
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z",
      "archived": false
    }
  ],
  "requestedAt": "2024-01-15T10:30:00.000Z",
  "startedAt": "2024-01-15T10:30:00.001Z",
  "completedAt": "2024-01-15T10:30:00.100Z"
}
```

</details>

<details>
<summary>Update a batch of tickets by internal ID, or unique property values</summary>

Updates multiple tickets in a single request using their internal IDs or unique property values.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `BatchInputSimplePublicObjectBatchInput` | Yes | List of ticket IDs with the property updates to apply to each. |

Returns: `BatchResponseSimplePublicObject|BatchResponseSimplePublicObjectWithErrors|error`

Sample code:

```ballerina
hstickets:BatchInputSimplePublicObjectBatchInput batchUpdatePayload = {
    inputs: [
        {
            id: "11111111",
            properties: {
                "subject": "Sample User Batch Ticket 1 Updated",
                "hs_ticket_priority": "HIGH",
                "content": "This is a sample ticket 1 updated using Ballerina"
            }
        },
        {
            id: "22222222",
            properties: {
                "subject": "Sample User Batch Ticket 2 Updated",
                "hs_ticket_priority": "MEDIUM",
                "content": "This is a sample ticket 2 updated using Ballerina"
            }
        }
    ]
};
hstickets:BatchResponseSimplePublicObject batchUpdateResponse =
    check hubspotClient->/batch/update.post(batchUpdatePayload);
```

Sample response:

```ballerina
{
  "status": "COMPLETE",
  "results": [
    {
      "id": "11111111",
      "properties": {
        "subject": "Sample User Batch Ticket 1 Updated",
        "hs_ticket_priority": "HIGH",
        "hs_lastmodifieddate": "2024-01-15T11:00:00.000Z"
      },
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T11:00:00.000Z",
      "archived": false
    },
    {
      "id": "22222222",
      "properties": {
        "subject": "Sample User Batch Ticket 2 Updated",
        "hs_ticket_priority": "MEDIUM",
        "hs_lastmodifieddate": "2024-01-15T11:00:00.000Z"
      },
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T11:00:00.000Z",
      "archived": false
    }
  ],
  "requestedAt": "2024-01-15T11:00:00.000Z",
  "startedAt": "2024-01-15T11:00:00.001Z",
  "completedAt": "2024-01-15T11:00:00.120Z"
}
```

</details>

<details>
<summary>Archive a batch of tickets by ID</summary>

Archives multiple tickets in a single request by their internal IDs.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `BatchInputSimplePublicObjectId` | Yes | List of ticket IDs to archive. |

Returns: `error?`

Sample code:

```ballerina
hstickets:BatchInputSimplePublicObjectId batchArchivePayload = {
    inputs: [
        {id: "11111111"},
        {id: "22222222"}
    ]
};
check hubspotClient->/batch/archive.post(batchArchivePayload);
```

</details>

<details>
<summary>Create or update a batch of tickets by unique property values</summary>

Creates new tickets or updates existing ones matched by a unique property identifier, in a single request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `BatchInputSimplePublicObjectBatchInputUpsert` | Yes | List of tickets with an `idProperty` to match on and property values to create or update. |

Returns: `BatchResponseSimplePublicUpsertObject|BatchResponseSimplePublicUpsertObjectWithErrors|error`

Sample code:

```ballerina
hstickets:BatchInputSimplePublicObjectBatchInputUpsert upsertPayload = {
    inputs: [
        {
            idProperty: "subject",
            id: "Sample User Ticket",
            properties: {
                "hs_ticket_priority": "HIGH",
                "hs_pipeline_stage": "2"
            }
        }
    ]
};
hstickets:BatchResponseSimplePublicUpsertObject upsertResponse =
    check hubspotClient->/batch/upsert.post(upsertPayload);
```

Sample response:

```ballerina
{
  "status": "COMPLETE",
  "results": [
    {
      "id": "12345678",
      "properties": {
        "subject": "Sample User Ticket",
        "hs_ticket_priority": "HIGH",
        "hs_pipeline_stage": "2",
        "hs_lastmodifieddate": "2024-01-15T12:00:00.000Z"
      },
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T12:00:00.000Z",
      "archived": false,
      "new": false
    }
  ],
  "requestedAt": "2024-01-15T12:00:00.000Z",
  "startedAt": "2024-01-15T12:00:00.001Z",
  "completedAt": "2024-01-15T12:00:00.200Z"
}
```

</details>
