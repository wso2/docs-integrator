---
title: Azure Files
---

[Azure Files](https://learn.microsoft.com/en-us/azure/storage/files/storage-files-introduction) offers fully managed file shares in the cloud, accessible via the industry-standard SMB and NFS protocols and a REST API. The `ballerinax/azure.storage.files` connector connects WSO2 Integrator to Microsoft Azure Files, managing shares and the directories and files within them: uploads, downloads, copies, renames, byte ranges, snapshots, and SAS token generation. A polling `Listener` turns files arriving on a share into service events.

## Key features

- Share-scoped `Client` for directory and file operations, transfers, copies, and byte ranges
- Account-level `AdminClient` for creating, listing, deleting, and restoring shares
- Polling `Listener` that routes files arriving on a watched path to raw, typed, or streaming content handlers, with an optional `onError` error handler
- Share snapshots
- Authentication with shared key, SAS tokens, connection strings, and Microsoft Entra ID
- GraalVM compatible for native image builds

## Actions

Actions are operations you invoke on Azure Files from your integration: uploading and downloading files, managing directories and shares, copying, generating SAS tokens, and more. The connector exposes actions through two clients.

| Client | Actions |
|--------|---------|
| `Client` | Directory, file, transfer, copy, range, snapshot, and SAS operations within one share |
| `AdminClient` | Account-level share management and file-service configuration |

See the **[Action Reference](action-reference.md)** for the full list of operations, parameters, and sample code for each client.

## Triggers

Triggers let your integration react to files arriving on a file share. The connector uses a polling `Listener` that periodically scans a watched path on a share and routes each file present there to the matching content handler of your service.

| Event | Callback | Description |
|-------|----------|-------------|
| Any file without a dedicated typed handler | `onFile` | Receives the raw file content |
| Text file (`.txt`) | `onFileText` | Receives the content as a string |
| JSON file (`.json`) | `onFileJson` | Receives the parsed JSON content |
| XML file (`.xml`) | `onFileXml` | Receives the parsed XML content |
| CSV file (`.csv`) | `onFileCsv` | Receives the parsed rows |
| Listener error | `onError` | Receives poll failures, content-read failures, and content-binding failures |

See the **[Trigger Reference](trigger-reference.md)** for listener configuration, the service model, and callback signatures.

## Documentation

* **[Setup Guide](setup-guide.md)**: How to create a storage account and file share, and obtain credentials.

* **[Action Reference](action-reference.md)**: Full reference for both clients: operations, parameters, return types, and sample code.

* **[Trigger Reference](trigger-reference.md)**: Reference for event-driven integration using the listener and service model.

* **[Example](example.md)**: Learn how to build and configure an integration using the **Azure Files** connector, including connection setup, operation configuration, execution flow, and event-driven trigger setup.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this module, please create a pull request in the following repository.

* [Azure Files Module GitHub repository](https://github.com/ballerina-platform/module-ballerinax-azure.storage.files)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
