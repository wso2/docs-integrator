---
sidebar_position: 3
title: "Tutorial: Multi-Agent Workflow"
description: Build a multi-agent system with a coordinator and specialist agents for complex customer support.
---

# Tutorial: Multi-Agent Workflow

**Time:** 40 minutes | **Level:** Advanced | **What you'll build:** A multi-agent system where a coordinator routes requests to specialist agents for billing, technical support, and general inquiries.

In this tutorial, you build a customer support system that uses multiple specialized agents instead of a single monolithic agent. A coordinator agent classifies the incoming request and delegates to the appropriate specialist, each configured with focused tools and system prompts. This pattern improves reliability by giving each agent a smaller, more focused set of responsibilities.

## Prerequisites

- [WSO2 Integrator VS Code extension installed](/docs/get-started/install)
- An OpenAI API key
- Familiarity with [Agent Architecture & Concepts](/docs/genai/agents/architecture-concepts)

## Architecture

```
                     ┌─────────────────┐
User Message ───────►│   Coordinator   │
                     │   (Router)      │
                     └────────┬────────┘
                              │ classifies
              ┌───────────────┼───────────────┐
              ▼               ▼               ▼
     ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
     │   Billing    │ │  Technical   │ │   General    │
     │   Agent      │ │   Agent      │ │   Agent      │
     │              │ │              │ │              │
     │ getInvoice   │ │ checkApiStat │ │ getAccount   │
     │ processRefund│ │ getErrorLogs │ │ searchFAQ    │
     │ updatePlan   │ │ getDocs      │ │ submitFeedba │
     └──────────────┘ └──────────────┘ └──────────────┘
```

## Step 1: Create the Project

```toml
# Ballerina.toml
[package]
org = "myorg"
name = "multi_agent_support"
version = "0.1.0"

[[dependency]]
org = "ballerinax"
name = "ai.agent"

[[dependency]]
org = "ballerinax"
name = "ai.provider.openai"
```

```toml
# Config.toml
openaiKey = "<your-openai-api-key>"
```

## Step 2: Define the Router Agent

The router agent uses a cheap, fast model to classify requests and route them.

```ballerina
// router.bal
import ballerinax/ai.agent;
import ballerinax/ai.provider.openai;

configurable string openaiKey = ?;

// Use a fast, cheap model for routing
final openai:Client routerModel = check new ({
    auth: {token: openaiKey},
    model: "gpt-4o-mini",
    temperature: 0.1
});

type RouteDecision record {|
    "billing"|"technical"|"general" category;
    string reasoning;
|};

final agent:TaskAgent routerAgent = check new (
    model: routerModel,
    systemPrompt: string `Classify the incoming customer message into exactly one category:

- "billing": Payment issues, invoices, refunds, subscription changes, pricing questions
- "technical": API errors, integration failures, configuration help, bug reports, documentation questions
- "general": Account info, product questions, feedback, feature requests, anything else

Return the category and a brief reason for your classification.`,
    outputType: RouteDecision
);
```

## Step 3: Define Specialist Agent Tools

```ballerina
// billing_tools.bal
@agent:Tool {
    name: "getInvoice",
    description: "Retrieve an invoice by invoice ID (format: INV-XXXXX). Returns invoice details, amount, and payment status."
}
isolated function getInvoice(
    @agent:Param {description: "Invoice ID"} string invoiceId
) returns json|error {
    return check billingApi->get(string `/invoices/${invoiceId}`);
}

@agent:Tool {
    name: "processRefund",
    description: "Submit a refund request. Returns a confirmation with the refund ticket ID. Always confirm the amount with the customer before calling this."
}
isolated function processRefund(
    @agent:Param {description: "Order ID to refund"} string orderId,
    @agent:Param {description: "Refund amount in USD"} decimal amount,
    @agent:Param {description: "Reason for refund"} string reason
) returns json|error {
    return check billingApi->post("/refunds", {orderId, amount, reason});
}

@agent:Tool {
    name: "getSubscription",
    description: "Retrieve current subscription details for a customer."
}
isolated function getSubscription(
    @agent:Param {description: "Customer ID"} string customerId
) returns json|error {
    return check billingApi->get(string `/customers/${customerId}/subscription`);
}
```

```ballerina
// technical_tools.bal
@agent:Tool {
    name: "checkApiStatus",
    description: "Check the current status of an API endpoint. Returns uptime, recent errors, and health."
}
isolated function checkApiStatus(
    @agent:Param {description: "API endpoint path, e.g., '/v1/orders'"} string endpoint
) returns json|error {
    return check monitoringApi->get(string `/status?endpoint=${endpoint}`);
}

@agent:Tool {
    name: "getRecentErrors",
    description: "Retrieve recent error logs for a customer's API integration. Returns the last 10 errors."
}
isolated function getRecentErrors(
    @agent:Param {description: "Customer API key or customer ID"} string identifier
) returns json|error {
    return check monitoringApi->get(string `/errors?customer=${identifier}&limit=10`);
}

@agent:Tool {
    name: "searchDocumentation",
    description: "Search the technical documentation for solutions to common issues."
}
isolated function searchDocumentation(
    @agent:Param {description: "Search query"} string query
) returns json|error {
    return check docsApi->get(string `/search?q=${query}&limit=3`);
}
```

