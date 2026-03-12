---
sidebar_position: 6
title: Style Guide
description: Follow Ballerina coding conventions for consistent, readable integration code.
---

# Style Guide

Write clean, consistent Ballerina integration code by following the community coding conventions. A consistent style across your team makes code reviews faster, onboarding easier, and maintenance less error-prone.

## Naming Conventions

### Functions and Variables

Use `camelCase` for function names, variable names, and parameters.

```ballerina
// Good
function calculateOrderTotal(Order order) returns decimal {
    decimal subtotal = 0;
    foreach OrderItem item in order.items {
        decimal lineTotal = item.unitPrice * <decimal>item.quantity;
        subtotal += lineTotal;
    }
    return subtotal;
}

// Bad
function CalculateOrderTotal(Order order) returns decimal { ... }
function calculate_order_total(Order order) returns decimal { ... }
```

### Types and Records

Use `PascalCase` for type names, record names, and enum names.

```ballerina
// Good
type OrderRequest record {|
    string customerId;
    OrderItem[] items;
    ShippingAddress shippingAddress;
|};

type OrderStatus "pending"|"confirmed"|"shipped"|"delivered";

// Bad
type orderRequest record {| ... |};
type order_request record {| ... |};
```

### Constants and Enums

Use `SCREAMING_SNAKE_CASE` for constants.

```ballerina
// Good
const decimal TAX_RATE = 0.08;
const int MAX_RETRY_COUNT = 3;
const string DEFAULT_CURRENCY = "USD";

// Good: enum members in PascalCase
public enum OrderPriority {
    Standard,
    Express,
    Overnight
}
```

### Module and Package Names

Use `snake_case` for package names and module names.

```toml
# Ballerina.toml
[package]
org = "myorg"
name = "order_service"      # snake_case
```

```ballerina
// Module import
import myorg/order_service.db_operations;   // snake_case module name
```

## Formatting

### Indentation

Use 4 spaces for indentation. Never use tabs.

```ballerina
// Good: 4-space indentation
service /api on new http:Listener(9090) {

    resource function get orders() returns Order[]|error {
        Order[] orders = check getOrders();
        if orders.length() == 0 {
            return [];
        }
        return orders;
    }
}
```

### Line Length

Keep lines under 120 characters. Break long lines at logical points.

```ballerina
// Good: break long function signatures
resource function post orders(
        OrderRequest request,
        @http:Header string authorization)
        returns OrderResponse|http:BadRequest|error {
    // ...
}

// Good: break long expressions
string fullAddress = customer.streetAddress + ", "
    + customer.city + ", "
    + customer.state + " "
    + customer.zipCode;
```

### Braces

Opening braces go on the same line. Always use braces for control flow, even single-line bodies.

```ballerina
// Good
if order.total > 1000 {
    applyDiscount(order);
}

// Bad: missing braces
// if order.total > 1000
//     applyDiscount(order);

// Good: else on same line as closing brace
if order.status == "pending" {
    processOrder(order);
} else {
    log:printWarn("Order already processed");
}
```

### Blank Lines

Use blank lines to separate logical sections.

```ballerina
import ballerina/http;
import ballerina/log;

import ballerinax/kafka;
import ballerinax/postgresql;

// Blank line between import groups (stdlib vs extended)

const decimal TAX_RATE = 0.08;
const int MAX_ITEMS = 100;

// Blank line between constants and types

type Order record {|
    string id;
    string customerId;
    decimal total;
|};

// Blank line between type definitions

public function processOrder(Order order) returns error? {
    // Blank line between logical sections within a function
    check validateOrder(order);

    decimal tax = order.total * TAX_RATE;
    decimal grandTotal = order.total + tax;

    check persistOrder(order, grandTotal);
    check sendConfirmation(order);
}
```

## Record Types

### Use Closed Records for Known Shapes

Use the `{| ... |}` syntax (closed records) when the record shape is fully known. This prevents unexpected fields.

```ballerina
// Good: closed record -- only declared fields are allowed
type OrderRequest record {|
    string customerId;
    OrderItem[] items;
    string? couponCode;
|};

// Open record -- use when extra fields are acceptable (e.g., passthrough)
type GenericPayload record {
    string eventType;
    // Additional fields are allowed
};
```

