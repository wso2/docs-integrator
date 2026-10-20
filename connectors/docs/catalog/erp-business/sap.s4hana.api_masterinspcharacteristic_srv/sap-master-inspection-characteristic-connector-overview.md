---
title: Overview
---

# Overview

SAP Master Inspection Characteristic is an S/4HANA OData API (`API_MASTERINSPCHARACTERISTIC_SRV`) that exposes read-only access to master inspection characteristics. A master inspection characteristic is a quality management master data record that describes what is inspected for a material, for example a length, a weight or a visual check, together with its specification limits, unit of measure and control indicators. The Ballerina `ballerinax/sap.s4hana.api_masterinspcharacteristic_srv` connector enables you to read master inspection characteristics and their language-dependent texts directly from your Ballerina integration flows.

## Key features

- Read master inspection characteristics by characteristic, version and plant
- Read quantitative settings such as target value, lower and upper specification limits, plausibility limits, decimal places and unit of measure
- Read control indicators, for example whether measured values must be recorded, whether the inspection is destructive or whether test equipment is required
- Read the status, validity date and change history (created by, changed by and dates) of each characteristic
- Read the language-dependent texts of master inspection characteristics and navigate between characteristics and texts
- List and filter characteristics using OData query parameters (`$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`)
- Combine multiple read requests in a single OData `$batch` call

## Actions

Actions are operations you invoke on SAP S/4HANA from your Ballerina integration. The Master Inspection Characteristic API is read-only, so use these actions for replicating quality inspection criteria to laboratory information systems (LIMS), manufacturing execution systems or supplier quality portals, and for looking up the specification limits that an inspection result must meet.

| Client | Actions |
|--------|---------|
| `Client` | Master inspection characteristics, master inspection characteristic texts, batch operations |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating the SAP S/4HANA Cloud communication user, the communication system and the Inspection Master Data Integration (`SAP_COM_0110`) communication arrangement, and obtaining the credentials required to use the connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **SAP Master Inspection Characteristic** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [SAP S/4HANA Quality Management Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-sap.s4hana.qm)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
