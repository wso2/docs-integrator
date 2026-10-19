---
title: Overview
---

# Overview

SAP S/4HANA Sales Order Analytics is an OData v4 API connector that provides programmatic access to sales order data in SAP S/4HANA Cloud. The Ballerina `ballerinax/sap.s4hana.ce_salesorder_0001` connector (v1.0.0) enables full lifecycle management of sales orders, items, partners, pricing elements, schedule lines, and texts, allowing you to integrate SAP sales order operations into your Ballerina integration flows.

## Key features

- Full CRUD operations on sales orders including creation, retrieval, update, and deletion via OData v4
- Sales order item management with support for deep insert of items, partners, and pricing elements in a single request
- Partner function management at both order header and item level (sold-to, ship-to, bill-to parties)
- Pricing element management for condition types, rates, and amounts at order header and item level
- Schedule line management for planned delivery quantities and dates on sales order items
- Text management for long-text descriptions at order header and item level in multiple languages
- OData v4 query options including `$filter`, `$orderby`, `$top`, `$skip`, `$select`, and `$expand`
- Batch operation support for executing multiple OData requests in a single HTTP call

## Actions

Actions are operations you invoke on SAP S/4HANA from your integration. Use these actions for creating sales orders, retrieving order details, updating items, and managing related entities such as partners, pricing conditions, schedule lines, and texts. The connector exposes a single client for all SAP Sales Order API operations.

| Client | Actions |
|--------|---------|
| `Client` | Sales order CRUD, item management, partner management, pricing elements, schedule lines, texts, batch operations |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through configuring SAP S/4HANA Cloud to expose the Sales Order Integration API and obtaining the credentials required to use the connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **SAP Sales Order Analytics** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [SAP Sales Order Analytics Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-sap.s4hana.ce_salesorder_0001)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
