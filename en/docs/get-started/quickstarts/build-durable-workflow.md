---
sidebar_position: 6
title: "Build a Durable Workflow"
sidebar_label: "Build a Durable Workflow"
description: Build a crash-safe order processing workflow in Choreo Integrator that reserves inventory, waits for a payment confirmation, and then confirms or cancels the order.
keywords: [wso2 integrator, durable workflow, order processing, activity, data event, wait, crash recovery]
slug: /get-started/quickstarts/build-durable-workflow
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Build a Durable Workflow

<QuickstartHeader
  time="20 minutes"
  build={<>A durable workflow that handles customer orders</>}
/>

The durable workflow reserves inventory for an order, suspends until a payment confirmation arrives, and then either emails the customer or cancels the order. Every activity result and data event is recorded, so a restart replays the record instead of reserving twice, and the wait for payment holds no thread and no connection while it lasts, whether that is seconds or days.

The finished flow has three steps:

1. **Reserve inventory** as a recorded activity.
2. **Wait for a payment data event** delivered from outside the workflow.
3. **Send the confirmation email** when payment succeeded, or **cancel the order** when it did not.

<ThemedImage
    alt="The completed orderWorkflow diagram: Start, the reserveInventory activity, a Wait for payment node fed from outside the flow, and an If that branches to sendEmail on the payment path and cancelOrder on the Else path"
    sources={{
        light: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/completed-workflow-light.png'),
        dark: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/completed-workflow-light.png'),
    }}
/>

<Prerequisites>

## Prerequisites

A working Choreo Integrator environment.

<div style={{gridColumn: '1 / -1', minWidth: 0}}>
<PrereqCard icon="cloud" title="Choreo Cloud setup" href="/get-started/setup">Sign up and launch Choreo Integrator in the browser-based cloud editor.</PrereqCard>
</div>

<div style={{gridColumn: '1 / -1', minWidth: 0}}>
<PrereqCard icon="server" title="Temporal server">An internet-accessible Temporal server, such as Temporal Cloud or a publicly exposed self-hosted instance, with its endpoint URL, namespace, and credentials. See [Temporal credentials](../../manage/configurations/temporal-credentials.md).</PrereqCard>
</div>

</Prerequisites>

<Steps>

## Step 1: Create the integration

1. On the project home page, click **Create on Cloud**.

   <ThemedImage
       alt="Choreo Cloud project home showing the Create on Cloud option"
       sources={{
           light: useBaseUrl('/img/deploy/cloud/deploy-from-cloud-editor/project-home.png'),
           dark: useBaseUrl('/img/deploy/cloud/deploy-from-cloud-editor/project-home.png'),
       }}
   />

2. The Choreo Integrator cloud editor opens in your browser.

   <ThemedImage
       alt="Choreo Integrator cloud editor landing page showing an empty integration and the Deploy to Choreo Cloud panel"
       sources={{
           light: useBaseUrl('/img/get-started/setup/cloud-editor-landing.png'),
           dark: useBaseUrl('/img/get-started/setup/cloud-editor-landing.png'),
       }}
   />

:::info Note
The cloud editor creates a default integration for you, so you don't need to name it now. You can change its name when you deploy it. For more information, see [Save and deploy](/deploy-and-run/deploy-to-wso2-cloud/deploy-from-cloud-editor#save-and-deploy).
:::

## Step 2: Add the durable workflow artifact

1. In the design view, click **Add Artifact Manually**.

   <ThemedImage
       alt="Integration design view with the Add Artifact manually button highlighted"
       sources={{
           light: useBaseUrl('/img/get-started/build-api-integration/add-artifact.png'),
           dark: useBaseUrl('/img/get-started/build-api-integration/add-artifact.png'),
       }}
   />

2. On the **Artifacts** page, under **Durable Workflow**, click **Durable Workflow**.

   <ThemedImage
       alt="Artifacts page with Durable Workflow highlighted under Durable Workflow"
       sources={{
           light: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/select-durable-workflow.png'),
           dark: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/select-durable-workflow.png'),
       }}
   />

3. The **Create New Durable Workflow** form opens.
4. Set **Name** to `orderWorkflow`.
5. Click the **Workflow Input Data Type** field, then click **+ Create New Type**.

   <ThemedImage
       alt="Create New Durable Workflow form with Name set to orderWorkflow and Create New Type highlighted"
       sources={{
           light: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/create-new-type.png'),
           dark: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/create-new-type.png'),
       }}
   />

