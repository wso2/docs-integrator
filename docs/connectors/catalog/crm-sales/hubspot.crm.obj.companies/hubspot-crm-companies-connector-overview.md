---
title: Overview
---

# Overview

HubSpot CRM Companies is a cloud-based CRM platform that enables you to manage company records, properties, and associations at scale. The Ballerina `ballerinax/hubspot.crm.obj.companies` connector (v2.0.0) provides programmatic access to the HubSpot CRM Companies API, letting you create, read, update, archive, merge, batch-process, and search company records directly from your Ballerina integration flows.

## Key features

- Full CRUD operations on HubSpot CRM company records (create, read, update, archive)
- Batch operations for high-throughput data ingestion and retrieval (batch create, read, update, archive, upsert)
- Flexible company search using filter groups, sort criteria, and custom property projections
- Merge duplicate company records by specifying a primary and secondary record ID
- Retrieve associated objects (contacts, deals) alongside company data in a single request
- Pagination support for listing large sets of company records with cursor-based navigation
- Properties history retrieval for tracking field-level changes over time
- Support for OAuth 2.0, Bearer Token, and HubSpot Private App API Key authentication

## Actions

Actions are operations you invoke on HubSpot CRM from your integration: listing companies, creating new records, running batch jobs, and more. The connector exposes all actions through a single client:

| Client | Actions |
|--------|---------|
| `Client` | Single and batch company CRUD, search, merge, and cursor-based pagination |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating a HubSpot app and obtaining the OAuth 2.0 credentials required to use the HubSpot CRM Companies connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **HubSpot CRM Companies** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [HubSpot CRM Companies Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-hubspot.crm.obj.companies)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
