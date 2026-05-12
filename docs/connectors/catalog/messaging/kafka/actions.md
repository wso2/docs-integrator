---
title: Actions
---

# Actions

The `ballerinax/kafka` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Producer`](#producer) | Publishes messages to Kafka topics with configurable serialization, compression, and delivery guarantees. |
| [`Consumer`](#consumer) | Subscribes to Kafka topics and polls for messages with manual offset management. |

For event-driven integration, see the [Trigger Reference](triggers.md).

---

## Producer

Publishes messages to Kafka topics with configurable serialization, compression, and delivery guarantees.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `acks` | `ProducerAcks` | `ACKS_SINGLE` | Number of acknowledgments the producer requires (`"all"`, `"0"`, or `"1"`). |
| `compressionType` | `CompressionType` | `COMPRESSION_NONE` | Compression algorithm for messages (`"none"`, `"gzip"`, `"snappy"`, `"lz4"`, `"zstd"`). |
| `clientId` | `string?` | `()` | Identifier sent to the broker for logging and monitoring. |
| `keySerializerType` | `SerializerType` | `SER_BYTE_ARRAY` | Serializer for message keys. |
| `valueSerializerType` | `SerializerType` | `SER_BYTE_ARRAY` | Serializer for message values. |
| `transactionalId` | `string?` | `()` | Transactional ID for exactly-once delivery. |
| `enableIdempotence` | `boolean` | `false` | Enable idempotent producer for exactly-once semantics. |
| `retryCount` | `int?` | `()` | Number of retries for failed send attempts. |
| `batchSize` | `int?` | `()` | Maximum number of bytes to batch before sending. |
| `linger` | `decimal?` | `()` | Time in seconds to wait for additional messages before sending a batch. |
| `requestTimeout` | `decimal?` | `()` | Time in seconds to wait for a response from the broker. |
| `schemaRegistryUrl` | `string?` | `()` | URL of the Confluent Schema Registry for Avro serialization. |
| `secureSocket` | `SecureSocket?` | `()` | SSL/TLS configuration for encrypted connections. |
| `auth` | `AuthenticationConfiguration?` | `()` | SASL authentication configuration. |
| `securityProtocol` | `SecurityProtocol` | `PROTOCOL_PLAINTEXT` | Security protocol (`"PLAINTEXT"`, `"SASL_PLAINTEXT"`, `"SASL_SSL"`, `"SSL"`). |
| `additionalProperties` | `map&lt;string&gt;?` | `()` | Additional Kafka producer properties not covered by named fields. |

### Initializing the client

```ballerina
import ballerinax/kafka;

