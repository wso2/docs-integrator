---
title: SAP Business One Financials
---

[SAP Business One](https://www.sap.com/products/erp/business-one.html) is an enterprise resource planning (ERP) solution for small and midsize businesses by SAP SE. The `ballerinax/sap.businessone.financials` connector exposes the financial accounting objects of SAP Business One — chart of accounts, journal entries, budgets, cost accounting dimensions, and tax setup — through the [SAP Business One Service Layer](https://help.sap.com/doc/056f69366b5345a386bb8149f1700c19/10.0/en-US/Service%20Layer%20API%20Reference.html) OData API. Authentication uses the Service Layer session protocol, with automatic re-login when a session expires.

## Key Features

- Create and query journal entries, journal vouchers, and posting templates
- Manage the chart of accounts, account categories, and account segmentations
- Maintain budgets, budget scenarios, and budget distributions
- Configure cost accounting: cost centers, cost elements, dimensions, distribution rules, and profit centers
- Set up tax objects: sales tax codes, VAT groups, withholding tax, deductible taxes, and tax code determinations
- Manage currencies, financial years, closing date procedures, and cash discounts
- Schedule and execute recurring postings and recurring transactions

## Actions

The connector provides a single client for interacting with the SAP Business One Service Layer financial endpoints.

| Client | Actions |
|--------|---------|
| `Client` | Chart of accounts & account categories, Journal entries & vouchers, Posting & recurring templates, Budgets & distributions, Cost accounting (cost centers, cost elements, dimensions, profit centers), Tax configuration (VAT, sales tax, withholding tax), Currencies & financial years |

See the **[Action Reference](action-reference.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: How to prepare an SAP Business One installation with the Service Layer enabled and obtain the connection credentials.

* **[Action Reference](action-reference.md)**: Full reference for all clients — operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **SAP Business One Financials** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [SAP Business One Financials Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-sap.businessone)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
