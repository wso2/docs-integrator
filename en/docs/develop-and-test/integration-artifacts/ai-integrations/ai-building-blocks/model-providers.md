---
sidebar_position: 2
title: Model Providers for LLMs
description: Reference for every model provider for LLM in WSO2 Integrator, covering create form fields, advanced configurations, defaults, and supported models for the Default WSO2 provider, OpenAI, Azure OpenAI, Anthropic, Google Vertex, Mistral, DeepSeek, Ollama, and OpenRouter.
keywords: [wso2 integrator, model provider, llm, large language model, ai, anthropic, openai, azure openai, google vertex, mistral, deepseek, ollama, openrouter, gpt-5, responses api, reasoning effort]
slug: /develop-and-test/integration-artifacts/ai-integrations/ai-building-blocks/model-providers
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Model Providers for LLMs

A **Large Language Model (LLM)** is a neural network trained on large text corpora. You send it a prompt (a text instruction) and it generates a response. LLMs power natural language tasks such as answering questions, summarizing content, extracting structured data, and planning and executing tool calls.

A **Model Provider** is WSO2 Integrator's unified abstraction over LLMs. It wraps the provider-specific API behind a consistent interface, so Direct LLM Calls, Natural Functions, the RAG `generate` node, and AI agents all work the same way regardless of which LLM you choose. Pick a provider, fill in the form, and click **Save**.

Every model provider exposes the same two actions, so switching LLMs is a connection-level swap that leaves the rest of your flow unchanged.

## Available actions

Every model provider exposes the following actions.

| Action | What it does | Required parameters | Optional parameters |
|---|---|---|---|
| **Generate** | Sends a prompt to the model and binds the response to a typed Ballerina value. The everyday action behind a `generate` node, a Natural Function, or RAG `ai:generate`. | **Prompt** (the instruction template), **Expected Type** (the type the response is parsed into) | None per call. Anything you want to tune (temperature, max tokens) lives on the connection. |
| **Chat** | Sends a list of chat messages and (optionally) tool definitions; returns the model's reply, including any tool calls. Used by Agents. | **Messages** (the conversation), **Tools** (tool definitions for tool calling) | **Stop** (a stop sequence). |

