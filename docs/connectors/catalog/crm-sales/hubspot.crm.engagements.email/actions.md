---
title: Actions
---

# Actions

The `ballerinax/hubspot.crm.engagements.email` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Manage HubSpot email engagement records: CRUD, batch operations, and search. |

---

## Client

Manage HubSpot email engagement records: CRUD, batch operations, and search.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | <code>http:BearerTokenConfig&#124;OAuth2RefreshTokenGrantConfig&#124;ApiKeysConfig</code> | Required | Authentication configuration: OAuth 2.0 refresh token, bearer token, or API keys. |
| `httpVersion` | <code>http:HttpVersion</code> | `HTTP_2_0` | HTTP protocol version. |
| `timeout` | <code>decimal</code> | `30` | Request timeout in seconds. |
| `retryConfig` | <code>http:RetryConfig</code> | `()` | Retry configuration for failed requests. |
| `secureSocket` | <code>http:ClientSecureSocket</code> | `()` | SSL/TLS configuration. |
| `proxy` | <code>http:ProxyConfig</code> | `()` | Proxy server configuration. |
| `compression` | <code>http:Compression</code> | `COMPRESSION_AUTO` | HTTP compression setting. |
| `validation` | <code>boolean</code> | `true` | Enable payload validation. |
| `laxDataBinding` | <code>boolean</code> | `true` | Allow lax data binding for response payloads. |

### Initializing the client

```ballerina
import ballerina/oauth2;
import ballerinax/hubspot.crm.engagements.email as hsceemail;

configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string refreshToken = ?;

hsceemail:OAuth2RefreshTokenGrantConfig auth = {
    clientId,
    clientSecret,
    refreshToken,
    credentialBearer: oauth2:POST_BODY_BEARER
};

hsceemail:Client hubspot = check new ({auth});
```

### Operations

#### Single email operations

<details>
<summary>Create an email</summary>

Signature: `post .`

Creates a new email engagement record with the specified properties and associations.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>SimplePublicObjectInputForCreate</code> | Yes | Email properties and associations to create. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |

Returns: `SimplePublicObject|error`

Sample code:

```ballerina
hsceemail:SimplePublicObject email = check hubspot->/.post({
    properties: {
        "hs_email_subject": "Follow-up on our meeting",
        "hs_email_text": "Hi, just following up on our discussion.",
        "hs_email_status": "SENDING",
        "hs_email_direction": "EMAIL",
        "hs_timestamp": "2026-03-18T10:00:00.000Z"
    },
    associations: []
});
```

Sample response:

```ballerina
{
  "id": "12345678901",
  "properties": {
    "hs_email_subject": "Follow-up on our meeting",
    "hs_email_text": "Hi, just following up on our discussion.",
    "hs_email_status": "SENDING",
    "hs_email_direction": "EMAIL",
    "hs_timestamp": "2026-03-18T10:00:00.000Z",
    "hs_createdate": "2026-03-18T10:05:00.000Z",
    "hs_lastmodifieddate": "2026-03-18T10:05:00.000Z",
    "hs_object_id": "12345678901"
  },
  "createdAt": "2026-03-18T10:05:00.000Z",
  "updatedAt": "2026-03-18T10:05:00.000Z",
  "archived": false
}
```

</details>

<details>
<summary>List emails</summary>

Signature: `get .`

Returns a paginated list of email engagement records with optional property and association filtering.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `properties` | <code>string[]</code> | No | List of properties to include in the response. |
| `associations` | <code>string[]</code> | No | List of associated object types to retrieve. |
| `propertiesWithHistory` | <code>string[]</code> | No | Properties to return with their change history. |
| `'limit` | <code>int</code> | No | Maximum number of results per page (default 10). |
| `after` | <code>string</code> | No | Cursor for the next page of results. |
| `archived` | <code>boolean</code> | No | Whether to return archived emails (default false). |

Returns: `CollectionResponseSimplePublicObjectWithAssociationsForwardPaging|error`

Sample code:

```ballerina
hsceemail:CollectionResponseSimplePublicObjectWithAssociationsForwardPaging response =
    check hubspot->/.get(properties = ["hs_email_subject", "hs_email_status"]);
```

