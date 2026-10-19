---
title: XLSX
---

# XLSX

The `ballerina/xlsx` module reads and writes Microsoft Excel files in the XLSX format with type-safe data binding to Ballerina records. It provides a one-shot functional API (`parseSheet`, `writeSheet`, `parseTable`, `writeTable`) for single-sheet and single-table ETL, and an object-based Workbook API for multi-sheet operations, byte-array I/O, and cell-level control. All processing is local, with no external service dependency.

For a task-oriented walkthrough, see the [Excel (XLSX) processing guide](../../develop-and-test/data-transformation/xlsx.md). This page is part of the [supported data formats](supported-data-formats.md) reference, alongside the [CSV reference](csv.md).

## Module

`ballerina/xlsx`

## Usage

### Parse a sheet into records

```ballerina
import ballerina/xlsx;

type Employee record {|
    string name;
    int age;
    decimal salary;
|};

public function main() returns error? {
    Employee[] employees = check xlsx:parseSheet("staff.xlsx");
}
```

### Write records to a sheet

```ballerina
import ballerina/xlsx;

type Employee record {|
    string name;
    int age;
|};

public function main() returns error? {
    Employee[] employees = [{name: "Alice", age: 30}, {name: "Bob", age: 25}];

    // sheetWriteMode defaults to FAIL_IF_EXISTS, so an existing sheet is never overwritten by accident.
    check xlsx:writeSheet(employees, "staff.xlsx", "Employees");
}
```

### Map non-matching headers with @xlsx:Name

```ballerina
import ballerina/xlsx;

type Employee record {|
    @xlsx:Name {value: "First Name"}
    string firstName;
    @xlsx:Name {value: "Employee ID"}
    int id;
|};

public function main() returns error? {
    Employee[] employees = check xlsx:parseSheet("staff.xlsx");
}
```

### Work with multiple sheets

```ballerina
import ballerina/xlsx;

type Sale record {|
    string product;
    decimal price;
|};

public function main() returns error? {
    xlsx:Workbook wb = check xlsx:fromFile("sales.xlsx");

    xlsx:Sheet rawSheet = check wb.getSheet("Raw");
    Sale[] sales = check rawSheet.getRows();

    xlsx:Sheet summary = check wb.createSheet("Summary");
    check summary.putRows(sales);

    check wb.save();
    check wb.close();
}
```

### Read and write Excel tables

```ballerina
import ballerina/xlsx;

type Employee record {|
    string name;
    int age;
|};

public function main() returns error? {
    Employee[] employees = check xlsx:parseTable("data.xlsx", "EmployeeTable");

    // REPLACE (default) resizes the table's data range to fit.
    Employee[] updated = [...employees, {name: "Charlie", age: 35}];
    check xlsx:writeTable(updated, "data.xlsx", "EmployeeTable");
}
```

### Bind dates and times

```ballerina
import ballerina/xlsx;
import ballerina/time;

type Transaction record {|
    int id;
    time:Civil timestamp;
    time:Date settledOn;
    decimal amount;
|};

public function main() returns error? {
    Transaction[] txns = check xlsx:parseSheet("transactions.xlsx");
}
```

### Read from bytes, write to bytes

```ballerina
import ballerina/io;
import ballerina/xlsx;

type Order record {|
    int id;
    decimal amount;
|};

public function main() returns error? {
    byte[] inputBytes = check io:fileReadBytes("orders.xlsx");
    xlsx:Workbook wb = check xlsx:fromBytes(inputBytes);

    xlsx:Sheet sheet = check wb.getSheet(0);
    Order[] orders = check sheet.getRows();

    byte[] outputBytes = check wb.toBytes();
    check io:fileWriteBytes("orders-copy.xlsx", outputBytes);
    check wb.close();
}
```

### Continue on row errors with fail-safe mode

```ballerina
import ballerina/xlsx;

type Employee record {|
    string name;
    int age;
|};

public function main() returns error? {
    Employee[] employees = check xlsx:parseSheet("messy.xlsx", 0, {
        failSafe: {
            enableConsoleLogs: true,
            fileOutputMode: {
                filePath: "./errors.log",
                contentType: xlsx:RAW_AND_METADATA
            }
        }
    });
}
```

## Simple API functions

