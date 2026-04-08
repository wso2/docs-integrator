---
sidebar_position: 5
title: bal grpc CLI
description: Reference for the bal grpc CLI tool — generate Ballerina service skeletons and client stubs from Protocol Buffer (.proto) files.
---

# bal grpc CLI

The `bal grpc` tool generates Ballerina source code from Protocol Buffer (`.proto`) definition files. It produces service skeletons, client stubs, and message type definitions that enable type-safe gRPC communication with support for all four gRPC communication patterns: unary, server streaming, client streaming, and bidirectional streaming.

## Syntax

```bash
bal grpc --input <proto-file> [options]
```

## Flags

| Flag | Alias | Required | Default | Description |
|------|-------|----------|---------|-------------|
| `--input` | `-i` | Yes | — | Path to the `.proto` file |
| `--output` | `-o` | No | Current directory | Output directory for generated files |
| `--mode` | — | No | Both | Generation mode: `client`, `service`, or omit for both |
| `--proto-path` | — | No | — | Path to a directory containing imported `.proto` files |

## Proto File Example

```protobuf
// order_service.proto
syntax = "proto3";

package ecommerce;

service OrderService {
    // Unary RPC
    rpc GetOrder (OrderRequest) returns (Order);

    // Server streaming RPC
    rpc ListOrders (OrderFilter) returns (stream Order);

    // Client streaming RPC
    rpc BatchCreateOrders (stream Order) returns (BatchResult);

    // Bidirectional streaming RPC
    rpc OrderChat (stream OrderUpdate) returns (stream OrderStatus);
}

message OrderRequest {
    string order_id = 1;
}

message Order {
    string id = 1;
    string customer_name = 2;
    repeated OrderItem items = 3;
    double total = 4;
}

message OrderItem {
    string product_id = 1;
    string name = 2;
    int32 quantity = 3;
    double price = 4;
}

message OrderFilter {
    string customer_name = 1;
    string status = 2;
}

message BatchResult {
    int32 created_count = 1;
    repeated string order_ids = 2;
}

message OrderUpdate {
    string order_id = 1;
    string status = 2;
}

message OrderStatus {
    string order_id = 1;
    string status = 2;
    string timestamp = 3;
}
```

## Generate Both Client and Service

```bash
# Generate client and service stubs
bal grpc --input order_service.proto

# Generate to a specific directory
bal grpc --input order_service.proto --output src/

# With import path for dependent proto files
bal grpc --input order_service.proto --proto-path ./protos/
```

### Generated Files

```
order_service_pb.bal              # Message type definitions
OrderService_service.bal          # Service skeleton
OrderService_client.bal           # Client stub
```

## Generate Client Only

```bash
bal grpc --input order_service.proto --mode client
```

### Generated Client Usage

```ballerina
import ballerina/grpc;

public function main() returns error? {
    // Create client
    OrderServiceClient ep = check new ("http://localhost:9090");

    // Unary call
    Order order = check ep->GetOrder({order_id: "ORD-001"});

    // Server streaming
    stream<Order, grpc:Error?> orderStream = check ep->ListOrders({
        customer_name: "Jane",
        status: "pending"
    });
    check orderStream.forEach(function(Order o) {
        io:println(o.id, ": ", o.customer_name);
    });

    // Client streaming
    ListOrdersStreamingClient streamClient = check ep->BatchCreateOrders();
    check streamClient->sendOrder({id: "1", customer_name: "Jane", items: [], total: 0.0});
    check streamClient->sendOrder({id: "2", customer_name: "John", items: [], total: 0.0});
    check streamClient->complete();
    BatchResult? result = check streamClient->receiveBatchResult();
}
```

## Generate Service Only

```bash
bal grpc --input order_service.proto --mode service
```

### Generated Service Skeleton

```ballerina
import ballerina/grpc;

listener grpc:Listener ep = new (9090);

@grpc:Descriptor {value: ORDER_SERVICE_DESC}
service "OrderService" on ep {

    remote function GetOrder(OrderRequest request) returns Order|error {
        // TODO: Implement
    }

    remote function ListOrders(OrderFilter request)
            returns stream<Order, error?>|error {
        // TODO: Implement
    }

    remote function BatchCreateOrders(stream<Order, error?> clientStream)
            returns BatchResult|error {
        // TODO: Implement
    }

    remote function OrderChat(stream<OrderUpdate, error?> clientStream)
            returns stream<OrderStatus, error?>|error {
        // TODO: Implement
    }
}
```

## Protobuf to Ballerina Type Mapping

| Protobuf Type | Ballerina Type |
|--------------|----------------|
| `double` | `float` |
| `float` | `float` |
| `int32`, `sint32`, `sfixed32` | `int` |
| `int64`, `sint64`, `sfixed64` | `int` |
| `uint32`, `fixed32` | `int` |
| `uint64`, `fixed64` | `int` |
| `bool` | `boolean` |
| `string` | `string` |
| `bytes` | `byte[]` |
| `enum` | `enum` |
| `message` | `record {}` |
| `repeated T` | `T[]` |
| `map<K, V>` | `map<V>` |
| `oneof` | Union type |
| `google.protobuf.Any` | `anydata` |
| `google.protobuf.Timestamp` | `time:Utc` |
| `google.protobuf.Duration` | `decimal` |
| `google.protobuf.Struct` | `map<anydata>` |

## gRPC Communication Patterns

| Pattern | Proto Definition | Ballerina Signature |
|---------|-----------------|-------------------|
| Unary | `rpc Method(Req) returns (Res)` | `remote function Method(Req) returns Res\|error` |
| Server streaming | `rpc Method(Req) returns (stream Res)` | `remote function Method(Req) returns stream<Res, error?>\|error` |
| Client streaming | `rpc Method(stream Req) returns (Res)` | `remote function Method(stream<Req, error?>) returns Res\|error` |
| Bidirectional | `rpc Method(stream Req) returns (stream Res)` | `remote function Method(stream<Req, error?>) returns stream<Res, error?>\|error` |

## See Also

- [bal Command Reference](bal-commands.md) -- All bal subcommands
- [Protocols Reference](/docs/reference/protocols) -- Supported protocols including gRPC
- [Ballerina by Example](/docs/reference/by-example) -- Runnable gRPC examples
