---
title: Create an Agent
---

# Creating an Agent

WSO2 Integrator supports the creation of AI agents as either **Chat agents** or **Inline agents**.

## Chat agents

Chat agents are AI agents exposed through HTTP REST APIs, allowing users or external systems to send prompts and receive responses powered by large language models (LLMs). You create a chat agent from the **Chat Agent Service** artifact.

## Inline agents

Inline agents can be embedded directly within integration flows, such as automations, REST APIs, GraphQL resolvers, or backend service logic, and are invoked programmatically as part of the flow.

## Launching the Artifacts page

1. Open your integration project in WSO2 Integrator.
2. On the **Design** tab, select **+ Add Artifact** (or **Add Artifact manually** if the project is still empty).

<ThemedImage
    alt="Artifacts page in WSO2 Integrator showing all artifact categories: Automation, AI Integration (AI Chat Agent, MCP Service), Integration as API (HTTP Service, GraphQL Service Beta, TCP Service Beta), Event Integration (Kafka, RabbitMQ, MQTT, Azure Service Bus, Salesforce, Twilio, GitHub, Solace, CDC for Microsoft SQL Server, CDC for PostgreSQL)."
    sources={{
        light: useBaseUrl('/img/genai/develop/agents-v5.1/creating-an-agent/01-artifacts-page-full-v5.1.png'),
        dark: useBaseUrl('/img/genai/develop/agents-v5.1/creating-an-agent/01-artifacts-page-full-v5.1.png'),
    }}
/>

## Create a chat agent

Under **AI Integration**, select **Chat Agent Service**.

1. Configure the agent's model, role, and instructions:

    | Field | Required | Description |
    |---|---|---|
    | **Role** | Yes | Defines the agent's primary function, for example `Customer Support Assistant`. |
    | **Instructions** | Yes | Detailed instructions for the agent. |
    | **Model** | Yes | The model used by the agent. Select an existing model provider connection, or select **Create New Model Provider**. |
    | **Maximum Iterations** | No | The maximum number of reasoning-action cycles the agent performs to complete a task. Defaults to `INFER_TOOL_COUNT`, which resolves to `max(number of tools, 10)`. |
    | **Verbose** | No | Whether verbose logging is enabled. Defaults to `false`. |
    | **Tool Loading Strategy** | No | How tool schemas are loaded into the agent. Defaults to `NO_FILTER`, which loads all tools without filtering. |
    | **Execute Tool Calls In Parallel** | No | Whether multiple tool calls returned in a single LLM response are executed concurrently or sequentially. Defaults to `true`. |

    <ThemedImage
        alt="The empty Create Chat Agent Service form with Role, Instructions, Model, and Maximum Iterations fields."
        sources={{
            light: useBaseUrl('/img/genai/develop/agents-v5.1/creating-an-agent/02-chat-agent-service-form-empty-v5.1.png'),
            dark: useBaseUrl('/img/genai/develop/agents-v5.1/creating-an-agent/02-chat-agent-service-form-empty-v5.1.png'),
        }}
    />

2. Fill in **Role**, **Instructions**, and leave **Model** as the **Default WSO2 Model Provider**.

    <ThemedImage
        alt="The Create Chat Agent Service form filled in with Role set to Blog Reviewer, Instructions filled in, and Model set to Default WSO2 Model Provider."
        sources={{
            light: useBaseUrl('/img/genai/develop/agents-v5.1/creating-an-agent/03-chat-agent-service-form-filled-v5.1.png'),
            dark: useBaseUrl('/img/genai/develop/agents-v5.1/creating-an-agent/03-chat-agent-service-form-filled-v5.1.png'),
        }}
    />

3. Scroll down under **Advanced Configurations** to set:

    | Field | Required | Description |
    |---|---|---|
    | **Agent Name** | Yes | Identifier for the agent, such as `blogReviewer`, `supportAssistant`, or `salesAdvisor`. |
    | **Service Base Path** | Yes | The path where this chat service is exposed, for example `/blog-reviewer`. |

