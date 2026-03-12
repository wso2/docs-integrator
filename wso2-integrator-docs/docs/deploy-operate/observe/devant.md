---
sidebar_position: 6
title: Observability with WSO2 Devant
description: Use WSO2 Devant for integrated observability of your Ballerina integrations.
---

# Observability with WSO2 Devant

WSO2 Devant provides a fully managed observability experience for integrations deployed through the Devant platform. It offers built-in dashboards, alerting, and log aggregation without requiring you to set up external observability infrastructure.

## Features

| Feature | Description |
|---------|-------------|
| Request Metrics | Automatic request count, latency, and error rate tracking |
| Live Logs | Real-time log streaming from running integrations |
| Distributed Tracing | End-to-end trace visualization across services |
| Alerting | Threshold-based alerts for latency, error rate, and throughput |
| Diagnostics | Memory, CPU, and thread diagnostics per deployment |

## Enabling Observability in Devant

Observability is enabled by default for all integrations deployed to WSO2 Devant. No additional configuration is required.

If you need to customize the observability settings, update your `Cloud.toml`:

```toml
[cloud.deployment]
observability = true

[cloud.deployment.observability]
metricsEnabled = true
tracingEnabled = true
loggingEnabled = true
```

## Viewing Metrics

### Request Metrics Dashboard

Access the metrics dashboard from the Devant console:

1. Navigate to your integration in the Devant console.
2. Select the **Observability** tab.
3. View request rate, latency percentiles (p50, p95, p99), and error rates.

### Available Metrics

| Metric | Description |
|--------|-------------|
| Request Rate | Requests per second over time |
| Latency (p50/p95/p99) | Response time percentiles |
| Error Rate | Percentage of failed requests |
| Throughput | Data volume processed |
| Active Connections | Current connection count |

## Viewing Logs

Stream logs in real time from the Devant console:

1. Navigate to your integration.
2. Select the **Logs** tab.
3. Filter by log level (DEBUG, INFO, WARN, ERROR).

### Structured Log Format

Logs emitted by your integration are automatically parsed as structured JSON:

```ballerina
import ballerina/log;

log:printInfo("Order processed", orderId = orderId, amount = totalAmount);
```

This produces searchable log entries with `orderId` and `amount` as filterable fields in the Devant console.

## Distributed Tracing

Devant automatically instruments your integrations for distributed tracing:

1. Navigate to your integration.
2. Select the **Traces** tab.
3. Click on a trace to see the full request flow across services.

Trace spans include:
- HTTP request/response details
- Database query execution times
- External API call latencies
- Message broker publish/consume events

## Alerting

Configure alerts from the Devant console:

1. Navigate to **Observability** > **Alerts**.
2. Create a new alert rule.
3. Set the condition (e.g., error rate > 5% for 5 minutes).
4. Configure the notification channel (email, Slack, PagerDuty).

### Example Alert Rules

| Alert | Condition | Action |
|-------|-----------|--------|
| High Error Rate | Error rate > 5% for 5 min | Slack notification |
| High Latency | p95 latency > 2s for 10 min | PagerDuty alert |
| Low Throughput | Requests < 10/min for 15 min | Email notification |
| Memory Threshold | Memory usage > 80% | Slack notification |

## Diagnostics

Access runtime diagnostics for troubleshooting:

- **Thread Dump**: Capture a snapshot of all active threads and strands.
- **Heap Summary**: View memory allocation breakdown.
- **CPU Profile**: Identify hot code paths.

## What's Next

- [Prometheus](prometheus.md) -- Set up self-managed metrics collection
- [Grafana](grafana.md) -- Build custom dashboards for on-premise deployments
- [Jaeger](jaeger.md) -- Self-managed distributed tracing
