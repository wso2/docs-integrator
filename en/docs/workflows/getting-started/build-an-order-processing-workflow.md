---
sidebar_position: 1
title: "Build an Order Processing Workflow"
description: Build a crash-safe order processing workflow in WSO2 Integrator that reserves inventory, waits for a payment confirmation, and then confirms or cancels the order.
keywords: [wso2 integrator, durable workflow, order processing, activity, data event, wait, crash recovery]
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Build an Order Processing Workflow

**Time:** 20 minutes | **What you'll build:** A durable workflow that reserves inventory for an order, suspends until a payment confirmation arrives, and then either emails the customer or cancels the order. The every activity output and data events are recorded, so a restart replays the record instead of reserving twice, and the wait for payment costs nothing while it lasts, whether that is seconds or days.

The finished flow has three steps:

1. **Reserve inventory** as a recorded activity.
2. **Wait for a payment data event** delivered from outside the workflow.
3. **Send the confirmation email** when payment succeeded, or **cancel the order** when it did not.

<ThemedImage
    alt="The completed orderWorkflow diagram: Start, the reserveInventory activity, a log step, a Wait for payment node fed from outside the flow, and an If that branches to sendEmail on the payment path and cancelOrder on the Else path"
    sources={{
        light: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/completed-workflow-light.png'),
        dark: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/completed-workflow-dark.png'),
    }}
/>

:::info Prerequisites

- [WSO2 Integrator installed](../../get-started/setup/local-setup.md)

:::

## Step 1: Create the integration

1. Open WSO2 Integrator.
2. Click **Create** in the **Create New Integration** card.
3. Set **Integration Name** to `OrderProcessor`.
4. Click **Create Integration**.

## Step 2: Add durable workflow artifact

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

1. In the design view, click **+ Add Artifact**.
2. On the **Artifacts** page, under **Durable Workflow**, click **Durable Workflow**. The **Create New Durable Workflow** form opens.
3. Set **Name** to `orderWorkflow`.
4. Click the **Workflow Input Data Type** field. Let's create a new type for the order information that the workflow needs.
5. Click **+ Create New Type**. On the **Create from scratch** tab, with **Kind** set to **Record**.
6. Change **Name** from `MyType` to `OrderInfo`.
7. Add each field with the **+** next to **Fields**, then set its name and type:
   
   | Field | Type |
      |---|---|
   | `id` | `string` |
   | `customerId` | `string` |
   | `customerEmail` | `string` |
   | `total` | `int` |

8. Click **Save**. The record is added to your project and appears under **Types** in the sidebar.
9. Click **Create**. The workflow is generated and its diagram opens with a single **Start** node, ready for the first step.

![Creating the orderWorkflow durable workflow and its OrderInfo input type](/img/workflows/getting-started/build-an-order-processing-workflow/create-workflow.gif)
</TabItem>
<TabItem value="code" label="Ballerina code">
```ballerina
type OrderInfo record {|
    string id;
    string customerId;
    string customerEmail;
    int total;
|};
```

```ballerina
@workflow:Workflow
function orderWorkflow(workflow:Context ctx, OrderInfo orderInfo) returns json|error {
}
```
</TabItem>
</Tabs> 

:::tip Reuse an existing type
**+ Create New Type** is only one way to fill **Workflow Input Data Type**. Pick any type already in the project straight from the list, or click **Open Type Browser** to search the wider set. Either way the result is an ordinary record you can edit later from **Types** in the sidebar. See [Types](../../develop/integration-artifacts/supporting/types.md).
:::

## Step 3: Reserve the inventory

Anything that touches the outside world belongs in an **activity** rather than in the workflow body. The runtime records each activity result, so a completed activity is never executed twice on replay.

The first step of the order process reserves stock. You create the activity and the call that uses it in one pass, straight from the workflow diagram.

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

