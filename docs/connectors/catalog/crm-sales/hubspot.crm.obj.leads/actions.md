---
title: Actions
---

# Actions

The `ballerinax/hubspot.crm.obj.leads` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Provides full CRUD, batch, and search operations on HubSpot CRM lead objects. |

---

## Client

Provides full CRUD, batch, and search operations on HubSpot CRM lead objects.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `http:BearerTokenConfig\|OAuth2RefreshTokenGrantConfig\|ApiKeysConfig` | Required | Authentication configuration: OAuth 2.0 refresh token, bearer token, or Private App API key. |
| `serviceUrl` | `string` | `"https://api.hubapi.com/crm/v3/objects/leads"` | Base URL of the HubSpot CRM Leads API. |
| `httpVersion` | `http:HttpVersion` | `http:HTTP_2_0` | HTTP protocol version to use. |
| `timeout` | `decimal` | `30` | Request timeout in seconds. |
| `retryConfig` | `http:RetryConfig` | `()` | Retry configuration for failed requests. |
| `secureSocket` | `http:ClientSecureSocket` | `()` | SSL/TLS configuration. |
| `proxy` | `http:ProxyConfig` | `()` | HTTP proxy configuration. |
| `validation` | `boolean` | `true` | Enables constraint validation on request/response payloads. |

### Initializing the client

```ballerina
import ballerinax/hubspot.crm.obj.leads as leads;
import ballerina/oauth2;

configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string refreshToken = ?;

leads:Client hsLeads = check new ({
    auth: {
        clientId: clientId,
        clientSecret: clientSecret,
        refreshToken: refreshToken,
        credentialBearer: oauth2:POST_BODY_BEARER
    }
});
```

### Operations

#### Single lead CRUD

<details>
<summary>Read a page of leads</summary>

Retrieves a paginated list of lead records. Use query parameters to filter archived leads, request specific properties, or include association data.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `GetCrmV3ObjectsLeadsGetPageQueries` | No | Optional query parameters including `limit`, `after` (pagination cursor), `properties`, `propertiesWithHistory`, `associations`, and `archived`. |

Returns: `CollectionResponseSimplePublicObjectWithAssociationsForwardPaging|error`

Sample code:

```ballerina
leads:CollectionResponseSimplePublicObjectWithAssociationsForwardPaging allLeads =
    check hsLeads->/.get(queries = {
        properties: ["hs_lead_name"],
        'limit: 10
    });
```

Sample response:

```ballerina
{
  "results": [
    {
      "id": "12345",
      "properties": {
        "hs_lead_name": "Jane Doe",
        "createdate": "2024-01-15T10:30:00.000Z",
        "lastmodifieddate": "2024-01-15T10:30:00.000Z",
        "hs_object_id": "12345"
      },
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z",
      "archived": false
    }
  ],
  "paging": {
    "next": {
      "after": "NTI1Cg%3D%3D",
      "link": "https://api.hubapi.com/crm/v3/objects/leads?after=NTI1Cg%3D%3D"
    }
  }
}
```

</details>

<details>
<summary>Create a lead</summary>

Creates a new lead record. You can specify properties and optionally associate the lead with existing CRM objects (e.g., contacts) at creation time.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `SimplePublicObjectInputForCreate` | Yes | Lead properties and optional associations. Use `associations` to link to contacts or other CRM objects on creation. |

Returns: `SimplePublicObject|error`

Sample code:

```ballerina
leads:SimplePublicObjectInputForCreate payload = {
    associations: [
        {
            types: [{associationCategory: "HUBSPOT_DEFINED", associationTypeId: 578}],
            to: {id: "67890"}
        }
    ],
    properties: {"hs_lead_name": "Jane Doe"}
};
leads:SimplePublicObject createdLead = check hsLeads->/.post(payload);
```

Sample response:

```ballerina
{
  "id": "12345",
  "properties": {
    "hs_lead_name": "Jane Doe",
    "createdate": "2024-01-15T10:30:00.000Z",
    "lastmodifieddate": "2024-01-15T10:30:00.000Z",
    "hs_object_id": "12345"
  },
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z",
  "archived": false
}
```

</details>

<details>
<summary>Read a lead</summary>

Retrieves a single lead record by its HubSpot object ID or a custom unique identifier property.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `leadsId` | `string` | Yes | The HubSpot ID of the lead (or the value of the property specified in `idProperty`). |
| `queries` | `GetCrmV3ObjectsLeadsLeadsIdGetByIdQueries` | No | Optional query parameters: `properties`, `propertiesWithHistory`, `associations`, `archived`, and `idProperty`. |

Returns: `SimplePublicObjectWithAssociations|error`

Sample code:

```ballerina
leads:SimplePublicObjectWithAssociations lead =
    check hsLeads->/[leadId].get(queries = {
        properties: ["hs_lead_name"]
    });
```

Sample response:

```ballerina
{
  "id": "12345",
  "properties": {
    "hs_lead_name": "Jane Doe",
    "createdate": "2024-01-15T10:30:00.000Z",
    "lastmodifieddate": "2024-01-16T08:00:00.000Z",
    "hs_object_id": "12345"
  },
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-16T08:00:00.000Z",
  "archived": false,
  "associations": {}
}
```

