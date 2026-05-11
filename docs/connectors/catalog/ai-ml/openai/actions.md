---
title: Actions
---

# Actions

The `ballerinax/openai` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Comprehensive client for the full OpenAI REST API: chat, images, audio, embeddings, assistants, files, fine-tuning, and more. |

---

## Client

Comprehensive client for the full OpenAI REST API: chat, images, audio, embeddings, assistants, files, fine-tuning, and more.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `http:BearerTokenConfig` | Required | Bearer token configuration containing your OpenAI API key. |
| `httpVersion` | `http:HttpVersion` | `HTTP_2_0` | HTTP protocol version. |
| `timeout` | `decimal` | `60` | Request timeout in seconds. |
| `retryConfig` | `http:RetryConfig` | `()` | Retry configuration for failed requests. |
| `secureSocket` | `http:ClientSecureSocket` | `()` | SSL/TLS configuration. |
| `proxy` | `http:ProxyConfig` | `()` | Proxy server configuration. |

### Initializing the client

```ballerina
import ballerinax/openai;

configurable string token = ?;

openai:Client openaiClient = check new ({
    auth: {token}
});
```

### Operations

#### Chat completions

<details>
<summary>Create chat completion</summary>

Creates a model response for the given chat conversation. Supports text, function calling, and structured outputs.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `request` | `CreateChatCompletionRequest` | Yes | Chat completion request containing model, messages, and optional parameters. |

Returns: `CreateChatCompletionResponse|error`

Sample code:

```ballerina
openai:CreateChatCompletionResponse response = check openaiClient->/chat/completions.post({
    model: "gpt-4o",
    messages: [
        {role: "system", content: "You are a helpful assistant."},
        {role: "user", content: "What is the capital of France?"}
    ]
});
```

Sample response:

```ballerina
{
  "id": "chatcmpl-abc123",
  "object": "chat.completion",
  "created": 1710000000,
  "model": "gpt-4o-2024-08-06",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "The capital of France is Paris."
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {"prompt_tokens": 25, "completion_tokens": 8, "total_tokens": 33}
}
```

</details>

<details>
<summary>List chat completions</summary>

Lists stored chat completions. Only chat completions created with the `store` parameter set to `true` are returned.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `GetChatCompletionsQueries` | No | Query parameters including `model`, `after`, `limit`, and `order`. |

Returns: `ChatCompletionList|error`

Sample code:

```ballerina
openai:ChatCompletionList completions = check openaiClient->/chat/completions();
```

Sample response:

```ballerina
{
  "object": "list",
  "data": [
    {"id": "chatcmpl-abc123", "object": "chat.completion", "model": "gpt-4o", "created": 1710000000}
  ],
  "has_more": false
}
```

</details>

<details>
<summary>Retrieve chat completion</summary>

Retrieves a stored chat completion by its ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `completionId` | `string` | Yes | The ID of the chat completion to retrieve. |

Returns: `CreateChatCompletionResponse|error`

Sample code:

```ballerina
openai:CreateChatCompletionResponse completion = check openaiClient->/chat/completions/["chatcmpl-abc123"]();
```

Sample response:

```ballerina
{
  "id": "chatcmpl-abc123",
  "object": "chat.completion",
  "model": "gpt-4o",
  "choices": [
    {"index": 0, "message": {"role": "assistant", "content": "Hello!"}, "finish_reason": "stop"}
  ]
}
```

</details>

<details>
<summary>Delete chat completion</summary>

Deletes a stored chat completion. Only completions created with the `store` parameter set to `true` can be deleted.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `completionId` | `string` | Yes | The ID of the chat completion to delete. |

Returns: `ChatCompletionDeleted|error`

Sample code:

```ballerina
openai:ChatCompletionDeleted result = check openaiClient->/chat/completions/["chatcmpl-abc123"].delete();
```

Sample response:

```ballerina
{"id": "chatcmpl-abc123", "object": "chat.completion.deleted", "deleted": true}
```

