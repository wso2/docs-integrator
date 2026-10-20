---
title: Overview
---

# Overview

SAP Inspection Plan is an S/4HANA OData API (`API_INSPECTIONPLAN_SRV`) for the quality management master data that describes how a quality inspection of one or more materials takes place: the sequence of inspection operations, the inspection characteristics checked in each operation and the specifications (target values and tolerance limits) they are checked against. The Ballerina `ballerinax/sap.s4hana.api_inspectionplan_srv` connector enables you to create, read, update and delete inspection plan headers, the materials assigned to a plan, operations, inspection characteristics, dependent characteristic specifications and production resources/tools (PRTs) such as test equipment, directly from your Ballerina integration flows.

## Key features

- Create, read, update and delete inspection plan headers with their plant, task list usage, status, lot size range and dynamic modification rule
- Assign materials to an inspection plan per plant, optionally restricted to a supplier or customer
- Maintain the inspection operations of a plan with their work center, control key and result recording settings
- Maintain the inspection characteristics of each operation, with references to master inspection characteristics, inspection methods, sampling procedures and quantitative specifications (target value, upper and lower limits)
- Maintain dependent characteristic specifications that apply different specifications per material, supplier or customer
- Assign production resources/tools, such as test equipment, to inspection operations
- List and filter master data using OData query parameters (`$filter`, `$select`, `$orderby`, `$top`, `$skip`, `$inlinecount`)
- Combine multiple requests in a single OData `$batch` call

## Actions

Actions are operations you invoke on SAP S/4HANA from your Ballerina integration. Use these actions to migrate inspection plans from a legacy quality system, keep inspection specifications in sync with a product lifecycle management (PLM) or laboratory information management system (LIMS), and give shop floor or supplier quality applications read access to the operations and characteristics they must inspect.

| Client | Actions |
|--------|---------|
| `Client` | Inspection plans, material assignments, operations, inspection characteristics, dependent characteristic specifications, production resources/tools, batch operations |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating the SAP S/4HANA Cloud communication user, the communication system and the Inspection Master Data Integration (`SAP_COM_0110`) communication arrangement, and obtaining the credentials required to use the connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **SAP Inspection Plan** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [SAP S/4HANA Quality Management Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-sap.s4hana.qm)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
