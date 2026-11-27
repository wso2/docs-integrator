---
connector: true
connector_name: "stripe"
title: "Stripe"
description: "Overview of the ballerinax/stripe connector for WSO2 Integrator."
---

# Stripe

Stripe is a leading online payment processing platform that enables businesses to accept payments, manage customers and subscriptions, issue invoices, and pay out to bank accounts. The Stripe connector provides programmatic access to the [Stripe REST API](https://stripe.com/docs/api), supporting the full Stripe API surface including core payments, billing, Connect, Issuing, Terminal, Treasury, Tax, and Radar products.

## Key Features

- Accept and manage payments using payment intents, charges, refunds, and payment methods
- Manage customers, subscriptions, invoices, and the full billing lifecycle
- Maintain product catalogs, prices, coupons, and promotion codes
- Onboard and pay out connected accounts with Stripe Connect
- Create and manage account links, sessions, and capabilities for platform integrations
- Retrieve balance and balance transactions for reconciliation and reporting
- Access Identity, Issuing, Terminal, Treasury, Tax, and Radar APIs
- Manage financial connections, payment records, and forwarding configurations

## Actions

The Stripe connector exposes all operations through a single client that covers the complete Stripe REST API surface.

| Client | Actions |
|--------|---------|
| `Client` | Accounts, Payment Intents, Charges, Customers, Subscriptions, Invoices, Products, Prices, Refunds, Payouts, Balance, Connect, Issuing, Terminal, Treasury, Tax, Radar |

See the **[Action Reference](action-reference.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: How to create a Stripe account and obtain the API secret key required to authenticate the connector.

* **[Action Reference](action-reference.md)**: Full reference for all clients, with operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **Stripe** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Stripe Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-stripe)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
