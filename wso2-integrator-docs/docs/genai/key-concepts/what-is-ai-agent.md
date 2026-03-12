---
sidebar_position: 3
title: What is an AI Agent?
description: Understand AI agents -- autonomous components that combine LLMs with tools, memory, and a reasoning loop.
---

# What is an AI Agent?

An AI agent is an integration component that combines an LLM with tools, memory, and a reasoning loop. Unlike a simple LLM API call, an agent can reason about what steps to take, call tools to gather data or perform actions, observe the results, and decide what to do next.

## The Agent Loop

Every agent in WSO2 Integrator follows the **Reason-Act-Observe** loop:

```
User Message
    |
    v
+-----------+
|  Reason   | <-- LLM analyzes the message + context + tool descriptions
+-----------+
    |
    v
+-----------+
|   Act     | <-- Agent calls one or more tools based on the LLM's decision
+-----------+
    |
    v
+-----------+
|  Observe  | <-- Tool results are fed back to the LLM
+-----------+
    |
    v
Final Response (or loop again)
```

This loop can repeat multiple times per request. For example, an agent might look up a customer record (first tool call), then check their order history (second tool call), and finally compose a response using both pieces of information.

## Agent Components

An agent has four components:

```ballerina
import ballerinax/ai.agent;

final agent:ChatAgent myAgent = check new (
    // 1. Model -- The LLM that powers reasoning
    model: check new openai:Client({auth: {token: apiKey}}),

    // 2. System Prompt -- Instructions that define agent behavior
    systemPrompt: "You are a helpful assistant that...",

    // 3. Tools -- Functions the agent can call
    tools: [lookupCustomer, createOrder, sendEmail],

    // 4. Memory -- How the agent stores conversation history
    memory: new agent:MessageWindowChatMemory(maxMessages: 50)
);
```

| Component | Purpose | Required |
|-----------|---------|----------|
| **Model** | LLM connection for reasoning and response generation | Yes |
| **System Prompt** | Defines the agent's role, personality, and constraints | Yes |
| **Tools** | Functions the agent can call during reasoning | No (but recommended) |
| **Memory** | Stores conversation history for multi-turn interactions | No |

## Agent Types

### Chat Agent

Maintains a session with a user across multiple messages. Best for interactive support, data exploration, and guided workflows.

```ballerina
final agent:ChatAgent chatAgent = check new (
    model: llmClient,
    systemPrompt: "You are a customer support assistant.",
    tools: [lookupOrder, searchProducts],
    memory: new agent:MessageWindowChatMemory(maxMessages: 30)
);

string response = check chatAgent.chat("What's my order status?", "session-123");
```

### Task Agent

Completes a specific task and returns a structured result. Best for data extraction, classification, and automated processing.

```ballerina
final agent:TaskAgent classifierAgent = check new (
    model: llmClient,
    systemPrompt: "Classify the incoming support ticket.",
    outputType: TicketClassification
);

TicketClassification result = check classifierAgent.run("I can't connect to the API");
```

## What's Next

- [What are Tools?](what-are-tools.md) -- Understand how agents interact with external systems
- [What is AI Agent Memory?](what-is-agent-memory.md) -- How agents maintain conversation context
- [Creating an AI Agent](/docs/genai/develop/agents/creating-agent) -- Build your first agent
