---
connector: true
connector_name: "xero.files"
toc_max_heading_level: 4
title: "Actions"
---

# Actions

The Xero Files connector exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Store and organise documents in a Xero organisation's file library: upload and download files, manage folders and the inbox, and link files to Xero objects such as invoices and contacts. |

---

## Client

The `Client` connects to the Xero Files API (`https://api.xero.com/files.xro/1.0/`). It exposes 18 operations. Every operation takes the Xero tenant ID of the organisation in its `headers` record.

### Configuration

**ConnectionConfig**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | <code>http:BearerTokenConfig&#124;OAuth2RefreshTokenGrantConfig</code> | Required | Configurations related to client authentication |
| `httpVersion` | <code>http:HttpVersion</code> | <code>http:HTTP_2_0</code> | The HTTP version understood by the client |
| `http1Settings` | <code>http:ClientHttp1Settings</code> | <code>&#123;&#125;</code> | Configurations related to HTTP/1.x protocol |
| `http2Settings` | <code>http:ClientHttp2Settings</code> | <code>&#123;&#125;</code> | Configurations related to HTTP/2 protocol |
| `timeout` | <code>decimal</code> | <code>30</code> | The maximum time to wait (in seconds) for a response before closing the connection |
| `forwarded` | <code>string</code> | <code>"disable"</code> | The choice of setting `forwarded`/`x-forwarded` header |
| `followRedirects` | <code>http:FollowRedirects</code> | Optional | Configurations associated with Redirection |
| `poolConfig` | <code>http:PoolConfiguration</code> | Optional | Configurations associated with request pooling |
| `cache` | <code>http:CacheConfig</code> | <code>&#123;&#125;</code> | HTTP caching related configurations |
| `compression` | <code>http:Compression</code> | <code>http:COMPRESSION_AUTO</code> | Specifies the way of handling compression (`accept-encoding`) header |
| `circuitBreaker` | <code>http:CircuitBreakerConfig</code> | Optional | Configurations associated with the behaviour of the Circuit Breaker |
| `retryConfig` | <code>http:RetryConfig</code> | Optional | Configurations associated with retrying |
| `cookieConfig` | <code>http:CookieConfig</code> | Optional | Configurations associated with cookies |
| `responseLimits` | <code>http:ResponseLimitConfigs</code> | <code>&#123;&#125;</code> | Configurations associated with inbound response size limits |
| `secureSocket` | <code>http:ClientSecureSocket</code> | Optional | SSL/TLS-related options |
| `proxy` | <code>http:ProxyConfig</code> | Optional | Proxy server related options |
| `socketConfig` | <code>http:ClientSocketConfig</code> | <code>&#123;&#125;</code> | Provides settings related to client socket configuration |
| `validation` | <code>boolean</code> | <code>true</code> | Enables the inbound payload validation functionality which provided by the constraint package. Enabled by default |
| `laxDataBinding` | <code>boolean</code> | <code>true</code> | Enables relaxed data binding on the client side. When enabled, `nil` values are treated as optional, and absent fields are handled as `nilable` types. Enabled by default. |

### Initializing the client

```ballerina
import ballerinax/xero.files;

configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string refreshToken = ?;
configurable string tenantId = ?;

final files:Client filesClient = check new ({
    auth: {
        clientId,
        clientSecret,
        refreshToken,
        refreshUrl: "https://identity.xero.com/connect/token"
    }
});
```

### Operations

#### Files

<details>
<summary>listFiles</summary>

<div>

Retrieves files.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>ListFilesHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |
| `pagesize` | <code>int</code> | No | Pass an optional page size value. |
| `page` | <code>int</code> | No | Number of records to skip for pagination. |
| `sort` | <code>"Name"&#124;"Size"&#124;"CreatedDateUTC"</code> | No | Values to sort by. |
| `direction` | <code>"ASC"&#124;"DESC"</code> | No | Sort direction. |

**Returns:** `FileList|error`