Sample response:

```ballerina
{
  "results": [
    {
      "id": "12345678901",
      "properties": {
        "hs_email_subject": "Follow-up on our meeting",
        "hs_email_status": "SENT",
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
      "link": "https://api.hubapi.com/crm/v3/objects/emails?after=12345678902"
    }
  }
}
```

</details>

<details>
<summary>Read an email by ID</summary>

Signature: `get [emailId]`

Retrieves a single email engagement record by its ID, with optional property and association filtering.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `emailId` | <code>string</code> | Yes | The ID of the email record to retrieve. |
| `properties` | <code>string[]</code> | No | List of properties to include. |
| `associations` | <code>string[]</code> | No | Associated object types to retrieve. |
| `propertiesWithHistory` | <code>string[]</code> | No | Properties to return with change history. |
| `archived` | <code>boolean</code> | No | Whether to return archived records. |
| `idProperty` | <code>string</code> | No | Name of the unique property to use as the lookup ID. |

Returns: `SimplePublicObjectWithAssociations|error`

Sample code:

```ballerina
hsceemail:SimplePublicObjectWithAssociations email = check hubspot->/["12345678901"].get(
    properties = ["hs_email_subject", "hs_email_status", "hs_email_text"]
);
```

Sample response:

```ballerina
{
  "id": "12345678901",
  "properties": {
    "hs_email_subject": "Follow-up on our meeting",
    "hs_email_status": "SENT",
    "hs_email_text": "Hi, just following up on our discussion.",
    "hs_createdate": "2026-03-15T08:00:00.000Z",
    "hs_lastmodifieddate": "2026-03-15T08:00:00.000Z",
    "hs_object_id": "12345678901"
  },
  "createdAt": "2026-03-15T08:00:00.000Z",
  "updatedAt": "2026-03-15T08:00:00.000Z",
  "archived": false
}
```

</details>

<details>
<summary>Update an email</summary>

Signature: `patch [emailId]`

Performs a partial update of an email engagement record, modifying only the specified properties.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `emailId` | <code>string</code> | Yes | The ID of the email record to update. |
| `payload` | <code>SimplePublicObjectInput</code> | Yes | Properties to update. |
| `idProperty` | <code>string</code> | No | Unique property to use as the lookup ID. |

Returns: `SimplePublicObject|error`

Sample code:

```ballerina
hsceemail:SimplePublicObject updated = check hubspot->/["12345678901"].patch({
    properties: {
        "hs_email_headers": "{\"sender\":{\"email\":\"new_sender@example.com\",\"firstName\":\"New\",\"lastName\":\"Sender\"}}"
    }
});
```

Sample response:

```ballerina
{
  "id": "12345678901",
  "properties": {
    "hs_email_subject": "Follow-up on our meeting",
    "hs_email_headers": "{\"sender\":{\"email\":\"new_sender@example.com\",\"firstName\":\"New\",\"lastName\":\"Sender\"}}",
    "hs_createdate": "2026-03-15T08:00:00.000Z",
    "hs_lastmodifieddate": "2026-03-18T10:10:00.000Z",
    "hs_object_id": "12345678901"
  },
  "createdAt": "2026-03-15T08:00:00.000Z",
  "updatedAt": "2026-03-18T10:10:00.000Z",
  "archived": false
}
```

</details>

<details>
<summary>Archive an email</summary>

Signature: `delete [emailId]`

Moves an email engagement record to the recycling bin.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `emailId` | <code>string</code> | Yes | The ID of the email record to archive. |

Returns: `error?`

Sample code:

```ballerina
check hubspot->/["12345678901"].delete();
```

</details>

#### Batch operations

<details>
<summary>Create a batch of emails</summary>

Signature: `post batch/create`

Creates multiple email engagement records in a single request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BatchInputSimplePublicObjectInputForCreate</code> | Yes | Batch of email records to create, each with properties and associations. |

Returns: `BatchResponseSimplePublicObject|BatchResponseSimplePublicObjectWithErrors|error`

