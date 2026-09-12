---
connector: true
connector_name: "sap.successfactors.ecapprenticemanagement"
title: "SAP SuccessFactors Employee Central Apprentice Management"
description: "Overview of the ballerinax/sap.successfactors.ecapprenticemanagement connector for WSO2 Integrator."
---

[SAP SuccessFactors Employee Central](https://www.sap.com/products/hcm/core-hr-payroll.html) is a comprehensive human capital management solution that helps organizations manage their workforce effectively. The `ballerinax/sap.successfactors.ecapprenticemanagement` connector provides access to Employee Central data through the SAP SuccessFactors OData v2 API. API to access apprentice management related data.

## Key Features

- Manage apprentice program registrations and tracking
- Configure apprentice event types and program definitions
- Query apprentice progress and training records
- Support for basic and OAuth 2.0 authentication

## Actions

The connector exposes a single client for all ecapprenticemanagement operations against the SAP SuccessFactors OData v2 API.

| Client | Actions |
|--------|---------|
| `Client` | ApprenticeEventType, DepartmentApprenticeDetail, ApprenticeSchool, ApprenticeGroup, ApprenticeSchoolEvent, ApprenticePracticalTrainingEvent, ApprenticeInternalTrainingEvent, Apprentice |

See the **[Action Reference](action-reference.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: How to obtain the connection details required by the connector from your SAP SuccessFactors instance.

* **[Action Reference](action-reference.md)**: Full reference for all clients — operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **SAP SuccessFactors Employee Central Apprentice Management** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [SAP SuccessFactors Employee Central Apprentice Management Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-sap.successfactors.employeecentral)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
