---
title: SAP SuccessFactors Employee Central Global Assignment
---

[SAP SuccessFactors Employee Central](https://www.sap.com/products/hcm/core-hr-payroll.html) is a comprehensive human capital management solution that helps organizations manage their workforce effectively. It provides a unified platform for HR processes including employee data management, organizational structures, and employment lifecycle management.

WSO2 SAP Successfactors Global Assignment provides a way to interact with the [SAP SuccessFactors Employee Central APIs](https://api.sap.com/package/SuccessFactorsEmployeeCentral/overview).

## Key Features

- Manage global assignment data for internationally mobile employees
- Track assignment details and right-to-return records
- Query secondary assignment items and global assignment history

## Actions

The connector exposes a single client for all ecglobalassignment operations against the SAP SuccessFactors OData v2 API.

| Client | Actions |
|--------|---------|
| `Client` | SecondaryAssignmentsItem, SecondaryAssignments, RightToReturn, EmpGlobalAssignment |

See the **[Action Reference](action-reference.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: How to obtain the connection details required by the connector from your SAP SuccessFactors instance.

* **[Action Reference](action-reference.md)**: Full reference for all clients, operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **SAP SuccessFactors Employee Central Global Assignment** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [SAP SuccessFactors Employee Central Global Assignment Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-sap.successfactors.employeecentral)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
