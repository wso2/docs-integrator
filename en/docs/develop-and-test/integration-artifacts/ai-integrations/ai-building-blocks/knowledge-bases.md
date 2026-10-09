---
sidebar_position: 5
title: Knowledge Bases
description: Reference for every Knowledge Base in WSO2 Integrator. Covers the Vector Knowledge Base, the AWS Bedrock knowledge bases, and the Azure AI Search Knowledge Base, including create form fields, advanced configurations, and the ingest, retrieve, and delete actions.
keywords: [wso2 integrator, knowledge base, rag, vector knowledge base, aws bedrock, bedrock knowledge base, azure ai search, embedding, chunker]
slug: /develop-and-test/integration-artifacts/ai-integrations/ai-building-blocks/knowledge-bases
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Knowledge Bases

A **Knowledge Base** is a managed store of documents that your integration can index and query. It provides a consistent interface for adding content, retrieving the most relevant chunks for a given query, and removing stale content — regardless of the underlying storage technology.

In WSO2 Integrator, a Knowledge Base is the single object the RAG ingest, retrieve, and delete-by-filter nodes talk to. It uses three pluggable parts (a [Vector Store](vector-stores.md), an [Embedding Provider](embedding-providers.md), and a [Chunker](chunkers.md)) and exposes a small surface for indexing chunks and retrieving the most relevant ones.

## Available actions

Every Knowledge Base exposes the same three actions in the right-side **Knowledge Bases** panel.

| Action | What it does | Required parameters | Optional parameters |
|---|---|---|---|
| **Ingest** | Takes documents (or chunks), runs them through the configured Chunker, embeds each chunk via the Embedding Provider, and persists the vectors in the Vector Store. | **Documents** (a single document, an array of documents, or an array of chunks). | None. |
| **Retrieve** | Returns the chunks most similar to a query, optionally filtered by metadata. The everyday read action. | **Query** (the search text). | **Top K** (default `10`, use `-1` for all). **Filters** (metadata filter). |
| **Delete By Filter** | Removes every chunk whose metadata matches the given filter. The standard way to evict an old version of a document before re-ingesting. | **Filters** (the metadata filter). | None. |

Each `Retrieve` result has the matched chunk and a `similarityScore`. RAG flows usually pass the result list straight to `ai:augmentUserQuery`, which packages it together with the user's question into a single message ready for `generate`.

## Where to find knowledge bases

Two places, both equivalent:

- **Add Node panel** > **AI** > **RAG** > **Knowledge Base**.
- **Right-side Knowledge Bases panel** > **+ Add Knowledge Base**.

<ThemedImage
    alt="Right-side Knowledge Bases panel showing the search bar and a + Add Knowledge Base button at the top of an empty list."
    sources={{
        light: useBaseUrl('/img/genai/develop/components/knowledge-bases/00-panel-empty.png'),
        dark: useBaseUrl('/img/genai/develop/components/knowledge-bases/00-panel-empty.png'),
    }}
/>

Click **+ Add Knowledge Base** and the **Select Knowledge Base** picker opens:

<ThemedImage
    alt="Select Knowledge Base picker listing Vector Knowledge Base, a Bedrock Knowledge Bases card expanded to its two options (Bedrock Managed Knowledge Base and Bedrock Self-Managed Knowledge Base), Azure AI Search Knowledge Base, and WSO2 Cloud Knowledge Base."
    sources={{
        light: useBaseUrl('/img/genai/develop/components/knowledge-bases/01-select-list-v5.1.0.png'),
        dark: useBaseUrl('/img/genai/develop/components/knowledge-bases/01-select-list-v5.1.0.png'),
    }}
/>

## Implementations overview

