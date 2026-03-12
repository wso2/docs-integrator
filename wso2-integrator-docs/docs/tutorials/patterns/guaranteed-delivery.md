---
sidebar_position: 12
title: Guaranteed Delivery
description: "Integration pattern: Guaranteed Delivery -- ensure messages are delivered even when the target system is temporarily unavailable."
---

# Guaranteed Delivery

The Guaranteed Delivery pattern ensures that a message is eventually delivered to the target system, even if the network or the target is temporarily unavailable. Messages are persisted until the receiver confirms receipt.

## Problem

In distributed integrations, the target system may be down, overloaded, or unreachable at the moment a message is sent. If the message is lost, critical business data disappears silently. You need a mechanism that guarantees the message will be delivered once the target becomes available again.

## Solution

Store messages in a durable medium (message broker, database, or persistent queue) before attempting delivery. Retry delivery until the receiver acknowledges success. This decouples the sender from the receiver and ensures no messages are lost during outages.

```
┌──────────┐    ┌──────────────┐    ┌───────────────┐    ┌──────────┐
│  Sender  ├───►│  Persistent  ├───►│  Delivery     ├───►│ Receiver │
│          │    │  Store       │    │  Processor    │    │          │
└──────────┘    │  (Kafka/DB)  │    │  (retry loop) │    └────┬─────┘
                └──────────────┘    └───────────────┘         │
                       ▲                                       │
                       │              ACK                      │
                       └───────────────────────────────────────┘
```

## When to Use It

- **Critical business events** -- Order placements, payment confirmations, or shipment notifications that must not be lost
- **Cross-system synchronization** -- Keeping data in sync between systems with different availability
- **Regulatory compliance** -- Audit trails that require every event to be captured and delivered
- **Unreliable networks** -- Integrations across WAN links or with third-party APIs that have intermittent availability

## Implementation

### Using Kafka for Guaranteed Delivery

Kafka provides built-in durability through topic partitions and consumer offsets:

```ballerina
import ballerina/http;
import ballerina/log;
import ballerinax/kafka;

configurable string kafkaBrokers = "localhost:9092";

final kafka:Producer producer = check new ({
    bootstrapServers: kafkaBrokers,
    acks: "all",              // Wait for all replicas to acknowledge
    retryCount: 10            // Retry on transient failures
});

// Sender: publish to Kafka (guaranteed to be stored durably)
service /orders on new http:Listener(8090) {

    resource function post submit(json orderPayload) returns json|error {
        string orderId = check orderPayload.orderId;

        check producer->send({
            topic: "orders-guaranteed",
            key: orderId,
            value: orderPayload.toJsonString()
        });

        log:printInfo("Order queued for guaranteed delivery", orderId = orderId);
        return {status: "accepted", orderId: orderId};
    }
}
```

### Delivery Processor with Retry

Consume from Kafka and deliver with retries:

```ballerina
import ballerina/lang.runtime;
import ballerina/log;
import ballerinax/kafka;

configurable string targetUrl = "http://erp-system:8080/orders";
configurable int maxRetries = 5;
configurable int retryDelaySeconds = 10;

final http:Client targetClient = check new (targetUrl, {
    timeout: 30
});

listener kafka:Listener orderListener = new ({
    bootstrapServers: kafkaBrokers,
    groupId: "guaranteed-delivery-processor",
    topics: ["orders-guaranteed"],
    autoCommit: false           // Manual commit after successful delivery
});

service on orderListener {
    remote function onConsumerRecord(kafka:Caller caller, kafka:ConsumerRecord[] records)
            returns error? {
        foreach kafka:ConsumerRecord rec in records {
            json orderPayload = check rec.value.fromJsonString();
            string orderId = check orderPayload.orderId;

            boolean delivered = false;
            int attempt = 0;

            while !delivered && attempt < maxRetries {
                attempt += 1;
                json|error result = targetClient->post("/", orderPayload);

                if result is error {
                    log:printWarn("Delivery attempt failed",
                        orderId = orderId,
                        attempt = attempt,
                        'error = result.message()
                    );
                    if attempt < maxRetries {
                        // Exponential backoff
                        int delay = retryDelaySeconds * attempt;
                        runtime:sleep(<decimal>delay);
                    }
                } else {
                    delivered = true;
                    log:printInfo("Order delivered successfully",
                        orderId = orderId,
                        attempt = attempt
                    );
                }
            }

            if !delivered {
                // Move to dead letter topic after exhausting retries
                check sendToDeadLetter(orderPayload, orderId);
            }
        }

        // Commit offset only after all records in the batch are processed
        check caller->commit();
    }
}

function sendToDeadLetter(json payload, string orderId) returns error? {
    check producer->send({
        topic: "orders-dead-letter",
        key: orderId,
        value: payload.toJsonString()
    });
    log:printError("Order moved to dead letter queue", orderId = orderId);
}
```

