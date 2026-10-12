---
sidebar_position: 4
title: Vector Stores
description: Reference for every vector store in WSO2 Integrator, covering create form fields, advanced configurations, query modes, and metadata filter support for In-Memory, Pinecone, pgvector, Weaviate, and Milvus.
keywords: [wso2 integrator, vector store, embeddings, knowledge base, in-memory, milvus, pgvector, pinecone, weaviate]
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

Multiple filters can be combined with `AND` or `OR`. Each connector handles the exact wire-format mapping (Pinecone uses `$eq`, pgvector compiles to JSONB, Weaviate uses GraphQL `Equal`, and Milvus has its own filter syntax). You write filters the same way regardless of store.

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

- **Add Node** panel > **AI** > **RAG** > **Knowledge Base**.
- Click **+ Add Knowledge Base**, then select **Vector Knowledge Base** from the **Knowledge Bases** picker.
- In the **Create Vector Knowledge Base** form, click **+ Create New Vector Store**.
- The **Select Vector Store** picker opens, listing all supported stores with a search bar at the top:

<ThemedImage
    alt="Select Vector Store picker with a search bar and five cards: In Memory Vector Store described as providing simple storage for vector entries, Milvus Vector Store described as supporting Dense, Sparse, and Hybrid vector search, Pgvector Vector Store described as supporting Dense, Sparse, and Hybrid vector search, Pinecone Vector Store described as supporting Dense, Sparse, and Hybrid vector search, and Weaviate Vector Store described as supporting Dense, Sparse, and Hybrid vector search."
    sources={{
        light: useBaseUrl('/img/genai/develop/components-v5.1/vector-stores/01-select-list-v5.1.png'),
        dark: useBaseUrl('/img/genai/develop/components-v5.1/vector-stores/01-select-list-v5.1.png'),
    }}
/>

## Implementations overview

