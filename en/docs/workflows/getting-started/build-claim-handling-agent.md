---
sidebar_position: 2
title: "Build a Claim Handling Agent"
description: Build your first durable agentic workflow in WSO2 Integrator — an AI agent that validates expense claims and pays them only after a Finance reviewer approves.
keywords: [wso2 integrator, durable workflow, agentic workflow, durable agent, claim workflow, human in the loop, approval]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Build a Claim Handling Agent

**Time:** 15 minutes | **What you'll build:** A durable AI agent that receives expense claims, validates them, and pays them out — but only after a Finance reviewer approves the payment from the Integration Control Plane. If the process crashes while waiting, it resumes exactly where it left off.

:::info Prerequisites

- [WSO2 Integrator installed](../../get-started/setup/local-setup.md)
- Signed in to WSO2 Integrator Copilot (provides the default AI model — no API key needed)
- [Docker installed](https://docs.docker.com/engine/install/), including Docker Compose. It runs the Temporal server that keeps the workflow's durable record.

:::

## Step 1: Create the integration

1. Open WSO2 Integrator.
2. Select **Create** in the **Create New Integration** card.
3. Set **Integration Name** to `ClaimHandler`.
4. Select **Create Integration**.

## Step 2: Add a Durable Agentic Workflow

Creating the agent is also where you describe it: the model it thinks with, its role, and the instructions it plans from.

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

1. In the design view, click **+ Add Artifact**.
2. Under **Durable Workflow**, select **Durable Agentic Workflow**. The **Create New Durable Agentic Workflow** form opens.

   ![Create Durable Agent](/img/workflows/getting-started/build-a-claim-workflow-agent/create-agent.png)

3. Set **Name** to `claimAgent`.
4. Leave **Model** on **Default WSO2 Model Provider**, the model your Copilot sign-in provides.
5. Set **Role** to `Expense claim assistant`.
6. Set **Instructions** to:

   ```text
   Process expense claims end to end. Validate each claim with validateClaim first and
   reject invalid claims with a clear reason. When a claim is valid, pay it with payClaim
   using the claimed amount. Finish with a one-line summary of the outcome.
   ```

7. **Input Data Type** is the structured payload each run starts with. Create the claim record here: click the field, select **+ Create New Type**, and on the **Create from scratch** tab keep **Kind** as **Record**, set **Name** to `ExpenseClaim`, then click **+** next to **Fields** and add:

   | Field     | Type      |
   |-----------|-----------|
   | `claimId` | `string`  |
   | `amount`  | `decimal` |

8. Click **Save**.

9. Click **Create Agent**.

![Creating the claimAgent durable agentic workflow, filling in the model, role, instructions, and an ExpenseClaim input type](/img/workflows/getting-started/build-a-claim-workflow-agent/create-agent.gif)

</TabItem>
<TabItem value="code" label="Ballerina Code">

```ballerina
import ballerina/ai;
import ballerina/workflow;

type ExpenseClaim record {|
    string claimId;
    decimal amount;
|};

final ai:Wso2ModelProvider wso2ModelProvider = check ai:getDefaultModelProvider();
final workflow:DurableAgent claimAgent = check new ({
    systemPrompt: {
        role: string `Expense claim assistant`,
        instructions: string `Process expense claims end to end. Validate each claim with validateClaim first and
        reject invalid claims with a clear reason. When a claim is valid, pay it with payClaim
        using the claimed amount. Finish with a one-line summary of the outcome.`
    },
    model: wso2ModelProvider,
    inputType: ExpenseClaim
});
```

</TabItem>
</Tabs>

## Step 3: Attach the agent activities

Activities are the units of work the agent can call. Each one runs durably — completed work is never lost or repeated, even across restarts.

### Attach the claim validator

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

1. Click **+** on the activity anchor at the **bottom right** of the agent node. The **Activities** panel opens.
2. Under **Current Integration**, click **+ Create Activity**. The **Workflow Activity** form opens.
3. Set **Activity Name** to `validateClaim`.
4. Under **Parameters**, click **+ Add Parameter**. Set **Type** to the `ExpenseClaim` record created in Step 2 and **Name** to `expenseClaim`, then click **Add**.
5. Set **Return Type** to `boolean` and click **Save**.
6. The register form opens, where the activity becomes one of the agent's capabilities. Leave **Retry Policy** on **No Automatic Retry** and click **Save**.

![Creating the validateClaim activity and registering it on the claimAgent node](/img/workflows/getting-started/build-a-claim-workflow-agent/attach-validate-claim.gif)

`validateClaim` joins the agent node as a capability and appears under **Workflow Activities** in the left sidebar.

</TabItem>
<TabItem value="code" label="Ballerina Code">

`workflow.bal`:
```ballerina
import ballerina/ai;
import ballerina/workflow;

final ai:Wso2ModelProvider wso2ModelProvider = check ai:getDefaultModelProvider();
final workflow:DurableAgent claimAgent = check new ({
    systemPrompt: {
        role: string `Expense claim assistant`,
        instructions: string `Process expense claims end to end. Validate each claim with validateClaim first and
        reject invalid claims with a clear reason. When a claim is valid, pay it with payClaim
        using the claimed amount. Finish with a one-line summary of the outcome.`
    },
    model: wso2ModelProvider,
    inputType: ExpenseClaim,
    activities: [validateClaim]
});
```

`functions.bal`:
```ballerina
@workflow:Activity
function validateClaim(ExpenseClaim expenseClaim) returns boolean {
}
```

</TabItem>
</Tabs>

### Define the claim validator body

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

Creating the activity gives it a signature but an empty body. The activity is a function, so its flow returns the validation result. Let's make it return `true` only for positive claim amounts.:

1. In the left sidebar, expand **Workflow Activities** and select `validateClaim`.
2. In the node panel on the right, under **Control**, select **Return**.
3. Click the **Expression** field to open the value helper, then select **Inputs** > `expenseClaim` > `amount`.
4. With the cursor after the inserted value, type `> 0d` to require a positive amount.
5. Click **Save**, then select `claimAgent` under **Workflows** to return to the agent diagram.

![Defining the validateClaim activity body with a Return step](/img/workflows/getting-started/build-a-claim-workflow-agent/validate-claim-body.gif)

</TabItem>
<TabItem value="code" label="Ballerina Code">

```ballerina
@workflow:Activity
function validateClaim(ExpenseClaim expenseClaim) returns boolean {
    return expenseClaim.amount > 0d;
}
```

</TabItem>
</Tabs>

### Add the payment activity

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

Paying out is the risky step, so gate it behind a person. The activity is created the same way as the validator, and the register form is where the gate goes on:

1. Click **+** on the activity anchor at the **bottom right** of the agent node, then click **+ Create Activity**.
2. Set **Activity Name** to `payClaim`.
3. Under **Parameters**, click **+ Add Parameter**. Set **Type** to `ExpenseClaim` and **Name** to `expenseClaim`, then click **Add**.
4. Leave **Return Type** empty and click **Save**.
5. On the register form, expand **Advanced Configurations** and check **Requires Approval**. Now, before the agent runs the activity, a review activity is created and the agent suspends durably until a reviewer proceeds or rejects.
6. Set **Reviewer Roles** to `Finance`, the roles permitted to decide that approval.
7. Click **Save**.

![Creating the payClaim activity and registering it with Requires Approval and the Finance reviewer role](/img/workflows/getting-started/build-a-claim-workflow-agent/attach-pay-claim.gif)

`payClaim` joins the agent node beside `validateClaim`, drawn with a badge marking it as gated. The agent can now propose a payment, but it cannot release one on its own.

</TabItem>
<TabItem value="code" label="Ballerina Code">

`workflow.bal`:
```ballerina
import ballerina/ai;
import ballerina/workflow;

final ai:Wso2ModelProvider wso2ModelProvider = check ai:getDefaultModelProvider();
final workflow:DurableAgent claimAgent = check new ({
    systemPrompt: {
        role: string `Expense claim assistant`,
        instructions: string `Process expense claims end to end. Validate each claim with validateClaim first and
        reject invalid claims with a clear reason. When a claim is valid, pay it with payClaim
        using the claimed amount. Finish with a one-line summary of the outcome.`
    },
    model: wso2ModelProvider,
    inputType: ExpenseClaim,
    activities: [validateClaim,
                {activity: payClaim, requiresApproval: true, userRoles: "Finance"}]
});
```

`functions.bal`:
```ballerina
@workflow:Activity
function payClaim(ExpenseClaim expenseClaim) {
}
```

</TabItem>
</Tabs>

## Step 4: Start the agent from a service

An agent does nothing until something starts it. Give the integration an HTTP resource that hands each incoming claim to `claimAgent` and answers with the ID of the run it started.

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

1. Click **+ Add Artifact**, then under **Integration as API**, click **HTTP Service**.
2. On the **Create HTTP Service** form, keep **Service Contract** on **Design From Scratch**, leave **Service Base Path** as `/`, and click **Create**.
3. The service opens with no resources. Click **Add Resource**.
4. Set **HTTP Method** to **POST** and **Resource Path** to `claim`.
5. Click **+ Define Payload**, open the **Browse Existing Types** tab, select `ExpenseClaim` under the current integration, and click **Save**.
6. Click **Save** to create the resource. Its own diagram opens.
7. Click **+**, then under **Workflow**, click **Run Durable Agent**.
8. Set **Durable Agentic Workflow** to `claimAgent`.
9. Set **Query** to `Process Claim`. This is the user turn appended to the agent's system prompt, so the model plans this run from it.
10. Set **Input** to the request `payload`, which carries the claim itself, and leave **Instance ID Variable Name** as `instanceId`. Click **Save**.
11. Click **+** below the node, click **Return** under **Control**, set **Expression** to `instanceId`, and click **Save**.

The resource now starts an agent run for every claim it receives and answers with that run's instance ID.

![Adding an HTTP service with a POST claim resource that starts the claimAgent run and returns its instance ID](/img/workflows/getting-started/build-a-claim-workflow-agent/start-agent-from-service.gif)

</TabItem>
<TabItem value="code" label="Ballerina Code">

`main.bal`:
```ballerina
import ballerina/http;

listener http:Listener httpDefaultListener = http:getDefaultListener();

service / on httpDefaultListener {
    resource function post claim(@http:Payload ExpenseClaim payload) returns json|error {
        do {
            string instanceId = check claimAgent.run("Process Claim", payload);
            return instanceId;
        } on fail error err {
            // handle error
            return error("unhandled error", err);
        }
    }
}
```

</TabItem>
</Tabs>

:::info Hold on to the instance ID
`run` starts the agent and returns immediately with its instance ID. It does not wait for the claim to finish, which is the point: the run may sit on the `payClaim` approval for days. Return the ID to the caller, because it is what addresses this run later.
:::

## Step 5: Start the local ICP server

The gated `payClaim` suspends the run until a Finance reviewer decides on it, and the Integration Control Plane console is where that decision is made. Start a local ICP server before running the integration, so the approval has somewhere to land.

1. Click **ClaimHandler** in the breadcrumb to open the integration overview.
2. In the right panel, under **Integration Control Plane**, check **Enable ICP monitoring**.
3. Expand **Publish to local ICP** and click **Start ICP Server**.

The terminal opens on an **ICP Server** task and logs the startup. The server is ready once it reports the console address:

```text
Starting ICP Server with configuration: /Applications/WSO2 Integrator.app/Contents/components/icp/conf/deployment.toml
... message="WSO2 Integrator: ICP Console started at https://localhost:9446"
... message="Workflow management service started at 0.0.0.0:9446"
```

The status bar at the bottom right switches from **ICP: Stopped** to **ICP: Running**.

![Enabling ICP monitoring, expanding Publish to local ICP, and starting the local ICP server from the Deployment Options panel](/img/workflows/getting-started/build-a-claim-workflow-agent/start-icp-server.gif)

:::info Start ICP before the integration
**Enable ICP monitoring** writes the runtime bridge configuration that points this integration at the local ICP server. Start ICP first so the integration registers with it as it boots; otherwise the run has no inbox to publish the `payClaim` approval to.
:::

## Step 6: Start the Temporal server

A durable workflow keeps its record in a workflow engine. The runtime's `mode` defaults to `LOCAL`, which expects a Temporal server on `localhost:7233`, so start one before running the integration. Temporal's sample Compose file brings up a server and its dependencies in Docker:

```bash
git clone https://github.com/temporalio/samples-server.git
cd samples-server/compose
docker compose up
```

Leave the containers running for the rest of this guide.

## Step 7: Run it

1. Select **Run** in the integration header to start the integration.
2. Watch the terminal. After `Compiling source` and `Running executable`, the runtime bridge connects to the ICP server started in Step 5:

   ```text
   ... module=wso2/icp.runtime.bridge message="ICP agent initialized with server URL: https://localhost:9445"
   ... module=wso2/icp.runtime.bridge message="ICP agent started successfully with job ID: {\"id\":\"59000\"}"
   ... module=wso2/icp.runtime.bridge message="Full heartbeat acknowledged by ICP server"
   ```

   The heartbeat is the integration registering itself, which is what puts the `payClaim` approval in front of a reviewer later.

## Step 8: Submit a new claim

Once the service is up, a `Tryit.hurl` file opens automatically beside the designer, holding a request generated from the `claim` resource. Send the claim from there.

<Tabs>
<TabItem value="tryit" label="Try It" default>

The generated request already carries the method, URL, and content type, along with the schema the resource expects:

![Running the integration, with the Try It file opening automatically once the service is up](/img/workflows/getting-started/build-a-claim-workflow-agent/run-and-try-it.gif)

Replace the `{?}` placeholders with a real claim, then click the run button in the request cell's left gutter to send it.

```json
{
  "claimId": "2002",
  "amount": 1500,
  "purpose": "Demo purpose"
}
```
</TabItem>
<TabItem value="curl" label="curl">

```bash
curl -X POST localhost:9090/claim -H 'Content-Type: application/json' \
  -d '{"claimId":"2002","amount":1500,"purpose":"Demo purpose"}'
```

</TabItem>
</Tabs>

The response appears under the cell as **201 Created**, with the new run's instance ID as the body:

```text
Status: 201 Created
01a0b2bd-4405-7694-8b4d-4e3bfb1eeea0
```

![Filling in the claim payload and sending it from the Try It file, returning 201 Created with the instance ID](/img/workflows/getting-started/build-a-claim-workflow-agent/submit-claim.gif)

The agent validates the claim, decides to pay it, and **pauses**: the gated `payClaim` created an approval review for the `Finance` role. The workflow now waits durably; you can even restart the integration and nothing is lost.

## Step 9: See the claim waiting in ICP

The run is now sitting on the `payClaim` approval, and the ICP console is where that wait is visible.

![The claimAgent execution timeline, with Thinking and validateClaim completed and review-payClaim still running](/img/workflows/getting-started/build-a-claim-workflow-agent/review-pay-claim-waiting.png)

1. In WSO2 Integrator, under **Publish to local ICP**, click **View in ICP**. The console opens in the browser, already signed in as the super admin, on the **All Projects** page.
2. That page already lists `default-project`, and it holds an integration named `claimhandler`. Neither was created by hand: the integration registered both with ICP when it started, and because it carries a durable workflow it is registered as a workflow integration.
3. Open `default-project`, then `claimhandler`. The **Dev** environment reports **1/1 Active** and lists **Workflow Definitions** with `claimAgent` selected.
4. Click **View Workflows**. The **Workflow Executions** page lists one instance for `claimAgent`, whose **Workflow ID** is the instance ID the claim request returned, with status **Running** and the time it started.
5. Click the instance to open **Execution Details**:

   - **Workflow Input** shows the claim the run started from, the **Query** it was given, and the agent name.
   - The timeline below is the run so far: the agent thought, completed `validateClaim`, thought again.
   - At the last of the timeline you will see agent opened **review-payClaim**, which is still running. That open review is the gate holding the payment.

![Opening the ICP console on the auto-registered claimhandler integration and drilling into the running claimAgent execution waiting on review-payClaim](/img/workflows/getting-started/build-a-claim-workflow-agent/view-claim-in-icp.gif)

## Step 10: Assign the Finance role to your user

The review is on the timeline, but it is not yet addressed to you. `payClaim` was registered with `Finance` as its reviewer role, and the console signs you in as `admin`, a super admin that does not carry that role, so the approval will not reach you until your user does.

1. In the left navigation, under **MANAGEMENT**, click **Access-control**. The **Users** tab lists a single user, `admin` (**System Administrator**), in the **Super Admins** and **default-project Admins** groups.
2. Open the **Roles** tab. It holds only the built-in roles (**Admin**, **Developer**, **Project Admin**, **Super Admin**, **Viewer**), so click **+ Create Role**, set **Role Name** to `Finance`, and click **Create**. Leave every permission group unchecked.
3. Open the **Groups** tab and click **Super Admins**, the group that holds `admin`.
4. On the **ROLES** tab, click **+ Add Roles**. Select `Finance` in the **Roles** dropdown, leave **Applicable Environments** on **All Environments**, and click **Add**.

![Creating the Finance role under Access Control and adding it to the Super Admins group](/img/workflows/getting-started/build-a-claim-workflow-agent/assign-finance-role.gif)

The console confirms **Role(s) added to group successfully**, and the group's role list now holds **Finance** beside **Super Admin**, both mapped at **Organization** level for **All** environments. Roles reach a user through their groups, so `admin` is now a `Finance` reviewer.

## Step 11: Approve the payment

1. Use the breadcrumb at the top of the console to return to `default-project`, then `claimhandler`.
2. In the left navigation, under **MANAGE**, click **Human Tasks**. The page gathers the human tasks and review activities for `claimhandler`, and it shows only the ones applicable to you. Without the `Finance` role added in Step 10, this list stays empty.
3. With **Status** on **Pending**, one task is listed: **Approval required: payClaim**, badged **Approval gate**, on `claimAgent`, carrying the workflow ID of your run.
4. Click the task. The panel lays out the decision:

   - **Activity** names the activity and its workflow, links the parent workflow, and gives the **Trigger** as `Approval gate — review before the activity runs`.
   - **Activity Arguments** is read-only and holds the claim ID and amount the agent proposes to pay.
   - **Decisions** offers **Proceed** (run with the original arguments), **Proceed with Changes** (edit the arguments first), and **Reject** (fail the activity instead).

5. Click **Proceed**. **Confirm Proceed** repeats the arguments and warns that the activity runs with them and that this cannot be undone. Click **Proceed** to release the payment.

The console reports **Activity proceeded.**, and on the next refresh the list reads **No pending tasks**.

![Opening the payClaim approval under Human Tasks and releasing the payment with Proceed](/img/workflows/getting-started/build-a-claim-workflow-agent/approve-pay-claim.gif)

Open the run again from **Workflows**. `payClaim` has now completed. The agent takes one closing turn, and the execution reads **Completed**, with a **Closed** time and a **Workflow Result** holding the agent's own summary of the claim:

```text
The claim has been processed successfully and paid with the ID PAY-2002.
```

![The completed claimAgent execution, with its workflow result and an all-green timeline ending in payClaim](/img/workflows/getting-started/build-a-claim-workflow-agent/claim-run-completed.png)

The timeline is green end to end, and it shows where the time went: the thinking turns and `validateClaim` took seconds, `payClaim` ran in milliseconds once released, and `review-payClaim` accounts for almost the entire run. The claim was not being worked on for 52 of its 53 minutes. It was waiting for a person, and it lost nothing by waiting.

## Next steps

- [Await human task](../develop/await-human-task.md) — ask people structured questions, not just approvals.
- [Error handling and review activities](../develop/review-activity-and-error-handling.md) — let a human fix a failed step's input and retry it.
- [Create a Durable Agent](../agentic/create-durable-agent.md) — events, multi-turn conversations, and agent-to-agent collaboration.
