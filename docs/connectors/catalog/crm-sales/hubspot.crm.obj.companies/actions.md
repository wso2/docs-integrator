---
title: Actions
---

# Actions

The `ballerinax/hubspot.crm.obj.companies` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Perform CRUD, batch, search, and merge operations on HubSpot CRM company records. |

---

## Client

Perform CRUD, batch, search, and merge operations on HubSpot CRM company records.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `http:BearerTokenConfig\|OAuth2RefreshTokenGrantConfig\|ApiKeysConfig` | Required | Authentication configuration: OAuth 2.0 refresh token grant, bearer token, or HubSpot Private App API key. |
| `httpVersion` | `http:HttpVersion` | `HTTP_2_0` | HTTP protocol version to use for requests. |
| `timeout` | `decimal` | `30` | Request timeout in seconds. |
| `retryConfig` | `http:RetryConfig` | `()` | Retry configuration for failed requests. |
| `secureSocket` | `http:ClientSecureSocket` | `()` | SSL/TLS configuration. |
| `proxy` | `http:ProxyConfig` | `()` | Proxy server configuration. |
| `validation` | `boolean` | `true` | Enable constraint validation on request and response payloads. |

### Initializing the client

```ballerina
import ballerinax/hubspot.crm.obj.companies;

configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string refreshToken = ?;

companies:Client hubspotClient = check new ({
    auth: {
        clientId: clientId,
        clientSecret: clientSecret,
        refreshToken: refreshToken
    }
});
```

### Operations

#### Single record operations

<details>
<summary>List</summary>

Returns a paginated list of company records. Supports filtering by archived status and retrieving specific properties and associations.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `GetCrmV3ObjectsCompaniesGetPageQueries` | No | Optional query parameters: `limit` (default 10), `after` (pagination cursor), `properties`, `propertiesWithHistory`, `associations`, `archived`. |

Returns: `CollectionResponseSimplePublicObjectWithAssociationsForwardPaging|error`

Sample code:

```ballerina
companies:CollectionResponseSimplePublicObjectWithAssociationsForwardPaging page =
    check hubspotClient->/companies(queries = {
        'limit: 5,
        properties: ["name", "domain", "city"]
    });
```

Sample response:

```ballerina
{
  "results": [
    {
      "id": "12345",
      "properties": {
        "name": "Acme Corp",
        "domain": "acmecorp.com",
        "city": "San Francisco",
        "createdate": "2024-01-15T10:00:00.000Z",
        "hs_lastmodifieddate": "2024-03-01T08:30:00.000Z"
      },
      "createdAt": "2024-01-15T10:00:00.000Z",
      "updatedAt": "2024-03-01T08:30:00.000Z",
      "archived": false
    }
  ],
  "paging": {
    "next": {
      "after": "54321",
      "link": "https://api.hubapi.com/crm/v3/objects/companies?after=54321"
    }
  }
}
```

</details>

<details>
<summary>Create</summary>

Creates a new company record with the specified properties and optional associations.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `SimplePublicObjectInputForCreate` | Yes | Company properties to set on creation and optional associations to link. |

Returns: `SimplePublicObject|error`

Sample code:

```ballerina
companies:SimplePublicObject company = check hubspotClient->/companies.post({
    properties: {
        "name": "Tech Innovations Inc",
        "domain": "techinnovations.com",
        "city": "Austin",
        "industry": "TECHNOLOGY"
    }
});
```

Sample response:

```ballerina
{
  "id": "67890",
  "properties": {
    "name": "Tech Innovations Inc",
    "domain": "techinnovations.com",
    "city": "Austin",
    "industry": "TECHNOLOGY",
    "createdate": "2024-03-18T12:00:00.000Z",
    "hs_lastmodifieddate": "2024-03-18T12:00:00.000Z"
  },
  "createdAt": "2024-03-18T12:00:00.000Z",
  "updatedAt": "2024-03-18T12:00:00.000Z",
  "archived": false
}
```

</details>

<details>
<summary>Read</summary>

