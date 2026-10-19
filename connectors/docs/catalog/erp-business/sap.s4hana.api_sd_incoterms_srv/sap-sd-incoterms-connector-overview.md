---
title: Overview
---

# Overview

SAP SD Incoterms is part of the SAP S/4HANA Sales and Distribution module and manages master data for Incoterms classifications and versions used in trade, logistics, and procurement documents. The Ballerina `ballerinax/sap.s4hana.api_sd_incoterms_srv` connector (v1.0.0) provides read access to Incoterms data via the SAP OData API `API_SD_INCOTERMS_SRV`, enabling integration workflows to look up standardized trade terms and retrieve their multilingual descriptions from an SAP S/4HANA Cloud system.

## Key features

- List all Incoterms classifications with OData filtering, sorting, and pagination support
- Retrieve a specific Incoterms classification by its key code
- Access multilingual text descriptions for Incoterms classifications in any supported SAP language
- List all language descriptions for a specific Incoterms classification via navigation property
- Retrieve all Incoterms versions and their identifiers
- Fetch a specific Incoterms version by its version code
- Query Incoterms version texts by version and language for localized display
- Execute OData `$batch` requests to combine multiple read operations into a single HTTP call

## Actions

Actions are operations you invoke on the SAP S/4HANA system from your integration. Use these actions for listing Incoterms classifications, fetching multilingual descriptions, querying version data, and more. The SAP SD Incoterms connector exposes all actions through a single client:

| Client | Actions |
|--------|---------|
| `Client` | Incoterms classifications, classification texts, Incoterms versions, version texts, batch operations |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating the required Communication User, Communication System, and Communication Arrangement in SAP S/4HANA Cloud to obtain the credentials needed for the SAP SD Incoterms connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **SAP SD Incoterms** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [SAP SD Incoterms Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-sap.s4hana.api_sd_incoterms_srv)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
