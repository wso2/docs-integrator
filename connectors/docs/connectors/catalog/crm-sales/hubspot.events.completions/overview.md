---
title: HubSpot Events Completions Overview
---

# HubSpot Events Completions

The HubSpot Events Completions connector provides Ballerina bindings for the HubSpot Events Send API v3, enabling external systems to report custom behavioral event occurrences directly to HubSpot. Using this connector, applications can keep HubSpot workflows, reporting dashboards, and CRM contact timelines synchronized with real-world activity that happens outside of HubSpot — such as purchases, sign-ups, or page views recorded in your own backend.

## Key features

- Send a single custom event occurrence to HubSpot in real time
- Send a batch of up to 500 event occurrences in a single API call
- Associate events with CRM contacts via email address, user token, or object ID
- Attach arbitrary custom properties to each event occurrence
- Support for both Bearer Token (Service Key) and OAuth 2.0 refresh token authentication
- Configure timestamps on past events with the `occurredAt` field for back-filling historical data

## Actions

The connector exposes a single client for interacting with the HubSpot Events Send API.

| Client | Actions |
|--------|---------|
| `Client` | Send single events, Send batched events |

See the **[Action Reference](action-reference.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: How to create a HubSpot Service Key with the required behavioral events scope and define the custom events you want to report.

* **[Action Reference](action-reference.md)**: Full reference for all clients — operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **HubSpot Events Completions** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [HubSpot Events Completions Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-hubspot.events.completions)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
