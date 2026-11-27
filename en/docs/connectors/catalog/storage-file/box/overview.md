---
connector: true
connector_name: "box"
title: "Box"
description: "Overview of the ballerinax/box connector for WSO2 Integrator."
---

# Box

Box is a content cloud platform for storing, sharing, and managing files with enterprise-grade features for collaboration, governance, and security. The Box connector lets applications interact with the [Box Platform API](https://developer.box.com/reference/) to manage files, folders, users, and advanced capabilities such as Box Sign and Box AI.

## Key Features

- Upload, download, copy, update, and delete files and folders, including version history and chunked upload sessions
- Share content through shared links, collaborations, web links, and webhooks
- Manage enterprise users, groups, memberships, and terms of service
- Apply metadata templates and taxonomies for content classification
- Enforce retention policies, legal holds, and information barriers for compliance
- Search content across the enterprise and manage comments and review tasks
- Create and manage Box Sign requests for electronic signatures
- Call Box AI for content intelligence and analysis

## Actions

The connector exposes a single client that covers the full Box Platform API surface.

| Client | Actions |
|--------|---------|
| `Client` | Files, Folders, Users, Groups, Collaborations, Comments, Tasks, Web Links, Shared Links, Metadata, Search, Webhooks, Box Sign, Box AI, Retention Policies, Legal Holds |

See the **[Action Reference](action-reference.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: How to create a Box Platform application and obtain OAuth 2.0 credentials for the connector.

* **[Action Reference](action-reference.md)**: Full reference for all clients, with operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **Box** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Box Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-box)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
