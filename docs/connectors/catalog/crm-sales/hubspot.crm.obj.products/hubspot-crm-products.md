---
title: HubSpot CRM Products
---

HubSpot CRM Products is a core object in HubSpot that represents the goods and services you sell, enabling you to associate products with deals and track revenue. The Ballerina `ballerinax/hubspot.crm.obj.products` connector (v2.0.0) provides programmatic access to the HubSpot CRM Products API, allowing you to create, retrieve, update, archive, search, and batch-manage product records within your HubSpot portal.

## Key features

- Create, read, update, and archive individual product records in HubSpot CRM
- Batch operations for creating, reading, updating, upserting, and archiving multiple products in a single request
- Search and filter products using flexible filter groups, property filters, and sort criteria
- Retrieve product property history and associated object data alongside product records
- Upsert support: create or update products by unique property values without requiring internal IDs
- OAuth 2.0 and Private App (API key) authentication support for both developer and production scenarios

## Actions

Actions are operations you invoke on HubSpot CRM Products from your integration, including listing products, creating records, running batch updates, searching by property filters, and more. The connector exposes all actions through a single client:

| Client | Actions |
|--------|---------|
| `Client` | Individual product CRUD, batch create/read/update/upsert/archive, search |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating a HubSpot Private App and obtaining the access token required to authenticate the HubSpot CRM Products connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **HubSpot CRM Products** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [HubSpot CRM Products Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-hubspot.crm.object.products)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
