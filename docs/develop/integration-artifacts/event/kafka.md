---
title: Kafka
---

# Kafka

Consume messages from Apache Kafka topics with consumer group management, offset control, and schema-aware deserialization.

## Creating a Kafka consumer

1. Click the **+** **Add Artifacts** button in the canvas or click **+** next to **Entry Points** in the sidebar.
2. In the **Artifacts** panel, select **Kafka** under **Event Integration**.

   <ThemedImage
       alt="Artifacts panel showing Kafka under Event Integration"
       sources={{
           light: useBaseUrl('/img/develop/integration-artifacts/event/kafka/step-2.png'),
           dark: useBaseUrl('/img/develop/integration-artifacts/event/kafka/step-2.png'),
       }}
   />

3. In the creation form, fill in the following fields:

   <ThemedImage
       alt="Kafka consumer creation form"
       sources={{
           light: useBaseUrl('/img/develop/integration-artifacts/event/kafka/step-creation-form.png'),
           dark: useBaseUrl('/img/develop/integration-artifacts/event/kafka/step-creation-form.png'),
       }}
   />

   | Field | Description |
   |---|---|
   | **Bootstrap Servers** | Comma-separated list of Kafka broker addresses (e.g., `localhost:9092`). Required. |
   | **Topic(s)** | One or more Kafka topic names to subscribe to. Required. |

   Expand **Advanced Configurations** to set additional options including the consumer group ID, offset reset policy, and polling interval.

4. Click **Create**.

5. WSO2 Integrator opens the **Kafka Consumer Designer**. The header shows the listener configuration pill and the list of event handlers.

   <ThemedImage
       alt="Kafka Consumer Designer showing the listener configuration"
       sources={{
           light: useBaseUrl('/img/develop/integration-artifacts/event/kafka/step-3.png'),
           dark: useBaseUrl('/img/develop/integration-artifacts/event/kafka/step-3.png'),
       }}
   />

6. Click the `onConsumerRecord` handler row to open it in the **flow designer**.

   <ThemedImage
       alt="Flow designer showing the onConsumerRecord handler canvas"
       sources={{
           light: useBaseUrl('/img/develop/integration-artifacts/event/kafka/step-4.png'),
           dark: useBaseUrl('/img/develop/integration-artifacts/event/kafka/step-4.png'),
       }}
   />

7. Use the flow canvas to add integration steps — database writes, HTTP calls, and transformations.

```ballerina
import ballerina/log;
import ballerinax/kafka;

// should add under types.bal file
type OrderEvent record {|
    string orderId;
    string customerId;
    decimal amount;
|};

configurable string bootstrapServers = "localhost:9092";
configurable string groupId = "order-processor";
configurable string kafkaTopic = "orders";

listener kafka:Listener kafkaListener = new (bootstrapServers, {
    groupId: groupId,
    topics: [kafkaTopic],
    offsetReset: kafka:OFFSET_RESET_LATEST, // skip old messages, only consume new ones
    pollingInterval: 1,
    autoCommit: false // required when using caller->commit()
});

service kafka:Service on kafkaListener {

    remote function onConsumerRecord(kafka:AnydataConsumerRecord[] messages, kafka:Caller caller) returns error? {
        foreach kafka:AnydataConsumerRecord msg in messages {
            do {
                byte[] msgBytes = check msg.value.ensureType();
                string jsonStr = check string:fromBytes(msgBytes);
                OrderEvent orderEvent = check jsonStr.fromJsonStringWithType();
                processOrder(orderEvent); // Implement a processing logic under processOrder() method in functions.bal file
                log:printInfo("onConsumerRecord triggered", orderId = orderEvent.orderId);
            } on fail error e {
                log:printError("Failed to process message, skipping", 'error = e, offset = msg.offset.offset, partition = msg.offset.partition.partition);
            }
        }
        check caller->commit();
    }
}
```

## Service configuration

Service configuration controls the service name and the Kafka listener it is attached to.

In the **Kafka Consumer Designer**, click **Configure** to open the **Kafka Event Integration Configuration** panel.

