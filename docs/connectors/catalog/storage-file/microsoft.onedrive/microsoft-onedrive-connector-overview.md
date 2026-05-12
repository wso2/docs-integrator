---
title: Overview
---

# Overview

Microsoft OneDrive is a cloud-based file hosting and synchronization service from Microsoft that enables storing, sharing, and collaborating on files. The Ballerina `ballerinax/microsoft.onedrive` connector (v3.0.1) provides programmatic access to OneDrive through the Microsoft Graph v1.0 API, enabling you to manage drives, files, folders, sharing permissions, and content uploads/downloads within your Ballerina integration flows.

## Key features

- Full CRUD operations on drives and drive items (files and folders)
- File content upload and download as byte arrays, including path-based access
- Folder creation and hierarchical children management
- Sharing and permission management via invite links and sharing links
- File check-in/check-out workflow support for collaborative editing
- Search across drive items by keyword
- Copy, move, restore, and permanently delete operations
- Upload session creation for large file uploads

## Actions

Actions are operations you invoke on Microsoft OneDrive from your integration. Use these actions for listing drives, uploading files, creating folders, sharing items, and more. The connector exposes actions through a single client:

| Client | Actions |
|--------|---------|
| `Client` | Drive CRUD, item CRUD, content upload/download, children management, sharing, search, copy, check-in/check-out, upload sessions |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through registering an application in Microsoft Entra ID (Azure AD) and obtaining the OAuth 2.0 credentials required to use the Microsoft OneDrive connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **Microsoft OneDrive** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Microsoft OneDrive Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-microsoft.onedrive)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
