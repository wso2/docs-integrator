---
title: Overview
---

# Overview

SAP Commerce Cloud is an enterprise e-commerce platform that provides tools for product catalog management, order processing, customer management, and storefront operations. The Ballerina `ballerinax/sap.commerce.webservices` connector (v0.9.0) provides programmatic access to SAP Commerce Cloud through the OCC v2 REST API, enabling you to integrate commerce data and operations into your Ballerina integration flows.

## Key features

- Product catalog browsing — list catalogs, catalog versions, categories, and product details
- Product search and filtering with pagination, sorting, and full-text query support
- Cart lifecycle management — create, retrieve, update carts and manage cart entries, delivery, and payment
- Order placement and order history retrieval for B2C and B2B customers
- Customer registration, profile management, and address book operations
- B2B procurement — cost centers, budgets, organizational units, and quote management
- Store locator with geo-search for finding physical points of service
- Support ticket creation, event logging, and ticket lifecycle tracking

## Actions

Actions are operations you invoke on SAP Commerce Cloud from your integration — browsing product catalogs, managing carts, placing orders, handling customer data, and more. The connector exposes all operations through a single client:

| Client | Actions |
|--------|---------|
| `Client` | Product catalog, cart management, orders, customers, B2B procurement, store locator, tickets |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through configuring your SAP Commerce Cloud instance and obtaining the OAuth 2.0 credentials required to use the connector.

* **[Action Reference](actions.md)**: Full reference for all clients — operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **SAP Commerce** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [SAP Commerce Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-sap.commerce.webservices)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
