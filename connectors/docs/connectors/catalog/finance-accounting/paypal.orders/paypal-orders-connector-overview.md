---
title: Overview
---

# Overview

PayPal Orders API enables you to create, update, retrieve, authorize, and capture payment orders between parties. The Ballerina `ballerinax/paypal.orders` connector (v2.0.1) provides programmatic access to the PayPal Orders v2 API, allowing you to manage the full order lifecycle from creation through payment capture, and track shipments within your Ballerina integration flows.

## Key features

- Create orders with CAPTURE or AUTHORIZE payment intent and detailed purchase unit breakdowns
- Retrieve order details by ID with optional payment source filtering
- Update orders via JSON Patch operations (add, replace, remove fields)
- Confirm payment source before authorization or capture
- Authorize payments on approved orders for later capture
- Capture authorized payments to complete the transaction
- Add shipment tracking information with carrier and tracking number
- Update shipment tracking status for existing trackers

## Actions

Actions are operations you invoke on PayPal from your integration. Use these actions for creating orders, capturing payments, managing tracking, and more. The PayPal Orders connector exposes all actions through a single client:

| Client | Actions |
|--------|---------|
| `Client` | Order creation, retrieval, update, payment authorization, capture, and shipment tracking |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating a PayPal REST API application and obtaining the OAuth 2.0 client credentials required to use the PayPal Orders connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **PayPal Orders** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [PayPal Orders Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-paypal.orders)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
