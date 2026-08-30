---
title: "Overview"
---

# Overview

[Microsoft Dynamics 365 Finance](https://www.microsoft.com/en-us/dynamics-365/products/finance) is Microsoft's cloud ERP solution for financial management, covering general ledger, accounts receivable and payable, fixed assets, budgeting, cash and bank management, and tax. The Vendor Payment module within Dynamics 365 Finance covers how outgoing vendor disbursements are configured and processed — the payment methods that determine how a disbursement is issued (check, electronic payment, or promissory note), the payment journal headers and lines used to batch, post, and reconcile individual vendor payment transactions, the pay-when-paid text recorded against vendor retention and contract terms, and the pay agreements that define rounding and time-deduction rules referenced during payment calculations. The `ballerinax/microsoft.dynamics365.finance.vendorpayment` connector enables you to create, read, update, and delete these vendor payment entities directly from your integration flows.

## Key features

- Manage vendor payment methods, including payment type, payment status, sum-by-period rules, and bank transaction type
- Manage vendor payment journal headers and lines used to batch, post, and reconcile vendor payment transactions
- Manage vendor pay-when-paid text (`VendPWPTxt`) used to record vendor retention and pay-when-paid contract language
- Manage pay agreements, including overtime rounding rules and time-deduction settings
- List and filter vendor payment entities using OData query parameters (`$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`)
- Query across all legal entities (companies) in a single request using the `cross-company` parameter
- Perform optimistic-concurrency-safe updates and deletes using ETags (`If-Match`)
- OAuth2 client credentials authentication against Microsoft Entra ID

## Actions

Actions are operations you invoke on Microsoft Dynamics 365 Finance from your integration. Use these actions for listing and filtering vendor payment records, creating and updating vendor payment journals, and managing vendor payment methods, pay-when-paid text, and pay agreements.

| Client | Actions |
|--------|---------|
| `Client` | Vendor payment method management, vendor payment journal header/line management, vendor pay-when-paid text management, pay agreement management |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through registering an application in Microsoft Entra ID and obtaining the credentials required by the connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **Microsoft Dynamics 365 Finance Vendor Payment** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Microsoft Dynamics 365 Finance Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-microsoft.dynamics365.finance)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
