---
title: Overview
---

# Overview

Slack is a cloud-based team communication platform that enables real-time messaging, file sharing, and collaboration across channels and workspaces. The Ballerina `ballerinax/slack` connector (v5.0.0) provides programmatic access to the Slack Web API, allowing you to send messages, manage conversations, upload files, search content, and administer workspaces from your Ballerina integration flows.

## Key features

- Post, update, delete, and schedule messages to Slack channels and users using the Chat API
- Manage conversations: create, archive, rename, join, and retrieve message history and thread replies
- Search messages and files across workspaces with keyword and channel filters
- Upload, list, retrieve, and delete files shared within Slack channels
- Add, remove, and list emoji reactions on messages
- Retrieve and manage user profiles, presence status, and per-user conversation lists
- Pin and unpin messages and files in channels for quick team reference
- Administer workspaces via the Slack Admin API: manage users, channels, emoji, and team settings

## Actions

Actions are operations you invoke on Slack from your integration: posting messages, managing channels, searching content, handling files, and more. The Slack connector exposes all actions through a single client:

| Client | Actions |
|--------|---------|
| `Client` | Messaging, conversations, users, files, search, reactions, pins, admin operations |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating a Slack App and obtaining the Bot User OAuth token required to use the Slack connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **Slack** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Slack Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-slack)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
