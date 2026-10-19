---
title: Overview
---

# Overview

PayPal is a global payments platform that enables businesses to authorize, capture, refund, and manage payments online. The Ballerina `ballerinax/paypal.payments` connector (v2.0.1) provides programmatic access to the PayPal Payments API v2, enabling you to authorize payments, capture authorized funds, issue refunds, and retrieve payment details within your Ballerina integration flows.

## Key features

- Show details of authorized payments by authorization ID
- Capture authorized payments with configurable amounts and payer notes
- Reauthorize previously authorized payments to extend the authorization period
- Void authorized payments that are no longer needed
- Show captured payment details by capture ID
- Refund captured payments with full or partial amounts
- Show refund details by refund ID

## Actions

Actions are operations you invoke on PayPal from your integration. Use these actions for capturing authorized payments, issuing refunds, and retrieving payment details. The PayPal Payments connector exposes actions through a single client:

| Client | Actions |
|--------|---------|
| `Client` | Authorize, capture, void, refund payments and retrieve payment details |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating a PayPal Developer account and obtaining the OAuth 2.0 client credentials required to use the PayPal Payments connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **PayPal Payments** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [PayPal Payments Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-paypal.payments)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
