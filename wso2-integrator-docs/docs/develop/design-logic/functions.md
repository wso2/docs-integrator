---
sidebar_position: 8
title: Functions
description: Create reusable functions to encapsulate integration logic, compose operations, and keep your code maintainable.
---

# Functions

Functions are the primary mechanism for organizing and reusing integration logic. Extract repeated patterns into named functions, compose small operations into larger workflows, and keep your integration code clean and testable. Ballerina functions are first-class, type-safe, and support both synchronous and asynchronous execution.

## Defining Functions

### Basic Functions

```ballerina
// Simple function with parameters and a return type
function calculateTotal(decimal unitPrice, int quantity) returns decimal {
    return unitPrice * <decimal>quantity;
}

// Function with no return value
function logOrderReceived(string orderId) {
    log:printInfo("Order received", orderId = orderId);
}

// Function that can return an error
function fetchCustomer(string customerId) returns Customer|error {
    return customerDb->queryRow(
        `SELECT * FROM customers WHERE id = ${customerId}`
    );
}
```

### Required and Defaultable Parameters

```ballerina
// Required parameters come first, defaultable parameters after
function sendNotification(
    string recipient,
    string message,
    string channel = "email",    // Default: email
    boolean urgent = false       // Default: not urgent
) returns error? {
    if channel == "email" {
        check sendEmail(recipient, message, urgent);
    } else if channel == "sms" {
        check sendSms(recipient, message);
    }
}

// Call with defaults
check sendNotification("user@example.com", "Order shipped");

// Call with overrides
check sendNotification("user@example.com", "Order shipped",
    channel = "sms", urgent = true);
```

### Rest Parameters

Accept a variable number of arguments:

```ballerina
function mergeJsonObjects(json... objects) returns map<json> {
    map<json> result = {};
    foreach json obj in objects {
        if obj is map<json> {
            foreach [string, json] [key, value] in obj.entries() {
                result[key] = value;
            }
        }
    }
    return result;
}

// Call with any number of arguments
map<json> merged = mergeJsonObjects(
    {name: "Alice"},
    {email: "alice@example.com"},
    {role: "admin"}
);
```

## Return Types

### Single Return Type

```ballerina
function getOrderTotal(string orderId) returns decimal|error {
    record {decimal total;} result = check orderDb->queryRow(
        `SELECT total FROM orders WHERE id = ${orderId}`
    );
    return result.total;
}
```

### Union Return Types

Return different types to represent success and failure scenarios:

```ballerina
function processPayment(PaymentRequest req)
        returns PaymentConfirmation|PaymentDeclined|error {
    json response = check paymentGateway->post("/charge", req.toJson());
    string status = check response.status;
    if status == "approved" {
        return check response.fromJsonWithType(PaymentConfirmation);
    }
    return check response.fromJsonWithType(PaymentDeclined);
}
```

### Returning Nil for Void with Error

```ballerina
// Returns nil on success, error on failure
function updateInventory(string sku, int quantity) returns error? {
    _ = check inventoryDb->execute(
        `UPDATE inventory SET quantity = quantity - ${quantity} WHERE sku = ${sku}`
    );
}
```

## Function Composition

### Chaining Functions with `check`

Compose multiple error-returning functions cleanly with `check`:

```ballerina
function processOrder(OrderRequest req) returns OrderConfirmation|error {
    // Each step can fail -- 'check' propagates errors automatically
    Customer customer = check fetchCustomer(req.customerId);
    check validateOrder(req, customer);
    decimal total = check calculatePricing(req.items, customer.tier);
    PaymentConfirmation payment = check processPayment(req.paymentMethod, total);
    string orderId = check createOrder(req, total, payment.transactionId);
    check sendOrderConfirmation(customer.email, orderId);

    return {orderId, total, transactionId: payment.transactionId};
}
```

### Utility Functions for Data Transformation

```ballerina
// Transform a collection of records
function toOrderSummaries(Order[] orders) returns OrderSummary[] {
    return from Order o in orders
        select {
            orderId: o.id,
            customerName: o.customer.firstName + " " + o.customer.lastName,
            total: o.total,
            status: o.status,
            itemCount: o.items.length()
        };
}

// Format currency values
function formatCurrency(decimal amount, string currency = "USD") returns string {
    // Round to 2 decimal places
    decimal rounded = decimal:round(amount, 2);
    match currency {
        "USD" => { return string `$${rounded}`; }
        "EUR" => { return string `EUR ${rounded}`; }
        _ => { return string `${rounded} ${currency}`; }
    }
}
```

