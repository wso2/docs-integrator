---
sidebar_position: 12
title: New Relic Integration
description: Send Ballerina integration metrics, traces, and logs to New Relic.
---

# New Relic Integration

New Relic provides a full-stack observability platform for monitoring your Ballerina integrations. You can forward metrics via the Prometheus remote write integration, traces via OpenTelemetry, and logs via the New Relic infrastructure agent.

## Prerequisites

| Requirement | Details |
|-------------|---------|
| New Relic Account | Active account with an Ingest License Key |
| Ballerina | Built with `--observability-included` |

## Step 1 -- Forward Metrics via Prometheus Remote Write

Configure Prometheus to forward Ballerina metrics to New Relic:

```yaml
# prometheus.yml
global:
  scrape_interval: 15s

remote_write:
  - url: https://metric-api.newrelic.com/prometheus/v1/write
    bearer_token: <NEW_RELIC_LICENSE_KEY>

scrape_configs:
  - job_name: "ballerina-integration"
    static_configs:
      - targets: ["localhost:9797"]
```

Alternatively, use the New Relic Prometheus Agent:

```bash
docker run -d \
  -e LICENSE_KEY=<NEW_RELIC_LICENSE_KEY> \
  -e PROMETHEUS_SERVER=http://localhost:9797 \
  newrelic/nri-prometheus:latest
```

## Step 2 -- Forward Traces via OpenTelemetry

Configure Ballerina to export traces to New Relic via the OpenTelemetry Collector:

### OpenTelemetry Collector Configuration

```yaml
# otel-collector-config.yaml
receivers:
  jaeger:
    protocols:
      thrift_compact:
        endpoint: "0.0.0.0:6831"

exporters:
  otlp:
    endpoint: "otlp.nr-data.net:4317"
    headers:
      api-key: <NEW_RELIC_LICENSE_KEY>

service:
  pipelines:
    traces:
      receivers: [jaeger]
      exporters: [otlp]
```

### Ballerina Configuration

```toml
[ballerina.observe]
tracingEnabled = true
tracingProvider = "jaeger"

[ballerinax.jaeger]
agentHostname = "localhost"
agentPort = 6831
```

## Step 3 -- Forward Logs

### Using the New Relic Infrastructure Agent

Install and configure the infrastructure agent to tail log files:

```yaml
# /etc/newrelic-infra/logging.d/ballerina.yml
logs:
  - name: ballerina-integration
    file: /var/log/integrations/*.log
    attributes:
      service: order-service
      environment: production
```

### Using Fluent Bit

```ini
[INPUT]
    Name tail
    Path /var/log/integrations/*.log
    Tag ballerina.*

[OUTPUT]
    Name newrelic
    Match *
    licenseKey <NEW_RELIC_LICENSE_KEY>
    endpoint https://log-api.newrelic.com/log/v1
```

## Step 4 -- Create Dashboards in New Relic

Use NRQL to query your Ballerina metrics:

| Panel | NRQL Query |
|-------|------------|
| Request Rate | `SELECT rate(sum(http_requests_total), 1 minute) FROM Metric WHERE service='order-service'` |
| p95 Latency | `SELECT percentile(http_request_duration_seconds, 95) FROM Metric WHERE service='order-service'` |
| Error Count | `SELECT sum(http_response_errors_total) FROM Metric WHERE service='order-service'` |
| Active Connections | `SELECT latest(http_active_requests) FROM Metric WHERE service='order-service'` |

## Alerting

Create alert policies in New Relic:

1. Navigate to **Alerts & AI** > **Alert Policies**.
2. Create a new policy.
3. Add an NRQL alert condition.
4. Define the threshold and notification channels.

## What's Next

- [Datadog](datadog.md) -- Alternative full-stack observability platform
- [Prometheus](prometheus.md) -- Self-managed metrics collection
- [Observability Overview](index.md) -- Full observability architecture
