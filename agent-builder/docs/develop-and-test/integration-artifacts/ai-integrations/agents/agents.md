---
title: AI Agents
---

# AI Agents

AI agents are software components that use large language models (LLMs) to understand requests, make decisions, and perform actions autonomously. They can interact with users, invoke tools, access external systems, and maintain conversation context to complete tasks.

## Components of an AI agent

An AI agent is composed of four core components that enable reasoning, action execution, and context management.

| Component | Description |
|---|---|
| **Model** | The Large Language Model (LLM) responsible for reasoning and response generation |
| **System Prompt** | Instructions that define the agent’s role, behavior, constraints, and interaction style |
| **Tools** | Functions, APIs, connectors, or services that the agent can invoke during execution |
| **Memory** | Context and conversation state maintained across interactions |

Without tools, the agent is limited to generating responses without interacting with external systems. Without memory, the agent cannot maintain context across multi-turn conversations.

In WSO2 Agent Builder, you design agents visually inside an agentic integration, give them tools and memory, connect them to a model provider, and connect them to **triggers** such as a chat channel, an HTTP endpoint, or an event source. An agent can also be attached as a tool of another agent, so one agent delegates part of its work to another. See [Multi-Agent Systems](multi-agent/multi-agent.md).

## Ways to create an agent

Open the **Add Agent** dialog from the **Add Agent** button on your agentic integration's overview, or from the **Add Agent** action on the **Agents** node in the WSO2 Agent Builder side bar.

<ThemedImage
    alt="The Add Agent dialog with Create Agent, Create Durable Agent, and Create Agent Definition under Create New, and a Pre-built Agents section with All, Project, and Organization filters."
    sources={{
        light: useBaseUrl('/img/genai/develop/agents/01-add-agent-dialog-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/agents/01-add-agent-dialog-v1.0.png'),
    }}
/>

| You want | Use | You get |
|---|---|---|
| An agent for this agentic integration | **Add Agent** → **Create Agent** | A single agent instance |
| An agent that can wait days for a person or an event and resume after a restart | **Add Agent** → **Create Durable Agent** | An agent that runs as a durable workflow |
| An agent reused across agentic integrations or projects | **Add Agent** → **Create Agent Definition** | A reusable template that you can share |
| An agent someone has already built | **Add Agent** → **Pre-built Agents** | An instance of an existing definition |

The last two are covered in [Agent Definitions](definitions/definitions.md). For a durable agent, see [Build a Durable Agent](../../../../get-started/quickstarts/build-durable-agent.md).

## Connect an agent to a trigger

An agent runs when a trigger calls it. On the agent canvas, click **Add Trigger** and pick how the agent is reached:

| Trigger group | What it does | Options |
|---|---|---|
| **Chat Channels** | Incoming messages are passed to the agent, and its reply is sent back. | Agent Chat, Google Chat, Telegram, WhatsApp Business |
| **API Endpoints** | Exposes the agent at a URL. A caller sends a request and gets the agent's answer back. | HTTP |
| **Event Sources** | Runs the agent when something happens in another system. | For example Kafka, RabbitMQ, AWS SQS, Salesforce, GitHub |
| **File Sources** | Runs the agent when a file becomes available in a location. | Azure Files, FTP / SFTP, Local Files, SMB |

**Agent Chat** gives the agent an HTTP chat endpoint (for example `POST /support-agent/chat`) that you can also chat with from inside WSO2 Agent Builder. An agent can have more than one trigger. Each trigger appears under **Entry Points** in the side bar.

## What an agent looks like in the canvas

Select an agent under **Agents** in the side bar, or on the agentic integration's overview, to open its canvas. The canvas shows the agent with everything connected to it:

- **Triggers** on the left, with **Add Trigger** to add another
- The **AI Agent** node in the middle, showing its role and instructions
- The **model provider** on the right
- **Add Tool** below the model provider, and the tools the agent can call

