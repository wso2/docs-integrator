---
sidebar_position: 6
title: Query Expressions
description: Use SQL-like query expressions to filter, transform, sort, group, and aggregate collections of data.
---

# Query Expressions

Query expressions bring SQL-like syntax to Ballerina, letting you filter, transform, sort, group, join, and aggregate data collections directly in your integration code. They work with arrays, streams, tables, and XML sequences, making them essential for data integration scenarios.

## Basic Query Structure

A query expression follows a familiar SQL-like pattern:

```ballerina
var result = from <source>
             where <condition>
             let <bindings>
             order by <expression>
             limit <count>
             select <projection>;
```

## From Clause

The `from` clause declares the iteration source and a variable to bind each element.

```ballerina
// From an array
Order[] activeOrders = from Order o in allOrders
    where o.status == "ACTIVE"
    select o;

// From a stream (e.g., database query results)
stream<Customer, sql:Error?> customerStream = dbClient->query(`SELECT * FROM customers`);
Customer[] customers = from Customer c in customerStream
    select c;

// From a map
string[] headerValues = from [string, string] [key, value] in headers.entries()
    select value;

// From a range
int[] evenNumbers = from int i in 0 ..< 100
    where i % 2 == 0
    select i;
```

## Where Clause

Filter elements based on conditions. Multiple `where` clauses act as logical AND.

```ballerina
// Single condition
Order[] largeOrders = from Order o in orders
    where o.totalAmount > 1000d
    select o;

// Multiple conditions (AND)
Order[] urgentLargeOrders = from Order o in orders
    where o.totalAmount > 1000d
    where o.priority == "URGENT"
    where o.status != "CANCELLED"
    select o;

// Complex conditions
Product[] matchingProducts = from Product p in catalog
    where p.price >= minPrice && p.price <= maxPrice
    where p.category == targetCategory || p.featured == true
    select p;
```

## Let Clause

Bind intermediate computed values for use in later clauses.

```ballerina
type OrderSummary record {|
    string orderId;
    string customerName;
    decimal subtotal;
    decimal tax;
    decimal total;
|};

OrderSummary[] summaries = from Order o in orders
    let decimal subtotal = calculateSubtotal(o.items)
    let decimal tax = subtotal * 0.08d
    let decimal total = subtotal + tax
    select {
        orderId: o.id,
        customerName: o.customerName,
        subtotal: subtotal,
        tax: tax,
        total: total
    };
```

## Select Clause

Project each element into a new shape. The `select` clause defines the output structure.

```ballerina
// Select specific fields
string[] customerEmails = from Customer c in customers
    select c.email;

// Transform into a different record type
type ContactInfo record {|
    string fullName;
    string email;
    string phone;
|};

ContactInfo[] contacts = from Customer c in customers
    select {
        fullName: c.firstName + " " + c.lastName,
        email: c.email,
        phone: c.phone ?: "N/A"
    };
```

## Order By Clause

Sort results by one or more expressions, ascending or descending.

```ballerina
// Sort ascending (default)
Order[] byDate = from Order o in orders
    order by o.createdAt
    select o;

// Sort descending
Order[] byAmountDesc = from Order o in orders
    order by o.totalAmount descending
    select o;

// Multi-column sort
Order[] sorted = from Order o in orders
    order by o.priority descending, o.createdAt ascending
    select o;
```

## Limit Clause

Restrict the number of results returned.

```ballerina
// Top 10 orders by amount
Order[] top10 = from Order o in orders
    order by o.totalAmount descending
    limit 10
    select o;

// Paginated results
Order[] page = from Order o in orders
    order by o.createdAt descending
    limit pageSize
    select o;
```

## Join Clause

Combine data from two collections based on a condition.

```ballerina
type OrderWithCustomer record {|
    string orderId;
    decimal amount;
    string customerName;
    string customerEmail;
|};

OrderWithCustomer[] enrichedOrders = from Order o in orders
    join Customer c in customers on o.customerId equals c.id
    select {
        orderId: o.id,
        amount: o.totalAmount,
        customerName: c.firstName + " " + c.lastName,
        customerEmail: c.email
    };
```

### Outer Join

Include elements from the left source even when there is no matching element in the right source.

```ballerina
type OrderReport record {|
    string orderId;
    decimal amount;
    string? customerName;
|};

OrderReport[] report = from Order o in orders
    outer join Customer c in customers on o.customerId equals c.id
    select {
        orderId: o.id,
        amount: o.totalAmount,
        customerName: c?.firstName
    };
```

## Group By Clause

Group elements and compute aggregates.

```ballerina
type CategorySummary record {|
    string category;
    int productCount;
    decimal avgPrice;
    decimal maxPrice;
|};

CategorySummary[] categorySummaries = from Product p in products
    group by string category = p.category
    select {
        category: category,
        productCount: p.length(),
        avgPrice: decimal:avg(...(from Product pr in p select pr.price)),
        maxPrice: decimal:max(...(from Product pr in p select pr.price))
    };
```

