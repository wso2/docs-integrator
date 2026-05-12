---
title: Type System
---

# Type System

Ballerina uses a structural type system where compatibility is determined by the structure of values rather than by declared type names. This design is particularly suited for integration scenarios where data from heterogeneous systems must be validated, transformed, and routed.

## Basic types

### Simple types

| Type | Description | Example |
|------|-------------|---------|
| `int` | 64-bit signed integer | `int count = 42;` |
| `float` | 64-bit IEEE 754 floating point | `float rate = 3.14;` |
| `decimal` | Arbitrary-precision decimal | `decimal price = 99.99d;` |
| `boolean` | Boolean value (`true` or `false`) | `boolean active = true;` |
| `string` | Immutable sequence of Unicode code points | `string name = "WSO2";` |
| `byte` | Integer in the range 0-255 | `byte b = 0xFF;` |
| `nil` | The single value `()` representing absence | `() nothing = ();` |

### Integer subtypes

Ballerina provides constrained integer types for specific ranges:

| Subtype | Range |
|---------|-------|
| `int:Signed8` | -128 to 127 |
| `int:Signed16` | -32768 to 32767 |
| `int:Signed32` | -2147483648 to 2147483647 |
| `int:Unsigned8` | 0 to 255 (same as `byte`) |
| `int:Unsigned16` | 0 to 65535 |
| `int:Unsigned32` | 0 to 4294967295 |

### String subtypes

| Subtype | Description |
|---------|-------------|
| `string:Char` | A single Unicode code point |

## Sequence types

### Arrays

Ordered, variable-length collections of a single element type.

```ballerina
int[] numbers = [1, 2, 3];
string[] names = ["Alice", "Bob"];
int[][3] matrix = [[1, 2, 3], [4, 5, 6]]; // array of fixed-length arrays
```

### Tuples

Fixed-length sequences where each position can have a different type.

```ballerina
[string, int] pair = ["age", 30];
[string, int, boolean] record = ["Alice", 30, true];
[int, string...] openTuple = [1, "a", "b"]; // rest type
```

## Structural types

### Records

Named collections of fields. Records are open by default, allowing extra fields unless declared as closed with `{|...|}`syntax.

```ballerina
// Open record (allows additional fields)
type Customer record {
    string name;
    string email;
    int age?;          // optional field
};

// Closed record (no extra fields allowed)
type Order record {|
    int id;
    string product;
    decimal amount;
    readonly string status;  // immutable field
|};
```

### Maps

Collections of key-value pairs where keys are strings and values are a uniform type.

```ballerina
map<string> headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer token123"
};

map<json> metadata = {};
```

### Tables

Collections of records with key-based access, similar to database tables.

```ballerina
type Employee record {|
    readonly int id;
    string name;
    string department;
|};

table key(id) employees = table [
    {id: 1, name: "Alice", department: "Engineering"},
    {id: 2, name: "Bob", department: "Marketing"}
];
```

## Union types

A value that can be one of several types. Union types are central to Ballerina's approach to error handling and data validation.

```ballerina
int|string identifier = "ABC-123";
string|error result = doSomething();
int|float|decimal number = 42;
```

### Optional types

The shorthand `T?` is equivalent to `T|()`, meaning the value is either of type `T` or `nil`.

```ballerina
string? optionalName = ();      // nil
string? presentName = "Alice";  // string value
```

## Singleton types

A type with exactly one value, often used in union types for tagged variants.

```ballerina
type StatusOK "OK";
type StatusError "ERROR";
type Status StatusOK|StatusError;

Status s = "OK";
```

## `any` and `anydata`

| Type | Description |
|------|-------------|
| `any` | Any value except `error`. Equivalent to the union of all types except `error`. |
| `anydata` | Any pure data value (no behavioral types). Includes `()`, `boolean`, `int`, `float`, `decimal`, `string`, `xml`, and structured values made of `anydata`. |

`anydata` is the type used for values that need to be serialized (JSON, XML, etc.), making it fundamental to integration work.

## JSON and XML types

### JSON type

`json` is a union type: `()|boolean|int|float|decimal|string|json[]|map<json>`. It represents any value that can be serialized to JSON.

```ballerina
json payload = {
    "name": "Order",
    "items": [
        {"id": 1, "qty": 5},
        {"id": 2, "qty": 3}
    ]
};

// Access with field access
json name = payload.name;

// Access with optional field access (returns nil if missing)
json? discount = payload?.discount;
```

### XML type

`xml` is a built-in sequence type for XML data, including elements, text, comments, and processing instructions.

```ballerina
xml greeting = xml `<greeting>Hello</greeting>`;
xml catalog = xml `<items>
    <item id="1">Widget</item>
    <item id="2">Gadget</item>
</items>`;

// XML subtypes
xml:Element element = xml `<name>Alice</name>`;
xml:Text text = xml `plain text`;
xml:Comment comment = xml ``;
xml:ProcessingInstruction pi = xml `<?target data?>`;

// Navigation
xml items = catalog/<item>;
string id = (catalog/<item>).id;
```

## Error type

`error` is a distinct basic type representing error conditions. Every error carries a message (`string`), an optional cause (`error?`), and an optional detail record.

```ballerina
// Basic error
error simpleErr = error("something went wrong");

// Error with detail
type OrderError error<record {| string orderId; int code; |}>;
OrderError err = error("order failed", orderId = "ORD-123", code = 404);

// Accessing error fields
string msg = err.message();
record {| string orderId; int code; |} detail = err.detail();
```

## Type definitions and aliases

```ballerina
// Type alias
type StringOrNil string?;

// Distinct type (creates a new type identity for error types)
type ConnectionError distinct error;
type TimeoutError distinct error;
```

## Type narrowing

Ballerina supports flow-sensitive typing. After a type check, the compiler narrows the variable's type within the corresponding branch.

### `is` expression

```ballerina
function process(int|string|error value) {
    if value is int {
        // value is narrowed to int here
        int doubled = value * 2;
    } else if value is string {
        // value is narrowed to string here
        string upper = value.toUpperAscii();
    } else {
        // value is narrowed to error here
        string msg = value.message();
    }
}
```

### Match statement

```ballerina
function describe(json value) returns string {
    match value {
        var n if n is int => { return "integer: " + n.toString(); }
        var s if s is string => { return "string: " + s; }
        var a if a is json[] => { return "array of " + a.length().toString(); }
        _ => { return "other"; }
    }
}
```

### `check` expression

The `check` expression narrows a union type by extracting the success value. If the value is an `error`, it immediately returns the error from the enclosing function.

```ballerina
function getUser(int id) returns User|error {
    // If query returns error, the function returns that error
    User user = check db->queryRow(`SELECT * FROM users WHERE id = ${id}`);
    return user;
}
```

## Type compatibility

Because Ballerina uses structural typing, type compatibility is based on value shapes rather than type names.

```ballerina
type Point record {|
    int x;
    int y;
|};

type Coordinate record {|
    int x;
    int y;
|};

Point p = {x: 1, y: 2};
Coordinate c = p;  // Valid: same structure
```

### `readonly` types

Any value can be made deeply immutable by intersecting with `readonly`:

```ballerina
readonly & record {| string name; int age; |} person = {name: "Alice", age: 30};
// person.name = "Bob";  // compile-time error
```

### `never` type

The `never` type has no values. It is used for functions that never return (e.g., infinite loops or guaranteed panics) and in type narrowing for impossible cases.

```ballerina
function failed() returns never {
    panic error("fatal error");
}
```
