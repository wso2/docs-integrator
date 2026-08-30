---
title: "Overview"
---

# Overview

[Microsoft Dynamics 365 Finance](https://www.microsoft.com/en-us/dynamics-365/products/finance) is Microsoft's cloud ERP solution for financial management, covering general ledger, accounts receivable and payable, fixed assets, budgeting, cash and bank management, and tax. The Journal Entry module covers the general journal and ledger journal entities used to record, validate, and post financial transactions: journal batches and their names (journal names and journal tables), line-level detail (journal lines, journal trans, and ledger journal lines), and the settlement of open ledger transactions raised by those entries. The `ballerinax/microsoft.dynamics365.finance.journalentry` connector enables you to create, list, retrieve, update, and delete journal entry records and manage ledger transaction settlements directly from your integration flows.

## Key features

- Create, list, retrieve, update, and delete general journal batch headers via the `JournalTables` entity set
- Manage journal batch names and their posting configuration through the `JournalNames` entity set
- Create and maintain general journal lines, including debit and credit amounts, via the `JournalLines` entity set
- Work with project and subledger journal transaction lines through the `JournalTrans` entity set
- Manage detailed general ledger voucher lines via the `LedgerJournalLines` entity set
- Read, create, update, and delete ledger transaction settlements, including the enhanced `LedgerTransSettlementsV2` entity set, to track and settle open transactions
- Filter, sort, paginate, and expand related data on every entity set using standard OData query parameters
- Query across legal entities in a single request using the cross-company option
- OAuth2 client credentials authentication with Microsoft Entra ID

## Actions

Actions are operations you invoke on Microsoft Dynamics 365 Finance from your integration. Use these actions for listing and filtering journal entries, creating and posting journal batches and lines, and managing ledger transaction settlements.

| Client | Actions |
|--------|---------|
| `Client` | Journal batch (`JournalTables`), journal name (`JournalNames`), journal line (`JournalLines`), journal transaction (`JournalTrans`), and ledger journal line (`LedgerJournalLines`) CRUD; ledger transaction settlement (`LedgerTransSettlements`, `LedgerTransSettlementsV2`) CRUD |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through registering an application in Microsoft Entra ID, granting it Dynamics 365 API permissions, adding it as a Dynamics 365 Finance user, and obtaining the credentials required by the connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **Microsoft Dynamics 365 Finance Journal Entry** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Microsoft Dynamics 365 Finance Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-microsoft.dynamics365.finance)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
