---
title: Actions
---

# Actions

The Azure Storage Service connector spans 3 packages:
- `ballerinax/azure_storage_service`
- `ballerinax/azure_storage_service.blobs`
- `ballerinax/azure_storage_service.files`

Available clients:

| Client | Purpose |
|--------|---------|
| [`Blob Client`](#blob-client) | Perform blob CRUD operations, block staging, page blob range writes, and append blob operations. |
| [`Blob Management Client`](#blob-management-client) | Manage containers and query storage account-level information. |
| [`File Client`](#file-client) | Manage files and directories within Azure File Shares. |
| [`File Management Client`](#file-management-client) | Manage Azure File Shares and configure file service properties. |

---

## Blob client

Perform blob CRUD operations, block staging, page blob range writes, and append blob operations.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `accessKeyOrSAS` | <code>string</code> | Required | Azure Storage Account access key or Shared Access Signature (SAS) token. |
| `accountName` | <code>string</code> | Required | Name of the Azure Storage account (e.g., `"myballerinastorage"`). |
| `authorizationMethod` | <code>AuthorizationMethod</code> | Required | Authorization method: `"accessKey"` or `"SAS"`. |
| `httpVersion` | <code>http:HttpVersion</code> | `http:HTTP_1_1` | HTTP protocol version used by the underlying HTTP client. |

### Initializing the client

```ballerina
import ballerinax/azure_storage_service.blobs as azure_blobs;

configurable string accessKeyOrSAS = ?;
configurable string accountName = ?;

azure_blobs:BlobClient blobClient = check new ({
    accessKeyOrSAS: accessKeyOrSAS,
    accountName: accountName,
    authorizationMethod: "accessKey"
});
```

### Operations

#### Blob operations

<details>
<summary>Gets list of containers of a storage account</summary>

Gets the list of containers in the Azure Storage account.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `maxResults` | <code>int?</code> | No | Maximum number of containers to return. |
| `marker` | <code>string?</code> | No | Continuation token from a previous response's `nextMarker`. |
| `prefix` | <code>string?</code> | No | Filter to return only containers whose name begins with this prefix. |

Returns: `ListContainerResult|Error`

Sample code:

```ballerina
azure_blobs:ListContainerResult result = check blobClient->listContainers();
```

Sample response:

```ballerina
{
  "containerList": [
    {
      "Name": "sample-container",
      "Properties": {
        "Last-Modified": "Thu, 01 Jan 2025 10:00:00 GMT",
        "Etag": "\"0x8DC1234ABCDE\"",
        "LeaseStatus": "unlocked",
        "LeaseState": "available",
        "DefaultEncryptionScope": "$account-encryption-key",
        "DenyEncryptionScopeOverride": false,
        "HasImmutabilityPolicy": false,
        "HasLegalHold": false
      }
    }
  ],
  "nextMarker": "",
  "responseHeaders": {
    "Date": "Thu, 01 Jan 2025 10:00:00 GMT",
    "x-ms-version": "2020-12-06",
    "x-ms-request-id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
  }
}
```

</details>

<details>
<summary>Gets list of blobs from a container</summary>

Gets the list of blobs (with metadata and properties) from a container.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `containerName` | <code>string</code> | Yes | Name of the container to list blobs from. |
| `maxResults` | <code>int?</code> | No | Maximum number of blobs to return. |
| `marker` | <code>string?</code> | No | Continuation token from a previous response's `nextMarker`. |
| `prefix` | <code>string?</code> | No | Filter to return only blobs whose name begins with this prefix. |

Returns: `ListBlobResult|Error`

Sample code:

```ballerina
azure_blobs:ListBlobResult result = check blobClient->listBlobs("sample-container");
```

Sample response:

```ballerina
{
  "blobList": [
    {
      "Name": "hello.txt",
      "Properties": {
        "Creation-Time": "Thu, 01 Jan 2025 09:00:00 GMT",
        "Last-Modified": "Thu, 01 Jan 2025 09:00:00 GMT",
        "Etag": "\"0x8DC9876FEDCB\"",
        "Content-Length": "5",
        "Content-Type": "application/octet-stream",
        "BlobType": "BlockBlob",
        "AccessTier": "Hot",
        "LeaseStatus": "unlocked",
        "LeaseState": "available",
        "ServerEncrypted": true
      }
    }
  ],
  "nextMarker": "",
  "responseHeaders": {
    "Date": "Thu, 01 Jan 2025 10:00:00 GMT",
    "x-ms-version": "2020-12-06",
    "x-ms-request-id": "b2c3d4e5-f6a7-8901-bcde-f12345678901"
  }
}
```

</details>

<details>
<summary>Gets a blob from a container</summary>

Downloads a blob from a container as a byte array.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `containerName` | <code>string</code> | Yes | Name of the container. |
| `blobName` | <code>string</code> | Yes | Name of the blob to retrieve. |
| `byteRange` | <code>ByteRange?</code> | No | Optional byte range to retrieve a partial blob. If omitted, the entire blob is returned. |

Returns: `BlobResult|Error`

Sample code:

```ballerina
azure_blobs:BlobResult result = check blobClient->getBlob("sample-container", "hello.txt");
byte[] content = result.blobContent;
```

Sample response:

```ballerina
{
  "blobContent": [104, 101, 108, 108, 111],
  "responseHeaders": {
    "Date": "Thu, 01 Jan 2025 10:01:00 GMT",
    "x-ms-version": "2020-12-06",
    "x-ms-request-id": "c3d4e5f6-a7b8-9012-cdef-123456789012"
  },
  "properties": {
    "blobContentType": "application/octet-stream",
    "blobContentMd5": "XUFAKrxLKna5cZ2REBfFkg=="
  }
}
```

</details>

<details>
<summary>Gets Blob Metadata</summary>

Gets the user-defined metadata for a blob.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `containerName` | <code>string</code> | Yes | Name of the container. |
| `blobName` | <code>string</code> | Yes | Name of the blob. |

Returns: `BlobMetadataResult|Error`

Sample code:

```ballerina
azure_blobs:BlobMetadataResult result = check blobClient->getBlobMetadata(
    "sample-container", "hello.txt");
```

Sample response:

```ballerina
{
  "metadata": {
    "owner": "integration-team",
    "env": "production"
  },
  "eTag": "\"0x8DC9876FEDCB\"",
  "lastModified": "Thu, 01 Jan 2025 09:00:00 GMT",
  "responseHeaders": {
    "Date": "Thu, 01 Jan 2025 10:02:00 GMT",
    "x-ms-version": "2020-12-06",
    "x-ms-request-id": "d4e5f6a7-b8c9-0123-defa-234567890123"
  }
}
```

</details>

<details>
<summary>Gets Blob Properties</summary>

Gets system properties for a blob (ETag, content type, lease status, etc.).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `containerName` | <code>string</code> | Yes | Name of the container. |
| `blobName` | <code>string</code> | Yes | Name of the blob. |

Returns: `ResponseHeaders|Error`

Sample code:

```ballerina
azure_blobs:ResponseHeaders headers = check blobClient->getBlobProperties(
    "sample-container", "hello.txt");
```

Sample response:

```ballerina
{
  "Date": "Thu, 01 Jan 2025 10:02:30 GMT",
  "x-ms-version": "2020-12-06",
  "x-ms-request-id": "e5f6a7b8-c9d0-1234-efab-345678901234"
}
```

</details>

<details>
<summary>Uploads a blob to a container as a single byte array</summary>

Uploads a blob to a container as a byte array. Supports BlockBlob, PageBlob, and AppendBlob types.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `containerName` | <code>string</code> | Yes | Name of the container. |
| `blobName` | <code>string</code> | Yes | Name to assign to the uploaded blob. |
| `blobType` | <code>BlobType</code> | Yes | Blob type: `"BlockBlob"`, `"AppendBlob"`, or `"PageBlob"`. |
| `blob` | <code>byte[]</code> | No | Blob content as a byte array. Defaults to `[]` (required for BlockBlob). |
| `properties` | <code>Properties?</code> | No | Optional content type, encoding, MD5, and metadata. |
| `pageBlobLength` | <code>int?</code> | No | Required for PageBlob: specifies the size in bytes. |

Returns: `ResponseHeaders|Error`

Sample code:

```ballerina
byte[] content = "hello".toBytes();
azure_blobs:ResponseHeaders result = check blobClient->putBlob(
    "sample-container", "hello.txt", "BlockBlob", content);
```

Sample response:

```ballerina
{
  "Date": "Thu, 01 Jan 2025 10:03:00 GMT",
  "x-ms-version": "2020-12-06",
  "x-ms-request-id": "f6a7b8c9-d0e1-2345-fabc-456789012345"
}
```

</details>

<details>
<summary>Creates a new Block Blob where the content is read from a URL</summary>

Creates a new block blob where the content is read from a given URL.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `containerName` | <code>string</code> | Yes | Name of the destination container. |
| `blobName` | <code>string</code> | Yes | Name of the new blob. |
| `sourceBlobURL` | <code>string</code> | Yes | Public or SAS-signed URL of the source blob. |
| `properties` | <code>Properties?</code> | No | Optional blob properties to set. |

Returns: `ResponseHeaders|Error`

Sample code:

```ballerina
azure_blobs:ResponseHeaders result = check blobClient->putBlobFromURL(
    "sample-container", "copy-of-file.txt",
    "https://otherstorage.blob.core.windows.net/data/file.txt?sv=...");
```

Sample response:

```ballerina
{
  "Date": "Thu, 01 Jan 2025 10:04:00 GMT",
  "x-ms-version": "2020-12-06",
  "x-ms-request-id": "a7b8c9d0-e1f2-3456-abcd-567890123456"
}
```

</details>

<details>
<summary>Deletes a blob from a container</summary>

Deletes a blob from a container.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `containerName` | <code>string</code> | Yes | Name of the container. |
| `blobName` | <code>string</code> | Yes | Name of the blob to delete. |

Returns: `ResponseHeaders|Error`

Sample code:

```ballerina
azure_blobs:ResponseHeaders result = check blobClient->deleteBlob(
    "sample-container", "hello.txt");
```

Sample response:

```ballerina
{
  "Date": "Thu, 01 Jan 2025 10:05:00 GMT",
  "x-ms-version": "2020-12-06",
  "x-ms-request-id": "b8c9d0e1-f2a3-4567-bcde-678901234567"
}
```

</details>

<details>
<summary>Copies a blob from a URL</summary>

Copies a blob from a source URL to a destination blob in the specified container.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `containerName` | <code>string</code> | Yes | Name of the destination container. |
| `blobName` | <code>string</code> | Yes | Name of the destination blob. |
| `sourceBlobURL` | <code>string</code> | Yes | URL of the source blob to copy from. |

Returns: `CopyBlobResult|Error`

Sample code:

```ballerina
azure_blobs:CopyBlobResult result = check blobClient->copyBlob(
    "sample-container", "backup.txt",
    "https://myaccount.blob.core.windows.net/sample-container/hello.txt");
```

Sample response:

```ballerina
{
  "copyId": "1f812371-a41d-49e6-b123-f4ce7a808a00",
  "copyStatus": "success",
  "lastModified": "Thu, 01 Jan 2025 10:06:00 GMT",
  "eTag": "\"0x8DC1111AABBCC\"",
  "responseHeaders": {
    "Date": "Thu, 01 Jan 2025 10:06:00 GMT",
    "x-ms-version": "2020-12-06",
    "x-ms-request-id": "c9d0e1f2-a3b4-5678-cdef-789012345678"
  }
}
```

</details>

<details>
<summary>Sets Blob Metadata</summary>

Sets user-defined metadata on a blob. Replaces all existing metadata.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `containerName` | <code>string</code> | Yes | Name of the container. |
| `blobName` | <code>string</code> | Yes | Name of the blob. |
| `metadata` | <code>map&lt;string&gt;</code> | Yes | Name-value pairs to set as blob metadata. |

Returns: `ResponseHeaders|Error`

Sample code:

```ballerina
azure_blobs:ResponseHeaders result = check blobClient->setBlobMetadata(
    "sample-container", "hello.txt",
    {"owner": "integration-team", "env": "production"});
```

Sample response:

```ballerina
{
  "Date": "Thu, 01 Jan 2025 10:07:00 GMT",
  "x-ms-version": "2020-12-06",
  "x-ms-request-id": "d0e1f2a3-b4c5-6789-defa-890123456789"
}
```

</details>

<details>
<summary>Uploads large blob from a file path</summary>

Uploads a large file to a container by splitting it into 50 MB blocks using `putBlock` and `putBlockList`.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `containerName` | <code>string</code> | Yes | Name of the container. |
| `blobName` | <code>string</code> | Yes | Name of the blob to create. |
| `filePath` | <code>string</code> | Yes | Local filesystem path of the file to upload. |
| `properties` | <code>Properties?</code> | No | Optional content type, encoding, and metadata. |

Returns: `error?`

Sample code:

```ballerina
check blobClient->uploadLargeBlob(
    "sample-container", "large-dataset.csv", "/tmp/large-dataset.csv");
```

</details>

#### Block operations

<details>
<summary>Commits a new block to be committed as part of a blob</summary>

Commits a new block to be staged as part of a block blob.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `containerName` | <code>string</code> | Yes | Name of the container. |
| `blobName` | <code>string</code> | Yes | Name of the target blob. |
| `blockId` | <code>string</code> | Yes | Identifier for the block (max 64 bytes when base64-encoded). |
| `content` | <code>byte[]</code> | Yes | Raw bytes for this block. |

Returns: `ResponseHeaders|Error`

Sample code:

```ballerina
byte[] chunk = "first-chunk".toBytes();
azure_blobs:ResponseHeaders result = check blobClient->putBlock(
    "sample-container", "assembled.txt", "block-001", chunk);
```

Sample response:

```ballerina
{
  "Date": "Thu, 01 Jan 2025 10:08:00 GMT",
  "x-ms-version": "2020-12-06",
  "x-ms-request-id": "e1f2a3b4-c5d6-7890-efab-901234567890"
}
```

</details>

<details>
<summary>Writes a blob by specifying the list of blockIDs</summary>

Commits a list of previously uploaded block IDs as a blob.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `containerName` | <code>string</code> | Yes | Name of the container. |
| `blobName` | <code>string</code> | Yes | Name of the blob to assemble. |
| `blockIdList` | <code>string[]</code> | Yes | Ordered list of block IDs that make up the final blob. |
| `properties` | <code>Properties?</code> | No | Optional blob properties. |

Returns: `ResponseHeaders|Error`

Sample code:

```ballerina
azure_blobs:ResponseHeaders result = check blobClient->putBlockList(
    "sample-container", "assembled.txt",
    ["block-001", "block-002", "block-003"]);
```

Sample response:

```ballerina
{
  "Date": "Thu, 01 Jan 2025 10:09:00 GMT",
  "x-ms-version": "2020-12-06",
  "x-ms-request-id": "f2a3b4c5-d6e7-8901-fabc-012345678901"
}
```

</details>

<details>
<summary>Commits a new block from a URL as part of a blob</summary>

Stages a block for a blob where the block content is read from a URL.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `containerName` | <code>string</code> | Yes | Name of the container. |
| `blobName` | <code>string</code> | Yes | Name of the blob. |
| `blockId` | <code>string</code> | Yes | Identifier for the block. |
| `sourceBlobURL` | <code>string</code> | Yes | URL of the source blob to copy block content from. |
| `byteRange` | <code>ByteRange?</code> | No | Optional byte range within the source blob. If omitted, the entire blob content is used. |

Returns: `ResponseHeaders|Error`

Sample code:

```ballerina
azure_blobs:ResponseHeaders result = check blobClient->putBlockFromURL(
    "sample-container", "assembled.txt", "block-001",
    "https://source.blob.core.windows.net/data/source.txt?sv=...");
```

Sample response:

```ballerina
{
  "Date": "Thu, 01 Jan 2025 10:10:00 GMT",
  "x-ms-version": "2020-12-06",
  "x-ms-request-id": "a3b4c5d6-e7f8-9012-abcd-123456789012"
}
```

</details>

<details>
<summary>Gets Block List</summary>

Gets the list of blocks committed and uncommitted for a block blob.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `containerName` | <code>string</code> | Yes | Name of the container. |
| `blobName` | <code>string</code> | Yes | Name of the blob. |

Returns: `BlockListResult|Error`

Sample code:

```ballerina
azure_blobs:BlockListResult result = check blobClient->getBlockList(
    "sample-container", "assembled.txt");
```

Sample response:

```ballerina
{
  "blockList": {
    "CommittedBlocks": {
      "Block": [
        {"Name": "YmxvY2stMDAx", "Size": 11},
        {"Name": "YmxvY2stMDAy", "Size": 12}
      ]
    },
    "UncommittedBlocks": ""
  },
  "responseHeaders": {
    "Date": "Thu, 01 Jan 2025 10:10:30 GMT",
    "x-ms-version": "2020-12-06",
    "x-ms-request-id": "b4c5d6e7-f8a9-0123-bcde-234567890123"
  }
}
```

</details>

#### Page blob operations

<details>
<summary>Updates or adds a new page Blob</summary>

Updates or clears a range of pages in a page blob.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `containerName` | <code>string</code> | Yes | Name of the container. |
| `pageBlobName` | <code>string</code> | Yes | Name of the page blob. |
| `operation` | <code>PageOperation</code> | Yes | Page operation: `"update"` to write content, `"clear"` to zero out the range. |
| `byteRange` | <code>ByteRange</code> | Yes | Byte range to update (must be 512-byte aligned). |
| `content` | <code>byte[]?</code> | No | Page content to write (required for `update` operation). |

Returns: `PutPageResult|Error`

Sample code:

```ballerina
byte[] pageContent = array:create(512, 0);
azure_blobs:PutPageResult result = check blobClient->putPage(
    "sample-container", "disk.vhd", "update",
    {startByte: 0, endByte: 511}, pageContent);
```

Sample response:

```ballerina
{
  "blobSequenceNumber": "0",
  "eTag": "\"0x8DC2222BBCCDD\"",
  "lastModified": "Thu, 01 Jan 2025 10:11:00 GMT",
  "responseHeaders": {
    "Date": "Thu, 01 Jan 2025 10:11:00 GMT",
    "x-ms-version": "2020-12-06",
    "x-ms-request-id": "c5d6e7f8-a9b0-1234-cdef-345678901234"
  }
}
```

</details>

<details>
<summary>Gets list of valid page ranges for a page blob</summary>

Gets the list of valid page ranges for a page blob.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `containerName` | <code>string</code> | Yes | Name of the container. |
| `blobName` | <code>string</code> | Yes | Name of the page blob. |
| `byteRange` | <code>ByteRange?</code> | No | Optional byte range to limit which page ranges are returned. |

Returns: `PageRangeResult|Error`

Sample code:

```ballerina
azure_blobs:PageRangeResult result = check blobClient->getPageRanges(
    "sample-container", "disk.vhd");
```

Sample response:

```ballerina
{
  "pageList": {
    "PageRange": [
      {"Start": "0", "End": "511"},
      {"Start": "512", "End": "1023"}
    ]
  },
  "responseHeaders": {
    "Date": "Thu, 01 Jan 2025 10:11:30 GMT",
    "x-ms-version": "2020-12-06",
    "x-ms-request-id": "d6e7f8a9-b0c1-2345-defa-456789012345"
  }
}
```

</details>

#### Append blob operations

<details>
<summary>Commits a new block of data to the end of an append blob</summary>

Commits a new block of data to the end of an existing append blob.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `containerName` | <code>string</code> | Yes | Name of the container. |
| `blobName` | <code>string</code> | Yes | Name of the append blob. |
| `block` | <code>byte[]</code> | Yes | Content of the block to append. |

Returns: `AppendBlockResult|error`

Sample code:

```ballerina
byte[] logEntry = "2025-01-01T10:12:00Z INFO Service started\n".toBytes();
azure_blobs:AppendBlockResult result = check blobClient->appendBlock(
    "sample-container", "app.log", logEntry);
```

Sample response:

```ballerina
{
  "blobAppendOffset": "0",
  "blobCommitedBlockCount": "1",
  "eTag": "\"0x8DC3333CCDDEE\"",
  "lastModified": "Thu, 01 Jan 2025 10:12:00 GMT",
  "responseHeaders": {
    "Date": "Thu, 01 Jan 2025 10:12:00 GMT",
    "x-ms-version": "2020-12-06",
    "x-ms-request-id": "e7f8a9b0-c1d2-3456-efab-567890123456"
  }
}
```

</details>

<details>
<summary>Commits a new block of data from a URL to the end of an append blob</summary>

Commits a block of data to the end of an append blob where content is read from a URL.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `containerName` | <code>string</code> | Yes | Name of the container. |
| `blobName` | <code>string</code> | Yes | Name of the append blob. |
| `sourceBlobURL` | <code>string</code> | Yes | URL of the source blob to append content from. |

Returns: `AppendBlockResult|Error`

Sample code:

```ballerina
azure_blobs:AppendBlockResult result = check blobClient->appendBlockFromURL(
    "sample-container", "app.log",
    "https://source.blob.core.windows.net/logs/today.log?sv=...");
```

Sample response:

```ballerina
{
  "blobAppendOffset": "45",
  "blobCommitedBlockCount": "2",
  "eTag": "\"0x8DC3333CCDDFF\"",
  "lastModified": "Thu, 01 Jan 2025 10:13:00 GMT",
  "responseHeaders": {
    "Date": "Thu, 01 Jan 2025 10:13:00 GMT",
    "x-ms-version": "2020-12-06",
    "x-ms-request-id": "f8a9b0c1-d2e3-4567-fabc-678901234567"
  }
}
```

</details>

---

## Blob management client

Manage containers and query storage account-level information.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `accessKeyOrSAS` | <code>string</code> | Required | Azure Storage Account access key or Shared Access Signature (SAS) token. |
| `accountName` | <code>string</code> | Required | Name of the Azure Storage account. |
| `authorizationMethod` | <code>AuthorizationMethod</code> | Required | Authorization method: `"accessKey"` or `"SAS"`. |
| `httpVersion` | <code>http:HttpVersion</code> | `http:HTTP_1_1` | HTTP protocol version used by the underlying HTTP client. |

### Initializing the client

```ballerina
import ballerinax/azure_storage_service.blobs as azure_blobs;

configurable string accessKeyOrSAS = ?;
configurable string accountName = ?;

azure_blobs:ManagementClient managementClient = check new ({
    accessKeyOrSAS: accessKeyOrSAS,
    accountName: accountName,
    authorizationMethod: "accessKey"
});
```

### Operations

#### Container management

<details>
<summary>Create a container in the azure storage account</summary>

Creates a new container in the Azure Storage account.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `containerName` | <code>string</code> | Yes | Name for the new container. |
| `accessLevel` | <code>AccessLevel?</code> | No | Public access level: `"container"` or `"blob"`. Defaults to private. |
| `metadata` | <code>map&lt;string&gt;?</code> | No | Name-value pairs to associate with the container as metadata. |
| `clientRequestId` | <code>string?</code> | No | Client-generated opaque value recorded in storage analytics logs. |

Returns: `ResponseHeaders|Error`

Sample code:

```ballerina
azure_blobs:ResponseHeaders result = check managementClient->createContainer(
    "my-new-container");
```

Sample response:

```ballerina
{
  "Date": "Thu, 01 Jan 2025 10:14:00 GMT",
  "x-ms-version": "2020-12-06",
  "x-ms-request-id": "a9b0c1d2-e3f4-5678-abcd-789012345678"
}
```

</details>

<details>
<summary>Delete a container from the azure storage account</summary>

Deletes a container and all blobs it contains.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `containerName` | <code>string</code> | Yes | Name of the container to delete. |
| `clientRequestId` | <code>string?</code> | No | Client-generated opaque value for analytics logging. |
| `leaseId` | <code>string?</code> | No | Active lease ID for the container, if applicable. |

Returns: `ResponseHeaders|Error`

Sample code:

```ballerina
azure_blobs:ResponseHeaders result = check managementClient->deleteContainer(
    "my-old-container");
```

Sample response:

```ballerina
{
  "Date": "Thu, 01 Jan 2025 10:15:00 GMT",
  "x-ms-version": "2020-12-06",
  "x-ms-request-id": "b0c1d2e3-f4a5-6789-bcde-890123456789"
}
```

</details>

<details>
<summary>Get Container Properties</summary>

Gets system properties for a container (ETag, lease status, public access, etc.).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `containerName` | <code>string</code> | Yes | Name of the container. |
| `clientRequestId` | <code>string?</code> | No | Client-generated opaque value for analytics logging. |
| `leaseId` | <code>string?</code> | No | Active lease ID for the container, if applicable. |

Returns: `ContainerPropertiesResult|Error`

Sample code:

```ballerina
azure_blobs:ContainerPropertiesResult result = check managementClient->getContainerProperties(
    "sample-container");
```

Sample response:

```ballerina
{
  "eTag": "\"0x8DC5555DDEEFF\"",
  "lastModified": "Thu, 01 Jan 2025 09:00:00 GMT",
  "leaseStatus": "unlocked",
  "leaseState": "available",
  "hasImmutabilityPolicy": "false",
  "hasLegalHold": "false",
  "metaData": {},
  "responseHeaders": {
    "Date": "Thu, 01 Jan 2025 10:15:30 GMT",
    "x-ms-version": "2020-12-06",
    "x-ms-request-id": "c1d2e3f4-a5b6-7890-cdef-901234567890"
  }
}
```

</details>

<details>
<summary>Get Container Metadata</summary>

Gets user-defined metadata for a container.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `containerName` | <code>string</code> | Yes | Name of the container. |
| `clientRequestId` | <code>string?</code> | No | Client-generated opaque value for analytics logging. |
| `leaseId` | <code>string?</code> | No | Active lease ID for the container, if applicable. |

Returns: `ContainerMetadataResult|Error`

Sample code:

```ballerina
azure_blobs:ContainerMetadataResult result = check managementClient->getContainerMetadata(
    "sample-container");
```

Sample response:

```ballerina
{
  "metadata": {"team": "data-engineering", "project": "etl"},
  "eTag": "\"0x8DC5555DDEEFF\"",
  "lastModified": "Thu, 01 Jan 2025 09:00:00 GMT",
  "responseHeaders": {
    "Date": "Thu, 01 Jan 2025 10:16:00 GMT",
    "x-ms-version": "2020-12-06",
    "x-ms-request-id": "d2e3f4a5-b6c7-8901-defa-012345678901"
  }
}
```

</details>

<details>
<summary>Get Container ACL</summary>

Gets the permissions (ACL) for a container. Only supported with access key authorization.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `containerName` | <code>string</code> | Yes | Name of the container. |
| `clientRequestId` | <code>string?</code> | No | Client-generated opaque value for analytics logging. |
| `leaseId` | <code>string?</code> | No | Active lease ID for the container, if applicable. |

Returns: `ContainerACLResult|Error`

Sample code:

```ballerina
azure_blobs:ContainerACLResult result = check managementClient->getContainerACL(
    "sample-container");
```

Sample response:

```ballerina
{
  "publicAccess": "blob",
  "eTag": "\"0x8DC5555DDEEFF\"",
  "lastModified": "Thu, 01 Jan 2025 09:00:00 GMT",
  "responseHeaders": {
    "Date": "Thu, 01 Jan 2025 10:16:30 GMT",
    "x-ms-version": "2020-12-06",
    "x-ms-request-id": "e3f4a5b6-c7d8-9012-efab-123456789012"
  }
}
```

</details>

#### Account & service information

<details>
<summary>Get Account Information of the azure storage account</summary>

Gets account-level information including SKU name, kind, and hierarchical namespace status.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `clientRequestId` | <code>string?</code> | No | Client-generated opaque value for analytics logging. |

Returns: `AccountInformationResult|Error`

Sample code:

```ballerina
azure_blobs:AccountInformationResult result = check managementClient->getAccountInformation();
```

Sample response:

```ballerina
{
  "skuName": "Standard_LRS",
  "accountKind": "StorageV2",
  "isHNSEnabled": "false",
  "responseHeaders": {
    "Date": "Thu, 01 Jan 2025 10:17:00 GMT",
    "x-ms-version": "2020-12-06",
    "x-ms-request-id": "f4a5b6c7-d8e9-0123-fabc-234567890123"
  }
}
```

</details>

<details>
<summary>Get Blob Service Properties</summary>

Gets the properties of the Blob service for the storage account (logging, metrics, CORS, etc.).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `clientRequestId` | <code>string?</code> | No | Client-generated opaque value for analytics logging. |

Returns: `BlobServicePropertiesResult|Error`

Sample code:

```ballerina
azure_blobs:BlobServicePropertiesResult result = check managementClient->getBlobServiceProperties();
```

Sample response:

```ballerina
{
  "storageServiceProperties": {
    "Logging": {
      "Version": "1.0",
      "Delete": false,
      "Read": false,
      "Write": false,
      "RetentionPolicy": {"Enabled": false}
    },
    "HourMetrics": {
      "Version": "1.0",
      "Enabled": false,
      "RetentionPolicy": {"Enabled": false}
    }
  },
  "responseHeaders": {
    "Date": "Thu, 01 Jan 2025 10:17:30 GMT",
    "x-ms-version": "2020-12-06",
    "x-ms-request-id": "a5b6c7d8-e9f0-1234-abcd-345678901234"
  }
}
```

</details>

---

## File client

Manage files and directories within Azure File Shares.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `accessKeyOrSAS` | <code>string</code> | Required | Azure Storage Account access key or Shared Access Signature (SAS) token. |
| `accountName` | <code>string</code> | Required | Name of the Azure Storage account. |
| `authorizationMethod` | <code>AuthorizationMethod</code> | Required | Authorization method: `"accessKey"` or `"SAS"`. |
| `httpVersion` | <code>http:HttpVersion</code> | `http:HTTP_1_1` | HTTP protocol version used by the underlying HTTP client. |

### Initializing the client

```ballerina
import ballerinax/azure_storage_service.files as azure_files;

configurable string accessKeyOrSAS = ?;
configurable string accountName = ?;

azure_files:FileClient fileClient = check new ({
    accessKeyOrSAS: accessKeyOrSAS,
    accountName: accountName,
    authorizationMethod: "accessKey"
});
```

### Operations

#### File operations

<details>
<summary>Upload a file directly to the fileshare</summary>

Uploads a local file directly to an Azure File Share by creating the file entry and writing content in one step.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fileShareName` | <code>string</code> | Yes | Name of the Azure File Share. |
| `localFilePath` | <code>string</code> | Yes | Local filesystem path of the file to upload. |
| `azureFileName` | <code>string</code> | Yes | Name of the file to create in Azure. |
| `azureDirectoryPath` | <code>string?</code> | No | Directory path within the file share. If omitted, the file is placed at the root. |

Returns: `Error?`

Sample code:

```ballerina
check fileClient->directUpload(
    fileShareName = "myfileshare",
    localFilePath = "/tmp/report.pdf",
    azureFileName = "report.pdf");
```

</details>

<details>
<summary>Downloads a file from fileshare to a specified location</summary>

Downloads a file from an Azure File Share to a local path.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fileShareName` | <code>string</code> | Yes | Name of the Azure File Share. |
| `fileName` | <code>string</code> | Yes | Name of the file in Azure. |
| `localFilePath` | <code>string</code> | Yes | Local filesystem path (including filename) to write the downloaded file. |
| `azureDirectoryPath` | <code>string?</code> | No | Directory path within the file share. |

Returns: `Error?`

Sample code:

```ballerina
check fileClient->getFile(
    fileShareName = "myfileshare",
    fileName = "report.pdf",
    localFilePath = "/tmp/downloaded-report.pdf");
```

</details>

<details>
<summary>Downloads a file from fileshare as a byte array</summary>

Downloads a file (or a byte range) from an Azure File Share as a byte array.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fileShareName` | <code>string</code> | Yes | Name of the Azure File Share. |
| `fileName` | <code>string</code> | Yes | Name of the file in Azure. |
| `azureDirectoryPath` | <code>string?</code> | No | Directory path within the file share. |
| `range` | <code>ContentRange?</code> | No | Optional byte range to fetch only a portion of the file. |

Returns: `byte[]|Error`

Sample code:

```ballerina
byte[] content = check fileClient->getFileAsByteArray(
    fileShareName = "myfileshare",
    fileName = "report.pdf");
```

Sample response:

```ballerina
[37, 80, 68, 70, 45, 49, 46, 52]
```

</details>

<details>
<summary>Deletes a file from the fileshare</summary>

Deletes a file from an Azure File Share.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fileShareName` | <code>string</code> | Yes | Name of the Azure File Share. |
| `fileName` | <code>string</code> | Yes | Name of the file to delete. |
| `azureDirectoryPath` | <code>string?</code> | No | Directory path within the file share. |

Returns: `Error?`

Sample code:

```ballerina
check fileClient->deleteFile(
    fileShareName = "myfileshare",
    fileName = "old-report.pdf");
```

</details>

<details>
<summary>Copies a file to another location in fileShare</summary>

Copies a file to another location within the same file share.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fileShareName` | <code>string</code> | Yes | Name of the Azure File Share. |
| `sourceURL` | <code>string</code> | Yes | Full URL of the source file. |
| `destFileName` | <code>string</code> | Yes | Name for the destination file. |
| `destDirectoryPath` | <code>string?</code> | No | Directory path for the destination file. |

Returns: `Error?`

Sample code:

```ballerina
check fileClient->copyFile(
    fileShareName = "myfileshare",
    sourceURL = "https://myaccount.file.core.windows.net/myfileshare/report.pdf",
    destFileName = "report-backup.pdf",
    destDirectoryPath = "backups");
```

</details>

<details>
<summary>Gets File Metadata</summary>

Gets user-defined metadata for a file in an Azure File Share.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fileShareName` | <code>string</code> | Yes | Name of the Azure File Share. |
| `fileName` | <code>string</code> | Yes | Name of the file. |
| `azureDirectoryPath` | <code>string?</code> | No | Directory path within the file share. |

Returns: `FileMetadataResult|Error`

Sample code:

```ballerina
azure_files:FileMetadataResult result = check fileClient->getFileMetadata(
    fileShareName = "myfileshare",
    fileName = "report.pdf");
```

Sample response:

```ballerina
{
  "metadata": {"department": "finance", "quarter": "Q4-2024"},
  "eTag": "\"0x8DC7777FFEEDD\"",
  "lastModified": "Thu, 01 Jan 2025 08:00:00 GMT"
}
```

</details>

<details>
<summary>Provides a list of valid ranges of a file</summary>

Gets the list of valid byte ranges (uploaded regions) for a file.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fileShareName` | <code>string</code> | Yes | Name of the Azure File Share. |
| `fileName` | <code>string</code> | Yes | Name of the file. |
| `azureDirectoryPath` | <code>string?</code> | No | Directory path within the file share. |

Returns: `RangeList|Error`

Sample code:

```ballerina
azure_files:RangeList ranges = check fileClient->listRange(
    fileShareName = "myfileshare",
    fileName = "report.pdf");
```

Sample response:

```ballerina
{
  "Ranges": [
    {"Start": "0", "End": "65535"},
    {"Start": "131072", "End": "196607"}
  ]
}
```

</details>

#### Directory operations

<details>
<summary>Lists directories within the share or specified directory</summary>

Lists directories within an Azure File Share or a specified subdirectory.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fileShareName` | <code>string</code> | Yes | Name of the Azure File Share. |
| `azureDirectoryPath` | <code>string?</code> | No | Directory path to list subdirectories within. If omitted, lists the root. |
| `uriParameters` | <code>GetFileListURIParameters</code> | No | Optional URI parameters (e.g., `prefix`, `maxresults`). |

Returns: `DirectoryList|Error`

Sample code:

```ballerina
azure_files:DirectoryList directories = check fileClient->getDirectoryList(
    fileShareName = "myfileshare");
```

Sample response:

```ballerina
{
  "Directory": [
    {"Name": "backups", "Properties": {"Etag": "\"0x8DC8888AABBCC\""}},
    {"Name": "reports", "Properties": {"Etag": "\"0x8DC8888AABBDD\""}}
  ]
}
```

</details>

<details>
<summary>Lists files within the share or specified directory</summary>

Lists files within an Azure File Share or a specified directory.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fileShareName` | <code>string</code> | Yes | Name of the Azure File Share. |
| `azureDirectoryPath` | <code>string?</code> | No | Directory path to list files within. If omitted, lists the root. |
| `uriParameters` | <code>GetFileListURIParameters</code> | No | Optional URI parameters (e.g., `prefix`, `maxresults`). |

Returns: `FileList|Error`

Sample code:

```ballerina
azure_files:FileList files = check fileClient->getFileList(
    fileShareName = "myfileshare",
    azureDirectoryPath = "reports");
```

Sample response:

```ballerina
{
  "File": [
    {"Name": "report.pdf", "Properties": {"Content-Length": "204800"}},
    {"Name": "summary.xlsx", "Properties": {"Content-Length": "51200"}}
  ]
}
```

</details>

<details>
<summary>Creates a directory in the share or parent directory</summary>

Creates a directory in an Azure File Share.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fileShareName` | <code>string</code> | Yes | Name of the Azure File Share. |
| `newDirectoryName` | <code>string</code> | Yes | Name of the new directory. |
| `azureDirectoryPath` | <code>string?</code> | No | Parent directory path. If omitted, the directory is created at the root. |

Returns: `Error?`

Sample code:

```ballerina
check fileClient->createDirectory(
    fileShareName = "myfileshare",
    newDirectoryName = "archive",
    azureDirectoryPath = "reports");
```

</details>

<details>
<summary>Deletes the directory</summary>

Deletes a directory from an Azure File Share. Only supported for empty directories.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fileShareName` | <code>string</code> | Yes | Name of the Azure File Share. |
| `directoryName` | <code>string</code> | Yes | Name of the directory to delete. |
| `azureDirectoryPath` | <code>string?</code> | No | Parent directory path of the directory to delete. |

Returns: `Error?`

Sample code:

```ballerina
check fileClient->deleteDirectory(
    fileShareName = "myfileshare",
    directoryName = "old-archive");
```

</details>

---

## File management client

Manage Azure File Shares and configure file service properties.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `accessKeyOrSAS` | <code>string</code> | Required | Azure Storage Account access key or Shared Access Signature (SAS) token. |
| `accountName` | <code>string</code> | Required | Name of the Azure Storage account. |
| `authorizationMethod` | <code>AuthorizationMethod</code> | Required | Authorization method: `"accessKey"` or `"SAS"`. |
| `httpVersion` | <code>http:HttpVersion</code> | `http:HTTP_1_1` | HTTP protocol version used by the underlying HTTP client. |

### Initializing the client

```ballerina
import ballerinax/azure_storage_service.files as azure_files;

configurable string accessKeyOrSAS = ?;
configurable string accountName = ?;

azure_files:ManagementClient fileManagementClient = check new ({
    accessKeyOrSAS: accessKeyOrSAS,
    accountName: accountName,
    authorizationMethod: "accessKey"
});
```

### Operations

#### File share management

<details>
<summary>Creates a new share in a storage account</summary>

Creates a new file share in the Azure Storage account.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fileShareName` | <code>string</code> | Yes | Name for the new file share. |
| `fileShareRequestHeaders` | <code>RequestHeaders?</code> | No | Optional headers including quota (share size in GiB) and metadata. |

Returns: `Error?`

Sample code:

```ballerina
check fileManagementClient->createShare("myfileshare");
```

</details>

<details>
<summary>Deletes the share and any files and directories it contains</summary>

Deletes a file share and all files and directories it contains.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fileShareName` | <code>string</code> | Yes | Name of the file share to delete. |

Returns: `Error?`

Sample code:

```ballerina
check fileManagementClient->deleteShare("old-fileshare");
```

</details>

<details>
<summary>Lists all the file shares in the storage account</summary>

Lists all file shares in the Azure Storage account.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `uriParameters` | <code>ListShareURIParameters</code> | No | Optional URI parameters (e.g., `prefix`, `maxresults`, `include`). |

Returns: `SharesList|Error`

Sample code:

```ballerina
azure_files:SharesList result = check fileManagementClient->listShares();
```

Sample response:

```ballerina
{
  "Shares": {
    "Share": [
      {
        "Name": "myfileshare",
        "Properties": {
          "Last-Modified": "Thu, 01 Jan 2025 08:00:00 GMT",
          "Quota": "5120",
          "Etag": "\"0x8DC9999BBCCDD\"",
          "AccessTier": "TransactionOptimized"
        }
      },
      {
        "Name": "archive",
        "Properties": {
          "Last-Modified": "Wed, 01 Dec 2024 07:00:00 GMT",
          "Quota": "1024",
          "Etag": "\"0x8DC9999BBCCEE\""
        }
      }
    ]
  }
}
```

</details>

<details>
<summary>Returns all user-defined metadata and system properties of a share</summary>

Gets all user-defined metadata and system properties of a file share.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fileShareName` | <code>string</code> | Yes | Name of the file share. |

Returns: `FileServicePropertiesList|Error`

Sample code:

```ballerina
azure_files:FileServicePropertiesList result = check fileManagementClient->getShareProperties(
    "myfileshare");
```

Sample response:

```ballerina
{
  "StorageServiceProperties": {
    "HourMetrics": {
      "Version": "1.0",
      "Enabled": "false",
      "RetentionPolicy": {"Enabled": "false"}
    }
  }
}
```

</details>

#### File service properties

<details>
<summary>Gets the File service properties for the storage account</summary>

Gets the properties of the Azure File service for the storage account (metrics, CORS, protocol settings).

Returns: `FileServicePropertiesList|Error`

Sample code:

```ballerina
azure_files:FileServicePropertiesList result = check fileManagementClient->getFileServiceProperties();
```

Sample response:

```ballerina
{
  "StorageServiceProperties": {
    "HourMetrics": {
      "Version": "1.0",
      "Enabled": "false",
      "IncludeAPIs": "false",
      "RetentionPolicy": {"Enabled": "false"}
    },
    "MinuteMetrics": {
      "Version": "1.0",
      "Enabled": "false",
      "RetentionPolicy": {"Enabled": "false"}
    },
    "Cors": "",
    "ProtocolSettings": {
      "SMB": {"Multichannel": {"Enabled": "false"}}
    }
  }
}
```

</details>

<details>
<summary>Sets the File service properties for the storage account</summary>

Sets the properties of the Azure File service for the storage account.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fileServicePropertiesList` | <code>FileServicePropertiesList</code> | Yes | The desired file service properties to configure. |

Returns: `Error?`

Sample code:

```ballerina
azure_files:RetentionPolicyType retentionPolicy = {Enabled: "true", Days: "7"};
azure_files:MetricsType hourMetrics = {
    Version: "1.0",
    Enabled: true,
    RetentionPolicy: retentionPolicy
};
azure_files:StorageServicePropertiesType storageProps = {HourMetrics: hourMetrics};
azure_files:FileServicePropertiesList fileService = {
    StorageServiceProperties: storageProps
};
check fileManagementClient->setFileServiceProperties(fileService);
```

</details>
