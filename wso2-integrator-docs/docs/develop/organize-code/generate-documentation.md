---
sidebar_position: 7
title: Generate Documentation
description: Generate API documentation from Ballerina source code comments.
---

# Generate Documentation

Produce professional API documentation directly from your Ballerina source code. The `bal doc` command generates HTML documentation from documentation comments (`#` comments) attached to public functions, types, services, and modules, giving consumers of your integration packages a clear reference without maintaining separate documentation.

## Writing Documentation Comments

Ballerina uses `#` comments (not `//`) for documentation. Place them immediately above the declaration they document.

### Function Documentation

```ballerina
# Validates an incoming order request against business rules.
#
# Checks that the order has at least one item, all quantities are positive,
# and the customer exists in the system.
#
# + request - The order request to validate
# + return - Nil on success, or an error describing the validation failure
public function validateOrder(OrderRequest request) returns error? {
    if request.items.length() == 0 {
        return error("Order must contain at least one item");
    }
    foreach OrderItem item in request.items {
        if item.quantity <= 0 {
            return error("Item quantity must be positive: " + item.productId);
        }
    }
}
```

### Record Type Documentation

```ballerina
# Represents a customer order in the system.
#
# An order progresses through states: pending -> confirmed -> shipped -> delivered.
# Orders can be cancelled at any point before shipping.
#
# + id - Unique order identifier (auto-generated)
# + customerId - Reference to the customer who placed the order
# + items - Line items included in the order
# + total - Calculated total including tax
# + status - Current lifecycle state of the order
# + createdAt - ISO 8601 timestamp when the order was created
public type Order record {|
    string id;
    string customerId;
    OrderItem[] items;
    decimal total;
    OrderStatus status;
    string createdAt;
|};

# Represents a single line item in an order.
#
# + productId - SKU or product identifier
# + name - Human-readable product name
# + quantity - Number of units ordered (must be positive)
# + unitPrice - Price per unit in the order currency
public type OrderItem record {|
    string productId;
    string name;
    int quantity;
    decimal unitPrice;
|};
```

### Service Documentation

```ballerina
# Order management API service.
#
# Provides CRUD operations for customer orders with support for
# order creation, status tracking, and cancellation.
service /api/v1 on new http:Listener(9090) {

    # Creates a new order for a customer.
    #
    # + request - The order creation request
    # + return - The created order with generated ID, or an error
    resource function post orders(OrderRequest request)
            returns Order|http:BadRequest|error {
        // ...
    }

    # Retrieves an order by its unique identifier.
    #
    # + id - The order ID to look up
    # + return - The order details, 404 if not found, or an error
    resource function get orders/[string id]()
            returns Order|http:NotFound|error {
        // ...
    }
}
```

### Enum and Constant Documentation

```ballerina
# Represents the lifecycle states of an order.
public enum OrderStatus {
    # Order has been received but not yet processed
    PENDING,
    # Order has been validated and confirmed
    CONFIRMED,
    # Order has been handed off to shipping
    SHIPPED,
    # Order has been delivered to the customer
    DELIVERED,
    # Order was cancelled before shipping
    CANCELLED
}

# The standard tax rate applied to all orders.
public const decimal TAX_RATE = 0.08;
```

## Generating the Documentation

### Basic Generation

```bash
# Generate docs for the current package
bal doc

# Output location: target/apidocs/
```

### Viewing the Generated Docs

```bash
# Open the generated documentation in a browser
open target/apidocs/index.html

# Or serve it locally
cd target/apidocs && python3 -m http.server 8000
```

<!-- TODO: Screenshot of generated API documentation -->

### Module Documentation (Module.md)

Create a `Module.md` file in each module directory to provide module-level documentation.

```markdown
# Database Operations Module

This module handles all database interactions for the order service,
including connection management, CRUD queries, and transaction handling.

## Usage

```ballerina
import myorg/order_service.db;

Order order = check db:getOrder("ORD-001");
check db:updateOrderStatus("ORD-001", SHIPPED);
```

## Configuration

The module requires the following configurable values:

| Config Key | Description | Default |
|-----------|-------------|---------|
| `dbHost` | Database hostname | `localhost` |
| `dbPort` | Database port | `5432` |
| `dbName` | Database name | `orders` |
```

### Package Documentation (Package.md)

Create a `Package.md` at the package root for the landing page on Ballerina Central.

```markdown
# Order Service

A Ballerina integration service for processing customer orders,
managing inventory, and dispatching notifications.

## Features

- RESTful API for order management
- Real-time inventory validation
- Kafka-based notification dispatch
- PostgreSQL persistence

## Quick Start

```ballerina
import myorg/order_service;

// The service starts automatically on port 9090
```
```

## Documentation Best Practices

### Document Parameters and Return Types

Always document every parameter and the return type.

```ballerina
# Calculates shipping cost based on weight, destination, and service level.
#
# + weightKg - Package weight in kilograms
# + destinationCountry - ISO 3166-1 alpha-2 country code
# + serviceLevel - Shipping speed: "standard", "express", or "overnight"
# + return - The calculated shipping cost in USD, or an error if the
#            destination is not supported
public function calculateShipping(
        decimal weightKg,
        string destinationCountry,
        string serviceLevel) returns decimal|error {
    // ...
}
```

### Use Code Examples in Documentation

Include usage examples in documentation comments.

```ballerina
# Converts a CSV string into an array of typed records.
#
# ```ballerina
# string csv = "name,age\nAlice,30\nBob,25";
# Person[] people = check parseCsv(csv);
# // people = [{name: "Alice", age: 30}, {name: "Bob", age: 25}]
# ```
#
# + csvContent - The raw CSV string with headers in the first row
# + return - An array of records matching the CSV structure, or a parse error
public function parseCsv(string csvContent) returns record{}[]|error {
    // ...
}
```

### Document Error Conditions

Explain when and why errors are returned.

```ballerina
# Processes a payment for the given order.
#
# + orderId - The order to charge
# + amount - The amount to charge in USD
# + return - The payment confirmation ID on success, or an error if:
#            - the order does not exist (OrderNotFoundError)
#            - the payment is declined (PaymentDeclinedError)
#            - the payment gateway is unavailable (GatewayError)
public function processPayment(string orderId, decimal amount)
        returns string|error {
    // ...
}
```

## Generating Docs for CI/CD

Include documentation generation in your CI pipeline.

```yaml
# GitHub Actions
- name: Generate API documentation
  run: bal doc

- name: Deploy docs to GitHub Pages
  uses: peaceiris/actions-gh-pages@v3
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    publish_dir: ./target/apidocs
```

## Best Practices

- **Document all public declarations** -- every public function, type, constant, and service should have a documentation comment
- **Write the first line as a summary** -- tools and IDEs display the first line as a brief description
- **Include code examples** for complex functions to show typical usage
- **Keep documentation up-to-date** -- update docs when function signatures or behavior change
- **Generate docs in CI** to catch missing documentation early
- **Use Module.md and Package.md** to provide high-level context for consumers

## What's Next

- [Style Guide](style-guide.md) -- Coding conventions for consistent code
- [Static Code Analysis](static-code-analysis.md) -- Automated code quality checks
- [Publish to Ballerina Central](/docs/connectors/publish-to-central) -- Share your documented package
