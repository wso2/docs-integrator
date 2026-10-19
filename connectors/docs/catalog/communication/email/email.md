---
title: Email
---

Email is a fundamental communication protocol used across virtually every business and personal workflow. The Ballerina `ballerina/email` connector (v2.13.0) provides programmatic access to send emails via SMTP and receive emails via IMAP and POP3, enabling you to integrate email capabilities into your Ballerina integration flows.

## Key features

- Send emails with text and HTML bodies, attachments, CC/BCC, and custom headers via SMTP
- Receive emails from IMAP servers with configurable folder and timeout support
- Receive emails from POP3 servers with configurable folder and timeout support
- Event-driven email polling with IMAP and POP3 listeners for real-time inbox monitoring
- SSL/TLS and STARTTLS security options for all protocols
- Attachment support using file paths or MIME entities
- Configurable polling intervals for listeners to control email check frequency

## Actions

Actions are operations you invoke from your integration to send or receive emails. The Email connector exposes actions across three clients:

| Client | Actions |
|--------|---------|
| `SMTP Client` | Send emails via SMTP with text/HTML bodies, attachments, and custom headers |
| `IMAP Client` | Receive emails from IMAP servers |
| `POP Client` | Receive emails from POP3 servers |

See the **[Action Reference](action-reference.md)** for the full list of operations, parameters, and sample code for each client.

## Triggers

Triggers allow your integration to react to incoming emails in real time. The connector provides IMAP and POP3 listeners that poll for new emails at configurable intervals, invoking your service callbacks automatically when messages arrive.

Supported trigger events:

| Event | Callback | Description |
|-------|----------|-------------|
| Email received | `onMessage` | Fired when a new email message is received in the mailbox. |
| Error occurred | `onError` | Fired when an error occurs during email polling. |
| Connection closed | `onClose` | Fired when the listener connection is closed. |

See the **[Trigger Reference](trigger-reference.md)** for listener configuration, service callbacks, and the event payload structure.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through configuring your email server credentials and settings required to use the Email connector.

* **[Action Reference](action-reference.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Trigger Reference](trigger-reference.md)**: Reference for event-driven integration using the listener and service model.

* **[Example](example.md)**: Learn how to build and configure an integration using the **Email** connector, including connection setup, operation configuration, execution flow, and event-driven trigger setup.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Email Connector GitHub repository](https://github.com/ballerina-platform/module-ballerina-email)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