</details>

#### Images

<details>
<summary>Create image</summary>

Creates an image given a prompt using DALL·E models.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `request` | `CreateImageRequest` | Yes | Image generation request containing prompt, model, size, and quality options. |

Returns: `ImagesResponse|error`

Sample code:

```ballerina
openai:ImagesResponse images = check openaiClient->/images/generations.post({
    model: "dall-e-3",
    prompt: "A serene mountain landscape at sunset",
    n: 1,
    size: "1024x1024"
});
```

Sample response:

```ballerina
{
  "created": 1710000000,
  "data": [
    {"url": "https://oaidalleapiprodscus.blob.core.windows.net/...", "revised_prompt": "A serene mountain landscape at sunset..."}
  ]
}
```

</details>

<details>
<summary>Create image edit</summary>

Creates an edited or extended image given an original image and a prompt.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `request` | `CreateImageEditRequest` | Yes | Image edit request containing the image, mask, prompt, and options. |

Returns: `ImagesResponse|error`

Sample code:

```ballerina
openai:ImagesResponse editedImages = check openaiClient->/images/edits.post({
    image: {fileContent: check io:fileReadBytes("original.png"), fileName: "original.png"},
    prompt: "Add a rainbow in the sky",
    n: 1,
    size: "1024x1024"
});
```

Sample response:

```ballerina
{
  "created": 1710000000,
  "data": [
    {"url": "https://oaidalleapiprodscus.blob.core.windows.net/..."}
  ]
}
```

</details>

#### Audio

<details>
<summary>Create speech</summary>

Generates audio from the input text using a TTS model.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `request` | `CreateSpeechRequest` | Yes | Speech request containing model, input text, and voice. |

Returns: `byte[]|error`

Sample code:

```ballerina
byte[] audioBytes = check openaiClient->/audio/speech.post({
    model: "tts-1",
    input: "Hello, welcome to the Ballerina OpenAI connector!",
    voice: "alloy"
});
```

</details>

<details>
<summary>Create transcription</summary>

Transcribes audio into text in the input language.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `request` | `CreateTranscriptionRequest` | Yes | Transcription request containing the audio file and model. |

Returns: `InlineResponse200|error`

Sample code:

```ballerina
openai:InlineResponse200 transcription = check openaiClient->/audio/transcriptions.post({
    file: {fileContent: check io:fileReadBytes("audio.mp3"), fileName: "audio.mp3"},
    model: "whisper-1"
});
```

Sample response:

```ballerina
{"text": "Hello, this is a test transcription of the audio file."}
```

</details>

#### Embeddings

<details>
<summary>Create embeddings</summary>

Creates an embedding vector representing the input text.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `request` | `CreateEmbeddingRequest` | Yes | Embedding request containing the input text and model. |

Returns: `CreateEmbeddingResponse|error`

Sample code:

```ballerina
openai:CreateEmbeddingResponse embeddings = check openaiClient->/embeddings.post({
    model: "text-embedding-3-small",
    input: "The quick brown fox jumps over the lazy dog"
});
```

Sample response:

```ballerina
{
  "object": "list",
  "data": [
    {"object": "embedding", "index": 0, "embedding": [0.0023, -0.0091, 0.0154, ...]}
  ],
  "model": "text-embedding-3-small",
  "usage": {"prompt_tokens": 9, "total_tokens": 9}
}
```

</details>

#### Assistants

<details>
<summary>Create assistant</summary>

Creates an assistant with a model and instructions.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `request` | `CreateAssistantRequest` | Yes | Assistant creation request containing model, name, instructions, and tools. |

Returns: `AssistantObject|error`

Sample code:

```ballerina
openai:AssistantObject assistant = check openaiClient->/assistants.post({
    model: "gpt-4o",
    name: "Financial Advisor",
    instructions: "You are a personal financial advisor. Provide clear, actionable advice."
});
```

Sample response:

