---
title: Overview
---

# Overview

Smartsheet is a cloud-based work management platform for project tracking, task automation, and collaborative spreadsheets. The Ballerina `ballerinax/smartsheet` connector (v1.0.1) provides programmatic access to the Smartsheet API v2.0, enabling you to manage sheets, rows, columns, folders, workspaces, users, reports, and more from your Ballerina integration flows.

## Key features

- Full CRUD operations on sheets, rows, columns, folders, and workspaces
- Sharing and collaboration management for sheets, reports, sights, and workspaces
- Attachment support for sheets, rows, comments, and proofs
- Discussion and comment threading on sheets and rows
- Report generation and publishing with email distribution
- Webhook management for event-driven integrations
- User and group administration for organizational management
- Cross-sheet references and sheet summary field management

## Actions

Actions are operations you invoke on Smartsheet from your integration. Use these actions for managing sheets, adding rows, sharing workspaces, and more. The Smartsheet connector exposes all actions through a single client:

| Client | Actions |
|--------|---------|
| `Client` | Sheets, rows, columns, folders, workspaces, reports, sights, users, groups, webhooks, attachments, sharing |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through obtaining the API access token or OAuth 2.0 credentials required to use the Smartsheet connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **Smartsheet** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Smartsheet Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-smartsheet)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
