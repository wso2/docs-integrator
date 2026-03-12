---
sidebar_position: 1
title: Model Selection
description: Choose the right LLM provider and model for your integration use case.
---

# Model Selection

WSO2 Integrator supports multiple LLM providers, giving you the flexibility to choose the best model for each use case. This page covers available providers, how to configure them, and guidelines for selecting the right model based on your requirements.

Different tasks demand different tradeoffs between capability, speed, cost, and data privacy. A sentiment classifier does not need the same model as a complex multi-agent workflow.

## Supported Providers

| Provider | Module | Models | Best For |
|----------|--------|--------|----------|
| **OpenAI** | `ballerinax/ai.provider.openai` | GPT-4o, GPT-4o-mini, o1, o3-mini | General purpose, strong tool calling |
| **Anthropic** | `ballerinax/ai.provider.anthropic` | Claude Sonnet, Claude Haiku | Long context, careful reasoning |
| **Google** | `ballerinax/ai.provider.google` | Gemini 2.0 Flash, Gemini 2.5 Pro | Multimodal, large context windows |
| **Azure OpenAI** | `ballerinax/ai.provider.azure` | GPT-4o (Azure-hosted) | Enterprise compliance, data residency |
| **AWS Bedrock** | `ballerinax/ai.provider.bedrock` | Claude, Titan, Llama | AWS ecosystem, VPC deployment |
| **Ollama** | `ballerinax/ai.provider.ollama` | Llama 3, Mistral, Phi-3 | Local/on-premises, no data leaves your network |

## Configuring Providers

### OpenAI

```ballerina
import ballerinax/ai.provider.openai;

configurable string openaiKey = ?;

final openai:Client llmClient = check new ({
    auth: {token: openaiKey},
    model: "gpt-4o"
});
```

### Anthropic

```ballerina
import ballerinax/ai.provider.anthropic;

configurable string anthropicKey = ?;

final anthropic:Client llmClient = check new ({
    auth: {token: anthropicKey},
    model: "claude-sonnet-4-20250514"
});
```

### Google Gemini

```ballerina
import ballerinax/ai.provider.google;

configurable string googleKey = ?;

final google:Client llmClient = check new ({
    auth: {token: googleKey},
    model: "gemini-2.0-flash"
});
```

### Azure OpenAI

```ballerina
import ballerinax/ai.provider.azure;

configurable string azureKey = ?;
configurable string azureEndpoint = ?;
configurable string deploymentId = ?;

final azure:Client llmClient = check new ({
    auth: {token: azureKey},
    endpoint: azureEndpoint,
    deploymentId: deploymentId,
    apiVersion: "2024-06-01"
});
```

### AWS Bedrock

```ballerina
import ballerinax/ai.provider.bedrock;

configurable string awsAccessKey = ?;
configurable string awsSecretKey = ?;

final bedrock:Client llmClient = check new ({
    auth: {
        accessKeyId: awsAccessKey,
        secretAccessKey: awsSecretKey
    },
    region: "us-east-1",
    model: "anthropic.claude-sonnet-4-20250514-v1:0"
});
```

### Ollama (Local)

```ballerina
import ballerinax/ai.provider.ollama;

final ollama:Client llmClient = check new ({
    endpoint: "http://localhost:11434",
    model: "llama3"
});
```

## Model Configuration Options

Every provider supports common configuration parameters.

```ballerina
final openai:Client llmClient = check new ({
    auth: {token: apiKey},
    model: "gpt-4o",
    temperature: 0.2,         // Lower = more deterministic (0.0 - 2.0)
    maxTokens: 2048,          // Maximum response length
    topP: 0.9,                // Nucleus sampling threshold
    frequencyPenalty: 0.0,    // Penalize repeated tokens
    presencePenalty: 0.0      // Penalize already-used tokens
});
```

### Temperature Guidelines

| Temperature | Behavior | Use Cases |
|-------------|----------|-----------|
| 0.0 - 0.2 | Highly deterministic, consistent outputs | Classification, data extraction, structured output |
| 0.3 - 0.7 | Balanced creativity and consistency | General chat, summarization, analysis |
| 0.8 - 1.5 | Creative, varied outputs | Content generation, brainstorming |

## Choosing a Model

