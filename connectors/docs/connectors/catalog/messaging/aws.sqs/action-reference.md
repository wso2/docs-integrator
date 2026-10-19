---
title: Actions
---

# Actions

The Aws Sqs connector exposes the following clients:

Available clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Provides direct, programmatic access to Amazon SQS for sending and managing messages and queues |

For event-driven integration, see the [Trigger Reference](trigger-reference.md).

---

## Client

Send, receive, and manage messages and queues in Amazon SQS.

### Configuration

**ConnectionConfig**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | <code>auth:AuthConfig</code> | Required | Authentication configuration: any standard credential source supported by AWS — static credentials, an AWS profile, STS assume-role, web identity (OIDC), IAM Identity Center (SSO), an external credential process, or the default credential provider chain |
| `region` | <code>aws:Region&#124;string</code> | Required | AWS region where the SQS queue is located (e.g., `aws:US_EAST_1` or `"us-east-1"`) |
| `endpoint` | <code>aws:EndpointConfig</code> | — | Optional endpoint options: FIPS/dualstack variants, or a custom endpoint override (e.g. LocalStack, VPC interface endpoints) |

### Initializing the client

```ballerina
import ballerinax/aws;
import ballerinax/aws.sqs;

sqs:ConnectionConfig config = {
    region: aws:US_EAST_1,
    auth: {
        accessKeyId: "<ACCESS_KEY_ID>",
        secretAccessKey: "<SECRET_ACCESS_KEY>"
    }
};
sqs:Client sqsClient = check new (config);
```

### Operations

#### Send & receive messages

<details>
<summary>sendMessage</summary>

Delivers a message to the specified SQS queue. The message body must be between 1 byte and 262,144 bytes (256 KiB).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queueUrl` | <code>string</code> | Yes | URL of the Amazon SQS queue to which the message is sent |
| `messageBody` | <code>string</code> | Yes | Message content to send |
| `delaySeconds` | <code>int</code> | No | Duration to delay the message, in seconds (0 to 900) |
| `messageAttributes` | <code>map&#60;MessageAttributeValue&#62;</code> | No | Custom attributes to attach to the message |
| `awsTraceHeader` | <code>string</code> | No | X-Ray tracing header for distributed tracing support |
| `messageDeduplicationId` | <code>string</code> | No | Token for deduplicating messages (FIFO only) |
| `messageGroupId` | <code>string</code> | No | Tag specifying the message group (FIFO only) |

**Returns:** `SendMessageResponse|error`

**Sample code:**

```ballerina
sqs:SendMessageResponse response = check sqsClient->sendMessage(
    "https://sqs.us-east-1.amazonaws.com/123456789/my-queue",
    "Hello from Ballerina!"
);
```

**Sample response:**

```json
{
  "messageId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "md5OfMessageBody": "e4d909c290d0fb1ca068ffaddf22cbd0"
}
```

</details>

<details>
<summary>receiveMessage</summary>

Retrieves one or more messages from the specified queue.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queueUrl` | <code>string</code> | Yes | URL of the Amazon SQS queue from which messages are received |
| `waitTimeSeconds` | <code>int</code> | No | Duration to wait for a message to arrive in seconds (long polling) |
| `visibilityTimeout` | <code>int</code> | No | Visibility timeout for received messages in seconds |
| `maxNumberOfMessages` | <code>int</code> | No | Maximum number of messages to receive (1 to 10) |
| `receiveRequestAttemptId` | <code>string</code> | No | Deduplication token for `receiveMessage` requests (FIFO only) |
| `messageAttributeNames` | <code>string[]</code> | No | List of message attribute names to return; use `All` to get all |
| `messageSystemAttributeNames` | <code>MessageSystemAttributeName[]</code> | No | List of system attribute names to return; use `All` to get all |

**Returns:** `Message[]|error`

**Sample code:**

