---
title: HubSpot CRM Commerce Quotes
---

HubSpot CRM Commerce Quotes API enables you to create, manage, and track sales quotes within HubSpot CRM. The Ballerina `ballerinax/hubspot.crm.commerce.quotes` connector (v2.0.0) provides programmatic access to HubSpot's Quotes API v3, allowing you to perform CRUD operations, batch processing, and search on quote objects from your Ballerina integration flows.

## Key features

- Full CRUD operations on HubSpot quote objects: create, read, update, and archive
- Batch operations for creating, reading, updating, upserting, and archiving multiple quotes in a single request
- Flexible search with filter groups, sorting, and property selection
- Association support for linking quotes to other HubSpot CRM objects (deals, contacts, line items)
- Configurable pagination for listing and searching large collections of quotes
- Support for OAuth 2.0 and private app API key authentication

## Actions

Actions are operations you invoke on HubSpot to manage quote objects: creating quotes, retrieving quote details, updating properties, running batch operations, and searching. The connector exposes actions through a single client:

| Client | Actions |
|--------|---------|
| `Client` | Quote CRUD, batch create/read/update/upsert/archive, search |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating a HubSpot developer account and obtaining the OAuth 2.0 credentials required to use the HubSpot CRM Commerce Quotes connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **HubSpot CRM Commerce Quotes** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [HubSpot CRM Commerce Quotes Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-hubspot.crm.commerce.quotes)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
