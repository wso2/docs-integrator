---
title: Overview
---

# Overview

HubSpot Marketing Transactional enables sending single transactional emails and managing SMTP API tokens through the HubSpot Marketing API. The Ballerina `ballerinax/hubspot.marketing.transactional` connector (v1.0.0) provides programmatic access to the HubSpot Transactional Email API, allowing you to send transactional emails and manage SMTP tokens from your Ballerina integration flows.

## Key features

- Send single transactional emails asynchronously with customizable properties and recipient overrides
- Query SMTP API tokens with filtering by campaign name or email campaign ID
- Create new SMTP API tokens for transactional email campaigns
- Retrieve individual SMTP API token details by token ID
- Reset SMTP API token passwords
- Delete SMTP API tokens that are no longer needed

## Actions

Actions are operations you invoke on HubSpot from your integration. Use these actions for sending transactional emails and managing SMTP API tokens. The connector exposes actions through a single client:

| Client | Actions |
|--------|---------|
| `Client` | Send transactional emails, SMTP token CRUD and password reset |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating a HubSpot app and obtaining the OAuth 2.0 credentials required to use the HubSpot Marketing Transactional connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [HubSpot Marketing Transactional Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-hubspot.marketing.transactional)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
