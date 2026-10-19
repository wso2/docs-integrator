---
title: Actions
---

# Actions

The `ballerinax/hubspot.crm.obj.deals` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Perform CRUD, batch, search, and merge operations on HubSpot CRM deal records. |

---

## Client

Perform CRUD, batch, search, and merge operations on HubSpot CRM deal records.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `http:BearerTokenConfig\|OAuth2RefreshTokenGrantConfig\|ApiKeysConfig` | Required | Authentication configuration: OAuth 2.0 refresh token, bearer token, or HubSpot private app API key. |
| `httpVersion` | `http:HttpVersion` | `HTTP_2_0` | HTTP protocol version to use. |
| `timeout` | `decimal` | `30` | Request timeout in seconds. |
| `retryConfig` | `http:RetryConfig` | `()` | Retry configuration for failed requests. |
| `secureSocket` | `http:ClientSecureSocket` | `()` | SSL/TLS configuration. |
| `proxy` | `http:ProxyConfig` | `()` | Proxy server configuration. |
| `validation` | `boolean` | `true` | Enable constraint validation on request/response payloads. |

### Initializing the client

```ballerina
import ballerinax/hubspot.crm.obj.deals;

configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string refreshToken = ?;

deals:Client hubSpotDeals = check new ({
    auth: {
        clientId: clientId,
        clientSecret: clientSecret,
        refreshToken: refreshToken
    }
});
```

### Operations

#### Deal CRUD

<details>
<summary>List deals</summary>

Returns a paginated list of deals. Optionally expand specific properties and associations.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `GetCrmV3ObjectsDealsGetPageQueries` | No | Query parameters including `limit`, `after` (cursor), `properties`, `propertiesWithHistory`, `associations`, and `archived`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP headers. |

Returns: `CollectionResponseSimplePublicObjectWithAssociationsForwardPaging|error`

Sample code:

```ballerina
deals:CollectionResponseSimplePublicObjectWithAssociationsForwardPaging allDeals =
    check hubSpotDeals->/;
```

Sample response:

```ballerina
{
  "results": [
    {
      "id": "19171005526",
      "properties": {
        "amount": "5000",
        "closedate": "2024-12-31T00:00:00.000Z",
        "dealname": "New Partnership Deal",
        "dealstage": "appointmentscheduled",
        "hs_lastmodifieddate": "2024-01-15T10:23:45.678Z",
        "pipeline": "default"
      },
      "createdAt": "2024-01-10T08:00:00.000Z",
      "updatedAt": "2024-01-15T10:23:45.678Z",
      "archived": false
    }
  ],
  "paging": {
    "next": {
      "after": "19171005527",
      "link": "https://api.hubapi.com/crm/v3/objects/deals?after=19171005527"
    }
  }
}
```

</details>

<details>
<summary>Create a deal</summary>

Creates a new deal record with the provided properties.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `SimplePublicObjectInputForCreate` | Yes | Deal properties and optional associations to set on creation. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP headers. |

Returns: `SimplePublicObject|error`

Sample code:

```ballerina
deals:SimplePublicObjectInputForCreate payload = {
    properties: {
        "dealname": "New Partnership Deal",
        "amount": "5000",
        "dealstage": "appointmentscheduled",
        "pipeline": "default",
        "closedate": "2024-12-31"
    },
    associations: []
};
deals:SimplePublicObject createdDeal = check hubSpotDeals->/.post(payload);
```

Sample response:

```ballerina
{
  "id": "19171005526",
  "properties": {
    "amount": "5000",
    "closedate": "2024-12-31T00:00:00.000Z",
    "createdate": "2024-01-15T08:00:00.000Z",
    "dealname": "New Partnership Deal",
    "dealstage": "appointmentscheduled",
    "hs_lastmodifieddate": "2024-01-15T08:00:00.000Z",
    "pipeline": "default"
  },
  "createdAt": "2024-01-15T08:00:00.000Z",
  "updatedAt": "2024-01-15T08:00:00.000Z",
  "archived": false
}
```

</details>