| Function | Signature | Description |
|----------|-----------|-------------|
| `parseSheet` | `parseSheet(string path, string\|int sheet = 0, ParseOptions options = {}, typedesc t = <>) returns t[]\|Error` | Read a sheet and bind each row to the inferred target type. |
| `writeSheet` | `writeSheet(Row[] data, string path, string sheetName = "Sheet1", *SheetWriteOptions options) returns Error?` | Write rows to a sheet. Other sheets in the file are preserved, and the write is atomic. |
| `parseTable` | `parseTable(string path, string tableName, TableParseOptions options = {}, typedesc t = <>) returns t[]\|Error` | Read an Excel Table by name. Tables are unique across the workbook. |
| `writeTable` | `writeTable(Row[] data, string path, string tableName, *TableWriteOptions options) returns Error?` | Write rows to an Excel Table, resizing its data range to fit. |

The row target type drives binding. `Row` is `map \| string[]`; a typed record binds when every field type is a subtype of `CellValue`. `CellValue` is `string\|int\|float\|decimal\|boolean\|time:Date\|time:Civil\|time:TimeOfDay\|()`, where `()` represents a blank cell.

## Workbook

Construct an empty workbook with `new`, or open an existing one with the module-level factories `xlsx:fromFile` and `xlsx:fromBytes`.

```ballerina
xlsx:Workbook wb1 = new;                                  // empty in-memory
xlsx:Workbook wb2 = check xlsx:fromFile("report.xlsx");   // open an existing file
xlsx:Workbook wb3 = check xlsx:fromBytes(sourceBytes);    // open from a byte array
```

| Construction | Description |
|---|---|
| `new` | Empty in-memory workbook. `save()` errors; use `saveAs(path)` to persist. |
| `xlsx:fromFile(string path)` | Opens an existing file. Errors with `FileNotFoundError` if the path does not exist. |
| `xlsx:fromBytes(byte[] bytes)` | Opens the workbook held in a byte array. Use `saveAs(path)` to persist to disk. |

| Method | Description |
|---|---|
| `getSheetNames() returns string[]\|Error` | Names of all sheets in the workbook. |
| `getSheetCount() returns int\|Error` | Number of sheets. |
| `hasSheet(string name) returns boolean\|Error` | Whether a sheet with the given name exists. |
| `getSheet(string\|int sheet) returns Sheet\|Error` | A sheet by name or 0-based index. |
| `createSheet(string name) returns Sheet\|Error` | Creates and returns a new sheet. |
| `deleteSheet(string\|int sheet) returns Error?` | Removes a sheet by name or index. |
| `getTable(string name) returns Table\|Error` | A table by name (unique across the workbook). |
| `getAllTables() returns Table[]\|Error` | All tables in the workbook. |
| `save() returns Error?` | Overwrites the source path. Errors for an in-memory workbook. |
| `saveAs(string path) returns Error?` | Writes to `path` and binds the workbook to it. |
| `toBytes() returns byte[]\|Error` | Serialises the workbook as XLSX bytes. |
| `close() returns Error?` | Releases workbook resources. |

Both `save()` and `saveAs()` write atomically using a temp file and rename, so a failed write never destroys the original file.

## Sheet

A `Sheet` is obtained from a `Workbook` (`getSheet`, `createSheet`); it cannot be constructed with `new`.

| Method | Description |
|---|---|
| `getName() returns string\|Error` | The sheet name. |
| `getUsedRange() returns string\|Error` | The used range in A1 notation, for example `"A1:D50"`. |
| `getUsedCellRange() returns CellRange?\|Error` | The used range as 0-based indices, or nil if the sheet is empty. |
| `getRowCount() returns int\|Error` | Number of rows in the used range. |
| `getColumnCount() returns int\|Error` | Number of columns in the used range. |
| `getRows(ParseOptions options = {}, typedesc t = <>) returns t[]\|Error` | Read all data rows into the inferred target type. |
| `getRow(int index, RowParseOptions options = {}, typedesc t = <>) returns t\|Error` | Read a single data row. Fail-fast (no `failSafe`). |
| `getColumn(string\|int columnRef, ColumnParseOptions options = {}, typedesc t = <>) returns t[]\|Error` | Read a column by header name or 0-based index. |
| `getCell(int rowIndex, int columnIndex, typedesc t = <>) returns t\|Error` | Read a single cell. |
| `putRows(Row[] data, *WriteOptions options) returns Error?` | Write rows. Defaults to `APPEND`. |
| `setRow(int rowIndex, Row data, *RowWriteOptions options) returns Error?` | Write a single row. Defaults to `REPLACE`. |
| `setColumn(string\|int columnRef, CellValue[] data) returns Error?` | Write a column by header name or 0-based index. |
| `setCell(int rowIndex, int columnIndex, CellValue value) returns Error?` | Write a single cell by indices. |
| `setCellByAddress(string cellAddress, CellValue value) returns Error?` | Write a single cell by A1 address. |
| `deleteRow(int index) returns Error?` | Remove a row and shift subsequent rows up. |
| `rename(string newName) returns Error?` | Rename the sheet. |
| `getTable(string name) returns Table\|Error` | A table on this sheet by name. |
| `getTables() returns Table[]\|Error` | All tables on this sheet. |
| `createTable(string name, CellRange\|string range, string[]? headers = ()) returns Table\|Error` | Create a table over an existing range. |
| `createTableFromData(string name, Row[] data, int startRowIndex = 0, int startColumnIndex = 0) returns Table\|Error` | Write data and wrap it in a new table. |
| `deleteTable(string name) returns Error?` | Remove a table from the sheet. |

