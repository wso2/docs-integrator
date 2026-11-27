---
connector: true
connector_name: "xero.appstore"
title: "Xero Appstore"
description: "Overview of the ballerinax/xero.appstore connector for WSO2 Integrator."
---

# Xero Appstore

The Xero Appstore connector integrates with the Xero App Store Billing API, enabling partners to manage subscriptions and report metered usage for apps published on the Xero App Store. It supports reading customer subscriptions, listing usage records, and submitting or correcting metered usage against subscription items using the OAuth 2.0 client credentials flow.

> **Note:** The Xero App Store Subscription (XASS) billing platform is retired. This connector is intended for partners who previously billed through XASS and need to read, reconcile, or complete usage reporting while migrating subscribers to their own billing system.

## Key Features

- Retrieve a customer subscription including its plans, subscription items, products, and prices
- List all usage records submitted against a subscription for the current billing period
- Submit metered usage for a subscription item with safe-retry support via idempotency keys
- Correct a previously submitted usage record by updating its quantity
- Authenticate with the OAuth 2.0 client credentials flow using the `marketplace.billing` scope

## Actions

The Xero Appstore connector exposes a single client for interacting with the Xero App Store Billing API.

| Client | Actions |
|--------|---------|
| `Client` | Subscription retrieval, usage record creation, usage record update, usage record listing |

See the **[Action Reference](action-reference.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: How to obtain OAuth 2.0 credentials from the Xero developer portal and find the subscription details needed to call the API.

* **[Action Reference](action-reference.md)**: Full reference for all clients, with operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **Xero Appstore** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Xero Appstore Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-xero.appstore)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.