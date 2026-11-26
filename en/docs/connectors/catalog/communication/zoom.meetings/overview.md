---
connector: true
connector_name: "zoom.meetings"
title: "Zoom Meetings"
description: "Overview of the ballerinax/zoom.meetings connector for WSO2 Integrator."
---

# Zoom Meetings

The Zoom Meetings connector integrates with the [Zoom](https://www.zoom.com/) video conferencing platform through version 2 of the Zoom Meetings API. It covers the full lifecycle of meetings and webinars, from scheduling and registration through in-meeting controls to recordings, transcripts, AI summaries, and usage reports.

## Key Features

- Schedule, update, end, and cancel meetings and webinars, including recurring occurrences
- Manage registrants, panelists, polls, and surveys for meetings and webinars
- Retrieve cloud recordings, transcripts, and AI Companion meeting summaries
- Generate usage, participant, billing, and activity reports for an account
- Manage archive files, SIP phones, tracking fields, and TSP audio settings
- Control in-meeting settings such as waiting rooms, mute-on-entry, and host video
- Authenticate with OAuth 2.0 refresh tokens, bearer access tokens, or an API key

## Actions

The connector exposes a single client that maps to the full Zoom Meetings REST API.

| Client | Actions |
|--------|---------|
| `Client` | Meetings, Webinars, Cloud Recordings, Archive Files, Reports, Polls &amp; Surveys, Registrants, Devices, SIP Phones |

See the **[Action Reference](action-reference.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: How to create a Zoom app, configure OAuth credentials, and obtain tokens needed to authenticate the connector.

* **[Action Reference](action-reference.md)**: Full reference for all clients, with operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **Zoom Meetings** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Zoom Meetings Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-zoom.meetings)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
