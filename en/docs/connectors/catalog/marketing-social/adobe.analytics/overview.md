---
connector: true
connector_name: "adobe.analytics"
title: "Adobe Analytics"
description: "Overview of the ballerinax/adobe.analytics connector for WSO2 Integrator."
---

# Adobe Analytics

Adobe Analytics is a web and digital analytics platform for collecting, segmenting, and reporting on customer behavior across digital channels. The Adobe Analytics connector lets applications call the Adobe Analytics 2.0 API to run reports, manage segments and calculated metrics, browse dimensions and metrics, manage Workspace projects, and read company users and audit logs. It supports version 2.0 of the Adobe Analytics API.

## Key Features

- Run ranked, realtime, and top-item reports against report suites
- Create, validate, and manage audience segments
- Build and manage calculated metrics using built-in metric functions
- Browse the available dimensions and metrics for any report suite
- Manage Workspace projects, custom date ranges, and annotations
- Control component sharing and tagging across the company
- Read company users and usage audit logs

## Actions

The connector exposes a single client for all Adobe Analytics operations.

| Client | Actions |
|--------|---------|
| `Client` | Annotations, Calculated Metrics, Component Shares, Component Tags, Date Ranges, Dimensions, Metrics, Projects, Reports, Segments, Users, Audit Logs |

See the **[Action Reference](action-reference.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: How to create an Adobe Developer Console project, configure OAuth Server-to-Server credentials, generate an access token, and find your global company ID.

* **[Action Reference](action-reference.md)**: Full reference for all clients, with operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **Adobe Analytics** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Adobe Analytics Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-adobe.analytics)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
