---
title: SAP Business One Fixed Assets
---

[SAP Business One](https://www.sap.com/products/erp/business-one.html) is an enterprise resource planning (ERP) solution for small and midsize businesses by SAP SE. The `ballerinax/sap.businessone.fixedassets` connector provides access to the fixed asset objects of SAP Business One — asset master data, capitalization, retirement, transfers, and depreciation configuration — through the [SAP Business One Service Layer](https://help.sap.com/doc/056f69366b5345a386bb8149f1700c19/10.0/en-US/Service%20Layer%20API%20Reference.html) (OData). It uses the Service Layer's session-based authentication and transparently re-establishes the session when it expires.

## Key Features

- Manage asset master data, asset classes, and asset groups
- Post and cancel capitalization documents, including capitalization credit memos
- Run asset retirement and asset transfer documents
- Record manual depreciation and asset revaluations
- Configure depreciation types, depreciation areas, and depreciation type pools
- Maintain fixed asset account determinations
- Query and update fixed asset item end balances and asset value lists

## Actions

The connector exposes a single client for interacting with all fixed asset objects of the SAP Business One Service Layer.

| Client | Actions |
|--------|---------|
| `Client` | Asset capitalization, capitalization credit memos, manual depreciation, retirement, transfer, revaluations, asset classes, asset groups, depreciation types, depreciation areas, depreciation type pools, FA account determinations, fixed asset item balances |

See the **[Action Reference](action-reference.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: How to prepare an SAP Business One installation with the Service Layer and obtain the connection credentials.

* **[Action Reference](action-reference.md)**: Full reference for all clients — operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **SAP Business One Fixed Assets** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [SAP Business One Fixed Assets Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-sap.businessone)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
