---
connector: true
connector_name: "sap.successfactors.ecpaymentinformation"
title: "SAP SuccessFactors Employee Central Payment Information"
description: "Overview of the ballerinax/sap.successfactors.ecpaymentinformation connector for WSO2 Integrator."
---

[SAP SuccessFactors Employee Central](https://www.sap.com/products/hcm/core-hr-payroll.html) is a comprehensive human capital management solution that helps organizations manage their workforce effectively. It provides a unified platform for HR processes including employee data management, organizational structures, and employment lifecycle management.

The `ballerinax/sap.successfactors.ecpaymentinformation` package provides APIs to interact with the SAP SuccessFactors Employee Central Payment Information API.

## Key Features

- Manage employee payment information and bank accounts
- Configure payment methods and direct deposit details
- Query payment information across multiple regions
- Support for basic and OAuth 2.0 authentication

## Actions

The connector exposes a single client for all ecpaymentinformation operations against the SAP SuccessFactors OData v2 API.

| Client | Actions |
|--------|---------|
| `Client` | PaymentInformationDetailV3KEN, PaymentInformationDetailV3ISR, PaymentInformationDetailV3, PaymentInformationDetailV3ARG, PaymentMethodV3, Bank, CustomPayTypeAssignment, CustomPayType, PaymentInformationDetailV3NGA, PaymentInformationDetailV3CZE, and more |

See the **[Action Reference](action-reference.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: How to obtain the connection details required by the connector from your SAP SuccessFactors instance.

* **[Action Reference](action-reference.md)**: Full reference for all clients, operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **SAP SuccessFactors Employee Central Payment Information** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [SAP SuccessFactors Employee Central Payment Information Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-sap.successfactors.employeecentral)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
