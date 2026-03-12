---
sidebar_position: 1
title: "Tutorial: AI Customer Support Agent"
description: Build an AI customer support agent that queries a product database, looks up orders, and creates support tickets.
---

# Tutorial: AI Customer Support Agent

**Time:** 30 minutes | **Level:** Intermediate | **What you'll build:** A customer support agent that queries a product database, looks up order status, and creates support tickets.

In this tutorial, you build a fully functional AI customer support agent that connects to a product database, an order management API, and a ticketing system. The agent can answer product questions, check order status, and escalate issues by creating tickets -- all through natural conversation.

## Prerequisites

- [WSO2 Integrator VS Code extension installed](/docs/get-started/install)
- An OpenAI API key (or another supported LLM provider)
- A running database (MySQL, PostgreSQL, or H2 for development)

## Architecture

```
                        ┌─────────────────┐
                        │   Chat Agent    │
                        │                 │
User Message ──────────►│  System Prompt  │
                        │  + LLM (GPT-4o) │
                        │  + Tools        │
                        └────────┬────────┘
                                 │
                    ┌────────────┼────────────┐
                    ▼            ▼            ▼
            ┌──────────┐ ┌──────────┐ ┌──────────┐
            │ Product  │ │  Order   │ │ Ticket   │
            │ Database │ │   API    │ │  System  │
            └──────────┘ └──────────┘ └──────────┘
```

## Step 1: Create the Project

Create a new WSO2 Integrator project and add the required dependencies.

```toml
# Ballerina.toml
[package]
org = "myorg"
name = "customer_support_agent"
version = "0.1.0"

[[dependency]]
org = "ballerinax"
name = "ai.agent"

[[dependency]]
org = "ballerinax"
name = "ai.provider.openai"

[[dependency]]
org = "ballerinax"
name = "mysql"
```

## Step 2: Set Up Configuration

```toml
# Config.toml
openaiKey = "<your-openai-api-key>"
dbHost = "localhost"
dbPort = 3306
dbUser = "root"
dbPassword = "password"
dbName = "support_db"
```

```ballerina
// config.bal
configurable string openaiKey = ?;
configurable string dbHost = ?;
configurable int dbPort = ?;
configurable string dbUser = ?;
configurable string dbPassword = ?;
configurable string dbName = ?;
```

## Step 3: Define Data Types

```ballerina
// types.bal
type Product record {|
    string productId;
    string name;
    string category;
    decimal price;
    string description;
    int stockQuantity;
|};

type Order record {|
    string orderId;
    string customerId;
    string status;         // "pending", "shipped", "delivered", "cancelled"
    string orderDate;
    decimal total;
    string? trackingNumber;
    string? estimatedDelivery;
    OrderItem[] items;
|};

type OrderItem record {|
    string productId;
    string productName;
    int quantity;
    decimal unitPrice;
|};

type SupportTicket record {|
    string ticketId;
    string customerId;
    string subject;
    string description;
    string priority;
    string status;
|};
```

## Step 4: Create Database and API Clients

```ballerina
// clients.bal
import ballerinax/mysql;
import ballerina/http;

final mysql:Client productDb = check new ({
    host: dbHost, port: dbPort,
    user: dbUser, password: dbPassword,
    database: dbName
});

final http:Client orderApi = check new ("http://localhost:8080/api");
final http:Client ticketApi = check new ("http://localhost:8081/api");
```

## Step 5: Define Agent Tools

This is where you connect the agent to your enterprise systems. Each tool is a Ballerina function annotated with metadata that the LLM reads to decide when and how to call it.

```ballerina
// tools.bal
import ballerinax/ai.agent;

@agent:Tool {
    name: "searchProducts",
    description: "Search the product catalog by name or category. Returns matching products with pricing and availability. Use this when customers ask about products, pricing, or availability."
}
isolated function searchProducts(
    @agent:Param {description: "Search keyword or product name"} string query,
    @agent:Param {description: "Category filter: 'electronics', 'clothing', 'home', or 'all'"} string category = "all"
) returns json|error {
    if category == "all" {
        return check productDb->queryRows(
            `SELECT * FROM products WHERE name LIKE ${"%" + query + "%"} OR description LIKE ${"%" + query + "%"} LIMIT 5`
        );
    }
    return check productDb->queryRows(
        `SELECT * FROM products WHERE (name LIKE ${"%" + query + "%"} OR description LIKE ${"%" + query + "%"}) AND category = ${category} LIMIT 5`
    );
}

@agent:Tool {
    name: "getOrderStatus",
    description: "Look up the current status of a customer order by order ID (format: ORD-XXXXX). Returns status, tracking information, and estimated delivery date. Use this when customers ask about their order."
}
isolated function getOrderStatus(
    @agent:Param {description: "Order ID in the format ORD-XXXXX"} string orderId
) returns json|error {
    json|error result = orderApi->get(string `/orders/${orderId}`);
    if result is error {
        return {
            "found": false,
            "message": string `Order '${orderId}' not found.`,
            "suggestion": "Please verify the order ID. It should be in the format ORD-XXXXX."
        };
    }
    return result;
}

@agent:Tool {
    name: "getCustomerOrders",
    description: "Retrieve all orders for a customer by customer ID. Returns a list of recent orders. Use this when a customer wants to see their order history."
}
isolated function getCustomerOrders(
    @agent:Param {description: "Customer ID"} string customerId
) returns json|error {
    return check orderApi->get(string `/customers/${customerId}/orders?limit=5`);
}

@agent:Tool {
    name: "createSupportTicket",
    description: "Create a new support ticket for issues that need human follow-up. Returns the new ticket ID. Use this when you cannot resolve the issue directly or the customer requests escalation."
}
isolated function createSupportTicket(
    @agent:Param {description: "Customer ID"} string customerId,
    @agent:Param {description: "Brief subject line describing the issue"} string subject,
    @agent:Param {description: "Detailed description of the issue and what has been tried"} string description,
    @agent:Param {description: "Priority: 'low', 'medium', 'high', or 'critical'"} string priority = "medium"
) returns json|error {
    return check ticketApi->post("/tickets", {
        customerId, subject, description, priority
    });
}
```

