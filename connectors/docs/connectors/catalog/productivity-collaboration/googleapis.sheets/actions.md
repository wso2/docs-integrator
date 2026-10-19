---
title: Actions
---

# Actions

The `ballerinax/googleapis.sheets` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Provides spreadsheet management, worksheet management, and data-level operations via the Google Sheets API v4. |

---

## Client

Provides spreadsheet management, worksheet management, and data-level operations via the Google Sheets API v4.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `BearerTokenConfig|OAuth2RefreshTokenGrantConfig` | Required | OAuth 2.0 refresh token configuration or bearer token for authentication. |
| `httpVersion` | `HttpVersion` | `HTTP_1_1` | The HTTP version understood by the client. |
| `timeout` | `decimal` | `60` | Request timeout in seconds. |
| `retryConfig` | `RetryConfig` | `()` | Retry configuration for failed requests. |
| `secureSocket` | `ClientSecureSocket` | `()` | SSL/TLS configuration. |
| `proxy` | `ProxyConfig` | `()` | Proxy server configuration. |

### Initializing the client

```ballerina
import ballerinax/googleapis.sheets;

configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string refreshToken = ?;

sheets:Client spreadsheetClient = check new ({
    auth: {
        clientId: clientId,
        clientSecret: clientSecret,
        refreshUrl: sheets:REFRESH_URL,
        refreshToken: refreshToken
    }
});
```

### Operations

#### Spreadsheet management

<details>
<summary>createSpreadsheet</summary>

Creates a new spreadsheet with the given name.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `name` | `string` | Yes | Name of the spreadsheet to create. |

Returns: `Spreadsheet|error`

Sample code:

```ballerina
sheets:Spreadsheet response = check spreadsheetClient->createSpreadsheet("NewSpreadsheet");
```

Sample response:

```ballerina
{
  "spreadsheetId": "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms",
  "properties": {"title": "NewSpreadsheet", "locale": "en_US", "autoRecalc": "ON_CHANGE", "timeZone": "America/New_York"},
  "sheets": [{"properties": {"sheetId": 0, "title": "Sheet1", "index": 0, "sheetType": "GRID", "gridProperties": {"rowCount": 1000, "columnCount": 26}}}],
  "spreadsheetUrl": "https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms/edit"
}
```

</details>

<details>
<summary>openSpreadsheetById</summary>

Opens a spreadsheet by its Google Sheets ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `spreadsheetId` | `string` | Yes | The ID of the spreadsheet. |

Returns: `Spreadsheet|error`

Sample code:

```ballerina
sheets:Spreadsheet spreadsheet = check spreadsheetClient->openSpreadsheetById("1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms");
```

Sample response:

```ballerina
{
  "spreadsheetId": "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms",
  "properties": {"title": "MySpreadsheet", "locale": "en_US", "autoRecalc": "ON_CHANGE", "timeZone": "America/New_York"},
  "sheets": [{"properties": {"sheetId": 0, "title": "Sheet1", "index": 0, "sheetType": "GRID"}}],
  "spreadsheetUrl": "https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms/edit"
}
```

</details>

<details>
<summary>openSpreadsheetByUrl</summary>

Opens a spreadsheet by its full Google Sheets URL.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `url` | `string` | Yes | The URL of the spreadsheet. |

Returns: `Spreadsheet|error`

Sample code:

```ballerina
sheets:Spreadsheet spreadsheet = check spreadsheetClient->openSpreadsheetByUrl(
    "https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms/edit"
);
```

Sample response:

```ballerina
{
  "spreadsheetId": "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms",
  "properties": {"title": "MySpreadsheet", "locale": "en_US"},
  "sheets": [{"properties": {"sheetId": 0, "title": "Sheet1", "index": 0}}],
  "spreadsheetUrl": "https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms/edit"
}
```

</details>

<details>
<summary>getAllSpreadsheets</summary>

Returns a stream of all spreadsheet files accessible by the authenticated user.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|

Returns: `stream&lt;File, error?&gt;|error`

Sample code:

```ballerina
stream<sheets:File, error?> files = check spreadsheetClient->getAllSpreadsheets();
check from sheets:File file in files
    do {
        // process each file
    };
```

Sample response:

