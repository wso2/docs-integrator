---
title: Overview
---

# Overview

Trello is a web-based project management tool that uses boards, lists, and cards to organize tasks and workflows. The Ballerina `ballerinax/trello` connector (v2.0.1) provides programmatic access to the Trello REST API, enabling you to manage boards, lists, cards, members, labels, checklists, organizations, and more within your Ballerina integration flows.

## Key features

- Full CRUD operations on boards, lists, and cards
- Member and organization management including invitations and role assignments
- Label creation and assignment for card categorization
- Checklist and check-item management on cards
- Attachment upload and retrieval on cards
- Custom field definitions and values on boards and cards
- Search across boards, cards, members, and organizations
- Webhook management for external event subscriptions

## Actions

Actions are operations you invoke on Trello from your integration. Use these actions for creating cards, managing boards, assigning members, and more. The Trello connector exposes all actions through a single client:

| Client | Actions |
|--------|---------|
| `Client` | Board, list, card, member, label, checklist, organization, search, webhook management |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through obtaining a Trello API key and token required to use the Trello connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **Trello** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Trello Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-trello)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
