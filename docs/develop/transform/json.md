---
title: JSON Processing
---

# JSON Processing

Work with JSON data -- the most common format in modern integrations. Ballerina treats `json` as a built-in union type (`()|boolean|int|float|decimal|string|json[]|map<json>`) with first-class language support for construction, access, and transformation.

## Creating JSON values

Construct JSON directly using Ballerina literals. The `json` type accepts null, booleans, numbers, strings, arrays, and maps.

1. **Add a Variable step** — In the flow designer, click **+** and select **Variable**. Set the type to `json` and enter a JSON literal as the expression.

2. **Build nested structures** — Add additional **Variable** steps for nested JSON objects and arrays. Each variable appears as a separate **Declare Variable** step in the flow.

   ![Flow designer showing Declare Variable steps for JSON literal construction including nested objects and arrays](/img/develop/transform/json/json-creating-flow.png)

3. **Configure the expression** — Click a variable node to view and edit the JSON expression in the side panel.

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
    json order = {
        "orderId": "ORD-5001",
        "customer": customer,
        "items": [
            {"sku": "WDG-01", "qty": 5, "price": 29.99},
            {"sku": "GDG-02", "qty": 2, "price": 49.99}
        ]
    };

    io:println(order.toJsonString());
}
```

## Accessing JSON values

Access JSON fields with field access or index notation. Since `json` is dynamically shaped, most access operations return `json` and may require type narrowing.

1. **Add Variable steps for field access** — In the flow designer, click **+** and select **Variable**. Set the type to `json` and enter a field access expression such as `check payload.order.id`.

2. **Use optional access** — For keys that may not exist, use `?.` syntax in the expression (for example, `check payload.order?.notes`) to return `()` instead of an error.

3. **Narrow to a specific type** — Set the variable type to `string`, `int`, or another concrete type and use `check` in the expression to perform type narrowing.

   ![Flow designer showing Declare Variable steps for JSON field access, optional access, and type narrowing](/img/develop/transform/json/json-accessing-flow.png)

```ballerina
public function main() returns error? {
    json payload = {
        "order": {
            "id": "ORD-100",
            "customer": "Globex Inc",
            "items": [
                {"sku": "A1", "qty": 3},
                {"sku": "B2", "qty": 7}
            ]
        }
    };

    // Field access (returns json|error)
    json orderId = check payload.order.id;

    // Optional access -- returns () on missing keys instead of error
    json? notes = check payload.order?.notes;

    // Array element access
    json firstItem = check payload.order.items[0];

    // Type narrowing with check
    string customer = check payload.order.customer;
}
```

## Parsing JSON from strings

Parse external JSON payloads received as strings, bytes, or streams using `value:fromJsonString()` or the `ballerina/data.jsondata` module.

1. **Add a Variable step** — In the flow designer, click **+** and select **Variable**. Set the type to `json` and enter `check raw.fromJsonString()` as the expression.

2. **Extract typed values** — Add additional **Variable** steps with concrete types (for example, `string`) and use `check` expressions to extract values from the parsed JSON.

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

## Type-Safe JSON with `ballerina/data.jsondata`

The `ballerina/data.jsondata` module provides type-safe conversion from JSON to Ballerina records. Define a record type matching your expected structure and parse directly into it.

1. **Define the target record type** — Navigate to **Types** in the sidebar and click **+** to add a new type. Select the **Import** tab in the right-hand panel, then paste the `Product` record definition. For details on creating types, see [Types](../integration-artifacts/supporting/types.md).

   ![New Type panel showing the Import tab with the Product record definition](/img/develop/transform/json/json-types-panel.png)

2. **Add a Variable step** — In the flow designer, add a **Variable** step, set the type to `Product`, and set the expression to `check jsondata:parseString(jsonStr)`.

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

1. **Define the record type** — Navigate to **Types** in the sidebar and click **+** to add a new type. Select the **Import** tab, then paste the `OrderItem` record definition. For details on creating types, see [Types](../integration-artifacts/supporting/types.md).

2. **Add a Variable step** — In the flow designer, add a **Variable** step, set the type to `OrderItem[]`, and set the expression to `check jsondata:parseString(itemsJson)`.

   ![Flow designer showing the jsondata parseString variable step for parsing a JSON array into typed records](/img/develop/transform/json/json-array-parse-flow.png)

```ballerina
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
}
```

### Field name remapping

Use the `@jsondata:Name` annotation to map JSON keys that do not match Ballerina field naming conventions.

1. **Define the record type with annotations** — Navigate to **Types** in the sidebar and click **+** to add a new type. Select the **Import** tab, then paste the record definition including `@jsondata:Name` annotations. The annotations map JSON field names to Ballerina-compatible identifiers.

   ![Types panel showing the ApiResponse record with jsondata Name annotations for field remapping](/img/develop/transform/json/json-remapping-panel.png)

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

1. **Define source and target record types** — Navigate to **Types** in the sidebar and click **+** to add new types. Select the **Import** tab and paste the `SourceContact` and `TargetContact` record definitions. For details on creating types, see [Types](../integration-artifacts/supporting/types.md).

2. **Add a Variable step for parsing** — In the flow designer, add a **Variable** step, set the type to `SourceContact`, and set the expression to `check jsondata:parseAsType(input)`.

3. **Map fields visually** — To transform the parsed record into the target type, use the [Visual Data Mapper](visual-data-mapper.md). Map `first_name` and `last_name` to `fullName` (with concatenation), and `email_address` to `email`.

   ![Flow designer showing the jsondata parseAsType variable step and data mapper transformation](/img/develop/transform/json/json-transform-flow.png)

   ![Data Mapper showing SourceContact input fields on the left and TargetContact output fields on the right](/img/develop/transform/json/json-data-mapper.png)

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

1. **Add Variable steps** — In the flow designer, click **+** and select **Variable**. Set the type to `map<json>` and enter the JSON map literal as the expression. Add a second **Variable** step for the overrides map.

2. **Merge with the spread operator** — Add another **Variable** step with the type `map<json>` and use the spread operator expression `{...defaults, ...overrides}` to merge the two maps. Later entries take precedence.

   ![Flow designer showing Declare Variable steps for creating and merging JSON maps using the spread operator](/img/develop/transform/json/json-merging-flow.png)

```ballerina
public function main() {
    map<json> defaults = {"timeout": 30, "retries": 3, "logLevel": "INFO"};
    map<json> overrides = {"timeout": 60, "logLevel": "DEBUG"};

    // Merge -- overrides take precedence
    map<json> config = {...defaults, ...overrides};
    // Result: {"timeout": 60, "retries": 3, "logLevel": "DEBUG"}
}
```

## Edge cases

### Null handling

Use optional types and the Elvis operator to handle missing or null values.

1. **Use optional access** — Add a **Variable** step with the type `json?` and use optional access syntax `check payload?.description` as the expression. This returns `()` for null or missing fields.

2. **Apply the Elvis operator** — Add another **Variable** step with a concrete type (for example, `string`) and use a conditional expression such as `desc is string ? desc : "No description provided"` to provide a default value.

   ![Flow designer showing Declare Variable steps for optional access and Elvis operator for null handling](/img/develop/transform/json/json-null-handling-flow.png)

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

For large payloads, use `jsondata:parseStream()` to process byte streams without loading the entire content into memory.

## What's next

- [XML Processing](xml-processing.md) -- Work with XML data
- [Type System & Records](type-system-records.md) -- Type-safe data handling
