---
sidebar_position: 5
title: Managing Context Windows
description: Strategies for managing token limits, conversation truncation, and context optimization in LLM integrations.
---

# Managing Context Windows

Every LLM has a fixed context window -- the maximum number of tokens it can process in a single request. This window must hold the system prompt, conversation history, tool definitions, tool results, and leave room for the response. When content exceeds the window, the model either fails or silently drops information.

Managing context windows is essential for building reliable agents that handle long conversations, large documents, and complex tool interactions without running out of space.

## Understanding Token Budgets

A typical agent request consumes tokens across several components:

```
┌─────────────────────────────────────────────┐
│              Context Window (128K)          │
│                                             │
│  ┌─────────────────────┐                    │
│  │ System Prompt        │  ~500 tokens      │
│  ├─────────────────────┤                    │
│  │ Tool Definitions     │  ~1,000 tokens    │
│  ├─────────────────────┤                    │
│  │ Conversation History │  ~3,000 tokens    │
│  ├─────────────────────┤                    │
│  │ Current Message      │  ~200 tokens      │
│  ├─────────────────────┤                    │
│  │ Tool Results         │  ~2,000 tokens    │
│  ├─────────────────────┤                    │
│  │ Reserved for Response│  ~2,000 tokens    │
│  └─────────────────────┘                    │
│                                             │
│  Used: ~8,700 tokens                        │
│  Available: ~119,300 tokens                 │
└─────────────────────────────────────────────┘
```

### Token Estimation

```ballerina
import ballerinax/ai;

// Estimate token count for a string
int tokenCount = check ai:estimateTokens("Your text here", "cl100k_base");

// Estimate total context usage for an agent call
ai:TokenUsage usage = check myAgent.estimateUsage("User message here", "session-123");
io:println(string `System: ${usage.systemTokens}, History: ${usage.historyTokens}, Available: ${usage.availableTokens}`);
```

## Memory-Based Context Management

The primary way to manage context is through agent memory configuration. See [Configure Agent Memory](/docs/genai/agents/memory-configuration) for full details.

### Message Window

Keep a fixed number of recent messages. Simple and predictable.

```ballerina
import ballerinax/ai.agent;

// Keep last 20 messages — oldest messages are dropped
final agent:ChatAgent chatAgent = check new (
    model: llmClient,
    systemPrompt: "You are a helpful assistant.",
    memory: new agent:MessageWindowChatMemory(maxMessages: 20)
);
```

### Token Window

Keep messages that fit within a token budget. More precise control over context size.

```ballerina
// Stay within 8,000 tokens of conversation history
final agent:ChatAgent tokenAgent = check new (
    model: llmClient,
    systemPrompt: "You are a financial analyst.",
    memory: new agent:TokenWindowChatMemory(
        maxTokens: 8000,
        tokenizer: new agent:Cl100kTokenizer()
    )
);
```

### Summary Memory

Compress older messages into a summary to retain context from long conversations.

```ballerina
final agent:ChatAgent longChatAgent = check new (
    model: llmClient,
    systemPrompt: "You are a project planning assistant.",
    memory: new agent:SummaryChatMemory(
        summarizeAfter: 15,
        keepRecent: 5,
        summaryModel: llmClient
    )
);
```

## Managing Large Inputs

When processing large documents or datasets, the input itself can exceed the context window.

### Chunking Large Documents

Split large documents into smaller chunks and process them individually.

```ballerina
function processLargeDocument(string document) returns string|error {
    // Split into chunks of approximately 3,000 tokens each
    string[] chunks = check ai:chunkText(document, {
        maxTokens: 3000,
        overlap: 200,       // Overlap for context continuity
        splitOn: "paragraph" // Split at paragraph boundaries
    });

    // Process each chunk
    string[] summaries = from string chunk in chunks
        select check ai:natural<string>("Summarize the key points", chunk);

    // Combine chunk summaries into a final summary
    string combined = string:'join("\n\n", ...summaries);
    return check ai:natural<string>(
        "Synthesize these section summaries into a single coherent summary", combined
    );
}
```

### Map-Reduce Pattern

