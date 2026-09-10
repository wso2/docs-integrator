---
sidebar_position: 2
title: "Build a Claim Handling Agent"
description: Build your first durable agentic workflow in WSO2 Integrator — an AI agent that validates expense claims and pays them only after a manager approves.
keywords: [wso2 integrator, durable workflow, agentic workflow, durable agent, claim workflow, human in the loop, approval]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Build a Claim Handling Agent

**Time:** 15 minutes | **What you'll build:** A durable AI agent that receives expense claims, validates them, and pays them out — but only after a manager approves the payment from the Integration Control Plane. If the process crashes while waiting, it resumes exactly where it left off.

:::info Prerequisites

- [WSO2 Integrator installed](../../get-started/setup/local-setup.md)
- Signed in to WSO2 Integrator Copilot (provides the default AI model — no API key needed)

:::

## Step 1: Create the integration

1. Open WSO2 Integrator.
2. Select **Create** in the **Create New Integration** card.
3. Set **Integration Name** to `ClaimHandler`.
4. Select **Create Integration**.

<ThemedImage
    alt="Create Integration form with Integration Name set to ClaimHandler"
    sources={{
        light: useBaseUrl('/img/workflows/getting-started/build-a-claim-workflow-agent/01-create-integration.png'),
        dark: useBaseUrl('/img/workflows/getting-started/build-a-claim-workflow-agent/01-create-integration.png'),
    }}
/>

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
5. On the register form, expand **Advanced Configurations** and select **Requires Approval**. Before the agent runs the activity, a review activity is created and the agent suspends durably until a reviewer proceeds or rejects.
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

## Step 4: Run it

[//]: # (add a section to start icp from the integrator itself)
1. Select **Run** in the designer to start the integration.
2. Submit a claim:

```bash
curl -X POST localhost:9090/claims -H 'Content-Type: application/json' \
  -d '{"claimId":"EXP-1","employee":"nimal","amount":180.50,"purpose":"Team lunch"}'
```

The agent validates the claim, decides to pay it, and **pauses** — the gated `payClaim` created an approval review for the `Finance` role. The workflow now waits durably; you can even restart the integration and nothing is lost.

## Step 5: Approve the payment

1. Open the **Integration Control Plane** and sign in as a user with the `Finance` role.
2. Open the **Task Inbox** — the `payClaim` approval shows the claim ID and amount the agent proposed.
3. Select **Proceed**.

<ThemedImage
    alt="Integration Control Plane task inbox showing the payClaim approval with Proceed, Proceed with input, and Reject actions"
    sources={{
        light: useBaseUrl('/img/workflows/getting-started/build-a-claim-workflow-agent/05-icp-approval.png'),
        dark: useBaseUrl('/img/workflows/getting-started/build-a-claim-workflow-agent/05-icp-approval.png'),
    }}
/>

The agent resumes, completes the payment, and records its summary:

```bash
curl localhost:9090/claims/<instanceId>
# {"instanceId":"...","status":"COMPLETED","summary":"Claim EXP-1 validated and paid (PAY-EXP-1)."}
```

## What you built

- A **durable AI agent** whose reasoning, activity calls, and waits all survive restarts.
- A **gated activity** — the agent can propose a payment, but only a manager can release it.
- A **zero-cost wait** — the claim can sit in the inbox for days without holding any resources.

## Next steps

- [Await human task](../develop/human-task-workflow.md) — ask people structured questions, not just approvals.
- [Error handling and review activities](../develop/review-activity-and-error-handling.md) — let a human fix a failed step's input and retry it.
- [Create a Durable Agent](../agentic/create-durable-agent.md) — events, multi-turn conversations, and agent-to-agent collaboration.
