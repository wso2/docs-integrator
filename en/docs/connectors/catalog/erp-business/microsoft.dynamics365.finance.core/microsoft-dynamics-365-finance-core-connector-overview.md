---
title: "Overview"
---

# Overview

[Microsoft Dynamics 365 Finance](https://www.microsoft.com/en-us/dynamics-365/products/finance) is Microsoft's cloud ERP solution for financial management, covering general ledger, accounts receivable and payable, fixed assets, budgeting, cash and bank management, and tax. The Core module underpins the shared reference and organizational data that the rest of the platform builds on: the companies (legal entities) and business units that structure an implementation, the branches and departments within them, address and location reference data (formats, cities, states, and localized address objects), and the underlying party records that represent organizations and people across the system.

The `ballerinax/microsoft.dynamics365.finance.core` connector enables you to manage companies, business units, branches, departments, address book and address reference data, and party records directly from your integration flows.

## Key features

- Manage companies (legal entities) and their locale, currency, and party associations
- Manage business units, branches, and departments, including the `DepartmentsV2` entity, used to structure an organization
- Maintain address reference data: address formats, cities, states/provinces, and localized address objects
- Manage address books and the CDS party records that represent organizations and people shared across Dynamics 365
- Full list, create, read, update, and delete (CRUD) operations across every entity set
- Filter, sort, and page through records using OData query parameters (`skip`, `top`, `filter`, `orderby`, `expand`, `crossCompany`, `count`, `'select`)
- OAuth2 client credentials authentication with Microsoft Entra ID (Azure AD)

## Actions

Actions are operations you invoke on Microsoft Dynamics 365 Finance from your integration. Use these actions for listing and filtering core reference and organizational data, and for creating, updating, and deleting companies, business units, branches, departments, address data, and party records.

| Client | Actions |
|--------|---------|
| `Client` | Company, business unit, branch, department, address book/city/format/state/object, and CDS party CRUD |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through registering an application in Microsoft Entra ID (Azure AD), granting it access to Microsoft Dynamics 365 Finance and Operations, and obtaining the credentials required by the connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **Microsoft Dynamics 365 Finance Core** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Microsoft Dynamics 365 Finance Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-microsoft.dynamics365.finance)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
