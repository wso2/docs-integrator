---
connector: true
connector_name: "sap.successfactors.ecapprenticemanagement"
title: "SAP SuccessFactors Employee Central Apprentice Management"
description: "Overview of the ballerinax/sap.successfactors.ecapprenticemanagement connector for WSO2 Integrator."
---

[SAP SuccessFactors Employee Central](https://www.sap.com/products/hcm/core-hr-payroll.html) is a comprehensive human capital management solution that helps organizations manage their workforce effectively. It provides a unified platform for HR processes including employee data management, organizational structures, and employment lifecycle management.

The `ballerinax/sap.successfactors.ecapprenticemanagement` package provides APIs that enable seamless integration with the [SAP SuccessFactors Apprentice Management API v1.0](https://help.sap.com/docs/SAP_SUCCESSFACTORS_PLATFORM/d599f15995d348a1b45ba5603e2aba9b/c508d8543026442d88457f3654b4e91d.html). The service allows to manage apprenticeship programs, track apprentice progress, and maintain apprentice-related information.

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

* **[Action Reference](action-reference.md)**: Full reference for all clients, operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **SAP SuccessFactors Employee Central Apprentice Management** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [SAP SuccessFactors Employee Central Apprentice Management Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-sap.successfactors.employeecentral)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
