---
connector: true
connector_name: "sap.s4hana.api_credit_memo_request_srv"
title: "Overview"
description: "Create, read, update and delete credit memo requests with their items, partners, pricing elements and texts, and release or reject their approval requests in SAP S/4HANA Cloud with the SAP Credit Memo Request connector."
---

# Overview

The WSO2 **SAP Credit Memo Request connector** provides access to every operation of the SAP S/4HANA Cloud OData API `API_CREDIT_MEMO_REQUEST_SRV` (Credit Memo Request (A2X)), so that your integrations can manage credit memo requests without calling the service directly.

A credit memo request is the sales document that requests a credit to a customer, for example for a price difference, a damaged shipment or a quantity discrepancy; once it is approved and its billing block is removed, SAP creates the credit memo from it in billing. With the connector, you can create, read, update and delete credit memo requests with their items, header and item partners, pricing elements and texts, read their subsequent documents, and release or reject their approval requests.

## Key features

- Create credit memo requests with their items, partners, pricing elements and texts in a single deep insert request
- Read, update and delete credit memo request headers and items
- Add, update and remove header partners and item partners
- Read, update and delete header and item pricing elements
- Read, update and delete header and item texts
- Read the subsequent documents of a credit memo request and its items, for example the credit memo created in billing
- Release or reject the approval request of a credit memo request that needs an approver's consent
- List and filter data using OData query parameters (`$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`)
- Combine multiple requests in a single OData `$batch` call

## Actions

Actions are operations you invoke on SAP S/4HANA from your Ballerina integration. Use these actions to build credit and complaint workflows: create credit memo requests from a customer service or returns system, route pending approval requests to an external approval app, and track when the credit memo is billed.

| Client | Actions |
|--------|---------|
| `Client` | Credit memo requests, items, header and item partners, header and item pricing elements, header and item texts, subsequent documents, approval requests (release, reject), batch operations |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating the SAP S/4HANA Cloud communication user, the communication system and the Credit Memo Request Integration (`SAP_COM_0158`) communication arrangement, and obtaining the credentials required to use the connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **SAP Credit Memo Request** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [SAP S/4HANA Sales Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-sap.s4hana.sales)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
