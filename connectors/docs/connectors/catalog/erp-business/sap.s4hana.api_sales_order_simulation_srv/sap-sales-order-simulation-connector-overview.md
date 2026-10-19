---
title: Overview
---

# Overview

SAP S/4HANA is an enterprise resource planning suite covering sales, finance, procurement, and logistics. The Ballerina `ballerinax/sap.s4hana.api_sales_order_simulation_srv` connector provides programmatic access to the SAP S/4HANA Sales Order Simulation API, enabling you to retrieve pricing details, material availability, and customer credit limit information for a proposed sales order synchronously without persisting the order to the SAP system.

## Key features

- Simulate sales order creation synchronously to obtain pricing, availability, and credit data without saving the order
- Retrieve total net amount and per-condition pricing elements at both header and item level
- Check material availability with confirmed delivery dates and quantities via schedule line simulation
- Validate customer credit limit status as part of the simulation response
- Include sales order partners (sold-to, ship-to, bill-to) and item partners in the simulation payload
- Manage value-added services (packaging, insurance, etc.) linked to simulated sales order items
- Support for Basic credentials, Bearer token, and OAuth 2.0 refresh token authentication
- OData batch request support for executing multiple operations in a single HTTP call

## Actions

Actions are operations you invoke on SAP S/4HANA from your integration. Use these actions for simulating sales order creation to validate pricing and availability, and managing value-added services. The SAP Sales Order Simulation connector exposes actions through a single client:

| Client | Actions |
|--------|---------|
| `Client` | Sales order simulation, value-added service CRUD, OData batch operations |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through configuring an SAP S/4HANA Communication Arrangement to expose the Sales Order Simulation API and obtaining the credentials required by the connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **SAP Sales Order Simulation** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [SAP Sales Order Simulation Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-sap.s4hana.api_sales_order_simulation_srv)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
