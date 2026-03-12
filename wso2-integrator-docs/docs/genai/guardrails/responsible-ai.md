---
sidebar_position: 5
title: Responsible AI
description: Ethical AI practices for integration developers building with LLMs in WSO2 Integrator.
---

# Responsible AI

Building AI-powered integrations carries responsibilities beyond technical correctness. This page covers practices for ensuring your AI integrations are fair, transparent, accountable, and aligned with your users' expectations.

Responsible AI is not a separate feature you add at the end -- it is a set of principles that inform design decisions throughout development.

## Core Principles

### Transparency

Users should know when they are interacting with AI and understand its limitations.

```ballerina
final agent:ChatAgent transparentAgent = check new (
    model: llmClient,
    systemPrompt: string `You are an AI customer support assistant powered by a large language model.

Transparency requirements:
- Always identify yourself as an AI when asked.
- If you are not confident in an answer, say so explicitly.
- When providing information from tools, cite which tool you used.
- Never pretend to have emotions, experiences, or personal opinions.
- If a question requires human judgment, offer to escalate to a human agent.`
);
```

### Fairness

Ensure your AI integrations do not discriminate based on protected characteristics.

```ballerina
// Test agent responses for consistency across demographic groups
@test:Config {}
function testFairnessInLoanProcessing() returns error? {
    string[] testCases = [
        "I'm John from New York applying for a business loan",
        "I'm Maria from Texas applying for a business loan",
        "I'm Wei from California applying for a business loan"
    ];

    string[] responses = from string testCase in testCases
        select check loanAgent.chat(testCase, uuid:createType1().toString());

    // Verify responses follow the same process regardless of names/locations
    foreach string response in responses {
        test:assertTrue(response.includes("credit check") || response.includes("application"),
            "Response should follow standard loan process");
    }
}
```

### Accountability

Maintain audit trails so that AI decisions can be reviewed and explained.

```ballerina
type AiDecisionLog record {|
    string decisionId;
    string timestamp;
    string userId;
    string agentName;
    string inputSummary;
    string decision;
    string[] toolsCalled;
    string reasoning;
|};

function logDecision(AiDecisionLog decision) returns error? {
    check auditDb->insert(decision);
}
```

### Human Oversight

For consequential decisions, keep a human in the loop.

```ballerina
@agent:Tool {
    name: "submitRefund",
    description: "Submit a refund request. Refunds over $500 require human approval and will be queued for review."
}
isolated function submitRefund(
    @agent:Param {description: "Order ID"} string orderId,
    @agent:Param {description: "Refund amount in USD"} decimal amount,
    @agent:Param {description: "Reason for refund"} string reason
) returns json|error {
    if amount > 500.00d {
        // Queue for human approval instead of auto-processing
        check approvalQueue->push({orderId, amount, reason, status: "pending_review"});
        return {
            "status": "pending_review",
            "message": "Refunds over $500 require manager approval. This has been queued for review."
        };
    }
    return check refundApi->post("/refunds", {orderId, amount, reason});
}
```

## Bias Mitigation

### Prompt-Level Bias Reduction

```ballerina
systemPrompt: string `You are a hiring assistant that helps screen job applications.

Bias mitigation requirements:
- Evaluate candidates solely on qualifications, experience, and skills.
- Do not consider or mention name, gender, age, ethnicity, or location in your assessment.
- Focus on job-relevant criteria defined in the job description.
- If the job description contains biased language, flag it instead of using it.
- Apply the same evaluation criteria consistently across all candidates.`
```

### Output Auditing for Bias

```ballerina
final guardrails:OutputGuardrail biasAudit = new guardrails:CustomOutputGuardrail(
    isolated function(string output, json? context) returns guardrails:GuardrailResult {
        // Flag responses that reference protected characteristics
        string[] biasIndicators = ["gender", "race", "ethnicity", "religion", "age", "nationality"];
        string lower = output.toLowerAscii();

        foreach string indicator in biasIndicators {
            if lower.includes(indicator) {
                return {
                    allowed: true,  // Allow but flag for review
                    metadata: {"biasFlag": true, "indicator": indicator}
                };
            }
        }
        return {allowed: true};
    }
);
```

## Handling Uncertainty

### Confidence-Aware Responses

Instruct agents to communicate uncertainty rather than guessing.

```ballerina
systemPrompt: string `You are a technical support agent.

When you are uncertain:
- Say "Based on the available information..." or "I'm not fully certain, but..."
- Offer to escalate to a specialist when confidence is low.
- Never fabricate technical details, error codes, or troubleshooting steps.
- If a tool returns no data, say so instead of guessing.
- Prefer "I don't have that information" over a plausible-sounding guess.`
```

### Fallback to Human Agents

```ballerina
function chatWithEscalation(string message, string sessionId) returns string|error {
    string response = check myAgent.chat(message, sessionId);

    // Detect low-confidence responses
    boolean isUncertain = check ai:natural<boolean>(
        "Does this response express uncertainty or inability to answer?",
        response
    );

    if isUncertain {
        check escalationService->createTicket({
            sessionId,
            message,
            agentResponse: response,
            reason: "Agent expressed low confidence"
        });
        return response + "\n\nI've also flagged this for a human specialist to review. They'll follow up if needed.";
    }
    return response;
}
```

## User Consent and Disclosure

### AI Disclosure

```ballerina
service /chat on new http:Listener(8090) {

    resource function post start() returns ChatStartResponse {
        return {
            sessionId: uuid:createType1().toString(),
            disclosure: "You are chatting with an AI assistant. Your messages are processed by a large language model. A human agent is available if you prefer.",
            optOutOption: "Type 'speak to human' at any time to be connected with a human agent."
        };
    }
}
```

### Data Usage Consent

```ballerina
resource function post chat(@http:Payload ChatRequest request) returns ChatResponse|error {
    // Check if user has consented to AI interaction
    boolean hasConsent = check consentStore->hasConsent(request.userId, "ai_interaction");
    if !hasConsent {
        return {
            message: "Before we continue, please note that your messages will be processed by an AI system. Your conversation data is used to provide support and may be reviewed for quality purposes. Do you consent to proceed?",
            requiresConsent: true
        };
    }
    // Proceed with AI chat
    string response = check myAgent.chat(request.message, request.sessionId);
    return {message: response, requiresConsent: false};
}
```

## Responsible AI Checklist

| Area | Check | Status |
|------|-------|--------|
| **Transparency** | Users are informed they are interacting with AI | |
| **Transparency** | AI limitations are communicated | |
| **Fairness** | Agent tested across diverse inputs | |
| **Fairness** | No decisions based on protected characteristics | |
| **Accountability** | AI decisions are logged for audit | |
| **Accountability** | Escalation path to human review exists | |
| **Privacy** | Sensitive data filtered before LLM calls | |
| **Privacy** | Data retention policies defined | |
| **Safety** | Content filters active on outputs | |
| **Safety** | Harmful content generation blocked | |
| **Oversight** | High-stakes decisions require human approval | |
| **Oversight** | Regular review of AI behavior scheduled | |

## What's Next

- [AI Usage Guidelines](ai-usage-guidelines.md) -- Organizational policies for AI deployments
- [Input/Output Guardrails](input-output-guardrails.md) -- Enforce responsible AI in code
- [Content Filtering](content-filtering.md) -- Block harmful content
- [Conversation Logging](/docs/genai/agent-observability/conversation-logging) -- Audit AI interactions
