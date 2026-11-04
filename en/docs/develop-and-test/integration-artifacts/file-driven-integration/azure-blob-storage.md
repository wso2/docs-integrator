---
title: Azure Blob Storage
description: React to blobs created or deleted in Azure Blob Storage, with Event Grid delivering the events to a storage queue, typed content retrieval, routing by name, and settlement by the handler's return.
keywords: [wso2 integrator, azure blob storage, file integration, blob events, event grid, storage queue, poison queue]
slug: /develop-and-test/integration-artifacts/file-driven-integration/azure-blob-storage
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Azure Blob Storage

Azure Blob Storage [file integrations](../../../get-started/concepts/concepts.mdx#integration-types) react to blobs as they are created or deleted in a storage account. Use them for drop-container processing, ETL pipelines, and batch integrations where applications exchange data as CSV, XML, JSON, or binary objects through blob storage.

Unlike a polling file integration, a blob integration does not scan containers. Azure Event Grid publishes an event for each created or deleted blob and delivers it to a storage queue you choose, and the integration's listener consumes that queue. Which containers, event types, and blob names reach the queue is decided by the Event Grid subscription's filters, so the service consumes whatever its queue carries. For creating the storage account, the container, the queue, the subscription, and the credentials, see the [Azure Blob Storage setup guide](product://connectors/catalog/storage-file/azure.storage.blob/setup-guide).

The listener authenticates to the storage account with a shared key, a SAS token, a SAS URL, a connection string, or a Microsoft Entra ID identity. Its credential must cover the queue as well as the blobs: an access key does; a SAS credential must be an account SAS spanning the queue and blob services; and an Entra ID identity needs the **Storage Queue Data Contributor** role in addition to its blob data role.

## Creating an Azure Blob Storage service

One flow creates the listener and the service together; the authentication method is a selector on the creation form.

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

1. Click **+** in the WSO2 Integrator side panel header to open the **New Integration** wizard (on an empty project, the **+ Add Integration or Library** button in the project view opens the same wizard), and continue to the **Type** step.

2. Scroll to the **File Integration** category, select the **Azure Blob Storage** card, and click **Next**.

   <ThemedImage
       alt="New Integration wizard with the Azure Blob Storage card selected"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/storage-file/azure.storage.blob/azure_blob_trigger_screenshots_01_new_integration_wizard.png'),
           dark: useBaseUrl('/img/connectors/catalog/storage-file/azure.storage.blob/azure_blob_trigger_screenshots_01_new_integration_wizard.png'),
       }}
   />

3. The **Create Azure Blob Storage Integration** form opens with the **Listener Configurations** box first. Name the listener and pick an entry under **Select the authentication method**. For **Shared Key**, fill in:

   | Field | Description |
   |---|---|
   | **Listener Name** | Identifier for this listener (e.g., `blobListener`). |
   | **Account Name** | The storage account name. |
   | **Account Key** | A base64-encoded access key of the storage account. |

4. Below the listener box, fill in the service's settings:

   | Field | Description |
   |---|---|
   | **Queue Name** | The storage queue the Event Grid subscription delivers to (e.g., `invoice-events`). The service consumes this queue. |
   | **Advanced Configurations** | **Poison Queue Name**, **Batch Size**, **New Batch Threshold**, **Maximum Polling Interval (seconds)**, **Redelivery Delay (seconds)**, and **Maximum Delivery Count**. Leave them empty to keep the defaults; see [Service configuration](#service-configuration). |

   <ThemedImage
       alt="Azure Blob Storage service and listener configuration form"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/storage-file/azure.storage.blob/azure_blob_trigger_screenshots_02_listener_config_form.png'),
           dark: useBaseUrl('/img/connectors/catalog/storage-file/azure.storage.blob/azure_blob_trigger_screenshots_02_listener_config_form.png'),
       }}
   />

   The selector's other options, SAS token, SAS URL, connection string, and Microsoft Entra ID, reveal the fields of the matching credential record shown on the Ballerina Code tab. The listener's advanced section holds **Relaxed Data Binding** and **Queue Service URL**.

