---
title: "Overview"
---

# Overview

[Microsoft Dynamics 365 Finance](https://www.microsoft.com/en-us/dynamics-365/products/finance) is Microsoft's cloud ERP solution for financial management, covering general ledger, accounts receivable and payable, fixed assets, budgeting, cash and bank management, and tax. The Receivable module manages the master data and transactional support entities Dynamics 365 Finance uses for accounts receivable operations — customer advance payment lines, customer disputes and promise-to-pay tracking, debt collection aging periods and due date limits, Italian VAT export plafonds, sales return details, sales carriers, EU sales list VAT reporting, and the custom API, custom field, and custom office extensibility entities associated with receivable processing.

The `ballerinax/microsoft.dynamics365.finance.receivable` connector enables you to list, create, retrieve, update, and delete Microsoft Dynamics 365 Finance receivable entities directly from your integration flows.

## Key features

- Manage customer advance payment lines (`AdvLines`) tied to employee or customer advance reports
- Track customer disputes and promise-to-pay status (`CustDisputes`) for accounts receivable transactions
- Configure debt collection aging periods (`DebtPeriods`) and due date limits (`DueDateLimits`) used for collections and aging analysis
- Manage Italian VAT export plafonds (`Plafonds`) — the tax exemption ceiling records used by exporters
- Manage sales return details (`ReturnDetails`) and sales carriers (`SalesCarriers`) used in return and shipment processing
- Manage EU sales lists (`SalesLists`) used for cross-border VAT reporting
- Manage the custom API, custom field, and custom office extensibility entities (`CustomApis`, `CustomFields`, `CustomOffices`) associated with receivable customizations
- List, create, read, update, and delete support across every receivable entity set, with OData query options (`$filter`, `$orderby`, `$top`, `$skip`, `$expand`, `$select`) on list and get operations
- OAuth2 client credentials authentication against the Microsoft Entra ID-secured Dynamics 365 Finance and Operations OData endpoint

## Actions

Actions are operations you invoke on the Microsoft Dynamics 365 Finance system from your integration. Use these actions for managing advance lines, customer disputes, debt periods, due date limits, plafonds, return details, sales carriers, sales lists, and receivable-related custom entities. The Microsoft Dynamics 365 Finance Receivable connector exposes all actions through a single client:

| Client | Actions |
|--------|---------|
| `Client` | Advance lines, customer disputes, custom APIs, custom fields, custom offices, debt periods, due date limits, plafonds, return details, sales carriers, sales lists |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through registering an application in Microsoft Entra ID, granting it Dynamics 365 API permissions, and adding it as a user in your Dynamics 365 Finance environment to obtain the credentials needed for the Microsoft Dynamics 365 Finance Receivable connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **Microsoft Dynamics 365 Finance Receivable** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Microsoft Dynamics 365 Finance Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-microsoft.dynamics365.finance)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
