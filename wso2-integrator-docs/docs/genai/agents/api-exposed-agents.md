---
sidebar_position: 3
title: Expose Agents as APIs
description: Deploy AI agents behind HTTP, GraphQL, and WebSocket endpoints for production use.
---

# Expose Agents as APIs

AI agents become production-ready when exposed through well-defined APIs. WSO2 Integrator lets you wrap agents in HTTP, GraphQL, or WebSocket services with authentication, rate limiting, and structured request/response contracts.

This page covers the patterns for exposing agents as APIs that your applications, frontends, and third-party systems can consume reliably.

## HTTP REST API

The most common pattern: expose your agent as a REST endpoint with typed request and response payloads.

### Basic REST Agent

```ballerina
import ballerina/http;
import ballerinax/ai.agent;

configurable string apiKey = ?;

final agent:ChatAgent supportAgent = check new (
    model: llmClient,
    systemPrompt: "You are a customer support assistant.",
    tools: [lookupOrder, searchProducts, createTicket],
    memory: new agent:MessageWindowChatMemory(maxMessages: 20)
);

service /api/v1/support on new http:Listener(8090) {

    resource function post chat(@http:Payload ChatRequest request) returns ChatResponse|error {
        string response = check supportAgent.chat(request.message, request.sessionId);
        return {
            sessionId: request.sessionId,
            message: response,
            timestamp: time:utcNow()
        };
    }

    resource function post chat/stream(@http:Payload ChatRequest request)
            returns stream<SseEvent, error?>|error {
        stream<string, error?> tokens = check supportAgent.chatStream(
            request.message, request.sessionId
        );
        return tokens.'map(token => <SseEvent>{data: token});
    }

    resource function delete sessions/[string sessionId]() returns http:NoContent {
        supportAgent.clearMemory(sessionId);
        return http:NO_CONTENT;
    }
}

type ChatRequest record {|
    string message;
    string sessionId;
|};

type ChatResponse record {|
    string sessionId;
    string message;
    time:Utc timestamp;
|};

type SseEvent record {|
    string data;
|};
```

### Adding Authentication

Protect your agent API with JWT or API key authentication.

```ballerina
import ballerina/http;
import ballerina/jwt;

listener http:Listener securedListener = new (8090, {
    secureSocket: {
        key: {certFile: "server.crt", keyFile: "server.key"}
    }
});

// JWT-secured agent endpoint
@http:ServiceConfig {
    auth: [
        {
            jwtValidatorConfig: {
                issuer: "https://auth.example.com",
                audience: "support-agent-api",
                signatureConfig: {
                    jwksConfig: {url: "https://auth.example.com/.well-known/jwks.json"}
                }
            }
        }
    ]
}
service /api/v1/support on securedListener {

    resource function post chat(http:Request req, @http:Payload ChatRequest request)
            returns ChatResponse|error {
        // Extract user identity from JWT for session management
        string userId = check extractUserId(req);
        string sessionKey = string `${userId}:${request.sessionId}`;

        string response = check supportAgent.chat(request.message, sessionKey);
        return {sessionId: request.sessionId, message: response, timestamp: time:utcNow()};
    }
}

function extractUserId(http:Request req) returns string|error {
    string authHeader = check req.getHeader("Authorization");
    // Parse and validate JWT, extract subject claim
    jwt:Payload payload = check jwt:validate(authHeader.substring(7));
    return payload.sub ?: "anonymous";
}
```

### Rate Limiting

Protect against abuse and control costs with rate limiting.

```ballerina
import ballerina/http;
import ballerina/cache;

final cache:Cache rateLimiter = new ({
    capacity: 10000,
    evictionFactor: 0.2,
    defaultMaxAge: 60  // 1-minute window
});

service /api/v1/support on new http:Listener(8090) {

    resource function post chat(@http:Header string? x\-api\-key,
            @http:Payload ChatRequest request)
            returns ChatResponse|http:TooManyRequests|error {

        string clientId = x\-api\-key ?: "anonymous";

        // Check rate limit (10 requests per minute)
        if check isRateLimited(clientId, 10) {
            return http:TOO_MANY_REQUESTS;
        }

        string response = check supportAgent.chat(request.message, request.sessionId);
        return {sessionId: request.sessionId, message: response, timestamp: time:utcNow()};
    }
}

function isRateLimited(string clientId, int maxRequests) returns boolean|error {
    int|error count = rateLimiter.get(clientId).ensureType();
    int current = count is int ? count : 0;
    if current >= maxRequests {
        return true;
    }
    check rateLimiter.put(clientId, current + 1);
    return false;
}
```

