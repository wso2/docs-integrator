---
title: DocuSign Admin
---

# DocuSign Admin

The DocuSign Admin connector integrates with the DocuSign Admin API, enabling organizations to programmatically manage users, permissions, groups, and accounts across their DocuSign environment. It supports both the DocuSign Admin API V2 and V2.1, providing comprehensive tools for digital transaction management administration.

## Key Features

- List and manage organizations the authenticated user belongs to
- Create, retrieve, update, and close user memberships within an organization
- View and assign permission profiles for organization accounts
- Manage groups and DSGroups including user membership (v2.1 API)
- Bulk import and export users via CSV for large-scale provisioning
- Export and import account settings across organization accounts
- Manage identity providers and reserved domains for an organization
- Clone DocuSign accounts and manage asset group operations

## Actions

The DocuSign Admin connector exposes all operations through a single client for managing organizations, users, permissions, groups, exports, imports, and account cloning.

| Client | Actions |
|--------|---------|
| `Client` | Organization management, user CRUD, permissions, groups, bulk import/export, identity providers, domains, DSGroups, product permissions, asset groups |

See the **[Action Reference](action-reference.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: How to create a DocuSign developer account and obtain the OAuth 2.0 credentials required to authenticate the connector.

* **[Action Reference](action-reference.md)**: Full reference for all clients, with operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **DocuSign Admin** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [DocuSign Admin Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-docusign.dsadmin)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
