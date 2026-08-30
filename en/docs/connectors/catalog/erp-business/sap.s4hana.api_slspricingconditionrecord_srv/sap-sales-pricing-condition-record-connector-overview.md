---
title: "Overview"
---

# Overview

SAP Sales Pricing Condition Record is an S/4HANA OData (Pricing Data Integration) API that provides programmatic access to pricing condition records used in sales order pricing. The `ballerinax/sap.s4hana.api_slspricingconditionrecord_srv` connector enables you to create, read, update, and delete condition records, their validity periods, pricing scales, condition supplements, and description texts directly from your integration flows.


## Key features

- Full CRUD operations on pricing condition records and their sub-entities (validity, scales, supplements, texts)
- List and filter condition records using OData query parameters (`$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`)
- Manage condition record validity periods, including start and end dates
- Pricing scale management for quantity- and value-based scale pricing
- Condition supplement management for additional pricing conditions layered on a base record
- Description text management for condition records and condition supplements, per language
- Navigate between condition records and their sub-entities using OData navigation properties
- Batch operations (`$batch`) to create, update, and read multiple pricing entities in a single round trip

## Actions

Actions are operations you invoke on SAP S/4HANA from your integration. Use these actions for listing and filtering condition records, publishing new pricing data, updating existing records, and managing sub-entities such as validity periods, pricing scales, condition supplements, and texts.


| Client | Actions |
|--------|---------|
| `Client` | Condition record CRUD, validity, pricing scales, condition supplements, description texts, batch operations |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through configuring an SAP S/4HANA Communication Arrangement to expose the Condition Record for Pricing in Sales API and obtaining the credentials required by the connector.


* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **SAP Sales Pricing Condition Record** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [SAP Sales Pricing Condition Record Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-sap.s4hana.sales)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