4. Select **Create**.

    <ThemedImage
        alt="The bottom of the Create Chat Agent Service form with Agent Name set to blogReviewer and Service Base Path set to /blog-reviewer."
        sources={{
            light: useBaseUrl('/img/genai/develop/agents-v5.1/creating-an-agent/04-chat-agent-service-name-path-v5.1.png'),
            dark: useBaseUrl('/img/genai/develop/agents-v5.1/creating-an-agent/04-chat-agent-service-name-path-v5.1.png'),
        }}
    />

WSO2 Integrator generates the required integration artifacts and displays a progress indicator while configuring the service listener and related components.

When it completes, WSO2 Integrator automatically generates the following:

- An HTTP service with a `POST /chat` resource
- A listener endpoint (`chatAgentListener`)
- An AI agent, listed under **Agents**
- A resource flow that invokes the agent and returns its response

The resource flow shows **Start**, an `agent:run` node bound to a result variable with an **Open Agent** link, then **Return**.

<ThemedImage
    alt="The chat resource flow showing Start, an agent:run node bound to stringResult with an Open Agent link to blogReviewer, then Return."
    sources={{
        light: useBaseUrl('/img/genai/develop/agents-v5.1/creating-an-agent/05-chat-agent-resource-flow-v5.1.png'),
        dark: useBaseUrl('/img/genai/develop/agents-v5.1/creating-an-agent/05-chat-agent-resource-flow-v5.1.png'),
    }}
/>

Selecting **Open Agent** (or the agent under **Agents** in the sidebar) opens the agent's own canvas: a single **AI Agent** block showing the agent's name, an **+ Add Memory** button, and a preview of its role and instructions, connected to its model provider.

<ThemedImage
    alt="The AI Agent canvas showing the AI Agent node with its name, an Add Memory button, a role and instructions preview, and a connection to the model provider."
    sources={{
        light: useBaseUrl('/img/genai/develop/agents-v5.1/creating-an-agent/06-agent-canvas-v5.1.png'),
        dark: useBaseUrl('/img/genai/develop/agents-v5.1/creating-an-agent/06-agent-canvas-v5.1.png'),
    }}
/>

The generated Ballerina source for an agent named `blogReviewer` is similar to the following:

```ballerina
import ballerina/ai;
import ballerina/http;

// Default model provider
final ai:Wso2ModelProvider wso2ModelProvider =
    check ai:getDefaultModelProvider();

// Agent declaration
final ai:Agent blogReviewerAgent = check new (
    systemPrompt = {
        role: string `Blog Reviewer`,
        instructions: string `You review blog drafts and suggest
            improvements for clarity, tone, and grammar.`
    },
    model = wso2ModelProvider,
    tools = []
);

// Listener
listener ai:Listener chatAgentListener =
    new (listenOn = check http:getDefaultListener());

// Service
service /blogReviewer on chatAgentListener {

    resource function post chat(
            @http:Payload ai:ChatReqMessage request)
            returns ai:ChatRespMessage|error {

        string stringResult =
            check blogReviewerAgent.run(
                request.message,
                request.sessionId
            );

        return {message: stringResult};
    }
}
```

## Create an inline agent

You can add an inline agent within integration flows, such as automations, REST APIs, GraphQL resolvers, or backend service logic.

1. Create or open an integration artifact that has a flow editor, for example an **Automation**.
2. In the flow editor, select **+** to open the **Add Node** panel.
3. Under **AI**, select **Agent**. *"Create or reuse an Agent."*

    <ThemedImage
        alt="Add Node panel with the AI section showing Direct LLM, RAG, and Agent options, with the Agent option highlighted and its tooltip visible."
        sources={{
            light: useBaseUrl('/img/genai/develop/agents-v5.1/creating-an-agent/07-automation-empty-flow-v5.1.png'),
            dark: useBaseUrl('/img/genai/develop/agents-v5.1/creating-an-agent/07-automation-empty-flow-v5.1.png'),
        }}
    />

    <ThemedImage
        alt="The Add Node panel's AI section with the Agent option selected and its Create or reuse an Agent tooltip shown."
        sources={{
            light: useBaseUrl('/img/genai/develop/agents-v5.1/creating-an-agent/08-add-node-ai-panel-v5.1.png'),
            dark: useBaseUrl('/img/genai/develop/agents-v5.1/creating-an-agent/08-add-node-ai-panel-v5.1.png'),
        }}
    />

