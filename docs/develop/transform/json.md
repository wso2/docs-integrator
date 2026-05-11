---
title: JSON Processing
---

# JSON Processing

JSON is a lightweight, text-based data exchange format derived from JavaScript. It is widely used in web services, APIs, microservices, and other connected applications, making it the most common data format in modern integration and API development.

WSO2 Integrator provides built-in support for JSON processing, allowing developers to easily create, read, modify, validate, and transform JSON data without relying on external libraries. This native support simplifies integration development and enables efficient handling of JSON payloads across different systems and services.

## Creating JSON values

Construct JSON directly using Ballerina literals. The `json` type accepts null, booleans, numbers, strings, arrays, and maps.

1. **Add a Variable step**: In the flow designer, click **+** and select **Declare Variable**. Set the type to `json` and enter a JSON literal as the expression.

2. **Build nested structures**: Add additional **Variable** steps for nested JSON objects and arrays. Each variable appears as a separate **Declare Variable** step in the flow.

   ![Flow designer showing Declare Variable steps for JSON literal construction including nested objects and arrays](/img/develop/transform/json/json-creating-flow.png)

3. **Configure the expression**: Click a variable node to view and edit the JSON expression in the side panel.

```ballerina
import ballerina/io;

public function main() {
    // Scalar values
    json name = "Acme Corp";
    json count = 42;
    json active = true;
    json empty = null;

    // JSON object
    json customer = {
        "id": 1001,
        "name": "Acme Corp",
        "active": true,
        "tags": ["enterprise", "priority"]
    };

    // Nested structures
    json orders = {
        "orderId": "ORD-5001",
        "customer": customer,
        "items": [
            {"sku": "WDG-01", "qty": 5, "price": 29.99},
            {"sku": "GDG-02", "qty": 2, "price": 49.99}
        ]
    };

    io:println(orders.toJsonString());
}
```

## Accessing JSON values

Access JSON fields with field access or index notation. Since `json` is dynamically shaped, most access operations return `json` and may require type narrowing.

1. **Add Variable steps for field access**: In the flow designer, click **+** and select **Declare Variable**. Set the type to `json` and enter a field access expression such as `check payload.order.id`.

2. **Use optional access**: For keys that may not exist, use `?.` syntax in the expression (for example, `check payload.order?.notes`) to return `()` instead of an error.

3. **Narrow to a specific type**: Set the variable type to `string`, `int`, or another concrete type and use `check` in the expression to perform type narrowing.

   ![Flow designer showing Declare Variable steps for JSON field access, optional access, and type narrowing](/img/develop/transform/json/json-accessing-flow.png)

```ballerina
public function main() returns error? {
    json payload = {
        orders: {
            id: "ORD-100",
            customer: "Globex Inc",
            items: [
                {"sku": "A1", "qty": 3},
                {"sku": "B2", "qty": 7}
            ]
        }
    };

    // Field access (returns json|error)
    json orderId = check payload.orders.id;

    // Optional access -- returns () on missing keys instead of error
    json? notes = check payload.orders?.notes;

    // Array element access
    json[] items = check (check payload.orders.items).cloneWithType();
    json item = items[0];

    // Type narrowing with check
    string customer = check payload.orders.customer;
}
```

## Parsing JSON from strings

Parse external JSON payloads received as strings, bytes, or streams using `value:fromJsonString()` or the `ballerina/data.jsondata` module.

1. **Add a Variable step**: In the flow designer, click **+** and select **Declare Variable**. Set the type to `json` and enter `check raw.fromJsonString()` as the expression.

2. **Extract typed values**: Add additional **Variable** steps with concrete types (for example, `string`) and use `check` expressions to extract values from the parsed JSON.

   ![Flow designer showing Declare Variable steps for parsing a JSON string and extracting typed values](/img/develop/transform/json/json-parsing-flow.png)

```ballerina
import ballerina/io;

public function main() returns error? {
    string raw = string `{"name": "Widget", "price": 29.99, "inStock": true}`;

    // Parse into json value
    json parsed = check raw.fromJsonString();
    string name = check parsed.name;
    io:println(name); // Widget
}
```

## Type-Safe JSON Conversion

The `ballerina/data.jsondata` module provides type-safe conversion from JSON values to strongly typed Ballerina records. By defining a record type that matches the expected JSON structure, you can safely parse and validate JSON data while benefiting from compile-time type checking and reduced runtime errors.

1. **Define the target record type**: Navigate to **Types** in the sidebar and click **+** to add a new type. Select the **Import** tab in the right-hand panel, then paste the `Product` record definition. For details on creating types, see [Types](../integration-artifacts/supporting/types.md).

   ![New Type panel showing the Import tab with the Product record definition](/img/develop/transform/json/json-types-panel.png)

2. **Add a Variable step**: In the flow designer, add a **Declare Variable** step, set the type to `Product`, and set the expression to `check jsondata:parseString(jsonStr)`.

   ![Flow designer showing the jsondata parseString variable step for type-safe JSON parsing](/img/develop/transform/json/json-typed-parse-flow.png)

```ballerina
import ballerina/data.jsondata;
import ballerina/io;

type Product record {|
    string name;
    decimal price;
    boolean inStock;
    string? category;
|};

public function main() returns error? {
    string jsonStr = string `{
        "name": "Widget",
        "price": 29.99,
        "inStock": true,
        "category": "hardware"
    }`;

    // Parse string directly into a typed record
    Product product = check jsondata:parseString(jsonStr);
    io:println(product.name);   // Widget
    io:println(product.price);  // 29.99
}
```

