---
sidebar_position: 1
title: Sequential Agents
description: Run AI agents one after another in WSO2 Agent Builder by chaining them in a trigger's flow, passing each agent's result to the next, then test the chain from a chat trigger.
slug: /develop-and-test/integration-artifacts/ai-integrations/agents/multi-agent/sequential-agents
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Sequential Agents

In a sequential system, agents run one after another in a fixed order. Each agent does one stage of the work and hands its result to the next, like stations on an assembly line. The flow sets the order, not an LLM: every request passes through every stage.

This page describes how to chain agents in a trigger's flow, how to pass one agent's result to the next, and how to test the chain end to end. To compare this with an orchestrator that decides which agents to call, see [Multi-Agent Concepts](multi-agent.md).

## The example on this page

The steps follow one customer support example in a `support_reply` agentic integration. Two agents, both created with **Create Agent**, split the work of answering a customer:

- **`replyDrafter`** writes a first draft. **Role** `Support Reply Drafter`, and these **Instructions**:

    ```text
    Draft a reply to the customer's message. Answer every question they ask, acknowledge their problem, and suggest a next step. Write only the reply.
    ```

- **`replyReviewer`** checks the draft against the support team's rules and returns the corrected reply. **Role** `Support Reply Reviewer`, and these **Instructions**:

    ```text
    Review a draft reply to a customer and return the corrected reply. The reply must: not promise a refund, replacement, or delivery date; apologize at most once; stay under 120 words; and end with "The Support Team". Keep everything in the draft that meets these rules. Return only the final reply.
    ```

An **Agent Chat** trigger on `/support-reply` calls `replyDrafter`, passes the draft to `replyReviewer`, and returns the reviewed reply to the customer.

When you finish, the integration's **Overview** shows the chain: solid arrows run from the trigger through each agent, in the order the flow calls them.

<ThemedImage
    alt="The support_reply Overview showing the /support-reply Agent Chat trigger connected to replyDrafter, which is connected to replyReviewer by a solid arrow."
    sources={{
        light: useBaseUrl('/img/genai/develop/agents/multi-agent/18-overview-sequential-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/agents/multi-agent/18-overview-sequential-v1.0.png'),
    }}
/>

To create the agents, see [Create an Agent](../create-an-agent.md).

## Call the first agent from a trigger

The chain starts in the flow of a trigger, so give the first agent a trigger.

1. On the integration's **Overview**, click **Add Trigger** on the first agent's card. In the example, use the `replyDrafter` card.
2. Under **Chat Channels**, select **Agent Chat**. Set **Service Path** to `/support-reply` and click **Create**.

The trigger's flow now runs the first agent: **Start**, an `agent : run` node that stores the agent's answer in `stringResult`, and **Return**.

## Add the next agent to the flow

Each further stage is another `agent : run` node in the same flow.

1. Open the trigger's flow. On the **Overview**, select the **POST /chat** resource on the trigger's card, or select **chat** under **Entry Points** in the project tree.
2. Hover over the connection between the `agent : run` node and **Return**, and click the **+** that appears.
3. In the node panel, under **AI**, select **Agent**. The **Agents** panel lists the agents in the integration. Select the next agent, `replyReviewer`.

    <ThemedImage
        alt="The support_reply chat flow with a new step placeholder below the replyDrafter agent:run node, and the Agents panel listing replyDrafter and replyReviewer."
        sources={{
            light: useBaseUrl('/img/genai/develop/agents/multi-agent/15-sequential-agents-panel-v1.0.png'),
            dark: useBaseUrl('/img/genai/develop/agents/multi-agent/15-sequential-agents-panel-v1.0.png'),
        }}
    />

