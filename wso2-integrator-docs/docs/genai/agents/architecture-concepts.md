---
sidebar_position: 1
title: Agent Architecture & Concepts
description: Understand the core architecture, reasoning loop, and design patterns of AI agents in WSO2 Integrator.
---

# Agent Architecture & Concepts

AI agents in WSO2 Integrator are autonomous programs that use large language models for reasoning, make decisions about which tools to invoke, and carry out multi-step tasks. This page covers the foundational concepts you need before building agents.

Understanding the agent architecture helps you design robust, predictable integrations that leverage LLM intelligence without sacrificing reliability.

## Core Concepts

### What Is an Agent?

An agent is an integration component that combines an LLM with tools, memory, and a reasoning loop. Unlike a simple LLM API call, an agent can:

- **Reason** about what steps to take based on user input and context
- **Act** by calling tools (functions, APIs, databases) to gather data or perform actions
- **Observe** the results of its actions and decide what to do next
- **Remember** previous interactions to maintain conversational context

### The Agent Loop

Every agent in WSO2 Integrator follows the **Reason-Act-Observe** loop:

```
User Message
    │
    ▼
┌─────────────┐
│   Reason    │ ← LLM analyzes the message + context + tool descriptions
│             │   and decides what to do
└──────┬──────┘
       │
       ▼
┌─────────────┐
│    Act      │ ← Agent calls one or more tools based on the LLM's decision
│             │   (may skip if no tool is needed)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Observe    │ ← Tool results are fed back to the LLM
│             │   LLM decides: respond or loop again?
└──────┬──────┘
       │
       ▼
  Final Response
```

This loop can repeat multiple times per request. For example, an agent might look up a customer record (first tool call), then check their order history (second tool call), and finally compose a response using both pieces of information.

### Agent Components

```ballerina
import ballerinax/ai.agent;

// The four components of an agent:
final agent:ChatAgent myAgent = check new (
    // 1. Model — The LLM that powers reasoning
    model: check new openai:Client({auth: {token: apiKey}}),

    // 2. System Prompt — Instructions that define agent behavior
    systemPrompt: "You are a helpful assistant that...",

    // 3. Tools — Functions the agent can call
    tools: [lookupCustomer, createOrder, sendEmail],

    // 4. Memory — How the agent stores conversation history
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

A conversational agent that maintains a session with a user across multiple messages. Best for interactive support, data exploration, and guided workflows.

```ballerina
final agent:ChatAgent chatAgent = check new (
    model: llmClient,
    systemPrompt: "You are a customer support assistant.",
    tools: [lookupOrder, searchProducts],
    memory: new agent:MessageWindowChatMemory(maxMessages: 30)
);

// Each call maintains session context
string response = check chatAgent.chat("What's my order status?", "session-123");
```

### Task Agent

A single-turn agent that completes a specific task and returns a structured result. Best for data extraction, classification, and automated processing.

```ballerina
final agent:TaskAgent classifierAgent = check new (
    model: llmClient,
    systemPrompt: string `Classify the incoming support ticket into one of these categories:
        billing, technical, shipping, general. Return only the category name.`,
    outputType: TicketClassification
);

TicketClassification result = check classifierAgent.run("I can't connect to the API");
// result.category == "technical"
```

## Tool Architecture

Tools are the bridge between the agent's LLM reasoning and your integration logic. The LLM sees the tool's name, description, and parameter schema, then decides whether and how to call it.

```ballerina
// Tool definition — the LLM sees the annotation metadata
@agent:Tool {
    name: "getWeather",
    description: "Get the current weather for a city. Returns temperature, conditions, and humidity."
}
isolated function getWeather(
    @agent:Param {description: "City name, e.g., 'San Francisco'"} string city
) returns WeatherData|error {
    // Integration logic — this can call any API, database, or service
    return check weatherApi->get(city);
}
```

The LLM **never** executes code directly. It produces a structured tool call request, and the agent runtime executes the actual function safely within your integration environment.

## Memory Architecture

Memory determines how much conversation context the agent retains between turns.

| Memory Type | Description | Use Case |
|-------------|-------------|----------|
| `MessageWindowChatMemory` | Keeps the last N messages | General chat, most common |
| `TokenWindowChatMemory` | Keeps messages within a token budget | Cost-sensitive applications |
| `SummaryChatMemory` | Summarizes older messages, keeps recent ones | Long conversations |
| None | Stateless, no history retained | Single-turn tasks |

```ballerina
// Fixed window: keep last 20 messages
new agent:MessageWindowChatMemory(maxMessages: 20)

// Token budget: stay within 4000 tokens of context
new agent:TokenWindowChatMemory(maxTokens: 4000)

// Summary: summarize after 10 messages, keep last 5 verbatim
new agent:SummaryChatMemory(summarizeAfter: 10, keepRecent: 5)
```

## Design Patterns

### Sequential Tool Calls

The agent calls tools one at a time, using each result to inform the next decision.

```
User: "Transfer $50 from my checking to savings"
  → Agent calls: getAccountBalance("checking") → $1,200
  → Agent calls: transferFunds("checking", "savings", 50) → success
  → Agent responds: "Done! Transferred $50. Your checking balance is now $1,150."
```

### Parallel Tool Calls

When the LLM determines that multiple tool calls are independent, it can request them in parallel.

```
User: "Compare the weather in NYC and London"
  → Agent calls in parallel: getWeather("NYC"), getWeather("London")
  → Agent responds with comparison
```

### Fallback and Retry

Design tools to return informative errors so the agent can reason about what went wrong.

```ballerina
@agent:Tool {
    name: "getCustomer",
    description: "Look up a customer. Returns an error message if not found."
}
isolated function getCustomer(string id) returns json|error {
    Customer? customer = check db->findCustomer(id);
    if customer is () {
        return {
            "error": "Customer not found",
            "suggestion": "Try searching by email instead using the searchCustomerByEmail tool"
        };
    }
    return customer.toJson();
}
```

## Execution Model

Agents in WSO2 Integrator run within the Ballerina runtime, which provides:

- **Concurrency** — Multiple agent sessions run concurrently using Ballerina strands
- **Isolation** — Tool functions can be marked `isolated` for safe concurrent execution
- **Error handling** — Ballerina's typed error model propagates through the agent loop
- **Observability** — Agent actions emit traces and metrics through the Ballerina observability framework

## What's Next

- [Chat Agents](chat-agents.md) — Build interactive conversational agents
- [Tool Binding](tool-binding.md) — Advanced tool patterns and function calling
- [Memory Configuration](memory-configuration.md) — Customize conversation history management
- [Multi-Agent Orchestration](multi-agent-orchestration.md) — Coordinate multiple agents
