---
title: SAP Business One Purchasing
---

[SAP Business One](https://www.sap.com/products/erp/business-one.html) is an enterprise resource planning (ERP) solution designed for small and midsize businesses by SAP SE. The `ballerinax/sap.businessone.purchasing` connector exposes the purchasing (A/P) documents of SAP Business One — purchase requests, quotations, orders, goods receipts, returns, invoices, and landed costs — through the [SAP Business One Service Layer](https://help.sap.com/doc/056f69366b5345a386bb8149f1700c19/10.0/en-US/Service%20Layer%20API%20Reference.html) (OData) API. Authentication uses the Service Layer session protocol, with automatic re-login when a session expires.

## Key Features

- Create, read, update, close, and cancel purchasing documents across the full A/P cycle
- Raise purchase requests and purchase quotations
- Manage purchase orders and goods receipt POs (purchase delivery notes)
- Process A/P invoices, credit notes, and down payments
- Handle purchase returns, goods return requests, and correction invoices
- Manage landed costs and landed cost codes for import postings
- Work with purchase tax invoices

## Actions

The connector exposes a single client for all purchasing (A/P) operations against the SAP Business One Service Layer.

| Client | Actions |
|--------|---------|
| `Client` | Purchase requests & quotations; purchase orders & delivery notes; A/P invoices, credit notes & down payments; purchase returns & goods return requests; correction purchase invoices & reversals; landed costs & landed cost codes; purchase tax invoices |

See the **[Action Reference](action-reference.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: How to prepare an SAP Business One installation with the Service Layer component enabled and obtain the connection details required by the connector.

* **[Action Reference](action-reference.md)**: Full reference for all clients — operations, parameters, return types, and sample code.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [SAP Business One Purchasing Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-sap.businessone)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
