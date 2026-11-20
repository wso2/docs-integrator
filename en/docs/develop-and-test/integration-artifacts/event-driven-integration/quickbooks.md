---
title: QuickBooks
description: React to QuickBooks Online accounting events such as invoice, customer and payment changes using pre-built event handlers.
keywords: [wso2 integrator, quickbooks, webhook, event integration, ballerina]
slug: /develop-and-test/integration-artifacts/event-driven-integration/quickbooks
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# QuickBooks

:::warning
QuickBooks event integration is currently in **Beta**. APIs and behavior may change in future releases.
:::

QuickBooks event integrations receive webhook deliveries from QuickBooks Online and run a handler for each accounting entity event. Use them to sync customers to a CRM, start a workflow when an invoice is created, or alert when a payment is voided. They use the `ballerinax/quickbooks.trigger` package, which verifies every delivery with the webhook verifier token before a handler runs.

## Creating a QuickBooks events service

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

1. Click **+ Add Artifact** in the canvas or click **+** next to **Entry Points** in the sidebar.
2. In the **Artifacts** panel, search for `quickbooks.trigger` and select the **quickbooks.trigger** card under **More on Ballerina Central**.
3. In the **QuickBooks Event Integration** form, fill in the following fields:

   <ThemedImage
       alt="QuickBooks Event Integration creation form"
       sources={{
           light: useBaseUrl('/img/develop/integration-artifacts/event/quickbooks/step-creation-form.png'),
           dark: useBaseUrl('/img/develop/integration-artifacts/event/quickbooks/step-creation-form.png'),
       }}
   />

   | Field | Description | Default |
   |---|---|---|
   | **Event Channel** | The QuickBooks events to handle, as a service type such as **quickbooks:CustomerService**. See [Event channels](#event-channels) for all options. | `quickbooks:CustomerService` |
   | **Listener** | **Create New Listener**, or **Use Existing Listener** to attach to a QuickBooks listener already in the project. | Create New Listener |
   | **Listener Name** | Identifier for a new listener. | `quickbooksListener` |
   | **Webhook Listener Port** | The port the listener accepts webhook requests on. | `8090` |
   | **Webhook Secret** | The **verifier token** from your Intuit app's **Webhooks** tab. It isn't the app's OAuth client secret. The listener verifies every delivery with it, and rejects every delivery while it isn't set. Bind it to a configurable variable. | None |

4. Click **Create**.

5. WSO2 Integrator opens the service in the **Service Designer**. The canvas shows the attached listener, the event channel, and the **Event Handlers** section with every handler of the selected channel added.

   <ThemedImage
       alt="QuickBooks Service Designer view"
       sources={{
           light: useBaseUrl('/img/develop/integration-artifacts/event/quickbooks/step-service-designer.png'),
           dark: useBaseUrl('/img/develop/integration-artifacts/event/quickbooks/step-service-designer.png'),
       }}
   />

   A service must implement every handler of its channel, so all of them are added for you. Click a handler to open it in the flow diagram view and implement the logic; leave a handler empty for an event you don't act on.

</TabItem>
<TabItem value="code" label="Ballerina Code">

The following complete, runnable Ballerina program creates a QuickBooks event integration with a `quickbooks:CustomerService`.

```ballerina
import ballerina/log;
import ballerinax/quickbooks.trigger as quickbooks;

configurable string verifierToken = ?;
configurable int port = 8090;

listener quickbooks:Listener quickbooksListener = new ({webhookSecret: verifierToken}, port);

service quickbooks:CustomerService on quickbooksListener {

    remote function onCustomerCreated(quickbooks:QuickBookEvent payload) returns error? {
        log:printInfo("Customer created", id = payload.intuitentityid, realm = payload.intuitaccountid);
    }

    remote function onCustomerUpdated(quickbooks:QuickBookEvent payload) returns error? {
        log:printInfo("Customer updated", id = payload.intuitentityid, realm = payload.intuitaccountid);
    }

    remote function onCustomerDeleted(quickbooks:QuickBookEvent payload) returns error? {
    }

    remote function onCustomerMerged(quickbooks:QuickBookEvent payload) returns error? {
    }
}
```

Save this as `main.bal`, set the configurable values in `Config.toml`, and run `bal run` from the project directory. Then point QuickBooks at the listener's public URL. See the [QuickBooks setup guide](product://connectors/catalog/finance-accounting/quickbooks.trigger/setup-guide#configuring-quickbooks-webhooks).

</TabItem>
</Tabs>

## Listener configuration

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

In the **Service Designer**, click the **Configure** icon in the header to open the **QuickBooks Event Integration Configuration** panel.

   <ThemedImage
       alt="QuickBooks listener configuration view"
       sources={{
           light: useBaseUrl('/img/develop/integration-artifacts/event/quickbooks/step-configuration.png'),
           dark: useBaseUrl('/img/develop/integration-artifacts/event/quickbooks/step-configuration.png'),
       }}
   />

| Field | Description | Default |
|---|---|---|
| **Name** | Identifier for the listener. | `quickbooksListener` |
| **Listener Config** | A `quickbooks:ListenerConfig` record with the `webhookSecret` field. | `{}` |
| **Webhook Listener Port** | Port on which the listener accepts webhook requests. | `8090` |

Click **+ Attach Listener** to attach an additional listener to the same service.

Click **Save Changes** to apply updates.

</TabItem>
<TabItem value="code" label="Ballerina Code">

The listener is declared at the module level and takes a `quickbooks:ListenerConfig` value and the port, or an `http:Listener` to share. Use `configurable` so secrets are supplied through `Config.toml` or an environment variable, not written in the code.

```ballerina
listener quickbooks:Listener quickbooksListener = new ({webhookSecret: verifierToken}, port);
```

`quickbooks:ListenerConfig` fields:

| Field | Type | Default | Description |
|---|---|---|---|
| `webhookSecret` | `string` | Optional | The **verifier token** from your Intuit app's **Webhooks** tab. It isn't the app's OAuth client secret. The listener verifies every delivery with it, and rejects every delivery while it isn't set. |

A listener created on a port accepts request bodies up to 25 MB.

</TabItem>
</Tabs>

## Event channels

Each event channel is a service type for one QuickBooks accounting entity. Each handler handles one CloudEvents `type`, such as `qbo.customer.created.v1`. Select the entities and operations your handlers need on the app's **Webhooks** tab.

| Channel | QuickBooks event types | Handlers |
|---|---|---|
| `quickbooks:AccountService` | `qbo.account.created.v1`, `qbo.account.updated.v1`, `qbo.account.deleted.v1`, `qbo.account.merged.v1` | `onAccountCreated`, `onAccountUpdated`, `onAccountDeleted`, `onAccountMerged` |
| `quickbooks:BillService` | `qbo.bill.created.v1`, `qbo.bill.updated.v1`, `qbo.bill.deleted.v1` | `onBillCreated`, `onBillUpdated`, `onBillDeleted` |
| `quickbooks:BillPaymentService` | `qbo.billpayment.created.v1`, `qbo.billpayment.updated.v1`, `qbo.billpayment.deleted.v1`, `qbo.billpayment.void.v1` | `onBillPaymentCreated`, `onBillPaymentUpdated`, `onBillPaymentDeleted`, `onBillPaymentVoided` |
| `quickbooks:BudgetService` | `qbo.budget.created.v1`, `qbo.budget.updated.v1` | `onBudgetCreated`, `onBudgetUpdated` |
| `quickbooks:ChangeOrderService` | `qbo.changeorder.created.v1`, `qbo.changeorder.updated.v1`, `qbo.changeorder.deleted.v1` | `onChangeOrderCreated`, `onChangeOrderUpdated`, `onChangeOrderDeleted` |
| `quickbooks:ClassService` | `qbo.class.created.v1`, `qbo.class.updated.v1`, `qbo.class.deleted.v1`, `qbo.class.merged.v1` | `onClassCreated`, `onClassUpdated`, `onClassDeleted`, `onClassMerged` |
| `quickbooks:CompanyCurrencyService` | `qbo.companycurrency.created.v1`, `qbo.companycurrency.updated.v1`, `qbo.companycurrency.deleted.v1` | `onCompanyCurrencyCreated`, `onCompanyCurrencyUpdated`, `onCompanyCurrencyDeleted` |
| `quickbooks:CreditMemoService` | `qbo.creditmemo.created.v1`, `qbo.creditmemo.updated.v1`, `qbo.creditmemo.deleted.v1`, `qbo.creditmemo.void.v1`, `qbo.creditmemo.emailed.v1` | `onCreditMemoCreated`, `onCreditMemoUpdated`, `onCreditMemoDeleted`, `onCreditMemoVoided`, `onCreditMemoEmailed` |
| `quickbooks:CurrencyService` | `qbo.currency.created.v1`, `qbo.currency.updated.v1`, `qbo.currency.deleted.v1` | `onCurrencyCreated`, `onCurrencyUpdated`, `onCurrencyDeleted` |
| `quickbooks:CustomerService` | `qbo.customer.created.v1`, `qbo.customer.updated.v1`, `qbo.customer.deleted.v1`, `qbo.customer.merged.v1` | `onCustomerCreated`, `onCustomerUpdated`, `onCustomerDeleted`, `onCustomerMerged` |
| `quickbooks:DepartmentService` | `qbo.department.created.v1`, `qbo.department.updated.v1`, `qbo.department.merged.v1` | `onDepartmentCreated`, `onDepartmentUpdated`, `onDepartmentMerged` |
| `quickbooks:DepositService` | `qbo.deposit.created.v1`, `qbo.deposit.updated.v1`, `qbo.deposit.deleted.v1` | `onDepositCreated`, `onDepositUpdated`, `onDepositDeleted` |
| `quickbooks:EmployeeService` | `qbo.employee.created.v1`, `qbo.employee.updated.v1`, `qbo.employee.deleted.v1`, `qbo.employee.merged.v1` | `onEmployeeCreated`, `onEmployeeUpdated`, `onEmployeeDeleted`, `onEmployeeMerged` |
| `quickbooks:EstimateService` | `qbo.estimate.created.v1`, `qbo.estimate.updated.v1`, `qbo.estimate.deleted.v1`, `qbo.estimate.emailed.v1` | `onEstimateCreated`, `onEstimateUpdated`, `onEstimateDeleted`, `onEstimateEmailed` |
| `quickbooks:InvoiceService` | `qbo.invoice.created.v1`, `qbo.invoice.updated.v1`, `qbo.invoice.deleted.v1`, `qbo.invoice.void.v1`, `qbo.invoice.emailed.v1` | `onInvoiceCreated`, `onInvoiceUpdated`, `onInvoiceDeleted`, `onInvoiceVoided`, `onInvoiceEmailed` |
| `quickbooks:ItemService` | `qbo.item.created.v1`, `qbo.item.updated.v1`, `qbo.item.deleted.v1`, `qbo.item.merged.v1` | `onItemCreated`, `onItemUpdated`, `onItemDeleted`, `onItemMerged` |
| `quickbooks:JournalCodeService` | `qbo.journalcode.created.v1`, `qbo.journalcode.updated.v1` | `onJournalCodeCreated`, `onJournalCodeUpdated` |
| `quickbooks:JournalEntryService` | `qbo.journalentry.created.v1`, `qbo.journalentry.updated.v1`, `qbo.journalentry.deleted.v1` | `onJournalEntryCreated`, `onJournalEntryUpdated`, `onJournalEntryDeleted` |
| `quickbooks:PaymentService` | `qbo.payment.created.v1`, `qbo.payment.updated.v1`, `qbo.payment.deleted.v1`, `qbo.payment.void.v1`, `qbo.payment.emailed.v1` | `onPaymentCreated`, `onPaymentUpdated`, `onPaymentDeleted`, `onPaymentVoided`, `onPaymentEmailed` |
| `quickbooks:PaymentMethodService` | `qbo.paymentmethod.created.v1`, `qbo.paymentmethod.updated.v1`, `qbo.paymentmethod.merged.v1` | `onPaymentMethodCreated`, `onPaymentMethodUpdated`, `onPaymentMethodMerged` |
| `quickbooks:PreferencesService` | `qbo.preferences.updated.v1` | `onPreferencesUpdated` |
| `quickbooks:PurchaseService` | `qbo.purchase.created.v1`, `qbo.purchase.updated.v1`, `qbo.purchase.deleted.v1`, `qbo.purchase.void.v1` | `onPurchaseCreated`, `onPurchaseUpdated`, `onPurchaseDeleted`, `onPurchaseVoided` |
| `quickbooks:PurchaseOrderService` | `qbo.purchaseorder.created.v1`, `qbo.purchaseorder.updated.v1`, `qbo.purchaseorder.deleted.v1`, `qbo.purchaseorder.emailed.v1` | `onPurchaseOrderCreated`, `onPurchaseOrderUpdated`, `onPurchaseOrderDeleted`, `onPurchaseOrderEmailed` |
| `quickbooks:RefundReceiptService` | `qbo.refundreceipt.created.v1`, `qbo.refundreceipt.updated.v1`, `qbo.refundreceipt.deleted.v1`, `qbo.refundreceipt.void.v1`, `qbo.refundreceipt.emailed.v1` | `onRefundReceiptCreated`, `onRefundReceiptUpdated`, `onRefundReceiptDeleted`, `onRefundReceiptVoided`, `onRefundReceiptEmailed` |
| `quickbooks:SalesReceiptService` | `qbo.salesreceipt.created.v1`, `qbo.salesreceipt.updated.v1`, `qbo.salesreceipt.deleted.v1`, `qbo.salesreceipt.void.v1`, `qbo.salesreceipt.emailed.v1` | `onSalesReceiptCreated`, `onSalesReceiptUpdated`, `onSalesReceiptDeleted`, `onSalesReceiptVoided`, `onSalesReceiptEmailed` |
| `quickbooks:TaxAgencyService` | `qbo.taxagency.created.v1`, `qbo.taxagency.updated.v1` | `onTaxAgencyCreated`, `onTaxAgencyUpdated` |
| `quickbooks:TermService` | `qbo.term.created.v1`, `qbo.term.updated.v1` | `onTermCreated`, `onTermUpdated` |
| `quickbooks:TimeActivityService` | `qbo.timeactivity.created.v1`, `qbo.timeactivity.updated.v1`, `qbo.timeactivity.deleted.v1` | `onTimeActivityCreated`, `onTimeActivityUpdated`, `onTimeActivityDeleted` |
| `quickbooks:TransferService` | `qbo.transfer.created.v1`, `qbo.transfer.updated.v1`, `qbo.transfer.deleted.v1`, `qbo.transfer.void.v1` | `onTransferCreated`, `onTransferUpdated`, `onTransferDeleted`, `onTransferVoided` |
| `quickbooks:VendorService` | `qbo.vendor.created.v1`, `qbo.vendor.updated.v1`, `qbo.vendor.deleted.v1`, `qbo.vendor.merged.v1` | `onVendorCreated`, `onVendorUpdated`, `onVendorDeleted`, `onVendorMerged` |
| `quickbooks:VendorCreditService` | `qbo.vendorcredit.created.v1`, `qbo.vendorcredit.updated.v1`, `qbo.vendorcredit.deleted.v1` | `onVendorCreditCreated`, `onVendorCreditUpdated`, `onVendorCreditDeleted` |

See the [QuickBooks trigger reference](product://connectors/catalog/finance-accounting/quickbooks.trigger/triggers) for each channel's payload type and fields.

## Event handlers

When a QuickBooks events service is created, WSO2 Integrator adds every handler for the selected channel. Click a handler in the **Service Designer** to open the flow diagram view and implement the processing logic. Each handler receives one event of the batch QuickBooks delivers, as a `quickbooks:QuickBookEvent`. The event carries the entity's ID in `intuitentityid` and the company ID in `intuitaccountid`, not the entity's data.

To handle more events, add a service for each channel. Services of different channels can share one listener.

## Error handling

The listener answers QuickBooks as soon as a delivery passes verification, then runs the handler, so QuickBooks never waits on your logic. Errors are logged, not sent back to QuickBooks:

| Log entry | When |
|---|---|
| `WEBHOOK_SIGNATURE_REJECTED` (warning) | A delivery failed verification and was answered with `401 Unauthorized`. The entry gives the reason, such as a missing or different signature. |
| `DISPATCH_FAILED` (error) | A handler returned an error, or the payload didn't fit its type. |
| `NO_HANDLER_FOR_EVENT` (warning) | QuickBooks sent an event the package doesn't know. |
| `SERVICE_NOT_ATTACHED` (debug) | No service of the event's channel is attached to the listener. |

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

Add an **Error Handler** block inside the handler flow to define recovery logic. Errors that escape the handler are logged by the listener as `DISPATCH_FAILED`.

</TabItem>
<TabItem value="code" label="Ballerina Code">

Use `do/on fail` inside a handler to recover from expected failures before they reach the listener.

```ballerina
remote function onCustomerCreated(quickbooks:QuickBookEvent payload) returns error? {
    do {
        log:printInfo("Customer created", id = payload.intuitentityid, realm = payload.intuitaccountid);
    } on fail error err {
        log:printError("Failed to handle the event", err);
    }
}
```

</TabItem>
</Tabs>

## What's next

- [Kafka](kafka.md): consume messages from Apache Kafka topics
- [Salesforce Events](salesforce-events.md): listen to Salesforce Change Data Capture events
- [QuickBooks trigger reference](product://connectors/catalog/finance-accounting/quickbooks.trigger/triggers): listener configuration, every callback and the payload types
- [QuickBooks setup guide](product://connectors/catalog/finance-accounting/quickbooks.trigger/setup-guide#configuring-quickbooks-webhooks): point QuickBooks at your listener
