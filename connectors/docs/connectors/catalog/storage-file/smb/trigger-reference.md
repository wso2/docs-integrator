---
title: Triggers
---

# Triggers

The SMB listener polls a directory on a share at a configurable interval and dispatches each file it finds to the matching handler on an attached service. When a tracked file disappears, the deletion handler is called instead.

Three components work together:

| Component | Role |
|-----------|------|
| `smb:Listener` | Polls the share on a schedule and routes file events to services |
| `smb:Service` | Declares the handler methods that receive file content and metadata |
| `smb:Caller` | The share connection passed to a handler, allowing it to read or write other files while processing the current one |

For action-based operations, see the [Action Reference](action-reference.md).

---

## Listener

The `smb:Listener` establishes the connection and manages the polling schedule.

### Configuration

**`ListenerConfiguration` fields:**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `host` | <code>string</code> | <code>"localhost"</code> | Target SMB server hostname or IP address |
| `port` | <code>int</code> | <code>445</code> | Port number of the SMB service |
| `share` | <code>string</code> | Required | SMB share name to connect to |
| `auth` | <code>AuthConfiguration</code> | — | Authentication credentials for the SMB connection |
| `fileNamePattern` | <code>string</code> | — | Regular expression a file name must match to trigger any handler |
| `pollingInterval` | <code>decimal</code> | <code>60</code> | Seconds between directory polls |
| `dialects` | <code>Dialect[]</code> | All dialects | SMB protocol dialects to negotiate, in order of preference |
| `signRequired` | <code>boolean</code> | <code>false</code> | Whether SMB message signing is required |
| `encryptData` | <code>boolean</code> | <code>false</code> | Whether to encrypt SMB data |
| `enableDfs` | <code>boolean</code> | <code>false</code> | Whether to enable Distributed File System (DFS) support |
| `bufferSize` | <code>int</code> | <code>65536</code> | Buffer size for read/write operations in bytes |
| `connectTimeout` | <code>decimal</code> | <code>30.0</code> | Connection timeout in seconds |
| `laxDataBinding` | <code>boolean</code> | <code>false</code> | Whether to relax data binding for XML, JSON, and CSV content |
| `csvFailSafe` | <code>FailSafeOptions</code> | — | Skip malformed CSV rows and log them instead of failing the operation |

### Initializing the listener

**NTLMv2 credentials:**

```ballerina
listener smb:Listener smbListener = check new ({
    host: "smb.example.com",
    share: "reports",
    pollingInterval: 10,
    auth: {
        credentials: {
            username: "alice",
            password: "***",
            domain: "WORKGROUP"
        }
    }
});
```

**Kerberos authentication:**

```ballerina
listener smb:Listener smbListener = check new ({
    host: "smb.example.com",
    share: "reports",
    auth: {
        kerberosConfig: {
            principal: "alice@EXAMPLE.COM",
            keytab: "/path/to/alice.keytab",
            configFile: "/etc/krb5.conf"
        }
    }
});
```

**With CSV fail-safe enabled:**

```ballerina
listener smb:Listener smbListener = check new ({
    host: "smb.example.com",
    share: "reports",
    csvFailSafe: {contentType: smb:RAW_AND_METADATA}
});
```

---

## Service

A service is attached to the listener via `on smbListener` and watches one directory. The `@smb:ServiceConfig` annotation sets the directory path. The listener descends into subdirectories of that path.

A service must declare at least one `onFile*` or `onFileDelete` method.

### Callbacks

The listener picks the handler that matches the incoming file's extension, reads the file, and binds its content to the type declared by the first parameter. If no matching handler is declared, the file falls through to `onFile`.

| Callback | Matched extensions | Accepted content types |
|----------|--------------------|----------------------|
| `onFileText` | `.txt`, `.log`, `.md` | `string` |
| `onFileJson` | `.json` | `json`, a record type |
| `onFileXml` | `.xml` | `xml`, a record type |
| `onFileCsv` | `.csv` | `string[][]`, a record array, <code>stream&lt;string[], error?&gt;</code>, a stream of records |
| `onFile` | Everything else; fallback for the above | `byte[]`, <code>stream&lt;byte[], error?&gt;</code> |
| `onFileDelete` | (file deleted) | `string` path of the deleted file |
| `onError` | (listener or handler error) | `error` or `smb:Error` |