:::note
Per-call overrides are not exposed in the form. Anything that varies per request belongs in the prompt; anything that varies across the project is set once on the connection (see [Standard HTTP advanced configurations](#standard-http-advanced-configurations) below).
:::

## Where to find model providers for LLM

- **Add Node** panel > **AI** > **Direct LLM** > **Model Provider** 

<ThemedImage
    alt="Right-side Model Providers panel showing the search bar and a + Add Model Provider button at the top of an empty list."
    sources={{
        light: useBaseUrl('/img/genai/develop/components-v5.1/model-providers/01-panel-empty-v5.1.png'),
        dark: useBaseUrl('/img/genai/develop/components-v5.1/model-providers/01-panel-empty-v5.1.png'),
    }}
/>

- Click **+ Add Model Provider** and the **Select Model Provider** picker opens with a card for each provider type:

<ThemedImage
    alt="Select Model Provider picker listing Default Model Provider (WSO2), Anthropic, Azure OpenAI, DeepSeek, Google Vertex, Mistral, Ollama, OpenAI, with one-line descriptions for each."
    sources={{
        light: useBaseUrl('/img/genai/develop/components-v5.1/model-providers/02-select-list-top-v5.1.png'),
        dark: useBaseUrl('/img/genai/develop/components-v5.1/model-providers/02-select-list-top-v5.1.png'),
    }}
/>

Scroll to see the remaining options:

<ThemedImage
    alt="Select Model Provider picker scrolled to show DeepSeek (highlighted), Google Vertex, Mistral, Ollama, OpenAI, and OpenRouter Model Provider entries."
    sources={{
        light: useBaseUrl('/img/genai/develop/components-v5.1/model-providers/03-select-list-bottom-v5.1.png'),
        dark: useBaseUrl('/img/genai/develop/components-v5.1/model-providers/03-select-list-bottom-v5.1.png'),
    }}
/>

## Implementations overview

| Provider | Module | API key required? | Has embedding provider? |
|---|---|---|---|
| **Default WSO2** | `ballerina/ai` | No (signed-in via WSO2) | Yes. See [Default WSO2 Embedding Provider](embedding-providers.md#default-wso2-embedding-provider) |
| **Anthropic** | [`ballerinax/ai.anthropic`](https://central.ballerina.io/ballerinax/ai.anthropic/latest) | Yes | No |
| **Azure OpenAI** | [`ballerinax/ai.azure`](https://central.ballerina.io/ballerinax/ai.azure/latest) | Yes | Yes |
| **DeepSeek** | [`ballerinax/ai.deepseek`](https://central.ballerina.io/ballerinax/ai.deepseek/latest) | Yes | No |
| **Google Vertex** | [`ballerinax/ai.googleapis.vertex`](https://central.ballerina.io/ballerinax/ai.googleapis.vertex/latest) | OAuth2 / service account | Yes |
| **Mistral** | [`ballerinax/ai.mistral`](https://central.ballerina.io/ballerinax/ai.mistral/latest) | Yes | No |
| **Ollama** | [`ballerinax/ai.ollama`](https://central.ballerina.io/ballerinax/ai.ollama/latest) | No (local) | No |
| **OpenAI** | [`ballerinax/ai.openai`](https://central.ballerina.io/ballerinax/ai.openai/latest) | Yes | Yes |
| **OpenRouter** | [`ballerinax/ai.openrouter`](https://central.ballerina.io/ballerinax/ai.openrouter/latest) | Yes | Yes |

## Standard HTTP advanced configurations

Every provider with a hosted endpoint (all providers except the Default WSO2 provider, which is preconfigured) shares the **same** HTTP-level configurations. They tune the underlying HTTP client and apply to every request the provider makes. These are split across two parts of the Create form, and **this split and these exact fields are identical on every provider's form**. The per-provider sections below don't repeat the screenshots, they just note where the provider's own fields sit relative to this standard set.

**Shown directly on the form**, below the provider-specific fields:

| Field | Default | Available values | What it controls |
|---|---|---|---|
| **Service URL** | provider-specific | URL string | Override the provider's API base URL - useful for OpenAI-compatible gateways or self-hosted endpoints. |
| **Maximum Tokens** | `512` | Any positive integer | Hard cap on the response length. |
| **Temperature** | `0.7` | `0.0`-`2.0` (provider-dependent) | Sampling temperature. Lower = more deterministic, higher = more creative. Use `0.0` for the most reproducible results. |
| **HTTP Version** | `HTTP_2_0` | `HTTP_1_1`, `HTTP_2_0` | The HTTP version used for requests. |
| **Timeout** | `60` (seconds) | Any positive number | Per-request timeout. |
| **Forwarded** | `"disable"` | `"disable"`, `"enable"`, `"transient"` | Whether to set `Forwarded` / `X-Forwarded-For` headers when behind a proxy. |
| **Compression** | `AUTO` | `AUTO`, `ALWAYS`, `NEVER` | `accept-encoding` handling. |
| **Payload Validation** | `true` | `true`, `false` | Inbound payload validation. |

**Behind the collapsed Advanced Configurations toggle**, further down the same form:

<ThemedImage
    alt="Advanced Configurations expanded (shown here for Anthropic; every other provider's panel shows the exact same fields) with HTTP1 Settings, HTTP2 Settings, Pool Configuration, Cache Configuration, Circuit Breaker Configuration, and the start of Retry Configuration, each defaulting to {}."
    sources={{
        light: useBaseUrl('/img/genai/develop/components-v5.1/model-providers/04-advanced-configurations-top-v5.1.png'),
        dark: useBaseUrl('/img/genai/develop/components-v5.1/model-providers/04-advanced-configurations-top-v5.1.png'),
    }}
/>

| Field | Default | Available values | What it controls |
|---|---|---|---|
| **HTTP1 Settings** | `{}` | Record (keep-alive, version, chunking) | HTTP/1.x protocol settings. |
| **HTTP2 Settings** | `{}` | Record | HTTP/2 protocol settings. |
| **Pool Configuration** | `{}` | Record (max active, idle time) | Request pool settings. |
| **Cache Configuration** | `{}` | Record | HTTP response caching. |
| **Circuit Breaker Configuration** | `{}` | Record (`rollingWindow`, `failureThreshold`, `resetTime`, `statusCodes`) | Open the breaker on repeated failures so calls fail fast and recover. |
| **Retry Configuration** | `{}` | Record (`count`, `interval`, `backOffFactor`, `maxWaitInterval`, `statusCodes`) | Retry on failure. |
| **Response Limit Configuration** | `{}` | Record (max body, max headers) | Maximum inbound response size. |
| **Secure Socket Configuration** | `()` | Record (trust store, key store, client auth) | TLS / SSL options. |
| **Proxy Configuration** | `()` | Record (host, port, userName, password) | HTTP proxy settings. |

Scrolling further down the expanded section shows Retry Configuration, Response Limit Configuration, Secure Socket Configuration, and Proxy Configuration, followed by the always-visible **Model Provider Name** and **Result Type** fields (see the [Default WSO2 model provider](#default-wso2-model-provider) form below):

<ThemedImage
    alt="Bottom of the expanded Advanced Configurations section (shown here for Anthropic) showing Retry Configuration, Response Limit Configuration, Secure Socket Configuration, and Proxy Configuration, each defaulting to {} or ()."
    sources={{
        light: useBaseUrl('/img/genai/develop/components-v5.1/model-providers/05-advanced-configurations-bottom-v5.1.png'),
        dark: useBaseUrl('/img/genai/develop/components-v5.1/model-providers/05-advanced-configurations-bottom-v5.1.png'),
    }}
/>

:::note
This is the one Advanced Configurations screenshot in this page. Every provider's Create form shows this exact same panel. Where a provider section below says "see Standard HTTP advanced configurations," it means expanding **Advanced Configurations** on that provider's form looks exactly like the two screenshots above, with no provider-specific additions.
:::

## Default WSO2 model provider

Provided by the core `ballerina/ai` package. Routes through the WSO2 intelligence service. **No API key in your source**. A one-time WSO2 sign-in writes the credentials into your project's `Config.toml`. The fastest way to get an LLM running while you're prototyping.

### Create form

<ThemedImage
    alt="Create Model Provider form for the Default WSO2 provider. Header reads 'Creates a default model provider based on the provided wso2ProviderConfig'. Banner: 'This is a simple operation that requires no parameters. Specify where to store the result to finish.' Two fields: Model Provider Name (default aiWso2modelprovider) and Result Type (locked to ai:Wso2ModelProvider). Save button."
    sources={{
        light: useBaseUrl('/img/genai/develop/components-v5.1/model-providers/06-wso2-default-v5.1.png'),
        dark: useBaseUrl('/img/genai/develop/components-v5.1/model-providers/06-wso2-default-v5.1.png'),
    }}
/>

No provider-specific fields. Sign in with your WSO2 account and WSO2 Integrator handles the rest. There are no advanced configurations on this provider.

:::tip
When you click **Save**, the Command Palette opens with **Ballerina: Configure default WSO2 model provider**. Sign in once and the credentials are written to `Config.toml` automatically. You can re-run the command at any time to refresh.
:::

## Anthropic

Anthropic's Claude family includes three model tiers: **Opus**, **Sonnet**, and **Haiku**.

Official website: [anthropic.com](https://www.anthropic.com/).

### Create form

The form opens with **API Key** and **Model Type**, followed directly by the standard inline fields (Service URL defaulting to `https://api.anthropic.com/v1`, Maximum Tokens, Temperature, HTTP Version, Timeout, Forwarded, Compression, Payload Validation. No need to expand anything to see these):

<ThemedImage
    alt="Create Model Provider form for Anthropic showing API Key, Model Type (No Selection), Service URL (default https://api.anthropic.com/v1), Maximum Tokens (default 512), Temperature (default 0.7), HTTP Version (default HTTP_2_0), and the start of Timeout."
    sources={{
        light: useBaseUrl('/img/genai/develop/components-v5.1/model-providers/07-anthropic-basic-v5.1.png'),
        dark: useBaseUrl('/img/genai/develop/components-v5.1/model-providers/07-anthropic-basic-v5.1.png'),
    }}
/>

| Field | Required | Default | Available values |
|---|---|---|---|
| **API Key** | Yes | - | Anthropic API key. |
| **Model Type** | Yes | - | `claude-sonnet-4-5`, `claude-sonnet-4-5-20250929`, `claude-haiku-4-5`, `claude-haiku-4-5-20251001`, `claude-opus-4-5`, `claude-opus-4-5-20251101`, `claude-opus-4-6`, `claude-sonnet-4-6`, `claude-opus-4-1-20250805`, `claude-opus-4-20250514`, `claude-sonnet-4-20250514`, `claude-3-7-sonnet-20250219`, `claude-3-5-haiku-20241022`, `claude-3-5-sonnet-20241022`, `claude-3-5-sonnet-20240620`, `claude-3-opus-20240229`, `claude-3-sonnet-20240229`, `claude-3-haiku-20240307`. |

Scrolling further shows Forwarded, Compression, and Payload Validation, then the collapsed **Advanced Configurations** toggle, and finally **Model Provider Name** and **Result Type**:

<ThemedImage
    alt="Bottom of the Anthropic Create Model Provider form showing Forwarded, Compression, Payload Validation, the collapsed Advanced Configurations toggle, Model Provider Name set to anthropicModelprovider, and Result Type locked to anthropic:ModelProvider."
    sources={{
        light: useBaseUrl('/img/genai/develop/components-v5.1/model-providers/08-anthropic-inline-bottom-v5.1.png'),
        dark: useBaseUrl('/img/genai/develop/components-v5.1/model-providers/08-anthropic-inline-bottom-v5.1.png'),
    }}
/>

### Advanced configurations

Expanding **Advanced Configurations** shows the exact same panel as the [Standard HTTP advanced configurations](#standard-http-advanced-configurations) section above. Anthropic adds no provider-specific fields here. One thing worth noting: **Anthropic always sends Maximum Tokens on every call**, so the connection always carries a default of `512` even if you don't set one explicitly.

## Azure OpenAI

Same family of models as OpenAI (including the GPT-5 family), hosted on Azure with per-resource deployments. Like the OpenAI provider, it can call either the **Chat Completions API** (the default) or the **Responses API**, and it supports both Azure's newer **v1** endpoint and the legacy date-based `api-version` endpoints. For details on the two API surfaces and their URL and `api-version` requirements, see the [Azure OpenAI API version lifecycle documentation](https://learn.microsoft.com/azure/ai-services/openai/api-version-lifecycle).

Official website: [Azure OpenAI Service](https://azure.microsoft.com/services/cognitive-services/openai-service/).

### Create form

The form opens with **Service URL**, **API Key**, **Deployment ID**, and **API Version**:

<ThemedImage
    alt="Create Model Provider form for Azure OpenAI showing four required fields: Service URL, API Key, Deployment ID, and API Version, with the start of Maximum Tokens below."
    sources={{
        light: useBaseUrl('/img/genai/develop/components-v5.1/model-providers/09-azure-openai-basic-v5.1.png'),
        dark: useBaseUrl('/img/genai/develop/components-v5.1/model-providers/09-azure-openai-basic-v5.1.png'),
    }}
/>

| Field | Required | Default | Available values |
|---|---|---|---|
| **Service URL** | Yes | - | Base URL of your Azure OpenAI resource. Use the v1 URL (ends with `/v1`, e.g. `https://your-resource.services.ai.azure.com/openai/v1`) or the legacy URL (e.g. `https://your-resource.openai.azure.com`). See the [Azure OpenAI API version lifecycle documentation](https://learn.microsoft.com/azure/ai-services/openai/api-version-lifecycle). |
| **API Key** | Yes | - | Azure OpenAI API key. |
| **Deployment ID** | Yes | - | The deployment identifier you created in the Azure portal (the model name is implicit in the deployment). |
| **API Version** | No | `()` | **Required for legacy (non-`/v1`) service URLs**: a date-based version, e.g. `2024-10-21`. Optional on `/v1` URLs and normally omitted; pass `preview` or `v1` to opt into a specific v1 surface (date-based values are ignored on `/v1` URLs, with a warning). |

Continuing the scroll, **Maximum Tokens**, **Temperature**, **Reasoning Effort**, **API Type**, **HTTP Version**, and the start of **Timeout** are all shown directly on the form (not behind the Advanced Configurations toggle):

<ThemedImage
    alt="Azure OpenAI Create Model Provider form showing Maximum Tokens (default 4096), Temperature with its tooltip about GPT-5/o-series reasoning models, Reasoning Effort (No Selection), API Type (default CHAT_COMPLETIONS), HTTP Version (default HTTP_2_0), and the start of Timeout."
    sources={{
        light: useBaseUrl('/img/genai/develop/components-v5.1/model-providers/10-azure-openai-inline-mid-v5.1.png'),
        dark: useBaseUrl('/img/genai/develop/components-v5.1/model-providers/10-azure-openai-inline-mid-v5.1.png'),
    }}
/>

| Field | Default | Available values | What it controls |
|---|---|---|---|
| **Maximum Tokens** | `4096` | Any positive integer | Hard cap on response length. |
| **Temperature** | `()` (omitted) | `0.0`-`2.0` or empty | Sampling temperature. Leave empty for deployments of models that reject the parameter (the GPT-5 and o-series reasoning models). |
| **Reasoning Effort** | `()` (omitted) | `none`, `minimal`, `low`, `medium`, `high`, `xhigh` | Effort spent on reasoning by reasoning-capable models. Not every model accepts every value (for example, `minimal` only on the original `gpt-5` reasoning models, `none` from `gpt-5.1` onward, `xhigh` from `gpt-5.1-codex-max` onward). Because the model is implicit in the deployment, the value is validated by the Azure service rather than at initialization; an unsupported value fails on the first call. |
| **API Type** | `CHAT_COMPLETIONS` | `CHAT_COMPLETIONS`, `RESPONSES` | The Azure OpenAI API surface to use. Same semantics as the OpenAI provider. See [Chat Completions vs Responses API](#openai-api-type). |

Scrolling further shows Timeout, Forwarded, Compression, Payload Validation, then the collapsed **Advanced Configurations** toggle, and finally **Model Provider Name** and **Result Type**:

<ThemedImage
    alt="Bottom of the Azure OpenAI Create Model Provider form showing Timeout, Forwarded, Compression, Payload Validation, the collapsed Advanced Configurations toggle, Model Provider Name set to azureOpenaimodelprovider, and Result Type locked to azure:OpenAiModelProvider."
    sources={{
        light: useBaseUrl('/img/genai/develop/components-v5.1/model-providers/11-azure-openai-inline-bottom-v5.1.png'),
        dark: useBaseUrl('/img/genai/develop/components-v5.1/model-providers/11-azure-openai-inline-bottom-v5.1.png'),
    }}
/>

### Advanced configurations

Expanding **Advanced Configurations** shows the exact same panel as the [Standard HTTP advanced configurations](#standard-http-advanced-configurations) section above. Azure OpenAI adds no further provider-specific fields here.

:::info
The Azure package also ships an **Embedding Provider** and the **Azure AI Search Knowledge Base**. See [Azure OpenAI](embedding-providers.md#azure-openai) and [Azure AI Search](knowledge-bases.md#azure-ai-search-knowledge-base).
:::

## DeepSeek

DeepSeek's chat and reasoning models.

Official website: [deepseek.com](https://www.deepseek.com/).

### Create form

The form opens with **API Key**, followed directly by the provider-specific and standard inline fields (Model Type, Service URL, Maximum Token, Temperature, HTTP Version, Timeout. No need to expand anything to see these):

<ThemedImage
    alt="Create Model Provider form for DeepSeek showing API Key, Model Type (default DEEPSEEK_CHAT), Service URL (default https://api.deepseek.com), Maximum Token (default 512), Temperature (default 0.7), HTTP Version (default HTTP_2_0), and the start of Timeout."
    sources={{
        light: useBaseUrl('/img/genai/develop/components-v5.1/model-providers/12-deepseek-basic-v5.1.png'),
        dark: useBaseUrl('/img/genai/develop/components-v5.1/model-providers/12-deepseek-basic-v5.1.png'),
    }}
/>

| Field | Required | Default | Available values |
|---|---|---|---|
| **API Key** | Yes | - | DeepSeek API key. |
| **Model Type** | No | `deepseek-chat` (shown as `DEEPSEEK_CHAT`) | `deepseek-chat`, `deepseek-reasoner` |

Scrolling further shows Forwarded, Compression, and Payload Validation, then the collapsed **Advanced Configurations** toggle, and finally **Model Provider Name** and **Result Type**:

<ThemedImage
    alt="Bottom of the DeepSeek Create Model Provider form showing Forwarded, Compression, Payload Validation, the collapsed Advanced Configurations toggle, Model Provider Name set to deepseekModelprovider, and Result Type locked to deepseek:ModelProvider."
    sources={{
        light: useBaseUrl('/img/genai/develop/components-v5.1/model-providers/13-deepseek-inline-bottom-v5.1.png'),
        dark: useBaseUrl('/img/genai/develop/components-v5.1/model-providers/13-deepseek-inline-bottom-v5.1.png'),
    }}
/>

### Advanced configurations

Expanding **Advanced Configurations** shows the exact same panel as the [Standard HTTP advanced configurations](#standard-http-advanced-configurations) section above. DeepSeek adds no provider-specific fields here.

## Google Vertex AI

Vertex AI exposes Google's Gemini models alongside hosted Anthropic, Mistral, Meta, DeepSeek, and other open-weight models.

Official website: [Vertex AI](https://cloud.google.com/vertex-ai).

### Create form

The form opens with **Auth**, **Project ID**, and **Model**:

<ThemedImage
    alt="Create Model Provider form for Google Vertex showing three required fields: Auth (record/expression toggle, with hint 'OAuth2RefreshConfig for OAuth2 refresh token flow, or ServiceAccountConfig for automatic token refresh via service account'), Project ID, Model (with hint 'The model in publisher/model-name format, e.g., google/gemini-2.0-flash'), and the start of Location."
    sources={{
        light: useBaseUrl('/img/genai/develop/components-v5.1/model-providers/14-vertex-basic-v5.1.png'),
        dark: useBaseUrl('/img/genai/develop/components-v5.1/model-providers/14-vertex-basic-v5.1.png'),
    }}
/>

| Field | Required | Default | Available values |
|---|---|---|---|
| **Auth** | Yes | - | OAuth2 refresh-token record, a service-account record, or a path to a service-account JSON file. See [auth options](#vertex-auth-options) below. |
| **Project ID** | Yes | - | Your Google Cloud project ID. |
| **Model** | Yes | - | Publisher-prefixed model name. Examples: `google/gemini-2.0-flash`, `anthropic/claude-sonnet-4-6`, `mistralai/mistral-medium-3`, `meta/llama-4-maverick-17b-128e-instruct-maas`, `deepseek-ai/deepseek-v3-0324`, `qwen/qwen3-235b-a22b`, `kimi/kimi-k2`, `minimax/minimax-m2`. |

Scrolling further shows Maximum Tokens, Temperature, HTTP Version, and the start of Timeout:

<ThemedImage
    alt="Google Vertex Create Model Provider form showing Maximum Tokens (default 512), Temperature (omitted by default, with tooltip about models that don't accept it), HTTP Version (default HTTP_2_0), and the start of Timeout."
    sources={{
        light: useBaseUrl('/img/genai/develop/components-v5.1/model-providers/15-vertex-inline-v5.1.png'),
        dark: useBaseUrl('/img/genai/develop/components-v5.1/model-providers/15-vertex-inline-v5.1.png'),
    }}
/>

| Field | Default | Available values | What it controls |
|---|---|---|---|
| **Location** | `global` | `global`, `us-central1`, `europe-west1`, etc. | Google Cloud region. |
| **Service URL** | `""` (auto-derived from Location) | URL string | Override the regional endpoint. Defaults to `https://\{location\}-aiplatform.googleapis.com`. |
| **Maximum Tokens** | `512` | Any positive integer | Hard cap on response length. |
| **Temperature** | `()` (omitted from request) | `0.0`-`2.0` or empty | Sampling temperature. Leave empty for models that reject the field (e.g. some Anthropic-on-Vertex calls). |

Scrolling further shows Timeout, Forwarded, Compression, Payload Validation, then the collapsed **Advanced Configurations** toggle, and finally **Model Provider Name** and **Result Type**:

<ThemedImage
    alt="Bottom of the Google Vertex Create Model Provider form showing Timeout, Forwarded, Compression, Payload Validation, the collapsed Advanced Configurations toggle, Model Provider Name set to vertexModelprovider, and Result Type locked to vertex:ModelProvider."
    sources={{
        light: useBaseUrl('/img/genai/develop/components-v5.1/model-providers/16-vertex-inline-bottom-v5.1.png'),
        dark: useBaseUrl('/img/genai/develop/components-v5.1/model-providers/16-vertex-inline-bottom-v5.1.png'),
    }}
/>

### Advanced configurations

Expanding **Advanced Configurations** shows the exact same panel as the [Standard HTTP advanced configurations](#standard-http-advanced-configurations) section above. Vertex adds no provider-specific fields here.

### Vertex auth options {#vertex-auth-options}

| Auth type | Fields | When to use |
|---|---|---|
| **OAuth2 refresh config** | `clientId`, `clientSecret`, `refreshToken`, optional `refreshUrl` | Already have OAuth2 refresh-token credentials. |
| **Service account config** | `clientEmail`, `privateKey`, optional `scopes` | Want explicit credentials in source. |
| **Service account JSON path** | A file path string | Easiest - point at the downloaded service-account JSON file from the Google Cloud console. The connector reads `client_email` and `private_key` automatically and refreshes the token. |

:::info
Vertex also ships an **Embedding Provider**. See [Google Vertex](embedding-providers.md#google-vertex).
:::

## Mistral

EU-hosted Mistral and Mixtral models, including Codestral and Pixtral.

Official website: [mistral.ai](https://www.mistral.ai/).

### Create form

The form opens with **API Key** and **Model Type**, followed directly by the standard inline fields (Service URL defaulting to `https://api.mistral.ai/v1`, Maximum Tokens, Temperature, HTTP Version, Timeout. No need to expand anything to see these):

<ThemedImage
    alt="Create Model Provider form for Mistral showing API Key, Model Type (No Selection), Service URL (default https://api.mistral.ai/v1), Maximum Tokens (default 512), Temperature (default 0.7), and the start of HTTP Version."
    sources={{
        light: useBaseUrl('/img/genai/develop/components-v5.1/model-providers/17-mistral-basic-v5.1.png'),
        dark: useBaseUrl('/img/genai/develop/components-v5.1/model-providers/17-mistral-basic-v5.1.png'),
    }}
/>

| Field | Required | Default | Available values |
|---|---|---|---|
| **API Key** | Yes | - | Mistral AI API key. |
| **Model Type** | Yes | - | `mistral-large-latest`, `mistral-medium-latest`, `mistral-small-latest`, `codestral-latest`, `ministral-8b-latest`, `ministral-3b-latest`, `pixtral-large-latest`, `devstral-small-latest`, `mistral-saba-latest`, `open-mistral-7b`, `open-mistral-nemo`, `open-mixtral-8x7b`, `open-mixtral-8x22b`, `pixtral-12b-2409`, `open-codestral-mamba`, `codestral-mamba-2407`. Date-pinned variants (e.g. `mistral-large-2411`, `mistral-medium-2505`, `mistral-small-2501`, `ministral-3b-2410`, `ministral-8b-2410`, `codestral-2405`, `codestral-2501`, `mistral-saba-2502`) are also available. |

<ThemedImage
    alt="Mistral Model Type dropdown open, listing MISTRAL_SMALL_LATEST, MISTRAL_MEDIUM_LATEST, MISTRAL_LARGE_LATEST, DEVSTRAL_SMALL_LATEST, PIXTRAL_LARGE_LATEST, MINISTRAL_3B_LATEST, MINISTRAL_8B_LATEST, MISTRAL_SABA_LATEST, CODESTRAL_LATEST, and date-pinned MISTRAL_SMALL_2402 and MISTRAL_SMALL_2409 options."
    sources={{
        light: useBaseUrl('/img/genai/develop/components-v5.1/model-providers/18-mistral-model-types-v5.1.png'),
        dark: useBaseUrl('/img/genai/develop/components-v5.1/model-providers/18-mistral-model-types-v5.1.png'),
    }}
/>

Scrolling further shows Timeout, Forwarded, Compression, Payload Validation, then the collapsed **Advanced Configurations** toggle, and finally **Model Provider Name** and **Result Type**:

<ThemedImage
    alt="Bottom of the Mistral Create Model Provider form showing Timeout, Forwarded, Compression, Payload Validation, the collapsed Advanced Configurations toggle, Model Provider Name set to mistralModelprovider, and Result Type locked to mistral:ModelProvider."
    sources={{
        light: useBaseUrl('/img/genai/develop/components-v5.1/model-providers/19-mistral-inline-bottom-v5.1.png'),
        dark: useBaseUrl('/img/genai/develop/components-v5.1/model-providers/19-mistral-inline-bottom-v5.1.png'),
    }}
/>

### Advanced configurations

Expanding **Advanced Configurations** shows the exact same panel as the [Standard HTTP advanced configurations](#standard-http-advanced-configurations) section above. Mistral adds no provider-specific fields here.

## Ollama

Local model runner. Nothing leaves the machine. It is useful for offline development, privacy-sensitive flows, and any model Ollama supports.

Official website: [ollama.com](https://ollama.com/).

### Create form

The form opens with **Model Type** as a free-text field (there's no fixed model list - Ollama accepts anything the daemon has pulled), followed directly by Service URL and Ollama's decoding controls, all shown inline without expanding anything. Ollama exposes Mirostat sampling and other decoding controls that the hosted providers don't.

<ThemedImage
    alt="Create Model Provider form for Ollama showing Model Type (free text), Service URL (default http://localhost:11434), Mirostat Sampling (default 0, options 0=disabled, 1=Mirostat, 2=Mirostat 2.0), Mirostat Eta (default 0.1), and the start of Mirostat Tau."
    sources={{
        light: useBaseUrl('/img/genai/develop/components-v5.1/model-providers/20-ollama-basic-v5.1.png'),
        dark: useBaseUrl('/img/genai/develop/components-v5.1/model-providers/20-ollama-basic-v5.1.png'),
    }}
/>

Scrolling further shows Mirostat Tau, Context Window Size, Repeat Last N, Repeat Penalty, and Temperature:

<ThemedImage
    alt="Ollama Create Model Provider form showing Mirostat Tau (default 5.0), Context Window Size (default 2048), Repeat Last N (default 64), Repeat Penalty (default 1.1), and Temperature (default 0.8)."
    sources={{
        light: useBaseUrl('/img/genai/develop/components-v5.1/model-providers/21-ollama-inline-mid-v5.1.png'),
        dark: useBaseUrl('/img/genai/develop/components-v5.1/model-providers/21-ollama-inline-mid-v5.1.png'),
    }}
/>

Scrolling further shows Seed, Number Of Tokens To Predict, Top K, Top P, and Min P:

<ThemedImage
    alt="Ollama Create Model Provider form showing Seed (default 0), Number Of Tokens To Predict (default -1), Top K (default 40), Top P (default 0.9), and Min P (default 0.0)."
    sources={{
        light: useBaseUrl('/img/genai/develop/components-v5.1/model-providers/22-ollama-inline-mid2-v5.1.png'),
        dark: useBaseUrl('/img/genai/develop/components-v5.1/model-providers/22-ollama-inline-mid2-v5.1.png'),
    }}
/>

| Field | Required | Default | Available values |
|---|---|---|---|
| **Model Type** | Yes | - | Anything `ollama pull` can fetch (e.g. `llama3.2`, `mistral`, `qwen2.5`). |
| **Service URL** | No | `http://localhost:11434` | URL of the local Ollama daemon. |
| **Mirostat Sampling** | No | `0` | `0` (disabled), `1` (Mirostat), `2` (Mirostat 2.0) - whether to use Mirostat sampling for controlling perplexity. |
| **Mirostat Eta** | No | `0.1` | Mirostat learning rate. Higher = more responsive to feedback. |
| **Mirostat Tau** | No | `5.0` | Mirostat target perplexity. Lower = more focused, more coherent. |
| **Context Window Size** | No | `2048` | Context window in tokens. |
| **Repeat Last N** | No | `64` | `0` (disabled), `-1` (=context window), or a positive integer - look-back window for repetition penalty. |
| **Repeat Penalty** | No | `1.1` | Repetition penalty strength. Higher = stronger penalty. |
| **Temperature** | No | `0.8` | Sampling temperature. |
| **Seed** | No | `0` | Random seed for deterministic generation. |
| **Number Of Tokens To Predict** | No | `-1` | `-1` (unlimited) or any positive integer - maximum tokens to generate. |
| **Top K** | No | `40` | Top-K sampling. |
| **Top P** | No | `0.9` | Top-P (nucleus) sampling, `0.0`-`1.0`. |
| **Min P** | No | `0.0` | Minimum probability filter relative to the top token, `0.0`-`1.0`. |

Scrolling further shows the standard inline fields (HTTP Version, Timeout, Forwarded, Compression, Payload Validation), then the collapsed **Advanced Configurations** toggle, and finally **Model Provider Name** and **Result Type**:

<ThemedImage
    alt="Bottom of the Ollama Create Model Provider form showing HTTP Version, Timeout, Forwarded, Compression, Payload Validation, the collapsed Advanced Configurations toggle, Model Provider Name set to ollamaModelprovider, and Result Type locked to ollama:ModelProvider."
    sources={{
        light: useBaseUrl('/img/genai/develop/components-v5.1/model-providers/23-ollama-inline-bottom-v5.1.png'),
        dark: useBaseUrl('/img/genai/develop/components-v5.1/model-providers/23-ollama-inline-bottom-v5.1.png'),
    }}
/>

### Advanced configurations

Expanding **Advanced Configurations** shows the exact same panel as the [Standard HTTP advanced configurations](#standard-http-advanced-configurations) section above. Ollama adds no provider-specific fields here.

:::note
Ollama is the only provider with **no API key**. Authentication is implicit because the daemon trusts callers on `localhost`.
:::

## OpenAI

Connects to OpenAI's hosted models (the GPT-5 family, GPT-4o, GPT-4.1, and the o-series reasoning models). The provider can call either the **Chat Completions API** (the default) or the newer **Responses API**, selected with the **API Type** advanced configuration. See [Chat Completions vs Responses API](#openai-api-type).

Official website: [platform.openai.com](https://platform.openai.com/).

### Create form

<ThemedImage
    alt="Create Model Provider form for OpenAI showing API Key, Model Type with its dropdown open listing GPT_4_0613, O1, O1_2024_12_17, O1_PRO_2025_03_19, O1_PRO, O1_MINI, O3, O3_MINI, O3_PRO, O4_MINI, and GPT_3_5_TURBO, followed by Temperature and the start of Reasoning Effort."
    sources={{
        light: useBaseUrl('/img/genai/develop/components-v5.1/model-providers/24-openai-basic-v5.1.png'),
        dark: useBaseUrl('/img/genai/develop/components-v5.1/model-providers/24-openai-basic-v5.1.png'),
    }}
/>

| Field | Required | Default | Available values |
|---|---|---|---|
| **API Key** | Yes | - | Your OpenAI API key (starts with `sk-…`). Reference a `configurable` in production. |
| **Model Type** | Yes | - | `gpt-5`, `gpt-5-mini`, `gpt-5-nano`, `gpt-5-pro`, `gpt-5.1`, `gpt-5.2`, `gpt-5.2-pro`, `gpt-5.4`, `gpt-5.4-mini`, `gpt-5.4-nano`, `gpt-5.4-pro`, `gpt-5.5`, `gpt-5.5-pro`, `gpt-5.6`, `gpt-4.1`, `gpt-4.1-mini`, `gpt-4.1-nano`, `gpt-3.5-turbo`, `o1`, `o1-pro`, `o3`, `o3-mini`, `o3-pro`, `o4-mini`, `gpt-4-0613`, `chatgpt-4o-latest`, `gpt-4o-audio-preview`, `computer-use-preview`. Chat-tuned (`gpt-5-chat`, `gpt-5.1-chat`, `gpt-5.2-chat`), Codex (`gpt-5-codex`, `gpt-5.1-codex`, `gpt-5.1-codex-mini`, `gpt-5.1-codex-max`, `gpt-5.2-codex`, `gpt-5.3-codex`, `codex-mini-latest`), and date-pinned variants (e.g. `o1-2024-12-17`, `o1-pro-2025-03-19`, `gpt-4.1-2025-04-14`, `gpt-4.1-mini-2025-04-14`, `gpt-4.1-nano-2025-04-14`, `gpt-3.5-turbo-16k`, `gpt-3.5-turbo-1106`, `gpt-3.5-turbo-0125`) are also available. `gpt-5.6` is an alias that always routes to the latest `gpt-5.6-sol` snapshot; `gpt-5.6-sol`, `gpt-5.6-terra`, and `gpt-5.6-luna` pin a specific snapshot. |

:::info
The `gpt-4o` and `gpt-4o-mini` chat models and `gpt-4-turbo` are not available as Model Type options in this provider. `gpt-4o-audio-preview` and `chatgpt-4o-latest` are the only members of the GPT-4o family in the list.
:::

### Provider-specific inline fields

Like the [standard inline fields](#standard-http-advanced-configurations) (Service URL, Maximum Tokens, Temperature, and so on), these OpenAI-specific fields are shown directly on the form without expanding anything:

| Field | Default | Available values | What it controls |
|---|---|---|---|
| **Reasoning Effort** | `()` (omitted) | `none`, `minimal`, `low`, `medium`, `high`, `xhigh` | Effort spent on reasoning by reasoning-capable models. Lower effort returns faster and spends fewer reasoning tokens. Each model accepts only a subset of the values; the combination is validated when the provider is created, so an unsupported pairing fails at initialization with a descriptive error. See [Reasoning effort support by model](#openai-reasoning-effort). |
| **API Type** | `CHAT_COMPLETIONS` | `CHAT_COMPLETIONS`, `RESPONSES` | The OpenAI endpoint the provider calls. See [Chat Completions vs Responses API](#openai-api-type). |

Also note:

| Field | Default | What it controls |
|---|---|---|
| **Service URL** | `https://api.openai.com/v1` | OpenAI API base URL. Override only for OpenAI-compatible gateways. |
| **Maximum Tokens** | `4096` | Hard cap on response length (sent as `max_completion_tokens` on the Chat Completions API and `max_output_tokens` on the Responses API). |
| **Temperature** | `()` (omitted) | Sampling temperature. Leave empty for models that reject the parameter (the GPT-5 and o-series reasoning models). |

### Advanced configurations

Expanding **Advanced Configurations** shows the exact same panel as the [Standard HTTP advanced configurations](#standard-http-advanced-configurations) section above.

### Chat Completions vs Responses API {#openai-api-type}

The **API Type** setting selects which OpenAI endpoint the provider talks to. Everything else in your flow stays the same: both endpoints support the same **Generate** and **Chat** actions, tool calling, and typed responses, so switching is a connection-level change.

| API Type | Endpoint | Notes |
|---|---|---|
| **`CHAT_COMPLETIONS`** *(default)* | `POST /chat/completions` | OpenAI's long-standing chat API. |
| **`RESPONSES`** | `POST /responses` | OpenAI's newer API surface. System prompts are sent as top-level `instructions`, and tool calls travel as typed input/output items. Requests are sent with `store: false`, so OpenAI does not retain them for later retrieval. |

### Reasoning effort support by model {#openai-reasoning-effort}

Reasoning effort applies only to reasoning models. The chat-tuned variants (`gpt-5-chat`, `gpt-5.1-chat`, `gpt-5.2-chat`) are not reasoning models and reject the parameter.

| Model | Accepted values |
|---|---|
| `gpt-5`, `gpt-5-mini`, `gpt-5-nano` | `minimal`, `low`, `medium`, `high` |
| `gpt-5-pro` | `high` |
| `gpt-5.1` | `none`, `low`, `medium`, `high` |
| `gpt-5.2` | `none`, `low`, `medium`, `high`, `xhigh` |
| `gpt-5.2-pro`, `gpt-5.4-pro`, `gpt-5.5-pro` | `medium`, `high`, `xhigh` |
| `gpt-5.3-codex` | `low`, `medium`, `high`, `xhigh` |
| `gpt-5.4`, `gpt-5.4-mini`, `gpt-5.4-nano`, `gpt-5.5`, and the `gpt-5.6` family | `none`, `low`, `medium`, `high`, `xhigh` |
| o-series (`o1`, `o1-pro`, `o3`, `o3-mini`, `o3-pro`, `o4-mini`) and the Codex models | Accepted; the value is passed through without a per-model restriction list. |

## OpenRouter

OpenRouter routes a single API across many model providers (OpenAI, Anthropic, Mistral, Meta, Cohere, and others). Use it when you want one key and the freedom to swap models by string.

Official website: [openrouter.ai](https://openrouter.ai/).

### Create form

The form opens with **API Key** and **Model Type**, followed directly by the standard and provider-specific inline fields (Service URL defaulting to `https://openrouter.ai/api/v1`, Site URL, Site Name, Maximum Tokens, Temperature. No need to expand anything to see these):

<ThemedImage
    alt="Create Model Provider form for OpenRouter showing API Key (with link to https://openrouter.ai/keys), Model Type (with example values 'openai/gpt-4o', 'anthropic/claude-3.5-sonnet'), Service URL (default https://openrouter.ai/api/v1), Site URL, Site Name, and the start of Maximum Tokens."
    sources={{
        light: useBaseUrl('/img/genai/develop/components-v5.1/model-providers/25-openrouter-basic-v5.1.png'),
        dark: useBaseUrl('/img/genai/develop/components-v5.1/model-providers/25-openrouter-basic-v5.1.png'),
    }}
/>

| Field | Required | Default | Available values |
|---|---|---|---|
| **API Key** | Yes | - | OpenRouter API key. Get one from [openrouter.ai/keys](https://openrouter.ai/keys). |
| **Model Type** | Yes | - | Qualified model name. Examples: `openai/gpt-4o`, `anthropic/claude-3.5-sonnet`, `mistralai/mistral-large`, `meta-llama/llama-3.1-70b-instruct`. See OpenRouter's [model list](https://openrouter.ai/models). |
| **Site URL** | No | `()` | URL string or empty - optional site URL sent as the `HTTP-Referer` header. Used by OpenRouter for site attribution and leaderboards. |
| **Site Name** | No | `()` | String or empty - optional site name sent as the `X-OpenRouter-Title` header. |

Scrolling further shows Temperature, HTTP Version, Timeout, Forwarded, Compression, and Payload Validation:

<ThemedImage
    alt="OpenRouter Create Model Provider form showing Temperature (omitted by default), HTTP Version (default HTTP_2_0), Timeout (default 60), Forwarded, Compression, and Payload Validation."
    sources={{
        light: useBaseUrl('/img/genai/develop/components-v5.1/model-providers/26-openrouter-inline-mid-v5.1.png'),
        dark: useBaseUrl('/img/genai/develop/components-v5.1/model-providers/26-openrouter-inline-mid-v5.1.png'),
    }}
/>

Scrolling further shows Timeout, Forwarded, Compression, Payload Validation, then the collapsed **Advanced Configurations** toggle, and finally **Model Provider Name** and **Result Type**:

<ThemedImage
    alt="Bottom of the OpenRouter Create Model Provider form showing Timeout, Forwarded, Compression, Payload Validation, the collapsed Advanced Configurations toggle, Model Provider Name set to openrouterModelprovider, and Result Type locked to openrouter:ModelProvider."
    sources={{
        light: useBaseUrl('/img/genai/develop/components-v5.1/model-providers/27-openrouter-inline-bottom-v5.1.png'),
        dark: useBaseUrl('/img/genai/develop/components-v5.1/model-providers/27-openrouter-inline-bottom-v5.1.png'),
    }}
/>

### Advanced configurations

Expanding **Advanced Configurations** shows the exact same panel as the [Standard HTTP advanced configurations](#standard-http-advanced-configurations) section above. OpenRouter adds no provider-specific fields here.

:::info
The OpenRouter package also ships an **Embedding Provider**. See [OpenRouter](embedding-providers.md#openrouter).
:::

## Model provider connections

Once you **save** a model provider, it becomes a reusable project connection that can be accessed throughout your integration and AI flows.

The saved model provider appears in multiple places:

- In the **Connections** tree on the left side of the project explorer, where all project-level connections are listed (for example, `wso2ModelProvider` or `openaiModelProvider`).

- The integration project's **Design** view wires each artifact to the provider it depends on:

<ThemedImage
    alt="The integration project Design overview with the left sidebar Connections tree populated with three model-provider connections (anthropicModelprovider, azureOpenaimodelprovider, openaiModelprovider), and the main canvas wiring an Automation, an AI Agent Service, an MCP Service action, and a Voice Agent Integration action to their respective model-provider nodes on the right with provider logos."
    sources={{
        light: useBaseUrl('/img/genai/develop/components-v5.1/model-providers/28-project-design-multi-providers-v5.1.png'),
        dark: useBaseUrl('/img/genai/develop/components-v5.1/model-providers/28-project-design-multi-providers-v5.1.png'),
    }}
/>

- The **Model Providers** panel lists every model provider connection available in the project. Use the **+** button to add a new provider connection, or expand a provider to view its available actions.

<ThemedImage
    alt="The Model Providers right-side panel listing four model-provider connections - anthropicModelprovider, azureOpenaimodelprovider, openaiModelprovider, wso2ModelProvider - each with a chevron and provider logo."
    sources={{
        light: useBaseUrl('/img/genai/develop/components/model-providers/21-model-providers-panel-multi.png'),
        dark: useBaseUrl('/img/genai/develop/components/model-providers/21-model-providers-panel-multi.png'),
    }}
/>

## Editing or replacing a model provider

To change a provider's API key, model name, or any other field after it's been created, click the provider name in the left **Connections** tree. The **Edit Connection** modal opens pre-filled with that connection's own fields - here, an Anthropic connection showing API Key, Model Type, Service URL, and Maximum Tokens:

<ThemedImage
    alt="Edit Connection modal for an Anthropic connection showing Api Key (sk-ant-xxx), Model Type set to an expression 'claude-sonnet-4-20250514', Service URL (default DEFAULT_ANTHROPIC_SERVICE_URL), Maximum Tokens (default DEFAULT_MAX_TOKEN_COUNT), and the Update Connection button at the bottom."
    sources={{
        light: useBaseUrl('/img/genai/develop/components-v5.1/model-providers/29-edit-connection-anthropic-v5.1.png'),
        dark: useBaseUrl('/img/genai/develop/components-v5.1/model-providers/29-edit-connection-anthropic-v5.1.png'),
    }}
/>

| Field | What it does |
|---|---|
| **Connection fields** | The same fields shown on the Create form for that provider (API Key, Model Type, Service URL, and so on), pre-filled with the connection's current values. Any field can be switched to an expression. |
| **Advanced Configurations** | Expand to edit the HTTP-level and provider-specific advanced parameters. |
| **Update Connection** | Save the change. Existing nodes that referenced the connection continue to work. |

:::tip
Editing a connection follows the same pattern for every component type. Embedding providers, vector stores, knowledge bases, and chunkers all use the same Edit Connection modal.
:::

## What's next

- [Embedding providers](embedding-providers.md) — Vector embeddings for RAG. The OpenAI, Azure, Vertex, OpenRouter, and Default WSO2 packages also ship embedding providers.
- [Vector stores](vector-stores.md) — Persist and query embeddings using Pinecone, Weaviate, Qdrant, pgvector, and other backends.
- [Knowledge bases](knowledge-bases.md) — Managed retrieval sources, including Azure AI Search, that plug directly into RAG flows.
- [Chunkers](chunkers.md) — Split documents into chunks before embedding for ingestion into a vector store.
