---
connector: true
connector_name: "sap.successfactors.eccompensationinformation"
title: "SAP SuccessFactors Employee Central Compensation Information"
description: "Overview of the ballerinax/sap.successfactors.eccompensationinformation connector for WSO2 Integrator."
---

[SAP SuccessFactors Employee Central](https://www.sap.com/products/hcm/core-hr-payroll.html) is a comprehensive human capital management solution that helps organizations manage their workforce effectively. The `ballerinax/sap.successfactors.eccompensationinformation` connector provides access to Employee Central data through the SAP SuccessFactors OData v2 API. You can use APIs to access the compensation information of an employee, including salary, recurring bonuses and non-recurring compensation information. You can use these APIs to create non-recurring deductions in a payment.

## Key Features

- Access employee salary and compensation data
- Manage pay scales, grades, and compensation planning
- Query one-time deductions and recurring pay components
- Support for basic and OAuth 2.0 authentication

## Actions

The connector exposes a single client for all eccompensationinformation operations against the SAP SuccessFactors OData v2 API.

| Client | Actions |
|--------|---------|
| `Client` | OneTimeDeduction, RecurringDeductionItem, EmpCompensation, EmpPayCompRecurring, DeductionScreenId, RecurringDeduction, EmpPayCompNonRecurring, EmpCompensationGroupSumCalculated |

See the **[Action Reference](action-reference.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: How to obtain the connection details required by the connector from your SAP SuccessFactors instance.

* **[Action Reference](action-reference.md)**: Full reference for all clients — operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **SAP SuccessFactors Employee Central Compensation Information** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [SAP SuccessFactors Employee Central Compensation Information Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-sap.successfactors.employeecentral)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
