---
title: "Overview"
---

# Overview

[Microsoft Dynamics 365 Finance](https://www.microsoft.com/en-us/dynamics-365/products/finance) is Microsoft's cloud ERP solution for financial management, covering general ledger, accounts receivable and payable, fixed assets, budgeting, cash and bank management, and tax. The Expense module (Travel and Expense management) within Dynamics 365 Finance handles the full employee expense lifecycle: categorizing spend with expense codes, recording individual expense transactions and mileage claims, applying per diem allowances and mileage reimbursement rates by location and vehicle type, attaching receipt documents, and configuring the company-wide policies that govern how expenses are validated, taxed, and posted. The `ballerinax/microsoft.dynamics365.finance.expense` connector enables you to list, create, retrieve, update, and delete these Expense entities via the Dynamics 365 Finance and Operations OData API directly from your integration flows.

## Key features

- Manage expense codes that categorize and classify expense line items, including sales tax code, code type, and parent code hierarchies
- Track expense transactions end to end — amounts, currencies, approval status, expense category, mileage, and project assignment
- Maintain expense rate cards for scale-based reimbursement of specific expense categories, including sales tax and payroll-related overrides
- Define and apply mileage reimbursement rates by vehicle type, distance quantity, and effective date range
- Configure per diem allowances for meals, hotel stays, and other daily allowances by location, state, and country/region
- Attach and manage travel receipt documents, including file content, metadata, and credit-card expense flags
- Retrieve and update company-wide expense management parameters governing policy evaluation, tax handling, and posting behavior
- Full list, create, read, update, and delete (CRUD) support for every Expense entity set, with OData query options for filtering, sorting, paging, and field selection
- OAuth2 client credentials authentication against Microsoft Entra ID

## Actions

Actions are operations you invoke on the Microsoft Dynamics 365 Finance environment from your integration. Use these actions for managing expense codes, recording and updating expense transactions, maintaining mileage and per diem rate tables, attaching travel receipts, and configuring expense parameters. The Microsoft Dynamics 365 Finance Expense connector exposes all actions through a single client:

| Client | Actions |
|--------|---------|
| `Client` | Expense codes, expense parameters, expense rates, expenses, mileage rates, per diems, travel receipts |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through registering an application in Microsoft Entra ID, granting it Dynamics 365 Finance and Operations API permissions, and adding it as a user in your Dynamics 365 Finance environment to obtain the credentials needed for the Microsoft Dynamics 365 Finance Expense connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **Microsoft Dynamics 365 Finance Expense** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Microsoft Dynamics 365 Finance Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-microsoft.dynamics365.finance)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
