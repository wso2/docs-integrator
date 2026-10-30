---
title: Get an Agent Result
---

# Get an Agent Result

An agent instance keeps working after the flow that started it has returned. **Get Agent Result** reads what that instance finally produced, addressed by its instance ID. It belongs wherever the outcome is collected: a status endpoint the caller polls, or a later step in the flow that has nothing to do until the agent is done.

<ThemedImage
    alt="The GET claim/[string instanceId]/status resource flowing from Start into a Get Agent Result step with a dashed connector from claimAgent, then a Return of agentResult, with the Error Handler below."
    sources={{
        light: useBaseUrl('/img/genai/develop/durable-agentic-workflow/get-agent-result/01-get-agent-result-flow-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/durable-agentic-workflow/get-agent-result/01-get-agent-result-flow-v1.0.png'),
    }}
/>

## Add the step to a flow

The steps below follow one example: a `GET claim/[string instanceId]/status` resource that reports what the `claimAgent` instance in its path has concluded.

1. On the flow diagram, select **+** where the result should be read.
2. In the node panel, under **Workflow**, select **Get Agent Result**. The **Get Agent Result** form opens.
3. Fill in the form:

    | Field | Required | Description |
    |---|---|---|
    | **Durable Agentic Workflow** | Yes | The durable agent to read the result from, `claimAgent` here. |
    | **Instance Id** | Yes | The instance whose result you want, the value [Run Durable Agent](run-durable-agent.md) bound. Here it is the resource's `instanceId` path parameter, so switch the field to **Expression** and enter `instanceId`. |
    | **Wait For Result** | No | Selected by default, which waits until the instance finishes. See [Wait or check back](#wait-or-check-back). |
    | **Result** | Yes | The variable that receives the agent's result. Defaults to `agentResult`. |
    | **Result Type** | Yes | The expected type of the result, `string` here. |

4. Select **Save**.

<ThemedImage
    alt="The Get Agent Result form with claimAgent selected, Instance Id set to the instanceId expression, Wait For Result selected, Result set to agentResult, and Result Type set to string, highlighted."
    sources={{
        light: useBaseUrl('/img/genai/develop/durable-agentic-workflow/get-agent-result/02-get-agent-result-form-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/durable-agentic-workflow/get-agent-result/02-get-agent-result-form-v1.0.png'),
    }}
/>

The saved step is drawn as **Get Agent Result**, with a dashed connector from the `claimAgent` it reads from. **Instance Id** takes either text or an expression, so the ID can come from a path parameter as it does here, from a variable, or from a configurable. Follow it with a **Return** step on `agentResult`, and the status endpoint is complete: it reads what the instance concluded and hands that straight back to the caller.

## Wait or check back

**Wait For Result** decides what happens while the instance is still working.

- **Selected**, the default, waits until the instance finishes.
- **Cleared** reads without waiting. While the instance is still working, the step returns a `workflow:AgentBusyError`, which the flow can handle and report as "still running". A status endpoint usually wants this, because the caller gets an answer immediately either way.

A gated activity or a human task counts as still working: the instance is suspended, waiting on a person. A run that looks stalled often needs a decision in the [Integration Control Plane](product://integrator/icp/manage-workflows/complete-human-tasks).

## Final result or one turn's answer?

Both reads are addressed by the instance ID, but they answer different questions.

- **Get Agent Result** returns what the run concluded, once. Use it for the outcome.
- [Get Data Event Result](get-data-event-result.md) returns the answer to one delivered turn, selected by that turn's correlation token. Use it for a conversation, or for sending more information to the agent during a run.

## What's next

- [Get a Data Event Result](get-data-event-result.md): Read one turn's answer instead of the final outcome.
- [Run a Durable Agent](run-durable-agent.md): Start the instance and bind the ID this step needs.
- [Workflow executions](product://integrator/icp/manage-workflows/workflow-executions): See why an instance is still working.
