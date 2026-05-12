---
title: CSV & Flat File Processing
---

# CSV & Flat File Processing

CSV and flat files are commonly used data exchange formats for spreadsheets, reports, batch-processing systems, legacy applications, and data integration workflows. Formats such as CSV, TSV, and fixed-width files are widely used to store and transfer structured tabular data between systems.

WSO2 Integrator provides built-in support for CSV and flat-file processing, enabling developers to read, parse, validate, transform, and generate delimited or fixed-width data without relying on external libraries. The ballerina/data.csv module offers type-safe APIs for handling tabular data and converting rows into structured records.

With native CSV and flat-file support, developers can efficiently process large datasets, transform file content, map records between formats, and integrate file-based systems with APIs, databases, and enterprise applications.

## Reading CSV into records

Parse CSV content directly into typed Ballerina records using `csv:parseString()`. Define a record type whose fields match the CSV column headers.

1. **Define the record type** — Navigate to **Types** in the sidebar and click **+** to add a new type. Select **Create from scratch**, set **Kind** to **Record**, and name it `Employee`. Add fields using the **+** button:

   | Field | Type |
   |---|---|
   | `name` | `string` |
   | `department` | `string` |
   | `salary` | `decimal` |
   | `yearsOfService` | `int` |

   For details on creating types, see [Types](../integration-artifacts/supporting/types.md).

2. **Add a Variable step** — In the flow designer, click **+** and select **Statement** → **Declare Variable**. Set the type to `string` and the name to `csvData`. Switch the toggle from **Record** to **Expression**, then enter the CSV string value.

3. **Parse the CSV string** — Click **+** and select **Call Function**. Search for `parseString` and select it under **data.csv**. Configure:
   - **Csv String***: `csvData`
   - **Result***: `employees`
   - **T***: `Employee[]`

4. **Add a Foreach step** — Click **+** and select **Foreach** under **Control**. Set:
   - **Collection**: `employees`
   - **Variable Name***: `emp`
   - **Variable Type***: `Employee`

5. **Add println inside the loop** — Inside the Foreach body, click **+** and select **Call Function**. Search under standard library → **io** → select `println`. Use **Add Item** to add three items. For each, search **variables**, expand `emp`, and select `name`, `department`, and `salary` respectively.

   ![Flow designer showing CSV parsing variable and foreach loop](/img/develop/transform/csv-flat-file/csv-reading-flow.png)

```ballerina
import ballerina/data.csv;
import ballerina/io;

type Employee record {|
    string name;
    string department;
    decimal salary;
    int yearsOfService;
|};

public function main() returns error? {
    string csvData = string `name,department,salary,yearsOfService
Alice,Engineering,95000.00,5
Bob,Sales,72000.00,3
Carol,Engineering,110000.00,8`;

    Employee[] employees = check csv:parseString(csvData);

    foreach Employee emp in employees {
        io:println(string `${emp.name} (${emp.department}): $${emp.salary}`);
    }
}
```

## Reading CSV from files and streams

Use `csv:parseBytes()` for byte arrays or `csv:parseStream()` for streaming large CSV files without loading them entirely into memory.

1. **Define the record type** — Navigate to **Types** and click **+**. Select **Create from scratch**, set **Kind** to **Record**, and name it `Transaction`. Add fields: `date` (string), `description` (string), `amount` (decimal), and `category` (string). For details on creating types, see [Types](../integration-artifacts/supporting/types.md).

2. **Read the file as bytes** — In the flow designer, click **+** and select **Call Function**. Search under **io** and select `fileReadBytes`. Configure:
   - **Path***: `transactions.csv`
   - **Result***: `content`

3. **Parse the bytes as CSV** — Click **+** and select **Call Function**. Search for `parseBytes` and select it under **data.csv**. Configure:
   - **Csv Bytes***: `content`
   - **Result***: `transactions`
   - **T***: `Transaction[]`

4. **(Optional) Stream large files** — For memory-efficient processing of large files, use `io:fileReadBlocksAsStream` followed by `csv:parseStream`.

   ![Flow designer showing file read and CSV parse steps](/img/develop/transform/csv-flat-file/csv-files-streams-flow.png)

