---
title: Overview
---

# Overview

HubSpot CRM Feedback provides access to HubSpot's Feedback Submissions API, allowing you to retrieve and manage customer feedback data collected through HubSpot surveys and feedback tools. The Ballerina `ballerinax/hubspot.crm.obj.feedback` connector (v2.0.0) supports OAuth 2.0, private app tokens, and bearer token authentication to integrate feedback submission data into your Ballerina integration flows.

## Key features

- Read individual feedback submissions by ID with optional property and association filtering
- List all feedback submissions with pagination, property selection, and archive filtering
- Search submissions using filter groups, property conditions, and sorting criteria
- Batch read multiple submissions in a single request using internal IDs or unique property values
- Batch create, update, upsert, and archive feedback submissions for bulk data operations
- Update individual submissions with partial property payloads
- Support for OAuth 2.0 refresh token, private app token, and legacy API key authentication

## Actions

Actions are operations you invoke on HubSpot from your integration, including listing submissions, searching by filter, reading records by ID, and performing bulk operations. The HubSpot CRM Feedback connector exposes all actions through a single client:

| Client | Actions |
|--------|---------|
| `Client` | Single-object CRUD, batch operations, and search for feedback submissions |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating a HubSpot Private App and obtaining the access token required to authenticate with the HubSpot Feedback Submissions API.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **HubSpot CRM Feedback** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [HubSpot CRM Feedback Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-hubspot.crm.obj.feedback)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
