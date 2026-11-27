---
connector: true
connector_name: "xero.finance"
title: "Xero Finance"
description: "Overview of the ballerinax/xero.finance connector for WSO2 Integrator."
---

# Xero Finance

The Xero Finance connector lets applications read data from the Xero Finance API, which supports loan applications and financial partner assessments. It provides lenders and financial partners with read access to an organisation's financial statements, cash validation summaries, and bank statement data. Using this connector, applications can retrieve balance sheet, profit and loss, cash flow, and trial balance reports alongside contact-level revenue and expense breakdowns.

## Key Features

- Retrieve balance sheet reports showing assets, liabilities, and equity positions
- Access profit and loss statements for specified reporting periods
- Obtain cash flow reports and trial balance data for period-end reviews
- Analyse revenue and expense totals broken down by customer and supplier contacts
- Validate cash positions across bank accounts against reconciled statement lines
- Access bank statement data together with matching accounting transactions
- Authenticate with OAuth 2.0 using a refresh token or bearer token

## Actions

The Xero Finance connector exposes a single client for invoking the Xero Finance API operations.

| Client | Actions |
|--------|---------|
| `Client` | Financial statement reports (Balance Sheet, Profit & Loss, Cash Flow, Trial Balance), contact revenue and expense analysis, cash validation, bank statement accounting |

See the **[Action Reference](action-reference.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: How to register a Xero app, obtain OAuth 2.0 credentials, and retrieve the tenant identifier required to call the Finance API.

* **[Action Reference](action-reference.md)**: Full reference for all clients, with operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **Xero Finance** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Xero Finance Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-xero.finance)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
