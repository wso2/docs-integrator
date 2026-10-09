---
sidebar_position: 2
title: JSON Processing
description: Parse, construct, transform, and validate JSON data.
slug: /develop-and-test/data-transformation/json
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# JSON Processing

JSON is a lightweight, text-based data exchange format derived from JavaScript. It is widely used in web services, APIs, microservices, and other connected applications, making it the most common data format in modern integration and API development.

WSO2 Integrator provides built-in support for JSON processing, allowing developers to easily create, read, modify, validate, and transform JSON data without relying on external libraries. This native support simplifies integration development and enables efficient handling of JSON payloads across different systems and services.

## Creating JSON values

Construct JSON directly using Ballerina types. The `json` type accepts null, booleans, numbers, strings, arrays, and maps.

<Tabs>
<TabItem value="ui" label="Visual Designer" default>


1. **Add Variable steps for scalar values**. In the flow designer, click **+** and select **Statement** → **Declare Variable**. Add a variable for each scalar JSON value:
   - Name: `name`, Type: `json`, Expression: `"Acme Corp"`
   - Name: `count`, Type: `json`, Expression: `42`
   - Name: `active`, Type: `json`, Expression: `true`
   - Name: `empty`, Type: `json`, Expression: `()`

2. **Add a Variable step for a JSON object**. Click **+** and select **Declare Variable**. Set the name to `customer`, the type to `json`, and enter the following as the expression:

   ```json
   {
       "id": 1001,
       "name": "Acme Corp",
       "active": true,
       "tags": ["enterprise", "priority"]
   }
   ```

3. **Add a Variable step for a nested structure**. Click **+** and select **Declare Variable**. Set the name to `orderItem`, the type to `json`, and enter the following as the expression:

   ```json
   {
       "orderId": "ORD-5001",
       "customer": customer,
       "items": [
           {"sku": "WDG-01", "qty": 5, "price": 29.99},
           {"sku": "GDG-02", "qty": 2, "price": 49.99}
       ]
   }
   ```

   <ThemedImage
       alt="Flow designer showing Declare Variable steps for JSON value construction including nested objects and arrays"
       sources={{
           light: useBaseUrl('/img/develop/transform/json/json-creating-flow.png'),
           dark: useBaseUrl('/img/develop/transform/json/json-creating-flow.png'),
       }}
   />

4. **Add a Function Call step to print the result**. Click **+** and select **Call Function**. Search for `println` and pass `orderItem.toJsonString()` as the argument.

</TabItem>
<TabItem value="code" label="Ballerina Code">

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

</TabItem>
</Tabs>

## Accessing JSON values

Access JSON fields with field access. Since `json` is dynamically shaped, most access operations return `json` and may require type narrowing.

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

1. **Add a Variable step for the JSON input**. In the flow designer, click **+** and select **Statement** → **Declare Variable**. Set the name to `payload`, the type to `json`, and enter the following as the expression:

   ```json
   {
       "orders": {
           "id": "ORD-100",
           "customer": "Globex Inc",
           "items": [
               {"sku": "A1", "qty": 3},
               {"sku": "B2", "qty": 7}
           ]
       }
   }
   ```

2. **Add a Variable step for field access**. Click **+** and select **Declare Variable**. Set the name to `orderId`, the type to `json`, and the expression to `check payload.orders.id`. This returns the value `"ORD-100"`.

3. **Add a Variable step for optional access**. Click **+** and select **Declare Variable**. Set the name to `notes`, the type to `json?`, and the expression to `check payload.orders?.notes`. The `?.` syntax returns `()` instead of an error when the key does not exist.

4. **Add a Variable step for array element access**. Click **+** and select **Declare Variable**. Set the name to `items`, the type to `json[]`, and the expression to `check (check payload.orders.items).cloneWithType()`. Then add another variable named `item` of type `json` with the expression `items[0]`.

5. **Narrow to a specific type**. Click **+** and select **Declare Variable**. Set the name to `customer`, the type to `string`, and the expression to `check payload.orders.customer`. Setting a concrete type (such as `string` or `int`) with `check` performs type narrowing at runtime.

   <ThemedImage
       alt="Flow designer showing Declare Variable steps for JSON field access, optional access, and type narrowing"
       sources={{
           light: useBaseUrl('/img/develop/transform/json/json-accessing-flow.png'),
           dark: useBaseUrl('/img/develop/transform/json/json-accessing-flow.png'),
       }}
   />

