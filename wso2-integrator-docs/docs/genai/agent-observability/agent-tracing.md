---
sidebar_position: 1
title: Agent Tracing
description: Trace agent reasoning loops, tool calls, and LLM interactions for debugging and observability.
---

# Agent Tracing

Agent tracing captures the full lifecycle of an agent interaction -- from the initial user message through each reasoning step, tool call, and LLM invocation to the final response. Traces give you visibility into what the agent decided, why it called specific tools, and how long each step took.

Without tracing, debugging agent behavior is guesswork. With tracing, you can reconstruct exactly what happened in every interaction.

## How Agent Tracing Works

Every agent interaction produces a trace with a hierarchical structure:

```
Trace: chat-request-abc123
├── Span: llm-reasoning (320ms)
│   ├── Input: system prompt + user message + tool definitions
│   └── Output: tool_call(getOrderStatus, {orderId: "ORD-12345"})
├── Span: tool-execution (45ms)
│   ├── Tool: getOrderStatus
│   ├── Input: {orderId: "ORD-12345"}
│   └── Output: {status: "shipped", tracking: "1Z999..."}
├── Span: llm-reasoning (280ms)
│   ├── Input: tool result + context
│   └── Output: final response text
└── Metadata: {totalTokens: 1250, totalDuration: 645ms, toolCalls: 1}
```

## Enabling Tracing

### Built-In Tracing

WSO2 Integrator agents emit traces automatically when observability is enabled.

```ballerina
import ballerinax/ai.agent;
import ballerina/observe;

// Enable observability in Config.toml
// [ballerina.observe]
// enabled = true
// provider = "jaeger"

final agent:ChatAgent tracedAgent = check new (
    model: llmClient,
    systemPrompt: "You are a customer support assistant.",
    tools: [getOrderStatus, getCustomer],
    tracing: {
        enabled: true,
        captureInputs: true,   // Log LLM inputs (may contain sensitive data)
        captureOutputs: true,  // Log LLM outputs
        captureToolArgs: true  // Log tool call arguments
    }
);
```

### Configuration via Config.toml

```toml
[ballerina.observe]
enabled = true
provider = "jaeger"

[ballerina.observe.tracing]
jaeger.reporter.hostname = "localhost"
jaeger.reporter.port = 6831
jaeger.sampler.type = "const"
jaeger.sampler.param = 1.0
```

## Trace Structure

### Spans

Each agent interaction generates the following span types:

| Span Type | Description | Attributes |
|-----------|-------------|------------|
| `agent.chat` | Top-level span for the full interaction | sessionId, userId, duration |
| `agent.llm.reasoning` | LLM inference call | model, inputTokens, outputTokens, duration |
| `agent.tool.execution` | Tool function execution | toolName, args, result, duration |
| `agent.memory.retrieval` | Memory/history retrieval | memoryType, messagesRetrieved |
| `agent.guardrail.input` | Input guardrail evaluation | guardrailName, passed, duration |
| `agent.guardrail.output` | Output guardrail evaluation | guardrailName, passed, duration |

### Custom Span Attributes

Add custom attributes to traces for domain-specific context.

```ballerina
import ballerina/observe;

function chatWithTracing(string message, string sessionId, string userId) returns string|error {
    observe:SpanContext? spanCtx = observe:startSpan("agent.chat.custom");

    // Add custom attributes
    if spanCtx is observe:SpanContext {
        observe:addTagToSpan(spanCtx, "user.id", userId);
        observe:addTagToSpan(spanCtx, "session.id", sessionId);
        observe:addTagToSpan(spanCtx, "message.length", message.length().toString());
    }

    string response = check myAgent.chat(message, sessionId);

    if spanCtx is observe:SpanContext {
        observe:addTagToSpan(spanCtx, "response.length", response.length().toString());
        observe:finishSpan(spanCtx);
    }

    return response;
}
```

## Exporting Traces

### Jaeger

```toml
[ballerina.observe]
enabled = true
provider = "jaeger"

[ballerina.observe.tracing]
jaeger.reporter.hostname = "jaeger-collector.monitoring"
jaeger.reporter.port = 6831
```

### OpenTelemetry (OTLP)

```toml
[ballerina.observe]
enabled = true
provider = "otlp"

[ballerina.observe.tracing]
otlp.endpoint = "http://otel-collector:4317"
otlp.protocol = "grpc"
```

### Zipkin

```toml
[ballerina.observe]
enabled = true
provider = "zipkin"

[ballerina.observe.tracing]
zipkin.reporter.hostname = "zipkin.monitoring"
zipkin.reporter.port = 9411
```

## Tracing Multi-Agent Interactions

When agents delegate to other agents, traces maintain parent-child relationships.

```ballerina
// The supervisor agent's trace includes child spans for delegated agent calls
final agent:ChatAgent supervisorAgent = check new (
    model: llmClient,
    systemPrompt: "Coordinate specialist agents.",
    tools: [delegateToBilling, delegateToTechnical],
    tracing: {enabled: true}
);

@agent:Tool {
    name: "delegateToBilling",
    description: "Delegate a billing question to the billing specialist."
}
isolated function delegateToBilling(string question) returns string|error {
    // This creates a child span under the supervisor's trace
    return check billingAgent.chat(question, "supervisor-billing");
}
```

The resulting trace shows the full delegation chain:

```
Trace: supervisor-request-xyz
├── Span: agent.llm.reasoning (supervisor)
├── Span: agent.tool.execution (delegateToBilling)
│   └── Span: agent.chat (billingAgent)
│       ├── Span: agent.llm.reasoning (billingAgent)
│       ├── Span: agent.tool.execution (getInvoice)
│       └── Span: agent.llm.reasoning (billingAgent)
└── Span: agent.llm.reasoning (supervisor)
```

## Sampling Strategies

For high-volume production systems, trace sampling reduces overhead while maintaining visibility.

```toml
# Sample 10% of requests
[ballerina.observe.tracing]
jaeger.sampler.type = "probabilistic"
jaeger.sampler.param = 0.1

# Always trace errors
[ballerina.observe.tracing]
jaeger.sampler.type = "ratelimiting"
jaeger.sampler.param = 2.0  # 2 traces per second
```

### Error-Biased Sampling

Always capture traces for failed interactions.

```ballerina
function chatWithErrorTracing(string message, string sessionId) returns string|error {
    string|error response = myAgent.chat(message, sessionId);

    if response is error {
        // Force trace capture for errors
        observe:addTagToCurrentSpan("error", "true");
        observe:addTagToCurrentSpan("error.message", response.message());
        return response;
    }

    return response;
}
```

## Privacy Considerations

Traces may contain sensitive information. Configure tracing to respect data policies.

```ballerina
final agent:ChatAgent privacyAwareAgent = check new (
    model: llmClient,
    systemPrompt: "You are a support assistant.",
    tools: [getOrderStatus],
    tracing: {
        enabled: true,
        captureInputs: false,   // Do not log user messages
        captureOutputs: false,  // Do not log agent responses
        captureToolArgs: true,  // Log tool arguments (redact sensitive fields)
        redactFields: ["email", "phone", "ssn"]
    }
);
```

## What's Next

- [Conversation Logging](conversation-logging.md) -- Log full conversations for audit
- [Performance Metrics](performance-metrics.md) -- Monitor agent latency and throughput
- [Debugging Agent Behavior](debugging-agent-behavior.md) -- Use traces to diagnose issues
- [Tracing](/docs/deploy-operate/observe/tracing) -- General tracing infrastructure
