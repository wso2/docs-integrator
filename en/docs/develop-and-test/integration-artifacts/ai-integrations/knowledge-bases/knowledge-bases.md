---
sidebar_position: 0
sidebar_label: Overview
title: Knowledge Bases Overview
description: Reference for every knowledge base provider WSO2 Integrator supports. Covers the Vector Knowledge Base, the AWS Bedrock knowledge bases, the Azure AI Search Knowledge Base, and the WSO2 Cloud Knowledge Base, including create form fields, advanced configurations, and the retrieve action.
keywords: [wso2 integrator, knowledge base, rag, vector knowledge base, aws bedrock, bedrock knowledge base, azure ai search, wso2 cloud knowledge base, embedding, chunker]
slug: /develop-and-test/integration-artifacts/ai-integrations/knowledge-bases
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Knowledge Bases

A **Knowledge Base** is a managed store of documents that your integration can index and query. It provides a consistent interface for adding content, retrieving the most relevant chunks for a given query, and removing stale content, regardless of the underlying storage technology.

In WSO2 Agent Builder, an agent uses a Knowledge Base as a tool to retrieve the most relevant chunks for a question. It uses three pluggable parts (a [Vector Store](../ai-building-blocks/vector-stores.md), an [Embedding Provider](../ai-building-blocks/embedding-providers.md), and a [Chunker](../ai-building-blocks/chunkers.md)). To learn how a knowledge base grounds agent responses using Retrieval-Augmented Generation (RAG), see [How Knowledge Bases Work](how-knowledge-bases-work.md).

## Available actions

When you add a knowledge base to an agent as a tool, the agent can use the **Retrieve** action. The agent decides the query at runtime and uses the returned chunks to answer.

| Action | What it does | Required parameters | Optional parameters |
|---|---|---|---|
| **Retrieve** | Returns the chunks most similar to a query, optionally filtered by metadata. | **Query** (the search text). | **Top K** (default `10`, use `-1` for all). **Filters** (metadata filter). |

Each `Retrieve` result has the matched chunk and a `similarityScore`.

## Where to find knowledge bases

You add a knowledge base from an agent. Click **+** on the **AI Agent** node to open the **Add Tool** panel, then select **Knowledge Base**. The agent gets a **Retrieve** tool for the knowledge base you pick or create. See [Tools](../agents/tools.md).

The following animation shows how to open the **Add Tool** panel from an agent:

<ThemedImage
    alt="Opening the Add Tool panel from an AI Agent node and selecting Knowledge Base."
    sources={{
        light: useBaseUrl('/img/genai/develop/components-v5.1/knowledge-bases/01-panel-empty-v1.0.gif'),
        dark: useBaseUrl('/img/genai/develop/components-v5.1/knowledge-bases/01-panel-empty-v1.0.gif'),
    }}
/>

This opens the **Select Knowledge Base** picker. It lists all five supported knowledge bases, with the two Bedrock options expanded under **Bedrock Knowledge Bases**:

<ThemedImage
    alt="Agent Builder Add Tool - Use Knowledge Base panel listing Vector Knowledge Base, Bedrock Managed Knowledge Base, Bedrock Self-Managed Knowledge Base, Azure AI Search Knowledge Base, and WSO2 Cloud Knowledge Base."
    sources={{
        light: useBaseUrl('/img/genai/develop/components-v5.1/knowledge-bases/02-select-list-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/components-v5.1/knowledge-bases/02-select-list-v1.0.png'),
    }}
/>

## Supported knowledge bases

