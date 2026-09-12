---
connector: true
connector_name: "sap.successfactors.ecemployeeprofile"
title: "SAP SuccessFactors Employee Central Employee Profile"
description: "Overview of the ballerinax/sap.successfactors.ecemployeeprofile connector for WSO2 Integrator."
---

[SAP SuccessFactors Employee Central](https://www.sap.com/products/hcm/core-hr-payroll.html) is a comprehensive human capital management solution that helps organizations manage their workforce effectively. The `ballerinax/sap.successfactors.ecemployeeprofile` connector provides access to Employee Central data through the SAP SuccessFactors OData v2 API. You can use these APIs to maintain the general background information of an employee, including education and outside work experiences.

## Key Features

- Manage employee profile information including personal details
- Access education background and work experience records
- Query background information across multiple categories
- Support for basic and OAuth 2.0 authentication

## Actions

The connector exposes a single client for all ecemployeeprofile operations against the SAP SuccessFactors OData v2 API.

| Client | Actions |
|--------|---------|
| `Client` | Background_Community, Background_Courses, Background_Benefitselection, Background_OutsideWorkExperience, Background_Promotability, Background_Fsaelection, Background_Compensation, Background_Memberships, Background_Documents, Background_FuncExperience, and more |

See the **[Action Reference](action-reference.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: How to obtain the connection details required by the connector from your SAP SuccessFactors instance.

* **[Action Reference](action-reference.md)**: Full reference for all clients — operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **SAP SuccessFactors Employee Central Employee Profile** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [SAP SuccessFactors Employee Central Employee Profile Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-sap.successfactors.employeecentral)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
