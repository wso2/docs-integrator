# Triggers

The `ballerinax/azure.storage.blob` connector supports event-driven blob processing through Azure Event Grid. Azure delivers blob created and blob deleted events to a storage queue, and a `blob:Listener` service consumes that queue, fetching each created blob's content in the format you choose (bytes, text, JSON, XML, or CSV) and settling the message by what the handler returns.

The connector exposes several components:

| Component | Role |
|-----------|------|
| `blob:Listener` | Holds the credential and the transport. Several services attach to it, each consuming its own queue. |
| `blob:Service` | Hosts the handlers invoked for each dispatched event; the service names the queue it consumes in its `@blob:ServiceConfig` annotation. |
| `blob:Caller` | A client passed to handlers, bound to the event's container, enabling additional blob operations (read, download, upload, delete, copy from a URL, set tags) within the handler. |
| `blob:BlobEvent` | Record describing the dispatched event: the event type, the storage account, the container, the path, the URL, the time, the causing API, and the content type, length, blob type, and ETag the event carries. |

For action-based operations, see the [Action Reference](action-reference.md).

---

## Listener

The `blob:Listener` holds the credential and the transport that every service, poison queue, and `Caller` of the listener shares. It is not bound to a container or a queue; the queue belongs to the service. Initialization validates the configuration locally and makes no call to Azure.

### Configuration

| Config Type | Description |
|-------------|-------------|
| `ListenerConfiguration` | Configuration for the Azure Blob Storage listener, including authentication, data-binding behavior, retry and transport settings, and the queue endpoint. |

