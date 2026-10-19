---
title: Actions
---

# Actions

The `ballerinax/microsoft.onedrive` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Microsoft Graph v1.0 API: drive and item CRUD, content management, sharing, search, and actions. |

---

## Client

Microsoft Graph v1.0 API: drive and item CRUD, content management, sharing, search, and actions.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `OAuth2RefreshTokenGrantConfig\|BearerTokenConfig` | Required | OAuth 2.0 refresh token configuration or bearer token. The refresh URL defaults to `https://login.microsoftonline.com/common/oauth2/v2.0/token`. |
| `httpVersion` | `HttpVersion` | `HTTP_2_0` | HTTP protocol version. |
| `timeout` | `decimal` | `60` | Request timeout in seconds. |
| `retryConfig` | `RetryConfig` | `()` | Retry configuration for failed requests. |
| `secureSocket` | `ClientSecureSocket` | `()` | SSL/TLS configuration. |
| `proxy` | `ProxyConfig` | `()` | Proxy server configuration. |

### Initializing the client

```ballerina
import ballerinax/microsoft.onedrive;

configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string refreshToken = ?;

onedrive:Client oneDrive = check new (
    config = {
        auth: {
            clientId: clientId,
            clientSecret: clientSecret,
            refreshToken: refreshToken,
            scopes: ["Files.Read", "Files.Read.All", "Files.ReadWrite", "Files.ReadWrite.All"]
        }
    }
);
```

### Operations

#### Drive management

<details>
<summary>listDrive</summary>

Retrieves the list of drives available to the authenticated user.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `ListDriveQueries` | No | OData query parameters (`$select`, `$filter`, `$top`, `$skip`, `$orderby`, `$expand`, `$count`). |

Returns: `DriveCollectionResponse|error`

Sample code:

```ballerina
onedrive:DriveCollectionResponse drives = check oneDrive->listDrive();
```

Sample response:

```ballerina
{
  "value": [
    {
      "id": "b!xGz3a2VHOkqJRsBv0AAAA",
      "name": "OneDrive",
      "driveType": "personal",
      "owner": {
        "user": {
          "displayName": "John Doe",
          "id": "48d31887-5fad-4d73-a9f5-3c356e68a038"
        }
      },
      "quota": {
        "total": 5368709120,
        "used": 1073741824,
        "remaining": 4294967296
      }
    }
  ]
}
```

</details>

<details>
<summary>getDrive</summary>

Retrieves the properties and relationships of a specific drive by ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | `string` | Yes | The unique identifier of the drive. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `GetDriveQueries` | No | OData query parameters (`$select`, `$expand`). |

Returns: `Drive|error`

Sample code:

```ballerina
onedrive:Drive drive = check oneDrive->getDrive("b!xGz3a2VHOkqJRsBv0AAAA");
```

Sample response:

```ballerina
{
  "id": "b!xGz3a2VHOkqJRsBv0AAAA",
  "name": "OneDrive",
  "driveType": "personal",
  "owner": {
    "user": {
      "displayName": "John Doe"
    }
  }
}
```

</details>

<details>
<summary>createDrive</summary>

Creates a new drive with the specified properties.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `Drive` | Yes | The drive resource to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `Drive|error`

Sample code:

```ballerina
onedrive:Drive newDrive = check oneDrive->createDrive({
    name: "Project Files",
    driveType: "personal"
});
```

Sample response:

```ballerina
{
  "id": "b!yHz4b3WHPkrKSsBw1BBBB",
  "name": "Project Files",
  "driveType": "personal"
}
```

</details>

<details>
<summary>updateDrive</summary>

Updates the properties of a drive.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | `string` | Yes | The unique identifier of the drive. |
| `payload` | `Drive` | Yes | The drive properties to update. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `Drive|error`

Sample code:

```ballerina
onedrive:Drive updated = check oneDrive->updateDrive("b!xGz3a2VHOkqJRsBv0AAAA", {
    name: "Updated Drive Name"
});
```

Sample response:

```ballerina
{
  "id": "b!xGz3a2VHOkqJRsBv0AAAA",
  "name": "Updated Drive Name",
  "driveType": "personal"
}
```

