---
sidebar_position: 3
title: Token & Cost Management
description: Track token usage, set spending limits, and optimize costs for LLM-powered integrations.
---

# Token & Cost Management

LLM API calls are priced per token. Without controls, a busy agent can accumulate significant costs quickly. This page covers how to track token usage, set spending limits, optimize costs, and alert on unexpected spending patterns.

Cost management is not just about budgets -- it also prevents runaway loops, abusive usage, and unexpected spikes from affecting your production systems.

## Tracking Token Usage

### Per-Request Usage

Every LLM call returns usage information that you can capture and log.

```ballerina
import ballerinax/ai.agent;
import ballerina/log;

function chatWithTracking(string message, string sessionId) returns string|error {
    agent:ChatResponse response = check myAgent.chatWithMetadata(message, sessionId);

    log:printInfo("Token usage",
        sessionId = sessionId,
        inputTokens = response.usage.inputTokens,
        outputTokens = response.usage.outputTokens,
        totalTokens = response.usage.totalTokens,
        model = response.usage.model
    );

    return response.message;
}
```

### Aggregated Usage Tracking

Track cumulative usage across sessions and time periods.

```ballerina
import ballerinax/ai.guardrails;

// Token usage tracker with persistent counters
final guardrails:UsageTracker usageTracker = new ({
    store: redisClient,  // Persist counters across restarts
    dimensions: ["sessionId", "userId", "agentName"]
});

function trackedChat(string message, string sessionId, string userId) returns string|error {
    agent:ChatResponse response = check myAgent.chatWithMetadata(message, sessionId);

    // Record usage across dimensions
    check usageTracker.record({
        sessionId,
        userId,
        agentName: "support-agent",
        inputTokens: response.usage.inputTokens,
        outputTokens: response.usage.outputTokens,
        model: response.usage.model,
        estimatedCost: calculateCost(response.usage)
    });

    return response.message;
}

function calculateCost(agent:TokenUsage usage) returns decimal {
    // Approximate cost calculation (rates vary by model)
    decimal inputCost = <decimal>usage.inputTokens / 1000000d * 2.5d;   // $2.50 per 1M input tokens
    decimal outputCost = <decimal>usage.outputTokens / 1000000d * 10.0d; // $10.00 per 1M output tokens
    return inputCost + outputCost;
}
```

## Setting Spending Limits

### Per-Session Limits

Cap token usage per conversation session.

```ballerina
final guardrails:SpendingLimit sessionLimit = new ({
    maxTokensPerSession: 50000,
    maxCostPerSession: 0.50,  // $0.50
    onExceed: "reject",
    rejectMessage: "This conversation has reached its usage limit. Please start a new session."
});

final agent:ChatAgent limitedAgent = check new (
    model: llmClient,
    systemPrompt: "You are a customer support assistant.",
    tools: [getOrderStatus],
    inputGuardrails: [sessionLimit]
);
```

### Per-User Limits

Prevent individual users from consuming excessive resources.

```ballerina
final guardrails:SpendingLimit userLimit = new ({
    maxTokensPerUser: 500000,    // Per day
    maxCostPerUser: 5.00,        // $5.00 per day
    resetInterval: "daily",
    onExceed: "reject",
    rejectMessage: "You have reached your daily usage limit. Your limit will reset at midnight UTC."
});
```

### Global Budget Limits

Set organization-wide spending caps.

```ballerina
final guardrails:SpendingLimit globalLimit = new ({
    maxCostPerDay: 100.00,       // $100/day across all users
    maxCostPerMonth: 2000.00,    // $2,000/month total
    onExceed: "reject",
    alertThresholds: [0.50, 0.75, 0.90],  // Alert at 50%, 75%, 90%
    alertWebhook: "https://hooks.slack.com/services/xxx/yyy/zzz"
});
```

## Cost Optimization Strategies

### Model Tiering

Use cheaper models for simple tasks and expensive models only where needed.