## Table

A `Table` represents an Excel Table (ListObject). Instances come from a `Workbook` or `Sheet`; they cannot be constructed with `new`. Table names are unique across the entire workbook.

| Method | Description |
|---|---|
| `getName() returns string\|Error` | The table name. |
| `getDisplayName() returns string\|Error` | The table display name. |
| `getSheetName() returns string\|Error` | The name of the sheet that holds the table. |
| `getRange() returns string\|Error` | The full table range in A1 notation. |
| `getCellRange() returns CellRange\|Error` | The full table range as a 0-based record. |
| `getDataRange() returns string\|Error` | The data rows only, in A1 notation. |
| `getDataCellRange() returns CellRange\|Error` | The data rows only, as a 0-based record. |
| `getRowCount() returns int\|Error` | Number of data rows. |
| `getColumnCount() returns int\|Error` | Number of columns. |
| `getHeaders() returns string[]\|Error` | The table's header names. |
| `getRows(TableParseOptions options = {}, typedesc t = <>) returns t[]\|Error` | Read all data rows into the inferred target type. |
| `getRow(int index, TableRowParseOptions options = {}, typedesc t = <>) returns t\|Error` | Read a single data row. Fail-fast. |
| `putRows(Row[] data, *TableWriteOptions options) returns Error?` | Write rows, resizing the data range to fit. Defaults to `REPLACE`. |
| `hasTotalRow() returns boolean\|Error` | Whether the table has a totals row. |
| `getTotalRow(typedesc<map> t = <>) returns t\|Error` | Read the totals row as a map. |
| `rename(string newName) returns Error?` | Rename the table. |
| `resize(CellRange\|string newRange) returns Error?` | Resize the table to a new range. |

## Read options

Read options are modelled by applicability: each operation accepts only the fields it can honour. `formulaMode` and `caseInsensitiveHeaders` are universal. Sheet reads add the positional fields `headerRowIndex` and `dataStartRowIndex`; table reads omit them because a table is self-describing. `ParseOptions` is the bulk sheet type (`parseSheet`, `Sheet.getRows`), `RowParseOptions` the single-row type (`Sheet.getRow`), and `ColumnParseOptions` the column type (`Sheet.getColumn`). `TableParseOptions` (`parseTable`, `Table.getRows`) and `TableRowParseOptions` (`Table.getRow`) are the table equivalents.

