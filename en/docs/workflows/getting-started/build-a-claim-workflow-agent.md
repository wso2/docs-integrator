---
sidebar_position: 1
title: "Build a Claim Handling Agent"
description: Build your first durable agentic workflow in WSO2 Integrator — an AI agent that validates expense claims and pays them only after a manager approves.
keywords: [wso2 integrator, durable workflow, agentic workflow, durable agent, claim workflow, human in the loop, approval]
---

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

1. In the design view, select **+ Add Artifact**.
2. Under **Durable Workflow**, select **Durable Agentic Workflow**.
3. Set **Name** to `claimAgent`.
4. Select **Create Agent**.

<ThemedImage
    alt="Durable Agentic Workflow creation form with Name set to claimAgent and the Create Agent button"
    sources={{
        light: useBaseUrl('/img/workflows/getting-started/build-a-claim-workflow-agent/02-create-agent.png'),
        dark: useBaseUrl('/img/workflows/getting-started/build-a-claim-workflow-agent/02-create-agent.png'),
    }}
/>

The agent model opens: a single agent node with anchored **+** buttons for adding capabilities — human tasks (top left), events (bottom left), activities (middle right), and agent tools (bottom right).

## Step 3: Describe the agent

Click the agent node and give it its role and instructions:

- **Role:** `Expense claim assistant`
- **Instructions:**

  ```text
  Process expense claims end to end. Validate each claim with validateClaim first and
  reject invalid claims with a clear reason. When a claim is valid, pay it with payClaim
  using the claimed amount. Finish with a one-line summary of the outcome.
  ```

<ThemedImage
    alt="Agent node form with the Role and Instructions fields filled in"
    sources={{
        light: useBaseUrl('/img/workflows/getting-started/build-a-claim-workflow-agent/03-agent-identity.png'),
        dark: useBaseUrl('/img/workflows/getting-started/build-a-claim-workflow-agent/03-agent-identity.png'),
    }}
/>

## Step 4: Give the agent activities

Activities are the units of work the agent can call. Each one runs durably — completed work is never lost or repeated, even across restarts.

First add the claim validator:

1. Select the **+** button on the **middle right** of the agent node and choose **Add Activity**.
2. Create a new activity named `validateClaim` with a `claim` input and the validation logic:

```ballerina
@workflow:Activity
function validateClaim(ExpenseClaim claim) returns boolean|error {
    return claim.amount > 0d && claim.purpose.trim().length() > 0;
}
```

Then add the payment activity — this is the risky step, so gate it behind a manager:

1. Add another activity named `payClaim`.
2. In the activity form, enable **Requires Approval** and set **Reviewer Roles** to `manager`.

```ballerina
@workflow:Activity
function payClaim(string claimId, decimal amount) returns string|error {
    return string `PAY-${claimId}`;
}
```

<ThemedImage
    alt="Register Activity form with Requires Approval enabled and Reviewer Roles set to manager"
    sources={{
        light: useBaseUrl('/img/workflows/getting-started/build-a-claim-workflow-agent/04-gated-activity.png'),
        dark: useBaseUrl('/img/workflows/getting-started/build-a-claim-workflow-agent/04-gated-activity.png'),
    }}
/>

Behind the scenes the designer maintains a single declaration — the agent *is* the workflow:

```ballerina
final workflow:DurableAgent claimAgent = check new ({
    systemPrompt: {
        role: "Expense claim assistant",
        instructions: string `Process expense claims end to end. ...`
    },
    model: claimModel,
    activities: [
        validateClaim,
        {activity: payClaim, requiresApproval: true, userRoles: "manager"}
    ]
});
```

## Step 5: Expose the agent over HTTP

Add an HTTP service so employees can submit claims. Each `run` starts a durable agent instance; the returned `instanceId` is the claim's reference.

```ballerina
service /claims on new http:Listener(9090) {

    resource function post .(ExpenseClaim claim) returns json|error {
        string instanceId = check claimAgent.run(claim.toJsonString());
        return {claimId: claim.claimId, instanceId, status: "PROCESSING"};
    }

    resource function get [string instanceId]() returns json|error {
        string|error result = claimAgent.getResult(instanceId);
        if result is workflow:AgentBusyError {
            return {instanceId, status: "PENDING_APPROVAL"};
        }
        if result is error {
            return result;
        }
        return {instanceId, status: "COMPLETED", summary: result};
    }
}
```

## Step 6: Run it

1. Select **Run** in the designer to start the integration.
2. Submit a claim:

```bash
curl -X POST localhost:9090/claims -H 'Content-Type: application/json' \
  -d '{"claimId":"EXP-1","employee":"nimal","amount":180.50,"purpose":"Team lunch"}'
```

The agent validates the claim, decides to pay it, and **pauses** — the gated `payClaim` created an approval review for the `manager` role. The workflow now waits durably; you can even restart the integration and nothing is lost.

## Step 7: Approve the payment

1. Open the **Integration Control Plane** and sign in as a user with the `manager` role.
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

- [Human task workflows](../develop/human-task-workflow.md) — ask people structured questions, not just approvals.
- [Review activities and error handling](../develop/review-activity-and-error-handling.md) — let a human fix a failed step's input and retry it.
- [Durable agentic workflows](../develop/durable-agentic-workflow.md) — events, multi-turn conversations, and agent-to-agent collaboration.
