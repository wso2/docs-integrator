---
title: Prometheus and Grafana
---

# Prometheus and Grafana

Scrape your agent's metrics with Prometheus and visualize them in Grafana dashboards.

To enable the metrics endpoint, see the default metrics Ballerina exposes, or define custom metrics, start with [Metrics](../metrics.md).

## Prometheus Scrape Configuration

Configure Prometheus to scrape metrics from your Ballerina services.

### Kubernetes ServiceMonitor

If using the Prometheus Operator, create a ServiceMonitor:

```yaml
# k8s/servicemonitor.yaml
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: wso2-agent-metrics
  namespace: production
  labels:
    release: prometheus
spec:
  selector:
    matchLabels:
      app: wso2-agent-app
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
  name: wso2-agent-app
  labels:
    app: wso2-agent-app
spec:
  ports:
    - name: http
      port: 9090
    - name: metrics
      port: 9797
  selector:
    app: wso2-agent-app
```

### Static Prometheus Configuration

For non-Kubernetes environments, add a scrape target to `prometheus.yml`:

```yaml
# prometheus.yml
scrape_configs:
  - job_name: "wso2-agent"
    scrape_interval: 15s
    static_configs:
      - targets: ["agent-host:9797"]
        labels:
          environment: "production"
          service: "support-agent"
```

## Grafana Dashboard Setup

Create a Grafana dashboard to visualize your agent metrics.

### Data Source Configuration

1. In Grafana, navigate to **Connections > Data sources**
2. Add a Prometheus data source pointing to your Prometheus server
3. Set the URL (e.g., `http://prometheus:9090`)

### Dashboard Panels

Create panels for the following key metrics. Ballerina exports counters and gauges with a `_value` suffix, and response times as a summary (`response_time_seconds` with `quantile` and `timeWindow` labels), not a histogram:

**Request Rate Panel (Graph):**

```promql
sum by (http_url) (rate(requests_total_value{job="wso2-agent"}[5m]))
```

**Error Rate Panel (Graph):**

```promql
sum(rate(requests_total_value{job="wso2-agent", http_status_code_group="5xx"}[5m]))
/ sum(rate(requests_total_value{job="wso2-agent"}[5m]))
```

**Request Duration P99 Panel (Graph):**

```promql
max by (http_url) (response_time_seconds{job="wso2-agent", quantile="0.99", timeWindow="60000"})
```

**Active Requests Panel (Stat):**

```promql
sum(inprogress_requests_value{job="wso2-agent"})
```

**Custom Agent Metrics Panel (Graph):**

```promql
rate(agent_runs_total_value{status="success"}[5m])
```

### Alerting Rules

Define Prometheus alerting rules for critical conditions:

```yaml
# prometheus-rules.yaml
groups:
  - name: wso2-agent-alerts
    rules:
      - alert: HighErrorRate
        expr: sum by (service) (rate(requests_total_value{http_status_code_group="5xx"}[5m])) / sum by (service) (rate(requests_total_value[5m])) > 0.05
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "High error rate on {{ $labels.service }}"
          description: "Error rate is {{ $value | humanizePercentage }} over the last 5 minutes"

      - alert: HighLatency
        expr: max by (service, http_url) (response_time_seconds{quantile="0.99", timeWindow="60000"}) > 2
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High P99 latency on {{ $labels.service }}"
```

## What's Next

- [Jaeger distributed tracing](jaeger.md) -- Trace requests across services
- [Logging overview](../logging.md) -- Configure structured logging
- [Integration Control Plane](product://integrator/icp) -- Centralized monitoring dashboard
