---
sidebar_position: 4
title: Streaming Responses
description: Stream LLM responses in real time using SSE and WebSocket with WSO2 Integrator.
---

# Streaming Responses

LLM responses can take several seconds to generate fully. Streaming lets you send partial responses to clients as they are produced, reducing perceived latency and improving the user experience.

WSO2 Integrator supports streaming LLM output through Server-Sent Events (SSE) and WebSocket, allowing you to build responsive chat interfaces and real-time AI-powered APIs.

## How Streaming Works

Without streaming, the client waits for the entire LLM response before receiving anything:

```
Client Request → [LLM generates full response: 3-5 seconds] → Full Response
```

With streaming, tokens arrive incrementally:

```
Client Request → [token] → [token] → [token] → ... → [done]
                  ~100ms    ~100ms    ~100ms
```

## Streaming with SSE

Server-Sent Events (SSE) is the most common transport for streaming LLM responses over HTTP.

### Basic SSE Streaming

```ballerina
import ballerina/http;
import ballerinax/ai.agent;

service /api on new http:Listener(8090) {

    resource function post chat(@http:Payload ChatRequest request)
            returns stream<http:SseEvent, error?>|error {
        // Stream the agent's response as SSE events
        stream<string, error?> tokenStream = check myAgent.chatStream(
            request.message, request.sessionId
        );

        // Transform token stream to SSE events
        return tokenStream.'map(isolated function(string token) returns http:SseEvent {
            return {data: token, event: "token"};
        });
    }
}
```

### SSE with Completion Signal

Send a final event when the stream completes so the client knows the response is finished.

```ballerina
resource function post chat(@http:Payload ChatRequest request)
        returns stream<http:SseEvent, error?>|error {
    stream<string, error?> tokenStream = check myAgent.chatStream(
        request.message, request.sessionId
    );

    // Buffer tokens and emit SSE events with a final "done" event
    return new stream:StreamImplementor(tokenStream);
}

class StreamImplementor {
    *stream:StreamImplementor;
    private final stream<string, error?> tokenStream;
    private boolean completed = false;

    function init(stream<string, error?> tokenStream) {
        self.tokenStream = tokenStream;
    }

    public isolated function next() returns record {|http:SseEvent value;|}|error? {
        if self.completed {
            return ();
        }
        string|error? token = self.tokenStream.next();
        if token is string {
            return {value: {data: token, event: "token"}};
        }
        self.completed = true;
        return {value: {data: "[DONE]", event: "done"}};
    }
}
```

### Client-Side SSE Consumption

```javascript
// JavaScript client example
const eventSource = new EventSource('/api/chat');

eventSource.addEventListener('token', (event) => {
    document.getElementById('response').textContent += event.data;
});

eventSource.addEventListener('done', (event) => {
    eventSource.close();
});
```

## Streaming with WebSocket

WebSocket provides bidirectional streaming, making it suitable for interactive chat sessions.

### WebSocket Chat Service

```ballerina
import ballerina/websocket;
import ballerinax/ai.agent;

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
        // Stream agent response token by token
        stream<string, error?> tokenStream = check myAgent.chatStream(
            message, self.sessionId
        );

        // Send each token as a WebSocket frame
        check from string token in tokenStream
            do {
                check caller->writeTextMessage(token);
            };

        // Signal completion
        check caller->writeTextMessage("[DONE]");
    }
}
```

### WebSocket with Structured Messages

```ballerina
type WsMessage record {|
    string 'type;   // "token", "tool_call", "done", "error"
    string? content;
    json? metadata;
|};

remote function onTextMessage(websocket:Caller caller, string message) returns error? {
    stream<agent:StreamEvent, error?> eventStream = check myAgent.chatStreamWithEvents(
        message, self.sessionId
    );

    check from agent:StreamEvent event in eventStream
        do {
            WsMessage wsMsg = match event {
                var {token} => {
                    {'type: "token", content: token, metadata: ()}
                }
                var {toolCall} => {
                    {'type: "tool_call", content: toolCall.name, metadata: toolCall.args}
                }
            };
            check caller->writeTextMessage(wsMsg.toJsonString());
        };

    check caller->writeTextMessage({
        'type: "done", content: (), metadata: ()
    }.toJsonString());
}
```

## Streaming from LLM Providers

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

### Collecting a Streamed Response

When you need both streaming and the full response.

```ballerina
function streamAndCollect(string prompt, websocket:Caller caller) returns string|error {
    stream<string, error?> tokenStream = check llm.chatStream([
        {role: "user", content: prompt}
    ]);

    string fullResponse = "";
    check from string token in tokenStream
        do {
            fullResponse += token;
            check caller->writeTextMessage(token);
        };

    return fullResponse;
}
```

## Streaming with Tool Calls

When an agent calls tools during streaming, you can emit tool-related events alongside tokens.

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

## Error Handling in Streams

Handle errors gracefully during streaming to avoid broken connections.

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

## What's Next

- [Managing Context Windows](managing-context-windows.md) -- Handle token limits for long conversations
- [Model Selection](model-selection.md) -- Choose models with streaming support
- [Chat Agents](/docs/genai/agents/chat-agents) -- Build interactive agents with streaming
- [Performance Metrics](/docs/genai/agent-observability/performance-metrics) -- Measure streaming latency