1. On the workflow diagram, click **+**.
2. In the node panel, under **Workflow** > **Steps**, click **Call Activity**. The **Activities** panel opens, listing everything this workflow can call.
3. Under **Current Integration**, click **+ Create Activity**.
4. In the **Workflow Activity** form, set **Activity Name** to `reserveInventory`.
5. Under **Parameters**, click **+ Add Parameter**, set **Type** to `OrderInfo` and **Name** to `orderInfo`, then click **Add**.
6. Leave **Return Type** empty. This activity holds stock and returns nothing. Click **Save**.
7. `reserveInventory` now appears under **Current Integration**, and under **Workflow Activities** in the sidebar. Click it to add the call.
8. Fill in the call form:

   | Field | Value |
   |---|---|
   | **Order Info** | The order to reserve. Switch to **Expression** and set it to the workflow's input parameter |
   | **Retry Policy** | **No Automatic Retry** for now. |

9. Click **Save**. The `reserveInventory` node appears on the diagram.
10. Give the activity something to do. Click the open icon on the node to open its own diagram, To make it simple let's mock the implementation to a log line.
11. Click **+**, then **Log Info** under **Logging**. Set **Msg** to `Inventory reserved` and click **Save**.

![Creating the reserveInventory activity and calling it from the workflow](/img/workflows/getting-started/build-an-order-processing-workflow/add-activity.gif)
</TabItem>
<TabItem value="code" label="Ballerina code">
```ballerina
import ballerina/log;
import ballerina/workflow;

@workflow:Activity
function reserveInventory(OrderInfo orderInfo) returns error? {
    log:printInfo("Inventory reserved");
}
```

```ballerina
@workflow:Workflow
function orderWorkflow(workflow:Context ctx, OrderInfo orderInfo) returns json|error {
    anydata inventoryResult = check ctx->callActivity(reserveInventory, {orderInfo: orderInfo});
}
```
</TabItem>
</Tabs>

:::tip Where activities come from
**+ Create Activity** writes a new activity function in your integration. **Create Activity from a Connection** wraps an action on a connector you already have, and **[Prebuilt Activities](../develop/prebuilt-activities/index.md)** holds the ones that ship with the runtime, for REST calls, SOAP calls, and email. See [Activities](../develop/activities.md).
:::

## Step 4: Wait for the payment confirmation

Payment is confirmed by something outside the workflow, such as a payment gateway callback or an operator action. Model that as a **data event**: a named slot the workflow waits on, and that anyone holding the workflow ID can fill.

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

1. Log a line first, so the run says why it is sitting still. Click **+** below the activity call, scroll to the bottom of the node panel, and click **Show More Functions**.
2. In the **Functions** panel, under **Imported Functions** > **log**, click **printInfo**. Set **Msg** to `Waiting for payment` and click **Save**.
3. Now add the wait. Click **+** below the log step.
4. In the node panel, under **Workflow** > **Steps**, click **Await Data Event**. The **Await Data** form opens.
5. Under **Data Waits**, fill in the entry:

   | Field | Value | Description                                                                                                                                         |
   |---|---|-----------------------------------------------------------------------------------------------------------------------------------------------------|
   | **Data Receive Variable Name** | `payment` | The variable that receives the value once it arrives.                                                                                               |
   | **Data Type** | `boolean` | The type of the value the workflow expects. To make this article simple lets go with `boolean`. If the payment is receved, the value will be `true` |
   | **Data Name** | `payment` | The name used when sending the data into this workflow.                                                                                             |

6. Click **Add** then click **Save**.

The diagram gains a **Wait for payment** node, drawn with an incoming arrow from outside the flow, because that is where the value comes from.
The workflow now suspends at this line, and only at this line. It holds no thread, no memory, and no connection while it waits, and it survives a restart of the runtime.

![Adding the payment data event to the workflow](/img/workflows/getting-started/build-an-order-processing-workflow/await-data-event.gif)
</TabItem>
<TabItem value="code" label="Ballerina code">
```ballerina
# Data record for workflow function
type OrderWorkflowData record {|
    future<boolean> payment;
|};
```