| Store | Module | Modes supported | Hosted/local |
|---|---|---|---|
| **In-Memory** | `ballerina/ai` | DENSE | Local (process memory) |
| **Milvus** | [`ballerinax/ai.milvus`](https://central.ballerina.io/ballerinax/ai.milvus/latest) | DENSE | Hosted or self-hosted |
| **pgvector** | [`ballerinax/ai.pgvector`](https://central.ballerina.io/ballerinax/ai.pgvector/latest) | DENSE, SPARSE | Self-hosted PostgreSQL |
| **Pinecone** | [`ballerinax/ai.pinecone`](https://central.ballerina.io/ballerinax/ai.pinecone/latest) | DENSE, SPARSE, HYBRID | Hosted |
| **Weaviate** | [`ballerinax/ai.weaviate`](https://central.ballerina.io/ballerinax/ai.weaviate/latest) | DENSE | Hosted or self-hosted |

## In-memory vector store

Embeddings live in the running integration's process memory. The store loses all data on restart, so it is not durable. Use it for development, testing, and small datasets.

### Create form

<ThemedImage
    alt="Create Vector Store form for In-Memory. Header reads 'Initializes a new in-memory vector store.' Banner: 'This operation has no required parameters. Optional settings can be configured below.' Similarity Metric field (default COSINE), Vector Store Name (default ailnmemoryvectorstore), Result Type (locked to ai:InMemoryVectorStore). Save button."
    sources={{
        light: useBaseUrl('/img/genai/develop/components-v5.1/vector-stores/02-in-memory-basic-v5.1.png'),
        dark: useBaseUrl('/img/genai/develop/components-v5.1/vector-stores/02-in-memory-basic-v5.1.png'),
    }}
/>

No required fields. **Similarity Metric** is shown directly on the form:

| Field | Default | Available values | What it controls |
|---|---|---|---|
| **Similarity Metric** | `COSINE` | `COSINE`, `EUCLIDEAN`, `DOT_PRODUCT` | Metric used for vector similarity. |

:::warning
Supports dense vectors only. Adding sparse or hybrid vectors raises an error.
:::

## Milvus

Milvus is an open-source vector database optimized for very large datasets. The collection (and its schema and index) must exist before the connector can use it.

Official website: [Milvus documentation](https://milvus.io/docs).

### Create form

<ThemedImage
    alt="Create Vector Store form for Milvus. Header reads 'Initializes the Milvus vector store with the given configuration.' Fields: Service URL, API Key, Milvus Configuration (record/expression toggle, default {}), HTTP Configuration (default {}), Vector Store Name (default milvusVectorstore), Result Type (locked to milvus:VectorStore). Save button."
    sources={{
        light: useBaseUrl('/img/genai/develop/components-v5.1/vector-stores/03-milvus-basic-v5.1.png'),
        dark: useBaseUrl('/img/genai/develop/components-v5.1/vector-stores/03-milvus-basic-v5.1.png'),
    }}
/>

| Field | Required | Default | Available values |
|---|---|---|---|
| **Service URL** | Yes | N/A | The Milvus service URL. |
| **API Key** | Yes | N/A | Milvus API key (sent as a bearer token). |
| **Milvus Configuration** | Yes | `{}` | Record with collection settings. **Collection Name** (default `"default"`): the Milvus collection to use. **Chunk Field Name** (optional): the field on the collection that holds the chunk content. **Primary Key Field** (default `"id"`): the collection's primary-key field. **Additional Fields** (default `[]`): extra fields to include in search results, on top of `content`, `type`, `vector`, `metadata`. |
| **HTTP Configuration** | No | `{}` | Record. Standard HTTP knobs. Same fields as [Standard HTTP advanced configurations](model-providers.md#standard-http-advanced-configurations). Shown directly on the form. |

:::info
The connector loads the collection into memory automatically before each search. Milvus converts IDs to integers for the primary key field.
:::

## pgvector

The pgvector extension enables vector search inside PostgreSQL. The connector creates the table and an HNSW index automatically on first use.

Official website: [pgvector on GitHub](https://github.com/pgvector/pgvector).

### Create form

The form opens with **Host Name**, **Username**, **Password**, **Database Name**, **Table Name**, and the start of **Port Number**:

<ThemedImage
    alt="Create Vector Store form for pgvector showing Host Name, Username, Password, Database Name, Table Name (default 'vector_store'), and the start of Port Number (default 5432)."
    sources={{
        light: useBaseUrl('/img/genai/develop/components-v5.1/vector-stores/04-pgvector-basic-v5.1.png'),
        dark: useBaseUrl('/img/genai/develop/components-v5.1/vector-stores/04-pgvector-basic-v5.1.png'),
    }}
/>

| Field | Required | Default | Available values |
|---|---|---|---|
| **Host Name** | Yes | N/A | Database host, for example `localhost`. |
| **Username** | Yes | N/A | Database user. |
| **Password** | Yes | N/A | Database password. |
| **Database Name** | Yes | N/A | PostgreSQL database name. |
| **Table Name** | No | `"vector_store"` | Table to store vectors in. Created on first use if missing. |
| **Port Number** | No | `5432` | Any positive integer. Database port. |

Scrolling further shows Additional Set Of Configurations For The Database, Properties To Configure Connection Pool, Configurations For The Vector Store, then **Vector Store Name** and **Result Type**:

<ThemedImage
    alt="Bottom of the pgvector Create Vector Store form showing Additional Set Of Configurations For The Database (default {}), Properties To Configure Connection Pool (default {}), Configurations For The Vector Store (default {}), Vector Store Name set to pgvectorVectorstore, and Result Type locked to pgvector:VectorStore."
    sources={{
        light: useBaseUrl('/img/genai/develop/components-v5.1/vector-stores/05-pgvector-inline-bottom-v5.1.png'),
        dark: useBaseUrl('/img/genai/develop/components-v5.1/vector-stores/05-pgvector-inline-bottom-v5.1.png'),
    }}
/>

| Field | Default | Available values | What it controls |
|---|---|---|---|
| **Additional Set Of Configurations For The Database** | `{}` | Record | Extra PostgreSQL options (SSL mode, connect timeout, and so on). |
| **Properties To Configure Connection Pool** | `{}` | Record | Connection pool settings. |
| **Configurations For The Vector Store** | `{}` | Record (`embeddingType`, `vectorDimension`, `similarityMetric`) | **Embedding Type**: `ai:DENSE` (default) or `ai:SPARSE`. Picks the column type (`vector` vs `sparsevec`). **Vector Dimension**: `1536` by default; must match your embedding provider's output dimension. **Similarity Metric**: `COSINE` (default), `EUCLIDEAN`, or `MANHATTAN`. |

:::info
Auto-created table schema: `id VARCHAR PRIMARY KEY, content TEXT, embedding vector|sparsevec, metadata JSONB`. The connector creates an HNSW index automatically for fast similarity search.
:::

## Pinecone

Pinecone is a hosted vector database with native dense, sparse, and hybrid support. It provides multi-tenancy through namespaces.

Official website: [Pinecone documentation](https://docs.pinecone.io).

### Create form

<ThemedImage
    alt="Create Vector Store form for Pinecone. Header reads 'Initializes the PineconeVectorStore with the given configuration.' Fields: Service URL, API Key, Query Mode (default DENSE), Pinecone Configuration (default {}), HTTP Configuration (default {}), Vector Store Name (default pineconeVectorstore), Result Type (locked to pinecone:VectorStore). Save button."
    sources={{
        light: useBaseUrl('/img/genai/develop/components-v5.1/vector-stores/06-pinecone-basic-v5.1.png'),
        dark: useBaseUrl('/img/genai/develop/components-v5.1/vector-stores/06-pinecone-basic-v5.1.png'),
    }}
/>

| Field | Required | Default | Available values |
|---|---|---|---|
| **Service URL** | Yes | N/A | URL of the Pinecone index endpoint. |
| **API Key** | Yes | N/A | Pinecone API key. |
| **Query Mode** | No | `ai:DENSE` | `ai:DENSE`, `ai:SPARSE`, `ai:HYBRID`. Search mode. |
| **Pinecone Configuration** | No | `{}` | Record (`namespace`, `filters`, `sparseVector`). Pinecone-specific settings. **Namespace** isolates vectors for multi-tenancy. **Filters** sets default metadata filters applied on every query. **Sparse Vector** is needed for hybrid search. |
| **HTTP Configuration** | No | `{}` | Record. Standard HTTP knobs. Same fields as [Standard HTTP advanced configurations](model-providers.md#standard-http-advanced-configurations). |

:::info
`topK` must be in the range 1–10000.
:::

## Weaviate

Weaviate is an open-source vector database with structured filtering and a GraphQL query layer. The connector queries pre-existing collections. Create the collection (with its schema) in Weaviate before connecting.

Official website: [Weaviate documentation](https://weaviate.io/developers/weaviate).

### Create form

<ThemedImage
    alt={"Create Vector Store form for Weaviate. Header reads 'Initializes the Weaviate vector store with the given configuration.' Fields: Service URL, API Key, Weaviate Configuration (record/expression toggle, default '{collectionName: \"\"}'), HTTP Configuration (default {}), Vector Store Name (default weaviateVectorstore), Result Type (locked to weaviate:VectorStore). Save button."}
    sources={{
        light: useBaseUrl('/img/genai/develop/components-v5.1/vector-stores/07-weaviate-basic-v5.1.png'),
        dark: useBaseUrl('/img/genai/develop/components-v5.1/vector-stores/07-weaviate-basic-v5.1.png'),
    }}
/>

| Field | Required | Default | Available values |
|---|---|---|---|
| **Service URL** | Yes | N/A | The Weaviate endpoint URL. |
| **API Key** | Yes | N/A | Weaviate API key (sent as a bearer token). |
| **Weaviate Configuration** | Yes | `{collectionName: ""}` | Record with collection-level config. **Collection Name** (required): the Weaviate collection to use; must already exist. **Chunk Field Name** (optional, default `"content"`): the field on the collection that holds the chunk content. |
| **HTTP Configuration** | No | `{}` | Record. Standard HTTP knobs. Same fields as [Standard HTTP advanced configurations](model-providers.md#standard-http-advanced-configurations). |

:::info
This connector supports dense vectors only. Weaviate maps the `certainty` score to the `similarityScore` field in the response.
:::

## Selecting a store

| Situation | Recommended |
|---|---|
| Prototyping; tiny dataset; tests | **In-Memory.** No infrastructure required. |
| Already running PostgreSQL | **pgvector.** Keeps vectors next to your existing data. |
| Want hosted, multi-tenant by default | **Pinecone**. |
| Want open-source plus rich filtering & GraphQL | **Weaviate**. |
| Very large datasets, k8s-native | **Milvus**. |

Selection is based on operational concerns (where your data already lives, what your team already runs). All five satisfy the same Vector Store contract. The rest of the project does not change when you swap.

## What's next

- [Knowledge Bases](knowledge-bases.md) — Combine a vector store with an embedding provider and a chunker.
- [Chunkers](chunkers.md) — Split documents into chunks before embedding for ingestion into a vector store.
- [RAG](../rag/rag.md) — Visual designer walkthrough for RAG ingestion and query in WSO2 Integrator.