| Field | Type | Default | Applies to | Description |
|---|---|---|---|---|
| `formulaMode` | `FormulaMode` | `CACHED` | all reads | How to handle formula cells. See [Formula mode](#formula-mode). |
| `caseInsensitiveHeaders` | `boolean` | `false` | all reads | When `true`, header `"Name"` matches record field `name` or `NAME`. |
| `headerRowIndex` | `int?` | `0` | sheet reads | 0-based index of the header row. Set to `()` for headerless sheets, exposing columns as `col0`, `col1`, and so on. Ignored when reading into `string[][]`. |
| `dataStartRowIndex` | `int` | `headerRowIndex + 1` | sheet reads | 0-based index where data starts. |
| `rowCount` | `int?` | `()` | bulk, column, table | Maximum number of data rows to read. `()` reads all. |
| `enableConstraintValidation` | `boolean` | `true` | record/map reads | Validate parsed records against any `@constraint` annotations. |
| `allowDataProjection` | `DataProjection\|false` | `{}` | record/map reads | `{}` ignores extra columns (lenient). `false` requires every field to have a column (strict). |
| `failSafe` | `FailSafeOptions` | unset | bulk reads | Log and skip row-level errors instead of failing. See [Fail-safe options](#fail-safe-options). |

## Write options

Write operations take option records modelled on what each operation honours. The defaults differ so each writer is safe for its typical use.

| Option record | Used by | Fields (with defaults) |
|---|---|---|
| `SheetWriteOptions` | `writeSheet` | `writeHeaders` (`true`), `startRowIndex` (`0`), `sheetWriteMode` (`FAIL_IF_EXISTS`) |
| `WriteOptions` | `Sheet.putRows` | `writeHeaders` (`true`), `startRowIndex` (`()`), `sheetWriteMode` (`APPEND`) |
| `RowWriteOptions` | `Sheet.setRow` | `headerRowIndex` (`0`), `sheetWriteMode` (`REPLACE`) |
| `TableWriteOptions` | `writeTable`, `Table.putRows` | `tableWriteMode` (`REPLACE`), `insertAt` (`()`) |

`SheetWriteMode` controls how a sheet write treats content already at the target.

| Member | Meaning |
|---|---|
| `FAIL_IF_EXISTS` | Fail rather than touch existing content. Default for `writeSheet`. |
| `REPLACE` | Overwrite in place. `writeSheet` drops and recreates the sheet; row writers overwrite. Default for `Sheet.setRow`. |
| `APPEND` | Add rows, shifting existing content down. Default for `Sheet.putRows`. |

`TableWriteMode` controls how a table write treats the table's existing data. A table always has a data region, so there is no `FAIL_IF_EXISTS`.

| Member | Meaning |
|---|---|
| `REPLACE` | Replace the data, resizing the data range to fit exactly (grows or shrinks). Default. |
| `APPEND` | Add rows below the existing data, or at `insertAt` (a 0-based data-row index). |

## Formula mode

`FormulaMode` selects how formula cells are read.

| Member | Meaning |
|---|---|
| `CACHED` | Use the formula cell's last cached value (default). The target type must match the cached value's type. |
| `TEXT` | Return the formula string, for example `"=SUM(A1:A10)"`. The target field must accept `string`. |

Formula authoring on write is not supported. A string starting with `=` is written as plain text, not as a formula cell. There is no `Formula` wrapper type, and there is no formula re-evaluation or recalculation mode.

## Fail-safe options

Fail-safe options apply to bulk reads only (`parseSheet`, `parseTable`, `Sheet.getRows`, `Table.getRows`). When set, row-level errors are logged and the offending row is skipped; structural errors still fail immediately.

`FailSafeOptions`:

| Field | Type | Default | Description |
|---|---|---|---|
| `enableConsoleLogs` | `boolean` | `true` | Log skipped-row errors to the console. |
| `includeSourceDataInConsole` | `boolean` | `false` | Include the offending row's raw data in console logs. |
| `fileOutputMode` | `FileOutputMode?` | unset | When set, also write errors to a log file. |

`FileOutputMode`:

| Field | Type | Default | Description |
|---|---|---|---|
| `filePath` | `string` | (required) | Path to the error log file. |
| `contentType` | `ErrorLogContentType` | `METADATA` | What to record for each error. |
| `fileWriteOption` | `FileWriteOption` | `APPEND` | Whether to append to or overwrite the log. |

`ErrorLogContentType` is one of `METADATA` (timestamp, location, message), `RAW` (the offending row's values), or `RAW_AND_METADATA` (both). `FileWriteOption` is `APPEND` (default) or `OVERWRITE`.

## Annotations

| Annotation | Description |
|------------|-------------|
| `@xlsx:Name` | Maps a record field to a specific Excel column header. Bidirectional, so it applies on both read and write. Takes a `value` string parameter. |

## Error types

| Error | Description |
|---|---|
| `Error` | Base error type for all `xlsx` errors. |
| `ParseError` | The workbook content is malformed or unreadable. |
| `FileNotFoundError` | The XLSX file path does not exist. |
| `SheetNotFoundError` | No sheet matches the given name or index. |
| `TypeConversionError` | A cell value cannot bind to the target field type. |
| `ConstraintValidationError` | A parsed record fails a `@constraint` rule. |
| `TableNotFoundError` | No table matches the given name. |
| `TableOverlapError` | A write would shift or collide with another table. |
| `InvalidTableRangeError` | A table range or insert position is invalid. |

Structural errors (`ParseError`, `FileNotFoundError`, `SheetNotFoundError`, `TableNotFoundError`, `TableOverlapError`, `InvalidTableRangeError`) always fail immediately. Row-level errors (`TypeConversionError`, `ConstraintValidationError`) fail immediately by default, but are logged and skipped when `failSafe` is set.

Index conventions differ between input and output. Option fields (`headerRowIndex`, `dataStartRowIndex`, `startRowIndex`) and `CellRange` are 0-based. Error locations (`ErrorDetails.rowNumber`, `ErrorDetails.columnNumber`, and `Location`) are 1-based, matching the Excel UI. Code that feeds an error location back into an option value must convert between the two.