```ballerina
@workflow:Workflow
function orderWorkflow(workflow:Context ctx, OrderInfo orderInfo, OrderWorkflowData data) returns json|error {
    anydata inventoryResult = check ctx->callActivity(reserveInventory, {orderInfo: orderInfo});
    log:printInfo("Waiting for payment");
    boolean payment = check wait data.payment;
}
```
</TabItem>
</Tabs>

:::tip Data event or human task?
Use a **data event** when a system or a person submits *content* the workflow processes, as here. Use a [human task](../develop/human-task-workflow.md) when a person makes a *decision* that the Integration Control Plane should render as a form in their inbox.
:::

## Step 5: Branch on the payment result

The value that arrived decides what happens next, so split the flow in two.

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

1. Click **+** below the wait.
2. In the node panel, under **Control**, click **If**.
3. **Condition** is prefilled with `true`. Replace it with the value the wait produced: click the field and pick `payment` under **Variables** in the value helper.
4. Click **Save**.

The diagram splits into a `payment` path and an **Else** path, each with its own **+**.

![Branching the workflow on the payment result](/img/workflows/getting-started/build-an-order-processing-workflow/branch-on-payment.gif)
</TabItem>
<TabItem value="code" label="Ballerina code">
```ballerina
if payment {
} else {
}
```
</TabItem>
</Tabs>

:::tip More than two paths
**+ Add Else If Block** adds another condition to the same node, and **Remove Else Block** drops the else path when a branch is all you need.
:::

## Step 6: Send the confirmation email

The `payment` path tells the customer the order is confirmed. Create that activity and call it in one pass, the same way as `reserveInventory`.

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

1. Click **+** on the `payment` path, then under **Workflow** > **Steps**, click **Call Activity**.
2. The **Activities** panel already lists `reserveInventory`, so click the **+** on the **Current Integration** header to add another activity.
3. Set **Activity Name** to `sendEmail`. Click **+ Add Parameter**, set **Type** to `OrderInfo` and **Name** to `orderInfo`, click **Add**, then click **Save**.
4. Click `sendEmail` in the **Activities** panel, set **Order Info** to the workflow's input, and click **Save**.
5. Click the open icon on the `sendEmail` node to open its diagram, To make it simple let's mock the implementation to a log line.
6. Click **+**, then click **Log Info** under **Logging**.
7. Leave **Msg** on **Text** and type `Email sent to `. Click on the text box open the field's value helper, then click **Inputs** > `orderInfo` > `customerEmail`. It lands in the text as an expression.
8. Click **Save**.

![Creating the sendEmail activity, calling it, and logging the customer address](/img/workflows/getting-started/build-an-order-processing-workflow/send-email.gif)
</TabItem>
<TabItem value="code" label="Ballerina code">
```ballerina
@workflow:Activity
function sendEmail(OrderInfo orderInfo) {
    log:printInfo(string `Email sent to ${orderInfo.customerEmail}`);
}
```
</TabItem>
</Tabs>

:::tip Text or Expression?
Keep **Msg** on **Text** whenever the message is words with values dropped into it. Text takes what you type as the message and turns each inserted value into an interpolation, which is what produces the string template above. **Expression** treats the whole field as a single Ballerina expression, so bare words like `Email sent to` are a syntax error there. The same toggle appears on any field that accepts either, such as **Order Info** on a call.
:::

## Step 7: Cancel the order

The **Else** path releases the hold instead.

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

1. Click **+** on the **Else** path, then under **Workflow** > **Steps**, click **Call Activity**.
2. Click the **+** on the **Current Integration** header.
3. Set **Activity Name** to `cancelOrder`, add an `orderInfo` parameter of type `OrderInfo` the same way, and click **Save**.
4. Click `cancelOrder` in the **Activities** panel, set **Order Info** to the workflow's input, and click **Save**.

Both branches now end in an activity, and the workflow is complete.

![Creating the cancelOrder activity and calling it on the else path](/img/workflows/getting-started/build-an-order-processing-workflow/cancel-order.gif)
</TabItem>
<TabItem value="code" label="Ballerina code">
```ballerina
@workflow:Activity
function cancelOrder(OrderInfo orderInfo) {
}
```

