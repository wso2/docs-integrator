---
title: "Overview"
---

# Overview

[Microsoft Dynamics 365 Finance](https://www.microsoft.com/en-us/dynamics-365/products/finance) is Microsoft's cloud ERP solution for financial management, covering general ledger, accounts receivable and payable, fixed assets, budgeting, cash and bank management, and tax. Underneath these business modules, the platform relies on a broad set of shared System entities — reference and configuration data such as address abbreviations, product master records, format and model codes, date intervals, tax components, and country/region-specific compliance tables — that other modules and integrations read and maintain through the platform's OData REST API. The `ballerinax/microsoft.dynamics365.finance.system` connector enables you to list, create, retrieve, update, and delete these System entities directly from your integration flows.

## Key features

- Manage foundational reference data such as address type abbreviations, product master records, and payment format, model, and service codes used across the environment
- Configure country/region-specific compliance entities, including Mexican e-invoice extended code tables, Brazilian CFPS transaction codes, and Russian address house registry and item customs declaration (GTD) records
- Maintain tax components, fiscal date interval definitions, and system-wide finance parameters
- Manage warehouse load templates and site gates, retail loyalty levels, and bank statement import modes
- Track electronic messaging item types, estate status codes, lines of business, and other client/party records
- Full list, create, read, update, and delete (CRUD) support for every System entity set, with OData query options for filtering, sorting, paging, and field selection
- OAuth2 client credentials authentication against Microsoft Entra ID

## Actions

Actions are operations you invoke on the Microsoft Dynamics 365 Finance environment from your integration. Use these actions to list, create, retrieve, update, and delete address abbreviations, product master data, CFPS transaction codes, tax components, date intervals, extended code tables, format and model codes, load templates, loyalty levels, system parameters, and other System reference entities. The Microsoft Dynamics 365 Finance System connector exposes all actions through a single client:

| Client | Actions |
|--------|---------|
| `Client` | Abbreviations, product master data, CFPS transaction codes, tax components, date intervals, EM item types, estate status, extended code tables, format codes, house registry records, import modes, item GTDs, load templates, loyalty levels, model tables, lines of business, other clients, system parameters, service codes, and site gate CRUD |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through registering an application in Microsoft Entra ID, granting it Dynamics 365 Finance and Operations API permissions, and adding it as a user in your Dynamics 365 Finance environment to obtain the credentials needed for the Microsoft Dynamics 365 Finance System connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **Microsoft Dynamics 365 Finance System** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Microsoft Dynamics 365 Finance Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-microsoft.dynamics365.finance)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