</details>

<details>
<summary>deleteDrive</summary>

Deletes a drive by its ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | `string` | Yes | The unique identifier of the drive. |
| `headers` | `DeleteDriveHeaders` | No | Optional HTTP headers including `If-Match`. |

Returns: `error?`

Sample code:

```ballerina
check oneDrive->deleteDrive("b!xGz3a2VHOkqJRsBv0AAAA");
```

</details>

#### Item CRUD

<details>
<summary>listItem</summary>

Lists the drive items (files and folders) in a drive.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | `string` | Yes | The unique identifier of the drive. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `ListItemQueries` | No | OData query parameters. |

Returns: `DriveItemCollectionResponse|error`

Sample code:

```ballerina
onedrive:DriveItemCollectionResponse items = check oneDrive->listItem(driveId);
```

Sample response:

```ballerina
{
  "value": [
    {
      "id": "01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K",
      "name": "Documents",
      "folder": {"childCount": 5},
      "size": 0
    },
    {
      "id": "01BYE5RZ4YAEGUIA3BZZC3JM5IWSZWDVBP",
      "name": "report.pdf",
      "file": {"mimeType": "application/pdf"},
      "size": 245890
    }
  ]
}
```

</details>

<details>
<summary>getItem</summary>

Retrieves the metadata for a drive item by its ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | `string` | Yes | The unique identifier of the drive. |
| `driveItemId` | `string` | Yes | The unique identifier of the drive item. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `GetItemQueries` | No | OData query parameters. |

Returns: `DriveItem|error`

Sample code:

```ballerina
onedrive:DriveItem item = check oneDrive->getItem(driveId, "01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K");
```

Sample response:

```ballerina
{
  "id": "01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K",
  "name": "Documents",
  "folder": {"childCount": 5},
  "size": 0,
  "createdDateTime": "2024-01-15T10:30:00Z",
  "lastModifiedDateTime": "2024-06-20T14:22:00Z"
}
```

</details>

<details>
<summary>createItem</summary>

Creates a new drive item in the specified drive.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | `string` | Yes | The unique identifier of the drive. |
| `payload` | `DriveItem` | Yes | The drive item resource to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `DriveItem|error`

Sample code:

```ballerina
onedrive:DriveItem newItem = check oneDrive->createItem(driveId, {
    name: "NewFolder",
    folder: {}
});
```

Sample response:

```ballerina
{
  "id": "01BYE5RZ7XHKK5MN2BOVAL2MCSITPQHBWP",
  "name": "NewFolder",
  "folder": {"childCount": 0},
  "size": 0
}
```

</details>

<details>
<summary>updateItem</summary>

Updates the metadata of an existing drive item.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | `string` | Yes | The unique identifier of the drive. |
| `driveItemId` | `string` | Yes | The unique identifier of the drive item. |
| `payload` | `DriveItem` | Yes | The updated drive item properties. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `DriveItem|error`

Sample code:

```ballerina
onedrive:DriveItem updated = check oneDrive->updateItem(driveId, driveItemId, {
    name: "RenamedFolder"
});
```

Sample response:

```ballerina
{
  "id": "01BYE5RZ7XHKK5MN2BOVAL2MCSITPQHBWP",
  "name": "RenamedFolder",
  "folder": {"childCount": 0}
}
```

</details>

<details>
<summary>deleteItem</summary>

Deletes a drive item (file or folder) by its ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | `string` | Yes | The unique identifier of the drive. |
| `driveItemId` | `string` | Yes | The unique identifier of the drive item. |
| `headers` | `DeleteItemHeaders` | No | Optional HTTP headers including `If-Match`. |

Returns: `error?`

Sample code:

```ballerina
check oneDrive->deleteItem(driveId, "01BYE5RZ7XHKK5MN2BOVAL2MCSITPQHBWP");
```

</details>

#### Item content

<details>
<summary>getItemsContent</summary>

Downloads the content (bytes) of a drive item.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | `string` | Yes | The unique identifier of the drive. |
| `driveItemId` | `string` | Yes | The unique identifier of the drive item. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `GetItemsContentQueries` | No | OData query parameters. |

