---
title: Create an Agent
---

# Creating an Agent

In WSO2 Agent Builder, you first create an agent, then decide how it's called:

- **Connect it to a trigger**: A chat channel, an HTTP endpoint, an event source, or a file source calls the agent. For example, an **Agent Chat** trigger exposes the agent as a chat endpoint over HTTP.
- **Call it inside a flow**: Add an **Agent** step to any flow, such as the resource flow of an HTTP trigger, and the flow runs the agent as one of its steps.

## Create an agent

1. Open the **Add Agent** dialog. Select **Add Agent** on your agentic integration's overview, or select the **Add Agent** action on the **Agents** node in the WSO2 Agent Builder side bar.
2. Under **Create New**, select **Create Agent**.

    <ThemedImage
        alt="The Add Agent dialog with the Create Agent option highlighted, next to Create Durable Agent, Create Agent Definition, and the Pre-built Agents section."
        sources={{
            light: useBaseUrl('/img/genai/develop/agents/create-an-agent/01-add-agent-dialog-v1.0.png'),
            dark: useBaseUrl('/img/genai/develop/agents/create-an-agent/01-add-agent-dialog-v1.0.png'),
        }}
    />

    To create a reusable agent definition or use a pre-built agent instead, see [Agent Definitions](definitions/definitions.md).

3. Configure the agent's role, instructions, and model:

    | Field | Required | Description |
    |---|---|---|
    | **Role** | Yes | Defines the agent's primary function, for example `Order Assistant`. |
    | **Instructions** | Yes | Detailed instructions for the agent. |
    | **Model** | Yes | The model used by the agent. Keep **Default WSO2 Model Provider**, select another model provider, or select **Create New Model Provider**. |

    <ThemedImage
        alt="The empty Create Agent form with Role, Instructions, Model set to Default WSO2 Model Provider, a collapsed Advanced Configurations section, and the Agent Name field."
        sources={{
            light: useBaseUrl('/img/genai/develop/agents/create-an-agent/02-create-agent-form-empty-v1.0.png'),
            dark: useBaseUrl('/img/genai/develop/agents/create-an-agent/02-create-agent-form-empty-v1.0.png'),
        }}
    />

4. Fill in **Role** and **Instructions**, and leave **Model** as **Default WSO2 Model Provider**.

    <ThemedImage
        alt="The Create Agent form with Role set to Order Assistant, Instructions filled in, and Model set to Default WSO2 Model Provider."
        sources={{
            light: useBaseUrl('/img/genai/develop/agents/create-an-agent/03-create-agent-form-filled-v1.0.png'),
            dark: useBaseUrl('/img/genai/develop/agents/create-an-agent/03-create-agent-form-filled-v1.0.png'),
        }}
    />

