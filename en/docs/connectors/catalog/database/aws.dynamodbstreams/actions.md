---
connector: true
connector_name: "aws.dynamodbstreams"
toc_max_heading_level: 4
title: "Actions"
---

# Actions

The AWS DynamoDB Streams connector exposes the following clients:

Available clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Interact with the Amazon DynamoDB Streams API to list streams, describe streams, navigate shards, and consume stream records. |

---

## Client

The `Client` connects to the Amazon DynamoDB Streams API and provides operations for discovering streams, navigating shards, and consuming stream records.

### Configuration

**ConnectionConfig**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | <code>auth:AuthConfig</code> | Required | Authentication configuration: static credentials, an AWS profile, STS assume-role, web identity (OIDC), IAM Identity Center (SSO), an external credential process, or the default credential provider chain |
| `region` | <code>aws:Region&#124;string</code> | Required | AWS region — an `aws:Region` enum member or a plain region string (e.g., `"us-east-1"`) for regions not yet in the enum |
| `endpoint` | <code>aws:EndpointConfig</code> | Optional | Optional endpoint options: FIPS/dualstack variants, or a custom endpoint override (e.g. LocalStack, VPC interface endpoints) |

The client also accepts the standard Ballerina HTTP client options (`timeout`, `retryConfig`, `secureSocket`, `proxy`, and the rest of `http:ClientConfiguration`), which are omitted here.

### Initializing the client

```ballerina
import ballerinax/aws;
import ballerinax/aws.dynamodbstreams;

dynamodbstreams:ConnectionConfig config = {
    auth: {
        accessKeyId: "<AWS_ACCESS_KEY_ID>",
        secretAccessKey: "<AWS_SECRET_ACCESS_KEY>"
    },
    region: aws:US_EAST_1
};
dynamodbstreams:Client dynamodbStreams = check new (config);
```

### Operations

#### Stream discovery

<details>
<summary>listStreams</summary>

<div>

Returns the stream ARNs associated with the current account and endpoint. If `tableName` is given, only the stream ARNs for that table are returned. The returned Ballerina stream auto-paginates — it transparently fetches subsequent pages as the caller iterates.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `request` | <code>ListStreamsInput</code> | No | The details of the streams to list. Fields: `tableName` (filter by table), `exclusiveStartStreamArn` (pagination cursor), `'limit` (max per page, upper limit 100) |

**Returns:** `stream<Stream, Error?>`

**Sample code:**

```ballerina
stream<dynamodbstreams:Stream, dynamodbstreams:Error?> streams =
    dynamodbStreams->listStreams({tableName: "Orders"});
check from dynamodbstreams:Stream 'stream in streams
    do {
        string? arn = 'stream.streamArn;
    };
```

**Sample response:**

```json
{
  "streamArn": "arn:aws:dynamodb:us-east-1:123456789012:table/Orders/stream/2024-01-15T10:30:00.000",
  "streamLabel": "2024-01-15T10:30:00.000",
  "tableName": "Orders"
}
```

</div>
</details>

<details>
<summary>describeStream</summary>

<div>

Returns information about a stream, including its current status, Amazon Resource Name (ARN), the composition of its shards, and its corresponding DynamoDB table. A stream can have more shards than fit in a single response; when `lastEvaluatedShardId` is set on the result, pass it back as `exclusiveStartShardId` to read the next page of shards.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `request` | <code>DescribeStreamInput</code> | Yes | The details of the stream to describe. Required field: `streamArn`. Optional fields: `exclusiveStartShardId` (pagination cursor), `'limit` (max shards per page, upper limit 100) |

**Returns:** `StreamDescription|Error`

**Sample code:**

```ballerina
dynamodbstreams:StreamDescription description = check dynamodbStreams->describeStream({
    streamArn: "arn:aws:dynamodb:us-east-1:123456789012:table/Orders/stream/2024-01-15T10:30:00.000"
});
```

**Sample response:**

```json
{
  "streamArn": "arn:aws:dynamodb:us-east-1:123456789012:table/Orders/stream/2024-01-15T10:30:00.000",
  "streamLabel": "2024-01-15T10:30:00.000",
  "streamStatus": "ENABLED",
  "streamViewType": "NEW_AND_OLD_IMAGES",
  "creationRequestDateTime": 1705314600.0,
  "tableName": "Orders",
  "keySchema": [
    { "attributeName": "OrderId", "keyType": "HASH" }
  ],
  "shards": [
    {
      "shardId": "shardId-00000001705314600000-abcdef12",
      "parentShardId": null,
      "sequenceNumberRange": {
        "startingSequenceNumber": "1000000000000000000001",
        "endingSequenceNumber": "2000000000000000000001"
      }
    }
  ],
  "lastEvaluatedShardId": null
}
```

</div>
</details>

#### Shard navigation

<details>
<summary>getShardIterator</summary>

<div>

Returns a shard iterator, which describes a position within a shard. Use the iterator in a subsequent `getRecords` call to read the stream records from the shard. Shard iterators expire 15 minutes after they are returned.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `request` | <code>GetShardIteratorInput</code> | Yes | The details of the shard iterator to obtain. Required fields: `streamArn`, `shardId`, `shardIteratorType` (`TRIM_HORIZON`, `LATEST`, `AT_SEQUENCE_NUMBER`, or `AFTER_SEQUENCE_NUMBER`). Optional field: `sequenceNumber` — required when `shardIteratorType` is `AT_SEQUENCE_NUMBER` or `AFTER_SEQUENCE_NUMBER` |

