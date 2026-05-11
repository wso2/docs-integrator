---
title: HubSpot CRM Engagements Communications
---

HubSpot CRM Engagements Communications is a part of the HubSpot CRM platform that manages communication records such as WhatsApp messages, LinkedIn messages, and other messaging interactions. The Ballerina `ballerinax/hubspot.crm.engagements.communications` connector (v2.0.0) provides programmatic access to HubSpot communication records through the CRM API, enabling you to create, retrieve, update, archive, batch-process, and search communication objects within your Ballerina integration flows.

## Key features

- Full CRUD operations on HubSpot communication records (create, read, update, archive)
- Batch operations for creating, reading, updating, upserting, and archiving multiple communications at once
- Search communications using filters, queries, and sorting with the HubSpot search API
- Association support to link communications with contacts, deals, and other CRM objects
- Property history retrieval for tracking changes to communication fields over time
- Flexible authentication via OAuth 2.0, bearer token, or private app API keys

## Actions

Actions are operations you invoke on HubSpot from your integration: creating communication records, retrieving messages, running batch operations, and searching for specific communications. The connector exposes actions through a single client:

| Client | Actions |
|--------|---------|
| `Client` | Communication record CRUD, batch operations, search |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating a HubSpot developer app and obtaining the OAuth 2.0 credentials required to use the HubSpot CRM Engagements Communications connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **HubSpot CRM Engagements Communications** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [HubSpot CRM Engagements Communications Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-hubspot.crm.engagements.communications)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