```ballerina
@workflow:Workflow
function orderWorkflow(workflow:Context ctx, OrderInfo orderInfo, OrderWorkflowData data) returns json|error {
    anydata inventoryResult = check ctx->callActivity(reserveInventory, {orderInfo: orderInfo});
    log:printInfo("Waiting for payment");
    boolean payment = check wait data.payment;
    if payment {
        anydata result = check ctx->callActivity(sendEmail, {orderInfo: orderInfo});
    } else {
        anydata result = check ctx->callActivity(cancelOrder, {orderInfo: orderInfo});
    }
}
```
</TabItem>
</Tabs>

## Step 8: Start the workflow from a service

A workflow does not start itself. It is launched from an entry point such as a service or an automation, so give the order process an HTTP resource that starts a run for each order that arrives.

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

1. Click **+ Add Artifact**, then under **Integration as API**, click **HTTP Service**.
2. On the **Create HTTP Service** form, keep **Service Contract** on **Design From Scratch**, put **Service Base Path** as `/'order`, and click **Create**.
3. The service opens with no resources. Click **Add Resource**.
4. Set **HTTP Method** to **POST** and **Resource Path** to `.`.
5. Click **+ Define Payload**, open the **Browse Existing Types** tab, click `OrderInfo` under the current integration, and click **Save**.
6. Click **Save** to create the resource. Its own diagram opens.
7. Click **+**, then under **Workflow**, click **Run Workflow**.
8. Select the `orderWorkflow` under **Current Integration**.
9. Set **Input** to the request payload and leave **Workflow ID Variable Name** as `workflowId`. Click **Save**.
10. Click **+** below the node, click **Return** under **Control**, set **Expression** to `workflowId`, and click **Save**.

The resource now starts a run for every order it receives and answers with that run's workflow ID.

![Adding an HTTP service with a POST order resource that starts the workflow](/img/workflows/getting-started/build-an-order-processing-workflow/start-workflow.gif)
</TabItem>
<TabItem value="code" label="Ballerina code">
   ```ballerina
   import ballerina/http;
   import ballerina/workflow;
   
   listener http:Listener httpDefaultListener = http:getDefaultListener();
   
   service /'order' on httpDefaultListener {
   
       resource function post .(OrderInfo payload) returns json|error {
           string workflowId = check workflow:run(orderWorkflow, payload);
           return workflowId;
       }
   }
   ```
</TabItem>
</Tabs>

:::info Hold on to the workflow ID
**Run Workflow** starts an instance and returns immediately with its ID. It does not wait for the order to finish, which is the point: the run may sit on the payment event for days. Return the ID to the caller, because it is what ties a later payment confirmation to this instance.
:::

:::tip Why `'order` and not `order`
`order` is a Ballerina keyword, so the resource path is written as the quoted identifier `'order`. The HTTP path is unaffected: the resource still answers on `/order`.
:::

## Step 9: Deliver the payment confirmation

The run is now waiting on the `payment` data event, and it will wait forever until something fills it. Add a second resource that does.

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

1. On the service, click **+ Resource**.
2. Set **HTTP Method** to **POST**.
3. The path needs a segment that carries the workflow ID, so click **+ Path Param** and fill in the **Path Parameter** form:

   | Field | Value | Description |
   |---|---|---|
   | **Name** | `orderId` | The variable the segment binds to, and the name you reference it by inside the resource. |
   | **Type** | `string` | Under **Advanced Configurations**. Defaults to `string`, which is what a workflow ID is. |

4. Click **Save**. The segment lands in **Resource Path** as `[string orderId]`. Complete the path so it reads `[string orderId]/payment`.
5. Click **Save** to create the resource. Its diagram opens.
6. Click **+**, then under **Workflow**, click **Send Data Event**.
7. Fill in the **Send Data** form:

   | Field | Value | Description                                                                    |
   |---|---|--------------------------------------------------------------------------------|
   | **Workflow Name** | `orderWorkflow` | The workflow to send the data to. The dropdown lists all the available workflows. |
   | **Target Workflow Id** | `orderId` | The instance to resume, taken from the request path.                           |
   | **Data Name** | `payment` | The event to fill. The dropdown lists the events the chosen workflow declares. |
   | **Data** | `true` | The value to deliver.                                                          |