6. The **Create New Type** dialog opens with the correct defaults: the **Create from scratch** tab and **Kind** set to **Record**.
7. Change **Name** from `MyType` to `OrderInfo`.
8. Add each field with the **+** next to **Fields**, then set its name and type:

   | Field | Type |
   |---|---|
   | `id` | `string` |
   | `customerId` | `string` |
   | `customerEmail` | `string` |
   | `total` | `int` |

9. Click **Save**. The record is added to your project and appears under **Types** in the sidebar.

   <ThemedImage
       alt="Create New Type dialog with the OrderInfo record and its id, customerId, customerEmail, and total fields"
       sources={{
           light: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/order-info-type.png'),
           dark: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/order-info-type.png'),
       }}
   />

10. Click **Create**. The workflow is generated and its diagram opens with a single **Start** node, ready for the first step. The workflow receives the order as its `input` parameter.

    <ThemedImage
        alt="Create New Durable Workflow form with OrderInfo set as the Workflow Input Data Type and Create highlighted"
        sources={{
            light: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/create-workflow.png'),
            dark: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/create-workflow.png'),
        }}
    />

:::tip Reuse an existing type
**+ Create New Type** is only one way to fill **Workflow Input Data Type**. Pick any type already in the project straight from the list, or click **Open Type Browser** to search the wider set. Either way the result is an ordinary record you can edit later from **Types** in the sidebar. See [Types](../../develop-and-test/integration-artifacts/supportive-artifacts/types.md).
:::

## Step 3: Reserve the inventory

Anything that touches the outside world belongs in an **activity** rather than in the workflow body. The runtime records each activity result, so a completed activity is never executed twice on replay.

The first step of the order process reserves stock. You create the activity and the call that uses it in one pass, straight from the workflow diagram.

1. On the workflow diagram, click **+**.

   <ThemedImage
       alt="Workflow diagram with the + button below the Start node highlighted"
       sources={{
           light: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/add-step.png'),
           dark: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/add-step.png'),
       }}
   />

2. In the node panel, under **Workflow** > **Steps**, click **Call Activity**. The **Activities** panel opens, listing everything this workflow can call.

   <ThemedImage
       alt="Node panel with Call Activity highlighted under Workflow Steps"
       sources={{
           light: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/select-call-activity.png'),
           dark: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/select-call-activity.png'),
       }}
   />

3. Under **Current Integration**, click **+ Create Activity**.

   <ThemedImage
       alt="Activities panel with Create Activity highlighted under Current Integration"
       sources={{
           light: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/create-activity.png'),
           dark: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/create-activity.png'),
       }}
   />

4. In the **Workflow Activity** form, set **Activity Name** to `reserveInventory`.

   <ThemedImage
       alt="Workflow Activity form with Activity Name set to reserveInventory and Add Parameter highlighted"
       sources={{
           light: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/activity-name.png'),
           dark: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/activity-name.png'),
       }}
   />

5. Under **Parameters**, click **+ Add Parameter**, set **Type** to `OrderInfo` and **Name** to `orderInfo`, then click **Add**.

   <ThemedImage
       alt="Parameter form with Type set to OrderInfo, Name set to orderInfo, and Add highlighted"
       sources={{
           light: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/add-parameter.png'),
           dark: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/add-parameter.png'),
       }}
   />

6. Leave **Return Type** empty. This activity holds stock and returns nothing, so the designer declares it as `returns error?`. Click **Save**.

   <ThemedImage
       alt="Workflow Activity form with the orderInfo parameter added and Save highlighted"
       sources={{
           light: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/save-activity.png'),
           dark: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/save-activity.png'),
       }}
   />

7. In the **Activities** panel, under **Current Integration**, click `reserveInventory` to add the activity call to the workflow diagram.

   <ThemedImage
       alt="Activities panel with reserveInventory highlighted under Current Integration"
       sources={{
           light: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/select-reserve-inventory.png'),
           dark: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/select-reserve-inventory.png'),
       }}
   />

8. Fill in the call form:

   | Field | Value |
   |---|---|
   | **Order Info** | The order to reserve. Switch to **Expression** and set it to the workflow's input parameter. |
   | **Retry Policy** | Leave it on **No Retry**, the default, for now. |

   <ThemedImage
       alt="reserveInventory call form with Expression selected and the workflow input highlighted"
       sources={{
           light: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/set-order-info.png'),
           dark: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/set-order-info.png'),
       }}
   />

