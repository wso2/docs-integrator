---
title: Actions
---

# Actions

The `ballerinax/smartsheet` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Manages all Smartsheet resources: sheets, rows, columns, folders, workspaces, users, reports, and more. |

---

## Client

Manages all Smartsheet resources: sheets, rows, columns, folders, workspaces, users, reports, and more.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `http:BearerTokenConfig\|OAuth2RefreshTokenGrantConfig` | Required | Bearer token config (`{token: "..."}`) or OAuth 2.0 refresh token config. |
| `httpVersion` | `HttpVersion` | `HTTP_1_1` | HTTP protocol version. |
| `timeout` | `decimal` | `60` | Request timeout in seconds. |
| `retryConfig` | `RetryConfig` | `()` | Retry configuration for failed requests. |
| `secureSocket` | `ClientSecureSocket` | `()` | SSL/TLS configuration. |
| `proxy` | `ProxyConfig` | `()` | Proxy server configuration. |

### Initializing the client

```ballerina
import ballerinax/smartsheet;

configurable string smartsheetToken = ?;

smartsheet:Client smartsheetClient = check new ({
    auth: {
        token: smartsheetToken
    }
});
```

### Operations

#### Sheet management

<details>
<summary>List Sheets</summary>

Retrieves a paginated list of all sheets the user has access to.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `ListSheetsHeaders` | No | Optional headers including `Accept` and `Authorization`. |
| `queries` | `ListSheetsQueries` | No | Query parameters such as `page`, `pageSize`, `includeAll`, and `modifiedSince`. |

Returns: `AlternateEmailListResponse|error`

Sample code:

```ballerina
var response = check smartsheetClient->/sheets();
```

Sample response:

```ballerina
{"pageNumber": 1, "pageSize": 100, "totalPages": 1, "totalCount": 2, "data": [{"id": 4583173393803140, "name": "Project Plan", "accessLevel": "OWNER", "permalink": "https://app.smartsheet.com/sheets/abc123", "createdAt": "2024-01-15T10:30:00Z", "modifiedAt": "2024-06-20T14:22:00Z"}, {"id": 2331373580117892, "name": "Budget Tracker", "accessLevel": "EDITOR", "permalink": "https://app.smartsheet.com/sheets/def456", "createdAt": "2024-03-01T08:00:00Z", "modifiedAt": "2024-06-18T09:15:00Z"}]}
```

</details>

<details>
<summary>Get Sheet</summary>

Retrieves a sheet by its ID, including columns, rows, and optional includes.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sheetId` | `decimal` | Yes | The ID of the sheet to retrieve. |
| `headers` | `GetSheetHeaders` | No | Optional headers. |
| `queries` | `GetSheetQueries` | No | Query parameters such as `include`, `exclude`, `columnIds`, `rowIds`, `level`, `page`, `pageSize`. |

Returns: `FavoriteResponse|error`

Sample code:

```ballerina
var sheet = check smartsheetClient->/sheets/[4583173393803140];
```

Sample response:

```ballerina
{"id": 4583173393803140, "name": "Project Plan", "version": 12, "totalRowCount": 5, "accessLevel": "OWNER", "permalink": "https://app.smartsheet.com/sheets/abc123", "columns": [{"id": 7960873114331012, "title": "Task Name", "type": "TEXT_NUMBER", "index": 0, "primary": true}, {"id": 642523719197572, "title": "Status", "type": "PICKLIST", "index": 1}], "rows": [{"id": 7670198317672324, "rowNumber": 1, "cells": [{"columnId": 7960873114331012, "value": "Kick-off Meeting", "displayValue": "Kick-off Meeting"}, {"columnId": 642523719197572, "value": "Complete", "displayValue": "Complete"}]}]}
```

</details>

<details>
<summary>Update Sheet</summary>

Updates sheet properties such as name and project settings.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sheetId` | `decimal` | Yes | The ID of the sheet to update. |
| `payload` | `UpdateSheet` | Yes | The sheet properties to update. |

Returns: `AttachmentListResponse|error`

Sample code:

```ballerina
var result = check smartsheetClient->/sheets/[4583173393803140].put({
    name: "Renamed Project Plan"
});
```

Sample response:

```ballerina
{"message": "SUCCESS", "resultCode": 0, "result": {"id": 4583173393803140, "name": "Renamed Project Plan", "accessLevel": "OWNER"}}
```

</details>

<details>
<summary>Delete Sheet</summary>

Deletes the specified sheet.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sheetId` | `decimal` | Yes | The ID of the sheet to delete. |

Returns: `SuccessResult|error`

Sample code:

```ballerina
var result = check smartsheetClient->/sheets/[4583173393803140].delete();
```

Sample response:

```ballerina
{"message": "SUCCESS", "resultCode": 0}
```

</details>

<details>
<summary>Copy Sheet</summary>

Copies the specified sheet to a destination folder or workspace.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sheetId` | `decimal` | Yes | The ID of the sheet to copy. |
| `payload` | `ContainerDestinationForCopy` | Yes | Destination details including `destinationType` and `destinationId`. |
| `queries` | `CopySheetQueries` | No | Optional query parameters such as `include` (attachments, cellLinks, data, discussions, forms, ruleRecipients, rules, shares). |

