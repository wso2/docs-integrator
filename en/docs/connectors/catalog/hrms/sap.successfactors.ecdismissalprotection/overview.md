---
connector: true
connector_name: "sap.successfactors.ecdismissalprotection"
title: "SAP SuccessFactors Employee Central Dismissal Protection"
description: "Overview of the ballerinax/sap.successfactors.ecdismissalprotection connector for WSO2 Integrator."
---

[SAP SuccessFactors Employee Central](https://www.sap.com/products/hcm/core-hr-payroll.html) is a comprehensive human capital management solution that helps organizations manage their workforce effectively. It provides a unified platform for HR processes including employee data management, organizational structures, and employment lifecycle management.

The `ballerinax/sap.successfactors.ecdismissalprotection` package provides APIs that enable seamless integration with the [SAP SuccessFactors Dismissal Protection API v1.0](https://help.sap.com/docs/SAP_SUCCESSFACTORS_PLATFORM/d599f15995d348a1b45ba5603e2aba9b/c508d8543026442d88457f3654b4e91d.html). The service allows to manage dismissal protection information for employees, ensuring compliance with labor laws and regulations.

## Key Features

- Manage dismissal protection records and legal compliance
- Track termination documentation and regulatory requirements
- Query protection details and compliance status
- Support for basic and OAuth 2.0 authentication

## Actions

The connector exposes a single client for all ecdismissalprotection operations against the SAP SuccessFactors OData v2 API.

| Client | Actions |
|--------|---------|
| `Client` | EmployeeDismissalProtectionDetail, EmployeeDismissalProtection |

See the **[Action Reference](action-reference.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: How to obtain the connection details required by the connector from your SAP SuccessFactors instance.

* **[Action Reference](action-reference.md)**: Full reference for all clients — operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **SAP SuccessFactors Employee Central Dismissal Protection** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [SAP SuccessFactors Employee Central Dismissal Protection Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-sap.successfactors.employeecentral)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
