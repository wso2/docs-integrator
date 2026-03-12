---
sidebar_position: 3
title: Performance Metrics
description: Monitor agent performance with latency, token usage, success rate, and cost metrics.
---

# Performance Metrics

Performance metrics give you quantitative visibility into how your AI agents are performing in production. Track response latency, token consumption, tool call success rates, and cost per interaction to identify bottlenecks, control spending, and maintain quality.

Without metrics, you cannot tell if your agents are degrading, costing more than expected, or failing silently.

## Key Metrics

| Metric | Description | Healthy Target |
|--------|-------------|----------------|
| **Response latency** | End-to-end time from user message to response | < 5s for chat agents |
| **LLM latency** | Time spent waiting for LLM API calls | < 3s per call |
| **Tool execution time** | Time per tool function execution | < 2s per call |
| **Token usage (input)** | Input tokens per interaction | Varies by model |
| **Token usage (output)** | Output tokens per interaction | Varies by model |
| **Success rate** | Percentage of interactions without errors | > 99% |
| **Tool call accuracy** | Correct tool selected / total tool calls | > 95% |
| **Cost per interaction** | Dollar cost per agent request | Budget-dependent |
| **Tool calls per interaction** | Average number of tool calls per request | < 5 for most agents |
| **Guardrail trigger rate** | Percentage of requests blocked by guardrails | < 5% normal |

## Exposing Metrics

### Prometheus Metrics

```ballerina
import ballerina/observe;
import ballerina/time;

// Define metrics
final observe:Gauge agentLatencyGauge = new ("agent_response_latency_ms",
    "Agent response latency in milliseconds",
    tags = {agent: "support-agent"}
);

final observe:Counter tokenCounter = new ("agent_tokens_total",
    "Total tokens consumed by agent",
    tags = {agent: "support-agent"}
);

final observe:Counter interactionCounter = new ("agent_interactions_total",
    "Total agent interactions",
    tags = {agent: "support-agent"}
);

final observe:Counter errorCounter = new ("agent_errors_total",
    "Total agent errors",
    tags = {agent: "support-agent"}
);

final observe:Gauge toolCallGauge = new ("agent_tool_calls_per_request",
    "Tool calls per agent request",
    tags = {agent: "support-agent"}
);
```

### Instrumenting Agent Calls

```ballerina
function chatWithMetrics(string message, string sessionId) returns string|error {
    int startTime = time:monotonicNow();
    interactionCounter.increment();

    agent:ChatResponse|error response = myAgent.chatWithMetadata(message, sessionId);

    int latencyMs = time:monotonicNow() - startTime;
    agentLatencyGauge.setValue(<float>latencyMs);

    if response is error {
        errorCounter.increment();
        return response;
    }

    // Record token usage
    tokenCounter.increment(amount = <float>(response.usage.inputTokens + response.usage.outputTokens));
    toolCallGauge.setValue(<float>response.toolCalls.length());

    return response.message;
}
```

### Prometheus Configuration

```toml
# Config.toml
[ballerina.observe]
metricsEnabled = true
metricsReporter = "prometheus"

[ballerina.observe.metrics.prometheus]
port = 9797
host = "0.0.0.0"
```

## Metric Breakdowns

### Per-Model Metrics

Track metrics separately for each LLM model to compare performance and cost.

```ballerina
function recordModelMetrics(agent:TokenUsage usage) {
    observe:Counter modelTokens = new ("agent_tokens_by_model",
        "Tokens by model",
        tags = {model: usage.model}
    );
    modelTokens.increment(amount = <float>(usage.inputTokens + usage.outputTokens));

    observe:Gauge modelLatency = new ("agent_llm_latency_by_model",
        "LLM latency by model",
        tags = {model: usage.model}
    );
    modelLatency.setValue(<float>usage.llmDurationMs);
}
```

### Per-Tool Metrics

Track which tools are called most often and how long they take.

```ballerina
function recordToolMetrics(string toolName, int durationMs, boolean success) {
    observe:Counter toolCalls = new ("agent_tool_calls_total",
        "Tool call count",
        tags = {tool: toolName}
    );
    toolCalls.increment();

    observe:Gauge toolLatency = new ("agent_tool_latency_ms",
        "Tool execution latency",
        tags = {tool: toolName}
    );
    toolLatency.setValue(<float>durationMs);

    if !success {
        observe:Counter toolErrors = new ("agent_tool_errors_total",
            "Tool call errors",
            tags = {tool: toolName}
        );
        toolErrors.increment();
    }
}
```

### Per-Session Metrics

Track conversation-level metrics for user experience analysis.

```ballerina
type SessionMetrics record {|
    int totalTurns;
    int totalTokens;
    int totalToolCalls;
    int totalDurationMs;
    decimal estimatedCost;
    boolean hadErrors;
|};

function recordSessionEnd(string sessionId, SessionMetrics metrics) {
    observe:Gauge sessionTurns = new ("agent_session_turns",
        "Turns per session");
    sessionTurns.setValue(<float>metrics.totalTurns);

    observe:Gauge sessionCost = new ("agent_session_cost_usd",
        "Cost per session in USD");
    sessionCost.setValue(<float>metrics.estimatedCost);
}
```

## Dashboard Setup

### Grafana Dashboard

Export metrics to Prometheus and visualize in Grafana with these recommended panels:

| Panel | Metric | Visualization |
|-------|--------|--------------|
| Response Latency (P50, P95, P99) | `agent_response_latency_ms` | Time series |
| Token Usage Over Time | `agent_tokens_total` | Time series |
| Interactions Per Minute | `rate(agent_interactions_total[5m])` | Time series |
| Error Rate | `rate(agent_errors_total[5m]) / rate(agent_interactions_total[5m])` | Gauge |
| Tool Call Distribution | `agent_tool_calls_total` by tool | Pie chart |
| Cost Accumulation | `agent_session_cost_usd` | Time series |
| Top Tools by Latency | `agent_tool_latency_ms` | Bar chart |

### Alert Rules

```yaml
# Prometheus alert rules
groups:
  - name: agent_alerts
    rules:
      - alert: HighAgentLatency
        expr: agent_response_latency_ms > 10000
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "Agent response latency exceeds 10 seconds"

      - alert: HighErrorRate
        expr: rate(agent_errors_total[5m]) / rate(agent_interactions_total[5m]) > 0.05
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "Agent error rate exceeds 5%"

      - alert: TokenBudgetExceeded
        expr: sum(increase(agent_tokens_total[1h])) > 1000000
        labels:
          severity: warning
        annotations:
          summary: "Hourly token usage exceeds 1M tokens"
```

## Custom Metrics Endpoint

Expose agent-specific metrics through a dedicated API for custom dashboards.

```ballerina
import ballerina/http;

service /metrics on new http:Listener(8091) {

    resource function get agents() returns json|error {
        return {
            "supportAgent": {
                "totalInteractions": interactionCounter.getValue(),
                "totalErrors": errorCounter.getValue(),
                "avgLatencyMs": agentLatencyGauge.getValue(),
                "totalTokens": tokenCounter.getValue(),
                "successRate": 1.0 - (errorCounter.getValue() / interactionCounter.getValue())
            }
        };
    }
}
```

## What's Next

- [Agent Tracing](agent-tracing.md) -- Correlate metrics with trace data
- [Debugging Agent Behavior](debugging-agent-behavior.md) -- Use metrics to identify problems
- [Token & Cost Management](/docs/genai/guardrails/token-cost-management) -- Control costs based on metrics
- [Metrics](/docs/deploy-operate/observe/metrics) -- General metrics infrastructure
