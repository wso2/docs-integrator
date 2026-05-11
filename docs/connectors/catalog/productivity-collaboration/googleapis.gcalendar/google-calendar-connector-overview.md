---
title: Overview
---

# Overview

Google Calendar is a time-management and scheduling service that allows users to create and manage calendars, events, and access control rules. The Ballerina `ballerinax/googleapis.gcalendar` connector (v4.0.1) provides programmatic access to the Google Calendar API v3, enabling you to create, read, update, and delete calendars, events, ACL rules, free/busy queries, and calendar list entries from your Ballerina integration flows.

## Key features

- Full CRUD operations on Google Calendar calendars — create, retrieve, update, patch, and delete
- Full CRUD operations on calendar events including recurring events, quick-add by text, and event import
- Access Control List (ACL) management — grant and revoke reader, writer, and owner access to calendars
- Calendar List management — add, list, update, and remove calendars from a user's calendar list
- Free/busy availability queries across multiple calendars and groups
- Color definitions retrieval for calendar and event color coding
- Recurring event instance listing and individual instance management
- OAuth 2.0 authentication with auto-refresh token support via Google's token endpoint

## Actions

Actions are operations you invoke on Google Calendar from your integration — creating events, managing calendars, querying free/busy slots, and controlling access permissions. The Google Calendar connector exposes all actions through a single client:

| Client | Actions |
|--------|---------|
| `Client` | Calendar CRUD, Event CRUD, ACL management, Calendar List, Free/Busy queries, Colors |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating a Google Cloud project, enabling the Google Calendar API, and obtaining the OAuth 2.0 credentials required to use the connector.

* **[Action Reference](actions.md)**: Full reference for all clients — operations, parameters, return types, and sample code.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Google Calendar Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-googleapis.gcalendar)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