```ballerina
// Cheap model for routing and classification
final openai:Client routerModel = check new ({
    auth: {token: apiKey},
    model: "gpt-4o-mini",     // ~$0.15 per 1M input tokens
    temperature: 0.1
});

// Powerful model for complex reasoning
final openai:Client reasoningModel = check new ({
    auth: {token: apiKey},
    model: "gpt-4o",          // ~$2.50 per 1M input tokens
    temperature: 0.3
});

// Use the cheap model for the router
final agent:TaskAgent router = check new (
    model: routerModel,
    systemPrompt: "Classify the request.",
    outputType: RouteDecision
);

// Use the powerful model only for complex cases
final agent:ChatAgent specialist = check new (
    model: reasoningModel,
    systemPrompt: "You are an expert support agent.",
    tools: [getCustomer, searchOrders]
);
```

### Prompt Optimization

Shorter prompts cost less. Trim unnecessary verbosity from system prompts and tool descriptions.

```ballerina
// Verbose system prompt — costs more tokens every request
systemPrompt: string `You are an extremely helpful and friendly customer support assistant
    working for Acme Corp. You should always be polite, professional, and thorough
    in your responses. When customers ask questions, you should try your best to
    provide accurate and detailed answers...`  // ~100 tokens

// Optimized system prompt — same behavior, fewer tokens
systemPrompt: string `Customer support assistant for Acme Corp.
    Be professional, concise, and accurate.
    Use tools to verify information before responding.`  // ~30 tokens
```

### Caching Frequent Queries

Cache responses for common, deterministic queries.

```ballerina
import ballerina/cache;

final cache:Cache responseCache = new ({
    capacity: 500,
    defaultMaxAge: 300  // 5-minute TTL
});

function cachedClassify(string text) returns string|error {
    // Check cache first
    string|error cached = responseCache.get(text).ensureType();
    if cached is string {
        return cached;
    }

    // Cache miss — call the LLM
    string result = check classifyTicket(text);
    check responseCache.put(text, result);
    return result;
}
```

### Reducing Context Size

Minimize the tokens sent with each request by trimming conversation history and tool results.

```ballerina
// Use token-window memory to cap history size
final agent:ChatAgent efficientAgent = check new (
    model: llmClient,
    systemPrompt: "You are a support assistant.",
    tools: [getOrderStatus],
    memory: new agent:TokenWindowChatMemory(
        maxTokens: 4000,  // Cap conversation history
        reserveForResponse: 1024
    )
);
```

## Usage Alerts

Set up alerts for unusual spending patterns.

```ballerina
import ballerina/http;

function checkAndAlert(guardrails:UsageTracker tracker) returns error? {
    guardrails:UsageSummary daily = check tracker.getSummary("daily");

    // Alert if daily spending exceeds 80% of budget
    if daily.totalCost > 80.0d {
        check slackWebhook->post("/", {
            "text": string `AI spending alert: Daily usage at $${daily.totalCost.toFixedString(2)} (80% of budget). Top consumers: ${daily.topUsers.toString()}`
        });
    }

    // Alert on unusual spikes
    guardrails:UsageSummary hourly = check tracker.getSummary("hourly");
    guardrails:UsageSummary avgHourly = check tracker.getAverage("hourly", days = 7);

    if hourly.totalCost > avgHourly.totalCost * 3.0d {
        check slackWebhook->post("/", {
            "text": string `Unusual AI spending spike: Current hour $${hourly.totalCost.toFixedString(2)} vs. 7-day average $${avgHourly.totalCost.toFixedString(2)}`
        });
    }
}
```

## Usage Dashboard Data

Export usage data for dashboards and reporting.

```ballerina
service /api/usage on new http:Listener(8091) {

    resource function get summary(string period = "daily") returns json|error {
        guardrails:UsageSummary summary = check usageTracker.getSummary(period);
        return {
            period,
            totalTokens: summary.totalTokens,
            totalCost: summary.totalCost,
            requestCount: summary.requestCount,
            avgTokensPerRequest: summary.avgTokensPerRequest,
            topModels: summary.modelBreakdown,
            topAgents: summary.agentBreakdown
        };
    }
}
```

## What's Next

- [Input/Output Guardrails](input-output-guardrails.md) -- Validate AI inputs and outputs
- [Content Filtering](content-filtering.md) -- Filter inappropriate content
- [Managing Context Windows](/docs/genai/llm-connectivity/managing-context-windows) -- Optimize context to reduce token usage
- [Performance Metrics](/docs/genai/agent-observability/performance-metrics) -- Monitor agent performance alongside costs
