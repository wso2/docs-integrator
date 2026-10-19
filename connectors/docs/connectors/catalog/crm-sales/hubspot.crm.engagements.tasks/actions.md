---
title: Actions
---

# Actions

The `ballerinax/hubspot.crm.engagements.tasks` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Manage HubSpot task engagement records: CRUD, batch operations, and search. |

---

## Client

Manage HubSpot task engagement records: CRUD, batch operations, and search.

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
import ballerinax/hubspot.crm.engagements.tasks;

configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string refreshToken = ?;

tasks:Client tasksClient = check new ({
    auth: {
        clientId: clientId,
        clientSecret: clientSecret,
        refreshToken: refreshToken,
        refreshUrl: "https://api.hubapi.com/oauth/v1/token"
    }
});
```

### Operations

#### Task CRUD

<details>
<summary>List of the tasks</summary>

Signature: `get /`

Retrieves a page of task engagement records with optional filtering by properties, associations, and pagination.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |
| `queries` | <code>GetCrmV3ObjectsTasksGetPageQueries</code> | No | Query parameters including `limit`, `after`, `properties`, `associations`, and `archived`. |

Returns: `CollectionResponseSimplePublicObjectWithAssociationsForwardPaging|error`

Sample code:

```ballerina
tasks:CollectionResponseSimplePublicObjectWithAssociationsForwardPaging response =
    check tasksClient->/.get();
