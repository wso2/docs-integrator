---
sidebar_position: 8
title: Grafana Dashboards
description: Set up Grafana dashboards to visualize Ballerina integration metrics.
---

# Grafana Dashboards

Grafana provides rich visualization capabilities for the metrics collected by Prometheus from your Ballerina integrations. This page covers setting up a Grafana data source, importing pre-built dashboards, and creating custom panels.

## Prerequisites

| Requirement | Details |
|-------------|---------|
| Grafana | Version 9.0 or later |
| Prometheus | Running and scraping Ballerina metrics |
| Network | Grafana must reach the Prometheus server |

## Step 1 -- Add Prometheus Data Source

1. Open Grafana and navigate to **Configuration** > **Data Sources**.
2. Click **Add data source** and select **Prometheus**.
3. Configure the connection:

| Setting | Value |
|---------|-------|
| URL | `http://prometheus:9090` |
| Access | Server (default) |
| Scrape interval | `15s` |

4. Click **Save & Test** to verify the connection.

## Step 2 -- Import the Ballerina Dashboard

Import the pre-built Ballerina integration dashboard:

1. Navigate to **Dashboards** > **Import**.
2. Enter the dashboard JSON or ID.
3. Select the Prometheus data source.
4. Click **Import**.

### Dashboard Panels

The pre-built dashboard includes the following panels:

| Panel | Metric | Visualization |
|-------|--------|---------------|
| Request Rate | `rate(http_requests_total[5m])` | Time series |
| Error Rate | `rate(http_response_errors_total[5m])` | Time series |
| Latency (p50/p95/p99) | `histogram_quantile(0.95, ...)` | Time series |
| Active Connections | `http_active_requests` | Gauge |
| DB Query Latency | `ballerina_sql_query_duration_seconds` | Heatmap |
| Request Volume | `increase(http_requests_total[1h])` | Bar chart |

## Step 3 -- Create Custom Panels

### Request Rate by Resource

```promql
sum(rate(http_requests_total{job="ballerina-integration"}[5m])) by (resource)
```

### p95 Latency per Endpoint

```promql
histogram_quantile(0.95,
  sum(rate(http_request_duration_seconds_bucket{job="ballerina-integration"}[5m])) by (le, resource)
)
```

### Error Rate Percentage

```promql
100 * (
  sum(rate(http_response_errors_total{job="ballerina-integration"}[5m])) by (resource)
  /
  sum(rate(http_requests_total{job="ballerina-integration"}[5m])) by (resource)
)
```

### Database Connection Pool Usage

```promql
ballerina_sql_active_connections{job="ballerina-integration"}
```

## Alerting in Grafana

Configure Grafana alerts for critical thresholds:

1. Open a panel and navigate to the **Alert** tab.
2. Define the alert condition.
3. Set the notification channel (email, Slack, PagerDuty).

Example alert: Error rate exceeds 5% for 5 minutes.

### Notification Channels

| Channel | Setup |
|---------|-------|
| Email | Configure SMTP in `grafana.ini` |
| Slack | Add Slack webhook URL |
| PagerDuty | Add PagerDuty integration key |
| Microsoft Teams | Add Teams webhook URL |

## Docker Compose Setup

Run Prometheus and Grafana together for local development:

```yaml
version: "3.8"
services:
  prometheus:
    image: prom/prometheus:latest
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml

  grafana:
    image: grafana/grafana:latest
    ports:
      - "3000:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
    volumes:
      - grafana-data:/var/lib/grafana

volumes:
  grafana-data:
```

## What's Next

- [Prometheus](prometheus.md) -- Configure Prometheus metrics collection
- [Jaeger](jaeger.md) -- Add distributed tracing visualization
- [Datadog](datadog.md) -- Forward metrics to Datadog
