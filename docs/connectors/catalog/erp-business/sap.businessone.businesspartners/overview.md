---
title: SAP Business One Business Partners
---

The SAP Business One Business Partners connector provides access to the business partner master data of [SAP Business One](https://www.sap.com/products/erp/business-one.html), SAP's enterprise resource planning (ERP) solution for small and midsize businesses. It manages customers, vendors, leads, contacts, and their related setup data through the [SAP Business One Service Layer](https://help.sap.com/doc/056f69366b5345a386bb8149f1700c19/10.0/en-US/Service%20Layer%20API%20Reference.html) OData API. Authentication is session based, using a company database, user name, and password.

## Key Features

- Create, read, update, and delete business partners (customers, vendors, and leads)
- Manage contact persons associated with business partners
- Maintain business partner groups, properties, and relationships
- Configure payment terms types, priorities, and VAT exemptions
- Manage industries and sales territories
- Resolve address formats and full addresses
- Create opening balances for business partners

## Actions

The connector exposes a single client for working with SAP Business One business partner master data and its related setup entities.

| Client | Actions |
|--------|---------|
| `Client` | Business partners, contacts, business partner groups, business partner properties, relationships, payment terms types, priorities, VAT exemptions, industries, territories, address services, opening balances |

See the **[Action Reference](action-reference.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: How to configure an SAP Business One installation with the Service Layer and obtain the connection credentials.

* **[Action Reference](action-reference.md)**: Full reference for all clients — operations, parameters, return types, and sample code.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [SAP Business One Business Partners Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-sap.businessone)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
