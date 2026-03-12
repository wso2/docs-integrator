---
sidebar_position: 4
title: "Event-Driven Microservices with Kafka"
description: "Sample project: Build event-driven microservices with Kafka — order service, inventory service, and notification service using Ballerina."
---

# Event-Driven Microservices with Kafka

Build a set of loosely coupled microservices that communicate through Apache Kafka events. This sample project implements three services -- an Order Service that accepts HTTP orders, an Inventory Service that reserves stock, and a Notification Service that sends order confirmations -- all coordinated through Kafka topics.

## What You'll Learn

- Designing event-driven architectures with Kafka topics as communication channels
- Building Ballerina HTTP services that produce Kafka events
- Creating Kafka consumer services that process events asynchronously
- Implementing the choreography-based saga pattern for distributed transactions
- Structured logging and error handling across multiple services

## Prerequisites

- WSO2 Integrator VS Code extension installed
- Apache Kafka cluster running locally or remotely (Docker Compose config included)
- SMTP email credentials for the notification service (optional, logs notifications by default)

**Time estimate:** 15-20 minutes to clone and run; 45-60 minutes for full code walkthrough

## Clone and Run

```bash
# Clone the samples repository
git clone https://github.com/wso2/integrator-samples.git
cd integrator-samples/event-driven-microservices

# Start Kafka using the included Docker Compose file
docker-compose up -d

# Copy and edit the configuration file
cp Config-example.toml Config.toml
# Edit Config.toml with your settings

# Run all three services
bal run
```

### Testing the Flow

```bash
# Place an order
curl -X POST http://localhost:9090/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customerId": "C001",
    "customerEmail": "customer@example.com",
    "items": [
      {"productId": "P100", "quantity": 2, "unitPrice": 29.99},
      {"productId": "P200", "quantity": 1, "unitPrice": 49.99}
    ]
  }'

# Check order status
curl http://localhost:9090/orders/ORD-001
```

## Project Structure

```
event-driven-microservices/
├── Ballerina.toml
├── Config.toml
├── Config-example.toml
├── docker-compose.yml
├── order_service.bal
├── inventory_service.bal
├── notification_service.bal
├── types.bal
└── tests/
    └── integration_test.bal
```

## Code Walkthrough

### Shared Data Types

The `types.bal` file defines the event schemas shared across all services:

```ballerina
// Order placed by the customer via HTTP
type OrderRequest record {|
    string customerId;
    string customerEmail;
    OrderItem[] items;
|};

type OrderItem record {|
    string productId;
    int quantity;
    decimal unitPrice;
|};

// Events exchanged via Kafka topics
type OrderPlacedEvent record {|
    string orderId;
    string customerId;
    string customerEmail;
    OrderItem[] items;
    decimal totalAmount;
    string timestamp;
|};

type InventoryReservedEvent record {|
    string orderId;
    boolean success;
    string? failureReason;
    ReservedItem[] reservedItems;
|};

type ReservedItem record {|
    string productId;
    int quantity;
    boolean available;
|};

type OrderConfirmedEvent record {|
    string orderId;
    string customerId;
    string customerEmail;
    decimal totalAmount;
    string status;
|};

// Order status tracked by the order service
type Order record {|
    string orderId;
    string customerId;
    string customerEmail;
    OrderItem[] items;
    decimal totalAmount;
    string status;
    string createdAt;
|};
```

### Order Service (HTTP Producer)

The Order Service exposes an HTTP API, creates orders, and publishes `OrderPlacedEvent` messages to Kafka:

```ballerina
import ballerina/http;
import ballerinax/kafka;
import ballerina/uuid;
import ballerina/time;
import ballerina/log;

configurable string kafkaBootstrapServers = ?;
configurable int orderServicePort = 9090;

final kafka:Producer orderProducer = check new (kafkaBootstrapServers);

// In-memory order store (replace with a database in production)
map<Order> orders = {};

service /orders on new http:Listener(orderServicePort) {

    // Place a new order
    resource function post .(OrderRequest request) returns Order|error {
        string orderId = "ORD-" + uuid:createRandomUuid().substring(0, 8);
        decimal totalAmount = from OrderItem item in request.items
            collect sum(item.unitPrice * <decimal>item.quantity);

        Order 'order = {
            orderId: orderId,
            customerId: request.customerId,
            customerEmail: request.customerEmail,
            items: request.items,
            totalAmount: totalAmount,
            status: "PLACED",
            createdAt: time:utcToString(time:utcNow())
        };

        orders[orderId] = 'order;

        // Publish the OrderPlacedEvent to Kafka
        OrderPlacedEvent event = {
            orderId: orderId,
            customerId: request.customerId,
            customerEmail: request.customerEmail,
            items: request.items,
            totalAmount: totalAmount,
            timestamp: 'order.createdAt
        };

        check orderProducer->send({
            topic: "order-placed",
            value: event.toJsonString().toBytes()
        });

        log:printInfo("Order placed and event published", orderId = orderId);
        return 'order;
    }

    // Get order status
    resource function get [string orderId]() returns Order|http:NotFound {
        Order? 'order = orders[orderId];
        return 'order is Order ? 'order : http:NOT_FOUND;
    }
}
```

### Inventory Service (Kafka Consumer and Producer)

The Inventory Service consumes `OrderPlacedEvent` messages, checks stock availability, reserves inventory, and publishes an `InventoryReservedEvent`:

