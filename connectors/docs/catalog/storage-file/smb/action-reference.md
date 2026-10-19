---
title: Actions
---

# Actions

The SMB connector exposes the following clients:

Available clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Perform imperative file operations on SMB shares — read, write, patch, list, create, delete, move, copy, and rename files and directories |

For event-driven integration, see the [Trigger Reference](trigger-reference.md).

---

## Client

Connects to an SMB share to read, write, and manage files and directories, with support for text, JSON, XML, CSV, and binary content.

### Configuration

**`ClientConfiguration`**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `host` | <code>string</code> | <code>"localhost"</code> | Target SMB server hostname or IP address |
| `port` | <code>int</code> | <code>445</code> | Port number of the SMB service |
| `share` | <code>string</code> | Required | SMB share name to connect to |
| `auth` | <code>AuthConfiguration</code> | — | Authentication credentials for the SMB connection |
| `dialects` | <code>Dialect[]</code> | <code>[SMB_3_1_1, SMB_3_0_2, SMB_3_0, SMB_2_1, SMB_2_0_2]</code> | SMB protocol dialects to negotiate with, in order of preference |
| `signRequired` | <code>boolean</code> | <code>false</code> | Whether SMB message signing is required |
| `encryptData` | <code>boolean</code> | <code>false</code> | Whether to encrypt SMB data |
| `enableDfs` | <code>boolean</code> | <code>false</code> | Whether to enable Distributed File System (DFS) support |
| `bufferSize` | <code>int</code> | <code>65536</code> | Size of the buffer for read/write operations in bytes |
| `connectTimeout` | <code>decimal</code> | <code>30.0</code> | Connection timeout in seconds |
| `laxDataBinding` | <code>boolean</code> | <code>false</code> | Whether to relax data binding for XML, JSON, and CSV content |
| `csvFailSafe` | <code>FailSafeOptions</code> | — | When set, skips malformed CSV records and logs them to a file instead of failing the operation |

**`AuthConfiguration`**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `credentials` | <code>Credentials</code> | — | NTLMv2 credentials for the SMB connection |
| `kerberosConfig` | <code>KerberosConfig</code> | — | Kerberos authentication configuration |

**`Credentials`**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `username` | <code>string</code> | Required | Username for SMB authentication |
| `password` | <code>string</code> | Required | Password for SMB authentication |
| `domain` | <code>string</code> | <code>"WORKGROUP"</code> | Domain for domain-based authentication |

**`KerberosConfig`**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `principal` | <code>string</code> | Required | Kerberos principal name in the `user@REALM` format |
| `keytab` | <code>string</code> | — | Path to the keytab file; the password is used when this is not provided |
| `configFile` | <code>string</code> | — | Path to the Kerberos configuration file (`krb5.conf`) |

**`FailSafeOptions`**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `contentType` | <code>ErrorLogContentType</code> | <code>METADATA</code> | What to record in the error log for each skipped CSV record: `METADATA`, `RAW`, or `RAW_AND_METADATA` |

### Initializing the client

```ballerina
import ballerina/smb;

smb:ClientConfiguration config = {
    host: "smb-server.example.com",
    share: "myshare",
    auth: {
        credentials: {
            username: "smbuser",
            password: "smbpassword",
            domain: "WORKGROUP"
        }
    }
};
smb:Client client = check new (config);
```

### Operations

#### Read Operations

<details>
<summary>getBytes</summary>

Reads a file from an SMB share as a byte array.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | <code>string</code> | Yes | The resource path |

**Returns:** `byte[]|Error`

**Sample code:**

```ballerina
byte[] content = check client->getBytes("/files/image.png");
```

**Sample response:**

```json
[72, 101, 108, 108, 111, 44, 32, 87, 111, 114, 108, 100]
```

</details>

<details>
<summary>getText</summary>

Reads a file from an SMB share as text.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | <code>string</code> | Yes | The resource path |

**Returns:** `string|Error`

**Sample code:**

```ballerina
string content = check client->getText("/files/readme.txt");
```

**Sample response:**

```
Hello, World!
This is file content read from the SMB share.
```

</details>

<details>
<summary>getJson</summary>

Reads a file from an SMB share and parses it as JSON. Supports type binding to records and other Ballerina types via the `targetType` parameter.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | <code>string</code> | Yes | The resource path |
| `targetType` | <code>typedesc&lt;json&gt;</code> | No | The type descriptor of the target type; defaults to `json` |

