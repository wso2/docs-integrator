---
sidebar_position: 2
title: Packages & Modules
description: Understand the Ballerina package and module hierarchy for organizing integration code.
---

# Packages & Modules

Organize your integration code into packages and modules for clear separation of concerns, independent testing, and reuse across projects. A Ballerina package is the unit of compilation, versioning, and distribution, while modules are the logical subdivisions within a package.

## Package Structure

A Ballerina package is defined by its `Ballerina.toml` file. Every file in the package root directory belongs to the default module.

```
order-service/
├── Ballerina.toml         # Package manifest (required)
├── Dependencies.toml      # Locked dependencies (auto-managed)
├── Package.md             # Package documentation (displayed on Central)
├── service.bal            # Default module source
├── types.bal              # Default module source
├── utils.bal              # Default module source
├── resources/             # Resource files accessible at runtime
│   └── schema.json
└── tests/                 # Tests for the default module
    ├── Config.toml
    └── service_test.bal
```

### Ballerina.toml

The package manifest defines the package identity and build configuration.

```toml
[package]
org = "myorg"
name = "order_service"
version = "1.0.0"
distribution = "2201.11.0"

[build-options]
observabilityIncluded = true
```

| Field | Description |
|-------|-------------|
| `org` | Your organization name on Ballerina Central |
| `name` | Package name (must be a valid Ballerina identifier) |
| `version` | Semantic version |
| `distribution` | Minimum Ballerina distribution required |

## Modules

Modules let you organize code within a package into logical groups. Each module has its own namespace, visibility rules, and test directory.

### Default Module

Files in the package root directory (next to `Ballerina.toml`) belong to the default module. This is where your main service or entry point lives.

```ballerina
// service.bal (default module)
import ballerina/http;
import myorg/order_service.db;         // Import a submodule
import myorg/order_service.notifications;

service /api on new http:Listener(9090) {

    resource function post orders(json payload) returns json|error {
        json result = check db:insertOrder(payload);
        check notifications:sendOrderConfirmation(result);
        return result;
    }
}
```

### Submodules

Create submodules in the `modules/` directory. Each subdirectory is a separate module.

```
order-service/
├── Ballerina.toml
├── service.bal
├── modules/
│   ├── db/
│   │   ├── Module.md          # Module documentation
│   │   ├── queries.bal        # Database query functions
│   │   ├── connection.bal     # Connection management
│   │   └── tests/
│   │       └── queries_test.bal
│   ├── notifications/
│   │   ├── Module.md
│   │   ├── email.bal
│   │   ├── sms.bal
│   │   └── tests/
│   │       └── email_test.bal
│   └── models/
│       ├── Module.md
│       ├── order.bal          # Order-related types
│       └── customer.bal       # Customer-related types
└── tests/
    └── integration_test.bal
```

### Creating a Submodule

```bash
# Create a new submodule
bal add db
# Creates: modules/db/db.bal and modules/db/Module.md

bal add notifications
# Creates: modules/notifications/notifications.bal
```

## Visibility and Access Control

Ballerina uses access modifiers to control what is visible outside a module.

### Public vs Module-Private

```ballerina
// modules/db/queries.bal

// Public: accessible from other modules and external packages
public function insertOrder(json order) returns json|error {
    return internalInsert(order);
}

// Public type: accessible from other modules
public type OrderRecord record {|
    string id;
    string customer;
    decimal total;
|};

// Module-private: only accessible within the db module
function internalInsert(json order) returns json|error {
    // Internal implementation detail
    return order;
}

// Module-private type
type ConnectionConfig record {|
    string host;
    int port;
    string database;
|};
```

### Importing Submodules

```ballerina
// Import a submodule from the same package
import myorg/order_service.db;
import myorg/order_service.notifications;
import myorg/order_service.models;

// Use with the module prefix
db:OrderRecord order = check db:insertOrder(payload);
check notifications:sendOrderConfirmation(order);
```

### Import Aliases

Use aliases to shorten long module names or resolve conflicts.

```ballerina
import myorg/order_service.notifications as notify;
import ballerinax/postgresql as pg;

// Use the alias
check notify:sendEmail(to, subject, body);
pg:Client dbClient = check new (...);
```

## Organizing Source Files

### File Organization Patterns

Split code across files by concern within a module.

```
modules/db/
├── connection.bal     # Connection setup and pooling
├── order_queries.bal  # Order-related queries
├── customer_queries.bal # Customer-related queries
├── migrations.bal     # Schema migration utilities
└── tests/
    ├── order_queries_test.bal
    └── customer_queries_test.bal
```

All `.bal` files in a module directory share the same namespace -- no explicit imports needed between files in the same module.

```ballerina
// modules/db/connection.bal
configurable string dbHost = "localhost";
configurable int dbPort = 5432;

public function getConnection() returns Client|error {
    return new Client(dbHost, dbPort);
}
```

```ballerina
// modules/db/order_queries.bal
// Can directly use getConnection() from connection.bal -- same module
public function insertOrder(json order) returns json|error {
    Client conn = check getConnection();
    // ...
    return order;
}
```

## Resource Files

Store static files (schemas, templates, config files) in the `resources/` directory.

```ballerina
import ballerina/io;

public function loadSchema() returns json|error {
    // Access resource files at runtime
    json schema = check io:fileReadJson("resources/order-schema.json");
    return schema;
}
```

## Multi-File Type Definitions

For large projects, centralize shared types in a dedicated file or module.

```ballerina
// types.bal (default module)
// Shared types used across the service

public type Order record {|
    string id;
    string customerId;
    OrderItem[] items;
    decimal total;
    OrderStatus status;
|};

public type OrderItem record {|
    string productId;
    string name;
    int quantity;
    decimal unitPrice;
|};

public enum OrderStatus {
    PENDING,
    CONFIRMED,
    SHIPPED,
    DELIVERED,
    CANCELLED
}
```

## Best Practices

- **One service per package** -- each integration service should be its own package for independent deployment
- **Use submodules for internal boundaries** -- separate database, notification, and transformation logic into modules
- **Keep the default module thin** -- it should wire together submodules, not contain business logic
- **Use public/private access intentionally** -- expose only what other modules need
- **Name files by content** -- `order_queries.bal` is clearer than `utils.bal`
- **Create `Module.md`** for each submodule to document its purpose

## What's Next

- [Package References & Imports](package-references.md) -- Import external packages
- [Manage Dependencies](manage-dependencies.md) -- Lock and update dependency versions
- [Workspaces](workspaces.md) -- Work with multiple packages together
