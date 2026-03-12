---
sidebar_position: 5
title: What is AI Agent Memory?
description: Understand how AI agents retain conversation context across multiple interactions.
---

# What is AI Agent Memory?

Agent memory controls how your AI agent retains and manages conversation history. Without memory, every message is processed in isolation. With memory, the agent remembers what was said earlier in the conversation, enabling multi-turn interactions like follow-up questions and contextual references.

## Why Memory Matters

Consider this conversation:

```
User: "What's the status of order ORD-001?"
Agent: "ORD-001 has been shipped and arrives March 15."

User: "And ORD-002?"
Agent: ???
```

Without memory, the agent has no context for "And ORD-002?" -- it does not know the user was previously asking about order status. With memory, the agent understands this is a follow-up request for another order's status.

## Memory Types

WSO2 Integrator provides several memory implementations:

| Memory Type | How It Works | Best For |
|-------------|-------------|----------|
| `MessageWindowChatMemory` | Keeps the last N messages | General chat agents (default choice) |
| `TokenWindowChatMemory` | Keeps messages within a token budget | Cost-sensitive applications |
| `SummaryChatMemory` | Summarizes older messages, keeps recent ones verbatim | Long conversations (50+ turns) |
| `PersistentChatMemory` | Stores history in an external database | Sessions that survive restarts |
| None | Stateless, no history retained | Single-turn task processing |

## Basic Configuration

```ballerina
import ballerinax/ai.agent;

// Keep the last 20 messages
final agent:ChatAgent myAgent = check new (
    model: llmClient,
    systemPrompt: "You are a helpful assistant.",
    memory: new agent:MessageWindowChatMemory(maxMessages: 20)
);
```

## Session Isolation

Each session ID creates an independent conversation thread. Different users or conversations never share context.

```ballerina
// Independent conversations
string r1 = check agent.chat("Hello!", "user-alice");
string r2 = check agent.chat("Hello!", "user-bob");
string r3 = check agent.chat("Follow up", "user-alice");  // Only sees Alice's history
```

## Choosing the Right Memory

| Scenario | Recommended Memory |
|----------|--------------------|
| Quick support interactions (< 10 turns) | `MessageWindowChatMemory(20)` |
| Cost-sensitive production deployment | `TokenWindowChatMemory(4000)` |
| Long advisory sessions (50+ turns) | `SummaryChatMemory` |
| Multi-day onboarding workflows | `PersistentChatMemory` |
| Single-turn task processing | No memory |

## What's Next

- [What is MCP?](what-is-mcp.md) -- Model Context Protocol for external AI access
- [What is RAG?](what-is-rag.md) -- Retrieval-augmented generation
- [Adding Memory to an Agent](/docs/genai/develop/agents/adding-memory) -- Implementation guide