</details>

<details>
<summary>Update a lead</summary>

Performs a partial update on a lead record. Only the fields included in the payload are modified; omitted fields remain unchanged.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `leadsId` | `string` | Yes | The HubSpot ID of the lead to update. |
| `payload` | `SimplePublicObjectInput` | Yes | A map of property names to new values. |
| `queries` | `PatchCrmV3ObjectsLeadsLeadsIdUpdateQueries` | No | Optional `idProperty` to resolve the lead by a custom unique identifier. |

Returns: `SimplePublicObject|error`

Sample code:

```ballerina
leads:SimplePublicObject updatedLead = check hsLeads->/[leadId].patch(
    payload = {properties: {"hs_lead_name": "Jane Smith"}}
);
```

Sample response:

```ballerina
{
  "id": "12345",
  "properties": {
    "hs_lead_name": "Jane Smith",
    "createdate": "2024-01-15T10:30:00.000Z",
    "lastmodifieddate": "2024-01-16T09:00:00.000Z",
    "hs_object_id": "12345"
  },
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-16T09:00:00.000Z",
  "archived": false
}
```

</details>

<details>
<summary>Archive a lead</summary>

Archives (soft-deletes) a lead record. Archived leads are hidden from default list views but can be retrieved with `archived=true`.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `leadsId` | `string` | Yes | The HubSpot ID of the lead to archive. |

Returns: `error?`

Sample code:

```ballerina
check hsLeads->/[leadId].delete();
```

</details>

#### Batch operations

<details>
<summary>Create a batch of leads</summary>

Creates multiple lead records in a single API call. Each input in the batch can include properties and associations.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `BatchInputSimplePublicObjectInputForCreate` | Yes | A batch input containing an array of lead creation payloads under `inputs`. |

Returns: `BatchResponseSimplePublicObject|BatchResponseSimplePublicObjectWithErrors|error`

Sample code:

```ballerina
leads:BatchInputSimplePublicObjectInputForCreate batchPayload = {
    inputs: [
        {associations: [], properties: {"hs_lead_name": "Alice Johnson"}},
        {associations: [], properties: {"hs_lead_name": "Bob Williams"}}
    ]
};
leads:BatchResponseSimplePublicObject|leads:BatchResponseSimplePublicObjectWithErrors result =
    check hsLeads->/batch/create.post(batchPayload);
```

Sample response:

```ballerina
{
  "status": "COMPLETE",
  "results": [
    {
      "id": "11111",
      "properties": {"hs_lead_name": "Alice Johnson", "hs_object_id": "11111"},
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z",
      "archived": false
    },
    {
      "id": "22222",
      "properties": {"hs_lead_name": "Bob Williams", "hs_object_id": "22222"},
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
<summary>Read a batch of leads by internal ID, or unique property values</summary>

Retrieves multiple lead records in a single request, identified by their HubSpot IDs or custom unique identifier properties.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `BatchReadInputSimplePublicObjectId` | Yes | Batch read input containing `inputs` (array of IDs), `properties`, and optionally `propertiesWithHistory` and `idProperty`. |
| `queries` | `PostCrmV3ObjectsLeadsBatchReadReadQueries` | No | Optional `archived` flag to include archived leads. |

Returns: `BatchResponseSimplePublicObject|BatchResponseSimplePublicObjectWithErrors|error`

Sample code:

```ballerina
leads:BatchReadInputSimplePublicObjectId readPayload = {
    inputs: [{id: "11111"}, {id: "22222"}],
    properties: ["hs_lead_name"]
};
leads:BatchResponseSimplePublicObject|leads:BatchResponseSimplePublicObjectWithErrors batchResult =
    check hsLeads->/batch/read.post(readPayload);
```

Sample response:

```ballerina
{
  "status": "COMPLETE",
  "results": [
    {
      "id": "11111",
      "properties": {"hs_lead_name": "Alice Johnson", "hs_object_id": "11111"},
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z",
      "archived": false
    },
    {
      "id": "22222",
      "properties": {"hs_lead_name": "Bob Williams", "hs_object_id": "22222"},
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z",
      "archived": false
    }
  ],
  "requestedAt": "2024-01-15T10:30:00.000Z",
  "startedAt": "2024-01-15T10:30:00.001Z",
  "completedAt": "2024-01-15T10:30:00.050Z"
}
```

</details>

<details>
<summary>Update a batch of existing leads</summary>

Updates multiple existing lead records in a single API call. Each input must include the lead's `id` and the properties to update.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `BatchInputSimplePublicObjectBatchInput` | Yes | Batch update input containing an `inputs` array; each element has `id` and `properties`. |

Returns: `BatchResponseSimplePublicObject|BatchResponseSimplePublicObjectWithErrors|error`

Sample code:

```ballerina
leads:BatchInputSimplePublicObjectBatchInput updatePayload = {
    inputs: [
        {id: "11111", properties: {"hs_lead_name": "Alice Johnson-Updated"}},
        {id: "22222", properties: {"hs_lead_name": "Robert Williams"}}
    ]
};
leads:BatchResponseSimplePublicObject|leads:BatchResponseSimplePublicObjectWithErrors updateResult =
    check hsLeads->/batch/update.post(updatePayload);
