---
title: "Overview"
---

# Overview

[Microsoft Dynamics 365 Finance](https://www.microsoft.com/en-us/dynamics-365/products/finance) is Microsoft's cloud ERP solution for financial management, covering general ledger, accounts receivable and payable, fixed assets, budgeting, cash and bank management, and tax. The Users module within Dynamics 365 Finance manages the identities, roles, and reference data that govern who can sign in and what they can do — system user accounts and their preferences, security roles and the external-party role mappings used for B2B self-service access, user groups, channel (retail/commerce) users, Azure AD client registrations used for app-based sign-in, and the source system, source type, and deferrals group reference data that other modules depend on. The `ballerinax/microsoft.dynamics365.finance.users` connector enables you to create, read, update, and delete these user and access-control entities directly from your integration flows.

## Key features

- Manage system user accounts (`SystemUsers`), including locale, timezone, license type, and enabled/disabled state
- Manage security roles (`SecurityRoles`) and map external parties to external roles (`ExternalRoles`) for B2B portal access
- Manage user groups (`UserGroups`) and channel (retail/commerce) users (`ChannelUsers`) per operating unit
- Manage Azure AD client registrations (`SysAADClients`) linked to Dynamics 365 users for app-based sign-in
- Manage source system, source type, and deferrals group (`Groups`) reference data
- List and filter entities using OData query parameters (`$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`), including cross-company queries
- Perform optimistic-concurrency-safe updates and deletes using ETags (`If-Match`)
- OAuth2 client credentials authentication against Microsoft Entra ID

## Actions

Actions are operations you invoke on Microsoft Dynamics 365 Finance from your integration. Use these actions for listing and filtering user and access-control records, creating and updating system users, and managing security roles, external roles, user groups, channel users, Azure AD client registrations, and related reference data.

| Client | Actions |
|--------|---------|
| `Client` | System user CRUD, security role and external role management, user group and channel user management, Azure AD client registration, source system/type and deferrals group reference data |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through registering an application in Microsoft Entra ID and obtaining the credentials required by the connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **Microsoft Dynamics 365 Finance Users** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Microsoft Dynamics 365 Finance Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-microsoft.dynamics365.finance)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
