---
title: JSON Processing
---

# JSON Processing

JSON is a lightweight, text-based data exchange format derived from JavaScript. It is widely used in web services, APIs, microservices, and other connected applications, making it the most common data format in modern integration and API development.

WSO2 Integrator provides built-in support for JSON processing, allowing developers to easily create, read, modify, validate, and transform JSON data without relying on external libraries. This native support simplifies integration development and enables efficient handling of JSON payloads across different systems and services.

## Creating JSON values

Construct JSON directly using Ballerina types. The `json` type accepts null, booleans, numbers, strings, arrays, and maps.

1. **Add a Variable**: In the flow designer, click **+** and select **Declare Variable**. Set the type to `json` and enter a JSON value as the expression.

2. **Build nested structures**: Add additional **Declare Variable** steps for nested JSON objects and arrays. Each variable appears as a separate **Declare Variable** step in the flow.

   ![Flow designer showing Declare Variable steps for JSON value construction including nested objects and arrays](/img/develop/transform/json/json-creating-flow.png)

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

    json orderItem = {
        "orderId": "ORD-5001",
        "customer": customer,
        "items": [
            {"sku": "WDG-01", "qty": 5, "price": 29.99},
            {"sku": "GDG-02", "qty": 2, "price": 49.99}
        ]
    };
    io:println(orderItem.toJsonString());
}
```

## Accessing JSON values

Access JSON fields with field access. Since `json` is dynamically shaped, most access operations return `json` and may require type narrowing.

1. **Define the JSON input**: In the flow designer, click **+** and select **Declare Variable**. Set the type to `json` and enter the JSON value as the expression. Name the variable `payload`. This variable is then referenced in all subsequent field access steps.

2. **Add Variable steps for field access**: Click **+** and select **Declare Variable**. Set the type to `json` and enter a field access expression on `payload`, such as `check payload.orderId`.

3. **Use optional access**: For keys that may not exist, use `?.` syntax in the expression (for example, `check payload?.notes`) to return `()` instead of an error.

4. **Narrow to a specific type**: Set the variable type to `string`, `int`, or another concrete type and use `check` in the expression to perform type narrowing.

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

## Parse a JSON string

Parse JSON payloads received as strings into either an untyped `json` value or a typed Ballerina record.

### Into a JSON value

Use `fromJsonString()` when you need a quick untyped `json` value without defining a record type.

1. **Add a Declare Variable step for the raw string**: In the flow designer, click **+** and select **Declare Variable**. Set the type to `string` and enter the JSON string as the expression. Name the variable `raw`.

2. **Parse the string**: Click **+** and select **Call Function**. In the right-side panel, search for `fromJsonString` and select it. Pass `raw` as the argument and set the result type to `json`.

3. **Extract typed values**: Add a **Declare Variable** step with a concrete type (for example, `string`) and use a field access expression such as `check parsed.name` to extract values from the parsed JSON.

   ![Flow designer showing the fromJsonString function call step and variable extraction steps](/img/develop/transform/json/json-parsing-flow.png)

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

### Into a typed record

Use `jsondata:parseString()` when the JSON structure is known. Define a matching record type and parse directly into it for compile-time type safety.

1. **Define the target record type**: Navigate to **Types** in the sidebar and click **+** to add a new type. Define the `Product` record. For details on creating types, see [Types](../integration-artifacts/supporting/types.md).

   ![New Type panel showing the Product record fields defined from scratch](/img/develop/transform/json/json-types-panel.png)

2. **Add a Declare Variable step for the JSON string**: In the flow designer, click **+** and select **Declare Variable**. Set the type to `string` and enter the JSON string as the expression. Name the variable `jsonStr`.

3. **Parse into the record type**: Click **+** and select **Call Function**. In the right-side panel, search for `parseString` and select it from the `data.jsondata` module.

   ![Right-side panel showing parseString search results with the data.jsondata module entry highlighted](/img/develop/transform/json/json-parsestring-search.png)

   Pass `jsonStr` as the argument. The module is automatically imported into your file.

   ![Right-side panel showing the parseString function form with jsonStr as the argument and Product as the return type](/img/develop/transform/json/json-parsestring-form.png)

   ![Flow designer showing the parseString function call step with Product as the result type](/img/develop/transform/json/json-typed-parse-flow.png)

```ballerina
import ballerina/data.jsondata;
import ballerina/io;

// This is in the types.bal file
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

## Convert a json value to a typed record

Use `jsondata:parseAsType()` when you already have a `json` value and want to convert it into a typed record.

1. **Define the record type**: Navigate to **Types** in the sidebar and click **+** to add a new type. Define the record with the fields matching your JSON structure. For details on creating types, see [Types](../integration-artifacts/supporting/types.md).