**Sample code:**

```ballerina
files:FileList result = check filesClient->listFiles({xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "TotalCount": 1,
  "PerPage": 1,
  "Page": 1,
  "Items": [
    {
      "CreatedDateUtc": "2026-01-15T00:00:00",
      "User": {
        "Id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
      },
      "UpdatedDateUtc": "2026-01-15T00:00:00"
    }
  ]
}
```

</div>
</details>

<details>
<summary>uploadFile</summary>

<div>

Uploads a File to the inbox.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>UploadFileHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>FileUploadRequest</code> | Yes | File content and metadata to upload to the inbox. |

**Returns:** `FileObject|error`

**Sample code:**

```ballerina
files:FileObject result = check filesClient->uploadFile({xeroTenantId: tenantId}, {
    filename: "import.csv",
    name: "Sample name",
    body: {
        fileContent: check io:fileReadBytes("import.csv"),
        fileName: "import.csv"
    },
    mimeType: "string"
});
```

**Sample response:**

```json
{
  "CreatedDateUtc": "2026-01-15T00:00:00",
  "User": {
    "Id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "FirstName": "Sample name",
    "FullName": "Sample name"
  },
  "UpdatedDateUtc": "2026-01-15T00:00:00",
  "Size": 1,
  "Id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "FolderId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>getFile</summary>

<div>

Retrieves a file by a unique file ID.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fileId` | <code>string</code> | Yes | File id for single object. |
| `headers` | <code>GetFileHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |

**Returns:** `FileObject|error`

**Sample code:**

```ballerina
files:FileObject result = check filesClient->getFile("3fa85f64-5717-4562-b3fc-2c963f66afa6", {xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "CreatedDateUtc": "2026-01-15T00:00:00",
  "User": {
    "Id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "FirstName": "Sample name",
    "FullName": "Sample name"
  },
  "UpdatedDateUtc": "2026-01-15T00:00:00",
  "Size": 1,
  "Id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "FolderId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>updateFile</summary>

<div>

Update a file.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fileId` | <code>string</code> | Yes | File id for single object. |
| `headers` | <code>UpdateFileHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>FileObject</code> | Yes | Updated file properties such as name and folder. |

**Returns:** `FileObject|error`

**Sample code:**

```ballerina
files:FileObject result = check filesClient->updateFile("3fa85f64-5717-4562-b3fc-2c963f66afa6", {xeroTenantId: tenantId}, {
    createdDateUtc: "2026-01-15T00:00:00",
    user: {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        firstName: "Sample name",
        fullName: "Sample name"
    },
    updatedDateUtc: "2026-01-15T00:00:00",
    size: 1
});
```

**Sample response:**

```json
{
  "CreatedDateUtc": "2026-01-15T00:00:00",
  "User": {
    "Id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "FirstName": "Sample name",
    "FullName": "Sample name"
  },
  "UpdatedDateUtc": "2026-01-15T00:00:00",
  "Size": 1,
  "Id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "FolderId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>deleteFile</summary>

<div>

Deletes a specific file.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fileId` | <code>string</code> | Yes | File id for single object. |
| `headers` | <code>DeleteFileHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |

**Returns:** `error?`

**Sample code:**

```ballerina
check filesClient->deleteFile("3fa85f64-5717-4562-b3fc-2c963f66afa6", {xeroTenantId: tenantId});
```

</div>
</details>

<details>
<summary>uploadFileToFolder</summary>

<div>

Uploads a File to a specific folder.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `folderId` | <code>string</code> | Yes | Pass required folder id to save file to specific folder. |
| `headers` | <code>UploadFileToFolderHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>FileUploadRequest</code> | Yes | File content and metadata to upload to the folder. |

**Returns:** `FileObject|error`

**Sample code:**

