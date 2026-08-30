---
title: "Overview"
---

# Overview

[Microsoft Dynamics 365 Finance](https://www.microsoft.com/en-us/dynamics-365/products/finance) is Microsoft's cloud ERP solution for financial management, covering general ledger, accounts receivable and payable, fixed assets, budgeting, cash and bank management, and tax. Its Human Resources capabilities extend the platform with workforce lifecycle data, and the HR Development area specifically covers the building blocks used for employee growth and organizational structuring — skills, rating models and levels, job tasks and templates, course groups, teams and team membership, labor unions, and benefit vesting rules. The `ballerinax/microsoft.dynamics365.finance.hrdev` connector enables you to create, read, update, list, and delete these HR development entities directly from your integration flows.

## Key features

- Manage skill catalogs and skill types used to track employee competencies
- Maintain rating models and rating levels used to score skills and competencies
- Manage job tasks and job templates used for job design and job descriptions
- Manage course groups used to categorize learning and training content
- Manage teams and team membership, including both the original and V2 team entities
- Maintain labor union and union reference data used in HR compliance processing
- Manage position types and loan types/items used for HR equipment and loan administration
- Maintain benefit vesting rules that govern when employees become vested in benefit plans
- Full CRUD (list, create, get, update, delete) support across every entity set, with OData query parameters for filtering, sorting, pagination, and field selection

## Actions

Actions are operations you invoke on Microsoft Dynamics 365 Finance from your integration. Use these actions for listing and filtering HR development records, creating new reference data, updating existing records, and removing records that are no longer needed.

| Client | Actions |
|--------|---------|
| `Client` | Course group, job task, job template, labor union, loan item, loan type, position type, rating level, rating model, skill, skill type, team, team member (V1/V2), union, and vesting rule CRUD |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through registering an application in Microsoft Entra ID and obtaining the credentials required by the connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **Microsoft Dynamics 365 Finance HR Development** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Microsoft Dynamics 365 Finance Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-microsoft.dynamics365.finance)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