8. Click **Save**.

The node reads **Send to payment** and is drawn with a dashed arrow across to `orderWorkflow`, because it hands a value to a run rather than calling something.

![Adding a payment resource that sends the data event into the running workflow](/img/workflows/getting-started/build-an-order-processing-workflow/send-data-event.gif)
</TabItem>
<TabItem value="code" label="Ballerina code">
```ballerina
resource function post [string orderId]/payment() returns json|error {
    check workflow:sendData(orderWorkflow, orderId, "payment", true);
}
```
</TabItem>
</Tabs>

:::tip Take the value from the request
Anyone holding the workflow ID can deliver the value, so in a real integration this resource is what the payment gateway's callback hits. See [Data events](../develop/data-events.md).
:::

## Step 10: Run it

A durable workflow keeps its record in a workflow engine, and by default the runtime expects a local Temporal server (`mode` defaults to `LOCAL`). To keep this walkthrough self-contained, switch to the in-memory engine, which runs inside the integration and needs nothing external.

1. In the sidebar, click **Configurations**.
2. On the **Configurable Variables** page, under **Imported libraries**, click **ballerina/workflow**.
3. In the box under `mode`, enter `"IN_MEMORY"`.

   ![Setting the workflow mode to IN_MEMORY in Configurable Variables](/img/workflows/getting-started/build-an-order-processing-workflow/set-in-memory-mode.gif)
   :::warning `IN_MEMORY` does not survive a restart
   The in-memory engine keeps the record in the integration's own memory, so stopping the integration loses every run that was in flight. It is meant for trying a workflow out, not for the crash-safety this guide is about. To see a suspended order survive a restart, set `mode` back to `"LOCAL"` and start a Temporal server with `temporal server start-dev` before running.
   :::
4. Click **Run** to start the integration.
5. Post an order and keep the returned workflow ID: eg: `019ffed4-c12e-7e24-a438-8bdaae2b5a29`

   ```bash
   curl -X POST http://localhost:9090/order \
     -H 'Content-Type: application/json' \
     -d '{"id": "ORD-1", "customerId": "CUS-9", "customerEmail": "ann@example.com", "total": 4500}'
   ```

   The workflow reserves the inventory and then suspends on the `payment` event.
```bash
   Compiling source (UP-TO-DATE)
   dulminakodagoda/orderprocessor:0.1.0

   Running executable
   
   time=2026-08-14T11:23:04.009+05:30 level=INFO module=dulminakodagoda/orderprocessor message="Inventory reserved"
   time=2026-08-14T11:23:04.028+05:30 level=INFO module=dulminakodagoda/orderprocessor message="Waiting for payment"
   ```
6. Confirm the payment with the workflow ID from the previous response:

   ```bash
   curl -X POST http://localhost:9090/order/019ffed4-c12e-7e24-a438-8bdaae2b5a29/payment \
     -H 'Content-Type: application/json' -d 'true'
   ```

   The workflow resumes and sends the confirmation email. Post `false` instead and it cancels the order.

   ```bash
   time=2026-08-14T11:34:13.224+05:30 level=INFO module=dulminakodagoda/orderprocessor message="Email sent to ann@example.com"
   ```

## Watch it run

Once the integration is [connected to the Integration Control Plane](../icp/connect-runtime.md), every instance is visible there, running or completed. The [execution graph](../icp/executions.md) shows the reservation as a completed activity and the pending payment as a `DATA` node with status `WAITING`, so anyone can see exactly what an order is blocked on instead of guessing that it is stuck.

## Next steps

- [Activities](../develop/activities.md) — retry policies, activity inputs, and how results are recorded.
- [Data events](../develop/data-events.md) — several events, timeouts, and delivering data from other systems.
- [Human task workflows](../develop/human-task-workflow.md) — pause the order for a person's decision instead of a system's data.
- [Durable timers](../develop/durable-timers.md) — add a payment deadline that survives restarts.
