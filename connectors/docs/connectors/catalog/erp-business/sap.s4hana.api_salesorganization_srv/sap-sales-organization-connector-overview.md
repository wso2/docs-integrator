---
title: Overview
---

# Overview

SAP Sales Organization is an SAP S/4HANA OData v2 service that provides read access to sales organization master data, including organizational units, company code assignments, intercompany billing settings, and multilingual name texts. The Ballerina `ballerinax/sap.s4hana.api_salesorganization_srv` connector (v1.0.0) enables Ballerina integration flows to query and retrieve this reference data from SAP S/4HANA systems using Basic authentication over HTTPS.

## Key features

- Retrieve a single sales organization record by its key (`SalesOrganization` ID)
- List all sales organization records with OData filtering, ordering, and pagination (`$filter`, `$orderby`, `$top`, `$skip`)
- Expand related text entities inline using the `$expand` query option
- Retrieve multilingual sales organization name texts by sales organization and language key
- List all sales organization text records with filtering, ordering, and pagination
- Navigate from a text record back to its parent sales organization entity
- Select specific fields via `$select` to reduce payload size
- Inline count support via `$inlinecount` for result set size awareness

## Actions

Actions are operations you invoke on SAP S/4HANA from your integration. Use these actions for listing sales organizations, retrieving individual records by key, and navigating related text entities. All operations are read-only OData v2 GET requests exposed through a single client:

| Client | Actions |
|--------|---------|
| `Client` | Sales organization lookup, listing, text retrieval, and OData navigation |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through obtaining the SAP S/4HANA connection details and credentials required to use the SAP Sales Organization connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **SAP Sales Organization** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [SAP Sales Organization Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-sap.s4hana.api_salesorganization_srv)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
