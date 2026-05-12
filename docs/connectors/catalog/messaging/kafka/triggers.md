---
title: Triggers
---

# Triggers

The `ballerinax/kafka` connector supports event-driven message consumption through a `kafka:Listener` that continuously polls Kafka topics and dispatches batches of records to your `kafka:Service` callback, eliminating the need for manual poll loops.

Three components work together:

| Component | Role |
|-----------|------|
| `kafka:Listener` | Continuously polls Kafka topics at a configurable interval and dispatches records to attached services. |
| `kafka:Service` | Defines the `onConsumerRecord` callback invoked for each batch of consumed records. |
| `kafka:Caller` | Provided in the callback to enable manual offset commits and seeking within the service handler. |

For action-based record operations, see the [Action Reference](actions.md).

---

## Listener

The `kafka:Listener` establishes the connection and manages event subscriptions.

### Configuration

The listener supports the following connection strategies:

| Config Type | Description |
|-------------|-------------|
| `ConsumerConfiguration` | The Listener reuses the same `ConsumerConfiguration` as the Consumer client. Key fields for listener usage are shown below. |

`ConsumerConfiguration` fields:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `groupId` | `string?` | `()` | Consumer group identifier for coordinated consumption. |
| `topics` | `string|string[]?` | `()` | Topic(s) to subscribe to. |
| `offsetReset` | `OffsetResetMethod?` | `()` | Strategy when no initial offset exists (`"earliest"`, `"latest"`, `"none"`). |
| `pollingInterval` | `decimal?` | `()` | Interval in seconds between consecutive polls. |
| `pollingTimeout` | `decimal?` | `()` | Timeout in seconds for each poll call. |
| `autoCommit` | `boolean` | `true` | Automatically commit offsets. Set to `false` for manual offset control via `kafka:Caller`. |
| `concurrentConsumers` | `int?` | `()` | Number of concurrent consumers for parallel processing. |
| `decoupleProcessing` | `boolean` | `false` | Decouple record processing from polling for improved throughput. |
| `secureSocket` | `SecureSocket?` | `()` | SSL/TLS configuration. |
| `auth` | `AuthenticationConfiguration?` | `()` | SASL authentication configuration. |
| `securityProtocol` | `SecurityProtocol` | `PROTOCOL_PLAINTEXT` | Security protocol. |

### Initializing the listener

**Basic listener with auto-commit disabled:**

```ballerina
import ballerinax/kafka;

listener kafka:Listener kafkaListener = new (kafka:DEFAULT_URL, {
    groupId: "my-group",
    topics: ["test-kafka-topic"],
    pollingInterval: 1,
    autoCommit: false
});
```

**Listener with SASL authentication:**

```ballerina
import ballerinax/kafka;

configurable string username = ?;
configurable string password = ?;
configurable string bootstrapServers = ?;

listener kafka:Listener kafkaListener = new (bootstrapServers, {
    groupId: "secure-group",
    topics: ["secure-topic"],
    auth: {
        mechanism: kafka:AUTH_SASL_PLAIN,
        username: username,
        password: password
    },
    securityProtocol: kafka:PROTOCOL_SASL_PLAINTEXT
});
```

---

## Service

A `kafka:Service` is a Ballerina service attached to a `kafka:Listener`. It implements the `onConsumerRecord` callback which is invoked each time the listener polls a batch of records from the subscribed Kafka topic(s).

### Callback signatures

| Function | Signature | Description |
|----------|-----------|-------------|
| `onConsumerRecord` | `remote function onConsumerRecord(kafka:Caller caller, kafka:BytesConsumerRecord[] records) returns error?` | Standard form: caller first, records second. |
| `onConsumerRecord` | `remote function onConsumerRecord(kafka:BytesConsumerRecord[] records, kafka:Caller caller) returns error?` | Parameter order can be reversed: records first, caller second. |
| `onConsumerRecord` | `remote function onConsumerRecord(kafka:BytesConsumerRecord[] records) returns error?` | `kafka:Caller` is optional. Omit it when manual offset management is not needed. |

The records array type can be replaced with any typed Ballerina record (`T[]`) for automatic payload deserialization. The `readonly` modifier can also be applied to the records parameter (e.g., `readonly & T[] records`).

Use the `@kafka:Payload` annotation on the records parameter to explicitly mark it as the payload for data binding, particularly when the service method includes both a `kafka:Caller` and a typed record parameter:
```ballerina
remote function onConsumerRecord(kafka:Caller caller, @kafka:Payload MyRecord[] records) returns error?
```

The `kafka:Caller` provides `commit()`, `commitOffset()`, and `seek()` remote functions for manual offset management within the service callback.

### Full usage example

```ballerina
import ballerina/log;
import ballerinax/kafka;

listener kafka:Listener kafkaListener = new (kafka:DEFAULT_URL, {
    groupId: "order-group",
    topics: ["order-topic"],
    pollingInterval: 1,
    autoCommit: false
});

service on kafkaListener {
    remote function onConsumerRecord(kafka:Caller caller, kafka:BytesConsumerRecord[] records) returns error? {
        foreach var rec in records {
            string value = check string:fromBytes(rec.value);
            log:printInfo("Received message", offset = rec.offset, value = value);
        }
        // Manually commit offsets after processing
        check caller->commit();
    }
}
```

Set `autoCommit: false` in the listener configuration when using manual offset commits via the Caller to avoid duplicate processing.

---

## Supporting types

### `BytesConsumerRecord`

| Field | Type | Description |
|-------|------|-------------|
| `key` | `byte[]?` | Optional message key as a byte array. |
| `value` | `byte[]` | Message payload as a byte array. |
| `timestamp` | `int` | Record timestamp in epoch milliseconds. |
| `offset` | `PartitionOffset` | The partition and offset of this record. |
| `headers` | `map&lt;byte[]|byte[][]&gt;` | Record headers as key-value pairs. |

### `AnydataConsumerRecord`

| Field | Type | Description |
|-------|------|-------------|
| `key` | `anydata?` | Optional message key. |
| `value` | `anydata` | Message payload. |
| `timestamp` | `int` | Record timestamp in epoch milliseconds. |
| `offset` | `PartitionOffset` | The partition and offset of this record. |
| `headers` | `map&lt;byte[]|byte[][]|string|string[]&gt;` | Record headers as key-value pairs. |

### `TopicPartition`

| Field | Type | Description |
|-------|------|-------------|
| `topic` | `string` | The Kafka topic name. |
| `partition` | `int` | The partition number. |

### `PartitionOffset`

| Field | Type | Description |
|-------|------|-------------|
| `partition` | `TopicPartition` | The topic-partition this offset belongs to. |
| `offset` | `int` | The offset position within the partition. |
