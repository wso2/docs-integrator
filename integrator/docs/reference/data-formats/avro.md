---
title: Avro
---

# Avro

The `ballerina/avro` module (v1.2.1) supports Apache Avro binary serialization and deserialization with schema support. Avro provides compact binary encoding, schema evolution, and is widely used with Apache Kafka and data pipelines.

## Module

`ballerina/avro`

## Usage

### Serialize and deserialize

```ballerina
import ballerina/avro;

// Define an Avro schema
string schema = string `{
    "type": "record",
    "name": "Employee",
    "fields": [
        {"name": "name", "type": "string"},
        {"name": "age", "type": "int"},
        {"name": "department", "type": "string"}
    ]
}`;

avro:Schema avroSchema = check new (schema);

type Employee record {|
    string name;
    int age;
    string department;
|};

// Serialize to Avro bytes
Employee emp = {name: "Jane", age: 30, department: "Engineering"};
byte[] serialized = check avroSchema.toAvro(emp);

// Deserialize from Avro bytes
Employee deserialized = check avroSchema.fromAvro(serialized);
```

### Work with unions (nullable fields)

```ballerina
import ballerina/avro;

string schema = string `{
    "type": "record",
    "name": "Event",
    "fields": [
        {"name": "id", "type": "string"},
        {"name": "description", "type": ["null", "string"]}
    ]
}`;

avro:Schema avroSchema = check new (schema);

type Event record {|
    string id;
    string? description;
|};

Event event = {id: "EVT-001", description: ()};
byte[] bytes = check avroSchema.toAvro(event);
Event decoded = check avroSchema.fromAvro(bytes);
```

### Arrays and nested records

```ballerina
import ballerina/avro;

string schema = string `{
    "type": "record",
    "name": "Order",
    "fields": [
        {"name": "orderId", "type": "string"},
        {"name": "items", "type": {
            "type": "array",
            "items": {
                "type": "record",
                "name": "Item",
                "fields": [
                    {"name": "name", "type": "string"},
                    {"name": "quantity", "type": "int"}
                ]
            }
        }}
    ]
}`;

avro:Schema avroSchema = check new (schema);

type Item record {|
    string name;
    int quantity;
|};

type Order record {|
    string orderId;
    Item[] items;
|};

Order order = {
    orderId: "ORD-001",
    items: [{name: "Widget", quantity: 10}, {name: "Gadget", quantity: 5}]
};

byte[] bytes = check avroSchema.toAvro(order);
Order decoded = check avroSchema.fromAvro(bytes);
```

## Functions

The Avro API is class-based. Create a `Schema` instance, then call its methods to serialize and deserialize.

| Function | Signature | Description |
|----------|-----------|-------------|
| `new Schema` | `new (string schema) returns Error?` | Create a new `Schema` instance from an Avro schema definition (JSON string). Returns an error if the schema is invalid. |
| `toAvro` | `toAvro(anydata data) returns byte[]\|Error` | Serialize a Ballerina value to Avro binary format. |
| `fromAvro` | `fromAvro(byte[] data, typedesc<anydata> targetType = <>) returns targetType\|Error` | Deserialize Avro bytes to a typed Ballerina value. The target type is inferred from the return context. |

## Supported Avro types

| Avro type | Ballerina type |
|-----------|---------------|
| `null` | `()` |
| `boolean` | `boolean` |
| `int` | `int` |
| `long` | `int` |
| `float` | `float` |
| `double` | `float` |
| `bytes` | `byte[]` |
| `string` | `string` |
| `record` | `record {}` |
| `array` | `anydata[]` |
| `map` | `map<anydata>` |
| `union` | Optional types (e.g., `string?`) |
| `enum` | `string` |
| `fixed` | `byte[]` |
