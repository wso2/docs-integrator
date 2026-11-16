---
connector: true
connector_name: "sap.s4hana.api_debit_memo_request_srv"
title: "Overview"
description: "Create, read, update and delete debit memo requests with their items, partners, pricing elements and texts in SAP S/4HANA Cloud with the SAP Debit Memo Request connector."
---

# Overview

The WSO2 **SAP Debit Memo Request connector** provides access to every operation of the SAP S/4HANA Cloud OData API `API_DEBIT_MEMO_REQUEST_SRV` (Debit Memo Request (A2X)), so that your integrations can manage debit memo requests without calling the service directly. A debit memo request is the sales document that requests an additional charge to a customer, for example when goods were invoiced at too low a price or a surcharge was not billed; after it is approved, SAP creates the debit memo from it in billing. With the connector, you can create, read, update and delete debit memo requests with their items, partners, pricing elements and texts, and read their subsequent documents.

## Key features

- Create debit memo requests with a deep insert of the header together with items, partners, pricing elements and texts, with or without reference to a preceding document such as a billing document
- Read, update and delete debit memo request headers and items, for example to change the order reason or remove a billing block
- Add items to an existing debit memo request
- Add, read, update and delete business partners at header and item level, such as the sold-to party, ship-to party, bill-to party and payer
- Read, update and delete header and item pricing elements (conditions)
- Read, update and delete header and item texts
- Read the subsequent documents of a debit memo request and its items, such as the debit memo created in billing
- List and filter data using OData query parameters (`$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`)
- Combine multiple requests in a single OData `$batch` call

## Actions

Actions are operations you invoke on SAP S/4HANA from your Ballerina integration. Use these actions to automate the debit side of billing corrections: create debit memo requests from a claims, pricing or contract management system, release them for billing by removing the billing block once they are approved, and track the debit memos that SAP creates from them.

| Client | Actions |
|--------|---------|
| `Client` | Debit memo requests, items, header and item partners, header and item pricing elements, header and item texts, subsequent process flow, batch operations |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating the SAP S/4HANA Cloud communication user, the communication system and the Debit Memo Request Integration (`SAP_COM_0159`) communication arrangement, and obtaining the credentials required to use the connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **SAP Debit Memo Request** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [SAP S/4HANA Sales Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-sap.s4hana.sales)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
