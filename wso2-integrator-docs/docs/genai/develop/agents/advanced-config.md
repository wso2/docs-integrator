---
sidebar_position: 4
title: Advanced AI Agent Configurations
description: Configure advanced agent settings including temperature, tool choice, parallel tool calling, and multi-agent orchestration.
---

# Advanced AI Agent Configurations

Once you have a working agent with tools and memory, you can tune its behavior with advanced settings. This page covers model parameters, tool execution control, multi-agent orchestration, and agent handoff patterns.

These configurations let you optimize agents for specific use cases, from deterministic data processing to creative content generation.

## Model Parameters

### Temperature and Sampling

Control how deterministic or creative the agent's responses are.

```ballerina
import ballerinax/ai.agent;

// Deterministic agent for data analysis
final agent:ChatAgent preciseAgent = check new (
    model: llmClient,
    systemPrompt: "You are a data analyst. Be precise and factual.",
    modelParams: {
        temperature: 0.1,
        topP: 0.5
    }
);

// Creative agent for marketing copy
final agent:ChatAgent creativeAgent = check new (
    model: llmClient,
    systemPrompt: "You are a creative marketing copywriter.",
    modelParams: {
        temperature: 0.8,
        topP: 0.95
    }
);
```

| Parameter | Range | Effect |
|-----------|-------|--------|
| `temperature` | 0.0--1.0 | Lower values produce more focused, deterministic output |
| `topP` | 0.0--1.0 | Limits token selection to the most probable tokens |

For most integration use cases, a temperature between 0.1 and 0.3 produces reliable, consistent results.

### Maximum Iterations

Limit the number of reason-act-observe loops the agent can perform per request. This prevents runaway chains where the agent keeps calling tools without converging on an answer.

```ballerina
final agent:ChatAgent boundedAgent = check new (
    model: llmClient,
    systemPrompt: "You are a research assistant.",
    tools: [searchDatabase, fetchDocument, analyzeData],
    maxIterations: 5
);
```

If the agent reaches the iteration limit, it returns the best answer it has assembled so far along with a note that it could not complete all steps.

### Timeout Configuration

Set a maximum time for agent responses to prevent long-running requests from blocking your service.

```ballerina
final agent:ChatAgent timedAgent = check new (
    model: llmClient,
    systemPrompt: "You are a quick-response assistant.",
    tools: [quickLookup],
    timeout: 30   // Maximum 30 seconds per request
);
```

## Tool Choice

Control which tools the agent can use for a given request.

### Auto Tool Choice

The default behavior. The agent decides whether to call a tool or respond directly based on the user's message.

```ballerina
final agent:ChatAgent autoAgent = check new (
    model: llmClient,
    systemPrompt: "You are a support assistant.",
    tools: [getCustomer, searchOrders],
    toolChoice: agent:AUTO
);
```

### Forced Tool Use

Force the agent to call a specific tool before responding. This is useful when you know the agent should always look up data before answering.

```ballerina
// Force the agent to always look up the customer first
string response = check myAgent.chat(
    "What's the status of my order?",
    sessionId,
    toolChoice = {name: "getCustomer"}
);
```

### No Tool Use

Prevent the agent from calling any tools for a specific request. The agent responds using only its knowledge and conversation history.

```ballerina
string response = check myAgent.chat(
    "Summarize our conversation so far",
    sessionId,
    toolChoice = agent:NONE
);
```

## Parallel Tool Calling

Allow the agent to call multiple tools simultaneously when they are independent. This reduces latency when the agent needs data from several sources.

```ballerina
final agent:ChatAgent parallelAgent = check new (
    model: llmClient,
    systemPrompt: "You are a support assistant with access to multiple systems.",
    tools: [getCustomer, getOrderHistory, getTicketHistory],
    parallelToolCalls: true
);
```

When the user asks a question that requires data from multiple tools, the agent issues all tool calls at once rather than sequentially. For example, if the user asks about a customer's recent orders and open tickets, the agent calls `getOrderHistory` and `getTicketHistory` in parallel.

