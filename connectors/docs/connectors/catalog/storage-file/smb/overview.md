---
title: SMB
---

# SMB

The SMB connector enables integration with Windows file servers, NAS appliances, and Samba shares using the Server Message Block (SMB) protocol. It supports reading, writing, and managing files on remote shares, as well as event-driven processing of files that appear or disappear from watched directories.

The connector supports SMB dialects 2.0.2 through 3.1.1, and authenticates via NTLMv2 credentials or Kerberos, with optional message signing and data encryption.

## Key Features

- Read and write text, JSON, XML, CSV, and binary file content with automatic parsing and type binding
- Stream large files in chunks without loading them entirely into memory
- List, create, move, copy, rename, and delete files and directories on the share
- Patch (partial write) files at a byte offset without rewriting the whole file
- Poll a share directory for new or deleted files and dispatch them to typed service handlers
- Filter files by name pattern at the listener or individual handler level
- Automatically move or delete processed files after successful or failed handling
- Recover from malformed CSV rows using the fail-safe mode rather than failing the whole file

## Actions

The connector exposes a single client for imperative file operations on SMB shares.

| Client | Actions |
|--------|---------|
| `Client` | Read files (text, JSON, XML, CSV, bytes, streams), Write files, Patch files, List directories, Create/delete/move/copy/rename files and directories, Check existence and file size |

See the **[Action Reference](action-reference.md)** for the full list of operations, parameters, and sample code for each client.

## Triggers

The SMB listener polls a share directory and dispatches file events to service handlers. Handlers are matched by file extension and the type they declare for the content parameter.

Supported trigger events:

| Event | Callback | Description |
|-------|----------|-------------|
| File added (any / fallback) | `onFile` | Called for any new file not matched by a more specific handler; content is a byte array or stream |
| Text file added | `onFileText` | Called for `.txt`, `.log`, and `.md` files; content is a `string` |
| JSON file added | `onFileJson` | Called for `.json` files; content is `json` or a bound record type |
| XML file added | `onFileXml` | Called for `.xml` files; content is `xml` or a bound record type |
| CSV file added | `onFileCsv` | Called for `.csv` files; content is `string[][]`, a record array, or a stream |
| File deleted | `onFileDelete` | Called when a tracked file disappears from the watched directory |
| Error | `onError` | Called when the listener fails to poll, read, or bind a file, or when a handler returns an error |

See the **[Trigger Reference](trigger-reference.md)** for listener configuration, service callbacks, and the event payload structure.

## Documentation

* **[Setup Guide](setup-guide.md)**: Steps to obtain access credentials and configure your SMB server before connecting.

* **[Action Reference](action-reference.md)**: Full reference for all clients — operations, parameters, return types, and sample code.

* **[Trigger Reference](trigger-reference.md)**: Reference for event-driven integration using the listener and service model.

* **[Example](example.md)**: Learn how to build and configure an integration using the **SMB** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [SMB Connector GitHub repository](https://github.com/ballerina-platform/module-ballerina-smb)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
