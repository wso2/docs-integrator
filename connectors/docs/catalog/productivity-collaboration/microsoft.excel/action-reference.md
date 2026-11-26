---
title: Actions
---

# Actions

The Microsoft Excel connector exposes the following clients:

Available clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Work with Excel workbooks stored in OneDrive for Business and SharePoint through the Microsoft Graph v1.0 API, including worksheets, ranges, tables, charts, PivotTables, named items, comments and workbook sessions |

---

## Client

The `Client` connects to the Microsoft Graph v1.0 API and acts on behalf of the signed-in user. Every operation identifies the workbook by the ID of the drive that holds it (`driveId`) and the ID of the workbook file in that drive (`driveItemId`).

### Configuration

`ConnectionConfig`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | <code>http:BearerTokenConfig&#124;OAuth2RefreshTokenGrantConfig</code> | Required | Authentication configuration. `OAuth2RefreshTokenGrantConfig` takes the client ID, client secret, refresh token and `refreshUrl`, which defaults to `https://login.microsoftonline.com/common/oauth2/v2.0/token` |
| `httpVersion` | <code>http:HttpVersion</code> | <code>http:HTTP_2_0</code> | HTTP version used by the client |
| `http1Settings` | <code>http:ClientHttp1Settings</code> | <code>&#123;&#125;</code> | HTTP/1.x protocol settings |
| `http2Settings` | <code>http:ClientHttp2Settings</code> | <code>&#123;&#125;</code> | HTTP/2 protocol settings |
| `timeout` | <code>decimal</code> | <code>30</code> | Maximum wait time in seconds for a response |
| `forwarded` | <code>string</code> | <code>"disable"</code> | Handling of `forwarded`/`x-forwarded` header |
| `followRedirects` | <code>http:FollowRedirects</code> | Optional | Redirection configuration |
| `poolConfig` | <code>http:PoolConfiguration</code> | Optional | Connection pool configuration |
| `cache` | <code>http:CacheConfig</code> | <code>&#123;&#125;</code> | HTTP caching configuration |
| `compression` | <code>http:Compression</code> | <code>http:COMPRESSION_AUTO</code> | `accept-encoding` header handling |
| `circuitBreaker` | <code>http:CircuitBreakerConfig</code> | Optional | Circuit breaker configuration |
| `retryConfig` | <code>http:RetryConfig</code> | Optional | Retry configuration |
| `cookieConfig` | <code>http:CookieConfig</code> | Optional | Cookie configuration |
| `responseLimits` | <code>http:ResponseLimitConfigs</code> | <code>&#123;&#125;</code> | Inbound response size limits |
| `secureSocket` | <code>http:ClientSecureSocket</code> | Optional | SSL/TLS options |
| `proxy` | <code>http:ProxyConfig</code> | Optional | Proxy server options |
| `socketConfig` | <code>http:ClientSocketConfig</code> | <code>&#123;&#125;</code> | Client socket configuration |
| `validation` | <code>boolean</code> | <code>true</code> | Enables inbound payload validation |
| `laxDataBinding` | <code>boolean</code> | <code>true</code> | Treats `nil` values as optional during data binding |

The client's `serviceUrl` argument defaults to `https://graph.microsoft.com/v1.0`.

### Initializing the client

```ballerina
import ballerinax/microsoft.excel;

configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string refreshToken = ?;
configurable string refreshUrl = ?;
configurable string driveId = ?;
configurable string driveItemId = ?;

final excel:Client excelClient = check new ({
    auth: {clientId, clientSecret, refreshToken, refreshUrl}
});
```

### Operations

#### Workbook and application

<details>
<summary>getWorkbook</summary>

Retrieves the workbook object of an Excel file.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `headers` | <code>GetWorkbookHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |
| `dollarExpand` | <code>string[]</code> | No | Expand related entities |
| `dollarSelect` | <code>string[]</code> | No | Select properties to be returned |

**Returns:** `Workbook&#124;error`

**Sample code:**

```ballerina
excel:Workbook result = check excelClient->getWorkbook(driveId, driveItemId);
```

**Sample response:**

```json
{
  "application": {
    "calculationMode": "Automatic"
  },
  "functions": {}
}
```

</details>

<details>
<summary>updateWorkbook</summary>

Updates the properties of a workbook.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `payload` | <code>Workbook</code> | Yes | Workbook properties to update |
| `headers` | <code>UpdateWorkbookHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `Workbook&#124;error`

**Sample code:**

```ballerina
excel:Workbook result = check excelClient->updateWorkbook(driveId, driveItemId, {});
```

**Sample response:**

```json
{
  "application": {
    "calculationMode": "Automatic"
  },
  "functions": {}
}
```

</details>

<details>
<summary>getApplication</summary>

Retrieves the Excel application object of a workbook, which reports the calculation mode.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `headers` | <code>GetApplicationHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |
| `dollarExpand` | <code>string[]</code> | No | Expand related entities |
| `dollarSelect` | <code>string[]</code> | No | Select properties to be returned |

**Returns:** `Application&#124;error`

**Sample code:**

```ballerina
excel:Application result = check excelClient->getApplication(driveId, driveItemId);
```

**Sample response:**

```json
{
  "calculationMode": "Automatic"
}
```

</details>

<details>
<summary>updateApplication</summary>

Updates the Excel application object of a workbook, such as its calculation mode.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `payload` | <code>Application</code> | Yes | Excel application properties to update |
| `headers` | <code>UpdateApplicationHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `Application&#124;error`

**Sample code:**

```ballerina
excel:Application result = check excelClient->updateApplication(driveId, driveItemId,
    {calculationMode: "Automatic"});
```

**Sample response:**

```json
{
  "calculationMode": "Automatic"
}
```

</details>

<details>
<summary>calculateApplication</summary>

Recalculates all currently open workbooks in Excel.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `payload` | <code>CalculateApplicationRequest</code> | Yes | Type of calculation to run: `Recalculate`, `Full` or `FullRebuild` |
| `headers` | <code>CalculateApplicationHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `error?`

**Sample code:**

```ballerina
check excelClient->calculateApplication(driveId, driveItemId, {calculationType: "Full"});
```

</details>

#### Worksheets

<details>
<summary>listWorksheets</summary>

Lists the worksheets in a workbook.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `headers` | <code>ListWorksheetsHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |
| `dollarSkip` | <code>int</code> | No | Skip the first n items |
| `dollarTop` | <code>int</code> | No | Show only the first n items |
| `dollarFilter` | <code>string</code> | No | Filter items by property values |
| `dollarSearch` | <code>string</code> | No | Search items by search phrases |
| `dollarOrderby` | <code>string[]</code> | No | Order items by property values |
| `dollarExpand` | <code>string[]</code> | No | Expand related entities |
| `dollarCount` | <code>boolean</code> | No | Include count of items |
| `dollarSelect` | <code>string[]</code> | No | Select properties to be returned |

**Returns:** `WorksheetCollectionResponse&#124;error`

**Sample code:**

```ballerina
excel:WorksheetCollectionResponse result = check excelClient->listWorksheets(driveId, driveItemId);
```

**Sample response:**

```json
{
  "value": [
    {
      "id": "{00000000-0001-0000-0000-000000000000}",
      "visibility": "Visible",
      "name": "Sheet1",
      "position": 0
    }
  ]
}
```

</details>

<details>
<summary>createWorksheet</summary>

Creates a worksheet in a workbook.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `payload` | <code>Worksheet</code> | Yes | Worksheet to create |
| `headers` | <code>CreateWorksheetHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `Worksheet&#124;error`

**Sample code:**

```ballerina
excel:Worksheet result = check excelClient->createWorksheet(driveId, driveItemId,
    {name: "Q4 Expenses", position: 0});
```

**Sample response:**

```json
{
  "id": "{00000000-0001-0000-0000-000000000000}",
  "visibility": "Visible",
  "name": "Sheet1",
  "position": 0
}
```

</details>

<details>
<summary>getWorksheet</summary>

Retrieves a worksheet by its ID or name.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `headers` | <code>GetWorksheetHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |
| `dollarExpand` | <code>string[]</code> | No | Expand related entities |
| `dollarSelect` | <code>string[]</code> | No | Select properties to be returned |

**Returns:** `Worksheet&#124;error`

**Sample code:**

```ballerina
excel:Worksheet result = check excelClient->getWorksheet(driveId, driveItemId, "Sheet1");
```

**Sample response:**

```json
{
  "id": "{00000000-0001-0000-0000-000000000000}",
  "visibility": "Visible",
  "name": "Sheet1",
  "position": 0
}
```

</details>

<details>
<summary>deleteWorksheet</summary>

Deletes a worksheet from a workbook.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `headers` | <code>DeleteWorksheetHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `error?`

**Sample code:**

```ballerina
check excelClient->deleteWorksheet(driveId, driveItemId, "Sheet1");
```

</details>

<details>
<summary>updateWorksheet</summary>

Updates the properties of a worksheet, such as its name, position or visibility.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `payload` | <code>Worksheet</code> | Yes | Worksheet properties to update |
| `headers` | <code>UpdateWorksheetHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `Worksheet&#124;error`

**Sample code:**

```ballerina
excel:Worksheet result = check excelClient->updateWorksheet(driveId, driveItemId,
    "Sheet1", {name: "Q4 Expenses", position: 0});
```

**Sample response:**

```json
{
  "id": "{00000000-0001-0000-0000-000000000000}",
  "visibility": "Visible",
  "name": "Sheet1",
  "position": 0
}
```

</details>

<details>
<summary>countWorksheets</summary>

Returns the number of worksheets in a workbook.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `headers` | <code>CountWorksheetsHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |
| `dollarFilter` | <code>string</code> | No | Filter items by property values |
| `dollarSearch` | <code>string</code> | No | Search items by search phrases |

**Returns:** `string&#124;error`

**Sample code:**

```ballerina
string result = check excelClient->countWorksheets(driveId, driveItemId);
```

**Sample response:**

```json
"3"
```

</details>

<details>
<summary>addWorksheet</summary>

Adds a worksheet to a workbook.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `payload` | <code>AddWorksheetRequest</code> | Yes | Name of the new worksheet |
| `headers` | <code>AddWorksheetHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `AddWorksheetResponse&#124;error`

**Sample code:**

```ballerina
excel:AddWorksheetResponse result = check excelClient->addWorksheet(driveId, driveItemId,
    {name: "Expenses"});
```

**Sample response:**

```json
{
  "id": "{00000000-0001-0000-0000-000000000000}",
  "visibility": "Visible",
  "name": "Sheet1",
  "position": 0
}
```

</details>

#### Worksheet protection

<details>
<summary>getProtection</summary>

Retrieves the protection status and options of a worksheet.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `headers` | <code>GetProtectionHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |
| `dollarExpand` | <code>string[]</code> | No | Expand related entities |
| `dollarSelect` | <code>string[]</code> | No | Select properties to be returned |

**Returns:** `WorksheetProtection&#124;error`

**Sample code:**

```ballerina
excel:WorksheetProtection result = check excelClient->getProtection(driveId, driveItemId, "Sheet1");
```

**Sample response:**

```json
{
  "protected": false
}
```

</details>

<details>
<summary>updateProtection</summary>

Updates the protection object of a worksheet.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `payload` | <code>WorksheetProtection</code> | Yes | Worksheet protection properties to update |
| `headers` | <code>UpdateProtectionHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `WorksheetProtection&#124;error`

**Sample code:**

```ballerina
excel:WorksheetProtection result = check excelClient->updateProtection(driveId, driveItemId,
    "Sheet1", {options: {allowSort: true}});
```

**Sample response:**

```json
{
  "protected": false
}
```

</details>

<details>
<summary>protectWorksheet</summary>

Protects a worksheet, with optional protection options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `payload` | <code>ProtectWorksheetRequest</code> | Yes | Optional protection options |
| `headers` | <code>ProtectWorksheetHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `error?`

**Sample code:**

```ballerina
check excelClient->protectWorksheet(driveId, driveItemId,
    "Sheet1", {options: {allowFormatCells: true, allowSort: true}});
```

</details>

<details>
<summary>unprotectWorksheet</summary>

Removes the protection from a worksheet.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `headers` | <code>UnprotectWorksheetHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `error?`

**Sample code:**

```ballerina
check excelClient->unprotectWorksheet(driveId, driveItemId, "Sheet1");
```

</details>

#### Ranges

<details>
<summary>getCell</summary>

Retrieves the range that contains a single cell, by its row and column number.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `row` | <code>decimal</code> | Yes | Zero-based row number of the cell |
| `column` | <code>decimal</code> | Yes | Zero-based column number of the cell |
| `headers` | <code>GetCellHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `RangeResponse&#124;error`

**Sample code:**

```ballerina
excel:RangeResponse result = check excelClient->getCell(driveId, driveItemId, "Sheet1", 1, 2);
```

**Sample response:**

```json
{
  "columnHidden": false,
  "address": "Sheet1!A1:C2",
  "hidden": false,
  "formulas": [
    ["Date", "Category", "Amount"],
    ["2026-11-02", "Travel", 120.5]
  ],
  "values": [
    ["Date", "Category", "Amount"],
    ["2026-11-02", "Travel", 120.5]
  ],
  "columnCount": 3,
  "rowHidden": false,
  "cellCount": 6,
  "numberFormat": [
    ["General", "General", "General"],
    ["yyyy-mm-dd", "General", "0.00"]
  ],
  "columnIndex": 0,
  "rowIndex": 0,
  "valueTypes": [
    ["String", "String", "String"],
    ["String", "String", "Double"]
  ],
  "rowCount": 2
}
```

</details>

<details>
<summary>getRange</summary>

Retrieves the range object for a worksheet.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `headers` | <code>GetRangeHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `RangeResponse&#124;error`

**Sample code:**

```ballerina
excel:RangeResponse result = check excelClient->getRange(driveId, driveItemId, "Sheet1");
```

**Sample response:**

```json
{
  "columnHidden": false,
  "address": "Sheet1!A1:C2",
  "hidden": false,
  "formulas": [
    ["Date", "Category", "Amount"],
    ["2026-11-02", "Travel", 120.5]
  ],
  "values": [
    ["Date", "Category", "Amount"],
    ["2026-11-02", "Travel", 120.5]
  ],
  "columnCount": 3,
  "rowHidden": false,
  "cellCount": 6,
  "numberFormat": [
    ["General", "General", "General"],
    ["yyyy-mm-dd", "General", "0.00"]
  ],
  "columnIndex": 0,
  "rowIndex": 0,
  "valueTypes": [
    ["String", "String", "String"],
    ["String", "String", "Double"]
  ],
  "rowCount": 2
}
```

</details>

<details>
<summary>getRangeFormat</summary>

Retrieves the format of a worksheet's range.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `headers` | <code>GetRangeFormatHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |
| `dollarExpand` | <code>string[]</code> | No | Expand related entities |
| `dollarSelect` | <code>string[]</code> | No | Select properties to be returned |

**Returns:** `RangeFormat&#124;error`

**Sample code:**

```ballerina
excel:RangeFormat result = check excelClient->getRangeFormat(driveId, driveItemId, "Sheet1");
```

**Sample response:**

```json
{
  "horizontalAlignment": "General",
  "columnWidth": 48,
  "wrapText": false,
  "verticalAlignment": "Bottom",
  "rowHeight": 15
}
```

</details>

<details>
<summary>updateRangeFormat</summary>

Updates the format of a worksheet's range.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `payload` | <code>RangeFormat</code> | Yes | Range format properties to update |
| `headers` | <code>UpdateRangeFormatHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `RangeFormat&#124;error`

**Sample code:**

```ballerina
excel:RangeFormat result = check excelClient->updateRangeFormat(driveId, driveItemId,
    "Sheet1", {horizontalAlignment: "Center", wrapText: true});
```

**Sample response:**

```json
{
  "horizontalAlignment": "General",
  "columnWidth": 48,
  "wrapText": false,
  "verticalAlignment": "Bottom",
  "rowHeight": 15
}
```

</details>

<details>
<summary>clearRange</summary>

Clears the values, format or both of a worksheet's range.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `payload` | <code>ClearRangeRequest</code> | Yes | What to clear: `All`, `Formats` or `Contents` |
| `headers` | <code>ClearRangeHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `error?`

**Sample code:**

```ballerina
check excelClient->clearRange(driveId, driveItemId, "Sheet1", {applyTo: "Contents"});
```

</details>

<details>
<summary>deleteRange</summary>

Deletes the cells of a worksheet's range and shifts the remaining cells.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `payload` | <code>DeleteRangeRequest</code> | Yes | Direction to shift the remaining cells: `Up` or `Left` |
| `headers` | <code>DeleteRangeHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `error?`

**Sample code:**

```ballerina
check excelClient->deleteRange(driveId, driveItemId, "Sheet1", {shift: "Up"});
```

</details>

<details>
<summary>insertRange</summary>

Inserts cells into a worksheet's range and shifts the existing cells.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `payload` | <code>DeleteRangeRequest</code> | Yes | Direction to shift the existing cells: `Down` or `Right` |
| `headers` | <code>InsertRangeHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `RangeResponse&#124;error`

**Sample code:**

```ballerina
excel:RangeResponse result = check excelClient->insertRange(driveId, driveItemId,
    "Sheet1", {shift: "Down"});
```

**Sample response:**

```json
{
  "columnHidden": false,
  "address": "Sheet1!A1:C2",
  "hidden": false,
  "formulas": [
    ["Date", "Category", "Amount"],
    ["2026-11-02", "Travel", 120.5]
  ],
  "values": [
    ["Date", "Category", "Amount"],
    ["2026-11-02", "Travel", 120.5]
  ],
  "columnCount": 3,
  "rowHidden": false,
  "cellCount": 6,
  "numberFormat": [
    ["General", "General", "General"],
    ["yyyy-mm-dd", "General", "0.00"]
  ],
  "columnIndex": 0,
  "rowIndex": 0,
  "valueTypes": [
    ["String", "String", "String"],
    ["String", "String", "Double"]
  ],
  "rowCount": 2
}
```

