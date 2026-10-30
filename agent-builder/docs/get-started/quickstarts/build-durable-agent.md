---
title: Build a Claim Handling Durable Agent
---

# Build a Claim Handling Durable Agent

<QuickstartHeader
  time="15 minutes"
  build={<>A durable AI agent that handles expense claims.</>}
/>

The durable AI agent receives expense claims, validates them, and pays them out — but only after a Finance reviewer approves the payment from the Integration Control Plane. If the process crashes while waiting, it resumes exactly where it left off.

## Prerequisites

A working WSO2 Agent Builder environment.

<PrereqCard icon="local" title="Local setup" href="/get-started/setup">
  Install and launch WSO2 Integrator on your machine.

<PrereqCard icon="cloud" title="WSO2 Cloud Account" href="/get-started/setup" cloud>
  For AI assisted development and WSO2 Cloud deployments.

Also required:

<PrereqCard icon="ai" title="WSO2 Integrator Copilot" href="/get-started/setup" cloud>
  Signed in to WSO2 Integrator Copilot (provides the default AI model — no API key needed)

<PrereqCard icon="cloud" title="Docker" href="https://docs.docker.com/engine/install/">
  Docker installed, including Docker Compose. It runs the Temporal server that keeps the workflow's durable record.

## Step 1: Create the project

1. Open WSO2 Agent Builder. Under **Start Building your Agent**, click **Create**.

   If you're not signed in, click **Sign In** first. The default WSO2 model provider used in this quick start needs you to be signed in before you run the agent.

2. Set **Project name** to `ClaimHandling`.

3. Under **What do you want to build?**, keep **Agentic Integration** selected.

4. Set **Agentic integration name** to `ClaimHandler`.

5. Click **Create Agentic Integration**.

   <ThemedImage
      alt="The Create a Project form with Project name set to ClaimHandling, Agentic Integration selected, Agentic integration name set to ClaimHandler, and the Create Agentic Integration button highlighted."
      sources={{
         light: useBaseUrl('/img/get-started/build-durable-agent/create-project-v1.0.png'),
         dark: useBaseUrl('/img/get-started/build-durable-agent/create-project-v1.0.png'),
      }}
   />

## Step 2: Create the durable agent

Creating the agent is also where you describe it: the model it thinks with, its role, and the instructions it plans from.

1. The project opens on the new `ClaimHandler` integration. Under **Or start from scratch**, click **Add Agent**.

2. In the **Add Agent** dialog, select **Create Durable Agent**.

   <ThemedImage
      alt="The Add Agent dialog with Create Agent, Create Durable Agent, and Create Agent Definition under Create New, with Create Durable Agent highlighted."
      sources={{
         light: useBaseUrl('/img/get-started/build-durable-agent/add-agent-dialog-v1.0.png'),
         dark: useBaseUrl('/img/get-started/build-durable-agent/add-agent-dialog-v1.0.png'),
      }}
   />

3. Set **Name** to `claimAgent`.

4. Leave **Model** on **Default WSO2 Model Provider**.

5. Set **Role** to `Expense claim assistant`.

6. Set **Instructions** to:

   ```text
   Process expense claims end to end. Validate each claim with validateClaim first and reject invalid claims with a clear reason. When a claim is valid, pay it with payClaim using the claimed amount. Finish with a one-line summary of the outcome.
   ```

   <ThemedImage
      alt="The Create Durable Agent form with Name set to claimAgent, Model set to Default WSO2 Model Provider, Role set to Expense claim assistant, and the Instructions filled in."
      sources={{
         light: useBaseUrl('/img/get-started/build-durable-agent/create-durable-agent-form-1-v1.0.png'),
         dark: useBaseUrl('/img/get-started/build-durable-agent/create-durable-agent-form-1-v1.0.png'),
      }}
   />

7. **Input Data Type** is the structured payload each run starts with. Create the claim record here: click the field, select **Create New Type**, and on the **Create from scratch** tab keep **Kind** as **Record**, set **Name** to `ExpenseClaim`, then click **+** next to **Fields** and add:

   | Field     | Type      |
   |-----------|-----------|
   | `claimId` | `string`  |
   | `amount`  | `decimal` |

