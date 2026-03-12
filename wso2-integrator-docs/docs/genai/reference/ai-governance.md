---
sidebar_position: 2
title: AI Governance and Security
description: Data handling policies, guardrails, and compliance considerations for AI integrations.
---

# AI Governance and Security

When building AI-powered integrations, governance and security are critical concerns. This page covers data handling policies, model access controls, guardrails for input and output validation, and compliance best practices for deploying AI integrations in production.

## Data Handling Policies

### What Data Goes to LLM Providers?

When your integration calls an LLM API, the following data is sent to the provider:

| Data | Sent? | Mitigation |
|---|---|---|
| System prompt | Yes | Keep prompts free of secrets |
| User input | Yes | Validate and sanitize before sending |
| Tool call results | Yes | Filter sensitive fields |
| Conversation history | Yes (if memory enabled) | Use token limits and summarization |
| API keys | No (header only) | Use environment variables |

### Data Residency

For compliance requirements, choose providers that match your data residency needs:

- **Azure OpenAI** — Deploy in specific Azure regions
- **AWS Bedrock** — Choose AWS regions for data processing
- **Ollama** — Process locally, no data leaves your network

## Input Guardrails

Validate and sanitize inputs before they reach the LLM.

```ballerina
import ballerinax/ai.agent;

function validateInput(string userMessage) returns string|error {
    // Check message length
    if userMessage.length() > 10000 {
        return error("Message exceeds maximum length");
    }

    // Check for prompt injection patterns
    if containsInjectionPattern(userMessage) {
        return error("Message contains potentially harmful patterns");
    }

    return userMessage;
}
```

## Output Guardrails

Validate LLM outputs before returning them to users.

```ballerina
function validateOutput(string agentResponse) returns string {
    // Remove any PII that may have leaked
    string sanitized = redactPII(agentResponse);

    // Check for harmful content
    if containsHarmfulContent(sanitized) {
        return "I'm unable to provide that information. Please rephrase your question.";
    }

    return sanitized;
}
```

## Token and Cost Management

Control LLM spending with token limits and monitoring.

```ballerina
// Set per-request token limits
final openai:Client llmClient = check new ({
    auth: {token: apiKey},
    model: "gpt-4o",
    maxTokens: 2048  // Cap response length
});

// Track usage
listener agent:UsageListener usageMonitor = new ({
    alertThreshold: 100000,  // Alert after 100K tokens
    dailyBudget: 1000000     // Hard limit: 1M tokens/day
});
```

## Audit Logging

Log all AI interactions for compliance and debugging.

```ballerina
function logAIInteraction(string sessionId, string input, string output, agent:Usage usage) {
    json auditRecord = {
        timestamp: time:utcNow(),
        sessionId: sessionId,
        inputLength: input.length(),
        outputLength: output.length(),
        tokensUsed: usage.totalTokens,
        model: usage.model
    };
    // Write to audit log
    check auditLogger->log(auditRecord);
}
```

## Access Controls

- **API key rotation** — Rotate LLM provider keys regularly
- **Rate limiting** — Limit requests per user or session
- **Role-based access** — Restrict which users can interact with AI agents
- **Model access** — Control which models are available in each environment

## Responsible AI Practices

- **Transparency** — Inform users they are interacting with an AI
- **Human oversight** — Provide escalation paths to human agents
- **Bias monitoring** — Regularly evaluate agent responses for bias
- **Content moderation** — Filter harmful or inappropriate outputs
- **Explainability** — Log reasoning steps for auditability

## What's Next

- [Ballerina Copilot Guide](copilot-guide.md) — AI-assisted development
- [Troubleshooting](troubleshooting.md) — Common issues and solutions