</details>

<details>
<summary>mergeRange</summary>

Merges the cells of a worksheet's range.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `payload` | <code>MergeRangeRequest</code> | Yes | Whether to merge the cells of each row separately |
| `headers` | <code>MergeRangeHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `error?`

**Sample code:**

```ballerina
check excelClient->mergeRange(driveId, driveItemId, "Sheet1", {across: false});
```

</details>

<details>
<summary>unmergeRange</summary>

Unmerges the cells of a worksheet's range.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `headers` | <code>UnmergeRangeHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `error?`

**Sample code:**

```ballerina
check excelClient->unmergeRange(driveId, driveItemId, "Sheet1");
```

</details>

<details>
<summary>getRangeSort</summary>

Retrieves the sort object of a worksheet's range.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `headers` | <code>GetRangeSortHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |
| `dollarExpand` | <code>string[]</code> | No | Expand related entities |
| `dollarSelect` | <code>string[]</code> | No | Select properties to be returned |

**Returns:** `RangeSort&#124;error`

**Sample code:**

```ballerina
excel:RangeSort result = check excelClient->getRangeSort(driveId, driveItemId, "Sheet1");
```

**Sample response:**

```json
{}
```

</details>

<details>
<summary>updateRangeSort</summary>

Updates the sort object of a worksheet's range.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `payload` | <code>RangeSort</code> | Yes | Range sort properties to update |
| `headers` | <code>UpdateRangeSortHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `RangeSort&#124;error`

**Sample code:**

```ballerina
excel:RangeSort result = check excelClient->updateRangeSort(driveId, driveItemId, "Sheet1", {});
```

**Sample response:**

```json
{}
```

</details>

<details>
<summary>getRangeByAddress</summary>

Retrieves the range at an address, with its values, formulas and number formats.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `address` | <code>string?</code> | Yes | Range address in A1 notation, such as `A1:C4` |
| `headers` | <code>GetRangeByAddressHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `RangeResponse&#124;error`

**Sample code:**

```ballerina
excel:RangeResponse result = check excelClient->getRangeByAddress(driveId, driveItemId,
    "Sheet1", "A1:C4");
```

**Sample response:**

```json
{
  "columnHidden": false,
  "address": "Sheet1!A1:C2",
  "hidden": false,
  "formulas": [
    ["Date", "Category", "Amount"],
    ["2026-11-02", "Travel", 120.5]
  ],
  "values": [
    ["Date", "Category", "Amount"],
    ["2026-11-02", "Travel", 120.5]
  ],
  "columnCount": 3,
  "rowHidden": false,
  "cellCount": 6,
  "numberFormat": [
    ["General", "General", "General"],
    ["yyyy-mm-dd", "General", "0.00"]
  ],
  "columnIndex": 0,
  "rowIndex": 0,
  "valueTypes": [
    ["String", "String", "String"],
    ["String", "String", "Double"]
  ],
  "rowCount": 2
}
```

</details>

<details>
<summary>getRangeByAddressFormat</summary>

Retrieves the format of the range at an address.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `address` | <code>string?</code> | Yes | Range address in A1 notation, such as `A1:C4` |
| `headers` | <code>GetRangeByAddressFormatHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |
| `dollarExpand` | <code>string[]</code> | No | Expand related entities |
| `dollarSelect` | <code>string[]</code> | No | Select properties to be returned |

**Returns:** `RangeFormat&#124;error`

**Sample code:**

```ballerina
excel:RangeFormat result = check excelClient->getRangeByAddressFormat(driveId, driveItemId,
    "Sheet1", "A1:C4");
```

**Sample response:**

```json
{
  "horizontalAlignment": "General",
  "columnWidth": 48,
  "wrapText": false,
  "verticalAlignment": "Bottom",
  "rowHeight": 15
}
```

</details>

<details>
<summary>updateRangeByAddressFormat</summary>

Updates the format of the range at an address, such as its alignment and wrapping.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `address` | <code>string?</code> | Yes | Range address in A1 notation, such as `A1:C4` |
| `payload` | <code>RangeFormat</code> | Yes | Addressed range format properties to update |
| `headers` | <code>UpdateRangeByAddressFormatHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `RangeFormat&#124;error`

**Sample code:**

```ballerina
excel:RangeFormat result = check excelClient->updateRangeByAddressFormat(driveId, driveItemId,
    "Sheet1", "A1:C4", {horizontalAlignment: "Center", wrapText: true});
```

**Sample response:**

```json
{
  "horizontalAlignment": "General",
  "columnWidth": 48,
  "wrapText": false,
  "verticalAlignment": "Bottom",
  "rowHeight": 15
}
```

</details>

<details>
<summary>clearRangeByAddress</summary>

Clears the values, format or both of the range at an address.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `address` | <code>string?</code> | Yes | Range address in A1 notation, such as `A1:C4` |
| `payload` | <code>ClearRangeRequest</code> | Yes | What to clear: `All`, `Formats` or `Contents` |
| `headers` | <code>ClearRangeByAddressHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `error?`

**Sample code:**

```ballerina
check excelClient->clearRangeByAddress(driveId, driveItemId,
    "Sheet1", "A1:C4", {applyTo: "Contents"});
```

</details>

<details>
<summary>deleteRangeByAddress</summary>

Deletes the cells of the range at an address and shifts the remaining cells.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `address` | <code>string?</code> | Yes | Range address in A1 notation, such as `A1:C4` |
| `payload` | <code>DeleteRangeRequest</code> | Yes | Direction to shift the remaining cells: `Up` or `Left` |
| `headers` | <code>DeleteRangeByAddressHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `error?`

**Sample code:**

```ballerina
check excelClient->deleteRangeByAddress(driveId, driveItemId, "Sheet1", "A1:C4", {shift: "Up"});
```

</details>

<details>
<summary>insertRangeByAddress</summary>

Inserts cells at an address and shifts the existing cells.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `address` | <code>string?</code> | Yes | Range address in A1 notation, such as `A1:C4` |
| `payload` | <code>DeleteRangeRequest</code> | Yes | Direction to shift the existing cells: `Down` or `Right` |
| `headers` | <code>InsertRangeByAddressHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `RangeResponse&#124;error`

**Sample code:**

```ballerina
excel:RangeResponse result = check excelClient->insertRangeByAddress(driveId, driveItemId,
    "Sheet1", "A1:C4", {shift: "Down"});
```

**Sample response:**

```json
{
  "columnHidden": false,
  "address": "Sheet1!A1:C2",
  "hidden": false,
  "formulas": [
    ["Date", "Category", "Amount"],
    ["2026-11-02", "Travel", 120.5]
  ],
  "values": [
    ["Date", "Category", "Amount"],
    ["2026-11-02", "Travel", 120.5]
  ],
  "columnCount": 3,
  "rowHidden": false,
  "cellCount": 6,
  "numberFormat": [
    ["General", "General", "General"],
    ["yyyy-mm-dd", "General", "0.00"]
  ],
  "columnIndex": 0,
  "rowIndex": 0,
  "valueTypes": [
    ["String", "String", "String"],
    ["String", "String", "Double"]
  ],
  "rowCount": 2
}
```

</details>

<details>
<summary>mergeRangeByAddress</summary>

Merges the cells of the range at an address.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `address` | <code>string?</code> | Yes | Range address in A1 notation, such as `A1:C4` |
| `payload` | <code>MergeRangeRequest</code> | Yes | Whether to merge the cells of each row separately |
| `headers` | <code>MergeRangeByAddressHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `error?`

**Sample code:**

```ballerina
check excelClient->mergeRangeByAddress(driveId, driveItemId, "Sheet1", "A1:C4", {across: false});
```

</details>

<details>
<summary>unmergeRangeByAddress</summary>

Unmerges the cells of the range at an address.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `address` | <code>string?</code> | Yes | Range address in A1 notation, such as `A1:C4` |
| `headers` | <code>UnmergeRangeByAddressHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `error?`

**Sample code:**

```ballerina
check excelClient->unmergeRangeByAddress(driveId, driveItemId, "Sheet1", "A1:C4");
```

</details>

<details>
<summary>getRangeByAddressSort</summary>

Retrieves the sort object of the range at an address.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `address` | <code>string?</code> | Yes | Range address in A1 notation, such as `A1:C4` |
| `headers` | <code>GetRangeByAddressSortHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |
| `dollarExpand` | <code>string[]</code> | No | Expand related entities |
| `dollarSelect` | <code>string[]</code> | No | Select properties to be returned |

**Returns:** `RangeSort&#124;error`

**Sample code:**

```ballerina
excel:RangeSort result = check excelClient->getRangeByAddressSort(driveId, driveItemId,
    "Sheet1", "A1:C4");
```

**Sample response:**

```json
{}
```

</details>

<details>
<summary>updateRangeByAddressSort</summary>

Updates the sort object of the range at an address.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `address` | <code>string?</code> | Yes | Range address in A1 notation, such as `A1:C4` |
| `payload` | <code>RangeSort</code> | Yes | Addressed range sort properties to update |
| `headers` | <code>UpdateRangeByAddressSortHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `RangeSort&#124;error`

**Sample code:**

```ballerina
excel:RangeSort result = check excelClient->updateRangeByAddressSort(driveId, driveItemId,
    "Sheet1", "A1:C4", {});
```

**Sample response:**

```json
{}
```

</details>

<details>
<summary>getUsedRange</summary>

Retrieves the used range of a worksheet: the smallest range that contains every cell with a value or format.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `headers` | <code>GetUsedRangeHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `RangeResponse&#124;error`

**Sample code:**

```ballerina
excel:RangeResponse result = check excelClient->getUsedRange(driveId, driveItemId, "Sheet1");
```

**Sample response:**

```json
{
  "columnHidden": false,
  "address": "Sheet1!A1:C2",
  "hidden": false,
  "formulas": [
    ["Date", "Category", "Amount"],
    ["2026-11-02", "Travel", 120.5]
  ],
  "values": [
    ["Date", "Category", "Amount"],
    ["2026-11-02", "Travel", 120.5]
  ],
  "columnCount": 3,
  "rowHidden": false,
  "cellCount": 6,
  "numberFormat": [
    ["General", "General", "General"],
    ["yyyy-mm-dd", "General", "0.00"]
  ],
  "columnIndex": 0,
  "rowIndex": 0,
  "valueTypes": [
    ["String", "String", "String"],
    ["String", "String", "Double"]
  ],
  "rowCount": 2
}
```

</details>

<details>
<summary>getUsedRangeFormat</summary>

Retrieves the format of a worksheet's used range.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `headers` | <code>GetUsedRangeFormatHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |
| `dollarExpand` | <code>string[]</code> | No | Expand related entities |
| `dollarSelect` | <code>string[]</code> | No | Select properties to be returned |

**Returns:** `RangeFormat&#124;error`

**Sample code:**

```ballerina
excel:RangeFormat result = check excelClient->getUsedRangeFormat(driveId, driveItemId, "Sheet1");
```

**Sample response:**

```json
{
  "horizontalAlignment": "General",
  "columnWidth": 48,
  "wrapText": false,
  "verticalAlignment": "Bottom",
  "rowHeight": 15
}
```

</details>

<details>
<summary>updateUsedRangeFormat</summary>

Updates the format of a worksheet's used range.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `payload` | <code>RangeFormat</code> | Yes | Used range format properties to update |
| `headers` | <code>UpdateUsedRangeFormatHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `RangeFormat&#124;error`

**Sample code:**

```ballerina
excel:RangeFormat result = check excelClient->updateUsedRangeFormat(driveId, driveItemId,
    "Sheet1", {horizontalAlignment: "Center", wrapText: true});
```

**Sample response:**

```json
{
  "horizontalAlignment": "General",
  "columnWidth": 48,
  "wrapText": false,
  "verticalAlignment": "Bottom",
  "rowHeight": 15
}
```

</details>

<details>
<summary>clearUsedRange</summary>

Clears the values, format or both of a worksheet's used range.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `payload` | <code>ClearRangeRequest</code> | Yes | What to clear: `All`, `Formats` or `Contents` |
| `headers` | <code>ClearUsedRangeHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `error?`

**Sample code:**

```ballerina
check excelClient->clearUsedRange(driveId, driveItemId, "Sheet1", {applyTo: "Contents"});
```

</details>

<details>
<summary>deleteUsedRange</summary>

Deletes the cells of a worksheet's used range and shifts the remaining cells.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `payload` | <code>DeleteRangeRequest</code> | Yes | Direction to shift the remaining cells: `Up` or `Left` |
| `headers` | <code>DeleteUsedRangeHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `error?`

**Sample code:**

```ballerina
check excelClient->deleteUsedRange(driveId, driveItemId, "Sheet1", {shift: "Up"});
```

</details>

<details>
<summary>insertUsedRange</summary>

Inserts cells at a worksheet's used range and shifts the existing cells.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `payload` | <code>DeleteRangeRequest</code> | Yes | Direction to shift the existing cells: `Down` or `Right` |
| `headers` | <code>InsertUsedRangeHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `RangeResponse&#124;error`

**Sample code:**

```ballerina
excel:RangeResponse result = check excelClient->insertUsedRange(driveId, driveItemId,
    "Sheet1", {shift: "Down"});
```

**Sample response:**

```json
{
  "columnHidden": false,
  "address": "Sheet1!A1:C2",
  "hidden": false,
  "formulas": [
    ["Date", "Category", "Amount"],
    ["2026-11-02", "Travel", 120.5]
  ],
  "values": [
    ["Date", "Category", "Amount"],
    ["2026-11-02", "Travel", 120.5]
  ],
  "columnCount": 3,
  "rowHidden": false,
  "cellCount": 6,
  "numberFormat": [
    ["General", "General", "General"],
    ["yyyy-mm-dd", "General", "0.00"]
  ],
  "columnIndex": 0,
  "rowIndex": 0,
  "valueTypes": [
    ["String", "String", "String"],
    ["String", "String", "Double"]
  ],
  "rowCount": 2
}
```

</details>

<details>
<summary>mergeUsedRange</summary>

Merges the cells of a worksheet's used range.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `payload` | <code>MergeRangeRequest</code> | Yes | Whether to merge the cells of each row separately |
| `headers` | <code>MergeUsedRangeHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `error?`

**Sample code:**

```ballerina
check excelClient->mergeUsedRange(driveId, driveItemId, "Sheet1", {across: false});
```

</details>

<details>
<summary>unmergeUsedRange</summary>

Unmerges the cells of a worksheet's used range.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `headers` | <code>UnmergeUsedRangeHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `error?`

**Sample code:**

```ballerina
check excelClient->unmergeUsedRange(driveId, driveItemId, "Sheet1");
```

</details>

<details>
<summary>getUsedRangeSort</summary>

Retrieves the sort object of a worksheet's used range.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `headers` | <code>GetUsedRangeSortHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |
| `dollarExpand` | <code>string[]</code> | No | Expand related entities |
| `dollarSelect` | <code>string[]</code> | No | Select properties to be returned |

**Returns:** `RangeSort&#124;error`

**Sample code:**

```ballerina
excel:RangeSort result = check excelClient->getUsedRangeSort(driveId, driveItemId, "Sheet1");
```

**Sample response:**

```json
{}
```

</details>

<details>
<summary>updateUsedRangeSort</summary>

Updates the sort object of a worksheet's used range.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `payload` | <code>RangeSort</code> | Yes | Used range sort properties to update |
| `headers` | <code>UpdateUsedRangeSortHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `RangeSort&#124;error`

**Sample code:**

```ballerina
excel:RangeSort result = check excelClient->updateUsedRangeSort(driveId, driveItemId, "Sheet1", {});
```

**Sample response:**

```json
{}
```

</details>

<details>
<summary>getUsedRangeValuesOnly</summary>

Retrieves the used range of a worksheet, optionally counting only the cells that contain values.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `valuesOnly` | <code>boolean</code> | Yes | Whether the used range counts only the cells that contain values, ignoring cells that have only formatting |
| `headers` | <code>GetUsedRangeValuesOnlyHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `RangeResponse&#124;error`

**Sample code:**

```ballerina
excel:RangeResponse result = check excelClient->getUsedRangeValuesOnly(driveId, driveItemId,
    "Sheet1", true);
```

**Sample response:**

```json
{
  "columnHidden": false,
  "address": "Sheet1!A1:C2",
  "hidden": false,
  "formulas": [
    ["Date", "Category", "Amount"],
    ["2026-11-02", "Travel", 120.5]
  ],
  "values": [
    ["Date", "Category", "Amount"],
    ["2026-11-02", "Travel", 120.5]
  ],
  "columnCount": 3,
  "rowHidden": false,
  "cellCount": 6,
  "numberFormat": [
    ["General", "General", "General"],
    ["yyyy-mm-dd", "General", "0.00"]
  ],
  "columnIndex": 0,
  "rowIndex": 0,
  "valueTypes": [
    ["String", "String", "String"],
    ["String", "String", "Double"]
  ],
  "rowCount": 2
}
```

</details>

#### Tables

<details>
<summary>listTables</summary>

Lists the tables in a workbook.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `headers` | <code>ListTablesHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |
| `dollarSkip` | <code>int</code> | No | Skip the first n items |
| `dollarTop` | <code>int</code> | No | Show only the first n items |
| `dollarFilter` | <code>string</code> | No | Filter items by property values |
| `dollarSearch` | <code>string</code> | No | Search items by search phrases |
| `dollarOrderby` | <code>string[]</code> | No | Order items by property values |
| `dollarExpand` | <code>string[]</code> | No | Expand related entities |
| `dollarCount` | <code>boolean</code> | No | Include count of items |
| `dollarSelect` | <code>string[]</code> | No | Select properties to be returned |

**Returns:** `TableCollectionResponse&#124;error`

