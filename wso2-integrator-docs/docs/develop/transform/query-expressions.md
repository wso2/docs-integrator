---
sidebar_position: 10
title: Query Expressions
description: Use Ballerina query expressions (from/where/select/let/join/limit/order by) for data transformation.
---

# Query Expressions

Transform collections and streams declaratively using Ballerina's built-in query expression syntax. Query expressions bring SQL-like operations directly into the language, making complex data transformations readable and concise without external libraries.

## Query Expression Basics

A query expression iterates over a collection and produces a new collection using clauses like `from`, `where`, `select`, `let`, `order by`, `limit`, and `join`.

```ballerina
import ballerina/io;

type Order record {|
    string orderId;
    string customer;
    decimal total;
    string status;
|};

public function main() {
    Order[] orders = [
        {orderId: "ORD-001", customer: "Acme Corp", total: 1500.00, status: "completed"},
        {orderId: "ORD-002", customer: "Globex Inc", total: 750.50, status: "pending"},
        {orderId: "ORD-003", customer: "Acme Corp", total: 3200.00, status: "completed"},
        {orderId: "ORD-004", customer: "Initech", total: 420.00, status: "cancelled"}
    ];

    // Basic query: filter and project
    string[] completedOrderIds = from Order o in orders
        where o.status == "completed"
        select o.orderId;

    io:println(completedOrderIds); // ["ORD-001", "ORD-003"]
}
```

## The `from` Clause

The `from` clause defines the input source and iteration variable. It works with arrays, maps, streams, and tables.

```ballerina
// Iterate over an array
string[] names = from Order o in orders
    select o.customer;

// Iterate over a map
map<int> inventory = {"widget": 50, "gadget": 12, "gizmo": 0};

string[] outOfStock = from [string item, int qty] in inventory.entries()
    where qty == 0
    select item;

// Multiple from clauses (nested iteration)
string[][] tags = [["urgent", "billing"], ["support", "urgent"]];

string[] allTags = from string[] group in tags
    from string tag in group
    select tag;
```

## The `where` Clause

Filter elements with boolean expressions.

```ballerina
type Employee record {|
    string name;
    string department;
    decimal salary;
    int yearsOfService;
|};

Employee[] staff = [
    {name: "Alice", department: "Engineering", salary: 95000, yearsOfService: 5},
    {name: "Bob", department: "Sales", salary: 72000, yearsOfService: 3},
    {name: "Carol", department: "Engineering", salary: 110000, yearsOfService: 8},
    {name: "Dave", department: "Sales", salary: 68000, yearsOfService: 1}
];

// Simple filter
Employee[] engineers = from Employee e in staff
    where e.department == "Engineering"
    select e;

// Compound conditions
Employee[] seniorHighEarners = from Employee e in staff
    where e.salary > 80000 && e.yearsOfService > 4
    select e;
```

## The `let` Clause

Introduce intermediate computed values within a query.

```ballerina
type OrderSummary record {|
    string orderId;
    string customer;
    decimal total;
    decimal tax;
    decimal grandTotal;
|};

decimal taxRate = 0.08;

OrderSummary[] summaries = from Order o in orders
    where o.status == "completed"
    let decimal tax = o.total * taxRate
    let decimal grandTotal = o.total + tax
    select {
        orderId: o.orderId,
        customer: o.customer,
        total: o.total,
        tax: tax,
        grandTotal: grandTotal
    };
```

## The `select` Clause

Project and reshape data into new forms.

```ballerina
// Select specific fields into a new record type
type CustomerOrder record {|
    string customer;
    decimal amount;
|};

CustomerOrder[] customerOrders = from Order o in orders
    select {
        customer: o.customer,
        amount: o.total
    };

// Select into a different type (string formatting)
string[] orderLabels = from Order o in orders
    select string `${o.orderId}: ${o.customer} ($${o.total})`;
```

## The `order by` Clause

Sort query results by one or more fields in ascending or descending order.

```ballerina
// Sort by total descending
Order[] byTotal = from Order o in orders
    order by o.total descending
    select o;

// Sort by multiple fields
Employee[] sorted = from Employee e in staff
    order by e.department ascending, e.salary descending
    select e;
```

## The `limit` Clause

Restrict the number of results returned.

```ballerina
// Top 3 highest-value orders
Order[] top3 = from Order o in orders
    order by o.total descending
    limit 3
    select o;
```

## The `join` Clause

Combine data from two collections based on a matching condition.