```ballerina
{"kind": "drive#file", "id": "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms", "name": "MySpreadsheet", "mimeType": "application/vnd.google-apps.spreadsheet"}
```

</details>

<details>
<summary>renameSpreadsheet</summary>

Renames an existing spreadsheet.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `spreadsheetId` | `string` | Yes | ID of the spreadsheet. |
| `name` | `string` | Yes | New name for the spreadsheet. |

Returns: `error?`

Sample code:

```ballerina
check spreadsheetClient->renameSpreadsheet("1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms", "RenamedSpreadsheet");
```

</details>

#### Worksheet management

<details>
<summary>getSheets</summary>

Returns all worksheets of a spreadsheet.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `spreadsheetId` | `string` | Yes | ID of the spreadsheet. |

Returns: `Sheet[]|error`

Sample code:

```ballerina
sheets:Sheet[] worksheets = check spreadsheetClient->getSheets("1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms");
```

Sample response:

```ballerina
[
  {"properties": {"sheetId": 0, "title": "Sheet1", "index": 0, "sheetType": "GRID", "gridProperties": {"rowCount": 1000, "columnCount": 26}}},
  {"properties": {"sheetId": 123456, "title": "Sheet2", "index": 1, "sheetType": "GRID", "gridProperties": {"rowCount": 1000, "columnCount": 26}}}
]
```

</details>

<details>
<summary>getSheetByName</summary>

Returns a specific worksheet by name.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `spreadsheetId` | `string` | Yes | ID of the spreadsheet. |
| `sheetName` | `string` | Yes | Name of the worksheet to retrieve. |

Returns: `Sheet|error`

Sample code:

```ballerina
sheets:Sheet sheet = check spreadsheetClient->getSheetByName("1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms", "Sheet1");
```

Sample response:

```ballerina
{"properties": {"sheetId": 0, "title": "Sheet1", "index": 0, "sheetType": "GRID", "gridProperties": {"rowCount": 1000, "columnCount": 26}}}
```

</details>

<details>
<summary>addSheet</summary>

Adds a new worksheet to the spreadsheet.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `spreadsheetId` | `string` | Yes | ID of the spreadsheet. |
| `sheetName` | `string` | Yes | Name for the new worksheet. |

Returns: `Sheet|error`

Sample code:

```ballerina
sheets:Sheet newSheet = check spreadsheetClient->addSheet("1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms", "NewWorksheet");
```

Sample response:

```ballerina
{"properties": {"sheetId": 987654, "title": "NewWorksheet", "index": 1, "sheetType": "GRID", "gridProperties": {"rowCount": 1000, "columnCount": 26}}}
```

</details>

<details>
<summary>removeSheet</summary>

Deletes a worksheet by its sheet ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `spreadsheetId` | `string` | Yes | ID of the spreadsheet. |
| `sheetId` | `int` | Yes | ID of the worksheet to delete. |

Returns: `error?`

Sample code:

```ballerina
check spreadsheetClient->removeSheet("1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms", 987654);
```

</details>

<details>
<summary>removeSheetByName</summary>

Deletes a worksheet by its name.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `spreadsheetId` | `string` | Yes | ID of the spreadsheet. |
| `sheetName` | `string` | Yes | Name of the worksheet to delete. |

Returns: `error?`

Sample code:

```ballerina
check spreadsheetClient->removeSheetByName("1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms", "NewWorksheet");
```

</details>

<details>
<summary>renameSheet</summary>

Renames an existing worksheet.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `spreadsheetId` | `string` | Yes | ID of the spreadsheet. |
| `sheetName` | `string` | Yes | Current name of the worksheet. |
| `name` | `string` | Yes | New name for the worksheet. |

Returns: `error?`

Sample code:

```ballerina
check spreadsheetClient->renameSheet("1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms", "Sheet1", "RenamedSheet");
```

</details>

<details>
<summary>copyTo</summary>

Copies a worksheet to another spreadsheet by worksheet ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `spreadsheetId` | `string` | Yes | ID of the source spreadsheet. |
| `sheetId` | `int` | Yes | ID of the worksheet to copy. |
| `destinationId` | `string` | Yes | ID of the destination spreadsheet. |

Returns: `error?`

Sample code:

```ballerina
check spreadsheetClient->copyTo("1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms", 0, "destinationSpreadsheetId");
```

