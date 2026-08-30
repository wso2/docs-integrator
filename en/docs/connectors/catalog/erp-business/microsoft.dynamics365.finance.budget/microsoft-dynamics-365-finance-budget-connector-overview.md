---
title: "Overview"
---

# Overview

[Microsoft Dynamics 365 Finance](https://www.microsoft.com/en-us/dynamics-365/products/finance) is Microsoft's cloud ERP solution for financial management, covering general ledger, accounts receivable and payable, fixed assets, cash and bank management, and budgeting. The Budget module within Dynamics 365 Finance manages the full budgeting lifecycle: defining budget codes and cycles, building budget plans through a review and approval workflow, allocating budgets across cost centers, cost groups, and funds, and posting cheque and promissory note (CP) transactions against budgeted accounts. The `ballerinax/microsoft.dynamics365.finance.budget` connector enables you to list, create, retrieve, update, and delete these Budget entities via the Dynamics 365 Finance and Operations OData API directly from your integration flows.

## Key features

- Manage budget codes, budget cycles, and budget models that define how budgets are structured and periodized across fiscal years
- Create, update, and track budget plans and budget plan processes used during the budgeting and approval workflow
- Maintain cost centers, cost groups, and fund and fund type master data used for budgetary control and fund accounting
- Manage cheque and promissory note (CP) portfolios, journals, and transactions posted against budgeted accounts
- Define budget cycle period lines for custom fiscal period allocations
- Full list, create, read, update, and delete (CRUD) support for every Budget entity set, with OData query options for filtering, sorting, paging, and field selection
- OAuth2 client credentials authentication against Microsoft Entra ID

## Actions

Actions are operations you invoke on the Microsoft Dynamics 365 Finance environment from your integration. Use these actions for managing budget codes and cycles, building budget plans, maintaining cost centers, cost groups, and funds, and posting cheque and promissory note transactions. The Microsoft Dynamics 365 Finance Budget connector exposes all actions through a single client:

| Client | Actions |
|--------|---------|
| `Client` | Budget codes, budget cycles, budget models, budget plans, budget plan processes, CP journals, CP parameters, CP portfolios, CP tables, CP transactions, cost centers, cost groups, fund types, funds, period lines |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through registering an application in Microsoft Entra ID, granting it Dynamics 365 Finance and Operations API permissions, and adding it as a user in your Dynamics 365 Finance environment to obtain the credentials needed for the Microsoft Dynamics 365 Finance Budget connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **Microsoft Dynamics 365 Finance Budget** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Microsoft Dynamics 365 Finance Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-microsoft.dynamics365.finance)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
