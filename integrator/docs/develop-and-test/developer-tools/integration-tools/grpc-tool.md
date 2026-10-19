---
title: gRPC Tool
---

# gRPC Tool

The `bal grpc` tool generates Ballerina code from Protocol Buffer (`.proto`) files. It creates service stubs with RPC method signatures, client connectors for calling gRPC services, and Ballerina record types that correspond to protobuf message definitions. This lets you integrate with gRPC-based microservices using idiomatic Ballerina code.

gRPC code generation is not available through the Visual Designer. The **+ Add Artifact** menu does not include a gRPC option. Use the integrated terminal in your project to run `bal grpc` commands directly.

---

## Example proto file

The examples throughout this page use the following proto file:

```protobuf

syntax = "proto3";

package orders;

service OrderService {
    rpc GetOrder (GetOrderRequest) returns (Order);
    rpc CreateOrder (CreateOrderRequest) returns (Order);
    rpc ListOrders (ListOrdersRequest) returns (stream Order);
    rpc UploadOrders (stream CreateOrderRequest) returns (Order);
    rpc StreamUpdates (stream OrderUpdate) returns (stream StatusUpdate);
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

message StatusUpdate {
    string order_id = 1;
    OrderStatus status = 2;
}

message ListOrdersRequest {
    string customer_id = 1;
    int32 limit = 2;
}

enum OrderStatus {
    PENDING = 0;
    CONFIRMED = 1;
    SHIPPED = 2;
    DELIVERED = 3;
    CANCELLED = 4;
}
```

---

## Generating a service stub from a proto file

Use this when you want to **expose** a gRPC service from your integrator project.

The generated service and client file names are derived from the **service name** in the proto file. For `service OrderService` in `order_service.proto`, the tool generates `orderservice_service.bal` and `orderservice_client.bal`.

### Step 1: Place the proto file in your project

Copy your `.proto` file into a `resources/` folder inside your integrator project:

```
my-integration/
├── Ballerina.toml
├── main.bal
└── resources/
    └── order_service.proto
```

### Step 2: Open the terminal at the project root

