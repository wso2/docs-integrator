---
title: Metrics
---

# Metrics

Monitor the health and performance of your WSO2 Agent Builder agents using Prometheus metrics. WSO2 Agent Builder provides built-in support for exposing metrics in Prometheus format, enabling you to collect quantitative data on request counts, latency, error rates, and custom business metrics.

## What are metrics?

Metrics are numerical measurements of your application's behavior and health. They help you understand:
- **Request volume** – How many requests your service is processing
- **Performance** – Request latency and response times
- **Reliability** – Error rates and failure patterns
- **Resource usage** – JVM memory, garbage collection, active connections
- **Business KPIs** – Conversations handled, tasks completed by the agent, SLA compliance

Prometheus collects metrics using a **pull model** – your application exposes metrics at an HTTP endpoint, and Prometheus periodically scrapes (pulls) the data for storage and analysis.

## Enabling Prometheus Metrics in your agent

### Prerequisites

| Requirement | Details |
|-------------|---------|
| Prometheus | Version 2.40 or later |
| Network | Prometheus must be able to reach the metrics endpoint |

### Configure the agent for Prometheus

Navigate to the file explorer of WSO2 Agent Builder and add the following to the `main.bal` file.

```ballerina
import ballerinax/prometheus as _;
```

Edit `Config.toml` to enable Prometheus metrics:

```toml
[ballerina.observe]
metricsEnabled = true
metricsReporter = "prometheus"

[ballerinax.prometheus]
port = 9797
host = "0.0.0.0"
```

Add the Prometheus dependency to `Ballerina.toml`:

```toml
[build-options]
observabilityIncluded = true

[[dependency]]
org = "ballerinax"
name = "prometheus"
version = "1.0.0"
```

When the application starts, a Prometheus-compatible metrics endpoint is available at `http://localhost:9797/metrics`.

## Setting up Prometheus

Once you've enabled metrics in your agent, you need to configure Prometheus to scrape the metrics endpoint.

### Create Prometheus Configuration

Create a `prometheus.yml` file with the following configuration:

```yaml
global:
  scrape_interval:     15s
  evaluation_interval: 15s

scrape_configs:
  - job_name: 'ballerina'
    static_configs:
      - targets: ['localhost:9797']
```

Replace `localhost:9797` with your service's host and port. The metrics endpoint runs on port 9797 by default (as configured in `Config.toml`).

### Run Prometheus

You can run Prometheus using Docker:

```bash
docker run -p 9090:9090 -v <path_to_prometheus.yml>:/etc/prometheus/prometheus.yml prom/prometheus
```

**Note:** If running Ballerina on localhost and Prometheus in Docker, use `host.docker.internal:9797` as your target instead to allow Docker to access the host machine:

```yaml
scrape_configs:
  - job_name: 'ballerina'
    static_configs:
      - targets: ['host.docker.internal:9797']
```

Access Prometheus at `http://localhost:9090` to view metrics and create dashboards.

### Other Installation Methods

