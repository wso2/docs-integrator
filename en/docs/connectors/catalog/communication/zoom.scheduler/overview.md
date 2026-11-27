---
connector: true
connector_name: "zoom.scheduler"
title: "Zoom Scheduler"
description: "Overview of the ballerinax/zoom.scheduler connector for WSO2 Integrator."
---

# Zoom Scheduler

Zoom Scheduler is a booking tool that lets hosts publish availability windows and scheduling pages so that invitees can book open time slots that automatically become Zoom meetings. The Zoom Scheduler connector lets you manage schedules, availability, bookings, and scheduled events, create single-use and customised scheduling links, and read routing-form responses and booking analytics against version 2 of the Zoom Scheduler API.

## Key Features

- Publish and manage booking schedules with configurable duration, buffers, custom questions, and weekly availability rules
- Maintain users' working-hour availability windows and date-specific overrides
- Find open time slots and book them on behalf of invitees
- Track, update, and cancel scheduled events and their attendees
- Issue single-use and customised scheduling links for targeted invitations
- Retrieve booking analytics reports covering event creation, completions, and cancellations
- Access routing form responses and cross-account routing analytics
- Look up Scheduler user profiles and team information

## Actions

The connector exposes all operations through a single client that covers the full Zoom Scheduler API surface.

| Client | Actions |
|--------|---------|
| `Client` | Availability management, schedule CRUD, event management, bookings, single-use links, shares, routing forms, analytics, teams, user lookup |

See the **[Action Reference](action-reference.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: How to create a Zoom Marketplace app and obtain the OAuth 2.0 credentials required to use this connector.

* **[Action Reference](action-reference.md)**: Full reference for all clients, with operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **Zoom Scheduler** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Zoom Scheduler Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-zoom.scheduler)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
