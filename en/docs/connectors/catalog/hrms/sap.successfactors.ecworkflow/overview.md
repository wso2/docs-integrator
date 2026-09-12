---
connector: true
connector_name: "sap.successfactors.ecworkflow"
title: "SAP SuccessFactors Employee Central Workflow"
description: "Overview of the ballerinax/sap.successfactors.ecworkflow connector for WSO2 Integrator."
---

[SAP SuccessFactors Employee Central](https://www.sap.com/products/hcm/core-hr-payroll.html) is a comprehensive human capital management solution that helps organizations manage their workforce effectively. The `ballerinax/sap.successfactors.ecworkflow` connector provides access to Employee Central data through the SAP SuccessFactors OData v2 API. You can use these APIs to access data of employees workflow requests and and other workflow data such as current status.

## Key Features

- Manage workflow processes including approval workflows
- Access pending workflow items and workflow notifications
- Query workflow history and process automation records
- Support for basic and OAuth 2.0 authentication

## Actions

The connector exposes a single client for all ecworkflow operations against the SAP SuccessFactors OData v2 API.

| Client | Actions |
|--------|---------|
| `Client` | MyPendingWorkflow, WfRequestParticipator, WorkflowAllowedActionList, AlertMessage, WfRequestComments, WfRequestStep, AutoDelegateDetail, AutoDelegateConfig, EmpWfRequest, WfRequest, and more |

See the **[Action Reference](action-reference.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: How to obtain the connection details required by the connector from your SAP SuccessFactors instance.

* **[Action Reference](action-reference.md)**: Full reference for all clients — operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **SAP SuccessFactors Employee Central Workflow** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [SAP SuccessFactors Employee Central Workflow Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-sap.successfactors.employeecentral)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
