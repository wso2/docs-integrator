---
title: Overview
---

# Overview

SAP Reservation Document (A2X) is an S/4HANA Cloud OData V4 API (service `API_RESERVATION_DOCUMENT_2`) that manages reservation documents for materials. A reservation sets aside a quantity of a material for a cost center, sales order, asset, WBS element or order, or for a transfer posting from one plant to another. The Ballerina `ballerinax/sap.s4hana.ce_apireservationdocument_0001` connector lets you create, read, update and delete reservation documents and their items directly from your Ballerina integration flows.

## Key features

- Create reservation documents with a header and inline items in a single request (deep insert)
- Add items to an existing reservation document
- Assign reservations to cost centers, sales orders, assets, WBS elements or orders, and model plant to plant transfer postings
- Read, update (PATCH) and delete reservation document headers, and read and update individual reservation items
- List and filter reservations and items with OData V4 query options (`$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$count`)
- Navigate between a reservation header and its items in both directions
- Group several requests into one call with the OData `$batch` endpoint
- Basic Auth, bearer token or OAuth 2.0 refresh token authentication

## Actions

Actions are operations you invoke on SAP S/4HANA Cloud from your Ballerina integration. Use these actions to create reservations from maintenance or project events, look up reserved quantities by plant or material, adjust item quantities and requirement dates, and clean up reservations that are no longer needed.

| Client | Actions |
|--------|---------|
| `Client` | Reservation document header CRUD, reservation item create/read/update, header and item navigation, batch requests |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating the SAP S/4HANA Cloud communication user, communication system and the Reservation Integration (`SAP_COM_0112`) communication arrangement that expose the Reservation Document (A2X) API to the connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **SAP Reservation Document (A2X)** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [SAP S/4HANA Inventory Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-sap.s4hana.inventory)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
