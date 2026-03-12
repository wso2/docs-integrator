---
sidebar_position: 1
title: Creating an AI Agent
description: Build interactive chat agents and task agents with system prompts, tools, and memory.
---

# Creating an AI Agent

Chat agents are conversational AI components that maintain context across multiple user interactions. They combine an LLM's reasoning with tools and memory to create intelligent, interactive experiences within your integrations.

## Creating a Basic Chat Agent

The simplest chat agent needs a model connection, a system prompt, and optionally tools and memory.

```ballerina
import ballerinax/ai.agent;
import ballerinax/ai.provider.openai;

configurable string openAiApiKey = ?;

final openai:Client llmClient = check new ({
    auth: {token: openAiApiKey},
    model: "gpt-4o"
});

final agent:ChatAgent helpDeskAgent = check new (
    model: llmClient,
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

The system prompt defines your agent's personality, capabilities, and constraints.

```ballerina
string systemPrompt = string `You are a financial analyst assistant for Acme Corp.

Role and Scope:
- Help employees analyze quarterly financial data.
- Generate summaries of revenue, expenses, and profit trends.

Rules:
- Never reveal raw database queries or internal system details.
- Round all currency values to two decimal places.
- If asked about topics outside financial analysis, politely redirect.

Response Format:
- Use bullet points for lists of data points.
- Include percentage changes when comparing periods.
- Summarize key takeaways at the end of each analysis.`;
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

Chat agents automatically maintain conversation context through their memory component.

```ballerina
import ballerina/http;

service /helpdesk on new http:Listener(8090) {

    resource function post chat(@http:Payload ChatMessage request) returns ChatResponse|error {
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
```

## Task Agents

Task agents complete a specific task and return a structured result. They are best for data extraction, classification, and automated processing.

```ballerina
final agent:TaskAgent classifierAgent = check new (
    model: llmClient,
    systemPrompt: "Classify the incoming support ticket.",
    outputType: TicketClassification
);

TicketClassification result = check classifierAgent.run("I can't connect to the API");
```

## Configuring Agent Behavior

### Temperature and Creativity

```ballerina
final agent:ChatAgent preciseAgent = check new (
    model: llmClient,
    systemPrompt: "You are a data analyst. Be precise and factual.",
    modelParams: {
        temperature: 0.1,   // Lower = more deterministic
        topP: 0.5
    }
);
```

### Maximum Iterations

Limit how many reason-act-observe loops the agent can perform per request.

```ballerina
final agent:ChatAgent boundedAgent = check new (
    model: llmClient,
    systemPrompt: "You are a research assistant.",
    tools: [searchDatabase, fetchDocument],
    maxIterations: 5
);
```

## Session Management

### Session Isolation

Each session ID creates an independent conversation thread.

```ballerina
string r1 = check agent.chat("Hello!", "user-alice-session-1");
string r2 = check agent.chat("Hello!", "user-bob-session-1");
string r3 = check agent.chat("Follow up", "user-alice-session-1");  // Only sees Alice's history
```

### Session Cleanup

```ballerina
resource function delete session/[string sessionId]() returns http:Ok {
    helpDeskAgent.clearMemory(sessionId);
    return http:OK;
}
```

## Streaming Chat Responses

Stream agent responses token by token for a more responsive experience.

```ballerina
resource function post chat(@http:Payload ChatMessage request)
        returns stream<http:SseEvent, error?>|error {
    stream<string, error?> tokenStream = check helpDeskAgent.chatStream(
        request.message,
        request.sessionId
    );

    return tokenStream.'map(
        isolated function(string token) returns http:SseEvent {
            return {data: token, event: "token"};
        }
    );
}
```

## Handling Errors

Design tools to return descriptive error information so the LLM can communicate issues naturally.

```ballerina
@agent:Tool {
    name: "getAccountBalance",
    description: "Retrieve the current balance for a bank account"
}
isolated function getAccountBalance(string accountId) returns json|error {
    json|error result = trap bankApi->getBalance(accountId);
    if result is error {
        return {
            "status": "error",
            "message": string `Unable to retrieve balance for account ${accountId}. ` +
                       "The banking system may be temporarily unavailable."
        };
    }
    return result;
}
```

## What's Next

- [Adding Tools](/docs/genai/develop/agents/adding-tools) -- Connect agents to functions and APIs
- [Adding Memory](/docs/genai/develop/agents/adding-memory) -- Configure conversation history
- [Advanced Configuration](/docs/genai/develop/agents/advanced-config) -- Multi-agent orchestration and API exposure
