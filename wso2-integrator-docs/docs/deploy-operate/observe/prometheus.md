---
sidebar_position: 7
title: Prometheus Metrics
description: Configure Prometheus metrics collection for Ballerina integrations.
---

# Prometheus Metrics

Prometheus is an open-source monitoring system that collects time-series metrics via a pull model. WSO2 Integrator exposes a Prometheus-compatible metrics endpoint out of the box when observability is enabled.

## Prerequisites

| Requirement | Details |
|-------------|---------|
| Prometheus | Version 2.40 or later |
| Ballerina | Built with `--observability-included` |
| Network | Prometheus must be able to reach the metrics endpoint |

## Step 1 -- Enable Prometheus Metrics

Build your integration with observability:

```bash
bal build --observability-included
```

Configure `Config.toml`:

```toml
[ballerina.observe]
metricsEnabled = true
metricsReporter = "prometheus"

[ballerinax.prometheus]
port = 9797
host = "0.0.0.0"
```

The metrics endpoint is now available at `http://<host>:9797/metrics`.

## Step 2 -- Configure Prometheus

Add a scrape target to your `prometheus.yml`:

```yaml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

scrape_configs:
  - job_name: "ballerina-integration"
    metrics_path: "/metrics"
    static_configs:
      - targets: ["integration-host:9797"]
        labels:
          environment: "production"
          service: "order-service"
```

### Kubernetes Service Discovery

For Kubernetes deployments, use service discovery:

```yaml
scrape_configs:
  - job_name: "ballerina-k8s"
    kubernetes_sd_configs:
      - role: pod
    relabel_configs:
      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]
        action: keep
        regex: "true"
      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_port]
        action: replace
        target_label: __address__
        regex: (.+)
        replacement: ${1}:9797
```

Add annotations to your Kubernetes pods:

```yaml
metadata:
  annotations:
    prometheus.io/scrape: "true"
    prometheus.io/port: "9797"
    prometheus.io/path: "/metrics"
```

## Step 3 -- Verify Metrics Collection

Query Prometheus to verify metrics are being collected:

```bash
curl http://localhost:9797/metrics
```

Sample output:

```
# HELP http_requests_total Total HTTP requests
# TYPE http_requests_total counter
http_requests_total{method="GET",resource="/api/orders",status="200"} 1542
http_requests_total{method="POST",resource="/api/orders",status="201"} 387

# HELP http_request_duration_seconds HTTP request latency
# TYPE http_request_duration_seconds histogram
http_request_duration_seconds_bucket{le="0.005"} 1200
http_request_duration_seconds_bucket{le="0.01"} 1450
http_request_duration_seconds_bucket{le="0.025"} 1800
```

## Default Metrics Reference

| Metric | Type | Labels | Description |
|--------|------|--------|-------------|
| `http_requests_total` | Counter | method, resource, status | Total HTTP requests |
| `http_request_duration_seconds` | Histogram | method, resource | Request latency |
| `http_response_errors_total` | Counter | method, resource, status | Error responses |
| `http_active_requests` | Gauge | resource | Currently processing requests |
| `http_request_size_bytes` | Histogram | method, resource | Request body size |
| `http_response_size_bytes` | Histogram | method, resource | Response body size |
| `ballerina_sql_query_duration_seconds` | Histogram | query_type | Database query latency |
| `ballerina_sql_active_connections` | Gauge | pool_name | Active DB connections |

## Custom Metrics

Define custom metrics in your Ballerina code:

```ballerina
import ballerina/observe;

final observe:Counter orderCounter = new ("orders_processed_total",
    "Total orders processed",
    ["status", "region"]
);

final observe:Gauge activeOrders = new ("active_orders",
    "Currently active orders",
    ["region"]
);

service /api on new http:Listener(9090) {
    resource function post orders(http:Request req) returns json|error {
        activeOrders.increment(1.0, ["us-east"]);

        // Process order...
        json result = check processOrder(req);

        orderCounter.increment(1.0, ["success", "us-east"]);
        activeOrders.decrement(1.0, ["us-east"]);
        return result;
    }
}
```

## Alerting Rules

Create Prometheus alerting rules for your integrations:

```yaml
groups:
  - name: ballerina-integration-alerts
    rules:
      - alert: HighErrorRate
        expr: rate(http_response_errors_total[5m]) / rate(http_requests_total[5m]) > 0.05
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "High error rate on {{ $labels.resource }}"

      - alert: HighLatency
        expr: histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m])) > 2
        for: 10m
        labels:
          severity: warning
        annotations:
          summary: "High p95 latency on {{ $labels.resource }}"
```

## What's Next

- [Grafana](grafana.md) -- Visualize Prometheus metrics with dashboards
- [Observability Overview](index.md) -- Full observability architecture
- [Datadog](datadog.md) -- Forward Prometheus metrics to Datadog
