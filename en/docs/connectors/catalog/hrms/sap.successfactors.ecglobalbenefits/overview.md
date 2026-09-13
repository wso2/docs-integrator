---
connector: true
connector_name: "sap.successfactors.ecglobalbenefits"
title: "SAP SuccessFactors Employee Central Global Benefits"
description: "Overview of the ballerinax/sap.successfactors.ecglobalbenefits connector for WSO2 Integrator."
---

[SAP SuccessFactors Employee Central](https://www.sap.com/products/hcm/core-hr-payroll.html) is a comprehensive human capital management solution that helps organizations manage their workforce effectively. It provides a unified platform for HR processes including employee data management, organizational structures, and employment lifecycle management.

The `ballerinax/sap.successfactors.ecglobalbenefits` package provides APIs to interact with the SAP SuccessFactors Employee Central Global Benefits API.

## Key Features

- Manage comprehensive employee benefits including insurance and savings plans
- Access pension funds, company cars, and benefit enrollments
- Query benefit employee claims and eligibility records
- Support for basic and OAuth 2.0 authentication

## Actions

The connector exposes a single client for all ecglobalbenefits operations against the SAP SuccessFactors OData v2 API.

| Client | Actions |
|--------|---------|
| `Client` | BenefitEmployeeClaim, BenefitSavingsPlanSubType, BenefitInsurancePlan, BenefitBalanceCarryForwardDetail, EmployeeWithEmployerMatchContributions, BenefitProgramEnrollment, EmployeeWithEmployerMatchContributionEntries, BenefitInsuranceCoverage, BenefitProgram, BenefitCompanyCarLeaseServiceProvider, and more |

See the **[Action Reference](action-reference.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: How to obtain the connection details required by the connector from your SAP SuccessFactors instance.

* **[Action Reference](action-reference.md)**: Full reference for all clients — operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **SAP SuccessFactors Employee Central Global Benefits** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [SAP SuccessFactors Employee Central Global Benefits Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-sap.successfactors.employeecentral)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
