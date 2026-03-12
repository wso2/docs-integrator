---
sidebar_position: 1
title: Setting Up WSO2 Integrator for AI
description: Install and configure WSO2 Integrator with AI dependencies for building GenAI integrations.
---

# Setting Up WSO2 Integrator for AI

Before building AI integrations, you need the WSO2 Integrator development environment set up with the correct AI dependencies. This page walks you through the installation, project setup, and configuration required to start building agents, RAG pipelines, and MCP servers.

## Prerequisites

- [WSO2 Integrator VS Code extension installed](/docs/get-started/install)
- An LLM provider API key (OpenAI, Anthropic, Google, or Azure)
- Ballerina Swan Lake installed (bundled with WSO2 Integrator)

## Step 1: Create a New Integration Project

Open VS Code with the WSO2 Integrator extension and create a new project.

```bash
bal new my_ai_project
cd my_ai_project
```

## Step 2: Add AI Dependencies

Add the required AI packages to your `Ballerina.toml` file depending on your use case.

### For AI Agents

```toml
# Ballerina.toml
[package]
org = "myorg"
name = "my_ai_project"
version = "0.1.0"

[build-options]
observabilityIncluded = true

[[dependency]]
org = "ballerinax"
name = "ai.agent"
version = "0.8.0"
```

### For RAG Applications

```toml
[[dependency]]
org = "ballerinax"
name = "ai.rag"
version = "1.0.0"

[[dependency]]
org = "ballerinax"
name = "openai.embeddings"
version = "1.0.0"

[[dependency]]
org = "ballerinax"
name = "chromadb"
version = "0.5.0"
```

### For MCP Servers

```toml
[[dependency]]
org = "ballerinax"
name = "mcp"
version = "1.0.0"
```

## Step 3: Configure Your LLM Provider

Create a `Config.toml` file in your project root with your LLM provider credentials.

### OpenAI

```toml
# Config.toml
openAiApiKey = "sk-your-api-key-here"
```

```ballerina
import ballerinax/ai.provider.openai;

configurable string openAiApiKey = ?;

final openai:Client llmClient = check new ({
    auth: {token: openAiApiKey},
    model: "gpt-4o"
});
```

### Anthropic

```toml
# Config.toml
anthropicApiKey = "sk-ant-your-key-here"
```

```ballerina
import ballerinax/ai.provider.anthropic;

configurable string anthropicApiKey = ?;

final anthropic:Client llmClient = check new ({
    auth: {token: anthropicApiKey},
    model: "claude-sonnet-4-20250514"
});
```

### Google Gemini

```toml
# Config.toml
googleApiKey = "your-google-key-here"
```

```ballerina
import ballerinax/ai.provider.google;

configurable string googleApiKey = ?;

final google:Client llmClient = check new ({
    auth: {token: googleApiKey},
    model: "gemini-2.0-flash"
});
```

### Azure OpenAI

```toml
# Config.toml
azureKey = "your-azure-key"
azureEndpoint = "https://your-deployment.openai.azure.com"
deploymentId = "gpt-4o"
```

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

### Ollama (Local / On-Premises)

No API key required. Start Ollama locally and configure the endpoint.

```toml
# Config.toml
ollamaEndpoint = "http://localhost:11434"
ollamaModel = "llama3"
```

```ballerina
import ballerinax/ai.provider.ollama;

configurable string ollamaEndpoint = ?;
configurable string ollamaModel = ?;

final ollama:Client llmClient = check new ({
    endpoint: ollamaEndpoint,
    model: ollamaModel
});
```

## Step 4: Verify the Setup

Create a simple test to confirm your setup works.

```ballerina
import ballerina/io;
import ballerinax/ai.agent;

configurable string openAiApiKey = ?;

public function main() returns error? {
    agent:ChatAgent testAgent = check new (
        model: check new openai:Client({auth: {token: openAiApiKey}}),
        systemPrompt: "You are a helpful assistant. Respond with 'Setup complete!' to any message."
    );

    string response = check testAgent.chat("Hello", "test-session");
    io:println(response);
}
```

Run the project:

```bash
bal run
```

If you see a response from the LLM, your setup is complete.

## Environment-Based Configuration

Use separate `Config.toml` files for development and production environments.

```toml
# Config.toml (Development)
llmProvider = "ollama"
llmModel = "llama3"
```

```toml
# Config.toml (Production)
llmProvider = "openai"
llmModel = "gpt-4o"
llmApiKey = "sk-..."
```

```ballerina
configurable string llmProvider = "openai";
configurable string llmModel = "gpt-4o";
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

## What's Next

- [Build a Smart Calculator Assistant](smart-calculator.md) -- Your first AI integration with tool calling
- [Build a Sample Hotel Booking Agent](hotel-booking-agent.md) -- A more complete agent with memory and multiple tools
- [Key Concepts: What is an LLM?](/docs/genai/key-concepts/what-is-llm) -- Understand the foundational technology
