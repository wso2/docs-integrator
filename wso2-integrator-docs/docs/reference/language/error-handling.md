---
sidebar_position: 6
title: Error Handling
description: Ballerina error handling reference — error type, check, trap, on fail, error detail, and distinct errors.
---

# Error Handling

Ballerina treats errors as first-class values rather than exceptions. The `error` type is a built-in basic type, and the language provides structured constructs -- `check`, `on fail`, `trap`, and distinct error types -- to handle failures explicitly and safely in integration workflows.

## The Error Type

An `error` value carries a message (string), an optional cause (another error), and an optional detail record.

```ballerina
// Create a basic error
error simpleError = error("Something went wrong");

// Error with detail record
type OrderError error<record {|
    string orderId;
    string reason;
|}>;

OrderError orderErr = error("Order failed",
    orderId = "ORD-123",
    reason = "Insufficient inventory"
);
```

### Error Value Components

| Component | Type | Access | Description |
|-----------|------|--------|-------------|
| Message | `string` | `err.message()` | Human-readable error description |
| Cause | `error?` | `err.cause()` | The underlying error that caused this error |
| Detail | `record {}` | `err.detail()` | Structured data associated with the error |
| Stack trace | `runtime:StackFrame[]` | `err.stackTrace()` | Call stack at the point of error creation |

## Check Expression

The `check` expression is the primary mechanism for propagating errors. If the expression evaluates to an error, it returns (or propagates) the error from the enclosing function or block.

```ballerina
function getUser(string id) returns json|error {
    http:Client client = check new ("https://api.example.com");
    json response = check client->get("/users/" + id);
    string name = check response.name;
    return response;
}
```

### Check in Different Contexts

```ballerina
// Check in function — propagates error as return value
function fetchData() returns string|error {
    string result = check io:fileReadString("data.txt");
    return result;
}

// Check in worker — fails the worker
worker dataWorker returns string|error {
    string result = check io:fileReadString("data.txt");
    return result;
}

// Check in do-on-fail — transfers control to on fail
function safeFetch() returns string {
    do {
        string result = check io:fileReadString("data.txt");
        return result;
    } on fail error e {
        return "default value";
    }
}
```

## On Fail Clause

The `on fail` clause catches errors from `check` expressions within `do`, `while`, `foreach`, `lock`, `transaction`, and `retry` blocks.

```ballerina
function processRecords(json[] records) returns error? {
    foreach json rec in records {
        do {
            string name = check rec.name;
            string email = check rec.email;
            check saveToDatabase(name, email);
        } on fail error e {
            log:printError("Failed to process record", 'error = e, record = rec);
            // Continue processing remaining records
        }
    }
}
```

### Blocks That Support On Fail

| Block | Example |
|-------|---------|
| `do` | `do { ... } on fail error e { ... }` |
| `while` | `while cond { ... } on fail error e { ... }` |
| `foreach` | `foreach var x in list { ... } on fail error e { ... }` |
| `lock` | `lock { ... } on fail error e { ... }` |
| `transaction` | `transaction { ... } on fail error e { ... }` |
| `retry` | `retry { ... } on fail error e { ... }` |

### On Fail with Error Type Binding

```ballerina
function callExternalService() returns json|error {
    do {
        http:Client cl = check new ("https://api.example.com");
        json resp = check cl->get("/data");
        return resp;
    } on fail http:ClientError httpErr {
        log:printError("HTTP error", httpErr);
        return error("Service unavailable", httpErr);
    } on fail error e {
        log:printError("Unexpected error", e);
        return e;
    }
}
```

## Trap Expression

The `trap` expression catches panics and converts them to errors. Use `trap` when calling code that might panic rather than return an error.

```ballerina
function safeDivide(int a, int b) returns int|error {
    int|error result = trap (a / b);
    return result;
}

function safeAccess(json data) returns json|error {
    // Trap potential panic from type assertion
    json|error value = trap <json[]>data;
    return value;
}
```

### Check vs. Trap

| Feature | `check` | `trap` |
|---------|---------|--------|
| Catches | `error` return values | Panics (runtime exceptions) |
| Use case | Normal error propagation | Recovering from panics |
| Behavior | Propagates error to enclosing scope | Converts panic to `error` value |
| Common in | API calls, I/O, data access | Type casts, array access, division |

## Error Detail Records

Error detail records carry structured information about failures. Define custom detail types for domain-specific errors.

