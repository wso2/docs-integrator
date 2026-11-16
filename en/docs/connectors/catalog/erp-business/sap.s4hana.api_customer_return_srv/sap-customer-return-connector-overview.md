---
connector: true
connector_name: "sap.s4hana.api_customer_return_srv"
title: "Overview"
description: "Create, read, update and delete returns orders with their items, partners, pricing elements, texts and related objects, and approve or reject them in SAP S/4HANA Cloud with the SAP Customer Return connector."
---

# Overview

The WSO2 **SAP Customer Return connector** provides access to every operation of the SAP S/4HANA Cloud OData API `API_CUSTOMER_RETURN_SRV` (Customer Return (A2X)), so that your integrations can manage customer returns orders without calling the service directly.

A returns order is the sales document that records the products a customer sends back and how SAP refunds or replaces them. With the connector, you can create, read, update and delete returns orders with their items, header and item partners, pricing elements, texts and related objects, read schedule lines, serial numbers and the steps and statuses of the advanced returns management process, and approve or reject returns orders.

This connector works with the returns order itself. The returns delivery that SAP creates from a returns order to receive the goods back into the warehouse is handled by the [SAP Customer Returns Delivery](../sap.s4hana.api_customer_returns_delivery_srv_0002/sap-customer-returns-delivery-connector-overview.md) connector.

## Key features

- Create returns orders with their items in a single deep insert request, with reference to the original billing document or sales order
- Read, update and delete returns order headers and items, including the return reason, refund type and follow-up activity of each item
- Create, read, update and delete header-level and item-level business partners
- Read, update and delete header-level and item-level pricing elements
- Read, update and delete header-level and item-level texts
- Create, read and delete related objects that link a returns order or item to a document in another system
- Read schedule lines and serial numbers of returns order items
- Read the advanced returns management process steps of an item and the logistical, refunding and processing statuses of a returns order
- Approve or reject a returns order that is waiting for approval
- List and filter data using OData query parameters (`$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`)
- Combine multiple requests in a single OData `$batch` call

## Actions

Actions are operations you invoke on SAP S/4HANA from your Ballerina integration. Use these actions to build returns workflows: create returns orders from a customer service portal or an e-commerce return request, keep return reasons and partners in sync with a CRM system, route returns orders to an external approval app and release or reject them, and track the advanced returns process of each item.

| Client | Actions |
|--------|---------|
| `Client` | Returns orders, items, header and item partners, header and item pricing elements, header and item texts, header and item related objects, schedule lines, serial numbers, advanced returns process steps and overview statuses, approval actions (release, reject), batch operations |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating the SAP S/4HANA Cloud communication user, the communication system and the Customer Return Integration (`SAP_COM_0157`) communication arrangement, and obtaining the credentials required to use the connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **SAP Customer Return** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [SAP S/4HANA Sales Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-sap.s4hana.sales)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
