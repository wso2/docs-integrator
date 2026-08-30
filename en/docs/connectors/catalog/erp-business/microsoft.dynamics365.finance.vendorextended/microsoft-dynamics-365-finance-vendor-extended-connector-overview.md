---
title: "Overview"
---

# Overview

[Microsoft Dynamics 365 Finance](https://www.microsoft.com/en-us/dynamics-365/products/finance) is Microsoft's cloud ERP solution for financial management, covering general ledger, accounts receivable and payable, fixed assets, budgeting, cash and bank management, and tax. The Vendor Extended module builds on the core vendor master data to expose the full breadth of country- and region-specific vendor attributes used across Dynamics 365 Finance and Operations deployments — tax registration and reporting details (1099, VAT, GST, withholding tax), person and organization identification fields, banking and payment collaboration settings, and localized address and contact information, across both the `VendorsV2` and `VendorsV3` OData entity sets. The `ballerinax/microsoft.dynamics365.finance.vendorextended` connector enables you to create, read, update, and delete these extended vendor records directly from your integration flows.

## Key features

- Manage extended vendor master data across the `VendorsV2` and `VendorsV3` entity sets, including addresses, contacts, tax registrations, and payment settings
- Full CRUD operations (list, create, read, update, delete) on vendor extended records
- List and filter vendor extended entities using OData query parameters (`$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`)
- Query across all legal entities (companies) in a single request using the `cross-company` parameter
- Retrieve individual vendor records by their composite company (`dataAreaId`) and vendor account number key
- Perform optimistic-concurrency-safe updates and deletes using ETags (`If-Match`)
- OAuth2 client credentials authentication against Microsoft Entra ID

## Actions

Actions are operations you invoke on Microsoft Dynamics 365 Finance from your integration. Use these actions for listing and filtering extended vendor records and for creating, updating, and deleting vendor master data across the `VendorsV2` and `VendorsV3` entity sets.

| Client | Actions |
|--------|---------|
| `Client` | Vendor extended CRUD across the `VendorsV2` and `VendorsV3` entity sets |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through registering an application in Microsoft Entra ID and obtaining the credentials required by the connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **Microsoft Dynamics 365 Finance Vendor Extended** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Microsoft Dynamics 365 Finance Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-microsoft.dynamics365.finance)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
