---
title: Actions
---

# Actions

The `ballerinax/mistral` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Full Mistral REST API: chat, FIM, embeddings, OCR, moderation, agents, models, files, fine-tuning, and batch jobs. |

---

## Client

Full Mistral REST API: chat, FIM, embeddings, OCR, moderation, agents, models, files, fine-tuning, and batch jobs.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `http:BearerTokenConfig` | Required | Bearer token configuration with the Mistral API key. |
| `httpVersion` | `http:HttpVersion` | `http:HTTP_2_0` | HTTP protocol version. |
| `timeout` | `decimal` | `30` | Response timeout in seconds. |
| `retryConfig` | `http:RetryConfig?` | `()` | Retry configuration for failed requests. |
| `secureSocket` | `http:ClientSecureSocket?` | `()` | SSL/TLS configuration. |
| `proxy` | `http:ProxyConfig?` | `()` | Proxy server configuration. |
| `circuitBreaker` | `http:CircuitBreakerConfig?` | `()` | Circuit breaker configuration. |
| `compression` | `http:Compression` | `http:COMPRESSION_AUTO` | Compression setting for requests. |
| `validation` | `boolean` | `true` | Enable or disable constraint validation. |

### Initializing the client

```ballerina
import ballerinax/mistral;

configurable string apiKey = ?;

mistral:Client mistralClient = check new ({
    auth: {
        token: apiKey
    }
});
```

### Operations

#### Chat & agents

<details>
<summary>Create a chat completion</summary>

Generates a chat completion response from the model given a list of messages.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `request` | `ChatCompletionRequest` | Yes | Chat completion request with model, messages, and optional parameters. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `ChatCompletionResponse|error`

Sample code:

```ballerina
mistral:ChatCompletionResponse response = check mistralClient->/chat/completions.post({
    model: "mistral-large-latest",
    messages: [
        {role: "user", content: "What is the capital of France?"}
    ]
});
```

Sample response:

```ballerina
{
  "id": "cmpl-abc123",
  "object": "chat.completion",
  "created": 1710000000,
  "model": "mistral-large-latest",
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
  "usage": {
    "prompt_tokens": 15,
    "completion_tokens": 9,
    "total_tokens": 24
  }
}
```

</details>

<details>
<summary>Create an agent completion</summary>

Generates a completion using a Mistral agent identified by its agent ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `request` | `AgentsCompletionRequest` | Yes | Agent completion request with agent ID and messages. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `ChatCompletionResponse|error`

Sample code:

```ballerina
mistral:ChatCompletionResponse response = check mistralClient->/agents/completions.post({
    agentId: "ag:abc123:20250101:my-agent:xyz789",
    messages: [
        {role: "user", content: "Summarize the latest sales report."}
    ]
});
```

Sample response:

```ballerina
{
  "id": "cmpl-agent-456",
  "object": "chat.completion",
  "created": 1710000000,
  "model": "mistral-large-latest",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "The latest sales report shows a 15% increase in Q4 revenue..."
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 20,
    "completion_tokens": 35,
    "total_tokens": 55
  }
}
```

</details>

#### Code completion

<details>
<summary>Create a FIM completion</summary>

Generates a fill-in-the-middle code completion given a prompt and optional suffix.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `request` | `FIMCompletionRequest` | Yes | FIM completion request with prompt, suffix, and model. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `FIMCompletionResponse|error`

Sample code:

```ballerina
mistral:FIMCompletionResponse response = check mistralClient->/fim/completions.post({
    model: "codestral-latest",
    prompt: "def fibonacci(n):\n    if n <= 1:\n        return n\n    ",
    suffix: "\n    return fibonacci(n-1) + fibonacci(n-2)"
});
```

Sample response:

```ballerina
{
  "id": "fim-abc123",
  "object": "fim.completion",
  "created": 1710000000,
  "model": "codestral-latest",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "else:"
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 25,
    "completion_tokens": 3,
    "total_tokens": 28
  }
}
```

</details>

#### Embeddings

<details>
<summary>Create embeddings</summary>

Generates vector embeddings for the given input text or texts.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `request` | `EmbeddingRequest` | Yes | Embedding request with model and input text(s). |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `EmbeddingResponse|error`

Sample code:

