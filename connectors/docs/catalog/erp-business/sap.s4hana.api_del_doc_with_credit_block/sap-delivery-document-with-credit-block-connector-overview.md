---
title: Overview
---

# Overview

SAP Delivery Document with Credit Block is an S/4HANA OData API (`API_DEL_DOC_WITH_CREDIT_BLOCK`) for outbound deliveries that SAP Credit Management has blocked because the customer's credit check failed. The Ballerina `ballerinax/sap.s4hana.api_del_doc_with_credit_block` connector enables you to read credit blocked delivery documents with their credit check statuses, run the credit check again, release or reject the credit block, and read the sales document reasons for rejection, directly from your Ballerina integration flows.

## Key features

- Read the delivery documents that are blocked by credit management, with the sold-to party, customer credit account and credit check statuses
- Read a single credit blocked delivery document by its delivery number
- Check the credit status of a delivery document again, for example after a customer payment has been posted
- Release a delivery document from its credit block so that picking and goods issue can continue
- Reject the credit block of a delivery document with a sales document reason for rejection
- Read the reasons for rejection of sales documents and their descriptions
- List and filter data using OData query parameters (`$filter`, `$select`, `$orderby`, `$top`, `$skip`, `$inlinecount`)
- Combine multiple requests in a single OData `$batch` call

## Actions

Actions are operations you invoke on SAP S/4HANA from your Ballerina integration. Use these actions to build credit release workflows: collect blocked deliveries into a credit analyst work queue or an approval app, release deliveries automatically when an external credit or payment system approves the customer, and reject deliveries that should not be shipped.

| Client | Actions |
|--------|---------|
| `Client` | Credit blocked delivery documents, credit block actions (check, release, reject), rejection reasons, batch operations |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating the SAP S/4HANA Cloud communication user, the communication system and the Sales Credit Management Integration (`SAP_COM_0325`) communication arrangement, and obtaining the credentials required to use the connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **SAP Delivery Document with Credit Block** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [SAP S/4HANA Delivery Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-sap.s4hana.delivery)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