Returns: `byte[]|error`

Sample code:

```ballerina
byte[] content = check oneDrive->getItemsContent(driveId, driveItemId);
```

Sample response:

```ballerina
[80, 75, 3, 4, 20, 0, 6, ...]
```

</details>

<details>
<summary>setItemsContent</summary>

Uploads or replaces the content of a drive item.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | `string` | Yes | The unique identifier of the drive. |
| `driveItemId` | `string` | Yes | The unique identifier of the drive item. |
| `payload` | `byte[]` | Yes | The file content as a byte array. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `DriveItem|error`

Sample code:

```ballerina
byte[] fileContent = check io:fileReadBytes("files/document.pdf");
onedrive:DriveItem item = check oneDrive->setItemsContent(driveId, driveItemId, fileContent);
```

Sample response:

```ballerina
{
  "id": "01BYE5RZ4YAEGUIA3BZZC3JM5IWSZWDVBP",
  "name": "document.pdf",
  "size": 245890,
  "file": {"mimeType": "application/pdf"}
}
```

</details>

<details>
<summary>deleteItemsContent</summary>

Deletes the content stream of a drive item.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | `string` | Yes | The unique identifier of the drive. |
| `driveItemId` | `string` | Yes | The unique identifier of the drive item. |
| `headers` | `DeleteItemsContentHeaders` | No | Optional HTTP headers. |

Returns: `error?`

Sample code:

```ballerina
check oneDrive->deleteItemsContent(driveId, driveItemId);
```

</details>

#### Children management

<details>
<summary>listChildren</summary>

Lists the child items (files and folders) of a drive item.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | `string` | Yes | The unique identifier of the drive. |
| `driveItemId` | `string` | Yes | The unique identifier of the parent drive item. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `ListChildrenQueries` | No | OData query parameters. |

Returns: `DriveItemCollectionResponse|error`

Sample code:

```ballerina
onedrive:DriveItemCollectionResponse children = check oneDrive->listChildren(driveId, folderId);
```

Sample response:

```ballerina
{
  "value": [
    {"id": "01BYE5RZ111", "name": "photo.jpg", "file": {"mimeType": "image/jpeg"}, "size": 512000},
    {"id": "01BYE5RZ222", "name": "notes.txt", "file": {"mimeType": "text/plain"}, "size": 1024}
  ]
}
```

</details>

<details>
<summary>createChildren</summary>

Creates a new child item (file or folder) under the specified parent item.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | `string` | Yes | The unique identifier of the drive. |
| `driveItemId` | `string` | Yes | The unique identifier of the parent drive item. |
| `payload` | `DriveItem` | Yes | The child drive item to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `DriveItem|error`

Sample code:

```ballerina
onedrive:DriveItem folder = check oneDrive->createChildren(driveId, parentId, {
    name: "Reports",
    folder: {}
});
```

Sample response:

```ballerina
{
  "id": "01BYE5RZ333",
  "name": "Reports",
  "folder": {"childCount": 0}
}
```

</details>

<details>
<summary>createChildrenInRoot</summary>

Creates a new child item under the root folder of the drive.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | `string` | Yes | The unique identifier of the drive. |
| `payload` | `DriveItem` | Yes | The child drive item to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `DriveItem|error`

Sample code:

```ballerina
onedrive:DriveItem folder = check oneDrive->createChildrenInRoot(driveId, {
    name: "Upload",
    folder: {}
});
```

Sample response:

```ballerina
{
  "id": "01BYE5RZ444",
  "name": "Upload",
  "folder": {"childCount": 0}
}
```

</details>

<details>
<summary>setChildrenContentByPath</summary>

Uploads file content to a specific path relative to the drive root.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | `string` | Yes | The unique identifier of the drive. |
| `path` | `string` | Yes | The path relative to the drive root (e.g., `/Upload/document.pdf`). |
| `payload` | `byte[]` | Yes | The file content as a byte array. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `DriveItem|error`

Sample code:

```ballerina
byte[] fileContent = check io:fileReadBytes("files/github.png");
onedrive:DriveItem item = check oneDrive->setChildrenContentByPath(
    driveId, "/Upload/github.png", fileContent
);
```

