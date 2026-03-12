---
sidebar_position: 13
title: Idempotent Receiver
description: "Integration pattern: Idempotent Receiver -- handle duplicate messages safely by ensuring that processing a message multiple times has the same effect as processing it once."
---

# Idempotent Receiver

The Idempotent Receiver pattern ensures that processing a message more than once produces the same result as processing it exactly once. This is critical in distributed systems where duplicate messages are common due to retries, network issues, or at-least-once delivery guarantees.

## Problem

In integration scenarios with guaranteed delivery and retry logic, the same message may arrive at a receiver more than once. Without protection, this can cause duplicate orders, double payments, or incorrect data counts. You need a way to detect and handle duplicates gracefully.

## Solution

Give each message a unique identifier. Before processing a message, check whether that identifier has already been processed. If it has, skip processing (or return the previous result). If it has not, process the message and record the identifier as completed.

```
                    ┌────────────────────────────────────────┐
                    │        Idempotent Receiver              │
                    │                                        │
 Message ──────────►│  1. Extract message ID                 │
 (may be            │  2. Check: already processed?          │
  duplicate)        │     ├─ YES → Return cached result      │
                    │     └─ NO  → Process & record ID       │
                    │                                        │
                    └────────────────────────────────────────┘
```

## When to Use It

- **Payment processing** -- Prevent charging a customer twice for the same transaction
- **Order creation** -- Avoid creating duplicate orders from retried API calls
- **Event processing** -- Handle duplicate events from Kafka or other message brokers
- **Webhook receivers** -- Third-party webhooks often retry on timeout, sending the same event multiple times
- **File processing** -- Prevent re-processing files that have already been handled

## Implementation

### In-Memory Idempotency (Simple)

Suitable for single-instance services during development and testing:

```ballerina
import ballerina/http;
import ballerina/log;
import ballerina/cache;

final cache:Cache processedMessages = new ({
    capacity: 10000,
    evictionFactor: 0.2,
    defaultMaxAge: 3600     // 1 hour TTL
});

type OrderRequest record {|
    string messageId;
    string orderId;
    string customerId;
    OrderItem[] items;
    decimal total;
|};

type OrderItem record {|
    string sku;
    int qty;
    decimal price;
|};

type OrderResult record {|
    string orderId;
    string status;
    string message;
|};

service /orders on new http:Listener(8090) {

    resource function post create(OrderRequest request) returns OrderResult|error {
        // Step 1: Check for duplicate
        any|cache:Error cached = processedMessages.get(request.messageId);
        if cached is OrderResult {
            log:printInfo("Duplicate message detected, returning cached result",
                messageId = request.messageId,
                orderId = request.orderId
            );
            return cached;
        }

        // Step 2: Process the order
        OrderResult result = check processOrder(request);

        // Step 3: Cache the result
        check processedMessages.put(request.messageId, result);

        return result;
    }
}

function processOrder(OrderRequest request) returns OrderResult|error {
    // Business logic to create the order
    log:printInfo("Processing new order", orderId = request.orderId);
    return {
        orderId: request.orderId,
        status: "created",
        message: "Order processed successfully"
    };
}
```

### Database-Backed Idempotency (Production)

Use a database table for durable, multi-instance idempotency:

```ballerina
import ballerina/http;
import ballerina/log;
import ballerina/sql;
import ballerinax/mysql;

configurable string dbHost = "localhost";
configurable string dbUser = ?;
configurable string dbPassword = ?;
configurable string dbName = ?;

final mysql:Client dbClient = check new (
    host = dbHost, user = dbUser, password = dbPassword, database = dbName
);

// Idempotency table:
// CREATE TABLE processed_messages (
//     message_id VARCHAR(255) PRIMARY KEY,
//     result JSON NOT NULL,
//     processed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     INDEX idx_processed_at (processed_at)
// );

service /orders on new http:Listener(8090) {

    resource function post create(OrderRequest request) returns OrderResult|error {
        // Step 1: Check if already processed
        OrderResult? existingResult = check getProcessedResult(request.messageId);
        if existingResult is OrderResult {
            log:printInfo("Returning cached result for duplicate message",
                messageId = request.messageId
            );
            return existingResult;
        }

        // Step 2: Process the message
        OrderResult result = check processOrder(request);

        // Step 3: Record as processed
        check recordProcessed(request.messageId, result);

        return result;
    }
}

function getProcessedResult(string messageId) returns OrderResult?|error {
    sql:ParameterizedQuery query = `
        SELECT result FROM processed_messages WHERE message_id = ${messageId}
    `;
    record {|string result;|}? row = check dbClient->queryRow(query);
    if row is () {
        return ();
    }
    json resultJson = check row.result.fromJsonString();
    return check resultJson.fromJsonWithType();
}

function recordProcessed(string messageId, OrderResult result) returns error? {
    sql:ParameterizedQuery query = `
        INSERT INTO processed_messages (message_id, result)
        VALUES (${messageId}, ${result.toJsonString()})
    `;
    _ = check dbClient->execute(query);
}
```

