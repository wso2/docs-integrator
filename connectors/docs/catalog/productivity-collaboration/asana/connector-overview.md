---
title: Overview
---

# Overview

Asana is a cloud-based project management and work tracking platform that helps teams organize, plan, and manage their work. The Ballerina `ballerinax/asana` connector (v3.0.0) provides programmatic access to the Asana REST API, enabling you to manage tasks, projects, sections, teams, users, and more within your Ballerina integration flows.

## Key features

- Full CRUD operations on tasks, projects, sections, tags, and other Asana resources
- Project and task template instantiation for repeatable workflows
- Section management for organizing tasks within projects
- Team and workspace management including membership operations
- Goal tracking with metrics, relationships, and collaborator management
- Time tracking entry management for task-level time logging
- Webhook management for event-driven integrations
- Typeahead search and workspace-level task search

## Actions

Actions are operations you invoke on Asana from your integration. Use these actions for creating tasks, managing projects, organizing sections, and more. The Asana connector exposes all actions through a single client:

| Client | Actions |
|--------|---------|
| `Client` | Tasks, projects, sections, tags, stories, teams, users, goals, portfolios, webhooks, workspaces |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating an Asana Personal Access Token to authenticate with the Asana connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **Asana** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Asana Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-asana)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
