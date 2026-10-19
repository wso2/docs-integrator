---
title: Actions
---

# Actions

The `ballerinax/azure.ai.search.index` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Perform search, document lookup, indexing, autocomplete, and suggestion operations on an Azure AI Search index. |

---

## Client

Perform search, document lookup, indexing, autocomplete, and suggestion operations on an Azure AI Search index.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `httpVersion` | `http:HttpVersion` | `HTTP_2_0` | HTTP protocol version. |
| `timeout` | `decimal` | `30` | Request timeout in seconds. |
| `retryConfig` | `http:RetryConfig` | `()` | Retry configuration for failed requests. |
| `secureSocket` | `http:ClientSecureSocket` | `()` | SSL/TLS configuration. |
| `proxy` | `http:ProxyConfig` | `()` | Proxy server configuration. |
| `compression` | `http:Compression` | `http:COMPRESSION_AUTO` | Compression setting for requests and responses. |
| `circuitBreaker` | `http:CircuitBreakerConfig` | `()` | Circuit breaker configuration for fault tolerance. |
| `cache` | `http:CacheConfig` | `{}` | HTTP cache configuration. |
| `validation` | `boolean` | `true` | Enable or disable payload validation. |

### Initializing the client

```ballerina
import ballerinax/azure.ai.search.index as index;

configurable string serviceUrl = ?;
configurable string indexName = ?;

index:Client azureSearchClient = check new (string `${serviceUrl}/indexes/${indexName}`);
```

### Operations

#### Search

<details>
<summary>documentsSearchGet</summary>

Searches for documents in the index using query parameters. Supports full-text search, filters, facets, highlighting, ordering, and scoring.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `DocumentsSearchGetHeaders` | No | Request headers including `api-key` for authentication and optional `x-ms-client-request-id`. |
| `queries` | `DocumentsSearchGetQueries` | Yes | Query parameters including `api-version` (required), `search`, `$filter`, `$select`, `$orderby`, `$top`, `$skip`, `$count`, `queryType`, `searchMode`, and more. |

Returns: `SearchDocumentsResult|error`

Sample code:

```ballerina
index:DocumentsSearchGetHeaders headers = {"api-key": apiKey};
index:SearchDocumentsResult result = check azureSearchClient->documentsSearchGet(headers,
    api\-version = "2025-09-01",
    search = "technology",
    \$count = true,
    \$select = ["content", "title"]
);
```

Sample response:

```ballerina
{
  "@odata.count": 3,
  "value": [
    {
      "@search.score": 1.5,
      "content": "Latest advances in technology...",
      "title": "Tech Overview"
    },
    {
      "@search.score": 1.2,
      "content": "Cloud technology solutions...",
      "title": "Cloud Computing"
    }
  ]
}
```

</details>

<details>
<summary>documentsSearchPost</summary>

Searches for documents using a POST request body. Supports all search features including vector search and semantic search.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `SearchRequest` | Yes | Search request body with fields such as `search`, `filter`, `queryType`, `select`, `top`, `skip`, `vectorQueries`, `semanticConfiguration`, etc. |
| `headers` | `DocumentsSearchPostHeaders` | No | Request headers including `api-key` for authentication. |
| `queries` | `DocumentsSearchPostQueries` | Yes | Query parameters including `api-version` (required). |

Returns: `SearchDocumentsResult|error`

Sample code:

```ballerina
index:DocumentsSearchPostHeaders headers = {"api-key": apiKey};
index:SearchDocumentsResult result = check azureSearchClient->documentsSearchPost(
    {
        search: "cloud computing",
        queryType: "semantic",
        semanticConfiguration: "my-semantic-config",
        count: true,
        top: 5,
        select: "title,content,category"
    },
    headers,
    api\-version = "2025-09-01"
);
```

Sample response:

