---
title: Overview
---

# Overview

HubSpot CRM is a cloud-based customer relationship management platform that helps teams manage deals, contacts, and sales pipelines. The Ballerina `ballerinax/hubspot.crm.obj.deals` connector (v1.0.0) provides programmatic access to the HubSpot CRM Deals API, enabling you to create, read, update, archive, search, and batch-manage deal records from your Ballerina integration flows.

## Key features

- Full CRUD operations on HubSpot CRM deal records by internal deal ID
- Batch create, read, update, archive, and upsert deals in a single API call
- Search deals using filters, sorts, and property projections via the Search API
- Merge two duplicate deal records into a single canonical record
- Support for OAuth 2.0 refresh token, bearer token, and HubSpot private app API key authentication
- Pagination support for listing deals with configurable property and association expansions

## Actions

Actions are operations you invoke on HubSpot from your integration, including creating deals, updating pipeline stages, running batch operations, and searching records. The HubSpot CRM Deals connector exposes all actions through a single client:

| Client | Actions |
|--------|---------|
| `Client` | Deal CRUD, batch operations, search, and merge |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating a HubSpot app and obtaining the OAuth 2.0 credentials (or private app token) required to use the HubSpot CRM Deals connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **HubSpot CRM Deals** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [HubSpot CRM Deals Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-hubspot.crm.obj.deals)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
