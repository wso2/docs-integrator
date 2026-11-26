---
connector: true
connector_name: "xero.bankfeeds"
title: "Xero Bankfeeds"
description: "Overview of the ballerinax/xero.bankfeeds connector for WSO2 Integrator."
---

# Xero Bankfeeds

The Xero Bankfeeds connector integrates with the [Xero Bank Feeds API](https://developer.xero.com/documentation/bank-feeds-api/overview), a closed API available exclusively to financial institutions with an established Xero financial services partnership. It lets you connect a financial institution's customer bank and credit card accounts to their Xero organisations as bank feeds and deliver bank statements, including opening balances, closing balances, and transaction lines, directly into those feeds for reconciliation.

## Key Features

- Connect customer bank and credit card accounts to Xero organisations as bank feeds
- Look up and list feed connections in an organisation, including their status and linked Xero bank accounts
- Disconnect existing feed connections from an organisation
- Deliver bank statements with opening and closing balances and individual transaction lines to a feed connection
- Retrieve statements and inspect their current delivery status, including rejection reasons
- Support safe request retries using idempotency keys on feed connection and statement operations
- Paginate through large sets of feed connections and statements

## Actions

The connector exposes a single client for interacting with both feed connections and bank statements in a Xero organisation.

| Client | Actions |
|--------|---------|
| `Client` | Feed connection management (create, read, list, delete), bank statement delivery (create, read, list) |

See the **[Action Reference](action-reference.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: How to register a Xero app, obtain OAuth 2.0 credentials with the `bankfeeds` scope, and retrieve your organisation's tenant ID.

* **[Action Reference](action-reference.md)**: Full reference for all clients, with operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **Xero Bankfeeds** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Xero Bankfeeds Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-xero.bankfeeds)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
