---
sidebar_position: 3
title: Control Flow
description: Use conditional logic, loops, pattern matching, and parallel execution to control integration behavior.
---

# Control Flow

Control flow constructs determine the execution path of your integration logic. Use conditionals to branch, loops to iterate, pattern matching to route, and workers to execute in parallel. Each construct is available in both the visual flow designer and code.

## If/Else Statements

Branch your logic based on conditions.

### In Code

```ballerina
resource function post orders(OrderRequest req) returns OrderResponse|http:BadRequest|error {
    // Simple if/else
    if req.items.length() == 0 {
        return <http:BadRequest>{body: {message: "Order must have items"}};
    }

    // If/else if/else chain
    decimal total = calculateTotal(req.items);
    string tier;
    if total > 1000d {
        tier = "PREMIUM";
    } else if total > 500d {
        tier = "STANDARD";
    } else {
        tier = "BASIC";
    }

    return processOrderWithTier(req, tier);
}
```

### In the Visual Designer

<!-- TODO: Screenshot of an if/else node in the flow designer -->

1. Click **+** to add a node and select **If/Else**.
2. Enter the condition expression.
3. Add nodes to the **True** and **False** branches.

## Match Expressions

Match expressions provide structured pattern matching, similar to switch/case but more powerful with Ballerina's type system.

```ballerina
function routePayment(Payment payment) returns PaymentResult|error {
    // Match on value
    match payment.method {
        "credit_card" => {
            return processCreditCard(payment);
        }
        "bank_transfer" => {
            return processBankTransfer(payment);
        }
        "digital_wallet" => {
            return processDigitalWallet(payment);
        }
        _ => {
            return error("Unsupported payment method: " + payment.method);
        }
    }
}
```

### Type-Based Matching

```ballerina
type PaymentMethod CreditCard|BankTransfer|DigitalWallet;

function processPayment(PaymentMethod method) returns string|error {
    // Match on type
    if method is CreditCard {
        return "Charged card ending in " + method.lastFour;
    } else if method is BankTransfer {
        return "Transfer initiated to " + method.bankName;
    } else {
        return "Wallet payment via " + method.provider;
    }
}
```

### Binding Patterns

```ballerina
function handleResponse(json response) returns string {
    // Match with binding patterns
    if response is map<json> {
        json|error status = response.status;
        if status is string && status == "success" {
            return "Operation succeeded";
        }
        return "Operation completed with status: " + response.toString();
    }
    return "Unexpected response format";
}
```

## Foreach Loops

Iterate over arrays, maps, and other iterable types.

```ballerina
function processOrderItems(LineItem[] items) returns decimal {
    decimal total = 0;

    // Basic foreach
    foreach LineItem item in items {
        total += item.unitPrice * <decimal>item.quantity;
    }

    return total;
}

// Foreach with index using .enumerate()
function logItems(LineItem[] items) {
    foreach int i in 0 ..< items.length() {
        log:printInfo("Item " + i.toString(), name = items[i].productName);
    }
}

// Foreach over a map
function processHeaders(map<string> headers) {
    foreach [string, string] [key, value] in headers.entries() {
        log:printInfo("Header", key = key, value = value);
    }
}
```

### Foreach with Early Termination

Use a combination of foreach and error handling to break out of loops:

```ballerina
function findFirstMatch(Order[] orders, string customerId) returns Order? {
    Order? found = ();
    foreach Order 'order in orders {
        if 'order.customerId == customerId {
            found = 'order;
            break;
        }
    }
    return found;
}
```

## While Loops

Execute a block repeatedly while a condition is true.

```ballerina
function pollUntilComplete(string jobId) returns JobResult|error {
    int maxAttempts = 30;
    int attempt = 0;

    while attempt < maxAttempts {
        JobStatus status = check checkJobStatus(jobId);

        if status.state == "COMPLETED" {
            return status.result;
        }
        if status.state == "FAILED" {
            return error("Job failed: " + status.errorMessage);
        }

        // Wait before polling again
        runtime:sleep(2);
        attempt += 1;
    }

    return error("Job timed out after " + maxAttempts.toString() + " attempts");
}
```

## Do Blocks

Use `do` blocks to create scoped execution with error handling:

```ballerina
function processWithScope() returns error? {
    do {
        json data = check fetchData();
        check validateData(data);
        check saveData(data);
        log:printInfo("Data processed successfully");
    } on fail error e {
        log:printError("Processing failed", 'error = e);
        check sendAlert("Data processing failed: " + e.message());
    }
}
```

## Parallel Execution with Workers

Execute multiple branches concurrently using Ballerina workers.

```ballerina
function enrichOrderData(Order 'order) returns EnrichedOrder|error {
    // Execute three API calls in parallel
    worker customerWorker returns Customer|error {
        return fetchCustomer('order.customerId);
    }

    worker inventoryWorker returns InventoryStatus[]|error {
        return checkInventory('order.items);
    }

    worker pricingWorker returns PricingResult|error {
        return calculatePricing('order.items);
    }

    // Wait for all workers and combine results
    Customer|error customer = wait customerWorker;
    InventoryStatus[]|error inventory = wait inventoryWorker;
    PricingResult|error pricing = wait pricingWorker;

    return {
        'order: 'order,
        customer: check customer,
        inventory: check inventory,
        pricing: check pricing
    };
}
```

### Wait for Any (First Response)

```ballerina
function fetchFromFastestSource(string key) returns json|error {
    worker primaryWorker returns json|error {
        return primaryApi->get("/data/" + key);
    }

    worker fallbackWorker returns json|error {
        runtime:sleep(1); // Give primary a head start
        return fallbackApi->get("/data/" + key);
    }

    // Return whichever completes first
    json|error result = wait primaryWorker | fallbackWorker;
    return result;
}
```

## Range Expressions

Iterate over numeric ranges:

```ballerina
// Exclusive upper bound: 0, 1, 2, ..., 9
foreach int i in 0 ..< 10 {
    log:printInfo("Index: " + i.toString());
}

// Inclusive upper bound: 1, 2, 3, ..., 10
foreach int i in 1 ... 10 {
    log:printInfo("Page: " + i.toString());
}
```

## Visual Designer Representation

Each control flow construct has a visual representation in the flow designer:

| Construct | Visual Node |
|---|---|
| If/Else | Diamond shape with True/False branches |
| Match | Diamond with multiple labeled branches |
| Foreach | Loop block with iteration variable |
| While | Loop block with condition |
| Parallel | Fork node that splits into concurrent branches |

<!-- TODO: Screenshot showing all control flow nodes in the visual designer palette -->

## What's Next

- [Error Handling](error-handling.md) -- Handle failures within your control flow
- [Expressions](expressions.md) -- Write conditions and transformations
- [Query Expressions](query-expressions.md) -- Functional-style iteration with query syntax
