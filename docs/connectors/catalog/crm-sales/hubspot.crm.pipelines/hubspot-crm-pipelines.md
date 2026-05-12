---
title: HubSpot CRM Pipelines
---

HubSpot CRM Pipelines is a feature of the HubSpot CRM platform that lets you define and manage sales, support, and order pipelines with configurable stages. The Ballerina `ballerinax/hubspot.crm.pipelines` connector (v2.0.0) provides programmatic access to the HubSpot Pipelines API, enabling you to create, read, update, delete, and audit pipelines and their stages from your Ballerina integration flows.

## Key features

- Full CRUD operations on CRM pipelines (create, list, get, update, replace, delete)
- Full CRUD operations on pipeline stages within any pipeline
- Audit trail retrieval for both pipelines and individual pipeline stages
- Support for multiple object types (deals, tickets, orders, and custom objects)
- Stage metadata configuration including probability, ticket state, and custom properties
- Validation controls for safe deletion of pipelines and stages with active references

## Actions

Actions are operations you invoke on HubSpot from your integration, including managing pipelines, creating stages, retrieving audit logs, and more. The connector exposes all actions through a single client:

| Client | Actions |
|--------|---------|
| `Client` | Pipeline CRUD, stage CRUD, pipeline and stage audit logs |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating a HubSpot developer app and obtaining the OAuth 2.0 credentials required to use the HubSpot CRM Pipelines connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **HubSpot CRM Pipelines** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [HubSpot CRM Pipelines Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-hubspot.crm.pipelines)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