9. Click **Save**. The `reserveInventory` node appears on the diagram.

   <ThemedImage
       alt="reserveInventory call form with Order Info set to input and Save highlighted"
       sources={{
           light: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/save-activity-call.png'),
           dark: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/save-activity-call.png'),
       }}
   />

10. Give the activity something to do. Click the open icon on the node to open its own diagram. To keep it simple, mock the implementation with a log line.

    <ThemedImage
        alt="Workflow diagram with the open icon on the reserveInventory node highlighted"
        sources={{
            light: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/open-activity.png'),
            dark: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/open-activity.png'),
        }}
    />

11. On the activity diagram, click **+**.

    <ThemedImage
        alt="reserveInventory activity diagram with the + button below the Start node highlighted"
        sources={{
            light: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/add-log-step.png'),
            dark: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/add-log-step.png'),
        }}
    />

12. In the node panel, under **Logging**, click **Log Info**.

    <ThemedImage
        alt="Node panel with Log Info highlighted under Logging"
        sources={{
            light: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/select-log-info.png'),
            dark: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/select-log-info.png'),
        }}
    />

13. Set **Msg** to `Inventory reserved` and click **Save**.

    <ThemedImage
        alt="log:printInfo form with Msg set to Inventory reserved and Save highlighted"
        sources={{
            light: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/set-log-message.png'),
            dark: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/set-log-message.png'),
        }}
    />

:::tip Where activities come from
**+ Create Activity** writes a new activity function in your integration. **Create Activity from a Connection** wraps an action on a connector you already have, and **[Prebuilt Activities](../../develop-and-test/integration-artifacts/workflow/durable-workflow/prebuilt-activities/prebuilt-activities.md)** holds the ones that ship with the runtime, for REST calls, SOAP calls, and email. See [Activities](../../develop-and-test/integration-artifacts/workflow/durable-workflow/activities.md).
:::

## Step 4: Wait for the payment confirmation

Payment is confirmed by something outside the workflow, such as a payment gateway callback or an operator action. Model that as a **data event**: a named slot the workflow waits on, and that anyone holding the workflow ID can fill.

1. Go back to **orderWorkflow** under **Workflows** in the sidebar, then click the **+** below the `reserveInventory` step.

   <ThemedImage
       alt="orderWorkflow diagram with the + button below the reserveInventory step highlighted"
       sources={{
           light: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/add-await-step.png'),
           dark: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/add-await-step.png'),
       }}
   />

2. In the node panel, under **Workflow** > **Steps**, click **Await Data**. The **Await Data** form opens.

   <ThemedImage
       alt="Node panel with Await Data highlighted under Workflow Steps"
       sources={{
           light: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/select-await-data.png'),
           dark: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/select-await-data.png'),
       }}
   />

3. Under **Data Waits**, fill in the entry:

   | Field | Value | Description                                                                                                                                         |
   |---|---|-----------------------------------------------------------------------------------------------------------------------------------------------------|
   | **Data Receive Variable Name** | `payment` | The variable that receives the value once it arrives.                                                                                               |
   | **Data Type** | `boolean` | The type of the value the workflow expects. To keep this guide simple, use `boolean`. If the payment is received, the value is `true`. |
   | **Data Name** | `payment` | The name used when sending the data into this workflow.                                                                                             |

   <ThemedImage
       alt="Await Data form with Data Receive Variable Name set to payment, Data Type set to boolean, Data Name set to payment, and Add highlighted"
       sources={{
           light: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/add-data-wait.png'),
           dark: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/add-data-wait.png'),
       }}
   />

4. Click **Add** then click **Save**.

   <ThemedImage
       alt="Await Data form with the boolean payment data wait added and Save highlighted"
       sources={{
           light: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/save-await-data.png'),
           dark: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/save-await-data.png'),
       }}
   />

The diagram gains a **Wait for payment** node, drawn with an incoming arrow from outside the flow, because that is where the value comes from.
The workflow now suspends at this line, and only at this line. It holds no thread and no connection while it waits, and it survives a restart of the runtime.

:::tip Data event or human task?
Use a **data event** when a system or a person submits *content* the workflow processes, as here. Use a [human task](../../develop-and-test/integration-artifacts/workflow/durable-workflow/await-human-task.md) when a person makes a *decision* that the cloud-managed control plane should render as a form in their inbox.
:::

## Step 5: Branch on the payment result

The value that arrived decides what happens next, so split the flow in two.

1. Click **+** below the wait.

   <ThemedImage
       alt="orderWorkflow diagram with the + button below the Wait for payment node highlighted"
       sources={{
           light: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/add-if-step.png'),
           dark: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/add-if-step.png'),
       }}
   />