```

Sample response:

```ballerina
{
  "status": "COMPLETE",
  "results": [
    {
      "id": "11111",
      "properties": {"hs_lead_name": "Alice Johnson-Updated", "hs_object_id": "11111"},
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-16T09:00:00.000Z",
      "archived": false
    },
    {
      "id": "22222",
      "properties": {"hs_lead_name": "Robert Williams", "hs_object_id": "22222"},
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-16T09:00:00.000Z",
      "archived": false
    }
  ],
  "requestedAt": "2024-01-16T09:00:00.000Z",
  "startedAt": "2024-01-16T09:00:00.001Z",
  "completedAt": "2024-01-16T09:00:00.080Z"
}
```

</details>

<details>
<summary>Archive a batch of leads</summary>

Archives multiple lead records in a single API call.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `BatchInputSimplePublicObjectId` | Yes | Batch archive input with an `inputs` array of lead IDs to archive. |

Returns: `error?`

Sample code:

```ballerina
check hsLeads->/batch/archive.post({
    inputs: [{id: "11111"}, {id: "22222"}]
});
```

</details>

<details>
<summary>Create or update a batch of leads</summary>

Creates new leads or updates existing ones based on a unique identifier property. Records matching the identifier are updated; non-matching records are created.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `BatchInputSimplePublicObjectBatchInputUpsert` | Yes | Batch upsert input containing `inputs` (each with `idProperty`, `id`, and `properties`). |

Returns: `BatchResponseSimplePublicUpsertObject|BatchResponseSimplePublicUpsertObjectWithErrors|error`

Sample code:

```ballerina
leads:BatchInputSimplePublicObjectBatchInputUpsert upsertPayload = {
    inputs: [
        {idProperty: "hs_object_id", id: "11111", properties: {"hs_lead_name": "Alice Johnson"}},
        {idProperty: "hs_object_id", id: "99999", properties: {"hs_lead_name": "New Lead"}}
    ]
};
leads:BatchResponseSimplePublicUpsertObject|leads:BatchResponseSimplePublicUpsertObjectWithErrors upsertResult =
    check hsLeads->/batch/upsert.post(upsertPayload);
```

Sample response:

```ballerina
{
  "status": "COMPLETE",
  "results": [
    {
      "id": "11111",
      "properties": {"hs_lead_name": "Alice Johnson", "hs_object_id": "11111"},
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-16T10:00:00.000Z",
      "archived": false,
      "new": false
    },
    {
      "id": "33333",
      "properties": {"hs_lead_name": "New Lead", "hs_object_id": "33333"},
      "createdAt": "2024-01-16T10:00:00.000Z",
      "updatedAt": "2024-01-16T10:00:00.000Z",
      "archived": false,
      "new": true
    }
  ],
  "requestedAt": "2024-01-16T10:00:00.000Z",
  "startedAt": "2024-01-16T10:00:00.001Z",
  "completedAt": "2024-01-16T10:00:00.090Z"
}
```

</details>

#### Search

<details>
<summary>Filter, Sort, and Search CRM Objects</summary>

Searches lead records using filter groups, sorting criteria, and property projection. Supports complex queries combining multiple property filters with AND/OR logic.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `PublicObjectSearchRequest` | Yes | Search request with optional `query` (full-text), `filterGroups` (structured filters), `sorts`, `properties`, `limit`, and `after` (pagination cursor). |

Returns: `CollectionResponseWithTotalSimplePublicObjectForwardPaging|error`

Sample code:

```ballerina
leads:PublicObjectSearchRequest searchReq = {
    query: "Body Fit",
    properties: ["hs_lead_name"],
    filterGroups: [
        {
            filters: [
                {propertyName: "hs_lead_name", operator: "CONTAINS_TOKEN", value: "Fit"}
            ]
        }
    ],
    'limit: 5
};
leads:CollectionResponseWithTotalSimplePublicObjectForwardPaging searchResult =
    check hsLeads->/search.post(searchReq);
```

Sample response:

```ballerina
{
  "total": 2,
  "results": [
    {
      "id": "55555",
      "properties": {
        "hs_lead_name": "Body Fit Gold Member",
        "createdate": "2024-01-10T08:00:00.000Z",
        "lastmodifieddate": "2024-01-12T08:00:00.000Z",
        "hs_object_id": "55555"
      },
      "createdAt": "2024-01-10T08:00:00.000Z",
      "updatedAt": "2024-01-12T08:00:00.000Z",
      "archived": false
    },
    {
      "id": "66666",
      "properties": {
        "hs_lead_name": "Body Fit Silver Member",
        "createdate": "2024-01-11T08:00:00.000Z",
        "lastmodifieddate": "2024-01-11T08:00:00.000Z",
        "hs_object_id": "66666"
      },
      "createdAt": "2024-01-11T08:00:00.000Z",
      "updatedAt": "2024-01-11T08:00:00.000Z",
      "archived": false
    }
  ],
  "paging": {}
}
```

</details>
