# Actions

The `ballerina/ai` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Model Provider`](#model-provider) | Unified abstraction for interacting with LLMs: supports multi-turn chat and structured output generation. |
| [`Agent`](#agent) | Autonomous AI agent that reasons, plans, and executes tools iteratively to answer user queries. |
| [`Chat Client`](#chat-client) | HTTP client for sending chat messages to an ai:Listener-based chat service endpoint. |
| [`Vector Knowledge Base`](#vector-knowledge-base) | High-level RAG abstraction for document ingestion, chunking, embedding, vector storage, and retrieval. |
| [`Tool Store`](#tool-store) | Manages tool registration and execution for agents. Typically used internally by the Agent, but can be used standalone for custom agent implementations. |

For event-driven integration, see the [Trigger Reference](trigger-reference.md).

---

## Model provider

Unified abstraction for interacting with LLMs: supports multi-turn chat and structured output generation.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `apiKey / accessToken` | <code>string</code> | Required | The API key or access token for the LLM provider (passed to the provider-specific constructor). |
| `modelType` | <code>string</code> | Provider-specific | The model to use (e.g., `openai:GPT_4O`). Varies by provider. |

### Initializing the client

```ballerina
import ballerina/ai;
import ballerinax/ai.openai;

configurable string openAiApiKey = ?;

final ai:ModelProvider model = check new openai:ModelProvider(openAiApiKey, modelType = openai:GPT_4O);
```

### Operations

#### Chat and generation

<details>
<summary>chat</summary>

Sends a chat request to the LLM with conversation history and optional tool definitions. Returns an assistant message that may contain text content or function call requests.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `messages` | <code>ChatMessage[]&#124;ChatUserMessage</code> | Yes | A single user message for stateless interaction, or an array of messages for context-aware conversation. |
| `tools` | <code>ChatCompletionFunctions[]</code> | No | Tool/function definitions the model can invoke during reasoning. |
| `stop` | <code>string?</code> | No | Stop sequence to halt generation. |

**Returns:** `ChatAssistantMessage|error`

**Sample code:**

```ballerina
ai:ChatUserMessage userMessage = {
    role: ai:USER,
    content: `Tell me a joke about cats!`
};

ai:ChatMessage[] messages = [userMessage];
ai:ChatAssistantMessage response = check model->chat(messages);
```

**Sample response:**

```ballerina
{"role": "assistant", "content": "Why don't cats play poker in the jungle? Too many cheetahs!", "toolCalls": null}
```

</details>

<details>
<summary>generate</summary>

Performs single-turn text generation with structured output. Derives a JSON schema from the provided type descriptor, sends the prompt to the LLM, and maps the response to the expected Ballerina type.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `prompt` | <code>Prompt</code> | Yes | A natural language prompt using Ballerina raw template syntax for variable interpolation. |
| `td` | <code>typedesc&lt;anydata&gt;</code> | No | Type descriptor specifying the expected return type format. |

**Returns:** `td|error`

**Sample code:**

```ballerina
type JokeResponse record {|
    string setup;
    string punchline;
|};

JokeResponse joke = check model->generate(`Tell me a joke about programming!`);
```

**Sample response:**

```ballerina
{"setup": "Why do programmers prefer dark mode?", "punchline": "Because light attracts bugs."}
```

</details>

---

## Agent

Autonomous AI agent that reasons, plans, and executes tools iteratively to answer user queries.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `systemPrompt` | <code>SystemPrompt</code> | Required | Defines the agent's role and instructions. |
| `model` | <code>ModelProvider</code> | Required | The LLM model provider used by the agent. |
| `tools` | <code>(BaseToolKit&#124;ToolConfig&#124;FunctionTool)[]</code> | `[]` | Array of tools (function pointers, tool configs, or toolkits) available to the agent. |
| `maxIter` | <code>INFER_TOOL_COUNT&#124;int</code> | `INFER_TOOL_COUNT` | Maximum reasoning iterations. Defaults to number of tools + 1. |
| `verbose` | <code>boolean</code> | `false` | Enables verbose debug logging. |
| `memory` | <code>Memory?</code> | `ShortTermMemory` | Memory implementation for conversation history. Set to `()` for stateless agent. |
| `toolLoadingStrategy` | <code>ToolLoadingStrategy</code> | `NO_FILTER` | Strategy for loading tool schemas: `NO_FILTER` loads all tools, `LLM_FILTER` uses selective double-dispatch. |

### Initializing the client

```ballerina
import ballerina/ai;
import ballerinax/ai.openai;

configurable string openAiApiKey = ?;

final ai:ModelProvider model = check new openai:ModelProvider(openAiApiKey, modelType = openai:GPT_4O);

@ai:AgentTool
isolated function sum(int a, int b) returns int => a + b;

@ai:AgentTool
isolated function multiply(int a, int b) returns int => a * b;

final ai:Agent mathAgent = check new (
    systemPrompt = {
        role: "Math Tutor",
        instructions: "You are a helpful math tutor. Use the provided tools to compute answers."
    },
    model = model,
    tools = [sum, multiply]
);
```

### Operations

#### Agent execution

<details>
<summary>run</summary>

Executes the agent for a given user query. The agent iteratively reasons, invokes tools, and produces a final response. Supports session-based memory for multi-turn conversations. Can return either a plain string answer or a detailed `Trace` record.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `query` | <code>string</code> | Yes | The natural language input provided to the agent. |
| `sessionId` | <code>string</code> | No | Session ID for memory-based conversation tracking. Defaults to a constant session ID. |
| `context` | <code>Context</code> | No | Additional contextual data passed to tools during execution. |
| `td` | <code>typedesc&lt;Trace&#124;string&gt;</code> | No | Type descriptor: use `string` for plain answer or `ai:Trace` for detailed execution trace. |

**Returns:** `string|Trace|error`

**Sample code:**

```ballerina
string answer = check mathAgent.run(
    "What is 8 + 9 multiplied by 10?",
    sessionId = "student-one"
);
```

**Sample response:**

```ballerina
"The result of (8 + 9) × 10 is 170."
```

</details>

---

## Chat client

HTTP client for sending chat messages to an ai:Listener-based chat service endpoint.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `serviceUrl` | <code>string</code> | Required | The base URL of the chat service (first positional argument). |
| `clientConfig` | <code>ChatClientConfiguration</code> | `{}` | Standard HTTP client configuration (inherits `http:ClientConfiguration`). |

### Initializing the client

```ballerina
import ballerina/ai;

