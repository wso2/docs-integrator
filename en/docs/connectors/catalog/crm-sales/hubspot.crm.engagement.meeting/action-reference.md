---
connector: true
connector_name: "hubspot.crm.engagement.meeting"
toc_max_heading_level: 4
---

# Actions

The `ballerinax/hubspot.crm.engagement.meeting` package exposes the following clients:

Available clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Manage HubSpot meeting engagement records with individual CRUD, batch, and search operations |

---

## Client

The `Client` provides operations to create, retrieve, update, delete, batch-process, and search meeting engagement records in HubSpot CRM.

### Configuration

#### ConnectionConfig

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | <code>http:BearerTokenConfig&#124;OAuth2RefreshTokenGrantConfig&#124;ApiKeysConfig</code> | Required | Auth configurations needed when communicating with the remote HTTP endpoint |
| `httpVersion` | <code>http:HttpVersion</code> | <code>http:HTTP_2_0</code> | The HTTP version understood by the client |
| `http1Settings` | <code>http:ClientHttp1Settings</code> | <code>&#123;&#125;</code> | Configurations related to HTTP/1.x protocol |
| `http2Settings` | <code>http:ClientHttp2Settings</code> | <code>&#123;&#125;</code> | Configurations related to HTTP/2 protocol |
| `timeout` | <code>decimal</code> | <code>30</code> | Maximum time in seconds to wait for a response before closing the connection |
| `forwarded` | <code>string</code> | <code>"disable"</code> | The choice of setting `forwarded`/`x-forwarded` header |
| `followRedirects` | <code>http:FollowRedirects</code> | — | Configurations associated with redirection |
| `poolConfig` | <code>http:PoolConfiguration</code> | — | Configurations associated with request pooling |
| `cache` | <code>http:CacheConfig</code> | <code>&#123;&#125;</code> | HTTP caching related configurations |
| `compression` | <code>http:Compression</code> | <code>http:COMPRESSION_AUTO</code> | Specifies the way of handling the `accept-encoding` compression header |
| `circuitBreaker` | <code>http:CircuitBreakerConfig</code> | — | Configurations associated with the Circuit Breaker behaviour |
| `retryConfig` | <code>http:RetryConfig</code> | — | Configurations associated with retrying |
| `cookieConfig` | <code>http:CookieConfig</code> | — | Configurations associated with cookies |
| `responseLimits` | <code>http:ResponseLimitConfigs</code> | <code>&#123;&#125;</code> | Configurations associated with inbound response size limits |
| `secureSocket` | <code>http:ClientSecureSocket</code> | — | SSL/TLS-related options |
| `proxy` | <code>http:ProxyConfig</code> | — | Proxy server related options |
| `socketConfig` | <code>http:ClientSocketConfig</code> | <code>&#123;&#125;</code> | Provides settings related to client socket configuration |
| `validation` | <code>boolean</code> | <code>true</code> | Enables the inbound payload validation functionality provided by the constraint package |
| `laxDataBinding` | <code>boolean</code> | <code>true</code> | Enables relaxed data binding on the client side; `nil` values are treated as optional and absent fields as nilable types |

#### OAuth2RefreshTokenGrantConfig

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `refreshUrl` | <code>string</code> | <code>"https://api.hubapi.com/oauth/v1/token"</code> | The HubSpot OAuth 2.0 token refresh endpoint URL |

#### ApiKeysConfig

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `privateAppLegacy` | <code>string</code> | Required | Legacy private app API key for authentication |
| `privateApp` | <code>string</code> | Required | Private app API key for authentication |

### Initializing the client

```ballerina
import ballerinax/hubspot.crm.engagement.meeting;

meeting:ConnectionConfig config = {
    auth: {
        clientId: "<clientId>",
        clientSecret: "<clientSecret>",
        refreshToken: "<refreshToken>"
    }
};
meeting:Client client = check new (config);
```

### Operations

#### Individual Record Operations

<details>
<summary>List a page of meetings</summary>

<div>

**Signature:** `get /`

Returns a paginated list of meeting records. Use the `limit` and `after` query parameters to page through results. Specify `properties` to control which fields are returned.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `limit` | <code>int:Signed32</code> | No | Maximum number of results to display per page (default: 10) |
| `after` | <code>string</code> | No | Paging cursor token from `paging.next.after` to retrieve the next page |
| `archived` | <code>boolean</code> | No | Return only archived meeting records (default: false) |
| `properties` | <code>string[]</code> | No | Property names to include in the response; unrecognised properties are ignored |
| `propertiesWithHistory` | <code>string[]</code> | No | Properties to return along with their history of previous values; reduces maximum objects per request |
| `associations` | <code>string[]</code> | No | Object types to retrieve associated IDs for; unrecognised types are ignored |

