---
sidebar_position: 5
title: Expressions
description: Use the Ballerina expression language for inline data transformations, conditions, and computations.
---

# Expressions

Expressions are the building blocks of integration logic. They compute values, transform data, evaluate conditions, and construct payloads. Ballerina provides a rich expression language that is type-safe, null-aware, and designed for data-centric programming.

## Where Expressions Are Used

Expressions appear everywhere in your integration code:

- **Conditions**: `if`, `while`, and `match` guards
- **Variable assignments**: Computing values from inputs
- **Function arguments**: Inline transformation before passing data
- **Template literals**: Constructing strings, XML, and regular expressions
- **Resource paths**: Dynamic URL segments and query parameters

## Arithmetic Expressions

```ballerina
decimal subtotal = item.price * <decimal>item.quantity;
decimal tax = subtotal * 0.08d;
decimal total = subtotal + tax;

int remainder = total % batchSize;
float percentage = <float>completed / <float>total * 100.0;
```

## String Expressions

### Template Literals

```ballerina
string greeting = string `Hello, ${customer.firstName} ${customer.lastName}!`;
string url = string `/api/v2/orders/${orderId}/items`;
string query = string `SELECT * FROM orders WHERE status = '${status}'`;
```

### String Operations

```ballerina
// Length
int len = name.length();

// Substring
string first3 = name.substring(0, 3);

// Case conversion
string upper = name.toUpperAscii();
string lower = name.toLowerAscii();

// Trim whitespace
string trimmed = input.trim();

// Contains, starts with, ends with
boolean hasAt = email.includes("@");
boolean isOrder = ref.startsWith("ORD-");
boolean isCsv = filename.endsWith(".csv");

// Join array to string
string csv = string:'join(",", ...tags);

// Split
string[] parts = re `,`.split(csvLine);
```

### Regular Expressions

```ballerina
import ballerina/regexp;

// Match a pattern
boolean isValidEmail = re `^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$`.isFullMatch(email);

// Replace
string sanitized = re `[^a-zA-Z0-9]`.replaceAll(input, "_");

// Extract groups
regexp:Groups? groups = re `(\d{3})-(\d{3})-(\d{4})`.findGroups(phone);
if groups is regexp:Groups {
    string areaCode = (<regexp:Span>groups[1]).substring();
}
```

## Numeric Type Conversions

```ballerina
// int to decimal
decimal d = <decimal>intValue;

// string to int
int|error i = int:fromString("42");

// string to decimal
decimal|error dec = decimal:fromString("19.99");

// int to float
float f = <float>intValue;

// decimal to string (with formatting)
string price = "$" + total.toString();
```

## Nil-Aware Expressions

Ballerina's type system tracks nullable values. Use nil-aware operators to handle them safely.

### Elvis Operator

```ballerina
// Use default value if nil
string name = customer.middleName ?: "";
int port = configuredPort ?: 8080;
```

### Optional Field Access

```ballerina
// Safe navigation for optional fields
string? city = customer?.address?.city;

// With default
string cityOrDefault = customer?.address?.city ?: "Unknown";
```

### Nil Check

```ballerina
// Explicit nil check
string? email = getEmail(userId);
if email is string {
    // email is narrowed to 'string' (non-nil) in this block
    sendEmail(email);
}

// Pattern: check and use
string? value = map.get(key);
if value is () {
    log:printWarn("Key not found", key = key);
}
```

## Conditional Expressions

### Ternary-Style with If

```ballerina
// Ballerina uses if/else as an expression in let bindings
string tier = total > 1000d ? "PREMIUM" : "STANDARD";
// Note: Ballerina does not have a ternary operator, use if/else instead
string tier;
if total > 1000d {
    tier = "PREMIUM";
} else {
    tier = "STANDARD";
}
```

## JSON Expressions

### Constructing JSON

```ballerina
json payload = {
    orderId: order.id,
    customer: {
        name: customer.firstName + " " + customer.lastName,
        email: customer.email
    },
    items: from LineItem item in order.items
        select {
            sku: item.productId,
            qty: item.quantity,
            price: item.unitPrice
        },
    metadata: {
        createdAt: time:utcToString(time:utcNow()),
        source: "integration"
    }
};
```

### Accessing JSON Fields

```ballerina
json response = check httpClient->get("/api/data");

// Field access (returns json|error)
json|error name = response.name;
json|error nested = response.customer.address.city;

// Convert to specific type
string customerName = check response.name;
int count = check response.totalCount;
```

## XML Expressions

### XML Template Literals

```ballerina
xml invoice = xml `
    <Invoice>
        <InvoiceNumber>${invoiceId}</InvoiceNumber>
        <Customer>${customerName}</Customer>
        <Total>${total.toString()}</Total>
        <Items>
            ${from LineItem item in items
                select xml `<Item sku="${item.productId}">
                    <Quantity>${item.quantity}</Quantity>
                    <Price>${item.unitPrice.toString()}</Price>
                </Item>`}
        </Items>
    </Invoice>
`;
```

### XML Navigation

```ballerina
// Child elements
xml items = invoice/<Items>;

// Descendants
xml allPrices = invoice/**/<Price>;

// Filter by name
xml invoiceNumbers = invoice/<InvoiceNumber>;
```

## Collection Expressions

### Array Operations

```ballerina
// Create
string[] tags = ["urgent", "billing", "support"];

// Length
int count = tags.length();

// Push/pop
tags.push("new-tag");

// Spread operator
string[] allTags = [...existingTags, ...newTags];

// Slice
string[] firstTwo = tags.slice(0, 2);
```

### Map Operations

```ballerina
// Create
map<string> headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + token
};

// Access
string? contentType = headers["Content-Type"];

// Check existence
boolean hasAuth = headers.hasKey("Authorization");

// Iterate
foreach [string, string] [key, value] in headers.entries() {
    log:printInfo(key + ": " + value);
}
```

## Type Expressions

### Type Check

```ballerina
// Type checking with 'is'
if response is http:Response {
    int statusCode = response.statusCode;
} else if response is error {
    log:printError("Request failed", 'error = response);
}
```

### Type Cast

```ballerina
// Safe cast with check
decimal amount = check response.ensureType(decimal);

// Direct cast (panics on failure)
string name = <string>jsonValue;

// Convert JSON to record
Customer customer = check jsonPayload.fromJsonWithType();
```

## Let Expressions

Bind intermediate values within an expression:

```ballerina
string summary = let decimal subtotal = calculateSubtotal(items),
                     decimal tax = subtotal * 0.08d,
                     decimal total = subtotal + tax
                 in string `Subtotal: $${subtotal}, Tax: $${tax}, Total: $${total}`;
```

## What's Next

- [Query Expressions](query-expressions.md) -- SQL-like expressions for filtering and transforming collections
- [Functions](functions.md) -- Encapsulate expressions in reusable functions
- [Ballerina Pro-Code](ballerina-pro-code.md) -- Full language features for complex expressions