```ballerina
files:FileObject result = check filesClient->uploadFileToFolder("3fa85f64-5717-4562-b3fc-2c963f66afa6", {xeroTenantId: tenantId}, {
    filename: "import.csv",
    name: "Sample name",
    body: {
        fileContent: check io:fileReadBytes("import.csv"),
        fileName: "import.csv"
    },
    mimeType: "string"
});
```

**Sample response:**

```json
{
  "CreatedDateUtc": "2026-01-15T00:00:00",
  "User": {
    "Id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "FirstName": "Sample name",
    "FullName": "Sample name"
  },
  "UpdatedDateUtc": "2026-01-15T00:00:00",
  "Size": 1,
  "Id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "FolderId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>getFileContent</summary>

<div>

Retrieves the content of a specific file.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fileId` | <code>string</code> | Yes | File id for single object. |
| `headers` | <code>GetFileContentHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |

**Returns:** `byte[]|error`

**Sample code:**

```ballerina
byte[] result = check filesClient->getFileContent("3fa85f64-5717-4562-b3fc-2c963f66afa6", {xeroTenantId: tenantId});
```

**Sample response:**

The raw response content as `byte[]`.

</div>
</details>

<details>
<summary>listFileAssociations</summary>

<div>

Retrieves a specific file associations.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fileId` | <code>string</code> | Yes | File id for single object. |
| `headers` | <code>ListFileAssociationsHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |

**Returns:** `Association[]|error`

**Sample code:**

```ballerina
files:Association[] result = check filesClient->listFileAssociations("3fa85f64-5717-4562-b3fc-2c963f66afa6", {xeroTenantId: tenantId});
```

**Sample response:**

The raw response content as `Association[]`.

</div>
</details>

<details>
<summary>createFileAssociation</summary>

<div>

Creates a new file association.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fileId` | <code>string</code> | Yes | File id for single object. |
| `headers` | <code>CreateFileAssociationHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>Association</code> | Yes | Association linking the file to an object. |

**Returns:** `Association|error`

**Sample code:**

```ballerina
files:Association result = check filesClient->createFileAssociation("3fa85f64-5717-4562-b3fc-2c963f66afa6", {xeroTenantId: tenantId}, {
    createdDateUtc: "2026-01-15T00:00:00",
    objectType: "Unknown",
    objectId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    size: 1
});
```

**Sample response:**

```json
{
  "CreatedDateUtc": "2026-01-15T00:00:00",
  "ObjectType": "Unknown",
  "ObjectId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "Size": 1,
  "ObjectGroup": "Account",
  "AssociationDateUtc": "2026-01-15T00:00:00"
}
```

</div>
</details>

<details>
<summary>deleteFileAssociation</summary>

<div>

