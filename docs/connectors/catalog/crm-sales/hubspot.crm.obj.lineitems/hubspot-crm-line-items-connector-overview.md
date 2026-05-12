---
title: Overview
---

# Overview

HubSpot CRM Line Items represent individual products or services attached to deals in HubSpot, enabling detailed tracking of what is being sold and at what price. The Ballerina `ballerinax/hubspot.crm.obj.lineitems` connector (v2.0.0) provides programmatic access to the HubSpot CRM Line Items API v3, supporting full CRUD operations, batch processing, and advanced search capabilities for line item records within your HubSpot CRM.

## Key features

- Full CRUD operations on individual line item records using HubSpot record IDs
- Batch create, read, update, archive, and upsert operations for efficient bulk processing
- Advanced search with filtering, sorting, and pagination using `PublicObjectSearchRequest`
- Associate line items with HubSpot deals and other CRM objects at creation time
- Support for custom properties and property history retrieval on line item records
- Multiple authentication methods: OAuth 2.0, Private App tokens, and legacy API keys
- Paginated list retrieval with configurable property filtering and archival status support

## Actions

Actions are operations you invoke on HubSpot CRM Line Items from your integration, including creating line items for deals, reading product details, running batch jobs, and searching across your inventory. The connector exposes all actions through a single client:

| Client | Actions |
|--------|---------|
| `Client` | Single-record CRUD, batch create/read/update/archive/upsert, search, paginated listing |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating a HubSpot Private App and obtaining the access token required to authenticate the HubSpot CRM Line Items connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **HubSpot CRM Line Items** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [HubSpot CRM Line Items Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-hubspot.crm.object.lineitems)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