```ballerina
type Customer record {|
    string id;
    string name;
    string tier;
|};

type OrderRecord record {|
    string orderId;
    string customerId;
    decimal total;
|};

type EnrichedOrder record {|
    string orderId;
    string customerName;
    string tier;
    decimal total;
|};

public function main() {
    Customer[] customers = [
        {id: "C1", name: "Acme Corp", tier: "gold"},
        {id: "C2", name: "Globex Inc", tier: "silver"},
        {id: "C3", name: "Initech", tier: "bronze"}
    ];

    OrderRecord[] orderRecords = [
        {orderId: "ORD-001", customerId: "C1", total: 1500.00},
        {orderId: "ORD-002", customerId: "C2", total: 750.50},
        {orderId: "ORD-003", customerId: "C1", total: 3200.00}
    ];

    // Join orders with customer data
    EnrichedOrder[] enriched = from OrderRecord o in orderRecords
        join Customer c in customers on o.customerId equals c.id
        select {
            orderId: o.orderId,
            customerName: c.name,
            tier: c.tier,
            total: o.total
        };
}
```

## Working with Tables

Query expressions work naturally with Ballerina tables, which provide key-based access.

```ballerina
type Product table<record {|
    readonly string sku;
    string name;
    decimal price;
    int stock;
|}> key(sku);

public function main() {
    Product catalog = table [
        {sku: "WDG-001", name: "Widget", price: 29.99, stock: 150},
        {sku: "GDG-002", name: "Gadget", price: 49.99, stock: 0},
        {sku: "GZM-003", name: "Gizmo", price: 19.99, stock: 42}
    ];

    // Query a table like any collection
    var lowStock = from var item in catalog
        where item.stock < 50 && item.stock > 0
        select {name: item.name, stock: item.stock};
}
```

## Stream Processing with Queries

Use query expressions with streams for lazy, memory-efficient processing of large datasets.

```ballerina
import ballerina/io;

type LogEntry record {|
    string timestamp;
    string level;
    string message;
|};

public function processLogs(stream<LogEntry, error?> logStream) returns error? {
    // Process a stream lazily — only matching entries are materialized
    LogEntry[] errors = from LogEntry entry in logStream
        where entry.level == "ERROR"
        select entry;

    foreach LogEntry entry in errors {
        io:println("[", entry.timestamp, "] ", entry.message);
    }
}
```

## Collecting Results

Query expressions can produce different collection types based on the context.

```ballerina
type Sale record {|
    string region;
    decimal amount;
|};

Sale[] sales = [
    {region: "North", amount: 5000},
    {region: "South", amount: 3000},
    {region: "North", amount: 7000},
    {region: "South", amount: 4500}
];

// Collect into an array (default)
decimal[] amounts = from Sale s in sales
    select s.amount;

// Collect into a string with collect clause
string report = from Sale s in sales
    select string `${s.region}: $${s.amount}`
    collect string:'join("\n");
```

## Integration Example: API Response Transformation

Combine query expressions to reshape API data for a different consumer.

```ballerina
import ballerina/http;

type SourceProduct record {
    int id;
    string name;
    decimal price;
    string category;
    boolean active;
    int stockCount;
};

type CatalogItem record {|
    string productId;
    string displayName;
    string priceLabel;
    string availability;
|};

service /api on new http:Listener(8080) {

    resource function get catalog(string? category, int maxResults = 50)
            returns CatalogItem[]|error {
        // Fetch raw product data from upstream
        SourceProduct[] products = check getProductsFromUpstream();

        // Transform using query expressions
        CatalogItem[] catalog = from SourceProduct p in products
            where p.active == true
            where category == () || p.category == category
            let string availability = p.stockCount > 0 ? "In Stock" : "Out of Stock"
            order by p.name ascending
            limit maxResults
            select {
                productId: string `PRD-${p.id}`,
                displayName: p.name,
                priceLabel: string `$${p.price}`,
                availability: availability
            };

        return catalog;
    }
}

function getProductsFromUpstream() returns SourceProduct[]|error {
    // Simulated upstream call
    return [];
}
```

## Best Practices

- **Prefer query expressions over manual loops** for filter/map/sort operations -- they are more readable and less error-prone
- **Use `let` for computed values** rather than duplicating expressions in `where` and `select`
- **Combine `order by` and `limit`** for top-N queries instead of sorting an entire collection and slicing
- **Use streams for large datasets** -- stream-based queries process elements lazily without loading everything into memory
- **Type your results explicitly** when the projected shape differs from the source to catch mapping errors at compile time

## What's Next

- [Expressions & Functions](expressions-functions.md) -- Built-in functions for string, date, math operations
- [Type System & Records](type-system.md) -- Define structured types for query results
- [Visual Data Mapper](data-mapper.md) -- Drag-and-drop data transformation