**Sample code:**

```ballerina
excel:TableCollectionResponse result = check excelClient->listTables(driveId, driveItemId);
```

**Sample response:**

```json
{
  "value": [
    {
      "id": "1",
      "highlightFirstColumn": false,
      "showHeaders": true,
      "showBandedRows": true,
      "highlightLastColumn": false,
      "showBandedColumns": false,
      "showTotals": false,
      "name": "Expenses",
      "showFilterButton": true,
      "legacyId": "1",
      "style": "TableStyleMedium2"
    }
  ]
}
```

</details>

<details>
<summary>createTable</summary>

Creates a table in a workbook.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `payload` | <code>Table</code> | Yes | Table to create |
| `headers` | <code>CreateTableHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `Table&#124;error`

**Sample code:**

```ballerina
excel:Table result = check excelClient->createTable(driveId, driveItemId,
    {name: "Expenses", showTotals: true});
```

**Sample response:**

```json
{
  "id": "1",
  "highlightFirstColumn": false,
  "showHeaders": true,
  "showBandedRows": true,
  "highlightLastColumn": false,
  "showBandedColumns": false,
  "showTotals": false,
  "name": "Expenses",
  "showFilterButton": true,
  "legacyId": "1",
  "style": "TableStyleMedium2"
}
```

</details>

<details>
<summary>listWorksheetTables</summary>

Lists the tables on a worksheet.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `headers` | <code>ListWorksheetTablesHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |
| `dollarSkip` | <code>int</code> | No | Skip the first n items |
| `dollarTop` | <code>int</code> | No | Show only the first n items |
| `dollarFilter` | <code>string</code> | No | Filter items by property values |
| `dollarSearch` | <code>string</code> | No | Search items by search phrases |
| `dollarOrderby` | <code>string[]</code> | No | Order items by property values |
| `dollarExpand` | <code>string[]</code> | No | Expand related entities |
| `dollarCount` | <code>boolean</code> | No | Include count of items |
| `dollarSelect` | <code>string[]</code> | No | Select properties to be returned |

**Returns:** `TableCollectionResponse&#124;error`

**Sample code:**

```ballerina
excel:TableCollectionResponse result = check excelClient->listWorksheetTables(driveId, driveItemId,
    "Sheet1");
```

**Sample response:**

```json
{
  "value": [
    {
      "id": "1",
      "highlightFirstColumn": false,
      "showHeaders": true,
      "showBandedRows": true,
      "highlightLastColumn": false,
      "showBandedColumns": false,
      "showTotals": false,
      "name": "Expenses",
      "showFilterButton": true,
      "legacyId": "1",
      "style": "TableStyleMedium2"
    }
  ]
}
```

</details>

<details>
<summary>createWorksheetTable</summary>

Creates a table on a worksheet.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `payload` | <code>Table</code> | Yes | Worksheet table to create |
| `headers` | <code>CreateWorksheetTableHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `Table&#124;error`

**Sample code:**

```ballerina
excel:Table result = check excelClient->createWorksheetTable(driveId, driveItemId,
    "Sheet1", {name: "Expenses", showTotals: true});
```

**Sample response:**

```json
{
  "id": "1",
  "highlightFirstColumn": false,
  "showHeaders": true,
  "showBandedRows": true,
  "highlightLastColumn": false,
  "showBandedColumns": false,
  "showTotals": false,
  "name": "Expenses",
  "showFilterButton": true,
  "legacyId": "1",
  "style": "TableStyleMedium2"
}
```

</details>

<details>
<summary>getWorksheetTable</summary>

Retrieves a table from a worksheet.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookTableId` | <code>string</code> | Yes | ID or name of the table |
| `headers` | <code>GetWorksheetTableHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |
| `dollarExpand` | <code>string[]</code> | No | Expand related entities |
| `dollarSelect` | <code>string[]</code> | No | Select properties to be returned |

**Returns:** `Table&#124;error`

**Sample code:**

```ballerina
excel:Table result = check excelClient->getWorksheetTable(driveId, driveItemId,
    "Sheet1", "Expenses");
```

**Sample response:**

```json
{
  "id": "1",
  "highlightFirstColumn": false,
  "showHeaders": true,
  "showBandedRows": true,
  "highlightLastColumn": false,
  "showBandedColumns": false,
  "showTotals": false,
  "name": "Expenses",
  "showFilterButton": true,
  "legacyId": "1",
  "style": "TableStyleMedium2"
}
```

</details>

<details>
<summary>deleteWorksheetTable</summary>

Deletes a table from a worksheet.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookTableId` | <code>string</code> | Yes | ID or name of the table |
| `headers` | <code>DeleteWorksheetTableHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `error?`

**Sample code:**

```ballerina
check excelClient->deleteWorksheetTable(driveId, driveItemId, "Sheet1", "Expenses");
```

</details>

<details>
<summary>updateWorksheetTable</summary>

Updates the properties of a table, such as its name, style and visible rows.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookTableId` | <code>string</code> | Yes | ID or name of the table |
| `payload` | <code>Table</code> | Yes | Worksheet table properties to update |
| `headers` | <code>UpdateWorksheetTableHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `Table&#124;error`

**Sample code:**

```ballerina
excel:Table result = check excelClient->updateWorksheetTable(driveId, driveItemId,
    "Sheet1", "Expenses", {name: "Expenses", showTotals: true});
```

**Sample response:**

```json
{
  "id": "1",
  "highlightFirstColumn": false,
  "showHeaders": true,
  "showBandedRows": true,
  "highlightLastColumn": false,
  "showBandedColumns": false,
  "showTotals": false,
  "name": "Expenses",
  "showFilterButton": true,
  "legacyId": "1",
  "style": "TableStyleMedium2"
}
```

</details>

<details>
<summary>clearTableFilters</summary>

Clears every filter applied to a table.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookTableId` | <code>string</code> | Yes | ID or name of the table |
| `headers` | <code>ClearTableFiltersHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `error?`

**Sample code:**

```ballerina
check excelClient->clearTableFilters(driveId, driveItemId, "Sheet1", "Expenses");
```

</details>

<details>
<summary>convertTableToRange</summary>

Converts a table into a normal range of cells, keeping its data.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookTableId` | <code>string</code> | Yes | ID or name of the table |
| `headers` | <code>ConvertTableToRangeHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `RangeResponse&#124;error`

**Sample code:**

```ballerina
excel:RangeResponse result = check excelClient->convertTableToRange(driveId, driveItemId,
    "Sheet1", "Expenses");
```

**Sample response:**

```json
{
  "columnHidden": false,
  "address": "Sheet1!A1:C2",
  "hidden": false,
  "formulas": [
    ["Date", "Category", "Amount"],
    ["2026-11-02", "Travel", 120.5]
  ],
  "values": [
    ["Date", "Category", "Amount"],
    ["2026-11-02", "Travel", 120.5]
  ],
  "columnCount": 3,
  "rowHidden": false,
  "cellCount": 6,
  "numberFormat": [
    ["General", "General", "General"],
    ["yyyy-mm-dd", "General", "0.00"]
  ],
  "columnIndex": 0,
  "rowIndex": 0,
  "valueTypes": [
    ["String", "String", "String"],
    ["String", "String", "Double"]
  ],
  "rowCount": 2
}
```

</details>

<details>
<summary>getTableDataBodyRange</summary>

Retrieves the data body range of a table.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookTableId` | <code>string</code> | Yes | ID or name of the table |
| `headers` | <code>GetTableDataBodyRangeHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `RangeResponse&#124;error`

**Sample code:**

```ballerina
excel:RangeResponse result = check excelClient->getTableDataBodyRange(driveId, driveItemId,
    "Sheet1", "Expenses");
```

**Sample response:**

```json
{
  "columnHidden": false,
  "address": "Sheet1!A1:C2",
  "hidden": false,
  "formulas": [
    ["Date", "Category", "Amount"],
    ["2026-11-02", "Travel", 120.5]
  ],
  "values": [
    ["Date", "Category", "Amount"],
    ["2026-11-02", "Travel", 120.5]
  ],
  "columnCount": 3,
  "rowHidden": false,
  "cellCount": 6,
  "numberFormat": [
    ["General", "General", "General"],
    ["yyyy-mm-dd", "General", "0.00"]
  ],
  "columnIndex": 0,
  "rowIndex": 0,
  "valueTypes": [
    ["String", "String", "String"],
    ["String", "String", "Double"]
  ],
  "rowCount": 2
}
```

</details>

<details>
<summary>getTableHeaderRowRange</summary>

Retrieves the header row range of a table.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookTableId` | <code>string</code> | Yes | ID or name of the table |
| `headers` | <code>GetTableHeaderRowRangeHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `RangeResponse&#124;error`

**Sample code:**

```ballerina
excel:RangeResponse result = check excelClient->getTableHeaderRowRange(driveId, driveItemId,
    "Sheet1", "Expenses");
```

**Sample response:**

```json
{
  "columnHidden": false,
  "address": "Sheet1!A1:C2",
  "hidden": false,
  "formulas": [
    ["Date", "Category", "Amount"],
    ["2026-11-02", "Travel", 120.5]
  ],
  "values": [
    ["Date", "Category", "Amount"],
    ["2026-11-02", "Travel", 120.5]
  ],
  "columnCount": 3,
  "rowHidden": false,
  "cellCount": 6,
  "numberFormat": [
    ["General", "General", "General"],
    ["yyyy-mm-dd", "General", "0.00"]
  ],
  "columnIndex": 0,
  "rowIndex": 0,
  "valueTypes": [
    ["String", "String", "String"],
    ["String", "String", "Double"]
  ],
  "rowCount": 2
}
```

</details>

<details>
<summary>getTableRange</summary>

Retrieves the full range of a table.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookTableId` | <code>string</code> | Yes | ID or name of the table |
| `headers` | <code>GetTableRangeHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `RangeResponse&#124;error`

**Sample code:**

```ballerina
excel:RangeResponse result = check excelClient->getTableRange(driveId, driveItemId,
    "Sheet1", "Expenses");
```

**Sample response:**

```json
{
  "columnHidden": false,
  "address": "Sheet1!A1:C2",
  "hidden": false,
  "formulas": [
    ["Date", "Category", "Amount"],
    ["2026-11-02", "Travel", 120.5]
  ],
  "values": [
    ["Date", "Category", "Amount"],
    ["2026-11-02", "Travel", 120.5]
  ],
  "columnCount": 3,
  "rowHidden": false,
  "cellCount": 6,
  "numberFormat": [
    ["General", "General", "General"],
    ["yyyy-mm-dd", "General", "0.00"]
  ],
  "columnIndex": 0,
  "rowIndex": 0,
  "valueTypes": [
    ["String", "String", "String"],
    ["String", "String", "Double"]
  ],
  "rowCount": 2
}
```

</details>

<details>
<summary>reapplyTableFilters</summary>

Reapplies every filter currently set on a table.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookTableId` | <code>string</code> | Yes | ID or name of the table |
| `headers` | <code>ReapplyTableFiltersHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `error?`

**Sample code:**

```ballerina
check excelClient->reapplyTableFilters(driveId, driveItemId, "Sheet1", "Expenses");
```

</details>

<details>
<summary>getTableTotalRowRange</summary>

Retrieves the total row range of a table.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookTableId` | <code>string</code> | Yes | ID or name of the table |
| `headers` | <code>GetTableTotalRowRangeHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `RangeResponse&#124;error`

**Sample code:**

```ballerina
excel:RangeResponse result = check excelClient->getTableTotalRowRange(driveId, driveItemId,
    "Sheet1", "Expenses");
```

**Sample response:**

```json
{
  "columnHidden": false,
  "address": "Sheet1!A1:C2",
  "hidden": false,
  "formulas": [
    ["Date", "Category", "Amount"],
    ["2026-11-02", "Travel", 120.5]
  ],
  "values": [
    ["Date", "Category", "Amount"],
    ["2026-11-02", "Travel", 120.5]
  ],
  "columnCount": 3,
  "rowHidden": false,
  "cellCount": 6,
  "numberFormat": [
    ["General", "General", "General"],
    ["yyyy-mm-dd", "General", "0.00"]
  ],
  "columnIndex": 0,
  "rowIndex": 0,
  "valueTypes": [
    ["String", "String", "String"],
    ["String", "String", "Double"]
  ],
  "rowCount": 2
}
```

</details>

<details>
<summary>getTableWorksheet</summary>

Retrieves the worksheet that contains a table.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookTableId` | <code>string</code> | Yes | ID or name of the table |
| `headers` | <code>GetTableWorksheetHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |
| `dollarExpand` | <code>string[]</code> | No | Expand related entities |
| `dollarSelect` | <code>string[]</code> | No | Select properties to be returned |

**Returns:** `Worksheet&#124;error`

**Sample code:**

```ballerina
excel:Worksheet result = check excelClient->getTableWorksheet(driveId, driveItemId,
    "Sheet1", "Expenses");
```

**Sample response:**

```json
{
  "id": "{00000000-0001-0000-0000-000000000000}",
  "visibility": "Visible",
  "name": "Sheet1",
  "position": 0
}
```

</details>

<details>
<summary>addWorksheetTable</summary>

Adds a table over a range on a worksheet.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `payload` | <code>AddTableRequest</code> | Yes | Address of the range the table covers, and whether its first row holds headers |
| `headers` | <code>AddWorksheetTableHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `AddTableResponse&#124;error`

**Sample code:**

```ballerina
excel:AddTableResponse result = check excelClient->addWorksheetTable(driveId, driveItemId,
    "Sheet1", {address: "Sheet1!A1:C1", hasHeaders: true});
```

**Sample response:**

```json
{
  "id": "1",
  "highlightFirstColumn": false,
  "showHeaders": true,
  "showBandedRows": true,
  "highlightLastColumn": false,
  "showBandedColumns": false,
  "showTotals": false,
  "name": "Expenses",
  "showFilterButton": true,
  "legacyId": "1",
  "style": "TableStyleMedium2"
}
```

</details>

<details>
<summary>countWorksheetTables</summary>

Returns the number of tables on a worksheet.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `headers` | <code>CountWorksheetTablesHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `CountResult&#124;error`

**Sample code:**

```ballerina
excel:CountResult result = check excelClient->countWorksheetTables(driveId, driveItemId, "Sheet1");
```

**Sample response:**

```json
{
  "value": 3
}
```

</details>

#### Table rows

<details>
<summary>listRows</summary>

Lists the rows of a table.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookTableId` | <code>string</code> | Yes | ID or name of the table |
| `headers` | <code>ListRowsHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |
| `dollarSkip` | <code>int</code> | No | Skip the first n items |
| `dollarTop` | <code>int</code> | No | Show only the first n items |
| `dollarFilter` | <code>string</code> | No | Filter items by property values |
| `dollarSearch` | <code>string</code> | No | Search items by search phrases |
| `dollarOrderby` | <code>string[]</code> | No | Order items by property values |
| `dollarExpand` | <code>string[]</code> | No | Expand related entities |
| `dollarCount` | <code>boolean</code> | No | Include count of items |
| `dollarSelect` | <code>string[]</code> | No | Select properties to be returned |

**Returns:** `TableRowCollectionResponse&#124;error`

**Sample code:**

```ballerina
excel:TableRowCollectionResponse result = check excelClient->listRows(driveId, driveItemId,
    "Sheet1", "Expenses");
```

**Sample response:**

```json
{
  "value": [
    {
      "values": [
        ["2026-11-02", "Travel", 120.5]
      ],
      "index": 0
    }
  ]
}
```

</details>

<details>
<summary>createRow</summary>

Creates a row in a table.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookTableId` | <code>string</code> | Yes | ID or name of the table |
| `payload` | <code>TableRow</code> | Yes | Table row to create |
| `headers` | <code>CreateRowHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `TableRow&#124;error`

**Sample code:**

```ballerina
excel:TableRow result = check excelClient->createRow(driveId, driveItemId,
    "Sheet1", "Expenses", {values: [["2026-11-02", "Travel", 150.00]]});
```

**Sample response:**

```json
{
  "values": [
    ["2026-11-02", "Travel", 120.5]
  ],
  "index": 0
}
```

</details>

<details>
<summary>getRow</summary>

Retrieves a row of a table.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookTableId` | <code>string</code> | Yes | ID or name of the table |
| `workbookTableRowId` | <code>string</code> | Yes | ID of the table row |
| `headers` | <code>GetRowHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |
| `dollarExpand` | <code>string[]</code> | No | Expand related entities |
| `dollarSelect` | <code>string[]</code> | No | Select properties to be returned |

**Returns:** `TableRow&#124;error`

**Sample code:**

```ballerina
excel:TableRow result = check excelClient->getRow(driveId, driveItemId, "Sheet1", "Expenses", "0");
```

**Sample response:**

```json
{
  "values": [
    ["2026-11-02", "Travel", 120.5]
  ],
  "index": 0
}
```

</details>

<details>
<summary>deleteRow</summary>

Deletes a row from a table.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookTableId` | <code>string</code> | Yes | ID or name of the table |
| `workbookTableRowId` | <code>string</code> | Yes | ID of the table row |
| `headers` | <code>DeleteRowHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `error?`

**Sample code:**

```ballerina
check excelClient->deleteRow(driveId, driveItemId, "Sheet1", "Expenses", "0");
```

</details>

<details>
<summary>updateRow</summary>

Updates the values of a table row.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookTableId` | <code>string</code> | Yes | ID or name of the table |
| `workbookTableRowId` | <code>string</code> | Yes | ID of the table row |
| `payload` | <code>TableRow</code> | Yes | Table row properties to update |
| `headers` | <code>UpdateRowHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `TableRow&#124;error`

**Sample code:**

```ballerina
excel:TableRow result = check excelClient->updateRow(driveId, driveItemId,
    "Sheet1", "Expenses", "0", {values: [["2026-11-02", "Travel", 150.00]]});
```

