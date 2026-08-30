---
title: "Overview"
---

# Overview

[Microsoft Dynamics 365 Finance](https://www.microsoft.com/en-us/dynamics-365/products/finance) is Microsoft's cloud ERP solution for financial management, covering general ledger, accounts receivable and payable, fixed assets, budgeting, cash and bank management, and tax. Its Workflow module lets organizations model, automate, and track approval and business processes across Dynamics 365 Finance and Operations documents — defining workflow templates, the actions and action classes that execute automated steps, the users and advanced (dimension hierarchy) rules used for approval routing, the process stages that make up a business process, the policies and policy rules that govern violation handling, and the batch jobs, batch groups, and database logs that support and audit workflow execution — and exposes these as entities through the platform's OData REST API. The `ballerinax/microsoft.dynamics365.finance.workflow` connector enables you to create, read, update, and delete workflow definitions, action classes, actions, advanced rules, approval users, batch groups, batch jobs, database logs, workflow operations, policy types, policy rules, process stages, and reconciliation setup bases directly from your integration flows.

## Key features

- Manage workflow definitions (`Workflows`), including their association type, category, template, and module assignment
- Configure action classes and actions used to drive automated workflow steps such as web service calls, executable classes, and Electronic Reporting (ER) exports
- Manage approval users and advanced (dimension hierarchy) rules used for approval routing
- Manage process stages and workflow operation types used to define the steps of a business process
- Configure policy types and policy rules that govern approval and violation handling across workflow-enabled documents
- Manage batch groups and batch jobs used for scheduled and background execution of workflow-related processes
- Inspect database logs recorded for auditing insert, update, delete, and rename-key events
- List and filter every workflow entity set using OData query parameters (`$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`), including cross-company queries
- OAuth2 client credentials authentication against Microsoft Entra ID

## Actions

Actions are operations you invoke on Microsoft Dynamics 365 Finance from your integration. Use these actions to list, create, retrieve, update, and delete workflow definitions, action classes, actions, advanced rules, approval users, batch groups, batch jobs, database logs, workflow operations, policy types, policy rules, process stages, and reconciliation setup bases.

| Client | Actions |
|--------|---------|
| `Client` | Workflow definition, action class, action, advanced rule, approval user, batch group, batch job, database log, workflow operation, policy type, policy rule, process stage, and rec setup basis CRUD |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through registering an application in Microsoft Entra ID and obtaining the credentials required by the connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **Microsoft Dynamics 365 Finance Workflow** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Microsoft Dynamics 365 Finance Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-microsoft.dynamics365.finance)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
