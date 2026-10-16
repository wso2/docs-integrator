---
title: Distributed Tracing
---

# Distributed Tracing

Distributed tracing follows a single request end to end as it passes through your integration and the services it calls. Each step is recorded as a **span** with its duration and details, and the spans of one request are grouped into a **trace**. Use traces to see where time is spent, identify latency bottlenecks across service boundaries, and debug request failures.

WSO2 Integrator produces traces using OpenTelemetry. You choose the backend that receives and displays them.

## Enable tracing with Jaeger or Zipkin

:::note Using OpenTelemetry?
The OpenTelemetry extension is set up differently and uses its own sampler options. Follow the [OpenTelemetry](open-source/opentelemetry.md) guide instead.

Tracing needs three things: observability included in the build, the extension for your tracing backend, and the tracing configuration.

### 1. Include observability in the build

Open `Ballerina.toml` and add:

```toml
[build-options]
observabilityIncluded = true
```

### 2. Import the tracing extension

In your entry point file (typically `main.bal`), import the extension for the backend you use. Use one of:

```ballerina
import ballerinax/jaeger as _;
```

```ballerina
import ballerinax/zipkin as _;
```

To export over OTLP to an OpenTelemetry Collector or any other OTLP endpoint, use the `ballerina/otel` module:

```ballerina
import ballerina/otel as _;
```

### 3. Turn tracing on

In `Config.toml`, enable tracing and name the provider (`"jaeger"`, `"zipkin"`, or `"otel"`):

```toml
[ballerina.observe]
tracingEnabled = true
tracingProvider = "jaeger"
```

Each backend also takes its own connection settings (agent host and port, sampler, and buffering) under `[ballerinax.jaeger]` or `[ballerinax.zipkin]`. Those are covered on the backend's page. The `otel` provider takes its endpoint and protocol under `[ballerina.otel]`, as shown in [Send traces to AWS X-Ray and CloudWatch](#send-traces-to-aws-x-ray-and-cloudwatch).

## Sampling with Jaeger and Zipkin

Sampling controls how many requests are traced. Both Jaeger and Zipkin support the same three strategies, set with `samplerType` and `samplerParam`:

| Strategy | Parameter | Description |
|----------|-----------|-------------|
| `const` | `1.0` (on) or `0.0` (off) | Sample all or none |
| `probabilistic` | `0.0` to `1.0` | Probability of sampling each trace |
| `ratelimiting` | traces per second | Fixed rate of traces per second |

Sampling every request is fine for development. In production, use `probabilistic` or `ratelimiting` to reduce overhead while keeping visibility into your system.

If `samplerType` is not one of these values, the extension prints an error at startup and falls back to `const`, which traces every request.

## Choose a tracing backend

| Backend | Best for | Guide |
|---------|----------|-------|
| **Jaeger** | Production-grade distributed tracing | [Jaeger](open-source/jaeger.md) |
| **Zipkin** | A lightweight tracing alternative | [Zipkin](open-source/zipkin.md) |
| **OpenTelemetry** | Any OTLP backend, such as an OpenTelemetry Collector, with traces and metrics from one extension | [OpenTelemetry](open-source/opentelemetry.md) |

