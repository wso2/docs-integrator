---
connector: true
connector_name: "docusign.monitor"
title: "DocuSign Monitor"
description: "Overview of the ballerinax/docusign.monitor connector for WSO2 Integrator."
---

# DocuSign Monitor

The DocuSign Monitor connector integrates with the [DocuSign Monitor API](https://developers.docusign.com/docs/monitor-api/) to provide security and compliance teams with real-time visibility into organization activity. It exposes the continuous event stream of a Docusign organization, allowing applications to read and page through events such as sign-ins, envelope actions, and permission changes using a cursor-based model.

## Key Features

- Read the real-time event stream of a Docusign organization
- Page through the stream with a cursor for reliable, resumable reads
- Control page size to balance throughput and latency
- Inspect event details including the action performed and its result
- Examine the user, IP address, browser, operating system, and device for each event
- Retrieve geographic location data resolved from the event's IP address
- Identify the affected user and the integrator key of the application that triggered the event
- Access raw event data for custom processing and audit pipelines

## Actions

The connector provides a single client for reading the organization event stream.

| Client | Actions |
|--------|---------|
| `Client` | Read event stream, cursor-based pagination |

See the **[Action Reference](action-reference.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: How to create a Docusign integration key, obtain OAuth 2.0 tokens, and locate your organization ID.

* **[Action Reference](action-reference.md)**: Full reference for all clients, with operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **DocuSign Monitor** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [DocuSign Monitor Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-docusign.monitor)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
