---
title: HubSpot CRM Engagements Calls
---

HubSpot CRM Engagements Calls is part of HubSpot's CRM platform, enabling tracking and management of call engagements associated with contacts, companies, and deals. The Ballerina `ballerinax/hubspot.crm.engagements.calls` connector (v2.0.0) provides programmatic access to the HubSpot Calls API v3, allowing you to create, retrieve, update, archive, and search call records within your Ballerina integration flows.

## Key features

- Create, retrieve, update, and archive individual call engagement records
- Batch operations for creating, reading, updating, upserting, and archiving calls in bulk
- Associate calls with CRM objects such as contacts, companies, and deals
- Search calls using filters, property conditions, and sorting
- Retrieve call history with property versioning support
- Support for OAuth 2.0, Bearer Token, and Private App (API Key) authentication

## Actions

Actions are operations you invoke on HubSpot to manage call engagement records: creating calls, retrieving call details, updating properties, performing batch operations, and searching across call records.

| Client | Actions |
|--------|---------|
| `Client` | Call CRUD, batch operations, search, associations |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating a HubSpot developer app and obtaining the OAuth 2.0 credentials required to use the HubSpot CRM Engagements Calls connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **HubSpot CRM Engagements Calls** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [HubSpot CRM Engagements Calls Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-hubspot.crm.engagements.calls)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
