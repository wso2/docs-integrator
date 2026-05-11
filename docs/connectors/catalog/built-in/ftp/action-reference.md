# Actions

The `ballerina/ftp` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Connects to FTP/FTPS/SFTP servers for file read/write, directory management, and file operations. |

For event-driven integration, see the [Trigger Reference](trigger-reference.md).

---

## Client

Connects to FTP/FTPS/SFTP servers for file read/write, directory management, and file operations.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `protocol` | <code>Protocol</code> | `FTP` | The file transfer protocol to use (`FTP`, `FTPS`, or `SFTP`). |
| `host` | <code>string</code> | `"127.0.0.1"` | Hostname or IP address of the FTP server. |
| `port` | <code>int</code> | `21` | Port number of the FTP server. |
| `auth` | <code>AuthConfiguration</code> | `()` | Authentication configuration including credentials, private key, and secure socket settings. |
| `userDirIsRoot` | <code>boolean</code> | `false` | Whether to treat the user's home directory as the root directory. |
| `laxDataBinding` | <code>boolean</code> | `false` | If true, enables relaxed data binding: null values in JSON/XML map to optional fields, and missing fields map to null values. |
| `connectTimeout` | <code>decimal</code> | `30.0` | Connection timeout in seconds. |
| `socketConfig` | <code>SocketConfig</code> | `()` | Socket timeout configuration for FTP data, FTP socket, and SFTP session timeouts. |
| `proxy` | <code>ProxyConfiguration</code> | `()` | Proxy server configuration for the connection (SFTP only). |
| `fileTransferMode` | <code>FileTransferMode</code> | `BINARY` | File transfer mode (`BINARY` or `ASCII`) (FTP only). |
| `sftpCompression` | <code>TransferCompression[]</code> | `[NO]` | Compression algorithms for SFTP transfers (`ZLIB`, `ZLIBOPENSSH`, or `NO`). |
| `sftpSshKnownHosts` | <code>string</code> | `()` | Path to the SSH known hosts file for SFTP host key verification. |
| `csvFailSafe` | <code>FailSafeOptions</code> | `()` | Fail-safe CSV content processing. When set, malformed CSV records are skipped and written to a separate file in the current directory instead of failing the operation. |
| `retryConfig` | <code>RetryConfig</code> | `()` | Retry configuration for transient failures on non-streaming read operations (getBytes, getText, getJson, getXml, getCsv). If not specified, no retry is attempted. |
| `circuitBreaker` | <code>CircuitBreakerConfig</code> | `()` | Circuit breaker for client operations. When the failure ratio exceeds the configured threshold, the client fails fast without contacting the server until the breaker resets. |

### Initializing the client

```ballerina
import ballerina/ftp;

configurable string host = ?;
configurable int port = ?;
configurable string username = ?;
configurable string password = ?;

ftp:Client ftpClient = check new ({
    protocol: ftp:FTP,
    host: host,
    port: port,
    auth: {
        credentials: {
            username: username,
            password: password
        }
    }
});
```

### Operations

#### File reading

<details>
<summary>getBytes</summary>

Retrieves the content of a remote file as a byte array.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | <code>string</code> | Yes | The path of the remote file. |

**Returns:** `byte[]|Error`

**Sample code:**

```ballerina
byte[] content = check ftpClient->getBytes("/home/user/files/data.bin");
```

**Sample response:**

```ballerina
[72, 101, 108, 108, 111]
```

</details>

<details>
<summary>getText</summary>

Retrieves the content of a remote file as a string.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | <code>string</code> | Yes | The path of the remote file. |

**Returns:** `string|Error`

**Sample code:**

```ballerina
string content = check ftpClient->getText("/home/user/files/readme.txt");
```

**Sample response:**

```ballerina
"Hello, this is the content of the file."
```

</details>

<details>
<summary>getJson</summary>

Retrieves the content of a remote file as a JSON value with optional data binding to a record type.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | <code>string</code> | Yes | The path of the remote file. |
| `targetType` | <code>typedesc&lt;json&#124;record &#123;&#125;&gt;</code> | No | The target type for data binding. |

**Returns:** `targetType|Error`

**Sample code:**

```ballerina
json data = check ftpClient->getJson("/home/user/files/config.json");
```

**Sample response:**

```ballerina
{"name": "App Config", "version": "1.0", "debug": true}
```

</details>

<details>
<summary>getXml</summary>

Retrieves the content of a remote file as an XML value with optional data binding to a record type.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | <code>string</code> | Yes | The path of the remote file. |
| `targetType` | <code>typedesc&lt;xml&#124;record &#123;&#125;&gt;</code> | No | The target type for data binding. |

**Returns:** `targetType|Error`

**Sample code:**

```ballerina
xml data = check ftpClient->getXml("/home/user/files/data.xml");
```

**Sample response:**

```ballerina
<config><name>App Config</name><version>1.0</version></config>
```

</details>

<details>
<summary>getCsv</summary>

