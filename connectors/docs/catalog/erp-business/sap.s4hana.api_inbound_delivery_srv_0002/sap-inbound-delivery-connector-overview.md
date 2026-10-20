---
title: Overview
---

# Overview

SAP Inbound Delivery is an S/4HANA OData API (`API_INBOUND_DELIVERY_SRV;v=0002`) for the inbound delivery, the document that records goods a supplier has shipped against a purchase order and that drives putaway and goods receipt in the receiving plant. The Ballerina `ballerinax/sap.s4hana.api_inbound_delivery_srv_0002` connector enables you to create inbound deliveries from advance shipping notifications, read and update their headers, items, partners, texts and document flow, manage the serial numbers of delivered items, and run the putaway and goods receipt steps directly from your Ballerina integration flows.

## Key features

- Create inbound deliveries with reference to purchase order items, including items and texts, in a single deep-insert request
- Read, update and delete inbound delivery headers and items, such as delivery date, batch, manufacture date and shelf life expiration date
- Read delivery partners with their addresses, and the header and item texts of each delivery
- Read and update the document flow that links delivery items to preceding and subsequent documents
- Add or remove serial numbers on delivery items and read the serialized items assigned to them
- Put away one or all items, set or confirm putaway quantities in base or sales units, and create batch split items
- Post the goods receipt for an inbound delivery and reverse it when needed
- List and filter deliveries using OData query parameters (`$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`, `search`) and combine requests in a single `$batch` call

## Actions

Actions are operations you invoke on SAP S/4HANA from your Ballerina integration. Use these actions for turning advance shipping notifications from suppliers or logistics providers into inbound deliveries, synchronizing expected receipts with warehouse or yard management systems, recording the quantities, batches and serial numbers that were actually received, and posting the goods receipt once putaway is complete.

| Client | Actions |
|--------|---------|
| `Client` | Inbound delivery headers, items, partners and addresses, texts, document flow, serial numbers, putaway, goods receipt, batch operations |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating the SAP S/4HANA Cloud communication user, the communication system and the Delivery Processing Integration (`SAP_COM_0106`) communication arrangement, and obtaining the credentials required to use the connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **SAP Inbound Delivery** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [SAP S/4HANA Delivery Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-sap.s4hana.delivery)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
