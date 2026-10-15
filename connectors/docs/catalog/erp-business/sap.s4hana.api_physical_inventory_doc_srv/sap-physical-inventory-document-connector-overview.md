---
title: Overview
---

# Overview

SAP Physical Inventory Document is an SAP S/4HANA OData (A2X) API, `API_PHYSICAL_INVENTORY_DOC_SRV`, that provides programmatic access to physical inventory documents used to plan and record stock counts. The Ballerina `ballerinax/sap.s4hana.api_physical_inventory_doc_srv` connector enables you to create physical inventory documents, read document headers, items and serial numbers, enter count results, initiate recounts and post inventory differences directly from your Ballerina integration flows.

## Key features

- Create physical inventory documents with their items to plan stock counts for a plant and storage location
- Read physical inventory document headers and items, individually or as filtered lists
- List and filter documents using OData query parameters (`$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`)
- Navigate between a document header and its items, and from an item back to its header
- Enter count results by updating quantities and count flags on physical inventory document items
- Read and maintain the serial numbers counted on physical inventory document items
- Initiate recounts at document or item level and post inventory differences as material documents
- Send several requests in one call through the OData `$batch` endpoint

## Actions

Actions are operations you invoke on SAP S/4HANA from your Ballerina integration. Use these actions to create physical inventory documents from warehouse or cycle count events, read documents and items for reconciliation, record counted quantities and serial numbers, and post the resulting differences.

| Client | Actions |
|--------|---------|
| `Client` | Physical inventory document headers, items, serial numbers, count entry, recounts, posting of differences, batch requests |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating the SAP S/4HANA Cloud communication user, the communication system and the Physical Inventory Document Integration (`SAP_COM_0107`) communication arrangement that the connector needs.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **SAP Physical Inventory Document** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [SAP S/4HANA Inventory Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-sap.s4hana.inventory)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
