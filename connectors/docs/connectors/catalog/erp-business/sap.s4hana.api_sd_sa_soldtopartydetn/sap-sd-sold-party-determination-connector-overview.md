---
title: Overview
---

# Overview

The SAP S/4HANA SD Sold-to-Party Determination connector provides programmatic access to the `API_SD_SA_SOLDTOPARTYDETN` OData service, which manages sold-to party assignments for sales scheduling agreements. Using the Ballerina `ballerinax/sap.s4hana.api_sd_sa_soldtopartydetn` connector, you can query and retrieve delivery scheduling sold-to party determination records from SAP S/4HANA Cloud to integrate partner assignment data into your business workflows.

## Key features

- Retrieve a specific sold-to party assignment by composite key (Supplier, PartnerDescription, UnloadingPointName)
- List all delivery scheduling sold-to party determination records with OData query support
- OData filtering, sorting, pagination (`$filter`, `$orderby`, `$top`, `$skip`) for flexible data retrieval
- Select specific fields using `$select` to reduce response payload size
- Inline count support (`$inlinecount`) for result set sizing
- Batch HTTP request execution via the `$batch` endpoint for grouped operations
- Secure connectivity to SAP S/4HANA Cloud using HTTP Basic Auth over HTTPS

## Actions

Actions are operations you invoke on the SAP S/4HANA SD Sold-to-Party Determination service from your integration. Use these actions for retrieving sold-to party assignments for delivery scheduling agreements. The connector exposes actions through a single client:

| Client | Actions |
|--------|---------|
| `Client` | Sold-to party determination record retrieval, list with OData query support, batch operations |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through configuring the SAP S/4HANA Communication Arrangement for the Sold-to-Party Assignment of Sales Scheduling Agreement Integration API and obtaining the credentials required to use the connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **SAP SD Sold-to-Party Determination** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [SAP SD Sold-to-Party Determination Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-sap.s4hana.sales)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
