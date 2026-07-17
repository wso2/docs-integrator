---
title: SAP Business One Administration
---

[SAP Business One](https://www.sap.com/products/erp/business-one.html) is an enterprise resource planning (ERP) solution designed for small and midsize businesses by SAP SE. The `ballerinax/sap.businessone.administration` connector provides access to the administration and setup objects of SAP Business One — users, user groups, approval procedures, alerts, queries, countries, currencies, and Web Client settings — through the [SAP Business One Service Layer](https://help.sap.com/doc/056f69366b5345a386bb8149f1700c19/10.0/en-US/Service%20Layer%20API%20Reference.html) (OData) API.

## Key Features

- Manage users, user groups, permissions, and user default settings
- Configure approval templates, stages, and requests
- Maintain general setup data such as countries, counties, states, branches, and departments
- Manage saved SQL views, SQL queries, and user queries
- Administer Web Client settings including dashboards, launchpads, form settings, and preferences
- Configure alerts, event notifications, subscriptions, and messages
- Access company-level services such as finance periods, currency rates, and server information
- Manage numbering series, report layouts, and holiday calendars

## Actions

The connector exposes a single client for all administration and setup operations against the SAP Business One Service Layer.

| Client | Actions |
|--------|---------|
| `Client` | Users, user groups & permissions; approval requests, stages & templates; alerts, event notifications & subscriptions; countries, counties, states & currencies; branches, business places & departments; SQL views, SQL queries & user queries; Web Client dashboards, launchpads, form settings & preferences; company services, finance periods, numbering series & report layouts |

See the **[Action Reference](action-reference.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: How to prepare an SAP Business One installation with the Service Layer component enabled and obtain the connection details required by the connector.

* **[Action Reference](action-reference.md)**: Full reference for all clients — operations, parameters, return types, and sample code.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [SAP Business One Administration Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-sap.businessone)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