Returns: `CrossSheetReferenceListResponse|error`

Sample code:

```ballerina
var result = check smartsheetClient->/sheets/[4583173393803140]/copy.post({
    destinationType: "folder",
    destinationId: 7960873114331012,
    newName: "Project Plan Copy"
});
```

Sample response:

```ballerina
{"message": "SUCCESS", "resultCode": 0, "result": {"id": 1234567890123456, "name": "Project Plan Copy", "accessLevel": "OWNER", "permalink": "https://app.smartsheet.com/sheets/xyz789"}}
```

</details>

<details>
<summary>Move Sheet</summary>

Moves the specified sheet to a destination folder or workspace.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sheetId` | `decimal` | Yes | The ID of the sheet to move. |
| `payload` | `ContainerDestinationForMove` | Yes | Destination details including `destinationType` and `destinationId`. |

Returns: `CrossSheetReferenceListResponse|error`

Sample code:

```ballerina
var result = check smartsheetClient->/sheets/[4583173393803140]/move.post({
    destinationType: "workspace",
    destinationId: 8520173393803140
});
```

Sample response:

```ballerina
{"message": "SUCCESS", "resultCode": 0, "result": {"id": 4583173393803140, "name": "Project Plan", "accessLevel": "OWNER", "permalink": "https://app.smartsheet.com/sheets/abc123"}}
```

</details>

#### Row operations

<details>
<summary>Get Row</summary>

Retrieves a specific row from a sheet by row ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sheetId` | `decimal` | Yes | The ID of the sheet. |
| `rowId` | `decimal` | Yes | The ID of the row to retrieve. |
| `queries` | `RowGetQueries` | No | Optional query parameters such as `include` and `exclude`. |

Returns: `RowResponse|error`

Sample code:

```ballerina
var row = check smartsheetClient->/sheets/[4583173393803140]/rows/[7670198317672324];
```

Sample response:

```ballerina
{"id": 7670198317672324, "sheetId": 4583173393803140, "rowNumber": 1, "expanded": true, "createdAt": "2024-01-15T10:35:00Z", "modifiedAt": "2024-06-20T14:22:00Z", "cells": [{"columnId": 7960873114331012, "value": "Kick-off Meeting", "displayValue": "Kick-off Meeting"}, {"columnId": 642523719197572, "value": "Complete", "displayValue": "Complete"}]}
```

</details>

<details>
<summary>Add Rows</summary>

Adds one or more rows to a sheet.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sheetId` | `decimal` | Yes | The ID of the sheet. |
| `payload` | `SheetIdRowsBody1` | Yes | Row data including cells with column IDs and values. |
| `queries` | `RowsAddToSheetQueries` | No | Optional query parameters such as `allowPartialSuccess`. |

Returns: `RowMoveResponse|error`

Sample code:

```ballerina
var result = check smartsheetClient->/sheets/[4583173393803140]/rows.post({
    toBottom: true,
    cells: [
        {columnId: 7960873114331012, value: "New Task"},
        {columnId: 642523719197572, value: "Not Started"}
    ]
});
```

Sample response:

```ballerina
{"message": "SUCCESS", "resultCode": 0, "version": 13, "result": [{"id": 2361756178769796, "sheetId": 4583173393803140, "rowNumber": 6, "cells": [{"columnId": 7960873114331012, "value": "New Task", "displayValue": "New Task"}, {"columnId": 642523719197572, "value": "Not Started", "displayValue": "Not Started"}]}]}
```

</details>

<details>
<summary>Update Rows</summary>

Updates one or more rows in a sheet.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sheetId` | `decimal` | Yes | The ID of the sheet. |
| `payload` | `SheetIdRowsBody` | Yes | Row data with row IDs and updated cell values. |
| `queries` | `UpdateRowsQueries` | No | Optional query parameters such as `allowPartialSuccess`. |

Returns: `RowCopyResponse|error`

Sample code:

```ballerina
var result = check smartsheetClient->/sheets/[4583173393803140]/rows.put({
    id: 7670198317672324,
    cells: [
        {columnId: 642523719197572, value: "In Progress"}
    ]
});
```

Sample response:

```ballerina
{"message": "SUCCESS", "resultCode": 0, "version": 14, "result": [{"id": 7670198317672324, "sheetId": 4583173393803140, "rowNumber": 1, "cells": [{"columnId": 7960873114331012, "value": "Kick-off Meeting", "displayValue": "Kick-off Meeting"}, {"columnId": 642523719197572, "value": "In Progress", "displayValue": "In Progress"}]}]}
```

</details>

<details>
<summary>Delete Rows</summary>

