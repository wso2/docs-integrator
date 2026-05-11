---
title: Overview
---

# Overview

Twilio is a cloud communications platform that enables developers to programmatically make and receive phone calls, send and receive SMS and WhatsApp messages, and manage phone numbers. The Ballerina `ballerinax/twilio` connector provides access to the Twilio REST API, allowing you to integrate voice, messaging, and account management capabilities into your Ballerina integration flows.

## Key features

- Send SMS and MMS messages programmatically to any phone number using the Messages API
- Send WhatsApp messages via Twilio's WhatsApp channel using the same Messages API
- Make and manage outbound voice calls with TwiML instructions or a URL-based response handler
- Manage incoming Twilio phone numbers: purchase, configure webhooks, and release numbers
- Retrieve account balance, manage sub-accounts, and update account settings
- List, fetch, and delete message and call logs for auditing and analytics
- Supports both Auth Token and API Key authentication methods

## Actions

Actions are operations you invoke on Twilio from your integration: sending messages, making calls, managing phone numbers, and inspecting account state. All actions are exposed through a single `twilio:Client`:

| Client | Actions |
|--------|---------|
| `Client` | SMS/MMS messaging, WhatsApp messaging, voice calls, phone number management, account and balance operations, call and message log retrieval |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](../setup-guide.md)**: This guide walks you through obtaining the Twilio credentials required to use the Ballerina Twilio connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Twilio Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-twilio)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