2. In the node panel, under **Control**, click **If**.

   <ThemedImage
       alt="Node panel with If highlighted under Control"
       sources={{
           light: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/select-if.png'),
           dark: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/select-if.png'),
       }}
   />

3. **Condition** is prefilled with `true`. Replace it with the value the wait produced: click the field and pick `payment` under **Variables** in the value helper.
4. Click **Save**.

   <ThemedImage
       alt="If form with the else block added and Save highlighted"
       sources={{
           light: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/save-if.png'),
           dark: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/save-if.png'),
       }}
   />

The diagram splits into a `payment` path and an **Else** path, each with its own **+**.

:::tip More than two paths
**+ Add Else If Block** adds another condition to the same node, and **Remove Else Block** drops the else path when a branch is all you need.
:::

## Step 6: Send the confirmation email

The `payment` path tells the customer the order is confirmed. Create that activity and call it in one pass, the same way as `reserveInventory`.

1. Click **+** on the `payment` path, then under **Workflow** > **Steps**, click **Call Activity**.

   <ThemedImage
       alt="orderWorkflow diagram with the + button on the payment path highlighted"
       sources={{
           light: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/add-payment-step.png'),
           dark: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/add-payment-step.png'),
       }}
   />

   <ThemedImage
       alt="Node panel with Call Activity highlighted under Workflow Steps"
       sources={{
           light: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/select-call-activity-payment.png'),
           dark: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/select-call-activity-payment.png'),
       }}
   />

2. The **Activities** panel already lists `reserveInventory`, so click the **+** on the **Current Integration** header to add another activity.

   <ThemedImage
       alt="Activities panel with the + button on the Current Integration header highlighted"
       sources={{
           light: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/add-another-activity.png'),
           dark: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/add-another-activity.png'),
       }}
   />

3. Set **Activity Name** to `sendEmail`. Click **+ Add Parameter**, set **Type** to `OrderInfo` and **Name** to `orderInfo`, click **Add**, then click **Save**.

   <ThemedImage
       alt="Workflow Activity form with Activity Name set to sendEmail, an OrderInfo parameter named orderInfo, and Add highlighted"
       sources={{
           light: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/create-send-email.png'),
           dark: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/create-send-email.png'),
       }}
   />

   <ThemedImage
       alt="Workflow Activity form with the orderInfo parameter added and Save highlighted"
       sources={{
           light: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/save-send-email.png'),
           dark: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/save-send-email.png'),
       }}
   />

4. Click `sendEmail` in the **Activities** panel under **Current Integration**.

   <ThemedImage
       alt="Activities panel with sendEmail highlighted under Current Integration"
       sources={{
           light: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/select-send-email.png'),
           dark: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/select-send-email.png'),
       }}
   />

5. In the **Order Info** field, switch from **Record** to **Expression**, then select the workflow's input, and click **Save**.

   <ThemedImage
       alt="sendEmail call form with Order Info set to the workflow input as an Expression and Save highlighted"
       sources={{
           light: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/set-send-email-input.png'),
           dark: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/set-send-email-input.png'),
       }}
   />

6. Click the open icon on the `sendEmail` node to open its diagram. To keep it simple, mock the implementation with a log line.

   <ThemedImage
       alt="Workflow diagram with the open icon on the sendEmail node highlighted"
       sources={{
           light: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/open-send-email.png'),
           dark: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/open-send-email.png'),
       }}
   />

7. Click **+**, then click **Log Info** under **Logging**.

   <ThemedImage
       alt="sendEmail activity diagram with the + button below Start highlighted"
       sources={{
           light: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/add-email-log-step.png'),
           dark: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/add-email-log-step.png'),
       }}
   />

   <ThemedImage
       alt="Node panel with Log Info highlighted under Logging"
       sources={{
           light: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/select-email-log-info.png'),
           dark: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/select-email-log-info.png'),
       }}
   />

8. Leave **Msg** on **Text** and type `Email sent to `. Click on the text box to open the field's value helper, then click **Inputs** > `orderInfo` > `customerEmail`. It lands in the text as an expression.

   <ThemedImage
       alt="Msg value helper showing Inputs > orderInfo with customerEmail listed"
       sources={{
           light: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/pick-customer-email.png'),
           dark: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/pick-customer-email.png'),
       }}
   />

9. Click **Save**.

   <ThemedImage
       alt="log:printInfo form with Msg set to Email sent to orderInfo.customerEmail and Save highlighted"
       sources={{
           light: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/save-email-log.png'),
           dark: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/save-email-log.png'),
       }}
   />

