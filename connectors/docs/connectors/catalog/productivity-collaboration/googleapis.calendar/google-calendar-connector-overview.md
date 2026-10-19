---
title: Overview
---

# Overview

Google Calendar is a time-management and scheduling service developed by Google that lets users organize their schedule and share events with others. The Ballerina `ballerinax/googleapis.calendar` connector (v3.2.1) provides programmatic access to Google Calendar API V3, enabling you to manage calendars, create and update events, query event lists, and perform quick event additions from your Ballerina integration flows. It also supports service account authorization for delegated domain-wide access in Google Workspace environments.

## Key features

- Full CRUD operations on calendars: create, list, and delete calendars
- Create, update, retrieve, and delete calendar events with rich metadata (attendees, reminders, recurrence, conference data)
- Quick-add events from simple text descriptions, letting Google parse date/time/title automatically
- Stream-based retrieval of calendars and events for efficient processing of large result sets
- Flexible event filtering with criteria such as time range, search query, ordering, and calendar-specific options
- Paginated event responses with sync token support for incremental synchronization
- Service account authorization with delegated domain-wide access for Google Workspace admins to operate on behalf of domain users
- Support for both OAuth 2.0 refresh token and bearer token authentication

## Actions

Actions are operations you invoke on Google Calendar from your integration. Use these actions for creating calendars, scheduling events, querying event lists, and more. The connector exposes all actions through a single client:

| Client | Actions |
|--------|---------|
| `Client` | Calendar CRUD, event CRUD, quick-add events, event queries, paginated event responses |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating a Google Cloud Platform project and obtaining the OAuth 2.0 credentials required to use the Google Calendar connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **Google Calendar** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Google Calendar Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-gcalendar)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