8. Click **Save**.

   <ThemedImage
      alt="The Create New Type form with Kind set to Record, Name set to ExpenseClaim, the claimId string and amount decimal fields, and the Save button highlighted."
      sources={{
         light: useBaseUrl('/img/get-started/build-durable-agent/create-type-v1.0.png'),
         dark: useBaseUrl('/img/get-started/build-durable-agent/create-type-v1.0.png'),
      }}
   />

9. Click **Create Agent**.

   <ThemedImage
      alt="The Create Durable Agent form with Input Data Type set to ExpenseClaim and the Create Agent button highlighted."
      sources={{
         light: useBaseUrl('/img/get-started/build-durable-agent/create-durable-agent-form-2-v1.0.png'),
         dark: useBaseUrl('/img/get-started/build-durable-agent/create-durable-agent-form-2-v1.0.png'),
      }}
   />

The agent's canvas opens. It shows the durable agent with its role and instructions, the model provider it uses, and **Add Trigger**, **Add Human Task**, **Add Data Event**, and **Add Tool/Activity** for extending it.

<ThemedImage
   alt="The claimAgent durable agent canvas with Add Trigger, Add Human Task, and Add Data Event on the left, the Durable Agent node with its role and instructions, wso2ModelProvider on the right, and Add Tool/Activity below."
   sources={{
      light: useBaseUrl('/img/get-started/build-durable-agent/durable-agent-canvas-v1.0.png'),
      dark: useBaseUrl('/img/get-started/build-durable-agent/durable-agent-canvas-v1.0.png'),
   }}
/>

## Step 3: Attach the agent activities

Activities are the units of work the agent can call. Each one runs durably — completed work is never lost or repeated, even across restarts.

### Attach the claim validator

1. On the agent canvas, click **Add Tool/Activity**. The activities panel opens.

2. Under **Current Integration**, click **Create Activity**. The **Workflow Activity** form opens.

   <ThemedImage
      alt="The activities panel beside the claimAgent canvas, with Create Activity highlighted under Current Integration."
      sources={{
         light: useBaseUrl('/img/get-started/build-durable-agent/activities-panel-v1.0.png'),
         dark: useBaseUrl('/img/get-started/build-durable-agent/activities-panel-v1.0.png'),
      }}
   />

3. Set **Activity Name** to `validateClaim`.

4. Under **Parameters**, click **Add Parameter**. Set **Type** to the `ExpenseClaim` record created in Step 2 and **Name** to `expenseClaim`, then click **Add**.

5. Set **Return Type** to `boolean` and click **Save**.

   <ThemedImage
      alt="The Workflow Activity form with Activity Name set to validateClaim, an ExpenseClaim expenseClaim parameter, Return Type set to boolean, and the Save button highlighted."
      sources={{
         light: useBaseUrl('/img/get-started/build-durable-agent/validate-claim-form-v1.0.png'),
         dark: useBaseUrl('/img/get-started/build-durable-agent/validate-claim-form-v1.0.png'),
      }}
   />

6. Click `validateClaim` under **Current Integration**. Leave **Approval Policy** and **Retry Policy** at their defaults and click **Save**.

   <ThemedImage
      alt="The validateClaim register form with Approval Policy and Retry Policy, and the Save button highlighted."
      sources={{
         light: useBaseUrl('/img/get-started/build-durable-agent/register-validate-claim-v1.0.png'),
         dark: useBaseUrl('/img/get-started/build-durable-agent/register-validate-claim-v1.0.png'),
      }}
   />

`validateClaim` joins the agent node as an activity.

### Define the claim validator body

Creating the activity gives it a signature but an empty body. The activity is a function, so its flow returns the validation result. Make it return `true` only for positive claim amounts:

1. On the agent canvas, click the menu next to `validateClaim` and select **View**. The activity's flow opens.

   <ThemedImage
      alt="The claimAgent canvas with the validateClaim activity menu open, showing Edit, View, and Delete, with View highlighted."
      sources={{
         light: useBaseUrl('/img/get-started/build-durable-agent/activity-menu-view-v1.0.png'),
         dark: useBaseUrl('/img/get-started/build-durable-agent/activity-menu-view-v1.0.png'),
      }}
   />

2. Click **+** on the flow diagram to open the node panel, then under **Control**, select **Return**.

3. Click the **Expression** field to open the value helper, then select **Inputs** > `expenseClaim` > `amount`.

