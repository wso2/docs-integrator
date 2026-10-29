---
title: Overview
---

# Overview

Salesforce Data 360 (Data Cloud) is Salesforce's customer data platform. It ingests data from any source, unifies it into customer profiles through identity resolution, and computes calculated insights on those profiles. The WSO2 Salesforce Data 360 (Data Cloud) Connector (v1.0.0) gives your integrations access to the Data 360 Ingestion, Profile, Calculated Insights and Query APIs, and to the identity resolution and calculated insight runs of the Connect REST API.

## Key features

- Stream records into Data 360, delete them by primary key, and validate them against the object's schema before ingesting
- Load large data sets with bulk ingestion jobs: create a job, upload CSV files, close or abort it, and track it to completion
- Look up unified profiles and their related records, and read profile and calculated insight metadata
- Query calculated insights and read an insight's values for a single profile
- Run ANSI SQL queries over Data 360 objects and page through the results
- Start identity resolution and calculated insight runs on demand
- Authenticate with your Salesforce org credentials only: the connector obtains and renews the Data 360 token itself

## Actions

Actions are operations you invoke on Salesforce Data 360 (Data Cloud) from your integration. Use these actions for loading records, reading unified profiles and insights, running SQL queries, and starting identity resolution runs.

| Client | Actions |
|--------|---------|
| `Client` | Streaming ingestion, bulk ingestion, profiles, calculated insights, SQL queries, identity resolution and calculated insight runs |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through turning on Data 360, creating an External Client App, and obtaining the credentials required to use the connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **WSO2 Salesforce Data 360 (Data Cloud) Connector**, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [WSO2 Salesforce Data 360 (Data Cloud) Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-salesforce.datacloud)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
