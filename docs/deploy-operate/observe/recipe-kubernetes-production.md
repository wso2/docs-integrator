---
title: Recipe - Kubernetes Production Stack
---

# Recipe: Kubernetes Production Stack

Enterprise-grade observability setup for Kubernetes deployments using Prometheus Operator, Grafana, and Jaeger Operator. Includes automatic metric scraping, distributed tracing, and managed dashboards.

## Architecture

```bash
WSO2 Integrator Pods
├── Metrics (9797) ──▶ Prometheus Operator (auto-discovers ServiceMonitor)
│                          ▼
│                     Prometheus StatefulSet
│                          ▼
└─ Traces (6831) ──▶ Jaeger Operator (manages Jaeger collectors)
                          ▼
                     Jaeger StatefulSet

Grafana Deployment ◀── Prometheus, Jaeger
```

## Prerequisites

- Kubernetes cluster 1.20+
- Helm 3+
- kubectl configured

## Installation Steps

### Step 1: Create Observability Namespace

```bash
kubectl create namespace observability
```

### Step 2: Add Helm Repositories

```bash
# Prometheus Operator
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts

# Grafana
helm repo add grafana https://grafana.github.io/helm-charts

# Jaeger
helm repo add jaegertracing https://jaegertracing.github.io/helm-charts

helm repo update
```

### Step 3: Install Prometheus Stack

```bash
helm install prometheus prometheus-community/kube-prometheus-stack \
  -n observability \
  -f prometheus-values.yml
```

Create `prometheus-values.yml`:

```yaml
prometheus:
  prometheusSpec:
    retention: 15d
    resources:
      requests:
        cpu: 500m
        memory: 2Gi
    storageSpec:
      volumeClaimTemplate:
        spec:
          accessModes: ["ReadWriteOnce"]
          resources:
            requests:
              storage: 50Gi

grafana:
  enabled: true
  adminPassword: "admin-password"
  datasources:
    datasources.yaml:
      apiVersion: 1
      datasources:
        - name: Prometheus
          type: prometheus
          access: proxy
          url: http://prometheus-operated:9090

alertmanager:
  enabled: true
  config:
    global:
      resolve_timeout: 5m
    route:
      group_by: ['alertname', 'cluster', 'service']
      group_wait: 10s
      group_interval: 10s
      repeat_interval: 12h
      receiver: 'null'
```

### Step 4: Install Jaeger Operator

```bash
helm install jaeger jaegertracing/jaeger \
  -n observability \
  -f jaeger-values.yml
```

Create `jaeger-values.yml`:

```yaml
jaeger:
  strategy: production
  storage:
    type: elasticsearch
    elasticsearch:
      host: elasticsearch
      port: 9200
  sampling:
    type: probabilistic
    probabilisticSampler:
      samplingPercentage: 10
```

### Step 5: Deploy Your Integration

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: wso2-integrator
  namespace: default
spec:
  replicas: 3
  selector:
    matchLabels:
      app: wso2-integrator
  template:
    metadata:
      labels:
        app: wso2-integrator
      annotations:
        prometheus.io/scrape: "true"
        prometheus.io/port: "9797"
        prometheus.io/path: "/metrics"
    spec:
      containers:
        - name: integrator
          image: myorg/wso2-integrator:latest
          ports:
            - name: http
              containerPort: 9090
            - name: metrics
              containerPort: 9797
          env:
            - name: BALLERINA_OBSERVE_METRICS_ENABLED
              value: "true"
            - name: BALLERINAX_PROMETHEUS_PORT
              value: "9797"
            - name: BALLERINA_OBSERVE_TRACING_ENABLED
              value: "true"
            - name: BALLERINAX_JAEGER_AGENT_HOSTNAME
              value: "jaeger-agent.observability.svc.cluster.local"
            - name: BALLERINAX_JAEGER_AGENT_PORT
              value: "6831"
          resources:
            requests:
              cpu: 250m
              memory: 512Mi
            limits:
              cpu: 500m
              memory: 1Gi
          livenessProbe:
            httpGet:
              path: /health
              port: http
            initialDelaySeconds: 30
            periodSeconds: 10
          readinessProbe:
            httpGet:
              path: /ready
              port: http
            initialDelaySeconds: 10
            periodSeconds: 5

---
apiVersion: v1
kind: Service
metadata:
  name: wso2-integrator
  namespace: default
  labels:
    app: wso2-integrator
spec:
  type: ClusterIP
  ports:
    - name: http
      port: 9090
      targetPort: 9090
    - name: metrics
      port: 9797
      targetPort: 9797
  selector:
    app: wso2-integrator
