---
title: SAP Business One Human Resources
---

[SAP Business One](https://www.sap.com/products/erp/business-one.html) is an enterprise resource planning (ERP) solution designed for small and midsize businesses by SAP SE. The `ballerinax/sap.businessone.humanresources` connector provides APIs for the human resources objects of SAP Business One — including employee master data, teams, positions, and HR setup — exposed through the SAP Business One Service Layer (OData). It connects using the Service Layer's session-based authentication and transparently manages session cookies across requests.

## Key Features

- Manage employee master data (`EmployeesInfo`), including creating, cancelling, and closing employee records
- Maintain employee positions, roles, statuses, and employment categories
- Track employee transfers between departments and teams
- Manage teams and their memberships
- Configure HR reference data such as genders, employee ID types, and termination reasons
- Query collections with OData options such as filtering, paging, and inline count

## Actions

The connector exposes a single client for interacting with the SAP Business One Human Resources objects through the Service Layer.

| Client | Actions |
|--------|---------|
| `Client` | Employees Info, Employee Positions, Employee Roles Setup, Employee Status, Employee Transfers, Employment Categories, Employee ID Types, Employee Images, Teams, Genders, Termination Reasons |

See the **[Action Reference](action-reference.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: How to prepare an SAP Business One installation and gather the connection details required to use this connector.

* **[Action Reference](action-reference.md)**: Full reference for all clients — operations, parameters, return types, and sample code.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [SAP Business One Human Resources Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-sap.businessone)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