<ThemedImage
    alt="The agent canvas for supportAgent, showing an Agent Chat trigger on /support-agent connected to the AI Agent node, which has an Add Memory button and the agent's role and instructions, and is connected to the Default WSO2 Model Provider. Add Trigger and Add Tool buttons sit beside the node, and Evaluations and Tracing: Off buttons are at the top right."
    sources={{
        light: useBaseUrl('/img/genai/develop/agents/02-agent-flow-canvas-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/agents/02-agent-flow-canvas-v1.0.png'),
    }}
/>

From the canvas, you can configure the following components of the agent:

- **System prompt and agent behavior**: Click the **AI Agent** node to open the **Edit Agent** panel, where you can configure the agent's role, instructions, and advanced settings.
- **Memory configuration**: Use **Add Memory** on the **AI Agent** node to configure conversational or persistent memory for the agent. For more information, see [Memory](memory.md).
- **Tools**: Use **Add Tool** to add tools and MCP servers that the agent can call during execution. For more information, see [Tools](tools.md).
- **Gated tools**: Mark a tool as requiring approval so the agent pauses and asks a person before it runs. For more information, see [Gated Tools](gated-tools.md).
- **Model provider configuration**: Click the model provider node (for example, **Default WSO2 Model Provider**) to choose the provider the agent uses, or create a new one. For more information, see [Model Providers](../ai-building-blocks/model-providers.md).

The **Evaluations** and **Tracing: Off / On** buttons at the top right of the canvas open the agent's [evaluations](evaluations/evaluations.md) and turn [tracing](observability.md) on or off.

## Try it and run

To chat with an agent that has an **Agent Chat** trigger:

1. On the agent canvas, click the **Agent Chat** trigger. This opens the **Chat Agent Service** view, where the agent runs between **Start** and **Return**.
2. Click **Chat** at the top right.
3. If the agentic integration isn't running yet, WSO2 Agent Builder asks whether to run it. Select **Run Integration**.

The **Agent Chat** panel opens next to the canvas. Send a message to see the agent's reply.

<ThemedImage
    alt="The Chat Agent Service view with Tracing: Off and Chat buttons, next to the Agent Chat panel where the agent has replied to a user's message."
    sources={{
        light: useBaseUrl('/img/genai/develop/agents/03-agent-chat-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/agents/03-agent-chat-v1.0.png'),
    }}
/>

The chat reuses the same session across messages, so you can test memory-aware conversations during development. Use **Clear Chat** to start a new conversation.

## Common pitfalls

| Symptom | Likely cause | Fix |
|---|---|---|
| Agent doesn't pick the tool you expected. | Tool description is vague, or the system prompt doesn't mention when to use the tool. | Tighten the tool description; add a one-liner trigger condition in Instructions. |
| Agent's first response is empty or fails. | You aren't signed in, so the Default WSO2 Model Provider can't be used. | Sign in to WSO2 Agent Builder, then run **Configure default WSO2 model provider** from the Command Palette. |
| Agent drifts off-topic over a long conversation. | Memory is full and trimming is dropping the system prompt context. | Lower **Max Messages Per Key** (MSSQL) or use a larger-context model. |
| Same input produces wildly different responses. | Temperature is high on the model provider. | Lower temperature on the provider's Advanced Configurations. |
| Running the agentic integration fails with "default model provider not configured". | `wso2aiKey` missing from `Config.toml`. | Run **Configure default WSO2 model provider** from the Command Palette again. |

## What's next

- **[Creating an Agent](create-an-agent.md)** - Learn how to create and configure agents.
- **[Agent Definitions](definitions/definitions.md)** - Build a reusable agent template and share it across projects.
- **[Tools](tools.md)** - Add functions, connectors, and MCP servers to your agents.
- **[Multi-Agent Systems](multi-agent/multi-agent.md)** - Delegate work from one agent to another.
- **[Gated Tools](gated-tools.md)** - Pause a tool call for approval before it runs.
- **[Memory](memory.md)** - Configure conversational and persistent memory.
- **[Observability](observability.md)** - Monitor traces, logs, and execution details.
- **[Identity & Access Management](identity-and-access-management.md)** - Secure agents and tools with identity and access control.
- **[Evaluations](evaluations/evaluations.md)** - Test and evaluate agent behavior and response quality.
