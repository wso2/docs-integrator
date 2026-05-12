---
title: Actions
---

# Actions

The `ballerinax/hubspot.crm.obj.feedback` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Provides full access to HubSpot Feedback Submissions: list, read, search, create, update, upsert, and archive individual and batch records. |

---

## Client

Provides full access to HubSpot Feedback Submissions: list, read, search, create, update, upsert, and archive individual and batch records.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `http:BearerTokenConfig\|OAuth2RefreshTokenGrantConfig\|ApiKeysConfig` | Required | Authentication configuration. Use `OAuth2RefreshTokenGrantConfig` for OAuth 2.0, `http:BearerTokenConfig` for a bearer token, or `ApiKeysConfig` for private app tokens. |
| `httpVersion` | `http:HttpVersion` | `HTTP_2_0` | HTTP protocol version to use. |
| `timeout` | `decimal` | `30` | Request timeout in seconds. |
| `retryConfig` | `http:RetryConfig` | `()` | Retry configuration for failed requests. |
| `secureSocket` | `http:ClientSecureSocket` | `()` | SSL/TLS configuration. |
| `proxy` | `http:ProxyConfig` | `()` | Proxy server configuration. |
| `validation` | `boolean` | `true` | Enable constraint validation on request/response payloads. |

### Initializing the client

```ballerina
import ballerinax/hubspot.crm.obj.feedback as hsfeedback;

configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string refreshToken = ?;

hsfeedback:Client feedbackClient = check new ({
    auth: {
        clientId: clientId,
        clientSecret: clientSecret,
        refreshToken: refreshToken
    }
});
```

### Operations

#### Single object operations

<details>
<summary>List feedback submissions</summary>

Returns a paginated list of feedback submissions. Use query parameters to filter by archived status, select specific properties, and control page size.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `'limit` | `int` | No | Maximum number of results to return per page. Defaults to `10`. |
| `after` | `string` | No | Cursor token for the next page of results, obtained from a previous response's `paging.next.after`. |
| `properties` | `string[]` | No | Comma-separated list of property names to include in the response. |
| `propertiesWithHistory` | `string[]` | No | List of properties for which to include historical values. |
| `associations` | `string[]` | No | List of object types to retrieve associated IDs for. |
| `archived` | `boolean` | No | Whether to include archived submissions. Defaults to `false`. |

Returns: `CollectionResponseSimplePublicObjectWithAssociationsForwardPaging|error`

Sample code:

```ballerina
hsfeedback:CollectionResponseSimplePublicObjectWithAssociationsForwardPaging response =
    check feedbackClient->/.get('limit = 5, properties = ["hs_survey_channel", "hs_response_text"]);
```

Sample response:

```ballerina
{
  "results": [
    {
      "id": "392813793683",
      "properties": {
        "hs_createdate": "2024-01-15T10:30:00.000Z",
        "hs_lastmodifieddate": "2024-01-15T10:30:00.000Z",
        "hs_object_id": "392813793683",
        "hs_survey_channel": "EMAIL",
        "hs_response_text": "Great service, very responsive team!"
      },
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z",
      "archived": false
    }
  ],
  "paging": {
    "next": {
      "after": "392813793700",
      "link": "https://api.hubapi.com/crm/v3/objects/feedback_submissions?after=392813793700"
    }
  }
}
```

</details>

<details>
<summary>Read a feedback submission</summary>

Retrieves a single feedback submission by its HubSpot record ID or a unique property value.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `feedbackSubmissionId` | `string` | Yes | The unique identifier of the feedback submission. |
| `properties` | `string[]` | No | List of property names to include in the response. |
| `propertiesWithHistory` | `string[]` | No | List of properties for which to return historical values. |
| `associations` | `string[]` | No | List of associated object types to retrieve IDs for. |
| `idProperty` | `string` | No | The name of a unique property to use instead of the HubSpot internal ID. |
| `archived` | `boolean` | No | Whether to return archived submissions. Defaults to `false`. |

Returns: `SimplePublicObjectWithAssociations|error`

Sample code:

