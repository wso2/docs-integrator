---
connector: true
connector_name: "sap.successfactors.ecpayrolltimesheets"
title: "SAP SuccessFactors Employee Central Payroll Time Sheets"
description: "Overview of the ballerinax/sap.successfactors.ecpayrolltimesheets connector for WSO2 Integrator."
---

[SAP SuccessFactors Employee Central](https://www.sap.com/products/hcm/core-hr-payroll.html) is a comprehensive human capital management solution that helps organizations manage their workforce effectively. It provides a unified platform for HR processes including employee data management, organizational structures, and employment lifecycle management.

WSO2 SAP Successfactors Payroll Time Sheets provides a way to interact with the [SAP SuccessFactors Employee Central APIs](https://api.sap.com/package/SuccessFactorsEmployeeCentral/overview). The service allows to manage employee time sheet data, working hours, and payroll-related time information.

## Key Features

- Access payroll timesheet data and time tracking records
- Manage employee time sheets and attendance data
- Query payroll processing information and time entries

## Actions

The connector exposes a single client for all ecpayrolltimesheets operations against the SAP SuccessFactors OData v2 API.

| Client | Actions |
|--------|---------|
| `Client` | EmployeeTimeSheet, ExternalAllowance, TimeCollector, ExternalTimeRecord, ExternalTimeData, DataReplicationProxy, EmployeeTimeSheetEntry, EmployeeTimeValuationResult, AllowanceRecording, AvailableAllowanceType, and more |

See the **[Action Reference](action-reference.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: How to obtain the connection details required by the connector from your SAP SuccessFactors instance.

* **[Action Reference](action-reference.md)**: Full reference for all clients, operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **SAP SuccessFactors Employee Central Payroll Time Sheets** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [SAP SuccessFactors Employee Central Payroll Time Sheets Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-sap.successfactors.employeecentral)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
