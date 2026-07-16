---
title: SAP Business One CRM
---

[SAP Business One](https://www.sap.com/products/erp/business-one.html) is an enterprise resource planning (ERP) solution designed for small and midsize businesses by SAP SE. The `ballerinax/sap.businessone.crm` connector exposes the CRM objects of SAP Business One — activities, campaigns, target groups, and sales opportunities — through the [SAP Business One Service Layer](https://help.sap.com/doc/056f69366b5345a386bb8149f1700c19/10.0/en-US/Service%20Layer%20API%20Reference.html) (OData). It handles session-based authentication automatically, logging in with your company database credentials and transparently re-authenticating when the session expires.

## Key Features

- Log and query activities such as calls, meetings, tasks, and notes
- Manage marketing campaigns and cancel active campaigns
- Create and maintain target groups for campaign recipients
- Track sales opportunities, including closing and stage progression
- Configure sales opportunity competitors, interests, reasons, and sources
- Full CRUD support across all CRM entities via the OData Service Layer
- Automatic session management with `B1SESSION`/`ROUTEID` cookie handling

## Actions

The connector provides a single client for interacting with all SAP Business One CRM entities.

| Client | Actions |
|--------|---------|
| `Client` | Activities, Activity locations, recipient lists, statuses, subjects & types, Campaigns & campaign response types, Target groups, Sales opportunities, Sales stages, Sales opportunity competitor/interest/reason/source setups |

See the **[Action Reference](action-reference.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: Configure an SAP Business One installation with the Service Layer enabled and obtain the credentials needed to connect.

* **[Action Reference](action-reference.md)**: Full reference for all clients — operations, parameters, return types, and sample code.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [SAP Business One CRM Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-sap.businessone)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
