---
title: Overview
---

# Overview

Google Sheets is a cloud-based spreadsheet application by Google that enables collaborative data management, analysis, and automation. The Ballerina `ballerinax/googleapis.sheets` connector (v3.5.1) provides programmatic access to the Google Sheets API v4, enabling you to manage spreadsheets, worksheets, and perform row-level, column-level, and cell-level data operations from your Ballerina integration flows.

## Key features

- Spreadsheet management: create, open (by ID or URL), list, and rename spreadsheets
- Worksheet management: add, remove, rename, copy, and clear worksheets
- Range operations: read, write, and clear rectangular ranges of cells using A1 notation
- Row operations: create/update, get, delete, and append rows with support for data filters and developer metadata
- Column operations: create/update, get, and delete columns by position
- Cell operations: set, get, and clear individual cell values
- Data filtering: query rows using A1Range, GridRange, or DeveloperMetadataLookup filters
- Bulk append: append single or multiple rows to the bottom of a worksheet table

## Actions

Actions are operations you invoke on Google Sheets from your integration. Use these actions for creating spreadsheets, reading cell data, appending rows, and more. The Google Sheets connector exposes all actions through a single client:

| Client | Actions |
|--------|---------|
| `Client` | Spreadsheet CRUD, worksheet management, range/row/column/cell operations, data filtering, append |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating a Google Cloud Platform project, enabling the Google Sheets API, and obtaining the OAuth 2.0 credentials required to use the Google Sheets connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **Google Sheets** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Google Sheets Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-googleapis.sheets)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
