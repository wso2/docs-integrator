---
title: Actions
---

# Actions

The `ballerinax/hubspot.crm.obj.contacts` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Provides all HubSpot CRM Contacts API operations: CRUD, batch, search, merge, and GDPR deletion. |

---

## Client

Provides all HubSpot CRM Contacts API operations: CRUD, batch, search, merge, and GDPR deletion.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `BearerTokenConfig\|OAuth2RefreshTokenGrantConfig\|ApiKeysConfig` | Required | Authentication configuration: bearer token, OAuth 2.0 refresh token, or private app API key. |
| `httpVersion` | `http:HttpVersion` | `HTTP_2_0` | HTTP protocol version to use. |
| `timeout` | `decimal` | `30` | Request timeout in seconds. |
| `retryConfig` | `http:RetryConfig?` | `()` | Retry configuration for failed requests. |
| `secureSocket` | `http:ClientSecureSocket?` | `()` | SSL/TLS configuration. |
| `proxy` | `http:ProxyConfig?` | `()` | Proxy server configuration. |
| `validation` | `boolean` | `true` | Enable constraint validation on response payloads. |
| `laxDataBinding` | `boolean` | `true` | Allow lax data binding to ignore unknown fields in responses. |

### Initializing the client

```ballerina
import ballerinax/hubspot.crm.obj.contacts as hscontacts;

configurable string token = ?;

hscontacts:Client hubspotClient = check new ({
    auth: {
        token: token
    }
});
```

### Operations

#### Contact CRUD

<details>
<summary>List contacts</summary>

Enumerates all contacts with optional forward pagination, property selection, and association fetching.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `GetCrmV3ObjectsContactsGetPageQueries` | No | Optional query parameters including `limit`, `after` (pagination cursor), `properties`, `propertiesWithHistory`, `associations`, and `archived`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP headers to include in the request. |

Returns: `CollectionResponseSimplePublicObjectWithAssociationsForwardPaging|error`

Sample code:

```ballerina
hscontacts:CollectionResponseSimplePublicObjectWithAssociationsForwardPaging contacts =
    check hubspotClient->/( queries = {
        'limit: 10,
        properties: ["firstname", "lastname", "email"]
    });
```

Sample response:

```ballerina
{
  "results": [
    {
      "id": "101",
      "properties": {
        "firstname": "Alice",
        "lastname": "Smith",
        "email": "alice@example.com",
        "createdate": "2024-01-15T10:00:00.000Z",
        "lastmodifieddate": "2024-06-01T08:30:00.000Z"
      },
      "createdAt": "2024-01-15T10:00:00.000Z",
      "updatedAt": "2024-06-01T08:30:00.000Z",
      "archived": false
    }
  ],
  "paging": {
    "next": {
      "after": "102",
      "link": "https://api.hubapi.com/crm/v3/objects/contacts?after=102"
    }
  }
}
```

</details>

<details>
<summary>Create a contact</summary>

Creates a new CRM contact record with the specified properties and optional associations.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `SimplePublicObjectInputForCreate` | Yes | Contact creation payload containing `properties` map, optional `associations`, and optional `objectWriteTraceId`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP headers. |

Returns: `SimplePublicObject|error`

Sample code:

```ballerina
hscontacts:SimplePublicObject contact = check hubspotClient->/.post({
    properties: {
        "firstname": "Bob",
        "lastname": "Johnson",
        "email": "bob.johnson@example.com",
        "phone": "+1-555-0100",
        "company": "Acme Corp"
    },
    associations: []
});
```

Sample response:

```ballerina
{
  "id": "201",
  "properties": {
    "firstname": "Bob",
    "lastname": "Johnson",
    "email": "bob.johnson@example.com",
    "phone": "+1-555-0100",
    "company": "Acme Corp",
    "createdate": "2026-03-18T12:00:00.000Z",
    "lastmodifieddate": "2026-03-18T12:00:00.000Z",
    "hs_object_id": "201"
  },
  "createdAt": "2026-03-18T12:00:00.000Z",
  "updatedAt": "2026-03-18T12:00:00.000Z",
  "archived": false
}
```

</details>

<details>
<summary>Get a contact by ID</summary>

