---
sidebar_position: 5
title: Knowledge Bases
description: Reference for every Knowledge Base in WSO2 Integrator. Covers the Vector Knowledge Base and Azure AI Search Knowledge Base, including create form fields, advanced configurations, and the ingest, retrieve, and delete actions.
keywords: [wso2 integrator, knowledge base, rag, vector knowledge base, azure ai search, embedding, chunker]
slug: /develop-and-test/integration-artifacts/ai-integrations/ai-building-blocks/knowledge-bases
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Knowledge Bases

A **Knowledge Base** is a managed store of documents that your integration can index and query. It provides a consistent interface for adding content, retrieving the most relevant chunks for a given query, and removing stale content, regardless of the underlying storage technology.

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
        light: useBaseUrl('/img/genai/develop/components-v5.1/knowledge-bases/01-panel-empty-v5.1.png'),
        dark: useBaseUrl('/img/genai/develop/components-v5.1/knowledge-bases/01-panel-empty-v5.1.png'),
    }}
/>

Either one opens the **Select Knowledge Base** picker, listing all supported types with a search bar at the top:

<ThemedImage
    alt="Select Knowledge Base picker with a search bar and three cards: Vector Knowledge Base described as managing chunk indexing and retrieval, Azure AI Search Knowledge Base described as the Azure Search Knowledge Base implementation, and WSO2 Cloud Knowledge Base described as a WSO2 Cloud knowledge base for retrieval."
    sources={{
        light: useBaseUrl('/img/genai/develop/components-v5.1/knowledge-bases/02-select-list-v5.1.png'),
        dark: useBaseUrl('/img/genai/develop/components-v5.1/knowledge-bases/02-select-list-v5.1.png'),
    }}
/>

## Implementations overview

