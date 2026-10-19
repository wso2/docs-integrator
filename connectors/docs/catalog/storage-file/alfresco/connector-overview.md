---
title: Overview
---

# Overview

Alfresco is a modern, open-source content management platform that enables organizations to manage enterprise documents, digital assets, and records with efficiency and control. The Ballerina `ballerinax/alfresco` connector (v2.0.1) provides programmatic access to Alfresco Content Services through the REST API Version 1, enabling you to perform core content operations such as uploading and downloading files, managing nodes and folders, setting metadata, handling permissions, and managing sites, groups, and people within your Ballerina integration flows.

## Key features

- Full CRUD operations on nodes (files and folders) including create, read, update, delete, copy, move, lock, and unlock
- Document content upload and download with binary content handling
- Version history management with version retrieval, revert, and rendition support
- Site management including creation, membership, and group-based access control
- People and group administration with user creation, update, favorites, and activity tracking
- Comment, tag, and rating management on nodes for collaboration
- Shared link creation and management for external content sharing
- Audit trail access, action execution, trash can (deleted node) management, and search/find operations

## Actions

Actions are operations you invoke on Alfresco from your integration. Use these actions for managing nodes, uploading documents, creating sites, managing users, and more. The Alfresco connector exposes all actions through a single client:

| Client | Actions |
|--------|---------|
| `Client` | Node CRUD, content upload/download, versioning, sites, people, groups, tags, comments, ratings, shared links, audit, actions, search |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating an Alfresco account and obtaining the Basic Authentication credentials required to use the Alfresco connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **Alfresco** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Alfresco Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-alfresco)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
