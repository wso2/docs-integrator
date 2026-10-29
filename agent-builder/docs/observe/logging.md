---
title: Logging
---

# Logging

Configure logging for your WSO2 Agent Builder agents to capture operational data, debug issues, and feed log aggregation systems. Ballerina provides structured logging with full context propagation, making it easy to correlate logs with traces and metrics.

## Default Logging Behavior

Ballerina provides a built-in `ballerina/log` module that writes log messages to standard error (stderr). By default, the log level is set to `INFO`, and messages are emitted in the key-value (logfmt) format. To get JSON instead, set `format = "json"` as shown in [JSON Log Format](#json-log-format).

The following service hosts a support agent and logs each chat request and response:

```ballerina
import ballerina/ai;
import ballerina/http;
import ballerina/log;

// Default model provider
final ai:Wso2ModelProvider wso2ModelProvider =
    check ai:getDefaultModelProvider();

// Agent declaration
final ai:Agent supportAgent = check new (
    systemPrompt = {
        role: string `Support Agent`,
        instructions: string `You answer customer questions about
            orders, deliveries, and returns.`
    },
    model = wso2ModelProvider
);

service /support on new http:Listener(9090) {
    resource function post chat(@http:Payload ai:ChatReqMessage request)
            returns ai:ChatRespMessage|error {
        log:printInfo("Chat request received", sessionId = request.sessionId);
        string answer = check supportAgent.run(request.message, request.sessionId);
        log:printInfo("Agent responded", sessionId = request.sessionId);
        return {message: answer};
    }
}
```

Default output format:

```
time=2025-03-15T10:30:00.000Z level=INFO module=myorg/support_agent message="Chat request received" sessionId="session-42"
```

## Log Levels and Configuration

Ballerina supports the following log levels, from most to least verbose:

| Level | Usage |
|---|---|
| `DEBUG` | Detailed diagnostic information for development |
| `INFO` | General operational events (default) |
| `WARN` | Potentially harmful situations that deserve attention |
| `ERROR` | Error events that may still allow the service to continue |

### Setting the Log Level

Configure the log level in `Config.toml`:

```toml
# Config.toml
[ballerina.log]
level = "DEBUG"
```

Or set it via environment variable:

```bash
export BAL_CONFIG_VAR_BALLERINA_LOG_LEVEL=DEBUG
```

### Module-Specific Log Levels

Control log verbosity per module to reduce noise in production:

```toml
# Config.toml
[ballerina.log]
level = "WARN"                          # Global default

[[ballerina.log.modules]]
name = "myorg/support_agent"
level = "INFO"                          # More verbose for this module

[[ballerina.log.modules]]
name = "myorg/support_agent.tools"
level = "DEBUG"                         # Debug a specific module
```

### Using Log Functions

The following automation runs an agent that summarizes a support ticket, and logs each stage at a different level:

```ballerina
import ballerina/ai;
import ballerina/log;

// Default model provider
final ai:Wso2ModelProvider wso2ModelProvider =
    check ai:getDefaultModelProvider();

// Agent declaration
final ai:Agent ticketSummarizerAgent = check new (
    systemPrompt = {
        role: string `Ticket Summarizer`,
        instructions: string `Summarize the support ticket in one sentence.`
    },
    model = wso2ModelProvider
);

public function main() returns error? {
    string ticketId = "TICKET-1042";
    log:printDebug("Starting ticket summary", ticketId = ticketId);

    do {
        string summary = check ticketSummarizerAgent.run(
            "Order 0 arrived damaged, and the customer wants a replacement."
        );
        log:printInfo("Ticket summarized", ticketId = ticketId, summary = summary);
    } on fail error e {
        log:printError("Ticket summary failed", ticketId = ticketId, 'error = e);
        return e;
    }
}
```

## Structured Logging Format

Ballerina emits structured logs in key-value format by default, which is compatible with most log aggregation tools. Each log entry includes:

- `time` -- ISO 8601 timestamp
- `level` -- Log level
- `module` -- Ballerina module name
- `message` -- Log message string
- Custom key-value pairs passed as named arguments

### Adding Context to Log Entries

Pass additional context as named arguments to log functions:

```ballerina
import ballerina/ai;
import ballerina/http;
import ballerina/log;

type SupportRequest record {|
    string sessionId;
    string customerId;
    string message;
|};

// Default model provider
final ai:Wso2ModelProvider wso2ModelProvider =
    check ai:getDefaultModelProvider();

// Agent declaration
final ai:Agent supportAgent = check new (
    systemPrompt = {
        role: string `Support Agent`,
        instructions: string `You answer customer questions about
            orders, deliveries, and returns.`
    },
    model = wso2ModelProvider
);

service /support on new http:Listener(9090) {
    resource function post chat(@http:Payload SupportRequest request)
            returns ai:ChatRespMessage|error {
        log:printInfo("Processing chat request",
            sessionId = request.sessionId,
            customerId = request.customerId,
            messageLength = request.message.length()
        );

        string answer = check supportAgent.run(request.message, request.sessionId);
        return {message: answer};
    }
}
```

Output:

```
time=2025-03-15T10:30:00.000Z level=INFO module=myorg/support_agent message="Processing chat request" sessionId="session-42" customerId="CUST-789" messageLength=38
```

### JSON Log Format

For systems that require JSON-formatted logs, configure the log output format:

```toml
# Config.toml
[ballerina.log]
level = "INFO"
format = "json"
```

JSON output, with one log entry per line:

```json
{"time":"2025-03-15T10:30:00.000Z", "level":"INFO", "module":"myorg/support_agent", "message":"Processing chat request", "sessionId":"session-42", "customerId":"CUST-789", "messageLength":38}
```

When tracing is enabled, each log record also carries the `traceId` and `spanId` of the request that wrote it. Log platforms that parse JSON, such as Amazon CloudWatch Logs, turn these into queryable fields. You can then go from a log line to its trace and back. In the default key-value format, the same values are present but stay unparsed.

## Send logs to Amazon CloudWatch Logs

Agents log to stderr, so on AWS the platform ships the output to CloudWatch Logs without code changes. Switch to the [JSON log format](#json-log-format) so each log line arrives as one structured event that you can query with CloudWatch Logs Insights:

- In `Config.toml`, set `format = "json"` under `[ballerina.log]`.
- In a container, where `Config.toml` isn't part of the image, set the environment variable `BAL_CONFIG_VAR_BALLERINA_LOG_FORMAT=json` instead. On Amazon ECS, add it to the `environment` list of the container definition.

| Platform | How logs reach CloudWatch Logs |
|----------|--------------------------------|
| Amazon ECS | The `awslogs` log driver in the task definition. See [Amazon ECS deployment](product://integrator/deploy-and-run/self-hosted/containerized-deployment#step-5-register-the-task-definition). |
| Amazon EKS | Fluent Bit, or the Amazon CloudWatch Observability EKS add-on |
| AWS Lambda | Automatic; function output goes to the `/aws/lambda/<function-name>` log group |
| Amazon Bedrock AgentCore Runtime | Automatic; output goes to the `/aws/bedrock-agentcore/runtimes/<runtime-id>-DEFAULT` log group |

## What's next

- [Metrics](metrics.md) — Monitor service health with Prometheus
- [Distributed tracing](tracing.md) — Trace requests across services
- [Integration Control Plane](product://integrator/icp) — Centralized monitoring dashboard
