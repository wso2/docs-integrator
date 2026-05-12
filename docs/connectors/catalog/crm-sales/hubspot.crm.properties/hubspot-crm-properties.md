---
title: HubSpot CRM Properties
---

HubSpot CRM Properties API allows you to manage custom and default properties on HubSpot CRM objects such as Contacts, Companies, Deals, and Tickets. The Ballerina `ballerinax/hubspot.crm.properties` connector (v2.0.0) provides programmatic access to create, read, update, and archive properties and property groups, as well as batch operations for managing multiple properties at once.

## Key features

- Full CRUD operations on CRM object properties (create, read, update, archive)
- Property group management for organizing related properties together
- Batch operations for creating, reading, and archiving multiple properties in a single request
- Support for enumeration properties with custom option values
- Flexible authentication via OAuth 2.0, bearer token, or private app API keys
- Configurable for any HubSpot CRM object type (Contact, Company, Deal, Ticket, or custom objects)

## Actions

Actions are operations you invoke on the HubSpot CRM Properties API from your integration, including creating custom properties, managing property groups, performing batch operations, and more. The connector exposes a single client:

| Client | Actions |
|--------|---------|
| `Client` | Property CRUD, property group management, batch property operations |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating a HubSpot developer app and obtaining the OAuth 2.0 credentials required to use the HubSpot CRM Properties connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **HubSpot CRM Properties** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [HubSpot CRM Properties Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-hubspot.crm.properties)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
