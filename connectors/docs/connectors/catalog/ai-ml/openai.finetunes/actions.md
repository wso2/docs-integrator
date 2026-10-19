---
title: Actions
---

# Actions

The `ballerinax/openai.finetunes` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Provides access to OpenAI fine-tuning, files, and models REST API endpoints. |

---

## Client

Provides access to OpenAI fine-tuning, files, and models REST API endpoints.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `http:BearerTokenConfig` | Required | Bearer token configuration using your OpenAI API key. |
| `httpVersion` | `http:HttpVersion` | `HTTP_2_0` | HTTP protocol version. |
| `timeout` | `decimal` | `60` | Request timeout in seconds. |
| `retryConfig` | `http:RetryConfig` | `()` | Retry configuration for failed requests. |
| `secureSocket` | `http:ClientSecureSocket` | `()` | SSL/TLS configuration. |
| `proxy` | `ProxyConfig` | `()` | Proxy server configuration. |
| `compression` | `http:Compression` | `COMPRESSION_AUTO` | HTTP compression configuration. |
| `circuitBreaker` | `http:CircuitBreakerConfig` | `()` | Circuit breaker configuration for fault tolerance. |
| `poolConfig` | `http:PoolConfiguration` | `()` | Connection pool configuration. |
| `cache` | `http:CacheConfig` | `()` | HTTP response cache configuration. |
| `validation` | `boolean` | `true` | Enable or disable payload validation. |

### Initializing the client

```ballerina
import ballerinax/openai.finetunes;

configurable string apiKey = ?;

finetunes:Client openaiFinetunes = check new ({
    auth: {
        token: apiKey
    }
});
```

### Operations

#### File operations

<details>
<summary>List files</summary>

Returns a list of files that belong to the user's organization.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `ListFilesQueries` | No | Query parameters including optional `purpose` filter. |

Returns: `ListFilesResponse|error`

Sample code:

```ballerina
finetunes:ListFilesResponse response = check openaiFinetunes->/files();
```

Sample response:

```ballerina
{"object": "list", "data": [{"id": "file-abc123", "object": "file", "bytes": 140, "created_at": 1613779121, "filename": "training_data.jsonl", "purpose": "fine-tune", "status": "processed"}]}
```

</details>

<details>
<summary>Upload a file</summary>

Uploads a file that can be used for fine-tuning or other purposes.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateFileRequest` | Yes | File content and purpose. The `purpose` must be set to `"fine-tune"` for training files. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `OpenAIFile|error`

Sample code:

```ballerina
finetunes:OpenAIFile trainingFile = check openaiFinetunes->/files.post({
    file: {fileContent: check io:fileReadBytes("training_data.jsonl"), fileName: "training_data.jsonl"},
    purpose: "fine-tune"
});
```

Sample response:

```ballerina
{"id": "file-abc123", "object": "file", "bytes": 140, "created_at": 1613779121, "filename": "training_data.jsonl", "purpose": "fine-tune", "status": "uploaded"}
```

</details>

<details>
<summary>Retrieve a file</summary>

Returns information about a specific file.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `file_id` | `string` | Yes | The ID of the file to retrieve. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `OpenAIFile|error`

Sample code:

```ballerina
finetunes:OpenAIFile fileInfo = check openaiFinetunes->/files/["file-abc123"]();
```

Sample response:

```ballerina
{"id": "file-abc123", "object": "file", "bytes": 140, "created_at": 1613779121, "filename": "training_data.jsonl", "purpose": "fine-tune", "status": "processed"}
```

</details>

<details>
<summary>Delete a file</summary>

Deletes a file from the organization's storage.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `file_id` | `string` | Yes | The ID of the file to delete. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `DeleteFileResponse|error`

Sample code:

```ballerina
finetunes:DeleteFileResponse deleteRes = check openaiFinetunes->/files/["file-abc123"].delete();
```

Sample response:

```ballerina
{"id": "file-abc123", "object": "file", "deleted": true}
```

</details>

<details>
<summary>Download file content</summary>

Returns the content of the specified file as a byte array.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `file_id` | `string` | Yes | The ID of the file whose content to download. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `byte[]|error`

Sample code:

```ballerina
byte[] content = check openaiFinetunes->/files/["file-abc123"]/content();
```

Sample response:

```ballerina
[72, 101, 108, 108, 111]
```

</details>

#### Fine-Tuning job operations

<details>
<summary>List fine-tuning jobs</summary>

Lists the organization's fine-tuning jobs with pagination support.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `ListPaginatedFineTuningJobsQueries` | No | Query parameters: `limit` (default 20), `after` (pagination cursor). |

Returns: `ListPaginatedFineTuningJobsResponse|error`

Sample code:

```ballerina
finetunes:ListPaginatedFineTuningJobsResponse jobs = check openaiFinetunes->/fine_tuning/jobs();
```

Sample response:

```ballerina
{"object": "list", "data": [{"id": "ftjob-abc123", "object": "fine_tuning.job", "model": "gpt-3.5-turbo", "created_at": 1614807352, "finished_at": 1614807865, "fine_tuned_model": "ft:gpt-3.5-turbo:org:custom_suffix:id", "organization_id": "org-123", "result_files": ["file-result123"], "status": "succeeded", "training_file": "file-abc123", "validation_file": null, "trained_tokens": 5768, "hyperparameters": {"n_epochs": 4}, "error": {}, "seed": 42}], "has_more": false}
```

</details>

<details>
<summary>Create a fine-tuning job</summary>

Creates a fine-tuning job to customize a model with your training data.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateFineTuningJobRequest` | Yes | Job configuration including model, training file ID, and optional hyperparameters. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `FineTuningJob|error`

