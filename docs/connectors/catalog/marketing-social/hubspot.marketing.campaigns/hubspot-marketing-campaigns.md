---
title: HubSpot Marketing Campaigns
---

HubSpot Marketing Campaigns is a tool within HubSpot's marketing platform for organizing and tracking marketing efforts across channels. The Ballerina `ballerinax/hubspot.marketing.campaigns` connector (v2.0.0) provides programmatic access to the HubSpot Marketing Campaigns API, enabling you to create, update, search, and report on campaigns and their associated assets from your Ballerina integration flows.

## Key features

- Full CRUD operations on marketing campaigns: create, read, update, delete, and search
- Batch operations for creating, reading, updating, and archiving multiple campaigns in a single request
- Asset association management: link and unlink forms, object lists, and external web URLs to campaigns
- Campaign metrics reporting including sessions, new contacts (first/last touch), and influenced contacts
- Revenue attribution reporting with configurable attribution models (linear, first/last interaction, U-shaped, W-shaped, and more)
- Contact reporting: retrieve contact IDs by attribution type (first touch, last touch, influenced)
- Budget tracking: read total budget, spend, and remaining budget for a campaign

## Actions

Actions are operations you invoke on HubSpot Marketing Campaigns from your integration. Use these actions for creating campaigns, managing assets, retrieving metrics, and more. The connector exposes actions through a single client:

| Client | Actions |
|--------|---------|
| `Client` | Campaign CRUD, batch operations, asset management, metrics, revenue, contacts, budget |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating a HubSpot developer app and obtaining the OAuth 2.0 credentials required to use the HubSpot Marketing Campaigns connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **HubSpot Marketing Campaigns** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [HubSpot Marketing Campaigns Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-hubspot.marketing.campaigns)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