There are many other ways to install Prometheus besides Docker. Visit the [official Prometheus documentation](https://prometheus.io/docs/prometheus/latest/installation/) for downloadable binaries and other installation options.

## Default Metrics Exposed

Ballerina automatically collects and exposes the following metrics without any additional code:

| Metric | Type | Description |
|--------|------|-------------|
| `requests_total_value` | Counter | Total number of requests |
| `response_errors_total_value` | Counter | Total number of failed requests (for example, 5xx responses) |
| `inprogress_requests_value` | Gauge | Number of requests currently being processed |
| `response_time_seconds` | Summary | Response time quantiles (`quantile` label) over time windows of 10, 60 and 300 seconds (`timeWindow` label: `10000`, `60000`, `300000`) |
| `response_time_seconds_value` | Gauge | Response time of the latest request |
| `response_time_seconds_mean`, `_max`, `_min`, `_stdDev` | Gauge | Response time statistics over the same time windows |
| `response_time_nanoseconds_total_value` | Counter | Total response time in nanoseconds |

The same metrics cover both HTTP services and HTTP clients, so they include the service that hosts your agent. Labels identify the source, for example:

- Services: `entrypoint_service_name`, `src_resource_path`, `http_url`, `http_method`, and `http_status_code_group` (`2xx`, `4xx`, `5xx`)
- Clients: `src_client_remote="true"`, `http_base_url` or `peer_address`, `http_method`, and `http_status_code_group`
- All metrics: `src_module` and `entrypoint_function_name`. Failed requests also carry `error="true"`

## Custom Metrics

Create application-specific metrics to track business KPIs and agent-specific measurements beyond the built-in metrics.

### When to use custom metrics

- Track agent activity (conversations handled, tasks completed, escalations to a human)
- Monitor SLA compliance (agent response times, error rates per agent)
- Measure agent throughput and the number of agent runs in progress
- Create domain-specific dashboards

### Counter (Monotonically increasing)

Use counters for metrics that only increase. A metric is exported only after you register it:

```ballerina
import ballerina/observe;

final observe:Counter agentRuns = new ("agent_runs_total",
    desc = "Total number of agent runs"
);

function init() returns error? {
    // Register the metric so that it's exported
    check agentRuns.register();
}

// Call from your service or automation logic after each agent run
function recordAgentRun() {
    agentRuns.increment();
}
```

The exported name gets a `_value` suffix, so this counter appears as `agent_runs_total_value`.

### Gauge (Value that goes up and down)

Use gauges for metrics that can increase or decrease:

```ballerina
import ballerina/observe;

final observe:Gauge activeAgentRuns = new ("agent_runs_active",
    desc = "Number of agent runs in progress"
);

function init() returns error? {
    check activeAgentRuns.register();
}

function onAgentRunStart() {
    activeAgentRuns.increment();
}

function onAgentRunEnd() {
    activeAgentRuns.decrement();
}
```

This gauge is exported as `agent_runs_active_value`, along with statistics over a time window: `agent_runs_active` (quantiles) and `agent_runs_active_mean`, `_max`, `_min` and `_stdDev`.

### Tags and statistics

Custom metrics can carry tags, which are exported as Prometheus labels. There is no histogram type. To record a distribution such as the time an agent takes to answer, set each value on a gauge and use its statistics.

The following service hosts a support agent and records how many runs succeed or fail, how many are in progress, and how long each run takes. Because the module has an `init` function that registers the metrics, the agent is also created in `init`:

```ballerina
import ballerina/ai;
import ballerina/http;
import ballerina/observe;
import ballerina/time;

// Each distinct set of tags is a separate series of the same metric
final observe:Counter agentRunsSucceeded = new ("agent_runs_total",
    desc = "Total number of agent runs",
    tags = {"status": "success", "agent": "support"}
);

final observe:Counter agentRunsFailed = new ("agent_runs_total",
    desc = "Total number of agent runs",
    tags = {"status": "failure", "agent": "support"}
);

final observe:Gauge activeAgentRuns = new ("agent_runs_active",
    desc = "Number of agent runs in progress",
    tags = {"agent": "support"}
);

final observe:Gauge agentRunDuration = new ("agent_run_duration_seconds",
    desc = "Time taken for the agent to answer a request"
);

// Default model provider
final ai:Wso2ModelProvider wso2ModelProvider =
    check ai:getDefaultModelProvider();

// Agent declaration
final ai:Agent supportAgent;

function init() returns error? {
    check agentRunsSucceeded.register();
    check agentRunsFailed.register();
    check activeAgentRuns.register();
    check agentRunDuration.register();
    supportAgent = check new (
        systemPrompt = {
            role: string `Support Agent`,
            instructions: string `You answer customer questions about
                orders, deliveries, and returns.`
        },
        model = wso2ModelProvider
    );
}

service /support on new http:Listener(8080) {
    resource function post chat(@http:Payload ai:ChatReqMessage request)
            returns ai:ChatRespMessage|error {
        decimal startTime = time:monotonicNow();
        activeAgentRuns.increment();

        string|error answer = supportAgent.run(request.message, request.sessionId);

        activeAgentRuns.decrement();
        agentRunDuration.setValue(<float>(time:monotonicNow() - startTime));
        if answer is error {
            agentRunsFailed.increment();
            return answer;
        }
        agentRunsSucceeded.increment();
        return {message: answer};
    }
}
```

## Send metrics to Amazon Managed Service for Prometheus

On AWS, have an [AWS Distro for OpenTelemetry](https://aws-otel.github.io/) collector or the CloudWatch agent scrape the agent's metrics endpoint (port `9797`), and remote-write the metrics to Amazon Managed Service for Prometheus or publish them to CloudWatch. Use the same scrape settings as in [Setting up Prometheus](#setting-up-prometheus).

The endpoint exists only when Prometheus metrics are enabled in `Config.toml`, as shown in [Configure the agent for Prometheus](#configure-the-agent-for-prometheus). In a container, where `Config.toml` isn't part of the image, set the same values as environment variables: `BAL_CONFIG_VAR_BALLERINA_OBSERVE_METRICSENABLED=true`, `BAL_CONFIG_VAR_BALLERINA_OBSERVE_METRICSREPORTER=prometheus`, and, to change the defaults, `BAL_CONFIG_VAR_BALLERINAX_PROMETHEUS_HOST` and `BAL_CONFIG_VAR_BALLERINAX_PROMETHEUS_PORT`.

## What's next

- [Prometheus and Grafana](open-source/prometheus-grafana.md) — Scrape configuration, Kubernetes, and Grafana dashboards
- [Distributed tracing](tracing.md) — Trace requests across services with Jaeger or Zipkin
- [OpenTelemetry](open-source/opentelemetry.md) — Push metrics over OTLP to an OpenTelemetry Collector or other backend
- [Logging](logging.md) — Configure structured logging
- [Integration Control Plane](product://integrator/icp) — Centralized monitoring dashboard
- [Overview](observe.md) — Full observability architecture