| Knowledge Base | Module | Storage |
|---|---|---|
| **Vector Knowledge Base** | `ballerina/ai` | Any [Vector Store](vector-stores.md) |
| **AWS Bedrock** (Managed and Vector) | [`ballerinax/ai.aws.bedrock`](https://central.ballerina.io/ballerinax/ai.aws.bedrock/latest) | An Amazon Bedrock knowledge base |
| **Azure AI Search Knowledge Base** | [`ballerinax/ai.azure`](https://central.ballerina.io/ballerinax/ai.azure/latest) | Azure AI Search index |

---

## Vector Knowledge Base

The default implementation. You combine a Vector Store, an Embedding Provider, and a Chunker into a single connection that the rest of your RAG flows share.

### Create form

<ThemedImage
    alt="Create Vector Knowledge Base form showing three required pluggable fields: Vector Store (with + Create New Vector Store link), Embedding Model (with + Create New Embedding Model link), Chunker (default ai:AUTO, with + Create New Chunker link). Below: Knowledge Base Name aiVectorknowledgebase, Result Type ai:VectorKnowledgeBase."
    sources={{
        light: useBaseUrl('/img/genai/develop/components/knowledge-bases/02-vector-kb-form.png'),
        dark: useBaseUrl('/img/genai/develop/components/knowledge-bases/02-vector-kb-form.png'),
    }}
/>

| Field | Required | Default | Available values |
|---|---|---|---|
| **Vector Store** | Yes | — | Any saved [Vector Store](vector-stores.md) connection. Click **+ Create New Vector Store** to make one inline. |
| **Embedding Model** | Yes | — | Any saved [Embedding Provider](embedding-providers.md) connection. **Use the same provider on ingest and retrieve.** Embeddings from different providers are not interchangeable. |
| **Chunker** | No | `ai:AUTO` | `ai:AUTO` (chunker chosen automatically based on document type), `ai:DISABLE` (no chunking; each document becomes one chunk), or any saved [Chunker](chunkers.md) connection. |

There are no Advanced Configurations on the Vector Knowledge Base itself. Every knob lives on the underlying Vector Store, Embedding Provider, or Chunker connection.

---

## AWS Bedrock

An Amazon Bedrock knowledge base stores, chunks, embeds, and searches your documents inside your own AWS account and region. The package ships two knowledge bases, one for each kind of Bedrock knowledge base:

| Knowledge base | Vector store | When to use |
|---|---|---|
| **Bedrock Managed Knowledge Base** | Run by Bedrock. Nothing to provision. Search is always hybrid (keyword and semantic). | You don't want to run a vector store. |
| **Bedrock Self-Managed Knowledge Base** | Your own, already provisioned: Amazon OpenSearch Serverless, Amazon OpenSearch Service managed cluster, Amazon S3 Vectors, Amazon Aurora PostgreSQL, Amazon Neptune Analytics, Pinecone, Redis Enterprise Cloud, or MongoDB Atlas. | You already run one of these stores, or you need control over indexing and ranking. |

In the **Select Knowledge Base** picker, both are grouped under one **Bedrock Knowledge Bases** card.

Official website: [Amazon Bedrock Knowledge Bases](https://aws.amazon.com/bedrock/knowledge-bases/).

> Unlike the [Vector Knowledge Base](#vector-knowledge-base) above, neither Bedrock knowledge base takes a Vector Store or Embedding Model connection: Bedrock embeds the documents and talks to the vector store itself.

Both knowledge bases work in one of two ways:

- **Attach by ID.** Pass the ID of a knowledge base you already set up in AWS, for example `KB12345678`. **Retrieve** searches every data source on it, including content that AWS connectors such as Amazon S3, SharePoint, or Confluence sync in. **Ingest** and **Delete By Filter** also need the knowledge base to have a **Custom** data source; creating the connection fails, with a message saying why, if it has none.
- **Find or create by name.** Pass a definition record. If a knowledge base with that name exists, the connection attaches to it, after checking that its role, embedding model, and storage match the definition. If none exists, the connection creates the knowledge base and a Custom data source. If more than one has that name, creating the connection fails and lists their IDs.

:::warning
Find or create is meant for a single instance, a local run, or a first-time setup. If two instances of your integration start at the same moment, both can create a knowledge base with the same name, and every later start then fails until you delete one. For a deployment with replicas or restarts, create the knowledge base once and pass its **ID**.
:::

### Create form

<ThemedImage
    alt="Create form for an AWS Bedrock knowledge base, titled 'ai.aws.bedrock : Knowledge Base', showing the required fields Knowledge Base (text/expression toggle), AWS Credentials (record/expression toggle), and Region (select/expression toggle), then Endpoint Configuration (default ()), Chunker (AUTO, with + Create New Chunker), Ingest Timeout, and a collapsed Advanced Configurations section."
    sources={{
        light: useBaseUrl('/img/genai/develop/components/knowledge-bases/05-aws-bedrock-basic-v5.1.0.png'),
        dark: useBaseUrl('/img/genai/develop/components/knowledge-bases/05-aws-bedrock-basic-v5.1.0.png'),
    }}
/>

Both AWS Bedrock knowledge bases have the same create form fields; only the definition record differs.

| Field | Required | Default | Available values |
|---|---|---|---|
| **Knowledge Base** | Yes | — | A knowledge base ID (10 characters, for example `KB12345678`; an ARN is not accepted), or a definition record to find or create by name: `KnowledgeBaseDefinition` (Managed) or `SelfManagedKnowledgeBaseDefinition` (Self-Managed). See [Definition records](#bedrock-definition-records). The knowledge base must be `ACTIVE`, and of the matching kind: a Managed connection can't attach to a self-managed knowledge base, or the other way round. |
| **AWS Credentials** | Yes | — | `DEFAULT_CREDENTIALS`, or one of the records in [AWS credential options](model-providers.md#aws-credential-options) **except Bedrock API key**. |
| **Region** | Yes | — | The AWS region the knowledge base is in, for example `us-east-1`. There is no default. |
| **Endpoint Configuration** | No | `()` (derived from Region) | `fips` (AWS offers FIPS endpoints for knowledge bases only in `us-east-1` and `us-west-2`), `customEndpoint`. A `customEndpoint` is used for both Bedrock knowledge base endpoints, so it suits a mock or a single gateway. For a VPC endpoint, enable private DNS and leave this empty. `dualstack` is not supported. |
| **Chunker** | No | `()` (detected) | `ai:AUTO`, `ai:DISABLE`, or any saved [Chunker](chunkers.md) connection. Client-side chunking before **Ingest**. Leave empty to follow the data source: `ai:DISABLE` when Bedrock chunks the documents, `ai:AUTO` when the data source's chunking strategy is `NONE`. Setting a chunker when Bedrock chunks the documents fails, because Bedrock would split them again. |
| **Ingest Timeout** | No | `300` | Seconds. How long **Ingest** waits for the documents to be indexed. |

:::warning
**Knowledge bases don't accept Bedrock API keys.** AWS doesn't allow API keys on the Agents for Amazon Bedrock APIs that knowledge bases use, so the **AWS Credentials** field has no API key option. See [Use an Amazon Bedrock API key](https://docs.aws.amazon.com/bedrock/latest/userguide/api-keys-use.html).

The credentials need `bedrock:Retrieve` for **Retrieve**, and the [direct ingestion permissions](https://docs.aws.amazon.com/bedrock/latest/userguide/kb-direct-ingestion-prereq.html) for **Ingest** and **Delete By Filter**. Without them, these actions fail with `AccessDenied`.
:::

### Advanced configurations

<ThemedImage
    alt="Create form for the Bedrock Self-Managed Knowledge Base, titled 'ai.aws.bedrock : Knowledge Base', scrolled to Chunker and Ingest Timeout, then Advanced Configurations expanded showing Data Source Id, Number Of Results, Override Search Type, Reranking Configuration, and HTTP Config."
    sources={{
        light: useBaseUrl('/img/genai/develop/components/knowledge-bases/06-aws-bedrock-self-managed-advanced-v5.1.0.png'),
        dark: useBaseUrl('/img/genai/develop/components/knowledge-bases/06-aws-bedrock-self-managed-advanced-v5.1.0.png'),
    }}
/>

| Field | Knowledge base | Default | Available values | What it controls |
|---|---|---|---|---|
| **Data Source Id** | Both | `()` (detected) | Data source ID | The Custom data source that **Ingest** writes to and **Delete By Filter** deletes from. Leave empty when the knowledge base has exactly one Custom data source. |
| **Number Of Results** | Both | `()` (follows **Top K**, up to `100`) | `1` to `100` | The most results Bedrock returns per search request. Bedrock can return fewer. **Top K** on the **Retrieve** action still limits the total. |
| **Reranking Model Type** | Managed | `()` (Bedrock default: managed reranking) | `RERANKING_NONE`, `RERANKING_MANAGED` | Whether Bedrock reranks the results with its managed reranker. Managed reranking is not available on a knowledge base created with your own embedding model. |
| **Override Search Type** | Self-Managed | `()` (Bedrock chooses) | `SEARCH_SEMANTIC`, `SEARCH_HYBRID` | Vector-only or hybrid (vector and keyword) search. Hybrid search needs a store with a filterable text field. The AWS API reference lists only OpenSearch Serverless; the AWS user guide also lists Aurora PostgreSQL and MongoDB Atlas. Leave empty unless your store supports it. |
| **Reranking Configuration** | Self-Managed | `()` (no reranking) | `modelArn`, optional `numberOfRerankedResults` | Reranks the results with a Bedrock reranker model. Bedrock returns at most **Number Of Results** results, even if `numberOfRerankedResults` is higher. |
| **Retry Config** | Both | `maxRetries` 3, `initialDelay` 1.0, `maxDelay` 20.0, `backoffFactor` 2.0 | Record | Backoff for throttling and transient errors (408, 429, 500, 502, 503, 504). |
| **HTTP Config** | Both | `()` | Record | The [Standard HTTP advanced configurations](model-providers.md#standard-http-advanced-configurations), grouped in one record. There is no **Service URL**; use **Endpoint Configuration**. |

### Definition records {#bedrock-definition-records}

Use a definition record in **Knowledge Base** to find or create a knowledge base by name.

**`KnowledgeBaseDefinition`** (Bedrock Managed Knowledge Base):

| Field | Required | Default | What it controls |
|---|---|---|---|
| `name` | Yes | — | Knowledge base name, and the lookup key. Letters and digits, optionally separated by single `_` or `-` characters. |
| `roleArn` | Yes | — | The IAM role Bedrock uses to manage the knowledge base. |
| `description` | No | `()` | Description. |
| `dataSource` | No | `{name: "ballerina-custom-source"}` | The Custom data source created with the knowledge base: `name`, optional `description`. |
| `embeddingModel` | No | `()` (Bedrock's own model) | Your own embedding model: `embeddingModelArn`, `dimensions` (`1024`), `embeddingDataType` (`FLOAT32`). Supported models: Amazon Titan Text Embeddings V2, Cohere Embed English v3, Cohere Embed Multilingual v3, Cohere Embed v4, and Amazon Nova Multimodal Embeddings. This can't be changed later, and rules out `RERANKING_MANAGED`. |
| `kmsKeyArn` | No | `()` (AWS managed key) | A customer-managed KMS key for the stored data. |
| `readyTimeout` | No | `300` | Seconds to wait for a new knowledge base and data source to become ready. |

**`SelfManagedKnowledgeBaseDefinition`** (Bedrock Self-Managed Knowledge Base):

| Field | Required | Default | What it controls |
|---|---|---|---|
| `name` | Yes | — | Knowledge base name, and the lookup key. Letters and digits, optionally separated by single `_` or `-` characters. |
| `roleArn` | Yes | — | The IAM role Bedrock uses to manage the knowledge base. It also needs access to your vector store. See [Knowledge base permissions](https://docs.aws.amazon.com/bedrock/latest/userguide/kb-permissions.html). |
| `description` | No | `()` | Description. |
| `embeddingModelArn` | Yes | — | ARN of the Bedrock embedding model, for example `arn:aws:bedrock:us-east-1::foundation-model/amazon.titan-embed-text-v2:0`. |
| `embeddingModel` | No | `()` (model defaults) | `dimensions` and `embeddingDataType` (`EMBEDDING_FLOAT32`, or `EMBEDDING_BINARY` on OpenSearch only). `dimensions` must match your vector index. |
| `storageConfiguration` | Yes | — | Your vector store, as one of `OpenSearchServerlessStorage`, `OpenSearchManagedClusterStorage`, `S3VectorsStorage`, `RdsStorage`, `NeptuneAnalyticsStorage`, `PineconeStorage`, `RedisEnterpriseCloudStorage`, or `MongoDbAtlasStorage`. The store must already exist. |
| `dataSource` | No | `{name: "ballerina-custom-source"}` | The Custom data source: `name`, optional `description`, `chunkingStrategy` (`FIXED_SIZE` or `NONE`), and for `FIXED_SIZE`, `maxTokens` (`300`) and `overlapPercentage` (`20`). Set `NONE` to chunk with a **Chunker** instead. The strategy can't be changed later. |
| `readyTimeout` | No | `300` | Seconds to wait for a new knowledge base and data source to become ready. |

:::note
**The vector store must already exist.** AWS can create a vector store for you only from the console, not through the API. Create it with the console, Terraform, or AWS CDK first, then reference it in `storageConfiguration`.
:::

### Action behavior

- **Ingest** waits until every document is indexed, or until **Ingest Timeout** passes, so a **Retrieve** right after it finds the documents. It accepts text only. A document with an `id` in its metadata replaces the earlier document with the same `id`. When the connection splits a document into several chunks, the chunks get the IDs `<id>#0`, `<id>#1`, and so on.
- **Retrieve** filter support depends on the vector store. AWS notes that `in` and `nin` filters are best supported on OpenSearch Serverless and Neptune Analytics, and that MongoDB Atlas needs filters configured in its vector index before filtering works. See [Manual metadata filtering](https://docs.aws.amazon.com/bedrock/latest/userguide/kb-test-config.html#kb-test-config-filters).
- **Delete By Filter** needs at least one filter condition, so it can't delete everything by accident. It deletes only from Custom and Amazon S3 data sources. It searches each data source to find the matching documents, so use it for cleanup rather than on every request. If some documents can't be deleted or confirmed, it still deletes the rest and returns an error that names them. Running it again usually deletes the rest.

---

## Azure AI Search Knowledge Base

A Knowledge Base that stores chunks directly in Azure AI Search and uses Azure's hybrid (vector + keyword + semantic) retrieval. Use this when your team already runs Azure AI Search or when you want Azure's semantic ranker on top of vector search.

Official website: [Azure AI Search](https://azure.microsoft.com/services/search/).

> Unlike the Vector Knowledge Base, this one talks to Azure AI Search directly. There is no separate Vector Store connection. The Embedding Provider is optional because Azure can do its own integrated vectorization.

### Create form

<ThemedImage
    alt="Create Azure AI Search Knowledge Base form showing required fields: Service URL (the Service URL of the Azure AI Search instance), API Key (for authenticating with the Azure AI Search service), Index (name of an existing search index or a search:SearchIndex definition to create), Embedding Model (optional pluggable field with + Create New Embedding Model link), Chunker (default ai:AUTO)."
    sources={{
        light: useBaseUrl('/img/genai/develop/components/knowledge-bases/03-azure-search-basic.png'),
        dark: useBaseUrl('/img/genai/develop/components/knowledge-bases/03-azure-search-basic.png'),
    }}
/>

| Field | Required | Default | Available values |
|---|---|---|---|
| **Service URL** | Yes | — | Service URL of your Azure AI Search instance. |
| **API Key** | Yes | — | API key for authenticating with the Azure AI Search service. |
| **Index** | Yes | — | The name of an existing search index, or a `search:SearchIndex` definition (a record describing the index schema). When creating a new index, ensure it contains one key field of type string. |
| **Embedding Model** | No | `()` | Any saved [Embedding Provider](embedding-providers.md) connection. Used for query and ingest if provided. Leave empty to rely on Azure AI Search's integrated vectorization. |
| **Chunker** | No | `ai:AUTO` | `ai:AUTO`, `ai:DISABLE`, or any saved [Chunker](chunkers.md) connection. |

### Advanced configurations

<ThemedImage
    alt="Azure AI Search Knowledge Base Create form with Advanced Configurations expanded showing Verbose (default false), API Version (default 2025-09-01), Content Field Name (default 'content'), Search Client Connection Config (default {}), Index Client Connection Config (default {}), Semantic Configuration Name."
    sources={{
        light: useBaseUrl('/img/genai/develop/components/knowledge-bases/04-azure-search-advanced.png'),
        dark: useBaseUrl('/img/genai/develop/components/knowledge-bases/04-azure-search-advanced.png'),
    }}
/>

| Field | Default | Available values | What it controls |
|---|---|---|---|
| **Verbose** | `false` | `true`, `false` | Whether to enable verbose logging during ingest and retrieve. Useful when debugging. |
| **API Version** | `2025-09-01` | Azure AI Search API version string | The Azure AI Search REST API version to use. |
| **Content Field Name** | `"content"` | String | The name of the field in the index that contains the main chunk content. |
| **Search Client Connection Config** | `{}` | Record | Connection configuration for the Azure AI Search service client. Required only when `Index` is provided as a `search:SearchIndex` definition (i.e. when the connector creates the index for you). See [Standard HTTP Advanced Configurations](model-providers.md#standard-http-advanced-configurations) for available knobs. |
| **Index Client Connection Config** | `{}` | Record | Connection configuration for the Azure AI Search index client. See [Standard HTTP Advanced Configurations](model-providers.md#standard-http-advanced-configurations) for available knobs. |
| **Semantic Configuration Name** | `()` | String or empty | The name of the semantic configuration to use for semantic search. Leave empty for plain vector / keyword search. |

> The connector analyzes the index schema on init: it identifies the **key field**, every **vector field**, and verifies the content field exists. If you use Azure AI Search's integrated vectorization, you don't need to provide an Embedding Model.

---

## Selecting a knowledge base

| Situation | Recommended |
|---|---|
| Most projects, especially new ones | **Vector Knowledge Base** with In-Memory (dev) or Pinecone / Pgvector / Weaviate / Milvus (prod). |
| Already on AWS, or want AWS to handle chunking and embedding | **AWS Bedrock**: Managed if you don't want to run a vector store, Self-Managed if you already run one. |
| Already running Azure AI Search; need keyword + vector + semantic ranker | **Azure AI Search Knowledge Base**. |
| Need a custom retrieval source (search engine, graph DB, hand-rolled) | Implement the `ai:KnowledgeBase` contract yourself; the rest of the integration won't change. |

## What's next

- [Chunkers](chunkers.md) — How documents are split before ingest.
- [Direct LLM Calls](../direct-llm/direct-llm.md) — One-shot generate calls without an agent loop.
- [Natural Functions](../natural-functions/natural-functions.md) — Ballerina functions whose body is plain English, evaluated at runtime by an LLM.
