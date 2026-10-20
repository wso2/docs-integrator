---
title: Overview
---

# Overview

SAP Inspection Lot is an S/4HANA OData API (`API_INSPECTIONLOT_SRV`) for the quality inspection process. An inspection lot is a request to inspect a specific quantity of a material, for example a goods receipt from a supplier or the output of a production order; it carries the operations and inspection characteristics to be checked, the results recorded against them and, at the end, the usage decision that accepts or rejects the lot. The Ballerina `ballerinax/sap.s4hana.api_inspectionlot_srv` connector enables you to read and update inspection lots, record inspection results, maintain inspection points, make usage decisions and post the related stock, directly from your Ballerina integration flows.

## Key features

- Read, create and update inspection lots, including their header data, quantities, origin and system statuses
- Read the inspection operations and inspection characteristics of a lot, with target values and specification limits
- Record summarized inspection results and single result values (measured values, defects and valuations) for inspection characteristics
- Create and update inspection points and their summarized results, and trigger the automatic valuation of an inspection point
- Create and update usage decisions that accept or reject an inspection lot
- Post inspection lot stock (material document items) and read the serial numbers posted with it
- List and filter data using OData query parameters (`$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`)
- Combine multiple requests in a single OData `$batch` call

## Actions

Actions are operations you invoke on SAP S/4HANA from your Ballerina integration. Use these actions to connect laboratory information systems (LIMS), measuring equipment or supplier quality portals to SAP quality management: pick up new inspection lots as goods arrive, send back measured values and valuations, close lots with a usage decision and post the inspected stock to unrestricted, blocked or scrap stock.

| Client | Actions |
|--------|---------|
| `Client` | Inspection lots, inspection lot status, inspection operations, inspection characteristics, inspection results, single result values, inspection points, inspection point characteristics and results, usage decisions, stock postings, serial numbers, batch operations |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating the SAP S/4HANA Cloud communication user, the communication system and the Quality Inspection Process Integration (`SAP_COM_0318`) communication arrangement, and obtaining the credentials required to use the connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **SAP Inspection Lot** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [SAP S/4HANA Quality Management Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-sap.s4hana.qm)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
