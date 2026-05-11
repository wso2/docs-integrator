---
title: Overview
---

# Overview

HubSpot CRM is a cloud-based customer relationship management platform that helps businesses manage contacts, deals, and marketing pipelines. The Ballerina `ballerinax/hubspot.crm.obj.contacts` connector (v1.0.0) provides programmatic access to the HubSpot CRM Contacts API, enabling you to create, read, update, search, merge, and bulk-manage contact records from your Ballerina integration flows.

## Key features

- Full CRUD operations on individual HubSpot contacts: create, read, update, and archive by contact ID
- Batch operations for high-volume workflows: batch read, create, update, upsert, and archive in a single API call
- Flexible contact search using filter groups, property filters, sorting, and pagination
- Upsert support to create-or-update contacts based on unique property identifiers
- Contact merge to combine duplicate contact records
- GDPR-compliant permanent deletion of contact data via the `gdpr-delete` endpoint
- Association retrieval to fetch related CRM objects alongside contact records
- Multiple authentication methods: OAuth 2.0, Bearer token, and private app API key

## Actions

Actions are operations you invoke on HubSpot CRM from your integration: listing contacts, creating records, running searches, executing batch jobs, and more. All actions are exposed through a single `Client`:

| Client | Actions |
|--------|---------|
| `Client` | Contact CRUD, batch operations, search, merge, GDPR deletion, and association retrieval |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating a HubSpot private app and obtaining the access token required to authenticate the HubSpot CRM Contacts connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **HubSpot CRM Contacts** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [HubSpot CRM Contacts Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-hubspot.crm.obj.contacts)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