**Returns:** `CollectionResponseSimplePublicObjectWithAssociationsForwardPaging|error`

**Sample code:**

```ballerina
meeting:CollectionResponseSimplePublicObjectWithAssociationsForwardPaging meetingList = check client->/;
```

**Sample response:**

```json
{
  "paging": {
    "next": {
      "after": "10",
      "link": "https://api.hubapi.com/crm/v3/objects/meetings?after=10"
    }
  },
  "results": [
    {
      "id": "12345",
      "properties": {
        "hs_meeting_title": "Q1 Sales Review",
        "hs_timestamp": "2025-03-23T01:02:44.872Z",
        "hs_meeting_start_time": "2025-03-23T01:00:00.000Z",
        "hs_meeting_end_time": "2025-03-23T02:00:00.000Z",
        "hs_meeting_outcome": "SCHEDULED"
      },
      "createdAt": "2025-03-20T10:00:00.000Z",
      "updatedAt": "2025-03-20T10:00:00.000Z",
      "archived": false
    }
  ]
}
```

</div>
</details>

<details>
<summary>Create a meeting</summary>

<div>

**Signature:** `post /`

Creates a new meeting engagement record in HubSpot CRM. Provide the meeting properties (title, time, outcome, etc.) and any associations to other CRM objects such as contacts.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>SimplePublicObjectInputForCreate</code> | Yes | Meeting properties and associations to create |

**Returns:** `SimplePublicObject|error`

**Sample code:**

```ballerina
meeting:SimplePublicObjectInputForCreate payload = {
    properties: {
        "hs_timestamp": "2025-03-23T01:02:44.872Z",
        "hs_meeting_title": "Intro meeting",
        "hs_meeting_body": "The first meeting to discuss options",
        "hs_meeting_location": "Remote",
        "hs_meeting_start_time": "2021-03-23T01:02:44.872Z",
        "hs_meeting_end_time": "2021-03-23T01:52:44.872Z",
        "hs_meeting_outcome": "SCHEDULED"
    },
    associations: [
        {
            to: {id: "101"},
            types: [{associationCategory: "HUBSPOT_DEFINED", associationTypeId: 200}]
        }
    ]
};
meeting:SimplePublicObject result = check client->/.post(payload);
```

**Sample response:**

```json
{
  "id": "67890",
  "properties": {
    "hs_meeting_title": "Intro meeting",
    "hs_timestamp": "2025-03-23T01:02:44.872Z",
    "hs_meeting_body": "The first meeting to discuss options",
    "hs_meeting_location": "Remote",
    "hs_meeting_start_time": "2021-03-23T01:02:44.872Z",
    "hs_meeting_end_time": "2021-03-23T01:52:44.872Z",
    "hs_meeting_outcome": "SCHEDULED"
  },
  "createdAt": "2025-03-20T10:00:00.000Z",
  "updatedAt": "2025-03-20T10:00:00.000Z",
  "archived": false
}
```

</div>
</details>

<details>
<summary>Retrieve a meeting by ID</summary>

<div>

**Signature:** `get /[meetingId]`

Retrieves a single meeting record by its unique ID, optionally including specified properties, property history, and associated CRM object IDs.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | <code>string</code> | Yes | The unique ID of the meeting to retrieve |
| `associations` | <code>string[]</code> | No | Object types to retrieve associated IDs for; unrecognised types are ignored |
| `archived` | <code>boolean</code> | No | Return only archived results (default: false) |
| `propertiesWithHistory` | <code>string[]</code> | No | Properties to return along with their history of previous values |
| `idProperty` | <code>string</code> | No | Property name whose values are unique for this object type, used as the lookup identifier |
| `properties` | <code>string[]</code> | No | Property names to include in the response; unrecognised properties are ignored |

**Returns:** `SimplePublicObjectWithAssociations|error`

**Sample code:**

```ballerina
meeting:SimplePublicObjectWithAssociations result = check client->/["67890"]();
```

**Sample response:**

```json
{
  "id": "67890",
  "properties": {
    "hs_meeting_title": "Intro meeting",
    "hs_timestamp": "2025-03-23T01:02:44.872Z",
    "hs_meeting_outcome": "SCHEDULED"
  },
  "associations": {
    "contacts": {
      "results": [
        {
          "id": "101",
          "type": "meeting_to_contact"
        }
      ]
    }
  },
  "createdAt": "2025-03-20T10:00:00.000Z",
  "updatedAt": "2025-03-20T10:00:00.000Z",
  "archived": false
}
```

</div>
</details>

<details>
<summary>Partially update a meeting</summary>

<div>

**Signature:** `patch /[meetingId]`

Performs a partial update on an existing meeting record, applying only the supplied properties. Properties not included in the payload are left unchanged.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | <code>string</code> | Yes | The unique ID of the meeting to update |
| `payload` | <code>SimplePublicObjectInput</code> | Yes | Map of property names and their new values |
| `idProperty` | <code>string</code> | No | The name of a property whose values are unique for this object type, used as the lookup identifier instead of the record ID |