```ballerina
hsfeedback:SimplePublicObjectWithAssociations submission =
    check feedbackClient->/["392813793683"].get(
        properties = ["hs_survey_channel", "hs_response_text", "hs_survey_type"]
    );
```

Sample response:

```ballerina
{
  "id": "392813793683",
  "properties": {
    "hs_createdate": "2024-01-15T10:30:00.000Z",
    "hs_lastmodifieddate": "2024-01-15T10:30:00.000Z",
    "hs_object_id": "392813793683",
    "hs_survey_channel": "EMAIL",
    "hs_response_text": "Great service, very responsive team!",
    "hs_survey_type": "NPS"
  },
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z",
  "archived": false,
  "associations": {}
}
```

</details>

<details>
<summary>Create a feedback submission</summary>

Creates a new feedback submission record in HubSpot CRM.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `SimplePublicObjectInputForCreate` | Yes | The feedback submission properties and optional associations to create. |

Returns: `SimplePublicObject|error`

Sample code:

```ballerina
hsfeedback:SimplePublicObject created = check feedbackClient->/.post({
    properties: {
        "hs_survey_channel": "EMAIL",
        "hs_response_text": "Excellent support experience!",
        "hs_survey_type": "CES"
    },
    associations: []
});
```

Sample response:

```ballerina
{
  "id": "392813799001",
  "properties": {
    "hs_createdate": "2024-03-18T08:00:00.000Z",
    "hs_lastmodifieddate": "2024-03-18T08:00:00.000Z",
    "hs_object_id": "392813799001",
    "hs_survey_channel": "EMAIL",
    "hs_response_text": "Excellent support experience!",
    "hs_survey_type": "CES"
  },
  "createdAt": "2024-03-18T08:00:00.000Z",
  "updatedAt": "2024-03-18T08:00:00.000Z",
  "archived": false
}
```

</details>

<details>
<summary>Update a feedback submission</summary>

Performs a partial update on a feedback submission, modifying only the specified properties.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `feedbackSubmissionId` | `string` | Yes | The unique identifier of the feedback submission to update. |
| `payload` | `SimplePublicObjectInput` | Yes | An object containing the properties to update. |
| `idProperty` | `string` | No | The name of a unique property to use as the identifier instead of the HubSpot ID. |

Returns: `SimplePublicObject|error`

Sample code:

```ballerina
hsfeedback:SimplePublicObject updated = check feedbackClient->/["392813793683"].patch({
    properties: {
        "hs_response_text": "Updated: Outstanding support!"
    }
});
```

Sample response:

```ballerina
{
  "id": "392813793683",
  "properties": {
    "hs_createdate": "2024-01-15T10:30:00.000Z",
    "hs_lastmodifieddate": "2024-03-18T09:15:00.000Z",
    "hs_object_id": "392813793683",
    "hs_survey_channel": "EMAIL",
    "hs_response_text": "Updated: Outstanding support!"
  },
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-03-18T09:15:00.000Z",
  "archived": false
}
```

</details>

<details>
<summary>Archive a feedback submission</summary>

Archives (soft-deletes) a feedback submission by its ID. Archived submissions can be retrieved by setting `archived=true` in list or read requests.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `feedbackSubmissionId` | `string` | Yes | The unique identifier of the feedback submission to archive. |

Returns: `error?`

Sample code:

```ballerina
check feedbackClient->/["392813793683"].delete();
```

</details>

#### Batch operations

<details>
<summary>Read a batch of feedback submissions</summary>

Retrieves multiple feedback submissions by a list of internal IDs or unique property values in a single request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `BatchReadInputSimplePublicObjectId` | Yes | An object containing the list of IDs, the properties to return, and optional propertiesWithHistory. |
| `archived` | `boolean` | No | Whether to include archived submissions. Defaults to `false`. |

Returns: `BatchResponseSimplePublicObject|BatchResponseSimplePublicObjectWithErrors|error`

Sample code:

```ballerina
hsfeedback:BatchResponseSimplePublicObject|hsfeedback:BatchResponseSimplePublicObjectWithErrors batchResult =
    check feedbackClient->/batch/read.post({
        inputs: [
            {id: "392813793683"},
            {id: "392813793700"}
        ],
        properties: ["hs_survey_channel", "hs_response_text"],
        propertiesWithHistory: []
    });
```