</details>

<details>
<summary>copyToBySheetName</summary>

Copies a worksheet to another spreadsheet by worksheet name.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `spreadsheetId` | `string` | Yes | ID of the source spreadsheet. |
| `sheetName` | `string` | Yes | Name of the worksheet to copy. |
| `destinationId` | `string` | Yes | ID of the destination spreadsheet. |

Returns: `error?`

Sample code:

```ballerina
check spreadsheetClient->copyToBySheetName("1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms", "Sheet1", "destinationSpreadsheetId");
```

</details>

<details>
<summary>clearAll</summary>

Clears all content and formatting from a worksheet by worksheet ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `spreadsheetId` | `string` | Yes | ID of the spreadsheet. |
| `sheetId` | `int` | Yes | ID of the worksheet to clear. |

Returns: `error?`

Sample code:

```ballerina
check spreadsheetClient->clearAll("1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms", 0);
```

</details>

<details>
<summary>clearAllBySheetName</summary>

Clears all content and formatting from a worksheet by worksheet name.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `spreadsheetId` | `string` | Yes | ID of the spreadsheet. |
| `sheetName` | `string` | Yes | Name of the worksheet to clear. |

Returns: `error?`

Sample code:

```ballerina
check spreadsheetClient->clearAllBySheetName("1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms", "Sheet1");
```

</details>

#### Range operations

<details>
<summary>setRange</summary>

Sets values for a given range of cells in a worksheet.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `spreadsheetId` | `string` | Yes | ID of the spreadsheet. |
| `sheetName` | `string` | Yes | Name of the worksheet. |
| `range` | `Range` | Yes | The Range record containing A1 notation and a 2D array of values. |
| `valueInputOption` | `string?` | No | How input data should be interpreted: `"RAW"` or `"USER_ENTERED"`. Default is `"RAW"`. |

Returns: `error?`

Sample code:

```ballerina
sheets:Range range = {
    a1Notation: "A1:C3",
    values: [
        ["Name", "Age", "City"],
        ["Alice", 30, "New York"],
        ["Bob", 25, "London"]
    ]
};
check spreadsheetClient->setRange(spreadsheetId, "Sheet1", range);
```

</details>

<details>
<summary>getRange</summary>

Gets the values in a given range of the worksheet.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `spreadsheetId` | `string` | Yes | ID of the spreadsheet. |
| `sheetName` | `string` | Yes | Name of the worksheet. |
| `a1Notation` | `string` | Yes | The range to retrieve in A1 notation (e.g., `"A1:C3"`). |
| `valueRenderOption` | `string?` | No | How values should be rendered: `"FORMATTED_VALUE"`, `"UNFORMATTED_VALUE"`, or `"FORMULA"`. Default is `"FORMATTED_VALUE"`. |

Returns: `Range|error`

Sample code:

```ballerina
sheets:Range range = check spreadsheetClient->getRange(spreadsheetId, "Sheet1", "A1:C3");
```

Sample response:

```ballerina
{
  "a1Notation": "A1:C3",
  "values": [
    ["Name", "Age", "City"],
    ["Alice", "30", "New York"],
    ["Bob", "25", "London"]
  ]
}
```

</details>

<details>
<summary>clearRange</summary>

Clears the contents, formats, and data validation rules of a given range.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `spreadsheetId` | `string` | Yes | ID of the spreadsheet. |
| `sheetName` | `string` | Yes | Name of the worksheet. |
| `a1Notation` | `string` | Yes | The range to clear in A1 notation. |

Returns: `error?`

Sample code:

```ballerina
check spreadsheetClient->clearRange(spreadsheetId, "Sheet1", "A1:C3");
```

</details>

#### Row operations

<details>
<summary>createOrUpdateRow</summary>

Creates or updates a row at the specified position.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `spreadsheetId` | `string` | Yes | ID of the spreadsheet. |
| `sheetName` | `string` | Yes | Name of the worksheet. |
| `row` | `int` | Yes | Row number (1-based) to set data. |
| `values` | `(int|string|decimal)[]` | Yes | Array of values for the row. |
| `valueInputOption` | `string?` | No | How input data should be interpreted: `"RAW"` or `"USER_ENTERED"`. Default is `"RAW"`. |

