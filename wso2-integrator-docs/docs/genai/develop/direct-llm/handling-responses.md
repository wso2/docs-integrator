---
sidebar_position: 3
title: Handling Responses
description: Stream LLM responses in real time, manage context windows, and handle errors in LLM output.
---

# Handling Responses

LLM responses can take several seconds to generate fully. WSO2 Integrator provides streaming, context window management, and error handling to build reliable, responsive AI-powered services.

## Streaming Responses

Streaming sends partial responses to clients as they are produced, reducing perceived latency.

### SSE Streaming

Server-Sent Events (SSE) is the most common transport for streaming LLM responses over HTTP.

```ballerina
import ballerina/http;
import ballerinax/ai.agent;

service /api on new http:Listener(8090) {

    resource function post chat(@http:Payload ChatRequest request)
            returns stream<http:SseEvent, error?>|error {
        stream<string, error?> tokenStream = check myAgent.chatStream(
            request.message, request.sessionId
        );

        return tokenStream.'map(isolated function(string token) returns http:SseEvent {
            return {data: token, event: "token"};
        });
    }
}
```

### WebSocket Streaming

WebSocket provides bidirectional streaming for interactive chat sessions.

```ballerina
import ballerina/websocket;

service /chat on new websocket:Listener(8091) {

    resource function get .() returns websocket:Service {
        return new ChatWebSocketService();
    }
}

service class ChatWebSocketService {
    *websocket:Service;
    private string sessionId;

    public function init() {
        self.sessionId = uuid:createType1().toString();
    }

    remote function onTextMessage(websocket:Caller caller, string message) returns error? {
        stream<string, error?> tokenStream = check myAgent.chatStream(
            message, self.sessionId
        );

        check from string token in tokenStream
            do {
                check caller->writeTextMessage(token);
            };

        check caller->writeTextMessage("[DONE]");
    }
}
```

### Direct Provider Streaming

Stream responses directly from the LLM provider without an agent.

```ballerina
import ballerinax/ai.provider.openai;

final openai:Client llm = check new ({
    auth: {token: apiKey},
    model: "gpt-4o"
});

function streamCompletion(string prompt) returns stream<string, error?>|error {
    return llm.chatStream([
        {role: "system", content: "You are a helpful assistant."},
        {role: "user", content: prompt}
    ]);
}
```

### Streaming with Tool Call Events

When an agent calls tools during streaming, emit tool-related events alongside tokens.

```ballerina
resource function post chat(@http:Payload ChatRequest request)
        returns stream<http:SseEvent, error?>|error {
    stream<agent:StreamEvent, error?> eventStream = check myAgent.chatStreamWithEvents(
        request.message, request.sessionId
    );

    return eventStream.'map(isolated function(agent:StreamEvent event) returns http:SseEvent {
        match event {
            var {token} => {
                return {data: token, event: "token"};
            }
            var {toolCall} => {
                return {
                    data: {name: toolCall.name, args: toolCall.args}.toJsonString(),
                    event: "tool_call"
                };
            }
            var {toolResult} => {
                return {
                    data: {name: toolResult.name, result: toolResult.result}.toJsonString(),
                    event: "tool_result"
                };
            }
        }
    });
}
```

## Managing Context Windows

Every LLM has a fixed context window. Managing it is essential for reliable agents that handle long conversations and large documents.

### Token Budget Overview

```
Context Window (128K)
  System Prompt        ~500 tokens
  Tool Definitions     ~1,000 tokens
  Conversation History ~3,000 tokens
  Current Message      ~200 tokens
  Tool Results         ~2,000 tokens
  Reserved for Response ~2,000 tokens
```

### Chunking Large Documents

Split large documents into smaller chunks and process them individually.

```ballerina
function processLargeDocument(string document) returns string|error {
    string[] chunks = check ai:chunkText(document, {
        maxTokens: 3000,
        overlap: 200,
        splitOn: "paragraph"
    });

    string[] summaries = from string chunk in chunks
        select check ai:natural<string>("Summarize the key points", chunk);

    string combined = string:'join("\n\n", ...summaries);
    return check ai:natural<string>(
        "Synthesize these section summaries into a single coherent summary", combined
    );
}
```

### Trimming Tool Output

Trim large tool responses to prevent exceeding context window limits.

```ballerina
@agent:Tool {
    name: "searchDocuments",
    description: "Search the document store. Returns up to 5 matching documents."
}
isolated function searchDocuments(string query) returns json|error {
    json[] results = check docStore->search(query);
    json[] trimmed = results.length() > 5 ? results.slice(0, 5) : results;

    return {
        "results": trimmed,
        "totalMatches": results.length(),
        "showing": trimmed.length()
    };
}
```

## Error Handling

Handle errors gracefully during streaming and LLM interactions.

```ballerina
resource function post chat(@http:Payload ChatRequest request)
        returns stream<http:SseEvent, error?>|error {
    stream<string, error?> tokenStream = check myAgent.chatStream(
        request.message, request.sessionId
    );

    return tokenStream.'map(isolated function(string|error token) returns http:SseEvent {
        if token is error {
            return {data: "An error occurred during generation.", event: "error"};
        }
        return {data: token, event: "token"};
    });
}
```

## When to Use Streaming

| Scenario | Streaming | Non-Streaming |
|----------|-----------|---------------|
| Interactive chat UI | Yes | |
| API-to-API integration | | Yes |
| Long-form content generation | Yes | |
| Data extraction pipelines | | Yes |
| Real-time dashboards | Yes | |
| Batch processing | | Yes |

Use streaming when a human is waiting for the response. Use non-streaming for machine-to-machine integrations where you need the complete response before proceeding.

## Context Window Sizing Guide

| Model | Context Window | Recommended Max History | Reserve for Response |
|-------|---------------|------------------------|---------------------|
| GPT-4o | 128K | 100K tokens | 4K tokens |
| Claude Sonnet | 200K | 150K tokens | 4K tokens |
| Gemini 2.5 Pro | 1M | 800K tokens | 8K tokens |
| Gemini 2.0 Flash | 1M | 800K tokens | 8K tokens |
| Llama 3 (8B) | 8K | 6K tokens | 1K tokens |

## What's Next

- [Configuring Providers](/docs/genai/develop/direct-llm/configuring-providers) -- Choose models with streaming support
- [Constructing Prompts](/docs/genai/develop/direct-llm/constructing-prompts) -- Write effective prompts
- [Adding Memory](/docs/genai/develop/agents/adding-memory) -- Memory-based context management