Sample response:

```ballerina
{
  "status": "COMPLETE",
  "results": [
    {
      "id": "392813793683",
      "properties": {
        "hs_object_id": "392813793683",
        "hs_survey_channel": "EMAIL",
        "hs_response_text": "Great service, very responsive team!"
      },
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z",
      "archived": false
    },
    {
      "id": "392813793700",
      "properties": {
        "hs_object_id": "392813793700",
        "hs_survey_channel": "CHAT",
        "hs_response_text": "Quick resolution, very happy!"
      },
      "createdAt": "2024-01-16T14:00:00.000Z",
      "updatedAt": "2024-01-16T14:00:00.000Z",
      "archived": false
    }
  ],
  "startedAt": "2024-03-18T09:00:00.000Z",
  "completedAt": "2024-03-18T09:00:00.050Z"
}
```

</details>

<details>
<summary>Create a batch of feedback submissions</summary>

Creates multiple feedback submission records in a single API call.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `BatchInputSimplePublicObjectInputForCreate` | Yes | An object containing a list of feedback submission inputs, each with properties and optional associations. |

Returns: `BatchResponseSimplePublicObject|BatchResponseSimplePublicObjectWithErrors|error`

Sample code:

```ballerina
hsfeedback:BatchResponseSimplePublicObject|hsfeedback:BatchResponseSimplePublicObjectWithErrors batchCreated =
    check feedbackClient->/batch/create.post({
        inputs: [
            {
                properties: {
                    "hs_survey_channel": "EMAIL",
                    "hs_response_text": "Very helpful team."
                },
                associations: []
            },
            {
                properties: {
                    "hs_survey_channel": "CHAT",
                    "hs_response_text": "Fast and efficient support."
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
      "id": "392813800001",
      "properties": {
        "hs_createdate": "2024-03-18T10:00:00.000Z",
        "hs_survey_channel": "EMAIL",
        "hs_response_text": "Very helpful team."
      },
      "createdAt": "2024-03-18T10:00:00.000Z",
      "updatedAt": "2024-03-18T10:00:00.000Z",
      "archived": false
    },
    {
      "id": "392813800002",
      "properties": {
        "hs_createdate": "2024-03-18T10:00:00.000Z",
        "hs_survey_channel": "CHAT",
        "hs_response_text": "Fast and efficient support."
      },
      "createdAt": "2024-03-18T10:00:00.000Z",
      "updatedAt": "2024-03-18T10:00:00.000Z",
      "archived": false
    }
  ],
  "startedAt": "2024-03-18T10:00:00.000Z",
  "completedAt": "2024-03-18T10:00:00.080Z"
}
```

</details>

<details>
<summary>Update a batch of feedback submissions</summary>

Updates multiple feedback submission records by their IDs in a single API call.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `BatchInputSimplePublicObjectBatchInput` | Yes | An object containing a list of update inputs, each with an `id` and the properties to update. |

Returns: `BatchResponseSimplePublicObject|BatchResponseSimplePublicObjectWithErrors|error`

Sample code:

```ballerina
hsfeedback:BatchResponseSimplePublicObject|hsfeedback:BatchResponseSimplePublicObjectWithErrors batchUpdated =
    check feedbackClient->/batch/update.post({
        inputs: [
            {
                id: "392813793683",
                properties: {"hs_response_text": "Revised: Excellent experience."}
            },
            {
                id: "392813793700",
                properties: {"hs_response_text": "Revised: Very satisfied."}
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
      "id": "392813793683",
      "properties": {
        "hs_lastmodifieddate": "2024-03-18T11:00:00.000Z",
        "hs_response_text": "Revised: Excellent experience."
      },
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-03-18T11:00:00.000Z",
      "archived": false
    },
    {
      "id": "392813793700",
      "properties": {
        "hs_lastmodifieddate": "2024-03-18T11:00:00.000Z",
        "hs_response_text": "Revised: Very satisfied."
      },
      "createdAt": "2024-01-16T14:00:00.000Z",
      "updatedAt": "2024-03-18T11:00:00.000Z",
      "archived": false
    }
  ],
  "startedAt": "2024-03-18T11:00:00.000Z",
  "completedAt": "2024-03-18T11:00:00.060Z"
}
```

