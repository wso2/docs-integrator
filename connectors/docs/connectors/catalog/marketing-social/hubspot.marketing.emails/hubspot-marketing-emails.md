---
title: HubSpot Marketing Emails
---

HubSpot Marketing Emails is a tool within the HubSpot marketing platform that lets you create, manage, and send email campaigns. The Ballerina `ballerinax/hubspot.marketing.emails` connector (v1.0.0) provides programmatic access to HubSpot's Marketing Emails API (v3), enabling you to create, update, publish, clone, A/B test, and track statistics for marketing emails from your Ballerina integration flows.

## Key features

- Full CRUD operations on marketing emails: create, retrieve, update, and delete
- List all marketing emails with filtering by publish status, date range, and type
- Publish and unpublish (or cancel) marketing emails programmatically
- Clone existing marketing emails for rapid campaign duplication
- A/B test creation and variation retrieval for data-driven email optimization
- Draft management: get, update, and reset email drafts independently of the live version
- Revision history: list, inspect, and restore previous versions of a marketing email
- Aggregated and histogram-based email statistics for performance tracking

## Actions

Actions are operations you invoke on HubSpot Marketing Emails from your integration, including listing emails, creating campaigns, publishing, cloning, managing drafts, and retrieving statistics. The connector exposes actions through a single client:

| Client | Actions |
|--------|---------|
| `Client` | Email CRUD, publish/unpublish, clone, A/B testing, drafts, revisions, statistics |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating a HubSpot app and obtaining the OAuth 2.0 credentials required to use the HubSpot Marketing Emails connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **HubSpot Marketing Emails** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [HubSpot Marketing Emails Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-hubspot.marketing.emails)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
