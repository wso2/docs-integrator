---
title: gRPC Service
description: Define services using Protocol Buffers and generate Ballerina code for gRPC.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# gRPC Service

gRPC services use Protocol Buffers (protobuf) to define strongly-typed contracts and support four communication patterns: unary, server streaming, client streaming, and bidirectional streaming. WSO2 Integrator generates Ballerina service stubs from your `.proto` files.

## Creating a gRPC service

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

1. Open the **WSO2 Integrator** sidebar in VS Code.
2. Click **+** next to **Services**.
3. Select **gRPC Service** from the artifact type list.
4. In the creation form, fill in:
   - **Name** — a name for the service.
   - **Port** — the gRPC listener port (default: `9090`).
   - **Proto File** — optionally upload an existing `.proto` file, or start with a blank service.
5. Click **Create**.

<!-- TODO: add screenshot — gRPC service creation form with proto file upload option -->

6. WSO2 Integrator opens the service in the **flow designer**. Each RPC method from the proto definition appears as a separate resource node.
7. Click a resource node to open its implementation canvas.
8. Add integration steps using the action palette — database lookups, HTTP calls, and transformations.
9. To add a new RPC method, click **+ Add RPC** in the service node and choose the communication pattern (unary, server streaming, client streaming, or bidirectional).

<!-- TODO: add screenshot — Flow designer showing gRPC service with RPC method nodes -->

10. Switch to **Code View** to inspect the generated Ballerina service stub and edit the descriptor annotation if needed.

<!-- TODO: add screenshot — Code view of the generated gRPC service -->

</TabItem>
<TabItem value="code" label="Ballerina Code">

```ballerina
import ballerina/grpc;

@grpc:Descriptor {value: ORDER_SERVICE_DESC}
service "OrderService" on new grpc:Listener(9090) {

    // Unary RPC
    remote function getOrder(OrderRequest request) returns Order|error {
        return retrieveOrder(request.orderId);
    }

    // Server streaming RPC
    remote function listOrders(OrderFilter filter) returns stream<Order, error?> {
        return streamOrders(filter);
    }

    // Client streaming RPC
    remote function batchCreateOrders(stream<Order, error?> orders) returns BatchResult|error {
        return processBatch(orders);
    }

    // Bidirectional streaming RPC
    remote function orderChat(stream<OrderMessage, error?> messages)
            returns stream<OrderMessage, error?> {
        return handleChat(messages);
    }
}
```

</TabItem>
</Tabs>

## RPC communication patterns

| Pattern | Description | Use case |
|---|---|---|
| **Unary** | Single request, single response | Standard CRUD operations |
| **Server streaming** | Single request, stream of responses | Large result sets, real-time feeds |
| **Client streaming** | Stream of requests, single response | Bulk uploads, batch inserts |
| **Bidirectional streaming** | Stream of requests and responses | Chat, real-time collaboration |

## Generating code from proto files

WSO2 Integrator uses `bal grpc` to generate service stubs from protobuf definitions.

```bash
# Generate Ballerina service stub from a .proto file
bal grpc --input order_service.proto --output gen/ --mode service
```

This generates:
- `OrderService.bal` — service interface with all RPC methods
- `order_service_pb.bal` — message types and the descriptor constant

## What's next

- [HTTP Service](http-service.md) — expose integration logic over REST
- [Connections](../supporting/connections.md) — configure gRPC client connections
- [Types](../supporting/types.md) — define shared message types
