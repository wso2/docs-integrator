---
title: Metrics (Prometheus, Grafana)
---

# Metrics (Prometheus, Grafana)

Monitor the health and performance of your WSO2 Integrator services using Prometheus metrics and Grafana dashboards.

## Enabling Prometheus Metrics

Ballerina has built-in support for exposing metrics in Prometheus format. Enable the metrics endpoint by adding the `ballerina/observe` dependency and configuring it in `Config.toml`:

```toml
# Config.toml
[ballerina.observe]
metricsEnabled = true
metricsReporter = "prometheus"

[ballerinax.prometheus]
port = 9797
host = "0.0.0.0"
```

Add the observe module to your `Ballerina.toml` dependencies:

```toml
# Ballerina.toml
[[dependency]]
org = "ballerinax"
name = "prometheus"
version = "1.0.0"
```

When the application starts, a Prometheus-compatible metrics endpoint is available at `http://localhost:9797/metrics`.

## Default Metrics Exposed

Ballerina automatically collects and exposes the following metrics without any additional code:

### HTTP Service Metrics

| Metric | Type | Description |
|---|---|---|
| `http_requests_total` | Counter | Total number of HTTP requests received |
| `http_request_duration_seconds` | Histogram | Request processing duration |
| `http_requests_in_flight` | Gauge | Number of requests currently being processed |
| `http_response_status_total` | Counter | Response count by HTTP status code |

### HTTP Client Metrics

| Metric | Type | Description |
|---|---|---|
| `http_client_requests_total` | Counter | Total outbound HTTP requests |
| `http_client_request_duration_seconds` | Histogram | Outbound request duration |
| `http_client_response_status_total` | Counter | Outbound response count by status code |

### JVM Metrics

| Metric | Type | Description |
|---|---|---|
| `jvm_memory_bytes_used` | Gauge | JVM memory usage |
| `jvm_threads_current` | Gauge | Current number of JVM threads |
| `jvm_gc_collection_seconds_total` | Counter | Time spent in garbage collection |

## Custom Metrics

Create application-specific metrics using the `ballerina/observe` module:

```ballerina
import ballerina/observe;
import ballerina/http;

// Define custom metrics
final observe:Counter orderCounter = new("orders_processed_total",
    "Total number of orders processed",
    ["status", "region"]
);

final observe:Gauge activeOrders = new("orders_active",
    "Number of orders currently being processed",
    ["region"]
);

final observe:Histogram orderProcessingTime = new("order_processing_duration_seconds",
    "Time taken to process an order",
    [],
    [0.01, 0.05, 0.1, 0.25, 0.5, 1.0, 2.5, 5.0, 10.0]
);

service /orders on new http:Listener(9090) {
    resource function post .(@http:Payload json order) returns json|error {
        int startTime = observe:currentTimeMillis();
        activeOrders.increment(1.0, ["us-east"]);

        do {
            // Process order...
            orderCounter.increment(1.0, ["success", "us-east"]);
            return { status: "accepted" };
        } on fail error e {
            orderCounter.increment(1.0, ["failure", "us-east"]);
            return e;
        } finally {
            activeOrders.increment(-1.0, ["us-east"]);
            float duration = <float>(observe:currentTimeMillis() - startTime) / 1000.0;
            orderProcessingTime.observe(duration, []);
        }
    }
}
```

## Prometheus Scrape Configuration

Configure Prometheus to scrape metrics from your Ballerina services.

### Kubernetes ServiceMonitor

If using the Prometheus Operator, create a ServiceMonitor:

```yaml
# k8s/servicemonitor.yaml
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: wso2-integrator-metrics
  namespace: production
  labels:
    release: prometheus
spec:
  selector:
    matchLabels:
      app: wso2-integrator-app
  endpoints:
    - port: metrics
      path: /metrics
      interval: 15s
```

Add a metrics port to your Service:

```yaml
# k8s/service.yaml
apiVersion: v1
kind: Service
metadata:
  name: wso2-integrator-app
  labels:
    app: wso2-integrator-app
spec:
  ports:
    - name: http
      port: 9090
    - name: metrics
      port: 9797
  selector:
    app: wso2-integrator-app
```

### Static Prometheus Configuration

For non-Kubernetes environments, add a scrape target to `prometheus.yml`:

```yaml
# prometheus.yml
scrape_configs:
  - job_name: "wso2-integrator"
    scrape_interval: 15s
    static_configs:
      - targets: ["integrator-host:9797"]
        labels:
          environment: "production"
          service: "order-service"
```

## Grafana Dashboard Setup

Create a Grafana dashboard to visualize your integration metrics.

### Data Source Configuration

1. In Grafana, navigate to **Configuration > Data Sources**
2. Add a Prometheus data source pointing to your Prometheus server
3. Set the URL (e.g., `http://prometheus:9090`)

### Dashboard Panels

Create panels for the following key metrics:

**Request Rate Panel (Graph):**

```promql
rate(http_requests_total{job="wso2-integrator"}[5m])
```

**Error Rate Panel (Graph):**

```promql
rate(http_response_status_total{job="wso2-integrator", status_code=~"5.."}[5m])
/ rate(http_requests_total{job="wso2-integrator"}[5m])
```

**Request Duration P99 Panel (Graph):**

```promql
histogram_quantile(0.99, rate(http_request_duration_seconds_bucket{job="wso2-integrator"}[5m]))
```

**Active Requests Panel (Stat):**

```promql
http_requests_in_flight{job="wso2-integrator"}
```

**Custom Order Metrics Panel (Graph):**

```promql
rate(orders_processed_total{status="success"}[5m])
```

### Alerting Rules

Define Prometheus alerting rules for critical conditions:

```yaml
# prometheus-rules.yaml
groups:
  - name: wso2-integrator-alerts
    rules:
      - alert: HighErrorRate
        expr: rate(http_response_status_total{status_code=~"5.."}[5m]) > 0.05
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "High error rate on {{ $labels.service }}"
          description: "Error rate is {{ $value | humanizePercentage }} over the last 5 minutes"

      - alert: HighLatency
        expr: histogram_quantile(0.99, rate(http_request_duration_seconds_bucket[5m])) > 2
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High P99 latency on {{ $labels.service }}"
```

## What's Next

- [Jaeger distributed tracing](jaeger-distributed-tracing.md) -- Trace requests across services
- [Logging overview](logging-overview.md) -- Configure structured logging
- [Integration Control Plane](integration-control-plane-icp.md) -- Centralized monitoring dashboard
