---
title: HubSpot CRM Lists
---

HubSpot CRM Lists allows you to create, manage, and segment lists of CRM records such as contacts, companies, deals, and tickets. The Ballerina `ballerinax/hubspot.crm.lists` connector (v1.0.0) provides programmatic access to the HubSpot Lists API v3, enabling you to create dynamic and manual lists, manage list memberships, organize lists into folders, and search across lists from your Ballerina integration flows.

## Key features

- Create and manage dynamic (filter-based) and manual lists for any CRM object type
- Add, remove, and bulk-update list memberships for contacts, deals, tickets, and other objects
- Search lists by name, processing type, or custom query with pagination support
- Organize lists into folders with full folder CRUD (create, rename, move, delete)
- Fetch list memberships ordered by record ID or by date added
- Translate legacy list IDs to modern IDs for migration scenarios
- Supports OAuth 2.0 and HubSpot Private App (API key) authentication

## Actions

Actions are operations you invoke on HubSpot from your integration: creating lists, managing memberships, organizing folders, and more. The HubSpot CRM Lists connector exposes all actions through a single client:

| Client | Actions |
|--------|---------|
| `Client` | List CRUD, membership management, folder operations, search, legacy ID mapping |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating a HubSpot app and obtaining the OAuth 2.0 credentials required to use the HubSpot CRM Lists connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **HubSpot CRM Lists** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [HubSpot CRM Lists Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-hubspot.crm.lists)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
