---
title: Actions
---

# Actions

The `ballerinax/aws.sqs` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Send, receive, and manage messages and queues in Amazon SQS. |

For event-driven integration, see the [Trigger Reference](triggers.md).

---

## Client

Send, receive, and manage messages and queues in Amazon SQS.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `region` | `Region` | Required | AWS region where the SQS queue is located (e.g., `US_EAST_1`). |
| `auth` | `StaticAuthConfig\|ProfileAuthConfig\|DEFAULT_CREDENTIALS` | Required | Authentication configuration: static credentials, AWS profile, or default credential chain. |

### Initializing the client

```ballerina
import ballerinax/aws.sqs;

configurable string accessKeyId = ?;
configurable string secretAccessKey = ?;

sqs:Client sqsClient = check new ({
    region: sqs:US_EAST_1,
    auth: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey
    }
});
```

### Operations

#### Send & receive messages

<details>
<summary>sendMessage</summary>

Delivers a message (1 byte to 256 KiB) to the specified SQS queue.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queueUrl` | `string` | Yes | The URL of the target SQS queue. |
| `messageBody` | `string` | Yes | The message content to send. |
| `delaySeconds` | `int?` | No | Delay in seconds before the message becomes visible (0–900). |
| `messageAttributes` | `map?` | No | Custom message attributes as key-value pairs. |
| `messageDeduplicationId` | `string?` | No | Deduplication token for FIFO queues. |
| `messageGroupId` | `string?` | No | Message group identifier for FIFO queues. |

Returns: `SendMessageResponse|error`

Sample code:

```ballerina
sqs:SendMessageResponse response = check sqsClient->sendMessage(
    "https://sqs.us-east-1.amazonaws.com/123456789/my-queue",
    "Hello from Ballerina!"
);
```

Sample response:

```ballerina
{"messageId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890", "md5OfMessageBody": "e4d909c290d0fb1ca068ffaddf22cbd0"}
```

</details>

<details>
<summary>receiveMessage</summary>

Retrieves one or more messages from the specified queue.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queueUrl` | `string` | Yes | The URL of the SQS queue. |
| `maxNumberOfMessages` | `int?` | No | Maximum number of messages to receive (1–10, default 1). |
| `waitTimeSeconds` | `int?` | No | Long poll duration in seconds (0–20). |
| `visibilityTimeout` | `int?` | No | Visibility timeout for received messages in seconds. |
| `messageAttributeNames` | `string[]?` | No | Names of custom message attributes to include. |
| `messageSystemAttributeNames` | `MessageSystemAttributeName[]?` | No | System attributes to include (e.g., `ALL`, `SENDER_ID`). |

Returns: `Message[]|error`

Sample code:

```ballerina
sqs:Message[] messages = check sqsClient->receiveMessage(
    "https://sqs.us-east-1.amazonaws.com/123456789/my-queue",
    maxNumberOfMessages = 5,
    waitTimeSeconds = 10
);
```

Sample response:

```ballerina
[{"messageId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890", "body": "Hello from Ballerina!", "md5OfBody": "e4d909c290d0fb1ca068ffaddf22cbd0", "receiptHandle": "AQEBwJn..."}]
```

</details>

<details>
<summary>deleteMessage</summary>

Deletes a message from the queue using its receipt handle.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queueUrl` | `string` | Yes | The URL of the SQS queue. |
| `receiptHandle` | `string` | Yes | The receipt handle of the message to delete. |

Returns: `error?`

Sample code:

```ballerina
check sqsClient->deleteMessage(
    "https://sqs.us-east-1.amazonaws.com/123456789/my-queue",
    messages[0].receiptHandle ?: ""
);
```

</details>

<details>
<summary>changeMessageVisibility</summary>

Changes the visibility timeout of a received message (0 to 43,200 seconds).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queueUrl` | `string` | Yes | The URL of the SQS queue. |
| `receiptHandle` | `string` | Yes | The receipt handle of the message. |
| `visibilityTimeout` | `int` | Yes | New visibility timeout in seconds (0–43,200). |

Returns: `error?`

Sample code:

```ballerina
check sqsClient->changeMessageVisibility(
    "https://sqs.us-east-1.amazonaws.com/123456789/my-queue",
    messages[0].receiptHandle ?: "",
    60
);
```

</details>

#### Batch operations

<details>
<summary>sendMessageBatch</summary>