Deletes one or more rows from a sheet.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sheetId` | `decimal` | Yes | The ID of the sheet. |
| `queries` | `DeleteRowsQueries` | Yes | Query parameters including `ids` (comma-separated row IDs) and optional `ignoreRowsNotFound`. |

Returns: `RowListResponse|error`

Sample code:

```ballerina
var result = check smartsheetClient->/sheets/[4583173393803140]/rows.delete(ids = "7670198317672324,2361756178769796");
```

Sample response:

```ballerina
{"message": "SUCCESS", "resultCode": 0, "result": [7670198317672324, 2361756178769796]}
```

</details>

<details>
<summary>Copy Rows</summary>

Copies rows from one sheet to another.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sheetId` | `decimal` | Yes | The source sheet ID. |
| `payload` | `CopyOrMoveRowDirective` | Yes | Includes `rowIds` to copy and `to` destination with `sheetId`. |
| `queries` | `CopyRowsQueries` | No | Optional query parameters such as `include` (attachments, discussions). |

Returns: `CopyOrMoveRowResult|error`

Sample code:

```ballerina
var result = check smartsheetClient->/sheets/[4583173393803140]/rows/copy.post({
    rowIds: [7670198317672324],
    to: {sheetId: 2331373580117892}
});
```

Sample response:

```ballerina
{"destinationSheetId": 2331373580117892, "rowMappings": [{"from": 7670198317672324, "to": 5765432109876543}]}
```

</details>

<details>
<summary>Move Rows</summary>

Moves rows from one sheet to another.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sheetId` | `decimal` | Yes | The source sheet ID. |
| `payload` | `CopyOrMoveRowDirective` | Yes | Includes `rowIds` to move and `to` destination with `sheetId`. |
| `queries` | `MoveRowsQueries` | No | Optional query parameters such as `include` (attachments, discussions). |

Returns: `CopyOrMoveRowResult|error`

Sample code:

```ballerina
var result = check smartsheetClient->/sheets/[4583173393803140]/rows/move.post({
    rowIds: [7670198317672324],
    to: {sheetId: 2331373580117892}
});
```

Sample response:

```ballerina
{"destinationSheetId": 2331373580117892, "rowMappings": [{"from": 7670198317672324, "to": 8901234567890123}]}
```

</details>

#### Column management

<details>
<summary>List Columns</summary>

Retrieves all columns in a sheet.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sheetId` | `decimal` | Yes | The ID of the sheet. |
| `queries` | `ColumnsListOnSheetQueries` | No | Optional query parameters such as `include` and `level`. |

Returns: `ColumnListResponse|error`

Sample code:

```ballerina
var columns = check smartsheetClient->/sheets/[4583173393803140]/columns();
```

Sample response:

```ballerina
{"pageNumber": 1, "pageSize": 100, "totalPages": 1, "totalCount": 3, "data": [{"id": 7960873114331012, "index": 0, "title": "Task Name", "type": "TEXT_NUMBER", "primary": true}, {"id": 642523719197572, "index": 1, "title": "Status", "type": "PICKLIST", "options": ["Not Started", "In Progress", "Complete"]}, {"id": 3456789012345678, "index": 2, "title": "Due Date", "type": "DATE"}]}
```

</details>

<details>
<summary>Add Columns</summary>

Adds one or more columns to a sheet.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sheetId` | `decimal` | Yes | The ID of the sheet. |
| `payload` | `ColumnObjectAttributes` | Yes | Column definition including `title`, `type`, and `index`. |

Returns: `ColumnCreateResponse|error`

Sample code:

```ballerina
var result = check smartsheetClient->/sheets/[4583173393803140]/columns.post({
    title: "Priority",
    'type: "PICKLIST",
    index: 3,
    options: ["High", "Medium", "Low"]
});
```

Sample response:

```ballerina
{"message": "SUCCESS", "resultCode": 0, "result": [{"id": 9876543210987654, "index": 3, "title": "Priority", "type": "PICKLIST", "options": ["High", "Medium", "Low"]}]}
```

</details>

<details>
<summary>Update Column</summary>

Updates properties of a column.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sheetId` | `decimal` | Yes | The ID of the sheet. |
| `columnId` | `decimal` | Yes | The ID of the column to update. |
| `payload` | `ColumnObjectAttributes` | Yes | Updated column properties. |

Returns: `ColumnUpdateResponse|error`

Sample code:

```ballerina
var result = check smartsheetClient->/sheets/[4583173393803140]/columns/[642523719197572].put({
    title: "Task Status",
    options: ["Not Started", "In Progress", "Blocked", "Complete"]
});
```

Sample response:

```ballerina
{"message": "SUCCESS", "resultCode": 0, "result": {"id": 642523719197572, "index": 1, "title": "Task Status", "type": "PICKLIST", "options": ["Not Started", "In Progress", "Blocked", "Complete"]}}
```

</details>

<details>
<summary>Delete Column</summary>

