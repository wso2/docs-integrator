---
sidebar_position: 4
title: AI Usage Guidelines
description: Data handling, compliance, and usage policies for AI-powered enterprise integrations.
---

# AI Usage Guidelines

Deploying AI integrations in an enterprise requires clear policies around data handling, regulatory compliance, and acceptable use. This page provides guidelines for managing AI usage responsibly within WSO2 Integrator, covering what data can be sent to LLMs, how to handle regulated industries, and how to establish organizational AI policies.

These guidelines help your team adopt AI integrations without introducing compliance risk or data exposure.

## Data Handling Policies

### Data Classification for LLM Usage

Not all enterprise data should be sent to external LLM APIs. Classify your data before building integrations.

| Classification | Description | External LLM | Self-Hosted LLM | Examples |
|---------------|-------------|:---:|:---:|---------|
| **Public** | Openly available information | Yes | Yes | Product descriptions, public docs |
| **Internal** | Low-sensitivity business data | Evaluate | Yes | Meeting notes, project plans |
| **Confidential** | Sensitive business data | No | Evaluate | Financial reports, strategy docs |
| **Restricted** | Regulated or highly sensitive | No | Evaluate | PII, PHI, payment data, credentials |

### Preventing Sensitive Data in LLM Calls

Use input guardrails to enforce data classification policies in code.

```ballerina
import ballerinax/ai.guardrails;

// Block restricted data from reaching external LLMs
final guardrails:InputGuardrail dataClassificationGuard = new guardrails:SensitiveDataFilter({
    blockPatterns: [
        "\\b\\d{3}-\\d{2}-\\d{4}\\b",                  // SSN
        "\\b\\d{4}[- ]?\\d{4}[- ]?\\d{4}[- ]?\\d{4}\\b", // Credit card
        "\\bpassword\\s*[:=]\\s*\\S+",                  // Credentials
        "\\b[A-Z0-9]{20,}\\b"                          // API keys
    ],
    action: "redact"
});
```

### Data Residency Requirements

For organizations with data residency requirements, use providers that offer regional deployments.

```ballerina
// Azure OpenAI with EU data residency
final azure:Client euLlm = check new ({
    auth: {token: azureKey},
    endpoint: "https://my-eu-deployment.openai.azure.com",
    deploymentId: "gpt-4o-eu-west",
    apiVersion: "2024-06-01"
});

// Self-hosted Ollama for air-gapped environments
final ollama:Client localLlm = check new ({
    endpoint: "http://internal-llm.corp.local:11434",
    model: "llama3"
});
```

## Regulatory Compliance

### Healthcare (HIPAA)

When processing protected health information (PHI):

```ballerina
// Use a self-hosted or BAA-covered LLM
final agent:ChatAgent healthcareAgent = check new (
    model: hipaaCompliantLlm,
    systemPrompt: string `You are a clinical documentation assistant.

Compliance Requirements:
- Never store or log patient identifiers in plain text.
- All tool results containing PHI must be processed within the secure environment.
- Do not include patient names, dates of birth, or medical record numbers in your responses.
- Refer to patients by case reference numbers only.`,
    tools: [getClinicalNotes, searchDiagnosis],
    inputGuardrails: [phiDetector],
    outputGuardrails: [phiLeakageFilter]
);
```

### Financial Services (SOX, PCI-DSS)

```ballerina
final agent:ChatAgent financeAgent = check new (
    model: llmClient,
    systemPrompt: string `You are a financial analysis assistant.

Compliance Requirements:
- Do not provide investment advice or recommendations.
- All financial calculations must be verified against source data.
- Never display full account numbers — show only the last 4 digits.
- Flag any response that could be interpreted as forward-looking financial guidance.`,
    tools: [getAccountSummary, queryTransactions],
    inputGuardrails: [pciFilter],
    outputGuardrails: [financialComplianceFilter]
);
```

### General Data Protection (GDPR)

```ballerina
// Ensure right to erasure compliance
function handleDataDeletionRequest(string userId) returns error? {
    // Delete conversation history
    check memoryStore.deleteUserData(userId);

    // Delete usage tracking data
    check usageTracker.deleteUserData(userId);

    // Log the deletion for audit
    log:printInfo("User data deleted per GDPR request", userId = userId);
}
```

## Acceptable Use Policies

### Defining Agent Boundaries

Clearly document what each agent should and should not do.

```ballerina
final agent:ChatAgent supportAgent = check new (
    model: llmClient,
    systemPrompt: string `You are a customer support assistant for Acme Corp.

You SHOULD:
- Answer product questions using the product catalog tool
- Look up order status using the order tracking tool
- Create support tickets for issues you cannot resolve
- Escalate urgent issues by flagging them as high priority

You SHOULD NOT:
- Provide medical, legal, or financial advice
- Make promises about future product features
- Share information about other customers
- Discuss competitors or make product comparisons
- Process returns or refunds without verifying the order first`,
    tools: [searchProducts, getOrderStatus, createTicket]
);
```

### Rate Limiting Per User

Enforce fair use limits to prevent individual users from monopolizing AI resources.

```ballerina
final guardrails:SpendingLimit fairUseLimit = new ({
    maxRequestsPerUser: 100,     // Per hour
    maxTokensPerUser: 200000,    // Per day
    resetInterval: "daily",
    onExceed: "reject",
    rejectMessage: "You've reached your usage limit. Your allowance resets daily at midnight UTC."
});
```

## Logging and Audit

### What to Log

| Data Point | Purpose | Retention |
|-----------|---------|-----------|
| Request timestamp | Audit trail | Per compliance policy |
| User/session ID | Attribution | Per compliance policy |
| Model used | Cost tracking, compliance | Indefinite |
| Token count | Cost management | 90 days |
| Tool calls made | Debugging, audit | 30 days |
| Guardrail triggers | Security monitoring | 90 days |
| Response latency | Performance monitoring | 30 days |

### Audit Log Implementation

```ballerina
import ballerina/log;
import ballerina/time;

function auditLog(string userId, string action, json details) {
    log:printInfo("AI audit event",
        userId = userId,
        action = action,
        timestamp = time:utcNow().toString(),
        details = details.toString()
    );
}
```

### What NOT to Log

- Full conversation content (unless required by regulation)
- Raw PII or PHI
- API keys or credentials
- Full LLM prompts containing sensitive context

## Organizational AI Policy Template

Use this as a starting point for your organization's AI usage policy:

1. **Approved providers** -- List which LLM providers are approved for use
2. **Data classification** -- Define what data can be sent to external LLMs
3. **Use case approval** -- Require review for new AI integration use cases
4. **Monitoring** -- Define how AI usage is monitored and who reviews it
5. **Incident response** -- Define what happens when an AI produces harmful output
6. **User notification** -- Disclose when users are interacting with AI
7. **Human oversight** -- Define which actions require human approval
8. **Regular review** -- Schedule periodic reviews of AI integration behavior

## What's Next

- [Responsible AI](responsible-ai.md) -- Ethical practices for AI integrations
- [Input/Output Guardrails](input-output-guardrails.md) -- Enforce policies in code
- [Content Filtering](content-filtering.md) -- Filter inappropriate AI content
- [Conversation Logging](/docs/genai/agent-observability/conversation-logging) -- Implement audit logging