Retrieves the content of a remote CSV file with optional data binding to a record array type.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | <code>string</code> | Yes | The path of the remote CSV file. |
| `targetType` | <code>typedesc&lt;string[][]&#124;record &#123;&#125;[]&gt;</code> | No | The target type for data binding. |

**Returns:** `targetType|Error`

**Sample code:**

```ballerina
string[][] data = check ftpClient->getCsv("/home/user/files/report.csv");
```

**Sample response:**

```ballerina
[["Name", "Age", "City"], ["Alice", "30", "New York"], ["Bob", "25", "London"]]
```

</details>

<details>
<summary>getBytesAsStream</summary>

Retrieves the content of a remote file as a byte stream, suitable for large files.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | <code>string</code> | Yes | The path of the remote file. |

**Returns:** `stream<byte[], error?>|Error`

**Sample code:**

```ballerina
stream<byte[], error?> byteStream = check ftpClient->getBytesAsStream("/home/user/files/large-file.zip");
```

</details>

<details>
<summary>getCsvAsStream</summary>

Retrieves the content of a remote CSV file as a stream of rows, suitable for large files.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | <code>string</code> | Yes | The path of the remote CSV file. |
| `targetType` | <code>typedesc&lt;string[]&#124;record &#123;&#125;&gt;</code> | No | The target type for each row. |

**Returns:** `stream<targetType, error?>|Error`

**Sample code:**

```ballerina
stream<string[], error?> csvStream = check ftpClient->getCsvAsStream("/home/user/files/large-report.csv");
```

</details>

#### File writing

<details>
<summary>putBytes</summary>

Writes byte content to a remote file. Supports overwrite and append modes.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | <code>string</code> | Yes | The destination file path on the remote server. |
| `content` | <code>byte[]</code> | Yes | The byte content to write. |
| `option` | <code>FileWriteOption</code> | No | Write mode with `OVERWRITE` (default) or `APPEND`. |

**Returns:** `Error?`

**Sample code:**

```ballerina
check ftpClient->putBytes("/home/user/files/output.bin", [72, 101, 108, 108, 111]);
```

</details>

<details>
<summary>putText</summary>

Writes string content to a remote file. Supports overwrite and append modes.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | <code>string</code> | Yes | The destination file path on the remote server. |
| `content` | <code>string</code> | Yes | The text content to write. |
| `option` | <code>FileWriteOption</code> | No | Write mode with `OVERWRITE` (default) or `APPEND`. |

**Returns:** `Error?`

**Sample code:**

```ballerina
check ftpClient->putText("/home/user/files/readme.txt", "Hello, World!");
```

</details>

<details>
<summary>putJson</summary>

Writes JSON content to a remote file. Supports overwrite and append modes.

Note that APPEND performs raw text concatenation, which can produce invalid JSON/XML. Use OVERWRITE unless you specifically intend to concatenate text fragments.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | <code>string</code> | Yes | The destination file path on the remote server. |
| `content` | <code>json&#124;record &#123;&#125;</code> | Yes | The JSON content to write. |
| `option` | <code>FileWriteOption</code> | No | Write mode with `OVERWRITE` (default) or `APPEND`. |

**Returns:** `Error?`

**Sample code:**

```ballerina
check ftpClient->putJson("/home/user/files/config.json", {"name": "App", "version": "2.0"});
```

</details>

<details>
<summary>putXml</summary>

Writes XML content to a remote file. Supports overwrite and append modes.

Note that APPEND performs raw text concatenation, which can produce invalid JSON/XML. Use OVERWRITE unless you specifically intend to concatenate text fragments.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | <code>string</code> | Yes | The destination file path on the remote server. |
| `content` | <code>xml&#124;record &#123;&#125;</code> | Yes | The XML content to write. |
| `option` | <code>FileWriteOption</code> | No | Write mode with `OVERWRITE` (default) or `APPEND`. |

**Returns:** `Error?`

**Sample code:**

```ballerina
check ftpClient->putXml("/home/user/files/data.xml", xml `<config><name>App</name></config>`);
```

</details>

<details>
<summary>putCsv</summary>

Writes CSV content to a remote file. Supports overwrite and append modes.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | <code>string</code> | Yes | The destination file path on the remote server. |
| `content` | <code>string[][]&#124;record &#123;&#125;[]</code> | Yes | The CSV content as a 2D string array or record array. |
| `option` | <code>FileWriteOption</code> | No | Write mode with `OVERWRITE` (default) or `APPEND`. |

**Returns:** `Error?`

**Sample code:**

```ballerina
check ftpClient->putCsv("/home/user/files/report.csv", [
    ["Name", "Age", "City"],
    ["Alice", "30", "New York"],
    ["Bob", "25", "London"]
]);
```

</details>

<details>
<summary>putBytesAsStream</summary>

Writes a byte stream to a remote file, suitable for large files.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | <code>string</code> | Yes | The destination file path on the remote server. |
| `content` | <code>stream&lt;byte[], error?&gt;</code> | Yes | The byte stream to write. |
| `option` | <code>FileWriteOption</code> | No | Write mode with `OVERWRITE` (default) or `APPEND`. |