</TabItem>
<TabItem value="code" label="Ballerina Code">

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

</TabItem>
</Tabs>

## Parse a JSON string

Parse JSON payloads received as strings into either an untyped `json` value or a typed Ballerina record.

### Into a JSON value

Use `fromJsonString()` when you need a quick untyped `json` value without defining a record type.

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

1. **Add a Variable step for the raw string**. In the flow designer, click **+** and select **Statement** → **Declare Variable**. Set the name to `raw`, the type to `string`, and enter the following as the expression:

   ```
   string `{"name": "Widget", "price": 29.99, "inStock": true}`
   ```

2. **Parse the string into a JSON value**. Click **+** and select **Call Function**. Search for `fromJsonString` and select it. Configure:
   - **String Value***: `raw`
   - **Result***: `parsed`
   - **T***: `json`

3. **Extract a typed value**. Click **+** and select **Declare Variable**. Set the name to `name`, the type to `string`, and the expression to `check parsed.name`. Setting the type to `string` with `check` performs type narrowing from `json` to `string`.

4. **Add a Function Call step to print the result**. Click **+** and select **Call Function**. Search for `println` and pass `name` as the argument.

   <ThemedImage
       alt="Flow designer showing the fromJsonString function call step and variable extraction steps"
       sources={{
           light: useBaseUrl('/img/develop/transform/json/json-parsing-flow.png'),
           dark: useBaseUrl('/img/develop/transform/json/json-parsing-flow.png'),
       }}
   />

</TabItem>
<TabItem value="code" label="Ballerina Code">

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

</TabItem>
</Tabs>

### Into a typed record

Use `jsondata:parseString()` when the JSON structure is known. Define a matching record type and parse directly into it for compile-time type safety.

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

1. **Define the target record type**. Navigate to **Types** in the sidebar and click **+** to add a new type. Select **Create from scratch**, set **Kind** to **Record**, and name it `Product`. Add fields using the **+** button:

   | Field | Type |
   |---|---|
   | `name` | `string` |
   | `price` | `decimal` |
   | `inStock` | `boolean` |
   | `category` | `string?` |

   For details on creating types, see [Types](../integration-artifacts/supportive-artifacts/types.md).

   <ThemedImage
       alt="New Type panel showing the Product record fields defined from scratch"
       sources={{
           light: useBaseUrl('/img/develop/transform/json/json-types-panel.png'),
           dark: useBaseUrl('/img/develop/transform/json/json-types-panel.png'),
       }}
   />

2. **Add a Variable step for the JSON string**. In the flow designer, click **+** and select **Statement** → **Declare Variable**. Set the name to `jsonStr`, the type to `string`, and enter the following as the expression:

   ```
   string `{"name": "Widget", "price": 29.99, "inStock": true, "category": "hardware"}`
   ```

3. **Parse into the record type**. Click **+** and select **Call Function**. Search for `parseString` and select it from the `data.jsondata` module.

   <ThemedImage
       alt="Right-side panel showing parseString search results with the data.jsondata module entry highlighted"
       sources={{
           light: useBaseUrl('/img/develop/transform/json/json-parsestring-search.png'),
           dark: useBaseUrl('/img/develop/transform/json/json-parsestring-search.png'),
       }}
   />

   Configure the function call:
   - **String***: `jsonStr`
   - **Result***: `product`
   - **T***: `Product`

   The `data.jsondata` module is automatically imported into your file.

   <ThemedImage
       alt="Right-side panel showing the parseString function form with jsonStr as the argument and Product as the return type"
       sources={{
           light: useBaseUrl('/img/develop/transform/json/json-parsestring-form.png'),
           dark: useBaseUrl('/img/develop/transform/json/json-parsestring-form.png'),
       }}
   />

4. **Add Function Call steps to print the results**. Click **+** and select **Call Function**. Search for `println` and pass `product.name` as the argument. Add a second `println` step and pass `product.price`.

   <ThemedImage
       alt="Flow designer showing the parseString function call step with Product as the result type"
       sources={{
           light: useBaseUrl('/img/develop/transform/json/json-typed-parse-flow.png'),
           dark: useBaseUrl('/img/develop/transform/json/json-typed-parse-flow.png'),
       }}
   />

</TabItem>
<TabItem value="code" label="Ballerina Code">

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

</TabItem>
</Tabs>


## Convert a json value to a typed record

