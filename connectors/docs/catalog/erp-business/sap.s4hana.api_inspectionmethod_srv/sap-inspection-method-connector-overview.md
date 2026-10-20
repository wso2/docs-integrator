---
title: Overview
---

# Overview

SAP Inspection Method is an S/4HANA OData API (`API_INSPECTIONMETHOD_SRV`) that exposes read-only quality management master data. An inspection method is a master data record that describes the procedure for performing the quality inspection of a characteristic, and it is maintained per plant and in versions. The Ballerina `ballerinax/sap.s4hana.api_inspectionmethod_srv` connector enables you to read inspection methods with their validity, status, inspector qualification and administrative data, together with their short texts in each maintained language, directly from your Ballerina integration flows.

## Key features

- Read inspection methods by inspection method, version and plant
- Read the valid-from date, master record status, search field and additional information lines of each method
- Read the QM authorization group and the inspector qualification required to perform the inspection
- Read administrative data: who created and last changed each method, and when
- Read the language-dependent short texts of inspection methods and whether a long text exists
- Navigate between inspection methods and their texts using OData associations
- List and filter inspection methods using OData query parameters (`$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`)
- Combine multiple read requests in a single OData `$batch` call

## Actions

Actions are operations you invoke on SAP S/4HANA from your Ballerina integration. The Inspection Method API is read-only, so use these actions for replicating inspection methods to laboratory information management systems (LIMS) or other quality systems, showing inspection procedures to inspectors in their language, and checking which methods are released and valid in a plant.

| Client | Actions |
|--------|---------|
| `Client` | Inspection methods, inspection method texts, batch operations |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating the SAP S/4HANA Cloud communication user, the communication system and the Inspection Master Data Integration (`SAP_COM_0110`) communication arrangement, and obtaining the credentials required to use the connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **SAP Inspection Method** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [SAP S/4HANA Quality Management Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-sap.s4hana.qm)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