**Returns:** `SimplePublicObject|error`

**Sample code:**

```ballerina
meeting:SimplePublicObjectInput payload = {
    properties: {
        "hs_timestamp": "2025-05-23T01:02:44.872Z",
        "hs_meeting_title": "Intro meeting updated"
    }
};
meeting:SimplePublicObject result = check client->/["67890"].patch(payload);
```

**Sample response:**

```json
{
  "id": "67890",
  "properties": {
    "hs_meeting_title": "Intro meeting updated",
    "hs_timestamp": "2025-05-23T01:02:44.872Z",
    "hs_meeting_outcome": "SCHEDULED"
  },
  "createdAt": "2025-03-20T10:00:00.000Z",
  "updatedAt": "2025-05-20T10:00:00.000Z",
  "archived": false
}
```

</div>
</details>

<details>
<summary>Archive a meeting by ID</summary>

<div>

**Signature:** `delete /[meetingId]`

Archives (soft-deletes) a meeting record by its unique ID. Archived records are hidden from standard list and search results but can be retrieved by setting `archived: true`.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | <code>string</code> | Yes | The unique ID of the meeting to archive |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->/["67890"].delete();
```

</div>
</details>

#### Batch Operations

<details>
<summary>Read a batch of meetings</summary>

<div>

**Signature:** `post /batch/read`

Retrieves multiple meeting records in a single request by providing a list of object IDs. Returns each meeting with the specified properties and optional property history.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BatchReadInputSimplePublicObjectId</code> | Yes | List of meeting IDs and the properties to retrieve |
| `archived` | <code>boolean</code> | No | Return only archived results (default: false) |

**Returns:** `BatchResponseSimplePublicObject|BatchResponseSimplePublicObjectWithErrors|error`

**Sample code:**

```ballerina
meeting:BatchReadInputSimplePublicObjectId payload = {
    inputs: [{id: "67890"}],
    properties: ["hs_timestamp", "hs_meeting_title"],
    propertiesWithHistory: []
};
meeting:BatchResponseSimplePublicObject|meeting:BatchResponseSimplePublicObjectWithErrors result = check client->/batch/read.post(payload);
```

**Sample response:**

```json
{
  "status": "COMPLETE",
  "results": [
    {
      "id": "67890",
      "properties": {
        "hs_timestamp": "2025-03-23T01:02:44.872Z",
        "hs_meeting_title": "Q1 Sales Review"
      },
      "createdAt": "2025-03-20T10:00:00.000Z",
      "updatedAt": "2025-03-20T10:00:00.000Z",
      "archived": false
    }
  ],
  "startedAt": "2025-03-20T10:00:00.000Z",
  "completedAt": "2025-03-20T10:00:01.000Z"
}
```

</div>
</details>

<details>
<summary>Create a batch of meetings</summary>

<div>

**Signature:** `post /batch/create`

Creates multiple meeting records in a single request. Each input item can include properties and associations to other CRM objects.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BatchInputSimplePublicObjectInputForCreate</code> | Yes | Array of meeting creation objects, each with properties and associations |

**Returns:** `BatchResponseSimplePublicObject|BatchResponseSimplePublicObjectWithErrors|error`

**Sample code:**

```ballerina
meeting:BatchInputSimplePublicObjectInputForCreate payload = {
    inputs: [
        {
            properties: {
                "hs_meeting_title": "Batch Meeting 1",
                "hs_timestamp": "2025-04-01T09:00:00.000Z",
                "hs_meeting_outcome": "SCHEDULED"
            },
            associations: []
        }
    ]
};
meeting:BatchResponseSimplePublicObject|meeting:BatchResponseSimplePublicObjectWithErrors result = check client->/batch/create.post(payload);
```

**Sample response:**

```json
{
  "status": "COMPLETE",
  "results": [
    {
      "id": "11111",
      "properties": {
        "hs_meeting_title": "Batch Meeting 1",
        "hs_timestamp": "2025-04-01T09:00:00.000Z",
        "hs_meeting_outcome": "SCHEDULED"
      },
      "createdAt": "2025-03-20T10:00:00.000Z",
      "updatedAt": "2025-03-20T10:00:00.000Z",
      "archived": false
    }
  ],
  "startedAt": "2025-03-20T10:00:00.000Z",
  "completedAt": "2025-03-20T10:00:01.000Z"
}
```

</div>
</details>

<details>
<summary>Update a batch of meetings</summary>

<div>

**Signature:** `post /batch/update`

Updates multiple meeting records in a single request. Each input item must include the record ID and the properties to update.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BatchInputSimplePublicObjectBatchInput</code> | Yes | Array of meeting update objects, each with an ID and properties map |

**Returns:** `BatchResponseSimplePublicObject|BatchResponseSimplePublicObjectWithErrors|error`

**Sample code:**

```ballerina
meeting:BatchInputSimplePublicObjectBatchInput payload = {
    inputs: [
        {
            id: "67890",
            properties: {"hs_timestamp": "2021-03-23T01:02:44.872Z"}
        }
    ]
};
meeting:BatchResponseSimplePublicObject|meeting:BatchResponseSimplePublicObjectWithErrors result = check client->/batch/update.post(payload);
```

**Sample response:**

```json
{
  "status": "COMPLETE",
  "results": [
    {
      "id": "67890",
      "properties": {
        "hs_timestamp": "2021-03-23T01:02:44.872Z",
        "hs_meeting_title": "Updated Meeting"
      },
      "createdAt": "2025-03-20T10:00:00.000Z",
      "updatedAt": "2025-03-21T10:00:00.000Z",
      "archived": false
    }
  ],
  "startedAt": "2025-03-21T10:00:00.000Z",
  "completedAt": "2025-03-21T10:00:01.000Z"
}
```

</div>
</details>

<details>
<summary>Archive a batch of meetings by ID</summary>

<div>

**Signature:** `post /batch/archive`

Archives multiple meeting records in a single request. Archived records are hidden from standard list and search results but remain recoverable.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BatchInputSimplePublicObjectId</code> | Yes | List of meeting IDs to archive |

**Returns:** `error?`

**Sample code:**

```ballerina
meeting:BatchInputSimplePublicObjectId payload = {
    inputs: [{id: "67890"}]
};
check client->/batch/archive.post(payload);
```

</div>
</details>

<details>
<summary>Upsert a batch of meetings</summary>

<div>

**Signature:** `post /batch/upsert`

Creates or updates multiple meeting records in a single request. If a record with the given ID exists it is updated; otherwise a new record is created. The response indicates whether each result was newly created via the `new` field.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BatchInputSimplePublicObjectBatchInputUpsert</code> | Yes | Array of meeting upsert objects, each with an ID and properties map |

**Returns:** `BatchResponseSimplePublicUpsertObject|BatchResponseSimplePublicUpsertObjectWithErrors|error`

**Sample code:**

```ballerina
meeting:BatchInputSimplePublicObjectBatchInputUpsert payload = {
    inputs: [
        {
            id: "99999",
            properties: {
                "hs_meeting_title": "Upserted Meeting",
                "hs_timestamp": "2025-04-15T10:00:00.000Z"
            }
        }
    ]
};
meeting:BatchResponseSimplePublicUpsertObject|meeting:BatchResponseSimplePublicUpsertObjectWithErrors result = check client->/batch/upsert.post(payload);
```

**Sample response:**

```json
{
  "status": "COMPLETE",
  "results": [
    {
      "id": "99999",
      "new": true,
      "properties": {
        "hs_meeting_title": "Upserted Meeting",
        "hs_timestamp": "2025-04-15T10:00:00.000Z"
      },
      "createdAt": "2025-03-20T10:00:00.000Z",
      "updatedAt": "2025-03-20T10:00:00.000Z",
      "archived": false
    }
  ],
  "startedAt": "2025-03-20T10:00:00.000Z",
  "completedAt": "2025-03-20T10:00:01.000Z"
}
```

</div>
</details>

#### Search

<details>
<summary>Search for meetings</summary>

<div>

**Signature:** `post /search`

Searches meeting records using filter groups, sort criteria, and full-text queries. Returns a paginated result set with a total count of matching records.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>PublicObjectSearchRequest</code> | Yes | Search request containing filter groups, sort fields, pagination, and properties to return |

**Returns:** `CollectionResponseWithTotalSimplePublicObjectForwardPaging|error`

**Sample code:**

```ballerina
meeting:PublicObjectSearchRequest payload = {
    filterGroups: [
        {
            filters: [
                {
                    propertyName: "hs_meeting_outcome",
                    operator: "EQ",
                    value: "COMPLETED"
                }
            ]
        }
    ],
    properties: ["hs_meeting_title", "hs_meeting_outcome"],
    'limit: 10
};
meeting:CollectionResponseWithTotalSimplePublicObjectForwardPaging result = check client->/search.post(payload);
```

**Sample response:**

```json
{
  "total": 2,
  "results": [
    {
      "id": "12345",
      "properties": {
        "hs_meeting_title": "Q1 Sales Review",
        "hs_meeting_outcome": "COMPLETED"
      },
      "createdAt": "2025-03-20T10:00:00.000Z",
      "updatedAt": "2025-03-20T10:00:00.000Z",
      "archived": false
    }
  ],
  "paging": {
    "next": {
      "after": "1"
    }
  }
}
```

</div>
</details>