**Returns:** `json|Error`

**Sample code:**

```ballerina
// Read as generic json
json content = check client->getJson("/data/config.json");

// Read with type binding
type Config record {| string env; int maxRetries; |};
Config config = check client->getJson("/data/config.json");
```

**Sample response:**

```json
{
  "env": "production",
  "maxRetries": 3
}
```

</details>

<details>
<summary>getXml</summary>

Reads a file from an SMB share and parses it as XML. Supports type binding to records and other Ballerina types via the `targetType` parameter.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | <code>string</code> | Yes | The resource path |
| `targetType` | <code>typedesc&lt;xml&#124;record &#123;&#125;&gt;</code> | No | The type descriptor of the target type; defaults to `xml` |

**Returns:** `xml|Error`

**Sample code:**

```ballerina
// Read as generic xml
xml content = check client->getXml("/data/report.xml");

// Read with type binding
type Book record {| string title; string author; |};
Book book = check client->getXml("/data/book.xml");
```

**Sample response:**

```xml
<report><title>Monthly Sales</title><total>42500</total></report>
```

</details>

<details>
<summary>getCsv</summary>

Reads a file from an SMB share and parses it as CSV. Supports parsing to string arrays or record arrays with type binding via the `targetType` parameter.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | <code>string</code> | Yes | The resource path |
| `targetType` | <code>typedesc&lt;string[][]&#124;record &#123;&#125;[]&gt;</code> | No | The type descriptor of the target type; defaults to `string[][]` |

**Returns:** `string[][]|Error`

**Sample code:**

```ballerina
// Read as raw string arrays
string[][] rows = check client->getCsv("/data/employees.csv");

// Read with type binding
type Employee record {| string name; int age; string city; |};
Employee[] employees = check client->getCsv("/data/employees.csv");
```

**Sample response:**

```json
[
  ["name", "age", "city"],
  ["Alice", "30", "New York"],
  ["Bob", "25", "London"]
]
```

</details>

<details>
<summary>getBytesAsStream</summary>

Retrieves the file content as a byte stream from an SMB share. Use this for large files to avoid loading the entire content into memory.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | <code>string</code> | Yes | The path to the file on the SMB server |

**Returns:** `stream<byte[], error?>|Error`

**Sample code:**

```ballerina
stream<byte[], error?> byteStream = check client->getBytesAsStream("/files/large-video.mp4");
record {| byte[] value; |}? chunk = check byteStream.next();
```

**Sample response:**

```json
[72, 101, 108, 108, 111, 44, 32, 87, 111, 114, 108, 100, 33]
```

</details>

<details>
<summary>getCsvAsStream</summary>

Retrieves the file content as a CSV stream from an SMB share. Supports streams of string arrays or bound record types, suitable for large CSV files processed row by row.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | <code>string</code> | Yes | The path to the file on the SMB server |
| `targetType` | <code>typedesc&lt;string[]&#124;record &#123;&#125;&gt;</code> | No | Expected element type for automatic data binding; defaults to `string[]` |

**Returns:** `stream<string[], error?>|Error`

**Sample code:**

```ballerina
// Stream as string arrays
stream<string[], error?> csvStream = check client->getCsvAsStream("/data/large-data.csv");
record {| string[] value; |}? row = check csvStream.next();

// Stream with type binding
type Product record {| string id; string name; decimal price; |};
stream<Product, error?> productStream = check client->getCsvAsStream("/data/products.csv");
```

**Sample response:**

```json
["id", "name", "price"]
```

</details>

#### Write Operations

<details>
<summary>putBytes</summary>

Writes byte array content to a file on an SMB share. Use `OVERWRITE` to replace any existing file or `APPEND` to add to it.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | <code>string</code> | Yes | The resource path |
| `content` | <code>byte[]</code> | Yes | Byte array content to write |
| `option` | <code>FileWriteOption</code> | No | File write option: `OVERWRITE` or `APPEND` (default: `OVERWRITE`) |

**Returns:** `Error?`

**Sample code:**

```ballerina
byte[] data = [72, 101, 108, 108, 111];
smb:Error? result = check client->putBytes("/uploads/binary.dat", data, smb:OVERWRITE);
```

</details>

<details>
<summary>putText</summary>

Writes text content to a file on an SMB share. Use `OVERWRITE` to replace any existing file or `APPEND` to add to it.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | <code>string</code> | Yes | The resource path |
| `content` | <code>string</code> | Yes | Text content to write |
| `option` | <code>FileWriteOption</code> | No | File write option: `OVERWRITE` or `APPEND` (default: `OVERWRITE`) |