```ballerina
{
  "id": "asst_abc123",
  "object": "assistant",
  "name": "Financial Advisor",
  "model": "gpt-4o",
  "instructions": "You are a personal financial advisor. Provide clear, actionable advice.",
  "tools": [],
  "created_at": 1710000000
}
```

</details>

<details>
<summary>List assistants</summary>

Returns a list of assistants.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `ListAssistantsQueries` | No | Query parameters including `limit`, `order`, `after`, and `before`. |

Returns: `ListAssistantsResponse|error`

Sample code:

```ballerina
openai:ListAssistantsResponse assistants = check openaiClient->/assistants();
```

Sample response:

```ballerina
{
  "object": "list",
  "data": [
    {"id": "asst_abc123", "object": "assistant", "name": "Financial Advisor", "model": "gpt-4o"}
  ],
  "has_more": false
}
```

</details>

<details>
<summary>Delete assistant</summary>

Deletes an assistant.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `assistantId` | `string` | Yes | The ID of the assistant to delete. |

Returns: `DeleteAssistantResponse|error`

Sample code:

```ballerina
openai:DeleteAssistantResponse result = check openaiClient->/assistants/["asst_abc123"].delete();
```

Sample response:

```ballerina
{"id": "asst_abc123", "object": "assistant.deleted", "deleted": true}
```

</details>

#### Threads & messages

<details>
<summary>Create thread</summary>

Creates a thread for an assistant conversation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `request` | `CreateThreadRequest` | Yes | Thread creation request, optionally containing initial messages. |

Returns: `ThreadObject|error`

Sample code:

```ballerina
openai:ThreadObject thread = check openaiClient->/threads.post({});
```

Sample response:

```ballerina
{
  "id": "thread_abc123",
  "object": "thread",
  "created_at": 1710000000,
  "metadata": {}
}
```

</details>

<details>
<summary>Create message</summary>

Creates a message within a thread.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `threadId` | `string` | Yes | The ID of the thread to create the message in. |
| `request` | `CreateMessageRequest` | Yes | Message request containing the role and content. |

Returns: `MessageObject|error`

Sample code:

```ballerina
openai:MessageObject message = check openaiClient->/threads/[thread.id]/messages.post({
    role: "user",
    content: "What are some good strategies for saving money?"
});
```

Sample response:

```ballerina
{
  "id": "msg_abc123",
  "object": "thread.message",
  "thread_id": "thread_abc123",
  "role": "user",
  "content": [{"type": "text", "text": {"value": "What are some good strategies for saving money?"}}],
  "created_at": 1710000000
}
```

</details>

<details>
<summary>List messages</summary>

Returns a list of messages for a given thread.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `threadId` | `string` | Yes | The ID of the thread. |
| `queries` | `ListMessagesQueries` | No | Query parameters including `limit`, `order`, `after`, and `before`. |

Returns: `ListMessagesResponse|error`

Sample code:

```ballerina
openai:ListMessagesResponse messages = check openaiClient->/threads/[thread.id]/messages();
```

Sample response:

```ballerina
{
  "object": "list",
  "data": [
    {"id": "msg_abc123", "object": "thread.message", "role": "assistant", "content": [{"type": "text", "text": {"value": "Here are some strategies..."}}]}
  ],
  "has_more": false
}
```

</details>

#### Runs

<details>
<summary>Create run</summary>

Creates a run for a thread with a specified assistant.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `threadId` | `string` | Yes | The ID of the thread to run. |
| `request` | `CreateRunRequest` | Yes | Run request containing the assistant ID and optional parameters. |

Returns: `RunObject|error`

Sample code:

```ballerina
openai:RunObject run = check openaiClient->/threads/[thread.id]/runs.post({
    assistant_id: assistant.id
});
```

Sample response:

```ballerina
{
  "id": "run_abc123",
  "object": "thread.run",
  "thread_id": "thread_abc123",
  "assistant_id": "asst_abc123",
  "status": "queued",
  "created_at": 1710000000
}
```