```ballerina
sqs:Message[] messages = check sqsClient->receiveMessage(
    "https://sqs.us-east-1.amazonaws.com/123456789/my-queue",
    maxNumberOfMessages = 5,
    waitTimeSeconds = 10
);
```

**Sample response:**

```json
[
  {
    "messageId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "body": "Hello from Ballerina!",
    "md5OfBody": "e4d909c290d0fb1ca068ffaddf22cbd0",
    "receiptHandle": "AQEBwJnKyrHigUMZj6reyNurzkBvqrJcNSDc5ZzA..."
  }
]
```

</details>

<details>
<summary>deleteMessage</summary>

Deletes a specified message from an Amazon SQS queue using the given receipt handle.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queueUrl` | <code>string</code> | Yes | URL of the Amazon SQS queue from which the message is deleted |
| `receiptHandle` | <code>string</code> | Yes | Receipt handle associated with the message to delete |

**Returns:** `error?`

**Sample code:**

```ballerina
check sqsClient->deleteMessage(
    "https://sqs.us-east-1.amazonaws.com/123456789/my-queue",
    messages[0].receiptHandle ?: ""
);
```

</details>

<details>
<summary>changeMessageVisibility</summary>

Changes the visibility timeout of a specific message in a queue. The new timeout must be between 0 and 43,200 seconds.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queueUrl` | <code>string</code> | Yes | URL of the Amazon SQS queue containing the message |
| `receiptHandle` | <code>string</code> | Yes | Receipt handle of the message returned by the `receiveMessage` operation |
| `visibilityTimeout` | <code>int</code> | Yes | New visibility timeout value in seconds (minimum 0, maximum 43,200) |

**Returns:** `error?`

**Sample code:**

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

Sends up to 10 messages as a batch to the specified Amazon SQS queue. The result of each message is reported individually in the response.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queueUrl` | <code>string</code> | Yes | URL of the Amazon SQS queue to which batched messages are sent |
| `entries` | <code>SendMessageBatchEntry[]</code> | Yes | List of batch send entries (max 10), each with an `id` and `body` |

**Returns:** `SendMessageBatchResponse|error`

**Sample code:**

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

**Sample response:**

```json
{
  "successful": [
    {"id": "msg1", "messageId": "a1b2c3d4...", "md5OfMessageBody": "abc123"},
    {"id": "msg2", "messageId": "e5f6a7b8...", "md5OfMessageBody": "def456"},
    {"id": "msg3", "messageId": "c9d0e1f2...", "md5OfMessageBody": "ghi789"}
  ],
  "failed": []
}
```

</details>

<details>
<summary>deleteMessageBatch</summary>

Deletes up to 10 messages from the specified queue in a single request. The result of the action on each message is reported individually in the response.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queueUrl` | <code>string</code> | Yes | URL of the Amazon SQS queue from which messages are deleted |
| `entries` | <code>DeleteMessageBatchEntry[]</code> | Yes | List of entries containing the `id` and `receiptHandle` of each message to delete |

**Returns:** `DeleteMessageBatchResponse|error`

**Sample code:**

```ballerina
sqs:DeleteMessageBatchResponse deleteRes = check sqsClient->deleteMessageBatch(
    "https://sqs.us-east-1.amazonaws.com/123456789/my-queue",
    [
        {id: "msg1", receiptHandle: messages[0].receiptHandle ?: ""},
        {id: "msg2", receiptHandle: messages[1].receiptHandle ?: ""}
    ]
);
```

**Sample response:**

```json
{
  "successful": [
    {"id": "msg1"},
    {"id": "msg2"}
  ],
  "failed": []
}
```

</details>

#### Queue management

<details>
<summary>createQueue</summary>

