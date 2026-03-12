---
sidebar_position: 4
title: Error Handling
description: Handle failures gracefully with do/on-fail, check, retry, circuit breaker, and fallback patterns.
---

# Error Handling

Robust integrations anticipate and handle failures. Ballerina treats errors as first-class values with a dedicated `error` type, making it impossible to silently ignore failures. This page covers error handling constructs and resilience patterns for your integrations.

## The Error Type

In Ballerina, errors are values, not exceptions. Functions that can fail return a union type that includes `error`:

```ballerina
// This function can return a string or an error
function getCustomerName(string id) returns string|error {
    Customer customer = check dbClient->queryRow(
        `SELECT * FROM customers WHERE id = ${id}`
    );
    return customer.name;
}
```

## Check Expression

The `check` keyword propagates errors to the caller. If the expression evaluates to an error, the function immediately returns that error.

```ballerina
function processOrder(OrderRequest req) returns OrderResponse|error {
    // Each 'check' returns the error to the caller if the operation fails
    Customer customer = check getCustomer(req.customerId);
    decimal total = check calculateTotal(req.items);
    string orderId = check insertOrder(customer.id, total);
    check sendConfirmationEmail(customer.email, orderId);

    return {orderId: orderId, status: "CONFIRMED", total: total};
}
```

## Do/On-Fail Blocks

Use `do/on fail` to catch errors within a specific scope:

```ballerina
function processWithRecovery(OrderRequest req) returns OrderResponse|error {
    do {
        Customer customer = check getCustomer(req.customerId);
        decimal total = check calculateTotal(req.items);
        string orderId = check insertOrder(customer.id, total);
        check sendConfirmationEmail(customer.email, orderId);
        return {orderId: orderId, status: "CONFIRMED", total: total};
    } on fail error e {
        log:printError("Order processing failed", 'error = e);
        // Attempt recovery or return a meaningful error
        return error("Order processing failed: " + e.message());
    }
}
```

### Selective Error Handling

Handle specific error types differently:

```ballerina
function callExternalService(string endpoint) returns json|error {
    do {
        json result = check httpClient->get(endpoint);
        return result;
    } on fail http:ClientError e {
        if e is http:IdleTimeoutError {
            log:printWarn("Request timed out, retrying...");
            return check httpClient->get(endpoint);
        }
        return error("HTTP error: " + e.message());
    }
}
```

## Custom Error Types

Define domain-specific error types for clear error handling:

```ballerina
// Define custom error types
type OrderError distinct error;
type ValidationError distinct error;
type PaymentError distinct error;
type InventoryError distinct error;

function createOrder(OrderRequest req) returns OrderResponse|OrderError {
    string[]|ValidationError validationResult = validateOrder(req);
    if validationResult is ValidationError {
        return error OrderError("Validation failed", validationResult);
    }

    decimal|PaymentError paymentResult = processPayment(req);
    if paymentResult is PaymentError {
        return error OrderError("Payment failed", paymentResult);
    }

    boolean|InventoryError inventoryResult = reserveInventory(req.items);
    if inventoryResult is InventoryError {
        // Refund payment before returning error
        check refundPayment(req.customerId, paymentResult);
        return error OrderError("Inventory reservation failed", inventoryResult);
    }

    return {orderId: "ORD-123", status: "CONFIRMED", total: paymentResult};
}
```

## Retry Pattern

Retry transient failures with configurable backoff.

### Using retry Blocks

```ballerina
function callWithRetry(string endpoint) returns json|error {
    retry<error> (3) {
        // This block retries up to 3 times on error
        json result = check httpClient->get(endpoint);
        return result;
    }
}
```

### Configurable Retry

```ballerina
retry<http:ClientError> (maxRetries) {
    json result = check httpClient->get("/api/data");
    return result;
} on fail http:ClientError e {
    log:printError("All retries exhausted", 'error = e);
    return error("Service unavailable after retries");
}
```

### HTTP Client Retry Configuration