Returns: `error?`

Sample code:

```ballerina
check spreadsheetClient->createOrUpdateRow(spreadsheetId, "Sheet1", 1, ["Name", "Age", "City"]);
```

</details>

<details>
<summary>getRow</summary>

Gets the values in the given row of the worksheet.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `spreadsheetId` | `string` | Yes | ID of the spreadsheet. |
| `sheetName` | `string` | Yes | Name of the worksheet. |
| `row` | `int` | Yes | Row number to retrieve. |
| `valueRenderOption` | `string?` | No | How values should be rendered: `"FORMATTED_VALUE"`, `"UNFORMATTED_VALUE"`, or `"FORMULA"`. |

Returns: `Row|error`

Sample code:

```ballerina
sheets:Row row = check spreadsheetClient->getRow(spreadsheetId, "Sheet1", 1);
```

Sample response:

```ballerina
{"rowPosition": 1, "values": ["Name", "Age", "City"]}
```

</details>

<details>
<summary>deleteRows</summary>

Deletes a number of rows starting at the given position by worksheet ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `spreadsheetId` | `string` | Yes | ID of the spreadsheet. |
| `sheetId` | `int` | Yes | ID of the worksheet. |
| `row` | `int` | Yes | Starting row position. |
| `numberOfRows` | `int` | Yes | Number of rows to delete. |

Returns: `error?`

Sample code:

```ballerina
check spreadsheetClient->deleteRows(spreadsheetId, 0, 5, 2);
```

</details>

<details>
<summary>deleteRowsBySheetName</summary>

Deletes a number of rows starting at the given position by worksheet name.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `spreadsheetId` | `string` | Yes | ID of the spreadsheet. |
| `sheetName` | `string` | Yes | Name of the worksheet. |
| `row` | `int` | Yes | Starting row position. |
| `numberOfRows` | `int` | Yes | Number of rows to delete. |

Returns: `error?`

Sample code:

```ballerina
check spreadsheetClient->deleteRowsBySheetName(spreadsheetId, "Sheet1", 5, 2);
```

</details>

<details>
<summary>addRowsBefore</summary>

Inserts rows before the given row position by worksheet ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `spreadsheetId` | `string` | Yes | ID of the spreadsheet. |
| `sheetId` | `int` | Yes | ID of the worksheet. |
| `index` | `int` | Yes | Row position before which new rows are inserted. |
| `numberOfRows` | `int` | Yes | Number of rows to insert. |

Returns: `error?`

Sample code:

```ballerina
check spreadsheetClient->addRowsBefore(spreadsheetId, 0, 3, 2);
```

</details>

<details>
<summary>addRowsBeforeBySheetName</summary>

Inserts rows before the given row position by worksheet name.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `spreadsheetId` | `string` | Yes | ID of the spreadsheet. |
| `sheetName` | `string` | Yes | Name of the worksheet. |
| `index` | `int` | Yes | Row position before which new rows are inserted. |
| `numberOfRows` | `int` | Yes | Number of rows to insert. |

Returns: `error?`

Sample code:

```ballerina
check spreadsheetClient->addRowsBeforeBySheetName(spreadsheetId, "Sheet1", 3, 2);
```

</details>

<details>
<summary>addRowsAfter</summary>

Inserts rows after the given row position by worksheet ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `spreadsheetId` | `string` | Yes | ID of the spreadsheet. |
| `sheetId` | `int` | Yes | ID of the worksheet. |
| `index` | `int` | Yes | Row position after which new rows are inserted. |
| `numberOfRows` | `int` | Yes | Number of rows to insert. |

Returns: `error?`

Sample code:

```ballerina
check spreadsheetClient->addRowsAfter(spreadsheetId, 0, 5, 3);
```

</details>

<details>
<summary>addRowsAfterBySheetName</summary>

Inserts rows after the given row position by worksheet name.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `spreadsheetId` | `string` | Yes | ID of the spreadsheet. |
| `sheetName` | `string` | Yes | Name of the worksheet. |
| `index` | `int` | Yes | Row position after which new rows are inserted. |
| `numberOfRows` | `int` | Yes | Number of rows to insert. |

Returns: `error?`

Sample code:

```ballerina
check spreadsheetClient->addRowsAfterBySheetName(spreadsheetId, "Sheet1", 5, 3);
```

