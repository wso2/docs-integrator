---
title: Overview
---

# Overview

Gmail is Google's email service, offering sending, receiving, and organizing email at scale. The Ballerina `ballerinax/googleapis.gmail` connector (v4.2.0) provides programmatic access to the Gmail REST API, enabling you to manage messages, drafts, threads, labels, and mailbox history within your Ballerina integration flows.

## Key features

- Send plain-text and HTML emails with inline images and file attachments
- List, read, modify, trash, untrash, and permanently delete messages
- Batch delete and batch modify messages (e.g., mark as read/unread, add/remove labels)
- Create, update, send, and delete drafts
- List and retrieve threads with full conversation context
- Create, update, patch, and delete custom labels
- Query messages and threads using Gmail search syntax (the `q` parameter)
- Retrieve mailbox history for incremental sync via the History API

## Actions

Actions are operations you invoke on Gmail from your integration: sending emails, reading messages, managing drafts, and more. The Gmail connector exposes all actions through a single client:

| Client | Actions |
|--------|---------|
| `Client` | Messages, drafts, threads, labels, history, profile, attachments |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through enabling the Gmail API in Google Cloud and obtaining the OAuth 2.0 credentials required to use the Gmail connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **Gmail** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Gmail Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-googleapis.gmail)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
