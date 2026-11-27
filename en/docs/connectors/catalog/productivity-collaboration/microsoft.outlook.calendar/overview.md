---
connector: true
connector_name: "microsoft.outlook.calendar"
title: "Microsoft Outlook Calendar"
description: "Overview of the ballerinax/microsoft.outlook.calendar connector for WSO2 Integrator."
---

# Microsoft Outlook Calendar

The Microsoft Outlook Calendar connector integrates with the Microsoft Graph v1.0 REST API to manage the calendars and events of Microsoft 365 and Outlook.com users. It lets applications create, update, and delete calendar events, manage calendar groups and sharing permissions, respond to meeting invitations, check free/busy availability, and find optimal meeting times across attendees. This connector covers both the signed-in user's own calendars and the calendars of other users in the organization.

## Key Features

- Create, read, update, and delete events in the default calendar, in any named calendar, and in calendars grouped under a calendar group
- Accept, tentatively accept, decline, cancel, and forward meeting invitations, and dismiss or snooze event reminders
- Read calendar views and recurring-event instances for a given time range, and track incremental changes with delta queries
- Manage calendars and calendar groups, and share calendars by granting fine-grained calendar permissions
- Query free/busy availability of users and resources, and request meeting-time suggestions that fit all attendees
- Add file and item attachments to events, including large files through upload sessions
- Extend events with open extensions for custom application metadata

## Actions

The connector exposes a single client that covers the full breadth of the Microsoft Graph Calendar API for both the signed-in user (`/me`) and by-ID user paths (`/users/{userId}`).

| Client | Actions |
|--------|---------|
| `Client` | Calendar management, Calendar group management, Event management, Meeting responses, Reminder control, Attachment management, Calendar views and delta queries, Sharing permissions, Free/busy and meeting-time suggestions |

See the **[Action Reference](action-reference.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: How to register an application in Microsoft Entra ID and obtain the OAuth 2.0 credentials required by the connector.

* **[Action Reference](action-reference.md)**: Full reference for all clients, with operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **Microsoft Outlook Calendar** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Microsoft Outlook Calendar Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-microsoft.outlook.calendar)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
