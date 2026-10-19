---
title: Overview
---

# Overview

Zoom Meetings is a widely used cloud-based video conferencing platform for virtual meetings, webinars, and online collaboration. The Ballerina `ballerinax/zoom.meetings` connector (v1.0.1) provides programmatic access to the Zoom Meetings REST API v2, enabling you to automate meeting lifecycle management, handle registrations, manage cloud recordings, and access reporting data directly from your Ballerina integration flows.

## Key features

- Full meeting lifecycle management: create, retrieve, update, and delete scheduled and recurring meetings
- Webinar management: create and manage webinars, panelists, polls, registrants, and Q&A
- Meeting registration: add, list, approve, deny, and cancel meeting and webinar registrants
- Poll and survey management: create, update, retrieve, and delete meeting and webinar polls
- Cloud recording management: access, configure, and delete meeting and webinar recordings
- Past meeting reporting: retrieve completed meeting details, participants, polls, and Q&A
- Report generation: access activity, billing, cloud recording, and user meeting usage reports
- Live meeting control: manage live streaming, end live meetings, and control real-time meeting events

## Actions

Actions are operations you invoke on Zoom from your integration: creating meetings, managing registrations, accessing recordings, and generating reports. The Zoom Meetings connector exposes all operations through a single client:

| Client | Actions |
|--------|---------|
| `Client` | Meeting CRUD, webinar management, registrants, polls, recordings, past meetings, reports, live meeting control |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating a Zoom OAuth app on the Zoom App Marketplace and obtaining the credentials required to authenticate the Zoom Meetings connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **Zoom Meetings** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Zoom Meetings Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-zoom.meetings)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
