---
title: SAP Signavio
---

[SAP Signavio](https://www.signavio.com/) is SAP's business process transformation suite for modeling, analyzing, and improving business processes. The `ballerinax/sap.signavio` connector provides a unified client for the SAP Signavio REST APIs, covering Process Manager (Dictionary, Directory, Model, Import and Export, Search), Process Intelligence (Ingestion and SIGNAL Engine OData), Process Governance Analytics, Journey Modeler Metrics, and Process Transformation Manager (Initiatives, Assets, Insights, and Objectives).

## Key Features

- Manage dictionary entries and categories that define your organization's shared business glossary
- Browse, create, move, rename, and publish items in the Process Manager workspace directory
- Export process models and revisions as diagram JSON, PNG, SVG, BPMN 2.0 XML, or DMN XML, and import BPMN 2.0 XML
- Upload schema and data for Process Intelligence ingestion, and track the resulting execution status
- Create and manage Transformation Manager initiatives, assets, and insights, and look up objectives
- Add automatic measurements to Journey Modeler metrics
- Search across the workspace by content type
- Query the SIGNAL Engine OData API for process intelligence data, using a separate OData access token
- Transparent dual authentication — the client obtains and holds both the API gateway JWT and the Process Manager workspace session for its lifetime

## Actions

The connector exposes a single client for interacting with the SAP Signavio APIs.

| Client | Actions |
|---|---|
| [`Client`](action-reference.md#client) | Manages SAP Signavio dictionary entries, directories, models, ingestion, transformation manager initiatives/assets/insights/objectives, journey modeler metrics, search, and SIGNAL Engine OData access. |

## Documentation

- [Setup Guide](setup-guide.md) - Get SAP Signavio credentials
- [Action Reference](action-reference.md) - Available operations

## How to contribute

Contribute to the connector's development on GitHub: [module-ballerinax-sap.signavio](https://github.com/ballerina-platform/module-ballerinax-sap.signavio).
