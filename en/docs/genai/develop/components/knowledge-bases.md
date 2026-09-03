---
sidebar_position: 5
title: Knowledge Bases
description: Reference for every Knowledge Base in WSO2 Integrator. Covers the Vector Knowledge Base, WSO2 Cloud Knowledge Base, and Azure AI Search Knowledge Base, including create form fields, advanced configurations, and the ingest, retrieve, and delete actions.
keywords: [wso2 integrator, knowledge base, rag, vector knowledge base, azure ai search, wso2 cloud, embedding, chunker]
---

# Knowledge Bases

A **Knowledge Base** is a managed store of documents that your integration can index and query. It provides a consistent interface for adding content, retrieving the most relevant chunks for a given query, and removing stale content — regardless of the underlying storage technology.

In WSO2 Integrator, a Knowledge Base is the single object the RAG ingest, retrieve, and delete-by-filter nodes talk to. It uses three pluggable parts (a [Vector Store](./vector-stores.md), an [Embedding Provider](./embedding-providers.md), and a [Chunker](./chunkers.md)) and exposes a small surface for indexing chunks and retrieving the most relevant ones.

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

![Right-side Knowledge Bases panel showing the search bar and a + Add Knowledge Base button at the top of an empty list.](/img/genai/develop/components/knowledge-bases/00-panel-empty.png)

Click **+ Add Knowledge Base** and the **Select Knowledge Base** picker opens:

![Select Knowledge Base picker listing three options: Vector Knowledge Base ('Represents a vector knowledge base for managing chunk indexing and retrieval'), WSO2 Cloud Knowledge Base, and Azure AI Search Knowledge Base ('Represents the Azure Search Knowledge Base implementation').](/img/genai/develop/components/knowledge-bases/01-select-list.png)

## Implementations overview

