---
title: "Overview"
---

# Overview

[Microsoft Dynamics 365 Finance](https://www.microsoft.com/en-us/dynamics-365/products/finance) is Microsoft's cloud ERP solution for financial management, covering general ledger, accounts receivable and payable, fixed assets, budgeting, cash and bank management, and tax. Its Ledger module holds the chart of accounts, journal structures, posting rules, and the audit and accrual records that keep an organization's books accurate and auditable, and exposes these as entities through the platform's OData REST API.

The `ballerinax/microsoft.dynamics365.finance.ledger` connector enables you to create, read, update, and delete ledger accountants, accrual schemes, audit trails, ledger intervals, journal descriptions and headers, opening sheets, posting definitions, and posting journals directly from your integration flows.

## Key features

- Manage ledger accountant registration records (CPF/CRC-based, used for Brazilian statutory reporting)
- Define accrual schemes that spread revenue and expense recognition across fiscal or calendar periods
- Retrieve audit trail records that track ledger transactions for compliance and traceability
- Configure ledger account number intervals used for security and reporting scoping
- Manage ledger journal names and descriptions used to categorize journals
- Create and manage ledger journal headers, including debit/credit totals and posting status
- Manage opening balance sheets used when opening ledger balances for a new fiscal year
- Configure posting definitions and posting journal number sequences that drive automated subledger postings
- Filter, sort, and page through any entity set using standard OData query parameters (`$filter`, `$orderby`, `$top`, `$skip`, `$expand`, `$select`)

## Actions

Actions are operations you invoke on Microsoft Dynamics 365 Finance from your integration. Use these actions to list, create, retrieve, update, and delete ledger accountants, accrual schemes, audit trails, ledger intervals, journal descriptions and headers, opening sheets, posting definitions, and posting journals.

| Client | Actions |
|--------|---------|
| `Client` | Ledger accountant, accrual scheme, audit trail, ledger interval, journal description, journal header, opening sheet, posting definition, and posting journal CRUD |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through registering an application in Microsoft Entra ID and obtaining the credentials required by the connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **Microsoft Dynamics 365 Finance Ledger** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Microsoft Dynamics 365 Finance Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-microsoft.dynamics365.finance)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