To send traces to **AWS X-Ray**, use the Jaeger extension, which exports spans over OTLP gRPC to an [AWS Distro for OpenTelemetry](https://aws-otel.github.io/) (ADOT) collector. Configure the collector's `awsxray` exporter, and run the collector as a sidecar on Amazon ECS or as a DaemonSet on Amazon EKS. [Turn tracing on](#3-turn-tracing-on) with the `jaeger` provider, and point the extension at the collector in `Config.toml`:

```toml
[ballerinax.jaeger]
agentHostname = "localhost"   # the ADOT collector; localhost for an ECS sidecar
agentPort = 4317
```

Set `agentPort` explicitly. The Jaeger extension defaults to port `55680`, not the standard OTLP gRPC port `4317` that the collector listens on.

In a container, where `Config.toml` isn't part of the image, set the same values as environment variables: `BAL_CONFIG_VAR_BALLERINA_OBSERVE_TRACINGENABLED=true`, `BAL_CONFIG_VAR_BALLERINA_OBSERVE_TRACINGPROVIDER=jaeger`, `BAL_CONFIG_VAR_BALLERINAX_JAEGER_AGENTHOSTNAME`, and `BAL_CONFIG_VAR_BALLERINAX_JAEGER_AGENTPORT`.

You can also send traces to a managed platform: [Datadog](commercial/datadog.md) and [New Relic](commercial/new-relic.md) both accept traces, and [Moesif](commercial/moesif.md) supports traces alongside metrics and logs. For a complete stack that includes tracing, see the [Local Development Stack](recipes/local-development-stack.md) and [Kubernetes Production Stack](recipes/kubernetes-production-stack.md) recipes.

## Send traces to AWS X-Ray and CloudWatch

AWS X-Ray accepts OpenTelemetry traces over OTLP at `https://xray.<region>.amazonaws.com/v1/traces`, but only from requests signed with AWS Signature Version 4 (SigV4). The `ballerina/otel` module can't sign requests. An OpenTelemetry Collector runs next to the integration and signs for it. The integration sends unsigned OTLP to the collector over the loopback interface. The collector signs each batch with the workload's IAM role and forwards it. The spans then appear in CloudWatch.

The steps below run the collector as a second process in the integration's own container. This works on any container platform. On Amazon Bedrock AgentCore Runtime it's the only option, because each session runs a single container, not a pod that could hold a sidecar.

This is a workaround, not an AWS-supported path. AWS supports agent observability only through the AWS Distro for OpenTelemetry (ADOT) SDK, which isn't available for Ballerina, and states that the ADOT Collector isn't supported for agent observability.

### Before you start

Do the following once per AWS account and Region:

1. **Enable CloudWatch Transaction Search.** In the CloudWatch console, open **Application Signals (APM)** > **Transaction Search**, choose **Enable**, and choose to ingest spans as structured logs. Spans then land in the `aws/spans` log group.
2. **Index every trace while you test.** The default indexing rule indexes only 1% of traces:

    ```bash
    aws xray update-indexing-rule --region <region> --name "Default" \
      --rule '{"Probabilistic": {"DesiredSamplingPercentage": 100}}'
    ```

    Lower the percentage again for production traffic.

3. **Grant the workload's IAM role permission to write traces:**

    ```json
    { "Sid": "Tracing", "Effect": "Allow",
      "Action": ["xray:PutTraceSegments", "xray:PutTelemetryRecords",
                 "xray:GetSamplingRules", "xray:GetSamplingTargets"],
      "Resource": ["*"] }
    ```

    If the collector's output shows `AccessDenied` from `xray.<region>.amazonaws.com/v1/traces`, also allow `xray:PutSpans` and `xray:PutSpansForIndexing`.

### 1. Configure the integration

Set up the OpenTelemetry extension as described in [OpenTelemetry](open-source/opentelemetry.md). On Ballerina versions earlier than 2201.14.0, also import `ballerina/otel`, as shown in [Import the tracing extension](#2-import-the-tracing-extension). Then point the `otel` provider at the collector:

```toml
[ballerina.observe]
tracingEnabled = true
tracingProvider = "otel"

[ballerina.otel]
tracesEndpoint = "http://127.0.0.1:4317"
tracesProtocol = "grpc"

[ballerina.otel.tracesResourceAttributes]
"service.name" = "my-integration"

[ballerina.log]
format = "json"
```

JSON logs let CloudWatch parse each log line into fields. With tracing on, each line also carries the `traceId` and `spanId` of the request that wrote it.

This file holds no secrets. Copy it into the image as `/app/Config.toml`. Keep it separate from the `Config.toml` you use for local runs. `Config.toml` is strict: an unknown key, such as `[ballerinai.otel]` for `[ballerina.otel]`, stops the program at startup.

### 2. Configure the collector

Use the contrib distribution of the OpenTelemetry Collector (`otel/opentelemetry-collector-contrib`). It includes the `sigv4auth` extension and the `filter`, `transform` and `resourcedetection` processors used on this page. Save the configuration as `otel-collector.yaml`:

```yaml
receivers:
  otlp:
    protocols:
      grpc:
        endpoint: 127.0.0.1:4317          # loopback only

extensions:
  sigv4auth:
    region: <region>
    service: xray

exporters:
  otlp_http:
    traces_endpoint: https://xray.<region>.amazonaws.com/v1/traces
    auth:
      authenticator: sigv4auth
    compression: gzip

processors:
  filter/drop_health:                     # don't trace health checks
    error_mode: ignore
    traces:
      span:
        - 'attributes["http.url"] == "/ping"'

service:
  extensions: [sigv4auth]
  pipelines:
    traces:
      receivers: [otlp]
      processors: [filter/drop_health]
      exporters: [otlp_http]
```

The `filter/drop_health` processor drops the spans of health-check requests. On AgentCore Runtime, `/ping` is polled every few seconds, and each poll would otherwise become a billed span. Change the path to match your own health check.

The collector signs with the credentials of the environment it runs in: the execution role on AgentCore Runtime, or the task or node role elsewhere.

### 3. Run the collector in the same container

Run the collector and the integration side by side. When the integration exits, the script stops the collector and the container exits with the integration's status. On shutdown, it stops the integration first and the collector last. The collector then exports the integration's last spans. Code to Cloud places the executable JAR at `/home/ballerina/jars/<package-name>.jar`. Keep the JVM flags that Code to Cloud's own entry point uses, in particular `-XX:+ExitOnOutOfMemoryError`. Save this as `start.sh` and make it executable (`chmod +x start.sh`):

```sh
#!/bin/sh
/usr/local/bin/otelcol --config=/etc/otel/config.yaml &
COLLECTOR=$!
java --enable-native-access=ALL-UNNAMED -XX:+ExitOnOutOfMemoryError -jar /home/ballerina/jars/my_integration.jar &
APP=$!

# On shutdown, stop the integration first so that it flushes its last spans,
# then the collector so that it exports them.
stop() {
    kill -TERM "$APP" 2>/dev/null
    wait "$APP"
    STATUS=$?
    kill -TERM "$COLLECTOR" 2>/dev/null
    wait "$COLLECTOR"
    exit "$STATUS"
}
trap stop TERM INT

# If the integration exits on its own, stop the collector and exit with its status.
wait "$APP"
STATUS=$?
kill -TERM "$COLLECTOR" 2>/dev/null
wait "$COLLECTOR"
exit "$STATUS"
```

If the collector stops on its own, the integration keeps running without tracing.

Copy the collector binary out of the official image. Use the platform you deploy to, for example `linux/arm64` for AWS Graviton or Amazon Bedrock AgentCore Runtime:

```bash
mkdir -p otel
docker create --name otelcol --platform linux/arm64 otel/opentelemetry-collector-contrib:0.161.0
docker cp otelcol:/otelcol-contrib otel/otelcol
docker rm otelcol
```

Then add the files to the image with Code to Cloud. In `Cloud.toml`, copy the collector, its configuration, the start script, and the tracing configuration into the image, and make the start script the entry point. The `entrypoint` value is the complete Dockerfile instruction:

```toml
[container.image]
repository = "<account-id>.dkr.ecr.<region>.amazonaws.com"
name = "my-integration"
tag = "v1.0.0"
entrypoint = "ENTRYPOINT [\"/home/ballerina/start.sh\"]"

[[container.copy.files]]
sourceFile = "./otel/otelcol"
target = "/usr/local/bin/otelcol"

[[container.copy.files]]
sourceFile = "./otel-collector.yaml"
target = "/etc/otel/config.yaml"

[[container.copy.files]]
sourceFile = "./start.sh"
target = "/home/ballerina/start.sh"

[[container.copy.files]]
sourceFile = "./observability.toml"
target = "/home/ballerina/Config.toml"
```

Here `observability.toml` is the file from step 1. It holds no secrets, and Ballerina reads it as `Config.toml` from the working directory, `/home/ballerina`. With `cloud = "docker"` set under `[build-options]` in `Ballerina.toml`, `bal build` generates the image with these files.

### On Amazon Bedrock AgentCore Runtime

Turn tracing on for the runtime: in the AgentCore console, open the runtime and enable **Tracing**. Spans are captured from then on; nothing earlier is backfilled. If the integration calls an AgentCore Gateway, enable tracing on the Gateway as well.

CloudWatch groups spans under an agent by resource attributes that AgentCore injects into the container as the `OTEL_RESOURCE_ATTRIBUTES` environment variable. Spans without them, in particular without `deployment.environment.name`, are classed as `Generic` and don't roll up under the agent. Copy them onto every span with two more processors:

```yaml
processors:
  resourcedetection/agentcore:            # reads OTEL_RESOURCE_ATTRIBUTES
    detectors: [env]
    override: true

  transform/agentcore_origin:
    error_mode: ignore
    trace_statements:
      - context: span
        statements:
          - set(span.attributes["aws.xray.origin"], "AWS::BedrockAgentCore::Runtime") where resource.attributes["cloud.resource_id"] != nil
          - set(span.attributes["aws.resource.type"], "AWS::BedrockAgentCore::Runtime") where resource.attributes["cloud.resource_id"] != nil
          - set(span.attributes["aws.resource.arn"], resource.attributes["cloud.resource_id"]) where resource.attributes["cloud.resource_id"] != nil

service:
  extensions: [sigv4auth]
  pipelines:
    traces:
      receivers: [otlp]
      processors: [filter/drop_health, resourcedetection/agentcore, transform/agentcore_origin]
      exporters: [otlp_http]
```

The `service.name` in the integration's `Config.toml` becomes a fallback: `override: true` replaces it with the runtime's own name. When `OTEL_RESOURCE_ATTRIBUTES` is missing, as it is when you run the image locally, both processors leave the spans unchanged. The same image and `start.sh` work everywhere.

### AI agents: the GenAI dashboard and AgentCore Evaluations

An agent built with `ballerina/ai` emits spans that follow the OpenTelemetry GenAI conventions: an `invoke_agent` span for each run, with `chat` and `execute_tool` spans beneath it. CloudWatch's **GenAI Observability** dashboard and AgentCore Evaluations read these spans, but they expect a few details that differ from what Ballerina emits. Add these processors to the agent's collector to bridge the gap:

| Processor | What it fixes |
|---|---|
| `attributes/genai_token_types` | Ballerina records token counts as strings. Without converting them to integers, the dashboard's total token count reads 0. |
| `transform/genai_total_tokens` | Adds `gen_ai.usage.total_tokens`, which the dashboard's queries use. |
| `transform/scope_name` | AgentCore Evaluations reads only spans whose instrumentation scope is named `opentelemetry.instrumentation.*`. Ballerina's scope is named `otel`. |
| `transform/genai_eval_aliases` | Copies the prompt, the answer, and the tool arguments and results to the attribute names AgentCore Evaluations reads. Without it, every evaluator receives empty input and scores it 1.0. |
| `attributes/session_id` | Copies `gen_ai.conversation.id` to `session.id`, which AWS uses to group the spans of one session. |

:::caution Spans carry the conversation
`ballerina/ai` records the full prompt, the answer, and every tool's arguments and results on its spans, and `transform/genai_eval_aliases` copies them to a second set of attributes. Anyone who can read the `aws/spans` log group can read the conversations. Restrict read access to that log group, and set a retention period that matches your data policy.

```yaml
processors:
  attributes/genai_token_types:
    actions:
      - { key: gen_ai.usage.input_tokens,  action: convert, converted_type: int }
      - { key: gen_ai.usage.output_tokens, action: convert, converted_type: int }

  transform/genai_total_tokens:
    error_mode: ignore
    trace_statements:
      - context: span
        statements:
          - set(span.attributes["gen_ai.usage.total_tokens"], Int(span.attributes["gen_ai.usage.input_tokens"]) + Int(span.attributes["gen_ai.usage.output_tokens"])) where span.attributes["gen_ai.usage.input_tokens"] != nil and span.attributes["gen_ai.usage.output_tokens"] != nil

  transform/scope_name:
    error_mode: ignore
    trace_statements:
      - context: scope
        statements:
          - set(scope.name, "opentelemetry.instrumentation.ballerina") where scope.name == "otel"

  transform/genai_eval_aliases:
    error_mode: ignore
    trace_statements:
      - context: span
        statements:
          - set(span.attributes["gen_ai.task.input"], span.attributes["gen_ai.input.messages"]) where span.attributes["gen_ai.operation.name"] == "invoke_agent" and span.attributes["gen_ai.input.messages"] != nil
          - set(span.attributes["gen_ai.task.output"], span.attributes["gen_ai.output.messages"]) where span.attributes["gen_ai.operation.name"] == "invoke_agent" and span.attributes["gen_ai.output.messages"] != nil
          - set(span.attributes["gen_ai.tool.call.arguments"], span.attributes["gen_ai.tool.arguments"]) where span.attributes["gen_ai.operation.name"] == "execute_tool" and span.attributes["gen_ai.tool.arguments"] != nil
          - set(span.attributes["gen_ai.tool.call.result"], span.attributes["gen_ai.tool.output"]) where span.attributes["gen_ai.operation.name"] == "execute_tool" and span.attributes["gen_ai.tool.output"] != nil

  attributes/session_id:
    actions:
      - { key: session.id, from_attribute: gen_ai.conversation.id, action: upsert }
```

Add them to the pipeline:

```yaml
      processors: [filter/drop_health, attributes/genai_token_types, transform/genai_total_tokens, transform/scope_name, transform/genai_eval_aliases, resourcedetection/agentcore, transform/agentcore_origin, attributes/session_id]
```

Use the contrib collector rather than the AWS Distro for OpenTelemetry (ADOT) collector here. ADOT v0.50.0 doesn't include the `transform` processor.

### Where the data lands

| What | Where |
|---|---|
| Spans that the collector sends | The `aws/spans` log group, and **CloudWatch** > **Application Signals (APM)** > **Transaction Search** |
| Spans that AgentCore itself records, such as AgentCore Gateway spans | Runtimes created in Regions that support it deliver AgentCore's own spans to the `spans` stream of the agent's log group. Older runtimes use `aws/spans`. |
| Logs from an AgentCore runtime, with `traceId` and `spanId` on each line | The `/aws/bedrock-agentcore/runtimes/<runtime-id>-DEFAULT` log group |
| Agent sessions, traces, and token usage | **CloudWatch** > **GenAI Observability** > **Bedrock AgentCore** |
| Runtime metrics: invocations, errors, latency, CPU, and memory | CloudWatch metrics, which AgentCore Runtime publishes with no setup |

The dashboards lag by 10 to 15 minutes. To confirm that spans are arriving, count recent spans by name:

```bash
aws logs tail aws/spans --region <region> --since 30m \
  | grep -o '"name":"[^"]*"' | sort | uniq -c | sort -rn
```

### Known limitations

- **The platform hop and the integration's own spans are separate traces.** AgentCore Runtime records its `AgentCore.Runtime.Invoke` span in one trace. It passes the trace context to the container in the X-Ray format (`X-Amzn-Trace-Id`). Ballerina continues a trace from a W3C `traceparent` header but doesn't read the X-Ray format. It starts a new trace instead. CloudWatch can't show them as one end-to-end trace.
- **Spans still queued in the integration are lost on shutdown.** Ballerina doesn't flush its own span queue when it stops. `start.sh` protects only the spans the collector has already received.

## What's next

- [Jaeger](open-source/jaeger.md) — Set up Jaeger and view traces
- [Zipkin](open-source/zipkin.md) — Set up Zipkin and view traces
- [OpenTelemetry](open-source/opentelemetry.md) — Export traces over OTLP to any compatible backend
- [Metrics](metrics.md) — Collect and monitor metrics alongside traces
- [Logging](logging.md) — Configure structured logging