ai:ChatClient chatClient = check new ("http://localhost:9090");
```

### Operations

#### Chat operations

<details>
<summary>Send chat message</summary>

**Signature:** `post /chat`

Sends a chat request message to the remote chat service and returns the response.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `request` | <code>ChatReqMessage</code> | Yes | The chat request containing `sessionId` and `message` fields. |

**Returns:** `ChatRespMessage|error`

**Sample code:**

```ballerina
ai:ChatRespMessage response = check chatClient->/chat.post({
    sessionId: "session-123",
    message: "What is the weather like today?"
});
```

**Sample response:**

```ballerina
{"message": "I don't have access to real-time weather data, but I can help you find weather information if you provide your location."}
```

</details>

---

## Vector knowledge base

High-level RAG abstraction for document ingestion, chunking, embedding, vector storage, and retrieval.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `vectorStore` | <code>VectorStore</code> | Required | The vector store for embedding persistence and similarity search. |
| `embeddingModel` | <code>EmbeddingProvider</code> | Required | The embedding provider for generating vector representations of documents and queries. |
| `chunker` | <code>Chunker&#124;AUTO&#124;DISABLE</code> | `AUTO` | Document chunking strategy. `AUTO` selects chunker by document type, `DISABLE` skips chunking. |

### Initializing the client

```ballerina
import ballerina/ai;
import ballerinax/ai.openai;

configurable string openAiApiKey = ?;

final openai:EmbeddingProvider embeddingModel = check new (openAiApiKey, openai:TEXT_EMBEDDING_3_SMALL);
final ai:VectorStore vectorStore = check new ai:InMemoryVectorStore();
final ai:KnowledgeBase knowledgeBase = new ai:VectorKnowledgeBase(vectorStore, embeddingModel);
```

### Operations

#### Ingestion

<details>
<summary>ingest</summary>

Ingests documents or chunks into the knowledge base. Automatically chunks documents using the configured chunker, generates embeddings, and stores them in the vector store.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `documents` | <code>Document&#124;Document[]&#124;Chunk[]</code> | Yes | The documents or chunks to ingest. |

**Returns:** `error?`

**Sample code:**

```ballerina
ai:DataLoader loader = check new ai:TextDataLoader("./leave_policy.md");
ai:Document|ai:Document[] documents = check loader.load();
check knowledgeBase.ingest(documents);
```

</details>

#### Retrieval

<details>
<summary>retrieve</summary>

Retrieves the most relevant chunks from the knowledge base for a given query using vector similarity search.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `query` | <code>string</code> | Yes | The text query to search for. |
| `topK` | <code>int</code> | No | Maximum number of results to return. Defaults to 10. Use -1 for all entries. |
| `filters` | <code>MetadataFilters?</code> | No | Optional metadata filters to apply during retrieval. |

**Returns:** `QueryMatch[]|error`

**Sample code:**

```ballerina
ai:QueryMatch[] matches = check knowledgeBase.retrieve(
    "How many leave days can an employee carry forward?", 10
);
```

**Sample response:**

```ballerina
[{"chunk": {"type": "text-chunk", "content": "Full-time employees may carry forward up to 5 unused annual leave days to the following calendar year.", "metadata": {"index": 3}}, "similarityScore": 0.89}]
```

</details>

<details>
<summary>deleteByFilter</summary>

Deletes chunks from the knowledge base that match the given metadata filters.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `filters` | <code>MetadataFilters</code> | Yes | The metadata filters used to identify which chunks to delete. |

**Returns:** `error?`

**Sample code:**

```ballerina
check knowledgeBase.deleteByFilter({
    filters: [{key: "fileName", value: "old_policy.md"}]
});
```

</details>

---

## Tool store

Manages tool registration and execution for agents. Typically used internally by the Agent, but can be used standalone for custom agent implementations.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `tools` | <code>(BaseToolKit&#124;ToolConfig&#124;FunctionTool)...</code> | Required | Variadic list of tools, toolkits, or function pointers to register. |

### Initializing the client

```ballerina
import ballerina/ai;

@ai:AgentTool
isolated function greet(string name) returns string => "Hello, " + name + "!";

ai:ToolStore toolStore = check new (greet);
```

### Operations

#### Tool execution

<details>
<summary>execute</summary>

Executes a tool selected by the LLM, passing the generated arguments and optional context.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `action` | <code>LlmToolResponse</code> | Yes | The LLM-generated tool response containing the tool name and arguments. |
| `context` | <code>Context</code> | No | Additional context for the tool execution. |

**Returns:** `ToolOutput|LlmInvalidGenerationError|ToolExecutionError`

**Sample code:**

```ballerina
ai:LlmToolResponse action = {name: "greet", arguments: {"name": "Alice"}};
ai:ToolOutput result = check toolStore.execute(action);
```

**Sample response:**

```ballerina
{"value": "Hello, Alice!"}
```

</details>
