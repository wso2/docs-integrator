---
title: Overview
---

# Overview

Stripe is a leading online payment processing platform that simplifies the handling of financial transactions over the Internet. The Ballerina `ballerinax/stripe` connector (v2.0.1) provides programmatic access to the Stripe REST API V1, enabling seamless integration of Stripe's extensive payment processing capabilities, including customer management, payment intents, invoicing, subscriptions, products, and payouts, into your Ballerina integration flows.

## Key features

- Customer management: create, retrieve, update, delete, and list customers
- Payment Intents for handling complex payment flows with automatic or manual confirmation
- Invoice creation, finalization, payment, and lifecycle management
- Product and Price catalog management for one-time and recurring billing
- Subscription management: create, update, cancel, and list subscriptions
- Charge creation and retrieval for direct payment processing
- Payout management for transferring funds to connected bank accounts
- Balance and balance transaction retrieval for reconciliation and reporting

## Actions

Actions are operations you invoke on Stripe from your integration. Use these actions for creating customers, processing payments, managing subscriptions, and more. The Stripe connector exposes all actions through a single client:

| Client | Actions |
|--------|---------|
| `Client` | Customers, Payment Intents, Charges, Invoices, Products, Prices, Subscriptions, Payouts, Balance, Refunds |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating a Stripe account and obtaining the API secret key required to authenticate with the Stripe connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **Stripe** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Stripe Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-stripe)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
