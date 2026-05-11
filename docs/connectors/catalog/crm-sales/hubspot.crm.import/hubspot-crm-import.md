---
title: HubSpot CRM Import
---

HubSpot CRM Import allows you to bulk-import contacts, companies, deals, and other CRM objects from CSV files into HubSpot. The Ballerina `ballerinax/hubspot.crm.import` connector (v4.0.0) provides programmatic access to the HubSpot CRM Imports API, enabling you to start imports, monitor their progress, retrieve errors, and cancel active imports from your Ballerina integration flows.

## Key features

- Start new CRM imports by uploading CSV files with column mappings and import configuration
- Monitor import progress by retrieving detailed status and metadata for any import
- List all active imports with pagination support
- Retrieve detailed error information for failed import rows, including row data and error messages
- Cancel active imports programmatically
- Supports OAuth 2.0, Bearer Token, and Private App (legacy API key) authentication

## Actions

Actions are operations you invoke on HubSpot from your integration: starting imports, checking their status, retrieving errors, and canceling active imports. The HubSpot CRM Import connector exposes actions through a single client:

| Client | Actions |
|--------|---------|
| `Client` | Start imports, get import status, list active imports, retrieve import errors, cancel imports |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating a HubSpot app and obtaining the OAuth 2.0 credentials required to use the HubSpot CRM Import connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [HubSpot CRM Import Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-hubspot.crm.import)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