```ballerina
import ballerinax/kafka;
import ballerina/log;

configurable string kafkaBootstrapServers = ?;

final kafka:Producer inventoryProducer = check new (kafkaBootstrapServers);

// Simulated inventory (replace with a database in production)
map<int> inventory = {
    "P100": 50,
    "P200": 30,
    "P300": 10
};

listener kafka:Listener inventoryListener = new (kafkaBootstrapServers, {
    groupId: "inventory-service",
    topics: "order-placed",
    pollingInterval: 1
});

service on inventoryListener {
    remote function onConsumerRecord(kafka:Caller caller,
                                     kafka:ConsumerRecord[] records) returns error? {
        foreach kafka:ConsumerRecord rec in records {
            string jsonStr = check string:fromBytes(rec.value);
            OrderPlacedEvent event = check jsonStr.fromJsonString().cloneWithType();

            log:printInfo("Processing inventory for order", orderId = event.orderId);

            ReservedItem[] reservedItems = [];
            boolean allAvailable = true;
            string? failureReason = ();

            foreach OrderItem item in event.items {
                int? currentStock = inventory[item.productId];
                boolean available = currentStock is int && currentStock >= item.quantity;

                if available {
                    inventory[item.productId] = <int>currentStock - item.quantity;
                } else {
                    allAvailable = false;
                    failureReason = string `Insufficient stock for product ${item.productId}`;
                }

                reservedItems.push({
                    productId: item.productId,
                    quantity: item.quantity,
                    available: available
                });
            }

            InventoryReservedEvent reservedEvent = {
                orderId: event.orderId,
                success: allAvailable,
                failureReason: failureReason,
                reservedItems: reservedItems
            };

            check inventoryProducer->send({
                topic: "inventory-reserved",
                value: reservedEvent.toJsonString().toBytes()
            });

            log:printInfo("Inventory reservation completed",
                orderId = event.orderId,
                success = allAvailable);
        }

        check caller->commit();
    }
}
```

### Notification Service (Kafka Consumer)

The Notification Service consumes `InventoryReservedEvent` messages and sends order confirmation or failure notifications:

```ballerina
import ballerinax/kafka;
import ballerina/email;
import ballerina/log;

configurable string kafkaBootstrapServers = ?;
configurable string smtpHost = "smtp.gmail.com";
configurable int smtpPort = 465;
configurable string smtpUsername = ?;
configurable string smtpPassword = ?;

final email:SmtpClient? smtpClient = initSmtpClient();

function initSmtpClient() returns email:SmtpClient? {
    email:SmtpClient|error client = new (smtpHost, smtpUsername, smtpPassword, port = smtpPort);
    if client is error {
        log:printWarn("SMTP not configured, notifications will be logged only");
        return ();
    }
    return client;
}

listener kafka:Listener notificationListener = new (kafkaBootstrapServers, {
    groupId: "notification-service",
    topics: "inventory-reserved",
    pollingInterval: 1
});

service on notificationListener {
    remote function onConsumerRecord(kafka:Caller caller,
                                     kafka:ConsumerRecord[] records) returns error? {
        foreach kafka:ConsumerRecord rec in records {
            string jsonStr = check string:fromBytes(rec.value);
            InventoryReservedEvent event = check jsonStr.fromJsonString().cloneWithType();

            if event.success {
                log:printInfo("Sending order confirmation",
                    orderId = event.orderId);
                check sendConfirmationNotification(event);
            } else {
                log:printInfo("Sending order failure notification",
                    orderId = event.orderId,
                    reason = event.failureReason ?: "Unknown");
                check sendFailureNotification(event);
            }
        }

        check caller->commit();
    }
}

function sendConfirmationNotification(InventoryReservedEvent event) returns error? {
    string subject = string `Order ${event.orderId} Confirmed`;
    string body = string `Your order ${event.orderId} has been confirmed.
        All items are in stock and will be shipped soon.`;

    if smtpClient is email:SmtpClient {
        check (<email:SmtpClient>smtpClient)->sendMessage({
            to: smtpUsername, // In production, look up the customer email
            subject: subject,
            htmlBody: body
        });
    }

    log:printInfo("Order confirmation sent", orderId = event.orderId);
}

function sendFailureNotification(InventoryReservedEvent event) returns error? {
    string subject = string `Order ${event.orderId} - Stock Issue`;
    string body = string `We are sorry, but your order ${event.orderId} could not be fully fulfilled.
        Reason: ${event.failureReason ?: "Insufficient stock"}`;

    if smtpClient is email:SmtpClient {
        check (<email:SmtpClient>smtpClient)->sendMessage({
            to: smtpUsername,
            subject: subject,
            htmlBody: body
        });
    }

    log:printWarn("Order failure notification sent",
        orderId = event.orderId,
        reason = event.failureReason ?: "Unknown");
}
```

### Key Points

- **Choreography pattern**: Each service reacts to events independently without a central orchestrator. The Order Service publishes events, the Inventory Service processes them, and the Notification Service reacts to the result.
- **Loose coupling**: Services communicate only through Kafka topics. Adding a new service (e.g., a shipping service) requires no changes to existing services -- just subscribe to the relevant topic.
- **At-least-once delivery**: Manual Kafka offset commits ensure that events are not lost, even if a service crashes mid-processing.
- **Graceful degradation**: The Notification Service works with or without SMTP configured, falling back to log-based notifications.

## What's Next

- [Data Service with bal persist](data-service-persist.md) -- Build a full CRUD data service
- [RESTful API with Data Mapper](restful-api-data-mapper.md) -- Use the visual data mapper for transformations
- [Kafka Event Processing Pipeline](../kafka-event-pipeline.md) -- End-to-end Kafka walkthrough
- [Connectors Reference](../../connectors/index.md) -- Explore all available connectors
