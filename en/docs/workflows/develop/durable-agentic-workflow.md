---
sidebar_position: 8
title: "Durable Agentic Workflows"
description: Build AI agents on the durable workflow runtime in WSO2 Integrator — with durable activities, data events, human tasks, and agent-to-agent collaboration.
keywords: [wso2 integrator, durable agent, agentic workflow, ai agent, human in the loop, events, durable]
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Durable Agentic Workflows

A durable agentic workflow flips the authoring model: instead of wiring steps together, you describe the goal in natural language and give the agent **capabilities** — activities, data events, and human tasks. An AI model plans the path at runtime, and because the agent *is* a durable workflow, every reasoning step, activity call, and wait survives crashes and restarts.

<ThemedImage
    alt="The claimAgent node showing its role and instructions, with the chat entry point and the Review Documents human task on the left, the gated payClaim activity on the right, and the anchored plus buttons for adding capabilities"
    sources={{
        light: useBaseUrl('/img/workflows/develop/durable-agentic-workflow/agent-model-light.png'),
        dark: useBaseUrl('/img/workflows/develop/durable-agentic-workflow/agent-model-dark.png'),
    }}
/>

## Add durable agent artifact

1. In the design view, click **+ Add Artifact**.
2. On the **Artifacts** page, under **Durable Workflow**, click **Durable Agentic Workflow**.

   ![The Artifacts page with the Durable Agentic Workflow card under the Durable Workflow section](/img/workflows/develop/durable-agentic-workflow/add-agent-artifact.png)

   **Durable Workflow** beside it produces the same kind of artifact with the steps wired by hand instead of chosen by a model. See [Create a workflow](create-workflow.md).

3. Set **Name** to the name the agent is referenced by, then click **Create Agent**. The agent opens on its own model and appears under **Workflows** in the sidebar.

## Configure the agent

Click the agent node to open the **Configure Agent** form, which holds the agent's role, its instructions, and its reasoning limit.

| Field                  | Required | Description                                                                                                                                    |
|------------------------|----------|------------------------------------------------------------------------------------------------------------------------------------------------|
| **Role**               | Yes      | The agent's primary function, for example `Expense claim assistant`. It appears under the agent's name on the node.                            |
| **Instructions**       | Yes      | What the agent should do, in natural language. This is what the model plans from, so name the capabilities it should use and the outcome you expect. |
| **Query**              | No       | The initial user query. Left empty, the agent waits for the first chat event instead of starting on its own.                                    |
| **Maximum Iterations** | No       | The most reasoning iterations the model may take in one turn.                                                                                   |

**Role** and **Instructions** each take either a prompt or an expression. Keep the field on **Prompt** to write the text directly, and switch it to **Expression** to build the value in code, for example from a configurable.

![The Configure Agent form with Role set to Expense claim assistant and the claim handling instructions filled in](/img/workflows/develop/durable-agentic-workflow/configure-agent.png)

## Capabilities

### Activities

Durable agent can also invoke activities. Each call runs durably with the same guarantees and the same **retry policies** as any workflow activity, **Human Review** retries included (see [Error handling and review activities](review-activity-and-error-handling.md)). In addition to that regular activity call configuration, you can enable **Requires Approval** on sensitive activities, so a person approves the execution before the agent runs the activity. Those approval requests are listed in the **Review Activities** tab of the [Control Plane](../icp/review-activities.md). The agent proposes; your policies decide what needs a human.

To register an activity with the agent:

1. Click **+** on the activity anchor at the bottom right of the agent node.
2. Under **Current Integration**, click the activity you want the agent to have, `payClaim` here. Its register form opens.
3. Choose the **Retry Policy** the engine applies when the agent's call to this activity fails. The policies are the same three a hand-wired activity call takes. See [The three retry policies](review-activity-and-error-handling.md#the-three-retry-policies).
4. Expand **Advanced Configurations** to describe the activity to the model and to gate it:

   | Field | Required | Description |
   |---|---|---|
   | **Activity Name** | No | The name advertised to the model. Defaults to the function name. |
   | **Activity Description** | No | Tells the model what the activity does and when to use it. |
   | **Requires Approval** | No | Gates the activity: the agent suspends durably before every call and raises a review activity carrying the arguments it proposes. |
   | **Reviewer Roles** | Only with **Requires Approval** | The roles permitted to decide that approval, for example `"Finance"` or `["finance", "manager"]`. |

5. Click **Save**.

![Registering payClaim as a durable agent activity, gating it with Requires Approval and setting Reviewer Roles to Finance](/img/workflows/develop/durable-agentic-workflow/register-activity.gif)

The activity joins the agent node as a capability, drawn with a shield badge while it is gated. Registering it is what makes it available to the model, so an activity the agent never needs is best left off the list.

:::tip No arguments to wire
Unlike a [Call Activity](activities.md#call-an-activity-from-a-workflow) step in a hand-wired workflow, the register form asks for no activity arguments. The agent maps them at runtime from what it has gathered, which is why **Activity Description** and the parameter names are worth writing clearly.
:::

### Events

Durable agents can receive events from external senders. Each event has a name, a request type, and an optional response type. The request type is the payload the sender sends to the agent, and the response type is what the agent returns to the sender. If the response type is left empty, the event is one-way.

```ballerina
events: [
    {name: "billSubmitted", request: BillSubmission, response: string}
]
```

To register a data event:

1. Click **+** on the event anchor at the bottom left of the agent node. The **Register Data Event** form opens.
2. Fill in the form:

   | Field | Required | Description |
   |---|---|---|
   | **Event Name** | Yes | The channel name senders use. A channel named `chat` is the one that drives the conversation itself. |
   | **Request Type** | Yes | The type of the payload sent to the agent on this channel. Pick a type from the project, a primitive such as `string`, or create one from the list. |
   | **Response Type** | No | The type of the agent's reply on this channel. Declaring one makes the channel request-response, read back with `getDataResult` or `waitForDataResult`. Left empty, the channel is one-way. |
   | **Cardinality** | No | How the channel consumes its events. `MULTI_EVENT`, the default, re-arms after every turn, so events can arrive repeatedly and from multiple senders. `SINGLE_EVENT` is consumed exactly once per run. |

3. Click **Save**.

![Registering the chat data event with a string request type, a string response type, and MULTI_EVENT cardinality](/img/workflows/develop/durable-agentic-workflow/register-data-event.gif)

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