```ballerina
final http:Client resilientClient = check new ("https://api.example.com", {
    retryConfig: {
        count: 3,
        interval: 2,          // 2 seconds initial interval
        backOffFactor: 2.0,    // Exponential backoff
        maxWaitInterval: 30,   // Max 30 seconds between retries
        statusCodes: [500, 502, 503, 504]
    }
});
```

## Circuit Breaker Pattern

Prevent cascading failures by stopping requests to a failing service.

```ballerina
final http:Client protectedClient = check new ("https://api.example.com", {
    circuitBreaker: {
        rollingWindow: {
            timeWindow: 60,   // 60-second evaluation window
            bucketSize: 10    // Divide into 10 buckets
        },
        failureThreshold: 0.5, // Open at 50% failure rate
        resetTime: 30,          // Try again after 30 seconds
        statusCodes: [500, 502, 503]
    }
});

function callProtectedService() returns json|error {
    do {
        return check protectedClient->get("/api/data");
    } on fail http:CircuitBreakerError e {
        log:printWarn("Circuit breaker open, using fallback");
        return getFallbackData();
    }
}
```

### Circuit Breaker States

| State | Behavior |
|---|---|
| **Closed** | Normal operation; requests pass through |
| **Open** | All requests fail immediately; no calls to the backend |
| **Half-Open** | One test request allowed; success closes, failure re-opens |

## Fallback Pattern

Provide alternative data or behavior when the primary path fails:

```ballerina
function getProductPrice(string productId) returns decimal|error {
    // Try primary source
    decimal|error price = getPriceFromCatalogService(productId);
    if price is decimal {
        return price;
    }

    // Fallback to cache
    decimal|error cachedPrice = getPriceFromCache(productId);
    if cachedPrice is decimal {
        log:printWarn("Using cached price", productId = productId);
        return cachedPrice;
    }

    // Fallback to default
    log:printWarn("Using default price", productId = productId);
    return 0.00d;
}
```

## Error Responses in HTTP Services

Return structured error responses from HTTP services:

```ballerina
type ApiError record {|
    string code;
    string message;
    string[] details?;
    string timestamp;
|};

resource function post orders(OrderRequest req)
        returns OrderResponse|http:BadRequest|http:InternalServerError {
    do {
        return check processOrder(req);
    } on fail ValidationError e {
        ApiError errBody = {
            code: "VALIDATION_ERROR",
            message: e.message(),
            details: e.detail().errors,
            timestamp: time:utcToString(time:utcNow())
        };
        return <http:BadRequest>{body: errBody};
    } on fail error e {
        log:printError("Unexpected error", 'error = e);
        ApiError errBody = {
            code: "INTERNAL_ERROR",
            message: "An unexpected error occurred",
            timestamp: time:utcToString(time:utcNow())
        };
        return <http:InternalServerError>{body: errBody};
    }
}
```

## Panic and Trap

For unrecoverable errors, use `panic` to halt execution. Use `trap` to catch panics.

```ballerina
// Panic on unrecoverable errors (use sparingly)
function initialize() {
    mysql:Client|error db = new (host = "localhost", database = "mydb");
    if db is error {
        panic error("Cannot start: database unreachable - " + db.message());
    }
}

// Trap a panic
function safeInitialize() returns error? {
    error? result = trap initialize();
    if result is error {
        log:printError("Initialization failed", 'error = result);
        return result;
    }
}
```

## Best Practices

1. **Prefer `check` over explicit error handling** for simple error propagation.
2. **Use `do/on fail` for recovery logic** where you need to take action on failure.
3. **Define custom error types** for domain-specific failures.
4. **Configure retries at the client level** for transient failures.
5. **Use circuit breakers** for calls to external services that may become unavailable.
6. **Always log errors** with sufficient context for debugging.
7. **Never silently swallow errors** -- Ballerina's type system prevents this by design.

## What's Next

- [Expressions](expressions.md) -- Write conditions for error handling branches
- [Configuration Management](configuration-management.md) -- Configure retry and circuit breaker settings per environment
- [Connections](connections.md) -- Configure resilient connections
