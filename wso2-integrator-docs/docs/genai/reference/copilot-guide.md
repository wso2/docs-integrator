---
sidebar_position: 1
title: Ballerina Copilot Setup and Usage Guide
description: Set up and use Ballerina Copilot for AI-assisted integration development in WSO2 Integrator.
---

# Ballerina Copilot Setup and Usage Guide

Ballerina Copilot is an AI-powered code assistant built into the WSO2 Integrator IDE. It helps you write integration code faster by providing intelligent code completions, generating boilerplate, and suggesting transformations based on natural language descriptions.

:::info This page is about AI helping YOU code
Ballerina Copilot assists you while writing code (the "AI Split Rule" places it in the Develop category). For building AI-powered integrations (agents, RAG, MCP), see the [GenAI develop guides](/docs/genai/develop/direct-llm/configuring-providers).
:::

## Setting Up Copilot

### Prerequisites

- WSO2 Integrator extension installed in VS Code
- An active WSO2 account with Copilot access
- Internet connection for AI model access

### Activation

1. Open VS Code with the WSO2 Integrator extension
2. Click the Copilot icon in the bottom status bar
3. Sign in with your WSO2 account
4. Accept the terms of service

### Configuration

Configure Copilot behavior in VS Code settings:

```json
{
    "ballerina.copilot.enabled": true,
    "ballerina.copilot.inlineSuggestions": true,
    "ballerina.copilot.completionDelay": 500,
    "ballerina.copilot.maxSuggestions": 3
}
```

## Features

### Inline Code Completion

As you type, Copilot suggests code completions based on context — your current file, imports, and project structure.

<!-- TODO: Screenshot of inline suggestion -->

### Natural Language to Code

Type a comment describing what you want, and Copilot generates the implementation.

```ballerina
// Create an HTTP service that validates JSON payloads
// and stores them in a PostgreSQL database
```

Copilot generates the complete service definition, database connection, and validation logic.

### Data Mapper Suggestions

When working with the Visual Data Mapper, Copilot suggests field mappings based on source and target type names and structures.

### Test Generation

Generate unit tests for your integration functions using AI.

1. Right-click on a function in the editor
2. Select **Generate Tests with Copilot**
3. Review and customize the generated test cases

### Refactoring Suggestions

Copilot identifies code patterns that can be improved and suggests refactoring options such as:

- Extracting repeated logic into functions
- Converting imperative loops to query expressions
- Improving error handling patterns
- Optimizing data transformations

## Privacy and Data Handling

- Code context is sent to WSO2's AI service for processing
- No code is stored permanently on WSO2 servers
- You can disable Copilot for specific files or projects
- Enterprise customers can configure private model endpoints

## Troubleshooting

| Issue | Solution |
|---|---|
| No suggestions appearing | Check internet connection and verify Copilot is enabled in settings |
| Slow suggestions | Increase `completionDelay` setting; check network latency |
| Irrelevant suggestions | Ensure your file has proper imports and type definitions for better context |
| Authentication errors | Re-sign in via the Copilot icon in the status bar |

## What's Next

- [AI Governance and Security](ai-governance.md) — Data handling and compliance
- [Troubleshooting](troubleshooting.md) — Common issues and solutions