**Returns:** `Error?`

**Sample code:**

```ballerina
stream<byte[], error?> byteStream = check ftpClient->getBytesAsStream("/home/user/files/source.dat");
check ftpClient->putBytesAsStream("/home/user/files/destination.dat", byteStream);
```

</details>

<details>
<summary>putCsvAsStream</summary>

Writes a CSV stream to a remote file, suitable for large datasets.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | <code>string</code> | Yes | The destination file path on the remote server. |
| `content` | <code>stream&lt;string[]&#124;record &#123;&#125;, error?&gt;</code> | Yes | The CSV row stream to write. |
| `option` | <code>FileWriteOption</code> | No | Write mode with `OVERWRITE` (default) or `APPEND`. |

**Returns:** `Error?`

**Sample code:**

```ballerina
stream<string[], error?> csvStream = check ftpClient->getCsvAsStream("/home/user/files/source.csv");
check ftpClient->putCsvAsStream("/home/user/files/destination.csv", csvStream);
```

</details>

#### Directory operations

<details>
<summary>list</summary>

Lists the files and directories in the specified remote directory.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | <code>string</code> | Yes | The path of the remote directory. |

**Returns:** `FileInfo[]|Error`

**Sample code:**

```ballerina
ftp:FileInfo[] files = check ftpClient->list("/home/user/files");
```

**Sample response:**

```ballerina
[{"path": "/home/user/files/readme.txt", "size": 1024, "lastModifiedTimestamp": 1711324800000, "name": "readme.txt", "isFolder": false, "isFile": true}, {"path": "/home/user/files/data", "size": 0, "lastModifiedTimestamp": 1711238400000, "name": "data", "isFolder": true, "isFile": false, ...}]
```

</details>

<details>
<summary>mkdir</summary>

Creates a new directory on the remote server.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | <code>string</code> | Yes | The path of the directory to create. |

**Returns:** `Error?`

**Sample code:**

```ballerina
check ftpClient->mkdir("/home/user/files/new-directory");
```

</details>

<details>
<summary>rmdir</summary>

Removes an empty directory from the remote server.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | <code>string</code> | Yes | The path of the directory to remove. |

**Returns:** `Error?`

**Sample code:**

```ballerina
check ftpClient->rmdir("/home/user/files/old-directory");
```

</details>

<details>
<summary>isDirectory</summary>

Checks whether the specified remote path is a directory.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | <code>string</code> | Yes | The remote path to check. |

**Returns:** `boolean|Error`

**Sample code:**

```ballerina
boolean isDir = check ftpClient->isDirectory("/home/user/files/data");
```

**Sample response:**

```ballerina
true
```

</details>

#### File management

<details>
<summary>rename</summary>

Renames a file or directory on the remote server.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `origin` | <code>string</code> | Yes | The current path of the file or directory. |
| `destination` | <code>string</code> | Yes | The new path for the file or directory. |

**Returns:** `Error?`

**Sample code:**

```ballerina
check ftpClient->rename("/home/user/files/old-name.txt", "/home/user/files/new-name.txt");
```

</details>

<details>
<summary>move</summary>

Moves a file from one location to another on the remote server.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sourcePath` | <code>string</code> | Yes | The current file path. |
| `destinationPath` | <code>string</code> | Yes | The target file path. |

**Returns:** `Error?`

**Sample code:**

```ballerina
check ftpClient->move("/home/user/inbox/report.csv", "/home/user/processed/report.csv");
```

</details>

<details>
<summary>copy</summary>

Copies a file from one location to another on the remote server.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sourcePath` | <code>string</code> | Yes | The source file path. |
| `destinationPath` | <code>string</code> | Yes | The destination file path. |

**Returns:** `Error?`

**Sample code:**

```ballerina
check ftpClient->copy("/home/user/files/report.csv", "/home/user/backup/report.csv");
```

</details>

<details>
<summary>delete</summary>

Deletes a file from the remote server.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | <code>string</code> | Yes | The path of the file to delete. |

**Returns:** `Error?`

**Sample code:**

```ballerina
check ftpClient->delete("/home/user/files/old-report.csv");
```

</details>

<details>
<summary>exists</summary>

Checks whether a file or directory exists at the specified remote path.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | <code>string</code> | Yes | The remote path to check. |

**Returns:** `boolean|Error`

**Sample code:**

```ballerina
boolean fileExists = check ftpClient->exists("/home/user/files/report.csv");
```

**Sample response:**

```ballerina
true
```

</details>

<details>
<summary>size</summary>

Retrieves the size of a remote file in bytes.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | <code>string</code> | Yes | The path of the remote file. |

**Returns:** `int|Error`

**Sample code:**

```ballerina
int fileSize = check ftpClient->size("/home/user/files/report.csv");
```

**Sample response:**

```ballerina
204800
```

</details>

#### Connection management

<details>
<summary>close</summary>

Closes the connection to the remote FTP/FTPS/SFTP server and releases resources.

**Returns:** `Error?`

**Sample code:**

```ballerina
check ftpClient->close();
```

</details>
