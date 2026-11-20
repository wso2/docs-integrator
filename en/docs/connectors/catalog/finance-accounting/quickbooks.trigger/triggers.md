---
title: Triggers
description: "Reference for the QuickBooks Online webhook listener and service callbacks: receive invoice, customer, payment and other accounting entity events in Ballerina integrations."
keywords: [quickbooks, webhook listener, quickbooks webhooks, event handler, ballerina]
connector: true
connector_name: "quickbooks.trigger"
---

# Triggers

The `ballerinax/quickbooks.trigger` package receives QuickBooks Online webhooks. When an accounting entity such as an invoice, a customer or a payment is created, updated, deleted, voided, emailed or merged, QuickBooks sends an HTTP request to your integration, and the listener calls the callback for that event with a typed payload.

This reference covers `ballerinax/quickbooks.trigger` version 0.9.0. The following components work together:

| Component | Role |
|-----------|------|
| `quickbooks:Listener` | Receives webhook requests from QuickBooks, verifies each one, and calls the attached service for its event. |
| `quickbooks:ListenerConfig` | Holds what the listener verifies deliveries with, the app's webhook verifier token. |
| Service types | 31 service types, such as `quickbooks:CustomerService`. Each callback handles one event. |
| Payload types | A typed record for each event, such as `quickbooks:QuickBookEvent`, passed to its callback. |

## Error handling

The listener acknowledges a delivery to QuickBooks as soon as it is verified, and then calls your callback, so QuickBooks never waits on your code. What happens after that is logged:

| Log entry | When |
|-----------|------|
| `WEBHOOK_SIGNATURE_REJECTED` (warning) | The delivery failed verification. It is answered with `401 Unauthorized` and never reaches a service. The entry gives the reason. |
| `DISPATCH_FAILED` (error) | Your callback returned an error, or the payload didn't fit the callback's type. |
| `NO_HANDLER_FOR_EVENT` (warning) | The event isn't one the package knows. |
| `SERVICE_NOT_ATTACHED` (debug) | No service of the event's type is attached to the listener. |

## Listener

The `quickbooks:Listener` exposes an HTTP endpoint for QuickBooks to deliver webhooks to. Set its public URL as the **Endpoint URL** on your Intuit app's **Webhooks** tab. See the [Setup Guide](setup-guide.md#configuring-quickbooks-webhooks).

### Configuration

| Config Type | Description |
|-------------|-------------|
| `ListenerConfig` | Configuration for the QuickBooks webhook listener. |

**`ListenerConfig` fields:**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `webhookSecret` | <code>string</code> | Optional | The **verifier token** from your Intuit app's **Webhooks** tab. It isn't the app's OAuth client secret. The listener verifies every delivery with it, and rejects every delivery while it isn't set. |

The listener's second argument is the port to listen on, or an `http:Listener` to share. The default port is `8090`. A listener created on a port accepts request bodies up to 25 MB.

### Verifying deliveries

QuickBooks signs each delivery with the app's webhook verifier token, in the `intuit-signature` header: the Base64 HMAC-SHA256 of the raw request body. The listener computes the same value with `webhookSecret` and compares the two in constant time. A delivery without the header, with a different signature, or arriving while `webhookSecret` isn't set gets `401 Unauthorized`.

QuickBooks sends CloudEvents, batched into one delivery. The listener calls the callback for each event's `type`, such as `qbo.invoice.created.v1`. Set the webhook payload format to **CloudEvents**; the package doesn't accept the legacy format.

### Initializing the listener

```ballerina
import ballerinax/quickbooks.trigger as quickbooks;

configurable string verifierToken = ?;
configurable int port = 8090;

listener quickbooks:Listener quickbooksListener = new ({webhookSecret: verifierToken}, port);
```

Set the secret in `Config.toml`:

```toml
webhookSecret = "<your Intuit app's webhook verifier token>"
```

## Service

Attach a service of one of the types below to the listener for each kind of event you need. Implement every callback of the type you attach; give a callback an empty body for an event you don't act on. Services of several types can share one listener. There are 108 callbacks in all.

A service can also be attached on a path of its own, such as `service quickbooks:CustomerService /quickbooks on quickbooksListener`, so several triggers and HTTP services can share one `http:Listener`.

### Callback signatures

Every callback has the shape `remote function <callback>(quickbooks:<PayloadType> payload) returns error?`.