## Step 6: Create the Agent

```ballerina
// agent.bal
import ballerinax/ai.agent;
import ballerinax/ai.provider.openai;

final openai:Client llmClient = check new ({
    auth: {token: openaiKey},
    model: "gpt-4o"
});

final agent:ChatAgent supportAgent = check new (
    model: llmClient,
    systemPrompt: string `You are a customer support assistant for Acme Corp.

Role:
- Help customers with product questions, order inquiries, and issue resolution.
- Be professional, friendly, and concise.

Tools:
- Use searchProducts to answer product questions (pricing, availability, features).
- Use getOrderStatus to check a specific order's status — never guess.
- Use getCustomerOrders to see a customer's order history.
- Use createSupportTicket when you cannot resolve an issue or the customer requests escalation.

Guidelines:
- Always verify information using tools before answering.
- If a customer seems frustrated, acknowledge their frustration empathetically.
- For returns and refunds, create a support ticket and explain the process.
- Keep responses under 150 words unless the customer asks for detail.
- Always include relevant order IDs or ticket IDs in your responses.`,
    tools: [searchProducts, getOrderStatus, getCustomerOrders, createSupportTicket],
    memory: new agent:MessageWindowChatMemory(maxMessages: 20)
);
```

## Step 7: Expose as an HTTP Service

```ballerina
// service.bal
import ballerina/http;
import ballerina/uuid;

type ChatRequest record {|
    string message;
    string? sessionId;
    string? customerId;
|};

type ChatResponse record {|
    string message;
    string sessionId;
|};

service /support on new http:Listener(8090) {

    resource function post chat(@http:Payload ChatRequest request) returns ChatResponse|error {
        string sessionId = request.sessionId ?: uuid:createType1().toString();

        // If customer ID is provided, inject it as context
        string message = request.message;
        if request.customerId is string {
            message = string `[Customer ID: ${<string>request.customerId}] ${message}`;
        }

        string response = check supportAgent.chat(message, sessionId);
        return {message: response, sessionId};
    }
}
```

## Step 8: Run and Test

1. Start the service:
   ```bash
   bal run
   ```

2. Test with curl:
   ```bash
   # Ask about a product
   curl -X POST http://localhost:8090/support/chat \
     -H "Content-Type: application/json" \
     -d '{"message": "Do you have wireless headphones under $50?", "customerId": "CUST-001"}'

   # Check order status (use the sessionId from the previous response)
   curl -X POST http://localhost:8090/support/chat \
     -H "Content-Type: application/json" \
     -d '{"message": "What is the status of order ORD-12345?", "sessionId": "<session-id>"}'

   # Escalate an issue
   curl -X POST http://localhost:8090/support/chat \
     -H "Content-Type: application/json" \
     -d '{"message": "I received a damaged product and want a refund", "sessionId": "<session-id>", "customerId": "CUST-001"}'
   ```

## Step 9: Add Guardrails

Add input and output guardrails for production safety.

```ballerina
import ballerinax/ai.guardrails;

final guardrails:InputGuardrail injectionGuard = new guardrails:PromptInjectionDetector({
    sensitivity: "medium"
});

final guardrails:InputGuardrail piiGuard = new guardrails:PiiDetector({
    detect: ["ssn", "credit_card"],
    action: "redact"
});

final agent:ChatAgent guardedSupportAgent = check new (
    model: llmClient,
    systemPrompt: supportSystemPrompt,
    tools: [searchProducts, getOrderStatus, getCustomerOrders, createSupportTicket],
    memory: new agent:MessageWindowChatMemory(maxMessages: 20),
    inputGuardrails: [injectionGuard, piiGuard]
);
```

## What You Built

You now have a customer support agent that:
- Searches a product database for product information
- Looks up order status and customer order history
- Creates support tickets for issues requiring human follow-up
- Maintains conversation context across multiple turns
- Protects against prompt injection and PII leakage

## What's Next

- [Multi-Agent Workflow](multi-agent-workflow.md) -- Split this into specialist agents
- [RAG Knowledge Base](rag-knowledge-base.md) -- Add a knowledge base for FAQ answers
- [Agent Tracing](/docs/genai/agent-observability/agent-tracing) -- Add observability
- [Content Filtering](/docs/genai/guardrails/content-filtering) -- Add content safety filters