**Sample response:**

```json
{
  "values": [
    ["2026-11-02", "Travel", 120.5]
  ],
  "index": 0
}
```

</details>

<details>
<summary>getTableRowRange</summary>

Retrieves the range of a table row.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookTableId` | <code>string</code> | Yes | ID or name of the table |
| `workbookTableRowId` | <code>string</code> | Yes | ID of the table row |
| `headers` | <code>GetTableRowRangeHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `RangeResponse&#124;error`

**Sample code:**

```ballerina
excel:RangeResponse result = check excelClient->getTableRowRange(driveId, driveItemId,
    "Sheet1", "Expenses", "0");
```

**Sample response:**

```json
{
  "columnHidden": false,
  "address": "Sheet1!A1:C2",
  "hidden": false,
  "formulas": [
    ["Date", "Category", "Amount"],
    ["2026-11-02", "Travel", 120.5]
  ],
  "values": [
    ["Date", "Category", "Amount"],
    ["2026-11-02", "Travel", 120.5]
  ],
  "columnCount": 3,
  "rowHidden": false,
  "cellCount": 6,
  "numberFormat": [
    ["General", "General", "General"],
    ["yyyy-mm-dd", "General", "0.00"]
  ],
  "columnIndex": 0,
  "rowIndex": 0,
  "valueTypes": [
    ["String", "String", "String"],
    ["String", "String", "Double"]
  ],
  "rowCount": 2
}
```

</details>

<details>
<summary>addRow</summary>

Adds one or more rows to a table, at the end or at an index.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookTableId` | <code>string</code> | Yes | ID or name of the table |
| `payload` | <code>AddRowRequest</code> | Yes | Row values as a two-dimensional array, and an optional index |
| `headers` | <code>AddRowHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `TableRowOperationResponse&#124;error`

**Sample code:**

```ballerina
excel:TableRowOperationResponse result = check excelClient->addRow(driveId, driveItemId,
    "Sheet1", "Expenses", {values: [["2026-11-02", "Travel", 120.50]]});
```

**Sample response:**

```json
{
  "values": [
    ["2026-11-02", "Travel", 120.5]
  ],
  "index": 0
}
```

</details>

<details>
<summary>countRows</summary>

Returns the number of rows in a table.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookTableId` | <code>string</code> | Yes | ID or name of the table |
| `headers` | <code>CountRowsHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `CountResult&#124;error`

**Sample code:**

```ballerina
excel:CountResult result = check excelClient->countRows(driveId, driveItemId, "Sheet1", "Expenses");
```

**Sample response:**

```json
{
  "value": 3
}
```

</details>

#### Table columns

<details>
<summary>listColumns</summary>

Lists the columns of a table.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookTableId` | <code>string</code> | Yes | ID or name of the table |
| `headers` | <code>ListColumnsHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |
| `dollarSkip` | <code>int</code> | No | Skip the first n items |
| `dollarTop` | <code>int</code> | No | Show only the first n items |
| `dollarFilter` | <code>string</code> | No | Filter items by property values |
| `dollarSearch` | <code>string</code> | No | Search items by search phrases |
| `dollarOrderby` | <code>string[]</code> | No | Order items by property values |
| `dollarExpand` | <code>string[]</code> | No | Expand related entities |
| `dollarCount` | <code>boolean</code> | No | Include count of items |
| `dollarSelect` | <code>string[]</code> | No | Select properties to be returned |

**Returns:** `TableColumnCollectionResponse&#124;error`

**Sample code:**

```ballerina
excel:TableColumnCollectionResponse result = check excelClient->listColumns(driveId, driveItemId,
    "Sheet1", "Expenses");
```

**Sample response:**

```json
{
  "value": [
    {
      "id": "3",
      "values": [
        ["Amount"],
        [120.5],
        [48]
      ],
      "name": "Amount",
      "index": 0
    }
  ]
}
```

</details>

<details>
<summary>createColumn</summary>

Creates a column in a table.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookTableId` | <code>string</code> | Yes | ID or name of the table |
| `payload` | <code>TableColumn</code> | Yes | Table column to create |
| `headers` | <code>CreateColumnHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `TableColumn&#124;error`

**Sample code:**

```ballerina
excel:TableColumn result = check excelClient->createColumn(driveId, driveItemId,
    "Sheet1", "Expenses", {name: "Amount"});
```

**Sample response:**

```json
{
  "id": "3",
  "values": [
    ["Amount"],
    [120.5],
    [48]
  ],
  "name": "Amount",
  "index": 0
}
```

</details>

<details>
<summary>getColumn</summary>

Retrieves a column of a table.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookTableId` | <code>string</code> | Yes | ID or name of the table |
| `workbookTableColumnId` | <code>string</code> | Yes | ID or name of the table column |
| `headers` | <code>GetColumnHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |
| `dollarExpand` | <code>string[]</code> | No | Expand related entities |
| `dollarSelect` | <code>string[]</code> | No | Select properties to be returned |

**Returns:** `TableColumn&#124;error`

**Sample code:**

```ballerina
excel:TableColumn result = check excelClient->getColumn(driveId, driveItemId,
    "Sheet1", "Expenses", "3");
```

**Sample response:**

```json
{
  "id": "3",
  "values": [
    ["Amount"],
    [120.5],
    [48]
  ],
  "name": "Amount",
  "index": 0
}
```

</details>

<details>
<summary>deleteColumn</summary>

Deletes a column from a table.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookTableId` | <code>string</code> | Yes | ID or name of the table |
| `workbookTableColumnId` | <code>string</code> | Yes | ID or name of the table column |
| `headers` | <code>DeleteColumnHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `error?`

**Sample code:**

```ballerina
check excelClient->deleteColumn(driveId, driveItemId, "Sheet1", "Expenses", "3");
```

</details>

<details>
<summary>updateColumn</summary>

Updates a column of a table, such as its name.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookTableId` | <code>string</code> | Yes | ID or name of the table |
| `workbookTableColumnId` | <code>string</code> | Yes | ID or name of the table column |
| `payload` | <code>TableColumn</code> | Yes | Table column properties to update |
| `headers` | <code>UpdateColumnHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `TableColumn&#124;error`

**Sample code:**

```ballerina
excel:TableColumn result = check excelClient->updateColumn(driveId, driveItemId,
    "Sheet1", "Expenses", "3", {name: "Amount"});
```

**Sample response:**

```json
{
  "id": "3",
  "values": [
    ["Amount"],
    [120.5],
    [48]
  ],
  "name": "Amount",
  "index": 0
}
```

</details>

<details>
<summary>getColumnDataBodyRange</summary>

Retrieves the data body range of a table column.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookTableId` | <code>string</code> | Yes | ID or name of the table |
| `workbookTableColumnId` | <code>string</code> | Yes | ID or name of the table column |
| `headers` | <code>GetColumnDataBodyRangeHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `RangeResponse&#124;error`

**Sample code:**

```ballerina
excel:RangeResponse result = check excelClient->getColumnDataBodyRange(driveId, driveItemId,
    "Sheet1", "Expenses", "3");
```

**Sample response:**

```json
{
  "columnHidden": false,
  "address": "Sheet1!A1:C2",
  "hidden": false,
  "formulas": [
    ["Date", "Category", "Amount"],
    ["2026-11-02", "Travel", 120.5]
  ],
  "values": [
    ["Date", "Category", "Amount"],
    ["2026-11-02", "Travel", 120.5]
  ],
  "columnCount": 3,
  "rowHidden": false,
  "cellCount": 6,
  "numberFormat": [
    ["General", "General", "General"],
    ["yyyy-mm-dd", "General", "0.00"]
  ],
  "columnIndex": 0,
  "rowIndex": 0,
  "valueTypes": [
    ["String", "String", "String"],
    ["String", "String", "Double"]
  ],
  "rowCount": 2
}
```

</details>

<details>
<summary>getColumnHeaderRowRange</summary>

Retrieves the header row range of a table column.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookTableId` | <code>string</code> | Yes | ID or name of the table |
| `workbookTableColumnId` | <code>string</code> | Yes | ID or name of the table column |
| `headers` | <code>GetColumnHeaderRowRangeHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `RangeResponse&#124;error`

**Sample code:**

```ballerina
excel:RangeResponse result = check excelClient->getColumnHeaderRowRange(driveId, driveItemId,
    "Sheet1", "Expenses", "3");
```

**Sample response:**

```json
{
  "columnHidden": false,
  "address": "Sheet1!A1:C2",
  "hidden": false,
  "formulas": [
    ["Date", "Category", "Amount"],
    ["2026-11-02", "Travel", 120.5]
  ],
  "values": [
    ["Date", "Category", "Amount"],
    ["2026-11-02", "Travel", 120.5]
  ],
  "columnCount": 3,
  "rowHidden": false,
  "cellCount": 6,
  "numberFormat": [
    ["General", "General", "General"],
    ["yyyy-mm-dd", "General", "0.00"]
  ],
  "columnIndex": 0,
  "rowIndex": 0,
  "valueTypes": [
    ["String", "String", "String"],
    ["String", "String", "Double"]
  ],
  "rowCount": 2
}
```

</details>

<details>
<summary>getColumnRange</summary>

Retrieves the full range of a table column.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookTableId` | <code>string</code> | Yes | ID or name of the table |
| `workbookTableColumnId` | <code>string</code> | Yes | ID or name of the table column |
| `headers` | <code>GetColumnRangeHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `RangeResponse&#124;error`

**Sample code:**

```ballerina
excel:RangeResponse result = check excelClient->getColumnRange(driveId, driveItemId,
    "Sheet1", "Expenses", "3");
```

**Sample response:**

```json
{
  "columnHidden": false,
  "address": "Sheet1!A1:C2",
  "hidden": false,
  "formulas": [
    ["Date", "Category", "Amount"],
    ["2026-11-02", "Travel", 120.5]
  ],
  "values": [
    ["Date", "Category", "Amount"],
    ["2026-11-02", "Travel", 120.5]
  ],
  "columnCount": 3,
  "rowHidden": false,
  "cellCount": 6,
  "numberFormat": [
    ["General", "General", "General"],
    ["yyyy-mm-dd", "General", "0.00"]
  ],
  "columnIndex": 0,
  "rowIndex": 0,
  "valueTypes": [
    ["String", "String", "String"],
    ["String", "String", "Double"]
  ],
  "rowCount": 2
}
```

</details>

<details>
<summary>getColumnTotalRowRange</summary>

Retrieves the total row range of a table column.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookTableId` | <code>string</code> | Yes | ID or name of the table |
| `workbookTableColumnId` | <code>string</code> | Yes | ID or name of the table column |
| `headers` | <code>GetColumnTotalRowRangeHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `RangeResponse&#124;error`

**Sample code:**

```ballerina
excel:RangeResponse result = check excelClient->getColumnTotalRowRange(driveId, driveItemId,
    "Sheet1", "Expenses", "3");
```

**Sample response:**

```json
{
  "columnHidden": false,
  "address": "Sheet1!A1:C2",
  "hidden": false,
  "formulas": [
    ["Date", "Category", "Amount"],
    ["2026-11-02", "Travel", 120.5]
  ],
  "values": [
    ["Date", "Category", "Amount"],
    ["2026-11-02", "Travel", 120.5]
  ],
  "columnCount": 3,
  "rowHidden": false,
  "cellCount": 6,
  "numberFormat": [
    ["General", "General", "General"],
    ["yyyy-mm-dd", "General", "0.00"]
  ],
  "columnIndex": 0,
  "rowIndex": 0,
  "valueTypes": [
    ["String", "String", "String"],
    ["String", "String", "Double"]
  ],
  "rowCount": 2
}
```

</details>

<details>
<summary>addColumn</summary>

Adds a column to a table, with optional values.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookTableId` | <code>string</code> | Yes | ID or name of the table |
| `payload` | <code>AddColumnRequest</code> | Yes | Name, position and optional values of the new column |
| `headers` | <code>AddColumnHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `AddColumnResponse&#124;error`

**Sample code:**

```ballerina
excel:AddColumnResponse result = check excelClient->addColumn(driveId, driveItemId,
    "Sheet1", "Expenses", {name: "Region"});
```

**Sample response:**

```json
{
  "id": "3",
  "values": [
    ["Amount"],
    [120.5],
    [48]
  ],
  "name": "Amount",
  "index": 0
}
```

</details>

<details>
<summary>countColumns</summary>

Returns the number of columns in a table.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookTableId` | <code>string</code> | Yes | ID or name of the table |
| `headers` | <code>CountColumnsHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `CountResult&#124;error`

**Sample code:**

```ballerina
excel:CountResult result = check excelClient->countColumns(driveId, driveItemId,
    "Sheet1", "Expenses");
```

**Sample response:**

```json
{
  "value": 3
}
```

</details>

#### Table column filters

<details>
<summary>getColumnFilter</summary>

Retrieves the filter applied to a table column.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookTableId` | <code>string</code> | Yes | ID or name of the table |
| `workbookTableColumnId` | <code>string</code> | Yes | ID or name of the table column |
| `headers` | <code>GetColumnFilterHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |
| `dollarExpand` | <code>string[]</code> | No | Expand related entities |
| `dollarSelect` | <code>string[]</code> | No | Select properties to be returned |

**Returns:** `Filter&#124;error`

**Sample code:**

```ballerina
excel:Filter result = check excelClient->getColumnFilter(driveId, driveItemId,
    "Sheet1", "Expenses", "3");
```

**Sample response:**

```json
{
  "criteria": {
    "filterOn": "Values",
    "values": ["Travel", "Meals"]
  }
}
```

</details>

<details>
<summary>updateColumnFilter</summary>

Updates the filter applied to a table column.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookTableId` | <code>string</code> | Yes | ID or name of the table |
| `workbookTableColumnId` | <code>string</code> | Yes | ID or name of the table column |
| `payload` | <code>Filter</code> | Yes | Table column filter properties to update |
| `headers` | <code>UpdateColumnFilterHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `Filter&#124;error`

**Sample code:**

```ballerina
excel:Filter result = check excelClient->updateColumnFilter(driveId, driveItemId,
    "Sheet1", "Expenses", "3", {criteria: {filterOn: "Values", values: ["Travel"]}});
```

**Sample response:**

```json
{
  "criteria": {
    "filterOn": "Values",
    "values": ["Travel", "Meals"]
  }
}
```

</details>

<details>
<summary>applyColumnFilter</summary>

Applies a filter with the given criteria to a table column.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookTableId` | <code>string</code> | Yes | ID or name of the table |
| `workbookTableColumnId` | <code>string</code> | Yes | ID or name of the table column |
| `payload` | <code>ApplyFilterRequest</code> | Yes | Filter criteria to apply |
| `headers` | <code>ApplyColumnFilterHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `error?`

**Sample code:**

```ballerina
check excelClient->applyColumnFilter(driveId, driveItemId,
    "Sheet1", "Expenses", "3", {criteria: {filterOn: "Values", values: ["Travel", "Meals"]}});
```

</details>

<details>
<summary>applyBottomItemsFilter</summary>

Filters a table column to show its bottom N items.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookTableId` | <code>string</code> | Yes | ID or name of the table |
| `workbookTableColumnId` | <code>string</code> | Yes | ID or name of the table column |
| `payload` | <code>ApplyBottomItemsFilterRequest</code> | Yes | Number of items to show |
| `headers` | <code>ApplyBottomItemsFilterHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `error?`

**Sample code:**

```ballerina
check excelClient->applyBottomItemsFilter(driveId, driveItemId,
    "Sheet1", "Expenses", "3", {count: 5});
```

</details>

<details>
<summary>applyBottomPctFilter</summary>

Filters a table column to show its bottom N percent of items.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookTableId` | <code>string</code> | Yes | ID or name of the table |
| `workbookTableColumnId` | <code>string</code> | Yes | ID or name of the table column |
| `payload` | <code>ApplyBottomPctFilterRequest</code> | Yes | Percentage of items to show |
| `headers` | <code>ApplyBottomPctFilterHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `error?`

**Sample code:**

```ballerina
check excelClient->applyBottomPctFilter(driveId, driveItemId,
    "Sheet1", "Expenses", "3", {percent: 10});
```

</details>

<details>
<summary>applyCellColorFilter</summary>

Filters a table column by cell color.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookTableId` | <code>string</code> | Yes | ID or name of the table |
| `workbookTableColumnId` | <code>string</code> | Yes | ID or name of the table column |
| `payload` | <code>ApplyCellColorFilterRequest</code> | Yes | Cell color to filter by |
| `headers` | <code>ApplyCellColorFilterHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `error?`

**Sample code:**

```ballerina
check excelClient->applyCellColorFilter(driveId, driveItemId,
    "Sheet1", "Expenses", "3", {color: "#FFFF00"});
```

</details>

<details>
<summary>applyCustomFilter</summary>

Filters a table column with one or two custom criteria.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookTableId` | <code>string</code> | Yes | ID or name of the table |
| `workbookTableColumnId` | <code>string</code> | Yes | ID or name of the table column |
| `payload` | <code>ApplyCustomFilterRequest</code> | Yes | First criterion, optional second criterion and the operator that joins them |
| `headers` | <code>ApplyCustomFilterHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `error?`

**Sample code:**

```ballerina
check excelClient->applyCustomFilter(driveId, driveItemId,
    "Sheet1", "Expenses", "3", {criteria1: ">100", criteria2: "<500", oper: "And"});
```

</details>

<details>
<summary>applyDynamicFilter</summary>

Filters a table column with a dynamic criterion, such as above average or this month.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookTableId` | <code>string</code> | Yes | ID or name of the table |
| `workbookTableColumnId` | <code>string</code> | Yes | ID or name of the table column |
| `payload` | <code>ApplyDynamicFilterRequest</code> | Yes | Dynamic criterion to apply |
| `headers` | <code>ApplyDynamicFilterHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `error?`

