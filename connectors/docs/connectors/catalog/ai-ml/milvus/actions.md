---
title: Actions
---

# Actions

The `ballerinax/milvus` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Manage collections, indexes, and vector data; perform similarity search and query operations. |

---

## Client

Manage collections, indexes, and vector data; perform similarity search and query operations.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `authConfig` | `AuthConfig` | `()` | Token-based authentication configuration. |
| `credentialsConfig` | `CredentialsConfig` | `()` | Username and password authentication configuration. |
| `idleTimeout` | `int` | `()` | Idle timeout in seconds. |
| `keepAliveTime` | `int` | `55` | Keep-alive ping interval in seconds. |
| `keepAliveTimeout` | `int` | `20` | Keep-alive timeout in seconds. |
| `keepAliveWithoutCalls` | `boolean` | `false` | Whether to send keep-alive pings without active calls. |
| `rpcDeadline` | `int` | `0` | RPC deadline in seconds. `0` means no deadline. |
| `connectTimeout` | `int` | `10` | Connection timeout in seconds. |
| `databaseName` | `string` | `()` | Target database name. |
| `serverName` | `string` | `()` | Server name for TLS verification. |
| `proxyAddress` | `string` | `()` | Proxy server address. |
| `secureConfig` | `SecureConfig` | `()` | TLS/SSL configuration with client and server certificate paths. |

### Initializing the client

```ballerina
import ballerinax/milvus;

configurable string serviceUrl = ?;
configurable string token = ?;

milvus:Client milvusClient = check new (serviceUrl, {
    authConfig: {
        token: token
    }
});
```

### Operations

#### Collection management

<details>
<summary>listCollections</summary>

Lists the names of all collections in the connected Milvus instance.

Returns: `string[]|Error`

Sample code:

```ballerina
string[] collections = check milvusClient->listCollections();
```

Sample response:

```ballerina
["products", "documents", "image_embeddings"]
```

</details>

<details>
<summary>createCollection</summary>

Creates a new collection with the specified name, primary field, and vector dimension.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `request` | `CreateCollectionRequest` | Yes | Collection creation parameters including name, primary field name, and vector dimension. |

Returns: `Error?`

Sample code:

```ballerina
check milvusClient->createCollection({
    collectionName: "products",
    primaryFieldName: "id",
    dimension: 768
});
```

</details>

<details>
<summary>loadCollection</summary>

Loads a collection into memory to enable search and query operations.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `collectionName` | `string` | Yes | The name of the collection to load. |

Returns: `Error?`

Sample code:

```ballerina
check milvusClient->loadCollection("products");
```

</details>

#### Index management

<details>
<summary>createIndex</summary>

Creates indexes on the specified fields of a collection for efficient search.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `request` | `CreateIndexRequest` | Yes | Index creation parameters including collection name, primary key, and field names to index. |

Returns: `Error?`

Sample code:

```ballerina
check milvusClient->createIndex({
    collectionName: "products",
    primaryKey: "id",
    fieldNames: ["vector"]
});
```

</details>

#### Data operations

<details>
<summary>upsert</summary>

Inserts a new vector entry or updates it if the primary key already exists.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `request` | `UpsertRequest` | Yes | Upsert parameters including collection name, vector data, optional primary key, and properties. |

Returns: `Error?`

Sample code:

```ballerina
check milvusClient->upsert({
    collectionName: "products",
    data: {
        primaryKey: {
            fieldName: "id",
            value: 1
        },
        vectors: [0.12, 0.34, 0.56, 0.78],
        properties: {
            "name": "Wireless Headphones",
            "category": "Electronics"
        }
    }
});
```

</details>

<details>
<summary>delete</summary>

Deletes vectors from a collection by IDs or a filter expression. Returns the number of deleted entries.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `request` | `DeleteRequest` | Yes | Delete parameters including collection name and either IDs or a filter expression. |

Returns: `int|Error`

Sample code:

```ballerina
int deletedCount = check milvusClient->delete({
    collectionName: "products",
    ids: [1, 2, 3]
});
```

Sample response:

```ballerina
3
```

</details>

#### Search & query

<details>
<summary>search</summary>

Performs a similarity search on vector data and returns the top-K most similar results.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `request` | `SearchRequest` | Yes | Search parameters including collection name, query vectors, top-K count, optional filter, and output fields. |

Returns: `SearchResult[][]|Error`

Sample code:

```ballerina
milvus:SearchResult[][] results = check milvusClient->search({
    collectionName: "products",
    vectors: [0.12, 0.34, 0.56, 0.78],
    topK: 3,
    outputFields: ["name", "category"]
});
```

Sample response:

```ballerina
[[{"primaryKey": "1", "id": 1, "similarityScore": 0.98, "outputFields": null}, {"primaryKey": "5", "id": 5, "similarityScore": 0.87, "outputFields": null}, {"primaryKey": "12", "id": 12, "similarityScore": 0.76, "outputFields": null}]]
```

</details>

<details>
<summary>query</summary>

Queries vectors from a collection using a filter expression and returns matching entries.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `request` | `QueryRequest` | Yes | Query parameters including collection name, filter expression, and output fields. |

Returns: `QueryResult[][]|Error`

Sample code:

```ballerina
milvus:QueryResult[][] results = check milvusClient->query({
    collectionName: "products",
    filter: "category == 'Electronics'",
    outputFields: ["name", "category"]
});
```

Sample response:

```ballerina
[[{"name": "Wireless Headphones", "category": "Electronics"}, {"name": "Bluetooth Speaker", "category": "Electronics"}]]
```

</details>
