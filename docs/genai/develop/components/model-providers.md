---
title: Model Providers for LLMs
---

# Model Providers for LLMs

A **Large Language Model (LLM)** is a neural network trained on large text corpora. You send it a prompt (a text instruction) and it generates a response. LLMs power natural language tasks such as answering questions, summarizing content, extracting structured data, and planning and executing tool calls.

A **Model Provider** is WSO2 Integrator's unified abstraction over LLMs. It wraps the provider-specific API behind a consistent interface, so Direct LLM Calls, Natural Functions, the RAG `generate` node, and AI agents all work the same way regardless of which LLM you choose. Pick a provider, fill in the form, and click **Save**.

Every model provider exposes the same two actions, so picking a different LLM is just a connection-level swap. The rest of your flow does not change.

## Available actions

Every model provider connection exposes these two actions in the right-side **Model Providers** panel.

| Action | What it does | Required parameters | Optional parameters |
|---|---|---|---|
| **Generate** | Sends a prompt to the model and binds the response to a typed Ballerina value. The everyday action behind a `generate` node, a Natural Function, or RAG `ai:generate`. | **Prompt** (the instruction template), **Expected Type** (the type the response is parsed into) | None per call. Anything you want to tune (temperature, max tokens) lives on the connection. |
| **Chat** | Sends a list of chat messages and (optionally) tool definitions; returns the model's reply, including any tool calls. Used by Agents. | **Messages** (the conversation), **Tools** (tool definitions for tool calling) | **Stop** (a stop sequence). |

