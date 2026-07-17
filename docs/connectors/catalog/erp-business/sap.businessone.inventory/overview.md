---
title: SAP Business One Inventory
---

[SAP Business One](https://www.sap.com/products/erp/business-one.html) is an enterprise resource planning (ERP) solution designed for small and midsize businesses by SAP SE. The `ballerinax/sap.businessone.inventory` connector exposes the inventory objects of SAP Business One — items, warehouses, price lists, stock transactions, batches, serials, and bin locations — through the [SAP Business One Service Layer](https://help.sap.com/doc/056f69366b5345a386bb8149f1700c19/10.0/en-US/Service%20Layer%20API%20Reference.html) (OData) API. Authentication uses the Service Layer session protocol, with automatic re-login when a session expires.

## Key Features

- Manage item master data, item groups, properties, and images
- Post goods receipts, goods issues, stock transfers, and inventory postings
- Run inventory countings, opening balances, and their drafts
- Maintain price lists, special prices, and enhanced discount groups
- Track batch numbers, serial numbers, and bar codes
- Administer warehouses, warehouse locations, sublevel codes, and bin locations
- Configure units of measurement, weight/length measures, and packages types
- Work with pick lists, material revaluations, and cycle count determinations

## Actions

The connector exposes a single client for all inventory operations against the SAP Business One Service Layer.

| Client | Actions |
|--------|---------|
| `Client` | Items, item groups & properties; goods receipts, goods issues & inventory postings; stock transfers, transfer requests & drafts; inventory countings, opening balances & cycle counts; price lists, special prices & discount groups; batches, serials & bar codes; warehouses, locations & bin locations; units of measurement, measures & packages types; pick lists & material revaluations |

See the **[Action Reference](action-reference.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: How to prepare an SAP Business One installation with the Service Layer component enabled and obtain the connection details required by the connector.

* **[Action Reference](action-reference.md)**: Full reference for all clients — operations, parameters, return types, and sample code.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [SAP Business One Inventory Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-sap.businessone)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
