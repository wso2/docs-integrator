---
title: Overview
---

# Overview

The WSO2 **SAP Product Master connector** provides access to every operation of the SAP S/4HANA Cloud OData API `API_PRODUCT_SRV` (Product Master (A2X)), so that your integrations can maintain product master data without calling the service directly.

SAP documents this API under APIs for Master Data Maintenance, because the product master is shared by sales, procurement, inventory, production and accounting. With the connector, you can create, read and update products with their general data, descriptions, texts and units of measure, together with the organizational data that each plant, sales organization and valuation area uses.

## Key features

- Create, read and update products with their general data, such as product type, product group, base unit, weights and dimensions, and mark them for deletion
- Maintain product descriptions and basic data, purchase order, inspection, plant and sales texts in multiple languages
- Manage units of measure and their global trade item numbers (GTINs)
- Maintain plant data, including MRP area, supply planning, procurement, work scheduling, storage, sales, costing, forecasting, international trade and quality management settings
- Manage storage location data, sales organization data and sales tax classifications
- Delete descriptions, texts, units of measure, GTINs and sales tax classifications that are no longer needed
- Maintain valuation, valuation account, costing and material ledger price data for each valuation area
- Create a product together with its organizational data in a single deep insert request
- List and filter data using OData query parameters (`$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`)
- Combine multiple requests in a single OData `$batch` call

## Actions

Actions are operations you invoke on SAP S/4HANA from your Ballerina integration. Use these actions to keep the product master in sync with other systems: create products from a product lifecycle management or e-commerce system, extend existing products to new plants and sales organizations, and feed product data into catalogs, reports and data warehouses.

| Client | Actions |
|--------|---------|
| `Client` | Products, descriptions and texts, units of measure and GTINs, plant data, storage locations, sales organization and sales tax data, valuation and material ledger data, batch operations |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating the SAP S/4HANA Cloud communication user, the communication system and the Product Integration (`SAP_COM_0009`) communication arrangement, and obtaining the credentials required to use the connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **SAP Product Master** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [SAP S/4HANA Master Data Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-sap.s4hana.masterdata)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
