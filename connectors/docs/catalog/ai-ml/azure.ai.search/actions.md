---
title: Actions
---

# Actions

The `ballerinax/azure.ai.search` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Manages search indexes, indexers, data sources, skillsets, and synonym maps; retrieves service statistics. |

---

## Client

Manages search indexes, indexers, data sources, skillsets, and synonym maps; retrieves service statistics.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `httpVersion` | `http:HttpVersion` | `HTTP_2_0` | HTTP protocol version to use for requests. |
| `timeout` | `decimal` | `30` | HTTP request timeout in seconds. |
| `retryConfig` | `http:RetryConfig` | `()` | Retry configuration for failed requests. |
| `secureSocket` | `http:ClientSecureSocket` | `()` | SSL/TLS configuration. |
| `proxy` | `http:ProxyConfig` | `()` | Proxy server configuration. |
| `validation` | `boolean` | `true` | Enable or disable constraint validation on response payloads. |
| `laxDataBinding` | `boolean` | `true` | Enable lax data binding to ignore unknown fields in responses. |

### Initializing the client

```ballerina
import ballerinax/azure.ai.search as azureSearch;

configurable string serviceUrl = ?;
configurable string adminKey = ?;

azureSearch:Client searchClient = check new (serviceUrl);
```

### Operations

#### Index management

<details>
<summary>indexesCreate</summary>

Creates a new search index with the specified field definitions and configuration.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `SearchIndex` | Yes | The index definition including name, fields, analyzers, and optional vector search or semantic settings. |
| `headers` | `IndexesCreateHeaders` | No | Request headers. Pass `api-key` with the admin API key for authentication. |
| `apiVersion` | `string` | Yes | Azure AI Search REST API version (e.g., `"2025-09-01"`). |

Returns: `SearchIndex|error`

Sample code:

```ballerina
azureSearch:SearchIndex index = check searchClient->indexesCreate(
    {
        name: "hotels",
        fields: [
            {name: "HotelId", 'type: "Edm.String", key: true, filterable: true},
            {name: "HotelName", 'type: "Edm.String", searchable: true, retrievable: true},
            {name: "Rating", 'type: "Edm.Int32", filterable: true, sortable: true, facetable: true}
        ]
    },
    headers = {"api-key": adminKey},
    apiVersion = "2025-09-01"
);
```

Sample response:

```ballerina
{
  "name": "hotels",
  "@odata.etag": "\"0x8DCABC123456\"",
  "fields": [
    {"name": "HotelId", "type": "Edm.String", "key": true, "searchable": false, "filterable": true, "retrievable": true},
    {"name": "HotelName", "type": "Edm.String", "key": false, "searchable": true, "filterable": false, "retrievable": true},
    {"name": "Rating", "type": "Edm.Int32", "key": false, "searchable": false, "filterable": true, "sortable": true, "facetable": true}
  ],
  "corsOptions": null,
  "scoringProfiles": []
}
```

</details>

<details>
<summary>indexesCreateOrUpdate</summary>

Creates a new search index or updates an existing one if it already exists.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `indexName` | `string` | Yes | The name of the index to create or update. |
| `headers` | `IndexesCreateOrUpdateHeaders` | Yes | Request headers. Must include `Prefer: "return=representation"` and `api-key`. |
| `payload` | `SearchIndex` | Yes | The full index definition. |
| `apiVersion` | `string` | Yes | Azure AI Search REST API version. |

Returns: `SearchIndex|error`

Sample code:

```ballerina
azureSearch:IndexesCreateOrUpdateHeaders upsertHeaders = {
    Prefer: "return=representation",
    "api-key": adminKey
};
azureSearch:SearchIndex index = check searchClient->indexesCreateOrUpdate(
    "my-index",
    upsertHeaders,
    {
        name: "my-index",
        fields: [
            {name: "id", 'type: "Edm.String", key: true},
            {name: "content", 'type: "Edm.String", searchable: true},
            {name: "language", 'type: "Edm.String", filterable: true, facetable: true},
            {name: "lastModified", 'type: "Edm.DateTimeOffset", filterable: true, sortable: true}
        ]
    },
    apiVersion = "2025-09-01"
);
```

Sample response:

```ballerina
{
  "name": "my-index",
  "@odata.etag": "\"0x8DCABC789012\"",
  "fields": [
    {"name": "id", "type": "Edm.String", "key": true},
    {"name": "content", "type": "Edm.String", "searchable": true},
    {"name": "language", "type": "Edm.String", "filterable": true, "facetable": true},
    {"name": "lastModified", "type": "Edm.DateTimeOffset", "filterable": true, "sortable": true}
  ]
}
```

</details>

<details>
<summary>indexesGet</summary>

Retrieves the definition of a search index by name.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `indexName` | `string` | Yes | The name of the index to retrieve. |
| `headers` | `IndexesGetHeaders` | No | Request headers. Pass `api-key` for authentication. |
| `apiVersion` | `string` | Yes | Azure AI Search REST API version. |

Returns: `SearchIndex|error`

Sample code:

```ballerina
azureSearch:SearchIndex index = check searchClient->indexesGet(
    "my-index",
    headers = {"api-key": adminKey},
    apiVersion = "2025-09-01"
);
```

Sample response:

```ballerina
{
  "name": "my-index",
  "@odata.etag": "\"0x8DCABC789012\"",
  "fields": [
    {"name": "id", "type": "Edm.String", "key": true},
    {"name": "content", "type": "Edm.String", "searchable": true}
  ]
}
```

</details>

<details>
<summary>indexesList</summary>

Lists all search indexes defined in the service.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `IndexesListHeaders` | No | Request headers. Pass `api-key` for authentication. |
| `apiVersion` | `string` | Yes | Azure AI Search REST API version. |
| `$select` | `string` | No | Comma-separated list of fields to include in the response (e.g., `"name,etag"`). |

Returns: `ListIndexesResult|error`

Sample code:

```ballerina
azureSearch:ListIndexesResult result = check searchClient->indexesList(
    headers = {"api-key": adminKey},
    apiVersion = "2025-09-01"
);
```

Sample response:

```ballerina
{
  "value": [
    {"name": "hotels", "@odata.etag": "\"0x8DCABC111\""},
    {"name": "my-index", "@odata.etag": "\"0x8DCABC222\""}
  ]
}
```

</details>

<details>
<summary>indexesGetStatistics</summary>

Returns document count and storage usage statistics for a specific index.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `indexName` | `string` | Yes | The name of the index. |
| `headers` | `IndexesGetStatisticsHeaders` | No | Request headers. Pass `api-key` for authentication. |
| `apiVersion` | `string` | Yes | Azure AI Search REST API version. |

Returns: `GetIndexStatisticsResult|error`

Sample code:

```ballerina
azureSearch:GetIndexStatisticsResult stats = check searchClient->indexesGetStatistics(
    "my-index",
    headers = {"api-key": adminKey},
    apiVersion = "2025-09-01"
);
```

Sample response:

```ballerina
{
  "documentCount": 1500,
  "storageSize": 2048000,
  "vectorIndexSize": 512000
}
```

</details>

<details>
<summary>indexesAnalyze</summary>

Shows how an analyzer or tokenizer breaks a text string into tokens, useful for debugging analyzer configuration.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `indexName` | `string` | Yes | The name of the index containing the analyzer to test. |
| `payload` | `AnalyzeRequest` | Yes | The analyze request specifying the text and the analyzer (or custom tokenizer and token filters). |
| `headers` | `IndexesAnalyzeHeaders` | No | Request headers. Pass `api-key` for authentication. |
| `apiVersion` | `string` | Yes | Azure AI Search REST API version. |

Returns: `AnalyzeResult|error`

Sample code:

```ballerina
azureSearch:AnalyzeResult result = check searchClient->indexesAnalyze(
    "my-index",
    {text: "Azure AI Search connector", analyzer: "en.microsoft"},
    headers = {"api-key": adminKey},
    apiVersion = "2025-09-01"
);
```

Sample response:

```ballerina
{
  "tokens": [
    {"token": "azure", "startOffset": 0, "endOffset": 5, "position": 0},
    {"token": "ai", "startOffset": 6, "endOffset": 8, "position": 1},
    {"token": "search", "startOffset": 9, "endOffset": 15, "position": 2},
    {"token": "connector", "startOffset": 16, "endOffset": 25, "position": 3}
  ]
}
```