4. In the **AI Agent** panel, pass the previous agent's result to this one:

    | Field | Set to | Why |
    |---|---|---|
    | **Query** | `Draft reply: ${stringResult}`, in **Prompt** mode | `stringResult` holds the first agent's answer. Typing `${stringResult}` inserts it as a variable. |
    | **Result** | `finalReply` | The variable that holds this agent's answer. |

    <ThemedImage
        alt="The AI Agent panel for replyReviewer, with Query set to Draft reply: followed by a stringResult variable chip, Session ID and Context at their defaults, and Result set to finalReply."
        sources={{
            light: useBaseUrl('/img/genai/develop/agents/multi-agent/16-sequential-run-node-v1.0.png'),
            dark: useBaseUrl('/img/genai/develop/agents/multi-agent/16-sequential-run-node-v1.0.png'),
        }}
    />

    Click **Save**. For the other fields on the panel, see [Call an agent inside a flow](../create-an-agent.md#call-an-agent-inside-a-flow).

5. Select the **Return** node, set its value to `{message: finalReply}`, and click **Save**. Without this, the trigger still returns the first agent's draft.

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

The flow now runs both agents in order and returns the second agent's answer.

<ThemedImage
    alt="The support_reply chat flow showing Start, an agent:run node for replyDrafter bound to stringResult, an agent:run node for replyReviewer bound to finalReply, and Return {message: finalReply}."
    sources={{
        light: useBaseUrl('/img/genai/develop/agents/multi-agent/17-sequential-flow-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/agents/multi-agent/17-sequential-flow-v1.0.png'),
    }}
/>

</TabItem>

<TabItem value="code" label="Ballerina Code">

```ballerina
service /support\-reply on agentChatListener {
    resource function post chat(@http:Payload ai:ChatReqMessage request)
            returns ai:ChatRespMessage|error {
        string stringResult = check replyDrafter.run(request.message, sessionId = request.sessionId);
        string finalReply = check replyReviewer.run(`Draft reply: ${stringResult}`);
        return {message: finalReply};
    }
}
```

</TabItem>
</Tabs>

The **Overview** now shows the chain, as at the [start of this page](#the-example-on-this-page).

To add more stages, repeat these steps below the last `agent : run` node, and point **Return** at the last result.

### Pass everything the next agent needs

An agent in the chain sees only its own **Query**. It doesn't see the customer's message, the earlier agents' instructions, or anything else in the flow. In the example, `replyReviewer` receives the draft and nothing more, which is all its rules need. If a later stage needs the original message as well, include it in that stage's **Query**.

## Test the chain

An **Agent Chat** trigger lets you try the chain from inside Agent Builder.

1. To see each stage, set **Tracing** to **On** before you run. If the integration is already running, restart it: tracing changes only apply to a new run.
2. Click **Run** on the integration's **Overview**. When the pop-up **1 service found in the integration. Test with Try It Client?** appears, click **Test**. The **Agent Chat** panel opens beside the **Overview**. Send a message that tempts the first agent to break the rules, such as `My jacket from order 10423 arrived torn. Can you send a replacement before my trip on Friday? If not, I want my money back.`

    <ThemedImage
        alt="The Agent Chat panel beside the support_reply Overview. The question about the torn jacket from order 10423 is followed by two Execution Steps, Chat gpt-4o-mini and Chat gpt-4o-mini, then the reviewed reply ending with The Support Team, and a View Trace link."
        sources={{
            light: useBaseUrl('/img/genai/develop/agents/multi-agent/19-sequential-chat-test-v1.0.png'),
            dark: useBaseUrl('/img/genai/develop/agents/multi-agent/19-sequential-chat-test-v1.0.png'),
        }}
    />

    **Execution Steps** lists one **Chat** step for each agent, in the order they ran.

3. Click **View Trace**. Each agent's run is its own **Invoke Agent** span, one after the other rather than nested. Select the second agent's span to see the input it received.

    <ThemedImage
        alt="The Trace Logs view beside the Agent Chat panel, with two top-level spans, Invoke Agent Support Reply Drafter and Invoke Agent Support Reply Reviewer, each with its own Chat span. The selected reviewer span shows the Support Reply Reviewer role and instructions, and a USER input that starts with Draft reply: followed by the drafter's reply, which offers to expedite a replacement and to start a refund."
        sources={{
            light: useBaseUrl('/img/genai/develop/agents/multi-agent/20-sequential-trace-v1.0.png'),
            dark: useBaseUrl('/img/genai/develop/agents/multi-agent/20-sequential-trace-v1.0.png'),
        }}
    />

    The reviewer's **USER** input is the drafter's output, prefixed with `Draft reply:`. Compare it with the reviewer's output to see what the second stage changed. In the example, the draft offers to expedite a replacement and to start a refund. The reviewed reply drops both promises and ends with `The Support Team`.

For the rest of the trace viewer, see [Observability](../observability.md).

## Execution behavior

**Every request runs every stage.** The flow calls each agent in turn, whatever the request. Cost and latency are the sum of the stages, which makes them predictable.

**A failing stage ends the request.** Each `agent : run` node fails the flow when its agent returns an error, so later stages don't run and the trigger returns the error.

**Stages run one at a time.** A stage starts only when the one before it has returned.

## Common pitfalls

| Symptom | Likely cause | Fix |
|---|---|---|
| The chat shows the first agent's answer, not the last. | **Return** still returns the first result variable. | Set **Return** to the last agent's result, such as `{message: finalReply}`. |
| A later agent lacks information it needs. | It sees only its own **Query**. Check its **USER** input in the trace. | Add what it needs to the **Query**, such as the original message. |
| A later agent wraps its answer in commentary, such as `Here is the revised reply:`. | Its instructions don't say to return only the result. | Tell it to return only the final output, because the next stage or the customer receives it as is. |
| Execution steps don't appear in the chat. | Tracing is off, or was turned on without restarting the integration. | Set **Tracing** to **On** and restart the integration. |

## What's next

- **[Hierarchical Agents](hierarchical-agents.md)** — Let an orchestrator decide which agents to call.
- **[Multi-Agent Concepts](multi-agent.md)** — When to use sequential or hierarchical agents.
- **[Create an Agent](../create-an-agent.md)** — Call an agent inside any flow.
- **[Observability](../observability.md)** — Trace each stage of the chain.
