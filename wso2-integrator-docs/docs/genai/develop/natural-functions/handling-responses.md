---
sidebar_position: 3
title: Handling Natural Function Responses
description: Use natural functions and natural expressions in HTTP services, event handlers, and data pipelines.
---

# Handling Natural Function Responses

Natural functions and natural expressions return typed Ballerina values that you can use anywhere in your integration logic -- HTTP services, event handlers, data pipelines, and conditional flows.

## In HTTP Services

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

    resource function post summarize(@http:Payload DocumentPayload doc)
            returns SummaryResponse|error {
        string summary = check ai:natural<string>(
            "Summarize this document in 3 bullet points", doc.content
        );
        return {documentId: doc.id, summary};
    }
}
```

## In Event Handlers

```ballerina
import ballerinax/kafka;

listener kafka:Listener feedbackListener = new ("localhost:9092", {
    groupId: "sentiment-processor",
    topics: ["customer-feedback"]
});

service on feedbackListener {
    remote function onConsumerRecord(kafka:ConsumerRecord record) returns error? {
        string feedback = check string:fromBytes(record.value);

        SentimentResult sentiment = check classifySentiment(feedback);

        if sentiment.sentiment == "negative" && sentiment.confidence > 0.8 {
            check alertService->notify("Negative feedback detected", feedback);
        }

        check analyticsDb->insert(feedback, sentiment);
    }
}
```

## In Data Pipelines

```ballerina
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

## In Conditional Logic

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

## Natural Expressions vs. Natural Functions

| Feature | Natural Expressions | Natural Functions |
|---------|--------------------|--------------------|
| **Syntax** | Inline expression | Function declaration |
| **Reusability** | One-off, inline | Named, reusable across modules |
| **Type safety** | Generic type parameter | Function return type |
| **Best for** | Quick transformations in a flow | Reusable LLM operations |
| **Testing** | Harder to mock in isolation | Easy to mock as a function |

Use natural expressions for quick, inline transformations. Use natural functions when the same LLM operation is reused across multiple services or modules.

## Per-Expression Model Override

Override the default model for a specific natural expression.

```ballerina
string result = check ai:natural<string>(
    "Translate to Spanish",
    inputText,
    model = {provider: "openai", name: "gpt-4o-mini", temperature: 0.1}
);
```

## What's Next

- [Defining Natural Functions](/docs/genai/develop/natural-functions/defining) -- Create natural function signatures
- [Constructing Prompts](/docs/genai/develop/natural-functions/constructing-prompts) -- Write effective descriptions
- [Creating an AI Agent](/docs/genai/develop/agents/creating-agent) -- When you need multi-step reasoning
