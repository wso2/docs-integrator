---
title: "Overview"
---

# Overview

[Microsoft Dynamics 365 Finance](https://www.microsoft.com/en-us/dynamics-365/products/finance) is Microsoft's cloud ERP solution for financial management, covering general ledger, accounts receivable and payable, fixed assets, budgeting, cash and bank management, and tax. The Vendor module within Dynamics 365 Finance manages the vendor master data that accounts payable and procurement processes depend on — vendor records, the vendor groups used to classify and default them, the reason codes used to document vendor transactions, and the company-wide accounts payable parameters that govern invoice matching, settlement, and posting behavior. The `ballerinax/microsoft.dynamics365.finance.vendor` connector enables you to create, read, update, and delete vendor master records and their related configuration entities directly from your integration flows.

## Key features

- Manage vendor master records, including addresses, payment terms, currency, tax settings, and on-hold status
- Manage vendor groups used to classify vendors and apply shared defaults such as payment terms and tax groups
- Manage vendor reason codes used to document cancellations and other vendor transaction reasons
- Configure company-wide vendor (accounts payable) parameters, such as invoice matching policy, settlement rules, and posting profiles
- List and filter vendor entities using OData query parameters (`$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`)
- Query across all legal entities (companies) in a single request using the `cross-company` parameter
- Perform optimistic-concurrency-safe updates and deletes using ETags (`If-Match`)
- OAuth2 client credentials authentication against Microsoft Entra ID

## Actions

Actions are operations you invoke on Microsoft Dynamics 365 Finance from your integration. Use these actions for listing and filtering vendor records, creating and updating vendor master data, and managing vendor groups, reason codes, and vendor parameters.

| Client | Actions |
|--------|---------|
| `Client` | Vendor CRUD, vendor group management, vendor reason code management, vendor parameter configuration |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through registering an application in Microsoft Entra ID and obtaining the credentials required by the connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **Microsoft Dynamics 365 Finance Vendor** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Microsoft Dynamics 365 Finance Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-microsoft.dynamics365.finance)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