4. The **Agents** panel lists any agents already defined in the project (for example, an agent created by a Chat Agent Service) as reusable options, plus a **+** button to add a new one.

    <ThemedImage
        alt="The Agents panel listing the existing blogReviewer agent as a reusable option, with a + button to add a new agent."
        sources={{
            light: useBaseUrl('/img/genai/develop/agents-v5.1/creating-an-agent/09-agents-panel-reusable-v5.1.png'),
            dark: useBaseUrl('/img/genai/develop/agents-v5.1/creating-an-agent/09-agents-panel-reusable-v5.1.png'),
        }}
    />

5. Select **+** to open the **Add Agent** dialog. It offers three ways to add an agent:

    | Option | Description |
    |---|---|
    | **Create Agent** | Create a one-off agent instance for this integration only. |
    | **Create Agent Definition** | Create a reusable agent definition that can be shared and used to create agent instances with the same configuration across projects. |
    | **Pre-built Agents** | Select from pre-built agents available at the project or organization level. |

    <ThemedImage
        alt="The Add Agent dialog with Create Agent, Create Agent Definition, and an empty Pre-built Agents section."
        sources={{
            light: useBaseUrl('/img/genai/develop/agents-v5.1/creating-an-agent/10-add-agent-modal-v5.1.png'),
            dark: useBaseUrl('/img/genai/develop/agents-v5.1/creating-an-agent/10-add-agent-modal-v5.1.png'),
        }}
    />

