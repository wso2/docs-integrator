---
sidebar_position: 5
title: gRPC Tool
description: Generate Ballerina service stubs and client connectors from Protocol Buffer definitions.
---

# gRPC Tool

The `bal grpc` tool generates Ballerina code from Protocol Buffer (`.proto`) files. It creates service stubs with RPC method signatures, client connectors for calling gRPC services, and Ballerina record types that correspond to protobuf message definitions. This lets you integrate with gRPC-based microservices using idiomatic Ballerina code.

## Prerequisites

The gRPC tool is included with the Ballerina distribution:

```bash
bal grpc --help
```

## Generating Code from a Proto File

### Basic Usage

```bash
# Generate both service stub and client
bal grpc --input order_service.proto

# Generate service stub only
bal grpc --input order_service.proto --mode service

# Generate client only
bal grpc --input order_service.proto --mode client

# Specify output directory
bal grpc --input order_service.proto --output generated/
```

### Example Proto File

```protobuf
syntax = "proto3";

package orders;

service OrderService {
    rpc GetOrder (GetOrderRequest) returns (Order);
    rpc CreateOrder (CreateOrderRequest) returns (Order);
    rpc ListOrders (ListOrdersRequest) returns (stream Order);
    rpc StreamUpdates (stream OrderUpdate) returns (stream OrderStatus);
}

message GetOrderRequest {
    string order_id = 1;
}

message CreateOrderRequest {
    string customer_id = 1;
    repeated LineItem items = 2;
}

message LineItem {
    string product_id = 1;
    int32 quantity = 2;
    double unit_price = 3;
}

message Order {
    string id = 1;
    string customer_id = 2;
    repeated LineItem items = 3;
    double total = 4;
    OrderStatus status = 5;
}

message OrderUpdate {
    string order_id = 1;
    OrderStatus new_status = 2;
}

enum OrderStatus {
    PENDING = 0;
    CONFIRMED = 1;
    SHIPPED = 2;
    DELIVERED = 3;
    CANCELLED = 4;
}

message ListOrdersRequest {
    string customer_id = 1;
    int32 limit = 2;
}
```

### Generated Files

The tool produces:

```
generated/
├── order_service_pb.bal          # Message types (records)
├── order_service_service.bal     # Service stub
└── order_service_client.bal      # Client connector
```

## Generated Service Stub

The service stub provides empty RPC method implementations that you fill in with your logic:

```ballerina
import ballerina/grpc;

listener grpc:Listener ep = new (9090);

@grpc:Descriptor {value: ORDER_SERVICE_DESC}
service "OrderService" on ep {

    remote function GetOrder(GetOrderRequest request) returns Order|error {
        // TODO: Implement
    }

    remote function CreateOrder(CreateOrderRequest request) returns Order|error {
        // TODO: Implement
    }

    // Server streaming -- returns a stream of orders
    remote function ListOrders(ListOrdersRequest request)
            returns stream<Order, error?>|error {
        // TODO: Implement
    }

    // Bidirectional streaming
    remote function StreamUpdates(stream<OrderUpdate, error?> clientStream)
            returns stream<OrderStatus, error?>|error {
        // TODO: Implement
    }
}
```

## Generated Client

The client provides type-safe methods for each RPC operation:

```ballerina
import ballerina/grpc;

public isolated client class OrderServiceClient {
    *grpc:AbstractClientEndpoint;

    public isolated function init(string url, *grpc:ClientConfiguration config)
            returns grpc:Error? {
        // ...
    }

    remote function GetOrder(GetOrderRequest request)
            returns Order|grpc:Error { ... }

    remote function CreateOrder(CreateOrderRequest request)
            returns Order|grpc:Error { ... }

    remote function ListOrders(ListOrdersRequest request)
            returns stream<Order, grpc:Error?>|grpc:Error { ... }

    remote function StreamUpdates()
            returns StreamUpdatesStreamingClient|grpc:Error { ... }
}
```

## Using the Generated Client

### Unary RPC

```ballerina
configurable string orderServiceUrl = ?;

final OrderServiceClient orderClient = check new (orderServiceUrl);

function getOrder(string orderId) returns Order|error {
    GetOrderRequest request = {order_id: orderId};
    return check orderClient->GetOrder(request);
}

function createOrder(string customerId, LineItem[] items) returns Order|error {
    CreateOrderRequest request = {
        customer_id: customerId,
        items: items
    };
    return check orderClient->CreateOrder(request);
}
```

### Server Streaming

```ballerina
function listCustomerOrders(string customerId) returns Order[]|error {
    ListOrdersRequest request = {customer_id: customerId, 'limit: 50};
    stream<Order, error?> orderStream = check orderClient->ListOrders(request);

    Order[] orders = [];
    check orderStream.forEach(function(Order 'order) {
        orders.push('order);
    });
    return orders;
}
```

### Bidirectional Streaming

```ballerina
function streamOrderUpdates(OrderUpdate[] updates) returns OrderStatus[]|error {
    StreamUpdatesStreamingClient streamClient = check orderClient->StreamUpdates();

    // Send updates
    foreach OrderUpdate update in updates {
        check streamClient->sendOrderUpdate(update);
    }
    check streamClient->complete();

    // Receive responses
    OrderStatus[] statuses = [];
    OrderStatus|error? response = streamClient->receiveOrderStatus();
    while response is OrderStatus {
        statuses.push(response);
        response = streamClient->receiveOrderStatus();
    }
    return statuses;
}
```

## Implementing the Service

Fill in the generated service stub with your integration logic:

```ballerina
import ballerina/grpc;
import ballerinax/mysql;
import ballerina/log;

configurable string dbHost = ?;
configurable string dbUser = ?;
configurable string dbPassword = ?;

final mysql:Client db = check new (host = dbHost, user = dbUser,
    password = dbPassword, database = "orders");

@grpc:Descriptor {value: ORDER_SERVICE_DESC}
service "OrderService" on new grpc:Listener(9090) {

    remote function GetOrder(GetOrderRequest request) returns Order|error {
        return db->queryRow(
            `SELECT id, customer_id, total, status FROM orders
             WHERE id = ${request.order_id}`
        );
    }

    remote function CreateOrder(CreateOrderRequest request) returns Order|error {
        decimal total = 0d;
        foreach LineItem item in request.items {
            total += <decimal>item.unit_price * <decimal>item.quantity;
        }

        sql:ExecutionResult result = check db->execute(
            `INSERT INTO orders (customer_id, total, status)
             VALUES (${request.customer_id}, ${total}, 'PENDING')`
        );

        string orderId = (<int>result.lastInsertId).toString();
        log:printInfo("Order created", orderId = orderId);

        return {
            id: orderId,
            customer_id: request.customer_id,
            items: request.items,
            total: <float>total,
            status: PENDING
        };
    }
}
```

## Proto Import Paths

For proto files that import other proto files, specify the import paths:

```bash
# Include directory for proto imports
bal grpc --input order_service.proto --proto_path ./protos/ --proto_path ./third_party/
```

## Command Reference

| Command | Description |
|---|---|
| `bal grpc --input <file.proto>` | Generate service and client |
| `--mode service` | Generate service stub only |
| `--mode client` | Generate client only |
| `--output <dir>` | Output directory |
| `--proto_path <dir>` | Additional proto import paths |

## What's Next

- [OpenAPI Tool](openapi-tool.md) -- Generate REST services and clients
- [WSDL Tool](wsdl-tool.md) -- Generate SOAP clients from WSDL files
- [Error Handling](/docs/develop/design-logic/error-handling) -- Handle gRPC errors and deadlines