Reads a single company record by its internal HubSpot ID, returning the requested properties and associations.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | `string` | Yes | The internal HubSpot company ID. |
| `queries` | `GetCrmV3ObjectsCompaniesCompanyIdGetByIdQueries` | No | Optional query parameters: `properties`, `propertiesWithHistory`, `associations`, `archived`, `idProperty`. |

Returns: `SimplePublicObjectWithAssociations|error`

Sample code:

```ballerina
companies:SimplePublicObjectWithAssociations company =
    check hubspotClient->/companies/["67890"](queries = {
        properties: ["name", "domain", "industry", "phone"]
    });
```

Sample response:

```ballerina
{
  "id": "67890",
  "properties": {
    "name": "Tech Innovations Inc",
    "domain": "techinnovations.com",
    "industry": "TECHNOLOGY",
    "phone": "+1-512-555-0100"
  },
  "createdAt": "2024-03-18T12:00:00.000Z",
  "updatedAt": "2024-03-18T12:00:00.000Z",
  "archived": false,
  "associations": {}
}
```

</details>

<details>
<summary>Update</summary>

Updates an existing company record's properties by its internal ID or a unique custom property value.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | `string` | Yes | The internal HubSpot company ID. |
| `payload` | `SimplePublicObjectInput` | Yes | The company properties to update. |
| `queries` | `PatchCrmV3ObjectsCompaniesCompanyIdUpdateQueries` | No | Optional `idProperty` to identify the record by a unique custom property instead of the internal ID. |

Returns: `SimplePublicObject|error`

Sample code:

```ballerina
companies:SimplePublicObject updated = check hubspotClient->/companies/["67890"].patch({
    properties: {
        "name": "Tech Innovations Inc (Updated)",
        "city": "Seattle",
        "phone": "+1-206-555-0200"
    }
});
```

Sample response:

```ballerina
{
  "id": "67890",
  "properties": {
    "name": "Tech Innovations Inc (Updated)",
    "city": "Seattle",
    "phone": "+1-206-555-0200",
    "hs_lastmodifieddate": "2024-03-18T14:00:00.000Z"
  },
  "createdAt": "2024-03-18T12:00:00.000Z",
  "updatedAt": "2024-03-18T14:00:00.000Z",
  "archived": false
}
```

</details>

<details>
<summary>Archive</summary>

Archives (soft-deletes) a company record by its internal HubSpot ID. Archived records are hidden from default queries but can be restored.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `companyId` | `string` | Yes | The internal HubSpot company ID to archive. |

Returns: `error?`

Sample code:

```ballerina
check hubspotClient->/companies/["67890"].delete();
```

</details>

<details>
<summary>Merge two companies with same type</summary>

Merges two company records into one, retaining the primary record and archiving the secondary.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `PublicMergeInput` | Yes | Specifies `primaryObjectId` (record to keep) and `objectIdToMerge` (record to archive). |

Returns: `SimplePublicObject|error`

Sample code:

```ballerina
companies:SimplePublicObject merged = check hubspotClient->/companies/merge.post({
    primaryObjectId: "12345",
    objectIdToMerge: "67890"
});
```

Sample response:

```ballerina
{
  "id": "12345",
  "properties": {
    "name": "Acme Corp",
    "domain": "acmecorp.com",
    "hs_lastmodifieddate": "2024-03-18T15:00:00.000Z"
  },
  "createdAt": "2024-01-15T10:00:00.000Z",
  "updatedAt": "2024-03-18T15:00:00.000Z",
  "archived": false
}
```

</details>

<details>
<summary>Search</summary>

Searches company records using filter groups, property projections, and sort criteria.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `PublicObjectSearchRequest` | Yes | Search request containing `filterGroups`, `properties`, `sorts`, `limit`, `after`, and an optional full-text `query`. |

Returns: `CollectionResponseWithTotalSimplePublicObjectForwardPaging|error`

Sample code:

```ballerina
companies:CollectionResponseWithTotalSimplePublicObjectForwardPaging result =
    check hubspotClient->/companies/search.post({
        filterGroups: [
            {
                filters: [
                    {
                        propertyName: "industry",
                        operator: "EQ",
                        value: "TECHNOLOGY"
                    }
                ]
            }
        ],
        properties: ["name", "domain", "industry"],
        'limit: 10
    });
```

Sample response:

```ballerina
{
  "total": 2,
  "results": [
    {
      "id": "12345",
      "properties": {
        "name": "Acme Corp",
        "domain": "acmecorp.com",
        "industry": "TECHNOLOGY"
      },
      "createdAt": "2024-01-15T10:00:00.000Z",
      "updatedAt": "2024-03-01T08:30:00.000Z",
      "archived": false
    },
    {
      "id": "67890",
      "properties": {
        "name": "Tech Innovations Inc",
        "domain": "techinnovations.com",
        "industry": "TECHNOLOGY"
      },
      "createdAt": "2024-03-18T12:00:00.000Z",
      "updatedAt": "2024-03-18T14:00:00.000Z",
      "archived": false
    }
  ]
}
```

</details>

#### Batch operations

<details>
<summary>Create a batch of companies</summary>

Creates multiple company records in a single request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `BatchInputSimplePublicObjectInputForCreate` | Yes | Array of company objects to create, each with `properties` and optional `associations`. |

Returns: `BatchResponseSimplePublicObject|BatchResponseSimplePublicObjectWithErrors|error`

Sample code:

```ballerina
companies:BatchResponseSimplePublicObject|companies:BatchResponseSimplePublicObjectWithErrors batchResult =
    check hubspotClient->/companies/batch/create.post({
        inputs: [
            {properties: {"name": "Company Alpha", "domain": "alpha.com"}},
            {properties: {"name": "Company Beta", "domain": "beta.io"}}
        ]
    });
```

Sample response:

```ballerina
{
  "status": "COMPLETE",
  "results": [
    {
      "id": "11111",
      "properties": {
        "name": "Company Alpha",
        "domain": "alpha.com",
        "createdate": "2024-03-18T12:00:00.000Z"
      },
      "createdAt": "2024-03-18T12:00:00.000Z",
      "updatedAt": "2024-03-18T12:00:00.000Z",
      "archived": false
    },
    {
      "id": "22222",
      "properties": {
        "name": "Company Beta",
        "domain": "beta.io",
        "createdate": "2024-03-18T12:00:00.000Z"
      },
      "createdAt": "2024-03-18T12:00:00.000Z",
      "updatedAt": "2024-03-18T12:00:00.000Z",
      "archived": false
    }
  ],
  "startedAt": "2024-03-18T12:00:00.000Z",
  "completedAt": "2024-03-18T12:00:01.000Z"
}
```

</details>

<details>
<summary>Read a batch of companies by internal ID, or unique property values</summary>

Reads multiple company records by their internal IDs or unique property values in a single request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `BatchReadInputSimplePublicObjectId` | Yes | Array of record IDs to fetch and the list of properties to return for each. |
| `queries` | `PostCrmV3ObjectsCompaniesBatchReadReadQueries` | No | Optional `archived` boolean to include archived records (default `false`). |

Returns: `BatchResponseSimplePublicObject|BatchResponseSimplePublicObjectWithErrors|error`

Sample code:

```ballerina
companies:BatchResponseSimplePublicObject|companies:BatchResponseSimplePublicObjectWithErrors batchResult =
    check hubspotClient->/companies/batch/read.post({
        inputs: [{id: "11111"}, {id: "22222"}],
        properties: ["name", "domain", "industry"]
    });
```

Sample response:

```ballerina
{
  "status": "COMPLETE",
  "results": [
    {
      "id": "11111",
      "properties": {
        "name": "Company Alpha",
        "domain": "alpha.com",
        "industry": "TECHNOLOGY"
      },
      "createdAt": "2024-03-18T12:00:00.000Z",
      "updatedAt": "2024-03-18T12:00:00.000Z",
      "archived": false
    },
    {
      "id": "22222",
      "properties": {
        "name": "Company Beta",
        "domain": "beta.io",
        "industry": "TECHNOLOGY"
      },
      "createdAt": "2024-03-18T12:00:00.000Z",
      "updatedAt": "2024-03-18T12:00:00.000Z",
      "archived": false
    }
  ],
  "startedAt": "2024-03-18T12:00:00.000Z",
  "completedAt": "2024-03-18T12:00:01.000Z"
}
```