</details>

<details>
<summary>appendValue</summary>

Appends a single row of values to the bottom of a table within the specified range.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `spreadsheetId` | `string` | Yes | ID of the spreadsheet. |
| `values` | `(int|string|decimal|boolean|float)[]` | Yes | Array of values for the row to append. |
| `a1Range` | `A1Range` | Yes | The A1 range defining the target table. |
| `valueInputOption` | `string?` | No | How input data should be interpreted: `"RAW"` or `"USER_ENTERED"`. Default is `"RAW"`. |

Returns: `ValueRange|error`

Sample code:

```ballerina
sheets:ValueRange result = check spreadsheetClient->appendValue(
    spreadsheetId,
    ["Charlie", 28, "Paris"],
    {sheetName: "Sheet1", startIndex: "A1", endIndex: "C1"}
);
```

Sample response:

```ballerina
{"rowPosition": 4, "values": ["Charlie", 28, "Paris"], "a1Range": {"sheetName": "Sheet1", "startIndex": "A4", "endIndex": "C4"}}
```

</details>

<details>
<summary>appendValues</summary>

Appends multiple rows of values to the bottom of a table within the specified range.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `spreadsheetId` | `string` | Yes | ID of the spreadsheet. |
| `values` | `(int|string|decimal|boolean|float)[][]` | Yes | 2D array of values for the rows to append. |
| `a1Range` | `A1Range` | Yes | The A1 range defining the target table. |
| `valueInputOption` | `string?` | No | How input data should be interpreted: `"RAW"` or `"USER_ENTERED"`. Default is `"RAW"`. |

Returns: `ValuesRange|error`

Sample code:

```ballerina
sheets:ValuesRange result = check spreadsheetClient->appendValues(
    spreadsheetId,
    [["Dave", 35, "Berlin"], ["Eve", 22, "Tokyo"]],
    {sheetName: "Sheet1", startIndex: "A1", endIndex: "C1"}
);
```

Sample response:

```ballerina
{"rowStartPosition": 5, "values": [["Dave", 35, "Berlin"], ["Eve", 22, "Tokyo"]], "a1Range": {"sheetName": "Sheet1", "startIndex": "A5", "endIndex": "C6"}}
```

</details>

#### Column operations

<details>
<summary>createOrUpdateColumn</summary>

Creates or updates a column at the specified position.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `spreadsheetId` | `string` | Yes | ID of the spreadsheet. |
| `sheetName` | `string` | Yes | Name of the worksheet. |
| `column` | `string` | Yes | Column position in letter notation (e.g., `"A"`). |
| `values` | `(int|string|decimal)[]` | Yes | Array of values for the column. |
| `valueInputOption` | `string?` | No | How input data should be interpreted: `"RAW"` or `"USER_ENTERED"`. Default is `"RAW"`. |

Returns: `error?`

Sample code:

```ballerina
check spreadsheetClient->createOrUpdateColumn(spreadsheetId, "Sheet1", "A", ["Name", "Alice", "Bob", "Charlie"]);
```

</details>

<details>
<summary>getColumn</summary>

Gets the values in the given column of the worksheet.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `spreadsheetId` | `string` | Yes | ID of the spreadsheet. |
| `sheetName` | `string` | Yes | Name of the worksheet. |
| `column` | `string` | Yes | Column position in letter notation (e.g., `"A"`). |
| `valueRenderOption` | `string?` | No | How values should be rendered: `"FORMATTED_VALUE"`, `"UNFORMATTED_VALUE"`, or `"FORMULA"`. |

Returns: `Column|error`

Sample code:

```ballerina
sheets:Column column = check spreadsheetClient->getColumn(spreadsheetId, "Sheet1", "A");
```

Sample response:

```ballerina
{"columnPosition": "A", "values": ["Name", "Alice", "Bob", "Charlie"]}
```

</details>

<details>
<summary>deleteColumns</summary>

Deletes columns starting at the given position by worksheet ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `spreadsheetId` | `string` | Yes | ID of the spreadsheet. |
| `sheetId` | `int` | Yes | ID of the worksheet. |
| `column` | `int` | Yes | Starting column position. |
| `numberOfColumns` | `int` | Yes | Number of columns to delete. |

Returns: `error?`

