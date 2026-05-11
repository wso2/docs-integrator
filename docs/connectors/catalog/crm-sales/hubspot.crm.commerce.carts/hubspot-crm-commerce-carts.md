---
title: HubSpot CRM Commerce Carts
---

HubSpot CRM Commerce Carts is part of HubSpot's commerce suite, enabling management of shopping cart objects within the HubSpot CRM. The Ballerina `ballerinax/hubspot.crm.commerce.carts` connector (v2.0.0) provides programmatic access to the HubSpot Carts API, allowing you to create, read, update, delete, search, and batch-manage cart records in your integration flows.

## Key features

- Full CRUD operations on HubSpot cart objects: create, read, update, and archive individual carts
- Batch operations for creating, reading, updating, upserting, and archiving multiple carts in a single request
- Search carts with flexible filter groups, property filters, and sorting
- Retrieve carts with associated objects and property history
- Support for OAuth 2.0, Bearer Token, and Private App (API key) authentication
- Cursor-based pagination for listing and searching large cart collections

## Actions

Actions are operations you invoke on HubSpot to manage cart objects: listing carts, creating new carts, updating properties, running searches, and performing bulk operations. The connector exposes a single client:

| Client | Actions |
|--------|---------|
| `Client` | Cart CRUD, search, batch create/read/update/upsert/archive |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating a HubSpot App and obtaining the OAuth 2.0 credentials required to use the HubSpot CRM Commerce Carts connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **HubSpot CRM Commerce Carts** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [HubSpot CRM Commerce Carts Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-hubspot.crm.commerce.carts)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