| Service type | Callbacks | Payload type |
|--------------|-----------|--------------|
| `quickbooks:AccountService` | `onAccountCreated`, `onAccountUpdated`, `onAccountDeleted`, `onAccountMerged` | <code>quickbooks:QuickBookEvent</code> |
| `quickbooks:BillService` | `onBillCreated`, `onBillUpdated`, `onBillDeleted` | <code>quickbooks:QuickBookEvent</code> |
| `quickbooks:BillPaymentService` | `onBillPaymentCreated`, `onBillPaymentUpdated`, `onBillPaymentDeleted`, `onBillPaymentVoided` | <code>quickbooks:QuickBookEvent</code> |
| `quickbooks:BudgetService` | `onBudgetCreated`, `onBudgetUpdated` | <code>quickbooks:QuickBookEvent</code> |
| `quickbooks:ChangeOrderService` | `onChangeOrderCreated`, `onChangeOrderUpdated`, `onChangeOrderDeleted` | <code>quickbooks:QuickBookEvent</code> |
| `quickbooks:ClassService` | `onClassCreated`, `onClassUpdated`, `onClassDeleted`, `onClassMerged` | <code>quickbooks:QuickBookEvent</code> |
| `quickbooks:CreditMemoService` | `onCreditMemoCreated`, `onCreditMemoUpdated`, `onCreditMemoDeleted`, `onCreditMemoVoided`, `onCreditMemoEmailed` | <code>quickbooks:QuickBookEvent</code> |
| `quickbooks:CurrencyService` | `onCurrencyCreated`, `onCurrencyUpdated`, `onCurrencyDeleted` | <code>quickbooks:QuickBookEvent</code> |
| `quickbooks:CustomerService` | `onCustomerCreated`, `onCustomerUpdated`, `onCustomerDeleted`, `onCustomerMerged` | <code>quickbooks:QuickBookEvent</code> |
| `quickbooks:DepartmentService` | `onDepartmentCreated`, `onDepartmentUpdated`, `onDepartmentMerged` | <code>quickbooks:QuickBookEvent</code> |
| `quickbooks:DepositService` | `onDepositCreated`, `onDepositUpdated`, `onDepositDeleted` | <code>quickbooks:QuickBookEvent</code> |
| `quickbooks:EmployeeService` | `onEmployeeCreated`, `onEmployeeUpdated`, `onEmployeeDeleted`, `onEmployeeMerged` | <code>quickbooks:QuickBookEvent</code> |
| `quickbooks:EstimateService` | `onEstimateCreated`, `onEstimateUpdated`, `onEstimateDeleted`, `onEstimateEmailed` | <code>quickbooks:QuickBookEvent</code> |
| `quickbooks:InvoiceService` | `onInvoiceCreated`, `onInvoiceUpdated`, `onInvoiceDeleted`, `onInvoiceVoided`, `onInvoiceEmailed` | <code>quickbooks:QuickBookEvent</code> |
| `quickbooks:ItemService` | `onItemCreated`, `onItemUpdated`, `onItemDeleted`, `onItemMerged` | <code>quickbooks:QuickBookEvent</code> |
| `quickbooks:JournalCodeService` | `onJournalCodeCreated`, `onJournalCodeUpdated` | <code>quickbooks:QuickBookEvent</code> |
| `quickbooks:JournalEntryService` | `onJournalEntryCreated`, `onJournalEntryUpdated`, `onJournalEntryDeleted` | <code>quickbooks:QuickBookEvent</code> |
| `quickbooks:PaymentService` | `onPaymentCreated`, `onPaymentUpdated`, `onPaymentDeleted`, `onPaymentVoided`, `onPaymentEmailed` | <code>quickbooks:QuickBookEvent</code> |
| `quickbooks:PaymentMethodService` | `onPaymentMethodCreated`, `onPaymentMethodUpdated`, `onPaymentMethodMerged` | <code>quickbooks:QuickBookEvent</code> |
| `quickbooks:PreferencesService` | `onPreferencesUpdated` | <code>quickbooks:QuickBookEvent</code> |
| `quickbooks:PurchaseService` | `onPurchaseCreated`, `onPurchaseUpdated`, `onPurchaseDeleted`, `onPurchaseVoided` | <code>quickbooks:QuickBookEvent</code> |
| `quickbooks:PurchaseOrderService` | `onPurchaseOrderCreated`, `onPurchaseOrderUpdated`, `onPurchaseOrderDeleted`, `onPurchaseOrderEmailed` | <code>quickbooks:QuickBookEvent</code> |
| `quickbooks:RefundReceiptService` | `onRefundReceiptCreated`, `onRefundReceiptUpdated`, `onRefundReceiptDeleted`, `onRefundReceiptVoided`, `onRefundReceiptEmailed` | <code>quickbooks:QuickBookEvent</code> |
| `quickbooks:SalesReceiptService` | `onSalesReceiptCreated`, `onSalesReceiptUpdated`, `onSalesReceiptDeleted`, `onSalesReceiptVoided`, `onSalesReceiptEmailed` | <code>quickbooks:QuickBookEvent</code> |
| `quickbooks:TaxAgencyService` | `onTaxAgencyCreated`, `onTaxAgencyUpdated` | <code>quickbooks:QuickBookEvent</code> |
| `quickbooks:TermService` | `onTermCreated`, `onTermUpdated` | <code>quickbooks:QuickBookEvent</code> |
| `quickbooks:TimeActivityService` | `onTimeActivityCreated`, `onTimeActivityUpdated`, `onTimeActivityDeleted` | <code>quickbooks:QuickBookEvent</code> |
| `quickbooks:TransferService` | `onTransferCreated`, `onTransferUpdated`, `onTransferDeleted`, `onTransferVoided` | <code>quickbooks:QuickBookEvent</code> |
| `quickbooks:CompanyCurrencyService` | `onCompanyCurrencyCreated`, `onCompanyCurrencyUpdated`, `onCompanyCurrencyDeleted` | <code>quickbooks:QuickBookEvent</code> |
| `quickbooks:VendorService` | `onVendorCreated`, `onVendorUpdated`, `onVendorDeleted`, `onVendorMerged` | <code>quickbooks:QuickBookEvent</code> |
| `quickbooks:VendorCreditService` | `onVendorCreditCreated`, `onVendorCreditUpdated`, `onVendorCreditDeleted` | <code>quickbooks:QuickBookEvent</code> |