6. Select **Create Agent**. This opens the same **Role**, **Instructions**, **Model**, and advanced configuration fields as the Chat Agent Service form (see [Create a chat agent](#create-a-chat-agent) above), ending with an **Agent Name** field instead of a service base path.

    <ThemedImage
        alt="The empty Create Agent form with Role, Instructions, Model, and Maximum Iterations fields."
        sources={{
            light: useBaseUrl('/img/genai/develop/agents-v5.1/creating-an-agent/11-create-agent-form-empty-v5.1.png'),
            dark: useBaseUrl('/img/genai/develop/agents-v5.1/creating-an-agent/11-create-agent-form-empty-v5.1.png'),
        }}
    />

7. Fill in **Role**, **Instructions**, and **Agent Name**, then select **Create Agent**.

    <ThemedImage
        alt="The Create Agent form scrolled down to Verbose, Tool Loading Strategy, Execute Tool Calls In Parallel, and the Agent Name field."
        sources={{
            light: useBaseUrl('/img/genai/develop/agents-v5.1/creating-an-agent/12-create-agent-form-name-v5.1.png'),
            dark: useBaseUrl('/img/genai/develop/agents-v5.1/creating-an-agent/12-create-agent-form-name-v5.1.png'),
        }}
    />

    This adds the new agent under **Agents** in the sidebar. Immediately after, WSO2 Integrator opens the **AI Agent** node configuration panel to bind this specific invocation of the agent in the flow:

    | Field | Required | Description |
    |---|---|---|
    | **Query** | Yes | A query to start a new turn (`string`/`Prompt`), or a `Resume` to continue a paused run. |
    | **Session ID** | No | The ID associated with the agent memory. Defaults to `sessionId`. |
    | **Context** | No | Additional context that can be used during agent tool execution. Defaults to `new()`. |
    | **Result** | Yes | Name of the result variable. |

8. Set **Query**. If there's no existing input variable to bind, leave **Query** in **Prompt** mode and type a literal string, for example `Summarize this: WSO2 Integrator is a low-code platform for building APIs, integrations, and AI agents.` Leave **Result** at its default and select **Save**.

    <ThemedImage
        alt="The AI Agent node panel with Query set to a literal prompt string and Result set to stringResult."
        sources={{
            light: useBaseUrl('/img/genai/develop/agents-v5.1/creating-an-agent/13-ai-agent-node-panel-filled-v5.1.png'),
            dark: useBaseUrl('/img/genai/develop/agents-v5.1/creating-an-agent/13-ai-agent-node-panel-filled-v5.1.png'),
        }}
    />

This adds an `agent:run` node to the flow, bound to the result variable, with an **Open Agent** link back to the new agent's own canvas, the same pattern as a Chat Agent Service's resource flow.

<ThemedImage
    alt="Flow editor showing the agent:run node bound to stringResult with an Open Agent link to taskSummarizer, between Start and Error Handler."
    sources={{
        light: useBaseUrl('/img/genai/develop/agents-v5.1/creating-an-agent/14-inline-agent-node-in-flow-v5.1.png'),
        dark: useBaseUrl('/img/genai/develop/agents-v5.1/creating-an-agent/14-inline-agent-node-in-flow-v5.1.png'),
    }}
/>

Selecting **Open Agent** opens the agent's own canvas: an **AI Agent** block showing its name, an **+ Add Memory** button, and a preview of its role and instructions.

<ThemedImage
    alt="The taskSummarizer AI Agent canvas showing its name, an Add Memory button, and a role and instructions preview."
    sources={{
        light: useBaseUrl('/img/genai/develop/agents-v5.1/creating-an-agent/15-inline-agent-canvas-v5.1.png'),
        dark: useBaseUrl('/img/genai/develop/agents-v5.1/creating-an-agent/15-inline-agent-canvas-v5.1.png'),
    }}
/>

```ballerina
import ballerina/ai;

// Default model provider
final ai:Wso2ModelProvider aiWso2modelprovider =
    check ai:getDefaultModelProvider();

// Agent declaration
final ai:Agent taskSummarizerAgent = check new (
    systemPrompt = {
        role: string `Task Summarizer`,
        instructions: string `Summarize the input text in
            one sentence.`
    },
    model = aiWso2modelprovider
);

public function main() returns error? {
    string stringResult = check taskSummarizerAgent.run(
        "Summarize this: WSO2 Integrator is a low-code " +
        "platform for building APIs, integrations, and AI agents."
    );
}
```

After creating either kind of agent, you can configure:

- [Agent behavior, including role, instructions, query, and input/output bindings](create-an-agent.md#configure-agent-behavior)
- [Model provider](../ai-building-blocks/model-providers.md)
- [Tools](./tools.md)
- [Memory](./memory.md)
- [Identity & access management](./identity-and-access-management.md)
- [Observability and tracing](./observability.md)

## Configure agent behavior

Use the AI Agent node configuration panel to customize how the agent behaves and responds to requests.

Click the `AI Agent` node to open the configuration panel and update the following configurations.

| Section | Description |
|---|---|
| **Role** | Defines the primary responsibility or persona of the agent. |
| **Instructions** | Specifies the behavior guidelines and operational instructions that the agent should follow while responding. |
| **Advanced Configuration** | Provides additional runtime and execution settings for the agent. |
| **Result** | Defines the output or response generated by the agent after execution. |

### Advanced configuration

| Section | Description |
|---|---|
| **Maximum Iterations** | Defines the maximum number of reasoning or execution cycles the agent can perform before returning a response. |
| **Verbose** | Enables detailed execution logs and intermediate reasoning information for debugging and observability purposes. |
| **Tool Loading Strategy** | Determines how tools are discovered and loaded by the agent during execution. |
| **Agent Credential** | Configures the credentials or authentication details used by the agent when accessing external systems or tools. |
| **Context** | Defines contextual information that is passed to the agent during execution. |
| **Type Descriptor** | Specifies the expected structure or type information for agent inputs and outputs. |

## What's next

- **[Tools](tools.md)** - Add tools and integrations to the agent.
- **[Memory](memory.md)** - Configure conversational and persistent memory.
- **[Observability](observability.md)** - Monitor traces, logs, and execution details.
- **[Evaluations](evaluations/evaluations.md)** - Test and evaluate agent behavior and response quality.