```ballerina
import ballerina/data.csv;
import ballerina/io;

type Transaction record {|
    string date;
    string description;
    decimal amount;
    string category;
|};

public function main() returns error? {
    byte[] content = check io:fileReadBytes("transactions.csv");
    Transaction[] transactions = check csv:parseBytes(content);

    stream<byte[], io:Error?> byteStream =
        check io:fileReadBlocksAsStream("large-data.csv");

    Transaction[] streamed = check csv:parseStream(byteStream);
}
```

## Selective column projection

Use closed record types to extract only the columns you need. Columns not represented in the target record are automatically ignored.

1. **Define a subset record type** — Navigate to **Types** and click **+**. Create a record named `EmployeeSummary` with only the required fields: `name` (string) and `salary` (decimal).

2. **Add a Variable step** — Add a **Declare Variable** step with the CSV string assigned to `csvData`.

3. **Parse the CSV string** — Use `csv:parseString` with:
   - **Csv String***: `csvData`
   - **Result***: `summaries`
   - **T***: `EmployeeSummary[]`

   ![Flow designer showing selective column projection with a subset record type](/img/develop/transform/csv-flat-file/csv-projection-flow.png)

```ballerina
import ballerina/data.csv;

type EmployeeSummary record {|
    string name;
    decimal salary;
|};

public function main() returns error? {
    string csvData = string `name,department,salary,yearsOfService,location
Alice,Engineering,95000.00,5,Seattle
Bob,Sales,72000.00,3,New York`;

    EmployeeSummary[] summaries = check csv:parseString(csvData);
}
```

## Custom delimiters and options

Configure parsing behavior for TSV, pipe-delimited, or other non-standard file formats.

1. **Define the record type** — Create a record named `LogEntry` with fields:
   - `timestamp` (string)
   - `level` (string)
   - `message` (string)

2. **Add a Variable step** — Add a **Declare Variable** step for `tsvData` and provide the tab-separated content.

3. **Parse with custom delimiter** — Use `csv:parseString` and configure:
   - **Csv String***: `tsvData`
   - **Result***: `logs`
   - **T***: `LogEntry[]`

   Under **Advanced Configurations**:
   - **Options**: `{delimiter: "\t"}`

   ![Flow designer showing CSV parse with custom delimiter configuration](/img/develop/transform/csv-flat-file/csv-custom-delimiters-flow.png)

```ballerina
import ballerina/data.csv;

type LogEntry record {|
    string timestamp;
    string level;
    string message;
|};

public function main() returns error? {
    string tsvData = string `timestamp	level	message
2025-03-15T10:00:00Z	INFO	Service started
2025-03-15T10:01:23Z	ERROR	Connection refused`;

    LogEntry[] logs = check csv:parseString(tsvData, {
        delimiter: "\t"
    });
}
```

## Headerless CSV

Parse CSV files without header rows using `{header: null}`.

1. **Declare the CSV data variable** — Add a **Declare Variable** step with the headerless CSV content.

2. **Parse as headerless CSV** — Configure `csv:parseString` with:
   - **Csv String***: `csvData`
   - **Result***: `rows`
   - **T***: `string[][]`

   Under **Advanced Configurations**:
   - **Options**: `{header: null}`

   ![Flow designer showing headerless CSV parsing into string arrays](/img/develop/transform/csv-flat-file/csv-headerless-flow.png)

```ballerina
import ballerina/data.csv;

public function main() returns error? {
    string csvData = string `Alice,Engineering,95000
Bob,Sales,72000`;

    string[][] rows = check csv:parseString(csvData, {
        header: null
    });
}
```

## Writing CSV output

Write arrays of records directly to CSV files using `io:fileWriteCsv()`.

1. **Define the record type** — Create a record named `Product` with fields:
   - `sku` (string)
   - `name` (string)
   - `price` (decimal)
   - `stock` (int)

2. **Add a Variable step** — Create a variable named `products` of type `Product[]`.

