---
title: SAP Business One Production
---

[SAP Business One](https://www.sap.com/products/erp/business-one.html) is an enterprise resource planning (ERP) solution designed for small and midsize businesses by SAP SE. The `ballerinax/sap.businessone.production` connector integrates with the production and MRP objects of SAP Business One — bills of materials, production orders, resources, and forecasts — through the [SAP Business One Service Layer](https://help.sap.com/doc/056f69366b5345a386bb8149f1700c19/10.0/en-US/Service%20Layer%20API%20Reference.html) OData API. It authenticates using the Service Layer's session protocol and transparently manages the session lifecycle.

## Key Features

- Manage bills of materials (product trees) and their stages and lines
- Create, update, cancel, and query production orders
- Maintain resources, resource groups, and resource properties
- Work with resource capacities, including filtered capacity queries
- Configure routing stages and run routing date calculations
- Manage MRP sales forecasts
- Full OData query support (`$filter`, `$select`, `$expand`, paging, and inline counts)

## Actions

The connector exposes a single client for all production and MRP operations against the SAP Business One Service Layer.

| Client | Actions |
|--------|---------|
| `Client` | Product Trees (BOM), Production Orders, Resources, Resource Capacities, Resource Groups, Resource Properties, Route Stages, Routing Date Calculation, Sales Forecasts |

See the **[Action Reference](action-reference.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: How to prepare your SAP Business One installation and gather the credentials needed to connect to the Service Layer.

* **[Action Reference](action-reference.md)**: Full reference for all clients — operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **SAP Business One Production** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [SAP Business One Production Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-sap.businessone)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
