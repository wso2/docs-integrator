---
title: Overview
---

# Overview

SAP Purchasing Info Record is an SAP S/4HANA OData V2 API (`API_INFORECORD_PROCESS_SRV`) that stores the purchasing terms agreed with a supplier for a material, such as prices, delivery times and order quantities. The Ballerina `ballerinax/sap.s4hana.api_inforecord_process_srv` connector enables you to create, read and update purchasing info records, their purchasing organization and plant data, purchase order texts and pricing conditions directly from your Ballerina integration flows.

## Key features

- Create, read and update purchasing info records (general data) for supplier and material combinations
- Maintain purchasing organization and plant data, including net price, currency, purchasing group and planned delivery time
- Create, read, update and delete the purchase order texts of an info record
- Read and update pricing conditions, and create them together with their validity periods
- Manage supplementary conditions (such as discounts and surcharges) and quantity-based condition scales
- Create nested records in a single request, for example an info record with its organization and plant data
- List and filter entities using OData query parameters (`$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`)
- Navigate between related entities, for example from a condition validity to its info record or pricing condition

## Actions

Actions are operations you invoke on SAP S/4HANA from your Ballerina integration. Use these actions to look up the purchasing terms agreed with a supplier, keep info record prices in sync with external sourcing or contract systems, and maintain the conditions, validities and scales that drive purchase order pricing.

| Client | Actions |
|--------|---------|
| `Client` | Purchasing info records, organization and plant data, purchase order texts, pricing conditions, condition validities, supplementary conditions, condition scales, navigation |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating the SAP S/4HANA Cloud communication user, communication system and the Purchasing Info Record Integration (`SAP_COM_0145`) communication arrangement that the connector needs.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **SAP Purchasing Info Record** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [SAP S/4HANA Sourcing & Procurement Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-sap.s4hana.procurement)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