Creates a new Amazon SQS queue with the specified attributes and tags. FIFO queue names must end with the `.fifo` suffix. Queue names can include alphanumeric characters, hyphens, and underscores, up to 80 characters.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queueName` | <code>string</code> | Yes | Name of the new queue |
| `queueAttributes` | <code>QueueAttributes</code> | No | Queue configuration attributes (visibility timeout, retention period, etc.) |
| `tags` | <code>map&#60;string&#62;</code> | No | Cost allocation tags to associate with the queue |

**Returns:** `string|error`

**Sample code:**

```ballerina
string queueUrl = check sqsClient->createQueue("my-new-queue");
```

**Sample response:**

```json
"https://sqs.us-east-1.amazonaws.com/123456789/my-new-queue"
```

</details>

<details>
<summary>deleteQueue</summary>

Deletes the specified Amazon SQS queue regardless of its contents.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queueUrl` | <code>string</code> | Yes | URL of the Amazon SQS queue to delete |

**Returns:** `error?`

**Sample code:**

```ballerina
check sqsClient->deleteQueue("https://sqs.us-east-1.amazonaws.com/123456789/my-queue");
```

</details>

<details>
<summary>getQueueUrl</summary>

Retrieves the URL of the specified Amazon SQS queue. Queue names can include alphanumeric characters, hyphens, and underscores, up to 80 characters.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queueName` | <code>string</code> | Yes | Name of the queue |
| `queueOwnerAWSAccountId` | <code>string</code> | No | AWS account ID of the queue owner; required when accessing a queue owned by another AWS account |

**Returns:** `string|error`

**Sample code:**

```ballerina
string queueUrl = check sqsClient->getQueueUrl("my-queue");
```

**Sample response:**

```json
"https://sqs.us-east-1.amazonaws.com/123456789/my-queue"
```

</details>

<details>
<summary>listQueues</summary>

Lists Amazon SQS queues in the current region. Supports filtering by name prefix and paginated results.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `maxResults` | <code>int</code> | No | Maximum number of results to return; required to receive a `nextToken` in the response |
| `nextToken` | <code>string</code> | No | Pagination token from a previous response |
| `queueNamePrefix` | <code>string</code> | No | Prefix to filter queue names; only queues starting with this value are returned |

**Returns:** `ListQueuesResponse|error`

**Sample code:**

```ballerina
sqs:ListQueuesResponse queues = check sqsClient->listQueues(queueNamePrefix = "my-");
```

**Sample response:**

```json
{
  "queueUrls": [
    "https://sqs.us-east-1.amazonaws.com/123456789/my-queue",
    "https://sqs.us-east-1.amazonaws.com/123456789/my-fifo-queue.fifo"
  ]
}
```

</details>

<details>
<summary>purgeQueue</summary>

Purges the specified queue, deleting all messages in it. This action is irreversible.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queueUrl` | <code>string</code> | Yes | URL of the queue to purge |

**Returns:** `error?`

**Sample code:**

```ballerina
check sqsClient->purgeQueue("https://sqs.us-east-1.amazonaws.com/123456789/my-queue");
```

</details>

#### Queue attributes

<details>
<summary>getQueueAttributes</summary>

Retrieves the attributes of the specified Amazon SQS queue.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queueUrl` | <code>string</code> | Yes | URL of the Amazon SQS queue whose attributes are retrieved |
| `attributeNames` | <code>QueueAttributeName[]</code> | No | List of queue attributes to retrieve; omit to retrieve all attributes |

**Returns:** `GetQueueAttributesResponse|error`

**Sample code:**

```ballerina
sqs:GetQueueAttributesResponse attrs = check sqsClient->getQueueAttributes(
    "https://sqs.us-east-1.amazonaws.com/123456789/my-queue"
);
```

**Sample response:**

```json
{
  "queueAttributes": {
    "VisibilityTimeout": "30",
    "MessageRetentionPeriod": "345600",
    "ApproximateNumberOfMessages": "5",
    "CreatedTimestamp": "1700000000"
  }
}
```

</details>

<details>
<summary>setQueueAttributes</summary>

Sets one or more attributes for the specified Amazon SQS queue.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queueUrl` | <code>string</code> | Yes | URL of the Amazon SQS queue to configure |
| `queueAttributes` | <code>QueueAttributes</code> | Yes | Attributes to set on the queue |