<details>
<summary>Read a deal by ID</summary>

Retrieves a single deal record by its internal HubSpot deal ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dealId` | `string` | Yes | The internal HubSpot deal ID. |
| `queries` | `GetCrmV3ObjectsDealsDealIdGetByIdQueries` | No | Query parameters including `properties`, `propertiesWithHistory`, `associations`, `archived`, and `idProperty`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP headers. |

Returns: `SimplePublicObjectWithAssociations|error`

Sample code:

```ballerina
string dealId = "19171005526";
deals:SimplePublicObjectWithAssociations deal = check hubSpotDeals->/[dealId];
```

Sample response:

```ballerina
{
  "id": "19171005526",
  "properties": {
    "amount": "5000",
    "closedate": "2024-12-31T00:00:00.000Z",
    "createdate": "2024-01-15T08:00:00.000Z",
    "dealname": "New Partnership Deal",
    "dealstage": "appointmentscheduled",
    "pipeline": "default"
  },
  "createdAt": "2024-01-15T08:00:00.000Z",
  "updatedAt": "2024-01-15T08:00:00.000Z",
  "archived": false,
  "associations": {}
}
```

</details>

<details>
<summary>Update a deal</summary>

Updates properties of an existing deal by its internal ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dealId` | `string` | Yes | The internal HubSpot deal ID to update. |
| `payload` | `SimplePublicObjectInput` | Yes | Map of property names and their new values. |
| `queries` | `PatchCrmV3ObjectsDealsDealIdUpdateQueries` | No | Optional `idProperty` to identify the deal by a unique property instead of ID. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP headers. |

Returns: `SimplePublicObject|error`

Sample code:

```ballerina
string dealId = "19171005526";
deals:SimplePublicObjectInput updatePayload = {
    properties: {
        "dealstage": "qualifiedtobuy",
        "amount": "7500"
    }
};
deals:SimplePublicObject updatedDeal = check hubSpotDeals->/[dealId].patch(updatePayload);
```

Sample response:

```ballerina
{
  "id": "19171005526",
  "properties": {
    "amount": "7500",
    "dealname": "New Partnership Deal",
    "dealstage": "qualifiedtobuy",
    "hs_lastmodifieddate": "2024-01-16T09:00:00.000Z",
    "pipeline": "default"
  },
  "createdAt": "2024-01-15T08:00:00.000Z",
  "updatedAt": "2024-01-16T09:00:00.000Z",
  "archived": false
}
```

</details>

<details>
<summary>Archive a deal</summary>

Archives (soft-deletes) a deal by its internal ID. Archived deals can be restored via the HubSpot UI.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dealId` | `string` | Yes | The internal HubSpot deal ID to archive. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP headers. |

Returns: `error?`

Sample code:

```ballerina
string dealId = "19171005526";
check hubSpotDeals->/[dealId].delete();
```

</details>

#### Batch operations

<details>
<summary>Create a batch of deals</summary>

Creates multiple deal records in a single request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `BatchInputSimplePublicObjectInputForCreate` | Yes | Array of deal input objects, each containing properties and optional associations. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP headers. |

Returns: `BatchResponseSimplePublicObject|BatchResponseSimplePublicObjectWithErrors|error`

Sample code:

```ballerina
deals:BatchInputSimplePublicObjectInputForCreate batchPayload = {
    inputs: [
        {properties: {"dealname": "Deal Alpha", "amount": "1000", "dealstage": "appointmentscheduled", "pipeline": "default"}, associations: []},
        {properties: {"dealname": "Deal Beta", "amount": "2000", "dealstage": "appointmentscheduled", "pipeline": "default"}, associations: []},
        {properties: {"dealname": "Deal Gamma", "amount": "3000", "dealstage": "qualifiedtobuy", "pipeline": "default"}, associations: []}
    ]
};
deals:BatchResponseSimplePublicObject|deals:BatchResponseSimplePublicObjectWithErrors result =
    check hubSpotDeals->/batch/create.post(batchPayload);