</details>

<details>
<summary>Retrieve run</summary>

Retrieves a run to check its status and results.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `threadId` | `string` | Yes | The ID of the thread. |
| `runId` | `string` | Yes | The ID of the run to retrieve. |

Returns: `RunObject|error`

Sample code:

```ballerina
openai:RunObject runStatus = check openaiClient->/threads/[thread.id]/runs/[run.id]();
```

Sample response:

```ballerina
{
  "id": "run_abc123",
  "object": "thread.run",
  "status": "completed",
  "assistant_id": "asst_abc123",
  "thread_id": "thread_abc123"
}
```

</details>

<details>
<summary>Cancel run</summary>

Cancels an in-progress run.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `threadId` | `string` | Yes | The ID of the thread. |
| `runId` | `string` | Yes | The ID of the run to cancel. |

Returns: `RunObject|error`

Sample code:

```ballerina
openai:RunObject cancelledRun = check openaiClient->/threads/[thread.id]/runs/[run.id]/cancel.post();
```

Sample response:

```ballerina
{
  "id": "run_abc123",
  "object": "thread.run",
  "status": "cancelling",
  "assistant_id": "asst_abc123"
}
```

</details>

#### Files

<details>
<summary>List files</summary>

Returns a list of files that belong to the user's organization.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `ListFilesQueries` | No | Query parameters including `purpose`, `limit`, `order`, and `after`. |

Returns: `ListFilesResponse|error`

Sample code:

```ballerina
openai:ListFilesResponse files = check openaiClient->/files();
```

Sample response:

```ballerina
{
  "object": "list",
  "data": [
    {"id": "file-abc123", "object": "file", "bytes": 12345, "filename": "data.jsonl", "purpose": "fine-tune"}
  ],
  "has_more": false
}
```

</details>

<details>
<summary>Upload file</summary>

Uploads a file that can be used across various endpoints such as fine-tuning, assistants, and batches.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `request` | `CreateFileRequest` | Yes | File upload request containing the file and its purpose. |

Returns: `OpenAIFile|error`

Sample code:

```ballerina
openai:OpenAIFile file = check openaiClient->/files.post({
    file: {fileContent: check io:fileReadBytes("training-data.jsonl"), fileName: "training-data.jsonl"},
    purpose: "fine-tune"
});
```

Sample response:

```ballerina
{
  "id": "file-abc123",
  "object": "file",
  "bytes": 12345,
  "filename": "training-data.jsonl",
  "purpose": "fine-tune",
  "status": "processed"
}
```

</details>

<details>
<summary>Delete file</summary>

Deletes a file.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fileId` | `string` | Yes | The ID of the file to delete. |

Returns: `DeleteFileResponse|error`

Sample code:

```ballerina
openai:DeleteFileResponse result = check openaiClient->/files/["file-abc123"].delete();
```

Sample response:

```ballerina
{"id": "file-abc123", "object": "file", "deleted": true}
```

</details>

#### Fine-Tuning

<details>
<summary>Create fine-tuning job</summary>

Creates a fine-tuning job to customize a model with your training data.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `request` | `CreateFineTuningJobRequest` | Yes | Fine-tuning request containing model, training file ID, and hyperparameters. |

Returns: `FineTuningJob|error`

Sample code:

```ballerina
openai:FineTuningJob job = check openaiClient->/fine_tuning/jobs.post({
    model: "gpt-4o-mini-2024-07-18",
    training_file: "file-abc123"
});
```

Sample response:

```ballerina
{
  "id": "ftjob-abc123",
  "object": "fine_tuning.job",
  "model": "gpt-4o-mini-2024-07-18",
  "training_file": "file-abc123",
  "status": "validating_files",
  "created_at": 1710000000
}
```

</details>

<details>
<summary>List fine-tuning jobs</summary>

Lists your organization's fine-tuning jobs.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `ListPaginatedFineTuningJobsQueries` | No | Query parameters including `after` and `limit`. |

Returns: `ListPaginatedFineTuningJobsResponse|error`

Sample code:

```ballerina
openai:ListPaginatedFineTuningJobsResponse jobs = check openaiClient->/fine_tuning/jobs();
```

Sample response:

```ballerina
{
  "object": "list",
  "data": [
    {"id": "ftjob-abc123", "object": "fine_tuning.job", "model": "gpt-4o-mini-2024-07-18", "status": "succeeded"}
  ],
  "has_more": false
}
```

</details>

<details>
<summary>Cancel fine-tuning job</summary>

Immediately cancels a fine-tuning job.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fineTuningJobId` | `string` | Yes | The ID of the fine-tuning job to cancel. |