| Knowledge Base | Module | Storage |
|---|---|---|
| **Vector Knowledge Base** | `ballerina/ai` | Any [Vector Store](../ai-building-blocks/vector-stores.md) |
| **AWS Bedrock** (Managed and Self-Managed) | [`ballerinax/ai.aws.bedrock`](https://central.ballerina.io/ballerinax/ai.aws.bedrock/latest) | An Amazon Bedrock knowledge base |
| **Azure AI Search Knowledge Base** | [`ballerinax/ai.azure`](https://central.ballerina.io/ballerinax/ai.azure/latest) | Azure AI Search index |
| **WSO2 Cloud Knowledge Base** | [`ballerinax/ai.wso2.integration`](https://central.ballerina.io/ballerinax/ai.wso2.integration/latest) | Knowledge base service in WSO2 Cloud |

---

## Vector Knowledge Base

The default implementation. You combine a Vector Store, an Embedding Provider, and a Chunker into a single connection that the rest of your RAG flows share.

### Create form

After you select the **Retrieve** action, choose an existing knowledge base instance. If the project does not have one yet, click **Create New Knowledge Base**:

<ThemedImage
    alt="Add Tool - Use Knowledge Base panel for the Vector Knowledge Base Retrieve action, with productKb selected and the Create New Knowledge Base link highlighted."
    sources={{
        light: useBaseUrl('/img/genai/develop/components-v5.1/knowledge-bases/03-vector-kb-form-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/components-v5.1/knowledge-bases/03-vector-kb-form-v1.0.png'),
    }}
/>

The create form starts with **Vector Store**, **Embedding Model**, and **Chunker**:

<ThemedImage
    alt="Create Vector Knowledge Base form showing Vector Store, Embedding Model, and Chunker, with links to create each supporting component."
    sources={{
        light: useBaseUrl('/img/genai/develop/components-v5.1/knowledge-bases/03-vector-kb-basic-form-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/components-v5.1/knowledge-bases/03-vector-kb-basic-form-v1.0.png'),
    }}
/>

| Field | Required | Default | Available values |
|---|---|---|---|
| **Vector Store** | Yes | N/A | Any saved [Vector Store](../ai-building-blocks/vector-stores.md) connection. Click **+ Create New Vector Store** to make one inline. |
| **Embedding Model** | Yes | N/A | Any saved [Embedding Provider](../ai-building-blocks/embedding-providers.md) connection. **Use the same provider on ingest and retrieve.** Embeddings from different providers are not interchangeable. |
| **Chunker** | No | `ai:AUTO` | `ai:AUTO` (chunker chosen automatically based on document type), `ai:DISABLE` (no chunking; each document becomes one chunk), or any saved [Chunker](../ai-building-blocks/chunkers.md) connection. |

At the bottom of the form, enter the **Knowledge Base Name**. The **Result Type** is set to `ai:VectorKnowledgeBase`:

<ThemedImage
    alt="Bottom of the Create Vector Knowledge Base form showing Embedding Model, Chunker, Knowledge Base Name, Result Type, and the Save button."
    sources={{
        light: useBaseUrl('/img/genai/develop/components-v5.1/knowledge-bases/03-vector-kb-bottom-form-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/components-v5.1/knowledge-bases/03-vector-kb-bottom-form-v1.0.png'),
    }}
/>

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

Select **Bedrock Managed Knowledge Base**, choose the **Retrieve** action, and click **Create knowledge base**. Agent Builder opens the following form:

<ThemedImage
    alt="Agent Builder Create Managed Knowledge Base modal showing Knowledge Base, Authentication, Region, Data Source ID, and Chunker fields."
    sources={{
        light: useBaseUrl('/img/genai/develop/components-v5.1/knowledge-bases/13-aws-bedrock-basic-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/components-v5.1/knowledge-bases/13-aws-bedrock-basic-v1.0.png'),
    }}
/>

Both AWS Bedrock knowledge bases have the same create form fields, except reranking: **Reranking Model** on the Managed form, **Reranking** on the Self-Managed form.

| Field | Required | Default | Available values |
|---|---|---|---|
| **Knowledge Base** | Yes | — | A knowledge base ID (10 characters, for example `KB12345678`; an ARN is not accepted), or a definition record to find or create by name: `ManagedKnowledgeBaseDefinition` (Managed) or `SelfManagedKnowledgeBaseDefinition` (Self-Managed). See [Definition records](#bedrock-definition-records). The knowledge base must be `ACTIVE`, and of the matching kind: a Managed connection can't attach to a self-managed knowledge base, or the other way round. |
| **Authentication** | Yes | — | `auth:DEFAULT_CREDENTIALS`, or one of the records in [AWS authentication options](../ai-building-blocks/model-providers.md#aws-credential-options) **except Bedrock API key**. |
| **Region** | Yes | — | The AWS region the knowledge base is in, for example `us-east-1`. There is no default. |
| **Data Source ID** | No | `()` (detected) | The ID of the Custom data source that **Ingest** writes to and **Delete By Filter** deletes from. Leave empty when the knowledge base has exactly one Custom data source. Leave it empty also when a definition creates a new knowledge base; the new one gets its data source from the definition. |
| **Chunker** | No | `()` (detected) | `ai:AUTO`, `ai:DISABLE`, or any saved [Chunker](../ai-building-blocks/chunkers.md) connection. Client-side chunking before **Ingest**. Leave empty to follow the data source: `ai:DISABLE` when Bedrock chunks the documents, `ai:AUTO` when the data source's chunking strategy is `NONE`. Setting a chunker when Bedrock chunks the documents fails, because Bedrock would split them again. |
| **Reranking Model** (Managed only) | No | `()` (Bedrock default: managed reranking) | `RERANKING_NONE`, `RERANKING_MANAGED`. Whether Bedrock reranks the results with its managed reranker. Managed reranking is not available on a knowledge base created with your own embedding model. |
| **Reranking** (Self-Managed only) | No | `()` (no reranking) | `modelArn`, optional `numberOfRerankedResults`. Reranks the results with a Bedrock reranker model. `numberOfRerankedResults` can't be higher than **Number Of Results**; creating the connection fails if it is. |
| **Endpoint Configuration** | No | `()` (derived from Region) | `fips` (AWS offers FIPS endpoints for knowledge bases only in `us-east-1` and `us-west-2`), `customEndpoint`. A `customEndpoint` is used for both Bedrock knowledge base endpoints, so it suits a mock or a single gateway. For a VPC endpoint, enable private DNS and leave this empty. `dualstack` is not supported. |
| **Ingest Timeout** | No | `300` | Seconds. How long **Ingest** waits for the documents to be indexed. |

:::warning
**Knowledge bases don't accept Bedrock API keys.** AWS doesn't allow API keys on the Agents for Amazon Bedrock APIs that knowledge bases use, so the **Authentication** field has no API key option. See [Use an Amazon Bedrock API key](https://docs.aws.amazon.com/bedrock/latest/userguide/api-keys-use.html).

The identity needs `bedrock:Retrieve` for **Retrieve**, and the [direct ingestion permissions](https://docs.aws.amazon.com/bedrock/latest/userguide/kb-direct-ingestion-prereq.html) for **Ingest** and **Delete By Filter**. Without them, these actions fail with `AccessDenied`.
:::

### Advanced configurations

| Field | Knowledge base | Default | Available values | What it controls |
|---|---|---|---|---|
| **Number Of Results** | Both | `()` (follows **Top K**, up to `100`) | `1` to `100` | The most results Bedrock returns per search request. Bedrock can return fewer. **Top K** on the **Retrieve** action still limits the total. |
| **Override Search Type** | Self-Managed | `()` (Bedrock chooses) | `SEARCH_SEMANTIC`, `SEARCH_HYBRID` | Vector-only or hybrid (vector and keyword) search. Hybrid search needs a store with a filterable text field. The AWS API reference lists only OpenSearch Serverless; the AWS user guide also lists Aurora PostgreSQL and MongoDB Atlas. Leave empty unless your store supports it. |
| **Retry Config** | Both | `maxRetries` 3, `initialDelay` 1.0, `maxDelay` 20.0, `backoffFactor` 2.0 | Record | Backoff for throttling and transient errors (408, 429, 500, 502, 503, 504). |
| **HTTP Config** | Both | `()` | Record | The [Standard HTTP advanced configurations](../ai-building-blocks/model-providers.md#standard-http-advanced-configurations), grouped in one record. There is no **Service URL**; use **Endpoint Configuration**. |

### Definition records {#bedrock-definition-records}

Use a definition record in **Knowledge Base** to find or create a knowledge base by name.

**`ManagedKnowledgeBaseDefinition`** (Bedrock Managed Knowledge Base):

| Field | Required | Default | What it controls |
|---|---|---|---|
| `name` | Yes | — | Knowledge base name, and the lookup key. Letters and digits, optionally separated by single `_` or `-` characters. |
| `serviceRoleArn` | Yes | — | ARN of the IAM role Bedrock uses to manage the knowledge base. |
| `description` | No | `()` | Description. |
| `dataSource` | No | `{name: "ballerina-custom-source"}` | The Custom data source created with the knowledge base: `name`, optional `description`. |
| `embeddingModel` | No | `()` (Bedrock's own model) | Your own embedding model, as `embeddingModelArn`. The connection always sets 1024 dimensions and `FLOAT32`, which AWS requires for a managed knowledge base. Supported models: Amazon Titan Text Embeddings V2, Cohere Embed English v3, Cohere Embed Multilingual v3, Cohere Embed v4, and Amazon Nova Multimodal Embeddings. This can't be changed later, and rules out `RERANKING_MANAGED`. |
| `kmsKeyArn` | No | `()` (AWS managed key) | A customer-managed KMS key for the stored data. |
| `readyTimeout` | No | `300` | Seconds to wait for a new knowledge base and data source to become ready. |

**`SelfManagedKnowledgeBaseDefinition`** (Bedrock Self-Managed Knowledge Base):

| Field | Required | Default | What it controls |
|---|---|---|---|
| `name` | Yes | — | Knowledge base name, and the lookup key. Letters and digits, optionally separated by single `_` or `-` characters. |
| `serviceRoleArn` | Yes | — | ARN of the IAM role Bedrock uses to manage the knowledge base. It also needs access to your vector store. See [Knowledge base permissions](https://docs.aws.amazon.com/bedrock/latest/userguide/kb-permissions.html). |
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

- **Retrieve** filter support depends on the vector store. AWS notes that `in` and `nin` filters are best supported on OpenSearch Serverless and Neptune Analytics, and that MongoDB Atlas needs filters configured in its vector index before filtering works. See [Manual metadata filtering](https://docs.aws.amazon.com/bedrock/latest/userguide/kb-test-config.html#kb-test-config-filters).

---

## Azure AI Search Knowledge Base

A Knowledge Base that stores chunks directly in Azure AI Search and uses Azure's hybrid (vector + keyword + semantic) retrieval. Use this when your team already runs Azure AI Search or when you want Azure's semantic ranker on top of vector search.

Official website: [Azure AI Search](https://azure.microsoft.com/services/search/).

> Unlike the Vector Knowledge Base, this one talks to Azure AI Search directly. There is no separate Vector Store connection. The Embedding Provider is optional because Azure can do its own integrated vectorization.

### Create form

After you select the **Retrieve** action, click **Create knowledge base** when the project does not already contain an Azure AI Search knowledge base:

<ThemedImage
    alt="Add Tool - Use Knowledge Base panel for Azure AI Search showing no knowledge bases in the project and a Create knowledge base button."
    sources={{
        light: useBaseUrl('/img/genai/develop/components-v5.1/knowledge-bases/04-azure-search-create-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/components-v5.1/knowledge-bases/04-azure-search-create-v1.0.png'),
    }}
/>

The form opens with **Service URL**, **API Key**, **Index**, **Embedding Model**, **Chunker**, and the start of **Verbose**:

<ThemedImage
    alt="Create Azure AI Search Knowledge Base form showing Service Url, Api Key, Index, Embedding Model (optional, with Create New Embedding Model link), Chunker (default AUTO, with Create New Chunker link), and the start of Verbose (default false)."
    sources={{
        light: useBaseUrl('/img/genai/develop/components-v5.1/knowledge-bases/04-azure-search-basic-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/components-v5.1/knowledge-bases/04-azure-search-basic-v1.0.png'),
    }}
/>

| Field | Required | Default | Available values |
|---|---|---|---|
| **Service URL** | Yes | N/A | Service URL of your Azure AI Search instance. |
| **API Key** | Yes | N/A | API key for authenticating with the Azure AI Search service. |
| **Index** | Yes | N/A | The name of an existing search index, or a `search:SearchIndex` definition (a record describing the index schema). When creating a new index, ensure it contains one key field of type string. |
| **Embedding Model** | No | `()` | Any saved [Embedding Provider](../ai-building-blocks/embedding-providers.md) connection. Used for query and ingest if provided. Leave empty to rely on Azure AI Search's integrated vectorization. |
| **Chunker** | No | `ai:AUTO` | `ai:AUTO`, `ai:DISABLE`, or any saved [Chunker](../ai-building-blocks/chunkers.md) connection. |

Scrolling further shows **Embedding Model**, **Chunker**, **Verbose**, and **API Version**:

<ThemedImage
    alt="Create Azure AI Search Knowledge Base form showing Embedding Model, Chunker, Verbose, and API Version."
    sources={{
        light: useBaseUrl('/img/genai/develop/components-v5.1/knowledge-bases/04-azure-search-mid-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/components-v5.1/knowledge-bases/04-azure-search-mid-v1.0.png'),
    }}
/>

| Field | Default | Available values | What it controls |
|---|---|---|---|
| **Verbose** | `false` | `true`, `false` | Whether to enable verbose logging during ingest and retrieve. Useful when debugging. |
| **API Version** | `2025-09-01` | Azure AI Search API version string | The Azure AI Search REST API version to use. |
| **Content Field Name** | `"content"` | String | The name of the field in the index that contains the main chunk content. |
| **Search Client Connection Config** | `{}` | Record | Connection configuration for the Azure AI Search service client. Required only when `Index` is provided as a `search:SearchIndex` definition (i.e. when the connector creates the index for you). See [Standard HTTP Advanced Configurations](../ai-building-blocks/model-providers.md#standard-http-advanced-configurations) for available knobs. |
| **Index Client Connection Config** | `{}` | Record | Connection configuration for the Azure AI Search index client. See [Standard HTTP Advanced Configurations](../ai-building-blocks/model-providers.md#standard-http-advanced-configurations) for available knobs. |
| **Semantic Configuration Name** | `()` | String or empty | The name of the semantic configuration to use for semantic search. Leave empty for plain vector / keyword search. |

Continue scrolling to configure **Content Field Name**, **Search Client Connection Config**, **Index Client Connection Config**, and **Semantic Configuration Name**:

<ThemedImage
    alt="Create Azure AI Search Knowledge Base form showing Content Field Name, Search Client Connection Config, Index Client Connection Config, Semantic Configuration Name, and the start of Knowledge Base Name."
    sources={{
        light: useBaseUrl('/img/genai/develop/components-v5.1/knowledge-bases/04-azure-search-mid-2-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/components-v5.1/knowledge-bases/04-azure-search-mid-2-v1.0.png'),
    }}
/>

Scrolling to the bottom shows **Knowledge Base Name** and **Result Type**:

<ThemedImage
    alt="Bottom of the Create Azure AI Search Knowledge Base form showing Content Field Name, Search Client Connection Config, Index Client Connection Config, Semantic Configuration Name, Knowledge Base Name set to azureAisearchknowledgebase, and Result Type locked to azure:AiSearchKnowledgeBase."
    sources={{
        light: useBaseUrl('/img/genai/develop/components-v5.1/knowledge-bases/04-azure-search-bottom-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/components-v5.1/knowledge-bases/04-azure-search-bottom-v1.0.png'),
    }}
/>

> The connector analyzes the index schema on init: it identifies the **key field**, every **vector field**, and verifies the content field exists. If you use Azure AI Search's integrated vectorization, you don't need to provide an Embedding Model.

---

## WSO2 Cloud Knowledge Base

A Knowledge Base that's deployed in WSO2 Cloud. If you don't already have a WSO2 Cloud Knowledge Base deployed in your organization, create the knowledge base and ingest documents in WSO2 Cloud first. It is provisioned and managed there. See [Knowledge bases in WSO2 Cloud](product://saas/manage/rag-ingestion/knowledge-bases).

### Connect to an existing knowledge base

After you select the **Retrieve** action, click **Create knowledge base** when the project does not already contain a WSO2 Cloud knowledge base:

<ThemedImage
    alt="Add Tool - Use Knowledge Base panel for WSO2 Cloud showing no knowledge bases in the project and a Create knowledge base button."
    sources={{
        light: useBaseUrl('/img/genai/develop/components-v5.1/knowledge-bases/07-wso2-cloud-create-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/components-v5.1/knowledge-bases/07-wso2-cloud-create-v1.0.png'),
    }}
/>

Selecting **WSO2 Cloud Knowledge Base** lists the knowledge bases available in your WSO2 Cloud organization, above a **Manually Config WSO2 Cloud Knowledge Base** card. You need to be signed in to WSO2 Cloud with a project selected for the list to appear; if none exist yet, only the manual-config card is shown:

<ThemedImage
    alt="WSO2 Cloud Knowledge Bases picker with a search bar and a Manually Config WSO2 Cloud Knowledge Base card ('Add configurations for the Knowledge Base...'). No existing knowledge bases are listed in this organization."
    sources={{
        light: useBaseUrl('/img/genai/develop/components-v5.1/knowledge-bases/07-wso2-cloud-list-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/components-v5.1/knowledge-bases/07-wso2-cloud-list-v1.0.png'),
    }}
/>

Choosing an existing knowledge base opens the create form with its service URL and credentials already filled in; the credentials are supplied by the environment when the integration runs, so no secrets are stored in your project:

<ThemedImage
    alt="Create WSO2 Cloud Knowledge Base form with the Service URL and Knowledge Base Authentication Configuration fields already filled in from the selected knowledge base."
    sources={{
        light: useBaseUrl('/img/genai/develop/components-v5.1/knowledge-bases/08-wso2-cloud-prefilled-form-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/components-v5.1/knowledge-bases/08-wso2-cloud-prefilled-form-v1.0.png'),
    }}
/>

The remaining retrieval and HTTP fields stay configurable. Scroll through the form to review **Minimum Similarity Threshold**, the Cohere reranker settings, and **HTTP Version**:

<ThemedImage
    alt="Create WSO2 Cloud Knowledge Base form for an existing cloud knowledge base showing Minimum Similarity Threshold, Cohere reranker settings, and the start of HTTP Version."
    sources={{
        light: useBaseUrl('/img/genai/develop/components-v5.1/knowledge-bases/12-wso2-cloud-advanced-3-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/components-v5.1/knowledge-bases/12-wso2-cloud-advanced-3-v1.0.png'),
    }}
/>

At the bottom, confirm the generated **Knowledge Base Name** and the `integration:CloudKnowledgeBase` result type:

<ThemedImage
    alt="Bottom of the Create WSO2 Cloud Knowledge Base form for an existing cloud knowledge base showing Response Limit Configuration, Payload Validation, Advanced Configurations, the generated Knowledge Base Name, and Result Type."
    sources={{
        light: useBaseUrl('/img/genai/develop/components-v5.1/knowledge-bases/12-wso2-cloud-advanced-4-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/components-v5.1/knowledge-bases/12-wso2-cloud-advanced-4-v1.0.png'),
    }}
/>

### Configure manually

Choose **Manually Config WSO2 Cloud Knowledge Base** to open a blank form and enter the details yourself. The form opens with **Service URL**, **Knowledge Base Authentication Configuration**, **Minimum Similarity Threshold**, **Cohere Reranker API Key**, **Cohere Reranker Model**, **Reranker Top N**, and the start of **HTTP Version**:

<ThemedImage
    alt="Create WSO2 Cloud Knowledge Base form showing Service URL, Knowledge Base Authentication Configuration (default {auth: {token: ''}}), Minimum Similarity Threshold (default 0.7), Cohere Reranker API Key, Cohere Reranker Model, Reranker Top N (default 5), and the start of HTTP Version (default 2.0)."
    sources={{
        light: useBaseUrl('/img/genai/develop/components-v5.1/knowledge-bases/09-wso2-cloud-manual-form-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/components-v5.1/knowledge-bases/09-wso2-cloud-manual-form-v1.0.png'),
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
    alt="Middle of the Create WSO2 Cloud Knowledge Base form showing Cohere Reranker Model, Reranker Top N, HTTP Version, HTTP1 Settings, and the start of HTTP2 Settings."
    sources={{
        light: useBaseUrl('/img/genai/develop/components-v5.1/knowledge-bases/09-wso2-cloud-manual-form-mid-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/components-v5.1/knowledge-bases/09-wso2-cloud-manual-form-mid-v1.0.png'),
    }}
/>

Continue scrolling to configure **Timeout**, **Forwarded**, **Cache Configuration**, **Compression**, and **Response Limit Configuration**:

<ThemedImage
    alt="Create WSO2 Cloud Knowledge Base form showing Timeout, Forwarded, Cache Configuration, Compression, and the start of Response Limit Configuration."
    sources={{
        light: useBaseUrl('/img/genai/develop/components-v5.1/knowledge-bases/09-wso2-cloud-manual-form-mid-2-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/components-v5.1/knowledge-bases/09-wso2-cloud-manual-form-mid-2-v1.0.png'),
    }}
/>

Continuing the scroll shows **Response Limit Configuration** and **Payload Validation**, then the collapsed **Advanced Configurations** toggle, and finally **Knowledge Base Name** and **Result Type**:

<ThemedImage
    alt="Bottom of the Create WSO2 Cloud Knowledge Base form showing Response Limit Configuration (default {}), Payload Validation (default false), the collapsed Advanced Configurations toggle, Knowledge Base Name set to integrationCloudknowledgebase, and Result Type locked to integration:CloudKnowledgeBase."
    sources={{
        light: useBaseUrl('/img/genai/develop/components-v5.1/knowledge-bases/09-wso2-cloud-manual-form-bottom-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/components-v5.1/knowledge-bases/09-wso2-cloud-manual-form-bottom-v1.0.png'),
    }}
/>

### Advanced configurations

Expanding **Advanced Configurations** shows **Pool Configuration**, **Circuit Breaker Configuration**, **Retry Configuration**, **Secure Socket Configuration**, and **Proxy Configuration**, the same fields as the [Standard HTTP advanced configurations](../ai-building-blocks/model-providers.md#standard-http-advanced-configurations) section on the Model Providers page:

<ThemedImage
    alt="Create WSO2 Cloud Knowledge Base form with Advanced Configurations expanded showing Pool Configuration, Circuit Breaker Configuration, Retry Configuration, and Secure Socket Configuration."
    sources={{
        light: useBaseUrl('/img/genai/develop/components-v5.1/knowledge-bases/12-wso2-cloud-advanced-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/components-v5.1/knowledge-bases/12-wso2-cloud-advanced-v1.0.png'),
    }}
/>

At the bottom of the expanded section, configure **Proxy Configuration**, then confirm the knowledge base name and result type:

<ThemedImage
    alt="Bottom of the expanded Advanced Configurations section showing Secure Socket Configuration, Proxy Configuration, Knowledge Base Name, and Result Type."
    sources={{
        light: useBaseUrl('/img/genai/develop/components-v5.1/knowledge-bases/12-wso2-cloud-advanced-2-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/components-v5.1/knowledge-bases/12-wso2-cloud-advanced-2-v1.0.png'),
    }}
/>

---

## Selecting a knowledge base

| Situation | Recommended |
|---|---|
| Most projects, especially new ones | **Vector Knowledge Base** with In-Memory (dev) or Pinecone / Pgvector / Weaviate / Milvus (prod). |
| Already on AWS, or want AWS to handle chunking and embedding | **AWS Bedrock**: Managed if you don't want to run a vector store, Self-Managed if you already run one. |
| Knowledge base provisioned and managed in WSO2 Cloud | **WSO2 Cloud Knowledge Base**. |
| Already running Azure AI Search; need keyword + vector + semantic ranker | **Azure AI Search Knowledge Base**. |
| Need a custom retrieval source (search engine, graph DB, hand-rolled) | Implement the `ai:KnowledgeBase` contract yourself; the rest of the integration won't change. |

## What's next

- [Use with an agent](use-with-an-agent.md) — Give an agent the Retrieve action as a tool.
- [Chunkers](../ai-building-blocks/chunkers.md) — How documents are split before ingest.
