---
connector: true
connector_name: "microsoft.sharepoint.pages"
title: "Microsoft SharePoint Pages"
description: "Overview of the ballerinax/microsoft.sharepoint.pages connector for WSO2 Integrator."
---

The Microsoft SharePoint Pages connector integrates with the [Microsoft SharePoint Pages API](https://learn.microsoft.com/en-us/graph/api/resources/sitepage?view=graph-rest-1.0) via the Microsoft Graph REST API v1.0, enabling you to programmatically create, read, update, and delete SharePoint site pages. It provides comprehensive access to page layouts, horizontal and vertical sections, web parts, and page metadata within SharePoint Online sites.

## Key Features

- Create, list, retrieve, update, and delete SharePoint site pages
- Manage canvas layouts including horizontal and vertical sections
- Add, update, remove, and query web parts within page sections
- Retrieve web part positioning information
- Publish site pages programmatically
- Access page creator and modifier user details and mailbox settings
- Query resource counts for pages, sections, columns, and web parts
- Filter and sort results using OData query parameters

## Actions

The connector provides a single client that covers all SharePoint Pages API operations through the Microsoft Graph v1.0 endpoint.

| Client | Actions |
|--------|---------|
| `Client` | Page management, canvas layout management, horizontal section management, vertical section management, web part management, page publishing, user metadata retrieval |

See the **[Action Reference](action-reference.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: How to create a Microsoft Azure application, register API permissions, and obtain OAuth 2.0 credentials for the connector.

* **[Action Reference](action-reference.md)**: Full reference for all clients — operations, parameters, return types, and sample code.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Microsoft SharePoint Pages Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-microsoft.sharepoint.pages)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.