```ballerina
// Define an error with detail
type ValidationError error<record {|
    string fieldName;
    string constraint;
    anydata value;
|}>;

function validateAge(int age) returns int|ValidationError {
    if age < 0 || age > 150 {
        return error ValidationError(
            "Validation failed",
            fieldName = "age",
            constraint = "must be between 0 and 150",
            value = age
        );
    }
    return age;
}

// Access detail fields
function handleValidation() {
    int|ValidationError result = validateAge(-5);
    if result is ValidationError {
        record {|string fieldName; string constraint; anydata value;|} detail = result.detail();
        io:println("Field: ", detail.fieldName);
        io:println("Constraint: ", detail.constraint);
    }
}
```

## Distinct Errors

Distinct errors are error types with a unique identity, enabling type-based error discrimination. Each `distinct` error type is a subtype of `error` and can be matched precisely.

```ballerina
// Define distinct error types
type NotFoundError distinct error;
type AuthenticationError distinct error;
type AuthorizationError distinct error;

function getResource(string id, string token) returns json|NotFoundError|AuthenticationError|AuthorizationError {
    if token == "" {
        return error AuthenticationError("No auth token provided");
    }
    if !hasPermission(token) {
        return error AuthorizationError("Insufficient permissions");
    }
    json? resource = lookupResource(id);
    if resource is () {
        return error NotFoundError("Resource not found", id = id);
    }
    return resource;
}

// Match on distinct error types
function handleRequest(string id, string token) returns http:Response {
    json|error result = getResource(id, token);

    if result is NotFoundError {
        return createResponse(404, "Not Found");
    } else if result is AuthenticationError {
        return createResponse(401, "Unauthorized");
    } else if result is AuthorizationError {
        return createResponse(403, "Forbidden");
    } else if result is error {
        return createResponse(500, "Internal Server Error");
    }
    return createJsonResponse(200, result);
}
```

### Distinct Error Hierarchies

```ballerina
// Parent error type
type AppError distinct error;

// Child error types
type DatabaseError distinct (AppError & error<record {|string query;|}>);
type NetworkError distinct (AppError & error<record {|string url; int statusCode;|}>);

function processRequest() returns json|AppError {
    do {
        json data = check fetchFromDB();
        return check sendToService(data);
    } on fail AppError e {
        // Catches both DatabaseError and NetworkError
        log:printError("Application error", e);
        return e;
    }
}
```

## Error Constructors and Matching

### Constructing Errors

```ballerina
// Basic error
error e1 = error("something failed");

// Error with cause
error cause = error("root cause");
error e2 = error("operation failed", cause);

// Error with detail
error e3 = error("validation failed", fieldName = "email", value = "invalid");

// Named error type
type MyError error<record {|string code;|}>;
MyError e4 = error MyError("failed", code = "E001");
```

### Error Match Patterns

```ballerina
function categorizeError(error err) returns string {
    match err {
        error NotFoundError() => {
            return "not_found";
        }
        error AuthenticationError() => {
            return "auth_error";
        }
        error(var message) if message.includes("timeout") => {
            return "timeout";
        }
        _ => {
            return "unknown";
        }
    }
}
```

## Error Handling Patterns for Integration

### Retry with Error Handling

```ballerina
function reliableCall(string url) returns json|error {
    int attempts = 0;
    while attempts < 3 {
        do {
            http:Client cl = check new (url);
            return check cl->get("/data");
        } on fail http:ClientError e {
            attempts += 1;
            if attempts >= 3 {
                return error("Max retries exceeded", e);
            }
            runtime:sleep(attempts * 2);
        }
    }
    return error("Unreachable");
}
```

### Circuit Breaker Pattern

```ballerina
function callWithCircuitBreaker() returns json|error {
    http:Client cl = check new ("https://api.example.com", {
        circuitBreaker: {
            rollingWindow: {timeWindow: 60, bucketSize: 10},
            failureThreshold: 0.5,
            resetTime: 30,
            statusCodes: [500, 502, 503]
        }
    });

    do {
        return check cl->get("/data");
    } on fail http:ClientError e {
        log:printError("Circuit breaker triggered", e);
        return getFallbackData();
    }
}
```

### Error Aggregation

```ballerina
function validateOrder(Order order) returns error? {
    error[] errors = [];

    if order.quantity <= 0 {
        errors.push(error("Invalid quantity", field = "quantity"));
    }
    if order.price < 0.0 {
        errors.push(error("Invalid price", field = "price"));
    }
    if order.customerId == "" {
        errors.push(error("Missing customer ID", field = "customerId"));
    }

    if errors.length() > 0 {
        return error("Order validation failed", errors = errors);
    }
}
```

## See Also

- [Ballerina Syntax Quick Reference](syntax.md) -- Core language syntax
- [Concurrency](concurrency.md) -- Workers, transactions, and error handling in concurrent code
- [Integration-Specific Features](integration-features.md) -- Services, clients, listeners
- [Ballerina by Example](/reference/by-example.md) -- Runnable error handling examples
