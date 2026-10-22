---
connector: true
connector_name: "azure.storage.blob"
title: "Azure Blob Storage"
description: "Overview of the ballerinax/azure.storage.blob connector for WSO2 Integrator."
---

[Azure Blob Storage](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blobs-introduction) is Microsoft's object storage for the cloud, holding unstructured data such as documents, media, backups, and logs in containers and serving it over HTTP. The `ballerinax/azure.storage.blob` connector connects WSO2 Integrator to Azure Blob Storage, managing containers and the blobs within them: uploads, downloads, typed data binding, copies, access tiers, index tags, snapshots, leases, append and page blobs, block staging, and SAS token generation. A `Listener` consumes the blob events that Azure Event Grid delivers to a storage queue and turns created and deleted blobs into service events.

## Key features

- Container-scoped `Client` for blob operations, transfers with typed data binding, copies, access tiers, index tags, snapshots, and leases
- Account-level `AdminClient` for creating, listing, deleting, and restoring containers and for the service configuration
- Append blobs, page blobs, and block staging for composing blobs from separately uploaded pieces
- `Listener` whose services consume the storage queues that Event Grid subscriptions deliver blob events to, dispatching created and deleted events to typed handlers with a `Caller` bound to the event's container, settling each message by the handler's return, and moving failures to a poison queue
- `parseEvent` for blob events received through other routes, such as an Azure Service Bus queue
- Authentication with shared key, SAS tokens, connection strings, and Microsoft Entra ID
- GraalVM compatible for native image builds

## Actions

Actions are operations you invoke on Azure Blob Storage from your integration: uploading and downloading blobs, listing and tagging them, managing containers, copying, leasing, generating SAS tokens, and more. The connector exposes actions through two clients.

| Client | Actions |
|--------|---------|
| `Client` | Container, listing, transfer, copy, access tier, index tag, snapshot, lease, append blob, page blob, block, and SAS operations within one container |
| `AdminClient` | Account-level container management, blob service configuration, account information, user delegation keys, and account SAS |

See the **[Action Reference](action-reference.md)** for the full list of operations, parameters, and sample code for each client.

## Triggers

Triggers let your integration react to blobs being created or deleted. Azure Event Grid delivers the events to a storage queue, and a `Listener` service consumes that queue, fetching each created blob's content in the format the handler declares.

| Event | Callback | Description |
|-------|----------|-------------|
| Any created blob without a dedicated typed handler | `onBlob` | Receives the raw blob content |
| Created text blob (`.txt`) | `onBlobText` | Receives the content as a string |
| Created JSON blob (`.json`) | `onBlobJson` | Receives the parsed JSON content or a record |
| Created XML blob (`.xml`) | `onBlobXml` | Receives the parsed XML content or a record |
| Created CSV blob (`.csv`) | `onBlobCsv` | Receives the parsed rows |
| Deleted blob | `onBlobDelete` | Receives the event of a deleted blob |
| Listener error | `onError` | Receives poll failures, unparseable messages, content-fetch and content-binding failures, messages past the delivery limit, a `Caller` that could not be built, and failed poison moves |

See the **[Trigger Reference](trigger-reference.md)** for listener configuration, the service model, and callback signatures.

## Documentation

* **[Setup Guide](setup-guide.md)**: How to create a storage account and container, obtain credentials, and wire the event queue the listener consumes.

* **[Action Reference](action-reference.md)**: Full reference for both clients: operations, parameters, return types, and sample code.

* **[Trigger Reference](trigger-reference.md)**: Reference for event-driven integration using the listener and service model.

* **[Example](example.md)**: Learn how to build and configure an integration using the **Azure Blob Storage** connector, including connection setup, operation configuration, execution flow, and event-driven trigger setup.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this module, please create a pull request in the following repository.

* [Azure Blob Storage Module GitHub repository](https://github.com/ballerina-platform/module-ballerinax-azure.storage.blob)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
