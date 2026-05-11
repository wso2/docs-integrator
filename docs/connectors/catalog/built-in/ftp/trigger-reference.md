# Triggers

The `ballerina/ftp` connector supports event-driven file processing through a polling-based listener. The `ftp:Listener` periodically monitors a configured directory on a remote FTP/SFTP server for file changes and delivers new file content to your service callbacks in the format you choose (bytes, text, JSON, XML, or CSV).

The connector exposes several components:
| Component | Role |
|-----------|------|
| `ftp:Listener` | Polls a remote FTP/SFTP directory at a configurable interval and detects new or deleted files. |
| `ftp:Service` | Hosts one or more remote functions that are invoked on file events. Multiple format-specific handlers can be combined on a single service to route different file types to different methods.|
| `ftp:Caller` | An FTP client passed to callbacks, enabling additional file operations (read, write, move, delete) within the handler. |
| `ftp:FileInfo` | Metadata record describing a remote file such as path, name, size, timestamps, and attributes. |

For action-based operations, see the [Action Reference](action-reference.md).

---

## Listener

The `ftp:Listener` establishes the connection and manages event subscriptions.

### Configuration

The listener supports the following connection strategy:

| Config Type | Description |
|-------------|-------------|
| `ListenerConfiguration` | Configuration for the FTP/SFTP listener including connection details, authentication, and polling settings. |

**`ListenerConfiguration` fields:**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `protocol` | <code>Protocol</code> | `FTP` | The file transfer protocol to use (`FTP`, `FTPS`, or `SFTP`). |
| `host` | <code>string</code> | `"127.0.0.1"` | Hostname or IP address of the FTP server. |
| `port` | <code>int</code> | `21` | Port number of the FTP server. Typically `21` for FTP and FTPS explicit, and `990` for FTPS implicit.|
| `auth` | <code>AuthConfiguration</code> | `()` | Authentication settings, including credentials, SSH private key (SFTP), SSL/TLS configuration (FTPS), and preferred SFTP authentication methods. |
| `pollingInterval` | <code>decimal</code> | `60.0` | Interval in seconds between directory polls. |
| `userDirIsRoot` | <code>boolean</code> | `false` | Whether to treat the user's home directory as the root directory. |
| `laxDataBinding` | <code>boolean</code> | `false` | When `true`, enables relaxed data binding for JSON/XML: `null` values map to optional fields and missing fields map to `null` values. |
| `connectTimeout` | <code>decimal</code> | `30.0` | Connection timeout in seconds. |
| `socketConfig` | <code>SocketConfig</code> | `()` | Per-protocol socket timeouts: `ftpDataTimeout` (FTP data), `ftpSocketTimeout` (FTP control), and `sftpSessionTimeout` (SFTP session). |
| `fileTransferMode` | <code>FileTransferMode</code> | `BINARY` | File transfer mode (`BINARY` or `ASCII`). |
| `retryConfig` | <code>RetryConfig</code> | `()` | Retry configuration for transient failures during file content retrieval. When set, failed reads are retried with exponential backoff before the error reaches the handler or `onError`. Polling itself is not retried. |
| `proxy` | <code>ProxyConfiguration</code> | `()` | Proxy / jump-host configuration (SFTP only). |
| `sftpCompression` | <code>TransferCompression[]</code> | `[NO]` | Compression algorithms to negotiate (`ZLIB`, `ZLIBOPENSSH`, `NO`) (SFTP only). |
| `sftpSshKnownHosts` | <code>string</code> | `()` | Path to the SSH `known_hosts` file used for host key verification (SFTP only). |
| `csvFailSafe` | <code>FailSafeOptions</code> | `()` | Fail-safe CSV processing for `onFileCsv`. When set, malformed rows are skipped and logged to a separate file in the current working directory instead of failing the handler. |
| `coordination` | <code>CoordinationConfig</code> | `()` | Distributed task coordination. When set, multiple listener members coordinate so that only one polls at a time and the others act as warm standby. |

The deprecated fields `path`, `fileNamePattern`, `fileAgeFilter`, and `fileDependencyConditions` still exist on `ListenerConfiguration` but should not be used in new code. Configure these on the service via `@ftp:ServiceConfig` instead, see [File Dependency and Trigger Conditions](dependency-and-trigger-conditions.md).

### Initializing the listener

**Using FTP with username and password:**

```ballerina
import ballerina/ftp;

configurable string host = ?;
configurable int port = ?;
configurable string username = ?;
configurable string password = ?;

listener ftp:Listener ftpListener = check new (
    protocol = ftp:FTP,
    host = host,
    port = port,
    auth = {
        credentials: {
            username: username,
            password: password
        }
    },
    pollingInterval = 10.0
);
```

**Using SFTP with private key authentication:**

