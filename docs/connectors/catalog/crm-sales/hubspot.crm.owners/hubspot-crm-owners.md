---
title: HubSpot CRM Owners
---

HubSpot CRM uses owners to assign CRM objects to specific people in your organization. The Ballerina `ballerinax/hubspot.crm.owners` connector (v2.0.0) provides programmatic access to the HubSpot Owners API, enabling you to retrieve owner details, list owners with filtering and pagination, and identify team assignments within your HubSpot account.

## Key features

- List all owners in a HubSpot account with pagination support
- Filter owners by email address
- Retrieve a specific owner by ID or userId
- Access owner team assignments and primary team information
- Support for archived owner retrieval
- OAuth 2.0, Bearer Token, and Private App API key authentication

## Actions

Actions are operations you invoke on HubSpot from your integration, including listing owners, retrieving owner details, and filtering by email. The connector exposes a single client:

| Client | Actions |
|--------|---------|
| `Client` | List owners, retrieve owner by ID or userId, filter by email |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating a HubSpot Private App or OAuth app and obtaining the credentials required to use the HubSpot CRM Owners connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **HubSpot CRM Owners** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [HubSpot CRM Owners Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-hubspot.crm.owners)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