### Group By Multiple Keys

```ballerina
type RegionCategorySales record {|
    string region;
    string category;
    decimal totalSales;
    int orderCount;
|};

RegionCategorySales[] salesByRegionCategory = from Order o in orders
    group by string region = o.region, string category = o.category
    select {
        region: region,
        category: category,
        totalSales: decimal:sum(...(from Order ord in o select ord.totalAmount)),
        orderCount: o.length()
    };
```

## Collect Clause

Aggregate all elements into a single result without grouping.

```ballerina
type SalesTotal record {|
    int orderCount;
    decimal totalRevenue;
    decimal avgOrderValue;
|};

SalesTotal totals = from Order o in orders
    where o.status == "COMPLETED"
    collect {
        orderCount: o.length(),
        totalRevenue: decimal:sum(...(from Order ord in o select ord.totalAmount)),
        avgOrderValue: decimal:avg(...(from Order ord in o select ord.totalAmount))
    };
```

## Do Clause (Side Effects)

Use `do` instead of `select` when you want to perform actions without collecting results.

```ballerina
// Process each element without building a result collection
check from Order o in orders
    where o.status == "PENDING"
    where o.createdAt < cutoffDate
    do {
        check sendReminder(o.customerEmail, o.id);
        log:printInfo("Reminder sent", orderId = o.id);
    };
```

## Query Expressions with Streams

Query expressions work natively with streams, enabling efficient processing of database results and large datasets:

```ballerina
import ballerinax/mysql;
import ballerina/sql;

// Stream database results through a query
function getHighValueCustomers() returns CustomerSummary[]|error {
    stream<Order, sql:Error?> orderStream = dbClient->query(
        `SELECT * FROM orders WHERE created_at > '2024-01-01'`
    );

    CustomerSummary[] summaries = from Order o in orderStream
        let decimal total = o.totalAmount
        where total > 500d
        order by total descending
        select {
            customerId: o.customerId,
            orderCount: 1,
            totalSpent: total
        };

    return summaries;
}
```

## Real-World Integration Examples

### Transform API Response

```ballerina
function transformCrmContacts(json[] crmContacts) returns Contact[]|error {
    return from json contact in crmContacts
        let string firstName = check contact.first_name
        let string lastName = check contact.last_name
        where check contact.active == true
        select {
            fullName: firstName + " " + lastName,
            email: check contact.email_address,
            phone: (check contact.phone_number).toString(),
            source: "CRM"
        };
}
```

### Reconcile Two Data Sources

```ballerina
function reconcileInventory(
    Product[] catalogProducts,
    WarehouseItem[] warehouseItems
) returns DiscrepancyReport[] {
    return from Product p in catalogProducts
        join WarehouseItem w in warehouseItems on p.sku equals w.sku
        let int diff = p.stockCount - w.physicalCount
        where diff != 0
        order by int:abs(diff) descending
        select {
            sku: p.sku,
            productName: p.name,
            catalogCount: p.stockCount,
            warehouseCount: w.physicalCount,
            discrepancy: diff,
            severity: int:abs(diff) > 100 ? "HIGH" : "LOW"
        };
}
```

### Pivot Data for Reporting

```ballerina
function generateMonthlySalesReport(Order[] orders) returns MonthlySales[] {
    return from Order o in orders
        group by string month = o.createdAt.substring(0, 7)
        order by month
        select {
            month: month,
            orderCount: o.length(),
            totalRevenue: decimal:sum(...(from Order ord in o select ord.totalAmount)),
            avgOrderValue: decimal:avg(...(from Order ord in o select ord.totalAmount))
        };
}
```

## Query Expression Quick Reference

| Clause | Purpose | Example |
|---|---|---|
| `from` | Iterate source | `from Order o in orders` |
| `where` | Filter elements | `where o.amount > 100d` |
| `let` | Bind intermediate values | `let decimal tax = amount * 0.08d` |
| `join` | Combine two sources | `join Customer c in customers on ...` |
| `order by` | Sort results | `order by o.date descending` |
| `group by` | Group and aggregate | `group by string cat = p.category` |
| `limit` | Restrict result count | `limit 10` |
| `select` | Project output shape | `select {name: o.name, total: o.amount}` |
| `collect` | Aggregate all into one | `collect {count: items.length()}` |
| `do` | Side effects only | `do { check process(o); }` |

## What's Next

- [Expressions](expressions.md) -- Inline expressions used within query clauses
- [Functions](functions.md) -- Wrap query expressions in reusable functions
- [Data Persistence](/docs/develop/integration-artifacts/data-persistence) -- Query over persisted data
