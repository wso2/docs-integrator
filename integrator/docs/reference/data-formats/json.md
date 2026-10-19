---
title: JSON
---

# JSON

JSON is a first-class type in Ballerina. The `json` type is built into the language, and values can be created, accessed, and manipulated directly. The `ballerina/data.jsondata` module (v1.1.3) provides advanced type-safe binding, JSONPath queries, and prettification.

## Module

Built-in (no import needed for basic operations); `ballerina/data.jsondata` for advanced binding.

## Usage

### Create and access JSON

```ballerina
// Native JSON creation — no imports needed
json order = {
    orderId: "ORD-001",
    items: [
        {name: "Widget", qty: 10, price: 9.99},
        {name: "Gadget", qty: 2, price: 24.99}
    ],
    total: 149.88
};

// Access fields
string id = check order.orderId;
json items = check order.items;
```

### Type-safe binding from JSON

```ballerina
import ballerina/data.jsondata;

type Order record {|
    string orderId;
    Item[] items;
    decimal total;
|};

type Item record {|
    string name;
    int qty;
    decimal price;
|};

// Parse a JSON string into a typed record
string jsonString = "{\"orderId\":\"ORD-001\",\"items\":[],\"total\":0}";
Order typedOrder = check jsondata:parseString(jsonString);

// Convert an existing json value to a typed record
json rawJson = {orderId: "ORD-002", items: [], total: 0};
Order order2 = check jsondata:parseAsType(rawJson);
```

### Parse from bytes and streams

```ballerina
import ballerina/data.jsondata;
import ballerina/io;

type Config record {|
    string name;
    int port;
|};

// Parse from byte array
byte[] jsonBytes = "{\"name\":\"api\",\"port\":8080}".toBytes();
Config cfg = check jsondata:parseBytes(jsonBytes);

// Parse from a byte stream (e.g., file)
stream<byte[], io:Error?> byteStream = check io:fileReadBlocksAsStream("config.json");
Config cfg2 = check jsondata:parseStream(byteStream);
```

### JSONPath queries

```ballerina
import ballerina/data.jsondata;

json data = {
    store: {
        books: [
            {title: "Clean Code", price: 33.99},
            {title: "The Pragmatic Programmer", price: 42.50}
        ]
    }
};

// Extract data using JSONPath
json result = check jsondata:read(data, `$.store.books[0].title`);
// result: "Clean Code"
```

### Prettify JSON

```ballerina
import ballerina/data.jsondata;
import ballerina/io;

json data = {name: "api", version: "1.0"};
string pretty = jsondata:prettify(data, indentation = 2);
io:println(pretty);
```

### Convert records to JSON

```ballerina
import ballerina/data.jsondata;

type Employee record {|
    string name;
    int age;
|};

Employee emp = {name: "Jane", age: 30};
json empJson = jsondata:toJson(emp);
```

## Functions

| Function | Signature | Description |
|----------|-----------|-------------|
| `parseString` | `parseString(string s, Options options = {}, typedesc<anydata> t = <>) returns t\|Error` | Parse a JSON string into a typed value. |
| `parseBytes` | `parseBytes(byte[] s, Options options = {}, typedesc<anydata> t = <>) returns t\|Error` | Parse a JSON byte array into a typed value. |
| `parseStream` | `parseStream(stream<byte[], error?> s, Options options = {}, typedesc<anydata> t = <>) returns t\|Error` | Parse a JSON byte stream into a typed value. |
| `parseAsType` | `parseAsType(json v, Options options = {}, typedesc<anydata> t = <>) returns t\|Error` | Convert a `json` value into a typed value. |
| `toJson` | `toJson(anydata v) returns json` | Convert any `anydata` value to `json`. |
| `prettify` | `prettify(json value, int indentation = 4) returns string` | Prettify a JSON value with configurable indentation. |
| `read` | `read(json json, JsonPathRawTemplate query) returns json\|Error` | Extract data using a JSONPath expression. |

## Options

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `allowDataProjection` | `record\|false` | `{}` | Controls data projection behavior. Nested fields: `nilAsOptionalField` (default `false`), `absentAsNilableType` (default `false`). Set to `false` to disable projection. |
| `enableConstraintValidation` | `boolean` | `true` | Whether to validate constraints on the target type. |

## Annotations

| Annotation | Description |
|------------|-------------|
| `@jsondata:Name` | Overrides the record field name when mapping to/from JSON keys. Takes a `value` string parameter. |