Sample code:

```ballerina
check spreadsheetClient->deleteColumns(spreadsheetId, 0, 3, 1);
```

</details>

<details>
<summary>deleteColumnsBySheetName</summary>

Deletes columns starting at the given position by worksheet name.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `spreadsheetId` | `string` | Yes | ID of the spreadsheet. |
| `sheetName` | `string` | Yes | Name of the worksheet. |
| `column` | `int` | Yes | Starting column position. |
| `numberOfColumns` | `int` | Yes | Number of columns to delete. |

Returns: `error?`

Sample code:

```ballerina
check spreadsheetClient->deleteColumnsBySheetName(spreadsheetId, "Sheet1", 3, 1);
```

</details>

<details>
<summary>addColumnsBefore</summary>

Inserts columns before the given column position by worksheet ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `spreadsheetId` | `string` | Yes | ID of the spreadsheet. |
| `sheetId` | `int` | Yes | ID of the worksheet. |
| `index` | `int` | Yes | Column position before which new columns are inserted. |
| `numberOfColumns` | `int` | Yes | Number of columns to insert. |

Returns: `error?`

Sample code:

```ballerina
check spreadsheetClient->addColumnsBefore(spreadsheetId, 0, 2, 3);
```

</details>

<details>
<summary>addColumnsBeforeBySheetName</summary>

Inserts columns before the given column position by worksheet name.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `spreadsheetId` | `string` | Yes | ID of the spreadsheet. |
| `sheetName` | `string` | Yes | Name of the worksheet. |
| `index` | `int` | Yes | Column position before which new columns are inserted. |
| `numberOfColumns` | `int` | Yes | Number of columns to insert. |

Returns: `error?`

Sample code:

```ballerina
check spreadsheetClient->addColumnsBeforeBySheetName(spreadsheetId, "Sheet1", 2, 3);
```

</details>

<details>
<summary>addColumnsAfter</summary>

Inserts columns after the given column position by worksheet ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `spreadsheetId` | `string` | Yes | ID of the spreadsheet. |
| `sheetId` | `int` | Yes | ID of the worksheet. |
| `index` | `int` | Yes | Column position after which new columns are inserted. |
| `numberOfColumns` | `int` | Yes | Number of columns to insert. |

Returns: `error?`

Sample code:

```ballerina
check spreadsheetClient->addColumnsAfter(spreadsheetId, 0, 2, 3);
```

</details>

<details>
<summary>addColumnsAfterBySheetName</summary>

Inserts columns after the given column position by worksheet name.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `spreadsheetId` | `string` | Yes | ID of the spreadsheet. |
| `sheetName` | `string` | Yes | Name of the worksheet. |
| `index` | `int` | Yes | Column position after which new columns are inserted. |
| `numberOfColumns` | `int` | Yes | Number of columns to insert. |

Returns: `error?`

Sample code:

```ballerina
check spreadsheetClient->addColumnsAfterBySheetName(spreadsheetId, "Sheet1", 2, 3);
```

</details>

#### Cell operations

<details>
<summary>setCell</summary>

Sets the value of a single cell.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `spreadsheetId` | `string` | Yes | ID of the spreadsheet. |
| `sheetName` | `string` | Yes | Name of the worksheet. |
| `a1Notation` | `string` | Yes | Cell position in A1 notation (e.g., `"A1"`). |
| `value` | `int|string|decimal` | Yes | Value to set in the cell. |
| `valueInputOption` | `string?` | No | How input data should be interpreted: `"RAW"` or `"USER_ENTERED"`. Default is `"RAW"`. |

Returns: `error?`

Sample code:

```ballerina
check spreadsheetClient->setCell(spreadsheetId, "Sheet1", "A1", "Hello World");
```

</details>

<details>
<summary>getCell</summary>

Gets the value of a single cell.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `spreadsheetId` | `string` | Yes | ID of the spreadsheet. |
| `sheetName` | `string` | Yes | Name of the worksheet. |
| `a1Notation` | `string` | Yes | Cell position in A1 notation (e.g., `"A1"`). |
| `valueRenderOption` | `string?` | No | How values should be rendered: `"FORMATTED_VALUE"`, `"UNFORMATTED_VALUE"`, or `"FORMULA"`. |

Returns: `Cell|error`