:::tip Text or Expression?
Keep **Msg** on **Text** whenever the message is words with values dropped into it. Text takes what you type as the message and turns each inserted value into an interpolation, which is what produces the string template above. **Expression** treats the whole field as a single Ballerina expression, so bare words like `Email sent to` are a syntax error there. The same toggle appears on any field that accepts either, such as **Order Info** on a call.
:::

## Step 7: Cancel the order

The **Else** path releases the hold instead.

1. Go back to **orderWorkflow** under **Workflows** in the sidebar. Click **+** on the **Else** path, then under **Workflow** > **Steps**, click **Call Activity**.

   <ThemedImage
       alt="orderWorkflow diagram with the + button on the Else path highlighted"
       sources={{
           light: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/add-else-step.png'),
           dark: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/add-else-step.png'),
       }}
   />

   <ThemedImage
       alt="Node panel with Call Activity highlighted under Workflow Steps"
       sources={{
           light: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/select-call-activity-else.png'),
           dark: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/select-call-activity-else.png'),
       }}
   />

2. Click the **+** on the **Current Integration** header.

   <ThemedImage
       alt="Activities panel with the + button on the Current Integration header highlighted"
       sources={{
           light: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/add-cancel-activity.png'),
           dark: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/add-cancel-activity.png'),
       }}
   />

3. Set **Activity Name** to `cancelOrder`. Click **+ Add Parameter**, set **Type** to `OrderInfo` and **Name** to `orderInfo`, click **Add**, then click **Save**.

   <ThemedImage
       alt="Workflow Activity form with Activity Name set to cancelOrder, an OrderInfo parameter named orderInfo, and Add highlighted"
       sources={{
           light: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/create-cancel-order.png'),
           dark: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/create-cancel-order.png'),
       }}
   />

   <ThemedImage
       alt="Workflow Activity form with the orderInfo parameter added and Save highlighted"
       sources={{
           light: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/save-cancel-order.png'),
           dark: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/save-cancel-order.png'),
       }}
   />

4. Click `cancelOrder` in the **Activities** panel under **Current Integration**.

   <ThemedImage
       alt="Activities panel with cancelOrder highlighted under Current Integration"
       sources={{
           light: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/select-cancel-order.png'),
           dark: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/select-cancel-order.png'),
       }}
   />

5. In the **Order Info** field, switch from **Record** to **Expression**, then select the workflow's input, and click **Save**.

   <ThemedImage
       alt="cancelOrder call form with Order Info set to the workflow input as an Expression and Save highlighted"
       sources={{
           light: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/set-cancel-order-input.png'),
           dark: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/set-cancel-order-input.png'),
       }}
   />

Both branches now end in an activity, and the workflow is complete.

## Step 8: Start the workflow from a service

A workflow does not start itself. It is launched from an entry point such as a service or an automation, so give the order process an HTTP resource that starts a run for each order that arrives.

1. In the sidebar, click the overview icon next to the integration name to return to the design view.

   <ThemedImage
       alt="Sidebar with the overview icon next to the integration name highlighted, and the integration design view open"
       sources={{
           light: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/return-to-project.png'),
           dark: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/return-to-project.png'),
       }}
   />

2. Click **+ Add Artifact**, then under **Integration as API**, click **HTTP Service**.

   <ThemedImage
       alt="Artifacts page with HTTP Service highlighted under Integration as API"
       sources={{
           light: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/select-http-service.png'),
           dark: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/select-http-service.png'),
       }}
   />

3. On the **Create HTTP Service** form, keep **Service Contract** on **Design From Scratch**, set **Service Base Path** to `/orderProcess`, and click **Create**.

   <ThemedImage
       alt="Create HTTP Service form with Service Base Path set to /orderProcess and Create highlighted"
       sources={{
           light: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/create-http-service.png'),
           dark: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/create-http-service.png'),
       }}
   />

4. The service opens with no resources. Click **+ Add Resource**, then click **POST** in the **Select HTTP Method to Add** list.

   <ThemedImage
       alt="HTTP Service with Add Resource highlighted and POST highlighted in the Select HTTP Method to Add list"
       sources={{
           light: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/add-post-resource.png'),
           dark: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/add-post-resource.png'),
       }}
   />

5. In **New Resource Configuration**, set **Resource Path** to `.`.

   <ThemedImage
       alt="New Resource Configuration with Resource Path set to . and Define Payload highlighted"
       sources={{
           light: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/set-resource-path.png'),
           dark: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/set-resource-path.png'),
       }}
   />

