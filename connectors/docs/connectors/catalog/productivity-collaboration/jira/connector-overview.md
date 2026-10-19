---
title: Overview
---

# Overview

Jira is Atlassian's project tracking and issue management platform used by software teams worldwide. The Ballerina `ballerinax/jira` connector (v2.0.1) provides programmatic access to the Jira Cloud REST API v3, enabling you to manage projects, issues, comments, workflows, and more from your Ballerina integration flows.

## Key features

- Full CRUD operations on Jira issues including creation, retrieval, editing, deletion, and transitions
- Project management: create, update, search, archive, and configure projects
- Comment management on issues with Atlassian Document Format (ADF) support
- JQL-based issue search for flexible querying across projects and issue types
- Workflow and status management including transitions, statuses, and workflow schemes
- User and group management: look up users, assign issues, manage group membership
- Version and component tracking for release and module management within projects
- Bulk operations for large-scale issue edits, moves, transitions, and deletions

## Actions

Actions are operations you invoke on Jira from your integration. Use these actions for creating issues, searching with JQL, transitioning workflows, managing projects, and more. The Jira connector exposes all actions through a single client:

| Client | Actions |
|--------|---------|
| `Client` | Issue CRUD, project management, JQL search, comments, workflows, users, versions, components, dashboards, priorities, labels |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating an Atlassian API token and identifying your Jira Cloud instance URL required to use the Jira connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **Jira** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Jira Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-jira)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
