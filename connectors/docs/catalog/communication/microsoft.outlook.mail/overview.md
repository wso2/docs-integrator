---
title: Microsoft Outlook Mail
---

# Microsoft Outlook Mail

The Microsoft Outlook Mail connector enables integration with the Microsoft Outlook Mail service through the Microsoft Graph REST API v1.0. It allows you to send, receive, organize, and manage email messages and mail folders for both the signed-in user and any mailbox in your Microsoft 365 tenant. Using delegated permissions for personal mailbox operations and application permissions for tenant-wide scenarios, the connector covers the full email lifecycle from drafting to delivery.

## Key Features

- Send mail directly or compose and send HTML-formatted draft messages on behalf of the signed-in user
- Read, search, and filter messages with OData query options (select, filter, orderby, expand)
- Update message properties such as subject, body, importance, flags, and read state
- Manage file and item attachments on messages, including large-file uploads through upload sessions
- Organize messages into mail folders and nested child folders, including copy, forward, and delete operations
- Access and manage any user's mailbox in a tenant using application permissions (user-scoped operations)

## Actions

The connector exposes a single `Client` that covers messages, attachments, mail folders, and child folders, both for the signed-in user (`/me`) and for any user in the tenant (`/users/{userIdentifier}`).

| Client | Actions |
|--------|---------|
| `Client` | Message listing, create and send drafts, get, update, delete, copy, forward messages; list, add, get, delete attachments and upload sessions; list, create, get, update, delete mail folders and child folders; user-scoped variants of all operations |

See the **[Action Reference](action-reference.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: Register a Microsoft Entra ID application, configure Microsoft Graph API permissions, and obtain the OAuth 2.0 credentials required to authenticate the connector.

* **[Action Reference](action-reference.md)**: Full reference for all clients, with operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **Microsoft Outlook Mail** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Microsoft Outlook Mail Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-microsoft.outlook.mail)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
