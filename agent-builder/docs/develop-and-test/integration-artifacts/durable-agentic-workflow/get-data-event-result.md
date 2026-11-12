---
title: Get a Data Event Result
---

# Get a Data Event Result

Sending a turn to an agent and reading its answer are two steps, not one. **Get Data Event Result** takes the correlation token that [Send Agent Data Event](send-agent-data-event.md) produced and returns the agent's answer for that turn, as a typed value. Splitting the two lets the same flow send now and read later, or send and wait in one pass, whichever suits the caller.

A trigger on a data event generates both steps for you. See [Expose a channel with a trigger](send-agent-data-event.md#expose-a-channel-with-a-trigger).

## Add the step to a flow

The steps below continue the `POST [string instanceId]/chat` example, reading the reply to the message the previous step sent.

1. On the flow diagram, select **+** below the send step.
2. In the node panel, under **Workflow**, select **Get Data Event Result**. The **Get Data Event Result** form opens.
3. Fill in the form:

    | Field | Required | Description |
    |---|---|---|
    | **Durable Agentic Workflow** | Yes | The durable agent to read the answer from, `claimAgent` here. |
    | **Instance Id** | Yes | The running agent's instance ID, the same one the turn was sent to. Here it is the resource's `instanceId` path parameter. |
    | **Correlation Token** | Yes | The token returned by **Send Agent Data Event**, `token` here. It selects which turn's answer to read. |
    | **Wait For Answer** | No | Selected by default, which waits until the turn is answered. See [Wait or check back](#wait-or-check-back). |
    | **Result** | Yes | The variable that receives the agent's answer. |
    | **Result Type** | Yes | The expected type of the answer, `string` here. It matches the response type declared on the channel. |

4. Select **Save**.

<ThemedImage
    alt="The Get Data Event Result form with claimAgent selected, Instance Id set to instanceId, Correlation Token set to token, Wait For Answer selected, Result set to result, and Result Type set to string, highlighted."
    sources={{
        light: useBaseUrl('/img/genai/develop/durable-agentic-workflow/get-data-event-result/01-get-data-event-result-form-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/durable-agentic-workflow/get-data-event-result/01-get-data-event-result-form-v1.0.png'),
    }}
/>

With **Wait For Answer** selected, the saved step is drawn as a wait named for the channel, **Wait for chat**, with a dashed connector from the `claimAgent` it reads from. It sits below the **Send to chat** step that produced its token.

## Wait or check back

**Wait For Answer** decides what happens while the agent is still working on the turn.

- **Selected**, the default, waits until the turn is answered.
- **Cleared** reads without waiting. While the turn is unanswered, the step returns a `workflow:AgentBusyError`, which the flow can handle so it can check back later. This suits a caller that shouldn't be held, such as a poll from a UI or a scheduled sweep.

## Type the answer

**Result Type** is what the answer is read back as, and it matches the response type declared for the channel on the agent. In the chat example both are `string`, so the reply arrives as ordinary text. A channel that answers with a record is read with that record type, and the flow continues with a typed value it can map or return directly.

## What's next

- [Send an Agent Data Event](send-agent-data-event.md): The step that produces the correlation token.
- [Get an Agent Result](get-agent-result.md): Read the run's final outcome instead of one turn's answer.
- [Create a Durable Agent](create-durable-agent.md): Declare the channel and the response type this step reads.