</details>

<details>
<summary>indexesDelete</summary>

Deletes a search index and all documents it contains.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `indexName` | `string` | Yes | The name of the index to delete. |
| `headers` | `IndexesDeleteHeaders` | No | Request headers. Pass `api-key` for authentication. Optional `If-Match` for optimistic concurrency control. |
| `apiVersion` | `string` | Yes | Azure AI Search REST API version. |

Returns: `error?`

Sample code:

```ballerina
check searchClient->indexesDelete(
    "my-index",
    headers = {"api-key": adminKey},
    apiVersion = "2025-09-01"
);
```

</details>

#### Indexer management

<details>
<summary>indexersCreate</summary>

Creates a new indexer that crawls a data source and populates a search index on a schedule.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `SearchIndexer` | Yes | The indexer definition including name, data source name, target index name, and optional schedule. |
| `headers` | `IndexersCreateHeaders` | No | Request headers. Pass `api-key` for authentication. |
| `apiVersion` | `string` | Yes | Azure AI Search REST API version. |

Returns: `SearchIndexer|error`

Sample code:

```ballerina
azureSearch:SearchIndexer indexer = check searchClient->indexersCreate(
    {
        name: "blob-indexer",
        dataSourceName: "my-blob-datasource",
        targetIndexName: "my-index",
        schedule: {interval: "PT2H"}
    },
    headers = {"api-key": adminKey},
    apiVersion = "2025-09-01"
);
```

Sample response:

```ballerina
{
  "name": "blob-indexer",
  "dataSourceName": "my-blob-datasource",
  "targetIndexName": "my-index",
  "schedule": {"interval": "PT2H"},
  "disabled": false,
  "@odata.etag": "\"0x8DCABC101010\""
}
```

</details>

<details>
<summary>indexersCreateOrUpdate</summary>

Creates or updates an indexer, including its schedule, skillset linkage, field mappings, and execution parameters.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `indexerName` | `string` | Yes | The name of the indexer to create or update. |
| `headers` | `IndexersCreateOrUpdateHeaders` | Yes | Request headers. Must include `Prefer: "return=representation"` and `api-key`. |
| `payload` | `SearchIndexer` | Yes | The full indexer definition. |
| `apiVersion` | `string` | Yes | Azure AI Search REST API version. |

Returns: `SearchIndexer|error`

Sample code:

```ballerina
azureSearch:IndexersCreateOrUpdateHeaders upsertHeaders = {
    Prefer: "return=representation",
    "api-key": adminKey
};
azureSearch:SearchIndexer indexer = check searchClient->indexersCreateOrUpdate(
    "blob-indexer",
    upsertHeaders,
    {
        name: "blob-indexer",
        dataSourceName: "my-blob-datasource",
        targetIndexName: "my-index",
        skillsetName: "my-skillset",
        schedule: {interval: "PT1H"},
        parameters: {
            maxFailedItems: 10,
            maxFailedItemsPerBatch: 5,
            configuration: {
                excludedFileNameExtensions: ".png,.jpg"
            }
        },
        outputFieldMappings: [
            {sourceFieldName: "/document/language", targetFieldName: "language"},
            {sourceFieldName: "/document/keyphrases", targetFieldName: "keyphrases"}
        ]
    },
    apiVersion = "2025-09-01"
);
```

Sample response:

```ballerina
{
  "name": "blob-indexer",
  "dataSourceName": "my-blob-datasource",
  "targetIndexName": "my-index",
  "skillsetName": "my-skillset",
  "schedule": {"interval": "PT1H"},
  "disabled": false,
  "@odata.etag": "\"0x8DCABC202020\""
}
```

</details>

<details>
<summary>indexersGet</summary>

Retrieves an indexer definition by name.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `indexerName` | `string` | Yes | The name of the indexer to retrieve. |
| `headers` | `IndexersGetHeaders` | No | Request headers. Pass `api-key` for authentication. |
| `apiVersion` | `string` | Yes | Azure AI Search REST API version. |

Returns: `SearchIndexer|error`

Sample code:

```ballerina
azureSearch:SearchIndexer indexer = check searchClient->indexersGet(
    "blob-indexer",
    headers = {"api-key": adminKey},
    apiVersion = "2025-09-01"
);
```

