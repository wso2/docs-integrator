---
sidebar_position: 1
title: Defining Natural Functions
description: Create LLM-powered typed functions using the @ai:NaturalFunction annotation in Ballerina.
---

# Defining Natural Functions

Natural functions let you call an LLM as if it were a regular typed Ballerina function. Instead of manually constructing prompts and parsing responses, you define a function signature with natural language descriptions, and the compiler handles the LLM interaction.

This is the simplest way to add LLM intelligence to your integrations without building a full agent.

## What Are Natural Functions?

A natural function is a Ballerina function where:
- The **function signature** defines the input and output types
- The **description** tells the LLM what to do in natural language
- The **runtime** handles prompt construction, LLM invocation, and response parsing

```ballerina
import ballerinax/ai;

@ai:NaturalFunction {
    description: "Classify the sentiment of the given text as positive, negative, or neutral"
}
isolated function classifySentiment(string text) returns SentimentResult|error = external;

type SentimentResult record {|
    "positive"|"negative"|"neutral" sentiment;
    float confidence;
    string explanation;
|};
```

You call it like any other function:

```ballerina
SentimentResult result = check classifySentiment("This product exceeded my expectations!");
// result.sentiment == "positive"
```

## Simple Text-to-Text

```ballerina
@ai:NaturalFunction {
    description: "Translate the given text to the specified target language"
}
isolated function translate(
    string text,
    string targetLanguage
) returns string|error = external;

// Usage
string french = check translate("Hello, how are you?", "French");
```

## Text to Structured Type

```ballerina
type ContactInfo record {|
    string name;
    string? email;
    string? phone;
    string? company;
|};

@ai:NaturalFunction {
    description: "Extract contact information from unstructured text. Extract name, email, phone number, and company if present."
}
isolated function extractContact(string text) returns ContactInfo|error = external;

// Usage
ContactInfo contact = check extractContact(
    "Hi, I'm Jane Smith from Acme Corp. Reach me at jane@acme.com or 555-0123."
);
```

## Structured Input and Output

```ballerina
type Invoice record {|
    string invoiceId;
    string vendor;
    decimal amount;
    string currency;
    string date;
    InvoiceLineItem[] lineItems;
|};

type InvoiceSummary record {|
    string vendor;
    decimal totalAmount;
    string currency;
    int itemCount;
    string[] categories;
    boolean requiresApproval;
|};

@ai:NaturalFunction {
    description: "Analyze an invoice and produce a summary. Flag requiresApproval as true if the total exceeds $10,000 or contains consulting services."
}
isolated function analyzeInvoice(Invoice invoice) returns InvoiceSummary|error = external;
```

## Enum and Union Types

Natural functions work with Ballerina's type system for constrained outputs.

```ballerina
type TicketCategory "billing"|"technical"|"shipping"|"account"|"other";
type TicketPriority "low"|"medium"|"high"|"critical";

type TicketClassification record {|
    TicketCategory category;
    TicketPriority priority;
    string reasoning;
|};

@ai:NaturalFunction {
    description: "Classify a support ticket into a category and priority level. Use 'critical' priority only for service outages or security issues."
}
isolated function classifyTicket(string ticketText) returns TicketClassification|error = external;
```

## Configuring the Underlying Model

### Per-Function Model Override

```ballerina
@ai:NaturalFunction {
    description: "Summarize the given document in 2-3 sentences",
    model: {
        provider: "openai",
        name: "gpt-4o-mini",
        temperature: 0.3
    }
}
isolated function summarize(string document) returns string|error = external;
```

### Global Model Configuration

Set a default model for all natural functions in a module.

```toml
# Config.toml
[ballerinax.ai]
defaultProvider = "openai"
defaultModel = "gpt-4o"
apiKey = "sk-your-key-here"
temperature = 0.2
```

## Natural Functions vs. Agents

| Feature | Natural Functions | Agents |
|---------|-------------------|--------|
| **Use case** | Single-step transformations | Multi-step reasoning |
| **Tool calling** | No | Yes |
| **Memory** | No | Yes |
| **Conversation** | No | Yes |
| **Output** | Typed, predictable | Natural language |
| **Complexity** | Low | Medium-High |

Use natural functions when you need a simple LLM-powered transformation. Use agents when you need reasoning, tool calling, or multi-turn interaction.

## What's Next

- [Constructing Prompts for Natural Functions](/docs/genai/develop/natural-functions/constructing-prompts) -- Optimize your function descriptions
- [Handling Natural Function Responses](/docs/genai/develop/natural-functions/handling-responses) -- Use natural functions in services and pipelines
- [What is a Natural Function?](/docs/genai/key-concepts/what-is-natural-function) -- Conceptual overview
