---
sidebar_position: 8
title: "Durable Agentic Workflows"
description: Build AI agents on the durable workflow runtime in WSO2 Integrator — with durable activities, event channels, human tasks, and agent-to-agent collaboration.
keywords: [wso2 integrator, durable agent, agentic workflow, ai agent, human in the loop, events, durable]
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Durable Agentic Workflows

A durable agentic workflow flips the authoring model: instead of wiring steps together, you describe the goal in natural language and give the agent **capabilities** — activities, events, human tasks, and peer agents. An AI model plans the path at runtime, and because the agent *is* a durable workflow, every reasoning step, tool call, and wait survives crashes and restarts.

## The agent is the declaration

Creating a Durable Agentic Workflow (Add Artifact → **Durable Agentic Workflow** → name → **Create Agent**) generates one module-level declaration that carries everything:

```ballerina
final workflow:DurableAgent supportAgent = check new ({
    systemPrompt: {
        role: "Expense claim assistant",
        instructions: string `Validate each claim, request missing bills, and escalate
                unusual claims to a manager before paying.`
    },
    model: claimModel,
    activities: [
        validateClaim,
        requestBill,
        {activity: payClaim, requiresApproval: true, userRoles: "manager",
            retryPolicy: "manager"},
        {activity: notifyEmployee, retryPolicy: {maxRetries: 3, retryDelay: 2}}
    ],
    events: [
        {name: "billSubmitted", request: BillSubmission, response: string}
    ],
    humanTasks: [
        {name: "approveExpense", roles: "manager",
            title: "Approve expense claim",
            description: "Review the claim and bills, then approve or reject."}
    ],
    maxIter: 16
});
```

The agent model renders this declaration as a single agent node with its capabilities around it. Use the anchored **+** buttons to add capabilities — human tasks (top left), events (bottom left), activities (middle right), agent tools (bottom right) — and click any capability to edit its entry.

<ThemedImage
    alt="Agent model showing the agent node with activity, event, and human task capability circles"
    sources={{
        light: useBaseUrl('/img/workflows/develop/durable-agentic-workflow/01-agent-model.png'),
        dark: useBaseUrl('/img/workflows/develop/durable-agentic-workflow/01-agent-model.png'),
    }}
/>

:::info One place to edit
Where the agent is *used* — a `supportAgent.run(...)` call in a service — the agent box is a read-only reference with a **Go to Agent** button. Configuration always lives on the agent's own model.
:::

## Capabilities

### Activities

`@workflow:Activity` functions the agent may invoke. Each call runs durably with the same guarantees and the same **retry policies** as any workflow activity — including **Requires Approval** gates and **Human Review** retries (see [Error handling and review activities](review-activity-and-error-handling.md)). The agent proposes; your policies decide what needs a human.

### Events

Typed channels for data arriving mid-conversation. Declare the request (and optional response) type; the agent waits durably on the channel when its instructions call for it:

```ballerina
events: [
    {name: "billSubmitted", request: BillSubmission, response: string}
]
```

### Human tasks

Escalation points the agent can raise on its own judgement — "this claim looks unusual" — decided from the [Control Plane](../icp/managing-workflows.md) inbox by the named roles, exactly like workflow human tasks.

### Agent tools and peers

Reuse `@ai:AgentTool` functions and toolkits, or add **peer agents** — other durable agents the agent can delegate to, synchronously or through a callback channel — to build multi-agent systems.

## Driving the agent

```ballerina
// Start an instance; the input becomes part of the first user turn.
string instanceId = check supportAgent.run(claim.toJsonString());

// Deliver an event turn and read that turn's answer.
string token = check supportAgent.sendEvent(instanceId, "billSubmitted", submission);
string reply = check supportAgent.waitForEventResult(instanceId, token);

// Read the final outcome (AgentBusyError while a human decision is pending).
string|error result = supportAgent.getResult(instanceId);
```

All reads are durable: results live in the workflow history, so a crashed caller can re-issue `waitForResult` and get the same answer.

## Why durable agents are different

| Standalone agent frameworks | Durable agentic workflows |
| --- | --- |
| Crash loses the conversation and in-flight tool calls | Every turn and tool call is recorded; restarts resume mid-plan |
| Human approval needs custom plumbing | Gates, reviews, and tasks are one form field away |
| Waiting for external input holds a process | Waits are suspended with zero resources, for days if needed |
| Retry logic in every tool | Declarative per-activity retry policies |

## Traditional or agentic?

Reach for an agentic workflow when the logic is branchy and judgement-heavy ("request whatever is missing, escalate the odd ones"); keep a hand-wired [durable workflow](../getting-started/build-an-order-processing-workflow.md) when the steps are fixed and auditable. The two share activities, tasks, and the runtime — a claim system can use both side by side.

## Next steps

- [Build a Claim Handling Agent](../getting-started/build-a-claim-workflow-agent.md) — the end-to-end getting started.
- [Integration Control Plane](../icp/managing-workflows.md) — approving the agent's gated steps and reading its progress.