```ballerina
import ballerina/ftp;

configurable string host = ?;
configurable int port = ?;
configurable string username = ?;
configurable string privateKeyPath = ?;
configurable string privateKeyPassword = ?;

listener ftp:Listener sftpListener = check new (
    protocol = ftp:SFTP,
    host = host,
    port = port,
    auth = {
        credentials: {
            username: username
        },
        privateKey: {
            path: privateKeyPath,
            password: privateKeyPassword
        }
    },
    pollingInterval = 10.0
);
```

---

## Service

An `ftp:Service` is a Ballerina service attached to an `ftp:Listener`. It monitors a configured directory on the remote server using the `@ftp:ServiceConfig` annotation and implements one callback to handle file events. Choose the callback that matches the format you want to receive file content in.

### Callback signatures

`fileInfo` and `caller` are independently optional in the declaration. Valid `onFile` shapes include `(content)`, `(content, fileInfo)`, `(content, caller)`, and `(content, fileInfo, caller)`. When both `fileInfo` and `caller` are declared, they must appear in that order. The compiler plugin rejects other orderings.

| Function | Signature | Description |
|----------|-----------|-------------|
| `onFile` | <code>remote function onFile(byte[]&#124;stream&lt;byte[], error?&gt; content, ftp:FileInfo fileInfo, ftp:Caller caller) returns error?</code> | Invoked for each new file detected in a polling cycle. Content is delivered as a `byte[]` for in-memory handling, or as `stream<byte[], error?>` for streaming large files. `fileInfo` and `caller` are both optional.|
| `onFileText` | <code>remote function onFileText(string content, ftp:FileInfo fileInfo, ftp:Caller caller) returns error?</code> | Invoked for each new file detected in a polling cycle, delivering content as a string. `fileInfo` and `caller` are both optional.|
| `onFileJson` | <code>remote function onFileJson(json&#124;record {} content, ftp:FileInfo fileInfo, ftp:Caller caller) returns error?</code> | Invoked for each new file detected in a polling cycle. Content is delivered as a `json` value or bound to a user-defined `record` type. `fileInfo` and `caller` are both optional. |
| `onFileXml` | <code>remote function onFileXml(xml&#124;record {} content, ftp:FileInfo fileInfo, ftp:Caller caller) returns error?</code> | Invoked for each new file detected in a polling cycle. Content is delivered as an `xml` value or bound to a user-defined `record` type. `fileInfo` and `caller` are both optional. |
| `onFileCsv` | <code>remote function onFileCsv(string[][]&#124;record {}[]&#124;stream&lt;string[], error?&gt;&#124;stream&lt;record {}, error?&gt; content, ftp:FileInfo fileInfo, ftp:Caller caller) returns error?</code> | Invoked for each new CSV file detected in a polling cycle. Content can be delivered as `string[][]`, `record[]`, or as a stream of either. Pick the array form for small files and the stream form for large datasets. `fileInfo` and `caller` are both optional. |
| `onFileDelete` | <code>remote function onFileDelete(string deletedFile, ftp:Caller caller) returns error?</code> | Invoked once per file detected as deleted in a polling cycle, receiving the deleted file's path. `caller` is optional. |
| `onError` | <code>remote function onError(ftp:Error err, ftp:Caller caller) returns error?</code> | Invoked when the runtime cannot bind a file's content to the typed parameter of a format-specific handler. For example, an `onFileJson` handler receiving malformed JSON. `caller` is optional. |

The `|` in the content parameter lists the supported alternative types. The parameter should only be decalred with **one** of them. For example, `onFile` can be declared with `byte[]` *or* `stream<byte[], error?>`, not both at once.

Multiple format-specific handlers (`onFile`, `onFileText`, `onFileJson`, `onFileXml`, `onFileCsv`) can coexist on the same service to route different file types to different methods using `@ftp:FunctionConfig`'s `fileNamePattern`. `onFileDelete` and `onError`can be added alongside any of them.

### Full usage example

```ballerina
import ballerina/ftp;
import ballerina/log;

configurable string host = ?;
configurable int port = ?;
configurable string username = ?;
configurable string password = ?;

listener ftp:Listener sftpListener = check new (
    protocol = ftp:SFTP,
    host = host,
    port = port,
    auth = {
        credentials: {
            username: username,
            password: password
        }
    },
    pollingInterval = 10.0
);

@ftp:ServiceConfig {
    path: "/home/user/incoming"
}
service "FileProcessor" on sftpListener {

    @ftp:FunctionConfig {
        fileNamePattern: ".*\\.csv",
        afterProcess: ftp:DELETE
    }
    remote function onFileCsv(stream<string[], error?> csvStream, ftp:FileInfo fileInfo)
            returns error? {
        log:printInfo("Processing CSV: " + fileInfo.name);
        check from string[] row in csvStream
            do {
                log:printInfo("Row: " + row.toString());
            };
    }

    @ftp:FunctionConfig {
        fileNamePattern: ".*\\.json"
    }
    remote function onFileJson(json content, ftp:FileInfo fileInfo, ftp:Caller caller)
            returns error? {
        log:printInfo("Processing JSON: " + fileInfo.name);
        check caller->move(fileInfo.pathDecoded,
                "/home/user/archive/" + fileInfo.name);
    }

    remote function onFileDelete(string deletedFile) returns error? {
        log:printInfo("File deleted: " + deletedFile);
    }

    remote function onError(ftp:Error err) returns error? {
        log:printError("Failed to process file", 'error = err);
    }
}
```

Use the `@ftp:ServiceConfig` annotation to specify the `path` to monitor and an optional `fileNamePattern` regex to filter files. You can also use `@ftp:FunctionConfig` on individual callbacks to set per-function file patterns and post-processing actions (`afterProcess` and `afterError`, which can be `MOVE` or `DELETE`).

### Post-processing for `onError`

Declaring `onError` overrides the content method's `afterError` action. Only `@ftp:FunctionConfig` annotations on `onError` itself are honoured. To quarantine files that fail binding, set both `afterProcess` (runs when `onError` returns successfully) and `afterError` (runs if `onError` itself returns an error):

```ballerina
@ftp:FunctionConfig {
    afterProcess: { moveTo: "/home/user/quarantine" },
    afterError: { moveTo: "/home/user/quarantine" }
}
remote function onError(ftp:Error err) returns error? {
    log:printError("Could not parse file; quarantining", 'error = err);
}
```

If onError is not declared, the runtime falls back to the content method's afterError action. So simple cases can configure quarantine on onFileJson / onFileCsv directly without an onError handler.

---

## Supporting types

### `WatchEvent`

| Field | Type | Description |
|-------|------|-------------|
| `addedFiles` | <code>FileInfo[]</code> | Array of metadata records for files that were added since the last poll. |
| `deletedFiles` | <code>string[]</code> | Array of file paths that were deleted since the last poll. |

### `FileInfo`

| Field | Type | Description |
|-------|------|-------------|
| `path` | <code>string</code> | The relative path of the file on the remote server. |
| `pathDecoded` | <code>string</code> | Normalized absolute path within the file system. Prefer this over `path` when passing to `ftp:Caller` operations. |
| `name` | <code>string</code> | The file name (without path). |
| `size` | <code>int</code> | The file size in bytes. |
| `fileType` | <code>string</code> | MIME type or file classification reported by the underlying VFS. |
| `depth` | <code>int</code> | Directory nesting level within the file system. |
| `lastModifiedTimestamp` | <code>int</code> | The Unix timestamp (milliseconds) of the last modification. |
| `isFolder` | <code>boolean</code> | `true` if the entry is a directory. |
| `isFile` | <code>boolean</code> | `true` if the entry is a regular file. |
| `isReadable` | <code>boolean</code> | `true` if the file is readable. |
| `isWritable` | <code>boolean</code> | `true` if the file is writable. |
| `isExecutable` | <code>boolean</code> | `true` if the file is executable. |
| `isHidden` | <code>boolean</code> | `true` if the file is hidden. |
| `extension` | <code>string</code> | The file extension. |
| `uri` | <code>string</code> | Raw URI of the file as reported by the underlying VFS. |
| `publicURIString` | <code>string</code> | Public-display URI of the file (suitable for logging or external display). |
| `friendlyURI` | <code>string</code> | Human-readable URI with authentication details stripped. |
| `rootURI` | <code>string</code> | URI of the root of the file system the file belongs to. |
| `scheme` | <code>string</code> | URI scheme (for example, `ftp`, `sftp`, `ftps`). |

### `AuthConfiguration`

| Field | Type | Description |
|-------|------|-------------|
| `credentials` | <code>Credentials</code> | Username and password credentials for authentication. |
| `privateKey` | <code>PrivateKey</code> | SSH private key configuration for SFTP authentication. |
| `secureSocket` | <code>SecureSocket</code> | SSL/TLS configuration for FTPS connections. |
| `preferredMethods` | <code>PreferredMethod[]</code> | Preferred authentication methods in order of priority (default: `[PUBLICKEY, PASSWORD]`). |

### `Credentials`

| Field | Type | Description |
|-------|------|-------------|
| `username` | <code>string</code> | The username for authentication. |
| `password` | <code>string</code> | The password for authentication. Optional, omit when authenticating with a private key only.|

### `PrivateKey`

| Field | Type | Description |
|-------|------|-------------|
| `path` | <code>string</code> | Path to the SSH private key file. |
| `password` | <code>string</code> | Passphrase for the private key. Optional, omit if the key is unencrypted.|
