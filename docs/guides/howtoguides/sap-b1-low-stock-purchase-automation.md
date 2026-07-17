---
title: Raise SAP Business One Purchase Requests for Low-Stock Items
---

# Raise SAP Business One Purchase Requests for Low-Stock Items

**Time:** About 25 minutes | **What you'll build:** A scheduled automation that finds items running low on stock in SAP Business One, raises a purchase request for each, and emails the procurement team, with no code to write.

Warehouses run out of stock quietly. Nobody notices a shortage until an order can't be fulfilled. In this guide you build a scheduled automation that watches SAP Business One's inventory for you: it finds items below a stock threshold, raises a purchase request in SAP Business One for each one, and emails procurement so the reorder doesn't wait on someone remembering to check.

## How it works

<ThemedImage
    alt="Architecture diagram: a scheduled WSO2 Integrator automation uses SAP Business One Inventory, Purchase, and SMTP connectors to read low-stocked items, create a purchase request in SAP Business One, and send an alert email to the procurement team"
    sources={{
        light: useBaseUrl('/img/guides/usecases/sap-b1-low-stock-automation/architecture.png'),
        dark: useBaseUrl('/img/guides/usecases/sap-b1-low-stock-automation/architecture.png'),
    }}
/>

The WSO2 Integrator Scheduler invokes the automation periodically, and each run follows the same short flow:

1. Read `Items` from the SAP Business One Service Layer, filtered to those below the reorder threshold.
2. If nothing is low, log a note and stop.
3. Otherwise, for each low-stock item, raise a purchase request in SAP Business One and email procurement.
4. Log a one-line summary of how much work the run did.

## Before you begin

:::info Prerequisites

- A working WSO2 Integrator environment. Choose the path that fits how you want to work:
    - [Cloud setup](../../get-started/setup/cloud-setup.md) to launch WSO2 Integrator in a browser-based cloud editor.
    - [Local setup](../../get-started/setup/local-setup.md) to install and launch the WSO2 Integrator IDE on your machine.
- Access to an SAP Business One system with the **Service Layer** component running (SAP Business One for SAP HANA, or SAP Business One on Microsoft SQL Server, version 9.3 PL10 or later). If you do not have one, ask your SAP administrator.
- An SMTP-enabled email account to send the procurement alerts (for example, Gmail with an App Password).

## Build the automation

Build the flow in the **Visual Designer**, or switch to the **Ballerina Code** tab to see the equivalent source the designer generates for you.

## Step 1: Create the automation

An [automation](../../develop/integration-artifacts/automation.md#creating-an-automation) runs on a schedule with no inbound request, which makes it the right artifact for a recurring stock check.

1. Create a new integration named `LowStockPurchaseAutomation` in a project named `sap-b1-low-stock-automation`.
2. Add an **Automation** artifact to the integration.

You land in the [flow editor](../../develop/understand-ide/editors/flow-diagram-editor/flow-diagram-editor.md) with a single **Start** node, the entry point the scheduler will call.

<ThemedImage
    alt="Create Integration dialog with the integration name LowStockPurchaseAutomation and project name sap-b1-low-stock-automation filled in"
    sources={{
        light: useBaseUrl('/img/guides/usecases/sap-b1-low-stock-automation/create-integration.png'),
        dark: useBaseUrl('/img/guides/usecases/sap-b1-low-stock-automation/create-integration.png'),
    }}
/>

## Step 2: Connect to SAP Business One

SAP Business One is not (yet) a built-in connector wizard like the database and email connectors, so you add it the same way you would add any Ballerina Central connector.

### Find your SAP Business One connection details

To connect, you need three values from the SAP Business One desktop client's login screen: the company database, your user name, and your password.

Click the company name at the top of the SAP Business One desktop application, or contact your administrator.

<ThemedImage
    alt="SAP Business One Choose Company window showing the User ID, Password, and Database fields used to configure the connection"
    sources={{
        light: useBaseUrl('/img/guides/usecases/sap-b1-low-stock-automation/setup/sap-b1-choose-company.png'),
        dark: useBaseUrl('/img/guides/usecases/sap-b1-low-stock-automation/setup/sap-b1-choose-company.png'),
    }}
/>

The **Current Server** field identifies the SAP HANA or SQL Server instance behind the Service Layer, not the Service Layer itself — it is not part of the connector configuration. Ask your SAP administrator for the Service Layer's own address if you do not already have it.

### Add the Inventory connection

1. Add a [connection](../../develop/integration-artifacts/supporting/connections.md#adding-a-connection): **Add Connection → Search Connectors**, then search for `sap.businessone.inventory` and select **ballerinax/sap.businessone.inventory**.
2. Configure the connection:

    | Field | Value |
    | --- | --- |
    | Service URL | `https://<service-layer-host>:50000/b1s/v1` |
    | Company DB | Your company database, from the **Database** field in the SAP Business One client |
    | Username | Your SAP Business One **User ID** |
    | Password | Your SAP Business One **Password** |

    :::tip Best practice
    Don't hardcode credentials into the connection. Click each field and select **Configurables** in the [Expression editor](../../develop/understand-ide/editors/expression-editor.md)'s helper pane, then click **New Configurable** and set up a configurable, so the value is supplied at runtime instead of stored in the flow.
    :::

    <ThemedImage
        alt="Configure Inventory connection dialog with the SAP Business One session record (companyDb, username, password) and the connection named inventoryClient"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sap-b1-low-stock-automation/add-inventory-connection.png'),
            dark: useBaseUrl('/img/guides/usecases/sap-b1-low-stock-automation/add-inventory-connection.png'),
        }}
    />

