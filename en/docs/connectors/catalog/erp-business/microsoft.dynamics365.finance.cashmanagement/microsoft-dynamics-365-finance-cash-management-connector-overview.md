---
title: "Overview"
---

# Overview

[Microsoft Dynamics 365 Finance](https://www.microsoft.com/en-us/dynamics-365/products/finance) is Microsoft's cloud ERP solution for financial management, covering general ledger, accounts receivable and payable, fixed assets, budgeting, cash and bank management, and tax. The Cash Management module governs how an organization tracks and reconciles bank accounts, petty cash, and cash-in-hand balances: it holds the bank account and bank group master data, the cash accounts and cash discount terms used for petty cash and early-payment settlement, the cash ledger posting profiles that route cash transactions to the general ledger, the CODA transaction codes used to classify imported electronic bank statement lines, and the currency exchange rate setups that keep multi-currency cash balances in sync.

The `ballerinax/microsoft.dynamics365.finance.cashmanagement` connector enables you to manage bank accounts, bank groups, cash accounts, cash balances, cash discounts, cash ledgers, cash symbols, CODA transaction codes, and currency exchange rate setups directly from your integration flows.

## Key features

- Manage bank accounts and bank groups, including account numbers, IBAN/SWIFT details, and reconciliation settings
- Manage cash accounts and their multi-currency cash balances
- Configure cash discount terms used for early-payment settlement
- Manage cash ledger posting profiles that route cash transactions to the general ledger
- Manage CODA transaction codes used to classify electronic bank statement lines
- Manage currency exchange rate type setups used for cash and bank postings
- Full list, create, read, update, and delete (CRUD) operations across every entity set
- Filter, sort, and page through records using OData query parameters (`$filter`, `$orderby`, `$top`, `$skip`, `$expand`, `$select`, `$count`)

## Actions

Actions are operations you invoke on Microsoft Dynamics 365 Finance from your integration. Use these actions for listing and filtering bank and cash accounts, creating and updating cash ledger and discount records, and managing the supporting bank group, cash symbol, CODA transaction, and exchange rate setup entities.

| Client | Actions |
|--------|---------|
| `Client` | Bank account and bank group CRUD, cash accounts and cash balances, cash discounts, cash ledgers, cash symbols, CODA transactions, exchange rate setups |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through registering an application in Microsoft Entra ID (Azure AD), granting it access to Microsoft Dynamics 365 Finance and Operations, and obtaining the credentials required by the connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **Microsoft Dynamics 365 Finance Cash Management** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Microsoft Dynamics 365 Finance Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-microsoft.dynamics365.finance)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
