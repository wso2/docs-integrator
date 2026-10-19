# Triggers

The `ballerinax/azure.storage.files` connector supports event-driven file processing through a polling listener. The `files:Listener` periodically scans one watched path on an Azure file share and routes each file present there to the matching content handler of your service, delivering the content in the format you choose (bytes, text, JSON, XML, or CSV).

The connector exposes several components:

| Component | Role |
|-----------|------|
| `files:Listener` | Polls one watched path on a share at a fixed interval. |
| `files:Service` | Hosts the content handlers invoked for each dispatched file; the service's attach point is the watched path. |
| `files:Caller` | A client passed to handlers, enabling additional file operations (download, upload, move, delete) within the handler. |
| `files:FileInfo` | Metadata record describing the dispatched file, such as share name, path, name, size, and last-modified time. |

For action-based operations, see the [Action Reference](action-reference.md).

---

## Listener

The `files:Listener` holds the connection credentials and the polling schedule. It is bound to one share at initialization; the path to watch belongs to the service, not the listener.

### Configuration

| Config Type | Description |
|-------------|-------------|
| `ListenerConfiguration` | Configuration for the Azure Files listener, including authentication, polling cadence, data-binding behavior, and transport settings. |

**`ListenerConfiguration` fields:**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | <code>AuthConfig</code> | Required | The authentication configuration. Accepts any credential from the auth union; see the [Action Reference](action-reference.md#configuration) for the credential records. |
| `pollingInterval` | <code>decimal</code> | <code>60</code> | Interval in seconds between polls of the watched path. Must be greater than zero; the listener fails to initialize otherwise. |
| `retryConfig` | <code>RetryConfig</code> | <code>()</code> | Retry behavior for service requests; omit for the service defaults. |
| `transportConfig` | <code>TransportConfig</code> | <code>()</code> | HTTP transport settings (proxy, connection pool, TLS); omit for the defaults. |
| `laxDataBinding` | <code>boolean</code> | <code>false</code> | Relaxed data binding for the typed content handlers: JSON, XML, and CSV record binding treat a null value as an optional field and an absent field as a nilable field. |

### Initializing the listener

```ballerina
import ballerinax/azure.storage.files;

configurable string accountName = ?;
configurable string accountKey = ?;
configurable string shareName = ?;

listener files:Listener dropListener = new (shareName,
    auth = {accountName, accountKey},
    pollingInterval = 5
);
```

---

## Service

A `files:Service` is a Ballerina service attached to a `files:Listener`. The service's attach point is the watched path. A service declared as `service /invoices on dropListener` watches the `/invoices` directory of the share; the string form `service "/dir one/reports" on dropListener` covers names a resource path cannot express; a service with no attach point watches the share root. One listener accepts exactly one service; to watch several paths, run several listeners.

The optional `@files:ServiceConfig` annotation configures recursion, file-name filtering, and a minimum file age (see [Supporting types](#supporting-types)). It does not carry a path.

Files are routed to handlers by file extension: `.txt` to `onFileText`, `.json` to `onFileJson`, `.xml` to `onFileXml`, and `.csv` to `onFileCsv`. A per-handler `@files:FunctionConfig` with a `fileNamePattern` overrides extension routing. A file whose extension maps to a handler the service does not declare falls back to `onFile`; if `onFile` is also absent, the file is skipped and logged. At most one handler runs per file.

Delivery is at-least-once: the listener keeps no per-file state, so a file that stays on the watched path fires again on every poll. Handlers consume files by deleting or moving them out of the watched path, either through the `Caller` or with the `@files:FunctionConfig` auto-consume actions. One file is never dispatched twice at once; at most one invocation runs per path at a time, even across an overwrite. A file overwritten while its handler is still running is picked up on a later poll, once the in-flight invocation finishes. For exactly-once effects, make handlers idempotent or claim each file by renaming it out of the watched path before processing. A file that is listed but cannot be read is also left in place and retried on the next poll, notifying `onError` each time.

The `byte[]` form of `onFile` loads the whole file into memory; prefer the stream form or a narrower watch for large files. Each poll with `recursive: true` issues a full recursive listing and downloads every dispatched file, so at scale, widen `pollingInterval`, narrow the watched path, or add a `fileNamePattern`. A file still being written over SMB or NFS can be picked up mid-write; set `minFileAgeSeconds` to guard against partial writes.

### Callback signatures

| Function | Signature | Description |
|----------|-----------|-------------|
| `onFile` | <code>remote function onFile(byte[] content, files:FileInfo file, files:Caller caller) returns error?</code> | Invoked for a dispatched file, delivering the raw content. Also accepts the content as <code>stream&lt;byte[], error?&gt;</code> for streaming large files. |
| `onFileText` | <code>remote function onFileText(string content, files:FileInfo file, files:Caller caller) returns error?</code> | Invoked for a dispatched `.txt` file, delivering the content as a string. |
| `onFileJson` | <code>remote function onFileJson(json content, files:FileInfo file, files:Caller caller) returns error?</code> | Invoked for a dispatched `.json` file, delivering the parsed content. Also binds to a user-defined record. |
| `onFileXml` | <code>remote function onFileXml(xml content, files:FileInfo file, files:Caller caller) returns error?</code> | Invoked for a dispatched `.xml` file, delivering the document. Also binds to a user-defined record. |
| `onFileCsv` | <code>remote function onFileCsv(MyRow[] content, files:FileInfo file, files:Caller caller) returns error?</code> | Invoked for a dispatched `.csv` file, delivering the rows bound to a string matrix or a record array. Also binds to a stream of either row form. |
| `onError` | <code>remote function onError(files:Error err, files:Caller caller) returns error?</code> | Invoked when a poll fails, when a listed file's content cannot be read, or when a file's content cannot be bound to the typed parameter of a content handler. Declaring it also makes it responsible for consuming files that fail to bind; see [Error handling](#error-handling). |

The trailing parameters are optional. A content handler declares its content parameter first, then either, both, or neither of `FileInfo` and `Caller`, so the accepted shapes are `(content)`, `(content, FileInfo)`, `(content, Caller)`, and `(content, FileInfo, Caller)`; when both are present, `FileInfo` must precede `Caller`. `onError` accepts `(error)` or `(error, Caller)`. Its first parameter must be declared as `error` or `files:Error`; a narrower subtype such as `files:ContentBindingError` is rejected at compile time, because `onError` has to be able to receive poll, read, and binding failures alike.

Each content parameter is declared with exactly one of its accepted types. `onFile` takes `byte[]` or `stream<byte[], error?>`. `onFileJson` takes a `json` value or a record. `onFileXml` takes `xml` or a record. `onFileCsv` takes a string matrix (`string[][]`), a record array, a `stream<string[], error?>`, or a `stream<record {}, error?>`. The record forms map each row's fields through the file's first row, the header; the string forms keep every row of the file, the header row included.

### Full usage example

```ballerina
import ballerina/log;

import ballerinax/azure.storage.files;

configurable string accountName = ?;
configurable string accountKey = ?;
configurable string shareName = ?;

// The shape a dropped .json file binds to.
type Person record {|
    string name;
    int age;
|};

listener files:Listener dropListener = new (shareName,
    auth = {accountName, accountKey},
    pollingInterval = 5
);

// The attach point is the watched path: this service watches "/incoming".
service /incoming on dropListener {

    // A .json file binds to Person and is deleted once processed.
    @files:FunctionConfig {afterProcess: files:DELETE}
    remote function onFileJson(Person person, files:FileInfo file, files:Caller caller) returns error? {
        log:printInfo("processed JSON drop", fileName = file.name, personName = person.name);
    }

    // Every other file arrives as raw bytes and moves to /processed afterwards.
    @files:FunctionConfig {afterProcess: {moveTo: "/processed"}}
    remote function onFile(byte[] content, files:FileInfo file, files:Caller caller) returns error? {
        log:printInfo("processed file drop", fileName = file.name, sizeBytes = content.length());
    }

    // Notified on poll failures, read failures, and content-binding failures. Because onError
    // is declared, it owns the fate of a .json drop that fails to bind: this annotation moves
    // it to /failed so it stops re-firing.
    @files:FunctionConfig {afterProcess: {moveTo: "/failed"}}
    remote function onError(files:Error err) returns error? {
        log:printError("drop-folder listener reported an error", 'error = err);
    }
}
```

`@files:FunctionConfig`'s `afterProcess` and `afterError` auto-consume a file after its handler runs: `files:DELETE` deletes it, and a `Move` record (`{moveTo: "/processed"}`) moves it. `afterProcess` runs when the handler returns normally, and `afterError` when the handler returns an error. `afterError` also covers a typed handler's content-binding failures, but only when the service declares no `onError`; with `onError` declared, binding failures are consumed by `onError`'s own annotation instead. Without a matching action, the file stays on the watched path and fires again on the next poll.

A step-by-step walkthrough of building this integration in the WSO2 Integrator IDE is in the [Example](example.md) page.

### Error handling

A service may declare an `onError` handler. It is notified on every listener-side failure:

- A failed poll, with the mapped typed error, for example an `AuthorizationError` when the credential lacks access to the watched path.
- A failed content read, also with the mapped typed error: the file was listed, but its content could not be downloaded for dispatch. The file stays on the watched path, so the notification repeats while the read keeps failing.
- A typed handler's content-binding failure, with a [`ContentBindingError`](#contentbindingerror) whose detail names the file.

A malformed file routed to a typed handler is a content-binding error; it never falls through to `onFile`. Errors a content handler itself returns do not notify `onError`, and neither does a CSV row that fails to bind lazily while a handler drains a record stream: that error belongs to the handler doing the draining. `onError` is not a content handler, so it does not satisfy the service's at-least-one-handler requirement.

Declaring `onError` hands it ownership of binding failures. The content handler's `afterError` no longer applies to a binding failure; the file's fate follows `onError`'s own `@files:FunctionConfig` instead, with `afterProcess` when `onError` returns normally and `afterError` when it returns an error or panics. An error returned by `onError` is never propagated, but it is not inert either: it is printed, and it selects `afterError`.

An `onError` with no `@files:FunctionConfig` leaves the file on the watched path, so the same malformed file is redelivered on every poll. Give `onError` an `afterProcess` action whenever the service relies on automatic consumption of files that fail to bind.

The consume actions on `onError` cover binding failures only. A file whose content could not be read is always left for the next poll, whatever `onError` returns, so a transient read failure never discards content. A `fileNamePattern` in `onError`'s annotation is ignored, because `onError` is never routed a file.

A credential that cannot list the watched path does not fail at attach time; the first poll surfaces the `AuthorizationError`. Polling keeps its configured interval after a failure, so the next scheduled poll scans again.

---

## Supporting types

### `FileInfo`

| Field | Type | Description |
|-------|------|-------------|
| `shareName` | <code>string</code> | The name of the share the file lives on. |
| `path` | <code>string</code> | The share-relative path of the file, for example `/dir1/dir2/file.ext`. |
| `name` | <code>string</code> | The file name only, without the directory component. |
| `sizeBytes` | <code>int</code> | The file size in bytes. |
| `eTag` | <code>string</code> | The entity tag of the file. |
| `lastModified` | <code>time:Utc</code> | The last-modified time (UTC). |

### `ServiceConfiguration`

The type of the optional `@files:ServiceConfig` annotation on the service.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `recursive` | <code>boolean</code> | <code>true</code> | Whether the service watches subdirectories under the watched path. |
| `fileNamePattern` | <code>string</code> | <code>()</code> | A regular expression matched against the file name (not the path); non-matching files are never dispatched to this service. An invalid pattern fails when the service is attached. |
| `minFileAgeSeconds` | <code>decimal</code> | <code>()</code> | Skip files younger than this many seconds, guarding against files still being written. |

### `FunctionConfiguration`

The type of the optional `@files:FunctionConfig` annotation on individual handlers. It also applies to `onError`, where the consume actions dispose of the binding failures it handles.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `fileNamePattern` | <code>string</code> | <code>()</code> | Per-handler routing override: a regular expression matched against the file name. Ignored on `onError`, which is never routed a file. |
| `afterProcess` | <code>DELETE&#124;Move</code> | <code>()</code> | Auto-consume action after the handler returns normally. On `onError`, it applies when `onError` returns normally, meaning it handled the binding failure. |
| `afterError` | <code>DELETE&#124;Move</code> | <code>()</code> | Auto-consume action after the handler returns an error or panics. On a content handler it also covers content-binding failures, but only when the service declares no `onError`. On `onError` it applies when `onError` itself returns an error or panics. |

`files:DELETE` deletes the file. A `Move` record moves it:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `moveTo` | <code>string</code> | Required | The target directory; the file keeps its name and the directory is created if absent. |
| `preserveSubDirs` | <code>boolean</code> | <code>true</code> | Recreate the file's sub-path under the target directory on recursive watches. |

A move onto an existing same-named file replaces it.

### `ContentBindingError`

The error delivered to `onError` when a dispatched file's content does not bind to its handler's declared type. It is the one client-side error that carries a detail record.

| Field | Type | Description |
|-------|------|-------------|
| `filePath` | <code>string</code> | The share-relative path of the file whose content failed to bind, for example `/incoming/broken.json`. |
| `content` | <code>byte[]</code> | The file's raw content. Absent when the failure happened before the content was read, which is the case for the stream content forms. |

Narrow to it inside `onError` to act on the file that failed:

```ballerina
remote function onError(files:Error err) returns error? {
    if err is files:ContentBindingError {
        log:printError("file did not bind", path = err.detail().filePath, 'error = err);
        return;
    }
    log:printError("listener error", 'error = err);
}
```

### `Caller`

A `files:Caller` is passed to each handler so it can act on the event's file without constructing a separate client. It forwards a share-scoped subset of the `Client` operations, with the same signatures: `getFile`, `download`, `uploadFromFile`, `upload`, `deleteFile`, `renameFile`, `copyFile`, `checkCopyStatus`, `abortCopy`, `createDirectory`, `deleteDirectory`, and `list`. See the [Action Reference](action-reference.md) for each operation.

Handlers pass the event's path explicitly, for example `caller->deleteFile(file.path)`, and read the share's name from `FileInfo.shareName`. Property reads and writes and share-level administrative operations are not forwarded; construct a `Client` for those.