4. With the cursor after the inserted value, type `> 0d` to require a positive amount.

5. Click **Save**.

   <ThemedImage
      alt="The validateClaim activity flow with the Return panel open, the Expression set to expenseClaim.amount > 0d, and the Save button highlighted."
      sources={{
         light: useBaseUrl('/img/get-started/build-durable-agent/validate-claim-return-v1.0.png'),
         dark: useBaseUrl('/img/get-started/build-durable-agent/validate-claim-return-v1.0.png'),
      }}
   />

6. Select `claimAgent` in the breadcrumb to return to the agent canvas.

### Add the payment activity

Paying out is the risky step, so gate it behind a person. The activity is created the same way as the validator, and the register form is where the gate goes on:

1. On the agent canvas, click **Add Tool/Activity**, then under **Current Integration**, click **Create Activity**.

2. Set **Activity Name** to `payClaim`.

3. Under **Parameters**, click **Add Parameter**. Set **Type** to `ExpenseClaim` and **Name** to `expenseClaim`, then click **Add**.

4. Leave **Return Type** empty and click **Save**.

5. Click `payClaim` under **Current Integration** to open its register form, and set **Approval Policy** to **Human Approval**. Now, before the agent runs the activity, a review activity is created and the agent suspends durably until a reviewer proceeds or rejects.

6. Set **Reviewer Roles** to `Finance`, the roles permitted to decide that approval.

7. Click **Save**.

   <ThemedImage
      alt="The payClaim register form with Approval Policy set to Human Approval and Reviewer Roles set to Finance."
      sources={{
         light: useBaseUrl('/img/get-started/build-durable-agent/pay-claim-approval-v1.0.png'),
         dark: useBaseUrl('/img/get-started/build-durable-agent/pay-claim-approval-v1.0.png'),
      }}
   />

`payClaim` joins the agent node beside `validateClaim`, drawn with a badge marking it as gated. The agent can now propose a payment, but it cannot release one on its own.

<ThemedImage
   alt="The claimAgent canvas with the validateClaim and payClaim activities attached, and a person badge on payClaim."
   sources={{
      light: useBaseUrl('/img/get-started/build-durable-agent/agent-with-activities-v1.0.png'),
      dark: useBaseUrl('/img/get-started/build-durable-agent/agent-with-activities-v1.0.png'),
   }}
/>

## Step 4: Start the agent from a trigger

An agent does nothing until something starts it. Give the agent an HTTP trigger that hands each incoming claim to `claimAgent` and answers with the ID of the run it started.

1. On the agent canvas, click **Add Trigger**.

2. Under **API Endpoints**, select **HTTP**.

   <ThemedImage
      alt="The Add Trigger dialog for claimAgent, listing Chat Channels, API Endpoints, and Event Sources, with HTTP highlighted under API Endpoints."
      sources={{
         light: useBaseUrl('/img/get-started/build-durable-agent/add-trigger-http-v1.0.png'),
         dark: useBaseUrl('/img/get-started/build-durable-agent/add-trigger-http-v1.0.png'),
      }}
   />

3. Keep the generated **Endpoint Path** (`/claim-agent`), **HTTP Method** (**POST**), and **Resource Path** (`.`).

4. Under **Payload**, click the edit icon, set **Type** to `ExpenseClaim`, and click **Save**.

5. Set **Instructions** to `Process Claim`. This is the user turn the agent plans this run from. The claim itself is appended to it, as **Appended to your instructions** shows.

6. Click **Create**.

   <ThemedImage
      alt="The HTTP trigger form with the 201 json and 500 error responses, Instructions set to Process Claim, the appended payload line, and the Create button highlighted."
      sources={{
         light: useBaseUrl('/img/get-started/build-durable-agent/http-trigger-form-2-v1.0.png'),
         dark: useBaseUrl('/img/get-started/build-durable-agent/http-trigger-form-2-v1.0.png'),
      }}
   />

The trigger appears on the canvas, connected to the agent.

<ThemedImage
   alt="The claimAgent canvas with an HTTP Service trigger for /claim-agent POST connected to the Durable Agent node."
   sources={{
      light: useBaseUrl('/img/get-started/build-durable-agent/agent-with-trigger-v1.0.png'),
      dark: useBaseUrl('/img/get-started/build-durable-agent/agent-with-trigger-v1.0.png'),
   }}
