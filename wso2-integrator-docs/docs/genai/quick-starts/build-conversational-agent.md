---
sidebar_position: 1
title: "Quick Start: Build a Conversational Agent"
description: Create a conversational AI agent with tool calling and memory in under 15 minutes.
---

# Build a Conversational Agent

**Time:** Under 15 minutes. **What you'll build:** A chat agent that connects to an LLM, remembers conversation context, and calls tools to look up information and perform actions.

This quick start walks you through the core agent pattern in WSO2 Integrator: define an agent, connect it to a model, give it tools, and expose it as an interactive chat endpoint.

## Prerequisites

- [WSO2 Integrator VS Code extension installed](/docs/get-started/install)
- An API key for an LLM provider (OpenAI, Anthropic, Google, or Azure)

## What You'll Build

A customer support agent that can:
- Answer questions about order status
- Look up product information using a tool
- Maintain conversation context across multiple turns

## Step 1: Create a New Project

Create a new integration project and add the AI dependencies.

```ballerina
// Ballerina.toml
[package]
org = "myorg"
name = "support_agent"
version = "0.1.0"

[build-options]
observabilityIncluded = true

[[dependency]]
org = "ballerinax"
name = "ai.agent"
version = "0.8.0"

[[dependency]]
org = "ballerinax"
name = "openai.chat"
version = "1.0.0"
```

## Step 2: Define Tools

Tools are Ballerina functions that the agent can call. Each tool has a description that helps the LLM decide when to use it.

```ballerina
import ballerinax/ai.agent;

// Define a tool that looks up order status
@agent:Tool {
    name: "getOrderStatus",
    description: "Look up the current status of a customer order by order ID"
}
isolated function getOrderStatus(string orderId) returns string|error {
    // In production, this would call your order management system
    map<string> orders = {
        "ORD-001": "Shipped — arrives March 15",
        "ORD-002": "Processing — estimated ship date March 12",
        "ORD-003": "Delivered on March 8"
    };
    string status = orders[orderId] ?: "Order not found";
    return status;
}

// Define a tool that searches the product catalog
@agent:Tool {
    name: "searchProducts",
    description: "Search the product catalog by keyword and return matching products"
}
isolated function searchProducts(string query) returns json|error {
    // In production, this would query your product database
    return [
        {"name": "Wireless Headphones", "price": 79.99, "inStock": true},
        {"name": "Bluetooth Speaker", "price": 49.99, "inStock": true}
    ];
}
```

## Step 3: Configure the Agent

Create the agent with a system prompt, model connection, and the tools you defined.

```ballerina
import ballerinax/ai.agent;
import ballerinax/openai.chat;

configurable string openAiApiKey = ?;

final agent:ChatAgent supportAgent = check new (
    model: check new chat:Client({auth: {token: openAiApiKey}}),
    systemPrompt: string `You are a helpful customer support assistant for an online store.
        You help customers check order status and find products.
        Always be polite and concise. If you don't know something, say so.`,
    tools: [getOrderStatus, searchProducts],
    memory: new agent:MessageWindowChatMemory(maxMessages: 20)
);
```

## Step 4: Expose as a Chat Endpoint

Create an HTTP service that accepts chat messages and returns agent responses.

```ballerina
import ballerina/http;

service /support on new http:Listener(8090) {

    resource function post chat(@http:Payload ChatRequest request) returns ChatResponse|error {
        string response = check supportAgent.chat(request.message, request.sessionId);
        return {message: response};
    }
}

type ChatRequest record {|
    string message;
    string sessionId;
|};

type ChatResponse record {|
    string message;
|};
```

## Step 5: Run and Test

1. Add your API key to `Config.toml`:

```toml
openAiApiKey = "sk-your-api-key-here"
```

2. Run the project:

```bash
bal run
```

3. Test with curl:

```bash
# First message
curl -X POST http://localhost:8090/support/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What is the status of order ORD-001?", "sessionId": "user-123"}'

# Follow-up message (agent remembers context)
curl -X POST http://localhost:8090/support/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "And what about ORD-002?", "sessionId": "user-123"}'
```

The agent will use the `getOrderStatus` tool to look up the order and respond with the status. On the follow-up, it remembers the conversation context and understands "And what about" refers to another order.

## How It Works

The agent follows a **reason-act-observe** loop:

1. **Receive** the user's message along with conversation history
2. **Reason** about what to do using the LLM
3. **Act** by calling tools if needed (e.g., `getOrderStatus`)
4. **Observe** the tool results
5. **Respond** with a natural language answer

The memory component keeps track of previous messages so the agent maintains context across turns.

## What's Next

- [Agent Architecture & Concepts](/docs/genai/agents/architecture-concepts) — Understand the full agent loop in depth
- [Tool Binding](/docs/genai/agents/tool-binding) — Advanced tool patterns and function calling
- [Memory Configuration](/docs/genai/agents/memory-configuration) — Customize how agents remember context
- [Build a RAG Application](build-rag-application.md) — Add knowledge retrieval to your agent