5. Click **Create**. WSO2 Integrator generates the listener and the service, and an **Azure Blob Storage Integration** entry appears in the sidebar under **Entry Points**; its page header names the listener and the queue it consumes.

6. Click [**+ Add Handler**](#adding-a-blob-handler) in the service view to define how blob events are processed.

</TabItem>
<TabItem value="code" label="Ballerina Code">

The service attaches with no name and names its queue in the `@blob:ServiceConfig` annotation. There is no container in the code: the Event Grid subscription decides which container's events reach the queue, and each event carries its container and path.

**Shared Key:**

```ballerina
import ballerinax/azure.storage.blob;

configurable string accountName = ?;
configurable string accountKey = ?;

listener blob:Listener blobListener = check new (auth = {accountName, accountKey});

@blob:ServiceConfig {queueName: "invoice-events"}
isolated service on blobListener {
    isolated remote function onBlobText(string content, blob:BlobEvent event) returns error? {
        // Process text blob content
    }
}
```

**SAS token**, an account SAS that spans the queue and blob services:

```ballerina
import ballerinax/azure.storage.blob;

configurable string accountName = ?;
configurable string sasToken = ?;

listener blob:Listener blobListener = check new (auth = {accountName, sasToken});

@blob:ServiceConfig {queueName: "invoice-events"}
isolated service on blobListener {
    isolated remote function onBlobText(string content, blob:BlobEvent event) returns error? {
        // Process text blob content
    }
}
```

**SAS URL**, the full blob service URL from the Azure portal, carrying the endpoint and the token in one string:

```ballerina
import ballerinax/azure.storage.blob;

configurable string sasUrl = ?;

listener blob:Listener blobListener = check new (auth = {sasUrl});

@blob:ServiceConfig {queueName: "invoice-events"}
isolated service on blobListener {
    isolated remote function onBlobText(string content, blob:BlobEvent event) returns error? {
        // Process text blob content
    }
}
```

**Connection string:**

```ballerina
import ballerinax/azure.storage.blob;

configurable string connectionString = ?;

listener blob:Listener blobListener = check new (auth = {connectionString});

@blob:ServiceConfig {queueName: "invoice-events"}
isolated service on blobListener {
    isolated remote function onBlobText(string content, blob:BlobEvent event) returns error? {
        // Process text blob content
    }
}
```

**Microsoft Entra ID with the default credential chain**, which tries the environment, a managed identity, and developer sign-ins in turn, so one configuration works both locally and when deployed:

```ballerina
import ballerinax/azure.storage.blob;

configurable string accountName = ?;

listener blob:Listener blobListener = check new (auth = {kind: "default", accountName});

@blob:ServiceConfig {queueName: "invoice-events"}
isolated service on blobListener {
    isolated remote function onBlobText(string content, blob:BlobEvent event) returns error? {
        // Process text blob content
    }
}
```

**Microsoft Entra ID as a service principal with a client secret:**

```ballerina
import ballerinax/azure.storage.blob;

configurable string accountName = ?;
configurable string tenantId = ?;
configurable string clientId = ?;
configurable string clientSecret = ?;

listener blob:Listener blobListener = check new (auth = {accountName, tenantId, clientId, clientSecret});

@blob:ServiceConfig {queueName: "invoice-events"}
isolated service on blobListener {
    isolated remote function onBlobText(string content, blob:BlobEvent event) returns error? {
        // Process text blob content
    }
}
```

Entra ID also supports managed identities, service principals with client certificates, and workload identities, one record per credential kind, each carrying the fields that credential needs. See the [connector configuration reference](product://connectors/catalog/storage-file/azure.storage.blob/action-reference#configuration) for every record. The Entra ID identity must hold the **Storage Blob Data Contributor** role (or **Storage Blob Data Reader** for read-only handlers) and the **Storage Queue Data Contributor** role on the storage account.

</TabItem>
</Tabs>

## Blob handlers

A blob handler is a `remote function` that WSO2 Integrator calls for each event the service receives from its queue. A service declares one handler per content format it processes, an optional handler for deleted blobs, and an optional error handler:

| Handler | Trigger |
|---|---|
| **On Create** (`onBlobText` / `onBlobJson` / `onBlobXml` / `onBlobCsv` / `onBlob`) | A blob was created or replaced in a container the subscription covers. The function name depends on the content type, one typed variant per format, with `onBlob` as the raw-bytes catch-all. The listener fetches the blob's content before calling the handler. |
| **On Delete** (`onBlobDelete`) | A blob was deleted. The handler receives the event only; there is no content to fetch. |
| **On Error** (`onError`) | A poll of the queue failed, a message could not be parsed as an event, a blob's content could not be fetched, the content could not be bound to a typed handler's parameter, for example a JSON handler receiving malformed JSON, a message arrived past its delivery limit, the `Caller` for the event's container could not be built, or a move to the poison queue failed. A binding failure arrives as a `blob:ContentBindingError` naming the blob. |

At least one blob handler is required; a service with only an `onError` handler is not valid.

Creation and replacement are the same event, so overwriting an existing blob fires the created handler again; `event.api` names the operation that caused the event (`PutBlob`, `PutBlockList`, `CopyBlob`, and others).

### Adding a blob handler

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

1. Open the service view (select the service under **Entry Points**) and click **+ Add Handler**. The **Select Handler to Add** panel offers **On Create**, **On Delete**, and **On Error**; select **On Create**.

   <ThemedImage
       alt="Handler picker with the On Create handler"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/storage-file/azure.storage.blob/azure_blob_trigger_screenshots_03_add_handler_panel.png'),
           dark: useBaseUrl('/img/connectors/catalog/storage-file/azure.storage.blob/azure_blob_trigger_screenshots_03_add_handler_panel.png'),
       }}
   />

