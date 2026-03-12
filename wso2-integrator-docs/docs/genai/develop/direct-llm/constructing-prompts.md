---
sidebar_position: 2
title: Constructing Prompts
description: Best practices for writing effective system prompts, tool descriptions, and structured output prompts.
---

# Constructing Prompts

Prompt engineering determines how well your agents, natural functions, and natural expressions perform. A well-crafted prompt turns an unpredictable LLM into a reliable integration component. Unlike chatbot prompts, integration prompts must produce consistent, structured, machine-parseable output that downstream systems can consume.

## System Prompt Design

The system prompt defines your agent's role, constraints, and behavior. It is the single most important configuration for any agent.

### Structure of a Good System Prompt

```ballerina
final agent:ChatAgent supportAgent = check new (
    model: llmClient,
    systemPrompt: string `You are a customer support assistant for Acme Corp.

Role:
- Help customers with order inquiries, returns, and product questions.
- You have access to the CRM and order management system through tools.

Constraints:
- Never reveal internal pricing formulas or margin data.
- Do not make promises about delivery dates -- always check the order tracking tool.
- If you cannot resolve an issue, offer to create a support ticket.

Tone:
- Professional, friendly, and concise.
- Use the customer's name when available.
- Keep responses under 200 words unless the customer asks for detail.

Tools:
- Use getCustomerDetails to look up customer information before answering account questions.
- Use getOrderStatus to check order status -- never guess.
- Use createSupportTicket when the issue needs human follow-up.`,
    tools: [getCustomerDetails, getOrderStatus, createSupportTicket]
);
```

### Key Elements

| Element | Purpose | Example |
|---------|---------|---------|
| **Role** | Who the agent is | "You are a billing support specialist" |
| **Scope** | What the agent handles | "Handle invoice inquiries, payment issues, refund requests" |
| **Constraints** | What the agent must not do | "Never disclose internal discount codes" |
| **Tone** | How the agent communicates | "Professional and empathetic" |
| **Tool guidance** | When to use which tool | "Always check inventory before confirming availability" |
| **Output format** | How to structure responses | "Respond with a numbered list of steps" |

## Tool Description Best Practices

Tool descriptions guide the LLM's decision about when and how to call a tool. They are a form of prompt engineering.

### Clear and Specific

```ballerina
// Poor: the LLM does not know when to use this
@agent:Tool {
    name: "getData",
    description: "Gets data from the system"
}

// Good: explains purpose, inputs, outputs, and when to use
@agent:Tool {
    name: "getOrderStatus",
    description: "Look up the current status of a customer order by order ID (format: ORD-XXXXX). Returns status (pending, shipped, delivered, cancelled), estimated delivery date, and tracking number if available. Use this when a customer asks about their order."
}
```

### Parameter Descriptions

```ballerina
@agent:Tool {
    name: "searchProducts",
    description: "Search the product catalog. Returns up to 10 matching products with name, price, and availability."
}
isolated function searchProducts(
    @agent:Param {description: "Search keyword or phrase (e.g., 'wireless headphones')"} string query,
    @agent:Param {description: "Category filter: 'electronics', 'clothing', 'home', 'outdoor', or 'all'"} string category = "all",
    @agent:Param {description: "Sort order: 'price_asc', 'price_desc', 'relevance', or 'rating'"} string sortBy = "relevance"
) returns json|error {
    // implementation
}
```

## Prompts for Structured Output

When the LLM must return data for downstream processing, be explicit about the expected format.

### Natural Function Descriptions

```ballerina
// Weak: vague instruction
@ai:NaturalFunction {
    description: "Analyze the invoice"
}

// Strong: specific structure and criteria
@ai:NaturalFunction {
    description: "Analyze the invoice and extract: vendor name, total amount, currency, line item count, and whether it requires approval. Flag requiresApproval as true if total exceeds $10,000 or any line item is categorized as consulting."
}
isolated function analyzeInvoice(Invoice invoice) returns InvoiceAnalysis|error = external;
```

### Classification Prompts

