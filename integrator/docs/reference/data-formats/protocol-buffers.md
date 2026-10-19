---
title: Protocol Buffers
---

# Protocol Buffers

Protocol Buffers (protobuf) support is built into the gRPC module. The `ballerina/protobuf` module (v1.8.0) provides the runtime types for pre-defined protobuf types including `Any`, `Duration`, `Timestamp`, `Struct`, `Empty`, and scalar wrappers. Use the `bal grpc` CLI to generate Ballerina code from `.proto` files.

## Module

`ballerina/protobuf` (used via `ballerina/grpc`)

## Usage

### Generate code from `.proto` files

```bash
# Generate Ballerina client/service stubs from a .proto file
bal grpc --input order_service.proto --output generated
```

### Use generated gRPC client

```ballerina
import ballerina/grpc;

// Generated from .proto files using bal grpc CLI
OrderServiceClient client = check new ("http://localhost:9090");
Order order = check client->GetOrder({order_id: "ORD-001"});
```

### Work with protobuf Any type

```ballerina
import ballerina/protobuf.types.'any;

type Product record {|
    string name;
    decimal price;
|};

// Pack a value into Any
Product product = {name: "Widget", price: 9.99};
'any:Any packed = check 'any:pack(product);

// Unpack from Any
Product unpacked = check 'any:unpack(packed);
```

### Protobuf timestamps and durations

```ballerina
import ballerina/time;

// Protobuf timestamps map to time:Utc
time:Utc timestamp = time:utcNow();

// Protobuf durations map to time:Seconds
time:Seconds duration = 3600.5d;
```

## Submodules

| Submodule | Proto type | Ballerina mapping | Description |
|-----------|-----------|-------------------|-------------|
| `protobuf.types.'any` | `google.protobuf.Any` | `Any` record | Container for arbitrary typed values with `pack`/`unpack` functions. |
| `protobuf.types.duration` | `google.protobuf.Duration` | `time:Seconds` | Signed duration with nanosecond precision. |
| `protobuf.types.empty` | `google.protobuf.Empty` | `Empty` record | Empty message (no fields). |
| `protobuf.types.struct` | `google.protobuf.Struct` | `map<anydata>` | Dynamic key-value structure. |
| `protobuf.types.timestamp` | `google.protobuf.Timestamp` | `time:Utc` | Point in time with nanosecond precision. |
| `protobuf.types.wrappers` | `google.protobuf.*Value` | `int`, `float`, `string`, `boolean`, `byte[]` | Nullable scalar wrappers for optional primitives. |

## Functions

| Function | Signature | Description |
|----------|-----------|-------------|
| `pack` | `pack(ValueType message) returns Any\|Error` | Pack a Ballerina value into a protobuf `Any`. |
| `unpack` | `unpack(Any anyValue, ValueTypeDesc targetTypeOfAny = <>) returns targetTypeOfAny\|Error` | Unpack a protobuf `Any` into a typed Ballerina value. |

## Supported value types

The `pack` and `unpack` functions support:

`int`, `float`, `string`, `boolean`, `time:Utc`, `time:Seconds`, `record {}`, `()`, `byte[]`, `map<anydata>`
