# Twilio Connector Overview

Twilio is a cloud communications platform that provides APIs for SMS, voice calls, WhatsApp messaging, and more. The Ballerina `ballerinax/twilio` connector (v5.0.1) offers programmatic access to the Twilio REST API (v2010-04-01), enabling you to send messages, make voice calls, manage phone numbers, and handle recordings from your Ballerina integration flows.

## Key features

- Send and receive SMS, MMS, and WhatsApp messages
- Initiate and manage outbound voice calls with TwiML support
- Purchase, configure, and manage incoming phone numbers
- Conference call management with participant control
- Call and conference recording creation and retrieval
- Account and sub-account management with balance queries
- Usage records and usage trigger management
- SIP domain, credential list, and IP access control management

## Actions

Actions are operations you invoke on Twilio from your integration — sending messages, making calls, managing phone numbers, and more. The Twilio connector exposes actions through a single client:

| Client | Actions |
|--------|---------|
| `Client` | Messaging (SMS/MMS/WhatsApp), voice calls, phone numbers, recordings, conferences, accounts, usage |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating a Twilio account and obtaining the credentials required to use the Twilio connector.

* **[Action Reference](actions.md)**: Full reference for all clients — operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **Twilio** connector, including connection setup, operation configuration, execution flow, and event-driven trigger setup.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Twilio Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-twilio)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
