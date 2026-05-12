---
title: HubSpot CRM Schemas
---

HubSpot CRM Schemas lets you define, retrieve, update, and delete custom object types in the HubSpot CRM, along with their properties and inter-object associations. The Ballerina `ballerinax/hubspot.crm.obj.schemas` connector (v2.0.0) provides full programmatic access to the HubSpot CRM Object Schemas API, enabling you to model custom data structures that fit your business needs directly from your Ballerina integration flows.

## Key features

- Retrieve all custom object schemas or fetch a specific schema by its object type ID or fully qualified name
- Create new custom object schemas with user-defined properties, display labels, required fields, and searchable property configuration
- Update existing schemas: modify labels, primary/secondary display properties, required fields, and searchability settings
- Delete (archive) custom object schemas that are no longer required
- Define associations between custom object types to model relationships across the HubSpot CRM
- Remove individual association definitions from a custom object schema
- Supports OAuth 2.0 (refresh token), Bearer Token, and Private App (API key) authentication

## Actions

Actions are operations you invoke on HubSpot from your integration, including listing schemas, creating custom object types, patching definitions, and managing associations. All actions are exposed through a single client:

| Client | Actions |
|--------|---------|
| `Client` | Schema CRUD (get all, create, get by type, update, delete), association management (create, remove) |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating a HubSpot Private App and obtaining the access token required to use the HubSpot CRM Schemas connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **HubSpot CRM Schemas** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [HubSpot CRM Schemas Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-hubspot.crm.object.schemas)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