Deletes a column from a sheet.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sheetId` | `decimal` | Yes | The ID of the sheet. |
| `columnId` | `decimal` | Yes | The ID of the column to delete. |

Returns: `GenericResult|error`

Sample code:

```ballerina
var result = check smartsheetClient->/sheets/[4583173393803140]/columns/[9876543210987654].delete();
```

Sample response:

```ballerina
{"message": "SUCCESS", "resultCode": 0}
```

</details>

#### Folder management

<details>
<summary>Get Folder</summary>

Retrieves a folder by its ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `folderId` | `decimal` | Yes | The ID of the folder. |
| `queries` | `GetFolderQueries` | No | Optional query parameters such as `include`. |

Returns: `Folder|error`

Sample code:

```ballerina
var folder = check smartsheetClient->/folders/[7960873114331012];
```

Sample response:

```ballerina
{"id": 7960873114331012, "name": "Q1 Projects", "permalink": "https://app.smartsheet.com/folders/abc123", "sheets": [{"id": 4583173393803140, "name": "Project Plan"}], "folders": []}
```

</details>

<details>
<summary>Create Folder</summary>

Creates a subfolder within the specified folder.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `folderId` | `decimal` | Yes | The parent folder ID. |
| `payload` | `FolderIdFoldersBody` | Yes | Folder creation payload including `name`. |

Returns: `SharedSecretResponse|error`

Sample code:

```ballerina
var result = check smartsheetClient->/folders/[7960873114331012]/folders.post({
    name: "Sprint 1"
});
```

Sample response:

```ballerina
{"message": "SUCCESS", "resultCode": 0, "result": {"id": 1122334455667788, "name": "Sprint 1"}}
```

</details>

<details>
<summary>Update Folder</summary>

Renames a folder.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `folderId` | `decimal` | Yes | The ID of the folder to update. |
| `payload` | `Folder` | Yes | Folder update payload including `name`. |

Returns: `CrossSheetReferenceResponse|error`

Sample code:

```ballerina
var result = check smartsheetClient->/folders/[7960873114331012].put({
    name: "Q1 Projects (Archived)"
});
```

Sample response:

```ballerina
{"message": "SUCCESS", "resultCode": 0, "result": {"id": 7960873114331012, "name": "Q1 Projects (Archived)"}}
```

</details>

<details>
<summary>Delete Folder</summary>

Deletes the specified folder.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `folderId` | `decimal` | Yes | The ID of the folder to delete. |

Returns: `GenericResult|error`

Sample code:

```ballerina
var result = check smartsheetClient->/folders/[7960873114331012].delete();
```

Sample response:

```ballerina
{"message": "SUCCESS", "resultCode": 0}
```

</details>

#### Workspace management

<details>
<summary>List Workspaces</summary>

Retrieves a list of all workspaces the user has access to.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `ListWorkspacesHeaders` | No | Optional headers. |

Returns: `WorkspaceListResponse|error`

Sample code:

```ballerina
var workspaces = check smartsheetClient->/workspaces();
```

Sample response:

```ballerina
{"pageNumber": 1, "pageSize": 100, "totalPages": 1, "totalCount": 2, "data": [{"id": 8520173393803140, "name": "Engineering", "accessLevel": "OWNER", "permalink": "https://app.smartsheet.com/workspaces/ws123"}, {"id": 6630283504914251, "name": "Marketing", "accessLevel": "ADMIN", "permalink": "https://app.smartsheet.com/workspaces/ws456"}]}
```

</details>

<details>
<summary>Create Workspace</summary>

Creates a new workspace.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `WorkspaceListing` | Yes | Workspace creation payload including `name`. |

Returns: `WorkspaceCreateResponse|error`

Sample code:

```ballerina
var result = check smartsheetClient->/workspaces.post({
    name: "Product Launch 2024"
});
```

Sample response:

```ballerina
{"message": "SUCCESS", "resultCode": 0, "result": {"id": 9988776655443322, "name": "Product Launch 2024", "accessLevel": "OWNER", "permalink": "https://app.smartsheet.com/workspaces/ws789"}}
```

</details>

<details>
<summary>Get Workspace</summary>

Retrieves a workspace by its ID, including its contents.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspaceId` | `decimal` | Yes | The ID of the workspace. |

Returns: `WorkspaceResponse|error`

Sample code:

```ballerina
var workspace = check smartsheetClient->/workspaces/[8520173393803140];
```

Sample response:

```ballerina
{"id": 8520173393803140, "name": "Engineering", "accessLevel": "OWNER", "permalink": "https://app.smartsheet.com/workspaces/ws123", "sheets": [{"id": 4583173393803140, "name": "Project Plan"}], "folders": [{"id": 7960873114331012, "name": "Q1 Projects"}]}
```

</details>

<details>
<summary>Delete Workspace</summary>