```ballerina
mistral:EmbeddingResponse response = check mistralClient->/embeddings.post({
    model: "mistral-embed",
    input: ["Ballerina is a programming language for integration.", "Mistral AI provides LLMs."]
});
```

Sample response:

```ballerina
{
  "id": "emb-abc123",
  "object": "list",
  "model": "mistral-embed",
  "data": [
    {
      "object": "embedding",
      "index": 0,
      "embedding": [0.0123, -0.0456, 0.0789, "..."]
    },
    {
      "object": "embedding",
      "index": 1,
      "embedding": [0.0321, -0.0654, 0.0987, "..."]
    }
  ],
  "usage": {
    "prompt_tokens": 18,
    "total_tokens": 18
  }
}
```

</details>

#### OCR

<details>
<summary>Perform OCR on a document</summary>

Extracts text from a document or image using optical character recognition.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `request` | `OCRRequest` | Yes | OCR request with document URL or image URL and optional page selection. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `OCRResponse|error`

Sample code:

```ballerina
mistral:OCRResponse response = check mistralClient->/ocr.post({
    model: "mistral-ocr-latest",
    document: {
        'type: "document_url",
        documentUrl: "https://example.com/invoice.pdf"
    }
});
```

Sample response:

```ballerina
{
  "pages": [
    {
      "index": 0,
      "markdown": "# Invoice\n\nDate: 2025-01-15\nTotal: $1,250.00\n\n| Item | Qty | Price |\n|------|-----|-------|\n| Widget A | 5 | $250.00 |"
    }
  ],
  "model": "mistral-ocr-latest",
  "usage": {
    "pages_processed": 1
  }
}
```

</details>

#### Moderation

<details>
<summary>Classify text content</summary>

Classifies text input for content moderation using the specified model.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `request` | `ClassificationRequest` | Yes | Classification request with model and input text(s). |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `ClassificationResponse|error`

Sample code:

```ballerina
mistral:ClassificationResponse response = check mistralClient->/moderations.post({
    model: "mistral-moderation-latest",
    input: ["This is a normal message."]
});
```

Sample response:

```ballerina
{
  "id": "mod-abc123",
  "model": "mistral-moderation-latest",
  "results": [
    {
      "categories": {
        "sexual": false,
        "hate_and_discrimination": false,
        "violence_and_threats": false,
        "dangerous_and_criminal_content": false,
        "selfharm": false,
        "health": false,
        "financial": false,
        "law": false,
        "pii": false
      }
    }
  ]
}
```

</details>

<details>
<summary>Classify chat content</summary>

Classifies chat conversation input for content moderation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `request` | `ChatModerationRequest` | Yes | Chat moderation request with model and chat messages. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `ClassificationResponse|error`

Sample code:

```ballerina
mistral:ClassificationResponse response = check mistralClient->/chat/moderations.post({
    model: "mistral-moderation-latest",
    input: [
        {role: "user", content: "Tell me about the weather today."}
    ]
});
```

Sample response:

```ballerina
{
  "id": "mod-chat-456",
  "model": "mistral-moderation-latest",
  "results": [
    {
      "categories": {
        "sexual": false,
        "hate_and_discrimination": false,
        "violence_and_threats": false,
        "dangerous_and_criminal_content": false,
        "selfharm": false,
        "health": false,
        "financial": false,
        "law": false,
        "pii": false
      }
    }
  ]
}
```

</details>

#### Models

<details>
<summary>List all models</summary>

Retrieves the list of all available models.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `ModelList|error`

Sample code:

```ballerina
mistral:ModelList models = check mistralClient->/models();
```

Sample response:

```ballerina
{
  "object": "list",
  "data": [
    {
      "id": "mistral-large-latest",
      "object": "model",
      "created": 1710000000,
      "owned_by": "mistralai"
    },
    {
      "id": "mistral-small-latest",
      "object": "model",
      "created": 1710000000,
      "owned_by": "mistralai"
    }
  ]
}
```

</details>

<details>
<summary>Retrieve a model</summary>

Retrieves details about a specific model by its ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `modelId` | `string` | Yes | The ID of the model to retrieve. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `ResponseRetrieveModelV1ModelsModelIdGet|error`

Sample code:

```ballerina
mistral:ResponseRetrieveModelV1ModelsModelIdGet model = check mistralClient->/models/["mistral-large-latest"]();
```

