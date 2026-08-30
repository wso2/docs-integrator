---
title: "Overview"
---

# Overview

[Microsoft Dynamics 365 Finance](https://www.microsoft.com/en-us/dynamics-365/products/finance) is Microsoft's cloud ERP solution for financial management, covering general ledger, accounts receivable and payable, fixed assets, budgeting, cash and bank management, and tax. The Core Organization module underpins this data with the foundational organization and reference data that other Dynamics 365 Finance modules depend on: legal entities, warehouses, language codes, directory (global address book) parameters, salutations, name affixes and name sequences, VAT registration numbers, and other shared configuration entities.

The `ballerinax/microsoft.dynamics365.finance.coreorg` connector enables you to manage legal entities, warehouses, VAT registration numbers, directory parameters, and other core organizational reference data directly from your integration flows.

## Key features

- Manage legal entities, including company name, primary address, and contact details
- Manage warehouses used across inventory and warehouse management processes
- Maintain VAT registration numbers per legal entity and country/region for tax compliance
- Configure global address book (directory) parameters, including duplicate-check and default party type behavior
- Manage salutations, name affixes, and name sequences used for formatting party names
- Manage card types for expense and travel management, and employee posting profiles for ledger account determination
- Manage categories used for project, production, and expense tracking, and elimination charts of accounts (ELCOAs) used in financial consolidation
- Full list, create, read, update, and delete (CRUD) operations across every entity set, with OData query parameters (`$filter`, `$orderby`, `$top`, `$skip`, `$expand`, `$select`, `$count`) for filtering, sorting, and paging
- OAuth2 client credentials authentication with Microsoft Entra ID (Azure AD)

## Actions

Actions are operations you invoke on Microsoft Dynamics 365 Finance from your integration. Use these actions for listing and filtering core organization entities, creating and updating legal entities, warehouses, and VAT registration numbers, and managing the supporting directory, name formatting, and posting configuration entities.

| Client | Actions |
|--------|---------|
| `Client` | Legal entity, warehouse, and VAT registration number CRUD; directory parameters, card types, categories, ELCOAs, employee postings, language codes, name affixes, name sequences, and salutations management |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through registering an application in Microsoft Entra ID (Azure AD), granting it access to Microsoft Dynamics 365 Finance and Operations, and obtaining the credentials required by the connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **Microsoft Dynamics 365 Finance Core Organization** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Microsoft Dynamics 365 Finance Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-microsoft.dynamics365.finance)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
