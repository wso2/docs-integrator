---
title: Overview
---

# Overview

SAP Quality Info Record is an SAP S/4HANA OData V2 API (`API_QUALITYINFORECORD_SRV`) for quality management in procurement. A quality info record controls how a material from a specific supplier is released and inspected, for example the quantity released for delivery, procurement blocks, source inspection settings, certificate control and production part approval (PPAP) status. A first article inspection records the inspection of the first delivery of a material against a purchase order item. The Ballerina `ballerinax/sap.s4hana.api_qualityinforecord_srv` connector enables you to create, read, update and delete quality info records and their first article inspections directly from your Ballerina integration flows.

## Key features

- Create, read, update and delete quality info records for supplier, material and plant combinations
- Maintain release data such as the release validity date, released quantity and whether the release quantity is active
- Block procurement functions for a supplier and material, with a blocking reason
- Maintain supplier quality settings, including the supplier's QM system and certification validity, certificate receipt control and source inspection lead time
- Track production part approval (PPAP) requirements, identifiers, levels and statuses
- Create, read, update and delete first article inspections linked to purchase order items
- Navigate between quality info records and their first article inspections, and create both in a single request
- List and filter records using OData query parameters (`$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`)

## Actions

Actions are operations you invoke on SAP S/4HANA from your Ballerina integration. Use these actions to synchronize supplier quality approvals from a supplier quality or PLM system, block or release procurement of a material from a supplier when a quality issue is raised, and record the results of first article inspections for new parts.

| Client | Actions |
|--------|---------|
| `Client` | Quality info records, first article inspections, navigation, batch operations |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating the SAP S/4HANA Cloud communication user, the communication system and the Quality Info Record Integration (`SAP_COM_0358`) communication arrangement, and obtaining the credentials required to use the connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **SAP Quality Info Record** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [SAP S/4HANA Quality Management Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-sap.s4hana.qm)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
