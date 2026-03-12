---
sidebar_position: 6
title: Data Persistence
description: Persist integration state and application data using bal persist with support for 7 data stores.
---

# Data Persistence

Data persistence artifacts let you store and retrieve data directly from your integrations using `bal persist` -- Ballerina's built-in ORM-like persistence layer. Define your data model declaratively, and `bal persist` generates type-safe client code for CRUD operations against your chosen data store.

## Supported Data Stores

`bal persist` supports seven data stores out of the box:

| Data Store | Module | Use Case |
|---|---|---|
| **MySQL** | `ballerinax/persist.sql` | Traditional RDBMS, high read/write throughput |
| **PostgreSQL** | `ballerinax/persist.sql` | Advanced queries, JSON support, extensions |
| **Microsoft SQL Server** | `ballerinax/persist.sql` | Enterprise SQL Server environments |
| **SQLite** | `ballerinax/persist.sql` | Embedded databases, local development, testing |
| **Google Sheets** | `ballerinax/persist.googlesheets` | Lightweight data, business user access |
| **Redis** | `ballerinax/persist.redis` | Cache, session store, high-speed key-value |
| **In-Memory** | `ballerina/persist` | Testing, prototyping, ephemeral state |

## Setting Up Data Persistence

### Step 1: Define the Data Model

Create a `persist/model.bal` file in your project that defines entities using Ballerina record types.

```ballerina
// persist/model.bal
import ballerina/persist as _;
import ballerinax/persist.sql;

@sql:Name {value: "customers"}
type Customer record {|
    @sql:Generated
    readonly int id;
    string name;
    string email;
    string phone?;
    string createdAt;
    Order[] orders;    // One-to-many relation
|};

@sql:Name {value: "orders"}
type Order record {|
    @sql:Generated
    readonly int id;
    string orderId;
    string status;
    decimal totalAmount;
    string createdAt;
    @sql:Relation {keys: ["customerId"]}
    Customer customer; // Many-to-one relation
    int customerId;
    OrderItem[] items; // One-to-many relation
|};

@sql:Name {value: "order_items"}
type OrderItem record {|
    @sql:Generated
    readonly int id;
    string productName;
    int quantity;
    decimal unitPrice;
    @sql:Relation {keys: ["orderId"]}
    Order 'order;
    int orderId;
|};
```

### Step 2: Generate the Persistence Client

Run the `bal persist generate` command to generate type-safe client code:

```bash
# Generate persistence client for MySQL
bal persist generate --datastore mysql

# Generate for PostgreSQL
bal persist generate --datastore postgresql

# Generate for in-memory (default)
bal persist generate
```

This generates a `generated/` directory with:

- `persist_client.bal` -- The type-safe client with CRUD methods
- `persist_types.bal` -- Generated types for queries and inserts
- `script.sql` -- Database migration script (for SQL data stores)

### Step 3: Configure the Data Store

Add connection details to `Config.toml`:

```toml
# Config.toml for MySQL
[<packageOrg>.<packageName>]
host = "localhost"
port = 3306
user = "root"
password = ""
database = "integration_db"
```

### Step 4: Run the Migration

Apply the generated SQL script to create tables:

```bash
# The generated script creates tables with proper relationships
mysql -u root integration_db < generated/script.sql
```

## CRUD Operations

The generated client provides type-safe methods for all CRUD operations.

### Create

```ballerina
import ballerina/persist;

final persist:Client dbClient = check new ();

function createCustomer(string name, string email) returns Customer|error {
    CustomerInsert newCustomer = {
        name: name,
        email: email,
        createdAt: time:utcToString(time:utcNow())
    };

    int[] ids = check dbClient->/customers.post([newCustomer]);
    return check dbClient->/customers/[ids[0]];
}
```

### Read

```ballerina
// Get by ID
function getCustomer(int id) returns Customer|error {
    return check dbClient->/customers/[id];
}

// Get all with filtering
function getActiveOrders() returns Order[]|error {
    stream<Order, persist:Error?> orderStream = dbClient->/orders;
    return from Order 'order in orderStream
        where 'order.status == "ACTIVE"
        select 'order;
}

// Get with related entities
function getCustomerWithOrders(int customerId) returns Customer|error {
    return check dbClient->/customers/[customerId];
    // Related orders are accessible via customer.orders
}
```

### Update

```ballerina
function updateOrderStatus(int id, string newStatus) returns Order|error {
    OrderUpdate updateData = {
        status: newStatus
    };
    return check dbClient->/orders/[id].put(updateData);
}
```

