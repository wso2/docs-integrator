---
title: Send an Agent Data Event
---

# Send an Agent Data Event

A [running agent instance](run-durable-agent.md) waits on the data event channels registered on it. A **Send Agent Data Event** step delivers one turn on one of those channels, so it usually lives in the entry point the sender calls, such as the resource a user chats through. The step also hands back a correlation token, which is how you read the answer to that particular turn later.

<ThemedImage
    alt="The POST [string instanceId]/chat resource flowing from Start into a Send to chat step with a dashed connector to claimAgent, then a Wait for chat step reading from claimAgent, then a Return of result."
    sources={{
        light: useBaseUrl('/img/genai/develop/durable-agentic-workflow/send-agent-data-event/01-chat-flow-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/durable-agentic-workflow/send-agent-data-event/01-chat-flow-v1.0.png'),
    }}
/>

## Expose a channel with a trigger

The quickest way to let callers send to a channel is to give the data event a trigger:

1. On the agent canvas, select **Add Trigger** next to the data event, `chat` here.
2. Under **API Endpoints**, select **HTTP**. Event and file sources aren't available for a data event yet.

    <ThemedImage
        alt="The Add Trigger dialog for delivering chat data to a running claimAgent instance, with HTTP under API Endpoints and the event sources unavailable."
        sources={{
            light: useBaseUrl('/img/genai/develop/durable-agentic-workflow/send-agent-data-event/02-data-event-add-trigger-v1.0.png'),
            dark: useBaseUrl('/img/genai/develop/durable-agentic-workflow/send-agent-data-event/02-data-event-add-trigger-v1.0.png'),
        }}
    />

3. Keep or change the generated **Endpoint Path**, **HTTP Method**, and **Resource Path** (`[string instanceId]/chat`), then select **Create**.

The generated resource takes the instance ID from its path and the message from its payload. It contains a **Send to chat** step, a **Wait for chat** step that reads the agent's answer, and a **Return** of that answer, as the diagram above shows.

## Add the step to a flow

To send a data event from a flow you build yourself, add the step from the node panel. The steps below follow the same example: a `POST [string instanceId]/chat` resource that forwards each message to the `claimAgent` instance named in its path.

1. On the flow diagram, select **+** where the event should be sent.
2. In the node panel, under **Workflow**, select **Send Agent Data Event**. The **Send Agent Data Event** form opens.
3. Fill in the form:

    | Field | Required | Description |
    |---|---|---|
    | **Durable Agentic Workflow** | Yes | The durable agent to send the data event to, `claimAgent` here. |
    | **Instance Id** | Yes | The running agent's instance ID, the value [Run Durable Agent](run-durable-agent.md) bound. Here it is the resource's `instanceId` path parameter, so the caller names the instance it is talking to. |
    | **Data Event** | Yes | The channel to send on. The list shows the channels declared on the selected agent, `chat` here. |
    | **Data** | Yes | The payload sent on the channel, which must match the channel's request type. Here it is the resource's `payload`. |
    | **Result** | No | The variable that receives the correlation token for this turn. A one-way channel has no response to read, so you can leave it unused. |

4. Select **Save**.

<ThemedImage
    alt="The Send Agent Data Event form with claimAgent selected, Instance Id set to instanceId, Data Event set to chat, Data set to payload, and Result set to token, highlighted."
    sources={{
        light: useBaseUrl('/img/genai/develop/durable-agentic-workflow/send-agent-data-event/03-send-agent-data-event-form-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/durable-agentic-workflow/send-agent-data-event/03-send-agent-data-event-form-v1.0.png'),
    }}
/>

The saved step is drawn as **Send to chat**, named for the channel it sends on, with a dashed connector to the `claimAgent` it delivers into. **Instance Id** takes an expression, so the ID can come from a path parameter as it does here, from a variable, or from a configurable.

## New channels belong to the agent

The **Data Event** list offers only the channels the agent already declares. You add a channel on the agent's own canvas with **Add Data Event**, not from this form, because the channel and its request and response types are part of the agent. See [Data events](create-durable-agent.md#data-events).

## Keep the token

The token in **Result** identifies this turn, not the instance. An agent instance can be sent many turns, on one channel or several, and the token is what tells them apart when the answers come back. Pass it to a [Get Data Event Result](get-data-event-result.md) step to read the answer this turn produced.

A channel that declares no response type is one-way, so there is no answer to read and nothing to do with the token.

## What's next

- [Get a Data Event Result](get-data-event-result.md): Read the answer this turn produced.
- [Run a Durable Agent](run-durable-agent.md): Start the instance and bind the ID this step needs.
- [Create a Durable Agent](create-durable-agent.md): Declare the channels this step can send on.