```

Sample response:

```ballerina
{
  "status": "COMPLETE",
  "results": [
    {"id": "101", "properties": {"dealname": "Deal Alpha", "amount": "1000", "dealstage": "appointmentscheduled"}},
    {"id": "102", "properties": {"dealname": "Deal Beta", "amount": "2000", "dealstage": "appointmentscheduled"}},
    {"id": "103", "properties": {"dealname": "Deal Gamma", "amount": "3000", "dealstage": "qualifiedtobuy"}}
  ],
  "startedAt": "2024-01-15T08:00:00.000Z",
  "completedAt": "2024-01-15T08:00:01.000Z"
}
```

</details>

<details>
<summary>Read a batch of deals by internal ID, or unique property values</summary>

Reads multiple deal records by their internal IDs or unique property values in a single request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `BatchReadInputSimplePublicObjectId` | Yes | List of deal IDs (or unique property values) and optional property projections. |
| `queries` | `PostCrmV3ObjectsDealsBatchReadReadQueries` | No | Optional `archived` flag to include archived deals. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP headers. |

Returns: `BatchResponseSimplePublicObject|BatchResponseSimplePublicObjectWithErrors|error`

Sample code:

```ballerina
deals:BatchReadInputSimplePublicObjectId readPayload = {
    inputs: [{id: "101"}, {id: "102"}],
    properties: ["dealname", "amount", "dealstage"]
};
deals:BatchResponseSimplePublicObject|deals:BatchResponseSimplePublicObjectWithErrors batchResult =
    check hubSpotDeals->/batch/read.post(readPayload);
```

Sample response:

```ballerina
{
  "status": "COMPLETE",
  "results": [
    {"id": "101", "properties": {"dealname": "Deal Alpha", "amount": "1000", "dealstage": "appointmentscheduled"}},
    {"id": "102", "properties": {"dealname": "Deal Beta", "amount": "2000", "dealstage": "appointmentscheduled"}}
  ],
  "startedAt": "2024-01-15T08:00:00.000Z",
  "completedAt": "2024-01-15T08:00:00.500Z"
}
```

</details>

<details>
<summary>Update a batch of deals by internal ID, or unique property values</summary>

Updates multiple deal records by their internal IDs or unique property values in a single request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `BatchInputSimplePublicObjectBatchInput` | Yes | Array of deal update inputs, each containing an ID and the properties to update. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP headers. |

Returns: `BatchResponseSimplePublicObject|BatchResponseSimplePublicObjectWithErrors|error`

Sample code:

```ballerina
deals:BatchInputSimplePublicObjectBatchInput updateBatch = {
    inputs: [
        {id: "101", properties: {"dealstage": "qualifiedtobuy"}},
        {id: "102", properties: {"dealstage": "presentationscheduled"}}
    ]
};
deals:BatchResponseSimplePublicObject|deals:BatchResponseSimplePublicObjectWithErrors updated =
    check hubSpotDeals->/batch/update.post(updateBatch);
```

Sample response:

```ballerina
{
  "status": "COMPLETE",
  "results": [
    {"id": "101", "properties": {"dealname": "Deal Alpha", "dealstage": "qualifiedtobuy"}},
    {"id": "102", "properties": {"dealname": "Deal Beta", "dealstage": "presentationscheduled"}}
  ],
  "startedAt": "2024-01-15T09:00:00.000Z",
  "completedAt": "2024-01-15T09:00:00.800Z"
}
```

</details>

<details>
<summary>Archive a batch of deals by ID</summary>

Archives multiple deal records by their internal IDs in a single request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `BatchInputSimplePublicObjectId` | Yes | Array of deal IDs to archive. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP headers. |

Returns: `error?`

Sample code:

```ballerina
deals:BatchInputSimplePublicObjectId archivePayload = {
    inputs: [{id: "101"}, {id: "102"}, {id: "103"}]
};
check hubSpotDeals->/batch/archive.post(archivePayload);
```

</details>

<details>
<summary>Create or update a batch of deals by unique property values</summary>

Creates or updates multiple deals in a single request, matching on a unique property value (idProperty). Records that match are updated; non-matching records are created.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `BatchInputSimplePublicObjectBatchInputUpsert` | Yes | Array of deal upsert inputs with an `idProperty` for matching and a `properties` map. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP headers. |

Returns: `BatchResponseSimplePublicUpsertObject|BatchResponseSimplePublicUpsertObjectWithErrors|error`

Sample code:

```ballerina
deals:BatchInputSimplePublicObjectBatchInputUpsert upsertPayload = {
    inputs: [
        {idProperty: "dealname", id: "New Partnership Deal", properties: {"amount": "9000", "dealstage": "closedwon"}},
        {idProperty: "dealname", id: "Another Deal", properties: {"amount": "1500", "dealstage": "appointmentscheduled", "pipeline": "default"}}
    ]
};
deals:BatchResponseSimplePublicUpsertObject|deals:BatchResponseSimplePublicUpsertObjectWithErrors upserted =
    check hubSpotDeals->/batch/upsert.post(upsertPayload);