kafka:Producer producer = check new (kafka:DEFAULT_URL, {
    clientId: "my-producer",
    acks: kafka:ACKS_ALL,
    retryCount: 3
});
```

### Operations

#### Produce messages

<details>
<summary>send</summary>

Sends a message to a Kafka topic.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `producerRecord` | `AnydataProducerRecord` | Yes | The record containing the topic, key, value, and optional headers. |

Returns: `error?`

Sample code:

```ballerina
check producer->send({
    topic: "test-kafka-topic",
    key: "order-1".toBytes(),
    value: "Hello World, Ballerina".toBytes()
});
```

</details>

<details>
<summary>sendWithMetadata</summary>

Sends a message and returns the record metadata (partition, offset, timestamp).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `producerRecord` | `AnydataProducerRecord` | Yes | The record containing the topic, key, value, and optional headers. |

Returns: `kafka:RecordMetadata|error`

Sample code:

```ballerina
kafka:RecordMetadata metadata = check producer->sendWithMetadata({
    topic: "test-kafka-topic",
    value: "Hello Kafka".toBytes()
});
```

Sample response:

```ballerina
{"topic": "test-kafka-topic", "partition": 0, "offset": 42, "timestamp": 1700000000000, "serializedKeySize": -1, "serializedValueSize": 11}
```

`offset` and `timestamp` can be `()` (null) depending on the delivery configuration. Always handle them as nullable (`int?`) in your code.

</details>

<details>
<summary>flush</summary>

Flushes all buffered messages, blocking until all sends are complete.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|

Returns: `error?`

Sample code:

```ballerina
check producer->'flush();
```

</details>

#### Topic metadata

<details>
<summary>getTopicPartitions</summary>

Returns the partition metadata for a given topic.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `topic` | `string` | Yes | The Kafka topic name. |

Returns: `kafka:TopicPartition[]|error`

Sample code:

```ballerina
kafka:TopicPartition[] partitions = check producer->getTopicPartitions("test-kafka-topic");
```

Sample response:

```ballerina
[{"topic": "test-kafka-topic", "partition": 0}, {"topic": "test-kafka-topic", "partition": 1}, {"topic": "test-kafka-topic", "partition": 2}]
```

</details>

#### Lifecycle

<details>
<summary>close</summary>

Closes the producer and releases all resources.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|

Returns: `error?`

Sample code:

```ballerina
check producer->close();
```

</details>

---

## Consumer

Subscribes to Kafka topics and polls for messages with manual offset management.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `groupId` | `string?` | `()` | Consumer group identifier for coordinated consumption. |
| `topics` | `string|string[]?` | `()` | Topic(s) to subscribe to on initialization. |
| `offsetReset` | `OffsetResetMethod?` | `()` | Strategy when no initial offset exists (`"earliest"`, `"latest"`, `"none"`). |
| `keyDeserializerType` | `DeserializerType` | `DES_BYTE_ARRAY` | Deserializer for message keys. |
| `valueDeserializerType` | `DeserializerType` | `DES_BYTE_ARRAY` | Deserializer for message values. |
| `autoCommit` | `boolean` | `true` | Automatically commit offsets at regular intervals. |
| `autoCommitInterval` | `decimal?` | `()` | Interval in seconds between automatic offset commits. |
| `sessionTimeout` | `decimal?` | `()` | Timeout in seconds for detecting consumer failures. |
| `heartBeatInterval` | `decimal?` | `()` | Interval in seconds between heartbeats to the consumer coordinator. |
| `maxPollRecords` | `int?` | `()` | Maximum number of records returned per poll call. |
| `isolationLevel` | `IsolationLevel?` | `()` | Controls how transactional messages are read (`"read_committed"` or `"read_uncommitted"`). |
| `schemaRegistryUrl` | `string?` | `()` | URL of the Confluent Schema Registry for Avro deserialization. |
| `pollingTimeout` | `decimal?` | `()` | Timeout in seconds for each poll call. |
| `pollingInterval` | `decimal?` | `()` | Interval in seconds between consecutive polls (used with Listener). |
| `secureSocket` | `SecureSocket?` | `()` | SSL/TLS configuration for encrypted connections. |
| `auth` | `AuthenticationConfiguration?` | `()` | SASL authentication configuration. |
| `securityProtocol` | `SecurityProtocol` | `PROTOCOL_PLAINTEXT` | Security protocol (`"PLAINTEXT"`, `"SASL_PLAINTEXT"`, `"SASL_SSL"`, `"SSL"`). |
| `additionalProperties` | `map&lt;string&gt;?` | `()` | Additional Kafka consumer properties not covered by named fields. |
| `validation` | `boolean` | `true` | Enable constraint validation on deserialized records. |
| `decoupleProcessing` | `boolean` | `false` | Decouple record processing from polling for improved throughput. |
| `autoSeekOnValidationFailure` | `boolean` | `true` | Automatically seek past records that fail data-binding or constraint validation. Set to `false` to stop and surface the error instead. |

### Initializing the client

```ballerina
import ballerinax/kafka;