5. Optionally, expand **Advanced Configurations** to change how the agent runs, such as its maximum iterations or tool loading strategy. See [Advanced configuration](#advanced-configuration).

    <ThemedImage
        alt="The Create Agent form scrolled to Advanced Configurations, showing Maximum Iterations, Verbose, Tool Loading Strategy, Execute Tool Calls In Parallel, and Agent Credential."
        sources={{
            light: useBaseUrl('/img/genai/develop/agents/create-an-agent/04-create-agent-form-advanced-v1.0.png'),
            dark: useBaseUrl('/img/genai/develop/agents/create-an-agent/04-create-agent-form-advanced-v1.0.png'),
        }}
    />

6. Set **Agent Name**, an identifier such as `orderAssistant`, then select **Create Agent**.

The agent appears under **Agents** in the side bar, and its canvas opens.

The canvas shows the **AI Agent** node with its name, an **+ Add Memory** button, and a preview of its role and instructions. The node connects to its model provider on the right. **Add Trigger** on the left and **Add Tool** below the model provider are where you connect the agent to callers and give it tools.

<ThemedImage
    alt="The orderAssistant agent canvas showing Add Trigger, the AI Agent node with an Add Memory button and the agent's role and instructions, the Default WSO2 Model Provider, and Add Tool."
    sources={{
        light: useBaseUrl('/img/genai/develop/agents/create-an-agent/05-agent-canvas-new-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/agents/create-an-agent/05-agent-canvas-new-v1.0.png'),
    }}
/>

WSO2 Agent Builder adds the agent declaration to `agents.bal`:

```ballerina
import ballerina/ai;

final ai:Agent orderAssistant = check new (
    systemPrompt = {
        role: string `Order Assistant`,
        instructions: string `You help customers check the status of their
            orders. Ask for the order ID if the customer has not given it,
            and keep answers short.`
    },
    model = check ai:getDefaultModelProvider()
);
```

## Expose the agent as a chat endpoint

Connect the agent to an **Agent Chat** trigger to call it over HTTP and chat with it from WSO2 Agent Builder.

1. On the agent canvas, select **Add Trigger**.
2. Under **Chat Channels**, select **Agent Chat**.

    <ThemedImage
        alt="The Add Trigger dialog for orderAssistant listing Chat Channels (Agent Chat, Google Chat, Telegram, WhatsApp Business), API Endpoints (HTTP), and Event Sources."
        sources={{
            light: useBaseUrl('/img/genai/develop/agents/create-an-agent/06-add-trigger-dialog-v1.0.png'),
            dark: useBaseUrl('/img/genai/develop/agents/create-an-agent/06-add-trigger-dialog-v1.0.png'),
        }}
    />

    For the other triggers, see [AI Agents](agents.md).

3. Set **Service Path**, the HTTP path the chat endpoint is served on, for example `/order-assistant`. Under **Advanced Configurations**, you can choose between the **Shared Listener (Port 9090)** and a **Custom Listener**.
4. Select **Create**.

    <ThemedImage
        alt="The Agent Chat trigger form for orderAssistant with Service Path set to /order-assistant and a collapsed Advanced Configurations section."
        sources={{
            light: useBaseUrl('/img/genai/develop/agents/create-an-agent/07-agent-chat-trigger-form-v1.0.png'),
            dark: useBaseUrl('/img/genai/develop/agents/create-an-agent/07-agent-chat-trigger-form-v1.0.png'),
        }}
    />

WSO2 Agent Builder generates the following:

- A listener (`agentChatListener`) on the shared HTTP listener
- A chat service on the service path, with a `POST /chat` resource
- A resource flow that runs the agent and returns its response

The trigger appears on the left of the agent canvas, and under **Entry Points** in the side bar. An agent can have more than one trigger. In the following example, `orderAssistant` is also called from an HTTP trigger on `/orders`.

<ThemedImage
    alt="The orderAssistant agent canvas with two triggers on the left, an Agent Chat trigger on /order-assistant and an HTTP Service trigger on /orders, both connected to the AI Agent node."
    sources={{
        light: useBaseUrl('/img/genai/develop/agents/create-an-agent/08-agent-canvas-with-triggers-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/agents/create-an-agent/08-agent-canvas-with-triggers-v1.0.png'),
    }}
/>

Select the **Agent Chat** trigger to open the **Chat Agent Service** resource flow. It shows **Start**, an `agent : run` node bound to a result variable with an **Open Agent** link back to the agent's canvas, then **Return**. Select **Chat** at the top right to chat with the agent. See [Try it and run](agents.md#try-it-and-run).

<ThemedImage
    alt="The Chat Agent Service resource flow for orderAssistant showing Start, an agent:run node bound to stringResult with an Open Agent link, and Return, with Tracing: Off and Chat buttons at the top right."
    sources={{
        light: useBaseUrl('/img/genai/develop/agents/create-an-agent/09-chat-agent-service-flow-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/agents/create-an-agent/09-chat-agent-service-flow-v1.0.png'),
    }}
/>

```ballerina
import ballerina/ai;
import ballerina/http;

listener ai:Listener agentChatListener =
    new (listenOn = check http:getDefaultListener());

service /order\-assistant on agentChatListener {
    resource function post chat(@http:Payload ai:ChatReqMessage request)
            returns ai:ChatRespMessage|error {
        string stringResult = check orderAssistant.run(
            request.message, sessionId = request.sessionId);
        return {message: stringResult};
    }
}
```

## Call an agent inside a flow

You can run an agent as one step of any flow that has a flow editor, such as the resource flow of an HTTP service. The following example adds a `requestSummarizer` agent to the `POST` resource of an HTTP service on `/summaries`, so the service returns a one-sentence summary of the request.

1. Open the flow. For example, select the service's resource under **Entry Points** in the side bar.
2. Hover over the connection where you want the step, and select the **+** that appears to open the node panel.
3. Under **AI**, select **Agent**.

    <ThemedImage
        alt="The /summaries resource flow with a new step placeholder between Start and Return, and the node panel open with the AI section expanded to show Direct LLM, RAG, and the Agent option highlighted."
        sources={{
            light: useBaseUrl('/img/genai/develop/agents/create-an-agent/10-add-node-ai-agent-v1.0.png'),
            dark: useBaseUrl('/img/genai/develop/agents/create-an-agent/10-add-node-ai-agent-v1.0.png'),
        }}
    />

4. The **Agents** panel lists the agents already in the agentic integration. Select one to reuse it, or select **+** to open the **Add Agent** dialog and create a new one. After you create a new agent, select it in the list.

    <ThemedImage
        alt="The Agents panel listing orderAssistant, requestSummarizer, and supportAgent, with the + button highlighted."
        sources={{
            light: useBaseUrl('/img/genai/develop/agents/create-an-agent/11-agents-panel-v1.0.png'),
            dark: useBaseUrl('/img/genai/develop/agents/create-an-agent/11-agents-panel-v1.0.png'),
        }}
    />

5. The **AI Agent** panel opens to bind this call of the agent in the flow:

    | Field | Required | Description |
    |---|---|---|
    | **Query** | Yes | A query to start a new turn (`string`/`Prompt`), or a `Resume` to continue a paused run. |
    | **Session ID** | No | The ID associated with the agent memory. Defaults to `"sessionId"`. |
    | **Context** | No | Additional context that can be used during agent tool execution. Defaults to `new ()`. |
    | **Type Descriptor** | No | Under **Advanced Configurations**. The expected return type format. Defaults to `ai:Trace|anydata`. |
    | **Result** | Yes | Name of the result variable. |

6. Set **Query**. If there's no input variable to bind, leave **Query** in **Prompt** mode and type a literal string, for example `Summarize this request: My order 1042 has not arrived yet and I need it by Friday.` Leave **Result** at its default and select **Save**.

    <ThemedImage
        alt="The AI Agent panel with Query set to a literal prompt, Session ID and Context at their defaults, and Result set to stringResult."
        sources={{
            light: useBaseUrl('/img/genai/develop/agents/create-an-agent/12-ai-agent-node-panel-v1.0.png'),
            dark: useBaseUrl('/img/genai/develop/agents/create-an-agent/12-ai-agent-node-panel-v1.0.png'),
        }}
    />

This adds an `agent : run` node to the flow, bound to the result variable, with an **Open Agent** link to the agent's canvas. Select the node again to edit the call. In this example, the **Return** step is then set to return `stringResult`.

<ThemedImage
    alt="The /summaries resource flow showing Start, an agent:run node for requestSummarizer bound to stringResult with an Open Agent link, and Return stringResult."
    sources={{
        light: useBaseUrl('/img/genai/develop/agents/create-an-agent/13-inline-agent-in-flow-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/agents/create-an-agent/13-inline-agent-in-flow-v1.0.png'),
    }}
/>

```ballerina
service /summaries on httpDefaultListener {
    resource function post .(@http:Payload string payload) returns string|error {
        string stringResult = check requestSummarizer.run(
            `Summarize this request: My order 1042 has not arrived yet and I need it by Friday.`);
        return stringResult;
    }
}
```

After creating an agent, you can configure:

- [Agent behavior, including role, instructions, and query bindings](create-an-agent.md#configure-agent-behavior)
- [Model provider](../ai-building-blocks/model-providers.md)
- [Tools](./tools.md)
- [Memory](./memory.md)
- [Identity & access management](./identity-and-access-management.md)
- [Observability and tracing](./observability.md)

## Configure agent behavior

An agent's behavior is set in two places: on the agent itself, and on each call of the agent in a flow.

### The agent

On the agent canvas, select the **AI Agent** node to open the **Edit Agent** panel. Changes here apply to every caller of the agent.

| Field | Description |
|---|---|
| **Role** | Defines the primary responsibility or persona of the agent. |
| **Instructions** | Specifies the behavior guidelines and operational instructions that the agent follows while responding. |
| **Advanced Configurations** | Runtime and execution settings. See [Advanced configuration](#advanced-configuration). |
| **Agent Name** | The agent's identifier. |

To change the model, select the model provider node on the canvas instead. See [Model Providers](../ai-building-blocks/model-providers.md).

<ThemedImage
    alt="The Edit Agent panel for orderAssistant showing Role, Instructions, and the expanded Advanced Configurations section with Maximum Iterations, Verbose, and Tool Loading Strategy."
    sources={{
        light: useBaseUrl('/img/genai/develop/agents/create-an-agent/14-edit-agent-advanced-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/agents/create-an-agent/14-edit-agent-advanced-v1.0.png'),
    }}
/>

### Advanced configuration

The **Advanced Configurations** section of the **Create Agent** form and the **Edit Agent** panel has the following settings:

| Field | Default | Description |
|---|---|---|
| **Maximum Iterations** | `INFER_TOOL_COUNT` | The maximum number of reasoning-action cycles the agent performs to complete a task. One cycle is one LLM call plus every tool call returned in that response. `INFER_TOOL_COUNT` resolves to `max(number of tools, 10)`. |
| **Verbose** | `false` | Whether verbose logging is enabled. |
| **Tool Loading Strategy** | `NO_FILTER` | How tool schemas are loaded into the agent. `NO_FILTER` loads all tools without filtering. |
| **Execute Tool Calls In Parallel** | `true` | Whether multiple tool calls returned in a single LLM response run concurrently or one after another. |
| **Agent Credential** | None | Optional authentication details of the agent. See [Identity & Access Management](identity-and-access-management.md). |

### A call of the agent

In a flow, select an `agent : run` node to open the **AI Agent** panel. Changes here apply only to that call.

| Field | Description |
|---|---|
| **Query** | The input for this call, as a prompt or an expression. |
| **Session ID** | The memory session this call uses. |
| **Context** | Additional context passed to the agent during tool execution. |
| **Type Descriptor** | The expected structure of the result. |
| **Result** | The variable that holds the agent's response. |

## What's next

- **[Tools](tools.md)** - Add tools to the agent.
- **[Memory](memory.md)** - Configure conversational and persistent memory.
- **[Observability](observability.md)** - Monitor traces, logs, and execution details.
- **[Evaluations](evaluations/evaluations.md)** - Test and evaluate agent behavior and response quality.