3. Name the connection `inventoryClient`.

### Add the Purchasing connection

Similar to the connection you just added, add one more: search for `sap.businessone.purchasing` and select **ballerinax/sap.businessone.purchasing**. Configure it with the same Service URL, Company DB, Username, and Password as `inventoryClient`, and name this connection `purchasingClient`.

Both connections will appear under **Connections**.

## Step 3: Read the items running low on stock

1. After the **Start** node, add the `inventoryClient` connection's **List Items** operation.
2. Set **Result** to `lowStockResult`.
3. Set the **Filter** parameter to `QuantityOnStock lt 10 and PurchaseItem eq 'YES'`.

The Service Layer understands this as an OData filter and returns only the items whose `QuantityOnStock` field is below 10. Adjust the threshold to whatever counts as "low" for the item in question.

Your operation should match the checkpoint below.

<ThemedImage
    alt="List Items operation configured with Result lowStockResult and a Filter of QuantityOnStock lt 10"
    sources={{
        light: useBaseUrl('/img/guides/usecases/sap-b1-low-stock-automation/list-items-config.png'),
        dark: useBaseUrl('/img/guides/usecases/sap-b1-low-stock-automation/list-items-config.png'),
    }}
/>

## Step 4: Skip the run when nothing is low

Exit early when there is nothing to reorder, so an empty run stays cheap and quiet.

1. Add a [**Declare Variable**](../../develop/understand-ide/editors/flow-diagram-editor/statement.md#declare-variable) node after **List Items** that assigns `lowStockResult.value ?: []` to a variable named `lowStockItems` (type `Item[]`).

    <ThemedImage
        alt="Declare Variable panel creating lowStockItems with type inventory:Item[] and expression lowStockResult.value ?: []"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sap-b1-low-stock-automation/declare-variable-lowstockitems.png'),
            dark: useBaseUrl('/img/guides/usecases/sap-b1-low-stock-automation/declare-variable-lowstockitems.png'),
        }}
    />

