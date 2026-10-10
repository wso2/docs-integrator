---
title: Embedding Providers for Embedding Models
---

# Embedding Providers for Embedding Models

An embedding model converts text into a dense numeric vector that captures semantic meaning. An **Embedding Provider** is WSO2 Integrator's abstraction over these models, giving every supported vendor a consistent interface.

Knowledge Bases use the embedding provider on **ingest** to convert chunks into stored vectors, and again on **retrieve** to convert the user's query into a vector for similarity search.

## Available actions

Every embedding provider exposes the same two actions.

| Action | What it does | Required parameters |
|---|---|---|
| **Embed** | Turns a single chunk into a vector. | **Chunk** (the text to embed). |
| **Batch Embed** | Turns many chunks into vectors in one call. Used by Knowledge Bases on bulk ingest. | **Chunks** (the array of chunks). |

You rarely call these directly. Knowledge Base `ingest` and `retrieve` operations call them for you.

## Where to find embedding providers

- **Add Node** panel > **AI** > **RAG** > **Knowledge Base**.
- Click **+ Add Knowledge Base**, then select **Vector Knowledge Base** from the **Knowledge Bases** picker.
- In the **Create Vector Knowledge Base** form, click **+ Create New Embedding Model**.
- The **Select Embedding Provider** picker opens, listing the available providers with a search bar at the top:

<ThemedImage
    alt="Select Embedding Provider picker with a search bar and four cards: Default Embedding Provider (WSO2), described as a WSO2 embedding provider implementation that provides embedding capabilities using WSO2's AI service; Azure Embedding Provider, described as an interface for interacting with Azure OpenAI Embedding Models; Google Vertex Embedding Provider; and OpenRouter Embedding Provider, both described as a client class that provides an interface for generating vector embeddings."
    sources={{
        light: useBaseUrl('/img/genai/develop/components-v5.1/embedding-providers/01-select-embedding-provider-v5.1.png'),
        dark: useBaseUrl('/img/genai/develop/components-v5.1/embedding-providers/01-select-embedding-provider-v5.1.png'),
    }}
/>

## Implementations overview