In the editor, open the integrated terminal (`` Ctrl+` ``) and confirm you are in the project root, the directory that contains `Ballerina.toml`:

```bash
ls Ballerina.toml
```

### Step 3: Run the tool

```bash
bal grpc --input resources/order_service.proto --mode service --output .
```

### Step 4: Verify generated files

The tool places two files in the project root:

```
my-integration/
├── Ballerina.toml
├── main.bal
├── resources/
│   └── order_service.proto
├── order_service_pb.bal          # Message types (records)
└── orderservice_service.bal     # Service stub with empty RPC methods
```

Both files are compiled automatically as part of the project package, with no extra imports or configuration needed.

### Step 5: Implement the service

Open `orderservice_service.bal` and fill in the generated stub methods with your integration logic:

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

    remote function ListOrders(ListOrdersRequest request) returns stream<Order, error?>|error {
        // TODO: Implement
    }

    remote function UploadOrders(stream<CreateOrderRequest, grpc:Error?> clientStream) returns Order|error {
        // TODO: Implement
    }

    remote function StreamUpdates(stream<OrderUpdate, grpc:Error?> clientStream) returns stream<StatusUpdate, error?>|error {
        // TODO: Implement
    }
}

```

---

## Generating a client from a proto file

Use this when you want to **call** an external gRPC service from your integrator project.

### Step 1: Place the proto file in your project

```
my-integration/
├── Ballerina.toml
├── main.bal
└── resources/
    └── order_service.proto
```

### Step 2: Open the terminal at the project root

```bash
ls Ballerina.toml
```

### Step 3: Run the tool

```bash
bal grpc --input resources/order_service.proto --mode client --output .
```

### Step 4: Verify generated files

```
my-integration/
├── Ballerina.toml
├── main.bal
├── resources/
│   └── order_service.proto
├── order_service_pb.bal          # Message types (records)
└── orderservice_client.bal      # Type-safe client connector
```

### Step 5: Use the client in your integration

Open the existing `connections.bal` file in your project root and add the client initialisation. This makes the client available as a module-level variable across all flows and artifacts:

```
my-integration/
├── Ballerina.toml
├── main.bal
├── connections.bal                ← open this file
├── resources/
│   └── order_service.proto
├── order_service_pb.bal
└── orderservice_client.bal
```

In `connections.bal`:

```ballerina
configurable string orderServiceUrl = ?;

final OrderServiceClient orderClient = check new (orderServiceUrl);
```

Add the service URL to your `Config.toml`:

```toml
orderServiceUrl = "http://localhost:9090"
```

**Unary RPC:**

```ballerina
function getOrder(string orderId) returns Order|error {
    return check orderClient->GetOrder({order_id: orderId});
}

function createOrder(string customerId, LineItem[] items) returns Order|error {
    return check orderClient->CreateOrder({
        customer_id: customerId,
        items: items
    });
}
```

**Server streaming:**

```ballerina
function listCustomerOrders(string customerId) returns Order[]|error {
    stream<Order, error?> orderStream = check orderClient->ListOrders(
        {customer_id: customerId, 'limit: 50}
    );
    Order[] orders = [];
    check orderStream.forEach(function(Order 'order) {
        orders.push('order);
    });
    return orders;
}
```

**Bidirectional streaming:**

```ballerina
function streamOrderUpdates(OrderUpdate[] updates) returns StatusUpdate[]|error {
    StreamUpdatesStreamingClient streamClient = check orderClient->StreamUpdates();
    foreach OrderUpdate update in updates {
        check streamClient->sendOrderUpdate(update);
    }
    check streamClient->complete();

    StatusUpdate[] statuses = [];
    StatusUpdate|grpc:Error? response = streamClient->receiveStatusUpdate();
    while response is StatusUpdate {
        statuses.push(response);
        response = streamClient->receiveStatusUpdate();
    }
    if response is grpc:Error {
        return response;
    }
    return statuses;
}
```

---

## Generating only the stub file

Omit `--mode` to generate only the stub file:

```bash
bal grpc --input resources/order_service.proto --output .
```

This produces only the `order_service_pb.bal` file (message types and the descriptor constant). No service or client file is generated.

---

## Proto import paths

If your proto file imports other proto files, use `--proto-path` to tell the tool where to resolve them. The directory you pass must contain the input `.proto` file, and imports are resolved relative to it:

```bash
bal grpc --input resources/order_service.proto \
  --proto-path resources \
  --output .
```

The flag is spelled `--proto-path` (with a hyphen); `--proto_path` is rejected. Pass the directory without a leading `./` or trailing `/`, and make sure it encompasses the input file, otherwise the tool fails with `Input .proto file does not reside within the path specified using --proto-path`.

---

## Regenerating after proto changes

Re-run the same command whenever the `.proto` file changes. The generated files are overwritten automatically.

> Do not edit `order_service_pb.bal` directly. It is always overwritten on regeneration. Put all custom logic in separate files.

---

## Command reference

```bash
bal grpc --input <proto-file> [options]
```

| Flag | Alias | Required | Default | Description |
|------|-------|----------|---------|-------------|
| `--input` | — | Yes | — | Path to a `.proto` file, or a directory containing multiple `.proto` files |
| `--output` | — | No | Directory named after the proto `package` (or `temp` if no package is declared) | Output directory for generated files |
| `--mode` | — | No | — | `client` or `service` to also generate sample code. If omitted, only the stub file (`*_pb.bal`) is generated |
| `--proto-path` | — | No | — | Directory used to resolve `import` statements. It must contain the input `.proto` file |

## Protobuf to Ballerina type mapping

| Protobuf type | Ballerina type |
|---|---|
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
| `map<K, V>` | `map` |
| `oneof` | Union type |
| `google.protobuf.Any` | `anydata` |
| `google.protobuf.Timestamp` | `time:Utc` |
| `google.protobuf.Duration` | `decimal` |
| `google.protobuf.Struct` | `map<anydata>` |

## gRPC communication patterns

| Pattern | Proto definition | Ballerina signature |
|---|---|---|
| Unary | `rpc Method(Req) returns (Res)` | `remote function Method(Req) returns Res\|error` |
| Server streaming | `rpc Method(Req) returns (stream Res)` | `remote function Method(Req) returns stream<Res, error?>\|error` |
| Client streaming | `rpc Method(stream Req) returns (Res)` | `remote function Method(stream<Req, error?>) returns Res\|error` |
| Bidirectional | `rpc Method(stream Req) returns (stream Res)` | `remote function Method(stream<Req, error?>) returns stream<Res, error?>\|error` |

## What's next

- [OpenAPI Tool](openapi-tool.md) — Generate REST services and clients
- [WSDL Tool](wsdl-tool.md) — Generate SOAP clients from WSDL files
- [Error Handling](../../../editor/canvases/flow-canvas/node-palette.md#error-handling) — Handle gRPC errors and deadlines