### Delete

```ballerina
function deleteOrder(int id) returns error? {
    _ = check dbClient->/orders/[id].delete();
}
```

## Data Store Specific Examples

### MySQL Persistence

```ballerina
// Ballerina.toml
// [[dependency]]
// org = "ballerinax"
// name = "persist.sql"

// Config.toml
// host = "localhost"
// port = 3306
// user = "root"
// password = "secret"
// database = "mydb"

function queryWithNativeSQL() returns Customer[]|error {
    // For complex queries, use the native SQL client alongside persist
    stream<Customer, sql:Error?> results = dbClient->query(
        `SELECT c.*, COUNT(o.id) as order_count
         FROM customers c
         LEFT JOIN orders o ON c.id = o.customer_id
         GROUP BY c.id
         HAVING order_count > 5`
    );
    return from Customer c in results select c;
}
```

### PostgreSQL Persistence

```ballerina
// PostgreSQL supports JSONB columns for flexible schema
@sql:Name {value: "products"}
type Product record {|
    @sql:Generated
    readonly int id;
    string name;
    decimal price;
    json metadata;    // Stored as JSONB in PostgreSQL
    string[] tags;    // Stored as TEXT[] in PostgreSQL
|};
```

### Google Sheets Persistence

Use Google Sheets as a lightweight data store, useful for business user-accessible data and prototyping.

```ballerina
// persist/model.bal for Google Sheets
import ballerinax/persist.googlesheets;

type Expense record {|
    readonly string id;
    string date;
    string category;
    decimal amount;
    string description;
    string submittedBy;
|};
```

```toml
# Config.toml for Google Sheets
[<packageOrg>.<packageName>]
spreadsheetId = "your-google-sheet-id"
clientId = "your-client-id"
clientSecret = "your-client-secret"
refreshToken = "your-refresh-token"
```

### Redis Persistence

Use Redis for high-speed key-value storage, caching, and session management.

```ballerina
// persist/model.bal for Redis
type Session record {|
    readonly string id;
    string userId;
    string token;
    string expiresAt;
    json metadata;
|};

type CacheEntry record {|
    readonly string key;
    string value;
    string ttl;
|};
```

```toml
# Config.toml for Redis
[<packageOrg>.<packageName>]
host = "localhost"
port = 6379
password = ""
```

### In-Memory Persistence

Ideal for testing and prototyping without external dependencies.

```ballerina
// No Config.toml needed for in-memory
// Data persists only for the lifetime of the application

// Generate with:
// bal persist generate --datastore inmemory
```

## Relationships

`bal persist` supports three relationship types:

### One-to-One

```ballerina
type Employee record {|
    readonly int id;
    string name;
    EmployeeProfile profile; // One-to-one
|};

type EmployeeProfile record {|
    readonly int id;
    string bio;
    string photoUrl;
    @sql:Relation {keys: ["employeeId"]}
    Employee employee;
    int employeeId;
|};
```

### One-to-Many

```ballerina
type Department record {|
    readonly int id;
    string name;
    Employee[] employees; // One-to-many
|};
```

### Many-to-Many

Model many-to-many relationships using an explicit join entity:

```ballerina
type Student record {|
    readonly int id;
    string name;
    Enrollment[] enrollments;
|};

type Course record {|
    readonly int id;
    string title;
    Enrollment[] enrollments;
|};

type Enrollment record {|
    readonly int id;
    @sql:Relation {keys: ["studentId"]}
    Student student;
    int studentId;
    @sql:Relation {keys: ["courseId"]}
    Course course;
    int courseId;
    string enrolledAt;
|};
```

## Migrations

When your data model changes, regenerate the persistence client and apply the updated migration script:

```bash
# Regenerate after model changes
bal persist generate --datastore mysql

# Review the generated SQL
cat generated/script.sql

# Apply to database
mysql -u root integration_db < generated/script.sql
```

:::info Migration Strategy
For production databases, use a dedicated migration tool (such as Flyway or Liquibase) rather than applying generated scripts directly. The generated `script.sql` serves as a reference for creating proper migration files.
:::

## What's Next

- [Other Artifacts](other-artifacts.md) -- Types, connections, configurations, functions, and data mappers
- [Query Expressions](/docs/develop/design-logic/query-expressions) -- Use SQL-like queries to filter and transform persist results
- [Configuration Management](/docs/develop/design-logic/configuration-management) -- Manage data store credentials per environment
