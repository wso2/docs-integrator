---
sidebar_position: 11
title: "Quick Start: Build an AI Agent"
description: Create an intelligent AI agent powered by LLMs with tool calling.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Quick start: Build an AI agent

**Time:** Under 15 minutes | **What you'll build:** An AI agent that connects to an LLM, uses tools, and responds to queries through a GraphQL endpoint.

## Prerequisites

- [WSO2 Integrator installed](install.md)
- An OpenAI API key

## Architecture

<ThemedImage
  alt="Architecture Diagram"
  sources={{
    light: useBaseUrl('/img/get-started/quick-start-ai-agent/ai-agent-light.svg'),
    dark: useBaseUrl('/img/get-started/quick-start-ai-agent/ai-agent-dark.svg'),
  }}
/>

## Step 1: Create the project

1. Open WSO2 Integrator.
2. Select **Create New Integration**.
3. Enter the integration name (for example, `AIAgent`).

## Step 2: Add a GraphQL service

1. Add a **GraphQL Service** artifact.
2. Add a mutation named `task` that accepts a `query: string` parameter.

## Step 3: Configure the inline agent

1. Inside the mutation, implement an **Inline Agent**.
2. Configure the model provider (WSO2 default or OpenAI).
3. Set up agent memory and tools.

<Tabs>
<TabItem value="code" label="Source View" default>

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

</TabItem>
<TabItem value="ui" label="Design View">

<ThemedImage
  alt="Design View"
  sources={{
    light: useBaseUrl('/img/get-started/quick-start-ai-agent/design-view-light.png'),
    dark: useBaseUrl('/img/get-started/quick-start-ai-agent/design-view-dark.png'),
  }}
/>

</TabItem>
</Tabs>

## Step 4: Configure the API key

Create a `Config.toml` file:

```toml
openaiKey = "<your-openai-api-key>"
```

## Step 5: Run and test

1. Select **Run** in the toolbar.
2. Test with curl:

```bash
curl -X POST http://localhost:8080/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "mutation Task { task(query: \"What is WSO2 Integrator?\") }"}'
```

## What's next

- [GenAI overview](/docs/genai) -- Full guide to AI capabilities
- [Chat agents](/docs/genai/agents/chat-agents) -- Build interactive chat agents
- [MCP servers](/docs/genai/mcp/exposing-mcp-servers) -- Expose tools to AI assistants
- [RAG applications](/docs/genai/rag/architecture-overview) -- Add knowledge bases to agents