Use `jsondata:parseAsType()` when you already have a `json` value and want to convert it into a typed record.

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

1. **Define the record type**. Navigate to **Types** in the sidebar and click **+** to add a new type. Select **Create from scratch**, set **Kind** to **Record**, and name it `Product`. Add fields using the **+** button:

   | Field | Type |
   |---|---|
   | `name` | `string` |
   | `price` | `decimal` |
   | `inStock` | `boolean` |

   For details on creating types, see [Types](../integration-artifacts/supportive-artifacts/types.md).

2. **Add a Variable step for the JSON value**. In the flow designer, click **+** and select **Statement** → **Declare Variable**. Set the name to `jsonInput`, the type to `json`, and enter the following as the expression:

   ```json
   {"name": "Widget", "price": 29.99, "inStock": true}
   ```

3. **Convert to the record type**. Click **+** and select **Call Function**. Search for `parseAsType` and select it from the `data.jsondata` module.

   <ThemedImage
       alt="right-side panel showing parseAsType search results with the data.jsondata module entry highlighted"
       sources={{
           light: useBaseUrl('/img/develop/transform/json/json-parseastype-search.png'),
           dark: useBaseUrl('/img/develop/transform/json/json-parseastype-search.png'),
       }}
   />

   Configure the function call:
   - **Json Value***: `jsonInput`
   - **Result***: `product`
   - **T***: `Product`

4. **Add Function Call steps to print the results**. Click **+** and select **Call Function**. Search for `println` and pass `product.name` as the argument. Add a second `println` step and pass `product.price`.

   <ThemedImage
       alt="Flow designer showing the parseAsType function call step with jsonInput as the argument and Product as the result type"
       sources={{
           light: useBaseUrl('/img/develop/transform/json/json-parseastype-flow.png'),
           dark: useBaseUrl('/img/develop/transform/json/json-parseastype-flow.png'),
       }}
   />

</TabItem>
<TabItem value="code" label="Ballerina Code">

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

</TabItem>
</Tabs>

## Parse JSON arrays

