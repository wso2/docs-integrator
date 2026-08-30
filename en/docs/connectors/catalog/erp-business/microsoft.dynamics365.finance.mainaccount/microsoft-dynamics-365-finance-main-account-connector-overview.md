---
title: "Overview"
---

# Overview

[Microsoft Dynamics 365 Finance](https://www.microsoft.com/en-us/dynamics-365/products/finance) is Microsoft's cloud ERP solution for financial management, covering general ledger, accounts receivable and payable, fixed assets, budgeting, cash and bank management, and tax. The Main Account module underpins the chart of accounts: it defines the main accounts that make up the general ledger, how those accounts behave per legal entity, the ledgers and ledger account groups they post through, and the asset lease books that feed lease-related postings.

The `ballerinax/microsoft.dynamics365.finance.mainaccount` connector enables you to manage main accounts, main account-to-legal-entity assignments, ledgers, ledger account groups, and asset lease books directly from your integration flows.

## Key features

- Manage main accounts in the chart of accounts, including account type, posting type, and debit/credit rules
- Configure main account behavior per legal entity, including sales tax settings, dimensions, and suspension status
- Manage ledgers, including accounting and reporting currencies, fiscal calendars, and exchange rate types
- Manage ledger account groups used for deferred tax account posting configuration
- Manage lease books for asset leasing, covering lease terms, classification, and payment schedules
- Full list, create, read, update, and delete (CRUD) operations across every entity set
- Filter, sort, and page through records using OData query parameters (`$filter`, `$orderby`, `$top`, `$skip`, `$expand`, `$select`, `$count`)
- OAuth2 client credentials authentication with Microsoft Entra ID (Azure AD)

## Actions

Actions are operations you invoke on Microsoft Dynamics 365 Finance from your integration. Use these actions for listing and filtering main accounts, creating and updating account and ledger records, and managing the supporting legal entity, ledger account group, and lease book entities.

| Client | Actions |
|--------|---------|
| `Client` | Main account CRUD, main account legal entity assignments, ledgers, ledger account groups, lease books |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through registering an application in Microsoft Entra ID (Azure AD), granting it access to Microsoft Dynamics 365 Finance and Operations, and obtaining the credentials required by the connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **Microsoft Dynamics 365 Finance Main Account** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Microsoft Dynamics 365 Finance Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-microsoft.dynamics365.finance)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