| Knowledge Base | Module | Storage |
|---|---|---|
| **Vector Knowledge Base** | `ballerina/ai` | Any [Vector Store](vector-stores.md) |
| **Azure AI Search Knowledge Base** | [`ballerinax/ai.azure`](https://central.ballerina.io/ballerinax/ai.azure/latest) | Azure AI Search index |
| **WSO2 Cloud Knowledge Base** | [`ballerinax/ai.wso2.integration`](https://central.ballerina.io/ballerinax/ai.wso2.integration/latest) | Knowledge base service in WSO2 Cloud |

---

## Vector Knowledge Base

The default implementation. You combine a Vector Store, an Embedding Provider, and a Chunker into a single connection that the rest of your RAG flows share.

### Create form

<ThemedImage
    alt="Create Vector Knowledge Base form showing three required pluggable fields: Vector Store (with + Create New Vector Store link), Embedding Model (with + Create New Embedding Model link), Chunker (default ai:AUTO, with + Create New Chunker link). Below: Knowledge Base Name aiVectorknowledgebase, Result Type ai:VectorKnowledgeBase."
    sources={{
        light: useBaseUrl('/img/genai/develop/components-v5.1/knowledge-bases/03-vector-kb-form-v5.1.png'),
        dark: useBaseUrl('/img/genai/develop/components-v5.1/knowledge-bases/03-vector-kb-form-v5.1.png'),
    }}
/>

| Field | Required | Default | Available values |
|---|---|---|---|
| **Vector Store** | Yes | N/A | Any saved [Vector Store](vector-stores.md) connection. Click **+ Create New Vector Store** to make one inline. |
| **Embedding Model** | Yes | N/A | Any saved [Embedding Provider](embedding-providers.md) connection. **Use the same provider on ingest and retrieve.** Embeddings from different providers are not interchangeable. |
| **Chunker** | No | `ai:AUTO` | `ai:AUTO` (chunker chosen automatically based on document type), `ai:DISABLE` (no chunking; each document becomes one chunk), or any saved [Chunker](chunkers.md) connection. |

There are no Advanced Configurations on the Vector Knowledge Base itself. Every knob lives on the underlying Vector Store, Embedding Provider, or Chunker connection.

---

## Azure AI Search Knowledge Base

A Knowledge Base that stores chunks directly in Azure AI Search and uses Azure's hybrid (vector + keyword + semantic) retrieval. Use this when your team already runs Azure AI Search or when you want Azure's semantic ranker on top of vector search.

Official website: [Azure AI Search](https://azure.microsoft.com/services/search/).

> Unlike the Vector Knowledge Base, this one talks to Azure AI Search directly. There is no separate Vector Store connection. The Embedding Provider is optional because Azure can do its own integrated vectorization.

### Create form

The form opens with **Service URL**, **API Key**, **Index**, **Embedding Model**, **Chunker**, and the start of **Verbose**:

<ThemedImage
    alt="Create Azure AI Search Knowledge Base form showing Service Url, Api Key, Index, Embedding Model (optional, with Create New Embedding Model link), Chunker (default AUTO, with Create New Chunker link), and the start of Verbose (default false)."
    sources={{
        light: useBaseUrl('/img/genai/develop/components-v5.1/knowledge-bases/04-azure-search-basic-v5.1.png'),
        dark: useBaseUrl('/img/genai/develop/components-v5.1/knowledge-bases/04-azure-search-basic-v5.1.png'),
    }}
/>

| Field | Required | Default | Available values |
|---|---|---|---|
| **Service URL** | Yes | N/A | Service URL of your Azure AI Search instance. |
| **API Key** | Yes | N/A | API key for authenticating with the Azure AI Search service. |
| **Index** | Yes | N/A | The name of an existing search index, or a `search:SearchIndex` definition (a record describing the index schema). When creating a new index, ensure it contains one key field of type string. |
| **Embedding Model** | No | `()` | Any saved [Embedding Provider](embedding-providers.md) connection. Used for query and ingest if provided. Leave empty to rely on Azure AI Search's integrated vectorization. |
| **Chunker** | No | `ai:AUTO` | `ai:AUTO`, `ai:DISABLE`, or any saved [Chunker](chunkers.md) connection. |

Scrolling further shows Verbose, API Version, Content Field Name, Search Client Connection Config, Index Client Connection Config, and Semantic Configuration Name:

<ThemedImage
    alt="Create Azure AI Search Knowledge Base form showing Verbose (default false), Api Version (default 2025-09-01), Content Field Name (default content), Search Client Connection Config (default {}), Index Client Connection Config (default {}), and the start of Semantic Configuration Name."
    sources={{
        light: useBaseUrl('/img/genai/develop/components-v5.1/knowledge-bases/05-azure-search-mid-v5.1.png'),
        dark: useBaseUrl('/img/genai/develop/components-v5.1/knowledge-bases/05-azure-search-mid-v5.1.png'),
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

Scrolling to the bottom shows **Knowledge Base Name** and **Result Type**:

<ThemedImage
    alt="Bottom of the Create Azure AI Search Knowledge Base form showing Content Field Name, Search Client Connection Config, Index Client Connection Config, Semantic Configuration Name, Knowledge Base Name set to azureAisearchknowledgebase, and Result Type locked to azure:AiSearchKnowledgeBase."
    sources={{
        light: useBaseUrl('/img/genai/develop/components-v5.1/knowledge-bases/06-azure-search-bottom-v5.1.png'),
        dark: useBaseUrl('/img/genai/develop/components-v5.1/knowledge-bases/06-azure-search-bottom-v5.1.png'),
    }}
/>

> The connector analyzes the index schema on init: it identifies the **key field**, every **vector field**, and verifies the content field exists. If you use Azure AI Search's integrated vectorization, you don't need to provide an Embedding Model.

---

## WSO2 Cloud Knowledge Base

A Knowledge Base that's deployed in WSO2 Cloud. If you don't already have a WSO2 Cloud Knowledge Base deployed in your organization, [create the knowledge base in WSO2 Cloud](https://wso2.com/integration-platform/docs/manage/cloud/rag-ingestion/ingestion) first. It is provisioned and managed there.

### Connect to an existing knowledge base

Selecting **WSO2 Cloud Knowledge Base** lists the knowledge bases available in your WSO2 Cloud organization, above a **Manually Config WSO2 Cloud Knowledge Base** card. You need to be signed in to WSO2 Cloud with a project selected for the list to appear; if none exist yet, only the manual-config card is shown:

<ThemedImage
    alt="WSO2 Cloud Knowledge Bases picker with a search bar and a Manually Config WSO2 Cloud Knowledge Base card ('Add configurations for the Knowledge Base...'). No existing knowledge bases are listed in this organization."
    sources={{
        light: useBaseUrl('/img/genai/develop/components-v5.1/knowledge-bases/07-wso2-cloud-list-v5.1.png'),
        dark: useBaseUrl('/img/genai/develop/components-v5.1/knowledge-bases/07-wso2-cloud-list-v5.1.png'),
    }}
/>

Choosing an existing knowledge base opens the create form with its service URL and credentials already filled in; the credentials are supplied by the environment when the integration runs, so no secrets are stored in your project:

<ThemedImage
    alt="Create WSO2 Cloud Knowledge Base form with the Service URL and Knowledge Base Authentication Configuration fields already filled in from the selected knowledge base."
    sources={{
        light: useBaseUrl('/img/genai/develop/components-v5.1/knowledge-bases/08-wso2-cloud-prefilled-form-v5.1.png'),
        dark: useBaseUrl('/img/genai/develop/components-v5.1/knowledge-bases/08-wso2-cloud-prefilled-form-v5.1.png'),
    }}
/>

### Configure manually

Choose **Manually Config WSO2 Cloud Knowledge Base** to open a blank form and enter the details yourself. The form opens with **Service URL**, **Knowledge Base Authentication Configuration**, **Minimum Similarity Threshold**, **Cohere Reranker API Key**, **Cohere Reranker Model**, **Reranker Top N**, and the start of **HTTP Version**:

<ThemedImage
    alt="Create WSO2 Cloud Knowledge Base form showing Service URL, Knowledge Base Authentication Configuration (default {auth: {token: ''}}), Minimum Similarity Threshold (default 0.7), Cohere Reranker API Key, Cohere Reranker Model, Reranker Top N (default 5), and the start of HTTP Version (default 2.0)."
    sources={{
        light: useBaseUrl('/img/genai/develop/components-v5.1/knowledge-bases/09-wso2-cloud-manual-form-v5.1.png'),
        dark: useBaseUrl('/img/genai/develop/components-v5.1/knowledge-bases/09-wso2-cloud-manual-form-v5.1.png'),
    }}
/>

| Field | Required | Default | Available values |
|---|---|---|---|
| **Service URL** | Yes | N/A | The endpoint of the knowledge base service in WSO2 Cloud. |
| **Knowledge Base Authentication Configuration** | Yes | N/A | A bearer token, or OAuth2 client credentials (**Token URL**, **Client ID**, **Client Secret**). Knowledge bases connected from WSO2 Cloud use OAuth2 client credentials. |
| **Minimum Similarity Threshold** | No | `0.7` | Decimal `0`–`1`. The lowest similarity score a chunk can have and still be returned by `Retrieve`. |
| **Cohere Reranker API Key** | No | `()` | String or empty. API key for the Cohere reranker. Leave empty to skip reranking. |
| **Cohere Reranker Model** | No | `()` | String or empty. The Cohere reranker model to use when reranking is enabled. |
| **Reranker Top N** | No | `5` | Integer. The number of chunks to keep after reranking. |

Scrolling further shows the standard HTTP inline fields: **HTTP1 Settings**, **HTTP2 Settings**, **Timeout**, **Forwarded**, **Cache Configuration**, and the start of **Compression**:

<ThemedImage
    alt="Middle of the Create WSO2 Cloud Knowledge Base form showing HTTP1 Settings (default {}), HTTP2 Settings (default {}), Timeout (default 0.0d), Forwarded (default empty), Cache Configuration (default {}), and the start of Compression (default AUTO)."
    sources={{
        light: useBaseUrl('/img/genai/develop/components-v5.1/knowledge-bases/10-wso2-cloud-manual-mid-v5.1.png'),
        dark: useBaseUrl('/img/genai/develop/components-v5.1/knowledge-bases/10-wso2-cloud-manual-mid-v5.1.png'),
    }}
/>

Continuing the scroll shows **Response Limit Configuration** and **Payload Validation**, then the collapsed **Advanced Configurations** toggle, and finally **Knowledge Base Name** and **Result Type**:

<ThemedImage
    alt="Bottom of the Create WSO2 Cloud Knowledge Base form showing Response Limit Configuration (default {}), Payload Validation (default false), the collapsed Advanced Configurations toggle, Knowledge Base Name set to integrationCloudknowledgebase, and Result Type locked to integration:CloudKnowledgeBase."
    sources={{
        light: useBaseUrl('/img/genai/develop/components-v5.1/knowledge-bases/11-wso2-cloud-manual-bottom-v5.1.png'),
        dark: useBaseUrl('/img/genai/develop/components-v5.1/knowledge-bases/11-wso2-cloud-manual-bottom-v5.1.png'),
    }}
/>

### Advanced configurations

Expanding **Advanced Configurations** shows **Pool Configuration**, **Circuit Breaker Configuration**, **Retry Configuration**, **Secure Socket Configuration**, and **Proxy Configuration**, the same fields as the [Standard HTTP advanced configurations](model-providers.md#standard-http-advanced-configurations) section on the Model Providers page:

<ThemedImage
    alt="Create WSO2 Cloud Knowledge Base form with Advanced Configurations expanded showing Pool Configuration (default {}), Circuit Breaker Configuration (default {}), Retry Configuration (default {}), Secure Socket Configuration (default {}), and Proxy Configuration (default {})."
    sources={{
        light: useBaseUrl('/img/genai/develop/components-v5.1/knowledge-bases/12-wso2-cloud-advanced-v5.1.png'),
        dark: useBaseUrl('/img/genai/develop/components-v5.1/knowledge-bases/12-wso2-cloud-advanced-v5.1.png'),
    }}
/>

---

## Selecting a knowledge base

| Situation | Recommended |
|---|---|
| Most projects, especially new ones | **Vector Knowledge Base** with In-Memory (dev) or Pinecone / Pgvector / Weaviate / Milvus (prod). |
| Knowledge base provisioned and managed in WSO2 Cloud | **WSO2 Cloud Knowledge Base**. |
| Already running Azure AI Search; need keyword + vector + semantic ranker | **Azure AI Search Knowledge Base**. |
| Need a custom retrieval source (search engine, graph DB, hand-rolled) | Implement the `ai:KnowledgeBase` contract yourself; the rest of the integration won't change. |

## What's next

- [Chunkers](chunkers.md) — How documents are split before ingest.
- [Direct LLM Calls](../direct-llm/direct-llm.md) — One-shot generate calls without an agent loop.
- [Natural Functions](../natural-functions/natural-functions.md) — Ballerina functions whose body is plain English, evaluated at runtime by an LLM.
