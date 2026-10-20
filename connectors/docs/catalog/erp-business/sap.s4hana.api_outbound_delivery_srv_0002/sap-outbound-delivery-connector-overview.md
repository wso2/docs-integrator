---
title: Overview
---

# Overview

SAP Outbound Delivery is an SAP S/4HANA OData V2 API (`API_OUTBOUND_DELIVERY_SRV;v=0002`) for the outbound delivery, the shipping document that controls picking, packing and the goods issue of materials sent to a customer, typically created with reference to a sales order. The Ballerina `ballerinax/sap.s4hana.api_outbound_delivery_srv_0002` connector enables you to create, read, update and delete outbound deliveries with their items, partners, addresses, texts and document flow, manage handling units and serial numbers, and pick items and post or reverse the goods issue directly from your Ballerina integration flows.

## Key features

- Create outbound deliveries with reference to a preceding document such as a sales order, and read, update or delete delivery headers and items
- Pick all items or a single item, set the picked or delivery quantity in the base or sales unit, and confirm picking
- Split delivery items into batches, with or without setting the picked quantity in the same step
- Post the goods issue for a delivery, or reverse it with an actual goods movement date
- Create handling units and handling unit items, assign handling units to a delivery, or remove all of them
- Add or remove the serial numbers of a delivery item, and read its serial number list
- Maintain delivery header and item texts, read delivery partners and update the ship-to or other partner addresses
- List and filter deliveries using OData query parameters (`$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`, `search`), and combine requests in a single `$batch` call

## Actions

Actions are operations you invoke on SAP S/4HANA from your Ballerina integration. Use these actions to create deliveries for released sales orders, receive picking and packing confirmations from a warehouse or logistics provider, post the goods issue when the shipment leaves, and keep carriers and customers informed with delivery data, addresses and handling units.

| Client | Actions |
|--------|---------|
| `Client` | Outbound deliveries, delivery items, header and item texts, partners and addresses, document flow, handling units, serial numbers, picking, goods issue, batch operations |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating the SAP S/4HANA Cloud communication user, the communication system and the Delivery Processing Integration (`SAP_COM_0106`) communication arrangement, and obtaining the credentials required to use the connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **SAP Outbound Delivery** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [SAP S/4HANA Delivery Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-sap.s4hana.delivery)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