Deletes the specified workspace.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspaceId` | `decimal` | Yes | The ID of the workspace to delete. |

Returns: `GenericResult|error`

Sample code:

```ballerina
var result = check smartsheetClient->/workspaces/[8520173393803140].delete();
```

Sample response:

```ballerina
{"message": "SUCCESS", "resultCode": 0}
```

</details>

#### Sharing

<details>
<summary>List Sheet Shares</summary>

Retrieves the list of users and groups a sheet is shared with.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sheetId` | `decimal` | Yes | The ID of the sheet. |
| `queries` | `ListSheetSharesQueries` | No | Optional query parameters such as `include` and `page`. |

Returns: `ShareListResponse|error`

Sample code:

```ballerina
var shares = check smartsheetClient->/sheets/[4583173393803140]/shares();
```

Sample response:

```ballerina
{"pageNumber": 1, "pageSize": 100, "totalPages": 1, "totalCount": 2, "data": [{"id": "AAA111BBB222", "type": "USER", "userId": 1234567890, "email": "alice@example.com", "name": "Alice Smith", "accessLevel": "OWNER"}, {"id": "CCC333DDD444", "type": "USER", "userId": 9876543210, "email": "bob@example.com", "name": "Bob Jones", "accessLevel": "EDITOR"}]}
```

</details>

<details>
<summary>Share Sheet</summary>

Shares a sheet with specified users or groups.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sheetId` | `decimal` | Yes | The ID of the sheet to share. |
| `payload` | `SheetIdSharesBody` | Yes | Share details including `email` and `accessLevel`. |
| `queries` | `ShareSheetQueries` | No | Optional query parameters such as `sendEmail`. |

Returns: `ShareResponse|error`

Sample code:

```ballerina
var result = check smartsheetClient->/sheets/[4583173393803140]/shares.post({
    email: "charlie@example.com",
    accessLevel: "VIEWER"
});
```

Sample response:

```ballerina
{"message": "SUCCESS", "resultCode": 0, "result": [{"id": "EEE555FFF666", "type": "USER", "email": "charlie@example.com", "accessLevel": "VIEWER"}]}
```

</details>

<details>
<summary>Delete Sheet Share</summary>

Removes sharing access for a user or group from a sheet.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sheetId` | `decimal` | Yes | The ID of the sheet. |
| `shareId` | `string` | Yes | The ID of the share to delete. |

Returns: `Result|error`

Sample code:

```ballerina
var result = check smartsheetClient->/sheets/[4583173393803140]/shares/["CCC333DDD444"].delete();
```

Sample response:

```ballerina
{"message": "SUCCESS", "resultCode": 0}
```

</details>

#### Attachments

<details>
<summary>List Attachments</summary>

Retrieves all attachments on a sheet.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sheetId` | `decimal` | Yes | The ID of the sheet. |
| `queries` | `AttachmentsListOnSheetQueries` | No | Optional pagination parameters. |

Returns: `AttachmentVersionListResponse|error`

Sample code:

```ballerina
var attachments = check smartsheetClient->/sheets/[4583173393803140]/attachments();
```

Sample response:

```ballerina
{"pageNumber": 1, "pageSize": 100, "totalPages": 1, "totalCount": 1, "data": [{"id": 5544332211009988, "name": "requirements.pdf", "attachmentType": "FILE", "mimeType": "application/pdf", "sizeInKb": 245, "createdAt": "2024-06-15T09:00:00Z", "createdBy": {"email": "alice@example.com", "name": "Alice Smith"}}]}
```

</details>

<details>
<summary>Get Attachment</summary>

Retrieves an attachment by ID, including a temporary download URL for file attachments.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sheetId` | `decimal` | Yes | The ID of the sheet. |
| `attachmentId` | `decimal` | Yes | The ID of the attachment. |

Returns: `AttachmentResponse|error`

Sample code:

```ballerina
var attachment = check smartsheetClient->/sheets/[4583173393803140]/attachments/[5544332211009988];
```

Sample response:

```ballerina
{"id": 5544332211009988, "name": "requirements.pdf", "attachmentType": "FILE", "mimeType": "application/pdf", "sizeInKb": 245, "createdAt": "2024-06-15T09:00:00Z", "url": "https://smartsheet-temp-url.example.com/download/abc123", "urlExpiresInMillis": 120000}
```

</details>

<details>
<summary>Delete Attachment</summary>

Deletes an attachment from a sheet.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sheetId` | `decimal` | Yes | The ID of the sheet. |
| `attachmentId` | `decimal` | Yes | The ID of the attachment to delete. |

Returns: `GenericResult|error`

Sample code:

```ballerina
var result = check smartsheetClient->/sheets/[4583173393803140]/attachments/[5544332211009988].delete();
```

Sample response:

```ballerina
{"message": "SUCCESS", "resultCode": 0}
```

</details>

#### Discussions & comments

<details>
<summary>List Discussions</summary>

Retrieves all discussions on a sheet.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sheetId` | `decimal` | Yes | The ID of the sheet. |
| `queries` | `DiscussionsListQueries` | No | Optional query parameters such as `include` and pagination. |

