---
title: Overview
---

# Overview

SAP Sales Quotation is an SAP S/4HANA OData v2 service (API_SALES_QUOTATION_SRV) for managing the full lifecycle of sales quotations in the Sales & Distribution module. The Ballerina `ballerinax/sap.s4hana.api_sales_quotation_srv` connector provides programmatic access to create, read, update, and delete sales quotation headers, line items, partners, pricing elements, texts, and related objects, as well as navigate process flow documents and trigger approval workflow actions.

## Key features

- Full CRUD operations on sales quotation headers and line items
- Header- and item-level partner management (sold-to, ship-to, bill-to, payer, and custom partner functions)
- Pricing element access and modification for both header-level and item-level condition records
- Text object management for reading and updating long-text fields on quotation headers and items
- Related object associations for linking quotations to external CRM leads, opportunities, or other documents
- Process flow navigation to retrieve preceding documents (e.g., inquiries) and subsequent documents (e.g., sales orders) in the SD cycle
- Approval workflow actions to release or reject outstanding approval requests on a quotation
- Batch operation support for grouping multiple OData sub-requests into a single $batch call

## Actions

Actions are operations you invoke on the SAP S/4HANA system from your integration. Use these actions for reading quotation headers, creating items, updating pricing conditions, and triggering approval workflows. All operations are exposed through a single client:

| Client | Actions |
|--------|---------|
| `Client` | Sales quotation header CRUD, item CRUD, partner management, pricing elements, texts, related objects, process flow navigation, approval actions, batch |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through enabling the SAP Sales Quotation OData service in your SAP S/4HANA system and obtaining the credentials required to connect the Ballerina connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **SAP Sales Quotation** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [SAP Sales Quotation Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-sap.s4hana.api_sales_quotation_srv)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