```ballerina
// general_tools.bal
@agent:Tool {
    name: "getAccountInfo",
    description: "Retrieve account information for a customer."
}
isolated function getAccountInfo(
    @agent:Param {description: "Customer ID"} string customerId
) returns json|error {
    return check accountApi->get(string `/customers/${customerId}`);
}

@agent:Tool {
    name: "submitFeedback",
    description: "Submit customer feedback or a feature request."
}
isolated function submitFeedback(
    @agent:Param {description: "Feedback category: 'feature_request', 'complaint', 'praise', 'suggestion'"} string category,
    @agent:Param {description: "Detailed feedback text"} string feedback
) returns json|error {
    return check feedbackApi->post("/feedback", {category, feedback});
}
```

## Step 4: Create Specialist Agents

```ballerina
// agents.bal

// Use a more capable model for specialist reasoning
final openai:Client specialistModel = check new ({
    auth: {token: openaiKey},
    model: "gpt-4o",
    temperature: 0.3
});

final agent:ChatAgent billingAgent = check new (
    model: specialistModel,
    systemPrompt: string `You are a billing support specialist.

Scope: Handle invoice inquiries, refund requests, subscription changes, and pricing questions.

Guidelines:
- Always look up the invoice or subscription before answering billing questions.
- Confirm refund amounts with the customer before processing.
- For subscription changes, explain the pricing difference.
- Be empathetic when customers are frustrated about charges.`,
    tools: [getInvoice, processRefund, getSubscription],
    memory: new agent:MessageWindowChatMemory(maxMessages: 15)
);

final agent:ChatAgent technicalAgent = check new (
    model: specialistModel,
    systemPrompt: string `You are a technical support engineer.

Scope: Handle API errors, integration failures, configuration issues, and documentation questions.

Guidelines:
- Check API status and recent error logs before diagnosing.
- Search documentation for known solutions.
- Provide step-by-step troubleshooting instructions.
- If the issue requires engineering escalation, explain what information to include in a ticket.`,
    tools: [checkApiStatus, getRecentErrors, searchDocumentation],
    memory: new agent:MessageWindowChatMemory(maxMessages: 15)
);

final agent:ChatAgent generalAgent = check new (
    model: specialistModel,
    systemPrompt: string `You are a general support assistant.

Scope: Handle account inquiries, product questions, feedback, and feature requests.

Guidelines:
- Look up account info before answering account-related questions.
- Record all feedback through the submitFeedback tool.
- For questions outside your scope, explain that you will route them to a specialist.`,
    tools: [getAccountInfo, submitFeedback],
    memory: new agent:MessageWindowChatMemory(maxMessages: 15)
);
```

## Step 5: Build the Routing Service

```ballerina
// service.bal
import ballerina/http;
import ballerina/uuid;
import ballerina/log;

type ChatRequest record {|
    string message;
    string? sessionId;
|};

type ChatResponse record {|
    string message;
    string sessionId;
    string routedTo;
|};

service /support on new http:Listener(8090) {

    resource function post chat(@http:Payload ChatRequest request) returns ChatResponse|error {
        string sessionId = request.sessionId ?: uuid:createType1().toString();

        // Step 1: Route the message
        RouteDecision route = check routerAgent.run(request.message);
        log:printInfo("Request routed",
            category = route.category,
            reasoning = route.reasoning,
            sessionId = sessionId
        );

        // Step 2: Delegate to the specialist agent
        string response;
        match route.category {
            "billing" => {
                response = check billingAgent.chat(request.message, sessionId);
            }
            "technical" => {
                response = check technicalAgent.chat(request.message, sessionId);
            }
            _ => {
                response = check generalAgent.chat(request.message, sessionId);
            }
        }

        return {
            message: response,
            sessionId,
            routedTo: route.category
        };
    }
}
```

## Step 6: Run and Test

1. Start the service:
   ```bash
   bal run
   ```

2. Test routing to different agents:
   ```bash
   # Billing request
   curl -X POST http://localhost:8090/support/chat \
     -H "Content-Type: application/json" \
     -d '{"message": "I was charged twice on invoice INV-78901. I need a refund."}'

   # Technical request
   curl -X POST http://localhost:8090/support/chat \
     -H "Content-Type: application/json" \
     -d '{"message": "I am getting a 429 rate limit error when calling the /v1/orders API."}'

   # General request
   curl -X POST http://localhost:8090/support/chat \
     -H "Content-Type: application/json" \
     -d '{"message": "I would like to submit a feature request for bulk order imports."}'
   ```

3. Verify follow-up messages stay with the same specialist:
   ```bash
   curl -X POST http://localhost:8090/support/chat \
     -H "Content-Type: application/json" \
     -d '{"message": "Yes, please process the refund for the full amount.", "sessionId": "<session-id-from-billing-request>"}'
   ```

## Step 7: Add Observability

Track routing decisions and agent performance.

```ballerina
import ballerina/observe;

final observe:Counter routeCounter = new ("agent_route_total",
    "Routing decisions by category");

resource function post chat(@http:Payload ChatRequest request) returns ChatResponse|error {
    // ... routing logic ...

    routeCounter.increment(tags = {category: route.category});

    // ... delegation logic ...
}
```

## What You Built

You now have a multi-agent system that:
- Routes requests to the appropriate specialist using a fast classifier
- Uses cheap models for routing and powerful models for specialist work
- Maintains per-session conversation history within each specialist
- Logs routing decisions for debugging and analysis

## What's Next

- [Multi-Agent Orchestration](/docs/genai/agents/multi-agent-orchestration) -- Advanced patterns (pipeline, supervisor, fan-out)
- [Agent Tracing](/docs/genai/agent-observability/agent-tracing) -- Trace across agent boundaries
- [AI Customer Support Agent](ai-customer-support.md) -- Simpler single-agent version
- [Token & Cost Management](/docs/genai/guardrails/token-cost-management) -- Optimize costs across agents