```

Sample response:

```ballerina
{
  "status": "COMPLETE",
  "results": [
    {"id": "19171005526", "properties": {"dealname": "New Partnership Deal", "amount": "9000", "dealstage": "closedwon"}, "new": false},
    {"id": "19171005999", "properties": {"dealname": "Another Deal", "amount": "1500", "dealstage": "appointmentscheduled"}, "new": true}
  ],
  "startedAt": "2024-01-15T10:00:00.000Z",
  "completedAt": "2024-01-15T10:00:01.000Z"
}
```

</details>

#### Search & merge

<details>
<summary>Search deals</summary>

Searches deal records using filter groups, sorts, and property projections.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `PublicObjectSearchRequest` | Yes | Search request with `filterGroups`, `sorts`, `properties`, `limit`, and `after` cursor. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP headers. |

Returns: `CollectionResponseWithTotalSimplePublicObjectForwardPaging|error`

Sample code:

```ballerina
deals:PublicObjectSearchRequest searchRequest = {
    filterGroups: [
        {
            filters: [
                {propertyName: "dealstage", operator: "EQ", value: "closedwon"},
                {propertyName: "amount", operator: "GTE", value: "5000"}
            ]
        }
    ],
    properties: ["dealname", "amount", "dealstage", "closedate"],
    sorts: ["{\"propertyName\": \"amount\", \"direction\": \"DESCENDING\"}"],
    'limit: 10,
    after: 0
};
deals:CollectionResponseWithTotalSimplePublicObjectForwardPaging searchResults =
    check hubSpotDeals->/search.post(searchRequest);
```

Sample response:

```ballerina
{
  "total": 2,
  "results": [
    {"id": "201", "properties": {"dealname": "Enterprise Contract", "amount": "50000", "dealstage": "closedwon", "closedate": "2024-12-15T00:00:00.000Z"}},
    {"id": "202", "properties": {"dealname": "Mid-Market Deal", "amount": "12000", "dealstage": "closedwon", "closedate": "2024-11-30T00:00:00.000Z"}}
  ]
}
```

</details>

<details>
<summary>Merge two deals</summary>

Merges two deal records into one. The primary deal ID is retained; the secondary deal is archived.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `PublicMergeInput` | Yes | Merge input containing `primaryObjectId` (kept) and `objectIdToMerge` (archived). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP headers. |

Returns: `SimplePublicObject|error`

Sample code:

```ballerina
deals:PublicMergeInput mergePayload = {
    primaryObjectId: "19171005526",
    objectIdToMerge: "19171005999"
};
deals:SimplePublicObject mergedDeal = check hubSpotDeals->/merge.post(mergePayload);
```

Sample response:

```ballerina
{
  "id": "19171005526",
  "properties": {
    "dealname": "New Partnership Deal",
    "amount": "9000",
    "dealstage": "closedwon",
    "hs_lastmodifieddate": "2024-01-16T12:00:00.000Z"
  },
  "createdAt": "2024-01-15T08:00:00.000Z",
  "updatedAt": "2024-01-16T12:00:00.000Z",
  "archived": false
}
```

</details>
