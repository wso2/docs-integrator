---
title: HubSpot CRM Extensions Timelines
---

HubSpot CRM Extensions Timelines API allows you to create custom timeline events that appear on HubSpot CRM record pages. The Ballerina `ballerinax/hubspot.crm.extensions.timelines` connector (v2.0.0) provides programmatic access to manage event templates, tokens, and timeline events through the HubSpot Timelines API v3.

## Key features

- Create and manage timeline event templates for your HubSpot app
- Define custom tokens (string, number, date, enumeration) on event templates
- Create single or batch timeline events on CRM records
- Render timeline event headers and details as HTML
- Retrieve rendered event detail templates
- Supports OAuth 2.0, Bearer Token, and API Key authentication
- Attach extra data and inline IFrames to timeline events

## Actions

Actions let you manage timeline event templates and create timeline events on HubSpot CRM records. The connector exposes a single client with resource functions for template management, token management, and event operations.

| Client | Actions |
|--------|---------|
| `Client` | Event template CRUD, token management, event creation, batch events, event rendering |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating a HubSpot developer app and obtaining the credentials required to use the HubSpot CRM Extensions Timelines connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **HubSpot CRM Extensions Timelines** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [HubSpot CRM Extensions Timelines Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-hubspot.crm.extensions.timelines)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