**Sample code:**

```ballerina
check excelClient->applyDynamicFilter(driveId, driveItemId,
    "Sheet1", "Expenses", "3", {criteria: "AboveAverage"});
```

</details>

<details>
<summary>applyFontColorFilter</summary>

Filters a table column by font color.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookTableId` | <code>string</code> | Yes | ID or name of the table |
| `workbookTableColumnId` | <code>string</code> | Yes | ID or name of the table column |
| `payload` | <code>ApplyCellColorFilterRequest</code> | Yes | Cell color to filter by |
| `headers` | <code>ApplyFontColorFilterHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `error?`

**Sample code:**

```ballerina
check excelClient->applyFontColorFilter(driveId, driveItemId,
    "Sheet1", "Expenses", "3", {color: "#FFFF00"});
```

</details>

<details>
<summary>applyIconFilter</summary>

Filters a table column by conditional formatting icon.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookTableId` | <code>string</code> | Yes | ID or name of the table |
| `workbookTableColumnId` | <code>string</code> | Yes | ID or name of the table column |
| `payload` | <code>ApplyIconFilterRequest</code> | Yes | Icon to filter by |
| `headers` | <code>ApplyIconFilterHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `error?`

**Sample code:**

```ballerina
check excelClient->applyIconFilter(driveId, driveItemId,
    "Sheet1", "Expenses", "3", {icon: {set: "ThreeArrows", index: 0}});
```

</details>

<details>
<summary>applyTopItemsFilter</summary>

Filters a table column to show its top N items.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookTableId` | <code>string</code> | Yes | ID or name of the table |
| `workbookTableColumnId` | <code>string</code> | Yes | ID or name of the table column |
| `payload` | <code>ApplyBottomItemsFilterRequest</code> | Yes | Number of items to show |
| `headers` | <code>ApplyTopItemsFilterHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `error?`

**Sample code:**

```ballerina
check excelClient->applyTopItemsFilter(driveId, driveItemId, "Sheet1", "Expenses", "3", {count: 5});
```

</details>

<details>
<summary>applyTopPctFilter</summary>

Filters a table column to show its top N percent of items.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookTableId` | <code>string</code> | Yes | ID or name of the table |
| `workbookTableColumnId` | <code>string</code> | Yes | ID or name of the table column |
| `payload` | <code>ApplyBottomPctFilterRequest</code> | Yes | Percentage of items to show |
| `headers` | <code>ApplyTopPctFilterHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `error?`

**Sample code:**

```ballerina
check excelClient->applyTopPctFilter(driveId, driveItemId,
    "Sheet1", "Expenses", "3", {percent: 10});
```

</details>

<details>
<summary>applyValuesFilter</summary>

Filters a table column to show only the given values.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookTableId` | <code>string</code> | Yes | ID or name of the table |
| `workbookTableColumnId` | <code>string</code> | Yes | ID or name of the table column |
| `payload` | <code>ApplyValuesFilterRequest</code> | Yes | Values to show |
| `headers` | <code>ApplyValuesFilterHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `error?`

**Sample code:**

```ballerina
check excelClient->applyValuesFilter(driveId, driveItemId,
    "Sheet1", "Expenses", "3", {values: ["Travel", "Meals"]});
```

</details>

<details>
<summary>clearColumnFilter</summary>

Clears the filter of a table column.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookTableId` | <code>string</code> | Yes | ID or name of the table |
| `workbookTableColumnId` | <code>string</code> | Yes | ID or name of the table column |
| `headers` | <code>ClearColumnFilterHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `error?`

**Sample code:**

```ballerina
check excelClient->clearColumnFilter(driveId, driveItemId, "Sheet1", "Expenses", "3");
```

</details>

#### Table sort

<details>
<summary>getTableSort</summary>

Retrieves the sort settings of a table.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookTableId` | <code>string</code> | Yes | ID or name of the table |
| `headers` | <code>GetTableSortHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |
| `dollarExpand` | <code>string[]</code> | No | Expand related entities |
| `dollarSelect` | <code>string[]</code> | No | Select properties to be returned |

**Returns:** `TableSort&#124;error`

**Sample code:**

```ballerina
excel:TableSort result = check excelClient->getTableSort(driveId, driveItemId,
    "Sheet1", "Expenses");
```

**Sample response:**

```json
{
  "matchCase": false,
  "method": "PinYin"
}
```

</details>

<details>
<summary>updateTableSort</summary>

Updates the sort settings of a table.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookTableId` | <code>string</code> | Yes | ID or name of the table |
| `payload` | <code>TableSort</code> | Yes | Table sort properties to update |
| `headers` | <code>UpdateTableSortHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `TableSort&#124;error`

**Sample code:**

```ballerina
excel:TableSort result = check excelClient->updateTableSort(driveId, driveItemId,
    "Sheet1", "Expenses", {matchCase: false});
```

**Sample response:**

```json
{
  "matchCase": false,
  "method": "PinYin"
}
```

</details>

<details>
<summary>applyTableSort</summary>

Sorts a table by one or more fields.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookTableId` | <code>string</code> | Yes | ID or name of the table |
| `payload` | <code>ApplyTableSortRequest</code> | Yes | Sort fields, case sensitivity and sort method |
| `headers` | <code>ApplyTableSortHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `error?`

**Sample code:**

```ballerina
check excelClient->applyTableSort(driveId, driveItemId,
    "Sheet1", "Expenses", {fields: [{'key: 2, 'ascending: false}]});
```

</details>

<details>
<summary>clearTableSort</summary>

Clears the sort applied to a table.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookTableId` | <code>string</code> | Yes | ID or name of the table |
| `headers` | <code>ClearTableSortHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `error?`

**Sample code:**

```ballerina
check excelClient->clearTableSort(driveId, driveItemId, "Sheet1", "Expenses");
```

</details>

<details>
<summary>reapplyTableSort</summary>

Reapplies the current sort to a table.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookTableId` | <code>string</code> | Yes | ID or name of the table |
| `headers` | <code>ReapplyTableSortHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `error?`

**Sample code:**

```ballerina
check excelClient->reapplyTableSort(driveId, driveItemId, "Sheet1", "Expenses");
```

</details>

#### Charts

<details>
<summary>listCharts</summary>

Lists the charts on a worksheet.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `headers` | <code>ListChartsHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |
| `dollarSkip` | <code>int</code> | No | Skip the first n items |
| `dollarTop` | <code>int</code> | No | Show only the first n items |
| `dollarFilter` | <code>string</code> | No | Filter items by property values |
| `dollarSearch` | <code>string</code> | No | Search items by search phrases |
| `dollarOrderby` | <code>string[]</code> | No | Order items by property values |
| `dollarExpand` | <code>string[]</code> | No | Expand related entities |
| `dollarCount` | <code>boolean</code> | No | Include count of items |
| `dollarSelect` | <code>string[]</code> | No | Select properties to be returned |

**Returns:** `ChartCollectionResponse&#124;error`

**Sample code:**

```ballerina
excel:ChartCollectionResponse result = check excelClient->listCharts(driveId, driveItemId,
    "Sheet1");
```

**Sample response:**

```json
{
  "value": [
    {
      "id": "{2D6B7A9C-5E1F-4C3E-8F1A-1B2C3D4E5F60}",
      "top": 20,
      "left": 300,
      "name": "Chart 1",
      "width": 360,
      "height": 216
    }
  ]
}
```

</details>

<details>
<summary>createChart</summary>

Creates a chart on a worksheet.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `payload` | <code>Chart</code> | Yes | Chart to create |
| `headers` | <code>CreateChartHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `Chart&#124;error`

**Sample code:**

```ballerina
excel:Chart result = check excelClient->createChart(driveId, driveItemId,
    "Sheet1", {name: "Revenue chart"});
```

**Sample response:**

```json
{
  "id": "{2D6B7A9C-5E1F-4C3E-8F1A-1B2C3D4E5F60}",
  "top": 20,
  "left": 300,
  "name": "Chart 1",
  "width": 360,
  "height": 216
}
```

</details>

<details>
<summary>getChart</summary>

Retrieves a chart from a worksheet.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookChartId` | <code>string</code> | Yes | ID or name of the chart |
| `headers` | <code>GetChartHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |
| `dollarExpand` | <code>string[]</code> | No | Expand related entities |
| `dollarSelect` | <code>string[]</code> | No | Select properties to be returned |

**Returns:** `Chart&#124;error`

**Sample code:**

```ballerina
excel:Chart result = check excelClient->getChart(driveId, driveItemId, "Sheet1", "Chart 1");
```

**Sample response:**

```json
{
  "id": "{2D6B7A9C-5E1F-4C3E-8F1A-1B2C3D4E5F60}",
  "top": 20,
  "left": 300,
  "name": "Chart 1",
  "width": 360,
  "height": 216
}
```

</details>

<details>
<summary>deleteChart</summary>

Deletes a chart from a worksheet.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookChartId` | <code>string</code> | Yes | ID or name of the chart |
| `headers` | <code>DeleteChartHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `error?`

**Sample code:**

```ballerina
check excelClient->deleteChart(driveId, driveItemId, "Sheet1", "Chart 1");
```

</details>

<details>
<summary>updateChart</summary>

Updates the properties of a chart, such as its name, size or position.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookChartId` | <code>string</code> | Yes | ID or name of the chart |
| `payload` | <code>Chart</code> | Yes | Chart properties to update |
| `headers` | <code>UpdateChartHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `Chart&#124;error`

**Sample code:**

```ballerina
excel:Chart result = check excelClient->updateChart(driveId, driveItemId,
    "Sheet1", "Chart 1", {name: "Revenue chart"});
```

**Sample response:**

```json
{
  "id": "{2D6B7A9C-5E1F-4C3E-8F1A-1B2C3D4E5F60}",
  "top": 20,
  "left": 300,
  "name": "Chart 1",
  "width": 360,
  "height": 216
}
```

</details>

<details>
<summary>getChartAxes</summary>

Retrieves the axes of a chart.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookChartId` | <code>string</code> | Yes | ID or name of the chart |
| `headers` | <code>GetChartAxesHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |
| `dollarExpand` | <code>string[]</code> | No | Expand related entities |
| `dollarSelect` | <code>string[]</code> | No | Select properties to be returned |

**Returns:** `ChartAxes&#124;error`

**Sample code:**

```ballerina
excel:ChartAxes result = check excelClient->getChartAxes(driveId, driveItemId, "Sheet1", "Chart 1");
```

**Sample response:**

```json
{
  "categoryAxis": {
    "maximum": 1000,
    "minimum": 0,
    "minorUnit": 40,
    "majorUnit": 200
  },
  "valueAxis": {
    "maximum": 1000,
    "minimum": 0,
    "minorUnit": 40,
    "majorUnit": 200
  },
  "seriesAxis": {
    "maximum": 1000,
    "minimum": 0,
    "minorUnit": 40,
    "majorUnit": 200
  }
}
```

</details>

<details>
<summary>updateChartAxes</summary>

Updates the axes of a chart.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookChartId` | <code>string</code> | Yes | ID or name of the chart |
| `payload` | <code>ChartAxes</code> | Yes | Chart axes properties to update |
| `headers` | <code>UpdateChartAxesHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `ChartAxes&#124;error`

**Sample code:**

```ballerina
excel:ChartAxes result = check excelClient->updateChartAxes(driveId, driveItemId,
    "Sheet1", "Chart 1", {valueAxis: {minimum: 0}});
```

**Sample response:**

```json
{
  "categoryAxis": {
    "maximum": 1000,
    "minimum": 0,
    "minorUnit": 40,
    "majorUnit": 200
  },
  "valueAxis": {
    "maximum": 1000,
    "minimum": 0,
    "minorUnit": 40,
    "majorUnit": 200
  },
  "seriesAxis": {
    "maximum": 1000,
    "minimum": 0,
    "minorUnit": 40,
    "majorUnit": 200
  }
}
```

</details>

<details>
<summary>getCategoryAxis</summary>

Retrieves the category axis of a chart.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookChartId` | <code>string</code> | Yes | ID or name of the chart |
| `headers` | <code>GetCategoryAxisHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |
| `dollarExpand` | <code>string[]</code> | No | Expand related entities |
| `dollarSelect` | <code>string[]</code> | No | Select properties to be returned |

**Returns:** `ChartAxis&#124;error`

**Sample code:**

```ballerina
excel:ChartAxis result = check excelClient->getCategoryAxis(driveId, driveItemId,
    "Sheet1", "Chart 1");
```

**Sample response:**

```json
{
  "maximum": 1000,
  "minimum": 0,
  "minorUnit": 40,
  "majorUnit": 200
}
```

</details>

<details>
<summary>updateCategoryAxis</summary>

Updates the category axis of a chart.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookChartId` | <code>string</code> | Yes | ID or name of the chart |
| `payload` | <code>ChartAxis</code> | Yes | Category axis properties to update |
| `headers` | <code>UpdateCategoryAxisHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `ChartAxis&#124;error`

**Sample code:**

```ballerina
excel:ChartAxis result = check excelClient->updateCategoryAxis(driveId, driveItemId,
    "Sheet1", "Chart 1", {minimum: 0, maximum: 1000, majorUnit: 200});
```

**Sample response:**

```json
{
  "maximum": 1000,
  "minimum": 0,
  "minorUnit": 40,
  "majorUnit": 200
}
```

</details>

<details>
<summary>getSeriesAxis</summary>

Retrieves the series axis of a 3D chart.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookChartId` | <code>string</code> | Yes | ID or name of the chart |
| `headers` | <code>GetSeriesAxisHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |
| `dollarExpand` | <code>string[]</code> | No | Expand related entities |
| `dollarSelect` | <code>string[]</code> | No | Select properties to be returned |

**Returns:** `ChartAxis&#124;error`

**Sample code:**

```ballerina
excel:ChartAxis result = check excelClient->getSeriesAxis(driveId, driveItemId,
    "Sheet1", "Chart 1");
```

**Sample response:**

```json
{
  "maximum": 1000,
  "minimum": 0,
  "minorUnit": 40,
  "majorUnit": 200
}
```

</details>

<details>
<summary>updateSeriesAxis</summary>

Updates the series axis of a 3D chart.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookChartId` | <code>string</code> | Yes | ID or name of the chart |
| `payload` | <code>ChartAxis</code> | Yes | Series axis properties to update |
| `headers` | <code>UpdateSeriesAxisHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `ChartAxis&#124;error`

**Sample code:**

```ballerina
excel:ChartAxis result = check excelClient->updateSeriesAxis(driveId, driveItemId,
    "Sheet1", "Chart 1", {minimum: 0, maximum: 1000, majorUnit: 200});
```

**Sample response:**

```json
{
  "maximum": 1000,
  "minimum": 0,
  "minorUnit": 40,
  "majorUnit": 200
}
```

</details>

<details>
<summary>getValueAxis</summary>

Retrieves the value axis of a chart.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookChartId` | <code>string</code> | Yes | ID or name of the chart |
| `headers` | <code>GetValueAxisHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |
| `dollarExpand` | <code>string[]</code> | No | Expand related entities |
| `dollarSelect` | <code>string[]</code> | No | Select properties to be returned |

**Returns:** `ChartAxis&#124;error`

**Sample code:**

```ballerina
excel:ChartAxis result = check excelClient->getValueAxis(driveId, driveItemId, "Sheet1", "Chart 1");
```

**Sample response:**

```json
{
  "maximum": 1000,
  "minimum": 0,
  "minorUnit": 40,
  "majorUnit": 200
}
```

</details>

<details>
<summary>updateValueAxis</summary>

Updates the value axis of a chart, such as its minimum, maximum and units.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookChartId` | <code>string</code> | Yes | ID or name of the chart |
| `payload` | <code>ChartAxis</code> | Yes | Value axis properties to update |
| `headers` | <code>UpdateValueAxisHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `ChartAxis&#124;error`

**Sample code:**

```ballerina
excel:ChartAxis result = check excelClient->updateValueAxis(driveId, driveItemId,
    "Sheet1", "Chart 1", {minimum: 0, maximum: 1000, majorUnit: 200});
```

**Sample response:**

```json
{
  "maximum": 1000,
  "minimum": 0,
  "minorUnit": 40,
  "majorUnit": 200
}
```

</details>

<details>
<summary>getDataLabels</summary>

Retrieves the data label settings of a chart.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookChartId` | <code>string</code> | Yes | ID or name of the chart |
| `headers` | <code>GetDataLabelsHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |
| `dollarExpand` | <code>string[]</code> | No | Expand related entities |
| `dollarSelect` | <code>string[]</code> | No | Select properties to be returned |

**Returns:** `ChartDataLabels&#124;error`

**Sample code:**

```ballerina
excel:ChartDataLabels result = check excelClient->getDataLabels(driveId, driveItemId,
    "Sheet1", "Chart 1");
```

**Sample response:**

```json
{
  "showValue": true,
  "showBubbleSize": false,
  "showLegendKey": false,
  "showPercentage": false,
  "showSeriesName": false,
  "showCategoryName": false,
  "position": "OutsideEnd",
  "separator": ", "
}
```

</details>

<details>
<summary>updateDataLabels</summary>

Updates the data label settings of a chart.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookChartId` | <code>string</code> | Yes | ID or name of the chart |
| `payload` | <code>ChartDataLabels</code> | Yes | Chart data labels properties to update |
| `headers` | <code>UpdateDataLabelsHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `ChartDataLabels&#124;error`

**Sample code:**

```ballerina
excel:ChartDataLabels result = check excelClient->updateDataLabels(driveId, driveItemId,
    "Sheet1", "Chart 1", {showValue: true, position: "OutsideEnd"});
```

**Sample response:**

