---
title: Overview
---

# Overview

SAP S/4HANA Sales Inquiry (API_SALES_INQUIRY_SRV) is an OData v2 service for reading and managing pre-sales inquiry documents in SAP S/4HANA's Sales and Distribution module. The Ballerina `ballerinax/sap.s4hana.api_sales_inquiry_srv` connector provides typed access to inquiry headers, line items, business partners, and pricing elements, enabling seamless integration of SAP pre-sales data into Ballerina workflows.

## Key features

- Retrieve and list sales inquiry header documents with full OData query support ($filter, $orderby, $top, $skip, $select, $expand)
- Access individual sales inquiry line items including requested quantities, materials, and net amounts
- Navigate from any child entity (item, partner, pricing element) back to its parent inquiry header
- List and read business partner assignments at both the header and item level
- List and read condition-level pricing elements for header and item pricing procedures
- Execute batch OData requests to combine multiple reads in a single round-trip
- Credential-based authentication (username/password) aligned with SAP system user authorizations

## Actions

Actions are operations you invoke on the SAP S/4HANA Sales Inquiry OData service from your integration. Use these actions for listing inquiry documents, retrieving pricing details, reading partner assignments, and more. All actions are exposed through a single `Client`.

| Client | Actions |
|--------|---------|
| `Client` | Sales inquiry CRUD reads, item retrieval, partner lookups, pricing element access, batch operations |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through obtaining SAP S/4HANA system access and enabling the API_SALES_INQUIRY_SRV OData service so you can connect the Ballerina connector to your SAP landscape.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **SAP Sales Inquiry** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [SAP Sales Inquiry Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-sap.s4hana.api_sales_inquiry_srv)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
