---
title: Overview
---

# Overview

Azure Storage Service provides scalable cloud storage for blobs (binary large objects) and file shares on Microsoft Azure. The Ballerina `ballerinax/azure_storage_service` connector (v4.3.3) exposes two sub-modules: `blobs` for working with Azure Blob Storage containers and blob objects, and `files` for managing Azure File Shares, enabling seamless integration of Azure storage into Ballerina-based applications.

## Key features

- Blob CRUD operations: upload, download, delete, and copy block blobs, page blobs, and append blobs
- Large blob upload via chunked block staging (`putBlock` + `putBlockList`) and a high-level `uploadLargeBlob` helper
- Container lifecycle management: create, delete, and inspect containers, metadata, ACLs, and service properties
- Azure File Share management; create and delete shares, list shares, and configure file service properties
- File operations: upload, download, copy, delete, and manage files and directories within Azure file shares
- Byte-range access for both blobs (`ByteRange`) and files (`ContentRange`) for efficient partial reads
- Dual authentication support: Azure Storage Account access key or Shared Access Signature (SAS)

## Actions

Actions are operations you invoke on Azure Storage from your integration. Use these actions for listing containers, uploading blobs, managing file shares, reading files, and more. The connector exposes actions across four clients split between two sub-modules:

| Client | Actions |
|--------|---------|
| `Blob Client` | Blob CRUD, block operations, page blob ranges, append blob blocks, large-file upload |
| `Blob Management Client` | Container create/delete, container properties/metadata/ACL, account information, blob service properties |
| `File Client` | File and directory CRUD, direct upload, byte-range read, list files and directories, file metadata |
| `File Management Client` | File share create/delete, list shares, get and set file service properties |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating an Azure Storage account and obtaining the credentials required to use the Azure Storage Service connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Azure Storage Service Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-azure-storage-service)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
