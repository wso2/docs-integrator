---
sidebar_position: 4
title: "Get a Data Event Result"
description: Read a durable agent's answer to a sent data event in WSO2 Integrator, using the correlation token, either blocking until the turn is answered or polling for it.
keywords: [wso2 integrator, durable agent, get data event result, agent reply, correlation token, agentbusyerror, agentic workflow]
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Get a Data Event Result

Sending a turn to an agent and reading its answer are two steps, not one. **Get Data Event Result** takes the correlation token that [Send Agent Data Event](send-agent-data-event.md) produced and returns the agent's answer for that turn, as a typed value. Splitting the two lets the same flow send now and read later, or send and wait in one pass, whichever suits the caller.

<ThemedImage
    alt="The chat resource flowing from Start into Send to chat, then a Get Data Event Result step with a dashed connector from claimAgent, then a Return step on agentReply"
    sources={{
        light: useBaseUrl('/img/workflows/agentic/get-data-event-result/get-data-event-result-light.png'),
        dark: useBaseUrl('/img/workflows/agentic/get-data-event-result/get-data-event-result-dark.png'),
    }}
/>

## Read one from an integration

The steps below continue the `POST chat/[string workflowId]` example, reading the reply for the message the previous step sent.

1. On the flow diagram, click **+** below the send step.
2. In the node panel, under **Workflow**, click **Get Data Event Result**. The **Get Data Event Result** form opens.
3. Fill in the form:

   | Field | Required | Description |
   |---|---|---|
   | **Durable Agentic Workflow** | Yes | The durable agent to read the answer from, `claimAgent` here. |
   | **Instance Id** | Yes | The running agent's instance ID, the same one the turn was sent to. Here it is the resource's `workflowId` path parameter. |
   | **Correlation Token** | Yes | The token returned by **Send Agent Data Event**, `eventToken` here. It selects which turn's answer to read. |
   | **Wait For Answer** | No | Selected by default, which blocks until the turn is answered. See [Wait or check back](#wait-or-check-back). |
   | **Result** | Yes | The variable that receives the agent's answer. Defaults to `agentReply`. |
   | **Result Type** | Yes | The expected type of the answer, `string` here. Match it to the response type declared on the channel. |

4. Click **Save**.

![Adding a Get Data Event Result step after the send step, setting the instance ID and the eventToken correlation token with Wait For Answer selected](/img/workflows/agentic/get-data-event-result/get-data-event-result.gif)

The saved step is drawn as **Get Data Event Result** with a dashed connector to the `claimAgent` it reads from, sitting directly below the **Send to chat** step that produced its token.

## Wait or check back

**Wait For Answer** decides what happens while the agent is still working on the turn.

- **Selected**, the default, waits until the turn is answered. The wait is a durable one, so it costs nothing while it lasts and survives a restart, and the flow continues with the answer in hand. This is what a request-response endpoint wants: the caller's HTTP request stays open and gets the reply.
- **Cleared** reads without waiting. While the turn is unanswered the step returns a `workflow:AgentBusyError`, which the flow can handle and check back later. This suits a caller that should not be held, such as a poll from a UI or a scheduled sweep.

## Type the answer

**Result Type** is what the answer is read back as, and it should match the response type declared for the channel on the agent. In the chat example both are `string`, so the reply arrives as ordinary text. A channel that answers with a record is read with that record type, and the flow continues with a typed value it can map or return directly.

## Next steps

- [Send an Agent Data Event](send-agent-data-event.md) — the step that produces the correlation token.
- [Get an Agent Result](get-agent-result.md) — reading the run's final outcome instead of one turn's answer.
- [Create a Durable Agent](create-durable-agent.md) — declaring the channel and the response type this step reads.
- [Integration Control Plane](../icp/managing-workflows.md) — following the instance while a turn is in flight.
