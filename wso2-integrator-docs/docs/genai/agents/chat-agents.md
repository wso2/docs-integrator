---
sidebar_position: 2
title: Build Chat Agents
description: Create interactive conversational agents with multi-turn memory and tool calling.
---

# Build Chat Agents

Chat agents are conversational AI components that maintain context across multiple user interactions. They combine an LLM's reasoning with tools and memory to create intelligent, interactive experiences within your integrations.

Use chat agents when you need multi-turn conversations, contextual follow-ups, or interactive data exploration through natural language.

## Creating a Basic Chat Agent

The simplest chat agent needs a model connection, a system prompt, and optionally tools and memory.

```ballerina
import ballerinax/ai.agent;
import ballerinax/openai.chat;

configurable string openAiApiKey = ?;

final agent:ChatAgent helpDeskAgent = check new (
    model: check new chat:Client({auth: {token: openAiApiKey}}),
    systemPrompt: string `You are a helpful IT help desk assistant.
        You help employees resolve common IT issues like password resets,
        VPN connectivity, and software installation.
        Always ask clarifying questions before suggesting solutions.
        Be concise and professional.`,
    tools: [resetPassword, checkVpnStatus, listInstalledSoftware],
    memory: new agent:MessageWindowChatMemory(maxMessages: 30)
);
```

## System Prompt Design

The system prompt defines your agent's personality, capabilities, and constraints. A well-crafted system prompt is the most important factor in agent quality.

```ballerina
string systemPrompt = string `You are a financial analyst assistant for Acme Corp.

Role and Scope:
- Help employees analyze quarterly financial data
- Generate summaries of revenue, expenses, and profit trends
- You have access to tools for querying the financial database

Rules:
- Never reveal raw database queries or internal system details
- Round all currency values to two decimal places
- If asked about topics outside financial analysis, politely redirect
- Always cite the data source and time period in your responses

Response Format:
- Use bullet points for lists of data points
- Include percentage changes when comparing periods
- Summarize key takeaways at the end of each analysis`;
```

### System Prompt Best Practices

| Practice | Example |
|----------|---------|
| Define the role clearly | "You are a customer support agent for an e-commerce platform" |
| Set boundaries | "Only answer questions about orders, returns, and products" |
| Specify output format | "Always respond with a brief summary followed by details" |
| Include constraints | "Never share customer personal data in responses" |
| Add tool usage guidance | "Use the orderLookup tool before answering order questions" |

## Multi-Turn Conversations

Chat agents automatically maintain conversation context through their memory component. Each call to `chat()` includes a session ID that links messages together.

```ballerina
import ballerina/http;

service /helpdesk on new http:Listener(8090) {

    resource function post chat(@http:Payload ChatMessage request) returns ChatResponse|error {
        // The session ID links messages into a conversation
        string response = check helpDeskAgent.chat(
            request.message,
            request.sessionId
        );
        return {response};
    }
}

type ChatMessage record {|
    string message;
    string sessionId;
|};

type ChatResponse record {|
    string response;
|};
```

Example conversation flow:

```
User (session: emp-42): "My VPN isn't connecting"
Agent: "I'll check your VPN status. What's your employee ID?"

User (session: emp-42): "It's EMP-1234"
Agent: [calls checkVpnStatus("EMP-1234")]
       "I can see your VPN certificate expired yesterday. I'll need to
        reset it. Would you like me to proceed?"

User (session: emp-42): "Yes please"
Agent: [calls resetVpnCertificate("EMP-1234")]
       "Your VPN certificate has been renewed. Please restart your
        VPN client and try connecting again."
```

## Configuring Agent Behavior

### Temperature and Creativity

Control how deterministic or creative the agent's responses are.

```ballerina
final agent:ChatAgent creativeAgent = check new (
    model: llmClient,
    systemPrompt: "You are a creative marketing copywriter.",
    modelParams: {
        temperature: 0.8,   // Higher = more creative/varied
        topP: 0.9
    }
);

final agent:ChatAgent preciseAgent = check new (
    model: llmClient,
    systemPrompt: "You are a data analyst. Be precise and factual.",
    modelParams: {
        temperature: 0.1,   // Lower = more deterministic/focused
        topP: 0.5
    }
);
```

### Maximum Iterations

Limit how many reason-act-observe loops the agent can perform per request to prevent runaway chains.

```ballerina
final agent:ChatAgent boundedAgent = check new (
    model: llmClient,
    systemPrompt: "You are a research assistant.",
    tools: [searchDatabase, fetchDocument, analyzeData],
    maxIterations: 5  // Stop after 5 tool-calling loops
);
```

### Timeout Configuration

Set a maximum time for agent responses to prevent long-running requests.

```ballerina
final agent:ChatAgent timedAgent = check new (
    model: llmClient,
    systemPrompt: "You are a quick-response assistant.",
    tools: [quickLookup],
    timeout: 30  // Maximum 30 seconds per request
);
```

## Session Management

### Session Isolation

Each session ID creates an independent conversation thread. Different users or conversations never share context.

```ballerina
// These are completely independent conversations
string r1 = check agent.chat("Hello!", "user-alice-session-1");
string r2 = check agent.chat("Hello!", "user-bob-session-1");
string r3 = check agent.chat("Follow up", "user-alice-session-1");  // Only sees Alice's history
```

### Session Cleanup

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

## Handling Errors in Chat Agents

Design your agent to handle tool failures gracefully so the LLM can communicate issues to the user naturally.

```ballerina
@agent:Tool {
    name: "getAccountBalance",
    description: "Retrieve the current balance for a bank account"
}
isolated function getAccountBalance(string accountId) returns json|error {
    json|error result = trap bankApi->getBalance(accountId);
    if result is error {
        // Return a descriptive message instead of crashing
        return {
            "status": "error",
            "message": string `Unable to retrieve balance for account ${accountId}. ` +
                       "The banking system may be temporarily unavailable."
        };
    }
    return result;
}
```

The agent will receive the error information and respond naturally, such as: "I'm unable to check your account balance right now because the banking system is temporarily unavailable. Please try again in a few minutes."

## Advanced: Streaming Chat Responses

Stream agent responses token by token for a more responsive user experience.

```ballerina
import ballerina/http;

service /helpdesk on new http:Listener(8090) {

    resource function post chat(@http:Payload ChatMessage request)
            returns stream<ChatToken, error?>|error {
        stream<string, error?> tokenStream = check helpDeskAgent.chatStream(
            request.message,
            request.sessionId
        );

        // Transform to typed response stream
        stream<ChatToken, error?> responseStream = tokenStream.'map(
            isolated function(string token) returns ChatToken {
                return {token};
            }
        );
        return responseStream;
    }
}

type ChatToken record {|
    string token;
|};
```

## What's Next

- [API-Exposed Agents](api-exposed-agents.md) — Expose agents as REST or GraphQL APIs
- [Memory Configuration](memory-configuration.md) — Fine-tune how agents remember conversations
- [Tool Binding](tool-binding.md) — Advanced tool patterns and function calling
- [Agent Tracing](/docs/genai/agent-observability/agent-tracing) — Monitor agent reasoning in production
