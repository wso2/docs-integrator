---
title: Overview
---

# Overview

SAP Material Document (API_MATERIAL_DOCUMENT_SRV) is an SAP S/4HANA OData (A2X) service for inventory management that records goods movements as material documents, for example, a goods receipt for a purchase order or a transfer of materials between two storage locations. The Ballerina `ballerinax/sap.s4hana.api_material_document_srv` connector enables you to post new material documents, read material document headers, items and serial numbers, and cancel complete material documents or individual items directly from your Ballerina integration flows.

## Key features

- Post goods movements such as goods receipts, goods issues and transfer postings as material documents with their items in a single deep-insert request
- List and filter material document headers and items using OData query parameters (`$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`)
- Read a single material document header or item by its document year, document number and item number
- Navigate from a header to its items, and from an item back to its header or to its serial numbers
- Read serial numbers recorded on material document items
- Cancel a complete material document or a single material document item, with an optional posting date for the reversal
- Send multiple OData operations in one call through the `$batch` endpoint

## Actions

Actions are operations you invoke on SAP S/4HANA from your Ballerina integration. Use these actions for posting goods movements from warehouse, logistics or point-of-sale systems, querying posted material documents and their items, tracing serial numbers, and reversing incorrect postings.

| Client | Actions |
|--------|---------|
| `Client` | Material document headers, material document items, serial numbers, cancellation, batch requests |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating the SAP S/4HANA Cloud communication user, the communication system and the Material Document Integration (`SAP_COM_0108`) communication arrangement required to use the connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **SAP Material Document** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [SAP S/4HANA Inventory Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-sap.s4hana.inventory)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