2. **Assign the json value**: In the flow designer, click **+** and select **Declare Variable**. Set the type to `json` and enter the JSON value as the expression. Name the variable `jsonInput`.

3. **Convert to the record type**: Click **+** and select **Call Function**. In the right-side panel, search for `parseAsType` and select it from the `data.jsondata` module. Pass `jsonInput` as the argument and set the result type to your defined record.

   ![right-side panel showing parseAsType search results with the data.jsondata module entry highlighted](/img/develop/transform/json/json-parseastype-search.png)

   ![Flow designer showing the parseAsType function call step with jsonInput as the argument and Product as the result type](/img/develop/transform/json/json-parseastype-flow.png)

```ballerina
import ballerina/data.jsondata;
import ballerina/io;

type Product record {|
    string name;
    decimal price;
    boolean inStock;
|};

public function main() returns error? {
    json jsonInput = {"name": "Widget", "price": 29.99, "inStock": true};

    Product product = check jsondata:parseAsType(jsonInput);
    io:println(product.name);  // Widget
    io:println(product.price); // 29.99
}
```

## Parse JSON arrays

Use `jsondata:parseString()` to parse a JSON array string directly into a typed record array. If you already have a `json` value instead of a string, use `jsondata:parseAsType()` as described in [Convert a JSON value to a typed record](#convert-a-json-value-to-a-typed-record).

1. **Define the record type**: Navigate to **Types** in the sidebar and click **+** to add a new type. Define the `OrderItem` record from scratch with the following fields: `sku` (`string`), `quantity` (`int`), and `unitPrice` (`decimal`). For details on creating types, see [Types](../integration-artifacts/supporting/types.md).

2. **Add a Variable step for the JSON string**: In the flow designer, click **+** and select **Declare Variable**. Set the type to `string` and enter the JSON array string as the expression. Name the variable `itemsJson`.

3. **Parse the array**: Click **+** and select **Call Function**. In the right-side panel, search for `parseString` and select it from the `data.jsondata` module. Pass `itemsJson` as the argument and set the result type to `OrderItem[]`.

   ![Flow designer showing the jsondata parseString function call step for parsing a JSON array into typed records](/img/develop/transform/json/json-array-parse-flow.png)

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

## Merging JSON objects

Combine multiple JSON objects using the `mergeJson` function.

1. **Add Variable steps**: In the flow designer, click **+** and select **Declare Variable**. Set the type to `json` and enter the JSON value as the expression. Add a second **Declare Variable** step for the merge.

2. **Merge the objects**: Click **+** and select **Call Function**. In the right-side panel, search for `mergeJson` and select it from the `lang.value` module. Pass two `json` values as arguments.

   ![Flow designer showing two Declare Variable steps for order1 and order2 followed by a mergeJson function call step](/img/develop/transform/json/json-merging-flow.png)

```ballerina
import ballerina/lang.value;
import ballerina/io;

public function main() returns error? {
    json order1 = {"sku": "A1", "quantity": "3"};
    json order2 = {"address": "Sri Lanka", "status": "pending"};
    json orders = check value:mergeJson(order1, order2);
    io:println(orders);
}

```

## Additional scenarios

### Remap field names

Use the `@jsondata:Name` annotation to map JSON field names to Ballerina record fields when the JSON keys do not match Ballerina naming conventions or identifier rules. This is useful when working with external APIs that use naming styles such as snake_case or kebab-case. Add the annotation directly to the record type definition in `types.bal` after creating the record.

```ballerina
import ballerina/data.jsondata;

type ApiResponse record {|
    @jsondata:Name {value: "total_count"}
    int totalCount;
    @jsondata:Name {value: "next_page"}
    string? nextPage;
|};
```

### Null handling

Use optional types (?) to represent fields that may be missing or contain null values. Combine them with the Elvis operator (?:) to provide default values when a field is absent or evaluates to null. This helps safely process incomplete or optional JSON data without additional null checks.

1. **Use optional access**: Add a **Declare Variable** step with the type `json?` and use optional access syntax `check payload?.description` as the expression. This returns `()` for null or missing fields.

2. **Apply the Elvis operator**: Add another **Declare Variable** step with a concrete type (for example, `string`) and use a conditional expression such as `desc is string ? desc : "No description provided"` to provide a default value.

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

For large JSON payloads, use `jsondata:parseStream()` to process JSON data directly from a byte stream without loading the entire payload into memory. This approach improves memory efficiency and is useful when handling large API responses, files, or streaming data sources.

   ![Flow designer showing a parseStream function call step reading a byte stream into a typed Product array](/img/develop/transform/json/json-streaming.png)

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

- [XML Processing](xml.md) - Work with XML data
- [Type System & Records](../../reference/language/type-system.md) - Type-safe data handling
