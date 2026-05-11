---
title: Overview
---

# Overview

HubSpot Communication Preferences is a subscription management service that lets you control how contacts receive communications across email, SMS, and WhatsApp channels. The Ballerina `ballerinax/hubspot.marketing.subscriptions` connector (v2.0.0) provides programmatic access to the HubSpot Communication Preferences Subscriptions API (v4), enabling you to read and update subscription statuses, manage opt-outs, and retrieve subscription definitions from your Ballerina integration flows.

## Key features

- Retrieve and update individual contact subscription statuses across email, SMS, and WhatsApp channels
- Batch read subscription statuses for multiple contacts in a single request
- Batch update subscription statuses with legal basis tracking for GDPR compliance
- Unsubscribe a contact from all communication subscriptions on a given channel
- Batch unsubscribe multiple contacts from all communications at once
- Retrieve subscription definitions configured in your HubSpot portal
- Batch retrieve opt-out-of-all (wide) statuses for multiple contacts

## Actions

Actions are operations you invoke on HubSpot from your integration — reading subscription statuses, updating preferences, managing opt-outs, and retrieving definitions. The connector exposes a single client:

| Client | Actions |
|--------|---------|
| `Client` | Subscription status CRUD, batch operations, opt-out management, subscription definitions |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating a HubSpot app and obtaining the OAuth 2.0 credentials required to use the HubSpot Marketing Subscriptions connector.

* **[Action Reference](actions.md)**: Full reference for all clients — operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **HubSpot Marketing Subscriptions** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [HubSpot Marketing Subscriptions Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-hubspot.marketing.subscriptions)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