### Higher-Order Functions

Pass functions as arguments to create flexible pipelines:

```ballerina
// A function that accepts a transformation function
function processItems(
    LineItem[] items,
    function (LineItem) returns LineItem transform
) returns LineItem[] {
    return from LineItem item in items
        select transform(item);
}

// Usage -- apply a discount
LineItem[] discounted = processItems(order.items, function(LineItem item) returns LineItem {
    return {
        ...item,
        unitPrice: item.unitPrice * 0.9d  // 10% discount
    };
});
```

## Isolated Functions

Declare functions as `isolated` to guarantee concurrency safety. Isolated functions can only access `final` variables and other `isolated` state:

```ballerina
isolated function buildResponse(string id, string status) returns json {
    return {
        id: id,
        status: status,
        timestamp: time:utcToString(time:utcNow())
    };
}
```

Service resource functions in Ballerina are implicitly `isolated`, which is why module-level clients must be declared `final`:

```ballerina
final http:Client apiClient = check new ("https://api.example.com");

service /api on new http:Listener(8090) {
    // This is implicitly isolated -- can access 'apiClient' because it is final
    resource function get data() returns json|error {
        return apiClient->get("/data");
    }
}
```

## Reusing Functions Across Modules

### Defining Public Functions

Mark functions with the `public` qualifier to make them accessible from other modules:

```ballerina
// In module 'utils'
public function maskEmail(string email) returns string {
    int? atIndex = email.indexOf("@");
    if atIndex is int && atIndex > 2 {
        return email.substring(0, 2) + "***" + email.substring(atIndex);
    }
    return "***";
}

public function validateEmail(string email) returns boolean {
    return re `^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$`.isFullMatch(email);
}
```

### Importing and Using Functions

```ballerina
import myorg/myproject.utils;

function handleRegistration(RegistrationRequest req) returns error? {
    if !utils:validateEmail(req.email) {
        return error("Invalid email address");
    }
    log:printInfo("Registration", maskedEmail = utils:maskEmail(req.email));
    // ...
}
```

## Common Integration Patterns

### Retry Wrapper

```ballerina
function withRetry(
    function () returns json|error operation,
    int maxAttempts = 3,
    decimal delaySeconds = 1.0d
) returns json|error {
    int attempt = 0;
    while attempt < maxAttempts {
        json|error result = operation();
        if result is json {
            return result;
        }
        attempt += 1;
        if attempt < maxAttempts {
            log:printWarn("Retrying operation",
                attempt = attempt, maxAttempts = maxAttempts);
            runtime:sleep(<decimal>delaySeconds);
        }
    }
    return error("Operation failed after " + maxAttempts.toString() + " attempts");
}
```

### Batch Processing

```ballerina
function processBatch(record {}[] records, int batchSize = 100) returns error? {
    int totalRecords = records.length();
    int batchCount = 0;

    foreach int i in 0 ..< totalRecords {
        if i > 0 && i % batchSize == 0 {
            batchCount += 1;
            log:printInfo("Batch processed",
                batch = batchCount, processed = i, total = totalRecords);
        }
        check processRecord(records[i]);
    }
    log:printInfo("All batches complete", total = totalRecords);
}
```

### Validation Functions

```ballerina
type ValidationError record {|
    string 'field;
    string message;
|};

function validateOrderRequest(OrderRequest req) returns ValidationError[] {
    ValidationError[] errors = [];

    if req.items.length() == 0 {
        errors.push({'field: "items", message: "At least one item is required"});
    }
    foreach LineItem item in req.items {
        if item.quantity <= 0 {
            errors.push({'field: "items.quantity",
                message: "Quantity must be positive"});
        }
        if item.unitPrice < 0d {
            errors.push({'field: "items.unitPrice",
                message: "Price cannot be negative"});
        }
    }
    if req.customerId.trim().length() == 0 {
        errors.push({'field: "customerId",
            message: "Customer ID is required"});
    }

    return errors;
}
```

## What's Next

- [Ballerina Pro-Code](ballerina-pro-code.md) -- Advanced language features for complex function logic
- [Error Handling](error-handling.md) -- Error propagation and recovery in functions
- [Configuration Management](configuration-management.md) -- Parameterize functions with configurable values
