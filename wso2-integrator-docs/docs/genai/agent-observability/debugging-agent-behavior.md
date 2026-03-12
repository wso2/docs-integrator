---
sidebar_position: 4
title: Debugging Agent Behavior
description: Diagnose and fix unexpected agent behavior, hallucinations, tool call failures, and loops.
---

# Debugging Agent Behavior

AI agents can exhibit unexpected behavior -- wrong tool selection, hallucinated data, infinite loops, or inconsistent responses. Unlike traditional software bugs, agent failures are often probabilistic and depend on the combination of prompt, context, tools, and model. This guide covers systematic approaches to diagnosing and fixing agent issues.

## Common Issues

### Wrong Tool Selection

The agent calls the wrong tool or no tool at all.

**Symptoms:**
- Agent calls `searchProducts` when the user asked about order status
- Agent responds with a text answer instead of calling a tool
- Agent calls a write tool when only a read was needed

**Diagnostic Steps:**

```ballerina
// Enable verbose tool selection logging
final agent:ChatAgent debugAgent = check new (
    model: llmClient,
    systemPrompt: "You are a customer support assistant.",
    tools: [getOrderStatus, searchProducts, getCustomer],
    logging: {
        enabled: true,
        logLevel: "debug",
        includeToolCalls: true
    }
);

// Check what the agent sees
function debugToolSelection(string message) returns error? {
    agent:ChatResponse response = check debugAgent.chatWithMetadata(message, "debug-session");

    log:printInfo("Debug: tool selection",
        userMessage = message,
        toolsCalled = response.toolCalls.toString(),
        reasoning = response.llmReasoning
    );
}
```

**Fix strategies:**
- Improve tool descriptions to be more specific about when to use each tool
- Add negative guidance (e.g., "Do NOT use this tool for order status queries")
- Reduce the number of tools if the agent has too many to choose from
- Add few-shot examples in the system prompt showing correct tool selection

```ballerina
// Before: vague description
@agent:Tool {
    name: "getData",
    description: "Gets data from the database"
}

// After: specific and differentiated
@agent:Tool {
    name: "getOrderStatus",
    description: "Look up the current status of an order by order ID (format: ORD-XXXXX). Use this when a customer asks about their order status, delivery, or tracking. Do NOT use this for product searches or customer lookups."
}
```

### Hallucinated Data

The agent generates information that does not exist in the tools or context.

**Symptoms:**
- Agent invents order numbers, tracking numbers, or dates
- Agent claims to have checked a tool when the trace shows it did not
- Agent provides plausible-sounding but incorrect answers

**Diagnostic Steps:**

```ballerina
// Compare agent response to actual tool results
function debugHallucination(string message, string sessionId) returns error? {
    agent:ChatResponse response = check myAgent.chatWithMetadata(message, sessionId);

    log:printInfo("Hallucination check",
        toolResults = response.toolResults.toString(),
        agentResponse = response.message,
        toolsCalled = response.toolCalls.length()
    );

    // Flag if agent responded without calling any tools
    if response.toolCalls.length() == 0 {
        log:printWarn("Agent responded without tool calls — possible hallucination",
            message = message, response = response.message);
    }
}
```

**Fix strategies:**
- Add system prompt instructions: "Only use information from tool results. Never invent data."
- Add output guardrails that cross-reference the response against tool results
- Lower the temperature to reduce creative output
- Require the agent to cite which tool provided the data

### Infinite Tool Loops

The agent repeatedly calls the same tool or cycles between tools.

**Symptoms:**
- Agent makes 10+ tool calls for a simple question
- Agent calls the same tool with identical or similar parameters
- Request times out due to excessive tool calls

**Diagnostic Steps:**

```ballerina
// Add loop detection
function chatWithLoopDetection(string message, string sessionId) returns string|error {
    agent:ChatResponse response = check myAgent.chatWithMetadata(message, sessionId);

    // Detect repeated tool calls
    map<int> toolCallCounts = {};
    foreach agent:ToolCall call in response.toolCalls {
        toolCallCounts[call.name] = (toolCallCounts[call.name] ?: 0) + 1;
    }

    foreach [string, int] [toolName, count] in toolCallCounts.entries() {
        if count > 3 {
            log:printWarn("Possible tool loop detected",
                tool = toolName, callCount = count, sessionId = sessionId);
        }
    }

    return response.message;
}
```

**Fix strategies:**
- Set a maximum tool call limit per interaction
- Improve tool return values so the agent gets what it needs in fewer calls
- Add system prompt guidance about when to stop calling tools
- Return clearer error messages from tools so the agent does not retry

