---
title: Overview
---

# Overview

The SAP S/4HANA Sales District connector provides programmatic access to the SAP Sales District Read API (OData v2), enabling Ballerina applications to query and retrieve sales district master data and their multilingual text descriptions from an SAP S/4HANA system. This connector supports listing, filtering, and navigating between sales district entities and their associated text translations, facilitating seamless integration with SAP sales organization structures.

## Key features

- Retrieve all sales districts from SAP S/4HANA using OData v2 queries
- Fetch individual sales district records by their unique district key
- Access multilingual sales district text descriptions across multiple languages
- Navigate between sales district entities and their associated text translations
- Filter and paginate results using OData query options (`$filter`, `$top`, `$skip`)
- Sort results with `$orderby` and retrieve inline counts with `$inlinecount`
- Expand related entities inline using OData `$expand` for efficient data retrieval
- Secure access via SAP basic authentication (username and password)

## Actions

Actions are operations you invoke on SAP S/4HANA from your integration. Use these actions for listing sales districts, retrieving specific district records, and accessing multilingual text descriptions. The SAP Sales District connector exposes these actions through a single client:

| Client | Actions |
|--------|---------|
| `Client` | Sales district listing, single-record retrieval, text translation access, OData navigation |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through configuring SAP S/4HANA access and obtaining the credentials required to use the SAP Sales District connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **SAP Sales District** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [SAP Sales District Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-sap.s4hana.api_salesdistrict_srv)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
