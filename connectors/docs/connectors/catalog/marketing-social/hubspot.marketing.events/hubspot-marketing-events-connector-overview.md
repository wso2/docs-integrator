---
title: Overview
---

# Overview

HubSpot Marketing Events is part of the HubSpot CRM platform, enabling you to manage marketing events such as webinars, conferences, and workshops, and track participant attendance. The Ballerina `ballerinax/hubspot.marketing.events` connector (v1.0.0) provides programmatic access to the HubSpot Marketing Events API v3, allowing you to create, update, and delete events, record attendance, retrieve participation analytics, and manage list associations from your Ballerina integration flows.

## Key features

- Full CRUD operations on marketing events using both external event IDs and internal object IDs
- Batch create, update, and delete operations for managing multiple events at once
- Event lifecycle management: mark events as completed or cancelled
- Record participant attendance by contact ID or email with subscriber state tracking (registered, attended, cancelled)
- Participation analytics including counters and detailed breakdowns by event or contact
- List association management: associate and disassociate HubSpot lists with marketing events
- Search and discovery of marketing events by external event IDs
- App-level settings retrieval and update for marketing event configuration

## Actions

Actions are operations you invoke on HubSpot Marketing Events from your integration. Use these actions for creating events, recording attendance, retrieving participation analytics, and more. The connector exposes all actions through a single client:

| Client | Actions |
|--------|---------|
| `Client` | Event CRUD, batch operations, lifecycle management, attendance tracking, participation analytics, list associations, search, app settings |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating a HubSpot app and obtaining the OAuth 2.0 credentials required to use the HubSpot Marketing Events connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **HubSpot Marketing Events** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [HubSpot Marketing Events Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-hubspot.marketing.events)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
