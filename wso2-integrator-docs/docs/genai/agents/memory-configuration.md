---
sidebar_position: 4
title: Configure Agent Memory
description: Manage conversation history, context windows, and session state for AI agents.
---

# Configure Agent Memory

Agent memory controls how your AI agent retains and manages conversation history. Proper memory configuration ensures agents maintain useful context without exceeding token limits or incurring unnecessary costs.

Choosing the right memory strategy depends on your conversation length, cost constraints, and how much context the agent needs to perform its tasks effectively.

## Memory Types

WSO2 Integrator provides several memory implementations, each optimized for different use cases.

### Message Window Memory

Keeps the most recent N messages. Simple, predictable, and the best default choice.

```ballerina
import ballerinax/ai.agent;

// Keep the last 20 messages (10 user + 10 assistant turns)
final agent:ChatAgent myAgent = check new (
    model: llmClient,
    systemPrompt: "You are a helpful assistant.",
    memory: new agent:MessageWindowChatMemory(maxMessages: 20)
);
```

| Parameter | Default | Description |
|-----------|---------|-------------|
| `maxMessages` | 20 | Maximum number of messages to retain |
| `includeSystemPrompt` | true | Whether to always include the system prompt |

**Best for:** General-purpose chat agents, help desk bots, interactive data exploration.

### Token Window Memory

Keeps messages that fit within a token budget. Useful when you need to control costs precisely or work within model context limits.

```ballerina
// Keep conversation history within 4,000 tokens
final agent:ChatAgent costAwareAgent = check new (
    model: llmClient,
    systemPrompt: "You are a financial analyst.",
    memory: new agent:TokenWindowChatMemory(
        maxTokens: 4000,
        tokenizer: new agent:Cl100kTokenizer()  // GPT-4 tokenizer
    )
);
```

| Parameter | Default | Description |
|-----------|---------|-------------|
| `maxTokens` | 4096 | Maximum token budget for conversation history |
| `tokenizer` | Cl100k | Tokenizer matching the target model |
| `reserveForResponse` | 1024 | Tokens reserved for the model's response |

**Best for:** Cost-sensitive applications, long conversations, working with smaller context window models.

### Summary Memory

Compresses older messages into a summary while keeping recent messages verbatim. This gives agents a sense of the full conversation without using excessive tokens.

```ballerina
// Summarize older messages, keep recent ones intact
final agent:ChatAgent longConversationAgent = check new (
    model: llmClient,
    systemPrompt: "You are a project planning assistant.",
    memory: new agent:SummaryChatMemory(
        summarizeAfter: 10,  // Start summarizing after 10 messages
        keepRecent: 5,       // Always keep the 5 most recent messages verbatim
        summaryModel: llmClient  // LLM used for summarization
    )
);
```

The memory structure looks like this after many messages:

```
[System Prompt]
[Summary: "The user discussed project timelines, agreed on a March deadline,
  and asked about resource allocation for the frontend team..."]
[Recent Message 1]
[Recent Message 2]
[Recent Message 3]
[Recent Message 4]
[Recent Message 5]
```

**Best for:** Long-running sessions (hours/days), project planning, ongoing advisory conversations.

### Persistent Memory

Store conversation history in an external database for sessions that span multiple service restarts or deployments.

```ballerina
import ballerinax/redis;

// Persist conversation history to Redis
final redis:Client redisClient = check new ({
    connection: {host: "localhost", port: 6379}
});

final agent:ChatAgent persistentAgent = check new (
    model: llmClient,
    systemPrompt: "You are a patient onboarding assistant.",
    memory: new agent:PersistentChatMemory(
        store: redisClient,
        maxMessages: 50,
        ttl: 86400  // Expire sessions after 24 hours
    )
);
```

**Best for:** Multi-day conversations, agents that survive restarts, compliance requirements for conversation logging.

## Memory Configuration Patterns

### Combining Memory with Context Injection

Add external context to the conversation without it counting toward the message history.

```ballerina
service /agent on new http:Listener(8090) {

    resource function post chat(@http:Payload ChatRequest request) returns ChatResponse|error {
        // Fetch relevant context (e.g., user profile, recent activity)
        json userContext = check getUserContext(request.userId);

        // Inject context as a system-level message for this turn
        string contextualMessage = string `[User Context: ${userContext.toString()}]

            User question: ${request.message}`;

        string response = check myAgent.chat(contextualMessage, request.sessionId);
        return {message: response};
    }
}
```

### Session-Scoped Memory

Create separate memory instances per session for complete isolation.

```ballerina
import ballerina/cache;

final cache:Cache sessionMemories = new ({
    capacity: 1000,
    evictionFactor: 0.1,
    defaultMaxAge: 3600  // 1-hour session TTL
});

function getOrCreateAgent(string sessionId) returns agent:ChatAgent|error {
    agent:ChatAgent|error cached = sessionMemories.get(sessionId).ensureType();
    if cached is agent:ChatAgent {
        return cached;
    }

    agent:ChatAgent newAgent = check new (
        model: llmClient,
        systemPrompt: "You are a helpful assistant.",
        memory: new agent:MessageWindowChatMemory(maxMessages: 30)
    );
    check sessionMemories.put(sessionId, newAgent);
    return newAgent;
}
```

### Conversation Handoff

Transfer conversation history from one agent to another (e.g., escalation from bot to specialized agent).

```ballerina
function escalateToSpecialist(string sessionId) returns string|error {
    // Extract history from the general agent
    agent:ChatMessage[] history = check generalAgent.getHistory(sessionId);

    // Create a summary for the specialist agent
    string summary = check summarizeConversation(history);

    // Seed the specialist agent with the summary
    check specialistAgent.addSystemMessage(
        sessionId,
        string `Previous conversation summary: ${summary}`
    );

    return check specialistAgent.chat(
        "The customer has been transferred to you. Please continue assisting them.",
        sessionId
    );
}
```

## Choosing the Right Memory Strategy

| Scenario | Recommended Memory | Why |
|----------|-------------------|-----|
| Quick support interactions (< 10 turns) | `MessageWindowChatMemory(20)` | Simple and sufficient |
| Cost-sensitive production deployment | `TokenWindowChatMemory(4000)` | Precise token control |
| Long advisory sessions (50+ turns) | `SummaryChatMemory` | Retains context without token explosion |
| Multi-day onboarding workflows | `PersistentChatMemory` | Survives restarts |
| Single-turn task processing | No memory | Stateless by design |

## What's Next

- [Tool Binding](tool-binding.md) — Connect agents to functions and APIs
- [Managing Context Windows](/docs/genai/llm-connectivity/managing-context-windows) — Optimize token usage across the full pipeline
- [Token & Cost Management](/docs/genai/guardrails/token-cost-management) — Control spending on LLM calls
- [Conversation Logging](/docs/genai/agent-observability/conversation-logging) — Log and audit agent conversations