```ballerina
{
  "@odata.count": 2,
  "value": [
    {
      "@search.score": 2.1,
      "@search.rerankerScore": 3.8,
      "title": "Cloud Computing Guide",
      "content": "Comprehensive guide to cloud computing...",
      "category": "Technology"
    }
  ]
}
```

</details>

#### Document retrieval

<details>
<summary>documentsGet</summary>

Retrieves a specific document from the index by its unique key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` | Yes | The unique key identifying the document to retrieve. |
| `headers` | `DocumentsGetHeaders` | No | Request headers including `api-key` for authentication. |
| `queries` | `DocumentsGetQueries` | Yes | Query parameters including `api-version` (required) and optional `$select` to limit returned fields. |

Returns: `LookupDocument|error`

Sample code:

```ballerina
index:DocumentsGetHeaders headers = {"api-key": apiKey};
index:LookupDocument doc = check azureSearchClient->documentsGet("doc-001", headers,
    api\-version = "2025-09-01"
);
```

Sample response:

```ballerina
{
  "id": "doc-001",
  "title": "Introduction to Azure AI Search",
  "content": "Azure AI Search is a cloud search service...",
  "category": "Documentation"
}
```

</details>

<details>
<summary>documentsCount</summary>

Returns the total number of documents in the search index.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `DocumentsCountHeaders` | No | Request headers including `api-key` for authentication. |
| `queries` | `DocumentsCountQueries` | Yes | Query parameters including `api-version` (required). |

Returns: `int|error`

Sample code:

```ballerina
index:DocumentsCountHeaders headers = {"api-key": apiKey};
int count = check azureSearchClient->documentsCount(headers,
    api\-version = "2025-09-01"
);
```

Sample response:

```ballerina
1542
```

</details>

#### Document indexing

<details>
<summary>documentsIndex</summary>

Uploads, merges, or deletes documents in a batch operation. Each action in the batch specifies the operation type.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `IndexBatch` | Yes | A batch of index actions. Each `IndexAction` includes `@search.action` (`upload`, `merge`, `mergeOrUpload`, or `delete`) and the document fields. |
| `headers` | `DocumentsIndexHeaders` | No | Request headers including `api-key` for authentication. |
| `queries` | `DocumentsIndexQueries` | Yes | Query parameters including `api-version` (required). |

Returns: `IndexDocumentsResult|error`

Sample code:

```ballerina
index:DocumentsIndexHeaders headers = {"api-key": apiKey};
index:IndexDocumentsResult result = check azureSearchClient->documentsIndex(
    {
        value: [
            {"@search.action": "upload", "id": "doc-100", "title": "New Document", "content": "Document content here..."},
            {"@search.action": "mergeOrUpload", "id": "doc-101", "title": "Updated Document", "content": "Updated content..."},
            {"@search.action": "delete", "id": "doc-050"}
        ]
    },
    headers,
    api\-version = "2025-09-01"
);
```

Sample response:

```ballerina
{
  "value": [
    {"key": "doc-100", "status": true, "statusCode": 201},
    {"key": "doc-101", "status": true, "statusCode": 200},
    {"key": "doc-050", "status": true, "statusCode": 200}
  ]
}
```

</details>

#### Suggestions

<details>
<summary>documentsSuggestGet</summary>

Retrieves search suggestions based on partial query input using query parameters. Requires a pre-configured suggester on the index.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `DocumentsSuggestGetHeaders` | No | Request headers including `api-key` for authentication. |
| `queries` | `DocumentsSuggestGetQueries` | Yes | Query parameters including `api-version` (required), `search` (required), `suggesterName` (required), and optional `$filter`, `$select`, `$orderby`, `$top`. |

Returns: `SuggestDocumentsResult|error`

Sample code:

```ballerina
index:DocumentsSuggestGetHeaders headers = {"api-key": apiKey};
index:SuggestDocumentsResult result = check azureSearchClient->documentsSuggestGet(headers,
    api\-version = "2025-09-01",
    search = "clou",
    suggesterName = "sg",
    \$select = ["title"],
    \$top = 5
);
```

Sample response:

```ballerina
{
  "value": [
    {"@search.text": "cloud computing", "title": "Cloud Computing Guide"},
    {"@search.text": "cloud storage", "title": "Cloud Storage Overview"}
  ]
}
```

</details>

<details>
<summary>documentsSuggestPost</summary>

Retrieves search suggestions using a POST request body. Requires a pre-configured suggester on the index.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `SuggestRequest` | Yes | Suggest request body with `search` (required), `suggesterName` (required), and optional `filter`, `select`, `orderby`, `top`, `fuzzy`, etc. |
| `headers` | `DocumentsSuggestPostHeaders` | No | Request headers including `api-key` for authentication. |
| `queries` | `DocumentsSuggestPostQueries` | Yes | Query parameters including `api-version` (required). |

Returns: `SuggestDocumentsResult|error`

Sample code:

```ballerina
index:DocumentsSuggestPostHeaders headers = {"api-key": apiKey};
index:SuggestDocumentsResult result = check azureSearchClient->documentsSuggestPost(
    {
        search: "clou",
        suggesterName: "sg",
        fuzzy: true,
        top: 5,
        select: "title,category"
    },
    headers,
    api\-version = "2025-09-01"
);
```

Sample response:

```ballerina
{
  "value": [
    {"@search.text": "cloud computing", "title": "Cloud Computing Guide", "category": "Technology"},
    {"@search.text": "cloud architecture", "title": "Cloud Architecture Patterns", "category": "Architecture"}
  ]
}
```

</details>

#### Autocomplete

<details>
<summary>documentsAutocompleteGet</summary>

Completes partial query terms using query parameters. Requires a pre-configured suggester on the index.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `DocumentsAutocompleteGetHeaders` | No | Request headers including `api-key` for authentication. |
| `queries` | `DocumentsAutocompleteGetQueries` | Yes | Query parameters including `api-version` (required), `search` (required), `suggesterName` (required), and optional `autocompleteMode`, `$filter`, `fuzzy`, `$top`. |

Returns: `AutocompleteResult|error`

Sample code:

```ballerina
index:DocumentsAutocompleteGetHeaders headers = {"api-key": apiKey};
index:AutocompleteResult result = check azureSearchClient->documentsAutocompleteGet(headers,
    api\-version = "2025-09-01",
    search = "tech",
    suggesterName = "sg",
    autocompleteMode = "twoTerms"
);
```

Sample response:

```ballerina
{
  "value": [
    {"text": "technology", "queryPlusText": "technology"},
    {"text": "technical documentation", "queryPlusText": "technical documentation"}
  ]
}
```

</details>

<details>
<summary>documentsAutocompletePost</summary>

Completes partial query terms using a POST request body. Requires a pre-configured suggester on the index.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `AutocompleteRequest` | Yes | Autocomplete request body with `search` (required), `suggesterName` (required), and optional `autocompleteMode`, `filter`, `fuzzy`, `top`. |
| `headers` | `DocumentsAutocompletePostHeaders` | No | Request headers including `api-key` for authentication. |
| `queries` | `DocumentsAutocompletePostQueries` | Yes | Query parameters including `api-version` (required). |

Returns: `AutocompleteResult|error`

Sample code:

```ballerina
index:DocumentsAutocompletePostHeaders headers = {"api-key": apiKey};
index:AutocompleteResult result = check azureSearchClient->documentsAutocompletePost(
    {
        search: "tech",
        suggesterName: "sg",
        autocompleteMode: "oneTermWithContext",
        fuzzy: true
    },
    headers,
    api\-version = "2025-09-01"
);
```

Sample response:

```ballerina
{
  "value": [
    {"text": "technology trends", "queryPlusText": "technology trends"},
    {"text": "technical overview", "queryPlusText": "technical overview"}
  ]
}
```

</details>
