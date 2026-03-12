---
sidebar_position: 6
title: Multi-Agent Orchestration
description: Coordinate multiple AI agents for complex workflows using delegation, routing, and pipeline patterns.
---

# Multi-Agent Orchestration

Multi-agent orchestration lets you decompose complex problems into specialized agents that collaborate. Instead of building one monolithic agent that handles everything, you create focused agents and coordinate them through delegation, routing, or pipeline patterns.

This approach improves reliability, makes debugging easier, and lets you assign different models or configurations to different subtasks.

## Why Multiple Agents?

A single agent with dozens of tools becomes unpredictable. Multi-agent architectures solve this by:

- **Specialization** — Each agent has a focused role with fewer, relevant tools
- **Model optimization** — Use expensive models for complex reasoning, cheaper models for simple tasks
- **Isolation** — Errors in one agent don't cascade to others
- **Maintainability** — Update or replace individual agents without affecting the system

## Orchestration Patterns

### Router Pattern

A router agent analyzes the incoming request and delegates to the appropriate specialist agent.

```ballerina
import ballerinax/ai.agent;

// Specialist agents
final agent:ChatAgent billingAgent = check new (
    model: llmClient,
    systemPrompt: "You handle billing inquiries: invoices, payments, refunds, subscription changes.",
    tools: [getInvoice, processRefund, updateSubscription]
);

final agent:ChatAgent technicalAgent = check new (
    model: llmClient,
    systemPrompt: "You handle technical support: API issues, integration errors, configuration help.",
    tools: [checkApiStatus, getErrorLogs, getDocumentation]
);

final agent:ChatAgent generalAgent = check new (
    model: llmClient,
    systemPrompt: "You handle general inquiries: account info, product questions, feedback.",
    tools: [getAccountInfo, searchProducts, submitFeedback]
);

// Router agent that delegates to specialists
final agent:TaskAgent routerAgent = check new (
    model: llmClient,
    systemPrompt: string `Classify the incoming customer message into one of these categories:
        - "billing" for payment, invoice, refund, or subscription questions
        - "technical" for API, integration, error, or configuration questions
        - "general" for everything else
        Return only the category name.`,
    outputType: RouteDecision
);

type RouteDecision record {|
    string category;
|};

function routeAndRespond(string message, string sessionId) returns string|error {
    // Step 1: Route the message
    RouteDecision route = check routerAgent.run(message);

    // Step 2: Delegate to the specialist
    match route.category {
        "billing" => {
            return check billingAgent.chat(message, sessionId);
        }
        "technical" => {
            return check technicalAgent.chat(message, sessionId);
        }
        _ => {
            return check generalAgent.chat(message, sessionId);
        }
    }
}
```

### Pipeline Pattern

Agents process a request sequentially, each building on the previous agent's output.

```ballerina
// Pipeline: Research → Analyze → Respond
final agent:TaskAgent researchAgent = check new (
    model: llmClient,
    systemPrompt: "Gather all relevant data about the customer's question using available tools.",
    tools: [searchDatabase, fetchDocuments, getCustomerHistory],
    outputType: ResearchResult
);

final agent:TaskAgent analysisAgent = check new (
    model: llmClient,
    systemPrompt: string `Analyze the research data and identify:
        1. The root cause of the issue
        2. Recommended solutions (ranked by likelihood of success)
        3. Any risks or caveats`,
    outputType: AnalysisResult
);

final agent:ChatAgent responseAgent = check new (
    model: llmClient,
    systemPrompt: string `You are a customer-facing support agent.
        Given the analysis, compose a helpful, empathetic response.
        Use simple language and clear action steps.`
);

type ResearchResult record {|
    json[] relevantData;
    string[] sourcesConsulted;
|};

type AnalysisResult record {|
    string rootCause;
    string[] solutions;
    string[] caveats;
|};

function handleSupportRequest(string message, string sessionId) returns string|error {
    // Stage 1: Research
    ResearchResult research = check researchAgent.run(message);

    // Stage 2: Analyze
    string analysisInput = string `Customer question: ${message}
        Research data: ${research.toJsonString()}`;
    AnalysisResult analysis = check analysisAgent.run(analysisInput);

    // Stage 3: Generate customer-facing response
    string responseInput = string `Based on this analysis, respond to the customer:
        Root cause: ${analysis.rootCause}
        Solutions: ${analysis.solutions.toString()}
        Caveats: ${analysis.caveats.toString()}

        Original question: ${message}`;
    return check responseAgent.chat(responseInput, sessionId);
}
```