Sample response:

```ballerina
{
  "name": "blob-indexer",
  "dataSourceName": "my-blob-datasource",
  "targetIndexName": "my-index",
  "schedule": {"interval": "PT2H"},
  "disabled": false
}
```

</details>

<details>
<summary>indexersList</summary>

Lists all indexers defined in the search service.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `IndexersListHeaders` | No | Request headers. Pass `api-key` for authentication. |
| `apiVersion` | `string` | Yes | Azure AI Search REST API version. |

Returns: `ListIndexersResult|error`

Sample code:

```ballerina
azureSearch:ListIndexersResult result = check searchClient->indexersList(
    headers = {"api-key": adminKey},
    apiVersion = "2025-09-01"
);
```

Sample response:

```ballerina
{
  "value": [
    {"name": "blob-indexer", "dataSourceName": "my-blob-datasource", "targetIndexName": "my-index"},
    {"name": "sql-indexer", "dataSourceName": "my-sql-datasource", "targetIndexName": "orders-index"}
  ]
}
```

</details>

<details>
<summary>indexersRun</summary>

Triggers an indexer to run immediately, outside of its scheduled interval.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `indexerName` | `string` | Yes | The name of the indexer to run. |
| `headers` | `IndexersRunHeaders` | No | Request headers. Pass `api-key` for authentication. |
| `apiVersion` | `string` | Yes | Azure AI Search REST API version. |

Returns: `error?`

Sample code:

```ballerina
check searchClient->indexersRun(
    "blob-indexer",
    headers = {"api-key": adminKey},
    apiVersion = "2025-09-01"
);
```

</details>

<details>
<summary>indexersReset</summary>

Resets the change tracking state of an indexer, causing it to fully re-index all source documents on the next run.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `indexerName` | `string` | Yes | The name of the indexer to reset. |
| `headers` | `IndexersResetHeaders` | No | Request headers. Pass `api-key` for authentication. |
| `apiVersion` | `string` | Yes | Azure AI Search REST API version. |

Returns: `error?`

Sample code:

```ballerina
check searchClient->indexersReset(
    "blob-indexer",
    headers = {"api-key": adminKey},
    apiVersion = "2025-09-01"
);
```

</details>

<details>
<summary>indexersGetStatus</summary>

Returns the current status, last execution result, and execution history of an indexer.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `indexerName` | `string` | Yes | The name of the indexer. |
| `headers` | `IndexersGetStatusHeaders` | No | Request headers. Pass `api-key` for authentication. |
| `apiVersion` | `string` | Yes | Azure AI Search REST API version. |

Returns: `SearchIndexerStatus|error`

Sample code:

```ballerina
azureSearch:SearchIndexerStatus status = check searchClient->indexersGetStatus(
    "blob-indexer",
    headers = {"api-key": adminKey},
    apiVersion = "2025-09-01"
);
```

Sample response:

```ballerina
{
  "status": "running",
  "lastResult": {
    "status": "success",
    "itemsProcessed": 150,
    "itemsFailed": 0,
    "startTime": "2025-09-01T10:00:00Z",
    "endTime": "2025-09-01T10:05:22Z"
  },
  "executionHistory": [
    {"status": "success", "itemsProcessed": 150, "itemsFailed": 0, "startTime": "2025-09-01T10:00:00Z"},
    {"status": "success", "itemsProcessed": 12, "itemsFailed": 0, "startTime": "2025-08-31T10:00:00Z"}
  ],
  "limits": {"maxRunTime": "PT2H"}
}
```

</details>

<details>
<summary>indexersDelete</summary>

Deletes an indexer.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `indexerName` | `string` | Yes | The name of the indexer to delete. |
| `headers` | `IndexersDeleteHeaders` | No | Request headers. Pass `api-key` for authentication. |
| `apiVersion` | `string` | Yes | Azure AI Search REST API version. |

Returns: `error?`

Sample code:

```ballerina
check searchClient->indexersDelete(
    "blob-indexer",
    headers = {"api-key": adminKey},
    apiVersion = "2025-09-01"
);
```

</details>

#### Data source management

<details>
<summary>dataSourcesCreate</summary>

