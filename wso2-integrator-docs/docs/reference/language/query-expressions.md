---
sidebar_position: 5
title: Query Expressions
description: Complete reference for Ballerina query expressions -- from, where, let, select, collect, join, order by, and limit clauses.
---

# Query Expressions

Query expressions provide a SQL-like syntax for filtering, transforming, and aggregating data in Ballerina. They work with arrays, maps, streams, tables, and XML, making them a core tool for data transformation in integration workflows.

## Basic Syntax

```ballerina
var result = from var item in collection
             where condition
             select expression;
```

## Clauses Reference

| Clause | Purpose | Required |
|--------|---------|----------|
| `from` | Define the input source and iteration variable | Yes |
| `where` | Filter items based on a condition | No |
| `let` | Bind intermediate variables | No |
| `order by` | Sort results | No |
| `limit` | Restrict the number of results | No |
| `select` | Transform each item (produces a list) | One of `select` or `collect` |
| `collect` | Aggregate all items into a single value | One of `select` or `collect` |
| `join` | Join with another collection | No |
| `on conflict` | Handle key conflicts in table results | No |

## `from` Clause

Iterate over arrays, maps, strings, streams, tables, or XML:

```ballerina
// Array
from var item in [1, 2, 3, 4, 5]

// Map
from var [key, value] in myMap.entries()

// String (characters)
from var char in "hello"

// Table
from var row in employeeTable

// XML children
from var elem in xmlValue/<name>

// Stream
from var event in eventStream

// Integer range
from var i in 0 ..< 10
```

### Multiple `from` Clauses (Cartesian Product)

```ballerina
json[] combinations = from var color in ["red", "blue"]
                      from var size in ["S", "M", "L"]
                      select {color, size};
// [{color: "red", size: "S"}, {color: "red", size: "M"}, ...]
```

## `where` Clause

Filter items based on a boolean condition:

```ballerina
int[] evenNumbers = from var n in [1, 2, 3, 4, 5, 6]
                    where n % 2 == 0
                    select n;
// [2, 4, 6]
```

```ballerina
type Order record {
    string id;
    string status;
    decimal amount;
};

Order[] highValueOrders = from var order in orders
                          where order.status == "completed"
                          where order.amount > 1000.0
                          select order;
```

## `let` Clause

Bind intermediate computed values:

```ballerina
type OrderSummary record {
    string id;
    decimal total;
    string tier;
};

OrderSummary[] summaries = from var order in orders
                           let decimal total = order.subtotal + order.tax
                           let string tier = total > 500.0 ? "premium" : "standard"
                           select {
                               id: order.id,
                               total: total,
                               tier: tier
                           };
```

## `select` Clause

Transform each item into a new value:

```ballerina
// Extract field
string[] names = from var customer in customers
                 select customer.name;

// Transform to new record
type CustomerDTO record {
    string fullName;
    string email;
};

CustomerDTO[] dtos = from var c in customers
                     select {
                         fullName: c.firstName + " " + c.lastName,
                         email: c.email
                     };
```

## `collect` Clause

Aggregate all items into a single result:

```ballerina
// Sum
int total = from var item in lineItems
            collect sum(item.amount);

// Count
int count = from var item in lineItems
            where item.status == "active"
            collect count();

// Build a string
string csv = from var name in names
             collect string:'join(",", ...names);
```

### Aggregate Functions for `collect`

| Function | Description | Example |
|----------|-------------|---------|
| `sum(expr)` | Sum of numeric values | `collect sum(item.price)` |
| `count()` | Count of items | `collect count()` |
| `avg(expr)` | Average of numeric values | `collect avg(item.score)` |
| `min(expr)` | Minimum value | `collect min(item.price)` |
| `max(expr)` | Maximum value | `collect max(item.price)` |

## `join` Clause

Join two collections on a condition:

```ballerina
type OrderWithCustomer record {
    string orderId;
    string customerName;
    decimal amount;
};

OrderWithCustomer[] enriched = from var order in orders
                                join var customer in customers
                                on order.customerId equals customer.id
                                select {
                                    orderId: order.id,
                                    customerName: customer.name,
                                    amount: order.amount
                                };
```

### Outer Join

Use `outer join` when the right side may not have a match:

```ballerina
var results = from var order in orders
              outer join var customer in customers
              on order.customerId equals customer.id
              select {
                  orderId: order.id,
                  customerName: customer?.name ?: "Unknown"
              };
```

## `order by` Clause

Sort results by one or more fields:

```ballerina
Order[] sorted = from var order in orders
                 order by order.amount descending
                 select order;

// Multiple sort keys
var sorted = from var emp in employees
             order by emp.department ascending, emp.salary descending
             select emp;
```

## `limit` Clause

Restrict the number of results:

```ballerina
Order[] top10 = from var order in orders
                order by order.amount descending
                limit 10
                select order;
```

## `on conflict` Clause

Handle key conflicts when the result is a table:

```ballerina
table<Employee> key(id) empTable = table key(id) from var emp in employees
                                   select emp
                                   on conflict error("Duplicate employee ID");
```

## Query Actions

Use `do` instead of `select` to perform side effects:

```ballerina
from var order in orders
where order.status == "pending"
do {
    log:printInfo("Processing order", orderId = order.id);
    check processOrder(order);
};
```

## Integration Examples

### Transform API Response

```ballerina
json apiResponse = check client->get("/api/products");
json[] products = check apiResponse.ensureType();

type ProductSummary record {
    string name;
    decimal price;
    boolean inStock;
};

ProductSummary[] summaries = from var product in products
                             let json stock = check product.inventory
                             where check product.active == true
                             select {
                                 name: check product.name,
                                 price: check product.price,
                                 inStock: check stock.quantity > 0
                             };
```

### Aggregate Kafka Events

```ballerina
decimal totalRevenue = from var event in revenueEvents
                       where event.region == "us-east"
                       collect sum(event.amount);
```

## What's Next

- [Concurrency](concurrency.md) -- Workers, strands, and parallel execution
- [Type System Reference](type-system.md) -- Ballerina types in depth
- [Data Mapper](../../develop/transform/data-mapper.md) -- Visual data transformation