6. Click **+ Define Payload**, open the **Browse Existing Types** tab, click `OrderInfo` under the current integration, and click **Save**.

   <ThemedImage
       alt="Define Payload dialog on the Browse Existing Types tab with OrderInfo selected and Save highlighted"
       sources={{
           light: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/select-orderinfo-payload.png'),
           dark: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/select-orderinfo-payload.png'),
       }}
   />

7. Click **Save** to create the resource. Its own diagram opens.

   <ThemedImage
       alt="New Resource Configuration with the OrderInfo payload added and Save highlighted"
       sources={{
           light: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/save-resource.png'),
           dark: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/save-resource.png'),
       }}
   />

8. Click **+**, then under **Workflow**, click **Run Workflow**.

   <ThemedImage
       alt="Node panel with Run Workflow highlighted under Workflow"
       sources={{
           light: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/select-run-workflow.png'),
           dark: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/select-run-workflow.png'),
       }}
   />

9. Select the `orderWorkflow` under **Current Integration**.

   <ThemedImage
       alt="Durable Workflows panel with orderWorkflow highlighted under Current Integration"
       sources={{
           light: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/select-order-workflow.png'),
           dark: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/select-order-workflow.png'),
       }}
   />

10. Under **Input**, switch from **Record** to **Expression** and set **Input** to the request payload. Leave **Workflow ID Variable Name** as `workflowId`, then click **Save**.

    <ThemedImage
        alt="Run Workflow form with Input set to payload as an Expression and Save highlighted"
        sources={{
            light: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/set-workflow-input.png'),
            dark: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/set-workflow-input.png'),
        }}
    />

11. Click **+** below the **Run Workflow** node, then click **Return** under **Control**. In the **Expression** field, select **Variables**, then select `workflowId`, and click **Save**.

    <ThemedImage
        alt="Resource diagram with the + button below the Run Workflow node highlighted"
        sources={{
            light: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/add-return-step.png'),
            dark: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/add-return-step.png'),
        }}
    />

    <ThemedImage
        alt="Node panel with Return highlighted under Control"
        sources={{
            light: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/select-return.png'),
            dark: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/select-return.png'),
        }}
    />

    <ThemedImage
        alt="Return form with Expression set to workflowId and Save highlighted"
        sources={{
            light: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/set-return-value.png'),
            dark: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/set-return-value.png'),
        }}
    />

The resource now starts a run for every order it receives and answers with that run's workflow ID.

:::info Hold on to the workflow ID
**Run Workflow** starts an instance and returns immediately with its ID. It does not wait for the order to finish, which is the point: the run may sit on the payment event for days. Return the ID to the caller, because it is what ties a later payment confirmation to this instance.
:::

## Step 9: Deliver the payment confirmation

The run is now waiting on the `payment` data event, and it will wait forever until something fills it. Add a second resource that does.

1. Return to the service: click **HTTP Service - /orderProcess** under **Entry Points** in the sidebar.

   <ThemedImage
       alt="Sidebar with HTTP Service - /orderProcess highlighted under Entry Points, and + Resource highlighted on the service"
       sources={{
           light: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/open-http-service.png'),
           dark: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/open-http-service.png'),
       }}
   />

2. Click **+ Resource**, then click **POST**.

   <ThemedImage
       alt="Select HTTP Method to Add list with POST highlighted"
       sources={{
           light: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/add-payment-resource.png'),
           dark: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/add-payment-resource.png'),
       }}
   />

3. The path needs a segment that carries the workflow ID, so click **+ Path Param** and fill in the **Path Parameter** form:

   <ThemedImage
       alt="New Resource Configuration with + Path Param highlighted"
       sources={{
           light: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/add-path-param.png'),
           dark: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/add-path-param.png'),
       }}
   />

   | Field | Value | Description |
   |---|---|---|
   | **Name** | `orderId` | The variable the segment binds to, and the name you reference it by inside the resource. |
   | **Type** | `string` | Under **Advanced Configurations**. Defaults to `string`, which is what a workflow ID is. |

4. Click **Save**. The segment lands in **Resource Path** as `[string orderId]`. Complete the path so it reads `[string orderId]/payment`.

   <ThemedImage
       alt="Path Parameter form with Name set to orderId, Type string, and Save highlighted"
       sources={{
           light: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/set-path-param.png'),
           dark: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/set-path-param.png'),
       }}
   />