The left panel shows the service name and its **Attached Listeners**. Click **Kafka Listener** under **Attached Listeners** to configure the listener connection settings in the right panel.

| Field | Description |
|---|---|
| **Bootstrap Servers** | Kafka broker addresses. Accepts a Ballerina expression or a plain text value. |
| **Group Id** | Consumer group identifier. |
| **Topics** | Topics to subscribe to. |
| **Offset Reset** | Offset reset strategy when no initial offset is present. Options: `earliest`, `latest`, `none`. |

Click **+ Attach Listener** at the bottom of the panel to attach a different or existing named listener.

Service configuration maps to the `ConsumerConfiguration` record passed when constructing the listener:

```ballerina
listener kafka:Listener orderListener = new ("localhost:9092", {
    groupId: "order-processor",
    topics: ["orders"],
    offsetReset: kafka:OFFSET_RESET_EARLIEST
});

service on orderListener {
    // handlers
}
```

## Listener configuration

The listener connects to Kafka brokers and manages topic subscriptions and consumer group coordination. You can configure the listener directly from the **Listeners** panel in the sidebar.

In the sidebar, expand **Listeners** and click the listener name (for example, `kafkaListener`) to open the **Kafka Listener Configuration** form.

<ThemedImage
    alt="Kafka Listener Configuration panel"
    sources={{
        light: useBaseUrl('/img/develop/integration-artifacts/event/kafka/listener-config-1.png'),
        dark: useBaseUrl('/img/develop/integration-artifacts/event/kafka/listener-config-1.png'),
    }}
/>

| Field | Description |
|---|---|
| **Name** | Identifier for the listener, used in the service declaration. Required. |
| **Bootstrap Servers** | Comma-separated list of Kafka broker `host:port` addresses. Required. |
| **Topics** | Topics for the consumer to subscribe to. |
| **Group Id** | Consumer group identifier for coordinated offset tracking. |
| **Offset Reset** | Strategy when no committed offset exists: `earliest`, `latest`, or `none`. |
| **Partition Assignment Strategy** | Class that implements the partition assignment strategy among consumer group members. |
| **Metrics Recording Level** | Level of metrics recorded by the Kafka client (for example, `INFO` or `DEBUG`). |

**Named listener** — declare the listener at module level and attach services to it:

```ballerina
listener kafka:Listener kafkaListener = new ("localhost:9092", {
    groupId: "order-processor",
    topics: ["orders"],
    pollingInterval: 1,
    autoCommit: false,
    offsetReset: kafka:OFFSET_RESET_EARLIEST
});

service on kafkaListener {
    remote function onConsumerRecord(kafka:Caller caller, OrderEvent[] orders) returns error? {
        // process messages
    }
}
```

`bootstrapServers` is passed as the first positional argument to the `kafka:Listener` constructor, not as part of the configuration record: `new ("localhost:9092", { ... })`.

Key `kafka:ConsumerConfiguration` fields:

| Field | Type | Default | Description |
|---|---|---|---|
| `groupId` | `string?` | `()` | Consumer group identifier. |
| `topics` | `string\|string[]?` | `()` | Topics to subscribe to. |
| `pollingInterval` | `decimal?` | `()` | Seconds between polling cycles. |
| `autoCommit` | `boolean` | `true` | Automatically commit offsets after each poll. |
| `autoCommitInterval` | `decimal?` | `()` | Auto-commit interval in seconds when `autoCommit: true`. |
| `offsetReset` | `OffsetResetMethod?` | `()` | Offset reset strategy when no committed offset exists. Use `kafka:OFFSET_RESET_EARLIEST`, `kafka:OFFSET_RESET_LATEST`, or `kafka:OFFSET_RESET_NONE`. |
| `concurrentConsumers` | `int?` | `()` | Number of concurrent consumer threads. |
| `isolationLevel` | `IsolationLevel?` | `()` | Transactional read isolation. Use `kafka:ISOLATION_COMMITTED` or `kafka:ISOLATION_UNCOMMITTED`. |

