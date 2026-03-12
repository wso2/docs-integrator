---
sidebar_position: 2
title: Natural Expressions
description: Use natural language expressions inline in Ballerina code to invoke LLMs as part of standard expressions.
---

# Natural Expressions

Natural expressions let you embed natural language directly into Ballerina expressions. Instead of calling a function or constructing a prompt, you write a natural language instruction inline, and the compiler translates it into an LLM call at runtime.

This is the most concise way to add LLM intelligence to your integration code. Where [natural functions](/docs/genai/agents/natural-functions) define reusable LLM-powered functions, natural expressions are for one-off inline transformations.

## What Are Natural Expressions?

A natural expression is a Ballerina expression that uses natural language to describe a transformation. The compiler generates the prompt, calls the configured LLM, and returns a typed result.

```ballerina
import ballerinax/ai;

// Inline natural expression — the LLM evaluates at runtime
string summary = ai:natural("Summarize this text in one sentence", article.content);
```

The expression behaves like any other Ballerina expression: it has a type, can be assigned to a variable, passed to a function, or used in a conditional.

## Basic Usage

### Text Transformation

```ballerina
// Translate text
string french = check ai:natural<string>("Translate to French", userMessage);

// Summarize
string summary = check ai:natural<string>("Summarize in 2 sentences", longDocument);

// Rewrite for tone
string professional = check ai:natural<string>(
    "Rewrite in a professional business tone", casualEmail
);
```

### Data Extraction

Extract structured data from unstructured text.

```ballerina
type Address record {|
    string street;
    string city;
    string state;
    string zipCode;
    string? country;
|};

// Extract a typed record from text
Address addr = check ai:natural<Address>(
    "Extract the mailing address from this text", customerEmail
);
```

### Classification

```ballerina
type Sentiment "positive"|"negative"|"neutral";

Sentiment mood = check ai:natural<Sentiment>(
    "Classify the sentiment of this feedback", feedbackText
);

if mood == "negative" {
    check escalateToSupport(feedbackText);
}
```

### Boolean Decisions

```ballerina
boolean isUrgent = check ai:natural<boolean>(
    "Is this support ticket describing an urgent production outage?", ticketBody
);

if isUrgent {
    check pageOnCallEngineer(ticketBody);
}
```

## Using Context

Pass multiple pieces of context to the natural expression.

```ballerina
// Multiple context values
string response = check ai:natural<string>(
    "Draft a personalized follow-up email based on the customer profile and their recent order",
    {customerProfile: profile, recentOrder: order, companyTone: "friendly and professional"}
);
```

## Type-Safe Output

Natural expressions use Ballerina's type system to constrain the LLM output.

### Record Types

```ballerina
type MeetingAction record {|
    string action;
    string assignee;
    string? deadline;
    "high"|"medium"|"low" priority;
|};

MeetingAction[] actions = check ai:natural<MeetingAction[]>(
    "Extract all action items from these meeting notes, including who is responsible and any deadlines",
    meetingTranscript
);
```

### Union Types

```ballerina
type TicketRoute "billing"|"technical"|"shipping"|"general";

TicketRoute route = check ai:natural<TicketRoute>(
    "Classify this support ticket into the most appropriate department", ticketText
);
```

### Array Types

```ballerina
string[] keywords = check ai:natural<string[]>(
    "Extract the top 5 keywords from this article", articleText
);
```

## Natural Expressions in Integration Flows

### In HTTP Services

```ballerina
import ballerina/http;

service /api on new http:Listener(8090) {

    resource function post summarize(@http:Payload DocumentPayload doc)
            returns SummaryResponse|error {
        string summary = check ai:natural<string>(
            "Summarize this document in 3 bullet points", doc.content
        );
        return {documentId: doc.id, summary};
    }

    resource function post classify(@http:Payload EmailPayload email)
            returns ClassificationResponse|error {
        string category = check ai:natural<"sales"|"support"|"spam"|"other">(
            "Classify this email", email.body
        );
        return {emailId: email.id, category};
    }
}
```

### In Data Pipelines

```ballerina
// Process a batch of customer reviews with inline natural expressions
function enrichReviews(Review[] reviews) returns EnrichedReview[]|error {
    return from Review r in reviews
        select {
            id: r.id,
            originalText: r.text,
            sentiment: check ai:natural<Sentiment>(
                "Classify the sentiment", r.text
            ),
            summary: check ai:natural<string>(
                "Summarize in one sentence", r.text
            ),
            topics: check ai:natural<string[]>(
                "List the main topics discussed", r.text
            )
        };
}
```

### In Conditional Logic

```ballerina
function processIncomingEmail(Email email) returns error? {
    boolean isSpam = check ai:natural<boolean>(
        "Is this email spam or unsolicited marketing?", email.body
    );
    if isSpam {
        check moveToSpam(email);
        return;
    }

    string department = check ai:natural<"sales"|"support"|"hr"|"general">(
        "Which department should handle this email?", email.body
    );
    check routeEmail(email, department);
}
```

## Configuring the Model

### Per-Expression Model Override

```ballerina
string result = check ai:natural<string>(
    "Translate to Spanish",
    inputText,
    model = {provider: "openai", name: "gpt-4o-mini", temperature: 0.1}
);
```

### Global Default Configuration

Set the default model for all natural expressions in your project.

```toml
# Config.toml
[ballerinax.ai]
defaultProvider = "openai"
defaultModel = "gpt-4o-mini"
apiKey = "sk-your-key"
temperature = 0.2
```

## Natural Expressions vs. Natural Functions

| Feature | Natural Expressions | Natural Functions |
|---------|--------------------|--------------------|
| **Syntax** | Inline expression | Function declaration |
| **Reusability** | One-off, inline | Named, reusable across modules |
| **Type safety** | Generic type parameter | Function return type |
| **Best for** | Quick transformations in a flow | Reusable LLM operations |
| **Testing** | Harder to mock in isolation | Easy to mock as a function |

Use natural expressions for quick, inline transformations. Use [natural functions](/docs/genai/agents/natural-functions) when the same LLM operation is reused across multiple services or modules.

## What's Next

- [Natural Functions](/docs/genai/agents/natural-functions) -- Define reusable LLM-powered functions
- [Prompt Engineering](prompt-engineering.md) -- Write better instructions for natural expressions
- [Model Selection](model-selection.md) -- Choose the best model for your use case
- [Managing Context Windows](managing-context-windows.md) -- Handle token limits with large inputs