```json
{
  "showValue": true,
  "showBubbleSize": false,
  "showLegendKey": false,
  "showPercentage": false,
  "showSeriesName": false,
  "showCategoryName": false,
  "position": "OutsideEnd",
  "separator": ", "
}
```

</details>

<details>
<summary>getChartFormat</summary>

Retrieves the format of a chart area.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookChartId` | <code>string</code> | Yes | ID or name of the chart |
| `headers` | <code>GetChartFormatHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |
| `dollarExpand` | <code>string[]</code> | No | Expand related entities |
| `dollarSelect` | <code>string[]</code> | No | Select properties to be returned |

**Returns:** `ChartAreaFormat&#124;error`

**Sample code:**

```ballerina
excel:ChartAreaFormat result = check excelClient->getChartFormat(driveId, driveItemId,
    "Sheet1", "Chart 1");
```

**Sample response:**

```json
{
  "fill": {},
  "font": {
    "color": "#000000",
    "size": 11,
    "underline": "None",
    "name": "Calibri",
    "bold": false,
    "italic": false
  }
}
```

</details>

<details>
<summary>updateChartFormat</summary>

Updates the format of a chart area.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookChartId` | <code>string</code> | Yes | ID or name of the chart |
| `payload` | <code>ChartAreaFormat</code> | Yes | Chart format properties to update |
| `headers` | <code>UpdateChartFormatHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `ChartAreaFormat&#124;error`

**Sample code:**

```ballerina
excel:ChartAreaFormat result = check excelClient->updateChartFormat(driveId, driveItemId,
    "Sheet1", "Chart 1", {font: {name: "Calibri", size: 11}});
```

**Sample response:**

```json
{
  "fill": {},
  "font": {
    "color": "#000000",
    "size": 11,
    "underline": "None",
    "name": "Calibri",
    "bold": false,
    "italic": false
  }
}
```

</details>

<details>
<summary>getLegend</summary>

Retrieves the legend of a chart.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookChartId` | <code>string</code> | Yes | ID or name of the chart |
| `headers` | <code>GetLegendHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |
| `dollarExpand` | <code>string[]</code> | No | Expand related entities |
| `dollarSelect` | <code>string[]</code> | No | Select properties to be returned |

**Returns:** `ChartLegend&#124;error`

**Sample code:**

```ballerina
excel:ChartLegend result = check excelClient->getLegend(driveId, driveItemId, "Sheet1", "Chart 1");
```

**Sample response:**

```json
{
  "visible": true,
  "overlay": false,
  "position": "Right"
}
```

</details>

<details>
<summary>updateLegend</summary>

Updates the legend of a chart, such as its visibility and position.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookChartId` | <code>string</code> | Yes | ID or name of the chart |
| `payload` | <code>ChartLegend</code> | Yes | Chart legend properties to update |
| `headers` | <code>UpdateLegendHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `ChartLegend&#124;error`

**Sample code:**

```ballerina
excel:ChartLegend result = check excelClient->updateLegend(driveId, driveItemId,
    "Sheet1", "Chart 1", {visible: true, position: "Bottom"});
```

**Sample response:**

```json
{
  "visible": true,
  "overlay": false,
  "position": "Right"
}
```

</details>

<details>
<summary>getChartImage</summary>

Renders a chart as a base64-encoded image at its current size.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookChartId` | <code>string</code> | Yes | ID or name of the chart |
| `headers` | <code>GetChartImageHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `ChartImageResponse&#124;error`

**Sample code:**

```ballerina
excel:ChartImageResponse result = check excelClient->getChartImage(driveId, driveItemId,
    "Sheet1", "Chart 1");
```

**Sample response:**

```json
{
  "value": "iVBORw0KGgoAAAANSUhEUgAAAlgAAAGQCAYAAAByNR6YAAAAAXNSR0IArs4c6QAA..."
}
```

</details>

<details>
<summary>getChartImageFitted</summary>

Renders a chart as a base64-encoded image scaled to a width and height with a fitting mode.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookChartId` | <code>string</code> | Yes | ID or name of the chart |
| `width` | <code>decimal</code> | Yes | Width of the resulting image |
| `height` | <code>decimal</code> | Yes | Height of the resulting image |
| `fittingMode` | <code>string</code> | Yes | How the chart scales to the given size: `Fit`, `FitAndCenter` or `Fill` |
| `headers` | <code>GetChartImageFittedHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `ChartImageResponse&#124;error`

**Sample code:**

```ballerina
excel:ChartImageResponse result = check excelClient->getChartImageFitted(driveId, driveItemId,
    "Sheet1", "Chart 1", 600, 400, "Fit");
```

**Sample response:**

```json
{
  "value": "iVBORw0KGgoAAAANSUhEUgAAAlgAAAGQCAYAAAByNR6YAAAAAXNSR0IArs4c6QAA..."
}
```

</details>

<details>
<summary>getChartImageBySize</summary>

Renders a chart as a base64-encoded image scaled to a width and height.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookChartId` | <code>string</code> | Yes | ID or name of the chart |
| `width` | <code>decimal</code> | Yes | Width of the resulting image |
| `height` | <code>decimal</code> | Yes | Height of the resulting image |
| `headers` | <code>GetChartImageBySizeHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `ChartImageResponse&#124;error`

**Sample code:**

```ballerina
excel:ChartImageResponse result = check excelClient->getChartImageBySize(driveId, driveItemId,
    "Sheet1", "Chart 1", 600, 400);
```

**Sample response:**

```json
{
  "value": "iVBORw0KGgoAAAANSUhEUgAAAlgAAAGQCAYAAAByNR6YAAAAAXNSR0IArs4c6QAA..."
}
```

</details>

<details>
<summary>getChartImageByWidth</summary>

Renders a chart as a base64-encoded image scaled to a width.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookChartId` | <code>string</code> | Yes | ID or name of the chart |
| `width` | <code>decimal</code> | Yes | Width of the resulting image |
| `headers` | <code>GetChartImageByWidthHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `ChartImageResponse&#124;error`

**Sample code:**

```ballerina
excel:ChartImageResponse result = check excelClient->getChartImageByWidth(driveId, driveItemId,
    "Sheet1", "Chart 1", 600);
```

**Sample response:**

```json
{
  "value": "iVBORw0KGgoAAAANSUhEUgAAAlgAAAGQCAYAAAByNR6YAAAAAXNSR0IArs4c6QAA..."
}
```

</details>

<details>
<summary>setChartData</summary>

Resets the source data of a chart.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookChartId` | <code>string</code> | Yes | ID or name of the chart |
| `payload` | <code>SetChartDataRequest</code> | Yes | Source data range and how series are laid out |
| `headers` | <code>SetChartDataHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `error?`

**Sample code:**

```ballerina
check excelClient->setChartData(driveId, driveItemId,
    "Sheet1", "Chart 1", {sourceData: "A1:C9", seriesBy: "Columns"});
```

</details>

<details>
<summary>setChartPosition</summary>

Positions a chart relative to cells on the worksheet.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookChartId` | <code>string</code> | Yes | ID or name of the chart |
| `payload` | <code>SetChartPositionRequest</code> | Yes | Start cell and optional end cell of the chart |
| `headers` | <code>SetChartPositionHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `error?`

**Sample code:**

```ballerina
check excelClient->setChartPosition(driveId, driveItemId,
    "Sheet1", "Chart 1", {startCell: "E2", endCell: "L15"});
```

</details>

<details>
<summary>listChartSeries</summary>

Lists the series of a chart.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookChartId` | <code>string</code> | Yes | ID or name of the chart |
| `headers` | <code>ListChartSeriesHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |
| `dollarSkip` | <code>int</code> | No | Skip the first n items |
| `dollarTop` | <code>int</code> | No | Show only the first n items |
| `dollarFilter` | <code>string</code> | No | Filter items by property values |
| `dollarSearch` | <code>string</code> | No | Search items by search phrases |
| `dollarOrderby` | <code>string[]</code> | No | Order items by property values |
| `dollarExpand` | <code>string[]</code> | No | Expand related entities |
| `dollarCount` | <code>boolean</code> | No | Include count of items |
| `dollarSelect` | <code>string[]</code> | No | Select properties to be returned |

**Returns:** `ChartSeriesCollectionResponse&#124;error`

**Sample code:**

```ballerina
excel:ChartSeriesCollectionResponse result = check excelClient->listChartSeries(driveId, driveItemId,
    "Sheet1", "Chart 1");
```

**Sample response:**

```json
{
  "value": [
    {
      "id": "0",
      "name": "Revenue"
    }
  ]
}
```

</details>

<details>
<summary>createChartSeries</summary>

Adds a series to a chart.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookChartId` | <code>string</code> | Yes | ID or name of the chart |
| `payload` | <code>ChartSeries</code> | Yes | Chart series to create |
| `headers` | <code>CreateChartSeriesHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `ChartSeries&#124;error`

**Sample code:**

```ballerina
excel:ChartSeries result = check excelClient->createChartSeries(driveId, driveItemId,
    "Sheet1", "Chart 1", {name: "Revenue"});
```

**Sample response:**

```json
{
  "id": "0",
  "name": "Revenue"
}
```

</details>

<details>
<summary>getChartSeries</summary>

Retrieves a series of a chart.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookChartId` | <code>string</code> | Yes | ID or name of the chart |
| `workbookChartSeriesId` | <code>string</code> | Yes | ID of the chart series |
| `headers` | <code>GetChartSeriesHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |
| `dollarExpand` | <code>string[]</code> | No | Expand related entities |
| `dollarSelect` | <code>string[]</code> | No | Select properties to be returned |

**Returns:** `ChartSeries&#124;error`

**Sample code:**

```ballerina
excel:ChartSeries result = check excelClient->getChartSeries(driveId, driveItemId,
    "Sheet1", "Chart 1", "0");
```

**Sample response:**

```json
{
  "id": "0",
  "name": "Revenue"
}
```

</details>

<details>
<summary>deleteChartSeries</summary>

Deletes a series from a chart.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookChartId` | <code>string</code> | Yes | ID or name of the chart |
| `workbookChartSeriesId` | <code>string</code> | Yes | ID of the chart series |
| `headers` | <code>DeleteChartSeriesHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `error?`

**Sample code:**

```ballerina
check excelClient->deleteChartSeries(driveId, driveItemId, "Sheet1", "Chart 1", "0");
```

</details>

<details>
<summary>updateChartSeries</summary>

Updates a series of a chart.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookChartId` | <code>string</code> | Yes | ID or name of the chart |
| `workbookChartSeriesId` | <code>string</code> | Yes | ID of the chart series |
| `payload` | <code>ChartSeries</code> | Yes | Chart series properties to update |
| `headers` | <code>UpdateChartSeriesHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `ChartSeries&#124;error`

**Sample code:**

```ballerina
excel:ChartSeries result = check excelClient->updateChartSeries(driveId, driveItemId,
    "Sheet1", "Chart 1", "0", {name: "Revenue"});
```

**Sample response:**

```json
{
  "id": "0",
  "name": "Revenue"
}
```

</details>

<details>
<summary>countChartSeries</summary>

Returns the number of series in a chart.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookChartId` | <code>string</code> | Yes | ID or name of the chart |
| `headers` | <code>CountChartSeriesHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `CountResult&#124;error`

**Sample code:**

```ballerina
excel:CountResult result = check excelClient->countChartSeries(driveId, driveItemId,
    "Sheet1", "Chart 1");
```

**Sample response:**

```json
{
  "value": 3
}
```

</details>

<details>
<summary>getChartTitle</summary>

Retrieves the title of a chart.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookChartId` | <code>string</code> | Yes | ID or name of the chart |
| `headers` | <code>GetChartTitleHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |
| `dollarExpand` | <code>string[]</code> | No | Expand related entities |
| `dollarSelect` | <code>string[]</code> | No | Select properties to be returned |

**Returns:** `ChartTitle&#124;error`

**Sample code:**

```ballerina
excel:ChartTitle result = check excelClient->getChartTitle(driveId, driveItemId,
    "Sheet1", "Chart 1");
```

**Sample response:**

```json
{
  "visible": true,
  "overlay": false,
  "text": "Quarterly revenue"
}
```

</details>

<details>
<summary>updateChartTitle</summary>

Updates the title of a chart, such as its text and visibility.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookChartId` | <code>string</code> | Yes | ID or name of the chart |
| `payload` | <code>ChartTitle</code> | Yes | Chart title properties to update |
| `headers` | <code>UpdateChartTitleHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `ChartTitle&#124;error`

**Sample code:**

```ballerina
excel:ChartTitle result = check excelClient->updateChartTitle(driveId, driveItemId,
    "Sheet1", "Chart 1", {text: "Quarterly revenue", visible: true});
```

**Sample response:**

```json
{
  "visible": true,
  "overlay": false,
  "text": "Quarterly revenue"
}
```

</details>

<details>
<summary>getChartWorksheet</summary>

Retrieves the worksheet that contains a chart.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookChartId` | <code>string</code> | Yes | ID or name of the chart |
| `headers` | <code>GetChartWorksheetHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |
| `dollarExpand` | <code>string[]</code> | No | Expand related entities |
| `dollarSelect` | <code>string[]</code> | No | Select properties to be returned |

**Returns:** `Worksheet&#124;error`

**Sample code:**

```ballerina
excel:Worksheet result = check excelClient->getChartWorksheet(driveId, driveItemId,
    "Sheet1", "Chart 1");
```

**Sample response:**

```json
{
  "id": "{00000000-0001-0000-0000-000000000000}",
  "visibility": "Visible",
  "name": "Sheet1",
  "position": 0
}
```

</details>

<details>
<summary>addChart</summary>

Adds a chart of a given type over a source data range.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `payload` | <code>AddChartRequest</code> | Yes | Chart type, source data range and how series are laid out |
| `headers` | <code>AddChartHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `AddChartResponse&#124;error`

**Sample code:**

```ballerina
excel:AddChartResponse result = check excelClient->addChart(driveId, driveItemId,
    "Sheet1", {'type: "ColumnClustered", sourceData: "A1:C5", seriesBy: "Auto"});
```

**Sample response:**

```json
{
  "id": "{2D6B7A9C-5E1F-4C3E-8F1A-1B2C3D4E5F60}",
  "top": 20,
  "left": 300,
  "name": "Chart 1",
  "width": 360,
  "height": 216
}
```

</details>

<details>
<summary>countCharts</summary>

Returns the number of charts on a worksheet.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `headers` | <code>CountChartsHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `CountResult&#124;error`

**Sample code:**

```ballerina
excel:CountResult result = check excelClient->countCharts(driveId, driveItemId, "Sheet1");
```

**Sample response:**

```json
{
  "value": 3
}
```

</details>

#### PivotTables

<details>
<summary>listPivotTables</summary>

Lists the PivotTables on a worksheet.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `headers` | <code>ListPivotTablesHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |
| `dollarSkip` | <code>int</code> | No | Skip the first n items |
| `dollarTop` | <code>int</code> | No | Show only the first n items |
| `dollarFilter` | <code>string</code> | No | Filter items by property values |
| `dollarSearch` | <code>string</code> | No | Search items by search phrases |
| `dollarOrderby` | <code>string[]</code> | No | Order items by property values |
| `dollarExpand` | <code>string[]</code> | No | Expand related entities |
| `dollarCount` | <code>boolean</code> | No | Include count of items |
| `dollarSelect` | <code>string[]</code> | No | Select properties to be returned |

**Returns:** `PivotTableCollectionResponse&#124;error`

**Sample code:**

```ballerina
excel:PivotTableCollectionResponse result = check excelClient->listPivotTables(driveId, driveItemId,
    "Sheet1");
```

**Sample response:**

```json
{
  "value": [
    {
      "id": "{5F3A1B2C-7D8E-4F90-A1B2-C3D4E5F6A7B8}",
      "name": "PivotTable1"
    }
  ]
}
```

</details>

<details>
<summary>createPivotTable</summary>

Creates a PivotTable entry on a worksheet.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `payload` | <code>PivotTable</code> | Yes | Pivottable to create |
| `headers` | <code>CreatePivotTableHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `PivotTable&#124;error`

**Sample code:**

```ballerina
excel:PivotTable result = check excelClient->createPivotTable(driveId, driveItemId,
    "Sheet1", {name: "SalesPivot"});
```

**Sample response:**

```json
{
  "id": "{5F3A1B2C-7D8E-4F90-A1B2-C3D4E5F6A7B8}",
  "name": "PivotTable1"
}
```

</details>

<details>
<summary>getPivotTable</summary>

Retrieves a PivotTable from a worksheet.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookPivotTableId` | <code>string</code> | Yes | ID or name of the PivotTable |
| `headers` | <code>GetPivotTableHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |
| `dollarExpand` | <code>string[]</code> | No | Expand related entities |
| `dollarSelect` | <code>string[]</code> | No | Select properties to be returned |

**Returns:** `PivotTable&#124;error`

**Sample code:**

```ballerina
excel:PivotTable result = check excelClient->getPivotTable(driveId, driveItemId,
    "Sheet1", "PivotTable1");
```

**Sample response:**

```json
{
  "id": "{5F3A1B2C-7D8E-4F90-A1B2-C3D4E5F6A7B8}",
  "name": "PivotTable1"
}
```

</details>

<details>
<summary>deletePivotTable</summary>

Deletes a PivotTable from a worksheet.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookPivotTableId` | <code>string</code> | Yes | ID or name of the PivotTable |
| `headers` | <code>DeletePivotTableHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `error?`

**Sample code:**

```ballerina
check excelClient->deletePivotTable(driveId, driveItemId, "Sheet1", "PivotTable1");
```

</details>

<details>
<summary>updatePivotTable</summary>

Updates the properties of a PivotTable.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookPivotTableId` | <code>string</code> | Yes | ID or name of the PivotTable |
| `payload` | <code>PivotTable</code> | Yes | Pivottable properties to update |
| `headers` | <code>UpdatePivotTableHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `PivotTable&#124;error`