</details>

<details>
<summary>Upsert a batch of feedback submissions</summary>

Creates or updates multiple feedback submissions based on a unique property value. If a record with the given unique property exists, it is updated; otherwise a new record is created.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `BatchInputSimplePublicObjectBatchInputUpsert` | Yes | An object containing a list of upsert inputs, each with an `id`, `idProperty`, and properties. |

Returns: `BatchResponseSimplePublicUpsertObject|BatchResponseSimplePublicUpsertObjectWithErrors|error`

Sample code:

```ballerina
hsfeedback:BatchResponseSimplePublicUpsertObject|hsfeedback:BatchResponseSimplePublicUpsertObjectWithErrors upserted =
    check feedbackClient->/batch/upsert.post({
        inputs: [
            {
                id: "ext-feedback-001",
                idProperty: "hs_unique_id",
                properties: {
                    "hs_survey_channel": "EMAIL",
                    "hs_response_text": "Smooth onboarding process."
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
      "id": "392813801000",
      "properties": {
        "hs_createdate": "2024-03-18T12:00:00.000Z",
        "hs_survey_channel": "EMAIL",
        "hs_response_text": "Smooth onboarding process."
      },
      "createdAt": "2024-03-18T12:00:00.000Z",
      "updatedAt": "2024-03-18T12:00:00.000Z",
      "archived": false,
      "new": true
    }
  ],
  "startedAt": "2024-03-18T12:00:00.000Z",
  "completedAt": "2024-03-18T12:00:00.070Z"
}
```

</details>

<details>
<summary>Archive a batch of feedback submissions</summary>

Archives multiple feedback submissions by their IDs in a single request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `BatchInputSimplePublicObjectId` | Yes | An object containing a list of submission IDs to archive. |

Returns: `error?`

Sample code:

```ballerina
check feedbackClient->/batch/archive.post({
    inputs: [
        {id: "392813793683"},
        {id: "392813793700"}
    ]
});
```

</details>

#### Search

<details>
<summary>Search feedback submissions</summary>

Searches feedback submissions using filter groups, property conditions, sorting, and pagination. Returns submissions matching all specified criteria.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `PublicObjectSearchRequest` | Yes | The search request containing filter groups, sort options, pagination parameters, and property selection. |

Returns: `CollectionResponseWithTotalSimplePublicObjectForwardPaging|error`

Sample code:

```ballerina
hsfeedback:CollectionResponseWithTotalSimplePublicObjectForwardPaging searchResult =
    check feedbackClient->/search.post({
        filterGroups: [
            {
                filters: [
                    {
                        propertyName: "hs_survey_channel",
                        operator: "EQ",
                        value: "EMAIL"
                    }
                ]
            }
        ],
        properties: ["hs_survey_channel", "hs_response_text", "hs_createdate"],
        'limit: 10,
        after: "0"
    });
```

Sample response:

```ballerina
{
  "total": 42,
  "results": [
    {
      "id": "392813793683",
      "properties": {
        "hs_createdate": "2024-01-15T10:30:00.000Z",
        "hs_lastmodifieddate": "2024-01-15T10:30:00.000Z",
        "hs_object_id": "392813793683",
        "hs_survey_channel": "EMAIL",
        "hs_response_text": "Great service, very responsive team!"
      },
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z",
      "archived": false
    },
    {
      "id": "392813793720",
      "properties": {
        "hs_createdate": "2024-01-20T08:45:00.000Z",
        "hs_lastmodifieddate": "2024-01-20T08:45:00.000Z",
        "hs_object_id": "392813793720",
        "hs_survey_channel": "EMAIL",
        "hs_response_text": "The issue was resolved quickly."
      },
      "createdAt": "2024-01-20T08:45:00.000Z",
      "updatedAt": "2024-01-20T08:45:00.000Z",
      "archived": false
    }
  ],
  "paging": {
    "next": {
      "after": "10",
      "link": "https://api.hubapi.com/crm/v3/objects/feedback_submissions/search?after=10"
    }
  }
}
```

</details>
