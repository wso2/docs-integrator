---
connector: true
connector_name: "microsoft.teams"
title: "Microsoft Teams"
description: "Overview of the ballerinax/microsoft.teams connector for WSO2 Integrator."
---

The `ballerinax/microsoft.teams` connector enables programmatic access to [Microsoft Teams](https://www.microsoft.com/en-us/microsoft-teams/group-chat-software) through the Microsoft Graph API v1.0, allowing you to manage teams, channels, members, messages, tabs, and teamwork tags. It supports both delegated (refresh token) and app-only (client credentials) OAuth 2.0 authentication, making it suitable for user-delegated workflows and background automation alike.

## Key features

- Create, retrieve, update, and delete teams and channels (standard, private, and shared)
- Manage team and channel members with individual and bulk add/remove operations
- Send messages, post replies, and add or remove reactions in channels and the primary channel
- Upload and manage hosted content (inline images) embedded in channel messages
- List, create, update, and delete channel tabs
- Create and manage teamwork tags and their members for targeted notifications
- Send activity notifications to team members
- Access delta (change-tracking) feeds for messages and replies

## Actions

The `Client` provides a single entry point to the Microsoft Graph Teams API, covering all resource types under the `/teams` endpoint.

| Client | Actions |
|--------|---------|
| `Client` | Teams, Channels, Team Members, Channel Members, Channel Messages, Message Replies, Message Hosted Content, Channel Tabs, Teamwork Tags, Activity Notifications, Primary Channel |

See the **[Action Reference](action-reference.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: How to register an application in Microsoft Entra ID, configure Microsoft Graph permissions, create a client secret, and obtain the OAuth 2.0 credentials required by the connector.

* **[Action Reference](action-reference.md)**: Full reference for all clients — operations, parameters, return types, and sample code.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Microsoft Teams Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-microsoft.teams)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.