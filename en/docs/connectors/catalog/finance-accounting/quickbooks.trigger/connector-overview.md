---
title: "Overview"
description: "Reference for the QuickBooks Online webhook listener and service callbacks: receive invoice, customer, payment and other accounting entity events in Ballerina integrations."
keywords: [quickbooks, webhook listener, quickbooks webhooks, event handler, ballerina]
---

# Overview

QuickBooks Online is an accounting platform for small and medium businesses. The `ballerinax/quickbooks.trigger` package lets an integration react to changes in a QuickBooks Online company as they happen: it provides a webhook listener that verifies each delivery and calls your service callbacks when invoices, customers, payments, bills and 27 other accounting entities change.

## Key features

- Receives 108 QuickBooks events across 31 service types, one per accounting entity
- Verifies every delivery with the app's webhook verifier token
- Handles QuickBooks' batched CloudEvents deliveries, calling a callback for each event
- Acknowledges each delivery before running your handler, so a slow handler doesn't cause retries

## Triggers

Triggers allow your integration to react to QuickBooks activity in real time. The `ballerinax/quickbooks.trigger` package provides a webhook listener that verifies each delivery from QuickBooks with the webhook verifier token and calls your service callbacks. It covers 108 events through 31 service types.

Commonly used service types:

| Service type | Callbacks |
|--------------|-----------|
| `BillService` | `onBillCreated`, `onBillUpdated`, `onBillDeleted` |
| `CustomerService` | `onCustomerCreated`, `onCustomerUpdated`, `onCustomerDeleted`, `onCustomerMerged` |
| `EstimateService` | `onEstimateCreated`, `onEstimateUpdated`, `onEstimateDeleted`, `onEstimateEmailed` |
| `InvoiceService` | `onInvoiceCreated`, `onInvoiceUpdated`, `onInvoiceDeleted`, `onInvoiceVoided`, `onInvoiceEmailed` |
| `ItemService` | `onItemCreated`, `onItemUpdated`, `onItemDeleted`, `onItemMerged` |
| `PaymentService` | `onPaymentCreated`, `onPaymentUpdated`, `onPaymentDeleted`, `onPaymentVoided`, `onPaymentEmailed` |
| `VendorService` | `onVendorCreated`, `onVendorUpdated`, `onVendorDeleted`, `onVendorMerged` |

See the **[Trigger Reference](triggers.md)** for listener configuration, every service type and callback, and the event payload structure, and the [QuickBooks](product://integrator/develop-and-test/integration-artifacts/event-driven-integration/quickbooks) guide to build a QuickBooks event integration in WSO2 Integrator.

## Documentation

* **[Setup Guide](setup-guide.md)**: Set up QuickBooks to send webhook events to your integration.

* **[Trigger Reference](triggers.md)**: Listener configuration, every service type and callback, and the event payload types.

* **[Example](example.md)**: Build a QuickBooks event integration in WSO2 Integrator.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this package, please create a pull request in the following repository.

* [QuickBooks Trigger GitHub repository](https://github.com/ballerina-platform/module-ballerinax-quickbooks.trigger)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.

## What's next

- [Setup Guide](setup-guide.md): point QuickBooks at your listener
- [Trigger Reference](triggers.md): every service type, callback and payload type
- [Example](example.md): build a QuickBooks event integration in WSO2 Integrator