Per-call overrides are not exposed in the form. Anything that varies per request belongs in the prompt; anything that varies across the project is set once on the connection (see [Standard HTTP advanced configurations](#standard-http-advanced-configurations) below).

## Where to find model providers for LLM

Two equivalent places:

- **Add Node** panel > **AI** > **Direct LLM** > **Model Provider** (adds an LLM provider connection to a flow).
- **Right-side Model Providers** panel > **+ Add Model Provider** (adds a connection from anywhere in the project).

![Right-side Model Providers panel showing the search bar and a + Add Model Provider button at the top of an empty list.](/img/genai/develop/components/model-providers/01-panel-empty.png)

Click **+ Add Model Provider** and the **Select Model Provider** picker opens with a card for each provider type:

![Select Model Provider picker listing Default Model Provider (WSO2), Anthropic, Azure OpenAI, DeepSeek, Google Vertex, Mistral, Ollama, OpenAI, with one-line descriptions for each.](/img/genai/develop/components/model-providers/02-select-list-top.png)

Scroll to see the remaining options:

![Select Model Provider picker scrolled to show DeepSeek (highlighted), Google Vertex, Mistral, Ollama, OpenAI, and OpenRouter Model Provider entries.](/img/genai/develop/components/model-providers/03-select-list-bottom.png)

## Implementations overview

| Provider | Module | API key required? | Has embedding provider? |
|---|---|---|---|
| **Default WSO2** | `ballerina/ai` | No (signed-in via WSO2) | Yes. See [Default WSO2 Embedding Provider](/docs/genai/develop/components/embedding-providers#default-wso2-embedding-provider) |
| **Anthropic** | [`ballerinax/ai.anthropic`](https://central.ballerina.io/ballerinax/ai.anthropic/latest) | Yes | No |
| **Azure OpenAI** | [`ballerinax/ai.azure`](https://central.ballerina.io/ballerinax/ai.azure/latest) | Yes | Yes |
| **DeepSeek** | [`ballerinax/ai.deepseek`](https://central.ballerina.io/ballerinax/ai.deepseek/latest) | Yes | No |
| **Google Vertex** | [`ballerinax/ai.googleapis.vertex`](https://central.ballerina.io/ballerinax/ai.googleapis.vertex/latest) | OAuth2 / service account | Yes |
| **Mistral** | [`ballerinax/ai.mistral`](https://central.ballerina.io/ballerinax/ai.mistral/latest) | Yes | No |
| **Ollama** | [`ballerinax/ai.ollama`](https://central.ballerina.io/ballerinax/ai.ollama/latest) | No (local) | No |
| **OpenAI** | [`ballerinax/ai.openai`](https://central.ballerina.io/ballerinax/ai.openai/latest) | Yes | Yes |
| **OpenRouter** | [`ballerinax/ai.openrouter`](https://central.ballerina.io/ballerinax/ai.openrouter/latest) | Yes | Yes |

## Standard HTTP advanced configurations

Every provider with a hosted endpoint (all providers except the Default WSO2 provider, which is preconfigured) shares the **same** HTTP-level advanced configurations. They tune the underlying HTTP client and apply to every request the provider makes.

| Field | Default | Available values | What it controls |
|---|---|---|---|
| **Service URL** | provider-specific | URL string | Override the provider's API base URL - useful for OpenAI-compatible gateways or self-hosted endpoints. |
| **Maximum Tokens** | `512` | Any positive integer | Hard cap on the response length. |
| **Temperature** | `0.7` | `0.0`-`2.0` (provider-dependent) | Sampling temperature. Lower = more deterministic, higher = more creative. Use `0.0` for the most reproducible results. |
| **HTTP Version** | `HTTP_2_0` | `HTTP_1_1`, `HTTP_2_0` | The HTTP version used for requests. |
| **HTTP1 Settings** | `{}` | Record (keep-alive, version, chunking) | HTTP/1.x protocol settings. |
| **HTTP2 Settings** | `{}` | Record | HTTP/2 protocol settings. |
| **Timeout** | `60` (seconds) | Any positive number | Per-request timeout. |
| **Forwarded** | `"disable"` | `"disable"`, `"enable"`, `"transient"` | Whether to set `Forwarded` / `X-Forwarded-For` headers when behind a proxy. |
| **Pool Configuration** | `{}` | Record (max active, idle time) | Request pool settings. |
| **Cache Configuration** | `{}` | Record | HTTP response caching. |
| **Compression** | `AUTO` | `AUTO`, `ALWAYS`, `NEVER` | `accept-encoding` handling. |
| **Circuit Breaker Configuration** | `{}` | Record (`rollingWindow`, `failureThreshold`, `resetTime`, `statusCodes`) | Open the breaker on repeated failures so calls fail fast and recover. |
| **Retry Configuration** | `{}` | Record (`count`, `interval`, `backOffFactor`, `maxWaitInterval`, `statusCodes`) | Retry on failure. |
| **Response Limits** | `{}` | Record (max body, max headers) | Maximum inbound response size. |
| **Secure Socket** | `()` | Record (trust store, key store, client auth) | TLS / SSL options. |
| **Proxy** | `()` | Record (host, port, userName, password) | HTTP proxy settings. |
| **Validation** | `true` | `true`, `false` | Inbound payload validation. |

The same set of fields appears in the **Advanced Configurations** section of every provider's Create form. Below, each provider's section only calls out provider-specific knobs that go on top.

## Default WSO2 model provider

Provided by the core `ballerina/ai` package. Routes through the WSO2 intelligence service. **No API key in your source**. A one-time WSO2 sign-in writes the credentials into your project's `Config.toml`. The fastest way to get an LLM running while you're prototyping.

### Create form

![Create Model Provider form for the Default WSO2 provider. Header reads 'Creates a default model provider based on the provided wso2ProviderConfig'. Banner: 'This is a simple operation that requires no parameters. Specify where to store the result to finish.' Two fields: Model Provider Name (default aiWso2modelprovider) and Result Type (locked to ai:Wso2ModelProvider). Save button.](/img/genai/develop/components/model-providers/04-wso2-default.png)

No provider-specific fields. Sign in with your WSO2 account and WSO2 Integrator handles the rest. There are no advanced configurations on this provider.

When you click **Save**, the Command Palette opens with **Ballerina: Configure default WSO2 model provider**. Sign in once and the credentials are written to `Config.toml` automatically. You can re-run the command at any time to refresh.

## Anthropic

Anthropic's Claude family includes three model tiers: **Opus**, **Sonnet**, and **Haiku**.

Official website: [anthropic.com](https://www.anthropic.com/).

### Create form

![Create Model Provider form for Anthropic showing two required fields: API Key and Model Type. Below: Advanced Configurations Expand link, Model Provider Name anthropicModelprovider, Result Type anthropic:ModelProvider.](/img/genai/develop/components/model-providers/09-anthropic-basic.png)

| Field | Required | Default | Available values |
|---|---|---|---|
| **API Key** | Yes | - | Anthropic API key. |
| **Model Type** | Yes | - | `claude-sonnet-4-5`, `claude-sonnet-4-5-20250929`, `claude-haiku-4-5`, `claude-haiku-4-5-20251001`, `claude-opus-4-5`, `claude-opus-4-5-20251101`, `claude-opus-4-6`, `claude-sonnet-4-6`, `claude-opus-4-1-20250805`, `claude-opus-4-20250514`, `claude-sonnet-4-20250514`, `claude-3-7-sonnet-20250219`, `claude-3-5-haiku-20241022`, `claude-3-5-sonnet-20241022`, `claude-3-5-sonnet-20240620`, `claude-3-opus-20240229`, `claude-3-sonnet-20240229`, `claude-3-haiku-20240307`. |

### Advanced configurations

![Anthropic Create Model Provider form with Advanced Configurations expanded showing Service URL (default https://api.anthropic.com/v1), Maximum Tokens (default 512), Temperature (default 0.7), HTTP Version.](/img/genai/develop/components/model-providers/10-anthropic-advanced.png)

| Field | Default | Available values | What it controls |
|---|---|---|---|
| **Service URL** | `https://api.anthropic.com/v1` | URL string | Anthropic API base URL. |
| **Maximum Tokens** | `512` | Any positive integer | Hard cap on response length. **Anthropic always sends this on every call**, so the connection always carries a default. |
| **Temperature** | `0.7` | `0.0`-`1.0` | Sampling temperature. |

Plus the [Standard HTTP advanced configurations](#standard-http-advanced-configurations).

## Azure OpenAI

Same family of models as OpenAI, hosted on Azure with per-resource deployments.

Official website: [Azure OpenAI Service](https://azure.microsoft.com/services/cognitive-services/openai-service/).

### Create form

![Create Model Provider form for Azure OpenAI showing four required fields: Service URL, API Key, Deployment ID, API Version. Below: Advanced Configurations Expand link, Model Provider Name azureOpenaimodelprovider, Result Type azure:OpenAiModelProvider.](/img/genai/develop/components/model-providers/07-azure-openai-basic.png)

| Field | Required | Default | Available values |
|---|---|---|---|
| **Service URL** | Yes | - | Base URL of your Azure OpenAI resource, e.g. `https://your-resource.openai.azure.com`. |
| **API Key** | Yes | - | Azure OpenAI API key. |
| **Deployment ID** | Yes | - | The deployment identifier you created in the Azure portal (the model name is implicit in the deployment). |
| **API Version** | Yes | - | Azure OpenAI API version, e.g. `2023-07-01-preview`. |

### Advanced configurations

![Azure OpenAI Create Model Provider form with Advanced Configurations expanded. Visible fields: Maximum Tokens (default 512), Temperature (default 0.7), HTTP Version.](/img/genai/develop/components/model-providers/08-azure-openai-advanced.png)

| Field | Default | Available values | What it controls |
|---|---|---|---|
| **Maximum Tokens** | `512` | Any positive integer | Hard cap on response length. |
| **Temperature** | `0.7` | `0.0`-`2.0` | Sampling temperature. |

Plus the [Standard HTTP advanced configurations](#standard-http-advanced-configurations).

The Azure package also ships an **Embedding Provider** and the **Azure AI Search Knowledge Base**. See [Azure OpenAI](/docs/genai/develop/components/embedding-providers#azure-openai) and [Azure AI Search](/docs/genai/develop/components/knowledge-bases#azure-ai-search-knowledge-base).

## DeepSeek

DeepSeek's chat and reasoning models.

Official website: [deepseek.com](https://www.deepseek.com/).

### Create form

![Create Model Provider form for DeepSeek showing one required field: API Key. Below: Advanced Configurations Expand link, Model Provider Name deepseekModelprovider, Result Type deepseek:ModelProvider.](/img/genai/develop/components/model-providers/15-deepseek-basic.png)

| Field | Required | Default | Available values |
|---|---|---|---|
| **API Key** | Yes | - | DeepSeek API key. |

### Advanced configurations

![DeepSeek Create Model Provider form with Advanced Configurations expanded showing Model Type (default DEEPSEEK_CHAT), Service URL (default https://api.deepseek.com), Maximum Tokens (default 512), Temperature (default 0.7), HTTP Version, HTTP1 Settings.](/img/genai/develop/components/model-providers/16-deepseek-advanced.png)

| Field | Default | Available values | What it controls |
|---|---|---|---|
| **Model Type** | `deepseek-chat` (WSO2 Integrator shows the constant `DEEPSEEK_CHAT`) | `deepseek-chat`, `deepseek-reasoner` | Which DeepSeek model to use. |
| **Service URL** | `https://api.deepseek.com` | URL string | DeepSeek API base URL. |
| **Maximum Tokens** | `512` | Any positive integer | Hard cap on response length. |
| **Temperature** | `0.7` | `0.0`-`1.0` | Sampling temperature. |

Plus the [Standard HTTP advanced configurations](#standard-http-advanced-configurations).

## Google Vertex AI

Vertex AI exposes Google's Gemini models alongside hosted Anthropic, Mistral, Meta, DeepSeek, and other open-weight models.

Official website: [Vertex AI](https://cloud.google.com/vertex-ai).

### Create form

![Create Model Provider form for Google Vertex showing three required fields: Auth (record/expression toggle, with hint 'OAuth2RefreshConfig for OAuth2 refresh token flow, or ServiceAccountConfig for automatic token refresh via service account'), Project ID, Model (with hint 'The model in publisher/model-name format, e.g., google/gemini-2.0-flash'). Below: Advanced Configurations Expand link, Model Provider Name vertexModelprovider, Result Type vertex:ModelProvider.](/img/genai/develop/components/model-providers/11-vertex-basic.png)

| Field | Required | Default | Available values |
|---|---|---|---|
| **Auth** | Yes | - | OAuth2 refresh-token record, a service-account record, or a path to a service-account JSON file. See [auth options](#vertex-auth-options) below. |
| **Project ID** | Yes | - | Your Google Cloud project ID. |
| **Model** | Yes | - | Publisher-prefixed model name. Examples: `google/gemini-2.0-flash`, `anthropic/claude-sonnet-4-6`, `mistralai/mistral-medium-3`, `meta/llama-4-maverick-17b-128e-instruct-maas`, `deepseek-ai/deepseek-v3-0324`, `qwen/qwen3-235b-a22b`, `kimi/kimi-k2`, `minimax/minimax-m2`. |

### Advanced configurations

![Google Vertex Create Model Provider form with Advanced Configurations expanded showing Location (default 'global'), Service URL (default 'https://\{location\}-aiplatform.googleapis.com').](/img/genai/develop/components/model-providers/12-vertex-advanced.png)

| Field | Default | Available values | What it controls |
|---|---|---|---|
| **Location** | `"global"` | `"global"`, `"us-central1"`, `"europe-west1"`, etc. | Google Cloud region. |
| **Service URL** | `""` (auto-derived from Location) | URL string | Override the regional endpoint. Defaults to `https://\{location\}-aiplatform.googleapis.com`. |
| **Maximum Tokens** | `512` | Any positive integer | Hard cap on response length. |
| **Temperature** | `()` (omitted from request) | `0.0`-`2.0` or empty | Sampling temperature. Leave empty for models that reject the field (e.g. some Anthropic-on-Vertex calls). |

Plus the [Standard HTTP advanced configurations](#standard-http-advanced-configurations).

### Vertex auth options {#vertex-auth-options}

| Auth type | Fields | When to use |
|---|---|---|
| **OAuth2 refresh config** | `clientId`, `clientSecret`, `refreshToken`, optional `refreshUrl` | Already have OAuth2 refresh-token credentials. |
| **Service account config** | `clientEmail`, `privateKey`, optional `scopes` | Want explicit credentials in source. |
| **Service account JSON path** | A file path string | Easiest - point at the downloaded service-account JSON file from the Google Cloud console. The connector reads `client_email` and `private_key` automatically and refreshes the token. |

Vertex also ships an **Embedding Provider**. See [Google Vertex](/docs/genai/develop/components/embedding-providers#google-vertex).

## Mistral

EU-hosted Mistral and Mixtral models, including Codestral and Pixtral.

Official website: [mistral.ai](https://www.mistral.ai/).

### Create form

![Create Model Provider form for Mistral showing two required fields: API Key and Model Type. Below: Advanced Configurations Expand link, Model Provider Name mistralModelprovider, Result Type mistral:ModelProvider.](/img/genai/develop/components/model-providers/13-mistral-basic.png)

| Field | Required | Default | Available values |
|---|---|---|---|
| **API Key** | Yes | - | Mistral AI API key. |
| **Model Type** | Yes | - | `mistral-large-latest`, `mistral-medium-latest`, `mistral-small-latest`, `codestral-latest`, `ministral-8b-latest`, `ministral-3b-latest`, `pixtral-large-latest`, `open-mixtral-8x22b`, `open-mixtral-8x7b`, `open-mistral-nemo`, `devstral-small-latest`, `mistral-saba-latest`. Date-pinned variants (e.g. `mistral-large-2411`, `codestral-2501`) are also available. |

### Advanced configurations

![Mistral Create Model Provider form with Advanced Configurations expanded showing Service URL (default https://api.mistral.ai/v1), Maximum Tokens (default 512), Temperature (default 0.7).](/img/genai/develop/components/model-providers/14-mistral-advanced.png)

| Field | Default | Available values | What it controls |
|---|---|---|---|
| **Service URL** | `https://api.mistral.ai/v1` | URL string | Mistral API base URL. |
| **Maximum Tokens** | `512` | Any positive integer | Hard cap on response length. |
| **Temperature** | `0.7` | `0.0`-`1.0` | Sampling temperature. |

Plus the [Standard HTTP advanced configurations](#standard-http-advanced-configurations).

## Ollama

Local model runner. Nothing leaves the machine. It is useful for offline development, privacy-sensitive flows, and any model Ollama supports.

Official website: [ollama.com](https://ollama.com/).

### Create form

![Create Model Provider form for Ollama showing one required field: Model Type. Below: Advanced Configurations Expand link, Model Provider Name ollamaModelprovider, Result Type ollama:ModelProvider.](/img/genai/develop/components/model-providers/17-ollama-basic.png)

| Field | Required | Default | Available values |
|---|---|---|---|
| **Model Type** | Yes | - | Anything `ollama pull` can fetch (e.g. `llama3.2`, `mistral`, `qwen2.5`). |

### Advanced configurations

Ollama exposes Mirostat sampling and other decoding controls that the hosted providers don't.

![Ollama Create Model Provider form with Advanced Configurations expanded showing Service URL (default http://localhost:11434), Mirostat Sampling (default 0, options 0=disabled, 1=Mirostat, 2=Mirostat 2.0), Mirostat Eta (default 0.1), Mirostat Tau (default 5.0), Context Window Size (default 2048).](/img/genai/develop/components/model-providers/18-ollama-advanced.png)

| Field | Default | Available values | What it controls |
|---|---|---|---|
| **Service URL** | `http://localhost:11434` | URL string | URL of the local Ollama daemon. |
| **Mirostat Sampling** | `0` | `0` (disabled), `1` (Mirostat), `2` (Mirostat 2.0) | Whether to use Mirostat sampling for controlling perplexity. |
| **Mirostat Eta** | `0.1` | Any positive number | Mirostat learning rate. Higher = more responsive to feedback. |
| **Mirostat Tau** | `5.0` | Any positive number | Mirostat target perplexity. Lower = more focused, more coherent. |
| **Context Window Size** | `2048` | Any positive integer | Context window in tokens. |
| **Repeat Last N** | `64` | `0` (disabled), `-1` (=context window), or a positive integer | Look-back window for repetition penalty. |
| **Repeat Penalty** | `1.1` | Any positive number | Repetition penalty strength. Higher = stronger penalty. |
| **Temperature** | `0.8` | Any positive number | Sampling temperature. |
| **Seed** | `0` | Any integer | Random seed for deterministic generation. |
| **Number Of Tokens To Predict** | `-1` | `-1` (unlimited) or any positive integer | Maximum tokens to generate. |
| **Top K** | `40` | Any positive integer | Top-K sampling. |
| **Top P** | `0.9` | `0.0`-`1.0` | Top-P (nucleus) sampling. |
| **Min P** | `0.0` | `0.0`-`1.0` | Minimum probability filter relative to the top token. |

Plus the [Standard HTTP advanced configurations](#standard-http-advanced-configurations).

Ollama is the only provider with **no API key**. Authentication is implicit because the daemon trusts callers on `localhost`.

## OpenAI

Connects to OpenAI's hosted models (GPT-4o, GPT-4.1, o1 reasoning models, GPT-3.5-turbo).

Official website: [platform.openai.com](https://platform.openai.com/).

### Create form

![Create Model Provider form for OpenAI showing two required fields: API Key (text/expression toggle) and Model Type (select/expression toggle, value 'No Selection'), then Advanced Configurations Expand link, Model Provider Name set to openaiModelprovider, Result Type set to openai:ModelProvider.](/img/genai/develop/components/model-providers/05-openai-basic.png)

| Field | Required | Default | Available values |
|---|---|---|---|
| **API Key** | Yes | - | Your OpenAI API key (starts with `sk-…`). Reference a `configurable` in production. |
| **Model Type** | Yes | - | `gpt-4o`, `gpt-4o-mini`, `gpt-4.1`, `gpt-4.1-mini`, `gpt-4.1-nano`, `gpt-4-turbo`, `gpt-3.5-turbo`, `o1`, `o1-pro`, `chatgpt-4o-latest`, `gpt-4o-audio-preview`. Date-pinned variants (e.g. `gpt-4o-2024-11-20`) are also available for reproducibility. |

### Advanced configurations

![OpenAI Create Model Provider form with Advanced Configurations expanded. Visible fields: Service URL (default https://api.openai.com/v1), Maximum Tokens (default 512), Temperature (default 0.7), HTTP Version (default http:HTTP_2_0), HTTP1 Settings, HTTP2 Settings, Timeout.](/img/genai/develop/components/model-providers/06-openai-advanced.png)

| Field | Default | Available values | What it controls |
|---|---|---|---|
| **Service URL** | `https://api.openai.com/v1` | URL string | OpenAI API base URL. Override only for OpenAI-compatible gateways. |
| **Maximum Tokens** | `512` | Any positive integer | Hard cap on response length. |
| **Temperature** | `0.7` | `0.0`-`2.0` | Sampling temperature. |

Plus the [Standard HTTP advanced configurations](#standard-http-advanced-configurations) (Timeout, Retry, Circuit Breaker, Proxy, etc.).

The OpenAI package also ships an **Embedding Provider**. See [OpenAI](/docs/genai/develop/components/embedding-providers#openai).

## OpenRouter

OpenRouter routes a single API across many model providers (OpenAI, Anthropic, Mistral, Meta, Cohere, and others). Use it when you want one key and the freedom to swap models by string.

Official website: [openrouter.ai](https://openrouter.ai/).

### Create form

![Create Model Provider form for OpenRouter showing two required fields: API Key (with link to https://openrouter.ai/keys) and Model Type (with example values 'openai/gpt-4o', 'anthropic/claude-3.5-sonnet'). Below: Advanced Configurations Expand link, Model Provider Name openrouterModelprovider, Result Type openrouter:ModelProvider.](/img/genai/develop/components/model-providers/19-openrouter-basic.png)

| Field | Required | Default | Available values |
|---|---|---|---|
| **API Key** | Yes | - | OpenRouter API key. Get one from [openrouter.ai/keys](https://openrouter.ai/keys). |
| **Model Type** | Yes | - | Qualified model name. Examples: `openai/gpt-4o`, `anthropic/claude-3.5-sonnet`, `mistralai/mistral-large`, `meta-llama/llama-3.1-70b-instruct`. See OpenRouter's [model list](https://openrouter.ai/models). |

### Advanced configurations

![OpenRouter Create Model Provider form with Advanced Configurations expanded showing Service URL (default https://openrouter.ai/api/v1), Site URL (sent as HTTP-Referer header), Site Name (sent as X-OpenRouter-Title header), Maximum Tokens (default 512), Temperature (default 0.7), HTTP Version.](/img/genai/develop/components/model-providers/20-openrouter-advanced.png)

| Field | Default | Available values | What it controls |
|---|---|---|---|
| **Service URL** | `https://openrouter.ai/api/v1` | URL string | OpenRouter API base URL. |
| **Site URL** | `()` | URL string or empty | Optional site URL sent as the `HTTP-Referer` header. Used by OpenRouter for site attribution and leaderboards. |
| **Site Name** | `()` | String or empty | Optional site name sent as the `X-OpenRouter-Title` header. |
| **Maximum Tokens** | `512` | Any positive integer | Hard cap on response length. |
| **Temperature** | `()` (omitted) | `0.0`-`2.0` or empty | Sampling temperature. Leave empty to omit. |

Plus the [Standard HTTP advanced configurations](#standard-http-advanced-configurations).

The OpenRouter package also ships an **Embedding Provider**. See [OpenRouter](/docs/genai/develop/components/embedding-providers#openrouter).

## Model provider connections

Once you click **Save**, the model provider becomes a **connection** in your project and shows up in three places at once:

- The left **Connections** tree, under your project (e.g. `wso2ModelProvider`, `openaiModelprovider`).
- The **Model Providers** panel on the right side of any flow editor.
- Wherever a node asks for a model: a `generate` node, a natural function, or the **Model** field of an agent.

The right-side **Model Providers** panel lists every provider connection in the project, with a **+** button to add another and a chevron to expand each connection's available actions:

![The Model Providers right-side panel listing four model-provider connections - anthropicModelprovider, azureOpenaimodelprovider, openaiModelprovider, wso2ModelProvider - each with a chevron and provider logo.](/img/genai/develop/components/model-providers/21-model-providers-panel-multi.png)

At the project level, every provider also appears in the left **Connections** tree, and the integration project's **Design** view wires each artifact to the provider it depends on:

![The integration project Design overview with the left sidebar Connections tree populated with four model-provider connections, and the main canvas wiring three artifacts (chat agent service, HTTP service, MCP service) to their respective model-provider nodes on the right with provider logos.](/img/genai/develop/components/model-providers/22-project-design-multi-providers.png)

## Editing or replacing a model provider

To change a provider's API key, model name, or any other field after it's been created, click the provider name in the left **Connections** tree. The **Edit Connection** modal opens:

![Edit Connection modal centered on screen with Variable Name field, Variable Type field with edit pencil icon, Update Connection button at the bottom.](/img/genai/develop/components/model-providers/23-edit-connection-model.png)

| Field | What it does |
|---|---|
| **Variable Name** | Rename the connection. Updates every reference automatically. |
| **Variable Type** | The Ballerina type. Click the pencil icon to change it (e.g. swap one provider implementation for another - OpenAI to Azure OpenAI - without renaming the connection in the rest of your code). |
| **Advanced Configurations** | Expand to edit HTTP and model parameters. |
| **Update Connection** | Save the change. Existing nodes that referenced the connection continue to work. |

Editing a connection follows the same pattern for every component type. Embedding providers, vector stores, knowledge bases, and chunkers all use the same Edit Connection modal.

## What's next

- [Embedding providers](/docs/genai/develop/components/embedding-providers) — Vector embeddings for RAG. The OpenAI, Azure, Vertex, OpenRouter, and Default WSO2 packages also ship embedding providers.
- [Vector stores](/docs/genai/develop/components/vector-stores.md) — Persist and query embeddings using Pinecone, Weaviate, Qdrant, pgvector, and other backends.
- [Knowledge bases](/docs/genai/develop/components/knowledge-bases.md) — Managed retrieval sources, including Azure AI Search, that plug directly into RAG flows.
- [Chunkers](/docs/genai/develop/components/chunkers.md) — Split documents into chunks before embedding for ingestion into a vector store.
