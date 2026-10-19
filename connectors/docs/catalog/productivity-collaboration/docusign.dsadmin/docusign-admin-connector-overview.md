---
title: Overview
---

# Overview

DocuSign is a digital transaction management platform that enables users to securely sign, send, and manage documents electronically. The Ballerina `ballerinax/docusign.dsadmin` connector (v2.0.0) integrates with the DocuSign Admin API, providing programmatic access to manage organizations, users, permissions, groups, identity providers, bulk imports/exports, and account settings across your DocuSign environment.

## Key features

- List and manage organizations the authenticated user belongs to
- Create, retrieve, update, and close user accounts within an organization
- View permission profiles and groups for accounts in an organization
- Bulk import and export users via CSV for large-scale user management
- Export and import account settings across organization accounts
- Manage identity providers and reserved domains for an organization
- DSGroup management: create, list, delete groups and manage group membership (v2.1 API)
- Product permission profile assignment and revocation for users (v2.1 API)

## Actions

Actions are operations you invoke on the DocuSign Admin API from your integration. Use these actions for managing organizations, users, permissions, groups, exports, and imports. The connector exposes all actions through a single client:

| Client | Actions |
|--------|---------|
| `Client` | Organization management, user CRUD, permissions, groups, bulk import/export, identity providers, domains, DSGroups, product permissions, asset groups |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating a DocuSign developer account and obtaining the OAuth 2.0 credentials required to use the DocuSign Admin connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **DocuSign Admin** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [DocuSign Admin Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-docusign.dsadmin)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