Retrieves a single contact record by its HubSpot internal ID, with optional property and association fetching.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `contactId` | `string` | Yes | The HubSpot internal contact ID. |
| `queries` | `GetCrmV3ObjectsContactsContactIdGetByIdQueries` | No | Optional query parameters including `properties`, `propertiesWithHistory`, `associations`, and `archived`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP headers. |

Returns: `SimplePublicObjectWithAssociations|error`

Sample code:

```ballerina
hscontacts:SimplePublicObjectWithAssociations contact =
    check hubspotClient->/["201"](queries = {
        properties: ["firstname", "lastname", "email", "phone"]
    });
```

Sample response:

```ballerina
{
  "id": "201",
  "properties": {
    "firstname": "Bob",
    "lastname": "Johnson",
    "email": "bob.johnson@example.com",
    "phone": "+1-555-0100"
  },
  "createdAt": "2026-03-18T12:00:00.000Z",
  "updatedAt": "2026-03-18T12:00:00.000Z",
  "archived": false,
  "associations": {}
}
```

</details>

<details>
<summary>Update a contact</summary>

Updates properties of an existing contact. Only the fields provided in the payload are modified.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `contactId` | `string` | Yes | The HubSpot internal contact ID to update. |
| `payload` | `SimplePublicObjectInput` | Yes | Update payload containing a `properties` map of field names to new values. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP headers. |

Returns: `SimplePublicObject|error`

Sample code:

```ballerina
hscontacts:SimplePublicObject updated = check hubspotClient->/["201"].patch({
    properties: {
        "hs_lead_status": "IN_PROGRESS",
        "phone": "+1-555-0199"
    }
});
```

Sample response:

```ballerina
{
  "id": "201",
  "properties": {
    "firstname": "Bob",
    "lastname": "Johnson",
    "email": "bob.johnson@example.com",
    "phone": "+1-555-0199",
    "hs_lead_status": "IN_PROGRESS",
    "lastmodifieddate": "2026-03-18T13:00:00.000Z"
  },
  "createdAt": "2026-03-18T12:00:00.000Z",
  "updatedAt": "2026-03-18T13:00:00.000Z",
  "archived": false
}
```

</details>

<details>
<summary>Archive a contact</summary>

Archives (soft-deletes) a contact by its HubSpot ID. Archived contacts can be restored from the HubSpot UI.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `contactId` | `string` | Yes | The HubSpot internal contact ID to archive. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP headers. |

Returns: `error?`

Sample code:

```ballerina
check hubspotClient->/["201"].delete();
```

</details>

#### Batch operations

<details>
<summary>Batch read contacts</summary>