Sample code:

```ballerina
hsceemail:BatchResponseSimplePublicObject|hsceemail:BatchResponseSimplePublicObjectWithErrors response =
    check hubspot->/batch/create.post({
        inputs: [
            {
                properties: {
                    "hs_email_subject": "Batch Email 1",
                    "hs_email_text": "Content of batch email 1.",
                    "hs_email_status": "SENDING",
                    "hs_timestamp": "2026-03-18T10:00:00.000Z"
                },
                associations: []
            },
            {
                properties: {
                    "hs_email_subject": "Batch Email 2",
                    "hs_email_text": "Content of batch email 2.",
                    "hs_email_status": "SENDING",
                    "hs_timestamp": "2026-03-18T10:01:00.000Z"
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
      "id": "12345678901",
      "properties": {
        "hs_email_subject": "Batch Email 1",
        "hs_email_status": "SENDING",
        "hs_object_id": "12345678901"
      },
      "createdAt": "2026-03-18T10:05:00.000Z",
      "updatedAt": "2026-03-18T10:05:00.000Z",
      "archived": false
    },
    {
      "id": "12345678902",
      "properties": {
        "hs_email_subject": "Batch Email 2",
        "hs_email_status": "SENDING",
        "hs_object_id": "12345678902"
      },
      "createdAt": "2026-03-18T10:05:00.000Z",
      "updatedAt": "2026-03-18T10:05:00.000Z",
      "archived": false
    }
  ],
  "startedAt": "2026-03-18T10:05:00.000Z",
  "completedAt": "2026-03-18T10:05:01.000Z"
}
```

</details>

<details>
<summary>Read a batch of emails</summary>

Signature: `post batch/read`

Reads multiple email engagement records by ID or unique property values in a single request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BatchReadInputSimplePublicObjectId</code> | Yes | Batch of email IDs to read, with property selections. |
| `archived` | <code>boolean</code> | No | Whether to return archived records (default false). |

Returns: `BatchResponseSimplePublicObject|BatchResponseSimplePublicObjectWithErrors|error`

Sample code:

```ballerina
hsceemail:BatchResponseSimplePublicObject|hsceemail:BatchResponseSimplePublicObjectWithErrors response =
    check hubspot->/batch/read.post({
        properties: ["hs_email_subject", "hs_email_status"],
        propertiesWithHistory: [],
        inputs: [
            {id: "12345678901"},
            {id: "12345678902"}
        ]
    });
```

Sample response:

```ballerina
{
  "status": "COMPLETE",
  "results": [
    {
      "id": "12345678901",
      "properties": {
        "hs_email_subject": "Follow-up on our meeting",
        "hs_email_status": "SENT"
      },
      "createdAt": "2026-03-15T08:00:00.000Z",
      "updatedAt": "2026-03-15T08:00:00.000Z",
      "archived": false
    },
    {
      "id": "12345678902",
      "properties": {
        "hs_email_subject": "Proposal attached",
        "hs_email_status": "SENT"
      },
      "createdAt": "2026-03-16T09:00:00.000Z",
      "updatedAt": "2026-03-16T09:00:00.000Z",
      "archived": false
    }
  ],
  "startedAt": "2026-03-18T10:05:00.000Z",
  "completedAt": "2026-03-18T10:05:01.000Z"
}
```

</details>

<details>
<summary>Update a batch of emails</summary>

Signature: `post batch/update`

Updates multiple email engagement records in a single request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BatchInputSimplePublicObjectBatchInput</code> | Yes | Batch of email updates, each with an ID and properties to update. |

Returns: `BatchResponseSimplePublicObject|BatchResponseSimplePublicObjectWithErrors|error`

Sample code:

```ballerina
hsceemail:BatchResponseSimplePublicObject|hsceemail:BatchResponseSimplePublicObjectWithErrors response =
    check hubspot->/batch/update.post({
        inputs: [
            {
                id: "12345678901",
                properties: {
                    "hs_email_status": "SENT"
                }
            },
            {
                id: "12345678902",
                properties: {
                    "hs_email_status": "SENT"
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
      "id": "12345678901",
      "properties": {
        "hs_email_status": "SENT",
        "hs_lastmodifieddate": "2026-03-18T10:10:00.000Z"
      },
      "createdAt": "2026-03-15T08:00:00.000Z",
      "updatedAt": "2026-03-18T10:10:00.000Z",
      "archived": false
    },
    {
      "id": "12345678902",
      "properties": {
        "hs_email_status": "SENT",
        "hs_lastmodifieddate": "2026-03-18T10:10:00.000Z"
      },
      "createdAt": "2026-03-16T09:00:00.000Z",
      "updatedAt": "2026-03-18T10:10:00.000Z",
      "archived": false
    }
  ],
  "startedAt": "2026-03-18T10:10:00.000Z",
  "completedAt": "2026-03-18T10:10:01.000Z"
}
```

</details>

<details>
<summary>Upsert a batch of emails</summary>

Signature: `post batch/upsert`

Creates or updates multiple email engagement records by unique property values in a single request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BatchInputSimplePublicObjectBatchInputUpsert</code> | Yes | Batch of email records to upsert, each with an ID property and properties. |

Returns: `BatchResponseSimplePublicUpsertObject|BatchResponseSimplePublicUpsertObjectWithErrors|error`

Sample code:

```ballerina
hsceemail:BatchResponseSimplePublicUpsertObject|hsceemail:BatchResponseSimplePublicUpsertObjectWithErrors response =
    check hubspot->/batch/upsert.post({
        inputs: [
            {
                id: "unique-email-ref-001",
                idProperty: "hs_unique_id",
                properties: {
                    "hs_email_subject": "Upserted Email 1",
                    "hs_email_text": "This email was upserted.",
                    "hs_email_status": "SENDING",
                    "hs_timestamp": "2026-03-18T10:00:00.000Z"
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
      "id": "12345678903",
      "properties": {
        "hs_email_subject": "Upserted Email 1",
        "hs_email_status": "SENDING"
      },
      "new": true,
      "createdAt": "2026-03-18T10:05:00.000Z",
      "updatedAt": "2026-03-18T10:05:00.000Z",
      "archived": false
    }
  ],
  "startedAt": "2026-03-18T10:05:00.000Z",
  "completedAt": "2026-03-18T10:05:01.000Z"
}
```

</details>

<details>
<summary>Archive a batch of emails</summary>

Signature: `post batch/archive`

Archives multiple email engagement records in a single request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BatchInputSimplePublicObjectId</code> | Yes | Batch of email IDs to archive. |

Returns: `error?`

Sample code:

```ballerina
check hubspot->/batch/archive.post({
    inputs: [
        {id: "12345678901"},
        {id: "12345678902"}
    ]
});
```

</details>

#### Search

<details>
<summary>Search emails</summary>

Signature: `post search`

Searches email engagement records using filter groups, query strings, sorting, and property selection.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>PublicObjectSearchRequest</code> | Yes | Search request with filters, query, sorting, and properties. |

Returns: `CollectionResponseWithTotalSimplePublicObjectForwardPaging|error`

Sample code:

```ballerina
hsceemail:CollectionResponseWithTotalSimplePublicObjectForwardPaging response =
    check hubspot->/search.post({
        filterGroups: [
            {
                filters: [
                    {
                        propertyName: "hs_email_status",
                        operator: "EQ",
                        value: "SENT"
                    }
                ]
            }
        ],
        properties: ["hs_email_subject", "hs_email_status", "hs_timestamp"],
        'limit: 10
    });
```

Sample response:

```ballerina
{
  "total": 25,
  "results": [
    {
      "id": "12345678901",
      "properties": {
        "hs_email_subject": "Follow-up on our meeting",
        "hs_email_status": "SENT",
        "hs_timestamp": "2026-03-15T08:00:00.000Z"
      },
      "createdAt": "2026-03-15T08:00:00.000Z",
      "updatedAt": "2026-03-15T08:00:00.000Z",
      "archived": false
    }
  ],
  "paging": {
    "next": {
      "after": "12345678902"
    }
  }
}
```

</details>