Sample response:

```ballerina
{
  "id": "01BYE5RZ555",
  "name": "github.png",
  "size": 34567,
  "file": {"mimeType": "image/png"}
}
```

</details>

<details>
<summary>getChildrenContentByPath</summary>

Downloads content of a file at a specific path relative to the drive root.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | `string` | Yes | The unique identifier of the drive. |
| `path` | `string` | Yes | The path relative to the drive root. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `GetChildrenContentByPathQueries` | No | OData query parameters. |

Returns: `byte[]|error`

Sample code:

```ballerina
byte[] content = check oneDrive->getChildrenContentByPath(driveId, "/Documents/report.pdf");
```

Sample response:

```ballerina
[37, 80, 68, 70, 45, 49, 46, ...]
```

</details>

#### Root operations

<details>
<summary>getRoot</summary>

Retrieves the root folder of a drive.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | `string` | Yes | The unique identifier of the drive. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `GetRootQueries` | No | OData query parameters. |

Returns: `DriveItem|error`

Sample code:

```ballerina
onedrive:DriveItem root = check oneDrive->getRoot(driveId);
```

Sample response:

```ballerina
{
  "id": "01BYE5RZROOT",
  "name": "root",
  "folder": {"childCount": 12},
  "root": {},
  "size": 1073741824
}
```

</details>

<details>
<summary>listChildrenInRoot</summary>

Lists children of the root folder of a drive.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | `string` | Yes | The unique identifier of the drive. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `ListChildrenInRootQueries` | No | OData query parameters. |

Returns: `DriveItemCollectionResponse|error`

Sample code:

```ballerina
onedrive:DriveItemCollectionResponse rootItems = check oneDrive->listChildrenInRoot(driveId);
```

Sample response:

```ballerina
{
  "value": [
    {"id": "01BYE5RZ001", "name": "Documents", "folder": {"childCount": 5}},
    {"id": "01BYE5RZ002", "name": "Pictures", "folder": {"childCount": 23}}
  ]
}
```

</details>

<details>
<summary>getItemByPath</summary>

Retrieves a drive item by its path relative to the drive root.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | `string` | Yes | The unique identifier of the drive. |
| `path` | `string` | Yes | The item path relative to the drive root (e.g., `/Documents/report.pdf`). |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `GetItemByPathQueries` | No | OData query parameters. |

Returns: `DriveItem|error`

Sample code:

```ballerina
onedrive:DriveItem item = check oneDrive->getItemByPath(driveId, "/Documents/report.pdf");
```

Sample response:

```ballerina
{
  "id": "01BYE5RZ4YAEGUIA3BZZC3JM5IWSZWDVBP",
  "name": "report.pdf",
  "size": 245890,
  "file": {"mimeType": "application/pdf"},
  "parentReference": {
    "driveId": "b!xGz3a2VHOkqJRsBv0AAAA",
    "path": "/drive/root:/Documents"
  }
}
```

</details>

#### Search & discovery

<details>
<summary>search</summary>

Searches for drive items matching a query string within a specific item's hierarchy.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | `string` | Yes | The unique identifier of the drive. |
| `driveItemId` | `string` | Yes | The drive item ID to search within. |
| `q` | `string?` | No | The search query text. |
| `queries` | `SearchQueries` | No | OData query parameters. |

Returns: `CollectionOfDriveItem|error`

Sample code:

```ballerina
onedrive:CollectionOfDriveItem results = check oneDrive->search(driveId, driveItemId, q = "quarterly report");
```

Sample response:

```ballerina
{
  "value": [
    {"id": "01BYE5RZ777", "name": "Q1 Quarterly Report.docx", "size": 56000},
    {"id": "01BYE5RZ888", "name": "Q2 Quarterly Report.pdf", "size": 78000}
  ]
}
```

</details>

<details>
<summary>recent</summary>

Lists recently accessed drive items for the authenticated user.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | `string` | Yes | The unique identifier of the drive. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `RecentQueries` | No | OData query parameters. |

Returns: `CollectionOfDriveItem_1|error`

Sample code:

```ballerina
onedrive:CollectionOfDriveItem_1 recentItems = check oneDrive->recent(driveId);
```

Sample response:

```ballerina
{
  "value": [
    {"id": "01BYE5RZ999", "name": "presentation.pptx", "size": 1200000, "lastModifiedDateTime": "2024-06-20T14:22:00Z"},
    {"id": "01BYE5RZAAA", "name": "budget.xlsx", "size": 45000, "lastModifiedDateTime": "2024-06-19T09:15:00Z"}
  ]
}
```

</details>

<details>
<summary>sharedWithMe</summary>

Lists drive items that have been shared with the authenticated user.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | `string` | Yes | The unique identifier of the drive. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `SharedWithMeQueries` | No | OData query parameters. |

Returns: `CollectionOfDriveItem_1|error`

Sample code:

```ballerina
onedrive:CollectionOfDriveItem_1 shared = check oneDrive->sharedWithMe(driveId);
```

Sample response:

```ballerina
{
  "value": [
    {
      "id": "01BYE5RZBBB",
      "name": "SharedDoc.docx",
      "size": 32000,
      "shared": {"owner": {"user": {"displayName": "Jane Smith"}}}
    }
  ]
}
```

</details>

#### Sharing & permissions

<details>
<summary>createLink</summary>

Creates a sharing link for a drive item.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | `string` | Yes | The unique identifier of the drive. |
| `driveItemId` | `string` | Yes | The unique identifier of the drive item. |
| `payload` | `DriveItemIdMicrosoftGraphCreateLinkBody` | Yes | Link creation parameters including type, scope, password, and expiration. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `Permission|error`

Sample code:

```ballerina
onedrive:Permission link = check oneDrive->createLink(driveId, driveItemId, {
    'type: "view",
    scope: "anonymous"
});
```

Sample response:

```ballerina
{
  "id": "1234abcd-5678-efgh",
  "roles": ["read"],
  "link": {
    "type": "view",
    "scope": "anonymous",
    "webUrl": "https://1drv.ms/u/s!AmRYJXO2laUGxxxxx"
  }
}
```

</details>

<details>
<summary>invite</summary>

Sends a sharing invitation for a drive item to specified recipients.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | `string` | Yes | The unique identifier of the drive. |
| `driveItemId` | `string` | Yes | The unique identifier of the drive item. |
| `payload` | `DriveItemIdMicrosoftGraphInviteBody` | Yes | Invitation parameters including recipients, roles, and message. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `CollectionOfPermission|error`

Sample code:

```ballerina
onedrive:CollectionOfPermission perms = check oneDrive->invite(driveId, driveItemId, {
    recipients: [{email: "colleague@example.com"}],
    roles: ["write"],
    requireSignIn: true,
    sendInvitation: true,
    message: "Please review this document"
});
```

Sample response:

```ballerina
{
  "value": [
    {
      "id": "perm-5678",
      "roles": ["write"],
      "grantedTo": {
        "user": {"email": "colleague@example.com", "displayName": "Colleague"}
      }
    }
  ]
}
```

</details>

#### Item actions

<details>
<summary>copy</summary>

Creates a copy of a drive item in a new location.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | `string` | Yes | The unique identifier of the drive. |
| `driveItemId` | `string` | Yes | The unique identifier of the drive item to copy. |
| `payload` | `DriveItemIdMicrosoftGraphCopyBody` | Yes | Copy parameters including destination `parentReference` and optional new `name`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `DriveItem|error`

Sample code:

```ballerina
onedrive:DriveItem copied = check oneDrive->copy(driveId, driveItemId, {
    name: "report-copy.pdf",
    parentReference: {driveId: driveId, id: targetFolderId}
});
```

Sample response:

```ballerina
{
  "id": "01BYE5RZCCC",
  "name": "report-copy.pdf",
  "size": 245890,
  "file": {"mimeType": "application/pdf"}
}
```

</details>

<details>
<summary>checkin</summary>

Checks in a checked-out drive item, making it available to others.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | `string` | Yes | The unique identifier of the drive. |
| `driveItemId` | `string` | Yes | The unique identifier of the drive item. |
| `payload` | `DriveItemIdMicrosoftGraphCheckinBody` | Yes | Check-in parameters including optional comment. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `error?`

