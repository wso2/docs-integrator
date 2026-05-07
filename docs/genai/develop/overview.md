---
title: Overview
---

# Develop AI applications

WSO2 Integrator has first-class support for building generative AI integrations. LLM calls, retrieval-augmented generation (RAG), agents, and the Model Context Protocol (MCP) are native capabilities — you build AI integrations the same way you build any other integration.

You create them in two places: the **Artifacts** panel for top-level AI services, and the **Add Node** side panel for AI blocks inside an integration.

## AI building blocks

Each block addresses a different need.

| Block | Use it when you want to | Reference |
|---|---|---|
| **Direct LLM call** | Send a prompt to an LLM and bind the response to a typed variable inside an integration. | [Direct LLM calls](/docs/genai/develop/direct-llm/overview) |
| **RAG** | Ground LLM responses in your own documents. Load data, chunk and embed it, store it in a vector store, and retrieve relevant context at query time. | [RAG](/docs/genai/develop/rag/overview) |
| **AI agent** | Drive multi-turn workflows where an LLM plans the next step, calls tools and external systems, and uses memory to complete a goal. | [AI agents](/docs/genai/develop/agents/overview) |
| **MCP** | Expose your project's functions as MCP tools for any MCP client, or use external MCP tools with your agent. | [MCP integration](/docs/genai/develop/mcp/overview) |

At a glance:

- **Direct LLM** is a model call — a one-off typed response to a prompt, or chat with history.
- **RAG** grounds responses in your data.
- **Agent** adds reasoning and tools.
- **MCP** is the protocol for sharing tools across systems.

[Natural functions](/docs/genai/develop/natural-functions/overview) (experimental) package a direct LLM call as a typed function so you can reuse the same prompt across the codebase.

## The Artifacts panel

**AI Chat Agent** and **MCP Service** are top-level artifacts rather than nodes inside an integration. Create them from the **Artifacts** panel. Open it from the integration project view, then choose from the **AI Integration** group.

![The Artifacts panel with sections for Automation, AI Integration (AI Chat Agent and MCP Service), Integration as API (HTTP Service, GraphQL Service, TCP Service), Event Integration (Kafka, RabbitMQ, MQTT, Azure Service Bus, Salesforce, Twilio, GitHub, Solace, CDC for Microsoft SQL Server, CDC for PostgreSQL), and File Integration.](/img/genai/develop/shared/07-artifacts-page-full.png)

| AI Integration artifact | What you get |
|---|---|
| **AI Chat Agent** | A complete chat-agent service, listener, agent node, and return, opened in the visual designer ready for instructions, tools, memory, and a model provider. |
| **MCP Service** | An MCP server artifact that exposes tools to any MCP client. Add tools to it the same way you add resources to an HTTP service. |

## The AI side panel

To add a direct LLM call, RAG, or an agent to an integration, open the integration and select **+** between two nodes. The **Add Node** side panel opens. The **AI** category has three sub-categories that map to the building blocks.

![The Add Node panel with categories: Statement, Control, AI (with three sub-categories, Direct LLM, RAG, Agent), Error Handling, Concurrency, Logging.](/img/genai/develop/shared/04-add-node-panel-full.png)

| AI sub-category | What it gives you |
|---|---|
| **Direct LLM** | The **Model Provider** node. Model providers are abstractions that simplify LLM calls — pick OpenAI, Anthropic, Azure, WSO2 Default, and so on, and call `Generate` or `Chat` with a consistent API. |
| **RAG** | The **Knowledge Base**, **Data Loader**, and **Augment Query** nodes — the three pieces of a RAG integration. |
| **Agent** | The **Agent** node. Adds a complete agent block to the integration. Alternatively, for a chat agent, use the **AI Chat Agent** artifact (**Add Artifact** > **AI Integration**). |

Choose a node, complete the wizard that opens, and WSO2 Integrator generates the matching Ballerina source. Switch to pro-code at any time to read or edit the generated code.

## Next steps

- [Direct LLM calls](/docs/genai/develop/direct-llm/overview): Call a model from inside an integration — a one-off typed response to a prompt, or chat with history.
- [RAG](/docs/genai/develop/rag/overview): Ground LLM responses in your own data.
- [AI agents](/docs/genai/develop/agents/overview): Build agents that reason, call tools, and use memory.
- [MCP integration](/docs/genai/develop/mcp/overview): Expose your tools as MCP or use external MCP servers from an agent.
- [Natural functions](/docs/genai/develop/natural-functions/overview) (experimental): Package a prompt as a reusable typed function.