Sample response:

```ballerina
{
  "id": "mistral-large-latest",
  "object": "model",
  "created": 1710000000,
  "owned_by": "mistralai",
  "capabilities": {
    "completion_chat": true,
    "completion_fim": false,
    "fine_tuning": true,
    "function_calling": true,
    "vision": true
  },
  "max_context_length": 128000
}
```

</details>

<details>
<summary>Delete a model</summary>

Deletes a fine-tuned model. You cannot delete base models.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `modelId` | `string` | Yes | The ID of the fine-tuned model to delete. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `DeleteModelOut|error`

Sample code:

```ballerina
mistral:DeleteModelOut result = check mistralClient->/models/["ft:mistral-small:my-model:abc123"].delete();
```

Sample response:

```ballerina
{
  "id": "ft:mistral-small:my-model:abc123",
  "object": "model",
  "deleted": true
}
```

</details>

#### Files

<details>
<summary>List files</summary>

Returns a list of files owned by the user's organization, with optional filtering.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `FilesApiRoutesListFilesQueries` | No | Optional query parameters for filtering (purpose, page, pageSize, search, source, sampleType). |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `ListFilesOut|error`

Sample code:

```ballerina
mistral:ListFilesOut files = check mistralClient->/files();
```

Sample response:

```ballerina
{
  "data": [
    {
      "id": "file-abc123",
      "object": "file",
      "bytes": 1024,
      "created_at": 1710000000,
      "filename": "training_data.jsonl",
      "purpose": "fine-tune"
    }
  ],
  "total": 1
}
```

</details>

<details>
<summary>Upload a file</summary>

Uploads a file for use with fine-tuning or batch jobs.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `request` | `MultiPartBodyParams` | Yes | Multipart body with file data and purpose. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `UploadFileOut|error`

Sample code:

```ballerina
mistral:UploadFileOut result = check mistralClient->/files.post({
    file: {fileContent: check io:fileReadBytes("training_data.jsonl"), fileName: "training_data.jsonl"},
    purpose: "fine-tune"
});
```

Sample response:

```ballerina
{
  "id": "file-def456",
  "object": "file",
  "bytes": 2048,
  "created_at": 1710000000,
  "filename": "training_data.jsonl",
  "purpose": "fine-tune"
}
```

</details>

<details>
<summary>Retrieve file metadata</summary>

Retrieves metadata for a specific file.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fileId` | `string` | Yes | The ID of the file. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `RetrieveFileOut|error`

Sample code:

```ballerina
mistral:RetrieveFileOut file = check mistralClient->/files/["file-abc123"]();
```

Sample response:

```ballerina
{
  "id": "file-abc123",
  "object": "file",
  "bytes": 1024,
  "created_at": 1710000000,
  "filename": "training_data.jsonl",
  "purpose": "fine-tune"
}
```

</details>

<details>
<summary>Delete a file</summary>

Deletes a file by its ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fileId` | `string` | Yes | The ID of the file to delete. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `DeleteFileOut|error`

Sample code:

```ballerina
mistral:DeleteFileOut result = check mistralClient->/files/["file-abc123"].delete();
```

Sample response:

```ballerina
{
  "id": "file-abc123",
  "object": "file",
  "deleted": true
}
```

</details>

<details>
<summary>Download file content</summary>

Downloads the raw content of a file.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fileId` | `string` | Yes | The ID of the file to download. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `byte[]|error`

Sample code:

```ballerina
byte[] content = check mistralClient->/files/["file-abc123"]/content();
```

Sample response:

```ballerina
[72, 101, 108, 108, 111]
```

</details>

<details>
<summary>Get a signed download URL</summary>

Generates a temporary signed URL for downloading a file.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fileId` | `string` | Yes | The ID of the file. |
| `queries` | `FilesApiRoutesGetSignedUrlQueries` | No | Optional query parameters (expiry in hours, default 24). |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `FileSignedURL|error`

Sample code:

```ballerina
mistral:FileSignedURL signedUrl = check mistralClient->/files/["file-abc123"]/url();
```

Sample response:

```ballerina
{
  "url": "https://storage.mistral.ai/files/file-abc123?token=xyz&expires=1710086400"
}
```

</details>

#### Fine-Tuning jobs

