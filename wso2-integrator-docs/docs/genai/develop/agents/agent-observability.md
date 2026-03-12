---
sidebar_position: 5
title: AI Agent Observability
description: Monitor and trace AI agent behavior with agent tracing, conversation logging, and performance metrics.
---

# AI Agent Observability

Observability gives you visibility into how your AI agents reason, which tools they call, how long each step takes, and where failures occur. Without observability, debugging agent behavior in production is guesswork.

WSO2 Integrator provides built-in observability for agents through tracing, conversation logging, and performance metrics that integrate with standard observability backends.

## Enabling Agent Tracing

Agent tracing captures each step of the agent's reasoning loop -- the LLM call, tool selection, tool execution, and response generation -- as spans in a distributed trace.

### Basic Tracing Setup

```ballerina
import ballerinax/ai.agent;
import ballerina/observe;

final agent:ChatAgent observableAgent = check new (
    model: llmClient,
    systemPrompt: "You are a customer support assistant.",
    tools: [getCustomer, searchOrders, createTicket],
    observability: {
        tracing: true,
        metricsEnabled: true
    }
);
```

When tracing is enabled, each call to `agent.chat()` produces a trace with the following span hierarchy:

```
agent.chat
  |-- llm.call (system prompt + user message)
  |-- tool.select (getCustomer)
  |-- tool.execute (getCustomer)
  |     |-- http.get /customers/C-1234
  |-- llm.call (with tool result)
  |-- tool.select (searchOrders)
  |-- tool.execute (searchOrders)
  |     |-- http.get /orders?customerId=C-1234
  |-- llm.call (final response generation)
```

### Configuring the Trace Exporter

Export traces to Jaeger, Zipkin, or any OpenTelemetry-compatible backend.

```toml
# Config.toml
[ballerina.observe]
tracingEnabled = true
tracingProvider = "jaeger"

[ballerinax.jaeger]
agentHostname = "localhost"
agentPort = 6831
```

To use the OpenTelemetry exporter instead:

```toml
[ballerina.observe]
tracingEnabled = true
tracingProvider = "opentelemetry"

[ballerinax.opentelemetry]
endpoint = "http://localhost:4317"
protocol = "grpc"
```

## Conversation Logging

Log the full conversation history for each session, including tool calls and responses, for auditing and debugging.

### Structured Conversation Logs

```ballerina
import ballerina/log;

service /agent on new http:Listener(8090) {

    resource function post chat(@http:Payload ChatRequest request) returns ChatResponse|error {
        log:printInfo("Agent request",
            sessionId = request.sessionId,
            userMessage = request.message
        );

        string response = check observableAgent.chat(request.message, request.sessionId);

        log:printInfo("Agent response",
            sessionId = request.sessionId,
            response = response
        );

        return {message: response};
    }
}
```

### Logging Tool Calls

Register a tool call listener to capture detailed information about each tool invocation.

```ballerina
final agent:ChatAgent loggedAgent = check new (
    model: llmClient,
    systemPrompt: "You are a support assistant.",
    tools: [getCustomer, searchOrders],
    onToolCall: isolated function(agent:ToolCallEvent event) {
        log:printInfo("Tool called",
            toolName = event.toolName,
            parameters = event.parameters.toString(),
            sessionId = event.sessionId,
            iteration = event.iteration
        );
    },
    onToolResult: isolated function(agent:ToolResultEvent event) {
        log:printInfo("Tool result",
            toolName = event.toolName,
            resultSize = event.result.toString().length(),
            durationMs = event.durationMs,
            sessionId = event.sessionId
        );
    }
);
```

### Persisting Conversation Logs

Store conversation logs in a database for long-term auditing.

```ballerina
import ballerinax/postgresql;

function logConversationTurn(
    string sessionId,
    string userMessage,
    string agentResponse,
    agent:ToolCallEvent[] toolCalls
) returns error? {
    _ = check pgClient->execute(`
        INSERT INTO conversation_logs (session_id, user_message, agent_response, tool_calls, created_at)
        VALUES (${sessionId}, ${userMessage}, ${agentResponse},
                ${toolCalls.toString()}, NOW())
    `);
}
```

## Performance Metrics

Track key metrics to understand agent performance and identify bottlenecks.

### Built-In Metrics

When `metricsEnabled` is set to `true`, the agent automatically publishes the following metrics:

| Metric | Type | Description |
|--------|------|-------------|
| `agent_requests_total` | Counter | Total number of agent requests |
| `agent_request_duration_seconds` | Histogram | End-to-end response time |
| `agent_llm_calls_total` | Counter | Number of LLM calls per request |
| `agent_tool_calls_total` | Counter | Number of tool calls per request |
| `agent_tool_call_duration_seconds` | Histogram | Duration of each tool call |
| `agent_iterations_total` | Histogram | Number of reasoning iterations per request |
| `agent_errors_total` | Counter | Number of failed requests |

### Custom Metrics

Add custom metrics for domain-specific monitoring.

```ballerina
import ballerina/observe;

final observe:Counter ticketCreations = new ("agent_tickets_created_total",
    description = "Number of support tickets created by the agent"
);

final observe:Gauge activeSessions = new ("agent_active_sessions",
    description = "Number of currently active agent sessions"
);

@agent:Tool {
    name: "createSupportTicket",
    description: "Create a new support ticket."
}
isolated function createSupportTicket(string subject, string description) returns json|error {
    json result = check ticketApi->post("/tickets", {subject, description});
    ticketCreations.increment();
    return result;
}
```

### Configuring the Metrics Exporter

Export metrics to Prometheus.

```toml
# Config.toml
[ballerina.observe]
metricsEnabled = true
metricsReporter = "prometheus"

[ballerinax.prometheus]
port = 9797
host = "0.0.0.0"
```

## Dashboarding

### Grafana Dashboard Queries

Use the exported metrics to build dashboards that show agent health at a glance.

**Average response time:**

```promql
histogram_quantile(0.95, rate(agent_request_duration_seconds_bucket[5m]))
```

**Tool call error rate:**

```promql
rate(agent_errors_total[5m]) / rate(agent_requests_total[5m])
```

**Average iterations per request:**

```promql
rate(agent_iterations_total_sum[5m]) / rate(agent_iterations_total_count[5m])
```

## Debugging Agent Behavior

### Verbose Mode

Enable verbose logging to see the full prompt and response for each LLM call during development.

```ballerina
final agent:ChatAgent debugAgent = check new (
    model: llmClient,
    systemPrompt: "You are a support assistant.",
    tools: [getCustomer, searchOrders],
    observability: {
        tracing: true,
        metricsEnabled: true,
        verboseLogging: true   // Logs full prompts and responses
    }
);
```

Verbose logging outputs the complete system prompt, user message, tool calls, tool results, and final response at the `DEBUG` log level. Do not enable this in production, as it may log sensitive data.

### Replay and Inspection

Retrieve the full reasoning trace for a completed request.

```ballerina
agent:ReasoningTrace trace = check observableAgent.getLastTrace(sessionId);

foreach agent:TraceStep step in trace.steps {
    log:printInfo("Step",
        stepType = step.stepType,
        content = step.content,
        durationMs = step.durationMs
    );
}
```

## What's Next

- [AI Agent Evaluations](/docs/genai/develop/agents/agent-evaluations) -- Test and measure agent quality
- [Creating an AI Agent](/docs/genai/develop/agents/creating-agent) -- Build your first agent
- [Agent Tracing](/docs/genai/agent-observability/agent-tracing) -- Detailed tracing guide
- [Performance Metrics](/docs/genai/agent-observability/performance-metrics) -- Metrics reference