5. Click **Save** to create the resource. Its diagram opens.

   <ThemedImage
       alt="New Resource Configuration with Resource Path set to [string orderId]/payment and Save highlighted"
       sources={{
           light: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/set-payment-path.png'),
           dark: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/set-payment-path.png'),
       }}
   />

6. Click **+**, then under **Workflow**, click **Send Data Event**.

   <ThemedImage
       alt="Node panel with Send Data Event highlighted under Workflow"
       sources={{
           light: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/select-send-data-event.png'),
           dark: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/select-send-data-event.png'),
       }}
   />

7. Fill in the **Send Data** form:

   | Field | Value | Description                                                                    |
   |---|---|--------------------------------------------------------------------------------|
   | **Workflow Name** | `orderWorkflow` | The workflow to send the data to. The dropdown lists all the available workflows. |
   | **Target Workflow Id** | `orderId` | The instance to resume, taken from the request path.                           |
   | **Data Name** | `payment` | The event to fill. The dropdown lists the events the chosen workflow declares. |
   | **Data** | `true` | The value to deliver.                                                          |

   <ThemedImage
       alt="Send Data form with Workflow Name orderWorkflow, Target Workflow Id orderId, Data Name payment, Data true, and Save highlighted"
       sources={{
           light: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/set-send-data.png'),
           dark: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/set-send-data.png'),
       }}
   />

8. Click **Save**.

The node reads **Send to payment** and is drawn with a dashed arrow across to `orderWorkflow`, because it hands a value to a run rather than calling something.

:::tip Take the value from the request
Anyone holding the workflow ID can deliver the value, so in a real integration this resource is what the payment gateway's callback hits. This walkthrough leaves it unprotected to keep the steps short. A real callback needs authentication and authorization on this resource, because the workflow ID on its own is not an authorization check. See [Await data events](../../develop-and-test/integration-artifacts/workflow/durable-workflow/data-events.md).
:::

## Step 10: Deploy to Choreo Cloud

The cloud editor runs in Choreo Cloud and cannot connect to a Temporal server on your computer, so you run the workflow by deploying it. A deployed workflow connects to the Temporal server set in its environment's Temporal credential.

1. Add a Temporal credential for your Temporal server, and assign it to the **Development** environment. See [Temporal credentials](../../manage/configurations/temporal-credentials.md).

