---
title: SAP Business One Sales
---

[SAP Business One](https://www.sap.com/products/erp/business-one.html) is an enterprise resource planning (ERP) solution designed for small and midsize businesses by SAP SE. The `ballerinax/sap.businessone.sales` connector exposes the sales (A/R) documents of SAP Business One — quotations, orders, deliveries, returns, invoices, credit memos, and dunning — through the [SAP Business One Service Layer](https://help.sap.com/doc/056f69366b5345a386bb8149f1700c19/10.0/en-US/Service%20Layer%20API%20Reference.html) (OData) API. Authentication uses the Service Layer session protocol, with automatic re-login when a session expires.

## Key Features

- Create, read, update, close, and cancel sales documents across the full A/R cycle
- Manage sales quotations, orders, and delivery notes
- Process A/R invoices, credit notes, down payments, and drafts
- Handle sales returns, return requests, and correction invoices
- Manage blanket agreements and sales tax invoices
- Work with dunning terms, dunning letters, and POS daily summaries
- Maintain sales persons and commission groups

## Actions

The connector exposes a single client for all sales (A/R) operations against the SAP Business One Service Layer.

| Client | Actions |
|--------|---------|
| `Client` | Quotations, orders & delivery notes; A/R invoices, credit notes & down payments; returns, return requests & correction invoices; drafts & blanket agreements; sales tax invoices & POS daily summaries; dunning terms & letters; sales persons & commission groups |

See the **[Action Reference](action-reference.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: How to prepare an SAP Business One installation with the Service Layer component enabled and obtain the connection details required by the connector.

* **[Action Reference](action-reference.md)**: Full reference for all clients — operations, parameters, return types, and sample code.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [SAP Business One Sales Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-sap.businessone)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