### Optional vs Required Fields

```ballerina
type CustomerProfile record {|
    string id;                    // Required
    string name;                  // Required
    string email;                 // Required
    string? phone;                // Optional (can be nil)
    string country = "US";        // Optional with default
|};
```

## Error Handling Style

### Use `check` for Propagation

```ballerina
// Good: concise error propagation with check
public function createOrder(json payload) returns Order|error {
    OrderRequest request = check payload.fromJsonWithType();
    check validateRequest(request);
    Order order = check persistOrder(request);
    return order;
}

// Avoid: verbose manual error handling when check suffices
// public function createOrder(json payload) returns Order|error {
//     OrderRequest|error request = payload.fromJsonWithType();
//     if request is error {
//         return request;
//     }
//     ...
// }
```

### Handle Errors Explicitly When Logic Differs

```ballerina
// Good: explicit handling when error requires specific action
public function fetchWithFallback(string id) returns json {
    json|error primary = primaryClient->/data/[id];
    if primary is error {
        log:printWarn("Primary failed, trying fallback", 'error = primary);
        json|error fallback = fallbackClient->/data/[id];
        if fallback is error {
            return {"error": "Both sources unavailable"};
        }
        return fallback;
    }
    return primary;
}
```

## Service Resource Style

### Resource Function Naming

Resources map to HTTP semantics. Use the HTTP method as the function qualifier.

```ballerina
service /api on new http:Listener(9090) {

    // GET /api/orders
    resource function get orders() returns Order[]|error { ... }

    // GET /api/orders/{id}
    resource function get orders/[string id]() returns Order|http:NotFound|error { ... }

    // POST /api/orders
    resource function post orders(OrderRequest req) returns Order|http:BadRequest|error { ... }

    // PUT /api/orders/{id}
    resource function put orders/[string id](OrderRequest req)
            returns Order|http:NotFound|error { ... }

    // DELETE /api/orders/{id}
    resource function delete orders/[string id]()
            returns http:NoContent|http:NotFound|error { ... }
}
```

## Documentation Comments

Use `#` comments for documenting public functions and types.

```ballerina
# Calculates the total price for an order including tax and discounts.
#
# + order - The order to calculate the total for
# + taxRate - The applicable tax rate (e.g., 0.08 for 8%)
# + return - The calculated total, or an error if the order is invalid
public function calculateTotal(Order order, decimal taxRate) returns decimal|error {
    if order.items.length() == 0 {
        return error("Order must have at least one item");
    }
    decimal subtotal = from OrderItem item in order.items
        let decimal lineTotal = item.unitPrice * <decimal>item.quantity
        collect sum(lineTotal);
    return subtotal + (subtotal * taxRate);
}

# Represents a customer order in the system.
#
# + id - Unique order identifier
# + customerId - Reference to the customer who placed the order
# + items - Line items in the order
# + status - Current order status
public type Order record {|
    string id;
    string customerId;
    OrderItem[] items;
    OrderStatus status;
|};
```

## Import Organization

Group imports by category and separate with blank lines.

```ballerina
// 1. Standard library
import ballerina/http;
import ballerina/io;
import ballerina/log;
import ballerina/time;

// 2. Extended library (connectors)
import ballerinax/kafka;
import ballerinax/postgresql;

// 3. Organization packages
import myorg/shared_types;
import myorg/order_service.db;
```

## Best Practices

- **Run the Ballerina formatter** -- use `bal format` to auto-format your code before committing
- **Be consistent within a project** -- if your team has a local convention, follow it even if it differs slightly from this guide
- **Document public APIs** -- every public function and type should have a doc comment
- **Prefer closed records** for integration types to catch unexpected fields at compile time
- **Use query expressions** over manual loops for collection operations
- **Keep functions short** -- aim for functions under 30 lines; extract complex logic into helper functions

## What's Next

- [Static Code Analysis](static-code-analysis.md) -- Automate code quality checks
- [Generate Documentation](generate-documentation.md) -- Produce API docs from your code
- [Packages & Modules](packages-modules.md) -- Organize code into packages
