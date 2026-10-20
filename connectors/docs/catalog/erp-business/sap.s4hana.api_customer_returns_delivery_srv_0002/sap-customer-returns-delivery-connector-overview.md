---
title: Overview
---

# Overview

SAP Customer Returns Delivery is an SAP S/4HANA OData V2 API (`API_CUSTOMER_RETURNS_DELIVERY_SRV_0002`) for the inbound logistics side of customer returns. A customer returns delivery is created with reference to a customer return (a returns sales document) and is used to receive the returned goods: the warehouse puts away the returned quantities and then posts the goods receipt into stock. The Ballerina `ballerinax/sap.s4hana.api_customer_returns_delivery_srv_0002` connector enables you to create, read, update and delete customer returns deliveries and their items, read their partners, addresses, document flow and serial numbers, and run the putaway and goods receipt steps directly from your Ballerina integration flows.

## Key features

- Create customer returns deliveries with reference to a customer return, including their items in a single request
- Read, update and delete customer returns delivery headers and items, such as delivery dates, weights, Incoterms, batches and delivery quantities
- Read the partners of a returns delivery (such as the sold-to and ship-to party) and their addresses
- Read the document flow of returns delivery items and the serial numbers (maintenance item objects) of returned serialized items
- Take over the delivery quantity as the putaway quantity for one or all items, set the putaway quantity in the base or sales unit, and confirm putaway
- Create batch split items when a returned item is received in more than one batch
- Post the goods receipt for a returns delivery, or reverse it
- List and filter deliveries using OData query parameters (`$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`) and free-text `search`

## Actions

Actions are operations you invoke on SAP S/4HANA from your Ballerina integration. Use these actions to create returns deliveries automatically when a return is approved in a customer service or e-commerce system, feed putaway confirmations from a warehouse management system or handheld scanner back into SAP, and post the goods receipt so returned stock and follow-on credit memo processing are up to date.

| Client | Actions |
|--------|---------|
| `Client` | Returns delivery headers, returns delivery items, partners and addresses, document flow, serial numbers, putaway, batch split items, goods receipt, batch operations |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating the SAP S/4HANA Cloud communication user, the communication system and the Delivery Processing Integration (`SAP_COM_0106`) communication arrangement, and obtaining the credentials required to use the connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **SAP Customer Returns Delivery** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [SAP S/4HANA Delivery Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-sap.s4hana.delivery)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