Returns: `DiscussionCreateResponse|error`

Sample code:

```ballerina
var discussions = check smartsheetClient->/sheets/[4583173393803140]/discussions();
```

Sample response:

```ballerina
{"pageNumber": 1, "pageSize": 100, "totalPages": 1, "totalCount": 1, "data": [{"id": 3344556677889900, "title": "Budget Review", "comments": [{"id": 1122334455667788, "text": "Please review the budget figures.", "createdBy": {"email": "alice@example.com", "name": "Alice Smith"}, "createdAt": "2024-06-18T10:00:00Z"}], "createdBy": {"email": "alice@example.com", "name": "Alice Smith"}}]}
```

</details>

<details>
<summary>Create Discussion</summary>

Creates a new discussion on a sheet.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sheetId` | `decimal` | Yes | The ID of the sheet. |
| `payload` | `DiscussionCreationRequest` | Yes | Discussion details including `comment` with `text`. |

Returns: `DiscussionAttachmentListResponse|error`

Sample code:

```ballerina
var result = check smartsheetClient->/sheets/[4583173393803140]/discussions.post({
    comment: {text: "Let's discuss the timeline for this project."}
});
```

Sample response:

```ballerina
{"message": "SUCCESS", "resultCode": 0, "result": {"id": 4455667788990011, "title": "Let's discuss the timeline for this project.", "comments": [{"id": 5566778899001122, "text": "Let's discuss the timeline for this project.", "createdAt": "2024-06-20T15:00:00Z"}]}}
```

</details>

<details>
<summary>Get Comment</summary>

Retrieves a specific comment by ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sheetId` | `decimal` | Yes | The ID of the sheet. |
| `commentId` | `decimal` | Yes | The ID of the comment. |

Returns: `CommentResponse|error`

Sample code:

```ballerina
var comment = check smartsheetClient->/sheets/[4583173393803140]/comments/[1122334455667788];
```

Sample response:

```ballerina
{"id": 1122334455667788, "text": "Please review the budget figures.", "createdBy": {"email": "alice@example.com", "name": "Alice Smith"}, "createdAt": "2024-06-18T10:00:00Z", "modifiedAt": "2024-06-18T10:00:00Z"}
```

</details>

#### Reports

<details>
<summary>List Reports</summary>

Retrieves a list of all reports the user has access to.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `GetReportsQueries` | No | Optional query parameters such as `page` and `pageSize`. |

Returns: `TemplateListResponse|error`

Sample code:

```ballerina
var reports = check smartsheetClient->/reports();
```

Sample response:

```ballerina
{"pageNumber": 1, "pageSize": 100, "totalPages": 1, "totalCount": 1, "data": [{"id": 6677889900112233, "name": "Weekly Status Report", "accessLevel": "OWNER", "permalink": "https://app.smartsheet.com/reports/rpt123"}]}
```

</details>

<details>
<summary>Get Report</summary>

Retrieves a report by its ID, including the report data.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `reportId` | `decimal` | Yes | The ID of the report. |
| `queries` | `GetReportQueries` | No | Optional query parameters such as `include`, `page`, `pageSize`, `level`. |

Returns: `Report|error`

Sample code:

```ballerina
var report = check smartsheetClient->/reports/[6677889900112233];
```

Sample response:

```ballerina
{"id": 6677889900112233, "name": "Weekly Status Report", "totalRowCount": 15, "accessLevel": "OWNER", "columns": [{"virtualId": 1, "title": "Task Name", "type": "TEXT_NUMBER"}, {"virtualId": 2, "title": "Status", "type": "PICKLIST"}], "rows": [{"id": 1234, "cells": [{"virtualColumnId": 1, "value": "Review deliverables", "displayValue": "Review deliverables"}, {"virtualColumnId": 2, "value": "In Progress", "displayValue": "In Progress"}]}]}
```

</details>

<details>
<summary>Send Report via Email</summary>

Sends a report as an email to specified recipients.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `reportId` | `decimal` | Yes | The ID of the report. |
| `payload` | `SheetEmail` | Yes | Email details including `sendTo`, `subject`, and `message`. |

Returns: `Result|error`

Sample code:

```ballerina
var result = check smartsheetClient->/reports/[6677889900112233]/emails.post({
    sendTo: [{email: "manager@example.com"}],
    subject: "Weekly Status Report",
    message: "Please find the weekly status report attached.",
    format: "PDF"
});
```

Sample response:

```ballerina
{"message": "SUCCESS", "resultCode": 0}
```

</details>

#### User & group management

<details>
<summary>Get Current User</summary>

Retrieves information about the current authenticated user.

Returns: `UserProfile|error`

Sample code:

```ballerina
var me = check smartsheetClient->/users/me();
```

Sample response:

```ballerina
{"id": 1234567890, "email": "alice@example.com", "firstName": "Alice", "lastName": "Smith", "admin": true, "licensedSheetCreator": true, "account": {"name": "Acme Corp", "id": 9876543210}}
```

</details>

<details>
<summary>List Users</summary>

Retrieves a list of all users in the organization.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `ListUsersQueries` | No | Optional query parameters such as `email`, `include`, `page`, `pageSize`. |

Returns: `UserListResponse|error`

Sample code:

```ballerina
var users = check smartsheetClient->/users();
```

Sample response:

```ballerina
{"pageNumber": 1, "pageSize": 100, "totalPages": 1, "totalCount": 3, "data": [{"id": 1234567890, "email": "alice@example.com", "firstName": "Alice", "lastName": "Smith", "admin": true, "status": "ACTIVE"}, {"id": 9876543210, "email": "bob@example.com", "firstName": "Bob", "lastName": "Jones", "admin": false, "status": "ACTIVE"}]}
```

</details>

<details>
<summary>List Org Groups</summary>

Retrieves a list of all groups in the organization.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `ListGroupsQueries` | No | Optional pagination parameters. |

Returns: `GroupResponse|error`

Sample code:

```ballerina
var groups = check smartsheetClient->/groups();
```

Sample response:

```ballerina
{"pageNumber": 1, "pageSize": 100, "totalPages": 1, "totalCount": 1, "data": [{"id": 5566778899001122, "name": "Engineering Team", "description": "All engineering staff", "owner": "alice@example.com", "ownerName": "Alice Smith", "memberCount": 12}]}
```

</details>

#### Webhooks

<details>
<summary>List Webhooks</summary>

Retrieves a list of all webhooks the user owns.

Returns: `WebhookListResponse|error`

Sample code:

```ballerina
var webhooks = check smartsheetClient->/webhooks();
```

Sample response:

```ballerina
{"pageNumber": 1, "pageSize": 100, "totalPages": 1, "totalCount": 1, "data": [{"id": "aabb1122-ccdd-3344-eeff-556677889900", "name": "Sheet Change Hook", "callbackUrl": "https://example.com/webhook", "scope": "sheet", "scopeObjectId": 4583173393803140, "events": ["*.*"], "version": 1, "status": "ENABLED"}]}
```

</details>

<details>
<summary>Create Webhook</summary>

Creates a new webhook to receive callbacks for events.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `Webhook` | Yes | Webhook definition including `name`, `callbackUrl`, `scope`, `scopeObjectId`, and `events`. |

Returns: `WebhookResponse|error`

Sample code:

```ballerina
var result = check smartsheetClient->/webhooks.post({
    name: "My Sheet Webhook",
    callbackUrl: "https://example.com/webhook",
    scope: "sheet",
    scopeObjectId: 4583173393803140,
    events: ["*.*"],
    version: 1
});
```

Sample response:

```ballerina
{"message": "SUCCESS", "resultCode": 0, "result": {"id": "ccdd3344-eeff-5566-7788-990011223344", "name": "My Sheet Webhook", "callbackUrl": "https://example.com/webhook", "scope": "sheet", "scopeObjectId": 4583173393803140, "events": ["*.*"], "version": 1, "status": "NEW_NOT_VERIFIED"}}
```

</details>

<details>
<summary>Delete Webhook</summary>

Deletes a webhook.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `webhookId` | `string` | Yes | The ID of the webhook to delete. |

Returns: `GenericResult|error`

Sample code:

```ballerina
var result = check smartsheetClient->/webhooks/["aabb1122-ccdd-3344-eeff-556677889900"].delete();
```

Sample response:

```ballerina
{"message": "SUCCESS", "resultCode": 0}
```

</details>

#### Search

<details>
<summary>Search Everything</summary>

Searches across all sheets, reports, sights, and other objects.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `ListSearchQueries` | Yes | Query parameters including `query` (search term) and optional filters like `include`, `scopes`. |

Returns: `UserCreateResponse|error`

Sample code:

```ballerina
var results = check smartsheetClient->/search(query = "Project Plan");
```

Sample response:

```ballerina
{"totalCount": 2, "results": [{"text": "Project Plan", "objectType": "sheet", "objectId": 4583173393803140, "parentObjectType": "workspace", "parentObjectId": 8520173393803140, "parentObjectName": "Engineering", "contextData": ["Project Plan"]}, {"text": "Project Plan Copy", "objectType": "sheet", "objectId": 1234567890123456, "parentObjectType": "folder", "parentObjectId": 7960873114331012}]}
```

</details>

<details>
<summary>Search Sheet</summary>

