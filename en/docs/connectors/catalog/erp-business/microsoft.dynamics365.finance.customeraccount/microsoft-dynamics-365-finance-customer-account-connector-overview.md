---
title: "Overview"
---

# Overview

[Microsoft Dynamics 365 Finance](https://www.microsoft.com/en-us/dynamics-365/products/finance) is Microsoft's cloud ERP solution for financial management, covering general ledger, accounts receivable and payable, fixed assets, budgeting, cash and bank management, and tax. The Customer Account module covers the operational side of managing accounts receivable customers: how to reach them (electronic addresses such as phone, email, and web), where to send goods or invoices (postal addresses), how they pay and how payments are recorded (payment methods and payment journals), and how their transactions are posted to the general ledger (posting profiles).

The `ballerinax/microsoft.dynamics365.finance.customeraccount` connector enables you to manage customer electronic addresses, postal addresses, payment methods, payment journal headers and lines, and customer posting profiles directly from your integration flows.

## Key features

- Manage customer electronic addresses (phone, email, URL, and other contact methods) linked to a customer account
- Manage customer postal addresses, including delivery address details and primary/private address flags
- Manage customer payment methods, including payment type, SEPA and direct debit settings, and payment journal defaults
- Manage customer payment journal headers and their individual payment lines, including amounts, offset accounts, and posting details
- Manage customer posting profiles that control settlement, interest calculation, and collection letter behavior
- Full list, create, read, update, and delete (CRUD) operations across every entity set
- Filter, sort, and page through records using OData query parameters (`$filter`, `$orderby`, `$top`, `$skip`, `$expand`, `$select`, `$count`)
- OAuth2 client credentials authentication with Microsoft Entra ID (Azure AD)

## Actions

Actions are operations you invoke on Microsoft Dynamics 365 Finance from your integration. Use these actions for listing and filtering customer accounts data, recording new electronic and postal addresses, configuring payment methods and posting profiles, and managing customer payment journals.

| Client | Actions |
|--------|---------|
| `Client` | Customer electronic address CRUD, customer postal address CRUD, customer payment method CRUD, customer payment journal header and line CRUD, customer posting profile CRUD |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through registering an application in Microsoft Entra ID (Azure AD), granting it access to Microsoft Dynamics 365 Finance and Operations, and obtaining the credentials required by the connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **Microsoft Dynamics 365 Finance Customer Account** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Microsoft Dynamics 365 Finance Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-microsoft.dynamics365.finance)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
