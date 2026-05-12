---
title: Overview
---

# Overview

SAP Sales Order is an S/4HANA OData (A2X) API that provides programmatic access to sales order processing, covering the full lifecycle from order creation to delivery and billing. The Ballerina `ballerinax/sap.s4hana.api_sales_order_srv` connector enables you to create, read, update, and delete sales orders, line items, billing plans, schedule lines, pricing elements, partners, and related documents directly from your Ballerina integration flows.

## Key features

- Full CRUD operations on SAP Sales Orders and all sub-entities (items, partners, pricing elements, texts)
- List and filter sales orders using OData query parameters (`$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`)
- Manage sales order line items including quantity, material, and plant assignments
- Billing plan management for header and item-level billing schedules
- Schedule line operations for delivery date and quantity planning per order item
- Partner function management (sold-to, ship-to, bill-to) at header and item level
- Pricing element access and maintenance for header and item pricing conditions
- Process flow navigation to retrieve preceding and subsequent document relationships

## Actions

Actions are operations you invoke on SAP S/4HANA from your Ballerina integration. Use these actions for listing and filtering sales orders, creating new orders from external system events, updating order attributes, and managing sub-entities such as items, billing plans, and schedule lines.

| Client | Actions |
|--------|---------|
| `Client` | Sales order CRUD, item management, billing plans, schedule lines, partners, pricing elements, texts, related objects, process flow |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through configuring SAP S/4HANA Communication Management to expose the Sales Order (A2X) API and obtaining the credentials required to use the connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [SAP Sales Order Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-sap.s4hana.sales)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
