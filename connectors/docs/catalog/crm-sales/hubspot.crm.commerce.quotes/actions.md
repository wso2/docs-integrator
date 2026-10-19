---
title: Actions
---

# Actions

The `ballerinax/hubspot.crm.commerce.quotes` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Manage HubSpot CRM quote objects: CRUD, batch operations, and search. |

---

## Client

Manage HubSpot CRM quote objects: CRUD, batch operations, and search.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | <code>http:BearerTokenConfig&#124;OAuth2RefreshTokenGrantConfig&#124;ApiKeysConfig</code> | Required | Authentication configuration: OAuth 2.0 refresh token, bearer token, or API keys. |
| `httpVersion` | <code>http:HttpVersion</code> | `http:HTTP_2_0` | HTTP protocol version. |
| `timeout` | <code>decimal</code> | `30` | Maximum time to wait for a response in seconds. |
| `retryConfig` | <code>http:RetryConfig</code> | `()` | Retry configuration for failed requests. |
| `secureSocket` | <code>http:ClientSecureSocket</code> | `()` | SSL/TLS configuration. |
| `proxy` | <code>http:ProxyConfig</code> | `()` | Proxy server configuration. |
| `compression` | <code>http:Compression</code> | `http:COMPRESSION_AUTO` | Compression handling configuration. |
| `circuitBreaker` | <code>http:CircuitBreakerConfig</code> | `()` | Circuit breaker configuration for fault tolerance. |
| `validation` | <code>boolean</code> | `true` | Enable inbound payload validation. |

### Initializing the client

```ballerina
import ballerinax/hubspot.crm.commerce.quotes as quotes;

configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string refreshToken = ?;

quotes:Client quotesClient = check new ({
    auth: {
        clientId: clientId,
        clientSecret: clientSecret,
        refreshToken: refreshToken,
        credentialBearer: oauth2:POST_BODY_BEARER
    }
});
```

### Operations

#### Quote CRUD

<details>
<summary>List</summary>

Signature: `get /`

Retrieves a paginated list of quotes with optional property selection and association expansion.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |
| `queries` | <code>GetCrmV3ObjectsQuotesGetPageQueries</code> | No | Query parameters including `limit`, `after`, `properties`, `associations`, and `archived`. |

Returns: `CollectionResponseSimplePublicObjectWithAssociationsForwardPaging|error`

Sample code:

```ballerina
CollectionResponseSimplePublicObjectWithAssociationsForwardPaging response =
    check quotesClient->/.get();
```

Sample response:

```ballerina
{
  "results": [
    {
      "id": "12345678901",
      "properties": {
        "hs_title": "Annual SEO Package",
        "hs_expiration_date": "2026-12-31",
        "hs_currency": "USD",
        "hs_createdate": "2026-01-15T10:30:00.000Z",
        "hs_lastmodifieddate": "2026-01-15T10:30:00.000Z"
      },
      "createdAt": "2026-01-15T10:30:00.000Z",
      "updatedAt": "2026-01-15T10:30:00.000Z",
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

<details>
<summary>Create</summary>

Signature: `post /`

Creates a new quote with specified properties and optional associations to other CRM objects.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>SimplePublicObjectInputForCreate</code> | Yes | Quote properties and associations. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |

Returns: `SimplePublicObject|error`

Sample code:

```ballerina
SimplePublicObject response = check quotesClient->/.post({
    properties: {
        "hs_title": "Annual SEO Audit Package",
        "hs_expiration_date": "2026-12-31",
        "hs_currency": "USD"
    },
    associations: []
});
```

Sample response:

```ballerina
{
  "id": "12345678901",
  "properties": {
    "hs_title": "Annual SEO Audit Package",
    "hs_expiration_date": "2026-12-31",
    "hs_currency": "USD",
    "hs_createdate": "2026-03-18T08:00:00.000Z",
    "hs_lastmodifieddate": "2026-03-18T08:00:00.000Z"
  },
  "createdAt": "2026-03-18T08:00:00.000Z",
  "updatedAt": "2026-03-18T08:00:00.000Z",
  "archived": false
}
```

</details>

<details>
<summary>Read</summary>

Signature: `get /[string quoteId]`

Retrieves a single quote by its ID with optional property selection and association expansion.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `quoteId` | <code>string</code> | Yes | The ID of the quote to retrieve. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |
| `queries` | <code>GetCrmV3ObjectsQuotesQuoteIdGetByIdQueries</code> | No | Query parameters including `properties`, `associations`, and `archived`. |

Returns: `SimplePublicObjectWithAssociations|error`

Sample code:

```ballerina
SimplePublicObjectWithAssociations response =
    check quotesClient->/[quoteId].get();
