---
sidebar_position: 9
title: Ballerina Pro-Code
description: Write integration logic directly in Ballerina with full language capabilities, bypassing the visual designer.
---

# Ballerina Pro-Code

For advanced integration scenarios that require the full power of a programming language, you can write Ballerina code directly without the visual flow designer. Pro-code development gives you access to every Ballerina language feature -- concurrency primitives, advanced type system constructs, custom protocols, and complex algorithmic logic. The code you write is the same code the visual designer generates, so you can freely switch between the two approaches.

## When to Use Pro-Code

While the visual flow designer handles most integration patterns, pro-code is the better choice when you need:

- **Complex algorithms** -- Business logic that involves multi-step calculations, recursive processing, or stateful workflows.
- **Advanced concurrency** -- Fine-grained control over workers, strands, and message passing.
- **Custom protocols** -- Implementing non-standard wire protocols or binary formats.
- **Performance-critical paths** -- Tight loops with minimal overhead.
- **Library development** -- Building reusable Ballerina packages for your organization.
- **Full IDE experience** -- Using code completion, refactoring, and inline documentation.

## Setting Up for Pro-Code Development

### VS Code with the Ballerina Extension

1. Install the [WSO2 Integrator VS Code extension](https://marketplace.visualstudio.com/items?itemName=WSO2.wso2-integrator).
2. Open your integration project folder.
3. Switch to **Code** mode using the editor toolbar toggle.
4. The extension provides syntax highlighting, code completion, error diagnostics, and inline documentation.

### Project Structure

A standard Ballerina integration project:

```
my-integration/
├── Ballerina.toml          # Package manifest
├── Config.toml             # Runtime configuration
├── Dependencies.toml       # Resolved dependency versions
├── main.bal                # Entry point
├── types.bal               # Record and type definitions
├── utils.bal               # Utility functions
├── modules/
│   └── db/                 # Sub-module for database logic
│       ├── db.bal
│       └── queries.bal
├── tests/
│   ├── main_test.bal       # Test files
│   └── mock_data.bal
└── resources/
    └── openapi.yaml        # API specifications
```

## Writing Services

### HTTP Service

```ballerina
import ballerina/http;
import ballerina/log;

configurable int servicePort = 8090;

service /api/v1 on new http:Listener(servicePort) {

    // GET with path parameter and query parameter
    resource function get orders/[string orderId](string? fields) returns Order|http:NotFound|error {
        Order? 'order = check fetchOrder(orderId);
        if 'order is () {
            return <http:NotFound>{body: {message: "Order not found", orderId: orderId}};
        }
        return 'order;
    }

    // POST with request body validation
    resource function post orders(OrderRequest req) returns http:Created|http:BadRequest|error {
        ValidationError[] errors = validateOrderRequest(req);
        if errors.length() > 0 {
            return <http:BadRequest>{body: {errors: errors}};
        }
        string orderId = check createOrder(req);
        return <http:Created>{
            body: {orderId: orderId, status: "CREATED"},
            headers: {"Location": "/api/v1/orders/" + orderId}
        };
    }

    // PUT for full update
    resource function put orders/[string orderId](OrderRequest req)
            returns Order|http:NotFound|error {
        return check updateOrder(orderId, req);
    }

    // DELETE
    resource function delete orders/[string orderId]()
            returns http:NoContent|http:NotFound|error {
        boolean deleted = check deleteOrder(orderId);
        if !deleted {
            return <http:NotFound>{body: {message: "Order not found"}};
        }
        return http:NO_CONTENT;
    }
}
```

### GraphQL Service

```ballerina
import ballerina/graphql;

service /graphql on new graphql:Listener(9090) {

    // Query
    resource function get customer(string id) returns Customer|error {
        return fetchCustomer(id);
    }

    // Query returning a list
    resource function get orders(string customerId, int 'limit = 10) returns Order[]|error {
        return fetchOrdersByCustomer(customerId, 'limit);
    }

    // Mutation
    remote function createOrder(OrderInput input) returns Order|error {
        return createNewOrder(input);
    }
}
```

### WebSocket Service

```ballerina
import ballerina/websocket;

service /ws on new websocket:Listener(8080) {

    resource function get notifications() returns websocket:Service|error {
        return new NotificationService();
    }
}

service class NotificationService {
    *websocket:Service;

    remote function onMessage(websocket:Caller caller, string message) returns error? {
        json payload = check message.fromJsonString();
        string action = check payload.action;
        match action {
            "subscribe" => {
                string topic = check payload.topic;
                check registerSubscription(caller, topic);
            }
            "unsubscribe" => {
                string topic = check payload.topic;
                check removeSubscription(caller, topic);
            }
        }
    }

    remote function onClose(websocket:Caller caller, int statusCode, string reason) {
        removeAllSubscriptions(caller);
        log:printInfo("Client disconnected", statusCode = statusCode);
    }
}
```

## Type System

Ballerina's structural type system is central to pro-code development.

### Record Types

```ballerina
// Closed record -- only listed fields allowed
type Order record {|
    string id;
    string customerId;
    LineItem[] items;
    decimal total;
    OrderStatus status;
    string createdAt;
    string? updatedAt;   // Optional field
|};

// Open record -- additional fields allowed
type ApiResponse record {
    string status;
    int code;
    // ... any other fields from the API
};

// Enum-like type
type OrderStatus "PENDING"|"CONFIRMED"|"SHIPPED"|"DELIVERED"|"CANCELLED";
```

### Union Types

```ballerina
// A response can be one of several types
type ServiceResponse SuccessResponse|ValidationErrorResponse|NotFoundResponse;

type SuccessResponse record {|
    "success" status;
    json data;
|};

type ValidationErrorResponse record {|
    "validation_error" status;
    ValidationError[] errors;
|};

type NotFoundResponse record {|
    "not_found" status;
    string message;
|};

function handleResult(ServiceResponse response) {
    if response is SuccessResponse {
        // Type is narrowed to SuccessResponse here
        processData(response.data);
    } else if response is ValidationErrorResponse {
        logValidationErrors(response.errors);
    } else {
        log:printWarn(response.message);
    }
}
```

## Concurrency

### Workers for Parallel Execution

```ballerina
function enrichOrder(Order 'order) returns EnrichedOrder|error {
    // Launch parallel workers
    worker customerW returns Customer|error {
        return fetchCustomer('order.customerId);
    }

    worker inventoryW returns InventoryCheck|error {
        return checkInventory('order.items);
    }

    worker pricingW returns PricingResult|error {
        return calculatePricing('order.items);
    }

    // Collect results
    Customer customer = check wait customerW;
    InventoryCheck inventory = check wait inventoryW;
    PricingResult pricing = check wait pricingW;

    return {
        'order: 'order,
        customer: customer,
        inventory: inventory,
        pricing: pricing
    };
}
```

### Worker Message Passing

```ballerina
function pipeline(json[] records) returns error? {
    worker validator {
        foreach json rec in records {
            // Validate and send to processor
            json|error validated = validateRecord(rec);
            if validated is json {
                validated -> processor;
            }
        }
        // Signal completion
        "done" -> processor;
    }

    worker processor {
        while true {
            json|string msg = <- validator;
            if msg is string && msg == "done" {
                break;
            }
            if msg is json {
                error? result = saveRecord(msg);
                if result is error {
                    log:printError("Failed to save", 'error = result);
                }
            }
        }
    }

    // Wait for both workers to finish
    check wait {validator, processor};
}
```

## Error Handling Patterns

### Custom Error Types

```ballerina
type OrderError distinct error;
type ValidationError distinct error;
type PaymentError distinct error;

function processOrder(OrderRequest req) returns OrderConfirmation|OrderError {
    do {
        check validateRequest(req);
        PaymentResult payment = check chargePayment(req);
        string orderId = check persistOrder(req, payment);
        return {orderId: orderId, transactionId: payment.transactionId};
    } on fail error e {
        return error OrderError("Order processing failed", e, orderId = req.id);
    }
}
```

### Comprehensive Error Handling

```ballerina
function callExternalApi(string path, json payload) returns json|error {
    do {
        http:Response response = check apiClient->post(path, payload);

        match response.statusCode {
            200|201 => {
                return check response.getJsonPayload();
            }
            400 => {
                json body = check response.getJsonPayload();
                return error("Validation error", details = body);
            }
            401|403 => {
                return error("Authentication failed");
            }
            429 => {
                // Rate limited -- retry after delay
                string? retryAfter = check response.getHeader("Retry-After");
                decimal delay = retryAfter is string
                    ? check decimal:fromString(retryAfter) : 5.0d;
                runtime:sleep(delay);
                return callExternalApi(path, payload);
            }
            _ => {
                return error("Unexpected status: " + response.statusCode.toString());
            }
        }
    } on fail error e {
        log:printError("API call failed", path = path, 'error = e);
        return e;
    }
}
```

## Database Operations

```ballerina
import ballerina/sql;
import ballerinax/mysql;

function createOrderWithItems(OrderRequest req) returns string|error {
    // Use a transaction for atomicity
    transaction {
        sql:ExecutionResult orderResult = check orderDb->execute(
            `INSERT INTO orders (customer_id, status, total)
             VALUES (${req.customerId}, 'PENDING', ${req.total})`
        );
        string orderId = (<int>orderResult.lastInsertId).toString();

        foreach LineItem item in req.items {
            _ = check orderDb->execute(
                `INSERT INTO order_items (order_id, product_id, quantity, unit_price)
                 VALUES (${orderId}, ${item.productId}, ${item.quantity}, ${item.unitPrice})`
            );
        }

        check commit;
        return orderId;
    }
}
```

## Complete Pro-Code Example

A full order management integration written entirely in pro-code:

```ballerina
import ballerina/http;
import ballerina/log;
import ballerina/sql;
import ballerinax/mysql;

// -- Types --
type OrderRequest record {|
    string customerId;
    LineItem[] items;
    string paymentMethod;
|};

type LineItem record {|
    string productId;
    int quantity;
    decimal unitPrice;
|};

type OrderResponse record {|
    string orderId;
    string status;
    decimal total;
    string createdAt;
|};

// -- Config --
configurable string dbHost = ?;
configurable string dbUser = ?;
configurable string dbPassword = ?;
configurable string dbName = ?;
configurable int servicePort = 8090;

// -- Connections --
final mysql:Client db = check new (host = dbHost, user = dbUser,
    password = dbPassword, database = dbName);

// -- Service --
service /api on new http:Listener(servicePort) {

    resource function post orders(OrderRequest req)
            returns OrderResponse|http:BadRequest|error {
        // Validate
        if req.items.length() == 0 {
            return <http:BadRequest>{body: {message: "No items in order"}};
        }

        // Calculate total
        decimal total = from LineItem item in req.items
            collect sum(item.unitPrice * <decimal>item.quantity);

        // Persist
        string orderId = check createOrder(req, total);
        log:printInfo("Order created", orderId = orderId, total = total);

        return {
            orderId: orderId,
            status: "CREATED",
            total: total,
            createdAt: time:utcToString(time:utcNow())
        };
    }
}

function createOrder(OrderRequest req, decimal total) returns string|error {
    transaction {
        sql:ExecutionResult result = check db->execute(
            `INSERT INTO orders (customer_id, total, status)
             VALUES (${req.customerId}, ${total}, 'CREATED')`
        );
        string orderId = (<int>result.lastInsertId).toString();

        foreach LineItem item in req.items {
            _ = check db->execute(
                `INSERT INTO order_items (order_id, product_id, quantity, price)
                 VALUES (${orderId}, ${item.productId}, ${item.quantity}, ${item.unitPrice})`
            );
        }
        check commit;
        return orderId;
    }
}
```

## Switching Between Visual and Pro-Code

You can combine both approaches in the same project:

1. **Start in the visual designer** -- Scaffold the service and basic flow.
2. **Switch to code** -- Add complex logic, custom types, and advanced error handling.
3. **Return to the visual designer** -- Verify the flow structure and make quick adjustments.

The bidirectional sync ensures both views always reflect the same underlying code.

## What's Next

- [Java Interoperability](java-interoperability.md) -- Call Java libraries from your Ballerina code
- [Functions](functions.md) -- Organize pro-code logic into reusable functions
- [Error Handling](error-handling.md) -- Advanced error handling patterns