## Multi-Agent Orchestration

### Router Agent Pattern

Use a top-level agent to route requests to specialized sub-agents based on the user's intent.

```ballerina
final agent:ChatAgent billingAgent = check new (
    model: llmClient,
    systemPrompt: "You handle billing, invoices, and payment questions.",
    tools: [getInvoice, processRefund, getPaymentHistory]
);

final agent:ChatAgent technicalAgent = check new (
    model: llmClient,
    systemPrompt: "You handle API issues, integration errors, and configuration.",
    tools: [checkApiStatus, getErrorLogs, getConfiguration]
);

@agent:Tool {
    name: "routeToBilling",
    description: "Route the conversation to the billing specialist for payment, invoice, or refund questions."
}
isolated function routeToBilling(string message, string sessionId) returns string|error {
    return billingAgent.chat(message, sessionId);
}

@agent:Tool {
    name: "routeToTechnical",
    description: "Route the conversation to the technical specialist for API, integration, or configuration issues."
}
isolated function routeToTechnical(string message, string sessionId) returns string|error {
    return technicalAgent.chat(message, sessionId);
}

final agent:ChatAgent routerAgent = check new (
    model: llmClient,
    systemPrompt: string `You are a customer support router. Determine the nature of the
        customer's question and route it to the appropriate specialist.
        Use routeToBilling for payment and invoice questions.
        Use routeToTechnical for API and integration issues.`,
    tools: [routeToBilling, routeToTechnical]
);
```

### Agent Handoff

Transfer a conversation from one agent to another while preserving context.

```ballerina
function handoff(
    agent:ChatAgent sourceAgent,
    agent:ChatAgent targetAgent,
    string sessionId,
    string reason
) returns string|error {
    agent:ChatMessage[] history = check sourceAgent.getHistory(sessionId);

    string summary = check ai:natural<string>(
        "Summarize this conversation history concisely for a handoff", history.toString()
    );

    check targetAgent.addSystemMessage(
        sessionId,
        string `This conversation has been transferred. Reason: ${reason}
            Previous conversation summary: ${summary}`
    );

    return check targetAgent.chat(
        "Please continue assisting the customer from where the previous agent left off.",
        sessionId
    );
}
```

### Pipeline Agent Pattern

Chain agents sequentially where each agent's output feeds into the next.

```ballerina
function processDocument(string document) returns ProcessedResult|error {
    // Agent 1: Extract key information
    string extracted = check extractionAgent.run(document);

    // Agent 2: Classify and categorize
    string classified = check classificationAgent.run(extracted);

    // Agent 3: Generate final output
    return check outputAgent.run(classified);
}
```

## Exposing Agents as APIs

Expose an agent as a REST API with session management.

```ballerina
import ballerina/http;
import ballerina/uuid;

service /api/v1 on new http:Listener(8090) {

    resource function post sessions() returns SessionResponse {
        string sessionId = uuid:createType4AsString();
        return {sessionId};
    }

    resource function post sessions/[string sessionId]/messages(
        @http:Payload MessageRequest request
    ) returns MessageResponse|error {
        string response = check routerAgent.chat(request.message, sessionId);
        return {response};
    }

    resource function delete sessions/[string sessionId]() returns http:Ok {
        routerAgent.clearMemory(sessionId);
        return http:OK;
    }
}

type SessionResponse record {|string sessionId;|};
type MessageRequest record {|string message;|};
type MessageResponse record {|string response;|};
```

## What's Next

- [Creating an AI Agent](/docs/genai/develop/agents/creating-agent) -- Build your first agent
- [Adding Tools](/docs/genai/develop/agents/adding-tools) -- Define and register tools
- [Adding Memory](/docs/genai/develop/agents/adding-memory) -- Configure conversation persistence
- [AI Agent Observability](/docs/genai/develop/agents/agent-observability) -- Monitor agent behavior in production
- [AI Agent Evaluations](/docs/genai/develop/agents/agent-evaluations) -- Test and evaluate agent quality