Sample code:

```ballerina
finetunes:FineTuningJob job = check openaiFinetunes->/fine_tuning/jobs.post({
    model: "gpt-3.5-turbo",
    training_file: trainingFile.id,
    hyperparameters: {
        n_epochs: 15,
        batch_size: 3,
        learning_rate_multiplier: 0.3
    }
});
```

Sample response:

```ballerina
{"id": "ftjob-abc123", "object": "fine_tuning.job", "model": "gpt-3.5-turbo", "created_at": 1614807352, "finished_at": null, "fine_tuned_model": null, "organization_id": "org-123", "result_files": [], "status": "validating_files", "training_file": "file-abc123", "validation_file": null, "trained_tokens": null, "hyperparameters": {"n_epochs": 15}, "error": {}, "seed": 42}
```

</details>

<details>
<summary>Retrieve a fine-tuning job</summary>

Retrieves details of a specific fine-tuning job by its ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fine_tuning_job_id` | `string` | Yes | The ID of the fine-tuning job. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `FineTuningJob|error`

Sample code:

```ballerina
finetunes:FineTuningJob jobStatus = check openaiFinetunes->/fine_tuning/jobs/[job.id]();
```

Sample response:

```ballerina
{"id": "ftjob-abc123", "object": "fine_tuning.job", "model": "gpt-3.5-turbo", "created_at": 1614807352, "finished_at": 1614807865, "fine_tuned_model": "ft:gpt-3.5-turbo:org:custom_suffix:id", "organization_id": "org-123", "result_files": ["file-result123"], "status": "succeeded", "training_file": "file-abc123", "validation_file": null, "trained_tokens": 5768, "hyperparameters": {"n_epochs": 15}, "error": {}, "seed": 42}
```

</details>

<details>
<summary>Cancel a fine-tuning job</summary>

Immediately cancels a fine-tuning job that is in progress.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fine_tuning_job_id` | `string` | Yes | The ID of the fine-tuning job to cancel. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `FineTuningJob|error`

Sample code:

```ballerina
finetunes:FineTuningJob cancelledJob = check openaiFinetunes->/fine_tuning/jobs/[job.id]/cancel.post();
```

Sample response:

```ballerina
{"id": "ftjob-abc123", "object": "fine_tuning.job", "model": "gpt-3.5-turbo", "created_at": 1614807352, "finished_at": null, "fine_tuned_model": null, "organization_id": "org-123", "result_files": [], "status": "cancelled", "training_file": "file-abc123", "validation_file": null, "trained_tokens": null, "hyperparameters": {"n_epochs": 15}, "error": {}, "seed": 42}
```

</details>

<details>
<summary>List fine-tuning events</summary>

Returns status events for a fine-tuning job, useful for monitoring training progress.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fine_tuning_job_id` | `string` | Yes | The ID of the fine-tuning job. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `ListFineTuningEventsQueries` | No | Query parameters: `limit` (default 20), `after` (pagination cursor). |

Returns: `ListFineTuningJobEventsResponse|error`

Sample code:

```ballerina
finetunes:ListFineTuningJobEventsResponse events = check openaiFinetunes->/fine_tuning/jobs/[job.id]/events();
```

Sample response:

```ballerina
{"object": "list", "data": [{"id": "fte-abc123", "object": "fine_tuning.job.event", "created_at": 1614807352, "level": "info", "message": "Fine-tuning job started"}, {"id": "fte-abc124", "object": "fine_tuning.job.event", "created_at": 1614807400, "level": "info", "message": "Step 1/100, training loss: 0.234"}]}
```

</details>

<details>
<summary>List fine-tuning checkpoints</summary>

Lists checkpoints for a fine-tuning job, including training metrics at each checkpoint.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fine_tuning_job_id` | `string` | Yes | The ID of the fine-tuning job. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `ListFineTuningJobCheckpointsQueries` | No | Query parameters: `limit` (default 10), `after` (pagination cursor). |

Returns: `ListFineTuningJobCheckpointsResponse|error`

Sample code:

```ballerina
finetunes:ListFineTuningJobCheckpointsResponse checkpoints = check openaiFinetunes->/fine_tuning/jobs/[job.id]/checkpoints();
```

Sample response:

```ballerina
{"object": "list", "data": [{"id": "ftckpt-abc123", "object": "fine_tuning.job.checkpoint", "created_at": 1614807400, "fine_tuned_model_checkpoint": "ft:gpt-3.5-turbo:org::ckpt-step-10", "step_number": 10, "metrics": {"step": 10.0, "train_loss": 0.234, "train_mean_token_accuracy": 0.876}, "fine_tuning_job_id": "ftjob-abc123"}], "has_more": false}
```

</details>

#### Model operations

<details>
<summary>List models</summary>

Lists all models available to the user, including fine-tuned models.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `ListModelsResponse|error`

Sample code:

```ballerina
finetunes:ListModelsResponse models = check openaiFinetunes->/models();
```

Sample response:

```ballerina
{"object": "list", "data": [{"id": "gpt-3.5-turbo", "object": "model", "created": 1677610602, "owned_by": "openai"}, {"id": "ft:gpt-3.5-turbo:org:custom:id", "object": "model", "created": 1614807865, "owned_by": "org-123"}]}
```

</details>

<details>
<summary>Retrieve a model</summary>

Retrieves details of a specific model by its ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `model` | `string` | Yes | The model ID (e.g., `"gpt-3.5-turbo"` or a fine-tuned model ID). |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `Model|error`

Sample code:

```ballerina
finetunes:Model model = check openaiFinetunes->/models/["gpt-3.5-turbo"]();
```

Sample response:

```ballerina
{"id": "gpt-3.5-turbo", "object": "model", "created": 1677610602, "owned_by": "openai"}
```

</details>

<details>
<summary>Delete a fine-tuned model</summary>

Deletes a fine-tuned model. You must be the owner of the organization the model was created in.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `model` | `string` | Yes | The ID of the fine-tuned model to delete. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `DeleteModelResponse|error`

Sample code:

```ballerina
finetunes:DeleteModelResponse deleteModelRes = check openaiFinetunes->/models/["ft:gpt-3.5-turbo:org:custom:id"].delete();
```

Sample response:

```ballerina
{"id": "ft:gpt-3.5-turbo:org:custom:id", "object": "model", "deleted": true}
```

</details>
