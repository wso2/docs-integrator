---
sidebar_position: 4
title: AsyncAPI Tool
description: Generate event-driven Ballerina services from AsyncAPI specifications.
---

# AsyncAPI Tool

The `bal asyncapi` tool generates Ballerina code from AsyncAPI specifications, enabling you to build event-driven integrations that consume and produce messages on Kafka, RabbitMQ, MQTT, WebSocket, and other messaging protocols. The generated code includes listener services, publisher clients, and message types derived from the AsyncAPI schema.

## Prerequisites

The AsyncAPI tool is included with the Ballerina distribution:

```bash
bal asyncapi --help
```

## Generating a Service from an AsyncAPI Spec

### Basic Usage

```bash
# Generate a Ballerina event listener service
bal asyncapi -i asyncapi.yaml --mode service

# Specify output directory
bal asyncapi -i asyncapi.yaml --mode service -o generated/
```

### Example AsyncAPI Specification

```yaml
asyncapi: '2.6.0'
info:
  title: Order Events API
  version: '1.0.0'
channels:
  orders/created:
    subscribe:
      operationId: onOrderCreated
      message:
        payload:
          type: object
          properties:
            orderId:
              type: string
            customerId:
              type: string
            total:
              type: number
            items:
              type: array
              items:
                $ref: '#/components/schemas/LineItem'
  orders/status-changed:
    publish:
      operationId: publishOrderStatusChanged
      message:
        payload:
          $ref: '#/components/schemas/OrderStatusEvent'
components:
  schemas:
    LineItem:
      type: object
      properties:
        productId:
          type: string
        quantity:
          type: integer
        unitPrice:
          type: number
    OrderStatusEvent:
      type: object
      properties:
        orderId:
          type: string
        previousStatus:
          type: string
        newStatus:
          type: string
        timestamp:
          type: string
          format: date-time
```

### Generated Listener Service

The tool generates a Ballerina service that listens for messages on the defined channels:

```ballerina
import ballerinax/kafka;

configurable string bootstrapServers = ?;
configurable string groupId = "order-service";

listener kafka:Listener orderListener = new ({
    bootstrapServers: bootstrapServers,
    groupId: groupId,
    topics: ["orders.created"]
});

service on orderListener {

    remote function onOrderCreated(OrderCreatedEvent event) returns error? {
        // TODO: Implement event handler
    }
}
```

### Generated Publisher

```ballerina
import ballerinax/kafka;

configurable string bootstrapServers = ?;

final kafka:Producer orderProducer = check new ({
    bootstrapServers: bootstrapServers
});

function publishOrderStatusChanged(OrderStatusEvent event) returns error? {
    check orderProducer->send({
        topic: "orders.status-changed",
        value: event.toJsonString()
    });
}
```

### Generated Types

```ballerina
// Auto-generated from AsyncAPI schemas
type OrderCreatedEvent record {|
    string orderId;
    string customerId;
    decimal total;
    LineItem[] items;
|};

type LineItem record {|
    string productId;
    int quantity;
    decimal unitPrice;
|};

type OrderStatusEvent record {|
    string orderId;
    string previousStatus;
    string newStatus;
    string timestamp;
|};
```

## Implementing the Event Handler

After generating the skeleton, implement your event processing logic:

```ballerina
import ballerinax/kafka;
import ballerina/log;
import ballerinax/mysql;

configurable string bootstrapServers = ?;
configurable string dbHost = ?;
configurable string dbUser = ?;
configurable string dbPassword = ?;

final mysql:Client db = check new (host = dbHost, user = dbUser,
    password = dbPassword, database = "orders");

final kafka:Producer statusProducer = check new ({
    bootstrapServers: bootstrapServers
});

listener kafka:Listener orderListener = new ({
    bootstrapServers: bootstrapServers,
    groupId: "order-processor",
    topics: ["orders.created"]
});

service on orderListener {

    remote function onConsumerRecord(kafka:ConsumerRecord[] records) returns error? {
        foreach kafka:ConsumerRecord rec in records {
            string payload = check string:fromBytes(rec.value);
            OrderCreatedEvent event = check payload.fromJsonStringWithType();

            // Process the order
            log:printInfo("Processing order", orderId = event.orderId);
            check persistOrder(event);

            // Publish status change event
            check statusProducer->send({
                topic: "orders.status-changed",
                value: {
                    orderId: event.orderId,
                    previousStatus: "NEW",
                    newStatus: "CONFIRMED",
                    timestamp: time:utcToString(time:utcNow())
                }.toJsonString()
            });
        }
    }
}

function persistOrder(OrderCreatedEvent event) returns error? {
    _ = check db->execute(
        `INSERT INTO orders (id, customer_id, total, status)
         VALUES (${event.orderId}, ${event.customerId}, ${event.total}, 'CONFIRMED')`
    );
}
```

## Exporting an AsyncAPI Spec from Ballerina

Generate an AsyncAPI specification from an existing Ballerina event-driven service:

```bash
# Export AsyncAPI spec
bal asyncapi -i service.bal --mode export

# Export to a specific file
bal asyncapi -i service.bal --mode export -o specs/asyncapi.yaml
```

## Command Reference

| Command | Description |
|---|---|
| `bal asyncapi -i <spec> --mode service` | Generate listener service from spec |
| `bal asyncapi -i <spec> --mode client` | Generate publisher client from spec |
| `bal asyncapi -i <service.bal> --mode export` | Export AsyncAPI from service |
| `-o <dir>` | Output directory |

## What's Next

- [gRPC Tool](grpc-tool.md) -- Generate gRPC services from Protocol Buffer definitions
- [OpenAPI Tool](openapi-tool.md) -- Generate REST services and clients
- [Error Handling](/docs/develop/design-logic/error-handling) -- Handle event processing failures gracefully
