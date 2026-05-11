---
title: HubSpot CRM Commerce Discounts
---

HubSpot CRM Commerce Discounts is part of HubSpot's CRM platform, enabling management of discount objects used in commerce workflows such as quotes and invoices. The Ballerina `ballerinax/hubspot.crm.commerce.discounts` connector (v2.0.0) provides programmatic access to HubSpot's Discounts API, allowing you to create, read, update, delete, batch process, and search discount records from your Ballerina integration flows.

## Key features

- Full CRUD operations on individual discount records via the HubSpot CRM v3 API
- Batch create, read, update, upsert, and archive operations for processing multiple discounts in a single request
- Flexible search with filter groups, sorting, and property selection
- Support for OAuth 2.0 and private app API key authentication
- Configurable HTTP/2 transport with retry, circuit breaker, and proxy support
- Association support for linking discounts to other CRM objects

## Actions

Actions are operations you invoke on HubSpot to manage discount records: creating discounts, reading them individually or in batches, updating properties, searching, and archiving. The connector exposes a single client:

| Client | Actions |
|--------|---------|
| `Client` | Discount CRUD, batch operations, search |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating a HubSpot private app or OAuth app and obtaining the credentials required to use the HubSpot CRM Commerce Discounts connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **HubSpot CRM Commerce Discounts** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [HubSpot CRM Commerce Discounts Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-hubspot.crm.commerce.discounts)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
