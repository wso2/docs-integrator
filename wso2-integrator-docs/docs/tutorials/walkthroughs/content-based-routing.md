---
sidebar_position: 1
title: "Route Messages Based on Content"
description: "End-to-end walkthrough: Build a content-based message routing service that directs requests to different backends based on payload data."
---

# Route Messages Based on Content

Build a message routing service that inspects incoming requests and forwards them to the appropriate backend system based on the message content. This is one of the most common integration patterns and forms the backbone of many enterprise architectures.

## What You'll Build

An order processing API that receives orders and routes them to different fulfillment services based on the order type (physical goods, digital downloads, or subscriptions). Each backend handles its specific domain while the router acts as a single entry point.

## What You'll Learn

- Inspecting JSON payloads to make routing decisions
- Calling different backend services conditionally
- Handling fallback/default routes
- Error handling for unavailable backends
- Testing with multiple routing paths

## Prerequisites

- WSO2 Integrator VS Code extension installed
- Basic familiarity with Ballerina syntax
- Three mock backend services (we will create these as part of the tutorial)

**Time estimate:** 30--45 minutes

## Architecture

```
                        ┌──────────────────┐
                        │  Physical Goods  │
                        │    Service       │
                        └────────▲─────────┘
                                 │
┌─────────┐    ┌────────────┐    │    ┌──────────────────┐
│  Client  ├───►  Order     ├────┼───►│  Digital Download │
│          │    │  Router    │    │    │    Service        │
└─────────┘    └────────────┘    │    └──────────────────┘
                                 │
                        ┌────────▼─────────┐
                        │  Subscription    │
                        │    Service       │
                        └──────────────────┘
```

## Step 1: Create the Project

Open VS Code and create a new integration project:

```bash
bal new order_router
cd order_router
```

Add dependencies to `Ballerina.toml`:

```toml
[package]
org = "myorg"
name = "order_router"
version = "0.1.0"
```

## Step 2: Define the Data Types

Create the order types that your router will handle:

```ballerina
// types.bal

type Order record {|
    string orderId;
    string orderType;     // "physical", "digital", or "subscription"
    string customerId;
    OrderItem[] items;
    decimal totalAmount;
|};

type OrderItem record {|
    string productId;
    string name;
    int quantity;
    decimal price;
|};

type FulfillmentResponse record {|
    string orderId;
    string status;
    string handler;
    string estimatedDelivery?;
    string downloadUrl?;
|};
```

## Step 3: Build the Router Service

Create the main routing logic:

```ballerina
// main.bal
import ballerina/http;
import ballerina/log;

configurable string physicalServiceUrl = "http://localhost:8091";
configurable string digitalServiceUrl = "http://localhost:8092";
configurable string subscriptionServiceUrl = "http://localhost:8093";

final http:Client physicalClient = check new (physicalServiceUrl);
final http:Client digitalClient = check new (digitalServiceUrl);
final http:Client subscriptionClient = check new (subscriptionServiceUrl);

service /orders on new http:Listener(8090) {

    resource function post route(Order order) returns FulfillmentResponse|http:BadRequest|error {
        log:printInfo("Routing order", orderId = order.orderId, orderType = order.orderType);

        match order.orderType {
            "physical" => {
                FulfillmentResponse result = check physicalClient->post("/fulfill", order);
                log:printInfo("Routed to physical fulfillment", orderId = order.orderId);
                return result;
            }
            "digital" => {
                FulfillmentResponse result = check digitalClient->post("/fulfill", order);
                log:printInfo("Routed to digital fulfillment", orderId = order.orderId);
                return result;
            }
            "subscription" => {
                FulfillmentResponse result = check subscriptionClient->post("/fulfill", order);
                log:printInfo("Routed to subscription service", orderId = order.orderId);
                return result;
            }
            _ => {
                log:printWarn("Unknown order type", orderType = order.orderType);
                return <http:BadRequest>{
                    body: {message: string `Unknown order type: ${order.orderType}`}
                };
            }
        }
    }
}
```