/>

7. Click the trigger node to open the resource's flow. It runs `claimAgent` and stores the result in `result`, then returns a placeholder error.

8. Click the **Return** node, replace its **Expression** with `result`, and click **Save**.

   <ThemedImage
      alt="The trigger resource flow with the durable agent run node and the Return panel open, with the Expression set to result and the Save button highlighted."
      sources={{
         light: useBaseUrl('/img/get-started/build-durable-agent/trigger-return-v1.0.png'),
         dark: useBaseUrl('/img/get-started/build-durable-agent/trigger-return-v1.0.png'),
      }}
   />

The resource now starts an agent run for every claim it receives and answers with that run's instance ID.

:::info Hold on to the instance ID
`run` starts the agent and returns immediately with its instance ID. It does not wait for the claim to finish, which is the point: the run may sit on the `payClaim` approval for days. Return the ID to the caller, because it is what addresses this run later.

## Step 5: Start the Temporal server

A durable workflow keeps its record in a workflow engine. The runtime's `mode` defaults to `LOCAL`, which expects a Temporal server on `localhost:7233`, so start one before running the integration. Temporal's sample Compose file brings up a server and its dependencies in Docker:

```bash
git clone https://github.com/temporalio/samples-server.git
cd samples-server/compose
docker compose up
```

Leave the containers running for the rest of this guide.

To check that WSO2 Agent Builder can reach it, select **ClaimHandler** in the breadcrumb to open the integration overview, and in the right panel, under **Management**, expand **Workflow Management**. It reads **Workflow runtime reachable at localhost:7233.**

<ThemedImage
   alt="The ClaimHandler overview with Workflow Management expanded, reading Workflow runtime reachable at localhost:7233."
   sources={{
      light: useBaseUrl('/img/get-started/build-durable-agent/workflow-runtime-reachable-v1.0.png'),
      dark: useBaseUrl('/img/get-started/build-durable-agent/workflow-runtime-reachable-v1.0.png'),
   }}
/>

Without a Temporal server, **Workflow Management** shows **Use in-memory runtime**. That switches the workflow mode to `IN_MEMORY`, which is for testing only: runs are lost when the integration stops.

## Step 6: Start the local ICP server

The gated `payClaim` suspends the run until a Finance reviewer decides on it, and the Integration Control Plane console is where that decision is made. Start a local ICP server before running the integration, so the approval has somewhere to land.

1. On the integration overview, in the right panel, under **Management**, expand **Integration Control Plane** and check **Enable ICP Monitoring**.

2. Expand **Publish to Local ICP** and click **Start ICP Server**.

   <ThemedImage
      alt="The ClaimHandler overview with Integration Control Plane expanded, Enable ICP Monitoring and Start ICP Server highlighted."
      sources={{
         light: useBaseUrl('/img/get-started/build-durable-agent/start-icp-v1.0.png'),
         dark: useBaseUrl('/img/get-started/build-durable-agent/start-icp-v1.0.png'),
      }}
   />

The terminal opens on an **ICP Server** task and logs the startup. The status bar at the bottom right switches from **ICP: Stopped** to **ICP: Running**.

:::info Start ICP before the integration
**Enable ICP Monitoring** writes the runtime bridge configuration that points this integration at the local ICP server. Start ICP first so the integration registers with it as it boots; otherwise the run has no inbox to publish the `payClaim` approval to.

## Step 7: Run it

1. On the integration overview, click **Run**.

2. Watch the terminal. After the integration compiles and starts, the runtime bridge connects to the ICP server started in Step 6:

   ```text
   ... module=wso2/icp.runtime.bridge message="Full heartbeat acknowledged by ICP server"
   ```

   The heartbeat is the integration registering itself, which is what puts the `payClaim` approval in front of a reviewer later.

## Step 8: Submit a new claim

Once the service is up, a pop-up says **1 service found in the integration. Test with Try It Client?** Click **Test**. A `TryIt.hurl` file opens beside the overview, holding a request generated from the trigger, along with the schema the resource expects.

Fill in a real claim: replace the `{?}` placeholder for `claimId` and the `0` for `amount`, then click the run button in the request cell's left gutter to send it.