kafka:Consumer consumer = check new (kafka:DEFAULT_URL, {
    groupId: "my-group",
    topics: ["test-kafka-topic"],
    offsetReset: kafka:OFFSET_RESET_EARLIEST
});
```

### Operations

#### Subscribe & assign

<details>
<summary>subscribe</summary>

Subscribes the consumer to one or more topics.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `topics` | `string|string[]` | Yes | Topic name(s) to subscribe to. |

Returns: `error?`

`groupId` must be set in the consumer configuration before calling `subscribe()`. Calling this method without a `groupId` causes a **panic**, not a returned error, and cannot be caught with `check`.

Sample code:

```ballerina
check consumer->subscribe(["topic-1", "topic-2"]);
```

</details>

<details>
<summary>subscribeWithPattern</summary>

Subscribes to all topics matching a regex pattern.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `regex` | `string` | Yes | Regular expression pattern for topic names. |

Returns: `error?`

Sample code:

```ballerina
check consumer->subscribeWithPattern("order-.*");
```

</details>

<details>
<summary>unsubscribe</summary>

Unsubscribes from all currently subscribed topics.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|

Returns: `error?`

Sample code:

```ballerina
check consumer->unsubscribe();
```

</details>

<details>
<summary>assign</summary>

Manually assigns specific topic-partitions to this consumer.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `partitions` | `TopicPartition[]` | Yes | Array of topic-partition pairs to assign. |

Returns: `error?`

Sample code:

```ballerina
check consumer->assign([{topic: "test-topic", partition: 0}]);
```

</details>

#### Poll messages

<details>
<summary>poll</summary>

Polls for consumer records, returning full record metadata including key, value, offset, and headers.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `timeout` | `decimal` | Yes | Maximum time in seconds to block waiting for records. |
| `T` | `typedesc&lt;AnydataConsumerRecord[]&gt;` | No | Expected consumer record array type for deserialization. |

Returns: `T|error`

Sample code:

```ballerina
kafka:BytesConsumerRecord[] records = check consumer->poll(1);
foreach var rec in records {
    string value = check string:fromBytes(rec.value);
}
```

Sample response:

```ballerina
[{"key": "order-1", "value": [72, 101, 108, 108, 111], "timestamp": 1700000000000, "offset": {"partition": {"topic": "test-kafka-topic", "partition": 0}, "offset": 42}, "headers": {}}]
```

</details>

<details>
<summary>pollPayload</summary>

Polls for message payloads only, without record metadata.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `timeout` | `decimal` | Yes | Maximum time in seconds to block waiting for records. |
| `T` | `typedesc&lt;anydata[]&gt;` | No | Expected payload array type for deserialization. |

Returns: `T|error`

Sample code:

```ballerina
string[] payloads = check consumer->pollPayload(1);
```

Sample response:

```ballerina
["Hello World, Ballerina", "Order received", "Payment processed"]
```

</details>

#### Offset management

<details>
<summary>commit</summary>

Commits the current offsets for all subscribed partitions.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|

Returns: `error?`

Sample code:

```ballerina
check consumer->'commit();
```

</details>

<details>
<summary>commitOffset</summary>

Commits specific offsets for specific partitions.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `offsets` | `PartitionOffset[]` | Yes | Array of partition-offset pairs to commit. |
| `duration` | `decimal` | No | Timeout in seconds for the commit operation. Defaults to `-1` (uses the consumer's configured default API timeout). |

Returns: `error?`

Sample code:

```ballerina
check consumer->commitOffset(
    [{partition: {topic: "test-topic", partition: 0}, offset: 100}],
    10
);
```

</details>

<details>
<summary>seek</summary>

Seeks to a specific offset in a topic-partition.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `offset` | `PartitionOffset` | Yes | The partition and offset to seek to. |

Returns: `error?`

Sample code:

```ballerina
check consumer->seek({
    partition: {topic: "test-topic", partition: 0},
    offset: 0
});
```

</details>

<details>
<summary>seekToBeginning</summary>

Seeks to the beginning of the specified partitions.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `partitions` | `TopicPartition[]` | Yes | Partitions to seek to the beginning. |

Returns: `error?`

Sample code:

```ballerina
check consumer->seekToBeginning([{topic: "test-topic", partition: 0}]);
```

</details>

<details>
<summary>seekToEnd</summary>

Seeks to the end of the specified partitions.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `partitions` | `TopicPartition[]` | Yes | Partitions to seek to the end. |

Returns: `error?`

Sample code:

```ballerina
check consumer->seekToEnd([{topic: "test-topic", partition: 0}]);
```

</details>

<details>
<summary>getCommittedOffset</summary>

Returns the last committed offset for a partition.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `partition` | `TopicPartition` | Yes | The topic-partition to query. |
| `duration` | `decimal` | No | Timeout in seconds. Defaults to `-1` (uses the consumer's configured default API timeout). |

Returns: `kafka:PartitionOffset|error?`

Sample code:

```ballerina
kafka:PartitionOffset? offset = check consumer->getCommittedOffset(
    {topic: "test-topic", partition: 0}, 10
);
```

Sample response:

```ballerina
{"partition": {"topic": "test-topic", "partition": 0}, "offset": 99}
```

</details>

<details>
<summary>getPositionOffset</summary>

Returns the current position (next fetch offset) for a partition.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `partition` | `TopicPartition` | Yes | The topic-partition to query. |
| `duration` | `decimal` | No | Timeout in seconds. Defaults to `-1` (uses the consumer's configured default API timeout). |

Returns: `int|error`

Sample code:

```ballerina
int position = check consumer->getPositionOffset(
    {topic: "test-topic", partition: 0}, 10
);
```

Sample response:

```ballerina
100
```

</details>

#### Partition management

<details>
<summary>getAssignment</summary>

Returns the set of partitions currently assigned to this consumer.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|

Returns: `kafka:TopicPartition[]|error`

Sample code:

```ballerina
kafka:TopicPartition[] assigned = check consumer->getAssignment();
```

Sample response:

```ballerina
[{"topic": "test-kafka-topic", "partition": 0}, {"topic": "test-kafka-topic", "partition": 1}]
```

</details>

<details>
<summary>getSubscription</summary>

Returns the current topic subscription.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|

Returns: `string[]|error`

Sample code:

```ballerina
string[] topics = check consumer->getSubscription();
```

Sample response:

```ballerina
["test-kafka-topic", "order-topic"]
```

</details>

<details>
<summary>getTopicPartitions</summary>

Returns the partition metadata for a topic.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `topic` | `string` | Yes | The Kafka topic name. |
| `duration` | `decimal` | No | Timeout in seconds. Defaults to `-1` (uses the consumer's configured default API timeout). |

Returns: `kafka:TopicPartition[]|error`

Sample code:

```ballerina
kafka:TopicPartition[] partitions = check consumer->getTopicPartitions("test-topic", 10);
```

Sample response:

```ballerina
[{"topic": "test-topic", "partition": 0}, {"topic": "test-topic", "partition": 1}, {"topic": "test-topic", "partition": 2}]
```

</details>

<details>
<summary>pause</summary>

Pauses consumption from the specified partitions.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `partitions` | `TopicPartition[]` | Yes | Partitions to pause. |

Returns: `error?`

Sample code:

```ballerina
check consumer->pause([{topic: "test-topic", partition: 0}]);
```

</details>

<details>
<summary>resume</summary>

Resumes consumption from previously paused partitions.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `partitions` | `TopicPartition[]` | Yes | Partitions to resume. |

Returns: `error?`

Sample code:

```ballerina
check consumer->resume([{topic: "test-topic", partition: 0}]);
```

</details>

<details>
<summary>getPausedPartitions</summary>

Returns the set of partitions currently paused.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|

Returns: `kafka:TopicPartition[]|error`

Sample code:

```ballerina
kafka:TopicPartition[] paused = check consumer->getPausedPartitions();
```

Sample response:

```ballerina
[{"topic": "test-topic", "partition": 0}]
```

</details>

<details>
<summary>getAvailableTopics</summary>

Returns all topics available on the Kafka cluster.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `duration` | `decimal` | No | Timeout in seconds. Defaults to `-1` (uses the consumer's configured default API timeout). |

Returns: `string[]|error`

Sample code:

```ballerina
string[] availableTopics = check consumer->getAvailableTopics(10);
```

Sample response:

```ballerina
["test-kafka-topic", "order-topic", "payment-topic", "__consumer_offsets"]
```

</details>

<details>
<summary>getBeginningOffsets</summary>

Returns the earliest available offsets for the given partitions.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `partitions` | `TopicPartition[]` | Yes | Partitions to query. |
| `duration` | `decimal` | No | Timeout in seconds. Defaults to `-1` (uses the consumer's configured default API timeout). |

Returns: `kafka:PartitionOffset[]|error`

Sample code:

```ballerina
kafka:PartitionOffset[] beginOffsets = check consumer->getBeginningOffsets(
    [{topic: "test-topic", partition: 0}], 10
);
```

Sample response:

```ballerina
[{"partition": {"topic": "test-topic", "partition": 0}, "offset": 0}]
```

</details>

<details>
<summary>getEndOffsets</summary>

Returns the end offsets (next-to-be-written) for the given partitions.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `partitions` | `TopicPartition[]` | Yes | Partitions to query. |
| `duration` | `decimal` | No | Timeout in seconds. Defaults to `-1` (uses the consumer's configured default API timeout). |

Returns: `kafka:PartitionOffset[]|error`

Sample code:

```ballerina
kafka:PartitionOffset[] endOffsets = check consumer->getEndOffsets(
    [{topic: "test-topic", partition: 0}], 10
);
```

Sample response:

```ballerina
[{"partition": {"topic": "test-topic", "partition": 0}, "offset": 1523}]
```

</details>

<details>
<summary>offsetsForTimes</summary>

Returns the offsets for the given partitions whose timestamps are greater than or equal to the provided timestamps. Useful for replaying messages from a specific point in time.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `topicPartitionTimestamps` | `TopicPartitionTimestamp[]` | Yes | Array of `[TopicPartition, int]` tuples where `int` is the target timestamp in milliseconds since epoch. |
| `duration` | `decimal?` | No | Timeout in seconds. Defaults to `()` (uses the consumer's configured default API timeout). |

Returns: `kafka:TopicPartitionOffset[]|error`

Each element of the returned array is a `[TopicPartition, OffsetAndTimestamp?]` tuple. The `OffsetAndTimestamp` value contains `offset` (int), `timestamp` (int), and `leaderEpoch` (int?). The second element can be `()` if no offset was found for the given timestamp.

Sample code:

```ballerina
kafka:TopicPartitionOffset[] offsets = check consumer->offsetsForTimes(
    [[{topic: "test-topic", partition: 0}, 1700000000000]]
);
```

Sample response:

```ballerina
[[{"topic": "test-topic", "partition": 0}, {"offset": 42, "timestamp": 1700000000005, "leaderEpoch": ()}]]
```

</details>

#### Lifecycle

<details>
<summary>close</summary>

Closes the consumer and releases all resources.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `duration` | `decimal` | No | Timeout in seconds to wait for graceful shutdown. Defaults to `-1` (uses the consumer's configured default API timeout). |

Returns: `error?`

Sample code:

```ballerina
check consumer->close(15);
```

</details>