```

### Step 6: Create ServiceMonitor for Prometheus

```yaml
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: wso2-integrator
  namespace: default
  labels:
    release: prometheus
spec:
  selector:
    matchLabels:
      app: wso2-integrator
  endpoints:
    - port: metrics
      path: /metrics
      interval: 30s
```

## Verifying the Setup

### Check Prometheus Targets

```bash
kubectl port-forward -n observability svc/prometheus-operated 9090:9090
# Visit http://localhost:9090/targets
```

### Check Grafana

```bash
kubectl port-forward -n observability svc/prometheus-grafana 3000:80
# Visit http://localhost:3000 (admin / admin-password)
```

### Check Jaeger UI

```bash
kubectl port-forward -n observability svc/jaeger 16686:16686
# Visit http://localhost:16686
```

## Creating Alert Rules

Create a `PrometheusRule` for alerting:

```yaml
apiVersion: monitoring.coreos.com/v1
kind: PrometheusRule
metadata:
  name: wso2-integrator-alerts
  namespace: default
spec:
  groups:
    - name: wso2-integrator.rules
      interval: 30s
      rules:
        - alert: HighErrorRate
          expr: |
            (sum(rate(http_response_status_total{status_code=~"5.."}[5m])) by (service)) /
            (sum(rate(http_requests_total[5m])) by (service)) > 0.05
          for: 5m
          labels:
            severity: critical
            service: "{{ $labels.service }}"
          annotations:
            summary: "High error rate on {{ $labels.service }}"
            description: "Error rate is {{ $value | humanizePercentage }}"

        - alert: HighLatency
          expr: |
            histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket[5m])) by (le, service)) > 2
          for: 10m
          labels:
            severity: warning
            service: "{{ $labels.service }}"
          annotations:
            summary: "High P95 latency on {{ $labels.service }}"
            description: "P95 latency is {{ $value }}s"

        - alert: PodCrashLooping
          expr: |
            rate(kube_pod_container_status_restarts_total{pod=~"wso2-integrator.*"}[15m]) > 0.1
          for: 5m
          labels:
            severity: critical
          annotations:
            summary: "Pod {{ $labels.pod }} is crash looping"
```

## Creating Grafana Dashboards

Import pre-built dashboard for Kubernetes:

```bash
# Install dashboard configmap
kubectl apply -f - <<EOF
apiVersion: v1
kind: ConfigMap
metadata:
  name: grafana-dashboards
  namespace: observability
data:
  kubernetes.json: |
    $(curl -s https://grafana.com/api/dashboards/7249/revisions/1/download)
EOF
```

Then reference in Grafana's dashboard provisioning.

## Scaling Considerations

- **Prometheus Storage:** Use persistent volumes sized for your retention period
- **Grafana:** Stateless, can scale replicas
- **Jaeger:** Uses Elasticsearch backend; ensure sufficient storage
- **Retention:** Set appropriate retention for logs and metrics

## Backup and Recovery

### Backup Prometheus Data

```bash
kubectl exec -n observability prometheus-operated-0 -- \
  prometheus-admin --config.file=/etc/prometheus/prometheus.yml \
  --storage.tsdb.path=/prometheus backup /tmp/prometheus-backup
```

### Backup Grafana Dashboards

```bash
kubectl exec -n observability deployment/prometheus-grafana -- \
  grafana-cli admin export-dashboard > grafana-dashboard-backup.json
```

## Troubleshooting

**Prometheus not scraping metrics:**
```bash
# Check ServiceMonitor:
kubectl get servicemonitor -A

# Check Prometheus targets:
kubectl port-forward -n observability svc/prometheus-operated 9090:9090
# Visit http://localhost:9090/targets
```

**Jaeger not receiving traces:**
```bash
# Check Jaeger Agent:
kubectl get pod -n observability -l app=jaeger

# Check logs:
kubectl logs -n observability -l app=jaeger-agent
```

**Grafana not showing metrics:**
```bash
# Check Prometheus datasource:
kubectl exec -n observability deployment/prometheus-grafana -- \
  curl -s http://prometheus-operated:9090/-/healthy
```

## What's Next

- **[ELK Stack Recipe](recipe-elk-stack.md)** – Add advanced log aggregation
- **[Integration Control Plane](integration-control-plane-icp.md)** – Centralized WSO2 monitoring
- **[Metrics Overview](metrics-overview.md)** – Learn more about metrics
- **[Distributed Tracing Overview](distributed-tracing-overview.md)** – Learn more about tracing
