---
title: "Overview"
---

# Overview

[Microsoft Dynamics 365 Finance](https://www.microsoft.com/en-us/dynamics-365/products/finance) is Microsoft's cloud ERP solution for financial management, covering general ledger, accounts receivable and payable, fixed assets, budgeting, cash and bank management, and tax. The Procurement module within Dynamics 365 Finance manages vendor-facing purchasing data: delivery terms and freight charge conventions applied to purchase orders, discount rate schedules used for market-based discounting, intent letters used for Italian tax-exempt purchasing declarations, and vendor invoice declarations used for invoice record type reporting in country-specific regulatory scenarios. The `ballerinax/microsoft.dynamics365.finance.procurement` connector enables you to list, create, retrieve, update, and delete these Procurement entities via the Dynamics 365 Finance and Operations OData API directly from your integration flows.

## Key features

- Manage delivery terms used on purchase orders, including cash-on-delivery, freight charge terms, port requirements, and intrastat reporting codes
- Maintain discount rate schedules for market-based discounting, keyed by effective start date
- Manage intent letters for Italian tax-exempt purchasing declarations, including purchase type, validity period, amount, and closure status
- Manage vendor invoice declarations used for invoice record type reporting in country-specific regulatory scenarios
- Full list, create, read, update, and delete (CRUD) support for every Procurement entity set
- Filter, sort, paginate, and shape responses using OData query parameters (`skip`, `top`, `filter`, `orderby`, `expand`, `select`)
- Query across companies with a single `crossCompany` flag
- OAuth2 client credentials authentication against Microsoft Entra ID

## Actions

Actions are operations you invoke on the Microsoft Dynamics 365 Finance environment from your integration. Use these actions for managing delivery terms, discount rate schedules, intent letters, and vendor invoice declarations. The Microsoft Dynamics 365 Finance Procurement connector exposes all actions through a single client:

| Client | Actions |
|--------|---------|
| `Client` | Delivery terms, discount rates, intent letters, vendor invoice declarations |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through registering an application in Microsoft Entra ID, granting it Dynamics 365 Finance and Operations API permissions, and adding it as a user in your Dynamics 365 Finance environment to obtain the credentials needed for the Microsoft Dynamics 365 Finance Procurement connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **Microsoft Dynamics 365 Finance Procurement** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Microsoft Dynamics 365 Finance Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-microsoft.dynamics365.finance)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
