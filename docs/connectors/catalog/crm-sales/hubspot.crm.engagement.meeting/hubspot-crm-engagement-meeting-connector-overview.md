---
title: Overview
---

# Overview

HubSpot CRM is a cloud-based customer relationship management platform that tracks meetings, contacts, deals, and other engagement activities. The Ballerina `ballerinax/hubspot.crm.engagement.meeting` connector (v1.0.0) provides programmatic access to the HubSpot Meetings API v3, enabling you to create, read, update, delete, batch-manage, and search meeting engagements within your HubSpot CRM from Ballerina integration flows.

## Key features

- Full CRUD operations on HubSpot meeting engagements (create, read, update, delete)
- Batch operations for creating, reading, updating, upserting, and archiving meetings in bulk
- Search meetings using filters, query strings, and sorting with the HubSpot search API
- Associate meetings with CRM records such as contacts, deals, and companies
- Retrieve meeting properties and property history for audit and tracking purposes
- Support for OAuth 2.0, bearer token, and private app API key authentication

## Actions

Actions are operations you invoke on HubSpot from your integration: creating meetings, listing engagements, performing batch operations, and searching. The connector exposes actions through a single client:

| Client | Actions |
|--------|---------|
| `Client` | Meeting CRUD, batch operations, search |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating a HubSpot developer app and obtaining the OAuth 2.0 credentials required to use the HubSpot CRM Engagement Meeting connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **HubSpot CRM Engagement Meeting** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [HubSpot CRM Engagement Meeting Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-hubspot.crm.engagement.meeting)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
