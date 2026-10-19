---
title: Overview
---

# Overview

Salesforce is a cloud-based CRM platform that provides tools for sales, service, marketing, and more. The Ballerina `ballerinax/salesforce` connector (v8.6.0) provides programmatic access to Salesforce through the REST API, Bulk API, SOAP API, and Change Data Capture / Platform Events, enabling you to integrate Salesforce data into your Ballerina integration flows.

## Key Features

- Full CRUD operations on Salesforce records (sObjects) using record IDs and external IDs
- SOQL query and SOSL search support for flexible data retrieval
- Bulk data operations for large datasets using Bulk API v1 (`salesforce.bulk`) and v2 (`salesforce.bulkv2`)
- Change Data Capture triggers for real-time event-driven processing of record creates, updates, deletes, and restores
- Platform Events support for publishing and subscribing to custom event channels
- Apex REST execution for custom server-side logic via the `salesforce.apex` module
- SOAP API access for lead conversion via the `salesforce.soap` module
- Metadata access, report execution, password management, and batch request operations

## Actions

Actions are operations you invoke on Salesforce from your integration, including querying records, creating opportunities, running bulk jobs, and more. The Salesforce connector exposes actions across five clients:

| Client | Actions |
|--------|---------|
| `Client` | Record CRUD, SOQL/SOSL, metadata, reports, password management, batch, invocable actions |
| `Apex Client` | Execute custom Apex REST endpoints |
| `Bulk Client` | Bulk API v1: job and batch lifecycle for CSV/JSON/XML data |
| `Bulk V2 Client` | Bulk API v2: simplified ingest and query jobs for large-scale data |
| `Soap Client` | Lead conversion via SOAP API |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Triggers

Triggers allow your integration to react to events happening in Salesforce in real time. The connector uses Salesforce Change Data Capture (CDC) and Platform Events to stream events to a `salesforce:Listener`, which invokes your service callbacks automatically, with no polling required.

Supported trigger events:

| Event | Callback | Description |
|-------|----------|-------------|
| Record created | `onCreate` | Fired when a new record is created. |
| Record updated | `onUpdate` | Fired when an existing record is modified. |
| Record deleted | `onDelete` | Fired when a record is deleted. |
| Record restored | `onRestore` | Fired when a deleted record is undeleted. |
| Platform event received | `onMessage` | Fired when a platform event is published. |

See the **[Trigger Reference](triggers.md)** for listener configuration, service callbacks, and the `EventData` payload structure.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating a Salesforce Connected App and obtaining the OAuth 2.0 credentials required to use the Salesforce connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Trigger Reference](triggers.md)**: Reference for event-driven integration using the listener and service model.

* **[Example](example.md)**: Learn how to build and configure an integration using the **Salesforce** connector, including connection setup, operation configuration, execution flow, and event-driven trigger setup.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Salesforce Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-salesforce)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