2. Add an [**If**](../../develop/understand-ide/editors/flow-diagram-editor/control.md#if) node after it with the condition `lowStockItems.length() == 0`.
3. Inside the branch, add a **Log Info** node with the message `"No low-stock items to reorder."`
4. After the log, add a [**Return**](../../develop/understand-ide/editors/flow-diagram-editor/control.md#return) node with no value.

Your flow should now branch and return early when nothing is low.

<ThemedImage
    alt="Flow with the If branch built: when lowStockResult is empty it logs No low-stock items to reorder and returns"
    sources={{
        light: useBaseUrl('/img/guides/usecases/sap-b1-low-stock-automation/if-empty-flow.png'),
        dark: useBaseUrl('/img/guides/usecases/sap-b1-low-stock-automation/if-empty-flow.png'),
    }}
/>

## Step 5: Raise a purchase request and notify procurement

To reach your mail server, add an [**Email Smtp**](../../connectors/catalog/built-in/email/email.md) connection named `emailSmtpclient`:

| Field | Value |
| --- | --- |
| Host | Your SMTP host, for example `smtp.gmail.com` |
| Username | Your SMTP account username, for example `youremail@gmail.com` |
| Password | Your SMTP account password (for example, a Gmail App Password) |

<ThemedImage
    alt="Configure Email Smtp connection dialog with Host set to smtp.gmail.com and Username and Password fields bound to configurable values"
    sources={{
        light: useBaseUrl('/img/guides/usecases/sap-b1-low-stock-automation/email-smtp-connection.png'),
        dark: useBaseUrl('/img/guides/usecases/sap-b1-low-stock-automation/email-smtp-connection.png'),
    }}
/>

### Build the loop

1. Add a [**Foreach**](../../develop/understand-ide/editors/flow-diagram-editor/control.md#foreach) node after the **If**, looping over `lowStockItems` with the item variable `lowStockItem` (type `Item`).
2. Inside the loop, add the `purchasingClient` **Create Purchase Requests** operation, and set **Result** to `purchaseRequest`. Configure the following fields on the **Document** record:

    | Field | Value |
    | --- | --- |
    | DocumentLines | For **ItemCode**, open the field's [Expression editor](../../develop/understand-ide/editors/expression-editor.md) and select `lowStockItem` → `ItemCode` from the **Variables** list in the helper pane. Set **Quantity** to `50`. |
    | RequesterEmail | A valid email address, for example `"requester@example.com"` |
    | RequriedDate | A required-by date, for example `"2026-07-13"` |
    | BPL_IDAssignedToInvoice | Required only when your company has multiple branches (Business Places) enabled; the `BPLID` of a branch your user is authorized for |

    :::note
    Instead of hardcoding **RequriedDate** to a fixed date, you can compute it dynamically relative to the run date. for example, using time module: `time:utcToCivil(time:utcAddSeconds(time:utcNow(), 3 * 24 * 60 * 60))` returns a `time:Civil` three days from now.
    :::

    Your payload should match the checkpoint below.

    <ThemedImage
        alt="Create Purchase Requests operation payload with DocumentLines, RequesterEmail, RequriedDate, and BPL_IDAssignedToInvoice set on the Document record"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sap-b1-low-stock-automation/create-purchase-request-config.png'),
            dark: useBaseUrl('/img/guides/usecases/sap-b1-low-stock-automation/create-purchase-request-config.png'),
        }}
    />

3. Inside the loop, add the `emailSmtpclient` **Send Message** operation.

    <ThemedImage
        alt="Node panel with the emailSmtpclient connection expanded and Send Message selected to add the operation to the flow"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sap-b1-low-stock-automation/add-send-message-operation.png'),
            dark: useBaseUrl('/img/guides/usecases/sap-b1-low-stock-automation/add-send-message-operation.png'),
        }}
    />

    In the **Email** record:

    - Set **to** to your procurement address, for example `"procurement@example.com"`.
    - Set **subject** to `"Low stock: " + (lowStockItem.ItemCode ?: "")`.
    - Set **body** to the following expression:

      ```ballerina
      "Item " + (lowStockItem.ItemCode ?: "") + " (" + (lowStockItem.ItemName ?: "") +
      ") is down to " + (lowStockItem.QuantityOnStock ?: 0d).toString() +
      " units. Purchase request #" + (purchaseRequest.DocNum ?: 0).toString() +
      string `was raised for 50 units.`
      ```

    `ItemCode`, `ItemName`, `QuantityOnStock`, and `DocNum` are all optional fields, so each is given a fallback with `?:` before use.

4. Inside the loop, add a **Log Info** node with the message `` string `Purchase request raised: ${purchaseRequest.DocNum ?: 0} for ${lowStockItem.ItemCode ?: ""}` ``.

The loop now raises a purchase request for each low-stock item, emails procurement, and logs the result.

<ThemedImage
    alt="Foreach loop that creates a purchase request in SAP Business One, sends procurement an email through emailSmtpclient, and logs the result"
    sources={{
        light: useBaseUrl('/img/guides/usecases/sap-b1-low-stock-automation/foreach-complete.png'),
        dark: useBaseUrl('/img/guides/usecases/sap-b1-low-stock-automation/foreach-complete.png'),
    }}
/>

## Step 6: Log a summary

