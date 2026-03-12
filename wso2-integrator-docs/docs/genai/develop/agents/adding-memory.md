---
sidebar_position: 3
title: Adding Memory to an Agent
description: Configure agent memory for conversation persistence using in-memory, Redis-backed, and database-backed stores.
---

# Adding Memory to an Agent

Agent memory controls how your AI agent retains and manages conversation history across turns. Without memory, each call to the agent is independent and the agent has no awareness of previous interactions. With memory, the agent can maintain context, refer back to earlier messages, and build on prior reasoning.

Choosing the right memory strategy depends on conversation length, cost constraints, and whether sessions need to survive service restarts.

## Message Window Memory

Keeps the most recent N messages in the conversation. This is the simplest and most commonly used strategy.

```ballerina
import ballerinax/ai.agent;

final agent:ChatAgent helpDeskAgent = check new (
    model: llmClient,
    systemPrompt: "You are a helpful IT support assistant.",
    memory: new agent:MessageWindowChatMemory(maxMessages: 20)
);
```

When the conversation exceeds the configured limit, the oldest messages are dropped. The system prompt is always retained regardless of the window size.

| Parameter | Default | Description |
|-----------|---------|-------------|
| `maxMessages` | 20 | Maximum number of messages to retain |
| `includeSystemPrompt` | true | Whether to always include the system prompt |

**Best for:** General-purpose chat agents, help desk bots, and interactive data exploration where conversations are relatively short.

## Token Window Memory

Keeps messages that fit within a token budget rather than a message count. This gives you precise control over costs and ensures you stay within the model's context window.

```ballerina
final agent:ChatAgent costAwareAgent = check new (
    model: llmClient,
    systemPrompt: "You are a financial analyst assistant.",
    memory: new agent:TokenWindowChatMemory(
        maxTokens: 4000,
        tokenizer: new agent:Cl100kTokenizer()
    )
);
```

| Parameter | Default | Description |
|-----------|---------|-------------|
| `maxTokens` | 4096 | Maximum token budget for conversation history |
| `tokenizer` | Cl100k | Tokenizer matching the target model |
| `reserveForResponse` | 1024 | Tokens reserved for the model's response |

**Best for:** Cost-sensitive production deployments and long conversations where you need to stay within a fixed token budget.

## Summary Memory

Compresses older messages into a running summary while keeping recent messages verbatim. This gives the agent a sense of the full conversation history without consuming excessive tokens.

```ballerina
final agent:ChatAgent longSessionAgent = check new (
    model: llmClient,
    systemPrompt: "You are a project planning assistant.",
    memory: new agent:SummaryChatMemory(
        summarizeAfter: 10,
        keepRecent: 5,
        summaryModel: llmClient
    )
);
```

After the conversation exceeds 10 messages, the memory structure looks like this:

```
[System Prompt]
[Summary: "The user discussed project timelines, agreed on a March deadline,
  and asked about resource allocation for the frontend team..."]
[Recent Message 1]
[Recent Message 2]
...
[Recent Message 5]
```

The summary is regenerated each time older messages are compressed, so it always reflects the full prior conversation.

**Best for:** Long-running advisory sessions, project planning, and multi-hour conversations where losing early context would degrade quality.

## Redis-Backed Persistent Memory

Store conversation history in Redis for sessions that need to survive service restarts and deployments.

```ballerina
import ballerinax/redis;

configurable string redisHost = "localhost";
configurable int redisPort = 6379;

final redis:Client redisClient = check new ({
    connection: {host: redisHost, port: redisPort}
});

final agent:ChatAgent persistentAgent = check new (
    model: llmClient,
    systemPrompt: "You are a patient onboarding assistant.",
    memory: new agent:PersistentChatMemory(
        store: redisClient,
        maxMessages: 50,
        ttl: 86400   // Expire sessions after 24 hours
    )
);
```

Redis-backed memory serializes each message to a Redis list keyed by session ID. The `ttl` parameter automatically expires idle sessions to free resources.

**Best for:** Multi-day workflows, agents that must survive restarts, and environments with compliance requirements for conversation retention.

## Database-Backed Persistent Memory

For teams that prefer a relational database, store conversation history in PostgreSQL or MySQL.

```ballerina
import ballerinax/postgresql;

final postgresql:Client pgClient = check new (
    host = dbHost, database = dbName,
    username = dbUser, password = dbPassword
);

final agent:ChatAgent dbBackedAgent = check new (
    model: llmClient,
    systemPrompt: "You are a healthcare scheduling assistant.",
    memory: new agent:PersistentChatMemory(
        store: pgClient,
        tableName: "conversation_history",
        maxMessages: 100,
        ttl: 604800   // 7-day TTL
    )
);
```

The agent creates and manages the required table schema automatically on first use.

**Best for:** Organizations that want conversation logs in a queryable relational store for auditing, analytics, or compliance.

## Combining Memory with Context Injection

Add external context to individual turns without it counting toward the conversation history.

```ballerina
import ballerina/http;

service /agent on new http:Listener(8090) {

    resource function post chat(@http:Payload ChatRequest request) returns ChatResponse|error {
        // Fetch user-specific context
        json userContext = check getUserProfile(request.userId);

        // Inject context as a prefix to this turn only
        string contextualMessage = string `[User Context: ${userContext.toString()}]

            User question: ${request.message}`;

        string response = check helpDeskAgent.chat(contextualMessage, request.sessionId);
        return {message: response};
    }
}
```

The injected context appears in this turn's message but is not stored separately in memory. On future turns, it will be part of the message history like any other message.

## Conversation Handoff Between Agents

Transfer conversation history from one agent to another when escalating or routing.

```ballerina
function escalateToSpecialist(string sessionId) returns string|error {
    // Extract history from the general agent
    agent:ChatMessage[] history = check generalAgent.getHistory(sessionId);

    // Summarize for the specialist
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

## Session Cleanup

Clear session memory when a conversation ends to free resources.

```ballerina
service /helpdesk on new http:Listener(8090) {

    resource function post chat(@http:Payload ChatMessage request) returns ChatResponse|error {
        string response = check helpDeskAgent.chat(request.message, request.sessionId);
        return {response};
    }

    resource function delete session/[string sessionId]() returns http:Ok {
        helpDeskAgent.clearMemory(sessionId);
        return http:OK;
    }
}
```

## Choosing the Right Memory Strategy

| Scenario | Recommended Memory | Why |
|----------|-------------------|-----|
| Quick support interactions (< 10 turns) | `MessageWindowChatMemory(20)` | Simple and sufficient |
| Cost-sensitive production deployment | `TokenWindowChatMemory(4000)` | Precise token control |
| Long advisory sessions (50+ turns) | `SummaryChatMemory` | Retains context without token explosion |
| Multi-day onboarding workflows | `PersistentChatMemory` (Redis) | Survives restarts, auto-expires |
| Compliance and audit requirements | `PersistentChatMemory` (Database) | Queryable, persistent logs |
| Single-turn task processing | No memory | Stateless by design |

## What's Next

- [Creating an AI Agent](/docs/genai/develop/agents/creating-agent) -- Build your first agent
- [Adding Tools](/docs/genai/develop/agents/adding-tools) -- Connect agents to functions and APIs
- [Advanced Configuration](/docs/genai/develop/agents/advanced-config) -- Multi-agent orchestration and advanced settings
- [AI Agent Observability](/docs/genai/develop/agents/agent-observability) -- Monitor agent conversations
