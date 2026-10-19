---
title: Datadog
---

# Datadog

Datadog provides a full-stack observability platform for monitoring your Ballerina integrations. You can forward metrics, distributed traces, and logs to Datadog using the Datadog Agent or direct API ingestion.

## Prerequisites

| Requirement | Details |
|-------------|---------|
| Datadog Account | Active Datadog account with API key |
| Datadog Agent | Version 7.x or later (installed on the host or as a sidecar) |
| Ballerina | Built with `--observability-included` |

## Architecture

```
Ballerina Integration
  ├── Prometheus metrics ──▶ Datadog Agent ──▶ Datadog Cloud
  ├── OpenTelemetry traces ──▶ Datadog Agent ──▶ Datadog Cloud
  └── Structured logs ──▶ Datadog Agent ──▶ Datadog Cloud
```

## Step 1 -- install the datadog agent

### Linux

```bash
DD_API_KEY=<your-api-key> DD_SITE="datadoghq.com" \
  bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
```

### Docker

```bash
docker run -d --name datadog-agent \
  -e DD_API_KEY=<your-api-key> \
  -e DD_SITE="datadoghq.com" \
  -e DD_APM_ENABLED=true \
  -e DD_LOGS_ENABLED=true \
  -e DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_GRPC_ENDPOINT=0.0.0.0:4317 \
  -p 8126:8126 \
  -p 8125:8125/udp \
  -p 4317:4317 \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  datadog/agent:latest
```

When the agent runs in Docker, mount the configuration files from Steps 2 and 4 into `/etc/datadog-agent/conf.d/` and mount the integration's log directory (for example, `-v /var/log/integrations:/var/log/integrations:ro`). Inside the container, `localhost` is the container itself, so use an address that reaches the integration (for example, `host.docker.internal`) in the `openmetrics_endpoint`.

### Kubernetes

Deploy with the Datadog Operator or Helm chart:

```bash
helm install datadog-agent datadog/datadog \
  --set datadog.apiKey=<your-api-key> \
  --set datadog.apm.portEnabled=true \
  --set datadog.logs.enabled=true \
  --set datadog.otlp.receiver.protocols.grpc.enabled=true
```

## Step 2 -- forward metrics to datadog

Enable Prometheus metrics in your integration. Add the import to your `main.bal` file:

```ballerina
import ballerinax/prometheus as _;
```

Add the following to `Config.toml`. Metrics are exposed at `http://<host>:9797/metrics`:

```toml
[ballerina.observe]
metricsEnabled = true
metricsReporter = "prometheus"
```

Configure the Datadog Agent to scrape Prometheus metrics from your Ballerina integration.

Create `/etc/datadog-agent/conf.d/openmetrics.d/conf.yaml`:

```yaml
instances:
  - openmetrics_endpoint: "http://localhost:9797/metrics"
    namespace: "ballerina"
    metrics:
      - requests_total_value
      - response_time_seconds
      - response_errors_total_value
      - inprogress_requests_value
    tags:
      - "service:order-service"
      - "environment:production"
```

Restart the agent:

```bash
sudo systemctl restart datadog-agent
```

## Step 3 -- forward traces to datadog

Configure Ballerina to send traces via OpenTelemetry to the Datadog Agent. The `ballerinax/jaeger` extension exports traces over OTLP gRPC. Add the import to your `main.bal` file:

```ballerina
import ballerinax/jaeger as _;
```

Update `Config.toml` to enable tracing and point the exporter at the agent's OTLP gRPC port:

```toml
[ballerina.observe]
metricsEnabled = true
metricsReporter = "prometheus"
tracingEnabled = true
tracingProvider = "jaeger"

[ballerinax.jaeger]
agentHostname = "localhost"
agentPort = 4317
```

On Kubernetes, the Helm chart runs the agent on each node, so set `agentHostname` to the node IP (for example, from the `status.hostIP` field) instead of `localhost`.

Configure the Datadog Agent to accept OpenTelemetry (OTLP) traces:

```yaml
# /etc/datadog-agent/datadog.yaml
apm_config:
  enabled: true
otlp_config:
  receiver:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
```

## Step 4 -- forward logs to datadog

By default, Ballerina writes logs to stderr. Add the following to `Config.toml` so that the integration writes JSON logs to a file that the agent can tail:

```toml
[ballerina.log]
format = "json"

[[ballerina.log.destinations]]
type = "file"
path = "/var/log/integrations/order-service.log"
```

Configure the Datadog Agent to collect logs from your integration:

```yaml
# /etc/datadog-agent/conf.d/ballerina.d/conf.yaml
logs:
  - type: file
    path: /var/log/integrations/*.log
    service: order-service
    source: ballerina
    tags:
      - "environment:production"
```

Enable log collection in the agent config:

```yaml
# /etc/datadog-agent/datadog.yaml
logs_enabled: true
```

## Step 5 -- create datadog dashboards

Build dashboards in Datadog to visualize your integration metrics:

### Useful queries

| Panel | Query |
|-------|-------|
| Request Rate | `sum:ballerina.requests_total_value.count{service:order-service}.as_rate()` |
| Error Rate | `sum:ballerina.response_errors_total_value.count{service:order-service}.as_rate()` |
| p95 Latency | `avg:ballerina.response_time_seconds.quantile{service:order-service,quantile:0.95,timewindow:300000}` |
| Active Connections | `avg:ballerina.inprogress_requests_value{service:order-service}` |

## Alerting

Create Datadog monitors for critical thresholds:

1. Navigate to **Monitors** > **New Monitor**.
2. Select **Metric** monitor type.
3. Define the query: `sum:ballerina.response_errors_total_value.count{service:order-service}.as_rate() > 0.05`.
4. Set notification channels.

## What's next

- [Datadog: End-to-End Setup](../recipes/datadog-setup.md) — A complete walkthrough with a Datadog account, the agent, and Prometheus and Jaeger extensions
- [Metrics Overview](../metrics.md) -- Self-managed metrics collection with Prometheus
- [New Relic](new-relic.md) -- Alternative full-stack observability platform
- [Observability Overview](../observe.md) -- Full observability architecture