### Parsing JSON arrays

1. **Define the record type**: Navigate to **Types** in the sidebar and click **+** to add a new type. Select the **Import** tab, then paste the `OrderItem` record definition. For details on creating types, see [Types](../integration-artifacts/supporting/types.md).

2. **Add a Variable step**: In the flow designer, add a **Declare Variable** step, set the type to `OrderItem[]`, and set the expression to `check jsondata:parseString(itemsJson)`.

   ![Flow designer showing the jsondata parseString variable step for parsing a JSON array into typed records](/img/develop/transform/json/json-array-parse-flow.png)

```ballerina
import ballerina/data.jsondata;
import ballerina/io;

type OrderItem record {|
    string sku;
    int quantity;
    decimal unitPrice;
|};

public function main() returns error? {
    string itemsJson = string `[
        {"sku": "A1", "quantity": 3, "unitPrice": 10.00},
        {"sku": "B2", "quantity": 1, "unitPrice": 25.50}
    ]`;

    OrderItem[] items = check jsondata:parseString(itemsJson);
    io:println(items);
}
```

### Field name remapping

Use the `@jsondata:Name` annotation to map JSON field names to Ballerina record fields when the JSON keys do not match Ballerina naming conventions or identifier rules. This is useful when working with external APIs that use different naming styles such as snake_case, kebab-case, or reserved keywords.

```ballerina
import ballerina/data.jsondata;

type ApiResponse record {|
    @jsondata:Name {value: "total_count"}
    int totalCount;
    @jsondata:Name {value: "next_page"}
    string? nextPage;
|};
```

## Common transformations

Restructure JSON data by converting to records, transforming, and converting back.

1. **Define source and target record types**: Navigate to **Types** in the sidebar and click **+** to add new types. Select the **Import** tab and paste the `SourceContact` and `TargetContact` record definitions. For details on creating types, see [Types](../integration-artifacts/supporting/types.md).

2. **Add a Variable step for parsing**: In the flow designer, add a **Declare Variable** step, set the type to `SourceContact`, and set the expression to `check jsondata:parseAsType(input)`.

![Flow designer showing the jsondata parseAsType variable step and data mapper transformation](/img/develop/transform/json/json-transform-flow.png)

```ballerina
import ballerina/data.jsondata;

type SourceContact record {|
    string first_name;
    string last_name;
    string email_address;
|};

type TargetContact record {|
    string fullName;
    string email;
|};

public function transform(json input) returns json|error {
    SourceContact src = check jsondata:parseAsType(input);
    TargetContact target = {
        fullName: src.first_name + " " + src.last_name,
        email: src.email_address
    };
    return target.toJson();
}
```

## Merging JSON objects

Combine multiple JSON objects using the spread operator or map merge.

1. **Add Variable steps**: In the flow designer, click **+** and select **Declare Variable**. Set the type to `map<json>` and enter the JSON map literal as the expression. Add a second **Variable** step for the overrides map.

2. **Merge with the variables**: Add another **Declare Variable** step with the type `map<json>` and use  `{defaults, overrides}` to merge the two maps. Later entries take precedence.

   ![Flow designer showing Declare Variable steps for creating and merging JSON maps using the spread operator](/img/develop/transform/json/json-merging-flow.png)

```ballerina
import ballerina/io;

public function main() {
    map<json> defaults = {"timeout": 30, "retries": 3, "logLevel": "INFO"};
    map<json> overrides = {"timeout": 60, "logLevel": "DEBUG"};

    map<json> config = {defaults, overrides};
    io:println(config);
}
```

## Edge cases

### Null handling

Use optional types (?) to represent fields that may be missing or contain null values. Combine them with the Elvis operator (?:) to provide default values when a field is absent or evaluates to null. This helps safely process incomplete or optional JSON data without additional null checks.

```ballerina
public function main() returns error? {
    json payload = {"name": "Test", "description": null};

    // Optional access returns () for null
    json? desc = check payload?.description;

    // Elvis operator for defaults
    string description = desc is string ? desc : "No description provided";
}
```

### Large JSON payloads

For large JSON payloads, use `jsondata:parseStream()` to process JSON data directly from a byte stream without loading the entire payload into memory. This approach improves memory efficiency and is useful when handling large API responses, files, or streaming data sources.

   ![Large JSON payloads](/img/develop/transform/json/json-streaming.png)

```ballerina
import ballerina/data.jsondata;
import ballerina/io;

type Product record {
    string id;
    string name;
    decimal price;
};

public function main() returns error? {

    // Open file as a byte stream
    stream<byte[], io:Error?> byteStream =
        check io:fileReadBlocksAsStream("products.json");

    // Parse stream into typed records
    Product[] products = check jsondata:parseStream(byteStream);

    foreach Product product in products {
        io:println(product);
    }
}
```
Create a `products.json` file in the project directory.

```ballerina

[
    {
        "id": "P100",
        "name": "Keyboard",
        "price": 99.99
    },
    {
        "id": "P200",
        "name": "Mouse",
        "price": 49.50
    }
]
```

## What's next

- [XML Processing](xml.md) - Learn how to read, create, query, and transform XML data for integration scenarios and structured message handling.
- [CSV & Flat File Processing](csv-flat-file.md) - Learn how to process CSV and flat-file data for file-based integrations and data transformation workflows.