**Returns:** `Error?`

**Sample code:**

```ballerina
smb:Error? result = check client->putText("/logs/app.log", "Application started\n", smb:APPEND);
```

</details>

<details>
<summary>putJson</summary>

Writes JSON content to a file on an SMB share. Use `OVERWRITE` to replace any existing file or `APPEND` to add to it.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | <code>string</code> | Yes | The resource path |
| `content` | <code>json</code> | Yes | JSON content to write |
| `option` | <code>FileWriteOption</code> | No | File write option: `OVERWRITE` or `APPEND` (default: `OVERWRITE`) |

**Returns:** `Error?`

**Sample code:**

```ballerina
json data = {name: "John", age: 30};
smb:Error? result = check client->putJson("/data/user.json", data, smb:OVERWRITE);
```

</details>

<details>
<summary>putXml</summary>

Writes XML content to a file on an SMB share. Accepts either a native `xml` value or a record that is automatically converted to XML. Use `OVERWRITE` to replace any existing file or `APPEND` to add to it.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | <code>string</code> | Yes | The resource path |
| `content` | <code>xml&#124;record &#123;&#124;json...;&#124;&#125;</code> | Yes | XML content or a record to be serialized as XML |
| `option` | <code>FileWriteOption</code> | No | File write option: `OVERWRITE` or `APPEND` (default: `OVERWRITE`) |

**Returns:** `Error?`

**Sample code:**

```ballerina
xml data = xml `<person><name>John</name></person>`;
smb:Error? result = check client->putXml("/data/person.xml", data, smb:OVERWRITE);
```

</details>

<details>
<summary>putCsv</summary>

Writes CSV content to a file on an SMB share. Accepts both array-of-arrays (`string[][]`) and array-of-records formats. When overwriting with a record array, column headers are added automatically.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | <code>string</code> | Yes | The resource path |
| `content` | <code>string[][]&#124;record &#123;&#125;[]</code> | Yes | CSV content as an array of string arrays or array of records |
| `option` | <code>FileWriteOption</code> | No | File write option: `OVERWRITE` or `APPEND` (default: `OVERWRITE`) |

**Returns:** `Error?`

**Sample code:**

```ballerina
string[][] csvData = [["name", "age"], ["Alice", "30"], ["Bob", "25"]];
smb:Error? result = check client->putCsv("/reports/employees.csv", csvData, smb:OVERWRITE);
```

</details>

<details>
<summary>putBytesAsStream</summary>

Writes a byte stream to a file on an SMB share. Use this to stream large files without loading the entire content into memory.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | <code>string</code> | Yes | The resource path |
| `content` | <code>stream&lt;byte[], error?&gt;</code> | Yes | Byte stream content to write |
| `option` | <code>FileWriteOption</code> | No | File write option: `OVERWRITE` or `APPEND` (default: `OVERWRITE`) |

**Returns:** `Error?`

**Sample code:**

```ballerina
stream<byte[], error?> byteStream = check client->getBytesAsStream("/source/video.mp4");
smb:Error? result = check client->putBytesAsStream("/dest/video.mp4", byteStream, smb:OVERWRITE);
```

</details>

<details>
<summary>putCsvAsStream</summary>

Writes a CSV stream to a file on an SMB share. Accepts streams of string arrays or records, suitable for large CSV datasets processed row by row.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | <code>string</code> | Yes | The resource path |
| `content` | <code>stream&lt;string[]&#124;record &#123;&#125;, error?&gt;</code> | Yes | CSV stream content as a stream of string arrays or records |
| `option` | <code>FileWriteOption</code> | No | File write option: `OVERWRITE` or `APPEND` (default: `OVERWRITE`) |

**Returns:** `Error?`

**Sample code:**

```ballerina
stream<string[], error?> csvStream = check client->getCsvAsStream("/source/data.csv");
smb:Error? result = check client->putCsvAsStream("/dest/data.csv", csvStream, smb:OVERWRITE);
```

</details>

<details>
<summary>patch</summary>

Writes byte array content at a specified byte offset in a file on an SMB share, leaving the rest of the file untouched.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | <code>string</code> | Yes | The resource path |
| `content` | <code>byte[]</code> | Yes | Byte array content to write |
| `offset` | <code>int</code> | Yes | The byte offset position in the file where writing should start |

