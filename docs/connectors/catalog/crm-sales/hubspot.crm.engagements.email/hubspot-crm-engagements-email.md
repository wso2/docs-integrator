---
title: HubSpot CRM Engagements Email
---

HubSpot CRM Engagements Email is part of HubSpot's CRM platform, providing programmatic access to email engagement records: tracking sent, received, scheduled, and failed emails associated with CRM contacts. The Ballerina `ballerinax/hubspot.crm.engagements.email` connector (v2.0.0) enables you to create, read, update, delete, search, and batch-manage email engagement objects through the HubSpot CRM v3 API.

## Key features

- Full CRUD operations on email engagement records by ID
- Paginated listing of email engagements with property and association filtering
- Batch operations for creating, reading, updating, upserting, and archiving emails in bulk
- Flexible search with filter groups, sorting, and property selection
- Association support to link emails with contacts, deals, and other CRM objects
- OAuth 2.0 and private app API key authentication

## Actions

Actions are operations you invoke on HubSpot from your integration: creating email records, listing engagements, running batch operations, and searching. The connector exposes actions through a single client:

| Client | Actions |
|--------|---------|
| `Client` | Email engagement CRUD, batch operations, search |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating a HubSpot private app or OAuth app and obtaining the credentials required to use the HubSpot CRM Engagements Email connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **HubSpot CRM Engagements Email** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [HubSpot CRM Engagements Email Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-hubspot.crm.engagements.email)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