After the content parameter, any handler may declare up to two additional parameters in either order:

- `smb:FileInfo` — name, path, size, timestamps, and attributes of the file
- `smb:Caller` — the share connection, for reading or writing other files during processing

`onFileDelete` does not receive `smb:FileInfo` (the file is already gone); it may receive an optional `smb:Caller`.

Individual handlers can be annotated with `@smb:FunctionConfig` to set a per-handler file name pattern and post-processing actions (`afterProcess` and `afterError` accept `smb:DELETE` or a `smb:Move` record with a `moveTo` destination path).

### Full example

```ballerina
import ballerina/log;
import ballerina/smb;

listener smb:Listener smbListener = check new ({
    host: "smb.example.com",
    share: "reports",
    pollingInterval: 10,
    auth: {
        credentials: {
            username: "alice",
            password: "***",
            domain: "WORKGROUP"
        }
    }
});

type SalesReport record {|
    string storeId;
    string storeLocation;
    string saleDate;
|};

@smb:ServiceConfig {
    path: "/sales/new"
}
service "salesProcessor" on smbListener {

    @smb:FunctionConfig {
        afterProcess: {moveTo: "/sales/processed"},
        afterError: {moveTo: "/sales/failed"}
    }
    remote function onFileJson(SalesReport report, smb:Caller caller, smb:FileInfo fileInfo) returns error? {
        log:printInfo(string `Processing ${fileInfo.name} for store ${report.storeId}`);
        check caller->putText("/sales/audit.log", fileInfo.name + "\n", smb:APPEND);
    }

    remote function onFile(stream<byte[], error?> content, smb:FileInfo fileInfo) returns error? {
        int total = 0;
        check from byte[] chunk in content
            do { total += chunk.length(); };
        log:printInfo(string `${fileInfo.name}: ${total} bytes (unrecognized format)`);
    }

    remote function onFileDelete(string path, smb:Caller caller) returns error? {
        check caller->putText("/sales/deletions.log", path + "\n", smb:APPEND);
    }

    remote function onError(smb:Error err) returns error? {
        log:printError("SMB listener failure", err);
    }
}
```

---

## Supporting Types

### `FileInfo`

| Field | Type | Description |
|-------|------|-------------|
| `name` | `string` | Name of the file or directory |
| `path` | `string` | Relative file path on the share |
| `size` | `int` | Size of the file in bytes |
| `modifiedAt` | `time:Utc` | Last modified time in UTC |
| `createdAt` | `time:Utc` | File creation time in UTC |
| `accessedAt` | `time:Utc` | Last access time in UTC |
| `writtenAt` | `time:Utc` | Last write time in UTC |
| `isDirectory` | `boolean` | `true` if the resource is a directory |
| `extension` | `string` | File name extension |
| `isExecutable` | `boolean` | `true` if the file has execute permissions |
| `isHidden` | `boolean` | `true` if the file is marked as hidden |
| `isWritable` | `boolean` | `true` if the file has write permissions |
| `uri` | `string` | Absolute URI of the file |

### `AuthConfiguration`

| Field | Type | Description |
|-------|------|-------------|
| `credentials` | `Credentials` | NTLMv2 username, password, and domain |
| `kerberosConfig` | `KerberosConfig` | Kerberos principal and keytab configuration |

### `Credentials`

| Field | Type | Description |
|-------|------|-------------|
| `username` | `string` | Username for SMB authentication |
| `password` | `string` | Password for SMB authentication |
| `domain` | `string` | Domain for domain-based authentication (default: `"WORKGROUP"`) |

### `KerberosConfig`

| Field | Type | Description |
|-------|------|-------------|
| `principal` | `string` | Kerberos principal name in `user@REALM` format |
| `keytab` | `string` | Path to the keytab file; the password is used when not provided |
| `configFile` | `string` | Path to the Kerberos configuration file (`krb5.conf`) |

### `FailSafeOptions`

| Field | Type | Description |
|-------|------|-------------|
| `contentType` | <code>METADATA &#124; RAW &#124; RAW_AND_METADATA</code> | What to record in the error log for each skipped CSV row (default: `METADATA`) |
