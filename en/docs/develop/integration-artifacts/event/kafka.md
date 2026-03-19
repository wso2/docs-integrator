---
title: Kafka
description: Consume messages from Apache Kafka topics with consumer group management and offset control.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Kafka

Consume messages from Apache Kafka topics with consumer group management, offset control, and schema-aware deserialization.

## Creating a Kafka consumer

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

1. Click the **+** **Add Artifacts** button in the canvas or click **+** next to **Entry Points** in the sidebar.
2. In the **Artifacts** panel, select **Kafka** under **Event Integration**.

   ![Artifacts panel showing Kafka under Event Integration](/img/develop/integration-artifacts/event/kafka/step-2.png)

3. In the creation form, fill in the following fields:

   ![Kafka consumer creation form](/img/develop/integration-artifacts/event/kafka/step-creation-form.png)

   **Service Configurations**


   | Field | Description |
   |---|---|
   | **Bootstrap Servers** | Comma-separated list of Kafka broker addresses (e.g., `localhost:9092`). Required. |
   | **Topic(s)** | One or more Kafka topic names to subscribe to. Required. |

   **Advanced Configurations**

   Expand **Advanced Configurations** to set additional options including the consumer group ID, offset reset policy, and polling interval.

4. Click **Create**.

5. WSO2 Integrator opens the **Kafka Consumer Designer**. The header shows the listener configuration pill and the list of event handlers.

   ![Kafka Consumer Designer showing the listener configuration](/img/develop/integration-artifacts/event/kafka/step-3.png)

6. Click the `onConsumerRecord` handler row to open it in the **flow designer**.

   ![Flow designer showing the onConsumerRecord handler canvas](/img/develop/integration-artifacts/event/kafka/step-4.png)

7. Use the flow canvas to add integration steps — database writes, HTTP calls, and transformations.

</TabItem>
<TabItem value="code" label="Ballerina Code">

```ballerina
import ballerinax/kafka;

configurable string bootstrapServers = "localhost:9092";
configurable string groupId = "order-processor";

type OrderEvent record {|
    string orderId;
    string customerId;
    decimal amount;
    string timestamp;
|};

listener kafka:Listener orderListener = new ({
    bootstrapServers: bootstrapServers,
    groupId: groupId,
    topics: ["orders"],
    pollingInterval: 1,
    autoCommit: false
});

service on orderListener {

    remote function onConsumerRecord(kafka:Caller caller, OrderEvent[] orders) returns error? {
        foreach OrderEvent order in orders {
            log:printInfo("Processing order", orderId = order.orderId, amount = order.amount);
            check processOrder(order);
        }
        // Manual commit after successful processing
        check caller->commit();
    }

    remote function onError(kafka:Error err) {
        log:printError("Kafka consumer error", 'error = err);
    }
}
```

</TabItem>
</Tabs>

## Offset Management Strategies

| Strategy | Configuration | Behavior |
|---|---|---|
| **Auto-commit** | `autoCommit: true` | Offsets committed automatically at the polling interval |
| **Manual commit** | `autoCommit: false` | Call `caller->commit()` after processing |
| **Seek to beginning** | `autoOffsetReset: "earliest"` | Reprocess from the beginning of the topic |
| **Seek to end** | `autoOffsetReset: "latest"` | Skip to the latest messages only |

<!-- ## Common Patterns

### Dead Letter Queue (DLQ)

Route failed messages to a dead letter queue for manual inspection or retry.

```ballerina
function processWithDLQ(kafka:Caller caller, OrderEvent order) returns error? {
    do {
        check processOrder(order);
        check caller->commit();
    } on fail error e {
        log:printError("Processing failed, sending to DLQ", orderId = order.orderId);
        check sendToDLQ(order, e.message());
        check caller->commit(); // Acknowledge so it does not reprocess
    }
}
``` -->

### Acknowledgment Strategies

| Strategy | Guarantee | Use Case |
|---|---|---|
| Auto-acknowledge | At most once | Low-value events, metrics |
| Manual acknowledge | At least once | Business-critical events |
| Transactional | Exactly once | Financial transactions |