**`ListenerConfiguration` fields:**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | <code>AuthConfig</code> | Required | The authentication configuration. Accepts any credential from the auth union; see the [Action Reference](action-reference.md#configuration) for the credential records. One credential serves every queue, every poison queue, and every `Caller` of the listener. A SAS credential must be an account SAS covering both the queue and the blob services; a service SAS, or an account SAS lacking either service, is rejected at initialization. A Microsoft Entra ID identity needs the **Storage Queue Data Contributor** role in addition to its blob data role. |
| `laxDataBinding` | <code>boolean</code> | <code>false</code> | Relaxed data binding for the typed content handlers: JSON and CSV record binding treat a null value as an optional field and an absent field as a nilable field, and XML record binding tolerates undeclared elements. Applies to every service of the listener. |
| `retryConfig` | <code>RetryConfig</code> | <code>&#123;&#125;</code> | Retry behavior for service requests; the connector's defaults apply when omitted. The secondary host, if given, serves the blob requests only. |
| `transportConfig` | <code>TransportConfig</code> | <code>&#123;&#125;</code> | HTTP transport settings (proxy, connection pool, TLS), shared by every service and `Caller` of the listener. |
| `queueServiceUrl` | <code>string</code> | Optional | The queue service endpoint URL, including the scheme. Omit to derive it from the credential: the account name gives `https://{accountName}.queue.core.windows.net`, a blob endpoint gives the same host with its `.blob.` label replaced by `.queue.`, and a connection string gives its `QueueEndpoint`. Required when the credential names a host that carries no `.blob.` label, such as a custom domain or an emulator address. |

### Initializing the listener

```ballerina
import ballerinax/azure.storage.blob;

configurable string accountName = ?;
configurable string accountKey = ?;

listener blob:Listener invoiceListener = check new (auth = {accountName, accountKey});
```

---

## Service

A `blob:Service` is a Ballerina service attached to a `blob:Listener`. The service attaches with no name and carries the required `@blob:ServiceConfig` annotation, which names the storage queue it consumes and tunes how the queue is consumed (see [Supporting types](#supporting-types)). Several services attach to one listener, each with its own queue, its own polling, and its own poison queue; two services of one listener cannot name the same queue.

The Event Grid subscription that fills the queue does all the filtering: it selects the event types, the container (through a subject prefix such as `/blobServices/default/containers/invoices/`), and any name prefix or suffix. The service consumes whatever its queue carries. The [Setup Guide](setup-guide.md#wire-the-event-queue-listener-only) describes the wiring.

Created events are routed to handlers by the blob name's extension, compared ignoring case: `.txt` to `onBlobText`, `.json` to `onBlobJson`, `.xml` to `onBlobXml`, `.csv` to `onBlobCsv`, and anything else to `onBlob`. A name with no extension is routed by the event's content type: `application/json` to `onBlobJson`, `application/xml` or `text/xml` to `onBlobXml`, `text/csv` to `onBlobCsv`, any other `text/*` type to `onBlobText`, and the rest to `onBlob`. A per-handler `@blob:FunctionConfig` with a `namePattern` or a `contentTypePattern` overrides that routing. A blob whose routing names a handler the service does not declare falls back to `onBlob`. Deleted events go to `onBlobDelete`. At most one handler runs per event.

Delivery is at least once, and a handler's return settles the message: returning `()` acknowledges it, returning an error or panicking makes it visible again for redelivery, up to `maxDeliveryCount` deliveries, after which it moves to the poison queue. A handler can also return a `blob:DeadLetterError` to move the message to the poison queue at once, or a `blob:RetryError` to ask for redelivery after a delay of its choosing. Duplicates are always possible, so handlers must be idempotent; the event's `sequencer` orders the events of one blob path, which lets a handler ignore a stale duplicate.

Events the service does not handle are acknowledged, never poisoned: event types other than blob created and blob deleted, a created event that commits no content (an empty append or page blob, or a Data Lake or SFTP file creation), a created event whose routing finds no declared handler and no `onBlob`, and a deleted event on a service without `onBlobDelete`. The first time each kind is seen on a queue, a warning names the subscription filter that would keep it out. An event from another storage account is acknowledged and logged as an error, since it signals a misrouted subscription.

The `byte[]` form of `onBlob` loads the whole blob into memory; prefer the stream form for large blobs. A stream reads the blob in ranged chunks and is locked to the version of the blob it first read. A handler that writes into a container its subscription covers fires further events that come back to the same service, so such a handler must recognize its own output, for example by path, or the subscription must exclude it with an advanced filter.

### Callback signatures

| Function | Signature | Description |
|----------|-----------|-------------|
| `onBlob` | <code>remote function onBlob(byte[] content, blob:BlobEvent event, blob:Caller caller) returns error?</code> | Invoked for a created blob routed to no typed handler, delivering the raw content. Also accepts the content as <code>stream&lt;byte[], error?&gt;</code> for streaming large blobs. |
| `onBlobText` | <code>remote function onBlobText(string content, blob:BlobEvent event, blob:Caller caller) returns error?</code> | Invoked for a created `.txt` blob, delivering the content decoded as UTF-8 text. |
| `onBlobJson` | <code>remote function onBlobJson(json content, blob:BlobEvent event, blob:Caller caller) returns error?</code> | Invoked for a created `.json` blob, delivering the parsed content. Also binds to a user-defined record. |
| `onBlobXml` | <code>remote function onBlobXml(xml content, blob:BlobEvent event, blob:Caller caller) returns error?</code> | Invoked for a created `.xml` blob, delivering the document. Also binds to a user-defined record. |
| `onBlobCsv` | <code>remote function onBlobCsv(MyRow[] content, blob:BlobEvent event, blob:Caller caller) returns error?</code> | Invoked for a created `.csv` blob, delivering the rows bound to a string matrix or a record array. Also binds to a stream of either row form. |
| `onBlobDelete` | <code>remote function onBlobDelete(blob:BlobEvent event, blob:Caller caller) returns error?</code> | Invoked for a deleted blob. No content exists to fetch. |
| `onError` | <code>remote function onError(blob:Error err, blob:BlobEvent? event, blob:Caller? caller) returns error?</code> | Invoked when a poll fails, when a message cannot be parsed as an event, when a created blob's content cannot be fetched, when the content cannot be bound to the handler's parameter type, when a message arrives past the delivery limit, or when a move to the poison queue fails. See [Error handling](#error-handling). |

The trailing parameters are optional. A content handler declares its content parameter first, then either, both, or neither of `BlobEvent` and `Caller`, so the accepted shapes are `(content)`, `(content, BlobEvent)`, `(content, Caller)`, and `(content, BlobEvent, Caller)`; when both are present, `BlobEvent` must precede `Caller`. `onBlobDelete` accepts `(BlobEvent)` or `(BlobEvent, Caller)`. `onError` accepts `(error)`, `(error, BlobEvent?)`, `(error, Caller?)`, or `(error, BlobEvent?, Caller?)`; its event and caller parameters must be declared nilable, because a failed poll or an unparseable message carries neither. The error parameter may be declared as `error` or `blob:Error`. A service declares at least one of the six event handlers; `onError` alone is not enough.

Each content parameter is declared with exactly one of its accepted types. `onBlob` takes `byte[]` or `stream<byte[], error?>`. `onBlobJson` takes a `json` value or a record. `onBlobXml` takes `xml` or a record. `onBlobCsv` takes a string matrix (`string[][]`), a record array, a `stream<string[], error?>`, or a `stream<record {}, error?>`. The record forms map each row's fields through the blob's first row, the header; the string forms keep every row, the header row included. Declare the return type as `error?`; it admits `blob:DeadLetterError` and `blob:RetryError` as well as any other error.

### Full usage example

```ballerina
import ballerina/log;

import ballerinax/azure.storage.blob;

configurable string accountName = ?;
configurable string accountKey = ?;

// The shape an invoice blob binds to.
type Invoice record {|
    string id;
    string customer;
    decimal total;
|};

listener blob:Listener invoiceListener = check new (auth = {accountName, accountKey});

// The service consumes the queue its Event Grid subscription delivers to.
@blob:ServiceConfig {queueName: "invoice-events"}
isolated service on invoiceListener {

    // A .json blob binds to Invoice; the message is acknowledged when the handler returns.
    isolated remote function onBlobJson(Invoice invoice, blob:BlobEvent event, blob:Caller caller) returns error? {
        if event.path.startsWith("processed/") {
            return;
        }
        // A failure that retrying cannot fix moves the message to the poison queue at once.
        if invoice.total < 0d {
            return error blob:DeadLetterError(string `negative total in ${event.path}`);
        }
        log:printInfo("received invoice", path = event.path, id = invoice.id, customer = invoice.customer,
                total = invoice.total);
        // Blob Storage has no rename: copy under the new path, then delete the original.
        string processedPath = "processed/" + invoice.id + ".json";
        _ = check caller->copyBlobFromUrl(event.url, processedPath,
                {tags: {status: "processed", customer: invoice.customer}});
        check caller->deleteBlob(event.path);
        log:printInfo("moved invoice", sourcePath = event.path, destinationPath = processedPath);
    }

    // Every other created blob arrives as raw bytes.
    isolated remote function onBlob(byte[] content, blob:BlobEvent event) returns error? {
        log:printInfo("received a non-invoice blob", path = event.path, sizeBytes = content.length(),
                contentType = event.contentType ?: "unknown");
    }

    isolated remote function onBlobDelete(blob:BlobEvent event) returns error? {
        log:printInfo("blob deleted", path = event.path);
    }

    // Notified on poll failures, unparseable messages, fetch failures, and binding failures.
    // It runs before the message is disposed of, so it can mark the blob that failed.
    isolated remote function onError(blob:Error err, blob:BlobEvent? event, blob:Caller? caller) returns error? {
        if err is blob:ContentBindingError && event is blob:BlobEvent && caller is blob:Caller {
            check caller->setTags(event.path, {status: "unreadable"});
        }
        log:printError("invoice listener reported an error", 'error = err);
    }
}
```

Declaring the service and its handlers `isolated` lets the handlers run in parallel, up to `batchSize + newBatchThreshold` messages at once. A service that is not isolated still receives and holds that many messages, but runs its handler code in turn.

A step-by-step walkthrough of building this integration in the WSO2 Integrator IDE is in the [Example](example.md) page.

### Delivery and settlement

A received message stays invisible to other consumers while its handler runs. The listener renews that visibility for as long as the handler runs, so a slow handler keeps its message. What the handler returns then settles the message:

| Handler returns | Outcome |
|-----------------|---------|
| `()` | The event is acknowledged and the message deleted. |
| Any other error, or a panic | The message becomes visible again after `redeliveryDelay` and the event is redelivered. At `maxDeliveryCount` deliveries it moves to the poison queue with the reason "delivery limit reached". |
| `blob:DeadLetterError` | The message moves to the poison queue at once, without the remaining deliveries, and its message is logged as "dead-lettered by the handler". Return it for a failure that retrying cannot fix. |
| `blob:RetryError` | The message becomes visible again after the error's `delay` instead of `redeliveryDelay`. A retry still counts toward `maxDeliveryCount`; on the final delivery the message moves to the poison queue instead. |

`DeadLetterError` and `RetryError` are recognized only when returned as they are; an error that wraps one as its cause is an ordinary failure. A message received with a delivery count already past `maxDeliveryCount`, for example after a process died mid-handler, moves to the poison queue without being dispatched. A message whose redelivery delay would land within ten minutes of its expiry on the queue moves to the poison queue at once, since Azure cannot hide a message past its expiry.

The poison queue is `poisonQueueName`, `{queueName}-poison` by default, created by the listener when a message first moves there. The move copies the message body verbatim, so a poison message can be replayed as it is. Every move logs an error naming the source queue, the message id, the new poison message id, the blob path, the delivery count, and one of eight fixed reasons: "delivery limit reached", "dead-lettered by the handler: ...", "retry requested on the final delivery", "would expire before redelivery", "delivery limit exceeded on receipt", "unparseable message", "archived blob", and "content binding failed". Storage queues have no native dead-letter facility; this is the connector's convention. Azure Monitor's queue metrics have no per-queue dimension, so watch a poison queue's approximate message count instead.

Stopping the listener never discards work in flight: `gracefulStop` waits for the running handlers, and `immediateStop` returns at once while they keep their messages and settle normally. Messages still held when the process exits reappear on the queue within ten minutes.

### Error handling

A service may declare an `onError` handler. It is notified on every listener-side failure, with the event and a `Caller` bound to its container when the failure is tied to an event, and with `()` for both otherwise:

- A failed poll of the service's queue, with the mapped typed error, for example an `AuthorizationError` when the credential cannot receive messages, or a `NotFoundError` when the queue does not exist. The queue keeps its backoff schedule and is polled again.
- A message that cannot be parsed as an event, with a client-side `Error` naming the queue and the message id. The message moves to the poison queue.
- A created blob whose content cannot be fetched: a blob deleted before the fetch is acknowledged; an archived blob moves to the poison queue; any other fetch failure, such as throttling or authorization, follows the settlement rule for a failed handler.
- A typed handler's content-binding failure, with a [`ContentBindingError`](#contentbindingerror) whose detail names the blob. The message moves to the poison queue, since binding it again would fail the same way.
- A message received past the delivery limit, and a move to the poison queue that failed, each with an error naming the queue involved.

`onError` runs to completion before the message is disposed of, so it can, for example, tag or copy aside a blob that failed. An error `onError` returns never changes the outcome; it is logged as a warning. Errors the event handlers return do not reach `onError`; they drive settlement as described above. The one exception is a stream's own binding error: when a CSV or byte stream fails to bind a row or chunk while the handler reads it, the error surfaces inside the handler, and returning it as it is takes the binding disposition and notifies `onError` with a `ContentBindingError`.

A failed poll notifies only the `onError` of the service whose queue failed, and `onError` for a poll failure runs before that queue's next poll, so the queue stays paused until it returns. Keep `onError` short.

A credential that cannot read the queue does not fail at attach time; the first poll surfaces the `AuthorizationError`.

---

## Supporting types

### `BlobEvent`

| Field | Type | Description |
|-------|------|-------------|
| `eventType` | <code>BlobEventType</code> | `BLOB_CREATED` or `BLOB_DELETED`. Creation and replacement are the same event, so overwriting an existing blob fires it again. |
| `accountName` | <code>string</code> | The storage account that raised the event. |
| `containerName` | <code>string</code> | The blob's container. |
| `path` | <code>string</code> | The blob's container-relative path, for example `incoming/inv-1001.json`; the `Caller` operations take it directly. |
| `url` | <code>string</code> | The blob's full URL on the blob endpoint, which `Caller.copyBlobFromUrl` takes as its source. |
| `eventTime` | <code>time:Utc</code> | When the event fired. |
| `api` | <code>string</code> | The storage operation that caused the event, for example `PutBlob`, `PutBlockList`, `CopyBlob`, or `DeleteBlob`. |
| `contentType` | <code>string?</code> | The blob's content type, as the event provides it. |
| `contentLength` | <code>int?</code> | The blob's size in bytes; absent on a deleted event. |
| `blobType` | <code>string?</code> | `BlockBlob`, `AppendBlob`, or `PageBlob`, as the event provides it. |
| `eTag` | <code>string?</code> | The blob's entity tag at the time of the event; absent on a deleted event. |
| `sequencer` | <code>string</code> | An opaque string whose ordering is comparable for one blob path, which lets a handler detect a stale duplicate. |

### `ServiceConfiguration`

The type of the required `@blob:ServiceConfig` annotation on the service.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `queueName` | <code>string</code> | Required | The storage queue the service's Event Grid subscription delivers to. Follows Azure's queue name rules: 3 to 63 characters; lowercase letters, digits, and hyphens; a letter or digit first and last; no consecutive hyphens. |
| `poisonQueueName` | <code>string</code> | <code>&#123;queueName&#125;-poison</code> | The queue failed messages move to, created by the listener when a message first moves there. Must differ from `queueName`. Required when `queueName` is longer than 56 characters, since the default would then be too long. |
| `batchSize` | <code>int</code> | <code>16</code> | How many messages one receive fetches, 1 to 32. |
| `newBatchThreshold` | <code>int</code> | Half of `batchSize`, rounded down | The number of events still being handled at which the next batch is fetched, 0 to `batchSize`. A service has at most `batchSize + newBatchThreshold` messages in flight. |
| `maxPollingInterval` | <code>decimal</code> | <code>60</code> | The longest wait between polls of an empty queue. An empty queue is polled on a randomized exponential backoff that starts well under a second and rises to this ceiling. |
| `redeliveryDelay` | <code>decimal</code> | <code>0</code> | How long a message stays invisible after its handler fails, before it is redelivered, 0 to 604,800 seconds, rounded up to whole seconds. |
| `maxDeliveryCount` | <code>int</code> | <code>5</code> | How many deliveries a message gets before it is moved to the poison queue, at least 1. |

The ranges are validated when the service is attached, and at compile time when the values are literals. The compiler plugin also rejects a service with an attach point, a missing annotation, a poison queue equal to the queue, and two services of one listener naming the same queue.

### `FunctionConfiguration`

The type of the optional `@blob:FunctionConfig` annotation on individual content handlers. It overrides the extension and content-type routing.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `namePattern` | <code>string</code> | Optional | A regular expression matched against the whole blob name (the last path segment). |
| `contentTypePattern` | <code>string</code> | Optional | A regular expression matched against the whole content type, without its parameters. |

A handler matches when either of its patterns matches. Handlers with patterns are checked first in the fixed order `onBlobText`, `onBlobJson`, `onBlobXml`, `onBlobCsv`, then `onBlob`, and the first match wins; when none matches, the extension or content-type routing applies to every declared handler.

```ballerina
@blob:FunctionConfig {namePattern: "daily-.*\\.csv"}
isolated remote function onBlobCsv(stream<Reading, error?> rows) returns error? {
    check rows.forEach(function(Reading reading) {
        // Process each row without loading the whole blob into memory.
    });
}
```

### `DeadLetterError` and `RetryError`

Two error types a handler returns to choose the message's settlement.

| Type | Detail | Effect |
|------|--------|--------|
| <code>DeadLetterError</code> | None | The message moves to the poison queue at once. |
| <code>RetryError</code> | <code>delay</code> (<code>decimal</code>): the least time before the message is redelivered, rounded up to whole seconds and capped at 604,800 | The message is redelivered after the delay instead of `redeliveryDelay`. |

```ballerina
isolated remote function onBlobJson(Invoice invoice, blob:BlobEvent event) returns error? {
    if invoice.total < 0d {
        return error blob:DeadLetterError(string `negative total in ${event.path}`);
    }
    boolean ready = check downstreamIsReady();
    if !ready {
        return error blob:RetryError("downstream not ready", delay = 300);
    }
}
```

### `ContentBindingError`

The error delivered to `onError` when a created blob's content does not bind to its handler's declared type.

| Field | Type | Description |
|-------|------|-------------|
| `containerName` | <code>string</code> | The blob's container. |
| `path` | <code>string</code> | The blob's container-relative path. |
| `content` | <code>byte[]?</code> | The blob's raw content, when it was already read into memory. Absent for the stream content forms. |

Narrow to it inside `onError` to act on the blob that failed:

```ballerina
isolated remote function onError(blob:Error err, blob:BlobEvent? event) returns error? {
    if err is blob:ContentBindingError {
        log:printError("blob did not bind", path = err.detail().path, 'error = err);
        return;
    }
    log:printError("listener error", 'error = err);
}
```

### `Caller`

A `blob:Caller` is passed to each handler so it can act on the event's blob without constructing a separate client. It is bound to the event's container and shares the listener's credential and transport. It forwards a subset of the `Client` operations, with the same signatures: `getBlob`, `getBlobProperties`, `download`, `upload`, `deleteBlob`, `copyBlobFromUrl`, and `setTags`. See the [Action Reference](action-reference.md) for each operation.

Handlers pass the event's path explicitly, for example `caller->deleteBlob(event.path)`. The copy operation is the from-URL form, so `event.url` feeds it directly and copies into the event's container; Blob Storage has no rename, so moving a blob is a copy followed by a delete. Copying to another container, listing, leases, tiers, snapshots, access policies, and SAS generation are not forwarded; construct a `Client` bound to the target container for those.

### `parseEvent`

A module-level function for consuming blob events outside the listener, for example events an Event Grid subscription delivers to an Azure Service Bus queue. It makes no service call and needs no listener.

```ballerina
public isolated function parseEvent(anydata message) returns blob:BlobEvent|blob:Error?;
```

It takes a message body as bytes, a string, or parsed JSON, base64-encoded or raw, in the Event Grid schema or CloudEvents, and returns a `BlobEvent` for a blob created or deleted event, `()` for a valid event of another type or a created event that commits no content, or an `Error` for anything malformed. Settlement, retries, and dead-lettering are then the delivering service's own.

```ballerina
import ballerinax/asb;
import ballerinax/azure.storage.blob;

configurable string serviceBusConnectionString = ?;
configurable string accountName = ?;
configurable string accountKey = ?;

final blob:Client invoices = check new ("invoices", auth = {accountName, accountKey});

listener asb:Listener asbListener = check new (
    connectionString = serviceBusConnectionString,
    entityConfig = {queueName: "blob-events"}
);

isolated service asb:Service on asbListener {
    isolated remote function onMessage(asb:Message message, asb:Caller caller) returns error? {
        blob:BlobEvent? event = check blob:parseEvent(message.body);
        if event is () || event.eventType != blob:BLOB_CREATED {
            return;
        }
        byte[] content = check invoices->getBlob(event.path);
    }
}
```