Sample code:

```ballerina
check oneDrive->checkin(driveId, driveItemId, {
    comment: "Updated Q1 figures"
});
```

</details>

<details>
<summary>checkout</summary>

Checks out a drive item, preventing others from editing it.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | `string` | Yes | The unique identifier of the drive. |
| `driveItemId` | `string` | Yes | The unique identifier of the drive item. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `error?`

Sample code:

```ballerina
check oneDrive->checkout(driveId, driveItemId);
```

</details>

<details>
<summary>createUploadSession</summary>

Creates an upload session for uploading large files in byte ranges.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | `string` | Yes | The unique identifier of the drive. |
| `driveItemId` | `string` | Yes | The unique identifier of the drive item. |
| `payload` | `DriveItemIdMicrosoftGraphCreateUploadSessionBody` | Yes | Upload session creation parameters. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `UploadSession|error`

Sample code:

```ballerina
onedrive:UploadSession session = check oneDrive->createUploadSession(driveId, driveItemId, {});
```

Sample response:

```ballerina
{
  "uploadUrl": "https://sn3302.up.1drv.com/up/fe6987415ace7X4811...",
  "expirationDateTime": "2024-06-25T14:00:00Z",
  "nextExpectedRanges": ["0-"]
}
```

</details>

<details>
<summary>follow</summary>

Follows a drive item to receive notifications about changes.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | `string` | Yes | The unique identifier of the drive. |
| `driveItemId` | `string` | Yes | The unique identifier of the drive item. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `DriveItem|error`

Sample code:

```ballerina
onedrive:DriveItem followed = check oneDrive->follow(driveId, driveItemId);
```

Sample response:

```ballerina
{
  "id": "01BYE5RZ4YAEGUIA3BZZC3JM5IWSZWDVBP",
  "name": "report.pdf",
  "size": 245890
}
```

</details>

<details>
<summary>unfollow</summary>

Unfollows a drive item to stop receiving change notifications.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | `string` | Yes | The unique identifier of the drive. |
| `driveItemId` | `string` | Yes | The unique identifier of the drive item. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `error?`

Sample code:

```ballerina
check oneDrive->unfollow(driveId, driveItemId);
```

</details>

<details>
<summary>permanentDelete</summary>

Permanently deletes a drive item, bypassing the recycle bin.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | `string` | Yes | The unique identifier of the drive. |
| `driveItemId` | `string` | Yes | The unique identifier of the drive item. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `error?`

Sample code:

```ballerina
check oneDrive->permanentDelete(driveId, driveItemId);
```

</details>

<details>
<summary>restore</summary>

Restores a drive item that was previously deleted.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | `string` | Yes | The unique identifier of the drive. |
| `driveItemId` | `string` | Yes | The unique identifier of the drive item. |
| `payload` | `DriveItemIdMicrosoftGraphRestoreBody` | Yes | Restore parameters including optional `parentReference` and `name`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `DriveItem|error`

Sample code:

```ballerina
onedrive:DriveItem restored = check oneDrive->restore(driveId, driveItemId, {});
```

Sample response:

```ballerina
{
  "id": "01BYE5RZ4YAEGUIA3BZZC3JM5IWSZWDVBP",
  "name": "report.pdf",
  "size": 245890
}
```

</details>

<details>
<summary>preview</summary>

Generates a preview URL for a drive item (embeddable viewer).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `driveId` | `string` | Yes | The unique identifier of the drive. |
| `driveItemId` | `string` | Yes | The unique identifier of the drive item. |
| `payload` | `DriveItemIdMicrosoftGraphPreviewBody` | Yes | Preview parameters including optional page number and zoom level. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `ItemPreviewInfo|error`

Sample code:

```ballerina
onedrive:ItemPreviewInfo preview = check oneDrive->preview(driveId, driveItemId, {});
```

Sample response:

```ballerina
{
  "getUrl": "https://onedrive.live.com/embed?cid=ABCDEF&resid=ABCDEF!123&authkey=xxxxx",
  "postParameters": "",
  "postUrl": ""
}
```

</details>
