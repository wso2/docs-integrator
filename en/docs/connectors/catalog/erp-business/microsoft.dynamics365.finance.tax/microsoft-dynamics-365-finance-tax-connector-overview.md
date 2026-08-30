---
title: "Overview"
---

# Overview

[Microsoft Dynamics 365 Finance](https://www.microsoft.com/en-us/dynamics-365/products/finance) is Microsoft's cloud ERP solution for financial management, covering general ledger, accounts receivable and payable, fixed assets, budgeting, cash and bank management, and tax. The Tax module manages the master data and configuration that Dynamics 365 Finance uses to calculate, post, and report sales tax, VAT, and GST across legal entities and countries/regions — tax codes, tax groups, tax posting groups, tax periods, and country-specific classification data such as HSN codes (India) and CFOP codes (Brazil).

The `ballerinax/microsoft.dynamics365.finance.tax` connector enables you to list, create, retrieve, update, and delete Microsoft Dynamics 365 Finance tax entities directly from your integration flows.

## Key features

- Manage tax codes, tax groups, and tax posting groups used to calculate and post sales tax, VAT, and GST
- Configure tax item groups, tax group data, and tax code limits that determine which tax codes apply to which items and transactions
- Maintain tax periods and tax regions used for tax reporting and jurisdiction-based tax determination
- Manage country/region-specific tax classification data, including HSN codes (India), GST minor codes (India), CFOP codes and CFOP groups (Brazil), and Brazilian taxation codes and tax matrices
- Retrieve and update company-level tax parameters that control tax calculation and posting behavior
- List, create, read, update, and delete support across every tax entity set, with OData query options (`$filter`, `$orderby`, `$top`, `$skip`, `$expand`, `$select`) on list and get operations
- OAuth2 client credentials authentication against the Microsoft Entra ID-secured Dynamics 365 Finance and Operations OData endpoint

## Actions

Actions are operations you invoke on the Microsoft Dynamics 365 Finance system from your integration. Use these actions for managing tax codes, tax groups, tax posting groups, tax periods, tax regions, and country-specific tax classification data. The Microsoft Dynamics 365 Finance Tax connector exposes all actions through a single client:

| Client | Actions |
|--------|---------|
| `Client` | Tax codes, tax groups, tax posting groups, tax item groups, tax group data, tax code limits, tax periods, tax regions, tax parameters, HSN codes, GST minor codes, CFOP codes and groups, taxation codes, tax matrices |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through registering an application in Microsoft Entra ID, granting it Dynamics 365 API permissions, and adding it as a user in your Dynamics 365 Finance environment to obtain the credentials needed for the Microsoft Dynamics 365 Finance Tax connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **Microsoft Dynamics 365 Finance Tax** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Microsoft Dynamics 365 Finance Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-microsoft.dynamics365.finance)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
