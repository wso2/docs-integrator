---
sidebar_position: 1
title: What is an LLM?
description: Understand large language models and how they power AI integrations in WSO2 Integrator.
---

# What is an LLM?

A Large Language Model (LLM) is a neural network trained on vast amounts of text data that can understand and generate human language. LLMs are the reasoning engine behind AI agents, natural functions, and RAG pipelines in WSO2 Integrator.

## How LLMs Work

LLMs process text as **tokens** (roughly words or word fragments). Given input tokens, the model predicts the most likely next tokens, generating coherent text responses. Modern LLMs can follow instructions, answer questions, write code, and reason about complex problems.

### Key Concepts

| Concept | Description |
|---------|-------------|
| **Tokens** | The units LLMs process. One token is roughly 4 characters or 3/4 of a word. |
| **Context window** | The maximum number of tokens the model can process in a single request (input + output combined). |
| **Temperature** | Controls randomness. Lower values (0.0-0.2) produce deterministic output; higher values (0.7-1.5) produce varied, creative output. |
| **System prompt** | Instructions that define the model's role, behavior, and constraints. |

## LLM Providers in WSO2 Integrator

WSO2 Integrator supports multiple LLM providers through dedicated connector modules.

| Provider | Models | Best For |
|----------|--------|----------|
| **OpenAI** | GPT-4o, GPT-4o-mini, o1, o3-mini | General purpose, strong tool calling |
| **Anthropic** | Claude Sonnet, Claude Haiku | Long context, careful reasoning |
| **Google** | Gemini 2.0 Flash, Gemini 2.5 Pro | Multimodal, very large context windows |
| **Azure OpenAI** | GPT-4o (Azure-hosted) | Enterprise compliance, data residency |
| **AWS Bedrock** | Claude, Titan, Llama | AWS ecosystem, VPC deployment |
| **Ollama** | Llama 3, Mistral, Phi-3 | Local deployment, no data leaves your network |

## Connecting to an LLM in Ballerina

```ballerina
import ballerinax/ai.provider.openai;

configurable string apiKey = ?;

final openai:Client llmClient = check new ({
    auth: {token: apiKey},
    model: "gpt-4o",
    temperature: 0.2
});
```

## LLMs in Integration Scenarios

LLMs serve different roles depending on the integration pattern:

- **AI Agents** -- The LLM acts as the reasoning engine, deciding which tools to call and how to respond
- **Natural Functions** -- The LLM acts as a function body, transforming inputs to typed outputs
- **RAG Pipelines** -- The LLM generates answers grounded in retrieved document context
- **MCP Servers** -- External AI clients use their own LLMs to reason about your exposed tools

## Limitations to Understand

- **Knowledge cutoff** -- LLMs are trained on data up to a specific date and do not know about recent events
- **Hallucination** -- LLMs can generate plausible but incorrect information
- **Token limits** -- Every request must fit within the model's context window
- **Cost** -- LLM API calls are priced per token, which accumulates in high-volume systems

These limitations are why WSO2 Integrator pairs LLMs with tools, RAG, and guardrails to build reliable integrations.

## What's Next

- [What is a Natural Function?](what-is-natural-function.md) -- The simplest way to use an LLM in code
- [What is an AI Agent?](what-is-ai-agent.md) -- LLMs combined with tools and memory
- [Configuring LLM Providers](/docs/genai/develop/direct-llm/configuring-providers) -- Detailed provider setup
