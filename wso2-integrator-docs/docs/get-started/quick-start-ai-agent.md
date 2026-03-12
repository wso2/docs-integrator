---
sidebar_position: 11
title: "Quick Start: Build an AI Agent"
description: Create an intelligent AI agent powered by LLMs with tool calling.
---

# Quick Start: Build an AI Agent

**Time:** Under 15 minutes | **What you'll build:** An AI agent that connects to an LLM, uses tools, and responds to queries through a GraphQL endpoint.

## Prerequisites

- [WSO2 Integrator extension installed](install.md)
- An OpenAI API key

## Architecture

```
Client                     GraphQL Service            LLM (OpenAI)
  │                        localhost:8080                  │
  │  mutation Task(query)       │                         │
  │────────────────────────────►│   prompt + tools        │
  │                             │────────────────────────►│
  │                             │◄────────────────────────│
  │◄────────────────────────────│   response              │
  │  { data: { task: "..." } }  │                         │
```

## Step 1: Create the Project

1. Open the WSO2 Integrator sidebar in VS Code.
2. Click **Create New Integration**.
3. Enter the integration name (e.g., `AIAgent`).

## Step 2: Add a GraphQL Service

1. Add a **GraphQL Service** artifact.
2. Add a mutation named `task` that accepts a `query: string` parameter.

## Step 3: Configure the Inline Agent

1. Inside the mutation, implement an **Inline Agent**.
2. Configure the model provider (WSO2 default or OpenAI).
3. Set up agent memory and tools.

In code:

```ballerina
import ballerina/graphql;
import ballerinax/ai.agent;
import ballerinax/ai.provider.openai;

configurable string openaiKey = ?;

service /graphql on new graphql:Listener(8080) {
    remote function task(string query) returns string|error {
        openai:Client model = check new ({
            auth: {token: openaiKey},
            model: "gpt-4o"
        });

        agent:InlineAgent inlineAgent = check new (
            model: model,
            systemPrompt: "You are a helpful assistant.",
            tools: []
        );

        return check inlineAgent.run(query);
    }
}
```

## Step 4: Configure the API Key

Create a `Config.toml` file:

```toml
openaiKey = "<your-openai-api-key>"
```

## Step 5: Run and Test

1. Click **Run** in the toolbar.
2. Test with curl:

```bash
curl -X POST http://localhost:8080/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "mutation Task { task(query: \"What is WSO2 Integrator?\") }"}'
```

## What's Next

- [GenAI Overview](/docs/genai) -- Full guide to AI capabilities
- [Chat Agents](/docs/genai/agents/chat-agents) -- Build interactive chat agents
- [MCP Servers](/docs/genai/mcp/exposing-mcp-servers) -- Expose tools to AI assistants
- [RAG Applications](/docs/genai/rag/architecture-overview) -- Add knowledge bases to agents