</details>

<details>
<summary>Update a batch of companies by internal ID, or unique property values</summary>

Updates multiple company records in a single request, each identified by an internal ID or a unique property value.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `BatchInputSimplePublicObjectBatchInput` | Yes | Array of update items, each with `id`, optional `idProperty`, and the `properties` to set. |

Returns: `BatchResponseSimplePublicObject|BatchResponseSimplePublicObjectWithErrors|error`

Sample code:

```ballerina
companies:BatchResponseSimplePublicObject|companies:BatchResponseSimplePublicObjectWithErrors batchResult =
    check hubspotClient->/companies/batch/update.post({
        inputs: [
            {id: "11111", properties: {"city": "New York"}},
            {id: "22222", properties: {"city": "Chicago"}}
        ]
    });
```

Sample response:

```ballerina
{
  "status": "COMPLETE",
  "results": [
    {
      "id": "11111",
      "properties": {
        "name": "Company Alpha",
        "city": "New York",
        "hs_lastmodifieddate": "2024-03-18T15:00:00.000Z"
      },
      "createdAt": "2024-03-18T12:00:00.000Z",
      "updatedAt": "2024-03-18T15:00:00.000Z",
      "archived": false
    },
    {
      "id": "22222",
      "properties": {
        "name": "Company Beta",
        "city": "Chicago",
        "hs_lastmodifieddate": "2024-03-18T15:00:00.000Z"
      },
      "createdAt": "2024-03-18T12:00:00.000Z",
      "updatedAt": "2024-03-18T15:00:00.000Z",
      "archived": false
    }
  ],
  "startedAt": "2024-03-18T15:00:00.000Z",
  "completedAt": "2024-03-18T15:00:01.000Z"
}
```

</details>

<details>
<summary>Create or update a batch of companies by unique property values</summary>

Creates or updates a batch of companies matched by a unique property value. If a matching record is found it is updated; otherwise a new record is created.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `BatchInputSimplePublicObjectBatchInputUpsert` | Yes | Array of upsert items, each with `id` (unique property value), `idProperty` (unique property name), and `properties` to set. |

Returns: `BatchResponseSimplePublicUpsertObject|BatchResponseSimplePublicUpsertObjectWithErrors|error`

Sample code:

```ballerina
companies:BatchResponseSimplePublicUpsertObject|companies:BatchResponseSimplePublicUpsertObjectWithErrors upsertResult =
    check hubspotClient->/companies/batch/upsert.post({
        inputs: [
            {
                idProperty: "domain",
                id: "acmecorp.com",
                properties: {"name": "Acme Corp", "phone": "+1-415-555-0100"}
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
      "id": "12345",
      "properties": {
        "name": "Acme Corp",
        "domain": "acmecorp.com",
        "phone": "+1-415-555-0100",
        "hs_lastmodifieddate": "2024-03-18T15:00:00.000Z"
      },
      "createdAt": "2024-01-15T10:00:00.000Z",
      "updatedAt": "2024-03-18T15:00:00.000Z",
      "archived": false,
      "new": false
    }
  ],
  "startedAt": "2024-03-18T15:00:00.000Z",
  "completedAt": "2024-03-18T15:00:01.000Z"
}
```

</details>

<details>
<summary>Archive a batch of companies by ID</summary>

Archives multiple company records in a single request using their internal IDs.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `BatchInputSimplePublicObjectId` | Yes | Array of internal company IDs to archive. |

Returns: `error?`

Sample code:

```ballerina
check hubspotClient->/companies/batch/archive.post({
    inputs: [{id: "11111"}, {id: "22222"}]
});
```

</details>