## Event handler configuration

A Kafka service defines remote functions that the runtime calls when records arrive. Add handlers from the **Kafka Consumer Designer** using the **+ Handler** button.

In the **Kafka Consumer Designer**, the **Event Handlers** section lists all handlers. Click **+ Handler** to add a new handler. Each row shows an **Event** badge and the handler name. Click the settings icon (⚙) on a handler row to configure its parameters.

| Handler | Trigger | Required |
|---|---|---|
| **onConsumerRecord** | Called for each batch of records received from subscribed topics. | Yes |

**`onConsumerRecord`** — receives a batch of messages. The message type can be `string`, `json`, `xml`, `byte[]`, or a custom record:

```ballerina
remote function onConsumerRecord(kafka:Caller caller, OrderEvent[] orders) returns error? {
    foreach OrderEvent order in orders {
        check processOrder(order);
    }
    check caller->commit();
}
```

The `kafka:Caller` parameter provides offset management methods:

| Method | Description |
|---|---|
| `caller->commit()` | Commit offsets for the current batch. Use when `autoCommit: false`. |
| `caller->seek({partition: {topic: "my-topic", partition: 0}, offset: 100})` | Seek to a specific offset on a given partition. Accepts a single `PartitionOffset` record. |

**Typed message payloads** — Ballerina deserializes JSON automatically when the parameter type is a record:

```ballerina
type OrderEvent record {|
    string orderId;
    string customerId;
    decimal amount;
|};

remote function onConsumerRecord(kafka:Caller caller, OrderEvent[] orders) returns error? {
    foreach OrderEvent order in orders {
        log:printInfo("Order received", orderId = order.orderId);
    }
}
```

## Offset management strategies

| Strategy | Configuration | Behavior |
|---|---|---|
| **Auto-commit** | `autoCommit: true` | Offsets committed automatically at the polling interval |
| **Manual commit** | `autoCommit: false` | Call `caller->commit()` after processing |
| **Seek to beginning** | `offsetReset: kafka:OFFSET_RESET_EARLIEST` | Reprocess from the beginning of the topic |
| **Seek to end** | `offsetReset: kafka:OFFSET_RESET_LATEST` | Skip to the latest messages only |

### Acknowledgment strategies

| Strategy | Guarantee | Use case |
|---|---|---|
| Auto-acknowledge | At most once | Low-value events, metrics |
| Manual acknowledge | At least once | Business-critical events |
| Transactional | Exactly once | Financial transactions |

Set the offset strategy in the listener configuration:

```ballerina
// Auto-commit (default) — offsets committed automatically
listener kafka:Listener autoListener = new (bootstrapServers, {
    groupId: "my-group",
    topics: ["my-topic"],
    autoCommit: true
});

// Manual commit — call caller->commit() after processing each batch
listener kafka:Listener manualListener = new (bootstrapServers, {
    groupId: "my-group",
    topics: ["my-topic"],
    autoCommit: false
});

// Seek to beginning — reprocess all messages from the start of the topic
listener kafka:Listener earliestListener = new (bootstrapServers, {
    groupId: "my-group",
    topics: ["my-topic"],
    offsetReset: kafka:OFFSET_RESET_EARLIEST
});

// Seek to end — consume only new messages published after the consumer starts
listener kafka:Listener latestListener = new (bootstrapServers, {
    groupId: "my-group",
    topics: ["my-topic"],
    offsetReset: kafka:OFFSET_RESET_LATEST
});
```

## What's next

- [Kafka Connector Overview](../../../connectors/catalog/messaging/kafka/connector-overview.md) — full connector reference for producer and consumer clients
- [Action Reference](../../../connectors/catalog/messaging/kafka/actions.md) — all producer and consumer operations, parameters, and sample code
- [Trigger Reference](../../../connectors/catalog/messaging/kafka/triggers.md) — event-driven listener and service callback reference
- [Setup Guide](../../../connectors/catalog/messaging/kafka/setup-guide.md) — set up a local or managed Kafka cluster