### Kafka Consumer with Idempotency

Handle duplicate messages from Kafka:

```ballerina
import ballerinax/kafka;
import ballerina/log;

listener kafka:Listener orderListener = new ({
    bootstrapServers: "localhost:9092",
    groupId: "order-processor",
    topics: ["orders"]
});

service on orderListener {
    remote function onConsumerRecord(kafka:ConsumerRecord[] records) returns error? {
        foreach kafka:ConsumerRecord rec in records {
            json payload = check rec.value.fromJsonString();
            string messageId = check payload.messageId;

            // Check idempotency
            OrderResult? existing = check getProcessedResult(messageId);
            if existing is OrderResult {
                log:printDebug("Skipping duplicate Kafka message", messageId = messageId);
                continue;
            }

            // Process
            OrderRequest request = check payload.fromJsonWithType();
            OrderResult result = check processOrder(request);
            check recordProcessed(messageId, result);
        }
    }
}
```

### Idempotency Key from HTTP Headers

Accept an idempotency key from the client via HTTP headers (common in payment APIs):

```ballerina
service /payments on new http:Listener(8090) {

    resource function post charge(http:Request req) returns json|http:BadRequest|error {
        // Extract idempotency key from header
        string|error idempotencyKey = req.getHeader("Idempotency-Key");
        if idempotencyKey is error {
            return <http:BadRequest>{
                body: {message: "Idempotency-Key header is required"}
            };
        }

        // Check for duplicate
        OrderResult? existing = check getProcessedResult(idempotencyKey);
        if existing is OrderResult {
            log:printInfo("Returning cached payment result",
                idempotencyKey = idempotencyKey
            );
            return existing.toJson();
        }

        // Process payment
        json payload = check req.getJsonPayload();
        OrderResult result = check processPayment(payload);
        check recordProcessed(idempotencyKey, result);
        return result.toJson();
    }
}

function processPayment(json payload) returns OrderResult|error {
    // Payment processing logic
    return {orderId: check payload.orderId, status: "charged", message: "Payment processed"};
}
```

## Variations

| Variation | Description |
|-----------|-------------|
| **Content-based dedup** | Use a hash of the message content as the idempotency key |
| **Time-windowed** | Only check for duplicates within a time window (e.g., last 24 hours) |
| **Optimistic locking** | Use database constraints (UNIQUE index) to handle race conditions |
| **Distributed cache** | Use Redis for cross-instance idempotency checks |

## Considerations

- **Storage cleanup** -- Periodically purge old processed-message records to prevent unbounded growth
- **Race conditions** -- Two identical messages arriving simultaneously can bypass the check. Use database UNIQUE constraints or distributed locks.
- **Key generation** -- Choose idempotency keys carefully. UUIDs are safest. Content hashes work but may collide on legitimate different messages with identical content.
- **Response consistency** -- Always return the same response for a duplicate as for the original processing

## Related Patterns

- [Guaranteed Delivery](guaranteed-delivery.md) -- Idempotent receiver is the essential companion to guaranteed delivery
- [Message Filter](message-filter.md) -- Filters messages before processing; idempotent receiver filters duplicates specifically
- [Circuit Breaker & Retry](circuit-breaker.md) -- Retry logic commonly produces the duplicates that idempotent receiver handles