Sample code:

```ballerina
sheets:Cell cell = check spreadsheetClient->getCell(spreadsheetId, "Sheet1", "A1");
```

Sample response:

```ballerina
{"a1Notation": "A1", "value": "Hello World"}
```

</details>

<details>
<summary>clearCell</summary>

Clears the contents, formats, and data validation rules of a single cell.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `spreadsheetId` | `string` | Yes | ID of the spreadsheet. |
| `sheetName` | `string` | Yes | Name of the worksheet. |
| `a1Notation` | `string` | Yes | Cell position in A1 notation (e.g., `"A1"`). |

Returns: `error?`

Sample code:

```ballerina
check spreadsheetClient->clearCell(spreadsheetId, "Sheet1", "A1");
```

</details>

#### Data filtering & metadata

<details>
<summary>setRowMetaData</summary>

Adds developer metadata to the given row.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `spreadsheetId` | `string` | Yes | ID of the spreadsheet. |
| `sheetId` | `int` | Yes | ID of the worksheet. |
| `rowIndex` | `int` | Yes | Index of the target row. |
| `visibility` | `Visibility` | Yes | Visibility of the metadata: `UNSPECIFIED_VISIBILITY`, `DOCUMENT`, or `PROJECT`. |
| `key` | `string` | Yes | Metadata key assigned to the row. |
| `value` | `string` | Yes | Value associated with the key (should be unique). |

Returns: `error?`

Sample code:

```ballerina
check spreadsheetClient->setRowMetaData(spreadsheetId, 0, 1, "DOCUMENT", "status", "approved");
```

</details>

<details>
<summary>getRowByDataFilter</summary>

Fetches rows matching the given filter criteria. Supports A1Range, GridRange, and DeveloperMetadataLookup filters.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `spreadsheetId` | `string` | Yes | ID of the spreadsheet. |
| `sheetId` | `int` | Yes | ID of the worksheet. |
| `filter` | `Filter` | Yes | A filter record (`A1Range`, `GridRangeFilter`, or `DeveloperMetadataLookupFilter`). |

Returns: `ValueRange[]|error`

Sample code:

```ballerina
sheets:DeveloperMetadataLookupFilter filter = {
    locationType: "ROW",
    metadataValue: "approved"
};
sheets:ValueRange[] rows = check spreadsheetClient->getRowByDataFilter(spreadsheetId, 0, filter);
```

Sample response:

```ballerina
[{"rowPosition": 1, "values": ["Alice", 30, "New York"], "a1Range": {"sheetName": "Sheet1", "startIndex": "A1", "endIndex": "C1"}}]
```

</details>

<details>
<summary>updateRowByDataFilter</summary>

Updates rows matching the given filter criteria.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `spreadsheetId` | `string` | Yes | ID of the spreadsheet. |
| `sheetId` | `int` | Yes | ID of the worksheet. |
| `filter` | `Filter` | Yes | A filter record (`A1Range`, `GridRangeFilter`, or `DeveloperMetadataLookupFilter`). |
| `values` | `(int|string|decimal|boolean|float)[]` | Yes | New values to assign to matching rows. |
| `valueInputOption` | `string` | Yes | How input data should be interpreted: `"RAW"` or `"USER_ENTERED"`. |

Returns: `error?`

Sample code:

```ballerina
sheets:DeveloperMetadataLookupFilter filter = {
    locationType: "ROW",
    metadataValue: "approved"
};
check spreadsheetClient->updateRowByDataFilter(spreadsheetId, 0, filter, ["Alice", 31, "Boston"], "RAW");
```

</details>

<details>
<summary>deleteRowByDataFilter</summary>

Deletes rows matching the given filter criteria.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `spreadsheetId` | `string` | Yes | ID of the spreadsheet. |
| `sheetId` | `int` | Yes | ID of the worksheet. |
| `filter` | `Filter` | Yes | A filter record (`A1Range`, `GridRangeFilter`, or `DeveloperMetadataLookupFilter`). |

Returns: `error?`

Sample code:

```ballerina
sheets:DeveloperMetadataLookupFilter filter = {
    locationType: "ROW",
    metadataValue: "approved"
};
check spreadsheetClient->deleteRowByDataFilter(spreadsheetId, 0, filter);
```

</details>
