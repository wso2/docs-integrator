---
title: Overview
---

# Overview

Intercom is a customer messaging platform that enables businesses to communicate with customers through chat, email, and automated workflows. The Ballerina `ballerinax/intercom` connector (v0.1.0) provides programmatic access to the Intercom REST API (v2.15), enabling you to manage contacts, conversations, tickets, articles, tags, and companies within your integration flows.

## Key features

- Create, retrieve, update, and delete contacts (users and leads)
- Search contacts using flexible filter queries
- Create and manage conversations, add replies, and track conversation state
- Create and manage support tickets with custom ticket types and attributes
- Publish and manage Help Center articles across collections
- Organize contacts and conversations with tags
- Create and update companies and attach contacts to them
- Search conversations and tickets using multi-field filter queries
- Manage admins, team assignments, and away status
- Access AI content sources and external pages for Fin AI Agent

## Actions

Actions are operations you invoke on Intercom from your integration. The Intercom connector exposes all actions through a single client:

| Client | Actions |
|--------|---------|
| `Client` | Contacts, conversations, tickets, articles, tags, companies, admins, Help Center, AI content |

See the **[Action reference](action-reference.md)** for the full list of operations, parameters, and sample code.

## Documentation

- **[Setup guide](setup-guide.md)**: How to create an Intercom app and obtain the access token required to authenticate with the connector.
- **[Action reference](action-reference.md)**: Full reference for all operations: parameters, return types, and sample code.
- **[Example](example.md)**: Learn how to build and configure an integration using the **Intercom** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open-source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, create a pull request in the following repository:

- [Intercom connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-intercom)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.

## What's next

- [Setup guide](setup-guide.md): Create an Intercom app and obtain your access token
- [Action reference](action-reference.md): Browse all available operations and sample code
- [Connectors overview](../../../overview.md): Explore other available connectors