2. The handler configuration panel opens:

   | Field | Description |
   |---|---|
   | **Format** | The format of incoming blobs: **JSON**, **XML**, **CSV**, **Text**, or **Raw Bytes**. Determines the handler function name and the type of the `content` parameter. **Raw Bytes** and **CSV** also offer **Stream (Large Blobs)**, which delivers the content as a stream instead of a value. See [Content types](#content-types). |
   | **Define Content Schema** | For **JSON**, **XML**, and **CSV**: pick a record type you created earlier (under **Types**) to receive typed content instead of `json`, `xml`, or string rows. |
   | **Routing** | Two optional regular expressions, **Blob Name Pattern** and **Content Type Pattern**, that route matching blobs to this handler instead of the extension routing. See [Routing](#routing). |
   | **Advanced Configurations** | **Blob Event (event)** adds the `blob:BlobEvent` parameter, carrying the container, path, URL, and the rest of the event. **Azure Blob Storage Connection (caller)** adds the `blob:Caller` parameter, a client bound to the event's container. |

   <ThemedImage
       alt="On Create handler configuration with the JSON format"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/storage-file/azure.storage.blob/azure_blob_trigger_screenshots_04_handler_config.png'),
           dark: useBaseUrl('/img/connectors/catalog/storage-file/azure.storage.blob/azure_blob_trigger_screenshots_04_handler_config.png'),
       }}
   />

3. Click **Save** to register the handler. The integration's design view shows the listener feeding the service with it:

   <ThemedImage
       alt="Design view with the listener and the service's registered handler"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/storage-file/azure.storage.blob/azure_blob_trigger_screenshots_06_service_view_final.png'),
           dark: useBaseUrl('/img/connectors/catalog/storage-file/azure.storage.blob/azure_blob_trigger_screenshots_06_service_view_final.png'),
       }}
   />

Add **On Delete** and **On Error** the same way. The **On Error** handler's optional **Blob Event (event)** and **Azure Blob Storage Connection (caller)** parameters are nilable, because a failed poll carries neither.

</TabItem>
<TabItem value="code" label="Ballerina Code">

Blob handlers are typed `remote function` declarations inside the service. WSO2 Integrator routes created events to handlers by the blob name's extension; the content parameter type determines deserialization.

