---
title: HubSpot CRM Commerce Taxes
---

HubSpot CRM Commerce Taxes is part of HubSpot's CRM Commerce API suite, providing programmatic management of tax objects used in quotes, invoices, and other commerce documents. The Ballerina `ballerinax/hubspot.crm.commerce.taxes` connector (v2.0.0) enables you to create, read, update, archive, search, and batch-manage tax records through the HubSpot REST API.

## Key features

- Full CRUD operations on HubSpot commerce tax objects (create, read, update, archive)
- Batch operations for creating, reading, updating, upserting, and archiving multiple tax records in a single call
- Flexible search with filters, sorting, and pagination for finding tax records
- Association management to link tax objects with other HubSpot CRM objects
- Property history retrieval to track changes to tax record fields over time
- Support for both OAuth 2.0 and private app API key authentication

## Actions

Actions are operations you invoke on HubSpot to manage commerce tax objects: listing, creating, updating, searching, and batch-processing tax records. The connector exposes actions through a single client:

| Client | Actions |
|--------|---------|
| `Client` | Tax CRUD, search, batch create/read/update/upsert/archive |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating a HubSpot private app or OAuth app and obtaining the credentials required to use the HubSpot CRM Commerce Taxes connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **HubSpot CRM Commerce Taxes** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [HubSpot CRM Commerce Taxes Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-hubspot.crm.commerce.taxes)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
