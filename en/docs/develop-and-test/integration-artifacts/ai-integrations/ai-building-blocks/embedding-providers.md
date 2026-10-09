---
sidebar_position: 3
title: Embedding Providers for Embedding Models
description: Reference for every embedding provider in WSO2 Integrator, covering create form fields, advanced configurations, defaults, and supported embedding models for the Default WSO2 provider, AWS Bedrock, OpenAI, Azure OpenAI, Google Vertex, and OpenRouter.
keywords: [wso2 integrator, embedding provider, embedding model, vector, knowledge base, aws bedrock, amazon titan, cohere, openai, azure openai, google vertex, openrouter]
slug: /develop-and-test/integration-artifacts/ai-integrations/ai-building-blocks/embedding-providers
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

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

In the **Create Vector Knowledge Base** form, click **+ Create New Embedding Model**. The **Select Embedding Provider** picker shows the supported providers.

<ThemedImage
    alt="Select Embedding Provider picker listing Default Embedding Provider (WSO2) at the top, then the Bedrock Embedding Providers group (2 options) expanded to show Bedrock Cohere Embedding Provider and Bedrock Titan Embedding Provider, followed by Azure Embedding Provider, Gemini Embedding Provider, Google Vertex Embedding Provider, OpenAI Embedding Provider, and OpenRouter Embedding Provider, each with a one-line description."
    sources={{
        light: useBaseUrl('/img/genai/develop/components/embedding-providers/01-select-list-v5.1.0.png'),
        dark: useBaseUrl('/img/genai/develop/components/embedding-providers/01-select-list-v5.1.0.png'),
    }}
/>

## Implementations overview

