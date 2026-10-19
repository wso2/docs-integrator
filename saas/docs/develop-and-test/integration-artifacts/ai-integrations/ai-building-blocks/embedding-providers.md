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
    alt="Select Embedding Provider picker with a search bar and six cards: Default Embedding Provider (WSO2), the Bedrock Embedding Providers group (2 options, available in ballerinax/ai.aws.bedrock), Azure Embedding Provider, Google Vertex Embedding Provider, OpenAI Embedding Provider, and OpenRouter Embedding Provider, each with a one-line description."
    sources={{
        light: useBaseUrl('/img/genai/develop/components-v5.1/embedding-providers/01-select-embedding-provider-v5.1.png'),
        dark: useBaseUrl('/img/genai/develop/components-v5.1/embedding-providers/01-select-embedding-provider-v5.1.png'),
    }}
/>

## Supported embedding providers

| Provider | Module | API key required? | Default model |
|---|---|---|---|
| **Default WSO2** | `ballerina/ai` | No (signed-in via WSO2) | WSO2-managed |
| **AWS Bedrock** | [`ballerinax/ai.aws.bedrock`](https://central.ballerina.io/ballerinax/ai.aws.bedrock/latest) | AWS credentials or a Bedrock API key | None |
| **Azure OpenAI** | [`ballerinax/ai.azure`](https://central.ballerina.io/ballerinax/ai.azure/latest) | Yes | None |
| **Google Vertex** | [`ballerinax/ai.googleapis.vertex`](https://central.ballerina.io/ballerinax/ai.googleapis.vertex/latest) | OAuth2 / service account | `text-embedding-005` |
| **OpenAI** | [`ballerinax/ai.openai`](https://central.ballerina.io/ballerinax/ai.openai/latest) | Yes | None |
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

## AWS Bedrock

Amazon Bedrock serves Amazon Titan and Cohere embedding models from your own AWS account and region. The package ships one embedding provider per vendor: **Bedrock Titan Embedding Provider** and **Bedrock Cohere Embedding Provider**. In the **Select Embedding Provider** picker, both are grouped under one **Bedrock Embedding Providers** card.

Official website: [aws.amazon.com/bedrock](https://aws.amazon.com/bedrock/).

### Create form

<ThemedImage
    alt="Create Embedding Provider form for the Bedrock Titan Embedding Provider, headed 'Amazon Titan text embeddings on AWS Bedrock.', showing three required fields: Model (select/expression toggle), Authentication (record/expression toggle, with hint 'AWS credentials or a Bedrock API key; auth:DEFAULT_CREDENTIALS uses the default chain'), and Region (select/expression toggle), then the optional Endpoint Configuration. Below: Advanced Configurations Expand link and Embedding Provider Name bedrockTitanembeddingprovider."
    sources={{
        light: useBaseUrl('/img/genai/develop/components-v5.1/embedding-providers/11-aws-bedrock-titan-basic-v5.1.png'),
        dark: useBaseUrl('/img/genai/develop/components-v5.1/embedding-providers/11-aws-bedrock-titan-basic-v5.1.png'),
    }}
/>

Both AWS Bedrock embedding providers have the same create form fields.

| Field | Required | Default | Available values |
|---|---|---|---|
| **Model** | Yes | — | **Titan**: `amazon.titan-embed-text-v2:0` (1024 dims, configurable down), `amazon.titan-embed-text-v1` (1536 dims). **Cohere**: `cohere.embed-english-v3` (1024 dims), `cohere.embed-multilingual-v3` (1024 dims), `cohere.embed-v4:0` (1536 dims, configurable down). Any other ID that starts with `amazon.titan-embed` (Titan) or `cohere.embed` (Cohere) is also accepted, including cross-region inference profile IDs such as `us.cohere.embed-v4:0`. Model ARNs are not accepted. |
| **Authentication** | Yes | — | `auth:DEFAULT_CREDENTIALS`, one of the AWS credential records, or a Bedrock API key. See [AWS authentication options](model-providers.md#aws-credential-options). |
| **Region** | Yes | — | The AWS region to call, for example `us-east-1`. There is no default. |
| **Endpoint Configuration** | No | `()` (derived from Region) | `fips`, `dualstack`, `customEndpoint`. Endpoint variant, or a full URL override such as a VPC endpoint. |

`cohere.embed-v4:0` is served in-region only in `us-east-1`, `eu-west-1`, and `ap-northeast-1`. In other regions, use a cross-region inference profile ID instead: `us.cohere.embed-v4:0`, `eu.cohere.embed-v4:0`, or `global.cohere.embed-v4:0`. See the [Embed v4 model card](https://docs.aws.amazon.com/bedrock/latest/userguide/model-card-cohere-embed-v4.html).

### Advanced configurations

<ThemedImage
    alt="Bedrock Cohere Create Embedding Provider form scrolled to Endpoint Configuration, then Advanced Configurations expanded showing Input Type (No Selection, with hint 'Input type for every call. Unset: queries for embed, documents for batchEmbed.'), Truncate, Dimensions (hint '256, 512, 1024 or 1536 (Embed v4 only). Defaults to 1536.'), and Additional Model Request Fields."
    sources={{
        light: useBaseUrl('/img/genai/develop/components-v5.1/embedding-providers/12-aws-bedrock-cohere-advanced-v5.1.png'),
        dark: useBaseUrl('/img/genai/develop/components-v5.1/embedding-providers/12-aws-bedrock-cohere-advanced-v5.1.png'),
    }}
/>

| Field | Provider | Default | Available values | What it controls |
|---|---|---|---|---|
| **Input Type** | Cohere | `()` (set per call) | `SEARCH_DOCUMENT`, `SEARCH_QUERY`, `CLASSIFICATION`, `CLUSTERING` | What the embeddings are for. Cohere requires it on every request. When unset, **Embed** sends `SEARCH_QUERY` and **Batch Embed** sends `SEARCH_DOCUMENT`. When set, every call uses that value. |
| **Truncate** | Cohere | `()` (model default) | `TRUNCATE_NONE`, `TRUNCATE_START`, `TRUNCATE_END` | How over-long input is handled. `TRUNCATE_NONE` returns an error; the other two drop tokens from the start or the end. |
| **Dimensions** | Both | `()` (model default) | Titan V2: `256`, `512`, `1024`. Cohere Embed v4: `256`, `512`, `1024`, `1536`. | Output vector size. Must match the dimension of your vector store index. Setting it on Titan V1 or Cohere Embed v3 fails when the provider is created. |
| **Normalize** | Titan | `()` (`true` on Titan V2) | `true`, `false` | Whether Titan returns a unit-length vector. |
| **Additional Model Request Fields** | Both | `()` | Open record, for example `{"top_p": 0.9}` | Extra request fields sent to Bedrock unchanged. |
| **Retry Config** | Both | `maxRetries` 3, `initialDelay` 1.0, `maxDelay` 20.0, `backoffFactor` 2.0 | Record | Backoff for throttling and transient errors (408, 429, 500, 502, 503, 504). |
| **HTTP Config** | Both | `{}` | Record | The [Standard HTTP advanced configurations](model-providers.md#standard-http-advanced-configurations), grouped in one record. There is no **Service URL**; use **Endpoint Configuration**. |

**Cohere's Input Type affects retrieval quality without raising any error.** Cohere recommends `SEARCH_DOCUMENT` for the content you store and `SEARCH_QUERY` for search queries. In a [Vector Knowledge Base](knowledge-bases.md#vector-knowledge-base), leave **Input Type** unset: ingest uses **Batch Embed**, which sends `SEARCH_DOCUMENT`, and retrieve uses **Embed**, which sends `SEARCH_QUERY`. Setting it applies the same value to both.

**Batch Embed** sends up to 96 chunks per request to Cohere. Titan accepts one text per request, so Titan makes one request per chunk. Both return the embeddings in the same order as the input chunks.

Both providers accept text chunks only. Image or audio chunks return an error.

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

## OpenAI

Connects to OpenAI's hosted embedding models.

Official website: [OpenAI embeddings documentation](https://platform.openai.com/docs/guides/embeddings).

### Create form

The form opens with **API Key**, **Embedding Model Type**, and **Service URL**, followed by **HTTP Version**, **Timeout**, and the start of **Forwarded**:

<ThemedImage
    alt="Create Embedding Provider form for OpenAI. Header reads 'Initializes the OpenAI embedding model with the given connection configuration.' Fields shown: API Key, Embedding Model Type (No Selection), Service URL (default https://api.openai.com/v1), HTTP Version (default HTTP_2_0), Timeout (default 60), and the start of Forwarded (default disable)."
    sources={{
        light: useBaseUrl('/img/genai/develop/components-v5.1/embedding-providers/09-openai-basic-v5.1.png'),
        dark: useBaseUrl('/img/genai/develop/components-v5.1/embedding-providers/09-openai-basic-v5.1.png'),
    }}
/>

| Field | Required | Default | Available values |
|---|---|---|---|
| **API Key** | Yes | N/A | The OpenAI API key. Get one from the [OpenAI API keys](https://platform.openai.com/api-keys) page. |
| **Embedding Model Type** | Yes | N/A | `TEXT_EMBEDDING_3_SMALL` (`text-embedding-3-small`), `TEXT_EMBEDDING_3_LARGE` (`text-embedding-3-large`), `TEXT_EMBEDDING_ADA_002` (`text-embedding-ada-002`). The OpenAI embedding model name. |
| **Service URL** | No | `https://api.openai.com/v1` | The base URL of the OpenAI API endpoint. |

Scrolling further shows **Forwarded**, **Compression**, and **Payload Validation**, then the collapsed **Advanced Configurations** toggle, and finally **Embedding Provider Name** and **Result Type**:

<ThemedImage
    alt="Bottom of the OpenAI Create Embedding Provider form showing the end of Timeout, then Forwarded (default disable), Compression (default AUTO), Payload Validation (default true), the collapsed Advanced Configurations toggle, Embedding Provider Name set to openaiEmbeddingprovider, Result Type locked to openai:EmbeddingProvider, and the Save button."
    sources={{
        light: useBaseUrl('/img/genai/develop/components-v5.1/embedding-providers/10-openai-inline-bottom-v5.1.png'),
        dark: useBaseUrl('/img/genai/develop/components-v5.1/embedding-providers/10-openai-inline-bottom-v5.1.png'),
    }}
/>

The connection fields on the form are optional and have these defaults:

| Field | Default | Available values |
|---|---|---|
| **HTTP Version** | `HTTP_2_0` | The HTTP version understood by the client. |
| **Timeout** | `60` | The maximum time to wait (in seconds) for a response before closing the connection. |
| **Forwarded** | `"disable"` | The choice of setting the `forwarded`/`x-forwarded` header. |
| **Compression** | `AUTO` | `AUTO`, `ALWAYS`, `NEVER`. Specifies the way of handling the compression (`accept-encoding`) header. |
| **Payload Validation** | `true` | `true`, `false`. Enables inbound payload validation provided by the constraint package. |
| **Embedding Provider Name** | `openaiEmbeddingprovider` | Name of the embedding-provider connection. |
| **Result Type** | `openai:EmbeddingProvider` | Locked. |

### Advanced configurations

Expanding **Advanced Configurations** shows the exact same panel as the [Standard HTTP advanced configurations](model-providers.md#standard-http-advanced-configurations) section on the Model Providers page. OpenAI adds no provider-specific fields here.

The OpenAI embedding provider accepts text-only chunks. Image or audio chunks raise an error.

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
| Already on AWS | **AWS Bedrock**: IAM credentials, and requests stay in the AWS region you choose, unless you use a cross-region inference profile ID such as `us.cohere.embed-v4:0`. |
| Already on Azure | **Azure OpenAI**: keep traffic inside your Azure tenant. |
| Already on Google Cloud | **Vertex**: same auth as the rest of GCP. |
| Already using OpenAI models | **OpenAI**: use your existing OpenAI API key. |
| Want one key across many vendors | **OpenRouter**. |

The provider selected at ingest time must remain consistent for the lifetime of the vector store. Switching providers requires re-embedding all stored content.

## What's next

- [Vector Stores](vector-stores.md) — Where the embeddings live.
- [Knowledge Bases](knowledge-bases.md) — The object that ties an embedding provider, a vector store, and a chunker together.
- [Chunkers](chunkers.md) — Split documents into chunks before embedding for ingestion into a vector store.
- [RAG](../rag/rag.md) — WSO2 Integrator walkthrough for ingestion and query flows.
