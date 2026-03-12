---
sidebar_position: 11
title: Datadog Integration
description: Send Ballerina integration metrics, traces, and logs to Datadog.
---

# Datadog Integration

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

## Step 1 -- Install the Datadog Agent

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
  -p 8126:8126 \
  -p 8125:8125/udp \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  datadog/agent:latest
```

### Kubernetes

Deploy with the Datadog Operator or Helm chart:

```bash
helm install datadog-agent datadog/datadog \
  --set datadog.apiKey=<your-api-key> \
  --set datadog.apm.portEnabled=true \
  --set datadog.logs.enabled=true
```

## Step 2 -- Forward Metrics to Datadog

Configure the Datadog Agent to scrape Prometheus metrics from your Ballerina integration.

Create `/etc/datadog-agent/conf.d/openmetrics.d/conf.yaml`:

```yaml
instances:
  - openmetrics_endpoint: "http://localhost:9797/metrics"
    namespace: "ballerina"
    metrics:
      - http_requests_total
      - http_request_duration_seconds
      - http_response_errors_total
      - http_active_requests
      - ballerina_sql_query_duration_seconds
    tags:
      - "service:order-service"
      - "environment:production"
```

Restart the agent:

```bash
sudo systemctl restart datadog-agent
```

## Step 3 -- Forward Traces to Datadog

Configure Ballerina to send traces via OpenTelemetry to the Datadog Agent:

```toml
[ballerina.observe]
tracingEnabled = true
tracingProvider = "jaeger"

[ballerinax.jaeger]
agentHostname = "localhost"
agentPort = 6831
```

Configure the Datadog Agent to accept Jaeger traces:

```yaml
# /etc/datadog-agent/datadog.yaml
apm_config:
  enabled: true
  apm_non_local_traffic: true
  receiver_port: 8126
```

## Step 4 -- Forward Logs to Datadog

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

## Step 5 -- Create Datadog Dashboards

Build dashboards in Datadog to visualize your integration metrics:

### Useful Queries

| Panel | Query |
|-------|-------|
| Request Rate | `sum:ballerina.http_requests_total.count{service:order-service}.as_rate()` |
| Error Rate | `sum:ballerina.http_response_errors_total.count{service:order-service}.as_rate()` |
| p95 Latency | `p95:ballerina.http_request_duration_seconds{service:order-service}` |
| Active Connections | `avg:ballerina.http_active_requests{service:order-service}` |

## Alerting

Create Datadog monitors for critical thresholds:

1. Navigate to **Monitors** > **New Monitor**.
2. Select **Metric** monitor type.
3. Define the query: `sum:ballerina.http_response_errors_total.count{service:order-service}.as_rate() > 0.05`.
4. Set notification channels.

## What's Next

- [Prometheus](prometheus.md) -- Self-managed metrics collection
- [New Relic](new-relic.md) -- Alternative full-stack observability platform
- [Observability Overview](index.md) -- Full observability architecture
