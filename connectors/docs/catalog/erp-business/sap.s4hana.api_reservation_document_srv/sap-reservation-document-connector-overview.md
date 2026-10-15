---
title: Overview
---

# Overview

SAP Reservation Document is an S/4HANA OData V2 (A2X) API, `API_RESERVATION_DOCUMENT_SRV`, that lets external systems work with material reservations. A reservation sets aside a quantity of material for later use, for example for a cost center, an order, a sales order, an asset or a WBS element, or for a transfer posting from one plant to another. The Ballerina `ballerinax/sap.s4hana.api_reservation_document_srv` connector enables you to create, read, and delete reservation documents and to read their items directly from your Ballerina integration flows.

## Key features

- Create reservation documents with header data and items in a single deep-insert request
- Read a single reservation document header by reservation number, optionally expanding its items
- List and filter reservation document headers using OData query parameters (`$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`)
- List reservation document items across all reservations, or only the items of a specific reservation
- Read a single reservation item by reservation number, item number and record type
- Query reservation items by material, plant, storage location and requirement date
- Delete reservation documents that are no longer needed
- Send several requests in one call through the OData `$batch` endpoint

## Actions

Actions are operations you invoke on SAP S/4HANA from your Ballerina integration. Use these actions to reserve material when an external system raises a demand, look up open reservations and their required and withdrawn quantities, and remove reservations that are no longer needed. The API does not provide an update operation.

| Client | Actions |
|--------|---------|
| `Client` | Reservation document header create, read, list and delete, reservation item read and list, batch requests |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating the SAP S/4HANA Cloud communication user, the communication system, and the Reservation Integration (`SAP_COM_0112`) communication arrangement that the connector needs.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **SAP Reservation Document** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [SAP S/4HANA Inventory Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-sap.s4hana.inventory)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
