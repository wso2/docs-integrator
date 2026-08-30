---
title: "Overview"
---

# Overview

[Microsoft Dynamics 365 Finance](https://www.microsoft.com/en-us/dynamics-365/products/finance) is Microsoft's cloud ERP solution for financial management, covering general ledger, accounts receivable and payable, fixed assets, budgeting, cash and bank management, and tax. Its Project module extends this with project accounting capabilities — tracking project structure, tasks, budgets, grants, actual costs and revenue, and forecasted amounts for project-based and grant-funded work. The `ballerinax/microsoft.dynamics365.finance.project` connector enables you to create, read, update, and delete project entities, project groups, project stages, project tasks, project grants, and project financial actuals and forecasts directly from your integration flows.

## Key features

- Manage core project records, including scheduling, budgeting, and status, through both the `Projects` and `ProjectsV2` entity sets
- Organize projects using project groups, which define posting rules, budgeting behavior, and default settings
- Track project life-cycle stages through the project stage entity set
- Manage the work breakdown structure of a project through project tasks
- Track grant-funded projects, award amounts, and grant status through `ProjGrants` and `ProjGrantsV2`
- Retrieve posted project actual transactions (`PSAActuals`) for cost, revenue, and WIP reporting
- Retrieve forecasted project amounts (`PSAForecasts`) for budgeting and profitability analysis
- Access Common Data Service project records (`CDSProjects`) for cross-application project data sharing
- Full CRUD (list, create, get, update, delete) support across every entity set, secured with OAuth 2.0 client credentials

## Actions

Actions are operations you invoke on Microsoft Dynamics 365 Finance from your integration. Use these actions for listing and filtering project data, creating and updating project records, and managing project groups, stages, tasks, grants, actuals, and forecasts.

| Client | Actions |
|--------|---------|
| `Client` | Project, project group, project stage, project task, project grant, project actual, project forecast, and CDS project CRUD |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through registering an application in Microsoft Entra ID, granting it access to your Dynamics 365 Finance and Operations environment, and obtaining the credentials required by the connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **Microsoft Dynamics 365 Finance Project** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Microsoft Dynamics 365 Finance Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-microsoft.dynamics365.finance)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
