---
title: Overview
---

# Overview

SAP Material Stock is an S/4HANA OData API (`API_MATERIAL_STOCK_SRV`) that exposes read-only material stock information, for example for consumption by external warehouse applications. The Ballerina `ballerinax/sap.s4hana.api_material_stock_srv` connector enables you to read materials with their base units of measure, stock quantities in the account model broken down by plant, storage location, batch, stock type and special stock, and the serial numbers of materials held in stock, directly from your Ballerina integration flows.

## Key features

- Read material stock quantities in the account model by material, plant, storage location and batch
- Read stock types and special stock indicators (supplier, customer, sales order and WBS element stock) for accurate availability checks
- Read the material ID and base unit of measure for one or all materials
- Read serial numbers of materials held in stock, including equipment numbers
- Navigate between materials, stock records and serial numbers using OData associations
- List and filter stock data using OData query parameters (`$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`)
- Combine multiple read requests in a single OData `$batch` call

## Actions

Actions are operations you invoke on SAP S/4HANA from your Ballerina integration. The Material Stock API is read-only, so use these actions for checking stock availability, synchronizing stock levels to warehouse or e-commerce systems, and looking up where serialized items are stored.

| Client | Actions |
|--------|---------|
| `Client` | Material stock, stock in account model, material serial numbers, batch operations |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating the SAP S/4HANA Cloud communication user, the communication system and the Material Stock Integration (`SAP_COM_0164`) communication arrangement, and obtaining the credentials required to use the connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **SAP Material Stock** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [SAP S/4HANA Inventory Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-sap.s4hana.inventory)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
