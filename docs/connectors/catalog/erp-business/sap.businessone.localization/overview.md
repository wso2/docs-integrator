---
title: SAP Business One Localization
---

[SAP Business One](https://www.sap.com/products/erp/business-one.html) is an enterprise resource planning (ERP) solution designed for small and midsize businesses by SAP SE. The `ballerinax/sap.businessone.localization` connector exposes the country-specific and electronic document objects of SAP Business One — electronic documents and file formats, Brazil Nota Fiscal codes, India GST data, Israel deduction documents, and more — through the [SAP Business One Service Layer](https://help.sap.com/doc/056f69366b5345a386bb8149f1700c19/10.0/en-US/Service%20Layer%20API%20Reference.html) (OData) API. Authentication uses the Service Layer session protocol, with automatic re-login when a session expires.

## Key Features

- Process electronic documents, file formats, and communication actions
- Maintain Brazil Nota Fiscal CFOP, CST, usage, CEST, and NCM code setup
- Manage Brazil beverage, fuel, string, multi, and numeric indexers
- Manage India HSN/SAC codes and e-way bill (EWB) transporters
- Handle Israel deduction (ISD) invoices, credit memos, and recipient documents
- Configure customs declarations, import/export determinations, and transportation documents
- Maintain DATEV runs, e-books, certificate series, and other statutory reporting data
- Manage self invoices, self credit memos, and fiscal printer settings

## Actions

The connector exposes a single client for all localization operations against the SAP Business One Service Layer.

| Client | Actions |
|--------|---------|
| `Client` | Electronic documents, file formats & communication; Brazil Nota Fiscal codes & indexers; India HSN/SAC codes & EWB transporters; Israel deduction documents; customs declarations & import/export determinations; DATEV runs, e-books & certificate series; self invoices & self credit memos; fiscal printer & local era settings |

See the **[Action Reference](action-reference.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: How to prepare an SAP Business One installation with the Service Layer component enabled and obtain the connection details required by the connector.

* **[Action Reference](action-reference.md)**: Full reference for all clients — operations, parameters, return types, and sample code.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [SAP Business One Localization Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-sap.businessone)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
