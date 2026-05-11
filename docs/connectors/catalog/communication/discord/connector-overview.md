---
title: Overview
---

# Overview

Discord is a communication platform for communities, teams, and gamers, offering text channels, voice chat, and rich integrations. The Ballerina `ballerinax/discord` connector (v2.0.0) provides programmatic access to the Discord REST API v10, enabling you to manage guilds, channels, messages, members, roles, webhooks, application commands, and more from your Ballerina integration flows.

## Key features

- Send, retrieve, edit, and delete messages in any channel
- Full guild (server) management: create, update, and configure guilds
- Member and role management including role assignment and banning
- Channel CRUD operations with permission overwrites and thread support
- Webhook creation and execution for external integrations
- Application command management (global and guild-specific slash commands)
- Scheduled event creation and management for community events
- Message reactions for interactive workflows and polls

## Actions

Actions are operations you invoke on Discord from your integration: sending messages, managing guilds, assigning roles, and more. The Discord connector exposes actions through a single client that covers the entire Discord REST API v10:

| Client | Actions |
|--------|---------|
| `Client` | Messages, channels, guilds, members, roles, webhooks, application commands, scheduled events, reactions, threads |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating a Discord application and obtaining the credentials required to use the Discord connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **Discord** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Discord Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-discord)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