## Step 4: Create Mock Backend Services

For testing, create simple mock backends:

```ballerina
// mock_backends.bal
import ballerina/http;

// Physical goods fulfillment service
service /fulfill on new http:Listener(8091) {
    resource function post .(Order order) returns FulfillmentResponse {
        return {
            orderId: order.orderId,
            status: "processing",
            handler: "physical-warehouse",
            estimatedDelivery: "2025-02-15"
        };
    }
}

// Digital download service
service /fulfill on new http:Listener(8092) {
    resource function post .(Order order) returns FulfillmentResponse {
        return {
            orderId: order.orderId,
            status: "ready",
            handler: "digital-cdn",
            downloadUrl: string `https://downloads.example.com/${order.orderId}`
        };
    }
}

// Subscription service
service /fulfill on new http:Listener(8093) {
    resource function post .(Order order) returns FulfillmentResponse {
        return {
            orderId: order.orderId,
            status: "activated",
            handler: "subscription-manager"
        };
    }
}
```

## Step 5: Add Error Handling

Enhance the router with proper error handling for unavailable backends:

```ballerina
resource function post route(Order order) returns FulfillmentResponse|http:BadRequest|http:ServiceUnavailable|error {
    FulfillmentResponse|error result;

    match order.orderType {
        "physical" => {
            result = physicalClient->post("/fulfill", order);
        }
        "digital" => {
            result = digitalClient->post("/fulfill", order);
        }
        "subscription" => {
            result = subscriptionClient->post("/fulfill", order);
        }
        _ => {
            return <http:BadRequest>{
                body: {message: string `Unknown order type: ${order.orderType}`}
            };
        }
    }

    if result is error {
        log:printError("Backend service unavailable",
            orderId = order.orderId,
            orderType = order.orderType,
            'error = result
        );
        return <http:ServiceUnavailable>{
            body: {message: "Fulfillment service temporarily unavailable. Please retry."}
        };
    }

    return result;
}
```

## Step 6: Test It

Run the project:

```bash
bal run
```

Test with different order types:

```bash
# Route to physical fulfillment
curl -X POST http://localhost:8090/orders/route \
  -H "Content-Type: application/json" \
  -d '{
    "orderId": "ORD-001",
    "orderType": "physical",
    "customerId": "CUST-100",
    "items": [{"productId": "P1", "name": "Laptop Stand", "quantity": 1, "price": 49.99}],
    "totalAmount": 49.99
  }'

# Route to digital download
curl -X POST http://localhost:8090/orders/route \
  -H "Content-Type: application/json" \
  -d '{
    "orderId": "ORD-002",
    "orderType": "digital",
    "customerId": "CUST-101",
    "items": [{"productId": "D1", "name": "E-Book", "quantity": 1, "price": 14.99}],
    "totalAmount": 14.99
  }'

# Test unknown order type
curl -X POST http://localhost:8090/orders/route \
  -H "Content-Type: application/json" \
  -d '{
    "orderId": "ORD-003",
    "orderType": "unknown",
    "customerId": "CUST-102",
    "items": [],
    "totalAmount": 0
  }'
```

## Extend It

- **Add routing rules from configuration** -- Load routing rules from a database or config file instead of hard-coding
- **Add message enrichment** -- Enrich the order with customer data before routing
- **Add audit logging** -- Log all routing decisions to a database for compliance
- **Add header-based routing** -- Route based on HTTP headers in addition to payload content

## What's Next

- [Content-Based Router Pattern](../patterns/content-based-router.md) -- The underlying EIP pattern
- [Data Transformation Pipeline](data-transformation-pipeline.md) -- Transform data between systems
- [Scatter-Gather Pattern](../patterns/scatter-gather.md) -- Send to multiple backends simultaneously