### Full usage example

This is the [`invoice-lifecycle-logger`](https://github.com/ballerina-platform/module-ballerinax-quickbooks.trigger/tree/main/examples/invoice-lifecycle-logger) example from the package:

```ballerina
// Copyright (c) 2026, WSO2 LLC. (http://www.wso2.com).
//
// WSO2 LLC. licenses this file to you under the Apache License,
// Version 2.0 (the "License"); you may not use this file except
// in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.

import ballerina/log;
import ballerinax/quickbooks.trigger as quickbooks;

configurable quickbooks:ListenerConfig config = {
    webhookSecret: "xxxxxx"
};

listener quickbooks:Listener webhookListener = new (config, 8090);

// The minimal, canonical use case: log every Invoice lifecycle event.
service quickbooks:InvoiceService on webhookListener {

    remote function onInvoiceCreated(quickbooks:QuickBookEvent payload) returns error? {
        log:printInfo("Invoice created", id = payload.intuitentityid, realm = payload.intuitaccountid);
    }

    remote function onInvoiceUpdated(quickbooks:QuickBookEvent payload) returns error? {
        log:printInfo("Invoice updated", id = payload.intuitentityid, realm = payload.intuitaccountid);
    }

    remote function onInvoiceDeleted(quickbooks:QuickBookEvent payload) returns error? {
        log:printInfo("Invoice deleted", id = payload.intuitentityid, realm = payload.intuitaccountid);
    }

    remote function onInvoiceVoided(quickbooks:QuickBookEvent payload) returns error? {
        log:printInfo("Invoice voided", id = payload.intuitentityid, realm = payload.intuitaccountid);
    }

    remote function onInvoiceEmailed(quickbooks:QuickBookEvent payload) returns error? {
        log:printInfo("Invoice emailed", id = payload.intuitentityid, realm = payload.intuitaccountid);
    }
}
```

## Event payload types

QuickBooks sends CloudEvents, batched into one delivery when several events happen close together, and the listener calls a callback for each event. An event carries the changed entity's ID, not its data; use the QuickBooks Accounting API to read the entity. Every callback receives a `QuickBookEvent`:

### `QuickBookEvent`

| Field | Type | Description |
|-------|------|-------------|
| `specversion` | <code>string</code> | The CloudEvents specification version (currently always "1.0"). |
| `id` | <code>string</code> | A unique identifier for this event. |
| `source` | <code>string</code> | Identifies the QuickBooks company instance that raised the event. |
| `type` | <code>string</code> | The entity and operation this event represents, e.g. qbo.customer.created.v1. |
| `datacontenttype` | <code>string</code> | The content type of the data field. Optional. |
| `time` | <code>string</code> | The timestamp the event occurred, in ISO 8601 format. |
| `intuitentityid` | <code>string</code> | The ID of the entity that changed. |
| `intuitaccountid` | <code>string</code> | The QuickBooks company (realm) ID this event belongs to. |
| `data` | <code>map&lt;json&gt;</code> | Operation-specific event data. Confirmed shapes so far: empty on create, &#123;"deletedId": "..."&#125; on merge. Shape for update/delete/void/email is not yet confirmed against a real delivery. Optional. |

## What's next

- [Setup Guide](setup-guide.md#configuring-quickbooks-webhooks): point QuickBooks at your listener.
- [Example](example.md#quickbooks-trigger-example): build a QuickBooks trigger integration in WSO2 Integrator.