**Returns:** `string|Error`

**Sample code:**

```ballerina
string shardIterator = check dynamodbStreams->getShardIterator({
    streamArn: "arn:aws:dynamodb:us-east-1:123456789012:table/Orders/stream/2024-01-15T10:30:00.000",
    shardId: "shardId-00000001705314600000-abcdef12",
    shardIteratorType: dynamodbstreams:TRIM_HORIZON
});
```

**Sample response:**

```json
"arn:aws:dynamodb:us-east-1:123456789012:table/Orders/stream/2024-01-15T10:30:00.000|1|AAAAAAAAAAGzaRHZ0L7A...truncated..."
```

</div>
</details>

#### Record consumption

<details>
<summary>getRecords</summary>

<div>

Retrieves the stream records currently available at the shard iterator's position — at most `limit` of them and never more than 1000. An empty `records` array does not mean the shard is exhausted; the shard is fully read only once `nextShardIterator` is absent in the response.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `request` | <code>GetRecordsInput</code> | Yes | The details of the records to retrieve. Required field: `shardIterator`. Optional field: `'limit` — maximum number of records to return per call (upper limit 1000) |

**Returns:** `GetRecordsOutput|Error`

**Sample code:**

```ballerina
dynamodbstreams:GetRecordsOutput result = check dynamodbStreams->getRecords({
    shardIterator: "arn:aws:dynamodb:us-east-1:123456789012:table/Orders/stream/...",
    'limit: 100
});
```

**Sample response:**

```json
{
  "records": [
    {
      "eventID": "c4ca4238a0b923820dcc509a6f75849b",
      "eventName": "INSERT",
      "eventVersion": "1.1",
      "eventSource": "aws:dynamodb",
      "awsRegion": "us-east-1",
      "dynamodb": {
        "sequenceNumber": "1000000000000000000001",
        "keys": {
          "OrderId": { "S": "ord-001" }
        },
        "newImage": {
          "OrderId": { "S": "ord-001" },
          "Status": { "S": "PLACED" },
          "Total": { "N": "59.99" }
        },
        "streamViewType": "NEW_AND_OLD_IMAGES",
        "approximateCreationDateTime": 1705314600.0,
        "sizeBytes": 72
      }
    }
  ],
  "nextShardIterator": "arn:aws:dynamodb:us-east-1:123456789012:table/Orders/stream/...|2|BBBBBBBBBBBBzaRHZ..."
}
```

</div>
</details>

<details>
<summary>pollRecords</summary>

<div>

Polls a single shard and emits its stream records as a Ballerina stream. Consecutive empty polls back off exponentially from `pollInterval` up to `maxPollInterval`. The stream stops at the shard boundary — it completes once the shard is closed and fully read.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `request` | <code>PollRecordsInput</code> | Yes | The details of the shard to poll. Required field: `shardIterator`. Optional fields: `'limit` (max records per underlying `GetRecords` call, upper limit 1000), `pollInterval` (initial backoff in seconds, default `1`), `maxPollInterval` (backoff ceiling in seconds, default `20`), `maxIdlePolls` (consecutive empty polls before the stream completes — when absent the stream tails the shard indefinitely until it closes) |

**Returns:** `stream<Record, Error?>`

**Sample code:**

```ballerina
stream<dynamodbstreams:Record, dynamodbstreams:Error?> records =
    dynamodbStreams->pollRecords({
        shardIterator: "arn:aws:dynamodb:us-east-1:123456789012:table/Orders/stream/...",
        pollInterval: 1,
        maxPollInterval: 5,
        maxIdlePolls: 3
    });
check from dynamodbstreams:Record 'record in records
    do {
        dynamodbstreams:OperationType? eventName = 'record.eventName;
    };
```

**Sample response:**

```json
{
  "eventID": "1679e8f0c92b41a5a2b44f0c3e7d9a01",
  "eventName": "MODIFY",
  "eventVersion": "1.1",
  "eventSource": "aws:dynamodb",
  "awsRegion": "us-east-1",
  "dynamodb": {
    "sequenceNumber": "1000000000000000000002",
    "keys": {
      "OrderId": { "S": "ord-001" }
    },
    "oldImage": {
      "OrderId": { "S": "ord-001" },
      "Status": { "S": "PLACED" }
    },
    "newImage": {
      "OrderId": { "S": "ord-001" },
      "Status": { "S": "SHIPPED" }
    },
    "streamViewType": "NEW_AND_OLD_IMAGES",
    "approximateCreationDateTime": 1705314900.0,
    "sizeBytes": 102
  }
}
```

</div>
</details>

#### Lifecycle

<details>
<summary>close</summary>

<div>

Releases the resources held by the credential provider: its background refresh threads and the HTTP connections it keeps open to reach STS/SSO.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| — | — | — | No parameters |

**Returns:** `Error?`

**Sample code:**

```ballerina
check dynamodbStreams.close();
```

</div>
</details>