| Provider | Module | API key required? | Default model |
|---|---|---|---|
| **Default WSO2** | `ballerina/ai` | No (signed-in via WSO2) | WSO2-managed |
| **Azure OpenAI** | [`ballerinax/ai.azure`](https://central.ballerina.io/ballerinax/ai.azure/latest) | Yes | None |
| **Google Vertex** | [`ballerinax/ai.googleapis.vertex`](https://central.ballerina.io/ballerinax/ai.googleapis.vertex/latest) | OAuth2 / service account | `text-embedding-005` |
| **OpenRouter** | [`ballerinax/ai.openrouter`](https://central.ballerina.io/ballerinax/ai.openrouter/latest) | Yes | None |

The HTTP-level advanced configurations on every external embedding provider use the same set of fields as model providers. For the full reference, see [Standard HTTP advanced configurations](model-providers.md#standard-http-advanced-configurations).

## Default WSO2 embedding provider

Routes through the WSO2 intelligence service. The same WSO2 sign-in that unlocks the default model provider unlocks this. No separate key is required.

### Create form

<ThemedImage
    alt="Create Embedding Provider form for the Default WSO2 provider. Header reads 'Creates a default embedding provider based on the provided wso2ProviderConfig. The embedding vectors have a dimension of 1536.' Banner: 'This is a simple operation that requires no parameters. Specify where to store the result to finish.' Two fields: Embedding Provider Name (default aiWso2embeddingprovider) and Result Type (locked to ai:Wso2EmbeddingProvider). Save button."
    sources={{
        light: useBaseUrl('/img/genai/develop/components-v5.1/embedding-providers/02-wso2-default-v5.1.png'),
        dark: useBaseUrl('/img/genai/develop/components-v5.1/embedding-providers/02-wso2-default-v5.1.png'),
    }}
/>

This provider has no provider-specific fields and no advanced configurations.

## Azure OpenAI

Official website: [Azure OpenAI embeddings documentation](https://learn.microsoft.com/azure/ai-services/openai/concepts/models#embeddings-models).

### Create form

The form opens with **Service URL**, **Access Token**, **API Version**, and **Deployment ID**, followed by the start of **HTTP Version**:

<ThemedImage
    alt="Create Embedding Provider form for Azure OpenAI showing Service URL (with hint to use the v1 GA URL or the legacy URL), Access Token, API Version (default empty, required for legacy service URLs), Deployment ID, and the start of HTTP Version (default HTTP_2_0)."
    sources={{
        light: useBaseUrl('/img/genai/develop/components-v5.1/embedding-providers/03-azure-basic-v5.1.png'),
        dark: useBaseUrl('/img/genai/develop/components-v5.1/embedding-providers/03-azure-basic-v5.1.png'),
    }}
/>

| Field | Required | Default | Available values |
|---|---|---|---|
| **Service URL** | Yes | N/A | Base URL of the Azure OpenAI API endpoint. Use the v1 GA URL (`https://<resource>.services.ai.azure.com/openai/v1`) or the legacy URL (`https://<resource>.openai.azure.com/openai`). |
| **Access Token** | Yes | N/A | Azure OpenAI API key. |
| **API Version** | No | `()` | **Required for legacy (non-`/v1`) service URLs**: a date-based version, e.g. `2023-05-15`. Optional on `/v1` URLs and normally omitted; pass `preview` or `v1` to opt into a specific v1 surface (any other value is ignored on `/v1` URLs). |
| **Deployment ID** | Yes | N/A | Deployment ID for your embedding model deployment. |

The model name is implicit in the **deployment** on Azure. There is no **Model Type** field. Pick the model when you create the deployment in the Azure portal.

Scrolling further shows Timeout, Forwarded, Compression, and Payload Validation, then the collapsed **Advanced Configurations** toggle, and finally **Embedding Provider Name** and **Result Type**:

<ThemedImage
    alt="Bottom of the Azure OpenAI Create Embedding Provider form showing the end of Timeout, then Forwarded, Compression, Payload Validation, the collapsed Advanced Configurations toggle, Embedding Provider Name set to azureEmbeddingprovider, Result Type locked to azure:EmbeddingProvider, and the Save button."
    sources={{
        light: useBaseUrl('/img/genai/develop/components-v5.1/embedding-providers/04-azure-inline-bottom-v5.1.png'),
        dark: useBaseUrl('/img/genai/develop/components-v5.1/embedding-providers/04-azure-inline-bottom-v5.1.png'),
    }}
/>

### Advanced configurations

Expanding **Advanced Configurations** shows the exact same panel as the [Standard HTTP advanced configurations](model-providers.md#standard-http-advanced-configurations) section on the Model Providers page. Azure adds no provider-specific fields here.

## Google Vertex

Official website: [Vertex AI embeddings documentation](https://cloud.google.com/vertex-ai/generative-ai/docs/embeddings).

### Create form

The form opens with **Auth**, **Project ID**, **Location**, **Model Type**, and **Service URL**, followed by the start of **HTTP Version**:

<ThemedImage
    alt="Create Embedding Provider form for Google Vertex showing Auth (record/expression toggle, with hint 'OAuth2RefreshConfig for OAuth2 refresh token flow, or ServiceAccountConfig for automatic token refresh via service account'), Project ID, Location (default 'global'), Model Type (default TEXT_EMBEDDING_005), Service URL (default empty, auto-derived), and the start of HTTP Version (default HTTP_2_0)."
    sources={{
        light: useBaseUrl('/img/genai/develop/components-v5.1/embedding-providers/05-vertex-basic-v5.1.png'),
        dark: useBaseUrl('/img/genai/develop/components-v5.1/embedding-providers/05-vertex-basic-v5.1.png'),
    }}
/>

| Field | Required | Default | Available values |
|---|---|---|---|
| **Auth** | Yes | N/A | OAuth2 refresh-token record, a service-account record, or a path to a service-account JSON file. See [Vertex auth options](model-providers.md#vertex-auth-options) on the Model Providers page. |
| **Project ID** | Yes | N/A | Your Google Cloud project ID. |
| **Location** | No | `"global"` | `"global"`, `"us-central1"`, `"europe-west1"`, etc. Google Cloud region. |
| **Model Type** | No | `text-embedding-005` (shown as `TEXT_EMBEDDING_005`) | `text-embedding-005`, `text-embedding-004`, `textembedding-gecko-multilingual@001`, `textembedding-gecko@001`. Vertex embedding model. |
| **Service URL** | No | `""` (auto-derived) | Override the regional endpoint. Defaults to `https://\{location\}-aiplatform.googleapis.com`. |

Scrolling further shows Timeout, Forwarded, Compression, and Payload Validation, then the collapsed **Advanced Configurations** toggle, and finally **Embedding Provider Name** and **Result Type**:

<ThemedImage
    alt="Bottom of the Google Vertex Create Embedding Provider form showing the end of Timeout, then Forwarded, Compression, Payload Validation, the collapsed Advanced Configurations toggle, Embedding Provider Name set to vertexEmbeddingprovider, Result Type locked to vertex:EmbeddingProvider, and the Save button."
    sources={{
        light: useBaseUrl('/img/genai/develop/components-v5.1/embedding-providers/06-vertex-inline-bottom-v5.1.png'),
        dark: useBaseUrl('/img/genai/develop/components-v5.1/embedding-providers/06-vertex-inline-bottom-v5.1.png'),
    }}
/>

### Advanced configurations

Expanding **Advanced Configurations** shows the exact same panel as the [Standard HTTP advanced configurations](model-providers.md#standard-http-advanced-configurations) section on the Model Providers page. Vertex adds no provider-specific fields here.

## OpenRouter

OpenRouter exposes embedding models from many providers behind a single API.

Official website: [openrouter.ai](https://openrouter.ai/).

### Create form

The form opens with **API Key**, **Model Type**, **Service URL**, **Site URL**, and **Site Name**, followed by the start of **HTTP Version**:

<ThemedImage
    alt="Create Embedding Provider form for OpenRouter showing API Key (with link to https://openrouter.ai/keys), Model Type (with example value openai/text-embedding-3-small), Service URL (default https://openrouter.ai/api/v1), Site URL (default empty), Site Name (default empty), and the start of HTTP Version (default HTTP_2_0)."
    sources={{
        light: useBaseUrl('/img/genai/develop/components-v5.1/embedding-providers/07-openrouter-basic-v5.1.png'),
        dark: useBaseUrl('/img/genai/develop/components-v5.1/embedding-providers/07-openrouter-basic-v5.1.png'),
    }}
/>

| Field | Required | Default | Available values |
|---|---|---|---|
| **API Key** | Yes | N/A | OpenRouter API key. Get one from [openrouter.ai/keys](https://openrouter.ai/keys). |
| **Model Type** | Yes | N/A | Qualified embedding model name, for example `openai/text-embedding-3-small`. See OpenRouter's [model list](https://openrouter.ai/models). |
| **Service URL** | No | `https://openrouter.ai/api/v1` | OpenRouter API base URL. |
| **Site URL** | No | `()` | URL string or empty. Optional site URL sent as the `HTTP-Referer` header, used by OpenRouter for site attribution. |
| **Site Name** | No | `()` | String or empty. Optional site name sent as the `X-OpenRouter-Title` header. |

Scrolling further shows Timeout, Forwarded, Compression, and Payload Validation, then the collapsed **Advanced Configurations** toggle, and finally **Embedding Provider Name** and **Result Type**:

<ThemedImage
    alt="Bottom of the OpenRouter Create Embedding Provider form showing the end of Timeout, then Forwarded, Compression, Payload Validation, the collapsed Advanced Configurations toggle, Embedding Provider Name set to openrouterEmbeddingprovider, Result Type locked to openrouter:EmbeddingProvider, and the Save button."
    sources={{
        light: useBaseUrl('/img/genai/develop/components-v5.1/embedding-providers/08-openrouter-inline-bottom-v5.1.png'),
        dark: useBaseUrl('/img/genai/develop/components-v5.1/embedding-providers/08-openrouter-inline-bottom-v5.1.png'),
    }}
/>

### Advanced configurations

Expanding **Advanced Configurations** shows the exact same panel as the [Standard HTTP advanced configurations](model-providers.md#standard-http-advanced-configurations) section on the Model Providers page. OpenRouter adds no provider-specific fields here.

OpenRouter's embedding endpoint accepts text-only chunks. Image or audio chunks raise an error.

## Selecting a provider

| Situation | Recommended |
|---|---|
| Prototyping, no infra setup | **Default WSO2**: sign in once, no key needed. |
| Already on Azure | **Azure OpenAI**: keep traffic inside your Azure tenant. |
| Already on Google Cloud | **Vertex**: same auth as the rest of GCP. |
| Want one key across many vendors | **OpenRouter**. |

The provider selected at ingest time must remain consistent for the lifetime of the vector store. Switching providers requires re-embedding all stored content.

## What's next

- [Vector Stores](vector-stores.md) — Where the embeddings live.
- [Knowledge Bases](knowledge-bases.md) — The object that ties an embedding provider, a vector store, and a chunker together.
- [Chunkers](chunkers.md) — Split documents into chunks before embedding for ingestion into a vector store.
- [RAG](../rag/rag.md) — WSO2 Integrator walkthrough for ingestion and query flows.