## GraphQL Agent API

Expose agents through GraphQL for clients that need flexible query structures.

```ballerina
import ballerina/graphql;

service /graphql on new graphql:Listener(8090) {

    // Query: get conversation history
    resource function get conversation(string sessionId) returns Message[]|error {
        return check supportAgent.getHistory(sessionId);
    }

    // Mutation: send a chat message
    remote function chat(string sessionId, string message) returns ChatResult|error {
        string response = check supportAgent.chat(message, sessionId);
        return {
            sessionId,
            response,
            timestamp: time:utcNow()
        };
    }

    // Mutation: clear session
    remote function clearSession(string sessionId) returns boolean {
        supportAgent.clearMemory(sessionId);
        return true;
    }
}

type Message record {|
    string role;
    string content;
    time:Utc timestamp;
|};

type ChatResult record {|
    string sessionId;
    string response;
    time:Utc timestamp;
|};
```

## WebSocket Agent API

Use WebSocket for real-time, bidirectional chat interfaces where latency matters.

```ballerina
import ballerina/websocket;

service /ws/chat on new websocket:Listener(8090) {

    resource function get [string sessionId](http:Request req)
            returns websocket:Service|websocket:UpgradeError {
        return new ChatWebSocketService(sessionId);
    }
}

service class ChatWebSocketService {
    *websocket:Service;

    private final string sessionId;

    function init(string sessionId) {
        self.sessionId = sessionId;
    }

    remote function onMessage(websocket:Caller caller, string message) returns error? {
        // Stream the response token by token over WebSocket
        stream<string, error?> tokens = check supportAgent.chatStream(
            message, self.sessionId
        );

        check from string token in tokens
            do {
                check caller->writeMessage(token);
            };

        // Send end-of-message marker
        check caller->writeMessage("[DONE]");
    }

    remote function onClose(websocket:Caller caller) {
        supportAgent.clearMemory(self.sessionId);
    }
}
```

## Structured Response Patterns

### Typed Agent Responses

Return structured data alongside the agent's natural language response.

```ballerina
type AgentApiResponse record {|
    string message;           // Natural language response
    string sessionId;
    ToolUsage[] toolsUsed;    // Which tools were called
    int tokensUsed;           // Token consumption
    decimal latencyMs;        // Response time
|};

type ToolUsage record {|
    string toolName;
    json input;
    json output;
|};
```

### Error Responses

Return consistent error structures for client applications.

```ballerina
type AgentError record {|
    string code;
    string message;
    string? suggestion;
|};

service /api/v1/support on new http:Listener(8090) {

    resource function post chat(@http:Payload ChatRequest request)
            returns ChatResponse|http:BadRequest|http:InternalServerError {
        if request.message.trim().length() == 0 {
            return <http:BadRequest>{
                body: <AgentError>{
                    code: "EMPTY_MESSAGE",
                    message: "Message cannot be empty",
                    suggestion: "Provide a non-empty message in the request body"
                }
            };
        }

        ChatResponse|error result = processChat(request);
        if result is error {
            return <http:InternalServerError>{
                body: <AgentError>{
                    code: "AGENT_ERROR",
                    message: "The agent encountered an error processing your request",
                    suggestion: "Try again or simplify your request"
                }
            };
        }
        return result;
    }
}
```

## What's Next

- [Chat Agents](chat-agents.md) — Core chat agent patterns and configuration
- [Memory Configuration](memory-configuration.md) — Manage conversation state across API calls
- [Token & Cost Management](/docs/genai/guardrails/token-cost-management) — Control costs for API-exposed agents
- [Performance Metrics](/docs/genai/agent-observability/performance-metrics) — Monitor agent API performance
