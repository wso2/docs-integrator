---
title: "Overview"
---

# Overview

[Microsoft Dynamics 365 Finance](https://www.microsoft.com/en-us/dynamics-365/products/finance) is Microsoft's cloud ERP solution for financial management, covering general ledger, accounts receivable and payable, fixed assets, budgeting, cash and bank management, and tax. The Customer Main module holds the customer master data that underpins these processes — identification and address details, credit management and collections settings, sales defaults, payment and tax configuration, and delivery terms — exposed through the `CustomersV2` and `CustomersV3` OData entities.

The `ballerinax/microsoft.dynamics365.finance.customermain` connector enables you to list, create, read, update, and delete customer master records in Microsoft Dynamics 365 Finance directly from your integration flows.

## Key features

- Manage core customer master data through the `CustomersV2` entity
- Manage extended customer master data, including credit management and collections fields, through the `CustomersV3` entity
- Full CRUD support: list, create, get, update, and delete operations for every entity set
- Filter, sort, paginate, and shape responses using OData query parameters (`$filter`, `$orderby`, `$top`, `$skip`, `$expand`, `$select`, `$count`)
- Query across legal entities in a single request using the `cross-company` query parameter
- Optimistic concurrency control on update and delete operations using `If-Match` ETag headers
- OAuth 2.0 client credentials grant authentication against Microsoft Entra ID

## Actions

Actions are operations you invoke on Microsoft Dynamics 365 Finance from your integration. Use these actions for listing and filtering customer records, onboarding new customers, updating credit and payment settings, and removing customer records.

| Client | Actions |
|--------|---------|
| `Client` | Customer master data CRUD for `CustomersV2` and `CustomersV3` |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through registering an application in Microsoft Entra ID, granting it access to Dynamics 365 Finance and Operations, and obtaining the credentials required by the connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **Microsoft Dynamics 365 Finance Customer Main** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Microsoft Dynamics 365 Finance Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-microsoft.dynamics365.finance)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
