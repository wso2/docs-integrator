---
title: HubSpot CRM Associations Schema
---

HubSpot is an AI-powered customer relationship management (CRM) platform. The Ballerina `ballerinax/hubspot.crm.associations.schema` connector (v2.0.0) provides programmatic access to HubSpot's CRM Associations Schema API, enabling you to manage association definitions and configurations between CRM object types such as contacts, companies, deals, and line items.

## Key features

- Read association definitions and labels between any two CRM object types
- Create custom user-defined association definitions with labels and inverse labels
- Update existing association definition labels
- Delete association definitions by type ID
- Retrieve all association configurations across object types
- Batch create, update, and purge association configurations with max cardinality constraints
- OAuth 2.0 and private app API key authentication support

## Actions

Actions are operations you invoke on HubSpot from your integration: reading association definitions, creating custom labels, managing configurations, and more. The connector exposes all actions through a single client:

| Client | Actions |
|--------|---------|
| `Client` | Association definition CRUD, association configuration batch operations, label management |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating a HubSpot developer app and obtaining the OAuth 2.0 credentials required to use the HubSpot CRM Associations Schema connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **HubSpot CRM Associations Schema** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [HubSpot CRM Associations Schema Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-hubspot.crm.associations.schema)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
