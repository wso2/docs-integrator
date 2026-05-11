---
title: Overview
---

# Overview

HubSpot Automation Actions is part of the HubSpot CRM platform, enabling developers to create custom workflow actions (extensions) that integrate external services into HubSpot workflows. The Ballerina `ballerinax/hubspot.automation.actions` connector provides programmatic access to the HubSpot Automation Actions API v4, allowing you to manage extension definitions, custom functions, revisions, and complete workflow callbacks.

## Key features

- Create, read, update, and archive custom workflow extension definitions
- Manage custom functions attached to extension definitions (pre/post action execution, fetch options)
- Complete single and batch workflow callbacks with output fields
- Retrieve and inspect extension definition revisions for version tracking
- Support for OAuth 2.0, developer API key, and private app legacy authentication
- Paginated listing of extension definitions and revisions

## Actions

Actions are operations you invoke on HubSpot from your integration: managing custom workflow extension definitions, their functions, revisions, and completing callbacks. The connector exposes all actions through a single client:

| Client | Actions |
|--------|---------|
| `Client` | Extension definition CRUD, custom function management, revision tracking, callback completion |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through setting up a HubSpot developer account and obtaining the credentials required to use the HubSpot Automation Actions connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **HubSpot Automation Actions** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [HubSpot Automation Actions Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-hubspot.automation.actions)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
