---
title: HubSpot CRM Associations
---

HubSpot CRM Associations is the HubSpot API for creating, reading, and managing relationships between CRM objects such as contacts, companies, deals, and tickets. The Ballerina `ballerinax/hubspot.crm.associations` connector (v2.0.0) provides programmatic access to HubSpot's Associations v4 API, enabling you to define both default HubSpot-defined and custom labeled associations between any two CRM object types within your Ballerina integration flows.

## Key features

- List all associations of a specific type between two CRM objects using a paginated GET operation
- Create or update labeled association relationships between individual pairs of CRM records
- Assign default HubSpot-defined associations between two records with a single PUT call
- Batch-read associations for multiple source objects in one request to minimize API calls
- Batch-create custom labeled associations across many object pairs simultaneously
- Batch-create default associations for bulk data ingestion and migration scenarios
- Selectively remove specific association labels between objects without deleting the entire relationship
- Archive all associations between two records or bulk-archive across many pairs in one operation
- Generate high-usage association reports to monitor API consumption

## Actions

Actions are operations you invoke on HubSpot from your integration: reading associations, creating labeled relationships, performing bulk operations, and generating usage reports. The HubSpot CRM Associations connector exposes all actions through a single client:

| Client | Actions |
|--------|---------|
| `Client` | Single-record association CRUD, batch read/create/archive, label management, usage reports |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating a HubSpot app and obtaining the OAuth 2.0 credentials required to authenticate with the HubSpot CRM Associations API.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **HubSpot CRM Associations** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [HubSpot CRM Associations Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-hubspot.crm.associations)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