```ballerina
@ai:NaturalFunction {
    description: "Classify the support ticket into exactly one category. Choose from: billing (payment, invoice, refund issues), technical (API errors, integration failures, configuration), shipping (delivery, tracking, damaged items), account (login, profile, permissions). If unclear, choose the most likely category based on key terms."
}
isolated function classifyTicket(string ticketText) returns TicketClassification|error = external;
```

## Few-Shot Examples in Prompts

Include examples in system prompts to guide consistent behavior.

```ballerina
final agent:ChatAgent dataAgent = check new (
    model: llmClient,
    systemPrompt: string `You are a data analysis assistant. When users ask questions about data, use the queryDatabase tool to run SQL queries against the analytics database.

Examples of how to handle requests:

User: "How many orders did we get last month?"
Action: Call queryDatabase with "SELECT COUNT(*) as order_count FROM orders WHERE created_at >= DATE_TRUNC('month', CURRENT_DATE - INTERVAL '1 month') AND created_at < DATE_TRUNC('month', CURRENT_DATE)"

User: "Show me the top 5 customers by revenue"
Action: Call queryDatabase with "SELECT customer_name, SUM(total) as revenue FROM orders GROUP BY customer_name ORDER BY revenue DESC LIMIT 5"

User: "Delete all old records"
Action: Refuse. Explain that only SELECT queries are allowed for safety.`,
    tools: [queryDatabase]
);
```

## Chain-of-Thought for Complex Tasks

For multi-step reasoning, instruct the model to think step by step.

```ballerina
@ai:NaturalFunction {
    description: "Analyze the customer complaint and determine the appropriate resolution. Think step by step: (1) Identify the core issue. (2) Determine which product or service is affected. (3) Check if this matches a known issue pattern. (4) Recommend a resolution category: refund, replacement, credit, or escalation."
}
isolated function analyzeComplaint(string complaint) returns ComplaintResolution|error = external;
```

## Guardrail Prompts

Build safety constraints directly into your prompts.

```ballerina
systemPrompt: string `You are a financial data assistant.

Boundaries:
- Only answer questions about financial data available through your tools.
- If asked about topics outside finance (weather, sports, personal advice), politely redirect.
- Never provide investment advice or recommendations.
- Never speculate about future financial performance.
- If data is unavailable, say so instead of guessing.`
```

## Prompt Templates

Create reusable prompt templates for common patterns.

```ballerina
function buildClassificationPrompt(string[] categories, string guidance) returns string {
    string categoryList = string:'join(", ", ...categories);
    return string `Classify the input into exactly one of these categories: ${categoryList}.

${guidance}

Return only the category name, nothing else.`;
}

// Usage
@ai:NaturalFunction {
    description: buildClassificationPrompt(
        ["billing", "technical", "shipping", "general"],
        "Choose 'technical' for any API, integration, or system error issues. Choose 'billing' for payment, invoice, or subscription questions."
    )
}
isolated function classifyTicket(string text) returns string|error = external;
```

## Testing Prompts

When a prompt produces inconsistent results:

1. **Identify the failure mode** -- Is the LLM misclassifying, hallucinating, or producing the wrong format?
2. **Add specificity** -- Replace vague instructions with concrete criteria
3. **Add examples** -- Show the expected behavior for edge cases
4. **Add constraints** -- Explicitly list what the model should not do
5. **Lower temperature** -- Reduce randomness for deterministic tasks

```ballerina
import ballerina/test;

@test:Config {}
function testTicketClassification() returns error? {
    TicketClassification result = check classifyTicket("My API key isn't working and I get a 401 error");
    test:assertEquals(result.category, "technical");

    result = check classifyTicket("I was charged twice for my subscription");
    test:assertEquals(result.category, "billing");
}
```

## What's Next

- [Configuring Providers](/docs/genai/develop/direct-llm/configuring-providers) -- Choose the right model for your prompts
- [Handling Responses](/docs/genai/develop/direct-llm/handling-responses) -- Stream and process LLM output
- [Defining Natural Functions](/docs/genai/develop/natural-functions/defining) -- Build reusable LLM-powered functions