### Database-Backed Outbox Pattern

For scenarios without a message broker, use a database outbox table:

```ballerina
import ballerina/sql;
import ballerina/task;
import ballerina/uuid;
import ballerinax/mysql;

configurable string dbHost = "localhost";
configurable string dbUser = ?;
configurable string dbPassword = ?;
configurable string dbName = ?;

final mysql:Client dbClient = check new (
    host = dbHost, user = dbUser, password = dbPassword, database = dbName
);

// Step 1: Write to outbox in the same transaction as business data
function createOrderWithGuaranteedDelivery(json orderData) returns error? {
    string messageId = uuid:createType1AsString();
    string orderId = check orderData.orderId;

    // Single transaction: business data + outbox entry
    _ = check dbClient->execute(`
        INSERT INTO orders (order_id, data) VALUES (${orderId}, ${orderData.toJsonString()})
    `);

    _ = check dbClient->execute(`
        INSERT INTO outbox_messages (id, topic, payload, status, created_at)
        VALUES (${messageId}, 'orders', ${orderData.toJsonString()}, 'PENDING', NOW())
    `);
}

// Step 2: Background processor delivers pending outbox messages
class OutboxProcessor {
    *task:Job;

    public function execute() {
        error? result = self.processPending();
        if result is error {
            log:printError("Outbox processing failed", 'error = result);
        }
    }

    function processPending() returns error? {
        sql:ParameterizedQuery query = `
            SELECT id, topic, payload FROM outbox_messages
            WHERE status = 'PENDING'
            ORDER BY created_at ASC
            LIMIT 100
        `;

        stream<record {|string id; string topic; string payload;|}, sql:Error?> messages =
            dbClient->query(query);

        check from var msg in messages
            do {
                error? deliveryResult = deliverMessage(msg.payload);
                if deliveryResult is () {
                    _ = check dbClient->execute(`
                        UPDATE outbox_messages SET status = 'DELIVERED' WHERE id = ${msg.id}
                    `);
                } else {
                    _ = check dbClient->execute(`
                        UPDATE outbox_messages
                        SET status = 'FAILED', retry_count = retry_count + 1
                        WHERE id = ${msg.id}
                    `);
                }
            };
    }
}

function deliverMessage(string payload) returns error? {
    _ = check targetClient->post("/", check payload.fromJsonString());
}
```

## Variations

| Variation | Description |
|-----------|-------------|
| **Store-and-Forward** | Persist locally, then forward when the target is reachable |
| **Transactional Outbox** | Write to an outbox table in the same DB transaction as business data |
| **Dead Letter Queue** | Route undeliverable messages to a separate queue for manual review |
| **Idempotent Delivery** | Combine with idempotent receiver to handle duplicate deliveries from retries |

## Considerations

- **At-least-once delivery** -- Guaranteed delivery typically means at-least-once. The receiver should be idempotent.
- **Ordering** -- Retries may cause out-of-order delivery. Use sequence numbers if ordering matters.
- **Storage capacity** -- Monitor the persistent store size. Unbounded queues can exhaust disk space.
- **Dead letter handling** -- Always have a plan for messages that exhaust all retries.
- **Monitoring** -- Alert on growing queue depth or increasing dead letter counts.

## Related Patterns

- [Idempotent Receiver](idempotent-receiver.md) -- Essential companion pattern for handling duplicate deliveries
- [Circuit Breaker & Retry](circuit-breaker.md) -- Controls retry behavior and prevents overwhelming failing services
- [Saga / Compensation](saga-compensation.md) -- Coordinates multi-step transactions with guaranteed completion