Reads multiple contacts in a single request by internal IDs or a unique property value.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `BatchReadInputSimplePublicObjectId` | Yes | Batch read input containing `inputs` (list of IDs), `properties`, `propertiesWithHistory`, and optional `idProperty` to use an alternate unique identifier. |
| `queries` | `PostCrmV3ObjectsContactsBatchReadReadQueries` | No | Optional `archived` flag (default `false`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP headers. |

Returns: `BatchResponseSimplePublicObject|BatchResponseSimplePublicObjectWithErrors|error`

Sample code:

```ballerina
hscontacts:BatchResponseSimplePublicObject|hscontacts:BatchResponseSimplePublicObjectWithErrors result =
    check hubspotClient->/batch/read.post({
        inputs: [
            {id: "101"},
            {id: "201"}
        ],
        properties: ["firstname", "lastname", "email"]
    });
```

Sample response:

```ballerina
{
  "status": "COMPLETE",
  "results": [
    {
      "id": "101",
      "properties": {"firstname": "Alice", "lastname": "Smith", "email": "alice@example.com"},
      "createdAt": "2024-01-15T10:00:00.000Z",
      "updatedAt": "2024-06-01T08:30:00.000Z",
      "archived": false
    },
    {
      "id": "201",
      "properties": {"firstname": "Bob", "lastname": "Johnson", "email": "bob.johnson@example.com"},
      "createdAt": "2026-03-18T12:00:00.000Z",
      "updatedAt": "2026-03-18T13:00:00.000Z",
      "archived": false
    }
  ],
  "startedAt": "2026-03-18T14:00:00.000Z",
  "completedAt": "2026-03-18T14:00:00.050Z"
}
```

</details>

<details>
<summary>Batch create contacts</summary>

Creates multiple contact records in a single API call.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `BatchInputSimplePublicObjectInputForCreate` | Yes | Batch create input containing an `inputs` array of `SimplePublicObjectInputForCreate` objects, each with a `properties` map. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP headers. |

Returns: `BatchResponseSimplePublicObject|BatchResponseSimplePublicObjectWithErrors|error`

Sample code:

```ballerina
hscontacts:BatchResponseSimplePublicObject|hscontacts:BatchResponseSimplePublicObjectWithErrors result =
    check hubspotClient->/batch/create.post({
        inputs: [
            {
                properties: {"firstname": "Carol", "lastname": "White", "email": "carol@example.com"},
                associations: []
            },
            {
                properties: {"firstname": "Dave", "lastname": "Brown", "email": "dave@example.com"},
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
      "id": "301",
      "properties": {"firstname": "Carol", "lastname": "White", "email": "carol@example.com"},
      "createdAt": "2026-03-18T14:01:00.000Z",
      "updatedAt": "2026-03-18T14:01:00.000Z",
      "archived": false
    },
    {
      "id": "302",
      "properties": {"firstname": "Dave", "lastname": "Brown", "email": "dave@example.com"},
      "createdAt": "2026-03-18T14:01:00.000Z",
      "updatedAt": "2026-03-18T14:01:00.000Z",
      "archived": false
    }
  ],
  "startedAt": "2026-03-18T14:01:00.000Z",
  "completedAt": "2026-03-18T14:01:00.100Z"
}
```

</details>

<details>
<summary>Batch update contacts</summary>

Updates properties on multiple existing contacts in a single call.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `BatchInputSimplePublicObjectBatchInput` | Yes | Batch update input with an `inputs` array; each item specifies an `id`, a `properties` map, and an optional `idProperty` for alternate key lookup. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP headers. |

Returns: `BatchResponseSimplePublicObject|BatchResponseSimplePublicObjectWithErrors|error`

Sample code:

```ballerina
hscontacts:BatchResponseSimplePublicObject|hscontacts:BatchResponseSimplePublicObjectWithErrors result =
    check hubspotClient->/batch/update.post({
        inputs: [
            {id: "101", properties: {"hs_email_optout": "true"}},
            {id: "201", properties: {"hs_email_optout": "true"}}
        ]
    });
```

Sample response:

```ballerina
{
  "status": "COMPLETE",
  "results": [
    {
      "id": "101",
      "properties": {"hs_email_optout": "true", "lastmodifieddate": "2026-03-18T14:05:00.000Z"},
      "createdAt": "2024-01-15T10:00:00.000Z",
      "updatedAt": "2026-03-18T14:05:00.000Z",
      "archived": false
    },
    {
      "id": "201",
      "properties": {"hs_email_optout": "true", "lastmodifieddate": "2026-03-18T14:05:00.000Z"},
      "createdAt": "2026-03-18T12:00:00.000Z",
      "updatedAt": "2026-03-18T14:05:00.000Z",
      "archived": false
    }
  ],
  "startedAt": "2026-03-18T14:05:00.000Z",
  "completedAt": "2026-03-18T14:05:00.080Z"
}
```

</details>

<details>
<summary>Batch upsert contacts</summary>

Creates or updates multiple contacts based on a unique property identifier. Contacts matching the identifier are updated; others are created.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `BatchInputSimplePublicObjectBatchInputUpsert` | Yes | Upsert input with an `inputs` array; each item has `idProperty` (the unique key property name), `id` (the key value), and a `properties` map. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP headers. |

Returns: `BatchResponseSimplePublicUpsertObject|BatchResponseSimplePublicUpsertObjectWithErrors|error`

Sample code:

```ballerina
hscontacts:BatchResponseSimplePublicUpsertObject|hscontacts:BatchResponseSimplePublicUpsertObjectWithErrors result =
    check hubspotClient->/batch/upsert.post({
        inputs: [
            {
                idProperty: "email",
                id: "alice@example.com",
                properties: {"hs_lead_status": "NEW"}
            },
            {
                idProperty: "email",
                id: "newperson@example.com",
                properties: {"firstname": "New", "lastname": "Person", "hs_lead_status": "NEW"}
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
      "id": "101",
      "properties": {"hs_lead_status": "NEW"},
      "createdAt": "2024-01-15T10:00:00.000Z",
      "updatedAt": "2026-03-18T14:10:00.000Z",
      "archived": false,
      "new": false
    },
    {
      "id": "401",
      "properties": {"firstname": "New", "lastname": "Person", "hs_lead_status": "NEW"},
      "createdAt": "2026-03-18T14:10:00.000Z",
      "updatedAt": "2026-03-18T14:10:00.000Z",
      "archived": false,
      "new": true
    }
  ],
  "startedAt": "2026-03-18T14:10:00.000Z",
  "completedAt": "2026-03-18T14:10:00.090Z"
}
```

</details>

<details>
<summary>Batch archive contacts</summary>

Archives multiple contacts by their internal IDs in a single call.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `BatchInputSimplePublicObjectId` | Yes | Batch archive input with an `inputs` array of objects each containing an `id` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP headers. |

Returns: `error?`

Sample code:

```ballerina
check hubspotClient->/batch/archive.post({
    inputs: [
        {id: "301"},
        {id: "302"}
    ]
});
```

</details>

#### Search

<details>
<summary>Search contacts</summary>

Queries contacts using filter groups, property filters, sorting criteria, and pagination.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `PublicObjectSearchRequest` | Yes | Search request containing `filterGroups` (array of filter groups), `sorts`, `query` (full-text search string), `properties`, `limit`, and `after` (pagination cursor). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP headers. |

Returns: `CollectionResponseWithTotalSimplePublicObjectForwardPaging|error`

Sample code:

```ballerina
hscontacts:CollectionResponseWithTotalSimplePublicObjectForwardPaging result =
    check hubspotClient->/search.post({
        filterGroups: [
            {
                filters: [
                    {
                        propertyName: "hs_lead_status",
                        operator: "EQ",
                        value: "NEW"
                    }
                ]
            }
        ],
        properties: ["firstname", "lastname", "email", "hs_lead_status"],
        sorts: ["lastname"],
        'limit: 20,
        after: "0"
    });
```

Sample response:

```ballerina
{
  "total": 2,
  "results": [
    {
      "id": "201",
      "properties": {
        "firstname": "Bob",
        "lastname": "Johnson",
        "email": "bob.johnson@example.com",
        "hs_lead_status": "NEW"
      },
      "createdAt": "2026-03-18T12:00:00.000Z",
      "updatedAt": "2026-03-18T14:10:00.000Z",
      "archived": false
    },
    {
      "id": "401",
      "properties": {
        "firstname": "New",
        "lastname": "Person",
        "email": "newperson@example.com",
        "hs_lead_status": "NEW"
      },
      "createdAt": "2026-03-18T14:10:00.000Z",
      "updatedAt": "2026-03-18T14:10:00.000Z",
      "archived": false
    }
  ],
  "paging": {
    "next": {
      "after": "402",
      "link": "https://api.hubapi.com/crm/v3/objects/contacts/search?after=402"
    }
  }
}
```

</details>

#### Merge & GDPR

<details>
<summary>Merge two contacts</summary>

Merges two contact records into one, combining their properties and associations. The primary contact is kept; the other is archived.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `PublicMergeInput` | Yes | Merge input containing `primaryObjectId` (the contact to keep) and `objectIdToMerge` (the contact to merge in and archive). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP headers. |

Returns: `SimplePublicObject|error`

Sample code:

```ballerina
hscontacts:SimplePublicObject merged = check hubspotClient->/merge.post({
    primaryObjectId: "101",
    objectIdToMerge: "201"
});
```

Sample response:

```ballerina
{
  "id": "101",
  "properties": {
    "firstname": "Alice",
    "lastname": "Smith",
    "email": "alice@example.com",
    "lastmodifieddate": "2026-03-18T15:00:00.000Z"
  },
  "createdAt": "2024-01-15T10:00:00.000Z",
  "updatedAt": "2026-03-18T15:00:00.000Z",
  "archived": false
}
```

</details>

<details>
<summary>GDPR delete a contact</summary>

Permanently and irrecoverably deletes a contact and all associated data for GDPR compliance. This cannot be undone.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `PublicGdprDeleteInput` | Yes | GDPR delete input containing `objectId` (internal contact ID) and optional `idProperty` to specify an alternate unique identifier. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP headers. |

Returns: `error?`

Sample code:

```ballerina
check hubspotClient->/gdpr\-delete.post({
    objectId: "101"
});
```

</details>