```

Sample response:

```ballerina
{
  "id": "12345678901",
  "properties": {
    "hs_title": "Annual SEO Audit Package",
    "hs_expiration_date": "2026-12-31",
    "hs_currency": "USD",
    "hs_createdate": "2026-03-18T08:00:00.000Z",
    "hs_lastmodifieddate": "2026-03-18T08:00:00.000Z"
  },
  "createdAt": "2026-03-18T08:00:00.000Z",
  "updatedAt": "2026-03-18T08:00:00.000Z",
  "archived": false
}
```

</details>

<details>
<summary>Update</summary>

Signature: `patch /[string quoteId]`

Updates an existing quote's properties by its ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `quoteId` | <code>string</code> | Yes | The ID of the quote to update. |
| `payload` | <code>SimplePublicObjectInput</code> | Yes | Quote properties to update. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |
| `queries` | <code>PatchCrmV3ObjectsQuotesQuoteIdUpdateQueries</code> | No | Query parameters including `idProperty`. |

Returns: `SimplePublicObject|error`

Sample code:

```ballerina
SimplePublicObject response = check quotesClient->/[quoteId].patch({
    properties: {
        "hs_title": "Updated SEO Audit Package",
        "hs_expiration_date": "2027-06-30"
    }
});
```

Sample response:

```ballerina
{
  "id": "12345678901",
  "properties": {
    "hs_title": "Updated SEO Audit Package",
    "hs_expiration_date": "2027-06-30",
    "hs_currency": "USD",
    "hs_createdate": "2026-03-18T08:00:00.000Z",
    "hs_lastmodifieddate": "2026-03-18T09:15:00.000Z"
  },
  "createdAt": "2026-03-18T08:00:00.000Z",
  "updatedAt": "2026-03-18T09:15:00.000Z",
  "archived": false
}
```

</details>

<details>
<summary>Archive</summary>

Signature: `delete /[string quoteId]`

Archives (soft-deletes) a quote by its ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `quoteId` | <code>string</code> | Yes | The ID of the quote to archive. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |

Returns: `error?`

Sample code:

```ballerina
check quotesClient->/[quoteId].delete();
```

</details>

#### Batch operations

<details>
<summary>Read a batch of quotes by internal ID, or unique property values</summary>

Signature: `post /batch/read`

Reads multiple quotes by their IDs or unique property values in a single request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BatchReadInputSimplePublicObjectId</code> | Yes | Batch read input with quote IDs, properties to return, and optional ID property. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |
| `queries` | <code>PostCrmV3ObjectsQuotesBatchReadReadQueries</code> | No | Query parameters including `archived`. |

Returns: `BatchResponseSimplePublicObject|BatchResponseSimplePublicObjectWithErrors|error`

Sample code:

```ballerina
BatchResponseSimplePublicObject|BatchResponseSimplePublicObjectWithErrors response =
    check quotesClient->/batch/read.post({
        inputs: [
            {id: quoteId1},
            {id: quoteId2}
        ],
        properties: ["hs_title", "hs_expiration_date", "hs_currency"],
        propertiesWithHistory: []
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
        "hs_title": "Annual SEO Audit Package",
        "hs_expiration_date": "2026-12-31",
        "hs_currency": "USD"
      },
      "createdAt": "2026-03-18T08:00:00.000Z",
      "updatedAt": "2026-03-18T08:00:00.000Z",
      "archived": false
    },
    {
      "id": "12345678902",
      "properties": {
        "hs_title": "Quarterly Content Package",
        "hs_expiration_date": "2026-06-30",
        "hs_currency": "USD"
      },
      "createdAt": "2026-03-18T08:00:00.000Z",
      "updatedAt": "2026-03-18T08:00:00.000Z",
      "archived": false
    }
  ],
  "startedAt": "2026-03-18T08:00:00.000Z",
  "completedAt": "2026-03-18T08:00:00.100Z"
}
```

</details>

<details>
<summary>Create a batch of quotes</summary>

Signature: `post /batch/create`

Creates multiple quotes in a single request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BatchInputSimplePublicObjectInputForCreate</code> | Yes | Batch input containing an array of quote creation payloads. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |

Returns: `BatchResponseSimplePublicObject|BatchResponseSimplePublicObjectWithErrors|error`

Sample code:

```ballerina
BatchResponseSimplePublicObject|BatchResponseSimplePublicObjectWithErrors response =
    check quotesClient->/batch/create.post({
        inputs: [
            {
                properties: {
                    "hs_title": "Q1 Marketing Package",
                    "hs_expiration_date": "2026-06-30",
                    "hs_currency": "USD"
                },
                associations: []
            },
            {
                properties: {
                    "hs_title": "Q2 Consulting Package",
                    "hs_expiration_date": "2026-09-30",
                    "hs_currency": "USD"
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
      "id": "12345678903",
      "properties": {
        "hs_title": "Q1 Marketing Package",
        "hs_expiration_date": "2026-06-30",
        "hs_currency": "USD"
      },
      "createdAt": "2026-03-18T08:00:00.000Z",
      "updatedAt": "2026-03-18T08:00:00.000Z",
      "archived": false
    },
    {
      "id": "12345678904",
      "properties": {
        "hs_title": "Q2 Consulting Package",
        "hs_expiration_date": "2026-09-30",
        "hs_currency": "USD"
      },
      "createdAt": "2026-03-18T08:00:00.000Z",
      "updatedAt": "2026-03-18T08:00:00.000Z",
      "archived": false
    }
  ],
  "startedAt": "2026-03-18T08:00:00.000Z",
  "completedAt": "2026-03-18T08:00:00.100Z"
}
```

</details>

<details>
<summary>Update a batch of quotes by internal ID, or unique property values</summary>

Signature: `post /batch/update`

Updates multiple quotes' properties in a single request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BatchInputSimplePublicObjectBatchInput</code> | Yes | Batch input containing an array of quote update payloads with IDs. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |

Returns: `BatchResponseSimplePublicObject|BatchResponseSimplePublicObjectWithErrors|error`

Sample code:

```ballerina
BatchResponseSimplePublicObject|BatchResponseSimplePublicObjectWithErrors response =
    check quotesClient->/batch/update.post({
        inputs: [
            {
                id: quoteId1,
                properties: {
                    "hs_title": "Updated Q1 Marketing Package"
                }
            },
            {
                id: quoteId2,
                properties: {
                    "hs_title": "Updated Q2 Consulting Package"
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
        "hs_title": "Updated Q1 Marketing Package",
        "hs_expiration_date": "2026-06-30",
        "hs_currency": "USD"
      },
      "createdAt": "2026-03-18T08:00:00.000Z",
      "updatedAt": "2026-03-18T09:30:00.000Z",
      "archived": false
    },
    {
      "id": "12345678904",
      "properties": {
        "hs_title": "Updated Q2 Consulting Package",
        "hs_expiration_date": "2026-09-30",
        "hs_currency": "USD"
      },
      "createdAt": "2026-03-18T08:00:00.000Z",
      "updatedAt": "2026-03-18T09:30:00.000Z",
      "archived": false
    }
  ],
  "startedAt": "2026-03-18T09:30:00.000Z",
  "completedAt": "2026-03-18T09:30:00.100Z"
}
```

</details>

<details>
<summary>Create or update a batch of quotes by unique property values</summary>

Signature: `post /batch/upsert`

Creates or updates multiple quotes in a single request based on unique property values.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BatchInputSimplePublicObjectBatchInputUpsert</code> | Yes | Batch input containing an array of quote upsert payloads. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |

Returns: `BatchResponseSimplePublicUpsertObject|BatchResponseSimplePublicUpsertObjectWithErrors|error`

Sample code:

```ballerina
BatchResponseSimplePublicUpsertObject|BatchResponseSimplePublicUpsertObjectWithErrors response =
    check quotesClient->/batch/upsert.post({
        inputs: [
            {
                id: "unique-quote-ref-001",
                idProperty: "hs_unique_id",
                properties: {
                    "hs_title": "Upserted SEO Package",
                    "hs_expiration_date": "2026-12-31",
                    "hs_currency": "USD"
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
      "id": "12345678905",
      "properties": {
        "hs_title": "Upserted SEO Package",
        "hs_expiration_date": "2026-12-31",
        "hs_currency": "USD"
      },
      "createdAt": "2026-03-18T10:00:00.000Z",
      "updatedAt": "2026-03-18T10:00:00.000Z",
      "archived": false,
      "new": true
    }
  ],
  "startedAt": "2026-03-18T10:00:00.000Z",
  "completedAt": "2026-03-18T10:00:00.100Z"
}
```

</details>

<details>
<summary>Archive a batch of quotes by ID</summary>

Signature: `post /batch/archive`

Archives multiple quotes in a single request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BatchInputSimplePublicObjectId</code> | Yes | Batch input containing an array of quote IDs to archive. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |

Returns: `error?`

Sample code:

```ballerina
check quotesClient->/batch/archive.post({
    inputs: [
        {id: quoteId1},
        {id: quoteId2}
    ]
});
```

</details>

#### Search

<details>
<summary>Search</summary>

Signature: `post /search`

Searches for quotes using filters, query strings, sorting, and property selection.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>PublicObjectSearchRequest</code> | Yes | Search request with optional query, filters, sorts, properties, limit, and pagination. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |

Returns: `CollectionResponseWithTotalSimplePublicObjectForwardPaging|error`

Sample code:

```ballerina
CollectionResponseWithTotalSimplePublicObjectForwardPaging response =
    check quotesClient->/search.post({
        filterGroups: [
            {
                filters: [
                    {
                        propertyName: "hs_currency",
                        operator: "EQ",
                        value: "USD"
                    }
                ]
            }
        ],
        properties: ["hs_title", "hs_expiration_date", "hs_currency"],
        limit: 10
    });
```

Sample response:

```ballerina
{
  "total": 2,
  "results": [
    {
      "id": "12345678901",
      "properties": {
        "hs_title": "Annual SEO Audit Package",
        "hs_expiration_date": "2026-12-31",
        "hs_currency": "USD"
      },
      "createdAt": "2026-03-18T08:00:00.000Z",
      "updatedAt": "2026-03-18T08:00:00.000Z",
      "archived": false
    },
    {
      "id": "12345678903",
      "properties": {
        "hs_title": "Q1 Marketing Package",
        "hs_expiration_date": "2026-06-30",
        "hs_currency": "USD"
      },
      "createdAt": "2026-03-18T08:00:00.000Z",
      "updatedAt": "2026-03-18T08:00:00.000Z",
      "archived": false
    }
  ],
  "paging": {
    "next": {
      "after": "12345678904"
    }
  }
}
```

</details>
