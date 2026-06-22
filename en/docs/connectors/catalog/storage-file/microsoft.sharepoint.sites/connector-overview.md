---
connector: true
connector_name: "microsoft.sharepoint.sites"
title: "Microsoft SharePoint Sites"
description: "Overview of the ballerinax/microsoft.sharepoint.sites connector for WSO2 Integrator."
---

The `ballerinax/microsoft.sharepoint.sites` connector integrates with the Microsoft SharePoint Sites API, a cloud-based collaboration and content management platform that enables organizations to create, share, and manage sites, documents, and resources securely across teams. It is built on top of the Microsoft Graph REST API v1.0 and exposes operations for managing sites, lists, content types, columns, drives, permissions, and analytics.

## Key Features

- Discover and retrieve SharePoint sites by ID, path, or across the entire tenant
- Manage lists, list items, columns, and content types within a site
- Browse and manage drives, drive items, and document libraries
- Read and update site analytics, activity statistics, and usage trends
- Manage site permissions, including granting and revoking access
- Publish, unpublish, and copy content types across sites and hub sites
- Track changes to sites with delta queries for incremental synchronization
- Authenticate securely with Azure AD OAuth 2.0 client credentials

## Actions

The connector exposes a single client that covers all SharePoint Sites operations exposed by Microsoft Graph v1.0.

| Client   | Actions                                                                                                        |
| -------- | -------------------------------------------------------------------------------------------------------------- |
| `Client` | Sites, Lists, List items, Columns, Content types, Drives, Permissions, Analytics, Operations, External columns |

See the **[Action Reference](action-reference.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

- **[Setup Guide](setup-guide.md)**: Walks through registering an Azure AD application and configuring the API permissions required to access SharePoint via Microsoft Graph.

- **[Action Reference](action-reference.md)**: Full reference for all clients — operations, parameters, return types, and sample code.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

- [Microsoft SharePoint Sites Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-microsoft.sharepoint.sites)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.

