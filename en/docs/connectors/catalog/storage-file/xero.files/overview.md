---
connector: true
connector_name: "xero.files"
title: "Xero Files"
description: "Overview of the ballerinax/xero.files connector for WSO2 Integrator."
---

# Xero Files

Xero Files lets applications work with the [Xero Files API](https://developer.xero.com/documentation/api/files/overview), to store, organise and retrieve documents in a Xero organisation's file library. The connector supports uploading files to the inbox or to named folders, managing folder hierarchies, downloading file content, and linking documents to Xero accounting objects such as invoices, contacts, and credit notes.

## Key Features

- Upload files to the Xero inbox or directly to a specific folder
- Download the binary content of any stored file
- Create, retrieve, update, and delete folders, including access to the special inbox folder
- Update file properties (name, folder) and delete files
- Link files to Xero accounting objects such as invoices, contacts, and bank transactions
- Retrieve all associations for a file or for a specific Xero object
- Count associations across multiple objects in a single call
- Page through large file lists with sort and direction controls

## Actions

The connector exposes a single client for all file, folder, and association operations against the Xero Files API.

| Client | Actions |
|--------|---------|
| `Client` | File upload and download, file metadata management, folder management, inbox access, file-object associations |

See the **[Action Reference](action-reference.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: How to create a Xero app, obtain OAuth 2.0 credentials, acquire a refresh token, and find your tenant ID.

* **[Action Reference](action-reference.md)**: Full reference for all clients, with operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **Xero Files** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Xero Files Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-xero.files)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