Returns: `FineTuningJob|error`

Sample code:

```ballerina
openai:FineTuningJob cancelledJob = check openaiClient->/fine_tuning/jobs/["ftjob-abc123"]/cancel.post();
```

Sample response:

```ballerina
{
  "id": "ftjob-abc123",
  "object": "fine_tuning.job",
  "status": "cancelled"
}
```

</details>

#### Vector stores

<details>
<summary>Create vector store</summary>

Creates a vector store for use with the file search tool in assistants.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `request` | `CreateVectorStoreRequest` | Yes | Vector store creation request containing name and optional file IDs. |

Returns: `VectorStoreObject|error`

Sample code:

```ballerina
openai:VectorStoreObject vectorStore = check openaiClient->/vector_stores.post({
    name: "Knowledge Base"
});
```

Sample response:

```ballerina
{
  "id": "vs_abc123",
  "object": "vector_store",
  "name": "Knowledge Base",
  "status": "completed",
  "file_counts": {"in_progress": 0, "completed": 0, "failed": 0, "cancelled": 0, "total": 0},
  "created_at": 1710000000
}
```

</details>

<details>
<summary>List vector stores</summary>

Returns a list of vector stores.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `ListVectorStoresQueries` | No | Query parameters including `limit`, `order`, `after`, and `before`. |

Returns: `ListVectorStoresResponse|error`

Sample code:

```ballerina
openai:ListVectorStoresResponse stores = check openaiClient->/vector_stores();
```

Sample response:

```ballerina
{
  "object": "list",
  "data": [
    {"id": "vs_abc123", "object": "vector_store", "name": "Knowledge Base", "status": "completed"}
  ],
  "has_more": false
}
```

</details>

<details>
<summary>Delete vector store</summary>

Deletes a vector store.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `vectorStoreId` | `string` | Yes | The ID of the vector store to delete. |

Returns: `DeleteVectorStoreResponse|error`

Sample code:

```ballerina
openai:DeleteVectorStoreResponse result = check openaiClient->/vector_stores/["vs_abc123"].delete();
```

Sample response:

```ballerina
{"id": "vs_abc123", "object": "vector_store.deleted", "deleted": true}
```

</details>

#### Models

<details>
<summary>List models</summary>

Lists the currently available models and provides basic information about each.

Returns: `ListModelsResponse|error`

Sample code:

```ballerina
openai:ListModelsResponse models = check openaiClient->/models();
```

Sample response:

```ballerina
{
  "object": "list",
  "data": [
    {"id": "gpt-4o", "object": "model", "owned_by": "openai", "created": 1710000000},
    {"id": "dall-e-3", "object": "model", "owned_by": "openai", "created": 1710000000}
  ]
}
```

</details>

<details>
<summary>Retrieve model</summary>

Retrieves a model instance, providing basic information about the model.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `model` | `string` | Yes | The ID of the model to retrieve (e.g., `"gpt-4o"`). |

Returns: `Model|error`

Sample code:

```ballerina
openai:Model model = check openaiClient->/models/["gpt-4o"]();
```

Sample response:

```ballerina
{"id": "gpt-4o", "object": "model", "owned_by": "openai", "created": 1710000000}
```

