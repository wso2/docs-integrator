---
sidebar_position: 4
title: What are Tools?
description: Understand tools -- the bridge between AI agent reasoning and integration logic.
---

# What are Tools?

Tools are Ballerina functions that an AI agent can call during its reasoning loop. They are the bridge between the LLM's reasoning and your integration logic -- APIs, databases, services, and business rules.

The LLM sees the tool's name, description, and parameter schema, then decides whether and how to call it. The LLM **never** executes code directly; it produces a structured tool call request, and the agent runtime executes the actual function safely.

## How Tools Work

```ballerina
import ballerinax/ai.agent;

@agent:Tool {
    name: "getWeather",
    description: "Get the current weather for a city. Returns temperature, conditions, and humidity."
}
isolated function getWeather(
    @agent:Param {description: "City name, e.g., 'San Francisco'"} string city
) returns json|error {
    return check weatherApi->get(city);
}
```

When a user asks "What's the weather in Tokyo?", the agent's LLM reads the tool description, decides to call `getWeather` with `city: "Tokyo"`, and the runtime executes the function and returns the result to the LLM for response generation.

## Tool Categories

| Category | Purpose | Example |
|----------|---------|---------|
| **Data retrieval** | Read information from external systems | Look up customer records, search products |
| **Action tools** | Perform write operations or trigger workflows | Create tickets, send notifications |
| **Connector tools** | Wrap existing WSO2 Integrator connectors | Query Salesforce, interact with databases |

## Tool Design Principles

1. **Clear descriptions** -- The description is the most important factor in whether the LLM uses the tool correctly
2. **Typed parameters** -- Use `@agent:Param` annotations to describe each parameter
3. **Informative errors** -- Return descriptive error messages so the LLM can reason about failures
4. **Limited output** -- Trim large responses to prevent exceeding context window limits

## Registering Tools with an Agent

```ballerina
final agent:ChatAgent myAgent = check new (
    model: llmClient,
    systemPrompt: "You are a support assistant.",
    tools: [getCustomerDetails, searchOrders, createTicket]
);
```

## What's Next

- [What is AI Agent Memory?](what-is-agent-memory.md) -- How agents maintain context
- [Adding Tools to an Agent](/docs/genai/develop/agents/adding-tools) -- Detailed tool patterns
- [What is MCP?](what-is-mcp.md) -- Expose tools to external AI assistants
