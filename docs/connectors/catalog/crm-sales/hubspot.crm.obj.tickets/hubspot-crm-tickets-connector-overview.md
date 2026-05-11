---
title: Overview
---

# Overview

HubSpot is an AI-powered CRM platform that centralizes customer interactions, sales pipelines, and support workflows. The Ballerina `ballerinax/hubspot.crm.obj.tickets` connector (v2.0.0) provides programmatic access to HubSpot's Tickets API, enabling you to create, read, update, delete, search, merge, and batch-manage support ticket records from your Ballerina integration flows.

## Key features

- Full CRUD operations on HubSpot ticket records — create, read, update, and archive individual tickets
- List all tickets with optional filtering by properties, associations, and archive status
- Search tickets using HubSpot filter groups, property projections, and sorting options
- Merge two duplicate tickets into a single primary record
- Batch create, read, update, archive, and upsert multiple tickets in a single API call
- Manage ticket pipelines, stages, and priorities to organize customer support workflows
- Supports OAuth 2.0 refresh token, bearer token, and HubSpot Private App API key authentication

## Actions

Actions are operations you invoke on HubSpot from your integration — listing tickets, creating support cases, running batch updates, and more. The HubSpot CRM Tickets connector exposes all actions through a single client:

| Client | Actions |
|--------|---------|
| `Client` | Ticket CRUD, list, search, merge, and batch operations |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating a HubSpot app and obtaining the OAuth 2.0 credentials required to use the HubSpot CRM Tickets connector.

* **[Action Reference](actions.md)**: Full reference for all clients — operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **HubSpot CRM Tickets** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [HubSpot CRM Tickets Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-hubspot.crm.obj.tickets)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
