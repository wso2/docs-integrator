---
connector: true
connector_name: "power.bi"
title: "Power Bi"
description: "Overview of the ballerinax/power.bi connector for WSO2 Integrator."
---

# Power BI

Power BI is Microsoft's business analytics service for building interactive reports and dashboards on top of shared datasets. The Power BI connector integrates with version 1.0 of the Power BI REST API, letting applications manage workspaces, datasets, reports, dashboards, dataflows, gateways, deployment pipelines, and scorecards. It supports both delegated (user) access and service principal access via Microsoft Entra ID OAuth 2.0 tokens.

## Key Features

- Create and manage push datasets, push rows into them, and run DAX queries for analytics
- Trigger, schedule, and monitor dataset and dataflow refreshes, including enhanced async refreshes
- Import, clone, rebind, and export reports in multiple file formats
- Create and manage dashboards and their tiles, including cloning tiles across workspaces
- Manage workspace users, capacity assignments, and dataflow storage settings
- Bind datasets and paginated reports to on-premises data gateways
- Generate embed tokens for secure embedding of reports, dashboards, tiles, and datasets
- Run deployment pipelines and perform tenant-wide admin operations including activity event retrieval and workspace scans

## Actions

The Power BI connector exposes a single client that covers all REST API operations, organized across datasets, reports, dashboards, workspaces, imports, gateways, dataflows, capacities, pipelines, and admin endpoints.

| Client | Actions |
|--------|---------|
| `Client` | Dataset management, DAX query execution, report import and export, dashboard and tile management, workspace and user management, refresh scheduling and monitoring, gateway binding, embed token generation, deployment pipeline operations, tenant admin operations |

See the **[Action Reference](action-reference.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: How to register a Microsoft Entra ID application, grant Power BI API permissions, create a client secret, and obtain an access token for the connector.

* **[Action Reference](action-reference.md)**: Full reference for all clients, with operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **Power Bi** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Power Bi Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-power.bi)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