```

Sample response:

```ballerina
{
  "results": [
    {
      "id": "78901234567",
      "properties": {
        "hs_createdate": "2025-01-15T10:30:00.000Z",
        "hs_lastmodifieddate": "2025-01-15T10:30:00.000Z",
        "hs_object_id": "78901234567",
        "hs_task_subject": "Follow up with client"
      },
      "createdAt": "2025-01-15T10:30:00.000Z",
      "updatedAt": "2025-01-15T10:30:00.000Z",
      "archived": false
    }
  ],
  "paging": {
    "next": {
      "after": "78901234567",
      "link": "https://api.hubapi.com/crm/v3/objects/tasks?after=78901234567"
    }
  }
}
```

</details>

<details>
<summary>Create a task</summary>

Signature: `post /`

Creates a new task engagement record with the specified properties and optional associations.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>SimplePublicObjectInputForCreate</code> | Yes | Task properties and optional associations. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |

Returns: `SimplePublicObject|error`

Sample code:

```ballerina
tasks:SimplePublicObject response = check tasksClient->/.post({
    properties: {
        "hs_timestamp": "2025-01-15T10:30:00.000Z",
        "hs_task_subject": "Follow up with client",
        "hs_task_body": "Discuss contract renewal terms and next steps.",
        "hs_task_priority": "HIGH",
        "hs_task_type": "TODO",
        "hs_task_status": "NOT_STARTED"
    },
    associations: [
        {
            types: [
                {
                    associationCategory: "HUBSPOT_DEFINED",
                    associationTypeId: 204
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
  "id": "78901234567",
  "properties": {
    "hs_timestamp": "2025-01-15T10:30:00.000Z",
    "hs_task_subject": "Follow up with client",
    "hs_task_body": "Discuss contract renewal terms and next steps.",
    "hs_task_priority": "HIGH",
    "hs_task_type": "TODO",
    "hs_task_status": "NOT_STARTED",
    "hs_createdate": "2025-01-15T10:30:00.000Z",
    "hs_lastmodifieddate": "2025-01-15T10:30:00.000Z",
    "hs_object_id": "78901234567"
  },
  "createdAt": "2025-01-15T10:30:00.000Z",
  "updatedAt": "2025-01-15T10:30:00.000Z",
  "archived": false
}
```

</details>

<details>
<summary>Read a task</summary>

Signature: `get /[string taskId]`

Retrieves a single task engagement record by its ID, with optional property and association details.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `taskId` | <code>string</code> | Yes | The ID of the task to retrieve. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |
| `queries` | <code>GetCrmV3ObjectsTasksTaskIdGetByIdQueries</code> | No | Query parameters including `properties`, `associations`, and `archived`. |

Returns: `SimplePublicObjectWithAssociations|error`

Sample code:

```ballerina
tasks:SimplePublicObjectWithAssociations response =
    check tasksClient->/["78901234567"].get();
```

Sample response:

```ballerina
{
  "id": "78901234567",
  "properties": {
    "hs_timestamp": "2025-01-15T10:30:00.000Z",
    "hs_task_subject": "Follow up with client",
    "hs_task_body": "Discuss contract renewal terms and next steps.",
    "hs_task_priority": "HIGH",
    "hs_task_type": "TODO",
    "hs_task_status": "NOT_STARTED",
    "hs_createdate": "2025-01-15T10:30:00.000Z",
    "hs_lastmodifieddate": "2025-01-15T10:30:00.000Z",
    "hs_object_id": "78901234567"
  },
  "createdAt": "2025-01-15T10:30:00.000Z",
  "updatedAt": "2025-01-15T10:30:00.000Z",
  "archived": false
}
```

</details>

<details>
<summary>Update a task</summary>

Signature: `patch /[string taskId]`

Updates the properties of an existing task engagement record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `taskId` | <code>string</code> | Yes | The ID of the task to update. |
| `payload` | <code>SimplePublicObjectInput</code> | Yes | Properties to update. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |
| `queries` | <code>PatchCrmV3ObjectsTasksTaskIdUpdateQueries</code> | No | Query parameters including `idProperty`. |

Returns: `SimplePublicObject|error`

Sample code:

```ballerina
tasks:SimplePublicObject response = check tasksClient->/["78901234567"].patch({
    properties: {
        "hs_task_status": "COMPLETED",
        "hs_task_subject": "Follow up with client: Done"
    }
});
```

Sample response:

```ballerina
{
  "id": "78901234567",
  "properties": {
    "hs_task_subject": "Follow up with client: Done",
    "hs_task_status": "COMPLETED",
    "hs_createdate": "2025-01-15T10:30:00.000Z",
    "hs_lastmodifieddate": "2025-01-15T11:00:00.000Z",
    "hs_object_id": "78901234567"
  },
  "createdAt": "2025-01-15T10:30:00.000Z",
  "updatedAt": "2025-01-15T11:00:00.000Z",
  "archived": false
}
```

</details>

<details>
<summary>Archive a task</summary>

Signature: `delete /[string taskId]`

Archives (soft-deletes) a task engagement record by its ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `taskId` | <code>string</code> | Yes | The ID of the task to archive. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |

Returns: `error?`

Sample code:

```ballerina
check tasksClient->/["78901234567"].delete();
```

</details>

#### Batch operations

<details>
<summary>Create a batch of tasks</summary>

Signature: `post /batch/create`

Creates multiple task engagement records in a single request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BatchInputSimplePublicObjectInputForCreate</code> | Yes | Batch of task inputs with properties and optional associations. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |

Returns: `BatchResponseSimplePublicObject|BatchResponseSimplePublicObjectWithErrors|error`

Sample code:

```ballerina
tasks:BatchResponseSimplePublicObject|tasks:BatchResponseSimplePublicObjectWithErrors response =
    check tasksClient->/batch/create.post({
        inputs: [
            {
                properties: {
                    "hs_timestamp": "2025-01-15T10:30:00.000Z",
                    "hs_task_subject": "Send proposal",
                    "hs_task_priority": "HIGH",
                    "hs_task_type": "TODO",
                    "hs_task_status": "NOT_STARTED"
                },
                associations: []
            },
            {
                properties: {
                    "hs_timestamp": "2025-01-16T09:00:00.000Z",
                    "hs_task_subject": "Schedule demo",
                    "hs_task_priority": "MEDIUM",
                    "hs_task_type": "TODO",
                    "hs_task_status": "NOT_STARTED"
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
      "id": "78901234567",
      "properties": {
        "hs_task_subject": "Send proposal",
        "hs_task_priority": "HIGH",
        "hs_task_status": "NOT_STARTED",
        "hs_createdate": "2025-01-15T10:30:00.000Z",
        "hs_object_id": "78901234567"
      },
      "createdAt": "2025-01-15T10:30:00.000Z",
      "updatedAt": "2025-01-15T10:30:00.000Z",
      "archived": false
    },
    {
      "id": "78901234568",
      "properties": {
        "hs_task_subject": "Schedule demo",
        "hs_task_priority": "MEDIUM",
        "hs_task_status": "NOT_STARTED",
        "hs_createdate": "2025-01-16T09:00:00.000Z",
        "hs_object_id": "78901234568"
      },
      "createdAt": "2025-01-16T09:00:00.000Z",
      "updatedAt": "2025-01-16T09:00:00.000Z",
      "archived": false
    }
  ],
  "startedAt": "2025-01-15T10:30:00.000Z",
  "completedAt": "2025-01-15T10:30:01.000Z"
}
```

</details>

<details>
<summary>Read a batch of tasks by internal ID, or unique property values</summary>

Signature: `post /batch/read`

Retrieves multiple task engagement records by their IDs in a single request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BatchReadInputSimplePublicObjectId</code> | Yes | Batch of task IDs to retrieve, with optional property selection. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |
| `queries` | <code>PostCrmV3ObjectsTasksBatchReadReadQueries</code> | No | Query parameters including `archived`. |

Returns: `BatchResponseSimplePublicObject|BatchResponseSimplePublicObjectWithErrors|error`

Sample code:

```ballerina
tasks:BatchResponseSimplePublicObject|tasks:BatchResponseSimplePublicObjectWithErrors response =
    check tasksClient->/batch/read.post({
        inputs: [
            { id: "78901234567" },
            { id: "78901234568" }
        ],
        properties: ["hs_task_subject", "hs_task_status", "hs_task_priority"],
        propertiesWithHistory: []
    });
```

Sample response:

```ballerina
{
  "status": "COMPLETE",
  "results": [
    {
      "id": "78901234567",
      "properties": {
        "hs_task_subject": "Send proposal",
        "hs_task_status": "NOT_STARTED",
        "hs_task_priority": "HIGH"
      },
      "createdAt": "2025-01-15T10:30:00.000Z",
      "updatedAt": "2025-01-15T10:30:00.000Z",
      "archived": false
    },
    {
      "id": "78901234568",
      "properties": {
        "hs_task_subject": "Schedule demo",
        "hs_task_status": "NOT_STARTED",
        "hs_task_priority": "MEDIUM"
      },
      "createdAt": "2025-01-16T09:00:00.000Z",
      "updatedAt": "2025-01-16T09:00:00.000Z",
      "archived": false
    }
  ],
  "startedAt": "2025-01-15T10:30:00.000Z",
  "completedAt": "2025-01-15T10:30:01.000Z"
}
```

</details>

<details>
<summary>Update a batch of tasks by internal ID, or unique property values</summary>

Signature: `post /batch/update`

Updates properties on multiple task engagement records in a single request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BatchInputSimplePublicObjectBatchInput</code> | Yes | Batch of task IDs with updated properties. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |

Returns: `BatchResponseSimplePublicObject|BatchResponseSimplePublicObjectWithErrors|error`

Sample code:

```ballerina
tasks:BatchResponseSimplePublicObject|tasks:BatchResponseSimplePublicObjectWithErrors response =
    check tasksClient->/batch/update.post({
        inputs: [
            {
                id: "78901234567",
                properties: {
                    "hs_task_status": "COMPLETED",
                    "hs_task_subject": "Send proposal: Done"
                }
            },
            {
                id: "78901234568",
                properties: {
                    "hs_task_status": "IN_PROGRESS",
                    "hs_task_subject": "Schedule demo: In Progress"
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
      "id": "78901234567",
      "properties": {
        "hs_task_subject": "Send proposal: Done",
        "hs_task_status": "COMPLETED",
        "hs_lastmodifieddate": "2025-01-15T11:00:00.000Z"
      },
      "createdAt": "2025-01-15T10:30:00.000Z",
      "updatedAt": "2025-01-15T11:00:00.000Z",
      "archived": false
    },
    {
      "id": "78901234568",
      "properties": {
        "hs_task_subject": "Schedule demo: In Progress",
        "hs_task_status": "IN_PROGRESS",
        "hs_lastmodifieddate": "2025-01-15T11:00:00.000Z"
      },
      "createdAt": "2025-01-16T09:00:00.000Z",
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
<summary>Archive a batch of tasks by ID</summary>

Signature: `post /batch/archive`

Archives (soft-deletes) multiple task engagement records in a single request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BatchInputSimplePublicObjectId</code> | Yes | Batch of task IDs to archive. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |

Returns: `error?`

Sample code:

```ballerina
check tasksClient->/batch/archive.post({
    inputs: [
        { id: "78901234567" },
        { id: "78901234568" }
    ]
});
```

</details>

<details>
<summary>Create or update a batch of tasks by unique property values</summary>

Signature: `post /batch/upsert`

Creates or updates multiple task records in a single request, matching by a unique property value.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BatchInputSimplePublicObjectBatchInputUpsert</code> | Yes | Batch of task inputs with an `idProperty` for matching and properties to set. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |

Returns: `BatchResponseSimplePublicUpsertObject|BatchResponseSimplePublicUpsertObjectWithErrors|error`

Sample code:

```ballerina
tasks:BatchResponseSimplePublicUpsertObject|tasks:BatchResponseSimplePublicUpsertObjectWithErrors response =
    check tasksClient->/batch/upsert.post({
        inputs: [
            {
                idProperty: "hs_object_id",
                id: "78901234567",
                properties: {
                    "hs_task_subject": "Upserted Task",
                    "hs_task_status": "COMPLETED"
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
      "id": "78901234567",
      "properties": {
        "hs_task_subject": "Upserted Task",
        "hs_task_status": "COMPLETED"
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
<summary>Search for tasks</summary>

Signature: `post /search`

Searches for task engagement records using filters, property conditions, and sorting criteria.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>PublicObjectSearchRequest</code> | Yes | Search request with filter groups, sorting, properties to return, and pagination. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |

Returns: `CollectionResponseWithTotalSimplePublicObjectForwardPaging|error`

Sample code:

```ballerina
tasks:CollectionResponseWithTotalSimplePublicObjectForwardPaging response =
    check tasksClient->/search.post({
        filterGroups: [
            {
                filters: [
                    {
                        propertyName: "hs_task_subject",
                        operator: "CONTAINS_TOKEN",
                        value: "follow up"
                    }
                ]
            }
        ],
        properties: ["hs_task_subject", "hs_task_status", "hs_task_priority"],
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
      "id": "78901234567",
      "properties": {
        "hs_task_subject": "Follow up with client",
        "hs_task_status": "NOT_STARTED",
        "hs_task_priority": "HIGH"
      },
      "createdAt": "2025-01-15T10:30:00.000Z",
      "updatedAt": "2025-01-15T10:30:00.000Z",
      "archived": false
    },
    {
      "id": "78901234569",
      "properties": {
        "hs_task_subject": "Follow up on proposal",
        "hs_task_status": "IN_PROGRESS",
        "hs_task_priority": "MEDIUM"
      },
      "createdAt": "2025-01-16T09:00:00.000Z",
      "updatedAt": "2025-01-16T09:00:00.000Z",
      "archived": false
    }
  ],
  "paging": {
    "next": {
      "after": "78901234569"
    }
  }
}
```

</details>