**Returns:** `error?`

**Sample code:**

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

Adds cost allocation tags to the specified Amazon SQS queue. A maximum of 50 tags per queue is recommended. Tags are case-sensitive, and new tags with duplicate keys overwrite existing ones.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queueUrl` | <code>string</code> | Yes | URL of the queue to which tags are added |
| `tags` | <code>map&#60;string&#62;</code> | Yes | Map of tags to add, where each tag is a key-value pair |

**Returns:** `error?`

**Sample code:**

```ballerina
check sqsClient->tagQueue(
    "https://sqs.us-east-1.amazonaws.com/123456789/my-queue",
    {"Environment": "Production", "Team": "Backend"}
);
```

</details>

<details>
<summary>untagQueue</summary>

Removes cost allocation tags from the specified Amazon SQS queue.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queueUrl` | <code>string</code> | Yes | URL of the queue from which tags are removed |
| `tags` | <code>string[]</code> | Yes | List of tag keys to remove |

**Returns:** `error?`

**Sample code:**

```ballerina
check sqsClient->untagQueue(
    "https://sqs.us-east-1.amazonaws.com/123456789/my-queue",
    ["Environment", "Team"]
);
```

</details>

<details>
<summary>listQueueTags</summary>

Lists all cost allocation tags added to the specified Amazon SQS queue.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queueUrl` | <code>string</code> | Yes | URL of the queue whose tags are listed |

**Returns:** `ListQueueTagsResponse|error`

**Sample code:**

```ballerina
sqs:ListQueueTagsResponse tagsRes = check sqsClient->listQueueTags(
    "https://sqs.us-east-1.amazonaws.com/123456789/my-queue"
);
```

**Sample response:**

```json
{
  "tags": {
    "Environment": "Production",
    "Team": "Backend"
  }
}
```

</details>

#### Dead-letter queue operations

<details>
<summary>startMessageMoveTask</summary>

Starts a message movement task to transfer messages from a dead-letter queue (DLQ) to another queue. Only supported for DLQs whose sources are other Amazon SQS queues. Only one active task is allowed per queue at any time.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sourceARN` | <code>string</code> | Yes | ARN of the DLQ from which messages are moved |
| `destinationARN` | <code>string</code> | No | ARN of the destination queue; if not set, messages are redriven to their original source queues |
| `maxNumberOfMessagesPerSecond` | <code>int</code> | No | Fixed message movement rate in messages per second (max 500); if not set, the system optimizes the rate |

**Returns:** `StartMessageMoveTaskResponse|error`

**Sample code:**

```ballerina
sqs:StartMessageMoveTaskResponse moveRes = check sqsClient->startMessageMoveTask(
    "arn:aws:sqs:us-east-1:123456789:my-dlq"
);
```

**Sample response:**

```json
{
  "taskHandle": "eyJ0YXNrSGFuZGxlIjoiYTFiMmMzZDQifQ=="
}
```

</details>

<details>
<summary>cancelMessageMoveTask</summary>

Cancels an active message movement task. Only applicable when the task status is `RUNNING`. Already moved messages will not be reverted. Only one active task is allowed per queue at any time.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `taskHandle` | <code>string</code> | Yes | Identifier of the message movement task returned by `startMessageMoveTask` |

**Returns:** `CancelMessageMoveTaskResponse|error`

**Sample code:**

```ballerina
sqs:CancelMessageMoveTaskResponse cancelRes = check sqsClient->cancelMessageMoveTask(
    "eyJ0YXNrSGFuZGxlIjoiYTFiMmMzZDQifQ=="
);
```

**Sample response:**

```json
{
  "approximateNumberOfMessagesMoved": 42
}
```

</details>

#### Client lifecycle

<details>
<summary>close</summary>

Gracefully closes the AWS SQS client and releases all associated resources.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| — | — | — | No parameters |

**Returns:** `error?`

**Sample code:**

```ballerina
check sqsClient->close();
```

</details>