```json
{
  "claimId": "2002",
  "amount": 1500
}
```

Or send it with curl:

```bash
curl -X POST localhost:9090/claim-agent -H 'Content-Type: application/json' \
  -d '{"claimId":"2002","amount":1500}'
```

The response is **201 Created**, with the new run's instance ID as the body:

```text
HTTP/1.1 201 Created
01a1862d-4a16-7f44-b006-190464ba3948
```

The agent validates the claim, decides to pay it, and **pauses**: the gated `payClaim` created an approval review for the `Finance` role. The workflow now waits durably; you can even restart the integration and nothing is lost.

## Step 9: See the claim waiting in ICP

The run is now sitting on the `payClaim` approval, and the ICP console is where that wait is visible.

1. On the integration overview, under **Publish to Local ICP**, click **View in ICP**. The console opens in the browser on the **All Projects** page. If it asks you to sign in, sign in as the ICP administrator.
2. That page already lists `default-project`, and it holds an integration named `claimhandler`. Neither was created by hand: the integration registered both with ICP when it started, and because it carries a durable workflow it is registered as a workflow integration.
3. Open `default-project`, then `claimhandler`. The **Dev** environment reports **1/1 Active** and lists **Workflow Definitions** with `claimAgent` selected.
4. Click **View Workflows**. The **Workflow Executions** page lists one instance for `claimAgent`, whose **Workflow ID** is the instance ID the claim request returned, with status **Running** and the time it started.
5. Click the instance to open **Execution Details**:

   - **Workflow Input** shows the **Query** the run started from, which carries the claim, and the agent name.
   - The timeline below is the run so far: the agent thought, completed `validateClaim`, thought again.
   - At the end of the timeline, you will see that the agent opened **review-payClaim**, which is still running. That open review is the gate holding the payment.

## Step 10: Give your user the Finance role

The review is on the timeline, but it is not yet addressed to you. `payClaim` was registered with `Finance` as its reviewer role, and you are signed in as `admin`, who does not carry that role yet. Roles reach users through groups, so create a `Finance` role that can see and decide human tasks, and a group that grants it.

1. Click **Default Organization** at the top of the console to leave the integration, then in the left navigation, under **MANAGEMENT**, click **Access-control**. Inside an integration, **Access-control** shows only that integration's roles and groups. The **Users** tab lists a single user, `admin` (**System Administrator**).
2. Open the **Roles** tab and click **+ Create Role**. Set **Role Name** to `Finance`, expand **Workflow-Management**, and select `workflow_mgt:view_human_tasks`, `workflow_mgt:manage_human_tasks`, and `workflow_mgt:view_workflows`. Click **Create**.
3. Open the **Groups** tab, click **+ Create Group**, set **Name** to `Finance Reviewers`, and click **Create**.
4. Click **Finance Reviewers**. On the **USERS** tab, click **+ Add Users**, select **System Administrator (admin)**, and click **Add**.
5. On the **ROLES** tab, click **+ Add Roles**. Select `Finance` in the **Roles** dropdown, leave **Applicable Environments** on **All Environments**, and click **Add**.

<ThemedImage
    alt="Creating the Finance role with the workflow permissions, creating the Finance Reviewers group, and adding admin and the Finance role to it"
    sources={{
        light: useBaseUrl('/img/workflows/getting-started/build-a-claim-workflow-agent/assign-finance-role.gif'),
        dark: useBaseUrl('/img/workflows/getting-started/build-a-claim-workflow-agent/assign-finance-role.gif'),
    }}
/>

The console confirms **Role(s) added to group successfully**. `admin` now holds `Finance` through **Finance Reviewers**, so the approval reaches it. In a real deployment, add the accounts of the people who approve payments to this group; `admin` stands in for them here.

## Step 11: Approve the payment

1. Use the breadcrumb at the top of the console to return to `default-project`, then `claimhandler`.
2. In the left navigation, under **MANAGE**, click **Human Tasks**. The page gathers the human tasks and review activities for `claimhandler`, and it shows only the ones applicable to you. Without the `Finance` role added in Step 10, this list stays empty.
3. With **Status** on **Pending**, one task is listed: **Approval required: payClaim**, badged **Approval gate**, on `claimAgent`, carrying the workflow ID of your run.
4. Click the task. The panel lays out the decision:

   - **Activity** names the activity and its workflow, links the parent workflow, and gives the **Trigger** as `Approval gate — review before the activity runs`.
   - **Activity Arguments** is read-only and holds the claim ID and amount the agent proposes to pay.
   - **Decisions** offers **Proceed** (run with the original arguments), **Proceed with Changes** (edit the arguments first), and **Reject** (fail the activity instead).

