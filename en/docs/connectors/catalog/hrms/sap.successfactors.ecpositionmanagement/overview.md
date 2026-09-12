---
connector: true
connector_name: "sap.successfactors.ecpositionmanagement"
title: "SAP SuccessFactors Employee Central Position Management"
description: "Overview of the ballerinax/sap.successfactors.ecpositionmanagement connector for WSO2 Integrator."
---

[SAP SuccessFactors Employee Central](https://www.sap.com/products/hcm/core-hr-payroll.html) is a comprehensive human capital management solution that helps organizations manage their workforce effectively. The `ballerinax/sap.successfactors.ecpositionmanagement` connector provides access to Employee Central data through the SAP SuccessFactors OData v2 API. You can use these APIs for maintain the information about employees position management.

## Key Features

- Manage position creation and hierarchy in organizational structures
- Configure position requisition workflows and approval status
- Query position relationships and organizational reporting lines
- Support for basic and OAuth 2.0 authentication

## Actions

The connector exposes a single client for all ecpositionmanagement operations against the SAP SuccessFactors OData v2 API.

| Client | Actions |
|--------|---------|
| `Client` | PositionRequisitionStatus, PositionMatrixRelationship, Position, getPositionObjectData, PositionRightToReturn |

See the **[Action Reference](action-reference.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: How to obtain the connection details required by the connector from your SAP SuccessFactors instance.

* **[Action Reference](action-reference.md)**: Full reference for all clients — operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **SAP SuccessFactors Employee Central Position Management** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [SAP SuccessFactors Employee Central Position Management Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-sap.successfactors.employeecentral)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
