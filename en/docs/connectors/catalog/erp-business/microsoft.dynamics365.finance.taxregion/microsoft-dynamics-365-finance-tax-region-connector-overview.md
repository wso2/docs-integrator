---
title: "Overview"
---

# Overview

[Microsoft Dynamics 365 Finance](https://www.microsoft.com/en-us/dynamics-365/products/finance) is Microsoft's cloud ERP solution for financial management, covering general ledger, accounts receivable and payable, fixed assets, budgeting, cash and bank management, and tax. The Tax Region module covers country/region-specific tax master data and reporting entities that sit alongside the core Tax module — electronic fiscal document schemas, withholding tax concepts and rates, VAT listing declarations, tax identification tables, natural resource tax transactions, statutory reporting fields, and tax documents used to calculate, post, and report tax obligations for specific jurisdictions.

The `ballerinax/microsoft.dynamics365.finance.taxregion` connector enables you to list, create, retrieve, update, and delete these Microsoft Dynamics 365 Finance Tax Region entities directly from your integration flows.

## Key features

- Manage Brazilian electronic fiscal document (EFDoc) schemas used for tax event submission, cancellation, and correction letters
- Configure Mexican ISR (Impuesto Sobre la Renta) withholding concepts and their retention rates by year and month
- Maintain Belgian Intervat VAT listing declarations, including reporting periods, amounts, and submission status
- Manage Polish NIP (tax identification number) address tables used for VAT reporting
- Track Latvian natural resource tax transactions on packing materials and dangerous goods
- Configure US 1099 statutory reporting fields and box numbers used for vendor tax reporting
- Manage tax documents and their associated credit memo amounts for customer and vendor transactions
- Full CRUD support with OData query options (`$filter`, `$orderby`, `$top`, `$skip`, `$expand`, `$select`) on list and get operations, secured with OAuth2 client credentials authentication against the Microsoft Entra ID-secured Dynamics 365 Finance and Operations OData endpoint

## Actions

Actions are operations you invoke on the Microsoft Dynamics 365 Finance system from your integration. Use these actions for managing electronic fiscal document schemas, ISR withholding concepts and rates, Intervat VAT declarations, NIP tables, natural resource tax transactions, 1099 reporting fields, and tax documents. The Microsoft Dynamics 365 Finance Tax Region connector exposes all actions through a single client:

| Client | Actions |
|--------|---------|
| `Client` | EF Doc schemas, ISR concepts, ISR rates, Intervat declarations, NIP tables, NR tax transactions, Tax 1099 fields, Tax documents |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through registering an application in Microsoft Entra ID, granting it Dynamics 365 API permissions, and adding it as a user in your Dynamics 365 Finance environment to obtain the credentials needed for the Microsoft Dynamics 365 Finance Tax Region connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **Microsoft Dynamics 365 Finance Tax Region** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Microsoft Dynamics 365 Finance Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-microsoft.dynamics365.finance)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