Searches within a specific sheet.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sheetId` | `decimal` | Yes | The ID of the sheet to search. |
| `queries` | `ListSearchSheetQueries` | Yes | Query parameters including `query` (search term). |

Returns: `AlternateEmailResponse|error`

Sample code:

```ballerina
var results = check smartsheetClient->/search/sheets/[4583173393803140](query = "Kick-off");
```

Sample response:

```ballerina
{"totalCount": 1, "results": [{"text": "Kick-off Meeting", "objectType": "row", "objectId": 7670198317672324, "parentObjectType": "sheet", "parentObjectId": 4583173393803140, "parentObjectName": "Project Plan"}]}
```

</details>

#### Contacts & server info

<details>
<summary>List Contacts</summary>

Retrieves a list of the user's Smartsheet contacts.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `ListContactsQueries` | No | Optional pagination parameters. |

Returns: `ContactListResponse|error`

Sample code:

```ballerina
var contacts = check smartsheetClient->/contacts();
```

Sample response:

```ballerina
{"pageNumber": 1, "pageSize": 100, "totalPages": 1, "totalCount": 2, "data": [{"id": "abc123def456", "name": "Alice Smith", "email": "alice@example.com"}, {"id": "ghi789jkl012", "name": "Bob Jones", "email": "bob@example.com"}]}
```

</details>

<details>
<summary>Get Application Constants</summary>

Retrieves Smartsheet application constants, including supported formats and feature flags.

Returns: `ServerInfo|error`

Sample code:

```ballerina
var serverInfo = check smartsheetClient->/serverinfo();
```

Sample response:

```ballerina
{"formats": {"boldValues": ["none", "on"], "colorValues": ["none", "#000000", "#FFFFFF", "#FF0000", "#00FF00", "#0000FF"], "currencyValues": ["none", "USD", "EUR", "GBP"], "dateTimeFormatValues": ["LOCALE_BASED", "YYYY-MM-DD"], "fontFamilyValues": ["Arial", "Tahoma", "Times New Roman", "Verdana"]}, "featureInfo": {"symbolsVersion": 2}}
```

</details>

#### Sights (dashboards)

<details>
<summary>List Sights</summary>

Retrieves a list of all sights (dashboards) the user has access to.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `ListSightsQueries` | No | Optional pagination parameters. |

Returns: `SightListResponse|error`

Sample code:

```ballerina
var sights = check smartsheetClient->/sights();
```

Sample response:

```ballerina
{"pageNumber": 1, "pageSize": 100, "totalPages": 1, "totalCount": 1, "data": [{"id": 7788990011223344, "name": "Project Dashboard", "accessLevel": "OWNER", "permalink": "https://app.smartsheet.com/dashboards/dash123", "createdAt": "2024-04-01T08:00:00Z", "modifiedAt": "2024-06-20T12:00:00Z"}]}
```

</details>

<details>
<summary>Get Sight</summary>

Retrieves a sight (dashboard) by its ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sightId` | `decimal` | Yes | The ID of the sight. |

Returns: `Sight|error`

Sample code:

```ballerina
var sight = check smartsheetClient->/sights/[7788990011223344];
```

Sample response:

```ballerina
{"id": 7788990011223344, "name": "Project Dashboard", "accessLevel": "OWNER", "permalink": "https://app.smartsheet.com/dashboards/dash123", "widgets": [{"id": 1, "type": "METRIC", "title": "Tasks Complete"}, {"id": 2, "type": "CHART", "title": "Progress Over Time"}]}
```

</details>

<details>
<summary>Delete Sight</summary>

Deletes the specified sight (dashboard).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sightId` | `decimal` | Yes | The ID of the sight to delete. |

Returns: `GenericResult|error`

Sample code:

```ballerina
var result = check smartsheetClient->/sights/[7788990011223344].delete();
```

Sample response:

```ballerina
{"message": "SUCCESS", "resultCode": 0}
```

</details>

#### Templates

<details>
<summary>List Templates</summary>

Retrieves a list of all templates the user has access to.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `ListTemplatesQueries` | No | Optional pagination parameters. |

Returns: `TemplateListResponse|error`

Sample code:

```ballerina
var templates = check smartsheetClient->/templates();
```

Sample response:

```ballerina
{"pageNumber": 1, "pageSize": 100, "totalPages": 1, "totalCount": 1, "data": [{"id": 2233445566778899, "name": "Project Tracker Template", "accessLevel": "VIEWER", "permalink": "https://app.smartsheet.com/templates/tmpl123"}]}
```

</details>

#### Events

<details>
<summary>List Events</summary>

Retrieves events that have occurred in the user's Smartsheet organization.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `ListEventsQueries` | Yes | Query parameters including `since` (ISO 8601 date) or `streamPosition`, and optional `maxCount`. |

Returns: `EventStreamResponse|error`

Sample code:

```ballerina
var events = check smartsheetClient->/events(since = "2024-06-01T00:00:00Z", maxCount = 10);
```

Sample response:

```ballerina
{"nextStreamPosition": "1719273600000.abc123", "moreAvailable": false, "data": [{"eventId": "evt_001", "objectType": "SHEET", "action": "UPDATE", "objectId": 4583173393803140, "userId": 1234567890, "eventTimestamp": "2024-06-20T14:22:00Z", "source": "WEB_APP"}]}
```

</details>
