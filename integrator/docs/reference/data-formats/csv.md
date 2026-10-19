---
title: CSV
---

# CSV

The `ballerina/data.csv` module (v0.8.2) provides type-safe CSV parsing and writing with configurable delimiters, headers, encoding, and streaming support for large files.

## Module

`ballerina/data.csv`

## Usage

### Parse CSV string to records

```ballerina
import ballerina/data.csv;

type Employee record {|
    string name;
    string department;
    decimal salary;
|};

string csvData = string `name,department,salary
Jane Doe,Engineering,95000.00
John Smith,Marketing,85000.00`;

Employee[] employees = check csv:parseString(csvData);
```

### Parse from bytes and streams

```ballerina
import ballerina/data.csv;
import ballerina/io;

type Order record {|
    string id;
    string product;
    int quantity;
|};

// Parse from byte array
byte[] csvBytes = check io:fileReadBytes("orders.csv");
Order[] orders = check csv:parseBytes(csvBytes);

// Parse from a byte stream
stream<byte[], io:Error?> byteStream = check io:fileReadBlocksAsStream("orders.csv");
Order[] orders2 = check csv:parseStream(byteStream);
```

### Stream large CSV files

```ballerina
import ballerina/data.csv;
import ballerina/io;

type Transaction record {|
    string id;
    decimal amount;
    string date;
|};

// Parse incrementally — one record at a time, memory-efficient
stream<byte[], io:Error?> byteStream = check io:fileReadBlocksAsStream("transactions.csv");
stream<Transaction, csv:Error?> txStream = check csv:parseToStream(byteStream);

check txStream.forEach(function(Transaction tx) {
    io:println(tx.id, ": ", tx.amount);
});
```

### Parse to arrays

```ballerina
import ballerina/data.csv;

string csvData = string `name,age,score
Alice,25,92.5
Bob,30,88.0`;

// Parse to arrays instead of records
string[][] rows = check csv:parseString(csvData);
```

### Parse from pre-split rows

```ballerina
import ballerina/data.csv;

string[][] rawRows = [
    ["name", "age"],
    ["Alice", "25"],
    ["Bob", "30"]
];

type Person record {|
    string name;
    int age;
|};

Person[] people = check csv:parseList(rawRows, {headerRows: 1});
```

### Transform records

```ballerina
import ballerina/data.csv;

type InputRecord record {|
    string firstName;
    string lastName;
    string email;
|};

type OutputRecord record {|
    string email;
    string firstName;
|};

InputRecord[] input = [
    {firstName: "Jane", lastName: "Doe", email: "jane@example.com"}
];

// Project to a different record type
OutputRecord[] output = check csv:transform(input);
```

### Custom delimiters and encoding

```ballerina
import ballerina/data.csv;

type Product record {|
    string name;
    decimal price;
|};

// Tab-separated values
string tsvData = string `name	price
Widget	9.99
Gadget	24.99`;

Product[] products = check csv:parseString(tsvData, {delimiter: "\t"});
```

## Functions

| Function | Signature | Description |
|----------|-----------|-------------|
| `parseString` | `parseString(string csvString, ParseOptions options = {}, typedesc<record {}[]\|anydata[][]> t = <>) returns t\|Error` | Parse a CSV string into records or arrays. |
| `parseBytes` | `parseBytes(byte[] csvBytes, ParseOptions options = {}, typedesc<record {}[]\|anydata[][]> t = <>) returns t\|Error` | Parse CSV bytes into records or arrays. |
| `parseStream` | `parseStream(stream<byte[], error?> csvByteStream, ParseOptions options = {}, typedesc<record {}[]\|anydata[][]> t = <>) returns t\|Error` | Parse a CSV byte stream into records or arrays. |
| `parseToStream` | `parseToStream(stream<byte[], error?> csvByteStream, ParseOptions options = {}, typedesc<record {}\|anydata[]> t = <>) returns stream<t, Error?>\|Error` | Parse CSV incrementally, yielding one record at a time. |
| `parseList` | `parseList(string[][] csvList, ParseListOptions options = {}, typedesc<record {}[]\|anydata[][]> t = <>) returns t\|Error` | Parse pre-split string rows into records or arrays. |
| `transform` | `transform(record {}[] csvRecords, TransformOptions options = {}, typedesc<record {}[]\|anydata[][]> t = <>) returns t\|Error` | Transform records to a different record type or arrays. |

## ParseOptions

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `delimiter` | `string:Char` | `","` | Field delimiter character. |
| `encoding` | `string` | `"UTF-8"` | Character encoding. |
| `textEnclosure` | `string:Char` | `"\""` | Character for enclosing text fields. |
| `escapeChar` | `string:Char` | `"\\"` | Escape character. |
| `lineTerminator` | `LineTerminator\|LineTerminator[]` | `[LF, CRLF]` | Line terminator(s). |
| `header` | `int:Unsigned32?` | `0` | Row index of the header (0 = first row). |
| `comment` | `string:Char` | `"#"` | Comment line prefix. |
| `nilValue` | `NilValue?` | `()` | String representation of nil values (`NULL`, `N/A`, `""`, `()`). |
| `locale` | `string` | `"en_US"` | Locale for number parsing. |
| `skipLines` | `int[]\|string` | `[]` | Line numbers or ranges to skip. |
| `outputWithHeaders` | `boolean` | `false` | Whether to include headers in output. |
| `enableConstraintValidation` | `boolean` | `true` | Whether to validate constraints. |

## Annotations

| Annotation | Description |
|------------|-------------|
| `@csv:Name` | Overrides the record field name when mapping to/from CSV headers. Takes a `value` string parameter. |