| Provider | Module | API key required? | Default model |
|---|---|---|---|
| **Default WSO2** | `ballerina/ai` | No (signed-in via WSO2) | WSO2-managed |
| **AWS Bedrock** | [`ballerinax/ai.aws.bedrock`](https://central.ballerina.io/ballerinax/ai.aws.bedrock/latest) | AWS credentials or a Bedrock API key | None |
| **Azure OpenAI** | [`ballerinax/ai.azure`](https://central.ballerina.io/ballerinax/ai.azure/latest) | Yes | None |
| **Google Vertex** | [`ballerinax/ai.googleapis.vertex`](https://central.ballerina.io/ballerinax/ai.googleapis.vertex/latest) | OAuth2 / service account | `text-embedding-005` |
| **OpenAI** | [`ballerinax/ai.openai`](https://central.ballerina.io/ballerinax/ai.openai/latest) | Yes | None |
| **OpenRouter** | [`ballerinax/ai.openrouter`](https://central.ballerina.io/ballerinax/ai.openrouter/latest) | Yes | None |

:::info
The HTTP-level advanced configurations on every external embedding provider use the same set of fields as model providers. For the full reference, see [Standard HTTP advanced configurations](model-providers.md#standard-http-advanced-configurations).
:::

## Default WSO2 embedding provider

Routes through the WSO2 intelligence service. The same WSO2 sign-in that unlocks the default model provider unlocks this. No separate key is required.

### Create form

<ThemedImage
    alt="Create Embedding Provider form for the Default WSO2 provider. Banner: 'This is a simple operation that requires no parameters. Specify where to store the result to finish.' Two fields: Embedding Provider Name (default aiWso2embeddingprovider) and Result Type (locked to ai:Wso2EmbeddingProvider). Save button."
    sources={{
        light: useBaseUrl('/img/genai/develop/components/embedding-providers/02-wso2-default.png'),
        dark: useBaseUrl('/img/genai/develop/components/embedding-providers/02-wso2-default.png'),
    }}
/>

This provider has no provider-specific fields and no advanced configurations.

## AWS Bedrock

Amazon Bedrock serves Amazon Titan and Cohere embedding models from your own AWS account and region. The package ships one embedding provider per vendor: **Bedrock Titan Embedding Provider** and **Bedrock Cohere Embedding Provider**. In the **Select Embedding Provider** picker, both are grouped under one **Bedrock Embedding Providers** card.

Official website: [aws.amazon.com/bedrock](https://aws.amazon.com/bedrock/).

### Create form

<ThemedImage
    alt="Create Embedding Provider form for the Bedrock Titan Embedding Provider showing three required fields: Model (select/expression toggle), AWS Credentials (record/expression toggle, with hint 'AWS credentials, or auth:DEFAULT_CREDENTIALS for the default chain'), and Region (select/expression toggle), then the optional Endpoint Configuration. Below: Advanced Configurations Expand link and Embedding Provider Name bedrockTitanembeddingprovider."
    sources={{
        light: useBaseUrl('/img/genai/develop/components/embedding-providers/11-aws-bedrock-titan-basic-v5.1.0.png'),
        dark: useBaseUrl('/img/genai/develop/components/embedding-providers/11-aws-bedrock-titan-basic-v5.1.0.png'),
    }}
/>

Both AWS Bedrock embedding providers have the same create form fields, except **Input Type**, which only the Cohere provider has.

| Field | Required | Default | Available values |
|---|---|---|---|
| **Model** | Yes | — | **Titan**: `amazon.titan-embed-text-v2:0` (1024 dims, configurable down), `amazon.titan-embed-text-v1` (1536 dims). **Cohere**: `cohere.embed-english-v3` (1024 dims), `cohere.embed-multilingual-v3` (1024 dims), `cohere.embed-v4:0` (1536 dims, configurable down). Any other ID that starts with `amazon.titan-embed` (Titan) or `cohere.embed` (Cohere) is also accepted, including cross-region inference profile IDs such as `us.cohere.embed-v4:0`. |
| **AWS Credentials** | Yes | — | `DEFAULT_CREDENTIALS`, or one of the records in [AWS credential options](model-providers.md#aws-credential-options). |
| **Region** | Yes | — | The AWS region to call, for example `us-east-1`. There is no default. |
| **Endpoint Configuration** | No | `()` (derived from Region) | `fips`, `dualstack`, `customEndpoint`. Endpoint variant, or a full URL override such as a VPC endpoint. |
| **Input Type** (Cohere only) | No | `SEARCH_DOCUMENT` | `SEARCH_DOCUMENT`, `SEARCH_QUERY`, `CLASSIFICATION`, `CLUSTERING`. What the embeddings are for. Cohere requires this on every request, so the provider always sends it. |

:::note
`cohere.embed-v4:0` is served in-region only in `us-east-1`, `eu-west-1`, and `ap-northeast-1`. In other regions, use a cross-region inference profile ID instead: `us.cohere.embed-v4:0`, `eu.cohere.embed-v4:0`, or `global.cohere.embed-v4:0`. See the [Embed v4 model card](https://docs.aws.amazon.com/bedrock/latest/userguide/model-card-cohere-embed-v4.html).
:::

### Advanced configurations

<ThemedImage
    alt="Bedrock Cohere Create Embedding Provider form scrolled to Input Type (select/expression toggle, value SEARCH_DOCUMENT, hint 'SEARCH_DOCUMENT for the corpus, SEARCH_QUERY for queries'), then Advanced Configurations expanded showing Truncate, Dimensions, Additional Model Request Fields, Retry Config, and HTTP Config, followed by Embedding Provider Name bedrockCohereembeddingprovider."
    sources={{
        light: useBaseUrl('/img/genai/develop/components/embedding-providers/12-aws-bedrock-cohere-advanced-v5.1.0.png'),
        dark: useBaseUrl('/img/genai/develop/components/embedding-providers/12-aws-bedrock-cohere-advanced-v5.1.0.png'),
    }}
/>

| Field | Provider | Default | Available values | What it controls |
|---|---|---|---|---|
| **Truncate** | Cohere | `()` (model default) | `TRUNCATE_NONE`, `TRUNCATE_START`, `TRUNCATE_END` | How over-long input is handled. `TRUNCATE_NONE` returns an error; the other two drop tokens from the start or the end. |
| **Dimensions** | Both | `()` (model default) | Titan V2: `256`, `512`, `1024`. Cohere Embed v4: `256`, `512`, `1024`, `1536`. | Output vector size. Must match the dimension of your vector store index. Setting it on Titan V1 or Cohere Embed v3 fails when the provider is created. |
| **Normalize** | Titan | `()` (`true` on Titan V2) | `true`, `false` | Whether Titan returns a unit-length vector. |
| **Additional Model Request Fields** | Both | `()` | Open record, for example `{"top_p": 0.9}` | Extra request fields sent to Bedrock unchanged. |
| **Retry Config** | Both | `maxRetries` 3, `initialDelay` 1.0, `maxDelay` 20.0, `backoffFactor` 2.0 | Record | Backoff for throttling and transient errors (408, 429, 500, 502, 503, 504). |
| **HTTP Config** | Both | `{}` | Record | The [Standard HTTP advanced configurations](model-providers.md#standard-http-advanced-configurations), grouped in one record. There is no **Service URL**; use **Endpoint Configuration**. |

:::warning
**Cohere's Input Type affects retrieval quality without raising any error.** Cohere recommends `SEARCH_DOCUMENT` for the content you store and `SEARCH_QUERY` for search queries. A Vector Knowledge Base uses one embedding provider for both ingest and retrieve, so keep the default `SEARCH_DOCUMENT` there. To embed queries with `SEARCH_QUERY`, create a second Cohere provider with that Input Type and use it with an `ai:VectorRetriever` over the same vector store.
:::

**Batch Embed** sends up to 96 chunks per request to Cohere. Titan accepts one text per request, so Titan makes one request per chunk. Both return the embeddings in the same order as the input chunks.

Both providers accept text chunks only. Image or audio chunks return an error.

## Azure OpenAI

Official website: [Azure OpenAI embeddings documentation](https://learn.microsoft.com/azure/ai-services/openai/concepts/models#embeddings-models).

### Create form

<ThemedImage
    alt="Create Embedding Provider form for Azure OpenAI showing four required fields: Access Token, API Version, Deployment ID, Service URL. Below: Advanced Configurations Expand link, Embedding Provider Name azureEmbeddingprovider, Result Type azure:EmbeddingProvider."
    sources={{
        light: useBaseUrl('/img/genai/develop/components/embedding-providers/03-azure-basic.png'),
        dark: useBaseUrl('/img/genai/develop/components/embedding-providers/03-azure-basic.png'),
    }}
/>

| Field | Required | Default | Available values |
|---|---|---|---|
| **Access Token** | Yes | — | Azure OpenAI API key. |
| **API Version** | Yes | — | Azure OpenAI API version, for example `2023-07-01-preview`. |
| **Deployment ID** | Yes | — | Deployment ID for your embedding model deployment. |
| **Service URL** | Yes | — | Base URL of your Azure OpenAI resource, for example `https://your-resource.openai.azure.com`. |

:::info
The model name is implicit in the **deployment** on Azure. There is no **Model Type** field. Pick the model when you create the deployment in the Azure portal.
:::

### Advanced configurations

<ThemedImage
    alt="Azure OpenAI Create Embedding Provider form with Advanced Configurations expanded showing Cache Configuration, Circuit Breaker Configuration, Compression AUTO, Forwarded 'disable', HTTP1 Settings, HTTP2 Settings."
    sources={{
        light: useBaseUrl('/img/genai/develop/components/embedding-providers/04-azure-advanced.png'),
        dark: useBaseUrl('/img/genai/develop/components/embedding-providers/04-azure-advanced.png'),
    }}
/>

For standard HTTP configurations, see [Standard HTTP advanced configurations](model-providers.md#standard-http-advanced-configurations).

## Google Vertex

Official website: [Vertex AI embeddings documentation](https://cloud.google.com/vertex-ai/generative-ai/docs/embeddings).

### Create form

<ThemedImage
    alt="Create Embedding Provider form for Google Vertex showing two required fields: Auth (record/expression toggle, with hint 'OAuth2RefreshConfig for OAuth2 refresh token flow, or ServiceAccountConfig for automatic token refresh via service account') and Project ID. Below: Advanced Configurations Expand link, Embedding Provider Name vertexEmbeddingprovider, Result Type vertex:EmbeddingProvider."
    sources={{
        light: useBaseUrl('/img/genai/develop/components/embedding-providers/05-vertex-basic.png'),
        dark: useBaseUrl('/img/genai/develop/components/embedding-providers/05-vertex-basic.png'),
    }}
/>

| Field | Required | Default | Available values |
|---|---|---|---|
| **Auth** | Yes | — | OAuth2 refresh-token record, a service-account record, or a path to a service-account JSON file. See [Vertex auth options](model-providers.md#vertex-auth-options) on the Model Providers page. |
| **Project ID** | Yes | — | Your Google Cloud project ID. |

### Advanced configurations

<ThemedImage
    alt="Google Vertex Create Embedding Provider form with Advanced Configurations expanded showing Cache Configuration, Circuit Breaker Configuration, Compression AUTO, Forwarded 'disable', HTTP1 Settings, HTTP2 Settings."
    sources={{
        light: useBaseUrl('/img/genai/develop/components/embedding-providers/06-vertex-advanced.png'),
        dark: useBaseUrl('/img/genai/develop/components/embedding-providers/06-vertex-advanced.png'),
    }}
/>

| Field | Default | Available values | What it controls |
|---|---|---|---|
| **Location** | `"global"` | `"global"`, `"us-central1"`, `"europe-west1"`, etc. | Google Cloud region. |
| **Model Type** | `text-embedding-005` | `text-embedding-005`, `text-embedding-004`, `textembedding-gecko-multilingual@001`, `textembedding-gecko@001`. | Vertex embedding model. |
| **Service URL** | `""` (auto-derived) | URL string | Override the regional endpoint. Defaults to `https://\{location\}-aiplatform.googleapis.com`. |

For standard HTTP configurations, see [Standard HTTP advanced configurations](model-providers.md#standard-http-advanced-configurations).

## OpenAI

Official website: [OpenAI Embeddings documentation](https://platform.openai.com/docs/guides/embeddings).

### Create form

<ThemedImage
    alt="Create Embedding Provider form for OpenAI showing two required fields: API Key and Embedding Model Type. Below: Advanced Configurations Expand link, Embedding Provider Name openaiEmbeddingprovider, Result Type openai:EmbeddingProvider."
    sources={{
        light: useBaseUrl('/img/genai/develop/components/embedding-providers/07-openai-basic.png'),
        dark: useBaseUrl('/img/genai/develop/components/embedding-providers/07-openai-basic.png'),
    }}
/>

| Field | Required | Default | Available values |
|---|---|---|---|
| **API Key** | Yes | — | OpenAI API key. Reference a `configurable` in production. |
| **Embedding Model Type** | Yes | — | `text-embedding-3-small` (1536 dims, configurable down), `text-embedding-3-large` (3072 dims, configurable down), `text-embedding-ada-002` (1536 dims). |

### Advanced configurations

<ThemedImage
    alt="OpenAI Create Embedding Provider form with Advanced Configurations expanded showing Cache Configuration, Circuit Breaker Configuration, Compression (default AUTO), Forwarded (default 'disable'), HTTP1 Settings, HTTP2 Settings."
    sources={{
        light: useBaseUrl('/img/genai/develop/components/embedding-providers/08-openai-advanced.png'),
        dark: useBaseUrl('/img/genai/develop/components/embedding-providers/08-openai-advanced.png'),
    }}
/>

| Field | Default | Available values | What it controls |
|---|---|---|---|
| **Service URL** | `https://api.openai.com/v1` | URL string | OpenAI API base URL. |

For standard HTTP configurations, see [Standard HTTP advanced configurations](model-providers.md#standard-http-advanced-configurations).

## OpenRouter

OpenRouter exposes embedding models from many providers behind a single API.

Official website: [openrouter.ai](https://openrouter.ai/).

### Create form

<ThemedImage
    alt="Create Embedding Provider form for OpenRouter showing two required fields: API Key (with link to https://openrouter.ai/keys) and Model Type (with example value 'openai/text-embedding-3-small'). Below: Advanced Configurations Expand link, Embedding Provider Name openrouterEmbeddingprovider, Result Type openrouter:EmbeddingProvider."
    sources={{
        light: useBaseUrl('/img/genai/develop/components/embedding-providers/09-openrouter-basic.png'),
        dark: useBaseUrl('/img/genai/develop/components/embedding-providers/09-openrouter-basic.png'),
    }}
/>

| Field | Required | Default | Available values |
|---|---|---|---|
| **API Key** | Yes | — | OpenRouter API key. |
| **Model Type** | Yes | — | Qualified embedding model name, for example `openai/text-embedding-3-small`. See OpenRouter's [model list](https://openrouter.ai/models). |

### Advanced configurations

<ThemedImage
    alt="OpenRouter Create Embedding Provider form with Advanced Configurations expanded showing Cache Configuration, Circuit Breaker Configuration, Compression AUTO, Forwarded 'disable', HTTP1 Settings, HTTP2 Settings."
    sources={{
        light: useBaseUrl('/img/genai/develop/components/embedding-providers/10-openrouter-advanced.png'),
        dark: useBaseUrl('/img/genai/develop/components/embedding-providers/10-openrouter-advanced.png'),
    }}
/>

| Field | Default | Available values | What it controls |
|---|---|---|---|
| **Service URL** | `https://openrouter.ai/api/v1` | URL string | OpenRouter API base URL. |
| **Site URL** | `()` | URL string or empty | Optional site URL sent as `HTTP-Referer`. |
| **Site Name** | `()` | String or empty | Optional site name sent as `X-OpenRouter-Title`. |

For standard HTTP configurations, see [Standard HTTP advanced configurations](model-providers.md#standard-http-advanced-configurations).

:::warning
OpenRouter's embedding endpoint accepts text-only chunks. Image or audio chunks raise an error.
:::

## Selecting a provider

| Situation | Recommended |
|---|---|
| Prototyping, no infra setup | **Default WSO2**: sign in once, no key needed. |
| Already on OpenAI for chat | **OpenAI**: same key, same vendor. |
| Already on AWS | **AWS Bedrock**: IAM credentials, and requests stay in the AWS region you choose. |
| Already on Azure | **Azure OpenAI**: keep traffic inside your Azure tenant. |
| Already on Google Cloud | **Vertex**: same auth as the rest of GCP. |
| Want one key across many vendors | **OpenRouter**. |

The provider selected at ingest time must remain consistent for the lifetime of the vector store. Switching providers requires re-embedding all stored content.

## What's next

- [Vector Stores](vector-stores.md) — Where the embeddings live.
- [Knowledge Bases](knowledge-bases.md) — The object that ties an embedding provider, a vector store, and a chunker together.
- [Chunkers](chunkers.md) — Split documents into chunks before embedding for ingestion into a vector store.
- [RAG](../rag/rag.md) — WSO2 Integrator walkthrough for ingestion and query flows.