**Text blob handler:**

```ballerina
isolated remote function onBlobText(string content, blob:BlobEvent event) returns error? {
    // content contains the full blob text
}
```

**JSON blob handler (typed record):**

```ballerina
type Order record {|
    string orderId;
    string product;
    int quantity;
|};

isolated remote function onBlobJson(Order 'order, blob:BlobEvent event) returns error? {
    // 'order is deserialized from JSON
}
```

**CSV streaming handler (large blobs):**

```ballerina
type Row record {|
    string orderId;
    int quantity;
|};

isolated remote function onBlobCsv(stream<Row, error?> content, blob:BlobEvent event) returns error? {
    check content.forEach(function(Row row) {
        // Process each row without loading the whole blob into memory
    });
}
```

**Binary blob handler:**

```ballerina
isolated remote function onBlob(byte[] content, blob:BlobEvent event) returns error? {
    // content is the raw blob bytes
}
```

**Deleted blob handler:**

```ballerina
isolated remote function onBlobDelete(blob:BlobEvent event) returns error? {
    // event.path names the blob that was deleted
}
```

**Error handler**, which fires on every listener-side failure: a failed poll, an unparseable message, a blob whose content could not be fetched, a typed handler's content-binding failure, a message received past its delivery limit, a `Caller` that could not be built, and a failed move to the poison queue. Poll and fetch failures arrive as the mapped typed error, such as a `blob:AuthorizationError`. A binding failure arrives as a `blob:ContentBindingError`, whose detail carries the blob's `containerName` and `path` and, when the content had been read before binding failed, its raw `content`:

```ballerina
isolated remote function onError(blob:Error err, blob:BlobEvent? event, blob:Caller? caller) returns error? {
    if err is blob:ContentBindingError {
        log:printError("blob did not bind", path = err.detail().path, 'error = err);
        return;
    }
    log:printError("blob processing error", 'error = err);
}
```

The trailing parameters are optional. A content handler declares its content parameter first, then either, both, or neither of `blob:BlobEvent` and `blob:Caller`; the accepted shapes are `(content)`, `(content, BlobEvent)`, `(content, Caller)`, and `(content, BlobEvent, Caller)`; when both are present, `BlobEvent` must precede `Caller`. `onBlobDelete` accepts `(BlobEvent)` or `(BlobEvent, Caller)`. `onError` accepts `(error)`, `(error, BlobEvent?)`, `(error, Caller?)`, or `(error, BlobEvent?, Caller?)`, with the event and caller declared nilable. Every handler returns `error?`.

</TabItem>
</Tabs>

### Content types

The format chosen on an On Create handler determines the function name and the type of the `content` parameter. Created events are routed to handlers by the blob name's extension, compared ignoring case:

| Format | Handler function | Routed extension | Content type | Use when |
|---|---|---|---|---|
| **Text** | `onBlobText` | `.txt` | `string` | Blobs are plain text (logs, EDI, custom formats). |
| **JSON** | `onBlobJson` | `.json` | `json` or a typed record | Blobs are JSON documents. |
| **XML** | `onBlobXml` | `.xml` | `xml` or a typed record | Blobs are XML documents. |
| **CSV** | `onBlobCsv` | `.csv` | `string[][]`, `record {}[]`, or a stream of either row form | Blobs are comma-separated values. Record rows map through the header row into your record type; string rows keep every row of the blob. Use a stream for large blobs. |
| **Raw Bytes** | `onBlob` | any other extension | `byte[]` or `stream<byte[], error?>` | Binary blobs or when you need raw byte access. |

A blob name without an extension is routed by the event's content type instead: `application/json` to `onBlobJson`, `application/xml` or `text/xml` to `onBlobXml`, `text/csv` to `onBlobCsv`, any other `text/*` type to `onBlobText`, and the rest to `onBlob`.

Routing rules:

- A blob whose extension maps to a handler the service does not declare falls back to `onBlob`. Without an `onBlob`, the event is acknowledged and a warning names the subscription filter that would keep such blobs out of the queue.
- A blob routed to a typed handler whose content is malformed raises a `blob:ContentBindingError`; it never falls through to `onBlob`. The error is delivered to `onError`, and the message moves to the poison queue, since binding it again would fail the same way.
- A CSV or byte stream is the exception for individual rows and chunks. A row that fails to bind while the handler reads the stream is returned to the handler as the stream's error. Returning that error as it is takes the binding disposition; returning any other error retries the message.
- An empty blob gives empty bytes, an empty string, or a stream that ends at once; a JSON, XML, or CSV target fails to bind like any invalid content.

### Routing

The **Routing** fields of a handler write a `@blob:FunctionConfig` annotation that overrides the extension routing for that handler:

```ballerina
@blob:FunctionConfig {namePattern: "daily-.*\\.csv"}
isolated remote function onBlobCsv(stream<Row, error?> rows, blob:BlobEvent event) returns error? {
    check rows.forEach(function(Row row) {
        // process each row
    });
}
```

`@blob:FunctionConfig` fields:

| Field | Type | Description |
|---|---|---|
| `namePattern` | `string?` | Regular expression matched against the whole blob name (the last path segment). |
| `contentTypePattern` | `string?` | Regular expression matched against the whole content type, without its parameters. |

A handler matches when either of its patterns matches. Handlers with patterns are checked first in the fixed order `onBlobText`, `onBlobJson`, `onBlobXml`, `onBlobCsv`, then `onBlob`, and the first match wins; when none matches, the extension routing applies to every declared handler, patterned ones included. At most one handler runs per event.

:::tip
In the **Name Pattern** text field, type the regular expression as it is, for example `daily-.*\.csv`; the designer escapes it for the generated string literal.
:::

### Settlement: acknowledging, retrying, and dead-lettering

Delivery is at least once. A received message stays invisible to other consumers while its handler runs, and the listener keeps renewing that visibility, so a slow handler keeps its message. What the handler returns then settles the message:

| Handler returns | Outcome |
|---|---|
| `()` | The event is acknowledged and the message deleted from the queue. |
| Any other error, or a panic | The message becomes visible again after the service's **Redelivery Delay** and the event is redelivered. At **Maximum Delivery Count** deliveries it moves to the poison queue. |
| `blob:DeadLetterError` | The message moves to the poison queue at once, skipping the remaining deliveries. Return it for a failure that retrying cannot fix. |
| `blob:RetryError` | The message is redelivered after the error's `delay` instead of the service's delay. A retry still counts toward the delivery count. |

```ballerina
isolated remote function onBlobJson(Order 'order, blob:BlobEvent event) returns error? {
    if 'order.quantity < 0 {
        return error blob:DeadLetterError(string `negative quantity in ${event.path}`);
    }
    boolean ready = check downstreamIsReady();
    if !ready {
        return error blob:RetryError("downstream not ready", delay = 300);
    }
    check processOrder('order);
}
```