5. Click **Proceed**. **Confirm Proceed** repeats the arguments and warns that the activity runs with them and that this cannot be undone. Click **Proceed** to release the payment.

The console reports **Activity proceeded**, and on the next refresh the list reads **No pending tasks**.

<ThemedImage
    alt="Opening the payClaim approval under Human Tasks and releasing the payment with Proceed"
    sources={{
        light: useBaseUrl('/img/workflows/getting-started/build-a-claim-workflow-agent/approve-pay-claim.gif'),
        dark: useBaseUrl('/img/workflows/getting-started/build-a-claim-workflow-agent/approve-pay-claim.gif'),
    }}
/>

Open the run again from **Workflows**. `payClaim` has now completed. The agent takes one closing turn, and the execution reads **Completed**, with a **Closed** time and a **Workflow Result** holding the agent's own summary of the claim. The model words it differently on each run, for example:

```text
The claim has been processed and paid successfully.
```

The timeline is green end to end, and it shows where the time went: the thinking turns and `validateClaim` took seconds, `payClaim` ran in milliseconds once released, and `review-payClaim` accounts for almost the entire run. For most of the run, nobody was working on the claim. It was waiting for a person, and it lost nothing by waiting.

## Source code

<details>
<summary>View the generated Ballerina code</summary>

The steps above generate the following Ballerina code. `types.bal` holds the claim record, `functions.bal` the activities, `workflows.bal` the durable agent, and `main.bal` the HTTP trigger's listener and service.

**`types.bal`**

```ballerina
type ExpenseClaim record {|
    string claimId;
    decimal amount;
|};
```

**`functions.bal`**

```ballerina
import ballerina/workflow;

@workflow:Activity
function validateClaim(ExpenseClaim expenseClaim) returns boolean|error {
    return expenseClaim.amount > 0d;
}

@workflow:Activity
function payClaim(ExpenseClaim expenseClaim) returns error? {
}
```

**`workflows.bal`**

```ballerina
import ballerina/ai;
import ballerina/workflow;

final ai:Wso2ModelProvider wso2ModelProvider = check ai:getDefaultModelProvider();
final workflow:DurableAgent claimAgent = check new ({
    systemPrompt: {
        role: string `Expense claim assistant`,
        instructions: string `Process expense claims end to end. Validate each claim with validateClaim first and reject invalid claims with a clear reason. When a claim is valid, pay it with payClaim using the claimed amount. Finish with a one-line summary of the outcome.`
    },
    model: wso2ModelProvider,
    inputType: ExpenseClaim,
    activities: [validateClaim, {activity: payClaim, approvalPolicy: {userRoles: "Finance"}}]
});
```

**`main.bal`**

```ballerina
import ballerina/http;

listener http:Listener httpDefaultListener = http:getDefaultListener();

service /claim\-agent on httpDefaultListener {
    resource function post .(@http:Payload ExpenseClaim payload) returns json|error {
        do {
            string result = check claimAgent.run(string `Process Claim

Request payload:
${payload.toJsonString()}`);
            return result;
        } on fail error err {
            // handle error
            return error("unhandled error", err);
        }
    }
}
```

</details>

## What's next

- [Create a Durable Agent](../../develop-and-test/integration-artifacts/ai-integrations/durable-agentic-workflow/create-durable-agent.md) — Every field of the durable agent, its activities, data events, and human tasks
- [Gated tools vs durable agentic workflow](../../develop-and-test/integration-artifacts/ai-integrations/agents/human-in-the-loop/gated-tools-vs-durable-agentic-workflow.md) — Choose between an agent with gated tools and a durable agent
- [Gate Tools for Approval](../../develop-and-test/integration-artifacts/ai-integrations/agents/human-in-the-loop/gate-tools-for-approval.md) — Pause a regular agent's tool calls for human approval in chat
- [Build an AI agent](build-ai-agent.md) — Build a chat agent and test it in the built-in chat panel
