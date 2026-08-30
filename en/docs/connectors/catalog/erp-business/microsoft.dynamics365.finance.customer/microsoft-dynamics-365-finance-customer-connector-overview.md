---
title: "Overview"
---

# Overview

[Microsoft Dynamics 365 Finance](https://www.microsoft.com/en-us/dynamics-365/products/finance) is Microsoft's cloud ERP solution for financial management, covering general ledger, accounts receivable and payable, fixed assets, budgeting, cash and bank management, and tax. The Customer module holds the customer master data that accounts receivable, sales, and collections processes depend on: customer records themselves, the customer groups they are assigned to for posting and payment defaults, the parameters that govern customer-related processing for a legal entity, and a lightweight base view of customer records for lookups and integrations that don't need the full customer schema.

The `ballerinax/microsoft.dynamics365.finance.customer` connector enables you to create, read, update, and delete customer records, customer groups, customer parameters, and base customer entities directly from your integration flows.

## Key features

- Manage customer master records, including credit limits, payment terms, sales currency, and hold status
- Manage customer groups used to default payment terms, tax groups, and posting behavior across customers
- Manage per-legal-entity customer parameters that govern collections, settlement, credit limit checks, and withholding tax behavior
- Read a lightweight base view of customer records (`CustomersBase`) for integrations that only need core identification fields
- Full list, create, read, update, and delete (CRUD) operations across every entity set
- Filter, sort, and page through records using OData query parameters (`$filter`, `$orderby`, `$top`, `$skip`, `$expand`, `$select`, `$count`)
- OAuth2 client credentials authentication with Microsoft Entra ID (Azure AD)

## Actions

Actions are operations you invoke on Microsoft Dynamics 365 Finance from your integration. Use these actions for listing and filtering customer records, creating and updating customers and customer groups, and managing the supporting customer parameters and base customer entities.

| Client | Actions |
|--------|---------|
| `Client` | Customer CRUD, customer groups, customer parameters, customer base records |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through registering an application in Microsoft Entra ID (Azure AD), granting it access to Microsoft Dynamics 365 Finance and Operations, and obtaining the credentials required by the connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **Microsoft Dynamics 365 Finance Customer** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Microsoft Dynamics 365 Finance Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-microsoft.dynamics365.finance)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
