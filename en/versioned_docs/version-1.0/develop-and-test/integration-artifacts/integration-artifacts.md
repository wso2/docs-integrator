---
sidebar_position: 1
title: Build Agentic Integrations
description: What you can add to an agentic integration in WSO2 Agent Builder, agents, entry points, MCP servers, knowledge, and the building blocks they share, and where to add each one.
keywords: [wso2 agent builder, agentic integration, ai agent, entry point, mcp, rag, knowledge base, model provider]
slug: /develop-and-test/integration-artifacts
hide_table_of_contents: true
wide_layout: true
---

# Build Agentic Integrations

An agentic integration is where you build your agents. It holds the agents themselves, the entry points that let users and other systems reach them, and the model providers, connections, and functions they use. A project can hold several agentic integrations.

Open an agentic integration to see its overview. The overview diagram shows each entry point and the agent it calls, and has **Add Agent** and **Add MCP** buttons. The sidebar lists everything in the agentic integration under **Agents**, **Entry Points**, **Model Providers**, **Connections**, **Types**, **Functions**, and **Configurations**.

## What you can add

| Add | What it does | Where to add it | Learn more |
|---|---|---|---|
| **Agent** | An LLM-driven agent with a role, instructions, a model, tools, and memory. | Overview > **Add Agent** | [Create an agent](ai-integrations/agents/create-an-agent.md) |
| **Trigger** | Lets users and systems reach an agent: chat channels such as **Agent Chat**, **Telegram**, or **WhatsApp Business**, HTTP API endpoints, event sources such as **Kafka** or **Salesforce**, and file sources such as **FTP / SFTP**. Each trigger appears under **Entry Points** in the sidebar. | Agent canvas > **Add Trigger** | [Expose the agent as a chat endpoint](ai-integrations/agents/create-an-agent.md#expose-the-agent-as-a-chat-endpoint) |
| **Tools** | Functions, connector actions, other agents, knowledge bases, and MCP servers the agent can call. | Agent canvas > **Add Tool** | [Give tools to an agent](ai-integrations/agents/tools.md) |
| **MCP server** | Exposes your tools to AI assistants such as Claude Desktop or GitHub Copilot over the Model Context Protocol. | Overview > **Add MCP** | [MCP integration](ai-integrations/mcp/mcp.md) |
| **Knowledge** | Grounds agent answers in your own documents through retrieval-augmented generation (RAG). | Agent canvas > **Add Tool** > **Use Knowledge Base** | [Knowledge Bases](ai-integrations/knowledge-bases/knowledge-bases.md) |
| **Building blocks** | Model providers, embedding providers, vector stores, knowledge bases, chunkers, and data loaders shared by the features above. | Created from the agent, tool, and knowledge base forms | [AI building blocks](ai-integrations/ai-building-blocks/ai-building-blocks.md) |

## What's next

- [AI Integrations](ai-integrations/ai-integrations.md): agents, knowledge bases, MCP, and the building blocks behind them.
- [Create an agent](ai-integrations/agents/create-an-agent.md): add your first agent and chat with it.
