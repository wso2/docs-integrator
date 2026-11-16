---
connector: true
connector_name: "sap.s4hana.api_billing_document_srv"
title: "Overview"
description: "Read billing documents with their items, partners, pricing elements and texts, cancel billing documents and retrieve them as PDF in SAP S/4HANA Cloud with the SAP Billing Document connector."
---

# Overview

The WSO2 **SAP Billing Document connector** provides access to every operation of the SAP S/4HANA Cloud OData API `API_BILLING_DOCUMENT_SRV` (Billing Document - Read, Cancel, GetPDF), so that your integrations can work with billing documents without calling the service directly. Billing documents are the invoices, credit memos and debit memos that SAP creates when sales orders and deliveries are billed. With the connector, you can read billing documents with their items, business partners, pricing elements and texts, cancel a billing document, and retrieve a billing document in PDF format.

## Key features

- Read billing document headers with the billing type, sales area, payer, amounts, payment terms and accounting status
- Read billing document items with the material, billed quantity, net amount and the reference sales order and delivery
- Read the business partners of billing documents and billing document items by partner function
- Read the pricing elements (conditions) of billing documents and billing document items
- Read the header and item texts of billing documents by language and text ID
- Cancel a billing document, which creates a cancellation billing document that reverses it
- Retrieve a billing document in PDF format, as it looks after output
- List and filter data using OData query parameters (`$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`)
- Combine multiple requests in a single OData `$batch` call

## Actions

Actions are operations you invoke on SAP S/4HANA from your Ballerina integration. Use these actions to build billing workflows: replicate invoices and credit memos to a finance, CRM or data warehouse system, archive or email billing document PDFs to customers, and cancel billing documents when an order is reversed in an upstream system.

| Client | Actions |
|--------|---------|
| `Client` | Billing documents, items, header and item partners, header and item pricing elements, header and item texts, cancel, PDF, batch operations |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating the SAP S/4HANA Cloud communication user, the communication system and the Billing Integration (`SAP_COM_0120`) communication arrangement, and obtaining the credentials required to use the connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **SAP Billing Document** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [SAP S/4HANA Sales Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-sap.s4hana.sales)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