<details>
<summary>List fine-tuning jobs</summary>

Returns a list of fine-tuning jobs for the organization.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `JobsApiRoutesFineTuningGetFineTuningJobsQueries` | No | Optional query parameters for filtering (model, status, page, pageSize, createdAfter, createdByMe, suffix, wandbProject, wandbName). |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `JobsOut|error`

Sample code:

```ballerina
mistral:JobsOut jobs = check mistralClient->/fine_tuning/jobs();
```

Sample response:

```ballerina
{
  "data": [
    {
      "id": "ftjob-abc123",
      "model": "mistral-small-latest",
      "status": "SUCCESS",
      "created_at": 1710000000,
      "fine_tuned_model": "ft:mistral-small:my-model:abc123"
    }
  ],
  "total": 1
}
```

</details>

<details>
<summary>Create a fine-tuning job</summary>

Creates a new fine-tuning job with the specified model, training files, and hyperparameters.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `request` | `JobIn` | Yes | Fine-tuning job configuration including model, training files, and hyperparameters. |
| `queries` | `JobsApiRoutesFineTuningCreateFineTuningJobQueries` | No | Optional query parameters (dryRun). |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `Response|error`

Sample code:

```ballerina
mistral:Response response = check mistralClient->/fine_tuning/jobs.post({
    model: "mistral-small-latest",
    trainingFiles: [{fileId: "file-abc123", weight: 1}],
    hyperparameters: {
        learningRate: 0.0001,
        trainingSteps: 10
    },
    suffix: "my-custom-model"
});
```

Sample response:

```ballerina
{
  "id": "ftjob-def456",
  "model": "mistral-small-latest",
  "status": "QUEUED",
  "created_at": 1710000000,
  "hyperparameters": {
    "learning_rate": 0.0001,
    "training_steps": 10
  }
}
```

</details>

<details>
<summary>Get fine-tuning job details</summary>

Retrieves the details and status of a specific fine-tuning job.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `jobId` | `string` | Yes | The ID of the fine-tuning job. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `DetailedJobOut|error`

Sample code:

```ballerina
mistral:DetailedJobOut job = check mistralClient->/fine_tuning/jobs/["ftjob-abc123"]();
```

Sample response:

```ballerina
{
  "id": "ftjob-abc123",
  "model": "mistral-small-latest",
  "status": "RUNNING",
  "created_at": 1710000000,
  "training_files": ["file-abc123"],
  "fine_tuned_model": null,
  "hyperparameters": {
    "learning_rate": 0.0001,
    "training_steps": 10
  },
  "trained_tokens": 5000
}
```

</details>

<details>
<summary>Cancel a fine-tuning job</summary>

Cancels a running or queued fine-tuning job.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `jobId` | `string` | Yes | The ID of the fine-tuning job to cancel. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `DetailedJobOut|error`

Sample code:

```ballerina
mistral:DetailedJobOut job = check mistralClient->/fine_tuning/jobs/["ftjob-abc123"]/cancel.post();
```

Sample response:

```ballerina
{
  "id": "ftjob-abc123",
  "model": "mistral-small-latest",
  "status": "CANCELLATION_REQUESTED",
  "created_at": 1710000000
}
```

</details>

<details>
<summary>Start a fine-tuning job</summary>

Starts a fine-tuning job that was created with autoStart disabled.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `jobId` | `string` | Yes | The ID of the fine-tuning job to start. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `DetailedJobOut|error`

Sample code:

```ballerina
mistral:DetailedJobOut job = check mistralClient->/fine_tuning/jobs/["ftjob-abc123"]/start.post();
```

Sample response:

```ballerina
{
  "id": "ftjob-abc123",
  "model": "mistral-small-latest",
  "status": "RUNNING",
  "created_at": 1710000000
}
```

</details>

#### Fine-Tuned models

<details>
<summary>Update a fine-tuned model</summary>

Updates the metadata (name or description) of a fine-tuned model.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `modelId` | `string` | Yes | The ID of the fine-tuned model. |
| `request` | `UpdateFTModelIn` | Yes | Update payload with new name or description. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `FTModelOut|error`

Sample code:

```ballerina
mistral:FTModelOut model = check mistralClient->/fine_tuning/models/["ft:mistral-small:my-model:abc123"].patch({
    name: "Updated Model Name",
    description: "Improved customer support model"
});
```