Deletes an existing file association.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fileId` | <code>string</code> | Yes | File id for single object. |
| `objectId` | <code>string</code> | Yes | Object id for single object. |
| `headers` | <code>DeleteFileAssociationHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |

**Returns:** `error?`

**Sample code:**

```ballerina
check filesClient->deleteFileAssociation("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {xeroTenantId: tenantId});
```

</div>
</details>

#### Associations

<details>
<summary>listObjectAssociations</summary>

<div>

Retrieves an association object using a unique object ID.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `objectId` | <code>string</code> | Yes | Object id for single object. |
| `headers` | <code>ListObjectAssociationsHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |
| `pagesize` | <code>int</code> | No | Pass an optional page size value. |
| `page` | <code>int</code> | No | Number of records to skip for pagination. |
| `sort` | <code>"Name"&#124;"Size"&#124;"CreatedDateUtc"&#124;"AssociationDateUtc"</code> | No | Values to sort by. Defaults to `"CreatedDateUtc"`. |
| `direction` | <code>"ASC"&#124;"DESC"</code> | No | Direction to sort by. |

**Returns:** `Association[]|error`

**Sample code:**

```ballerina
files:Association[] result = check filesClient->listObjectAssociations("3fa85f64-5717-4562-b3fc-2c963f66afa6", {xeroTenantId: tenantId});
```

**Sample response:**

The raw response content as `Association[]`.

</div>
</details>

<details>
<summary>countAssociations</summary>

<div>

Retrieves a count of associations for a list of objects.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>CountAssociationsHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |
| `objectIds` | <code>string[]</code> | Yes | A comma-separated list of object ids. |

**Returns:** `record {}|error`

**Sample code:**

```ballerina
record {} result = check filesClient->countAssociations({xeroTenantId: tenantId}, objectIds = ["3fa85f64-5717-4562-b3fc-2c963f66afa6"]);
```

**Sample response:**

The raw response content as `record {}`.

</div>
</details>

#### Folders

<details>
<summary>listFolders</summary>

<div>

Retrieves folders.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>ListFoldersHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |
| `sort` | <code>"Name"&#124;"Size"&#124;"CreatedDateUTC"</code> | No | Values to sort by. |

**Returns:** `Folder[]|error`

**Sample code:**

```ballerina
files:Folder[] result = check filesClient->listFolders({xeroTenantId: tenantId});
```

**Sample response:**

The raw response content as `Folder[]`.

</div>
</details>

<details>
<summary>createFolder</summary>

<div>

Creates a new folder.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>CreateFolderHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>Folder</code> | Yes | Properties of the folder to create. |

**Returns:** `Folder|error`

**Sample code:**

```ballerina
files:Folder result = check filesClient->createFolder({xeroTenantId: tenantId}, {
    name: "Sample name",
    isInbox: false,
    fileCount: 1,
    email: "user@example.com"
});
```

**Sample response:**

```json
{
  "Name": "Sample name",
  "IsInbox": false,
  "FileCount": 1,
  "Email": "user@example.com",
  "Id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>getFolder</summary>

<div>

Retrieves specific folder by using a unique folder ID.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `folderId` | <code>string</code> | Yes | Folder id for single object. |
| `headers` | <code>GetFolderHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |

**Returns:** `Folder|error`

**Sample code:**

```ballerina
files:Folder result = check filesClient->getFolder("3fa85f64-5717-4562-b3fc-2c963f66afa6", {xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "Name": "Sample name",
  "IsInbox": false,
  "FileCount": 1,
  "Email": "user@example.com",
  "Id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>updateFolder</summary>

<div>

Updates an existing folder.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `folderId` | <code>string</code> | Yes | Folder id for single object. |
| `headers` | <code>UpdateFolderHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). Optional: `idempotencyKey`. |
| `payload` | <code>Folder</code> | Yes | Updated properties of the folder. |

**Returns:** `Folder|error`

**Sample code:**

```ballerina
files:Folder result = check filesClient->updateFolder("3fa85f64-5717-4562-b3fc-2c963f66afa6", {xeroTenantId: tenantId}, {
    name: "Sample name",
    isInbox: false,
    fileCount: 1,
    email: "user@example.com"
});
```

**Sample response:**

```json
{
  "Name": "Sample name",
  "IsInbox": false,
  "FileCount": 1,
  "Email": "user@example.com",
  "Id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>deleteFolder</summary>

<div>

Deletes a folder.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `folderId` | <code>string</code> | Yes | Folder id for single object. |
| `headers` | <code>DeleteFolderHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |

**Returns:** `error?`

**Sample code:**

```ballerina
check filesClient->deleteFolder("3fa85f64-5717-4562-b3fc-2c963f66afa6", {xeroTenantId: tenantId});
```

</div>
</details>

#### Inbox

<details>
<summary>getInbox</summary>

<div>

Retrieves inbox folder.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>GetInboxHeaders</code> | Yes | Request headers, including the required `xeroTenantId` (the Xero tenant ID of the organisation). |

**Returns:** `Folder|error`

**Sample code:**

```ballerina
files:Folder result = check filesClient->getInbox({xeroTenantId: tenantId});
```

**Sample response:**

```json
{
  "Name": "Sample name",
  "IsInbox": false,
  "FileCount": 1,
  "Email": "user@example.com",
  "Id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>
