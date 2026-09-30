---
sidebar_position: 1
title: AI Agents
description: Reference for AI Agents in WSO2 Integrator. The Chat Agent Service wizard, system prompt, tools, memory, observability, and evaluations.
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

Without tools, an agent is limited to generating responses without interacting with external systems. Without memory, the agent cannot maintain context across multi-turn conversations.

In WSO2 Integrator, AI agents can be visually designed, configured with tools and memory, connected to model providers, and exposed through APIs or listeners.

## What an agent looks like in the canvas

Creating a **Chat Agent Service** artifact (under **AI Integration** on the Artifacts page) produces two related canvases:

- The **resource flow** (for example the `chat` resource): **Start** → an `agent:run` node bound to a result variable, with an **Open Agent** link → **Return**.
- The **agent's own canvas**, opened via **Open Agent**: a single **AI Agent** block showing the agent name, an **+ Add Memory** button, and a preview of its role and instructions, connected to its model provider.

The **AI Agent** block provides a centralized configuration interface for defining the agent's behavior and capabilities.

![The AI Agent canvas showing the AI Agent node with its name, an Add Memory button, a role and instructions preview, and a connection to the model provider.](/img/genai/develop/agents/overview/agent-flow-canvas.png)

The **AI Agent** block allows you to configure the following components of the agent:

- **System prompt and agent behavior**: Role and Instructions are set when you create the **Chat Agent Service** artifact. Select the role/instructions preview on the **AI Agent** block afterward to edit them.
- **Memory configuration**: Use the **+ Add Memory** button to configure conversational or persistent memory for the agent. For more information, see [Memory](./memory.md).
- **Tools**: Select the **+** on the AI Agent block to open the **Add Tool** panel, which lists **Use Connection**, **Use Function**, **Use Agent**, **Use MCP Server**, and **Create Custom Tool**. For more information, see [Tools](./tools.md).
- **Gated tools**: Mark a tool as requiring approval so the agent pauses and asks a person before it runs. For more information, see [Gated Tools](./gated-tools.md).
- **Model Provider Configuration**: Select the attached model provider connection (for example, `aiWso2modelprovider`) to configure the LLM provider and model settings used by the agent. For more information, see [Model Providers](../components/model-providers.md).

## Try it and run

The top-right controls in the agent canvas allow you to interact with and test the agent directly within WSO2 Integrator.

| Button | Description |
|---|---|
| **Tracing: Off / On** | Enables or disables OpenTelemetry tracing for the agent |
| **Chat** | Opens an in-IDE chat interface for interacting with the agent |

The chat interface reuses the same session across interactions, enabling memory-aware conversations during development and testing.

## Common pitfalls

| Symptom | Likely cause | Fix |
|---|---|---|
| Agent doesn't pick the tool you expected. | Tool description is vague, or the system prompt doesn't mention when to use the tool. | Tighten the tool description; add a one-liner trigger condition in Instructions. |
| Agent's first response is empty, second is fine. | The default WSO2 Model Provider isn't fully signed in yet. | Run **Ballerina: Configure default WSO2 model provider** from the Command Palette. |
| Agent drifts off-topic over a long conversation. | Memory is full and trimming is dropping the system prompt context. | Lower **Max Messages Per Key** (MSSQL) or use a larger-context model. |
| Same input produces wildly different responses. | Temperature is high on the model provider. | Lower temperature on the provider's Advanced Configurations. |
| `bal run` fails with "default model provider not configured". | `wso2aiKey` missing from `Config.toml`. | Run **Configure default WSO2 model provider** again. |

## What's next

- **[Creating an Agent](creating-an-agent.md)** - Learn how to create and configure agents using the Chat Agent Service wizard.
- **[Tools](tools.md)** - Add functions, connectors, and integrations to your agents.
- **[Memory](memory.md)** - Configure conversational and persistent memory.
- **[Identity & access management](identity-and-access-management.md)** - Secure agents, tools, and integrations using authentication and authorization.
- **[Gated Tools](gated-tools.md)** - Pause the agent for approval before it runs a sensitive tool.
- **[Observability](observability.md)** - Monitor traces, logs, and execution details.
- **[Evaluations](evaluations/overview.md)** - Test and evaluate agent behavior and response quality.
