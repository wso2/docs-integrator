---
title: SAP Business One Projects
---

[SAP Business One](https://www.sap.com/products/erp/business-one.html) is an enterprise resource planning (ERP) solution designed for small and midsize businesses by SAP SE. The `sap.businessone.projects` connector provides access to the project management objects of SAP Business One — financial project codes, project management projects, and time sheets — through the [SAP Business One Service Layer](https://help.sap.com/doc/056f69366b5345a386bb8149f1700c19/10.0/en-US/Service%20Layer%20API%20Reference.html) OData API. It authenticates with the Service Layer session protocol and transparently re-establishes the session when it expires.

## Key Features

- Manage financial project codes and project management projects
- Create, read, update, and cancel project management projects
- Track project stages, phases, tasks, areas, priorities, and subproject types
- Manage subprojects within a project management project
- Record and query project management time sheets
- Manage expense types used across projects
- Session-based authentication with automatic re-login on session expiry

## Actions

The connector exposes a single client for interacting with the SAP Business One Service Layer project management objects.

| Client | Actions |
|--------|---------|
| `Client` | Projects, Project management projects, Project configuration (activities, areas, priorities, stage types, subproject types, tasks), Subprojects, Time sheets, Expense types |

See the **[Action Reference](action-reference.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: How to prepare an SAP Business One installation with the Service Layer component and obtain the connection credentials.

* **[Action Reference](action-reference.md)**: Full reference for all clients — operations, parameters, return types, and sample code.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [SAP Business One Projects Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-sap.businessone)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