Use `jsondata:parseString()` to parse a JSON array string directly into a typed record array. If you already have a `json` value instead of a string, use `jsondata:parseAsType()` as described in [Convert a JSON value to a typed record](#convert-a-json-value-to-a-typed-record).

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

1. **Define the record type**. Navigate to **Types** in the sidebar and click **+** to add a new type. Select **Create from scratch**, set **Kind** to **Record**, and name it `OrderItem`. Add fields using the **+** button:

   | Field | Type |
   |---|---|
   | `sku` | `string` |
   | `quantity` | `int` |
   | `unitPrice` | `decimal` |

   For details on creating types, see [Types](../integration-artifacts/supportive-artifacts/types.md).

2. **Add a Variable step for the JSON array string**. In the flow designer, click **+** and select **Statement** → **Declare Variable**. Set the name to `itemsJson`, the type to `string`, and enter the following as the expression:

   ```
   string `[{"sku": "A1", "quantity": 3, "unitPrice": 10.00}, {"sku": "B2", "quantity": 1, "unitPrice": 25.50}]`
   ```

3. **Parse the array**. Click **+** and select **Call Function**. Search for `parseString` and select it from the `data.jsondata` module. Configure:
   - **String***: `itemsJson`
   - **Result***: `items`
   - **T***: `OrderItem[]`

4. **Add a Function Call step to print the result**. Click **+** and select **Call Function**. Search for `println` and pass `items` as the argument.

   <ThemedImage
       alt="Flow designer showing the jsondata parseString function call step for parsing a JSON array into typed records"
       sources={{
           light: useBaseUrl('/img/develop/transform/json/json-array-parse-flow.png'),
           dark: useBaseUrl('/img/develop/transform/json/json-array-parse-flow.png'),
       }}
   />

</TabItem>
<TabItem value="code" label="Ballerina Code">

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

</TabItem>
</Tabs>



## Merging JSON objects

Combine multiple JSON objects using the `mergeJson` function.

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

1. **Add a Variable step for the first JSON object**. In the flow designer, click **+** and select **Statement** → **Declare Variable**. Set the name to `order1`, the type to `json`, and enter `{"sku": "A1", "quantity": "3"}` as the expression.

2. **Add a Variable step for the second JSON object**. Click **+** and select **Declare Variable**. Set the name to `order2`, the type to `json`, and enter `{"address": "Sri Lanka", "status": "pending"}` as the expression.

3. **Merge the objects**. Click **+** and select **Call Function**. Search for `mergeJson` and select it from the `lang.value` module (this adds the `ballerina/lang.value` import). Configure:
   - **Json1***: `order1`
   - **Json2***: `order2`
   - **Result***: `orders`

4. **Add a Function Call step to print the result**. Click **+** and select **Call Function**. Search for `println` and pass `orders` as the argument.

   <ThemedImage
       alt="Flow designer showing two Declare Variable steps for order1 and order2 followed by a mergeJson function call step"
       sources={{
           light: useBaseUrl('/img/develop/transform/json/json-merging-flow.png'),
           dark: useBaseUrl('/img/develop/transform/json/json-merging-flow.png'),
       }}
   />

</TabItem>
<TabItem value="code" label="Ballerina Code">

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

</TabItem>
</Tabs>


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

<Tabs>

<TabItem value="ui" label="Visual Designer" default>

1. **Add a Variable step for the JSON payload**. In the flow designer, click **+** and select **Statement** → **Declare Variable**. Set the name to `payload`, the type to `json`, and enter `{"name": "Test", "description": null}` as the expression.

2. **Add a Variable step for optional access**. Click **+** and select **Declare Variable**. Set the name to `desc`, the type to `json?`, and the expression to `check payload?.description`. The `?.` syntax returns `()` for null or missing fields instead of an error.

3. **Add a Variable step with the Elvis operator**. Click **+** and select **Declare Variable**. Set the name to `description`, the type to `string`, and the expression to `desc is string ? desc : "No description provided"`. This provides a default value when the field is null or absent.

   <ThemedImage
       alt="Flow designer showing Declare Variable steps for optional access and Elvis operator for null handling"
       sources={{
           light: useBaseUrl('/img/develop/transform/json/json-null-handling-flow.png'),
           dark: useBaseUrl('/img/develop/transform/json/json-null-handling-flow.png'),
       }}
   />

</TabItem>

<TabItem value="code" label="Ballerina Code">

```ballerina
public function main() returns error? {
    json payload = {"name": "Test", "description": null};

    // Optional access returns () for null
    json? desc = check payload?.description;

    // Elvis operator for defaults
    string description = desc is string ? desc : "No description provided";
}
```

</TabItem>
</Tabs>

### Large JSON payloads

For large JSON payloads, use `jsondata:parseStream()` to process JSON data directly from a byte stream without loading the entire payload into memory. This approach improves memory efficiency and is useful when handling large API responses, files, or streaming data sources.

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

1. **Define the record type**. Navigate to **Types** in the sidebar and click **+** to add a new type. Select **Create from scratch**, set **Kind** to **Record**, and name it `Product`. Add fields using the **+** button:

   | Field | Type |
   |---|---|
   | `id` | `string` |
   | `name` | `string` |
   | `price` | `decimal` |

   For details on creating types, see [Types](../integration-artifacts/supportive-artifacts/types.md).

2. **Open the file as a byte stream**. In the flow designer, click **+** and select **Call Function**. Search for `fileReadBlocksAsStream` under **io** and select it (this adds the `ballerina/io` import). Configure:
   - **Path***: `"products.json"`
   - **Result***: `byteStream`

3. **Parse the stream into typed records**. Click **+** and select **Call Function**. Search for `parseStream` and select it from the `data.jsondata` module (this adds the `ballerina/data.jsondata` import). Configure:
   - **Stream***: `byteStream`
   - **Result***: `products`
   - **T***: `Product[]`

4. **Add a Foreach step to iterate**. Click **+** and select **Foreach** under **Control**. Set:
   - **Collection**: `products`
   - **Variable Name***: `product`
   - **Variable Type***: `Product`

5. **Add a Function Call step inside the loop**. Inside the Foreach body, click **+** and select **Call Function**. Search for `println` and pass `product` as the argument.

   <ThemedImage
       alt="Flow designer showing a parseStream function call step reading a byte stream into a typed Product array"
       sources={{
           light: useBaseUrl('/img/develop/transform/json/json-streaming.png'),
           dark: useBaseUrl('/img/develop/transform/json/json-streaming.png'),
       }}
   />

</TabItem>
<TabItem value="code" label="Ballerina Code">

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

</TabItem>
</Tabs>

## What's next

- [XML Processing](xml.md) - Work with XML data
- [Type System & Records](https://ballerina.io/spec/lang/master/) - Type-safe data handling