After the **Foreach** node, add a final [**Log Info**](../../develop/understand-ide/editors/flow-diagram-editor/logging.md#log-info) node with the message `"Done - reordered low-stock items"`.

Your flow is complete: it reads the low-stock items, exits early when there are none, raises a purchase request and notifies procurement for each one, and reports a summary.

<ThemedImage
    alt="Complete automation flow: Start, List Items, If empty branch with log and return, then Foreach with create purchase request, send email, and log"
    sources={{
        light: useBaseUrl('/img/guides/usecases/sap-b1-low-stock-automation/full-flow.png'),
        dark: useBaseUrl('/img/guides/usecases/sap-b1-low-stock-automation/full-flow.png'),
    }}
/>

You design this on the canvas and never write any of it. The Visual Designer keeps the source in sync across `connections.bal` and `automation.bal`.

```ballerina
// connections.bal
import ballerinax/sap.businessone.inventory;
import ballerinax/sap.businessone.purchasing;

import ballerina/email;

configurable string b1ServiceUrl = ?;
configurable string b1CompanyDb = ?;
configurable string b1Username = ?;
configurable string b1Password = ?;

configurable string emailHost = ?;
configurable string emailUserName = ?;
configurable string emailPassword = ?;
configurable int emailPort = 465;

final inventory:Client inventoryClient = check new (
    {companyDb: b1CompanyDb, username: b1Username, password: b1Password},
    serviceUrl = b1ServiceUrl
);

final purchasing:Client purchasingClient = check new (
    {companyDb: b1CompanyDb, username: b1Username, password: b1Password},
    serviceUrl = b1ServiceUrl
);

final email:SmtpClient emailSmtpclient = check new (emailHost, emailUserName, emailPassword, port = emailPort, security = "START_TLS_AUTO");
```

```ballerina
// automation.bal
import ballerina/log;
import ballerinax/sap.businessone.inventory;
import ballerinax/sap.businessone.purchasing;

public function main() returns error? {
    do {
        inventory:ItemsCollectionResponse lowStockResult = check inventoryClient->listItems(dollarFilter = "QuantityOnStock lt 10 and PurchaseItem eq 'YES'");
        inventory:Item[] lowStockItems = lowStockResult.value ?: [];
        if lowStockItems.length() == 0 {
            log:printInfo("No low-stock items to reorder.");
            return;
        }
        foreach inventory:Item lowStockItem in lowStockItems {
            purchasing:Document purchaseRequest = check purchasingClient->createPurchaseRequests({
                DocumentLines: [
                    {ItemCode: lowStockItem.ItemCode, Quantity: 50}
                ],
                RequesterEmail: "requester@example.com",
                RequriedDate: "2026-07-13",
                BPL_IDAssignedToInvoice: 1
            });
            check emailSmtpclient->sendMessage({
                to: "procurement@example.com",
                subject: "Low stock: " + (lowStockItem.ItemCode ?: ""),
                body: "Item " + (lowStockItem.ItemCode ?: "") + " (" + (lowStockItem.ItemName ?: "") +
                ") is down to " + (lowStockItem.QuantityOnStock ?: 0d).toString() +
                " units. Purchase request #" + (purchaseRequest.DocNum ?: 0).toString() +
                string ` was raised for 50 units.`
            });
            log:printInfo(string `Purchase request raised: ${purchaseRequest.DocNum ?: 0} for ${lowStockItem.ItemCode ?: ""}`);
        }
        log:printInfo("Done - reordered low-stock items");
    } on fail error e {
        log:printError("Error occurred", 'error = e);
        return e;
    }
}
```

The `inventory:Client` and `purchasing:Client` are generated when you add the connections; the flow logic, as you build the canvas.

## Run and verify

1. Go to **Configurations** and supply your SAP Business One credentials and your SMTP server details, then select **Run** on the integration overview:

    <ThemedImage
        alt="Configurable Variables panel with the SAP Business One and SMTP configurable values filled in"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sap-b1-low-stock-automation/configurable-variables-panel.png'),
            dark: useBaseUrl('/img/guides/usecases/sap-b1-low-stock-automation/configurable-variables-panel.png'),
        }}
    />

2. Watch the terminal. Each low-stock item gets a purchase request, procurement is emailed, and a final line reports completion.

<ThemedImage
    alt="Integration overview with the terminal showing four purchase requests raised and a done summary"
    sources={{
        light: useBaseUrl('/img/guides/usecases/sap-b1-low-stock-automation/run-terminal-output.png'),
        dark: useBaseUrl('/img/guides/usecases/sap-b1-low-stock-automation/run-terminal-output.png'),
    }}
/>

3. Confirm the purchase requests landed in SAP Business One: open **Purchasing – A/P → Purchase Request** and look for the new documents (`10`–`13` in the sample run above). Procurement should also have a new email per item.

<ThemedImage
    alt="Gmail inbox showing a received low-stock alert email with the item, quantity on stock, and purchase request number"
    sources={{
        light: useBaseUrl('/img/guides/usecases/sap-b1-low-stock-automation/email-notification.png'),
        dark: useBaseUrl('/img/guides/usecases/sap-b1-low-stock-automation/email-notification.png'),
    }}
/>

## What's next

Now that the automation works, you can take it further:

- **Deploy and schedule it.** Ship it to [WSO2 Cloud](../../deploy/cloud/overview.md), a [Docker container](../../deploy/self-hosted/containerized-deployment.md#docker-deployment), [Kubernetes](../../deploy/self-hosted/containerized-deployment.md#kubernetes-deployment), or a [virtual machine](../../deploy/self-hosted/vm-deployment.md), then schedule periodic runs there (a `cron` entry, a Kubernetes `CronJob`, a host scheduler, or the WSO2 Integration Platform).
- **Richen the notification.** The [Email connector](../../connectors/catalog/built-in/email/email.md) also supports HTML bodies, CC/BCC, and attachments, so procurement's plain note can become a formatted daily digest listing every item raised in that run.