Sends up to 10 messages to the specified queue in a single request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queueUrl` | `string` | Yes | The URL of the target SQS queue. |
| `entries` | `SendMessageBatchEntry[]` | Yes | Array of batch send entries (max 10), each with an `id` and `body`. |

Returns: `SendMessageBatchResponse|error`

Sample code:

```ballerina
sqs:SendMessageBatchResponse batchRes = check sqsClient->sendMessageBatch(
    "https://sqs.us-east-1.amazonaws.com/123456789/my-queue",
    [
        {id: "msg1", body: "First message"},
        {id: "msg2", body: "Second message"},
        {id: "msg3", body: "Third message"}
    ]
);
```

Sample response:

```ballerina
{"successful": [{"id": "msg1", "messageId": "a1b2c3d4...", "md5OfMessageBody": "abc123"}, {"id": "msg2", "messageId": "e5f6a7b8...", "md5OfMessageBody": "def456"}, {"id": "msg3", "messageId": "c9d0e1f2...", "md5OfMessageBody": "ghi789"}], "failed": []}
```

</details>

<details>
<summary>deleteMessageBatch</summary>

Deletes up to 10 messages from the queue in a single request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queueUrl` | `string` | Yes | The URL of the SQS queue. |
| `entries` | `DeleteMessageBatchEntry[]` | Yes | Array of entries, each with an `id` and `receiptHandle`. |

Returns: `DeleteMessageBatchResponse|error`

Sample code:

```ballerina
sqs:DeleteMessageBatchResponse deleteRes = check sqsClient->deleteMessageBatch(
    "https://sqs.us-east-1.amazonaws.com/123456789/my-queue",
    [
        {id: "msg1", receiptHandle: messages[0].receiptHandle ?: ""},
        {id: "msg2", receiptHandle: messages[1].receiptHandle ?: ""}
    ]
);
```

Sample response:

```ballerina
{"successful": [{"id": "msg1"}, {"id": "msg2"}], "failed": []}
```

</details>

#### Queue management

<details>
<summary>createQueue</summary>

Creates a new standard or FIFO queue. FIFO queue names must end with `.fifo`.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queueName` | `string` | Yes | Name of the queue to create. |
| `queueAttributes` | `QueueAttributes?` | No | Queue configuration attributes (visibility timeout, retention period, etc.). |
| `tags` | `map<string>?` | No | Cost allocation tags for the queue. |

Returns: `string|error`

Sample code:

```ballerina
string queueUrl = check sqsClient->createQueue("my-new-queue");
```

Sample response:

```ballerina
"https://sqs.us-east-1.amazonaws.com/123456789/my-new-queue"
```

</details>

<details>
<summary>deleteQueue</summary>

Deletes the queue specified by the URL, regardless of contents.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queueUrl` | `string` | Yes | The URL of the queue to delete. |

Returns: `error?`

Sample code:

```ballerina
check sqsClient->deleteQueue("https://sqs.us-east-1.amazonaws.com/123456789/my-queue");
```

</details>

<details>
<summary>getQueueUrl</summary>

Returns the URL of an existing queue by its name.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queueName` | `string` | Yes | Name of the queue. |
| `queueOwnerAWSAccountId` | `string?` | No | AWS account ID of the queue owner (for cross-account access). |

Returns: `string|error`

Sample code:

```ballerina
string queueUrl = check sqsClient->getQueueUrl("my-queue");
```

Sample response:

```ballerina
"https://sqs.us-east-1.amazonaws.com/123456789/my-queue"
```

</details>

<details>
<summary>listQueues</summary>

Lists queues in your account, with optional prefix filtering and pagination.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `maxResults` | `int?` | No | Maximum number of results to return. |
| `nextToken` | `string?` | No | Pagination token from a previous response. |
| `queueNamePrefix` | `string?` | No | Filter queues by name prefix. |

Returns: `ListQueuesResponse|error`

Sample code:

```ballerina
sqs:ListQueuesResponse queues = check sqsClient->listQueues(queueNamePrefix = "my-");
```

Sample response:

```ballerina
{"queueUrls": ["https://sqs.us-east-1.amazonaws.com/123456789/my-queue", "https://sqs.us-east-1.amazonaws.com/123456789/my-fifo-queue.fifo"]}
```

</details>

<details>
<summary>purgeQueue</summary>

Irreversibly deletes all messages from the specified queue.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queueUrl` | `string` | Yes | The URL of the queue to purge. |

Returns: `error?`

Sample code:

```ballerina
check sqsClient->purgeQueue("https://sqs.us-east-1.amazonaws.com/123456789/my-queue");
```

</details>

#### Queue attributes

<details>
<summary>getQueueAttributes</summary>

Retrieves one or more attributes of the specified queue.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queueUrl` | `string` | Yes | The URL of the SQS queue. |
| `attributeNames` | `QueueAttributeName[]?` | No | List of attribute names to retrieve. Defaults to all attributes. |

Returns: `GetQueueAttributesResponse|error`

Sample code:

```ballerina
sqs:GetQueueAttributesResponse attrs = check sqsClient->getQueueAttributes(
    "https://sqs.us-east-1.amazonaws.com/123456789/my-queue"
);
```

Sample response:

```ballerina
{"queueAttributes": {"VisibilityTimeout": "30", "MessageRetentionPeriod": "345600", "ApproximateNumberOfMessages": "5", "CreatedTimestamp": "1700000000"}}
```

</details>

<details>
<summary>setQueueAttributes</summary>

Sets one or more attributes on the specified queue.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queueUrl` | `string` | Yes | The URL of the SQS queue. |
| `queueAttributes` | `QueueAttributes` | Yes | Attributes to set (e.g., visibility timeout, retention period). |

Returns: `error?`

Sample code:

```ballerina
check sqsClient->setQueueAttributes(
    "https://sqs.us-east-1.amazonaws.com/123456789/my-queue",
    {visibilityTimeout: 60, messageRetentionPeriod: 86400}
);
```

</details>

#### Queue tagging

<details>
<summary>tagQueue</summary>

Adds cost allocation tags to the specified queue (max 50 tags recommended).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queueUrl` | `string` | Yes | The URL of the SQS queue. |
| `tags` | `map<string>` | Yes | Key-value pairs for the tags. |

Returns: `error?`

Sample code:

```ballerina
check sqsClient->tagQueue(
    "https://sqs.us-east-1.amazonaws.com/123456789/my-queue",
    {"Environment": "Production", "Team": "Backend"}
);
```

</details>

<details>
<summary>untagQueue</summary>

Removes one or more tags from the specified queue.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queueUrl` | `string` | Yes | The URL of the SQS queue. |
| `tags` | `string[]` | Yes | List of tag keys to remove. |

Returns: `error?`

Sample code:

```ballerina
check sqsClient->untagQueue(
    "https://sqs.us-east-1.amazonaws.com/123456789/my-queue",
    ["Environment", "Team"]
);
```

</details>

<details>
<summary>listQueueTags</summary>

Lists all cost allocation tags for the specified queue.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queueUrl` | `string` | Yes | The URL of the SQS queue. |

Returns: `ListQueueTagsResponse|error`

Sample code:

```ballerina
sqs:ListQueueTagsResponse tagsRes = check sqsClient->listQueueTags(
    "https://sqs.us-east-1.amazonaws.com/123456789/my-queue"
);
```

Sample response:

```ballerina
{"tags": {"Environment": "Production", "Team": "Backend"}}
```

</details>

#### Dead-Letter queue operations

<details>
<summary>startMessageMoveTask</summary>

Starts a task to move messages from a dead-letter queue to another queue.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sourceARN` | `string` | Yes | ARN of the source dead-letter queue. |
| `destinationARN` | `string?` | No | ARN of the destination queue. Defaults to the original source queue. |
| `maxNumberOfMessagesPerSecond` | `int?` | No | Maximum messages moved per second. |

Returns: `StartMessageMoveTaskResponse|error`

Sample code:

```ballerina
sqs:StartMessageMoveTaskResponse moveRes = check sqsClient->startMessageMoveTask(
    "arn:aws:sqs:us-east-1:123456789:my-dlq"
);
```

Sample response:

```ballerina
{"taskHandle": "eyJ0YXNrSGFuZGxlIjoiYTFiMmMzZDQifQ=="}
```

</details>

<details>
<summary>cancelMessageMoveTask</summary>

Cancels an active message move task.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `taskHandle` | `string` | Yes | The task handle returned by `startMessageMoveTask`. |

Returns: `CancelMessageMoveTaskResponse|error`

Sample code:

```ballerina
sqs:CancelMessageMoveTaskResponse cancelRes = check sqsClient->cancelMessageMoveTask(
    "eyJ0YXNrSGFuZGxlIjoiYTFiMmMzZDQifQ=="
);
```

Sample response:

```ballerina
{"approximateNumberOfMessagesMoved": 42}
```

</details>