| Knowledge Base | Module | Storage |
|---|---|---|
| **Vector Knowledge Base** | `ballerina/ai` | Any [Vector Store](./vector-stores.md) |
| **WSO2 Cloud Knowledge Base** | [`ballerinax/ai.wso2.integration`](https://central.ballerina.io/ballerinax/ai.wso2.integration/latest) | Knowledge base service in WSO2 Cloud |
| **Azure AI Search Knowledge Base** | [`ballerinax/ai.azure`](https://central.ballerina.io/ballerinax/ai.azure/latest) | Azure AI Search index |

---

## Vector Knowledge Base

The default implementation. You combine a Vector Store, an Embedding Provider, and a Chunker into a single connection that the rest of your RAG flows share.

### Create form

![Create Vector Knowledge Base form showing three required pluggable fields: Vector Store (with + Create New Vector Store link), Embedding Model (with + Create New Embedding Model link), Chunker (default ai:AUTO, with + Create New Chunker link). Below: Knowledge Base Name aiVectorknowledgebase, Result Type ai:VectorKnowledgeBase.](/img/genai/develop/components/knowledge-bases/02-vector-kb-form.png)

| Field | Required | Default | Available values |
|---|---|---|---|
| **Vector Store** | Yes | — | Any saved [Vector Store](./vector-stores.md) connection. Click **+ Create New Vector Store** to make one inline. |
| **Embedding Model** | Yes | — | Any saved [Embedding Provider](./embedding-providers.md) connection. **Use the same provider on ingest and retrieve.** Embeddings from different providers are not interchangeable. |
| **Chunker** | No | `ai:AUTO` | `ai:AUTO` (chunker chosen automatically based on document type), `ai:DISABLE` (no chunking; each document becomes one chunk), or any saved [Chunker](./chunkers.md) connection. |

There are no Advanced Configurations on the Vector Knowledge Base itself. Every knob lives on the underlying Vector Store, Embedding Provider, or Chunker connection.

---

## WSO2 Cloud Knowledge Base

The easiest way to add a cloud-hosted knowledge base. You first create the knowledge base in WSO2 Cloud, choosing the Vector Store, Embedding Provider, and Chunker yourself; it is provisioned and managed there. If the knowledge base is in your own cloud organization, you can connect to it with a single click. If it is not, you can still configure the connection manually.

### Connect to an existing knowledge base

Unlike with the Vector and Azure AI Search knowledge bases, you don't set up the connection yourself. The credentials are supplied by the environment when the integration runs, so no secrets are stored in your project.

Selecting **WSO2 Cloud Knowledge Base** lists the knowledge bases available in your WSO2 Cloud organization. You need to be signed in to WSO2 Cloud with a project selected for the list to appear.

![List of existing WSO2 Cloud knowledge bases in the signed-in organization, shown below a 'Manually Config WSO2 Cloud Knowledge Base' card.](/img/genai/develop/components/knowledge-bases/05-wso2-cloud-list.png)

Choose one from the **Existing WSO2 Cloud Knowledge Bases** list, and the create form opens with its service URL and credentials already filled in. Click **Save** to create the knowledge base instance.

![Create WSO2 Cloud Knowledge Base form with the Service URL and Knowledge Base Authentication Configuration fields already filled in from the selected knowledge base.](/img/genai/develop/components/knowledge-bases/06-wso2-cloud-prefilled-form.png)

### Configure manually

Choose **Manually Config WSO2 Cloud Knowledge Base** to open a blank form and enter the details yourself.

![Blank Create WSO2 Cloud Knowledge Base form showing the empty Service URL field and the Knowledge Base Authentication Configuration (Token URL, Client ID, Client Secret).](/img/genai/develop/components/knowledge-bases/07-wso2-cloud-manual-form.png)

### Connection Form Details

| Field | Required | Default | Available values |
|---|---|---|---|
| **Service URL** | Yes | — | The endpoint of the knowledge base service in WSO2 Cloud. |
| **Knowledge Base Authentication Configuration** | Yes | — | A bearer token, or OAuth2 client credentials (**Token URL**, **Client ID**, **Client Secret**). Knowledge bases connected from WSO2 Cloud use OAuth2 client credentials. |

#### Advanced configurations

![Create WSO2 Cloud Knowledge Base form with Advanced Configurations expanded showing Minimum Similarity Threshold (default 0.7), Cohere Reranker API Key, Cohere Reranker Model, Reranker Top N (default 5), and Connection Configuration.](/img/genai/develop/components/knowledge-bases/08-wso2-cloud-advanced.png)

| Field | Default | Available values | What it controls |
|---|---|---|---|
| **Minimum Similarity Threshold** | `0.7` | Decimal `0`–`1` | The lowest similarity score a chunk can have and still be returned by `Retrieve`. |
| **Cohere Reranker API Key** | `()` | String or empty | API key for the Cohere reranker. Leave empty to skip reranking. |
| **Cohere Reranker Model** | `()` | String or empty | The Cohere reranker model to use when reranking is enabled. |
| **Reranker Top N** | `5` | Integer | The number of chunks to keep after reranking. |
| **Connection Configuration** | `{}` | Record | HTTP client configuration for the connection to the knowledge base service. See [Standard HTTP Advanced Configurations](./model-providers.md#standard-http-advanced-configurations) for available knobs. |

---

## Azure AI Search Knowledge Base

A Knowledge Base that stores chunks directly in Azure AI Search and uses Azure's hybrid (vector + keyword + semantic) retrieval. Use this when your team already runs Azure AI Search or when you want Azure's semantic ranker on top of vector search.

Official website: [Azure AI Search](https://azure.microsoft.com/services/search/).

> Unlike the Vector Knowledge Base, this one talks to Azure AI Search directly. There is no separate Vector Store connection. The Embedding Provider is optional because Azure can do its own integrated vectorization.

### Create form

![Create Azure AI Search Knowledge Base form showing required fields: Service URL (the Service URL of the Azure AI Search instance), API Key (for authenticating with the Azure AI Search service), Index (name of an existing search index or a search:SearchIndex definition to create), Embedding Model (optional pluggable field with + Create New Embedding Model link), Chunker (default ai:AUTO).](/img/genai/develop/components/knowledge-bases/03-azure-search-basic.png)

| Field | Required | Default | Available values |
|---|---|---|---|
| **Service URL** | Yes | — | Service URL of your Azure AI Search instance. |
| **API Key** | Yes | — | API key for authenticating with the Azure AI Search service. |
| **Index** | Yes | — | The name of an existing search index, or a `search:SearchIndex` definition (a record describing the index schema). When creating a new index, ensure it contains one key field of type string. |
| **Embedding Model** | No | `()` | Any saved [Embedding Provider](./embedding-providers.md) connection. Used for query and ingest if provided. Leave empty to rely on Azure AI Search's integrated vectorization. |
| **Chunker** | No | `ai:AUTO` | `ai:AUTO`, `ai:DISABLE`, or any saved [Chunker](./chunkers.md) connection. |

### Advanced configurations

![Azure AI Search Knowledge Base Create form with Advanced Configurations expanded showing Verbose (default false), API Version (default 2025-09-01), Content Field Name (default 'content'), Search Client Connection Config (default {}), Index Client Connection Config (default {}), Semantic Configuration Name.](/img/genai/develop/components/knowledge-bases/04-azure-search-advanced.png)

| Field | Default | Available values | What it controls |
|---|---|---|---|
| **Verbose** | `false` | `true`, `false` | Whether to enable verbose logging during ingest and retrieve. Useful when debugging. |
| **API Version** | `2025-09-01` | Azure AI Search API version string | The Azure AI Search REST API version to use. |
| **Content Field Name** | `"content"` | String | The name of the field in the index that contains the main chunk content. |
| **Search Client Connection Config** | `{}` | Record | Connection configuration for the Azure AI Search service client. Required only when `Index` is provided as a `search:SearchIndex` definition (i.e. when the connector creates the index for you). See [Standard HTTP Advanced Configurations](./model-providers.md#standard-http-advanced-configurations) for available knobs. |
| **Index Client Connection Config** | `{}` | Record | Connection configuration for the Azure AI Search index client. See [Standard HTTP Advanced Configurations](./model-providers.md#standard-http-advanced-configurations) for available knobs. |
| **Semantic Configuration Name** | `()` | String or empty | The name of the semantic configuration to use for semantic search. Leave empty for plain vector / keyword search. |

> The connector analyzes the index schema on init: it identifies the **key field**, every **vector field**, and verifies the content field exists. If you use Azure AI Search's integrated vectorization, you don't need to provide an Embedding Model.

---

## Selecting a knowledge base

| Situation | Recommended |
|---|---|
| Most projects, especially new ones | **Vector Knowledge Base** with In-Memory (dev) or Pinecone / Pgvector / Weaviate / Milvus (prod). |
| Knowledge base provisioned and managed in WSO2 Cloud | **WSO2 Cloud Knowledge Base**. |
| Already running Azure AI Search; need keyword + vector + semantic ranker | **Azure AI Search Knowledge Base**. |
| Need a custom retrieval source (search engine, graph DB, hand-rolled) | Implement the `ai:KnowledgeBase` contract yourself; the rest of the integration won't change. |

## What's next

- [Chunkers](./chunkers.md) — How documents are split before ingest.
- [Direct LLM Calls](../direct-llm/overview.md) — One-shot generate calls without an agent loop.
- [Natural Functions](../natural-functions/overview.md) — Ballerina functions whose body is plain English, evaluated at runtime by an LLM.
