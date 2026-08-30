---
title: "Overview"
---

# Overview

[Microsoft Dynamics 365 Finance](https://www.microsoft.com/en-us/dynamics-365/products/finance) is Microsoft's cloud ERP solution for financial management, covering general ledger, accounts receivable and payable, fixed assets, budgeting, cash and bank management, and tax. The System Config module holds cross-module system administration and reference data that underpins these processes — reason codes, product types, tax registration numbers, organizational fixtures such as rooms and work calendars, table mapping and type metadata, web service endpoint definitions, and specialized regional configuration for fixed-asset deferrals and bank reporting — exposed through OData entities such as `Reasons`, `ProductTypes`, `Registrations`, `Rooms`, `WorkCalendars`, `WebServices`, `TableMappings`, `TypeTables`, `Types`, and related entities.

The `ballerinax/microsoft.dynamics365.finance.sysconfig` connector enables you to list, create, read, update, and delete system configuration and reference data records in Microsoft Dynamics 365 Finance directly from your integration flows.

## Key features

- Manage general system reference data through the `Reasons`, `ProductTypes`, `Types`, and `TypeTables` entities
- Manage organizational and scheduling fixtures through the `Rooms`, `Steads`, and `WorkCalendars` entities
- Manage tax and party registration records through the `Registrations` entity
- Manage integration metadata through the `WebServices` and `TableMappings` entities
- Manage specialized regional configuration such as fixed-asset deferral factors (`RBSLFactors`), bank reporting flags (`State11`), and standard tax sequences (`StdSeqs`)
- Full CRUD support: list, create, get, update, and delete operations across all 18 entity sets
- Filter, sort, paginate, and shape responses using OData query parameters (`$filter`, `$orderby`, `$top`, `$skip`, `$expand`, `$select`, `$count`)
- Optimistic concurrency control on update and delete operations using `If-Match` ETag headers
- OAuth 2.0 client credentials grant authentication against Microsoft Entra ID

## Actions

Actions are operations you invoke on Microsoft Dynamics 365 Finance from your integration. Use these actions for listing and filtering system configuration records, creating and maintaining reference data, and removing records that are no longer needed.

| Client | Actions |
|--------|---------|
| `Client` | System configuration and reference data CRUD across 18 entity sets |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through registering an application in Microsoft Entra ID, granting it access to Dynamics 365 Finance and Operations, and obtaining the credentials required by the connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **Microsoft Dynamics 365 Finance System Config** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Microsoft Dynamics 365 Finance Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-microsoft.dynamics365.finance)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