There are no move-or-delete actions on a blob handler: the blob stays where it is, and the queue message carries the state. A handler that needs to move a processed blob copies it under the new path and deletes the original through the [`Caller`](#caller-operations), since Blob Storage has no rename.

Duplicates are always possible, so handlers must be idempotent. The event's `sequencer` orders the events of one blob path, which lets a handler ignore a stale duplicate. A handler that writes into a container its subscription covers fires further events that come back to the same service; recognize your own output, for example by path prefix, or exclude it in the subscription with an advanced filter.

### The poison queue

Messages the service cannot process move to its poison queue: `<queue name>-poison` by default, or the **Poison Queue Name** you set. The listener creates it when a message first moves there. A message moves there when its deliveries are exhausted, when a handler returns `blob:DeadLetterError`, when a handler asks for a retry on the final delivery, when a message arrives already past its delivery limit, when a message cannot be parsed as an event, when a created blob is archived, when its content does not bind to the handler's type, or when a redelivery would land too close to the message's expiry on the queue. Every move logs an error naming the source queue, the message id, the new poison message id, the blob path, the delivery count, and the reason.

The move copies the message body verbatim, so a poison message can be replayed by moving it back to the source queue. Storage queues have no native dead-letter facility; this is the connector's convention. Azure Monitor's queue metrics have no per-queue dimension, so watch a poison queue's approximate message count instead.

### Typed content and streaming

JSON and XML handlers can receive their payload as a free-form value (`json`, `xml`) or as a typed record you define; CSV handlers receive rows as string arrays (`string[][]`) or as typed records. CSV and Raw Bytes handlers can additionally receive the content as a `stream<T, error?>`, so the handler never holds the whole blob in memory. In the handler form, create the record type first and pick it in the **Content Schema** or **Row Schema** field; the **Stream (Large Blobs)** toggle selects the stream form.

**Typed CSV rows**, where the blob's first row is the header and maps each row's fields:

```ballerina
type Order record {|
    string orderId;
    string product;
    int quantity;
|};

isolated remote function onBlobCsv(Order[] orders, blob:BlobEvent event) returns error? {
    foreach Order 'order in orders {
        // typed field access: 'order.orderId, 'order.quantity, ...
    }
}
```

**Typed JSON document:**

```ballerina
type OrderBatch record {|
    string batchId;
    Order[] orders;
|};

isolated remote function onBlobJson(OrderBatch batch, blob:BlobEvent event) returns error? {
    // batch.batchId and batch.orders are typed
}
```

**Streaming raw bytes:**

```ballerina
isolated remote function onBlob(stream<byte[], error?> content, blob:BlobEvent event) returns error? {
    check content.forEach(function(byte[] chunk) {
        // process each chunk
    });
}
```

A stream reads the blob in ranged chunks, holding no connection between chunks, and is locked to the version of the blob it first read; a blob replaced mid-read fails the next chunk, and the returned error retries the message. A content value that does not match the declared parameter type is a `blob:ContentBindingError`, delivered to `onError`. To relax the record binding, treating a null value as an optional field and an absent field as a nilable field in JSON and CSV content and tolerating undeclared elements in XML, enable **Relaxed Data Binding** on the [listener configuration](#listener-configuration).

### BlobEvent

Each handler can receive a `blob:BlobEvent` parameter describing the event.

| Field | Type | Description |
|---|---|---|
| `eventType` | `blob:BlobEventType` | `BLOB_CREATED` or `BLOB_DELETED` |
| `accountName` | `string` | The storage account that raised the event |
| `containerName` | `string` | The blob's container |
| `path` | `string` | The blob's container-relative path, for example `incoming/inv-1001.json`; use this for all `caller->` operations |
| `url` | `string` | The blob's full URL, which `caller->copyBlobFromUrl` takes as its source |
| `eventTime` | `time:Utc` | When the event fired |
| `api` | `string` | The storage operation that caused the event, for example `PutBlob`, `PutBlockList`, `CopyBlob`, or `DeleteBlob` |
| `contentType` | `string?` | The blob's content type, as the event provides it |
| `contentLength` | `int?` | The blob's size in bytes; absent on a deleted event |
| `blobType` | `string?` | `BlockBlob`, `AppendBlob`, or `PageBlob` |
| `eTag` | `string?` | The blob's entity tag at the time of the event; absent on a deleted event |
| `sequencer` | `string` | An opaque string whose ordering is comparable for one blob path |

`BlobEvent` carries what the event provides. For full properties (metadata, tags, tier, lease state), use the `Caller`'s `getBlobProperties` operation or the connector's client; see the [action reference](product://connectors/catalog/storage-file/azure.storage.blob/action-reference).

### Caller operations

For most use cases, the typed handler parameters and the settlement rules are sufficient. When you need additional control, reading a related blob, writing output to a different path, tagging, or deleting, add the `blob:Caller` parameter to your handler. It exposes a subset of the connector's client operations, bound to the event's container, on the same connection the listener polls with.

| Operation | Return type | Description |
|---|---|---|
| `caller->getBlob(path, options)` | `T\|Error` | Retrieve a blob's content in the form the assignment target selects: `byte[]`, `string`, `json`, `xml`, a typed record or record array, or a lazy stream |
| `caller->getBlobProperties(path)` | `blob:BlobProperties\|Error` | Read a blob's properties, metadata, and copy state |
| `caller->download(sourcePath, destinationPath, options)` | `Error?` | Download a blob to a local path |
| `caller->upload(content, destinationPath, options)` | `Error?` | Upload in-memory content: `byte[]`, `string`, `json`, `xml`, a record, a record array, or a stream |
| `caller->deleteBlob(path, options)` | `Error?` | Delete a blob |
| `caller->copyBlobFromUrl(sourceUrl, destinationPath, options)` | `blob:CopyInfo\|Error` | Copy a blob into the event's container from a URL; `event.url` feeds it directly |
| `caller->setTags(path, tags, options)` | `Error?` | Replace a blob's index tags |

Handlers pass the event's path explicitly. A handler that moves a processed blob aside and tags it:

```ballerina
isolated remote function onBlobJson(Order 'order, blob:BlobEvent event, blob:Caller caller) returns error? {
    check processOrder('order);
    string processedPath = "processed/" + 'order.orderId + ".json";
    _ = check caller->copyBlobFromUrl(event.url, processedPath, {tags: {status: "processed"}});
    check caller->deleteBlob(event.path);
}
```

Copying to another container, listing, leases, tiers, snapshots, access policies, and SAS generation are not on the `Caller`; construct a client through a [connection](../supportive-artifacts/connections.md) for those. See the [action reference](product://connectors/catalog/storage-file/azure.storage.blob/action-reference) for every operation's parameters.

## Service and listener

Every Azure Blob Storage integration in the project tree is built from two pieces:

| Construct | Role |
|---|---|
| **Listener** | The connection to one storage account. Holds the credential and the transport that every service shares. |
| **Service** | The processing logic for one queue. Its `@blob:ServiceConfig` names the queue, holds the consumption settings, and the service holds the handlers that run for each event. |

Several services attach to one listener, each consuming its own queue with its own polling and its own poison queue. Two services of one listener cannot name the same queue; the compiler reports it. To process two containers differently, create one Event Grid subscription and one queue per container, and one service per queue:

```ballerina
import ballerinax/azure.storage.blob;

configurable string accountName = ?;
configurable string accountKey = ?;

listener blob:Listener blobListener = check new (auth = {accountName, accountKey});

type OrderRow record {|
    string orderId;
    int quantity;
|};

@blob:ServiceConfig {queueName: "order-events"}
isolated service on blobListener {
    isolated remote function onBlobCsv(OrderRow[] content, blob:BlobEvent event) returns error? {
        // Process order CSVs from the orders container
    }
}

@blob:ServiceConfig {queueName: "invoice-events", maxDeliveryCount: 3}
isolated service on blobListener {
    isolated remote function onBlobXml(xml content, blob:BlobEvent event) returns error? {
        // Process invoice XMLs from the invoices container
    }
}
```

Declaring the service and its handlers `isolated` lets the handlers run in parallel, up to **Batch Size** plus **New Batch Threshold** messages at once. A service that is not isolated still receives and holds that many messages, but runs its handler code in turn. The visual designer generates services without the `isolated` qualifier; add it in the code view when the handlers are safe to run in parallel.

For the general concept, see [Services and listeners](../../../get-started/concepts/concepts.mdx#integration-types).

## Service configuration

The required `@blob:ServiceConfig` annotation names the queue the service consumes and tunes how it is consumed. The visual designer writes it from the creation form; the advanced fields appear in the annotation only when set.

```ballerina
@blob:ServiceConfig {
    queueName: "invoice-events",
    poisonQueueName: "invoice-events-failed",
    batchSize: 8,
    redeliveryDelay: 30,
    maxDeliveryCount: 3
}
isolated service on blobListener {
    isolated remote function onBlobJson(Order 'order, blob:BlobEvent event) returns error? {
        // Process orders
    }
}
```

`@blob:ServiceConfig` fields:

| Field | Type | Default | Description |
|---|---|---|---|
| `queueName` | `string` | Required | The storage queue the Event Grid subscription delivers to. Follows Azure's queue name rules: 3 to 63 characters, lowercase letters, digits, and single hyphens. |
| `poisonQueueName` | `string?` | `{queueName}-poison` | The queue failed messages move to. Must differ from `queueName`. |
| `batchSize` | `int` | `16` | How many messages one receive fetches, 1 to 32. |
| `newBatchThreshold` | `int?` | Half of `batchSize` | The number of events still being handled at which the next batch is fetched, 0 to `batchSize`. |
| `maxPollingInterval` | `decimal` | `60` | The longest wait between polls of an empty queue. An empty queue is polled on a randomized exponential backoff that rises to this ceiling, so a busy queue is drained continuously while an idle one is probed sparsely. |
| `redeliveryDelay` | `decimal` | `0` | How long a message stays invisible after its handler fails, 0 to 604,800 seconds. |
| `maxDeliveryCount` | `int` | `5` | How many deliveries a message gets before it moves to the poison queue, at least 1. |

The ranges are validated at compile time when the values are literals, and when the service is attached otherwise.

## Listener configuration

The listener controls **how** to connect: the credential, the data-binding mode, and the transport. Open the listener's configuration by clicking its name (for example, `blobListener`) under **Listeners** in the sidebar.

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

| Field | Description | Default |
|---|---|---|
| **Name** | Identifier for the listener. Required. | |
| **Auth** | The authentication record, one of the five credential kinds. See [Creating an Azure Blob Storage service](#creating-an-azure-blob-storage-service). Required. | |
| **Relaxed Data Binding** | Relaxed data binding for the typed content handlers: JSON and CSV record binding treat a null value as an optional field and an absent field as a nilable field, and XML record binding tolerates undeclared elements. | `false` |
| **Retry Config** | Retry behaviour for service requests. | Connector defaults |
| **Transport Config** | HTTP transport settings: proxy, connection pool, and TLS. | Defaults |
| **Queue Service Url** | The queue service endpoint, including the scheme. Omit to derive it from the credential's blob endpoint or account name. Required for a custom domain or an emulator address. | Derived |

</TabItem>
<TabItem value="code" label="Ballerina Code">

Listener configuration maps to the `blob:ListenerConfiguration` record passed when constructing the listener:

```ballerina
listener blob:Listener blobListener = check new (
    auth = {accountName, accountKey},
    laxDataBinding = true
);
```

`blob:ListenerConfiguration` fields:

| Field | Type | Default | Description |
|---|---|---|---|
| `auth` | `blob:AuthConfig` | Required | The authentication configuration, one credential record. A SAS credential must be an account SAS spanning the queue and blob services. |
| `laxDataBinding` | `boolean` | `false` | Relaxed data binding for the typed content handlers: null and absent fields in JSON and CSV, undeclared elements in XML. Applies to every service of the listener. |
| `retryConfig` | `blob:RetryConfig` | Connector defaults | Retry behaviour for service requests; the secondary host, if given, serves the blob requests only. |
| `transportConfig` | `blob:TransportConfig` | `{}` | HTTP transport settings (proxy, connection pool, TLS), shared by every service and `Caller` of the listener. |
| `queueServiceUrl` | `string?` | Derived | The queue service endpoint URL, including the scheme. |

For the `RetryConfig` and `TransportConfig` field sets and the credential records, see the [connector configuration reference](product://connectors/catalog/storage-file/azure.storage.blob/action-reference#configuration).

</TabItem>
</Tabs>

The listener's connection pool is shared by every service and `Caller`. When the attached services' combined concurrency exceeds the pool's maximum connections, the listener logs a warning at attach time; raise the pool size in **Transport Config** or lower the services' batch sizes.

## What's next

- [Azure Files](azure-files.md) — poll a directory on an Azure file share instead of consuming blob events
- [Azure Blob Storage connector reference](product://connectors/catalog/storage-file/azure.storage.blob/overview) — setup, operations, and the full trigger reference
