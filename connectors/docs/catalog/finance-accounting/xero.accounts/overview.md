---
title: Xero Accounts
---

# Xero Accounts

Xero is a cloud-based accounting platform for small and medium-sized businesses. The Xero Accounts connector lets you work with the Xero Accounting API to manage the full accounting lifecycle, from contacts and invoices through to payments, bank reconciliation, and financial reporting.

## Key Features

- Create, update, and track sales invoices, purchase bills, credit notes, quotes, and purchase orders
- Manage contacts, contact groups, items, and the chart of accounts
- Record payments, batch payments, overpayments, prepayments, and credit note allocations
- Work with bank transactions and bank transfers, including attachments and history notes
- Manage manual journals, expense claims, and currencies
- Read organisation settings, tax rates, tracking categories, and budgets
- Generate financial reports including profit and loss, balance sheet, and trial balance
- Upload and retrieve file attachments for invoices, contacts, credit notes, and other records

## Actions

The connector exposes a single `Client` that covers all Xero Accounting API resources. The table below shows the main capability areas.

| Client | Actions |
|--------|---------|
| `Client` | Accounts (chart of accounts), Invoices and bills, Contacts and contact groups, Payments and batch payments, Bank transactions and transfers, Credit notes and allocations, Purchase orders and quotes, Expense claims, Manual journals, Items, Tax rates, Tracking categories, Currencies, Branding themes, Budgets, Financial reports, Organisation settings |

See the **[Action Reference](action-reference.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: How to register a Xero app, obtain OAuth 2.0 credentials, and retrieve your organisation tenant ID.

* **[Action Reference](action-reference.md)**: Full reference for all clients, with operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **Xero Accounts** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Xero Accounts Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-xero.accounts)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