Process chunks in parallel and combine the results.

```ballerina
function mapReduceAnalysis(string[] documents) returns AnalysisResult|error {
    // Map: analyze each document in parallel
    future<json|error>[] futures = from string doc in documents
        select start analyzeDocument(doc);

    // Collect results
    json[] partialResults = [];
    foreach future<json|error> f in futures {
        partialResults.push(check wait f);
    }

    // Reduce: combine partial results
    return check ai:natural<AnalysisResult>(
        "Combine these partial analyses into a single comprehensive result",
        partialResults.toJsonString()
    );
}
```

## Managing Tool Output Size

Large tool results can consume significant context space. Trim outputs before they enter the conversation.

### Truncating Tool Results

```ballerina
@agent:Tool {
    name: "searchDocuments",
    description: "Search the document store. Returns up to 5 matching documents with relevant excerpts."
}
isolated function searchDocuments(string query) returns json|error {
    json[] results = check docStore->search(query);

    // Truncate to fit context budget
    json[] trimmed = results.length() > 5 ? results.slice(0, 5) : results;

    // Limit each result's content length
    json[] condensed = from json result in trimmed
        select {
            "title": check result.title,
            "excerpt": truncateText(check result.content.toString(), 500),
            "relevanceScore": check result.score
        };

    return {
        "results": condensed,
        "totalMatches": results.length(),
        "showing": condensed.length()
    };
}

function truncateText(string text, int maxChars) returns string {
    if text.length() <= maxChars {
        return text;
    }
    return text.substring(0, maxChars) + "...";
}
```

### Summarizing Large Tool Results

```ballerina
@agent:Tool {
    name: "getReport",
    description: "Fetch a financial report. Large reports are automatically summarized to fit context limits."
}
isolated function getReport(string reportId) returns json|error {
    json report = check reportApi->get(string `/reports/${reportId}`);

    // If the report is large, summarize it
    string reportText = report.toString();
    int tokenCount = check ai:estimateTokens(reportText, "cl100k_base");

    if tokenCount > 3000 {
        string summary = check ai:natural<string>(
            "Summarize this financial report, preserving key figures and conclusions",
            reportText
        );
        return {
            "reportId": reportId,
            "summary": summary,
            "note": "Full report was summarized to fit context limits. Ask for specific sections for details."
        };
    }
    return report;
}
```

## Context Window Sizing Guide

| Model | Context Window | Recommended Max History | Reserve for Response |
|-------|---------------|------------------------|---------------------|
| GPT-4o | 128K | 100K tokens | 4K tokens |
| GPT-4o-mini | 128K | 100K tokens | 4K tokens |
| Claude Sonnet | 200K | 150K tokens | 4K tokens |
| Gemini 2.5 Pro | 1M | 800K tokens | 8K tokens |
| Gemini 2.0 Flash | 1M | 800K tokens | 8K tokens |
| Llama 3 (8B) | 8K | 6K tokens | 1K tokens |

## Monitoring Context Usage

Track context utilization to detect when conversations approach limits.

```ballerina
import ballerina/log;

function chatWithMonitoring(string message, string sessionId) returns string|error {
    ai:TokenUsage usage = check myAgent.estimateUsage(message, sessionId);

    float utilization = <float>usage.totalUsed / <float>usage.contextWindow * 100.0;
    log:printInfo("Context utilization",
        sessionId = sessionId,
        utilization = string `${utilization.toFixedString(1)}%`,
        totalUsed = usage.totalUsed,
        windowSize = usage.contextWindow
    );

    if utilization > 80.0 {
        log:printWarn("Context window nearing capacity", sessionId = sessionId);
    }

    return check myAgent.chat(message, sessionId);
}
```

## What's Next

- [Configure Agent Memory](/docs/genai/agents/memory-configuration) -- Detailed memory type configuration
- [Token & Cost Management](/docs/genai/guardrails/token-cost-management) -- Control spending alongside context
- [Model Selection](model-selection.md) -- Compare context window sizes across models
- [Performance Metrics](/docs/genai/agent-observability/performance-metrics) -- Monitor token usage in production
