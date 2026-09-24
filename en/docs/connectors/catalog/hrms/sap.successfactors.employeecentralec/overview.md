---
connector: true
connector_name: "sap.successfactors.employeecentralec"
title: "SAP SuccessFactors Employee Central Core"
description: "Overview of the ballerinax/sap.successfactors.employeecentralec connector for WSO2 Integrator."
---

[SAP SuccessFactors Employee Central](https://www.sap.com/products/hcm/core-hr-payroll.html) is a comprehensive human capital management solution that helps organizations manage their workforce effectively. It provides a unified platform for HR processes including employee data management, organizational structures, and employment lifecycle management.

WSO2 SAP Successfactors Employee Central Core provides a way to interact with the [SAP SuccessFactors Employee Central APIs](https://api.sap.com/package/SuccessFactorsEmployeeCentral/overview). The service provides comprehensive access to core employee central functionalities and global employee information.

## Key Features

- Comprehensive Employee Central APIs for employee data management
- Access organizational structure and position information
- Query global employee information across multiple regions (e.g. Argentina, Brazil, China, Switzerland, the UK)

## Actions

The connector exposes a single client for all employeecentralec operations against the SAP SuccessFactors OData v2 API.

| Client | Actions |
|--------|---------|
| `Client` | PerGlobalInfoARE, PerGlobalInfoCHN, PerGlobalInfoFIN, EducationDegreeContent, CurrencyExchangeRate, NonRecurringPayment, EducationDegreeEntity, ServiceDeskContactSupportInformation, PerGlobalInfoBRA, PerGlobalInfoCHE, and more |

See the **[Action Reference](action-reference.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: How to obtain the connection details required by the connector from your SAP SuccessFactors instance.

* **[Action Reference](action-reference.md)**: Full reference for all clients, operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **SAP SuccessFactors Employee Central Core** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [SAP SuccessFactors Employee Central Core Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-sap.successfactors.employeecentral)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
