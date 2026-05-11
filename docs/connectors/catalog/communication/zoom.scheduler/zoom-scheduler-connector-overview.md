---
title: Overview
---

# Overview

Zoom Scheduler is a scheduling service that lets users create availability windows, publish booking pages, and manage scheduled meetings across teams. The Ballerina `ballerinax/zoom.scheduler` connector (v1.0.1) provides programmatic access to the Zoom Scheduler REST API, enabling you to manage schedules, availability, events, and analytics directly from your Ballerina integration flows.

## Key features

- Manage scheduling availability windows with flexible weekly recurrence rules (per-day time slots)
- Create, retrieve, update, and delete meeting schedules with configurable capacity, duration, and buffer times
- List and manage scheduled events: including pending, confirmed, and cancelled bookings
- Generate single-use scheduling links for one-off meeting invitations
- Retrieve analytics reports covering event creation, completion, cancellations, and popular schedules
- Look up user profile and scheduling URL information
- OAuth 2.0 authentication with automatic token refresh via the Zoom Marketplace app

## Actions

Actions are operations you invoke on the Zoom Scheduler API from your integration: managing availability, creating schedules, querying events, and retrieving analytics. The connector exposes all actions through a single client:

| Client | Actions |
|--------|---------|
| `Client` | Availability management, schedule CRUD, event management, analytics, user lookup, single-use link generation |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating a Zoom Marketplace app and obtaining the OAuth 2.0 credentials required to use the Zoom Scheduler connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **Zoom Scheduler** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Zoom Scheduler Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-zoom.scheduler)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