3. **Write the CSV file** — Use `io:fileWriteCsv` with:
   - **Path***: `products.csv`
   - **Content***: `products`

   ![Flow designer showing CSV transform and file write steps](/img/develop/transform/csv-flat-file/csv-writing-flow.png)

```ballerina
import ballerina/io;

type Product record {|
    string sku;
    string name;
    decimal price;
    int stock;
|};

public function main() returns error? {
    Product[] products = [
        {sku: "WDG-01", name: "Widget", price: 29.99, stock: 150},
        {sku: "GDG-02", name: "Gadget", price: 49.99, stock: 42},
        {sku: "GZM-03", name: "Gizmo", price: 19.99, stock: 0}
    ];

    check io:fileWriteCsv(
        path = "products.csv",
        content = products
    );
}
```

## Transforming between record types

Transform CSV data from one record structure into another using query expressions.

1. **Define the source and target record types** — Create:
   - `RawOrder`
   - `ProcessedOrder`

2. **Parse the CSV string** — Use `csv:parseString` to parse into `RawOrder[]`.

3. **Transform the data** — Add a **Declare Variable** step using a query expression to map and transform values.

4. **Iterate and print results** — Add a **Foreach** step to process transformed records.

   ![Flow designer showing CSV parse, query transform, and foreach output steps](/img/develop/transform/csv-flat-file/csv-transform-flow.png)

```ballerina
import ballerina/data.csv;
import ballerina/io;

type RawOrder record {|
    string order_id;
    string customer_name;
    string item_sku;
    string quantity;
    string unit_price;
|};

type ProcessedOrder record {|
    string orderId;
    string customer;
    decimal total;
|};

public function main() returns error? {
    string csvData = string `order_id,customer_name,item_sku,quantity,unit_price
ORD-001,Acme Corp,WDG-01,5,29.99
ORD-002,Globex Inc,GDG-02,2,49.99`;

    RawOrder[] raw = check csv:parseString(csvData);

    ProcessedOrder[] processed = from RawOrder r in raw
        let int qty = check int:fromString(r.quantity)
        let decimal price = check decimal:fromString(r.unit_price)
        select {
            orderId: r.order_id,
            customer: r.customer_name,
            total: <decimal>qty * price
        };

    foreach ProcessedOrder ord in processed {
        io:println(string `${ord.orderId}: ${ord.customer} - $${ord.total}`);
    }
}
```

## Fail-safe processing

Use the `failSafe` option to continue parsing even when invalid rows are encountered.

1. **Define the record type** — Create a `Book` record with fields:
   - `name`
   - `author`
   - `price`
   - `publishDate`

2. **Add CSV input data** — Include at least one invalid row to test fail-safe behavior.

3. **Enable fail-safe options** — Configure the parser with:
   ```json
   {
       "failSafe": {
           "enableConsoleLogs": true
       }
   }
   ```

   ![Flow designer showing fail-safe CSV parsing configuration](/img/develop/transform/csv-flat-file/csv-failsafe-flow.png)

```ballerina
import ballerina/data.csv;
import ballerina/io;

type Book record {|
    string name;
    string author;
    decimal price;
    string publishDate;
|};

public function main() returns error? {
    string csvData = string `name,author,price,publishDate
Clean Code,Robert Martin,25.50,2008-08-01
Design Patterns,Gang of Four,INVALID,1994-10-31`;

    Book[] books = check csv:parseString(csvData, {
        failSafe: {
            enableConsoleLogs: true
        }
    });

    io:println(books);
}
```

The invalid row is skipped, the error is logged, and only valid rows are returned.

## Edge cases

### Quoted fields and special characters

The `ballerina/data.csv` module supports RFC 4180 compliant CSV, including quoted fields containing commas, newlines, and escaped quotes.

### Encoding

Use byte arrays and proper encoding conversion when processing non-UTF-8 CSV files.

### Large files

Use `csv:parseStream()` or `csv:parseToStream()` for memory-efficient streaming of large CSV files.

## What's next

- [EDI Processing](edi.md) — Process enterprise data interchange formats
