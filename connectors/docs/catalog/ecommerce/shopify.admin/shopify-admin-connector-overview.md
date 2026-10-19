---
title: Overview
---

# Overview

Shopify is a leading e-commerce platform that enables users to create, manage, and grow their online stores. The Ballerina `ballerinax/shopify.admin` connector (v2.5.0) provides programmatic access to the Shopify Admin REST API (v2021-10), enabling you to manage products, orders, customers, fulfillments, webhooks, and other essential e-commerce resources from your Ballerina integration flows.

## Key features

- Full CRUD operations on customers: list, create, retrieve, update, and search
- Product and product variant management: create, list, update, and retrieve products and their variants
- Order lifecycle management: create, retrieve, update, and list orders with rich filtering options
- Draft order creation for manual or deferred order workflows
- Fulfillment creation and retrieval for order line items
- Transaction and refund creation for order payment processing
- Order risk assessment: create, retrieve, update, and list fraud risk evaluations
- Webhook subscription management: create, list, update, retrieve, and count webhook subscriptions
- Event-driven webhook handling for order, customer, product, and fulfillment events

## Actions

Actions are operations you invoke on Shopify from your integration, including managing customers, creating products, processing orders, and more. The Shopify Admin connector exposes all actions through a single client:

| Client | Actions |
|--------|---------|
| `Client` | Customer CRUD & search, product & variant CRUD, order lifecycle, draft orders, fulfillments, transactions, refunds, order risks, webhook management |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Triggers

Triggers allow your integration to react to Shopify store activity in real time. The connector provides a webhook listener that receives Shopify notifications and invokes your service callbacks automatically when subscribed order, customer, product, or fulfillment events occur.

Supported trigger events:

| Event | Callback | Description |
|-------|----------|-------------|
| Order created | `onOrdersCreate` | Fired when a Shopify order is created. |
| Order paid | `onOrdersPaid` | Fired when a Shopify order is paid. |
| Order updated | `onOrdersUpdated` | Fired when a Shopify order is updated. |
| Customer created | `onCustomersCreate` | Fired when a Shopify customer is created. |
| Customer updated | `onCustomersUpdate` | Fired when a Shopify customer is updated. |
| Product created | `onProductsCreate` | Fired when a Shopify product is created. |
| Fulfillment created | `onFulfillmentsCreate` | Fired when a Shopify fulfillment is created. |

See the **[Trigger Reference](triggers.md)** for listener configuration, service callbacks, and the event payload structure.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating a Shopify development store and obtaining the Admin API access token required to use the Shopify Admin connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Trigger Reference](triggers.md)**: Reference for event-driven integration using the Shopify webhook listener and service model.

* **[Example](example.md)**: Learn how to build and configure an integration using the **Shopify Admin** connector, including connection setup, operation configuration, execution flow, and event-driven trigger setup.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Shopify Admin Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-shopify.admin)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
