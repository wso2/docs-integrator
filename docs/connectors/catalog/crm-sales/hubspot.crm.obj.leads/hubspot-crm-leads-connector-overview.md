---
title: Overview
---

# Overview

HubSpot CRM is a cloud-based customer relationship management platform that helps businesses capture, track, and manage sales leads through structured pipelines. The Ballerina `ballerinax/hubspot.crm.obj.leads` connector (v2.0.0) provides programmatic access to the HubSpot CRM Leads API, enabling full CRUD operations, batch processing, upserts, and search capabilities for lead records within your Ballerina integration flows.

## Key features

- Full CRUD operations on individual HubSpot CRM lead records (create, read, update, archive)
- Batch operations for high-throughput scenarios — batch create, read, update, archive, and upsert
- Flexible search with filter groups, sorting, and property projection via `POST /search`
- Association support — link leads to contacts and other CRM objects on creation
- Property history retrieval for auditing field changes over time
- OAuth 2.0 Refresh Token and Private App token authentication methods
- Configurable pagination using cursor-based `after` tokens for listing large datasets

## Actions

Actions are operations you invoke on HubSpot CRM from your integration — creating leads, reading lead records, running batch jobs, and more. The connector exposes all actions through a single `Client`:

| Client | Actions |
|--------|---------|
| `Client` | Single lead CRUD, batch create/read/update/archive/upsert, search |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating a HubSpot app and obtaining the credentials required to authenticate with the HubSpot CRM Leads API.

* **[Action Reference](actions.md)**: Full reference for all clients — operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **HubSpot CRM Leads** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [HubSpot CRM Leads Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-hubspot.crm.obj.leads)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
