---
title: SAP Business One Banking
---

[SAP Business One](https://www.sap.com/products/erp/business-one.html) is an enterprise resource planning (ERP) solution designed for small and midsize businesses by SAP SE. The `ballerinax/sap.businessone.banking` connector exposes the banking and payments objects of SAP Business One — incoming and outgoing payments, deposits, checks, bills of exchange, bank statements, and reconciliations — through the [SAP Business One Service Layer](https://help.sap.com/doc/056f69366b5345a386bb8149f1700c19/10.0/en-US/Service%20Layer%20API%20Reference.html) (OData). It authenticates using the Service Layer session protocol and transparently manages session cookies and re-login.

## Key Features

- Create and query incoming (customer) and vendor (outgoing) payments
- Manage payment drafts and run the payment wizard objects
- Process deposits, checks for payment, and bills of exchange
- Work with bank statements, bank pages, and house bank accounts
- Perform internal and external reconciliations
- Maintain supporting master data such as banks, credit cards, and payment methods
- Cancel and approve payment documents through the approval workflow

## Actions

The connector provides a single client for interacting with all banking and payment objects of the SAP Business One Service Layer.

| Client | Actions |
|--------|---------|
| `Client` | Incoming payments, Vendor payments, Payment drafts, Payment wizard, Deposits, Checks for payment, Bills of exchange, Bank statements, Banks & house bank accounts, Credit cards, Internal & external reconciliations |

See the **[Action Reference](action-reference.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: How to prepare the SAP Business One installation and gather the credentials needed to connect to the Service Layer.

* **[Action Reference](action-reference.md)**: Full reference for all clients — operations, parameters, return types, and sample code.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [SAP Business One Banking Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-sap.businessone)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
