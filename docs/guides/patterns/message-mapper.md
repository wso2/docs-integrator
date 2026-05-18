---
title: Message Mapper
---

import {
  EipReferenceLink,
  PatternImplementationTabs,
} from '@site/src/utils/eipPatternComponents';

# Message Mapper

Use the Message Mapper pattern to keep domain records independent from channel-specific message records by placing conversion logic in a dedicated mapper. <EipReferenceLink href="https://www.enterpriseintegrationpatterns.com/patterns/messaging/MessagingMapper.html" label="Enterprise Integration Patterns Messaging Mapper reference" />

The pattern is implemented between the message boundary and the domain processing logic. Convert incoming message payloads into domain records before the flow applies business logic, and convert domain records into channel-specific message records before the flow sends them to another endpoint.

## Record-to-record mapping

Use record-to-record mapping when both the domain value and the channel payload can be represented as typed records. Create separate record types for the domain model and the message format, then keep the mapping in a [reusable data mapper](../../develop/integration-artifacts/supporting/data-mapper/access-paths/reusable.md) or a dedicated mapper function. Use [mapping capabilities](../../develop/integration-artifacts/supporting/data-mapper/mapping-capabilities.md) for field connections, expressions, and custom transformation logic.

1. Define separate record types for the domain value and the channel message. See [Types](../../develop/integration-artifacts/supporting/types.md).
2. Create a [reusable data mapper](../../develop/integration-artifacts/supporting/data-mapper/access-paths/reusable.md) with the domain record as the input and the message record as the output.
3. Open the data mapper canvas and connect matching fields, such as `id` to `orderId`.
4. Use the expression editor for transformed fields, such as combining names or calculating a total. See [Expression editor](../../develop/integration-artifacts/supporting/data-mapper/mapping-capabilities.md#expression-editor).
5. Use [array mappings](../../develop/integration-artifacts/supporting/data-mapper/array-mappings/array-mappings.md) when the mapper must convert item collections.
6. Add a **Map Data** step in the flow and pass the mapped record to the next service, resource function, or connector call.

```ballerina
// docs-fold-start: Supporting definitions
type Customer record {|
    string name;
    string email;
|};

type LineItem record {|
    string sku;
    int quantity;
    decimal unitPrice;
|};

type Order record {|
    string id;
    Customer customer;
    LineItem[] items;
|};

type OrderMessage record {|
    string orderId;
    string customerName;
    string customerEmail;
    decimal total;
    LineItem[] items;
|};
// docs-fold-end

function toMessage(Order order) returns OrderMessage {
    return {
        orderId: order.id,
        customerName: order.customer.name,
        customerEmail: order.customer.email,
        total: from var {unitPrice, quantity} in order.items
            let decimal itemTotal = unitPrice * <decimal>quantity
            collect sum(itemTotal),
        items: order.items
    };
}

function toDomain(OrderMessage message) returns Order {
    return {
        id: message.orderId,
        customer: {
            name: message.customerName,
            email: message.customerEmail
        },
        items: message.items
    };
}
```

## Data-format boundary mapping

Use data-format boundary mapping when the channel sends or receives raw JSON, XML, CSV, or another serialized format. Keep parsing and serialization at the boundary, then call the typed mapper so the main flow works with records instead of raw payloads. For JSON payloads, use [type-safe JSON conversion](../../develop/transform/json.md#convert-a-json-value-to-a-typed-record). For XML and CSV payloads, use the corresponding [XML processing](../../develop/transform/xml.md) or [CSV and flat file processing](../../develop/transform/csv-flat-file.md) guide.

1. Define the message record type that matches the incoming raw payload.
2. For a JSON boundary, add a **Call Function** step for `jsondata:parseAsType` and set the result type to the message record.
3. Add a **Map Data** step that converts the message record into the domain record.
4. Add the domain processing steps after the mapper.
5. Before sending a raw response or outbound message, map the domain record back to the channel message record.
6. Add a **Call Function** step for `jsondata:toJson` only when the outbound endpoint requires a raw JSON payload.

```ballerina
import ballerina/data.jsondata;

// docs-fold-start: Supporting definitions
type Customer record {|
    string name;
    string email;
|};

type LineItem record {|
    string sku;
    int quantity;
    decimal unitPrice;
|};

type Order record {|
    string id;
    Customer customer;
    LineItem[] items;
|};

type OrderMessage record {|
    string orderId;
    string customerName;
    string customerEmail;
    decimal total;
    LineItem[] items;
|};

function toMessage(Order order) returns OrderMessage {
    return {
        orderId: order.id,
        customerName: order.customer.name,
        customerEmail: order.customer.email,
        total: from var {unitPrice, quantity} in order.items
            let decimal itemTotal = unitPrice * <decimal>quantity
            collect sum(itemTotal),
        items: order.items
    };
}

function toDomain(OrderMessage message) returns Order {
    return {
        id: message.orderId,
        customer: {
            name: message.customerName,
            email: message.customerEmail
        },
        items: message.items
    };
}
// docs-fold-end

function readIncoming(json payload) returns Order|error {
    OrderMessage message = check jsondata:parseAsType(payload);
    return toDomain(message);
}

function writeOutgoing(Order order) returns json {
    OrderMessage message = toMessage(order);
    return jsondata:toJson(message);
}
```
