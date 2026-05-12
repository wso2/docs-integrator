---
title: Overview
---

# Overview

SAP Sales Area is a core organizational unit in SAP S/4HANA Sales and Distribution that defines the combination of Sales Organization, Distribution Channel, and Division used for sales transactions. The Ballerina `ballerinax/sap.s4hana.salesarea_0001` connector provides programmatic access to the SAP S/4HANA Sales Area OData API (srvd_a2x/sap/salesarea/0001), enabling you to retrieve and query sales area master data within your integration flows.

## Key features

- Retrieve a specific Sales Area record by its composite key (Sales Organization, Distribution Channel, Division)
- List all Sales Area records with support for OData query options (`$filter`, `$orderby`, `$skip`, `$top`, `$count`, `$select`)
- Execute OData batch operations to combine multiple read requests in a single HTTP call
- HTTP Basic Authentication support using SAP S/4HANA user credentials
- Configurable HTTP client settings including timeouts, retry, circuit breaker, and secure socket
- Built-in observability support for monitoring connector operations

## Actions

Actions are operations you invoke on SAP S/4HANA from your integration. Use these actions to query the list of Sales Areas, fetch a specific Sales Area by its key, and execute batch OData requests.

| Client | Actions |
|--------|---------|
| `Client` | Sales Area retrieval by key, collection listing with OData filters, batch operations |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through enabling the SAP Sales Area OData API on your SAP S/4HANA system and obtaining the credentials needed to use the connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **SAP Sales Area** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [SAP Sales Area Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-sap.s4hana.salesarea_0001)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
