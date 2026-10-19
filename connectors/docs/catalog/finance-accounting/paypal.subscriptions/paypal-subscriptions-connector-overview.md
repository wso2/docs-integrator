---
title: Overview
---

# Overview

PayPal Subscriptions is a recurring billing platform that enables merchants to create billing plans, enroll customers into subscriptions, and manage the full subscription lifecycle including suspension, revision, and cancellation. The Ballerina `ballerinax/paypal.subscriptions` connector (v1.0.1) provides programmatic access to the PayPal Subscriptions API, allowing you to automate subscription management, capture outstanding payments, and retrieve transaction history within your Ballerina integration flows.

## Key features

- Create and manage billing plans with flexible trial and regular billing cycle configurations
- Full subscription lifecycle management: create, suspend, activate, revise, and cancel subscriptions
- Activate and deactivate billing plans to control customer enrollment availability
- Update plan pricing schemes for existing billing cycles without recreating plans
- Capture outstanding or full authorized payments from active subscriptions
- Retrieve paginated transaction history for subscriptions with date-range filtering
- OAuth 2.0 Client Credentials authentication with built-in sandbox and production environment support

## Actions

Actions are operations you invoke on PayPal from your integration. Use these actions for creating billing plans, managing subscription lifecycles, capturing payments, and retrieving transaction records. The PayPal Subscriptions connector exposes all actions through a single client:

| Client | Actions |
|--------|---------|
| `Client` | Billing plan CRUD, plan activation/deactivation, pricing scheme updates, subscription lifecycle management, payment capture, transaction listing |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating a PayPal Developer application and obtaining the OAuth 2.0 Client ID and Client Secret required to use the PayPal Subscriptions connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **PayPal Subscriptions** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [PayPal Subscriptions Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-paypal.subscriptions)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