**Sample code:**

```ballerina
excel:PivotTable result = check excelClient->updatePivotTable(driveId, driveItemId,
    "Sheet1", "PivotTable1", {name: "SalesPivot"});
```

**Sample response:**

```json
{
  "id": "{5F3A1B2C-7D8E-4F90-A1B2-C3D4E5F6A7B8}",
  "name": "PivotTable1"
}
```

</details>

<details>
<summary>refreshPivotTable</summary>

Refreshes a PivotTable with the latest source data.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookPivotTableId` | <code>string</code> | Yes | ID or name of the PivotTable |
| `headers` | <code>RefreshPivotTableHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `error?`

**Sample code:**

```ballerina
check excelClient->refreshPivotTable(driveId, driveItemId, "Sheet1", "PivotTable1");
```

</details>

<details>
<summary>getPivotTableWorksheet</summary>

Retrieves the worksheet that contains a PivotTable.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookPivotTableId` | <code>string</code> | Yes | ID or name of the PivotTable |
| `headers` | <code>GetPivotTableWorksheetHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |
| `dollarExpand` | <code>string[]</code> | No | Expand related entities |
| `dollarSelect` | <code>string[]</code> | No | Select properties to be returned |

**Returns:** `Worksheet&#124;error`

**Sample code:**

```ballerina
excel:Worksheet result = check excelClient->getPivotTableWorksheet(driveId, driveItemId,
    "Sheet1", "PivotTable1");
```

**Sample response:**

```json
{
  "id": "{00000000-0001-0000-0000-000000000000}",
  "visibility": "Visible",
  "name": "Sheet1",
  "position": 0
}
```

</details>

<details>
<summary>countPivotTables</summary>

Returns the number of PivotTables on a worksheet.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `headers` | <code>CountPivotTablesHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |
| `dollarFilter` | <code>string</code> | No | Filter items by property values |
| `dollarSearch` | <code>string</code> | No | Search items by search phrases |

**Returns:** `string&#124;error`

**Sample code:**

```ballerina
string result = check excelClient->countPivotTables(driveId, driveItemId, "Sheet1");
```

**Sample response:**

```json
"3"
```

</details>

<details>
<summary>refreshAllPivotTables</summary>

Refreshes every PivotTable on a worksheet.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `headers` | <code>RefreshAllPivotTablesHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `error?`

**Sample code:**

```ballerina
check excelClient->refreshAllPivotTables(driveId, driveItemId, "Sheet1");
```

</details>

#### Named items

<details>
<summary>listNamedItems</summary>

Lists the workbook-scoped named items in a workbook.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `headers` | <code>ListNamedItemsHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |
| `dollarSkip` | <code>int</code> | No | Skip the first n items |
| `dollarTop` | <code>int</code> | No | Show only the first n items |
| `dollarFilter` | <code>string</code> | No | Filter items by property values |
| `dollarSearch` | <code>string</code> | No | Search items by search phrases |
| `dollarOrderby` | <code>string[]</code> | No | Order items by property values |
| `dollarExpand` | <code>string[]</code> | No | Expand related entities |
| `dollarCount` | <code>boolean</code> | No | Include count of items |
| `dollarSelect` | <code>string[]</code> | No | Select properties to be returned |

**Returns:** `NamedItemCollectionResponse&#124;error`

**Sample code:**

```ballerina
excel:NamedItemCollectionResponse result = check excelClient->listNamedItems(driveId, driveItemId);
```

**Sample response:**

```json
{
  "value": [
    {
      "visible": true,
      "scope": "Workbook",
      "name": "TaxRate",
      "comment": "Sales tax rate",
      "type": "Range",
      "value": "Sheet1!$B$1"
    }
  ]
}
```

</details>

<details>
<summary>createNamedItem</summary>

Creates a workbook-scoped named item.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `payload` | <code>NamedItem</code> | Yes | Named item to create |
| `headers` | <code>CreateNamedItemHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `NamedItem&#124;error`

**Sample code:**

```ballerina
excel:NamedItem result = check excelClient->createNamedItem(driveId, driveItemId,
    {comment: "Updated sales tax rate", visible: true});
```

**Sample response:**

```json
{
  "visible": true,
  "scope": "Workbook",
  "name": "TaxRate",
  "comment": "Sales tax rate",
  "type": "Range",
  "value": "Sheet1!$B$1"
}
```

</details>

<details>
<summary>getNamedItem</summary>

Retrieves a workbook-scoped named item.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookNamedItemId` | <code>string</code> | Yes | Name of the named item |
| `headers` | <code>GetNamedItemHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |
| `dollarExpand` | <code>string[]</code> | No | Expand related entities |
| `dollarSelect` | <code>string[]</code> | No | Select properties to be returned |

**Returns:** `NamedItem&#124;error`

**Sample code:**

```ballerina
excel:NamedItem result = check excelClient->getNamedItem(driveId, driveItemId, "TaxRate");
```

**Sample response:**

```json
{
  "visible": true,
  "scope": "Workbook",
  "name": "TaxRate",
  "comment": "Sales tax rate",
  "type": "Range",
  "value": "Sheet1!$B$1"
}
```

</details>

<details>
<summary>deleteNamedItem</summary>

Deletes a workbook-scoped named item.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookNamedItemId` | <code>string</code> | Yes | Name of the named item |
| `headers` | <code>DeleteNamedItemHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `error?`

**Sample code:**

```ballerina
check excelClient->deleteNamedItem(driveId, driveItemId, "TaxRate");
```

</details>

<details>
<summary>updateNamedItem</summary>

Updates a workbook-scoped named item.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookNamedItemId` | <code>string</code> | Yes | Name of the named item |
| `payload` | <code>NamedItem</code> | Yes | Named item properties to update |
| `headers` | <code>UpdateNamedItemHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `NamedItem&#124;error`

**Sample code:**

```ballerina
excel:NamedItem result = check excelClient->updateNamedItem(driveId, driveItemId,
    "TaxRate", {comment: "Updated sales tax rate", visible: true});
```

**Sample response:**

```json
{
  "visible": true,
  "scope": "Workbook",
  "name": "TaxRate",
  "comment": "Sales tax rate",
  "type": "Range",
  "value": "Sheet1!$B$1"
}
```

</details>

<details>
<summary>getNamedItemRange</summary>

Retrieves the range that a workbook-scoped named item refers to.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookNamedItemId` | <code>string</code> | Yes | Name of the named item |
| `headers` | <code>GetNamedItemRangeHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `RangeResponse&#124;error`

**Sample code:**

```ballerina
excel:RangeResponse result = check excelClient->getNamedItemRange(driveId, driveItemId, "TaxRate");
```

**Sample response:**

```json
{
  "columnHidden": false,
  "address": "Sheet1!A1:C2",
  "hidden": false,
  "formulas": [
    ["Date", "Category", "Amount"],
    ["2026-11-02", "Travel", 120.5]
  ],
  "values": [
    ["Date", "Category", "Amount"],
    ["2026-11-02", "Travel", 120.5]
  ],
  "columnCount": 3,
  "rowHidden": false,
  "cellCount": 6,
  "numberFormat": [
    ["General", "General", "General"],
    ["yyyy-mm-dd", "General", "0.00"]
  ],
  "columnIndex": 0,
  "rowIndex": 0,
  "valueTypes": [
    ["String", "String", "String"],
    ["String", "String", "Double"]
  ],
  "rowCount": 2
}
```

</details>

<details>
<summary>getNamedItemWorksheet</summary>

Retrieves the worksheet that a workbook-scoped named item refers to.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookNamedItemId` | <code>string</code> | Yes | Name of the named item |
| `headers` | <code>GetNamedItemWorksheetHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |
| `dollarExpand` | <code>string[]</code> | No | Expand related entities |
| `dollarSelect` | <code>string[]</code> | No | Select properties to be returned |

**Returns:** `Worksheet&#124;error`

**Sample code:**

```ballerina
excel:Worksheet result = check excelClient->getNamedItemWorksheet(driveId, driveItemId, "TaxRate");
```

**Sample response:**

```json
{
  "id": "{00000000-0001-0000-0000-000000000000}",
  "visibility": "Visible",
  "name": "Sheet1",
  "position": 0
}
```

</details>

<details>
<summary>countNamedItems</summary>

Returns the number of workbook-scoped named items in a workbook.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `headers` | <code>CountNamedItemsHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |
| `dollarFilter` | <code>string</code> | No | Filter items by property values |
| `dollarSearch` | <code>string</code> | No | Search items by search phrases |

**Returns:** `string&#124;error`

**Sample code:**

```ballerina
string result = check excelClient->countNamedItems(driveId, driveItemId);
```

**Sample response:**

```json
"3"
```

</details>

<details>
<summary>addNamedItem</summary>

Adds a workbook-scoped named item that refers to a range or a value.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `payload` | <code>AddNamedItemRequest</code> | Yes | Name, reference and optional comment of the named item |
| `headers` | <code>AddNamedItemHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `NamedItemResponse&#124;error`

**Sample code:**

```ballerina
excel:NamedItemResponse result = check excelClient->addNamedItem(driveId, driveItemId,
    {name: "TaxRate", reference: "=Sheet1!$B$1", comment: "Sales tax rate"});
```

**Sample response:**

```json
{
  "visible": true,
  "scope": "Workbook",
  "name": "TaxRate",
  "comment": "Sales tax rate",
  "type": "Range",
  "value": "Sheet1!$B$1"
}
```

</details>

<details>
<summary>addNamedItemFormulaLocal</summary>

Adds a workbook-scoped named item from a formula in the user's locale.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `payload` | <code>AddNamedItemFormulaLocalRequest</code> | Yes | Name, locale formula and optional comment of the named item |
| `headers` | <code>AddNamedItemFormulaLocalHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `NamedItemResponse&#124;error`

**Sample code:**

```ballerina
excel:NamedItemResponse result = check excelClient->addNamedItemFormulaLocal(driveId, driveItemId,
    {name: "TaxRate", formula: "=0.08", comment: "Sales tax rate"});
```

**Sample response:**

```json
{
  "visible": true,
  "scope": "Workbook",
  "name": "TaxRate",
  "comment": "Sales tax rate",
  "type": "Range",
  "value": "Sheet1!$B$1"
}
```

</details>

<details>
<summary>listWorksheetNamedItems</summary>

Lists the worksheet-scoped named items on a worksheet.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `headers` | <code>ListWorksheetNamedItemsHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |
| `dollarSkip` | <code>int</code> | No | Skip the first n items |
| `dollarTop` | <code>int</code> | No | Show only the first n items |
| `dollarFilter` | <code>string</code> | No | Filter items by property values |
| `dollarSearch` | <code>string</code> | No | Search items by search phrases |
| `dollarOrderby` | <code>string[]</code> | No | Order items by property values |
| `dollarExpand` | <code>string[]</code> | No | Expand related entities |
| `dollarCount` | <code>boolean</code> | No | Include count of items |
| `dollarSelect` | <code>string[]</code> | No | Select properties to be returned |

**Returns:** `NamedItemCollectionResponse&#124;error`

**Sample code:**

```ballerina
excel:NamedItemCollectionResponse result = check excelClient->listWorksheetNamedItems(driveId, driveItemId,
    "Sheet1");
```

**Sample response:**

```json
{
  "value": [
    {
      "visible": true,
      "scope": "Workbook",
      "name": "TaxRate",
      "comment": "Sales tax rate",
      "type": "Range",
      "value": "Sheet1!$B$1"
    }
  ]
}
```

</details>

<details>
<summary>createWorksheetNamedItem</summary>

Creates a worksheet-scoped named item.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `payload` | <code>NamedItem</code> | Yes | Worksheet named item to create |
| `headers` | <code>CreateWorksheetNamedItemHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `NamedItem&#124;error`

**Sample code:**

```ballerina
excel:NamedItem result = check excelClient->createWorksheetNamedItem(driveId, driveItemId,
    "Sheet1", {comment: "Updated sales tax rate", visible: true});
```

**Sample response:**

```json
{
  "visible": true,
  "scope": "Workbook",
  "name": "TaxRate",
  "comment": "Sales tax rate",
  "type": "Range",
  "value": "Sheet1!$B$1"
}
```

</details>

<details>
<summary>getWorksheetNamedItem</summary>

Retrieves a worksheet-scoped named item.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookNamedItemId` | <code>string</code> | Yes | Name of the named item |
| `headers` | <code>GetWorksheetNamedItemHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |
| `dollarExpand` | <code>string[]</code> | No | Expand related entities |
| `dollarSelect` | <code>string[]</code> | No | Select properties to be returned |

**Returns:** `NamedItem&#124;error`

**Sample code:**

```ballerina
excel:NamedItem result = check excelClient->getWorksheetNamedItem(driveId, driveItemId,
    "Sheet1", "TaxRate");
```

**Sample response:**

```json
{
  "visible": true,
  "scope": "Workbook",
  "name": "TaxRate",
  "comment": "Sales tax rate",
  "type": "Range",
  "value": "Sheet1!$B$1"
}
```

</details>

<details>
<summary>deleteWorksheetNamedItem</summary>

Deletes a worksheet-scoped named item.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookNamedItemId` | <code>string</code> | Yes | Name of the named item |
| `headers` | <code>DeleteWorksheetNamedItemHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `error?`

**Sample code:**

```ballerina
check excelClient->deleteWorksheetNamedItem(driveId, driveItemId, "Sheet1", "TaxRate");
```

</details>

<details>
<summary>updateWorksheetNamedItem</summary>

Updates a worksheet-scoped named item.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookNamedItemId` | <code>string</code> | Yes | Name of the named item |
| `payload` | <code>NamedItem</code> | Yes | Worksheet named item properties to update |
| `headers` | <code>UpdateWorksheetNamedItemHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `NamedItem&#124;error`

**Sample code:**

```ballerina
excel:NamedItem result = check excelClient->updateWorksheetNamedItem(driveId, driveItemId,
    "Sheet1", "TaxRate", {comment: "Updated sales tax rate", visible: true});
```

**Sample response:**

```json
{
  "visible": true,
  "scope": "Workbook",
  "name": "TaxRate",
  "comment": "Sales tax rate",
  "type": "Range",
  "value": "Sheet1!$B$1"
}
```

</details>

<details>
<summary>getWorksheetNamedItemRange</summary>

Retrieves the range that a worksheet-scoped named item refers to.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookNamedItemId` | <code>string</code> | Yes | Name of the named item |
| `headers` | <code>GetWorksheetNamedItemRangeHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `RangeResponse&#124;error`

**Sample code:**

```ballerina
excel:RangeResponse result = check excelClient->getWorksheetNamedItemRange(driveId, driveItemId,
    "Sheet1", "TaxRate");
```

**Sample response:**

```json
{
  "columnHidden": false,
  "address": "Sheet1!A1:C2",
  "hidden": false,
  "formulas": [
    ["Date", "Category", "Amount"],
    ["2026-11-02", "Travel", 120.5]
  ],
  "values": [
    ["Date", "Category", "Amount"],
    ["2026-11-02", "Travel", 120.5]
  ],
  "columnCount": 3,
  "rowHidden": false,
  "cellCount": 6,
  "numberFormat": [
    ["General", "General", "General"],
    ["yyyy-mm-dd", "General", "0.00"]
  ],
  "columnIndex": 0,
  "rowIndex": 0,
  "valueTypes": [
    ["String", "String", "String"],
    ["String", "String", "Double"]
  ],
  "rowCount": 2
}
```

</details>

<details>
<summary>getWorksheetNamedItemWorksheet</summary>

Retrieves the worksheet that a worksheet-scoped named item belongs to.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `workbookNamedItemId` | <code>string</code> | Yes | Name of the named item |
| `headers` | <code>GetWorksheetNamedItemWorksheetHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |
| `dollarExpand` | <code>string[]</code> | No | Expand related entities |
| `dollarSelect` | <code>string[]</code> | No | Select properties to be returned |

**Returns:** `Worksheet&#124;error`

**Sample code:**

```ballerina
excel:Worksheet result = check excelClient->getWorksheetNamedItemWorksheet(driveId, driveItemId,
    "Sheet1", "TaxRate");
```

**Sample response:**

```json
{
  "id": "{00000000-0001-0000-0000-000000000000}",
  "visibility": "Visible",
  "name": "Sheet1",
  "position": 0
}
```

</details>

<details>
<summary>countWorksheetNamedItems</summary>

Returns the number of worksheet-scoped named items on a worksheet.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `headers` | <code>CountWorksheetNamedItemsHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |
| `dollarFilter` | <code>string</code> | No | Filter items by property values |
| `dollarSearch` | <code>string</code> | No | Search items by search phrases |

**Returns:** `string&#124;error`

**Sample code:**

```ballerina
string result = check excelClient->countWorksheetNamedItems(driveId, driveItemId, "Sheet1");
```

**Sample response:**

```json
"3"
```

</details>

<details>
<summary>addWorksheetNamedItem</summary>

Adds a worksheet-scoped named item that refers to a range or a value.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `payload` | <code>AddNamedItemRequest</code> | Yes | Name, reference and optional comment of the named item |
| `headers` | <code>AddWorksheetNamedItemHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `NamedItemResponse&#124;error`

**Sample code:**

```ballerina
excel:NamedItemResponse result = check excelClient->addWorksheetNamedItem(driveId, driveItemId,
    "Sheet1", {name: "TaxRate", reference: "=Sheet1!$B$1", comment: "Sales tax rate"});
```

**Sample response:**

```json
{
  "visible": true,
  "scope": "Workbook",
  "name": "TaxRate",
  "comment": "Sales tax rate",
  "type": "Range",
  "value": "Sheet1!$B$1"
}
```

</details>

<details>
<summary>addWorksheetNamedItemFormulaLocal</summary>

