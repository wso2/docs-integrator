---
title: "Overview"
---

# Overview

[Microsoft Dynamics 365 Finance](https://www.microsoft.com/en-us/dynamics-365/products/finance) is Microsoft's cloud ERP solution for financial management, covering general ledger, accounts receivable and payable, fixed assets, budgeting, cash and bank management, and tax. The Fiscal module within Dynamics 365 Finance manages the financial dimension framework and the fiscal calendar structure that the chart of accounts and general ledger rely on: it defines dimension attributes, dimension parameters, and dimension rules that control how financial dimensions and main accounts are configured and derived, groups dimension display values into dimension sets and financial dimension sets used for reporting and account structure configuration, maintains the financial dimension values posted against ledger transactions, and defines the fiscal calendars, fiscal years, and fiscal periods that determine when transactions are posted and reported. The `ballerinax/microsoft.dynamics365.finance.fiscal` connector enables you to list, create, retrieve, update, and delete these Fiscal entities via the Dynamics 365 Finance and Operations OData API directly from your integration flows.

## Key features

- Manage dimension attributes that define how financial dimensions and main accounts are configured (existing list, custom list, main account, or dynamic account)
- Configure dimension parameters, such as the segment delimiter used when displaying combined financial dimension values
- Define dimension rules that derive one financial dimension's value from another, for example deriving a target dimension code from a source dimension code
- Group financial dimension display values into dimension sets and financial dimension sets used for reporting and account structure configuration
- Maintain financial dimension values, including legal entity association, active-from/active-to dates, and suspension or manual-entry blocking flags
- Manage fiscal calendars, fiscal years (with open/close status), and fiscal periods (opening, operating, and closing periods) that define the accounting periods transactions post into
- Full list, create, read, update, and delete (CRUD) support for every Fiscal entity set, with OData query options for filtering, sorting, paging, and field selection
- OAuth2 client credentials authentication against Microsoft Entra ID

## Actions

Actions are operations you invoke on the Microsoft Dynamics 365 Finance environment from your integration. Use these actions for managing dimension attributes, parameters, and rules, grouping dimension values into sets, maintaining financial dimension values, and managing fiscal calendars, years, and periods. The Microsoft Dynamics 365 Finance Fiscal connector exposes all actions through a single client:

| Client | Actions |
|--------|---------|
| `Client` | Dimension attributes, dimension parameters, dimension rules, dimension sets, financial dimension sets, financial dimension values, fiscal calendars, fiscal periods, fiscal years |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through registering an application in Microsoft Entra ID, granting it Dynamics 365 Finance and Operations API permissions, and adding it as a user in your Dynamics 365 Finance environment to obtain the credentials needed for the Microsoft Dynamics 365 Finance Fiscal connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **Microsoft Dynamics 365 Finance Fiscal** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Microsoft Dynamics 365 Finance Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-microsoft.dynamics365.finance)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
