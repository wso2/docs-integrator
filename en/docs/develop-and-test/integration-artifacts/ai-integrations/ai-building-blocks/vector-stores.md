---
sidebar_position: 4
title: Vector Stores
description: Reference for every vector store in WSO2 Integrator, covering create form fields, advanced configurations, query modes, and metadata filter support for In-Memory, Amazon S3 Vectors, Pinecone, pgvector, Weaviate, and Milvus.
keywords: [wso2 integrator, vector store, embeddings, knowledge base, in-memory, amazon s3 vectors, aws, milvus, pgvector, pinecone, weaviate]
slug: /develop-and-test/integration-artifacts/ai-integrations/ai-building-blocks/vector-stores
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Vector Stores

A vector database stores vector embeddings and enables similarity search over them, forming the foundation for semantic search and RAG applications.

A **Vector Store** is WSO2 Integrator's abstraction over these databases, exposing a common interface for every supported backend.

It is the storage half of a [Knowledge Base](knowledge-bases.md). The [Embedding Provider](embedding-providers.md) produces the vectors, and the Vector Store abstracts where and how they are persisted and retrieved at query time.

## Available actions

Every vector store exposes the same three actions. You don't usually call them directly. The Knowledge Base uses them under the hood.

| Action | What it does | Required parameters |
|---|---|---|
| **Add** | Persists vector entries (embeddings + their source chunks). Replaces existing entries with the same id. | **Entries** (the vectors to add). |
| **Query** | Returns the most similar entries for a given query embedding and/or metadata filter. | **Query** (an embedding and/or filters, plus `topK`). |
| **Delete** | Deletes entries by id. | **IDs** (a single id or list). |

### Query input fields

When something calls **Query** on a vector store, the request carries these fields:

| Field | Default | Available values | What it controls |
|---|---|---|---|
| **Embedding** | optional | A vector | The vector to use for similarity search. If omitted, the search returns by filter only. |
| **Filters** | optional | Metadata filters | Restrict the search by metadata fields. See [Metadata filters](#metadata-filters). |
| **Top K** | `10` | Any positive integer or `-1` (all) | Max number of items to return. |

### Metadata filters

Most stores support filtering vectors by their metadata using standard operators:

| Operator | Meaning |
|---|---|
| `==` | Equal |
| `!=` | Not equal |
| `>` `<` `>=` `<=` | Greater than / less than (and equal) |
| `in` | Value is in the given list |
| `nin` | Value is not in the given list |

Multiple filters can be combined with `AND` or `OR`. Each connector handles the exact wire-format mapping (Pinecone and Amazon S3 Vectors use `$eq`, pgvector compiles to JSONB, Weaviate uses GraphQL `Equal`, and Milvus has its own filter syntax). You write filters the same way regardless of store.

### Query modes

Some stores support more than just dense vector search. The mode you pick when you create the store determines what kind of embeddings it accepts:

| Mode | When to use | Supported by |
|---|---|---|
| `DENSE` | Standard semantic search using dense vectors. The default everywhere. | All stores |
| `SPARSE` | Keyword/lexical-style search using sparse vectors. | Pinecone, pgvector |
| `HYBRID` | Combine dense and sparse vectors. | Pinecone |

### Similarity metrics

Local stores let you choose the metric. Hosted stores manage it themselves (you pick when you create the index/collection in their UI).

| Metric | Measures |
|---|---|
| `COSINE` | Cosine of the angle between vectors. Most common for semantic search. |
| `EUCLIDEAN` | Straight-line distance between vector points. |
| `DOT_PRODUCT` | Directional similarity, magnitude-sensitive. Not supported on pgvector. |
| `MANHATTAN` | Sum of absolute differences (pgvector only). |

## Where to find vector stores

Inside the **Create Vector Knowledge Base** form click **+ Create New Vector Store**, or open the **Vector Stores** panel from any flow editor. The **Select Vector Store** picker shows the supported stores:

<ThemedImage
    alt="Select Vector Store picker with a search box, listing In Memory Vector Store, Opensearch Vector Store, S3 Vector Store, Milvus Vector Store, Pgvector Vector Store, Pinecone Vector Store, and Weaviate Vector Store, each with a one-line description."
    sources={{
        light: useBaseUrl('/img/genai/develop/components/vector-stores/01-select-list-v5.1.0.png'),
        dark: useBaseUrl('/img/genai/develop/components/vector-stores/01-select-list-v5.1.0.png'),
    }}
/>

## Implementations overview

| Store | Module | Modes supported | Hosted/local |
|---|---|---|---|
| **In-Memory** | `ballerina/ai` | DENSE | Local (process memory) |
| **Amazon S3 Vectors** | [`ballerinax/ai.aws.s3`](https://central.ballerina.io/ballerinax/ai.aws.s3/latest) | DENSE | Hosted (AWS) |
| **Milvus** | [`ballerinax/ai.milvus`](https://central.ballerina.io/ballerinax/ai.milvus/latest) | DENSE | Hosted or self-hosted |
| **pgvector** | [`ballerinax/ai.pgvector`](https://central.ballerina.io/ballerinax/ai.pgvector/latest) | DENSE, SPARSE | Self-hosted PostgreSQL |
| **Pinecone** | [`ballerinax/ai.pinecone`](https://central.ballerina.io/ballerinax/ai.pinecone/latest) | DENSE, SPARSE, HYBRID | Hosted |
| **Weaviate** | [`ballerinax/ai.weaviate`](https://central.ballerina.io/ballerinax/ai.weaviate/latest) | DENSE | Hosted or self-hosted |

## In-memory vector store

Embeddings live in the running integration's process memory. The store loses all data on restart, so it is not durable. Use it for development, testing, and small datasets.

### Create form

<ThemedImage
    alt="Create Vector Store form for In-Memory showing the banner 'This operation has no required parameters. Optional settings can be configured below.' Advanced Configurations Expand link, Vector Store Name (default aiInmemoryvectorstore), Result Type (locked to ai:InMemoryVectorStore)."
    sources={{
        light: useBaseUrl('/img/genai/develop/components/vector-stores/02-in-memory-basic.png'),
        dark: useBaseUrl('/img/genai/develop/components/vector-stores/02-in-memory-basic.png'),
    }}
/>

No required fields.

### Advanced configurations

<ThemedImage
    alt="In-Memory Vector Store Create form with Advanced Configurations expanded showing Similarity Metric (default COSINE)."
    sources={{
        light: useBaseUrl('/img/genai/develop/components/vector-stores/03-in-memory-advanced.png'),
        dark: useBaseUrl('/img/genai/develop/components/vector-stores/03-in-memory-advanced.png'),
    }}
/>

| Field | Default | Available values | What it controls |
|---|---|---|---|
| **Similarity Metric** | `COSINE` | `COSINE`, `EUCLIDEAN`, `DOT_PRODUCT` | Metric used for vector similarity. |

:::warning
Supports dense vectors only. Adding sparse or hybrid vectors raises an error.
:::

## Amazon S3 Vectors

Amazon S3 Vectors stores vectors in a vector index inside an S3 vector bucket, and searches them with an approximate nearest neighbor query. It is a separate AWS service from S3 object storage, with its own endpoint and its own `s3vectors` IAM actions. The store ships in the same package as the [AWS S3 Text Data Loader](data-loaders.md#aws-s3-text-data-loader), so one package covers loading documents from S3 and storing their vectors in S3 Vectors.

Official website: [Amazon S3 Vectors](https://aws.amazon.com/s3/features/vectors/).

:::tip
To have Amazon Bedrock chunk and embed the documents and query S3 Vectors for you, use the [Bedrock Self-Managed Knowledge Base](knowledge-bases.md#aws-bedrock) instead of a Vector Knowledge Base with this store.
:::

### Before you start

**Create the vector bucket and index first.** The store doesn't create them. Three index settings matter, and AWS doesn't let you change any of them after the index is created:

- **Dimension** must match your embedding provider's output dimension (1 to 4,096).
- **Distance metric** is `cosine` or `euclidean`.
- **Non-filterable metadata keys** must include `content`. The store keeps each chunk's text in this metadata key. AWS limits filterable metadata to 2 KB per vector, which chunk text easily exceeds, while non-filterable metadata can use the rest of the 40 KB per vector. If you set a different **contentKey** (see [S3 Vectors configuration](#s3-vectors-configuration)), declare that key instead.

See [Creating a vector index in a vector bucket](https://docs.aws.amazon.com/AmazonS3/latest/userguide/s3-vectors-create-index.html).

**Use a region where S3 Vectors is available.** It isn't offered in every AWS region. See [S3 Vectors AWS Regions and endpoints](https://docs.aws.amazon.com/AmazonS3/latest/userguide/s3-vectors-regions-quotas.html).

**Grant the IAM permissions.** The identity the store runs as needs these actions on the index:

| Action | Needed for |
|---|---|
| `s3vectors:GetIndex` | Checking the index when the store is created. Not needed when **validateIndexOnInit** is `false`. |
| `s3vectors:PutVectors` | **Add**. |
| `s3vectors:QueryVectors` | **Query** with an embedding. |
| `s3vectors:ListVectors` | **Query** without an embedding, which the Vector Knowledge Base's **Delete By Filter** uses. |
| `s3vectors:GetVectors` | Every **Query**. AWS requires it whenever a query returns metadata or uses a filter, and the store always reads the chunk from metadata. Without it, **Query** fails with `403`. |
| `s3vectors:DeleteVectors` | **Delete**. |

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3vectors:GetIndex",
        "s3vectors:PutVectors",
        "s3vectors:QueryVectors",
        "s3vectors:ListVectors",
        "s3vectors:GetVectors",
        "s3vectors:DeleteVectors"
      ],
      "Resource": "arn:aws:s3vectors:us-east-1:111122223333:bucket/amzn-s3-demo-vector-bucket/index/idx"
    }
  ]
}
```

See the permissions sections of [QueryVectors](https://docs.aws.amazon.com/AmazonS3/latest/API/API_S3VectorBuckets_QueryVectors.html) and [ListVectors](https://docs.aws.amazon.com/AmazonS3/latest/API/API_S3VectorBuckets_ListVectors.html).

### Create form

In the **Select Vector Store** picker, this store is listed as **S3 Vector Store**.

<ThemedImage
    alt={"Create Vector Store form titled 'Initializes the S3 Vectors vector store.' showing Connection Config (required, Record/Expression toggle, prefilled with {auth: {accessKeyId: \"\", secretAccessKey: \"\"}}), Index (required, Record/Expression toggle, default {}), S3 Vectors Configuration (Default: {}), HTTP Configuration (Default: {}), and Vector Store Name (default s3Vectorstore)."}
    sources={{
        light: useBaseUrl('/img/genai/develop/components/vector-stores/12-s3-vectors-form-v5.1.0.png'),
        dark: useBaseUrl('/img/genai/develop/components/vector-stores/12-s3-vectors-form-v5.1.0.png'),
    }}
/>

| Field | Required | Default | Available values |
|---|---|---|---|
| **Connection Config** | Yes | — | How to reach S3 Vectors. See [Connection config](#s3-vectors-connection-config). |
| **Index** | Yes | — | The target index: either `vectorBucketName` and `indexName` together, for example `{vectorBucketName: "amzn-s3-demo-vector-bucket", indexName: "idx"}`, or `indexArn` on its own. Setting both forms, or only one of the two names, fails. |
| **S3 Vectors Configuration** | No | `{}` | Store behavior. See [S3 Vectors configuration](#s3-vectors-configuration). |
| **HTTP Configuration** | No | `{}` | Standard HTTP knobs. Same fields as [Standard HTTP advanced configurations](model-providers.md#standard-http-advanced-configurations), with two exceptions: the store always uses HTTP/1.1 without chunked request bodies, because S3 Vectors rejects both HTTP/2 and chunked bodies, and **Retry Config** is ignored, because the store retries on its own. |

:::tip
**Connection Config** is prefilled with empty static access keys. When the integration runs on AWS, use `DEFAULT_CREDENTIALS` instead so that no long-lived keys are kept in the integration.
:::

#### Connection config {#s3-vectors-connection-config}

| Field | Type | Default | Description |
|---|---|---|---|
| **auth** | `auth:AuthConfig` | — | `DEFAULT_CREDENTIALS`, or one of the credential records in [AWS credential options](model-providers.md#aws-credential-options). |
| **region** | `aws:Region \| string` | `us-east-1` | The region of the vector bucket. |
| **endpoint** | `aws:EndpointConfig` | `()` (derived from **region**) | Only `customEndpoint` is useful here: a full endpoint URL, including the scheme, that replaces the derived one. `fips` must stay `false`; AWS lists no FIPS endpoint for S3 Vectors, so `true` fails when the store is created. `dualstack` is ignored, because every S3 Vectors endpoint is already dual-stack (`s3vectors.<region>.api.aws`). |

For an [interface VPC endpoint](https://docs.aws.amazon.com/AmazonS3/latest/userguide/s3-vectors-privatelink.html), enable private DNS on the endpoint and leave **endpoint** empty.

#### S3 Vectors configuration {#s3-vectors-configuration}

| Field | Type | Default | Description |
|---|---|---|---|
| **contentKey** | `string` | `"content"` | The metadata key that holds the chunk text. It must be a non-filterable key on the index. |
| **filters** | `ai:MetadataFilters` | `()` | Filters applied to every **Query**, combined with the query's own filters using `AND`. |
| **returnVectorData** | `boolean` | `false` | Whether **Query** returns each match's embedding. S3 Vectors doesn't return embeddings from a search, so the store makes extra `GetVectors` calls (up to 100 keys each) when this is `true`. When `false`, the embedding of each match is empty. |
| **maxListScan** | `int` | `100000` | The most vectors that a **Query** without an embedding reads before it fails. See [Behavior and limits](#s3-vectors-behavior-and-limits). |
| **validateIndexOnInit** | `boolean` | `true` | Whether the store reads the index with `GetIndex` when it is created. This catches a missing index and a filterable content key at startup, and lets **Add** check each vector's dimension before sending it. |

### Behavior and limits {#s3-vectors-behavior-and-limits}

- **Dense vectors and text chunks only.** S3 Vectors has no sparse or hybrid index, and the chunk text is stored as metadata, so chunk content must be a `string`.
- **Large adds and deletes aren't atomic.** The store sends up to 500 vectors per request. If a request fails, the earlier requests are already applied.
- **`similarityScore` is converted from the S3 Vectors distance** so that higher means more similar: `1 - distance` for a `cosine` index, and `1 / (1 + distance)` for a `euclidean` index.
- **Range filters need numbers.** The store saves `createdAt` and `modifiedAt` as epoch seconds, so range filters on them must use epoch seconds too.
- **Filtered queries on a `CLASSIC` index can return fewer than Top K matches.** Indexes in vector buckets created on or after September 30, 2026 are `ENHANCED` and filter before searching. See [Changing a vector index's mode](https://docs.aws.amazon.com/AmazonS3/latest/userguide/s3-vectors-index-mode.html).
- **A query without an embedding scans the index** with `ListVectors` and checks the filters in the integration. The Vector Knowledge Base's **Delete By Filter** sends this kind of query, so it reads the whole index, and fails after more than **maxListScan** vectors.

## Milvus

Milvus is an open-source vector database optimized for very large datasets. The collection (and its schema and index) must exist before the connector can use it.

Official website: [Milvus documentation](https://milvus.io/docs).

### Create form

<ThemedImage
    alt="Create Vector Store form for Milvus showing three required fields: API Key (The API key for the Milvus service), Milvus Configuration (record/expression toggle, default {}), and Service URL. Below: Advanced Configurations Expand link, Vector Store Name milvusVectorstore, Result Type milvus:VectorStore."
    sources={{
        light: useBaseUrl('/img/genai/develop/components/vector-stores/04-milvus-basic.png'),
        dark: useBaseUrl('/img/genai/develop/components/vector-stores/04-milvus-basic.png'),
    }}
/>

| Field | Required | Default | Available values |
|---|---|---|---|
| **API Key** | Yes | — | Milvus API key (sent as a bearer token). |
| **Milvus Configuration** | Yes | `{}` | Record with collection settings. **Collection Name** (default `"default"`): the Milvus collection to use. **Chunk Field Name** (optional): the field on the collection that holds the chunk content. **Primary Key Field** (default `"id"`): the collection's primary-key field. **Additional Fields** (default `[]`): extra fields to include in search results, on top of `content`, `type`, `vector`, `metadata`. |
| **Service URL** | Yes | — | The Milvus service URL. |

### Advanced configurations

<ThemedImage
    alt="Milvus Vector Store Create form with Advanced Configurations expanded showing HTTP Configuration (default {})."
    sources={{
        light: useBaseUrl('/img/genai/develop/components/vector-stores/05-milvus-advanced.png'),
        dark: useBaseUrl('/img/genai/develop/components/vector-stores/05-milvus-advanced.png'),
    }}
/>

| Field | Default | Available values | What it controls |
|---|---|---|---|
| **HTTP Configuration** | `{}` | Record | Standard HTTP knobs. Same fields as [Standard HTTP advanced configurations](model-providers.md#standard-http-advanced-configurations). |

:::info
The connector loads the collection into memory automatically before each search. Milvus converts IDs to integers for the primary key field.
:::

## pgvector

The pgvector extension enables vector search inside PostgreSQL. The connector creates the table and an HNSW index automatically on first use.

Official website: [pgvector on GitHub](https://github.com/pgvector/pgvector).

### Create form

<ThemedImage
    alt="Create Vector Store form for pgvector showing four required fields: Database Name, Host Name, Password, Username. Below: Advanced Configurations Expand link, Vector Store Name pgvectorVectorstore, Result Type pgvector:VectorStore."
    sources={{
        light: useBaseUrl('/img/genai/develop/components/vector-stores/06-pgvector-basic.png'),
        dark: useBaseUrl('/img/genai/develop/components/vector-stores/06-pgvector-basic.png'),
    }}
/>

| Field | Required | Default | Available values |
|---|---|---|---|
| **Database Name** | Yes | — | PostgreSQL database name. |
| **Host Name** | Yes | — | Database host, for example `localhost`. |
| **Password** | Yes | — | Database password. |
| **Username** | Yes | — | Database user. |

### Advanced configurations

<ThemedImage
    alt="pgvector Vector Store Create form with Advanced Configurations expanded showing Configurations For The Vector Store (default {}), Properties To Configure Connection Pool (default {}), Additional Set Of Configurations For The Database (default {}), Port Number (default 5432), Table Name (default 'vector_store')."
    sources={{
        light: useBaseUrl('/img/genai/develop/components/vector-stores/07-pgvector-advanced.png'),
        dark: useBaseUrl('/img/genai/develop/components/vector-stores/07-pgvector-advanced.png'),
    }}
/>

| Field | Default | Available values | What it controls |
|---|---|---|---|
| **Configurations For The Vector Store** | `{}` | Record (`embeddingType`, `vectorDimension`, `similarityMetric`) | **Embedding Type**: `ai:DENSE` (default) or `ai:SPARSE`. Picks the column type (`vector` vs `sparsevec`). **Vector Dimension**: `1536` by default; must match your embedding provider's output dimension. **Similarity Metric**: `COSINE` (default), `EUCLIDEAN`, or `MANHATTAN`. |
| **Properties To Configure Connection Pool** | `{}` | Record | Connection pool settings. |
| **Additional Set Of Configurations For The Database** | `{}` | Record | Extra PostgreSQL options (SSL mode, connect timeout, and so on). |
| **Port Number** | `5432` | Any positive integer | Database port. |
| **Table Name** | `"vector_store"` | String | Table to store vectors in. Created on first use if missing. |

:::info
Auto-created table schema: `id VARCHAR PRIMARY KEY, content TEXT, embedding vector|sparsevec, metadata JSONB`. The connector creates an HNSW index automatically for fast similarity search.
:::

## Pinecone

Pinecone is a hosted vector database with native dense, sparse, and hybrid support. It provides multi-tenancy through namespaces.

Official website: [Pinecone documentation](https://docs.pinecone.io).

### Create form

<ThemedImage
    alt="Create Vector Store form for Pinecone showing two required fields: API Key (Pinecone API key for authentication) and Service URL (URL of the Pinecone API service). Below: Advanced Configurations Expand link, Vector Store Name pineconeVectorstore, Result Type pinecone:VectorStore."
    sources={{
        light: useBaseUrl('/img/genai/develop/components/vector-stores/08-pinecone-basic.png'),
        dark: useBaseUrl('/img/genai/develop/components/vector-stores/08-pinecone-basic.png'),
    }}
/>

| Field | Required | Default | Available values |
|---|---|---|---|
| **API Key** | Yes | — | Pinecone API key. |
| **Service URL** | Yes | — | URL of the Pinecone index endpoint. |

### Advanced configurations

<ThemedImage
    alt="Pinecone Vector Store Create form with Advanced Configurations expanded showing Pinecone Configuration (default {}), HTTP Configuration (default {}), Query Mode (default ai:DENSE)."
    sources={{
        light: useBaseUrl('/img/genai/develop/components/vector-stores/09-pinecone-advanced.png'),
        dark: useBaseUrl('/img/genai/develop/components/vector-stores/09-pinecone-advanced.png'),
    }}
/>

| Field | Default | Available values | What it controls |
|---|---|---|---|
| **Pinecone Configuration** | `{}` | Record (`namespace`, `filters`, `sparseVector`) | Pinecone-specific settings. **Namespace** isolates vectors for multi-tenancy. **Filters** sets default metadata filters applied on every query. **Sparse Vector** is needed for hybrid search. |
| **HTTP Configuration** | `{}` | Record | Standard HTTP knobs. Same fields as [Standard HTTP advanced configurations](model-providers.md#standard-http-advanced-configurations). |
| **Query Mode** | `ai:DENSE` | `ai:DENSE`, `ai:SPARSE`, `ai:HYBRID` | Search mode. |

:::info
`topK` must be in the range 1–10000.
:::

## Weaviate

Weaviate is an open-source vector database with structured filtering and a GraphQL query layer. The connector queries pre-existing collections. Create the collection (with its schema) in Weaviate before connecting.

Official website: [Weaviate documentation](https://weaviate.io/developers/weaviate).

### Create form

<ThemedImage
    alt={"Create Vector Store form for Weaviate showing three required fields: API Key (The API key for the Weaviate service), Weaviate Configuration (record/expression toggle, default '{collectionName: \"\"}'), and Service URL. Below: Advanced Configurations Expand link, Vector Store Name weaviateVectorstore, Result Type weaviate:VectorStore."}
    sources={{
        light: useBaseUrl('/img/genai/develop/components/vector-stores/10-weaviate-basic.png'),
        dark: useBaseUrl('/img/genai/develop/components/vector-stores/10-weaviate-basic.png'),
    }}
/>

| Field | Required | Default | Available values |
|---|---|---|---|
| **API Key** | Yes | — | Weaviate API key (sent as a bearer token). |
| **Weaviate Configuration** | Yes | `{collectionName: ""}` | Record with collection-level config. **Collection Name** (required): the Weaviate collection to use; must already exist. **Chunk Field Name** (optional, default `"content"`): the field on the collection that holds the chunk content. |
| **Service URL** | Yes | — | The Weaviate endpoint URL. |

### Advanced configurations

<ThemedImage
    alt="Weaviate Vector Store Create form with Advanced Configurations expanded showing HTTP Configuration (default {})."
    sources={{
        light: useBaseUrl('/img/genai/develop/components/vector-stores/11-weaviate-advanced.png'),
        dark: useBaseUrl('/img/genai/develop/components/vector-stores/11-weaviate-advanced.png'),
    }}
/>

| Field | Default | Available values | What it controls |
|---|---|---|---|
| **HTTP Configuration** | `{}` | Record | Standard HTTP knobs. Same fields as [Standard HTTP advanced configurations](model-providers.md#standard-http-advanced-configurations). |

:::info
This connector supports dense vectors only. Weaviate maps the `certainty` score to the `similarityScore` field in the response.
:::

## Selecting a store

| Situation | Recommended |
|---|---|
| Prototyping; tiny dataset; tests | **In-Memory.** No infrastructure required. |
| Already on AWS; don't want to run a vector database | **Amazon S3 Vectors.** |
| Already running PostgreSQL | **pgvector.** Keeps vectors next to your existing data. |
| Want hosted, multi-tenant by default | **Pinecone**. |
| Want open-source plus rich filtering & GraphQL | **Weaviate**. |
| Very large datasets, k8s-native | **Milvus**. |

Selection is based on operational concerns (where your data already lives, what your team already runs). All six satisfy the same Vector Store contract. The rest of the project does not change when you swap.

## What's next

- [Knowledge Bases](knowledge-bases.md) — Combine a vector store with an embedding provider and a chunker.
- [Chunkers](chunkers.md) — Split documents into chunks before embedding for ingestion into a vector store.
- [RAG](../rag/rag.md) — Visual designer walkthrough for RAG ingestion and query in WSO2 Integrator.
