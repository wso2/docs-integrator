---
sidebar_position: 9
title: Message Filter
description: "Integration pattern: Message Filter -- selectively process messages that match specific criteria."
---

# Message Filter

The Message Filter pattern removes unwanted messages from a channel so that only messages meeting specific criteria are passed to the downstream processor. This is one of the most fundamental Enterprise Integration Patterns for controlling message flow.

## Problem

Your integration receives a stream of messages, but only a subset of them are relevant to the downstream system. Processing every message wastes resources and can introduce errors if the downstream system receives data it cannot handle.

## Solution

Place a filter between the message source and the processor that evaluates each message against a set of criteria. Messages that match the criteria are forwarded; messages that do not match are discarded or routed to an alternative channel.

```
                    ┌─────────────────┐
                    │                 │     Match
 All Messages ────►│  Message Filter  ├──────────► Processor
                    │  (criteria)     │
                    │                 ├──────────► Discard / Alt Channel
                    └─────────────────┘  No Match
```

## When to Use It

- **Event filtering** -- Process only high-priority alerts from a monitoring stream
- **Data quality gates** -- Discard incomplete or malformed records before loading
- **Tenant isolation** -- Route messages for a specific tenant and ignore others
- **Deduplication preprocessing** -- Filter out messages you have already seen
- **Compliance filtering** -- Exclude records from restricted regions

## Implementation

### Basic Message Filter

Filter incoming order events to process only high-value orders:

```ballerina
import ballerina/http;
import ballerina/log;

type OrderEvent record {|
    string orderId;
    string customerId;
    decimal amount;
    string region;
    string priority;
|};

service /orders on new http:Listener(8090) {

    resource function post events(OrderEvent event) returns http:Ok|http:Accepted {
        // Filter: only process high-value orders
        if event.amount >= 1000.00d {
            log:printInfo("Processing high-value order",
                orderId = event.orderId,
                amount = event.amount
            );
            check processOrder(event);
            return http:OK;
        }

        log:printInfo("Filtered out low-value order",
            orderId = event.orderId,
            amount = event.amount
        );
        return http:ACCEPTED;
    }
}

function processOrder(OrderEvent event) returns error? {
    // Forward to downstream processing
}
```

### Multi-Criteria Filter

Apply multiple filter conditions using a predicate function:

```ballerina
type FilterCriteria record {|
    decimal? minAmount;
    string[]? allowedRegions;
    string[]? allowedPriorities;
|};

function shouldProcess(OrderEvent event, FilterCriteria criteria) returns boolean {
    // Check minimum amount
    if criteria.minAmount is decimal && event.amount < criteria.minAmount {
        return false;
    }

    // Check allowed regions
    string[]? regions = criteria.allowedRegions;
    if regions is string[] && regions.indexOf(event.region) is () {
        return false;
    }

    // Check allowed priorities
    string[]? priorities = criteria.allowedPriorities;
    if priorities is string[] && priorities.indexOf(event.priority) is () {
        return false;
    }

    return true;
}

// Usage
FilterCriteria criteria = {
    minAmount: 500.00d,
    allowedRegions: ["US", "EU", "UK"],
    allowedPriorities: ["high", "critical"]
};

// In the service handler:
if shouldProcess(event, criteria) {
    check processOrder(event);
}
```

### Streaming Filter with Kafka

Filter messages from a Kafka topic before processing:

```ballerina
import ballerinax/kafka;
import ballerina/log;

configurable string kafkaBrokers = "localhost:9092";

listener kafka:Listener kafkaListener = new ({
    bootstrapServers: kafkaBrokers,
    groupId: "order-filter-group",
    topics: ["all-orders"]
});

final kafka:Producer filteredProducer = check new ({
    bootstrapServers: kafkaBrokers
});

service on kafkaListener {
    remote function onConsumerRecord(kafka:ConsumerRecord[] records) returns error? {
        foreach kafka:ConsumerRecord rec in records {
            OrderEvent event = check rec.value.fromJsonStringWithType();

            if shouldProcess(event, criteria) {
                // Forward matching messages to the filtered topic
                check filteredProducer->send({
                    topic: "high-value-orders",
                    key: event.orderId,
                    value: event.toJsonString()
                });
            } else {
                log:printDebug("Message filtered", orderId = event.orderId);
            }
        }
    }
}
```

## Variations

### Discard vs. Route to Dead Letter

A simple filter discards non-matching messages. A more robust approach routes them to a dead letter channel for auditing or reprocessing:

```ballerina
function filterAndRoute(OrderEvent event) returns error? {
    if shouldProcess(event, criteria) {
        check processOrder(event);
    } else {
        // Route to dead letter instead of discarding
        check filteredProducer->send({
            topic: "filtered-orders-dlq",
            key: event.orderId,
            value: event.toJsonString()
        });
    }
}
```

### Configurable Filters

Load filter criteria from configuration to change filtering behavior without redeploying:

```ballerina
configurable decimal minOrderAmount = 500.00d;
configurable string[] allowedRegions = ["US", "EU"];

FilterCriteria criteria = {
    minAmount: minOrderAmount,
    allowedRegions: allowedRegions,
    allowedPriorities: ()
};
```

## Considerations

- **Logging filtered messages** -- Always log filtered messages at DEBUG level for troubleshooting
- **Metrics** -- Track the filter rate (filtered vs. passed) to detect anomalies
- **Filter ordering** -- Apply the cheapest filter criteria first to short-circuit evaluation
- **Avoid side effects** -- The filter predicate should be pure and not modify the message

## Related Patterns

- [Content-Based Router](content-based-router.md) -- Routes messages to different destinations based on content (filter routes to one destination or discards)
- [Idempotent Receiver](idempotent-receiver.md) -- Filters duplicate messages specifically
- [Message Translator](message-translator.md) -- Transforms messages rather than filtering them
