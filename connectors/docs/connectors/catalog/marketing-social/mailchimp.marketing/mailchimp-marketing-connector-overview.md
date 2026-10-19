---
title: Overview
---

# Overview

Mailchimp is a leading email marketing and automation platform that helps businesses manage audiences, create campaigns, and track engagement. The Ballerina `ballerinax/mailchimp.marketing` connector (v1.0.1) provides programmatic access to the Mailchimp Marketing API v3.0, enabling you to manage audiences, subscribers, campaigns, automations, templates, and more from your Ballerina integration flows.

## Key features

- Full CRUD operations on audiences (lists), members, segments, and interest categories
- Campaign management including creation, scheduling, sending, replication, and content editing
- Automation workflow management with email queue and subscriber control
- Template and template folder management for reusable email designs
- File manager operations for uploading and organizing media assets
- Batch operations for processing multiple API calls in a single request
- Campaign and member search across your Mailchimp account
- Reports and analytics for campaign performance, click details, and email activity

## Actions

Actions are operations you invoke on Mailchimp from your integration. Use these actions for managing audiences, creating campaigns, adding subscribers, and more. The Mailchimp Marketing connector exposes actions through a single client:

| Client | Actions |
|--------|---------|
| `Client` | Audiences, members, campaigns, automations, templates, file manager, reports, batch operations, search |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through obtaining a Mailchimp API key required to use the Mailchimp Marketing connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **Mailchimp Marketing** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Mailchimp Marketing Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-mailchimp.marketing)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