Sample response:

```ballerina
{
  "id": "ft:mistral-small:my-model:abc123",
  "object": "model",
  "name": "Updated Model Name",
  "description": "Improved customer support model"
}
```

</details>

<details>
<summary>Archive a fine-tuned model</summary>

Archives a fine-tuned model, making it unavailable for inference.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `modelId` | `string` | Yes | The ID of the fine-tuned model to archive. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `ArchiveFTModelOut|error`

Sample code:

```ballerina
mistral:ArchiveFTModelOut result = check mistralClient->/fine_tuning/models/["ft:mistral-small:my-model:abc123"]/archive.post();
```

Sample response:

```ballerina
{
  "id": "ft:mistral-small:my-model:abc123",
  "object": "model",
  "archived": true
}
```

</details>

<details>
<summary>Unarchive a fine-tuned model</summary>

Unarchives a previously archived fine-tuned model, making it available for inference again.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `modelId` | `string` | Yes | The ID of the fine-tuned model to unarchive. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `UnarchiveFTModelOut|error`

Sample code:

```ballerina
mistral:UnarchiveFTModelOut result = check mistralClient->/fine_tuning/models/["ft:mistral-small:my-model:abc123"]/archive.delete();
```

Sample response:

```ballerina
{
  "id": "ft:mistral-small:my-model:abc123",
  "object": "model",
  "archived": false
}
```

</details>

#### Batch jobs

<details>
<summary>List batch jobs</summary>

Returns a list of batch jobs for the organization.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `JobsApiRoutesBatchGetBatchJobsQueries` | No | Optional query parameters for filtering (model, status, page, pageSize, createdAfter, createdByMe, metadata). |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `BatchJobsOut|error`

Sample code:

```ballerina
mistral:BatchJobsOut jobs = check mistralClient->/batch/jobs();
```

Sample response:

```ballerina
{
  "data": [
    {
      "id": "batch-abc123",
      "model": "mistral-small-latest",
      "status": "SUCCESS",
      "created_at": 1710000000,
      "input_files": ["file-abc123"],
      "endpoint": "/chat/completions",
      "total_requests": 100,
      "completed_requests": 100
    }
  ],
  "total": 1
}
```

</details>

<details>
<summary>Create a batch job</summary>

Creates a new batch job for processing multiple requests asynchronously.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `request` | `BatchJobIn` | Yes | Batch job configuration including model, input files, and endpoint. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `BatchJobOut|error`

Sample code:

```ballerina
mistral:BatchJobOut job = check mistralClient->/batch/jobs.post({
    model: "mistral-small-latest",
    inputFiles: ["file-abc123"],
    endpoint: "/chat/completions",
    metadata: {project: "customer-support"}
});
```

Sample response:

```ballerina
{
  "id": "batch-def456",
  "model": "mistral-small-latest",
  "status": "QUEUED",
  "created_at": 1710000000,
  "input_files": ["file-abc123"],
  "endpoint": "/chat/completions",
  "total_requests": 0,
  "completed_requests": 0
}
```

</details>

<details>
<summary>Get batch job details</summary>

Retrieves the details and status of a specific batch job.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `jobId` | `string` | Yes | The ID of the batch job. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `BatchJobOut|error`

Sample code:

```ballerina
mistral:BatchJobOut job = check mistralClient->/batch/jobs/["batch-abc123"]();
```

Sample response:

```ballerina
{
  "id": "batch-abc123",
  "model": "mistral-small-latest",
  "status": "RUNNING",
  "created_at": 1710000000,
  "input_files": ["file-abc123"],
  "endpoint": "/chat/completions",
  "total_requests": 100,
  "completed_requests": 45
}
```

</details>

<details>
<summary>Cancel a batch job</summary>

Cancels a running or queued batch job.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `jobId` | `string` | Yes | The ID of the batch job to cancel. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `BatchJobOut|error`

Sample code:

```ballerina
mistral:BatchJobOut job = check mistralClient->/batch/jobs/["batch-abc123"]/cancel.post();
```

Sample response:

```ballerina
{
  "id": "batch-abc123",
  "model": "mistral-small-latest",
  "status": "CANCELLATION_REQUESTED",
  "created_at": 1710000000
}
```

</details>
