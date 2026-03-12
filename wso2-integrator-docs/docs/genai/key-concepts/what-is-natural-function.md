---
sidebar_position: 2
title: What is a Natural Function?
description: Understand natural functions -- LLM-powered typed function calls in Ballerina.
---

# What is a Natural Function?

A natural function is a Ballerina function where the implementation is provided by an LLM at runtime. You define the function signature and a natural language description of what it should do, and the compiler handles prompt construction, LLM invocation, and response parsing.

Natural functions are the simplest way to add LLM intelligence to your integrations without building a full agent.

## How Natural Functions Work

1. You declare a function with `@ai:NaturalFunction` and a description
2. The Ballerina compiler generates the prompt from the function signature and description
3. At runtime, the function sends the prompt and input to the configured LLM
4. The LLM's response is parsed and returned as a typed Ballerina value

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

## When to Use Natural Functions

| Scenario | Use Natural Functions | Use Agents |
|----------|:--------------------:|:----------:|
| Single-step text transformation | Yes | |
| Classification or categorization | Yes | |
| Data extraction from text | Yes | |
| Multi-step reasoning with tools | | Yes |
| Conversational interactions | | Yes |
| Tasks requiring memory | | Yes |

Natural functions are best for **single-step transformations** where you need the LLM to process an input and return a typed result without calling tools or maintaining state.

## Key Characteristics

- **Typed** -- Input and output types are enforced by Ballerina's type system
- **Stateless** -- No memory or conversation history
- **No tool calling** -- The LLM cannot call external functions
- **Reusable** -- Defined once, callable from anywhere in your code
- **Testable** -- Can be mocked and tested like any other function

## What's Next

- [What is an AI Agent?](what-is-ai-agent.md) -- For multi-step reasoning with tools
- [Defining Natural Functions](/docs/genai/develop/natural-functions/defining) -- Detailed implementation guide
- [Constructing Prompts for Natural Functions](/docs/genai/develop/natural-functions/constructing-prompts) -- Write effective descriptions
