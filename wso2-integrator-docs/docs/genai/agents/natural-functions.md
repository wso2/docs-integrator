---
sidebar_position: 7
title: Natural Functions
description: Use natural language function signatures to call LLMs as typed Ballerina functions.
---

# Natural Functions

Natural functions let you call an LLM as if it were a regular typed Ballerina function. Instead of manually constructing prompts and parsing responses, you define a function signature with natural language descriptions, and the compiler handles the LLM interaction.

This is the simplest way to add LLM intelligence to your integrations without building a full agent.

## What Are Natural Functions?

A natural function is a Ballerina function where:
- The **function signature** defines the input and output types
- The **description** tells the LLM what to do in natural language
- The **runtime** handles prompt construction, LLM invocation, and response parsing

```ballerina
import ballerinax/ai;

// The LLM acts as the function body — no implementation needed
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
// result.confidence == 0.95
// result.explanation == "The text expresses strong satisfaction with the product."
```

## Defining Natural Functions

### Simple Text-to-Text

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
// "Bonjour, comment allez-vous?"
```

### Text to Structured Type

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
// contact == {name: "Jane Smith", email: "jane@acme.com", phone: "555-0123", company: "Acme Corp"}
```

### Structured Input and Output

```ballerina
type Invoice record {|
    string invoiceId;
    string vendor;
    decimal amount;
    string currency;
    string date;
    InvoiceLineItem[] lineItems;
|};

type InvoiceLineItem record {|
    string description;
    int quantity;
    decimal unitPrice;
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

### Enum and Union Types

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

### Model Selection

Specify which LLM provider and model to use for a natural function.

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

```ballerina
// Config.toml
[ballerinax.ai]
defaultProvider = "openai"
defaultModel = "gpt-4o"
apiKey = "sk-your-key-here"
temperature = 0.2
```

## Using Natural Functions in Integrations

### In HTTP Services

```ballerina
import ballerina/http;

service /api on new http:Listener(8090) {

    resource function post classify(@http:Payload EmailRequest email)
            returns ClassificationResponse|error {
        TicketClassification classification = check classifyTicket(email.body);
        return {
            emailId: email.id,
            category: classification.category,
            priority: classification.priority
        };
    }

    resource function post extract\-contacts(@http:Payload TextPayload payload)
            returns ContactInfo|error {
        return check extractContact(payload.text);
    }
}
```

### In Event Handlers

```ballerina
import ballerinax/kafka;

listener kafka:Listener feedbackListener = new ("localhost:9092", {
    groupId: "sentiment-processor",
    topics: ["customer-feedback"]
});

service on feedbackListener {
    remote function onConsumerRecord(kafka:ConsumerRecord record) returns error? {
        string feedback = check string:fromBytes(record.value);

        // Use natural function to classify sentiment
        SentimentResult sentiment = check classifySentiment(feedback);

        // Route based on classification
        if sentiment.sentiment == "negative" && sentiment.confidence > 0.8 {
            check alertService->notify("Negative feedback detected", feedback);
        }

        check analyticsDb->insert(feedback, sentiment);
    }
}
```

### In Data Pipelines

```ballerina
// Process a batch of documents with natural functions
function processBatch(Document[] documents) returns ProcessedDocument[]|error {
    return from Document doc in documents
        select {
            id: doc.id,
            summary: check summarize(doc.content),
            contacts: check extractContact(doc.content),
            sentiment: check classifySentiment(doc.content)
        };
}
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

- [Natural Expressions](/docs/genai/llm-connectivity/natural-expressions) — Use natural language inline in Ballerina expressions
- [Prompt Engineering](/docs/genai/llm-connectivity/prompt-engineering) — Optimize your natural function descriptions
- [Model Selection](/docs/genai/llm-connectivity/model-selection) — Choose the best model for your use case
- [Token & Cost Management](/docs/genai/guardrails/token-cost-management) — Control costs for natural function calls