```ballerina
final agent:ChatAgent loopSafeAgent = check new (
    model: llmClient,
    systemPrompt: "You are a support assistant. Call each tool at most once per question.",
    tools: [getOrderStatus, getCustomer],
    maxToolCalls: 5  // Hard limit on tool calls per interaction
);
```

### Inconsistent Responses

The agent gives different answers to the same question.

**Diagnostic Steps:**

```ballerina
// Test consistency by running the same input multiple times
@test:Config {}
function testResponseConsistency() returns error? {
    string testMessage = "What is the return policy?";
    string[] responses = [];

    foreach int i in 0...4 {
        string response = check myAgent.chat(testMessage, string `consistency-test-${i}`);
        responses.push(response);
    }

    // Log all responses for manual comparison
    foreach int i in 0..<responses.length() {
        log:printInfo("Consistency test", run = i, response = responses[i]);
    }
}
```

**Fix strategies:**
- Lower the temperature to 0.0-0.2 for deterministic responses
- Provide specific instructions in the system prompt for common questions
- Use few-shot examples for questions that need consistent answers
- Ground responses in tool data rather than LLM knowledge

## Debugging Workflow

Follow this systematic process when investigating agent issues:

### 1. Reproduce the Issue

```ballerina
// Create a test case that reproduces the exact scenario
@test:Config {}
function testReproduction() returns error? {
    string response = check myAgent.chat(
        "The exact user message that caused the issue",
        "repro-session"
    );
    log:printInfo("Reproduction response", response = response);
}
```

### 2. Enable Verbose Logging

```toml
# Config.toml — Debug configuration
[ballerina.observe]
enabled = true

[ballerinax.ai.agent]
logLevel = "debug"
capturePrompts = true
captureResponses = true
```

### 3. Inspect the Full Trace

Review the complete trace to understand the agent's decision flow:
- What was in the system prompt?
- What conversation history was included?
- What tool definitions did the LLM see?
- What was the LLM's raw response?
- What tool results were returned?

### 4. Isolate the Cause

| Symptom | Likely Cause | Investigation |
|---------|--------------|---------------|
| Wrong tool called | Poor tool description | Compare tool descriptions for overlap |
| No tool called | LLM answered from knowledge | Check if prompt instructs tool use |
| Hallucinated data | Missing grounding constraint | Check output guardrails and prompt |
| Loop behavior | Unhelpful tool error messages | Check what tools return on failure |
| Slow response | Too many tool calls or large context | Check trace for bottlenecks |
| Inconsistent output | High temperature or vague prompt | Lower temperature, add specifics |

### 5. Fix and Verify

```ballerina
// After applying the fix, verify with a test suite
@test:Config {}
function testFixedBehavior() returns error? {
    // Test the original failing case
    string response = check myAgent.chat("What's the status of ORD-12345?", "test-fix");
    test:assertTrue(response.includes("ORD-12345"), "Response should reference the order");

    // Test edge cases
    response = check myAgent.chat("What's the status of INVALID-ID?", "test-fix-2");
    test:assertTrue(response.includes("not found") || response.includes("invalid"),
        "Should handle invalid order IDs gracefully");
}
```

## Comparing Model Behavior

When an issue might be model-specific, test the same scenario across models.

```ballerina
function compareModels(string message) returns error? {
    // Test with GPT-4o
    agent:ChatAgent gpt4Agent = check new (
        model: check new openai:Client({auth: {token: apiKey}, model: "gpt-4o"}),
        systemPrompt: systemPrompt,
        tools: tools
    );

    // Test with Claude
    agent:ChatAgent claudeAgent = check new (
        model: check new anthropic:Client({auth: {token: anthropicKey}, model: "claude-sonnet-4-20250514"}),
        systemPrompt: systemPrompt,
        tools: tools
    );

    string gpt4Response = check gpt4Agent.chat(message, "compare-gpt4");
    string claudeResponse = check claudeAgent.chat(message, "compare-claude");

    log:printInfo("Model comparison",
        message = message,
        gpt4 = gpt4Response,
        claude = claudeResponse
    );
}
```

## What's Next

- [Agent Tracing](agent-tracing.md) -- Use traces to visualize agent behavior
- [Conversation Logging](conversation-logging.md) -- Review full conversation history
- [Performance Metrics](performance-metrics.md) -- Identify performance-related issues
- [Prompt Engineering](/docs/genai/llm-connectivity/prompt-engineering) -- Improve prompts to prevent issues