### By Use Case

| Use Case | Recommended Model | Why |
|----------|-------------------|-----|
| Agent with tool calling | GPT-4o, Claude Sonnet | Strong function calling accuracy |
| Simple classification | GPT-4o-mini, Gemini Flash | Fast, low cost |
| Long document processing | Claude Sonnet, Gemini Pro | Large context windows (100K-1M tokens) |
| Data extraction | GPT-4o, Claude Sonnet | Reliable structured output |
| Cost-sensitive production | GPT-4o-mini, Gemini Flash, Claude Haiku | Low per-token cost |
| On-premises / air-gapped | Ollama (Llama, Mistral) | No external API calls |
| Enterprise compliance | Azure OpenAI, AWS Bedrock | Data residency, audit logging |
| Multi-step reasoning | o1, o3-mini, Claude Sonnet | Chain-of-thought reasoning |

### By Context Window Size

| Model | Context Window | Notes |
|-------|---------------|-------|
| GPT-4o | 128K tokens | Good balance of speed and context |
| GPT-4o-mini | 128K tokens | Budget option with large context |
| Claude Sonnet | 200K tokens | Largest context among top-tier models |
| Claude Haiku | 200K tokens | Budget option with large context |
| Gemini 2.5 Pro | 1M tokens | Largest available context window |
| Gemini 2.0 Flash | 1M tokens | Fast with very large context |
| Llama 3 (Ollama) | 8K-128K tokens | Varies by model variant |

### By Cost (Approximate)

| Model | Input Cost | Output Cost | Relative Cost |
|-------|-----------|-------------|---------------|
| GPT-4o-mini | Low | Low | $ |
| Gemini 2.0 Flash | Low | Low | $ |
| Claude Haiku | Low | Low | $ |
| GPT-4o | Medium | Medium | $$ |
| Claude Sonnet | Medium | Medium | $$ |
| Gemini 2.5 Pro | Medium-High | Medium-High | $$$ |
| o1 | High | High | $$$$ |

## Using Multiple Models

Assign different models to different tasks to optimize cost and capability.

```ballerina
// Cheap model for simple tasks
final openai:Client fastModel = check new ({
    auth: {token: apiKey},
    model: "gpt-4o-mini",
    temperature: 0.1
});

// Powerful model for complex reasoning
final openai:Client reasoningModel = check new ({
    auth: {token: apiKey},
    model: "gpt-4o",
    temperature: 0.3
});

// Router agent uses the cheap model
final agent:TaskAgent routerAgent = check new (
    model: fastModel,
    systemPrompt: "Classify the incoming request.",
    outputType: RouteDecision
);

// Specialist agents use the powerful model
final agent:ChatAgent specialistAgent = check new (
    model: reasoningModel,
    systemPrompt: "You are an expert support agent.",
    tools: [getCustomer, searchOrders]
);
```

## Environment-Based Configuration

Use Ballerina's `configurable` variables to switch models across environments.

```ballerina
configurable string llmProvider = "openai";
configurable string llmModel = "gpt-4o-mini";
configurable string llmApiKey = ?;

function createLlmClient() returns agent:LlmModel|error {
    match llmProvider {
        "openai" => {
            return check new openai:Client({auth: {token: llmApiKey}, model: llmModel});
        }
        "anthropic" => {
            return check new anthropic:Client({auth: {token: llmApiKey}, model: llmModel});
        }
        "ollama" => {
            return check new ollama:Client({endpoint: "http://localhost:11434", model: llmModel});
        }
        _ => {
            return error(string `Unsupported LLM provider: ${llmProvider}`);
        }
    }
}
```

```toml
# Config.toml — Development
llmProvider = "ollama"
llmModel = "llama3"
llmApiKey = "not-needed"

# Config.toml — Production
# llmProvider = "openai"
# llmModel = "gpt-4o"
# llmApiKey = "sk-..."
```

## What's Next

- [Natural Expressions](natural-expressions.md) -- Use natural language in Ballerina code
- [Prompt Engineering](prompt-engineering.md) -- Write effective prompts for your models
- [Streaming Responses](streaming-responses.md) -- Stream LLM output in real time
- [Token & Cost Management](/docs/genai/guardrails/token-cost-management) -- Control model spending
