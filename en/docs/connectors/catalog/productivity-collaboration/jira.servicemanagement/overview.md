---
connector: true
connector_name: "jira.servicemanagement"
title: "Jira Servicemanagement"
description: "Overview of the ballerinax/jira.servicemanagement connector for WSO2 Integrator."
---

# Jira Servicemanagement

The Jira Servicemanagement connector integrates with [Jira Service Management Cloud](https://www.atlassian.com/software/jira/service-management), Atlassian's IT service management platform where customers raise requests through a help-center portal and agents triage those requests through queues, SLAs, and approvals. It wraps the Jira Service Management Cloud REST API (`servicedeskapi`) so applications can programmatically manage every aspect of a service desk operation. Authentication is supported via either an Atlassian API token (HTTP basic) or an OAuth 2.0 access token.

## Key Features

- Raise and validate customer requests, track their status, SLAs, and approval workflows
- Comment on requests, attach files, manage participants, and move requests through workflow transitions
- Manage customers and organizations, and control which of them can access each service desk
- Browse service desks, queues, and the issues waiting in them
- Create, configure, and delete request types and inspect their required fields
- Search the global knowledge base and retrieve articles by service desk
- Store and retrieve custom properties on organizations and request types
- Access assets workspaces and retrieve instance information

## Actions

The connector exposes a single client, `Client`, that covers the full Jira Service Management Cloud REST API surface.

| Client | Actions |
|--------|---------|
| `Client` | Customer requests, comments, attachments, approvals, SLAs, participants, transitions, feedback, service desks, queues, request types, customers, organizations, knowledge base articles, properties |

See the **[Action Reference](action-reference.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: How to obtain an Atlassian API token or configure an OAuth 2.0 app for Jira Service Management Cloud.

* **[Action Reference](action-reference.md)**: Full reference for all clients, with operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **Jira Servicemanagement** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Jira Servicemanagement Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-jira.servicemanagement)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
