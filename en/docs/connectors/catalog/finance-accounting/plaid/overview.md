---
connector: true
connector_name: "plaid"
title: "Plaid"
description: "Overview of the ballerinax/plaid connector for WSO2 Integrator."
---

# Plaid

Plaid is a financial data network that connects applications to their users' bank, card, investment, and loan accounts. The Plaid connector lets applications call the Plaid API, covering everything from linking accounts through Plaid Link, reading balances and transactions, verifying income and assets, to moving money with Transfer and Payment Initiation, against either the Sandbox or Production environment using Plaid API version `2020-09-14`.

## Key Features

- Create Link tokens, exchange public tokens, and manage the full lifecycle of linked Items
- Read accounts, real-time balances, ACH and international account numbers, and account-holder identity
- Sync and enrich transactions, detect recurring spending streams, and refresh transaction data on demand
- Retrieve investment holdings and transactions, liabilities, and loan statements
- Generate Asset Reports and Consumer Report (Plaid Check) data for income, cashflow, and lending decisions
- Authorize and create ACH transfers and international payments using processor tokens
- Screen users for compliance with Identity Verification, Monitor, and Beacon

## Actions

The Plaid connector exposes a single `Client` that covers every Plaid API endpoint across items, accounts, transactions, investments, liabilities, identity, transfers, payments, and regulatory reporting.

| Client | Actions |
|--------|---------|
| `Client` | Item and Link token management, Account and balance retrieval, Transaction sync and enrichment, Investment holdings and transactions, Liabilities, Identity and account numbers, Asset and Consumer Reports, Transfers and payment initiation, Sandbox utilities, Institution lookup |

See the **[Action Reference](action-reference.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: How to create a Plaid account, obtain API keys, and optionally configure OAuth 2.0 credentials for Plaid Check endpoints.

* **[Action Reference](action-reference.md)**: Full reference for all clients, with operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **Plaid** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Plaid Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-plaid)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