**Returns:** `Error?`

**Sample code:**

```ballerina
byte[] patch = [65, 66, 67];
smb:Error? result = check client->patch("/files/data.bin", patch, 100);
```

</details>

#### Directory Operations

<details>
<summary>list</summary>

Lists files and directories in a folder on an SMB share, returning metadata for each entry.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | <code>string</code> | Yes | The directory path |

**Returns:** `FileInfo[]|Error`

**Sample code:**

```ballerina
smb:FileInfo[] entries = check client->list("/reports");
```

**Sample response:**

```json
[
  {
    "name": "report-2024.json",
    "path": "/reports/report-2024.json",
    "size": 2048,
    "modifiedAt": [1706745600, 0.0],
    "createdAt": [1706745600, 0.0],
    "accessedAt": [1706745600, 0.0],
    "writtenAt": [1706745600, 0.0],
    "isDirectory": false,
    "extension": "json",
    "isExecutable": false,
    "isHidden": false,
    "isWritable": true,
    "uri": "smb://smb-server/myshare/reports/report-2024.json"
  }
]
```

</details>

<details>
<summary>mkdir</summary>

Creates a new directory on an SMB share.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | <code>string</code> | Yes | The directory path to create |

**Returns:** `Error?`

**Sample code:**

```ballerina
smb:Error? result = check client->mkdir("/archive/2024");
```

</details>

<details>
<summary>rmdir</summary>

Deletes an empty directory on an SMB share. The directory must be empty before it can be removed.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | <code>string</code> | Yes | The directory path to delete |

**Returns:** `Error?`

**Sample code:**

```ballerina
smb:Error? result = check client->rmdir("/archive/2024");
```

</details>

#### File Management

<details>
<summary>rename</summary>

Renames a file or directory on an SMB share, or moves it to a new location within the same share.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `origin` | <code>string</code> | Yes | The source file or directory location |
| `destination` | <code>string</code> | Yes | The destination file or directory location |

**Returns:** `Error?`

**Sample code:**

```ballerina
smb:Error? result = check client->rename("/files/old-name.txt", "/files/new-name.txt");
```

</details>

<details>
<summary>move</summary>

Moves a file from one location to another on an SMB share.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sourcePath` | <code>string</code> | Yes | The source file location |
| `destinationPath` | <code>string</code> | Yes | The destination file location |

**Returns:** `Error?`

**Sample code:**

```ballerina
smb:Error? result = check client->move("/inbox/report.json", "/processed/report.json");
```

</details>

<details>
<summary>copy</summary>

Copies a file from one location to another on an SMB share, leaving the original file in place.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sourcePath` | <code>string</code> | Yes | The source file location |
| `destinationPath` | <code>string</code> | Yes | The destination file location |

**Returns:** `Error?`

**Sample code:**

```ballerina
smb:Error? result = check client->copy("/templates/invoice.xml", "/output/invoice-2024.xml");
```

</details>

<details>
<summary>delete</summary>

Deletes a file from an SMB share.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | <code>string</code> | Yes | The resource path |

**Returns:** `Error?`

**Sample code:**

```ballerina
smb:Error? result = check client->delete("/temp/scratch.txt");
```

</details>

<details>
<summary>exists</summary>

Checks if a file or directory exists on an SMB share.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | <code>string</code> | Yes | The resource path |

**Returns:** `boolean|Error`

**Sample code:**

```ballerina
boolean fileExists = check client->exists("/uploads/report.json");
```

**Sample response:**

```json
true
```

</details>

<details>
<summary>size</summary>

Gets the size of a file on an SMB share in bytes.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | <code>string</code> | Yes | The resource path |

**Returns:** `int|Error`

**Sample code:**

```ballerina
int fileSize = check client->size("/uploads/data.csv");
```

**Sample response:**

```json
204800
```

</details>

<details>
<summary>isDirectory</summary>

Checks if a given resource on an SMB share is a directory.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | <code>string</code> | Yes | The resource path |

**Returns:** `boolean|Error`

**Sample code:**

```ballerina
boolean isDir = check client->isDirectory("/archive");
```

**Sample response:**

```json
true
```

</details>

#### Connection

<details>
<summary>close</summary>

Closes the SMB client connection and releases associated resources.

**Parameters:**

_None_

**Returns:** `Error?`

**Sample code:**

```ballerina
smb:Error? result = check client->close();
```

</details>