2. In the cloud editor, open the integration overview and click **Save and Deploy** in the **Deploy to Choreo Cloud** panel. Follow the steps in [Save and deploy](../../deploy-and-run/deploy-to-wso2-cloud/deploy-from-cloud-editor.md#save-and-deploy). Choreo Cloud builds the integration and deploys it to the **Development** environment.

3. In the Choreo Cloud console, open the integration. Wait until the **Development** environment shows **Active** and the **Workflow Definitions** panel lists `orderWorkflow`.

   <ThemedImage
       alt="Development environment with the Active status and orderWorkflow under Workflow Definitions highlighted"
       sources={{
           light: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/check-deployment-active.png'),
           dark: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/check-deployment-active.png'),
       }}
   />

## Step 11: Test the workflow

1. In the **Development** environment, click **Test**.

   <ThemedImage
       alt="Development environment with Test highlighted"
       sources={{
           light: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/click-test.png'),
           dark: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/click-test.png'),
       }}
   />

2. Expand **POST /**, click **Try it out**, and replace the request body with the following:

   ```json
   {
       "customerEmail": "ann@example.com",
       "customerId": "CUS-9",
       "id": "ORD-1",
       "total": 4500
   }
   ```

   <ThemedImage
       alt="POST / resource expanded in the Test console with Try it out highlighted"
       sources={{
           light: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/try-order-request.png'),
           dark: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/try-order-request.png'),
       }}
   />

3. Click **Execute**.

   <ThemedImage
       alt="POST / request body set to the order details, with Execute highlighted"
       sources={{
           light: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/execute-order-request.png'),
           dark: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/execute-order-request.png'),
       }}
   />

4. Confirm that the response code is `201`, and copy the workflow ID from the response body. The workflow reserves the inventory and waits for the `payment` event.

   <ThemedImage
       alt="Server response with the 201 code and the workflow ID in the response body highlighted"
       sources={{
           light: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/check-order-response.png'),
           dark: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/check-order-response.png'),
       }}
   />

5. Expand **POST /\{orderId\}/payment**, click **Try it out**, and set **orderId** to the workflow ID.

6. Click **Execute**.

   <ThemedImage
       alt="POST /{orderId}/payment request with orderId set to the workflow ID, and orderId and Execute highlighted"
       sources={{
           light: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/execute-payment-request.png'),
           dark: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/execute-payment-request.png'),
       }}
   />

7. Confirm that the response code is `202`. The workflow resumes and sends the confirmation email.

   <ThemedImage
       alt="Server response for the payment request with the 202 code highlighted"
       sources={{
           light: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/check-payment-response.png'),
           dark: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/check-payment-response.png'),
       }}
   />

8. Click **Back to Overview**. In the **Development** environment, confirm that **COMPLETED (24H)** shows `1`.

   <ThemedImage
       alt="Development environment with COMPLETED (24H) showing 1 highlighted"
       sources={{
           light: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/check-workflow-completed.png'),
           dark: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/check-workflow-completed.png'),
       }}
   />

9. Click **View Workflows** and confirm that the run shows **Completed**.

   <ThemedImage
       alt="Workflow runs list with the completed orderWorkflow run highlighted"
       sources={{
           light: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/check-workflow-runs.png'),
           dark: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/check-workflow-runs.png'),
       }}
   />

10. In the **Development** environment, click **View Logs** and confirm that the logs show `Inventory reserved` and `Email sent to ann@example.com`.

    <ThemedImage
        alt="Runtime logs with the Inventory reserved and Email sent to ann@example.com lines highlighted"
        sources={{
            light: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/check-deployment-logs.png'),
            dark: useBaseUrl('/img/workflows/getting-started/build-an-order-processing-workflow/check-deployment-logs.png'),
        }}
    />

To test the cancellation path, change the payment resource's **Data** value to `false`, deploy the integration again, and start a new workflow.

</Steps>

## Source code

<details>
<summary>View the generated Ballerina code</summary>

The steps above generate the following complete, runnable Ballerina program: the types, the workflow and its activities, and the HTTP service that starts and resumes it.

**Types** (`types.bal`)

```ballerina
type OrderInfo record {|
    string id;
    string customerId;
    string customerEmail;
    int total;
|};

# Data record for workflow function
type OrderWorkflowData record {|
    future<boolean> payment;
|};
```

**Workflow and activities**

```ballerina
import ballerina/log;
import ballerina/workflow;

@workflow:Workflow
function orderWorkflow(workflow:Context ctx, OrderInfo input, OrderWorkflowData data) returns json|error {
    () _ = check ctx->callActivity(reserveInventory, {orderInfo: input});
    boolean payment = check wait data.payment;
    if payment {
        () _ = check ctx->callActivity(sendEmail, {orderInfo: input});
    } else {
        () _ = check ctx->callActivity(cancelOrder, {orderInfo: input});
    }
}

@workflow:Activity
function reserveInventory(OrderInfo orderInfo) returns error? {
    log:printInfo("Inventory reserved");
}

@workflow:Activity
function sendEmail(OrderInfo orderInfo) returns error? {
    log:printInfo(string `Email sent to ${orderInfo.customerEmail}`);
}

@workflow:Activity
function cancelOrder(OrderInfo orderInfo) returns error? {
}
```

**HTTP service**

```ballerina
import ballerina/http;
import ballerina/workflow;

listener http:Listener httpDefaultListener = http:getDefaultListener();

service /orderProcess on httpDefaultListener {

    resource function post .(OrderInfo payload) returns json|error {
        string workflowId = check workflow:run(orderWorkflow, payload);
        return workflowId;
    }

    resource function post [string orderId]/payment() returns json|error {
        check workflow:sendData(orderWorkflow, orderId, "payment", true);
    }
}
```

</details>

## Watch it run

Once the integration is [connected to the cloud-managed control plane](../../manage/integrations/workflows.md), every instance is visible there, running or completed. The [execution graph](../../manage/integrations/workflows.md#view-the-details-of-a-run) shows the reservation as a completed activity and the pending payment as a `DATA` node with status `WAITING`, so anyone can see exactly what an order is blocked on instead of guessing that it is stuck.

## Next steps

- [Activities](../../develop-and-test/integration-artifacts/workflow/durable-workflow/activities.md) — retry policies, activity inputs, and how results are recorded.
- [Await data events](../../develop-and-test/integration-artifacts/workflow/durable-workflow/data-events.md) — several events, timeouts, and delivering data from other systems.
- [Await human task](../../develop-and-test/integration-artifacts/workflow/durable-workflow/await-human-task.md) — pause the order for a person's decision instead of a system's data.
- [Durable timers](../../develop-and-test/integration-artifacts/workflow/durable-workflow/durable-timers.md) — add a payment deadline that survives restarts.