Adds a worksheet-scoped named item from a formula in the user's locale.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookWorksheetId` | <code>string</code> | Yes | ID or name of the worksheet |
| `payload` | <code>AddNamedItemFormulaLocalRequest</code> | Yes | Name, locale formula and optional comment of the named item |
| `headers` | <code>AddWorksheetNamedItemFormulaLocalHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `NamedItemResponse&#124;error`

**Sample code:**

```ballerina
excel:NamedItemResponse result = check excelClient->addWorksheetNamedItemFormulaLocal(driveId, driveItemId,
    "Sheet1", {name: "TaxRate", formula: "=0.08", comment: "Sales tax rate"});
```

**Sample response:**

```json
{
  "visible": true,
  "scope": "Workbook",
  "name": "TaxRate",
  "comment": "Sales tax rate",
  "type": "Range",
  "value": "Sheet1!$B$1"
}
```

</details>

#### Comments

<details>
<summary>listComments</summary>

Lists the comments in a workbook.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `headers` | <code>ListCommentsHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |
| `dollarSkip` | <code>int</code> | No | Skip the first n items |
| `dollarTop` | <code>int</code> | No | Show only the first n items |
| `dollarFilter` | <code>string</code> | No | Filter items by property values |
| `dollarSearch` | <code>string</code> | No | Search items by search phrases |
| `dollarOrderby` | <code>string[]</code> | No | Order items by property values |
| `dollarExpand` | <code>string[]</code> | No | Expand related entities |
| `dollarCount` | <code>boolean</code> | No | Include count of items |
| `dollarSelect` | <code>string[]</code> | No | Select properties to be returned |

**Returns:** `CommentCollectionResponse&#124;error`

**Sample code:**

```ballerina
excel:CommentCollectionResponse result = check excelClient->listComments(driveId, driveItemId);
```

**Sample response:**

```json
{
  "value": [
    {
      "id": "{7A3E59B5-1C4D-4E2F-9B8A-5C6D7E8F9A0B}",
      "contentType": "plain",
      "content": "Please review these figures"
    }
  ]
}
```

</details>

<details>
<summary>createComment</summary>

Creates a comment in a workbook.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `payload` | <code>Comment</code> | Yes | Workbook comment to create |
| `headers` | <code>CreateCommentHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `Comment&#124;error`

**Sample code:**

```ballerina
excel:Comment result = check excelClient->createComment(driveId, driveItemId,
    {content: "Please review these figures", contentType: "plain"});
```

**Sample response:**

```json
{
  "id": "{7A3E59B5-1C4D-4E2F-9B8A-5C6D7E8F9A0B}",
  "contentType": "plain",
  "content": "Please review these figures"
}
```

</details>

<details>
<summary>getComment</summary>

Retrieves a comment from a workbook.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookCommentId` | <code>string</code> | Yes | ID of the comment |
| `headers` | <code>GetCommentHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |
| `dollarExpand` | <code>string[]</code> | No | Expand related entities |
| `dollarSelect` | <code>string[]</code> | No | Select properties to be returned |

**Returns:** `Comment&#124;error`

**Sample code:**

```ballerina
excel:Comment result = check excelClient->getComment(driveId, driveItemId,
    "{7A3E59B5-1C4D-4E2F-9B8A-5C6D7E8F9A0B}");
```

**Sample response:**

```json
{
  "id": "{7A3E59B5-1C4D-4E2F-9B8A-5C6D7E8F9A0B}",
  "contentType": "plain",
  "content": "Please review these figures"
}
```

</details>

<details>
<summary>deleteComment</summary>

Deletes a comment from a workbook.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookCommentId` | <code>string</code> | Yes | ID of the comment |
| `headers` | <code>DeleteCommentHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `error?`

**Sample code:**

```ballerina
check excelClient->deleteComment(driveId, driveItemId, "{7A3E59B5-1C4D-4E2F-9B8A-5C6D7E8F9A0B}");
```

</details>

<details>
<summary>updateComment</summary>

Updates a comment in a workbook.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookCommentId` | <code>string</code> | Yes | ID of the comment |
| `payload` | <code>Comment</code> | Yes | Workbook comment properties to update |
| `headers` | <code>UpdateCommentHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `Comment&#124;error`

**Sample code:**

```ballerina
excel:Comment result = check excelClient->updateComment(driveId, driveItemId,
    "{7A3E59B5-1C4D-4E2F-9B8A-5C6D7E8F9A0B}", {content: "Please review these figures", contentType: "plain"});
```

**Sample response:**

```json
{
  "id": "{7A3E59B5-1C4D-4E2F-9B8A-5C6D7E8F9A0B}",
  "contentType": "plain",
  "content": "Please review these figures"
}
```

</details>

<details>
<summary>listReplies</summary>

Lists the replies to a workbook comment.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookCommentId` | <code>string</code> | Yes | ID of the comment |
| `headers` | <code>ListRepliesHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |
| `dollarSkip` | <code>int</code> | No | Skip the first n items |
| `dollarTop` | <code>int</code> | No | Show only the first n items |
| `dollarFilter` | <code>string</code> | No | Filter items by property values |
| `dollarSearch` | <code>string</code> | No | Search items by search phrases |
| `dollarOrderby` | <code>string[]</code> | No | Order items by property values |
| `dollarExpand` | <code>string[]</code> | No | Expand related entities |
| `dollarCount` | <code>boolean</code> | No | Include count of items |
| `dollarSelect` | <code>string[]</code> | No | Select properties to be returned |

**Returns:** `CommentReplyCollectionResponse&#124;error`

**Sample code:**

```ballerina
excel:CommentReplyCollectionResponse result = check excelClient->listReplies(driveId, driveItemId,
    "{7A3E59B5-1C4D-4E2F-9B8A-5C6D7E8F9A0B}");
```

**Sample response:**

```json
{
  "value": [
    {
      "id": "{2B4C6D8E-0F1A-4B3C-8D5E-6F7A8B9C0D1E}",
      "contentType": "plain",
      "content": "Reviewed and approved"
    }
  ]
}
```

</details>

<details>
<summary>createReply</summary>

Adds a reply to a workbook comment.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookCommentId` | <code>string</code> | Yes | ID of the comment |
| `payload` | <code>CommentReply</code> | Yes | Comment reply to create |
| `headers` | <code>CreateReplyHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `CommentReply&#124;error`

**Sample code:**

```ballerina
excel:CommentReply result = check excelClient->createReply(driveId, driveItemId,
    "{7A3E59B5-1C4D-4E2F-9B8A-5C6D7E8F9A0B}", {content: "Reviewed and approved", contentType: "plain"});
```

**Sample response:**

```json
{
  "id": "{2B4C6D8E-0F1A-4B3C-8D5E-6F7A8B9C0D1E}",
  "contentType": "plain",
  "content": "Reviewed and approved"
}
```

</details>

<details>
<summary>getReply</summary>

Retrieves a reply to a workbook comment.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookCommentId` | <code>string</code> | Yes | ID of the comment |
| `workbookCommentReplyId` | <code>string</code> | Yes | ID of the comment reply |
| `headers` | <code>GetReplyHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |
| `dollarExpand` | <code>string[]</code> | No | Expand related entities |
| `dollarSelect` | <code>string[]</code> | No | Select properties to be returned |

**Returns:** `CommentReply&#124;error`

**Sample code:**

```ballerina
excel:CommentReply result = check excelClient->getReply(driveId, driveItemId,
    "{7A3E59B5-1C4D-4E2F-9B8A-5C6D7E8F9A0B}", "{2B4C6D8E-0F1A-4B3C-8D5E-6F7A8B9C0D1E}");
```

**Sample response:**

```json
{
  "id": "{2B4C6D8E-0F1A-4B3C-8D5E-6F7A8B9C0D1E}",
  "contentType": "plain",
  "content": "Reviewed and approved"
}
```

</details>

<details>
<summary>deleteReply</summary>

Deletes a reply from a workbook comment.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookCommentId` | <code>string</code> | Yes | ID of the comment |
| `workbookCommentReplyId` | <code>string</code> | Yes | ID of the comment reply |
| `headers` | <code>DeleteReplyHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `error?`

**Sample code:**

```ballerina
check excelClient->deleteReply(driveId, driveItemId,
    "{7A3E59B5-1C4D-4E2F-9B8A-5C6D7E8F9A0B}", "{2B4C6D8E-0F1A-4B3C-8D5E-6F7A8B9C0D1E}");
```

</details>

<details>
<summary>updateReply</summary>

Updates a reply to a workbook comment.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookCommentId` | <code>string</code> | Yes | ID of the comment |
| `workbookCommentReplyId` | <code>string</code> | Yes | ID of the comment reply |
| `payload` | <code>CommentReply</code> | Yes | Comment reply properties to update |
| `headers` | <code>UpdateReplyHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `CommentReply&#124;error`

**Sample code:**

```ballerina
excel:CommentReply result = check excelClient->updateReply(driveId, driveItemId,
    "{7A3E59B5-1C4D-4E2F-9B8A-5C6D7E8F9A0B}", "{2B4C6D8E-0F1A-4B3C-8D5E-6F7A8B9C0D1E}", {content: "Reviewed and approved", contentType: "plain"});
```

**Sample response:**

```json
{
  "id": "{2B4C6D8E-0F1A-4B3C-8D5E-6F7A8B9C0D1E}",
  "contentType": "plain",
  "content": "Reviewed and approved"
}
```

</details>

<details>
<summary>countReplies</summary>

Returns the number of replies to a workbook comment.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookCommentId` | <code>string</code> | Yes | ID of the comment |
| `headers` | <code>CountRepliesHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |
| `dollarFilter` | <code>string</code> | No | Filter items by property values |
| `dollarSearch` | <code>string</code> | No | Search items by search phrases |

**Returns:** `string&#124;error`

**Sample code:**

```ballerina
string result = check excelClient->countReplies(driveId, driveItemId,
    "{7A3E59B5-1C4D-4E2F-9B8A-5C6D7E8F9A0B}");
```

**Sample response:**

```json
"3"
```

</details>

<details>
<summary>countComments</summary>

Returns the number of comments in a workbook.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `headers` | <code>CountCommentsHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |
| `dollarFilter` | <code>string</code> | No | Filter items by property values |
| `dollarSearch` | <code>string</code> | No | Search items by search phrases |

**Returns:** `string&#124;error`

**Sample code:**

```ballerina
string result = check excelClient->countComments(driveId, driveItemId);
```

**Sample response:**

```json
"3"
```

</details>

#### Sessions and asynchronous results

<details>
<summary>closeSession</summary>

Closes a workbook session. Pass the session ID in the `workbookSessionId` header.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `headers` | <code>CloseSessionHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `error?`

**Sample code:**

```ballerina
check excelClient->closeSession(driveId, driveItemId);
```

</details>

<details>
<summary>createSession</summary>

Creates a workbook session. Pass the returned session ID as `workbookSessionId` in the headers of later calls to run them in the same session.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `payload` | <code>CreateSessionRequest</code> | Yes | Whether the session persists its changes to the file |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Request headers |

**Returns:** `SessionInfoResponse&#124;error`

**Sample code:**

```ballerina
excel:SessionInfoResponse result = check excelClient->createSession(driveId, driveItemId,
    {persistChanges: true});
```

**Sample response:**

```json
{
  "persistChanges": true,
  "id": "cluster=US5&session=25.SN2PEPF00002F6B.A116.1.V24"
}
```

</details>

<details>
<summary>refreshSession</summary>

Refreshes a workbook session so that it doesn't expire. Pass the session ID in the `workbookSessionId` header.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `headers` | <code>RefreshSessionHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `error?`

**Sample code:**

```ballerina
check excelClient->refreshSession(driveId, driveItemId);
```

</details>

<details>
<summary>getSessionInfo</summary>

Retrieves the status of a workbook session that was created asynchronously.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `'key` | <code>string</code> | Yes | Session ID returned when the session was created |
| `headers` | <code>GetSessionInfoHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `SessionInfoResponse&#124;error`

**Sample code:**

```ballerina
excel:SessionInfoResponse result = check excelClient->getSessionInfo(driveId, driveItemId,
    "cluster=US5&session=25.SN2PEPF00002F6B.A116.1.V24");
```

**Sample response:**

```json
{
  "persistChanges": true,
  "id": "cluster=US5&session=25.SN2PEPF00002F6B.A116.1.V24"
}
```

</details>

<details>
<summary>getTableRowOperationResult</summary>

Retrieves the result of a table row operation that was started asynchronously.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `'key` | <code>string</code> | Yes | Key of the table row operation, from the `Location` header of the asynchronous response |
| `headers` | <code>GetTableRowOperationResultHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `TableRowOperationResponse&#124;error`

**Sample code:**

```ballerina
excel:TableRowOperationResponse result = check excelClient->getTableRowOperationResult(driveId, driveItemId,
    "cluster=US5&session=25.SN2PEPF00002F6B.A116.1.V24");
```

**Sample response:**

```json
{
  "values": [
    ["2026-11-02", "Travel", 120.5]
  ],
  "index": 0
}
```

</details>

#### Workbook operations

<details>
<summary>listOperations</summary>

Lists the long-running operations of a workbook.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `headers` | <code>ListOperationsHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |
| `dollarSkip` | <code>int</code> | No | Skip the first n items |
| `dollarTop` | <code>int</code> | No | Show only the first n items |
| `dollarFilter` | <code>string</code> | No | Filter items by property values |
| `dollarSearch` | <code>string</code> | No | Search items by search phrases |
| `dollarOrderby` | <code>string[]</code> | No | Order items by property values |
| `dollarExpand` | <code>string[]</code> | No | Expand related entities |
| `dollarCount` | <code>boolean</code> | No | Include count of items |
| `dollarSelect` | <code>string[]</code> | No | Select properties to be returned |

**Returns:** `OperationCollectionResponse&#124;error`

**Sample code:**

```ballerina
excel:OperationCollectionResponse result = check excelClient->listOperations(driveId, driveItemId);
```

**Sample response:**

```json
{
  "value": [
    {
      "id": "6c2b8a3e-1f0d-4e9a-b7c5-2d4f6a8b0c1e",
      "resourceLocation": "https://graph.microsoft.com/v1.0/drives/b!aBc123/items/01ABCDEF/workbook/tables/1",
      "status": "succeeded"
    }
  ]
}
```

</details>

<details>
<summary>createOperation</summary>

Creates a workbook operation entry.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `payload` | <code>Operation</code> | Yes | Workbook operation to create |
| `headers` | <code>CreateOperationHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `Operation&#124;error`

**Sample code:**

```ballerina
excel:Operation result = check excelClient->createOperation(driveId, driveItemId,
    {status: "succeeded"});
```

**Sample response:**

```json
{
  "id": "6c2b8a3e-1f0d-4e9a-b7c5-2d4f6a8b0c1e",
  "resourceLocation": "https://graph.microsoft.com/v1.0/drives/b!aBc123/items/01ABCDEF/workbook/tables/1",
  "status": "succeeded"
}
```

</details>

<details>
<summary>getOperation</summary>

Retrieves the status of a long-running workbook operation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookOperationId` | <code>string</code> | Yes | ID of the long-running operation |
| `headers` | <code>GetOperationHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |
| `dollarExpand` | <code>string[]</code> | No | Expand related entities |
| `dollarSelect` | <code>string[]</code> | No | Select properties to be returned |

**Returns:** `Operation&#124;error`

**Sample code:**

```ballerina
excel:Operation result = check excelClient->getOperation(driveId, driveItemId,
    "6c2b8a3e-1f0d-4e9a-b7c5-2d4f6a8b0c1e");
```

**Sample response:**

```json
{
  "id": "6c2b8a3e-1f0d-4e9a-b7c5-2d4f6a8b0c1e",
  "resourceLocation": "https://graph.microsoft.com/v1.0/drives/b!aBc123/items/01ABCDEF/workbook/tables/1",
  "status": "succeeded"
}
```

</details>

<details>
<summary>deleteOperation</summary>

Deletes a workbook operation entry.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookOperationId` | <code>string</code> | Yes | ID of the long-running operation |
| `headers` | <code>DeleteOperationHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `error?`

**Sample code:**

```ballerina
check excelClient->deleteOperation(driveId, driveItemId, "6c2b8a3e-1f0d-4e9a-b7c5-2d4f6a8b0c1e");
```

</details>

<details>
<summary>updateOperation</summary>

Updates a workbook operation entry.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `workbookOperationId` | <code>string</code> | Yes | ID of the long-running operation |
| `payload` | <code>Operation</code> | Yes | Workbook operation properties to update |
| `headers` | <code>UpdateOperationHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |

**Returns:** `Operation&#124;error`

**Sample code:**

```ballerina
excel:Operation result = check excelClient->updateOperation(driveId, driveItemId,
    "6c2b8a3e-1f0d-4e9a-b7c5-2d4f6a8b0c1e", {status: "succeeded"});
```

**Sample response:**

```json
{
  "id": "6c2b8a3e-1f0d-4e9a-b7c5-2d4f6a8b0c1e",
  "resourceLocation": "https://graph.microsoft.com/v1.0/drives/b!aBc123/items/01ABCDEF/workbook/tables/1",
  "status": "succeeded"
}
```

</details>

<details>
<summary>countOperations</summary>

Returns the number of long-running operations of a workbook.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | <code>string</code> | Yes | ID of the drive that holds the workbook |
| `driveItemId` | <code>string</code> | Yes | ID of the workbook file (drive item) in the drive |
| `headers` | <code>CountOperationsHeaders</code> | No | Request headers. Set `workbookSessionId` to run the request in a workbook session |
| `dollarFilter` | <code>string</code> | No | Filter items by property values |
| `dollarSearch` | <code>string</code> | No | Search items by search phrases |

**Returns:** `string&#124;error`

**Sample code:**

```ballerina
string result = check excelClient->countOperations(driveId, driveItemId);
```

**Sample response:**

```json
"3"
```

</details>
