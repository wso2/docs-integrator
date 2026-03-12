---
sidebar_position: 2
title: "Build a Smart Calculator Assistant"
description: Build your first AI integration -- a calculator agent that uses tools to perform math operations.
---

# Build a Smart Calculator Assistant

**Time:** 10 minutes | **What you'll build:** A chat agent that understands natural language math requests and uses tool calling to perform calculations accurately.

This quick start demonstrates the core agent pattern: the LLM reasons about the user's request and decides which tools to call, while the tools handle the actual computation. This separation ensures that the LLM's reasoning guides the process but never performs the math itself.

## Prerequisites

- [WSO2 Integrator set up for AI](setup.md)
- An API key for an LLM provider (OpenAI, Anthropic, or Google)

## Step 1: Define Calculator Tools

Tools are Ballerina functions annotated with `@agent:Tool`. The annotation includes a description that tells the LLM when and how to use the tool.

```ballerina
import ballerinax/ai.agent;

@agent:Tool {
    name: "add",
    description: "Add two numbers together. Use this for addition operations."
}
isolated function add(
    @agent:Param {description: "First number"} float a,
    @agent:Param {description: "Second number"} float b
) returns float {
    return a + b;
}

@agent:Tool {
    name: "subtract",
    description: "Subtract the second number from the first. Use this for subtraction operations."
}
isolated function subtract(
    @agent:Param {description: "Number to subtract from"} float a,
    @agent:Param {description: "Number to subtract"} float b
) returns float {
    return a - b;
}

@agent:Tool {
    name: "multiply",
    description: "Multiply two numbers. Use this for multiplication operations."
}
isolated function multiply(
    @agent:Param {description: "First number"} float a,
    @agent:Param {description: "Second number"} float b
) returns float {
    return a * b;
}

@agent:Tool {
    name: "divide",
    description: "Divide the first number by the second. Returns an error if dividing by zero."
}
isolated function divide(
    @agent:Param {description: "Dividend (number to divide)"} float a,
    @agent:Param {description: "Divisor (number to divide by)"} float b
) returns float|error {
    if b == 0.0 {
        return error("Cannot divide by zero.");
    }
    return a / b;
}
```

## Step 2: Create the Agent

```ballerina
import ballerinax/ai.agent;
import ballerinax/openai.chat;

configurable string openAiApiKey = ?;

final agent:ChatAgent calculatorAgent = check new (
    model: check new chat:Client({auth: {token: openAiApiKey}}),
    systemPrompt: string `You are a smart calculator assistant.
        When users ask math questions, use your calculator tools to compute the answer.
        Always use the tools for arithmetic — never calculate in your head.
        Show the calculation steps in your response.
        For multi-step calculations, call tools sequentially.`,
    tools: [add, subtract, multiply, divide]
);
```

## Step 3: Expose as an HTTP Endpoint

```ballerina
import ballerina/http;

service /calculator on new http:Listener(8090) {

    resource function post chat(@http:Payload ChatRequest request) returns ChatResponse|error {
        string response = check calculatorAgent.chat(request.message, request.sessionId);
        return {message: response};
    }
}

type ChatRequest record {|
    string message;
    string sessionId;
|};

type ChatResponse record {|
    string message;
|};
```

## Step 4: Run and Test

1. Add your API key to `Config.toml`:

```toml
openAiApiKey = "sk-your-api-key-here"
```

2. Run the project:

```bash
bal run
```

3. Test with curl:

```bash
# Simple calculation
curl -X POST http://localhost:8090/calculator/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What is 42 multiplied by 17?", "sessionId": "test-1"}'

# Multi-step calculation
curl -X POST http://localhost:8090/calculator/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "If I have 150 items and I split them into 6 groups, then add 10 more to each group, how many items are in each group?", "sessionId": "test-2"}'
```

The agent will call `divide(150, 6)` to get 25, then call `add(25, 10)` to get 35, and explain the steps in its response.

## How It Works

The agent follows the **Reason-Act-Observe** loop:

1. **Reason** -- The LLM reads the user's message and decides which tool to call
2. **Act** -- The agent runtime executes the tool function
3. **Observe** -- The tool result is fed back to the LLM
4. **Repeat or Respond** -- The LLM decides whether another tool call is needed or it can respond

The LLM never performs arithmetic directly. It delegates all computation to the tools, ensuring accuracy.

## What's Next

- [Build a Sample Hotel Booking Agent](hotel-booking-agent.md) -- A more complete agent with memory and real-world tools
- [What is an AI Agent?](/docs/genai/key-concepts/what-is-ai-agent) -- Understand the agent architecture
- [What are Tools?](/docs/genai/key-concepts/what-are-tools) -- Learn about tool design patterns