</details>

<details>
<summary>Delete fine-tuned model</summary>

Deletes a fine-tuned model. You must have the Owner role in your organization.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `model` | `string` | Yes | The model ID to delete (e.g., `"ft:gpt-4o-mini:my-org:custom:abc123"`). |

Returns: `DeleteModelResponse|error`

Sample code:

```ballerina
openai:DeleteModelResponse result = check openaiClient->/models/["ft:gpt-4o-mini:my-org:custom:abc123"].delete();
```

Sample response:

```ballerina
{"id": "ft:gpt-4o-mini:my-org:custom:abc123", "object": "model", "deleted": true}
```

</details>

#### Moderations

<details>
<summary>Create moderation</summary>

Classifies if text and/or images are potentially harmful across several categories.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `request` | `CreateModerationRequest` | Yes | Moderation request containing the input text or images to classify. |

Returns: `CreateModerationResponse|error`

Sample code:

```ballerina
openai:CreateModerationResponse moderation = check openaiClient->/moderations.post({
    input: "I want to learn about safe coding practices."
});
```

Sample response:

```ballerina
{
  "id": "modr-abc123",
  "model": "omni-moderation-latest",
  "results": [
    {
      "flagged": false,
      "categories": {"sexual": false, "hate": false, "violence": false, "self-harm": false},
      "category_scores": {"sexual": 0.0001, "hate": 0.0002, "violence": 0.0001, "self-harm": 0.0001}
    }
  ]
}
```

</details>

#### Batches

<details>
<summary>Create batch</summary>

Creates and executes a batch of API requests from an uploaded file of requests.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `request` | `CreateBatchRequest` | Yes | Batch request containing the input file ID, endpoint, and completion window. |

Returns: `Batch|error`

Sample code:

```ballerina
openai:Batch batch = check openaiClient->/batches.post({
    input_file_id: "file-abc123",
    endpoint: "/v1/chat/completions",
    completion_window: "24h"
});
```

Sample response:

```ballerina
{
  "id": "batch_abc123",
  "object": "batch",
  "endpoint": "/v1/chat/completions",
  "input_file_id": "file-abc123",
  "status": "validating",
  "completion_window": "24h",
  "created_at": 1710000000
}
```

</details>

<details>
<summary>Retrieve batch</summary>

Retrieves a batch to check its status and results.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `batchId` | `string` | Yes | The ID of the batch to retrieve. |

Returns: `Batch|error`

Sample code:

```ballerina
openai:Batch batchStatus = check openaiClient->/batches/["batch_abc123"]();
```

Sample response:

```ballerina
{
  "id": "batch_abc123",
  "object": "batch",
  "status": "completed",
  "output_file_id": "file-xyz789",
  "request_counts": {"total": 100, "completed": 100, "failed": 0}
}
```

</details>

#### Responses

<details>
<summary>Create response</summary>

Creates a model response. Provides a unified interface supporting text generation, tool use, and structured outputs.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `request` | `CreateResponseRequest` | Yes | Response request containing model, input, and optional instructions. |

Returns: `Response|error`

Sample code:

```ballerina
openai:Response response = check openaiClient->/responses.post({
    model: "gpt-4o",
    input: "Explain quantum computing in simple terms."
});
```

Sample response:

```ballerina
{
  "id": "resp_abc123",
  "object": "response",
  "model": "gpt-4o",
  "output": [
    {"type": "message", "role": "assistant", "content": [{"type": "output_text", "text": "Quantum computing uses quantum bits..."}]}
  ],
  "usage": {"input_tokens": 12, "output_tokens": 45, "total_tokens": 57}
}
```

</details>

<details>
<summary>Delete response</summary>

Deletes a model response with the given ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `responseId` | `string` | Yes | The ID of the response to delete. |

Returns: `error?`

Sample code:

```ballerina
check openaiClient->/responses/["resp_abc123"].delete();
```

</details>
