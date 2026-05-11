---
title: HubSpot CRM Engagement Notes
---

HubSpot CRM Engagement Notes is part of HubSpot's CRM platform, enabling teams to create, manage, and associate notes with CRM records such as contacts, companies, and deals. The Ballerina `ballerinax/hubspot.crm.engagement.notes` connector (v2.0.0) provides programmatic access to the HubSpot Notes API, allowing you to perform CRUD operations, batch processing, and search across engagement notes.

## Key features

- Full CRUD operations on engagement notes: create, read, update, and archive individual notes
- Batch operations for creating, reading, updating, upserting, and archiving notes in bulk
- Search notes using filters, sorting, and pagination with the HubSpot search API
- Associate notes with other CRM objects such as contacts, companies, and deals
- Retrieve notes with their associations and property history
- OAuth 2.0 and private app API key authentication support

## Actions

Actions are operations you invoke on HubSpot from your integration: creating notes, searching engagement records, running batch operations, and more. The connector exposes a single client:

| Client | Actions |
|--------|---------|
| `Client` | Note CRUD, batch create/read/update/upsert/archive, search |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating a HubSpot developer app and obtaining the OAuth 2.0 credentials required to use the HubSpot CRM Engagement Notes connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **HubSpot CRM Engagement Notes** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [HubSpot CRM Engagement Notes Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-hubspot.crm.engagement.notes)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
