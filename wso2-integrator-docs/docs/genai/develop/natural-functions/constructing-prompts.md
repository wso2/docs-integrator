---
sidebar_position: 2
title: Constructing Prompts for Natural Functions
description: Write effective descriptions for natural functions and natural expressions to get reliable, structured LLM output.
---

# Constructing Prompts for Natural Functions

The description you write for a natural function or natural expression is the prompt that the LLM sees. A well-crafted description is the difference between a reliable integration component and unpredictable output.

## Writing Effective Descriptions

### Be Specific About Output Structure

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

### Define Classification Criteria

```ballerina
@ai:NaturalFunction {
    description: "Classify the support ticket into exactly one category. Choose from: billing (payment, invoice, refund issues), technical (API errors, integration failures, configuration), shipping (delivery, tracking, damaged items), account (login, profile, permissions). If unclear, choose the most likely category based on key terms."
}
isolated function classifyTicket(string ticketText) returns TicketClassification|error = external;
```

### Include Output Constraints

```ballerina
@ai:NaturalFunction {
    description: "Generate a customer-facing summary of the order issue. Requirements: (1) Do not mention internal system names or error codes. (2) Do not promise specific resolution timelines. (3) Keep the summary under 100 words. (4) Use empathetic, professional language."
}
isolated function generateCustomerSummary(OrderIssue issue) returns string|error = external;
```

## Chain-of-Thought for Complex Tasks

For multi-step reasoning, instruct the model to think step by step.

```ballerina
@ai:NaturalFunction {
    description: "Analyze the customer complaint and determine the appropriate resolution. Think step by step: (1) Identify the core issue. (2) Determine which product or service is affected. (3) Check if this matches a known issue pattern. (4) Recommend a resolution category: refund, replacement, credit, or escalation."
}
isolated function analyzeComplaint(string complaint) returns ComplaintResolution|error = external;
```

## Natural Expression Prompts

Natural expressions use the same prompting principles in an inline format.

```ballerina
import ballerinax/ai;

// Classification
type Sentiment "positive"|"negative"|"neutral";
Sentiment mood = check ai:natural<Sentiment>(
    "Classify the sentiment of this feedback", feedbackText
);

// Data extraction
type Address record {|
    string street;
    string city;
    string state;
    string zipCode;
|};
Address addr = check ai:natural<Address>(
    "Extract the mailing address from this text", customerEmail
);

// Boolean decisions
boolean isUrgent = check ai:natural<boolean>(
    "Is this support ticket describing an urgent production outage?", ticketBody
);
```

### Multiple Context Values

```ballerina
string response = check ai:natural<string>(
    "Draft a personalized follow-up email based on the customer profile and their recent order",
    {customerProfile: profile, recentOrder: order, companyTone: "friendly and professional"}
);
```

## Prompt Templates

Create reusable prompt builders for common patterns.

```ballerina
function buildClassificationPrompt(string[] categories, string guidance) returns string {
    string categoryList = string:'join(", ", ...categories);
    return string `Classify the input into exactly one of these categories: ${categoryList}.

${guidance}

Return only the category name, nothing else.`;
}

@ai:NaturalFunction {
    description: buildClassificationPrompt(
        ["billing", "technical", "shipping", "general"],
        "Choose 'technical' for any API, integration, or system error issues."
    )
}
isolated function classifyTicket(string text) returns string|error = external;
```

## Testing Prompts

Validate that your prompts produce consistent, correct results.

```ballerina
import ballerina/test;

@test:Config {}
function testTicketClassification() returns error? {
    TicketClassification result = check classifyTicket("My API key isn't working and I get a 401 error");
    test:assertEquals(result.category, "technical");

    result = check classifyTicket("I was charged twice for my subscription");
    test:assertEquals(result.category, "billing");

    result = check classifyTicket("My package hasn't arrived and it's been two weeks");
    test:assertEquals(result.category, "shipping");
}
```

## What's Next

- [Defining Natural Functions](/docs/genai/develop/natural-functions/defining) -- Create natural function signatures
- [Handling Natural Function Responses](/docs/genai/develop/natural-functions/handling-responses) -- Use outputs in services and pipelines
- [Constructing Prompts (Direct LLM)](/docs/genai/develop/direct-llm/constructing-prompts) -- General prompt engineering techniques