### Supervisor Pattern

A supervisor agent coordinates multiple workers and synthesizes their results.

```ballerina
final agent:ChatAgent supervisorAgent = check new (
    model: check new openai:Client({auth: {token: apiKey}, model: "gpt-4o"}),
    systemPrompt: string `You are a supervisor coordinating a team of specialist agents.
        When you receive a complex request:
        1. Break it into subtasks
        2. Delegate each subtask to the appropriate specialist using tools
        3. Synthesize the results into a coherent response`,
    tools: [delegateToBilling, delegateToTechnical, delegateToResearch]
);

// Delegation tools — the supervisor calls other agents as tools
@agent:Tool {
    name: "delegateToBilling",
    description: "Send a billing-related subtask to the billing specialist. Provide a clear, specific question."
}
isolated function delegateToBilling(string question) returns string|error {
    return check billingAgent.chat(question, "supervisor-session");
}

@agent:Tool {
    name: "delegateToTechnical",
    description: "Send a technical subtask to the technical specialist. Provide specific error details or configuration questions."
}
isolated function delegateToTechnical(string question) returns string|error {
    return check technicalAgent.chat(question, "supervisor-session");
}

@agent:Tool {
    name: "delegateToResearch",
    description: "Send a research task to find relevant documentation or historical data."
}
isolated function delegateToResearch(string query) returns string|error {
    return check researchAgent.run(query).toString();
}
```

### Parallel Fan-Out Pattern

Send the same request to multiple agents simultaneously and combine the results.

```ballerina
import ballerina/lang.runtime;

function parallelAnalysis(string data) returns CombinedAnalysis|error {
    // Fan out to multiple agents in parallel
    future<string|error> sentimentFuture = start sentimentAgent.run(data);
    future<string|error> entityFuture = start entityAgent.run(data);
    future<string|error> summaryFuture = start summaryAgent.run(data);

    // Collect results
    string sentiment = check wait sentimentFuture;
    string entities = check wait entityFuture;
    string summary = check wait summaryFuture;

    return {
        sentiment,
        entities,
        summary
    };
}

type CombinedAnalysis record {|
    string sentiment;
    string entities;
    string summary;
|};
```

## Agent Communication

### Shared Context

Pass context between agents through structured handoff messages.

```ballerina
type AgentHandoff record {|
    string fromAgent;
    string toAgent;
    string reason;
    json context;
    agent:ChatMessage[] relevantHistory;
|};

function escalateWithContext(string sessionId, string targetAgent) returns error? {
    // Package the current conversation state
    AgentHandoff handoff = {
        fromAgent: "general-support",
        toAgent: targetAgent,
        reason: "Customer issue requires specialist attention",
        context: check gatherContext(sessionId),
        relevantHistory: check generalAgent.getHistory(sessionId)
    };

    // Seed the specialist agent with handoff context
    string handoffMessage = string `[Agent Handoff]
        Transferred from: ${handoff.fromAgent}
        Reason: ${handoff.reason}
        Context: ${handoff.context.toString()}
        Please continue assisting the customer.`;

    check specialistAgent.addSystemMessage(sessionId, handoffMessage);
}
```

## Choosing the Right Pattern

| Pattern | Use Case | Complexity |
|---------|----------|------------|
| **Router** | Categorize and delegate to specialists | Low |
| **Pipeline** | Sequential processing stages | Medium |
| **Supervisor** | Complex requests needing multiple specialists | Medium-High |
| **Parallel Fan-Out** | Independent analyses of the same data | Medium |

## What's Next

- [Natural Functions](natural-functions.md) — LLM-powered typed function calls
- [Agent Tracing](/docs/genai/agent-observability/agent-tracing) — Trace multi-agent interactions
- [Debugging Agent Behavior](/docs/genai/agent-observability/debugging-agent-behavior) — Debug orchestration issues
- [Multi-Agent Workflow Tutorial](/docs/genai/tutorials/multi-agent-workflow) — End-to-end multi-agent example
