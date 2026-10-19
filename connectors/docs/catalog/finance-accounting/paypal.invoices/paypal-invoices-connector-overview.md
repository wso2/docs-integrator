---
title: Overview
---

# Overview

PayPal Invoicing is a service that lets merchants create, send, and manage invoices online through PayPal. The Ballerina `ballerinax/paypal.invoices` connector (v1.0.1) provides programmatic access to the PayPal Invoicing API v2, enabling you to create and manage invoices, record payments and refunds, and manage invoice templates from your Ballerina integration flows.

## Key features

- Full CRUD operations on invoices: create, read, update, and delete draft invoices
- Send invoices to recipients and send payment reminders
- Cancel sent invoices with optional recipient notification
- Record and delete external payments and refunds against invoices
- Search invoices with flexible criteria including date ranges, status, and recipient details
- Generate QR codes for invoice payment links
- Auto-generate the next sequential invoice number
- Full CRUD operations on invoice templates for reusable invoice layouts

## Actions

Actions are operations you invoke on PayPal Invoicing from your integration. Use these actions for creating invoices, sending them, recording payments, managing templates, and more. The connector exposes actions through a single client:

| Client | Actions |
|--------|---------|
| `Client` | Invoice CRUD, send/remind/cancel, payments, refunds, search, QR codes, templates |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating a PayPal Developer application and obtaining the OAuth 2.0 client credentials required to use the PayPal Invoices connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **PayPal Invoices** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [PayPal Invoices Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-paypal.invoices)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
