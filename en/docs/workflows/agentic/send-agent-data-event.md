---
sidebar_position: 3
title: "Send an Agent Data Event"
description: Deliver a turn to a running durable agent in WSO2 Integrator on one of its event channels, and take the correlation token that identifies the answer.
keywords: [wso2 integrator, durable agent, send agent data event, data event, chat, instance id, correlation token, agentic workflow]
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Send an Agent Data Event

A [running agent instance](run-durable-agent.md) waits on the data event channels registered on it. A **Send Agent Data Event** step delivers one turn on one of those channels, so it usually lives in the entry point the sender calls: the resource a user chats through, the webhook a partner posts a bill to. The step also hands back a correlation token, which is how the answer to that particular turn is read later.

<ThemedImage
    alt="The chat resource flowing from Start into a Send to chat step, with a dashed connector across to the claimAgent it delivers into, and the Error Handler below"
    sources={{
        light: useBaseUrl('/img/workflows/agentic/send-agent-data-event/send-agent-data-event-light.png'),
        dark: useBaseUrl('/img/workflows/agentic/send-agent-data-event/send-agent-data-event-dark.png'),
    }}
/>

## Send one from an integration

The steps below follow one example: a `POST chat/[string workflowId]` resource that forwards each message to the `claimAgent` instance named in its path.

1. On the flow diagram, click **+** where the event should be sent.
2. In the node panel, under **Workflow**, click **Send Agent Data Event**. The **Send Agent Data Event** form opens.
3. Fill in the form:

   | Field | Required | Description |
   |---|---|---|
   | **Durable Agentic Workflow** | Yes | The durable agent to send the data event to, `claimAgent` here. |
   | **Instance Id** | Yes | The running agent's instance ID, the value [Run Durable Agent](run-durable-agent.md) bound. Here it is the resource's `workflowId` path parameter, so the caller names the instance it is talking to. |
   | **Data Event** | Yes | The channel to send on. The dropdown lists the channels declared on the selected agent, `chat` here. |
   | **Data** | Yes | The payload sent on the channel, which must match the channel's request type. Here it is the resource's `msg` input. |
   | **Result** | Yes | The variable that receives the correlation token for this turn. Defaults to `eventToken`. |

4. Click **Save**.

![Adding a Send Agent Data Event step to the chat resource, setting the instance ID from workflowId, the chat channel, and the msg payload](/img/workflows/agentic/send-agent-data-event/send-agent-data-event.gif)

The saved step is drawn as **Send to chat**, named for the channel it sends on, with a dashed connector across to the `claimAgent` it delivers into. **Instance Id** takes either text or an expression, so the ID can come from a path parameter as it does here, from a variable, or from a configurable.

## New channels belong to the agent

The **Data Event** dropdown offers only the channels the agent already declares. Adding a channel is done on the agent's own diagram with **Add Data Event**, not from this form, because the channel and its request and response types are part of the agent. See [Events](create-durable-agent.md#events).

## Keep the token

The token in **Result** identifies this turn, not the instance. An agent instance can be sent many turns, on one channel or several, and the token is what tells them apart when the answers come back. Pass it to a [Get Data Event Result](get-data-event-result.md) step to read the answer this turn produced.

A channel that declares no response type is one-way, so there is no answer to read and nothing to do with the token.

## Next steps

- [Get a Data Event Result](get-data-event-result.md) — reading the answer this turn produced.
- [Run a Durable Agent](run-durable-agent.md) — starting the instance and binding the ID this step needs.
- [Create a Durable Agent](create-durable-agent.md) — declaring the channels this step can send on.
