---
title: Microsoft Excel
---

# Microsoft Excel

The Microsoft Excel connector provides programmatic access to Excel workbooks stored in OneDrive for Business and SharePoint through the Microsoft Graph v1.0 REST API. It covers the full workbook surface, including worksheets, cell ranges, tables, charts, PivotTables, named items, comments, and workbook sessions, so integrations can read, write, and format spreadsheet data on behalf of a signed-in user.

## Key Features

- Create, read, update, and delete worksheets and manage their properties
- Read and write cell ranges by address, and apply formatting, sorting, merging, and clearing
- Create and manage tables, table rows, and table columns
- Build and configure charts, including axes, legends, data labels, and base64 image export
- Manage named items and workbook-level comments with threaded replies
- Run multiple calls inside a persistent or non-persistent workbook session for consistency and performance
- Access and trigger workbook application recalculation
- Poll long-running operations and retrieve table row operation results

## Actions

The connector exposes a single `Client` that covers all workbook resources accessible through the Microsoft Graph Excel API.

| Client | Actions |
|--------|---------|
| `Client` | Workbooks, worksheets, cell ranges, tables, table rows, table columns, charts, chart axes, chart images, PivotTables, named items, comments, comment replies, workbook sessions, workbook operations |

See the **[Action Reference](action-reference.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: Register a Microsoft Entra ID application, configure Graph API permissions, and obtain the OAuth 2.0 refresh token required to authenticate the connector.

* **[Action Reference](action-reference.md)**: Full reference for all clients, with operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **Microsoft Excel** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Microsoft Excel Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-microsoft.excel)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
