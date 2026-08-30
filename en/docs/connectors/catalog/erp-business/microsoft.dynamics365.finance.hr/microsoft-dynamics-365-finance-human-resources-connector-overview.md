---
title: "Overview"
---

# Overview

[Microsoft Dynamics 365 Finance](https://www.microsoft.com/en-us/dynamics-365/products/finance) is Microsoft's cloud ERP solution for financial management, covering general ledger, accounts receivable and payable, fixed assets, budgeting, cash and bank management, and tax. Its Human Resources module holds worker and person master data — employment records, worker demographics and contact details, absence and holiday reference data, and the links between people and their Dynamics 365 user accounts — and exposes these as entities through the platform's OData REST API.

The `ballerinax/microsoft.dynamics365.finance.hr` connector enables you to create, read, update, and delete absence codes and reasons, city and state holidays, employments, employee self-service (ESS) worker profiles, injury types, people, person images, and person-to-user links directly from your integration flows.

## Key features

- Manage absence codes and absence reasons used for time and attendance tracking
- Maintain city and state holiday calendars used in scheduling and leave calculations
- Create and manage worker employment records, including employment start/end dates, legal entity, and worker type
- Access employee self-service (ESS) worker profile data
- Track workplace injury type reference data used in incident recording
- Manage person (worker/employee) demographic, address, and contact records
- Manage person profile images and link person records to Dynamics 365 user accounts (`PersonUsers`)
- Filter, sort, and page through any entity set using standard OData query parameters (`$filter`, `$orderby`, `$top`, `$skip`, `$expand`, `$select`)

## Actions

Actions are operations you invoke on Microsoft Dynamics 365 Finance from your integration. Use these actions to list, create, retrieve, update, and delete absence codes and reasons, city and state holidays, employments, ESS worker profiles, injury types, people, person images, and person-user links.

| Client | Actions |
|--------|---------|
| `Client` | Absence code, absence reason, city holiday, employment, ESS worker, injury type, person, person image, and person-user CRUD |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through registering an application in Microsoft Entra ID and obtaining the credentials required by the connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **Microsoft Dynamics 365 Finance HR** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Microsoft Dynamics 365 Finance Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-microsoft.dynamics365.finance)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
