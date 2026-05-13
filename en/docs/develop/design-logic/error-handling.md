---
sidebar_position: 4
title: Error Handling
description: Handle failures gracefully with do/on-fail, check, retry, circuit breaker, and fallback patterns.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Error Handling

Robust integrations anticipate and handle failures. Ballerina treats errors as first-class values with a dedicated `error` type, making it impossible to silently ignore failures. This page covers error handling constructs and resilience patterns for your integrations.

:::tip
This page is about **writing** error handling code. If you need to **diagnose** an error message or read a stack trace, see [Errors and Stack Traces](../debugging/errors-and-stack-traces.md).
:::

## The error type

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

## Check expression

The `check` keyword propagates errors to the caller. If the expression evaluates to an error, the function immediately returns that error.

```ballerina
function processOrder(OrderRequest req) returns OrderResponse|error {
    Customer customer = check getCustomer(req.customerId);
    decimal total = check calculateTotal(req.items);
    string orderId = check insertOrder(customer.id, total);
    check sendConfirmationEmail(customer.email, orderId);

    return {orderId: orderId, status: "CONFIRMED", total: total};
}
```

## Do/on-fail blocks

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

1. In the flow canvas, click **+** to open the step picker.
2. Under **Error Handling**, select the error handling node you need.

   ![Flow canvas showing a function call node wrapped in an Error Handler block](/img/develop/design-logic/error-handling/error-nodes.png)

3. Wrap existing nodes inside the error handling block by dragging them in, or add new nodes inside the block.
4. Configure the **on fail** handler — specify the error variable name and add recovery steps.
5. Click **Save**.

</TabItem>
<TabItem value="code" label="Ballerina Code">

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
        return error("Order processing failed: " + e.message());
    }
}
```

### Selective error handling

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

</TabItem>
</Tabs>

## Custom error types

Define domain-specific error types for clear error handling:

```ballerina
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
        check refundPayment(req.customerId, paymentResult);
        return error OrderError("Inventory reservation failed", inventoryResult);
    }

    return {orderId: "ORD-123", status: "CONFIRMED", total: paymentResult};
}
```

## Retry pattern

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

1. In the flow canvas, click **+** to open the step picker.
2. Under **Error Handling**, select the retry node.
3. In the configuration panel, specify:

   | Field | Description |
   |---|---|
   | **Max retries** | Number of retry attempts |
   | **Error type** | Filter retries to specific error types (optional) |

4. Add the operation to retry inside the retry block.
5. Click **Save**.

</TabItem>
<TabItem value="code" label="Ballerina Code">

### Using retry blocks

```ballerina
function callWithRetry(string endpoint) returns json|error {
    retry<error> (3) {
        json result = check httpClient->get(endpoint);
        return result;
    }
}
```

### Configurable retry

```ballerina
retry<http:ClientError> (maxRetries) {
    json result = check httpClient->get("/api/data");
    return result;
} on fail http:ClientError e {
    log:printError("All retries exhausted", 'error = e);
    return error("Service unavailable after retries");
}
```

### HTTP client retry configuration

```ballerina
final http:Client resilientClient = check new ("https://api.example.com", {
    retryConfig: {
        count: 3,
        interval: 2,
        backOffFactor: 2.0,
        maxWaitInterval: 30,
        statusCodes: [500, 502, 503, 504]
    }
});
```

</TabItem>
</Tabs>

## Circuit breaker pattern

Prevent cascading failures by stopping requests to a failing service.

```ballerina
final http:Client protectedClient = check new ("https://api.example.com", {
    circuitBreaker: {
        rollingWindow: {
            timeWindow: 60,
            bucketSize: 10
        },
        failureThreshold: 0.5,
        resetTime: 30,
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

### Circuit breaker states

| State | Behavior |
|---|---|
| **Closed** | Normal operation; requests pass through |
| **Open** | All requests fail immediately; no calls to the backend |
| **Half-Open** | One test request allowed; success closes, failure re-opens |

## Fallback pattern

```ballerina
function getProductPrice(string productId) returns decimal|error {
    decimal|error price = getPriceFromCatalogService(productId);
    if price is decimal {
        return price;
    }

    decimal|error cachedPrice = getPriceFromCache(productId);
    if cachedPrice is decimal {
        log:printWarn("Using cached price", productId = productId);
        return cachedPrice;
    }

    log:printWarn("Using default price", productId = productId);
    return 0.00d;
}
```

## Error responses in HTTP services

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

## Panic and trap

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

## Best practices

1. **Prefer `check` over explicit error handling** for simple error propagation.
2. **Use `do/on fail` for recovery logic** where you need to take action on failure.
3. **Define custom error types** for domain-specific failures.
4. **Configure retries at the client level** for transient failures.
5. **Use circuit breakers** for calls to external services that may become unavailable.
6. **Always log errors** with sufficient context for debugging.
7. **Never silently swallow errors** — Ballerina's type system prevents this by design.

## What's next

- [Expressions](expressions.md) — Write conditions for error handling branches
- [Configuration Management](configuration-management.md) — Configure retry and circuit breaker settings per environment
- [Connections](managing-connections.md) — Configure resilient connections