Creates a new data source connection to an external data store.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `SearchIndexerDataSource` | Yes | The data source definition including name, type, credentials, and container. |
| `headers` | `DataSourcesCreateHeaders` | No | Request headers. Pass `api-key` for authentication. |
| `apiVersion` | `string` | Yes | Azure AI Search REST API version. |

Returns: `SearchIndexerDataSource|error`

Sample code:

```ballerina
azureSearch:SearchIndexerDataSource dataSource = check searchClient->dataSourcesCreate(
    {
        name: "my-blob-datasource",
        'type: "azureblob",
        credentials: {connectionString: storageConnectionString},
        container: {name: storageContainerName}
    },
    headers = {"api-key": adminKey},
    apiVersion = "2025-09-01"
);
```

Sample response:

```ballerina
{
  "name": "my-blob-datasource",
  "type": "azureblob",
  "credentials": {"connectionString": "<redacted>"},
  "container": {"name": "documents"},
  "@odata.etag": "\"0x8DCABC303030\""
}
```

</details>

<details>
<summary>dataSourcesCreateOrUpdate</summary>

Creates or updates a data source connection, including change and deletion detection policies.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataSourceName` | `string` | Yes | The name of the data source to create or update. |
| `headers` | `DataSourcesCreateOrUpdateHeaders` | Yes | Request headers. Must include `Prefer: "return=representation"` and `api-key`. |
| `payload` | `SearchIndexerDataSource` | Yes | The full data source definition. |
| `apiVersion` | `string` | Yes | Azure AI Search REST API version. |

Returns: `SearchIndexerDataSource|error`

Sample code:

```ballerina
azureSearch:DataSourcesCreateOrUpdateHeaders upsertHeaders = {
    Prefer: "return=representation",
    "api-key": adminKey
};
azureSearch:SearchIndexerDataSource dataSource = check searchClient->dataSourcesCreateOrUpdate(
    "my-blob-datasource",
    upsertHeaders,
    {
        name: "my-blob-datasource",
        'type: "azureblob",
        credentials: {connectionString: storageConnectionString},
        container: {name: storageContainerName},
        dataDeletionDetectionPolicy: {
            "@odata.type": "#Microsoft.Azure.Search.SoftDeleteColumnDeletionDetectionPolicy",
            softDeleteColumnName: "IsDeleted",
            softDeleteMarkerValue: "true"
        }
    },
    apiVersion = "2025-09-01"
);
```

Sample response:

```ballerina
{
  "name": "my-blob-datasource",
  "type": "azureblob",
  "container": {"name": "documents"},
  "dataDeletionDetectionPolicy": {
    "@odata.type": "#Microsoft.Azure.Search.SoftDeleteColumnDeletionDetectionPolicy",
    "softDeleteColumnName": "IsDeleted",
    "softDeleteMarkerValue": "true"
  },
  "@odata.etag": "\"0x8DCABC404040\""
}
```

</details>

<details>
<summary>dataSourcesGet</summary>

Retrieves a data source definition by name.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataSourceName` | `string` | Yes | The name of the data source to retrieve. |
| `headers` | `DataSourcesGetHeaders` | No | Request headers. Pass `api-key` for authentication. |
| `apiVersion` | `string` | Yes | Azure AI Search REST API version. |

Returns: `SearchIndexerDataSource|error`

Sample code:

```ballerina
azureSearch:SearchIndexerDataSource dataSource = check searchClient->dataSourcesGet(
    "my-blob-datasource",
    headers = {"api-key": adminKey},
    apiVersion = "2025-09-01"
);
```

Sample response:

```ballerina
{
  "name": "my-blob-datasource",
  "type": "azureblob",
  "credentials": {"connectionString": "<redacted>"},
  "container": {"name": "documents"},
  "@odata.etag": "\"0x8DCABC404040\""
}
```

</details>

<details>
<summary>dataSourcesList</summary>

Lists all data source connections defined in the search service.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `DataSourcesListHeaders` | No | Request headers. Pass `api-key` for authentication. |
| `apiVersion` | `string` | Yes | Azure AI Search REST API version. |

Returns: `ListDataSourcesResult|error`

Sample code:

```ballerina
azureSearch:ListDataSourcesResult result = check searchClient->dataSourcesList(
    headers = {"api-key": adminKey},
    apiVersion = "2025-09-01"
);
```

Sample response:

```ballerina
{
  "value": [
    {"name": "my-blob-datasource", "type": "azureblob"},
    {"name": "my-sql-datasource", "type": "azuresql"}
  ]
}
```

</details>

<details>
<summary>dataSourcesDelete</summary>

Deletes a data source connection.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataSourceName` | `string` | Yes | The name of the data source to delete. |
| `headers` | `DataSourcesDeleteHeaders` | No | Request headers. Pass `api-key` for authentication. |
| `apiVersion` | `string` | Yes | Azure AI Search REST API version. |

Returns: `error?`

Sample code:

```ballerina
check searchClient->dataSourcesDelete(
    "my-blob-datasource",
    headers = {"api-key": adminKey},
    apiVersion = "2025-09-01"
);
```

</details>

#### Skillset management

<details>
<summary>skillsetsCreate</summary>

Creates a new skillset containing a pipeline of cognitive enrichment skills applied during indexing.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `SearchIndexerSkillset` | Yes | The skillset definition including name, description, and list of skills. |
| `headers` | `SkillsetsCreateHeaders` | No | Request headers. Pass `api-key` for authentication. |
| `apiVersion` | `string` | Yes | Azure AI Search REST API version. |

Returns: `SearchIndexerSkillset|error`

Sample code:

```ballerina
azureSearch:SearchIndexerSkillset skillset = check searchClient->skillsetsCreate(
    {
        name: "my-skillset",
        description: "Language detection and key phrase extraction",
        skills: [
            {
                "@odata.type": "#Microsoft.Skills.Text.LanguageDetectionSkill",
                name: "languageDetection",
                inputs: [{"name": "text", "source": "/document/content"}],
                outputs: [{"name": "languageCode", "targetName": "language"}]
            },
            {
                "@odata.type": "#Microsoft.Skills.Text.KeyPhraseExtractionSkill",
                name: "keyPhrases",
                inputs: [
                    {"name": "text", "source": "/document/content"},
                    {"name": "languageCode", "source": "/document/language"}
                ],
                outputs: [{"name": "keyPhrases", "targetName": "keyphrases"}]
            }
        ]
    },
    headers = {"api-key": adminKey},
    apiVersion = "2025-09-01"
);
```

Sample response:

```ballerina
{
  "name": "my-skillset",
  "description": "Language detection and key phrase extraction",
  "skills": [
    {"@odata.type": "#Microsoft.Skills.Text.LanguageDetectionSkill", "name": "languageDetection"},
    {"@odata.type": "#Microsoft.Skills.Text.KeyPhraseExtractionSkill", "name": "keyPhrases"}
  ],
  "@odata.etag": "\"0x8DCABC505050\""
}
```

</details>

<details>
<summary>skillsetsCreateOrUpdate</summary>

Creates or updates a skillset.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `skillsetName` | `string` | Yes | The name of the skillset to create or update. |
| `headers` | `SkillsetsCreateOrUpdateHeaders` | Yes | Request headers. Must include `Prefer: "return=representation"` and `api-key`. |
| `payload` | `SearchIndexerSkillset` | Yes | The full skillset definition. |
| `apiVersion` | `string` | Yes | Azure AI Search REST API version. |

Returns: `SearchIndexerSkillset|error`

Sample code:

```ballerina
azureSearch:SkillsetsCreateOrUpdateHeaders upsertHeaders = {
    Prefer: "return=representation",
    "api-key": adminKey
};
azureSearch:SearchIndexerSkillset skillset = check searchClient->skillsetsCreateOrUpdate(
    "my-skillset",
    upsertHeaders,
    {
        name: "my-skillset",
        skills: [
            {
                "@odata.type": "#Microsoft.Skills.Text.SentimentSkill",
                name: "sentiment",
                inputs: [{"name": "text", "source": "/document/content"}],
                outputs: [{"name": "score", "targetName": "sentimentScore"}]
            }
        ]
    },
    apiVersion = "2025-09-01"
);
```

Sample response:

```ballerina
{
  "name": "my-skillset",
  "skills": [
    {"@odata.type": "#Microsoft.Skills.Text.SentimentSkill", "name": "sentiment"}
  ],
  "@odata.etag": "\"0x8DCABC606060\""
}
```

</details>

<details>
<summary>skillsetsGet</summary>

Retrieves a skillset definition by name.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `skillsetName` | `string` | Yes | The name of the skillset to retrieve. |
| `headers` | `SkillsetsGetHeaders` | No | Request headers. Pass `api-key` for authentication. |
| `apiVersion` | `string` | Yes | Azure AI Search REST API version. |

Returns: `SearchIndexerSkillset|error`

Sample code:

```ballerina
azureSearch:SearchIndexerSkillset skillset = check searchClient->skillsetsGet(
    "my-skillset",
    headers = {"api-key": adminKey},
    apiVersion = "2025-09-01"
);
```

Sample response:

```ballerina
{
  "name": "my-skillset",
  "skills": [
    {"@odata.type": "#Microsoft.Skills.Text.LanguageDetectionSkill", "name": "languageDetection"},
    {"@odata.type": "#Microsoft.Skills.Text.KeyPhraseExtractionSkill", "name": "keyPhrases"}
  ],
  "@odata.etag": "\"0x8DCABC505050\""
}
```

</details>

<details>
<summary>skillsetsList</summary>

Lists all skillsets defined in the search service.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `SkillsetsListHeaders` | No | Request headers. Pass `api-key` for authentication. |
| `apiVersion` | `string` | Yes | Azure AI Search REST API version. |

Returns: `ListSkillsetsResult|error`

Sample code:

```ballerina
azureSearch:ListSkillsetsResult result = check searchClient->skillsetsList(
    headers = {"api-key": adminKey},
    apiVersion = "2025-09-01"
);
```

Sample response:

```ballerina
{
  "value": [
    {"name": "my-skillset"},
    {"name": "ocr-enrichment-skillset"}
  ]
}
```

</details>

<details>
<summary>skillsetsDelete</summary>

Deletes a skillset.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `skillsetName` | `string` | Yes | The name of the skillset to delete. |
| `headers` | `SkillsetsDeleteHeaders` | No | Request headers. Pass `api-key` for authentication. |
| `apiVersion` | `string` | Yes | Azure AI Search REST API version. |

Returns: `error?`

Sample code:

```ballerina
check searchClient->skillsetsDelete(
    "my-skillset",
    headers = {"api-key": adminKey},
    apiVersion = "2025-09-01"
);
```

</details>

#### Synonym map management

<details>
<summary>synonymMapsCreate</summary>

Creates a new synonym map used to expand or substitute search terms.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `SynonymMap` | Yes | The synonym map definition including name, format (`"solr"`), and synonyms string. |
| `headers` | `SynonymMapsCreateHeaders` | No | Request headers. Pass `api-key` for authentication. |
| `apiVersion` | `string` | Yes | Azure AI Search REST API version. |

Returns: `SynonymMap|error`

Sample code:

```ballerina
azureSearch:SynonymMap synonymMap = check searchClient->synonymMapsCreate(
    {
        name: "my-synonyms",
        format: "solr",
        synonyms: "cloud, azure, sky\nsearch, find, discover\nAI, artificial intelligence"
    },
    headers = {"api-key": adminKey},
    apiVersion = "2025-09-01"
);
```

Sample response:

```ballerina
{
  "name": "my-synonyms",
  "format": "solr",
  "synonyms": "cloud, azure, sky\nsearch, find, discover\nAI, artificial intelligence",
  "@odata.etag": "\"0x8DCABC707070\""
}
```

</details>

<details>
<summary>synonymMapsCreateOrUpdate</summary>

Creates or updates a synonym map.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `synonymMapName` | `string` | Yes | The name of the synonym map to create or update. |
| `headers` | `SynonymMapsCreateOrUpdateHeaders` | Yes | Request headers. Must include `Prefer: "return=representation"` and `api-key`. |
| `payload` | `SynonymMap` | Yes | The full synonym map definition. |
| `apiVersion` | `string` | Yes | Azure AI Search REST API version. |

Returns: `SynonymMap|error`

Sample code:

```ballerina
azureSearch:SynonymMapsCreateOrUpdateHeaders upsertHeaders = {
    Prefer: "return=representation",
    "api-key": adminKey
};
azureSearch:SynonymMap synonymMap = check searchClient->synonymMapsCreateOrUpdate(
    "my-synonyms",
    upsertHeaders,
    {
        name: "my-synonyms",
        format: "solr",
        synonyms: "cloud, azure, sky\nsearch, find, discover\nAI, artificial intelligence, machine learning"
    },
    apiVersion = "2025-09-01"
);
```

Sample response:

```ballerina
{
  "name": "my-synonyms",
  "format": "solr",
  "synonyms": "cloud, azure, sky\nsearch, find, discover\nAI, artificial intelligence, machine learning",
  "@odata.etag": "\"0x8DCABC808080\""
}
```

</details>

<details>
<summary>synonymMapsGet</summary>

Retrieves a synonym map definition by name.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `synonymMapName` | `string` | Yes | The name of the synonym map to retrieve. |
| `headers` | `SynonymMapsGetHeaders` | No | Request headers. Pass `api-key` for authentication. |
| `apiVersion` | `string` | Yes | Azure AI Search REST API version. |

Returns: `SynonymMap|error`

Sample code:

```ballerina
azureSearch:SynonymMap synonymMap = check searchClient->synonymMapsGet(
    "my-synonyms",
    headers = {"api-key": adminKey},
    apiVersion = "2025-09-01"
);
```

Sample response:

```ballerina
{
  "name": "my-synonyms",
  "format": "solr",
  "synonyms": "cloud, azure, sky\nsearch, find, discover",
  "@odata.etag": "\"0x8DCABC707070\""
}
```

</details>

<details>
<summary>synonymMapsList</summary>

Lists all synonym maps defined in the search service.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `SynonymMapsListHeaders` | No | Request headers. Pass `api-key` for authentication. |
| `apiVersion` | `string` | Yes | Azure AI Search REST API version. |

Returns: `ListSynonymMapsResult|error`

Sample code:

```ballerina
azureSearch:ListSynonymMapsResult result = check searchClient->synonymMapsList(
    headers = {"api-key": adminKey},
    apiVersion = "2025-09-01"
);
```

Sample response:

```ballerina
{
  "value": [
    {"name": "my-synonyms", "format": "solr"},
    {"name": "product-synonyms", "format": "solr"}
  ]
}
```

</details>

<details>
<summary>synonymMapsDelete</summary>

Deletes a synonym map.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `synonymMapName` | `string` | Yes | The name of the synonym map to delete. |
| `headers` | `SynonymMapsDeleteHeaders` | No | Request headers. Pass `api-key` for authentication. |
| `apiVersion` | `string` | Yes | Azure AI Search REST API version. |

Returns: `error?`

Sample code:

```ballerina
check searchClient->synonymMapsDelete(
    "my-synonyms",
    headers = {"api-key": adminKey},
    apiVersion = "2025-09-01"
);
```

</details>

#### Service

<details>
<summary>getServiceStatistics</summary>

Returns service-level counters and limits including index count, document count, storage size, and service tier quotas.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `GetServiceStatisticsHeaders` | No | Request headers. Pass `api-key` for authentication. |
| `apiVersion` | `string` | Yes | Azure AI Search REST API version. |

Returns: `ServiceStatistics|error`

Sample code:

```ballerina
azureSearch:ServiceStatistics stats = check searchClient->getServiceStatistics(
    headers = {"api-key": adminKey},
    apiVersion = "2025-09-01"
);
```

Sample response:

```ballerina
{
  "counters": {
    "documentCount": {"usage": 5000, "quota": 1000000},
    "indexesCount": {"usage": 3, "quota": 15},
    "indexersCount": {"usage": 2, "quota": 15},
    "dataSourcesCount": {"usage": 2, "quota": 15},
    "storageSize": {"usage": 10485760, "quota": 2147483648},
    "synonymMaps": {"usage": 1, "quota": 5},
    "skillsetCount": {"usage": 1, "quota": 15}
  },
  "limits": {
    "maxFieldsPerIndex": 1000,
    "maxIndexerRunTime": "PT2H",
    "maxFileExtractionSize": 16777216,
    "maxFileContentCharactersToExtract": 4194304
  }
}
```

</details>
